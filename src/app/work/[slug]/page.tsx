import { redirect } from "next/navigation";
import { getAllCaseStudySlugs, getCaseStudyBySlug } from "../../../lib/caseStudies";

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) redirect("/");
  // Keep left home sidebar. Open case study in the right panel.
  redirect(`/?work=${slug}&tab=photos`);
}
