import { z } from "zod";
import { createUser, findUserByEmail } from "../services/user.service";
import { comparePassword, createLogintoken } from "../services/auth.service";
import { publicProcedure, router } from "../trpc";
import AuthModel from "../models/Auth.model";

export const authRouter = router({
  emailCheck: publicProcedure
    .meta({ openapi: { method: "POST", path: "/emailCheck", tags: ["Auth"] } })
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .output(z.object({ isUserExists: z.boolean() }))
    .mutation(async ({ input }) => {
      return await AuthModel.emailCheck(input.email);
    }),

  register: publicProcedure
    .meta({ openapi: { method: "POST", path: "/register", tags: ["Auth"] } })
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string(),
        lastName: z.string(),
        password: z.string().min(6),
      })
    )
    .output(
      z.promise(
        z.object({
          success: z.boolean(),
        })
      )
    )
    .mutation(async ({ input }) => {
      return await AuthModel.register(input);
    }),
  login: publicProcedure
    .meta({ openapi: { method: "POST", path: "/login", tags: ["Auth"] } })
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .output(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      return await AuthModel.login(input);
    }),
});
