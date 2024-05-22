import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Login from './components/Login';

import Signup from './components/Signup';
import Resetpassword from './components/Resetpassword';

import SignupMail from './components/SignupMail';
import SignupAcnt from './components/SignupAcnt';
import ForgotPassword from './components/ForgotPassword';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/resetpassword" element={<Resetpassword />} />


        <Route path="/signupmail" element={<SignupMail />} />
        <Route path="/signupacnt" element={<SignupAcnt />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
