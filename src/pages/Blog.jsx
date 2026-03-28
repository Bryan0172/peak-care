import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { allPosts } from '../data/posts'

function formatDate(dateStr, lang) {
  return new Date(dateStr).toLocaleDateString(
    lang === 'bg' ? 'bg-BG' : lang === 'en' ? 'en-GB' : 'de-DE',
    { day: '2-digit', month: 'long', year: 'numeric' }
  )
}

const categoryColors = {
  Schimmelschutz: 'bg-teal-100 text-teal-700',
  Gebäudeschutz: 'bg-blue-100 text-blue-700',
  Krisenvorsorge: 'bg-orange-100 text-orange-700',
}

const POST_IMAGES = {
  'schimmel-im-winter-erkennen': 'https://images.unsplash.com/photo-1599619585752-c3edb42a414c?auto=format&fit=crop&w=1200&q=80',
  'feuchtigkeit-im-keller-beseitigen': 'https://images.unsplash.com/photo-1581578731-9cdff5a47e16?auto=format&fit=crop&w=1200&q=80',
  'krisensicheres-zuhause-fuer-familien': 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
}

export default function Blog() {
  const { lang, t } = useLang()
  const b = t.blog

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-950 py-16 text-center">
        <span className="inline-block bg-teal-500/20 border border-teal-400/30 text-teal-300 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          {b.badge}
        </span>
        <h1 className="text-4xl font-bold text-white mb-3">{b.headline}</h1>
        <p className="text-gray-400 max-w-xl mx-auto">{b.sub}</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14">
        {/* Featured */}
        {allPosts[0] && (
          <Link
            to={`/blog/${allPosts[0].slug}`}
            className="group card flex flex-col md:flex-row mb-10 overflow-hidden"
          >
            <div className="md:w-2/5 relative overflow-hidden min-h-64 bg-gray-200">
              <img
                src={POST_IMAGES[allPosts[0].slug] || 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80'}
                alt={allPosts[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
            </div>
            <div className="p-8 flex flex-col justify-center flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[allPosts[0].category] || 'bg-gray-100 text-gray-600'}`}>
                  {allPosts[0].category}
                </span>
                <span className="text-xs text-gray-400">{allPosts[0].readingTime}</span>
                <span className="text-xs text-gray-400">·</span>
                <span className="text-xs text-gray-400">{formatDate(allPosts[0].date, lang)}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                {allPosts[0].title}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-4">{allPosts[0].excerpt}</p>
              <span className="text-teal-600 font-semibold group-hover:underline">{b.readMore}</span>
            </div>
          </Link>
        )}

        {/* Rest */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allPosts.slice(1).map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="card group flex flex-col hover:-translate-y-1 transition-transform duration-300 overflow-hidden"
            >
              <div className="relative h-52 overflow-hidden bg-gray-200">
                <img
                  src={POST_IMAGES[post.slug] || 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80'}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className={`absolute top-3 left-3 text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
                  {post.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-teal-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-grow">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{formatDate(post.date, lang)}</span>
                  <span className="text-teal-600 text-sm font-medium group-hover:underline">{b.readMore}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
