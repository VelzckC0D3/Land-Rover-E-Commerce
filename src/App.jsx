import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import Home from './pages/Home';
import Registration from './components/auth/Registration';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';

import Navbar from './components/Navbar';

const App = () => (
  <React.StrictMode>
    <Router>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign_up" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

export default App;
