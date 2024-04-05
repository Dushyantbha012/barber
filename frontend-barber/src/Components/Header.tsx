import { Menuitems } from "./Menuitems.ts";
import { useState, useRef } from "react";
import { isLoggedInAtom } from "../recoil/atoms.ts";
import { RecoilValue, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
function headerList() {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  console.log("is logged in is in headerclick: ", isLoggedIn);
  if (isLoggedIn === null) {
    return (
      <>
        <li
          onClick={() => {
            navigate("/login");
          }}
          className="p-4"
        >
          Login
        </li>
        <li
          onClick={() => {
            navigate("/signup");
          }}
          className="p-4"
        >
          Sign Up
        </li>
      </>
    );
  } else if (isLoggedIn === "customer") {
    return (
      <>
        <li
          onClick={() => {
            navigate("/UserProfile");
          }}
          className="p-4"
        >
          Profile
        </li>
        <li
          onClick={() => {
            navigate("/book-barber");
          }}
          className="p-4"
        >
          Book
        </li>
        <li
          onClick={() => {
            navigate("/userbookings");
          }}
          className="p-4"
        >
          Bookings
        </li>
        <li
          onClick={() => {
            navigate("/logout");
          }}
          className="p-4"
        >
          LogOut
        </li>
      </>
    );
  } else if (isLoggedIn === "barber") {
    return (
      <>
        <li
          onClick={() => {
            navigate("/BarberProfile");
          }}
          className="p-4"
        >
          Profile
        </li>
        <li
          onClick={() => {
            navigate("/bookings");
          }}
          className="p-4"
        >
          Bookings
        </li>
        <li
          onClick={() => {
            navigate("/logout");
          }}
          className="p-4"
        >
          LogOut
        </li>
      </>
    );
  } else if (isLoggedIn === "owner") {
    return (
      <>
        <li
          onClick={() => {
            navigate("/OwnerProfile");
          }}
          className="p-4"
        >
          Profile
        </li>
        <li
          onClick={() => {
            navigate("/barbers");
          }}
          className="p-4"
        >
          Barbers
        </li>
        <li
          onClick={() => {
            navigate("/bookings");
          }}
          className="p-4"
        >
          Bookings
        </li>
        <li
          onClick={() => {
            navigate("/analytics");
          }}
          className="p-4"
        >
          Analytics
        </li>
        <li
          onClick={() => {
            navigate("/logout");
          }}
          className="p-4"
        >
          LogOut
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
  const navigate = useNavigate();

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
              <button key={index} className="md:inline-block text-white">
                <li
                  className={item.icon}

                  onClick={() => {
                    navigate(item.url);
                  }}
                ></li>
                
                {item.title}
              </button>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="flex items-center justify-center w-10 h-10 text-white rounded-full focus:outline-none"
          >
            <img
              src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
              alt="Profile"
              className="w-8 h-8 rounded-full"
              onClick={toggleProfileMenu}
            />
          </div>
          <div
            style={profileMenuOpen ? {} : { visibility: "hidden" }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ul className="py-2">{headerList()}</ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
