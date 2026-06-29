// Post-Build-Prerender für peak-care.com (Vite-SPA → statisches HTML je Route).
// Grund: ohne Prerendering sieht Googlebot nur eine leere SPA-Shell mit generischem Titel
// (verifiziert 22.06.) → keine Indexierung trotz gutem Content. Dieses Skript rendert den
// gebauten SPA lokal mit einem Headless-Browser und schreibt je Route dist/<route>/index.html
// mit echtem Titel/H1/Inhalt/Canonical/JSON-LD — genau wie bei der (rankenden) BC-Seite.
// Stripe-Functions/Assets bleiben unberührt; der Client hydratisiert/rendert normal weiter.
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.resolve(__dirname, '..', 'dist')
const PORT = 4178
const GENERIC_TITLE = 'Peak Care – Schimmelschutz & Krisenvorsorge'

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.woff2': 'font/woff2',
  '.woff': 'font/woff', '.ttf': 'font/ttf', '.ico': 'image/x-icon', '.xml': 'application/xml',
  '.txt': 'text/plain', '.map': 'application/json',
}

function serveStatic() {
  return http.createServer((req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0])
      const fp = path.join(DIST, urlPath)
      if (fp.startsWith(DIST) && fs.existsSync(fp) && fs.statSync(fp).isFile()) {
        res.setHeader('Content-Type', MIME[path.extname(fp).toLowerCase()] || 'application/octet-stream')
        return fs.createReadStream(fp).pipe(res)
      }
      res.setHeader('Content-Type', 'text/html') // SPA-Fallback
      fs.createReadStream(path.join(DIST, 'index.html')).pipe(res)
    } catch {
      res.statusCode = 500; res.end('err')
    }
  })
}

function getRoutes() {
  const set = new Set(['/'])
  try {
    const sm = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8')
    for (const m of sm.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const p = m[1].replace(/^https?:\/\/[^/]+/, '') || '/'
      set.add(p.replace(/\/$/, '') || '/')
    }
  } catch (e) { console.warn('sitemap.xml nicht lesbar:', e.message) }
  // statische Routen, die evtl. nicht in der Sitemap stehen
  ;['/ebooks', '/erfolg', '/schimmel-sofort-check', '/mentaler-schutzschild',
    '/krisensicheres-zuhause-fuer-familien', '/datenschutz',
    '/technical-property-oversight-bulgaria', '/technische-immobilienueberwachung-bulgarien',
    '/bauinspektion-vor-dem-kauf-bulgarien', '/pre-purchase-building-inspection-bulgaria',
  ].forEach((r) => set.add(r))
  return [...set]
}

const routes = getRoutes()
const server = serveStatic()
await new Promise((r) => server.listen(PORT, r))
console.log(`Prerender: ${routes.length} Routen, Server auf :${PORT}`)

let ok = 0, fail = 0, generic = 0
let browser
try {
  browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] })
for (const route of routes) {
  const page = await browser.newPage()
  try {
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'domcontentloaded', timeout: 15000 })
    // auf echten, per-Route-Inhalt warten (Titel != generisch ODER H1 vorhanden)
    await page.waitForFunction(
      (gt) => {
        const t = document.title || ''
        return (t && t !== gt) || !!document.querySelector('h1')
      },
      { timeout: 15000 }, GENERIC_TITLE,
    ).catch(() => {})
    // Settle: der h1-Fallback oben kann aufloesen, BEVOR der useSEO/Helmet-useEffect
    // den Per-Seiten-Titel gesetzt hat (Effects laufen nach dem Paint). Kurz gezielt
    // auf den gesetzten Titel warten — verhindert, dass faelschlich der Home-/Generic-Titel
    // erfasst wird. Loest sofort aus, wenn der Titel schon steht; max 4s bei titellosen Seiten.
    await page.waitForFunction(
      (gt) => (document.title || '') !== gt,
      { timeout: 4000 }, GENERIC_TITLE,
    ).catch(() => {})
    const title = await page.title()
    if (title === GENERIC_TITLE) generic++
    // Canonical normalisieren: jede Seite bekommt ihren Self-Canonical (Apex) — fixt die alten
    // Helmet-Seiten (Service/Technical/...), die sonst faelschlich auf die Home zeigen.
    const canon = 'https://peak-care.com' + (route === '/' ? '/' : route)
    await page.evaluate((c) => {
      let l = document.head.querySelector('link[rel="canonical"]')
      if (!l) { l = document.createElement('link'); l.setAttribute('rel', 'canonical'); document.head.appendChild(l) }
      l.setAttribute('href', c)
      const o = document.head.querySelector('meta[property="og:url"]')
      if (o) o.setAttribute('content', c)
    }, canon)
    const html = '<!DOCTYPE html>\n' + (await page.evaluate(() => document.documentElement.outerHTML))
    const outDir = route === '/' ? DIST : path.join(DIST, route)
    fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(path.join(outDir, 'index.html'), html)
    console.log(`  ✅ ${route} → "${title.slice(0, 55)}"`)
    ok++
  } catch (e) {
    console.log(`  ❌ ${route}: ${String(e).slice(0, 90)}`)
    fail++
  } finally {
    await page.close()
  }
}
  await browser.close()
} catch (e) {
  console.warn('⚠️ Prerender uebersprungen (Headless-Browser-Fehler) — Build laeuft trotzdem weiter, SPA bleibt funktionsfaehig:', String(e).slice(0, 140))
} finally {
  try { server.close() } catch {}
  try { if (browser) await browser.close() } catch {}
}
console.log(`Prerender fertig: ${ok} ok · ${fail} Fehler · ${generic} mit generischem Titel (sollte ~0 sein) · ${routes.length} Routen`)
// Bewusst KEIN process.exit(1): Prerender-Probleme duerfen Build/Deploy NICHT blockieren.
