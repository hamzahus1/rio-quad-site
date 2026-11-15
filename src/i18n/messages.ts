export type Locale = "en" | "fr" | "es" | "de" | "ar" | "zh";

export type Messages = {
  tabs: Record<"Photos" | "Experience" | "Reviews", string>;
  /** Visible SEO line under brand — booking keywords */
  seoEyebrow: string;
  headline: string;
  bio1: string;
  bio2: string;
  bio3: string;
  bookTour: string;
  googleRating: string;
  whatYouGet: string;
  offerings: {
    quads: { name: string; detail: string };
    buggies: { name: string; detail: string };
    sunset: { name: string; detail: string };
    private: { name: string; detail: string };
  };
  openDaily: string;
  ridersSay: string;
  beforeYouRide: string;
  askWhatsApp: string;
  stillUnsure: string;
  experienceTitle: string;
  experienceBody: string;
  bookWhatsApp: string;
  locationGoogle: string;
  locationCta: string;
  locationCtaMobile: string;
  itinerary: {
    pickup: { title: string; body: string; minutes: string; included: string };
    ride: { title: string; body: string; minutes: string; included: string };
    tea: { title: string; body: string; minutes: string; included: string };
    return: { title: string; body: string; minutes: string; included: string };
  };
  includedTitle: string;
  includedItems: readonly string[];
  googleReviews: string;
  reviewsCount: string;
  readOnMaps: string;
  faqs: ReadonlyArray<{ q: string; a: string }>;
  themeLight: string;
  themeDark: string;
  language: string;
  extrasTitle: string;
  extrasPrompt: string;
  extrasCta: string;
  extrasWhatsApp: string;
  booking: {
    title: string;
    subtitle: string;
    name: string;
    namePlaceholder: string;
    people: string;
    experience: string;
    includes: string;
    date: string;
    notes: string;
    notesPlaceholder: string;
    next: string;
    back: string;
    send: string;
    close: string;
    waHello: string;
    experiences: {
      quads: string;
      buggies: string;
      sunset: string;
      private: string;
    };
    extras: {
      pickup: string;
      dropoff: string;
      photos: string;
      tea: string;
      privateGuide: string;
    };
  };
};

export const locales: {
  code: Locale;
  label: string;
  short: string;
  dir: "ltr" | "rtl";
}[] = [
  { code: "en", label: "English", short: "EN", dir: "ltr" },
  { code: "fr", label: "Français", short: "FR", dir: "ltr" },
  { code: "es", label: "Español", short: "ES", dir: "ltr" },
  { code: "de", label: "Deutsch", short: "DE", dir: "ltr" },
  { code: "ar", label: "العربية", short: "AR", dir: "rtl" },
  { code: "zh", label: "中文", short: "中文", dir: "ltr" },
];

export const localeCodes = locales.map((l) => l.code);

export function isLocale(v: string | null): v is Locale {
  return !!v && (localeCodes as string[]).includes(v);
}

export function detectBrowserLocale(
  languages: readonly string[] | string | null | undefined,
): Locale {
  const list = !languages
    ? []
    : typeof languages === "string"
      ? [languages]
      : [...languages];

  for (const raw of list) {
    const tag = raw.trim().toLowerCase();
    if (!tag) continue;
    const base = tag.split("-")[0];
    if (base === "zh") return "zh";
    if (isLocale(base)) return base;
    if (isLocale(tag)) return tag;
  }
  return "en";
}

const en: Messages = {
  tabs: {
    Photos: "Photos",
    Experience: "Experience",
    Reviews: "Reviews",
  },
  seoEyebrow: "Quad & buggy tours · Agadir & Tamraght",
  headline: "Tamraght hits different when you’re the one driving the coast.",
  bio1:
    "Morning light on the Atlantic. Dust behind your tires. You roll out of Tamraght with a local guide who knows the soft dunes, the quiet beach stretches, and the tracks most day trips never find. Some days it’s wind and open sand. Some days it’s shade in the oueds, photo stops on the ridge, and that first real pull of the throttle when you finally trust the machine. Quad or buggy, same rush either way.",
  bio2:
    "Helmet on, easy on the throttle at first, then the coast opens up and the noise in your head goes quiet. You stop for photos, share mint tea when the engines cool, laugh about the near misses, and leave with sand in your shoes and a phone full of proof you were really here. That’s the bit people still talk about weeks later.",
  bio3:
    "Never driven before? No stress. We brief you at the base, fit the helmets, go at the slowest person’s pace, and sort the booking on WhatsApp in a few messages. Families, couples, first-timers, all welcome. Come for the ride. Stay for how Tamraght feels when the sun drops and the tracks go quiet.",
  bookTour: "Book a tour",
  googleRating: "Google · {rating} ({count})",
  whatYouGet: "What you get",
  offerings: {
    quads: { name: "Quad bikes", detail: "Guided ATVs · beginners welcome" },
    buggies: { name: "Buggies", detail: "Side-by-side on beach & dunes" },
    sunset: { name: "Sunset tours", detail: "Golden hour · photo stops" },
    private: { name: "Private groups", detail: "Your slot, your pace" },
  },
  openDaily: "Open daily {hours}",
  ridersSay: "What riders say",
  beforeYouRide: "Before you ride",
  askWhatsApp: "Ask on WhatsApp",
  stillUnsure: "Still unsure? WhatsApp us. We answer fast.",
  experienceTitle: "The experience",
  experienceBody:
    "Wind in your face, tire tracks in the sand, a guide who knows every turn. Open daily {hours}. Helmets on us. Beginners welcome.",
  bookWhatsApp: "Book on WhatsApp",
  locationGoogle: "Location · Google {rating}",
  locationCta: "Location",
  locationCtaMobile: "Where is this?",
  itinerary: {
    pickup: {
      title: "Hotel pickup and safety briefing",
      body: "Pickup from Agadir and Tamraght. At the base, your guide explains the controls, hands out helmets and goggles, and makes sure everyone feels ready before you roll.",
      minutes: "30 minutes",
      included: "• Transport & safety gear included",
    },
    ride: {
      title: "Guided quad & buggy ride · beach, dunes and trails",
      body: "After a short practice, you follow the guide through sandy tracks, beach stretches and open trails. Built for first-timers, still a real thrill.",
      minutes: "75 minutes",
      included: "• Guided ride included",
    },
    tea: {
      title: "Mint tea and photo pause overlooking the coast",
      body: "You stop at a scenic point for Moroccan mint tea and snacks while grabbing photos of the coastline before you continue.",
      minutes: "20 minutes",
      included: "• Tea, snacks & photo stop included",
    },
    return: {
      title: "Return to base",
      body: "Back to the base, gear off, then transfer to your hotel in Agadir or Tamraght.",
      minutes: "30 minutes",
      included: "• Hotel drop-off included",
    },
  },
  includedTitle: "What’s included in your Rio Quad tour",
  includedItems: [
    "Helmets & goggles",
    "Local guide",
    "Quad or buggy",
    "Mint tea & snacks",
    "Photo stops",
    "Hotel pickup & drop-off",
  ],
  googleReviews: "Google reviews",
  reviewsCount: "· {count} reviews",
  readOnMaps: "Read on Google Maps",
  faqs: [
    {
      q: "Where do we meet?",
      a: "Base is on Rte de L'Oued Sous (Agadir / Tamraght). Drop a pin on Google Maps or WhatsApp us and we’ll send the exact meet point with your booking.",
    },
    {
      q: "Do I need experience?",
      a: "No. Guides brief everyone before you roll and pace the group to the slowest rider. Beginners and kids (with an adult) are welcome.",
    },
    {
      q: "What should I bring?",
      a: "Closed shoes, sunscreen, and a light jacket if you ride at sunset. Helmets, goggles, and the machines are included.",
    },
    {
      q: "How do I book?",
      a: "WhatsApp is fastest: send date, time, headcount, and quad or buggy. Same-day rides are often available 09:00-21:00.",
    },
    {
      q: "Private group?",
      a: "Yes. Tell us your dates and group size on WhatsApp and we’ll lock a private slot at your pace.",
    },
  ],
  themeLight: "Light mode",
  themeDark: "Dark mode",
  language: "Language",
  extrasTitle: "Pickup & extras",
  extrasPrompt: "Need hotel pickup, transport, or anything else?",
  extrasCta: "Add to cart · WhatsApp",
  extrasWhatsApp: "Hi Rio Quad. I need extras for my tour.\nTransport / hotel pickup:\nOther requests:",
  booking: {
    title: "Book your tour",
    subtitle: "Quick details. We finish on WhatsApp.",
    name: "Your name",
    namePlaceholder: "Full name",
    people: "How many people?",
    experience: "What experience?",
    includes: "What do you want to include?",
    date: "Preferred date",
    notes: "Anything else?",
    notesPlaceholder: "Pickup hotel, allergies, language… (optional)",
    next: "Continue",
    back: "Back",
    send: "Send on WhatsApp",
    close: "Close",
    waHello: "Hi Rio Quad. I'd like to book a tour.",
    experiences: {
      quads: "Quad bikes",
      buggies: "Buggies",
      sunset: "Sunset tour",
      private: "Private group",
    },
    extras: {
      pickup: "Hotel pickup",
      dropoff: "Hotel drop-off",
      photos: "Photo stops",
      tea: "Mint tea stop",
      privateGuide: "Private guide",
    },
  },
};

