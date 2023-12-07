import { trpc } from '@/utils/trpc'
import { ReactNode, createContext, useEffect, useState } from 'react'

type AuthProviderProps = {
    children: ReactNode
}

type User = {
    id: string
    email: string
    firstName: string
    lastName: string
}

type AuthContextType = {
    user?: User | null
    auth: boolean
    setUser: (user: User | null) => void
    setAuth: (auth: boolean) => void
    checkAuth: () => Promise<User>
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
    auth: false,
    user: null,
    setUser: () => {},
    setAuth: () => {},
    checkAuth: async () => ({} as User),
    logout: () => {},
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [auth, setAuth] = useState(false)

    const checkAuth = async () => {
        const res = await fetch('http://localhost:4000/trpc/getUserProfile', {
            headers: {
                authorization: localStorage.getItem('token') || '',
            },
        })
        const data = await res.json()
        return data.result?.data as User
    }
    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        setAuth(false)
    }
    useEffect(() => {
        checkAuth()
            .then((user) => {
                if (!user) {
                    setAuth(false)
                    setUser(null)
                    localStorage.removeItem('token')
                    return
                }
                setAuth(true)
                setUser(user)
            })
            .catch(() => {
                setAuth(false)
                setUser(null)
                localStorage.removeItem('token')
            })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                auth,
                setUser,
                setAuth,
                checkAuth,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
