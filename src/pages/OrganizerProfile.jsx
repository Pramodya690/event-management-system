// import { useLocation, useNavigate } from 'react-router-dom';

// const OrganizerProfile = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const organizer = location.state;

//   if (!organizer) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">No Profile Data Found</h1>
//           <p className="text-gray-600 mt-2">Please complete the sign-up process first.</p>
//           <button
//             onClick={() => navigate('/signup/organizer')}
//             className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Go to Sign Up
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Organizer Profile</h2>

//         <div className="space-y-4 text-gray-700">
//           <p><strong>Full Name:</strong> {organizer.name}</p>
//           <p><strong>Email:</strong> {organizer.email}</p>
//           <p><strong>Event Types:</strong> {organizer.selected.join(', ')}</p>
//           <p><strong>Events Next Year:</strong> {organizer.numEvents}</p>
//           <p><strong>Average Event Size:</strong> {organizer.eventSize}</p>
//           <p><strong>Goal:</strong> {
//             {
//               easy: 'Budget-friendly and easy to use',
//               reach: 'Reach more people and keep them coming back',
//               tools: 'More customer support and tools for professionals'
//             }[organizer.goal]
//           }</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizerProfile;

import { useLocation, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';

const OrganizerProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const organizer = location.state;

  if (!organizer) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-grow flex items-center justify-center text-center px-4">
          <div className="max-w-md bg-white p-8 rounded-xl shadow-lg">
            <div className="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Profile Incomplete</h1>
            <p className="text-gray-600 mt-2 mb-6">Please complete the organizer sign-up process to access your profile.</p>
            <button
              onClick={() => navigate('/signup/organizer')}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
            >
              Complete Sign Up
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto">
          {/* Profile Section */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Organizer Profile</h1>
            <button
              onClick={() => navigate('/organizer-dashboard')}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>Dashboard</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="sm:w-1/3">
                  <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                
                <div className="sm:w-2/3 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{organizer.name}</h2>
                    <p className="text-blue-600">{organizer.email}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">EVENT TYPES</h3>
                      <p className="font-medium">{organizer.selected.join(', ')}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">EVENTS NEXT YEAR</h3>
                      <p className="font-medium">{organizer.numEvents}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">AVERAGE EVENT SIZE</h3>
                      <p className="font-medium">{organizer.eventSize}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">PRIMARY GOAL</h3>
                      <p className="font-medium">
                        {
                          {
                            easy: 'Budget-friendly events',
                            reach: 'Expand audience reach',
                            tools: 'Professional tools'
                          }[organizer.goal]
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 sm:px-8 border-t border-gray-200">
              <button
                onClick={() => navigate('/organizer-dashboard/profile/edit')}
                className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Added Welcome Cards Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 - Create Event */}
              <div className="bg-white rounded-lg shadow-md flex flex-col items-center p-6 transition-transform hover:scale-[1.02]">
                <img
                  src="/create.jpg"
                  alt="Create event"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Create New Event</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Start building your next event
                </p>
                <button
                  onClick={() => navigate('/create-event-form')}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Get Started
                </button>
              </div>

              {/* Card 2 - Discover */}
              <div className="bg-white rounded-lg shadow-md flex flex-col items-center p-6 transition-transform hover:scale-[1.02]">
                <img
                  src="/explore.jpg"
                  alt="Discover features"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Explore Features</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Learn how to make the most of our platform
                </p>
                <button
                  onClick={() => navigate('/features')}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Learn More
                </button>
              </div>

              {/* Card 3 - Organizer Dashboard */}
              <div className="bg-white rounded-lg shadow-md flex flex-col items-center p-6 transition-transform hover:scale-[1.02]">
                <img
                  src="/dashboard.jpg"
                  alt="Organizer Dashboard"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">View Dashboard</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Manage all your events in one place
                </p>
                <button
                  onClick={() => navigate('/organizer-dashboard')}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrganizerProfile;