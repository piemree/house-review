import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
export default function SeacrhProperty() {
    return (
        <div className="flex items-center border border-gray-400 rounded-lg px-4 ">
            <FaMagnifyingGlass />
            <input
                placeholder="Search for a property"
                className="w-full h-10 px-3 py-6 text-xl font-semibold  border-none outline-none"
                type="text"
            />
        </div>
    )
}
