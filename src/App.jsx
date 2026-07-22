import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { LanguageProvider, useLang } from './context/LanguageContext'
import { Suspense, lazy } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'

// Lazy-loaded pages — each loads only when visited (code splitting)
const Home               = lazy(() => import('./pages/Home'))
const Blog               = lazy(() => import('./pages/Blog'))
const BlogPost           = lazy(() => import('./pages/BlogPost'))
const Ebooks             = lazy(() => import('./pages/Ebooks'))
const Success            = lazy(() => import('./pages/Success'))
const LeadMagnet         = lazy(() => import('./pages/LeadMagnet'))
const MentalerSchutzschild  = lazy(() => import('./pages/MentalerSchutzschild'))
const KrisensicheresZuhause = lazy(() => import('./pages/KrisensicheresZuhause'))
const ZipperPage            = lazy(() => import('./pages/ZipperPage'))
const TechnicalPropertyOversightBulgaria = lazy(() => import('./pages/TechnicalPropertyOversightBulgaria'))
const PrePurchaseBuildingSurveyBulgaria  = lazy(() => import('./pages/PrePurchaseBuildingSurveyBulgaria'))
const Datenschutz        = lazy(() => import('./pages/Datenschutz'))

// Setzt <html lang> auf die tatsaechliche Seitensprache (P3 aus dem Web-Health-Report,
// Andreas-Go 22.07.). Ohne das lieferte JEDE Route lang="de" — auch die englischen —,
// weil der Wert statisch in index.html stand und der Prerender ihn nur abfotografiert hat.
// Der Prerender serialisiert document.documentElement.outerHTML, Helmet schreibt das
// Attribut vor dem Snapshot => der Wert landet auch im ausgelieferten statischen HTML.
// Einzelne Seiten duerfen das ueberschreiben (ZipperPage tut es aus seinem eigenen
// lang-Feld); der spaetere/tiefere Helmet gewinnt.
function HtmlLang() {
  const { lang } = useLang()
  return <Helmet htmlAttributes={{ lang }} />
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
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/ebooks" element={<Ebooks />} />
                <Route path="/erfolg" element={<Success />} />
                <Route path="/schimmel-sofort-check" element={<LeadMagnet />} />
                <Route path="/mentaler-schutzschild" element={<MentalerSchutzschild />} />
                <Route path="/krisensicheres-zuhause" element={<KrisensicheresZuhause />} />
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
