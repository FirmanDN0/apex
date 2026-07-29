import { prisma } from './prisma';
import { slugify } from './utils';
import { ActivityLog, AnalyticsSummary, FetchProjectsParams, PaginatedResult } from '@/types/api';
import { CreateProjectInput, Project, ProjectCategory, ProjectPriority, ProjectStatus, UpdateProjectInput } from '@/types/project';

export const postgresApi = {
  getProjects: async (params: FetchProjectsParams): Promise<PaginatedResult<Project>> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    // 1. Search Query
    if (params.query && params.query.trim() !== '') {
      const q = params.query.trim();
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { summary: { contains: q, mode: 'insensitive' } },
        { tags: { has: q } }
      ];
    }

    // 2. Status Filter
    if (params.status && params.status !== 'ALL') {
      where.status = params.status;
    }

    // 3. Category Filter
    if (params.category && params.category !== 'ALL') {
      where.category = params.category;
    }

    // 4. Priority Filter
    if (params.priority && params.priority !== 'ALL') {
      where.priority = params.priority;
    }

    // 5. Featured Filter
    if (params.featuredOnly) {
      where.featured = true;
    }

    // Pagination & Sorting
    const page = params.page || 1;
    const limit = params.limit || 6;
    const skip = (page - 1) * limit;
    const sortBy = params.sortBy || 'createdAt';
    const sortOrder = params.sortOrder || 'desc';

    const [rawItems, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder }
      }),
      prisma.project.count({ where })
    ]);

    const formattedProjects: Project[] = rawItems.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      summary: item.summary,
      description: item.description,
      coverImage: item.coverImage,
      category: item.category as ProjectCategory,
      status: item.status as ProjectStatus,
      priority: item.priority as ProjectPriority,
      tags: item.tags,
      views: item.views,
      featured: item.featured,
      author: {
        name: item.authorName,
        avatar: item.authorAvatar,
        role: item.authorRole
      },
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString()
    }));

    const totalPages = Math.ceil(total / limit) || 1;

    return {
      data: formattedProjects,
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };
  },

  getProjectById: async (id: string): Promise<Project | null> => {
    const item = await prisma.project.findUnique({ where: { id } });
    if (!item) return null;

    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      summary: item.summary,
      description: item.description,
      coverImage: item.coverImage,
      category: item.category as ProjectCategory,
      status: item.status as ProjectStatus,
      priority: item.priority as ProjectPriority,
      tags: item.tags,
      views: item.views,
      featured: item.featured,
      author: {
        name: item.authorName,
        avatar: item.authorAvatar,
        role: item.authorRole
      },
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString()
    };
  },

  createProject: async (input: CreateProjectInput): Promise<Project> => {
    const slug = slugify(input.title);

    const created = await prisma.project.create({
      data: {
        title: input.title,
        slug,
        summary: input.summary,
        description: input.description,
        coverImage: input.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
        category: input.category,
        status: input.status,
        priority: input.priority,
        tags: input.tags,
        featured: input.featured ?? false
      }
    });

    // Record Activity
    await prisma.activity.create({
      data: {
        userName: 'You',
        userAvatar: created.authorAvatar,
        action: 'CREATED',
        target: created.title,
        targetId: created.id
      }
    });

    return {
      id: created.id,
      title: created.title,
      slug: created.slug,
      summary: created.summary,
      description: created.description,
      coverImage: created.coverImage,
      category: created.category as ProjectCategory,
      status: created.status as ProjectStatus,
      priority: created.priority as ProjectPriority,
      tags: created.tags,
      views: created.views,
      featured: created.featured,
      author: {
        name: created.authorName,
        avatar: created.authorAvatar,
        role: created.authorRole
      },
      createdAt: created.createdAt.toISOString(),
      updatedAt: created.updatedAt.toISOString()
    };
  },

  updateProject: async (id: string, input: UpdateProjectInput): Promise<Project> => {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) throw new Error(`Project with ID ${id} not found.`);

    const updated = await prisma.project.update({
      where: { id },
      data: {
        ...input,
        slug: input.title ? slugify(input.title) : undefined
      }
    });

    await prisma.activity.create({
      data: {
        userName: 'You',
        userAvatar: updated.authorAvatar,
        action: input.status && input.status !== existing.status ? 'STATUS_CHANGED' : 'UPDATED',
        target: updated.title,
        targetId: updated.id
      }
    });

    return {
      id: updated.id,
      title: updated.title,
      slug: updated.slug,
      summary: updated.summary,
      description: updated.description,
      coverImage: updated.coverImage,
      category: updated.category as ProjectCategory,
      status: updated.status as ProjectStatus,
      priority: updated.priority as ProjectPriority,
      tags: updated.tags,
      views: updated.views,
      featured: updated.featured,
      author: {
        name: updated.authorName,
        avatar: updated.authorAvatar,
        role: updated.authorRole
      },
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString()
    };
  },

  deleteProject: async (id: string): Promise<boolean> => {
    const target = await prisma.project.findUnique({ where: { id } });
    await prisma.project.delete({ where: { id } });

    if (target) {
      await prisma.activity.create({
        data: {
          userName: 'You',
          userAvatar: target.authorAvatar,
          action: 'DELETED',
          target: target.title
        }
      });
    }

    return true;
  },

  getAnalyticsSummary: async (): Promise<AnalyticsSummary> => {
    const [totalProjects, publishedCount, inReviewCount, draftCount, viewsAggregate] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: 'PUBLISHED' } }),
      prisma.project.count({ where: { status: 'IN_REVIEW' } }),
      prisma.project.count({ where: { status: 'DRAFT' } }),
      prisma.project.aggregate({ _sum: { views: true } })
    ]);

    return {
      totalProjects,
      publishedCount,
      inReviewCount,
      draftCount,
      totalViews: viewsAggregate._sum.views || 0,
      monthlyGrowthRate: 18.4,
      storageUsedMB: 1240,
      maxStorageMB: 5000
    };
  },

  getRecentActivities: async (): Promise<ActivityLog[]> => {
    const items = await prisma.activity.findMany({
      orderBy: { createdAt: 'desc' },
      take: 15
    });

    return items.map((a) => ({
      id: a.id,
      user: a.userName,
      avatar: a.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      action: a.action as ActivityLog['action'],
      target: a.target,
      targetId: a.targetId || undefined,
      timestamp: a.createdAt.toISOString()
    }));
  }
};
