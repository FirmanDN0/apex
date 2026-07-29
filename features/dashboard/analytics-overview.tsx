'use client';

import { getAnalyticsSummaryAction } from '@/app/actions/project-actions';
import { Card } from '@/components/ui/card';
import { formatNumber } from '@/lib/utils';
import { AnalyticsSummary } from '@/types/api';
import { motion } from 'framer-motion';
import { CheckCircle2, Eye, FolderGit2, HardDrive, TrendingUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export function AnalyticsOverview() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalyticsSummaryAction().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 bg-zinc-900/60 border border-zinc-800 rounded-2xl" />
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Proyek',
      value: data.totalProjects,
      change: '+4 bulan ini',
      icon: FolderGit2,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-950/60 border-indigo-500/30'
    },
    {
      title: 'Sudah Dipublikasi',
      value: data.publishedCount,
      change: `${data.totalProjects > 0 ? Math.round((data.publishedCount / data.totalProjects) * 100) : 0}% dari total`,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-950/60 border-emerald-500/30'
    },
    {
      title: 'Total Views Supabase',
      value: formatNumber(data.totalViews),
      change: `+${data.monthlyGrowthRate}% bulan ini`,
      icon: Eye,
      color: 'text-purple-400',
      bgColor: 'bg-purple-950/60 border-purple-500/30'
    },
    {
      title: 'Penyimpanan Supabase',
      value: `${(data.storageUsedMB / 1024).toFixed(1)} GB`,
      change: `Maksimal ${(data.maxStorageMB / 1024).toFixed(0)} GB`,
      icon: HardDrive,
      color: 'text-amber-400',
      bgColor: 'bg-amber-950/60 border-amber-500/30'
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* 4 Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
            >
              <Card hoverEffect className="p-5 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-zinc-400">{stat.title}</span>
                  <div className={`p-2 rounded-xl border ${stat.bgColor} ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-2xl font-bold text-white mb-1 font-mono">{stat.value}</div>
                <div className="text-[11px] text-zinc-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  {stat.change}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* SVG Chart Visualization & Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity Chart Simulation */}
        <Card className="lg:col-span-2 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-white">Aktivitas Rilis Mingguan</h3>
              <p className="text-xs text-zinc-400">Grafik frekuensi pembuatan dan pembaruan rilis</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span className="text-xs font-mono text-zinc-400">Published</span>
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 ml-2" />
              <span className="text-xs font-mono text-zinc-400">Draft</span>
            </div>
          </div>

          {/* Simulated SVG Bar Chart */}
          <div className="h-44 w-full flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-zinc-800">
            {[
              { day: 'Sen', pub: 60, draft: 20 },
              { day: 'Sel', pub: 85, draft: 30 },
              { day: 'Rab', pub: 45, draft: 40 },
              { day: 'Kam', pub: 95, draft: 15 },
              { day: 'Jum', pub: 70, draft: 50 },
              { day: 'Sab', pub: 30, draft: 10 },
              { day: 'Min', pub: 40, draft: 15 }
            ].map((bar) => (
              <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="w-full flex items-end gap-1 h-full max-w-[40px]">
                  <div
                    className="w-1/2 bg-indigo-500 rounded-t-md group-hover:bg-indigo-400 transition-all"
                    style={{ height: `${bar.pub}%` }}
                  />
                  <div
                    className="w-1/2 bg-zinc-700 rounded-t-md group-hover:bg-zinc-600 transition-all"
                    style={{ height: `${bar.draft}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-zinc-400">{bar.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Status Distribution Breakdown */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-white mb-1">Distribusi Status</h3>
            <p className="text-xs text-zinc-400 mb-6">Persentase status proyek di database</p>

            <div className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-emerald-400">Published</span>
                  <span className="font-mono text-zinc-300">{data.publishedCount} proyek</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${data.totalProjects > 0 ? (data.publishedCount / data.totalProjects) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-sky-400">In Review</span>
                  <span className="font-mono text-zinc-300">{data.inReviewCount} proyek</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-sky-500 h-full rounded-full"
                    style={{ width: `${data.totalProjects > 0 ? (data.inReviewCount / data.totalProjects) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-amber-400">Draft</span>
                  <span className="font-mono text-zinc-300">{data.draftCount} proyek</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full"
                    style={{ width: `${data.totalProjects > 0 ? (data.draftCount / data.totalProjects) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
