import { useLang } from '../context/LanguageContext'

const PAYMENT_LINKS = {
  ebook_schimmel_de: 'https://buy.stripe.com/test_14AdRb5QI8Ox8Le1cn1Jm00',
  ebook_krisen_de:   'https://buy.stripe.com/test_14AdRb5QI8Ox8Le1cn1Jm00',
  ebook_bundle_de:   'https://buy.stripe.com/test_14AdRb5QI8Ox8Le1cn1Jm00',
  ebook_schimmel_en: 'https://buy.stripe.com/test_14AdRb5QI8Ox8Le1cn1Jm00',
  ebook_krisen_en:   'https://buy.stripe.com/test_14AdRb5QI8Ox8Le1cn1Jm00',
  ebook_bundle_en:   'https://buy.stripe.com/test_14AdRb5QI8Ox8Le1cn1Jm00',
  ebook_schimmel_bg: 'https://buy.stripe.com/test_14AdRb5QI8Ox8Le1cn1Jm00',
  ebook_krisen_bg:   'https://buy.stripe.com/test_14AdRb5QI8Ox8Le1cn1Jm00',
  ebook_bundle_bg:   'https://buy.stripe.com/test_14AdRb5QI8Ox8Le1cn1Jm00',
}

export default function Ebooks() {
  const { t, lang } = useLang()
  const e = t.ebooks
  const h = t.ebooksHome

  const ebooks = [
    {
      id: 'ebook_schimmel',
      title: h.ebook1Title,
      price: h.ebook1Price,
      desc: h.ebook1Desc,
      badge: e.bestseller,
      badgeClass: 'bg-teal-500 text-white',
      gradient: 'from-teal-600 to-teal-800',
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
      pages: e.pages140,
      features: e.features.bundle,
      isBundle: true,
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gray-950 py-16 text-center">
        <span className="inline-block bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          {e.badge}
        </span>
        <h1 className="text-4xl font-bold text-white mb-3">{e.headline}</h1>
        <p className="text-gray-400 max-w-xl mx-auto">{e.sub}</p>
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
              <div className={`relative bg-gradient-to-br ${book.gradient} p-10 text-white text-center`}>
                <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${book.badgeClass}`}>
                  {book.badge}
                </span>
                <h2 className="text-xl font-bold leading-snug">{book.title}</h2>
                <div className="text-4xl font-extrabold mt-3">{book.price}</div>
                <div className="text-white/60 text-xs mt-1">{e.oneTime}</div>
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
                <a
                  href={PAYMENT_LINKS[`${book.id}_${lang}`]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full font-bold py-3 rounded-xl transition-all text-sm text-center block ${
                    book.isBundle
                      ? 'bg-yellow-400 hover:bg-yellow-300 text-gray-900'
                      : 'btn-primary'
                  }`}
                >
                  {e.buyNow} - {book.price}
                </a>
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
    </div>
  )
}
