"use client";

import React, { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useTask } from '@/context/TaskContext';
import { Column as ColumnComponent } from './Column';
import { Column as ColumnType, Task, TaskStatus } from '@/types';

const COLUMNS: ColumnType[] = [
  { id: 'PENDING', title: 'Pending' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'COMPLETED', title: 'Completed' },
];

interface KanbanBoardProps {
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

export function KanbanBoard({ onEditTask, onDeleteTask }: KanbanBoardProps) {
  const { tasks, moveTask, searchQuery } = useTask();

  const handleManualMove = (task: Task) => {
    let nextStatus: TaskStatus = 'COMPLETED';
    if (task.status === 'PENDING') nextStatus = 'IN_PROGRESS';
    else if (task.status === 'IN_PROGRESS') nextStatus = 'COMPLETED';
    
    // We append to the bottom of the column by putting index very large
    moveTask(task.id, nextStatus, 9999);
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    moveTask(draggableId, destination.droppableId as TaskStatus, destination.index);
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-x-auto p-6 flex justify-center">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 h-full items-start justify-center w-full max-w-[1050px]">
          {COLUMNS.map((col) => {
            const columnTasks = filteredTasks.filter((task) => task.status === col.id);
            return (
              <ColumnComponent
                key={col.id}
                column={col}
                tasks={columnTasks}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
                onMoveTask={handleManualMove}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
