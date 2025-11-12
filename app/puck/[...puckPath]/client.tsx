"use client";

import type { Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import { createAiPlugin } from "@puckeditor/plugin-ai";
import "@puckeditor/plugin-ai/styles.css";
import config from "../../../puck.config";
import Sidebar from "../../components/Layout/Sidebar";
import { useState } from "react";
import  Link from "next/link";
export const runtime = "nodejs";

type RecentItem = {
  id: string;
  title: string;
  path: string;
  updatedAtText?: string;
  updatedAt?: string | Date;
  previewTitle?: string;
};

type ClientProps = {
  path: string;
  data: Partial<Data>;
  recentDesigns?: RecentItem[];
};

const aiPlugin = createAiPlugin();

export function Client({ path, data, recentDesigns = [] }: ClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen"> 
      <div className="flex flex-none">
        {recentDesigns.length > 0 && (
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            recentDesigns={recentDesigns.map((r) => ({
              id: r.id,
              title: r.title,
              path: r.path,
              updatedAt:
                (r.updatedAt
                  ? new Date(r.updatedAt).toISOString()
                  : new Date().toISOString()),
            }))}
          />
        )}
      </div>

      <main className="flex-1 overflow-hidden">
        <div className="h-screen overflow-auto">
          <Puck
            plugins={[aiPlugin]}
            config={config}
            data={data}
            onPublish={async (data) => {
              await fetch("/puck/api", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data, path }),
              });
            }}
            overrides={{
              headerActions: ({ children }) => (
                <div className="flex items-center gap-2">
        <Link
          href={path}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-[#2E388E] text-white text-sm font-medium 
          hover:bg-[#257DC1] transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02]">
          Ver en vivo
        </Link>
        {children}
      </div>
              ),
            }}
          />
        </div>
      </main>
    </div>
  );
}
