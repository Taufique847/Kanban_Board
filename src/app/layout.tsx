import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TaskProvider } from "@/context/TaskContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban Flow",
  description: "A premium mini Kanban board.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased bg-slate-50`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <TaskProvider>{children}</TaskProvider>
      </body>
    </html>
  );
}
