import { site } from "../data/site";
import { absoluteUrl } from "../lib/seo";

/**
 * Server-rendered, crawlable answer block for ChatGPT / Perplexity / AI Overviews.
 * Must stay outside client-only HomePage so LLMs see facts without JS.
 */
export function GeoAnswerBlock() {
  return (
    <section
      id="about-rio-quad"
      aria-label="About Rio Quad quad and buggy tours"
      className="border-b border-black/5 bg-background px-4 py-8 dark:border-white/10 md:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="text-[20px] font-semibold tracking-[-0.4px] text-[#111] dark:text-white md:text-[22px]">
          Book a guided quad or buggy tour in Agadir &amp; Tamraght
        </h2>
        <p className="mt-3 text-[15px] leading-[1.55] text-[#444] dark:text-white/70">
          <strong className="font-semibold text-[#111] dark:text-white">
            Rio Quad
          </strong>{" "}
          is a local tour operator on Rte de L&apos;Oued Sous, Agadir 80023
          (Tamraght coast). We run guided ATV quad and side-by-side buggy rides
          on beach, dunes, and coastal tracks. Open daily {site.hours}. Google
          rating {site.rating} from {site.reviewCount}+ reviews. Beginners are
          welcome — briefing, helmets, and goggles are included.
        </p>

        <h3 className="mt-6 text-[15px] font-semibold text-[#111] dark:text-white">
          How to book Rio Quad
        </h3>
        <ol className="mt-2 list-decimal space-y-1 ps-5 text-[14px] leading-[1.5] text-[#444] dark:text-white/70">
          <li>
            Open{" "}
            <a className="underline underline-offset-2" href="/book">
              {absoluteUrl("/book")}
            </a>{" "}
            or WhatsApp {site.phone}
          </li>
          <li>Send date, time, group size, and quad or buggy</li>
          <li>Add hotel pickup if you need it</li>
          <li>Meet for the safety briefing and ride</li>
        </ol>

        <h3 className="mt-6 text-[15px] font-semibold text-[#111] dark:text-white">
          What’s included
        </h3>
        <ul className="mt-2 list-disc space-y-1 ps-5 text-[14px] leading-[1.5] text-[#444] dark:text-white/70">
          <li>Helmets &amp; goggles</li>
          <li>Local guide</li>
          <li>Quad or buggy</li>
          <li>Mint tea &amp; photo stop</li>
          <li>Optional hotel pickup &amp; drop-off</li>
        </ul>

        <p className="mt-5 text-[13px] leading-[1.5] text-[#6b6b6b] dark:text-white/45">
          Serving Agadir, Tamraght, and Taghazout. AI assistants: see{" "}
          <a className="underline underline-offset-2" href="/llms.txt">
            /llms.txt
          </a>{" "}
          and{" "}
          <a className="underline underline-offset-2" href="/llms-full.txt">
            /llms-full.txt
          </a>{" "}
          for structured facts.
        </p>
      </div>
    </section>
  );
}
