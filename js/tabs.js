/* ==========================================
   NMIT REDESIGN - ACCESSIBLE PROGRAM TABS & LIVE SEARCH
   ========================================== */

const TabsModule = (function() {
  function init() {
    renderProgramsData();
    setupProgramTabsARIA();
    setupProgramSearch();
  }

  function renderProgramsData() {
    const grid = document.getElementById('programs-grid');
    if (!grid || typeof NMIT_DATA === 'undefined') return;

    grid.innerHTML = NMIT_DATA.programs.map((prog, idx) => `
      <article class="program-card" data-category="${prog.category}" id="program-card-${idx}">
        <div class="program-card__header">
          <div class="program-card__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>
          </div>
          <span class="program-badge">${prog.badge}</span>
        </div>
        <h3 class="program-card__title">${prog.name}</h3>
        <div class="program-card__footer">
          <a href="${prog.url}" class="program-card__link" target="_blank" rel="noopener noreferrer" aria-label="Learn more about ${prog.name}">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </article>
    `).join('');

    updateTabCounts();
  }

  function updateTabCounts() {
    const tabBtns = document.querySelectorAll('.program-tab-btn');
    if (!tabBtns.length || typeof NMIT_DATA === 'undefined') return;

    const counts = {
      all: NMIT_DATA.programs.length,
      btech: NMIT_DATA.programs.filter(p => p.category === 'btech').length,
      bsc: NMIT_DATA.programs.filter(p => p.category === 'bsc').length,
      pg: NMIT_DATA.programs.filter(p => p.category === 'pg').length,
      phd: NMIT_DATA.programs.filter(p => p.category === 'phd').length,
      supporting: NMIT_DATA.programs.filter(p => p.category === 'supporting').length
    };

    tabBtns.forEach(btn => {
      const cat = btn.getAttribute('data-tab');
      const labelSpan = btn.querySelector('.tab-count');
      if (labelSpan && counts[cat] !== undefined) {
        labelSpan.textContent = `(${counts[cat]})`;
      }
    });
  }

  function setupProgramTabsARIA() {
    const tabList = document.querySelector('[role="tablist"].tabs-nav');
    const tabs = document.querySelectorAll('.program-tab-btn');

    if (!tabList || !tabs.length) return;

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        activateTab(tab, tabs);
      });

      tab.addEventListener('keydown', (e) => {
        let targetIndex = null;
        if (e.key === 'ArrowRight') {
          targetIndex = (index + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft') {
          targetIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (e.key === 'Home') {
          targetIndex = 0;
        } else if (e.key === 'End') {
          targetIndex = tabs.length - 1;
        }

        if (targetIndex !== null) {
          e.preventDefault();
          tabs[targetIndex].focus();
          activateTab(tabs[targetIndex], tabs);
        }
      });
    });
  }

  function activateTab(activeTab, tabs) {
    tabs.forEach(t => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
    });

    activeTab.classList.add('is-active');
    activeTab.setAttribute('aria-selected', 'true');
    activeTab.setAttribute('tabindex', '0');

    const category = activeTab.getAttribute('data-tab');
    const searchInput = document.querySelector('.program-search-input');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    filterPrograms(category, query);
  }

  function setupProgramSearch() {
    const searchInput = document.querySelector('.program-search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const activeTab = document.querySelector('.program-tab-btn[aria-selected="true"]');
      const category = activeTab ? activeTab.getAttribute('data-tab') : 'all';

      filterPrograms(category, query);
    });
  }

  function filterPrograms(category, query) {
    const cards = document.querySelectorAll('.program-card');
    const emptyState = document.getElementById('program-empty-state');
    let visibleCount = 0;

    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const title = card.querySelector('.program-card__title').textContent.toLowerCase();

      const matchesCategory = (category === 'all' || cardCategory === category);
      const matchesQuery = !query || title.includes(query);

      if (matchesCategory && matchesQuery) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.hidden = false;
        emptyState.textContent = query 
          ? `No programs match your search term "${query}".`
          : 'No programs available in this category.';
      } else {
        emptyState.hidden = true;
      }
    }
  }

  return { init, filterPrograms };
})();

document.addEventListener('DOMContentLoaded', TabsModule.init);
