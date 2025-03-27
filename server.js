import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { PORT, MONGO_URI } from './config/index.js';
import Router from './routes/index.js';

dotenv.config(); // Load .env variables

// Create Express server
const server = express();

// Middleware setup
server.use(cors({
  origin: true,
  credentials: true,
}));
server.disable("x-powered-by");
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// MongoDB connection
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });


// Routes
Router(server);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
