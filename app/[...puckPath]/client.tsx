"use client";
export const runtime = "nodejs";
import type { Data } from "@measured/puck";
import { Render } from "@measured/puck";
import config from "../../puck.config";

export function Client({ data }: { data: Data }) {
  return <Render config={config} data={data} />;
}
