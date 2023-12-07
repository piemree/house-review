import { AuthContext } from '@/context/authContext'
import React, { useContext, useEffect } from 'react'
import { redirect, useNavigate } from 'react-router-dom'

type PageProps = {
    children: React.ReactNode
}

export default function PrivatePage({ children }: PageProps) {
    const { auth, checkAuth, setAuth, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        checkAuth()
            .then((user) => {
                if (!user) {
                    setAuth(false)
                    setUser(null)
                    localStorage.removeItem('token')
                    return navigate('/')
                }
                setAuth(true)
                setUser(user)
            })
            .catch(() => {
                setAuth(false)
                setUser(null)
                localStorage.removeItem('token')
                return navigate('/')
            })
    }, [])
    return <>{children}</>
}
