import { useAdminDashboard } from '../hooks/useAdminDashboard';
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShieldAlert, Building, Settings, Plus, Pencil, Trash2, Loader2, MapPin, Power
} from "lucide-react";

const AdminDashboard = () => {
  const {
    hotels,
    features,
    loading,
    deletingFeatureId,
    togglingHotelId,
    handleDeleteFeature,
    handleToggleHotelStatus,
    navigate
  } = useAdminDashboard();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-32 px-6 pb-12">
        <div className="max-w-7xl mx-auto space-y-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <ShieldAlert size={20} />
                <span className="font-semibold uppercase tracking-wider text-xs">System Administration</span>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="border-none shadow-sm bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold text-slate-500 uppercase">System-Hotels</CardTitle>
                <Building className="text-indigo-600" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{hotels.length}</div>
                <p className="text-xs text-slate-400 mt-1">Alle registrierten Hotels</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold text-slate-500 uppercase">Ausstattungen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{features.length}</div>
                <p className="text-xs text-slate-400 mt-1">Globale Features (WLAN, Pool etc.)</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
               <div className="flex items-center justify-between ml-1">
                 <h2 className="text-xl font-bold text-slate-900">Globale Hotels</h2>
                 <Button onClick={() => navigate('/admin/hotels/create')} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                   <Plus size={16} className="mr-1"/> Neues Hotel
                 </Button>
               </div>

               {loading ? (
                  <div className="text-center py-12 text-slate-400 animate-pulse">Lade Hotels...</div>
               ) : hotels.length > 0 ? (
                  <div className="grid gap-4">
                    {hotels.map((hotel: any) => {
                      const hotelId = hotel.id || hotel.hotel_id || hotel._id || hotel.hotelId;
                      const isActive = hotel.status === 'inactiv' ? false : (hotel.status === 'activ' ? true : hotel.is_active !== false);
                      
                      return (
                      <div key={hotelId} className={`bg-white p-5 rounded-2xl border ${isActive ? 'border-slate-100 hover:border-indigo-100' : 'border-red-100 bg-red-50/30'} shadow-sm flex items-center justify-between transition-colors`}>
                         <div className="flex items-center gap-4">
                            <div className={`h-12 w-12 ${isActive ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-400'} rounded-xl flex items-center justify-center flex-shrink-0`}>
                               <Building size={20} />
                            </div>
                            <div>
                               <div className="flex items-center gap-2">
                                 <h3 className={`font-bold text-base ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>{hotel.name || hotel.title}</h3>
                                 <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                   {isActive ? 'Aktiv' : 'Inaktiv'}
                                 </span>
                               </div>
                               <div className="flex items-center text-slate-500 text-xs mt-1">
                                  <MapPin size={12} className="mr-1" />
                                  {hotel.ort || hotel.city}, {hotel.land || hotel.country}
                               </div>
                            </div>
                         </div>
                         <div className="flex gap-1">
                           <Button 
                              variant="ghost" 
                              size="icon" 
                              title={isActive ? "Hotel deaktivieren" : "Hotel aktivieren"}
                              className={isActive ? "text-red-400 hover:text-red-600 hover:bg-red-50" : "text-green-500 hover:text-green-600 hover:bg-green-50"}
                              onClick={() => handleToggleHotelStatus(hotel)}
                              disabled={togglingHotelId === hotelId}
                           >
                              {togglingHotelId === hotelId ? <Loader2 size={18} className="animate-spin" /> : <Power size={18} />}
                           </Button>
                           <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                              onClick={() => navigate('/admin/hotels/edit', { state: { hotel } })}
                           >
                              <Pencil size={18} />
                           </Button>
                         </div>
                      </div>
                    )})}
                  </div>
               ) : (
                  <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 text-slate-400">Keine Hotels im System.</div>
               )}
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between ml-1">
                 <h2 className="text-xl font-bold text-slate-900">Ausstattungen (Features)</h2>
                 <Button onClick={() => navigate('/admin/ausstattung/create')} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                   <Plus size={16} className="mr-1"/> Neues Feature
                 </Button>
               </div>
              
              {loading ? (
                  <div className="text-center py-12 text-slate-400 animate-pulse">Lade Ausstattungen...</div>
              ) : features.length > 0 ? (
                  <div className="grid gap-3">
                    {features.map((feature: any) => {
                       const fId = feature.id || feature.ausstattung_id || feature._id;
                       const fName = feature.name || feature.bezeichnung || feature.titel || feature.title || feature.ausstattung_name || "Unbenannt";
                       
                       return (
                          <div key={fId} className="p-4 rounded-xl border border-slate-100 bg-white flex items-center justify-between group hover:border-slate-300 transition-all">
                            <div className="flex items-center gap-3">
                              <Settings size={16} className="text-slate-400 group-hover:text-slate-700" />
                              <span className="font-bold text-slate-700 text-sm">{fName}</span>
                            </div>
                            <div className="flex gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                                    onClick={() => navigate('/admin/ausstattung/edit', { state: { feature } })}
                                >
                                    <Pencil size={14} />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50"
                                    onClick={() => handleDeleteFeature(feature)}
                                    disabled={deletingFeatureId === fId}
                                >
                                    {deletingFeatureId === fId ? <Loader2 className="animate-spin h-3 w-3"/> : <Trash2 size={14} />}
                                </Button>
                            </div>
                          </div>
                       );
                    })}
                  </div>
              ) : (
                  <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 text-slate-400 text-sm">
                    Noch keine Ausstattungen angelegt.
                  </div>
              )}
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;