const fr: Messages = {
  tabs: {
    Photos: "Photos",
    Experience: "Expérience",
    Reviews: "Avis",
  },
  seoEyebrow: "Tours quad & buggy · Agadir & Tamraght",
  headline: "Tamraght, ça frappe autrement quand c’est toi qui conduis la côte.",
  bio1:
    "Lumière du matin sur l’Atlantique. Poussière derrière les pneus. Tu quittes Tamraght avec un guide local qui connaît les dunes douces, les bouts de plage calmes, et les pistes que la plupart des day trips ne voient jamais. Certains jours c’est le vent et le sable ouvert. D’autres, l’ombre dans les oueds, des stops photo sur la crête, et cette première vraie accélération quand tu fais enfin confiance à la machine. Quad ou buggy, même frisson.",
  bio2:
    "Casque bouclé, gaz doux au début, puis la côte s’ouvre et le bruit dans ta tête se tait. Tu t’arrêtes pour des photos, tu partages un thé à la menthe quand les moteurs se taisent, tu rigoles des petites frayeurs, et tu repars avec du sable dans les chaussures et un téléphone plein de preuves que tu y étais vraiment. C’est ce que les gens racontent encore des semaines plus tard.",
  bio3:
    "Jamais conduit ? Pas de stress. Briefing à la base, on ajuste les casques, on avance au rythme du plus lent, et on règle la réservation sur WhatsApp en quelques messages. Familles, couples, débutants, tout le monde est le bienvenu. Viens pour la balade. Reste pour ce que Tamraght devient quand le soleil tombe et que les pistes se taisent.",
  bookTour: "Réserver",
  googleRating: "Google · {rating} ({count})",
  whatYouGet: "Ce que vous avez",
  offerings: {
    quads: { name: "Quads", detail: "ATV guidés · débutants bienvenus" },
    buggies: { name: "Buggys", detail: "Côte à côte plage & dunes" },
    sunset: { name: "Tours au coucher", detail: "Golden hour · stops photo" },
    private: { name: "Groupes privés", detail: "Votre créneau, votre rythme" },
  },
  openDaily: "Ouvert tous les jours {hours}",
  ridersSay: "Ce que disent les riders",
  beforeYouRide: "Avant de rouler",
  askWhatsApp: "Demander sur WhatsApp",
  stillUnsure: "Encore un doute ? WhatsApp. On répond vite.",
  experienceTitle: "L’expérience",
  experienceBody:
    "Le vent sur le visage, des traces dans le sable, un guide qui connaît chaque virage. Ouvert tous les jours {hours}. Casques inclus. Débutants bienvenus.",
  bookWhatsApp: "Réserver sur WhatsApp",
  locationGoogle: "Lieu · Google {rating}",
  locationCta: "Lieu",
  locationCtaMobile: "C’est où ?",
  itinerary: {
    pickup: {
      title: "Prise en charge et briefing sécurité",
      body: "Pickup depuis Agadir et Tamraght. À la base, le guide explique les commandes, distribue casques et lunettes, et s’assure que tout le monde est prêt.",
      minutes: "30 minutes",
      included: "• Transport & équipement inclus",
    },
    ride: {
      title: "Balade guidée quad & buggy · plage, dunes et pistes",
      body: "Après une courte prise en main, vous suivez le guide sur pistes sableuses, plage et sentiers ouverts. Pensé pour les débutants, vraiment excitant.",
      minutes: "75 minutes",
      included: "• Balade guidée incluse",
    },
    tea: {
      title: "Thé à la menthe et pause photo face à la côte",
      body: "Arrêt panorama pour un thé marocain et des snacks, photos de la côte, puis on repart.",
      minutes: "20 minutes",
      included: "• Thé, snacks & stop photo inclus",
    },
    return: {
      title: "Retour à la base",
      body: "Retour base, équipement rangé, puis transfert vers votre hôtel à Agadir ou Tamraght.",
      minutes: "30 minutes",
      included: "• Dépose à l’hôtel incluse",
    },
  },
  includedTitle: "Inclus dans votre tour Rio Quad",
  includedItems: [
    "Casques & lunettes",
    "Guide local",
    "Quad ou buggy",
    "Thé à la menthe & snacks",
    "Stops photo",
    "Pickup & dépose hôtel",
  ],
  googleReviews: "Avis Google",
  reviewsCount: "· {count} avis",
  readOnMaps: "Lire sur Google Maps",
  faqs: [
    {
      q: "Où se retrouve-t-on ?",
      a: "Base sur Rte de L'Oued Sous (Agadir / Tamraght). Épingle Google Maps ou WhatsApp — on envoie le point exact avec la réservation.",
    },
    {
      q: "Faut-il de l’expérience ?",
      a: "Non. Briefing avant le départ, rythme du plus lent. Débutants et enfants (avec un adulte) bienvenus.",
    },
    {
      q: "Que apporter ?",
      a: "Chaussures fermées, crème solaire, veste légère pour le sunset. Casques, lunettes et machines inclus.",
    },
    {
      q: "Comment réserver ?",
      a: "WhatsApp est le plus rapide : date, heure, nombre, quad ou buggy. Souvent possible le jour même 09:00-21:00.",
    },
    {
      q: "Groupe privé ?",
      a: "Oui. Dates et taille du groupe sur WhatsApp — on bloque un créneau à votre rythme.",
    },
  ],
  themeLight: "Mode clair",
  themeDark: "Mode sombre",
  language: "Langue",
  extrasTitle: "Pickup & extras",
  extrasPrompt: "Besoin de pickup hôtel, transport, ou autre ?",
  extrasCta: "Ajouter · WhatsApp",
  extrasWhatsApp:
    "Salut Rio Quad. J’ai besoin d’extras pour mon tour.\nTransport / pickup hôtel :\nAutres demandes :",
  booking: {
    title: "Réservez votre tour",
    subtitle: "Quelques infos. On finit sur WhatsApp.",
    name: "Votre nom",
    namePlaceholder: "Nom complet",
    people: "Combien de personnes ?",
    experience: "Quelle expérience ?",
    includes: "Que voulez-vous inclure ?",
    date: "Date souhaitée",
    notes: "Autre chose ?",
    notesPlaceholder: "Hôtel, allergies, langue… (optionnel)",
    next: "Continuer",
    back: "Retour",
    send: "Envoyer sur WhatsApp",
    close: "Fermer",
    waHello: "Salut Rio Quad. Je voudrais réserver un tour.",
    experiences: {
      quads: "Quads",
      buggies: "Buggys",
      sunset: "Tour au coucher",
      private: "Groupe privé",
    },
    extras: {
      pickup: "Pickup hôtel",
      dropoff: "Dépose hôtel",
      photos: "Stops photo",
      tea: "Pause thé menthe",
      privateGuide: "Guide privé",
    },
  },
};

