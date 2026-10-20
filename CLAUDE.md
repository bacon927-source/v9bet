# v9bet — 做 mockup 與實作前必讀

> **這個 repo 在兩台電腦之間來回做。** 開工前先讀 [`MACHINES.md`](MACHINES.md)：現在在哪一台、有沒有還沒推的 commit、換手前後要做什麼。

兩個交付目標，**同一套設計 token**：

| 平台 | 實作 | 取用 token |
|---|---|---|
| 原生 App | **Flutter** | `variables.css` 的值 → `ThemeData` / `ColorScheme` |
| Mobile web | **Tailwind CSS** | `tailwind.config.js` 的 theme 指向 `variables.css` 的變數 |

## 視覺：以現有產品 v1 為基礎的升級版（2026-10-14 更新）

使用者 2026-10-14：「我們這版是 v1 的升級，你不用一直按 v1」。**v1 是起點，不是天花板**：保留讓人認得的部分（黃色主按鈕、外框輸入框和浮起的標籤、深色、系統字體），可用性和一致性的問題直接改；v1 沒有的東西照 `ui-guideline.html` 做，不必先去 v1 找先例。規範以 `ui-guideline.html` 為準（原則、基礎、頁面模式、元件、新元件）。

下面是 2026-10-13 的原始決定，仍然有效的部分是「不要另起一套新視覺方向」：


使用者的決定：「不用幫我做新的視覺」「你直接拿 APP V9Bet v1 做現在 UI」「抓 v1 也是要做成 components，follow Tailwind CSS」。

