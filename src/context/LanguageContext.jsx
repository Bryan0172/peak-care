import { createContext, useContext, useState } from 'react'
import { translations, defaultLang } from '../i18n/translations'

const LanguageContext = createContext(null)

// Routen-Sprache-Fix (REQ-2026-07-19-PC-SPRACHROUTING-BUG): ohne diese Zuordnung
// initialisiert der Context immer mit defaultLang ('de'), auch auf einer explizit
// englischsprachigen URL — Googlebot/Erstbesucher sahen dort deutschen Content, im
// Rohcode UND nach Hydration. Bewusst scope-begrenzt auf die zwei belegten Seitenpaare
// (kein generisches URL->Sprache-System, Andreas-Go 19.07.).
const EN_ROUTE_PATHS = [
  '/pre-purchase-building-inspection-bulgaria',
  '/technical-property-oversight-bulgaria',
]

function initialLang() {
  if (typeof window !== 'undefined' && EN_ROUTE_PATHS.includes(window.location.pathname.replace(/\/$/, ''))) {
    return 'en'
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
