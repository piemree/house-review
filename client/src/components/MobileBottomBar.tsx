import { AuthContext } from "@/context/authContext";
import { GlobalContext } from "@/context/globalContext";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MobileBottomBar() {
  const bottomBarRef = useRef<HTMLUListElement>(null);
  const { setAuthModal } = useContext(GlobalContext);
  const { logout, auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {
        <ul
          ref={bottomBarRef}
          className="w-full flex justify-around items-center bg-white border-t md:hidden z-20 fixed bottom-0 left-0"
        >
          <li>
            <Link className="text-gray-600 hover:text-gray-800 py-5" to={"/"}>
              Home
            </Link>
          </li>
          {auth && (
            <li>
              <Link
                className="text-gray-600 hover:text-gray-800 py-5"
                to={"/profile"}
              >
                Profile
              </Link>
            </li>
          )}
          {auth && (
            <li>
              <Link
                className="text-gray-600 hover:text-gray-800"
                to={"/new-property"}
              >
                New Property
              </Link>
            </li>
          )}
          {auth && (
            <li>
              <button
                className="text-gray-600 hover:text-gray-800 py-5"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
          {!auth && (
            <li>
              <button
                className="text-gray-600 hover:text-gray-800 py-5"
                onClick={() => setAuthModal(true)}
              >
                Login/SignUp
              </button>
            </li>
          )}
        </ul>
      }
    </>
  );
}
