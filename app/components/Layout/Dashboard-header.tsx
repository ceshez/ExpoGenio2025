"use client";

import { Menu, Sparkles } from "lucide-react";

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function DashboardHeader({
  sidebarOpen,
  setSidebarOpen,
}: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between bg-background shadow-sm border-b border-border p-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="text-foreground" size={24} />
        </button>
        <div
          onClick={() => (window.location.href = "/")}
          className="transition-transform duration-300 hover:rotate-12 hover:scale-110 cursor-pointer"
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Sparkles className="text-primary-foreground" size={24} />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-primary">GENIO</h1>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Buscar sitios..."
          className="hidden md:block border border-input rounded-xl px-4 py-2 w-80 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
      </div>
    </header>
  );
}
