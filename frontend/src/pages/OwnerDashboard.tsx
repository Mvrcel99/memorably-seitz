import { useOwnerDashboard } from '../hooks/useOwnerDashboard';
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, Bed, Star, Plus, Hotel, MapPin,
  ExternalLink, Trash2, Pencil, Loader2, Image as ImageIcon,
  Calendar, User, CreditCard
} from "lucide-react";

const OwnerDashboard = () => {
  const {
    hotels,
    bookings,
    loading,
    deletingRoomId,
    getImageUrl,
    handleDeleteRoom,
    navigate
  } = useOwnerDashboard();

  // Hilfsfunktion, um das Datum schön auf Deutsch zu formatieren
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-32 px-6 pb-12">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* HEADLINE & BUTTON */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <LayoutDashboard size={20} />
                <span className="font-semibold uppercase tracking-wider text-xs">Hotel Management</span>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Besitzer Dashboard</h1>
            </div>

            <Button
              onClick={() => navigate('/owner/rooms/create')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-8 py-6 shadow-lg shadow-blue-200"
            >
              <Plus size={20} className="mr-2"/> Neues Zimmer
            </Button>
          </div>

          {/* STATS KARTEN */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="border-none shadow-sm bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold text-slate-500 uppercase">Belegung</CardTitle>
                <Bed className="text-blue-600" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{bookings.length}</div>
                <p className="text-xs text-green-600 font-medium mt-1">Aktuelle Buchungen</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold text-slate-500 uppercase">Eigene Hotels</CardTitle>
                <Star className="text-blue-600" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{hotels.length}</div>
                <p className="text-xs text-slate-400 mt-1">Registrierte Unterkünfte</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* LINKE SEITE: HOTELS & ZIMMER (nimmt 2/3 des Platzes ein) */}
            <div className="lg:col-span-2 space-y-6">
               <h2 className="text-xl font-bold text-slate-900 ml-1">Meine Hotels & Zimmer</h2>

               {loading ? (
                  <div className="text-center py-12 text-slate-400 animate-pulse">Lade Daten...</div>
               ) : hotels.length > 0 ? (
                  <div className="grid gap-8">
                    {hotels.map((hotel: any) => (
                      <div key={hotel.id || hotel.hotelId} className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">

                         <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
                            <div className="flex items-center gap-5">
                               <div className="h-14 w-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-600 shadow-sm">
                                  <Hotel size={24} />
                               </div>
                               <div>
                                  <h3 className="font-bold text-slate-900 text-xl">{hotel.title}</h3>
                                  <div className="flex items-center text-slate-500 text-sm font-medium mt-1">
                                     <MapPin size={14} className="mr-1" />
                                     {hotel.city}, {hotel.country}
                                  </div>
                               </div>
                            </div>

                            {hotel.slug && (
                              <Button variant="outline" size="sm" onClick={() => navigate(`/hotels/${hotel.slug}`)}>
                                <ExternalLink size={14} className="mr-2"/> Öffentliche Vorschau
                              </Button>
                            )}
                         </div>

                         <div className="p-6 bg-white">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                               Verfügbare Zimmer ({hotel.rooms?.length || 0})
                            </h4>

                            {hotel.rooms && hotel.rooms.length > 0 ? (
                              <div className="grid gap-3">
                                  {hotel.rooms.map((room: any) => (
                                      <div key={room.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all group">
                                          <div className="flex items-center gap-4">
                                              <div className="h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden bg-slate-200 border border-slate-200">
                                                  {room.images && room.images.length > 0 ? (
                                                      <img
                                                          src={getImageUrl(room.images[0].url)}
                                                          alt={room.name}
                                                          className="h-full w-full object-cover"
                                                          onError={(e) => {
                                                              (e.target as HTMLImageElement).src = "https://placehold.co/100x100?text=No+Img";
                                                          }}
                                                      />
                                                  ) : (
                                                      <div className="h-full w-full flex items-center justify-center text-slate-400">
                                                          <ImageIcon size={20} />
                                                      </div>
                                                  )}
                                              </div>

                                              <div>
                                                  <div className="flex items-center gap-2">
                                                      {room.roomNumber && (
                                                        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                                                            {room.roomNumber}
                                                        </span>
                                                      )}
                                                      <p className="font-bold text-slate-900">{room.name}</p>
                                                  </div>
                                                  <p className="text-xs text-slate-500 mt-0.5">
                                                      Max. {room.maxGuests} Pers. • {(room.pricePerNight / 100).toFixed(2)} €
                                                  </p>
                                              </div>
                                          </div>

                                          <div className="flex gap-2">
                                              <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  className="text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                                                  onClick={() => navigate('/owner/rooms/edit', { state: { room, hotelId: hotel.id || hotel.hotelId } })}
                                              >
                                                  <Pencil size={18} />
                                              </Button>
                                              <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                  onClick={() => handleDeleteRoom(room, hotel.id || hotel.hotelId)}
                                                  disabled={deletingRoomId === room.id}
                                              >
                                                  {deletingRoomId === room.id ? <Loader2 className="animate-spin h-4 w-4"/> : <Trash2 size={18} />}
                                              </Button>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                            ) : (
                               <div className="text-center py-6 border-2 border-dashed border-slate-100 rounded-xl text-slate-400 text-sm">
                                  Noch keine Zimmer angelegt.
                               </div>
                            )}
                         </div>

                      </div>
                    ))}
                  </div>
               ) : (
                  <div className="text-center py-12 text-slate-400">Keine Hotels gefunden.</div>
               )}
            </div>

            {/* RECHTE SEITE: BUCHUNGEN (nimmt 1/3 des Platzes ein) */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 ml-1">Letzte Buchungen</h2>
              
              <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-6">
                {loading ? (
                  <div className="text-center py-8 text-slate-400 animate-pulse">Lade Buchungen...</div>
                ) : bookings && bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking: any) => (
                      <div key={booking.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                        
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <User size={16} className="text-blue-600" />
                            <span className="font-bold text-slate-900 text-sm">
                              {booking.firstName} {booking.lastName}
                            </span>
                          </div>
                          {/* Status Badge */}
                          {booking.status === 'CONFIRMED' ? (
                            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                              Bestätigt
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                              Storniert
                            </span>
                          )}
                        </div>

                        <div className="space-y-2 text-xs text-slate-600">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-slate-400" />
                            <span>{formatDate(booking.from)} - {formatDate(booking.to)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bed size={14} className="text-slate-400" />
                            <span className="truncate">
                              {booking.rooms?.map((r: any) => r.name).join(', ') || "Zimmer unbekannt"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 font-medium text-slate-900 mt-2 pt-2 border-t border-slate-200">
                            <CreditCard size={14} className="text-slate-400" />
                            <span>{booking.totalPrice?.toFixed(2)} € Gesamt</span>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400 text-sm">
                    Noch keine Buchungen vorhanden.
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default OwnerDashboard;