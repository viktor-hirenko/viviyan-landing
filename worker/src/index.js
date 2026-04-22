const MIME_TYPES = {
  html: 'text/html; charset=utf-8',
  css: 'text/css; charset=utf-8',
  js: 'application/javascript; charset=utf-8',
  mjs: 'application/javascript; charset=utf-8',
  json: 'application/json; charset=utf-8',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  avif: 'image/avif',
  svg: 'image/svg+xml',
  ico: 'image/x-icon',
  woff: 'font/woff',
  woff2: 'font/woff2',
  ttf: 'font/ttf',
  otf: 'font/otf',
  txt: 'text/plain; charset=utf-8',
  xml: 'application/xml',
  map: 'application/json',
  webmanifest: 'application/manifest+json',
}

function getMimeType(key) {
  const ext = key.split('.').pop().toLowerCase()
  return MIME_TYPES[ext] || 'application/octet-stream'
}

function buildResponse(object, key) {
  const headers = new Headers()
  headers.set('Content-Type', getMimeType(key))
  headers.set('Cache-Control', key.endsWith('.html') ? 'no-cache' : 'public, max-age=31536000, immutable')
  if (object.httpEtag) {
    headers.set('ETag', object.httpEtag)
  }
  return new Response(object.body, { headers })
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    let key = decodeURIComponent(url.pathname.replace(/^\/+/, ''))

    if (key === '' || key.endsWith('/')) {
      key = key + 'index.html'
    }

    const object = await env.BUCKET.get(key)

    if (object) {
      return buildResponse(object, key)
    }

    const indexObject = await env.BUCKET.get('index.html')
    if (!indexObject) {
      return new Response('Not Found', { status: 404 })
    }
    return buildResponse(indexObject, 'index.html')
  },
}
