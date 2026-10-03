<div align="center">

# Afaq Al Barakha Investment

**Premium marketing website for a Dubai-based investment firm**

Cinematic motion · Scroll-driven storytelling · Production-ready enquiry flow

![Next.js](https://img.shields.io/badge/Next.js-App_Router-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-Framer-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-Email-000000?style=for-the-badge&logo=resend&logoColor=white)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Pages & Sections](#pages--sections)
- [Design System](#design-system)
- [Motion System](#motion-system)
- [Editing Content](#editing-content)
- [Assets](#assets)
- [Enquiry Form & Email](#enquiry-form--email)
- [SEO & Accessibility](#seo--accessibility)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Conventions](#conventions)

---

## Overview

A five-page marketing site built to feel as considered as the brand it represents. Every section is choreographed: headings reveal word by word, images open behind curtains, a timeline draws itself as you scroll, and cards respond to the cursor in 3D.

| Page | Route | Highlights |
|---|---|---|
| **Home** | `/` | Shared rotating arc, animated stat cards, split-screen reveal, scroll-drawn approach timeline, slanted emirate panels |
| **About Us** | `/about` | Particle wave hero with mouse depth, mission & vision on a split globe, glow-border principle cards |
| **Book a Consultation** | `/enquiry` | Validated form with branded email delivery, live map, accordion FAQ with structured data |
| **Terms & Conditions** | `/terms-and-conditions` | Shared legal layout with reading progress bar |
| **Privacy Policy** | `/privacy-policy` | Shared legal layout with styled lists |

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router)** | Server components, file-based routing, built-in image & font optimisation |
| Language | **TypeScript** | Type-safe content, props and form data |
| Styling | **Tailwind CSS v4** | Design tokens via `@theme`, no config file |
| Animation | **Motion** (`motion/react`) | Scroll-linked values, variants, layout animations, springs |
| Smooth scroll | **Lenis** | Inertial scrolling that drives every scroll animation |
| Forms | **React Hook Form + Zod** | One schema validates both the browser and the API |
| Email | **Resend** (REST API) | Branded HTML enquiry emails, no SDK dependency |
| Font | **Pathway Extreme** via `next/font` | Self-hosted, variable width axis for condensed display type |

---

## Getting Started

> **Requirements:** Node.js 20+ and npm. Commands below are for **PowerShell** on Windows.

```powershell
# 1. Install dependencies
npm install

# 2. Create your local environment file
New-Item .env.local -ItemType File

# 3. Start the dev server
npm run dev
```

Open **http://localhost:3000**.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create an optimised production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |

> **Tip:** if something looks stale after moving files, clear the cache:
> ```powershell
> Remove-Item -Recurse -Force .next; npm run dev
> ```

---

## Environment Variables

Create `.env.local` in the project root. It is git-ignored and must **never** be committed.

```dotenv
# Resend API key (resend.com → API Keys → Sending access)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Inbox that receives enquiries
ENQUIRY_TO_EMAIL=info@afaqalbarakha.com

# Sender shown on enquiry emails (domain must be verified in Resend)
ENQUIRY_FROM_EMAIL="Afaq Website <website@afaqalbarakha.com>"

# Public site URL, used for links inside emails
NEXT_PUBLIC_SITE_URL=https://afaqalbarakha.com
```

| Variable | Required | Notes |
|---|---|---|
| `RESEND_API_KEY` | Yes, for email | Without it, submissions are logged to the terminal instead |
| `ENQUIRY_TO_EMAIL` | Yes, for email | Before domain verification, must be the email your Resend account uses |
| `ENQUIRY_FROM_EMAIL` | After verification | Omit while testing; falls back to `onboarding@resend.dev` |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Defaults to `https://afaqalbarakha.com` |

> Environment variables are read **only at startup**. Restart `npm run dev` after any change.

---

## Project Structure

```
src/
├─ app/
│  ├─ layout.tsx                 # Fonts, metadata, Header, Footer, smooth scroll, MotionConfig
│  ├─ template.tsx               # Page enter transition
│  ├─ globals.css                # Design tokens + reusable utilities
│  ├─ page.tsx                   # Home
│  ├─ about/page.tsx
│  ├─ enquiry/page.tsx
│  ├─ terms-and-conditions/page.tsx
│  ├─ privacy-policy/page.tsx
│  └─ api/enquiry/route.ts       # Form endpoint → Resend
│
├─ components/
│  ├─ layout/                    # Header, MobileMenu, Footer
│  ├─ motion/                    # Reveal, Stagger, TextReveal, CountUp, Parallax, Particles, BigWord
│  ├─ providers/SmoothScroll.tsx # Lenis + scroll reset on route change
│  ├─ ui/                        # icons.tsx, GlowCard.tsx
│  └─ sections/
│     ├─ home/                   # ArcStage, hero/*, Pillars, Opportunities, Services, Approach, WhyChoose, UaeFocus, Consultation
│     ├─ about/                  # AboutHero, AboutIntro, MissionVision, Discipline
│     ├─ enquiry/                # EnquirySection, EnquiryForm, Faq
│     └─ legal/LegalPage.tsx     # Shared Terms / Privacy layout
│
├─ content/legal/                # terms.tsx, privacy.tsx
└─ lib/
   ├─ site.ts                    # ⭐ Navigation, contact details, socials, form options
   ├─ motion.ts                  # Shared easings + variants
   ├─ enquiry-schema.ts          # Zod schema (shared client + server)
   ├─ emails/enquiry-email.ts    # Branded HTML email template
   ├─ use-media-query.ts
   └─ use-smooth-nav.ts          # Smooth in-page anchor navigation
```

---

## Pages & Sections

<details>
<summary><strong>Home</strong></summary>

| Section | Component | Motion |
|---|---|---|
| Shared background | `ArcStage` | One arc ring behind Hero + Pillars, rotates and scales with scroll |
| Hero | `hero/Hero` | Word-mask headline, floating tags, stat cards with count-up, growing bars, filling donut, self-drawing line |
| Pillars | `Pillars` | Cursor-spotlight cards, curtain-reveal office photo with parallax |
| Opportunities | `Opportunities` | Background sweeps in from the left on scroll, parallax suit, cards slide from each side |
| Services | `Services` | Split rows + counter-scrolling masonry columns, curtain + zoom image tiles, animated chart banner |
| Approach | `Approach` | Timeline line drawn by scroll; each step lights up when the line reaches it |
| Why Choose | `WhyChoose` | 3D entrance wave, shared border glow, spring tilt |
| UAE Focus | `UaeFocus` | Count-up stats, slanted emirate panels that morph open |
| Consultation | `Consultation` | Elliptical arc reveal with glowing rim |

</details>

<details>
<summary><strong>About Us</strong></summary>

| Section | Component | Motion |
|---|---|---|
| Hero | `AboutHero` | Particle canvas, mouse-depth parallax, scroll fade |
| Intro | `AboutIntro` | Background image + particles, curtain photo, pillars |
| Mission & Vision | `MissionVision` | Split background sweep, frosted glass cards |
| Discipline | `Discipline` | Shared `GlowCard` grid + curtain photo |

</details>

<details>
<summary><strong>Book a Consultation</strong></summary>

| Section | Component | Notes |
|---|---|---|
| Enquiry | `EnquirySection` + `EnquiryForm` | Giant background word, contact cards, dark-filtered Google Map, validated form with success state |
| FAQ | `Faq` | Accessible accordion, FAQPage JSON-LD, social links |

</details>

<details>
<summary><strong>Legal pages</strong></summary>

Both pages render `LegalPage` with content from `src/content/legal/`. Features a condensed background word, sticky reading-progress bar and numbered sections.

</details>

---

## Design System

All tokens live in `src/app/globals.css` under `@theme`. Tailwind generates utilities automatically (for example `--color-brand` gives you `bg-brand`, `text-brand` and `border-brand`).

### Colours

| Token | Hex | Use |
|---|---|---|
| `ink` | `#010403` | Page background, dark text on light sections |
| `surface` | `#07100C` | Navbar pill |
| `brand` | `#105646` | Primary buttons, active states |
| `brand-light` | `#33B082` | Accents, borders, links |
| `brand-glow` | `#23E29B` | Glows, icons, highlights |
| `primary` | `#F5F4ED` | Main text |
| `secondary` | `#D9DED7` | Outline buttons |
| `muted` | `#71847B` | Supporting text |
| `gold` / `gold-surface` | `#EBB811` / `#121200` | Header CTA, FAQ numbers |

> ⚠️ Never name a colour token `base`. It collides with Tailwind's `text-base` font-size utility.

### Typography

| Token | Size | Use |
|---|---|---|
| `text-display` | `clamp(2.5rem → 3.75rem)` | Page heroes |
| `text-h2` | `clamp(2rem → 2.75rem)` | Section headings |

Font: **Pathway Extreme** (variable, with a width axis). Use `[font-stretch:75%]` for the condensed display style.

### Utilities

| Class | Purpose |
|---|---|
| `container-site` | 1280px centred container with responsive padding |
| `btn-primary` | Green pill button with inset glow |
| `btn-outline` | Transparent outline button |
| `badge-gold` | Gold pill |
| `surface-radial` / `surface-linear` | Figma glass gradients |

---

## Motion System

Shared timing lives in `src/lib/motion.ts`, so the whole site moves with one rhythm.

```ts
ease.out   // [0.22, 1, 0.36, 1] — premium expo-out, used almost everywhere
ease.inOut // [0.65, 0, 0.35, 1] — curtains and wipes
```

### Building blocks

| Component | Use |
|---|---|
| `<Reveal>` | Fade-up when scrolled into view |
| `<Stagger>` | Reveal children one after another (children use `variants={fadeUp}`) |
| `<TextReveal lines={[…]} inView />` | Word-by-word mask reveal (omit `inView` for on-load) |
| `<CountUp to={50} suffix="+" />` | Animated numbers |
| `<Parallax>` | Scroll-linked vertical drift |
| `<Particles count={60} />` | Lightweight canvas particles, paused off-screen |
| `<BigWord word="…" />` | Giant condensed background word |
| `<GlowGrid>` + `<GlowCard>` | 3D cards with shared border glow |

### ⚠️ Golden rule: clipped elements

`IntersectionObserver` treats clipped elements as invisible. **Never put `whileInView` on an element that starts hidden by `clip-path`, a mask, or an `overflow-hidden` parent.** It will never fire.

```tsx
// ❌ Never triggers: the element starts fully clipped
<motion.div initial={{ clipPath: HIDDEN }} whileInView={{ clipPath: SHOWN }} />

// ✅ An unclipped parent detects visibility and drives the children
<motion.div initial="hidden" whileInView="show">
  <motion.div variants={{ hidden: { clipPath: HIDDEN }, show: { clipPath: SHOWN } }} />
</motion.div>
```

### Other rules

- **Fixed elements:** keep them out of transformed parents. `Header` lives in `layout.tsx`, not `template.tsx`, and `MobileMenu` renders outside the header.
- **Sticky elements:** need `overflow-clip`, not `overflow-hidden`, on their ancestors.
- **Animated properties:** only `transform` and `opacity`, for smooth 60fps.
- **Reduced motion:** every scroll effect checks `useReducedMotion()`, and `MotionConfig reducedMotion="user"` wraps the app.

---

## Editing Content

Most day-to-day edits happen in **one file**: `src/lib/site.ts`.

| What | Where |
|---|---|
| Navigation links, header CTA | `navLinks`, `ctaLink` |
| Phone, email, address, map link | `contact` |
| WhatsApp number + prefilled message | `contact.whatsapp`, `contact.whatsappMessage` |
| Social profiles | `socials`, `youtubeUrl` |
| Footer links | `footerLinks` |
| Enquiry form dropdown | `serviceOptions` |
| Map embed | `mapsEmbedUrl` |
| Terms / Privacy text | `src/content/legal/*.tsx` (update the `…Updated` date too) |
| FAQ questions & answers | `faqs` array in `sections/enquiry/Faq.tsx` |
| Section copy | The data arrays at the top of each section component |

---

## Assets

All assets live in `public/`. Photos as **JPG/WebP**, transparent graphics as **PNG**, logos as **SVG**.

<details>
<summary><strong>Full asset list</strong></summary>

| Path | Used by |
|---|---|
| `logo.png` / `logo.svg` | Header, Footer |
| `logo-white.svg` | FAQ |
| `images/hero/arc.png` | Home hero, Approach, FAQ |
| `images/office.png` | Pillars |
| `images/opportunities/bg.jpg`, `suit.png` | Opportunities |
| `images/services/bg-top.jpg`, `bg-bottom.jpg` | Services, Footer |
| `images/services/*.png` | Service tiles (10 photos) |
| `images/uae/sharjah.png`, `abu-dhabi.png`, `dubai.png` | UAE Focus |
| `images/consultation/office-view.jpg` | Consultation |
| `images/about/hero-wave.jpg` | About hero |
| `images/about/intro-bg.jpg`, `office-lounge.jpg` | About intro |
| `images/about/mission-bg.png` | Mission & Vision |
| `images/about/team-desk.jpg` | Discipline |

</details>

**Export guidelines:**

- **Size:** export at 2x the displayed size.
- **Backgrounds:** keep them under about 300 KB (squoosh.app works well).
- **Formats:** `next/image` serves WebP/AVIF automatically, so PNG and JPG sources are fine.

---

## Enquiry Form & Email

```
EnquiryForm (React Hook Form + Zod)
      │  POST /api/enquiry
      ▼
route.ts ── validates with the same Zod schema
      │  honeypot check (bots get a silent "success")
      ▼
buildEnquiryEmail() ── branded HTML + plain-text fallback
      │
      ▼
Resend API ──► client inbox (Reply-To = visitor)
```

- **Validation:** `src/lib/enquiry-schema.ts` is shared by the client and server, so the rules can't drift apart.
- **Spam protection:** a hidden `website` field acts as a honeypot.
- **Email template:** `src/lib/emails/enquiry-email.ts` uses table layout with inline styles for Gmail and Outlook support. All user input is HTML-escaped.
- **Without email configured:** submissions are logged to the terminal, and the form still works for testing.
- **Debugging:** in development, Resend's exact error appears in the API response's `detail` field and the browser console.

### Activating email

1. **Create an API key:** sign up at [resend.com](https://resend.com), create an API key, and add it to `.env.local`.
2. **Test:** set `ENQUIRY_TO_EMAIL` to your Resend account email and leave out `ENQUIRY_FROM_EMAIL`.
3. **Verify the domain:** in Resend, go to **Domains → Add** `afaqalbarakha.com` and add the DNS records at the domain provider.
4. **Go live:** once the domain is verified, set the final `ENQUIRY_TO_EMAIL` and `ENQUIRY_FROM_EMAIL`.

---

## SEO & Accessibility

- **Metadata:** per-page `metadata` exports, with a title template (`%s | Brand`) in the layout.
- **Structured data:** FAQPage JSON-LD on the enquiry page.
- **Semantic structure:** one `h1` per page, with hidden `sr-only` headings wherever the visible title is decorative.
- **Keyboard and screen readers:**
  - Visible focus rings throughout.
  - The accordion uses `aria-expanded` and region labelling.
  - Form errors use `role="alert"` and are linked with `aria-describedby`.
- **Reduced motion:** respected site-wide.
- **Performance:**
  - `next/font` for fonts with no layout shift.
  - `next/image` with explicit `sizes`.
  - The particle canvas pauses when off-screen.
  - Animations stick to transforms and opacity.

---

## Deployment

The site needs a **server runtime** for `/api/enquiry`. **Vercel** is recommended.

1. **Connect:** push to GitHub and import the repo into Vercel.
2. **Environment variables:** in **Settings → Environment Variables**, add all four variables.
3. **Deploy:** deploy, then **redeploy** after any later variable change.

> ⚠️ Do **not** set `output: "export"` in `next.config`. Static export disables API routes, so the form would return 404.

### Pre-launch checklist

- [ ] Confirm the phone number with the client (designs showed two different numbers)
- [ ] Replace placeholder social URLs and handles in `site.ts`
- [ ] Domain verified in Resend; final email variables set in Vercel
- [ ] Client legal review of Terms & Privacy wording
- [ ] Review the drafted FAQ answers (2–6)
- [ ] Confirm allocation figures on the Home hero donut
- [ ] Add `sitemap.ts`, `robots.ts`, Open Graph image, custom 404
- [ ] Lighthouse pass (performance, accessibility, SEO)

---

## Troubleshooting

<details>
<summary><strong>An animation never plays / element stays invisible</strong></summary>

The element starts clipped (`clip-path`, mask or `overflow-hidden`) and uses `whileInView` directly. Move `initial="hidden" whileInView="show"` to an unclipped parent and use `variants` on the child. See [Motion System](#motion-system).

</details>

<details>
<summary><strong>New page opens scrolled to the bottom</strong></summary>

Handled by `ScrollReset` in `SmoothScroll.tsx`, which resets Lenis on every route change. Make sure that component is still rendered inside `ReactLenis`.

</details>

<details>
<summary><strong>Text using <code>text-ink</code> or <code>bg-ink</code> has no colour</strong></summary>

The `--color-ink` token is missing from `globals.css`. Add it to `@theme` and restart the dev server.

</details>

<details>
<summary><strong>Form returns 404</strong></summary>

The route must be at exactly `src/app/api/enquiry/route.ts`. Check with:

```powershell
Get-ChildItem -Recurse -Filter "route*" src
```

</details>

<details>
<summary><strong>Form returns 502</strong></summary>

Resend rejected the email. Check the `detail` field in the response (development only) or the `[enquiry] email failed` terminal log.

- **"only send testing emails to your own address":** use your Resend account email as `ENQUIRY_TO_EMAIL`.
- **"domain is not verified":** remove `ENQUIRY_FROM_EMAIL` until the domain is verified.
- **401:** regenerate the API key and restart the server.

</details>

<details>
<summary><strong>Image doesn't show</strong></summary>

Open its URL directly (for example `localhost:3000/images/...`). On Windows, check for hidden double extensions like `office.png.png`:

```powershell
Get-ChildItem public\images -Recurse
```

</details>

---

## Conventions

- **Content in data arrays:** at the top of each component, not inline in JSX.
- **Shared contact info only in `site.ts`:** never hard-code phone numbers or emails.
- **One `"use client"` boundary per section:** pages stay server components.
- **No secrets in code:** environment variables only. Rotate any key that's been shared.
- **Never commit:** `.env.local`, `.next/` or `node_modules/`.

---

<div align="center">

**Afaq Al Barakha Investment**: Build, Protect & Grow Your Wealth

Designed & developed by **Hush Lush Technologies**

</div>