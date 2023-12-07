import { AuthContext } from '@/context/authContext'
import { GlobalContext } from '@/context/globalContext'
import { trpc } from '@/utils/trpc'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginOrSignUpModal() {
    const { setAuthModal, setLoading, setTRPCErrors } =
        useContext(GlobalContext)
    const { setAuth, setUser } = useContext(AuthContext)
    
    const emailCheckMutation = trpc.emailCheck.useMutation()
    const loginMutation = trpc.login.useMutation()
    const registerMutation = trpc.register.useMutation()
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const navigate = useNavigate()

    const onEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        try {
            e.preventDefault()
            const data = await emailCheckMutation.mutateAsync({ 
                email
             })
            if (data.isUserExists) {
                setStep(2)
            } else {
                setStep(3)
            }
        } catch (error: any) {
            setTRPCErrors(error.message)
        } finally {
            setLoading(false)
        }
    }
    const onLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        try {
            e.preventDefault()
            const data = await loginMutation.mutateAsync({
                email,
                password,
            })
            localStorage.setItem('token', data?.token)
            setAuth(true)
            setAuthModal(false)
            navigate('/')
        } catch (error: any) {
            setTRPCErrors(error.message)
        } finally {
            setLoading(false)
        }
    }
    const onRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        try {
            e.preventDefault()
            const data = await registerMutation.mutateAsync({
                email,
                password: newPassword,
                firstName,
                lastName,
            })
            console.log(data)
        } catch (error: any) {
            setTRPCErrors(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleBackClick = () => {
        if (step === 2) setStep(1)
        if (step === 3) setStep(1)
    }

    return (
        <div className="bg-black bg-opacity-20 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0  z-40 flex justify-center items-end md:items-center w-full md:inset-0 h-full max-h-full ">
            <div className="relative  w-full md:max-w-md max-h-full slide-up-enter slide-up-exit">
                <div className="relative bg-white rounded-t-lg md:rounded-lg shadow ">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                        {step > 1 && (
                            <button onClick={handleBackClick}>Back</button>
                        )}
                        <h3 className="text-xl font-semibold text-center mx-auto">
                            Log in or Sign Up
                        </h3>
                        <button
                            type="button"
                            className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center "
                            onClick={() => setAuthModal(false)}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* Email */}
                    {step === 1 && (
                        <div className="p-4 md:p-5">
                            <form
                                className="space-y-4"
                                onSubmit={onEmailSubmit}
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-lg font-medium "
                                    >
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        value={email}
                                        className="bg-gray-50 border  border-gray-300  text-lg rounded-lg  block w-full px-2.5 py-5"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-rose-600  font-medium rounded-lg text-sm p-5 text-center "
                                >
                                    Continue
                                </button>
                            </form>
                        </div>
                    )}
                    {/* login password  */}
                    {step === 2 && (
                        <div className="p-4 md:p-5">
                            <form
                                className="space-y-4"
                                onSubmit={onLoginSubmit}
                            >
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-lg font-medium "
                                    >
                                        Your Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        value={password}
                                        className="bg-gray-50 border  border-gray-300  text-lg rounded-lg  block w-full px-2.5 py-5"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-rose-600  font-medium rounded-lg text-sm p-5 text-center "
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    )}
                    {/* register new  */}
                    {step === 3 && (
                        <div className="p-4 md:p-5">
                            <form
                                className="space-y-4"
                                onSubmit={onRegisterSubmit}
                            >
                                <div>
                                    <label
                                        htmlFor="first-name"
                                        className="block mb-2 text-lg font-medium "
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="first-name"
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        value={firstName}
                                        className="bg-gray-50 border  border-gray-300  text-lg rounded-lg  block w-full px-2.5 py-5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="last-name"
                                        className="block mb-2 text-lg font-medium "
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="last-name"
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        value={lastName}
                                        className="bg-gray-50 border  border-gray-300  text-lg rounded-lg  block w-full px-2.5 py-5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="new-password"
                                        className="block mb-2 text-lg font-medium "
                                    >
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="new-password"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        value={newPassword}
                                        className="bg-gray-50 border  border-gray-300  text-lg rounded-lg  block w-full px-2.5 py-5"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white bg-rose-600  font-medium rounded-lg text-sm p-5 text-center "
                                >
                                    Register
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
