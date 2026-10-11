/* ==========================================
   NMIT REDESIGN - MAIN CONTROLLER & PERFORMANCE
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  setupThrottledScrollHandler();
  setupIntersectionObserverScrollSpy();
  console.log('NMIT Redesign Platform Initialized Successfully.');
});

/* Single Throttled Scroll Handler for Header, Progress Bar & Back-to-Top */
function setupThrottledScrollHandler() {
  const header = document.querySelector('.site-header');
  const progressBar = document.querySelector('.scroll-progress-bar');
  const backToTopBtn = document.querySelector('.back-to-top-btn');

  let isTicking = false;

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        handleScrollUpdates(header, progressBar, backToTopBtn);
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function handleScrollUpdates(header, progressBar, backToTopBtn) {
  const scrollY = window.scrollY;

  // 1. Sticky Header Shrink
  if (header) {
    if (scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  // 2. Scroll Progress Bar
  if (progressBar) {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = windowHeight > 0 ? (scrollY / windowHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(scrolled, 100)}%`;
  }

  // 3. Back to Top Button
  if (backToTopBtn) {
    if (scrollY > 400) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  }
}

/* IntersectionObserver for Scroll-Spy Active Links */
function setupIntersectionObserverScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"], .mega-dropdown__item[href^="#"]');

  if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.2, rootMargin: '-80px 0px -40% 0px' });

  sections.forEach(sec => observer.observe(sec));
}
