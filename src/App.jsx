import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import Home from './pages/Home';
import Registration from './components/auth/Registration';
import Login from './components/auth/Login';
import CarDetails from './pages/car_details';

import Navbar from './components/Navbar';

const App = () => (
  <React.StrictMode>
    <Router className="router">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign_up" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/car_details/:carId" element={<CarDetails />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

export default App;
