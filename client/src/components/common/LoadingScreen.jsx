import React, { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      if (onComplete) setTimeout(onComplete, 400); // Allow fade out transition
    }, 1800); // Exactly 1.8 seconds

    return () => clearTimeout(timer);
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
      </div>
    </div>
  );
}
