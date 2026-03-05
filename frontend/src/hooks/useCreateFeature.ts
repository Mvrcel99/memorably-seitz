import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { API_BASE_URL } from '../lib/api';

export const useCreateFeature = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [titel, setTitel] = useState("");
  const [beschreibung, setBeschreibung] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titel.trim()) return;
    
    setLoading(true);
    const token = localStorage.getItem('accessToken');

    try {
      const response = await fetch(`${API_BASE_URL}/admin/ausstattung`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titel, beschreibung })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.message || "Fehler beim Erstellen");
      }

      toast.success("Ausstattung erfolgreich erstellt!");
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast.error(`Fehler: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { titel, setTitel, beschreibung, setBeschreibung, loading, handleSubmit, navigate };
};