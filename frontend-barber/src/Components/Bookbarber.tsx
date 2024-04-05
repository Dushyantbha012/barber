import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Bookbarber.css';

export default function Bookbarber() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>('');

  const timeSlots = [
    { startTime: '09:00 AM', endTime: '10:00 AM' },
    { startTime: '10:00 AM', endTime: '11:00 AM' },
    // Add more time slots as needed
  ];

  const handleTimeSlotChange = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  return (
    <div className="flex justify-center items-center h-screen relative ">
      <form className="form pb-10 w-100">
        <p id="heading">Book A Barber</p>
        <input type="text" className="search-input w-auto" placeholder="Search Barber..." />

        <div className="field w-9 mb-5 ">
          <label htmlFor="basicDatePicker" className='pr-4 '>Select Date:</label>
         <DatePicker
            className='text-black w-[150px] pl-4 bg-gradient-to-r from-gray-300 to-gray-200 rounded'
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()} 
          />
        </div>
        <div>
        <div>
      <div className="field w-9 mb-5">
        <label htmlFor="timeSlotPicker" className='pr-4'>Time Slot</label>
        <select
          id="timeSlotPicker"
          className='text-black w-[150px] pl-4 bg-gradient-to-r from-gray-300 to-gray-200 rounded'
          value={selectedTimeSlot}
          onChange={(e) => handleTimeSlotChange(e.target.value)}
        >
          <option value="">Time Slot..</option>
          {timeSlots.map((slot, index) => (
            <option key={index} value={slot.startTime}>{`${slot.startTime} - ${slot.endTime}`}</option>
          ))}
        </select>
      </div>
    </div>
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
            placeholder="Your Username"
            className="input-field"
            type="text"
          />
        </div>
        
        <div className="btn">
         
          <button className="button2">
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
}
