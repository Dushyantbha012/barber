import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from './Components/Loading';
import './App.css'
import { Footer } from './Components/Footer';
import { AboutUs } from './Components/AboutUs';
import { Features } from './Components/Features';
import { Joinus } from './Components/Joinus';
import { Pricing } from './Components/Pricing';
import { Header } from './Components/Header';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Bookings from './Components/Bookings';
import Bookbarber from './Components/Bookbarber';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <BrowserRouter>
      <Header />
        <div className="flex-1">
          {isLoading ? (
          <Loading />
          ) : (
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/aboutus' element={<AboutUs />} />
              <Route path='/features' element={<Features />} />
              <Route path='/joinus' element={<Joinus />} />
              <Route path='/pricing' element={<Pricing />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/bookings' element={<Bookings />} />
              <Route path='/book-barber' element={< Bookbarber/>} />
              <Route path='/login' element={< Login/>} />
              <Route path='/signup' element={< Signup/>} />
              


            </Routes>
          )}
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
