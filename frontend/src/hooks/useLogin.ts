import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { API_BASE_URL } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        const userRole = data.user.role.toLowerCase(); 
        
        login(data.accessToken, userRole);
        toast.success("Erfolgreich angemeldet!");

        if (userRole === 'admin') {
          navigate('/admin/dashboard');
        } else if (userRole === 'hotelbesitzer' || userRole === 'hotel_owner') {
          navigate('/owner/dashboard');
        } else if (userRole === 'kunde' || userRole === 'user') {
          navigate('/');
        } else {
          toast.error(`Unbekannte Rolle vom Server: ${data.user.role}`);
        }
      } else {
        const errData = await response.json();
        toast.error(errData.message || "Die Anmeldedaten sind falsch.");
      }
    } catch (err) {
      toast.error("Es konnte keine Verbindung zum Server hergestellt werden.");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading };
};