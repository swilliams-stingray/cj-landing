# The Caymanian Journal - Styling & Theme Guide

> Reference document for the current styling system. Review before making visual changes to avoid breaking established patterns.

---

## 1. Technology Stack

| Layer | Tool | Notes |
|-------|------|-------|
| CSS Framework | **Tailwind CSS v4** | CSS-based config via `@theme inline {}` in `globals.css` — **no `tailwind.config.ts`** |
| Fonts | `next/font/google` + `next/font/local` | Configured in `src/lib/fonts.ts` |
| Dark Mode | `next-themes` v0.4.6 | Uses `class` attribute strategy, default theme is `light` |
| PostCSS | Standard `postcss.config.mjs` | — |

---

## 2. Typography System

### Font Families

| Purpose | Font | CSS Variable | Tailwind Class | Source |
|---------|------|-------------|----------------|--------|
| **Masthead** (newspaper name) | Old Standard TT Bold | `--font-old-standard` | `.masthead-title` (custom CSS) | Google Fonts (400, 700) |
| **Tagline** ("Fearless. Fair. Independent.") | Marion Regular | `--font-marion` | `.masthead-tagline` (custom CSS) | Local WOFF2 (`public/font/local/Marion-Regular.woff2`) |
| **Headlines** (h1-h4) | Times New Roman | `--font-serif` | `font-serif` | System font |
| **Body text** | Roboto (400, 500, 700) | `--font-body` → `--font-roboto` | Inherited from `<body>` | Google Fonts |
| **UI/Meta text** (nav, labels, dates, bylines) | Inter | `--font-inter` | `font-sans` | Google Fonts |

### Font Application in `layout.tsx`

```
<body className="${oldStandardTT.variable} ${marion.variable} ${inter.variable} ${roboto.variable} antialiased ...">
```

CSS variables are set on `<body>`. The body font is set via `globals.css` (`body { font-family: var(--font-body) }`), so all text inherits Roboto unless explicitly overridden by `font-serif` (headings) or `font-sans` (UI elements).

### Changing the Body Font

To swap the body font site-wide, update only `--font-body` in the `@theme inline {}` block in `globals.css`. All body text, article prose, and paragraphs inherit from this single variable — no component changes needed.

### Heading Styles (Global CSS)

| Element | Weight | Line Height | Letter Spacing |
|---------|--------|-------------|----------------|
| `h1` | 700 | 1.1 | -0.03em |
| `h2` | 700 | 1.15 | -0.02em |
| `h3` | 700 | 1.2 | -0.015em |
| `h4` | 700 | 1.25 | -0.01em |

All headings use `font-serif` (Times New Roman) and tighten tracking at larger sizes — a newspaper typography convention.

### Prose / Article Body (`.prose-article`)

- Font: Inherited from `<body>` (Roboto) — no explicit `font-family` set, so changing `--font-body` automatically updates article text
- Size: `1.125rem` (18px)
- Line height: `1.7`
- Letter spacing: `0.005em`
- Paragraph margin: `1.15em`
- Links: navy color, underlined, 2px offset
- Blockquotes: 3px left border (navy), italic, secondary color
- Inline headings: h2 = 1.5rem, h3 = 1.25rem

---

## 3. Color System

### Light Mode (`:root`)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#FFFFFF` | Page background |
| `--bg-surface` | `#F8F7F4` | Cards, footer, surfaces (warm off-white) |
| `--text-primary` | `#1A1A1A` | Body text, headings |
| `--text-secondary` | `#666666` | Meta text, dates, excerpts |
| `--border-color` | `#E5E5E0` | All borders and dividers |
| `--accent-navy` | `#1A2E4F` | Primary accent — links, focus rings, active pagination, CTA buttons, selection highlight |
| `--accent-forest` | `#2D5016` | Business/Finance, Environment, Community, Sports sections |
| `--accent-burgundy` | `#6B2737` | Opinion section, pull quotes |
| `--accent-black` | `#1A1A1A` | Law & Courts, World sections |

