import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Menu from './Pages/Menu';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Checkout from './Pages/Checkout';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Components/ProtectedRoute';
import OrderHistory from './Pages/OrderHistory';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-yellow-100 text-center">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* 👇 Content wrapper (adds space below fixed Navbar) */}
      <div className="pt-20 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* ✅ Protected Routes */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />

          {/* ❌ Catch-All */}
          <Route
            path="*"
            element={<h1 className="text-red-500 text-2xl">404 - Page Not Found</h1>}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
