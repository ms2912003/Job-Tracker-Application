import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-gray-100 flex items-center space-x-2">
          <span className="text-xl md:text-2xl font-bold tracking-tight">Job Tracker</span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200"
          >
            Dashboard
          </Link>
          <Link
            to="/stats"
            className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200"
          >
            Stats
          </Link>
          <Link
            to="/settings"
            className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200"
          >
            Settings
          </Link>
          <Link
            to="/add"
            className="px-5 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200 shadow-lg"
          >
            Add Job
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;