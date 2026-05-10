/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, once: true });

  initHamburger();
  initDarkMode();
  initBackToTop();
  initTabBar();
  initResourceButtons();
  initCoursCards();
  initCoursPanel();
});

/* ===== HAMBURGER ===== */
function initHamburger() {
  const btn = document.getElementById('hamburgerBtn');
  const nav = document.getElementById('navLinks');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => nav.classList.toggle('open'));

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

/* ===== DARK MODE ===== */
function initDarkMode() {
  const toggle = document.getElementById('darkModeToggle');
  if (!toggle) return;

  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    toggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  toggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);
    toggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });
}

/* ===== BACK TO TOP ===== */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        btn.classList.toggle('show', window.scrollY > 300);
        ticking = false;
      });
      ticking = true;
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== TAB BAR (cours panels) ===== */
function initTabBar() {
  const panels = {
    tc: [
      { title: 'Fonctions Numériques', pdf: '#', video: '#' },
      { title: 'Trigonométrie', pdf: '#', video: '#' },
      { title: 'Statistiques', pdf: '#', video: '#' }
    ],
    '1bac': [
      { title: 'Suites numériques', pdf: '#', video: '#' },
      { title: 'Limites et dérivation', pdf: '#', video: '#' },
      { title: 'Barycentre', pdf: '#', video: '#' }
    ],
    '2bac': [
      { title: 'Nombres complexes', pdf: '#', video: '#' },
      { title: 'Fonctions ln/exp', pdf: '#', video: '#' },
      { title: 'Calcul intégral', pdf: '#', video: '#' }
    ],
    sp: [
      { title: 'Fonctions logarithmes', pdf: '#', video: '#' },
      { title: 'Équations différentielles', pdf: '#', video: '#' },
      { title: 'Probabilités', pdf: '#', video: '#' }
    ],
    bts: [
      { title: 'Calcul matriciel', pdf: '#', video: '#' },
      { title: 'Diagonalisation', pdf: '#', video: '#' },
      { title: 'Séries numériques', pdf: '#', video: '#' }
    ]
  };

  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const panel = btn.dataset.panel;
      showCoursPanel(panel);
    });
  });

  function showCoursPanel(level) {
    document.querySelectorAll('.cours-panel').forEach(p => (p.style.display = 'none'));
    const panel = document.getElementById(`panel-${level}`);
    if (!panel) return;
    panel.style.display = 'block';
    const cards = panels[level];
    if (cards && (!panel.dataset.loaded || panel.dataset.loaded !== level)) {
      panel.innerHTML = '<div class="grid">' +
        cards.map(c => `
          <div class="card">
            <h3>${c.title}</h3>
            <div class="resource-buttons">
              <button class="btn btn-primary" onclick="toast('📥 PDF')">📥 Cours PDF</button>
              <button class="btn btn-outline" onclick="toast('🎥 Vidéo')">▶ Vidéo</button>
            </div>
          </div>
        `).join('') +
        '</div>';
      panel.dataset.loaded = level;
    }
  }
}

/* ===== COURSE PANELS ===== */
function initCoursPanel() {
  document.getElementById('panel-tc').style.display = 'block';
}

/* ===== COURSE CARDS (lycée) ===== */
function initCoursCards() {
  document.querySelectorAll('.resource-buttons').forEach(el => {
    if (!el.hasChildNodes() || (el.children.length === 1 && el.children[0].tagName === 'BR')) {
      el.innerHTML = '';
    }
  });
}

function initResourceButtons() {
  const btns = `
    <button class="res-btn res-pdf" onclick="toast('🔜 PDF à venir')">📄 Cours</button>
    <button class="res-btn res-exo" onclick="toast('🔜 Énoncés à venir')">📝 Énoncés</button>
    <button class="res-btn res-cor" onclick="toast('🔜 Corrigés à venir')">✅ Corrigés</button>
    <button class="res-btn res-vid" onclick="toast('🔜 Vidéo à venir')">🎥 Vidéos</button>
  `;
  document.querySelectorAll('.chapter-item .resource-buttons:empty').forEach(el => {
    el.innerHTML = btns;
  });
}

/* ===== TOAST ===== */
window.toast = function (msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3000);
};
