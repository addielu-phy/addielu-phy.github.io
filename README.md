# 盧政良 Addie Lu｜個人網站

高雄中學物理教師的個人品牌＋作品集網站，部署於 GitHub Pages 根網域：
**https://addielu-phy.github.io/**

## 架構

```
index.html        首頁：Hero、關於我、精選作品、社群與共備、聯絡
works.html        全部作品：分類篩選（網址參數 ?cat=分類 可直接分享）
404.html          GitHub Pages 404 頁
favicon.svg       網站圖示（拋物線＋質點）
assets/
  style.css       共用樣式（深淺雙主題 CSS variables；深色沿用錯題本藍橘識別）
  works.js        ★ 作品資料檔：所有卡片內容都在這裡
  main.js         主題切換、卡片渲染、分類篩選、進場動畫
```

純靜態網站，無建置流程；push 到 main 之後 GitHub Pages 自動部署。

## 日常維護：新增一個作品

只需要編輯 `assets/works.js`：

1. 複製 `WORKS` 陣列裡任一筆物件，貼到**陣列最前面**（新的排前面）。
2. 改欄位：`id`（repo 名）、`title`、`desc`、`url`、`repo`、`cat`（必須是 `CATS` 之一）、`tags`、`date`、`featured`。
3. `featured: true` 會出現在首頁精選，建議全站維持 6–8 個。
4. 首頁統計數字、作品頁篩選數量都會自動更新。

改完 `git add -A && git commit && git push` 即上線（1–2 分鐘生效）。

## 主題切換

- 預設跟隨系統深淺色；右上角按鈕手動切換，選擇記在 `localStorage.theme`。
- 色彩 tokens 全部在 `assets/style.css` 開頭的 `:root` 區塊。

## 備註

- 本機工作目錄：`G:\我的雲端硬碟\CC\20260712_個人網站CC`（Google Drive 同步，git 偶有延遲，commit 失敗重試一次即可）。
- 隱私原則：不放學生個資、不放家庭內容。
