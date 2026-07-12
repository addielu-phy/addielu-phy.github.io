/* 共用腳本：主題切換、頻閃拋體 canvas、作品卡片渲染、篩選、進場動畫 */
(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 主題切換 ----------
     <head> 內的 inline script 已在載入前套用主題（避免閃爍），
     這裡負責按鈕行為與圖示同步。 */
  var root = document.documentElement;
  function systemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function currentTheme() {
    return root.getAttribute('data-theme') || systemTheme();
  }
  function applyTheme(t, persist) {
    root.setAttribute('data-theme', t);
    if (persist) { try { localStorage.setItem('theme', t); } catch (e) {} }
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.textContent = t === 'dark' ? '☀' : '☾';
      btn.setAttribute('aria-label', t === 'dark' ? '切換為亮色主題' : '切換為深色主題');
      btn.title = btn.getAttribute('aria-label');
    }
  }
  applyTheme(currentTheme(), false);
  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
    });
  }

  /* ---------- Hero canvas：頻閃拋體運動 ----------
     方格紙上每隔幾秒發射一顆質點，以固定時距的「頻閃照片」畫出拋物線軌跡。
     尊重 prefers-reduced-motion（改畫一條靜態完整軌跡）。 */
  (function heroCanvas() {
    var cv = document.getElementById('hero-canvas');
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext('2d');
    var hero = cv.parentElement;
    var W = 0, H = 0, colors = {};

    function readColors() {
      var cs = getComputedStyle(root);
      colors.dot = cs.getPropertyValue('--accent2').trim() || '#ffb454';
      colors.path = cs.getPropertyValue('--accent').trim() || '#4da3ff';
    }
    readColors();
    new MutationObserver(function () { readColors(); if (!running) drawStatic(); })
      .observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    function resize() {
      var r = hero.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!running) drawStatic();
    }

    /* 產生一條拋體軌跡的頻閃取樣點（等時距 dt） */
    function makeShot() {
      var g = 900;                                   // px/s^2
      var x0 = -20 + Math.random() * W * 0.25;
      var y0 = H + 10;
      var v = 620 + Math.random() * 260;
      var ang = (52 + Math.random() * 20) * Math.PI / 180;
      var vx = v * Math.cos(ang), vy = v * Math.sin(ang);
      var pts = [];
      for (var t = 0; t < 6; t += 0.115) {
        var x = x0 + vx * t, y = y0 - vy * t + 0.5 * g * t * t;
        if (t > 0.2 && (y > H + 30 || x > W + 30)) break;
        pts.push([x, y]);
      }
      return { pts: pts, born: performance.now(), reveal: 95, hold: 2600, fade: 1600 };
    }

    function drawShot(s, now) {
      var age = now - s.born;
      var n = Math.min(s.pts.length, Math.floor(age / s.reveal) + 1);
      var total = s.pts.length * s.reveal + s.hold;
      var alpha = 1;
      if (age > total) alpha = Math.max(0, 1 - (age - total) / s.fade);
      if (alpha <= 0) return false;
      ctx.globalAlpha = alpha * 0.5;
      ctx.strokeStyle = colors.path;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 7]);
      ctx.beginPath();
      for (var i = 0; i < n; i++) {
        var p = s.pts[i];
        if (i === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      for (var j = 0; j < n; j++) {
        var q = s.pts[j];
        var last = (j === n - 1 && n < s.pts.length);
        ctx.globalAlpha = alpha * (last ? 1 : 0.8);
        ctx.fillStyle = colors.dot;
        ctx.beginPath();
        ctx.arc(q[0], q[1], last ? 4.4 : 3.1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      return true;
    }

    /* 靜態底圖：一張完整的頻閃軌跡照片。
       動畫未啟動（減少動態、背景分頁、rAF 被暫停）時就顯示這張。 */
    function drawStatic() {
      ctx.clearRect(0, 0, W, H);
      var s = makeShot();
      s.born = -1e9; s.hold = 1e12;
      drawShot(s, 0);
    }

    var shots = [], lastSpawn = 0, running = false, visible = true;

    function frame(now) {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      if (!shots.length || now - lastSpawn > 4200) {
        if (shots.length < 3) { shots.push(makeShot()); lastSpawn = now; }
      }
      shots = shots.filter(function (s) { return drawShot(s, now); });
      requestAnimationFrame(frame);
    }
    function start() {
      if (running || REDUCED || !visible || document.hidden) return;
      running = true; requestAnimationFrame(frame);
    }
    function stop() {
      if (!running) return;
      running = false; shots = [];
      drawStatic();
    }

    window.addEventListener('resize', resize);
    resize();
    if (REDUCED) return;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        if (visible) start(); else stop();
      }, { threshold: 0.02 }).observe(hero);
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });
    start();
  })();

  /* ---------- 作品卡片 ---------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function cardOf(w) {
    var card = el('article', 'card reveal' + (w.lead ? ' lead' : ''));
    var meta = el('div', 'meta');
    var ci = (typeof CATS !== 'undefined') ? CATS.indexOf(w.cat) : -1;
    meta.appendChild(el('span', 'cat c' + (ci >= 0 ? ci : 0), w.cat));
    meta.appendChild(el('span', 'date', w.date));
    card.appendChild(meta);

    var h3 = el('h3');
    var a = el('a', null, w.title);
    a.href = w.url; a.target = '_blank'; a.rel = 'noopener';
    h3.appendChild(a);
    card.appendChild(h3);

    card.appendChild(el('p', 'desc', w.desc));

    var tags = el('div', 'tags');
    (w.tags || []).forEach(function (t) { tags.appendChild(el('span', 'tag', t)); });
    card.appendChild(tags);

    var links = el('div', 'links');
    var open = el('a', null, '開啟網站 →');
    open.href = w.url; open.target = '_blank'; open.rel = 'noopener';
    links.appendChild(open);
    if (w.repo) {
      var gh = el('a', null, 'GitHub');
      gh.href = w.repo; gh.target = '_blank'; gh.rel = 'noopener';
      links.appendChild(gh);
    }
    card.appendChild(links);
    return card;
  }
  function renderInto(id, list) {
    var box = document.getElementById(id);
    if (!box) return;
    box.textContent = '';
    list.forEach(function (w) { box.appendChild(cardOf(w)); });
    observeReveals(box);
  }

  /* 首頁：精選（主打卡排最前）＋ 數字 */
  if (typeof WORKS !== 'undefined') {
    var featured = WORKS.filter(function (w) { return w.featured; })
      .sort(function (a, b) { return (b.lead ? 1 : 0) - (a.lead ? 1 : 0); });
    renderInto('featured-grid', featured);
    var nWorks = document.getElementById('stat-works');
    if (nWorks) nWorks.textContent = WORKS.length;
    var nCats = document.getElementById('stat-cats');
    if (nCats) nCats.textContent = CATS.length;
  }

  /* 作品頁：全部 + 分類篩選 */
  var filterBox = document.getElementById('filters');
  if (filterBox && typeof WORKS !== 'undefined') {
    var countLine = document.getElementById('count-line');
    function show(cat) {
      var list = cat === '全部' ? WORKS : WORKS.filter(function (w) { return w.cat === cat; });
      renderInto('works-grid', list);
      if (countLine) countLine.textContent = 'N = ' + list.length;
      Array.prototype.forEach.call(filterBox.children, function (b) {
        b.classList.toggle('active', b.dataset.cat === cat);
      });
      var u = new URL(location.href);
      if (cat === '全部') u.searchParams.delete('cat'); else u.searchParams.set('cat', cat);
      history.replaceState(null, '', u);
    }
    ['全部'].concat(CATS).forEach(function (cat) {
      var n = cat === '全部' ? WORKS.length
            : WORKS.filter(function (w) { return w.cat === cat; }).length;
      var b = el('button', 'filter', cat);
      b.dataset.cat = cat;
      b.appendChild(el('span', 'n', String(n)));
      b.addEventListener('click', function () { show(cat); });
      filterBox.appendChild(b);
    });
    var initCat = new URL(location.href).searchParams.get('cat');
    show(initCat && CATS.indexOf(initCat) >= 0 ? initCat : '全部');
  }

  /* ---------- 進場動畫 ---------- */
  var io = null;
  if ('IntersectionObserver' in window && !REDUCED) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
  }
  function observeReveals(scope) {
    var nodes = (scope || document).querySelectorAll('.reveal:not(.in)');
    Array.prototype.forEach.call(nodes, function (n) {
      if (io) io.observe(n); else n.classList.add('in');
    });
  }
  observeReveals(document);
})();
