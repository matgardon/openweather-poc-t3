import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const favoriteLocationRouter = createTRPCRouter({
  // add favorite location for current user
  add: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        country: z.string().length(2),
        // TOFIX... see https://github.com/prisma/prisma/issues/1798
        lat: z.string(),
        lon: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.favoriteLocation.create({
        data: {
          name: input.name,
          country: input.country,
          lat: input.lat,
          lon: input.lon,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  // delete by id
  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.favoriteLocation.delete({
        where: { id: input.id },
      });
    }),

  // get all current user favorite locations
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const locations = await ctx.db.favoriteLocation.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });

    return locations ?? null;
  }),
});
