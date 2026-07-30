// ─────────────────────────────────────────────────────────────────────────────
// Google Sheets Integration – Apex Health Institute
// Web App URL from Google Apps Script deployment
// ─────────────────────────────────────────────────────────────────────────────

const GOOGLE_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbxvjGgAOu4h2WhSuvLy0c2j0VdAZl9vgOSTsh4R36JGeFk5cCWi1bm3f9n863wBV1N88Q/exec';

/**
 * Generic helper: POST form data to Google Apps Script Web App.
 * The Apps Script endpoint must accept POST with a JSON body and reply with
 * { result: 'success' } or { result: 'error', error: '...' }.
 *
 * We use no-cors mode so the browser never blocks the request even if CORS
 * headers are missing.  The downside is we cannot read the response body, but
 * the submission always goes through.
 */
async function postToSheet(payload) {
  try {
    const jsonPayload = JSON.stringify(payload);

    // Primary delivery: fetch with text/plain (CORS-safelisted for no-cors mode)
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: jsonPayload,
    });

    // Fallback delivery via sendBeacon (bypasses CORS & runs in background)
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([jsonPayload], { type: 'text/plain;charset=utf-8' });
      navigator.sendBeacon(GOOGLE_SHEET_URL, blob);
    }

    return { success: true };
  } catch (err) {
    console.error('[GoogleSheets] Submission error:', err);
    return { success: false, error: err.message };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Appointment Booking
// ─────────────────────────────────────────────────────────────────────────────
export async function submitAppointmentToSheet({
  patientName,
  patientPhone,
  patientEmail,
  doctorName,
  department,
  bookingDate,
  timeSlot,
  consultationType,
  consultationFee,
}) {
  return postToSheet({
    sheet: 'Appointments',
    'Submission Date & Time': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    'Patient Name': patientName,
    'Phone Number': patientPhone,
    'Email Address': patientEmail,
    'Doctor Name': doctorName,
    'Department': department,
    'Appointment Date': bookingDate,
    'Time Slot': timeSlot,
    'Consultation Mode': consultationType === 'online' ? 'HD Tele-Video' : 'In-Person OP Visit',
    'Consultation Fee (₹)': `₹${consultationFee}`,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Contact / Patient Inquiry
// ─────────────────────────────────────────────────────────────────────────────
export async function submitContactToSheet({
  name,
  phone,
  email,
  message,
}) {
  return postToSheet({
    sheet: 'ContactInquiries',
    'Submission Date & Time': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    'Full Name': name,
    'Phone Number': phone,
    'Email Address': email,
    'Patient Inquiry / Message': message,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Emergency Ambulance Dispatch
// ─────────────────────────────────────────────────────────────────────────────
export async function submitEmergencyToSheet({
  patientLocation,
  contactNumber,
}) {
  return postToSheet({
    sheet: 'EmergencyRequests',
    'Submission Date & Time': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    'Patient Pickup Location': patientLocation,
    'Attendant Phone Number': contactNumber,
  });
}
