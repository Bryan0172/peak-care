import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { useSEO } from '../hooks/useSEO'
import CheckoutModal from '../components/CheckoutModal'

const SCHUTZSCHILD = {
  de: {
    badge: '🆕 NEU',
    tag: 'Mental Health · Krisenvorsorge',
    title: 'Mentaler Schutzschild 2026',
    subtitle: 'Endlich Ruhe im Kopf – trotz Nachrichtenchaos',
    desc: 'Der 7-Tage Angst-Reset. Ein Konzept, eine Übung, eine Aufgabe – max. 30 Min. täglich. Neurobiologisch fundiert. Mit Arbeitsblättern für jeden Tag.',
    price: '22 €',
    cta: 'Jetzt kaufen – Sofort als PDF',
    more: 'Mehr erfahren',
    stripe: 'https://buy.stripe.com/9B67sN4ME9SBgdG8EP1Jm0b',
    cover: '/images/covers/mentaler-schutzschild-de.jpg',
  },
  en: {
    badge: '🆕 NEW',
    tag: 'Mental Health · Crisis Preparedness',
    title: 'Mental Shield 2026',
    subtitle: 'Finally Calm – Despite the News Chaos',
    desc: 'The 7-Day Anxiety Reset. One concept, one exercise, one task – max. 30 min. daily. Neuroscience-based. Includes worksheets for every day.',
    price: '€22',
    cta: 'Buy Now – Instant PDF Download',
    more: 'Learn more',
    stripe: 'https://buy.stripe.com/bJedRb92U8Ox0eIaMX1Jm0c',
    cover: '/images/covers/mentaler-schutzschild-en.jpg',
  },
}

