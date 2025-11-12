// app/api/puck/[...all]/route.ts

import { puckHandler } from "@puckeditor/cloud-client";

export const POST = (request: Request) => {
  return puckHandler(request, {
    ai: {
      context: "You are an expert Ai assistant for our brand Genio your goal its to help users and SMEs in Costa Rica to create amazing websites",
    },
  });
};