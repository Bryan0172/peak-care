import { useSEO } from '../hooks/useSEO'
import { useLang } from '../context/LanguageContext'
import { Link } from 'react-router-dom'
import ContactSection from '../components/ContactSection'

// ---------------------------------------------------------------------------
// Premium-Landingpage: Bauinspektion VOR dem Kauf (Pre-Purchase Building Inspection)
// Zielgruppe: ausländische + inländische Investoren und Bauherren in Bulgarien.
// WICHTIG: Andreas ist KEIN zugelassener Baugutachter/Sachverständiger. Daher
// bewusst NICHT "Baugutachten/Gutachter" (geschützter Begriff), sondern
// "Bauinspektion / Bauexperte / Inspektionsbericht" — ehrlich & rechtssicher.
// Eigenständige, kaufintent-fokussierte Seite (getrennt von der laufenden
// Immobilienüberwachung). Nutzt useSEO (NIE react-helmet) + lokalisiertes JSON-LD.
// ---------------------------------------------------------------------------

const WA = 'https://wa.me/359898436561'

const content = {
  de: {
    meta: {
      title: 'Immobilie in Bulgarien kaufen: vorher prüfen lassen – unabhängiges Bau-Gutachten | Peak Care',
      description: 'Immobilie in Bulgarien kaufen? Vorher unabhängig prüfen lassen. Ein erfahrener Bauexperte prüft Bausubstanz, Feuchte, Statik & versteckte Mängel vor Ort – strukturierter Inspektionsbericht mit Fotodokumentation, Mängelliste und Renovierungskosten-Orientierung. Für internationale Investoren und Bauherren.',
      canonical: 'https://peak-care.com/bauinspektion-vor-dem-kauf-bulgarien',
    },
    hero: {
      tag: 'IMMOBILIE KAUFEN IN BULGARIEN · PRÜFUNG VOR DEM KAUF',
      title: 'Immobilie in Bulgarien kaufen – wissen, was Sie unterschreiben.',
      subtitle: 'Eine unabhängige technische Inspektion der Bausubstanz, durchgeführt vor Ort von einem erfahrenen Bauexperten. Sie erhalten ein klares, ehrliches Bild des Objekts: was in Ordnung ist, was Sie kosten wird und ob sich der Kaufpreis rechtfertigt.',
      ctaPrimary: 'Bauinspektion anfragen',
      ctaSecondary: 'Direkt per WhatsApp',
      micro: 'Unabhängig vom Verkäufer · Vor-Ort in Bulgarien · Bericht auf Deutsch & Englisch',
    },
    trust: [
      { k: 'Unabhängig', v: 'Wir arbeiten für den Käufer – nicht für Makler oder Verkäufer.' },
      { k: 'Vor Ort', v: 'Persönliche Inspektion in Bulgarien, nicht aus der Ferne.' },
      { k: 'Erfahrung', v: 'Jahrzehntelange Bau- und Sanierungspraxis in der Region.' },
      { k: 'Verständlich', v: 'Klarer Bericht in Ihrer Sprache – kein Fachchinesisch.' },
    ],
    stakes: {
      headline: 'Ein Immobilienkauf in Bulgarien verzeiht keine bösen Überraschungen',
      intro: 'Aus dem Ausland gekauft, vom Makler präsentiert, unter Zeitdruck entschieden – so entstehen die teuersten Fehler. Was auf Fotos und beim Besichtigungstermin gut aussieht, verbirgt oft genau die Mängel, die nach dem Kauf das Budget sprengen.',
      items: [
        { head: 'Feuchte & Schimmel hinter der Fassade', text: 'Aufsteigende Feuchtigkeit, undichte Dächer und Wärmebrücken zeigen sich oft erst Monate nach dem Kauf – die Sanierung kostet dann ein Vielfaches.' },
        { head: 'Unterschätzte Renovierungskosten', text: 'Wer ohne Inspektion kauft, kalkuliert regelmäßig mit der Hälfte der tatsächlichen Kosten. Eine realistische Einschätzung vorab verändert die Verhandlung.' },
        { head: 'Verdeckte Bausubstanz-Schäden', text: 'Risse, marode Installationen, fehlerhafte Anbauten ohne Genehmigung – Verkäufer zeigen, was funktioniert. Wir zeigen, was nicht funktioniert.' },
        { head: 'Kein Verhandlungshebel', text: 'Wer die Mängel kennt, verhandelt aus einer Position der Stärke. Ein dokumentierter Befund ist oft mehr wert als sein Preis.' },
      ],
    },
    scope: {
      headline: 'Was wir vor Ort prüfen',
      sub: 'Eine systematische Sichtprüfung der kaufentscheidenden Bereiche – nach einer festen, dokumentierten Prüfsystematik und mit Fotos belegt, damit kein kaufentscheidender Bereich übersehen wird.',
      groups: [
        { title: 'Tragwerk & Substanz', items: ['Fundament & Keller', 'Wände, Risse & Setzungen', 'Decken & tragende Elemente', 'Dachstuhl & Dacheindeckung'] },
        { title: 'Feuchte & Bauklima', items: ['Aufsteigende & eindringende Feuchte', 'Schimmel & Salzausblühungen', 'Wärmebrücken & Dämmung', 'Belüftung & Kondensat'] },
        { title: 'Gebäudehülle', items: ['Fassade & Putz', 'Fenster & Türen', 'Abdichtung & Entwässerung', 'Balkone & Außenanlagen'] },
        { title: 'Technik (sichtbar)', items: ['Elektroinstallation', 'Wasser & Sanitär', 'Heizung & Warmwasser', 'Erkennbare Genehmigungs-Risiken'] },
      ],
    },
    deliver: {
      headline: 'Was Sie erhalten',
      sub: 'Eine Entscheidungsgrundlage, mit der Sie kaufen, verhandeln oder ablehnen können.',
      items: [
        { title: 'Strukturierter Inspektionsbericht', text: 'Schriftlich, übersichtlich gegliedert nach Gebäudebereichen – auf Deutsch oder Englisch.' },
        { title: 'Fotodokumentation', text: 'Jeder relevante Befund mit Bild belegt – nachvollziehbar auch aus dem Ausland.' },
        { title: 'Priorisierte Mängelliste', text: 'Sofort / mittelfristig / kosmetisch – Sie sehen, was wirklich drängt.' },
        { title: 'Renovierungskosten-Orientierung', text: 'Realistische Kostenspannen für die wichtigsten Maßnahmen, basierend auf lokaler Markterfahrung.' },
        { title: 'Was nicht geprüft werden konnte – und warum', text: 'Der Bericht benennt ausdrücklich, welche Bereiche ohne Öffnung, Messgerät oder Zugang nicht beurteilt werden konnten – damit Sie genau wissen, worauf die Einschätzung beruht und wo eine Restunsicherheit bleibt.' },
        { title: 'Klare Kauf-Einschätzung', text: 'Eine ehrliche Gesamtbeurteilung: solide, mit Vorbehalt, oder Finger weg.' },
        { title: 'Bericht in 2–3 Werktagen', text: 'Nach dem Vor-Ort-Termin erhalten Sie die Dokumentation zeitnah – damit Sie entscheiden können.' },
      ],
    },
    process: {
      headline: 'So läuft es ab',
      steps: [
        { num: '01', title: 'Erstgespräch', text: 'Sie schildern das Objekt, den Standort und Ihren Zeitrahmen. Wir klären, was eine Inspektion leisten kann – persönlich, per WhatsApp oder Telefon.' },
        { num: '02', title: 'Vor-Ort-Termin', text: 'Ein erfahrener Bauexperte inspiziert das Objekt systematisch und dokumentiert jeden relevanten Befund.' },
        { num: '03', title: 'Schriftlicher Bericht', text: 'Sie erhalten die strukturierte Dokumentation mit Fotos, Mängelliste, Kostenorientierung und Kauf-Einschätzung.' },
        { num: '04', title: 'Rückfragen & nächste Schritte', text: 'Wir besprechen den Bericht mit Ihnen und koordinieren auf Wunsch lokale Fachbetriebe für Sanierung oder Umbau.' },
      ],
    },
    expert: {
      tag: 'IHR BAUEXPERTE VOR ORT',
      name: 'Andreas Donner · Peak Care',
      text: 'Hinter Peak Care steht jahrzehntelange praktische Erfahrung mit Bausubstanz, Sanierung und Bauüberwachung in Bulgarien und der DACH-Region. Wir kennen die typischen Schwachstellen bulgarischer Immobilien – vom feuchten Plattenbau-Keller bis zum ungenehmigten Anbau – und sagen Ihnen unverblümt, was Sache ist. Unser einziges Interesse ist Ihre fundierte Entscheidung.',
      points: ['Unabhängig vom Verkäufer', 'Lokale Marktkenntnis Bulgarien', 'Zweisprachige Berichte DE/EN'],
    },
    limitations: {
      headline: 'Was diese Inspektion nicht ist',
      text: 'Peak Care liefert eine erfahrungsbasierte technische Sichtprüfung – kein behördlich zertifiziertes Sachverständigengutachten, keine rechtliche Due-Diligence und keine steuerliche Beratung. Wo ein zertifiziertes Gutachten, ein Notar oder ein Anwalt erforderlich ist, nennen wir Ihnen die richtigen lokalen Ansprechpartner.',
    },
    faqHeadline: 'Häufige Fragen',
    faqs: [
      { q: 'Wann sollte die Inspektion stattfinden?', a: 'Idealerweise vor der Unterschrift, sobald Sie ernsthaftes Kaufinteresse haben. Die Befunde geben Ihnen einen realen Verhandlungshebel und schützen vor teuren Überraschungen nach dem Kauf.' },
      { q: 'Muss ich für die Inspektion in Bulgarien sein?', a: 'Nein. Erstgespräch und Abstimmung laufen per E-Mail, Telefon oder WhatsApp. Die Inspektion findet vor Ort statt – Sie müssen nicht anwesend sein. Den Bericht erhalten Sie digital.' },
      { q: 'Wie lange dauert die Inspektion?', a: 'Der Vor-Ort-Termin dauert je nach Objektgröße typischerweise 2–4 Stunden. Den schriftlichen Bericht erhalten Sie in der Regel innerhalb von 2–3 Werktagen.' },
      { q: 'Ist das ein offizielles Gutachten?', a: 'Nein – und das sagen wir offen. Es ist eine erfahrungsbasierte technische Sichtprüfung durch einen erfahrenen Bauexperten, kein behördlich zertifiziertes Sachverständigengutachten. Für amtlich anerkannte Gutachten vermitteln wir Ihnen die zuständigen Fachleute.' },
      { q: 'Bekomme ich auch eine Einschätzung der Renovierungskosten?', a: 'Ja. Auf Basis der Vor-Ort-Befunde geben wir realistische Kostenspannen für die wichtigsten Maßnahmen an – damit Sie das Gesamtinvestment kalkulieren können.' },
      { q: 'Prüfen Sie auch Neubauten und Wohnungen?', a: 'Ja – Häuser, Wohnungen, Altbauten und Neubauten. Gerade bei Neubau und Bauträger-Objekten lohnt eine unabhängige Inspektion vor Übergabe und Restzahlung.' },
    ],
    finalCta: {
      headline: 'Kaufen Sie mit Gewissheit, nicht mit Hoffnung',
      text: 'Beschreiben Sie uns das Objekt – wir melden uns persönlich und klären den sinnvollen nächsten Schritt. Unverbindlich.',
    },
    related: 'Verwandte Leistungen',
    relatedLinks: [
      { to: '/technische-immobilienueberwachung-bulgarien', label: 'Laufende Immobilienüberwachung', tag: 'Service' },
      { to: '/service/renovierung-umbau-ausbau-bulgarien', label: 'Renovierung & Umbau Bulgarien', tag: 'Service' },
      { to: '/service/kellerabdichtung-bansko', label: 'Kellerabdichtung & Feuchteschutz', tag: 'Service' },
    ],
  },

  en: {
    meta: {
      title: 'Buying Property in Bulgaria? Independent Pre-Purchase Building Inspection | Peak Care',
      description: 'Buying property in Bulgaria, from abroad? Independent pre-purchase building inspection. An experienced building expert inspects structure, damp, statics and hidden defects on site – structured inspection report with photo documentation, defect list and renovation cost orientation. For international investors and owners.',
      canonical: 'https://peak-care.com/pre-purchase-building-inspection-bulgaria',
    },
    hero: {
      tag: 'BUYING PROPERTY IN BULGARIA · PRE-PURCHASE INSPECTION',
      title: 'Buying property in Bulgaria — know what you are signing.',
      subtitle: 'An independent technical inspection of the building fabric, carried out on site by an experienced building expert. You get a clear, honest picture of the property: what is sound, what it will cost you, and whether the asking price is justified.',
      ctaPrimary: 'Request an inspection',
      ctaSecondary: 'Message on WhatsApp',
      micro: 'Independent of the seller · On site in Bulgaria · Report in English & German',
    },
    trust: [
      { k: 'Independent', v: 'We work for the buyer – not for agents or sellers.' },
      { k: 'On site', v: 'A physical inspection in Bulgaria, not a remote opinion.' },
      { k: 'Experienced', v: 'Decades of building and renovation practice in the region.' },
      { k: 'Clear', v: 'A plain-language report – no impenetrable jargon.' },
    ],
    stakes: {
      headline: 'Buying property in Bulgaria does not forgive nasty surprises',
      intro: 'Bought from abroad, presented by the agent, decided under time pressure – that is how the most expensive mistakes happen. What looks good in photos and at the viewing often hides exactly the defects that blow the budget after completion.',
      items: [
        { head: 'Damp & mould behind the facade', text: 'Rising damp, leaking roofs and thermal bridges often surface months after purchase – and the repair then costs many times more.' },
        { head: 'Underestimated renovation costs', text: 'Buyers who proceed without an inspection routinely budget half the real cost. A realistic estimate up front changes the negotiation.' },
        { head: 'Hidden structural defects', text: 'Cracks, failing installations, unpermitted extensions – sellers show what works. We show what does not.' },
        { head: 'No negotiating leverage', text: 'Knowing the defects lets you negotiate from strength. A documented finding is often worth far more than it costs.' },
      ],
    },
    scope: {
      headline: 'What we inspect on site',
      sub: 'A systematic visual inspection of the purchase-critical areas – following a fixed, documented method and evidenced with photos, so no purchase-critical area is overlooked.',
      groups: [
        { title: 'Structure & fabric', items: ['Foundation & basement', 'Walls, cracks & settlement', 'Floors & load-bearing elements', 'Roof structure & covering'] },
        { title: 'Damp & building climate', items: ['Rising & penetrating damp', 'Mould & salt efflorescence', 'Thermal bridges & insulation', 'Ventilation & condensation'] },
        { title: 'Building envelope', items: ['Facade & render', 'Windows & doors', 'Waterproofing & drainage', 'Balconies & external works'] },
        { title: 'Services (visible)', items: ['Electrical installation', 'Water & plumbing', 'Heating & hot water', 'Visible permit risks'] },
      ],
    },
    deliver: {
      headline: 'What you receive',
      sub: 'A decision basis you can buy, negotiate or walk away on.',
      items: [
        { title: 'Structured inspection report', text: 'Written, clearly organised by building area – in English or German.' },
        { title: 'Photo documentation', text: 'Every relevant finding evidenced with an image – verifiable even from abroad.' },
        { title: 'Prioritised defect list', text: 'Urgent / medium-term / cosmetic – you see what actually matters.' },
        { title: 'Renovation cost orientation', text: 'Realistic cost ranges for the key works, based on local market experience.' },
        { title: 'What could not be assessed – and why', text: 'The report states explicitly which areas could not be judged without opening up, instruments or access – so you know exactly what the assessment rests on and where a residual uncertainty remains.' },
        { title: 'Clear purchase verdict', text: 'An honest overall assessment: sound, proceed with caution, or walk away.' },
        { title: 'Report in 2–3 working days', text: 'After the on-site visit you receive the documentation promptly – so you can decide.' },
      ],
    },
    process: {
      headline: 'How it works',
      steps: [
        { num: '01', title: 'Initial call', text: 'You describe the property, location and your timeline. We clarify what an inspection can cover – in person, by WhatsApp or phone.' },
        { num: '02', title: 'On-site visit', text: 'An experienced building expert inspects the property systematically and documents every relevant finding.' },
        { num: '03', title: 'Written report', text: 'You receive structured documentation with photos, defect list, cost orientation and a purchase verdict.' },
        { num: '04', title: 'Questions & next steps', text: 'We talk the report through with you and, if you wish, coordinate local contractors for renovation or conversion.' },
      ],
    },
    expert: {
      tag: 'YOUR BUILDING EXPERT ON SITE',
      name: 'Andreas Donner · Peak Care',
      text: 'Behind Peak Care stands decades of hands-on experience with building fabric, renovation and construction oversight in Bulgaria and the German-speaking region. We know the typical weak points of Bulgarian property – from the damp prefab basement to the unpermitted extension – and we tell you straight what the situation is. Our only interest is your well-founded decision.',
      points: ['Independent of the seller', 'Local Bulgarian market knowledge', 'Bilingual reports EN/DE'],
    },
    limitations: {
      headline: 'What this inspection is not',
      text: 'Peak Care provides an experience-based technical visual inspection – not an officially certified expert appraisal, not legal due diligence and not tax advice. Where a certified appraisal, a notary or a lawyer is required, we point you to the right local professionals.',
    },
    faqHeadline: 'Frequently asked questions',
    faqs: [
      { q: 'When should the inspection take place?', a: 'Ideally before signing, once you have serious purchase intent. The findings give you real negotiating leverage and protect you from expensive surprises after completion.' },
      { q: 'Do I need to be in Bulgaria for the inspection?', a: 'No. The initial call and briefing run by email, phone or WhatsApp. The inspection happens on site – you do not need to be present. You receive the report digitally.' },
      { q: 'How long does the inspection take?', a: 'The on-site visit typically takes 2–4 hours depending on property size. You usually receive the written report within 2–3 working days.' },
      { q: 'Is this an official appraisal?', a: 'No – and we say so openly. It is an experience-based technical visual inspection by an experienced building expert, not an officially certified expert appraisal. For officially recognised appraisals we refer you to the relevant specialists.' },
      { q: 'Do I also get a renovation cost estimate?', a: 'Yes. Based on the on-site findings we provide realistic cost ranges for the key works – so you can calculate the total investment.' },
      { q: 'Do you also inspect new builds and apartments?', a: 'Yes – houses, apartments, older buildings and new builds. For new builds and developer units in particular, an independent inspection before handover and final payment is well worth it.' },
    ],
    finalCta: {
      headline: 'Buy with certainty, not with hope',
      text: 'Describe the property to us – we get back to you personally and clarify the sensible next step. No obligation.',
    },
    related: 'Related services',
    relatedLinks: [
      { to: '/technical-property-oversight-bulgaria', label: 'Ongoing property oversight', tag: 'Service' },
      { to: '/service/renovierung-umbau-ausbau-bulgarien', label: 'Renovation & conversion Bulgaria', tag: 'Service' },
      { to: '/service/kellerabdichtung-bansko', label: 'Basement waterproofing & damp control', tag: 'Service' },
    ],
  },

  bg: {
    meta: {
      title: 'Купувате имот в България? Техническа проверка преди покупка | Peak Care',
      description: 'Независима техническа проверка на сградата преди покупка на имот в България. Опитен строителен експерт проверява конструкцията, влагата, статиката и скритите дефекти на място – структуриран доклад от проверката със снимки, списък с дефекти и ориентир за разходите за ремонт. За международни и местни инвеститори.',
      canonical: 'https://peak-care.com/bauinspektion-vor-dem-kauf-bulgarien',
    },
    hero: {
      tag: 'КУПУВАНЕ НА ИМОТ В БЪЛГАРИЯ · ПРОВЕРКА ПРЕДИ ПОКУПКА',
      title: 'Купувате имот в България — знайте какво подписвате.',
      subtitle: 'Независима техническа проверка на сградата, извършена на място от опитен строителен експерт. Получавате ясна и честна картина на имота: какво е наред, какво ще ви струва и дали исканата цена е оправдана.',
      ctaPrimary: 'Заявете проверка',
      ctaSecondary: 'Пишете в WhatsApp',
      micro: 'Независими от продавача · На място в България · Доклад на английски и немски',
    },
    trust: [
      { k: 'Независими', v: 'Работим за купувача – не за брокери или продавачи.' },
      { k: 'На място', v: 'Физическа проверка в България, не дистанционно мнение.' },
      { k: 'Опит', v: 'Десетилетия практика в строителството и санирането в региона.' },
      { k: 'Разбираемо', v: 'Ясен доклад на разбираем език – без сложна терминология.' },
    ],
    stakes: {
      headline: 'Покупката на имот в България не прощава неприятни изненади',
      intro: 'Купен от чужбина, представен от брокера, решен под напрежение от времето – така се случват най-скъпите грешки. Това, което изглежда добре на снимки и при огледа, често крие точно дефектите, които взривяват бюджета след покупката.',
      items: [
        { head: 'Влага и мухъл зад фасадата', text: 'Капилярна влага, течащи покриви и термомостове често се появяват месеци след покупката – а ремонтът тогава струва многократно повече.' },
        { head: 'Подценени разходи за ремонт', text: 'Купувачите без проверка редовно калкулират половината от реалната цена. Реалистична оценка предварително променя преговорите.' },
        { head: 'Скрити конструктивни дефекти', text: 'Пукнатини, дефектни инсталации, незаконни пристройки – продавачите показват какво работи. Ние показваме какво не работи.' },
        { head: 'Без лост за преговори', text: 'Познаването на дефектите ви дава сила в преговорите. Документираната находка често струва много повече от цената си.' },
      ],
    },
    scope: {
      headline: 'Какво проверяваме на място',
      sub: 'Систематичен визуален оглед на решаващите за покупката зони – по фиксирана, документирана методика и подкрепен със снимки, за да не бъде пропусната нито една решаваща за покупката зона.',
      groups: [
        { title: 'Конструкция и субстанция', items: ['Основи и сутерен', 'Стени, пукнатини и слягания', 'Подове и носещи елементи', 'Покривна конструкция и покритие'] },
        { title: 'Влага и микроклимат', items: ['Капилярна и проникваща влага', 'Мухъл и солни налепи', 'Термомостове и изолация', 'Вентилация и кондензация'] },
        { title: 'Обвивка на сградата', items: ['Фасада и мазилка', 'Прозорци и врати', 'Хидроизолация и отводняване', 'Балкони и външни площи'] },
        { title: 'Инсталации (видими)', items: ['Електроинсталация', 'Вода и ВиК', 'Отопление и топла вода', 'Видими рискове по разрешителни'] },
      ],
    },
    deliver: {
      headline: 'Какво получавате',
      sub: 'Основа за решение, с която можете да купите, да преговаряте или да се откажете.',
      items: [
        { title: 'Структуриран доклад от проверката', text: 'Писмен, ясно подреден по зони на сградата – на английски или немски.' },
        { title: 'Снимкова документация', text: 'Всяка съществена находка е доказана със снимка – проследима дори от чужбина.' },
        { title: 'Приоритизиран списък с дефекти', text: 'Спешно / средносрочно / козметично – виждате какво наистина има значение.' },
        { title: 'Ориентир за разходите за ремонт', text: 'Реалистични ценови диапазони за основните работи, на база местен пазарен опит.' },
        { title: 'Какво не можа да бъде проверено – и защо', text: 'Докладът посочва изрично кои зони не могат да бъдат оценени без отваряне, уред или достъп – за да знаете точно на какво се основава оценката и къде остава известна несигурност.' },
        { title: 'Ясна оценка за покупката', text: 'Честна цялостна преценка: солиден имот, с условие, или по-добре се откажете.' },
        { title: 'Доклад за 2–3 работни дни', text: 'След огледа на място получавате документацията навреме – за да можете да решите.' },
      ],
    },
    process: {
      headline: 'Как протича',
      steps: [
        { num: '01', title: 'Първи разговор', text: 'Описвате имота, локацията и времевата рамка. Изясняваме какво може да обхване проверката – лично, по WhatsApp или телефон.' },
        { num: '02', title: 'Оглед на място', text: 'Опитен строителен експерт проверява имота систематично и документира всяка съществена находка.' },
        { num: '03', title: 'Писмен доклад', text: 'Получавате структурирана документация със снимки, списък с дефекти, ориентир за разходите и оценка за покупката.' },
        { num: '04', title: 'Въпроси и следващи стъпки', text: 'Обсъждаме доклада с вас и при желание координираме местни фирми за саниране или преустройство.' },
      ],
    },
    expert: {
      tag: 'ВАШИЯТ СТРОИТЕЛЕН ЕКСПЕРТ НА МЯСТО',
      name: 'Андреас Донер · Peak Care',
      text: 'Зад Peak Care стоят десетилетия практически опит със строителна субстанция, саниране и строителен надзор в България и немскоезичния регион. Познаваме типичните слаби места на българските имоти – от влажния сутерен на панелките до незаконната пристройка – и ви казваме направо как стоят нещата. Единственият ни интерес е вашето обосновано решение.',
      points: ['Независими от продавача', 'Местно познаване на пазара в България', 'Двуезични доклади EN/DE'],
    },
    limitations: {
      headline: 'Какво НЕ е тази проверка',
      text: 'Peak Care предоставя техническа визуална проверка на база опит – не официално сертифицирана експертиза, не правен дю дилиджънс и не данъчна консултация. Когато е необходима сертифицирана експертиза, нотариус или адвокат, ви насочваме към подходящите местни специалисти.',
    },
    faqHeadline: 'Често задавани въпроси',
    faqs: [
      { q: 'Кога трябва да се извърши проверката?', a: 'Идеално преди подписване, щом имате сериозен интерес за покупка. Находките ви дават реален лост в преговорите и ви предпазват от скъпи изненади след сделката.' },
      { q: 'Трябва ли да съм в България за проверката?', a: 'Не. Първият разговор и съгласуването минават по имейл, телефон или WhatsApp. Огледът се извършва на място – не е нужно да присъствате. Получавате доклада дигитално.' },
      { q: 'Колко време отнема проверката?', a: 'Огледът на място обикновено отнема 2–4 часа според размера на имота. Писменият доклад обикновено получавате в рамките на 2–3 работни дни.' },
      { q: 'Това официална експертиза ли е?', a: 'Не – и го казваме открито. Това е техническа визуална проверка на база опит от опитен строителен експерт, не официално сертифицирана експертиза. За официално признати експертизи ви насочваме към съответните специалисти.' },
      { q: 'Получавам ли и оценка на разходите за ремонт?', a: 'Да. На база находките на място даваме реалистични ценови диапазони за основните работи – за да калкулирате цялата инвестиция.' },
      { q: 'Проверявате ли и ново строителство и апартаменти?', a: 'Да – къщи, апартаменти, стари и нови сгради. Особено при ново строителство и сделки с инвеститор независимата проверка преди приемане и финално плащане си струва.' },
    ],
    finalCta: {
      headline: 'Купувайте със сигурност, не с надежда',
      text: 'Опишете ни имота – свързваме се с вас лично и изясняваме разумната следваща стъпка. Без ангажимент.',
    },
    related: 'Свързани услуги',
    relatedLinks: [
      { to: '/technische-immobilienueberwachung-bulgarien', label: 'Текущ надзор на имота', tag: 'Услуга' },
      { to: '/service/renovierung-umbau-ausbau-bulgarien', label: 'Саниране и преустройство', tag: 'Услуга' },
      { to: '/service/kellerabdichtung-bansko', label: 'Хидроизолация на сутерен', tag: 'Услуга' },
    ],
  },
}

