import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { MdHome, MdEvent, MdShoppingCart, MdCampaign, MdAnalytics, MdCalendarToday } from 'react-icons/md';

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
            <MdHome size={22} />
            Home
          </NavLink>

          {/* Create Event */}
          <NavLink
            to="/organizer-dashboard/create"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition 
               ${
                 isActive || isCreateEventRoute
                   ? "bg-blue-100 text-blue-700 shadow-inner font-semibold"
                   : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
               }`
            }
          >
            <MdCalendarToday size={22} />
            Create Event
          </NavLink>

          {/* Submenus for Create Event */}
          {isCreateEventRoute && (
            <div className="ml-8 flex flex-col gap-2 mb-4">
              <NavLink
                to="/organizer-dashboard/create/conference"
                className={({ isActive }) =>
                  `text-sm rounded px-3 py-1 transition
                   ${
                     isActive
                       ? "bg-blue-200 text-blue-800 font-semibold"
                       : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                   }`
                }
              >
                Conference
              </NavLink>

              <NavLink
                to="/organizer-dashboard/create/exhibition"
                className={({ isActive }) =>
                  `text-sm rounded px-3 py-1 transition
                   ${
                     isActive
                       ? "bg-blue-200 text-blue-800 font-semibold"
                       : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                   }`
                }
              >
                Exhibition
              </NavLink>
            </div>
          )}

          {/* Event Details */}
          <NavLink
            to="/organizer-dashboard/events-summary"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition 
               ${
                 isActive
                   ? "bg-blue-100 text-blue-700 shadow-inner font-semibold"
                   : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
               }`
            }
          >
            <MdEvent size={22} />
            Event Details
          </NavLink>

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
            <MdShoppingCart size={22} />
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
            <MdCampaign size={22} />
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
            <MdAnalytics size={22} />
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
