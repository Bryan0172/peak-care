import { useEffect } from 'react'

// Lightweight, dependency-free per-page SEO.
// Sets <title>, meta description and canonical link on mount/update.
// The site is a client-rendered SPA; Googlebot executes JS, so these
// per-route values are picked up and replace the single static index.html head.
export function useSEO({ title, description, canonical }) {
  useEffect(() => {
    if (title) document.title = title
    if (description) setMeta('description', description)
    if (canonical) setLink('canonical', canonical)
  }, [title, description, canonical])
}

function setMeta(name, content) {
  let el = document.head.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
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
