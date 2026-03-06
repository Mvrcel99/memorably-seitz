import { useEditAdminHotel } from '../hooks/useEditAdminHotel';
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, Building, MapPin, Star, Pencil } from "lucide-react";

const EditAdminHotel = () => {
  const { formData, setFormData, loading, handleSubmit, navigate } = useEditAdminHotel();

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-20">
      <Navbar />
      <main className="pt-32 px-6 max-w-3xl mx-auto">
        <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate('/admin/dashboard')} className="pl-0 hover:bg-transparent text-slate-500 hover:text-slate-900">
                <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zum Admin Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-slate-900 mt-2">System-Hotel bearbeiten</h1>
        </div>

        <Card className="border border-slate-200 shadow-xl bg-white rounded-2xl overflow-hidden">
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

                    <Button 
                        type="submit" 
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 text-lg font-bold shadow-md shadow-indigo-200" 
                        disabled={loading}
                    >
                        {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin"/> Speichere...</> : <><Pencil className="mr-2 h-5 w-5"/> Änderungen speichern</>}
                    </Button>
                </form>
            </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditAdminHotel;