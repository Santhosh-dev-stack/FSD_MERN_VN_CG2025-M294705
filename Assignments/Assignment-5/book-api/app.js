import express from 'express';
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRoutes.js';

const app = express();

/* --- Simple logging middleware --- */
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()}  ${req.method} ${req.originalUrl}`);
  next();
});

/* --- Body parser --- */
app.use(express.json());

/* --- MongoDB connection --- */
mongoose
  .connect('mongodb://127.0.0.1:27017/bookdb')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

/* --- Routes --- */
app.use('/books', bookRoutes);

/* --- Error handler (basic) --- */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

/* --- Start server --- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