### Dark Mode (`.dark`)

| Token | Value | Notes |
|-------|-------|-------|
| `--bg-primary` | `#1A1A1A` | |
| `--bg-surface` | `#242424` | |
| `--text-primary` | `#E8E6E1` | Warm off-white, not pure white |
| `--text-secondary` | `#999999` | |
| `--border-color` | `#333333` | |
| `--accent-navy` | `#4A8FD4` | Lightened for contrast |
| `--accent-forest` | `#5CAA5C` | Lightened for contrast |
| `--accent-burgundy` | `#C4576A` | Lightened for contrast |
| `--accent-black` | `#E8E6E1` | Inverted to light |

### Tailwind Token Mapping

Colors are double-mapped through `@theme inline {}`:

```css
--color-accent-navy: var(--accent-navy);
--color-bg-primary: var(--bg-primary);
/* etc. */
```

This enables Tailwind utility classes like `text-accent-navy`, `bg-bg-surface`, `border-border`.

### Section Color Assignments

| Color Key | Tailwind Class | Sections |
|-----------|---------------|----------|
| `navy` | `text-accent-navy` | News, Lifestyle, Caribbean, Sister Islands |
| `forest` | `text-accent-forest` | Business & Finance, Real Estate, Environment, Community, Sports |
| `burgundy` | `text-accent-burgundy` | Opinion, Technology & Science |
| `black` | `text-accent-black` | Law & Courts, World |

Used for section headers, active nav indicators, and section labels via `colorMap` objects in components.

---

## 4. Layout System

### Container

- **Max width:** `max-w-7xl` (1280px) — used consistently across all page containers, nav, masthead, footer
- **Padding:** `px-4` on all containers
- **Centering:** `mx-auto`

### Page Grid (PageWithSidebar)

```
grid grid-cols-1 lg:grid-cols-12 gap-8
├── Main content: lg:col-span-8 lg:pr-8
└── Sidebar: lg:col-span-4 lg:border-l lg:border-border lg:pl-6
```

The sidebar has a left border divider on desktop. Same 8/4 split used on homepage hero and article detail pages.

### Article Body Width

Article body text is constrained to `max-w-[680px]` within the 8-column main area for optimal reading line length.

---

## 5. Component Patterns

### Global Layout Structure (`layout.tsx`)

```
<body>
  <ThemeProvider>
    <div className="min-h-screen flex flex-col">
      <TopBar />          — utility links (Classifieds, Events) + theme toggle
      <Masthead />        — newspaper title + tagline + date
      <MainNav />         — section navigation, sticky
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  </ThemeProvider>
</body>
```

### TopBar

- `border-b border-border bg-bg-primary`
- Right-aligned items: `flex items-center justify-end gap-4 py-1`
- Text: `text-xs font-sans`
- Links: `text-text-secondary`, active = `text-text-primary font-semibold`

### Masthead

- Bottom border: `border-b-[3px] border-double border-border`
- Padding: `py-4 md:py-6`
- Title: `.masthead-title`, uppercase, `tracking-[-0.04em]`, responsive sizes `text-2xl md:text-4xl lg:text-5xl`
- Tagline: `.masthead-tagline`, `text-[11px] md:text-xs`, uppercase, `tracking-[0.15em]`, secondary color
- Date: `text-[10px] font-sans`, uppercase, `tracking-[0.12em]`, secondary color

### MainNav (Sticky Navigation)

- **Desktop:** `hidden lg:flex`, centered, `text-[13px] font-sans`
- **Sticky:** `sticky top-0 bg-bg-primary z-50`, shadow on scroll
- **Active state:** section color text + semibold + 2px underline indicator
- **Hover:** underline slides in from left (`w-0 group-hover:w-full`)
- **Mobile:** hamburger toggle, slide-down animation (`max-h-[600px]` transition)
- "News" section is **hidden from nav** (via `hiddenFromNav` set)

### Section Headers (SectionStrip, HeroSection, OpinionSidebar)

Consistent pattern across all section headers:

