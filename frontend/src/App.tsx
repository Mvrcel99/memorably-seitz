import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home'; // <-- Das hier ist deine echte Startseite!
import Login from './pages/Login';
import OwnerDashboard from './pages/OwnerDashboard';
import CreateRoom from './pages/CreateRoom';
import EditRoom from './pages/EditRoom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Hier ist der Fix: Jetzt landest du wieder auf Home! */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/rooms/create" element={<CreateRoom />} />
          <Route path="/owner/rooms/edit" element={<EditRoom />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;