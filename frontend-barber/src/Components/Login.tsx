import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { isLoggedInAtom } from "../recoil/atoms.ts";
import { useRecoilState } from "recoil";
export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedProfile(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Based on the selected profile, send the corresponding request
    if (selectedProfile === "customer") {
      // Send request to customer login endpoint
      fetch("http://localhost:3000/api/user/signin-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle response as needed

          console.log(data);
          setIsLoggedIn(selectedProfile);
          console.log("is logged in is: ", isLoggedIn);
          localStorage.setItem("UserId", data.UserId);
          localStorage.setItem("token", data.token);
          navigate("/userprofile");
          alert(data.message);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (selectedProfile === "barber") {
      // Send request to barber login endpoint
      fetch("http://localhost:3000/api/barber/signin-barber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle response as needed
          console.log(data);
          setIsLoggedIn(selectedProfile);
          console.log("is logged in is: ", isLoggedIn);
          localStorage.setItem("barberId", data.barberId);
          localStorage.setItem("token", data.token);
          navigate("/barberprofile");
          alert(data.message);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (selectedProfile === "owner") {
      // Send request to owner login endpoint
      fetch("http://localhost:3000/api/owner/signin-owner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle response as needed
          console.log(data);
          setIsLoggedIn(selectedProfile);
          console.log("is logged in is: ", isLoggedIn);
          localStorage.setItem("ownerId", data.ownerId);
          localStorage.setItem("token", data.token);
          navigate("/ownerprofile");
          alert(data.message);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <div className="flex justify-center items-center h-screen relative">
      <form className="form pb-10" onSubmit={handleSubmit}>
        <p id="heading">Login</p>
        <p className="text-white text-xl">Select Your Profile</p>

        <div className="radio-input py-10">
          <input
            value="customer"
            name="profile"
            id="customer"
            type="radio"
            onChange={handleProfileChange}
          />
          <label htmlFor="customer">Customer</label>
          <input
            value="barber"
            name="profile"
            id="barber"
            type="radio"
            onChange={handleProfileChange}
          />
          <label htmlFor="barber">Barber</label>
          <input
            value="owner"
            name="profile"
            id="owner"
            type="radio"
            onChange={handleProfileChange}
          />
          <label htmlFor="owner">Owner</label>
        </div>
        <div className="field mb-3">
          <svg
            className="input-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
          </svg>
          <input
            autoComplete="off"
            placeholder="Username"
            className="input-field"
            type="text"
            onChange={handleUsernameChange}
          />
        </div>
        <div className="field">
          <svg
            className="input-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            placeholder="Password"
            className="input-field"
            type="password"
            onChange={handlePasswordChange}
          />
        </div>
        <div className="btn">
          <button className="button1 mr-5" type="submit">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
          <button className="button2" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
