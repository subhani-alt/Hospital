import React, { useState, useRef } from 'react';
import { PhoneCall, Mail, MapPin, Send, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { submitContactToSheet } from '../../services/googleSheets';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toggleEmergencyModal } = useStore();

  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await submitContactToSheet({
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
    });
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#F8FCFB] dark:bg-[#0A1917] text-slate-900 dark:text-white py-12 space-y-16">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00695C] dark:text-[#80CBC4]">
            Connect With Apex Health
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight">
            Campus Location & Directory
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Our clinical concierge and emergency command team are available 24 hours a day, 7 days a week.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Directory Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Emergency Hotline Box */}
            <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-6 rounded-3xl shadow-xl space-y-3">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
                <h3 className="text-lg font-bold font-heading">24/7 Emergency Trauma Desk</h3>
              </div>
              <p className="text-xs text-red-100">Direct hotline for immediate ICU ambulance dispatch and critical care admission.</p>
              <a href="tel:9959198252" className="inline-block bg-white text-red-700 font-bold px-6 py-3 rounded-full text-sm shadow-md hover:bg-red-50 transition cursor-pointer">
                +91 99591 98252
              </a>
            </div>

            {/* Campuses */}
            <div className="bg-white dark:bg-[#122824] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#00695C] dark:text-[#80CBC4] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm font-bold text-slate-900 dark:text-white block font-heading">
                    Gachibowli Main Campus
                  </strong>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                    1-66/AIG/2 to 5, Mindspace Road, Gachibowli, Hyderabad, Telangana 500032
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <MapPin className="w-5 h-5 text-[#00695C] dark:text-[#80CBC4] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm font-bold text-slate-900 dark:text-white block font-heading">
                    Banjara Hills Center of Excellence
                  </strong>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                    Road No. 1, Banjara Hills, Beside City Center Mall, Hyderabad – 500045
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#122824] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2">
                  Send a Patient Inquiry
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Your Full Name</label>
                  <input
                    ref={nameRef}
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:border-[#00695C]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Phone Number</label>
                    <input
                      ref={phoneRef}
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:border-[#00695C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Email Address</label>
                    <input
                      ref={emailRef}
                      type="email"
                      required
                      placeholder="patient@example.com"
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:border-[#00695C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Inquiry / Clinical Question</label>
                  <textarea
                    ref={messageRef}
                    rows={4}
                    required
                    placeholder="Describe your medical requirement or inquiry..."
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:border-[#00695C]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-emerald-gradient text-white font-bold py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Patient Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#00695C] dark:text-[#80CBC4] mx-auto" />
                <h3 className="text-xl font-bold font-heading">Inquiry Received</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Our patient relations officer will contact you within 2 business hours.
                </p>
              </div>
            )}
          </div>

        </div>

      </section>

      {/* Google Maps Embed iframe */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 h-96">
          <iframe
            title="Apex Health Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.275883838234!2d78.34631!3d17.4401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93a276e01a8b%3A0x4a9d70102b4d9342!2sAIG%20Hospitals!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

    </div>
  );
}
