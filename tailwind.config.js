/** v9bet — web (mobile web) Tailwind theme
 *
 *  Single source of truth is variables.css. Everything here points at those CSS
 *  variables rather than restating hex values, so switching theme or retuning a
 *  token moves Tailwind, the Flutter theme and the Figma kit together.
 *
 *  Light and dark follow Tailwind's dark-mode pattern (darkMode: 'selector'):
 *  theme.js puts .dark on <html> from the member's choice or the device, and
 *  variables.css swaps every colour on that class. Pages use the semantic
 *  colours below and need no `dark:` classes; reach for `dark:` only for a
 *  one-off that is not a token.
 */
const v = (name) => `var(--${name})`;

module.exports = {
  darkMode: 'selector',
  content: ['./**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        app:      v('color-bg-app'),
        input:    v('color-bg-input'),
        disabled: { DEFAULT: v('color-bg-disabled'), ink: v('color-text-disabled') },
        scrim:    v('color-bg-scrim'),
        sheet:    { DEFAULT: v('color-bg-sheet'), handle: v('color-sheet-handle') },
        card:     v('color-bg-card'),
        /* The chosen half of a segmented control. */
        selected: v('color-bg-selected'),
        promo:    v('color-promo-accent'),
        /* Behind a provider's own logo (Google, LINE, Zalo): white in every theme. */
        provider: v('color-bg-provider'),

        ink: {
          DEFAULT:   v('color-text-primary'),
          secondary: v('color-text-secondary'),
          muted:     v('color-text-muted'),
          tertiary:  v('color-text-tertiary'),
          onBrand:   v('color-text-on-brand'),
          onError:   v('color-text-on-error'),
          navOff:    v('color-text-nav-inactive'),
        },
        edge: {
          subtle:  v('color-border-subtle'),
          DEFAULT: v('color-border-default'),
          strong:  v('color-border-strong'),
          focus:   v('color-border-focus'),
          empty:   v('color-border-empty'),
        },
        /* `brand` is v1's yellow: the one main button on a screen.
           `brand-2` is v1's green: links, the active tab, whatever is
           selected or switched on. */
        brand: {
          DEFAULT: v('color-brand-primary'),
          hover:   v('color-brand-hover'),
          pressed: v('color-brand-pressed'),
          subtle:  v('color-brand-subtle'),
        },
        'brand-2': {
          DEFAULT: v('color-brand-secondary'),
          hover:   v('color-brand-secondary-hover'),
          subtle:  v('color-brand-secondary-subtle'),
        },
        success: v('color-status-success'),
        warning: v('color-status-warning'),
        error:   v('color-status-error'),
        info:    v('color-status-info'),

        /* win / loss read as money, not as validation state — keep them apart */
        up:   v('color-money-up'),
        down: v('color-money-down'),
      },

      /* Spacing and radius are Tailwind's own default scales, used as is
         (p-4, gap-7, p-0.5, rounded-xl …) — IT builds with Tailwind, so we do
         not re-declare values Tailwind already has. Only a value that is not
         on Tailwind's scale is an exception, and it needs the user's OK. */

      /* v1 is set in the system face — SF Pro on iOS, Roboto on Android — so
         there is one family and no web font to load. */
      fontFamily: {
        display: v('font-display'),
        sans: v('font-latin'),
        thai: v('font-thai'),
      },

      /* leading is deliberately loose: Vietnamese stacks tone marks above the
         letter and Thai grows in both directions. Tight leading clips both. */
      /* No custom font sizes: pages use Tailwind's own classes — text-base/7,
         text-sm/6, text-xs/5, text-base, text-lg, text-3xl (2026-10-27). The
         components below read the same numbers from variables.css. */

      /* 360 is the width most VN / TH handsets report — check every screen here,
         not only at the 390 an iPhone-drawn design assumes. */
      screens: { xs: '360px', sm: '402px', md: '600px' },
    },
  },
  /* ── Components ──────────────────────────────────────────────────────────
     The live product's UI (Figma: APP-V9Bet-v1) as Tailwind component classes.
     One definition here, used by every page; pages only arrange them with
     utilities. They sit in the components layer, so a utility on the same
     element still wins. Every colour and size resolves to a variables.css variable.

     A plain function is a valid Tailwind plugin, so this file works unchanged
     from the CDN today and from a real build later. */
  plugins: [
    function ({ addBase, addUtilities, addComponents, theme }) {
      /* Size and leading straight from the variable pair, so the two never part. */
      const type = (key) => ({ fontSize: v('font-size-' + key), lineHeight: v('leading-' + key) });
      const c = (path) => theme('colors.' + path);
      const pill = theme('borderRadius.full');

      addBase({
        'a:focus-visible, button:focus-visible': { outline: `2px solid ${c('edge.focus')}`, outlineOffset: '2px' },
      });

      /* Mobile web sits inside the browser's own chrome: no top or bottom band
         is reserved, only whatever inset the device itself reports. */
      addUtilities({
        '.safe-top': { paddingTop: 'env(safe-area-inset-top)' },
        '.safe-bottom': { paddingBottom: `calc(${theme('spacing.4')} + env(safe-area-inset-bottom))` },
        /* Small links and tick rows: the text stays small, the target is 44 tall. */
        '.tap': { display: 'inline-flex', alignItems: 'center', minHeight: '44px' },
      });

      /* Icons — one set, Heroicons outline (Tailwind Labs, 24 viewBox,
         1.5 stroke; switched from v1's fi-br on 2026-10-26), in
         assets/icons under the kit's own names (back = chevron-left,
         close = x-mark, eye-crossed = eye-slash). 24 on their own, 16
         (.icon-sm) inside a field. The
         colour is the text colour, so set it with text-*. Decorative icons
         get aria-hidden; the button around them carries the aria-label. */
      const ICONS = ['back', 'close', 'chevron-right', 'chevron-down', 'eye', 'eye-crossed', 'check'];
      addComponents({
        '.icon': {
          display: 'inline-block', flex: 'none', width: '24px', height: '24px', backgroundColor: 'currentColor',
          WebkitMask: 'var(--icon) center / contain no-repeat', mask: 'var(--icon) center / contain no-repeat',
        },
        '.icon-sm': { width: '16px', height: '16px' },
        ...Object.fromEntries(ICONS.map((name) => ['.icon-' + name, { '--icon': `url("assets/icons/${name}.svg")` }])),
      });

      addComponents({
        /* Page — set first, before anything else on the screen: the 16 left and
           right edges (px-4) for the header and the content alike (user,
           2026-10-20: "每頁都先訂左右的 padding 然後才設定 header then content").
           The header and the body carry no side padding of their own, so the ✕,
           the tabs and every block line up on the same 16 line. Pages add
           min-h-[100dvh]; demo frames don't. */
        '.page': {
          display: 'flex', flexDirection: 'column', paddingInline: theme('spacing.4'),
          paddingTop: 'env(safe-area-inset-top)',
        },

        /* Page body — everything under the header, inside .page: 20 from the
           header to the first content on every page, 16 between blocks (the main
           button included), and the bottom edge keeps clear of any inset the
           device reports. No side padding — .page owns that. */
        '.page-body': {
          display: 'flex', flexDirection: 'column', gap: theme('spacing.4'),
          padding: `${theme('spacing.5')} 0 calc(${theme('spacing.4')} + env(safe-area-inset-bottom))`,
        },

        /* Navigation-Top — 44 tall like every header (title, tabs or steps),
           so the ✕ gets a full 44 × 44 to tap. Action left, title centred.
           No side padding: it sits inside .page, so the ✕ starts on the same
           16 line as the content and its tap area runs inward, not off-screen. */
        '.nav-top': { position: 'relative', display: 'flex', alignItems: 'center', height: '44px' },
        '.nav-top-action': { position: 'relative', zIndex: '10', display: 'flex', alignItems: 'center', width: '44px', height: '44px' },
        '.nav-top-title': {
          position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', justifyContent: 'center',
          ...type('title'), fontWeight: '600', color: c('ink.DEFAULT'), pointerEvents: 'none',
        },

        /* Nav tabs — Login and Sign Up only: two text tabs centred in the
           header, always "Sign Up  Log In" (wireframe order). They switch the
           whole page, like a feed switcher, so they belong in the header. The
           current one is white with a short green bar; the other is grey. */
        '.nav-tabs': {
          position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: theme('spacing.7'), pointerEvents: 'none',
          '& > *': {
            pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: theme('spacing.1'), minHeight: '44px',
            ...type('title'), color: c('ink.muted'),
          },
          '& > *::after': { content: '""', width: '16px', height: '3px', borderRadius: theme('borderRadius.sm'), backgroundColor: 'transparent' },
          '& > [aria-current="page"]': { color: c('ink.DEFAULT'), fontWeight: '600' },
          '& > [aria-current="page"]::after': { backgroundColor: c('brand-2.DEFAULT') },
        },

        /* Button — 46 tall pill. Grey until the form can be sent. */
        '.btn': {
          display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '46px',
          borderRadius: pill, backgroundColor: c('brand.DEFAULT'), color: c('ink.onBrand'),
          ...type('button'), fontWeight: '500', letterSpacing: '-0.408px',
          '&:disabled': { backgroundColor: c('disabled.DEFAULT'), color: c('disabled.ink'), cursor: 'not-allowed' },
        },

        /* Link row — the line under the button that leads to the other screen. */
        '.link-row': {
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3em', height: '46px',
          ...type('body'), color: c('ink.DEFAULT'),
          '& a': { fontWeight: '700', color: c('brand-2.DEFAULT') },
        },
        /* On its own (no "New to V9bet?" before it) a link row is a text
           button: the same 46 × full width pill as .btn, just no fill —
           Forgot Password?, Skip, Use a different email. */
        'a.link-row, button.link-row': { width: '100%', borderRadius: pill, fontWeight: '700', color: c('brand-2.DEFAULT') },

        /* Field — a 50px outlined box with 8px above it for the label, which
           sits inside as the placeholder and lifts onto the outline once the
           field has focus or a value. The input needs placeholder=" ".
           The value is 17px: under 16 iOS Safari zooms the page on focus. */
        '.field': {
          position: 'relative', paddingTop: theme('spacing.2'),
          '& > input': {
            display: 'block', width: '100%', height: '50px',
            border: 'none', borderRadius: theme('borderRadius.xl'),
            backgroundColor: c('input'), padding: `0 ${theme('spacing.3')}`,
            ...type('field'), color: c('ink.DEFAULT'), outline: 'none',
          },
          /* The outline is a <fieldset> whose <legend> carries a hidden copy of
             the label: when the label lifts, the legend opens and the browser
             breaks the border behind it (Material's notched outline). The label
             itself stays transparent, so the field works on any surface — page,
             card or sheet — without matching a background colour.
             Markup: <fieldset aria-hidden="true"><legend><span>Label</span></legend></fieldset>
             The legend is 11 tall, so the fieldset starts 5.5 higher to put the
             border line exactly on the box's top edge. */
          '& > fieldset': {
            position: 'absolute', left: '0', right: '0', top: `calc(${theme('spacing.2')} - 5.5px)`, height: 'calc(50px + 5.5px)',
            margin: '0', padding: `0 ${theme('spacing.2')}`, minWidth: '0', pointerEvents: 'none',
            border: `1px solid ${c('edge.DEFAULT')}`, borderRadius: theme('borderRadius.xl'),
          },
          '& > fieldset > legend': {
            display: 'block', width: 'auto', maxWidth: '0.01px', height: '11px', padding: '0', overflow: 'hidden',
            visibility: 'hidden', whiteSpace: 'nowrap', fontSize: v('font-size-field-label'), transition: 'max-width .05s',
          },
          '& > fieldset > legend > span': { display: 'inline-block', paddingInline: theme('spacing.1') },
          '& > input:focus ~ fieldset > legend, & > input:not(:placeholder-shown) ~ fieldset > legend': { maxWidth: '100%', transition: 'max-width .1s ease .05s' },
          '& > input:focus ~ fieldset': { borderColor: c('edge.focus') },
          /* A note about this field — .hint, or .error-text when it is invalid —
             goes last inside the field, 4 under the box, so it reads as part of
             the field and not as a block of its own. The error takes the hint's
             place: the outline and label go red and the hint steps aside. */
          '& > input[aria-invalid="true"] ~ fieldset': { borderColor: c('error') },
          '& > input[aria-invalid="true"] + label': { color: c('error') },
          '& > .hint, & > .error-text': { marginTop: theme('spacing.1') },
          '& > input[aria-invalid="true"] ~ .hint': { display: 'none' },
          '& > input:-webkit-autofill': { WebkitTextFillColor: c('ink.DEFAULT'), boxShadow: `inset 0 0 0 100px ${c('app')}` },
          '& > label': {
            position: 'absolute', left: theme('spacing.3'), top: theme('spacing.2'), height: '50px', display: 'flex', alignItems: 'center',
            ...type('body'), color: c('ink.muted'),
            pointerEvents: 'none', transition: 'top .12s ease, left .12s ease, font-size .12s ease, transform .12s ease',
          },
          /* Focus lights the label with the outline, so the two read as one
             state (user, 2026-10-20: "focus 時，字也要一併 focus"). An invalid
             field keeps its red label even while focused. */
          '& > input:focus:not([aria-invalid="true"]) + label': { color: c('ink.DEFAULT') },
          '& > input:focus + label, & > input:not(:placeholder-shown) + label': {
            top: theme('spacing.2'), left: theme('spacing.2'), height: 'auto', padding: `${theme('spacing[0.5]')} ${theme('spacing.1')}`, transform: 'translateY(-50%)',
            ...type('field-label'),
          },
          '@media (prefers-reduced-motion: reduce)': { '& > label, & > fieldset > legend': { transition: 'none' } },
        },
        /* Trailing slot: an icon or a short note at the right edge of the box. */
        '.field-trail': {
          position: 'absolute', right: theme('spacing.2'), top: theme('spacing.2'), height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: theme('spacing[1.5]'),
          ...type('micro'), color: c('ink.secondary'),
        },
        '.field:has(> .field-trail) > input': { paddingRight: theme('spacing.10') },
        '.field-trail[hidden]': { display: 'none' },
        /* The icon is 16px; the thing you tap is 44. */
        'button.field-trail': { minWidth: '44px', right: '0', paddingRight: theme('spacing.2'), color: c('ink.DEFAULT') },

        /* Tabs — text over a 2px rule; the selected one turns green.
           State lives in aria-selected, so scripts flip one attribute. */
        '.tabs': { display: 'flex' },
        '.tab': {
          flex: '1 1 0%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme('spacing.1'),
          height: '44px', paddingTop: theme('spacing.2'), fontSize: type('body').fontSize, lineHeight: type('body').lineHeight, color: c('ink.navOff'),
          '&::after': { content: '""', width: '100%', height: '2px', backgroundColor: 'currentColor' },
          '&[aria-selected="true"]': { color: c('brand-2.DEFAULT') },
        },

        /* Radio (.tick) — pick one of several (option cards). A 22px ring,
           empty when off; on: a 2px green ring and a 10px dot. Put it right
           after a visually hidden radio inside a label (Figma: Radio). */
        '.tick': {
          flex: 'none', width: '22px', height: '22px', borderRadius: pill,
          border: `1.5px solid ${c('edge.DEFAULT')}`, display: 'grid', placeItems: 'center',
          '&::after': { content: '""', width: '10px', height: '10px', borderRadius: pill, backgroundColor: 'transparent' },
        },
        'input:checked + .tick': { borderWidth: '2px', borderColor: c('brand-2.DEFAULT') },
        'input:checked + .tick::after': { backgroundColor: c('brand-2.DEFAULT') },
        'input:focus-visible + .tick': { outline: `2px solid ${c('edge.focus')}`, outlineOffset: '2px' },

        /* Checkbox — something ticked on its own (Keep me logged in, the 21+
           consent). A 20px square, corner 4, grey edge; on: green fill and a
           white check. Put it right after a visually hidden checkbox inside a
           label (Figma: Checkbox). Pick-one choices use .tick. */
        '.checkbox': {
          flex: 'none', width: theme('spacing.5'), height: theme('spacing.5'), borderRadius: theme('borderRadius.DEFAULT'),
          border: `1.5px solid ${c('edge.DEFAULT')}`, display: 'grid', placeItems: 'center',
          '&::after': {
            content: '""', width: theme('spacing.4'), height: theme('spacing.4'), backgroundColor: '#fff', opacity: '0',
            maskImage: 'url("assets/icons/check.svg")', WebkitMaskImage: 'url("assets/icons/check.svg")',
            maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat',
          },
        },
        'input:checked + .checkbox': { borderColor: c('brand-2.DEFAULT'), backgroundColor: c('brand-2.DEFAULT') },
        'input:checked + .checkbox::after': { opacity: '1' },
        'input:focus-visible + .checkbox': { outline: `2px solid ${c('edge.focus')}`, outlineOffset: '2px' },

        /* Divider with a label between two rules (2026-10-26, the Preline
           pattern): 12 above and below inside it (py-3), 24 between each rule
           and the label (gap-6). The page's gap-4 between sections adds the
           rest, so the rule sits 28 from what is above and below. */
        '.divider-label': {
          display: 'flex', alignItems: 'center', gap: theme('spacing.6'), paddingBlock: theme('spacing.3'), ...type('body-sm'), color: c('ink.secondary'),
          '&::before, &::after': { content: '""', flex: '1 1 0%', height: '1px', backgroundColor: c('edge.DEFAULT'), opacity: '.5' },
        },

        /* Divider without a label — one plain rule between two groups that need
           no name. Same 12 above and below as .divider-label (py-3); the page's
           gap-4 between sections adds the rest.
           Use <div class="divider" role="separator"></div>. */
        '.divider': {
          display: 'flex', paddingBlock: theme('spacing.3'),
          '&::before': { content: '""', flex: '1 1 0%', height: '1px', backgroundColor: c('edge.DEFAULT'), opacity: '.5' },
        },
        /* Social sign-in — a 48 circle carrying the provider's official icon,
           name underneath. data-last-used adds the ring; the badge says why. */
        /* The row the social buttons sit in. The page body already gives the
           header gap; the row adds 20 more on top because the "Last used"
           badge rises 18 above the icon (Figma: space/20). Buttons sit one
           action step apart. */
        '.social-row': { display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: theme('spacing.8'), paddingTop: theme('spacing.5') },
        '.social-btn': {
          position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme('spacing.1'),
          ...type('body-sm'), color: c('ink.secondary'),
        },
        '.social-btn-icon': {
          width: '48px', height: '48px', borderRadius: pill, overflow: 'hidden', display: 'grid', placeItems: 'center',
          backgroundColor: c('provider'),
          // A hairline edge, so a white logo still reads as a circle on a white page.
          boxShadow: `0 0 0 1px ${c('edge.subtle')}`,
          '& > img': { width: '100%', height: '100%', objectFit: 'cover' },
        },
        '.social-btn[data-last-used] .social-btn-icon': { boxShadow: `0 0 0 2px ${c('brand-2.DEFAULT')}` },
        '.social-btn-badge': {
          position: 'absolute', top: '-18px' /* not on Tailwind's scale (no 4.5) — exception, awaiting the user's OK */, left: '50%', transform: 'translateX(-50%)', padding: `${theme('spacing[0.5]')} ${theme('spacing[1.5]')}`,
          borderRadius: pill, backgroundColor: c('app'), border: `1px solid ${c('edge.DEFAULT')}`,
          ...type('micro'), color: c('ink.secondary'), whiteSpace: 'nowrap',
        },

        /* Helper copy under a field. */
        '.hint': { ...type('body-sm'), color: c('ink.secondary') },

        /* Why something was rejected — under a field, a code or the button. */
        '.error-text': { ...type('body-sm'), color: c('error') },

        /* One-time code — six 42 x 44 cells, 12 apart. A cell is faint while
           empty, green once it holds a digit, and the whole row goes red with
           data-invalid. Each input needs placeholder=" ". */
        '.otp': {
          display: 'flex', justifyContent: 'center', gap: theme('spacing.3'),
          '& > input': {
            flex: '0 1 42px', minWidth: '0', width: '42px', height: '44px', padding: '0', textAlign: 'center',
            border: `1px solid ${c('edge.empty')}`, borderRadius: theme('borderRadius.xl'),
            backgroundColor: c('input'), ...type('button'), letterSpacing: '-0.408px',
            color: c('ink.DEFAULT'), caretColor: c('brand-2.DEFAULT'), outline: 'none',
          },
          '& > input:not(:placeholder-shown)': { borderColor: c('brand-2.DEFAULT') },
          '& > input:focus': { borderColor: c('edge.focus') },
          '&[data-invalid] > input': { borderColor: c('error') },
        },

        /* ── Settings, setup and sheets (Figma: List row, Toggle, Option card,
           Action bar, Step top bar, Step hero, Checklist row, Sheet header,
           Status mark). Sizes are the Figma components'. */

        /* Group label — the grey line above a card: "Account related". */
        '.group-label': { ...type('body'), color: c('ink.tertiary') },

        /* Card — the first surface step above the page. List rows inside are
           split by a 1px line in the page colour, so the card reads as cut. */
        '.card': {
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          borderRadius: theme('borderRadius.xl'), backgroundColor: c('card'),
          '& > * + *': { borderTop: `1px solid ${c('app')}` },
        },

        /* List row — 50 tall, title left, then a value, a chevron or a toggle.
           A row that opens a page is an <a>; a row with a toggle is a <label>
           so the whole row flips it. Long titles truncate, they do not wrap. */
        '.list-row': {
          display: 'flex', alignItems: 'center', gap: theme('spacing.2'), width: '100%', minHeight: '50px', padding: `0 ${theme('spacing.4')}`,
          backgroundColor: c('card'), textAlign: 'left', cursor: 'pointer',
          ...type('body'), color: c('ink.DEFAULT'),
          '& > .list-row-title': { flex: '1 1 0%', minWidth: '0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
          '& > .icon': { color: c('edge.DEFAULT') },
        },
        '.list-row-value': { flex: 'none', ...type('body-sm'), color: c('ink.secondary') },

        /* Toggle — 40 x 24 pill, 20 knob. Grey off, green on (purple is for
           promotions only). Put it right after a visually hidden checkbox
           with role="switch": it takes effect at once, no Save button. */
        '.toggle': {
          flex: 'none', display: 'flex', alignItems: 'center', width: '40px', height: '24px', padding: `0 ${theme('spacing[0.5]')}`,
          borderRadius: pill, backgroundColor: c('disabled.DEFAULT'), transition: 'background-color .12s ease',
          '&::after': { content: '""', width: '20px', height: '20px', borderRadius: pill, backgroundColor: c('ink.DEFAULT'), transition: 'transform .12s ease' },
          '@media (prefers-reduced-motion: reduce)': { '&, &::after': { transition: 'none' } },
        },
        'input:checked + .toggle': { backgroundColor: c('brand-2.DEFAULT') },
        'input:checked + .toggle::after': { transform: 'translateX(16px)' },
        'input:focus-visible + .toggle': { outline: `2px solid ${c('edge.focus')}`, outlineOffset: '2px' },

        /* Option card — pick one of two to four, each with a line of
           explanation. The whole card is the <label>; the tick turns green,
           the outline does not change. A disabled option drops to 50%. */
        '.option-card': {
          display: 'flex', alignItems: 'center', gap: theme('spacing.3'), width: '100%', padding: theme('spacing.3'),
          border: `1px solid ${c('edge.DEFAULT')}`, borderRadius: theme('borderRadius.xl'), cursor: 'pointer',
          ...type('body'), color: c('ink.DEFAULT'),
          '& > img, & > svg': { flex: 'none', width: '22px', height: '22px' },
          '&:has(> input:disabled)': { opacity: '.5', cursor: 'not-allowed' },
        },
        '.option-card-text': { flex: '1 1 0%', minWidth: '0', display: 'flex', flexDirection: 'column' },
        '.option-card-sub': { ...type('micro'), color: c('ink.secondary') },

        /* Action bar — pins the one main button to the bottom of a long or
           guided page, with at most one text link under it. Short pages do
           not use it: the button follows the content. */
        '.action-bar': {
          /* Inside .page, but full-bleed: it cancels the page's 16 so its top
             rule and background run edge to edge, then pads its own 16 back. */
          marginInline: `calc(-1 * ${theme('spacing.4')})`,
          position: 'sticky', bottom: '0', display: 'flex', flexDirection: 'column', gap: theme('spacing.1'),
          padding: `${theme('spacing.4')} ${theme('spacing.4')} calc(${theme('spacing.4')} + env(safe-area-inset-bottom))`,
          backgroundColor: c('app'), borderTop: `1px solid ${c('edge.subtle')}`,
        },

        /* Step progress — "2 of 8", centred in a .nav-top on guided pages.
           The header carries no title there; this is the only progress mark. */
        '.nav-top-progress': {
          position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', justifyContent: 'center',
          ...type('body-sm'), color: c('ink.muted'), pointerEvents: 'none',
        },

        /* Step hero — the top of a guided page: 18 title and one line of
           why. One per page. (The points pill was removed 2026-10-21.) */
        '.step-hero': {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme('spacing.3'), textAlign: 'center',
          '& > h1, & > h2': { ...type('title'), fontWeight: '600', color: c('ink.DEFAULT') },
          '& > p': { ...type('body'), color: c('ink.secondary') },
        },

        /* Checklist — one outlined box per group of setup items, rows split
           by a faint line. A row shows its number until done, then the green
           tick, and its title fades to secondary. */
        '.checklist': {
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          border: `1px solid ${c('edge.DEFAULT')}`, borderRadius: theme('borderRadius.xl'),
          '& > * + *': { borderTop: `1px solid ${c('edge.subtle')}` },
        },
        '.checklist-row': {
          display: 'flex', alignItems: 'center', gap: theme('spacing.3'), width: '100%', padding: `${theme('spacing.2')} ${theme('spacing.3')}`, textAlign: 'left',
          ...type('body'), color: c('ink.DEFAULT'),
        },
        '.checklist-row-marker': {
          position: 'relative', flex: 'none', width: '22px', height: '22px', borderRadius: pill,
          border: `1px solid ${c('edge.DEFAULT')}`, display: 'grid', placeItems: 'center',
          ...type('micro'), color: c('ink.secondary'),
        },
        '.checklist-row-text': { flex: '1 1 0%', minWidth: '0', display: 'flex', flexDirection: 'column' },
        '.checklist-row-sub': { ...type('body-sm'), color: c('ink.secondary') },
        '.checklist-row[data-done]': {
          color: c('ink.secondary'),
          '& .checklist-row-marker': { borderColor: c('brand-2.DEFAULT'), color: 'transparent' },
          '& .checklist-row-marker::after': { content: '""', position: 'absolute', width: '12px', height: '12px', borderRadius: pill, backgroundColor: c('brand-2.DEFAULT') },
        },

        /* Sheet — rises from the bottom over a 60% black scrim, for one thing
           to deal with without leaving the page. Second surface step, top
           corners 12. Header: handle, centred title, close top right. */
        '.sheet-scrim': { position: 'fixed', inset: '0', zIndex: '40', backgroundColor: c('scrim') },
        '.sheet': {
          position: 'fixed', left: '0', right: '0', bottom: '0', zIndex: '50', maxHeight: '90dvh', overflowY: 'auto',
          display: 'flex', flexDirection: 'column', backgroundColor: c('sheet.DEFAULT'),
          borderTopLeftRadius: theme('borderRadius.xl'), borderTopRightRadius: theme('borderRadius.xl'),
        },
        '.sheet-header': {
          position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme('spacing.2'), paddingTop: theme('spacing.1'),
          '&::before': { content: '""', width: '36px', height: '5px', borderRadius: pill, backgroundColor: c('sheet.handle') },
          '& > h2': { display: 'flex', alignItems: 'center', minHeight: '40px', padding: `0 ${theme('spacing.14')}`, textAlign: 'center', ...type('title'), fontWeight: '600', color: c('ink.DEFAULT') },
          '& > .sheet-close': { position: 'absolute', top: theme('spacing.1'), right: theme('spacing[1.5]'), display: 'grid', placeItems: 'center', width: '44px', height: '44px', color: c('ink.DEFAULT') },
        },
        '.sheet-body': {
          display: 'flex', flexDirection: 'column', gap: theme('spacing.4'),
          padding: `${theme('spacing.4')} ${theme('spacing.4')} calc(${theme('spacing.4')} + env(safe-area-inset-bottom))`,
        },

        /* Status mark — the 48 green ring with a tick that opens a result page.
           Bad news does not get one. */
        '.status-mark': {
          flex: 'none', display: 'grid', placeItems: 'center', width: '48px', height: '48px', borderRadius: pill,
          border: `2px solid ${c('brand-2.DEFAULT')}`, color: c('brand-2.DEFAULT'),
        },
      });
    },
  ],
};
