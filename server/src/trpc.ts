import { TRPCError, initTRPC } from "@trpc/server";
import { createContext } from ".";
// import { isAuth } from './middlewares/isAuth'
import { verifyLogintoken } from "./services/auth.service";
import { OpenApiMeta } from "trpc-openapi";

const t = initTRPC
  .context<Awaited<ReturnType<typeof createContext>>>()
  .meta<OpenApiMeta>()
  .create();

const isAuth = t.middleware(async ({ ctx, next }) => {
  const { req, res } = ctx;
  const token = req.headers.authorization;

  if (!token) throw new TRPCError({ code: "UNAUTHORIZED" });
  const user = verifyLogintoken(token);
  if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({
    ctx: {
      user,
    },
  });
});

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
export const mergeRouters = t.mergeRouters;
