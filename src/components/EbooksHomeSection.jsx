import { useState } from 'react'
import { useLang } from '../context/LanguageContext'

const EBOOK_IMAGES = {
  ebook_schimmel: 'https://images.unsplash.com/photo-1599619585752-c3edb42a414c?auto=format&fit=crop&w=600&q=80',
  ebook_krisen: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80',
  ebook_bundle: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
}

export default function EbooksHomeSection({ onBuy }) {
  const { t } = useLang()
  const e = t.ebooksHome

  const books = [
    {
      id: 'ebook_schimmel',
      title: e.ebook1Title,
      desc: e.ebook1Desc,
      price: e.ebook1Price,
      badge: t.ebooks.bestseller,
      badgeClass: 'bg-teal-500 text-white',
      icon: '🍃',
      gradient: 'from-teal-600 to-teal-800',
      btn: e.buyBtn,
    },
    {
      id: 'ebook_krisen',
      title: e.ebook2Title,
      desc: e.ebook2Desc,
      price: e.ebook2Price,
      badge: t.ebooks.recommended,
      badgeClass: 'bg-orange-500 text-white',
      icon: '🏠',
      gradient: 'from-orange-600 to-red-700',
      btn: e.buyBtn,
    },
    {
      id: 'ebook_bundle',
      title: e.bundleTitle,
      desc: e.bundleDesc,
      price: e.bundlePrice,
      badge: e.bundleBadge,
      badgeClass: 'bg-yellow-400 text-gray-900',
      icon: '📦',
      gradient: 'from-yellow-500 to-orange-600',
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
              {/* Header */}
              <div className={`bg-gradient-to-br ${book.gradient} p-8 text-white relative text-center`}>
                <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full ${book.badgeClass}`}>
                  {book.badge}
                </span>
                <div className="text-5xl mb-3">{book.icon}</div>
                <h3 className="font-bold text-xl leading-snug">{book.title}</h3>
                <div className="text-4xl font-extrabold mt-3">{book.price}</div>
                <div className="text-white/60 text-xs mt-1">{t.ebooks.oneTime}</div>
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
            { icon: '🔒', text: t.ebooks.trustSSL },
            { icon: '⚡', text: t.ebooks.trustDownload },
            { icon: '💳', text: t.ebooks.trustStripe },
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
