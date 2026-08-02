import mongoose from 'mongoose';
import { checkSupabaseConnection } from './supabase.js';

export const connectDB = async () => {
  // Verify Supabase Connection
  await checkSupabaseConnection();

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/apex_health_db', {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning] Local MongoDB service not detected on port 27017.`);
    console.warn(`[MongoDB Notice] Server is running with Supabase & Mock mode for development.`);
  }
};

