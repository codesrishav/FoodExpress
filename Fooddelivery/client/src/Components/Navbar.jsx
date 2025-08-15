import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useEffect } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    console.log("Navbar user updated:", user);
  }, [user]);

  return (
    <nav className="bg-gradient-to-r from-red-500 to-yellow-400 shadow-md py-4 w-full overflow-x-hidden">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white tracking-wide">🍴 FoodExpress</h1>
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
      </div>
    </nav>
  );
};

export default Navbar;
