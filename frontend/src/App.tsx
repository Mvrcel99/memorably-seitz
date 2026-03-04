import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Impressum from './pages/Impressum';
import UeberUns from './pages/UeberUns';
import OwnerDashboard from './pages/OwnerDashboard'; // <-- Importieren

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/login" element={<Login />} />
           <Route path="/impressum" element={<Impressum />} />
           <Route path="/ueber-uns" element={<UeberUns />} />
           <Route path="/owner/dashboard" element={<OwnerDashboard />} /> {/* <-- Route anlegen */}
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;