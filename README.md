# Explain My Bill — Comcast Business Executive Prototype

An AI-powered bill transparency experience that explains customer bills in plain English.

## Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React icons

## Password
`CBPSO`

## Quick Start
```bash
npm install
npm run dev
# Visit http://localhost:3000, enter CBPSO
```

## Deploy to Vercel
Connect this repo to Vercel for automatic deployments, or run `npx vercel --prod`.

## Real Data vs Demo

**Real (from uploaded bills):** All financial figures, line items, totals, account details, dates, tax breakdowns, equipment pricing, discount amounts, and month-over-month changes across 4 bills (Dec 2024, May 2025, Jan 2026, Feb 2026).

**Demo/Interpreted:** Explanations of why charges changed, Q&A phrasing, churn-mitigating language, and enhanced service descriptions.

**Prototype-Only:** Password auth (sessionStorage), local JSON, deterministic Q&A, no account modification capability.