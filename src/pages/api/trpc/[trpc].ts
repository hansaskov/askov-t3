import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "askov/env.mjs";
import { createTRPCContext } from "askov/server/api/trpc";
import { appRouter } from "askov/server/api/root";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined,
});
