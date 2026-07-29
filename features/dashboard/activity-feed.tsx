'use client';

import { getRecentActivitiesAction } from '@/app/actions/project-actions';
import { Card } from '@/components/ui/card';
import { ActivityLog } from '@/types/api';
import { Activity, Clock, FilePlus, Image as ImageIcon, RefreshCw, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecentActivitiesAction().then((res) => {
      setActivities(res);
      setLoading(false);
    });
  }, []);

  const actionIcons: Record<ActivityLog['action'], React.ReactNode> = {
    CREATED: <FilePlus className="w-4 h-4 text-emerald-400" />,
    UPDATED: <RefreshCw className="w-4 h-4 text-sky-400" />,
    DELETED: <Trash2 className="w-4 h-4 text-rose-400" />,
    STATUS_CHANGED: <Activity className="w-4 h-4 text-amber-400" />,
    IMAGE_UPLOADED: <ImageIcon className="w-4 h-4 text-purple-400" />
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-white">Aktivitas Terbaru</h3>
          <p className="text-xs text-zinc-400">Log perubahan proyek &amp; rilis di database Supabase</p>
        </div>
        <span className="text-[11px] font-mono text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded-lg border border-zinc-700">
          Live Audit Stream
        </span>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-12 bg-zinc-800/40 rounded-xl" />
          ))}
        </div>
      ) : activities.length === 0 ? (
        <p className="text-xs text-zinc-500 py-4 text-center">Belum ada aktivitas tercatat.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {activities.map((act) => (
            <div
              key={act.id}
              className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/60 hover:border-zinc-700/80 transition-colors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={act.avatar}
                alt={act.user}
                className="w-8 h-8 rounded-full object-cover border border-zinc-700 shrink-0 mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-zinc-200">{act.user}</span>
                  <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-500" />
                    {act.timestamp}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5 truncate">
                  <span className="font-mono text-[11px] font-semibold text-zinc-300 mr-1.5">
                    [{act.action}]
                  </span>
                  {act.target}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
