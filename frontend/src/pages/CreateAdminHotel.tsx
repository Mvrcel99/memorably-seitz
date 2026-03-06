import { useCreateAdminHotel } from '../hooks/useCreateAdminHotel';
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, Building, MapPin, Star, Plus, User, Map, Clock } from "lucide-react";

const CreateAdminHotel = () => {
  const { formData, setFormData, loading, handleSubmit, navigate } = useCreateAdminHotel();

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-20">
      <Navbar />
      <main className="pt-32 px-6 max-w-3xl mx-auto">
        <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate('/admin/dashboard')} className="pl-0 hover:bg-transparent text-slate-500 hover:text-slate-900">
                <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zum Admin Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-slate-900 mt-2">Neues Hotel (System)</h1>
        </div>

        <Card className="border border-slate-200 shadow-xl bg-white rounded-2xl overflow-hidden">
            <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                        <div className="space-y-2">
                            <Label className="text-indigo-700 font-bold">Owner ID</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-indigo-400" />
                                <Input 
                                    type="number"
                                    required 
                                    className="pl-9 border-indigo-200 focus-visible:ring-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    placeholder="z.B. 5"
                                    value={formData.ownerId}
                                    onChange={e => setFormData({...formData, ownerId: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Kostenlose Storno (Stunden)</Label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input 
                                    type="number"
                                    min="0"
                                    className="pl-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    placeholder="z.B. 24"
                                    value={formData.freeCancellation}
                                    onChange={e => setFormData({...formData, freeCancellation: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Hotelname (Title)</Label>
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

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Breitengrad (Latitude)</Label>
                            <div className="relative">
                                <Map className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input 
                                    type="number"
                                    step="any"
                                    className="pl-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    placeholder="z.B. 48.1371"
                                    value={formData.latitude}
                                    onChange={e => setFormData({...formData, latitude: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Längengrad (Longitude)</Label>
                            <Input 
                                type="number"
                                step="any"
                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                placeholder="z.B. 11.5754"
                                value={formData.longitude}
                                onChange={e => setFormData({...formData, longitude: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Sterne (1-5)</Label>
                        <div className="relative">
                            <Star className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input 
                                type="number" 
                                min="1"
                                max="5"
                                required 
                                className="pl-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                value={formData.stars}
                                onChange={e => setFormData({...formData, stars: e.target.value})}
                            />
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 text-lg font-bold shadow-md shadow-indigo-200 mt-6" 
                        disabled={loading}
                    >
                        {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin"/> Speichere...</> : <><Plus className="mr-2 h-5 w-5"/> Hotel anlegen</>}
                    </Button>
                </form>
            </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateAdminHotel;