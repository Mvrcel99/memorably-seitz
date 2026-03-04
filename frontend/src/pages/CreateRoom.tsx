import { useCreateRoom } from '../hooks/useCreateRoom';
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Loader2, X, Euro, Users, Hash } from "lucide-react";

const CreateRoom = () => {
  const {
    hotels,
    loading,
    fetchingHotels,
    selectedHotelId,
    setSelectedHotelId,
    formData,
    setFormData,
    previewUrls,
    handleFileSelect,
    removeFile,
    handleSubmit,
    navigate
  } = useCreateRoom();

  if (fetchingHotels) return <div className="min-h-screen flex items-center justify-center">Lade...</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <Navbar />
      <main className="pt-32 px-6 max-w-3xl mx-auto">
        
        <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate('/owner/dashboard')} className="pl-0 hover:bg-transparent text-slate-500 hover:text-slate-900">
                <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zum Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-slate-900 mt-2">Neues Zimmer anlegen</h1>
        </div>

        <Card className="border-none shadow-sm">
            <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Zu welchem Hotel gehört das Zimmer?</Label>
                            {hotels.length > 0 ? (
                                <Select value={selectedHotelId} onValueChange={setSelectedHotelId} required>
                                    <SelectTrigger className="bg-white">
                                        <SelectValue placeholder="Hotel wählen" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white shadow-lg border border-slate-200">
                                        {hotels.map((h: any) => (
                                            <SelectItem key={h.id || h.hotelId} value={h.id || h.hotelId}>{h.title || h.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <div className="text-red-500 text-sm">Keine Hotels gefunden. Bitte legen Sie erst ein Hotel an.</div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Zimmertyp</Label>
                            <Select value={formData.roomTypeId} onValueChange={(val) => setFormData({...formData, roomTypeId: val})} required>
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Typ wählen" />
                                </SelectTrigger>
                                <SelectContent className="bg-white shadow-lg border border-slate-200">
                                    <SelectItem value="1">Einzelzimmer</SelectItem>
                                    <SelectItem value="2">Doppelzimmer</SelectItem>
                                    <SelectItem value="3">Suite</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Zimmername</Label>
                            <Input 
                                required 
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                placeholder="z.B. Deluxe Suite"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Zimmernummer</Label>
                            <div className="relative">
                                <Hash className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input 
                                    type="text"
                                    className="pl-9"
                                    value={formData.roomNumber}
                                    onChange={e => setFormData({...formData, roomNumber: e.target.value})}
                                    placeholder="101"
                                    required 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Beschreibung</Label>
                        <Textarea 
                            required 
                            className="min-h-[100px]"
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                            placeholder="Beschreiben Sie die Ausstattung und den Ausblick..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Preis pro Nacht (€)</Label>
                            <div className="relative">
                                <Euro className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input 
                                    type="text" 
                                    required 
                                    className="pl-9"
                                    value={formData.pricePerNight}
                                    onChange={e => setFormData({...formData, pricePerNight: e.target.value})}
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Max. Personen</Label>
                            <div className="relative">
                                <Users className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input 
                                    type="number" 
                                    required 
                                    min="1"
                                    className="pl-9"
                                    value={formData.maxGuests}
                                    onChange={e => setFormData({...formData, maxGuests: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-slate-100">
                        <Label className="text-base font-semibold">Bilder hochladen</Label>
                        
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {previewUrls.map((url: string, idx: number) => (
                                <div key={idx} className="relative aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                    <img src={url} alt="Preview" className="w-full h-full object-cover" />
                                    <button 
                                        type="button"
                                        onClick={() => removeFile(idx)}
                                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                            
                            <label className="border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all aspect-video">
                                <Upload className="text-slate-400 mb-2" />
                                <span className="text-xs text-slate-500 font-medium">Bilder wählen</span>
                                <input 
                                    type="file" 
                                    multiple 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={handleFileSelect}
                                />
                            </label>
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg font-bold" 
                        disabled={loading}
                    >
                        {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin"/> Speichere...</> : "Zimmer erstellen"}
                    </Button>

                </form>
            </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateRoom;