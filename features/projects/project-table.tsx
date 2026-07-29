import { PriorityBadge, StatusBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate, formatNumber } from '@/lib/utils';
import { Project } from '@/types/project';
import { Edit2, Eye, ExternalLink, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export function ProjectTable({ projects, onEdit, onDelete }: ProjectTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-zinc-800/80 bg-zinc-950/60 text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
            <th className="py-3.5 px-4">Proyek &amp; Judul</th>
            <th className="py-3.5 px-4">Kategori</th>
            <th className="py-3.5 px-4">Status</th>
            <th className="py-3.5 px-4">Prioritas</th>
            <th className="py-3.5 px-4">Views</th>
            <th className="py-3.5 px-4">Tanggal</th>
            <th className="py-3.5 px-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
          {projects.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-zinc-800/40 transition-colors group"
            >
              {/* Title & Cover preview */}
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-10 h-10 rounded-lg object-cover border border-zinc-800 shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <Link
                      href={`/projects/${item.id}`}
                      className="font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors flex items-center gap-1 truncate"
                    >
                      <span className="truncate">{item.title}</span>
                      <ExternalLink className="w-3 h-3 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </Link>
                    <span className="text-[11px] text-zinc-400 truncate max-w-xs">{item.summary}</span>
                  </div>
                </div>
              </td>

              {/* Category */}
              <td className="py-3 px-4">
                <span className="font-medium text-zinc-300 bg-zinc-800/80 px-2.5 py-1 rounded-md border border-zinc-700/50">
                  {item.category}
                </span>
              </td>

              {/* Status */}
              <td className="py-3 px-4">
                <StatusBadge status={item.status} />
              </td>

              {/* Priority */}
              <td className="py-3 px-4">
                <PriorityBadge priority={item.priority} />
              </td>

              {/* Views */}
              <td className="py-3 px-4 font-mono text-zinc-300">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-zinc-500" />
                  {formatNumber(item.views)}
                </span>
              </td>

              {/* Date */}
              <td className="py-3 px-4 text-zinc-400 text-[11px]">
                {formatDate(item.createdAt)}
              </td>

              {/* Actions */}
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(item)}
                    title="Edit Proyek"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-zinc-400 hover:text-white" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(item)}
                    title="Hapus Proyek"
                    className="hover:bg-rose-950/40"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