const es: Messages = {
  tabs: { Photos: "Fotos", Experience: "Experiencia", Reviews: "Reseñas" },
  seoEyebrow: "Tours en quad y buggy · Agadir y Tamraght",
  headline: "Tamraght se siente distinto cuando tú conduces la costa.",
  bio1:
    "Luz de mañana sobre el Atlántico. Polvo detrás de las ruedas. Sales de Tamraght con un guía local que conoce las dunas suaves, los tramos de playa tranquilos y las pistas que la mayoría de day trips nunca encuentra. Unos días es viento y arena abierta. Otros, sombra en los oueds, paradas de fotos en la cresta y ese primer acelerón de verdad cuando confías en la máquina. Quad o buggy, la misma adrenalina.",
  bio2:
    "Casco puesto, gas suave al principio, luego la costa se abre y el ruido en la cabeza se calla. Paras para fotos, compartes té de menta cuando se enfrían los motores, ríes de los sustos y te vas con arena en los zapatos y el móvil lleno de pruebas de que estuviste ahí. Eso es lo que la gente sigue contando semanas después.",
  bio3:
    "¿Nunca has conducido? Sin estrés. Briefing en la base, cascos a medida, ritmo del más lento y reserva por WhatsApp en unos mensajes. Familias, parejas, principiantes: todos bienvenidos. Ven por el ride. Quédate por cómo se siente Tamraght cuando cae el sol y las pistas se callan.",
  bookTour: "Reservar",
  googleRating: "Google · {rating} ({count})",
  whatYouGet: "Qué incluye",
  offerings: {
    quads: { name: "Quads", detail: "ATV guiados · principiantes bienvenidos" },
    buggies: { name: "Buggies", detail: "Side-by-side playa y dunas" },
    sunset: { name: "Tours al atardecer", detail: "Golden hour · paradas foto" },
    private: { name: "Grupos privados", detail: "Tu horario, tu ritmo" },
  },
  openDaily: "Abierto todos los días {hours}",
  ridersSay: "Lo que dicen los riders",
  beforeYouRide: "Antes de salir",
  askWhatsApp: "Preguntar por WhatsApp",
  stillUnsure: "¿Dudas? WhatsApp. Respondemos rápido.",
  experienceTitle: "La experiencia",
  experienceBody:
    "Viento en la cara, huellas en la arena, un guía que conoce cada curva. Abierto todos los días {hours}. Cascos incluidos. Principiantes bienvenidos.",
  bookWhatsApp: "Reservar por WhatsApp",
  locationGoogle: "Ubicación · Google {rating}",
  locationCta: "Ubicación",
  locationCtaMobile: "¿Dónde es?",
  itinerary: {
    pickup: {
      title: "Recogida y briefing de seguridad",
      body: "Pickup desde Agadir y Tamraght. En la base, el guía explica los controles, reparte cascos y gafas, y se asegura de que todos estén listos.",
      minutes: "30 minutos",
      included: "• Transporte y equipo incluidos",
    },
    ride: {
      title: "Paseo guiado quad y buggy · playa, dunas y pistas",
      body: "Tras una breve práctica, sigues al guía por pistas de arena, tramos de playa y trails abiertos. Para principiantes, con emoción de verdad.",
      minutes: "75 minutos",
      included: "• Paseo guiado incluido",
    },
    tea: {
      title: "Té de menta y pausa foto frente a la costa",
      body: "Parada panorámica con té marroquí y snacks mientras sacas fotos de la costa antes de seguir.",
      minutes: "20 minutos",
      included: "• Té, snacks y parada foto incluidos",
    },
    return: {
      title: "Regreso a la base",
      body: "Vuelta a la base, dejas el equipo y traslado a tu hotel en Agadir o Tamraght.",
      minutes: "30 minutos",
      included: "• Devolución al hotel incluida",
    },
  },
  includedTitle: "Incluido en tu tour Rio Quad",
  includedItems: [
    "Cascos y gafas",
    "Guía local",
    "Quad o buggy",
    "Té de menta y snacks",
    "Paradas foto",
    "Pickup y drop-off hotel",
  ],
  googleReviews: "Reseñas de Google",
  reviewsCount: "· {count} reseñas",
  readOnMaps: "Ver en Google Maps",
  faqs: [
    {
      q: "¿Dónde nos encontramos?",
      a: "Base en Rte de L'Oued Sous (Agadir / Tamraght). Pin de Google Maps o WhatsApp — te mandamos el punto exacto con la reserva.",
    },
    {
      q: "¿Hace falta experiencia?",
      a: "No. Briefing antes de salir y ritmo del más lento. Principiantes y niños (con adulto) bienvenidos.",
    },
    {
      q: "¿Qué llevo?",
      a: "Zapatos cerrados, protector solar y chaqueta ligera si sales al atardecer. Cascos, gafas y máquinas incluidos.",
    },
    {
      q: "¿Cómo reservo?",
      a: "WhatsApp es lo más rápido: fecha, hora, personas, quad o buggy. A menudo el mismo día 09:00-21:00.",
    },
    {
      q: "¿Grupo privado?",
      a: "Sí. Fechas y tamaño del grupo por WhatsApp y bloqueamos un horario a tu ritmo.",
    },
  ],
  themeLight: "Modo claro",
  themeDark: "Modo oscuro",
  language: "Idioma",
  extrasTitle: "Pickup y extras",
  extrasPrompt: "¿Necesitas pickup de hotel, transporte u otra cosa?",
  extrasCta: "Añadir · WhatsApp",
  extrasWhatsApp:
    "Hola Rio Quad. Necesito extras para mi tour.\nTransporte / pickup hotel:\nOtras peticiones:",
  booking: {
    title: "Reserva tu tour",
    subtitle: "Datos rápidos. Terminamos por WhatsApp.",
    name: "Tu nombre",
    namePlaceholder: "Nombre completo",
    people: "¿Cuántas personas?",
    experience: "¿Qué experiencia?",
    includes: "¿Qué quieres incluir?",
    date: "Fecha preferida",
    notes: "¿Algo más?",
    notesPlaceholder: "Hotel, alergias, idioma… (opcional)",
    next: "Continuar",
    back: "Atrás",
    send: "Enviar por WhatsApp",
    close: "Cerrar",
    waHello: "Hola Rio Quad. Quiero reservar un tour.",
    experiences: {
      quads: "Quads",
      buggies: "Buggies",
      sunset: "Tour al atardecer",
      private: "Grupo privado",
    },
    extras: {
      pickup: "Pickup hotel",
      dropoff: "Drop-off hotel",
      photos: "Paradas foto",
      tea: "Parada té de menta",
      privateGuide: "Guía privado",
    },
  },
};

