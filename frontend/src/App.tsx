import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DisclaimerModal } from './components/ui/DisclaimerModal';
import Home from './pages/Home';
import Login from './pages/Login';
import OwnerDashboard from './pages/OwnerDashboard';
import CreateRoom from './pages/CreateRoom';
import EditRoom from './pages/EditRoom';
import EditHotel from './pages/EditHotel';
import AdminDashboard from './pages/AdminDashboard';
import CreateFeature from './pages/CreateFeature';
import EditFeature from './pages/EditFeature';
import CreateAdminHotel from './pages/CreateAdminHotel';
import EditAdminHotel from './pages/EditAdminHotel';
import Listview from './pages/Listview';
import HotelDetail from './pages/HotelDetail';
import Bookings from './pages/Bookings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <DisclaimerModal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Listview />} />
          <Route path="/hotels/:slug" element={<HotelDetail />} />
          <Route path="/bookings" element={<Bookings />} />
          
          <Route path="/owner/hotels/edit" element={<EditHotel />} />
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/rooms/create" element={<CreateRoom />} />
          <Route path="/owner/rooms/edit" element={<EditRoom />} />
          
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/ausstattung/create" element={<CreateFeature />} />
          <Route path="/admin/ausstattung/edit" element={<EditFeature />} />
          <Route path="/admin/hotels/create" element={<CreateAdminHotel />} />
          <Route path="/admin/hotels/edit" element={<EditAdminHotel />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;