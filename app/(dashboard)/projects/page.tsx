'use client';

import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import { Select } from '@/components/ui/select';
import { CardSkeleton, TableRowSkeleton } from '@/components/ui/skeleton';
import { DeleteConfirmModal } from '@/features/projects/delete-confirm-modal';
import { ProjectCard } from '@/features/projects/project-card';
import { ProjectFormModal } from '@/features/projects/project-form-modal';
import { ProjectTable } from '@/features/projects/project-table';
import { useDebounce } from '@/hooks/use-debounce';
import { useProjects } from '@/hooks/use-projects';
import { ViewMode } from '@/types/common';
import { Project, ProjectCategory, ProjectPriority, ProjectStatus } from '@/types/project';
import { Filter, LayoutGrid, List, Plus, RotateCcw, Search, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchInputValue, setSearchInputValue] = useState('');

  // Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetProject, setTargetProject] = useState<Project | null>(null);

  const debouncedSearch = useDebounce(searchInputValue, 300);

  const {
    projects,
    total,
    page,
    totalPages,
    limit,
    params,
    isLoading,
    isSubmitting,
    setPage,
    setQuery,
    setStatusFilter,
    setCategoryFilter,
    setPriorityFilter,
    setSort,
    createProject,
    updateProject,
    deleteProject
  } = useProjects();

  useEffect(() => {
    setQuery(debouncedSearch);
  }, [debouncedSearch, setQuery]);

  const handleOpenCreate = () => {
    setTargetProject(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setTargetProject(project);
    setIsFormModalOpen(true);
  };

  const handleOpenDelete = (project: Project) => {
    setTargetProject(project);
    setIsDeleteModalOpen(true);
  };

  const handleResetFilters = () => {
    setSearchInputValue('');
    setQuery('');
    setStatusFilter('ALL');
    setCategoryFilter('ALL');
    setPriorityFilter('ALL');
    setSort('createdAt', 'desc');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Title & Top Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Full CRUD Workspace
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Manajemen Proyek &amp; Rilis
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Kelola, cari, saring, dan perbarui data proyek menggunakan mock API service.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="glow"
            onClick={handleOpenCreate}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Buat Proyek Baru
          </Button>
        </div>
      </div>

      {/* Filter & Toolbar */}
      <div className="flex flex-col gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <Input
              placeholder="Cari berdasarkan judul, summary, atau tag..."
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-zinc-500" />}
            />
          </div>

          {/* Status Filter */}
          <Select
            options={[
              { label: 'Semua Status', value: 'ALL' },
              { label: 'Published', value: 'PUBLISHED' },
              { label: 'In Review', value: 'IN_REVIEW' },
              { label: 'Draft', value: 'DRAFT' },
              { label: 'Archived', value: 'ARCHIVED' }
            ]}
            value={params.status}
            onChange={(e) => setStatusFilter(e.target.value as ProjectStatus | 'ALL')}
          />

          {/* Category Filter */}
          <Select
            options={[
              { label: 'Semua Kategori', value: 'ALL' },
              { label: 'Engineering', value: 'Engineering' },
              { label: 'Design', value: 'Design' },
              { label: 'Product', value: 'Product' },
              { label: 'Marketing', value: 'Marketing' },
              { label: 'Infrastructure', value: 'Infrastructure' }
            ]}
            value={params.category}
            onChange={(e) => setCategoryFilter(e.target.value as ProjectCategory | 'ALL')}
          />

          {/* Sort Selector */}
          <Select
            options={[
              { label: 'Terbaru', value: 'createdAt-desc' },
              { label: 'Terlama', value: 'createdAt-asc' },
              { label: 'Views Terbanyak', value: 'views-desc' },
              { label: 'Judul (A-Z)', value: 'title-asc' }
            ]}
            value={`${params.sortBy}-${params.sortOrder}`}
            onChange={(e) => {
              const [by, order] = e.target.value.split('-');
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setSort(by as any, order as 'asc' | 'desc');
            }}
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-xs">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              leftIcon={<RotateCcw className="w-3.5 h-3.5 text-zinc-400" />}
            >
              Reset Filter
            </Button>
            <span className="text-zinc-500 font-mono">Total: {total} data</span>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Tampilan Grid Card"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Tampilan Tabel"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Rendering */}
      {isLoading ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: limit }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-2">
            {Array.from({ length: limit }).map((_, i) => (
              <TableRowSkeleton key={i} />
            ))}
          </div>
        )
      ) : projects.length === 0 ? (
        <EmptyState
          title="Tidak Ada Proyek Ditemukan"
          description="Tidak ada data proyek yang sesuai dengan kueri pencarian atau filter yang dipilih."
          actionLabel="Buat Proyek Baru"
          onAction={handleOpenCreate}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          ))}
        </div>
      ) : (
        <ProjectTable
          projects={projects}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      )}

      {/* Pagination */}
      {!isLoading && projects.length > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          totalItems={total}
          limit={limit}
          onPageChange={setPage}
        />
      )}

      {/* Create & Edit Modal */}
      <ProjectFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        initialData={targetProject}
        onSubmit={async (data) => {
          if (targetProject) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await updateProject(targetProject.id, data as any);
          } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await createProject(data as any);
          }
        }}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        project={targetProject}
        onConfirm={async () => {
          if (targetProject) {
            await deleteProject(targetProject.id);
          }
        }}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
