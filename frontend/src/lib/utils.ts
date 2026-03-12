import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { API_BASE_URL } from "@/lib/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatPrice = (cents: number | undefined | null): string => {
 if (cents === undefined || cents === null) return "0,00 €";
 return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(cents);
};


export const getImageUrl = (path: string | null | undefined): string => {
   if (!path) return "https://placehold.co/800x600?text=No+Image";
   if (path.startsWith("http")) return path;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${API_BASE_URL}${cleanPath}`;
};