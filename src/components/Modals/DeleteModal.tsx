"use client";

import React from 'react';
import { Task } from '@/types';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskToDelete?: Task | null;
}

export function DeleteModal({ isOpen, onClose, onConfirm, taskToDelete }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-100 text-rose-600 mb-4">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            Delete Task
          </h2>
          <p className="text-slate-600 text-sm">
            Are you sure you want to delete <span className="font-semibold text-slate-800">"{taskToDelete?.title}"</span>? This action cannot be undone.
          </p>

          <div className="mt-8 flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
