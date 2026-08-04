import React, { useEffect, useState } from 'react';

export default function CursorEffect() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on desktop/pointing devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverStart = (e) => {
      if (e.target.closest('a, button, [role="button"], input, select, textarea, .interactive')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleHoverStart);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleHoverStart);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Glow Ring */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full transition-transform duration-100 ease-out border border-[#00897B]/40 hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '48px' : '32px',
          height: isHovered ? '48px' : '32px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: isHovered ? 'rgba(0, 137, 123, 0.12)' : 'transparent',
          boxShadow: isHovered ? '0 0 20px rgba(0, 105, 92, 0.2)' : 'none'
        }}
      />
      {/* Inner Dot */}
      <div
        className="fixed pointer-events-none z-[9999] w-2 h-2 bg-[#00695C] rounded-full hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.15s, height 0.15s'
        }}
      />
    </>
  );
}
