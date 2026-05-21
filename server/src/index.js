const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const dreamRoutes = require('./routes/dreamRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [process.env.CLIENT_URL, 'https://dream-os-mu.vercel.app', 'http://localhost:5173'].filter(Boolean),
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dreams', dreamRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('DreamOS API is running (v2)...');
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dreamos';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected successfully (v2)'))
  .catch(err => console.log('MongoDB Connection Error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
