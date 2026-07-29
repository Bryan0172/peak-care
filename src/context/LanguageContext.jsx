import { createContext, useContext, useState } from 'react'
import { translations, defaultLang } from '../i18n/translations'

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

// A186-SEO (29.07., Andreas-Go): /en und /bg sind jetzt echte, eigenständig indexierte
// Homepage-Varianten (vorher: self-canonical zur deutschen Startseite, siehe
// pc-en-bg-canonical-fix.md). Scope bewusst auf genau diese zwei Pfade begrenzt.
const LANG_ROUTE_PREFIXES = { '/en': 'en', '/bg': 'bg' }

function initialLang() {
  if (typeof window === 'undefined') return defaultLang
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  if (EN_ROUTE_PATHS.includes(path)) return 'en'
  if (LANG_ROUTE_PREFIXES[path]) return LANG_ROUTE_PREFIXES[path]
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
