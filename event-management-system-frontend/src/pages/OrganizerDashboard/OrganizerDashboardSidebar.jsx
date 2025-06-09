// // import React from 'react';
// // import { NavLink, Outlet, useLocation } from 'react-router-dom';
// // import { MdHome, MdEvent, MdShoppingCart, MdCampaign, MdAnalytics, MdCalendarToday } from 'react-icons/md';

// // const OrganizerDashboardSidebar = () => {
// //   const location = useLocation();
// //   const isCreateEventRoute = location.pathname.startsWith('/organizer-dashboard/create');

// //   return (
// //     <div className="flex min-h-screen bg-gray-50 text-gray-800">
// //       {/* Sidebar */}
// //       <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-md border-r border-gray-200 p-6 flex flex-col z-20">
// //         <h2 className="text-3xl font-extrabold text-blue-700 mb-8 tracking-wide select-none">
// //           Organizer
// //         </h2>

// //         <nav className="flex flex-col gap-3 flex-grow">
// //           {/* Home */}
// //           <NavLink
// //             to="/organizer-dashboard/home"
// //             className={({ isActive }) =>
// //               `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition 
// //                ${
// //                  isActive
// //                    ? "bg-blue-100 text-blue-700 shadow-inner font-semibold"
// //                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
// //                }`
// //             }
// //           >
// //             <MdHome size={22} />
// //             Home
// //           </NavLink>

// //           {/* Create Event */}
// //           <NavLink
// //             to="/organizer-dashboard/create"
// //             className={({ isActive }) =>
// //               `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition 
// //                ${
// //                  isActive || isCreateEventRoute
// //                    ? "bg-blue-100 text-blue-700 shadow-inner font-semibold"
// //                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
// //                }`
// //             }
// //           >
// //             <MdCalendarToday size={22} />
// //             Create Event
// //           </NavLink>

// //           {/* Submenus for Create Event */}
// //           {isCreateEventRoute && (
// //             <div className="ml-8 flex flex-col gap-2 mb-4">
// //               <NavLink
// //                 to="/organizer-dashboard/create/conference"
// //                 className={({ isActive }) =>
// //                   `text-sm rounded px-3 py-1 transition
// //                    ${
// //                      isActive
// //                        ? "bg-blue-200 text-blue-800 font-semibold"
// //                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
// //                    }`
// //                 }
// //               >
// //                 Conference
// //               </NavLink>

// //               <NavLink
// //                 to="/organizer-dashboard/create/exhibition"
// //                 className={({ isActive }) =>
// //                   `text-sm rounded px-3 py-1 transition
// //                    ${
// //                      isActive
// //                        ? "bg-blue-200 text-blue-800 font-semibold"
// //                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
// //                    }`
// //                 }
// //               >
// //                 Exhibition
// //               </NavLink>
// //             </div>
// //           )}

// //           {/* Event Details */}
// //           <NavLink
// //             to="/organizer-dashboard/events-summary"
// //             className={({ isActive }) =>
// //               `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition 
// //                ${
// //                  isActive
// //                    ? "bg-blue-100 text-blue-700 shadow-inner font-semibold"
// //                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
// //                }`
// //             }
// //           >
// //             <MdEvent size={22} />
// //             Event Details
// //           </NavLink>

// //           {/* Find Vendors */}
// //           <NavLink
// //             to="/organizer-dashboard/find-vendors"
// //             className={({ isActive }) =>
// //               `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition 
// //                ${
// //                  isActive
// //                    ? "bg-blue-100 text-blue-700 shadow-inner font-semibold"
// //                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
// //                }`
// //             }
// //           >
// //             <MdShoppingCart size={22} />
// //             Find Vendors
// //           </NavLink>

// //           {/* Marketing */}
// //           <NavLink
// //             to="/organizer-dashboard/marketing"
// //             className={({ isActive }) =>
// //               `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition 
// //                ${
// //                  isActive
// //                    ? "bg-blue-100 text-blue-700 shadow-inner font-semibold"
// //                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
// //                }`
// //             }
// //           >
// //             <MdCampaign size={22} />
// //             Marketing
// //           </NavLink>

// //           {/* Analytics */}
// //           <NavLink
// //             to="/organizer-dashboard/analytics"
// //             className={({ isActive }) =>
// //               `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition 
// //                ${
// //                  isActive
// //                    ? "bg-blue-100 text-blue-700 shadow-inner font-semibold"
// //                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
// //                }`
// //             }
// //           >
// //             <MdAnalytics size={22} />
// //             Analytics
// //           </NavLink>
// //         </nav>

// //         <footer className="mt-auto text-xs text-gray-400 select-none">
// //           &copy; {new Date().getFullYear()} Your Company
// //         </footer>
// //       </aside>

