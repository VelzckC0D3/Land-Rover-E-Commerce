import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import Home from './pages/Home';
import Registration from './components/auth/Registration';
import Login from './components/auth/Login';
import CarDetails from './pages/car_details';

import Navbar from './components/Navbar';
import Vehicles from './pages/Vehicles';
import Reservation from './pages/Reservation'
import ReservationForm from './components/car/ReservationForm'
/* import My_reservations from './pages/My_reservations' */
import DeleteCar from './components/car/DeleteCar'
import AddCar from './components/car/AddCar';

const App = () => (
  <React.StrictMode>
    <Router className="router">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/sign_up" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/car_details/:carId" element={<CarDetails />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/reservation/:carId" element={<ReservationForm />} />
        {/* <Route path="/my-reservs" element={<My_reservations />} /> */}
        <Route path="/deletecars" element={<DeleteCar />} />
        <Route path="/addcars" element={<AddCar />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

export default App;