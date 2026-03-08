import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

export const DisclaimerModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col items-center text-center mt-2">
          <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Wichtiger Hinweis</h2>
          <p className="text-slate-600 text-sm mb-6">
            Dies ist ein rein <strong>studentisches Projekt</strong> zu Lern- und Prüfungszwecken. 
            <br /><br />
            Es handelt sich um keine echte Plattform. Es können hier keine echten Reisen gebucht werden und es fließen keinerlei Zahlungen.
          </p>
          
          <button 
            onClick={handleClose}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
          >
            verstanden
          </button>
        </div>
      </div>
    </div>
  );
};