/* ==========================================================================
   12-2 電場與電力線｜互動模擬與漸進式解說引擎（Gemini版）
   ========================================================================== */
'use strict';

function computePhysics(id, s) {
  if (id === '12-2-1') {
    const x = Number(s.x);
    const sign = Number(s.sign ?? 1);
    const r2 = 1 + x * x;
    const r = Math.sqrt(r2);
    const den = r2 * r;
    const eSingle = 1 / r2;
    const cosT = x / r;
    const sinT = 1 / r;
    // Upper charge at (0, +L) is always +q -> pushes P(x,0) right (+x) and down (-y)
    const ex1 = x / den;
    const ey1 = -1 / den;
    // Lower charge at (0, -L) has sign (+1 or -1) -> if +q pushes right (+x) and up (+y)
    const ex2 = sign * x / den;
    const ey2 = sign * 1 / den;
    const ex = ex1 + ex2;
    const ey = ey1 + ey2;
    const emag = Math.hypot(ex, ey);
    const thetaDeg = Math.atan2(1, x) * 180 / Math.PI;
    return { x, sign, r, eSingle, cosT, sinT, ex1, ey1, ex2, ey2, ex, ey, emag, thetaDeg };
  }

  if (id === '12-2-2') {
    const z = Number(s.z);
    const phi = Number(s.phi ?? 35);
    const r = Math.sqrt(1 + z * z);
    const cosT = z / r;
    const sinT = 1 / r;
    const ez = z / Math.pow(1 + z * z, 1.5);
    const ePoint = z > 0.15 ? 1 / (z * z) : null;
    const thetaDeg = Math.atan2(1, z) * 180 / Math.PI;
    return { z, phi, r, cosT, sinT, ez, ePoint, thetaDeg };
  }

  if (id === '12-2-3') {
    const r = Number(s.r);
    const q1 = Number(s.q1);
    const q2 = Number(s.q2);
    const boundary = [1, 2, 3].find(b => Math.abs(r - b) < 0.025);
    let regionIdx = 1;
    let regionName = '(1) 內球金屬內部 (r < a)';
    let qEnc = 0;
    let eVal = 0;
    if (r < 1) {
      regionIdx = 1;
      regionName = '(1) 內球金屬內部 (r < a)';
      qEnc = 0;
      eVal = 0;
    } else if (r < 2) {
      regionIdx = 2;
      regionName = '(2) 球與殼間空隙 (a < r < b)';
      qEnc = q1;
      eVal = q1 / (r * r);
    } else if (r < 3) {
      regionIdx = 3;
      regionName = '(3) 球殼金屬內部 (b < r < c)';
      qEnc = 0;
      eVal = 0;
    } else {
      regionIdx = 4;
      regionName = '(4) 球殼外部空間 (r > c)';
      qEnc = q1 + q2;
      eVal = (q1 + q2) / (r * r);
    }
    return {
      r, q1, q2, boundary, regionIdx, regionName,
      qEnc, eVal, absE: Math.abs(eVal),
      qa: q1, qbInner: -q1, qcOuter: q1 + q2
    };
  }

  if (id === '12-2-4') {
    const E = Number(s.E);
    const d = Number(s.d);
    const m = Number(s.m);
    const frac = Math.max(0, Math.min(1, Number(s.fraction ?? 0)));
    const a = E / m;
    const tTotal = Math.sqrt(2 * d / a);
    const vFinal = Math.sqrt(2 * a * d);
    const tCur = frac * tTotal;
    const vCur = frac * vFinal;
    const xCur = d * frac * frac;
    const workCur = E * xCur;
    const workTotal = E * d;
    return { E, d, m, frac, a, tTotal, vFinal, tCur, vCur, xCur, workCur, workTotal };
  }

  if (id === '12-2-5') {
    const d = Number(s.d);
    const Q = Number(s.Q);
    const pos = Boolean(s.positiveExt);
    const fieldMode = s.fieldMode || 'all';
    const eMag = Q / (d * d);
    // If left charge is -Q (pos=false): E_ext points left (-1), E_ind points right (+1)
    // If left charge is +Q (pos=true): E_ext points right (+1), E_ind points left (-1)
    const extDir = pos ? 1 : -1;
    const indDir = -extDir;
    return { d, Q, pos, fieldMode, eMag, extDir, indDir };
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
      const lesson = LESSONS_12_2.find(l => l.id === lessonId);
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

function fmt(n, digits = 3) {
  if (Math.abs(n) < 1e-7) return (0).toFixed(digits);
  return Number(n).toFixed(digits);
}

function renderCatalogPage() {
  const container = document.getElementById('catalog-cards');
  if (!container) return;
  container.innerHTML = LESSONS_12_2.map(l => `
    <a class="lesson-card" href="${l.id}.html">
      <div class="lesson-card-top">
        <div class="lesson-card-meta">
          <span class="ex-num-pill">12-2 例題 ${l.n}</span>
          <span class="page-ref-tag">教材頁碼 p.${l.page} · Gemini版</span>
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
  `).join('');
  typesetMath(container);
}

function renderLessonPage(lesson) {
  const idx = LESSONS_12_2.indexOf(lesson);
  const prevLesson = idx > 0 ? LESSONS_12_2[idx - 1] : null;
  const nextLesson = idx < LESSONS_12_2.length - 1 ? LESSONS_12_2[idx + 1] : null;

  const root = document.getElementById('lesson-app');
  if (!root) return;

  // Build HTML with Problem Directly Visible & Guidance/Solution Initially Hidden
  root.innerHTML = `
    <div class="page-header">
      <div class="eyebrow-row">
        <span class="chapter-tag">${lesson.section} · 例題 ${lesson.n} / 5</span>
        <span class="gemini-badge">✨ Gemini版 互動物理實驗室</span>
        <span class="page-ref-tag">教材頁碼 ${lesson.page}</span>
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
          <h2>🔬 互動式物理模擬與即時函數圖</h2>
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
          <p>先在上方模擬器觀察向量變化與物理規律，再依學習需求點選下方按鈕開啟「解題引導」、「詳細推導」或「最終答案」。</p>
        </div>
        <button type="button" class="btn" id="btn-toggle-all" aria-expanded="false">🔓 一鍵展開全部解析</button>
      </div>

      <div class="toggle-buttons-bar">
        <button type="button" class="reveal-toggle-btn" id="btn-toggle-guide" data-target="guide-section" aria-expanded="false">
          <div class="reveal-btn-top">
            <span>💡 解題引導與思考提示</span>
            <span class="reveal-status-pill" id="status-guide">點選開啟 ▼</span>
          </div>
          <span class="reveal-btn-desc">3 階漸進式問題引導，不直接破梗，帶你抓出關鍵方向</span>
        </button>

        <button type="button" class="reveal-toggle-btn" id="btn-toggle-solution" data-target="solution-section" aria-expanded="false">
          <div class="reveal-btn-top">
            <span>📖 詳細解說與完整推導</span>
            <span class="reveal-status-pill" id="status-solution">點選開啟 ▼</span>
          </div>
          <span class="reveal-btn-desc">完整數學步驟、向量分解推導與模擬器連動驗證</span>
        </button>

        <button type="button" class="reveal-toggle-btn" id="btn-toggle-answer" data-target="answer-section" aria-expanded="false">
          <div class="reveal-btn-top">
            <span>🎯 最終答案與選項核對</span>
            <span class="reveal-status-pill" id="status-answer">點選開啟 ▼</span>
          </div>
          <span class="reveal-btn-desc">原題各小題最終答案與各選項正確／錯誤原因剖析</span>
        </button>

        <button type="button" class="reveal-toggle-btn" id="btn-toggle-quiz" data-target="quiz-section" aria-expanded="false">
          <div class="reveal-btn-top">
            <span>🧠 易錯陷阱與觀念自測</span>
            <span class="reveal-status-pill" id="status-quiz">點選開啟 ▼</span>
          </div>
          <span class="reveal-btn-desc">段考最常見迷思診斷＋2 題互動式延伸思考問答</span>
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
        <h2>🧠 易錯陷阱診斷與延伸觀念自測</h2>
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
        : `<a class="btn" href="index.html">← 返回 12-2 電場例題總覽</a>`
      }
      <a class="btn" href="index.html">📚 12-2 全部 5 題目錄</a>
      ${nextLesson
        ? `<a class="btn primary" href="${nextLesson.id}.html">下一題：例題 ${nextLesson.n}（${nextLesson.title}） →</a>`
        : `<a class="btn primary" href="index.html">🎉 完成全部 5 題，返回總覽 →</a>`
      }
    </nav>
  `;

  typesetMath(root);

  // Initialize Simulation State
  const state = {};
  const resetToDefaults = () => {
    (lesson.selects || []).forEach(sel => { state[sel.id] = sel.defaultVal; });
    (lesson.controls || []).forEach(c => { state[c.id] = c.defaultVal; });
    (lesson.toggles || []).forEach(t => { state[t.id] = t.defaultVal; });
  };
  resetToDefaults();

  let playing = false;
  let animPhase = 0;
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
        if (c.id === 'fraction') {
          out.textContent = Math.round(state[c.id] * 100) + '%';
        } else if (c.id === 'phi') {
          out.textContent = Math.round(state[c.id]) + '°';
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
    if (lesson.id === '12-2-1') {
      items = [
        ['觀察點位置 x / L', `${fmt(m.x, 2)} L （夾角 θ = ${fmt(m.thetaDeg, 1)}°）`],
        ['單一電荷場強 |E₁| = |E₂|', `${fmt(m.eSingle)} kq/L²`],
        ['水平合電場 Eₓ', `${fmt(m.ex)} kq/L²`],
        ['鉛直合電場 Eᵧ', `${fmt(m.ey)} kq/L²`],
        ['合成總電場 |E合|', `${fmt(m.emag)} kq/L² （${m.sign === 1 ? '向右 +x' : '向下 −y'}）`]
      ];
    } else if (lesson.id === '12-2-2') {
      items = [
        ['軸上位置 z / R', `${fmt(m.z, 2)} R （斜邊 r = ${fmt(m.r, 2)} R）`],
        ['軸向夾角 θ 與投影因子 cosθ', `θ = ${fmt(m.thetaDeg, 1)}°，cosθ = ${fmt(m.cosT, 3)}`],
        ['圓環軸向合電場 E(z)', `${fmt(m.ez, 4)} kQ/R² （沿 +z 軸向外）`],
        ['原題 z = √3 R 精確值', `√3 / 8 ≈ 0.2165 kQ/R²`]
      ];
    } else if (lesson.id === '12-2-3') {
      items = [
        ['目前觀察區間', m.boundary ? `表面邊界 r = ${m.boundary}a（電場跳躍）` : m.regionName],
        ['高斯球面包圍淨電量 Q包圍', `${fmt(m.qEnc, 2)} q₀`],
        ['該處電場強度 E(r)', m.boundary ? '表面內外極限不連續' : `${fmt(m.absE, 3)} kq₀/a² ${m.eVal > 0 ? '（向外）' : m.eVal < 0 ? '（向內）' : '（零電場）'}`],
        ['三表面電量 (a / b內 / c外)', `${fmt(m.qa, 1)} / ${fmt(m.qbInner, 1)} / ${fmt(m.qcOuter, 1)} q₀`]
      ];
    } else if (lesson.id === '12-2-4') {
      items = [
        ['恆定加速度 a = qE / m', `${fmt(m.a, 2)} a₀ （向右朝正電板）`],
        ['抵達正板末速 v = √(2qEd/m)', `${fmt(m.vFinal, 3)} v₀`],
        ['總飛行時間 t = √(2dm/qE)', `${fmt(m.tTotal, 3)} t₀`],
        ['目前狀態 (t / x / v)', `t=${fmt(m.tCur, 2)} ｜ x=${fmt(m.xCur, 2)}d₀ ｜ v=${fmt(m.vCur, 2)}`]
      ];
    } else if (lesson.id === '12-2-5') {
      items = [
        ['外電荷距離 d / R', `${fmt(m.d, 2)} R （外電荷：${m.pos ? '+Q' : '−Q'}）`],
        ['外電荷在球心 O 的 E外', `${fmt(m.eMag, 3)} kQ₀/R² （方向：${m.extDir < 0 ? '向左 ←' : '向右 →'}）`],
        ['球殼感應電荷在 O 的 E感應', `${fmt(m.eMag, 3)} kQ₀/R² （方向：${m.indDir > 0 ? '向右 →' : '向左 ←'}）`],
        ['球心 O 點合成總電場 E總', `0 （E外 + E感應 = 0 靜電屏蔽）`]
      ];
    }

    metricsEl.innerHTML = items.map(it => `
      <div class="metric-box">
        <span class="m-label">${it[0]}</span>
        <strong class="m-val">${it[1]}</strong>
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

  // Bind control events
  (lesson.selects || []).forEach(sel => {
    const el = document.getElementById('ctrl-' + sel.id);
    if (el) {
      el.addEventListener('change', e => {
        state[sel.id] = e.target.value;
        renderAll();
      });
    }
  });

  (lesson.controls || []).forEach(c => {
    const el = document.getElementById('ctrl-' + c.id);
    if (el) {
      el.addEventListener('input', e => {
        if (c.id !== 'phi') pauseAnim();
        state[c.id] = Number(e.target.value);
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

  // Presets
  document.querySelectorAll('[data-preset-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      pauseAnim();
      const p = lesson.presets[Number(btn.dataset.presetIdx)];
      if (p && p.state) Object.assign(state, p.state);
      renderAll();
    });
  });

  // Step preset actions inside Detailed Solution
  document.querySelectorAll('[data-step-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      pauseAnim();
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
      if (lesson.id === '12-2-4' && state.fraction >= 0.995) {
        state.fraction = 0;
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
    animPhase += dt;

    if (lesson.id === '12-2-1') {
      const u = (1 - Math.cos(animPhase * 0.85)) / 2;
      state.x = Number((0.05 + 2.85 * u).toFixed(3));
    } else if (lesson.id === '12-2-2') {
      state.phi = (Number(state.phi) + dt * 95) % 360;
      const u = (1 - Math.cos(animPhase * 0.55)) / 2;
      state.z = Number((0.05 + 2.85 * u).toFixed(3));
    } else if (lesson.id === '12-2-3') {
      const u = (1 - Math.cos(animPhase * 0.65)) / 2;
      state.r = Number((0.15 + 4.2 * u).toFixed(3));
    } else if (lesson.id === '12-2-4') {
      const m = computePhysics(lesson.id, state);
      state.fraction = Math.min(1, Number(state.fraction) + dt * 0.65 / m.tTotal);
      if (state.fraction >= 1) pauseAnim();
    } else if (lesson.id === '12-2-5') {
      const u = (1 - Math.cos(animPhase * 0.8)) / 2;
      state.d = Number((1.4 + 2.3 * u).toFixed(3));
    }

    renderAll();
    if (playing) requestAnimationFrame(tickAnim);
  }

  // Interactive Pointer Dragging on Canvas
  setupCanvasDragging(canvas, lesson.id, state, pauseAnim, renderAll);

  // =========================================================================
  // Progressive Disclosure Controls (Hidden by default -> Click to open)
  // =========================================================================
  const sectionMap = {
    'guide-section': { btnId: 'btn-toggle-guide', statusId: 'status-guide', label: '解題引導' },
    'solution-section': { btnId: 'btn-toggle-solution', statusId: 'status-solution', label: '詳細解說' },
    'answer-section': { btnId: 'btn-toggle-answer', statusId: 'status-answer', label: '最終答案' },
    'quiz-section': { btnId: 'btn-toggle-quiz', statusId: 'status-quiz', label: '觀念自測' }
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
        // Also expand all individual hints when opening all
        lesson.hints.forEach((_, idx) => setHintOpen(idx, true));
      }
    });
  }

  // Individual Hint Card Toggles
  function setHintOpen(idx, open) {
    const body = document.getElementById(`hint-body-${idx}`);
    const pill = document.getElementById(`hint-pill-${idx}`);
    const header = document.querySelector(`[data-hint-toggle="${idx}"]`);
    if (!body) return;
    body.hidden = !open;
    if (header) header.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (pill) pill.textContent = open ? '點擊收合 ▲' : '點選展開提示 ▼';
  }

  document.querySelectorAll('[data-hint-toggle]').forEach(header => {
    header.addEventListener('click', () => {
      const idx = Number(header.dataset.hintToggle);
      const body = document.getElementById(`hint-body-${idx}`);
      setHintOpen(idx, body ? body.hidden : true);
    });
  });

  const expandAllHintsBtn = document.getElementById('btn-expand-all-hints');
  if (expandAllHintsBtn) {
    expandAllHintsBtn.addEventListener('click', () => {
      lesson.hints.forEach((_, idx) => setHintOpen(idx, true));
    });
  }

  // Concept Check Quiz Handlers
  document.querySelectorAll('.quiz-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const qi = Number(btn.dataset.qi);
      const oi = Number(btn.dataset.oi);
      const qz = lesson.quizzes[qi];
      if (!qz) return;
      const isCorrect = oi === qz.correct;
      const parentCard = btn.closest('.quiz-card');
      parentCard.querySelectorAll('.quiz-opt-btn').forEach((b, idx) => {
        b.classList.remove('correct', 'wrong');
        if (idx === qz.correct) b.classList.add('correct');
        else if (idx === oi && !isCorrect) b.classList.add('wrong');
      });
      const fb = document.getElementById(`quiz-fb-${qi}`);
      if (fb) {
        fb.hidden = false;
        fb.innerHTML = `${isCorrect ? '✅ <strong>答對了！</strong>' : '💡 <strong>再想一下：</strong>'} ${qz.explanation}`;
      }
    });
  });

  renderAll();
}

// ============================================================================
// Direct Pointer / Touch Dragging on Canvas
// ============================================================================
function setupCanvasDragging(canvas, id, state, pauseAnim, renderAll) {
  if (!canvas) return;
  let dragging = false;

  const updateFromPointer = (clientX, clientY) => {
    const rect = canvas.getBoundingClientRect();
    const px = (clientX - rect.left) * (820 / rect.width);
    const py = (clientY - rect.top) * (520 / rect.height);

    if (id === '12-2-1') {
      // Origin at x=210, scale 115 px per L
      const newX = Math.max(0, Math.min(3.0, (px - 210) / 115));
      state.x = Number(newX.toFixed(2));
      renderAll();
    } else if (id === '12-2-2') {
      // Ring center at x=190, scale 125 px per R
      const newZ = Math.max(0, Math.min(3.0, (px - 190) / 125));
      state.z = Number(newZ.toFixed(2));
      renderAll();
    } else if (id === '12-2-3') {
      // Sphere center at (225, 180), scale 34 px per a
      const dist = Math.hypot(px - 225, py - 180);
      const newR = Math.max(0.05, Math.min(4.5, dist / 34));
      state.r = Number(newR.toFixed(2));
      renderAll();
    } else if (id === '12-2-4') {
      // Left plate at x=130, right plate at x=660
      const ratioX = Math.max(0, Math.min(1, (px - 130) / (660 - 130)));
      state.fraction = Number(Math.sqrt(ratioX).toFixed(2));
      renderAll();
    } else if (id === '12-2-5') {
      // Shell center at x=530, R=88 px, external charge to the left: px = 530 - d * 88
      const newD = Math.max(1.35, Math.min(3.8, (530 - px) / 88));
      state.d = Number(newD.toFixed(2));
      renderAll();
    }
  };

  canvas.addEventListener('pointerdown', e => {
    const rect = canvas.getBoundingClientRect();
    const py = (e.clientY - rect.top) * (520 / rect.height);
    if (py > 345) return; // Don't hijack lower graph area unless dragging top stage
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
// High-DPI HTML5 Canvas Renderer for All 5 Examples
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
    grid: isDark ? 'rgba(148, 163, 184, 0.12)' : 'rgba(15, 23, 42, 0.06)',
    ink: isDark ? '#f1f5f9' : '#0f172a',
    sub: isDark ? '#94a3b8' : '#475569',
    muted: isDark ? '#64748b' : '#94a3b8',
    orange: isDark ? '#fb923c' : '#d95f18',
    blue: isDark ? '#60a5fa' : '#0f62fe',
    teal: isDark ? '#2dd4bf' : '#0b7b76',
    crimson: isDark ? '#f87171' : '#c9372c',
    metalFill: isDark ? '#1e293b' : '#dce6f2',
    metalStroke: isDark ? '#475569' : '#94a3b8',
    cardBg: isDark ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.92)'
  };

  // Clear background & draw subtle lab grid
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

  // Helper drawing primitives
  function drawArrow(x1, y1, dx, dy, color, label = '', width = 2.6, dashed = false) {
    const len = Math.hypot(dx, dy);
    if (len < 2) return;
    const x2 = x1 + dx, y2 = y1 + dy;
    const ang = Math.atan2(dy, dx);
    const head = Math.min(11, Math.max(7, len * 0.28));
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
      ctx.font = '700 14px "Noto Sans TC", sans-serif';
      const offX = Math.cos(ang) * 14 + (Math.abs(dy) > Math.abs(dx) ? 10 : 0);
      const offY = Math.sin(ang) * 14 + (Math.abs(dx) > Math.abs(dy) ? -8 : 4);
      ctx.fillText(label, x2 + offX - 8, y2 + offY);
    }
    ctx.restore();
  }

  function drawChargeNode(x, y, label, isPos = true, r = 21) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = isPos ? (isDark ? '#431407' : '#fff1e8') : (isDark ? '#172554' : '#e8f0fe');
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = isPos ? P.orange : P.blue;
    ctx.stroke();
    ctx.fillStyle = isPos ? P.orange : P.blue;
    ctx.font = '800 15px "JetBrains Mono", "Noto Sans TC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y + 1);
    ctx.restore();
  }

  function drawMiniGraph({ x0 = 90, y0 = 485, w = 660, h = 115, xmax = 3, ymax = 1, xlabel = 'x / L', ylabel = 'E', curves = [], marker = null, vLines = [] }) {
    ctx.save();
    // Panel backdrop
    ctx.fillStyle = P.cardBg;
    ctx.strokeStyle = P.metalStroke;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x0 - 55, y0 - h - 24, w + 95, h + 52, 10);
    ctx.fill();
    ctx.stroke();

    // Axes
    ctx.strokeStyle = P.muted;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x0, y0 - h - 6);
    ctx.lineTo(x0, y0);
    ctx.lineTo(x0 + w + 10, y0);
    ctx.stroke();

    const px = x => x0 + (x / xmax) * w;
    const py = y => y0 - (Math.max(0, Math.min(ymax, y)) / ymax) * h;

    // Vertical reference lines
    vLines.forEach(vl => {
      const vx = px(vl.x);
      ctx.save();
      ctx.strokeStyle = P.muted;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(vx, y0);
      ctx.lineTo(vx, y0 - h);
      ctx.stroke();
      ctx.fillStyle = P.sub;
      ctx.font = '600 12px "Noto Sans TC", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(vl.label, vx, y0 + 16);
      ctx.restore();
    });

    // Plot curves
    curves.forEach(c => {
      ctx.save();
      ctx.strokeStyle = c.color;
      ctx.lineWidth = c.width || 2.5;
      if (c.dash) ctx.setLineDash(c.dash);
      const segments = c.segments || [[0, xmax]];
      segments.forEach(([lo, hi]) => {
        ctx.beginPath();
        let started = false;
        const steps = 120;
        for (let i = 0; i <= steps; i++) {
          const xv = lo + (hi - lo) * (i / steps);
          const yv = c.fn(xv);
          if (yv === null || !Number.isFinite(yv)) continue;
          const cx = px(xv), cy = py(yv);
          if (!started) { ctx.moveTo(cx, cy); started = true; }
          else ctx.lineTo(cx, cy);
        }
        ctx.stroke();
      });
      ctx.restore();
    });

    // Active point marker
    if (marker && Number.isFinite(marker.y)) {
      const mx = px(marker.x), my = py(marker.y);
      ctx.save();
      ctx.strokeStyle = marker.color || P.orange;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(mx, y0);
      ctx.lineTo(mx, my);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = marker.color || P.orange;
      ctx.beginPath();
      ctx.arc(mx, my, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Labels
    ctx.fillStyle = P.sub;
    ctx.font = '700 12px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(ylabel, x0 - 10, y0 - h + 4);
    ctx.textAlign = 'left';
    ctx.fillText(xlabel, x0 + w - 25, y0 + 18);
    ctx.fillText('0', x0 - 12, y0 + 15);
    ctx.restore();
  }

  // ==========================================================================
  // Lesson 1: 12-2-1 兩電荷中垂線上的電場
  // ==========================================================================
  if (id === '12-2-1') {
    const ox = 210, oy = 175, L = 105;
    const px = ox + m.x * 115, py = oy;
    const q1y = oy - L, q2y = oy + L;

    // Axes
    ctx.strokeStyle = P.muted;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(80, oy); ctx.lineTo(740, oy);
    ctx.moveTo(ox, 35); ctx.lineTo(ox, 315);
    ctx.stroke();

    // Dashed distance lines r from charges to P
    ctx.save();
    ctx.strokeStyle = P.muted;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(ox, q1y); ctx.lineTo(px, py);
    ctx.moveTo(ox, q2y); ctx.lineTo(px, py);
    ctx.stroke();
    ctx.restore();

    // Angle arc θ at P
    if (m.x > 0.12) {
      const ang = Math.atan2(L, m.x * 115);
      ctx.save();
      ctx.strokeStyle = P.sub;
      ctx.beginPath();
      ctx.arc(px, py, 32, -ang, 0);
      ctx.stroke();
      ctx.fillStyle = P.sub;
      ctx.font = '600 13px "Noto Sans TC", sans-serif';
      ctx.fillText('θ', px - 42, py - 8);
      ctx.restore();
    }

    // Charges at (0, +L) and (0, -L)
    drawChargeNode(ox, q1y, '+q', true);
    drawChargeNode(ox, q2y, m.sign === 1 ? '+q' : '−q', m.sign === 1);

    ctx.fillStyle = P.sub;
    ctx.font = '600 14px "Noto Sans TC", sans-serif';
    ctx.fillText('O (0,0)', ox - 52, oy - 8);
    ctx.fillText('L', ox - 22, (oy + q1y) / 2 + 4);
    ctx.fillText('L', ox - 22, (oy + q2y) / 2 + 4);
    ctx.fillText(`r = √(L²+x²)`, (ox + px) / 2 - 30, (q1y + py) / 2 - 10);

    // Vector scale
    const vScale = 95;
    // Optional rectangular components
    if (s.showComponents) {
      drawArrow(px, py, m.ex1 * vScale, 0, P.orange, '', 1.6, true);
      drawArrow(px, py, 0, -m.ey1 * vScale, P.orange, 'E₁ᵧ', 1.6, true);
      drawArrow(px, py, m.ex2 * vScale, 0, P.blue, '', 1.6, true);
      drawArrow(px, py, 0, -m.ey2 * vScale, P.blue, 'E₂ᵧ', 1.6, true);
    }

    // Individual vectors E1, E2 and Resultant E_total
    drawArrow(px, py, m.ex1 * vScale, -m.ey1 * vScale, P.orange, 'E₁', 2.6);
    drawArrow(px, py, m.ex2 * vScale, -m.ey2 * vScale, P.blue, 'E₂', 2.6);
    drawArrow(px, py, m.ex * vScale, -m.ey * vScale, P.teal, 'E合', 3.6);

    // Draggable Probe P
    ctx.fillStyle = P.ink;
    ctx.beginPath();
    ctx.arc(px, py, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '800 15px "Noto Sans TC", sans-serif';
    ctx.fillText(`P (x = ${fmt(m.x, 2)}L)`, px - 35, py + 28);

    // Top-right physical formula banner
    ctx.fillStyle = P.ink;
    ctx.font = '800 16px "Noto Sans TC", sans-serif';
    ctx.fillText(
      m.sign === 1
        ? '同號 (+q, +q)：鉛直分量 Eᵧ 抵消，水平 E合 = 2kqx / (L²+x²)^(3/2) 向右'
        : '異號 (+q, −q)：水平分量 Eₓ 抵消，鉛直 E合 = 2kqL / (L²+x²)^(3/2) 向下',
      265, 34
    );

    // Lower plot
    const curves = [
      {
        fn: xv => (2 * xv) / Math.pow(1 + xv * xv, 1.5),
        color: m.sign === 1 ? P.teal : P.muted,
        width: m.sign === 1 ? 3 : 1.8,
        dash: m.sign === 1 ? null : [4, 4]
      }
    ];
    if (s.showBothCurves || m.sign === -1) {
      curves.push({
        fn: xv => 2 / Math.pow(1 + xv * xv, 1.5),
        color: m.sign === -1 ? P.blue : P.orange,
        width: m.sign === -1 ? 3 : 1.8,
        dash: m.sign === -1 ? null : [5, 4]
      });
    }
    drawMiniGraph({
      xmax: 3.0,
      ymax: 2.1,
      xlabel: 'x / L',
      ylabel: '|E| / (kq/L²)',
      curves,
      marker: { x: m.x, y: m.emag, color: m.sign === 1 ? P.teal : P.blue },
      vLines: [{ x: Math.SQRT1_2, label: 'L/√2 (同號極大)' }, { x: 1.0, label: 'L' }, { x: 2.0, label: '2L' }]
    });
  }

  // ==========================================================================
  // Lesson 2: 12-2-2 均勻帶電圓環的軸上電場
  // ==========================================================================
  else if (id === '12-2-2') {
    const ox = 190, oy = 175, rx = 44, ry = 108;
    const px = ox + m.z * 125, py = oy;
    const phiRad = (m.phi * Math.PI) / 180;

    // Back half of ring
    ctx.save();
    ctx.strokeStyle = P.orange;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(ox, oy, rx, ry, 0, Math.PI * 0.5, Math.PI * 1.5);
    ctx.stroke();
    ctx.restore();

    // Central axis
    ctx.strokeStyle = P.muted;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(70, oy); ctx.lineTo(750, oy);
    ctx.stroke();

    // Conjugate element pair (ΔQ₁, ΔQ₂) at angle phi and phi + π
    const q1x = ox + rx * Math.cos(phiRad);
    const q1y = oy + ry * Math.sin(phiRad);
    const q2x = ox - rx * Math.cos(phiRad);
    const q2y = oy - ry * Math.sin(phiRad);

    // Radius line on ring
    ctx.save();
    ctx.strokeStyle = P.sub;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(q1x, q1y); ctx.lineTo(q2x, q2y);
    ctx.stroke();
    ctx.restore();

    // Front half of ring
    ctx.save();
    ctx.strokeStyle = P.orange;
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.ellipse(ox, oy, rx, ry, 0, -Math.PI * 0.5, Math.PI * 0.5);
    ctx.stroke();
    ctx.restore();

    // + signs around ring
    ctx.fillStyle = P.orange;
    ctx.font = '800 15px sans-serif';
    ctx.textAlign = 'center';
    for (let i = 0; i < 12; i++) {
      const a = (i * Math.PI) / 6;
      ctx.fillText('+', ox + rx * Math.cos(a), oy + ry * Math.sin(a) + 5);
    }

    // Highlighted symmetric pair ΔQ1, ΔQ2 & cone decomposition
    if (s.showCone) {
      ctx.save();
      ctx.strokeStyle = P.muted;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(q1x, q1y); ctx.lineTo(px, py);
      ctx.moveTo(q2x, q2y); ctx.lineTo(px, py);
      ctx.stroke();
      ctx.restore();

      const dLen = 68;
      const dxAxis = dLen * m.cosT;
      const dyPerp = dLen * m.sinT * Math.sin(phiRad);

      // Perpendicular canceling components ΔE⊥
      drawArrow(px, py, 0, -dyPerp, P.orange, 'ΔE⊥', 2.0, true);
      drawArrow(px, py, 0, dyPerp, P.orange, '−ΔE⊥', 2.0, true);

      // Slanted ΔE1 and ΔE2
      drawArrow(px, py, dxAxis, -dyPerp, P.blue, 'ΔE₁', 2.3);
      drawArrow(px, py, dxAxis, dyPerp, P.blue, 'ΔE₂', 2.3);
    }

    // Highlighted ΔQ1, ΔQ2 dots
    ctx.fillStyle = P.blue;
    ctx.beginPath(); ctx.arc(q1x, q1y, 7, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(q2x, q2y, 7, 0, Math.PI * 2); ctx.fill();
    ctx.font = '700 13px "Noto Sans TC", sans-serif';
    ctx.fillText('ΔQ₁', q1x - 18, q1y - 12);
    ctx.fillText('ΔQ₂', q2x - 18, q2y + 22);

    // Total axial field E(z)
    drawArrow(px, py, m.ez * 285, 0, P.teal, 'E軸(z)', 4.0);

    // Observation point P
    ctx.fillStyle = P.ink;
    ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill();
    ctx.font = '800 15px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`P (z = ${fmt(m.z, 2)}R)`, px - 30, py + 28);
    ctx.fillText('O', ox - 20, oy + 20);

    // Top banner
    ctx.fillStyle = P.ink;
    ctx.font = '800 16px "Noto Sans TC", sans-serif';
    ctx.fillText('圓環軸上電場：E(z) = kQz / (R²+z²)^(3/2)　｜　當 z = √3 R 時，E = √3 kQ / (8R²)', 235, 34);

    // Lower graph
    const curves = [
      {
        fn: zv => zv / Math.pow(1 + zv * zv, 1.5),
        color: P.teal,
        width: 3
      }
    ];
    if (s.showPointApprox) {
      curves.push({
        fn: zv => (zv > 0.48 ? 1 / (zv * zv) : null),
        color: P.orange,
        width: 1.8,
        dash: [5, 5]
      });
    }
    drawMiniGraph({
      xmax: 3.0,
      ymax: 0.45,
      xlabel: 'z / R',
      ylabel: 'E / (kQ/R²)',
      curves,
      marker: { x: m.z, y: m.ez, color: P.teal },
      vLines: [
        { x: Math.SQRT1_2, label: 'R/√2 (極大值)' },
        { x: Math.sqrt(3), label: '√3 R (原題)' }
      ]
    });
  }

  // ==========================================================================
  // Lesson 3: 12-2-3 同心金屬球與球殼的四個區域
  // ==========================================================================
  else if (id === '12-2-3') {
    const ox = 225, oy = 175, sc = 34; // a=34, b=68, c=102
    const ra = sc, rb = sc * 2, rc = sc * 3;
    const rr = m.r * sc;

    // Outer shell (b < r < c)
    ctx.save();
    ctx.beginPath();
    ctx.arc(ox, oy, rc, 0, Math.PI * 2);
    ctx.fillStyle = P.metalFill;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = P.metalStroke;
    ctx.stroke();

    // Gap (a < r < b)
    ctx.beginPath();
    ctx.arc(ox, oy, rb, 0, Math.PI * 2);
    ctx.fillStyle = P.bg;
    ctx.fill();
    ctx.strokeStyle = P.metalStroke;
    ctx.stroke();

    // Inner metal sphere (r < a)
    ctx.beginPath();
    ctx.arc(ox, oy, ra, 0, Math.PI * 2);
    ctx.fillStyle = P.metalFill;
    ctx.fill();
    ctx.strokeStyle = P.metalStroke;
    ctx.stroke();
    ctx.restore();

    // Optional radial electric field lines in gap (a..b) and exterior (c..out)
    if (s.showFieldLines) {
      const drawRadialLines = (rIn, rOut, qVal) => {
        if (Math.abs(qVal) < 0.05) return;
        const count = Math.min(20, Math.max(4, Math.round(Math.abs(qVal) * 8)));
        for (let i = 0; i < count; i++) {
          const ang = (i * 2 * Math.PI) / count;
          const xStart = ox + (qVal > 0 ? rIn + 4 : rOut - 4) * Math.cos(ang);
          const yStart = oy + (qVal > 0 ? rIn + 4 : rOut - 4) * Math.sin(ang);
          const dx = (rOut - rIn - 8) * Math.cos(ang) * (qVal > 0 ? 1 : -1);
          const dy = (rOut - rIn - 8) * Math.sin(ang) * (qVal > 0 ? 1 : -1);
          drawArrow(xStart, yStart, dx, dy, P.orange, '', 1.5);
        }
      };
      drawRadialLines(ra, rb, m.q1);
      drawRadialLines(rc, 148, m.q1 + m.q2);
    }

    // Surface charge symbols (+ / -) on r=a, b, c
    if (s.showSurfaceCharges) {
      const drawSurfaceSigns = (radius, qVal) => {
        if (Math.abs(qVal) < 0.05) return;
        const sym = qVal > 0 ? '+' : '−';
        const col = qVal > 0 ? P.orange : P.blue;
        ctx.fillStyle = col;
        ctx.font = '800 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (let i = 0; i < 8; i++) {
          const ang = (i * Math.PI) / 4 + 0.2;
          ctx.fillText(sym, ox + radius * Math.cos(ang), oy + radius * Math.sin(ang));
        }
      };
      drawSurfaceSigns(ra - 6, m.qa);
      drawSurfaceSigns(rb + 6, m.qbInner);
      drawSurfaceSigns(rc - 6, m.qcOuter);
    }

    // Gaussian sphere of radius r
    ctx.save();
    ctx.strokeStyle = P.teal;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.arc(ox, oy, rr, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Radius line and E vector at r
    ctx.strokeStyle = P.teal;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(ox + rr, oy);
    ctx.stroke();

    if (!m.boundary && Math.abs(m.eVal) > 1e-4) {
      const arrowLen = Math.sign(m.eVal) * Math.min(90, Math.max(18, Math.abs(m.eVal) * 75));
      drawArrow(ox + rr, oy, arrowLen, 0, P.orange, 'E(r)', 3.2);
    }

    // Info Card on the right side of canvas
    ctx.fillStyle = P.ink;
    ctx.font = '800 16px "Noto Sans TC", sans-serif';
    ctx.fillText('同心球與球殼各表面電荷與區間電場：', 435, 55);
    ctx.font = '600 14.5px "Noto Sans TC", sans-serif';
    ctx.fillStyle = P.orange;
    ctx.fillText(`• 內球表面 (r = a)：Qₐ = ${fmt(m.qa, 1)} q₀`, 435, 88);
    ctx.fillStyle = P.blue;
    ctx.fillText(`• 球殼內表面 (r = b)：Q_b內 = −q₁ = ${fmt(m.qbInner, 1)} q₀`, 435, 116);
    ctx.fillStyle = P.orange;
    ctx.fillText(`• 球殼外表面 (r = c)：Q_c外 = q₁+q₂ = ${fmt(m.qcOuter, 1)} q₀`, 435, 144);

    ctx.fillStyle = P.teal;
    ctx.font = '800 15.5px "Noto Sans TC", sans-serif';
    ctx.fillText(`📍 目前位置：${m.regionName}`, 435, 188);
    ctx.fillStyle = P.ink;
    ctx.fillText(`• 包圍淨電量 Q_enc = ${fmt(m.qEnc, 2)} q₀`, 435, 218);
    ctx.fillText(
      m.boundary
        ? `• 位於理想表面 r = ${m.boundary}a，電場不連續跳躍`
        : `• 電場量值 |E(r)| = ${fmt(m.absE, 3)} kq₀/a²`,
      435, 246
    );

    // Piecewise graph E(r)
    const maxY = Math.max(1.5, Math.abs(m.q1) * 1.05, Math.abs(m.q1 + m.q2) / 9 * 1.2);
    drawMiniGraph({
      xmax: 4.5,
      ymax: maxY,
      xlabel: 'r / a',
      ylabel: '|E| / (kq₀/a²)',
      curves: [
        {
          fn: rv => (rv < 1 ? 0 : rv < 2 ? Math.abs(m.q1) / (rv * rv) : rv < 3 ? 0 : Math.abs(m.q1 + m.q2) / (rv * rv)),
          color: P.teal,
          width: 3,
          segments: [[0, 0.998], [1.002, 1.998], [2.002, 2.998], [3.002, 4.5]]
        }
      ],
      marker: m.boundary ? null : { x: m.r, y: m.absE, color: P.orange },
      vLines: [
        { x: 1, label: 'a' },
        { x: 2, label: 'b (2a)' },
        { x: 3, label: 'c (3a)' }
      ]
    });
  }

  // ==========================================================================
  // Lesson 4: 12-2-4 帶負電質點穿越平行板均勻電場
  // ==========================================================================
  else if (id === '12-2-4') {
    const xLeft = 130;
    const plateSpan = 360 + (m.d - 0.5) * 110; // Visual span scales with d
    const xRight = xLeft + plateSpan;
    const yTop = 55, yBot = 290, yMid = 172;

    // Uniform E field arrows (pointing LEFT from + plate to - plate)
    for (const fy of [85, 130, 215, 260]) {
      drawArrow(xRight - 22, fy, -(plateSpan - 44), 0, P.blue, fy === 85 ? '均勻電場 E（向左）' : '', 1.8);
    }

    // Left Plate (Negative) & Right Plate (Positive)
    ctx.save();
    ctx.lineWidth = 6;
    ctx.strokeStyle = P.blue;
    ctx.beginPath(); ctx.moveTo(xLeft, yTop); ctx.lineTo(xLeft, yBot); ctx.stroke();
    ctx.strokeStyle = P.orange;
    ctx.beginPath(); ctx.moveTo(xRight, yTop); ctx.lineTo(xRight, yBot); ctx.stroke();
    ctx.restore();

    ctx.font = '800 16px sans-serif';
    ctx.textAlign = 'center';
    for (let i = 0; i < 6; i++) {
      const sy = yTop + 20 + i * 39;
      ctx.fillStyle = P.blue;
      ctx.fillText('−', xLeft - 16, sy);
      ctx.fillStyle = P.orange;
      ctx.fillText('+', xRight + 16, sy);
    }
    ctx.font = '800 14px "Noto Sans TC", sans-serif';
    ctx.fillStyle = P.blue;
    ctx.fillText('負電板 (x = 0)', xLeft, yBot + 24);
    ctx.fillStyle = P.orange;
    ctx.fillText('正電板 (x = d)', xRight, yBot + 24);

    // Equal-time strobe trail showing x ∝ t²
    if (s.showStrobe) {
      for (const fStep of [0.25, 0.5, 0.75, 1.0]) {
        if (m.frac >= fStep) {
          const sx = xLeft + plateSpan * (fStep * fStep);
          ctx.save();
          ctx.beginPath();
          ctx.arc(sx, yMid, 12, 0, Math.PI * 2);
          ctx.strokeStyle = P.muted;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.fillStyle = P.sub;
          ctx.font = '600 11px "JetBrains Mono", sans-serif';
          ctx.fillText(`${Math.round(fStep * 100)}%t`, sx, yMid - 20);
          ctx.restore();
        }
      }
    }

    // Current particle position
    const curPx = xLeft + plateSpan * (m.frac * m.frac);
    drawChargeNode(curPx, yMid, '−q', false, 20);

    // Force vector F = qE (always rightward) & Velocity vector v(t)
    drawArrow(curPx + 22, yMid - 8, 45 * m.E, 0, P.orange, '電力 F = qE', 3.0);
    if (m.vCur > 0.02) {
      drawArrow(curPx + 22, yMid + 14, m.vCur * 42, 0, P.teal, `v = ${fmt(m.vCur, 2)}`, 3.0);
    }

    // Optional Work-Energy bar at top
    if (s.showEnergy) {
      ctx.fillStyle = P.ink;
      ctx.font = '700 13.5px "Noto Sans TC", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`功能定理：電力作功 W = qEx = ΔK = ½mv² ＝ ${fmt(m.workCur, 2)} / ${fmt(m.workTotal, 2)} (qE₀d₀)`, 130, 32);
    }

    // Lower Graph: x(t)/d (parabola) and v(t)/v_final (linear)
    drawMiniGraph({
      xmax: 1.0,
      ymax: 1.05,
      xlabel: 't / t抵達',
      ylabel: 'x/d 與 v/v末',
      curves: [
        { fn: tv => tv * tv, color: P.teal, width: 3 },
        { fn: tv => tv, color: P.orange, width: 2, dash: [5, 4] }
      ],
      marker: { x: m.frac, y: m.frac * m.frac, color: P.teal },
      vLines: [
        { x: 0.5, label: 't = 0.5t抵達 (x = d/4)' },
        { x: 1.0, label: 't抵達 (x = d)' }
      ]
    });
  }

  // ==========================================================================
  // Lesson 5: 12-2-5 不帶電中空金屬球殼的感應電場
  // ==========================================================================
  else if (id === '12-2-5') {
    const ox = 530, oy = 175, R = 88, rInner = 68;
    const qx = ox - m.d * R, qy = oy;

    // Axis line connecting external charge and center O
    ctx.save();
    ctx.strokeStyle = P.muted;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(qx, qy); ctx.lineTo(ox + 120, oy);
    ctx.stroke();
    ctx.restore();

    // Metallic hollow spherical shell
    ctx.save();
    ctx.beginPath();
    ctx.arc(ox, oy, R, 0, Math.PI * 2);
    ctx.fillStyle = P.metalFill;
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = P.metalStroke;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(ox, oy, rInner, 0, Math.PI * 2);
    ctx.fillStyle = P.bg;
    ctx.fill();
    ctx.strokeStyle = P.metalStroke;
    ctx.stroke();
    ctx.restore();

    // Induced charges on outer surface of shell (denser near external charge)
    const leftNearPositive = !m.pos; // If -Q on left, left side of shell has + induced
    ctx.font = '800 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const angles = [-1.15, -0.75, -0.4, -0.12, 0.12, 0.4, 0.75, 1.15];
    angles.forEach(ang => {
      // Near side (left)
      ctx.fillStyle = leftNearPositive ? P.orange : P.blue;
      ctx.fillText(
        leftNearPositive ? '+' : '−',
        ox - (R + 11) * Math.cos(ang),
        oy + (R + 11) * Math.sin(ang)
      );
      // Far side (right)
      ctx.fillStyle = leftNearPositive ? P.blue : P.orange;
      ctx.fillText(
        leftNearPositive ? '−' : '+',
        ox + (R + 11) * Math.cos(ang),
        oy + (R + 11) * Math.sin(ang)
      );
    });

    // External point charge at distance d
    drawChargeNode(qx, qy, m.pos ? '+Q' : '−Q', m.pos, 23);

    // Distance dimension d
    ctx.strokeStyle = P.sub;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(qx, oy + 108); ctx.lineTo(ox, oy + 108);
    ctx.moveTo(qx, oy + 102); ctx.lineTo(qx, oy + 114);
    ctx.moveTo(ox, oy + 102); ctx.lineTo(ox, oy + 114);
    ctx.stroke();
    ctx.fillStyle = P.ink;
    ctx.font = '700 14px "Noto Sans TC", sans-serif';
    ctx.fillText(`點電荷至球心距離 d = ${fmt(m.d, 2)} R`, (qx + ox) / 2, oy + 128);

    // Center O and vectors E_ext and E_ind
    ctx.fillStyle = P.ink;
    ctx.beginPath(); ctx.arc(ox, oy, 5, 0, Math.PI * 2); ctx.fill();
    ctx.font = '800 15px "Noto Sans TC", sans-serif';
    ctx.fillText('O (球心)', ox, oy - 36);

    const vLen = Math.min(135, Math.max(28, m.eMag * 220));
    if (m.fieldMode !== 'induced') {
      drawArrow(ox, oy - 10, m.extDir * vLen, 0, P.orange, 'E外 = kQ/d²', 3.2);
    }
    if (m.fieldMode !== 'external') {
      drawArrow(ox, oy + 12, m.indDir * vLen, 0, P.blue, 'E感應 = kQ/d²', 3.2);
    }

    // Top explanation banner
    ctx.textAlign = 'left';
    ctx.fillStyle = P.ink;
    ctx.font = '800 16px "Noto Sans TC", sans-serif';
    ctx.fillText(
      `球心靜電平衡：E⃗總(O) = E⃗外 + E⃗感應 = 0⃗  ⟹  |E⃗感應| = kQ / d²（方向：${m.indDir > 0 ? '向右 →' : '向左 ←'}）`,
      75, 36
    );

    // Lower Graph: |E_ind(O)| = kQ/d² vs d/R
    drawMiniGraph({
      xmax: 4.0,
      ymax: 1.5,
      xlabel: 'd / R',
      ylabel: '|E感應| / (kQ₀/R²)',
      curves: [
        {
          fn: dv => (dv >= 1.25 ? m.Q / (dv * dv) : null),
          color: P.blue,
          width: 3,
          segments: [[1.25, 4.0]]
        }
      ],
      marker: { x: m.d, y: m.eMag, color: P.blue },
      vLines: [
        { x: 1.0, label: '球殼表面 R' },
        { x: 2.0, label: 'd = 2R' },
        { x: 3.0, label: 'd = 3R' }
      ]
    });
  }

  ctx.restore();
}
