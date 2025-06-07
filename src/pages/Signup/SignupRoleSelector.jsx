// import { useNavigate } from 'react-router-dom';

// function SignupRoleSelector() {
//   const navigate = useNavigate();

//   const handleRoleSelect = (role) => {
//     navigate(`/signup/${role}`);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
//       <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
//         <h2 className="text-2xl font-semibold mb-6 text-gray-800">Select Your Role</h2>
//         <div className="flex flex-col space-y-4">
//           <button
//             onClick={() => handleRoleSelect('attendee')}
//             className="py-3 px-6 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//           >
//             Attendee
//           </button>
//           <button
//             onClick={() => handleRoleSelect('vendor')}
//             className="py-3 px-6 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//           >
//             Vendor
//           </button>
//           <button
//             onClick={() => handleRoleSelect('organizer')}
//             className="py-3 px-6 bg-blue-400 text-white rounded hover:bg-blue-500 transition"
//           >
//             Organizer
//           </button>
//           <button
//             onClick={() => handleRoleSelect('admin')}
//             className="py-3 px-6 bg-blue-300 text-white rounded hover:bg-blue-400 transition"
//           >
//             Admin
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignupRoleSelector;

import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';

function SignupRoleSelector() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/signup/${role}`);
  };

  const roles = [
    {
      name: 'Attendee',
      description: 'Join events, purchase tickets, and enjoy experiences',
      icon: (
        <svg className="w-10 h-10 mb-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: 'bg-sky-600 hover:bg-sky-700'
    },
    {
      name: 'Vendor',
      description: 'Sell products or services at events',
      icon: (
        <svg className="w-10 h-10 mb-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      name: 'Organizer',
      description: 'Create and manage your own events',
      icon: (
        <svg className="w-10 h-10 mb-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-sky-400 hover:bg-sky-500'
    },
    {
      name: 'Admin',
      description: 'Manage platform settings and users',
      icon: (
        <svg className="w-10 h-10 mb-4 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: 'bg-sky-300 hover:bg-sky-400'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-sky-50">
      <Navigation />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-sky-800 mb-4">Join Our Community</h1>
            <p className="text-xl text-sky-600 max-w-2xl mx-auto">
              Select your role to get started with your account registration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roles.map((role) => (
              <div 
                key={role.name}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer border border-sky-100 flex flex-col"
                onClick={() => handleRoleSelect(role.name.toLowerCase())}
              >
                <div className="p-8 text-center flex-grow">
                  <div className="mx-auto flex justify-center">
                    {role.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-sky-800 mb-2">{role.name}</h3>
                  <p className="text-sky-600 mb-6">{role.description}</p>
                </div>
                <div className="px-6 pb-6">
                  <button
                    className={`w-full py-3 px-6 ${role.color} text-white rounded-lg font-medium transition-colors duration-300 shadow-sm`}
                  >
                    Sign Up as {role.name}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white rounded-xl shadow-sm p-8 max-w-4xl mx-auto border border-sky-100">
            <h2 className="text-2xl font-bold text-sky-800 mb-6 text-center">Not Sure Which Role to Choose?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-sky-700 mb-4">For Attendees</h3>
                <ul className="space-y-3 text-sky-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-sky-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Discover and attend exciting events</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-sky-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Purchase tickets with ease</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-sky-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Save favorite events</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-sky-700 mb-4">For Organizers & Vendors</h3>
                <ul className="space-y-3 text-sky-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-sky-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Create and manage events</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-sky-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Sell tickets or products</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-sky-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Access powerful analytics</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-sky-600 mb-4">Already have an account?</p>
              <button 
                onClick={() => navigate('/login')}
                className="text-sky-600 font-medium hover:text-sky-800 transition-colors underline"
              >
                Sign in here
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SignupRoleSelector;