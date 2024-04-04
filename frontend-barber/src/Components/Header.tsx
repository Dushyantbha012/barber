import { Menuitems } from "./Menuitems.ts";
import { useState, useRef } from "react";
import { isLoggedInAtom } from "../recoil/atoms.ts";
import { RecoilValue, useRecoilValue } from "recoil";

function headerList(isLoggedIn: string | null) {
  if (isLoggedIn === null) {
    return (
      <>
        <li>
          <a
            href="/login"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Login
          </a>
        </li>
        <li>
          <a
            href="/signup"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Sign Up
          </a>
        </li>
      </>
    );
  } else if (isLoggedIn === "customer") {
    return (
      <>
        <li>
          <a
            //********************************Give the link here*****************************
            href="/login"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Profile
          </a>
        </li>
        <li>
          <a
            //********************************Give the link here*****************************
            href="/login"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Book
          </a>
        </li>
        <li>
          <a
            //********************************Give the link here*****************************
            href="/login"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Bookings
          </a>
        </li>
        <li>
          <a
            //********************************Give the link here*****************************
            href="/login"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Logout
          </a>
        </li>
      </>
    );
  } else if (isLoggedIn === "barber") {
    return (
      <>
        <li>
          <a
            //********************************Give the link here*****************************
            href="/login"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Profile
          </a>
        </li>
        <li>
          <a
            //********************************Give the link here*****************************
            href="/login"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Bookings
          </a>
        </li>
        <li>
          <a
            //********************************Give the link here*****************************
            href="/login"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Log Out
          </a>
        </li>
      </>
    );
  } else if (isLoggedIn === "owner") {
    return (
      <>
        <li>
          <a
            //********************************Give the link here*****************************
            href="/login"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Profile
          </a>
        </li>
        <li>
          <a
            //********************************Give the link here*****************************
            href="/login"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Barbers
          </a>
        </li>
        <li>
          <a
            //********************************Give the link here*****************************
            href="/login"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Bookings
          </a>
        </li>
        <li>
          <a
            //********************************Give the link here*****************************
            href="/login"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Analytics
          </a>
        </li>
        <li>
          <a
            //********************************Give the link here*****************************
            href="/login"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Logout
          </a>
        </li>
      </>
    );
  }
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const isLoggedIn = useRecoilValue(isLoggedInAtom); // Assuming this state for login status
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const closeProfileMenu = () => {
    // Close the profile menu with a delay
    timerRef.current = setTimeout(() => {
      setProfileMenuOpen(false);
    }, 1000); // 1000 milliseconds (1 second) delay
  };

  const handleMouseEnter = () => {
    // Clear the timer to keep the profile menu open
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    // Close the profile menu with a delay
    closeProfileMenu();
  };

  return (
    <nav className="border-gray-200 bg-gray-900 md:pb-5 py-5">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto">
        <button
          onClick={toggleMobileMenu}
          className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200text-gray-400  focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`max-w-screen-xl mx-auto md:flex-grow md:flex md:items-center md:justify-center ${
            mobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="font-large flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-6 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-80 border-gray-700 justify-center">
            {Menuitems.map((item, index) => (
              <button key={index} className="md:inline-block">
                <a
                  href={item.url}
                  className="block py-2 px-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-white hover:text-white hover:bg-transparent"
                >
                  <i className={item.icon}></i>
                  {item.title}
                </a>
              </button>
            ))}
          </ul>
        </div>

        <div className="relative">
          <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={toggleProfileMenu}
            className="flex items-center justify-center w-10 h-10 text-white rounded-full focus:outline-none"
          >
            <img
              src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          </button>
          {profileMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <ul className="py-2">{headerList(isLoggedIn)}</ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
