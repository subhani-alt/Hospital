import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(mongoSanitize());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    hospital: 'Apex Health Institute & Research Center',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Mock API Routes for Doctor, Appointments & Analytics
app.get('/api/doctors', (req, res) => {
  res.json({
    success: true,
    count: 6,
    data: [
      { id: '1', name: 'Dr. D. Nageshwar Reddy', dept: 'Gastroenterology', rating: 4.98, fee: 2500 },
      { id: '2', name: 'Dr. Ananya Sharma', dept: 'Oncology', rating: 4.95, fee: 2000 },
      { id: '3', name: 'Dr. K. Srinivas', dept: 'Cardiology', rating: 4.96, fee: 2200 }
    ]
  });
});

app.get('/api/analytics', (req, res) => {
  res.json({
    success: true,
    totalPatients: 52400,
    totalAppointments: 1420,
    activeDoctors: 250,
    monthlyRevenue: 12500000
  });
});

// Port Server Listener
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[Server] Apex Health Backend API running on port ${PORT}`);
  connectDB();
});
