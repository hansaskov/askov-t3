import { createTRPCRouter } from "askov/server/api/trpc";
import { wishRouter } from "askov/server/api/routers/wish";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  wish: wishRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