- **視覺來源**：Figma [APP-V9Bet-v1](https://www.figma.com/design/QDrxbGP6Zd6bw8tJHT7CE7/APP-V9Bet-v1?node-id=2822-38593)（線上產品的設計稿）。node id 與量到的規格寫在 [`FIGMA.md`](FIGMA.md)，**做任何畫面之前先讀**
- **內容與流程**還是照 wireframe（`index.html` 第 ① 區）；v1 管的是長相，不是欄位。v1 沒有的東西（社群登入、One-time code 分頁）用 v1 的元件語言去做，不要另外發明樣式
- **元件**定義在 `tailwind.config.js` 的 plugin（`addComponents`）：`.nav-top` `.btn` `.link-row` `.field` `.tabs/.tab` `.tick` `.divider-label` `.social-btn` `.hint` `.error-text` `.otp`，2026-10-16 補上 Figma 已有的設定／引導／面板元件：`.group-label` `.card` `.list-row` `.toggle` `.option-card` `.action-bar` `.nav-top-progress` `.step-hero` `.points` `.checklist` `.checklist-row` `.sheet` `.sheet-header` `.sheet-body` `.status-mark`。**頁面只用 utilities 排這些元件，不要在頁面裡重寫一顆按鈕或輸入框**；要新元件就加進 plugin，並補到 `ui-kit.html`（工程師看的參考：token、每個元件的狀態與寫法）和 `ui-guideline.html`（使用規則）
- 頁面骨架是 `.nav-top` ＋ `.page-body`。**間距一律引用 Tailwind 的名字**（`variables.css` 的 `--space-*`，Figma 的 Spacing 變數 code syntax 指向同一組；使用者 2026-10-14：「IT 那邊也有引用，我不希望 UI mockup 沒有在用」）：**跟 Tailwind 一樣走 4 的倍數**（使用者 2026-10-14：「我們也 follow 吧」）：`note` 4（欄位到它自己的說明／錯誤，`.field` 內建）、`inline` 8（勾選和文字、欄位和欄位；使用者 2026-10-14 從 12 改成 8，框到框看起來 16（2026-10-16 欄位上方 10 改 8））、`group` 12（卡片、清單、結果頁裡的同一組）、`gutter` 16（左右邊距）、`block` 16（區塊之間；使用者 2026-10-14 從 20 改成 16）、`action` 32（分隔線上下、社群圖示之間）。主按鈕上方跟其他區塊一樣 16，直接用 gap，不要包框加 padding（使用者 2026-10-14：「12 拿掉，用 gap 就好」）、`header` 20（頂列到第一個內容，每頁一樣；使用者 2026-10-14 從 40 改成 20，全部頁面一起改）。`.social-row` 上方多 20（`space/20`，程式用 `spacing.header`）給「Last used」標籤，它往上凸 18。不要寫 `gap-[10px]`，也不要每頁各自加間距；Figma 畫面上每個 gap／padding 都要綁變數。**說明字（`.hint`）和錯誤字放在 `.field` 裡面最後**，貼在框下 4——放成欄位之間的獨立一行會跟上下兩個欄位一樣遠，看不出是誰的（使用者 2026-10-14：「欄位＋下面字有規則嗎」「因為太大了」）。**圓角也走 Tailwind 的刻度**（使用者 2026-10-14）：框（輸入框、驗證碼格、卡片、面板）`rounded-xl` 12、按鈕／pill／勾選 `rounded-full`、分頁底線 `rounded-sm` 2；Figma 的 Radius 變數 code syntax 指向 `var(--radius-*)`
- v1 的數字照用：底 `#1A1C1F`、主按鈕 `#FFBC00` 46 高全圓、綠 `#00DA87`（連結／選中）、外框 `#5C6570`、系統字體。（v1 的邊距 15、間距 10／15／20／30 已改成 Tailwind 的 4px 格線，見下面「頁面骨架」）這些值在 `variables.css` 的 `--v1-*`
- **在 v1 之上調過的八件事（使用者 2026-10-13 看過清單後說「全部改」），不要改回 v1 的值**：
  1. 輸入框的值 17px（小於 16，iPhone Safari 點進去會放大畫面）；標籤框內 15、浮起來 13
  2. 文字用的灰是 `--grey-450` #8A93A0（過 4.5:1）；`#5C6570` 只留給外框和圖示。錯誤紅是 `--red-450` #FF4D4D
  3. **出錯時按鈕不變紅**。原因寫在出錯的地方：欄位下面、驗證碼格子正下方（`aria-invalid`、`.otp[data-invalid]`、`.error-text`）。`.btn[data-invalid]` 已拿掉
  4. 可點的範圍至少 44：小連結和勾選列用 `.tap`，輸入框右側的圖示按鈕 44 寬
  5. 開關開的時候是綠色；紫色 `--color-promo-accent` 只給優惠類
  6. 三層底色：頁面 #1A1C1F、卡片 `--surface-1` #23262B、面板 `--surface-2` #282C31
  7. 字級只有 13／15／17／18，金額另有一個 28
  8. Profile 把餘額和待處理事項放最前面，其餘收成清單列
- **下面「視覺」一節（黃綠分工、綠場、Be Vietnam Pro、8-point grid）是先前的新視覺方向，已被這個決定取代**，留著只是記錄；跟 v1 衝突時以 v1 為準
- 我先前自己開的兩個 Figma 檔（V9Bet UI Kit、V9Bet Mobile Web UI Kit）都是新視覺，**不是現在的設計來源**
- **交付兩份**（2026-10-13）：給設計的 Figma 檔 [V9Bet Mobile Web — UI (v1 look)](https://www.figma.com/design/RQEyZIgfkCKHdzYmOwprvR)，和給 IT 的 `ui-kit.html`。兩份是同一套變數與元件，改一邊就要改另一邊；Figma 的 id 在 `FIGMA.md`

**Figma 與 `variables.css` 必須一致**——改一邊就要改另一邊，否則兩個平台會長歪。

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

V9Bet 是一家做了十年的博弈品牌，**招牌就是黃色和綠色**。現在是改版，不是換品牌——兩個顏色都留著，改的是**比例和分工**。

### 顏色的分工（最重要的一條）

**綠色是場子，黃色是籌碼。** 兩個都是品牌色，差別在工作。

- **綠色是環境，不是點綴。** 底色、所有表面，以及每頁一塊綠場（在標誌和標題後面）。**綠色用來填，不用來按**
- **黃色 `#F9D000` 是唯一會動作的東西。** 標誌，加上每頁唯一一顆按鈕。除此之外任何東西都不准是黃的
  它搶眼是因為稀有——第二個黃色一出現，兩個都不再是主要動作

**綠色有三支，用亮度分開，彼此不可混用：**

| | 值 | 用途 |
|---|---|---|
| 底 | `neutral-950` `#04100B` | 最暗。帶綠的近黑，整個 app 坐在上面 |
| 品牌綠 | `green-500` `#0FA85A` | 中。**永遠是填色**——banner、綠場、次要按鈕 |
| 金錢綠 | `green-400` `#35D07F` | 最亮。**永遠是文字**——live、上漲、贏、已結算 |

把品牌綠放到數字上、或把金錢綠鋪成面板，兩個就都不再有意義。**雙色品牌成立全靠這個分離。**

- 警示色推到橘 `#FF8A3D`。跟品牌金太近的琥珀色會被讀成品牌，不會被讀成警告
- 綠場用 `--gradient-felt`（Figma 是 paint style `Gradient/Felt`），**一頁一塊**（2026-10-16 已從 `variables.css` 刪除）

值在 `variables.css`，**那是兩個平台唯一的事實來源**。

### 排版

- **8-point grid**：間距只能用 4 的倍數（8 / 12 / 16 / 24 / 32 / 40）。隨手給 26、18、14 是「沒品味」最直接的來源
- **圓角分三級，各有工作**：輸入框與 pill、卡片、唯一的動作。全部同一個圓角會把層級壓平
- 主要動作放**拇指區**（畫面下三分之一）。畫面是**固定高度**，中間留一塊會吸收剩餘空間的彈性區，CTA 釘在安全區上方——不要排成一段會自己長高、下面留一塊空白的內容
- 每頁**只有一個大色塊**（promo banner）

### 字體

- **Display：Be Vietnam Pro**（ExtraBold）。選它不是因為好看，是因為它是為越南文字母畫的，而越南是第一個市場
- **Body：Inter**；泰文 Noto Sans Thai 要排在前面才搶得到字符
- 兩套就夠，而且要**明顯不同**。全部用 Inter 是每個專案都會做的預設值，不是選擇

### 不要做的事（這些是「AI 生成感」的特徵，不是風格）

- **按鈕外面套模糊光暈**。要有份量就用實心飽和色加乾淨邊界
- **第二顆綠色按鈕搶動作**。綠色填，黃色按
- **所有東西都做成一樣的圓角卡片**，每張都同一個灰陰影
- **漸層當裝飾**鋪在沒有意義的地方
- 標題裡只把**單一個字**換色或加粗
- 標籤用**全大寫**、內容上面硬加一排說明標籤
- 按鈕文字後面加 `→`
- 用 `#0B0B0B`、`#111` 這種偏色近黑假裝黑色

### 其他

- 玻璃質感 = 半透明 ＋ 亮頂緣。**平鋪的卡片不要用背景模糊**——Flutter 的 `BackdropFilter` 在中低階 Android 會掉幀，只用在 bottom sheet 和 modal
- 圖像位不是裝飾：遊戲縮圖／賽事圖／活動主視覺要留位置，沒有圖片這類產品一定看起來空
- **標誌目前只有深色底版本**：lockup 的「BET」是白字，淺色底會整段消失。淺色主題要做完，得先跟品牌端要一支深色或單色鎖定稿

## 設計 skill（做任何畫面前先讀）

兩個都裝在 `.claude/skills/`：

- **`frontend-design`**（Anthropic 官方，Apache 2.0，已進版控）——談的是怎麼做出有觀點、不像模板的設計。上面那串「不要做的事」就是從它的 AI 生成感特徵清單來的
- **`mobile-app-ui-design`**（第三方）——8-point grid、60/30/10、拇指區、Peak-End 這些具體的行動裝置規則
  **沒有授權檔案，預設保留所有權利**，所以已經在 `.gitignore` 裡，不要推上公開 repo

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

---

## Tailwind（web 端）

**不要寫死色碼，也不要在 Tailwind 裡另立一套色票。** `tailwind.config.js` 的 theme 一律指向 `variables.css` 的 CSS 變數，這樣深／淺模式切換、改 token 兩邊會一起動。

```js
colors: { brand: { DEFAULT: 'var(--color-brand-primary)' } }
```

- 用語意類名（`bg-card`、`text-ink-muted`、`border-edge-subtle`），不要用 `bg-[#161C25]`
- 深色是預設，淺色靠 `:root[data-theme="light"]` 覆寫——**不要用 Tailwind 的 `dark:` 前綴**，那會變成第二套事實來源
- 金額欄位記得 `tabular-nums`
- **Mobile web 不預留上下那兩條安全區。** 瀏覽器自己有網址列和工具列，頁面只留一般的邊距，再加上裝置回報的 `env(safe-area-inset-*)`（一般分頁裡是 0）。上面「尺寸」表裡的安全區數字是給原生 app 的，不要搬到 web
- **Login ↔ Sign Up 是頂列的兩個文字分頁**（2026-10-14；wireframe 的「Sign up ｜ Login」＋審稿意見「客人不用找」＋使用者給的短影音 app 參考「漫劇／推薦」）：`.nav-tabs` 放在 `.nav-top` 裡，順序固定「Sign Up　Log In」，目前這頁白色粗體＋短綠線，另一頁灰色，都是 18。切換整頁內容的分頁可以放頂列；其他功能不放頂列。這兩頁按鈕下面不再放連結列。其他頁面的頂列照舊：左邊 ✕、標題置中。**每一頁都要有頂列，不能留空白的一條**（使用者 2026-10-14：「每頁應該都有 header」）。**頂列下面不放麵包屑**（使用者 2026-10-14：「我不要這個」），回上一層靠頂列的 ✕／返回
- **這類頁面不放 logo**：它們嵌在網站裡，網站的 header 已經有了

---

## Figma 作業規則（踩過的坑，不要再踩）

### 查不到不等於沒有

`get_metadata` 不帶 nodeId 只會列出 Cover 一頁；`search_design_system` 搜不到這個檔案的本地元件。兩個都回空的時候，**不要下結論說 Figma 沒東西**——用 `use_figma` 列 `figma.root.children`，或直接讀 `FIGMA.md` 裡的 node id。

### 圖示只用一套

v1 Icon 頁的 Flaticon UIcons Bold Rounded（`fi-br-*`，眼睛只有 `fi-bs-*`）。單獨 24、輸入框裡 16，顏色跟著文字。缺的圖示先去 v1 Icon 頁找同一套的，不要混 Regular（`fi-rr`）、iOS（`fi-ios`）或自己畫的（使用者 2026-10-14：「icon 可以拿 v1 版本，也要開始固定」）。返回只放箭頭，不寫「Back」。程式用 `.icon .icon-<name>`，加新圖示要同時加進 `tailwind.config.js` 的 `ICONS` 和 Figma 的 `icon/<name>`。

### 第三方品牌圖示找官方檔，不要手畫

LINE、Zalo、Google 這類圖示先找本機的官方檔，再查對方官網；手畫的近似版會被一眼看出來。

### 字體列得出來不等於能用

`listAvailableFontsAsync()` 列得到 SF Pro、`loadFontAsync` 也不報錯，但文字寬度是 0、`hasMissingFont` 是 true，截圖沒有字。**建完文字就檢查 `hasMissingFont` 和 `width > 0`**，不要等截圖才發現。這個環境用 Roboto。

### 綁了變數不等於顏色對

對已經綁到元件文字屬性的文字改 `characters` 之後，它的填色還是顯示「綁到變數」，但畫出來是 paint 底下的靜態色（踩過：輸入框的標籤和值全變黑，使用者截圖來問）。**檢查方法**：`paint.color` 要等於 `variable.resolveForConsumer(node).value`，帶透明度的變數還要比 `paint.opacity`。**修法**：先 `node.fills = []` 再重新指定。改完文字就跑一次這個檢查，不要只看 `boundVariables`。

### `resize()` 會清掉 auto-layout 的 hug

呼叫 `node.resize(w,h)` 會把 `primaryAxisSizingMode` / `counterAxisSizingMode` 重設成 `FIXED`。

- **先 `resize()`，再設 sizing mode**，順序反了高度就會被鎖成當初給的那個數字
- 症狀：元件被壓成 10px 的細條、文字被切掉
- 例外（本來就該固定）：OTP 格、icon、圖像位、進度條軌道

### 不要用寫死的座標排版

component set **不會隨內容長大，也不裁切**，所以外框尺寸一旦寫死，內容變高就會溢出疊到隔壁。

- 位置和尺寸都從**實際量到的子元素**算出來
- 排完**一定要跑兩兩相交檢查**並回傳結果，`overlaps: []` 才算完成
- 不要讓使用者截圖來告訴我疊在一起了

### 說明文字不要寫死數字

寫「安全區 59」這種字串，等尺寸一改就變成錯的。**從量到的值產生文字**，不要用字面值。

### `remove()` 之前先解析完所有目標

`findAll()` 的結果存在陣列裡，刪掉其中一個節點之後再讀其他項目會噴 `node does not exist`。先找齊再動手。

### 腳本出錯整個交易會回滾

`use_figma` 失敗時**什麼都不會寫入**，所以不需要寫「清理上次殘留」的邏輯——那是不存在的狀態。

### 官方 kit 的用法

- **Apple iOS 26/27、Material 3 的元件要用匯入的，不要自己畫。** 自己畫的只是裝飾，官方元件才能驗證留白夠不夠
- Apple 每個 library 都要在 Figma 裡**各自接受授權**才能程式化匯入，`Not permitted to upsert` 就是還沒接受
- 圖示顏色不對時**切變數模式**（Apple 用 `Colors` 集、Material 用 `M3` 集的 `Dark`），不要去改顏色
- 實測值：iOS 狀態列 **62dp**、home indicator **34dp**、Android 狀態列 **52dp**（不是 24）
