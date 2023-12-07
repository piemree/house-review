import { GlobalContext } from '@/context/globalContext'
import React, { useContext } from 'react'

export default function ErrorModal() {
    const { setErrorModal, errorMessages } = useContext(GlobalContext)

    return (
        <div className="bg-black bg-opacity-20 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-end md:items-center w-full md:inset-0 h-full max-h-full ">
            <div className="relative  w-full md:max-w-md max-h-full">
                <div className="relative bg-white rounded-t-lg md:rounded-lg shadow ">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                        <h3 className="text-xl font-semibold  ">Error</h3>
                        <button
                            type="button"
                            className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center "
                            onClick={() => setErrorModal(false)}
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
                    <div className="p-4 md:p-5">
                        {errorMessages?.map((message, index) => (
                            <div key={index}>{message}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