// //       {/* Page Content */}
// //       <main className="ml-64 flex-grow p-10 bg-gray-50 min-h-screen overflow-auto">
// //         <Outlet />
// //       </main>
// //     </div>
// //   );
// // };

// // export default OrganizerDashboardSidebar;

// import React from 'react';
// import { NavLink, Outlet, useLocation } from 'react-router-dom';
// import {
//   MdHome,
//   MdEvent,
//   MdShoppingCart,
//   MdCampaign,
//   MdAnalytics,
//   MdCalendarToday,
// } from 'react-icons/md';

// const OrganizerDashboardSidebar = () => {
//   const location = useLocation();
//   const isCreateEventRoute = location.pathname.startsWith('/organizer-dashboard/create');

//   return (
//     <div className="flex bg-gray-50 text-gray-800">
//       {/* Fixed Sidebar */}
//       <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md border-r border-gray-200 p-6 flex flex-col z-30">
//         <h2 className="text-3xl font-extrabold text-blue-700 mb-8 tracking-wide select-none">
//           Organizer
//         </h2>

//         <nav className="flex flex-col gap-3 flex-grow overflow-y-auto">
//           <NavLink
//             to="/organizer-dashboard/home"
//             className={({ isActive }) =>
//               `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition ${
//                 isActive
//                   ? 'bg-blue-100 text-blue-700 shadow-inner font-semibold'
//                   : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
//               }`
//             }
//           >
//             <MdHome size={22} />
//             Home
//           </NavLink>

//           <NavLink
//             to="/organizer-dashboard/create"
//             className={({ isActive }) =>
//               `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition ${
//                 isActive || isCreateEventRoute
//                   ? 'bg-blue-100 text-blue-700 shadow-inner font-semibold'
//                   : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
//               }`
//             }
//           >
//             <MdCalendarToday size={22} />
//             Create Event
//           </NavLink>

//           {isCreateEventRoute && (
//             <div className="ml-8 flex flex-col gap-2 mb-4">
//               <NavLink
//                 to="/organizer-dashboard/create/conference"
//                 className={({ isActive }) =>
//                   `text-sm rounded px-3 py-1 transition ${
//                     isActive
//                       ? 'bg-blue-200 text-blue-800 font-semibold'
//                       : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
//                   }`
//                 }
//               >
//                 Conference
//               </NavLink>
//               <NavLink
//                 to="/organizer-dashboard/create/exhibition"
//                 className={({ isActive }) =>
//                   `text-sm rounded px-3 py-1 transition ${
//                     isActive
//                       ? 'bg-blue-200 text-blue-800 font-semibold'
//                       : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
//                   }`
//                 }
//               >
//                 Exhibition
//               </NavLink>
//             </div>
//           )}

//           <NavLink
//             to="/organizer-dashboard/events-summary"
//             className={({ isActive }) =>
//               `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition ${
//                 isActive
//                   ? 'bg-blue-100 text-blue-700 shadow-inner font-semibold'
//                   : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
//               }`
//             }
//           >
//             <MdEvent size={22} />
//             Event Details
//           </NavLink>

//           <NavLink
//             to="/organizer-dashboard/find-vendors"
//             className={({ isActive }) =>
//               `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition ${
//                 isActive
//                   ? 'bg-blue-100 text-blue-700 shadow-inner font-semibold'
//                   : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
//               }`
//             }
//           >
//             <MdShoppingCart size={22} />
//             Find Vendors
//           </NavLink>

//           <NavLink
//             to="/organizer-dashboard/marketing"
//             className={({ isActive }) =>
//               `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition ${
//                 isActive
//                   ? 'bg-blue-100 text-blue-700 shadow-inner font-semibold'
//                   : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
//               }`
//             }
//           >
//             <MdCampaign size={22} />
//             Marketing
//           </NavLink>

//           <NavLink
//             to="/organizer-dashboard/analytics"
//             className={({ isActive }) =>
//               `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition ${
//                 isActive
//                   ? 'bg-blue-100 text-blue-700 shadow-inner font-semibold'
//                   : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
//               }`
//             }
//           >
//             <MdAnalytics size={22} />
//             Analytics
//           </NavLink>
//         </nav>

//         <footer className="mt-8 text-xs text-gray-400 select-none">
//           &copy; {new Date().getFullYear()} Your Company
//         </footer>
//       </aside>

//       {/* Main Content */}
//       <main className="ml-64 flex-grow h-screen overflow-y-auto p-10 bg-gray-50">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default OrganizerDashboardSidebar;

import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  MdHome, 
  MdEvent, 
  MdShoppingCart, 
  MdCampaign, 
  MdAnalytics, 
  MdCalendarToday,
  MdHelpOutline,
  MdSettings,
  MdExpandMore,
  MdPerson 
} from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';

