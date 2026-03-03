import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Building2, UserCircle, Search, LogOut, LayoutDashboard, ClipboardList } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { isLoggedIn, userRole, logout } = useAuth();

  const isHome = location.pathname === '/'; 
  const isLoginPage = location.pathname === '/login';
  const isSearchPage = location.pathname === '/search';
  const isOnDashboard = location.pathname.includes('dashboard');
  
  const isAlwaysBluePage = [
    '/impressum', 
    '/ueber-uns', 
    '/login', 
    '/admin/dashboard', 
    '/owner/dashboard',
    '/owner/rooms/create',
    '/admin/hotels/create',
    '/admin/hotels/edit',
    '/bookings' 
  ].some(path => location.pathname.includes(path));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]); 

  const shouldBeBlue = isScrolled || isAlwaysBluePage;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDashboardClick = () => {
    if (userRole === 'admin') navigate('/admin/dashboard');
    else if (userRole === 'hotel_owner') navigate('/owner/dashboard');
  };

  const showLoggedInState = isLoggedIn && !isHome && !isLoginPage;

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
      shouldBeBlue ? "bg-blue-600 py-3 shadow-2xl" : "bg-transparent py-6"
    }`}>
      <div 
        className="cursor-pointer transition-transform active:scale-95"
        onClick={() => navigate('/')}
      >
        
     <img src="/img/logo.png" alt="Memorably Logo" className="h-10 w-auto" />
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {isSearchPage && (
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-white/10 rounded-full"
            onClick={() => navigate('/')}
          >
            <Search className="h-5 w-5" />
          </Button>
        )}

        {showLoggedInState && !isOnDashboard && (
           <Button 
             variant="ghost" 
             className="text-white hover:bg-white/10 rounded-full px-5 py-2 flex items-center gap-2 transition-all font-semibold"
             onClick={handleDashboardClick}
           >
             <LayoutDashboard className="h-4 w-4" />
             <span className="hidden sm:inline">Dashboard</span>
           </Button>
        )}

        {(!showLoggedInState) && (
          <>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10 rounded-full px-5 py-2 flex items-center gap-2 transition-all font-semibold"
              onClick={() => navigate('/bookings')} 
            >
              <ClipboardList className="h-4 w-4" />
              <span className="hidden sm:inline">Meine Buchungen</span>
            </Button>
            
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10 rounded-full px-5 py-2 flex items-center gap-2 transition-all font-semibold"
              onClick={() => navigate('/search')}
            >
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Buchen</span>
            </Button>
          </>
        )}

        {showLoggedInState ? (
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10 rounded-full px-5 py-2 flex items-center gap-2 transition-all font-semibold"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10 rounded-full px-5 py-2 flex items-center gap-2 transition-all font-semibold"
            onClick={() => navigate('/login')}
          >
            <UserCircle className="h-5 w-5" />
            <span className="hidden sm:inline">Login</span>
          </Button>
        )}
      </div>
    </nav>
  );
};