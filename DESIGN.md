# DESIGN.md — Lubo Taller

> Direction: **"Taller limpio"**, the clean, honest workshop.
> This replaces the previous BMW/heritage system (cream + brown + Inter). Do not reuse any of its tokens.
> Read this whole file before writing or changing any UI. If a choice isn't covered here, pick the quieter option.
>
> **v2 (Oct 2026):** adds the "Cómo trabajamos" scroll story (§6.4, §9, §8.2). Everything else in v1 still applies.

---

## 1. The business (facts only)

| | |
|---|---|
| Name | Lubo Taller (legal: Lubo Garage S.L.) |
| What | General mechanics workshop, multi-brand everyday cars and vans |
| Services | Diagnosis, maintenance, repair, pre-ITV checks |
| Address | C/ Capitán Francisco Sánchez 34, 28100 Alcobendas, Madrid |
| Phone / WhatsApp | 654 463 966 (`tel:+34654463966`, `https://wa.me/34654463966`) |
| Email | lubogaragesl@gmail.com |
| Hours | Mon–Fri 9:00–14:00 and 15:30–19:00. Sat–Sun closed. **(Google shows the lunch break. Confirm with the owner and use the same hours everywhere, including the "Abierto ahora" logic in `Hero.astro` and the JSON-LD.)** |
| Google | 4.9★, 60 reviews (update the numbers before launch) |
| Social | instagram.com/lubotaller, tiktok.com/@lubo.taller, Facebook "Lubo-TallerGarage" |
| Team | Small family workshop: mechanics, a helper, and a receptionist. 2 lifts. |

### Claims NOT confirmed. Do not publish until the owner confirms

- "40+ años de experiencia" (only appears on the logo)
- "Tres generaciones de mecánicos"
- Any number of "vehículos reparados"

### Copy now on the site that the owner must confirm before launch

