import { useState, useEffect } from "react";
import type { HotelDetailDto } from "@/types/hotel";
import { API_BASE_URL } from "@/lib/api";

export function useHotelDetail(slug: string | undefined) {
  const [hotel, setHotel] = useState<HotelDetailDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchHotel = async () => {
          if (!slug) return;
          setIsLoading(true);
          try {
              const res = await fetch(`${API_BASE_URL}/hotels/${slug}`);
              if (!res.ok) throw new Error("Hotel konnte nicht geladen werden.");
              setHotel(await res.json());
          } catch (err: any) { setError(err.message); } finally { setIsLoading(false); }
      };
      fetchHotel();
  }, [slug]);

  return { hotel, isLoading, error };
}