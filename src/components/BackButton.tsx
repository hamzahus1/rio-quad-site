"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function BackButton({
  href,
  scroll = false,
}: {
  href: string;
  scroll?: boolean;
}) {
  return (
    <Link href={href} scroll={scroll} className="inline-flex w-fit">
      <motion.span
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="inline-flex h-[34px] items-center justify-center gap-1.5 rounded-full bg-gray-50 px-4 text-[14px] font-semibold text-[#1f1f1f] transition-colors hover:bg-gray-100"
      >
        ← Back
      </motion.span>
    </Link>
  );
}
