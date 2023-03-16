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
      return ctx.prisma.wish.findMany({ where: { user: { name: input.userName } } })
    }),

  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
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

  update: protectedProcedure
    .input(z.object({
      id: z.string().cuid(),
      title: z.string().optional(),
      link: z.string().url().optional(),
      description: z.string().optional(),
      price: z.number().min(0).optional(),
      image: z.string().url().optional()
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.wish.update({
        where: { id: input.id },
        data: {
          title: input.title,
          link: input.link,
          description: input.description,
          price: input.price,
          image: input.image
        }
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.wish.delete({
        where: {
          id: input.id
        }
      })
    }),
});
