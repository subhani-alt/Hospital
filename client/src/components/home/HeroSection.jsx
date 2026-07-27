import React, { useEffect, useRef, useState } from 'react';
import { Search, Calendar, PhoneCall, ArrowRight, Play, Pause, ShieldCheck, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import * as THREE from 'three';

export default function HeroSection() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { toggleEmergencyModal } = useStore();

  // Subtle Three.js Floating Particle Background
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle geometry
    const particlesCount = 80;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Particle material with emerald glow
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x80CBC4,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
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
      navigate(`/doctors?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-between overflow-hidden bg-[#051224]">
      
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-45 pointer-events-none"
        poster="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1920"
      >
        <source src="https://aigmobiledata.s3.ap-south-1.amazonaws.com/cms/videos/3407a18c-57eb-49a2-9b10-8fd50befef97.mp4" type="video/mp4" />
      </video>

      {/* Three.js Canvas Overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Gradient Overlays for Luxury Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#051224] via-[#051224]/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#051224]/90 via-[#051224]/60 to-transparent z-10 pointer-events-none" />

      {/* Video Control Toggle Button */}
      <button
        onClick={toggleVideo}
        className="absolute top-8 right-8 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all shadow-lg"
        title={isPlaying ? 'Pause Video' : 'Play Video'}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </button>

      {/* Main Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 pt-24 pb-16 flex-1 flex flex-col justify-center">
        
        <div className="max-w-3xl space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold text-[#80CBC4] uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-[#80CBC4]" />
            <span>South Asia's Premier Quaternary Hospital</span>
          </div>

          {/* Luxury Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white font-heading tracking-tight leading-[1.1]">
            Where Science Meets <br />
            <span className="text-gradient">Compassionate Care.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
            1,200 beds across 25 specialty Centers of Excellence. Pioneer in robotic surgery, living-donor organ transplants, and precision gastroenterology.
          </p>

          {/* Search Doctor & Specialty Form */}
          <form onSubmit={handleSearchSubmit} className="pt-2">
            <div className="glass-panel-dark p-2.5 rounded-full max-w-2xl flex flex-col sm:flex-row items-center gap-2 shadow-2xl border border-white/20">
              <div className="flex-1 flex items-center gap-3 px-4 w-full">
                <Search className="w-5 h-5 text-[#80CBC4]" />
                <input
                  type="text"
                  placeholder="Search doctor, procedure or condition (e.g. Dr. Reddy, Liver, TAVI)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none py-2"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto btn-emerald-gradient text-white font-semibold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-transform"
              >
                <Calendar className="w-4 h-4" />
                <span>Book OPD</span>
              </button>
            </div>
          </form>

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
