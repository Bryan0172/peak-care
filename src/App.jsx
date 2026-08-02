import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LanguageProvider, useLang } from './context/LanguageContext'
import { Suspense, lazy, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'

// Lazy-loaded pages — each loads only when visited (code splitting)
const Home               = lazy(() => import('./pages/Home'))
const Blog               = lazy(() => import('./pages/Blog'))
const BlogPost           = lazy(() => import('./pages/BlogPost'))
const LeadMagnet         = lazy(() => import('./pages/LeadMagnet'))
const ZipperPage            = lazy(() => import('./pages/ZipperPage'))
const TechnicalPropertyOversightBulgaria = lazy(() => import('./pages/TechnicalPropertyOversightBulgaria'))
const PrePurchaseBuildingSurveyBulgaria  = lazy(() => import('./pages/PrePurchaseBuildingSurveyBulgaria'))
const Datenschutz        = lazy(() => import('./pages/Datenschutz'))

// Setzt <html lang> auf die tatsaechliche Seitensprache (P3 aus dem Web-Health-Report,
// Andreas-Go 22.07.). Ohne das lieferte JEDE Route lang="de" — auch die englischen —,
// weil der Wert statisch in index.html stand und der Prerender ihn nur abfotografiert hat.
// ‼️ 29.07. (A186-SEO): react-helmet-async erwies sich hierfuer als genauso unzuverlaessig
// wie useSEO.js es fuer title/canonical schon dokumentiert ("nie zuverlaessig applied,
// verifiziert in dev UND prod build") — bei /en bzw. /bg blieb <html lang> je nach
// Verarbeitungsreihenfolge zufaellig auf "de" haengen, obwohl title/canonical (die
// bereits synchron per document.title/setAttribute statt Helmet gesetzt werden) korrekt
// waren. Direkte, synchrone DOM-Zuweisung statt Helmet behebt die Race-Condition an der
// Wurzel. ZipperPage (eigenes Helmet-htmlAttributes) bleibt unberuehrt, ueberschreibt aber
// zuverlaessig ebenfalls nur durch den Effect hier, da beide auf dasselbe Attribut zielen.
function HtmlLang() {
  const { lang } = useLang()
  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
  }, [lang])
  return null
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
    <LanguageProvider>
      <BrowserRouter>
        <HtmlLang />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                {/* A186-SEO (29.07.): eigene, indexierbare Sprachvarianten der Startseite —
                    vorher self-canonical zur deutschen Startseite, s. LanguageContext.jsx */}
                <Route path="/en" element={<Home />} />
                <Route path="/bg" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/schimmel-sofort-check" element={<LeadMagnet />} />
                <Route path="/service/:slug" element={<ZipperPage />} />
                <Route path="/technical-property-oversight-bulgaria" element={<TechnicalPropertyOversightBulgaria />} />
                <Route path="/technische-immobilienueberwachung-bulgarien" element={<TechnicalPropertyOversightBulgaria />} />
                <Route path="/bauinspektion-vor-dem-kauf-bulgarien" element={<PrePurchaseBuildingSurveyBulgaria />} />
                <Route path="/pre-purchase-building-inspection-bulgaria" element={<PrePurchaseBuildingSurveyBulgaria />} />
                <Route path="/datenschutz" element={<Datenschutz />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
    </HelmetProvider>
  )
}
