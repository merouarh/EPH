/* ============================================================
   EPH SOEURS BEDJ CHLEF — SHARED JAVASCRIPT
   ============================================================ */

/* ===== ACTIVE NAV LINK ===== */
(function () {
  const page = location.pathname.split('/').pop() || 'Accueil.html';
  document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'Accueil.html') || (page === 'index.html' && href === 'Accueil.html')) {
      link.classList.add('active');
    }
  });
})();

/* ===== NAVBAR SCROLL ===== */
window.addEventListener('scroll', () => {
  const nb = document.getElementById('navbar');
  if (nb) nb.classList.toggle('scrolled', window.scrollY > 30);
});

/* ===== HAMBURGER ===== */
function toggleMobile() {
  const hb = document.getElementById('hamburger');
  const mm = document.getElementById('mobileMenu');
  if (hb) hb.classList.toggle('open');
  if (mm) mm.classList.toggle('open');
}
function closeMobile() {
  const hb = document.getElementById('hamburger');
  const mm = document.getElementById('mobileMenu');
  if (hb) hb.classList.remove('open');
  if (mm) mm.classList.remove('open');
}

/* ===== LANGUAGE DROPDOWN ===== */
function toggleLang() {
  document.getElementById('langDropdown').classList.toggle('open');
}
function setLang(code, flag, label) {
  document.getElementById('activeLangFlag').textContent = flag;
  document.getElementById('activeLangLabel').textContent = label;
  document.getElementById('langDropdown').classList.remove('open');
  document.querySelectorAll('.lang-option').forEach(o => o.classList.remove('active'));
  event.currentTarget.classList.add('active');
  // Optionally store preference
  localStorage.setItem('eph-lang', code);
}
document.addEventListener('click', e => {
  const ld = document.getElementById('langDropdown');
  if (ld && !e.target.closest('#langDropdown')) ld.classList.remove('open');
});

/* ===== THEME TOGGLE ===== */
function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? '' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('eph-theme', newTheme);
}
// Apply saved theme on load
(function () {
  const saved = localStorage.getItem('eph-theme');
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
})();

/* ===== SCROLL REVEAL ===== */
function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  els.forEach(el => { if (!el.classList.contains('visible')) obs.observe(el); });
}
document.addEventListener('DOMContentLoaded', initReveal);

/* ===== FOOTER SEARCH ===== */
function footerSearch(e) {
  if (e.key === 'Enter' || e.type === 'click') {
    const input = document.getElementById('footer-search-input');
    if (!input) return;
    const q = input.value.toLowerCase().trim();
    if (!q) return;
    const map = {
      urgence: 'Services.html', chirurgie: 'Services.html', radiologie: 'Services.html',
      laboratoire: 'Services.html', service: 'Services.html',
      médecin: 'Medecin.html', doctor: 'Medecin.html', medecin: 'Medecin.html',
      contact: 'Contact.html', accueil: 'Accueil.html', home: 'Accueil.html',
      about: 'Presentation.html', présentation: 'Presentation.html', presentation: 'Presentation.html',
      maternité: 'Services.html', cardiologie: 'Services.html', neurologie: 'Services.html'
    };
    for (const [k, v] of Object.entries(map)) {
      if (q.includes(k)) { window.location.href = v; return; }
    }
    window.location.href = 'Services.html';
    input.value = '';
  }
}