- **"Desde 1984"** (hero badge, added Oct 2026 at Roberto's request; it matches the "Est. 1984" on the logo). Remove the badge if the owner can't confirm it.
- "Te enseñamos la avería antes de tocar nada." / "Presupuesto cerrado antes de empezar." / "Si no hace falta cambiarlo, no lo cambiamos."
- "0 piezas cambiadas sin preguntarte" (intro figure in Cómo trabajamos)
- "Si al desmontar aparece algo más, te llamamos antes de seguir." (step 04)
- "Te avisamos cuando está y te explicamos qué se ha hecho." (step 06)
- "Cuéntanoslo por WhatsApp, con una foto o un audio si quieres." (they accept photos/audio on WhatsApp)
- The 3 review texts must match Google word for word.

If unconfirmed, leave them out. Never invent stats, years or counters.

### What customers actually say (the brand comes from here)

1. **Honest:** they explain the real problem and don't overcharge.
2. **Fast:** car ready the same day.
3. **Clean workshop.**
4. **Friendly reception, good value.**

Every section should support one of these four. If it doesn't, cut it.

---

## 2. Visual concept

The site is about the **workshop itself**: bright, ordered, clean, under the hexagonal LED ceiling. It is not a retro "heritage" brand.

- The **logo** (rust/cream vintage badge) is used as a logo only. The site does **not** copy its vintage look: no textures, no distressed effects, no parchment backgrounds.
- The base is **cool and light** (concrete grey, workshop white, mechanic's navy).
- The **rust** from the logo appears in one place: the actions that make the phone ring (call / WhatsApp). That's where the boldness goes.
- **Real photos** carry the personality. The hex-light ceiling with a car on the lift is the signature image.
- **Workshop-manual line drawings** (§8.2) are the one graphic language. They explain; they don't decorate.

---

## 3. Color

### 3.1 Tokens

| Token | Hex | Name | Usage |
|---|---|---|---|
| `--navy` | `#1E2A44` | Azul mahón | Headings on light, dark bands, footer, line drawings |
| `--concrete` | `#E8E9E5` | Hormigón | Page background |
| `--surface` | `#F8F8F6` | Blanco taller | Cards, raised surfaces, drawing sheet, text on dark |
| `--ink` | `#2A2C30` | Grafito | Body text |
| `--muted` | `#5E626A` | Gris llave | Secondary text, captions, metadata, drawing dimension lines |
| `--rust` | `#9A3F1E` | Óxido | Primary CTA background, phone number, focus ring |
| `--rust-dark` | `#7E3216` | Óxido oscuro | CTA hover/pressed |
| `--brass` | `#D8B676` | Latón | Review stars and the logo lockup only |
| `--on-navy-muted` | `#C9CDD6` | | Secondary text on navy |
| `--line` | `#D3D5D0` | | Borders, dividers, drawing grid |

### 3.2 Checked contrast (WCAG)

| Pair | Ratio |
|---|---|
| white on `--rust` | 6.8 : 1 ✅ |
| `--ink` on `--concrete` | 11.5 : 1 ✅ |
| `--navy` on `--concrete` | 11.7 : 1 ✅ |
| `--surface` on `--navy` | 13.4 : 1 ✅ |
| `--muted` on `--concrete` | 5.0 : 1 ✅ |
| `--rust` on `--concrete` (text/links) | 5.6 : 1 ✅ |
| `--brass` on `--navy` | 7.4 : 1 ✅ |

### 3.3 Rules

- **Rust is rare.** Main CTA, the big phone number, the focus ring. Never as a section background, for decoration, or inside the drawings.
- **Brass** is for stars and the logo only.
- **No gradients, no glassmorphism, no colored shadows.**
- **No cream / beige / warm off-white backgrounds.** The background is `--concrete` or `--surface`.
- **No pure black.** The darkest color is `--navy`.
- Dark mode is not required.

---

## 4. Typography

### 4.1 Families (self-hosted)

| Role | Family | Weights |
|---|---|---|
| Display: headlines, phone number, rating, big figures, drawing labels | **Barlow Condensed** | 600, 700 |
| Body + UI | **Barlow** | 400, 500, 600 |

The fonts are **self-hosted** in `public/fonts/` (latin subset, woff2, `@font-face` in `global.css`), not loaded from Google. Faster, and no visitor IP goes to Google (GDPR). Don't re-add the Google Fonts `<link>`.

```css
--font-display: "Barlow Condensed", "Arial Narrow", sans-serif;
--font-body: "Barlow", system-ui, -apple-system, "Segoe UI", sans-serif;
```

**Do not use Inter**, or any other font, anywhere.

### 4.2 Scale (fluid) — utility classes in `global.css`

| Class | Size | Line height | Font / weight | Use |
|---|---|---|---|---|
| `.t-display` | `clamp(2.75rem, 7vw, 5rem)` | 1.0 | Condensed 700 | Hero headline, act titles |
| `.t-phone` | `clamp(2.25rem, 6vw, 4rem)` | 1.0 | Condensed 700, `--rust` | The phone number |
| `.t-h2` | `clamp(2rem, 4vw, 3rem)` | 1.05 | Condensed 700 | Section titles |
| `.t-h3` | `1.375rem` | 1.2 | Barlow 600 | Card / service / step titles |
| `.t-body-lg` | `1.1875rem` | 1.55 | Barlow 400 | Hero subtitle, intros |
| body | `1.0625rem` | 1.6 | Barlow 400 | All body copy |
| `.t-small` | `0.875rem` | 1.5 | Barlow 500 | Captions, legal, review author |

Graphic numerals (act numbers, intro figures, pull quotes) may go larger than `display`. They are the site's illustrations in type.

### 4.3 Rules

- Headings in **sentence case**. No ALL-CAPS headings, eyebrows or labels.
- **No eyebrow labels** above headings. The heading does the job. (Step numbers "01–06" on story cards are part of the card, not eyebrows.)
- **Don't highlight a single word** in a headline with color, italic or bold.
- Max line length: **65ch** for body.
- Letter-spacing: `-0.01em` on display/h2, `0` elsewhere.
- Numbers that matter (phone, 4.9★, hours, 2 / 1 / 0, 3 mm) are set big in Barlow Condensed.

---

## 5. Spacing and layout

### 5.1 Spacing scale (8px base) — CSS vars in `:root`

`--s1: 4px` · `--s2: 8px` · `--s3: 16px` · `--s4: 24px` · `--s5: 32px` · `--s6: 48px` · `--s7: 72px` · `--s8: 112px`

- Section padding: `--s7` desktop, `--s6` mobile (`.section`).
- Card padding: `--s4` (`--s5` for story cards on desktop).
- Use tokens only. No magic numbers.

### 5.2 Grid

- `.container`: `max-width: 1160px; margin-inline: auto; padding-inline: clamp(16px, 4vw, 32px);`
- Mobile-first. Most visitors are on a phone, often with a car problem right now.
- **Left-aligned** text throughout.
- Asymmetric splits: 7/5 (hero, services, reviews, intro), 4/8 (story: cards / drawing), 5/7 (contact, close).

### 5.3 Shape

- Radius: `6px` (`--radius`) on buttons, cards, photos inside cards. `0` on full-bleed photos.
- Shadows: none. Separate surfaces with `--line` borders or a background change.

---

## 6. Page structure (single page + legal pages)

Each section has **one idea and at most one action**.

1. **Header (sticky, 61px = `--header-h`)**: logo, anchors (Servicios · Cómo trabajamos · Opiniones · Contacto, desktop only), phone, WhatsApp. On mobile: logo + phone icon button + WhatsApp icon button, both 48px.
2. **Hero**: real photo (7) + navy panel (5). On the photo, bottom-left: a small navy plate with the 3D logo token and "Desde 1984" (never text straight on the photo). Headline, sub, WhatsApp CTA, phone as text link, and a facts row: ★ 4,9 Google + live "Abierto / Cerrado" status (Europe/Madrid), falling back to plain hours without JS.
3. **Servicios ("Qué hacemos")**: Diagnosis as the featured card with photo (7), Mantenimiento / Reparación / Pre-ITV as a list with thumbnails (5). Shown once.
4. **Cómo trabajamos (`#nosotros`)**: the scroll story. See §6.4.
5. **Opiniones**: navy. One featured review set large in Condensed, two smaller. Link to all reviews on Google. No carousel.
6. **Contacto ("Ven a vernos")**: big phone, WhatsApp, hours table with the lunch break, address + "Cómo llegar", email, map.
7. **Footer**: navy. Logo, contact, social, legal links, © Lubo Garage S.L.

### 6.4 Cómo trabajamos — the scroll story

Structure, in order:

1. **Intro** (concrete): "Así pasa un coche por Lubo" + who we are in two sentences (confirmed facts only) + three big figures: **2** elevadores · **1** presupuesto cerrado · **0** piezas cambiadas sin preguntarte.
2. **Act opener 1** (navy, giant numeral "1"): "Lo que tiene".
3. **Scrolly act 1** (steps 01–03): Llega → Diagnosis → Te enseñamos la avería (the worn pad, "3 mm").
4. **Pull quote**: one line from a real Google review, large Condensed.
5. **Act opener 2** (navy, "2"): "Y lo que no". The two acts mirror the hero headline.
6. **Scrolly act 2** (steps 04–06): Presupuesto cerrado → Lo que está bien se queda → Listo el mismo día.
7. **Close**: real photo + "¿Qué le pasa al tuyo?" + WhatsApp CTA (the section's one action).

Mechanics:
- Desktop: cards in the left 4 columns, the drawing sheet sticky in the right 8. Inactive cards dim to 35%.
- Mobile: the drawing sheet is sticky under the header (≈56vh); cards scroll up beneath it and over it.
- A chapter rail (01–06) sits in the left margin at ≥1320px (labels at ≥1600px). Below that, a 3px navy progress bar under the header. Both show only while a scrolly act is on screen.
- The drawing is `aria-hidden`; the cards carry all meaning. Without JS, each act shows its final drawing.

The story is a **demonstration of the four brand pillars with one example car**. Don't add chapters that aren't a real step of how the workshop works.

**Removed:** stat counters, the duplicated services section, "40 years / three generations" copy, the BMW-style "trust bar", the separate "Así trabajamos" block (now part of the story).

---

## 7. Components

### Buttons (`.btn` + variant in `global.css`)

| Variant | Background | Text | Border | Hover |
|---|---|---|---|---|
| `.btn-primary` (WhatsApp/Call) | `--rust` | white | none | `--rust-dark` |
| `.btn-secondary` | transparent | `--navy` | 2px `--navy` | `--navy` bg, `--surface` text |
| `.btn-on-dark` | `--surface` | `--navy` | none | `--concrete` |
| `.btn-ghost-dark` | transparent | `--surface` | 2px `--surface` | `--surface` bg, `--navy` text |

- Barlow 600, 1.0625rem, sentence case. **No "→" arrows**.
- Min height 48px. Padding `14px 24px`.
- Label says exactly what happens.
- Focus: `outline: 3px solid var(--rust); outline-offset: 3px;`

### Cards
- `--surface`, `1px solid var(--line)`, radius 6px, padding `--s4`. Photo on top (4:3) where used. No icons-in-circles.

### Review
- Stars in `--brass`, quote in Condensed (featured) or `body-lg`, author `small` muted, source "Google".

---

## 8. Imagery

### 8.1 Photos
- **Real photos of this workshop only.** No stock, no AI-generated cars or mechanics.
- Export as WebP, max 1600 for hero, 900 for cards. Always `width`/`height` and Spanish `alt` describing the scene **as it actually is**.
- **We need more photos** (see §12): the current hero is only 1024px wide, and there is no photo of a mechanic with a customer or of handing back keys.

### 8.2 Line drawings ("láminas")
- Style: workshop-manual technical drawing. Navy strokes (2.25 main, 1.25 thin, 3.5 emphasis), muted dashed dimension/centre lines, on a `--surface` sheet with a faint `--line` 20px grid, a `--line` frame and a small title block (sheet number + name).
- Labels in Barlow Condensed 600 (navy) or Barlow 500 (muted). Sentence case.
- Only navy, muted, line, surface. No rust, no brass, no fills except `--surface` and a navy hatch for cut material.
- Drawings show real mechanical things (disc, pad, caliper, OBD port, key) with plausible, generic values. Never business stats.
- Built as inline SVG in `src/components/story/`. Elements that draw on use `pathLength="1"` + class `draw`.

---

## 9. Motion

Three moments only:

1. The hero text panel fades in on load (300ms).
3. **The logo token** in the hero badge (`LogoToken.astro`, `public/logo-spin.glb`): rests face-forward, then makes one full coin turn every 6 s. three.js loads only after page load; flat PNG with reduced motion, without WebGL, or before it loads. Pauses off-screen.
2. **The Cómo trabajamos story** is scroll-scrubbed (GSAP ScrollTrigger, `src/scripts/story.ts`): lines draw, parts explode/swap, labels fade. The motion is tied to the reader's scroll, never autoplay, and always explains something.

- **No fade-and-slide-up on sections, no scroll-triggered counters, no hover lift on cards**, no parallax.
- `prefers-reduced-motion: reduce`: the story jumps between finished drawings per step (no tweening); the hero fade is off.

---

## 10. Copy rules

- Spanish (Spain), **tú** form, plain and direct, like the mechanic talking at the counter.
- Specific beats generic: "Coche listo el mismo día en la mayoría de revisiones" beats "Servicio rápido y eficiente".
- Banned: "el mejor taller", "quizás el mejor", "última generación", "soluciones integrales", "transforma", "potencia", "calidad garantizada", "tu taller de confianza".
- No exclamation marks in headings.
- Don't state anything the owner hasn't confirmed (see §1).

---

## 11. SEO / local basics

- `<title>`: "Taller mecánico en Alcobendas | Lubo Taller"
- Meta description mentions Alcobendas, diagnosis/maintenance/repair, presupuesto, phone.
- JSON-LD `AutoRepair` with address, telephone, openingHoursSpecification (with lunch break), `aggregateRating` only if kept in sync with Google. **Add `geo` coordinates.**
- Canonical: `https://lubotaller.es`.

---

## 12. Pre-launch checklist

- [ ] No Inter, no Google Fonts link, no cream/beige backgrounds, no gradients
- [ ] Rust appears only on CTAs / phone / focus
- [ ] No ALL-CAPS labels, no eyebrows, no "→" in buttons
- [ ] No counters, no unconfirmed claims (1984, 40 años, generaciones)
- [ ] Owner confirmed every line in §1 "Copy now on the site…"
- [ ] Review texts match Google word for word
- [ ] Services section appears once
- [ ] Same hours everywhere (with lunch break) and matching Google
- [ ] Phone + WhatsApp reachable in one tap from every screen on mobile
- [ ] All photos real and from this workshop; hero photo ≥1600px wide
- [ ] Legal pages exist (`/aviso-legal`, `/politica-de-privacidad`, `/politica-de-cookies`) — currently 404
- [ ] Map embed checked in a real browser; cookie notice if the Google Maps iframe sets cookies
- [ ] Lighthouse accessibility ≥ 95, mobile tested at 375px
- [ ] Reduced motion respected (story jumps, no tweening)
