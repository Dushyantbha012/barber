import  { useState, useEffect } from 'react';

interface Booking {
    date: Date;
    barber: string;
    completed: boolean;
}

export default function UserBookings(): JSX.Element {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                let uname = localStorage.getItem("username");
                
            
                const response = await fetch('http://localhost:3000/user/user-bookings', {
                    method: 'GET',
                    body: JSON.stringify({uname})
                });
                if (response.ok) {
                    const data = await response.json();
                    setBookings(data.bookings);
                } else {
                    console.error('Failed to fetch user bookings');
                }
            } catch (error) {
                console.error('Error fetching user bookings:', error);
            }
        };
        fetchUserBookings();
    }, []);

   

    return (
        <div className="flex justify-center items-center h-screen relative ">
              <form className="form pb-10 w-100">
                <p id="heading">Your Bookings</p>
                <input type="text" className="search-input w-auto" placeholder="Search Bookings..." />
                <ul>
                    {bookings.map((booking: Booking, index: number) => (
                        <li key={index} className='text-black rounded bg-gradient-to-r from-gray-300 to-gray-200 p-2 mb-2' >
                            <p>{`Barber: ${booking.barber}`}</p>
                            <p>{`Date: ${new Date(booking.date).toLocaleDateString()}`}</p>
                            <p>{`Completed: ${booking.completed ? 'Yes' : 'No'}`}</p>
                        </li>
                    ))}
                </ul>
            </form>
        </div>
    );
}
