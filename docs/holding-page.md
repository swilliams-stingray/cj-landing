# TCJ Holding Page — Implementation Guide

A standalone landing page to go live before the full site launches. Minimal, elegant, and on-brand.

---

## Layout (top to bottom)

```
┌─────────────────────────────────────────┐
│              (white space)              │
│                                         │
│              [ CJ LOGO ]                │
│       THE CAYMANIAN JOURNAL             │
│    Fearless. Fair. Independent.         │
│                                         │
│          ─── LAUNCHING SOON ───         │
│                                         │
│         [ Promo Video Embed ]           │
│         (optional — add when ready)     │
│                                         │
│         [FB] [X] [IG] [YT] [LI]        │
│                                         │
├─────────────────────────────────────────┤
│  [Stingray Logo]  © 2026 TCJ           │
└─────────────────────────────────────────┘
```

---

## Design Specs

### Colours

| Token           | Light          | Dark           |
|-----------------|----------------|----------------|
| Background      | `#FFFFFF`      | `#1A1A1A`      |
| Surface (footer)| `#F8F7F4`      | `#242424`      |
| Text primary    | `#1A1A1A`      | `#E8E6E1`      |
| Text secondary  | `#666666`      | `#999999`      |
| Border          | `#E5E5E0`      | `#333333`      |
| Accent navy     | `#1A2E4F`      | `#4A8FD4`      |

### Typography

| Element          | Font                  | Weight | Style                              |
|------------------|-----------------------|--------|------------------------------------|
| Masthead title   | Old Standard TT       | 700    | Uppercase, wide tracking (0.15em)  |
| Tagline          | Marion Regular        | 400    | Wide tracking (0.2em)              |
| "Launching Soon" | Times New Roman       | 700    | Uppercase, letter-spacing 0.3em   |
| Social labels    | Inter / system sans   | 400    | —                                  |

**Font sources:**
- Old Standard TT: Google Fonts (`https://fonts.googleapis.com/css2?family=Old+Standard+TT:wght@400;700&display=swap`)
- Marion Regular: Self-hosted — `/font/local/Marion-Regular.woff2` (fallback `.ttf`)
- Times New Roman: System font
- Inter: Google Fonts (`https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap`)

### Logo

There is no separate logo image file. The current site generates the "CJ" mark dynamically. For the holding page, either:

1. **Reproduce the CJ mark in CSS/SVG** — navy (`#1A2E4F`) rounded square with white "CJ" in Old Standard TT Bold, or
2. **Export a static PNG/SVG** from the existing design for simplicity

Below the mark, display the full masthead text:

```
THE CAYMANIAN JOURNAL
```
Old Standard TT Bold, uppercase, tracked wide.

---

## Section Details

### 1. Hero / Centre Block

- Vertically and horizontally centred on viewport (`min-h-screen`, flexbox)
- CJ logo/mark at top (~80–120px)
- Masthead: `THE CAYMANIAN JOURNAL` — Old Standard TT Bold, ~2rem, uppercase, tracking 0.15em
- Tagline: `Fearless. Fair. Independent.` — Marion Regular, ~1rem, tracking 0.2em, text-secondary colour
- Divider: thin horizontal rule (~80px wide, border-color)
- **LAUNCHING SOON** — Times Bold, ~1.5rem, uppercase, tracking 0.3em, accent-navy colour
- All items stacked vertically with comfortable spacing (~2rem gaps)

### 2. Promo Video (Optional)

- Placeholder area below "Launching Soon", hidden until a video URL is provided
- When ready, embed as a responsive `<iframe>` or `<video>` element
- Suggested max-width: `640px`, 16:9 aspect ratio
- Example embed:
  ```html
  <div style="max-width:640px; margin:0 auto; aspect-ratio:16/9;">
    <iframe src="VIDEO_URL" width="100%" height="100%"
            frameborder="0" allowfullscreen
            style="border-radius:8px;"></iframe>
  </div>
  ```

### 3. Social Media Icons

- Row of icons, centred, with `gap: 1.5rem`
- Icon size: 24×24px, text-secondary colour, hover → text-primary
- Use inline SVGs (same approach as the main site footer)

| Platform  | URL (update with real handles)                |
|-----------|-----------------------------------------------|
| Facebook  | `https://www.facebook.com/CaymanianJournal`   |
| X/Twitter | `https://x.com/CaymanianJrnl`                 |
| Instagram | `https://www.instagram.com/caymanianjournal`   |
| YouTube   | `https://www.youtube.com/@CaymanianJournal`    |
| LinkedIn  | `https://www.linkedin.com/company/caymanian-journal` |

> **Note:** Replace placeholder URLs above with the actual social handles before going live.

### 4. Stingray Footer

Matches the current site footer bottom bar:

- Light top border (`1px solid #E5E5E0`)
- Background: surface colour (`#F8F7F4` light / `#242424` dark)
- Left side: Stingray Media logo linked to `https://stingraymedia.com`
  - Logo URL: `https://stingraymedia.com/wp-content/uploads/2024/11/logo-2.png`
  - Display: `height: 80px; width: auto;`
- Right side: `© 2026 The Caymanian Journal. All rights reserved.`
- Padding: `1.5rem 1rem`
- Text: `0.75rem`, text-secondary, wide tracking

---

## Responsive Behaviour

| Breakpoint | Adjustments                                      |
|------------|--------------------------------------------------|
| Mobile (<640px) | Masthead font ~1.4rem, video max-width 100%, footer stacks vertically (logo above copyright) |
| Tablet (640–1024px) | Default sizing works                      |
| Desktop (>1024px) | Masthead font ~2.5rem, comfortable spacing  |

---

## Implementation Options

### Option A: Static HTML (fastest to deploy)

Single `index.html` file with inline CSS. No build step. Deploy to any static host (Vercel, Netlify, S3, GitHub Pages).

```
holding-page/
  index.html      ← everything inline
  font/
    Marion-Regular.woff2
    Marion-Regular.ttf
```

### Option B: Within the Next.js app

Add a route like `src/app/(holding)/page.tsx` that renders the holding page. Set it as the root route temporarily, moving the current homepage. Uses existing font setup from `src/lib/fonts.ts`.

---

## Dark Mode

Support via `prefers-color-scheme` media query (no toggle needed for a holding page). Use the CSS custom properties listed in the colours table above.

```css
:root {
  --bg-primary: #FFFFFF;
  --bg-surface: #F8F7F4;
  --text-primary: #1A1A1A;
  --text-secondary: #666666;
  --border-color: #E5E5E0;
  --accent-navy: #1A2E4F;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1A1A1A;
    --bg-surface: #242424;
    --text-primary: #E8E6E1;
    --text-secondary: #999999;
    --border-color: #333333;
    --accent-navy: #4A8FD4;
  }
}
```

---

## Checklist

- [ ] Export or create CJ logo mark (PNG/SVG)
- [ ] Confirm actual social media URLs
- [ ] Host Marion font files (or bundle inline as base64)
- [ ] Deploy holding page
- [ ] Add promo video embed when ready
- [ ] Swap holding page for full site at launch
