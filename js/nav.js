/* ==========================================
   NMIT REDESIGN - NAVIGATION & DISCLOSURE MENUS
   ========================================== */

const NavModule = (function() {
  let activeDisclosure = null;

  function init() {
    setupDesktopDisclosureMenus();
    setupMobileDrawer();
    setupMobileAccordions();
  }

  function setupDesktopDisclosureMenus() {
    const items = document.querySelectorAll('.nav-item');

    items.forEach(item => {
      const btn = item.querySelector('.nav-disclosure-btn');
      const dropdown = item.querySelector('.mega-dropdown');

      if (!btn || !dropdown) return;

      function openMenu() {
        closeAllDesktopMenus();
        btn.setAttribute('aria-expanded', 'true');
        dropdown.classList.add('is-open');
        activeDisclosure = item;
      }

      function closeMenu() {
        btn.setAttribute('aria-expanded', 'false');
        dropdown.classList.remove('is-open');
        if (activeDisclosure === item) activeDisclosure = null;
      }

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        isOpen ? closeMenu() : openMenu();
      });

      // Desktop Hover Support
      item.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 1024) openMenu();
      });

      item.addEventListener('mouseleave', () => {
        if (window.innerWidth >= 1024) closeMenu();
      });

      // Keyboard Esc Key Listener inside dropdown
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeMenu();
          btn.focus();
        }
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (activeDisclosure && !activeDisclosure.contains(e.target)) {
        closeAllDesktopMenus();
      }
    });
  }

  function closeAllDesktopMenus() {
    document.querySelectorAll('.nav-disclosure-btn').forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
    });
    document.querySelectorAll('.mega-dropdown').forEach(dropdown => {
      dropdown.classList.remove('is-open');
    });
    activeDisclosure = null;
  }

  function setupMobileDrawer() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const drawerCloseBtn = document.querySelector('.drawer-close-btn');
    const backdrop = document.querySelector('.drawer-backdrop');

    if (!hamburgerBtn || !mobileDrawer) return;

    function openDrawer() {
      hamburgerBtn.classList.add('is-active');
      mobileDrawer.classList.add('is-open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      if (backdrop) backdrop.classList.add('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';

      // Focus first element inside drawer
      const firstFocusable = mobileDrawer.querySelector('button, a, input');
      if (firstFocusable) firstFocusable.focus();
    }

    function closeDrawer() {
      hamburgerBtn.classList.remove('is-active');
      mobileDrawer.classList.remove('is-open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      if (backdrop) backdrop.classList.remove('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      hamburgerBtn.focus();
    }

    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('is-open');
      isOpen ? closeDrawer() : openDrawer();
    });

    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    // Escape key & Focus Trap inside Mobile Drawer
    mobileDrawer.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDrawer();
        return;
      }

      if (e.key === 'Tab') {
        const focusables = mobileDrawer.querySelectorAll('button, a, input, select, textarea');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    });
  }

  function setupMobileAccordions() {
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    accordionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.accordion-item');
        const isActive = item.classList.contains('is-active');

        // Close other items
        document.querySelectorAll('.accordion-item').forEach(other => {
          if (other !== item) {
            other.classList.remove('is-active');
            const otherBtn = other.querySelector('.accordion-btn');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        item.classList.toggle('is-active', !isActive);
        btn.setAttribute('aria-expanded', !isActive ? 'true' : 'false');
      });
    });
  }

  return { init, closeAllDesktopMenus };
})();

document.addEventListener('DOMContentLoaded', NavModule.init);
