// src/components/AboutUs/AboutUsPage.tsx
import React from "react";

// Layout
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from '../components/layout/ScrollToTop';

// Sección principal de About Us
import AboutUsSection from "./AboutUsSection";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-x-hidden">
      <Header />
      <AboutUsSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default AboutUsPage;
