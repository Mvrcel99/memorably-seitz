import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { API_BASE_URL } from '../lib/api';

export const useEditRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const [hotelId, setHotelId] = useState("");
  const [roomId, setRoomId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pricePerNight: "",
    maxGuests: "",
    roomNumber: ""
  });

  useEffect(() => {
    if (!location.state || !location.state.room || !location.state.hotelId) {
      toast.error("Keine Zimmerdaten gefunden.");
      navigate('/owner/dashboard');
      return;
    }

    const { room, hotelId } = location.state;
    setHotelId(hotelId);
    setRoomId(room.id);

    setFormData({
      name: room.name || "",
      description: room.description || "",
      pricePerNight: room.pricePerNight ? room.pricePerNight.toString() : "",
      maxGuests: room.maxGuests ? room.maxGuests.toString() : "",
      roomNumber: room.roomNumber ? room.roomNumber.toString() : ""
    });
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('accessToken');

    try {
      const priceStr = formData.pricePerNight.toString().replace(',', '.');
      const price = parseFloat(priceStr);
      if (isNaN(price)) throw new Error("Der Preis ist ungültig.");

      const guests = parseInt(formData.maxGuests.toString(), 10);
      if (isNaN(guests)) throw new Error("Die Gästeanzahl ist ungültig.");

      const roomNumStr = formData.roomNumber.toString().trim();
      if (roomNumStr === "") throw new Error("Bitte geben Sie eine Zimmernummer an.");

      const updateRes = await fetch(`${API_BASE_URL}/owner/hotels/${hotelId}/rooms/${roomId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bezeichnung: formData.name,
          beschreibung: formData.description,
          basispreis: price,
          max_anzahl: guests,
          zimmernr_hotel: roomNumStr
        })
      });

      if (!updateRes.ok) {
          const errData = await updateRes.json().catch(() => null);
          throw new Error(errData?.message || `Fehler beim Speichern (${updateRes.status}).`);
      }

      toast.success("Zimmer erfolgreich aktualisiert!");
      navigate('/owner/dashboard');

    } catch (error: any) {
      console.error(error);
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