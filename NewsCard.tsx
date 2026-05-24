"use client";
import { useState } from "react";
import { ExternalLink, Bookmark, BookmarkCheck } from "lucide-react";
import { motion } from "framer-motion";
import { timeAgo } from "@/lib/utils";
import { toggleBookmark, getBookmarks } from "@/lib/firebase";
import type { NewsItem } from "@/lib/types";

const SOURCE_COLORS: Record<string, string> = {
  "LiveMint":         "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
  "Economic Times":   "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
  "BusinessLine":     "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  "Financial Express":"bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  "NDTV Profit":      "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
};

export default function NewsCard({ item, index = 0 }: { item: NewsItem; index?: number }) {
  const [bookmarked, setBookmarked] = useState(() => getBookmarks().includes(item.id));

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    setBookmarked(toggleBookmark(item.id));
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="card card-hover group flex flex-col p-4 gap-3"
    >
      {item.imageUrl && (
        <div className="h-36 rounded-lg overflow-hidden bg-[var(--bg-hover)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex items-center justify-between gap-2">
        <span className={`badge ${SOURCE_COLORS[item.source] ?? "bg-gray-100 text-gray-600"}`}>
          {item.source}
        </span>
        <span className="text-[10px] text-[var(--text-muted)]">{timeAgo(item.publishedAt)}</span>
      </div>

      <div className="flex-1">
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-[var(--text)] leading-snug line-clamp-2 hover:text-brand-500 transition-colors"
        >
          {item.title}
        </a>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-2 line-clamp-2">
          {item.synopsis}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-brand-500 hover:underline"
        >
          Read full <ExternalLink className="h-3 w-3" />
        </a>
        <button
          onClick={handleBookmark}
          className="p-1.5 rounded-lg hover:bg-[var(--bg-hover)] transition-colors text-[var(--text-muted)]"
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
        >
          {bookmarked
            ? <BookmarkCheck className="h-3.5 w-3.5 text-brand-500" />
            : <Bookmark className="h-3.5 w-3.5" />
          }
        </button>
      </div>
    </motion.article>
  );
}
