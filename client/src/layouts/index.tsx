import React, { useContext } from 'react'
import NavBar from '@components/NavBar'
import Loading from '@/components/Loading'
import { GlobalContext } from '@/context/globalContext'
import LoginOrSignUpModal from '@/components/LoginOrSignUpModal'
import ErrorModal from '@/components/ErrorModal'
import MobileBottomBar from '@/components/MobileBottomBar'
import TopBar from '@/components/TopBar'

export default function Layout({ children }: { children: React.ReactNode }) {
    const { loading, authModal, errorModal } = useContext(GlobalContext)
    return (
        <div>
            <div className="fixed top-0 left-0 w-full bg-white z-10">
                <NavBar />
                <TopBar />
            </div>
           
            {loading && <Loading />}
            {authModal && <LoginOrSignUpModal />}
            {errorModal && <ErrorModal />}
            {/* <ErrorModal messages={errorMessages} /> */}
            <div className="container mt-[92px] md:mt-[160px] mb-[65px] md:mb-0">{children}</div>
            <MobileBottomBar />
        </div>
    )
}
