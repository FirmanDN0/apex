import { Button } from '@/components/ui/button';
import { ArrowLeft, FileQuestion } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-100 p-6 text-center">
      <div className="p-4 rounded-3xl bg-zinc-900 border border-zinc-800 text-indigo-400 mb-6 shadow-2xl">
        <FileQuestion className="w-12 h-12" />
      </div>

      <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">404 — Halaman Tidak Ditemukan</h1>
      <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed mb-8">
        Maaf, rute yang Anda cari tidak tersedia atau telah dipindahkan di workspace Apex Studio.
      </p>

      <Link href="/dashboard">
        <Button variant="glow" leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Kembali ke Dashboard
        </Button>
      </Link>
    </div>
  );
}
