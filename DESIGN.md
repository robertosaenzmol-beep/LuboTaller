# DESIGN.md — Lubo Taller

> BMW-hybrid design system adapted for Lubo Taller.
> Structural patterns (dark hero bands, card grids, square buttons, strict spacing) from BMW's digital system.
> Palette and personality from Lubo Taller's heritage brand (Est. 1984).

---

## 1. Brand Identity

| Attribute       | Value                                                        |
| --------------- | ------------------------------------------------------------ |
| Name            | Lubo Taller                                                  |
| Tagline         | Tu taller de confianza desde 1984                            |
| Tone            | Professional, trustworthy, warm, no-nonsense                 |
| Personality     | A master craftsman who speaks plainly and delivers perfectly  |
| Language        | Spanish (Spain) — formal "usted" in CTAs, informal in copy   |

---

## 2. Color System

### 2.1 Core Palette

| Token                  | Hex       | Usage                                              |
| ---------------------- | --------- | -------------------------------------------------- |
| `primary`              | `#8B4513` | Buttons, links, active states, brand accents       |
| `primary-dark`         | `#6B3410` | Button hover, pressed states                       |
| `primary-light`        | `#A0522D` | Subtle highlights, focus rings                     |
| `ink`                  | `#1A1A1A` | Headings, high-emphasis text                       |
| `body`                 | `#3C3C3C` | Body copy                                          |
| `muted`                | `#6B6B6B` | Captions, metadata, secondary text                 |
| `canvas`               | `#FFFDF8` | Page background (warm cream)                       |
| `surface-soft`         | `#F5F0E8` | Card backgrounds, alternating sections             |
| `surface-dark`         | `#1C1210` | Hero bands, footer, dark sections                  |
| `surface-dark-elevated`| `#2A1F1A` | Elevated cards on dark backgrounds                 |
| `on-dark`              | `#FFFDF8` | Text on dark surfaces                              |
| `accent-gold`          | `#C8A96E` | Metallic gold — stars, badges, premium accents     |
| `accent-red`           | `#8B1A1A` | Deep red — danger states, logo gear accent         |
| `hairline`             | `#E0D5C5` | Borders, dividers, subtle separators               |

### 2.2 Semantic Colors

| Token     | Hex       | Usage               |
| --------- | --------- | -------------------- |
| `success` | `#22C55E` | Confirmations        |
| `warning` | `#F59E0B` | Alerts               |
| `error`   | `#DC2626` | Errors, destructive  |

### 2.3 Rules

- **No gradients.** Flat color only. Heritage brands don't shimmer.
- **No opacity tricks** on colored surfaces. Use the explicit token.
- Dark sections (`surface-dark`) use `on-dark` for all text. No exceptions.
- `accent-gold` is reserved for star ratings, badges, and the logo lockup. Never use as a background.

---

## 3. Typography

### 3.1 Typeface

| Role    | Family | Weight | Fallback Stack                |
| ------- | ------ | ------ | ----------------------------- |
| Display | Inter  | 700    | system-ui, sans-serif         |
| Body    | Inter  | 300    | system-ui, sans-serif         |
| UI      | Inter  | 500    | system-ui, sans-serif         |

### 3.2 Scale (BMW sizing)

| Step   | Size  | Line Height | Weight | Usage                        |
| ------ | ----- | ----------- | ------ | ---------------------------- |
| `h1`   | 64px  | 1.1         | 700    | Hero headline only           |
| `h2`   | 48px  | 1.15        | 700    | Section titles               |
| `h3`   | 32px  | 1.2         | 700    | Card titles, sub-sections    |
| `h4`   | 24px  | 1.3         | 700    | Labels, stat numbers         |
| `h5`   | 20px  | 1.4         | 500    | Eyebrow text, nav links      |
| `body` | 16px  | 1.6         | 300    | Body copy                    |
| `small`| 14px  | 1.5         | 300    | Captions, metadata, legal    |

### 3.3 Rules

