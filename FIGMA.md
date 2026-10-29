# V9Bet — Figma 檔案地圖

**動 Figma、或說「Figma 裡沒有 X」之前先讀這份。**

| | 檔案 | fileKey | 用途 |
|---|---|---|---|
| **現在的設計來源** | [APP-V9Bet-v1](https://www.figma.com/design/QDrxbGP6Zd6bw8tJHT7CE7/APP-V9Bet-v1?node-id=2822-38593) | `QDrxbGP6Zd6bw8tJHT7CE7` | 線上產品的設計稿。2026-10-13 使用者決定**視覺直接用這份**，不做新視覺 |
| **我們交付的 Figma** | [V9Bet Mobile Web — UI (v1 look)](https://www.figma.com/design/RQEyZIgfkCKHdzYmOwprvR) | `RQEyZIgfkCKHdzYmOwprvR` | 2026-10-13 開的。照 v1 的長相、跟 `variables.css` / `tailwind.config.js` 同一套變數與元件。兩份交付之一（另一份是給 IT 的 UI kit） |
| 已不是來源 | [V9Bet Mobile Web UI Kit](https://www.figma.com/design/Y9aEzSppCMldfkYd6m9cCc) | `Y9aEzSppCMldfkYd6m9cCc` | Claude 2026-10-12 開的新視覺版。內容已跟網頁不一致，不要再照它做 |
| 已不是來源 | [V9Bet UI Kit](https://www.figma.com/design/0stLHADYWKuf32S0e48UX1/V9Bet-UI-Kit) | `0stLHADYWKuf32S0e48UX1` | Claude 更早開的新視覺版 |

下面的 node id 與數量都是當天量到的，動手前再確認一次。

---

# 設計來源：APP-V9Bet-v1

這是別人的設計稿，**只讀不寫**。頁面 `desktop/h5`（`2822:38593`）有幾百個畫面，`get_metadata` 整頁會回 3 MB 以上——存檔後用腳本找名字，再對單一畫面呼叫 `get_design_context`。

## 用得到的畫面（390 × 844，含 Safari 上下列）

| 畫面 | id |
|---|---|
| login（空白／已填） | `3260:100963` · `3260:100990` |
| sign up（五個狀態，最後一個全填） | `3260:100706` `3260:100744` `3260:100782` `3260:100820` `3260:100856` |
| OTP（進行中／完成／重送／錯誤／超過三次） | `3260:100892` `3260:100927` `3260:101095` `3260:101125` `5119:193057` |
| Forget PW | `3260:101211` · `3260:101235` |
| Reset / create new password | `3260:100685` · `8232:209805` |
| 分頁元件的例子（inbox 的 Tab menu） | `5119:194095` |

## 量到的規格（對應 `variables.css` 的 `--v1-*` 與 `tailwind.config.js` 的元件）

| | v1 | 元件 class |
|---|---|---|
| 底色 | `#1A1C1F` | `bg-app` |
| 頂列 | 44 高（跟 Auth tabs、Step top bar 一樣；使用者 2026-10-14 從 v1 的 40 改成 44）、內距 10；✕ 點擊範圍 44 × 44；左邊 24 的 ✕；標題 18 semibold 置中 | `.nav-top` |
| 輸入框 | 外框 1px `#5C6570`、圓角 12（`radius/xl`）、50 高，上方留 10 給標籤（共 60）；字 14；標籤 `#5C6570`，沒值時在框內、有值或 focus 時浮到外框上；右側 16 的圖示 | `.field` `.field-trail` |
| 主按鈕 | 46 高、全圓、`#FFBC00`、黑字 17 medium；不能送出時底 `#5C6570`、字 `#9BA7B7` | `.btn` |
| 按鈕下的連結列 | 46 高；白字 15 ＋ 粗體綠字 `#00DA87` | `.link-row` |
| 分頁 | 44 高；字 15；下方 2px 線；未選 `#888`、選中 `#00DA87` | `.tabs` `.tab` |
| 勾選 | 22 的圓框 ＋ 12 的圓點；關 `#5C6570`、開 `#00DA87` | `.tick` |
| 內文 | 15、白色 60%；小字 13；最小 12 | `.hint` |
| 驗證碼格 | 6 格，42 × 44、圓角 12、間距 10；數字 17/22；外框空的 `#4B4B4B`、有數字 `#00DA87`、錯誤 `red`；說明／格子／重送／按鈕之間 30 | `.otp` |
| 錯誤 | 純紅 `#FF0000`：驗證碼錯誤時格子外框變紅、**按鈕底變紅白字**、按鈕下方 10 放一行 13 的紅字 | `data-invalid` `.error-text` |
| 版面 | 左右邊距 15；欄位間距 10；區塊間距 15 / 20；內容從上往下排，按鈕緊接在表單後面 | utilities |
| 字體 | SF Pro（系統字體） | `font-sans` |

圖示放在 `assets/icons/`，**2026-10-26 換成 Heroicons outline 2.1.5**（`back`＝chevron-left、`close`＝x-mark、`eye`、`eye-crossed`＝eye-slash、`check`、`chevron-down`、`chevron-right`；檔名沿用 kit 的名字）。Figma 的 `icon/*` 也是同一份路徑。

v1 沒有、但我們這版需要的元件（照 v1 的語言做的）：社群登入 `.social-btn`、帶文字的分隔線 `.divider-label`。輸入框的錯誤狀態 v1 也沒畫（sign up 五個狀態裡沒有錯誤），是照 OTP 錯誤畫面的紅色延伸的：外框和標籤變紅、框下方一行紅字。

---

# 我們交付的 Figma：V9Bet Mobile Web — UI (v1 look)

fileKey `RQEyZIgfkCKHdzYmOwprvR`，在 v9 團隊下。跟網頁版是同一套東西，改一邊要改另一邊。

| 頁 | id | 內容 |
|---|---|---|
| 🧩 Components | `0:1` | 一個 auto-layout 的板子 `4:2`，每個元件一節（各節間距 16）。**2026-10-20 元件重畫**：元件內原本六個變數涵蓋到的間距都綁了 `spacing/N`（補綁 60 處，數值沒變）；還沒綁的（Toggle 內距 2、徽章 2/6、欄位尾端 6、面板標題左右 56、兩個分頁之間 28）**都是 Tailwind 刻度上的值（0.5、1.5、14、7），不是例外**——只是 Figma 還沒有對應的變數：變數名稱不能有「.」，`spacing/0.5`、`spacing/1.5` 的命名要等使用者決定。預設寬度：內容元件和頂列 358、滿版的 Action bar 和 Sheet header 390（原本是 v1 的 330/360；畫面上都是 FILL，不受影響）。各節說明照程式重寫，說明文字 940 寬換行 |
| 📱 Screens | `2:2` | **一個流程一個 Section、由上往下，畫面是 Section 裡最上層的 frame**（2026-10-14 使用者嫌外框太多層、點不到畫面，拿掉了原本的 auto-layout 畫布 `8:29`、每列的 row 和每張的說明外框）：Login `127:2308` / Sign Up `127:2309` / Sign Up · existing account `127:2310` / Sign Up · social `127:2311` / Setup · guided `127:2312` / Tutorial & App `127:2313` / Forgot Password `127:2314` / Account & Settings `127:2315` / Profile `127:2316`，共 54 張。間距標註不放這頁，放在 **📏 Spacing** 頁 `134:46`（使用者 2026-10-15：「在左邊 page 加一個來放，裡面都會放 space」）；第一個 Section 是 **Login & Sign Up** `190:286`（2026-10-15 使用者要求把頂列、圖示、間距表標在 Login／Sign Up 畫面上）：兩張畫面的複本，疊上量出來的標註（粉紅＝間距和 token 名、藍＝尺寸、橘＝圖示和點擊範圍）。標註是當下量的快照，畫面或間距改了要重跑，不會自己更新。同流程的新畫面放進那個 Section、接在最後一張右邊（間距 40）；新流程開一個新 Section。**不要再把畫面包進 auto-layout 外框**。腳本找畫面用 `section.children` |
| ↳ Setup · guided `127:2312` | | **2026-10-20 改成 iPhone 新機設定那樣：一頁一件事、沒有負擔**（使用者）。**2026-10-26 改為 8 步**（通知和訊息管道併成一頁；使用者：「這二頁可以放一起」），每位會員步數一樣，百分比 = 第幾步 ÷ 8（四捨五入）：1 幣別 13%（必填；選項只寫「VND」「THB」，10-26 使用者：「這裡不用寫到這麼複雜」，拿掉全名和「USDT supported」）`271:2621` → 2 **Account ID** 25%（必填；會員自己設定；畫面只寫「可以用來登入」）`271:2622` → 3 個人資料 38%（可略過；欄位下不放說明字）`271:2623` → 4 銀行／USDT 50%（不放說明字）`271:2624`：**10-26 改用 Segmented control「Bank account｜USDT」**（使用者：「這裡的 bank account usdt 如果也用 login signup 那個 ui 如何？」；原本 10-21 是兩張 Radio card，那個元件已刪），選哪邊下面就出現哪組欄位；銀行＝Bank、Account Number、Account Holder Name，USDT＝USDT address、Nickname for this address（`311:226`；10-21 照 USDT-2024 檔 `qAsNBjJ3H5uDY37NP2pqX2` 改：**不放 Network 選單**，網路從地址判斷——T 開頭 TRC20、0x 開頭 ERC20）。**按 Bank 欄打開底部面板選銀行**（`324:3051`，10-21 使用者：「bank 打開來用這樣呈現」）：標題 Choose your bank、Search bank 欄、銀行 logo 三欄格子（112×64 白底、圓角 4、間距 `spacing/3`），面板從網址列下方拉到底、裡面捲動；24 家越南銀行和「維護中」那格照 v1「Bnak name-vn」（v1 `9732:242366`）的現行版本，logo 是從 v1 匯出的圖。只要存一種就能提款，另一種之後在 Settings 加 → **5 Set a password 63%** `284:326`（使用者：「要把 pw 和 2fa 分開可能好一點」）：說明一句「Another way to log in.」、New Password、Confirm New Password；兩欄填好、一致才能 Continue，不想設就按「Set up later」（密碼不是必要的：Email 註冊用驗證碼登入、第三方用 Google／LINE／Zalo 登入）。**待定**：密碼規則（要問 IT；不符合時用 Field 的 Hint 先寫規則、離開欄位後才檢查、用 Error 狀態把那行換成紅字，兩欄不一樣寫「Passwords don't match.」——規則定了再畫） → **6 Security 75%**：說明一句「Keep your account safe.」，一列 Card 開關 **Two-factor authentication**，預設關、可以不開。**Passkey 不放 Setup**（10-21 使用者：「Login 後才是 passkey，所以我們在 setup 時候應該還不要 passkey」）：passkey 是下次登入才用得到，所以在客人用驗證碼登入成功後問一次，另外在 Settings › Passkeys 可以自己加。IT 會改成固定的中央驗證網域（`auth.<stable>`，passkey 的 RP ID），會員網站換網址不影響 passkey。2FA 打開 → Card 下面出現 **Email、電話兩個一般欄位**（使用者：「email 和 phone number 不用框起來，就二個欄位」）：驗證過的右邊寫「Verified ✓」（Field `Trailing=Note`），還沒驗證的右邊是綠字「Get code」（Field 新增的 `Trailing=Action` `282:92`）。按 Get code **跳出底部面板輸入驗證碼**，不另開頁（使用者：「要 get otp 可以 popup 的方式」）：面板跟 Sign Up · Account exists 那個一樣，**但沒有「Use a different …」連結**。兩個都 Verified 才能 Continue。五個狀態：`275:2679` 都關、`275:2887` 2FA 開·電話還沒驗證、`282:451` 電話驗證碼面板、`279:303` 2FA 開·還沒有 email（第三方登入沒拿到 email 的會員，例如 Zalo、LINE 沒授權 email：自己輸入再 Get code；Email 註冊和 Google 一開始就是 Verified）、`275:2762` 2FA 開·兩個都 Verified → **7 Notifications 88%** `271:2628`（推播開關＋訊息管道同一頁：標題下一句「Know the moment there’s a deposit or withdrawal update, a bet result or a security alert.」，上區塊 Push notifications 開關，下區塊「Message channel」標籤＋ Email／SMS／Zalo・LINE 選項＋「Verification codes… are always sent」；Continue＋Set up later；高 866 要捲一點。原本的訊息管道頁 `271:2630` 已刪） 。**10-26 SMS／Zalo・LINE 可以直接選**（使用者：「如果客人選了 sms 但沒有設定，就直接 popup 開始設定，然後 verify otp」）：沒有電話時選項不再變灰，小字寫「Add your phone number」；點了就跳出底部面板「Add your phone number」（國碼＋號碼，右邊 Get code）`485:165`，按 Get code 換成驗證碼面板 `485:405`，驗證完回到這頁、選項已選好。面板裡的欄位標籤底色要用 `bg/sheet`（不然標籤後面會有一塊頁面色），程式 `.sheet .field` 已同步 → 8 主題 100% `271:2629` → **首頁＋ Welcome popup** `271:2631`（10-21 使用者：「這應該是進去 lobby 的畫面」「lobby 還沒討論，你可以先給我一個空白……welcome 用一個 popup 蓋在上面」）：底下是還沒設計的 lobby（虛線框寫 Lobby），上面蓋底部面板「Welcome to V9Bet」＋新會員優惠、任務兩張卡＋ Go to Deposit，✕ 關掉就是留在首頁；「Browse home first」拿掉。只有新註冊會看到，教學在它之後（`entry-routes.html` 圖已改）。刪掉的：總覽開場頁、Before Step 2／3 清單頁、獨立的電話頁 `271:2626`、Email 頁 `271:2625`、舊密碼頁 `271:2627`（和它的 2FA 版本 `273:2710`）。可略過的頁統一「Set up later」。**待定**：2FA 開好之後是不是還要走驗證器 App；Account ID 的規則（長度、字元、能否重複、能否改）；幣別頁文字。📏 Spacing 頁的 Setup 三張規格是舊流程的快照，Setup 定案後要重量 |
| 📏 Spacing | `134:46` | 間距標註專用頁。一個流程一個 Section，裡面是畫面的複本加上量出來的標註（粉紅＝間距和 token、藍＝尺寸、橘＝圖示）。目前有 Login & Sign Up `190:286`（Login · Password／Sign Up · Default／Login · Enter code · typing）、Setup · guided `188:154`（Start／1 Currency／Before Step 2）。2026-10-19 全部重新產生：標註從量到的節點算出來，標籤兩兩、標籤和畫面都檢查過不重疊。**2026-10-20 整頁更新**：標籤改成 `spacing/N`；6 張規格畫面改成 page 結構；頂列那一排的標註框（header 外框、✕／返回的 44 點擊範圍、24 圖示、兩個分頁之間的間隔）從實際節點重量，連到它們的引線按標籤重新接（圖示接中心、header 接右緣、分頁間隔接右緣）。左右邊距條本來就從頂列畫到底，不用動。之後畫面再改，這頁要再量一次。**2026-10-26 兩區重新產生**（使用者：「也去改 📏 Spacing」）：Login & Sign Up `190:286` 換成 Login · Password、Sign Up · Default、Login · Enter code · typing；Setup · guided `188:154` 換成 Guided · 1 Currency、4 Bank account / USDT、6 Security · 2FA on（舊的 Start、Before Step 2 已不存在）。每張是正式畫面的複本，標註從節點量出來：深粉紅＝區塊之間、淺粉紅＝區塊裡，標籤寫數字和 token（例「16 · spacing/4 · between sections」）；藍＝尺寸；橘＝圖示與 44 點擊範圍。順手把 page body 裡沒綁變數的間距綁到 `spacing/N`（7 處）。Field 元件裡框內 6 的間距是 Tailwind 的 1.5，Figma 沒有 `spacing/1.5` 變數（名稱不能有「.」，待決定），先維持數字 |
| 🔀 Flows | `270:94` | **2026-10-21**（使用者：「不要這種文字 flow，要用 screen 的」）。板子 `505:5331`（底色 `v1/grey-600`，跟畫面底色分開）：① Email 註冊、② 第三方註冊，**每一步都是 📱 Screens 上真正畫面的 instance**（縮成 0.5），之間用箭頭串起來，上方一行小標寫第幾步和百分比；只有沒拿到 email 才出現的「Security · 還沒有 email」用虛線框圈起來。**為了讓流程跟畫面同步，用到的畫面都已轉成元件**（位置和名稱不變，id 換新：舊→新對照見 commit 訊息）：在 Screens 改畫面，流程頁自動跟著變；只有增刪或調換步驟時要回來改這頁 |

**變數**（名字和值對應 `variables.css`，WEB code syntax 已填）：`Primitives`（`v1/*`、`neutral/*`、`alpha/*`，另有調過的 `grey/450` `red/450` `surface/1` `surface/2`，scopes 空的）、`Color`（只有 Dark 一個 mode：`bg/app|card|sheet|scrim|disabled` `text/primary|secondary|muted|tertiary|disabled|nav-inactive|on-brand|on-error` `border/default|focus|empty|subtle|handle` `brand/primary|secondary` `status/error` `promo/accent`）、`Spacing`（`spacing/1 2 3 4 5 8`，2026-10-20 起用 Tailwind 的數字命名，見下）、`Radius`（`radius/md` `radius/full`）。在 v1 之上調過的八件事列在 `CLAUDE.md`。

**顏色**（**2026-10-27 淺色／深色**，使用者：「整個網站要做 system 的 light and dark……依據 framework 的 css」，灰色選 zinc、品牌色保留）：`Primitives` 加了 Tailwind `zinc/50…950`、`emerald/400|700`、`red/400|600`、`violet/400|600`；`Color` 從只有 Dark 變成 **Dark／Light 兩個模式**，24 個語意色兩邊都對到 zinc（對照表見 CLAUDE.md「淺色／深色」），新增 `bg/selected`（分段選中）。Segmented control 原本直接塗 `surface/1`、`v1/grey-500`，改綁 `bg/card`、`bg/selected` 才會跟著換。畫面預設顯示 Dark；要看淺色，在 frame 上把 `Color` 模式設成 Light。對照區 `664:5973`「Theme · Dark / Light」（Login、Setup 8 Theme、Profile 各一組）。Toast 照舊固定淡藍 **面板照 Tailwind 官方（Catalyst）**（使用者：「照 Tailwind 官方」）：`bg/sheet` 深色改 zinc/900（跟頁面同色），新增 `border/sheet-ring`（zinc-950 10%／white 10%，所有 sheet frame 加 1px 外框），`bg/scrim` 改 zinc-950 25%／50%。

**文字樣式**（**2026-10-27 改成 Tailwind 刻度**，使用者：「可以按 Tailwind」「不要考慮 v1，v1 沒有規則可言」；每個樣式的 description 寫著對應的 Tailwind class）：`Display/SemiBold` 30/36 `text-3xl`、`Title/Semibold|Regular` 18/28 `text-lg`、`Body/Regular|Bold` 和 `Tab/Regular` 16/28 `text-base/7`、`Button/Medium` `Field/Regular` `Code digit/Regular` 16/24 `text-base`、`Small/Regular|Light` 14/24 `text-sm/6`、`Micro/Regular` `Field label/Regular` 12/20 `text-xs/5`。內文、小字、標籤的行高用 Tailwind 的「/n」放寬一格給越南文、泰文。原本 Tab 15/27、浮起標籤 13/16 不在任何刻度上，一起改掉。Step hero 的標題原本沒套樣式，已套 `Title/Semibold`

**字體是 Roboto，不是 SF Pro。** `listAvailableFontsAsync()` 會列出 SF Pro，`loadFontAsync` 也不報錯，但文字寬度全部是 0、`hasMissingFont` 是 true，截圖裡一個字都沒有，`setProperties` 改文字會報「font isn't available」。Roboto 是產品字體堆疊裡 Android 用的那支。使用者要 SF Pro 的話得在自己的 Figma 桌面版把文字樣式換掉。

| 元件 | id | Variants / 屬性 |
|---|---|---|
| icon/close · back · eye · eye-crossed · check · chevron-down · chevron-right | `4:10` 新 `icon/back` `icon/eye` `4:14` `4:18` `16:33` `36:53` | **固定一套：Heroicons outline**（2026-10-26 使用者：「back arrow 也可以改一樣粗細嗎？但要大一點，我們這版 icon 要換一下」；原本是 v1 的 Flaticon fi-br）。線寬全部 1.5；頂列的 ✕ 和返回放大到 28（Nav top、Step top bar、Sheet header 裡的 icon 槽）。**2026-10-26 統一做法**（使用者：「你有重做 icon 並放在元件庫嗎」）：每個 icon 都是 24×24 的框，圖形放在中間 20×20 內（eye、eye-crossed 寬 20，check 寬 18；原本這三個是 16 的框、圖形貼邊），所有圖層設成跟著框縮放，不裁切。用的時候只改框的大小：24、20（Tailwind `size-5`，輸入框裡的眼睛）、16（`size-4`，Verified 勾、選項卡的勾）。44 的點擊範圍屬於按鈕，不放在 icon 裡。顏色綁變數。原本混了 fi-rr 的 ✕、fi-ios 的箭頭、三角形下拉、iOS 樣式的 sheet-close，已全部換掉；sheet-close 刪除，面板關閉也用 icon/close。程式：`.icon .icon-<name>`，檔案在 `assets/icons/<name>.svg` |
| Nav top | `4:28` | TEXT `Title`；裡面的 `action` 可以隱藏（Setup 沒有關閉）。**2026-10-27 標題只給「點進來的頁」**（使用者：「因為你的標題很多字 在翻譯可能就會有放不下的問題」）：Settings、Account、Profile 這種從選單點進來的頁，標題留在頂列（告訴你在哪）；一頁做一件事的流程頁（Login Enter code、Verify Email、Sign Up · social、Forgot Password）頂列只留 ✕，`Title` 設成空白，標題放進內容最上面的 Step hero（sentence case，例：Verify email、Enter code、You already have an account），原本的第一句說明移到 Step hero 的 Why。結果頁（Social · Linked）頂列也不放標題。**10-27 最後定案：流程頁頂列不寫字**（使用者：「header 不寫字 可以嗎？」）：中間試過頂列放短的流程名（Log in／Sign up／Link account／Forgot password），但 Verify email 這種頁會在很多地方共用，寫流程名會錯，所以全部拿掉，跟 Google、Apple 的登入流程一樣只留 ✕，標題只在內容的 Step hero。Forgot Password 第一張的內容標題回到「Forgot password」。Linked 是 Status mark ＋ Step hero「Welcome back」／「You’re logged in as v9_user***. LINE is now linked to this account.」。Settings、Account、Profile 這種點進來的頁，標題照舊放頂列 。**驗證碼頁的標題一律用動詞 Verify**（使用者：「應該 verify or verification」）：Login 和 Forgot Password 的「Enter code」改成「Verify it’s you」（跟 Social 同一句，Google 登入驗證也是這句）；驗證 email 的頁是「Verify email」。名詞 Verification 只用在設定項目的名稱（例：Two-step verification），不當頁面標題|
| Button | `4:41` | State = Default / Disabled；TEXT `Label`。**沒有紅色狀態**（2026-10-13 拿掉） |
| Link row | `4:48` | TEXT `Prompt`、`Action`。**2026-10-27 單獨用就是「沒有底色的按鈕」**（使用者：「它只是沒有顏色的 button，應該和一顆 button 同尺寸」）：滿版、46 高，跟 Button 一樣大。Login 8 張的「Forgot Password?」從 13 號字的文字框換成 Link row（prompt 隱藏）。程式：單獨的 `a.link-row` / `button.link-row` 滿版、圓角 full、粗體綠字 |
| Tab · Tabs | `4:60` `4:77` | Tab：Selected = True / False。Tabs：Active = First / Second（One-time code ｜ Password）。**Last used（2026-10-26 定案）**：分頁上不放小標（曾加過 `Last used` 屬性，同日拿掉）——上次用密碼或驗證碼，登入頁就直接打開那個分頁；只有 Google／LINE／Zalo 在圖示上標「Last used」。沒有記錄（第一次、換手機、或上次用第三方）時預設打開 One-time code，因為很多會員用 email 驗證碼註冊、沒設密碼。Login · One-time code `8:157` 就是這個預設畫面（上次用 Google）。**記在哪**：這台裝置的瀏覽器，只記方式不記帳號，而且要記在固定的 auth 網域上（登入頁整頁放在那裡），換網址才不會不見；細節在 `login-flow-wireframe.html` |
| Segmented control | set `414:166` | **2026-10-26 定案**（使用者：「改成正式」）。Login 和 Sign Up 每一張的頂列只留 ✕，頂列下面放這個切換；10-26 起 Bank account｜USDT（Setup 第 4 步、Settings 的銀行頁）也用它：寬 240（Tailwind `w-60`）置中、高 44、底 `surface/1`、內距 `spacing/1`、`radius/full`；選中的那半填 `v1/grey-500`、字 Body/Bold `text/primary`，另一半 Body/Regular `text/secondary`。上面照全站規則留 20（使用者看過 8 之後決定維持 20）。VARIANT `Active` = First / Second，TEXT `First` `Second`。刻意跟底線分頁長得不一樣：上面是「註冊還是登入」，下面是「用哪種方式登入」。**10-26 分區塊**：page body 裡包成「switch + social」（切換＋社群圖示，間距 `spacing/2`）和「form」（Divider 以下全部，間距 `spacing/3` 12）兩個 frame，區塊之間 16（跟全站一樣），Divider 自己再帶上下 12，線離上下區塊 28。全部回到 844（錯誤狀態 4 張 859） |
| Coach mark | set `319:228` | **2026-10-21 新增**。教學的說明泡泡：標題（Body/Bold）、一句說明（Small/Regular、`text/secondary`）、底列「1 / 4」＋ Skip ＋ Next（綠字 Body/Bold，最後一站改「Done」）。底色 `bg/sheet`、`radius/xl`、內距 `spacing/4`、行距 `spacing/2`、寬 280。VARIANT `Placement` = bottom-start / bottom / bottom-end / top-start / top / top-end（照 Floating UI／Popper 的命名：泡泡在目標的哪一邊，箭頭在另一邊、離邊 `spacing/5`）。TEXT `Title` `Body` `Step` `Next`，BOOLEAN `Show skip`。亮目標用的暗幕不在元件裡，在畫面上用 `bg/scrim` 的矩形挖洞。**程式還沒做** |
| icon/calendar · Guided · 3 Personal information | `684:6374` · `271:2623` | **2026-10-29 Date of Birth 加日曆**（使用者：「要加日曆」）。圖示用 Heroicons outline 的 calendar，放在 Components 的 icon 那一排。Date of Birth 欄位改成 Trailing=Icon、右邊是日曆，值改成「18/04/1992」（越南、泰國的日／月／年順序）。程式：跟 Gender 一樣是「點欄位打開裝置自己的選擇器」，用 `<input type="date">` 疊在欄位上，選完照裝置的地區格式顯示；只能選 21 年前（含）以前的日期。**21 歲限制**（使用者 10-29：「要 限制21y」）：欄位下方 Hint「You must be 21 or older.」打開；未滿 21 歲變紅框、報同一句，不能 Save（舊 iPhone 日曆可能擋不住，所以程式另外檢查）。新增 Field 變體「State=Error, Trailing=Icon」`686:95`、畫面「Guided · 3 Personal information · error · under 21」`686:5575`（後面的 Guided 畫面往右移 430） |
| Radio（原名 Tick） · Checkbox | `4:87` · `656:3758` | State = Off / On。**2026-10-27 分開**（使用者選「勾選用方框＋Radio 修精緻」，Material／Tailwind 的標準）：**Radio** 是幾個裡面選一個（選項卡裡），22 圓環，關的時候空心、1.5 `border/default`；開的時候 2 `brand/secondary` 圓環＋10 圓點。**Checkbox** 是可以單獨勾的（Keep me logged in、21+ 同意，11 處已換），20 方框、圓角 4、1.5 `border/default`；開的時候 `brand/secondary` 填滿＋白色 ✓。程式：`.tick` 是 Radio、`.checkbox` 是 Checkbox。**「Keep me logged in」預設不勾**（使用者 10-27：「default 不要勾」），Login 8 張都是 Off，程式 `#remember` 也拿掉 `checked`。Login · Password 那一列原本左右多 14 內距，已拿掉，對齊 16 |
| Divider | set `223:50`：`Label=Yes` `4:95`（原本的 Divider label，instance 都還連著它）、`Label=No` `223:46` | **2026-10-20 改成兩個變體**（使用者：「加一個沒有文字只有線的」）。Yes：兩條線中間一段短字，TEXT `Label`，把社群登入和手動填寫分成兩區；No：一條完整的線，給不需要名字的兩組之間。兩種都是上下 padding `spacing/4` 加上頁面間距 16 = 32。沒用「隱藏文字」做，因為藏掉字以後兩條線中間還會留 12 的缺口。程式 `.divider-label` · `.divider`。**2026-10-26 改**（使用者看了 Preline：「把 Preline 的改成我們的」）：上下 padding 12（`spacing/3`、`py-3`），線和字之間 24（`spacing/6`、`gap-6`）；頁面照全站規則區塊之間 16，線離上下 28。程式 `.divider-label` `.divider` 同步改 |
| Code cell | `4:111` | State = Empty / Focus / Filled / Error；TEXT `Digit` |
| Code input | set `226:77`：`State=Default` `226:46`、`State=Invalid` `226:59` | 2026-10-20 新增。六個 Code cell、間距 `spacing/3`、置中；Invalid 六格全紅，下面一行 TEXT `Error`。已取代畫面裡手排的 `code` 框 10 處和 `code block` 2 處（2026-10-20，每格狀態、數字、錯誤訊息逐一照抄並比對）。程式 `.otp` · `.otp[data-invalid]` ＋ `.error-text` |
| Field | `5:65` | State = Empty / Focus / Filled / Error × Trailing = None / Icon / Note / Action（共 8 個；**2026-10-21 加 `State=Filled, Trailing=Action` `282:92`**：欄位右邊一個綠色文字按鈕，用 `Note` 屬性寫字，例如 Security 的「Get code」）；TEXT `Label` `Value` `Note` `Error`。**2026-10-20**：加 BOOLEAN `Hint`（預設關）＋ TEXT `Hint text`，說明字是每個非 Error 變體的最後一行（13、`text/secondary`、框下 4），打開才佔高度——規則是說明放在欄位裡，不要在欄位外另放一行。畫面上原本放在欄位外的 6 處（`field + hint` 框）已改成打開 Hint（2026-10-20，高度不變）。Focus 變體的浮起標籤改綁 `text/primary`，跟白框線一起亮（使用者：「focus 時，字也要一併 focus」）；程式 `.field > input:focus:not([aria-invalid="true"]) + label`。**2026-10-26 加國碼前綴**：BOOLEAN `Country code`（預設關）、TEXT `Code`（+84）、INSTANCE_SWAP `Flag`（flag/vn、flag/th），只在 Focus／Filled／Error 有，放在框內最左邊：國碼、22 國旗（原尺寸；10-26 縮成 18 時被裁成方形，使用者：「這國旗處理不好」，改回 22，flag/vn、flag/th 裡面的圖也改成會跟著縮放）、16 向下箭頭（灰色 `text/secondary`；10-26 原本只縮了外框、箭頭本身還是 24 的大小，看起來又大又粗，改成整個等比縮小，箭頭寬 10）、1px 分隔線，間距 `spacing/2`。Focus 的輸入值也改綁 `Value`（原本是空白，舊的 Focus 實例照舊空白）。**2026-10-26 標籤底色跟著所在的底**：新增變數集合 **Surface**（模式 Page／Card／Sheet），變數 `surface/current`＝`bg/app`／`surface/1`／`bg/sheet`；Field 浮起標籤的底綁它。容器設模式，裡面的輸入框自動跟著——📱 Screens 上所有底部面板（frame 名 `sheet`）都設成 Sheet 模式。以後放在卡片上的輸入框，把卡片設成 Card 模式即可。**2026-10-26 電話只有一種輸入方式**（使用者：「要不要放國旗，這裡用一個版本」）：所有電話欄位都是同一個 Field、框內左邊「+84 🇻🇳 ▾ |」，取代原本「Code」「Phone Number」兩個框並排（Security、Settings 2FA、通知加電話面板、忘記密碼共 8 處）。國碼前綴也加進 `Trailing=Note`、`Trailing=Action` 兩個變體；空的電話欄先只顯示標籤，點進去才出現國碼（跟 Material 一樣） |
| Social button | `5:121` | Provider = Google / LINE / Zalo × Last used = No / Yes。標誌是 `social/google|line|zalo`（`5:76` `5:78` `5:80`），LINE、Zalo 是上傳的官方圖檔 |
| Action bar | `14:38` | BOOLEAN `Skip link`；裡面是 Button（`button`）和 Link row（`skip link`）。內容比畫面高的頁面把按鈕釘在底部用的。網頁版是 `.action-bar`（2026-10-16 補上） |
| Option card | `16:78` | State = Default / Selected；TEXT `Title` `Sub`；INSTANCE_SWAP `Icon`（預設 `flag/vn`）。v1 的「radio button with icon」加寬成兩行 |
| flag/vn · flag/th | `16:40` `16:48` | v1 匯出的 SVG（`assets/flags/`） |
| Sheet header | `22:63` | TEXT `Title`；把手、置中標題、右上關閉（`icon/sheet-close` `22:51`）。v1 的彈窗是從底部上來的面板（AnchoredSheet）：底 `bg/sheet` #1C1C1E、上方圓角 12、後面一層 `bg/scrim` 黑 60% |
| Status mark | `22:73` | 48 的綠圈加勾，結果頁用，取代 wireframe 的 emoji。**2026-10-26**：勾改成 32（`size-8`），線寬 2 跟外圈一樣粗（換 Heroicons 後原本 16 的勾太細，使用者：「這 icon 很弱」） |
| Toast | `507:93` | **2026-10-26 新增**（使用者同意加「Account created」提示）。照 v1 的 Toast Message：淺藍底 `v1/blue-light` #99CCFF（新變數，程式 `--v1-blue-light`）、近黑字、圓角 4、內距 `spacing/3`；TEXT `Title`（Body/Bold）、`Message`（Small/Regular），BOOLEAN `Show message`（預設關）。放在畫面下方、固定按鈕上方 16，幾秒後自己消失。用在 `Guided · 1 Currency · arriving` `507:3523`：註冊完（email 或第三方）第一次進 Setup 時出現「Account created」 |
| List row | `36:83` | Trailing = Chevron / Toggle on / Toggle off；TEXT `Title` `Value`。v1 設定頁的 search/list：50 高、卡片底 `bg/card` #212326、圓角 12，同一張卡裡用一條頁面底色的細線隔開，上面一行 15px 白 30% 的分組標題（`text/tertiary`） |
| Card | `227:58` | 2026-10-20 新增。List row 疊在 `bg/card`、`radius/xl` 12，列之間 1px `bg/app` 的線。第 1–3 列固定，BOOLEAN `Row 4` `Row 5` `Row 6` 開關（藏一列會連它上面的線一起藏）。已取代畫面裡手拼的 `list` 框 8 處和 Profile 的 `more` 1 處（2026-10-20，每列標題、值、Trailing 逐一照抄，高度一致）。程式 `.card` ＋ `.list-row` |
| Toggle | `36:63` | State = On / Off；開的時候是綠色（v1 是紫色，2026-10-13 改） |
| Step top bar | set `241:165`（原元件 `55:58` 是 `Progress=13%`） | **2026-10-20 改**（使用者：「每一頁上加一個 progress bar 給客人知道再完成多久就要結束了，用 percentage 來呈現」）：返回在左、4px 進度條撐滿中間（底軌 `border/default`、進度 `brand/secondary`、`radius/full`，照設定頁 Setup rewards 那條）、百分比在右（13、`text/muted`、寬度隨文字）。VARIANT `Progress` = 13% / 25% / 38% / 50% / 63% / 75% / 88% / 100%（8 步；2026-10-26 通知和訊息管道併頁後），BOOLEAN `Back`。**用變體不用文字屬性**：Figma 的外掛 API 不能改 instance 裡內層的尺寸（矩形、frame 都試過，寬度不動），所以進度條長度只能跟著變體走。iPhone 的新機設定其實沒有進度條，這是使用者要的、照 App 新手引導的常見做法加的 |
| Step hero | `55:69` | TEXT `Title` `Why` `Points`、BOOLEAN `Show points`。18 標題、一句為什麼、點數小標，置中。2026-10-15 拿掉 56 綠圈數字（`Number` 屬性已刪），標題從 28 改 18：進度只在 Step top bar 出現一次。**2026-10-20**：點數拿掉（使用者：「point 我們先拿掉」），`Show points` 預設改成關，Setup 每頁都關。**2026-10-21 點數機制整個拿掉**（使用者：「setting 那些頁……這個 point 的機制先拿掉」）：所有畫面 `Show points` 都關；Settings 首頁上方的 Setup rewards 卡刪掉（跟 `profile-settings-flow-wireframe.html` 08-30「不放 nudge 卡」一致）、各列的「· +10」拿掉；Account Setup 四張的 rewards 卡和「+10 points」拿掉；Profile「Finish setting up」不再寫點數；第三方 Welcome 拿掉「Finish setup to earn 100 points.」 |
| Auth tabs | `72:1466` | **2026-10-26 停用**：Login／Sign Up 改成頂列只留 ✕、切換用下面的 Segmented control（老闆覺得頂列的「Sign Up　Log In」看不出是切換）。元件只剩 📏 Spacing 頁兩張規格快照在用（`190:467` `190:293`，那兩張的頂列標註也因此過時），規格重量時一起換掉再刪。舊說明：Current = Sign Up / Log In，✕ 在左、兩個文字分頁、目前這頁白色粗體＋16×3 綠線 |
| Checklist row | `7:45` | State = Todo / Done；TEXT `Number` `Title` `Sub`。v1 沒有，照 v1 的語言畫的；網頁版是 `.checklist` ＋ `.checklist-row`（2026-10-16 補上）。**2026-10-21**：`State=Done` 的記號從「綠圈＋綠點」（看起來像被選中的單選鈕，跟待辦的數字 1 2 3 對不起來；使用者：「綠色點點和 1 2 3 是對應的？有點奇怪」）改成**實心綠圈＋打勾**（`brand/secondary` 底、icon/check 用 `bg/app` 色）。`Sub` 預設值拿掉「+10 points」 |
| Checklist | `227:103` | 2026-10-20 新增。Checklist row 包在 1px `border/default` 外框、`radius/xl` 12，列之間是 `border/subtle` 8% 的細線；外框線算進排版，所以列寬 356。第 1–2 列固定，BOOLEAN `Row 3`（預設開，兩項的群組關掉）`Row 4` `Row 5`。已取代畫面裡手拼的 `items` 框 14 處（2026-10-20，含 4 個兩列的群組）。程式 `.checklist` ＋ `.checklist-row` |

| 畫面 | id | 尺寸 |
|---|---|---|
| Login · Password / · filled / · One-time code | `8:35` `8:94` `8:157` | 360 × 800 |
| Login · Password · typing a phone number | `401:5374` | **電話自動帶國碼**（2026-10-26，使用者看了 BC.Game：「只要輸入 09 之後，它就會跳出國碼，我覺得這比單純輸入好」）：帳號欄一開始是空的一格；輸入第一個字是數字或「+」時，欄位左邊出現「+84 🇻🇳 ▾ |」，打英文字母就收回（當成 Account ID 或 email）。預設國家**不看 IP**（很多客人用 VPN，BC.Game 就猜錯成 +62）：先看手機時區（Asia/Ho_Chi_Minh／Asia/Bangkok），再看系統語言地區（vi-VN／th-TH），都看不出來才用網站所屬市場；點國碼可改成 +66。Account ID 現在允許全數字，所以後端收到全數字時，Account ID 和電話（用顯示的國碼）兩邊都查，兩邊都有就用密碼決定；One-time code 分頁只收 email／電話，不會撞。 |
| Login · error · phone too short / · email / · Account ID / · wrong password | `437:3847` `437:3958` `437:4069` `437:4180` | **2026-10-26**（使用者給 v1 的錯誤欄位：「這是我之前的版，你可以給我新的」）。用 Field 的 Error 狀態：紅框、紅標籤、框下一行紅字。前三種是格式錯（離開欄位或按 Log In 時才檢查，Log In 變灰）：電話太短「Enter a valid phone number.」（國碼留著）、email 格式「Enter a valid email address.」、Account ID 有空白或符號「Letters and numbers only.」（v1 寫「Only contain alphanumeric characters」，改成較通順的說法）。第四種是送出後帳密不對：錯誤放在密碼欄「Account ID or password is incorrect.」，**不說是哪一個錯**（不透露帳號存不存在）。Field 沒有 Error＋眼睛圖示的變體，所以這張密碼欄的眼睛暫時不見，要補一個 `State=Error, Trailing=Icon` |
| Sign Up · Default / · Ready / · From invite link | `271:2618` `271:2617` `8:308` | 360 × 800 |
| Verify Email · In progress / · Ready / · Resend available / · Invalid code / · Too many resends | `21:535` `271:2619` `21:601` `21:633` `21:667` | 360 × 800（排在 Sign Up 那一列） |
| Sign Up · Account exists（Sign Up 上面蓋一張面板） | `23:602` | 360 × 800 |
| ~~Existing account · Reactivated / · Signed in / · Limited / · Restricted~~ | 已刪 | **2026-10-26 刪除**（使用者：「應該不會有後面這些」）：Sign Up 時帳號已存在，在面板輸入驗證碼就直接登入，不再多一張結果頁。休眠／黑名單／受限的處理規則仍在 `entry-routes.html` |
| Login · One-time code · typing a phone number / · error · phone too short | `676:390` `676:307` | **2026-10-29 登入方式分開**（使用者：「password 只能用 account，one time code 可以用 email and phone number」）：Password 分頁的帳號欄標籤改成「Account ID」，不跳國碼，只檢查英文字和數字；One-time code 分頁「Email / Phone」，打數字跳 +84 國碼，太短報「Enter a valid phone number.」。同一天前一版（Password 分頁全數字兩邊查）的「Login · Password · typing digits」`401:5374` 已刪。Password 分頁的 email 錯誤那張 `437:3958` 換成「Login · One-time code · error · email」`679:6422`；「error · Account ID」「error · wrong password」改名加上「Password ·」。Login 8 張、Light／Dark 兩張、📏 Spacing 那張的欄位標籤都改成「Account ID」。補一張「Login · One-time code · typing an email」`681:6317`。Login 區塊按分頁重排：Password 4 張 → One-time code 5 張 → Enter code 4 張。IT 說明見 MACHINES.md 第 19 項 |
| Sign Up · Terms of Service (sheet) / · Privacy Policy (sheet) | `661:3780` `661:3895` | 2026-10-27（使用者：「都做進去指 Terms of Service／Privacy Policy 面板」）。從 Sign Up 點連結 → 高 600（約 90%）的面板蓋在表單上，不換頁，填的東西都留著；標題、版本日期一行、章節標題＋「Text from Legal.」（內文由法務提供），內容可捲動。**面板裡沒有「I agree」**：同意只在表單上的勾選框。與 `system-pages-wireframe.html` 的 in-context sheet 一致。程式：`#sheet-legal`，測試面板 Sign Up › Terms & Privacy |
| Social · Welcome / · Account found / · Verify it's you / · Linked / · New → verify / · New → add email / · New → Setup 1 | `271:2620` `23:777` `23:798` `23:829` `524:3651` `524:3700` `512:3657` | 360 × 800。**2026-10-26 Google 自動連結**（使用者：「Google 自動連結 ok」）：Google 給的 email 已驗證、且等於既有帳號裡已驗證的 email，就直接登入並連結，不出現 Account found；這幾張的例子因此改成 LINE（Account found、Verify it’s you、Linked）。Account found 文字精簡（10-26）：頂列「You already have an account」、「This LINE account matches v9_user***.」「We’ll send a code to confirm it’s you.」、按鈕「Send code」，拿掉「For your protection…」和「Not you? Contact Live Chat」；**10-26「Use a different account」也拿掉**（使用者：「我們不用去操心這個」），不想連結就按頂列 ✕ 回 Sign Up。**10-26 Social · Welcome（Account created）刪除**（使用者：「這頁的功能只是一個轉頁」）：第三方回來後由後台分流——Google 已驗證 email 對到已驗證帳號 → 直接登入、自動連結、去首頁；LINE 的 email 對到帳號 → Account found（LINE 不給電話，只能用 email 對；畫面寫「The email on this LINE account is already used by v9_user***.」）；Zalo 不給 email 也不給電話，對不到帳號、一律開新帳號；沒對到、有 email → 用 email 建帳號；沒對到、沒 email → 用平台帳號 ID 建帳號；兩種新帳號都直接進 Setup 1。**10-26 第三方改流程**（使用者：「用google line or zalo 去註冊，都會走第二張的步驟。但如果抓到email. 我們就做一次我們verify … 如果不想verify 就直接拿來登入」「Zalo 或line 拿不到email 那就下一步問要不要做email verify … 比對舊客人，已經有帳號 ，要做一次otp」）：取代 Google 自動連結（Google → 大廳那張刪了）。新客人有 email → `524:3651` Verify Email（碼已寄出、可 Skip）；新客人沒 email → `524:3700` Add Your Email（Email 欄位＋Send code＋Skip，Send code 接 Sign Up 的 Verify Email）；兩條都落在 `512:3657` Setup 1 · Account created。對到舊客人（三家都一樣）→ Account found → Verify it’s you（寄到對到的那個 email，不能跳過）→ Linked。Skip 用 Link row `4:48`、prompt 隱藏|

| Welcome + Offers | `271:2631` | 360 × 800 |
| Tutorial · New member tour / · What's new | `319:3135` `320:3097` | **2026-10-21**（使用者：「Tutorial 要用什麼方式呈現？跟著畫面跑？」→ coach mark；「這 4 個覺得很亂……這時已經進去 lobby 了」）。教學**全部在 lobby 上**，只有一種做法：暗幕挖洞把目標亮出來（`bg/scrim`），旁邊一個 Coach mark。**新會員**：Welcome popup 關掉後跑一次，3–4 站、可 Skip、看過不再出現（`319:3135`，1 / 4）。**舊會員有新功能**：只亮那一個，一站、沒有 Skip、按「Got it」結束（`320:3097`，Step 寫「New」）。**lobby 還沒設計**，目標（Deposit、History）是虛線佔位，真正停哪幾站等 lobby 定了再排。原本投影片式的 3 張（You're all set、Tour running、What's new；`25:862` `25:894` `25:919`）已刪。**「Get the app」（掃 QR 下載 App）跟著那張一起拿掉了，要放哪還沒決定**。列：Tutorial & App |
| Forgot Password · Choose how / · Enter phone / · Reset / · New password filled | `37:891` `37:931` `37:961` `37:989` | 360 × 800（列：Forgot Password） |
| Account · Setup incomplete / · All done | `325:3107` `325:3127` | **2026-10-21 Settings 拆成兩頁**（使用者：「設定我們做二種，一種算 system 的設定，一個是個人訊息的設定」「這個在 profile 裡」）。**Account（個人）**：Account related（個人資料、身分驗證、銀行／USDT、電話、Email、密碼）、Security（Passkeys、2FA、Active session、Auto log out）、More（Responsible Gaming、History、Account status）。**Settings（系統）**只剩 Preferences（通知、主題、語言、訊息管道、產品偏好）。兩頁都從 Profile 進：點頭像／名字（名字後面加了 ›）進 Account，右上「Settings ›」進 Settings，所以頂列都改成返回箭頭；Log out 只留在 Profile。Section 改名 Account & Settings |
| Settings · Setup incomplete / · All done | `37:1024` `37:1154` | 360 × 1339 / 1205（列：Settings）。**2026-10-21 Security 卡片跟 Setup 第 6 步對齊**：Passkeys（Set up／2 devices）、Two-factor authentication（Off／On）、Active session、Auto log out after 30 min。Settings 這裡用「Passkeys」這個名稱（`security-methods-wireframe.html` 的規則：客人到 Settings 是來找這個設定的），進去第一行寫「Sign in with face or fingerprint.」跟 Setup 的用字接上 |
| Settings › Two-factor authentication · phone not verified / · on | `297:1155` `297:1359` | 2026-10-21。內容跟 Setup 第 6 步的 2FA 部分一樣（開關＋ Email、電話欄位，Verified／Get code，按 Get code 跳出同一個驗證碼面板），頂列 Nav top 改返回箭頭，沒有進度條、沒有 Continue（改了就生效）。列：Settings |
| Settings › Passkeys | `297:1545` | 2026-10-21。一行「Sign in with face or fingerprint.」＋裝置清單（iPhone 15 · This device、MacBook Air · Used Oct 18），點進去可移除（要 OTP，還沒畫）。規則照 `security-methods-wireframe.html` 的 Passkeys 頁。列：Settings |
| Profile | `39:1102` | 360 × 1070（列：Profile）。2026-10-13 重排：身分、餘額弧形（28 的金額）、Needs your attention（待提款＋Cancel、Finish setting up、Inbox）、Statement 兩格、More（Promotions／Your offers／Refer a friend／Referral code／Language 收成清單列）、Log out |

| Account Setup · Step 1 / 2 / 3 / · Step 1 · no contact on file | `8:366` `8:453` `17:343` `17:435` | 原本的 Setup 總覽，2026-10-14 搬進 Settings 列 |

**2026-10-14 Setup 改成引導式**（使用者：「setup UI 做成剛拿到 iPhone 時一開始帶領使用者的步驟」「內容不變只是 UI 呈現方式改變」）：
- 列「Setup · guided」：Start → 1 幣別 → 2 個人資料（→ 2b 沒有聯絡方式時補 email／電話）→ Step 2 岔路頁（Continue／Skip this step）→ 3 收款 → 4 聯絡方式 → 5 密碼 → Step 3 岔路頁 → 6 通知 → 7 主題 → 8 訊息管道 → Welcome + Offers。一頁一件事、按鈕釘在底部、可跳過的項目底下是「Set up later」。畫面 id `57:1137` 起（Start）到 `271:2630`（8 Message channel）。
- 原本的清單總覽搬進 Settings 那一列，改名 **Account Setup**（頂列標題、按鈕 Continue Setup），用途是之後回來補做。
- 之後回來補做也走引導頁（使用者 2026-10-14：「補強加引導」）：從 Account Setup 點一項，打開的就是同一張引導頁，只是返回回到 Account Setup、沒有「n of 8」、沒有「Set up later」。Settings 那一列放了兩張範例（收款帳戶 `62:1458`、通知 `62:1482`）。原本有麵包屑的三列內頁（12 張）已刪除。 **2026-10-21 改**（使用者看到「opened later」通知頁還有 11% 進度條：「這應該不是這樣」）：從 Settings 打開的頁**不用 Setup 的頂列和進度條**，用 Nav top（返回箭頭＋標題），內容跟 Setup 那一步一樣、拿掉 Step hero 和 Set up later；能立即生效的（通知開關）沒有按鈕，要送出的（銀行）留 Save。兩張換成 `Settings › Notifications` `324:5296`、`Settings › Bank account / USDT` `324:5378`（舊的 `62:1482` `62:1458` 已刪）。

- **畫面是 iPhone 390 × 844，上下套 v1 的 Safari 外框**（使用者 2026-10-14：「到 v1 拿一個，保留上下兩塊，中間放內容」；尺寸取 Figma 機型清單裡最接近 375 的 iPhone 13 & 14）：上面 `Browser top · Safari`（`84:148`，狀態列＋網址列 94），下面 `Browser bottom · Safari`（`84:158`，工具列＋Home 條 83），都是從 v1 匯出的向量做成的元件；中間的頁面可以捲動。**只是呈現用**：網頁不畫這兩條、也不替它們留空間（`CLAUDE.md`）。程式仍在 360 寬檢查。
| Login · Enter code · typing / · all six entered / · invalid / · too many resends | `86:2217` `86:2271` `86:2325` `86:2381` | 2026-10-14 補：Login 按 Send Code 之後那一步（login-flow-wireframe 的 One-time Code Login） |
| Forgot Password · Enter code | `86:2435` | 2026-10-14 補：輸入電話和重設密碼之間那一步 |
- 畫面是 frame，裡面全部是元件的 instance；寬 360 固定。Login／Sign Up 高度至少 800、隨內容長高；Setup 固定 800，按鈕釘在底部（使用者 2026-10-13 確認）。
- **間距變數用 Tailwind 的數字命名**（2026-10-20，使用者選「全部用 Tailwind 數字」）：`spacing/1`＝4、`spacing/2`＝8、`spacing/3`＝12、`spacing/4`＝16、`spacing/5`＝20、`spacing/8`＝32，跟程式的 `gap-2`、`px-4` 同一個名字。（2026-10-20 程式改成直接用 Tailwind 預設刻度、不再有 `--space-*` CSS 變數，所以這些變數的 WEB code syntax 還指向舊的 `var(--space-N)`，要等使用者決定新的寫法——見 `CLAUDE.md` 第一條規則。）數字是刻度編號不是像素。舊名 `space/4…32` 是改名不是新建，所有綁定都保留；沒人用的 `space/40` 刪了（改名前查過三頁 0 個綁定、0 個別名）。
- 間距走 Tailwind 的 4px 格線（2026-10-14）：欄位和欄位 8（`fields` 綁 spacing/2）、其他同一組 12、區塊之間 16（page body 的 gap 綁 spacing/4；程式是 `gap-4`。分隔線元件上下 padding 綁 spacing/4，加上 gap 共 32）、主按鈕上方 16（直接用 page body 的 gap，不包框、不加 padding；使用者 2026-10-14：「12 拿掉，用 gap 就好」）、左右 16、頂列到內容 20、欄位到它的說明 4（說明放在欄位框裡最後，`spacing/1`）。圓角走 Tailwind 刻度：`radius/xl` 12（框）、`radius/full` 9999、`radius/sm` 2（分頁底線），畫面和元件上的圓角全部綁變數（2026-10-14 稽核：0 個沒綁）。**畫面上每一個 gap 和 padding 都綁在 Spacing 變數上**（2026-10-14 稽核：0 個沒綁），變數的 code syntax 是 `var(--space-N)`，跟程式引用同一組。元件內部的細部尺寸沒有綁變數，但全部落在 Tailwind 的刻度上（2、4、6、8、12…；2026-10-16 使用者決定元件內的 10 改 8、14 改 12，程式和 Figma 一起改，綁 spacing/2、spacing/3），跟 `tailwind.config.js` 元件裡寫的數字一致。
- **不用麵包屑**（使用者 2026-10-14：「我不要這個」）：Forgot Password、Settings、Account Setup 的麵包屑列已刪，Breadcrumb 元件也刪了。Account Setup（從 Settings 打開）頂列補上 ✕，不然沒有出口。
- **畫面結構：先定左右邊距，再放頂列，然後內容**（2026-10-20，使用者：「每頁都先訂左右的 padding 然後才設定 header then content」）。每張畫面是 `browser top` → **`page`**（垂直 auto-layout，左右綁 `spacing/4`，透明、不裁切）→ `browser bottom`；`page` 裡依序是頂列 instance 和 `page body`。頂列元件（Nav top `4:28`、Auth tabs `72:1452` `72:1465`、Step top bar `55:58`）和 `page body` **都不再帶左右邊距**，所以 ✕／返回和內容對齊在 16。以前頂列自己左右 8、page body 自己 16，✕ 比內容靠左 8。`Action bar` 留在 `page` 外面、滿版；`Sign Up · Account exists` 的 scrim 和 sheet 也在外面。54 張畫面和 📏 Spacing 頁 6 張規格畫面都已改。新畫面照這個結構做
- 每一頁 `page body` 上方都是 spacing/5，頂列到第一個內容一律 20（使用者 2026-10-14 先試 60，再改 40，最後「header 和內容之間拿掉 20」→ 20，全部頁面一起改）；Login／Sign Up 的 `social row` 上方多一個 spacing/5 給「Last used」標籤，圖示之間 spacing/8。
- Setup 是 wireframe 的 Setup Overview（`signup-flow-wireframe.html` 的 B 組）：獎勵進度、三步八項、Step 1 沒有關閉也不能跳過。**網頁版還沒切這一頁。**
- Setup 的子頁（Choose Currency、Personal Information）頂列沒有 ✕：Step 1 不能離開。短頁的按鈕跟在表單後面，不釘底。
- Personal Information 照 `signup-flow-wireframe.html` 畫了姓名、生日、性別三欄；`setup-nine.html` 的文字還多列了「國籍」，兩份不一致，**等使用者決定**。
- 驗證碼錯誤：格子變紅、訊息在格子正下方、按鈕不變色（照 wireframe；v1 是按鈕也變紅，2026-10-13 決定不照）。
- 「帳號已存在」面板裡用六格驗證碼（wireframe 畫的是一個「Enter code ＋ Paste」輸入框），跟驗證碼頁同一個元件。
- Setup Step 2／3 的六項在 `signup-flow-wireframe.html` 沒有畫面，內容取自 `profile-settings-flow-wireframe.html`（Settings 的同名頁），套上 Setup 的外框（獎勵進度、Later）。Notifications 在 Setup 裡只問要不要開（一顆按鈕），細項開關留在 Settings。
- Settings 和 Profile 是照 v1 現有的畫面做的（v1 node：setting `3305:156759`、Security／Change Password `3305:158019`、profile `6588:215736`）。使用者 2026-10-13：「profile 拿現有的框來優化」。Profile 保留 v1 的區塊和順序（身分、餘額弧形、Inbox、Promotions、Statement、Offers、Referral、Refer a Friend、語言、登出），改的是：Promotions 只列三則、Cancel 改成外框小按鈕（黃色留給主按鈕）、Unsettled／Cash Out 改成兩個外框格、齒輪改成「Settings ›」文字、加一列「Finish setting up」、修正拼字（Offees → Offers）。弧形的紫色是 Withdrawable、綠色是 Remaining churn。區塊標題前的圖示和優惠圖還沒放（沒有原檔）。
- 圖像位用虛線框加文字標明要放什麼（教學插圖、QR code），不是成品。
- 還沒畫：Settings 的子頁（Personal Information 三個狀態、Phone／Email／Change Password、Security & Sessions、Bank Account 清單、Notifications、Theme & Language、Product Preferences）；錢包使用者說先不要。可選的項目都沒有畫「已填」狀態，密碼強度（v1 有 password strong 元件）也還沒做。

---

# 已不是來源：V9Bet Mobile Web UI Kit（新視覺版，2026-10-12）

> 下面記的是這個檔案當時的內容。網頁版已經改照 v1，這個檔案沒有跟著改。

對應的網頁是 `login-flow-tailwind.html` 和 `signup-flow-tailwind.html`，兩邊要一起改。兩個網頁共用 `tailwind.config.js`（CDN 頁面直接讀它，不再各自內嵌一份設定）。

## 頁面

| 頁 | id | 內容 |
|---|---|---|
| 🧩 Components | `0:1` | 所有元件 |
| 📱 Screens | `1:2` | Login 四個畫面 ＋ 各自的標籤 |

## 變數與樣式（跟 `variables.css` 同名同值，WEB code syntax 已填 `var(--…)`）

| Collection | id | 內容 |
|---|---|---|
| Primitives | `VariableCollectionId:1:3` | 24 支：`neutral/0…950`、`gold/400…700`、`green/400…600`、`alpha/black-40`、`alpha/white-7|10`、`alpha/ink-7|10`（scopes 是空的，不會出現在選色器） |
| Color | `VariableCollectionId:1:23` | 19 支語意色，**Dark（預設）/ Light**，全部 alias 到 Primitives。含 `glass/fill-strong`、`glass/border` |

**`text/secondary`、`text/muted` 在 Dark 是白色 72% / 55%（中性白灰），不是帶綠的灰。** 使用者 2026-10-13 指出字偏綠。對應 `variables.css` 的 `--color-text-secondary` / `--color-text-muted`。

**`bg/input` 在 Dark 是黑色 40%，不是綠色。** 使用者要求輸入框和分頁底「綠色改成黑色加透明」。它在近黑底上幾乎看不見，所以一定要搭 1px 的 `glass/border`；分頁選中那一側用 `glass/fill-strong`。
| Spacing | `VariableCollectionId:1:41` | `spacing/xs…3xl` = 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 |
| Radius | `VariableCollectionId:1:50` | `radius/sm` 6 · `md` 10 · `lg` 14 · `xl` 20 · `full` 999 |

- Text styles：`Heading/H1`（**Be Vietnam Pro** ExtraBold 26/32，頁面標題用；注意這個字體的樣式名沒有空格——`ExtraBold`、`SemiBold`，Inter 的才是 `Semi Bold`）。其餘是 Inter：`Body/Regular|Medium|Semibold|Bold`（15/23）、`Body Small/Regular|Medium|Semibold`（13/20）、`Caption/Regular`（11/16）、`Micro/Regular`（10/16）
- Effect styles：`Effect/CTA sheen`（按鈕頂緣 1px 內亮線）、`Effect/Tab lift`
- Paint styles：`Gradient/CTA`（gold/400 → gold/500）、`Gradient/Felt spotlight`（logo 後面那塊橢圓綠光）

## 元件

| 元件 | id | Variants / 屬性 |
|---|---|---|
| Button | `36:18` | State = Default / Disabled。TEXT：`Label#36:0`（2026-10-13 變成 component set 時 key 換過，舊的 `Label#3:0` 已失效）。48 高、`radius/xl` |
| Text Field | `3:36` | Type = Text / Password × State = Default / Focus，另有 Text 的 Filled（有輸入值）與 Applied（值帶右側說明，例如邀請碼）。TEXT：`Placeholder#3:1`（也是輸入值；Password 要自己覆寫成「Password」）、`Note#36:3` |
| Segmented Tab | `3:47` | Active = First / Second。TEXT：`First label#3:6`、`Second label#3:9` |
| Checkbox Row | `3:56` | State = On / Off。TEXT：`Label#3:12`。標籤會撐滿並換行；instance 要設 FILL 寬。標籤裡的連結（Terms 等）是在 instance 的文字上用 `setRange*` 加粗加底線 |
| Social Button | `3:91` | Provider = Google / LINE / Zalo × LastUsed = No / Yes |
| Divider Label | `3:92` | TEXT：`Label#3:15` |
| Auth Link | `33:17` | 主按鈕下方「Don't have an account? **Sign up**」那一行。TEXT：`Prompt#33:0`、`Action#33:1` |
| Icon Button / Close | `3:105` | 44 × 44 |
| Logo / V9BET lockup | `3:108` | 120 × 40，圖檔是 `assets/logo/v9bet-lockup-flat.png` |
| icon/close · eye · check · google | `3:4` `3:8` `3:11` `3:17` | |

每個元件的 `description` 寫了使用者當天訂下的規則（選中態用中性色、勾選框不要亮白、社群圖示用官方檔…），改之前先讀。

## 畫面

| 畫面 | id | 尺寸 |
|---|---|---|
| Login · Password · 360 | `4:16` | 360 × 800 |
| Login · One-time code · 360 | `4:77` | 360 × 800 |
| Login · Password · 393 | `4:133` | 393 × 852 |
| Login · One-time code · 393 | `4:194` | 393 × 852 |
| Sign up · Default · 360 | `37:147` | 360 × 800（未勾同意，按鈕 Disabled） |
| Sign up · Ready · 360 | `37:193` | 360 × 800 |
| Sign up · Invite link · 360 | `37:241` | 360 × 800（邀請碼由連結帶入） |
| Sign up · Ready · 393 | `37:293` | 393 × 852 |

Sign Up 的欄位照 `signup-flow-wireframe.html`：只有 email ＋ 選填邀請碼，沒有密碼、Account ID、幣別、Captcha。同意條款的勾選框放在主按鈕正上方。**還沒做**：「帳號已存在」彈窗、email 格式錯誤與邀請碼無效的錯誤狀態。

使用者 2026-10-13 訂下的版面：

- **頁面上不放 logo。** 這些頁是嵌在網站裡的，網站自己的 header 已經有 logo。原本放 logo 的綠光位置改放**頁面標題**（「Login」）。`Logo / V9BET lockup` 元件留在元件庫給網站 header 用，但不要放進這類頁面。
- **頂列只有左邊的 ✕**，沒有標題、沒有「Sign up ｜ Login」切換（放過，被否決）。
- **綠光是一整塊**：從畫面最上緣開始，蓋過 ✕ 那一列和標題。不要讓 ✕ 那一列是黑底、綠光從它下面才開始——那條硬邊被指出來過。
- **Login ↔ Sign Up 的入口**是主按鈕下方的文字連結，照現有線上版 Sign Up 的做法。
- **不預留上下安全區**（mobile web 有瀏覽器自己的列）。

結構：`header`（帶 `Gradient/Felt spotlight`，裡面是 `top bar` 與 `title area`）→ `content`（`upper` 與 `actions` 用 SPACE_BETWEEN 撐開，中間就是吸收剩餘高度的彈性區，CTA 釘在底部）。畫面是 frame，不是 component。每個畫面上方的標籤是從量到的尺寸產生的。

## 圖片怎麼進 Figma

- `use_figma` 不能抓外部圖。用 `upload_assets` 拿上傳網址，`curl --data-binary` 把檔案 POST 上去，圖會直接變成指定節點的 fill。
- **webp 上傳會成功但不會顯示**（Zalo 圖示踩過）。先用 `sips -s format png` 轉成 PNG 再傳。
- 上傳會蓋掉節點原本的 fills；要保留底色（例如 Zalo 底下的白）得事後把 fills 設回 `[底色, 圖片]`。

---

# 舊檔：V9Bet UI Kit（`0stLHADYWKuf32S0e48UX1`）

## 先知道這兩個陷阱（2026-10-12 踩過）

1. **`get_metadata` 不帶 nodeId 只會回 `📕 Cover` 一頁。** 那不代表檔案只有一頁。要列出所有頁面，用 `use_figma` 跑：

   ```js
   return figma.root.children.map(p => ({ id: p.id, name: p.name, n: p.children.length }));
   ```

2. **`search_design_system` 查不到這個檔案自己的元件。** 它只搜已發佈的 library；這裡的元件是 local 的，查「button」「logo」會回空陣列。要盤點本地元件，進 `5:3` 那頁用 `findAllWithCriteria({ types: ['COMPONENT', 'COMPONENT_SET'] })`。

這兩個結果加在一起，曾經讓我對使用者說「Figma 只有一頁封面、沒有元件可重用」，然後在 code 裡從零重刻了一個 Figma 早就有的 Login 畫面。**空結果不是「不存在」的證據。**

---

## 頁面

| 頁 | id | 內容 |
|---|---|---|
| 📕 Cover | `0:1` | 封面 |
| 🎨 Foundations | `5:2` | 一個大 frame `22:2`：Logo、Colour、Type、Spacing、Radius、Layout、Glass、Gradients、Money、What not to do |
| 🧩 Components | `5:3` | 所有元件（見下表） |
| 📱 Screens | `13:2` | 畫面元件 ＋ iOS / Android 裝置框 |

## 變數與樣式（跟 `variables.css` 是同一組值）

| Collection | 數量 | Modes |
|---|---|---|
| Primitives | 43 | Value |
| Color | 38 | **Dark / Light** |
| Spacing | 12 | Value |
| Radius | 6 | Value |
| Type | 22 | Value |

Color 的變數名對應 `variables.css` 的語意層：`bg/app` `bg/surface` `bg/raised` `bg/input` `bg/hover` `bg/felt` · `text/primary|secondary|muted|on-brand|inverse` · `border/subtle|default|strong|focus` · `brand/primary|hover|pressed|subtle` · `brand/secondary|secondary-hover|secondary-subtle` · `status/*` · `money/up|down` · `glass/*`

- Text styles：`Display`、`Heading/H1–H3`、`Body/Large|Base|Strong|Small`、`Caption`、`Numeric/Large|Base`
- Paint styles：`Gradient/Felt`、`Gradient/Brand`、`Gradient/Banner · brand|hot`、`Gradient/App background` 等 13 支
- Effect styles：`Effect/Glass blur`、`Effect/Lift`、`Effect/Halo` 等 6 支

**畫面一律綁變數和樣式，不要寫死色碼或數字。**

## 元件（`🧩 Components`）

| 元件 | id | Variants / 屬性 |
|---|---|---|
| Button | `8:14` | Style = Primary / Secondary / Ghost × State = Default / Disabled |
| Text Field | `9:23` | State = Default / Focus / Filled / Error / Disabled |
| OTP Cell | `9:32` | State = Empty / Focus / Filled / Error |
| Selection Row | `9:45` | Control = Radio / Checkbox × State = Off / On |
| Social Button | `89:23` | Provider = Google / LINE / Zalo × LastUsed = No / Yes |
| Tab Bar | `12:12` | Active = Deposit / Withdrawal（Login 的 One-time code ｜ Password 也是借這顆改字） |
| Badge | `8:21` | Tone = Neutral / Required / Reward |
| Alert | `8:34` | Tone = Info / Success / Warning / Error |
| Checklist Row | `25:26` | State = Todo / Done；TEXT：Number、Title、Sub |
| Payment Method | `12:33` | State = Default / Preferred / Offer / Maintenance；Icon（INSTANCE_SWAP）、Name、Min |
| Promo Banner | `32:29` | Tone = Brand / Hot |
| List Row | `9:46` | 單一元件 |
| Progress Bar | `9:53` | 單一元件 |
| icon/bank · atm · usdt · qr | `16:4` `16:8` `16:12` `16:18` | 24×24 |

每個元件的 `description` 寫了它的規則（例如 Primary 一頁只有一顆），改之前先讀。

## Logo

- `V9BET` lockup 和 `V9` mark 是**外部 library 的元件**（`remote: true`），不在這個檔案裡。用 key 匯入：
  - V9BET lockup：`4769535312fd09c7efd2494f7ea567c8997ceb61`
  - V9 mark：`3c72669a25d4a337ebe9a11fe7e5f6dfdf1c9406`
- 規則寫在 Foundations 的 Logo 區（`95:29`）：不改色、不加陰影、不描邊；一頁出現一次；lockup 的 BET 是白字，只能放深色底；寬度低於 120dp 用 mark。
- Web 端對應檔：`assets/logo/v9bet-lockup-flat.png`（純金 V9 ＋ 純白 BET）。**不要用 3D 金屬質感那版**，使用者否決過。

## 畫面（`📱 Screens`）

畫面本體是 component，裝置框裡放的是它的 instance——**改畫面要改 component，不要改裝置框裡的 instance。**

| 畫面 component | id | 尺寸 |
|---|---|---|
| Banking · Bonus active | `48:129` | 390 × 1146 |
| Setup · Step 1 | `73:393` | 390 × 949 |
| Login · One-time code | `91:1184` | 360 × 724 |
| Sign Up · Default | `91:1185` | 360 × 724 |

每個畫面各有一組裝置框：iOS（402 × 874，狀態列 62、home indicator 34，用 Apple iOS 27 kit）與 Android（360 × 800，狀態列 52、手勢列 24，用 Material 3 kit）。已掛的 library：Material 3 Design Kit、iOS and iPadOS 26、iOS and iPadOS 27。

---

## Figma ↔ Tailwind 目前不一致的地方（2026-10-12）

這是**舊檔**的 Login 跟 Tailwind 版的差異。使用者的決定是開新檔重做，所以舊檔沒有被修改，下表右欄就是新檔現在的樣子。

| | Figma `Login · One-time code` | `login-flow-tailwind.html`（使用者當天確認過的） |
|---|---|---|
| 頂列 | logo 靠左 ＋ ✕ | 「Sign up ｜ Login」文字 ＋ ✕，logo 置中在下面 |
| 標題 | 「Welcome back」＋ 副標 | **拿掉了**（使用者要求） |
| 社群登入 | 三顆 96 × 52 的文字 pill（G / LINE / Zalo） | 圓形 48、**官方圖示**、間距 32、「Last used」小標 |
| 分頁 | Tab Bar，選中態帶黃 | 中性色 `bg-hover`、圓角跟輸入框一致、字 15px 粗體 |
| 輸入框 | 52 高、有邊框 | 48 高、無邊框純填色 |
| 勾選框 | 黃色填滿 | 中性灰外框（不要綠、不要亮白） |
| 主按鈕 | 56 高、全圓 | 48 高、圓角 20、上淺下深的金色 |
| 底部 | 「New to V9BET? Create an account」 | 沒有（Sign up 在頂列） |
| 綠場 | 340 高的 felt 區塊 | 以 logo 為中心的橢圓聚光（使用者嫌原本太綠） |

社群圖示的來源：LINE 是官方 app icon（`assets/social/line.png`），Zalo 取自 zalo.me 自己的 CDN（`assets/social/zalo.webp`）。**第三方品牌圖示一律找官方檔，不要手畫**——使用者為這個糾正過兩次。
