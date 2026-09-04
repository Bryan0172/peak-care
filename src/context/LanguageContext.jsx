import { createContext, useContext, useState } from 'react'
import { translations, defaultLang } from '../i18n/translations'
import { getPostBySlug } from '../data/posts'

const LanguageContext = createContext(null)

// Routen-Sprache-Fix (REQ-2026-07-19-PC-SPRACHROUTING-BUG): ohne diese Zuordnung
// initialisiert der Context immer mit defaultLang ('de'), auch auf einer explizit
// englischsprachigen URL — Googlebot/Erstbesucher sahen dort deutschen Content, im
// Rohcode UND nach Hydration. Bewusst scope-begrenzt auf die belegten Seitenpaare
// (kein generisches URL->Sprache-System, Andreas-Go 19.07.).
const EN_ROUTE_PATHS = [
  '/pre-purchase-building-inspection-bulgaria',
  '/technical-property-oversight-bulgaria',
]

// REQ-2026-08-25-PC-UND-PCAI-ANTWORTEN-…-DUPLIKATE: same bug class as EN_ROUTE_PATHS
// above, missing half — the German-slug counterpart of each pair above was never added
// here, so it fell through to defaultLang ('en') and rendered byte-identical to its
// English twin (same title, lang="en" under a German URL, both self-canonical). Fixed
// symmetrically, same scope discipline as the 19.07. fix (exact known page pairs only).
const DE_ROUTE_PATHS = [
  '/bauinspektion-vor-dem-kauf-bulgarien',
  '/technische-immobilienueberwachung-bulgarien',
]

// A186-SEO (29.07., Andreas-Go): /en und /bg sind jetzt echte, eigenständig indexierte
// Homepage-Varianten (vorher: self-canonical zur deutschen Startseite, siehe
// pc-en-bg-canonical-fix.md). Scope bewusst auf genau diese zwei Pfade begrenzt.
const LANG_ROUTE_PREFIXES = { '/en': 'en', '/bg': 'bg' }

// REQ-2026-08-19-PC-49-URLS-...: same bug, wider surface. The 19.07. fix above only
// covered two static landing-page paths — every /blog/:slug post carrying its own
// `lang: en` frontmatter (11 posts) still fell through to defaultLang here, so
// Googlebot/the Puppeteer prerender saw a German nav/footer/CTA block wrapped around
// English article text. Blog posts already declare their language in frontmatter;
// read it instead of hardcoding another static list.
const BLOG_POST_PATH = /^\/blog\/([^/]+)$/

function initialLang() {
  if (typeof window === 'undefined') return defaultLang
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  if (EN_ROUTE_PATHS.includes(path)) return 'en'
  if (DE_ROUTE_PATHS.includes(path)) return 'de'
  if (LANG_ROUTE_PREFIXES[path]) return LANG_ROUTE_PREFIXES[path]
  const blogMatch = path.match(BLOG_POST_PATH)
  if (blogMatch) {
    const post = getPostBySlug(blogMatch[1])
    if (post?.lang === 'en') return 'en'
  }
  return defaultLang
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang)
  const t = translations[lang]
  // E-books always shown in EN when BG is selected (books not available in Bulgarian)
  const tBooks = lang === 'bg' ? translations['en'] : t
  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tBooks }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
