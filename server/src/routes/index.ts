import { mergeRouters } from '../trpc'
import { authRouter } from './auth.router'
import { propertyRouter } from './property.router'
import { userRouter } from './user.router'

export const appRouter = mergeRouters(userRouter, authRouter, propertyRouter)

export type appRouter = typeof appRouter
