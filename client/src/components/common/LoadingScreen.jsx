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
        {/* Brand Logo */}
        <img
          src="/prestige-logo-white.png"
          alt="Prestige Hospitals"
          className="h-16 sm:h-20 w-auto object-contain animate-pulse mb-2"
        />
        <p className="text-xs tracking-widest text-[#80CBC4]/80 uppercase font-semibold">
          Care That Matters &bull; Global Excellence
        </p>

        {/* Progress Bar */}
        <div className="w-48 h-1 mt-8 overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-gradient-to-r from-[#00695C] via-[#00897B] to-[#80CBC4] animate-pulse w-full" />
        </div>
      </div>
    </div>
  );
}
