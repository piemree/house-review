import { AuthContext } from '@/context/authContext'
import { GlobalContext } from '@/context/globalContext'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function NavBar() {
    const { setAuthModal } = useContext(GlobalContext)
    const { auth, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }
    return (
        <div className="px-5 border-b hidden md:block">
            <ul className="container flex justify-between items-center h-16 relative">
                <li>
                    <Link
                        className="text-gray-600 hover:text-gray-800"
                        to={'/'}
                    >
                        Home
                    </Link>
                </li>
                {auth && (
                    <li>
                        <Link
                            className="text-gray-600 hover:text-gray-800"
                            to={'/profile'}
                        >
                            Profile
                        </Link>
                    </li>
                )}
                {auth && (
                    <li>
                        <Link
                            className="text-gray-600 hover:text-gray-800"
                            to={'/new-property'}
                        >
                            New Property
                        </Link>
                    </li>
                )}
                {auth && (
                    <li>
                        <button
                            className="text-gray-600 hover:text-gray-800"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </li>
                )}
                {!auth && (
                    <li>
                        <button
                            className="text-gray-600 hover:text-gray-800"
                            onClick={() => setAuthModal(true)}
                        >
                            SignUp / Login
                        </button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default NavBar
