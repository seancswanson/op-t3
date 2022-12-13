import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const dataRouter = router({
  getStandById: publicProcedure.input(
    z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      console.log('running getStandById', input)
      return ctx.prisma.stand.findMany({
        where: { id: input.id }
      });
    }),
  getAllStands: publicProcedure.query(({ ctx }) => {
    console.log('running getAllStands')
    const allStands = ctx.prisma.stand.findMany();

    return allStands;
  }
  )
});
