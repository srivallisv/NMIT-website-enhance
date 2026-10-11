/* ==========================================
   NMIT REDESIGN - ACCESSIBLE DIV MODAL ENGINE
   ========================================== */

const ModalModule = (function() {
  let activeModal = null;
  let activeTrigger = null;
  let galleryItemsList = [];
  let currentGalleryIndex = 0;

  function init() {
    setupModalTriggers();
    setupCloseHandlers();
    setupSearchOverlay();
  }

  function openModal(modalEl, triggerEl) {
    if (!modalEl) return;

    activeTrigger = triggerEl || document.activeElement;
    activeModal = modalEl;

    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) backdrop.classList.add('is-active');

    modalEl.hidden = false;
    modalEl.classList.add('is-active');
    modalEl.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';

    // Focus first focusable element inside modal
    setTimeout(() => {
      const focusables = modalEl.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusables.length) {
        focusables[0].focus();
      }
    }, 50);
  }

  function closeModal() {
    if (!activeModal) return;

    // If video modal, stop YouTube playback by clearing container iframe
    if (activeModal.id === 'video-modal') {
      const playerContainer = document.getElementById('modal-video-container');
      if (playerContainer) playerContainer.innerHTML = '';
    }

    activeModal.classList.remove('is-active');
    activeModal.setAttribute('aria-hidden', 'true');
    activeModal.hidden = true;

    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) backdrop.classList.remove('is-active');

    document.body.style.overflow = '';

    if (activeTrigger && typeof activeTrigger.focus === 'function') {
      activeTrigger.focus();
    }

    activeModal = null;
    activeTrigger = null;
  }

  function setupModalTriggers() {
    // 1. Alumni Modal Triggers
    const alumniGrid = document.getElementById('alumni-grid');
    if (alumniGrid && typeof NMIT_DATA !== 'undefined') {
      alumniGrid.innerHTML = NMIT_DATA.alumni.map(alum => `
        <button class="alumni-card" data-alumni="${alum.id}" aria-label="View details for ${alum.name}">
          <div class="alumni-avatar" aria-hidden="true">${getInitials(alum.name)}</div>
          <h3 class="alumni-name">${alum.name}</h3>
          <div class="alumni-dept">${alum.dept}</div>
          <div class="alumni-role">${alum.role}</div>
        </button>
      `).join('');

      const alumniCards = alumniGrid.querySelectorAll('.alumni-card');
      const alumniModal = document.getElementById('alumni-modal');

      alumniCards.forEach(card => {
        card.addEventListener('click', () => {
          const key = card.getAttribute('data-alumni');
          const data = NMIT_DATA.alumni.find(a => a.id === key);
          if (data && alumniModal) {
            document.getElementById('modal-alumni-name').textContent = data.name;
            document.getElementById('modal-alumni-dept').textContent = data.dept;
            document.getElementById('modal-alumni-batch').textContent = `Batch: ${data.batch}`;
            document.getElementById('modal-alumni-role').textContent = data.role;
            document.getElementById('modal-alumni-bio').textContent = data.bio;
            openModal(alumniModal, card);
          }
        });
      });
    }

    // 2. Video Modal Triggers
    const videoGrid = document.getElementById('video-grid');
    if (videoGrid && typeof NMIT_DATA !== 'undefined') {
      videoGrid.innerHTML = NMIT_DATA.videos.map((vid, idx) => `
        <button class="video-card" data-video-id="${vid.id}" data-video-title="${vid.title}" aria-label="Play ${vid.title}">
          <div class="video-thumb">
            <img src="${vid.thumb}" alt="Thumbnail for ${vid.title}" loading="lazy">
            <div class="play-btn-circle" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
          <div class="video-title">${vid.title}</div>
        </button>
      `).join('');

      const videoCards = videoGrid.querySelectorAll('.video-card');
      const videoModal = document.getElementById('video-modal');

      videoCards.forEach(card => {
        card.addEventListener('click', () => {
          const videoId = card.getAttribute('data-video-id');
          const videoTitle = card.getAttribute('data-video-title');
          const container = document.getElementById('modal-video-container');

          if (videoModal && container) {
            document.getElementById('modal-video-title').textContent = videoTitle;
            // Inject YouTube embed iframe with autoplay=1
            container.innerHTML = `
              <iframe title="${escapeHTML(videoTitle)}" src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width: 100%; height: 100%; border: 0; aspect-ratio: 16/9; border-radius: 8px;"></iframe>
            `;
            openModal(videoModal, card);
          }
        });
      });
    }

    // 3. Gallery Lightbox Triggers
    const galleryButtons = document.querySelectorAll('.gallery-item-btn');
    const lightboxModal = document.getElementById('lightbox-modal');

    galleryItemsList = Array.from(galleryButtons);

    galleryButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        currentGalleryIndex = index;
        showGalleryImage(lightboxModal, btn);
      });
    });

    const prevGalleryBtn = document.getElementById('lightbox-prev-btn');
    const nextGalleryBtn = document.getElementById('lightbox-next-btn');

    if (prevGalleryBtn) {
      prevGalleryBtn.addEventListener('click', () => {
        if (!galleryItemsList.length) return;
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryItemsList.length) % galleryItemsList.length;
        showGalleryImage(lightboxModal, galleryItemsList[currentGalleryIndex]);
      });
    }

    if (nextGalleryBtn) {
      nextGalleryBtn.addEventListener('click', () => {
        if (!galleryItemsList.length) return;
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryItemsList.length;
        showGalleryImage(lightboxModal, galleryItemsList[currentGalleryIndex]);
      });
    }
  }

  function showGalleryImage(lightboxModal, triggerBtn) {
    const img = triggerBtn.querySelector('img');
    const captionText = triggerBtn.querySelector('.gallery-item__overlay')?.textContent || img?.alt || 'Campus Visual';

    if (img && lightboxModal) {
      document.getElementById('modal-lightbox-img').src = img.src;
      document.getElementById('modal-lightbox-img').alt = img.alt;
      document.getElementById('modal-lightbox-caption').textContent = captionText;
      openModal(lightboxModal, triggerBtn);
    }
  }

  function getInitials(name) {
    if (!name) return 'NM';
    const parts = name.replace(/^Dr\.\s+/, '').trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].substring(0, 2).toUpperCase();
  }

  function setupSearchOverlay() {
    const searchBtns = document.querySelectorAll('.search-trigger-btn');
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-modal-input');
    const searchResults = document.getElementById('search-modal-results');

    if (!searchModal || !searchInput || !searchResults) return;

    searchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        openModal(searchModal, btn);
        searchInput.value = '';
        renderSearchResults('', searchResults);
        setTimeout(() => searchInput.focus(), 100);
      });
    });

    let selectedIndex = -1;

    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      selectedIndex = -1;
      renderSearchResults(q, searchResults);
    });

    searchInput.addEventListener('keydown', (e) => {
      const resultItems = searchResults.querySelectorAll('.search-result-item');
      if (!resultItems.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % resultItems.length;
        highlightSearchResult(resultItems, selectedIndex);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + resultItems.length) % resultItems.length;
        highlightSearchResult(resultItems, selectedIndex);
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        resultItems[selectedIndex].click();
      }
    });
  }

  function renderSearchResults(query, container) {
    if (!query) {
      container.innerHTML = '<p class="search-hint" style="color: var(--color-text-muted); padding: 1rem 0;">Type a program, section, or facility name to search...</p>';
      return;
    }

    // Build dynamic search index from page content & NMIT_DATA
    const index = [];

    if (typeof NMIT_DATA !== 'undefined') {
      NMIT_DATA.programs.forEach(p => {
        index.push({ name: p.name, category: `Program (${p.badge})`, url: p.url });
      });
      NMIT_DATA.news.forEach(n => {
        index.push({ name: n.title, category: 'News Article', url: n.url });
      });
      NMIT_DATA.announcements.forEach(a => {
        index.push({ name: a.title, category: 'Announcement', url: a.url });
      });
      Object.keys(NMIT_DATA.navMenus).forEach(cat => {
        NMIT_DATA.navMenus[cat].forEach(item => {
          index.push({ name: item.name, category: 'Navigation Link', url: item.url });
        });
      });
    }

    const matches = index.filter(i => i.name.toLowerCase().includes(query));

    if (matches.length === 0) {
      container.innerHTML = `<p class="search-hint" style="color: var(--color-text-muted); padding: 1rem 0;">No matching results found for "${escapeHTML(query)}".</p>`;
      return;
    }

    container.innerHTML = matches.slice(0, 10).map((m, idx) => `
      <a href="${m.url}" class="search-result-item" target="_blank" rel="noopener noreferrer" data-index="${idx}">
        <div style="font-weight: 600;">${escapeHTML(m.name)}</div>
        <div style="font-size: 0.75rem; color: var(--color-text-muted);">${escapeHTML(m.category)}</div>
      </a>
    `).join('');
  }

  function highlightSearchResult(items, index) {
    items.forEach((item, idx) => {
      item.classList.toggle('is-selected', idx === index);
      if (idx === index) item.scrollIntoView({ block: 'nearest' });
    });
  }

  function setupCloseHandlers() {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', closeModal);
    });

    // Escape Key & Focus Trap Listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && activeModal) {
        closeModal();
        return;
      }

      if (e.key === 'Tab' && activeModal) {
        const focusables = activeModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
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

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  return { init, openModal, closeModal };
})();

document.addEventListener('DOMContentLoaded', ModalModule.init);
