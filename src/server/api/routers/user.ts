import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "askov/server/api/trpc";

export const userRouter = createTRPCRouter({

  getUnique: publicProcedure
    .input(z.object({ userName: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({ where: { name: input.userName } })
    }),

  getSessionUser: protectedProcedure
    .query(({ ctx }) => {
      return ctx.prisma.user.findUnique({ where: { id: ctx.session.user.id } });
    }),

  getAllFromFamily: publicProcedure
    .input(z.object({ familyName: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findMany({
        where: {
          families: {
            every: {
              name: input.familyName
            }
          }
        }
      })
    }),

    update: protectedProcedure
    .input(z.object({
      firstName: z.string().min(1),
      middleName: z.string().nullable(),
      lastName: z.string().min(1),
      birthDate: z.date().or(z.string().pipe( z.coerce.date())),
      description: z.string().nullable()

    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        data: {
          firstName: input.firstName,
          middleName: input.middleName,
          lastName: input.lastName,
          birthDate: input.birthDate,
          description: input.description
        },
        where: {
          id: ctx.session.user.id
        }
      })
      
    })

});
