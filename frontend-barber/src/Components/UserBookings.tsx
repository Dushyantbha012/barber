import { useState, useEffect } from "react";

interface Booking {
  date: Date;
  barber: string;
  completed: boolean;
}

export default function UserBookings(): JSX.Element {
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
    <div className="flex justify-center items-center h-screen relative ">
      <form className="form pb-10 w-100">
        <p id="heading">Your Bookings</p>
        <input
          type="text"
          className="search-input w-auto"
          placeholder="Search Bookings..."
        />
        <ul>
          {resData.bookings.map((booking: Booking, index: number) => {
            return (
              <li
                key={index}
                className="text-black rounded bg-gradient-to-r from-gray-300 to-gray-200 p-2 mb-2"
              >
                <p>{`Barber: ${booking.barber}`}</p>
                <p>{`Date: ${new Date(booking.date).toLocaleDateString()}`}</p>
                <p>{`Completed: ${booking.completed ? "Yes" : "No"}`}</p>
              </li>
            );
          })}
        </ul>
      </form>
    </div>
  );
}
