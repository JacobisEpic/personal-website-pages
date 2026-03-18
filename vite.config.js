import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
  const rewrittenPath = timemaxxRouteMap.get(pathname)

  if (rewrittenPath) {
    req.url = `${rewrittenPath}${suffix}`
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
  plugins: [react(), timemaxxCleanRoutesPlugin()],
})