```
<div className="border-t-2 border-accent-{color} pt-3 mb-4">
  <h2 className="font-serif font-bold text-lg text-accent-{color} uppercase tracking-wider">
```

- 2px colored top border
- Font: serif, bold, `text-lg`, uppercase, wide tracking
- "See all" link: `text-[11px]`, uppercase, `tracking-[0.1em]`, arrow animates on hover

### SectionLabel (Reusable UI Component)

```
text-xs font-sans font-bold uppercase tracking-widest text-accent-{color}
```

Used above article titles in cards and detail pages. Linked to section page by default.

### ArticleCard

- Image: `rounded-sm`, hover scale (`scale-105`) + brightness boost, 500ms ease-out transition
- LQIP blur placeholder when available
- Title: `font-serif font-bold leading-tight`, `text-lg` (default) or `text-2xl md:text-3xl` (large)
- Excerpt: `text-text-secondary`, `line-clamp-3`
- Meta row: `text-[11px] font-sans`, author uppercase + middot separator + short date

### ArticleCardCompact

- `py-2.5 border-b border-border last:border-b-0`
- Title: `font-serif font-semibold text-sm leading-snug`
- Date: `text-xs text-text-secondary font-sans`

### Byline

- `text-sm text-text-secondary font-sans`
- Author name: `font-medium text-text-primary`
- Date separator: `|` in border color

### ShareButtons

- Circular: `p-2 rounded-full border border-border`
- Color: `text-text-secondary hover:text-text-primary hover:border-text-secondary`
- Copy confirmation: tooltip with inverted colors

### PullQuote

- `border-l-4 border-accent-burgundy`
- Quote text: `font-serif text-xl md:text-2xl italic leading-relaxed`
- Attribution: `text-sm text-text-secondary font-sans`

### InfoBox

- `rounded-lg p-5`
- Three styles: `default` (surface bg), `highlight` (navy tint), `statistics` (forest tint)
- Title: `font-serif font-bold text-lg`
- Content: `text-sm font-sans text-text-secondary`

### FigureBlock

- Full width images at 960px
- Caption: `text-sm text-text-secondary font-sans`
- Credit in lighter opacity

### AiSummaryCard

- `rounded-lg border border-border bg-bg-surface px-4 py-3`
- Label: `text-xs font-sans font-semibold uppercase tracking-wider text-text-secondary`
- Content: bullet list, `text-sm`

### WeekAhead (Events Widget)

- `bg-bg-surface border border-border rounded-lg p-5`
- Date column: day abbreviation (xs, uppercase) + large day number
- Event title: `font-medium font-sans`

### CourtsPreview (Table)

- `text-sm font-sans`
- Header: `border-b-2`, `text-xs text-text-secondary uppercase tracking-wider`
- Outcome badges: colored backgrounds (red/green/gray) with dark mode variants

### Pagination

- `flex items-center justify-center gap-1`
- Page buttons: `min-w-[36px] h-9`, `text-sm font-sans rounded`
- Active: `bg-accent-navy text-white font-semibold`
- Disabled: `text-text-secondary/40 cursor-not-allowed`

### Skeleton Loading

- Base: `animate-pulse rounded bg-border/50`
- Cards mirror the real component dimensions

### Divider

- Simple `<hr>`: `border-t border-border my-8`

### Footer

- `border-t-2 border-border bg-bg-surface mt-16`
- 4-column grid on desktop, single column on mobile
- Newsletter input: `border border-border rounded bg-bg-primary`, focus ring = navy
- CTA button: `bg-accent-navy text-white rounded`, hover = 85% opacity, active scale
- Social icons: `w-5 h-5`, secondary color with hover
- Bottom bar: Stingray Media logo, copyright, Privacy/Terms links

---

## 6. Interactive Patterns

