import { Layers, ShieldCheck, Terminal, Zap } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 text-zinc-400 py-16 px-6 sm:px-12 relative overflow-hidden">
      {/* Glow background accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand info */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 p-0.5">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <Layers className="w-4 h-4 text-indigo-400" />
              </div>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">Apex Studio</span>
          </div>
          <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
            Platform Product Ops dan Manajemen Rilis berstandar tinggi. Didesain khusus dengan antarmuka Linear-grade tanpa dependensi layanan eksternal.
          </p>
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-indigo-400" /> 100% Mock Ready</span>
            <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-emerald-400" /> TypeScript Native</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Zero Config</span>
          </div>
        </div>

        {/* Quick Nav */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">Navigasi</h4>
          <Link href="/dashboard" className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors">
            Overview Dashboard
          </Link>
          <Link href="/projects" className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors">
            Proyek CRUD
          </Link>
          <Link href="/upload-demo" className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors">
            Image Upload Demo
          </Link>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">Tech Stack</h4>
          <span className="text-xs text-zinc-400">Next.js App Router (16+)</span>
          <span className="text-xs text-zinc-400">Tailwind CSS (v4)</span>
          <span className="text-xs text-zinc-400">Framer Motion & Lucide</span>
          <span className="text-xs text-zinc-400">Zod & React Hook Form</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <p>© 2026 Apex Studio. Dibuat dengan presisi tinggi untuk alur integrasi PostgreSQL & Supabase mandiri.</p>
        <div className="flex items-center gap-4">
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
            v1.0.0-mock
          </span>
        </div>
      </div>
    </footer>
  );
}
