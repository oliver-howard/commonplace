![Commonplace](public/banner.png)

# Commonplace

A personal publishing platform built on **Next.js 16** (App Router) with **Sanity** as headless CMS. Designed for long-form writing with a clean, editorial aesthetic.

## Stack

- **Framework** — Next.js 16 App Router (TypeScript)
- **CMS** — Sanity (Content Lake + embedded Studio at `/studio`)
- **Styling** — Inline styles with CSS custom properties; `Inter` (UI) and `Newsreader` (editorial)
- **Email** — Resend for newsletter signups

## Getting Started

```bash
npm install
npm run dev      # localhost:3000
```

## Commands

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

## Project Structure

```
src/
  app/           # Next.js routes (/, /[slug], /studio)
  sanity/        # Sanity client, live queries, presentation config
  hooks/         # useTheme
  types/         # shared TypeScript types
schemas/         # Sanity schema (post.ts)
```
