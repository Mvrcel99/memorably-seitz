import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { API_BASE_URL } from '../lib/api';

export const useEditFeature = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [titel, setTitel] = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [featureId, setFeatureId] = useState("");

  useEffect(() => {
    if (!location.state || !location.state.feature) {
      toast.error("Keine Daten gefunden.");
      navigate('/admin/dashboard');
      return;
    }
    
    const { feature } = location.state;
    setFeatureId(feature.id || feature.ausstattung_id || feature._id);
    setTitel(feature.titel || feature.name || feature.bezeichnung || "");
    setBeschreibung(feature.beschreibung || "");
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titel.trim() || !featureId) return;
    
    setLoading(true);
    const token = localStorage.getItem('accessToken');

    try {
      const response = await fetch(`${API_BASE_URL}/admin/ausstattung/${featureId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titel, beschreibung })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.message || "Fehler beim Aktualisieren");
      }

      toast.success("Ausstattung erfolgreich aktualisiert!");
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast.error(`Fehler: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { titel, setTitel, beschreibung, setBeschreibung, loading, handleSubmit, navigate };
};