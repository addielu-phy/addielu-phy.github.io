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
   embed    : 選填。false 表示 AI 展示頁不要放 iframe（密碼或共用碼牆）
   note     : 選填。展示卡上的短註，例如「需密碼」
   spotlight: 選填。true 會出現在 AI 展示頁最上方精選
   series   : 選填。同組子作品在展示頁排在一起
   ========================================================= */

const CATS = ['自學評量', '錯題詳解', '探究與實作', '課程工具', '社群與共備', 'AI × 教育'];

const WORKS = [
{
  "id": "claude-sims",
  "title": "Claude 版互動物理模擬總庫",
  "desc": "高中與國中物理的 Claude 版互動教材目錄。滑輪九題、電場五例、木箱傾倒、槓桿、地科圖解與高雄段考古題索引都從這裡進去。",
  "url": "https://addielu-phy.github.io/claude-sims/",
  "repo": "https://github.com/addielu-phy/claude-sims",
  "cat": "課程工具",
  "tags": [
    "Claude 版",
    "互動模擬",
    "高中物理",
    "總目錄"
  ],
  "date": "2026-11",
  "spotlight": true,
  "featured": false
},
{
  "id": "newton-4-2-gpt",
  "title": "4-2 牛頓第二運動定律｜十道例題（GPT 版）",
  "desc": "高中物理第四章十道例題：定力與懸重、氣球、繩張力、連結體、滑輪與電梯視重。先作答，再展開提示、詳解與動畫。",
  "url": "https://addielu-phy.github.io/newton-4-2-gpt/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/newton-4-2-gpt",
  "cat": "課程工具",
  "tags": [
    "高中物理",
    "牛頓第二運動定律",
    "互動模擬",
    "GPT 版"
  ],
  "date": "2026-11",
  "featured": false
},
{
  "id": "single-slit-gpt",
  "title": "單狹縫光程差實驗室（GPT 版）",
  "desc": "單狹縫繞射互動實驗：六等分狹縫、光程差、波源相消與亮紋位置，可調參數並對照圖形。",
  "url": "https://addielu-phy.github.io/single-slit-gpt/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/single-slit-gpt",
  "cat": "探究與實作",
  "tags": [
    "波動光學",
    "單狹縫",
    "互動模擬",
    "GPT 版"
  ],
  "date": "2026-11",
  "featured": false
},
{
  "id": "cubesat-chips-grok",
  "title": "探空氣球立方衛星晶片彙整（Grok 版）",
  "desc": "高雄中學探空氣球立方衛星計畫的晶片與模組選型表，整理規格、近空適用性與台灣可購買的型號。",
  "url": "https://addielu-phy.github.io/cubesat-chips-grok/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/cubesat-chips-grok",
  "cat": "探究與實作",
  "tags": [
    "立方衛星",
    "探空氣球",
    "元件選型",
    "Grok 版"
  ],
  "date": "2026-11",
  "featured": false
},
{
  "id": "math-a-nanyi-exam2",
  "title": "南一高二上數學 A｜第二次段考複習 2-1～2-3",
  "desc": "指數函數、對數與對數律、對數函數。十四個重點與二十八題自編代表題，詳解按鈕展開。",
  "url": "https://addielu-phy.github.io/math-a-nanyi-exam2/",
  "repo": "https://github.com/addielu-phy/math-a-nanyi-exam2",
  "cat": "自學評量",
  "tags": [
    "高二數學",
    "指數對數",
    "段考複習",
    "南一版"
  ],
  "date": "2026-11",
  "featured": false
},
{
  "id": "inquiry-report-platform-firebase",
  "title": "探究與實作上台報告平台（Firebase 收分版）",
  "desc": "抽籤排序、QR 進場、三向度評量、計時與即時收分，結束後可看平均並匯出。進場前名單由老師自行輸入。",
  "url": "https://addielu-phy.github.io/inquiry-report-platform-firebase/",
  "repo": "https://github.com/addielu-phy/inquiry-report-platform-firebase",
  "cat": "課程工具",
  "tags": [
    "探究與實作",
    "上台報告",
    "即時評分",
    "Firebase"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "kshs-typt-random-draw",
  "title": "雄中 TYPT｜IYPT 即席英文演說抽題",
  "desc": "校隊甄選用的中英雙語抽題台。題目不重複抽出，可全螢幕計時，頁面不含預先寫入的學生名單。",
  "url": "https://addielu-phy.github.io/kshs-typt-random-draw/",
  "repo": "https://github.com/addielu-phy/kshs-typt-random-draw",
  "cat": "課程工具",
  "tags": [
    "TYPT",
    "IYPT",
    "抽題",
    "英文演說"
  ],
  "date": "2026-09",
  "featured": false
},
{
  "id": "wind-power",
  "title": "風把葉片吹轉，電從哪裡來？",
  "desc": "盧政良的立體物理書。跟著能量走過風力發電機：翻開 3D 書頁、切換開閉路，看磁通、電動勢與能量守恆。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/physics/wind-power/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/physics/wind-power",
  "cat": "探究與實作",
  "tags": [
    "電磁學",
    "能量守恆",
    "立體書",
    "互動模擬"
  ],
  "date": "2026-10",
  "spotlight": true,
  "featured": false
},
{
  "id": "openmaic-lite-physics",
  "title": "OpenMAIC Physics｜繁中高中物理多代理互動教室",
  "desc": "由一個課題生成大綱，再轉成投影片、測驗、模擬、問題本位學習、白板與講義的繁中物理教室。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/physics/openmaic-lite-physics-zh-tw/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/physics/openmaic-lite-physics-zh-tw",
  "cat": "AI × 教育",
  "tags": [
    "多代理",
    "高中物理",
    "課堂生成",
    "AI 輔助教學"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "phai-codex-agent-2026-05-20",
  "title": "PhAI 共學圈｜Codex × Agent 協作簡報",
  "desc": "讓 AI 成為教學助理團隊的共學簡報：怎麼把 Codex 與 Agent 排進備課、出題與改作流程。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/presentations/phai-codex-agent-2026-05-20/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/presentations/phai-codex-agent-2026-05-20",
  "cat": "AI × 教育",
  "tags": [
    "PhAI",
    "簡報",
    "Agent",
    "教師共學"
  ],
  "date": "2026-05",
  "featured": false
},
{
  "id": "collision-momentum-impulse",
  "title": "§7-7 碰撞｜動量守恆與衝量",
  "desc": "動量守恆、衝量、彈性與非彈性碰撞、恢復係數。例題有動畫，練習題附詳解。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/physics/collision-momentum-impulse/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/physics/collision-momentum-impulse",
  "cat": "錯題詳解",
  "tags": [
    "動量",
    "碰撞",
    "衝量",
    "高中物理"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "vertical-circular-motion-energy",
  "title": "力學能守恆｜鉛直圓周、斜面與彈簧",
  "desc": "依講義整理能量觀念、代表例題與練習詳解，並用動畫看鉛直圓周、摩擦斜面與彈簧能量。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/physics/vertical-circular-motion-energy/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/physics/vertical-circular-motion-energy",
  "cat": "錯題詳解",
  "tags": [
    "力學能",
    "圓周運動",
    "彈簧",
    "詳解"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "conical-pendulum-lagrange",
  "title": "用拉格朗日力學解圓錐擺",
  "desc": "從拘束與座標寫到拉格朗日方程式，說明圓錐擺的週期與張力怎麼來。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/physics/conical-pendulum-lagrange/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/physics/conical-pendulum-lagrange",
  "cat": "探究與實作",
  "tags": [
    "圓錐擺",
    "拉格朗日",
    "高中物理",
    "進階"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "two-mass-spring-oscillator",
  "title": "雙質量彈簧振子互動模擬",
  "desc": "兩個物體中間連一條彈簧，壓縮後自由振盪。可看質心運動與相對振動。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/physics/two-mass-spring-oscillator/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/physics/two-mass-spring-oscillator",
  "cat": "探究與實作",
  "tags": [
    "簡諧運動",
    "彈簧",
    "互動模擬",
    "高中物理"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "sweet-monochromator",
  "title": "甜的單色器｜糖水旋光",
  "desc": "白光 LED、偏振片與飽和糖水的旋光色散模型。可掃描角度、讀四個波段，並對照探究活動。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/physics/sweet-monochromator-sugar-water/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/physics/sweet-monochromator-sugar-water",
  "cat": "探究與實作",
  "tags": [
    "旋光",
    "偏振",
    "IYPT",
    "互動模擬"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "y-shaped-bowditch-pendulum",
  "title": "Y 型擺（Bowditch pendulum）互動研究室",
  "desc": "Y 型擺的互動模擬，可調長度與初始條件，觀察利薩如軌跡與拍頻。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/physics/y-shaped-bowditch-pendulum/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/physics/y-shaped-bowditch-pendulum",
  "cat": "探究與實作",
  "tags": [
    "Y 型擺",
    "IYPT",
    "振動",
    "互動模擬"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "typt19-acoustics",
  "title": "聲學研究工作台",
  "desc": "在瀏覽器裡看波形、頻譜與時頻圖，把實驗曲線和物理模型放在一起比較。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/physics/typt19-acoustics/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/physics/typt19-acoustics",
  "cat": "探究與實作",
  "tags": [
    "聲學",
    "頻譜",
    "TYPT",
    "實驗分析"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "solar-panel-student-research",
  "title": "中學生太陽能板研究與應用彙整",
  "desc": "整理太陽能板、染料敏化電池、農電共生與冷卻增效的科展、論文和教材，供探究選題參考。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/research/solar-panel-student-research/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/research/solar-panel-student-research",
  "cat": "探究與實作",
  "tags": [
    "太陽能",
    "探究選題",
    "文獻",
    "STEM"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "dsat-114-physics-self-study",
  "title": "114 分科測驗物理｜自學評量",
  "desc": "114 學年度分科測驗物理自學練習：作答、自動評分、錯題分析與詳解，可重複練。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/physics/dsat-114-physics-self-study/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/physics/dsat-114-physics-self-study",
  "cat": "自學評量",
  "tags": [
    "分科測驗",
    "高中物理",
    "自動評分",
    "錯題"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "dsat-physics-five-year-topical",
  "title": "近五年分科物理｜主題式自學評量",
  "desc": "110 至 114 年分科與指考物理，依力學、熱學、光學、電磁學、近代物理與子單元排成可重複練習的題序。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/physics/dsat-physics-five-year-topical/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/physics/dsat-physics-five-year-topical",
  "cat": "自學評量",
  "tags": [
    "分科測驗",
    "主題式",
    "高中物理",
    "錯題"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "cap-115-nature-physics",
  "title": "115 會考自然科｜物理試題整理",
  "desc": "115 年國中教育會考自然科裡的物理試題截圖，附概念分類、參考答案與官方來源。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/exams/cap-115-nature-physics/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/exams/cap-115-nature-physics",
  "cat": "自學評量",
  "tags": [
    "會考",
    "自然科",
    "物理",
    "試題整理"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "nanyi-math-1b-ch3-probability",
  "title": "高一下數學｜南一第三章機率",
  "desc": "重點整理、常見題型、重要試題解說與考前檢核，對應南一版高一下第三章。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/math/nanyi-math-1b-ch3-probability/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/math/nanyi-math-1b-ch3-probability",
  "cat": "自學評量",
  "tags": [
    "高一數學",
    "機率",
    "南一版",
    "段考"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "nknush-114-2-g10-math-exam1",
  "title": "高師大附中高一數學｜114-2 第一次段考逐題詳解",
  "desc": "單選、多選、填充與計算證明題的逐題詳解，對應 114 學年度第二學期第一次段考。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/math/nknush-114-2-g10-math-exam1-solutions/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/math/nknush-114-2-g10-math-exam1-solutions",
  "cat": "錯題詳解",
  "tags": [
    "高一數學",
    "段考詳解",
    "附中",
    "逐題"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "nknush-basic-counting-3-1",
  "title": "高一下｜南一 3-1 基本計數原理互動題庫",
  "desc": "附中公開考古題依主題與難易重排。答案與詳解預設收合，按鈕展開。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/math/nknush-nanyi-1b-3-1-basic-counting/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/math/nknush-nanyi-1b-3-1-basic-counting",
  "cat": "自學評量",
  "tags": [
    "高一數學",
    "計數原理",
    "考古題",
    "南一版"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "nknush-prob-3-2",
  "title": "高一下段考｜3-2 機率的性質題庫",
  "desc": "彙整附中高一下近年段考中，對應南一版 3-2 的題目，附來源、篩選說明與答案提示。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/math/nknush-g1b-probability-3-2/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/math/nknush-g1b-probability-3-2",
  "cat": "自學評量",
  "tags": [
    "高一數學",
    "機率",
    "段考",
    "附中"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "l07-feiyu-terms",
  "title": "國文〈飛魚〉名詞注釋翻卡",
  "desc": "二下第七課名詞注釋：隨機翻卡、對錯統計與錯題再練。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/chinese/l07-feiyu-terms/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/chinese/l07-feiyu-terms",
  "cat": "自學評量",
  "tags": [
    "國中國文",
    "翻卡",
    "注釋",
    "飛魚"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "l08-kongchengji-terms",
  "title": "國文〈空城計〉名詞注釋翻卡",
  "desc": "二下第八課名詞注釋：隨機翻卡、對錯統計與錯題再練。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/chinese/l08-kongchengji-terms/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/chinese/l08-kongchengji-terms",
  "cat": "自學評量",
  "tags": [
    "國中國文",
    "翻卡",
    "注釋",
    "空城計"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "l09-miluojiangshen-terms",
  "title": "國文〈汨羅江神〉名詞注釋翻卡",
  "desc": "二下第九課名詞注釋：隨機翻卡、對錯統計與錯題再練。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/chinese/l09-miluojiangshen-terms/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/chinese/l09-miluojiangshen-terms",
  "cat": "自學評量",
  "tags": [
    "國中國文",
    "翻卡",
    "注釋",
    "汨羅江神"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "jhs-science-b4-b2",
  "title": "國中自然第二冊・第四冊總入口",
  "desc": "跨版本重點、會考提醒與原創練習的學生入口。教師版頁面不另列，由站內進入。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/science/jhs-science-b4-b2/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/science/jhs-science-b4-b2",
  "cat": "自學評量",
  "tags": [
    "國中自然",
    "重點整理",
    "會考",
    "總入口"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "wufu-organic-ch5",
  "title": "五福國中國二下｜第 5 章有機化合物題庫",
  "desc": "110 至 113 學年度期末自然第五章題目，依主題與難易重排，答案與詳解預設收合。",
  "url": "https://addielu-phy.github.io/ai-coding-tools-free-comparison/exams/wufu-jh-8b-final-science-ch5/",
  "repo": "https://github.com/addielu-phy/ai-coding-tools-free-comparison/tree/main/exams/wufu-jh-8b-final-science-ch5",
  "cat": "自學評量",
  "tags": [
    "國二理化",
    "有機化合物",
    "五福國中",
    "期末"
  ],
  "date": "2026-10",
  "featured": false
},
{
  "id": "claude-pulley-4-2",
  "title": "4-2 滑輪練習題互動解說（Claude 版）",
  "desc": "牛頓第二運動定律的九題滑輪練習總頁。每題一頁，題目直接顯示，引導與詳解可展開。",
  "url": "https://addielu-phy.github.io/claude-sims/pulley-4-2/",
  "repo": "https://github.com/addielu-phy/claude-sims/tree/main/pulley-4-2",
  "cat": "探究與實作",
  "tags": [
    "滑輪",
    "牛頓第二運動定律",
    "Claude 版",
    "高中物理"
  ],
  "date": "2026-11",
  "series": "Claude 版・4-2 滑輪",
  "featured": false
},
{
  "id": "claude-pulley-p1",
  "title": "滑輪練習 1｜兩斜面交換位置",
  "desc": "53° 與 37° 兩光滑斜面上的物體交換位置後，求加速度。可操作模擬並展開計算。",
  "url": "https://addielu-phy.github.io/claude-sims/pulley-4-2/p1/",
  "repo": "https://github.com/addielu-phy/claude-sims/tree/main/pulley-4-2/p1",
  "cat": "探究與實作",
  "tags": [
    "滑輪",
    "斜面",
    "Claude 版"
  ],
  "date": "2026-11",
  "series": "Claude 版・4-2 滑輪",
  "featured": false
},
{
  "id": "claude-pulley-p2",
  "title": "滑輪練習 2｜阿特午機落地前後",
  "desc": "質量 m 與 2m 的阿特午機，看 2m 落地前後的加速度、張力與上升高度。",
  "url": "https://addielu-phy.github.io/claude-sims/pulley-4-2/p2/",
  "repo": "https://github.com/addielu-phy/claude-sims/tree/main/pulley-4-2/p2",
  "cat": "探究與實作",
  "tags": [
    "阿特午機",
    "滑輪",
    "Claude 版"
  ],
  "date": "2026-11",
  "series": "Claude 版・4-2 滑輪",
  "featured": false
},
{
  "id": "claude-pulley-p3",
  "title": "滑輪練習 3｜讓車上的物體相對靜止",
  "desc": "車頂上的物體跨過滑輪連到車廂側邊，求使它相對車靜止的加速度。",
  "url": "https://addielu-phy.github.io/claude-sims/pulley-4-2/p3/",
  "repo": "https://github.com/addielu-phy/claude-sims/tree/main/pulley-4-2/p3",
  "cat": "探究與實作",
  "tags": [
    "相對靜止",
    "滑輪",
    "Claude 版"
  ],
  "date": "2026-11",
  "series": "Claude 版・4-2 滑輪",
  "featured": false
},
{
  "id": "claude-pulley-p4",
  "title": "滑輪練習 4｜桌面木塊與動滑輪",
  "desc": "光滑桌面上的木塊連接吊著另一物的動滑輪，看兩段繩的張力與加速度。",
  "url": "https://addielu-phy.github.io/claude-sims/pulley-4-2/p4/",
  "repo": "https://github.com/addielu-phy/claude-sims/tree/main/pulley-4-2/p4",
  "cat": "探究與實作",
  "tags": [
    "動滑輪",
    "張力",
    "Claude 版"
  ],
  "date": "2026-11",
  "series": "Claude 版・4-2 滑輪",
  "featured": false
},
{
  "id": "claude-pulley-p5",
  "title": "滑輪練習 5｜施力上拉動滑輪",
  "desc": "向上拉質量不計的滑輪，判斷重物何時離地，以及力再加大時的加速度。",
  "url": "https://addielu-phy.github.io/claude-sims/pulley-4-2/p5/",
  "repo": "https://github.com/addielu-phy/claude-sims/tree/main/pulley-4-2/p5",
  "cat": "探究與實作",
  "tags": [
    "動滑輪",
    "牛頓第二運動定律",
    "Claude 版"
  ],
  "date": "2026-11",
  "series": "Claude 版・4-2 滑輪",
  "featured": false
},
{
  "id": "claude-pulley-p6",
  "title": "滑輪練習 6｜兩桌之間的動滑輪",
  "desc": "兩張光滑桌之間吊著動滑輪，求三個物體的加速度。",
  "url": "https://addielu-phy.github.io/claude-sims/pulley-4-2/p6/",
  "repo": "https://github.com/addielu-phy/claude-sims/tree/main/pulley-4-2/p6",
  "cat": "探究與實作",
  "tags": [
    "動滑輪",
    "連結體",
    "Claude 版"
  ],
  "date": "2026-11",
  "series": "Claude 版・4-2 滑輪",
  "featured": false
},
{
  "id": "claude-pulley-p7",
  "title": "滑輪練習 7｜天平上的阿特午機",
  "desc": "等臂天平一端吊著阿特午機，比較按住繩子與放手時，另一端要放多少質量。",
  "url": "https://addielu-phy.github.io/claude-sims/pulley-4-2/p7/",
  "repo": "https://github.com/addielu-phy/claude-sims/tree/main/pulley-4-2/p7",
  "cat": "探究與實作",
  "tags": [
    "天平",
    "阿特午機",
    "Claude 版"
  ],
  "date": "2026-11",
  "series": "Claude 版・4-2 滑輪",
  "featured": false
},
{
  "id": "claude-pulley-v6",
  "title": "滑輪練習｜雙層滑輪",
  "desc": "複式阿特午機：定滑輪一側一個物體，另一側動滑輪再吊兩個物體，求三者加速度。",
  "url": "https://addielu-phy.github.io/claude-sims/pulley-4-2/v6/",
  "repo": "https://github.com/addielu-phy/claude-sims/tree/main/pulley-4-2/v6",
  "cat": "探究與實作",
  "tags": [
    "複式滑輪",
    "加速度",
    "Claude 版"
  ],
  "date": "2026-11",
  "series": "Claude 版・4-2 滑輪",
  "featured": false
},
{
  "id": "claude-pulley-v9",
  "title": "滑輪練習｜加速電梯中的阿特午機",
  "desc": "把阿特午機放進有加速度的電梯，用視重改寫運動方程式。",
  "url": "https://addielu-phy.github.io/claude-sims/pulley-4-2/v9/",
  "repo": "https://github.com/addielu-phy/claude-sims/tree/main/pulley-4-2/v9",
  "cat": "探究與實作",
  "tags": [
    "電梯",
    "視重",
    "Claude 版"
  ],
  "date": "2026-11",
  "series": "Claude 版・4-2 滑輪",
  "featured": false
},
{
  "id": "claude-efield-12-2",
  "title": "12-2 電場：五個例題互動解說（Claude 版）",
  "desc": "兩點電荷、帶電圓環、同心球殼、平行板加速與感應電荷。每題一頁，附引導、詳解與類題。",
  "url": "https://addielu-phy.github.io/claude-sims/efield-12-2/",
  "repo": "https://github.com/addielu-phy/claude-sims/tree/main/efield-12-2",
  "cat": "探究與實作",
  "tags": [
    "電場",
    "靜電",
    "Claude 版",
    "高中物理"
  ],
  "date": "2026-11",
  "series": "Claude 版・12-2 電場",
  "featured": false
},
{
  "id": "claude-efield-ex1",
  "title": "電場例題 1｜兩點電荷的中垂線",
  "desc": "看兩點電荷在中垂線上的電場如何疊加，垂直分量如何抵消。",
  "url": "https://addielu-phy.github.io/claude-sims/efield-12-2/ex1/",
  "repo": "https://github.com/addielu-phy/claude-sims/tree/main/efield-12-2/ex1",
  "cat": "探究與實作",
  "tags": [
    "點電荷",
    "向量疊加",
    "Claude 版"
  ],
  "date": "2026-11",
  "series": "Claude 版・12-2 電場",
  "featured": false
},
{
  "id": "claude-efield-ex2",
  "title": "電場例題 2｜帶電圓環軸線",
  "desc": "3D 模擬把圓環切成小段，看垂直分量抵消、軸向分量相加。",
  "url": "https://addielu-phy.github.io/claude-sims/efield-12-2/ex2/",
  "repo": "https://github.com/addielu-phy/claude-sims/tree/main/efield-12-2/ex2",
  "cat": "探究與實作",
  "tags": [
    "圓環",
    "電場",
    "Claude 版"
  ],
  "date": "2026-11",
  "series": "Claude 版・12-2 電場",
  "featured": false
},
{
  "id": "claude-efield-ex3",
  "title": "電場例題 3｜金屬球與同心球殼",
  "desc": "帶電金屬球外套同心球殼，用高斯面看各區域電場與感應電荷。",
  "url": "https://addielu-phy.github.io/claude-sims/efield-12-2/ex3/",
  "repo": "https://github.com/addielu-phy/claude-sims/tree/main/efield-12-2/ex3",
  "cat": "探究與實作",
  "tags": [
    "高斯面",
    "導體",
    "Claude 版"
  ],
  "date": "2026-11",
  "series": "Claude 版・12-2 電場",
  "featured": false
},
{
  "id": "claude-efield-ex4",
  "title": "電場例題 4｜平行板間的加速",
  "desc": "帶電質點在均勻電場中由靜止加速，並連到帶電單擺的週期。",
  "url": "https://addielu-phy.github.io/claude-sims/efield-12-2/ex4/",
  "repo": "https://github.com/addielu-phy/claude-sims/tree/main/efield-12-2/ex4",
  "cat": "探究與實作",
  "tags": [
    "勻強電場",
    "運動學",
    "Claude 版"
  ],
  "date": "2026-11",
  "series": "Claude 版・12-2 電場",
  "featured": false
},
{
  "id": "claude-efield-ex5",
  "title": "電場例題 5｜感應電荷與靜電屏蔽",
  "desc": "點電荷靠近不帶電球殼時，看感應電荷、電力線與殼內電場為何是零。",
  "url": "https://addielu-phy.github.io/claude-sims/efield-12-2/ex5/",
  "repo": "https://github.com/addielu-phy/claude-sims/tree/main/efield-12-2/ex5",
  "cat": "探究與實作",
  "tags": [
    "靜電屏蔽",
    "感應",
    "Claude 版"
  ],
  "date": "2026-11",
  "series": "Claude 版・12-2 電場",
  "featured": false
},
{
  "id": "claude-box-slide-or-tip",
  "title": "推木箱：先滑動還是先傾倒？（Claude 版）",
  "desc": "看正向力作用點怎麼隨推力移動，判斷木箱先滑動或先傾倒，並附三小題計算。",
  "url": "https://addielu-phy.github.io/claude-sims/box-slide-or-tip/",
  "repo": "https://github.com/addielu-phy/claude-sims/tree/main/box-slide-or-tip",
  "cat": "探究與實作",
  "tags": [
    "摩擦力",
    "力矩",
    "木箱",
    "Claude 版"
  ],
  "date": "2026-11",
  "featured": false
},
{
  "id": "claude-torque-lever",
  "title": "2-5 力矩與槓桿原理（Claude 版）",
  "desc": "力臂偵測器、槓桿實驗室與三種槓桿分類器，搭配情境例題和逐步計算。",
  "url": "https://addielu-phy.github.io/claude-sims/torque-lever/",
  "repo": "https://github.com/addielu-phy/claude-sims/tree/main/torque-lever",
  "cat": "探究與實作",
  "tags": [
    "力矩",
    "槓桿",
    "國中理化",
    "Claude 版"
  ],
  "date": "2026-11",
  "featured": false
},
{
  "id": "claude-earth-ch5-6",
  "title": "地科 CH5–6 圖解與會考真題（Claude 版）",
  "desc": "地球的環境、板塊與岩層：九張重點圖、必考整理，以及十五題會考與基測互動詳解。",
  "url": "https://addielu-phy.github.io/claude-sims/earth-ch5-6/",
  "repo": "https://github.com/addielu-phy/claude-sims/tree/main/earth-ch5-6",
  "cat": "自學評量",
  "tags": [
    "地科",
    "會考",
    "圖解",
    "Claude 版"
  ],
  "date": "2026-11",
  "featured": false
},
{
  "id": "claude-kh-exam-index",
  "title": "高雄六校國三上第二次段考古題索引（Claude 版）",
  "desc": "五福、七賢、明華、龍華、陽明與附中國中部 112 至 114 學年度試題的公開連結，並標出自然科可用卷。",
  "url": "https://addielu-phy.github.io/claude-sims/kh-exam-index/",
  "repo": "https://github.com/addielu-phy/claude-sims/tree/main/kh-exam-index",
  "cat": "自學評量",
  "tags": [
    "段考",
    "考古題",
    "高雄",
    "索引"
  ],
  "date": "2026-11",
  "featured": false
},
{
  "id": "addie-ai-workshop",
  "title": "AI 科學教學實驗室｜六站教師研習（GPT 版）",
  "desc": "走入六間科學實驗室，與站長交談並完成 12 道 AI 教學情境題。支援手機方向鍵、徽章、行動筆記與學習報表。",
  "url": "https://addielu-phy.github.io/addie-ai-workshop/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/addie-ai-workshop",
  "cat": "AI × 教育",
  "tags": [
    "教師研習",
    "AI 素養",
    "高中科學",
    "互動闖關"
  ],
  "date": "2026-11",
  "featured": true,
  "spotlight": true
},
{
  "id": "nknush-physics-midterm-2-gpt",
  "title": "國三理化 2-1～3-3 十大必考題型（GPT 版）",
  "desc": "高師大附中國中部第二次段考複習。十題會考考古題與十題原創練習，皆可操作動畫、調整參數與展開分步詳解。",
  "url": "https://addielu-phy.github.io/nknush-physics-midterm-2-gpt/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/nknush-physics-midterm-2-gpt",
  "cat": "錯題詳解",
  "tags": [
    "國三理化",
    "段考複習",
    "會考考古題",
    "互動模擬"
  ],
  "date": "2026-11",
  "featured": true,
  "spotlight": true
},
{
  "id": "typt-parameter-lab-gpt",
  "title": "物理探究參數研究室｜物辯四題、十二個單變因（GPT 版）",
  "desc": "電容發聲、Y 形擺、冷飲與磁力旋轉木馬。理論曲線、CSV 與實驗架設提示；需教材共用碼。",
  "url": "https://addielu-phy.github.io/typt-parameter-lab-gpt/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io",
  "cat": "探究與實作",
  "tags": [
    "TYPT",
    "高中物理",
    "單變因",
    "GPT 版"
  ],
  "date": "2026-11",
  "featured": true,
  "embed": false,
  "note": "需教材共用碼"
},
{
  "id": "calculus-tutor-gpt",
  "title": "大一微積分｜每週一小時家教簡報（GPT 版）",
  "desc": "七堂各 60 分鐘，從增減與極值一路到積分代換。含分步示範、可展開解答、課末檢核與期中先備補強。",
  "url": "https://addielu-phy.github.io/calculus-tutor-gpt/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/calculus-tutor-gpt",
  "cat": "課程工具",
  "tags": [
    "大一微積分",
    "家教簡報",
    "GPT 版"
  ],
  "date": "2026-11",
  "featured": true,
  "spotlight": true
},
{
  "id": "newton-second-law-4-2-gemini",
  "title": "4-2 牛頓第二運動定律｜10題互動模擬與漸進解說（Gemini版）",
  "desc": "每一題一個獨立網頁（4-2-1～4-2-10）：涵蓋定力與懸重比較、氣球拋重、最大張力、連結體與兩物重疊、定滑輪與動滑輪系統、人拉平台與電梯視重；題目與互動模擬直接顯示，解題引導與詳細推導點選按鈕開啟。",
  "url": "https://addielu-phy.github.io/newton-second-law-4-2-gemini/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/newton-second-law-4-2-gemini",
  "cat": "課程工具",
  "tags": [
    "高中物理",
    "4-2 牛頓第二運動定律",
    "互動模擬",
    "漸進式詳解",
    "Gemini版"
  ],
  "date": "2026-11",
  "featured": true,
  "spotlight": true
},
{
  "id": "coulomb-12-1-gpt",
  "title": "12-1 庫侖定律｜五道互動例題（GPT 版）",
  "desc": "比較庫侖力與萬有引力，操作向量疊加、帶電擺球、三電荷平衡與小振動。每題各有獨立網頁、可展開的解題引導與分步詳解。",
  "url": "https://addielu-phy.github.io/coulomb-12-1-gpt/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/coulomb-12-1-gpt",
  "cat": "錯題詳解",
  "tags": [
    "高中物理",
    "庫侖定律",
    "互動模擬",
    "GPT 版"
  ],
  "date": "2026-11",
  "featured": true,
  "spotlight": true
},
{
  "id": "electric-field-12-2-gemini",
  "title": "12-2 電場與電力線｜5題互動模擬與漸進解說（Gemini版）",
  "desc": "每一題一個獨立網頁（12-2-1～12-2-5）：題目直接顯示、互動式物理模擬可拖曳操作；3階解題引導、詳細公式推導與答案預設隱藏，點選按鈕即可開啟。",
  "url": "https://addielu-phy.github.io/electric-field-12-2-gemini/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/electric-field-12-2-gemini",
  "cat": "課程工具",
  "tags": [
    "高中物理",
    "12-2 電場",
    "互動模擬",
    "漸進式詳解",
    "Gemini版"
  ],
  "date": "2026-11",
  "featured": true
},
{
  "id": "electric-field-12-2-gpt",
  "title": "12-2 電場｜五道互動例題（GPT 版）",
  "desc": "從兩點電荷疊加、圓環與同心球殼，到平行板飛行及靜電屏蔽。五題各有獨立頁面、分步提示、詳解與可調動畫。",
  "url": "https://addielu-phy.github.io/electric-field-12-2-gpt/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/electric-field-12-2-gpt",
  "cat": "錯題詳解",
  "tags": [
    "高中物理",
    "電場",
    "動態模擬",
    "GPT 版"
  ],
  "date": "2026-11",
  "featured": true
},
{
  "id": "english-practice-gpt",
  "title": "英文小練習｜整段翻譯、默寫與教師觀察（GPT版）",
  "desc": "先練24組整段中翻英：顯示答案、自評對錯、翻譯錯題加強與統計；另有單字、默寫、Grill me與教師觀察。沿用理化系統雲端紀錄與教師登入；參考字庫與原創練習非二段完整題庫。",
  "url": "https://addielu-phy.github.io/english-practice-gpt/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/english-practice-gpt",
  "cat": "自學評量",
  "tags": [
    "國中英文",
    "默寫練習",
    "錯題複習",
    "教師觀察",
    "GPT版"
  ],
  "date": "2026-11",
  "featured": true
},
{
  "id": "earth-science-exam2-gpt",
  "title": "國三地科二段第5、6章｜重點圖解與會考基測題解（GPT版）",
  "desc": "翰林地球的環境、板塊運動與岩層的祕密；10張可下載SVG圖解、總海報、7道核對題號與答案的考古題導讀、5道原創遷移練習。",
  "url": "https://addielu-phy.github.io/earth-science-exam2-gpt/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/earth-science-exam2-gpt",
  "cat": "自學評量",
  "tags": [
    "國三地科",
    "段考複習",
    "會考與基測",
    "圖解",
    "GPT版"
  ],
  "date": "2026-11",
  "featured": true
},
{
  "id": "torque-lever-gpt",
  "title": "2-5 力矩與槓桿原理｜互動教學實驗室（GPT版）",
  "desc": "可調支點、施力大小與方向，看見垂直力臂、轉動方向與槓桿平衡；含桿重、三類槓桿、8題完整分步例題、考試技巧與3題練習。",
  "url": "https://addielu-phy.github.io/torque-lever-gpt/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/torque-lever-gpt",
  "cat": "探究與實作",
  "tags": [
    "國中理化",
    "力矩",
    "槓桿",
    "互動動畫",
    "GPT版"
  ],
  "date": "2026-11",
  "featured": true
},

{
  "id": "torque-lever-grok",
  "title": "國三理化 2-5 力矩與槓桿原理・互動教學（Grok版）",
  "desc": "翰林九上 2-5：扳手力臂（斜向施力、作用線與垂直力臂）、槓桿砝碼、有重量米尺三個互動動畫；8 題生活情境例題完整計算（開門、蹺蹺板、扁擔、扳手、米尺、前臂、斜繩），考試陷阱整理與即時回饋小測驗。",
  "url": "https://addielu-phy.github.io/torque-lever-grok/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/torque-lever-grok",
  "cat": "課程工具",
  "tags": [
    "國三理化",
    "力矩",
    "槓桿原理",
    "互動動畫",
    "Grok版"
  ],
  "date": "2026-11",
  "featured": true
},
{
  "id": "math-a-exam-114-gpt",
  "title": "高師大附中高二數學A第二次段考・15題互動詳解（GPT版）",
  "desc": "114-1原卷4題多選、11題填充，含20個選項解析；每題可調參數與播放動畫、完整分步計算、定義域與絕對值提醒、本機學習筆記。",
  "url": "https://addielu-phy.github.io/math-a-exam-114-gpt/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/math-a-exam-114-gpt",
  "cat": "錯題詳解",
  "tags": [
    "高二數學A",
    "指數與對數",
    "段考詳解",
    "互動動畫",
    "GPT版"
  ],
  "date": "2026-11",
  "featured": true
},
  {
  "id": "beam-equilibrium-gemini",
  "title": "三力平衡實驗室（Gemini版）｜木棒、輕繩與重錘",
  "desc": "互動式雙畫布動態模擬：直接拖曳重錘觀察張力、樞紐反力與正交分量、三力作用線共點 C、封閉力三角形動態包絡線與極小值點，附雙視角完整公式推導。",
  "url": "https://addielu-phy.github.io/beam-equilibrium-gemini/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/beam-equilibrium-gemini",
  "cat": "探究與實作",
  "tags": [
    "靜力平衡",
    "受力圖",
    "封閉力三角形",
    "三力共點",
    "Gemini版"
  ],
  "date": "2026-11",
  "featured": true
},
{
  "id": "box-tipping-gpt",
  "title": "木箱滑動、翻倒與支撐點（GPT版）",
  "desc": "新增剛體運動動畫：木箱滑動、翻倒、側面落地與撤力後減速；可調推力、高度及慢速播放。保留範例11三小題完整計算、受力圖與正向力作用點。",
  "url": "https://addielu-phy.github.io/box-tipping-gpt/?v=20261113-rigidbody#motion",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/box-tipping-gpt",
  "cat": "錯題詳解",
  "tags": [
    "靜力平衡",
    "摩擦力",
    "力矩",
    "互動動畫",
    "GPT版"
  ],
  "date": "2026-11",
  "featured": true
},
  {
  "id": "box-tipping-11-grok",
  "title": "範例11・木箱的滑動與傾倒（Grok版）",
  "desc": "水平推力推木箱：可調推力 F 與施力高度 h，看正向力作用點沿底面移動、對 O 軸力矩平衡與 F–h 狀態區域圖（靜止／滑動／傾倒），三小題逐步完整計算：h=2 m、h_max=2.5 m、N 的力矩 0.8 kgw·m 作用點 0.4 m。",
  "url": "https://addielu-phy.github.io/box-tipping-11-grok/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/box-tipping-11-grok",
  "cat": "探究與實作",
  "tags": [
    "靜力平衡",
    "力矩",
    "摩擦力",
    "互動模擬",
    "Grok版"
  ],
  "date": "2026-11",
  "featured": true
},
{
  "id": "double-slit-liquid-gpt",
  "title": "雙狹縫 × 半圓液槽：光程與相位（GPT版）",
  "desc": "第15題互動詳解：法線出射不偏折，液體仍讓亮紋變密。調整折射率、波長、縫距與屏距，比較50 mm與65 mm，觀察光程差、波形與相位向量。",
  "url": "https://addielu-phy.github.io/double-slit-liquid-gpt/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/double-slit-liquid-gpt",
  "cat": "探究與實作",
  "tags": [
    "雙狹縫干涉",
    "光程差",
    "相位",
    "互動動畫",
    "GPT版"
  ],
  "date": "2026-11",
  "featured": true
},
  {
  "id": "double-slit-liquid-grok",
  "title": "99指考・半圓皿中的雙狹縫亮紋間距（Grok版）",
  "desc": "99學年度指考物理非選題：半圓皿液體中的雙狹縫。可調折射率與波長，對照空氣與平面器壁，說明為何亮紋間距是 5.0 cm 而不是 6.5 cm。",
  "url": "https://addielu-phy.github.io/double-slit-liquid-grok/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/double-slit-liquid-grok",
  "cat": "探究與實作",
  "tags": [
    "雙狹縫干涉",
    "指考",
    "互動模擬",
    "Grok版"
  ],
  "date": "2026-11",
  "featured": true
},
{
  "id": "single-slit-two-questions-gpt",
  "title": "單狹縫繞射兩題互動實驗室（GPT版）",
  "desc": "中央亮紋全寬、第四暗紋距離與角度、雙波長亮暗紋重合；可調參數、相量相消動畫、分步詳解，並比較課本 3/2 與精確峰值 1.4303。",
  "url": "https://addielu-phy.github.io/single-slit-two-questions-gpt/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/single-slit-two-questions-gpt",
  "cat": "探究與實作",
  "tags": [
    "單狹縫繞射",
    "波的疊加",
    "亮暗紋",
    "互動動畫",
    "GPT版"
  ],
  "date": "2026-11",
  "featured": true
},
  {
  "id": "slit-barrier-94-grok",
  "title": "94指考・單狹縫遮闌與亮紋張角（Grok版）",
  "desc": "94學年度指考物理第7題：d=2λ 的單狹縫與張角 45° 的遮闌。可調 d/λ 與窗口，對照強度極圖、被裁切的中央亮帶與半波帶相消，並說明為何答案是 45° 而不是 60°。",
  "url": "https://addielu-phy.github.io/slit-barrier-94-grok/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/slit-barrier-94-grok",
  "cat": "探究與實作",
  "tags": [
    "單狹縫繞射",
    "指考",
    "互動模擬",
    "Grok版"
  ],
  "date": "2026-11",
  "featured": true
},
{
  "id": "electrostatics-gpt",
  "title": "靜電學 12-1・12-2 互動例題（GPT版）",
  "desc": "庫侖定律、電場與電力線共10道例題，一題一頁；參數掃描、向量合成、帶電擺球、非線性振動、同心球殼與靜電感應，搭配分步推導及概念檢核。",
  "url": "https://addielu-phy.github.io/electrostatics-gpt/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/electrostatics-gpt",
  "cat": "課程工具",
  "tags": [
    "靜電學",
    "互動動畫",
    "例題詳解",
    "GPT版"
  ],
  "date": "2026-11",
  "featured": true
},
  {
  "id": "single-slit-six-grok",
  "title": "單狹縫六等分光程差實驗室（Grok版）",
  "desc": "把單狹縫分成 a 到 g 六等分，拖曳觀察點同步顯示光程差作圖、強度曲線與條紋、相量多邊形及半波帶成對相消；含課本近似與精確亮帶位置、兩題詳解。",
  "url": "https://addielu-phy.github.io/single-slit-six-grok/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/single-slit-six-grok",
  "cat": "探究與實作",
  "tags": [
    "單狹縫繞射",
    "光程差",
    "相量圖",
    "互動模擬",
    "Grok版"
  ],
  "date": "2026-11",
  "featured": true
},
{
  "id": "balloon-cubesat-chips",
  "title": "探空氣球 × 立方衛星晶片資料庫｜GPT 版",
  "desc": "30 個代表性元件與模組：完整料號、量程、環境限制及查核價格；GPT v1.1 增加採購速查表，支援搜尋、篩選、比較、CSV/JSON 與高度量程檢查。",
  "url": "https://addielu-phy.github.io/balloon-cubesat-chips/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/balloon-cubesat-chips",
  "cat": "探究與實作",
  "tags": [
    "探空氣球",
    "立方衛星",
    "晶片選型",
    "GPT 版"
  ],
  "date": "2026-11",
  "featured": true
},
  {
  "id": "math-a-nanyi-ch2-gpt",
  "title": "高二上數學A｜南一版第二次段考 2-1～2-3（GPT版）",
  "desc": "依指數函數、對數與對數律、對數函數整理15個核心重點，搭配30題原創代表題；詳解與提示按鈕展開，附易錯提醒、圖形與學習掌握紀錄。",
  "url": "https://addielu-phy.github.io/math-a-nanyi-ch2-gpt/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/math-a-nanyi-ch2-gpt",
  "cat": "自學評量",
  "tags": [
    "高二數學A",
    "南一版",
    "指數與對數",
    "段考複習",
    "GPT版"
  ],
  "date": "2026-11",
  "featured": true
},
  {
  "id": "beam-equilibrium-grok",
  "title": "三力平衡實驗室（grok版）｜木棒、輕繩與重錘",
  "desc": "拖曳重錘位置，同步顯示張力、樞紐反力與分量、封閉力三角形、作用線共點及 T/H/V/φ 變化曲線；附力矩推導與四選項詳解。",
  "url": "https://addielu-phy.github.io/beam-equilibrium-grok/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/beam-equilibrium-grok",
  "cat": "探究與實作",
  "tags": [
    "靜力平衡",
    "受力圖",
    "力三角形",
    "互動模擬",
    "grok版"
  ],
  "date": "2026-11",
  "featured": true
},
  {
  "id": "beam-equilibrium",
  "title": "三力平衡實驗室（GPT版）｜木棒、輕繩與重物",
  "desc": "拖曳重物位置，同步顯示張力、樞紐反力與分量、封閉力三角形及受力變化曲線；附力矩、方向角與逐步詳解。",
  "url": "https://addielu-phy.github.io/beam-equilibrium/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/beam-equilibrium",
  "cat": "探究與實作",
  "tags": [
    "靜力平衡",
    "受力圖",
    "力三角形",
    "互動模擬"
  ],
  "date": "2026-11",
  "featured": true
},
  {
  "id": "typt-2027-sound-isolation-gpt",
  "title": "TYPT 2027｜Sound isolation 聲音隔離研究室（GPT 版本）",
  "desc": "需密碼解鎖。第11題用字精讀與物理推導；可調孔形、面積、長寬比、厚度與頻率，比較漏聲、黏滯阻抗與背腔共振，附 CSV 匯出及模型適用範圍。",
  "url": "https://addielu-phy.github.io/typt-2027-sound-isolation-gpt/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/typt-2027-sound-isolation-gpt",
  "cat": "探究與實作",
  "tags": [
    "TYPT 2027",
    "聲學",
    "隔音",
    "GPT 版本",
    "互動模擬"
  ],
  "date": "2026-11",
  "featured": true,
  "embed": false,
  "note": "需密碼"
},
  {
  "id": "tennis-racket",
  "title": "網球拍定理 3D 互動模擬",
  "desc": "網球拍定理（中間軸定理）3D 互動模擬，可調慣量與擾動、即時圖表、淺色／深色切換。",
  "url": "https://addielu-phy.github.io/tennis-racket/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/tennis-racket",
  "cat": "探究與實作",
  "tags": ["剛體轉動", "中間軸定理", "3D 模擬", "互動模擬"],
  "date": "2026-11",
  "featured": true
},
  {
  "id": "spring-force-lab",
  "title": "雙彈簧受力實驗室",
  "desc": "調整天花板與平台的距離，即時觀察兩條彈簧的伸縮、兩端彈力、物體受力與支撐端作用力；附中學生適用的逐步解說及離台臨界分析。",
  "url": "https://addielu-phy.github.io/spring-force-lab/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/spring-force-lab",
  "cat": "探究與實作",
  "tags": [
    "彈簧",
    "受力圖",
    "靜力平衡",
    "互動模擬"
  ],
  "date": "2026-11",
  "featured": true
},
  {
  "id": "english-flashcards",
  "title": "國三上英語單字閃卡（參考版）",
  "desc": "翰林（佳音）三上 Unit 3、4 共 77 字詞參考練習，提供翻卡、錯題加強、練習時間、逐題紀錄與老師／家長報告；115-1 採用版本已核實，第二次段考正式範圍與現行完整字庫待核對。",
  "url": "https://addielu-phy.github.io/english-flashcards/",
  "repo": "https://github.com/addielu-phy/addielu-phy.github.io/tree/main/english-flashcards",
  "cat": "自學評量",
  "tags": [
    "國中英文",
    "單字閃卡",
    "錯題加強",
    "進度紀錄"
  ],
  "date": "2026-11",
  "featured": true
},
  {
    id: 'typt2027-notes',
    title: 'TYPT 2027 練習賽筆記（Grok 版）',
    desc: '需密碼解鎖。TYPT 2027 練習賽各題物理重點、實驗觀察與辯論攻防筆記整理。',
    url: 'https://addielu-phy.github.io/typt2027-notes/',
    repo: 'https://github.com/addielu-phy/typt2027-notes',
    cat: '探究與實作',
    tags: ['TYPT 2027', '物理辯論', '練習賽筆記', 'Grok 版'],
    date: '2026-11',
    featured: false,
    embed: false,
    note: '需密碼'
  },
  {
    id: 'iypt2027-si-grok',
    title: 'TYPT 2027｜Sound isolation 聲音隔離研究室（Grok 版本）',
    desc: '需密碼解鎖。第 11 題 Sound isolation 物理模型、聲學傳遞與實驗參數分析（Grok 版本）。',
    url: 'https://addielu-phy.github.io/iypt2027-si-grok/',
    repo: 'https://github.com/addielu-phy/iypt2027-si-grok',
    cat: '探究與實作',
    tags: ['TYPT 2027', '聲學', '隔音', 'Grok 版本'],
    date: '2026-11',
    featured: false,
    embed: false,
    note: '需密碼'
  },
  {
    id: 'physics-rope-tension',
    title: '懸掛粗繩的張力分析｜互動受力模擬',
    desc: '調整兩端切線夾角與觀察點位置，即時觀察懸掛均勻粗繩各點張力大小、水平與鉛直分量及平衡推導。',
    url: 'https://addielu-phy.github.io/physics-rope-tension/',
    repo: 'https://github.com/addielu-phy/physics-rope-tension',
    cat: '探究與實作',
    tags: ['靜力平衡', '繩張力', '受力分析', '互動模擬'],
    date: '2026-10',
    featured: false
  },
  {
    id: 'iypt2027-ss',
    title: 'IYPT 2027｜Seeing Sound 聲場視覺化研究',
    desc: '需密碼解鎖。IYPT 2027 Seeing Sound 題目解析、物理建模與聲場視覺化實驗探討。',
    url: 'https://addielu-phy.github.io/iypt2027-ss/',
    repo: 'https://github.com/addielu-phy/iypt2027-ss',
    cat: '探究與實作',
    tags: ['IYPT 2027', '聲學', '聲場視覺化', '物理辯論'],
    date: '2026-10',
    featured: false,
    embed: false,
    note: '需密碼'
  },
  {
    id: 'phai-optics-sim',
    title: 'AI × 幾何光學：從解題引導到互動模擬的建模學習',
    desc: '收錄六個高中幾何光學互動模擬（PhAI 10/21 共備分享），結合解題引導與視覺化光路建模。',
    url: 'https://addielu-phy.github.io/phai-optics-sim/',
    repo: 'https://github.com/addielu-phy/phai-optics-sim',
    cat: 'AI × 教育',
    tags: ['幾何光學', '互動模擬', 'AI 輔助教學', 'PhAI'],
    date: '2026-10',
    featured: true
  },
  {
    id: 'iypt-2027-p05-y-pendulum',
    title: 'IYPT 2027 P05｜Y 形擺 Bowditch Pendulum 3D 模擬',
    desc: 'Bowditch Y 形雙擺的 Three.js 3D 互動模擬器，可調整繩長比例與初速，觀察李薩如軌跡與耦合振盪。',
    url: 'https://addielu-phy.github.io/iypt-2027-p05-y-pendulum/',
    repo: 'https://github.com/addielu-phy/iypt-2027-p05-y-pendulum',
    cat: '探究與實作',
    tags: ['IYPT 2027', 'Y 形擺', '3D 模擬', '李薩如圖形'],
    date: '2026-10',
    featured: false
  },
  {
    id: 'jwst-simulation',
    title: 'JWST 拉格朗日點模擬｜111 分科物理',
    desc: '111 分科測驗物理科韋伯太空望遠鏡（JWST）與拉格朗日點 L2 題目的互動模擬與詳解。',
    url: 'https://addielu-phy.github.io/jwst-simulation/',
    repo: 'https://github.com/addielu-phy/jwst-simulation',
    cat: '錯題詳解',
    tags: ['分科測驗', '萬有引力', '拉格朗日點', '互動模擬'],
    date: '2026-10',
    featured: false
  },
  {
    id: 'cap115-physchem',
    title: '115 會考理化分章題本',
    desc: '擷取 115 年會考自然科 26 題理化試題，依國中理化章節由易到難編排，提供學生練習版與教師詳解版。',
    url: 'https://addielu-phy.github.io/cap115-physchem/',
    repo: 'https://github.com/addielu-phy/cap115-physchem',
    cat: '自學評量',
    tags: ['國中會考', '理化分章', '歷屆試題', '詳解'],
    date: '2026-10',
    featured: false
  },
  {
    id: 'phone-physics-notebook',
    title: '手機物理實驗室｜Phone Physics Lab',
    desc: '用手機感測器做物理實驗：QR 配對電腦、即時擷取加速度與陀螺儀數據並繪圖分析，純前端免安裝。',
    url: 'https://addielu-phy.github.io/phone-physics-notebook/',
    repo: 'https://github.com/addielu-phy/phone-physics-notebook',
    cat: '探究與實作',
    tags: ['手機感測器', '物理實驗', '即時數據', '探究工具'],
    date: '2026-10',
    featured: true,
    spotlight: true
  },
  {
    id: 'kshs-typt-selection',
    title: '雄中 TYPT｜校隊甄選抽題台',
    desc: 'TYPT 校隊甄選現場工具：匯入名單、隨機決定出場順序、逐人抽題與 90 秒即席英文演說計時。',
    url: 'https://addielu-phy.github.io/kshs-typt-selection/',
    repo: 'https://github.com/addielu-phy/kshs-typt-selection',
    cat: '課程工具',
    tags: ['TYPT', '校隊甄選', '隨機抽題', '演講計時'],
    date: '2026-09',
    featured: false
  },
  {
    id: 'optics-interface-lab',
    title: '光的界面實驗室｜折射與全反射',
    desc: '繁體中文互動光學實驗室：調整入射角與介質折射率，即時觀察折射、臨界角與全反射現象。',
    url: 'https://addielu-phy.github.io/optics-interface-lab/',
    repo: 'https://github.com/addielu-phy/optics-interface-lab',
    cat: '探究與實作',
    tags: ['幾何光學', '折射', '全反射', '互動模擬'],
    date: '2026-09',
    featured: false
  },
  {
    id: 'kgsh-3d-campus',
    title: '高雄中學互動式 3D 校園',
    desc: '以 OpenStreetMap 建物輪廓與公開影像校正的程序化 3D 校園模型，支援視角漫遊與建築導覽。',
    url: 'https://addielu-phy.github.io/kgsh-3d-campus/',
    repo: 'https://github.com/addielu-phy/kgsh-3d-campus',
    cat: '課程工具',
    tags: ['3D 校園', '高雄中學', '空間建模', '互動導覽'],
    date: '2026-09',
    featured: false
  },
  {
    id: 'podcast-distribution-module',
    title: 'Podcast 發佈中控台｜RSS 發佈與平台登錄追蹤',
    desc: '繁體中文 Podcast RSS 產生、單集管理與各大平台登錄狀態追蹤中控台。',
    url: 'https://addielu-phy.github.io/podcast-distribution-module/',
    repo: 'https://github.com/addielu-phy/podcast-distribution-module',
    cat: 'AI × 教育',
    tags: ['Podcast', 'RSS 發佈', '數位工具', '教學媒體'],
    date: '2026-08',
    featured: false
  },
  {
    id: 'civics-cap-review-1-2',
    title: '公民一頁攻頂｜第一、二冊會考精華與歷屆演練',
    desc: '國中公民第一、二冊一頁重點精華整理，搭配 20 題 111–114 年官方會考題線上演練。',
    url: 'https://addielu-phy.github.io/civics-cap-review-1-2/',
    repo: 'https://github.com/addielu-phy/civics-cap-review-1-2',
    cat: '自學評量',
    tags: ['國中會考', '公民科', '重點整理', '歷屆試題'],
    date: '2026-07',
    featured: false
  },
  {
    id: 'history-cap-review-1-2',
    title: '島嶼時光簿｜歷史第一、二冊會考複習',
    desc: '臺灣國中歷史第一、二冊 108 課綱重點整理，並附 48 題會考題型線上練習。',
    url: 'https://addielu-phy.github.io/history-cap-review-1-2/',
    repo: 'https://github.com/addielu-phy/history-cap-review-1-2',
    cat: '自學評量',
    tags: ['國中會考', '歷史科', '108 課綱', '線上練習'],
    date: '2026-07',
    featured: false
  },
  {
    id: 'singing-ruler-lab',
    title: '會唱歌的尺｜懸臂梁振動理論與互動實驗',
    desc: '結合 Euler–Bernoulli 懸臂梁理論與互動實驗：調整尺伸出桌面的長度，觀察振動頻率、波形與音高變化。',
    url: 'https://addielu-phy.github.io/singing-ruler-lab/',
    repo: 'https://github.com/addielu-phy/singing-ruler-lab',
    cat: '探究與實作',
    tags: ['振動與波', '懸臂梁', '聲學探究', '互動模擬'],
    date: '2026-07',
    featured: false
  },
  {
    id: 'ramp-projectile-clearance-lab',
    title: '斜面飛越臨界實驗室｜Ramp Projectile Lab',
    desc: '斜面滑下接水平拋射越障的互動物理實驗室，視覺化驗證臨界高度條件 H > 4h/9。',
    url: 'https://addielu-phy.github.io/ramp-projectile-clearance-lab/',
    repo: 'https://github.com/addielu-phy/ramp-projectile-clearance-lab',
    cat: '探究與實作',
    tags: ['力學', '水平拋射', '力學能守恆', '互動模擬'],
    date: '2026-07',
    featured: false
  },
  {
    id: 'pinhole-sunglasses-lab',
    title: 'Pinhole Optics Lab｜針孔太陽眼鏡光學實驗室',
    desc: '針孔眼鏡的幾何光學與繞射互動實驗：探索近視模糊圓、最佳孔徑、孔陣列亮度與多重鬼影。',
    url: 'https://addielu-phy.github.io/pinhole-sunglasses-lab/',
    repo: 'https://github.com/addielu-phy/pinhole-sunglasses-lab',
    cat: '探究與實作',
    tags: ['針孔成像', '光的繞射', '視覺光學', '互動模擬'],
    date: '2026-07',
    featured: false
  },
  {
    id: 'kinetic-theory-gas-3d-v2',
    title: '分子視界 Ver.2｜四種熱力過程 3D 實驗室',
    desc: '氣體動力論 3D 互動模擬 Ver.2：用活塞與砝碼觀察壓力，探索定容、定壓、等溫與絕熱過程如何逐步趨於平衡。',
    url: 'https://addielu-phy.github.io/kinetic-theory-gas-3d-v2/',
    repo: 'https://github.com/addielu-phy/kinetic-theory-gas-3d-v2',
    cat: '探究與實作',
    tags: ['氣體動力論', '熱力學過程', '3D 模擬', '理想氣體'],
    date: '2026-07',
    featured: false
  },
  {
    id: 'cap-science-fighter-years',
    title: '科學格鬥｜111–114 會考自然科完整題圖版入口',
    desc: '把 111–114 年國中教育會考國一生物與國二理化試題做成街機格鬥挑戰，含完整原題圖表與詳解。',
    url: 'https://addielu-phy.github.io/cap-science-fighter-years/',
    repo: 'https://github.com/addielu-phy/cap-science-fighter-years',
    cat: '自學評量',
    tags: ['國中會考', '自然科', '遊戲化學習', '歷屆試題'],
    date: '2026-07',
    featured: false
  },
  {
    id: 'cap-english-fighter-years',
    title: '英語格鬥｜113–114 會考英語閱讀挑戰入口',
    desc: '113 與 114 年國中教育會考英語科閱讀題街機格鬥自學網站，邊闖關邊練會考長文閱讀。',
    url: 'https://addielu-phy.github.io/cap-english-fighter-years/',
    repo: 'https://github.com/addielu-phy/cap-english-fighter-years',
    cat: '自學評量',
    tags: ['國中會考', '英語閱讀', '遊戲化學習', '歷屆試題'],
    date: '2026-07',
    featured: false
  },
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
    featured: true,
    spotlight: true
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

