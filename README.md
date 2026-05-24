# BFSI India — Finance Intelligence Platform

> India's fastest BFSI intelligence platform. Live markets · news · leadership search · regulatory tracker.

## Quick Deploy to Netlify

### Option A — GitHub (Recommended)
1. Push this folder to a new GitHub repo
2. Go to [netlify.com](https://netlify.com) → Add new site → Import from Git
3. Build command: `npm run build` | Publish: `.next`
4. Add env vars (see `.env.example`) in Netlify → Site Settings → Environment Variables
5. Deploy ✓

### Option B — Netlify CLI
```bash
npm install -g netlify-cli
npm install
npm run build
netlify deploy --prod --dir=.next
```

## Local Development
```bash
cp .env.example .env.local    # fill in Firebase keys
npm install
npm run dev                    # http://localhost:3000
```

## Firebase Setup (10 min)
1. Create project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Firestore** (Native mode)
3. Enable **Analytics** (optional, for visitor counter)
4. Copy config to `.env.local`
5. Seed `leaders` and `circulars` collections (see `/src/lib/types.ts` for schema)

## Project Structure
```
src/
├── app/                  # Next.js App Router pages + API routes
│   ├── page.tsx          # Home
│   ├── news/             # News feed (infinite scroll)
│   ├── sectors/          # Market & sector performance
│   ├── leadership/       # Leadership search
│   ├── regulatory/       # Regulatory tracker
│   └── api/              # Serverless API routes
├── components/
│   ├── layout/           # Navbar, Footer
│   ├── home/             # Hero, MarketSnapshot, SectorHeatmap, MorningBrief
│   ├── news/             # NewsCard, HomeNewsFeed
│   └── providers/        # SWRProvider
└── lib/                  # types.ts, utils.ts, firebase.ts
public/
├── manifest.json         # PWA manifest
├── offline.html          # Offline fallback
└── icons/                # PWA icons (all 8 sizes)
```

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v3 + CSS variables
- **Animation**: Framer Motion
- **Data Fetching**: SWR + Yahoo Finance free API
- **News**: RSS Parser (5 publications)
- **Backend**: Firebase Firestore (leaders, circulars, analytics)
- **PWA**: next-pwa + service worker
- **Deploy**: Netlify + @netlify/plugin-nextjs

## Color Palette
| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--bg` | `#FAFBFF` | `#0A0B0F` | Page background |
| `--bg-card` | `#FFFFFF` | `#111318` | Card background |
| `--accent` | `#6366F1` | `#818CF8` | Brand / primary |
| `fin-up` | `#10B981` | same | Positive change |
| `fin-down` | `#EF4444` | same | Negative change |
| `fin-gold` | `#F59E0B` | same | Warnings / dates |

## Seeding Firebase Leaders Collection
Each document in `leaders` collection:
```json
{
  "name": "Sashidhar Jagdishan",
  "role": "MD",
  "organization": "HDFC Bank",
  "orgType": "Bank",
  "shortBio": "...",
  "experience": "...",
  "previousOrgs": ["Deutsche Bank"],
  "tenure": "Oct 2020 – Present",
  "appointedDate": "2020-10-27",
  "source": "HDFC Bank Annual Report",
  "sourceUrl": "https://hdfcbank.com"
}
```

## License
© 2025 BFSI India. All rights reserved. Not for commercial redistribution.
