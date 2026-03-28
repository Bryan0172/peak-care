import Hero from '../components/Hero'
import ServiceCards from '../components/ServiceCards'
import NewsBlock from '../components/NewsBlock'
import ContactSection from '../components/ContactSection'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceCards />

      {/* E-Book Teaser */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="text-white flex-1">
            <span className="text-teal-200 text-sm font-medium uppercase tracking-wider">Neu im Shop</span>
            <h2 className="text-3xl font-bold mt-2 mb-3">Praktisches Wissen zum Download</h2>
            <p className="text-teal-100 leading-relaxed">
              Unsere E-Books geben Ihnen das nötige Fachwissen, um Schimmel zu bekämpfen und Ihr
              Zuhause krisenfest zu machen – verständlich, praxisnah und sofort verfügbar.
            </p>
          </div>
          <Link to="/ebooks" className="shrink-0 bg-white text-teal-700 font-bold px-8 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-lg">
            E-Books ansehen →
          </Link>
        </div>
      </section>

      <NewsBlock />

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Sanierte Objekte' },
              { value: '14', label: 'Jahre Erfahrung' },
              { value: '98%', label: 'Zufriedene Kunden' },
              { value: '24h', label: 'Reaktionszeit' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-extrabold text-teal-500 mb-1">{s.value}</div>
                <div className="text-gray-500 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
