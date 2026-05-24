"use client";
import useSWR from "swr";
import Link from "next/link";
import NewsCard from "./NewsCard";
import type { NewsItem } from "@/lib/types";

const fetcher = (u: string) => fetch(u).then((r) => r.json());

export default function HomeNewsFeed() {
  const { data, isLoading } = useSWR<{ data: NewsItem[] }>("/api/news?limit=6", fetcher);

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">Latest BFSI News</h2>
        <Link href="/news" className="text-xs text-brand-500 hover:underline">All news →</Link>
      </div>
      {isLoading ? (
        <div className="grid md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card p-4 h-52 animate-pulse bg-[var(--bg-hover)]" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {data?.data?.slice(0, 6).map((item, i) => (
            <NewsCard key={item.id} item={item} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
