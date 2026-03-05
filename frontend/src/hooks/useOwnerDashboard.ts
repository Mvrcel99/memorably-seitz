import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { API_BASE_URL } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export const useOwnerDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [hotels, setHotels] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingRoomId, setDeletingRoomId] = useState<string | null>(null);

  const getImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith('http')) return path;
    
    let cleanPath = path.replace(/\\/g, '/');
    if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
    
    const baseUrl = API_BASE_URL.replace(/\/api(\/v1)?$/, '');
    return `${baseUrl}${cleanPath}`;
  };

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      logout();
      navigate('/login');
      return;
    }

    try {
      const hotelsRes = await fetch(`${API_BASE_URL}/owner/hotels`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });

      const bookingsRes = await fetch(`${API_BASE_URL}/owner/bookings`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });

      if (hotelsRes.status === 401 || bookingsRes.status === 401) throw new Error("Unauthorized");

      if (hotelsRes.ok && bookingsRes.ok) {
        const hotelsData = await hotelsRes.json();
        const bookingsData = await bookingsRes.json();
        setBookings(Array.isArray(bookingsData) ? bookingsData : []);

        const detailedHotels = await Promise.all(
          hotelsData.map(async (h: any) => {
            let rawRooms = h.zimmer || h.rooms || [];

            if (rawRooms.length === 0 && h.slug) {
              try {
                const detailRes = await fetch(`${API_BASE_URL}/hotels/${h.slug}`);
                if (detailRes.ok) {
                  const detailData = await detailRes.json();
                  rawRooms = detailData?.zimmer || detailData?.rooms || [];
                }
              } catch (e) {}
            }

            const mappedRooms = rawRooms.map((r: any) => {
                const rawImages = r.zimmer_bild || r.zimmer_bilder || r.zimmerBilder || r.bilder || r.images || [];
                const mappedImages = rawImages.map((img: any) => ({
                    id: img.zimmer_bild_id || img.id,
                    url: img.pfad || img.url
                }));

                return {
                   id: r.zimmer_id || r.id,
                   name: r.bezeichnung || r.name,
                   description: r.beschreibung || r.description, 
                   roomNumber: r.zimmernr_hotel || r.roomNumber,
                   maxGuests: r.max_anzahl || r.maxGuests,
                   pricePerNight: r.basispreis || r.pricePerNight,
                   images: mappedImages
                };
            });

            return {
              ...h,
              id: h.hotel_id || h.id,
              title: h.name || h.title,
              city: h.ort || h.city,
              country: h.land || h.country,
              rooms: mappedRooms
            };
          })
        );

        setHotels(detailedHotels);
      }

    } catch (error) {
      logout();
      navigate('/login');
      toast.error("Ihre Sitzung ist abgelaufen. Bitte loggen Sie sich erneut ein.");
    } finally {
      setLoading(false);
    }
  }, [navigate, logout]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleteRoom = async (room: any, hotelId: string) => {
    if (!window.confirm(`Möchten Sie das Zimmer "${room.name}" wirklich unwiderruflich löschen?`)) return;

    setDeletingRoomId(room.id);
    const token = localStorage.getItem('accessToken');
    const headers = { 'Authorization': `Bearer ${token}` };

    try {
      if (room.images && room.images.length > 0) {
          await Promise.all(room.images.map(async (img: any) => {
              if (img.id) { 
                  try {
                      await fetch(`${API_BASE_URL}/owner/hotels/${hotelId}/rooms/${room.id}/images/${img.id}`, {
                          method: 'DELETE',
                          headers: headers
                      });
                  } catch (err) {}
              }
          }));
      }

      const response = await fetch(`${API_BASE_URL}/owner/hotels/${hotelId}/rooms/${room.id}`, {
        method: 'DELETE',
        headers: headers
      });

      if (response.ok) {
        setHotels(currentHotels => currentHotels.map(h => {
          if (h.id === hotelId || h.hotelId === hotelId) {
             return { ...h, rooms: h.rooms.filter((r: any) => r.id !== room.id) };
          }
          return h;
        }));
        toast.success("Zimmer erfolgreich gelöscht.");
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(`Fehler beim Löschen: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      toast.error("Netzwerkfehler beim Löschen des Zimmers.");
    } finally {
      setDeletingRoomId(null);
    }
  };

  return {
    hotels,
    bookings,
    loading,
    deletingRoomId,
    getImageUrl,
    handleDeleteRoom,
    navigate,
    fetchData
  };
};