const de: Messages = {
  tabs: { Photos: "Fotos", Experience: "Erlebnis", Reviews: "Bewertungen" },
  seoEyebrow: "Quad- & Buggy-Touren · Agadir & Tamraght",
  headline: "Tamraght trifft anders, wenn du die Küste fährst.",
  bio1:
    "Morgenlicht über dem Atlantik. Staub hinter den Reifen. Du startest aus Tamraght mit einem lokalen Guide, der die weichen Dünen, ruhige Strandabschnitte und die Tracks kennt, die die meisten Daytrips nie finden. Manche Tage Wind und offener Sand. Andere Schatten in den Oueds, Fotostops auf dem Grat und der erste echte Gasstoß, wenn du der Maschine endlich vertraust. Quad oder Buggy — derselbe Kick.",
  bio2:
    "Helm auf, erst leicht Gas, dann öffnet sich die Küste und der Lärm im Kopf wird leise. Du stoppst für Fotos, teilst Minztee wenn die Motoren abkühlen, lachst über Beinahe-Unfälle und gehst mit Sand in den Schuhen und einem Handy voller Beweise. Davon erzählen die Leute noch Wochen später.",
  bio3:
    "Noch nie gefahren? Kein Stress. Briefing an der Base, Helme passend, Tempo des Langsamsten, Buchung per WhatsApp in ein paar Nachrichten. Familien, Paare, Erstfahrer — alle willkommen. Komm für die Fahrt. Bleib für das Gefühl, wenn die Sonne sinkt und die Tracks still werden.",
  bookTour: "Buchen",
  googleRating: "Google · {rating} ({count})",
  whatYouGet: "Was du bekommst",
  offerings: {
    quads: { name: "Quads", detail: "Geführte ATVs · Anfänger willkommen" },
    buggies: { name: "Buggys", detail: "Nebeneinander Strand & Dünen" },
    sunset: { name: "Sonnenuntergang", detail: "Golden Hour · Fotostops" },
    private: { name: "Private Gruppen", detail: "Dein Slot, dein Tempo" },
  },
  openDaily: "Täglich geöffnet {hours}",
  ridersSay: "Was Rider sagen",
  beforeYouRide: "Vor der Fahrt",
  askWhatsApp: "Per WhatsApp fragen",
  stillUnsure: "Noch unsicher? WhatsApp. Wir antworten schnell.",
  experienceTitle: "Das Erlebnis",
  experienceBody:
    "Wind im Gesicht, Spuren im Sand, ein Guide der jede Kurve kennt. Täglich geöffnet {hours}. Helme inklusive. Anfänger willkommen.",
  bookWhatsApp: "Per WhatsApp buchen",
  locationGoogle: "Standort · Google {rating}",
  locationCta: "Standort",
  locationCtaMobile: "Wo ist das?",
  itinerary: {
    pickup: {
      title: "Hotelabholung und Sicherheitsbriefing",
      body: "Abholung aus Agadir und Tamraght. An der Base erklärt der Guide die Steuerung, gibt Helme und Brillen aus und stellt sicher, dass alle bereit sind.",
      minutes: "30 Minuten",
      included: "• Transport & Ausrüstung inklusive",
    },
    ride: {
      title: "Geführte Quad- & Buggy-Tour · Strand, Dünen, Trails",
      body: "Nach kurzer Übung folgst du dem Guide über Sandpisten, Strandabschnitte und offene Trails. Für Erstfahrer gebaut — echt spannend.",
      minutes: "75 Minuten",
      included: "• Geführte Tour inklusive",
    },
    tea: {
      title: "Minztee und Fotopause mit Küstenblick",
      body: "Stopp am Aussichtspunkt für marokkanischen Minztee und Snacks, Fotos von der Küste, dann weiter.",
      minutes: "20 Minuten",
      included: "• Tee, Snacks & Fotostopp inklusive",
    },
    return: {
      title: "Rückkehr zur Base",
      body: "Zurück zur Base, Ausrüstung ab, Transfer zu deinem Hotel in Agadir oder Tamraght.",
      minutes: "30 Minuten",
      included: "• Hotel-Rückfahrt inklusive",
    },
  },
  includedTitle: "In deiner Rio-Quad-Tour enthalten",
  includedItems: [
    "Helme & Brillen",
    "Lokaler Guide",
    "Quad oder Buggy",
    "Minztee & Snacks",
    "Fotostops",
    "Hotel-Abholung & Rückfahrt",
  ],
  googleReviews: "Google-Bewertungen",
  reviewsCount: "· {count} Bewertungen",
  readOnMaps: "Auf Google Maps lesen",
  faqs: [
    {
      q: "Wo treffen wir uns?",
      a: "Base an der Rte de L'Oued Sous (Agadir / Tamraght). Google-Maps-Pin oder WhatsApp — wir schicken den genauen Treffpunkt mit der Buchung.",
    },
    {
      q: "Brauche ich Erfahrung?",
      a: "Nein. Briefing vor dem Start, Tempo des Langsamsten. Anfänger und Kinder (mit Erwachsenem) willkommen.",
    },
    {
      q: "Was mitbringen?",
      a: "Geschlossene Schuhe, Sonnencreme, leichte Jacke bei Sonnenuntergang. Helme, Brillen und Maschinen inklusive.",
    },
    {
      q: "Wie buche ich?",
      a: "WhatsApp ist am schnellsten: Datum, Uhrzeit, Personen, Quad oder Buggy. Oft am selben Tag 09:00-21:00 möglich.",
    },
    {
      q: "Private Gruppe?",
      a: "Ja. Daten und Gruppengröße per WhatsApp — wir reservieren einen privaten Slot in deinem Tempo.",
    },
  ],
  themeLight: "Hell",
  themeDark: "Dunkel",
  language: "Sprache",
  extrasTitle: "Abholung & Extras",
  extrasPrompt: "Hotelabholung, Transport oder etwas anderes?",
  extrasCta: "Hinzufügen · WhatsApp",
  extrasWhatsApp:
    "Hi Rio Quad. Ich brauche Extras für meine Tour.\nTransport / Hotelabholung:\nAndere Wünsche:",
  booking: {
    title: "Tour buchen",
    subtitle: "Kurze Angaben. Wir machen per WhatsApp weiter.",
    name: "Dein Name",
    namePlaceholder: "Vollständiger Name",
    people: "Wie viele Personen?",
    experience: "Welche Erfahrung?",
    includes: "Was soll dabei sein?",
    date: "Wunschdatum",
    notes: "Noch etwas?",
    notesPlaceholder: "Hotel, Allergien, Sprache… (optional)",
    next: "Weiter",
    back: "Zurück",
    send: "Per WhatsApp senden",
    close: "Schließen",
    waHello: "Hi Rio Quad. Ich möchte eine Tour buchen.",
    experiences: {
      quads: "Quads",
      buggies: "Buggys",
      sunset: "Sonnenuntergangstour",
      private: "Private Gruppe",
    },
    extras: {
      pickup: "Hotelabholung",
      dropoff: "Hotelrückfahrt",
      photos: "Fotostops",
      tea: "Minztee-Stopp",
      privateGuide: "Privater Guide",
    },
  },
};

