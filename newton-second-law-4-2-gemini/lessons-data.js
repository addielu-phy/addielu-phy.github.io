/* ==========================================================================
   §4-2 牛頓第二運動定律｜10 道例題資料庫（Gemini版）
   教材來源：陳慶仁老師編《第四章 牛頓運動定律》§4-2 牛頓第二運動定律 (p. 4-6 ~ 4-25)
   ========================================================================== */

const TOPIC_GROUPS_4_2 = [
  { key: '五、第二定律解題策略', desc: '畫受力圖、確認受力物與正交分解，建立 F = ma 聯立方程式。' },
  { key: '六、連結體問題', desc: '整體法求系統加速度，隔離法求木塊間正向力與界面摩擦力。' },
  { key: '七、滑輪系統', desc: '定滑輪換向、動滑輪繩長幾何約束 (a₂ = 2a₁) 與多股繩張力系統法。' },
  { key: '八、視重與電梯運動', desc: '區分實重 mg 與磅秤正向力視重 N，結合 v-t 圖面積求位移。' }
];

const LESSONS_4_2 = [
  // =========================================================================
  // 例題 1 (4-2-1): 五、第二定律解題策略 例 1 (p. 4-6)
  // =========================================================================
  {
    id: '4-2-1',
    n: 1,
    page: '4-6',
    section: '§4-2 牛頓第二運動定律',
    topicGroup: '五、第二定律解題策略',
    topicTag: '五、解題策略・例 1',
    title: '手拉定力 vs 懸掛重物：為何加速度不同？',
    subtitle: '比較「直接手拉 5 kgw」與「懸掛 5 kg 重物 B」時，總加速質量與繩張力的關鍵差異',
    tags: ['F = ma', '定滑輪', '整體法與隔離法', '繩張力'],
    problem: '如附圖所示，光滑水平桌面上皆置有一質量 $10\\text{ kg}$ 的木塊，圖(1) 右側細繩由手向下施以等效 $5\\text{ kgw}$ 的拉力，圖(2) 右側細繩則改為懸掛一質量 $5\\text{ kg}$ 的物體 $B$。圖(1)與圖(2)中，桌面物體的加速度分別為 $a_1$ 與 $a_2$，若不計繩重及各項阻力，則下列關係何者正確？',
    subquestions: [
      '比較圖(1) 與圖(2) 的繩張力 $T_1$、$T_2$ 以及桌面木塊加速度 $a_1$、$a_2$ 的比值關係。'
    ],
    choices: [
      ['(A)', '$a_1 = a_2$', 'a₁ = a₂'],
      ['(B)', '$a_1 = 2a_2$', 'a₁ = 2a₂'],
      ['(C)', '$2a_1 = a_2$', '2a₁ = a₂'],
      ['(D)', '$2a_1 = 3a_2$', '2a₁ = 3a₂'],
      ['(E)', '以上皆非', '以上皆非']
    ],
    givens: [
      '桌面木塊質量 M = 10 kg（光滑桌面無摩擦）',
      '圖(1)：手向下施定力 F = 5 kgw (= 5g)',
      '圖(2)：懸掛質量 m = 5 kg 之物體 B',
      '輕繩不可伸長，滑輪與繩重及阻力皆忽略'
    ],
    canvasHint: '💡 點擊「▶ 播放動態模擬」同步比較圖(1)與圖(2)的起跑加速與位移差！',
    selects: [],
    controls: [
      { id: 'M', label: '桌面木塊質量 M', unit: 'kg', min: 2, max: 20, step: 1, defaultVal: 10 },
      { id: 'm', label: '施力等效質量／懸掛質量 m', unit: 'kg', min: 1, max: 15, step: 1, defaultVal: 5 }
    ],
    toggles: [
      { id: 'showTensions', label: '顯示受力與張力向量圖', defaultVal: true },
      { id: 'showCurve', label: '下方顯示 a₁, a₂ 隨質量比曲線', defaultVal: true }
    ],
    presets: [
      { label: '📌 原題預設 (M=10, m=5)', state: { M: 10, m: 5, tAnim: 0 } },
      { label: '⚖️ 兩塊等重 (M=10, m=10)', state: { M: 10, m: 10, tAnim: 0 } },
      { label: '🚀 輕木塊重吊墜 (M=5, m=10)', state: { M: 5, m: 10, tAnim: 0 } }
    ],
    legend: [
      { color: '#0f62fe', text: '圖(1) 手施定力系統（加速度 a₁）' },
      { color: '#d95f18', text: '圖(2) 懸掛重物 B 系統（加速度 a₂）' },
      { color: '#0b7b76', text: '外力／繩張力向量 T₁, T₂' }
    ],
    simNote: '本模擬以 g = 10 m/s² 換算牛頓數值；手施定力 5 kgw = 50 N，但圖(2) 中重物 B 本身也要分擔合力來加速，故張力 T₂ < 50 N。',
    hints: [
      {
        title: '先確認兩張圖中「繩上的張力」都等於 5 kgw 嗎？',
        question: '在圖(2) 中，懸掛的 5 kg 物體 B 是靜止不動，還是一起向下加速？這對繩張力 T₂ 有何影響？',
        guidance: '圖(1) 的手直接對繩施力 5 kgw，因此繩張力確定等於 5g。但在圖(2) 中，物體 B 向下加速 (a₂ > 0)，代表向下的重力 5g 必須大於向上的繩張力 T₂（即 5g − T₂ = 5a₂），所以 T₂ 一定小於 5g！',
        formula: '圖(1)：T₁ = mg　｜　圖(2)：T₂ = mg − ma₂ < mg'
      },
      {
        title: '比較兩系統「被加速的總質量」分別是多少？',
        question: '寫出圖(1) 與圖(2) 的淨驅動力與總加速質量，分別列出牛頓第二定律。',
        guidance: '兩圖提供的淨驅動力都是 5g（50 N）。但圖(1) 只需加速桌面上的 10 kg 木塊；圖(2) 則必須同時加速「桌上的 10 kg ＋ 懸掛的 5 kg」共 15 kg 的總質量！',
        formula: '圖(1)：5g = 10·a₁　｜　圖(2)：5g = (10 + 5)·a₂'
      },
      {
        title: '計算 a₁ 與 a₂ 的比值並化為整數關係式',
        question: '求出 a₁ 與 a₂ 各為 g 的幾分之幾，檢查哪一個選項成立？',
        guidance: '由 a₁ = (5/10)g = g/2 與 a₂ = (5/15)g = g/3，可得 a₁ : a₂ = 1/2 : 1/3 = 3 : 2，交叉相乘即得 2a₁ = 3a₂。',
        formula: 'a₁ / a₂ = (M + m) / M = 15 / 10 = 3 / 2　⟹　2a₁ = 3a₂'
      }
    ],
    steps: [
      {
        title: '分析圖(1)：手施定力，僅加速單一木塊',
        explanation: '圖(1) 中，手在繩端直接施以定力 $F = 5\\text{ kgw} = 5g$（不計手之質量參與系統），因此細繩上的張力恆為 $T_1 = 5g$。僅對桌面 $M = 10\\text{ kg}$ 的木塊列運動方程式：',
        katex: 'T_1 = mg = M a_1 \\implies a_1 = \\frac{m}{M}g = \\frac{5}{10}g = \\frac{1}{2}g',
        plainFormula: 'a₁ = (m / M)g = (5 / 10)g = 0.5 g （若 g = 10 m/s²，則 a₁ = 5.0 m/s²）',
        presetAction: { label: '重置為原題 M=10 kg, m=5 kg', state: { M: 10, m: 5, tAnim: 0 } }
      },
      {
        title: '分析圖(2)：整體法與隔離法求懸掛系統加速度與張力',
        explanation: '圖(2) 中，桌面木塊 $M$ 與懸掛物體 $B$（質量 $m = 5\\text{ kg}$）以細繩相連，兩者加速度大小同為 $a_2$。以整體 $(M + m)$ 為系統，外力為 $B$ 所受重力 $mg$：',
        katex: 'mg = (M + m)a_2 \\implies a_2 = \\frac{m}{M + m}g = \\frac{5}{10 + 5}g = \\frac{1}{3}g',
        plainFormula: 'a₂ = [m / (M + m)]g = (5 / 15)g = (1/3)g ≈ 3.33 m/s²',
        presetAction: { label: '檢視張力 T₁ 與 T₂ 差異', state: { M: 10, m: 5, showTensions: true } }
      },
      {
        title: '用隔離法驗證：為何圖(2) 繩張力 T₂ 較小？',
        explanation: '若單獨分析懸掛物 $B$，可得 $mg - T_2 = ma_2$，故繩張力 $T_2 = m(g - a_2) = \\dfrac{Mm}{M+m}g = \\dfrac{10 \\times 5}{15}g = \\dfrac{10}{3}g \\approx 3.33\\text{ kgw} < 5\\text{ kgw}$。正因部分重力需用來使 $B$ 本身向下加速，傳給桌面木塊的張力才會變小。',
        katex: 'T_2 = M a_2 = \\frac{Mm}{M+m}g = \\frac{10}{3}g < T_1 = 5g',
        plainFormula: 'T₂ = (10/3)g ≈ 33.3 N < T₁ = 50 N'
      },
      {
        title: '求兩者加速度之比例關係',
        explanation: '比較 $a_1 = \\dfrac{1}{2}g$ 與 $a_2 = \\dfrac{1}{3}g$：',
        katex: '\\frac{a_1}{a_2} = \\frac{\\frac{1}{2}g}{\\frac{1}{3}g} = \\frac{3}{2} \\implies 2a_1 = 3a_2',
        plainFormula: 'a₁ : a₂ = 3 : 2  ⟹  2a₁ = 3a₂，故選 (D)'
      }
    ],
    answerSummary: '正確答案為 (D) 2a₁ = 3a₂。（a₁ = 0.5g，a₂ = g/3，圖(1) 加速度為圖(2) 的 1.5 倍）',
    optionAnalysis: [
      '(A) 錯誤：誤以為懸掛 5 kg 重物時繩張力也等於 5 kgw，忽略重物 B 自身向下加速會消耗部分重力。',
      '(B) 錯誤：比例計算錯誤（除非 M = m，此時 a₁ = g 且 a₂ = g/2 才會有 a₁ = 2a₂）。',
      '(C) 錯誤：大小顛倒，手拉系統總加速質量較小，故 a₁ 必定大於 a₂。',
      '(D) 正確：a₁ = (5/10)g = g/2，a₂ = (5/15)g = g/3，故 2a₁ = 3a₂。',
      '(E) 錯誤：(D) 已完全符合。'
    ],
    pitfall: '高二段考最常考的直覺陷阱：看到右端掛了一個 5 kg 的砝碼，就直覺寫出「繩張力 T = 5 kgw」！切記只有在系統「靜止或等速」時繩張力才等於砝碼重量；只要系統向右／向下加速，懸掛物合力向下，繩張力 T₂ = m(g − a₂) 必嚴格小於物重 mg！',
    quizzes: [
      {
        q: '1. 在圖(2) 釋放加速的過程中，連接桌面木塊與物體 B 的細繩張力 T₂ 與 B 的重量 5 kgw 相比為何？',
        options: ['T₂ = 5 kgw', 'T₂ < 5 kgw（約 3.33 kgw）', 'T₂ > 5 kgw'],
        correct: 1,
        explanation: '物體 B 向下加速 a₂ > 0，代表向下的重力 5g 必須大於向上的繩張力 T₂，故 T₂ = 5(g − a₂) < 5g。'
      },
      {
        q: '2. 承原題，若改把桌上的 10 kg 木塊換成與 B 同樣的 5 kg（即 M = 5 kg, m = 5 kg），則此時 a₁ 與 a₂ 的關係會變成何者？',
        options: ['2a₁ = 3a₂', 'a₁ = 2a₂', 'a₁ = a₂'],
        correct: 1,
        explanation: '當 M = m 時，a₁ = (m/M)g = g，a₂ = [m/(m+m)]g = g/2，因此 a₁ = 2a₂！可用上方模擬器設 M=5, m=5 親自驗證。'
      }
    ]
  },

  // =========================================================================
  // 例題 2 (4-2-2): 五、第二定律解題策略 例 2 (p. 4-6 ~ 4-7)
  // =========================================================================
  {
    id: '4-2-2',
    n: 2,
    page: '4-6 ～ 4-7',
    section: '§4-2 牛頓第二運動定律',
    topicGroup: '五、第二定律解題策略',
    topicTag: '五、解題策略・例 2',
    title: '輕汽球拋棄沙包問題：如何反轉等加速度方向？',
    subtitle: '掌握「浮力 B 恆定」與「總質量改變」兩大條件，避開「以為只拋棄 ma/g 或 2ma/g」的陷阱',
    tags: ['浮力與重力', '變質量系統', '方向反轉', '沙包類題'],
    problem: '一質量可不計的輕汽球，以一輕繩繫吊一質量為 $m$ 的物體作等加速度 $a$ 向下運動。若汽球之浮力不變，欲使汽球作等加速度 $a$ 向上運動，則應拋棄_______質量。（用 $m$、$a$、$g$ 表示）',
    subquestions: [
      '試推導出拋棄質量 x 必須滿足的代數式，並比較「懸浮不升降」與「等加速 a 上升」所需拋棄質量的差異。'
    ],
    choices: [],
    givens: [
      '氣球自身質量可忽略（總質量即為懸吊物體質量）',
      '原狀態：總質量 m，以加速度 a 向下運動',
      '氣球體積不變 ⟹ 向上浮力 B 保持定值',
      '目標狀態：拋棄質量 x 後，以等加速度 a 向上運動'
    ],
    canvasHint: '💡 拖曳右側滑桿調整「拋棄質量比例 Δm/m」，觀察氣球由下降→懸浮→加速上升的轉折！',
    selects: [],
    controls: [
      { id: 'agRatio', label: '題目設定加速度比 a / g', unit: 'g', min: 0.05, max: 0.70, step: 0.05, defaultVal: 0.25 },
      { id: 'dropRatio', label: '拋棄質量比例 Δm / m', unit: 'm', min: 0.00, max: 0.85, step: 0.01, defaultVal: 0.40 }
    ],
    toggles: [
      { id: 'showForces', label: '顯示浮力 B 與重力 mg 向量', defaultVal: true }
    ],
    presets: [
      { label: '⬇️ 尚未拋棄 (Δm = 0)', state: { agRatio: 0.25, dropRatio: 0.00 } },
      { label: '⏸ 恰不升降平衡 (Δm = am/g)', state: { agRatio: 0.25, dropRatio: 0.25 } },
      { label: '⬆️ 原題目標上升 a (Δm = 2am/(g+a))', state: { agRatio: 0.25, dropRatio: 0.40 } },
      { label: '🔥 高加速 a = 0.5g 目標 (Δm = 2/3 m)', state: { agRatio: 0.50, dropRatio: 0.67 } }
    ],
    legend: [
      { color: '#0b7b76', text: '氣球向上浮力 B = m(g − a)（恆定不變）' },
      { color: '#d95f18', text: '懸吊物體重力 (m − Δm)g（向下）' },
      { color: '#0f62fe', text: '加速度曲線 a\'(Δm/m) 與目標點' }
    ],
    simNote: '在預設 a = 0.25g 下，懸浮平衡點在 Δm = 0.25m；要達到等加速 a 向上運動，因總質量也減小為 (m − Δm)，只需拋棄 2(0.25)/(1+0.25) = 0.40m 即可（小於 0.50m）！',
    hints: [
      {
        title: '先從「向下加速 a」求出不變的浮力 B',
        question: '質量 m 向下作等加速度 a 運動時，向下的重力 mg 與向上的浮力 B 誰比較大？列式求出 B。',
        guidance: '因為加速度方向向下，代表向下的重力 mg 大於向上的浮力 B。依牛頓第二定律（向下為正）：mg − B = ma，因此浮力 B = m(g − a)。',
        formula: 'mg − B = ma　⟹　B = m(g − a)'
      },
      {
        title: '列出拋棄質量 x 後「向上加速 a」的方程式',
        question: '拋棄質量 x 後，剩下的總質量是多少？此時的向下重力與合力 ma 項分別如何變化？',
        guidance: '氣球本身質量不計，拋棄 x 後剩餘質量為 (m − x)。此時合力向上，依牛頓第二定律（向上為正）：B − (m − x)g = (m − x)a。注意等號右邊的質量也要改成 (m − x)！',
        formula: 'B − (m − x)g = (m − x)a'
      },
      {
        title: '將兩式聯立消去浮力 B，解出 x',
        question: '把第一式 mg − B = ma 與第二式 B − (m − x)g = (m − x)a 相加，可以得到什麼？',
        guidance: '兩式相加正好把未知數 B 消掉：mg − (m − x)g = ma + (m − x)a，化簡左邊得 xg，右邊得 (2m − x)a，移項把 x 集中即得解答。',
        formula: 'xg = (2m − x)a　⟹　x(g + a) = 2ma　⟹　x = 2ma / (g + a)'
      }
    ],
    steps: [
      {
        title: '步驟 1：對拋棄前的下降狀態列運動方程式',
        explanation: '氣球與懸吊物總質量為 $m$，受向下重力 $mg$ 與向上浮力 $B$。因整體以加速度 $a$ <strong>向下</strong>運動，取向下為正方向：',
        katex: 'mg - B = ma \\qquad \\cdots\\text{(1)}',
        plainFormula: 'mg − B = ma  ⟹  B = m(g − a)',
        presetAction: { label: '切換為未拋棄下降狀態 (Δm = 0)', state: { agRatio: 0.25, dropRatio: 0.00 } }
      },
      {
        title: '步驟 2：對拋棄質量 x 後的上升狀態列運動方程式',
        explanation: '拋棄質量 $x$ 後，氣球體積未變故浮力 $B$ 保持不變，但系統總質量降為 $(m - x)$，重力降為 $(m - x)g$。因氣球以等加速度 $a$ <strong>向上</strong>運動，取向上為正方向：',
        katex: 'B - (m - x)g = (m - x)a \\qquad \\cdots\\text{(2)}',
        plainFormula: 'B − (m − x)g = (m − x)a',
        presetAction: { label: '切換為目標上升狀態 (Δm = 0.40m)', state: { agRatio: 0.25, dropRatio: 0.40 } }
      },
      {
        title: '步驟 3：兩式相加消去浮力 B，解出拋棄質量 x',
        explanation: '將 $(1) + (2)$ 直接消去浮力 $B$：',
        katex: 'xg = (2m - x)a \\implies x(g + a) = 2ma \\implies x = \\frac{2ma}{g + a}',
        plainFormula: 'x = 2ma / (g + a)'
      },
      {
        title: '補充對比：若只要「恰不升降（a\' = 0）」需拋棄多少？',
        explanation: '若只要求氣球懸浮靜止（$a\' = 0$），則 $B = (m - x_0)g \\implies m(g - a) = (m - x_0)g \\implies x_0 = \\dfrac{ma}{g}$。可見反轉為等加速 $a$ 上升所需的 $x = \\dfrac{2ma}{g+a}$ 並<strong>不是</strong> $2x_0 = \\dfrac{2ma}{g}$，因為拋棄質量同時也減輕了慣性質量 $(m - x)$！',
        katex: 'x_{\\text{懸浮}} = \\frac{ma}{g}, \\qquad x_{\\text{向上加速 }a} = \\frac{2ma}{g + a} < \\frac{2ma}{g}',
        plainFormula: '懸浮平衡點 x₀ = ma/g；等加速上升點 x = 2ma/(g+a)',
        presetAction: { label: '檢視懸浮平衡點 (Δm = 0.25m)', state: { agRatio: 0.25, dropRatio: 0.25 } }
      }
    ],
    answerSummary: '應拋棄的質量為 x = 2ma / (g + a)。',
    optionAnalysis: [
      '常見錯誤答案 2ma / g：忘記拋棄質量後，牛頓第二定律等號右邊的慣性質量已從 m 減為 (m − x)。',
      '正解 2ma / (g + a)：因為減輕質量使系統更容易被加速，故所需拋棄的質量比 2ma/g 還要少一點。'
    ],
    pitfall: '許多同學用「減輕 1 ma/g 可讓加速度變為 0，再減輕 1 ma/g 就能向上加速 a」的直覺去湊，會誤算出 2ma/g！這是忽略了「被拋棄的質量本身也不需要再被浮力加速了」，所以等號右邊是 (m − x)a 而不是 ma！',
    quizzes: [
      {
        q: '1.【講義 p.4-7 類題】氣球載有沙包 2 包時，以加速度 a 上升；載有沙包 6 包時，以加速度 a 下降（原講義誤印為速度a，依解析為加速度a）。若不計氣球質量及沙包浮力，欲使其不升降應載沙包幾包？',
        options: ['(A) 3 包', '(B) 4 包', '(C) 5 包', '(D) 6 包', '(E) 0 包'],
        correct: 0,
        explanation: '設氣球浮力為 F，每包質量 m。F − 2mg = 2ma，且 6mg − F = 6ma。兩式相加得 4mg = 8ma ⟹ a = g/2，代回得 F = 3mg，故不升降應載 3 包，選 (A)！'
      },
      {
        q: '2. 若 a = 0.25g，欲使原本向下加速 a 的氣球改為「靜止懸浮（加速度為 0）」，應拋棄多少比例的質量？',
        options: ['0.20 m', '0.25 m', '0.40 m'],
        correct: 1,
        explanation: '懸浮時浮力等於剩餘重力：m(g − a) = (m − x₀)g ⟹ x₀ = (a/g)m = 0.25m。'
      }
    ]
  },

  // =========================================================================
  // 例題 3 (4-2-3): 五、第二定律解題策略 例 3〈繩子之最大張力〉 (p. 4-7 ~ 4-8)
  // =========================================================================
  {
    id: '4-2-3',
    n: 3,
    page: '4-7 ～ 4-8',
    section: '§4-2 牛頓第二運動定律',
    topicGroup: '五、第二定律解題策略',
    topicTag: '五、解題策略・例 3',
    title: '繩子之最大張力：猴子下滑與爬繩極限',
    subtitle: '結合受力不等式 T ≤ T_max，比較「向下滑（最小加速度）」與「向上爬（最大加速度）」',
    tags: ['繩子最大負荷', '不等式條件', '下滑減張力', '上爬增張力'],
    problem: '質量為 $20$ 公斤的猴子沿著一輕繩自樹上滑下，此繩之最大負荷為 $120$ 牛頓，設重力加速度為 $10\\text{ m/s}^2$，欲使該繩不斷裂，則該猴子的最小加速度之量值為多少？',
    subquestions: [
      '比較當猴子「靜止抓緊（a = 0）」、「以加速度 a = 2 m/s² 慢速下滑」與「加速 a ≥ 4 m/s² 下滑」時繩張力是否超過 120 N。'
    ],
    choices: [
      ['(A)', '$4\\text{ m/s}^2$', '4 m/s²'],
      ['(B)', '$3\\text{ m/s}^2$', '3 m/s²'],
      ['(C)', '$1\\text{ m/s}^2$', '1 m/s²'],
      ['(D)', '$2\\text{ m/s}^2$', '2 m/s²'],
      ['(E)', '$2.7\\text{ m/s}^2$', '2.7 m/s²']
    ],
    givens: [
      '猴子質量 m = 20 kg（重力 mg = 200 N）',
      '輕繩最大可承受張力 T_max = 120 N',
      '重力加速度 g = 10 m/s²',
      '因為 mg = 200 N > T_max = 120 N，猴子無法靜止抓在繩上，必須向下加速'
    ],
    canvasHint: '💡 調整「加速度量值 a」或切換「人向上爬類題」，即時看右側張力計量表何時亮紅燈斷裂！',
    selects: [
      {
        id: 'mode',
        label: '情境模式（切換原題與講義類題）',
        options: [
          ['monkey_down', '🐒 原題：20 kg 猴子沿繩下滑 (T_max = 120 N)'],
          ['person_up', '🧗 類題：45 kg 人沿繩向上爬 (T_max = 630 N)']
        ],
        defaultVal: 'monkey_down'
      }
    ],
    controls: [
      { id: 'a', label: '加速度量值 a', unit: 'm/s²', min: 0.0, max: 10.0, step: 0.2, defaultVal: 4.0 }
    ],
    toggles: [
      { id: 'showForces', label: '顯示猴子／人受力向量 (mg, T)', defaultVal: true }
    ],
    presets: [
      { label: '✅ 原題臨界不斷裂 (a = 4.0 m/s²)', state: { mode: 'monkey_down', a: 4.0 } },
      { label: '💥 下滑太慢斷裂 (a = 2.0 m/s²)', state: { mode: 'monkey_down', a: 2.0 } },
      { label: '🪂 自由落體鬆手 (a = 10.0 m/s²)', state: { mode: 'monkey_down', a: 10.0 } },
      { label: '🧗 類題上爬極限 (a = 4.0 m/s²)', state: { mode: 'person_up', a: 4.0 } }
    ],
    legend: [
      { color: '#d95f18', text: '向下重力 mg' },
      { color: '#0b7b76', text: '繩子對人的向上張力 T（安全區 ≤ T_max）' },
      { color: '#c9372c', text: '超過 T_max 斷裂警戒線' }
    ],
    simNote: '當運動加速向下時，T = m(g − a) 隨 a 增大而「變小」；當向上加速爬升時，T = m(g + a) 隨 a 增大而「變大」。',
    hints: [
      {
        title: '比較猴子重量 mg 與繩子最大負荷 T_max',
        question: '這隻 20 kg 猴子有多重？如果牠想乖乖抓緊繩子靜止不動（或等速下滑），繩子承受得了嗎？',
        guidance: '猴子的重量 mg = 20 × 10 = 200 N，遠大於繩子最多只能承受的 120 N！因此若 a = 0（靜止或等速），繩張力 T = 200 N 會瞬間拉斷繩子。',
        formula: 'mg = 20 × 10 = 200 N > T_max = 120 N'
      },
      {
        title: '列出猴子沿繩向下加速時的運動方程式',
        question: '當猴子以加速度 a 向下滑落時，重力 mg 與繩張力 T 誰比較大？寫出 T 與 a 的關係。',
        guidance: '因為加速度向下，故向下的合力為 mg − T = ma，即繩張力 T = m(g − a)。猴子滑得越快（向下加速度 a 越大），需要繩子拉住的力 T 就越小！',
        formula: 'mg − T = ma　⟹　T = m(g − a)'
      },
      {
        title: '代入安全條件 T ≤ T_max 解出最小加速度',
        question: '令 T = m(g − a) ≤ 120 N，代入 m = 20 kg 與 g = 10 m/s²，求出 a 的下限。',
        guidance: '20(10 − a) ≤ 120 ⟹ 10 − a ≤ 6 ⟹ a ≥ 4 m/s²。所以只要向下加速度至少為 4 m/s²，繩子張力就不會超過 120 N。',
        formula: '20 × (10 − a) ≤ 120　⟹　a ≥ 4 m/s²'
      }
    ],
    steps: [
      {
        title: '步驟 1：確認受力與運動方向，建立動力學方程式',
        explanation: '以猴子為受力物，受向下重力 $mg = 20 \\times 10 = 200\\text{ N}$ 與繩子向上之摩擦力／張力 $T$（作用力與反作用力等大）。因猴子以加速度 $a$ <strong>向下</strong>運動，取向下為正方向：',
        katex: 'mg - T = ma \\implies T = m(g - a)',
        plainFormula: 'mg − T = ma  ⟹  T = m(g − a)',
        presetAction: { label: '檢視臨界狀態 a = 4.0 m/s²', state: { mode: 'monkey_down', a: 4.0 } }
      },
      {
        title: '步驟 2：代入繩子最大張力限制條件',
        explanation: '欲使繩子不斷裂，繩張力必須滿足 $T \\le T_{\\max} = 120\\text{ N}$：',
        katex: 'm(g - a) \\le T_{\\max} \\implies 20(10 - a) \\le 120 \\implies 10 - a \\le 6 \\implies a \\ge 4\\text{ m/s}^2',
        plainFormula: '20(10 − a) ≤ 120  ⟹  a ≥ 4 m/s²（最小加速度為 4 m/s²）',
        presetAction: { label: '模擬下滑太慢斷繩 (a = 2.0 m/s²)', state: { mode: 'monkey_down', a: 2.0 } }
      },
      {
        title: '步驟 3：對照「向上爬」類題的物理差異',
        explanation: '若改為人沿繩<strong>向上</strong>以加速度 $a$ 爬升，則向上張力必須克服重力並提供向上合力：$T - mg = ma \\implies T = m(g + a) \\le T_{\\max}$。此時變成加速度越大張力越大，故存在的是「<strong>最大</strong>安全加速度 $a_{\\max} = \\dfrac{T_{\\max}}{m} - g$」。',
        katex: '\\text{上爬類題：} 45(10 + a) \\le 630 \\implies 10 + a \\le 14 \\implies a \\le 4\\text{ m/s}^2',
        plainFormula: '上爬類題：45×10 + 45a ≤ 630  ⟹  a ≤ 4 m/s²',
        presetAction: { label: '切換至類題：人向上爬極限', state: { mode: 'person_up', a: 4.0 } }
      }
    ],
    answerSummary: '原題正確答案為 (A) 4 m/s²。（當 a = 4 m/s² 時，T = 20×(10−4) = 120 N 恰達繩子極限；若 a < 4 m/s² 繩會斷）',
    optionAnalysis: [
      '(A) 正確：a = 4 m/s² 時 T = 120 N；a ≥ 4 m/s² 皆不斷裂，故最小加速度量值為 4 m/s²。',
      '(B) 錯誤：若 a = 3 m/s²，則 T = 20×(10 − 3) = 140 N > 120 N，繩斷。',
      '(C) 錯誤：若 a = 1 m/s²，則 T = 20×(10 − 1) = 180 N > 120 N，繩斷。',
      '(D) 錯誤：若 a = 2 m/s²，則 T = 20×(10 − 2) = 160 N > 120 N，繩斷。',
      '(E) 錯誤：2.7 m/s² < 4 m/s²，繩張力仍超過 120 N。'
    ],
    pitfall: '學生常把「最小加速度」與「最大加速度」背反！只要用生活直覺想：往下掉時「鬆手不抓（a = g 自由落體）」繩子最輕鬆（T = 0）；想抓太緊減速太慢（a 太小）反而把繩子扯斷！反之往上爬時越急（a 越大）用力越猛、張力越大！',
    quizzes: [
      {
        q: '1.【講義 p.4-7 類題】一繩能提供之最大張力為 630 牛頓，一人質量 45 kg，g = 10 m/s²，欲沿此繩向上爬之最大加速度為何？',
        options: ['(A) 0', '(B) 2 m/s²', '(C) 4 m/s²', '(D) 18 m/s²', '(E) 1.3 m/s²'],
        correct: 2,
        explanation: '人向上加速時 T − mg = ma ⟹ T = 45×10 + 45a ≤ 630 ⟹ 45a ≤ 180 ⟹ a ≤ 4 m/s²，故選 (C)！'
      },
      {
        q: '2. 回到原題，如果這隻 20 kg 的猴子改為「完全放開手自由落下」，繩上的張力 T 會變成多少？',
        options: ['120 N', '200 N', '0 N'],
        correct: 2,
        explanation: '自由落體加速度 a = g = 10 m/s²，代入 T = m(g − a) = 20×(10 − 10) = 0 N。'
      }
    ]
  },

  // =========================================================================
  // 例題 4 (4-2-4): 六、連結體問題 例 1〈推力與正向力〉 (p. 4-11)
  // =========================================================================
  {
    id: '4-2-4',
    n: 4,
    page: '4-11',
    section: '§4-2 牛頓第二運動定律',
    topicGroup: '六、連結體問題',
    topicTag: '六、連結體・例 1',
    title: '斜切雙木塊推力問題：整體求 a，隔離斜向分解求 N',
    subtitle: '觀察斜切面夾角 θ 如何決定正向力 N 的幾何方向（Nsinθ = F/2），而非誤以為是 cosθ',
    tags: ['連結體', '整體法與隔離法', '斜向正向力', '三角函數分辨'],
    problem: '在光滑水平面上，把一長方體沿斜角 $\\theta$ 切成如附圖所示之質量相等的 $A$、$B$ 兩部分（斜切面與底面夾角為 $\\theta$），今在左側施一水平推力 $F$ 推 $A$。若 $A$、$B$ 間無摩擦，設 $A$、$B$ 之相對位置不變共同加速前進，則 $A$、$B$ 間之正向力 $N$ 量值為何？',
    subquestions: [
      '寫出 B 木塊水平方向的運動方程式，找出水平分力與推力 F 的關係，並從幾何角度確認角度 θ 所在位置。'
    ],
    choices: [
      ['(A)', '$\\dfrac{F}{2}\\csc\\theta$', '(F/2) cscθ'],
      ['(B)', '$\\dfrac{F}{2}\\cos\\theta$', '(F/2) cosθ'],
      ['(C)', '$\\dfrac{F}{2}\\tan\\theta$', '(F/2) tanθ'],
      ['(D)', '$\\dfrac{F}{2}\\sin\\theta$', '(F/2) sinθ'],
      ['(E)', '$\\dfrac{F}{2}\\cot\\theta$', '(F/2) cotθ']
    ],
    givens: [
      'A、B 質量相等：m_A = m_B = m（預設 m_B / (m_A + m_B) = 0.5）',
      '所有接觸面均光滑無摩擦（含地面與 A、B 切面）',
      '切面與水平面夾角為 θ',
      'A、B 相對位置不變 ⟹ 兩者具有相同的水平加速度 a'
    ],
    canvasHint: '💡 拖曳「切面角度 θ」滑桿，直接對比斜切面角度 θ 與 B 隔離圖中 N 的垂直夾角 θ！',
    selects: [],
    controls: [
      { id: 'theta', label: '切面與水平夾角 θ', unit: '°', min: 20, max: 85, step: 1, defaultVal: 53 },
      { id: 'F', label: '水平推力 F', unit: 'N', min: 20, max: 200, step: 10, defaultVal: 100 },
      { id: 'massRatioB', label: 'B 佔總質量比例 m_B/(m_A+m_B)', unit: '', min: 0.1, max: 0.9, step: 0.05, defaultVal: 0.50 }
    ],
    toggles: [
      { id: 'showDecomp', label: '顯示 N 的水平 (Nsinθ) 與鉛直 (Ncosθ) 分量', defaultVal: true }
    ],
    presets: [
      { label: '📐 原題等質量 θ = 53°', state: { theta: 53, F: 100, massRatioB: 0.50 } },
      { label: '🎯 特例 θ = 30° (N = F)', state: { theta: 30, F: 100, massRatioB: 0.50 } },
      { label: '🧱 接近垂直切面 θ = 85° (N → F/2)', state: { theta: 85, F: 100, massRatioB: 0.50 } },
      { label: '⚠️ 平緩切面 θ = 25° (N 急遽放大)', state: { theta: 25, F: 100, massRatioB: 0.50 } }
    ],
    legend: [
      { color: '#0f62fe', text: 'A 對 B 之總正向力 N（垂直於切面）' },
      { color: '#0b7b76', text: 'N 的水平推力分量 Nsinθ = (m_B/m總)F' },
      { color: '#d95f18', text: 'N 的鉛直頂升分量 Ncosθ' }
    ],
    simNote: '當 θ 越小（切面越平緩）時，N 的方向越偏近鉛直，能提供水平加速的 sinθ 分量越小，因此為了維持 F/2 的水平合力，總正向力 N = (F/2)/sinθ 必須非常大！（注意：若現實中鉛直分量 Ncosθ 超過 m_Bg，B 就會沿斜面滑上 A；題目假設相對位置不變代表尚未滑起。）',
    hints: [
      {
        title: '步驟一：先用「整體法」算出 B 需要的水平淨力',
        question: '把 A 和 B 看成一個整體，外力 F 推動質量相等的兩塊加速，B 獲得的水平合力是多少？',
        guidance: '設 m_A = m_B = m，整體總質量為 2m，因此系統加速度 a = F / (2m)。單獨看 B 木塊，它獲得的水平方向淨力為 m·a = m·(F/2m) = F/2！',
        formula: 'a = F / (2m)　⟹　F_B水平 = m·a = F / 2'
      },
      {
        title: '步驟二：找出正向力 N 的方向與角度 θ 的位置',
        question: '切面與「水平面」夾角為 θ，那麼「垂直於切面」的正向力 N 是與水平夾 θ，還是與鉛直夾 θ？',
        guidance: '兩直線若與兩座標軸分別垂直，則夾角相等！切面與水平線夾 θ ⟹ 切面的法線（正向力 N）必與鉛直線夾 θ！因此 N 的「水平分量」是對邊 N·sinθ，而「鉛直分量」才是鄰邊 N·cosθ！',
        formula: 'N_水平 = N sinθ（對邊），　N_鉛直 = N cosθ（鄰邊）'
      },
      {
        title: '步驟三：令水平分量等於 F/2，求出 N',
        question: 'B 在水平方向只受到正向力 N 的水平分量推動，將 N sinθ = F/2 移項求解！',
        guidance: 'N sinθ = F/2 ⟹ N = F / (2 sinθ) = (F/2) cscθ。檢驗極限情況：當 θ → 90°（切面變成垂直牆）時，sin90° = 1，N = F/2，完全吻合垂直面接觸的常識！',
        formula: 'N sinθ = F / 2　⟹　N = (F / 2) / sinθ = (F / 2) cscθ'
      }
    ],
    steps: [
      {
        title: '步驟 1：整體法求系統加速度與 B 所需水平合力',
        explanation: '設 $m_A = m_B = m$，因 $A$、$B$ 相對位置不變，整體具有相同向右加速度 $a$：',
        katex: 'a = \\frac{F}{m_A + m_B} = \\frac{F}{2m} \\implies \\text{對 B 之水平淨力 } F_{Bx} = m_B a = \\frac{F}{2}',
        plainFormula: '整體 a = F / (2m)，故 B 所需水平合力為 F/2',
        presetAction: { label: '重置為原題 θ = 53°', state: { theta: 53, F: 100, massRatioB: 0.50 } }
      },
      {
        title: '步驟 2：隔離 B 木塊，解析正向力 N 的幾何角度',
        explanation: '$A$ 與 $B$ 的切面和水平面夾 $\\theta$ 角。因為正向力 $\\vec{N}$ 必定<strong>垂直於接觸切面</strong>，利用「兩角邊互相垂直」的幾何性質，可知 $\\vec{N}$ 與<strong>鉛直方向</strong>夾角為 $\\theta$。將 $\\vec{N}$ 分解為水平與鉛直分量：',
        katex: 'N_x = N\\sin\\theta \\quad (\\text{向右}), \\qquad N_y = N\\cos\\theta \\quad (\\text{向上})',
        plainFormula: 'N 的水平分量 = N sinθ，鉛直分量 = N cosθ'
      },
      {
        title: '步驟 3：列 B 的水平運動方程式求解 N',
        explanation: '因所有表面無摩擦，$B$ 在水平方向唯一的外力就是來自 $A$ 的正向力水平分量 $N\\sin\\theta$：',
        katex: 'N\\sin\\theta = m_B a = \\frac{F}{2} \\implies N = \\frac{F}{2\\sin\\theta} = \\frac{F}{2}\\csc\\theta',
        plainFormula: 'N = (F / 2) cscθ，故選 (A)',
        presetAction: { label: '檢視極端角 θ = 30° 時 N = F', state: { theta: 30, F: 100, massRatioB: 0.50 } }
      }
    ],
    answerSummary: '正確答案為 (A) (F/2) cscθ。（當 A、B 等重時，N sinθ = F/2 ⟹ N = (F/2) cscθ）',
    optionAnalysis: [
      '(A) 正確：正向力 N 的水平分量為 N sinθ = F/2，故 N = (F/2) cscθ。',
      '(B) 錯誤：誤把 sinθ 放在分子且搞錯水平分量位置（當 θ → 90° 時這會讓 N → 0，不合理）。',
      '(C) 錯誤：tanθ 無法從斜邊 N 分解得出。',
      '(D) 錯誤：把 N sinθ = F/2 錯寫成 N = (F/2) sinθ，方向反了。',
      '(E) 錯誤：水平與鉛直無關聯為 cotθ。'
    ],
    pitfall: '這題最經典的兩大錯誤：(1) 以為水平分量一定是 N cosθ（沒檢查切面角 θ 其實是切面與水平面的夾角，導致法線與鉛直線夾 θ）；(2) 在「N = (F/2)/sinθ」與「(F/2)sinθ」之間選錯。教你一秒驗算：想像切面變成垂直（θ = 90°），這時兩塊像普通方塊並排，中間正向力必為 F/2！只有 (F/2)csc90° = F/2 通過極限檢驗！',
    quizzes: [
      {
        q: '1. 利用「極限檢驗法」：當切面幾乎垂直桌面（θ → 90°）時，兩等重木塊間的正向力 N 應趨近於何值？',
        options: ['0', 'F / 2', '∞'],
        correct: 1,
        explanation: '當 θ = 90° 時就像兩個普通方形木塊並排推動，中間作用力必為 F/2；五個選項中只有 (A) (F/2)csc90° = F/2 符合！'
      },
      {
        q: '2. 若把 A、B 的質量改為「m_A = 1 kg，m_B = 3 kg」，則正向力 N 與水平推力 F 的關係會變成何者？',
        options: ['(1/4) F cscθ', '(3/4) F cscθ', '(1/2) F cscθ'],
        correct: 1,
        explanation: 'B 佔總質量的 3/4，故 B 所需水平推力 N sinθ = (3/4)F ⟹ N = (3/4)F cscθ。'
      }
    ]
  },

  // =========================================================================
  // 例題 5 (4-2-5): 六、連結體問題 例 2〈最小推力〉 (p. 4-11 ~ 4-12)
  // =========================================================================
  {
    id: '4-2-5',
    n: 5,
    page: '4-11 ～ 4-12',
    section: '§4-2 牛頓第二運動定律',
    topicGroup: '六、連結體問題',
    topicTag: '六、連結體・例 2',
    title: '側推夾緊木塊不落下：臨界最小推力',
    subtitle: '理解「水平加速產生正向力 N」進而「撐起最大靜摩擦力 f_s(max) = μN 抵抗重力」的力學傳遞鏈',
    tags: ['最大靜摩擦力', '正向力與加速度', '臨界最小推力', '三木塊夾心類題'],
    problem: '質量分別為 $m_1$、$m_2$ 的兩木塊，其間的靜摩擦係數為 $\\mu$，今以一定力 $F$ 將此兩木塊所組成之系統在光滑水平面上向右推動（$m_2$ 貼於 $m_1$ 右側且懸空未接觸地面），則欲使 $m_2$ 木塊不致落下，所需力 $F$ 的最小值為何？',
    subquestions: [
      '比較原題「雙木塊 (m₁, m₂)」與講義類題「三木塊夾心 (2m, m, 2m)」兩種結構下，中間／懸空木塊不掉落的最小推力差異。'
    ],
    choices: [],
    givens: [
      '左側木塊 m₁ 與光滑水平桌面間無摩擦',
      'm₁ 與懸空木塊 m₂ 之間的靜摩擦係數為 μ',
      '向右施水平定力 F 推動系統一起加速',
      '預設模擬參數：m₁ = 3 kg, m₂ = 2 kg, μ = 0.5, g = 10 m/s²'
    ],
    canvasHint: '💡 調整推力 F 或靜摩擦係數 μ，看 F < F_min 時右方木塊如何邊加速邊往下滑落！',
    selects: [
      {
        id: 'mode',
        label: '題型切換（原題雙木塊 vs 講義類題三木塊夾心）',
        options: [
          ['two_blocks', '🧱 原題：雙木塊系統 (m₁ = 3 kg, m₂ = 2 kg)'],
          ['three_blocks', '🥪 類題：三木塊夾心 (2m, m, 2m，m = 2 kg)']
        ],
        defaultVal: 'two_blocks'
      }
    ],
    controls: [
      { id: 'F', label: '水平推力 F', unit: 'N', min: 10, max: 220, step: 5, defaultVal: 100 },
      { id: 'mu', label: '木塊間靜摩擦係數 μ', unit: '', min: 0.20, max: 0.90, step: 0.05, defaultVal: 0.50 }
    ],
    toggles: [
      { id: 'showFBD', label: '顯示懸空木塊的受力隔離圖 (N, f_s, mg)', defaultVal: true }
    ],
    presets: [
      { label: '⚖️ 原題臨界 F_min = 100 N (μ=0.5)', state: { mode: 'two_blocks', F: 100, mu: 0.50 } },
      { label: '⬇️ 推力不足滑落 (F = 60 N)', state: { mode: 'two_blocks', F: 60, mu: 0.50 } },
      { label: '💪 推力充裕穩固 (F = 160 N)', state: { mode: 'two_blocks', F: 160, mu: 0.50 } },
      { label: '🥪 類題三木塊臨界 (F = 40 N)', state: { mode: 'three_blocks', F: 40, mu: 0.50 } }
    ],
    legend: [
      { color: '#0f62fe', text: '系統推力 F 與界面擠壓正向力 N' },
      { color: '#0b7b76', text: '向上靜摩擦力 f_s（極限 μN）' },
      { color: '#d95f18', text: '懸空木塊向下重力 m₂g' }
    ],
    simNote: '在原題雙木塊設定 (m₁=3 kg, m₂=2 kg, μ=0.5, g=10) 中，F_min = (3+2)×10/0.5 = 100 N；而在類題三木塊 (2m, m, 2m, m=2 kg) 中，因為左右兩側共有兩面摩擦力共同撐起中間的 m，只需 F_min = mg/μ = 20/0.5 = 40 N！',
    hints: [
      {
        title: '思考鏈第一環：什麼力阻止 m₂ 往下掉？',
        question: 'm₂ 受到向下的重力 m₂g，在沒有桌面支撐下，誰給它向上的力？這個力的上限與什麼有關？',
        guidance: '只有 m₁ 對 m₂ 的「向上靜摩擦力 f_s」能抵消重力 m₂g。根據摩擦力定律，靜摩擦力必須小於等於最大靜摩擦力：m₂g = f_s ≤ μ·N，因此兩木塊之間必須存在足夠大的水平擠壓力（正向力 N ≥ m₂g / μ）！',
        formula: 'm₂g ≤ f_s(max) = μN　⟹　N ≥ m₂g / μ'
      },
      {
        title: '思考鏈第二環：如何產生這麼大的正向力 N？',
        question: '對懸空木塊 m₂ 來說，它在「水平方向」的加速力從哪裡來？',
        guidance: '當整個系統以加速度 a 向右加速時，m₂ 水平方向唯一的施力者就是 m₁ 的正向力 N！因此 N = m₂·a。由此可知，只要系統加速度 a 足夠大（a ≥ g/μ），就能產生足夠大的擠壓力 N！',
        formula: 'N = m₂a ≥ m₂g / μ　⟹　a ≥ g / μ'
      },
      {
        title: '思考鏈第三環：由整體法反推最小推力 F_min',
        question: '既然整個系統必須以至少 a = g/μ 的加速度向右加速，那麼推力 F 至少需要多大？',
        guidance: '將 m₁ 與 m₂ 視為整體，總質量為 (m₁ + m₂)，故所需推力 F = (m₁ + m₂)a ≥ (m₁ + m₂)g / μ。',
        formula: 'F = (m₁ + m₂)a ≥ (m₁ + m₂)g / μ'
      }
    ],
    steps: [
      {
        title: '步驟 1：整體法求系統共同加速度 a',
        explanation: '將 $m_1$ 與 $m_2$ 視為一個整體系統，桌面光滑無摩擦，故在水平推力 $F$ 作用下，系統向右的共同加速度為：',
        katex: 'a = \\frac{F}{m_1 + m_2}',
        plainFormula: 'a = F / (m₁ + m₂)',
        presetAction: { label: '檢視原題臨界狀態 F = 100 N', state: { mode: 'two_blocks', F: 100, mu: 0.50 } }
      },
      {
        title: '步驟 2：隔離右側懸空木塊 m₂，分析水平與鉛直受力',
        explanation: '單獨分析 $m_2$ 的受力情形：\n• <strong>水平方向</strong>：僅受 $m_1$ 向右推擠的正向力 $N$，故 $N = m_2 a$。\n• <strong>鉛直方向</strong>：受向下重力 $m_2 g$ 與向上靜摩擦力 $f_s$ 平衡，故 $f_s = m_2 g$。',
        katex: 'N = m_2 a = \\frac{m_2}{m_1 + m_2}F, \\qquad f_s = m_2 g',
        plainFormula: 'N = m₂a，且鉛直平衡 f_s = m₂g'
      },
      {
        title: '步驟 3：套用最大靜摩擦條件 f_s ≤ μN 求最小推力',
        explanation: '為使 $m_2$ 不致下滑，所需靜摩擦力不可超過最大靜摩擦力 $f_{s,\\max} = \\mu N$：',
        katex: 'm_2 g \\le \\mu N = \\mu m_2 a \\implies a \\ge \\frac{g}{\\mu} \\implies \\frac{F}{m_1 + m_2} \\ge \\frac{g}{\\mu} \\implies F_{\\min} = \\frac{(m_1 + m_2)g}{\\mu}',
        plainFormula: 'F_min = (m₁ + m₂)g / μ',
        presetAction: { label: '測試推力不足 F = 60 N (滑落)', state: { mode: 'two_blocks', F: 60, mu: 0.50 } }
      },
      {
        title: '步驟 4：對照講義類題「三木塊夾心 (2m, m, 2m)」',
        explanation: '若將總質量 $5m$ 排列成 $2m$、$m$（中間懸空）、$2m$：整體加速度 $a = \\dfrac{F}{5m}$。中間 $m$ 受到左側推力 $N_2 = 3ma$（因推著 $m + 2m$）與右側反力 $N_1 = 2ma$（因推著 $2m$）。關鍵是<strong>左右兩個接觸面都提供向上摩擦力</strong>！',
        katex: 'mg = f_1 + f_2 \\le \\mu(N_1 + N_2) = \\mu(2ma + 3ma) = \\mu(5ma) = \\mu F \\implies F_{\\min} = \\frac{mg}{\\mu}',
        plainFormula: '三木塊夾心：兩面總正向力 N₁ + N₂ = 5ma = F，故 F_min = mg / μ',
        presetAction: { label: '切換至三木塊夾心類題', state: { mode: 'three_blocks', F: 40, mu: 0.50 } }
      }
    ],
    answerSummary: '原題最小推力為 F_min = (m₁ + m₂)g / μ。（若系統質量不變而為「2m, m, 2m 夾心」則為 mg / μ）',
    optionAnalysis: [
      '關鍵公式：m₂ 不落的最小加速度永遠是 a_min = g / μ（注意與 m₂ 本身質量無關！）。',
      '因此整體所需最小推力就是「總質量 × (g/μ)」= (m₁ + m₂)g / μ。'
    ],
    pitfall: '在講義 p.4-11 類題（2m, m, 2m 三木塊夾心）中，最常有人忘記中間木塊 m 有「左右兩個接觸面」同時提供向上的靜摩擦力 f₁ 和 f₂！兩邊正向力加起來恰好是 N₁ + N₂ = 2ma + 3ma = 5ma = F，這使得雙面總最大摩擦力高達 μF，因此最小推力只需 mg/μ（選 A），而不是 5mg/(3μ)！',
    quizzes: [
      {
        q: '1.【講義 p.4-11 類題】三個質量分別為 2m、m 和 2m 的木塊，木塊間靜摩擦係數為 μ，與地面無摩擦。欲使中間的木塊不致落下，所需最小的力 F 為多少？',
        options: ['(A) mg / μ', '(B) mg', '(C) 5mg / (3μ)', '(D) mgμ', '(E) 3mg / 5'],
        correct: 0,
        explanation: '系統加速度 a = F/(5m)。左邊界面正向力 N₂ = 3ma，右邊界面正向力 N₁ = 2ma。中間木塊受兩面摩擦力總和上限 μ(N₁+N₂) = 5μma = μF ≥ mg ⟹ F ≥ mg/μ，選 (A)！'
      },
      {
        q: '2. 回到原題雙木塊系統，若將 m₂ 的質量加倍（變為 2m₂），但保持總質量 (m₁ + m₂) 不變，則所需的最小推力 F_min 會如何變化？',
        options: ['變為兩倍', '變為一半', '維持不變'],
        correct: 2,
        explanation: '因為 F_min = (m₁ + m₂)g / μ 只取決於「系統總質量」與 μ！m₂ 加倍時重力加倍，但它需要的水平正向力 N = m₂a 也自動加倍，所以臨界加速度仍為 g/μ！'
      }
    ]
  },

  // =========================================================================
  // 例題 6 (4-2-6): 六、連結體問題 例 3〈兩物重疊〉 (p. 4-12 ~ 4-13)
  // =========================================================================
  {
    id: '4-2-6',
    n: 6,
    page: '4-12 ～ 4-13',
    section: '§4-2 牛頓第二運動定律',
    topicGroup: '六、連結體問題',
    topicTag: '六、連結體・例 3',
    title: '上下雙木塊重疊拉動：拉下塊 vs 拉上塊',
    subtitle: '掌握「先看靠摩擦力加速的被動木塊求 a_max，再用整體法乘總質量求 F_max」黃金法則',
    tags: ['雙木塊重疊', '被動木塊法', '相對靜止極限', '99指考類題'],
    problem: '圖中，光滑水平桌面上有 $A$、$B$ 兩木塊（$A$ 疊放在 $B$ 上方），其質量分別為 $m$ 與 $M$。已知兩木塊間的靜摩擦係數為 $\\mu$。今使木塊組由靜止開始運動，試回答以下四小題：',
    subquestions: [
      '(a) 今施一水平力於下木塊 $B$ 上，欲使 $A$、$B$ 間相對靜止時，合體加速度的最大量值為何？',
      '(b) 承 (a)，當時的水平拉力量值為何？',
      '(c) 若改將水平力作用於上木塊 $A$ 上時，在 $A$、$B$ 相對靜止條件下，加速度的最大量值又為何？',
      '(d) 承 (c)，當時的水平拉力為何？'
    ],
    choices: [],
    givens: [
      '上木塊 A 質量為 m（預設 2 kg），下木塊 B 質量為 M（預設 6 kg）',
      'B 與水平桌面間完全光滑（無摩擦）',
      'A、B 兩木塊接觸面間的靜摩擦係數為 μ（預設 0.4）',
      '接觸面正向力永遠只有上面木塊壓下來的 N = mg，故 f_s(max) = μmg'
    ],
    canvasHint: '💡 切換「拉下塊 B」與「拉上塊 A」，調整拉力 F 看超過 F_max 後誰溜得比較快！',
    selects: [
      {
        id: 'pullTarget',
        label: '水平拉力施力對象',
        options: [
          ['B', '(a)(b) 水平力拉「下木塊 B」→ A 靠摩擦力跟著走'],
          ['A', '(c)(d) 水平力拉「上木塊 A」→ B 靠摩擦力跟著走']
        ],
        defaultVal: 'B'
      }
    ],
    controls: [
      { id: 'F', label: '水平拉力 F', unit: 'N', min: 2, max: 60, step: 1, defaultVal: 32 },
      { id: 'mu', label: '接觸面靜摩擦係數 μ', unit: '', min: 0.15, max: 0.80, step: 0.05, defaultVal: 0.40 },
      { id: 'mTop', label: '上木塊 A 質量 m', unit: 'kg', min: 1, max: 8, step: 1, defaultVal: 2 },
      { id: 'MBot', label: '下木塊 B 質量 M', unit: 'kg', min: 2, max: 12, step: 1, defaultVal: 6 }
    ],
    toggles: [
      { id: 'showFBD', label: '顯示 A、B 各自隔離受力圖', defaultVal: true }
    ],
    presets: [
      { label: '⬇️ (a)(b) 拉 B 臨界 (F = 32 N)', state: { pullTarget: 'B', F: 32, mu: 0.40, mTop: 2, MBot: 6 } },
      { label: '💨 拉 B 超限滑動 (F = 48 N)', state: { pullTarget: 'B', F: 48, mu: 0.40, mTop: 2, MBot: 6 } },
      { label: '⬆️ (c)(d) 拉 A 臨界 (F = 10.7 N)', state: { pullTarget: 'A', F: 11, mu: 0.40, mTop: 2, MBot: 6 } },
      { label: '💥 拉 A 超限抽走 (F = 24 N)', state: { pullTarget: 'A', F: 24, mu: 0.40, mTop: 2, MBot: 6 } }
    ],
    legend: [
      { color: '#0f62fe', text: '外加拉力 F 與主動木塊加速度' },
      { color: '#0b7b76', text: 'A、B 之間靜／動摩擦力 f（上限 μmg）' },
      { color: '#d95f18', text: '被動木塊（靠摩擦力拖動）加速度曲線' }
    ],
    simNote: '在預設 (m=2 kg, M=6 kg, μ=0.4, g=10) 下，界面最大靜摩擦力固定為 μmg = 8 N。拉下塊 B 時靠這 8 N 去拉 2 kg 的 A，故 a_max = 4 m/s²、F_max = 32 N；改拉上塊 A 時靠同樣的 8 N 去拉 6 kg 的 B，故 a_max = 8/6 = 1.33 m/s²、F_max = 10.67 N！',
    hints: [
      {
        title: '核心心法：先找哪一塊「只靠摩擦力」在加速！',
        question: '不管是拉 B 還是拉 A，A 與 B 之間的最大靜摩擦力上限 f_s(max) 都是多少？',
        guidance: '因為接觸面只在 A、B 之間，正向力 N = mg，所以兩小題的最大靜摩擦力都是 f_s(max) = μmg。要保持一起運動，沒有被外力直接拉到的那塊「被動木塊」，完全只能靠這股摩擦力加速！',
        formula: 'f_s(max) = μN = μmg（兩情境皆相同）'
      },
      {
        title: '求解 (a)(b)：拉下木塊 B 時的臨界狀態',
        question: '當拉力 F 作用在 B 上，哪一塊是被動木塊？它的極限加速度是多少？',
        guidance: '被動木塊是上方的 A（質量 m）。它最多只能獲得 f_s(max) = μmg 的推力，所以 a_max = (μmg)/m = μg。再把 A+B 看成整體，F_max = (M + m)a_max = (M + m)μg！',
        formula: '拉 B：被動塊 A ⟹ a_max = μmg / m = μg　⟹　F_max = (M + m)μg'
      },
      {
        title: '求解 (c)(d)：改拉上木塊 A 時的臨界狀態',
        question: '當拉力 F 改作用在 A 上，哪一塊變成被動木塊？這一次最大摩擦力要拉動多少質量？',
        guidance: '被動木塊變成下方的 B（質量 M）！同樣只有 f_s(max) = μmg 的摩擦力去拉動質量 M 的 B，所以 a_max = μmg / M。最後同樣用整體法乘以總質量 (M + m)，即可求出 F_max！',
        formula: '拉 A：被動塊 B ⟹ a_max = μmg / M　⟹　F_max = (M + m)·(μmg/M)'
      }
    ],
    steps: [
      {
        title: '步驟 1：(a)(b) 施力於下木塊 B（A 為被動木塊）',
        explanation: '單獨隔離上木塊 $A$：桌面對 $A$ 無接觸，在水平方向 $A$ 僅受到 $B$ 施予的向右靜摩擦力 $f_s$。因為 $f_s \\le f_{s,\\max} = \\mu m g$，故 $A$ 能獲得的最大加速度即為合體極限：',
        katex: 'f_s = m a \\le \\mu m g \\implies a_{\\max} = \\mu g \\qquad (\\text{a 小題答案})',
        plainFormula: '(a) a_max = μg',
        presetAction: { label: '切換至 (a)(b) 拉 B 臨界狀態', state: { pullTarget: 'B', F: 32, mu: 0.40, mTop: 2, MBot: 6 } }
      },
      {
        title: '步驟 2：整體法求 (b) 當時的水平拉力 F',
        explanation: '以 $(A + B)$ 整體為系統，桌面光滑無阻力，故在臨界最大加速度 $a_{\\max} = \\mu g$ 時，所需水平拉力為：',
        katex: 'F = (M + m) a_{\\max} = (M + m)\\mu g \\qquad (\\text{b 小題答案})',
        plainFormula: '(b) F = (M + m)μg'
      },
      {
        title: '步驟 3：(c)(d) 改施力於上木塊 A（B 為被動木塊）',
        explanation: '若水平力改拉上木塊 $A$，則下木塊 $B$ 在水平方向僅靠 $A$ 給予的向右靜摩擦力 $f_s$ 加速。注意最大靜摩擦力依然是 $\\mu m g$（正向力仍是 $A$ 的重量），但這次要推動的是質量 $M$ 的 $B$：',
        katex: 'f_s = M a \\le \\mu m g \\implies a_{\\max} = \\frac{\\mu m g}{M} \\qquad (\\text{c 小題答案})',
        plainFormula: '(c) a_max = μmg / M',
        presetAction: { label: '切換至 (c)(d) 拉 A 臨界狀態', state: { pullTarget: 'A', F: 11, mu: 0.40, mTop: 2, MBot: 6 } }
      },
      {
        title: '步驟 4：整體法求 (d) 當時的水平拉力 F',
        explanation: '將 $a_{\\max} = \\dfrac{\\mu m g}{M}$ 代入整體運動方程式 $F = (M + m)a_{\\max}$：',
        katex: 'F = (M + m)\\frac{\\mu m g}{M} = \\left(\\frac{Mm + m^2}{M}\\right)\\mu g \\qquad (\\text{d 小題答案})',
        plainFormula: '(d) F = [(Mm + m²) / M] μg'
      }
    ],
    answerSummary: '(a) μg ； (b) (M + m)μg ； (c) μmg / M ； (d) [(Mm + m²) / M] μg。',
    optionAnalysis: [
      '比較兩種拉法：因為題目通常 M > m（下盤比較重），用同樣的摩擦力 μmg 去帶動較重的 M 會比較吃力，所以拉上塊 A 比拉下塊 B 更容易發生滑脫！',
      '兩小題解題步驟完全對稱：先隔離「沒有直接被拉的那塊」求 a_max = f_max / m被動，再代回整體 F = (M+m)a_max。'
    ],
    pitfall: '做 (c)(d) 小題時，同學常一不小心寫成「F_max = μmg」（誤以為外力等於最大靜摩擦力就滑了），或忘記把上塊 m 的加速也算進拉力裡！請注意：只要 A 和 B 一起以 a 加速，拉力 F 除了要透過摩擦力帶動 B（提供 Ma），自己也得帶動上塊 A（提供 ma），所以 F 必須大於單純的摩擦力 μmg！',
    quizzes: [
      {
        q: '1.【講義 p.4-13 99指考類題】將 M = 1.5 kg 金屬板置於光滑水平面，上方放置 m = 0.5 kg 木塊（靜摩擦係數 μ_s）。今漸增水平力 F 拉動上木塊 m，當 m 與金屬板開始相對滑動時 F 恰為 7.8 N，則 μ_s 最接近何者？（g = 9.8 m/s²）',
        options: ['(A) 1.2', '(B) 0.8', '(C) 0.4', '(D) 0.2', '(E) 0.05'],
        correct: 0,
        explanation: '此即 (c)(d) 情境！套用 F_max = (M+m)(μ_s mg / M) ⟹ 7.8 = (2.0)×(μ_s × 0.5 × 9.8 / 1.5) ⟹ μ_s = 7.8 / 6.533 ≈ 1.194 ≈ 1.2，選 (A)！'
      },
      {
        q: '2.【講義 p.4-13 類題】鐵路平板車載有一木箱，車地板摩擦係數為 μ。若平板車以速率 v 行駛，為不使木箱在煞車時滑動，最短停車距離為何？',
        options: ['(A) v² / (μg)', '(B) v² / (2μg)', '(C) μv² / g', '(D) μv² / (2g)'],
        correct: 1,
        explanation: '木箱最大減速度與 (a) 小題相同為 a_max = μg，由 v² = 2aS 得最短停車距離 S = v² / (2μg)，選 (B)！'
      }
    ]
  },

  // =========================================================================
  // 例題 7 (4-2-7): 七、滑輪 例 1〈定滑輪〉 (p. 4-18，94.指定科考)
  // =========================================================================
  {
    id: '4-2-7',
    n: 7,
    page: '4-18',
    section: '§4-2 牛頓第二運動定律',
    topicGroup: '七、滑輪系統',
    topicTag: '七、滑輪・例 1',
    title: '94 指考經典：定滑輪兩側木塊移位與張力變化',
    subtitle: '打破「總重量都是 6m 所以繩張力不變」的迷思，揭開阿特伍德機「調和平均數」的張力真相',
    tags: ['94指考', '定滑輪', '阿特伍德機', '張力必減小'],
    problem: '如圖 1 所示，一輕繩跨過定滑輪，兩端各懸掛三個質量皆相等的木塊，呈平衡狀態。現將右端的一個木塊取下，改掛至左端，如圖 2 所示。若摩擦力與繩重、滑輪重皆可不計，試問繩上張力變為原來平衡狀態時的幾倍？【94. 指定科考】',
    subquestions: [
      '比較圖 1（左 3、右 3）靜力平衡與圖 2（左 4、右 2）加速運動時，繩張力 T 與重力總和的關係。'
    ],
    choices: [
      ['(A)', '$\\dfrac{3}{2}$', '3/2'],
      ['(B)', '$\\dfrac{4}{3}$', '4/3'],
      ['(C)', '$\\dfrac{9}{8}$', '9/8'],
      ['(D)', '$\\dfrac{8}{9}$', '8/9'],
      ['(E)', '$\\dfrac{3}{4}$', '3/4']
    ],
    givens: [
      '每個木塊質量皆相等（設單塊質量為 m）',
      '總木塊數恆為 6 個（總質量恆為 6m）',
      '圖 1：左 3 個、右 3 個（靜止平衡）',
      '圖 2：左 4 個、右 2 個（左降右升加速運動）'
    ],
    canvasHint: '💡 調整左側木塊個數 n_L 或點擊播放，並排觀察圖 1 靜止 vs 圖 2 加速時的張力差距！',
    selects: [],
    controls: [
      { id: 'nLeft', label: '圖 2 左側木塊個數 n_L（右側自動為 6 − n_L）', unit: '個', min: 1, max: 5, step: 1, defaultVal: 4 }
    ],
    toggles: [
      { id: 'showCompare', label: '顯示圖 1 (3:3) 與圖 2 對照向量及曲線', defaultVal: true }
    ],
    presets: [
      { label: '⚖️ 圖 1 平衡狀態 (3 vs 3)', state: { nLeft: 3 } },
      { label: '🎯 圖 2 原題設定 (4 vs 2 → 8/9 倍)', state: { nLeft: 4 } },
      { label: '⚡ 更懸殊配重 (5 vs 1 → 5/9 倍)', state: { nLeft: 5 } }
    ],
    legend: [
      { color: '#0b7b76', text: '圖 1 平衡張力 T₁ = 3mg（吊住兩側）' },
      { color: '#0f62fe', text: '圖 2 運動張力 T₂ = [2 n_L n_R / (n_L+n_R)] mg' },
      { color: '#d95f18', text: '各端向下總重力 (n_L mg, n_R mg)' }
    ],
    simNote: '在總數 n_L + n_R = 6 不變時，兩端乘積 n_L·n_R 在 3×3 = 9 時最大，因此加速運動時的繩張力永遠小於平衡時的 3mg（只有 8/9 倍）！甚至天花板掛定滑輪的總拉力 2T₂ = 16mg/3 也比總重量 6mg 還要輕！',
    hints: [
      {
        title: '先算出圖 1 靜止平衡時的繩張力 T₁',
        question: '當左右各掛 3 個質量為 m 的木塊且保持靜止時，細繩上的張力 T₁ 等於多少？',
        guidance: '靜止時每個木塊合力為零，因此繩張力 T₁ 必須剛好撐住單側 3 個木塊的重量，即 T₁ = 3mg。',
        formula: '圖 1（靜止）：T₁ = 3mg'
      },
      {
        title: '用整體法算出圖 2（左 4 右 2）的系統加速度 a',
        question: '將右邊 1 個木塊改掛到左邊後，左邊 4mg 向下拉、右邊 2mg 向下拖，整個 6m 系統的加速度是多少？',
        guidance: '沿著「左下降、右上升」的運動方向看整體：淨驅動力 = 4mg − 2mg = 2mg，被加速的總質量 = 4m + 2m = 6m。故加速度 a = (2mg)/(6m) = g/3。',
        formula: 'a = (4mg − 2mg) / (4m + 2m) = 2mg / 6m = g / 3'
      },
      {
        title: '用隔離法（選左邊或右邊任一側）求出張力 T₂ 與比值',
        question: '已知右側 2 個木塊以 a = g/3 向上加速，那麼繩張力 T₂ 比 2mg 大多少？計算 T₂ / T₁。',
        guidance: '單獨分析右側 2m（向上加速）：T₂ − 2mg = 2m·a = 2m·(g/3) ⟹ T₂ = (8/3)mg。（若算左側 4m：4mg − T₂ = 4m·(g/3)，一樣得出 T₂ = (8/3)mg！）因此 T₂ / T₁ = (8/3) / 3 = 8/9。',
        formula: 'T₂ = 2m(g + g/3) = (8/3)mg　⟹　T₂ / T₁ = (8/3) / 3 = 8 / 9'
      }
    ],
    steps: [
      {
        title: '步驟 1：求圖 1 靜力平衡時的繩張力 T₁',
        explanation: '設每個木塊質量為 $m$。圖 1 左右兩端各掛 $3$ 個木塊而靜止平衡，由單側平衡可知：',
        katex: 'T_1 = 3mg',
        plainFormula: 'T₁ = 3mg',
        presetAction: { label: '檢視圖 1 平衡狀態 (3 vs 3)', state: { nLeft: 3 } }
      },
      {
        title: '步驟 2：求圖 2 加速運動時的系統加速度 a',
        explanation: '圖 2 左側為 $4m$、右側為 $2m$，釋放後左側向下加速、右側向上加速，加速度大小皆為 $a$。以全部 $6$ 個木塊為整體系統：',
        katex: '4mg - 2mg = (4m + 2m)a \\implies a = \\frac{2mg}{6m} = \\frac{1}{3}g',
        plainFormula: 'a = (4 − 2)/(4 + 2) · g = g/3',
        presetAction: { label: '切換至圖 2 原題狀態 (4 vs 2)', state: { nLeft: 4 } }
      },
      {
        title: '步驟 3：隔離單側木塊求圖 2 繩張力 T₂ 並計算比值',
        explanation: '隔離右側上升的 $2m$ 木塊（受向上張力 $T_2$ 與向下重力 $2mg$）：',
        katex: 'T_2 - 2mg = 2m \\cdot a = 2m\\left(\\frac{1}{3}g\\right) \\implies T_2 = \\frac{8}{3}mg',
        plainFormula: 'T₂ = (8/3)mg'
      },
      {
        title: '步驟 4：求張力倍率 T₂ / T₁ 並整理阿特伍德機通式',
        explanation: '將 $T_2$ 與原平衡張力 $T_1 = 3mg$ 相除：',
        katex: '\\frac{T_2}{T_1} = \\frac{\\frac{8}{3}mg}{3mg} = \\frac{8}{9} \\qquad \\text{（一般通式：} T = \\frac{2m_1 m_2}{m_1 + m_2}g \\text{）}',
        plainFormula: 'T₂ / T₁ = 8/9，故選 (D)'
      }
    ],
    answerSummary: '正確答案為 (D) 8/9。（圖 1 張力為 3mg，圖 2 張力降為 (8/3)mg，變為原來的 8/9 倍）',
    optionAnalysis: [
      '(A) 錯誤：3/2 > 1，代表張力變大，但只要系統發生加速釋放，質心向下加速導致總受力變小，張力必減小！',
      '(B) 錯誤：4/3 只看左邊變成 4 個，忽略了左邊在向下加速時張力小於 4mg。',
      '(C) 錯誤：將分母分子倒置。',
      '(D) 正確：T₂ = (8/3)mg，T₁ = 3mg，比值為 8/9。',
      '(E) 錯誤：3/4 為 (3/4) 倍，對應算式不符。'
    ],
    pitfall: '大考最愛考的概念：當兩端總質量 (m₁ + m₂) 固定時，什麼時候繩張力最大？答案是「兩端相等（平衡不加速）時」最大！只要兩端質量不相等、系統開始加速運動，系統質心就有一個向下的淨加速度，因此天花板與滑輪只需撐住比總重量還小的力量（2T < (m₁+m₂)g），張力 T 必定變小！',
    quizzes: [
      {
        q: '1.【講義 p.4-18 95指考類題】甲(1.0 kg)、乙(4.0 kg)兩物體以細繩跨過無摩擦定滑輪，置於兩個斜角均為 30° 的光滑長斜面上。自靜止釋放經過 1.0 秒，乙沿斜面移動多少公尺？（g = 10 m/s²）',
        options: ['(A) 0', '(B) 1.5 m', '(C) 2.0 m', '(D) 2.5 m', '(E) 3.0 m'],
        correct: 1,
        explanation: '系統加速度 a = (4g sin30° − 1g sin30°) / (4 + 1) = (15 N)/(5 kg) = 3.0 m/s²。1.0 秒位移 S = ½at² = ½×3×1² = 1.5 m，選 (B)！'
      },
      {
        q: '2. 承原題，若把右邊「2 個」木塊取下掛到左邊（變成左 5、右 1），則天花板懸掛滑輪的支撐力（等於 2T）會如何變化？',
        options: ['變為 6mg（等於總重）', '減小為 (10/3)mg（小於總重 6mg）', '變為 (16/3)mg'],
        correct: 1,
        explanation: '左 5 右 1 時張力 T = [2(5)(1)/(5+1)]mg = (5/3)mg，因此懸掛滑輪的支撐力 2T = (10/3)mg ≈ 3.33mg，比左 4 右 2 時更小！'
      }
    ]
  },

  // =========================================================================
  // 例題 8 (4-2-8): 七、滑輪 例 2〈動滑輪〉 (p. 4-19 ~ 4-20)
  // =========================================================================
  {
    id: '4-2-8',
    n: 8,
    page: '4-19 ～ 4-20',
    section: '§4-2 牛頓第二運動定律',
    topicGroup: '七、滑輪系統',
    topicTag: '七、滑輪・例 2',
    title: '動滑輪運動學約束：為何 T_A = 2T_B 且 a₂ = 2a₁？',
    subtitle: '掌握動滑輪「繩長守恆推加速度比 1:2」與「無質量動滑輪力平衡 T_A = 2T_B」雙核心技巧',
    tags: ['動滑輪', '約束關係 a₂ = 2a₁', 'T_A = 2T_B', '桌面動滑輪類題'],
    problem: '如右圖，細繩左端固定於天花板，繞過掛有重物 $m_1$（經細繩 $A$）的動滑輪後，再跨過天花板右方的定滑輪，於右端細繩 $B$ 下端懸掛重物 $m_2$。不計動滑輪與繩的質量且繩無摩擦力，已知 $m_1 < 2m_2$，試求：',
    subquestions: [
      '(1) $A$、$B$ 兩繩之張力 $T_A$ 與 $T_B$ 各若干？',
      '(2) 物體 $m_1$ 與 $m_2$ 之加速度 $a_1$（向上）與 $a_2$（向下）各若干？'
    ],
    choices: [],
    givens: [
      '繩 B 繞過定滑輪與動滑輪，兩段皆具相同張力 T_B',
      '無質量動滑輪受力平衡：T_A = 2T_B',
      '繩長守恆約束：m₁ 每上升 s₁，兩段繩共釋出 2s₁，故 s₂ = 2s₁ ⟹ a₂ = 2a₁',
      '已知條件：m₁ < 2m₂（確保 m₁ 向上加速、m₂ 向下加速）'
    ],
    canvasHint: '💡 點擊「▶ 播放動態模擬」親眼看 m₁ 上升 Δy 時，m₂ 如何同步下降整整 2Δy 的距離！',
    selects: [],
    controls: [
      { id: 'm1', label: '左側懸於動滑輪質量 m₁', unit: 'kg', min: 0.5, max: 6.0, step: 0.5, defaultVal: 1.0 },
      { id: 'm2', label: '右側懸於單繩質量 m₂', unit: 'kg', min: 0.5, max: 4.0, step: 0.5, defaultVal: 1.0 }
    ],
    toggles: [
      { id: 'showPulleyFBD', label: '顯示動滑輪隔離受力圖 (T_A = 2T_B)', defaultVal: true }
    ],
    presets: [
      { label: '📐 標準測試 m₁ = 1 kg, m₂ = 1 kg', state: { m1: 1.0, m2: 1.0 } },
      { label: '⚖️ 靜力平衡臨界 m₁ = 2m₂ (2 vs 1)', state: { m1: 2.0, m2: 1.0 } },
      { label: '⬇️ 反轉測試 m₁ > 2m₂ (4 vs 1)', state: { m1: 4.0, m2: 1.0 } }
    ],
    legend: [
      { color: '#0b7b76', text: '繩 A 張力 T_A（連接動滑輪軸心與 m₁）' },
      { color: '#0f62fe', text: '繩 B 張力 T_B = T_A / 2（連續繩處處相等）' },
      { color: '#d95f18', text: '加速度關係 a₂ = 2a₁（位移永遠差 2 倍）' }
    ],
    simNote: '記住口訣：「省力兩倍，費距離兩倍」！動滑輪讓繩 A 張力是繩 B 的 2 倍 (T_A = 2T_B)，所以只要 m₂ 的重量大於 m₁ 的一半（即 2m₂ > m₁），m₂ 就能把兩倍重的 m₁ 往上拉起來！',
    hints: [
      {
        title: '第一步：先建立兩條繩子的張力比（靜/動力學）',
        question: '因為動滑輪的質量「可以忽略不計」，它向上受幾條繩 B 拉住？向下又受誰拉住？',
        guidance: '若動滑輪質量 m滑輪 = 0，則無論它如何加速，合力 m滑輪·a 必等於 0！動滑輪上方有兩段繩 B 向上拉（合力 2T_B），下方有繩 A 向下拉（T_A），因此任何時刻恆有 T_A = 2T_B！',
        formula: 'T_A − 2T_B = m滑輪·a = 0　⟹　T_A = 2T_B'
      },
      {
        title: '第二步：建立兩物體的加速度比（運動學繩長約束）',
        question: '假設動滑輪（以及 m₁）向上移動了距離 y₁，左邊兩條垂直繩各縮短了 y₁，那麼右邊的 m₂ 會向下移動多少？',
        guidance: '左邊兩段垂直繩總共放出了 2y₁ 的長度，這些繩長全都跑去讓右邊的 m₂ 往下掉！因此 s₂ = 2s₁，對時間微分兩次後就得到加速度約束：a₂ = 2a₁。',
        formula: 's₂ = 2s₁　⟹　v₂ = 2v₁　⟹　a₂ = 2a₁'
      },
      {
        title: '第三步：分別對 m₁ 與 m₂ 列牛頓第二定律並聯立求解',
        question: '設 m₁ 向上加速 a₁，m₂ 向下加速 a₂ = 2a₁，利用 T_A = 2T_B 聯立消去未知張力！',
        guidance: '對 m₁（向上）：T_A − m₁g = m₁a₁。對 m₂（向下）：m₂g − T_B = m₂a₂ = 2m₂a₁。把第二式乘以 2 後與第一式相加，2T_B 與 T_A 正好完美抵消，立刻解出 a₁！',
        formula: '(2m₂g − 2T_B) + (T_A − m₁g) = 4m₂a₁ + m₁a₁　⟹　(2m₂ − m₁)g = (m₁ + 4m₂)a₁'
      }
    ],
    steps: [
      {
        title: '步驟 1：寫出動滑輪的張力比與運動學加速度約束',
        explanation: '不計動滑輪與繩質量，對動滑輪列力平衡得 $T_A = 2T_B$。又當 $m_1$ 上升位移 $s_1$ 時，動滑輪兩側之繩 $B$ 各縮短 $s_1$，故 $m_2$ 必下降 $s_2 = 2s_1$：',
        katex: 'T_A = 2T_B, \\qquad s_2 = 2s_1 \\implies a_2 = 2a_1',
        plainFormula: 'T_A = 2T_B 且 a₂ = 2a₁',
        presetAction: { label: '檢視 m₁=1 kg, m₂=1 kg 的 1:2 移動', state: { m1: 1.0, m2: 1.0 } }
      },
      {
        title: '步驟 2：對 m₁ 與 m₂ 分別列牛頓第二定律',
        explanation: '因題設 $m_1 < 2m_2$，可知 $m_1$ 向上加速 $a_1$、$m_2$ 向下加速 $a_2 = 2a_1$：',
        katex: '\\begin{cases} \\text{對 } m_1\\text{（向上）：} & T_A - m_1 g = m_1 a_1 \\quad\\cdots(1) \\\\ \\text{對 } m_2\\text{（向下）：} & m_2 g - T_B = m_2 (2a_1) \\quad\\cdots(2) \\end{cases}',
        plainFormula: '(1) T_A − m₁g = m₁a₁；(2) m₂g − T_B = 2m₂a₁'
      },
      {
        title: '步驟 3：聯立解出加速度 a₁ 與 a₂',
        explanation: '將 $(2)$ 式乘以 $2$（因 $2T_B = T_A$）並與 $(1)$ 式相加消去張力：',
        katex: '(2m_2 - m_1)g = (m_1 + 4m_2)a_1 \\implies a_1 = \\frac{2m_2 - m_1}{m_1 + 4m_2}g, \\quad a_2 = 2a_1 = \\frac{4m_2 - 2m_1}{m_1 + 4m_2}g',
        plainFormula: 'a₁ = [(2m₂ − m₁)/(m₁ + 4m₂)]g，a₂ = [(4m₂ − 2m₁)/(m₁ + 4m₂)]g',
        presetAction: { label: '測試平衡臨界 m₁ = 2m₂ (a = 0)', state: { m1: 2.0, m2: 1.0 } }
      },
      {
        title: '步驟 4：代回求繩張力 T_A 與 T_B',
        explanation: '將 $a_1$ 代回 $(1)$ 式得 $T_A = m_1(g + a_1)$，再除以 $2$ 得 $T_B$：',
        katex: 'T_A = m_1 g\\left(1 + \\frac{2m_2 - m_1}{m_1 + 4m_2}\\right) = \\frac{6m_1 m_2}{m_1 + 4m_2}g, \\qquad T_B = \\frac{T_A}{2} = \\frac{3m_1 m_2}{m_1 + 4m_2}g',
        plainFormula: 'T_A = 6m₁m₂g / (m₁ + 4m₂)，T_B = 3m₁m₂g / (m₁ + 4m₂)'
      }
    ],
    answerSummary: '(1) T_A = 6m₁m₂g / (m₁ + 4m₂)，T_B = 3m₁m₂g / (m₁ + 4m₂)；\n(2) a₁ = (2m₂ − m₁)g / (m₁ + 4m₂)（向上），a₂ = (4m₂ − 2m₁)g / (m₁ + 4m₂)（向下）。',
    optionAnalysis: [
      '驗算特例 m₁ = 2m₂：代入得 a₁ = a₂ = 0，此時 T_B = m₂g、T_A = 2m₂g = m₁g，完全吻合靜力平衡！',
      '極限驗算 m₁ → 0：a₂ → g（m₂ 自由落體），T_A = T_B → 0，物理合理！'
    ],
    pitfall: '許多同學容易把動滑輪兩端的「質量」直接寫成 $m_1 + m_2$ 當分母，這會徹底算錯！因為 $m_2$ 的加速度是 $m_1$ 的 2 倍（$a_2 = 2a_1$），以能量或等效慣性來看，$m_2$ 在 $a_1$ 的座標下相當於 $4m_2$ 的等效質量（即 $m_1 + 4m_2$），千萬不可漏掉這個 4 倍係數！',
    quizzes: [
      {
        q: '1.【講義 p.4-19 類題】m₁ = 8 kg 置於光滑水平桌面上，以細繩跨過桌邊之定滑輪連接一動滑輪與 m₂ = 4 kg 系統（連接 m₁ 之軸心細繩張力為 2T，連接 m₂ 之繞繩張力為 T，且 m₂ 的向下加速度為 m₁ 的 2 倍）。若忽略一切繩輪質量與摩擦且 g = 10 m/s²，則 m₁ 加速度 a 與連接 m₂ 之細繩張力 T 分別為何？',
        options: ['a = 10/3 m/s²，T = 40/3 N', 'a = 5/2 m/s²，T = 20 N', 'a = 20/3 m/s²，T = 80/3 N'],
        correct: 0,
        explanation: '對 m₁：2T = 8a ⟹ T = 4a。對 m₂：m₂g − T = m₂(2a) ⟹ 40 − T = 8a。聯立得 40 − 4a = 8a ⟹ a = 10/3 m/s²，T = 40/3 N！'
      },
      {
        q: '2. 回到原題動滑輪組，若要使系統保持靜止平衡（a₁ = a₂ = 0），則 m₁ 與 m₂ 須滿足何種關係？',
        options: ['m₁ = m₂', 'm₁ = 2m₂', 'm₁ = 4m₂'],
        correct: 1,
        explanation: '平衡時 T_B = m₂g 且 T_A = m₁g，由動滑輪力平衡 T_A = 2T_B 得 m₁ = 2m₂。'
      }
    ]
  },

  // =========================================================================
  // 例題 9 (4-2-9): 七、滑輪 例 3〈人與平台〉 (p. 4-20 ~ 4-21)
  // =========================================================================
  {
    id: '4-2-9',
    n: 9,
    page: '4-20 ～ 4-21',
    section: '§4-2 牛頓第二運動定律',
    topicGroup: '七、滑輪系統',
    topicTag: '七、滑輪・例 3',
    title: '人站在平台上拉自己上去：三股張力系統與離地極限',
    subtitle: '掌握「切開系統頂部數出幾股繩子」秒殺整體拉力 F = (M+m)(g+a)/3，再隔離人求正向力 N',
    tags: ['自己拉自己', '多股滑輪系統', '正向力極限', '大考中心類題'],
    problem: '如圖所示，質量為 $m$ 的人站在質量為 $M$ 的吊掛平臺上，利用一個定滑輪與一個連接於平臺頂端的動滑輪組，人用力拉住繩子自由端後，人與平臺即一起以等加速度 $a$ 向上運動。若不計滑輪質量、繩與滑輪摩擦力及空氣阻力，且重力加速度值為 $g$，試求：',
    subquestions: [
      '(1) 此人對繩施力（即繩張力 $T$）大小為何？',
      '(2) 人與平臺之間的正向力 $N$ 大小為何？'
    ],
    choices: [],
    givens: [
      '人的質量為 m（預設 60 kg），平臺質量為 M（預設 60 kg）',
      '繩子繞過上方定滑輪與下方動滑輪後，由人向下拉住自由端',
      '共有 3 股繩張力共同支撐（人＋平臺＋動滑輪）系統',
      '人站在平臺上不分離條件：正向力 N ≥ 0 ⟹ 2m ≥ M'
    ],
    canvasHint: '💡 調整人的質量 m 或平台總重 M，觀察當 m < M/2 時系統為何出現「人脫離平台」警告！',
    selects: [],
    controls: [
      { id: 'm', label: '人的質量 m', unit: 'kg', min: 15, max: 100, step: 5, defaultVal: 60 },
      { id: 'M', label: '平臺（含載重）總質量 M', unit: 'kg', min: 20, max: 120, step: 5, defaultVal: 60 },
      { id: 'a', label: '目標向上加速度 a', unit: 'm/s²', min: 0.0, max: 6.0, step: 0.5, defaultVal: 2.0 }
    ],
    toggles: [
      { id: 'showSystemBox', label: '顯示「整體系統虛線框 (3T)」vs「隔離人受力圖」', defaultVal: true }
    ],
    presets: [
      { label: '📐 標準上升 (m=60, M=60, a=2)', state: { m: 60, M: 60, a: 2.0 } },
      { label: '⚖️ 類題臨界門檻 (m=50, M=100, N=0)', state: { m: 50, M: 100, a: 0.0 } },
      { label: '⚠️ 體重不足脫離 (m=35, M=100, a=2)', state: { m: 35, M: 100, a: 2.0 } },
      { label: '🕊️ 等速上升 (m=80, M=40, a=0)', state: { m: 80, M: 40, a: 0.0 } }
    ],
    legend: [
      { color: '#0f62fe', text: '系統虛線框穿出之 3 股向上繩張力 T' },
      { color: '#0b7b76', text: '平臺給人的向上正向力 N = (2m−M)(g+a)/3' },
      { color: '#d95f18', text: '向下重力 (M+m)g 與 mg' }
    ],
    simNote: '在預設 (m=60 kg, M=60 kg, a=2 m/s², g=10) 下，3T = 120×12 ⟹ T = 480 N；對人來說 T + N = 60×12 = 720 N ⟹ 正向力 N = 240 N。注意看：即使人「等速上升 (a=0)」，若人太輕 (m < M/2)，人腳對平台壓力 N 會變負（代表平台拉不起來，人反而自己爬繩往上跑）！',
    hints: [
      {
        title: '第一步：畫出包住「人＋平臺＋動滑輪」的系統虛線框！',
        question: '想像用一把大剪刀把系統與天花板剪開，這個「人＋平臺＋動滑輪」系統的上方共有幾條繩子拉住它？',
        guidance: '仔細數穿過虛線框頂部的繩股：(1) 動滑輪左側固定於定滑輪框的繩股 T、(2) 動滑輪右側繞上定滑輪的繩股 T、(3) 定滑輪右側通往人雙手的繩股 T！整整有 3 股向上的張力 T，而人與平臺之間的正向力 N 屬於系統「內力」互相抵消了！',
        formula: '系統向上總力 = 3T　｜　總質量 = M + m'
      },
      {
        title: '第二步：用整體法求第 (1) 小題施力 F = T',
        question: '整體向上以加速度 a 上升，列出 3T 與總重 (M+m)g 的牛頓第二定律。',
        guidance: '3T − (M + m)g = (M + m)a ⟹ 3T = (M + m)(g + a)，因此人拉繩子的施力（即繩張力）T = (1/3)(M + m)(g + a)。',
        formula: '3T − (M + m)g = (M + m)a　⟹　T = (M + m)(g + a) / 3'
      },
      {
        title: '第三步：單獨隔離「人」求第 (2) 小題正向力 N',
        question: '人在拉繩子的同時，受到哪些「外部力」作用？（別漏掉手上的繩張力！）',
        guidance: '人受 3 個外力：手握繩時繩子給人「向上」的反作用力 T、腳下平臺給人「向上」的正向力 N，以及地球給人「向下」的重力 mg。列式：T + N − mg = ma ⟹ N = m(g + a) − T，將第 (1) 小題的 T 代入化簡即可！',
        formula: 'N = m(g + a) − (M + m)(g + a)/3 = (2m − M)(g + a) / 3'
      }
    ],
    steps: [
      {
        title: '步驟 1：整體法（人 + 平臺 + 動滑輪）求 (1) 人施力大小 T',
        explanation: '將人、平臺與動滑輪看成同一系統（總質量 $M + m$），人與平臺間的相互作用力為內力不計。觀察穿出此系統頂端的繩索共有 <strong>3 股</strong>（每一股張力皆等於人施力 $F = T$），故向上的總外力為 $3T$：',
        katex: '3T - (M + m)g = (M + m)a \\implies T = \\frac{1}{3}(M + m)(g + a)',
        plainFormula: '(1) 施力 T = (1/3)(M + m)(g + a)',
        presetAction: { label: '檢視 3 股繩系統虛線框', state: { m: 60, M: 60, a: 2.0, showSystemBox: true } }
      },
      {
        title: '步驟 2：隔離「人」求 (2) 人與平臺間的正向力 N',
        explanation: '單獨分析質量為 $m$ 的人：人向下拉繩時，繩子給予人<strong>向上</strong>的拉力 $T$；平臺給人<strong>向上</strong>的正向力 $N$；重力 $mg$ <strong>向下</strong>。由 $T + N - mg = ma$ 得：',
        katex: 'N = m(g + a) - T = m(g + a) - \\frac{1}{3}(M + m)(g + a) = \\frac{1}{3}(2m - M)(g + a)',
        plainFormula: '(2) 正向力 N = (1/3)(2m − M)(g + a)'
      },
      {
        title: '步驟 3：分析「人無法把平台拉離地」的臨界條件 (N ≥ 0)',
        explanation: '因為接觸面間的正向力只能推不能拉（$N \\ge 0$），且 $g + a > 0$，要讓人站在平臺上一起順利上升，必須滿足 $2m - M \\ge 0 \\implies m \\ge \\dfrac{M}{2}$。若 $m < \\dfrac{M}{2}$，則人的體重不足以壓住平臺，人一拉繩自己就會騰空爬繩向上，平臺則留在地面不動！',
        katex: 'N = \\frac{1}{3}(2m - M)(g + a) \\ge 0 \\iff m \\ge \\frac{M}{2}',
        plainFormula: '臨界體重條件：人的質量 m 至少需為平臺總質量 M 的一半 (m ≥ M/2)',
        presetAction: { label: '切換至類題臨界狀態 m = M/2', state: { m: 50, M: 100, a: 0.0 } }
      }
    ],
    answerSummary: '(1) 人施力大小 T = (1/3)(M + m)(g + a)；\n(2) 人與平臺間的正向力 N = (1/3)(2m − M)(g + a)。',
    optionAnalysis: [
      '為什麼不是 2 股或 4 股？因為人握住的那一段「垂直向下拉」的繩子是從上方「定滑輪」下來的，它給人的手一個向上的拉力 T，所以對系統整體貢獻第 3 股向上拉力！',
      '驗算類題：當平臺＋重物 M = 100 kg 時，工人體重至少需 m ≥ M/2 = 50 kg 才拉得起來！'
    ],
    pitfall: '學生做這類「人在吊籃裡拉自己」的題目，九成會錯在「到底有幾股繩子拉起系統」！解法只有一招：畫一個封閉大圈把「人＋平台＋動滑輪」全部框進去，看看大圈的上方被切斷了幾根繩子——切到幾根就是幾 T！',
    quizzes: [
      {
        q: '1.【講義 p.4-20 大考中心模擬試題】搬運工人操縱同一滑輪組（定滑輪＋動滑輪）欲提升平台與重物。已知動滑輪與平台共重 20 kg，搭載重物為 80 kg，則工人體重至少多重才能達成任務？',
        options: ['(A) 100 kg', '(B) 80 kg', '(C) 50 kg', '(D) 40 kg', '(E) 無關'],
        correct: 2,
        explanation: '平台與重物總重 M = 20 + 80 = 100 kg。由正向力 N = (1/3)(2m − M)(g + a) ≥ 0 得 m ≥ M/2 = 50 kg，選 (C)！'
      },
      {
        q: '2.【講義 p.4-21 99預試類題】若平台長 2.00 m、重 20 kg，重物與工人皆重 80 kg，工人站在距右端 0.40 m 處拉繩等速上升（動滑輪繩綁於平台正中央 1.00 m 處）。欲使平台保持水平，重物重心應距右端多遠？（提示：繩給工人向上力 T，即壓在平台上的等效向下力為 mg − T！）',
        options: ['(A) 1.00 m', '(B) 1.05 m', '(C) 1.10 m', '(D) 1.15 m', '(E) 1.20 m'],
        correct: 3,
        explanation: '系統總重 M總 = 20 + 80 + 80 = 180 kg，故 3T = 180g ⟹ T = 60g。工人壓在平台上的正向力 N = mg − T = 80g − 60g = 20g（距右端 0.40 m，距中點 0.60 m）。對平台中點取力矩平衡：重物 (80g) × (x − 1.00) = 20g × 0.60 ⟹ x − 1.00 = 0.15 ⟹ x = 1.15 m，選 (D)！'
      }
    ]
  },

  // =========================================================================
  // 例題 10 (4-2-10): 八、視重 例 1〈加速電梯內的視重〉 (p. 4-25)
  // =========================================================================
  {
    id: '4-2-10',
    n: 10,
    page: '4-25',
    section: '§4-2 牛頓第二運動定律',
    topicGroup: '八、視重與電梯運動',
    topicTag: '八、視重・例 1',
    title: '加速電梯內的視重讀數與 v-t 梯形面積',
    subtitle: '由磅秤讀數反推三階段加速度（超重→等重→失重），透過 v-t 梯形圖精算 15 秒總位移',
    tags: ['視重與實重', '超重與失重', 'v-t 圖面積', '日大聯考經典'],
    problem: '一重量 $60\\text{ kg}$ 之人進入電梯後，立於一彈簧秤上。當電梯開始運動時，他發現彈簧磅秤的指標在開始 $5$ 秒鐘內指示於 $72\\text{ kg}$，$5$ 秒至 $10$ 秒間指示於 $60\\text{ kg}$，最後 $5$ 秒內指示於 $48\\text{ kg}$，然後電梯停止，則在此 $15$ 秒鐘內，電梯所行之距離為多少公尺？（設 $g = 9.8\\text{ m/s}^2$）【日大】',
    subquestions: [
      '判斷這三個 5 秒區間中，電梯分別進行何種運動（向上加速、等速或向上減速），並求總上升距離。'
    ],
    choices: [
      ['(A)', '$98\\text{ m}$', '98 m'],
      ['(B)', '$147\\text{ m}$', '147 m'],
      ['(C)', '$196\\text{ m}$', '196 m'],
      ['(D)', '$245\\text{ m}$', '245 m'],
      ['(E)', '$294\\text{ m}$', '294 m']
    ],
    givens: [
      '人的實重：60 kgw（質量 m = 60 kg）',
      '0 ~ 5 秒視重 N₁ = 72 kgw（視重 > 實重 ⟹ 向上加速）',
      '5 ~ 10 秒視重 N₂ = 60 kgw（視重 = 實重 ⟹ 等速上升）',
      '10 ~ 15 秒視重 N₃ = 48 kgw（視重 < 實重 ⟹ 向上減速至停止）',
      '重力加速度 g = 9.8 m/s²'
    ],
    canvasHint: '💡 點擊「▶ 播放動態模擬」或拖曳時間軸 t，同步看電梯上升、磅秤指針跳動與 v-t 梯形掃過面積！',
    selects: [],
    controls: [
      { id: 't', label: '經過時間 t', unit: 's', min: 0.0, max: 15.0, step: 0.1, defaultVal: 7.5 },
      { id: 'N1kg', label: '前 5 秒磅秤視重 N₁（後 5 秒對稱減至 120−N₁）', unit: 'kgw', min: 62, max: 90, step: 1, defaultVal: 72 }
    ],
    toggles: [
      { id: 'showVT', label: '右側顯示 v-t 梯形面積與視重階梯圖', defaultVal: true }
    ],
    presets: [
      { label: '⏱️ 0~5 s 加速末 (t = 5.0 s, 24.5 m)', state: { t: 5.0, N1kg: 72 } },
      { label: '🚀 5~10 s 等速中點 (t = 7.5 s, 49.0 m)', state: { t: 7.5, N1kg: 72 } },
      { label: '🛑 開始減速點 (t = 10.0 s, 73.5 m)', state: { t: 10.0, N1kg: 72 } },
      { label: '🏁 15 秒抵達停止 (t = 15.0 s, 98.0 m)', state: { t: 15.0, N1kg: 72 } }
    ],
    legend: [
      { color: '#0b7b76', text: '正向力（磅秤視重）N 與 v-t 梯形面積' },
      { color: '#d95f18', text: '實重 mg = 60g（恆定不變）' },
      { color: '#0f62fe', text: '電梯速度曲線 v(t)（最高 9.8 m/s）' }
    ],
    simNote: '記住超實用的比例法：視重多出 12 kgw（即實重 60 kgw 的 1/5），代表向上加速度 a = g/5 = 1.96 m/s²；同理最後 5 秒少 12 kgw，代表向下加速度（向上減速）a = −g/5 = −1.96 m/s²！',
    hints: [
      {
        title: '步驟一：釐清磅秤讀數的物理意義（視重 = 正向力 N）',
        question: '磅秤讀數顯示 72 kg（72 kgw）時，是人的質量變重了，還是什麼力變大了？',
        guidance: '人的質量 m = 60 kg 與實重 mg = 60 kgw 永遠不變！磅秤測量的是「人壓秤面（或秤面頂住人）的正向力 N」。當 N > mg 時，代表向上的合力 (N − mg) > 0，故電梯正在「向上加速」！',
        formula: '視重 N = 72 kgw > 實重 60 kgw　⟹　合力向上 = 12 kgw = 12g'
      },
      {
        title: '步驟二：求出第一階段加速度與第 5 秒末的最高速度',
        question: '向上的淨力為 12g（牛頓），作用在 60 kg 的人身上，產生多大的加速度？5 秒後速度達到多少？',
        guidance: '由 F合力 = ma ⟹ 12g = 60·a₁ ⟹ a₁ = (12/60)g = 0.2g = 0.2 × 9.8 = 1.96 m/s²。從靜止加速 5 秒後，最大速度 v_max = a₁·t₁ = 1.96 × 5 = 9.8 m/s（剛好等於 1 個 g 的數值）！',
        formula: 'a₁ = 12g / 60 = 0.2g = 1.96 m/s²　⟹　v_max = 1.96 × 5 = 9.8 m/s'
      },
      {
        title: '步驟三：畫出完整 15 秒的 v-t 圖，用梯形面積求總距離',
        question: '5 ~ 10 秒視重等於實重（等速），10 ~ 15 秒視重減為 48 kgw（向上減速），這段 v-t 圖是什麼形狀？',
        guidance: '0~5 秒線性加速至 9.8 m/s；5~10 秒維持 9.8 m/s 等速；10~15 秒以對稱加速度 −1.96 m/s² 減速至 0。整個 v-t 圖就是一個上底 5 s、下底 15 s、高 9.8 m/s 的梯形！面積 = (5 + 15) × 9.8 / 2 = 98 m。',
        formula: 'Δy = (上底 + 下底) × 高 / 2 = (5 + 15) × 9.8 / 2 = 98 m'
      }
    ],
    steps: [
      {
        title: '步驟 1：分析三階段視重，求各區間加速度',
        explanation: '設向上為正方向，磅秤讀數即正向力 $N$，對人列 $N - mg = ma$：\n• <strong>$0 \\sim 5\\text{ s}$</strong>：$N_1 = 72g \\implies 72g - 60g = 60 a_1 \\implies a_1 = +\\dfrac{1}{5}g = +1.96\\text{ m/s}^2$（向上加速）。\n• <strong>$5 \\sim 10\\text{ s}$</strong>：$N_2 = 60g \\implies a_2 = 0$（等速上升）。\n• <strong>$10 \\sim 15\\text{ s}$</strong>：$N_3 = 48g \\implies 48g - 60g = 60 a_3 \\implies a_3 = -\\dfrac{1}{5}g = -1.96\\text{ m/s}^2$（向上減速至靜止）。',
        katex: 'a_1 = +\\frac{72 - 60}{60}g = 0.2g = 1.96\\text{ m/s}^2, \\qquad a_2 = 0, \\qquad a_3 = -1.96\\text{ m/s}^2',
        plainFormula: '0~5s：a₁ = +1.96 m/s²；5~10s：a₂ = 0；10~15s：a₃ = −1.96 m/s²',
        presetAction: { label: '觀察第 0~5 s 超重加速階段', state: { t: 2.5, N1kg: 72 } }
      },
      {
        title: '步驟 2：求等速段最高速度 v_max',
        explanation: '電梯由靜止起動，經過前 $5\\text{ s}$ 加速後達到最高速率：',
        katex: 'v_{\\max} = 0 + a_1 t_1 = (0.2g) \\times 5 = 1.0 \\times g = 9.8\\text{ m/s}',
        plainFormula: 'v_max = 1.96 × 5 = 9.8 m/s',
        presetAction: { label: '跳至第 5.0 s 達最高速點', state: { t: 5.0, N1kg: 72 } }
      },
      {
        title: '步驟 3：計算 v-t 圖梯形面積求 15 秒總位移',
        explanation: '畫出 $v\\text{-}t$ 圖（如講義 p.4-25 附圖所示，為一對稱梯形，上底 $5\\text{ s}$、下底 $15\\text{ s}$、高 $9.8\\text{ m/s}$），總行進距離即為梯形面積：',
        katex: 'S = \\frac{(5 + 15) \\times 9.8}{2} = 10 \\times 9.8 = 98\\text{ m}',
        plainFormula: 'S = (5 + 15) × 9.8 / 2 = 98 m（各段依序為 24.5 m + 49.0 m + 24.5 m），故選 (A)',
        presetAction: { label: '跳至第 15.0 s 觀看完整梯形面積', state: { t: 15.0, N1kg: 72 } }
      }
    ],
    answerSummary: '正確答案為 (A) 98 m。（0~5s 上升 24.5 m，5~10s 上升 49.0 m，10~15s 上升 24.5 m，總計 98 m）',
    optionAnalysis: [
      '(A) 正確：v_max = 9.8 m/s，梯形面積 = ½(5 + 15)×9.8 = 98 m。',
      '(B) 錯誤：147 = 15 × 9.8，錯把梯形當成長方形面積直接乘以 15 秒。',
      '(C) 錯誤：196 = 2 × 98，忘記梯形面積公式要除以 2。',
      '(D) 錯誤：數值算錯。',
      '(E) 錯誤：誤用 g × 30 等錯誤公式。'
    ],
    pitfall: '有些同學看到最後 5 秒磅秤讀數 48 kgw 比實重小，就直覺以為「電梯在最後 5 秒往下掉（向下移動）」，進而把最後 5 秒的位移拿去減掉！大錯特錯！前 5 秒已經累積了向上 9.8 m/s 的速度，最後 5 秒加速度向下代表的是「電梯繼續往上走，但速度越來越慢直到停下來」，整個 15 秒全程都是往上樓移動，三段位移全部要相加！',
    quizzes: [
      {
        q: '1. 當電梯運行在「第 12 秒（位於 10~15 秒的失重區間，磅秤讀數 48 kgw）」時，電梯的運動方向與加速度方向分別為何？',
        options: ['速度向上，加速度向上', '速度向上，加速度向下（向上減速）', '速度向下，加速度向下'],
        correct: 1,
        explanation: '整個 0~15 秒速度 v(t) 皆大於 0（全程往上走），但 10~15 秒因 N < mg 使得加速度方向向下，代表電梯正「向上減速」準備停在該樓層！'
      },
      {
        q: '2. 若把電梯纜繩突然剪斷，使電梯以加速度 g 自由墜落（失重），此時磅秤上的讀數會顯示多少 kg？',
        options: ['60 kg', '30 kg', '0 kg'],
        correct: 2,
        explanation: '自由墜落時等效重力加速度 g\' = g − g = 0，正向力 N = m(g − g) = 0，磅秤讀數歸零（完全失重狀態）。'
      }
    ]
  }
];
