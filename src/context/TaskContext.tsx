"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task, TaskStatus } from '@/types';

interface TaskContextType {
  tasks: Task[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addTask: (title: string, description: string) => void;
  editTask: (id: string, title: string, description: string) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, destStatus: TaskStatus, destIndex: number) => void;
  isLoaded: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('kanban-tasks');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse tasks");
      }
    }
    // Artificial small delay to show off beautiful Loading State
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status: 'PENDING',
      createdAt: Date.now(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const editTask = (id: string, title: string, description: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title, description } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.map(t => t).filter((t) => t.id !== id));
  };

  const moveTask = (taskId: string, destStatus: TaskStatus, destIndex: number) => {
    setTasks((prev) => {
      const newTasks = [...prev];
      const taskIndex = newTasks.findIndex((t) => t.id === taskId);
      if (taskIndex === -1) return prev;

      const [task] = newTasks.splice(taskIndex, 1);
      task.status = destStatus;

      const columnTasks = newTasks.filter(t => t.status === destStatus);
      
      if (destIndex >= columnTasks.length) {
        newTasks.push(task);
      } else {
        const referenceTask = columnTasks[destIndex];
        const absoluteIndex = newTasks.findIndex(t => t.id === referenceTask.id);
        newTasks.splice(absoluteIndex, 0, task);
      }

      return newTasks;
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        searchQuery,
        setSearchQuery,
        addTask,
        editTask,
        deleteTask,
        moveTask,
        isLoaded,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}
