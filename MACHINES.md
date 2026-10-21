# 換電腦紀錄

這個 repo 在兩台電腦之間來回做。**換手之前、接手之後都先讀這份。**
最下面的「換手紀錄」每次換手都要補一行。

---

## 現在在哪一台

| | |
|---|---|
| 目前主力 | **Bacon’s MacBook Pro (2)**（2026-10-20 起） |
| 另一台 | 在修，修好後可能換回去 |
| 這台的 repo 位置 | `~/Desktop/v9bet` |
| GitHub | `bacon927-source/v9bet`，`main` 推上去就會由 Pages 上線 |

## 2026-10-20 的狀態

**GitHub 停在 `3be5836`（10-07）。** 這台比 GitHub 多下面這些 commit（之後的看 `git log --oneline origin/main..HEAD`），還沒推，因為網路不穩：

| commit | 日期 | 內容 |
|---|---|---|
| `86ff721` | 10-08 | 黃綠回到 UI 中心 |
| `24eea75` | 10-08 | 綠色拿回品牌的一半 |
| `8b77dc5` | 10-09 | 綠色加深，修好因此壞掉的對比 |
| `6d61bd0` | 10-20 | 以 v1 長相重建設計系統（`CLAUDE.md` `variables.css` `tailwind.config.js` `FIGMA.md` `assets/`） |
| `6cb5cfd` | 10-20 | `ui-kit.html` `ui-guideline.html`、Login／Sign Up 成品頁 |
| `0af39fe` | 10-20 | index 首頁改寫流程、加 Figma 卡片 |
| （這份） | 10-20 | 新增 `MACHINES.md` |

另一台有沒有沒推上去的東西，**從這台看不到**。

## 做到哪裡（2026-10-20 收工）

**已完成**（Figma 已生效；程式都在本機 commit，還沒推）：
1. 間距照 Tailwind 原生刻度，程式不再自建 `--space-*` `--radius-*`；頁面骨架「先定左右邊距，再放頂列，然後內容」（`.page`）
2. 元件重畫：間距補綁、預設寬度 358／390、說明照程式重寫；新增 Divider `Label=No`、Card、Checklist、Code input、Field 的 Hint；focus 時標籤跟框線一起變白
3. 畫面上手拼的 41 處換成元件
4. Setup 改成 iPhone 新機設定式：一頁一件事、9 步、頂列進度條＋百分比（Step top bar 的 `Progress` 變體）、點數拿掉、新增 Account ID（必填）、電話只剩一頁、通知改開關

**明天先問使用者的**：
1. ~~密碼頁要不要放雙重驗證~~ → 10-21 已決定：放在密碼頁，設好密碼才能開（推翻 09-20）。**還要問**：打開開關之後走哪個流程（驗證器 App 的 4 步：裝 App、掃 QR、輸入碼、存備援碼）
2. 幣別頁的文字要改成什麼
3. Account ID 的規則：長度、字元、能否重複、之後能否改（v1 設計稿沒寫，可能要問 IT）
4. ~~Zalo／LINE 沒有 email 的會員~~ → 10-21 已決定：第三方登入沒拿到 email 的，Setup 多一頁 Email（可略過，在電話前面）；Email 註冊和有拿到 email 的不問
5. Setup 區剩下兩條手繪線要不要刪（另外四條不見了，原因不明）
6. ~~個人資料頁兩行說明字~~ → 10-21 已決定拿掉（使用者：「是不需要的」），框到框回到 16；說明字換成新建節點後使用者的 Figma 已能顯示
7. 之後再看：徽章 -18px、連結列 0.3em 兩個不在 Tailwind 上的例外；Figma 0.5／1.5 變數命名（Figma 不收「.」）；IT 用 Tailwind v3 還是 v4；元件尺寸（46、50…）要不要照規則檢查

**決定之後要一起改的**：wireframe（`signup-flow-wireframe.html`）和 `setup-nine.html` 還是舊的 8 項流程；📏 Spacing 頁的 Setup 規格是舊流程快照；程式的 Setup 頁面和進度條還沒做

---

## 換回另一台之前（在這台做）

1. 工作樹要乾淨：`git status` 沒有任何修改。有就先 commit
2. 推上去（這台的 SSH 推不動，走 `gh` 的 HTTPS）：
   ```bash
   git push https://github.com/bacon927-source/v9bet.git main
   ```
3. 確認真的推上去了：下面兩個值要一樣
   ```bash
   git ls-remote https://github.com/bacon927-source/v9bet.git refs/heads/main
   git rev-parse HEAD
   ```
4. 在最下面「換手紀錄」補一行，commit 再推一次

**沒推上去就換手，這台的東西就只在這台。**

## 在另一台接手時（第一件事）

1. **先不要 pull**。先看那台自己有沒有沒推的東西：
   ```bash
   git status
   git log --oneline origin/main..HEAD
   ```
2. 兩個都是空的：直接 `git pull`
3. 那台也有自己的 commit：兩邊都改過，要合併。最容易衝突的是 `CLAUDE.md` `variables.css` `tailwind.config.js` `index.html` `FIGMA.md`。合併完整個 kit 都要在瀏覽器開過一次，再推
4. 那台有沒 commit 的修改：先 commit，再照第 3 點處理

## 每台電腦都要有的

- **GitHub 登入**：`gh auth status` 要看到 `bacon927-source`。SSH 推不動的機器就照上面用 HTTPS 推
- **本機預覽**：`.claude/launch.json` 已經在 repo 裡（`python3 -m http.server 4599`）
- **網路**：Tailwind 是從 CDN 載的。連不上 CDN 時頁面會沒有樣式，那是網路問題，不是頁面壞了
- **Figma**：檔案在雲端，不用同步。但那台的 Claude 要自己接上 Figma 才能改檔；檔案 id 在 `FIGMA.md`。確認方法：叫 Claude 跑 `whoami`，要看到帳號 bacon、**v9 團隊 Full seat**（能編輯）；再用 `FIGMA.md` 的 node id 讀 📱 Screens `2:2`。**不要用不帶 node id 的頁面列表判斷**，它只會列出 Components 一頁

## 不會跟著換電腦的東西

- **`HANDOFF.md`**：刻意不進 git（repo 公開），只在寫它的那台。要帶過去就自己複製
- **Claude 的記憶**（`~/.claude/projects/…`）：每台各自一份。所以規則一律寫進 repo 的 `CLAUDE.md` `FIGMA.md` 和這份，不要只靠記憶
- **`.claude/worktrees/`**：本機的工作副本，不進 git

## Figma 和程式要一致

Figma 檔不管在哪台改都是同一份，但 **`variables.css` 只有 commit 過的那一份才算數**。在某一台改了 Figma 的變數，就要在同一台把 `variables.css` 改好、commit、推，再換手。不然另一台會拿到對不上 Figma 的程式。

---

## 換手紀錄

| 日期 | 從 → 到 | 換手前做了什麼 | GitHub 是否同步 |
|---|---|---|---|
| 2026-10-20 | 另一台 → MacBook Pro (2) | 另一台一直出問題，改在這台做。10-08 到 10-19 的工作原本都沒 commit，已整理成 commit。這台的 Figma 連線已確認（v9 團隊 Full seat；Screens 9 區 54 張，與 `FIGMA.md` 一致） | ❌ 網路不穩還沒推（清單：`git log --oneline origin/main..HEAD`） |