function buildSchema(c, lang) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: c.meta.title.split('|')[0].trim(),
    serviceType: lang === 'en' ? 'Pre-Purchase Building Inspection' : 'Bauinspektion vor dem Kauf',
    areaServed: { '@type': 'Country', name: 'Bulgaria' },
    provider: {
      '@type': 'LocalBusiness',
      name: 'Peak Care',
      url: 'https://peak-care.com',
      telephone: '+359898436561',
      areaServed: 'Bulgaria',
    },
    description: c.meta.description,
    url: c.meta.canonical,
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Peak Care', item: 'https://peak-care.com/' },
      { '@type': 'ListItem', position: 2, name: c.hero.title, item: c.meta.canonical },
    ],
  }
  return [faqSchema, serviceSchema, breadcrumbSchema]
}

export default function PrePurchaseBuildingSurveyBulgaria() {
  const { lang } = useLang()
  const c = content[lang] || content.de
  useSEO({
    title: c.meta.title,
    description: c.meta.description,
    canonical: c.meta.canonical,
    jsonLd: buildSchema(c, lang),
  })

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-950 text-white pt-20 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/50 to-gray-950" />
        <div className="relative max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-4 block">{c.hero.tag}</span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{c.hero.title}</h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">{c.hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#kontakt" className="inline-block text-center bg-teal-600 hover:bg-teal-500 text-white font-semibold px-7 py-3 rounded transition-colors">
              {c.hero.ctaPrimary}
            </a>
            <a href={WA} className="inline-block text-center border border-gray-600 hover:border-teal-500 text-gray-200 font-semibold px-7 py-3 rounded transition-colors">
              {c.hero.ctaSecondary}
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-6">{c.hero.micro}</p>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-gray-900 border-y border-gray-800 py-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {c.trust.map((t, i) => (
            <div key={i}>
              <div className="text-teal-400 font-semibold text-sm mb-1">{t.k}</div>
              <p className="text-gray-400 text-xs leading-relaxed">{t.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stakes */}
      <section className="bg-gray-950 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{c.stakes.headline}</h2>
          <p className="text-gray-300 leading-relaxed mb-10">{c.stakes.intro}</p>
          <div className="grid md:grid-cols-2 gap-6">
            {c.stakes.items.map((item, i) => (
              <div key={i} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="text-teal-400 font-semibold text-sm mb-2">{item.head}</div>
                <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope of inspection */}
      <section className="bg-gray-900 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{c.scope.headline}</h2>
          <p className="text-gray-400 mb-10">{c.scope.sub}</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {c.scope.groups.map((g, i) => (
              <div key={i} className="bg-gray-950 rounded-lg p-6 border border-gray-800">
                <div className="text-white font-semibold mb-4">{g.title}</div>
                <ul className="space-y-2">
                  {g.items.map((it, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-300 text-sm">
                      <svg className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="bg-gray-950 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{c.deliver.headline}</h2>
          <p className="text-gray-400 mb-10">{c.deliver.sub}</p>
          <div className="grid md:grid-cols-3 gap-5">
            {c.deliver.items.map((item, i) => (
              <div key={i} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="text-teal-500 font-bold text-lg mb-2">{String(i + 1).padStart(2, '0')}</div>
                <div className="text-white font-semibold mb-2 text-sm">{item.title}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-900 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">{c.process.headline}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {c.process.steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="text-teal-600 font-bold text-xl mt-0.5 shrink-0">{step.num}</div>
                <div>
                  <div className="text-white font-semibold mb-1">{step.title}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert / authority */}
      <section className="bg-gray-950 py-16 px-4">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-teal-950/40 to-gray-900 border border-gray-800 rounded-xl p-8">
          <div className="text-xs font-bold tracking-widest text-teal-400 uppercase mb-2">{c.expert.tag}</div>
          <div className="text-white font-bold text-xl mb-4">{c.expert.name}</div>
          <p className="text-gray-300 leading-relaxed mb-6">{c.expert.text}</p>
          <div className="flex flex-wrap gap-3">
            {c.expert.points.map((p, i) => (
              <span key={i} className="bg-gray-800 text-gray-200 text-xs font-medium px-3 py-1.5 rounded-full">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Limitations */}
      <section className="bg-gray-900 py-10 px-4">
        <div className="max-w-2xl mx-auto bg-gray-950 border border-gray-800 rounded-lg p-6">
          <div className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">{c.limitations.headline}</div>
          <p className="text-gray-400 text-sm leading-relaxed">{c.limitations.text}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-950 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">{c.faqHeadline}</h2>
          <div className="space-y-6">
            {c.faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-800 pb-6">
                <div className="text-white font-semibold mb-2">{faq.q}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form (Brevo inbox + GA generate_lead) */}
      <ContactSection />

      {/* Related */}
      <section className="bg-gray-950 py-12 px-4 border-t border-gray-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-6">{c.related}</div>
          <div className="grid md:grid-cols-3 gap-4">
            {c.relatedLinks.map((l, i) => (
              <Link key={i} to={l.to} className="block bg-gray-900 border border-gray-800 hover:border-teal-700 rounded-lg p-5 transition-colors group">
                <div className="text-xs text-teal-500 font-semibold mb-1 group-hover:text-teal-400">{l.tag}</div>
                <div className="text-sm text-gray-200 font-medium leading-snug">{l.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
