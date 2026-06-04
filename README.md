# Dunia Ventures — website

Marketing site for **Dunia Ventures**, an early-stage fund backing tech-enabled creative
businesses across Africa. Static, multi-page, **no build step**.

## Pages
- `index.html` — Home
- `Portfolio.html` — Investment Themes (nav: "Themes")
- `Approach.html` — Investment Approach, model & value-creation timeline
- `Team.html` — Partners
- `About.html` — Company & thesis

## Tech
Plain HTML/CSS/JS. React + Babel are loaded from a CDN only to render the optional in-page
"Tweaks" panel (palette / font / texture). Fonts come from Google Fonts. No backend.

```
index.html, Portfolio.html, Approach.html, Team.html, About.html   ← pages
dunia.css        ← design system (tokens + components)
dunia.js         ← nav, scroll-reveal, theme persistence, forms
tweaks-panel.jsx ← Tweaks shell (starter)
dunia-tweaks.jsx ← mounts the Tweaks panel
assets/          ← images
CLAUDE.md        ← project context for Claude Code
```

## Run locally
No build required. Either open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000      # → http://localhost:8000
```

## Publish on GitHub + GitHub Pages

1. Create a repo on github.com (e.g. `dunia-website`), then from this folder:

   ```bash
   git init
   git add .
   git commit -m "Dunia Ventures website"
   git branch -M main
   git remote add origin https://github.com/<you>/dunia-website.git
   git push -u origin main
   ```

2. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   pick **`main`** / **`/ (root)`**, Save. Your site goes live at
   `https://<you>.github.io/dunia-website/` within a minute or two.

3. Custom domain (optional): add it under **Settings → Pages → Custom domain** and point your
   DNS as GitHub instructs.

> Because the homepage is `index.html`, the root URL loads correctly. Keep the file structure
> intact — all links and assets use relative paths.

## Alternative one-click hosts
- **Netlify Drop** — drag this folder onto <https://app.netlify.com/drop>.
- **Cloudflare Pages** / **Vercel** — connect the GitHub repo, no build command needed.

## Editing with Claude Code
Open this folder in Claude Code. `CLAUDE.md` describes the architecture, design tokens, and
conventions so changes stay consistent. Common tasks: add real portfolio companies, swap the
placeholder EbonyLife/hero imagery, wire the newsletter form to a provider, add a favicon.

---
© Dunia Ventures · info@wajenzi.fund
