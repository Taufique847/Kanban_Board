"use client";

import React from 'react';
import { Column as ColumnType, Task } from '@/types';
import { Droppable } from '@hello-pangea/dnd';
import { TaskCard } from './TaskCard';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
  onMoveTask: (task: Task) => void;
}

export function Column({ column, tasks, onEditTask, onDeleteTask, onMoveTask }: ColumnProps) {
  return (
    <div className="flex flex-col bg-[#eef1f6] rounded flex-shrink-0 border border-slate-200 w-80 min-w-[320px] h-fit max-h-full">
      {/* Column Header */}
      <div className="p-4 bg-white rounded-t border-b border-slate-200 flex items-center justify-center">
        <h3 className="font-bold text-slate-700 text-lg">
          {column.title}
        </h3>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-3 transition-colors min-h-[120px] ${
              snapshot.isDraggingOver ? 'bg-indigo-50/50' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onMove={onMoveTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
