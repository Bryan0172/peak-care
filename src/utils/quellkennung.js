// Quellkennung fuer vorgefuellte WhatsApp-/Mail-Texte (Andreas-Freigabe 26.10.2026, Schema MARKETING
// `MKT_Quellkennung_vorgefuellte-WhatsApp-und-Mail-Texte_Schema_2026-10-26.md`).
// Eine Zeile am Textende: "Ref: <MARKE>-<KANAL>-<SEITE>-<sprache>", Startseite = home.
// Sammelsegmente (service, Sprachpraefixe) werden uebersprungen, damit die Seite erkennbar bleibt.
const SKIP = new Set(['service', 'de', 'en', 'bg', 'he', 'ru'])

export function seitenKuerzel(pathname) {
  const teile = (pathname || '/').split('/').filter(Boolean)
  const t = teile.find((x) => !SKIP.has(x))
  if (!t) return 'home'
  if (t === 'blog' && teile[teile.indexOf('blog') + 1]) return 'blog-' + teile[teile.indexOf('blog') + 1].slice(0, 20).replace(/-+$/, '')
  return t.slice(0, 20).replace(/-+$/, '')
}

// Liefert den URL-kodierten Zusatz, z. B. "%0A%0ARef%3A%20PC-M-home-de"
export function refZusatz(kanal, pathname, lang) {
  return '%0A%0ARef%3A%20' + encodeURIComponent(`PC-${kanal}-${seitenKuerzel(pathname)}-${lang || 'de'}`)
}
