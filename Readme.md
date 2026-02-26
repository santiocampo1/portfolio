# Santiago Ocampo — Personal Portfolio

A personal portfolio website built with a Swiss minimalist design philosophy. Clean, fast, bilingual, and backed by a real database — it goes beyond a static page to demonstrate full-stack capabilities in a practical context.

🌐 **Live site:** [santiocampo.com](https://www.santiocampo.com)

---

## Features

### Core

- **Bilingual (ES / EN)** — full internationalization with a custom translation system, no external i18n libraries
- **Smooth scroll navigation** — sidebar-based navigation with active section detection via `IntersectionObserver`
- **Responsive layout** — dedicated sidebar for desktop, slide-in topbar for mobile
- **Page loader** — custom CSS animation before React mounts, eliminating flash of unstyled content (FOUC)
- **CV download button** — fixed button that serves the Spanish or English PDF depending on the active language, with mobile-aware behavior (hides when footer is visible)

### Sections

| Section        | Description                                                                |
| -------------- | -------------------------------------------------------------------------- |
| **Hero**       | Name, role, description, CTA buttons, stats grid, and live visitor counter |
| **About**      | Bio, profile photo, and full tech stack organized by category              |
| **Projects**   | Table of professional projects with stack tags and company                 |
| **Experience** | Timeline of professional roles with highlights                             |
| **Education**  | Certifications and academic background                                     |
| **Guestbook**  | Public message board backed by Supabase                                    |
| **Contact**    | Links to email, LinkedIn, GitHub, and WhatsApp                             |

### Guestbook

A fully functional public message board that demonstrates a complete full-stack integration:

- Custom country dropdown with real flag images (via [flagcdn.com](https://flagcdn.com)) — works cross-platform including Windows
- Form validation with character counter
- Toast notification on successful submission
- Email notification to the site owner on every new message (via Supabase Edge Function + Resend)
- Row Level Security (RLS) policies to protect data integrity

### Visitor Counter

- Reads and increments a counter in Supabase on every page load
- Displayed as a styled badge in the Hero section
- Returns `—` in localhost to avoid polluting production data

---

## Tech Stack

### Frontend

| Technology                    | Usage                                               |
| ----------------------------- | --------------------------------------------------- |
| **React 18**                  | UI framework                                        |
| **Vite**                      | Build tool and dev server                           |
| **CSS-in-JS (inline styles)** | Scoped component styling without extra dependencies |
| **Plus Jakarta Sans**         | Display / body font                                 |
| **DM Mono**                   | Monospace font for labels and metadata              |

### Backend & Infrastructure

| Technology                     | Usage                                                      |
| ------------------------------ | ---------------------------------------------------------- |
| **Supabase**                   | PostgreSQL database + REST API                             |
| **Supabase Edge Functions**    | Serverless function for email notifications (Deno runtime) |
| **Supabase Database Webhooks** | Triggers Edge Function on `guestbook` INSERT               |
| **Resend**                     | Transactional email delivery                               |
| **Vercel**                     | Hosting and CI/CD                                          |

---

## Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── og-image.jpg
│   ├── CV-SantiagoOcampo.pdf
│   └── Resume-SantiagoOcampo.pdf
├── src/
│   ├── assets/
│   │   └── photo.jpg
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx        # Desktop navigation
│   │   │   └── Topbar.jsx         # Mobile navigation
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Guestbook.jsx
│   │   │   └── Contact.jsx
│   │   └── ui/
│   │       ├── CVButton.jsx       # Fixed CV download button
│   │       ├── Reveal.jsx         # Scroll-triggered fade-in wrapper
│   │       └── Toast.jsx          # Success notification popup
│   ├── constants/
│   │   └── translations.js        # All UI strings in ES and EN
│   ├── hooks/
│   │   ├── useScrollSpy.js        # Active section detection
│   │   ├── useVisitorCount.js     # Supabase visitor counter
│   │   └── useGuestbook.js        # Supabase guestbook CRUD
│   ├── styles/
│   │   └── GlobalStyles.jsx       # Global CSS variables and resets
│   ├── App.jsx
│   └── main.jsx
├── supabase/
│   └── functions/
│       └── notify-guestbook/
│           └── index.ts           # Edge Function — email on new message
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
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Both tables have **Row Level Security (RLS)** enabled with explicit public policies.

---

## Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

For the Edge Function, the following secret is set via Supabase CLI:

```bash
supabase secrets set RESEND_API_KEY=your_resend_api_key
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

The Supabase Edge Function is deployed independently via the Supabase CLI:

```bash
supabase functions deploy notify-guestbook --project-ref your_project_ref
```

---

## Author

**Santiago Ocampo** — Fullstack Developer  
[santiocampo.com](https://www.santiocampo.com) · [LinkedIn](https://www.linkedin.com/in/santiocampo/) · [GitHub](https://github.com/santiocampo1)
