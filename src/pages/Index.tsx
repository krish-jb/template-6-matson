import React from "react";
import { WeddingProvider } from "@/contexts/WeddingProvider";
import Navigation from "@/components/sections/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import StorySection from "@/components/sections/StorySection";
import WeddingDetailsSection from "@/components/sections/WeddingDetailsSection";
import ScheduleSection from "@/components/sections/ScheduleSection";
import GallerySection from "@/components/sections/GallerySection";
import WishesSection from "@/components/sections/WishesSection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <WeddingProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <div id="home">
          <HeroSection />
        </div>
        <StorySection />
        <WeddingDetailsSection />
        <ScheduleSection />
        <GallerySection />
        <WishesSection />
        <ContactSection />
        
        <footer className="py-8 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-4">
            <div className="text-2xl ornament mb-2">❋</div>
            <p className="font-serif">Vineeth & Parvathy • May 2025</p>
          </div>
        </footer>
      </div>
    </WeddingProvider>
  );
};

export default Index;
