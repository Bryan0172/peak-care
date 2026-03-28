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

export default function NewsBlock() {
  const { lang, t } = useLang()
  const latest = allPosts.slice(0, 3)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
          <div>
            <h2 className="section-heading !mb-2">{t.news.headline}</h2>
            <p className="text-gray-500">{t.news.sub}</p>
          </div>
          <Link to="/blog" className="btn-secondary shrink-0 text-sm">
            {t.news.allArticles}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latest.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="card group flex flex-col hover:-translate-y-1 transition-transform duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className={`absolute top-3 left-3 text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
                  {post.category}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-teal-600 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-grow line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{formatDate(post.date, lang)}</span>
                  <span className="text-teal-600 text-sm font-medium group-hover:underline">
                    {t.blog.readMore}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
