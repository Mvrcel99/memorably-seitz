import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; 
import { format, parse, isValid } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Search } from "lucide-react";


import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"; 
import { Card } from "@/components/ui/card"; 
import { HotelList } from "@/components/ui/hotellist"; 
import type { HotelSearchDto } from "@/types/hotel";
import { Map } from "@/components/ui/map"; 
import { DestinationSearch } from "@/components/ui/destination-search";
import { DateSearch } from "@/components/ui/date-search";
import { GuestSearch } from "@/components/ui/guest-search";
import { API_BASE_URL } from "@/lib/api"; 

function useHotelSearch(searchParams: URLSearchParams) {
  const [hotels, setHotels] = useState<HotelSearchDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      setIsLoading(true); setErrorMsg(null);
      const apiQuery = new URLSearchParams();
      
      if (searchParams.get("city")) apiQuery.append("ort", searchParams.get("city")!);
      if (searchParams.get("from")) apiQuery.append("from", searchParams.get("from")!);
      if (searchParams.get("to")) apiQuery.append("to", searchParams.get("to")!);

      try {
        const response = await fetch(`${API_BASE_URL}/hotels?${apiQuery.toString()}`);
        if (!response.ok) throw new Error(response.status === 400 ? "Ungültige Suchanfrage." : "Fehler beim Laden.");
        setHotels(await response.json());
      } catch (error: any) {
        setHotels([]); setErrorMsg(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHotels();
  }, [searchParams]);

  return { hotels, isLoading, errorMsg };
}

export default function Listview() {
  const navigate = useNavigate(); 
  const [searchParams, setSearchParams] = useSearchParams();
  
  const { hotels, isLoading, errorMsg } = useHotelSearch(searchParams);


  const [city, setCity] = useState(searchParams.get("city") || "");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const from = searchParams.get("from"), to = searchParams.get("to");
    return from && isValid(parse(from, "yyyy-MM-dd", new Date())) 
      ? { from: parse(from, "yyyy-MM-dd", new Date()), to: to ? parse(to, "yyyy-MM-dd", new Date()) : undefined }
      : undefined;
  });
  const [adults, setAdults] = useState(Number(searchParams.get("adults")) || 2);
  const [childrenCount, setChildrenCount] = useState(Number(searchParams.get("children")) || 0);
  const [rooms, setRooms] = useState(Number(searchParams.get("rooms")) || 1);

  const handleSearchClick = (e?: React.FormEvent) => {
    if (e) e.preventDefault(); 
    const nextParams = new URLSearchParams();
    if (city) nextParams.set("city", city);
    if (dateRange?.from) nextParams.set("from", format(dateRange.from, "yyyy-MM-dd"));
    if (dateRange?.to) nextParams.set("to", format(dateRange.to, "yyyy-MM-dd"));
    nextParams.set("adults", adults.toString());
    nextParams.set("children", childrenCount.toString());
    nextParams.set("rooms", rooms.toString());
    setSearchParams(nextParams);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <div className="bg-blue-600 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto py-4 px-4 flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 cursor-pointer flex-shrink-0 group" onClick={() => navigate('/')}>
                 <img src="/img/logo.png" alt="Memorably Logo" className="h-10 w-auto transition-transform group-hover:scale-105" />
            </div>

            <form onSubmit={handleSearchClick} className="flex-1 w-full max-w-4xl mx-auto lg:mx-8">
                <Card className="bg-white rounded-full shadow-lg border-0 flex items-center p-1.5 w-full">
                    <div className="flex-[1.2]"><DestinationSearch value={city} onChange={setCity} /></div>
                    <Separator orientation="vertical" className="h-8 bg-slate-200 mx-1" />
                    <div className="flex-[1.5]"><DateSearch date={dateRange} onSelect={setDateRange} /></div>
                    <Separator orientation="vertical" className="h-8 bg-slate-200 mx-1" />
                    <div className="flex-[1.2] flex items-center pr-1">
                        <GuestSearch adults={adults} setAdults={setAdults} children={childrenCount} setChildren={setChildrenCount} rooms={rooms} setRooms={setRooms} />
                        <Button type="submit" className="h-10 w-10 rounded-full bg-blue-600  text-white hover:bg-blue-700 ml-2 shadow-sm shrink-0 transition-transform active:scale-95">
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                </Card>
            </form>
            <div className="hidden lg:block w-[50px]"></div>
        </div>
      </div>

      <main className="flex-1 container mx-auto p-4 mt-2">
        {errorMsg && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 shadow-sm"><strong>Info: </strong> {errorMsg}</div>}
        
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
          <div className="w-full lg:w-3/5 flex flex-col h-full overflow-hidden">
            <h1 className="text-xl font-bold text-slate-900 mb-4">{hotels.length > 0 ? `${hotels.length} Unterkünfte gefunden` : "Suche..."}</h1>


            <div className="flex-1 overflow-y-auto pr-2 pb-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <HotelList hotels={hotels} isLoading={isLoading} />
            </div>
          </div>
          
          <div className="hidden lg:block lg:w-2/5 h-full relative">
            <Card className="h-full w-full rounded-2xl overflow-hidden border-slate-200 shadow-inner">
                <Map hotels={hotels} />
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}