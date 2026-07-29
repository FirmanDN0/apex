'use client';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Project } from '@/types/project';
import { AlertTriangle } from 'lucide-react';
import React from 'react';

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<unknown>;
  project: Project | null;
  isSubmitting?: boolean;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  project,
  isSubmitting = false
}: DeleteConfirmModalProps) {
  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md">
      <div className="flex flex-col items-center text-center gap-4 py-2">
        <div className="p-3.5 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-400">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-1">Hapus Proyek / Rilis?</h3>
          <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
            Apakah Anda yakin ingin menghapus &quot;<span className="text-zinc-200 font-semibold">{project.title}</span>&quot;? Tindakan ini akan memperbarui mock state di browser Anda.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full mt-2">
          <Button variant="outline" className="flex-1" onClick={onClose} disabled={isSubmitting}>
            Batal
          </Button>
          <Button
            variant="danger"
            className="flex-1"
            isLoading={isSubmitting}
            onClick={async () => {
              await onConfirm();
              onClose();
            }}
          >
            Ya, Hapus
          </Button>
        </div>
      </div>
    </Modal>
  );
}
