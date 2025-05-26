import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-blue-500 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <ul className="flex space-x-6 justify-center text-gray-700 font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/find-events"
              className="hover:text-white transition-colors duration-200"
            >
              Find Events
            </Link>
          </li>
          {/* <li><Link to="/create-event">Create Event</Link></li> */}
          <li>
            <Link
              to="/login"
              className="hover:text-white transition-colors duration-200"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="hover:text-white transition-colors duration-200"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
