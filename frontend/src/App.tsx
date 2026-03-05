import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import OwnerDashboard from './pages/OwnerDashboard';
import CreateRoom from './pages/CreateRoom';
import EditRoom from './pages/EditRoom';
import EditHotel from './pages/EditHotel';
import AdminDashboard from './pages/AdminDashboard';
import CreateFeature from './pages/CreateFeature';
import EditFeature from './pages/EditFeature';

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
          <Route path="/admin/ausstattung/create" element={<CreateFeature />} />
          <Route path="/admin/ausstattung/edit" element={<EditFeature />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;