// Import all markdown files as raw strings via Vite's ?raw suffix
import schimmelWinter from '../posts/schimmel-im-winter.md?raw'
import feuchtigkeitKeller from '../posts/feuchtigkeit-im-keller.md?raw'
import krisensicheresZuhause from '../posts/krisensicheres-zuhause.md?raw'

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }
  const lines = match[1].split('\n')
  const data = {}
  lines.forEach((line) => {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) return
    const key = line.slice(0, colonIndex).trim()
    const val = line.slice(colonIndex + 1).trim().replace(/^['"]|['"]$/g, '')
    data[key] = val
  })
  return { data, content: match[2].trim() }
}

function parsePost(raw) {
  const { data, content } = parseFrontmatter(raw)
  return { ...data, content }
}

export const allPosts = [
  parsePost(schimmelWinter),
  parsePost(feuchtigkeitKeller),
  parsePost(krisensicheresZuhause),
].sort((a, b) => new Date(b.date) - new Date(a.date))

export function getPostBySlug(slug) {
  return allPosts.find((p) => p.slug === slug)
}
