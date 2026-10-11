/* ==========================================
   NMIT REDESIGN - HERO SLIDER & TICKER
   ========================================== */

const SliderModule = (function() {
  let currentIndex = 0;
  let slides = [];
  let dots = [];
  let autoTimer = null;
  let isPausedManually = false;
  const INTERVAL = 5000;

  function init() {
    setupHeroSlider();
    setupTicker();
  }

  function setupHeroSlider() {
    const heroSection = document.querySelector('.hero-section');
    slides = document.querySelectorAll('.hero-slide');
    dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.hero-prev-btn');
    const nextBtn = document.querySelector('.hero-next-btn');
    const playPauseBtn = document.querySelector('.hero-play-pause-btn');

    if (!slides.length || !heroSection) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function goToSlide(index) {
      slides.forEach((slide, idx) => {
        const isActive = idx === index;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });

      dots.forEach((dot, idx) => {
        const isActive = idx === index;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      currentIndex = index;
    }

    function nextSlide() {
      const nextIdx = (currentIndex + 1) % slides.length;
      goToSlide(nextIdx);
    }

    function prevSlide() {
      const prevIdx = (currentIndex - 1 + slides.length) % slides.length;
      goToSlide(prevIdx);
    }

    const svgPause = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
    const svgPlay = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';

    function startTimer() {
      if (prefersReducedMotion || isPausedManually) return;
      stopTimer();
      autoTimer = setInterval(nextSlide, INTERVAL);
      heroSection.setAttribute('aria-live', 'off');
      if (playPauseBtn) {
        playPauseBtn.setAttribute('aria-label', 'Pause slider auto-play');
        const icon = playPauseBtn.querySelector('.play-pause-icon');
        if (icon) icon.innerHTML = svgPause;
      }
    }

    function stopTimer() {
      if (autoTimer) clearInterval(autoTimer);
      heroSection.setAttribute('aria-live', 'polite');
      if (playPauseBtn) {
        playPauseBtn.setAttribute('aria-label', 'Play slider auto-play');
        const icon = playPauseBtn.querySelector('.play-pause-icon');
        if (icon) icon.innerHTML = svgPlay;
      }
    }

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        isPausedManually = !isPausedManually;
        isPausedManually ? stopTimer() : startTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        startTimer();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        startTimer();
      });
    });

    heroSection.addEventListener('mouseenter', () => stopTimer());
    heroSection.addEventListener('mouseleave', () => {
      if (!isPausedManually) startTimer();
    });

    // Keyboard Arrow Keys
    heroSection.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
        startTimer();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
        startTimer();
      }
    });

    goToSlide(0);
    if (!prefersReducedMotion) {
      startTimer();
    }
  }

  function setupTicker() {
    const tickerStrip = document.querySelector('.ticker-strip');
    const pauseBtn = document.querySelector('.ticker-pause-btn');

    if (!tickerStrip || !pauseBtn) return;

    const tickerSvgPause = '<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
    const tickerSvgPlay = '<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';

    pauseBtn.addEventListener('click', () => {
      const isPaused = tickerStrip.classList.toggle('is-paused');
      const iconSpan = pauseBtn.querySelector('.ticker-pause-icon');
      const textSpan = pauseBtn.querySelector('.ticker-pause-text');
      if (iconSpan) iconSpan.innerHTML = isPaused ? tickerSvgPlay : tickerSvgPause;
      if (textSpan) textSpan.textContent = isPaused ? 'Play' : 'Pause';
      pauseBtn.setAttribute('aria-label', isPaused ? 'Play Announcement Ticker' : 'Pause Announcement Ticker');
    });
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', SliderModule.init);
