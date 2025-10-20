import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const jar = await cookies();
  const all = jar.getAll().map(c => ({ name: c.name, hasValue: !!c.value, valuePreview: (c.value ?? "").slice(0,12) }));
  return NextResponse.json(all);
}
