# Mustaq Ahmed Portfolio

A personal portfolio website for Cheppali Mehaboob Mustaq Ahmed, showcasing AI/ML projects, full-stack work, technical skills, education, certificates, and achievements.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/mustaq-portfolio/src/App.tsx` — single-page portfolio experience and content
- `artifacts/mustaq-portfolio/src/index.css` — portfolio theme, responsive styling, motion, and visual system
- `artifacts/mustaq-portfolio/package.json` — frontend scripts and dependencies
- `attached_assets/final_cv_1788179889908.docx` — source CV provided for the portfolio content

## Architecture decisions

- The portfolio is a frontend-only React + Vite artifact; the CV does not require server-side persistence.
- The page uses a single scrollable route with anchor navigation so recruiters can scan the full story quickly.
- Project links are intentionally not fabricated because the source CV listed placeholder “Link” labels without URLs.

## Product

- Responsive personal portfolio with hero, projects, skills, journey, certificates, education, and contact areas.
- Smooth section navigation, mobile menu, active section tracking, scroll reveals, and reduced-motion support.
- Contact CTAs open email, and the email address can be copied from the contact area.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
