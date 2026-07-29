'use client';

import { Modal } from './modal';
import { Project } from '@/types/project';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export function CommandPalette({
  isOpen,
  onClose,
  projects
}: {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
}) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state trigger
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = query.trim()
    ? projects.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : projects.slice(0, 4);

  const handleSelect = (id: string) => {
    router.push(`/projects/${id}`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl">
      <div className="flex flex-col gap-4">
        <div className="relative flex items-center border-b border-zinc-800 pb-3">
          <Search className="w-5 h-5 text-zinc-400 absolute left-2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari proyek, tag, atau rilis... (misal: Design System, Rust)"
            className="w-full bg-transparent text-sm font-medium text-zinc-100 placeholder:text-zinc-500 pl-10 pr-4 outline-none"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-800 rounded border border-zinc-700">
            ESC
          </kbd>
        </div>

        <div className="flex flex-col gap-1 max-h-80 overflow-y-auto pr-1">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 px-2 py-1 flex items-center justify-between">
            <span>{query ? 'Hasil Pencarian' : 'Rekomendasi Cepat'}</span>
            <span className="flex items-center gap-1 text-indigo-400">
              <Sparkles className="w-3 h-3" /> Quick Navigation
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-500">
              Tidak ada hasil yang cocok dengan &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800/80 text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
                    {item.category[0]}
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-zinc-200 group-hover:text-white">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-zinc-400 line-clamp-1">{item.summary}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
}
