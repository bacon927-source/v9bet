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

**GitHub 停在 `3be5836`（10-07）。** 這台比 GitHub 多下面幾個 commit，還沒推，因為網路不穩：

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
- **Figma**：檔案在雲端，不用同步。但那台的 Claude 要自己接上 Figma 才能改檔；檔案 id 在 `FIGMA.md`

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
| 2026-10-20 | 另一台 → MacBook Pro (2) | 另一台一直出問題，改在這台做。10-08 到 10-19 的工作原本都沒 commit，已整理成 commit | ❌ 這台多 7 個（含這份紀錄），網路不穩還沒推 |
