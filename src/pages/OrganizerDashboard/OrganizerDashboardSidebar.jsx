import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, BarChart, ShoppingCart, Megaphone, Calendar } from 'lucide-react';

const OrganizerDashboardSidebar = () => {
  const location = useLocation();
  const isCreateEventRoute = location.pathname.startsWith('/organizer-dashboard/create');

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-md border-r border-gray-200 p-6 flex flex-col z-20">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-8 tracking-wide select-none">
          Organizer
        </h2>

        <nav className="flex flex-col gap-3 flex-grow">
          {/* Home */}
          <NavLink
            to="/organizer-dashboard/home"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition 
               ${
                 isActive
                   ? "bg-blue-100 text-blue-700 shadow-inner font-semibold"
                   : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
               }`
            }
          >
            <Home size={20} />
            Home
          </NavLink>

          {/* Create Event */}
          <div>
            <NavLink
              to="/organizer-dashboard/create"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition 
                 ${
                   isCreateEventRoute
                     ? "bg-blue-100 text-blue-700 shadow-inner font-semibold"
                     : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                 }`
              }
            >
              <Calendar size={20} />
              Create Event
            </NavLink>

            {/* Submenus for Create Event */}
            {isCreateEventRoute && (
              <div className="ml-8 mt-2 flex flex-col gap-2">
                {[
                  { to: "/organizer-dashboard/create/conference", label: "Conference" },
                  { to: "/organizer-dashboard/create/exhibition", label: "Exhibition" },
                ].map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `text-sm rounded px-3 py-1 transition
                       ${
                         isActive
                           ? "bg-blue-200 text-blue-800 font-semibold"
                           : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                       }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Orders */}
          <NavLink
            to="/organizer-dashboard/orders"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition 
               ${
                 isActive
                   ? "bg-blue-100 text-blue-700 shadow-inner font-semibold"
                   : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
               }`
            }
          >
            <ShoppingCart size={20} />
            Order Management
          </NavLink>

          {/* Marketing */}
          <NavLink
            to="/organizer-dashboard/marketing"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition 
               ${
                 isActive
                   ? "bg-blue-100 text-blue-700 shadow-inner font-semibold"
                   : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
               }`
            }
          >
            <Megaphone size={20} />
            Marketing
          </NavLink>

          {/* Analytics */}
          <NavLink
            to="/organizer-dashboard/analytics"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition 
               ${
                 isActive
                   ? "bg-blue-100 text-blue-700 shadow-inner font-semibold"
                   : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
               }`
            }
          >
            <BarChart size={20} />
            Analytics
          </NavLink>
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
