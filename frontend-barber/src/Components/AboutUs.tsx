import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
export function AboutUs()
{   
    const navigate = useNavigate();
    return(
        <div>
            <div className="flex flex-col text-center w-full mt-10">
                        <h1 className="sm:text-5xl text-2xl font-medium title-font  text-gray-900">
                            <Typewriter onInit={(typewriter) => {
                                typewriter
                                    .typeString("About Us")
                                    .pauseFor(1500)
                                    .start();
                            }} />
                        </h1>
                    </div>
                    <div className="flex flex-col text-center w-full mb-12">
      <p className="lg:w-2/3 mx-auto leading-relaxed mt-10 text-xl">Almost anyone who's been to a barbershop has had a bad haircut experience. It happens to barbers too. They definitely have their share of terrible barbershop experiences — double bookings, no-shows, last-minute cancellations, and an inbox of the "can you fit me in" text's from their clients. This shared frustration motivated us to start Dapr. We wanted to solve our problems, making a haircut simple, painless and risk-free. But quickly realized we could empower barbers to become the entrepreneurs they've always envisioned. We want to change the narrative. Tip the scales and create more success stories that barbers and clients share. We have a vision of what the grooming industry can be. We're building the largest global barbershop brand. Bringing that offline barbershop experience into the 21st century. Humble and Hungry.</p>
    </div>
  <div className="px-5 py-24 mx-auto">
    <div className="text-center mb-20">
      <h1 className="sm:text-3xl text-3xl font-medium text-center title-font text-gray-900 mb-4">What we aim to provide </h1>
    </div>
    <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
      <div className="p-2 sm:w-1/2 w-full">
        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>
          <span className="title-font font-medium">Simplifying booking for barbers and clients, minimizing scheduling hassles.</span>
        </div>
      </div>
      <div className="p-2 sm:w-1/2 w-full">
        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>
          <span className="title-font font-medium">Ensuring a risk-free experience with quality guarantees for clients.</span>
        </div>
      </div>
      <div className="p-2 sm:w-1/2 w-full">
        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>
          <span className="title-font font-medium">Empowering barbers to achieve entrepreneurial success with support and resources.</span>
        </div>
      </div>
      <div className="p-2 sm:w-1/2 w-full">
        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>
          <span className="title-font font-medium">Transforming industry perception by amplifying success stories and positive experiences.</span>
        </div>
      </div>
      <div className="p-2 sm:w-1/2 w-full">
        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>
          <span className="title-font font-medium">Building Dapr into the premier global barbershop brand, merging tradition with innovation.</span>
        </div>
      </div>
      <div className="p-2 sm:w-1/2 w-full">
        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>
          <span className="title-font font-medium">Fostering a culture of excellence and professionalism within the grooming industry.</span>
        </div>
      </div>
    </div>
    <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg " onClick={()=>navigate("/signup")}>Signup Now</button>
  </div>
        </div>
    )
}