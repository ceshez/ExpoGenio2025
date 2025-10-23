'use client';
import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/layout/ScrollToTop";
import AboutUsSection from "./AboutUsSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-x-hidden">
      <Header />
      <AboutUsSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
}