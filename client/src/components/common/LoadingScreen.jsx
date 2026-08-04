import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

export default function LoadingScreen({ onComplete }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      if (onComplete) setTimeout(onComplete, 150);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0A1917] transition-opacity duration-500 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Glowing Logo Circle */}
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-[#00695C]/20 border border-[#00897B]/40 shadow-[0_0_50px_rgba(0,137,123,0.3)] animate-pulse">
          <Activity className="w-12 h-12 text-[#80CBC4] animate-spin" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-0 rounded-full border-2 border-t-[#00897B] border-r-transparent border-b-[#80CBC4] border-l-transparent animate-spin" />
        </div>

        {/* Brand Name */}
        <h1 className="mt-6 text-2xl font-bold tracking-widest text-white uppercase font-heading">
          Apex Health <span className="text-[#80CBC4]">Institute</span>
        </h1>
        <p className="mt-2 text-xs tracking-widest text-[#80CBC4]/80 uppercase">
          Precision Medicine &bull; Global Excellence
        </p>

        {/* Progress Bar */}
        <div className="w-48 h-1 mt-8 overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-gradient-to-r from-[#00695C] via-[#00897B] to-[#80CBC4] animate-pulse w-full" />
        </div>
      </div>
    </div>
  );
}
