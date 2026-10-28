import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom'

// Interne Links immer mit abschliessendem Schrägstrich: der Server leitet /pfad per 301 auf /pfad/ um
// und alle Canonicals/Sitemap-URLs tragen den Schrägstrich (MARKETING WEB-HEALTH 26.10.: 685 Weiterleitungen).
// Ausnahmen: Wurzel, Dateien (mit Endung), Fremd-URLs, Hash-/Query-Teil bleibt erhalten.
export function withTrailingSlash(to) {
  if (typeof to !== 'string' || !to.startsWith('/') || to.startsWith('//')) return to
  const m = /^([^?#]*)([?#].*)?$/.exec(to)
  const path = m[1]
  if (path === '' || path === '/' || path.endsWith('/') || /\.[a-z0-9]{2,5}$/i.test(path)) return to
  return `${path}/${m[2] || ''}`
}

export function Link({ to, ...rest }) {
  return <RouterLink to={withTrailingSlash(to)} {...rest} />
}

export function NavLink({ to, ...rest }) {
  return <RouterNavLink to={withTrailingSlash(to)} {...rest} />
}
