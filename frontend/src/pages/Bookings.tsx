import React, { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Separator } from "@/components/ui/separator"; 
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"; 
import { formatPrice } from "@/lib/utils";
import { Search, AlertTriangle, CheckCircle, MapPin, Calendar, Users, Ban, CreditCard, History } from "lucide-react";
// NEU: Zusätzliche date-fns Funktionen importiert
import { format, parseISO, isPast, endOfDay, subHours, addHours } from "date-fns";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

import { useBookings } from "@/hooks/useBookings";

export default function Bookings() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  
  const { booking, isLoading, error, searchBooking, cancelBooking } = useBookings();

  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
  const [isCancelSuccessOpen, setIsCancelSuccessOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchBooking(email.trim(), code.trim());
  };

  const handleCancel = async () => {
    setIsCancelling(true);
    const success = await cancelBooking(email.trim(), code.trim());
    setIsCancelling(false);
    
    if (success) {
      setIsCancelConfirmOpen(false);
      setIsCancelSuccessOpen(true);
    } else {
      setIsCancelConfirmOpen(false);
    }
  };

  // --- LOGIK FÜR STATUS (Storniert, Vergangen, Aktiv) ---
  const isCancelled = booking?.status === "CANCELLED" || !!booking?.stornoDate;
  
  // WUNSCH 1: Prüfen, ob die Buchung vergangen ist (Datum nach dem Checkout-Tag)
  const isPastBooking = booking?.to ? isPast(endOfDay(parseISO(booking.to))) : false;
  
  // Wenn storniert oder vergangen, ist die Karte inaktiv/ausgegraut
  const isInactive = isCancelled || isPastBooking;

  // Dynamische Status-Plakette
  let statusConfig = { label: "BESTÄTIGT", color: "bg-white text-blue-600", icon: <CheckCircle className="w-4 h-4" /> };
  if (isCancelled) {
      statusConfig = { label: "STORNIERT", color: "bg-red-500/20 text-red-200", icon: <Ban className="w-4 h-4" /> };
  } else if (isPastBooking) {
      statusConfig = { label: "VERGANGEN", color: "bg-slate-500 text-white", icon: <History className="w-4 h-4" /> };
  }

  // --- WUNSCH 2: STORNOBEDINGUNGEN BERECHNEN ---
  const hotelInfo = booking?.rooms?.[0]?.hotel;
  const stornoProzent = hotelInfo?.stornogebuehr_prozent || 0;
  const stornoStunden = hotelInfo?.kostenlos_stornierbar_bis_stunden || 0;
  
  let freeCancelDate: Date | null = null;
  if (booking?.from && stornoStunden > 0) {
      // Angenommene Check-in Zeit: 15:00 Uhr am Anreisetag
      const checkinTime = addHours(parseISO(booking.from), 15); 
      freeCancelDate = subHours(checkinTime, stornoStunden);
  }

  // --- WUNSCH 3: ZAHLUNGSMETHODE ZUORDNEN ---
  const getPaymentMethodName = (id?: number | string) => {
      switch(String(id)) {
          case "1": return "Kreditkarte";
          case "2": return "PayPal";
          case "3": return "Überweisung";
          case "4": return "Apple Pay";
          default: return "Unbekannt / Vor Ort";
      }
  };
  // Fallback, falls die API "paymentMethodId" oder "zahlungsmethode_id" liefert
  const paymentMethodName = getPaymentMethodName(booking?.zahlungsmethode_id || booking?.paymentMethodId);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 pt-28">
      <Navbar />

      <main className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-2 text-center">Buchung verwalten</h1>
        <p className="text-slate-500 text-center mb-10">Geben Sie Ihren Buchungscode und Ihre E-Mail-Adresse ein.</p>

        <Card className="rounded-3xl shadow-sm border-slate-200 mb-8 relative z-10">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <Input type="email" required placeholder="E-Mail Adresse" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-xl bg-slate-50 border-slate-200" />
                <Input type="text" required placeholder="Buchungscode" value={code} onChange={(e) => setCode(e.target.value)} className="h-12 rounded-xl bg-slate-50 border-slate-200" />
                <Button type="submit" disabled={isLoading} className="h-12 px-8 rounded-xl font-bold">{isLoading ? "Suchen..." : <><Search className="w-4 h-4 mr-2" /> Suchen</>}</Button>
            </form>
            {error && <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center"><AlertTriangle className="w-5 h-5 mr-2 shrink-0" />{error}</div>}
          </CardContent>
        </Card>

        {booking && (
            <Card className={`rounded-3xl shadow-xl overflow-hidden animate-in fade-in transition-all duration-500 ${isInactive ? 'border-slate-300 bg-slate-50' : 'border-slate-200'}`}>
                
                {/* DYNAMISCHER HEADER (Blau, Rot oder Grau) */}
                <CardHeader className={`p-6 flex flex-row justify-between items-center transition-colors
                    ${isCancelled ? 'bg-red-600 text-white' : isPastBooking ? 'bg-slate-300 text-slate-700' : 'bg-blue-600 text-white'}
                `}>
                    <div>
                        <CardTitle className={`text-2xl font-bold ${isCancelled ? 'line-through opacity-80' : ''}`}>Buchungsdetails</CardTitle>
                        <span className="opacity-80 font-mono text-sm">Code: {booking.bookingCode}</span>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm ${statusConfig.color}`}>
                        {statusConfig.icon} {statusConfig.label}
                    </div>
                </CardHeader>

                <CardContent className={`p-6 space-y-6 ${isInactive ? 'opacity-70 grayscale' : ''}`}>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Hotel</span>
                        <div className={`flex items-center text-lg font-bold ${isCancelled ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                            <MapPin className={`w-5 h-5 mr-2 ${isCancelled ? 'text-slate-400' : 'text-blue-600'}`} /> {hotelInfo?.title } ({hotelInfo?.city })
                        </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Zeitraum</span>
                            <div className={`flex items-center font-medium ${isCancelled ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                <Calendar className="w-4 h-4 text-slate-400 mr-2" /> 
                                {booking.from && format(parseISO(booking.from), "dd.MM.yyyy")} - {booking.to && format(parseISO(booking.to), "dd.MM.yyyy")}
                            </div>
                        </div>
                        <div>
                            <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Gäste</span>
                            <div className={`flex items-center font-medium ${isCancelled ? 'text-slate-400 line-through' : 'text-slate-700'}`}><Users className="w-4 h-4 text-slate-400 mr-2" /> {booking.howMany || booking.anzahl_gaeste} Personen</div>
                        </div>
                    </div>
                    <Separator />
                    
                    {/* ZIMMER & PREISE */}
                    <div>
                        <span className="text-xs text-slate-400 font-bold uppercase block mb-3">Gebuchte Zimmer</span>
                        <ul className="space-y-2">
                            {booking.rooms?.map((room: any) => (
                                <li key={room.id || room.zimmer_id} className="flex justify-between bg-white p-3 rounded-lg border border-slate-200">
                                    <span className={`font-medium ${isCancelled ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{room.name || room.bezeichnung}</span>
                                    <span className={`${isCancelled ? 'text-slate-400 line-through' : 'text-slate-500'}`}>{formatPrice(room.pricePerNight || room.basispreis)} / Nacht</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* WUNSCH 3: ZAHLUNGSMETHODE */}
                    <div className="bg-slate-100/50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-slate-600 font-medium">
                            <CreditCard className="w-5 h-5 text-slate-400" />
                            <span>Zahlungsmethode</span>
                        </div>
                        <span className="font-bold text-slate-800">{paymentMethodName}</span>
                    </div>

                    <div className="flex justify-between items-end pt-2">
                        <span className="text-lg font-bold text-slate-700">Gesamtbetrag</span>
                        <span className={`text-3xl font-extrabold ${isCancelled ? 'text-slate-400 line-through' : 'text-blue-600'}`}>
                            {formatPrice(booking.totalPrice * (booking.howMany || 1))} {/* Fallback-Berechnung falls totalPrice fehlt */}
                        </span>
                    </div>
                </CardContent>

                {/* Stornierungs-Footer (Nur anzeigen, wenn NICHT storniert und NICHT vergangen) */}
                {!isInactive && (
                    <CardFooter className="p-6 pt-0 flex-col items-stretch bg-white rounded-b-3xl">
                        <Button variant="destructive" className="w-full h-12 text-lg font-bold rounded-xl" onClick={() => setIsCancelConfirmOpen(true)}>Buchung stornieren</Button>
                        
                        {/* WUNSCH 2: Detaillierte Stornobedingungen */}
                        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                {freeCancelDate ? (
                                    <>
                                        Kostenlos stornierbar bis <strong className="text-slate-700">{format(freeCancelDate, "dd.MM.yyyy, HH:mm")} Uhr</strong>. <br/>
                                        {stornoProzent > 0 && `Danach fallen ${stornoProzent}% Stornogebühr an.`}
                                    </>
                                ) : (
                                    "Bitte beachten Sie unsere allgemeinen Stornierungsbedingungen."
                                )}
                            </p>
                        </div>
                    </CardFooter>
                )}
            </Card>
        )}
      </main>

      <AlertDialog open={isCancelConfirmOpen} onOpenChange={setIsCancelConfirmOpen}>
        <AlertDialogContent className="bg-white rounded-3xl sm:max-w-md border-none shadow-2xl p-8">
          <AlertDialogHeader>
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 mx-auto sm:mx-0"><AlertTriangle className="w-8 h-8" /></div>
            <AlertDialogTitle className="text-2xl font-bold text-slate-900">Sind Sie sicher?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600 text-base mt-2">
                Möchten Sie Ihre Buchung für das <strong>{hotelInfo?.title}</strong> wirklich stornieren?
                {stornoProzent > 0 && (
                     <span className="block mt-3 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
                        {freeCancelDate && isPast(freeCancelDate) 
                            ? `Achtung: Die kostenlose Stornofrist ist abgelaufen. Es fallen ${stornoProzent}% Stornogebühren an.` 
                            : `Bis zum ${freeCancelDate ? format(freeCancelDate, "dd.MM.") : "Check-in"} ist die Stornierung kostenlos.`}
                     </span>
                )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-8 flex gap-3 sm:gap-4">
            <AlertDialogCancel disabled={isCancelling} className="flex-1 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 border-none mt-0 text-slate-700">Zurück</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => { e.preventDefault(); handleCancel(); }} className="flex-1 h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white m-0" disabled={isCancelling}>{isCancelling ? "Wird storniert..." : "Ja, stornieren"}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isCancelSuccessOpen} onOpenChange={setIsCancelSuccessOpen}>
        <DialogContent className="bg-white sm:max-w-md text-center p-8 rounded-3xl border-none shadow-2xl">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <DialogTitle className="text-2xl font-bold mb-2 text-slate-900">Erfolgreich storniert</DialogTitle>
            <DialogDescription className="mb-8 text-slate-600 text-base">Ihre Buchung wurde storniert und der Code deaktiviert.</DialogDescription>
            <Button className="w-full h-12 rounded-xl text-lg font-bold bg-slate-900 hover:bg-slate-800 text-white" onClick={() => setIsCancelSuccessOpen(false)}>Fenster schließen</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}