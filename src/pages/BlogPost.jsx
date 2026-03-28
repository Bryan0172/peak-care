import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useLang } from '../context/LanguageContext'
import { getPostBySlug, allPosts } from '../data/posts'

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

export default function BlogPost() {
  const { slug } = useParams()
  const { lang, t } = useLang()
  const b = t.blog
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{b.notFound}</h1>
        <Link to="/blog" className="btn-primary">{b.backToBlog}</Link>
      </div>
    )
  }

  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 2)
  const heroImg = POST_IMAGES[slug]

  return (
    <article className="min-h-screen bg-white">
      {/* Hero image */}
      {heroImg && (
        <div className="relative h-64 md:h-80 overflow-hidden bg-gray-900">
          <img src={heroImg} alt={post.title} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-4 pb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
                {post.category}
              </span>
              <span className="text-xs text-gray-400">{post.readingTime} {b.reading}</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">{post.title}</h1>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-teal-600 transition-colors">{t.nav.home}</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-teal-600 transition-colors">{b.headline}</Link>
          <span>/</span>
          <span className="text-gray-600 truncate max-w-xs">{post.title}</span>
        </nav>

        {/* If no hero image, show title here */}
        {!heroImg && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
                {post.category}
              </span>
              <span className="text-xs text-gray-400">{post.readingTime}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{post.title}</h1>
          </>
        )}

        {/* Excerpt */}
        <p className="text-lg text-gray-500 mb-6 leading-relaxed border-l-4 border-teal-400 pl-4">
          {post.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pb-8 mb-8 border-b border-gray-100">
          <div className="w-9 h-9 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {post.author ? post.author[0] : 'P'}
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-800">{post.author || 'Peak Care Team'}</div>
            <div className="text-xs text-gray-400">{formatDate(post.date, lang)}</div>
          </div>
        </div>

        {/* Content */}
        <div className="prose-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gray-950 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">{b.ctaHeadline}</h3>
          <p className="text-gray-400 mb-5">{b.ctaSub}</p>
          <a href="/#kontakt" className="btn-primary">{b.ctaBtn}</a>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-14">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{b.related}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="card group p-5 flex gap-4 items-start hover:-translate-y-0.5 transition-transform"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                    <img
                      src={POST_IMAGES[p.slug] || 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=200&q=60'}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${categoryColors[p.category] || 'bg-gray-100 text-gray-600'}`}>
                      {p.category}
                    </span>
                    <h4 className="font-semibold text-gray-900 mt-1 text-sm group-hover:text-teal-600 transition-colors leading-snug">
                      {p.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
