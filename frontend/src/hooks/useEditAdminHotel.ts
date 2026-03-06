import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { API_BASE_URL } from '../lib/api';

export const useEditAdminHotel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [hotelId, setHotelId] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    country: "",
    stars: "0"
  });

  useEffect(() => {
    if (!location.state || !location.state.hotel) {
      toast.error("Keine Hoteldaten gefunden.");
      navigate('/admin/dashboard');
      return;
    }

    const { hotel } = location.state;
    setHotelId(hotel.id || hotel.hotel_id || hotel._id);

    setFormData({
      title: hotel.title || hotel.name || "",
      description: hotel.description || hotel.beschreibung || "",
      city: hotel.city || hotel.ort || "",
      country: hotel.country || hotel.land || "",
      stars: hotel.stars || hotel.hotelsterne ? String(hotel.stars || hotel.hotelsterne) : "0"
    });
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('accessToken');

    try {
      if (!hotelId) throw new Error("Hotel ID fehlt.");

      const starsInt = parseInt(formData.stars, 10);
      const response = await fetch(`${API_BASE_URL}/admin/hotels/${hotelId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          city: formData.city,
          country: formData.country,
          stars: isNaN(starsInt) ? 0 : starsInt
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        const errorMsg = errData?.message
          ? (Array.isArray(errData.message) ? errData.message.join(', ') : errData.message)
          : `Fehler beim Speichern (${response.status})`;
        throw new Error(errorMsg);
      }

      toast.success("Hotel erfolgreich aktualisiert!");
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast.error(`Fehler: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { formData, setFormData, loading, handleSubmit, navigate };
};