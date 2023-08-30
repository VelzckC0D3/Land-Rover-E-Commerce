import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import "./index.css";
import Home from "./pages/Home";
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login";
import CarDetails from "./components/car/VehicleDetails";
import Navbar from "./components/Navbar";
import Vehicles from "./pages/Vehicles";
import Reservation from "./pages/Reservation";
import ReservationForm from "./components/car/ReservationForm";
import My_reservations from "./pages/My_reservations";
import DeleteCar from "./components/car/DeleteCar";
import AddCar from "./components/car/AddCar";
import { authSuccess } from "./features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      dispatch(authSuccess({ token: storedToken, user: storedUser }));
    }
  }, [dispatch]);

  return (
    <React.StrictMode>
      <Toaster />
      <Router className="router">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/sign_up" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/VehicleDetails/:carId" element={<CarDetails />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/reservation/:carId" element={<ReservationForm />} />
          <Route path="/my-reservs" element={<My_reservations />} />
          <Route path="/deletecars" element={<DeleteCar />} />
          <Route path="/addcars" element={<AddCar />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

export default App;
