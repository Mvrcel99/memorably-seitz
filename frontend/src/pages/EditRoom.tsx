import { useEditRoom } from '../hooks/useEditRoom';
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, Upload, X, Trash2, Image as ImageIcon } from "lucide-react";

const EditRoom = () => {
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
    navigate
  } = useEditRoom();

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <Navbar />
      <main className="pt-32 px-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/owner/dashboard')} className="pl-0 hover:bg-transparent text-slate-500 hover:text-slate-900">
            <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zum Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">Zimmer bearbeiten</h1>
          <p className="text-slate-500 mt-1">Passen Sie die Details und Bilder für dieses Zimmer an.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* BILDER SEKTION */}
          <Card className="border-none shadow-sm overflow-hidden">
            <div className="bg-slate-100/50 border-b border-slate-100 px-6 py-4">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-blue-600" /> Zimmer-Bilder
              </h2>
            </div>
            <CardContent className="p-6 space-y-6">
              
              {/* Bestehende Bilder */}
              {existingImages.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-slate-500 uppercase text-xs font-bold tracking-wider">Aktuell gespeicherte Bilder</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {existingImages.map((img) => (
                      <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                        <img src={getImageUrl(img.url)} alt="Room" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button 
                            type="button" 
                            variant="destructive" 
                            size="icon" 
                            onClick={() => handleDeleteExistingImage(img.id)}
                            className="h-8 w-8 rounded-full shadow-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Neue Bilder hinzufügen */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <Label className="text-slate-500 uppercase text-xs font-bold tracking-wider">Neue Bilder hinzufügen</Label>
                
                {previewUrls.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative aspect-square rounded-xl overflow-hidden border-2 border-blue-200 shadow-sm">
                        <img src={url} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeNewFile(index)}
                          className="absolute top-2 right-2 bg-white text-red-500 p-1.5 rounded-full shadow-md hover:bg-red-50 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white text-[10px] font-bold text-center py-1">
                          NEU
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 hover:border-blue-400 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-slate-400" />
                      <p className="mb-2 text-sm text-slate-600"><span className="font-semibold">Klicken</span> oder Dateien hierher ziehen</p>
                      <p className="text-xs text-slate-500">PNG, JPG (werden automatisch optimiert)</p>
                    </div>
                    <input type="file" className="hidden" multiple accept="image/*" onChange={handleFileSelect} />
                  </label>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* TEXT DATEN SEKTION */}
          <Card className="border-none shadow-sm">
            <div className="bg-slate-100/50 border-b border-slate-100 px-6 py-4">
              <h2 className="text-lg font-bold text-slate-800">Zimmer-Details</h2>
            </div>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Zimmer-Name</Label>
                  <Input required placeholder="z.B. Doppelzimmer Komfort" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Zimmernummer</Label>
                  <Input required placeholder="z.B. 101" value={formData.roomNumber} onChange={e => setFormData({...formData, roomNumber: e.target.value})} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Beschreibung</Label>
                <Textarea required className="min-h-[120px]" placeholder="Beschreiben Sie die Ausstattung..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Preis pro Nacht (€)</Label>
                  <Input required placeholder="z.B. 89.50" value={formData.pricePerNight} onChange={e => setFormData({...formData, pricePerNight: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Maximale Gäste</Label>
                  <Input type="number" min="1" required value={formData.maxGuests} onChange={e => setFormData({...formData, maxGuests: e.target.value})} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg font-bold rounded-xl shadow-lg shadow-blue-200" disabled={loading}>
            {loading ? <><Loader2 className="mr-2 h-6 w-6 animate-spin"/> Speichere Änderungen...</> : "Änderungen speichern"}
          </Button>

        </form>
      </main>
    </div>
  );
};

export default EditRoom;