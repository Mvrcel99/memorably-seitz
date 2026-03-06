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
    stars: "1" // Sterne starten bei 1 (Backend-Regel)
  });

  useEffect(() => {
    if (!location.state || !location.state.hotel) {
      toast.error("Keine Hoteldaten gefunden.");
      navigate('/admin/dashboard');
      return;
    }

    const { hotel } = location.state;
    console.log("Zu bearbeitendes Hotel geladen:", hotel);
    
    // Fängt alle möglichen ID-Namen aus dem Backend ab
    const extractedId = hotel.id || hotel.hotel_id || hotel._id || hotel.hotelId;
    setHotelId(extractedId);

    setFormData({
      title: hotel.title || hotel.name || "",
      description: hotel.description || hotel.beschreibung || "",
      city: hotel.city || hotel.ort || "",
      country: hotel.country || hotel.land || "",
      stars: hotel.stars || hotel.hotelsterne ? String(hotel.stars || hotel.hotelsterne) : "1"
    });
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Verhindert, dass die Seite neu lädt
    console.log("Button geklickt! Formular wird verarbeitet...");
    
    if (!hotelId) {
        toast.error("Fehler: Konnte die Hotel-ID nicht finden.");
        return;
    }

    setLoading(true);
    const token = localStorage.getItem('accessToken');

    try {
      const starsInt = parseInt(formData.stars, 10);
      const payload = {
        title: formData.title,
        description: formData.description,
        city: formData.city,
        country: formData.country,
        stars: isNaN(starsInt) ? 1 : starsInt
      };

      console.log("Sende Daten an Backend:", payload);

      const response = await fetch(`${API_BASE_URL}/admin/hotels/${hotelId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log("Backend Antwort Status:", response.status);

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
      console.error("Fehler beim Fetch:", error);
      toast.error(`Fehler: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { formData, setFormData, loading, handleSubmit, navigate };
};