---
name: CareerCue Clean Enterprise
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#005a89'
  on-tertiary: '#ffffff'
  tertiary-container: '#0073ae'
  on-tertiary-container: '#e7f2ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#004b73'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.005em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.005em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  code-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4rem
  gutter-mobile: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 1.5rem
  container-max: 80rem
---

## Brand & Style

The design system establishes an institutional yet approachable identity tailored for students, universities, career counselors, and enterprise recruiters. It embodies guidance, clarity, reliability, and structured ambition. The aesthetic balances corporate authority with academic warmth—eschewing gimmicky dark modes, neon accents, and artificial glassmorphic blurs in favor of a crisp, daylight-driven visual hierarchy.

The overarching design movement is **Corporate Modern with Academic Clarity**:
- **Clean Structure:** Grounded layouts using predictable visual cues, intentional whitespace, and crisp line separation.
- **Trustworthy & Objective:** Pure white surface foundations paired with nuanced slate neutrals and authoritative royal blue accents create high legibility and clear affordances.
- **Empowering & Human:** Designed to lower cognitive load during stressful life moments such as career pivots, job applications, and resume auditing.

## Colors

The palette is tuned specifically for light mode, emphasizing high-contrast readability (WCAG AAA for text, AA for interactive elements) and clarity across dense data tables, resume flows, and job boards.

### Palette Architecture
- **Primary (`#2563eb`):** Royal Blue. Used for primary calls-to-action, active navigation markers, key focus outlines, and brand moments. Accessible against white and slate container backgrounds.
- **Secondary (`#0f172a`):** Deep Slate. Anchor tone used for primary typography, authoritative headers, dark status indicators, and high-emphasis data points.
- **Tertiary (`#0284c7`):** Sky Accent. Used for secondary interactive highlights, active filters, informational callouts, and progress indicators.
- **Neutral (`#64748b`):** Cool Slate. Governs secondary copy, metadata, subtle borders, inactive tab labels, and structural dividing rules.

### Functional Roles & Surfaces
- **Canvas Base:** `#f8fafc` (Warm Soft Slate).
- **Surface Elevation (Cards, Panels, Modals):** `#ffffff` (Pure Crisp White).
- **Structural Borders & Dividers:** `#e2e8f0` (Crisp Slate Border) and `#cbd5e1` for interactive input borders.
- **Semantic Badges:**
  - *Success (Hired/Approved):* `#059669` on `#ecfdf5` background.
  - *Warning (Action Needed/Review):* `#d97706` on `#fffbeb` background.
  - *Critical/Error (Rejected/Missing):* `#dc2626` on `#fef2f2` background.
  - *Information (In-Progress):* `#2563eb` on `#eff6ff` background.

## Typography

The type system pairs **Plus Jakarta Sans** for headlines and editorial body narrative with **Inter** for micro-copy, data labels, badges, and dense table values.

### Type Guidance
- **Headings (Plus Jakarta Sans):** Provide structural balance and contemporary warmth without excessive geometric quirkiness. Headings larger than 24px must use tightening negative letter spacing (`-0.01em` to `-0.02em`) to ensure optical compactness.
- **Body Text (Plus Jakarta Sans):** Calibrated for long-form guidance documentation, job postings, and cover letter reviews. Uses `15px` as the default desktop baseline for optimal information density and reading speed.
- **Data & Controls (Inter):** Applied across tab bars, interactive chips, table row cells, form inputs, and status badges where vertical alignment metrics and optical neutrality are critical.

## Layout & Spacing

This design system uses an **8pt rhythmic layout model** (with a 4pt sub-grid for badges, micro-icons, and tight form inputs) alongside a responsive 12-column grid.

### Breakpoints & Grids
- **Desktop (1200px+):** 12-column layout. Max container width: `1280px` (`80rem`). Gutter: `24px` (`1.5rem`). Outer margins: centered dynamic or `32px`.
- **Tablet (768px - 1199px):** 8-column layout. Gutter: `20px`. Outer margins: `24px`.
- **Mobile (320px - 767px):** 4-column layout. Gutter: `16px` (`1rem`). Outer margins: `16px` (`1rem`). Columns collapse to a single stacked axis with full-width primary CTAs.

### Layout Principles
- **Asymmetric Dashboards:** Standard workspaces feature a fixed 260px primary navigation rail on the left, an unrestricted fluid middle working stage, and an optional 360px contextual inspector/preview drawer on the right.
- **Whitespace Restraint:** Group-related items remain compact (`8px`–`12px`), while card modules maintain breathing room (`24px`–`32px`) to prevent visual friction.

## Elevation & Depth

Visual hierarchy uses **layered surfaces and soft ambient shadows** paired with structural micro-borders. Glowing elements, colored drop-shadows, and heavy black drop-shadows are strictly forbidden.

