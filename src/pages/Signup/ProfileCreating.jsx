import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileCreating = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 4000); // Redirect after 4 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-500"></div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-fade-in">
          Your Profile is Being Created
        </h1>
        <p className="text-lg text-gray-500 animate-fade-in animation-delay-200">
          Please wait while we set up your account...
        </p>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animation-delay-200 {
            animation-delay: 0.2s;
          }
        `}
      </style>
    </div>
  );
};

export default ProfileCreating;
