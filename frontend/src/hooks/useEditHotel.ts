import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { API_BASE_URL } from '../lib/api';

export const useEditHotel = () => {
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
      navigate('/owner/dashboard');
      return;
    }

    const { hotel } = location.state;
    setHotelId(hotel.id || hotel.hotel_id || hotel.hotelId);

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
      if (!hotelId) throw new Error("Hotel ID fehlt. Bitte Seite neu laden.");

      const starsInt = parseInt(formData.stars, 10);

      const updateRes = await fetch(`${API_BASE_URL}/owner/hotels/${hotelId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        // FIX: Wir nutzen jetzt exakt die englischen Felder von HDH aus der Excel!
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          city: formData.city,
          country: formData.country,
          stars: isNaN(starsInt) ? 0 : starsInt
        })
      });

      if (!updateRes.ok) {
          const errData = await updateRes.json().catch(() => null);
          // FIX: Falls NestJS ein Array mit mehreren Fehlern schickt, machen wir einen schönen Text daraus
          const errorMsg = errData?.message 
              ? (Array.isArray(errData.message) ? errData.message.join(', ') : errData.message)
              : `Fehler beim Speichern (${updateRes.status}).`;
          throw new Error(errorMsg);
      }

      toast.success("Hotel erfolgreich aktualisiert!");
      navigate('/owner/dashboard');

    } catch (error: any) {
      console.error("Backend Fehler:", error);
      toast.error(`Fehler: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    formData,
    setFormData,
    handleSubmit,
    navigate
  };
};