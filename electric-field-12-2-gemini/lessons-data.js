/* ==========================================================================
   12-2 電場與電力線｜例題資料庫（Gemini版）
   教材來源：張峻輔老師《第十二章 靜電學》§12-2 電場與電力線 例題 1～5
   ========================================================================== */

const LESSONS_12_2 = [
  {
    id: '12-2-1',
    n: 1,
    page: '12-13',
    section: '12-2 電場與電力線',
    title: '兩固定點電荷連線中垂線上的電場',
    subtitle: '比較「同號電荷 (+q, +q)」與「異號電偶極 (+q, −q)」在中垂線上的向量分解與對稱抵消',
    tags: ['點電荷電場', '向量疊加原理', '對稱性抵消', '電偶極'],
    problem: '在真空中有兩個固定的帶電體（視為點電荷）相距 $2L$（本模擬將兩電荷固定於 $y$ 軸上的 $(0, +L)$ 與 $(0, -L)$，連線中點為原點 $O(0,0)$，中垂線為 $x$ 軸）：',
    subquestions: [
      '(1) 若兩個帶電體的電量皆為 $+q$，則在兩者連線的中垂線上距中點 $O$ 為 $x$ 處（即觀察點 $P(x,0)$）的電場量值為何？',
      '(2) 承 (1)，若其中一個帶電體（下方）的電量改為 $-q$，則在相同位置 $P(x,0)$ 的電場量值與方向為何？'
    ],
    choices: [
      ['(A)', '$\\dfrac{kqx}{L^2+x^2}$', 'kqx / (L² + x²)'],
      ['(B)', '$\\dfrac{kqL}{L^2+x^2}$', 'kqL / (L² + x²)'],
      ['(C)', '$\\dfrac{2kqx}{L^2+x^2}$', '2kqx / (L² + x²)'],
      ['(D)', '$\\dfrac{2kqL}{(L^2+x^2)^{3/2}}$', '2kqL / (L² + x²)^(3/2)'],
      ['(E)', '$\\dfrac{2kqx}{(L^2+x^2)^{3/2}}$', '2kqx / (L² + x²)^(3/2)']
    ],
    givens: [
      '兩電荷間距：2L（各距中點 L）',
      '觀察點 P 到中點距離：x',
      '點電荷至 P 點距離：r = √(L² + x²)',
      '庫侖靜電常數：k'
    ],
    canvasHint: '💡 可直接在畫布中垂線上左右拖曳觀察點 P，或切換「同號／異號」配置！',
    selects: [
      {
        id: 'sign',
        label: '電荷正負配置模式',
        options: [
          ['1', '(1) 同號配置：上方 +q、下方 +q'],
          ['-1', '(2) 異號配置（電偶極）：上方 +q、下方 −q']
        ],
        defaultVal: '1'
      }
    ],
    controls: [
      { id: 'x', label: '觀察點位置 x / L', unit: 'L', min: 0, max: 3.0, step: 0.02, defaultVal: 1.0 }
    ],
    toggles: [
      { id: 'showComponents', label: '顯示正交分解分量 (Eₓ, Eᵧ)', defaultVal: true },
      { id: 'showBothCurves', label: '圖表同時對照同號與異號曲線', defaultVal: true }
    ],
    presets: [
      { label: '📍 中點 x = 0', state: { x: 0 } },
      { label: '📈 同號極大值 x = L/√2 ≈ 0.71L', state: { x: 0.707, sign: '1' } },
      { label: '📐 等腰直角 x = L (θ = 45°)', state: { x: 1.0 } },
      { label: '🔄 切換為異號 (+q, −q)', state: { sign: '-1', x: 1.0 } }
    ],
    legend: [
      { color: '#d95f18', text: '上電荷 (+q) 產生的電場 E₁' },
      { color: '#0f62fe', text: '下電荷 (+q 或 −q) 產生的電場 E₂' },
      { color: '#0b7b76', text: 'P 點合成總電場 E合' }
    ],
    simNote: '電場以 kq/L² 為基準單位。在 P 點的電場方向定義為「正試驗電荷置於 P 點時所受靜電力方向」。',
    hints: [
      {
        title: '先算單一點電荷到 P 點的距離 r 與電場量值',
        question: '電荷在 (0, ±L)，觀察點在 P(x, 0)，每個電荷單獨在 P 點產生的電場大小 |E₁| 與 |E₂| 是多少？',
        guidance: '由畢氏定理可知，上方電荷與下方電荷到 P 點的直線距離皆為 r = √(L² + x²)。代入點電荷電場公式 E = k|q|/r²，切記此時兩個電場方向不同，絕對不能直接把量值相加！',
        formula: 'r = √(L² + x²)　⟹　|E₁| = |E₂| = kq / r² = kq / (L² + x²)'
      },
      {
        title: '設定夾角 θ，將電場向量正交分解為 x 與 y 分量',
        question: '設電荷與 P 點連線和水平中垂線（x 軸）的夾角為 θ，如何用 L 與 x 表示 cosθ 與 sinθ？',
        guidance: '在直角三角形中，鄰邊為 x、對邊為 L、斜邊為 r = √(L² + x²)。因此 cosθ = x / √(L² + x²)，sinθ = L / √(L² + x²)。將 E₁ 與 E₂ 各自投影到水平 (x) 與鉛直 (y) 方向。',
        formula: 'cosθ = x / √(L² + x²)，　sinθ = L / √(L² + x²)'
      },
      {
        title: '比較 (1) 同號與 (2) 異號時，哪一個方向的分量會互相抵消？',
        question: '當下方電荷由 +q 改為 −q 時，E₂ 的箭頭方向反轉 180°，對稱抵消的分量如何改變？',
        guidance: '(1) 兩者皆為 +q（排斥正試驗電荷）：E₁ 指向右下、E₂ 指向右上，鉛直分量 Eᵧ 等大反向相消，水平分量 2|E₁|cosθ 相加向右。(2) 上 +q、下 −q：E₁ 指向右下、E₂ 指向左下（吸引正試驗電荷），水平分量 Eₓ 等大反向相消，鉛直分量 2|E₁|sinθ 相加向下！',
        formula: '(1) 同號：E合 = 2|E₁|cosθ（向右）　｜　(2) 異號：E合 = 2|E₁|sinθ（向下）'
      }
    ],
    steps: [
      {
        title: '決定幾何距離與單一電荷場強',
        explanation: '無論兩電荷同號或異號，上方電荷 $(0,+L)$ 與下方電荷 $(0,-L)$ 到中垂線上觀察點 $P(x,0)$ 的距離皆為 $r = \\sqrt{L^2+x^2}$。因此每個電荷在 $P$ 點獨立產生的電場量值相等：',
        katex: 'r = \\sqrt{L^2 + x^2}, \\qquad E_1 = E_2 = \\frac{kq}{r^2} = \\frac{kq}{L^2 + x^2}',
        plainFormula: 'E₁ = E₂ = kq / (L² + x²)',
        presetAction: { label: '在模擬器檢視 x = L 幾何關係', state: { x: 1.0, showComponents: true } }
      },
      {
        title: '第 (1) 小題：兩電荷皆為 +q（同號電荷）',
        explanation: '上方 $+q$ 在 $P$ 點產生的電場 $\\vec{E}_1$ 指向右下方；下方 $+q$ 在 $P$ 點產生的電場 $\\vec{E}_2$ 指向右上方。設連線與中垂線（$+x$ 軸）夾角為 $\\theta$，由對稱性可知兩者的鉛直分量 $E_{1y} = -E_1\\sin\\theta$ 與 $E_{2y} = +E_2\\sin\\theta$ 互相抵消，僅留下水平向右（沿中垂線遠離中點）的 $x$ 分量相加：',
        katex: 'E_{\\text{同號}} = E_{1x} + E_{2x} = 2 E_1 \\cos\\theta = 2 \\left(\\frac{kq}{L^2+x^2}\\right) \\left(\\frac{x}{\\sqrt{L^2+x^2}}\\right) = \\frac{2kqx}{(L^2+x^2)^{3/2}}',
        plainFormula: 'E_同號 = 2·[kq / (L² + x²)]·[x / √(L² + x²)] = 2kqx / (L² + x²)^(3/2) （方向沿中垂線向外，選 E）',
        presetAction: { label: '切換模擬器至 (1) 同號配置', state: { sign: '1', x: 1.0, showComponents: true } }
      },
      {
        title: '第 (2) 小題：一為 +q、另一為 −q（異號電偶極）',
        explanation: '當下方電荷改為 $-q$ 時，$\\vec{E}_1$（上 $+q$ 排斥）仍指向右下方，但 $\\vec{E}_2$（下 $-q$ 吸引）改為指向左下方。此時水平分量 $E_{1x} = +E_1\\cos\\theta$ 與 $E_{2x} = -E_2\\cos\\theta$ 等大反向而抵消；鉛直分量皆朝下（平行於兩電荷連線，由 $+q$ 指向 $-q$）並相加：',
        katex: 'E_{\\text{異號}} = |E_{1y}| + |E_{2y}| = 2 E_1 \\sin\\theta = 2 \\left(\\frac{kq}{L^2+x^2}\\right) \\left(\\frac{L}{\\sqrt{L^2+x^2}}\\right) = \\frac{2kqL}{(L^2+x^2)^{3/2}}',
        plainFormula: 'E_異號 = 2·[kq / (L² + x²)]·[L / √(L² + x²)] = 2kqL / (L² + x²)^(3/2) （方向平行連線由 +q 指向 −q，選 D）',
        presetAction: { label: '切換模擬器至 (2) 異號配置', state: { sign: '-1', x: 1.0, showComponents: true } }
      },
      {
        title: '延伸比較：中點 x = 0 與極值特性',
        explanation: '• 在連線中點 $x = 0$ 處：同號配置因分子含 $x$，故 $E_{\\text{同號}}(0) = 0$；而異號配置在 $x = 0$ 處兩電場同向疊加達最大值 $E_{\\text{異號}}(0) = \\dfrac{2kq}{L^2}$。\n• 對 $E_{\\text{同號}}(x)$ 微分求極值（令 $\\dfrac{dE}{dx} = 0$），可得當 $x = \\dfrac{L}{\\sqrt{2}} \\approx 0.707L$ 時，中垂線上同號合電場達到極大值 $E_{\\max} = \\dfrac{4kq}{3\\sqrt{3}L^2}$。',
        katex: 'x = \\frac{L}{\\sqrt{2}} \\implies E_{\\text{同號, max}} = \\frac{4}{3\\sqrt{3}}\\frac{kq}{L^2} \\approx 0.770\\,\\frac{kq}{L^2}',
        plainFormula: '同號電場在 x = 0 及 x → ∞ 皆趨近 0，於 x = L/√2 處有極大值。',
        presetAction: { label: '移至同號極大值點 x = L/√2', state: { sign: '1', x: 0.707 } }
      }
    ],
    answerSummary: '(1) 同號 (+q, +q) 中垂線電場量值為 2kqx / (L² + x²)^(3/2)，方向沿中垂線背離中點，答案選 (E)。\n(2) 異號 (+q, −q) 中垂線電場量值為 2kqL / (L² + x²)^(3/2)，方向平行於兩電荷連線（由 +q 指向 −q），答案選 (D)。',
    optionAnalysis: [
      '(A) 錯誤：少乘了 2 倍，且忘記將 cosθ = x / √(L²+x²) 的分母併入 3/2 次方。',
      '(B) 錯誤：少乘了 2 倍，且忘記 sinθ = L / √(L²+x²) 的分母 √(L²+x²)。',
      '(C) 錯誤：誤以為 cosθ = x，漏掉斜邊 √(L²+x²) 使分母僅為一次方。',
      '(D) 正確（第 2 小題答案）：異號時水平分量抵消，鉛直分量 2·[kq/(L²+x²)]·[L/√(L²+x²)] = 2kqL/(L²+x²)^(3/2)。',
      '(E) 正確（第 1 小題答案）：同號時鉛直分量抵消，水平分量 2·[kq/(L²+x²)]·[x/√(L²+x²)] = 2kqx/(L²+x²)^(3/2)。'
    ],
    pitfall: '常見迷思：以為「異號電荷 (+q 與 −q) 總電量為零，所以中點 x = 0 的電場也是零」。事實上，電場是向量！在兩異號電荷連線中點，+q 向下推正試驗電荷，−q 也向下拉正試驗電荷，兩向量同向相加，中點電場不但不為零，反而是中垂線上的最大值 2kq/L²！',
    quizzes: [
      {
        q: '1. 在異號電荷 (+q 與 −q) 配置下，當觀察點 P 位於連線中點 (x = 0) 時，合電場量值為何？',
        options: ['0（因為正負電量相消）', '2kq / L²（方向由 +q 指向 −q）', 'kq / L²'],
        correct: 1,
        explanation: '在 x = 0 處，+q 與 −q 產生的電場方向相同（皆由 +q 指向 −q），各為 kq/L²，故合電場為 2kq/L²。'
      },
      {
        q: '2. 在同號電荷 (+q 與 +q) 配置下，若將觀察點 P 從中點 (x = 0) 沿中垂線慢慢移到無窮遠處 (x → ∞)，合電場量值如何變化？',
        options: ['從 0 先增大至極大值，再逐漸減小趨近於 0', '一路單調遞減至 0', '維持定值不變'],
        correct: 0,
        explanation: 'x = 0 時兩電場反向相消為 0；x → ∞ 時距離無窮遠電場亦為 0，因此在中間 x = L/√2 處必出現極大值！'
      }
    ]
  },

  {
    id: '12-2-2',
    n: 2,
    page: '12-14',
    section: '12-2 電場與電力線',
    title: '均勻帶電金屬圓環軸線上的電場',
    subtitle: '利用圓環微元分割 ΔQ 與圓對稱性，消去垂直軸向分量並累加軸向電場',
    tags: ['連續帶電體', '微元分割法', '軸對稱抵消', '極值位置'],
    problem: '一金屬圓環半徑為 $R$，帶電量為 $Q$（設 $Q > 0$）且均勻分布於環上。試求在通過圓心 $O$ 且垂直於環面的中心軸線上，距圓心為 $z = \\sqrt{3}R$ 處的 $P$ 點電場量值與方向為何？（靜電常數為 $k$）',
    subquestions: [
      '先推導距圓心任意距離 z 處的軸上電場通式 E(z)，再代入題目條件 z = √3 R。'
    ],
    choices: [
      ['(A)', '$\\dfrac{\\sqrt{3}kQ}{8R^2}$', '√3 kQ / (8R²)'],
      ['(B)', '$\\dfrac{kQ}{4R^2}$', 'kQ / (4R²)'],
      ['(C)', '$\\dfrac{kQ}{3R^2}$', 'kQ / (3R²)'],
      ['(D)', '$\\dfrac{\\sqrt{3}kQ}{4R^2}$', '√3 kQ / (4R²)'],
      ['(E)', '$\\dfrac{kQ}{8R^2}$', 'kQ / (8R²)']
    ],
    givens: [
      '圓環半徑：R',
      '圓環總電量：Q（均勻分布）',
      '觀察點軸向距離：z = √3 R',
      '環上微元至 P 點距離：r = √(R² + z²) = 2R'
    ],
    canvasHint: '💡 可在軸線上左右拖曳觀察點 P，或點擊「播放成對微元掃描」觀察錐面分量如何抵消！',
    selects: [],
    controls: [
      { id: 'z', label: '觀察點軸向位置 z / R', unit: 'R', min: 0, max: 3.0, step: 0.01, defaultVal: 1.732 },
      { id: 'phi', label: '對稱微元配對視角 φ', unit: '°', min: 0, max: 360, step: 2, defaultVal: 35 }
    ],
    toggles: [
      { id: 'showCone', label: '顯示對稱微元分解與電場圓錐', defaultVal: true },
      { id: 'showPointApprox', label: '圖表顯示點電荷近似 kQ/z²', defaultVal: true }
    ],
    presets: [
      { label: '🎯 原題位置 z = √3 R ≈ 1.732 R', state: { z: Math.sqrt(3) } },
      { label: '⭕ 圓心處 z = 0 (E = 0)', state: { z: 0 } },
      { label: '📈 最大場強處 z = R/√2 ≈ 0.707 R', state: { z: Math.SQRT1_2 } },
      { label: '🔭 遠場位置 z = 3.0 R', state: { z: 3.0 } }
    ],
    legend: [
      { color: '#0f62fe', text: '對稱微元 ΔQ 產生的微量電場 ΔE₁, ΔE₂（放大示意）' },
      { color: '#d95f18', text: '互相抵消的垂直軸向分量 ΔE⊥' },
      { color: '#0b7b76', text: '累加後的軸向總電場 E軸' }
    ],
    simNote: '藍色與橙色微量電場箭頭為放大示意，協助看清幾何分解；綠色總電場與下方函數曲線則嚴格依 kQ/R² 比例繪製。',
    hints: [
      {
        title: '不能把圓環當作集中在圓心的點電荷！改用「微元分割法」',
        question: '為什麼不能直接用 z = √3 R 代入點電荷公式 kQ/z²？環上每一小段 ΔQ 距離 P 點有多遠？',
        guidance: '點電荷公式只適用於尺寸遠小於距離的帶電體（或球對稱外部）。對於圓環，我們將它切成無數個極小段，每段帶電 ΔQ。環上每一點到軸上 P 點的距離完全相同，都是斜邊 r = √(R² + z²)。',
        formula: 'r = √(R² + z²)　⟹　每一小段的場強 ΔE = k·ΔQ / (R² + z²)'
      },
      {
        title: '利用圓環直徑兩端的對稱性，消去垂直軸線的分量',
        question: '任取環上直徑兩端的兩個對稱微元 ΔQ，它們在 P 點產生的電場哪個分量會抵消？哪個分量會保留？',
        guidance: '設連線 r 與中心軸線的夾角為 θ。直徑兩端的兩個 ΔQ 在垂直於軸線方向的分量 ΔE⊥ = ΔE·sinθ 大小相等、方向相反，成對抵消！只有沿著中心軸線方向的分量 ΔE∥ = ΔE·cosθ 方向完全相同，可以直接代數相加。',
        formula: 'ΔE軸 = ΔE·cosθ = [k·ΔQ / (R² + z²)] · [z / √(R² + z²)]'
      },
      {
        title: '對整個圓環求和（ΣΔQ = Q），並代入 z = √3 R',
        question: '把整圈圓環所有微元的 ΔE軸 加起來時，哪些量是共同常數可以提出來？',
        guidance: '因為環上每一小段的 R、z、r、cosθ 都完全相同！提出常數後，剩下的 ΣΔQ 就是圓環總電量 Q。最後將 z = √3 R 代入通式，注意 r = √(R² + 3R²) = 2R。',
        formula: 'E(z) = kQz / (R² + z²)^(3/2)　──代入 z = √3 R──▶　E = √3 kQ / (8R²)'
      }
    ],
    steps: [
      {
        title: '分割微元 ΔQ 並計算至 P 點之距離 r',
        explanation: '將帶電圓環細分為 $N$ 個極小的點電荷微元，每個微元電量為 $\\Delta Q_i$（且 $\\sum \\Delta Q_i = Q$）。由於圓環平面垂直於軸線，環上每一個微元到軸線上 $P$ 點（距圓心 $z$）的直線距離 $r$ 皆相等：',
        katex: 'r = \\sqrt{R^2 + z^2}, \\qquad \\Delta E_i = \\frac{k\\,\\Delta Q_i}{r^2} = \\frac{k\\,\\Delta Q_i}{R^2 + z^2}',
        plainFormula: 'r = √(R² + z²)，　ΔEᵢ = k·ΔQᵢ / (R² + z²)',
        presetAction: { label: '顯示微元圓錐分解', state: { showCone: true, z: 1.732 } }
      },
      {
        title: '對稱分解與軸向分量累加',
        explanation: '設微元與 $P$ 點連線和軸線夾角為 $\\theta$，則 $\\cos\\theta = \\dfrac{z}{r} = \\dfrac{z}{\\sqrt{R^2+z^2}}$。將 $\\Delta \\vec{E}_i$ 分解為垂直軸線的徑向分量 $\\Delta E_{\\perp} = \\Delta E_i \\sin\\theta$ 與平行軸線的軸向分量 $\\Delta E_{\\parallel} = \\Delta E_i \\cos\\theta$。由圓對稱性，直徑兩端微元的 $\\Delta E_{\\perp}$ 必成對抵消，故總電場純粹沿軸線方向：',
        katex: 'E(z) = \\sum \\Delta E_i \\cos\\theta = \\frac{k z}{(R^2+z^2)^{3/2}} \\sum \\Delta Q_i = \\frac{k Q z}{(R^2+z^2)^{3/2}}',
        plainFormula: 'E(z) = kQz / (R² + z²)^(3/2) （沿軸線背離正電圓環）'
      },
      {
        title: '代入原題條件 z = √3 R 求值',
        explanation: '當 $z = \\sqrt{3}R$ 時，斜邊距離 $r = \\sqrt{R^2 + (\\sqrt{3}R)^2} = \\sqrt{4R^2} = 2R$（即 $\\theta = 30^\\circ$，$\\cos 30^\\circ = \\dfrac{\\sqrt{3}}{2}$）。代入圓環軸線電場公式：',
        katex: 'E(\\sqrt{3}R) = \\frac{k Q (\\sqrt{3}R)}{\\left(R^2 + 3R^2\\right)^{3/2}} = \\frac{\\sqrt{3} k Q R}{(4R^2)^{3/2}} = \\frac{\\sqrt{3} k Q R}{8 R^3} = \\frac{\\sqrt{3} k Q}{8 R^2}',
        plainFormula: 'E = √3 kQ / (8R²) ≈ 0.2165 kQ/R²，選 (A)',
        presetAction: { label: '定位至原題 z = √3 R', state: { z: Math.sqrt(3) } }
      },
      {
        title: '特殊位置討論：圓心 (z = 0)、極大值 (z = R/√2) 與無窮遠 (z ≫ R)',
        explanation: '1. **圓心處 ($z = 0$)**：$\\cos\\theta = 0$，環上所有微元的電場在環面內完全對稱抵消，$E(0) = 0$。\n2. **極大值處 ($z = R/\\sqrt{2} \\approx 0.707R$)**：由 $\\dfrac{dE}{dz} = 0$ 可得 $R^2 - 2z^2 = 0$，即 $z = \\dfrac{R}{\\sqrt{2}}$ 時軸上電場最大，量值為 $E_{\\max} = \\dfrac{2}{3\\sqrt{3}}\\dfrac{kQ}{R^2} \\approx 0.385\\,\\dfrac{kQ}{R^2}$。\n3. **遠場近似 ($z \\gg R$)**：分母 $(R^2+z^2)^{3/2} \\approx z^3$，此時 $E(z) \\approx \\dfrac{kQ}{z^2}$，從極遠處看圓環就如同一個點電荷！',
        katex: 'z = 0 \\Rightarrow E = 0; \\quad z = \\frac{R}{\\sqrt{2}} \\Rightarrow E_{\\max} = \\frac{2}{3\\sqrt{3}}\\frac{kQ}{R^2}; \\quad z \\gg R \\Rightarrow E \\approx \\frac{kQ}{z^2}',
        plainFormula: 'z = 0 時 E = 0；z = R/√2 時達極大值；z ≫ R 時趨近點電荷 kQ/z²',
        presetAction: { label: '檢視最大電場位置 z = R/√2', state: { z: Math.SQRT1_2 } }
      }
    ],
    answerSummary: '距圓心 √3 R 處的 P 點電場量值為 E = √3 kQ / (8R²)，方向沿軸線遠離正電圓環（若 Q < 0 則指向圓心），答案選 (A)。',
    optionAnalysis: [
      '(A) 正確：r = 2R，每個微元場強貢獻除以 (2R)² = 4R²，再乘上軸向投影 cos30° = √3/2，得 √3 kQ / (8R²)。',
      '(B) 錯誤：只算了 kQ / r² = kQ / (4R²)，忘記乘上軸向投影因子 cosθ = √3/2。',
      '(C) 錯誤：誤將距離當成 z = √3 R 直接代點電荷公式 kQ / z² = kQ / (3R²)。',
      '(D) 錯誤：計算 (4R²)^(3/2) 時誤算為 4R³ 而非 8R³。',
      '(E) 錯誤：代錯角度（誤用 sin30° = 1/2 而非 cos30° = √3/2）。'
    ],
    pitfall: '最大陷阱：直接把總電量 Q 當作集中在圓心 O，代入 E = kQ / (√3 R)² = kQ / (3R²) 選 (C)；或是算出了斜邊距離 r = 2R 代入 kQ / (2R)² = kQ / (4R²) 選 (B)，卻忘了各微元電場是斜向的，必須乘上 cos30° = √3/2 才是軸向有效分量！',
    quizzes: [
      {
        q: '1. 將一個帶負電 (−q) 的小質點放在正電圓環 (+Q) 軸線上極靠近圓心處 (z ≪ R) 由靜止釋放，小質點會做什麼運動？',
        options: ['以圓心 O 為平衡點做簡諧運動 (SHM)', '靜止在原地不動', '沿軸線單向加速飛向無窮遠'],
        correct: 0,
        explanation: '當 z ≪ R 時，E(z) ≈ (kQ/R³)z，負電荷受力 F_z = −qE(z) ≈ −(kQq/R³)z，與位移 z 成正比且指向圓心 O，故做簡諧運動！'
      },
      {
        q: '2. 當觀察點 P 從圓心 (z = 0) 沿軸線移動到 z = 3R 的過程中，電場量值 E(z) 的變化趨勢為何？',
        options: ['由 0 先遞增，在 z = R/√2 達到最大值後再遞減', '在 z = 0 最大，之後一路遞減', '由 0 一路單調遞增'],
        correct: 0,
        explanation: '圓心 z = 0 時對稱抵消 E = 0；在 z = R/√2 ≈ 0.707R 處達到峰值，之後隨距離增加而遞減（原題 z = √3R ≈ 1.732R 已在峰值右側遞減區）。'
      }
    ]
  },

  {
    id: '12-2-3',
    n: 3,
    page: '12-15',
    section: '12-2 電場與電力線',
    title: '同心金屬球與球殼的四個區域電場',
    subtitle: '結合「靜電平衡導體內部電場為零」與「球對稱高斯面／靜電感應電荷分布」分析四個區間',
    tags: ['靜電平衡', '金屬球與球殼', '靜電感應', '球殼定理'],
    problem: '一實心金屬球半徑為 $a$，帶電量為 $+q_1$，被一同心金屬球殼包圍；球殼內半徑為 $b$、外半徑為 $c$（$a < b < c$），且球殼帶淨電量 $+q_2$，如圖所示。設靜電常數為 $k$，試求距球心 $O$ 為 $r$ 處的電場量值與方向：',
    subquestions: [
      '(1) r < a（實心金屬球內部）',
      '(2) a < r < b（金屬球與球殼之間的空腔）',
      '(3) b < r < c（金屬球殼肉厚內部）',
      '(4) r > c（金屬球殼外部空間）'
    ],
    choices: [],
    givens: [
      '內金屬球：半徑 a，帶電 +q₁',
      '同心金屬球殼：內半徑 b、外半徑 c，淨電量 +q₂',
      '模擬幾何比例：a : b : c = 1 : 2 : 3',
      '導體靜電平衡條件：金屬實體內部 E = 0'
    ],
    canvasHint: '💡 可直接在同心球剖面圖上拖曳綠色高斯球面半徑 r，或調整內球 q₁ 與外殼 q₂ 電量！',
    selects: [],
    controls: [
      { id: 'r', label: '觀察點半徑 r / a', unit: 'a', min: 0.05, max: 4.5, step: 0.02, defaultVal: 1.5 },
      { id: 'q1', label: '內球電量 q₁', unit: 'q₀', min: -2.0, max: 2.5, step: 0.1, defaultVal: 1.0 },
      { id: 'q2', label: '外球殼淨電量 q₂', unit: 'q₀', min: -2.0, max: 3.0, step: 0.1, defaultVal: 1.0 }
    ],
    toggles: [
      { id: 'showSurfaceCharges', label: '顯示各表面感應電荷 (+ / −) 標記', defaultVal: true },
      { id: 'showFieldLines', label: '顯示徑向電力線分布', defaultVal: true }
    ],
    presets: [
      { label: '區間 (1) r = 0.5a (內球內)', state: { r: 0.5, q1: 1, q2: 1 } },
      { label: '區間 (2) r = 1.5a (空腔內)', state: { r: 1.5, q1: 1, q2: 1 } },
      { label: '區間 (3) r = 2.5a (殼肉內)', state: { r: 2.5, q1: 1, q2: 1 } },
      { label: '區間 (4) r = 3.6a (球殼外)', state: { r: 3.6, q1: 1, q2: 1 } },
      { label: '🛡️ 測試外殼屏蔽 q₂ = −q₁', state: { r: 3.6, q1: 1.5, q2: -1.5 } }
    ],
    legend: [
      { color: '#64748b', text: '金屬導體區域 (r < a 與 b < r < c)：E = 0' },
      { color: '#0b7b76', text: '球對稱觀察面（高斯球面）半徑 r' },
      { color: '#d95f18', text: '徑向電場向量 E(r) 與電力線' }
    ],
    simNote: '在理想導體表面 r = a, b, c 處，電場發生不連續跳躍；調整 q₁ 與 q₂ 可即時觀察內外表面感應電量如何自動重分配。',
    hints: [
      {
        title: '金屬導體達到「靜電平衡」時的兩大鐵則',
        question: '在實心金屬球內 (r < a) 以及金屬球殼的肉厚內 (b < r < c)，電場是多少？電荷分布在哪裡？',
        guidance: '達到靜電平衡時，導體內部的自由電子不再淨移動，因此任何金屬實體內部電場必為零（E = 0）！所有的淨電荷與感應電荷都只能分布在導體的「表面」（即 r = a、r = b、r = c 三個球面）。',
        formula: '(1) r < a：E = 0　｜　(3) b < r < c：E = 0'
      },
      {
        title: '分析球殼內表面 (r = b) 與外表面 (r = c) 的感應電量',
        question: '為了讓球殼肉厚內 (b < r < c) 的電場為零，球殼內表面 (r = b) 必須感應出多少電量來抵消內球的 +q₁？',
        guidance: '在 b < r < c 內要使合電場為 0，球面內包住的總電量必須為 0！因為內球帶有 +q₁，所以球殼內表面 (r = b) 必定被吸引出 −q₁ 的感應電荷。又因球殼本身總淨電量為 +q₂，由電荷守恆可知球殼外表面 (r = c) 的電量必為 q₁ + q₂！',
        formula: 'r = a 表面：+q₁　｜　r = b 內表面：−q₁　｜　r = c 外表面：+(q₁ + q₂)'
      },
      {
        title: '利用球殼定理（或高斯定律）求空隙 (a < r < b) 與外部 (r > c) 的電場',
        question: '均勻帶電球面對於「球面內部」與「球面外部」各產生什麼電場？',
        guidance: '根據球對稱的球殼定理：均勻球面對其「內部」不產生淨電場（E = 0），對其「外部」則等效於將電量集中在球心 O 的點電荷（E = kQ_內 / r²）。因此只要看半徑 r 的球面「包住了多少總電量 Q_enclosed」即可！',
        formula: '(2) a < r < b：Q_包圍 = +q₁ ⟹ E = kq₁/r²　｜　(4) r > c：Q_包圍 = q₁+q₂ ⟹ E = k(q₁+q₂)/r²'
      }
    ],
    steps: [
      {
        title: '步驟一：靜電平衡與三個表面的電荷分布',
        explanation: '金屬導體達靜電平衡時，導體內部電場處處為零，淨電荷僅分布於表面：\n• **內球表面 ($r = a$)**：均勻分布 $+q_1$。\n• **球殼內表面 ($r = b$)**：為使球殼金屬內部 ($b < r < c$) 電場為零，內表面必感應出與內球等量異號的電荷 $-q_1$（使 $b < r < c$ 包圍的淨電荷 $q_1 + (-q_1) = 0$）。\n• **球殼外表面 ($r = c$)**：由球殼電荷守恆 $q_{\\text{內表面}} + q_{\\text{外表面}} = q_2$，得外表面電量為 $q_1 + q_2$。',
        katex: 'Q_{r=a} = +q_1, \\qquad Q_{r=b} = -q_1, \\qquad Q_{r=c} = +q_1 + q_2',
        plainFormula: '內球表面：+q₁；　球殼內表面：−q₁；　球殼外表面：q₁ + q₂',
        presetAction: { label: '顯示各表面電荷分布', state: { showSurfaceCharges: true, r: 1.5, q1: 1, q2: 1 } }
      },
      {
        title: '第 (1) 與 (3) 小題：導體內部區域 (r < a 與 b < r < c)',
        explanation: '無論是實心金屬球內部 ($r < a$) 或是金屬球殼的實體內部 ($b < r < c$)，皆屬於靜電平衡的金屬導體內部，自由電荷已完成重新分布並抵消所有內部電場，因此：',
        katex: '(1)\\; r < a: \\quad E = 0 \\qquad\\qquad (3)\\; b < r < c: \\quad E = 0',
        plainFormula: '(1) r < a：E = 0；　(3) b < r < c：E = 0',
        presetAction: { label: '移至球殼肉厚內 r = 2.5a', state: { r: 2.5 } }
      },
      {
        title: '第 (2) 小題：球與球殼間的空隙 (a < r < b)',
        explanation: '在 $a < r < b$ 處，觀察點位於內球 ($r=a$) 外部，但位於球殼內外表面 ($r=b, c$) 的內部。由於同心球對稱分布的外層電荷（$r=b$ 的 $-q_1$ 與 $r=c$ 的 $q_1+q_2$）對其內部空腔不產生淨電場，此處電場完全由內球 $+q_1$ 所決定，等效於集中在球心 $O$ 的點電荷 $+q_1$：',
        katex: '(2)\\; a < r < b: \\quad E(r) = \\frac{k q_1}{r^2} \\quad (\\text{方向沿徑向向外})',
        plainFormula: '(2) a < r < b：E = kq₁ / r²（沿半徑方向向外）',
        presetAction: { label: '移至兩導體空隙 r = 1.5a', state: { r: 1.5 } }
      },
      {
        title: '第 (4) 小題：金屬球殼外部 (r > c)',
        explanation: '在 $r > c$ 處，觀察點位於三個同心均勻帶電球面的外部。由球殼定理（或高斯定律），三個球面的電荷對外部產生的電場皆等效於集中在球心 $O$，總包圍淨電量為 $Q_{\\text{總}} = q_1 + (-q_1) + (q_1 + q_2) = q_1 + q_2$：',
        katex: '(4)\\; r > c: \\quad E(r) = \\frac{k (q_1 + q_2)}{r^2} \\quad (\\text{方向沿徑向向外})',
        plainFormula: '(4) r > c：E = k(q₁ + q₂) / r²（沿半徑方向向外）',
        presetAction: { label: '移至球殼外部 r = 3.6a', state: { r: 3.6 } }
      }
    ],
    answerSummary: '(1) r < a：E = 0\n(2) a < r < b：E = kq₁ / r²（方向沿半徑向外）\n(3) b < r < c：E = 0\n(4) r > c：E = k(q₁ + q₂) / r²（方向沿半徑向外）',
    optionAnalysis: [
      '區間 (1) r < a：金屬球內部，靜電平衡 E = 0。',
      '區間 (2) a < r < b：僅受內球 +q₁ 影響，外殼不對內部空腔產生電場，E = kq₁/r²。',
      '區間 (3) b < r < c：球殼內表面感應 −q₁ 恰抵消內球 +q₁，球殼金屬內 E = 0。',
      '區間 (4) r > c：球殼外表面帶電 q₁ + q₂，外部總電場 E = k(q₁ + q₂)/r²。'
    ],
    pitfall: '常見錯誤：以為在 a < r < b 空腔內會同時受到內球 q₁ 與外殼 q₂ 的影響，或是誤以為球殼外表面只帶 +q₂ 而寫出 r > c 時 E = kq₂/r²。記住：內球的 +q₁ 會透過靜電感應把 −q₁ 吸到球殼內表面，進而把額外的 +q₁「推」到球殼外表面，使外表面總電量變成 q₁ + q₂！',
    quizzes: [
      {
        q: '1. 若保持內球帶電 +q₁ 不變，而將外層金屬球殼「接地」或改為帶淨電量 q₂ = −q₁，則球殼外部 (r > c) 的電場會變成多少？',
        options: ['0（球殼外表面無淨電荷，完全屏蔽內部電場）', 'kq₁ / r²', '2kq₁ / r²'],
        correct: 0,
        explanation: '當 q₂ = −q₁ 時，球殼外表面電量為 q₁ + q₂ = 0，球殼外部 r > c 包圍的總電量為 0，故外部電場為 0（可在模擬器點擊「測試外殼屏蔽 q₂ = −q₁」驗證）。'
      },
      {
        q: '2. 承原題，若我們只改變外球殼的淨電量 q₂（例如由 +q₂ 增加為 +3q₂），對兩導體間空隙 (a < r < b) 的電場有何影響？',
        options: ['完全不變，仍為 kq₁ / r²', '隨之變為 3 倍', '方向反轉'],
        correct: 0,
        explanation: '增加的電量只會均勻分布在球殼最外表面 (r = c)，而球對稱的外表面電荷對其內部 (r < c) 的合電場貢獻恆為零，故 a < r < b 處電場完全不受 q₂ 影響。'
      }
    ]
  },

  {
    id: '12-2-4',
    n: 4,
    page: '12-15',
    section: '12-2 電場與電力線',
    title: '帶負電質點穿越平行板均勻電場',
    subtitle: '釐清「電場方向」與「負電荷受力／加速度方向」的關係，結合等加速度運動與功能定理求解',
    tags: ['平行板均勻電場', '帶電質點運動', '等加速度運動', '功能定理'],
    problem: '在真空中兩平行金屬板帶有等量異號電荷，兩板相距為 $d$，板間可視為均勻電場，其量值為 $E$。今有一質量為 $m$、帶負電的小質點（電量記為 $-q$，其中 $q > 0$ 為電量量值），由靜止開始自負電板表面飛向正電板，忽略重力影響，試求：',
    subquestions: [
      '(a) 小質點抵達正電板時的速度量值 v 與方向為何？',
      '(b) 小質點由負電板飛至正電板所需的飛行時間 t 為何？'
    ],
    choices: [],
    givens: [
      '平行板間距：d',
      '板間均勻電場量值：E（方向由正板指向負板）',
      '質點質量：m、帶電量：−q (q > 0)',
      '初始條件：由負板靜止釋放 (v₀ = 0)'
    ],
    canvasHint: '💡 點擊「播放運動」觀察等加速閃光軌跡（1:3:5 间距），或拉動「飛行時間進度」滑桿逐格檢視！',
    selects: [],
    controls: [
      { id: 'E', label: '板間電場強度 E', unit: 'E₀', min: 0.5, max: 2.5, step: 0.1, defaultVal: 1.0 },
      { id: 'd', label: '平行板間距 d', unit: 'd₀', min: 0.5, max: 2.0, step: 0.1, defaultVal: 1.0 },
      { id: 'm', label: '質點質量 m', unit: 'm₀', min: 0.5, max: 2.5, step: 0.1, defaultVal: 1.0 },
      { id: 'fraction', label: '飛行時間進度 t / t抵達', unit: '', min: 0, max: 1.0, step: 0.01, defaultVal: 0.0 }
    ],
    toggles: [
      { id: 'showStrobe', label: '顯示等時距閃光軌跡 (x ∝ t²)', defaultVal: true },
      { id: 'showEnergy', label: '顯示電力作功與動能轉換列', defaultVal: true }
    ],
    presets: [
      { label: '⏮️ 起點：剛離開負板 (t = 0)', state: { fraction: 0, E: 1, d: 1, m: 1 } },
      { label: '⏱️ 時間過半 (t = 0.5 t抵達 ⟹ x = d/4)', state: { fraction: 0.5 } },
      { label: '🏁 抵達正板瞬間 (t = t抵達 ⟹ x = d)', state: { fraction: 1.0 } },
      { label: '⚡ 電場加倍 (E = 2 E₀)', state: { E: 2.0, d: 1.0, m: 1.0, fraction: 1.0 } }
    ],
    legend: [
      { color: '#0f62fe', text: '均勻電場 E（由右方正板指向左方負板）' },
      { color: '#d95f18', text: '負電荷所受靜電力 F = −qE（恆向右）' },
      { color: '#0b7b76', text: '瞬時速度向量 v(t) = a·t（向右遞增）' }
    ],
    simNote: '以 q = m₀ = E₀ = d₀ = 1 為正規化基準（此時 a₀ = 1、v₀ = √2 ≈ 1.414、t₀ = √2 ≈ 1.414）。注意當時間為總時間一半 (50%) 時，位移僅為 d/4 (25%)！',
    hints: [
      {
        title: '先判斷方向：電場 E 朝哪裡？負電荷 (−q) 受的電力 F 朝哪裡？',
        question: '電場線由正電板指向負電板，為什麼帶負電 (−q) 的質點卻能從負板飛向正板？',
        guidance: '根據電場定義 F⃗ = q_帶號 E⃗，正電荷受力與電場同向，而「負電荷所受電力方向與電場方向相反」！因此電場雖然由正板指向負板（圖中向左），負電荷受的靜電力 F = qE 卻是由負板指向正板（圖中向右），使它向正板加速。',
        formula: '|F| = qE（方向朝向正電板）　⟹　加速度 a = F / m = qE / m（定值）'
      },
      {
        title: '求 (a) 抵達正電板的速度 v：等加速度公式或功能定理皆可',
        question: '已知初速 v₀ = 0、恆定加速度 a = qE/m、飛行總位移為板距 d，如何求末速 v？',
        guidance: '方法一（運動學）：代入 v² = v₀² + 2ad = 2(qE/m)d，開根號即得 v。\n方法二（功能定理）：靜電力對質點作正功 W = F·d = qEd，全部轉換為動能 ½mv²，同樣立得 v = √(2qEd/m)！',
        formula: 'v² = 2ad = 2(qE/m)d　⟹　v = √(2qEd / m)'
      },
      {
        title: '求 (b) 飛行時間 t：利用位移公式 d = ½at² 或 v = at',
        question: '在初速為 0 的等加速度直線運動中，位移 d 與時間 t 的關係為何？',
        guidance: '由 d = ½ a t²，可得 t = √(2d / a)。將 a = qE / m 代入，即可求出由負板飛至正板所需的時間 t。也可以用平均速度 v_avg = v/2，由 t = d / (v/2) = 2d / v 驗算！',
        formula: 'd = ½ a t² = ½ (qE/m) t²　⟹　t = √(2dm / qE)'
      }
    ],
    steps: [
      {
        title: '分析受力與加速度 a（均勻電場 ⇒ 等加速度運動）',
        explanation: '平行板間為均勻電場 $\\vec{E}$（方向由正電板指向負電板）。帶負電質點（電量 $-q$，$q>0$）所受靜電力 $\\vec{F} = -q\\vec{E}$ 與電場方向相反，即**由負電板指向正電板**，量值恆為 $F = qE$。由牛頓第二運動定律，質點獲得朝向正電板的恆定加速度 $a$：',
        katex: 'F = qE \\implies a = \\frac{F}{m} = \\frac{qE}{m} = \\text{常數（朝向正電板）}',
        plainFormula: 'F = qE，　a = qE / m（定值，朝向正電板）',
        presetAction: { label: '重設質點至負板起點', state: { fraction: 0, E: 1, d: 1, m: 1 } }
      },
      {
        title: '第 (a) 小題：求抵達正電板時的末速度 v',
        explanation: '質點由靜止（$v_0 = 0$）出發，以等加速度 $a = \\dfrac{qE}{m}$ 行進距離 $d$ 抵達正電板。利用等加速度運動公式 $v^2 = v_0^2 + 2ad$（或由功能定理：靜電力作功 $W = Fd = qEd = \\Delta K = \\dfrac{1}{2}mv^2 - 0$）：',
        katex: 'v^2 = 0 + 2ad = 2\\left(\\frac{qE}{m}\\right)d \\implies v = \\sqrt{\\frac{2qEd}{m}} \\quad (\\text{方向垂直指向正電板})',
        plainFormula: '(a) 抵達速度 v = √(2qEd / m)，方向朝向正電板',
        presetAction: { label: '檢視抵達正板瞬間 (t = t抵達)', state: { fraction: 1.0 } }
      },
      {
        title: '第 (b) 小題：求飛越板間所需的時間 t',
        explanation: '利用初速為零的等加速度位移公式 $d = \\dfrac{1}{2}at^2$（或代入 $v = at \\Rightarrow t = \\dfrac{v}{a}$）：',
        katex: 'd = \\frac{1}{2} a t^2 = \\frac{1}{2}\\left(\\frac{qE}{m}\\right)t^2 \\implies t = \\sqrt{\\frac{2d}{a}} = \\sqrt{\\frac{2dm}{qE}}',
        plainFormula: '(b) 飛行時間 t = √(2dm / (qE))',
        presetAction: { label: '檢視半程時間 t = 0.5 t抵達 (位移 d/4)', state: { fraction: 0.5 } }
      },
      {
        title: '參數變化分析：改變 E、d 或荷質比 q/m 的影響',
        explanation: '• 由 $v = \\sqrt{2\\left(\\dfrac{q}{m}\\right)Ed}$ 與 $t = \\sqrt{\\dfrac{2d}{(q/m)E}}$ 可知：速度與飛行時間皆取決於粒子的**荷質比 ($q/m$)**。\n• 若固定 $d, m, q$ 而將電場 $E$ 加倍（$2E$）：加速度變為 $2$ 倍，抵達速度變為 $\\sqrt{2}$ 倍，而飛行時間縮短為 $\\dfrac{1}{\\sqrt{2}} \\approx 0.707$ 倍。',
        katex: 'E \\to 2E \\implies a\' = 2a, \\quad v\' = \\sqrt{2}\\,v, \\quad t\' = \\frac{1}{\\sqrt{2}}\\,t',
        plainFormula: '電場加倍時：末速變 √2 倍，飛行時間變 1/√2 倍',
        presetAction: { label: '在模擬器體驗 E = 2 E₀', state: { E: 2.0, d: 1.0, m: 1.0, fraction: 1.0 } }
      }
    ],
    answerSummary: '(a) 抵達正電板的速度 v = √(2qEd / m)，方向垂直朝向正電板。\n(b) 飛行時間 t = √(2dm / (qE))。',
    optionAnalysis: [
      '(a) 速度量值：v = √(2qEd / m)，由 v² = 2ad 或 ½mv² = qEd 導出，方向與電場相反（朝正電板）。',
      '(b) 飛行時間：t = √(2dm / (qE))，由 d = ½at² 導出，注意不可誤用等速公式 d/v 而少乘 2！'
    ],
    pitfall: '常見兩大失誤：(1) 把「電場方向」當成「負電荷運動方向」，忘了負電荷受力 F⃗ = −qE⃗ 與電場反向；(2) 求飛行時間時，算出了末速 v = √(2qEd/m) 後直接用 t = d / v，忘了這是等加速運動（平均速度是 v/2 而非 v），導致根號裡少了一個 2！',
    quizzes: [
      {
        q: '1. 當負電荷飛行時間達到總時間的一半（t\' = ½ t）時，它離開負電板的距離 x 與板距 d 的關係為何？',
        options: ['x = d / 4（且瞬時速率為末速的一半 v / 2）', 'x = d / 2', 'x = d / √2'],
        correct: 0,
        explanation: '初速為 0 的等加速度運動滿足 x ∝ t² 與 v ∝ t。當時間為 1/2 時，速度為 1/2，但位移僅為 (1/2)² = 1/4（即 d/4）！'
      },
      {
        q: '2. 若將實驗中的質點由「電子（質量 mₑ、電量 −e）」換成「帶一價負電的氫離子 H⁻（質量約 1836 mₑ、電量 −e）」，在相同 E 與 d 下：',
        options: ['兩者抵達正板的動能相同（皆為 eEd），但電子的速率較大、飛行時間較短', '兩者抵達正板的速率相同', 'H⁻ 的飛行時間較短'],
        correct: 0,
        explanation: '電力作功 W = eEd 僅與電量及板間電位差 Ed 有關，故兩者末動能相同；但電子質量極小，加速度大，因此電子末速遠大於 H⁻，飛行時間也遠短於 H⁻。'
      }
    ]
  },

  {
    id: '12-2-5',
    n: 5,
    page: '12-16',
    section: '12-2 電場與電力線',
    title: '不帶電中空金屬球殼的感應電場',
    subtitle: '利用「導體靜電屏蔽 E總 = 0」與「電場疊加原理」，不需積分直接求出非均勻感應電荷在球心 O 的電場',
    tags: ['靜電感應', '靜電屏蔽', '電場疊加原理', '球心電場'],
    problem: '有一個原本不帶電的中空金屬球殼，外半徑為 $R$，球心為 $O$（空腔內無任何電荷）。今在球殼左方、距離球心 $O$ 為 $d$（$d > R$）處放置一點電荷 $-Q$（$Q > 0$），如圖所示。當金屬球殼達到靜電平衡時，試求球殼上所有感應電荷在球心 $O$ 點所產生的電場量值與方向為何？（靜電常數為 $k$）',
    subquestions: [
      '提示：球殼外表面的感應電荷分布並不均勻，無法直接用庫侖定律對表面積分，請從球心 O 點的「總電場 E總」切入！'
    ],
    choices: [
      ['(A)', '$0$', '0'],
      ['(B)', '$\\dfrac{kQ}{R^2}$，方向向右', 'kQ / R²，向右'],
      ['(C)', '$\\dfrac{kQ}{d^2}$，方向向右', 'kQ / d²，向右'],
      ['(D)', '$\\dfrac{kQ}{d^2}$，方向向左', 'kQ / d²，向左'],
      ['(E)', '$\\dfrac{kQ}{(d-R)^2}$，方向向右', 'kQ / (d − R)²，向右']
    ],
    givens: [
      '中空金屬球殼：外半徑 R，總淨電量 0',
      '外部點電荷：−Q (Q > 0)，位於球心左方距離 d 處 (d > R)',
      '空腔內部：無電荷',
      '所求物理量：球殼上「感應電荷」在球心 O 產生的電場 E感應'
    ],
    canvasHint: '💡 可在畫布左方直接左右拖曳點電荷 −Q 改變距離 d，或切換電場顯示模式！',
    selects: [
      {
        id: 'fieldMode',
        label: '球心 O 點電場向量顯示模式',
        options: [
          ['all', '同時顯示：外加電場 E外 ＋ 感應電場 E感應 （合力 E總 = 0）'],
          ['external', '只顯示：左方點電荷 −Q 單獨在 O 點產生的 E外'],
          ['induced', '只顯示：球殼感應電荷在 O 點產生的 E感應（本題所求）']
        ],
        defaultVal: 'all'
      }
    ],
    controls: [
      { id: 'd', label: '點電荷至球心距離 d / R', unit: 'R', min: 1.35, max: 3.8, step: 0.05, defaultVal: 2.0 },
      { id: 'Q', label: '外電荷量值 Q', unit: 'Q₀', min: 0.5, max: 2.5, step: 0.1, defaultVal: 1.0 }
    ],
    toggles: [
      { id: 'positiveExt', label: '改放正點電荷 +Q 對照方向變化', defaultVal: false }
    ],
    presets: [
      { label: '🎯 原題預設 (d = 2R, 左側 −Q)', state: { d: 2.0, Q: 1.0, positiveExt: false, fieldMode: 'all' } },
      { label: '🔍 只看外電荷電場 E外 (向左)', state: { fieldMode: 'external', positiveExt: false } },
      { label: '✨ 只看感應電荷電場 E感應 (向右)', state: { fieldMode: 'induced', positiveExt: false } },
      { label: '🔄 對照：若左方改放 +Q', state: { positiveExt: true, fieldMode: 'all' } }
    ],
    legend: [
      { color: '#d95f18', text: '外點電荷在 O 點產生的外加電場 E外' },
      { color: '#0f62fe', text: '球殼感應電荷在 O 點產生的感應電場 E感應' },
      { color: '#0b7b76', text: '球心 O 點合成總電場 E總 = E外 + E感應 = 0' }
    ],
    simNote: '當左方為 −Q 時，球殼左側感應出正電 (+)、右側感應出負電 (−)，因此感應電荷在球心 O 產生的電場由左(+)指向右(−)，恰與向左的 E外 抵消！',
    hints: [
      {
        title: '先區分「球心總電場 E總」與「感應電荷產生的電場 E感應」！',
        question: '題目問的是「O 點的總電場」還是「球殼上感應電荷在 O 點產生的電場」？兩者一樣嗎？',
        guidance: '審題關鍵！因為金屬球殼達到靜電平衡且空腔內無電荷（靜電屏蔽），球心 O 點的「總電場 E總」確實是 0。但 E總 是由「外點電荷 −Q 的電場 E外」與「球殼所有感應電荷的電場 E感應」疊加而成的！既然 E總 = 0 而 E外 ≠ 0，代表 E感應 絕對不為 0（千萬別選 A）！',
        formula: 'E⃗_總(O) = E⃗_外(O) + E⃗_感應(O) = 0⃗　⟹　E⃗_感應(O) = −E⃗_外(O)'
      },
      {
        title: '計算左方點電荷 −Q 單獨在球心 O 產生的外加電場 E⃗_外',
        question: '如果沒有金屬球殼，距離球心 d 的左方點電荷 −Q 在 O 點產生的電場大小與方向為何？',
        guidance: '根據電場疊加原理，點電荷 −Q 在 O 點產生的電場不受球殼存在與否的影響，只與它到 O 點的距離 d 有關（注意不是 R 也不是 d−R！）。因為 −Q 是負電荷（吸引正試驗電荷）且位於 O 點左方，所以 E⃗_外 的方向指向左方！',
        formula: '|E⃗_外(O)| = kQ / d²，　方向：向左（指向左方的 −Q）'
      },
      {
        title: '由 E⃗_外 + E⃗_感應 = 0⃗ 決定感應電場的量值與方向',
        question: '既然 E⃗_外 的大小是 kQ/d²、方向向左，那麼與它完全抵消的 E⃗_感應 是多少？',
        guidance: '為使球心 O 點總電場為零，球殼上所有感應電荷在 O 點產生的合電場 E⃗_感應 必須與 E⃗_外「大小相等、方向相反」！也可以從電荷極化直觀驗證：左方 −Q 吸引正感應電荷到球殼左側、排斥負感應電荷到球殼右側，因此在球心處感應電場由左(+)指向右(−)，即向右！',
        formula: '|E⃗_感應(O)| = kQ / d²，　方向：向右（與向左的 E⃗_外 反向抵消）'
      }
    ],
    steps: [
      {
        title: '步驟一：靜電屏蔽與球心 O 點的電場疊加關係',
        explanation: '當不帶電的中空金屬球殼在外部點電荷作用下達到**靜電平衡**時，由於空腔內部沒有包圍任何電荷，金屬球殼形成**靜電屏蔽**，使得導體實體內以及空腔內部任一點（包含球心 $O$ 點）的**合成總電場 $\\vec{E}_{\\text{總}}$ 處處為零**。\n根據電場疊加原理，球心 $O$ 點的總電場是由「外部點電荷 $-Q$ 單獨產生的電場 $\\vec{E}_{\\text{外}}$」與「球殼表面所有感應電荷共同產生的電場 $\\vec{E}_{\\text{感應}}$」向量相加而成：',
        katex: '\\vec{E}_{\\text{總}}(O) = \\vec{E}_{\\text{外}}(O) + \\vec{E}_{\\text{感應}}(O) = \\vec{0} \\implies \\vec{E}_{\\text{感應}}(O) = -\\vec{E}_{\\text{外}}(O)',
        plainFormula: 'E⃗_總(O) = E⃗_外(O) + E⃗_感應(O) = 0⃗  ⟹  E⃗_感應(O) = −E⃗_外(O)',
        presetAction: { label: '同時顯示 E外 與 E感應 抵消', state: { fieldMode: 'all', positiveExt: false, d: 2.0 } }
      },
      {
        title: '步驟二：求外部點電荷 −Q 在球心 O 產生的電場 E⃗_外',
        explanation: '點電荷 $-Q$ 位於球心 $O$ 左方，與 $O$ 點的直線距離為 $d$。將正試驗電荷置於 $O$ 點時，會受到左方負電荷 $-Q$ 向左的吸引力，因此 $-Q$ 在 $O$ 點產生的外加電場 $\\vec{E}_{\\text{外}}(O)$ 為：',
        katex: 'E_{\\text{外}}(O) = \\frac{kQ}{d^2} \\quad (\\text{方向：向左，指向 }-Q)',
        plainFormula: 'E_外(O) = kQ / d²，方向向左',
        presetAction: { label: '單獨觀察外加電場 E外', state: { fieldMode: 'external', positiveExt: false } }
      },
      {
        title: '步驟三：求球殼感應電荷在球心 O 產生的電場 E⃗_感應',
        explanation: '由 $\\vec{E}_{\\text{感應}}(O) = -\\vec{E}_{\\text{外}}(O)$ 可知，$\\vec{E}_{\\text{感應}}(O)$ 的量值必與 $\\vec{E}_{\\text{外}}(O)$ 相等，且方向相反（即**向右**）：',
        katex: 'E_{\\text{感應}}(O) = \\frac{kQ}{d^2} \\quad (\\text{方向：向右})',
        plainFormula: 'E_感應(O) = kQ / d²，方向向右，故選 (C)',
        presetAction: { label: '單獨觀察感應電場 E感應', state: { fieldMode: 'induced', positiveExt: false } }
      },
      {
        title: '物理圖像驗證：為何感應電場方向向右？為何與半徑 R 無關？',
        explanation: '1. **極化方向驗證**：左方的負電荷 $-Q$ 會吸引金屬球殼內的等效正電荷聚集於球殼左側表面（近端），並排斥自由電子聚集於球殼右側表面（遠端）。因此在球殼內部，感應電荷建立的電場是由左側正電荷指向右側負電荷，方向確實**向右**！\n2. **距離分母辨析**：雖然感應電荷分布在半徑為 $R$ 的球殼表面上，但因為其表面電荷密度並非均勻分布（近端較密、遠端較疏），直接積分後的精確結果恰好要抵消距離 $d$ 處點電荷的場，因此分母必定是點電荷到觀察點的距離平方 $d^2$，而非 $R^2$ 或 $(d-R)^2$！',
        katex: '\\text{左側感應 }+q_{\\text{感}} \\longrightarrow \\vec{E}_{\\text{感應}}\\text{（向右）} \\longrightarrow \\text{右側感應 }-q_{\\text{感}}',
        plainFormula: '球殼左側感應正電(+)、右側感應負電(−) ⟹ 感應電場由左指向右'
      }
    ],
    answerSummary: '球殼上所有感應電荷在球心 O 點產生的電場量值為 kQ / d²，方向向右，答案選 (C)。',
    optionAnalysis: [
      '(A) 錯誤：0 是 O 點的「合成總電場 E總」，而非題目所問的「感應電荷產生的電場 E感應」。',
      '(B) 錯誤：誤用球殼半徑 R 代入分母；感應電荷雖在半徑 R 上，但非均勻分布，其合場強取決於外電荷距離 d。',
      '(C) 正確：E外 = kQ/d² 向左，為使球心 E總 = 0，感應電場 E感應 必為 kQ/d² 向右。',
      '(D) 錯誤：向左是外點電荷 −Q 產生的 E外 方向；感應電場 E感應 必須與它反向（向右）才能抵消。',
      '(E) 錯誤：d − R 是點電荷到球殼左端表面的距離，而非到觀察點（球心 O）的距離 d。'
    ],
    pitfall: '本題是高中靜電學最經典的考題，有三大陷阱：(1) 看到「金屬球殼內部」就反射性選 (A) 0，沒看清題目問的是「感應電荷產生的電場」而非「總電場」；(2) 以為感應電荷在球殼上距球心 R，就選 (B) kQ/R²；(3) 沒注意到外電荷是負電 (−Q)，誤以為外加電場向右而把感應電場選成向左 (D)！',
    quizzes: [
      {
        q: '1. 承原題，若我們想求球殼上所有感應電荷在「球殼內偏離球心 O 的另一點 A（例如空腔內距左方 −Q 距離為 r_A 處）」所產生的電場量值，結果為何？',
        options: ['kQ / r_A²（方向背離左方的 −Q）', '仍為 kQ / d²', '0'],
        correct: 0,
        explanation: '靜電平衡時，整個導體與空腔內部「每一點」的總電場皆為 0！因此在空腔內任意點 A，感應電場 E⃗_感應(A) 都會精確抵消外電荷在 A 點的電場 E⃗_外(A)，故量值為 kQ / r_A²！'
      },
      {
        q: '2. 若把球殼左方距離 d 處的點電荷由「−Q」改換成正電荷「+Q」，則球殼感應電荷在球心 O 產生的電場為何？',
        options: ['量值仍為 kQ / d²，但方向改為向左', '量值仍為 kQ / d²，方向仍向右', '變為 0'],
        correct: 0,
        explanation: '左方改放 +Q 時，E⃗_外 變為向右（kQ/d²），球殼左側感應出負電、右側感應出正電，故 E⃗_感應 改為向左（kQ/d²）以維持 E⃗_總 = 0（可在模擬器勾選「改放正點電荷 +Q」驗證）。'
      }
    ]
  }
];

if (typeof module !== 'undefined') {
  module.exports = { LESSONS_12_2 };
}