### Depth Hierarchy
- **Level 0 (App Canvas):** `#f8fafc`. Flat background layer.
- **Level 1 (Cards, Data Panels, Sections):** `#ffffff` background with a crisp border `1px solid #e2e8f0` and an ultra-soft ambient shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`.
- **Level 2 (Hovered Cards, Select Menus, Dropdowns):** `#ffffff` with `1px solid #cbd5e1` and shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Modals, Slide-Over Panels):** `#ffffff` with crisp border `1px solid #e2e8f0` and shadow: `0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`. Modal backdrops use `#0f172a` at 40% opacity (`rgba(15, 23, 42, 0.40)`) with `backdrop-filter: blur(2px)`.
- **Focus Rings:** `0 0 0 2px #ffffff, 0 0 0 4px #2563eb`. Ensures compliance against any background.

## Shapes

The design system adopts a **Soft (Level 1)** structural rounding profile. This produces clean geometric corners that convey precision and academic discipline while avoiding sharp, aggressive tips or overly toy-like, pill-shaped aesthetics.

### Standard Radii Applications
- **Base Components (`rounded`, 4px / `0.25rem`):** Checkboxes, radio inner pips, micro-badges, tooltips, and data cell tags.
- **Interactive Controls (`rounded-md`, 6px / `0.375rem`):** Buttons, form input fields, dropdown trigger buttons, and tab segment pills.
- **Containers & Surfaces (`rounded-lg`, 8px / `0.5rem`):** Content cards, career stat widgets, modal windows, table containers, and filter panels.
- **Avatars & Status Dots (`rounded-full`):** Candidate profile images, status pips, and circular step progress numbers.

## Components

### Buttons
- **Primary:** Background `#2563eb`, text `#ffffff`, border `none`, border-radius `6px`, font `Inter` 14px Semibold. Padding: `10px 18px`. Hover: `#1d4ed8`. Active: `#1e40af`.
- **Secondary (Outline):** Background `#ffffff`, text `#0f172a`, border `1px solid #e2e8f0`, shadow `0 1px 2px rgba(15, 23, 42, 0.04)`. Hover: background `#f8fafc`, border `#cbd5e1`.
- **Ghost/Tertiary:** Background `transparent`, text `#64748b`, border `none`. Hover: background `#f1f5f9`, text `#0f172a`.
- **Destructive:** Background `#dc2626`, text `#ffffff`. Hover: `#b91c1c`.

### Input Fields & Controls
- **Text Inputs & Selects:** Height `40px`, background `#ffffff`, border `1px solid #cbd5e1`, radius `6px`, text `#0f172a`, placeholder `#94a3b8`, padding `8px 12px`. Focus state: border `#2563eb` with dual-ring outline `0 0 0 3px rgba(37, 99, 235, 0.15)`.
- **Checkboxes & Radios:** Size `16px × 16px`, border `1.5px solid #cbd5e1`, radius `4px` (checkbox) or `50%` (radio). Checked: background `#2563eb`, border `#2563eb`, checkmark icon pure white.

### Badges & Chips
- **Status Badges:** Height `22px`, font `Inter` 11px Bold Uppercase (`tracking: 0.04em`), border-radius `4px`, padding `2px 8px`.
  - *Applied / Active:* Background `#eff6ff`, text `#1d4ed8`, border `1px solid #bfdbfe`.
  - *Shortlisted / Verified:* Background `#ecfdf5`, text `#047857`, border `1px solid #a7f3d0`.
  - *Under Review:* Background `#fffbeb`, text `#b45309`, border `1px solid #fde68a`.
- **Filter Chips:** Height `32px`, font `Inter` 13px Medium, background `#f8fafc`, border `1px solid #e2e8f0`, radius `6px`, padding `0 12px`. Hover: background `#f1f5f9`, border `#cbd5e1`. Active/Selected: background `#eff6ff`, border `#2563eb`, text `#2563eb`.

### Cards & Data Panels
- **Standard Card:** Background `#ffffff`, border `1px solid #e2e8f0`, border-radius `8px`, shadow Level 1. Padding: `20px` or `24px`.
- **Interactive Listing Card (Job / Candidate):** Same as standard card, with smooth transition (`all 150ms ease-in-out`). Hover: border `#cbd5e1`, shadow Level 2, subtle top shift (`transform: translateY(-1px)`).

### Lists & Tables
- **Enterprise Data Table:** Header row background `#f8fafc`, text `#64748b` 12px Semibold uppercase, bottom border `1px solid #e2e8f0`. Data rows: background `#ffffff`, height `52px`, text `#0f172a` 14px Regular, border-bottom `1px solid #f1f5f9`. Row hover: `#f8fafc`.

### CareerCue Domain Specifics
- **Resume Score Gauge:** Clean circular radial track (`#e2e8f0`) with filled segment in `#2563eb` (or `#059669` if score > 80). Centered label in deep slate (`#0f172a`) Plus Jakarta Sans 20px Bold.
- **Skill Match Tags:** Subtle pills with `#f1f5f9` background, `#334155` text, and a matched green dot indicator (`#10b981`) for verified student proficiencies.