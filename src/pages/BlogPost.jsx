import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug, allPosts } from '../data/posts'

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

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Artikel nicht gefunden</h1>
        <Link to="/blog" className="btn-primary">Zum Blog</Link>
      </div>
    )
  }

  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-teal-600 transition-colors">Startseite</Link>
        <span>/</span>
        <Link to="/blog" className="hover:text-teal-600 transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-gray-600 truncate">{post.title}</span>
      </nav>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-4">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
          {post.category}
        </span>
        <span className="text-xs text-gray-400">{post.readingTime} Lesezeit</span>
        <span className="text-xs text-gray-400">·</span>
        <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
        {post.title}
      </h1>

      <p className="text-lg text-gray-500 mb-8 leading-relaxed border-l-4 border-teal-400 pl-4">
        {post.excerpt}
      </p>

      <div className="flex items-center gap-3 pb-8 mb-8 border-b border-gray-200">
        <div className="w-9 h-9 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {post.author ? post.author[0] : 'P'}
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-800">{post.author || 'Peak Care Team'}</div>
          <div className="text-xs text-gray-400">{formatDate(post.date)}</div>
        </div>
      </div>

      {/* Content */}
      <div className="prose-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>

      {/* CTA */}
      <div className="mt-12 bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Haben Sie Schimmel oder Feuchtigkeitsprobleme?</h3>
        <p className="text-gray-500 mb-5">
          Wir helfen Ihnen schnell und professionell – kostenlose Erstinspektion inklusive.
        </p>
        <a href="/#kontakt" className="btn-primary">Jetzt kostenlos anfragen</a>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="mt-14">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Weitere Artikel</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="card group p-5 hover:-translate-y-1 transition-transform"
              >
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[p.category] || 'bg-gray-100 text-gray-600'}`}>
                  {p.category}
                </span>
                <h4 className="font-semibold text-gray-900 mt-2 mb-1 group-hover:text-teal-600 transition-colors text-sm leading-snug">
                  {p.title}
                </h4>
                <p className="text-xs text-gray-400">{formatDate(p.date)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