| Pattern | Implementation |
|---------|---------------|
| **Image hover** | `group-hover:scale-105 group-hover:brightness-[1.03]`, 500ms ease-out |
| **Link hover** | `hover:underline decoration-1 underline-offset-2` (articles), `hover:text-text-primary` (meta links) |
| **Nav underline** | CSS width transition `w-0 group-hover:w-full`, 200ms |
| **Button press** | `active:scale-[0.97]` on CTA buttons |
| **Scroll shadow** | Nav gets `shadow-md` when scrolled past 10px |
| **Mobile menu** | `max-h` + `opacity` transition, 300ms ease-in-out |
| **Focus visible** | `outline: 2px solid var(--accent-navy)`, `outline-offset: 2px` |
| **Text selection** | Navy background, white text |

---

## 7. Spacing Conventions

| Context | Pattern |
|---------|---------|
| Page top padding | `py-6` (article), `py-8` (homepage) |
| Section spacing | `py-8` between sections, `<Divider>` (`my-8`) between strips |
| Card image to text | `mb-3` |
| Section label to title | `mb-1.5` |
| Title to excerpt | `mb-1.5` |
| Excerpt to meta | `mt-2.5` |
| Footer top margin | `mt-16` |
| Footer internal | `py-12`, grid `gap-8` |

---

## 8. Print Styles

Defined at the bottom of `globals.css`:

- Hides: nav, footer, share buttons, theme toggle, `.no-print`
- Forces: white background, black text, 12pt font
- Links lose color and underlines
- Headings avoid page breaks after
- Images capped at 100% width

---

## 9. Accessibility Notes

- `focus-visible` outlines on all interactive elements (navy, 2px, offset)
- `aria-label` on icon-only buttons (search, share, theme toggle)
- `aria-expanded` on mobile menu toggle
- `aria-current="page"` on active pagination
- `role="switch"` + `aria-checked` on theme toggle
- Semantic HTML: `<article>`, `<nav>`, `<aside>`, `<figure>`, `<figcaption>`, `<time>`

---

## 10. Key Files Reference

| File | Purpose |
|------|---------|
| `src/app/globals.css` | Tailwind v4 theme, CSS variables, typography globals, prose styles, print styles |
| `src/lib/fonts.ts` | Font loading (Old Standard TT, Marion, Inter) |
| `src/app/layout.tsx` | Root layout, font variable injection, global structure |
| `src/components/layout/Masthead.tsx` | Newspaper header |
| `src/components/layout/MainNav.tsx` | Sticky section nav with color maps |
| `src/components/layout/TopBar.tsx` | Utility bar |
| `src/components/layout/Footer.tsx` | Site footer |
| `src/components/layout/PageWithSidebar.tsx` | 8/4 grid layout |
| `src/components/layout/ThemeToggle.tsx` | Dark/light switch |
| `src/components/ui/SectionLabel.tsx` | Colored section label |
| `src/components/ui/Divider.tsx` | Horizontal rule |
| `src/components/ui/Byline.tsx` | Author + date display |
| `src/components/ui/Pagination.tsx` | Page navigation |
| `src/components/article/ArticleCard.tsx` | Standard article card |
| `src/components/article/ArticleCardCompact.tsx` | Text-only compact card |
| `src/components/article/ArticleBody.tsx` | Portable Text renderer |
| `src/components/article/PullQuote.tsx` | Styled blockquote |
| `src/components/article/InfoBox.tsx` | Aside box (3 variants) |
| `src/components/article/FigureBlock.tsx` | Image with caption |
| `src/components/article/AiSummaryCard.tsx` | AI summary display |
| `src/components/article/ShareButtons.tsx` | Social share row |
| `src/components/article/RelatedArticles.tsx` | Related articles list |
| `src/components/home/HeroSection.tsx` | Homepage hero (business + opinion) |
| `src/components/home/SectionStrip.tsx` | 4-column section row |
| `src/components/home/OpinionSidebar.tsx` | Opinion sidebar panel |
| `src/components/home/CourtsPreview.tsx` | Courts table |
| `src/components/home/WeekAhead.tsx` | Events widget |
| `src/components/skeletons/Skeleton.tsx` | Loading placeholders |
