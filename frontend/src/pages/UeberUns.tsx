import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from "@/components/ui/navbar";
import { Separator } from "@/components/ui/separator";
import { Instagram, Linkedin } from "lucide-react";

const UeberUns = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-40 pb-20 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Über uns</h1>
            <div className="w-20 h-1.5 bg-blue-600 rounded-full" />
          </div>

          <section className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>
              Wir sind ein Team aus vier engagierten Studenten der DHBW Heidenheim, die eine gemeinsame Vision teilen: 
              Das Reisen einfacher, transparenter und exklusiver zu gestalten.
            </p>
            <p>
              Die Geburtsstunde von Memorably verdanken wir maßgeblich unserer Studiengangsleitung. 
              Durch seine fachliche Unterstützung und Inspiration konnten wir dieses Projekt über die Theorie hinaus 
              entwickeln und uns mit dieser Hotelbuchungsplattform schließlich selbstständig machen.
            </p>
            <p>
              Was als Studienprojekt begann, ist heute eine Plattform, die moderne Technologie mit dem Fokus auf 
              unvergessliche Erlebnisse verbindet. Wir arbeiten täglich daran, die besten Destinationen für Sie 
              erreichbar zu machen.
            </p>
          </section>

          <Separator className="bg-slate-100" />
        </div>
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8 px-6 md:px-12">
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
            <button onClick={() => navigate('/ueber-uns')} className="text-blue-600 font-bold">
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

export default UeberUns;