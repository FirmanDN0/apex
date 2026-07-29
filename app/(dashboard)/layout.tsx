'use client';

import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { ProjectFormModal } from '@/features/projects/project-form-modal';
import { useProjects } from '@/hooks/use-projects';
import React, { useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { createProject, isSubmitting } = useProjects();

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onOpenCreateModal={() => setIsCreateModalOpen(true)} />
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>

      {/* Global Quick Create Modal */}
      <ProjectFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={async (data) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await createProject(data as any);
        }}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