- **Max body width:** 65ch. No wall-of-text.
- **Letter spacing:** -0.02em on h1–h2. 0 elsewhere.
- **No italic** except for direct quotations in testimonials.
- Headings are always `ink` on light surfaces, `on-dark` on dark surfaces.

---

## 4. Spacing Scale

8px base unit. BMW-derived geometric scale:

| Token  | Value | Usage                                    |
| ------ | ----- | ---------------------------------------- |
| `xs`   | 4px   | Inline icon gaps                         |
| `sm`   | 8px   | Tight padding (badges, tags)             |
| `md`   | 16px  | Default padding, gap between elements    |
| `lg`   | 24px  | Card padding, section element gaps       |
| `xl`   | 32px  | Between content blocks                   |
| `2xl`  | 48px  | Section top/bottom padding (mobile)      |
| `3xl`  | 64px  | Section top/bottom padding (desktop)     |
| `4xl`  | 96px  | Hero vertical padding                    |
| `5xl`  | 128px | Maximum breathing room                   |

### Rules

- Sections always use `3xl` (64px) vertical padding on desktop, `2xl` (48px) on mobile.
- Cards use `lg` (24px) internal padding.
- Never eyeball spacing. Use tokens only.

---

## 5. Layout

### 5.1 Grid

| Breakpoint | Columns | Gutter | Max Width |
| ---------- | ------- | ------ | --------- |
| Mobile     | 1       | 16px   | 100%      |
| Tablet     | 2       | 24px   | 768px     |
| Desktop    | 3       | 32px   | 1200px    |

- Content container: `max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8`
- Full-bleed dark bands: 100vw background, content inside container.

### 5.2 Structural Patterns (BMW-derived)

1. **Dark Hero Band** — Full-width `surface-dark` background. Vertically centered content. `4xl` padding. Single headline + subtitle + one CTA.
2. **Card Grid** — 3-column on desktop, 1-column mobile. Cards sit on `surface-soft` or `canvas`. Equal height. No rounded corners (square cards, 0 radius).
3. **Alternating Sections** — Dark/light rhythm. Never two light sections in a row.
4. **Trust Bar** — Horizontal stat counters. Centered. Large numbers (`h2` scale) with small labels (`small` scale).

---

## 6. Components

### 6.1 Buttons

| Variant   | Background  | Text       | Border         | Hover              | Radius |
| --------- | ----------- | ---------- | -------------- | ------------------ | ------ |
| Primary   | `primary`   | `on-dark`  | none           | `primary-dark`     | **0**  |
| Secondary | transparent | `primary`  | 2px `primary`  | `primary` bg, white text | **0** |
| Ghost     | transparent | `body`     | none           | `surface-soft` bg  | **0**  |

- **All buttons are square** (border-radius: 0). This is the BMW structural choice.
- Padding: `12px 32px` (desktop), `12px 24px` (mobile).
- Font: Inter 500, 16px, uppercase, letter-spacing 0.05em.
- Transition: background-color 200ms ease.
- Focus: 2px `primary-light` outline, 2px offset.

### 6.2 Cards

- Background: `canvas` on light sections, `surface-dark-elevated` on dark sections.
- Border: 1px `hairline` (light) or none (dark).
- Radius: **0**. Square corners always.
- Shadow: `0 1px 3px rgba(0,0,0,0.08)` on light. None on dark.
- Hover: translateY(-2px), shadow `0 4px 12px rgba(0,0,0,0.12)`. Transition 300ms ease.
- Internal padding: `lg` (24px).

### 6.3 Navigation

- Height: 72px. Sticky. Background: `canvas` with `backdrop-blur(8px)` and 95% opacity.
- Logo: left-aligned. Max height 48px.
- Links: center-aligned. `h5` scale (20px), weight 500, `ink` color. Hover: `primary`.
- CTA: right-aligned. Primary button style.
- Border-bottom: 1px `hairline`.
- Mobile: hamburger menu at `md` breakpoint.

### 6.4 Section Headers

- Eyebrow: `small` scale, uppercase, `accent-gold`, letter-spacing 0.1em.
- Headline: `h2` scale.
- Subhead: `body` scale, `muted` color, max-width 50ch, centered.
- Stack: eyebrow → 8px → headline → 16px → subhead.

