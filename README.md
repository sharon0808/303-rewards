# 三丙集章任務｜GitHub Pages

這是一個不需要資料庫的靜態網站，包含：

- 個人姓名、座號、星星與棒棒章紀錄
- 5 顆星星自動兌換 1 個棒棒章
- 棒棒章獎勵兌換與兌換紀錄
- 1～20 號抽抽樂
- 甜心卡、免睡卡、免罰金牌展示
- 手機、平板與電腦響應式版面

資料儲存在使用者當下裝置的瀏覽器 `localStorage`。不同裝置之間不會同步，清除瀏覽器資料也會刪除紀錄。

## 發布到 GitHub Pages

1. 在 GitHub 建立一個新的 repository，例如 `class-3c-rewards`。
2. 上傳本資料夾中的 `index.html`、`style.css`、`app.js` 與 `assets` 資料夾。
3. 到 repository 的 **Settings → Pages**。
4. 在 **Build and deployment** 中選擇 **Deploy from a branch**。
5. Branch 選 `main`，資料夾選 `/ (root)`，按 **Save**。
6. 等候約 1～3 分鐘後，GitHub 會顯示公開網址。

## 放入 Canva 獎勵卡圖片

在 Canva 將三張卡片分別下載成 PNG，命名為：

- `sweet-card.png`
- `nap-card.png`
- `no-penalty-card.png`

放入 `assets` 資料夾後，可在 `index.html` 搜尋 `special-grid`，把每張卡片中的 emoji `<span>` 攓成：

```html
<img src="assets/sweet-card.png" alt="甜心卡">
```

另外兩張依序使用 `nap-card.png` 與 `no-penalty-card.png`。建議 Canva 匯出比例一致，圖片寬度約 800px 即可。

## 自訂內容

- 獎勵與章數：修改 `app.js` 最上方的 `rewards`
- 抽抽樂 1～20 項：修改 `app.js` 最上方的 `prizes`
- 班級名稱：在 `index.html` 搜尋「三丙」後替換

