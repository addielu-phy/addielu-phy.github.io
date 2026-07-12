/* 共用腳本：主題切換、作品卡片渲染、篩選、進場動畫 */
(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');

  /* ---------- 主題切換 ----------
     頁面 <head> 內的小段 inline script 已在載入前套用主題（避免閃爍），
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

  /* ---------- 作品卡片 ---------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function cardOf(w) {
    var card = el('article', 'card reveal');
    var meta = el('div', 'meta');
    meta.appendChild(el('span', 'cat', w.cat));
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

  /* 首頁：精選 + 數字 */
  if (typeof WORKS !== 'undefined') {
    renderInto('featured-grid', WORKS.filter(function (w) { return w.featured; }));
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
      if (countLine) countLine.textContent = '共 ' + list.length + ' 個作品';
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
      var badge = el('span', 'n', String(n));
      b.appendChild(badge);
      b.addEventListener('click', function () { show(cat); });
      filterBox.appendChild(b);
    });
    var initCat = new URL(location.href).searchParams.get('cat');
    show(initCat && CATS.indexOf(initCat) >= 0 ? initCat : '全部');
  }

  /* ---------- 進場動畫 ---------- */
  var io = null;
  if ('IntersectionObserver' in window &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
