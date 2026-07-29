'use client';

import { Button } from './button';
import { formatFileSize } from '@/lib/utils';
import { imageUploadValidationSchema } from '@/lib/zod-schemas';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Image as ImageIcon, Trash2, UploadCloud, X } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';

export interface ImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  onRemove?: () => void;
  maxSizeMB?: number;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  maxSizeMB = 5
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const processFile = useCallback(
    (file: File) => {
      setErrorMessage(null);

      // Validate Zod schema
      const validation = imageUploadValidationSchema.safeParse({
        fileSize: file.size,
        fileType: file.type
      });

      if (!validation.success) {
        const firstError = validation.error.errors[0]?.message || 'File tidak memenuhi kriteria.';
        setErrorMessage(firstError);
        return;
      }

      setFileName(file.name);
      setFileSize(file.size);
      setIsUploading(true);
      setUploadProgress(10);

      // Simulate step progress animation
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);

            // Read file into Data URL preview
            const reader = new FileReader();
            reader.onloadend = () => {
              const resultStr = reader.result as string;
              setPreviewUrl(resultStr);
              if (onChange) onChange(resultStr);
            };
            reader.readAsDataURL(file);

            return 100;
          }
          return prev + 25;
        });
      }, 150);
    },
    [onChange]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleClear = () => {
    setPreviewUrl(null);
    setFileName(null);
    setFileSize(null);
    setUploadProgress(0);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onRemove) onRemove();
    if (onChange) onChange('');
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/svg+xml"
        onChange={handleFileSelect}
        className="hidden"
      />

      <AnimatePresence mode="wait">
        {previewUrl && !isUploading ? (
          // Preview state
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3 overflow-hidden group flex flex-col sm:flex-row items-center gap-4"
          >
            <div className="relative w-full sm:w-36 h-28 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Preview upload"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[10px] uppercase font-bold text-white bg-black/60 px-2 py-1 rounded-md backdrop-blur-sm">
                  Preview
                </span>
              </div>
            </div>

            <div className="flex-1 min-w-0 w-full">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-zinc-200 truncate">
                  {fileName || 'Gambar Terpilih'}
                </span>
              </div>
              {fileSize && (
                <p className="text-[11px] text-zinc-400 mb-3">
                  Ukuran: <span className="text-zinc-300 font-mono">{formatFileSize(fileSize)}</span>
                </p>
              )}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  leftIcon={<ImageIcon className="w-3.5 h-3.5" />}
                >
                  Ganti
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={handleClear}
                  leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                >
                  Hapus
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          // Dropzone state & Progress state
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer text-center ${
              isDragging
                ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
                : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900/70'
            }`}
          >
            {isUploading ? (
              <div className="w-full max-w-xs flex flex-col items-center gap-3">
                <UploadCloud className="w-8 h-8 text-indigo-400 animate-bounce" />
                <div className="w-full flex justify-between text-xs text-zinc-300 font-medium">
                  <span>Mengunggah...</span>
                  <span className="font-mono text-indigo-400">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full transition-all duration-200 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="p-3.5 rounded-2xl bg-zinc-800/80 border border-zinc-700/50 mb-3 text-zinc-300 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6 text-indigo-400" />
                </div>
                <h4 className="text-sm font-semibold text-zinc-200 mb-1">
                  Drag & Drop gambar di sini atau <span className="text-indigo-400 underline">Cari File</span>
                </h4>
                <p className="text-xs text-zinc-500 mb-2">
                  Format didukung: <span className="text-zinc-400">JPG, PNG, WEBP, SVG</span> (Maksimal {maxSizeMB}MB)
                </p>
              </>
            )}
          </div>
        )}
      </AnimatePresence>

      {errorMessage && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
          <button
            onClick={() => setErrorMessage(null)}
            className="ml-auto text-rose-400 hover:text-rose-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
