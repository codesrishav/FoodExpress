import { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../Contexts/AuthContext';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await API.get(`/orders/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) {
    return <p className="p-6 text-center">Loading orders...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="border p-4 rounded shadow">
              <p className="text-gray-600 mb-2">
                Ordered at: {new Date(order.createdAt).toLocaleString()}
              </p>
              <p className="font-semibold mb-2">Delivery Address:</p>
              <p className="mb-4">{order.address}</p>
              <div className="mb-2">
                <p className="font-semibold">Items:</p>
                <ul className="list-disc list-inside">
                  {order.items.map(item => (
                    <li key={item.foodId}>
                      {item.name} - Qty: {item.quantity} - ₹{item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="font-bold mt-2">Total Amount: ₹{order.totalAmount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
