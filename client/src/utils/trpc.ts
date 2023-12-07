import { QueryClient } from '@tanstack/react-query'
import type { appRouter } from '../../../server/src/routes'
import { createTRPCReact, httpBatchLink } from '@trpc/react-query'
export const trpc = createTRPCReact<appRouter>()

export const AppQueryClient = new QueryClient({})

export const AppTrpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: 'http://localhost:4000/trpc',
            headers: {
                authorization: localStorage.getItem('token') || '',
            },
        }),
    ],
})
