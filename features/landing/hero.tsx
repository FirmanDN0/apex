'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Code, Cpu, Sparkles, Terminal } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export function LandingHero() {
  return (
    <section className="relative pt-32 pb-20 px-6 sm:px-12 overflow-hidden flex flex-col items-center text-center">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Pill Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-indigo-500/30 text-xs font-medium text-indigo-300 shadow-xl shadow-indigo-500/10 mb-8 backdrop-blur-md"
      >
        <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
        <span>Apex Studio v1.0 • Modern Product &amp; Release Engine</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-6"
      >
        Kelola Rilis &amp; Proyek Produk Dengan{' '}
        <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">
          Presisi Linear-Grade
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-sm sm:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-10"
      >
        Aplikasi fullstack berarsitektur modular yang siap dihubungkan langsung ke Supabase &amp; PostgreSQL. Dilengkapi CRUD lengkap, pencarian, validasi Zod, dan Image Uploader modern.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-4 mb-16"
      >
        <Link href="/dashboard">
          <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
            Jelajahi Dashboard CRUD
          </Button>
        </Link>
        <Link href="/upload-demo">
          <Button variant="outline" size="lg" leftIcon={<Terminal className="w-5 h-5 text-indigo-400" />}>
            Uji Coba Image Uploader
          </Button>
        </Link>
      </motion.div>

      {/* Interactive Mock Product Frame */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="w-full max-w-5xl rounded-2xl bg-zinc-900/90 border border-zinc-800 p-3 shadow-2xl shadow-black/80 backdrop-blur-xl relative overflow-hidden"
      >
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800/80 mb-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono text-[11px] text-zinc-400 bg-zinc-950 px-3 py-1 rounded-md border border-zinc-800">
            https://apex-studio.internal/workspace/overview
          </span>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
            <CheckCircle className="w-3.5 h-3.5" /> Ready for Supabase
          </div>
        </div>

        {/* Inner Content Preview Mock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 text-left">
          <div className="rounded-xl bg-zinc-950/70 border border-zinc-800/80 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-400">Total Release</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                +18.4%
              </span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">24 Proyek</div>
            <p className="text-[11px] text-zinc-400">14 Dipublikasikan, 6 In Review</p>
          </div>

          <div className="rounded-xl bg-zinc-950/70 border border-zinc-800/80 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-400">Monthly Traffic</span>
              <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30">
                Live Mock
              </span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">48.9K Views</div>
            <p className="text-[11px] text-zinc-400">Diperbarui 350ms async delay</p>
          </div>

          <div className="rounded-xl bg-zinc-950/70 border border-zinc-800/80 p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-400">Status Validasi</span>
              <Cpu className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-purple-950/60 text-purple-300 text-xs font-mono border border-purple-500/30">
                Zod Validated
              </span>
              <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 text-xs font-mono">
                RHF Form
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
