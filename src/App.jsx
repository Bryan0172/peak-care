import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
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
const HausverwaltungBulgaria             = lazy(() => import('./pages/HausverwaltungBulgaria'))
const Datenschutz        = lazy(() => import('./pages/Datenschutz'))
const PrivacyPolicy      = lazy(() => import('./pages/PrivacyPolicy'))
const PrivacyPolicyBg    = lazy(() => import('./pages/PrivacyPolicyBg'))
const Impressum          = lazy(() => import('./pages/Impressum'))
const MouldDampSiteVisit = lazy(() => import('./pages/MouldDampSiteVisit'))
const LegionellenHotelBulgarien = lazy(() => import('./pages/LegionellenHotelBulgarien'))

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

// Anker (#kontakt, #leistungen) nach vollem Seitenaufruf: Die Seite wird erst clientseitig aufgebaut,
// der Browser findet den Anker beim Laden noch nicht (01.11.2026, dot P1.3 "Kontaktweg").
function HashScroll() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) return undefined
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    const t = setInterval(() => {
      const el = document.getElementById(id)
      tries += 1
      if (el) {
        el.scrollIntoView({ block: 'start', behavior: 'instant' })
        clearInterval(t)
      } else if (tries > 25) {
        clearInterval(t)
      }
    }, 120)
    return () => clearInterval(t)
  }, [pathname, hash])
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
        <HashScroll />
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
                <Route path="/service/hausverwaltung-bulgarien" element={<HausverwaltungBulgaria />} />
                <Route path="/service/building-management-bulgaria" element={<HausverwaltungBulgaria />} />
                <Route path="/service/:slug" element={<ZipperPage />} />
                <Route path="/technical-property-oversight-bulgaria" element={<TechnicalPropertyOversightBulgaria />} />
                <Route path="/technische-immobilienueberwachung-bulgarien" element={<TechnicalPropertyOversightBulgaria />} />
                <Route path="/bauinspektion-vor-dem-kauf-bulgarien" element={<PrePurchaseBuildingSurveyBulgaria />} />
                <Route path="/pre-purchase-building-inspection-bulgaria" element={<PrePurchaseBuildingSurveyBulgaria />} />
                <Route path="/datenschutz" element={<Datenschutz />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/politika-za-poveritelnost" element={<PrivacyPolicyBg />} />
                <Route path="/impressum" element={<Impressum />} />
                {/* W2 PC-3 Landeseite (V-WERBEKAMPAGNE 13.10.2026): nur BG + EN */}
                <Route path="/ogled-muhal-vlaga" element={<MouldDampSiteVisit />} />
                <Route path="/mould-damp-site-visit-bulgaria" element={<MouldDampSiteVisit />} />
                {/* Legionellen-Landingpage (Andreas-Auftrag 30.10.2026): DE/EN/BG */}
                <Route path="/legionellen-wasserhygiene-hotel-bulgarien" element={<LegionellenHotelBulgarien lang="de" />} />
                <Route path="/legionella-water-hygiene-hotels-bulgaria" element={<LegionellenHotelBulgarien lang="en" />} />
                <Route path="/legionela-vodna-higiena-hoteli-bulgaria" element={<LegionellenHotelBulgarien lang="bg" />} />
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
