"use client";

import React from 'react';
import { Plus } from 'lucide-react';

interface HeaderProps {
  onOpenAddModal: () => void;
}

export function Header({ onOpenAddModal }: HeaderProps) {
  return (
    <header className="bg-[#2168c4] px-4 sm:px-8 py-3 sm:py-5 flex items-center justify-between w-full h-16 sm:h-20 shadow-sm z-10 sticky top-0">
      <h1 className="text-lg sm:text-2xl font-bold text-white tracking-wide">
        Kanban Board
      </h1>

      <button
        onClick={onOpenAddModal}
        className="flex items-center gap-1 sm:gap-2 bg-[#3c82ed] hover:bg-[#2b6bd1] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-sm sm:text-base font-medium transition-colors border border-[#4a8df4] shadow-sm"
      >
        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Add Task</span>
      </button>
    </header>
  );
}
