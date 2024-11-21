import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, Heart, User, LogOut, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              BonsPlansJerusalem
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/restaurants" 
              className={`${location.pathname === '/restaurants' ? 'text-orange-600' : 'text-gray-700'} hover:text-orange-600`}
            >
              {t('nav.restaurants')}
            </Link>
            <Link 
              to="/bons-plans" 
              className={`${location.pathname === '/bons-plans' ? 'text-orange-600' : 'text-gray-700'} hover:text-orange-600`}
            >
              {t('nav.deals')}
            </Link>
            <Link 
              to="/blog" 
              className={`${location.pathname === '/blog' ? 'text-orange-600' : 'text-gray-700'} hover:text-orange-600`}
            >
              {t('nav.blog')}
            </Link>
            <Link 
              to="/contact" 
              className={`${location.pathname === '/contact' ? 'text-orange-600' : 'text-gray-700'} hover:text-orange-600`}
            >
              {t('nav.contact')}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Link to="/restaurants" className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="w-5 h-5 text-gray-600" />
            </Link>
            {user && (
              <Link to="/favoris" className="p-2 hover:bg-gray-100 rounded-full">
                <Heart className="w-5 h-5 text-gray-600" />
              </Link>
            )}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <User className="w-5 h-5 text-gray-600" />
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  {user ? (
                    <>
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        {user.name}
                      </div>
                      {user.isAdmin && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowUserMenu(false)}
                        >
                          {t('nav.admin')}
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        {t('nav.logout')}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        {t('nav.login')}
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        {t('nav.register')}
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              to="/restaurants"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.restaurants')}
            </Link>
            <Link
              to="/bons-plans"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.deals')}
            </Link>
            <Link
              to="/blog"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.blog')}
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}