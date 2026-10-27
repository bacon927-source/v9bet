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

  function init({ page, handlers, reset, buttonClass = 'bottom-4', panelClass = 'bottom-20 max-h-[75dvh]' }) {
    const open = document.createElement('button');
    open.type = 'button';
    open.setAttribute('aria-label', 'Test panel');
    open.setAttribute('aria-expanded', 'false');
    open.className = `fixed left-4 ${buttonClass} z-[60] grid place-items-center size-12 rounded-full bg-card border border-brand-2 text-brand-2`;
    open.innerHTML = ICON;

    const nav = document.createElement('nav');
    nav.hidden = true;
    nav.setAttribute('aria-label', 'Test panel');
    nav.className = `fixed left-4 ${panelClass} z-[60] w-[min(340px,calc(100vw-32px))] overflow-y-auto flex flex-col gap-4 px-4 pb-4 rounded-xl bg-card border border-brand-2 text-body-sm`;
    const built = CATALOG.flatMap(([, items]) => items).filter(([, , p]) => p).length;
    const all = CATALOG.flatMap(([, items]) => items).length;
    // The group index stays pinned at the top, so a flow far down the list
    // (Setup, Forgot Password …) is one tap away instead of a long scroll.
    nav.innerHTML = `
      <div class="sticky top-0 z-10 -mx-4 px-4 pt-4 pb-3 flex flex-col gap-2 bg-card border-b border-edge-subtle">
        <p class="text-body font-semibold text-ink">測試面板 <span class="font-normal text-ink-muted">· 已做 ${built} / ${all}</span></p>
        <p class="text-ink-secondary">只給看稿用，不是產品的一部分。照 Figma 的順序列出全部畫面，點一下直接跳過去。灰色的是 Figma 有、還沒做成網頁的。</p>
        <div class="flex flex-wrap gap-1.5">${CATALOG.map(([group], i) =>
          `<button type="button" data-group="${i}" class="px-2.5 py-1 rounded-full bg-[var(--v1-grey-500)] text-ink">${group.split(' (')[0]} <span class="text-ink-secondary">${CATALOG[i][1].length}</span></button>`).join('')}</div>
      </div>
      ${CATALOG.map(([group, items], i) => `
        <div class="flex flex-col gap-2" id="tp-group-${i}">
          <p class="font-semibold text-brand-2">${group}</p>
          <div class="flex flex-wrap gap-2">${items.map(([key, label, p]) => p
            ? `<a href="${p === page ? '' : PAGES[p]}#${key}" data-state="${key}" data-page="${p}" class="px-3 py-2 rounded-xl border border-edge text-ink aria-[current=true]:border-brand-2 aria-[current=true]:text-brand-2">${label}</a>`
            : `<span class="px-3 py-2 rounded-xl border border-dashed border-edge-subtle text-ink-muted" title="還沒做成網頁">${label}</span>`).join('')}</div>
        </div>`).join('')}`;

    document.body.append(open, nav);

    const mark = (key) => nav.querySelectorAll('[data-state]').forEach((a) => a.setAttribute('aria-current', String(a.dataset.state === key)));
    const go = (key) => {
      if (!handlers[key]) return false;
      reset(); handlers[key](); mark(key);
      return true;
    };

    open.addEventListener('click', () => {
      nav.hidden = !nav.hidden;
      open.setAttribute('aria-expanded', String(!nav.hidden));
      // Keep the current screen in view in a long list.
      if (!nav.hidden) { const cur = nav.querySelector('[aria-current="true"]'); if (cur) cur.scrollIntoView({ block: 'nearest' }); }
    });
    // Clicking the state already in the hash fires no hashchange, so go on click too.
    nav.addEventListener('click', (e) => {
      const g = e.target.closest('[data-group]');
      // Land the group's title just under the pinned index, whatever height the index wraps to.
      if (g) { nav.scrollTop = nav.querySelector('#tp-group-' + g.dataset.group).offsetTop - nav.firstElementChild.offsetHeight - 16; return; }
      const a = e.target.closest('[data-state]');
      if (a && a.dataset.page === page) go(a.dataset.state);
    });
    window.addEventListener('hashchange', () => go(location.hash.slice(1)));
    return go(location.hash.slice(1));
  }

  window.TestPanel = { init };
})();
