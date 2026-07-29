'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export function CTASection() {
  return (
    <section className="py-20 px-6 sm:px-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-950/80 via-zinc-900 to-purple-950/80 border border-indigo-500/30 p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl shadow-indigo-500/10"
      >
        {/* Glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="p-3 rounded-2xl bg-indigo-900/40 border border-indigo-500/30 text-indigo-300 mb-6">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl leading-tight mb-4">
            Siap Untuk Menghubungkan Backend Anda Sendiri?
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed mb-8">
            Struktur kode teratur, tipe TypeScript komprehensif, dan mock API service asynchronous memudahkan penggantian fungsi ke PostgreSQL &amp; Supabase Client secara instan.
          </p>

          <Link href="/dashboard">
            <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
              Buka Workspace Sekarang
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