const ar: Messages = {
  tabs: { Photos: "صور", Experience: "التجربة", Reviews: "التقييمات" },
  seoEyebrow: "جولات كواد وباغي · أكادير وتمراغت",
  headline: "تمراغت غير لما تكون أنت اللي تقود الساحل.",
  bio1:
    "ضوء الصباح على الأطلسي. غبار خلف العجلات. تطلع من تمراغت مع مرشد محلي يعرف الكثبان الناعمة، شواطئ هادئة، والمسارات اللي أغلب الرحلات اليومية ما توصلهاش. أيام فيها ريح ورمل مفتوح. وأيام فيها ظل في الأودية، توقفات تصوير على القمة، وأول دعسة غاز حقيقية لما تثق في الآلة. كواد أو باغي، نفس الإحساس.",
  bio2:
    "الخوذة محكمة، الغاز خفيف في البداية، بعدين الساحل ينفتح والضوضاء في راسك تهدأ. توقف للصور، تشارك أتاي بالنعناع لما تبرد المحركات، تضحك على الفزعات، وتمشي برمل في حذائك وتليفون مليان أدلة إنك كنت هنا. هذا اللي الناس كتحكي عليه بعد أسابيع.",
  bio3:
    "ما عمرك قُدت؟ ما كاينش مشكل. شرح في القاعدة، نضبط الخوذات، نمشي على إيقاع الأبطأ، والحجز على واتساب في شوية رسائل. عائلات، أزواج، مبتدئين — الكل مرحب به. جي للرحلة. وبقا على إحساس تمراغت لما تغرب الشمس والمسارات تهدأ.",
  bookTour: "احجز جولة",
  googleRating: "Google · {rating} ({count})",
  whatYouGet: "شنو كتحصل",
  offerings: {
    quads: { name: "كواد", detail: "دراجات ATV بإرشاد · للمبتدئين" },
    buggies: { name: "باغي", detail: "جنبًا إلى جنب على الشاطئ والكثبان" },
    sunset: { name: "جولات الغروب", detail: "الساعة الذهبية · توقفات تصوير" },
    private: { name: "مجموعات خاصة", detail: "وقتك، إيقاعك" },
  },
  openDaily: "مفتوح يوميًا {hours}",
  ridersSay: "شنو كيقولو الركّاب",
  beforeYouRide: "قبل ما تركب",
  askWhatsApp: "اسأل على واتساب",
  stillUnsure: "ما زلت متردد؟ واتساب. نجوب بسرعة.",
  experienceTitle: "التجربة",
  experienceBody:
    "الريح في وجهك، آثار العجلات في الرمل، مرشد يعرف كل منعطف. مفتوح يوميًا {hours}. الخوذات علينا. المبتدئون مرحب بهم.",
  bookWhatsApp: "احجز على واتساب",
  locationGoogle: "الموقع · Google {rating}",
  locationCta: "الموقع",
  locationCtaMobile: "أين هذا؟",
  itinerary: {
    pickup: {
      title: "الاستقبال وشرح السلامة",
      body: "نقل من أكادير وتمراغت. في القاعدة يشرح المرشد التحكم، يوزع الخوذات والنظارات، ويتأكد أن الجميع جاهز قبل الانطلاق.",
      minutes: "30 دقيقة",
      included: "• النقل ومعدات السلامة مشمولة",
    },
    ride: {
      title: "جولة كواد وباغي · شاطئ وكثبان ومسارات",
      body: "بعد تمرين قصير تتبع المرشد عبر مسارات رملية وشاطئ ودروب مفتوحة. مناسبة للمبتدئين وفيها حماس حقيقي.",
      minutes: "75 دقيقة",
      included: "• الجولة بإرشاد مشمولة",
    },
    tea: {
      title: "أتاي بالنعناع وتوقف تصوير مطل على الساحل",
      body: "توقف في نقطة بانورامية لأتاي مغربي ووجبات خفيفة مع صور للساحل قبل المتابعة.",
      minutes: "20 دقيقة",
      included: "• الأتاي والوجبات وتوقف الصور مشمولة",
    },
    return: {
      title: "العودة إلى القاعدة",
      body: "رجوع للقاعدة، نزع المعدات، ثم توصيل لفندقك في أكادير أو تمراغت.",
      minutes: "30 دقيقة",
      included: "• التوصيل للفندق مشمول",
    },
  },
  includedTitle: "مشمول في جولة Rio Quad",
  includedItems: [
    "خوذات ونظارات",
    "مرشد محلي",
    "كواد أو باغي",
    "أتاي بالنعناع ووجبات خفيفة",
    "توقفات تصوير",
    "استقبال وتوصيل للفندق",
  ],
  googleReviews: "تقييمات Google",
  reviewsCount: "· {count} مراجعة",
  readOnMaps: "اقرأ على خرائط Google",
  faqs: [
    {
      q: "فين كنلتقيو؟",
      a: "القاعدة على Rte de L'Oued Sous (أكادير / تمراغت). دبوس خرائط Google أو واتساب — نرسل لك نقطة اللقاء الدقيقة مع الحجز.",
    },
    {
      q: "خاصني خبرة؟",
      a: "لا. شرح قبل الانطلاق وإيقاع الأبطأ. المبتدئون والأطفال (مع بالغ) مرحب بهم.",
    },
    {
      q: "شنو نجيب معايا؟",
      a: "حذاء مغلق، واقي شمس، وجاكيت خفيف إذا ركبت عند الغروب. الخوذات والنظارات والآلات مشمولة.",
    },
    {
      q: "كيفاش نحجز؟",
      a: "واتساب الأسرع: التاريخ، الوقت، العدد، كواد أو باغي. غالبًا متاح في نفس اليوم 09:00-21:00.",
    },
    {
      q: "مجموعة خاصة؟",
      a: "نعم. التواريخ وحجم المجموعة على واتساب ونحجز لك وقت خاص بإيقاعك.",
    },
  ],
  themeLight: "وضع فاتح",
  themeDark: "وضع داكن",
  language: "اللغة",
  extrasTitle: "الاستقبال والإضافات",
  extrasPrompt: "خاصك استقبال من الفندق، نقل، أو شي آخر؟",
  extrasCta: "أضف · واتساب",
  extrasWhatsApp:
    "مرحبا Rio Quad. محتاج إضافات للجولة.\nنقل / استقبال من الفندق:\nطلبات أخرى:",
  booking: {
    title: "احجز جولتك",
    subtitle: "تفاصيل سريعة. نكمل على واتساب.",
    name: "اسمك",
    namePlaceholder: "الاسم الكامل",
    people: "كم شخص؟",
    experience: "أي تجربة؟",
    includes: "شنو بغيتي تضمّن؟",
    date: "التاريخ المفضل",
    notes: "شي حاجة أخرى؟",
    notesPlaceholder: "الفندق، حساسية، اللغة… (اختياري)",
    next: "متابعة",
    back: "رجوع",
    send: "أرسل على واتساب",
    close: "إغلاق",
    waHello: "مرحبا Rio Quad. بغيت نحجز جولة.",
    experiences: {
      quads: "كواد",
      buggies: "باغي",
      sunset: "جولة الغروب",
      private: "مجموعة خاصة",
    },
    extras: {
      pickup: "استقبال من الفندق",
      dropoff: "توصيل للفندق",
      photos: "توقفات تصوير",
      tea: "توقف أتاي بالنعناع",
      privateGuide: "مرشد خاص",
    },
  },
};

