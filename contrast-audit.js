const { chromium } = require('playwright');

function parseRgba(str) {
  if (!str) return null;
  const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!m) return null;
  return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3]), m[4] !== undefined ? parseFloat(m[4]) : 1];
}

function parseGradient(str) {
  if (!str || !str.includes('gradient')) return null;
  const m = str.match(/rgba?\([^)]+\)/g);
  if (m && m.length > 0) {
    return parseRgba(m[0]);
  }
  return null;
}

function composite(fg, bg) {
  const alpha = fg[3];
  return [
    Math.round(fg[0] * alpha + bg[0] * (1 - alpha)),
    Math.round(fg[1] * alpha + bg[1] * (1 - alpha)),
    Math.round(fg[2] * alpha + bg[2] * (1 - alpha)),
    1
  ];
}

function relLum([r, g, b]) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function contrast(c1, c2) {
  const l1 = relLum(c1);
  const l2 = relLum(c2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const fileUrl = 'file:///' + process.cwd().replace(/\\/g, '/') + '/index.html';
  await page.goto(fileUrl);

  const summary = { light: { total: 0, fail: 0 }, dark: { total: 0, fail: 0 } };

  for (const theme of ['light', 'dark']) {
    if (theme === 'dark') {
      await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    } else {
      await page.evaluate(() => document.documentElement.removeAttribute('data-theme'));
    }
    await page.waitForTimeout(600);

    const results = await page.evaluate(() => {
      function getEffectiveBg(el) {
        const layers = [];
        let curr = el;
        while (curr && curr !== document) {
          const style = window.getComputedStyle(curr);
          const bgImg = style.backgroundImage;
          const bg = style.backgroundColor;
          if (bgImg && bgImg !== 'none') {
            layers.push({ type: 'img', val: bgImg });
          }
          if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
            layers.push({ type: 'color', val: bg });
          }
          curr = curr.parentElement;
        }
        layers.push({ type: 'color', val: 'rgb(255, 255, 255)' });
        return layers;
      }

      const textElements = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
      let node;
      while ((node = walker.nextNode())) {
        const style = window.getComputedStyle(node);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;
        const rect = node.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;

        let directText = '';
        for (const child of node.childNodes) {
          if (child.nodeType === Node.TEXT_NODE && child.textContent.trim().length > 0) {
            directText += ' ' + child.textContent.trim();
          }
        }
        if (directText.trim().length > 0) {
          textElements.push({
            tag: node.tagName,
            class: node.className,
            text: directText.trim().slice(0, 50),
            color: style.color,
            fontSize: parseFloat(style.fontSize),
            fontWeight: parseInt(style.fontWeight) || 400,
            bgLayers: getEffectiveBg(node)
          });
        }
      }
      return textElements;
    });

    console.log(`\n=== CHECKING CONTRAST FOR THEME: ${theme.toUpperCase()} (${results.length} text elements) ===`);
    let failures = 0;
    for (const item of results) {
      const fg = parseRgba(item.color);
      if (!fg) continue;
      let bg = [255, 255, 255, 1];
      for (let i = item.bgLayers.length - 1; i >= 0; i--) {
        const layer = item.bgLayers[i];
        if (layer.type === 'color') {
          const parsed = parseRgba(layer.val);
          if (parsed) bg = composite(parsed, bg);
        } else if (layer.type === 'img') {
          const parsed = parseGradient(layer.val);
          if (parsed) bg = composite(parsed, bg);
        }
      }
      const finalFg = composite(fg, bg);
      const ratio = contrast(finalFg, bg);
      const isLarge = item.fontSize >= 24 || (item.fontSize >= 18.66 && item.fontWeight >= 700);
      const req = isLarge ? 3.0 : 4.5;
      if (ratio < req) {
        failures++;
        console.log(`FAIL [${theme}] ${item.tag}.${item.class} | "${item.text}" | ratio: ${ratio.toFixed(2)}:1 (req ${req}:1) | fg: ${item.color} | bg: rgb(${bg.slice(0, 3).join(',')})`);
      }
    }
    summary[theme].total = results.length;
    summary[theme].fail = failures;
    console.log(`SUMMARY [${theme}]: ${failures} failures out of ${results.length} text elements checked.`);
  }

  console.log('\n=== FORM ERROR MESSAGE CONTRAST CHECK ===');
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark') {
      await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    } else {
      await page.evaluate(() => document.documentElement.removeAttribute('data-theme'));
    }
    await page.waitForTimeout(600);
    const errData = await page.evaluate(() => {
      const formCard = document.querySelector('.enquiry-card');
      const err = document.querySelector('.form-error-msg');
      return {
        cardBg: window.getComputedStyle(formCard).backgroundColor,
        errColor: window.getComputedStyle(err).color
      };
    });
    const fg = parseRgba(errData.errColor);
    const bg = parseRgba(errData.cardBg) || [255, 255, 255, 1];
    const ratio = contrast(fg, bg);
    console.log(`[${theme}] .form-error-msg fg: ${errData.errColor}, bg: ${errData.cardBg}, ratio: ${ratio.toFixed(2)}:1 (passes 4.5:1: ${ratio >= 4.5})`);
  }

  await browser.close();
})();
