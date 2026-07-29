'use client';

import { Button } from '@/components/ui/button';
import { CommandPalette } from '@/components/ui/command-palette';
import { INITIAL_PROJECTS } from '@/data/mock-projects';
import { Bell, Command, Menu, Plus, Search, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export function Header({ onOpenCreateModal }: { onOpenCreateModal?: () => void }) {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="text-sm font-bold tracking-tight text-white">Apex Studio</span>
        </div>

        {/* Global Search Button / Cmd+K trigger */}
        <div className="hidden sm:flex items-center flex-1 max-w-md">
          <button
            onClick={() => setIsCommandOpen(true)}
            className="w-full flex items-center justify-between bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:border-zinc-700 rounded-xl px-3.5 py-2 text-xs transition-colors"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-zinc-500" />
              Cari proyek atau rilis...
            </span>
            <kbd className="flex items-center gap-1 font-mono text-[10px] bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700 text-zinc-300">
              <Command className="w-3 h-3" /> K
            </kbd>
          </button>
        </div>

        {/* Right side Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCommandOpen(true)}
            className="sm:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
          >
            <Search className="w-4 h-4" />
          </button>

          <div className="relative">
            <button className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-zinc-950" />
            </button>
          </div>

          {onOpenCreateModal && (
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenCreateModal}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Proyek Baru
            </Button>
          )}
        </div>
      </header>

      {/* Command Palette Search Modal */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        projects={INITIAL_PROJECTS}
      />

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-md pt-20 px-6">
          <div className="flex flex-col gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium text-zinc-200 hover:bg-zinc-800"
            >
              Overview Dashboard
            </Link>
            <Link
              href="/projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium text-zinc-200 hover:bg-zinc-800"
            >
              Proyek & Release CRUD
            </Link>
            <Link
              href="/upload-demo"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium text-zinc-200 hover:bg-zinc-800"
            >
              Upload Demo Komponen
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