const zh: Messages = {
  tabs: { Photos: "照片", Experience: "体验", Reviews: "评价" },
  seoEyebrow: "沙滩车与越野车之旅 · 阿加迪尔与Tamraght",
  headline: "当你亲自驾驭海岸，Tamraght 才真正不一样。",
  bio1:
    "大西洋上的晨光，轮胎后扬起沙尘。你从 Tamraght 出发，本地向导熟知柔软沙丘、安静海滩，以及大多数一日游从未踏足的小径。有些日子是风与开阔沙地；有些日子是河谷阴影、山脊拍照停靠，以及当你终于信任机器时那第一次真正的油门。四轮摩托或越野车，同一种肾上腺素。",
  bio2:
    "戴上头盔，先轻踩油门，随后海岸展开，脑子里的嘈杂安静下来。你停下拍照，引擎冷却时分享薄荷茶，笑谈差一点的惊险，离开时鞋里还有沙子、手机里全是证据。这正是人们几周后仍在谈论的部分。",
  bio3:
    "从没开过？别担心。基地简报、调好头盔、按最慢的人节奏行进，WhatsApp 几条消息搞定预订。家庭、情侣、新手都欢迎。为骑行而来，为日落时 Tamraght 安静的小径而留。",
  bookTour: "预订行程",
  googleRating: "Google · {rating} ({count})",
  whatYouGet: "您将获得",
  offerings: {
    quads: { name: "沙滩车", detail: "有导游的 ATV · 欢迎新手" },
    buggies: { name: "越野车", detail: "海滩与沙丘并排驾驶" },
    sunset: { name: "日落之旅", detail: "黄金时刻 · 拍照停靠" },
    private: { name: "私人团", detail: "您的时段，您的节奏" },
  },
  openDaily: "每日开放 {hours}",
  ridersSay: "骑手怎么说",
  beforeYouRide: "出发前须知",
  askWhatsApp: "WhatsApp 咨询",
  stillUnsure: "还有疑问？WhatsApp 我们，回复很快。",
  experienceTitle: "体验内容",
  experienceBody:
    "风打在脸上，沙地上留下车辙，向导熟悉每一个弯道。每日开放 {hours}。头盔包含。欢迎新手。",
  bookWhatsApp: "WhatsApp 预订",
  locationGoogle: "位置 · Google {rating}",
  locationCta: "位置",
  locationCtaMobile: "这在哪里？",
  itinerary: {
    pickup: {
      title: "酒店接送与安全简报",
      body: "从阿加迪尔和 Tamraght 接送。在基地，向导讲解操控、发放头盔和护目镜，确保每个人准备就绪。",
      minutes: "30 分钟",
      included: "• 含交通与安全装备",
    },
    ride: {
      title: "沙滩车与越野车导览 · 海滩、沙丘与小径",
      body: "短暂练习后跟随向导穿越沙地小径、海滩路段与开阔赛道。适合新手，依然刺激。",
      minutes: "75 分钟",
      included: "• 含导游带队骑行",
    },
    tea: {
      title: "薄荷茶与海岸观景拍照",
      body: "在观景点停下，享用摩洛哥薄荷茶和小食，拍摄海岸后再继续。",
      minutes: "20 分钟",
      included: "• 含茶、小食与拍照停靠",
    },
    return: {
      title: "返回基地",
      body: "回到基地卸下装备，再送回阿加迪尔或 Tamraght 的酒店。",
      minutes: "30 分钟",
      included: "• 含酒店送回",
    },
  },
  includedTitle: "Rio Quad 行程包含",
  includedItems: [
    "头盔与护目镜",
    "本地向导",
    "沙滩车或越野车",
    "薄荷茶与小食",
    "拍照停靠",
    "酒店接送",
  ],
  googleReviews: "Google 评价",
  reviewsCount: "· {count} 条评价",
  readOnMaps: "在 Google 地图查看",
  faqs: [
    {
      q: "在哪里会合？",
      a: "基地位于 Rte de L'Oued Sous（阿加迪尔 / Tamraght）。Google 地图定位或 WhatsApp — 预订时我们发送精确会合点。",
    },
    {
      q: "需要经验吗？",
      a: "不需要。出发前简报，按最慢骑手节奏。欢迎新手和儿童（需成人陪同）。",
    },
    {
      q: "需要带什么？",
      a: "封闭式鞋子、防晒，日落骑行可带轻外套。头盔、护目镜和车辆均包含。",
    },
    {
      q: "如何预订？",
      a: "WhatsApp 最快：发送日期、时间、人数，以及沙滩车或越野车。当日 09:00-21:00 常有空位。",
    },
    {
      q: "可以包团吗？",
      a: "可以。WhatsApp 告知日期和人数，我们按您的节奏锁定私人时段。",
    },
  ],
  themeLight: "浅色模式",
  themeDark: "深色模式",
  language: "语言",
  extrasTitle: "接送与加项",
  extrasPrompt: "需要酒店接送、交通或其他？",
  extrasCta: "添加 · WhatsApp",
  extrasWhatsApp:
    "你好 Rio Quad。我的行程需要加项。\n交通 / 酒店接送：\n其他需求：",
  booking: {
    title: "预订您的行程",
    subtitle: "快速填写。我们在 WhatsApp 完成。",
    name: "您的姓名",
    namePlaceholder: "全名",
    people: "几位？",
    experience: "想体验什么？",
    includes: "想包含什么？",
    date: "首选日期",
    notes: "还有别的吗？",
    notesPlaceholder: "酒店、过敏、语言…（可选）",
    next: "继续",
    back: "返回",
    send: "通过 WhatsApp 发送",
    close: "关闭",
    waHello: "你好 Rio Quad。我想预订行程。",
    experiences: {
      quads: "沙滩车",
      buggies: "越野车",
      sunset: "日落之旅",
      private: "私人团",
    },
    extras: {
      pickup: "酒店接送",
      dropoff: "酒店送回",
      photos: "拍照停靠",
      tea: "薄荷茶停靠",
      privateGuide: "私人向导",
    },
  },
};

export const messages: Record<Locale, Messages> = {
  en,
  fr,
  es,
  de,
  ar,
  zh,
};

export function fill(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) =>
    String(vars[k] ?? `{${k}}`),
  );
}
