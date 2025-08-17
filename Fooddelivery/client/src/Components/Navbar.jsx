import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useEffect, useState } from "react";
import { useCart } from "../Contexts/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("Navbar user updated:", user);
  }, [user]);

  return (
    <nav className="bg-gradient-to-r from-red-500 to-yellow-400 shadow-md py-4 w-full">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white tracking-wide">
          🍴 FoodExpress
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-white hover:text-black font-medium transition duration-300">Home</Link>
          <Link to="/menu" className="text-white hover:text-black font-medium transition duration-300">Menu</Link>

          {/* Cart with red dot */}
          <div className="relative">
            <Link to="/cart" className="text-white hover:text-black font-medium transition duration-300">Cart</Link>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-600 rounded-full"></span>
            )}
          </div>

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
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-red-600 flex flex-col space-y-4 py-4 px-6">
          <Link to="/" className="text-white font-medium" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/menu" className="text-white font-medium" onClick={() => setIsOpen(false)}>Menu</Link>

          <div className="relative">
            <Link to="/cart" className="text-white font-medium" onClick={() => setIsOpen(false)}>Cart</Link>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-3 w-2 h-2 bg-red-600 rounded-full"></span>
            )}
          </div>

          {user && (
            <Link to="/orders" className="text-white font-medium" onClick={() => setIsOpen(false)}>Orders</Link>
          )}
          {user ? (
            <>
              <span className="text-white bg-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                ✅ {user.name}
              </span>
              <button
                onClick={() => { logout(); setIsOpen(false); }}
                className="bg-white text-red-500 px-4 py-1 rounded hover:bg-black hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-white text-blue-500 px-4 py-1 rounded" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/register" className="bg-white text-blue-500 px-4 py-1 rounded" onClick={() => setIsOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
