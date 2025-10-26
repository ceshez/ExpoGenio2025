'use client';
import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ScrollToTop from "../components/Layout/ScrollToTop";
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