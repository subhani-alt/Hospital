import React, { useEffect, useRef, useState } from 'react';
import { Search, Calendar, PhoneCall, ArrowRight, Play, Pause, ShieldCheck, Award, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { DOCTORS } from '../../services/data';
import * as THREE from 'three';

export default function HeroSection() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const searchContainerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { toggleEmergencyModal } = useStore();

  // Filter matching doctors live as user types
  const matchingDoctors = searchQuery.trim()
    ? DOCTORS.filter((doc) => {
        const query = searchQuery.toLowerCase().trim();
        return (
          doc.name.toLowerCase().includes(query) ||
          doc.deptName.toLowerCase().includes(query) ||
          doc.title.toLowerCase().includes(query) ||
          (doc.qualification && doc.qualification.toLowerCase().includes(query))
        );
      })
    : [];

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Optimized Three.js Floating Particle Background
  useEffect(() => {
    if (!canvasRef.current) return;

    let animationFrameId;
    let renderer, scene, camera, particlesMesh;

    const initTimer = setTimeout(() => {
      if (!canvasRef.current) return;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: false, powerPreference: 'high-performance' });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(1); // 1x pixel ratio for maximum performance

      // Particle geometry
      const particlesCount = 50;
      const posArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
      }

      const particlesGeometry = new THREE.BufferGeometry();
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.04,
        color: 0x80CBC4,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending
      });

      particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);

      camera.position.z = 3;

      const animate = () => {
        if (!document.hidden && particlesMesh) {
          particlesMesh.rotation.y += 0.0008;
          particlesMesh.rotation.x += 0.0004;
          renderer.render(scene, camera);
        }
        animationFrameId = requestAnimationFrame(animate);
      };
      animate();
    }, 200);

    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      clearTimeout(initTimer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (renderer) renderer.dispose();
    };
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/doctors?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
    }
  };

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-between overflow-visible bg-black">
      
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover opacity-95 brightness-110 pointer-events-none"
        poster="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1920"
      >
        <source src="https://aigmobiledata.s3.ap-south-1.amazonaws.com/cms/videos/3407a18c-57eb-49a2-9b10-8fd50befef97.mp4" type="video/mp4" />
      </video>

      {/* Subtle Neutral Overlay for Text Legibility (No Color Tint) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent z-10 pointer-events-none" />

      {/* Video Control Toggle Button */}
      <button
        onClick={toggleVideo}
        className="absolute top-8 right-8 z-30 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all shadow-lg"
        title={isPlaying ? 'Pause Video' : 'Play Video'}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </button>

      {/* Main Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-16 flex-1 flex flex-col justify-center">
        
        <div className="max-w-3xl space-y-6">

          {/* Search Doctor & Specialty Form at Top of Home Page */}
          <form onSubmit={handleSearchSubmit} className="pb-2 relative z-30" ref={searchContainerRef}>
            <div className="glass-panel-dark p-2.5 rounded-full max-w-2xl flex flex-col sm:flex-row items-center gap-2 shadow-2xl border border-white/20">
              <div className="flex-1 flex items-center gap-3 px-4 w-full py-1">
                <Search className="w-5 h-5 text-[#80CBC4]" />
                <input
                  type="text"
                  placeholder="Search doctor, procedure or condition (e.g. Dr. Reddy, Ananya, Liver)..."
                  value={searchQuery}
                  onFocus={() => setShowDropdown(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none py-2"
                />
              </div>
            </div>

            {/* Live Autocomplete Dropdown */}
            {showDropdown && searchQuery.trim() !== '' && (
              <div className="absolute top-full left-0 w-full max-w-2xl mt-2 bg-[#0A1917] border-2 border-[#80CBC4]/60 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-3 bg-[#00695C]/50 text-[11px] font-bold uppercase tracking-wider text-[#80CBC4] border-b border-white/10 flex justify-between items-center">
                  <span>Matching Doctors & Specialists ({matchingDoctors.length})</span>
                  <span className="text-slate-300 font-normal text-[10px]">Select to view profile</span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-white/10 pb-1" data-lenis-prevent>
                  {matchingDoctors.length > 0 ? (
                    matchingDoctors.map((doc) => (
                      <div
                        key={doc.id}
                        onClick={() => {
                          navigate(`/appointment?doctor=${doc.id}`);
                          setShowDropdown(false);
                        }}
                        className="p-3.5 bg-[#0A1917] hover:bg-[#00695C]/40 transition-colors cursor-pointer flex items-center gap-3.5 group"
                      >
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-[#80CBC4] shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-white group-hover:text-[#80CBC4] transition-colors truncate">
                              {doc.name}
                            </h4>
                            <span className="text-xs text-amber-300 font-extrabold flex items-center gap-1 shrink-0 ml-2">
                              ★ {doc.rating}
                            </span>
                          </div>
                          <p className="text-xs text-slate-200 truncate mt-0.5 font-medium">
                            {doc.title}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-slate-300">
                            <span className="bg-[#00695C] text-white px-2.5 py-0.5 rounded-full font-semibold">
                              {doc.deptName}
                            </span>
                            <span>• {doc.experience} Yrs Experience</span>
                            <span>• ₹{doc.consultationFee.toLocaleString('en-IN')} Fee</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-5 bg-[#0A1917] text-center text-xs text-slate-300">
                      No matching doctor found for "<span className="text-white font-semibold">{searchQuery}</span>".
                      <button 
                        type="submit" 
                        className="block mx-auto mt-2 text-[#80CBC4] hover:underline font-semibold text-xs"
                      >
                        Search full directory →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </form>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full text-xs font-semibold text-white uppercase tracking-widest shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>South Asia's Premier Quaternary Hospital</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white font-heading tracking-tight leading-[1.1] drop-shadow-md">
            Where Science Meets <br />
            <span className="text-white">Compassionate Care.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
            1,200 beds across 25 specialty Centers of Excellence. Pioneer in robotic surgery, living-donor organ transplants, and precision gastroenterology.
          </p>

          {/* Key Stat Badges */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#80CBC4] animate-ping" />
              <span>24/7 Level-1 Trauma Emergency</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#80CBC4]" />
              <span>JCI & NABH Gold Standard Certified</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
