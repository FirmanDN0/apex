export type ProjectStatus = 'DRAFT' | 'IN_REVIEW' | 'PUBLISHED' | 'ARCHIVED';

export type ProjectCategory = 'Engineering' | 'Design' | 'Product' | 'Marketing' | 'Infrastructure';

export type ProjectPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface ProjectAuthor {
  name: string;
  avatar: string;
  role: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  coverImage: string;
  category: ProjectCategory;
  status: ProjectStatus;
  priority: ProjectPriority;
  tags: string[];
  views: number;
  featured: boolean;
  author: ProjectAuthor;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectInput {
  title: string;
  summary: string;
  description: string;
  coverImage?: string;
  category: ProjectCategory;
  status: ProjectStatus;
  priority: ProjectPriority;
  tags: string[];
  featured?: boolean;
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {}
