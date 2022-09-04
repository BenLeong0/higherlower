// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { z } from "zod";

import { getOption, getInitialOptions } from "../categories/coordinator"


export const appRouter = createRouter()
  .transformer(superjson)
  .query("get-option", {
    input: z
      .object({
        category: z.string(),
        excludeId: z.string().optional(),
      }),
    resolve({ input }) {
      const { category, excludeId } = input;
      return getOption(category, excludeId);
    }
  })
  .query("get-category-info", {
    input: z
      .object({
        category: z.string(),
      }),
    resolve({ input }) {
      const { category } = input;
      return getInitialOptions(category);
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
