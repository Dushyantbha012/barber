import { useState, useEffect } from "react";
export default function UserProfile() {
  const [resData, setResData] = useState({
    name: "",
    username: "",
    city: "",
    ratings: "",
    bookings: [],
    email: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        let token = localStorage.getItem("token");
        if (token === undefined) token = "";
        fetch("http://localhost:3000/api/user/user-details", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token || "",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("recieved data :", data);
            setResData(data);
          });
      } catch (error) {
        console.log(
          "erorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
        );
        console.error("Error:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <div className="p-16">
        <div className="p-8 bg-white shadow mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {resData.bookings.length}
                </p>
                <p className="text-gray-400">Bookings</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">hu</p>
                <p className="text-gray-400">Ratings</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 ">
                {" "}
                Book a barber{" "}
              </button>
              <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                {" "}
                Bookings{" "}
              </button>
            </div>
          </div>
          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">
              {resData.name}
            </h1>
            <p className="mt-8 text-gray-500">{resData.email}</p>
            <p className="mt-2 text-gray-500">{resData.city}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
