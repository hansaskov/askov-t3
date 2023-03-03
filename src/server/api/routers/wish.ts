import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "askov/server/api/trpc";

export const wishRouter = createTRPCRouter({

  getAllFromUserName: publicProcedure
    .input(z.object({ userName: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.wish.findMany({ where: { user: {name: input.userName}} })
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.wish.findMany();
  }),

  create: protectedProcedure
    .input(z.object({
      title: z.string(),
      link: z.string().url().optional(),
      description: z.string().optional(),
      price: z.number().min(0).optional(),
      image: z.string().url().optional()
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.wish.create({
        data: {
          userId: ctx.session.user.id,
          title: input.title,
          link: input.link,
          description: input.description,
          price: input.price,
          image: input.image
        }
      })
    }),
});
