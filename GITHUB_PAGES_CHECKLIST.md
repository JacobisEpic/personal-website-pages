# GitHub Pages checklist for this site

This project can be published as a static GitHub Pages site, but a few things need to be addressed first.

## Required

- Set the Vite `base` path correctly.
- If this is a project page, the base must match the repository path, such as `/Personal-Website/`.
- If this is a custom-domain site, the base can stay at `/`.
- Publish the `dist/` folder, not `src/`.
- GitHub Pages serves static files only, so the deployment target must be the built output.
- Avoid relying on server-side route fallback.
- GitHub Pages does not rewrite arbitrary client routes to `index.html`.
- This app currently wraps the whole site in `BrowserRouter`, but the visible navigation is hash-based scrolling.
- If you add real routes later, use `HashRouter` or add a deployment strategy that handles SPA fallback.

## Asset paths

- Remove root-absolute paths that assume the site is hosted at `/`.
- The favicon in `index.html` currently points at `/src/assets/logo.svg`, which is fragile for a repo page.
- Prefer imported assets or files under `public/` that are referenced through Vite-aware paths.
- Check all `useGLTF`, image, and CSS background URLs for paths that may break under a repo subpath.
- The 3D model at `./desktop_pc/scene.gltf` and the `public/timemaxx` pages should be verified on the final Pages URL.

## Static-page behavior

- Keep anything that must work on the live site entirely client-side.
- Do not depend on backend routes, server redirects, or runtime environment variables that only exist during local development.
- The contact section and any external services should work without a custom server.

## Deployment hygiene

- Add a GitHub Actions workflow or manual publish step that runs `npm run build` and publishes `dist/`.
- Verify the final Pages URL on desktop and mobile.
- Check that the 3D canvas, images, and the `timemaxx` subpages all load without 404s.

## What is already good

- The app is already built as static front-end code.
- The `timemaxx` pages are pre-rendered HTML files, so they are compatible with GitHub Pages as static assets.
- There is no backend API requirement in the current codebase.
