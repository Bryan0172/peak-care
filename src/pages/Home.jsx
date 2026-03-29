import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Hero from '../components/Hero'
import CrisisSection from '../components/CrisisSection'
import EbooksHomeSection from '../components/EbooksHomeSection'
import ServiceCards from '../components/ServiceCards'
import NewsBlock from '../components/NewsBlock'
import ContactSection from '../components/ContactSection'
import CheckoutForm from '../components/CheckoutForm'
import { useLang } from '../context/LanguageContext'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder')

function CheckoutModal({ productId, productName, onClose }) {
  const [clientSecret, setClientSecret] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  useState(() => {
    async function init() {
      try {
        const res = await fetch('/.netlify/functions/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        })
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        setClientSecret(data.clientSecret)
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="font-bold text-gray-900">{productName}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {loading && (
            <div className="text-center py-8 text-gray-500">
              <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              Wird vorbereitet...
            </div>
          )}
          {fetchError && (
            <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-4 text-sm">
              {fetchError}
            </div>
          )}
          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret, appearance: { theme: 'stripe' } }}
            >
              <CheckoutForm productName={productName} onBack={onClose} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  )
}

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
