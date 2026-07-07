# Deployment

## Current Target

The current GitHub Pages deployment URL is:
https://jacobchin.org/

The site uses a custom domain through `public/CNAME`.
GitHub DNS and HTTPS validation can take time after the domain is configured.
Do not force HTTPS in app code.

## Vite Base Path

Vite needs a root `base` value because the static files are served from `jacobchin.org`.
The base path is read from `VITE_BASE_PATH` in [vite.config.js](vite.config.js).
If `VITE_BASE_PATH` is not set, the base defaults to `/`.
The value is normalized to include both a leading slash and a trailing slash.

Use this base for the custom domain:

```bash
VITE_BASE_PATH=/
```

Leaving `VITE_BASE_PATH` unset is equivalent to `/`.

## GitHub Actions

The workflow at [.github/workflows/deploy.yml](.github/workflows/deploy.yml) deploys on pushes to `main`.
It uses npm because this repo has a current `package-lock.json`, the README uses npm commands, and `npm ci --legacy-peer-deps` avoids lockfile churn in CI.
The legacy peer flag is required because `react-tilt@0.1.4` declares old React peer dependencies while this app uses React 18.
The workflow sets `VITE_BASE_PATH=/`, runs `npm run build`, uploads `dist/` as the Pages artifact, and deploys with the official GitHub Pages actions.

The repo also contains `yarn.lock`.
It was left in place to avoid unrelated lockfile churn.

## Static Assets

Files in `public/` are copied directly into `dist/`.
The 3D model assets stay in `public/desktop_pc` and `public/planet`.
React model loaders build their URLs with `import.meta.env.BASE_URL` so the same source works at `/`.
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

Run an explicit root-base build:

```bash
VITE_BASE_PATH=/ npm run build
```

Preview the built site:

```bash
npm run preview
```

When previewing the root-base build, test the app at:
http://localhost:4173/

## Custom-Domain URLs

These URLs should work after GitHub Pages finishes DNS validation:

- https://jacobchin.org/
- https://jacobchin.org/timemaxx/
- https://jacobchin.org/timemaxx/index.html
- https://jacobchin.org/timemaxx/support.html
- https://jacobchin.org/timemaxx/privacy.html
- https://jacobchin.org/timemaxx/terms.html

## Custom Domain

The active custom domain is declared in [public/CNAME](public/CNAME).
That file must contain exactly:

```text
jacobchin.org
```

## Remaining GitHub Pages Settings

In the GitHub repository settings, set Pages source to GitHub Actions.
Leave HTTPS enforcement to GitHub Pages after DNS and certificate validation complete.
