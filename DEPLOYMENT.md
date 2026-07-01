# Deployment

## Current Target

The current temporary GitHub Pages deployment URL is:
https://jacobisepic.github.io/personal-website-pages/

The future custom domain is:
https://jacobchin.org/

Do not add `public/CNAME` yet.
Do not add a `CNAME` file anywhere yet.
Do not configure this repo to claim `jacobchin.org` until the domain is removed from the current hosting provider.

## Vite Base Path

Vite needs a different `base` value depending on where the static files are served.
The base path is read from `VITE_BASE_PATH` in [vite.config.js](vite.config.js).
If `VITE_BASE_PATH` is not set, the base defaults to `/`.
The value is normalized to include both a leading slash and a trailing slash.

Use this base for the temporary GitHub Pages project URL:

```bash
VITE_BASE_PATH=/personal-website-pages/
```

Use this base later for the custom domain:

```bash
VITE_BASE_PATH=/
```

Leaving `VITE_BASE_PATH` unset is equivalent to `/`.

## GitHub Actions

The workflow at [.github/workflows/deploy.yml](.github/workflows/deploy.yml) deploys on pushes to `main`.
It uses npm because this repo has a current `package-lock.json`, the README uses npm commands, and `npm ci --legacy-peer-deps` avoids lockfile churn in CI.
The legacy peer flag is required because `react-tilt@0.1.4` declares old React peer dependencies while this app uses React 18.
The workflow sets `VITE_BASE_PATH=/personal-website-pages/`, runs `npm run build`, uploads `dist/` as the Pages artifact, and deploys with the official GitHub Pages actions.

The repo also contains `yarn.lock`.
It was left in place to avoid unrelated lockfile churn.

## Static Assets

Files in `public/` are copied directly into `dist/`.
The 3D model assets stay in `public/desktop_pc` and `public/planet`.
React model loaders build their URLs with `import.meta.env.BASE_URL` so the same source works under `/personal-website-pages/` and `/`.
The favicon uses `/logo.svg` in [index.html](index.html), which Vite rewrites with the configured build base.
The TimeMaxx static pages use relative links because files under `public/` are not transformed by Vite.

## Local Testing

Install dependencies if `node_modules/` is missing:

```bash
npm ci --legacy-peer-deps
```

Run a normal custom-domain style build:

```bash
npm run build
```

Run a temporary GitHub Pages project build:

```bash
VITE_BASE_PATH=/personal-website-pages/ npm run build
```

Preview the built site:

```bash
npm run preview
```

When previewing a project-page build, test the app at:
http://localhost:4173/personal-website-pages/

## Temporary Deployment URLs

After the temporary deployment, these URLs should work:

- https://jacobisepic.github.io/personal-website-pages/
- https://jacobisepic.github.io/personal-website-pages/timemaxx/
- https://jacobisepic.github.io/personal-website-pages/timemaxx/index.html
- https://jacobisepic.github.io/personal-website-pages/timemaxx/support.html
- https://jacobisepic.github.io/personal-website-pages/timemaxx/privacy.html
- https://jacobisepic.github.io/personal-website-pages/timemaxx/terms.html

## Future Custom-Domain URLs

After the custom-domain switch, these URLs should work:

- https://jacobchin.org/
- https://jacobchin.org/timemaxx/
- https://jacobchin.org/timemaxx/index.html
- https://jacobchin.org/timemaxx/support.html
- https://jacobchin.org/timemaxx/privacy.html
- https://jacobchin.org/timemaxx/terms.html

## Future Domain Switch

When ready to switch `jacobchin.org` to GitHub Pages:

1. Remove `jacobchin.org` from the current hosting provider.
2. Add a `public/CNAME` file containing exactly:

```text
jacobchin.org
```

3. Commit and push that file.
4. In GitHub repo settings, enable GitHub Pages with GitHub Actions as the source.
5. Add `jacobchin.org` as the custom domain in GitHub Pages settings.
6. Update DNS records at the domain registrar to point to GitHub Pages.
7. Wait for DNS propagation.
8. Enable Enforce HTTPS once GitHub allows it.

At that point, update the workflow build base to `/` by removing `VITE_BASE_PATH=/personal-website-pages/` or changing it to `VITE_BASE_PATH=/`.
Add canonical URLs for `https://jacobchin.org/` only after the domain is actually switched.

## Remaining GitHub Pages Settings

In the GitHub repository settings, set Pages source to GitHub Actions.
Do not enter `jacobchin.org` as the custom domain until the current hosting provider has released it.
