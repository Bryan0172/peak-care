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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
