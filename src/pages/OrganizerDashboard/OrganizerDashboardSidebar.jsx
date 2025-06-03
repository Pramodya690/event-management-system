import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, BarChart, ShoppingCart, Megaphone, Calendar } from 'lucide-react';

const OrganizerDashboardSidebar = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg p-6 space-y-4 z-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Organizer</h2>

        <nav className="space-y-2">
          <NavLink to="/organizer-dashboard/home" className={({ isActive }) => isActive ? 'bg-blue-100 text-blue-700 font-semibold p-3 rounded-lg flex items-center gap-3' : 'text-gray-700 hover:bg-gray-100 p-3 rounded-lg flex items-center gap-3'}>
            <Home size={18} /> Home
          </NavLink>
          <NavLink to="/organizer-dashboard/create" className={({ isActive }) => isActive ? 'bg-blue-100 text-blue-700 font-semibold p-3 rounded-lg flex items-center gap-3' : 'text-gray-700 hover:bg-gray-100 p-3 rounded-lg flex items-center gap-3'}>
            <Calendar size={18} /> Create Event
          </NavLink>
          <NavLink to="/organizer-dashboard/orders" className={({ isActive }) => isActive ? 'bg-blue-100 text-blue-700 font-semibold p-3 rounded-lg flex items-center gap-3' : 'text-gray-700 hover:bg-gray-100 p-3 rounded-lg flex items-center gap-3'}>
            <ShoppingCart size={18} /> Order Management
          </NavLink>
          <NavLink to="/organizer-dashboard/marketing" className={({ isActive }) => isActive ? 'bg-blue-100 text-blue-700 font-semibold p-3 rounded-lg flex items-center gap-3' : 'text-gray-700 hover:bg-gray-100 p-3 rounded-lg flex items-center gap-3'}>
            <Megaphone size={18} /> Marketing
          </NavLink>
          <NavLink to="/organizer-dashboard/analytics" className={({ isActive }) => isActive ? 'bg-blue-100 text-blue-700 font-semibold p-3 rounded-lg flex items-center gap-3' : 'text-gray-700 hover:bg-gray-100 p-3 rounded-lg flex items-center gap-3'}>
            <BarChart size={18} /> Analytics
          </NavLink>
        </nav>
      </aside>

      {/* Page Content */}
      <main className="ml-64 w-full p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default OrganizerDashboardSidebar;
