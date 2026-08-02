import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollProgress from './components/common/ScrollProgress';
import CursorEffect from './components/common/CursorEffect';
import FloatingButtons from './components/common/FloatingButtons';
import LoadingScreen from './components/common/LoadingScreen';

const EmergencyModal = lazy(() => import('./components/forms/EmergencyModal'));
const SymptomCheckerModal = lazy(() => import('./components/forms/SymptomCheckerModal'));
const VirtualAssistantModal = lazy(() => import('./components/forms/VirtualAssistantModal'));

import Home from './pages/Home';
import About from './pages/About';
import Departments from './pages/Departments';
import Doctors from './pages/Doctors';
import Appointment from './pages/Appointment';
import HealthPackages from './pages/HealthPackages';
import International from './pages/International';
import HealthLibrary from './pages/HealthLibrary';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Login from './pages/Auth/Login';
import AdminDashboard from './pages/Admin';

import { useStore } from './store/useStore';

// Scroll To Top component on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Layout Switcher to exclude patient navbar/footer/floating widgets from Admin panel
function AppContent() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/:tab?" element={<AdminDashboard />} />
      </Routes>
    );
  }

  return (
    <>
      <ScrollProgress />
      <CursorEffect />

      {/* Sticky Luxury Navbar for Patient Portal */}
      <Navbar />

      {/* Main Patient Portal Content */}
      <main className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/health-packages" element={<HealthPackages />} />
          <Route path="/international" element={<International />} />
          <Route path="/health-library" element={<HealthLibrary />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patient-portal" element={<Appointment />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Triggers & Modals */}
      <FloatingButtons />
      <Suspense fallback={null}>
        <EmergencyModal />
        <SymptomCheckerModal />
        <VirtualAssistantModal />
      </Suspense>
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useStore();

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#F8FCFB] dark:bg-[#0A1917] transition-colors duration-300">
        
        {/* Luxury Brand Preloader */}
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>

      </div>
    </div>
  );
}
