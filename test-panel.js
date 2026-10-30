/* Test panel — for reviewing only, not part of the product.
 *
 * One list of every screen in Figma (📱 Screens, in its order), shared by
 * auth-flow-tailwind.html, setup-flow-tailwind.html and settings-tailwind.html. Open it on any page
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
  const SETTINGS = 'settings-tailwind.html';
  const PAGES = { auth: AUTH, setup: SETUP, settings: SETTINGS };

  // Roles (2026-10-30): each starts where that member starts — Log In or Sign Up —
  // and the flow carries on into that member's Setup (setup-flow #as-…).
  const ROLES = [['existing', 'Existing'], ['google', 'New · Google'], ['line', 'New · LINE'], ['zalo', 'New · Zalo'], ['email', 'New · Email'], ['phone', 'New · Phone']];
  const setRole = (k) => { try { if (k) sessionStorage.setItem('tp-role', k); else sessionStorage.removeItem('tp-role'); } catch (e) { /* this jump only */ } };
  // [tab, [[subgroup, [[key, label, page]]]]] — page null = in Figma, not built yet.
  const CATALOG = [
    ['Login', [
      ['Log in', [
        ['login', 'Password', 'auth'],
        ['login-filled', 'Password · filled', 'auth'],
        ['login-code', 'One-time code', 'auth'],
        ['login-no-record', 'First visit (no Last used)', 'auth'],
        ['login-typing-phone', 'One-time code · typing a phone number', 'auth'],
        ['login-typing-email', 'One-time code · typing an email', 'auth'],
      ]],
      ['Enter code', [
        ['verify-you', 'Typing', 'auth'],
        ['verify-you-ready', 'All six entered', 'auth'],
        ['verify-you-invalid', 'Invalid', 'auth'],
        ['verify-you-too-many', 'Too many resends', 'auth'],
        ['verify-you-resend', 'Resend available', 'auth'],
      ]],
      ['Errors', [
        ['login-error-phone', 'One-time code · phone too short', 'auth'],
        ['login-error-email', 'One-time code · email', 'auth'],
        ['login-error-pwd-email', 'Password · email', 'auth'],
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
        ['signup-typing-phone', 'Typing a phone number', 'auth'],
        ['signup-invite', 'From invite link', 'auth'],
        ['signup-error-phone', 'Phone too short', 'auth'],
        ['signup-error-email', 'Error · email', 'auth'],
      ]],
      ['Verify email', [
        ['verify-email', 'In progress', 'auth'],
        ['verify-email-ready', 'Ready', 'auth'],
        ['verify-email-resend', 'Resend available', 'auth'],
        ['verify-email-invalid', 'Invalid code', 'auth'],
        ['verify-email-too-many', 'Too many resends', 'auth'],
      ]],
      ['Terms & Privacy', [
        ['signup-terms', 'Terms of Service (sheet)', 'auth'],
        ['signup-privacy', 'Privacy Policy (sheet)', 'auth'],
      ]],
      ['Email already registered', [
        ['signup-exists', 'Account exists (sheet)', 'auth'],
      ]],
    ]],
    ['Social', [
      ['Matches an existing account', [
        ['social-linked', 'Welcome back', 'auth'],
      ]],
      ['New member', [
        ['social-new-email', 'Gave an email → Verify email', 'auth'],
        ['social-new-no-email', 'No email → Add your email', 'auth'],
        ['social-add-email-error', 'Add your email · error', 'auth'],
      ]],
    ]],
    ['Setup', [
      ['Who is arriving', [
        ['as-existing', 'Existing · currency + Account ID → 4 steps', 'setup'],
        ['as-existing-more', 'Existing · + personal info + bank → 2 steps', 'setup'],
        ['as-google', 'New · Google', 'setup'],
        ['as-line', 'New · LINE', 'setup'],
        ['as-zalo', 'New · Zalo (no email)', 'setup'],
        ['as-email', 'New · Email', 'setup'],
        ['as-phone', 'New · Phone (one-time code)', 'setup'],
      ]],
      ['1 Currency', [
        ['arrive', 'Before Setup · new member', 'setup'],
        ['intro-existing', 'Before Setup · existing member', 'setup'],
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
      ['5 Notifications', [
        ['step-7', 'Notifications', 'setup'],
        ['sms-add-phone', 'SMS → add phone (sheet)', 'setup'],
        ['sms-code', 'SMS → phone code (sheet)', 'setup'],
        ['channel-line', 'LINE linked', 'setup'],
      ]],
      ['6 Display', [
        ['step-8', 'Display', 'setup'],
        ['display-large', 'Large text', 'setup'],
      ]],
      ['After Setup', [
        ['welcome', 'Welcome to V9Bet (new members)', 'setup'],
        ['lobby', 'Lobby', 'setup'],
      ]],
    ]],
    ['Tutorial', [
      ['Coach marks', [
        ['tour', 'New member tour', null],
        ['whats-new', "What's new", null],
      ]],
    ]],
    ['Settings', [
      ['First page (groups only, the iPhone way)', [
        ['settings-home', 'Settings', 'settings'],
        ['settings-gaps', 'Settings · things not done yet', 'settings'],
      ]],
      ['One page down', [
        ['settings-account', 'Account', 'settings'],
        ['settings-account-gaps', 'Account · not added yet', 'settings'],
        ['settings-security', 'Sign-in & Security', 'settings'],
        ['settings-notifications', 'Notifications', 'settings'],
        ['settings-display', 'Display', 'settings'],
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

  /* ── Spacing overlay ──
   * Paints the page's spacing over it, the way the Figma 📏 Spacing page does:
   * pink bands for gaps and paddings with the px value and the Tailwind
   * spacing token (16 · spacing/4), blue tags for the sizes of the main
   * components. It is measured from the live page, so it is always the real
   * spacing, and it redraws whenever the screen changes. */
  const SPACING_PADDED = {
    'page-body': 'header → content',
    'social-row': 'room for the "Last used" tag',
    'divider-label': 'divider top / bottom',
    'divider': 'divider top / bottom',
    'sheet-body': 'sheet padding',
    'action-bar': 'action bar padding',
  };
  const SIZES = [
    ['.nav-top', 'Header', 'h'],
    ['.btn', 'Button', 'h'],
    ['.field > input', 'Field box', 'h'],
    ['[role="tablist"].w-60', 'Segmented control', 'wh'],
    ['.otp > input', 'Code cell', 'wh'],
    ['.option-card', 'Option card', 'h'],
    ['.list-row', 'List row', 'h'],
    ['.social-btn-icon', 'Social icon', 'wh'],
    ['.tab', 'Tab', 'h'],
    ['.checkbox', 'Checkbox', 'wh'],
    ['.tick', 'Radio', 'wh'],
    ['.link-row', 'Link row', 'h'],
  ];
  // Corner radius as the Tailwind class it is.
  const RADIUS = { 4: 'rounded 4', 6: 'rounded-md 6', 8: 'rounded-lg 8', 12: 'rounded-xl 12', 16: 'rounded-2xl 16' };
  const radiusOf = (el, b) => {
    const r = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
    if (!r) return '';
    if (r >= Math.min(b.w, b.h) / 2 - 0.5) return 'rounded-full';
    return RADIUS[r] || `radius ${r}`;
  };
  // Typography is Tailwind's scale, so a label names the Tailwind class: the
  // size's own class, plus /n when the line height is not its default.
  const TW_SIZE = { 12: ['xs', 16], 14: ['sm', 20], 16: ['base', 24], 18: ['lg', 28], 20: ['xl', 28], 24: ['2xl', 32], 30: ['3xl', 36], 36: ['4xl', 40] };
  const WEIGHT = { 300: 'Light', 400: 'Regular', 500: 'Medium', 600: 'Semibold', 700: 'Bold' };
  const typeToken = (fs, lh) => {
    const size = TW_SIZE[fs];
    if (!size) return 'not on the scale';
    if (lh === size[1]) return `text-${size[0]}`;
    return lh % 4 === 0 ? `text-${size[0]}/${lh / 4}` : 'not on the scale';
  };
  const token = (px) => (px % 4 === 0 ? `${px} · spacing/${px / 4}` : `${px}px · off the scale`);
  const shown = (el) => el.offsetParent !== null || getComputedStyle(el).position === 'fixed';
  // Two inks, kept light so the screen still reads through: pink for spacing,
  // blue for sizes. Labels are small dark pills; bands are a faint wash edged
  // with a dashed line, so you see exactly where a gap starts and ends.
  const INK = {
    pink: { text: '#f9a8d4', edge: 'rgba(236,72,153,.75)', wash: 'rgba(236,72,153,.12)' },
    blue: { text: '#93c5fd', edge: 'rgba(96,165,250,.85)' },
    amber: { text: '#fcd34d', edge: 'rgba(251,191,36,.8)' },
  };
  let layer = null;
  let placed = [];
  // Put a label at (x, y) — y is its middle; align 'right' means x is its right
  // edge. If that covers another label, try the other end of the band (alt is
  // its left edge), then step down below the clash — never off the screen.
  const tag = (x, y, text, ink, align = 'left', alt = null, dir = 'down') => {
    const t = document.createElement('span');
    t.textContent = text;
    t.style.cssText = `position:absolute;left:0;top:0;padding:0 6px;border-radius:999px;background:rgba(14,15,18,.86);border:1px solid ${INK[ink].edge};color:${INK[ink].text};font:600 10px/15px system-ui,-apple-system,sans-serif;letter-spacing:.01em;white-space:nowrap;`;
    layer.append(t);
    const w = t.offsetWidth, h = t.offsetHeight;
    const clash = (l, tp) => placed.find((r) => l < r.x2 + 3 && l + w > r.x1 - 3 && tp < r.y2 + 1 && tp + h > r.y1 - 1);
    let left = Math.max(0, align === 'right' ? x - w : x);
    let top = y - h / 2;
    if (clash(left, top) && alt !== null && !clash(alt, top)) left = alt;
    for (let n = 0; n < 6 && clash(left, top); n += 1) top = dir === 'up' ? clash(left, top).y1 - h - 2 : clash(left, top).y2 + 2;
    t.style.left = `${left}px`; t.style.top = `${top}px`;
    placed.push({ x1: left, x2: left + w, y1: top, y2: top + h });
    return t;
  };
  const band = (x, y, w, h, text, edges = 'tb') => {
    if (w < 1 || h < 1) return;
    const b = document.createElement('div');
    const dash = `1px dashed ${INK.pink.edge}`;
    b.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:${INK.pink.wash};box-sizing:border-box;`
      + (edges.includes('t') ? `border-top:${dash};` : '') + (edges.includes('b') ? `border-bottom:${dash};` : '')
      + (edges.includes('l') ? `border-left:${dash};` : '') + (edges.includes('r') ? `border-right:${dash};` : '');
    layer.append(b);
    if (text) tag(x + w - 6, y + h / 2, text, 'pink', 'right', x + 6);
  };
  const drawSpacing = (root, opts = { spacing: true, type: false }) => {
    if (layer) layer.remove();
    placed = [];
    layer = document.createElement('div');
    layer.setAttribute('aria-hidden', 'true');
    layer.dataset.tpLayer = '1';
    layer.style.cssText = 'position:absolute;left:0;top:0;width:100%;pointer-events:none;z-index:55;';
    document.body.append(layer);
    const sx = window.scrollX, sy = window.scrollY;
    const box = (el) => { const r = el.getBoundingClientRect(); return { x: r.left + sx, y: r.top + sy, w: r.width, h: r.height }; };

    // Typography: every piece of text gets size / line height · weight · token.
    if (opts.type) {
      // Only text a person can see: not the hidden copy of a field label in its
      // outline, not anything invisible or faded out.
      const visible = (el) => { const cs = getComputedStyle(el); return cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0; };
      const texts = [...root.querySelectorAll('*')].filter((el) => !el.closest('[aria-label="Test panel"], [data-tp-layer], script, style, select, .field > fieldset, [aria-hidden="true"]')
        && shown(el) && visible(el) && ([...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
          || (el.tagName === 'INPUT' && el.value && /^(text|email|tel|password|search|number)$/.test(el.type))));
      const edge = (root.querySelector('.page') || document.body).getBoundingClientRect().right + sx - 4;
      const measure = document.createElement('canvas').getContext('2d');
      // Where each piece of text sits — only the element's own words, not a
      // child's (an option card's sub line has its own label).
      const rectOf = (el) => {
        if (el.tagName === 'INPUT') return el.getBoundingClientRect();
        const own = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim());
        const range = document.createRange();
        range.setStart(own[0], 0); range.setEnd(own[own.length - 1], own[own.length - 1].length);
        return range.getBoundingClientRect();
      };
      const items = texts.map((el) => ({ el, r: rectOf(el) })).filter(({ r }) => r.width && r.height);
      // The words themselves are obstacles too, so no label lands on text.
      // (A field's box is not one: its own label goes inside it.)
      items.forEach(({ el, r }) => { if (el.tagName !== 'INPUT') placed.push({ x1: r.left + sx, x2: r.right + sx, y1: r.top + sy, y2: r.bottom + sy }); });
      items.forEach(({ el, r }) => {
        const cs = getComputedStyle(el);
        const fs = parseFloat(cs.fontSize), lh = cs.lineHeight === 'normal' ? Math.round(fs * 1.2) : parseFloat(cs.lineHeight);
        // Weight only when it is not Regular, to keep the label short.
        const weight = WEIGHT[cs.fontWeight] || cs.fontWeight;
        const text = `${fs}/${lh}${weight === 'Regular' ? '' : ' ' + weight} · ${typeToken(fs, lh)}`;
        measure.font = '600 10px system-ui, -apple-system, sans-serif';
        const width = measure.measureText(text).width + 16;
        // Just after the words when there is room; otherwise just above them,
        // starting where they start.
        const right = r.right + sx, mid = r.top + sy + r.height / 2;
        if (el.tagName === 'INPUT') tag(el.getBoundingClientRect().right + sx - 6, mid, text, 'amber', 'right');
        else if (right + 6 + width < edge) tag(right + 6, mid, text, 'amber');
        else tag(r.left + sx, r.top + sy - 8, text, 'amber', 'left', null, 'up');
      });
    }
    if (!opts.spacing) return;

    // Sizes first, so the spacing labels slide out of their way.
    SIZES.forEach(([sel, name, dims]) => {
      const el = [...root.querySelectorAll(sel)].find((e) => shown(e) && !e.closest('[aria-label="Test panel"]'));
      if (!el) return;
      const b = box(el);
      const o = document.createElement('div');
      o.style.cssText = `position:absolute;left:${b.x}px;top:${b.y}px;width:${b.w}px;height:${b.h}px;outline:1px dashed ${INK.blue.edge};outline-offset:-1px;`;
      layer.append(o);
      const rad = radiusOf(el, b);
      const text = `${name} ${dims === 'wh' ? Math.round(b.w) + ' × ' : ''}${Math.round(b.h)}${rad ? ' · ' + rad : ''}`;
      // Inside the right edge of wide components; beside small ones so it stays on screen.
      if (b.w >= 160) tag(b.x + b.w - 6, b.y + b.h / 2, text, 'blue', 'right', b.x + 6);
      else tag(b.x + b.w + 4, b.y + b.h / 2, text, 'blue');
    });

    // The page frame: 16 left and right, labelled down the left band.
    const page = root.querySelector('.page');
    if (page) {
      const p = box(page), pad = parseFloat(getComputedStyle(page).paddingLeft);
      band(p.x, p.y, pad, p.h, '', 'r');
      band(p.x + p.w - pad, p.y, pad, p.h, '', 'l');
      const t = tag(p.x, p.y + p.h * 0.62, `${token(pad)} · left / right`, 'pink');
      Object.assign(t.style, { writingMode: 'vertical-rl', padding: '6px 0', width: `${pad}px`, left: `${p.x}px`, textAlign: 'center', boxSizing: 'border-box' });
    }
    root.querySelectorAll('*').forEach((el) => {
      if (el.closest('[aria-label="Test panel"]') || el.closest('[data-tp-layer]') || !shown(el)) return;
      const cs = getComputedStyle(el);
      // Paddings that are part of the layout rules.
      const named = Object.keys(SPACING_PADDED).find((c) => el.classList.contains(c));
      if (named) {
        const b = box(el), top = parseFloat(cs.paddingTop), bottom = parseFloat(cs.paddingBottom);
        const divider = named === 'divider-label' || named === 'divider';
        if (top >= 4) band(b.x, b.y, b.w, top, `${token(top)} · ${SPACING_PADDED[named]}`);
        if (bottom >= 4 && named !== 'page-body') band(b.x, b.y + b.h - bottom, b.w, bottom, divider ? token(bottom) : `${token(bottom)} · ${SPACING_PADDED[named]}`);
      }
      // Gaps between stacked blocks.
      if ((cs.display === 'flex' && cs.flexDirection === 'column') || cs.display === 'grid') {
        const gap = parseFloat(cs.rowGap);
        if (!gap || gap < 4) return;
        const kids = [...el.children].filter((k) => shown(k) && k.getBoundingClientRect().height > 0);
        const b = box(el);
        if (b.w < 120) return;
        const what = el.classList.contains('page-body') ? 'between sections' : 'inside';
        for (let i = 0; i < kids.length - 1; i += 1) {
          const a = box(kids[i]), c = box(kids[i + 1]);
          if (c.y - (a.y + a.h) < 2) continue; // same row in a grid
          band(b.x, a.y + a.h, b.w, c.y - (a.y + a.h), i === 0 ? `${token(gap)} · ${what}` : token(gap));
        }
      }
    });
  };
  const clearSpacing = () => { if (layer) { layer.remove(); layer = null; } };
  const spacingOn = () => { try { return sessionStorage.getItem('tp-spacing') === '1'; } catch (e) { return false; } };
  const setSpacingOn = (on) => { try { sessionStorage.setItem('tp-spacing', on ? '1' : ''); } catch (e) { /* storage blocked */ } };
  const typeOn = () => { try { return sessionStorage.getItem('tp-type') === '1'; } catch (e) { return false; } };
  const setTypeOn = (on) => { try { sessionStorage.setItem('tp-type', on ? '1' : ''); } catch (e) { /* storage blocked */ } };


  // fallback: the state the page shows when there is no #state, so the panel
  // can say where you are without re-running it.
  function init({ page, handlers, reset, fallback, buttonClass = 'bottom-4', panelClass = 'bottom-20' }) {
    const open = document.createElement('button');
    open.type = 'button';
    open.setAttribute('aria-label', 'Test panel');
    open.setAttribute('aria-expanded', 'false');
    // Above the panel, so a long panel can never cover the button that closes it.
    open.className = `fixed left-4 ${buttonClass} z-[61] grid place-items-center size-12 rounded-full bg-card border border-brand-2 text-brand-2`;
    open.innerHTML = ICON;

    // Laid out like a game's test panel: one scrolling list, a green heading per
    // Figma section, its sub-steps in grey, the screens as buttons. The
    // dropdown at the top jumps to a section; ‹ › at the bottom walk every built
    // screen in Figma order, across pages. Screens not built yet are dashed.
    const nav = document.createElement('nav');
    nav.hidden = true;
    nav.setAttribute('aria-label', 'Test panel');
    nav.className = `fixed left-4 top-4 z-[60] w-[min(380px,calc(100vw-32px))] max-h-[calc(100dvh-112px)] overflow-y-auto flex flex-col gap-3 px-3 pt-3 rounded-xl bg-app border border-brand-2 text-xs/5 shadow-2xl`;
    const btn = 'grid place-items-center h-9 px-2.5 rounded-lg bg-card border border-edge font-semibold text-ink disabled:opacity-40';
    const chip = 'inline-flex items-center min-h-9 px-2.5 rounded-lg bg-card border border-edge font-semibold text-ink aria-[current=true]:border-brand-2 aria-[current=true]:text-brand-2';
    nav.innerHTML = `
      <div class="flex items-start gap-2">
        <div class="flex-1">
          <p class="text-sm/6 font-semibold text-ink">Test panel</p>
          <p class="text-ink-secondary">For review only, not part of the product. ${BUILT.length} of ${ALL} screens built.</p>
        </div>
        <button type="button" class="tp-close grid place-items-center size-11 -mr-2 -mt-2 text-ink" aria-label="Close test panel"><span class="icon icon-close" aria-hidden="true"></span></button>
      </div>
      <div class="flex items-center justify-between gap-3">
        <span class="font-semibold text-ink">Theme</span>
        <div class="flex h-8 p-0.5 rounded-full bg-card border border-edge" role="radiogroup" aria-label="Theme">${[['system', 'System'], ['light', 'Light'], ['dark', 'Dark']].map(([v, l]) =>
          `<button type="button" role="radio" data-theme-choice="${v}" aria-checked="false" class="px-3 rounded-full transition text-ink-secondary aria-checked:bg-selected aria-checked:text-ink aria-checked:font-semibold">${l}</button>`).join('')}</div>
      </div>
      <div class="flex items-center justify-between gap-3">
        <span class="font-semibold text-ink">Text size</span>
        <div class="flex h-8 p-0.5 rounded-full bg-card border border-edge" role="radiogroup" aria-label="Text size">${[['default', 'Default'], ['large', 'Large']].map(([v, l]) =>
          `<button type="button" role="radio" data-size-choice="${v}" aria-checked="false" class="px-3 rounded-full transition text-ink-secondary aria-checked:bg-selected aria-checked:text-ink aria-checked:font-semibold">${l}</button>`).join('')}</div>
      </div>
      <div class="flex flex-col gap-2">
        <p class="font-semibold text-ink">Roles <span class="font-normal text-ink-secondary">— start where this member starts</span></p>
        <div class="flex flex-wrap gap-2">${ROLES.map(([k, l]) => `<button type="button" data-role="${k}" class="${chip}">${l}</button>`).join('')}</div>
      </div>
      <label class="flex items-center justify-between gap-3 h-9 px-3 rounded-lg bg-card border border-edge cursor-pointer">
        <span class="font-semibold text-ink">Show spacing</span>
        <input type="checkbox" role="switch" class="tp-spacing sr-only"><span class="toggle"></span>
      </label>
      <label class="flex items-center justify-between gap-3 h-9 px-3 rounded-lg bg-card border border-edge cursor-pointer">
        <span class="font-semibold text-ink">Show typography</span>
        <input type="checkbox" role="switch" class="tp-type sr-only"><span class="toggle"></span>
      </label>
      <div class="flex flex-col gap-2">
        <p class="font-semibold text-brand-2">Jump to flow</p>
        <span class="relative">
          <select class="tp-section w-full h-9 pl-3 pr-9 appearance-none rounded-lg bg-card border border-edge font-semibold text-ink">
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
              ${subs.length > 1 ? `<p class="text-xs/5 text-ink-muted">${sub}</p>` : ''}
              <div class="flex flex-wrap gap-2">${items.map(([key, label, p]) => p
                ? `<button type="button" data-state="${key}" data-page="${p}" class="${chip}">${label}</button>`
                : `<span class="px-3 py-2 rounded-xl border border-dashed border-edge-subtle text-ink-muted" title="Not built as a web page yet">${label} (not built)</span>`).join('')}</div>
            </div>`).join('')}
        </section>`).join('')}
      <div class="sticky bottom-0 -mx-3 mt-auto grid grid-cols-[1fr_auto_1fr_auto] items-center gap-2 p-3 bg-sheet border-t border-edge">
        <button type="button" class="tp-prev ${btn}">‹ Prev</button>
        <span class="tp-count text-ink-secondary tabular-nums"></span>
        <button type="button" class="tp-next ${btn}">Next ›</button>
        <button type="button" class="tp-copy ${btn} text-brand-2">Copy link</button>
      </div>`;
    // The panel is a review tool, not the product: it keeps its size when the page
    // is set to Large text (zoom undoes the 112.5% root).
    const keep = document.createElement('style');
    keep.textContent = ':root[data-text-size="large"] nav[aria-label="Test panel"], :root[data-text-size="large"] .tp-open { zoom: 0.8889; }';
    open.classList.add('tp-open');
    document.head.append(keep);
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
      let role = null; try { role = sessionStorage.getItem('tp-role'); } catch (e) { /* none */ }
      nav.querySelectorAll('[data-role]').forEach((b) => b.setAttribute('aria-current', String(b.dataset.role === role)));
      const g = sectionOf(current);
      if (g >= 0) {
        nav.querySelector('.tp-section').value = String(g);
        const [section, subs] = CATALOG[g];
        const sub = subs.find(([, items]) => items.some(([k, , p]) => p === page && k === current));
        const item = itemsOf(CATALOG[g]).find(([k, , p]) => p === page && k === current);
        nav.querySelector('.tp-where').textContent = `Now: ${section} › ${subs.length > 1 ? sub[0] + ' › ' : ''}${item[1]}`;
      }
    };
    const go = (key) => {
      if (!handlers[key]) return false;
      reset(); handlers[key](); current = key; sync(); redraw();
      return true;
    };
    // A screen on this page opens in place; one on the other page opens that page.
    const visit = ([key, , p]) => {
      setRole(null); // a single screen, not a role's journey
      if (p === page) { if (location.hash.slice(1) === key) go(key); else location.hash = key; }
      else location.href = `${PAGES[p]}#${key}`;
    };

    // Theme: the same choice Setup › Theme makes (theme.js); the page re-paints at once.
    const syncThemeChoice = () => nav.querySelectorAll('[data-theme-choice]').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.themeChoice === (window.getTheme ? getTheme() : 'system'))));
    nav.querySelectorAll('[data-theme-choice]').forEach((b) => b.addEventListener('click', () => {
      if (window.setTheme) setTheme(b.dataset.themeChoice);
      syncThemeChoice();
      document.querySelectorAll('input[name="theme"]').forEach((r) => { r.checked = r.value === b.dataset.themeChoice; });
    }));
    syncThemeChoice();
    // Text size: the same choice Setup › Display makes (theme.js).
    const syncSizeChoice = () => nav.querySelectorAll('[data-size-choice]').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.sizeChoice === (window.getTextSize ? getTextSize() : 'default'))));
    nav.querySelectorAll('[data-size-choice]').forEach((b) => b.addEventListener('click', () => {
      if (window.setTextSize) setTextSize(b.dataset.sizeChoice);
      syncSizeChoice();
      document.querySelectorAll('input[name="text-size"]').forEach((r) => { r.checked = r.value === b.dataset.sizeChoice; });
    }));
    syncSizeChoice();
    nav.querySelector('.tp-section').addEventListener('change', (e) => scrollTo(Number(e.target.value)));
    nav.addEventListener('click', (e) => {
      const r = e.target.closest('[data-role]');
      if (r) {
        setRole(r.dataset.role);
        const key = 'role-' + r.dataset.role;
        if (page === 'auth') { if (location.hash.slice(1) === key) go(key); else location.hash = key; }
        else location.href = `${PAGES.auth}#${key}`;
        return;
      }
      const s = e.target.closest('[data-state]');
      if (s) visit(BUILT.find(([k, , p]) => k === s.dataset.state && p === s.dataset.page));
    });
    const toggle = (show, firstLoad) => {
      nav.hidden = !show; open.setAttribute('aria-expanded', String(show)); remember(show);
      if (!show) return;
      // Sized at once, before it scrolls to where you are, so nothing moves under
      // your finger after it opens. Only on first load is it measured again a moment
      // later: Tailwind may not have placed the round button yet.
      fit();
      if (firstLoad) setTimeout(() => fit(), 300);
    };
    open.addEventListener('click', () => { toggle(nav.hidden); const g = sectionOf(current); if (!nav.hidden && g >= 0) scrollTo(g); });
    // The panel stops 8 above the round button, so the two never overlap.
    // Measured each time it opens: the button's place is only known once Tailwind has styled the page.
    const fit = () => { nav.style.maxHeight = `${Math.max(240, open.getBoundingClientRect().top - 16 - 8)}px`; };
    window.addEventListener('resize', () => { if (!nav.hidden) fit(); });
    // Three ways out: the ✕, Esc, or the round button again.
    nav.querySelector('.tp-close').addEventListener('click', () => { toggle(false); open.focus(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !nav.hidden) { toggle(false); open.focus(); } });
    nav.querySelector('.tp-prev').addEventListener('click', () => { const i = index(); if (i > 0) visit(BUILT[i - 1]); });
    nav.querySelector('.tp-next').addEventListener('click', () => { const i = index(); if (i >= 0 && i < BUILT.length - 1) visit(BUILT[i + 1]); });
    nav.querySelector('.tp-copy').addEventListener('click', (e) => {
      const b = e.currentTarget;
      const done = (text) => { b.textContent = text; setTimeout(() => { b.textContent = 'Copy link'; }, 1500); };
      navigator.clipboard.writeText(location.href).then(() => done('Copied'), () => done('Copy from the address bar'));
    });
    window.addEventListener('hashchange', () => go(location.hash.slice(1)));

    // Spacing overlay: on/off is remembered across pages; it redraws after
    // anything on the page changes (a sheet opens, an error appears …).
    const spacingInput = nav.querySelector('.tp-spacing');
    let pending;
    function redraw() {
      clearTimeout(pending);
      pending = setTimeout(() => {
        const opts = { spacing: spacingInput.checked, type: typeInput.checked };
        if (opts.spacing || opts.type) drawSpacing(document.body, opts); else clearSpacing();
      }, 60);
    }
    const typeInput = nav.querySelector('.tp-type');
    spacingInput.checked = spacingOn();
    typeInput.checked = typeOn();
    spacingInput.addEventListener('change', () => { setSpacingOn(spacingInput.checked); redraw(); });
    typeInput.addEventListener('change', () => { setTypeOn(typeInput.checked); redraw(); });
    new MutationObserver((list) => {
      if (!spacingInput.checked && !typeInput.checked) return;
      // Ignore the overlay's own redraws and the panel itself, or it would redraw forever.
      const own = (m) => m.target.closest?.('[data-tp-layer], [aria-label="Test panel"]')
        || (m.type === 'childList' && [...m.addedNodes, ...m.removedNodes].every((n) => n.dataset?.tpLayer));
      if (list.every(own)) return;
      redraw();
    }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['hidden', 'class', 'aria-invalid', 'aria-selected', 'data-phone'] });
    window.addEventListener('resize', redraw);
    document.fonts?.ready.then(redraw);

    if (remembered()) toggle(true, true);
    const opened = go(location.hash.slice(1));
    if (!opened) current = fallback || null;
    sync();
    if (!nav.hidden && sectionOf(current) >= 0) scrollTo(sectionOf(current));
    return opened;
  }

  window.TestPanel = { init };
})();
