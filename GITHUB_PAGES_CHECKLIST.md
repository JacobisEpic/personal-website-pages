# GitHub Pages Checklist

Use [DEPLOYMENT.md](DEPLOYMENT.md) as the deployment source of truth.

## Ready Now

- The custom-domain GitHub Pages URL is `https://jacobchin.org/`.
- The workflow builds with `VITE_BASE_PATH=/`.
- The Vite base defaults to `/` when `VITE_BASE_PATH` is unset.
- The app does not require `BrowserRouter` for the current hash-scrolling page.
- The 3D model URLs are based on `import.meta.env.BASE_URL`.
- The favicon is loaded from the public root through `/logo.svg`, which Vite rewrites with the configured base.
- The TimeMaxx static pages use relative internal links.
- `public/CNAME` contains exactly `jacobchin.org`.

## Validate Before Enabling Pages

- Run `npm ci --legacy-peer-deps` if dependencies are not installed.
- Run `npm run build`.
- Run `VITE_BASE_PATH=/ npm run build`.
- Run `npm run preview`.
- Test `http://localhost:4173/` after a root-base build.
- Confirm `dist/index.html` points to `/assets/...`.
- Confirm `dist/index.html` points to `/logo.svg` for the favicon.
- Confirm there are no production references to `/src/`.
- Confirm `dist/desktop_pc/scene.gltf` exists.
- Confirm `dist/planet/scene.gltf` exists.
- Confirm `dist/timemaxx/index.html` exists.
- Confirm `dist/timemaxx/support.html` exists.
- Confirm `dist/timemaxx/privacy.html` exists.
- Confirm `dist/timemaxx/terms.html` exists.
- Confirm `dist/CNAME` contains exactly `jacobchin.org`.

## Expected Custom-Domain URLs

- `https://jacobchin.org/`
- `https://jacobchin.org/timemaxx/`
- `https://jacobchin.org/timemaxx/index.html`
- `https://jacobchin.org/timemaxx/support.html`
- `https://jacobchin.org/timemaxx/privacy.html`
- `https://jacobchin.org/timemaxx/terms.html`

## Custom Domain

The active custom domain is `https://jacobchin.org/`.
GitHub DNS and HTTPS validation can take time after the domain is configured.
Do not force HTTPS in app code.
