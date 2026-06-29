// Import all markdown files as raw strings via Vite's ?raw suffix
import schimmelWinter from '../posts/schimmel-im-winter.md?raw'
import feuchtigkeitKeller from '../posts/feuchtigkeit-im-keller.md?raw'
import krisensicheresZuhause from '../posts/krisensicheres-zuhause.md?raw'
import schimmelBadezimmer from '../posts/schimmel-badezimmer-ursachen-loesungen.md?raw'
import wasservorrat from '../posts/wasservorrat-anlegen-krisenvorsorge.md?raw'
import immobilienBulgarien from '../posts/immobilien-bulgarien-kaufen-auslaender.md?raw'
import blackoutVorbereitung from '../posts/blackout-vorbereitung-72-stunden.md?raw'
// New articles
import blackoutZuhause from '../posts/blackout-vorbereitung-zuhause-72-stunden.md?raw'
import immobilienLeitfaden from '../posts/immobilien-bulgarien-kaufen-auslaender-leitfaden.md?raw'
import wasservorratAnleitung from '../posts/wasservorrat-anlegen-krisenvorsorge-anleitung.md?raw'
import blackoutEN from '../posts/blackout-preparation-home-72-hour-checklist.md?raw'
import buyingPropertyEN from '../posts/buying-property-bulgaria-foreigners-honest-guide.md?raw'
import moldBathroomEN from '../posts/mold-bathroom-causes-permanent-solutions.md?raw'
import waterSupplyEN from '../posts/emergency-water-supply-crisis-preparedness-guide.md?raw'
import feuchtigkeitKellerNeu from '../posts/feuchtigkeit-keller-ursachen-abdichtung.md?raw'
import dampBasementEN from '../posts/damp-basement-causes-permanent-waterproofing.md?raw'
import schimmelKeller from '../posts/schimmel-keller-ursachen-beseitigung.md?raw'
import moldBasement from '../posts/mold-basement-removal-causes-solutions.md?raw'
import schallschutzDE from '../posts/schallschutz-wohnung-laerm-nachbarn-loesungen.md?raw'
import schallschutzEN from '../posts/sound-insulation-apartment-noise-neighbours-solutions.md?raw'
import schimmelBulgarien from '../posts/schimmel-beseitigen-bulgarien.md?raw'
import schimmelfleckenWand from '../posts/schimmelflecken-wand-entfernen-dauerhaft.md?raw'
import renovierungUmbau from '../posts/renovierung-umbau-ausbau-bulgarien.md?raw'
import wasservorratAnlegen from '../posts/wasservorrat-anlegen.md?raw'
import blackoutFerienhaus from '../posts/blackout-ferienhaus-bulgarien.md?raw'
import propertyInspectionBulgaria from '../posts/property-inspection-buying-bulgaria.md?raw'
import renovationForeignOwners from '../posts/renovation-company-bulgaria-foreign-owners.md?raw'
import renovationCostsBulgaria from '../posts/renovation-costs-bulgaria-guide.md?raw'
import waermeplanungHeizungFeuchte from '../posts/waermeplanung-2026-heizung-feuchte.md?raw'

function parseFrontmatter(raw) {
  // Normalize CRLF -> LF so frontmatter parsing is robust regardless of
  // how the .md files are checked out (Windows git autocrlf can introduce \r\n).
  const normalized = raw.replace(/\r\n/g, '\n')
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { data: {}, content: normalized }
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
  parsePost(schimmelBadezimmer),
  parsePost(wasservorrat),
  parsePost(immobilienBulgarien),
  parsePost(blackoutVorbereitung),
  parsePost(blackoutZuhause),
  parsePost(immobilienLeitfaden),
  parsePost(wasservorratAnleitung),
  parsePost(blackoutEN),
  parsePost(buyingPropertyEN),
  parsePost(moldBathroomEN),
  parsePost(waterSupplyEN),
  parsePost(feuchtigkeitKellerNeu),
  parsePost(dampBasementEN),
  parsePost(schimmelKeller),
  parsePost(moldBasement),
  parsePost(schallschutzDE),
  parsePost(schallschutzEN),
  parsePost(schimmelBulgarien),
  parsePost(schimmelfleckenWand),
  parsePost(renovierungUmbau),
  parsePost(wasservorratAnlegen),
  parsePost(blackoutFerienhaus),
  parsePost(propertyInspectionBulgaria),
  parsePost(renovationForeignOwners),
  parsePost(renovationCostsBulgaria),
  parsePost(waermeplanungHeizungFeuchte),
].sort((a, b) => new Date(b.date) - new Date(a.date))

export function getPostBySlug(slug) {
  return allPosts.find((p) => p.slug === slug)
}
