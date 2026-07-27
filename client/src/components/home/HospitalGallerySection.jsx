import React from 'react';
import { Camera, Eye } from 'lucide-react';

export default function HospitalGallerySection() {
  const IMAGES = [
    {
      title: 'State-of-the-Art Hospital Facade',
      tag: '1.6 Million Sq.Ft Campus',
      url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Robotic Surgical Operating Theater',
      tag: 'Da Vinci Xi 3D Suite',
      url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Executive Presidential Recovery Suite',
      tag: '5-Star Comfort & Quiet',
      url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'High-Volume Endoscopy Suite',
      tag: 'World Center of Excellence',
      url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#122824] relative border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00695C] dark:text-[#80CBC4]">
            Infrastructure Tour
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
            Designed for Healing & Comfort
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Architectural excellence incorporating healing gardens, HEPA-filtered laminar airflow OTs, and tranquil patient suites.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {IMAGES.map((img, idx) => (
            <div
              key={idx}
              className="relative h-72 rounded-3xl overflow-hidden group border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="bg-[#00695C] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1.5 inline-block">
                  {img.tag}
                </span>
                <h4 className="text-sm font-bold font-heading line-clamp-1">
                  {img.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
