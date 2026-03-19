import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Star, MapPin, Check, ArrowLeft, BedDouble, Loader2, CheckCircle, Info, MessageSquare, AlertTriangle } from "lucide-react";
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
  
  const [bookingForm, setBookingForm] = useState({ firstName: "", lastName: "", email: "", paymentMethodId: "1" });

  const [reviewStars, setReviewStars] = useState(5);
  const [reviewHover, setReviewHover] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewBookingCode, setReviewBookingCode] = useState("");
  
  const [isReviewSubmitting, setIsReviewSubmitting] = useState(false);
  const [reviewSubmitError, setReviewSubmitError] = useState<string | null>(null);
  const [reviewSuccess, setReviewSuccess] = useState(false);

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
    
    const finalRoomIds: number[] = [];
    selectedRooms.forEach(roomId => { 
      for (let i = 0; i < calc.multiplier; i++) {
        finalRoomIds.push(Number(roomId)); 
      } 
    });

    try {
        const baseUrl = API_BASE_URL.replace(/\/$/, "");
        const res = await fetch(`${baseUrl}/bookings`, {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              firstName: bookingForm.firstName,
              lastName: bookingForm.lastName,
              email: bookingForm.email,
              zahlungsmethode_id: Number(bookingForm.paymentMethodId), 
              from: format(dateRange.from, "yyyy-MM-dd"), 
              to: format(dateRange.to, "yyyy-MM-dd"), 
              howMany: adults + childrenCount, 
              roomIds: finalRoomIds 
            })
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(res.status === 409 ? "Zimmer ausgebucht." : data.message || "Fehler bei der Buchung.");
        }

        setBookingSuccessData(data);
        
    } catch (err: any) { 
        setBookingError(err.message); 
    } finally { 
        setIsBookingLoading(false); 
    }
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsReviewSubmitting(true);
    setReviewSubmitError(null);

    try {
        const baseUrl = API_BASE_URL.replace(/\/$/, ""); 
        
        const token = localStorage.getItem("token") || "";

        const res = await fetch(`${baseUrl}/bewertungen`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({
                buchungs_id: Number(reviewBookingCode),
                email: reviewEmail, 
                titel: reviewTitle,
                text: reviewText,
                sterne: reviewStars
            })
        });

        const data = await res.json();

        if (!res.ok) {
            if (res.status === 401 || res.status === 403) {
                throw new Error("Zugriff verweigert: Sie müssen eingeloggt sein, um eine Bewertung abzugeben.");
            }
            throw new Error(data.message || "Fehler beim Senden. Bitte prüfen Sie Ihre Buchungsdaten.");
        }

        setReviewSuccess(true);
        setReviewTitle("");
        setReviewText("");
        setReviewEmail("");
        setReviewBookingCode("");
        setReviewStars(5);

    } catch (err: any) {
        setReviewSubmitError(err.message);
    } finally {
        setIsReviewSubmitting(false);
    }
  };

  if (isLoading) {
      return (
          <div className="min-h-screen bg-slate-50 font-sans pb-20 relative">
               <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 shadow-sm">
                   <div className="container mx-auto py-4 px-4 flex justify-between items-center"><Skeleton className="h-8 w-32 rounded" /></div>
               </div>
               <div className="container mx-auto p-4 mt-6"><Skeleton className="h-[400px] md:h-[500px] w-full rounded-[32px]" /></div>
               <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-12 mt-4">
                   <div className="w-full lg:w-2/3 space-y-6"><Skeleton className="h-10 w-3/4 rounded-lg" /><Skeleton className="h-6 w-1/2 rounded" /><Separator className="my-8" /><div className="space-y-3"><Skeleton className="h-4 w-full rounded" /><Skeleton className="h-4 w-5/6 rounded" /></div></div>
                   <div className="w-full lg:w-1/3"><Skeleton className="h-[400px] w-full rounded-[32px]" /></div>
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

  const roomImages = hotel.rooms?.flatMap((room: any) => 
      room.bilder?.map((bild: any) => ({
          url: bild.pfad || bild.url, 
          alt: bild.alt_text || bild.alt || room.bezeichnung
      })) || []
  ) || [];
  
  const allGalleryImages = [...(hotel.images || []), ...roomImages];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 relative">
        <BookingModal 
           isOpen={isBookingModalOpen} setIsOpen={setIsBookingModalOpen} hotelTitle={hotel.name || hotel.title} 
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
            <ImageGallery images={allGalleryImages} />
        </div>

        <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-12 relative">
            <div className="w-full lg:w-2/3 space-y-10">
                <div>
                    <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length:hotel.stars || 0 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                        <span className="ml-2 text-sm font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">Hotel</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">{hotel.name || hotel.title}</h1>
                    
                    <div className="flex items-center text-slate-600 font-medium text-lg">
                        <MapPin className="w-5 h-5 mr-2 text-blue-600 shrink-0" /> 
                        {hotel.strasse ? (
                            <span>{hotel.strasse}, {hotel.plz} {hotel.ort}, {hotel.land}</span>
                        ) : (
                            <span>{hotel.city}, {hotel.country}</span>
                        )}
                    </div>
                </div>
                <Separator />
                
                {hotel.features && hotel.features.length > 0 && (
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Ausstattung</h3>
                        <div className="flex flex-wrap gap-3">
                            {hotel.features.map((feat: any) => <span key={feat.id || feat.ausstattung_id} className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold flex items-center border border-slate-200"><Check className="w-4 h-4 mr-2 text-green-600" /> {feat.titel || feat.bezeichnung || feat.label}</span>)}
                        </div>
                    </div>
                )}
                
                <div>
                     <h3 className="text-lg font-bold text-slate-900 mb-2">Über diese Unterkunft</h3>
                     <p className="text-slate-600 leading-8 text-lg">{hotel.beschreibung || hotel.description || "Keine Beschreibung verfügbar."}</p>
                </div>

                <Separator />

                <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <MessageSquare className="w-6 h-6 text-blue-600" /> Bewertungen
                    </h3>
                    
                    <div className="space-y-4">
                        {hotel.bewertungen && hotel.bewertungen.length > 0 ? (
                            hotel.bewertungen.map((bewertung: any, index: number) => (
                                <div key={index} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex text-yellow-400">
                                            {Array.from({length: bewertung.sterne || 5}).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                        </div>
                                        <span className="font-bold text-sm text-slate-700 ml-2">
                                            {bewertung.kunde?.vorname} {bewertung.kunde?.nachname ? `${bewertung.kunde.nachname.charAt(0)}.` : ""}
                                        </span>
                                    </div>
                                    {bewertung.titel && <h4 className="font-bold text-slate-900 mb-1">{bewertung.titel}</h4>}
                                    <p className="text-slate-600 italic">"{bewertung.text}"</p>
                                    
                                    {(bewertung.checkin && bewertung.checkout) && (
                                        <p className="text-xs text-slate-400 mt-3">Reisezeitraum: {bewertung.checkin} bis {bewertung.checkout}</p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-500 italic bg-slate-50 p-4 rounded-xl border border-slate-100">Es gibt noch keine Bewertungen für dieses Hotel. Seien Sie der Erste, der nach seinem Aufenthalt eine Bewertung abgibt!</p>
                        )}
                    </div>

                    <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm mt-8">
                        <h4 className="font-bold text-slate-900 mb-2 text-xl">Erfahrungen teilen</h4>
                        <p className="text-slate-500 text-sm mb-6">Bitte geben Sie Ihre Buchungsdaten ein, um eine verifizierte Bewertung zu schreiben.</p>
                        
                        {reviewSuccess ? (
                            <div className="bg-green-50 text-green-700 p-6 rounded-2xl border border-green-100 flex flex-col items-center text-center">
                                <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
                                <h5 className="font-bold text-lg mb-1">Vielen Dank!</h5>
                                <p className="text-sm">Ihre Bewertung wurde erfolgreich übermittelt.</p>
                                <Button variant="outline" className="mt-4" onClick={() => setReviewSuccess(false)}>Weitere Bewertung schreiben</Button>
                            </div>
                        ) : (
                            <form onSubmit={submitReview} className="flex flex-col gap-6">
                                
                                {reviewSubmitError && (
                                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-start gap-3">
                                        <AlertTriangle className="w-5 h-5 shrink-0" />
                                        <p>{reviewSubmitError}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-bold text-slate-700 uppercase">E-Mail Adresse *</Label>
                                        <Input required type="email" placeholder="Ihre E-Mail" value={reviewEmail} onChange={(e) => setReviewEmail(e.target.value)} className="h-12 bg-white border-slate-200 rounded-xl" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-bold text-slate-700 uppercase">Buchungscode *</Label>
                                        <Input required type="text" placeholder="Ihre Buchungs-ID" value={reviewBookingCode} onChange={(e) => setReviewBookingCode(e.target.value)} className="h-12 bg-white border-slate-200 rounded-xl" />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ihre Bewertung</Label>
                                    <div 
                                        className="flex items-center gap-1"
                                        onMouseLeave={() => setReviewHover(0)} 
                                    >
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star 
                                                key={star} 
                                                className={`w-10 h-10 cursor-pointer transition-all duration-200 hover:scale-110 ${
                                                    star <= (reviewHover || reviewStars) 
                                                        ? "fill-yellow-400 text-yellow-400 drop-shadow-sm" 
                                                        : "fill-slate-100 text-slate-200"
                                                }`}
                                                onMouseEnter={() => setReviewHover(star)} 
                                                onClick={() => setReviewStars(star)}      
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Zusammenfassung (Titel)</Label>
                                    <Input required type="text" placeholder="Z.B. Wunderschöner Aufenthalt!" value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ihr Kommentar</Label>
                                    <textarea 
                                        required
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        placeholder="Beschreiben Sie Ihre Erfahrungen..." 
                                        className="flex w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-base outline-none min-h-[120px] transition-all hover:bg-white focus:bg-white focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 resize-none"
                                    ></textarea>
                                </div>

                                <Button 
                                    type="submit"
                                    disabled={isReviewSubmitting}
                                    className="w-full md:w-auto self-end mt-2 rounded-xl h-12 px-8 font-bold bg-blue-600 hover:bg-blue-700 text-base" 
                                >
                                    {isReviewSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Bitte warten...</> : "Bewertung absenden"}
                                </Button>
                            </form>
                        )}
                    </div>
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
                                <div className="space-y-3 max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                    {hotel.rooms?.map((room: any) => {
                                        const roomId = room.id || room.zimmer_id?.toString();
                                        const isSelected = selectedRooms.includes(roomId);
                                        return (
                                            <div key={roomId} onClick={() => toggleRoom(roomId)} className={`relative p-3 rounded-xl border transition-all cursor-pointer group ${isSelected ? 'border-blue-600 bg-blue-50 ring-1' : 'border-slate-200 hover:border-blue-400 bg-white'}`}>
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="font-bold text-sm text-slate-800">{room.bezeichnung || room.name}</span>
                                                    {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0 ml-2" />}
                                                </div>
                                                
                                                {room.beschreibung && (
                                                    <p className="text-xs text-slate-500 mb-2 line-clamp-2 leading-relaxed">{room.beschreibung}</p>
                                                )}
                                                
                                                <div className="text-xs text-slate-400 mb-2 font-medium">Max. {room.max_anzahl || room.max_gaeste} Pers.</div>
                                                <div className="flex justify-between items-end mt-2">
                                                    <span className="font-bold text-slate-900">{formatPrice(room.basispreis || room.pricePerNight)} <span className="text-xs font-normal text-slate-400">/ Nacht</span></span>
                                                    <span className={`text-xs font-bold px-2 py-1 rounded ${isSelected ? 'text-red-500 bg-red-100/50' : 'text-blue-600 bg-blue-50'}`}>{isSelected ? "Entfernen" : "Hinzufügen"}</span>
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
                            <span className="text-2xl font-mono font-bold text-blue-600">{successData.bookingCode || successData.buchungs_id || "Erfolgreich gebucht"}</span>
                        </div>
                        <Button className="w-full h-12 text-lg rounded-xl" onClick={() => { setIsOpen(false); resetRooms(); }}>Schließen & Zurück</Button>
                    </div>
                ) : (
                    <div className="p-8">
                        <DialogHeader className="mb-6 text-left">
                            <DialogTitle className="text-2xl font-bold text-slate-900">Abschluss der Buchung</DialogTitle>
                            <DialogDescription>Geben Sie Ihre Daten ein, um die Reservierung abzuschließen.</DialogDescription>
                        </DialogHeader>
                        {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 border border-red-100">{error}</div>}
                        
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5"><Label className="text-xs font-bold text-slate-700 uppercase">Vorname *</Label><Input required placeholder="Max" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className="h-12 bg-slate-50 border-slate-200 rounded-xl" /></div>
                                <div className="space-y-1.5"><Label className="text-xs font-bold text-slate-700 uppercase">Nachname *</Label><Input required placeholder="Mustermann" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className="h-12 bg-slate-50 border-slate-200 rounded-xl" /></div>
                            </div>
                            <div className="space-y-1.5"><Label className="text-xs font-bold text-slate-700 uppercase">E-Mail Adresse *</Label><Input required type="email" placeholder="max@beispiel.de" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="h-12 bg-slate-50 border-slate-200 rounded-xl" /></div>
                            
                            <Separator className="my-6" />
                            
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-slate-700 uppercase">Zahlungsmethode *</Label>
                                <select 
                                    required 
                                    value={form.paymentMethodId} 
                                    onChange={e => setForm({...form, paymentMethodId: e.target.value})} 
                                    className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none cursor-pointer"
                                >
                                    <option value="1">Kreditkarte</option>
                                    <option value="2">PayPal</option>
                                    <option value="3">Überweisung</option>
                                    <option value="4">Apple Pay</option>
                                </select>
                                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Info className="w-3 h-3"/> Sie erhalten die detaillierten Zahlungsinformationen per E-Mail.</p>
                            </div>

                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mt-6">
                                <div className="flex justify-between items-center mb-2"><span className="text-slate-600 font-medium">Gesamtbetrag:</span><span className="text-2xl font-extrabold text-blue-600">{formatPrice(price)}</span></div>
                                <p className="text-xs text-slate-500 leading-relaxed">Die Zahlung wird entsprechend der gewählten Methode abgewickelt.</p>
                            </div>
                            
                            <Button type="submit" className="w-full h-14 text-lg font-bold rounded-xl mt-4 bg-blue-600 hover:bg-blue-700" disabled={loading}>{loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Bitte warten...</> : "Kostenpflichtig buchen"}</Button>
                        </form>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}