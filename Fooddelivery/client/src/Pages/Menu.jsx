import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../Contexts/CartContext";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { cart, dispatch } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://foodexpress-server.onrender.com/api/menu"
        );
        setMenuItems(res.data);
      } catch (err) {
        setError("Failed to load menu. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const getQuantity = (id) => {
    const item = cart.find((item) => item._id === id);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const handleIncrement = (id) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: id });
  };

  const handleDecrement = (id) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: id });
  };

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading menu...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  // Extract unique categories
  const categories = ["All", ...new Set(menuItems.map((item) => item.category))];

  // Local category images from public/menu/
  const categoryImages = {
    All: "/menu/dal_makhani.jpeg", // optional placeholder
    Indian: "/menu/chole.jpeg",
    Chinese: "/menu/noodles.jpeg",
    "South Indian": "/menu/idli.jpeg",
    Desserts: "/menu/jalebi.jpeg",
    Beverages: "/menu/tea.jpeg",
    "Fast Food": "/menu/pizza.jpeg",
  };

  // Filter items based on category + search
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-screen-xl mx-auto w-full overflow-x-hidden p-4">
      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search your favorite food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`cursor-pointer flex flex-col items-center p-4 rounded-xl shadow-md transition border-2 ${
              selectedCategory === cat
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-green-400"
            }`}
          >
            <img
              src={categoryImages[cat] || "/menu/default.jpeg"}
              alt={cat}
              className="w-20 h-20 object-cover rounded mb-2"
            />
            <span className="font-medium">{cat}</span>
          </div>
        ))}
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const quantity = getQuantity(item._id);
            return (
              <div
                key={item._id}
                className="bg-white p-4 shadow rounded hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
                <p className="text-gray-700 mb-1">₹{item.price}</p>
                <p className="text-sm text-gray-500 italic">{item.category}</p>
                {quantity > 0 ? (
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <button
                      onClick={() => handleDecrement(item._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      −
                    </button>
                    <span className="px-3">{quantity}</span>
                    <button
                      onClick={() => handleIncrement(item._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No items found
          </p>
        )}
      </div>
    </div>
  );
};

export default Menu;
