# Santiago Ocampo — Personal Portfolio

A personal portfolio website built with a minimalist design approach. Clean, fast, bilingual, and backed by a real database — it goes beyond a static page to demonstrate full-stack capabilities in a practical context.

🌐 **Live site:** [santiocampo.com](https://www.santiocampo.com)

---

## ✨ Features

### Core

- **Bilingual (ES / EN)** — full internationalization with a custom translation system, no external i18n libraries
- **Smooth scroll navigation** — sidebar-based navigation with active section detection via `IntersectionObserver`
- **Professional / Personal view switcher** — toggle between the professional portfolio and the personal space without losing navigation context
- **Responsive layout** — dedicated sidebar for desktop, slide-in topbar for mobile; view switcher always visible on both
- **Page loader** — custom CSS animation before React mounts, eliminating flash of unstyled content (FOUC)
- **CV download button** — inline button in the Hero section that serves the Spanish or English PDF depending on the active language
- **AI Chatbot (Simón)** — floating chat button powered by Claude Haiku; responds as Santiago's dog with full knowledge of his experience, projects, and books, with a hand-drawn animated SVG avatar
- **3D Earth Globe** — interactive Three.js visualization mapping the real cities Santiago has worked from remotely
- **Interactive Architecture Diagram** — a React Flow graph of the portfolio's own real system architecture, clickable node by node

### Sections

#### Professional

| Section        | Description                                                                                                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hero**       | Name, role, description, CTA buttons (including CV download), a Video / 3D Globe toggle, stats grid, and live visitor counter                                                |
| **About**      | Bio, profile photo, and full tech stack organized by category                                                                                                                |
| **Projects**   | Professional projects shown as a connected timeline log, a grid of Personal & Freelance projects with live links, and an interactive diagram of this site's own architecture |
| **Experience** | Timeline of professional roles with highlights                                                                                                                               |
| **Education**  | Certifications and academic background                                                                                                                                       |
| **Guestbook**  | Public message board backed by Supabase                                                                                                                                      |
| **Contact**    | Links to email, LinkedIn, GitHub, and WhatsApp                                                                                                                               |

#### Personal

| Section      | Description                                                               |
| ------------ | ------------------------------------------------------------------------- |
| **My Books** | Favorite books organized by category, with cover images from Open Library |

### Hero — Video / 3D Globe Toggle

A pill-shaped switch lets visitors choose between two pieces of media in the same space:

- **Video** — embedded YouTube intro, lazy-loaded
- **3D Globe** — see below

The inactive "3D Globe" tab carries a persistent subtle violet pulse so the interactive feature is never missed. Switching plays a smooth fade-in transition.

### 3D Earth Globe

An interactive Three.js scene built with real meaning rather than decoration:

- A textured Earth sphere (official three.js example texture, with a graceful color fallback if the asset fails to load)
- **Real data spikes** at the cities Santiago has lived in or worked remotely from: Santa Fe, Buenos Aires, Orlando, and Lima — each with its own color and a radar-style pulsing ping
- A directional light slowly orbits the globe, producing a moving day/night terminator
- Sparse animated starfield for depth
- **Drag to rotate** via `OrbitControls` (zoom and pan disabled so it doesn't fight page scroll); gentle auto-rotation when idle
- Pauses its render loop via `IntersectionObserver` whenever scrolled out of view, and fully disposes all Three.js geometries/materials/the renderer on unmount

### Interactive Architecture Diagram

Built with **React Flow**, this is a real, accurate diagram of how the portfolio itself works — not a generic illustration:

- Visitor → React/Vite frontend → Supabase REST API → PostgreSQL, including both Edge Functions (`chat-simon`, `notify-guestbook`) and their external calls to Claude and Resend
- Click any node to see a plain-language explanation of what that piece does and why it's there
- Mouse-wheel zoom is disabled on the canvas so it never hijacks page scrolling; zoom is available via on-canvas controls instead
- All node/edge labels and detail text live in `translations.js`, fully bilingual

### Guestbook

A fully functional public message board that demonstrates a complete full-stack integration:

- Custom country dropdown with real flag images (via [flagcdn.com](https://flagcdn.com)) — works cross-platform including Windows
- Form validation with character counter
- Email notification to the site owner on every new message (via Supabase Edge Function + Resend)
- Row Level Security (RLS) policies to protect data integrity
- **Reply system** — replies are managed directly from Supabase via SQL. When a reply exists, an expandable bubble appears on the entry with a smooth toggle animation

### Books

A personal reading list backed by Supabase, organized into four categories:

- **Personal Development** — habits, focus, stoicism, mindset
- **Biographies** — Steve Jobs, Elon Musk, Phil Knight, Jeff Bezos, and more
- **Technical** — Clean Code, The Pragmatic Programmer, AWS, and others
- **Other** — leadership, business, and culture

Cover images are loaded automatically from the [Open Library Covers API](https://openlibrary.org/dev/docs/api#anchor_covers). If a cover is not found, an elegant placeholder is shown. New books can be added directly from the Supabase dashboard without touching the codebase.

### Projects — Three Layers

The Projects section is split into three distinct, purpose-built views:

- **Professional** — a connected vertical log/timeline of company projects, each with a colored node tied to its company (so Taktiful's three projects visually group together)
- **Personal & Freelance** — a card grid styled like browser/terminal chrome, showing the real live domain (`hifry.app`, `agrosury.com`) with a direct "Visit" link, or a code-style chip with "View code" for the desktop-only Kaizen app. This very site appears in the grid too, with a self-aware "you're looking at this right now" note instead of a link
- **Architecture** — the interactive diagram described above

### Simón — AI Chatbot

A floating chat assistant that lives in the bottom-right corner of the site, personified as Santiago's dog, with a hand-drawn animated SVG avatar (floppy ears, blinking eyes, and a periodic bark animation with sound-wave lines) replacing a generic icon.

- Powered by **Claude Haiku** via a Supabase Edge Function — the API key never touches the frontend
- Knows everything about Santiago: experience, projects, tech stack, books, and how the portfolio was built
- Responds in the same language the user writes in (ES/EN)
- Book data is fetched dynamically from Supabase at runtime — adding a new book to the DB is enough for Simón to know about it
- On mobile: opens as a fullscreen overlay with iOS keyboard-safe layout
- Violet pulse effect on the button to draw attention without being intrusive

### Visitor Counter

- Reads and increments a counter in Supabase on every page load
- Displayed as a styled badge in the Hero section
- Returns `—` in localhost to avoid polluting production data
- Detects milestone visits and triggers a celebration
- Uses `sessionStorage` to prevent duplicate counts when navigating between views

---

## 🎉 Secret Feature

> **Try visiting the site on a milestone visit — something special might happen.**

![Celebration modal](/.github/celebration-preview.png)

Every 50 visits, the site surprises the visitor with a celebration: a confetti animation bursts across the screen and a modal invites the lucky visitor to leave their mark in the guestbook. Built entirely with CSS animations — no external libraries.

_Hint: check the visitor counter badge on the Hero section._

---

## Tech Stack

### Frontend

| Technology                    | Usage                                               |
| ----------------------------- | --------------------------------------------------- |
| **React 18**                  | UI framework                                        |
| **Vite**                      | Build tool and dev server                           |
| **CSS-in-JS (inline styles)** | Scoped component styling without extra dependencies |
| **Three.js**                  | 3D Earth globe visualization in the Hero section    |
| **React Flow**                | Interactive architecture diagram                    |
| **Plus Jakarta Sans**         | Display / body font                                 |
| **DM Mono**                   | Monospace font for labels and metadata              |

### Backend & Infrastructure

| Technology                     | Usage                                                                      |
| ------------------------------ | -------------------------------------------------------------------------- |
| **Supabase**                   | PostgreSQL database + REST API                                             |
| **Supabase Edge Functions**    | Serverless functions for email notifications and AI chatbot (Deno runtime) |
| **Supabase Database Webhooks** | Triggers Edge Function on `guestbook` INSERT                               |
| **Resend**                     | Transactional email delivery                                               |
| **Anthropic Claude Haiku**     | AI model powering the Simón chatbot                                        |
| **Open Library Covers API**    | Book cover images fetched by title                                         |
| **Vercel**                     | Hosting and CI/CD                                                          |

---

## Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── og-image.jpg
│   ├── simon-avatar-face.jpg      # Simón's photo — used in the chat header
│   ├── CV-SantiagoOcampo.pdf
│   └── Resume-SantiagoOcampo.pdf
├── src/
│   ├── assets/
│   │   └── photo.jpg
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx        # Desktop navigation with Pro/Personal switcher
│   │   │   └── Topbar.jsx         # Mobile navigation with Pro/Personal switcher
│   │   ├── sections/
│   │   │   ├── Hero.jsx           # CV button, Video / 3D Globe toggle
│   │   │   ├── About.jsx
│   │   │   ├── Projects.jsx       # Professional log, Personal/Freelance grid, Architecture diagram
│   │   │   ├── Experience.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Guestbook.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Books.jsx          # Personal reading list with cover images
│   │   └── ui/
│   │       ├── Celebration.jsx        # Milestone confetti modal
│   │       ├── Simon.jsx              # AI chatbot — floating button + chat window + SVG dog avatar
│   │       ├── EarthGlobe3D.jsx       # Three.js 3D globe with real work-city data spikes
│   │       ├── ArchitectureDiagram.jsx # React Flow diagram of this site's own architecture
│   │       └── Reveal.jsx             # Scroll-triggered fade-in wrapper
│   ├── constants/
│   │   ├── translations.js        # All UI strings in ES and EN, including diagram node/edge content
│   │   ├── countries.js           # Country list and code map for guestbook
│   │   └── data.js                # Tech stack, nav sections and nav items
│   ├── hooks/
│   │   ├── useScrollSpy.js        # Active section detection
│   │   ├── useVisible.js          # Intersection observer for reveal animations
│   │   ├── useVisitorCount.js     # Supabase visitor counter + milestone detection
│   │   ├── useGuestbook.js        # Supabase guestbook CRUD
│   │   └── useBooks.js            # Supabase books fetch, grouped by category
│   ├── lib/
│   │   └── supabase.js            # Supabase URL, key and shared headers
│   ├── styles/
│   │   └── GlobalStyles.jsx       # Global CSS variables and resets
│   ├── App.jsx
│   └── main.jsx
├── supabase/
│   └── functions/
│       ├── notify-guestbook/
│       │   └── index.ts           # Edge Function — email on new guestbook message
│       └── chat-simon/
│           ├── index.ts           # Edge Function — Claude Haiku AI chatbot
│           └── prompt.ts          # Simón's system prompt and knowledge base
├── index.html
└── .env                           # VITE_SUPABASE_URL, VITE_SUPABASE_KEY
```

---

## Database Schema

```sql
-- Visitor counter
CREATE TABLE visitors (
  id    INT PRIMARY KEY DEFAULT 1,
  count INT DEFAULT 0
);

-- Guestbook entries
CREATE TABLE guestbook (
  id         BIGSERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  message    TEXT NOT NULL,
  country    TEXT,
  reply      TEXT,                  -- Managed directly via SQL from Supabase dashboard
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Books (personal reading list)
CREATE TABLE books (
  id         BIGSERIAL PRIMARY KEY,
  title      TEXT NOT NULL,
  author     TEXT NOT NULL,
  category   TEXT NOT NULL CHECK (category IN ('personal', 'biography', 'technical', 'other')),
  sort_order INT DEFAULT 0
);
```

All tables have **Row Level Security (RLS)** enabled with explicit public read policies.

---

## Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

Edge Function secrets are set via Supabase CLI:

```bash
supabase secrets set RESEND_API_KEY=your_resend_api_key --project-ref your_project_ref
supabase secrets set ANTHROPIC_API_KEY=your_anthropic_api_key --project-ref your_project_ref
supabase secrets set PROJECT_URL=your_supabase_project_url --project-ref your_project_ref
supabase secrets set PROJECT_ANON_KEY=your_supabase_anon_key --project-ref your_project_ref
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Deployment

The project uses a two-branch Git workflow:

| Branch        | Environment | URL                      |
| ------------- | ----------- | ------------------------ |
| `main`        | Production  | santiocampo.com          |
| `development` | Preview     | Auto-generated by Vercel |

Vercel automatically deploys every push. Environment variables are scoped per environment in the Vercel dashboard.

Supabase Edge Functions are deployed independently via the Supabase CLI:

```bash
supabase functions deploy notify-guestbook --project-ref your_project_ref
supabase functions deploy chat-simon --project-ref your_project_ref
```

---

## Author

**Santiago Ocampo** — Fullstack Developer  
[santiocampo.com](https://www.santiocampo.com) · [LinkedIn](https://www.linkedin.com/in/santiocampo/) · [GitHub](https://github.com/santiocampo1)
