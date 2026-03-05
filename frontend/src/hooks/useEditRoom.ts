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
    maxGuests: "2",
    roomNumber: ""
  });

  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const getImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith('http')) return path;
    let cleanPath = path.replace(/\\/g, '/');
    if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
    if (cleanPath.startsWith('/images/')) {
        cleanPath = cleanPath.replace('/images/', '/uploads/');
    }
    const baseUrl = API_BASE_URL.replace(/\/api(\/v1)?$/, '');
    return `${baseUrl}${cleanPath}`;
  };

  useEffect(() => {
    if (!location.state || !location.state.room || !location.state.hotelId) {
      toast.error("Keine Zimmerdaten gefunden.");
      navigate('/owner/dashboard');
      return;
    }

    const { room, hotelId } = location.state;
    
    // Wir loggen das Zimmer, um zu sehen, wie die IDs WIRKLICH heißen!
    console.log("KOMPLETTES ZIMMER VOM BACKEND:", room);

    const extractedRoomId = room.id || room.zimmer_id || room.zimmerId;
    setHotelId(hotelId);
    setRoomId(extractedRoomId);

    setFormData({
      name: room.name || room.bezeichnung || "",
      description: room.description || room.beschreibung || "",
      pricePerNight: room.pricePerNight ? (room.pricePerNight / 100).toFixed(2) : (room.basispreis ? (room.basispreis / 100).toFixed(2) : ""),
      maxGuests: room.maxGuests ? String(room.maxGuests) : (room.max_anzahl ? String(room.max_anzahl) : "2"),
      roomNumber: room.roomNumber || room.zimmernr_hotel || ""
    });

    if (room.images && Array.isArray(room.images)) {
      const safeImages = room.images.map((img: any) => {
         const foundId = img.id || img.zimmer_bild_id || img.zimmerBildId || img.imageId || img.bild_id;
         return {
           ...img,
           id: foundId,
           url: img.url || img.pfad || img.path
         };
      });
      setExistingImages(safeImages);
    }
  }, [location, navigate]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviews]);
    }
  };

  const removeNewFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeleteExistingImage = async (imageId: string) => {
    if (!imageId || imageId === "undefined") {
      toast.error("Fehler: Bild-ID fehlt. Bitte in die F12 Konsole schauen!");
      return;
    }

    if (!window.confirm("Möchten Sie dieses Bild wirklich löschen?")) return;
    
    const token = localStorage.getItem('accessToken');
    try {
      // HIER IST DIE NEUE ROUTE AUS DEINER EXCEL!
      const deleteUrl = `${API_BASE_URL}/owner/hotels/${hotelId}/rooms/${roomId}/images/${imageId}`;
      console.log("Sende DELETE an:", deleteUrl);

      const res = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server-Fehler: ${res.status} - ${errText}`);
      }

      setExistingImages(prev => prev.filter(img => img.id !== imageId));
      toast.success("Bild erfolgreich gelöscht.");
    } catch (error: any) {
      console.error("Löschen fehlgeschlagen:", error);
      toast.error(error.message || "Das Bild konnte nicht gelöscht werden.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('accessToken');

    try {
      const priceString = formData.pricePerNight.replace(',', '.');
      let priceInCents = Math.round(parseFloat(priceString) * 100);
      if (isNaN(priceInCents)) throw new Error("Der Preis ist ungültig.");

      let guestsInt = parseInt(formData.maxGuests, 10);
      if (isNaN(guestsInt)) guestsInt = 1;

      // 1. Zimmer-Daten aktualisieren
      const updateRes = await fetch(`${API_BASE_URL}/owner/hotels/${hotelId}/rooms/${roomId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bezeichnung: formData.name,
          beschreibung: formData.description,
          basispreis: priceInCents,
          max_anzahl: guestsInt,
          zimmernr_hotel: formData.roomNumber
        })
      });

      if (!updateRes.ok) {
        const err = await updateRes.text();
        throw new Error(`Fehler beim Speichern der Zimmerdaten: ${err}`);
      }

      // 2. Neue Bilder hochladen
      if (selectedFiles.length > 0) {
        const startSortOrder = existingImages.length; 

        await Promise.all(selectedFiles.map(async (file, index) => {
            try {
               const webpFile = await new Promise<File>((resolve, reject) => {
                   if (file.type === 'image/webp') { resolve(file); return; }
                   const img = new Image();
                   img.src = URL.createObjectURL(file);
                   img.onload = () => {
                       const canvas = document.createElement('canvas');
                       canvas.width = img.width;
                       canvas.height = img.height;
                       const ctx = canvas.getContext('2d');
                       ctx?.drawImage(img, 0, 0);
                       canvas.toBlob((blob) => {
                           if (blob) {
                               const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
                               resolve(new File([blob], newFileName, { type: 'image/webp' }));
                           } else reject(new Error("Konvertierung fehlgeschlagen"));
                       }, 'image/webp', 0.85);
                   };
                   img.onerror = () => reject(new Error("Fehler beim Laden zur Konvertierung."));
               });

               const formDataUpload = new FormData();
               formDataUpload.append('image', webpFile);
               formDataUpload.append('alt', webpFile.name); 
               formDataUpload.append('sortOrder', String(startSortOrder + index)); 

               // Evtl. muss der Upload auch an die Hotel-Route angepasst werden, 
               // wir versuchen es erst mal mit der bekannten Route
               const uploadUrl = `${API_BASE_URL}/owner/rooms/${roomId}/images`;
               console.log("Lade Bild hoch an:", uploadUrl);

               const imgRes = await fetch(uploadUrl, {
                   method: 'POST',
                   headers: { 'Authorization': `Bearer ${token}` },
                   body: formDataUpload
               });
               
               if (!imgRes.ok) {
                 const uploadErr = await imgRes.text();
                 console.error("Upload Fehler Details:", uploadErr);
                 toast.error(`Bild-Upload fehlgeschlagen: ${uploadErr}`);
               }
            } catch (imgErr) {
                console.error("Fehler bei Bildverarbeitung", imgErr);
            }
        }));
      }

      toast.success("Zimmer erfolgreich aktualisiert!");
      navigate('/owner/dashboard');

    } catch (error: any) {
      console.error("Submit Error:", error);
      toast.error(`Fehler: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    formData,
    setFormData,
    existingImages,
    previewUrls,
    handleFileSelect,
    removeNewFile,
    handleDeleteExistingImage,
    handleSubmit,
    getImageUrl,
    navigate
  };
};