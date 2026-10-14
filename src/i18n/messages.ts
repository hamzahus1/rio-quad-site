export type Locale = "en" | "fr" | "es" | "de" | "ar" | "zh";

export type Messages = {
  tabs: Record<"Photos" | "Experience" | "Reviews", string>;
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
  ...en,
  tabs: {
    Photos: "Photos",
    Experience: "Expérience",
    Reviews: "Avis",
  },
  headline: "Tamraght, ça frappe autrement quand c’est toi qui conduis la côte.",
  bio1:
    "Lumière du matin sur l’Atlantique. Poussière derrière les pneus. Tu quittes Tamraght avec un guide local qui connaît les dunes douces, les bouts de plage calmes, et les pistes que la plupart des day trips ne voient jamais. Certains jours c’est le vent et le sable ouvert. D’autres, l’ombre dans les oueds, des stops photo sur la crête, et cette première vraie accélération quand tu fais enfin confiance à la machine. Quad ou buggy, même frisson.",
  bio2:
    "Casque bouclé, gaz doux au début, puis la côte s’ouvre et le bruit dans ta tête se tait. Tu t’arrêtes pour des photos, tu partages un thé à la menthe quand les moteurs se taisent, tu rigoles des petites frayeurs, et tu repars avec du sable dans les chaussures et un téléphone plein de preuves que tu y étais vraiment. C’est ce que les gens racontent encore des semaines plus tard.",
  bio3:
    "Jamais conduit ? Pas de stress. Briefing à la base, on ajuste les casques, on avance au rythme du plus lent, et on règle la réservation sur WhatsApp en quelques messages. Familles, couples, débutants, tout le monde est le bienvenu. Viens pour la balade. Reste pour ce que Tamraght devient quand le soleil tombe et que les pistes se taisent.",
  bookTour: "Réserver",
  locationCta: "Lieu",
  locationCtaMobile: "C’est où ?",
  themeLight: "Mode clair",
  themeDark: "Mode sombre",
  language: "Langue",
  reviewsCount: "· {count} avis",
};

const es: Messages = {
  ...en,
  tabs: { Photos: "Fotos", Experience: "Experiencia", Reviews: "Reseñas" },
  bookTour: "Reservar",
  locationCta: "Ubicación",
  locationCtaMobile: "¿Dónde es?",
  themeLight: "Modo claro",
  themeDark: "Modo oscuro",
  language: "Idioma",
  reviewsCount: "· {count} reseñas",
};

const de: Messages = {
  ...en,
  tabs: { Photos: "Fotos", Experience: "Erlebnis", Reviews: "Bewertungen" },
  bookTour: "Buchen",
  locationCta: "Standort",
  locationCtaMobile: "Wo ist das?",
  themeLight: "Hell",
  themeDark: "Dunkel",
  language: "Sprache",
  reviewsCount: "· {count} Bewertungen",
};

const ar: Messages = {
  ...en,
  tabs: { Photos: "صور", Experience: "التجربة", Reviews: "التقييمات" },
  bookTour: "احجز جولة",
  locationCta: "الموقع",
  locationCtaMobile: "أين هذا؟",
  themeLight: "وضع فاتح",
  themeDark: "وضع داكن",
  language: "اللغة",
  reviewsCount: "· {count} مراجعة",
};

const zh: Messages = {
  ...en,
  tabs: { Photos: "照片", Experience: "体验", Reviews: "评价" },
  bookTour: "预订行程",
  locationCta: "位置",
  locationCtaMobile: "这在哪里？",
  themeLight: "浅色模式",
  themeDark: "深色模式",
  language: "语言",
  reviewsCount: "· {count} 条评价",
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
