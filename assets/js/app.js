/* ============================================================
   app.js — boot, hash router, shell chrome, study timer
   ============================================================ */
import { $, $$, toast, hm, el, esc } from './util.js';
import { S, daysToExam, todayISO } from './store.js';

const routes = {
  dashboard:      () => import('./views/dashboard.js'),
  roadmap:        () => import('./views/roadmap.js'),
  today:          () => import('./views/roadmap.js'),
  syllabus:       () => import('./views/syllabus.js'),
  notes:          () => import('./views/notes.js'),
  library:        () => import('./views/library.js'),
  videos:         () => import('./views/videos.js'),
  flashcards:     () => import('./views/flashcards.js'),
  practice:       () => import('./views/practice.js'),
  revision:       () => import('./views/revision.js'),
  mocks:          () => import('./views/mocks.js'),
  currentaffairs: () => import('./views/currentaffairs.js'),
  analytics:      () => import('./views/analytics.js'),
  settings:       () => import('./views/settings.js')
};

const view = $('#view');

function parseHash() {
  const h = location.hash.replace(/^#\/?/, '') || 'dashboard';
  const [path, qs] = h.split('?');
  const seg = path.split('/').filter(Boolean);
  return { name: seg[0] || 'dashboard', params: seg.slice(1).map(decodeURIComponent), query: new URLSearchParams(qs || '') };
}

let currentToken = 0;
async function render() {
  const { name, params, query } = parseHash();
  const loader = routes[name] || routes.dashboard;
  const token = ++currentToken;

  view.innerHTML = '<div class="empty"><div class="big">◍</div>Loading…</div>';
  try {
    const mod = await loader();
    if (token !== currentToken) return;
    view.innerHTML = '';
    const fn = (name === 'today' && mod.today) ? mod.today : mod.default;
    const pageRoot=el('div'); view.append(pageRoot);
    await fn(pageRoot, { params, query, name });
  } catch (e) {
    console.error(e);
    view.innerHTML = `<div class="empty"><div class="big">⚠</div><h2>Something went wrong</h2>
      <p class="small">${esc(e.message)}</p>
      <p class="small muted">If you opened this file directly from disk, use the local server
      (<code>npm start</code>) or the published GitHub Pages link — browsers block data loading on <code>file://</code>.</p></div>`;
  }

  $$('.sidenav a').forEach(a => a.classList.toggle('active', a.dataset.nav === name));
  document.body.classList.remove('nav-open');
  view.scrollTop = 0; window.scrollTo(0, 0);
  document.title = `${name[0].toUpperCase() + name.slice(1)} · SEBI Grade A (IT) Hub`;
}

/* ---------------- chrome ---------------- */
function paintChrome() {
  const d = daysToExam();
  const cd = $('#examCountdown');
  if (d === null)      { cd.textContent = 'Set exam date'; cd.onclick = () => location.hash = '#/settings'; cd.style.cursor = 'pointer'; }
  else if (d >= 0)     { cd.textContent = `D-${d}`; cd.title = `${d} days to ${S.settings.examDate}`; }
  else                 { cd.textContent = 'Exam date passed'; }

  cd.onclick = () => location.hash = '#/settings'; cd.style.cursor='pointer';
  $('#streakChip').textContent = `🔥 ${S.streak()} day streak`;
  $('#timerToday').textContent = hm(S.minutesOn(todayISO()));
}

function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  document.querySelector('meta[name=theme-color]').setAttribute('content', t === 'dark' ? '#0b1020' : '#f4f6fb');
}

/* ---------------- study timer ---------------- */
const timer = {
  secs: 45 * 60, left: 45 * 60, running: false, iv: null, accrued: 0,
  el: { pop: null, clock: null, start: null },
  init() {
    this.el.pop = $('#timerPop'); this.el.clock = $('#timerClock'); this.el.start = $('#timerStart');
    $('#timerBtn').onclick = () => { this.el.pop.hidden = !this.el.pop.hidden; };
    $('#timerClose').onclick = () => { this.el.pop.hidden = true; };
    $('#timerStart').onclick = () => this.toggle();
    $('#timerReset').onclick = () => this.reset();
    $('#timerLen').onchange = e => { this.secs = +e.target.value * 60; this.reset(); };
    this.secs = +$('#timerLen').value * 60; this.reset();
  },
  toggle() {
    if (this.running) { this.stop(true); return; }
    if(this.left<=0)this.left=this.secs;
    this.lastTick=Date.now();
    this.running = true; this.el.start.textContent = 'Pause';
    $('#timerMode').textContent = 'Focus · running';
    this.iv = setInterval(() => {
      this.advance();
      if (this.left <= 0) { this.stop(false); this.ding(); toast('Session complete — log a break ✅', 4000); }
      this.paint();
    }, 1000);
  },
  stop(manual) {
    if(this.running)this.advance();
    clearInterval(this.iv); this.running = false;
    this.el.start.textContent = manual ? 'Resume' : 'Start';
    $('#timerMode').textContent = manual ? 'Focus · paused' : 'Focus';
  },
  advance() {
    const seconds=Math.min(this.left,Math.floor((Date.now()-this.lastTick)/1000));
    this.lastTick+=seconds*1000;this.left-=seconds;this.accrued+=seconds;
    const mins=Math.floor(this.accrued/60);
    if(mins){if(this.secs!==300)S.addMinutes(mins);this.accrued%=60;paintChrome();}
  },
  reset() { this.stop(false); this.left = this.secs; this.accrued = 0; this.paint(); },
  paint() {
    const m = Math.floor(Math.max(0, this.left) / 60), s = Math.max(0, this.left) % 60;
    this.el.clock.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    document.title = this.running ? `${this.el.clock.textContent} · studying` : document.title;
  },
  ding() {
    try {
      const a = new AudioContext(), o = a.createOscillator(), g = a.createGain();
      o.connect(g); g.connect(a.destination); o.frequency.value = 880; o.type = 'sine';
      g.gain.setValueAtTime(.001, a.currentTime);
      g.gain.exponentialRampToValueAtTime(.25, a.currentTime + .02);
      g.gain.exponentialRampToValueAtTime(.001, a.currentTime + 1.1);
      o.start(); o.stop(a.currentTime + 1.2);
    } catch {}
  }
};

/* ---------------- boot ---------------- */
function boot() {
  applyTheme(S.settings.theme || 'dark');

  $('#navToggle').onclick = () => document.body.classList.toggle('nav-open');
  $('#scrim').onclick = () => document.body.classList.remove('nav-open');
  $('#themeBtn').onclick = () => {
    const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    S.set('settings.theme', t); applyTheme(t);
  };

  timer.init();
  window.addEventListener('hashchange', render);
  window.addEventListener('state:change', paintChrome);
  window.addEventListener('storage:failed',()=>toast('Your browser could not save progress. Export a backup before closing.',7000));
  if ('serviceWorker' in navigator) navigator.serviceWorker.ready.then(()=>{S.m('offlineReady',true);});

  // keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.target.matches('input,textarea,select')) return;
    if (e.key === 'g') { window._g = true; setTimeout(() => window._g = false, 700); return; }
    if (window._g) {
      const map = { d: 'dashboard', r: 'roadmap', t: 'today', n: 'notes', l: 'library', p: 'practice', m: 'mocks', a: 'analytics', s: 'settings' };
      if (map[e.key]) { location.hash = '#/' + map[e.key]; window._g = false; }
    }
  });

  $('#boot').remove();
  $('.topbar').hidden = false;
  $('.shell').hidden = false;
  paintChrome();
  render();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
export { paintChrome };
