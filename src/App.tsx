import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { FloatingActions } from './components/FloatingActions';
import { ThemeProvider } from './context/ThemeContext';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { HealthTipsPage } from './pages/HealthTipsPage';
import { ContactPage } from './pages/ContactPage';
import { Page } from './types';

function getPageFromLocation(): Page {
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
  const hash = window.location.hash.toLowerCase().replace(/^#/, '');

  if (path === '/services' || hash === 'services') return 'services';
  if (path === '/health-tips' || hash === 'health-tips') return 'health-tips';
  if (path === '/contact' || hash === 'contact') return 'contact';

  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromLocation);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedServiceId(undefined);
  };

  const scrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const navigateTo = useCallback((page: Page, sectionId?: string) => {
    setCurrentPage(page);

    const targetUrl = page === 'home' ? (sectionId ? `#${sectionId}` : '/') : (sectionId ? `/${page}#${sectionId}` : `/${page}`);
    try {
      window.history.pushState(null, '', targetUrl);
    } catch {
      // safe fallback
    }

    if (sectionId) {
      scrollToSection(sectionId);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  // Sync state on popstate or hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      const page = getPageFromLocation();
      setCurrentPage(page);

      const hash = window.location.hash.replace(/^#/, '');
      if (hash && hash !== 'home' && hash !== 'services' && hash !== 'health-tips' && hash !== 'contact') {
        scrollToSection(hash);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    // Initial check if opened with a hash
    const initialHash = window.location.hash.replace(/^#/, '');
    if (initialHash && ['symptom-checker', 'process', 'testimonials', 'faq'].includes(initialHash)) {
      scrollToSection(initialHash);
    }

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-teal-500 selection:text-white">
        {/* Main Navbar */}
        <Navbar
          currentPage={currentPage}
          onNavigate={navigateTo}
          onOpenBooking={handleOpenBooking}
        />

        {/* Main Content Router */}
        <main className="flex-1">
          {currentPage === 'home' && (
            <HomePage
              onOpenBooking={handleOpenBooking}
              onNavigate={navigateTo}
              onScrollToSection={scrollToSection}
            />
          )}

          {currentPage === 'services' && (
            <ServicesPage
              onOpenBooking={handleOpenBooking}
              onNavigate={navigateTo}
            />
          )}

          {currentPage === 'health-tips' && (
            <HealthTipsPage
              onOpenBooking={handleOpenBooking}
              onNavigate={navigateTo}
            />
          )}

          {currentPage === 'contact' && (
            <ContactPage
              onOpenBooking={() => handleOpenBooking()}
              onNavigate={navigateTo}
            />
          )}
        </main>

        {/* Footer */}
        <Footer onNavigate={navigateTo} />

        {/* Global Appointment Booking Modal */}
        <AppointmentModal
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
          initialServiceId={selectedServiceId}
        />

        {/* Floating Quick Action Widgets */}
        <FloatingActions onOpenBooking={() => handleOpenBooking()} />
      </div>
    </ThemeProvider>
  );
}
