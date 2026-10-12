/* Ерасыл Ермеков CV сайты: негізгі скрипт.
   Модульдер: тіл, терминал, scroll-эффектілер, жоба терезесі, сертификат карточкасы, форма (Google Sheets). */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cfg = window.SITE_CONFIG || {};
  var D = window.I18N || { ru: {} };
  var LANGS = ['ru', 'kk', 'en'];
  var lang = 'ru';

  function t(k) {
    var d = D[lang];
    if (d && d[k] != null) return d[k];
    return (D.ru && D.ru[k] != null) ? D.ru[k] : k;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  function ctext(v) { return (v && typeof v === 'object') ? (v[lang] || v.en || v.ru) : v; }

  /* ------------------------------------------------------------------ toast */
  var toastEl = $('#toast'), toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2800);
  }

  /* --------------------------------------------------------- load sequence */
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { document.documentElement.classList.add('ready'); });
  });

  /* ------------------------------------------- hero: project diagram switcher */
  var vizSetup = (function () {
    var host = $('#viz'), tabsEl = $('#vtabs'), capEl = $('#vcap'), moreBtn = $('#vmore'), fileEl = $('.vh span'), card = $('.vcard');
    if (!host || !tabsEl) return function () {};
    var NAMES = { dealer: { ru: 'Дилер', kk: 'Дилер', en: 'Dealer' }, mgr: { ru: 'Менеджер', kk: 'Менеджер', en: 'Manager' } };
    var VZ = [
      { slug: 'peakrent-ai', tab: 'PeakRent', file: 'peakrent.kz', cap: 'vc_pk',
        L: [{ t: 'Next.js', s: { ru: 'клиент', kk: 'клиент', en: 'client' } },
            { t: { ru: 'Панели', kk: 'Панельдер', en: 'Panels' }, s: { ru: 'менеджер · админ', kk: 'менеджер · админ', en: 'manager · admin' } },
            { t: 'AI-chat', s: { ru: 'ассистент', kk: 'ассистент', en: 'assistant' } }],
        C: { t: 'Flask API', s: 'Python' },
        R: [{ t: 'PostgreSQL', s: 'SQLAlchemy' }, { t: 'OpenAI API', s: 'GPT-4o-mini' }, { t: 'OpenWeather', s: { ru: 'погода', kk: 'ауа райы', en: 'weather' } }] },
      { slug: 'ken-tereze-ai', tab: 'Ken Tereze', file: 'ken-tereze', cap: 'vc_kt',
        L: [{ t: NAMES.dealer, s: { ru: 'PDF-заказ', kk: 'PDF-тапсырыс', en: 'PDF order' } }, { t: 'Telegram', s: 'Bot API' }],
        C: { t: { ru: 'Расчёт', kk: 'Есептеу', en: 'Pricing' }, s: { ru: 'PDF → сумма', kk: 'PDF → сома', en: 'PDF → total' } },
        R: [{ t: 'PostgreSQL', s: { ru: 'история', kk: 'тарих', en: 'history' } }, { t: 'OpenAI API', s: { ru: 'диалог бота', kk: 'бот диалогы', en: 'bot dialog' } }, { t: NAMES.mgr, s: 'Telegram' }] },
      { slug: 'ai-business-assistant', tab: 'vt_as', file: 'ai-assistant', cap: 'vc_as',
        L: [{ t: 'Telegram', s: 'Bot API' }, { t: 'WhatsApp', s: 'Business API' }, { t: 'Instagram', s: 'Messaging API' }],
        C: { t: 'Python API', s: 'workflow' },
        R: [{ t: 'PostgreSQL', s: { ru: 'данные', kk: 'деректер', en: 'data' } }, { t: 'Google Sheets', s: 'live sync' }, { t: { ru: 'Внешние API', kk: 'Сыртқы API', en: 'External APIs' }, s: { ru: 'интеграции', kk: 'интеграциялар', en: 'integrations' } }] }
    ];
    var cur = 0, auto = !reduce, timer = null, first = true;
    function L(v) { return (v && typeof v === 'object') ? (v[lang] || v.en || v.ru) : v; }
    function ys(n) { return n === 1 ? [200] : n === 2 ? [133, 267] : [66, 200, 334]; }
    function ts(n) { return n === 1 ? [200] : n === 2 ? [192, 208] : [188, 200, 212]; }
    function node(x, y, n, d, core) {
      var tx = core ? x + 65 : x + 16;
      return '<g class="nd' + (core ? ' core' : '') + '" style="--d:' + d.toFixed(2) + 's"><rect x="' + x + '" y="' + y + '" width="130" height="' + (core ? 100 : 52) + '" rx="' + (core ? 16 : 12) + '"/>' +
        '<text class="nt" x="' + tx + '" y="' + (core ? y + 44 : y + 23) + '"' + (core ? ' text-anchor="middle"' : '') + '>' + esc(L(n.t)) + '</text>' +
        '<text class="ns" x="' + tx + '" y="' + (core ? y + 64 : y + 40) + '"' + (core ? ' text-anchor="middle"' : '') + '>' + esc(L(n.s)) + '</text></g>';
    }
    function build(p) {
      var base = first ? .5 : 0, step = first ? .13 : .07, d = '', lines = '', pk = '', i, k = 0;
      var ly = ys(p.L.length), lt = ts(p.L.length), ry = ys(p.R.length), rt = ts(p.R.length);
      var paths = [];
      p.L.forEach(function (n, i) { paths.push('M130 ' + ly[i] + ' C172 ' + ly[i] + ' 158 ' + lt[i] + ' 195 ' + lt[i]); });
      p.R.forEach(function (n, i) { paths.push('M325 ' + rt[i] + ' C362 ' + rt[i] + ' 348 ' + ry[i] + ' 390 ' + ry[i]); });
      paths.forEach(function (dd, i) {
        d += '<path id="vp' + i + '" d="' + dd + '"/>';
        lines += '<use href="#vp' + i + '" class="ln"/><use href="#vp' + i + '" class="fl"/>';
        pk += '<circle class="pkt" r="4.5"><animateMotion dur="2.6s" begin="' + (((i % 3) * .9) + (i >= p.L.length ? 1.3 : 0)).toFixed(1) + 's" repeatCount="indefinite" calcMode="linear"><mpath href="#vp' + i + '"/></animateMotion></circle>';
      });
      var nodes = '';
      p.L.forEach(function (n, i) { nodes += node(0, ly[i] - 26, n, base + step * (k++)); });
      nodes += node(195, 150, p.C, base + step * (k++), true);
      p.R.forEach(function (n, i) { nodes += node(390, ry[i] - 26, n, base + step * (k++)); });
      return '<svg class="viz" viewBox="0 0 520 400" role="img" aria-label="' + esc(t('viz_aria')) + '" xmlns="http://www.w3.org/2000/svg"><defs>' + d + '</defs>' + lines + nodes + pk + '</svg>';
    }
    function drawTabs() {
      tabsEl.innerHTML = VZ.map(function (p, i) {
        return '<button type="button" class="vtab" role="tab" data-i="' + i + '" aria-selected="' + (i === cur) + '">' + esc(t(p.tab)) + '</button>';
      }).join('');
    }
    function paint() {
      var p = VZ[cur];
      host.innerHTML = build(p);
      fileEl.textContent = p.file + ' · live';
      capEl.textContent = t(p.cap);
      moreBtn.textContent = t('more') + ' \u2192';
      tabsEl.classList.toggle('auto', auto);
      drawTabs();
      first = false;
    }
    function schedule() {
      clearTimeout(timer);
      if (!auto || document.hidden) return;
      timer = setTimeout(function () { cur = (cur + 1) % VZ.length; paint(); schedule(); }, 6000);
    }
    tabsEl.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('.vtab'); if (!b) return;
      cur = +b.getAttribute('data-i'); auto = false; clearTimeout(timer); paint();
    });
    moreBtn.addEventListener('click', function () { openProject(VZ[cur].slug); });
    if (card) {
      card.addEventListener('mouseenter', function () { clearTimeout(timer); tabsEl.classList.remove('auto'); });
      card.addEventListener('mouseleave', function () { if (auto) { tabsEl.classList.add('auto'); paint(); schedule(); } });
    }
    document.addEventListener('visibilitychange', schedule);
    return function (restart) { paint(); if (restart) schedule(); };
  })();

  /* ------------------------------------------- ambient background: cursor spotlight (eased follow) */
  (function () {
    var bg = $('.bgfx');
    if (!bg || reduce || !window.matchMedia || !matchMedia('(pointer: fine)').matches) return;
    var tx = innerWidth * 0.72, ty = innerHeight * 0.28, cx = tx, cy = ty, run = false, EASE = 0.045;
    function step() {
      cx += (tx - cx) * EASE; cy += (ty - cy) * EASE;
      bg.style.setProperty('--mx', cx.toFixed(1) + 'px'); bg.style.setProperty('--my', cy.toFixed(1) + 'px');
      if (Math.abs(tx - cx) > 0.4 || Math.abs(ty - cy) > 0.4) requestAnimationFrame(step); else run = false;
    }
    window.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!run) { run = true; requestAnimationFrame(step); }
    }, { passive: true });
  })();

  /* ---------------------------------------------------- reveal on scroll */
  if ('IntersectionObserver' in window) {
    var revealIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); } });
    }, { threshold: 0.14 });
    $$('.reveal').forEach(function (el) { revealIO.observe(el); });
  } else { $$('.reveal').forEach(function (el) { el.classList.add('in'); }); }

  /* ------------------------------ header, progress, ring, timeline, mobile bar */
  var hd = $('#hd'), bar = $('#bar'), up = $('#up'), ring = $('#ring'), tl = $('#tl'), fill = $('#fill'), mbar = $('#mbar');
  var tlItems = $$('.ti'), ticking = false;
  function onScroll() {
    var y = window.scrollY || 0, max = document.documentElement.scrollHeight - innerHeight, p = max > 0 ? clamp(y / max, 0, 1) : 0;
    hd.classList.toggle('solid', y > 24);
    bar.style.transform = 'scaleX(' + p + ')';
    up.classList.toggle('show', y > 700);
    ring.style.strokeDashoffset = 150.8 * (1 - p);
    mbar.classList.toggle('show', y > innerHeight * 0.7);
    if (tl) {
      var r = tl.getBoundingClientRect(), h = r.height - 34, prog = clamp((innerHeight * 0.62 - r.top) / h, 0, 1);
      fill.style.height = (prog * h) + 'px';
      tlItems.forEach(function (it) { it.classList.toggle('on', it.offsetTop + 10 <= prog * h + 8); });
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', onScroll);
  up.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

  /* nav: sliding indicator follows the section in view */
  var links = $$('.nav a'), ind = $('#ind');
  function place(a) {
    if (!a || getComputedStyle(ind).display === 'none') return;
    ind.style.opacity = 1; ind.style.width = (a.offsetWidth - 28) + 'px'; ind.style.transform = 'translateX(' + (a.offsetLeft + 14) + 'px)';
  }
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) links.forEach(function (l) { var on = l.getAttribute('href') === '#' + e.target.id; l.classList.toggle('on', on); if (on) place(l); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (l) { var s = $(l.getAttribute('href')); if (s) spy.observe(s); });
    var heroSec = $('.hero');
    if (heroSec) new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { ind.style.opacity = 0; links.forEach(function (l) { l.classList.remove('on'); }); } });
    }, { threshold: 0.5 }).observe(heroSec);
  }

  /* mobile menu */
  var nav = $('#nav'), burger = $('#burger');
  function menu(open) {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.innerHTML = '<svg class="ic"><use href="#' + (open ? 'i-x' : 'i-menu') + '"/></svg>';
  }
  burger.addEventListener('click', function () { menu(!nav.classList.contains('open')); });
  links.forEach(function (l) { l.addEventListener('click', function () { menu(false); }); });

  /* ------------------------------------------------------------ theme toggle */
  var themeBtn = $('#theme'), themeMeta = $('meta[name="theme-color"]');
  function curTheme() { return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'; }
  function paintTheme() {
    var l = curTheme() === 'light';
    themeBtn.setAttribute('aria-pressed', l);
    if (themeMeta) themeMeta.setAttribute('content', l ? '#f7f2e8' : '#181614');
  }
  themeBtn.addEventListener('click', function () {
    var n = curTheme() === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', n);
    try { localStorage.setItem('theme', n); } catch (e) {}
    paintTheme();
  });
  paintTheme();

  /* ------------------------------------------------ images: find png/jpg/jpeg/webp */
  var EXTS = ['png', 'jpg', 'jpeg', 'webp'], probeCache = {};
  var BASE = cfg.PHOTO_BASE || '';
  function probe(base) {
    if (probeCache[base]) return probeCache[base];
    probeCache[base] = new Promise(function (res) {
      var i = 0;
      (function next() {
        if (i >= EXTS.length) return res(null);
        var url = base + '.' + EXTS[i++], im = new Image();
        im.onload = function () { res(url); };
        im.onerror = next;
        im.src = url;
      })();
    });
    return probeCache[base];
  }
  function projectImages(slug, P) {
    if (!BASE) return Promise.resolve([]);
    return Promise.all(P.files.map(function (f) { return probe(BASE + slug + '/' + f); })).then(function (a) { return a.filter(Boolean); });
  }

  /* project card art: cover.* or 1.* replaces the illustration when the file exists */
  $$('.p[data-slug]').forEach(function (card) {
    if (!BASE) return;
    var slug = card.getAttribute('data-slug'), art = $('.art', card);
    probe(BASE + slug + '/cover').then(function (u) { return u || probe(BASE + slug + '/1'); }).then(function (u) {
      if (!u) return;
      var d = document.createElement('div'); d.className = 'shot-bg'; d.style.backgroundImage = 'url("' + u + '")';
      art.appendChild(d); card.classList.add('has-img');
    });
  });

  /* ------------------------------------------------------------ dialogs (shared) */
  var pm = $('#pm'), pmBody = $('#pmBody'), cm = $('#cm'), cmBody = $('#cmBody'), lb = $('#lb'), lbImg = $('#lbImg');
  var curSlug = null, curCert = null, curTab = 'ov';
  function openDlg(d) { document.documentElement.classList.add('lock'); if (d.showModal) d.showModal(); else d.setAttribute('open', ''); }
  function closeDlg(d) { if (d.close) d.close(); else d.removeAttribute('open'); }
  function onClosed() { if (!pm.open && !cm.open && !lb.open) document.documentElement.classList.remove('lock'); }
  [pm, cm, lb].forEach(function (d) {
    d.addEventListener('close', onClosed);
    d.addEventListener('click', function (e) { if (e.target === d || (e.target.hasAttribute && e.target.hasAttribute('data-close'))) closeDlg(d); });
  });
  pm.addEventListener('close', function () { curSlug = null; });
  cm.addEventListener('close', function () { curCert = null; });
  $('#pmClose').addEventListener('click', function () { closeDlg(pm); });
  $('#cmClose').addEventListener('click', function () { closeDlg(cm); });
  $('#lbClose').addEventListener('click', function () { closeDlg(lb); });
  function zoom(img) { lbImg.src = img.src; lbImg.alt = img.alt; openDlg(lb); }
  pmBody.addEventListener('click', function (e) { var im = e.target.closest && e.target.closest('.shot img'); if (im) zoom(im); });
  cmBody.addEventListener('click', function (e) { var im = e.target.closest && e.target.closest('.cm-img img'); if (im) zoom(im); });

  /* ------------------------------------------------------------ project modal */
  function renderProject(slug) {
    var P = window.PROJECTS && window.PROJECTS[slug]; if (!P) return;
    var c = P[lang] || P.ru, title = c.title || P.title;
    var h = '<div class="pm-band" style="--g:' + P.gradient + '"><span class="badge' + (P.done ? ' done' : '') + '">' + esc(t(P.done ? 'st_done' : 'st_wip')) + '</span></div>';
    h += '<header class="pm-head"><p class="pm-kicker">' + esc(c.kicker) + '</p><h2 id="pmTitle">' + esc(title) + '</h2><p class="pm-lead">' + esc(c.lead) + '</p></header>';
    h += '<div class="pm-meta">' + c.meta.map(function (x) { return '<div><small>' + esc(x[0]) + '</small><span>' + esc(x[1]) + '</span></div>'; }).join('') + '</div>';
    var sec = function (title, body) { return '<section class="pm-sec"><h3>' + esc(title) + '</h3>' + body + '</section>'; };
    var ov = sec(t('m_problem'), '<p>' + esc(c.problem) + '</p>') + sec(t('m_solution'), '<p>' + esc(c.solution) + '</p>') +
      sec(t('m_challenge'), '<p>' + esc(c.challenge) + '</p>') + sec(t('m_learned'), '<p>' + esc(c.learned) + '</p>');
    var ft = sec(t('m_features'), '<ul class="pm-feat">' + c.features.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>');
    var ar = sec(t('m_arch'), '<div class="pm-arch">' + c.arch.map(function (a) { return '<div><b>' + esc(a[0]) + '</b><p>' + esc(a[1]) + '</p></div>'; }).join('') + '</div>') +
      sec(t('m_stack'), '<div class="pm-stack">' + c.stack.map(function (g) { return '<div><h4>' + esc(g[0]) + '</h4><div class="chips">' + g[1].split(' / ').map(function (x) { return '<span class="chip">' + esc(x) + '</span>'; }).join('') + '</div></div>'; }).join('') + '</div>');
    var sh = sec(t('m_shots'), '<div class="pm-shots" id="pmShots"></div>');
    var tabs = [['ov', t('tab_overview')], ['ft', t('m_features')], ['ar', t('m_arch')], ['sh', t('m_shots')]];
    var active = curTab === 'sh' ? 'ov' : curTab;
    h += '<div class="pm-tabs" role="tablist">' + tabs.map(function (x) {
      return '<button type="button" class="pm-tab" role="tab" data-tab="' + x[0] + '" aria-selected="' + (x[0] === active) + '"' + (x[0] === 'sh' ? ' hidden id="pmShotsTab"' : '') + '>' + esc(x[1]) + '</button>';
    }).join('') + '</div>';
    [['ov', ov], ['ft', ft], ['ar', ar], ['sh', sh]].forEach(function (x) {
      h += '<div class="pm-pane" role="tabpanel" data-pane="' + x[0] + '"' + (x[0] === active ? '' : ' hidden') + '>' + x[1] + '</div>';
    });
    h += '<div class="pm-foot">' + (P.gh ? '<a class="btn pri" href="' + esc(P.gh) + '" target="_blank" rel="noopener">GitHub</a> ' : '') + '<button type="button" class="btn gh" data-close>' + esc(t('m_close')) + '</button></div>';
    pmBody.innerHTML = h;
    // screenshots: shown only for files that exist (no empty frames)
    projectImages(slug, P).then(function (urls) {
      if (curSlug !== slug || !urls.length) return;
      $('#pmShots').innerHTML = urls.map(function (u, i) {
        return '<figure class="shot"><div class="bar"><i></i><i></i><i></i></div><div class="frame"><img src="' + esc(u) + '" alt="' + esc(title + ' ' + (i + 1)) + '" loading="lazy"></div></figure>';
      }).join('');
      $('#pmShotsTab').hidden = false;
    });
  }
  function setTab(name) {
    curTab = name;
    $$('.pm-tab', pmBody).forEach(function (b) { b.setAttribute('aria-selected', b.getAttribute('data-tab') === name); });
    $$('.pm-pane', pmBody).forEach(function (p) { p.hidden = p.getAttribute('data-pane') !== name; });
  }
  pmBody.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('.pm-tab'); if (b) setTab(b.getAttribute('data-tab')); });
  function openProject(slug) {
    curSlug = slug; curTab = 'ov'; renderProject(slug); pmBody.scrollTop = 0; openDlg(pm);
  }
  $$('[data-open]').forEach(function (b) { b.addEventListener('click', function () { openProject(b.getAttribute('data-open')); }); });

  /* -------------------------------------------------------- certificates */
  var MONTHS = {
    ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    kk: ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };
  function fmtDate(iso) {
    var p = iso.split('-'), y = p[0], mo = +p[1] - 1, d = +p[2];
    if (lang === 'ru') return d + ' ' + MONTHS.ru[mo] + ' ' + y + ' г.';
    if (lang === 'kk') return y + ' ж. ' + d + ' ' + MONTHS.kk[mo];
    return MONTHS.en[mo] + ' ' + d + ', ' + y;
  }
  var certList = $('#certList'), showAll = $('#showall'), showAllTxt = $('#showallTxt'), VISIBLE = 4, certsOpen = false;
  function certRow(c, i) {
    var pf = c.platform + (c.distinction ? ', ' + t('c_dist_s') : '');
    return '<div class="crow"><span class="y">' + c.date.slice(0, 4) + '</span><span class="t">' + esc(ctext(c.title)) + '</span><span class="i">' + esc(c.issuer) +
      '</span><span class="pf' + (c.distinction ? ' d' : '') + '">' + esc(pf) + '</span><button type="button" class="o" data-cert="' + i + '">' + esc(t('ce_open')) + '</button></div>';
  }
  function renderCerts() {
    var C = window.CERTS || []; if (!certList) return;
    var head = C.slice(0, VISIBLE).map(function (c, i) { return certRow(c, i); }).join('');
    var rest = C.slice(VISIBLE).map(function (c, i) { return certRow(c, i + VISIBLE); }).join('');
    certList.innerHTML = head + (rest ? '<div class="fold' + (certsOpen ? ' open' : '') + '" id="fold"><div>' + rest + '</div></div>' : '');
    showAll.hidden = !rest;
    showAllTxt.textContent = certsOpen ? t('hide') : t('show_all').replace('{n}', C.length);
    showAll.setAttribute('aria-expanded', certsOpen);
  }
  showAll.addEventListener('click', function () {
    certsOpen = !certsOpen;
    var f = $('#fold'); if (f) f.classList.toggle('open', certsOpen);
    showAllTxt.textContent = certsOpen ? t('hide') : t('show_all').replace('{n}', (window.CERTS || []).length);
    showAll.setAttribute('aria-expanded', certsOpen);
  });
  function renderCert(i) {
    var c = (window.CERTS || [])[i]; if (!c) return;
    var title = ctext(c.title);
    var tags = '<span>' + esc(c.platform) + '</span>' + (c.specialization ? '<span>' + esc(t('c_spec')) + '</span>' : '') + (c.distinction ? '<span class="dist">' + esc(t('c_dist')) + '</span>' : '');
    cmBody.innerHTML = '<div class="cm-img"><img src="' + esc(c.img) + '" alt="' + esc(title + ' - ' + c.issuer) + '"></div><p class="cm-hint">' + esc(t('c_zoom')) + '</p>' +
      '<div class="cm-info"><div class="cm-tags">' + tags + '</div><h3 id="cmTitle">' + esc(title) + '</h3><p class="cm-issuer">' + esc(c.issuer) + '</p><p class="cm-date">' + esc(t('c_issued')) + ': ' + esc(fmtDate(c.date)) + '</p>' +
      '<div class="cm-actions"><a class="btn pri" href="' + esc(c.url) + '" target="_blank" rel="noopener">' + esc(t('c_verify')) + '</a><button type="button" class="btn gh" data-close>' + esc(t('m_close')) + '</button></div></div>';
  }
  function openCert(i) { curCert = i; renderCert(i); cmBody.scrollTop = 0; openDlg(cm); }
  certList.addEventListener('click', function (e) {
    var b = e.target.closest('[data-cert]');
    if (b) { openCert(+b.getAttribute('data-cert')); return; }
    var row = e.target.closest('.crow'); if (row) { var o = $('[data-cert]', row); if (o) openCert(+o.getAttribute('data-cert')); }
  });

  /* ------------------------------------------------- copy e-mail with feedback */
  var cp = $('#copy'), cpTxt = $('#copyTxt'), mailTxt = $('#mailtxt'), cpTimer;
  function copyLabel() { if (!cp.classList.contains('done')) cpTxt.textContent = t('copy'); }
  function copied() {
    cp.classList.add('done'); cpTxt.textContent = t('copied'); toast(t('t_copied'));
    clearTimeout(cpTimer); cpTimer = setTimeout(function () { cp.classList.remove('done'); cpTxt.textContent = t('copy'); }, 2200);
  }
  function selectMail() {
    var r = document.createRange(); r.selectNodeContents(mailTxt); var s = getSelection(); s.removeAllRanges(); s.addRange(r);
    try { document.execCommand('copy') ? copied() : toast(t('t_select')); } catch (e) { toast(t('t_select')); }
  }
  cp.addEventListener('click', function () {
    var txt = mailTxt.textContent.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(copied, selectMail); else selectMail();
  });

  /* ------------------------------------------- contact form -> Google Sheets */
  var form = $('#form'), fstatus = $('#fstatus'), sendBtn = $('#send');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var el = form.elements; fstatus.classList.remove('err');
    if (el['website'].value) return;                                   // honeypot: bots fill this hidden field
    var name = el['name'].value.trim(), email = el['email'].value.trim(), msg = el['message'].value.trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !msg) { fstatus.classList.add('err'); fstatus.textContent = t('f_err'); return; }

    if (!cfg.SHEETS_URL) {                                             // endpoint not configured: mailto fallback
      window.location.href = 'mailto:ermekov_erasil@icloud.com?subject=' + encodeURIComponent('Message from website') + '&body=' + encodeURIComponent(name + ' (' + email + ')\n\n' + msg);
      fstatus.textContent = t('f_mailto'); return;
    }
    var last = 0; try { last = +localStorage.getItem('lastSend') || 0; } catch (_) {}
    if (Date.now() - last < 30000) { fstatus.classList.add('err'); fstatus.textContent = t('f_wait'); return; }

    sendBtn.disabled = true; fstatus.textContent = t('f_sending');
    var data = new URLSearchParams({ name: name, email: email, subject: '', message: msg, lang: lang, page: location.href.slice(0, 300) });
    fetch(cfg.SHEETS_URL, { method: 'POST', body: data })              // urlencoded body = simple request (no CORS preflight)
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (!j.ok) throw new Error(j.error || 'fail');
        form.reset(); fstatus.textContent = t('f_sent');
        try { localStorage.setItem('lastSend', String(Date.now())); } catch (_) {}
      })
      .catch(function () { fstatus.classList.add('err'); fstatus.textContent = t('f_fail'); })
      .then(function () { sendBtn.disabled = false; });
  });

  /* ---------------------------------------------------------------- language */
  function pickLang() {
    var q = new URLSearchParams(location.search).get('lang'); if (LANGS.indexOf(q) > -1) return q;
    try { var s = localStorage.getItem('lang'); if (LANGS.indexOf(s) > -1) return s; } catch (e) {}
    var n = (navigator.language || '').toLowerCase();
    if (n.indexOf('kk') === 0) return 'kk';
    if (n.indexOf('en') === 0) return 'en';
    return 'ru';
  }
  function applyLang(l, persist) {
    lang = l; document.documentElement.lang = l;
    document.title = t('doc_title');
    var md = $('meta[name="description"]'); if (md) md.setAttribute('content', t('meta_desc'));
    $$('[data-i18n]').forEach(function (e) { e.textContent = t(e.getAttribute('data-i18n')); });
    $$('[data-i18n-aria]').forEach(function (e) { e.setAttribute('aria-label', t(e.getAttribute('data-i18n-aria'))); });
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-l') === l); });
    var cv = (cfg.CV && (cfg.CV[l] || cfg.CV.ru)) || '';
    $$('[data-cv]').forEach(function (a) { if (cv) a.setAttribute('href', cv); });
    renderCerts(); copyLabel(); vizSetup(false);
    if (curSlug && pm.open) { var y = pmBody.scrollTop; renderProject(curSlug); pmBody.scrollTop = y; }
    if (curCert !== null && cm.open) renderCert(curCert);
    var on = $('.nav a.on'); if (on) place(on);
    if (persist) { try { localStorage.setItem('lang', l); } catch (e) {} }
  }
  $$('.lang button').forEach(function (b) { b.addEventListener('click', function () { applyLang(b.getAttribute('data-l'), true); }); });

  applyLang(pickLang(), false);
  vizSetup(true);
  onScroll();
})();
