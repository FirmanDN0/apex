import { ActivityLog, AnalyticsSummary } from '@/types/api';

export const INITIAL_ANALYTICS: AnalyticsSummary = {
  totalProjects: 24,
  publishedCount: 14,
  inReviewCount: 6,
  draftCount: 4,
  totalViews: 48920,
  monthlyGrowthRate: 18.4,
  storageUsedMB: 1240,
  maxStorageMB: 5000
};

export const INITIAL_ACTIVITIES: ActivityLog[] = [
  {
    id: 'act_01',
    user: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    action: 'CREATED',
    target: 'Apex Design System v3.0 Engine',
    targetId: 'prj_01h8x1',
    timestamp: '10 mins ago'
  },
  {
    id: 'act_02',
    user: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    action: 'STATUS_CHANGED',
    target: 'AI Command Palette & Copilot Action System',
    targetId: 'prj_03h8x3',
    timestamp: '42 mins ago'
  },
  {
    id: 'act_03',
    user: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    action: 'IMAGE_UPLOADED',
    target: 'Distributed Event Streaming Architecture Diagram',
    targetId: 'prj_02h8x2',
    timestamp: '2 hours ago'
  },
  {
    id: 'act_04',
    user: 'Devon Vance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    action: 'UPDATED',
    target: 'Zero-Trust Security & Audit Telemetry Dashboard',
    targetId: 'prj_04h8x4',
    timestamp: '5 hours ago'
  }
];
