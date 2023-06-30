import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const dataRouter = router({
  getStandById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      console.log("running getStandById", input);
      return ctx.prisma.stand.findMany({
        where: { id: input.id },
      });
    }),

  getAllStands: publicProcedure.query(({ ctx }) => {
    console.log("running getAllStands");
    const allStands = ctx.prisma.stand.findMany({
      orderBy: {
        votesFor: "desc",
      },
    });

    return allStands;
  }),

  addVote: publicProcedure
    .input(z.object({ votedForId: z.number(), votedAgainstId: z.number() }))
    .query(async ({ input, ctx }) => {
      console.log("running addVote", input);

      // Create a new vote
      const newVote = await ctx.prisma.vote.create({
        data: {
          votedFor: input.votedForId,
          votedAgainst: input.votedAgainstId,
        },
      });

      // Increment votesFor on the Stand voted for
      await ctx.prisma.stand.update({
        where: { id: input.votedForId },
        data: { votesFor: { increment: 1 } },
      });

      // Increment votesAgainst on the Stand voted against
      await ctx.prisma.stand.update({
        where: { id: input.votedAgainstId },
        data: { votesAgainst: { increment: 1 } },
      });

      // Return the created vote
      return newVote;
    }),
});
