import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function normalizeBasePath(value) {
  if (!value) {
    return '/'
  }

  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`

  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

const base = normalizeBasePath(process.env.VITE_BASE_PATH)

const timemaxxRouteMap = new Map([
  ['/timemaxx', '/timemaxx/index.html'],
  ['/timemaxx/', '/timemaxx/index.html'],
  ['/timemaxx/support', '/timemaxx/support.html'],
  ['/timemaxx/privacy', '/timemaxx/privacy.html'],
  ['/timemaxx/terms', '/timemaxx/terms.html'],
])

function rewriteTimemaxxRoute(req) {
  if (!req.url) {
    return
  }

  const queryStart = req.url.search(/[?#]/)
  const pathname = queryStart === -1 ? req.url : req.url.slice(0, queryStart)
  const suffix = queryStart === -1 ? '' : req.url.slice(queryStart)
  const pathnameWithoutBase =
    base !== '/' && pathname.startsWith(base)
      ? `/${pathname.slice(base.length)}`
      : pathname
  const rewrittenPath = timemaxxRouteMap.get(pathnameWithoutBase)

  if (rewrittenPath) {
    req.url = `${base === '/' ? '' : base.slice(0, -1)}${rewrittenPath}${suffix}`
  }
}

function timemaxxCleanRoutesPlugin() {
  return {
    name: 'timemaxx-clean-routes',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewriteTimemaxxRoute(req)
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewriteTimemaxxRoute(req)
        next()
      })
    },
  }
}

export default defineConfig({
  // VITE_BASE_PATH controls where built assets are served from.
  // Use "/" for local dev and the jacobchin.org custom domain.
  base,
  plugins: [react(), timemaxxCleanRoutesPlugin()],
})
