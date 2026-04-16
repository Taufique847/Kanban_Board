"use client";

import React, { useState } from 'react';
import { Header } from '@/components/Layout/Header';
import { KanbanBoard } from '@/components/Kanban/KanbanBoard';
import { TaskModal } from '@/components/Modals/TaskModal';
import { DeleteModal } from '@/components/Modals/DeleteModal';
import { useTask } from '@/context/TaskContext';
import { Task } from '@/types';

export function KanbanContainer() {
  const { addTask, editTask, deleteTask, isLoaded } = useTask();
  
  // Modal States
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const handleOpenAdd = () => {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const handleOpenDelete = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleSaveTask = (title: string, description: string) => {
    if (taskToEdit) {
      editTask(taskToEdit.id, title, description);
    } else {
      addTask(title, description);
    }
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#f4f6fa] relative">
      <Header onOpenAddModal={handleOpenAdd} />
      
      {!isLoaded ? (
        <div className="flex-1 flex flex-col items-center justify-center p-10 z-10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full animate-spin border-y-2 border-indigo-600"></div>
            <span className="text-slate-600 font-medium text-lg">Loading your workspace...</span>
          </div>
        </div>
      ) : (
        <KanbanBoard 
          onEditTask={handleOpenEdit} 
          onDeleteTask={handleOpenDelete} 
        />
      )}

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        taskToDelete={taskToDelete}
      />
    </main>
  );
}
