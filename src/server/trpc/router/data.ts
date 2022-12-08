import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const dataRouter = router({
  getJJBAData: publicProcedure.query(({ ctx }) => {
    console.log('Getting JJBA Data');
    return {'hi': 'hi'}
    // return ctx.prisma.stand.findMany();
  }),
});
