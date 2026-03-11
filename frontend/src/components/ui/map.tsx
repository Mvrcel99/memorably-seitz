import { useEffect, useState } from 'react';
import { Map, Overlay } from 'pigeon-maps';
import type { HotelSearchDto } from '@/types/hotel';
import { Link } from 'react-router-dom';
import { formatPrice, getImageUrl } from '@/lib/utils';
import { MapPin, X, Plus, Minus } from 'lucide-react';

interface MapProps {
    hotels: HotelSearchDto[];
}

function getHotelCoords(hotel: any): { lat: number, lng: number } | null {
    const rawLat = hotel.latitude ?? hotel.LATITUDE ?? hotel.lat ?? hotel.Lat;
    const rawLng = hotel.longitude ?? hotel.LONGITUDE ?? hotel.lng ?? hotel.Lng;

    const lat = parseFloat(rawLat);
    const lng = parseFloat(rawLng);

    if (isNaN(lat) || isNaN(lng)) return null;
    if (lat === 0 && lng === 0) return null;

    return { lat, lng };
}

export function HotelMap({ hotels }: MapProps) {
    const [center, setCenter] = useState<[number, number]>([48.1351, 11.5820]);
    const [zoom, setZoom] = useState(4);
    const [selectedHotel, setSelectedHotel] = useState<HotelSearchDto | null>(null);
    const [hasAutoCentered, setHasAutoCentered] = useState(false);

    useEffect(() => {
        const validCoords: [number, number][] = [];

        hotels.forEach(h => {
            const coords = getHotelCoords(h);
            if (coords) {
                validCoords.push([coords.lat, coords.lng]);
            }
        });

// AI-Ref: Map-Auto-Center

        if (validCoords.length > 0 && !hasAutoCentered) {
            const sumLat = validCoords.reduce((a, b) => a + b[0], 0);
            const sumLng = validCoords.reduce((a, b) => a + b[1], 0);
            const avgLat = sumLat / validCoords.length;
            const avgLng = sumLng / validCoords.length;

            setCenter([avgLat, avgLng]);
            setZoom(validCoords.length === 1 ? 12 : 6);
            setHasAutoCentered(true);
        } else if (hotels.length === 0) {
            setHasAutoCentered(false); 
        }
    }, [hotels, hasAutoCentered]);

    return (
        <div className="h-full w-full relative z-0 bg-slate-100">
            <SafeMap 
                defaultCenter={[48.1351, 11.5820]} 
                center={center} 
                zoom={zoom} 
                onBoundsChanged={({ center, zoom, initial }: any) => { 
                    if(!initial) {
                        setCenter(center); 
                        setZoom(zoom); 
                    }
                }}
                onClick={() => setSelectedHotel(null)}
            >
                {hotels.map((hotel) => {
                    const coords = getHotelCoords(hotel);
                    if (!coords) return null; 

                    const isSelected = selectedHotel?.id === hotel.id;

                    return (
                        <SafeOverlay 
                            key={hotel.id} 
                            anchor={[coords.lat, coords.lng]} 
                            offset={[0, 0]} 
                        >
                            <div 
                                className="relative group cursor-pointer"
                                style={{ transform: 'translate(-50%, -100%)', zIndex: isSelected ? 50 : 1 }}
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    e.preventDefault();
                                    setSelectedHotel(hotel);
                                    setCenter([coords.lat, coords.lng]); 
                                }}
                            >
                                <MapPin 
                                    className={`w-10 h-10 drop-shadow-lg transition-transform duration-200 ${isSelected ? 'text-blue-600 fill-blue-100 scale-125' : 'text-slate-700 fill-white hover:scale-110 hover:text-blue-500'}`} 
                                    style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }}
                                />
                            </div>
                        </SafeOverlay>
                    );
                })}

                {selectedHotel && (
                    <SafeOverlay 
                        anchor={[getHotelCoords(selectedHotel)!.lat, getHotelCoords(selectedHotel)!.lng]} 
                        offset={[0, 0]}
                    >
                        <Link 
                            to={`/hotels/${selectedHotel.slug}`}
                            className="block relative rounded-2xl shadow-2xl w-56 h-36 overflow-hidden border-2 border-white group z-[100] mt-2"
                            style={{ transform: 'translateX(-50%)' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedHotel(null); }}
                                className="absolute top-2 right-2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 z-20 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                            
                            {selectedHotel.previewImageUrl ? (
                                <img 
                                    src={getImageUrl(selectedHotel.previewImageUrl)} 
                                    alt={selectedHotel.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-xs">Kein Bild</div>
                            )}
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none"></div>
                            
                            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end pointer-events-none">
                                <h3 className="font-bold text-white text-sm leading-tight line-clamp-2 drop-shadow-md pr-2">
                                    {selectedHotel.title}
                                </h3>
                                <span className="font-bold text-white text-sm bg-blue-600 px-2 py-1 rounded-lg shrink-0 shadow-sm">
                                    {formatPrice(selectedHotel.minPricePerNight)}
                                </span>
                            </div>
                        </Link>
                    </SafeOverlay>
                )}
            </SafeMap>
            
            <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
                <button onClick={() => setZoom(z => z + 1)} className="bg-white p-2 rounded-full shadow-md hover:bg-slate-50 text-slate-700"><Plus className="w-5 h-5" /></button>
                <button onClick={() => setZoom(z => z - 1)} className="bg-white p-2 rounded-full shadow-md hover:bg-slate-50 text-slate-700"><Minus className="w-5 h-5" /></button>
            </div>
        </div>
    );
}

const SafeMap = Map as any;
const SafeOverlay = Overlay as any;

export { HotelMap as Map };