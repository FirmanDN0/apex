'use client';

import { Card } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import { useToast } from '@/components/ui/toast';
import { CheckCircle2, Code2, FileImage, ShieldCheck, Sparkles, UploadCloud } from 'lucide-react';
import React, { useState } from 'react';

export default function UploadDemoPage() {
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const { toast } = useToast();

  const handleImageChange = (url: string) => {
    setUploadedUrl(url);
    if (url) {
      toast.success('Simulasi Upload Berhasil!', 'Data URL gambar telah siap digunakan.');
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-zinc-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
          <Sparkles className="w-3.5 h-3.5" /> Standalone Primitive Showcase
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Komponen Image Upload Modern
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Uji coba drag-and-drop, validasi format/ukuran file Zod, indikator progres animasi, dan preview gambar tanpa backend sungguhan.
        </p>
      </div>

      {/* Main Upload Demo Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Dropzone Container */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-indigo-400" /> Area Upload Gambar
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Seret gambar dari file explorer Anda ke area di bawah atau klik untuk memilih file.
            </p>

            <ImageUpload
              value={uploadedUrl}
              onChange={handleImageChange}
              onRemove={() => {
                setUploadedUrl('');
                toast.info('Gambar Dihapus', 'Area upload kembali kosong.');
              }}
            />
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Validasi otomatis: Max 5MB (JPG, PNG, WEBP, SVG)</span>
          </div>
        </Card>

        {/* Live Output & Code Integration Guide */}
        <Card className="p-6 flex flex-col justify-between bg-zinc-950/80 border-zinc-800">
          <div>
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-purple-400" /> Data Output &amp; State Live
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Status string URL/Data-URI yang ditangkap oleh komponen:
            </p>

            {uploadedUrl ? (
              <div className="flex flex-col gap-3">
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Gambar aktif tersimpan di State!</span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 max-h-40 overflow-y-auto">
                  <span className="text-[10px] text-zinc-500 font-mono block mb-1">Data URI Snippet:</span>
                  <p className="text-[11px] font-mono text-zinc-300 break-all leading-tight">
                    {uploadedUrl.substring(0, 150)}...
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-xl border border-dashed border-zinc-800 text-center flex flex-col items-center justify-center text-zinc-500">
                <FileImage className="w-8 h-8 mb-2 opacity-50" />
                <span className="text-xs">Belum ada gambar diunggah</span>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800 text-[11px] text-zinc-400 leading-relaxed">
            <span className="text-indigo-400 font-semibold block mb-1">Integrasi Supabase Storage Mandiri:</span>
            Saat menghubungkan Supabase nanti, Anda tinggal mengganti fungsi <code className="text-zinc-300 font-mono bg-zinc-900 px-1 py-0.5 rounded">onChange</code> untuk mengunggah file ke <code className="text-zinc-300 font-mono bg-zinc-900 px-1 py-0.5 rounded">supabase.storage.from(&apos;images&apos;).upload()</code>.
          </div>
        </Card>
      </div>
    </div>
  );
}