### 6.5 Testimonial Cards

- Blockquote with `body` text, italic.
- 5 stars in `accent-gold` above the quote.
- Author name: `h5` scale, `ink`.
- Border-left: 3px `primary`.
- Background: `canvas`.

### 6.6 Footer

- Background: `surface-dark`.
- Text: `on-dark` at 70% opacity for secondary, 100% for headings.
- Columns: Logo+description | Nav links | Contact info | Social icons.
- Bottom bar: 1px `hairline` at 20% opacity, copyright in `small` scale.
- Social icons: 24px, `on-dark` at 60% opacity, hover 100%.

### 6.7 Star Ratings

- SVG stars, 20px. Filled: `accent-gold`. Empty: `hairline`.
- Always 5 stars inline with 2px gap.

---

## 7. Iconography

- Style: outlined, 1.5px stroke, 24px default.
- Source: Lucide icons (consistent with Astro ecosystem).
- Color: inherits from parent text color.
- Never use emoji as icons. Ever.

---

## 8. Motion (GSAP)

| Pattern              | Properties                          | Duration | Ease           |
| -------------------- | ----------------------------------- | -------- | -------------- |
| Fade In Up           | opacity 0→1, y 30→0                | 0.8s     | power2.out     |
| Stagger Cards        | Same as above, stagger 0.15s        | 0.8s     | power2.out     |
| Counter Roll         | textContent 0→target                | 2s       | power1.inOut   |
| Hero Text Reveal     | opacity 0→1, y 50→0, stagger 0.2s  | 1s       | power3.out     |
| Hover Lift           | y 0→-2, shadow increase             | 0.3s     | power1.out     |
| Nav Scroll           | background opacity 0.95→1 on scroll | 0.3s     | none (direct)  |

### Rules

- All scroll animations use ScrollTrigger with `start: "top 85%"`.
- Animations fire once (`once: true`). No replay.
- Respect `prefers-reduced-motion`: disable all transforms, keep opacity fades at 0.3s.
- No decorative animation. Every motion serves comprehension or hierarchy.

---

## 9. Image Treatment

- All images: `object-fit: cover`. No distortion.
- Service icons: 64px circles with `surface-soft` background, `primary` icon stroke.
- Logo: preserve original aspect ratio. Never stretch. Max-height constraint only.
- No stock photo filters, no overlays, no vignettes.

---

## 10. Responsive Behavior

| Breakpoint | Width   | Behavior                              |
| ---------- | ------- | ------------------------------------- |
| sm         | < 640px | Single column. Stack everything.      |
| md         | 768px   | 2-column grids. Show nav links.       |
| lg         | 1024px  | 3-column grids. Full desktop layout.  |
| xl         | 1280px  | Max-width container. Extra breathing. |

- Mobile-first. All base styles are mobile.
- Touch targets: minimum 44px.
- No horizontal scroll. Ever.

---

## 11. Anti-Patterns (Banned)

These are explicitly forbidden:

- `rounded-xl`, `rounded-2xl`, `rounded-full` on cards or buttons (use `rounded-none`)
- Gradients of any kind
- Emoji in UI copy
- `bg-opacity-*` overlays on images
- Generic "Lorem ipsum" placeholder text
- Shadow-2xl or excessive depth
- Animated backgrounds or parallax
- More than one CTA per section
- Color that isn't in the token table above
- Stock photo hero images without brand context
- "Leer más" buttons that go nowhere
- Any border-radius on buttons (they are always square)

---

## 12. Accessibility Minimums

- Color contrast: 4.5:1 for body text, 3:1 for large text (WCAG AA).
- All interactive elements have visible focus states (2px `primary-light` outline).
- Images have descriptive `alt` text in Spanish.
- Skip-to-content link as first focusable element.
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- ARIA landmarks on all major regions.
- Form inputs have associated `<label>` elements.
- Reduced-motion media query on all animations.

---

*Generated by brand-architect agent. System: BMW structural hybrid + Lubo Taller brand identity.*
