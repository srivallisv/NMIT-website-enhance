# NMIT Homepage Redesign v3 - 5-Minute Presentation Script & Viva Guide

---

## ⏱️ 5-Minute Presentation & Demo Walkthrough

### **0:00 - 0:45 | Introduction & Scope**
- **Action**: Open `http://localhost:8000` in full screen on desktop view.
- **Talking Points**:
  - *"Good morning/afternoon, esteemed evaluators. Today I am presenting the QA-tested redesign of the Nitte Meenakshi Institute of Technology (NMIT), Bengaluru homepage portal."*
  - *"Our objective was to create a modern, responsive, accessible academic website while ensuring verified data alignment with NMIT's official public portal (`nitte.edu.in/nmit/`)."*
  - *"The platform is engineered using **ONLY plain HTML5, CSS3, and vanilla JavaScript**, with zero external frameworks or build tools."*

---

### **0:45 - 1:30 | Navigation, Accessibility & Dark Mode**
- **Action**: 
  1. Click desktop menu buttons (*About Us, Programs, Research, Life@NMIT, Academics, Quick Links*) showing `aria-expanded` toggle.
  2. Click the **Dark Mode** toggle button in the top bar.
  3. Click the **Search Icon** to open the Search Overlay modal and type *"Aeronautical"*.
- **Talking Points**:
  - *"We implemented W3C disclosure buttons (`<button aria-expanded aria-controls>`) for menu navigation instead of complex ARIA menubars, ensuring natural screen reader and keyboard traversal."*
  - *"Notice the persistent Dark/Light theme switcher. It utilizes non-flipping tokens (`--color-on-dark`) for always-dark surfaces to maintain WCAG AA contrast (>4.5:1) in both themes."*
  - *"The global search overlay indexes page content dynamically, escaping HTML output to prevent XSS vulnerabilities."*

---

### **1:30 - 2:30 | Hero Slider, Announcements & ARIA Program Tabs**
- **Action**:
  1. Show the WCAG 2.2.2 Pause/Play button on the Hero Slider.
  2. Pause the Announcement Ticker marquee.
  3. Scroll to `#programs`. Use Keyboard Arrow Keys (Left/Right) to navigate between program tabs (*All, B.Tech, B.Sc, Postgraduate, Doctoral, Supporting*). Type *"Civil"* in the live search field.
- **Talking Points**:
  - *"The Hero section features a WCAG 2.2.2 compliant Pause/Play button and respects `prefers-reduced-motion` settings."*
  - *"In the Programs section, we built a full ARIA tabs pattern (`role="tablist"`, roving `tabindex`, arrow key navigation). It showcases all 23 official NMIT degree programs with live search and an empty result status element."*

---

### **2:30 - 3:30 | Verified Placements, YouTube Modals & Distinguished Alumni**
- **Action**:
  1. Scroll to `#placements` to view placement numbers (₹58.93 Lakhs, 300+ companies, 1200+ offers).
  2. Scroll to `#videos` and click a video card. Show YouTube modal opening and playing video, then close it to show playback stopping immediately.
  3. Scroll to `#alumni`. Click **Balen Shah** and **Dr. Mamatha Maheshwarappa** to show alumni modals.
- **Talking Points**:
  - *"All placement figures strictly reflect NMIT's official published records without fabricated numbers."*
  - *"The video section embeds official YouTube media via `youtube-nocookie.com`. Closing the modal destroys the iframe immediately, stopping playback."*
  - *"Our Distinguished Alumni section features 10 verified profiles accessible via keyboard buttons, complete with focus trapping and Esc key closing."*

---

### **3:30 - 4:15 | Mobile Viewport & Admissions Mailto Form**
- **Action**:
  1. Toggle Mobile View (320px width in Developer Tools).
  2. Open mobile drawer menu showing all 6 menus + Apply CTA.
  3. Scroll to `#enquiry`. Trigger blur validation on empty fields, then click **Submit Enquiry** to show toast and mailto launch.
- **Talking Points**:
  - *"At 320px, the page has ZERO horizontal overflow (`scrollWidth === window.innerWidth`). On mobile, the navigation transitions into a focus-trapped drawer."*
  - *"The Quick Enquiry form implements blur validation, `aria-invalid` attributes, mailto link generation, and direct WhatsApp integration (`wa.me/918147354951`)."*

