import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import BonsPlans from './pages/BonsPlans';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Admin from './pages/Admin';
import SplashScreen from './components/SplashScreen';

export default function App() {
  const { i18n } = useTranslation();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <AuthProvider>
        <Router>
          <div className={`min-h-screen bg-gray-50 flex flex-col transition-opacity duration-2000 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/restaurants" element={<Restaurants />} />
                <Route path="/bons-plans" element={<BonsPlans />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </>
  );
}