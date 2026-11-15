import { localBusinessJsonLd } from "../lib/seo";

/** Server-rendered JSON-LD for Google / Maps / AI search */
export function JsonLd() {
  const data = localBusinessJsonLd();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
