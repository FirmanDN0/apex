import { PriorityBadge, StatusBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate, formatNumber } from '@/lib/utils';
import { Project } from '@/types/project';
import { Edit2, Eye, ExternalLink, Tag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <Card hoverEffect glow className="h-full flex flex-col justify-between group">
      <CardContent className="flex flex-col gap-4 p-0">
        {/* Cover Image Header */}
        <div className="relative w-full h-44 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <StatusBadge status={project.status} />
          </div>
          <div className="absolute top-3 right-3">
            <PriorityBadge priority={project.priority} />
          </div>
        </div>

        {/* Content Body */}
        <div>
          <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-1.5">
            <span className="font-semibold text-indigo-400">{project.category}</span>
            <span>•</span>
            <span>{formatDate(project.createdAt)}</span>
          </div>

          <Link href={`/projects/${project.id}`}>
            <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1 mb-1.5 flex items-center gap-1.5">
              {project.title}
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </h3>
          </Link>

          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
            {project.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700/50"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </CardContent>

      {/* Footer Actions */}
      <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Eye className="w-3.5 h-3.5 text-zinc-500" />
          <span className="font-mono text-[11px]">{formatNumber(project.views)}</span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(project)}
            leftIcon={<Edit2 className="w-3.5 h-3.5 text-zinc-400" />}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(project)}
            className="text-rose-400 hover:text-rose-300 hover:bg-rose-950/40"
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Hapus
          </Button>
        </div>
      </div>
    </Card>
  );
}
