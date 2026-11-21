/* AI 展示頁。資料來自 ../assets/works.js 的 WORKS / CATS，不另建清單。 */
(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');
  if (typeof WORKS === 'undefined' || typeof CATS === 'undefined') return;

  var root = document.documentElement;
  var mobileQuery = window.matchMedia('(max-width: 760px)');
  var dialog = document.getElementById('preview');
  var frame = document.getElementById('preview-iframe');
  var still = document.getElementById('preview-still');
  var noteEl = document.getElementById('preview-note');
  var io = null;

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
    }
  }
  applyTheme(currentTheme(), false);
  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
    });
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function catIndex(cat) {
    var i = CATS.indexOf(cat);
    return i >= 0 ? i : 0;
  }
  function canEmbed(w) {
    return w.embed !== false;
  }
  function thumbSrc(w) {
    return 'thumbs/' + encodeURIComponent(w.id) + '.jpg';
  }
  function hostPath(url) {
    try {
      var u = new URL(url);
      return u.host + u.pathname;
    } catch (e) {
      return url;
    }
  }

  function cardOf(w) {
    var card = el('article', 'scard c' + catIndex(w.cat) + (canEmbed(w) ? ' can-embed' : ' no-embed'));
    card.appendChild(el('div', 'stripe'));

    var stage = el('button', 'stage');
    stage.type = 'button';
    stage.setAttribute('aria-label', (canEmbed(w) ? '放大預覽：' : '查看說明：') + w.title);

    var chrome = el('span', 'chrome');
    var dots = el('span', 'dots');
    dots.setAttribute('aria-hidden', 'true');
    dots.appendChild(el('i')); dots.appendChild(el('i')); dots.appendChild(el('i'));
    chrome.appendChild(dots);
    chrome.appendChild(el('span', 'url', hostPath(w.url)));
    if (w.note) chrome.appendChild(el('span', 'badge', w.note));
    else if (w.spotlight) chrome.appendChild(el('span', 'badge', '精選'));
    stage.appendChild(chrome);

    var view = el('span', 'viewport');
    var img = el('img', 'thumb');
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.src = thumbSrc(w);
    img.addEventListener('error', function () {
      stage.classList.add('no-thumb');
      img.removeAttribute('src');
    });
    view.appendChild(img);
    var poster = el('span', 'poster');
    poster.appendChild(el('strong', null, w.title));
    view.appendChild(poster);

    if (canEmbed(w) && !mobileQuery.matches) {
      var clip = el('span', 'frame-clip');
      var iframe = document.createElement('iframe');
      iframe.title = '預覽：' + w.title;
      iframe.dataset.src = w.url;
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-modals');
      iframe.addEventListener('load', function () {
        if (iframe.getAttribute('src')) card.classList.add('live');
      });
      clip.appendChild(iframe);
      view.appendChild(clip);
    }
    view.appendChild(el('span', 'stage-cap', canEmbed(w) ? '放大預覽' : '查看說明'));
    stage.appendChild(view);
    stage.addEventListener('click', function () { openPreview(w); });
    card.appendChild(stage);

    var body = el('div', 'sbody');
    var meta = el('div', 'meta');
    meta.appendChild(el('span', null, w.cat));
    meta.appendChild(el('span', null, w.date || ''));
    body.appendChild(meta);
    body.appendChild(el('h3', null, w.title));
    body.appendChild(el('p', 'desc', w.desc));
    var tags = el('div', 'tags');
    (w.tags || []).forEach(function (t) { tags.appendChild(el('span', 'tag', t)); });
    body.appendChild(tags);
    var actions = el('div', 'actions');
    var open = el('a', 'btn primary', '立即體驗');
    open.href = w.url;
    open.target = '_blank';
    open.rel = 'noopener';
    var arrow = el('span', 'arr', '→');
    open.appendChild(arrow);
    actions.appendChild(open);
    if (w.repo) {
      var repo = el('a', 'btn', '原始碼');
      repo.href = w.repo;
      repo.target = '_blank';
      repo.rel = 'noopener';
      actions.appendChild(repo);
    }
    body.appendChild(actions);
    card.appendChild(body);
    return card;
  }

  function fillGrid(grid, list) {
    list.forEach(function (w) { grid.appendChild(cardOf(w)); });
  }

  function grouped(list) {
    var frag = document.createDocumentFragment();
    var plain = [];
    var seen = Object.create(null);
    function flush() {
      if (!plain.length) return;
      var grid = el('div', 'show-grid');
      fillGrid(grid, plain);
      frag.appendChild(grid);
      plain = [];
    }
    list.forEach(function (w) {
      if (!w.series) { plain.push(w); return; }
      flush();
      if (seen[w.series]) return;
      seen[w.series] = true;
      var members = list.filter(function (x) { return x.series === w.series; });
      var block = el('section', 'series');
      var h = el('h3');
      h.appendChild(document.createTextNode(w.series));
      h.appendChild(el('span', null, String(members.length)));
      block.appendChild(h);
      var grid = el('div', 'show-grid');
      fillGrid(grid, members);
      block.appendChild(grid);
      frag.appendChild(block);
    });
    flush();
    return frag;
  }

  function watchFrames(scope) {
    if (io) io.disconnect();
    if (mobileQuery.matches || !('IntersectionObserver' in window)) return;
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var iframe = entry.target.querySelector('iframe');
        if (!iframe) return;
        if (entry.isIntersecting) {
          if (!iframe.getAttribute('src')) iframe.src = iframe.dataset.src;
        } else if (iframe.getAttribute('src')) {
          iframe.removeAttribute('src');
          var card = entry.target.closest('.scard');
          if (card) card.classList.remove('live');
        }
      });
    }, { rootMargin: '160px 0px' });
    scope.querySelectorAll('.scard.can-embed .viewport').forEach(function (view) { io.observe(view); });
  }

  var qInput = document.getElementById('q');
  var filterBox = document.getElementById('filters');
  var countLine = document.getElementById('count-line');
  var spotSection = document.getElementById('spotlight');
  var spotGrid = document.getElementById('spot-grid');
  var catalog = document.getElementById('catalog');
  var state = { q: '', cat: '全部' };

  function matches(w) {
    if (state.cat !== '全部' && w.cat !== state.cat) return false;
    var q = state.q.trim().toLowerCase();
    if (!q) return true;
    var hay = [w.title, w.desc, w.cat, w.series || '', (w.tags || []).join(' '), w.note || ''].join(' ').toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function render() {
    var list = WORKS.filter(matches);
    var browsing = !state.q.trim() && state.cat === '全部';
    spotSection.hidden = !browsing;
    spotGrid.textContent = '';
    catalog.textContent = '';
    if (browsing) {
      fillGrid(spotGrid, WORKS.filter(function (w) { return w.spotlight; }));
      CATS.forEach(function (cat) {
        var items = WORKS.filter(function (w) { return w.cat === cat; });
        if (!items.length) return;
        var section = el('section', 'block cat-block');
        section.id = 'cat-' + catIndex(cat);
        var wrap = el('div', 'wrap');
        var head = el('div', 'sec-head');
        head.appendChild(el('p', 'eyebrow', 'Category'));
        head.appendChild(el('h2', null, cat));
        wrap.appendChild(head);
        wrap.appendChild(grouped(items));
        section.appendChild(wrap);
        catalog.appendChild(section);
      });
    } else if (!list.length) {
      var emptyWrap = el('div', 'wrap');
      emptyWrap.appendChild(el('p', 'empty', '沒有符合的作品。換個關鍵字，或改選其他分類。'));
      catalog.appendChild(emptyWrap);
    } else if (state.cat !== '全部') {
      var section = el('section', 'block cat-block');
      var wrap = el('div', 'wrap');
      var head = el('div', 'sec-head');
      head.appendChild(el('p', 'eyebrow', 'Category'));
      head.appendChild(el('h2', null, state.cat));
      wrap.appendChild(head);
      wrap.appendChild(grouped(list));
      section.appendChild(wrap);
      catalog.appendChild(section);
    } else {
      var wrapAll = el('div', 'wrap');
      var grid = el('div', 'show-grid');
      fillGrid(grid, list);
      wrapAll.appendChild(grid);
      catalog.appendChild(wrapAll);
    }
    countLine.textContent = '顯示 ' + list.length + ' / ' + WORKS.length;
    Array.prototype.forEach.call(filterBox.children, function (b) {
      b.classList.toggle('active', b.dataset.cat === state.cat);
      b.setAttribute('aria-pressed', b.dataset.cat === state.cat ? 'true' : 'false');
    });
    watchFrames(document);
    var u = new URL(location.href);
    if (state.q) u.searchParams.set('q', state.q); else u.searchParams.delete('q');
    if (state.cat !== '全部') u.searchParams.set('cat', state.cat); else u.searchParams.delete('cat');
    history.replaceState(null, '', u);
  }

  function buttonFor(cat, n) {
    var b = el('button', 'filter', cat);
    b.type = 'button';
    b.dataset.cat = cat;
    b.appendChild(el('span', 'n', String(n)));
    b.addEventListener('click', function () { state.cat = cat; render(); });
    return b;
  }
  filterBox.appendChild(buttonFor('全部', WORKS.length));
  CATS.forEach(function (cat) {
    var n = WORKS.filter(function (w) { return w.cat === cat; }).length;
    if (n) filterBox.appendChild(buttonFor(cat, n));
  });

  document.getElementById('stat-works').textContent = String(WORKS.length);
  document.getElementById('stat-cats').textContent = String(CATS.length);
  document.getElementById('stat-spot').textContent = String(WORKS.filter(function (w) { return w.spotlight; }).length);

  var params = new URL(location.href).searchParams;
  state.q = params.get('q') || '';
  state.cat = params.get('cat') || '全部';
  if (state.cat !== '全部' && CATS.indexOf(state.cat) < 0) state.cat = '全部';
  qInput.value = state.q;
  qInput.addEventListener('input', function () {
    state.q = qInput.value;
    render();
  });
  document.getElementById('search-form').addEventListener('submit', function (e) { e.preventDefault(); });

  function openPreview(w) {
    document.getElementById('preview-kicker').textContent = w.cat + (w.note ? ' · ' + w.note : '');
    document.getElementById('preview-title').textContent = w.title;
    var open = document.getElementById('preview-open');
    open.href = w.url;
    if (w.note) {
      noteEl.hidden = false;
      noteEl.textContent = w.note === '需密碼'
        ? '這個網站需要密碼。預覽視窗不嵌入頁面，請向盧政良索取密碼後，用「立即體驗」開啟。'
        : '這個網站需要教材共用碼。預覽視窗不嵌入頁面，請用「立即體驗」開啟後輸入老師提供的共用碼。';
    } else {
      noteEl.hidden = true;
      noteEl.textContent = '';
    }
    if (canEmbed(w)) {
      still.hidden = true;
      still.removeAttribute('src');
      frame.hidden = false;
      frame.title = '預覽：' + w.title;
      frame.src = w.url;
    } else {
      frame.hidden = true;
      frame.removeAttribute('src');
      still.hidden = false;
      still.alt = w.title + ' 的縮圖';
      still.src = thumbSrc(w);
    }
    if (!dialog.open) dialog.showModal();
    document.getElementById('preview-close').focus();
  }
  function closePreview() {
    if (dialog.open) dialog.close();
    frame.removeAttribute('src');
    still.removeAttribute('src');
  }
  document.getElementById('preview-close').addEventListener('click', closePreview);
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) closePreview();
  });
  dialog.addEventListener('close', function () {
    frame.removeAttribute('src');
    still.removeAttribute('src');
  });

  mobileQuery.addEventListener('change', render);
  render();
})();
