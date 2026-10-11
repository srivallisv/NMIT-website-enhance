# NMIT Redesign v3 - QA Pass & Fix Changelog

This document provides a record of bug fixes, architectural refactoring, and quality assurance enhancements executed across the NMIT Homepage Redesign project. All verification statements are backed strictly by real Playwright E2E and contrast audit results.

---

## 🛠️ Phase 1: Critical Bug Fixes & Refactoring

| ID | Issue & Requirement | Files Touched | Verification Method |
| :--- | :--- | :--- | :--- |
| **1.1** | **Modals System**: Replaced broken dialogs with accessible `<div class="modal" role="dialog" aria-modal="true" hidden>`. Added click/Enter open, Esc/X close, focus trap, and focus restoration to trigger elements. | `index.html`, `js/modal.js`, `css/components.css` | Verified in Chromium via Playwright: all 4 modals open and close via click/Enter/Esc and restore focus cleanly. |
| **1.2** | **Alumni Data**: Sourced 10 verified profiles from official NMIT public pages. Changed card containers to accessible `<button>` elements. Added code comment on Anirudh Asokan noting CSE/ISE source distinction. | `index.html`, `js/data.js`, `js/modal.js` | Verified full names, departments, and biographies render correctly from `NMIT_DATA`. |
| **1.3** | **Remove Invented Claims**: Removed unverified badges, fabricated statistics, and fake lab claims. Replaced Rankings with official "Accreditations & Disclosures" links. | `index.html`, `css/components.css`, `js/data.js` | Verified zero unverified claims exist in markup, scripts, or metadata. |
| **1.4** | **Header Overflow (Priority)**: Fixed navigation overflow between 1024px and 1280px by switching desktop nav to hamburger drawer below 1280px. | `css/responsive.css` | Verified `scrollWidth === innerWidth` and Apply CTA right edge <= viewport width across 320, 375, 414, 768, 900, 1024, 1100, 1200, 1280, 1366, 1440 in Playwright. |
| **1.5** | **Dead Anchors**: Created real sections (`#about`, `#research`, `#academics`) with verified URLs. Converted remaining `href="#"` placeholders to verified targets. | `index.html`, `js/data.js` | Automated script verified zero `href="#"` placeholders exist. |
| **1.6** | **Contrast Corrections (WCAG AA)**: Set `.footer-desc` to `--color-on-dark-muted` (13.56:1 light, 13.59:1 dark), `.form-error-msg` to `--color-error: #fca5a5` in dark mode (7.71:1 dark, 6.47:1 light), and `.alumni-dept` in dark mode to `--color-text` (13.98:1 dark). | `css/variables.css`, `css/layout.css`, `css/components.css` | Verified with automated Playwright contrast script: 0 failures across 364 text elements in both themes. |
| **1.7** | **Contact Links**: Updated WhatsApp link to official number `918147354951`. Updated office phone (+91-80-22167800) and admissions phone (+91-81510-04455). | `index.html`, `js/data.js`, `js/form.js` | Verified link targets match verified institutional telephone dialers and WhatsApp URL. |

---

## ⚙️ Phase 2: Functionality & Component Completeness

| ID | Issue & Requirement | Files Touched | Verification Method |
| :--- | :--- | :--- | :--- |
| **2.1** | **Programs Grid & ARIA Tabs**: 23 verified programs across 6 categories with ARIA tabs (`role="tab"`, arrow navigation) and live search empty state. | `index.html`, `js/data.js`, `js/tabs.js`, `css/components.css` | Verified in Playwright: tab counts match visible cards; empty search state renders when query matches 0 cards. |
| **2.2** | **Nav Disclosures & Mobile Drawer**: W3C disclosure buttons (`<button aria-expanded aria-controls>`) for desktop menus and mobile drawer. | `index.html`, `js/data.js`, `js/nav.js`, `css/layout.css` | Verified in Playwright: pressing Enter toggles `aria-expanded="true"`, pressing Esc toggles `aria-expanded="false"` and restores focus. |
| **2.3** | **Video Embeds**: YouTube IDs (`3dsRZC-RdLQ`, `68SHAw7CpWY`, `fXEtGuG9bS4`) dynamically embedded in modal on open and destroyed on close. | `index.html`, `js/data.js`, `js/modal.js` | Verified iframe is injected on modal open and destroyed when closed. |
| **2.4** | **Enquiry Form Validation**: Client-side validation with `aria-invalid` and `aria-describedby` launching prefilled `mailto:` message. | `index.html`, `js/form.js` | Verified in Playwright: submitting empty form marks all 6 required fields `aria-invalid="true"`. |
| **2.5** | **Hero Slider Carousel**: WCAG 2.2.2 Pause/Play button with inline SVGs, respecting `prefers-reduced-motion`. Exactly ONE `<h1>` on page. | `index.html`, `js/slider.js` | Verified single `<h1>` tag in DOM and Pause/Play toggles aria-label and SVGs. |
| **2.6** | **Emoji Icons Replacement**: Replaced decorative glyphs (`⏸`, `✅`, `✕`, `❮`, `❯`, `💬`, `▶`) with inline SVGs carrying `aria-hidden="true"`, and gave icon buttons `aria-label`. | `index.html`, `js/slider.js`, `css/components.css` | Verified 0 raw emoji glyphs remain in index.html; all buttons have accessible labels. |
| **2.7** | **Theme Persistence**: Light/Dark switcher reading `localStorage` synchronously in `<head>` to prevent flash of unstyled theme. | `index.html`, `js/theme.js` | Verified theme persistence and token switching across page reloads. |

---

## 🎨 Phase 3: Verification & Test Suite

| ID | Issue & Requirement | Files Touched | Verification Method |
| :--- | :--- | :--- | :--- |
| **3.1** | **Automated Playwright E2E Suite**: Replaced scratch runner with `tests/e2e.spec.js` and added `"test": "playwright test"` to `package.json`. | `tests/e2e.spec.js`, `package.json` | Executed `npm test`: 6 passed (16.7s) in Chromium. |
| **3.2** | **Contrast Audit Script**: Automated Playwright script calculating computed contrast against effective background layers in light and dark. | `contrast-audit.js` | Executed `node contrast-audit.js`: 0 failures across 364 elements in light and dark. |
| **3.3** | **Visual Captures**: Captured screenshots across 4 responsive widths in light and dark, 4 open modals, and original site at desktop/mobile. | `screenshots/*.png`, `capture-screenshots.js` | Generated 14 PNG files in `/screenshots`. |
| **3.4** | **Browser Coverage Honesty**: Documented testing environment honestly as Chromium. | `REPORT.md`, `README.md`, `CHANGELOG.md` | Firefox and Safari marked as "not tested". |
