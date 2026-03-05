import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import OwnerDashboard from './pages/OwnerDashboard';
import CreateRoom from './pages/CreateRoom';
import EditRoom from './pages/EditRoom';
import EditHotel from './pages/EditHotel';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/owner/hotels/edit" element={<EditHotel />} />
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/rooms/create" element={<CreateRoom />} />
          <Route path="/owner/rooms/edit" element={<EditRoom />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;