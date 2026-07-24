# Portfolio Site

Static HTML/CSS/JS, no build step. Deploy directly on GitHub Pages.

## Deploy (fastest path — new repo)

```bash
# from this folder
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/FiRe088/FiRe088.github.io.git
git push -u origin main
```

Repo name must be exactly `FiRe088.github.io` for this to serve at
`https://FiRe088.github.io` automatically with no further config —
GitHub treats that exact naming pattern as a user site.

If you'd rather keep it under a different repo name (e.g. `portfolio`),
push there instead, then go to **Settings → Pages** on GitHub and set
Source to "Deploy from a branch", branch `main`, folder `/ (root)`. It
will serve at `https://FiRe088.github.io/portfolio/` instead.

## Local preview before deploying

```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

## Things to customize before going live

- **Project links**: `E-Commerce Real-Time Lakehouse` and `Irish Grid
  Carbon Intensity Tracker` currently link to your GitHub profile, not
  a specific repo — the actual repo names weren't in the source
  material. Update the `href` on those two `.project-link` anchors in
  `index.html` once you have the real URLs.
- **CV download**: the hero's "Get in touch" button was originally a
  CV download pointing at `/CV.pdf`, which doesn't exist yet. Drop a
  real `CV.pdf` into this folder and you can restore that button by
  changing its `href` back to `/CV.pdf` with a `download` attribute.
- **Phone number**: not included on the live site by design (avoids
  scraping/spam) — only email and LinkedIn are public. Add it to the
  Contact section manually if you want it visible.
