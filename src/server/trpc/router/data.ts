import { z } from "zod";

import { router, publicProcedure } from "../trpc";

import data from '../../../pages/api/data/all_data.json';

export const dataRouter = router({
  getStandById: publicProcedure.input(z.object({ id: z.number() })).query(({ input, ctx }) => {
    console.log('Getting JJBA Data');
    const stand = data.data.filter((d) => d.id === input.id);

    return stand[0] || data.data[0];
    // return ctx.prisma.stand.findMany();
  }),
});
