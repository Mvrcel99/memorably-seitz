import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useHomeSearch } from '../hooks/useHomeSearch';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Search, Instagram, Linkedin } from "lucide-react";
import { DestinationSearch } from "@/components/ui/destination-search";
import { DateSearch } from "@/components/ui/date-search";
import { GuestSearch } from "@/components/ui/guest-search";
import { Navbar } from "@/components/ui/navbar";

const Home = () => {
  const navigate = useNavigate();
  const {
    destination, setDestination,
    date, setDate,
    adults, setAdults,
    children, setChildren,
    rooms, setRooms,
    handleSearch
  } = useHomeSearch();

  return (
    <div className="relative min-h-screen w-full font-sans">
      <Navbar />

      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <video
          autoPlay muted loop playsInline
          className="fixed top-0 left-0 w-full h-full object-cover -z-50"
        >
          <source src="/video/background.mp4" type="video/mp4" />
        </video>
        <div className="fixed top-0 left-0 w-full h-full bg-black/30 -z-40" />

        <div className="relative z-10 w-full max-w-6xl px-4 flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-12 text-center drop-shadow-2xl">
            Memorably
          </h1>

          <div className="w-full max-w-5xl bg-white rounded-full shadow-2xl p-2 flex flex-col md:flex-row items-center border border-slate-200">
            <DestinationSearch value={destination} onChange={setDestination} />
            <Separator orientation="vertical" className="hidden md:block h-12 bg-slate-100" />
            <DateSearch date={date} onSelect={setDate} />
            <Separator orientation="vertical" className="hidden md:block h-12 bg-slate-100" />
            <GuestSearch adults={adults} setAdults={setAdults} children={children} setChildren={setChildren} rooms={rooms} setRooms={setRooms} />
            <Button onClick={handleSearch} size="icon" className="rounded-full h-16 w-16 bg-blue-600 hover:bg-blue-700 shrink-0 shadow-xl ml-4 transition-all hover:scale-105 active:scale-95">
              <Search className="h-7 w-7 text-white" />
            </Button>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-white py-32 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Wieso Memorably?
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full" />
          <p className="text-xl text-slate-600 leading-relaxed italic">
            "Bei Memorably geht es nicht nur um eine einfache Buchung. Wir glauben daran, 
            dass jeder Urlaub eine Geschichte verdient, die man nie vergisst. Deshalb wählen 
            wir sorgfältig nur die exklusivsten Hotels an den schönsten Orten der Welt für Sie aus."
          </p>
          <p className="text-lg text-slate-500 leading-relaxed">
            Unser Ziel ist es, Ihnen den Weg zu Ihrem Traumziel so einfach wie möglich zu machen – 
            transparent, sicher und mit dem Fokus auf das, was zählt: Ihre Erholung.
          </p>
        </div>
      </section>

      <footer className="relative z-10 bg-slate-50 border-t border-slate-200 pt-16 pb-8 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex-1 text-left order-2 md:order-1">
            <button onClick={() => navigate('/impressum')} className="text-slate-500 hover:text-blue-600 transition-colors font-medium">
              Impressum
            </button>
          </div>

          <div className="flex flex-col items-center gap-6 order-1 md:order-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Social Media</span>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-3 bg-white rounded-full shadow-sm border border-slate-100 hover:scale-110 transition-transform">
                <Instagram className="h-5 w-5 text-slate-700" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-3 bg-white rounded-full shadow-sm border border-slate-100 hover:scale-110 transition-transform">
                <Linkedin className="h-5 w-5 text-slate-700" />
              </a>
            </div>
          </div>

          <div className="flex-1 text-right order-3">
            <button onClick={() => navigate('/ueber-uns')} className="text-slate-500 hover:text-blue-600 transition-colors font-medium">
              Über uns
            </button>
          </div>
        </div>

        <Separator className="mt-16 mb-8 bg-slate-200" />
        
        <div className="text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest">
            © 2026 Memorably
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;