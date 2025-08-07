const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // ✅ Frontend origin
  credentials: true,
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err.message));

// Routes
const menuRoutes = require('./routes/menuroutes');
const authRoutes = require('./routes/authroutes');
let orderRoutes;

try {
  orderRoutes = require('./routes/orderRoutes');
} catch (err) {
  console.warn('⚠️ orderRoutes not found. Skipping...');
}

app.use('/api/menu', menuRoutes);
app.use('/api/auth', authRoutes);
if (orderRoutes) app.use('/api/orders', orderRoutes);

// Optional: Test route
app.get('/', (req, res) => {
  res.send('🚀 Backend is running');
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔗 MongoDB URI: ${process.env.MONGO_URI}`);
});
