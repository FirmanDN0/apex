'use client';

import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Select } from '@/components/ui/select';
import { ProjectFormData, projectFormSchema } from '@/lib/zod-schemas';
import { CreateProjectInput, Project, ProjectCategory, ProjectPriority, ProjectStatus, UpdateProjectInput } from '@/types/project';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Tag, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProjectInput | UpdateProjectInput) => Promise<unknown>;
  initialData?: Project | null;
  isSubmitting?: boolean;
}

export function ProjectFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting = false
}: ProjectFormModalProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: '',
      summary: '',
      description: '',
      coverImage: '',
      category: 'Engineering',
      status: 'DRAFT',
      priority: 'MEDIUM',
      tags: ['General'],
      featured: false
    }
  });

  const coverImageValue = watch('coverImage');

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        summary: initialData.summary,
        description: initialData.description,
        coverImage: initialData.coverImage,
        category: initialData.category,
        status: initialData.status,
        priority: initialData.priority,
        tags: initialData.tags,
        featured: initialData.featured
      });
      setTags(initialData.tags || []);
    } else {
      reset({
        title: '',
        summary: '',
        description: '',
        coverImage: '',
        category: 'Engineering',
        status: 'DRAFT',
        priority: 'MEDIUM',
        tags: ['Engineering'],
        featured: false
      });
      setTags(['Engineering']);
    }
  }, [initialData, reset, isOpen]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const updated = [...tags, tagInput.trim()];
      setTags(updated);
      setValue('tags', updated, { shouldValidate: true });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updated = tags.filter((t) => t !== tagToRemove);
    setTags(updated);
    setValue('tags', updated, { shouldValidate: true });
  };

  const onFormSubmit = async (data: ProjectFormData) => {
    await onSubmit(data);
    onClose();
  };

  const categoryOptions: { label: string; value: ProjectCategory }[] = [
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Design', value: 'Design' },
    { label: 'Product', value: 'Product' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'Infrastructure', value: 'Infrastructure' }
  ];

  const statusOptions: { label: string; value: ProjectStatus }[] = [
    { label: 'Draft', value: 'DRAFT' },
    { label: 'In Review', value: 'IN_REVIEW' },
    { label: 'Published', value: 'PUBLISHED' },
    { label: 'Archived', value: 'ARCHIVED' }
  ];

  const priorityOptions: { label: string; value: ProjectPriority }[] = [
    { label: 'Low', value: 'LOW' },
    { label: 'Medium', value: 'MEDIUM' },
    { label: 'High', value: 'HIGH' },
    { label: 'Urgent', value: 'URGENT' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Proyek / Rilis' : 'Buat Proyek / Rilis Baru'}
      description="Isi detail proyek di bawah ini. Data disimpan ke mock backend state."
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-5 max-h-[75vh] overflow-y-auto pr-1">
        {/* Cover Image Upload Primitive */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-300">Gambar Cover Proyek</label>
          <ImageUpload
            value={coverImageValue}
            onChange={(url) => setValue('coverImage', url, { shouldValidate: true })}
            onRemove={() => setValue('coverImage', '', { shouldValidate: true })}
          />
          {errors.coverImage && <p className="text-xs text-rose-400">{errors.coverImage.message}</p>}
        </div>

        {/* Title */}
        <Input
          label="Judul Proyek *"
          placeholder="Misal: Apex Design System Engine v3.0"
          error={errors.title?.message}
          {...register('title')}
        />

        {/* Category, Status, Priority Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            label="Kategori *"
            options={categoryOptions}
            error={errors.category?.message}
            {...register('category')}
          />
          <Select
            label="Status *"
            options={statusOptions}
            error={errors.status?.message}
            {...register('status')}
          />
          <Select
            label="Prioritas *"
            options={priorityOptions}
            error={errors.priority?.message}
            {...register('priority')}
          />
        </div>

        {/* Summary */}
        <Input
          label="Ringkasan Singkat (Summary) *"
          placeholder="Ringkasan 1-2 kalimat untuk tampilan kartu..."
          error={errors.summary?.message}
          {...register('summary')}
        />

        {/* Full Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-300">Deskripsi Lengkap *</label>
          <textarea
            rows={4}
            placeholder="Tuliskan dokumentasi, fitur utama, dan catatan rilis..."
            className="w-full bg-zinc-900/70 text-zinc-100 text-sm placeholder:text-zinc-500 rounded-xl border border-zinc-800/80 p-3.5 outline-none focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20"
            {...register('description')}
          />
          {errors.description && <p className="text-xs text-rose-400">{errors.description.message}</p>}
        </div>

        {/* Dynamic Tags Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-300">Tag &amp; Kata Kunci *</label>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Ketik tag lalu klik Tambah..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              leftIcon={<Tag className="w-4 h-4 text-zinc-500" />}
            />
            <Button type="button" variant="secondary" onClick={handleAddTag} leftIcon={<Plus className="w-4 h-4" />}>
              Tambah
            </Button>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-300 bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-500/30"
              >
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          {errors.tags && <p className="text-xs text-rose-400">{errors.tags.message}</p>}
        </div>

        {/* Featured Switch */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
          <input
            type="checkbox"
            id="featured-checkbox"
            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-zinc-900 border-zinc-700"
            {...register('featured')}
          />
          <label htmlFor="featured-checkbox" className="text-xs font-medium text-zinc-200 cursor-pointer">
            Tampilkan di Sorotan Utama (Featured Release)
          </label>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Batal
          </Button>
          <Button type="submit" variant="glow" isLoading={isSubmitting}>
            {isEditing ? 'Simpan Perubahan' : 'Buat Proyek'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
