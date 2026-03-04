import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from "@/components/ui/navbar";
import { Separator } from "@/components/ui/separator";
import { Instagram, Linkedin } from "lucide-react";

const Impressum = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Impressum</h1>
            <div className="w-20 h-1.5 bg-blue-600 rounded-full" />
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Angaben gemäß § 5 TMG</h2>
            <div className="text-lg text-slate-600 leading-relaxed">
              <p>Max Mustermann</p>
              <p>Musterstraße 123</p>
              <p>12345 Musterstadt</p>
            </div>
          </section>

          <Separator className="bg-slate-100" />

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Kontakt</h2>
            <div className="text-lg text-slate-600 leading-relaxed">
              <p>Telefon: +49 (0) 123 456789</p>
              <p>E-Mail: max.mustermann@beispiel.de</p>
            </div>
          </section>

          <Separator className="bg-slate-100" />

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <div className="text-lg text-slate-600 leading-relaxed">
              <p>Max Mustermann</p>
              <p>Musterstraße 123</p>
              <p>12345 Musterstadt</p>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex-1 text-left order-2 md:order-1">
            <button onClick={() => navigate('/impressum')} className="text-blue-600 font-bold">
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

export default Impressum;