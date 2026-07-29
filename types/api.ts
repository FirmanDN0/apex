import { ProjectCategory, ProjectPriority, ProjectStatus } from './project';

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SortParams {
  sortBy: 'createdAt' | 'updatedAt' | 'title' | 'views' | 'priority';
  sortOrder: 'asc' | 'desc';
}

export interface FilterParams {
  query?: string;
  status?: ProjectStatus | 'ALL';
  category?: ProjectCategory | 'ALL';
  priority?: ProjectPriority | 'ALL';
  featuredOnly?: boolean;
}

export interface FetchProjectsParams extends PaginationParams, SortParams, FilterParams {}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface AnalyticsSummary {
  totalProjects: number;
  publishedCount: number;
  inReviewCount: number;
  draftCount: number;
  totalViews: number;
  monthlyGrowthRate: number;
  storageUsedMB: number;
  maxStorageMB: number;
}

export interface ActivityLog {
  id: string;
  user: string;
  avatar: string;
  action: 'CREATED' | 'UPDATED' | 'DELETED' | 'STATUS_CHANGED' | 'IMAGE_UPLOADED';
  target: string;
  targetId?: string;
  timestamp: string;
}
