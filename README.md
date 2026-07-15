# Code Compass 🧭

Code Compass helps developers and students figure out the right technology stack for a new project idea — instantly. Just describe what you're building, and get a clear recommendation covering frontend, backend, database, AI tools, and deployment, along with the reasoning behind each choice.

No more decision paralysis. No more piecing together advice from a dozen blog posts. Just a clear starting point, in seconds.

## Who it's for

- **Students** working on assignments or final year projects who need a solid starting point fast
- **Beginners** who don't yet have the experience to confidently choose between competing technologies
- **Developers** exploring a new project idea who want a quick sanity check before diving in
- **Hackathon teams** who need to move fast and can't afford to waste time debating stack choices

## How it works

1. Enter a short project idea (e.g. "AI healthcare chatbot," "e-commerce app," "skin cancer detection")
2. Code Compass sends the query to **Groq** (running Llama 3.3 70B) for a live, tailored recommendation
3. If Groq is unavailable, it automatically falls back to a curated **Supabase** database of proven stack combinations
4. Get an instant, structured answer — no guesswork, no research rabbit holes

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (App Router) + Tailwind CSS v4 |
| Primary AI | Groq (Llama 3.3 70B) |
| Fallback data | Supabase (PostgreSQL) |
| Deployment | Vercel |

## Project structure

```
code_compass/
├── app/
│   ├── api/
│   │   └── recommend/
│   │       └── route.js        # Groq + Supabase recommendation endpoint
│   ├── About/
│   │   └── page.js              # About page
│   ├── Languages/
│   │   └── page.js              # Supported languages + docs links
│   ├── Components/
│   │   └── Navbar.js            # Responsive navigation
│   ├── layout.js
│   ├── page.js                  # Home page
│   └── globals.css              # Theme tokens (Tailwind v4 @theme)
├── lib/
│   └── supabase.js              # Supabase client
├── public/                      # Images and logos
└── .env.local                   # Environment variables (not committed)
```

## Getting started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd code_compass
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```
SUPABASE_URL=your-supabase-project-url
SUPABASE_SECRET_KEY=your-supabase-secret-key
GROQ_API_KEY=your-groq-api-key
```

- Get your Supabase URL and secret key from **Project Settings → API Keys** in your [Supabase dashboard](https://supabase.com/dashboard)
- Get a free Groq API key from [console.groq.com](https://console.groq.com)

### 3. Set up the database

In the Supabase SQL Editor, create the `tech_stacks` table and seed it with fallback data:

```sql
create extension if not exists pg_trgm;

create table tech_stacks (
  id uuid default gen_random_uuid() primary key,
  project_type text not null,
  keywords text[] not null,
  frontend text,
  backend text,
  database text,
  ai_tools text,
  deployment text,
  reason text,
  created_at timestamp default now()
);

create index tech_stacks_project_type_trgm_idx
  on tech_stacks using gin (project_type gin_trgm_ops);
```

Enable Row Level Security when prompted — the app connects using the secret key server-side, which bypasses RLS safely.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Design

Code Compass uses a custom dark violet theme defined via Tailwind v4's `@theme` directive in `globals.css` — no separate `tailwind.config.js` needed.

| Token | Hex |
|---|---|
| `--color-bg` | `#1a1030` |
| `--color-surface` | `#3b2a5c` |
| `--color-accent` | `#8b5cf6` |
| `--color-accent-soft` | `#c4b5fd` |
| `--color-text` | `#f3f0fa` |
| `--color-muted` | `#a99bc7` |

The layout is fully responsive using Tailwind breakpoints (`sm:`, `md:`, `lg:`), including a collapsible mobile navigation menu.

## Roadmap

- [ ] Admin page for adding new stack entries without writing SQL
- [ ] Expand Supabase fallback coverage with more project types
- [ ] Keep-alive cron job to prevent Supabase free-tier project pausing

## Made with ♥ by

**Momina Aamir Ali** and **Muhammad Awais Hashmi**
