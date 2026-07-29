'use server';

import { postgresApi } from '@/lib/postgres-api';
import { ActivityLog, AnalyticsSummary, FetchProjectsParams, PaginatedResult } from '@/types/api';
import { CreateProjectInput, Project, UpdateProjectInput } from '@/types/project';

export async function fetchProjectsAction(params: FetchProjectsParams): Promise<PaginatedResult<Project>> {
  return await postgresApi.getProjects(params);
}

export async function getProjectByIdAction(id: string): Promise<Project | null> {
  return await postgresApi.getProjectById(id);
}

export async function createProjectAction(input: CreateProjectInput): Promise<Project> {
  return await postgresApi.createProject(input);
}

export async function updateProjectAction(id: string, input: UpdateProjectInput): Promise<Project> {
  return await postgresApi.updateProject(id, input);
}

export async function deleteProjectAction(id: string): Promise<boolean> {
  return await postgresApi.deleteProject(id);
}

export async function getAnalyticsSummaryAction(): Promise<AnalyticsSummary> {
  return await postgresApi.getAnalyticsSummary();
}

export async function getRecentActivitiesAction(): Promise<ActivityLog[]> {
  return await postgresApi.getRecentActivities();
}
