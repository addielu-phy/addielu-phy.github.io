/* ==========================================================================
   §4-2 牛頓第二運動定律｜10 道例題物理計算與互動式 Canvas 模擬引擎（Gemini版）
   ========================================================================== */
'use strict';

function computePhysics(id, s) {
  if (id === '4-2-1') {
    const M = Number(s.M ?? 10);
    const m = Number(s.m ?? 5);
    const g = 10;
    const F = m * g;
    const a1 = (m / M) * g;
    const T1 = F;
    const a2 = (m / (M + m)) * g;
    const T2 = M * a2;
    const ratio = a1 / a2;
    const tAnim = Number(s.tAnim ?? 0);
    return {
      M, m, g, F, a1, T1, a2, T2, ratio, tAnim,
      x1: 0.5 * a1 * tAnim * tAnim,
      x2: 0.5 * a2 * tAnim * tAnim
    };
  }

  if (id === '4-2-2') {
    const agRatio = Number(s.agRatio ?? 0.25);
    const dropRatio = Number(s.dropRatio ?? 0.40);
    const bOverMg = 1 - agRatio;
    const remMass = Math.max(0.05, 1 - dropRatio);
    const aPrimeOverG = (bOverMg - remMass) / remMass;
    const dropHover = agRatio;
    const dropTarget = (2 * agRatio) / (1 + agRatio);
    return {
      agRatio, dropRatio, bOverMg, remMass, aPrimeOverG,
      dropHover, dropTarget,
      tAnim: Number(s.tAnim ?? 0)
    };
  }

  if (id === '4-2-3') {
    const mode = s.mode || 'monkey_down';
    const a = Number(s.a ?? 4.0);
    const g = 10;
    const m = mode === 'monkey_down' ? 20 : 45;
    const Tmax = mode === 'monkey_down' ? 120 : 630;
    const W = m * g;
    const T = mode === 'monkey_down' ? Math.max(0, m * (g - a)) : m * (g + a);
    const aLimit = mode === 'monkey_down' ? (g - Tmax / m) : (Tmax / m - g);
    const safe = T <= Tmax + 1e-6;
    return {
      mode, a, g, m, Tmax, W, T, aLimit, safe,
      tAnim: Number(s.tAnim ?? 0)
    };
  }

  if (id === '4-2-4') {
    const thetaDeg = Number(s.theta ?? 53);
    const theta = (thetaDeg * Math.PI) / 180;
    const F = Number(s.F ?? 100);
    const beta = Number(s.massRatioB ?? 0.5);
    const FxB = beta * F;
    const sinT = Math.sin(theta);
    const cosT = Math.cos(theta);
    const N = FxB / sinT;
    const Nx = FxB;
    const Ny = N * cosT;
    const nOverF = beta / sinT;
    return {
      thetaDeg, theta, F, beta, FxB, sinT, cosT, N, Nx, Ny, nOverF,
      tAnim: Number(s.tAnim ?? 0)
    };
  }

  if (id === '4-2-5') {
    const mode = s.mode || 'two_blocks';
    const F = Number(s.F ?? 100);
    const mu = Number(s.mu ?? 0.5);
    const g = 10;
    if (mode === 'two_blocks') {
      const m1 = 3, m2 = 2, mTotal = 5;
      const a = F / mTotal;
      const N = m2 * a;
      const fsMax = mu * N;
      const W = m2 * g;
      const Fmin = (mTotal * g) / mu;
      const holds = fsMax + 1e-6 >= W;
      const ayDown = holds ? 0 : g - fsMax / m2;
      return {
        mode, F, mu, g, m1, m2, mTotal, a, N, N1: N, N2: 0,
        fsMax, W, Fmin, holds, ayDown, tAnim: Number(s.tAnim ?? 0)
      };
    } else {
      const m = 2, mTotal = 5 * m; // 2m, m, 2m => 4, 2, 4 kg
      const a = F / mTotal;
      const N2 = 3 * m * a;
      const N1 = 2 * m * a;
      const N = N1 + N2;
      const fsMax = mu * (N1 + N2);
      const W = m * g;
      const Fmin = (m * g) / mu;
      const holds = fsMax + 1e-6 >= W;
      const ayDown = holds ? 0 : g - fsMax / m;
      return {
        mode, F, mu, g, m, mTotal, a, N, N1, N2,
        fsMax, W, Fmin, holds, ayDown, tAnim: Number(s.tAnim ?? 0)
      };
    }
  }

  if (id === '4-2-6') {
    const pullTarget = s.pullTarget || 'B';
    const F = Number(s.F ?? 32);
    const mu = Number(s.mu ?? 0.4);
    const m = Number(s.mTop ?? 2);
    const M = Number(s.MBot ?? 6);
    const g = 10;
    const fsMax = mu * m * g;
    const aMaxB = mu * g;
    const FmaxB = (M + m) * mu * g;
    const aMaxA = (mu * m * g) / M;
    const FmaxA = ((M * m + m * m) / M) * mu * g;
    const Fmax = pullTarget === 'B' ? FmaxB : FmaxA;
    const aMax = pullTarget === 'B' ? aMaxB : aMaxA;
    const slips = F > Fmax + 1e-6;
    let aA, aB, f;
    if (!slips) {
      aA = F / (M + m);
      aB = aA;
      f = pullTarget === 'B' ? m * aA : M * aB;
    } else {
      f = fsMax;
      if (pullTarget === 'B') {
        aA = fsMax / m;
        aB = (F - fsMax) / M;
      } else {
        aB = fsMax / M;
        aA = (F - fsMax) / m;
      }
    }
    return {
      pullTarget, F, mu, m, M, g, fsMax,
      aMaxB, FmaxB, aMaxA, FmaxA, Fmax, aMax, slips,
      aA, aB, f, tAnim: Number(s.tAnim ?? 0)
    };
  }

  if (id === '4-2-7') {
    const nL = Number(s.nLeft ?? 4);
    const nR = 6 - nL;
    const g = 10;
    const mUnit = 1;
    const T1 = 3 * mUnit * g; // 30 N
    const a2 = ((nL - nR) / (nL + nR)) * g; // positive => left moves down
    const T2 = ((2 * nL * nR) / (nL + nR)) * mUnit * g;
    const ratio = T2 / T1;
    return {
      nL, nR, g, mUnit, T1, a2, T2, ratio,
      tAnim: Number(s.tAnim ?? 0)
    };
  }

  if (id === '4-2-8') {
    const m1 = Number(s.m1 ?? 1.0);
    const m2 = Number(s.m2 ?? 1.0);
    const g = 10;
    const den = m1 + 4 * m2;
    const a1 = ((2 * m2 - m1) / den) * g; // m1 upward positive
    const a2 = 2 * a1; // m2 downward positive
    const TB = ((3 * m1 * m2) / den) * g;
    const TA = 2 * TB;
    return {
      m1, m2, g, a1, a2, TA, TB,
      tAnim: Number(s.tAnim ?? 0)
    };
  }

  if (id === '4-2-9') {
    const m = Number(s.m ?? 60);
    const M = Number(s.M ?? 60);
    const a = Number(s.a ?? 2.0);
    const g = 10;
    const T = ((M + m) * (g + a)) / 3;
    const Nraw = ((2 * m - M) * (g + a)) / 3;
    const detaches = Nraw < -1e-6;
    const N = Math.max(0, Nraw);
    return {
      m, M, a, g, T, Nraw, N, detaches,
      tAnim: Number(s.tAnim ?? 0)
    };
  }

  if (id === '4-2-10') {
    const t = Math.max(0, Math.min(15, Number(s.t ?? 7.5)));
    const N1kg = Number(s.N1kg ?? 72);
    const m = 60;
    const g = 9.8;
    const N2kg = m;
    const N3kg = 2 * m - N1kg;
    const a1 = ((N1kg - m) / m) * g;
    const a3 = -a1;
    const vmax = a1 * 5;
    const yTotal = 0.5 * a1 * 25 + vmax * 5 + 0.5 * a1 * 25;
    let aCur, NcurKg, v, y, phaseName;
    if (t <= 5) {
      aCur = a1;
      NcurKg = N1kg;
      v = a1 * t;
      y = 0.5 * a1 * t * t;
      phaseName = '第一階段 (0~5s)：視重 > 實重 → 向上等加速';
    } else if (t <= 10) {
      aCur = 0;
      NcurKg = m;
      v = vmax;
      y = 0.5 * a1 * 25 + vmax * (t - 5);
      phaseName = '第二階段 (5~10s)：視重 = 實重 → 等速上升';
    } else {
      const dt = t - 10;
      aCur = a3;
      NcurKg = N3kg;
      v = vmax - a1 * dt;
      y = 0.5 * a1 * 25 + vmax * 5 + vmax * dt - 0.5 * a1 * dt * dt;
      phaseName = '第三階段 (10~15s)：視重 < 實重 → 向上減速';
    }
    return {
      t, N1kg, N2kg, N3kg, m, g, a1, a3, vmax, yTotal,
      aCur, NcurKg, v, y, phaseName
    };
  }

  return {};
}

if (typeof module !== 'undefined') {
  module.exports = { computePhysics };
}

if (typeof document !== 'undefined') {
  (function initApp() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      const updateThemeLabel = () => {
        const cur = document.documentElement.getAttribute('data-theme') || 'light';
        themeToggle.textContent = cur === 'dark' ? '☀ 淺色' : '☾ 深色';
      };
      updateThemeLabel();
      themeToggle.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme') || 'light';
        const next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) {}
        updateThemeLabel();
        if (typeof window.__redrawSim === 'function') window.__redrawSim();
      });
    }

    const lessonId = document.body.dataset.lesson;
    if (!lessonId || lessonId === 'index') {
      renderCatalogPage();
    } else {
      const lesson = LESSONS_4_2.find(l => l.id === lessonId);
      if (lesson) renderLessonPage(lesson);
    }
  })();
}

