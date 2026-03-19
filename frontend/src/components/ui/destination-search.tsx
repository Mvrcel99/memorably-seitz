import React, { useState, useEffect } from 'react';
import { MapPin, Check, Loader2 } from "lucide-react";
import {Popover, PopoverContent, PopoverAnchor,} from "@/components/ui/popover";
import { API_BASE_URL } from "../../lib/api";

interface DestinationSearchProps {
  value: string;
  onChange: (val: string) => void;
}

export const DestinationSearch = ({ value, onChange }: DestinationSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {

      const cachedCities = sessionStorage.getItem('memorably_cities');
      
      if (cachedCities) {
        setCities(JSON.parse(cachedCities));
        setIsLoading(false);
        return; 
      }

      try {
     
        const response = await fetch(`${API_BASE_URL}/hotels`);
        
        if (response.ok) {
            const data = await response.json();
            
            const uniqueCities = Array.from(new Set(data.map((h: any) => h.city))).filter(Boolean) as string[];
            setCities(uniqueCities);
            
            sessionStorage.setItem('memorably_cities', JSON.stringify(uniqueCities));
        }
      } catch (error) {
        console.error("Konnte Städte nicht laden:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  const filteredCities = cities.filter(city => 
    city.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverAnchor asChild>
        <div className="flex items-center flex-1 px-8 py-3 hover:bg-slate-50 rounded-full cursor-pointer transition w-full group relative">
          <MapPin className="text-blue-600 mr-3 h-5 w-5 shrink-0" />
          <div className="flex flex-col text-left w-full">
            <span className="text-[10px] font-bold uppercase text-slate-400">Reiseziel</span>
            <input 
              placeholder="Wohin geht's?" 
              value={value}
              onFocus={() => setIsOpen(true)}
              onChange={(e) => {
                onChange(e.target.value);
                if(!isOpen) setIsOpen(true);
              }}
              className="border-0 p-0 h-auto focus:ring-0 text-sm bg-transparent outline-none w-full placeholder:text-slate-400 font-medium text-slate-900 truncate"
            />
          </div>
        </div>
      </PopoverAnchor>
      
      <PopoverContent 
        className="w-[300px] p-2 bg-white rounded-2xl shadow-xl border border-slate-100 mt-2"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
          <span className="text-[10px] font-bold text-slate-400 px-3 py-2 uppercase tracking-wider">
            {value.length > 0 ? "Suchergebnisse" : "Beliebte Ziele"}
          </span>
          
          {isLoading ? (
             <div className="flex items-center px-4 py-3 text-sm text-slate-400">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Lade Ziele...
             </div>
          ) : filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <button
                key={city}
                onClick={() => {
                  onChange(city);
                  setIsOpen(false);
                }}
                className="flex items-center justify-between px-4 py-3 text-sm hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-xl transition-all text-left font-medium group"
              >
                <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-slate-400 group-hover:text-blue-500" />
                    {city}
                </div>
                {value === city && <Check className="h-4 w-4 text-blue-600" />}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-slate-400 italic">
                Keine passenden Ziele gefunden.
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};