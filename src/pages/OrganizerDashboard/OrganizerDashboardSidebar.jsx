import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, BarChart, ShoppingCart, Megaphone, Calendar } from 'lucide-react';

const OrganizerDashboardSidebar = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-md border-r border-gray-200 p-6 flex flex-col z-20">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-8 tracking-wide select-none">
          Organizer
        </h2>

        <nav className="flex flex-col gap-3 flex-grow">
          {[
            { to: "/organizer-dashboard/home", icon: Home, label: "Home" },
            { to: "/organizer-dashboard/create", icon: Calendar, label: "Create Event" },
            { to: "/organizer-dashboard/orders", icon: ShoppingCart, label: "Order Management" },
            { to: "/organizer-dashboard/marketing", icon: Megaphone, label: "Marketing" },
            { to: "/organizer-dashboard/analytics", icon: BarChart, label: "Analytics" },
          ].map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition 
                 ${
                   isActive
                     ? "bg-blue-100 text-blue-700 shadow-inner font-semibold"
                     : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                 }`
              }
            >
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </nav>

        <footer className="mt-auto text-xs text-gray-400 select-none">
          &copy; {new Date().getFullYear()} Your Company
        </footer>
      </aside>

      {/* Page Content */}
      <main className="ml-64 flex-grow p-10 bg-gray-50 min-h-screen overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default OrganizerDashboardSidebar;
