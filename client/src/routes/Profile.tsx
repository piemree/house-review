import { AuthContext } from '@/context/authContext'
import Layout from '@/layouts'
import { useContext, useEffect } from 'react'

type PageProps = {}

export default function Profile({}: PageProps) {
    const { checkAuth } = useContext(AuthContext)
    useEffect(() => {
        checkAuth()
    }, [])
    return <Layout>Profile</Layout>
}
