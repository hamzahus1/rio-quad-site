"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { PortfolioGallery } from "./PortfolioGallery";
import { CaseStudyContent } from "./case-study/CaseStudyContent";
import { MobileBookBar } from "./MobileBookBar";
import { getCaseStudyBySlug } from "../lib/caseStudies";
import { TAB_PARAM, TAB_TO_PARAM, type Tab } from "../data/site";

export function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const param = searchParams.get("tab");
  const workSlug = searchParams.get("work");
  const initial: Tab = (param && TAB_PARAM[param]) || "Photos";
  const [selectedTag, setSelectedTag] = useState<Tab>(initial);

  const study = workSlug ? getCaseStudyBySlug(workSlug) : undefined;

  useEffect(() => {
    if (param && TAB_PARAM[param]) {
      setSelectedTag(TAB_PARAM[param]);
    }
  }, [param]);

  const onTagChange = (tag: Tab) => {
    setSelectedTag(tag);
    // switching tabs clears open case study
    router.replace(`/?tab=${TAB_TO_PARAM[tag]}`, { scroll: false });
  };

  const backHref = `/?tab=${TAB_TO_PARAM[selectedTag]}`;

  return (
    <div className="mx-auto flex min-h-screen min-w-0 flex-col bg-background pb-[calc(76px+env(safe-area-inset-bottom))] lg:flex-row lg:pb-0">
      {/* Story first on mobile. Desktop: sidebar < half, gallery fills the rest (not 50/50) */}
      <div className="order-1 min-w-0 lg:w-[clamp(560px,38vw,680px)] lg:shrink-0">
        <Sidebar />
      </div>
      <div className="order-2 min-w-0 flex-1">
        {study ? (
          <CaseStudyContent
            key={study.slug}
            study={study}
            embedded
            backHref={backHref}
          />
        ) : (
          <PortfolioGallery
            selectedTag={selectedTag}
            onTagChange={onTagChange}
          />
        )}
      </div>
      <MobileBookBar />
    </div>
  );
}
