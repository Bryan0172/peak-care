import React from 'react'
import ReactDOM from 'react-dom/client'
// Self-hosted Inter (DSGVO: keine Google-Fonts-CDN-Anfrage, keine IP an Google) — alle Subsets inkl. Cyrillic
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import App from './App.jsx'
import './index.css'

// Herkunfts-Erfassung (SEO 13.08.): Landing-URL + UTM + Verweisquelle EINMAL beim ersten
// Seitenaufruf festhalten. Muss hier stehen und nicht im Formular: die Money-Pages verlinken
// per SPA-Navigation auf /#kontakt, dort ist die urspruengliche Landing-URL bereits
// ueberschrieben. sessionStorage ueberlebt die SPA-Navigation, aber nicht den Tab — genau
// die richtige Lebensdauer fuer "aus welchem Kanal kam dieser eine Besuch".
try {
  if (!sessionStorage.getItem('pc_origin')) {
    const p = new URLSearchParams(window.location.search)
    const utm = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
      .map((k) => (p.get(k) ? k + '=' + p.get(k) : null))
      .filter(Boolean)
      .join(' | ')
    sessionStorage.setItem(
      'pc_origin',
      [
        'Einstieg: ' + window.location.pathname,
        'Kampagne: ' + (utm || '—'),
        'Verweis: ' + (document.referrer || 'direkt/unbekannt'),
      ].join(' · ')
    )
  }
} catch (e) {
  // sessionStorage kann blockiert sein (Privatmodus, strenge Cookie-Einstellung).
  // Herkunft ist Zusatzinfo und darf NIE ein Sendehindernis fuer einen Lead sein.
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
