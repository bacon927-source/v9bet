/* Test panel — for reviewing only, not part of the product.
 *
 * One list of every screen in Figma (📱 Screens, in its order), shared by
 * auth-flow-tailwind.html and setup-flow-tailwind.html. Open it on either page
 * and every screen is there: a state on this page opens in place, a state on
 * the other page opens that page at #state. Screens not built as a web page
 * yet are listed greyed out, so the panel always mirrors Figma.
 *
 * A page calls TestPanel.init({ page, handlers, reset }) once its own script
 * has run: handlers maps a state key to a function that puts the page in that
 * state; reset puts the page back to a clean start before each jump.
 */
(function () {
  const AUTH = 'auth-flow-tailwind.html';
  const SETUP = 'setup-flow-tailwind.html';
  const PAGES = { auth: AUTH, setup: SETUP };

  // [tab, [[subgroup, [[key, label, page]]]]] — page null = in Figma, not built yet.
  const CATALOG = [
    ['Login', [
      ['Log in', [
        ['login', 'Password', 'auth'],
        ['login-filled', 'Password · filled', 'auth'],
        ['login-code', 'One-time code', 'auth'],
        ['login-no-record', 'First visit (no Last used)', 'auth'],
        ['login-typing-phone', 'Typing a phone number', 'auth'],
        ['login-typing-email', 'Typing an email', 'auth'],
      ]],
      ['Enter code', [
        ['verify-you', 'Typing', 'auth'],
        ['verify-you-ready', 'All six entered', 'auth'],
        ['verify-you-invalid', 'Invalid', 'auth'],
        ['verify-you-too-many', 'Too many resends', 'auth'],
        ['verify-you-resend', 'Resend available', 'auth'],
      ]],
      ['Errors', [
        ['login-error-phone', 'Phone too short', 'auth'],
        ['login-error-email', 'Email', 'auth'],
        ['login-error-id', 'Account ID', 'auth'],
        ['login-error-password', 'Wrong password', 'auth'],
      ]],
      ['After', [
        ['after-login', 'Logged in → Lobby', 'auth'],
      ]],
    ]],
    ['Sign Up', [
      ['Form', [
        ['signup', 'Default', 'auth'],
        ['signup-ready', 'Ready', 'auth'],
        ['signup-invite', 'From invite link', 'auth'],
        ['signup-error-email', 'Error · email', 'auth'],
      ]],
      ['Verify email', [
        ['verify-email', 'In progress', 'auth'],
        ['verify-email-ready', 'Ready', 'auth'],
        ['verify-email-resend', 'Resend available', 'auth'],
        ['verify-email-invalid', 'Invalid code', 'auth'],
        ['verify-email-too-many', 'Too many resends', 'auth'],
      ]],
      ['Email already registered', [
        ['signup-exists', 'Account exists (sheet)', 'auth'],
      ]],
    ]],
    ['Social', [
      ['Matches an existing account', [
        ['social-found', 'You already have an account', 'auth'],
        ['social-verify', "Verify it's you", 'auth'],
        ['social-linked', 'Welcome back', 'auth'],
      ]],
      ['New member', [
        ['social-new-email', 'Gave an email → Verify email', 'auth'],
        ['social-new-no-email', 'No email → Add your email', 'auth'],
        ['social-add-email-error', 'Add your email · error', 'auth'],
      ]],
    ]],
    ['Setup', [
      ['1 Currency', [
        ['arrive', 'Arriving · Account created', 'setup'],
        ['step-1', 'Currency', 'setup'],
      ]],
      ['2 Account ID', [
        ['step-2', 'Account ID', 'setup'],
        ['account-id-error', 'Error', 'setup'],
      ]],
      ['3 Personal information', [
        ['step-3', 'Personal information', 'setup'],
      ]],
      ['4 Bank account / USDT', [
        ['step-4', 'Bank account', 'setup'],
        ['bank-picker', 'Choose bank (sheet)', 'setup'],
        ['bank-filled', 'Filled', 'setup'],
        ['usdt', 'USDT', 'setup'],
      ]],
      ['5 Password', [
        ['step-5', 'Set a password', 'setup'],
      ]],
      ['6 Security', [
        ['step-6', '2FA off', 'setup'],
        ['security-on', '2FA on · phone empty', 'setup'],
        ['security-no-email', '2FA on · no email yet', 'setup'],
        ['security-phone', 'Phone not verified', 'setup'],
        ['security-code', 'Phone code (sheet)', 'setup'],
        ['security-code-invalid', 'Phone code · invalid', 'setup'],
        ['security-done', 'Both verified', 'setup'],
      ]],
      ['7 Notifications', [
        ['step-7', 'Notifications', 'setup'],
        ['sms-add-phone', 'SMS → add phone (sheet)', 'setup'],
        ['sms-code', 'SMS → phone code (sheet)', 'setup'],
      ]],
      ['8 Theme', [
        ['step-8', 'Theme', 'setup'],
      ]],
      ['After Setup', [
        ['welcome', 'Lobby + Welcome popup', 'setup'],
      ]],
    ]],
    ['Tutorial', [
      ['Coach marks', [
        ['tour', 'New member tour', null],
        ['whats-new', "What's new", null],
      ]],
    ]],
    ['Forgot PW', [
      ['Choose how', [
        ['forgot', 'Email or SMS', 'auth'],
      ]],
      ['Enter email / phone', [
        ['forgot-phone', 'Phone', 'auth'],
        ['forgot-email', 'Email', 'auth'],
        ['forgot-phone-error', 'Phone too short', 'auth'],
      ]],
      ['Enter code', [
        ['forgot-code', "Verify it's you", 'auth'],
      ]],
      ['New password', [
        ['forgot-reset', 'Reset', 'auth'],
        ['forgot-reset-filled', 'Filled', 'auth'],
        ['forgot-done', 'Done → Log In', 'auth'],
      ]],
    ]],
    ['Settings', [
      ['Account & Settings', [
        ['account', 'Account', null],
        ['settings', 'Settings', null],
        ['settings-2fa', 'Two-factor authentication', null],
        ['settings-passkeys', 'Passkeys', null],
        ['settings-notifications', 'Notifications', null],
        ['settings-bank', 'Bank account / USDT', null],
      ]],
    ]],
    ['Profile', [
      ['Profile', [
        ['profile', 'Profile', null],
      ]],
    ]],
  ];
  const itemsOf = (tab) => tab[1].flatMap(([, items]) => items);

  const ICON = '<svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"/></svg>';

  const BUILT = CATALOG.flatMap(itemsOf).filter(([, , p]) => p);
  const ALL = CATALOG.flatMap(itemsOf).length;

  // Whether the panel was open survives a jump to the other page, so Next can
  // walk the whole flow without reopening it.
  const remember = (open) => { try { sessionStorage.setItem('tp-open', open ? '1' : ''); } catch (e) { /* storage blocked */ } };
  const remembered = () => { try { return sessionStorage.getItem('tp-open') === '1'; } catch (e) { return false; } };

  // fallback: the state the page shows when there is no #state, so the panel
  // can say where you are without re-running it.
  function init({ page, handlers, reset, fallback, buttonClass = 'bottom-4', panelClass = 'bottom-20' }) {
    const open = document.createElement('button');
    open.type = 'button';
    open.setAttribute('aria-label', 'Test panel');
    open.setAttribute('aria-expanded', 'false');
    open.className = `fixed left-4 ${buttonClass} z-[60] grid place-items-center size-12 rounded-full bg-card border border-brand-2 text-brand-2`;
    open.innerHTML = ICON;

    // Laid out like a game's test panel: one scrolling list, a green heading per
    // Figma section, its sub-steps in grey, the screens as buttons. The
    // dropdown at the top jumps to a section; ‹ › at the bottom walk every built
    // screen in Figma order, across pages. Screens not built yet are dashed.
    const nav = document.createElement('nav');
    nav.hidden = true;
    nav.setAttribute('aria-label', 'Test panel');
    nav.className = `fixed left-4 top-4 z-[60] w-[min(380px,calc(100vw-32px))] max-h-[calc(100dvh-112px)] overflow-y-auto flex flex-col gap-4 px-4 pt-4 rounded-xl bg-app border border-brand-2 text-body-sm shadow-2xl`;
    const btn = 'grid place-items-center h-11 rounded-xl bg-card border border-edge font-semibold text-ink disabled:opacity-40';
    const chip = 'px-3 py-2 rounded-xl bg-card border border-edge font-semibold text-ink aria-[current=true]:border-brand-2 aria-[current=true]:text-brand-2';
    nav.innerHTML = `
      <div>
        <p class="text-body font-semibold text-ink">測試面板</p>
        <p class="text-ink-secondary">只給看稿用，不是產品的一部分。已做 ${BUILT.length} / ${ALL} 個畫面。</p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="font-semibold text-brand-2">跳到流程</p>
        <span class="relative">
          <select class="tp-section w-full h-11 pl-3 pr-9 appearance-none rounded-xl bg-card border border-edge font-semibold text-ink">
            ${CATALOG.map((t, i) => `<option value="${i}">${t[0]}（${itemsOf(t).length}）</option>`).join('')}
          </select>
          <span class="icon icon-sm icon-chevron-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true"></span>
        </span>
        <p class="tp-where text-ink-secondary"></p>
      </div>
      ${CATALOG.map(([section, subs], i) => `
        <section class="flex flex-col gap-3" data-section="${i}">
          <p class="font-semibold text-brand-2">${section}</p>
          ${subs.map(([sub, items]) => `
            <div class="flex flex-col gap-1.5">
              ${subs.length > 1 ? `<p class="text-micro text-ink-muted">${sub}</p>` : ''}
              <div class="flex flex-wrap gap-2">${items.map(([key, label, p]) => p
                ? `<button type="button" data-state="${key}" data-page="${p}" class="${chip}">${label}</button>`
                : `<span class="px-3 py-2 rounded-xl border border-dashed border-edge-subtle text-ink-muted" title="還沒做成網頁">${label}（還沒做）</span>`).join('')}</div>
            </div>`).join('')}
        </section>`).join('')}
      <div class="sticky bottom-0 -mx-4 mt-auto flex flex-col gap-2 p-4 bg-sheet border-t border-edge">
        <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <button type="button" class="tp-prev ${btn}">‹ 上一個</button>
          <span class="tp-count text-ink-secondary tabular-nums"></span>
          <button type="button" class="tp-next ${btn}">下一個 ›</button>
        </div>
        <button type="button" class="tp-copy ${btn} text-brand-2">複製這一張的連結</button>
      </div>`;
    document.body.append(open, nav);

    let current = null;
    const index = () => BUILT.findIndex(([key, , p]) => p === page && key === current);
    const sectionOf = (key) => CATALOG.findIndex((t) => itemsOf(t).some(([k, , p]) => p === page && k === key));
    const scrollTo = (i) => { nav.scrollTop = nav.querySelector(`[data-section="${i}"]`).offsetTop - 16; };
    const sync = () => {
      const i = index();
      nav.querySelector('.tp-count').textContent = i < 0 ? `– / ${BUILT.length}` : `${i + 1} / ${BUILT.length}`;
      nav.querySelector('.tp-prev').disabled = i <= 0;
      nav.querySelector('.tp-next').disabled = i < 0 || i >= BUILT.length - 1;
      nav.querySelectorAll('[data-state]').forEach((b) => b.setAttribute('aria-current', String(b.dataset.page === page && b.dataset.state === current)));
      const g = sectionOf(current);
      if (g >= 0) {
        nav.querySelector('.tp-section').value = String(g);
        const [section, subs] = CATALOG[g];
        const sub = subs.find(([, items]) => items.some(([k, , p]) => p === page && k === current));
        const item = itemsOf(CATALOG[g]).find(([k, , p]) => p === page && k === current);
        nav.querySelector('.tp-where').textContent = `目前：${section} › ${subs.length > 1 ? sub[0] + ' › ' : ''}${item[1]}`;
      }
    };
    const go = (key) => {
      if (!handlers[key]) return false;
      reset(); handlers[key](); current = key; sync();
      return true;
    };
    // A screen on this page opens in place; one on the other page opens that page.
    const visit = ([key, , p]) => {
      if (p === page) { if (location.hash.slice(1) === key) go(key); else location.hash = key; }
      else location.href = `${PAGES[p]}#${key}`;
    };

    nav.querySelector('.tp-section').addEventListener('change', (e) => scrollTo(Number(e.target.value)));
    nav.addEventListener('click', (e) => {
      const s = e.target.closest('[data-state]');
      if (s) visit(BUILT.find(([k, , p]) => k === s.dataset.state && p === s.dataset.page));
    });
    const toggle = (show) => {
      nav.hidden = !show; open.setAttribute('aria-expanded', String(show)); remember(show);
    };
    open.addEventListener('click', () => { toggle(nav.hidden); const g = sectionOf(current); if (!nav.hidden && g >= 0) scrollTo(g); });
    nav.querySelector('.tp-prev').addEventListener('click', () => { const i = index(); if (i > 0) visit(BUILT[i - 1]); });
    nav.querySelector('.tp-next').addEventListener('click', () => { const i = index(); if (i >= 0 && i < BUILT.length - 1) visit(BUILT[i + 1]); });
    nav.querySelector('.tp-copy').addEventListener('click', (e) => {
      const b = e.currentTarget;
      const done = (text) => { b.textContent = text; setTimeout(() => { b.textContent = '複製這一張的連結'; }, 1500); };
      navigator.clipboard.writeText(location.href).then(() => done('已複製'), () => done('複製失敗，請從網址列複製'));
    });
    window.addEventListener('hashchange', () => go(location.hash.slice(1)));

    if (remembered()) toggle(true);
    const opened = go(location.hash.slice(1));
    if (!opened) current = fallback || null;
    sync();
    if (!nav.hidden && sectionOf(current) >= 0) scrollTo(sectionOf(current));
    return opened;
  }

  window.TestPanel = { init };
})();
