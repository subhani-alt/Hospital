import React, { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [fade, setFade] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1800; // Exactly 1.8 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        setFade(true);
        if (onComplete) setTimeout(onComplete, 400); // Allow fade out transition
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0A1917] transition-opacity duration-500 ease-out ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Brand Logo */}
        <img
          src="/prestige-logo-white.png"
          alt="Prestige Hospitals"
          className="h-16 sm:h-20 w-auto object-contain animate-pulse mb-3"
        />
        <p className="text-xs tracking-widest text-[#80CBC4]/80 uppercase font-semibold">
          Care That Matters &bull; Global Excellence
        </p>

        {/* Dynamic Progress Bar & Percentage */}
        <div className="w-56 mt-8 space-y-2">
          <div className="w-full h-1.5 overflow-hidden rounded-full bg-white/10 p-0.5 border border-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#00695C] via-[#00897B] to-[#80CBC4] transition-all ease-linear shadow-[0_0_15px_rgba(128,203,196,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-bold text-[#80CBC4] uppercase tracking-wider">
            <span>Loading Clinical Suite</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