function typesetMath(rootEl) {
  if (typeof window !== 'undefined' && typeof window.renderMathInElement === 'function') {
    try {
      window.renderMathInElement(rootEl || document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    } catch (e) {}
  }
}

function fmt(n, digits = 2) {
  if (!Number.isFinite(n)) return '0';
  if (Math.abs(n) < 1e-7) return (0).toFixed(digits);
  return Number(n).toFixed(digits);
}

function renderCatalogPage() {
  const container = document.getElementById('catalog-cards');
  if (!container) return;

  container.innerHTML = TOPIC_GROUPS_4_2.map(grp => {
    const items = LESSONS_4_2.filter(l => l.topicGroup === grp.key);
    return `
      <div class="topic-group-block">
        <div class="topic-group-header">
          <h2>${grp.key}</h2>
          <span class="topic-group-count">${items.length} 道例題</span>
          <span style="font-size:0.88rem;color:var(--text-muted);">${grp.desc}</span>
        </div>
        <div class="catalog-grid">
          ${items.map(l => `
            <a class="lesson-card" href="${l.id}.html">
              <div class="lesson-card-top">
                <div class="lesson-card-meta">
                  <span class="ex-num-pill">4-2 例題 ${l.n}</span>
                  <span class="page-ref-tag">講義 p.${l.page} · Gemini版</span>
                </div>
                <h3>${l.title}</h3>
                <p>${l.subtitle}</p>
                <div class="lesson-card-tags">
                  ${l.tags.map(t => `<span class="tag-chip">${t}</span>`).join('')}
                </div>
              </div>
              <div class="lesson-card-cta">
                <span>進入獨立互動網頁（題目直顯＋隱藏式引導詳解）</span>
                <span aria-hidden="true">→</span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
  typesetMath(container);
}

function renderLessonPage(lesson) {
  const idx = LESSONS_4_2.indexOf(lesson);
  const prevLesson = idx > 0 ? LESSONS_4_2[idx - 1] : null;
  const nextLesson = idx < LESSONS_4_2.length - 1 ? LESSONS_4_2[idx + 1] : null;

  const root = document.getElementById('lesson-app');
  if (!root) return;

  root.innerHTML = `
    <div class="page-header">
      <div class="eyebrow-row">
        <span class="chapter-tag">${lesson.section} · 例題 ${lesson.n} / 10</span>
        <span class="topic-tag-badge">${lesson.topicTag}</span>
        <span class="gemini-badge">✨ Gemini版 互動物理實驗室</span>
        <span class="page-ref-tag">講義頁碼 p.${lesson.page}</span>
      </div>
      <h1>例題 ${lesson.n}：${lesson.title}</h1>
      <p class="page-subtitle">${lesson.subtitle}</p>
    </div>

    <!-- 1. 題目直接顯示區 (Always Visible) -->
    <section class="problem-card" id="problem-section" aria-label="原題目敘述">
      <div class="problem-card-head">
        <div class="problem-badge-title">
          <span class="ex-num-pill">例題 ${lesson.n} 原題目</span>
          <span>題目直接顯示（請先閱讀題意並操作下方模擬器探索，再點選按鈕開啟引導或詳解）</span>
        </div>
        <span class="problem-status-note">📌 題目直接顯示</span>
      </div>
      <p class="problem-statement">${lesson.problem}</p>
      ${lesson.subquestions && lesson.subquestions.length ? `
        <ul class="subquestions-list">
          ${lesson.subquestions.map(sq => `<li>${sq}</li>`).join('')}
        </ul>
      ` : ''}
      ${lesson.choices && lesson.choices.length ? `
        <div class="choices-grid" aria-label="題目選項">
          ${lesson.choices.map(c => `
            <div class="choice-item">
              <span class="choice-key">${c[0]}</span>
              <span>${c[1]}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}
      <div class="given-pills">
        ${lesson.givens.map(g => `<span class="given-pill">🔹 ${g}</span>`).join('')}
      </div>
    </section>

    <!-- 2. 互動式模擬動畫實驗室 -->
    <section class="sim-workspace" id="simulation-section" aria-label="互動式物理模擬動畫">
      <div class="card-panel">
        <div class="panel-header">
          <h2>🔬 互動式物理模擬與即時受力／函數圖</h2>
          <span class="canvas-hint">${lesson.canvasHint}</span>
        </div>
        <div class="canvas-stage">
          <canvas id="sim-canvas" class="sim-canvas" width="820" height="520" aria-label="${lesson.title}互動模擬畫布"></canvas>
        </div>
        <div class="legend-bar">
          ${lesson.legend.map(item => `
            <span class="legend-item">
              <i class="legend-dot" style="background:${item.color}"></i>
              <span>${item.text}</span>
            </span>
          `).join('')}
        </div>
      </div>

      <aside class="card-panel control-body" aria-label="實驗參數控制與即時數值">
        <h2 style="margin:0 0 14px;font-size:1.08rem;">🎛️ 參數調控與預設情境</h2>
        <div class="control-group">
          ${(lesson.selects || []).map(sel => `
            <div class="control-row">
              <label class="control-label" for="ctrl-${sel.id}">${sel.label}</label>
              <select class="sim-select" id="ctrl-${sel.id}">
                ${sel.options.map(o => `<option value="${o[0]}">${o[1]}</option>`).join('')}
              </select>
            </div>
          `).join('')}

          ${(lesson.controls || []).map(c => `
            <div class="control-row">
              <label class="control-label" for="ctrl-${c.id}">
                <span>${c.label}</span>
                <output class="control-output" id="out-${c.id}">${c.defaultVal} ${c.unit}</output>
              </label>
              <input type="range" id="ctrl-${c.id}" min="${c.min}" max="${c.max}" step="${c.step}" value="${c.defaultVal}">
            </div>
          `).join('')}

          ${(lesson.toggles && lesson.toggles.length) ? `
            <div class="check-row">
              ${lesson.toggles.map(t => `
                <label class="check-label">
                  <input type="checkbox" id="toggle-${t.id}" ${t.defaultVal ? 'checked' : ''}>
                  <span>${t.label}</span>
                </label>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <div class="btn-row">
          <button type="button" class="btn primary" id="btn-play">▶ 播放動態模擬</button>
          <button type="button" class="btn" id="btn-reset">↺ 重設原題條件</button>
        </div>

        ${(lesson.presets && lesson.presets.length) ? `
          <div class="btn-row" style="margin-top:10px;">
            ${lesson.presets.map((p, i) => `
              <button type="button" class="btn preset-btn" data-preset-idx="${i}">${p.label}</button>
            `).join('')}
          </div>
        ` : ''}

        <div class="metrics-grid" id="live-metrics" aria-live="polite"></div>
        <p class="sim-note">${lesson.simNote}</p>
      </aside>
    </section>

    <!-- 3. 解題引導與詳細解說控制中心 (Initially Hidden, Click Buttons to Reveal) -->
    <section class="disclosure-hub" id="disclosure-controls" aria-label="解題引導與詳細解說開關">
      <div class="hub-header">
        <div class="hub-title-group">
          <h2>🔐 漸進式解題引導與詳細解說（預設隱藏，點選按鈕開啟）</h2>
          <p>先在上方模擬器觀察運動與受力變化，再依學習需求點選下方按鈕開啟「解題引導」、「詳細推導」或「最終答案」。</p>
        </div>
        <button type="button" class="btn" id="btn-toggle-all" aria-expanded="false">🔓 一鍵展開全部解析</button>
      </div>

      <div class="toggle-buttons-bar">
        <button type="button" class="reveal-toggle-btn" id="btn-toggle-guide" data-target="guide-section" aria-expanded="false">
          <div class="reveal-btn-top">
            <span>💡 解題引導與思考提示</span>
            <span class="reveal-status-pill" id="status-guide">點選開啟 ▼</span>
          </div>
          <span class="reveal-btn-desc">3 階漸進式問題引導，不直接破梗，帶你列出正確 F = ma</span>
        </button>

        <button type="button" class="reveal-toggle-btn" id="btn-toggle-solution" data-target="solution-section" aria-expanded="false">
          <div class="reveal-btn-top">
            <span>📖 詳細解說與完整推導</span>
            <span class="reveal-status-pill" id="status-solution">點選開啟 ▼</span>
          </div>
          <span class="reveal-btn-desc">完整數學步驟、受力方程式推導與模擬器連動按鈕</span>
        </button>

        <button type="button" class="reveal-toggle-btn" id="btn-toggle-answer" data-target="answer-section" aria-expanded="false">
          <div class="reveal-btn-top">
            <span>🎯 最終答案與選項核對</span>
            <span class="reveal-status-pill" id="status-answer">點選開啟 ▼</span>
          </div>
          <span class="reveal-btn-desc">原題標準答案與各選項正確／錯誤剖析</span>
        </button>

        <button type="button" class="reveal-toggle-btn" id="btn-toggle-quiz" data-target="quiz-section" aria-expanded="false">
          <div class="reveal-btn-top">
            <span>🧠 易錯陷阱與講義類題自測</span>
            <span class="reveal-status-pill" id="status-quiz">點選開啟 ▼</span>
          </div>
          <span class="reveal-btn-desc">段考最常見迷思診斷＋講義原配類題即時演練</span>
        </button>
      </div>
    </section>

    <!-- 3A. 解題引導與思考提示 (Initially Hidden) -->
    <section class="collapsible-panel" id="guide-section" hidden aria-label="解題引導與思考提示">
      <div class="panel-top-bar">
        <h2>💡 解題引導與思考提示（漸進式 3 步驟）</h2>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button type="button" class="btn preset-btn" id="btn-expand-all-hints">展開全部 3 個提示</button>
          <button type="button" class="btn close-section-btn" data-close="guide-section">收合引導 ▲</button>
        </div>
      </div>
      <div class="hints-list">
        ${lesson.hints.map((h, i) => `
          <div class="hint-card">
            <div class="hint-card-header" data-hint-toggle="${i}" role="button" tabindex="0" aria-expanded="${i === 0 ? 'true' : 'false'}">
              <div>
                <span class="hint-step-badge">引導 Step ${i + 1}</span>
                <span>${h.title}</span>
              </div>
              <span class="reveal-status-pill" id="hint-pill-${i}">${i === 0 ? '點擊收合 ▲' : '點選展開提示 ▼'}</span>
            </div>
            <div class="hint-card-body" id="hint-body-${i}" ${i === 0 ? '' : 'hidden'}>
              <p class="hint-question">❓ 思考問題：${h.question}</p>
              <p class="hint-guidance">🧭 物理引導：${h.guidance}</p>
              <div class="hint-key-formula">🔑 關鍵關係：${h.formula}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- 3B. 詳細解說與完整公式推導 (Initially Hidden) -->
    <section class="collapsible-panel" id="solution-section" hidden aria-label="詳細解說與完整公式推導">
      <div class="panel-top-bar">
        <h2>📖 詳細解說與完整公式推導</h2>
        <button type="button" class="btn close-section-btn" data-close="solution-section">收合詳解 ▲</button>
      </div>
      <div class="steps-timeline">
        ${lesson.steps.map((st, i) => `
          <article class="solution-step-card">
            <div class="step-header-line">
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
                <span class="step-num-tag">STEP ${i + 1}</span>
                <h3 class="step-title">${st.title}</h3>
              </div>
              ${st.presetAction ? `
                <button type="button" class="btn preset-btn" data-step-preset="${i}">🔬 ${st.presetAction.label}</button>
              ` : ''}
            </div>
            <p class="step-explanation">${st.explanation.replace(/\n/g, '<br>')}</p>
            <div class="formula-box">
              <div>$$${st.katex}$$</div>
              <span class="formula-plain">【純文字公式對照】${st.plainFormula}</span>
            </div>
          </article>
        `).join('')}
      </div>
    </section>

    <!-- 3C. 最終答案與選項核對 (Initially Hidden) -->
    <section class="collapsible-panel" id="answer-section" hidden aria-label="最終答案與選項核對">
      <div class="panel-top-bar">
        <h2>🎯 最終答案與選項核對</h2>
        <button type="button" class="btn close-section-btn" data-close="answer-section">收合答案 ▲</button>
      </div>
      <div class="answer-highlight-box">
        <h3>✅ 原題標準答案</h3>
        <p class="answer-main-text">${lesson.answerSummary.replace(/\n/g, '<br>')}</p>
        <div class="option-breakdown">
          ${lesson.optionAnalysis.map(oa => `<div>• ${oa}</div>`).join('')}
        </div>
      </div>
    </section>

    <!-- 3D. 易錯陷阱與觀念自測 (Initially Hidden) -->
    <section class="collapsible-panel" id="quiz-section" hidden aria-label="易錯陷阱與觀念自測">
      <div class="panel-top-bar">
        <h2>🧠 易錯陷阱診斷與講義類題自測</h2>
        <button type="button" class="btn close-section-btn" data-close="quiz-section">收合自測 ▲</button>
      </div>
      <div class="pitfall-box">
        <h3>⚠️ 段考常見迷思與易錯陷阱診斷</h3>
        <p>${lesson.pitfall}</p>
      </div>
      <div class="quiz-grid">
        ${lesson.quizzes.map((qz, qi) => `
          <div class="quiz-card" data-quiz-idx="${qi}">
            <p class="quiz-q">${qz.q}</p>
            <div class="quiz-opts">
              ${qz.options.map((optText, oi) => `
                <button type="button" class="quiz-opt-btn" data-qi="${qi}" data-oi="${oi}">${optText}</button>
              `).join('')}
            </div>
            <div class="quiz-feedback" id="quiz-fb-${qi}" hidden></div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Bottom Pager -->
    <nav class="bottom-pager" aria-label="例題前後導覽">
      ${prevLesson
        ? `<a class="btn" href="${prevLesson.id}.html">← 上一題：例題 ${prevLesson.n}（${prevLesson.title}）</a>`
        : `<a class="btn" href="index.html">← 返回 4-2 例題總覽</a>`
      }
      <a class="btn" href="index.html">📚 4-2 全部 10 題目錄</a>
      ${nextLesson
        ? `<a class="btn primary" href="${nextLesson.id}.html">下一題：例題 ${nextLesson.n}（${nextLesson.title}） →</a>`
        : `<a class="btn primary" href="index.html">🎉 完成全部 10 題，返回總覽 →</a>`
      }
    </nav>
  `;

  typesetMath(root);

  // Simulation State
  const state = { tAnim: 0 };
  const resetToDefaults = () => {
    state.tAnim = 0;
    (lesson.selects || []).forEach(sel => { state[sel.id] = sel.defaultVal; });
    (lesson.controls || []).forEach(c => { state[c.id] = c.defaultVal; });
    (lesson.toggles || []).forEach(t => { state[t.id] = t.defaultVal; });
  };
  resetToDefaults();

  let playing = false;
  let lastTime = 0;

  const playBtn = document.getElementById('btn-play');
  const resetBtn = document.getElementById('btn-reset');
  const canvas = document.getElementById('sim-canvas');
  const metricsEl = document.getElementById('live-metrics');

  function pauseAnim() {
    playing = false;
    if (playBtn) playBtn.textContent = '▶ 播放動態模擬';
  }

  function syncControlsUI() {
    (lesson.selects || []).forEach(sel => {
      const el = document.getElementById('ctrl-' + sel.id);
      if (el) el.value = String(state[sel.id]);
    });
    (lesson.controls || []).forEach(c => {
      const el = document.getElementById('ctrl-' + c.id);
      const out = document.getElementById('out-' + c.id);
      if (el) el.value = state[c.id];
      if (out) {
        if (c.id === 'theta') out.textContent = Math.round(state[c.id]) + '°';
        else if (c.id === 'nLeft' || c.id === 'M' || c.id === 'm' || c.id === 'F' || c.id === 'mTop' || c.id === 'MBot' || c.id === 'N1kg') {
          out.textContent = `${Math.round(state[c.id])} ${c.unit}`;
        } else if (c.id === 't' || c.id === 'a' || c.id === 'm1' || c.id === 'm2') {
          out.textContent = `${Number(state[c.id]).toFixed(1)} ${c.unit}`;
        } else {
          out.textContent = `${Number(state[c.id]).toFixed(2)} ${c.unit}`;
        }
      }
    });
    (lesson.toggles || []).forEach(t => {
      const el = document.getElementById('toggle-' + t.id);
      if (el) el.checked = Boolean(state[t.id]);
    });
  }

  function updateMetrics(m) {
    let items = [];
    if (lesson.id === '4-2-1') {
      items = [
        { label: '圖(1) 手拉定力系統加速度 a₁', val: `${fmt(m.a1, 2)} m/s² （${fmt(m.a1 / m.g, 3)} g）` },
        { label: '圖(2) 懸掛物 B 系統加速度 a₂', val: `${fmt(m.a2, 2)} m/s² （${fmt(m.a2 / m.g, 3)} g）` },
        { label: '繩張力對照 T₁ vs T₂', val: `T₁ = ${fmt(m.T1, 1)} N ＞ T₂ = ${fmt(m.T2, 1)} N` },
        { label: '加速度比例 a₁ / a₂', val: `${fmt(m.ratio, 3)} 倍 （原題 M=10, m=5 → 1.500 = 3/2）` }
      ];
    } else if (lesson.id === '4-2-2') {
      const dirTxt = Math.abs(m.aPrimeOverG) < 0.008
        ? '靜止懸浮（不升降）'
        : m.aPrimeOverG > 0
          ? `向上加速 ${fmt(m.aPrimeOverG, 3)} g`
          : `向下加速 ${fmt(-m.aPrimeOverG, 3)} g`;
      items = [
        { label: '恆定浮力與原重比 B / (mg)', val: `${fmt(m.bOverMg, 3)} （B = m(g − a)）` },
        { label: '拋棄後剩餘質量 (m − Δm)', val: `${fmt(m.remMass, 2)} m （拋棄 ${fmt(m.dropRatio, 2)} m）` },
        { label: '目前運動加速度 a\'', val: dirTxt, cls: Math.abs(m.aPrimeOverG - m.agRatio) < 0.01 ? '' : 'warn' },
        { label: '不升降點 vs 原題上升 a 目標', val: `懸浮 ${fmt(m.dropHover, 3)}m ｜ 上升 a 需 ${fmt(m.dropTarget, 3)}m` }
      ];
    } else if (lesson.id === '4-2-3') {
      items = [
        { label: m.mode === 'monkey_down' ? '猴子重量 mg' : '人的重量 mg', val: `${fmt(m.W, 0)} N （繩負荷上限 ${m.Tmax} N）` },
        { label: '目前繩張力 T', val: `${fmt(m.T, 1)} N`, cls: m.safe ? '' : 'danger' },
        { label: '繩索安全狀態', val: m.safe ? '✅ 安全不斷裂 (T ≤ T_max)' : '💥 超載斷裂！(T > T_max)', cls: m.safe ? '' : 'danger' },
        { label: m.mode === 'monkey_down' ? '不斷裂最小向下加速度 a_min' : '不斷裂最大向上加速度 a_max', val: `${fmt(m.aLimit, 2)} m/s²` }
      ];
    } else if (lesson.id === '4-2-4') {
      items = [
        { label: '系統整體加速度 a = F / m總', val: `方向向右 → （B 獲水平淨力 ${fmt(m.FxB, 1)} N）` },
        { label: '切面正向力 N = (m_B/m總)F·cscθ', val: `${fmt(m.N, 2)} N （= ${fmt(m.nOverF, 3)} F）` },
        { label: '水平推力分量 N sinθ', val: `${fmt(m.Nx, 2)} N （恆等於 ${fmt(m.beta, 2)} F）` },
        { label: '鉛直頂升分量 N cosθ', val: `${fmt(m.Ny, 2)} N （θ 越小此力急增）` }
      ];
    } else if (lesson.id === '4-2-5') {
      items = [
        { label: '系統水平加速度 a = F / m總', val: `${fmt(m.a, 2)} m/s² （m總 = ${m.mTotal} kg）` },
        { label: '接觸面水平正向力 N', val: m.mode === 'two_blocks' ? `${fmt(m.N, 1)} N` : `左 N₂=${fmt(m.N2, 1)} N ＋ 右 N₁=${fmt(m.N1, 1)} N` },
        { label: '最大靜摩擦上限 f_s(max) vs 物重', val: `${fmt(m.fsMax, 1)} N vs ${fmt(m.W, 1)} N`, cls: m.holds ? '' : 'danger' },
        { label: '懸空木塊狀態與臨界最小推力', val: `${m.holds ? '✅ 夾緊不落下' : `⬇️ 下滑 a_y=${fmt(m.ayDown, 2)} m/s²`} （F_min = ${fmt(m.Fmin, 1)} N）`, cls: m.holds ? '' : 'danger' }
      ];
    } else if (lesson.id === '4-2-6') {
      items = [
        { label: '界面最大靜摩擦力 f_s(max) = μmg', val: `${fmt(m.fsMax, 1)} N` },
        { label: '目前施力模式的相對靜止極限', val: `a_max = ${fmt(m.aMax, 2)} m/s² ｜ F_max = ${fmt(m.Fmax, 2)} N` },
        { label: 'A、B 加速度 (a_A / a_B)', val: m.slips ? `a_A=${fmt(m.aA, 2)} ｜ a_B=${fmt(m.aB, 2)} m/s²` : `合體共速 a = ${fmt(m.aA, 2)} m/s²`, cls: m.slips ? 'warn' : '' },
        { label: 'A、B 之間狀態', val: m.slips ? '⚡ 發生相對滑動！(F > F_max)' : '✅ 保持相對靜止一起加速', cls: m.slips ? 'warn' : '' }
      ];
    } else if (lesson.id === '4-2-7') {
      items = [
        { label: '圖 1 平衡狀態 (3 vs 3) 張力 T₁', val: `${fmt(m.T1, 2)} N （= 3.00 mg）` },
        { label: `圖 2 配重 (${m.nL} vs ${m.nR}) 系統加速度`, val: `${fmt(Math.abs(m.a2), 2)} m/s² （${m.nL > m.nR ? '左降右升' : m.nL < m.nR ? '左升右降' : '靜止'}）` },
        { label: '圖 2 運動中繩張力 T₂', val: `${fmt(m.T2, 2)} N （= ${fmt(m.T2 / 10, 2)} mg）` },
        { label: '張力倍率 T₂ / T₁', val: `${fmt(m.ratio, 4)} 倍 （4 vs 2 時為 8/9 ≈ 0.8889）` }
      ];
    } else if (lesson.id === '4-2-8') {
      items = [
        { label: '繩 A 張力 T_A（懸掛 m₁）', val: `${fmt(m.TA, 2)} N （= 2 T_B）` },
        { label: '繩 B 張力 T_B（繞滑輪接 m₂）', val: `${fmt(m.TB, 2)} N` },
        { label: 'm₁ 加速度 a₁（向上為正）', val: `${fmt(m.a1, 2)} m/s² （${fmt(m.a1 / m.g, 3)} g）`, cls: m.a1 < 0 ? 'warn' : '' },
        { label: 'm₂ 加速度 a₂ = 2a₁（向下為正）', val: `${fmt(m.a2, 2)} m/s² （${fmt(m.a2 / m.g, 3)} g）` }
      ];
    } else if (lesson.id === '4-2-9') {
      items = [
        { label: '(1) 人對繩施力（繩張力 T）', val: `${fmt(m.T, 1)} N （3T = (M+m)(g+a)）` },
        { label: '(2) 人與平臺正向力 N', val: m.detaches ? `0 N （理論值 ${fmt(m.Nraw, 1)} N < 0）` : `${fmt(m.N, 1)} N`, cls: m.detaches ? 'danger' : '' },
        { label: '起飛體重門檻檢驗 (2m ≥ M)', val: m.detaches ? '⚠️ m < M/2：人會脫離平臺獨自爬繩！' : `✅ 成立（臨界最小體重 M/2 = ${fmt(m.M / 2, 1)} kg）`, cls: m.detaches ? 'danger' : '' }
      ];
    } else if (lesson.id === '4-2-10') {
      items = [
        { label: '目前電梯階段', val: m.phaseName },
        { label: '目前速度 v(t) 與加速度 a(t)', val: `v = ${fmt(m.v, 2)} m/s ｜ a = ${m.aCur >= 0 ? '+' : ''}${fmt(m.aCur, 2)} m/s²` },
        { label: '即時磅秤視重 vs 實重', val: `視重 ${fmt(m.NcurKg, 0)} kgw ｜ 實重 60 kgw` },
        { label: '累積上升位移 y(t) / 總距離', val: `${fmt(m.y, 2)} m / 總距離 ${fmt(m.yTotal, 1)} m` }
      ];
    }

    metricsEl.innerHTML = items.map(it => `
      <div class="metric-box ${it.cls || ''}">
        <span class="m-label">${it.label}</span>
        <strong class="m-val">${it.val}</strong>
      </div>
    `).join('');
  }

  function renderAll() {
    const m = computePhysics(lesson.id, state);
    syncControlsUI();
    updateMetrics(m);
    drawSimulationCanvas(canvas, lesson.id, state, m);
  }

  window.__redrawSim = renderAll;

  (lesson.selects || []).forEach(sel => {
    const el = document.getElementById('ctrl-' + sel.id);
    if (el) {
      el.addEventListener('change', e => {
        state[sel.id] = e.target.value;
        state.tAnim = 0;
        renderAll();
      });
    }
  });

  (lesson.controls || []).forEach(c => {
    const el = document.getElementById('ctrl-' + c.id);
    if (el) {
      el.addEventListener('input', e => {
        if (c.id === 't') pauseAnim();
        state[c.id] = Number(e.target.value);
        if (c.id !== 't') state.tAnim = 0;
        renderAll();
      });
    }
  });

  (lesson.toggles || []).forEach(t => {
    const el = document.getElementById('toggle-' + t.id);
    if (el) {
      el.addEventListener('change', e => {
        state[t.id] = e.target.checked;
        renderAll();
      });
    }
  });

  document.querySelectorAll('[data-preset-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      pauseAnim();
      state.tAnim = 0;
      const p = lesson.presets[Number(btn.dataset.presetIdx)];
      if (p && p.state) Object.assign(state, p.state);
      renderAll();
    });
  });

  document.querySelectorAll('[data-step-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      pauseAnim();
      state.tAnim = 0;
      const st = lesson.steps[Number(btn.dataset.stepPreset)];
      if (st && st.presetAction && st.presetAction.state) {
        Object.assign(state, st.presetAction.state);
        renderAll();
        document.getElementById('simulation-section').scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (playing) {
        pauseAnim();
        return;
      }
      if (lesson.id === '4-2-10' && state.t >= 14.95) {
        state.t = 0;
      } else if (lesson.id !== '4-2-10') {
        state.tAnim = 0;
      }
      playing = true;
      lastTime = 0;
      playBtn.textContent = '⏸ 暫停動態模擬';
      requestAnimationFrame(tickAnim);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      pauseAnim();
      resetToDefaults();
      renderAll();
    });
  }

  function tickAnim(now) {
    if (!playing) return;
    const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0.016;
    lastTime = now;

    if (lesson.id === '4-2-10') {
      state.t = Math.min(15, Number(state.t) + dt * 2.5);
      if (state.t >= 15) pauseAnim();
    } else {
      state.tAnim = (state.tAnim + dt * 1.1) % 3.2;
    }

    renderAll();
    if (playing) requestAnimationFrame(tickAnim);
  }

  setupCanvasDragging(canvas, lesson.id, state, pauseAnim, renderAll);

  // Progressive Disclosure Controls (Hidden by default -> Click to open)
  const sectionMap = {
    'guide-section': { btnId: 'btn-toggle-guide', statusId: 'status-guide' },
    'solution-section': { btnId: 'btn-toggle-solution', statusId: 'status-solution' },
    'answer-section': { btnId: 'btn-toggle-answer', statusId: 'status-answer' },
    'quiz-section': { btnId: 'btn-toggle-quiz', statusId: 'status-quiz' }
  };

  function setSectionOpen(secId, open, scrollIfOpening = false) {
    const secEl = document.getElementById(secId);
    const info = sectionMap[secId];
    if (!secEl || !info) return;
    const btnEl = document.getElementById(info.btnId);
    const statusEl = document.getElementById(info.statusId);

    secEl.hidden = !open;
    if (btnEl) btnEl.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (statusEl) statusEl.textContent = open ? '已開啟 ▲' : '點選開啟 ▼';

    if (open) {
      typesetMath(secEl);
      if (scrollIfOpening) {
        secEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
    updateMasterToggleState();
  }

  function updateMasterToggleState() {
    const masterBtn = document.getElementById('btn-toggle-all');
    if (!masterBtn) return;
    const allOpen = Object.keys(sectionMap).every(id => {
      const el = document.getElementById(id);
      return el && !el.hidden;
    });
    masterBtn.setAttribute('aria-expanded', allOpen ? 'true' : 'false');
    masterBtn.textContent = allOpen ? '🔒 全部收合隱藏' : '🔓 一鍵展開全部解析';
  }

  Object.keys(sectionMap).forEach(secId => {
    const btnEl = document.getElementById(sectionMap[secId].btnId);
    if (btnEl) {
      btnEl.addEventListener('click', () => {
        const secEl = document.getElementById(secId);
        const willOpen = secEl ? secEl.hidden : true;
        setSectionOpen(secId, willOpen, willOpen);
      });
    }
  });

  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      setSectionOpen(btn.dataset.close, false, false);
    });
  });

  const masterToggleBtn = document.getElementById('btn-toggle-all');
  if (masterToggleBtn) {
    masterToggleBtn.addEventListener('click', () => {
      const currentlyAllOpen = masterToggleBtn.getAttribute('aria-expanded') === 'true';
      const targetState = !currentlyAllOpen;
      Object.keys(sectionMap).forEach(secId => setSectionOpen(secId, targetState, false));
      if (targetState) {
        lesson.hints.forEach((_, i) => setHintOpen(i, true));
      }
    });
  }

  function setHintOpen(i, open) {
    const body = document.getElementById(`hint-body-${i}`);
    const pill = document.getElementById(`hint-pill-${i}`);
    const header = document.querySelector(`[data-hint-toggle="${i}"]`);
    if (!body) return;
    body.hidden = !open;
    if (header) header.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (pill) pill.textContent = open ? '點擊收合 ▲' : '點選展開提示 ▼';
  }

  document.querySelectorAll('[data-hint-toggle]').forEach(header => {
    header.addEventListener('click', () => {
      const i = Number(header.dataset.hintToggle);
      const body = document.getElementById(`hint-body-${i}`);
      setHintOpen(i, body ? body.hidden : true);
    });
  });

  const expandAllHintsBtn = document.getElementById('btn-expand-all-hints');
  if (expandAllHintsBtn) {
    expandAllHintsBtn.addEventListener('click', () => {
      lesson.hints.forEach((_, i) => setHintOpen(i, true));
    });
  }

  document.querySelectorAll('.quiz-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const qi = Number(btn.dataset.qi);
      const oi = Number(btn.dataset.oi);
      const qz = lesson.quizzes[qi];
      if (!qz) return;
      const isCorrect = oi === qz.correct;
      const parentCard = btn.closest('.quiz-card');
      parentCard.querySelectorAll('.quiz-opt-btn').forEach((b, idx2) => {
        b.classList.remove('correct', 'wrong');
        if (idx2 === qz.correct) b.classList.add('correct');
        else if (idx2 === oi && !isCorrect) b.classList.add('wrong');
      });
      const fb = document.getElementById(`quiz-fb-${qi}`);
      if (fb) {
        fb.hidden = false;
        fb.innerHTML = `${isCorrect ? '✅ <strong>答對了！</strong>' : '💡 <strong>再想一下：</strong>'} ${qz.explanation}`;
        typesetMath(fb);
      }
    });
  });

  renderAll();
}

