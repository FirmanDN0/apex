'use client';

import { PriorityBadge, StatusBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DeleteConfirmModal } from '@/features/projects/delete-confirm-modal';
import { ProjectFormModal } from '@/features/projects/project-form-modal';
import { useProjects } from '@/hooks/use-projects';
import { mockApi } from '@/lib/mock-api';
import { formatDate, formatNumber } from '@/lib/utils';
import { Project, ProjectStatus } from '@/types/project';
import { ArrowLeft, Calendar, Edit2, Eye, ExternalLink, Sparkles, Tag, Trash2, User } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { updateProject, deleteProject, isSubmitting } = useProjects();

  useEffect(() => {
    mockApi.getProjectById(id).then((res) => {
      setProject(res);
      setLoading(false);
    });
  }, [id]);

  const handleStatusChange = async (newStatus: ProjectStatus) => {
    if (!project) return;
    const updated = await updateProject(project.id, { status: newStatus });
    if (updated) setProject(updated);
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6 max-w-4xl mx-auto py-8">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-64 w-full rounded-2xl" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center my-12">
        <h2 className="text-xl font-bold text-white mb-2">Proyek Tidak Ditemukan</h2>
        <p className="text-xs text-zinc-400 mb-6">Proyek dengan ID &quot;{id}&quot; tidak ditemukan di mock database.</p>
        <Link href="/projects">
          <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Kembali ke Daftar Proyek
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto pb-12">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Workspace Proyek
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditOpen(true)}
            leftIcon={<Edit2 className="w-3.5 h-3.5" />}
          >
            Edit Proyek
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setIsDeleteOpen(true)}
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Hapus
          </Button>
        </div>
      </div>

      {/* Cover Image Banner */}
      <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <StatusBadge status={project.status} />
              <PriorityBadge priority={project.priority} />
              <span className="px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                {project.category}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Quick Status Control Switcher */}
      <Card className="p-4 bg-zinc-900/60 border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold text-zinc-200">Ubah Status Proyek Instan:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {(['DRAFT', 'IN_REVIEW', 'PUBLISHED', 'ARCHIVED'] as ProjectStatus[]).map((st) => (
            <button
              key={st}
              onClick={() => handleStatusChange(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                project.status === st
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/80'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </Card>

      {/* Metadata Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 text-xs text-zinc-400">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.author.avatar}
            alt={project.author.name}
            className="w-8 h-8 rounded-full object-cover border border-zinc-700"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-zinc-200 truncate">{project.author.name}</span>
            <span className="text-[10px] text-zinc-500">{project.author.role}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-zinc-500 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500">Dibuat</span>
            <span className="font-medium text-zinc-300">{formatDate(project.createdAt)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-zinc-500 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500">Total Views</span>
            <span className="font-mono font-medium text-zinc-300">{formatNumber(project.views)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-zinc-500 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500">Jumlah Tag</span>
            <span className="font-mono font-medium text-zinc-300">{project.tags.length} Tag</span>
          </div>
        </div>
      </div>

      {/* Main Description */}
      <Card className="p-8">
        <h3 className="text-lg font-bold text-white mb-4">Ringkasan &amp; Detail Operasional</h3>
        <p className="text-sm font-medium text-zinc-300 mb-6 leading-relaxed bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
          {project.summary}
        </p>

        <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-3">Dokumentasi Rilis Lengkap</h4>
        <div className="text-xs text-zinc-300 whitespace-pre-line leading-relaxed">
          {project.description}
        </div>

        {/* Tags */}
        <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-wrap items-center gap-2">
          <span className="text-xs text-zinc-500 font-medium">Tag Terkait:</span>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-indigo-300 bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-500/30"
            >
              #{tag}
            </span>
          ))}
        </div>
      </Card>

      {/* Edit Modal */}
      <ProjectFormModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={project}
        onSubmit={async (data) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const updated = await updateProject(project.id, data as any);
          if (updated) setProject(updated);
        }}
        isSubmitting={isSubmitting}
      />

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        project={project}
        onConfirm={async () => {
          await deleteProject(project.id);
          router.push('/projects');
        }}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
