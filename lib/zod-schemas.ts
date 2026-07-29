import { z } from 'zod';

export const projectCategorySchema = z.enum([
  'Engineering',
  'Design',
  'Product',
  'Marketing',
  'Infrastructure'
]);

export const projectStatusSchema = z.enum([
  'DRAFT',
  'IN_REVIEW',
  'PUBLISHED',
  'ARCHIVED'
]);

export const projectPrioritySchema = z.enum([
  'LOW',
  'MEDIUM',
  'HIGH',
  'URGENT'
]);

export const projectFormSchema = z.object({
  title: z
    .string()
    .min(3, 'Judul minimal 3 karakter')
    .max(100, 'Judul maksimal 100 karakter'),
  summary: z
    .string()
    .min(10, 'Ringkasan singkat minimal 10 karakter')
    .max(200, 'Ringkasan maksimal 200 karakter'),
  description: z
    .string()
    .min(20, 'Deskripsi lengkap minimal 20 karakter'),
  coverImage: z
    .string()
    .url('Format URL gambar tidak valid')
    .or(z.string().length(0))
    .optional(),
  category: projectCategorySchema,
  status: projectStatusSchema,
  priority: projectPrioritySchema,
  tags: z
    .array(z.string())
    .min(1, 'Pilih atau masukkan setidaknya 1 tag'),
  featured: z.boolean().default(false)
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;

export const imageUploadValidationSchema = z.object({
  fileSize: z.number().max(5 * 1024 * 1024, 'Ukuran file maksimal adalah 5MB'),
  fileType: z.enum(
    ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
    { message: 'Format file harus berupa JPG, PNG, WEBP, atau SVG' }
  )
});
