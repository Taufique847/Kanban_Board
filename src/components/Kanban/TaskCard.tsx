"use client";

import React from 'react';
import { Task } from '@/types';
import { Draggable } from '@hello-pangea/dnd';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onMove: (task: Task) => void;
}

export function TaskCard({ task, index, onEdit, onDelete, onMove }: TaskCardProps) {
  const isCompleted = task.status === 'COMPLETED';

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-md border border-slate-200 shadow-sm mb-3 ${
            snapshot.isDragging ? 'rotate-2 shadow-lg ring-1 ring-blue-300 z-50 flex-none' : ''
          }`}
        >
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                  {task.title}
                </h4>
                {task.description && (
                  <p className="mt-1 text-xs sm:text-sm text-slate-500">
                    {task.description}
                  </p>
                )}
              </div>
              
              {isCompleted && (
                <div className="ml-2 mt-1">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" opacity="0.2" strokeWidth={1} />
                  {/* To perfectly match the mockup's solid green circle with white check */}
                  <div className="absolute -mt-[24px] ml-0 pointer-events-none">
                     <CheckCircle2 className="w-6 h-6 text-white" fill="#22c55e" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {!isCompleted && (
            <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-slate-100 flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(task); }}
                className="bg-[#2e74da] hover:bg-[#2060c0] text-white text-[10px] sm:text-xs font-semibold px-3 py-1 sm:px-4 sm:py-1.5 rounded"
              >
                Edit
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(task); }}
                className="bg-[#da4f50] hover:bg-[#c23e3e] text-white text-[10px] sm:text-xs font-semibold px-3 py-1 sm:px-4 sm:py-1.5 rounded"
              >
                Delete
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onMove(task); }}
                className="bg-[#e2e8f0] hover:bg-[#cbd5e1] text-slate-700 text-[10px] sm:text-xs font-semibold px-2 py-1 sm:px-3 sm:py-1.5 rounded flex items-center gap-1 ml-auto"
              >
                Move <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
