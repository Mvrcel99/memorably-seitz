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

  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const getImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith('http')) return path;
    
    let cleanPath = path.replace(/\\/g, '/');
    if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
    
    if (cleanPath.startsWith('/uploads/')) {
        cleanPath = cleanPath.replace('/uploads/', '/images/');
    }
    
    const baseUrl = API_BASE_URL.replace(/\/api(\/v1)?$/, '');
    return `${baseUrl}${cleanPath}`;
  };

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

    const rawImages = hotel.bilder || hotel.images || hotel.hotel_bilder || [];
    if (Array.isArray(rawImages)) {
      const safeImages = rawImages.map((img: any) => {
         const foundId = img.id || img.hotel_bild_id || img.bild_id || img.imageId || img.hotelBildId || img._id;
         return {
           ...img,
           id: foundId,
           url: img.pfad || img.url || img.path || img.image_url
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
      toast.error("Fehler: Bild-ID fehlt.");
      return;
    }

    const token = localStorage.getItem('accessToken');
    try {
      const deleteUrl = `${API_BASE_URL}/owner/hotels/${hotelId}/images/${imageId}`;

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
      toast.error(error.message || "Das Bild konnte nicht gelöscht werden.");
    }
  };

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
          const errorMsg = errData?.message 
              ? (Array.isArray(errData.message) ? errData.message.join(', ') : errData.message)
              : `Fehler beim Speichern (${updateRes.status}).`;
          throw new Error(errorMsg);
      }

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

               const uploadUrl = `${API_BASE_URL}/owner/hotels/${hotelId}/images`;

               const imgRes = await fetch(uploadUrl, {
                   method: 'POST',
                   headers: { 'Authorization': `Bearer ${token}` },
                   body: formDataUpload
               });
               
               if (!imgRes.ok) {
                 const uploadErr = await imgRes.text();
                 toast.error(`Bild-Upload fehlgeschlagen: ${uploadErr}`);
               }
            } catch (imgErr) {}
        }));
      }

      toast.success("Hotel erfolgreich aktualisiert!");
      navigate('/owner/dashboard');

    } catch (error: any) {
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