'use client';

import { motion } from 'framer-motion';
import { Activity, Clock, Database, Shield } from 'lucide-react';
import React from 'react';

export function StatsSection() {
  const stats = [
    {
      icon: Activity,
      value: '48.9K',
      label: 'Total Views Mock',
      description: 'Responsivitas statistik real-time berbasis state lokal.'
    },
    {
      icon: Database,
      value: '100%',
      label: 'Zero External DB',
      description: 'Tersimulasi via localStorage & async mock service.'
    },
    {
      icon: Clock,
      value: '350ms',
      label: 'Simulasi Network Latency',
      description: 'Menyerupai respon API Supabase/PostgreSQL asli.'
    },
    {
      icon: Shield,
      value: '100%',
      label: 'Type-Safe Architecture',
      description: 'TypeScript strict mode & Zod schema validation.'
    }
  ];

  return (
    <section id="stats" className="py-20 px-6 sm:px-12 bg-zinc-950 border-y border-zinc-800/60">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
            Dioptimalkan Untuk Pengalaman Pengembang Maksimal
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Seluruh data dan state dapat langsung dipraktikkan tanpa perlu mengatur database PostgreSQL atau environment variable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 flex flex-col items-start hover:border-zinc-700 transition-colors"
              >
                <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-3xl font-extrabold text-white mb-1 font-mono">{stat.value}</div>
                <h4 className="text-sm font-semibold text-zinc-200 mb-1">{stat.label}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
