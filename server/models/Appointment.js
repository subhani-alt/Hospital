import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    patientPhone: { type: String, required: true },
    patientEmail: { type: String, required: true },
    doctorName: { type: String, required: true },
    department: { type: String, required: true },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    type: { type: String, enum: ['in-person', 'online'], default: 'in-person' },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'confirmed' },
    fee: { type: Number, default: 2000 },
    paymentStatus: { type: String, enum: ['unpaid', 'paid', 'insurance'], default: 'unpaid' }
  },
  { timestamps: true }
);

export default mongoose.model('Appointment', appointmentSchema);
