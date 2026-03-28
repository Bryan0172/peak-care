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

export default function Blog() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Wissen & Tipps</span>
        <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-3">Blog</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Praxisnahe Artikel zu Schimmelschutz, Gebäudepflege und Krisenvorsorge – verständlich erklärt.
        </p>
      </div>

      {/* Featured post */}
      {allPosts[0] && (
        <Link
          to={`/blog/${allPosts[0].slug}`}
          className="group card flex flex-col md:flex-row mb-10 overflow-hidden"
        >
          <div className="md:w-2/5 bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center p-12">
            <svg className="w-24 h-24 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <div className="p-8 flex flex-col justify-center flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[allPosts[0].category] || 'bg-gray-100 text-gray-600'}`}>
                {allPosts[0].category}
              </span>
              <span className="text-xs text-gray-400">{allPosts[0].readingTime}</span>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-400">{formatDate(allPosts[0].date)}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
              {allPosts[0].title}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">{allPosts[0].excerpt}</p>
            <span className="text-teal-600 font-semibold group-hover:underline">Artikel lesen →</span>
          </div>
        </Link>
      )}

      {/* Rest of posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {allPosts.slice(1).map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="card group flex flex-col hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="h-2 bg-gradient-to-r from-teal-500 to-teal-400" />
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
                  {post.category}
                </span>
                <span className="text-xs text-gray-400">{post.readingTime}</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-teal-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-grow">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
                <span className="text-teal-600 text-sm font-medium group-hover:underline">Lesen →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
