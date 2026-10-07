# v9bet — 做 mockup 與實作前必讀

兩個交付目標，**同一套設計 token**：

| 平台 | 實作 | 取用 token |
|---|---|---|
| App | **Flutter** | `tokens.css` 的值 → `ThemeData` / `ColorScheme` |
| Mobile web | HTML / CSS | 直接 `@import "tokens.css"` |

設計來源：[Figma UI Kit](https://www.figma.com/design/0stLHADYWKuf32S0e48UX1)。
**Figma 與 `tokens.css` 必須一致**——改一邊就要改另一邊，否則兩個平台會長歪。

---

## 尺寸：不要只用 390

| | 邏輯寬度 (dp) | 安全區 |
|---|---|---|
| iPhone 15 | 393 × 852 | 上 59、下 34 |
| **Android 主流** | **360 × 800** | 上 24、下 24 |

**360dp 是越南泰國最常見的寬度。** 每個畫面都要在 360 檢查過才算完成——只看 390 會漏掉擠壓與換行。

安全區用 `SafeArea` 取得，**不要寫死數字**；系統列顏色用 `SystemUiOverlayStyle`，狀態列和手勢條不由我們繪製。

## 響應式（Flutter 官方規則，`flutter-build-responsive-layout`）

- 只有**一個斷點：600dp**（`largeScreenMinWidth`）。手機一律走同一套佈局。
- 用 `LayoutBuilder`、`MediaQuery.sizeOf(context)`、`Expanded` / `Flexible`、`ConstrainedBox`
- 清單用 `ListView.builder` / `GridView.builder`；要自動決定欄數用 `SliverGridDelegateWithMaxCrossAxisExtent`
- **不要**用 `MediaQuery.orientationOf` 或 `OrientationBuilder` 在接近樹頂的地方切佈局
- **不要**判斷硬體類型（手機 vs 平板），只看可用空間
- **不要**鎖定螢幕方向（摺疊機會壞）

## 金額與語言

- **VND 沒有小數**，數字很大（`₫1,750,000`）；**THB 兩位小數**（`฿1,250.00`）
- 金額一律對齊：CSS `font-variant-numeric: tabular-nums`，Flutter 用等寬數字字型特性
- **USDT 不是獨立幣別**，是 VND/THB 底下的存提款管道，沒有獨立餘額
- 字型：Latin 與越南文用 **Inter**（聲調會往上堆）、泰文用 **Noto Sans Thai**（上下都會長出來）
- **行高要放寬**：body 15/23 而不是 15/20。行高太緊，越南文和泰文會被切掉
- 多語系照 `flutter-setup-localization`

## 視覺

- 純黑底 `#000000`，表面往上疊；品牌青綠 `#22E5C3`
- **每頁只有一個大色塊**（promo banner）和**一顆發光按鈕**，多了就沒有主次
- 玻璃質感 = 半透明 ＋ 亮頂緣。**平鋪的卡片不要用背景模糊**——Flutter 的 `BackdropFilter` 在中低階 Android 會掉幀，只用在 bottom sheet 和 modal
- 圖像位不是裝飾：遊戲縮圖／賽事圖／活動主視覺要留位置，沒有圖片這類產品一定看起來空

## 官方 Flutter skills（這個環境裝不了 plugin，需要時直接讀）

<https://github.com/flutter/agent-plugins> — Flutter 官方維護，BSD-3-Clause。

做 mockup 或寫 UI 前，**至少讀這兩個**：

- `skills/flutter-build-responsive-layout/SKILL.md`
- `skills/flutter-setup-localization/SKILL.md`

其他用得上的：`flutter-fix-layout-issues`、`flutter-apply-architecture-best-practices`、`flutter-add-widget-preview`、`flutter-setup-declarative-routing`。

raw 路徑：`https://raw.githubusercontent.com/flutter/agent-plugins/main/skills/<skill-name>/SKILL.md`

> 安裝正式 plugin 需要 `claude` CLI（`claude plugin marketplace add flutter/agent-plugins`），本機沒有 CLI 也沒有 node/npm，所以改為直接讀取。

## 規格以哪裡為準

- Wireframe 與 Dev Notes：`index.html` 第 ① 區的 12 個 flow 頁
- `v9bet-full-wireframe.html` 和 `v9bet-flows-composition.html` **已過時**，不要當規格
- 交接與決策脈絡：`HANDOFF.md`（未進版控）