// ============================================================================
// Direct Pointer Dragging on Graph/Canvas for Quick Exploration
// ============================================================================
function setupCanvasDragging(canvas, id, state, pauseAnim, renderAll) {
  if (!canvas) return;
  let dragging = false;

  const updateFromPointer = (clientX, clientY) => {
    const rect = canvas.getBoundingClientRect();
    const px = (clientX - rect.left) * (820 / rect.width);
    const py = (clientY - rect.top) * (520 / rect.height);

    if (id === '4-2-10') {
      // Right panel v-t graph spans x: 455..785 for t in [0, 15]
      if (px >= 420) {
        const ratio = Math.max(0, Math.min(1, (px - 455) / 330));
        state.t = Number((ratio * 15).toFixed(1));
        renderAll();
      } else {
        const yRatio = Math.max(0, Math.min(1, (430 - py) / 310));
        state.t = Number((yRatio * 15).toFixed(1));
        renderAll();
      }
    } else if (id === '4-2-2' && px >= 445) {
      const ratio = Math.max(0, Math.min(0.85, ((px - 465) / 310) * 0.85));
      state.dropRatio = Number(ratio.toFixed(2));
      state.tAnim = 0;
      renderAll();
    } else if (id === '4-2-3' && px >= 445) {
      const ratio = Math.max(0, Math.min(10, ((px - 465) / 310) * 10));
      state.a = Number((Math.round(ratio * 5) / 5).toFixed(1));
      state.tAnim = 0;
      renderAll();
    } else if (id === '4-2-4' && px >= 445) {
      const deg = 20 + Math.max(0, Math.min(1, (px - 465) / 310)) * 65;
      state.theta = Math.round(deg);
      state.tAnim = 0;
      renderAll();
    } else if (id === '4-2-5' && px >= 445) {
      const F = 10 + Math.max(0, Math.min(1, (px - 465) / 310)) * 210;
      state.F = Math.round(F / 5) * 5;
      state.tAnim = 0;
      renderAll();
    } else if (id === '4-2-6' && px >= 445) {
      const F = 2 + Math.max(0, Math.min(1, (px - 465) / 310)) * 58;
      state.F = Math.round(F);
      state.tAnim = 0;
      renderAll();
    }
  };

  canvas.addEventListener('pointerdown', e => {
    const rect = canvas.getBoundingClientRect();
    const px = (e.clientX - rect.left) * (820 / rect.width);
    if (id !== '4-2-10' && px < 445) return;
    dragging = true;
    pauseAnim();
    canvas.setPointerCapture(e.pointerId);
    updateFromPointer(e.clientX, e.clientY);
  });

  canvas.addEventListener('pointermove', e => {
    if (!dragging) return;
    updateFromPointer(e.clientX, e.clientY);
  });

  const endDrag = () => { dragging = false; };
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
}

