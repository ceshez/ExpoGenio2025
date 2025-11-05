"use client";

import { Menu, Sparkles } from "lucide-react";
import GenioLogo from "../LogoGenio";

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function DashboardHeader({

}: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between bg-background shadow-sm border-b border-border p-6">
      <div className="flex items-center gap-4">

        <div
          onClick={() => (window.location.href = "/")}
          className="transition-transform duration-300 hover:rotate-12 hover:scale-110 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <GenioLogo variant="simplified"/>
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
