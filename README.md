# Human–AI Finance Lab

Public research website for the Human–AI Finance Lab: experimental work on
human judgment, artificial intelligence, and financial decision-making.

The current flagship study is **“How AI Exposure Alters Risk Preferences and
Advisory Behavior”** by Elena Asparouhova, Arman Goudarzi, and Nathan Seegert.
The site includes a research overview, findings, team information, and an
interactive educational reconstruction of the experiment.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Then open the local URL printed by vinext.

## Validate

```bash
npm run lint
npm run build
```

## Project shape

- `app/page.tsx` — site content and interactive experiment tour
- `app/globals.css` — responsive visual system
- `public/research/` — source-backed study interface assets
- `.openai/hosting.json` — Sites/Cloudflare deployment configuration

The public experiment tour is intentionally non-live. It performs
deterministic sample calculations in the browser, collects no study data, and
does not expose the production oTree experiment.

## Publishing

The project uses vinext and generates Cloudflare Worker-compatible ESM output.
It is ready for a normal GitHub repository and for a custom Cloudflare-managed
domain after the initial project URL is approved.
