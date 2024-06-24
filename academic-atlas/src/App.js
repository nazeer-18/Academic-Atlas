import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignupMail from './components/SignupMail';
import SignupAcnt from './components/SignupAcnt';
import ForgotPassword from './components/ForgotPassword';
import OtpPage from './components/OtpPage';
import Resetpassword from './components/Resetpassword';
import MainPage from './components/MainPage';
import Contribute from './components/Contribute';
import UpdatePassword from './components/UpdatePassword';
import Footer from './components/Footer';
import Faq from './components/Faq';
import ContactUs from './components/ContactUs';
import Curriculum from './components/Curriculum';
import MyContributions from './components/MyContributions';
import { UserProvider } from './contexts/userContext';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signupmail" element={<SignupMail />} />
          <Route path="/signupacnt" element={<SignupAcnt />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/verifyotp" element={<OtpPage />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/updatePassword" element={<UpdatePassword />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/myContributions" element={<MyContributions />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/curriculum" element={<Curriculum />} />
        </Routes>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
