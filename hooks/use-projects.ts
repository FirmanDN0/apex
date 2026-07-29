'use client';

import { useToast } from '@/components/ui/toast';
import { mockApi } from '@/lib/mock-api';
import { FetchProjectsParams, PaginatedResult } from '@/types/api';
import { CreateProjectInput, Project, ProjectCategory, ProjectPriority, ProjectStatus, UpdateProjectInput } from '@/types/project';
import { useCallback, useEffect, useState } from 'react';

export function useProjects(initialParams?: Partial<FetchProjectsParams>) {
  const { toast } = useToast();

  // Filter & pagination states
  const [params, setParams] = useState<FetchProjectsParams>({
    page: 1,
    limit: 6,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    query: '',
    status: 'ALL',
    category: 'ALL',
    priority: 'ALL',
    ...initialParams
  });

  // Data states
  const [result, setResult] = useState<PaginatedResult<Project>>({
    data: [],
    total: 0,
    page: 1,
    limit: 6,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Active item for details or editing
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await mockApi.getProjects(params);
      setResult(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal memuat data proyek.';
      setError(msg);
      toast.error('Error', msg);
    } finally {
      setIsLoading(false);
    }
  }, [params.page, params.limit, params.query, params.status, params.category, params.priority, params.sortBy, params.sortOrder, toast]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Memoized Handlers for state updates
  const setPage = useCallback((page: number) => {
    setParams((prev) => (prev.page === page ? prev : { ...prev, page }));
  }, []);

  const setQuery = useCallback((query: string) => {
    setParams((prev) => (prev.query === query ? prev : { ...prev, query, page: 1 }));
  }, []);

  const setStatusFilter = useCallback((status: ProjectStatus | 'ALL') => {
    setParams((prev) => (prev.status === status ? prev : { ...prev, status, page: 1 }));
  }, []);

  const setCategoryFilter = useCallback((category: ProjectCategory | 'ALL') => {
    setParams((prev) => (prev.category === category ? prev : { ...prev, category, page: 1 }));
  }, []);

  const setPriorityFilter = useCallback((priority: ProjectPriority | 'ALL') => {
    setParams((prev) => (prev.priority === priority ? prev : { ...prev, priority, page: 1 }));
  }, []);

  const setSort = useCallback((sortBy: FetchProjectsParams['sortBy'], sortOrder: 'asc' | 'desc') => {
    setParams((prev) => (prev.sortBy === sortBy && prev.sortOrder === sortOrder ? prev : { ...prev, sortBy, sortOrder }));
  }, []);

  // CRUD Mutations
  const createProject = async (input: CreateProjectInput): Promise<Project | null> => {
    setIsSubmitting(true);
    try {
      const created = await mockApi.createProject(input);
      toast.success('Berhasil Dibuat', `Proyek "${created.title}" telah dipublikasikan/disimpan.`);
      await fetchProjects();
      return created;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal membuat proyek baru.';
      toast.error('Gagal Membuat Proyek', msg);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateProject = async (id: string, input: UpdateProjectInput): Promise<Project | null> => {
    setIsSubmitting(true);
    try {
      const updated = await mockApi.updateProject(id, input);
      toast.success('Berhasil Memperbarui', `Proyek "${updated.title}" berhasil diperbarui.`);
      await fetchProjects();
      if (selectedProject?.id === id) {
        setSelectedProject(updated);
      }
      return updated;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal memperbarui proyek.';
      toast.error('Gagal Memperbarui', msg);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      await mockApi.deleteProject(id);
      toast.success('Berhasil Dihapus', 'Proyek telah dihapus dari sistem mock.');
      await fetchProjects();
      if (selectedProject?.id === id) {
        setSelectedProject(null);
      }
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal menghapus proyek.';
      toast.error('Gagal Menghapus', msg);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    projects: result.data,
    total: result.total,
    page: result.page,
    totalPages: result.totalPages,
    hasNextPage: result.hasNextPage,
    hasPrevPage: result.hasPrevPage,
    limit: result.limit,
    params,
    isLoading,
    isSubmitting,
    error,
    selectedProject,
    setSelectedProject,
    fetchProjects,
    setPage,
    setQuery,
    setStatusFilter,
    setCategoryFilter,
    setPriorityFilter,
    setSort,
    createProject,
    updateProject,
    deleteProject
  };
}