export default function Ebooks() {
  const { t, tBooks, lang } = useLang()
  const e = tBooks.ebooks
  const h = tBooks.ebooksHome
  const [checkout, setCheckout] = useState(null)
  const [buying, setBuying] = useState(null)

  // BG visitors see EN book covers (books not available in Bulgarian)
  const coverSuffix = lang === 'en' || lang === 'bg' ? 'en' : 'de'
  const ms = SCHUTZSCHILD[lang === 'bg' ? 'en' : lang] || SCHUTZSCHILD.en

  useSEO({
    title: 'E-Books: Schimmel & Krisenvorsorge als Sofort-Download | Peak Care',
    description:
      'Digitale Ratgeber von Peak Care: Schimmel und Feuchtigkeit in den Griff bekommen und ein krisensicheres Zuhause schaffen. Sofort-Download in DE, EN und BG.',
    canonical: 'https://www.peak-care.com/ebooks',
  })

  const ebooks = [
    {
      id: 'ebook_schimmel',
      title: h.ebook1Title,
      price: h.ebook1Price,
      desc: h.ebook1Desc,
      badge: e.bestseller,
      badgeClass: 'bg-teal-500 text-white',
      gradient: 'from-teal-600 to-teal-800',
      cover: `/images/covers/schimmel-${coverSuffix}.jpg`,
      pages: e.pages60,
      features: e.features.mold,
    },
    {
      id: 'ebook_krisen',
      title: h.ebook2Title,
      price: h.ebook2Price,
      desc: h.ebook2Desc,
      badge: e.recommended,
      badgeClass: 'bg-orange-500 text-white',
      gradient: 'from-orange-600 to-red-700',
      cover: `/images/covers/krisensicher-${coverSuffix}.jpg`,
      pages: e.pages80,
      features: e.features.crisis,
    },
    {
      id: 'ebook_bundle',
      title: h.bundleTitle,
      price: h.bundlePrice,
      desc: h.bundleDesc,
      badge: h.bundleBadge,
      badgeClass: 'bg-yellow-400 text-gray-900',
      gradient: 'from-yellow-500 to-orange-600',
      cover: `/images/covers/bundle-${coverSuffix}.jpg`,
      pages: e.pages140,
      features: e.features.bundle,
      isBundle: true,
    },
  ]

  function handleBuy(book) {
    if (buying) return
    setBuying(book.id)
    setCheckout({ productId: `${book.id}_${lang}`, productName: book.title, coverImage: book.cover })
  }

  function handleClose() {
    setCheckout(null)
    setBuying(null)
  }

  useSEO({
    title: 'E-Books: Schimmel & Krisenvorsorge als Sofort-Download | Peak Care',
    description: 'Digitale Ratgeber von Peak Care: Schimmel und Feuchtigkeit in den Griff bekommen und ein krisensicheres Zuhause schaffen. Sofort-Download in DE, EN und BG.',
    canonical: 'https://peak-care.com/ebooks',
  })

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gray-950 py-16 text-center">
        <span className="inline-block bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          {e.badge}
        </span>
        <h1 className="text-4xl font-bold text-white mb-3">{e.headline}</h1>
        <p className="text-gray-400 max-w-xl mx-auto">{e.sub}</p>
      </div>

      {/* ── MENTALER SCHUTZSCHILD FEATURED CARD ── */}
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-4">
        <div className="rounded-3xl overflow-hidden flex flex-col md:flex-row"
          style={{ background: 'linear-gradient(135deg, #0B1221 0%, #1B2E5E 100%)', border: '1px solid rgba(232,200,74,0.3)' }}>
          {/* Cover */}
          <div className="md:w-56 shrink-0 flex items-center justify-center p-8">
            <img
              src={ms.cover}
              alt={ms.title}
              className="rounded-xl shadow-2xl max-h-64 object-contain"
            />
          </div>
          {/* Content */}
          <div className="flex-1 p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: 'rgba(232,200,74,0.2)', color: '#E8C84A', border: '1px solid rgba(232,200,74,0.4)' }}>
                {ms.badge}
              </span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{ms.tag}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-1" style={{ color: '#FFFFFF' }}>{ms.title}</h2>
            <p className="text-lg font-semibold mb-3" style={{ color: '#E8C84A' }}>{ms.subtitle}</p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>{ms.desc}</p>
            <div className="flex flex-wrap items-center gap-4">
              <a href={ms.stripe} target="_blank" rel="noopener noreferrer"
                className="inline-block font-bold px-7 py-3 rounded-xl transition-transform hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #E8C84A, #D4A820)', color: '#0B1221', textDecoration: 'none' }}>
                {ms.cta} · {ms.price}
              </a>
              <Link to="/mentaler-schutzschild"
                className="text-sm font-semibold underline-offset-2 hover:underline"
                style={{ color: 'rgba(255,255,255,0.6)' }}>
                {ms.more} →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ebooks.map((book) => (
            <div
              key={book.id}
              className={`card flex flex-col overflow-hidden ${
                book.isBundle ? 'ring-2 ring-yellow-400' : ''
              }`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full object-cover"
                  style={{ aspectRatio: '2/3', objectPosition: 'top' }}
                />
                <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full shadow ${book.badgeClass}`}>
                  {book.badge}
                </span>
              </div>

              <div className="p-7 flex flex-col flex-grow">
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{book.desc}</p>
                <ul className="space-y-2 mb-6 flex-grow">
                  {book.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="w-4 h-4 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleBuy(book)}
                  disabled={!!buying}
                  className={`w-full font-bold py-3 rounded-xl transition-all text-sm text-center disabled:opacity-60 disabled:cursor-not-allowed ${
                    book.isBundle
                      ? 'bg-yellow-400 hover:bg-yellow-300 text-gray-900'
                      : 'btn-primary'
                  }`}
                >
                  {buying === book.id ? '⏳ Wird geladen…' : `${e.buyNow} - ${book.price}`}
                </button>
                <p className="text-xs text-center text-gray-400 mt-2">{book.pages}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white rounded-2xl p-6 flex flex-wrap justify-center gap-8 text-sm text-gray-500 shadow-sm">
          {[
            { text: e.trustSSL },
            { text: e.trustDownload },
            { text: e.trustStripe },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {checkout && (
        <CheckoutModal
          productId={checkout.productId}
          productName={checkout.productName}
          coverImage={checkout.coverImage}
          onClose={handleClose}
        />
      )}
    </div>
  )
}
