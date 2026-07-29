'use client';

import { PriorityBadge, StatusBadge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { INITIAL_PROJECTS } from '@/data/mock-projects';
import { formatDate, formatNumber } from '@/lib/utils';
import { ProjectCategory } from '@/types/project';
import { motion } from 'framer-motion';
import { ArrowUpRight, Eye, Tag } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export function ShowcaseSection() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'ALL'>('ALL');

  const categories: (ProjectCategory | 'ALL')[] = [
    'ALL',
    'Engineering',
    'Design',
    'Product',
    'Marketing',
    'Infrastructure'
  ];

  const filtered =
    selectedCategory === 'ALL'
      ? INITIAL_PROJECTS
      : INITIAL_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="showcase" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2 block">
            Featured Content Showcase
          </span>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Sorotan Rilis &amp; Dokumentasi Terpopuler
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
              }`}
            >
              {cat === 'ALL' ? 'Semua Kategori' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
          >
            <Card hoverEffect glow className="h-full flex flex-col justify-between group">
              <CardContent className="flex flex-col gap-4 p-0">
                {/* Image */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <StatusBadge status={item.status} />
                  </div>
                  <div className="absolute top-3 right-3">
                    <PriorityBadge priority={item.priority} />
                  </div>
                </div>

                {/* Metadata & Title */}
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-2">
                    <span className="font-semibold text-indigo-400">{item.category}</span>
                    <span>•</span>
                    <span>{formatDate(item.createdAt)}</span>
                  </div>

                  <Link href={`/projects/${item.id}`}>
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-1.5 mb-2">
                      {item.title}
                      <ArrowUpRight className="w-4 h-4 text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h3>
                  </Link>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                    {item.summary}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700/50"
                    >
                      <Tag className="w-2.5 h-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>

              {/* Author & Views Footer */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 mt-auto">
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.author.avatar}
                    alt={item.author.name}
                    className="w-6 h-6 rounded-full object-cover border border-zinc-700"
                  />
                  <span className="truncate max-w-[110px] text-zinc-300">{item.author.name}</span>
                </div>

                <div className="flex items-center gap-1 text-zinc-400 font-mono text-[11px]">
                  <Eye className="w-3.5 h-3.5 text-zinc-500" />
                  {formatNumber(item.views)}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
