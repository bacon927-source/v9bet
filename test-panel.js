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

  // [group, [[key, label, page]]] — page null = in Figma, not built yet.
  const CATALOG = [
    ['Login', [
      ['login', 'Password', 'auth'],
      ['login-filled', 'Password · filled', 'auth'],
      ['login-code', 'One-time code', 'auth'],
      ['login-no-record', 'No Last used (first visit)', 'auth'],
      ['login-typing-phone', 'Typing a phone number', 'auth'],
      ['login-typing-email', 'Typing an email', 'auth'],
      ['verify-you', 'Enter code · typing', 'auth'],
      ['verify-you-ready', 'Enter code · all six entered', 'auth'],
      ['verify-you-invalid', 'Enter code · invalid', 'auth'],
      ['verify-you-too-many', 'Enter code · too many resends', 'auth'],
      ['verify-you-resend', 'Enter code · resend available', 'auth'],
      ['login-error-phone', 'Error · phone too short', 'auth'],
      ['login-error-email', 'Error · email', 'auth'],
      ['login-error-id', 'Error · Account ID', 'auth'],
      ['login-error-password', 'Error · wrong password', 'auth'],
      ['after-login', 'Logged in → Lobby', 'auth'],
    ]],
    ['Sign Up', [
      ['signup', 'Default', 'auth'],
      ['signup-ready', 'Ready', 'auth'],
      ['signup-invite', 'From invite link', 'auth'],
      ['signup-error-email', 'Error · email', 'auth'],
      ['verify-email', 'Verify email · in progress', 'auth'],
      ['verify-email-ready', 'Verify email · ready', 'auth'],
      ['verify-email-resend', 'Verify email · resend available', 'auth'],
      ['verify-email-invalid', 'Verify email · invalid code', 'auth'],
      ['verify-email-too-many', 'Verify email · too many resends', 'auth'],
    ]],
    ['Sign Up · existing account', [
      ['signup-exists', 'Account exists (sheet)', 'auth'],
    ]],
    ['Sign Up · social (Google / LINE / Zalo)', [
      ['social-found', 'Match · You already have an account', 'auth'],
      ['social-verify', "Match · Verify it's you", 'auth'],
      ['social-linked', 'Match · Welcome back', 'auth'],
      ['social-new-email', 'New · gave an email → Verify email', 'auth'],
      ['social-new-no-email', 'New · no email → Add your email', 'auth'],
      ['social-add-email-error', 'Add your email · error', 'auth'],
    ]],
    ['Setup', [
      ['arrive', '1 Currency · Account created', 'setup'],
      ['step-1', '1 Currency', 'setup'],
      ['step-2', '2 Account ID', 'setup'],
      ['account-id-error', '2 Account ID · error', 'setup'],
      ['step-3', '3 Personal information', 'setup'],
      ['step-4', '4 Bank account', 'setup'],
      ['bank-picker', '4 Choose bank (sheet)', 'setup'],
      ['bank-filled', '4 Bank account · filled', 'setup'],
      ['usdt', '4 USDT', 'setup'],
      ['step-5', '5 Set a password', 'setup'],
      ['step-6', '6 Security', 'setup'],
      ['security-on', '6 2FA on · phone empty', 'setup'],
      ['security-no-email', '6 2FA on · no email yet', 'setup'],
      ['security-phone', '6 2FA on · phone not verified', 'setup'],
      ['security-code', '6 Phone code (sheet)', 'setup'],
      ['security-code-invalid', '6 Phone code · invalid', 'setup'],
      ['security-done', '6 2FA on · both verified', 'setup'],
      ['step-7', '7 Notifications', 'setup'],
      ['sms-add-phone', '7 SMS → add phone (sheet)', 'setup'],
      ['sms-code', '7 SMS → phone code (sheet)', 'setup'],
      ['step-8', '8 Theme', 'setup'],
      ['welcome', 'Lobby + Welcome popup', 'setup'],
    ]],
    ['Tutorial & App', [
      ['tour', 'New member tour (coach marks)', null],
      ['whats-new', "What's new (coach mark)", null],
    ]],
    ['Forgot Password', [
      ['forgot', 'Choose how', 'auth'],
      ['forgot-phone', 'Enter phone', 'auth'],
      ['forgot-email', 'Enter email', 'auth'],
      ['forgot-phone-error', 'Enter phone · too short', 'auth'],
      ['forgot-code', 'Enter code', 'auth'],
      ['forgot-reset', 'Reset', 'auth'],
      ['forgot-reset-filled', 'New password filled', 'auth'],
      ['forgot-done', 'Done → Log In', 'auth'],
    ]],
    ['Account & Settings', [
      ['account', 'Account', null],
      ['settings', 'Settings', null],
      ['settings-2fa', 'Settings › Two-factor authentication', null],
      ['settings-passkeys', 'Settings › Passkeys', null],
      ['settings-notifications', 'Settings › Notifications', null],
      ['settings-bank', 'Settings › Bank account / USDT', null],
    ]],
    ['Profile', [
      ['profile', 'Profile', null],
    ]],
  ];

  const ICON = '<svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"/></svg>';

  const BUILT = CATALOG.flatMap(([, items]) => items).filter(([, , p]) => p);
  const ALL = CATALOG.flatMap(([, items]) => items).length;

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

    // One dropdown with every screen, grouped as in Figma; ‹ › walk them in
    // order. Screens not built yet are listed but cannot be picked.
    const nav = document.createElement('nav');
    nav.hidden = true;
    nav.setAttribute('aria-label', 'Test panel');
    nav.className = `fixed left-4 ${panelClass} z-[60] w-[min(340px,calc(100vw-32px))] flex flex-col gap-3 p-4 rounded-xl bg-card border border-brand-2 text-body-sm`;
    const btn = 'grid place-items-center h-11 rounded-xl border border-edge text-ink disabled:opacity-40';
    nav.innerHTML = `
      <div>
        <p class="text-body font-semibold text-ink">測試面板 <span class="font-normal text-ink-muted">· 已做 ${BUILT.length} / ${ALL}</span></p>
        <p class="text-ink-secondary">只給看稿用，不是產品的一部分。</p>
      </div>
      <label class="flex flex-col gap-1">
        <span class="text-ink-secondary">跳到畫面</span>
        <span class="relative">
          <select class="tp-select w-full h-11 pl-3 pr-9 appearance-none rounded-xl border border-edge bg-app text-body text-ink">
            ${CATALOG.map(([group, items]) => `<optgroup label="${group}">${items.map(([key, label, p]) =>
              `<option value="${p ? p + '|' + key : ''}" ${p ? '' : 'disabled'}>${label}${p ? '' : '（還沒做）'}</option>`).join('')}</optgroup>`).join('')}
          </select>
          <span class="icon icon-sm icon-chevron-down absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true"></span>
        </span>
      </label>
      <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <button type="button" class="tp-prev ${btn}">‹ 上一個</button>
        <span class="tp-count text-ink-secondary tabular-nums"></span>
        <button type="button" class="tp-next ${btn}">下一個 ›</button>
      </div>
      <button type="button" class="tp-copy ${btn} text-brand-2">複製這一張的連結</button>`;
    document.body.append(open, nav);

    const select = nav.querySelector('.tp-select');
    let current = null;
    const index = () => BUILT.findIndex(([key, , p]) => p === page && key === current);
    const sync = () => {
      const i = index();
      select.value = i < 0 ? '' : `${page}|${current}`;
      nav.querySelector('.tp-count').textContent = i < 0 ? `– / ${BUILT.length}` : `${i + 1} / ${BUILT.length}`;
      nav.querySelector('.tp-prev').disabled = i <= 0;
      nav.querySelector('.tp-next').disabled = i < 0 || i >= BUILT.length - 1;
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

    const toggle = (show) => {
      nav.hidden = !show; open.setAttribute('aria-expanded', String(show)); remember(show);
    };
    open.addEventListener('click', () => toggle(nav.hidden));
    select.addEventListener('change', () => {
      const [p, key] = select.value.split('|');
      if (key) visit(BUILT.find(([k, , pp]) => k === key && pp === p));
    });
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
    return opened;
  }

  window.TestPanel = { init };
})();
