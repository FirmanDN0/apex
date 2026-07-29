import { ActivityFeed } from '@/features/dashboard/activity-feed';
import { AnalyticsOverview } from '@/features/dashboard/analytics-overview';
import { Layers, Sparkles } from 'lucide-react';
import React from 'react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Workspace Analytics Overview
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ringkasan Performa &amp; Metrik
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Pantau status rilis proyek, visualisasi lalu lintas mock, dan audit log secara real-time.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Mock API Active
          </span>
        </div>
      </div>

      {/* Analytics Metric Cards & Charts */}
      <AnalyticsOverview />

      {/* Activity Feed */}
      <ActivityFeed />
    </div>
  );
}
