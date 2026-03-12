import { useState } from "react";
import { ChevronLeft, ChevronRight, X, ImageOff } from "lucide-react";
import { getImageUrl } from "@/lib/utils";

// HIER SIND WIR WIEDER BEI URL UND ALT:
interface ImageGalleryProps {
  images: { url: string; alt: string; sortOrder?: number }[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const hasImages = images && images.length > 0;

  const openLightbox = (index: number) => {
    if (!hasImages) return;
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 h-[400px] md:h-[500px] rounded-[32px] overflow-hidden shadow-lg bg-white">
        <div 
            className="md:col-span-3 h-full bg-slate-200 relative group cursor-pointer overflow-hidden flex items-center justify-center"
            onClick={() => hasImages && openLightbox(0)}>
            {hasImages ? (
                <img 
                    src={getImageUrl(images[0].url)} 
                    alt={images[0].alt || "Main View"} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            ) : (
                <div className="flex flex-col items-center text-slate-400">
                    <ImageOff size={48} className="mb-2" />
                    <span>Keine Bilder verfügbar</span>
                </div>
            )}
        </div>
        
        <div className="hidden md:grid grid-rows-2 gap-0 h-full">
            {hasImages ? images.slice(1, 3).map((img, idx) => (
                <div 
                    key={idx} 
                    className="bg-slate-100 overflow-hidden cursor-pointer relative group border-b border-white last:border-b-0 border-l"
                    onClick={() => openLightbox(idx + 1)}>
                    <img 
                        src={getImageUrl(img.url)} 
                        alt={img.alt || `Bild ${idx + 2}`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
            )) : (
                Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="bg-slate-50 border-b border-white last:border-b-0 border-l" />
                ))
            )}
        </div>
      </div>

      {lightboxOpen && hasImages && (
          <div 
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300"
              onClick={() => setLightboxOpen(false)}
          >
              <button onClick={() => setLightboxOpen(false)} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-50"><X className="w-8 h-8" /></button>
              <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 bg-black/20 hover:bg-black/40 rounded-full transition-all z-50"><ChevronLeft className="w-8 h-8" /></button>
              <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 bg-black/20 hover:bg-black/40 rounded-full transition-all z-50"><ChevronRight className="w-8 h-8" /></button>

              <div className="relative max-w-7xl max-h-[90vh] w-full flex justify-center">
                  <img 
                      src={getImageUrl(images[activeImageIndex].url)} 
                      alt="Fullscreen" 
                      className="max-w-full max-h-[85vh] object-contain rounded shadow-2xl animate-in fade-in zoom-in duration-300"
                      onClick={(e) => e.stopPropagation()} 
                  />
                  <div className="absolute bottom-[-40px] text-white/80 text-sm">
                      Bild {activeImageIndex + 1} von {images.length}
                  </div>
              </div>
          </div>
      )}
    </>
  );
}