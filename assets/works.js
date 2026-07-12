/* =========================================================
   作品資料檔 works.js
   ---------------------------------------------------------
   新增一個作品：複製陣列裡任一筆物件貼到「最前面」（新的排前面），
   改以下欄位即可，首頁精選與作品頁會自動更新：

   id       : 唯一代號（用 repo 名即可）
   title    : 卡片標題
   desc     : 一兩句介紹（給誰用、解決什麼）
   url      : 網站網址
   repo     : GitHub repo 網址（沒有就留空字串）
   cat      : 分類，必須是下面 CATS 其中之一
   tags     : 2–5 個標籤
   date     : 'YYYY-MM'（大致完成月份）
   featured : true 會出現在首頁精選（建議維持 6–8 個 true）
   ========================================================= */

const CATS = ['自學評量', '錯題詳解', '探究與實作', '課程工具', '社群與共備', 'AI × 教育'];

const WORKS = [
  {
    id: 'AT_tutor',
    title: '後醫考古題自學平台 AT_tutor',
    desc: '後醫入學考的考古題自學平台：原題截圖、自動批改、錯題練習、繁中詳解，並附教師端統計。',
    url: 'https://addielu-phy.github.io/AT_tutor/',
    repo: 'https://github.com/addielu-phy/AT_tutor',
    cat: '自學評量',
    tags: ['後醫考古題', '自動批改', '錯題練習', '教師統計'],
    date: '2026-07',
    featured: true
  },
  {
    id: 'nknush-high1-math-third-exam-explained',
    title: '高師大附中高一數學段考逐題詳解',
    desc: '114-2 高一數學第三次段考，一題一題講清楚：解題步驟、觀念與易錯點。',
    url: 'https://addielu-phy.github.io/nknush-high1-math-third-exam-explained/',
    repo: 'https://github.com/addielu-phy/nknush-high1-math-third-exam-explained',
    cat: '錯題詳解',
    tags: ['高一數學', '段考詳解', 'MathJax'],
    date: '2026-07',
    featured: false
  },
  {
    id: 'exam-review-summer-2026',
    title: '暑假會考複習每日進度表',
    desc: '7/10–8/31 的國中會考複習日曆：每天該讀哪些單元、進度打勾追蹤，一頁掌握整個暑假。',
    url: 'https://addielu-phy.github.io/exam-review-summer-2026/',
    repo: 'https://github.com/addielu-phy/exam-review-summer-2026',
    cat: '課程工具',
    tags: ['國中會考', '讀書計畫', '進度追蹤'],
    date: '2026-07',
    featured: false
  },
  {
    id: 'phai-platform',
    title: 'PhAI 資源館｜AI × 物理教學共備平台',
    desc: 'PhAI 共學圈的資源分享平台：收錄社群老師的 AI 物理教學案例、互動模擬、探究命題與教師工作流，可搜尋、篩選、投稿。',
    url: 'https://addielu-phy.github.io/phai-platform/',
    repo: 'https://github.com/addielu-phy/phai-platform',
    cat: '社群與共備',
    tags: ['教師共備', 'AI 教學案例', '資源目錄', '投稿系統'],
    date: '2026-07',
    featured: true
  },
  {
    id: 'cap-review',
    title: '國中教育會考自學複習',
    desc: '會考複習的線上練習網站：分科作答、即時對答案，自己排進度自己練。',
    url: 'https://addielu-phy.github.io/cap-review/',
    repo: 'https://github.com/addielu-phy/cap-review',
    cat: '自學評量',
    tags: ['國中會考', '線上練習', '自動評分'],
    date: '2026-07',
    featured: false
  },
  {
    id: 'wu-fu-buoyancy-quiz',
    title: '浮力歷屆題自學評量（五福國中）',
    desc: '把「浮力」歷屆段考題做成可線上作答的自學評量，自動評分並附詳解。',
    url: 'https://addielu-phy.github.io/wu-fu-buoyancy-quiz/',
    repo: 'https://github.com/addielu-phy/wu-fu-buoyancy-quiz',
    cat: '自學評量',
    tags: ['國中理化', '浮力', '歷屆段考題'],
    date: '2026-06',
    featured: false
  },
  {
    id: 'elective-final-presentation-peer-review',
    title: '多元選修期末發表互評網站',
    desc: '期末發表現場的即時互評工具：全班掃碼進場、依評分規準給分回饋，結果即時彙整。',
    url: 'https://addielu-phy.github.io/elective-final-presentation-peer-review/',
    repo: 'https://github.com/addielu-phy/elective-final-presentation-peer-review',
    cat: '課程工具',
    tags: ['同儕互評', '多元選修', '即時彙整'],
    date: '2026-06',
    featured: false
  },
  {
    id: 'inquiry-practice-report-platform',
    title: '探究與實作期末報告平台',
    desc: '探究與實作課程的期末報告線上平台：繳交、展示與審閱一站完成。',
    url: 'https://addielu-phy.github.io/inquiry-practice-report-platform/',
    repo: 'https://github.com/addielu-phy/inquiry-practice-report-platform',
    cat: '探究與實作',
    tags: ['探究與實作', '報告平台', '課程管理'],
    date: '2026-06',
    featured: false
  },
  {
    id: 'kshs-physics-quiz',
    title: '高二物理自學評量｜雄中高二下期末',
    desc: '高雄中學高二下期末範圍的物理自學評量：線上作答、自動評分、錯題分析與詳解。',
    url: 'https://addielu-phy.github.io/kshs-physics-quiz/',
    repo: 'https://github.com/addielu-phy/kshs-physics-quiz',
    cat: '自學評量',
    tags: ['高中物理', '段考複習', '錯題分析'],
    date: '2026-06',
    featured: true
  },
  {
    id: 'kshs-physics-quiz-113-2-3',
    title: '高二物理自學評量｜113 下第三次段考',
    desc: '高雄中學 113 學年下學期第三次段考物理，做成可重複練習的線上評量。',
    url: 'https://addielu-phy.github.io/kshs-physics-quiz-113-2-3/',
    repo: 'https://github.com/addielu-phy/kshs-physics-quiz-113-2-3',
    cat: '自學評量',
    tags: ['高中物理', '歷屆段考', '線上評量'],
    date: '2026-06',
    featured: false
  },
  {
    id: 'physics-quiz',
    title: '理化自學評量｜國二下期末',
    desc: '國二下理化期末的自學評量網頁：作答、自動評分、錯題分析詳解，可重複練習。',
    url: 'https://addielu-phy.github.io/physics-quiz/',
    repo: 'https://github.com/addielu-phy/physics-quiz',
    cat: '自學評量',
    tags: ['國中理化', '自動評分', '錯題分析'],
    date: '2026-06',
    featured: true
  },
  {
    id: 'physics-errata',
    title: '物理錯題本｜線上講解',
    desc: '學生的計算過程照片，變成一頁頁完整講解：診斷「真正算錯的那一步」、逐題詳解、易錯點與對症練習。',
    url: 'https://addielu-phy.github.io/physics-errata/',
    repo: 'https://github.com/addielu-phy/physics-errata',
    cat: '錯題詳解',
    tags: ['錯誤診斷', '逐題詳解', '對症練習', 'MathJax'],
    date: '2026-06',
    featured: true,
    lead: true   /* 首頁精選的主打卡（版面加大） */
  },
  {
    id: 'physics-errata-rotation',
    title: '錯題詳解｜轉動・能量・圓周運動',
    desc: '針對轉動、能量守恆與圓周運動的錯題詳解與加強練習專頁。',
    url: 'https://addielu-phy.github.io/physics-errata-rotation/',
    repo: 'https://github.com/addielu-phy/physics-errata-rotation',
    cat: '錯題詳解',
    tags: ['轉動', '能量守恆', '圓周運動'],
    date: '2026-06',
    featured: false
  },
  {
    id: 'solar-panel-materials',
    title: '太陽能發電共同研究・實驗器材介紹',
    desc: '台日太陽光電共同研究的實驗機材介紹頁（中日雙語），支援跨國探究合作。',
    url: 'https://addielu-phy.github.io/solar-panel-materials/',
    repo: 'https://github.com/addielu-phy/solar-panel-materials',
    cat: '探究與實作',
    tags: ['太陽能', '國際共研', '中日雙語'],
    date: '2026-06',
    featured: false
  },
  {
    id: 'brazil-nut-effect',
    title: '震出個所以然：巴西堅果效應',
    desc: '高中物理探究與實作的入門教學網站：從一罐堅果的分層現象出發，帶學生走完一次探究歷程。',
    url: 'https://addielu-phy.github.io/brazil-nut-effect/',
    repo: 'https://github.com/addielu-phy/brazil-nut-effect',
    cat: '探究與實作',
    tags: ['顆粒物理', '探究入門', '教學網站'],
    date: '2026-05',
    featured: true
  },
  {
    id: 'wu-fu-physics-quiz',
    title: '摩擦力歷屆段考考古題（五福國中）',
    desc: '國二下理化「摩擦力」單元的歷屆經典段考題，線上作答即時對答案。',
    url: 'https://addielu-phy.github.io/wu-fu-physics-quiz/',
    repo: 'https://github.com/addielu-phy/wu-fu-physics-quiz',
    cat: '自學評量',
    tags: ['國中理化', '摩擦力', '考古題'],
    date: '2026-05',
    featured: false
  },
  {
    id: 'kh-inquiry-community-site',
    title: '高雄市探究與實作社群',
    desc: '跨校教師共備社群的官方網站：活動訊息、共備成果與社群資源的入口。',
    url: 'https://addielu-phy.github.io/kh-inquiry-community-site/',
    repo: 'https://github.com/addielu-phy/kh-inquiry-community-site',
    cat: '社群與共備',
    tags: ['跨校共備', '探究與實作', '教師社群'],
    date: '2026-05',
    featured: true
  },
  {
    id: 'ai-coding-tools-free-comparison',
    title: 'AI Coding 工具免費帳號實測比較',
    desc: 'Google Antigravity、Claude Code、Codex 三家免費帳號的實用比較，寫給想入門 AI 工具的老師。',
    url: 'https://addielu-phy.github.io/ai-coding-tools-free-comparison/',
    repo: 'https://github.com/addielu-phy/ai-coding-tools-free-comparison',
    cat: 'AI × 教育',
    tags: ['AI 工具', '實測比較', '教師入門'],
    date: '2026-04',
    featured: false
  },
  {
    id: 'water-drop-lens',
    title: '水滴微透鏡互動模擬',
    desc: '用薄透鏡公式玩光學：調整水滴曲率與距離，即時看成像變化的互動模擬。',
    url: 'https://addielu-phy.github.io/water-drop-lens/',
    repo: 'https://github.com/addielu-phy/water-drop-lens',
    cat: '探究與實作',
    tags: ['幾何光學', '互動模擬', '薄透鏡'],
    date: '2026-03',
    featured: true
  }
];
