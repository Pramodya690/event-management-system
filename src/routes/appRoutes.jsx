import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import DashboardLayout from '../pages/dashboardLaout';
import DashboardHome from '../pages/dashboard';
import Events from '../pages/events';
import Users from '../pages/users';
import ProtectedRoute from '../component/protectedRoute';
import Organizers from "../pages/organizers";
import Vendors from "../pages/vendors";
import Speakers from '../pages/speakers';
import Venues from '../pages/venues';
import Settings from '../pages/settings';
import AddVenueForm from '../pages/addVenueForm'; // ✅ NEW import

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/events" element={<Events />} />
          <Route path="/organizers" element={<Organizers />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/addVenueForm" element={<AddVenueForm />} /> {/* ✅ NEW Route */}
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
