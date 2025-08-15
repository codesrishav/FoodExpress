import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../Contexts/CartContext';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, dispatch } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const res = await axios.get('https://foodexpress-server.onrender.com/api/menu');
        setMenuItems(res.data);
      } catch (err) {
        setError('Failed to load menu. Please try again.');
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
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const handleIncrement = (id) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: id });
  };

  const handleDecrement = (id) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: id });
  };

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading menu...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto w-full overflow-x-hidden grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {menuItems.map((item) => {
        const quantity = getQuantity(item._id);
        return (
          <div key={item._id} className="bg-white p-4 shadow rounded">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
            <p className="text-gray-700 mb-2">₹{item.price}</p>
            {quantity > 0 ? (
              <div className="flex items-center justify-center gap-2">
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
      })}
    </div>
  );
};

export default Menu;

