# GitHub Pages Checklist

Use [DEPLOYMENT.md](DEPLOYMENT.md) as the deployment source of truth.

## Ready Now

- The temporary GitHub Pages URL is `https://jacobisepic.github.io/personal-website-pages/`.
- The workflow builds with `VITE_BASE_PATH=/personal-website-pages/`.
- The Vite base defaults to `/` when `VITE_BASE_PATH` is unset.
- The app does not require `BrowserRouter` for the current hash-scrolling page.
- The 3D model URLs are based on `import.meta.env.BASE_URL`.
- The favicon is loaded from the public root through `/logo.svg`, which Vite rewrites with the configured base.
- The TimeMaxx static pages use relative internal links.
- No `public/CNAME` file has been added.
- No `CNAME` file has been added anywhere.

## Validate Before Enabling Pages

- Run `npm ci --legacy-peer-deps` if dependencies are not installed.
- Run `npm run build`.
- Run `VITE_BASE_PATH=/personal-website-pages/ npm run build`.
- Run `npm run preview`.
- Test `http://localhost:4173/personal-website-pages/` after a project-page build.
- Confirm `dist/index.html` points to `/personal-website-pages/assets/...` for the project-page build.
- Confirm `dist/index.html` points to `/personal-website-pages/logo.svg` for the project-page build favicon.
- Confirm there are no production references to `/src/`.
- Confirm `dist/desktop_pc/scene.gltf` exists.
- Confirm `dist/planet/scene.gltf` exists.
- Confirm `dist/timemaxx/index.html` exists.
- Confirm `dist/timemaxx/support.html` exists.
- Confirm `dist/timemaxx/privacy.html` exists.
- Confirm `dist/timemaxx/terms.html` exists.
- Confirm no `CNAME` file exists in the built output.

## Expected Temporary URLs

- `https://jacobisepic.github.io/personal-website-pages/`
- `https://jacobisepic.github.io/personal-website-pages/timemaxx/`
- `https://jacobisepic.github.io/personal-website-pages/timemaxx/index.html`
- `https://jacobisepic.github.io/personal-website-pages/timemaxx/support.html`
- `https://jacobisepic.github.io/personal-website-pages/timemaxx/privacy.html`
- `https://jacobisepic.github.io/personal-website-pages/timemaxx/terms.html`

## Future Custom Domain

The future custom domain is `https://jacobchin.org/`.
Do not configure it in GitHub Pages yet.
Do not add `public/CNAME` yet.

When ready, remove `jacobchin.org` from the current hosting provider first.
Then add `public/CNAME`, configure GitHub Pages custom domain settings, update DNS, wait for propagation, and enable Enforce HTTPS when GitHub allows it.
After the custom-domain switch, build with base `/`.
