import { Link } from 'react-router-dom'
import { allPosts } from '../data/posts'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

const categoryColors = {
  Schimmelschutz: 'bg-teal-100 text-teal-700',
  Gebäudeschutz: 'bg-blue-100 text-blue-700',
  Krisenvorsorge: 'bg-yellow-100 text-yellow-700',
}

export default function NewsBlock() {
  const latest = allPosts.slice(0, 3)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
          <div>
            <h2 className="section-heading !mb-2">Aktuelles & Tipps</h2>
            <p className="text-gray-500">
              Praktisches Wissen rund um Schimmelschutz, Gebäudepflege und Krisenvorsorge.
            </p>
          </div>
          <Link to="/blog" className="btn-secondary shrink-0 text-sm">
            Alle Artikel →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latest.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="card group flex flex-col hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Color banner */}
              <div className="h-2 bg-gradient-to-r from-teal-500 to-teal-400" />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      categoryColors[post.category] || 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.readingTime}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-teal-600 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-grow">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
                  <span className="text-teal-600 text-sm font-medium group-hover:underline">
                    Lesen →
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
