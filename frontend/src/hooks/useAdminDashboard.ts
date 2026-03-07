import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { API_BASE_URL } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export const useAdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [hotels, setHotels] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingFeatureId, setDeletingFeatureId] = useState<string | null>(null);
  const [togglingHotelId, setTogglingHotelId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      logout();
      navigate('/login');
      return;
    }

    try {
      const hotelsRes = await fetch(`${API_BASE_URL}/admin/hotels`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        }
      });

      const featuresRes = await fetch(`${API_BASE_URL}/admin/ausstattung`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        }
      });

      if (hotelsRes.status === 401 || featuresRes.status === 401) throw new Error("Unauthorized");

      if (hotelsRes.ok) {
        const hotelsData = await hotelsRes.json();
        setHotels(Array.isArray(hotelsData) ? hotelsData : []);
      }

      if (featuresRes.ok) {
        const featuresData = await featuresRes.json();
        setFeatures(Array.isArray(featuresData) ? featuresData : []);
      }

    } catch (error) {
      toast.error("Fehler beim Laden der Admin-Daten.");
    } finally {
      setLoading(false);
    }
  }, [navigate, logout]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleteFeature = async (feature: any) => {
    const featureName = feature.name || feature.bezeichnung || "diese Ausstattung";
    if (!window.confirm(`Möchten Sie "${featureName}" wirklich unwiderruflich löschen?`)) return;

    const featureId = feature.id || feature.ausstattung_id || feature._id;
    if (!featureId) {
      toast.error("Fehler: Feature-ID fehlt.");
      return;
    }

    setDeletingFeatureId(featureId);
    const token = localStorage.getItem('accessToken');

    try {
      const response = await fetch(`${API_BASE_URL}/admin/ausstattung/${featureId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setFeatures(current => current.filter(f => (f.id || f.ausstattung_id || f._id) !== featureId));
        toast.success("Ausstattung erfolgreich gelöscht.");
      } else {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Fehler beim Löschen");
      }
    } catch (error: any) {
      toast.error(`Fehler: ${error.message}`);
    } finally {
      setDeletingFeatureId(null);
    }
  };

  const handleToggleHotelStatus = async (hotel: any) => {
    const hotelId = hotel.id || hotel.hotel_id || hotel._id || hotel.hotelId;
    
    if (!hotelId) {
      toast.error("Fehler: Hotel-ID konnte nicht gefunden werden!");
      return;
    }

    const isActive = hotel.status === 'inactiv' ? false : (hotel.status === 'activ' ? true : hotel.is_active !== false);
    const newStatus = isActive ? 'inactiv' : 'activ'; 

    setTogglingHotelId(hotelId);
    const token = localStorage.getItem('accessToken');

    try {
      const response = await fetch(`${API_BASE_URL}/admin/hotels/${hotelId}/status`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        toast.success(`Hotel erfolgreich ${isActive ? 'deaktiviert' : 'aktiviert'}.`);
        
        setHotels(currentHotels => currentHotels.map(h => {
          const hId = h.id || h.hotel_id || h._id || h.hotelId;
          if (hId === hotelId) {
            return { ...h, status: newStatus };
          }
          return h;
        }));

      } else {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || `Fehler beim ${isActive ? 'Deaktivieren' : 'Aktivieren'}`);
      }
    } catch (error: any) {
      toast.error(`Fehler: ${error.message}`);
    } finally {
      setTogglingHotelId(null);
    }
  };

  return {
    hotels,
    features,
    loading,
    deletingFeatureId,
    togglingHotelId,
    handleDeleteFeature,
    handleToggleHotelStatus,
    navigate,
    fetchData
  };
};