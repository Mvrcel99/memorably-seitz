import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { API_BASE_URL } from '../lib/api';

export const useCreateAdminHotel = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    country: "",
    stars: "1",
    ownerId: "",
    latitude: "",
    longitude: "",
    freeCancellation: "24"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('accessToken');

    try {
      const starsInt = parseInt(formData.stars, 10);
      const ownerIdInt = parseInt(formData.ownerId, 10);
      const latFloat = parseFloat(formData.latitude);
      const lngFloat = parseFloat(formData.longitude);
      const cancelInt = parseInt(formData.freeCancellation, 10);

      const response = await fetch(`${API_BASE_URL}/admin/hotels`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          ownerId: isNaN(ownerIdInt) ? 0 : ownerIdInt,
          description: formData.description,
          city: formData.city,
          country: formData.country,
          stars: isNaN(starsInt) ? 1 : starsInt,
          longitude: isNaN(lngFloat) ? undefined : lngFloat,
          latitude: isNaN(latFloat) ? undefined : latFloat,
          free_Cancellation_Until_Hours_Before_CheckIn: isNaN(cancelInt) ? undefined : cancelInt
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        const errorMsg = errData?.message
          ? (Array.isArray(errData.message) ? errData.message.join(', ') : errData.message)
          : `Fehler beim Erstellen (${response.status})`;
        throw new Error(errorMsg);
      }

      toast.success("Hotel erfolgreich im System angelegt!");
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast.error(`Fehler: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { formData, setFormData, loading, handleSubmit, navigate };
};