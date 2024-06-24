import React, { useEffect } from 'react';
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
import ProtectedRoutes from './components/ProtectedRoutes';
import RegisterRoutes from './components/RegisterRoutes';
import ViewProfile from './components/ViewProfile';
import Feedback from './components/Feedback';
import { UserProvider } from './contexts/userContext';

function App() {
  useEffect(() => {
    const clearSessionStorage = () => {
      sessionStorage.clear();
    };
    window.addEventListener('load', clearSessionStorage);
    return () => {
      window.removeEventListener('load', clearSessionStorage);
    };
  }, []); 
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Routes>

          {/* only to new users*/}
          <Route element={<RegisterRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signupmail" element={<SignupMail />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Route>

          {/* handled inline */}
          <Route path="/signupacnt" element={<SignupAcnt />} />
          <Route path="/verifyotp" element={<OtpPage />} />
          <Route path="/resetpassword" element={<Resetpassword />} />

          {/* only to logged in users */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/updatePassword" element={<UpdatePassword />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/myContributions" element={<MyContributions />} />
            <Route path="/viewProfile" element={<ViewProfile />} />
            <Route path="/feedback" element={<Feedback />} />
          </Route>

          {/*Access to all*/}
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/curriculum" element={<Curriculum />} />

        </Routes>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
