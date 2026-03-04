import { useEditRoom } from '../hooks/useEditRoom';
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, Euro, Users, Hash } from "lucide-react";

const EditRoom = () => {
  const {
    loading,
    formData,
    setFormData,
    handleSubmit,
    navigate
  } = useEditRoom();

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <Navbar />
      <main className="pt-32 px-6 max-w-3xl mx-auto">
        
        <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate('/owner/dashboard')} className="pl-0 hover:bg-transparent text-slate-500 hover:text-slate-900">
                <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zum Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-slate-900 mt-2">Zimmer bearbeiten</h1>
        </div>

        <Card className="border-none shadow-sm">
            <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Zimmername</Label>
                            <Input 
                                required 
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
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

                    <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg font-bold" 
                        disabled={loading}
                    >
                        {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin"/> Speichere...</> : "Änderungen speichern"}
                    </Button>

                </form>
            </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditRoom;