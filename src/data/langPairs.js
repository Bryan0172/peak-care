// EIL-Website-Korrekturen 19.10.2026 (SEO/GEO, dot-Befund): bekannte Sprachpaare an EINER Stelle.
// Genutzt von (1) Header-Sprachumschalter: wer auf einer Seite mit Gegenstueck die Sprache
// wechselt, landet auf der Seite in dieser Sprache (vorher blieb der Haupttext deutsch, nur
// Navigation/Fusszeile wechselten) und (2) ZipperPage: hreflang-Alternates fuer die alten
// /service/-Sprachversionen, die bisher keine hatten. Scope bewusst auf belegte, inhaltlich
// gleichwertige Paare begrenzt (kein generisches URL->Sprache-System, gleiche Disziplin wie
// LanguageContext.jsx). Seiten ohne Gegenstueck (kellerabdichtung-bansko,
// renovierung-umbau-ausbau-bulgarien) stehen hier absichtlich nicht.
export const LANG_PAIRS = [
  { de: '/service/schimmelbeseitigung-bansko', en: '/service/mold-removal-bansko' },
  { de: '/service/schimmelbeseitigung-sofia', en: '/service/mold-removal-sofia' },
  { de: '/service/gebaudesanierung-bansko', en: '/service/building-renovation-bansko' },
  { de: '/service/hausverwaltung-bulgarien', en: '/service/building-management-bulgaria' },
  { de: '/bauinspektion-vor-dem-kauf-bulgarien', en: '/pre-purchase-building-inspection-bulgaria' },
  { de: '/technische-immobilienueberwachung-bulgarien', en: '/technical-property-oversight-bulgaria' },
  { en: '/mould-damp-site-visit-bulgaria', bg: '/ogled-muhal-vlaga' },
]

const norm = (p) => (p || '/').replace(/\/$/, '') || '/'

export function getLangPair(pathname) {
  const p = norm(pathname)
  return LANG_PAIRS.find((pair) => Object.values(pair).includes(p)) || null
}

// Gegenstueck in der Zielsprache, sonst null (dann bleibt die Seite, wie bisher).
export function counterpartPath(pathname, targetLang) {
  const pair = getLangPair(pathname)
  return pair && pair[targetLang] ? pair[targetLang] : null
}
