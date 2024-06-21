import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Resetpassword from './components/Resetpassword';
import SignupMail from './components/SignupMail';
import SignupAcnt from './components/SignupAcnt';
import ForgotPassword from './components/ForgotPassword';
import MainPage from './components/MainPage';
import Contribute from './components/Contribute';
import Forgot2pwd from './components/Forgot2pwd';
import { UserProvider } from './contexts/userContext';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/signupmail" element={<SignupMail />} />
        <Route path="/signupacnt" element={<SignupAcnt />} />      
        <Route path="/main" element={<MainPage />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/forgot2pwd" element={<Forgot2pwd />} />
      </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
