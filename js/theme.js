/* ==========================================
   NMIT REDESIGN - THEME ENGINE (DARK/LIGHT)
   ========================================== */

const ThemeModule = (function() {
  const THEME_KEY = 'nmit_theme_preference';

  function init() {
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem(THEME_KEY);
    } catch (e) {
      console.warn('localStorage access failed:', e);
    }

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(initialTheme);

    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.warn('localStorage write failed:', e);
    }
    updateToggleButtons(theme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  function updateToggleButtons(theme) {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      const textSpan = btn.querySelector('.theme-toggle-btn__text');
      if (theme === 'dark') {
        if (textSpan) textSpan.textContent = 'Light Mode';
        btn.setAttribute('aria-label', 'Switch to Light Mode');
      } else {
        if (textSpan) textSpan.textContent = 'Dark Mode';
        btn.setAttribute('aria-label', 'Switch to Dark Mode');
      }
    });
  }

  return { init, setTheme, toggleTheme };
})();

document.addEventListener('DOMContentLoaded', ThemeModule.init);
