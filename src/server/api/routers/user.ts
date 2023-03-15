import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "askov/server/api/trpc";

export const userRouter = createTRPCRouter({

  getUnique: publicProcedure
    .input(z.object({ userName: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({ where: { name: input.userName} })
    }),
  
  getAllFromFamily: publicProcedure
    .input(z.object({familyName: z.string() }))
    .query(({ctx, input}) => {
      return ctx.prisma.user.findMany({
        where: {
          families: {
            every: {
              name: input.familyName
            }
          }
        }
      })

    })

});
