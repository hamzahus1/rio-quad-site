import { site } from "../data/site";

/** Canonical production origin */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://rio-quad.com";

export const SEO = {
  titleDefault: "Rio Quad | Quad & Buggy Tours Agadir & Tamraght — Book Online",
  titleTemplate: "%s | Rio Quad",
  description:
    "Book guided quad and buggy tours in Tamraght & Agadir. Beach, dunes, sunset rides with local guides. Beginners welcome. Open daily 09:00–21:00. WhatsApp booking.",
  keywords: [
    "quad tour Agadir",
    "buggy tour Agadir",
    "quad Tamraght",
    "ATV tour Morocco",
    "book quad Agadir",
    "desert buggy Agadir",
    "sunset quad tour",
    "Rio Quad",
    "quad rental Agadir",
    "Tamraght activities",
  ],
  ogImage: "/images/work/rio-quad/shot-01.jpg",
  locale: "en_MA",
  locales: ["en", "fr", "es", "de", "ar", "zh"] as const,
} as const;

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** LocalBusiness + TouristTrip JSON-LD for booking intent */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "SportsActivityLocation", "TouristAttraction"],
        "@id": `${SITE_URL}/#business`,
        name: site.fullName,
        alternateName: "RIO QUAD",
        description: SEO.description,
        url: SITE_URL,
        telephone: site.phone,
        email: site.email,
        image: absoluteUrl(SEO.ogImage),
        logo: absoluteUrl("/images/work/rio-quad/logo.png"),
        priceRange: "$$",
        currenciesAccepted: "MAD, EUR, USD",
        paymentAccepted: "Cash, Card, WhatsApp booking",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Rte de L'Oued Sous",
          addressLocality: "Agadir",
          postalCode: "80023",
          addressRegion: "Souss-Massa",
          addressCountry: "MA",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 30.5050835,
          longitude: -9.6710895,
        },
        hasMap: site.googleMapsUrl,
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "09:00",
          closes: "21:00",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: site.rating,
          reviewCount: site.reviewCount,
          bestRating: "5",
          worstRating: "1",
        },
        sameAs: [site.instagramUrl, site.googleMapsUrl],
        areaServed: [
          { "@type": "City", name: "Agadir" },
          { "@type": "City", name: "Tamraght" },
          { "@type": "City", name: "Taghazout" },
        ],
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#quad-tour`,
        name: "Guided Quad Tour Agadir / Tamraght",
        serviceType: "Quad ATV tour",
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: ["Agadir", "Tamraght", "Taghazout"],
        url: absoluteUrl("/book"),
        description:
          "Guided quad ATV tours along the Atlantic coast, dunes, and beach near Tamraght and Agadir. Helmets included. Beginners welcome.",
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#buggy-tour`,
        name: "Guided Buggy Tour Agadir / Tamraght",
        serviceType: "Buggy tour",
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: ["Agadir", "Tamraght", "Taghazout"],
        url: absoluteUrl("/book"),
        description:
          "Guided buggy rides through dunes, oueds, and coastal tracks from our Tamraght / Agadir base. Book on WhatsApp.",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: site.fullName,
        description: SEO.description,
        publisher: { "@id": `${SITE_URL}/#business` },
        potentialAction: {
          "@type": "ReserveAction",
          target: absoluteUrl("/book"),
          name: "Book a tour",
        },
      },
    ],
  };
}
