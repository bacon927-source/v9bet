/** v9bet — web (mobile web) Tailwind theme
 *
 *  Single source of truth is tokens.css. Everything here points at those CSS
 *  variables rather than restating hex values, so switching theme or retuning a
 *  token moves Tailwind, the Flutter theme and the Figma kit together.
 *
 *  Dark is the default. Light comes from :root[data-theme="light"] in
 *  tokens.css — do NOT use Tailwind's `dark:` prefix, which would create a
 *  second place where the palette is decided.
 */
const v = (name) => `var(--${name})`;

module.exports = {
  content: ['./**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        app:      v('color-bg-app'),
        surface:  v('color-bg-surface'),
        raised:   v('color-bg-raised'),
        input:    v('color-bg-input'),
        scrim:    v('color-bg-scrim'),

        ink: {
          DEFAULT:   v('color-text-primary'),
          secondary: v('color-text-secondary'),
          muted:     v('color-text-muted'),
          onBrand:   v('color-text-on-brand'),
        },
        edge: {
          subtle:  v('color-border-subtle'),
          DEFAULT: v('color-border-default'),
          strong:  v('color-border-strong'),
          focus:   v('color-border-focus'),
        },
        brand: {
          DEFAULT: v('color-brand-primary'),
          hover:   v('color-brand-hover'),
          pressed: v('color-brand-pressed'),
          subtle:  v('color-brand-subtle'),
        },
        success: v('color-status-success'),
        warning: v('color-status-warning'),
        error:   v('color-status-error'),
        info:    v('color-status-info'),

        /* win / loss read as money, not as validation state — keep them apart */
        up:   v('color-money-up'),
        down: v('color-money-down'),
      },

      spacing: {
        '2xs': v('spacing-2xs'), xs: v('spacing-xs'), sm: v('spacing-sm'),
        md: v('spacing-md'), base: v('spacing-base'), lg: v('spacing-lg'),
        xl: v('spacing-xl'), '2xl': v('spacing-2xl'), '3xl': v('spacing-3xl'),
        '4xl': v('spacing-4xl'), '5xl': v('spacing-5xl'),
      },

      borderRadius: {
        sm: v('radius-sm'), md: v('radius-md'), lg: v('radius-lg'),
        xl: v('radius-xl'), full: v('radius-full'),
      },

      fontFamily: {
        sans: ['Inter', 'Noto Sans Thai', 'system-ui', 'sans-serif'],
        thai: ['Noto Sans Thai', 'Inter', 'system-ui', 'sans-serif'],
      },

      /* leading is deliberately loose: Vietnamese stacks tone marks above the
         letter and Thai grows in both directions. Tight leading clips both. */
      fontSize: {
        display: [v('font-size-display'), { lineHeight: v('leading-display') }],
        h1:      [v('font-size-h1'),      { lineHeight: v('leading-h1') }],
        h2:      [v('font-size-h2'),      { lineHeight: v('leading-h2') }],
        h3:      [v('font-size-h3'),      { lineHeight: v('leading-h3') }],
        'body-lg':[v('font-size-body-lg'),{ lineHeight: v('leading-body-lg') }],
        body:    [v('font-size-body'),    { lineHeight: v('leading-body') }],
        'body-sm':[v('font-size-body-sm'),{ lineHeight: v('leading-body-sm') }],
        caption: [v('font-size-caption'), { lineHeight: v('leading-caption') }],
        'num-lg':[v('font-size-num-lg'),  { lineHeight: v('leading-num-lg') }],
        num:     [v('font-size-num'),     { lineHeight: v('leading-num') }],
      },

      /* 360 is the width most VN / TH handsets report — check every screen here,
         not only at the 390 an iPhone-drawn design assumes. */
      screens: { xs: '360px', sm: '402px', md: '600px' },
    },
  },
  plugins: [],
};
