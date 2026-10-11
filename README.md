# NMIT Redesign v3 - Verified Homepage Portal

A modern, responsive, and accessible redesign of the **Nitte Meenakshi Institute of Technology (NMIT)**, Bengaluru homepage portal. Built strictly with **plain HTML5, CSS3, and vanilla JavaScript** (zero frameworks, zero build tools).

---

## 🌟 Features & Compliance Highlights

- **Factually Verified Institutional Data**: Program titles, alumni profiles, news headlines, placement metrics, contact numbers, and institutional links strictly reflect verified data from [https://nitte.edu.in/nmit/](https://nitte.edu.in/nmit/).
- **Accessible Div Modal Engine (`<div class="modal" role="dialog" aria-modal="true" hidden>`)**:
  - Full keyboard support (Enter/Space to open, Esc / X button / backdrop click to close).
  - Strict focus trap inside open modals with focus restoration to trigger elements.
  - Video modal dynamically embeds YouTube iframe (`https://www.youtube-nocookie.com/embed/<ID>?autoplay=1`) and clears iframe on close so audio/video playback stops immediately.
- **Disclosure Buttons Navigation Pattern**: Desktop mega-menus and mobile drawer use `<button aria-expanded aria-controls>` disclosure triggers instead of invalid ARIA menubars. Seamlessly switches to mobile drawer below 1280px to prevent header overflow.
- **Mobile-First Responsive Layout**: Verified zero horizontal overflow across 320, 375, 414, 768, 900, 1024, 1100, 1200, 1280, 1366, and 1440px viewports (`scrollWidth === window.innerWidth`).
- **Complete Program Finder (23 Programs)**: Includes 12 B.Tech, 2 B.Sc (Hons) Civil Aviation, 6 Postgraduate (M.Tech/MBA/MCA), 1 Doctoral, and 2 Supporting Departments with ARIA tabs (`role="tab"`, roving `tabindex`, arrow key navigation) and live text search with an empty search result state.
- **Distinguished Alumni Network**: 10 alumni buttons with verified biographies (e.g. Balen Shah, Dr. Mamatha Maheshwarappa, Meghashree D R) and accessible detail popups.
- **Dark / Light Theme Persistence**: Smooth theme switcher with `:root` CSS custom variables, non-flipping tokens (`--color-on-dark`, `--color-on-dark-muted`) for always-dark surfaces, and inline head script to eliminate theme flash. Verified 0 contrast failures across 364 text elements.
- **Admissions Mailto Form**: Client-side validation with `aria-invalid` & `aria-describedby`, launching a prefilled `mailto:admissions.nmit@nitte.edu.in` message and direct WhatsApp link (`wa.me/918147354951`).
- **Clean SVG Icons**: Inline SVG icons with `aria-hidden="true"` and descriptive button labels, replacing raw emoji characters.

---

## 📁 Directory Structure

```
nmit-redesign/
├── index.html            # Main HTML5 Document (14 Page Sections, Zero Inline Styles)
├── css/
│   ├── variables.css     # CSS Custom Properties, Theme Tokens & Non-Flipping Tokens
│   ├── base.css          # CSS Reset, Typography, Accessibility Focus States, Print Styles
│   ├── layout.css        # Container, Header, Nav Disclosures, Mobile Drawer, Footer
│   ├── components.css    # Cards, Hero Slider, Ticker, Badges, Div Modals, Forms
│   └── responsive.css    # Consolidated Media Queries (480, 640, 768, 1024, 1280, 1440)
├── js/
│   ├── data.js           # Central Institutional Data Object (NMIT_DATA)
│   ├── theme.js          # Dark/Light Mode Theme Switcher & Try/Catch LocalStorage
│   ├── nav.js            # Desktop Disclosure Menus & Mobile Drawer Focus Trap
│   ├── slider.js         # WCAG 2.2.2 Hero Slider Pause/Play & Ticker Controls
│   ├── tabs.js           # ARIA Tabs Pattern, Roving Tabindex & Program Search
│   ├── counters.js       # Prefers-Reduced-Motion Respecting Animated Stats
│   ├── modal.js          # Accessible Div Modal System & Dynamic YouTube Embeds
│   ├── form.js           # Client-Side Blur Validation & Mailto Enquiry Handler
│   └── main.js           # Single Throttled Scroll Handler & IntersectionObserver Scroll-Spy
├── assets/
│   ├── img/              # Local SVG graphics & photo placeholders
│   └── CREDITS.md        # Asset Credits & License Attribution
├── screenshots/          # Responsive Viewport Captures (Light/Dark) & Original Site
├── tests/
│   └── e2e.spec.js       # Playwright E2E Suite (Chromium automated tests)
├── contrast-audit.js     # Computed Contrast Ratio Verification Script
├── favicon.svg           # Project SVG Favicon
├── package.json          # Node dependencies & "test": "playwright test"
├── CHANGELOG.md          # Complete QA & Bug Fix Report
├── README.md             # Project Overview & Setup Guide
├── REPORT.md             # Academic Viva Documentation
└── DEMO_SCRIPT.md        # 5-Minute Presentation & Viva Q&A Guide
```

---

## 🚀 How to Run Locally

1. **Option A (Static Browser Opening)**:
   - Double click `index.html` in Chrome or Edge (Firefox and Safari not tested).

2. **Option B (Python Server)**:
   ```bash
   cd nmit-redesign
   python -m http.server 8000
   ```
   Open `http://localhost:8000`.

3. **Option C (Node Serve)**:
   ```bash
   npx serve .
   ```

4. **Running Automated Tests (Playwright)**:
   ```bash
   npm test
   ```
   To run the color contrast audit:
   ```bash
   node contrast-audit.js
   ```

---

## ⚠️ Known Limitations & Testing Scope

1. **Browser Testing Scope**: Automated testing and visual verification were performed in **Chromium** (Playwright). Firefox and Safari were not tested in this pass.
2. **Single Homepage Scope**: Only the primary homepage is redesigned as part of this academic project. Sub-page links direct users to verified official pages on `https://nitte.edu.in/nmit/` opening in new tabs (`target="_blank" rel="noopener noreferrer"`).
3. **Mailto Form Handling**: The quick enquiry form validates client-side and opens the user's native mail application (`mailto:`) rather than executing a backend database POST.
4. **Local Visual Placeholders**: Campus gallery images use lightweight SVG vector placeholders carrying descriptive labels to avoid hotlinking or infringing copyright.
