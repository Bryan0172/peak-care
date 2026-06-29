import { useEffect } from 'react'

// Dependency-free per-page SEO.
// react-helmet-async is non-functional in this app (titles never applied —
// verified in dev AND prod build, incl. the pre-existing Helmet pages).
// This hook sets <title>, meta description, canonical and OG tags directly
// per route via useEffect. Googlebot executes JS and picks these up.
export function useSEO({ title, description, canonical, image, type = 'website', jsonLd }) {
  useEffect(() => {
    if (title) {
      document.title = title
      setMeta('property', 'og:title', title)
    }
    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
    }
    setMeta('property', 'og:type', type)
    if (canonical) {
      setMeta('property', 'og:url', canonical)
      setLink('canonical', canonical)
    }
    if (image) {
      setMeta('property', 'og:image', image)
      setMeta('name', 'twitter:card', 'summary_large_image')
      setMeta('name', 'twitter:image', image)
    }
    // JSON-LD structured data — replace any prior on route change
    document.head.querySelectorAll('script[data-seo-jsonld]').forEach((s) => s.remove())
    if (jsonLd) {
      for (const obj of (Array.isArray(jsonLd) ? jsonLd : [jsonLd])) {
        if (!obj) continue
        const s = document.createElement('script')
        s.type = 'application/ld+json'
        s.setAttribute('data-seo-jsonld', '')
        s.textContent = JSON.stringify(obj)
        document.head.appendChild(s)
      }
    }
  }, [title, description, canonical, image, type, jsonLd])
}

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}
