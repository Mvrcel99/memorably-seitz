import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Star, MapPin, Check, ArrowLeft, BedDouble, Loader2, CheckCircle, Info } from "lucide-react";
import { formatPrice} from "@/lib/utils";
import { parse, isValid, format, addDays } from "date-fns";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { GuestSearch } from "@/components/ui/guest-search";
import { DateSearch } from "@/components/ui/date-search"; 
import { ImageGallery } from "@/components/ui/image-gallery"; 

import { useHotelDetail } from "@/hooks/useHotelDetail";
import { calculateBookingDetails } from "@/lib/calculations";
import { API_BASE_URL } from "@/lib/api";

export default function HotelDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const { hotel, isLoading, error } = useHotelDetail(slug);

  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [adults, setAdults] = useState(() => Number(searchParams.get("adults")) || 2);
  const [childrenCount, setChildrenCount] = useState(() => Number(searchParams.get("children")) || 0);
  const [roomsCount, setRoomsCount] = useState(() => Number(searchParams.get("rooms")) || 1);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
      const fromParam = searchParams.get("from"), toParam = searchParams.get("to");
      return (fromParam && toParam && isValid(parse(fromParam, "yyyy-MM-dd", new Date()))) 
        ? { from: parse(fromParam, "yyyy-MM-dd", new Date()), to: parse(toParam, "yyyy-MM-dd", new Date()) } 
        : { from: new Date(), to: addDays(new Date(), 3) };
  });

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccessData, setBookingSuccessData] = useState<any | null>(null);
  const [bookingForm, setBookingForm] = useState({ firstName: "", lastName: "", email: "" });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("adults", adults.toString()); params.set("children", childrenCount.toString()); params.set("rooms", roomsCount.toString());
    if (dateRange?.from) params.set("from", format(dateRange.from, "yyyy-MM-dd"));
    if (dateRange?.to) params.set("to", format(dateRange.to, "yyyy-MM-dd"));
    setSearchParams(params, { replace: true });
  }, [adults, childrenCount, roomsCount, dateRange]);

  const calc = calculateBookingDetails(hotel, selectedRooms, roomsCount, adults, childrenCount, dateRange);

  const toggleRoom = (roomId: string) => setSelectedRooms(prev => prev.includes(roomId) ? prev.filter(id => id !== roomId) : [...prev, roomId]);

  const submitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateRange?.from || !dateRange?.to) return;
    
    setIsBookingLoading(true); 
    setBookingError(null);
    
    // 1. Zimmer-IDs in Zahlen umwandeln (wie vom Backend gefordert)
    // Wir erstellen ein Array, das die ID so oft enthält, wie die Zimmeranzahl (multiplier) gewählt wurde
    const finalRoomIds: number[] = [];
    selectedRooms.forEach(roomId => { 
      for (let i = 0; i < calc.multiplier; i++) {
        finalRoomIds.push(Number(roomId)); 
      } 
    });

    try {
        const res = await fetch(`${API_BASE_URL}/bookings`, {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              ...bookingForm, 
              from: format(dateRange.from, "yyyy-MM-dd"), 
              to: format(dateRange.to, "yyyy-MM-dd"), 
              
              // HIER DIE ENTSCHEIDENDE ÄNDERUNG:
              // Wir senden die tatsächliche Anzahl der Personen (Erwachsene + Kinder)
              howMany: adults + childrenCount, 
              
              roomIds: finalRoomIds 
            })
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(res.status === 409 ? "Zimmer ausgebucht." : data.message || "Fehler bei der Buchung.");
        }

        // Erfolg: Buchungsdaten für das Modal speichern
        setBookingSuccessData(data);
        
    } catch (err: any) { 
        setBookingError(err.message); 
    } finally { 
        setIsBookingLoading(false); 
    }
};

  if (isLoading) {
      return (
          <div className="min-h-screen bg-slate-50 font-sans pb-20 relative">
               <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 shadow-sm">
                   <div className="container mx-auto py-4 px-4 flex justify-between items-center">
                        <Skeleton className="h-8 w-32 rounded" />
                   </div>
               </div>

               <div className="container mx-auto p-4 mt-6">
                   <Skeleton className="h-[400px] md:h-[500px] w-full rounded-[32px]" />
               </div>

               <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-12 mt-4">
                   <div className="w-full lg:w-2/3 space-y-6">
                       <Skeleton className="h-10 w-3/4 rounded-lg" />
                       <Skeleton className="h-6 w-1/2 rounded" />
                       <Separator className="my-8" />
                       <div className="space-y-3">
                           <Skeleton className="h-4 w-full rounded" />
                           <Skeleton className="h-4 w-5/6 rounded" />
                           <Skeleton className="h-4 w-4/6 rounded" />
                       </div>
                   </div>
                   <div className="w-full lg:w-1/3">
                       <Skeleton className="h-[400px] w-full rounded-[32px]" />
                   </div>
               </div>
          </div>
      );
  }

  if (error || !hotel) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
              <div className="text-red-500 font-bold text-xl">{error || "Nicht gefunden"}</div>
              <Button onClick={() => navigate('/')}>Zurück</Button>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 relative">
        <BookingModal 
           isOpen={isBookingModalOpen} setIsOpen={setIsBookingModalOpen} hotelTitle={hotel.title} 
           successData={bookingSuccessData} error={bookingError} form={bookingForm} setForm={setBookingForm} 
           submit={submitBooking} loading={isBookingLoading} price={calc.totalPrice} resetRooms={() => setSelectedRooms([])}
        />

        <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 shadow-sm">
            <div className="container mx-auto py-4 px-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img src="/img/logo.png" alt="Logo" className="h-8 cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/')} />
                    <div className="h-6 w-px bg-slate-300 mx-2"></div> 
                    <Button variant="ghost" onClick={() => navigate(-1)} className="text-slate-600 hover:text-blue-600"><ArrowLeft className="mr-2 h-5 w-5" /> Zurück</Button>
                </div>
                <span className="font-bold text-2xl text-slate-900 tracking-tight hidden md:block">Memorably</span>
                <div className="w-32 hidden md:block"></div> 
            </div>
        </div>

        <div className="container mx-auto p-4 mt-6">
            <ImageGallery images={hotel.images || []} />
        </div>

        <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-12 relative">
            <div className="w-full lg:w-2/3 space-y-10">
                <div>
                    <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: hotel.stars || 0 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                        <span className="ml-2 text-sm font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">Hotel</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">{hotel.title}</h1>
                    <div className="flex items-center text-slate-600 font-medium text-lg"><MapPin className="w-5 h-5 mr-2 text-blue-600" /> {hotel.city}, {hotel.country}</div>
                </div>
                <Separator />
                
                {/* Ausstattung - Falls dein Backend hier ein anderes Array schickt, müsstest du das noch anpassen */}
                {hotel.features && hotel.features.length > 0 && (
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Ausstattung</h3>
                        <div className="flex flex-wrap gap-3">
                            {hotel.features.map((feat: any) => <span key={feat.id} className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold flex items-center border border-slate-200"><Check className="w-4 h-4 mr-2 text-green-600" /> {feat.titel || feat.label}</span>)}
                        </div>
                    </div>
                )}
                
                <div>
                     <h3 className="text-lg font-bold text-slate-900 mb-2">Über diese Unterkunft</h3>
                     <p className="text-slate-600 leading-8 text-lg">{hotel.description || "Keine Beschreibung verfügbar."}</p>
                </div>
            </div>

            <div className="w-full lg:w-1/3">
                <div className="sticky top-28">
                    <Card className="shadow-xl rounded-[32px] border-slate-200 overflow-hidden">
                        <CardHeader className="p-6 pb-0">
                            <CardTitle className="text-2xl font-bold text-slate-800">Deine Buchung</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            
                            <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-4">
                                <div className="px-2">
                                     <div className="flex justify-between items-center">
                                         <span className="text-slate-500 text-xs font-bold uppercase">Reisezeitraum</span>
                                         <div className="scale-90 origin-right -mr-2">
                                             <DateSearch date={dateRange} onSelect={setDateRange} />
                                         </div>
                                     </div>
                                     {(!dateRange?.from || !dateRange?.to) && <p className="text-xs text-red-500 mt-2 px-2">Bitte Zeitraum wählen</p>}
                                     {(dateRange?.from && dateRange?.to) && <p className="text-xs text-slate-400 mt-2 text-right px-2">{calc.nights} Nächte gewählt</p>}
                                </div>
                                <Separator className="bg-slate-100" />
                                <div className="flex justify-between items-center px-2">
                                    <span className="text-slate-500 text-xs font-bold uppercase">Reisende</span>
                                    <div className="scale-90 origin-right -mr-2">
                                        <GuestSearch adults={adults} setAdults={setAdults} children={childrenCount} setChildren={setChildrenCount} rooms={roomsCount} setRooms={setRoomsCount} />
                                    </div>
                                </div>
                            </div>

                            <Separator />
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2"><BedDouble className="w-3 h-3" /> Verfügbare Zimmer</h4>
                                <div className="space-y-3 max-h-[300px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                    {hotel.rooms?.map(room => {
                                        // Manche Backends schicken die ID als number (zimmer_id), deshalb fangen wir beide Fälle ab
                                        const roomId = room.id || room.zimmer_id?.toString();
                                        const isSelected = selectedRooms.includes(roomId);
                                        return (
                                            <div key={roomId} onClick={() => toggleRoom(roomId)} className={`relative p-3 rounded-xl border transition-all cursor-pointer group ${isSelected ? 'border-blue-600 bg-blue-50 ring-1' : 'border-slate-200 hover:border-blue-400 bg-white'}`}>
                                                <div className="flex justify-between items-start mb-1"><span className="font-bold text-sm text-slate-800">{room.bezeichnung}</span>{isSelected && <Check className="w-4 h-4 text-blue-600" />}</div>
                                                <div className="text-xs text-slate-500 mb-2">Max. {room.max_anzahl} Pers.</div>
                                                <div className="flex justify-between items-end mt-2">
                                                    <span className="font-bold text-slate-900">{formatPrice(room.basispreis)} <span className="text-xs font-normal text-slate-400">/ Nacht</span></span>
                                                    <span className={`text-xs font-bold px-2 py-1 rounded ${isSelected ? 'text-red-500' : 'text-blue-600'}`}>{isSelected ? "Entfernen" : "Hinzufügen"}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-end">
                                <span className="font-bold text-lg text-slate-700">Gesamt</span>
                                <div className="text-right">
                                    <span className="block text-3xl font-extrabold text-blue-600 leading-none">{formatPrice(calc.totalPrice)}</span>
                                    {selectedRooms.length > 0 && <span className="text-xs text-slate-400 font-medium">inkl. Steuern für {calc.effectiveRoomsCount} Zimmer</span>}
                                </div>
                            </div>

                            {selectedRooms.length > 0 && !calc.hasEnoughCapacity && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-medium border flex items-start gap-2">
                                    <Info className="w-4 h-4 shrink-0 mt-0.5" /> <span>Zimmer fassen nur {calc.totalCapacity} Pers.</span>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="p-6 pt-0">
                            <Button size="lg" className="w-full h-14 text-lg font-bold rounded-2xl bg-blue-600 hover:bg-blue-700"
                                disabled={selectedRooms.length === 0 || !dateRange?.from || !dateRange?.to || !calc.hasEnoughCapacity}
                                onClick={() => { setBookingError(null); setBookingSuccessData(null); setIsBookingModalOpen(true); }}
                            >
                                Jetzt buchen
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    </div>
  );
}

function BookingModal({ isOpen, setIsOpen, hotelTitle, successData, error, form, setForm, submit, loading, price, resetRooms }: any) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-white rounded-3xl border-none">
                {successData ? (
                    <div className="p-8 flex flex-col items-center text-center">
                        <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
                        <DialogTitle className="text-2xl font-bold text-slate-900 mb-2">Buchung bestätigt!</DialogTitle>
                        <DialogDescription className="text-slate-600 mb-6">Vielen Dank, {successData.firstName}. Ihre Buchung im <strong>{hotelTitle}</strong> ist erfolgreich.</DialogDescription>
                        <div className="bg-slate-50 w-full p-4 rounded-xl border border-slate-200 mb-6">
                            <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Ihr Buchungscode</span>
                            <span className="text-2xl font-mono font-bold text-blue-600">{successData.bookingCode || "Erfolgreich gebucht"}</span>
                        </div>
                        <Button className="w-full h-12 text-lg rounded-xl" onClick={() => { setIsOpen(false); resetRooms(); }}>Schließen & Zurück</Button>
                    </div>
                ) : (
                    <div className="p-8">
                        <DialogHeader className="mb-6 text-left">
                            <DialogTitle className="text-2xl font-bold text-slate-900">Abschluss der Buchung</DialogTitle>
                            <DialogDescription>Geben Sie Ihre Kontaktdaten ein, um die Reservierung abzuschließen.</DialogDescription>
                        </DialogHeader>
                        {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 border border-red-100">{error}</div>}
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5"><Label className="text-xs font-bold text-slate-700 uppercase">Vorname *</Label><Input required placeholder="Max" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className="h-12 bg-slate-50 border-slate-200" /></div>
                                <div className="space-y-1.5"><Label className="text-xs font-bold text-slate-700 uppercase">Nachname *</Label><Input required placeholder="Mustermann" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className="h-12 bg-slate-50 border-slate-200" /></div>
                            </div>
                            <div className="space-y-1.5"><Label className="text-xs font-bold text-slate-700 uppercase">E-Mail Adresse *</Label><Input required type="email" placeholder="max@beispiel.de" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="h-12 bg-slate-50 border-slate-200" /></div>
                            <Separator className="my-6" />
                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                <div className="flex justify-between items-center mb-2"><span className="text-slate-600 font-medium">Zu zahlen vor Ort:</span><span className="text-2xl font-extrabold text-blue-600">{formatPrice(price)}</span></div>
                                <p className="text-xs text-slate-500 leading-relaxed">Der gesamte Betrag wird erst beim Check-in fällig. Keine Vorauszahlung nötig.</p>
                            </div>
                            <Button type="submit" className="w-full h-14 text-lg font-bold rounded-xl mt-4" disabled={loading}>{loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Bitte warten...</> : "Kostenpflichtig buchen"}</Button>
                        </form>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}