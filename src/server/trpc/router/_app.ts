import { router } from "../trpc";
import { authRouter } from "./auth";
import { dataRouter } from "./data";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  data: dataRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
