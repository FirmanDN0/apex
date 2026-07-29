import './globals.css';
import { ToastProvider } from '@/components/ui/toast';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apex Studio — Precision Product & Release Workspace',
  description: 'A modern, fullstack-ready Next.js App Router application built with Linear-inspired UI, Zod validation, and mock API architecture.',
  keywords: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zod', 'CRUD', 'Supabase Ready']
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <body className="bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-indigo-500 selection:text-white min-h-screen flex flex-col">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