// ============================================================================
// High-DPI HTML5 Canvas Renderer for All 10 Examples (4-2-1 ~ 4-2-10)
// ============================================================================
function drawSimulationCanvas(canvas, id, s, m) {
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = 820, H = 520;
  if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
    canvas.width = W * dpr;
    canvas.height = H * dpr;
  }
  const ctx = canvas.getContext('2d');
  ctx.save();
  ctx.scale(dpr, dpr);

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const P = {
    bg: isDark ? '#0f172a' : '#fafcff',
    grid: isDark ? 'rgba(148, 163, 184, 0.10)' : 'rgba(15, 23, 42, 0.05)',
    ink: isDark ? '#f1f5f9' : '#0f172a',
    sub: isDark ? '#94a3b8' : '#475569',
    muted: isDark ? '#64748b' : '#94a3b8',
    orange: isDark ? '#fb923c' : '#d95f18',
    blue: isDark ? '#60a5fa' : '#0f62fe',
    teal: isDark ? '#2dd4bf' : '#0b7b76',
    crimson: isDark ? '#f87171' : '#c9372c',
    emerald: isDark ? '#4ade80' : '#15803d',
    blockFill: isDark ? '#1e293b' : '#e2ebf7',
    blockFillAlt: isDark ? '#283548' : '#dbe7f5',
    blockStroke: isDark ? '#64748b' : '#475569',
    cardBg: isDark ? 'rgba(19, 28, 49, 0.90)' : 'rgba(255, 255, 255, 0.94)',
    hatch: isDark ? '#475569' : '#94a3b8'
  };

  // Clear & Grid
  ctx.fillStyle = P.bg;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = P.grid;
  ctx.lineWidth = 1;
  for (let gx = 40; gx < W; gx += 40) {
    ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
  }
  for (let gy = 40; gy < H; gy += 40) {
    ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
  }

  // Drawing Helpers
  function drawArrow(x1, y1, dx, dy, color, label = '', width = 2.6, dashed = false, labelOffset = { x: 0, y: 0 }) {
    const len = Math.hypot(dx, dy);
    if (len < 2) return;
    const x2 = x1 + dx, y2 = y1 + dy;
    const ang = Math.atan2(dy, dx);
    const head = Math.min(11, Math.max(7, len * 0.25));
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    if (dashed) ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - head * Math.cos(ang - 0.42), y2 - head * Math.sin(ang - 0.42));
    ctx.lineTo(x2 - head * Math.cos(ang + 0.42), y2 - head * Math.sin(ang + 0.42));
    ctx.closePath();
    ctx.fill();
    if (label) {
      ctx.font = '700 13px "Noto Sans TC", "JetBrains Mono", sans-serif';
      ctx.textAlign = Math.abs(dx) > Math.abs(dy) ? (dx >= 0 ? 'left' : 'right') : 'center';
      ctx.textBaseline = 'middle';
      const lx = x2 + Math.cos(ang) * 10 + labelOffset.x;
      const ly = y2 + Math.sin(ang) * 12 + labelOffset.y;
      ctx.fillText(label, lx, ly);
    }
    ctx.restore();
  }

  function drawBlock(x, y, w, h, label, sublabel = '', fill = P.blockFill, stroke = P.blockStroke) {
    ctx.save();
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 5);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = P.ink;
    ctx.font = '800 14px "Noto Sans TC", "JetBrains Mono", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (sublabel) {
      ctx.fillText(label, x + w / 2, y + h / 2 - 8);
      ctx.font = '600 12px "JetBrains Mono", sans-serif';
      ctx.fillStyle = P.sub;
      ctx.fillText(sublabel, x + w / 2, y + h / 2 + 10);
    } else {
      ctx.fillText(label, x + w / 2, y + h / 2);
    }
    ctx.restore();
  }

  function drawSurface(x1, y, x2, hatchDown = true, smooth = true) {
    ctx.save();
    ctx.strokeStyle = P.blockStroke;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(x1, y);
    ctx.lineTo(x2, y);
    ctx.stroke();
    ctx.strokeStyle = P.hatch;
    ctx.lineWidth = 1.2;
    const step = smooth ? 16 : 9;
    const dir = hatchDown ? 1 : -1;
    for (let hx = x1 + 6; hx < x2 - 4; hx += step) {
      ctx.beginPath();
      ctx.moveTo(hx, y);
      ctx.lineTo(hx - 6, y + 7 * dir);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawPulley(cx, cy, r = 16, mountType = 'ceiling', mountY = 0) {
    ctx.save();
    if (mountType === 'ceiling' && mountY < cy) {
      ctx.strokeStyle = P.blockStroke;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, mountY);
      ctx.lineTo(cx, cy);
      ctx.stroke();
    } else if (mountType === 'corner') {
      ctx.strokeStyle = P.blockStroke;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 12, cy + 12);
      ctx.lineTo(cx, cy);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = P.cardBg;
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = P.blockStroke;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = P.blockStroke;
    ctx.fill();
    ctx.restore();
  }

  function drawGraphBox({ x0, y0, w, h, title, xmax, xmin = 0, ymax, ymin = 0, xlabel, ylabel, curves = [], markers = [], vLines = [], hLines = [], fillArea = null }) {
    ctx.save();
    ctx.fillStyle = P.cardBg;
    ctx.strokeStyle = P.blockStroke;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(x0 - 58, y0 - h - 54, w + 86, h + 92, 12);
    ctx.fill();
    ctx.stroke();

    if (title) {
      ctx.fillStyle = P.ink;
      ctx.font = '800 13.5px "Noto Sans TC", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(title, x0 - 44, y0 - h - 33);
    }

    // Crisp horizontal legend strip above plot area (prevents curve/label overlaps)
    const legendCurves = curves.filter(c => c.label);
    if (legendCurves.length) {
      let lx = x0 - 44;
      const ly = y0 - h - 14;
      ctx.font = '700 11.5px "Noto Sans TC", sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      legendCurves.forEach(c => {
        ctx.save();
        ctx.strokeStyle = c.color;
        ctx.lineWidth = 2.8;
        if (c.dash) ctx.setLineDash(c.dash);
        ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx + 16, ly); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = c.color;
        ctx.fillText(c.label, lx + 21, ly);
        lx += 26 + ctx.measureText(c.label).width + 12;
        ctx.restore();
      });
      ctx.textBaseline = 'alphabetic';
    }

    const px = xv => x0 + ((xv - xmin) / (xmax - xmin)) * w;
    const py = yv => y0 - ((Math.max(ymin, Math.min(ymax, yv)) - ymin) / (ymax - ymin)) * h;

    // Optional shaded area under curve
    if (fillArea && fillArea.to > xmin) {
      ctx.save();
      ctx.fillStyle = fillArea.color || (isDark ? 'rgba(45, 212, 191, 0.25)' : 'rgba(11, 123, 118, 0.18)');
      ctx.beginPath();
      ctx.moveTo(px(xmin), py(0));
      const steps = 80;
      const hi = Math.min(xmax, fillArea.to);
      for (let i = 0; i <= steps; i++) {
        const xv = xmin + (hi - xmin) * (i / steps);
        const yv = fillArea.fn(xv);
        ctx.lineTo(px(xv), py(yv));
      }
      ctx.lineTo(px(hi), py(0));
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Zero line if ymin < 0
    if (ymin < 0 && ymax > 0) {
      const zy = py(0);
      ctx.strokeStyle = P.muted;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.moveTo(x0, zy); ctx.lineTo(x0 + w, zy); ctx.stroke();
      ctx.setLineDash([]);
    }

    // Axes
    ctx.strokeStyle = P.sub;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(x0, y0 - h - 2);
    ctx.lineTo(x0, y0);
    ctx.lineTo(x0 + w + 6, y0);
    ctx.stroke();

    // Horizontal reference lines
    hLines.forEach(hl => {
      const hy = py(hl.y);
      ctx.save();
      ctx.strokeStyle = hl.color || P.crimson;
      ctx.setLineDash([5, 4]);
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(x0, hy); ctx.lineTo(x0 + w, hy); ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = '700 11px "Noto Sans TC", sans-serif';
      ctx.textAlign = 'right';
      ctx.strokeStyle = P.cardBg;
      ctx.lineWidth = 4;
      ctx.strokeText(hl.label, x0 + w - 4, hy - 6);
      ctx.fillStyle = hl.color || P.crimson;
      ctx.fillText(hl.label, x0 + w - 4, hy - 6);
      ctx.restore();
    });

    // Vertical reference lines
    vLines.forEach(vl => {
      const vx = px(vl.x);
      ctx.save();
      ctx.strokeStyle = vl.color || P.muted;
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1.3;
      ctx.beginPath(); ctx.moveTo(vx, y0); ctx.lineTo(vx, y0 - h); ctx.stroke();
      ctx.fillStyle = vl.color || P.sub;
      ctx.font = '600 11px "Noto Sans TC", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(vl.label, vx, y0 + 15);
      ctx.restore();
    });

    // Curves
    curves.forEach(c => {
      ctx.save();
      ctx.strokeStyle = c.color;
      ctx.lineWidth = c.width || 2.5;
      if (c.dash) ctx.setLineDash(c.dash);
      const segs = c.segments || [[xmin, xmax]];
      segs.forEach(([lo, hi]) => {
        ctx.beginPath();
        let started = false;
        const steps = 120;
        for (let i = 0; i <= steps; i++) {
          const xv = lo + (hi - lo) * (i / steps);
          const yv = c.fn(xv);
          if (yv === null || !Number.isFinite(yv)) { started = false; continue; }
          const cx = px(xv), cy = py(yv);
          if (!started) { ctx.moveTo(cx, cy); started = true; }
          else ctx.lineTo(cx, cy);
        }
        ctx.stroke();
      });
      ctx.restore();
    });

    // Markers with background halo & stagger if stacked vertically
    const placedLabels = [];
    markers.forEach((mk, idx) => {
      if (!mk || !Number.isFinite(mk.y)) return;
      const mx = px(mk.x), my = py(mk.y);
      ctx.save();
      ctx.strokeStyle = mk.color || P.orange;
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(mx, y0); ctx.lineTo(mx, my); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = mk.color || P.orange;
      ctx.beginPath(); ctx.arc(mx, my, 5.5, 0, Math.PI * 2); ctx.fill();
      if (mk.label) {
        ctx.font = '700 11px "JetBrains Mono", "Noto Sans TC", sans-serif';
        const alignRight = mx > x0 + w * 0.62;
        ctx.textAlign = alignRight ? 'right' : 'left';
        let lx = mx + (alignRight ? -9 : 9);
        let ly = my - 10;
        if (placedLabels.some(p => Math.abs(p.x - lx) < 60 && Math.abs(p.y - ly) < 16)) {
          ly = my + 16;
        }
        ly = Math.max(y0 - h + 12, Math.min(y0 - 8, ly));
        placedLabels.push({ x: lx, y: ly });
        ctx.strokeStyle = P.cardBg;
        ctx.lineWidth = 4;
        ctx.strokeText(mk.label, lx, ly);
        ctx.fillStyle = mk.color || P.orange;
        ctx.fillText(mk.label, lx, ly);
      }
      ctx.restore();
    });

    ctx.fillStyle = P.sub;
    ctx.font = '700 11.5px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(ylabel, x0 - 6, y0 - h + 6);
    ctx.textAlign = 'right';
    ctx.fillText(xlabel, x0 + w + 6, y0 + 28);
    ctx.restore();
  }

  function drawTopBanner(text, color = P.ink) {
    ctx.save();
    ctx.fillStyle = P.cardBg;
    ctx.strokeStyle = P.blockStroke;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(18, 14, W - 36, 36, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.font = '800 14.5px "Noto Sans TC", "JetBrains Mono", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, W / 2, 32);
    ctx.restore();
  }

  // ========================================================================
  // 4-2-1: 手拉定力 vs 懸掛重物 B
  // ========================================================================
  if (id === '4-2-1') {
    drawTopBanner(`加速度比 a₁ / a₂ = (M + m) / M = (${m.M} + ${m.m}) / ${m.M} = ${fmt(m.ratio, 2)}   ⟹   圖(1) 領先圖(2)！`, P.ink);

    const maxTravel = 155;
    const travelRatio = Math.min(1, m.x1 / 25);
    const dx1 = maxTravel * travelRatio;
    const dx2 = dx1 / m.ratio;

    // Track 1 (Top left)
    const t1Y = 148, pulleyX = 365, tableLeft = 40;
    ctx.fillStyle = P.blue;
    ctx.font = '800 14px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`圖(1) 手向下施定力 F = ${m.m} kgw（只加速 M）`, 26, 76);

    // Table 1
    ctx.fillStyle = P.blockFillAlt;
    ctx.fillRect(tableLeft, t1Y, pulleyX - tableLeft - 6, 12);
    drawSurface(tableLeft, t1Y, pulleyX - 6, true, true);
    drawPulley(pulleyX, t1Y - 4, 15, 'corner');

    const b1x = 75 + dx1;
    drawBlock(b1x, t1Y - 46, 76, 46, `M=${m.M}kg`, `a₁=${fmt(m.a1, 2)}`, P.blockFill, P.blue);
    // String 1
    ctx.strokeStyle = P.teal;
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(b1x + 76, t1Y - 19);
    ctx.lineTo(pulleyX, t1Y - 19);
    ctx.arc(pulleyX, t1Y - 4, 15, -Math.PI / 2, 0);
    ctx.lineTo(pulleyX + 15, 222 + dx1 * 0.45);
    ctx.stroke();

    // Hand force vector
    drawArrow(pulleyX + 15, 222 + dx1 * 0.45, 0, 38, P.blue, `手拉 ${m.F} N`, 3);
    if (s.showTensions) {
      drawArrow(b1x + 76, t1Y - 28, 52, 0, P.teal, `T₁=${fmt(m.T1, 0)}N`, 2.6, false, { x: 0, y: -12 });
    }

    // Track 2 (Bottom left)
    const t2Y = 362;
    ctx.fillStyle = P.orange;
    ctx.font = '800 14px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`圖(2) 懸掛物體 B=${m.m}kg（同時加速 M+m）`, 26, 290);

    drawSurface(tableLeft, t2Y, pulleyX - 6, true, true);
    drawPulley(pulleyX, t2Y - 4, 15, 'corner');

    const b2x = 75 + dx2;
    drawBlock(b2x, t2Y - 46, 76, 46, `M=${m.M}kg`, `a₂=${fmt(m.a2, 2)}`, P.blockFill, P.orange);
    const hangY = 408 + dx2 * 0.45;
    ctx.strokeStyle = P.teal;
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(b2x + 76, t2Y - 19);
    ctx.lineTo(pulleyX, t2Y - 19);
    ctx.arc(pulleyX, t2Y - 4, 15, -Math.PI / 2, 0);
    ctx.lineTo(pulleyX + 15, hangY);
    ctx.stroke();

    drawBlock(pulleyX - 7, hangY, 44, 42, `B`, `${m.m}kg`, P.blockFillAlt, P.orange);
    if (s.showTensions) {
      drawArrow(b2x + 76, t2Y - 28, 52 * (m.T2 / m.T1), 0, P.teal, `T₂=${fmt(m.T2, 1)}N`, 2.6, false, { x: 0, y: -12 });
      drawArrow(pulleyX + 15, hangY + 42, 0, 28, P.orange, `mg=${m.F}N`, 2.3);
      drawArrow(pulleyX + 15, hangY, 0, -24 * (m.T2 / m.T1), P.teal, '', 2.3);
    }

    // Right Graph: a1, a2 vs m/M
    if (s.showCurve) {
      const ratioNow = m.m / m.M;
      const maxR = Math.max(2.0, ratioNow * 1.25);
      drawGraphBox({
        x0: 495, y0: 445, w: 280, h: 310,
        title: '加速度 (a/g) 隨質量比 m/M 變化',
        xmin: 0, xmax: maxR, ymin: 0, ymax: maxR,
        xlabel: 'm / M',
        ylabel: 'a / g',
        curves: [
          { fn: r => r, color: P.blue, width: 2.8, label: '圖(1) a₁/g = m/M', labelPos: { x: 525, y: 168 } },
          { fn: r => r / (1 + r), color: P.orange, width: 2.8, label: '圖(2) a₂/g = m/(M+m)', labelPos: { x: 545, y: 312 } }
        ],
        markers: [
          { x: ratioNow, y: m.a1 / m.g, color: P.blue, label: `a₁=${fmt(m.a1 / m.g, 2)}g` },
          { x: ratioNow, y: m.a2 / m.g, color: P.orange, label: `a₂=${fmt(m.a2 / m.g, 2)}g` }
        ],
        vLines: [{ x: 0.5, label: '原題 m/M=0.5' }]
      });
    }
  }

  // ========================================================================
  // 4-2-2: 輕汽球拋棄質量問題
  // ========================================================================
  else if (id === '4-2-2') {
    drawTopBanner(
      `浮力恆為 B = (1 − ${fmt(m.agRatio, 2)})mg ＝ ${fmt(m.bOverMg, 2)}mg  ｜  目標 Δm = 2ma/(g+a) = ${fmt(m.dropTarget, 3)}m`,
      P.ink
    );

    const animShift = m.tAnim > 0 ? Math.sin(m.tAnim * 2.2) : 0;

    // Left: Before (always accelerating down)
    const b1x = 120, b1y = 195 + (m.tAnim > 0 ? Math.min(45, 16 * m.tAnim * m.tAnim * m.agRatio * 4) : 0);
    ctx.fillStyle = P.sub;
    ctx.font = '700 13.5px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('拋棄前（下降加速 a）', b1x, 82);

    // Balloon 1
    ctx.save();
    ctx.fillStyle = P.blockFillAlt;
    ctx.strokeStyle = P.blue;
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(b1x, b1y, 38, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = P.sub;
    ctx.beginPath(); ctx.moveTo(b1x, b1y + 38); ctx.lineTo(b1x, b1y + 82); ctx.stroke();
    ctx.restore();
    drawBlock(b1x - 24, b1y + 82, 48, 34, 'm', '', P.blockFill, P.orange);
    if (s.showForces) {
      drawArrow(b1x, b1y - 40, 0, -55 * m.bOverMg, P.teal, `B=${fmt(m.bOverMg, 2)}mg`, 2.6, false, { x: 0, y: -6 });
      drawArrow(b1x, b1y + 116, 0, 55, P.orange, 'mg', 2.6, false, { x: 0, y: 6 });
      drawArrow(b1x - 52, b1y + 30, 0, 38 * m.agRatio * 2, P.crimson, `a=${fmt(m.agRatio, 2)}g↓`, 2.6);
    }

    // Middle: After dropping Δm
    const b2x = 305;
    const rawShift = m.tAnim > 0 ? -0.5 * m.aPrimeOverG * 22 * m.tAnim * m.tAnim : 0;
    const b2y = Math.max(125, Math.min(285, 200 + rawShift));
    ctx.fillStyle = P.ink;
    ctx.font = '800 13.5px "Noto Sans TC", sans-serif';
    ctx.fillText(`拋棄後（剩 ${fmt(m.remMass, 2)}m）`, b2x, 82);

    ctx.save();
    ctx.fillStyle = m.aPrimeOverG >= m.agRatio - 0.01 ? P.blockFillAlt : P.blockFill;
    ctx.strokeStyle = m.aPrimeOverG >= 0 ? P.teal : P.orange;
    ctx.lineWidth = 2.8;
    ctx.beginPath(); ctx.arc(b2x, b2y, 38, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = P.sub;
    ctx.beginPath(); ctx.moveTo(b2x, b2y + 38); ctx.lineTo(b2x, b2y + 82); ctx.stroke();
    ctx.restore();
    drawBlock(b2x - 26, b2y + 82, 52, 34, `${fmt(m.remMass, 2)}m`, '', P.blockFill, P.teal);

    // Falling dropped bag if dropRatio > 0
    if (m.dropRatio > 0.01) {
      const fallY = b2y + 135 + (m.tAnim > 0 ? 35 * m.tAnim : 15);
      drawBlock(b2x + 36, Math.min(450, fallY), 52, 36, `Δm`, `${fmt(m.dropRatio, 2)}m`, P.cardBg, P.crimson);
    }
    if (s.showForces) {
      drawArrow(b2x, b2y - 40, 0, -55 * m.bOverMg, P.teal, `B=${fmt(m.bOverMg, 2)}mg`, 2.6, false, { x: 0, y: -6 });
      drawArrow(b2x, b2y + 116, 0, 55 * m.remMass, P.orange, `${fmt(m.remMass, 2)}mg`, 2.6, false, { x: 0, y: 6 });
      if (Math.abs(m.aPrimeOverG) > 0.01) {
        const up = m.aPrimeOverG > 0;
        drawArrow(b2x + 50, b2y + 30, 0, up ? -38 : 38, up ? P.emerald : P.crimson, '', 2.8);
        ctx.fillStyle = up ? P.emerald : P.crimson;
        ctx.font = '800 12.5px "JetBrains Mono", "Noto Sans TC", sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`a'=${fmt(Math.abs(m.aPrimeOverG), 2)}g${up ? '↑' : '↓'}`, b2x + 57, b2y + (up ? 8 : 54));
      }
    }

    // Right Graph: a'/g vs dropRatio
    drawGraphBox({
      x0: 475, y0: 445, w: 300, h: 310,
      title: '拋棄後加速度 a\'/g 隨 Δm/m 變化曲線',
      xmin: 0, xmax: 0.85, ymin: -0.7, ymax: 1.4,
      xlabel: 'Δm / m',
      ylabel: 'a\' / g',
      curves: [
        {
          fn: d => {
            const rem = 1 - d;
            return (m.bOverMg - rem) / rem;
          },
          color: P.blue, width: 3, label: 'a\'/g (向上為正)'
        }
      ],
      markers: [
        { x: m.dropRatio, y: m.aPrimeOverG, color: P.teal, label: `Δm=${fmt(m.dropRatio, 2)}m` },
        { x: m.dropTarget, y: m.agRatio, color: P.orange, label: `目標(${fmt(m.dropTarget, 2)}m)` }
      ],
      vLines: [
        { x: m.dropHover, label: '懸浮', color: P.sub },
        { x: m.dropTarget, label: '目標2ma/(g+a)', color: P.orange }
      ],
      hLines: [
        { y: m.agRatio, label: `目標 +a = +${fmt(m.agRatio, 2)}g`, color: P.teal }
      ]
    });
  }

  // ========================================================================
  // 4-2-3: 繩子之最大張力
  // ========================================================================
  else if (id === '4-2-3') {
    const isDown = m.mode === 'monkey_down';
    drawTopBanner(
      m.safe
        ? `✅ 繩張力 T = ${fmt(m.T, 1)} N ≤ T_max (${m.Tmax} N) — 繩索不斷裂！`
        : `💥 警報！繩張力 T = ${fmt(m.T, 1)} N ＞ T_max (${m.Tmax} N) — 繩索超載斷裂！`,
      m.safe ? P.emerald : P.crimson
    );

    // Tree / Ceiling support
    drawSurface(60, 76, 360, false, true);
    const ropeX = 165;
    const climberY = isDown
      ? (m.safe ? 165 + (m.tAnim > 0 ? Math.min(200, 12 * m.a * m.tAnim * m.tAnim) : 20) : 165 + (m.tAnim > 0 ? Math.min(240, 50 * m.tAnim * m.tAnim) : 20))
      : (m.safe ? 350 - (m.tAnim > 0 ? Math.min(180, 14 * (m.a + 1) * m.tAnim * m.tAnim) : 20) : 350);

    // Rope (snapped if !m.safe)
    ctx.save();
    ctx.strokeStyle = m.safe ? P.teal : P.crimson;
    ctx.lineWidth = 4;
    if (m.safe) {
      ctx.beginPath(); ctx.moveTo(ropeX, 76); ctx.lineTo(ropeX, 455); ctx.stroke();
    } else {
      ctx.beginPath(); ctx.moveTo(ropeX, 76); ctx.lineTo(ropeX, 118); ctx.stroke();
      // Jagged snap
      ctx.strokeStyle = P.crimson;
      ctx.beginPath();
      ctx.moveTo(ropeX - 10, 118); ctx.lineTo(ropeX + 10, 128);
      ctx.moveTo(ropeX + 10, 118); ctx.lineTo(ropeX - 10, 128);
      ctx.stroke();
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(ropeX, 134); ctx.lineTo(ropeX, climberY); ctx.stroke();
    }
    ctx.restore();

    // Climber node
    drawBlock(ropeX - 38, climberY, 76, 54, isDown ? '🐒 猴子' : '🧗 工人', `${m.m} kg`, P.blockFill, m.safe ? P.blue : P.crimson);
    if (s.showForces) {
      drawArrow(ropeX, climberY + 54, 0, 62, P.orange, `mg = ${m.W} N`, 2.8, false, { x: 0, y: 8 });
      if (m.safe && m.T > 1) {
        drawArrow(ropeX, climberY, 0, -62 * (m.T / m.W), P.teal, `T = ${fmt(m.T, 0)} N`, 2.8, false, { x: 0, y: -8 });
      }
      drawArrow(ropeX - 64, climberY + 26, 0, isDown ? 40 : -40, P.blue, `a=${fmt(m.a, 1)}`, 2.6);
    }

    // Tension Load Bar
    const barX = 305, barY = 125, barH = 290, barW = 34;
    ctx.fillStyle = P.blockFillAlt;
    ctx.strokeStyle = P.blockStroke;
    ctx.lineWidth = 1.6;
    ctx.fillRect(barX, barY, barW, barH);
    ctx.strokeRect(barX, barY, barW, barH);
    const maxScale = isDown ? 250 : 950;
    const fillH = Math.min(barH, (m.T / maxScale) * barH);
    ctx.fillStyle = m.safe ? P.teal : P.crimson;
    ctx.fillRect(barX + 2, barY + barH - fillH, barW - 4, fillH);
    const limY = barY + barH - (m.Tmax / maxScale) * barH;
    ctx.strokeStyle = P.crimson;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(barX - 10, limY); ctx.lineTo(barX + barW + 10, limY); ctx.stroke();
    ctx.fillStyle = P.crimson;
    ctx.font = '700 12px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`T_max=${m.Tmax}N`, barX + barW / 2, limY - 12);
    ctx.fillStyle = P.ink;
    ctx.fillText(`T=${fmt(m.T, 0)}N`, barX + barW / 2, barY + barH + 18);

    // Right Graph: T vs a
    drawGraphBox({
      x0: 470, y0: 445, w: 305, h: 310,
      title: isDown ? '下滑時張力 T = m(g − a) 隨加速度變化' : '上爬時張力 T = m(g + a) 隨加速度變化',
      xmin: 0, xmax: 10, ymin: 0, ymax: isDown ? 240 : 950,
      xlabel: 'a (m/s²)',
      ylabel: 'T (N)',
      curves: [
        {
          fn: av => isDown ? m.m * (10 - av) : m.m * (10 + av),
          color: P.teal, width: 3, label: isDown ? 'T = m(g−a)' : 'T = m(g+a)'
        }
      ],
      markers: [
        { x: m.a, y: m.T, color: m.safe ? P.teal : P.crimson, label: `T=${fmt(m.T, 0)}N` }
      ],
      vLines: [{ x: m.aLimit, label: isDown ? `最小 a=${fmt(m.aLimit, 1)}` : `最大 a=${fmt(m.aLimit, 1)}`, color: P.crimson }],
      hLines: [{ y: m.Tmax, label: `極限 T_max = ${m.Tmax} N`, color: P.crimson }]
    });
  }

  // ========================================================================
  // 4-2-4: 斜切雙木塊推力與正向力
  // ========================================================================
  else if (id === '4-2-4') {
    drawTopBanner(`N sinθ = (m_B / m總) F = ${fmt(m.FxB, 1)} N  ⟹  N = ${fmt(m.FxB, 1)} / sin(${m.thetaDeg}°) = ${fmt(m.N, 1)} N`, P.ink);

    const floorY = 235;
    drawSurface(24, floorY, 425, true, true);
    const shiftX = m.tAnim > 0 ? (m.tAnim * 35) % 80 : 0;

    // Wedge Cut Rectangle: A on left, B on right, cut slopes top-left to bottom-right making angle θ with horizontal
    const bx = 95 + shiftX, bw = 200, bh = 105, by = floorY - bh;
    const cutDx = Math.min(bw * 0.72, bh / Math.tan(m.theta));
    const topSplitX = bx + bw * 0.5 - cutDx * 0.5;
    const botSplitX = topSplitX + cutDx;

    // Draw A (left)
    ctx.save();
    ctx.fillStyle = P.blockFill;
    ctx.strokeStyle = P.blockStroke;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(bx, floorY);
    ctx.lineTo(botSplitX, floorY);
    ctx.lineTo(topSplitX, by);
    ctx.lineTo(bx, by);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw B (right)
    ctx.fillStyle = P.blockFillAlt;
    ctx.beginPath();
    ctx.moveTo(botSplitX, floorY);
    ctx.lineTo(bx + bw, floorY);
    ctx.lineTo(bx + bw, by);
    ctx.lineTo(topSplitX, by);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Angle θ arc at bottom split inside A (above the floor!)
    ctx.strokeStyle = P.orange;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(botSplitX, floorY, 26, Math.PI, Math.PI + m.theta, false);
    ctx.stroke();
    ctx.fillStyle = P.orange;
    ctx.font = '800 13px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`θ=${m.thetaDeg}°`, botSplitX - 30, floorY - 12);

    ctx.fillStyle = P.ink;
    ctx.font = '800 15px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('A', bx + 28, by + bh * 0.55);
    ctx.fillText('B', bx + bw - 34, by + bh * 0.42);
    ctx.restore();

    // Push F on left of A
    drawArrow(bx - 56, floorY - bh * 0.5, 52, 0, P.blue, `F=${m.F}N`, 3.2, false, { x: -46, y: -14 });

    // Lower Left: Isolated FBD of B showing N perpendicular to cut
    const fbdX = 165, fbdY = 415;
    ctx.fillStyle = P.cardBg;
    ctx.strokeStyle = P.blockStroke;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(26, 268, 390, 222, 12); ctx.fill(); ctx.stroke();
    ctx.fillStyle = P.ink;
    ctx.font = '800 13.5px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`B 木塊隔離受力正交分解（N 垂直切面 → 與鉛直夾 θ=${m.thetaDeg}°）`, 40, 290);

    // Draw mini B wedge in FBD
    ctx.save();
    ctx.fillStyle = P.blockFillAlt;
    ctx.strokeStyle = P.blockStroke;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(fbdX, fbdY + 35);
    ctx.lineTo(fbdX + 95, fbdY + 35);
    ctx.lineTo(fbdX + 95, fbdY - 35);
    ctx.lineTo(fbdX - 45, fbdY - 35);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    const cx = fbdX + 12, cy = fbdY + 2;
    const vecLen = 95;
    const vx = vecLen * m.sinT, vy = -vecLen * m.cosT;
    drawArrow(cx, cy, vx, vy, P.blue, `N=${fmt(m.N, 0)}N`, 3.2, false, { x: 8, y: -4 });
    if (s.showDecomp) {
      drawArrow(cx, cy, vx, 0, P.teal, `Nsinθ=${fmt(m.Nx, 0)}N`, 2.4, true, { x: 8, y: 12 });
      drawArrow(cx, cy, 0, vy, P.orange, `Ncosθ=${fmt(m.Ny, 0)}N`, 2.4, true, { x: -12, y: -8 });
      // Angle θ between vertical and N
      ctx.save();
      ctx.strokeStyle = P.orange;
      ctx.beginPath();
      ctx.arc(cx, cy, 28, -Math.PI / 2, -Math.PI / 2 + m.theta);
      ctx.stroke();
      ctx.fillStyle = P.orange;
      ctx.font = '700 12px "Noto Sans TC", sans-serif';
      ctx.fillText('θ', cx + 12, cy - 32);
      ctx.restore();
    }

    // Right Graph: N/F vs theta
    drawGraphBox({
      x0: 485, y0: 445, w: 290, h: 310,
      title: '正向力倍率 N / F 隨切面角度 θ 變化',
      xmin: 20, xmax: 85, ymin: 0, ymax: Math.max(2.5, m.nOverF * 1.15),
      xlabel: 'θ (°)',
      ylabel: 'N / F',
      curves: [
        {
          fn: deg => m.beta / Math.sin((deg * Math.PI) / 180),
          color: P.blue, width: 3, label: 'N/F = (m_B/m總)cscθ'
        }
      ],
      markers: [
        { x: m.thetaDeg, y: m.nOverF, color: P.orange, label: `${fmt(m.nOverF, 2)}F` }
      ],
      vLines: [
        { x: 30, label: '30°' },
        { x: 53, label: '53°' }
      ],
      hLines: [
        { y: m.beta, label: `極限 θ=90° → ${fmt(m.beta, 2)}F`, color: P.teal }
      ]
    });
  }

  // ========================================================================
  // 4-2-5: 側推夾緊木塊不落下
  // ========================================================================
  else if (id === '4-2-5') {
    drawTopBanner(
      m.holds
        ? `✅ F = ${m.F} N ≥ F_min (${fmt(m.Fmin, 0)} N) ：最大靜摩擦 ${fmt(m.fsMax, 1)} N 撐住重力 ${fmt(m.W, 1)} N！`
        : `⬇️ F = ${m.F} N ＜ F_min (${fmt(m.Fmin, 0)} N) ：f_s(max) = ${fmt(m.fsMax, 1)} N 不足支撐 ${fmt(m.W, 1)} N，懸空木塊下滑！`,
      m.holds ? P.emerald : P.crimson
    );

    const floorY = 275;
    drawSurface(24, floorY, 425, true, true);
    const dx = m.tAnim > 0 ? Math.min(130, 12 * m.a * m.tAnim * m.tAnim * 0.25) : 0;
    const fallDy = (!m.holds && m.tAnim > 0) ? Math.min(72, 10 * m.ayDown * m.tAnim * m.tAnim * 0.4) : 0;

    if (m.mode === 'two_blocks') {
      const x1 = 80 + dx, w1 = 96, h1 = 100;
      const x2 = x1 + w1, w2 = 64, h2 = 68;
      const y2 = floorY - h1 + 14 + fallDy;
      drawBlock(x1, floorY - h1, w1, h1, 'm₁=3kg', '貼地無摩擦', P.blockFill, P.blue);
      drawBlock(x2, y2, w2, h2, 'm₂=2kg', m.holds ? '夾緊不落' : '向下滑落!', P.blockFillAlt, m.holds ? P.teal : P.crimson);
      drawArrow(x1 - 52, floorY - h1 * 0.5, 48, 0, P.blue, `F=${m.F}N`, 3.2, false, { x: -42, y: -14 });
      if (s.showFBD) {
        drawArrow(x2 + w2, y2 + h2 * 0.5, 42, 0, P.blue, `N=${fmt(m.N, 0)}N`, 2.4, false, { x: 4, y: -12 });
        drawArrow(x2 + w2 / 2, y2 + h2, 0, 42, P.orange, `W=${fmt(m.W, 0)}N`, 2.6, false, { x: 0, y: 10 });
        drawArrow(x2, y2 + h2 * 0.5, 0, -42 * Math.min(1.4, m.fsMax / m.W), P.teal, `f≤${fmt(m.fsMax, 0)}N`, 2.6, false, { x: 0, y: -10 });
      }
    } else {
      // Three blocks 2m, m, 2m
      const x1 = 70 + dx, w1 = 62, h1 = 105;
      const xMid = x1 + w1, wMid = 52, hMid = 64;
      const x3 = xMid + wMid, w3 = 62, h3 = 105;
      const yMid = floorY - h1 + 12 + fallDy;
      drawBlock(x1, floorY - h1, w1, h1, '2m', '4 kg', P.blockFill, P.blue);
      drawBlock(xMid, yMid, wMid, hMid, 'm=2kg', m.holds ? '雙面夾緊' : '滑落!', P.blockFillAlt, m.holds ? P.teal : P.crimson);
      drawBlock(x3, floorY - h3, w3, h3, '2m', '4 kg', P.blockFill, P.blue);
      drawArrow(x1 - 50, floorY - h1 * 0.5, 46, 0, P.blue, `F=${m.F}N`, 3.2, false, { x: -40, y: -14 });
      if (s.showFBD) {
        drawArrow(xMid, yMid + hMid * 0.5, 0, -34 * Math.min(1.5, m.fsMax / m.W), P.teal, 'f₂', 2.4);
        drawArrow(xMid + wMid, yMid + hMid * 0.5, 0, -28 * Math.min(1.5, m.fsMax / m.W), P.teal, 'f₁', 2.4);
        drawArrow(xMid + wMid / 2, yMid + hMid, 0, 38, P.orange, `mg=${fmt(m.W, 0)}N`, 2.5);
      }
    }

    // Force Balance Meter at Bottom Left
    ctx.fillStyle = P.cardBg;
    ctx.strokeStyle = P.blockStroke;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(26, 335, 395, 145, 12); ctx.fill(); ctx.stroke();
    ctx.fillStyle = P.ink;
    ctx.font = '800 13.5px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`止滑條件檢核：最大靜摩擦力 μN_總 vs 懸空物重 W`, 42, 360);
    ctx.font = '700 13px "JetBrains Mono", "Noto Sans TC", sans-serif';
    ctx.fillStyle = P.teal;
    ctx.fillText(`最大向上摩擦力 f_s(max) = ${fmt(m.fsMax, 1)} N`, 42, 392);
    ctx.fillStyle = P.orange;
    ctx.fillText(`懸空木塊重力 W         = ${fmt(m.W, 1)} N`, 42, 418);
    ctx.fillStyle = m.holds ? P.emerald : P.crimson;
    ctx.fillText(`臨界最小推力 F_min     = ${fmt(m.Fmin, 1)} N`, 42, 448);

    // Right Graph
    drawGraphBox({
      x0: 485, y0: 445, w: 290, h: 310,
      title: '最大靜摩擦力 f_s(max) 隨推力 F 變化',
      xmin: 10, xmax: 220, ymin: 0, ymax: Math.max(60, m.W * 1.5, m.fsMax * 1.2),
      xlabel: '推力 F (N)',
      ylabel: '力 (N)',
      curves: [
        {
          fn: fv => m.mode === 'two_blocks' ? m.mu * (m.m2 / m.mTotal) * fv : m.mu * fv,
          color: P.teal, width: 3, label: 'f_s(max)'
        }
      ],
      markers: [
        { x: m.F, y: m.fsMax, color: m.holds ? P.emerald : P.crimson, label: `${fmt(m.fsMax, 1)}N` }
      ],
      vLines: [{ x: m.Fmin, label: `F_min=${fmt(m.Fmin, 0)}`, color: P.crimson }],
      hLines: [{ y: m.W, label: `需撐住重力 W=${fmt(m.W, 0)}N`, color: P.orange }]
    });
  }

  // ========================================================================
  // 4-2-6: 兩物重疊拉動
  // ========================================================================
  else if (id === '4-2-6') {
    const pullB = m.pullTarget === 'B';
    drawTopBanner(
      m.slips
        ? `⚡ F = ${m.F} N ＞ F_max (${fmt(m.Fmax, 1)} N) ：發生相對滑動！a_A=${fmt(m.aA, 2)} vs a_B=${fmt(m.aB, 2)} m/s²`
        : `✅ F = ${m.F} N ≤ F_max (${fmt(m.Fmax, 1)} N) ：A、B 相對靜止，合體加速度 a = ${fmt(m.aA, 2)} m/s²`,
      m.slips ? P.orange : P.emerald
    );

    const floorY = 232;
    drawSurface(24, floorY, 425, true, true);
    const xB = 72 + (m.tAnim > 0 ? Math.min(180, 7 * m.aB * m.tAnim * m.tAnim) : 0);
    const xA = 98 + (m.tAnim > 0 ? Math.min(220, 7 * m.aA * m.tAnim * m.tAnim) : 0);

    drawBlock(xB, floorY - 52, 136, 52, `B (M=${m.M}kg)`, `a_B=${fmt(m.aB, 2)}`, P.blockFill, P.blue);
    drawBlock(xA, floorY - 52 - 44, 76, 44, `A (m=${m.m}kg)`, `a_A=${fmt(m.aA, 2)}`, P.blockFillAlt, P.orange);

    if (pullB) {
      drawArrow(xB + 136, floorY - 26, 54, 0, P.blue, `F=${m.F}N`, 3.2, false, { x: 6, y: -12 });
    } else {
      drawArrow(xA + 76, floorY - 74, 54, 0, P.blue, `F=${m.F}N`, 3.2, false, { x: 6, y: -12 });
    }

    // Isolated FBD Box at bottom left
    if (s.showFBD) {
      ctx.fillStyle = P.cardBg;
      ctx.strokeStyle = P.blockStroke;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(24, 272, 398, 208, 12); ctx.fill(); ctx.stroke();
      ctx.fillStyle = P.ink;
      ctx.font = '800 13.5px "Noto Sans TC", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(pullB ? '隔離受力（拉 B → 被動木塊是上塊 A）' : '隔離受力（拉 A → 被動木塊是下塊 B）', 40, 294);

      drawBlock(74, 318, 82, 44, `A (m=${m.m})`, '', P.blockFillAlt, P.orange);
      drawBlock(58, 398, 120, 50, `B (M=${m.M})`, '', P.blockFill, P.blue);

      ctx.font = '700 12.5px "JetBrains Mono", "Noto Sans TC", sans-serif';
      if (pullB) {
        drawArrow(156, 340, 46, 0, P.teal, '', 2.6);
        ctx.fillStyle = P.teal; ctx.textAlign = 'left';
        ctx.fillText(`f=${fmt(m.f, 1)}N`, 160, 326);
        drawArrow(178, 423, 52, 0, P.blue, `F=${m.F}N`, 2.8);
        drawArrow(58, 423, -28, 0, P.teal, '', 2.4);
      } else {
        drawArrow(156, 340, 52, 0, P.blue, `F=${m.F}N`, 2.8);
        drawArrow(74, 340, -30, 0, P.teal, '', 2.4);
        ctx.fillStyle = P.teal; ctx.textAlign = 'right';
        ctx.fillText(`f=${fmt(m.f, 1)}N`, 70, 326);
        drawArrow(178, 423, 46, 0, P.teal, '', 2.6);
        ctx.fillStyle = P.teal; ctx.textAlign = 'left';
        ctx.fillText(`f=${fmt(m.f, 1)}N`, 182, 409);
      }
      ctx.fillStyle = P.sub;
      ctx.textAlign = 'left';
      ctx.font = '700 12px "JetBrains Mono", "Noto Sans TC", sans-serif';
      ctx.fillText(`上限 f_max = μmg = ${fmt(m.fsMax, 1)} N`, 256, 340);
      ctx.fillText(`極限 a_max = ${fmt(m.aMax, 2)} m/s²`, 256, 368);
      ctx.fillText(`極限 F_max = ${fmt(m.Fmax, 2)} N`, 256, 396);
    }

    // Right Graph: a_A and a_B vs F
    drawGraphBox({
      x0: 485, y0: 445, w: 290, h: 310,
      title: 'A、B 加速度隨拉力 F 變化（F > F_max 分叉）',
      xmin: 0, xmax: 60, ymin: 0, ymax: Math.max(8, m.aA * 1.15, m.aB * 1.15),
      xlabel: '拉力 F (N)',
      ylabel: 'a (m/s²)',
      curves: [
        {
          fn: fv => fv <= m.Fmax ? fv / (m.M + m.m) : (pullB ? m.fsMax / m.m : (fv - m.fsMax) / m.m),
          color: P.orange, width: 2.8, label: 'a_A (上塊)'
        },
        {
          fn: fv => fv <= m.Fmax ? fv / (m.M + m.m) : (pullB ? (fv - m.fsMax) / m.M : m.fsMax / m.M),
          color: P.blue, width: 2.8, label: 'a_B (下塊)', dash: [6, 3]
        }
      ],
      markers: [
        { x: m.F, y: m.aA, color: P.orange },
        { x: m.F, y: m.aB, color: P.blue }
      ],
      vLines: [{ x: m.Fmax, label: `F_max=${fmt(m.Fmax, 1)}`, color: P.crimson }]
    });
  }

  // ========================================================================
  // 4-2-7: 定滑輪移位與張力比
  // ========================================================================
  else if (id === '4-2-7') {
    drawTopBanner(`圖 1 平衡 T₁ = 3.00 mg  vs  圖 2 (${m.nL} vs ${m.nR}) 運動中 T₂ = ${fmt(m.T2 / 10, 3)} mg ＝ ${fmt(m.ratio, 4)} T₁`, P.ink);

    // Left panel: Fig 1 (3 vs 3)
    const p1x = 120, p1y = 115;
    drawSurface(45, 72, 195, false, true);
    drawPulley(p1x, p1y, 20, 'ceiling', 72);
    ctx.strokeStyle = P.teal;
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(p1x - 20, 215); ctx.lineTo(p1x - 20, p1y);
    ctx.arc(p1x, p1y, 20, Math.PI, 0);
    ctx.lineTo(p1x + 20, 215);
    ctx.stroke();

    for (let i = 0; i < 3; i++) {
      drawBlock(p1x - 36, 215 + i * 32, 32, 28, 'm', '', P.blockFill, P.teal);
      drawBlock(p1x + 4, 215 + i * 32, 32, 28, 'm', '', P.blockFill, P.teal);
    }
    ctx.fillStyle = P.teal;
    ctx.font = '800 13.5px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('圖 1：左 3 右 3 平衡', p1x, 358);
    ctx.fillText(`a₁ = 0 ｜ T₁ = 3.00 mg`, p1x, 380);

    // Middle panel: Fig 2 (nL vs nR)
    const p2x = 325, p2y = 115;
    drawSurface(245, 72, 405, false, true);
    drawPulley(p2x, p2y, 20, 'ceiling', 72);
    const shiftY = m.tAnim > 0 ? Math.max(-75, Math.min(75, 0.5 * m.a2 * 12 * m.tAnim * m.tAnim)) : 0;
    const leftTop = 210 + shiftY;
    const rightTop = 210 - shiftY;

    ctx.strokeStyle = P.blue;
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(p2x - 20, leftTop); ctx.lineTo(p2x - 20, p2y);
    ctx.arc(p2x, p2y, 20, Math.PI, 0);
    ctx.lineTo(p2x + 20, rightTop);
    ctx.stroke();

    for (let i = 0; i < m.nL; i++) {
      drawBlock(p2x - 36, leftTop + i * 30, 32, 26, 'm', '', P.blockFillAlt, P.blue);
    }
    for (let i = 0; i < m.nR; i++) {
      drawBlock(p2x + 4, rightTop + i * 30, 32, 26, 'm', '', P.blockFillAlt, P.orange);
    }
    drawArrow(p2x - 20, leftTop - 4, 0, -28 * (m.T2 / m.T1), P.blue, '', 2.6);
    drawArrow(p2x + 20, rightTop - 4, 0, -28 * (m.T2 / m.T1), P.blue, '', 2.6);
    ctx.fillStyle = P.blue;
    ctx.font = '800 12.5px "JetBrains Mono", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('T₂', p2x - 27, leftTop - 22);
    ctx.textAlign = 'left';
    ctx.fillText('T₂', p2x + 27, rightTop - 22);
    ctx.textAlign = 'center';

    ctx.fillStyle = P.blue;
    ctx.font = '800 13.5px "Noto Sans TC", sans-serif';
    ctx.fillText(`圖 2：左 ${m.nL} 右 ${m.nR}`, p2x, 395);
    ctx.fillText(`T₂ = ${fmt(m.T2 / 10, 2)} mg = ${fmt(m.ratio, 3)} T₁`, p2x, 417);

    // Right Graph: T2/T1 vs nL
    drawGraphBox({
      x0: 485, y0: 445, w: 290, h: 310,
      title: '張力倍率 T₂/T₁ = n_L(6 − n_L) / 9',
      xmin: 1, xmax: 5, ymin: 0, ymax: 1.15,
      xlabel: '左側木塊數 n_L',
      ylabel: 'T₂ / T₁',
      curves: [
        { fn: n => (n * (6 - n)) / 9, color: P.blue, width: 3, label: '對稱拋物線（3:3最高）' }
      ],
      markers: [
        { x: m.nL, y: m.ratio, color: P.orange, label: `${fmt(m.ratio, 3)}` }
      ],
      vLines: [
        { x: 3, label: 'n_L=3 (1.0)', color: P.teal },
        { x: 4, label: 'n_L=4 (8/9)', color: P.orange }
      ]
    });
  }

  // ========================================================================
  // 4-2-8: 動滑輪系統 (T_A = 2T_B, a_2 = 2a_1)
  // ========================================================================
  else if (id === '4-2-8') {
    drawTopBanner(
      `a₁ = ${fmt(m.a1 / m.g, 3)} g ${m.a1 >= 0 ? '↑' : '↓'}   ｜   a₂ = 2a₁ = ${fmt(m.a2 / m.g, 3)} g ${m.a2 >= 0 ? '↓' : '↑'}   ｜   T_A = ${fmt(m.TA, 1)} N ＝ 2 T_B (${fmt(m.TB, 1)} N)`,
      P.ink
    );

    const ceilY = 74;
    drawSurface(40, ceilY, 390, false, true);

    const fixedY = 120;
    const rawDy1 = m.tAnim > 0 ? 12 * m.a1 * m.tAnim * m.tAnim : 0;
    const dy1 = Math.max(-55, Math.min(55, rawDy1)); // positive => m1 goes UP
    const dy2 = 2 * dy1; // positive => m2 goes DOWN

    const aX = 135, rM = 20, fx = aX + 2 * rM + 18; // fx = 193
    const movCx = aX + rM; // 155
    const movCy = 215 - dy1;
    const m1Y = movCy + 78;
    const m2Y = 235 + dy2;

    // Fixed Pulley on right
    drawPulley(fx, fixedY, 18, 'ceiling', ceilY);
    // Movable Pulley on left
    drawPulley(movCx, movCy, rM, 'none', 0);

    // Continuous Rope B: ceiling(aX) -> under movPulley -> up to left of fixedPulley -> over -> down to m2
    ctx.strokeStyle = P.blue;
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(aX, ceilY);
    ctx.lineTo(aX, movCy);
    ctx.arc(movCx, movCy, rM, Math.PI, 0, true);
    ctx.lineTo(fx - 18, fixedY);
    ctx.arc(fx, fixedY, 18, Math.PI, 0, false);
    ctx.lineTo(fx + 18, m2Y);
    ctx.stroke();

    // Rope A: from center of movable pulley down to m1
    ctx.strokeStyle = P.teal;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(movCx, movCy);
    ctx.lineTo(movCx, m1Y);
    ctx.stroke();

    drawBlock(movCx - 30, m1Y, 60, 44, `m₁=${m.m1}`, `a₁=${fmt(m.a1, 1)}`, P.blockFillAlt, P.teal);
    drawBlock(fx + 18 - 28, m2Y, 56, 44, `m₂=${m.m2}`, `a₂=${fmt(m.a2, 1)}`, P.blockFill, P.orange);

    drawArrow(movCx - 10, m1Y - 6, 0, -24, P.teal, '', 2.4);
    ctx.fillStyle = P.teal;
    ctx.font = '800 13.5px "JetBrains Mono", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('A', movCx - 16, m1Y - 16);
    drawArrow(fx + 28, m2Y - 12, 0, -22, P.blue, 'B', 2.4);

    if (s.showPulleyFBD) {
      ctx.fillStyle = P.cardBg;
      ctx.strokeStyle = P.blockStroke;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(24, 388, 392, 92, 10); ctx.fill(); ctx.stroke();
      ctx.fillStyle = P.ink;
      ctx.font = '800 13px "Noto Sans TC", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('動滑輪力學＆運動學雙約束：', 40, 412);
      ctx.fillStyle = P.teal;
      ctx.fillText(`• 質量不計：向上 2T_B = 向下 T_A  (T_A = ${fmt(m.TA, 1)} N)`, 40, 438);
      ctx.fillStyle = P.orange;
      ctx.fillText(`• 繩長不變：m₁ 上升 Δy → m₂ 下降 2Δy  (a₂ = 2a₁)`, 40, 462);
    }

    // Right Graph: a1/g and a2/g vs m1/m2
    drawGraphBox({
      x0: 485, y0: 445, w: 290, h: 310,
      title: '加速度 (a/g) 隨質量比 m₁/m₂ 變化',
      xmin: 0, xmax: Math.max(3.5, (m.m1 / m.m2) * 1.15), ymin: -0.6, ymax: 1.0,
      xlabel: 'm₁ / m₂',
      ylabel: 'a / g',
      curves: [
        { fn: r => (2 - r) / (r + 4), color: P.teal, width: 2.8, label: 'a₁/g (m₁向上)' },
        { fn: r => (4 - 2 * r) / (r + 4), color: P.orange, width: 2.8, label: 'a₂/g = 2a₁/g', dash: [5, 3] }
      ],
      markers: [
        { x: m.m1 / m.m2, y: m.a1 / m.g, color: P.teal, label: `a₁=${fmt(m.a1 / m.g, 2)}g` },
        { x: m.m1 / m.m2, y: m.a2 / m.g, color: P.orange, label: `a₂=${fmt(m.a2 / m.g, 2)}g` }
      ],
      vLines: [{ x: 2.0, label: '平衡 m₁=2m₂', color: P.crimson }]
    });
  }

  // ========================================================================
  // 4-2-9: 人與平台三股繩系統
  // ========================================================================
  else if (id === '4-2-9') {
    drawTopBanner(
      m.detaches
        ? `⚠️ 警告：2m (${2 * m.m}) < M (${m.M})，正向力 N = 0！人會自己向上爬繩，無法拉起平台！`
        : `✅ 3T = (M+m)(g+a) ⟹ 施力 T = ${fmt(m.T, 1)} N  ｜  正向力 N = ${fmt(m.N, 1)} N`,
      m.detaches ? P.crimson : P.ink
    );

    const ceilY = 74;
    drawSurface(60, ceilY, 390, false, true);

    const riseY = (!m.detaches && m.tAnim > 0) ? Math.min(70, 8 * (m.a + 1.5) * m.tAnim * m.tAnim * 0.4) : 0;
    const topFixedX = 275, topFixedY = 115, rTop = 20;
    const rMov = 16;
    const movX = topFixedX - rTop - rMov; // 239 -> middle strand strictly vertical at x=255
    const movY = 235 - riseY;
    const platTopY = movY + 42;
    const platBotY = platTopY + 125;

    // 3 strands:
    // 1) left of movPulley up to ceiling anchor (x = 223)
    // 2) right of movPulley up to left edge of topFixed (x = 255)
    // 3) right edge of topFixed down to person's hand (x = 295)
    ctx.strokeStyle = P.blue;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(movX - rMov, ceilY);
    ctx.lineTo(movX - rMov, movY);
    ctx.arc(movX, movY, rMov, Math.PI, 0, true);
    ctx.lineTo(topFixedX - rTop, topFixedY);
    ctx.arc(topFixedX, topFixedY, rTop, Math.PI, 0, false);
    ctx.lineTo(topFixedX + rTop, platBotY - 56);
    ctx.stroke();

    drawPulley(topFixedX, topFixedY, rTop, 'ceiling', ceilY);
    drawPulley(movX, movY, rMov, 'none', 0);

    // Triangular platform
    ctx.save();
    ctx.strokeStyle = P.blockStroke;
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(movX, movY + rMov + 2);
    ctx.lineTo(movX, platTopY);
    ctx.lineTo(movX - 88, platBotY);
    ctx.lineTo(movX + 88, platBotY);
    ctx.lineTo(movX, platTopY);
    ctx.stroke();
    ctx.fillStyle = P.blockFill;
    ctx.fillRect(movX - 92, platBotY, 184, 12);
    ctx.strokeRect(movX - 92, platBotY, 184, 12);
    ctx.restore();

    // Person on platform
    const px = topFixedX + rTop;
    const pBot = platBotY - (m.detaches && m.tAnim > 0 ? Math.min(40, 25 * m.tAnim) : 0);
    drawBlock(px - 20, pBot - 68, 40, 68, `人`, `${m.m}kg`, P.blockFillAlt, m.detaches ? P.crimson : P.teal);
    ctx.fillStyle = P.ink;
    ctx.font = '800 13px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`平台 M = ${m.M} kg`, movX, platBotY + 28);

    // System Dashed Box (3 strands T)
    if (s.showSystemBox) {
      ctx.save();
      ctx.strokeStyle = P.orange;
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(movX - 102, movY - 38, 204, platBotY - movY + 75);
      ctx.restore();
      drawArrow(movX - rMov, movY - 40, 0, -28, P.blue, 'T', 2.4);
      drawArrow(movX + rMov, movY - 40, 0, -28, P.blue, 'T', 2.4);
      drawArrow(topFixedX + rTop, movY - 40, 0, -28, P.blue, 'T', 2.4);
      ctx.fillStyle = P.cardBg;
      ctx.strokeStyle = P.orange;
      ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.roundRect(24, 134, 174, 48, 8); ctx.fill(); ctx.stroke();
      ctx.fillStyle = P.orange;
      ctx.font = '800 12px "Noto Sans TC", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('系統虛線框切斷 3 股繩', 111, 154);
      ctx.fillText('向上總拉力 = 3T', 111, 172);
    }

    // Right Graph: T and N vs person mass m
    drawGraphBox({
      x0: 485, y0: 445, w: 290, h: 310,
      title: '施力 T 與正向力 N 隨人體重 m 變化',
      xmin: 15, xmax: 100, ymin: 0, ymax: Math.max(1000, m.T * 1.25),
      xlabel: '人質量 m (kg)',
      ylabel: '力 (N)',
      curves: [
        { fn: mv => ((m.M + mv) * (m.g + m.a)) / 3, color: P.blue, width: 2.8, label: '施力 T = (M+m)(g+a)/3' },
        { fn: mv => Math.max(0, ((2 * mv - m.M) * (m.g + m.a)) / 3), color: P.teal, width: 2.8, label: '正向力 N' }
      ],
      markers: [
        { x: m.m, y: m.T, color: P.blue, label: `T=${fmt(m.T, 0)}N` },
        { x: m.m, y: m.N, color: m.detaches ? P.crimson : P.teal, label: `N=${fmt(m.N, 0)}N` }
      ],
      vLines: [{ x: m.M / 2, label: `臨界 m=M/2=${fmt(m.M / 2, 0)}kg`, color: P.crimson }]
    });
  }

  // ========================================================================
  // 4-2-10: 加速電梯內的視重與 v-t 梯形面積
  // ========================================================================
  else if (id === '4-2-10') {
    drawTopBanner(
      `t = ${fmt(m.t, 1)} s  ｜  視重 N = ${fmt(m.NcurKg, 0)} kgw  ｜  v = ${fmt(m.v, 2)} m/s  ｜  已上升 ${fmt(m.y, 2)} m（總計 ${fmt(m.yTotal, 1)} m）`,
      P.ink
    );

    // Left: Elevator shaft (0m at bottom y=460, 140m at top y=82)
    const shaftX = 52, shaftW = 172, shaftTop = 82, shaftBot = 462;
    ctx.fillStyle = P.blockFillAlt;
    ctx.strokeStyle = P.blockStroke;
    ctx.lineWidth = 2;
    ctx.fillRect(shaftX, shaftTop, shaftW, shaftBot - shaftTop);
    ctx.strokeRect(shaftX, shaftTop, shaftW, shaftBot - shaftTop);

    // Height ticks
    const maxYScale = Math.max(110, m.yTotal * 1.12);
    ctx.fillStyle = P.sub;
    ctx.font = '600 11px "JetBrains Mono", sans-serif';
    ctx.textAlign = 'right';
    for (let hy = 0; hy <= 100; hy += 25) {
      const py = shaftBot - 45 - (hy / maxYScale) * (shaftBot - shaftTop - 80);
      ctx.fillText(`${hy}m`, shaftX - 6, py + 3);
      ctx.strokeStyle = P.grid;
      ctx.beginPath(); ctx.moveTo(shaftX, py); ctx.lineTo(shaftX + shaftW, py); ctx.stroke();
    }

    const cabH = 92;
    const cabY = shaftBot - cabH - (m.y / maxYScale) * (shaftBot - shaftTop - cabH - 12);
    // Cable
    ctx.strokeStyle = P.sub;
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(shaftX + shaftW / 2, shaftTop); ctx.lineTo(shaftX + shaftW / 2, cabY); ctx.stroke();

    // Cab box
    ctx.fillStyle = P.cardBg;
    ctx.strokeStyle = P.blue;
    ctx.lineWidth = 2.6;
    ctx.beginPath(); ctx.roundRect(shaftX + 10, cabY, shaftW - 20, cabH, 6); ctx.fill(); ctx.stroke();

    // Scale & Person inside cab
    const cx = shaftX + shaftW / 2;
    drawBlock(cx - 28, cabY + cabH - 16, 56, 12, '', '', P.teal, P.teal);
    drawBlock(cx - 18, cabY + cabH - 72, 36, 56, '60kg', '', P.blockFillAlt, P.orange);

    // Force vectors on person (all labels safely inside cab box)
    drawArrow(cx - 25, cabY + cabH - 22, 0, -34 * (m.NcurKg / 60), P.teal, '', 2.4);
    ctx.fillStyle = P.teal;
    ctx.font = '700 11px "JetBrains Mono", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`N=${fmt(m.NcurKg, 0)}`, cx - 30, cabY + cabH - 42);
    drawArrow(cx + 25, cabY + cabH - 54, 0, 34, P.orange, '', 2.4);
    ctx.fillStyle = P.orange;
    ctx.textAlign = 'left';
    ctx.fillText('mg=60', cx + 30, cabY + cabH - 34);

    // Middle: Spring Scale Dial Gauge
    const gx = 320, gy = 185, gr = 68;
    ctx.save();
    ctx.beginPath(); ctx.arc(gx, gy, gr, 0, Math.PI * 2);
    ctx.fillStyle = P.cardBg; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = P.blockStroke; ctx.stroke();

    // Gauge ticks (30 to 90 kg)
    for (let kg = 30; kg <= 90; kg += 6) {
      const ang = Math.PI * 0.75 + ((kg - 30) / 60) * Math.PI * 1.5;
      ctx.strokeStyle = kg === 60 ? P.orange : P.sub;
      ctx.lineWidth = kg === 60 ? 2.5 : 1.2;
      ctx.beginPath();
      ctx.moveTo(gx + (gr - 10) * Math.cos(ang), gy + (gr - 10) * Math.sin(ang));
      ctx.lineTo(gx + gr * Math.cos(ang), gy + gr * Math.sin(ang));
      ctx.stroke();
    }
    const needleAng = Math.PI * 0.75 + ((m.NcurKg - 30) / 60) * Math.PI * 1.5;
    ctx.strokeStyle = P.crimson;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.lineTo(gx + (gr - 16) * Math.cos(needleAng), gy + (gr - 16) * Math.sin(needleAng));
    ctx.stroke();
    ctx.fillStyle = P.ink;
    ctx.font = '800 16px "JetBrains Mono", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${fmt(m.NcurKg, 0)} kg`, gx, gy + 44);
    ctx.font = '700 13px "Noto Sans TC", sans-serif';
    ctx.fillText('電梯內磅秤讀數', gx, gy + gr + 22);
    ctx.fillStyle = m.aCur > 0 ? P.emerald : m.aCur < 0 ? P.crimson : P.teal;
    ctx.fillText(m.aCur > 0 ? '▲ 超重 (向上加速)' : m.aCur < 0 ? '▼ 失重 (向上減速)' : '● 等重 (等速上升)', gx, gy + gr + 44);
    ctx.restore();

    // Bottom middle summary box
    ctx.fillStyle = P.cardBg;
    ctx.strokeStyle = P.blockStroke;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(236, 336, 174, 126, 10); ctx.fill(); ctx.stroke();
    ctx.fillStyle = P.ink;
    ctx.font = '800 12.5px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('梯形三段位移分解：', 248, 358);
    ctx.fillStyle = P.sub;
    ctx.font = '600 12px "JetBrains Mono", "Noto Sans TC", sans-serif';
    const d1 = 0.5 * m.a1 * 25;
    const d2 = m.vmax * 5;
    ctx.fillText(`0~5s：   ${fmt(d1, 1)} m`, 248, 384);
    ctx.fillText(`5~10s：  ${fmt(d2, 1)} m`, 248, 408);
    ctx.fillText(`10~15s： ${fmt(d1, 1)} m`, 248, 432);
    ctx.fillStyle = P.teal;
    ctx.fillText(`總面積： ${fmt(m.yTotal, 1)} m`, 248, 452);

    // Right Graph: v-t trapezoid with shaded progress area
    if (s.showVT) {
      const gx0 = 468, gy0 = 435, gw = 310, gh = 290;
      const maxV = Math.max(12, m.vmax * 1.25);
      const vtFn = tv => tv <= 5 ? m.a1 * tv : tv <= 10 ? m.vmax : m.vmax - m.a1 * (tv - 10);

      drawGraphBox({
        x0: gx0, y0: gy0, w: gw, h: gh,
        title: '電梯速度 v(t) 梯形圖（面積 = 上升距離）',
        xmin: 0, xmax: 15, ymin: 0, ymax: maxV,
        xlabel: '時間 t (s)',
        ylabel: 'v (m/s)',
        fillArea: { to: m.t, fn: vtFn },
        curves: [
          {
            fn: vtFn,
            color: P.blue, width: 3, label: `v_max=${fmt(m.vmax, 1)} m/s`
          }
        ],
        markers: [
          { x: m.t, y: m.v, color: P.teal, label: `y=${fmt(m.y, 1)}m` }
        ],
        vLines: [
          { x: 5, label: '5s' },
          { x: 10, label: '10s' },
          { x: 15, label: '15s' }
        ]
      });
    }
  }

  ctx.restore();
}
