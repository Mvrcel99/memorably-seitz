import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";

export const useHomeSearch = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({ from: new Date(), to: undefined });
  const [adults, setAdults] = useState(2); 
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (destination) params.set("city", destination);
    if (date?.from) params.set("from", format(date.from, "yyyy-MM-dd"));
    if (date?.to) params.set("to", format(date.to, "yyyy-MM-dd"));
    
    params.set("adults", adults.toString());
    params.set("children", children.toString());
    params.set("rooms", rooms.toString());

    navigate(`/search?${params.toString()}`);
  };

  return {
    destination, setDestination,
    date, setDate,
    adults, setAdults,
    children, setChildren,
    rooms, setRooms,
    handleSearch
  };
};