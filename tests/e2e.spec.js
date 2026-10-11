import { test, expect } from '@playwright/test';
import path from 'path';

const fileUrl = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

test.describe('NMIT Redesign E2E Suite', () => {

  test('1. No console errors or uncaught page errors on load', async ({ page }) => {
    const pageErrors = [];
    const consoleErrors = [];

    page.on('pageerror', err => pageErrors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto(fileUrl);
    await page.waitForLoadState('domcontentloaded');

    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });

  test('2. No horizontal overflow and Apply CTA within viewport across all required widths', async ({ page }) => {
    await page.goto(fileUrl);
    const widths = [320, 375, 414, 768, 900, 1024, 1100, 1200, 1280, 1366, 1440];

    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForTimeout(50);

      const metrics = await page.evaluate(() => {
        const cta = document.querySelector('.apply-cta-btn');
        const ctaRect = cta ? cta.getBoundingClientRect() : null;
        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          ctaRight: ctaRect ? ctaRect.right : 0
        };
      });

      expect(metrics.scrollWidth, `Overflow at ${width}px`).toBe(metrics.innerWidth);
      expect(metrics.ctaRight, `CTA right edge exceeds viewport at ${width}px`).toBeLessThanOrEqual(metrics.innerWidth);
    }
  });

  test('3. Modals open and close with mouse and keyboard and restore focus', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(fileUrl);

    // Modal 1: Alumni Details Modal
    const alumniCard = page.locator('.alumni-card').first();
    await alumniCard.focus();
    await alumniCard.click();
    const alumniModal = page.locator('#alumni-modal');
    await expect(alumniModal).toBeVisible();
    await expect(alumniModal).toHaveClass(/is-active/);

    // Close via close button (mouse)
    const alumniCloseBtn = alumniModal.locator('.modal-close-btn');
    await alumniCloseBtn.click();
    await expect(alumniModal).toBeHidden();
    // Focus returns to trigger
    await expect(alumniCard).toBeFocused();

    // Reopen with Enter key and close with Esc key
    await page.keyboard.press('Enter');
    await expect(alumniModal).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(alumniModal).toBeHidden();
    await expect(alumniCard).toBeFocused();

    // Modal 2: Video Player Modal
    const videoCard = page.locator('.video-card').first();
    await videoCard.focus();
    await videoCard.click();
    const videoModal = page.locator('#video-modal');
    await expect(videoModal).toBeVisible();
    await expect(videoModal.locator('iframe')).toBeVisible();

    // Close with Esc
    await page.keyboard.press('Escape');
    await expect(videoModal).toBeHidden();
    await expect(videoCard).toBeFocused();

    // Modal 3: Global Search Modal
    const searchTrigger = page.locator('.search-trigger-btn');
    await searchTrigger.focus();
    await searchTrigger.click();
    const searchModal = page.locator('#search-modal');
    await expect(searchModal).toBeVisible();
    await expect(page.locator('#search-modal-input')).toBeFocused();

    // Close with Esc
    await page.keyboard.press('Escape');
    await expect(searchModal).toBeHidden();
    await expect(searchTrigger).toBeFocused();

    // Modal 4: Lightbox Photo Preview Modal
    const galleryBtn = page.locator('.gallery-item-btn').first();
    await galleryBtn.focus();
    await galleryBtn.click();
    const lightboxModal = page.locator('#lightbox-modal');
    await expect(lightboxModal).toBeVisible();

    // Close with close button
    const lightboxCloseBtn = lightboxModal.locator('.modal-close-btn');
    await lightboxCloseBtn.click();
    await expect(lightboxModal).toBeHidden();
    await expect(galleryBtn).toBeFocused();
  });

  test('4. Nav disclosure buttons toggle aria-expanded with Enter and close with Escape', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(fileUrl);

    const firstNavBtn = page.locator('.nav-disclosure-btn').first();
    await firstNavBtn.focus();
    expect(await firstNavBtn.getAttribute('aria-expanded')).toBe('false');

    // Press Enter to open
    await page.keyboard.press('Enter');
    expect(await firstNavBtn.getAttribute('aria-expanded')).toBe('true');
    const dropdown = page.locator('#mega-about');
    await expect(dropdown).toHaveClass(/is-open/);

    // Press Escape to close and verify focus returns
    await page.keyboard.press('Escape');
    expect(await firstNavBtn.getAttribute('aria-expanded')).toBe('false');
    await expect(firstNavBtn).toBeFocused();
  });

  test('5. Programs tab counts match visible program cards and empty search state displays', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(fileUrl);

    const tabs = page.locator('.tab-btn');
    const tabCount = await tabs.count();

    for (let i = 0; i < tabCount; i++) {
      const tab = tabs.nth(i);
      await tab.click();
      await page.waitForTimeout(50);

      const tabText = await tab.innerText();
      const countMatch = tabText.match(/\((\d+)\)/);
      if (countMatch) {
        const expectedCount = parseInt(countMatch[1]);
        const visibleCards = await page.locator('.program-card:visible').count();
        expect(visibleCards, `Tab ${tabText} count mismatch`).toBe(expectedCount);
      }
    }

    // Test live search and empty search state
    const allTab = tabs.first();
    await allTab.click();
    const searchInput = page.locator('.program-search-input');
    await searchInput.fill('xyznonexistentsearchquery123');
    await page.waitForTimeout(100);

    const emptyState = page.locator('#program-empty-state');
    await expect(emptyState).toBeVisible();
    const visibleCards = await page.locator('.program-card:visible').count();
    expect(visibleCards).toBe(0);

    // Clear search and verify cards reappear
    await searchInput.fill('');
    await page.waitForTimeout(100);
    await expect(emptyState).toBeHidden();
    expect(await page.locator('.program-card:visible').count()).toBeGreaterThan(0);
  });

  test('6. Form shows aria-invalid errors on empty submit', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(fileUrl);

    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.scrollIntoViewIfNeeded();
    await submitBtn.click();

    const nameInput = page.locator('#field-name');
    const phoneInput = page.locator('#field-phone');
    const emailInput = page.locator('#field-email');
    const courseSelect = page.locator('#field-course');
    const cityInput = page.locator('#field-city');
    const stateInput = page.locator('#field-state');

    await expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    await expect(phoneInput).toHaveAttribute('aria-invalid', 'true');
    await expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    await expect(courseSelect).toHaveAttribute('aria-invalid', 'true');
    await expect(cityInput).toHaveAttribute('aria-invalid', 'true');
    await expect(stateInput).toHaveAttribute('aria-invalid', 'true');

    // Error messages should be visible
    const errorMsgs = page.locator('.form-error-msg:visible');
    expect(await errorMsgs.count()).toBeGreaterThanOrEqual(6);
  });

});
