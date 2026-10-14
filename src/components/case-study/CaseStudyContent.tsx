"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  caseStudies,
  getAdjacentStudies,
  type CaseStudy,
  type ContentBlock,
} from "../../lib/caseStudies";
import { BackButton } from "../BackButton";

function Img({
  src,
  alt,
  className = "object-cover",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={`h-full w-full ${className}`} />
  );
}

function SidebarSection({
  title,
  content,
  active,
  onClick,
}: {
  title: string;
  content?: string;
  active: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const show = (active || hovered) && !!content;

  return (
    <div
      className="relative py-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        aria-expanded={active}
        onClick={onClick}
        className="flex w-full items-center gap-2 text-left"
      >
        <span className="flex h-[15px] w-3 shrink-0 items-center justify-center">
          <span
            className={`h-[5px] w-[5px] rounded-full transition-opacity ${
              active || hovered ? "opacity-100" : "opacity-0"
            } ${active ? "bg-[#1f1f1f]" : "bg-[#8C8C8C]"}`}
          />
        </span>
        <span
          className={`text-[15px] font-medium tracking-[-0.32px] transition-colors ${
            active || hovered ? "text-[#111111]" : "text-[#8C8C8C]"
          }`}
        >
          {title}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {show && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pt-2 pl-5 text-[15px] leading-[1.55] tracking-[-0.32px] text-[#6b6b6b]">
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BlockBanner({ image, client }: { image: string; client: string }) {
  return (
    <div className="pb-4">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-50">
        <Img src={image} alt={client} />
      </div>
    </div>
  );
}

function BlockVideo({
  src,
  poster,
  client,
}: {
  src: string;
  poster?: string;
  client: string;
}) {
  return (
    <div className="pb-4">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#111]">
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          aria-label={`${client} video`}
        />
      </div>
    </div>
  );
}

function BlockSingle({ image, client }: { image: string; client: string }) {
  return (
    <div className="pb-4">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-50">
        <Img src={image} alt={client} />
      </div>
    </div>
  );
}

function BlockDouble({
  image1,
  image2,
  client,
}: {
  image1: string;
  image2: string;
  client: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 pb-4 md:grid-cols-2 md:gap-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-50">
        <Img src={image1} alt={client} />
      </div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-50">
        <Img src={image2} alt={client} />
      </div>
    </div>
  );
}

function BlockSection({ title, number }: { title: string; number: string }) {
  return (
    <div className="flex items-baseline gap-3 pb-3 pt-8 md:pt-10">
      <span className="text-[13px] font-medium tracking-[-0.32px] text-[#8C8C8C]">
        {number}
      </span>
      <h2 className="text-[22px] font-semibold tracking-[-0.6px] text-[#111111] md:text-[24px]">
        {title}
      </h2>
    </div>
  );
}

function BlockText({ title, body }: { title?: string; body: string }) {
  return (
    <div className="max-w-2xl pb-6">
      {title && (
        <h3 className="mb-2 text-[16px] font-semibold tracking-[-0.32px] text-[#111111]">
          {title}
        </h3>
      )}
      <p className="text-[15px] leading-[1.55] tracking-[-0.32px] text-[#6b6b6b]">
        {body}
      </p>
    </div>
  );
}

function BlockQuote({
  quote,
  author,
  authorTitle,
}: {
  quote: string;
  author: string;
  authorTitle?: string;
}) {
  return (
    <blockquote className="my-8 border-l border-gray-200 pl-5">
      <p className="text-[18px] font-medium leading-[1.45] tracking-[-0.4px] text-[#111111] md:text-[20px]">
        “ {quote} ”
      </p>
      <footer className="mt-3 text-[13px] text-[#8C8C8C]">
        {author}
        {authorTitle ? `, ${authorTitle}` : ""}
      </footer>
    </blockquote>
  );
}

function renderBlock(
  block: ContentBlock,
  i: number,
  client: string,
  sectionCounter: { n: number }
) {
  switch (block.type) {
    case "banner":
      return <BlockBanner key={i} image={block.image} client={client} />;
    case "video":
      return (
        <BlockVideo
          key={i}
          src={block.src}
          poster={block.poster}
          client={client}
        />
      );
    case "single":
      return <BlockSingle key={i} image={block.image} client={client} />;
    case "double":
      return (
        <BlockDouble
          key={i}
          image1={block.image1}
          image2={block.image2}
          client={client}
        />
      );
    case "section":
      sectionCounter.n += 1;
      return (
        <BlockSection
          key={i}
          title={block.title}
          number={`${sectionCounter.n}.0`}
        />
      );
    case "text":
      return <BlockText key={i} title={block.title} body={block.body} />;
    case "quote":
      return (
        <BlockQuote
          key={i}
          quote={block.quote}
          author={block.author}
          authorTitle={block.authorTitle}
        />
      );
    case "stacked":
      return (
        <div key={i} className="grid grid-cols-1 gap-3 pb-4 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <div className="relative aspect-[5/3] overflow-hidden rounded-2xl bg-gray-50">
              <Img src={block.topLeft} alt={client} />
            </div>
            <div className="relative aspect-[5/3] overflow-hidden rounded-2xl bg-gray-50">
              <Img src={block.bottomLeft} alt={client} />
            </div>
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl bg-gray-50 md:min-h-full">
            <Img src={block.right} alt={client} />
          </div>
        </div>
      );
    case "grid2x2":
      return (
        <div key={i} className="grid grid-cols-2 gap-3 pb-4">
          {[
            block.topLeft,
            block.topRight,
            block.bottomLeft,
            block.bottomRight,
          ].map((src, j) => (
            <div
              key={j}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-50"
            >
              <Img src={src} alt={client} />
            </div>
          ))}
        </div>
      );
    case "intro":
      return (
        <div key={i} className="pb-8 pt-4">
          <h2 className="text-[24px] font-semibold tracking-[-0.6px] text-[#111111] md:text-[28px]">
            {block.headline}
          </h2>
          <p className="mt-2 text-[15px] leading-[1.55] tracking-[-0.32px] text-[#6b6b6b]">
            {block.subtitle}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {block.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-gray-50 px-2.5 py-1 text-[12px] font-medium tracking-[-0.2px] text-[#8C8C8C]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function CaseStudyContent({
  study,
  embedded = false,
  backHref = "/?tab=photos",
}: {
  study: CaseStudy;
  /** Render inside home right panel. Keeps left sidebar intact. */
  embedded?: boolean;
  backHref?: string;
}) {
  const {
    slug,
    client,
    tagline,
    category,
    year,
    description,
    heroImage,
    heroFit,
    images,
    process,
    contentBlocks,
    outcomeMetrics,
    approach,
    liveUrl,
    liveLabel,
    keyMetric,
  } = study;

  const studyHref = (s: string) =>
    embedded ? `/?work=${s}` : `/work/${s}`;


  const sidebarSections = useMemo(() => {
    const sections: { title: string; content?: string }[] = [
      { title: "Challenge", content: description },
    ];
    if (approach) sections.push({ title: "How we worked", content: approach });
    if (process?.length)
      sections.push({ title: "Process", content: process.join(" · ") });
    if (outcomeMetrics?.length)
      sections.push({
        title: "Outcomes",
        content: outcomeMetrics.join(" · "),
      });
    const blockSections =
      contentBlocks
        ?.filter(
          (b): b is Extract<ContentBlock, { type: "section" }> =>
            b.type === "section"
        )
        .map((b) => ({ title: b.title })) ?? [];
    if (blockSections.length > 1) {
      return [
        { title: "Challenge", content: description },
        ...blockSections.map((s) => {
          const textAfter = contentBlocks?.find(
            (b, idx) =>
              b.type === "text" &&
              contentBlocks[idx - 1]?.type === "section" &&
              (contentBlocks[idx - 1] as { title: string }).title === s.title
          ) as { body?: string } | undefined;
          return { title: s.title, content: textAfter?.body };
        }),
        ...(approach ? [{ title: "How we worked", content: approach }] : []),
      ];
    }
    return sections;
  }, [approach, contentBlocks, description, outcomeMetrics, process]);

  const [activeSection, setActiveSection] = useState(0);
  const { prev, next } = getAdjacentStudies(slug);
  const sectionCounter = { n: 0 };

  const galleryFallback = () => {
    const gallery = images[0] === heroImage ? images.slice(1) : images;
    const rows: React.ReactNode[] = [];
    let idx = 0;
    while (idx < gallery.length) {
      if (gallery.length - idx >= 2) {
        rows.push(
          <BlockDouble
            key={idx}
            image1={gallery[idx]}
            image2={gallery[idx + 1]}
            client={client}
          />
        );
        idx += 2;
      } else {
        rows.push(
          <BlockSingle key={idx} image={gallery[idx]} client={client} />
        );
        idx += 1;
      }
    }
    return rows;
  };

  const meta = (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-[24px] font-semibold leading-8 tracking-[-0.6px] text-[#111111]">
          {client}
        </h1>
        <p className="mt-1 text-[15px] leading-[1.55] tracking-[-0.32px] text-[#6b6b6b]">
          {tagline}
        </p>
      </div>
      <div className="flex items-center gap-2 text-[13px] font-medium tracking-[-0.32px] text-[#8C8C8C]">
        <span>{category}</span>
        <span className="h-[3px] w-[3px] rounded-full bg-[#8C8C8C]" />
        <span>{year}</span>
      </div>
      {(liveUrl || keyMetric) && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {keyMetric && (
            <span className="inline-flex h-[28px] items-center rounded-full bg-gray-50 px-3 text-[12px] font-semibold text-[#1f1f1f]">
              {keyMetric}
            </span>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[28px] items-center rounded-full bg-[#1f1f1f] px-3 text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              {liveLabel || "Website"} ↗
            </a>
          )}
        </div>
      )}
    </div>
  );

  const sectionsNav = (
    <div className="flex flex-col border-t border-gray-100 pt-4">
      {sidebarSections.map((section, i) => (
        <SidebarSection
          key={section.title + i}
          title={section.title}
          content={section.content}
          active={activeSection === i}
          onClick={() => setActiveSection(i)}
        />
      ))}
    </div>
  );

  const gallery = (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-50">
          <Img
            src={heroImage}
            alt={client}
            className={
              heroFit === "contain"
                ? "object-contain object-center"
                : "object-cover object-center"
            }
          />
        </div>
      </motion.div>

      <div className="mt-4 pb-16 md:pb-20">
        {contentBlocks?.length
          ? contentBlocks.map((block, i) =>
              renderBlock(block, i, client, sectionCounter)
            )
          : galleryFallback()}

        {prev && next && caseStudies.length > 1 && (
          <div className="mt-12 grid grid-cols-1 gap-8 border-t border-gray-100 pt-10 md:grid-cols-2">
            <div>
              <p className="mb-3 text-[13px] font-medium tracking-[-0.32px] text-[#8C8C8C]">
                Previous
              </p>
              <Link href={studyHref(prev.slug)} className="group block" scroll={false}>
                <h2 className="text-[20px] font-semibold tracking-[-0.5px] text-[#111111] transition-opacity group-hover:opacity-70">
                  {prev.client}
                </h2>
                <p className="mt-1 line-clamp-2 text-[14px] leading-[1.5] text-[#6b6b6b]">
                  {prev.tagline}
                </p>
              </Link>
            </div>
            <div>
              <p className="mb-3 text-[13px] font-medium tracking-[-0.32px] text-[#8C8C8C]">
                Next up
              </p>
              <Link href={studyHref(next.slug)} className="group block" scroll={false}>
                <h2 className="text-[20px] font-semibold tracking-[-0.5px] text-[#111111] transition-opacity group-hover:opacity-70">
                  {next.client}
                </h2>
                <p className="mt-1 line-clamp-2 text-[14px] leading-[1.5] text-[#6b6b6b]">
                  {next.tagline}
                </p>
              </Link>
            </div>
          </div>
        )}

        <div className="mt-12 border-t border-gray-100 pt-6">
          <p className="text-[15px] leading-[1.55] tracking-[-0.32px] text-[#6b6b6b]">
            Want to discuss a project?
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex h-[34px] items-center justify-center rounded-full bg-[#1f1f1f] px-4 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </>
  );

  /* ── Embedded: fills home right panel only ── */
  if (embedded) {
    return (
      <div className="flex min-h-0 w-full flex-1 flex-col bg-white text-[#1f1f1f]">
        <div className="no-scrollbar flex-1 overflow-y-auto p-[16px] md:p-[32px] lg:pt-[32px]">
          <div className="mx-auto w-full max-w-[1100px]">
            <BackButton href={backHref} scroll={false} />

            <div className="mb-8 mt-6 max-w-xl">
              {meta}
              <p className="mt-4 text-[15px] leading-[1.55] tracking-[-0.32px] text-[#6b6b6b]">
                {description}
              </p>
              <div className="mt-6">{sectionsNav}</div>
            </div>

            {gallery}
          </div>
        </div>
      </div>
    );
  }

  /* ── Full page (standalone /work/[slug]) ── */
  return (
    <div className="min-h-screen bg-white text-[#1f1f1f]">
      <div className="mx-auto flex min-h-screen flex-col lg:flex-row">
        <aside className="no-scrollbar flex w-full shrink-0 flex-col p-[20px] md:p-[32px] lg:sticky lg:top-0 lg:h-screen lg:max-w-[420px] lg:overflow-y-auto lg:border-r lg:border-gray-100">
          <div className="mb-8">
            <BackButton href={backHref} />
          </div>

          {meta}

          <div className="mt-8">{sectionsNav}</div>

          <div className="mt-auto hidden pt-8 lg:block">
            <Link
              href="/contact"
              className="inline-flex h-[34px] items-center justify-center rounded-full bg-[#1f1f1f] px-4 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              Get in touch
            </Link>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-[20px] pt-0 md:p-[32px] md:pt-8">
          <div className="mb-6 lg:hidden">
            <p className="text-[15px] leading-[1.55] tracking-[-0.32px] text-[#6b6b6b]">
              {description}
            </p>
          </div>
          {gallery}
        </main>
      </div>
    </div>
  );
}
