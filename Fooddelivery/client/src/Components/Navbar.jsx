import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("Navbar user updated:", user);
  }, [user]);

  return (
    <nav className="bg-gradient-to-r from-red-500 to-yellow-400 shadow-md py-4 w-full fixed top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="text-2xl font-bold text-white tracking-wide hover:text-black transition"
        >
          🍴 FoodExpress
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-white hover:text-black font-medium transition duration-300">
            Home
          </Link>
          <Link to="/menu" className="text-white hover:text-black font-medium transition duration-300">
            Menu
          </Link>
          <Link to="/cart" className="text-white hover:text-black font-medium transition duration-300">
            Cart
          </Link>
          {user && (
            <Link to="/orders" className="text-white hover:text-black font-medium transition duration-300">
              Orders
            </Link>
          )}
          {user ? (
            <>
              <span className="text-white bg-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                ✅ {user.name}
              </span>
              <button
                onClick={logout}
                className="bg-white text-red-500 px-4 py-1 rounded hover:bg-black hover:text-white transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-black hover:text-white transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-black hover:text-white transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-yellow-50 px-4 py-3 space-y-3">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-red-600 font-medium">
            Home
          </Link>
          <Link to="/menu" onClick={() => setIsOpen(false)} className="block text-red-600 font-medium">
            Menu
          </Link>
          <Link to="/cart" onClick={() => setIsOpen(false)} className="block text-red-600 font-medium">
            Cart
          </Link>
          {user && (
            <Link to="/orders" onClick={() => setIsOpen(false)} className="block text-red-600 font-medium">
              Orders
            </Link>
          )}
          {user ? (
            <>
              <span className="block text-green-600 font-semibold">✅ {user.name}</span>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-black transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block bg-blue-500 text-white py-2 rounded text-center hover:bg-black transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block bg-blue-500 text-white py-2 rounded text-center hover:bg-black transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
