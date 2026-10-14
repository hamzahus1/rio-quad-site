import caseStudiesData from "./caseStudies.data.json";

export type ContentBlock =
  | { type: "banner"; image: string }
  | { type: "single"; image: string }
  | { type: "double"; image1: string; image2: string; extraSpace?: boolean }
  | { type: "stacked"; topLeft: string; bottomLeft: string; right: string }
  | {
      type: "grid2x2";
      topLeft: string;
      topRight: string;
      bottomLeft: string;
      bottomRight: string;
    }
  | { type: "text"; title?: string; body: string }
  | { type: "section"; title: string; hideLabel?: boolean }
  | { type: "quote"; quote: string; author: string; authorTitle?: string }
  | { type: "intro"; headline: string; subtitle: string; tags: string[] }
  | { type: "video"; src: string; poster?: string };

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  tagline: string;
  heroImage: string;
  description: string;
  images: string[];
  process?: string[];
  featured?: boolean;
  contentBlocks?: ContentBlock[];
  heroFit?: "cover" | "contain";
  outcomeMetrics?: string[];
  approach?: string;
  liveUrl?: string;
  liveLabel?: string;
  keyMetric?: string;
  comingSoon?: boolean;
}

export const caseStudies: CaseStudy[] = caseStudiesData as CaseStudy[];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((cs) => cs.slug);
}

export function getAdjacentStudies(slug: string) {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  if (i < 0) return { prev: undefined, next: undefined };
  const n = caseStudies.length;
  return {
    prev: caseStudies[(i - 1 + n) % n],
    next: caseStudies[(i + 1) % n],
  };
}
