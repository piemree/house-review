import UserModel from "../models/User.model";
import { privateProcedure, router } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  getAllUsers: privateProcedure.query(({ ctx }) => {
    return;
  }),
  getUserProfile: privateProcedure
    .meta({
      openapi: { method: "GET", path: "/getUserProfile", tags: ["User"] },
    })
    .input(z.object({}))
    .output(
      // return promise of zod object or null
      z.promise(
        z
          .object({
            id: z.string(),
            email: z.string(),
            firstName: z.string(),
            lastName: z.string(),
          })
          .nullable()
      )
    )
    .query(async ({ ctx }) => {
      return await UserModel.getUserProfile(ctx.user?.id);
    }),
});
