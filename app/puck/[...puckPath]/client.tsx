"use client";

import type { Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import config from "../../../puck.config";

export function Client({ path, data }: { path: string; data: Partial<Data> }) {
  return (
    <Puck
      config={config}
      data={data}
      onPublish={async (data) => {
        await fetch("/puck/api", {
          method: "post",
          body: JSON.stringify({ data, path }),
        });
      }}
      overrides={{
        headerActions: ({children}) => (
          <PreviewModeIndicator>{children}</PreviewModeIndicator>
        ), 
      }}
    />
  );
}

const PreviewModeIndicator = ({ children }) => {
  
  return (
  <>
  <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200 rounded-lg font-medium text-sm hover:from-indigo-100 hover:to-purple-100 hover:border-indigo-300 transition-all duration-300 cursor-pointer">
    <strong>Vista Previa</strong>
  </span>
  {children}
</>
  );
}