const OrganizerDashboardSidebar = () => {
  const location = useLocation();
  const isCreateEventRoute = location.pathname.startsWith('/organizer-dashboard/create');
  const [expanded, setExpanded] = React.useState(true);

  return (
    <div className="flex bg-sky-100 text-gray-800">
      {/* Fixed Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen bg-white shadow-lg transition-all duration-300 z-30 ${expanded ? 'w-64' : 'w-20'}`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {expanded ? (
            <NavLink to="/" className="text-2xl font-bold text-sky-600 tracking-tight hover:underline">
              EventSphere
            </NavLink>

          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
          )}
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <MdExpandMore className={`transform ${expanded ? 'rotate-90' : '-rotate-90'}`} size={20} />
          </button>
        </div>

        {/* User Profile */}
        <div className={`p-4 border-b border-gray-200 flex items-center ${expanded ? 'gap-3' : 'justify-center'}`}>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <MdPerson size={20} />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
          {expanded && (
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">John Doe</p>
              <p className="text-xs text-gray-500 truncate">Organizer</p>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-col gap-1 p-2 overflow-y-auto" style={{ height: 'calc(100vh - 180px)' }}>
          <NavItem 
            to="/organizer-dashboard/home" 
            icon={<MdHome size={20} />}
            expanded={expanded}
            active={location.pathname === '/organizer-dashboard/home'}
          >
            Dashboard
          </NavItem>

          <div className="relative">
            <NavItem 
              to="/organizer-dashboard/create" 
              icon={<MdCalendarToday size={20} />}
              expanded={expanded}
              active={isCreateEventRoute}
              hasSubmenu={isCreateEventRoute}
            >
              Create Event
            </NavItem>
            
            {expanded && isCreateEventRoute && (
              <div className="ml-8 mt-1 flex flex-col gap-1">
                <SubNavItem 
                  to="/organizer-dashboard/create/conference"
                  active={location.pathname === '/organizer-dashboard/create/conference'}
                >
                  Conference
                </SubNavItem>
                <SubNavItem 
                  to="/organizer-dashboard/create/exhibition"
                  active={location.pathname === '/organizer-dashboard/create/exhibition'}
                >
                  Exhibition
                </SubNavItem>
              </div>
            )}
          </div>

          <NavItem 
            to="/organizer-dashboard/events-summary" 
            icon={<MdEvent size={20} />}
            expanded={expanded}
            active={location.pathname === '/organizer-dashboard/events-summary'}
          >
            My Events
          </NavItem>

          <NavItem 
            to="/organizer-dashboard/find-vendors" 
            icon={<MdShoppingCart size={20} />}
            expanded={expanded}
            active={location.pathname === '/organizer-dashboard/find-vendors'}
          >
            Vendors
          </NavItem>

          <NavItem 
            to="/organizer-dashboard/marketing" 
            icon={<MdCampaign size={20} />}
            expanded={expanded}
            active={location.pathname === '/organizer-dashboard/marketing'}
          >
            Marketing
          </NavItem>

          <NavItem 
            to="/organizer-dashboard/event-analytics" 
            icon={<MdAnalytics size={20} />}
            expanded={expanded}
            active={location.pathname === '/organizer-dashboard/analytics'}
          >
            Analytics
          </NavItem>
        </nav>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-2 bg-white">
          
          <NavItem 
            to="/settings" 
            icon={<MdSettings size={20} />}
            expanded={expanded}
          >
            Settings
          </NavItem>
          <NavItem 
            to="/help" 
            icon={<MdHelpOutline size={20} />}
            expanded={expanded}
          >
            Help Center
          </NavItem>
          <button className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition">
            <FiLogOut size={20} />
            {expanded && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${expanded ? 'ml-64' : 'ml-20'} flex-grow h-screen overflow-y-auto bg-gray-50`}>
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20">
          <h1 className="text-xl font-semibold text-gray-800 capitalize">
            {location.pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <MdPerson size={18} />
              </div>
              <span className="hidden md:inline font-medium">John Doe</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

// Reusable NavItem Component
const NavItem = ({ to, icon, children, expanded, active, badge, hasSubmenu }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition relative
         ${isActive || active ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}
         ${expanded ? 'justify-start' : 'justify-center'}`
      }
    >
      <div className="flex-shrink-0">
        {icon}
        {badge && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
      {expanded && (
        <>
          <span className="flex-1 min-w-0">{children}</span>
          {hasSubmenu && (
            <MdExpandMore size={18} className="text-gray-400 transform rotate-90" />
          )}
        </>
      )}
    </NavLink>
  );
};

// Reusable SubNavItem Component
const SubNavItem = ({ to, children, active }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-3 py-1.5 text-sm rounded transition
         ${isActive || active ? 'bg-blue-100 text-blue-800 font-medium' : 'text-gray-600 hover:bg-gray-100'}`
      }
    >
      {children}
    </NavLink>
  );
};

export default OrganizerDashboardSidebar;