'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  FolderGit2,
  Home,
  Layers,
  LayoutDashboard,
  LogOut,
  Sparkles,
  Upload,
  UserCheck
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Proyek & Release', href: '/projects', icon: FolderGit2 },
    { label: 'Upload Demo', href: '/upload-demo', icon: Upload }
  ];

  return (
    <aside
      className={cn(
        'relative hidden md:flex flex-col bg-zinc-950 border-r border-zinc-800/80 h-screen sticky top-0 transition-all duration-300 z-30',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800/80">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 p-0.5 shrink-0 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
              <Layers className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                Apex Studio <span className="text-[10px] font-mono font-normal px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-500/30">PRO</span>
              </span>
              <span className="text-[10px] text-zinc-400">Product Ops Engine</span>
            </div>
          )}
        </Link>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 px-3 py-6 flex flex-col gap-1 overflow-y-auto">
        <div className={cn('text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-2 px-3', isCollapsed && 'sr-only')}>
          Main Menu
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group',
                isActive
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/30'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/80 border border-transparent'
              )}
            >
              <Icon className={cn('w-5 h-5 shrink-0 transition-colors', isActive ? 'text-indigo-400' : 'text-zinc-400 group-hover:text-zinc-200')} />
              {!isCollapsed && <span>{item.label}</span>}
              {isActive && (
                <motion.div
                  layoutId="activeSideNav"
                  className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full"
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer Profile / Quick Status */}
      <div className="p-3 border-t border-zinc-800/80">
        <div className={cn('flex items-center gap-3 p-2 rounded-xl bg-zinc-900/60 border border-zinc-800', isCollapsed && 'justify-center p-2')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            alt="User avatar"
            className="w-8 h-8 rounded-lg object-cover ring-1 ring-zinc-700 shrink-0"
          />
          {!isCollapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold text-zinc-200 truncate">Elena Rostova</span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Mock Admin
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
