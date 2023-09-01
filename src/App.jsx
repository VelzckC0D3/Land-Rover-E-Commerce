import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import "./index.css";
import Home from "./components/Home";
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login";
import VehicleDetails from "./components/vehicle/VehicleDetails";
import Navbar from "./components/Navbar";
import Vehicles from "./components/vehicle/Vehicles";
import NewReservation from "./components/reservation/NewReservation";
import NewCarReservation from "./components/reservation/NewCarReservation";
import MyReservations from "./components/reservation/MyReservations";
import DeleteVehicle from "./components/vehicle/DeleteVehicle";
import NewVehicle from "./components/vehicle/NewVehicle";
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
          <Route path="/vehicle-details/:carId" element={<VehicleDetails />} />
          <Route path="/new-reservation" element={<NewReservation />} />
          <Route path="/car-reservation/:carId" element={<NewCarReservation />} />
          <Route path="/my-reservations" element={<MyReservations />} />
          <Route path="/delete-vehicle" element={<DeleteVehicle />} />
          <Route path="/new-vehicle" element={<NewVehicle />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

export default App;
