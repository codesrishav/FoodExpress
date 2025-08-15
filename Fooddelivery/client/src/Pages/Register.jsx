import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateEmail(email.trim())) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      toast.error('Password should be at least 6 characters.');
      return;
    }

    if (password !== confirm) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await API.post('/auth/register', {
        name: name.trim(),
        email: email.trim(),
        password,
      });
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white shadow-md rounded p-6 w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2 p-2 w-full border rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 w-full border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 p-2 w-full border rounded"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="mb-4 p-2 w-full border rounded"
          required
        />

        <button
          type="submit"
          className={`text-white w-full py-2 rounded ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register;
