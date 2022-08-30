// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { z } from "zod";

import getOptions from "../categories/coordinator"


export const appRouter = createRouter()
  .transformer(superjson)
  .query("get_options", {
    input: z
      .object({
        category: z.string(),
      }),
    resolve({ input }) {
      const { category } = input;
      return getOptions(category);
    }
  })
  .query("score", {
    input: z
      .object({
        name: z.string(),
        score: z.number(),
      }),
    resolve({ input }) {
      return input;
    }
  });

// export type definition of API
export type AppRouter = typeof appRouter;
