import { useState } from 'react';
import { 
  FaTachometerAlt, 
  FaCalendarAlt, 
  FaUsers, 
  FaTicketAlt, 
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaSearch,
  FaPlus
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Art Exhibition",
      date: "2023-06-15",
      status: "Published",
      ticketsSold: 124,
      revenue: "$1,860"
    },
    // More events...
  ]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Backdrop */}
      {!sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed lg:static z-30 w-64 bg-sky-400 text-white transition-all duration-300 ease-in-out 
        ${sidebarOpen ? 'left-0' : '-left-64'}`}
      >
        <div className="p-4 flex items-center justify-between border-b border-sky-200">
          <h1 className="text-xl font-bold">EventHub Admin</h1>
          <button onClick={toggleSidebar} className="lg:hidden">
            <FaTimes className="text-white" />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center w-full p-3 rounded-lg transition ${activeTab === 'dashboard' ? 'bg-sky-300' : 'hover:bg-sky-500'}`}
              >
                <FaTachometerAlt className="mr-3" />
                Dashboard
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('events')}
                className={`flex items-center w-full p-3 rounded-lg transition ${activeTab === 'events' ? 'bg-sky-300' : 'hover:bg-sky-500'}`}
              >
                <FaCalendarAlt className="mr-3" />
                Events
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('attendees')}
                className={`flex items-center w-full p-3 rounded-lg transition ${activeTab === 'attendees' ? 'bg-sky-300' : 'hover:bg-sky-500'}`}
              >
                <FaUsers className="mr-3" />
                Attendees
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('tickets')}
                className={`flex items-center w-full p-3 rounded-lg transition ${activeTab === 'tickets' ? 'bg-sky-300' : 'hover:bg-sky-500'}`}
              >
                <FaTicketAlt className="mr-3" />
                Tickets
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center w-full p-3 rounded-lg transition ${activeTab === 'analytics' ? 'bg-sky-300' : 'hover:bg-sky-500'}`}
              >
                <FaChartBar className="mr-3" />
                Analytics
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`flex items-center w-full p-3 rounded-lg transition ${activeTab === 'settings' ? 'bg-sky-300' : 'hover:bg-sky-500'}`}
              >
                <FaCog className="mr-3" />
                Settings
              </button>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sky-400">
          <button className="flex items-center w-full p-3 rounded-lg hover:bg-sky-700 transition">
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button 
                onClick={toggleSidebar}
                className="mr-4 text-gray-500 focus:outline-none lg:hidden"
              >
                <FaBars />
              </button>
              <h2 className="text-xl font-semibold text-gray-800 capitalize">
                {activeTab}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                <span className="text-sky-800 font-semibold">AD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {activeTab === 'dashboard' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Stats Cards */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-gray-500 font-medium">Total Events</h3>
                  <p className="text-3xl font-bold mt-2">24</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-gray-500 font-medium">Upcoming Events</h3>
                  <p className="text-3xl font-bold mt-2">8</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-gray-500 font-medium">Total Attendees</h3>
                  <p className="text-3xl font-bold mt-2">1,245</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-gray-500 font-medium">Total Revenue</h3>
                  <p className="text-3xl font-bold mt-2">$18,760</p>
                </div>
              </div>

              {/* Recent Events */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Recent Events</h3>
                  <button className="text-sky-600 hover:text-sky-800">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets Sold</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {events.map(event => (
                        <tr key={event.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{event.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">{event.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              event.status === 'Published' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {event.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">{event.ticketsSold}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">{event.revenue}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-sky-600 hover:text-sky-900 mr-3">Edit</button>
                            <button className="text-red-600 hover:text-red-900">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-semibold text-lg">All Events</h3>
                <button className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700">
                  <FaPlus className="mr-2" /> Create Event
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {events.map(event => (
                      <tr key={event.id}>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{event.title}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{event.date}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            event.status === 'Published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                          <button className="text-sky-600 hover:text-sky-900">Edit</button>
                          <button className="text-green-600 hover:text-green-900">Publish</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'attendees' && (
            <div className="text-center py-10">
              <h3 className="text-xl font-semibold">Attendees Management</h3>
              <p className="text-gray-500 mt-2">Coming soon</p>
            </div>
          )}

          {activeTab === 'tickets' && (
            <div className="text-center py-10">
              <h3 className="text-xl font-semibold">Tickets Management</h3>
              <p className="text-gray-500 mt-2">Coming soon</p>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="text-center py-10">
              <h3 className="text-xl font-semibold">Event Analytics</h3>
              <p className="text-gray-500 mt-2">Coming soon</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="text-center py-10">
              <h3 className="text-xl font-semibold">System Settings</h3>
              <p className="text-gray-500 mt-2">Coming soon</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;