import { Cloudinary } from '@cloudinary/url-gen/index'
import { ReactNode, createContext, useEffect, useState } from 'react'

// GlobalProvider type

type GlobalProviderProps = {
    children: ReactNode
}

type GlobalContextType = {
    cld?: Cloudinary
    loading: boolean
    authModal: boolean
    errorModal: boolean
    errorMessages: string[] | null
    setTRPCErrors: (trpcErrorMessage: string) => void
    setErrorMessages: (errorMessages: string[]) => void
    setErrorModal: (errorModal: boolean) => void
    setAuthModal: (authModal: boolean) => void
    showLoading: () => void
    hideLoading: () => void
    setLoading: (loading: boolean) => void
}

// GlobalContext oluşturuluyor
export const GlobalContext = createContext<GlobalContextType>({
    loading: false,
    authModal: false,
    errorModal: false,
    errorMessages: null,
    setTRPCErrors: () => {},
    setErrorMessages: () => {},
    setErrorModal: () => {},
    setAuthModal: () => {},
    showLoading: () => {},
    hideLoading: () => {},
    setLoading: () => {},
})

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [loading, setLoading] = useState(false)
    const [authModal, setAuthModal] = useState(false)
    const [errorModal, setErrorModal] = useState(false)
    const [errorMessages, setErrorMessages] = useState<string[] | null>(null)
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dwhyenvtu',
            apiKey: '912145598789372',
            apiSecret: 'O-KbmiXAhw81rqE2n481Jwde_uo',
        },
    })

    const showLoading = () => setLoading(true)
    const hideLoading = () => setLoading(false)

    const setTRPCErrors = (trpcErrorMessage: string) => {
        const errorMessages = JSON.parse(trpcErrorMessage).map(
            (e: any) => e.message,
        )
        setErrorMessages(errorMessages)
    }

    useEffect(() => {
        if (errorMessages?.length && errorMessages?.length > 0) {
            setErrorModal(true)
        } else {
            setErrorModal(false)
        }
    }, [errorMessages])

    return (
        <GlobalContext.Provider
            value={{
                cld,
                loading,
                authModal,
                errorModal,
                errorMessages,
                setErrorMessages,
                setTRPCErrors,
                setErrorModal,
                setAuthModal,
                showLoading,
                hideLoading,
                setLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}
