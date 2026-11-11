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
  "featured": true
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
    featured: false
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
    featured: false
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
    featured: false
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
    featured: true
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

