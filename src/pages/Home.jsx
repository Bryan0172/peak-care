import { useState } from 'react'
import Hero from '../components/Hero'
import CrisisSection from '../components/CrisisSection'
import EbooksHomeSection from '../components/EbooksHomeSection'
import ServiceCards from '../components/ServiceCards'
import NewsBlock from '../components/NewsBlock'
import ContactSection from '../components/ContactSection'
import CheckoutModal from '../components/CheckoutModal'
import { useLang } from '../context/LanguageContext'

export default function Home() {
  const { t, lang } = useLang()
  const [checkout, setCheckout] = useState(null)

  const PRODUCT_NAMES = {
    [`ebook_schimmel_${lang}`]: t.ebooksHome.ebook1Title,
    [`ebook_krisen_${lang}`]:   t.ebooksHome.ebook2Title,
    [`ebook_bundle_${lang}`]:   t.ebooksHome.bundleTitle,
  }

  function handleBuy(productId) {
    const langProductId = `${productId}_${lang}`
    setCheckout({ productId: langProductId, productName: PRODUCT_NAMES[langProductId] })
  }

  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Crisis Section – emotional hook, direct CTA for crisis e-book */}
      <CrisisSection onBuyCrisis={handleBuy} />

      {/* 3. All E-Books – full shop section */}
      <EbooksHomeSection onBuy={handleBuy} />

      {/* 4. Services */}
      <ServiceCards />

      {/* 5. Stats */}
      <section className="py-14 bg-teal-600">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { value: '500+', label: t.stats.objects },
              { value: '25+', label: t.stats.years },
              { value: '98%', label: t.stats.satisfaction },
              { value: '30 min', label: t.stats.response },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-extrabold text-white mb-1">{s.value}</div>
                <div className="text-teal-100 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Blog / News */}
      <NewsBlock />

      {/* 7. Contact */}
      <ContactSection />

      {/* Checkout modal */}
      {checkout && (
        <CheckoutModal
          productId={checkout.productId}
          productName={checkout.productName}
          onClose={() => setCheckout(null)}
        />
      )}
    </>
  )
}
