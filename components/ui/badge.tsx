import { cn } from '@/lib/utils';
import { ProjectPriority, ProjectStatus } from '@/types/project';
import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'info' | 'danger' | 'purple';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'default', size = 'md', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-zinc-800/90 text-zinc-300 border-zinc-700/50',
    outline: 'bg-transparent text-zinc-400 border-zinc-700/80',
    success: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
    warning: 'bg-amber-950/60 text-amber-300 border-amber-500/30',
    info: 'bg-sky-950/60 text-sky-300 border-sky-500/30',
    danger: 'bg-rose-950/60 text-rose-300 border-rose-500/30',
    purple: 'bg-purple-950/60 text-purple-300 border-purple-500/30'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase',
    md: 'px-2.5 py-1 text-xs font-medium'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border backdrop-blur-sm transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const statusMap: Record<ProjectStatus, { label: string; variant: BadgeProps['variant']; dot: string }> = {
    PUBLISHED: { label: 'Published', variant: 'success', dot: 'bg-emerald-400' },
    IN_REVIEW: { label: 'In Review', variant: 'info', dot: 'bg-sky-400' },
    DRAFT: { label: 'Draft', variant: 'warning', dot: 'bg-amber-400' },
    ARCHIVED: { label: 'Archived', variant: 'default', dot: 'bg-zinc-500' }
  };

  const config = statusMap[status] || statusMap.DRAFT;

  return (
    <Badge variant={config.variant} size="sm">
      <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', config.dot)} />
      {config.label}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: ProjectPriority }) {
  const priorityMap: Record<ProjectPriority, { label: string; variant: BadgeProps['variant'] }> = {
    URGENT: { label: 'Urgent', variant: 'danger' },
    HIGH: { label: 'High', variant: 'warning' },
    MEDIUM: { label: 'Medium', variant: 'info' },
    LOW: { label: 'Low', variant: 'default' }
  };

  const config = priorityMap[priority] || priorityMap.LOW;

  return <Badge variant={config.variant} size="sm">{config.label}</Badge>;
}
