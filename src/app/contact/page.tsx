import type { Metadata } from "next";
import { site } from "../../data/site";
import { BackButton } from "../../components/BackButton";

export const metadata: Metadata = {
  title: "Contact · Rio Quad",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col items-start justify-center bg-white px-6 py-16 md:px-10">
      <BackButton href="/" />
      <h1 className="mt-10 text-[36px] font-semibold tracking-[-0.6px] text-[#1f1f1f]">
        Book a ride
      </h1>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#8C8C8C]">
        WhatsApp is the fastest way to lock a slot. Send date, time, group size,
        and whether you want quad or buggy. We’re open daily {site.hours}.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href={site.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-[40px] items-center justify-center rounded-full bg-[#1f1f1f] px-5 text-[14px] font-semibold text-white"
        >
          Book on WhatsApp
        </a>
        <a
          href={`tel:${site.phone.replace(/\s/g, "")}`}
          className="inline-flex h-[40px] items-center justify-center rounded-full bg-gray-100 px-5 text-[14px] font-semibold text-[#1f1f1f]"
        >
          Call {site.phone}
        </a>
        <a
          href={site.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-[40px] items-center justify-center rounded-full bg-gray-100 px-5 text-[14px] font-semibold text-[#1f1f1f]"
        >
          Location · Maps
        </a>
      </div>
      <p className="mt-6 max-w-md text-[13px] leading-relaxed text-[#a3a3a3]">
        {site.location} · Agadir / Tamraght
      </p>
    </div>
  );
}
