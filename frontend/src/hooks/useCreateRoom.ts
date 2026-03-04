import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { API_BASE_URL } from '../lib/api';

export const useCreateRoom = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingHotels, setFetchingHotels] = useState(true);

  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pricePerNight: "",
    maxGuests: "2",
    roomNumber: "",
    roomTypeId: "1"
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/owner/hotels`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setHotels(data);
          if (data.length > 0) setSelectedHotelId(data[0].id || data[0].hotel_id || data[0].hotelId);
        }
      } catch (error) {
        console.error(error);
        toast.error("Fehler beim Laden der Hotels.");
      } finally {
        setFetchingHotels(false);
      }
    };
    fetchHotels();
  }, [navigate]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);

      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('accessToken');

    try {
      if (!selectedHotelId) throw new Error("Bitte wählen Sie ein Hotel aus.");

      const priceString = formData.pricePerNight.replace(',', '.');
      let priceInCents = Math.round(parseFloat(priceString) * 100);
      if (isNaN(priceInCents)) throw new Error("Der Preis ist ungültig.");

      let guestsInt = parseInt(formData.maxGuests, 10);
      if (isNaN(guestsInt)) guestsInt = 1;

      let roomNumStr = formData.roomNumber.toString().trim();
      if (roomNumStr === "") {
         throw new Error("Bitte geben Sie eine Zimmernummer an.");
      }

      let zimmertypInt = parseInt(formData.roomTypeId, 10);

      const createRes = await fetch(`${API_BASE_URL}/owner/hotels/${selectedHotelId}/rooms`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bezeichnung: formData.name,
          beschreibung: formData.description,
          basispreis: priceInCents,
          max_anzahl: guestsInt,
          zimmernr_hotel: roomNumStr,
          zimmertyp_id: zimmertypInt
        })
      });

      if (!createRes.ok) {
          const errData = await createRes.json().catch(() => null);
          throw new Error(errData?.message || `Server-Fehler beim Speichern (${createRes.status}).`);
      }
      
      const newRoom = await createRes.json();
      const newRoomId = newRoom.data?.zimmer_id || newRoom.zimmer_id || newRoom.id;

      if (selectedFiles.length > 0 && newRoomId) {
         await Promise.all(selectedFiles.map(async (file) => {
             try {
                const formDataUpload = new FormData();
                formDataUpload.append('file', file);
                formDataUpload.append('alt_text', file.name);

                const imgRes = await fetch(`${API_BASE_URL}/owner/rooms/${newRoomId}/images`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: formDataUpload
                });
                
                if (!imgRes.ok) {
                    const errText = await imgRes.text();
                    toast.error(`Bild-Fehler: ${errText}`);
                    console.error("Upload Fehler:", errText);
                }
             } catch (imgErr) {
                 toast.error("Netzwerkfehler beim Bild-Upload.");
             }
         }));
      }

      toast.success("Zimmer erfolgreich angelegt!");
      navigate('/owner/dashboard');

    } catch (error: any) {
      console.error(error);
      toast.error(`Fehler: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    hotels,
    loading,
    fetchingHotels,
    selectedHotelId,
    setSelectedHotelId,
    formData,
    setFormData,
    previewUrls,
    handleFileSelect,
    removeFile,
    handleSubmit,
    navigate
  };
};