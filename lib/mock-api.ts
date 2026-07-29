import { INITIAL_ACTIVITIES, INITIAL_ANALYTICS } from '@/data/mock-analytics';
import { INITIAL_PROJECTS } from '@/data/mock-projects';
import { ActivityLog, AnalyticsSummary, FetchProjectsParams, PaginatedResult } from '@/types/api';
import { CreateProjectInput, Project, UpdateProjectInput } from '@/types/project';
import { delay, slugify } from './utils';

const STORAGE_KEY = 'apex_mock_projects_v1';
const ACTIVITIES_KEY = 'apex_mock_activities_v1';

function getStoredProjects(): Project[] {
  if (typeof window === 'undefined') return INITIAL_PROJECTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read projects from localStorage', e);
    return INITIAL_PROJECTS;
  }
}

function saveStoredProjects(projects: Project[]) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects to localStorage', e);
    }
  }
}

function getStoredActivities(): ActivityLog[] {
  if (typeof window === 'undefined') return INITIAL_ACTIVITIES;
  try {
    const raw = localStorage.getItem(ACTIVITIES_KEY);
    if (!raw) {
      localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(INITIAL_ACTIVITIES));
      return INITIAL_ACTIVITIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ACTIVITIES;
  }
}

function addActivity(log: Omit<ActivityLog, 'id' | 'timestamp'>) {
  const activities = getStoredActivities();
  const newLog: ActivityLog = {
    ...log,
    id: `act_${Date.now()}`,
    timestamp: 'Just now'
  };
  const updated = [newLog, ...activities].slice(0, 15);
  if (typeof window !== 'undefined') {
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(updated));
  }
}

export const mockApi = {
  getProjects: async (params: FetchProjectsParams): Promise<PaginatedResult<Project>> => {
    await delay(350);
    let items = [...getStoredProjects()];

    // Search query filtering
    if (params.query && params.query.trim() !== '') {
      const q = params.query.toLowerCase().trim();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Status filtering
    if (params.status && params.status !== 'ALL') {
      items = items.filter((p) => p.status === params.status);
    }

    // Category filtering
    if (params.category && params.category !== 'ALL') {
      items = items.filter((p) => p.category === params.category);
    }

    // Priority filtering
    if (params.priority && params.priority !== 'ALL') {
      items = items.filter((p) => p.priority === params.priority);
    }

    // Featured filtering
    if (params.featuredOnly) {
      items = items.filter((p) => p.featured);
    }

    // Sorting
    const sortBy = params.sortBy || 'createdAt';
    const sortOrder = params.sortOrder || 'desc';

    items.sort((a, b) => {
      let valA: string | number = a[sortBy as keyof Project] as string | number;
      let valB: string | number = b[sortBy as keyof Project] as string | number;

      if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
        valA = new Date(valA as string).getTime();
        valB = new Date(valB as string).getTime();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    // Pagination
    const page = params.page || 1;
    const limit = params.limit || 6;
    const total = items.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedData = items.slice(startIndex, startIndex + limit);

    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };
  },

  getProjectById: async (id: string): Promise<Project | null> => {
    await delay(250);
    const projects = getStoredProjects();
    const found = projects.find((p) => p.id === id);
    return found || null;
  },

  createProject: async (input: CreateProjectInput): Promise<Project> => {
    await delay(500);
    const projects = getStoredProjects();
    const newProject: Project = {
      id: `prj_${Math.random().toString(36).substring(2, 9)}`,
      title: input.title,
      slug: slugify(input.title),
      summary: input.summary,
      description: input.description,
      coverImage: input.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      category: input.category,
      status: input.status,
      priority: input.priority,
      tags: input.tags.length > 0 ? input.tags : ['General'],
      views: 1,
      featured: input.featured ?? false,
      author: {
        name: 'You (Current User)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        role: 'Workspace Member'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [newProject, ...projects];
    saveStoredProjects(updated);

    addActivity({
      user: 'You',
      avatar: newProject.author.avatar,
      action: 'CREATED',
      target: newProject.title,
      targetId: newProject.id
    });

    return newProject;
  },

  updateProject: async (id: string, input: UpdateProjectInput): Promise<Project> => {
    await delay(450);
    const projects = getStoredProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Project with ID ${id} not found.`);
    }

    const existing = projects[index];
    const updatedProject: Project = {
      ...existing,
      ...input,
      slug: input.title ? slugify(input.title) : existing.slug,
      updatedAt: new Date().toISOString()
    };

    projects[index] = updatedProject;
    saveStoredProjects(projects);

    addActivity({
      user: 'You',
      avatar: existing.author.avatar,
      action: input.status && input.status !== existing.status ? 'STATUS_CHANGED' : 'UPDATED',
      target: updatedProject.title,
      targetId: updatedProject.id
    });

    return updatedProject;
  },

  deleteProject: async (id: string): Promise<boolean> => {
    await delay(400);
    const projects = getStoredProjects();
    const target = projects.find((p) => p.id === id);
    const filtered = projects.filter((p) => p.id !== id);
    
    saveStoredProjects(filtered);

    if (target) {
      addActivity({
        user: 'You',
        avatar: target.author.avatar,
        action: 'DELETED',
        target: target.title
      });
    }

    return true;
  },

  getAnalyticsSummary: async (): Promise<AnalyticsSummary> => {
    await delay(250);
    const projects = getStoredProjects();
    const publishedCount = projects.filter((p) => p.status === 'PUBLISHED').length;
    const inReviewCount = projects.filter((p) => p.status === 'IN_REVIEW').length;
    const draftCount = projects.filter((p) => p.status === 'DRAFT').length;
    const totalViews = projects.reduce((acc, curr) => acc + curr.views, 0);

    return {
      ...INITIAL_ANALYTICS,
      totalProjects: projects.length,
      publishedCount,
      inReviewCount,
      draftCount,
      totalViews
    };
  },

  getRecentActivities: async (): Promise<ActivityLog[]> => {
    await delay(200);
    return getStoredActivities();
  }
};
