import { useEditHotel } from '../hooks/useEditHotel';
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, Star, MapPin, Building, Upload, Trash2, X, Image as ImageIcon, Settings } from "lucide-react";

const EditHotel = () => {
  const {
    loading,
    formData,
    setFormData,
    existingImages,
    previewUrls,
    handleFileSelect,
    removeNewFile,
    handleDeleteExistingImage,
    handleSubmit,
    getImageUrl,
    navigate,
    allFeatures,
    selectedFeatures,
    handleFeatureToggle
  } = useEditHotel();

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <Navbar />
      <main className="pt-32 px-6 max-w-3xl mx-auto">
        <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate('/owner/dashboard')} className="pl-0 hover:bg-transparent text-slate-500 hover:text-slate-900">
                <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zum Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-slate-900 mt-2">Hotel bearbeiten</h1>
        </div>

        <Card className="border-none shadow-sm">
            <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="space-y-2">
                        <Label>Hotelname</Label>
                        <div className="relative">
                            <Building className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input 
                                required 
                                className="pl-9"
                                value={formData.title}
                                onChange={e => setFormData({...formData, title: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Beschreibung</Label>
                        <Textarea 
                            required 
                            className="min-h-[120px]"
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Stadt / Ort</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input 
                                    required 
                                    className="pl-9"
                                    value={formData.city}
                                    onChange={e => setFormData({...formData, city: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Land</Label>
                            <Input 
                                required 
                                value={formData.country}
                                onChange={e => setFormData({...formData, country: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Sterne (0-5)</Label>
                        <div className="relative">
                            <Star className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input 
                                type="number" 
                                min="0"
                                max="5"
                                required 
                                className="pl-9"
                                value={formData.stars}
                                onChange={e => setFormData({...formData, stars: e.target.value})}
                            />
                        </div>
                    </div>

                    {/* NEU: Features / Ausstattung */}
                    <div className="pt-6 border-t border-slate-200 mt-6 space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                            <Settings className="mr-2 h-5 w-5 text-blue-600" />
                            Ausstattung (Features)
                        </h3>
                        {allFeatures && allFeatures.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {allFeatures.map((feature: any) => {
                                    const fId = feature.id || feature.ausstattung_id || feature._id;
                                    const fName = feature.titel || feature.name || feature.bezeichnung;
                                    return (
                                        <Label key={fId} className="flex items-center space-x-3 cursor-pointer p-4 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-blue-200 transition-all">
                                            <input 
                                                type="checkbox" 
                                                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                checked={selectedFeatures.includes(fId)}
                                                onChange={(e) => handleFeatureToggle(fId, e.target.checked)}
                                            />
                                            <span className="text-sm font-medium text-slate-700">{fName}</span>
                                        </Label>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500 italic">Lade Features oder keine verfügbar...</p>
                        )}
                    </div>

                    {/* Bilder-Bereich (Hotel) */}
                    <div className="pt-6 border-t border-slate-200 mt-6 space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                                <ImageIcon className="mr-2 h-5 w-5 text-blue-600" />
                                Hotel-Bilder
                            </h3>
                            
                            {/* Vorhandene Bilder löschen */}
                            <div className="mb-6">
                                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">Aktuell gespeicherte Bilder</Label>
                                {existingImages.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {existingImages.map((img) => (
                                            <div key={img.id} className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-50 aspect-square">
                                                <img 
                                                    src={getImageUrl(img.url)} 
                                                    alt="Hotel Bild" 
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = "https://placehold.co/400x400?text=Fehler";
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Button 
                                                        type="button" 
                                                        variant="destructive" 
                                                        size="icon" 
                                                        onClick={() => handleDeleteExistingImage(img.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-500 italic">Keine Bilder vorhanden.</p>
                                )}
                            </div>

                            {/* Neue Bilder hochladen */}
                            <div>
                                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">Neue Bilder hinzufügen</Label>
                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors relative">
                                    <input 
                                        type="file" 
                                        multiple 
                                        accept="image/*" 
                                        onChange={handleFileSelect} 
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                    />
                                    <Upload className="mx-auto h-8 w-8 text-slate-400 mb-3" />
                                    <p className="text-sm text-slate-600">
                                        <span className="font-semibold text-blue-600">Klicken</span> oder Dateien hierher ziehen
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">PNG, JPG (werden automatisch optimiert)</p>
                                </div>

                                {/* Vorschau der neuen Bilder */}
                                {previewUrls.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                        {previewUrls.map((url, index) => (
                                            <div key={index} className="relative rounded-xl overflow-hidden border border-slate-200 aspect-square">
                                                <img src={url} alt={`Vorschau ${index + 1}`} className="w-full h-full object-cover" />
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeNewFile(index)} 
                                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-sm"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg font-bold mt-8" 
                        disabled={loading}
                    >
                        {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin"/> Speichere...</> : "Hoteldaten & Bilder aktualisieren"}
                    </Button>

                </form>
            </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditHotel;