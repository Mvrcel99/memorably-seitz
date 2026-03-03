import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from './context/AuthContext'; // <-- Das ist neu!
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <AuthProvider> {/* <-- Hier wickeln wir die App ein */}
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/login" element={<Login />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;