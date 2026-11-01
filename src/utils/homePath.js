// Startseiten-Ziel je Sprache (01.11.2026, dot P1.3): BG hat eine eigene URL (/bg/), EN ist die Wurzel.
// Interne Links zur Startseite (Logo, Menue, Footer, Kontakt-Anker) behalten so die gewaehlte Sprache,
// auch bei vollem Seitenaufruf (plain <a>) und nach Neuladen.
export const homePath = (lang, hash = '') => (lang === 'bg' ? '/bg/' : '/') + hash
