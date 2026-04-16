# Mini Kanban Board

A modern, responsive, Trello-like Kanban board built with Next.js 14 and Tailwind CSS. This is an intern assignment project featuring full CRUD capabilities, drag-and-drop mechanics, and persistent state management.

## 🌟 Features

- **Create, Read, Update, Delete (CRUD)**: Fully manage tasks through intuitive modals.
- **Drag & Drop**: Seamlessly move tasks between "Pending", "In Progress", and "Completed" columns.
- **Search & Filter**: Real-time filtering of tasks by title or description.
- **Optimistic UI**: Instant state updates for a snappy user experience.
- **Data Persistence**: Uses `localStorage` so your tasks survive page reloads.
- **Responsive Design**: Carefully crafted for both desktop and mobile views.
- **Premium UI**: Features glassmorphism, micro-animations, and clean typography using Tailwind CSS.

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Library**: React (Functional Components, Hooks, Context)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Drag & Drop**: `@hello-pangea/dnd`
- **Icons**: `lucide-react`

## 🚀 Getting Started

### 1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd kanban
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Run the development server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Architecture

- **Server vs Client Components**: 
  - Structural elements (Layout, Page Skeleton) are rendered globally, providing robust SEO.
  - The Kanban core (`Header`, `KanbanBoard`, `TaskCard`, Modals) are marked with `"use client"` since they are highly interactive and rely on browser APIs.
- **State Management**: Uses React Context (`TaskProvider`) to centralize functions and state, keeping the component tree clean and avoiding props drilling.
- **Persistence Layer**: Custom `useEffect` hooks sync the `TaskContext` directly with the browser's `localStorage` on every change.

## 📝 License

MIT
