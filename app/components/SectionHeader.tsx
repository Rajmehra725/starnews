"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  link?: string;
  linkText?: string;
  badge?: string;
}

export default function SectionHeader({
  title,
  link,
  linkText = "और देखें",
  badge,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b-2 border-red-600/30 pb-2 mb-4">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block" />
        <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {title}
        </h2>
        {badge && (
          <span className="bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            {badge}
          </span>
        )}
      </div>

      {link && (
        <Link
          href={link}
          className="flex items-center gap-0.5 text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 hover:underline transition"
        >
          <span>{linkText}</span>
          <ChevronRight size={14} />
        </Link>
      )}
    </div>
  );
}