---

### **4:15 - 5:00 | Conclusion & Q&A**
- **Talking Points**:
  - *"This project proves that vanilla web standards deliver an elegant, responsive, accessible academic portal that is lightweight and easy to maintain."*
  - *"Thank you! I welcome your questions."*

---

## 🎯 10 Viva Questions & Short Answers

### **Q1: Why did you use disclosure buttons instead of an ARIA menubar pattern for navigation?**
**Answer**: *"The W3C WAI-ARIA guidelines explicitly recommend disclosure buttons (`<button aria-expanded aria-controls>`) for site navigation menus. ARIA menubars are designed for desktop application menus (like File/Edit/View in Google Docs) and require complex arrow-key handling that disrupts standard Web page navigation."*

### **Q2: How did you verify web accessibility (WCAG AA)?**
**Answer**: *"Accessibility was verified using automated Playwright tests in Chromium: (1) Keyboard traversal testing (ensuring Tab, Enter, Space, Esc reach all interactive controls with visible `:focus-visible` outlines), (2) Dialog focus management and ARIA states, and (3) Automated color contrast scripts calculating text contrast (>4.5:1) against composite background layers across light and dark themes."*

### **Q3: How do the div modals handle focus management and background scrolling?**
**Answer**: *"When a modal opens (`hidden = false`, `.is-active`), JavaScript saves `document.activeElement`, moves focus inside the modal, traps `Tab` navigation between modal controls, and sets `overflow: hidden` on `body`. When closed, background scrolling is restored, and focus returns to the triggering button."*

### **Q4: How did you stop YouTube video playback when closing the video modal?**
**Answer**: *"Instead of embedding static `iframe` tags, the modal container is dynamically populated with a YouTube `iframe` when opened. When the user closes the modal, JavaScript clears `container.innerHTML = ''`, which completely unmounts the iframe and stops video/audio playback immediately."*

### **Q5: How does the dark mode switcher prevent theme flashing on initial page load?**
**Answer**: *"We placed an inline `<script>` at the very top of `<head>` before any CSS files load. It reads `localStorage` or `prefers-color-scheme` synchronously and sets `document.documentElement.setAttribute('data-theme', ...)` before the browser renders the page."*

### **Q6: How did you eliminate mobile horizontal scrolling overflow at 320px?**
**Answer**: *"We eliminated fixed pixel widths on flex/grid containers, used fluid CSS `clamp()` for typography and padding, shortened the header Apply CTA button on mobile (`.apply-cta-btn__text--short`), and set `max-width: 100%` on images and media."*

### **Q7: How does the live program search filter work?**
**Answer**: *"An `input` event listener monitors user input. On each keypress, vanilla JS compares the lowercased search term against card titles. Matching cards display as `flex`, while non-matching cards are set to `none`. If zero cards match, a hidden `<div id="program-empty-state" role="status" aria-live="polite">` displays an alert."*

### **Q8: How did you handle user data security in the admissions form?**
**Answer**: *"The form runs entirely on the client side without transmitting sensitive data to unknown servers. Validated inputs generate a structured `mailto:` link to `admissions.nmit@nitte.edu.in`, allowing the student to send their enquiry securely from their own mail app."*

### **Q9: Why are non-flipping color tokens used for always-dark surfaces?**
**Answer**: *"Surfaces like top bars, hero slides, drawer headers, and footers remain dark in both light and dark themes. Using standard `--color-text-inverse` caused text to flip to dark navy in dark mode, dropping contrast to ~2.7:1. Defining non-flipping `--color-on-dark: #f8fafc` maintains a high 12.5:1 contrast ratio continuously."*

### **Q10: How did you ensure compliance with prefers-reduced-motion?**
**Answer**: *"In CSS, `@media (prefers-reduced-motion: reduce)` sets animation/transition durations to 0.01ms. In JavaScript, `window.matchMedia('(prefers-reduced-motion: reduce)').matches` permanently disables slider auto-play and displays final placement counter values immediately without animating."*
