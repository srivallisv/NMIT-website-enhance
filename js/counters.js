/* ==========================================
   NMIT REDESIGN - ACCESSIBLE ANIMATED COUNTERS
   ========================================== */

const CountersModule = (function() {
  function init() {
    const counterElements = document.querySelectorAll('.stat-box__val[data-target]');
    if (!counterElements.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsIntersectionObserver = 'IntersectionObserver' in window;

    // If reduced motion or no IntersectionObserver, display final static values immediately
    if (prefersReducedMotion || !supportsIntersectionObserver) {
      counterElements.forEach(el => {
        const targetStr = el.getAttribute('data-target');
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        el.textContent = `${prefix}${targetStr}${suffix}`;
      });
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    counterElements.forEach(el => observer.observe(el));
  }

  function animateCounter(element) {
    const targetStr = element.getAttribute('data-target');
    const suffix = element.getAttribute('data-suffix') || '';
    const prefix = element.getAttribute('data-prefix') || '';
    const isFloat = targetStr.includes('.');
    const targetVal = parseFloat(targetStr);

    const duration = 2000;
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const currentVal = easeProgress * targetVal;

      if (isFloat) {
        element.textContent = `${prefix}${currentVal.toFixed(2)}${suffix}`;
      } else {
        element.textContent = `${prefix}${Math.floor(currentVal)}${suffix}`;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = `${prefix}${targetStr}${suffix}`;
      }
    }

    requestAnimationFrame(updateCount);
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', CountersModule.init);
