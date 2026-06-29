import { createContext, useContext, useState } from 'react'
import { translations, defaultLang } from '../i18n/translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(defaultLang)
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
