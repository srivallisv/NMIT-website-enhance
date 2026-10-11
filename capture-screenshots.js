const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const screenshotsDir = path.resolve(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const fileUrl = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');

  // 1. Capture local redesign screenshots
  const viewports = [
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'laptop-1280', width: 1280, height: 800 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'mobile-375', width: 375, height: 667 }
  ];

  for (const vp of viewports) {
    // Light mode
    const pageLight = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await pageLight.goto(fileUrl);
    await pageLight.waitForTimeout(500);
    const lightPath = path.join(screenshotsDir, `${vp.name}-light.png`);
    await pageLight.screenshot({ path: lightPath, fullPage: true });
    console.log('Saved:', lightPath);
    await pageLight.close();

    // Dark mode
    const pageDark = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await pageDark.goto(fileUrl);
    await pageDark.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
    await pageDark.waitForTimeout(600);
    const darkPath = path.join(screenshotsDir, `${vp.name}-dark.png`);
    await pageDark.screenshot({ path: darkPath, fullPage: true });
    console.log('Saved:', darkPath);
    await pageDark.close();
  }

  // 2. Capture each of the 4 modals open on desktop (1440x900)
  const pageModal = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageModal.goto(fileUrl);
  await pageModal.waitForTimeout(500);

  // Modal 1: Alumni modal
  const alumniCard = pageModal.locator('.alumni-card').first();
  await alumniCard.scrollIntoViewIfNeeded();
  await alumniCard.click();
  await pageModal.waitForSelector('#alumni-modal.is-active');
  await pageModal.waitForTimeout(300);
  const m1Path = path.join(screenshotsDir, 'modal-alumni.png');
  await pageModal.screenshot({ path: m1Path });
  console.log('Saved:', m1Path);
  await pageModal.locator('#alumni-modal .modal-close-btn').click();
  await pageModal.waitForTimeout(300);

  // Modal 2: Video modal
  const videoCard = pageModal.locator('.video-card').first();
  await videoCard.scrollIntoViewIfNeeded();
  await videoCard.click();
  await pageModal.waitForSelector('#video-modal.is-active');
  await pageModal.waitForTimeout(500);
  const m2Path = path.join(screenshotsDir, 'modal-video.png');
  await pageModal.screenshot({ path: m2Path });
  console.log('Saved:', m2Path);
  await pageModal.locator('#video-modal .modal-close-btn').click();
  await pageModal.waitForTimeout(300);

  // Modal 3: Search modal
  const searchBtn = pageModal.locator('.search-trigger-btn');
  await searchBtn.click();
  await pageModal.waitForSelector('#search-modal.is-active');
  await pageModal.locator('#search-modal-input').fill('Aero');
  await pageModal.waitForTimeout(300);
  const m3Path = path.join(screenshotsDir, 'modal-search.png');
  await pageModal.screenshot({ path: m3Path });
  console.log('Saved:', m3Path);
  await pageModal.locator('#search-modal .modal-close-btn').click();
  await pageModal.waitForTimeout(300);

  // Modal 4: Lightbox modal
  const galleryBtn = pageModal.locator('.gallery-item-btn').first();
  await galleryBtn.scrollIntoViewIfNeeded();
  await galleryBtn.click();
  await pageModal.waitForSelector('#lightbox-modal.is-active');
  await pageModal.waitForTimeout(300);
  const m4Path = path.join(screenshotsDir, 'modal-lightbox.png');
  await pageModal.screenshot({ path: m4Path });
  console.log('Saved:', m4Path);
  await pageModal.locator('#lightbox-modal .modal-close-btn').click();
  await pageModal.close();

  // 3. Capture ORIGINAL site: https://nitte.edu.in/nmit/
  console.log('Capturing original site https://nitte.edu.in/nmit/ ...');
  try {
    const origDesktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await origDesktop.goto('https://nitte.edu.in/nmit/', { waitUntil: 'networkidle', timeout: 45000 });
    const origDeskPath = path.join(screenshotsDir, 'original-desktop.png');
    await origDesktop.screenshot({ path: origDeskPath, fullPage: true });
    console.log('Saved:', origDeskPath);
    await origDesktop.close();

    const origMobile = await browser.newPage({ viewport: { width: 375, height: 667 } });
    await origMobile.goto('https://nitte.edu.in/nmit/', { waitUntil: 'networkidle', timeout: 45000 });
    const origMobPath = path.join(screenshotsDir, 'original-mobile.png');
    await origMobile.screenshot({ path: origMobPath, fullPage: true });
    console.log('Saved:', origMobPath);
    await origMobile.close();
  } catch (err) {
    console.error('Failed to capture original site via networkidle, retrying with domcontentloaded:', err.message);
    try {
      const origDesktop2 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await origDesktop2.goto('https://nitte.edu.in/nmit/', { waitUntil: 'domcontentloaded', timeout: 30000 });
      await origDesktop2.waitForTimeout(3000);
      const origDeskPath = path.join(screenshotsDir, 'original-desktop.png');
      await origDesktop2.screenshot({ path: origDeskPath, fullPage: true });
      console.log('Saved (fallback):', origDeskPath);
      await origDesktop2.close();

      const origMobile2 = await browser.newPage({ viewport: { width: 375, height: 667 } });
      await origMobile2.goto('https://nitte.edu.in/nmit/', { waitUntil: 'domcontentloaded', timeout: 30000 });
      await origMobile2.waitForTimeout(3000);
      const origMobPath = path.join(screenshotsDir, 'original-mobile.png');
      await origMobile2.screenshot({ path: origMobPath, fullPage: true });
      console.log('Saved (fallback):', origMobPath);
      await origMobile2.close();
    } catch (err2) {
      console.error('Original site capture failed completely:', err2.message);
    }
  }

  await browser.close();
  console.log('All screenshots completed successfully!');
})();
