import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const dataRouter = router({
  getStandById: publicProcedure.input(
    z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.stand.findMany({
        where: { id: input.id }
      });
    }),
});
