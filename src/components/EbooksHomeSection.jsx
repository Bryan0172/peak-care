import { useState } from 'react'
import { useLang } from '../context/LanguageContext'

export default function EbooksHomeSection({ onBuy }) {
  const { t, tBooks, lang } = useLang()
  const e = tBooks.ebooksHome
  // BG visitors see EN book covers (books not available in Bulgarian)
  const coverSuffix = lang === 'en' || lang === 'bg' ? 'en' : 'de'

  const books = [
    {
      id: 'ebook_schimmel',
      title: e.ebook1Title,
      desc: e.ebook1Desc,
      price: e.ebook1Price,
      badge: tBooks.ebooks.bestseller,
      badgeClass: 'bg-teal-500 text-white',
      cover: `/images/covers/schimmel-${coverSuffix}.jpg`,
      btn: e.buyBtn,
    },
    {
      id: 'ebook_krisen',
      title: e.ebook2Title,
      desc: e.ebook2Desc,
      price: e.ebook2Price,
      badge: tBooks.ebooks.recommended,
      badgeClass: 'bg-orange-500 text-white',
      cover: `/images/covers/krisensicher-${coverSuffix}.jpg`,
      btn: e.buyBtn,
    },
    {
      id: 'ebook_bundle',
      title: e.bundleTitle,
      desc: e.bundleDesc,
      price: e.bundlePrice,
      badge: e.bundleBadge,
      badgeClass: 'bg-yellow-400 text-gray-900',
      cover: `/images/covers/bundle-${coverSuffix}.jpg`,
      btn: e.bundleBtn,
      isBundle: true,
    },
  ]

  return (
    <section id="ebooks" className="py-20 bg-gray-950 relative overflow-hidden">
      {/* subtle bg texture */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            {e.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">{e.headline}</h2>
          <p className="text-gray-400 max-w-xl mx-auto">{e.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className={`rounded-2xl overflow-hidden flex flex-col border ${
                book.isBundle
                  ? 'border-yellow-400/40 shadow-lg shadow-yellow-500/10'
                  : 'border-white/10'
              } bg-gray-900`}
            >
              {/* Cover Image */}
              <div className="relative overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full object-cover"
                  style={{ aspectRatio: '2/3', objectPosition: 'top' }}
                />
                <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full shadow ${book.badgeClass}`}>
                  {book.badge}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-grow">{book.desc}</p>
                <button
                  onClick={() => onBuy(book.id)}
                  className={`w-full font-bold py-3 rounded-xl transition-all duration-200 text-sm ${
                    book.isBundle
                      ? 'bg-yellow-400 hover:bg-yellow-300 text-gray-900 shadow shadow-yellow-400/20'
                      : 'bg-teal-500 hover:bg-teal-400 text-white'
                  }`}
                >
                  {book.btn}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          {[
            { icon: '🔒', text: tBooks.ebooks.trustSSL },
            { icon: '⚡', text: tBooks.ebooks.trustDownload },
            { icon: '💳', text: tBooks.ebooks.trustStripe },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
