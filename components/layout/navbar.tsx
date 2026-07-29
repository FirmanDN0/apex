'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 px-6 sm:px-12 py-4 flex items-center justify-between">
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
            <Layers className="w-5 h-5 text-indigo-400" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
            Apex Studio
          </span>
          <span className="text-[10px] text-zinc-400 font-mono">Precision Product Ops</span>
        </div>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-400">
        <Link href="#features" className="hover:text-zinc-100 transition-colors">
          Fitur Utama
        </Link>
        <Link href="#showcase" className="hover:text-zinc-100 transition-colors">
          Showcase Rilis
        </Link>
        <Link href="#stats" className="hover:text-zinc-100 transition-colors">
          Metrik Live
        </Link>
      </div>

      {/* Action CTA */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <Button
            variant="glow"
            size="sm"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Buka Dashboard
          </Button>
        </Link>
      </div>
    </nav>
  );
}
