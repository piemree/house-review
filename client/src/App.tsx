import { QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { AppQueryClient, AppTrpcClient, trpc } from './utils/trpc'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes/index'
import { GlobalProvider } from './context/globalContext'
import { AuthProvider } from './context/authContext'

const router = createBrowserRouter(routes)

export default function App() {
    const [queryClient] = useState(() => AppQueryClient)
    const [trpcClient] = useState(() => AppTrpcClient)

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <GlobalProvider>
                <AuthProvider>
                    <QueryClientProvider client={queryClient}>
                        <RouterProvider router={router} />
                    </QueryClientProvider>
                </AuthProvider>
            </GlobalProvider>
        </trpc.Provider>
    )
}
