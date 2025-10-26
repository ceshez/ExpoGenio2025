import React, { useState, useEffect } from 'react';

// Importar componentes comunes
import LoadingScreen from './components/Common/LoadingScreen';

// Importar layout
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ScrollToTop from './components/Layout/ScrollToTop';

// Importar secciones
import HeroSection from './components/Sections/HeroSection';
import BenefitsSection from './components/Sections/BenefitsSection';
import TemplatesSection from './components/Sections/TemplatesSection';
import TestimonialsSection from './components/Sections/TestimonialsSecction';
import PlansSection from './components/Sections/PlansSection';
import FAQSection from './components/Sections/FAQSection';
import ContactSection from './components/Sections/ContactSection';
import CTASection from './components/Sections/CTASection';

// Importar AboutUs
import AboutUsPage from './about/AboutUsSection';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simular carga
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <LoadingScreen isLoading={isLoading} progress={loadingProgress} />

      <Routes>
        {/* Página principal */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-white text-gray-900 relative overflow-x-hidden">
              {/* Fondo decorativo */}
              <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full opacity-5">
                  <div 
                    className="absolute top-1/4 left-1/10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
                    style={{ animationDuration: '4s' }}
                  />
                  <div 
                    className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
                    style={{ animationDuration: '6s', animationDelay: '2s' }}
                  />
                </div>
              </div>

              <div className="relative z-10">
                <Header />
                <HeroSection />
                <BenefitsSection />
                <TemplatesSection />
                <TestimonialsSection />
                <PlansSection />
                <FAQSection />
                <ContactSection />
                <CTASection />
                <Footer />
              </div>
            </div>
          }
        />

        {/* Página Sobre Nosotros */}
        <Route
          path="/about"
          element={
            <div className="bg-white text-gray-900">
              <Header />
              <AboutUsPage />
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
