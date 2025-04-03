
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Search, ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Find & Join the Best 
              <span className="shimmer-text block"> Events & Hackathons</span>
              <span className="text-foreground"> with One Click! 🚀</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg md:mx-0 mx-auto">
              Connect with events, colleges, and opportunities tailored just for you. Discover, participate, and level up your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button className="h-12 px-6 rounded-full bg-gradient-to-r from-eventify-purple to-eventify-blue text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <span>Get AI Recommendations</span>
              </Button>
              <Button variant="outline" className="h-12 px-6 rounded-full flex items-center gap-2">
                <Search className="h-5 w-5" />
                <span>Browse Events</span>
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative h-64 md:h-auto">
            <div className="absolute top-0 right-0 w-full h-full">
              <div className="relative w-full h-full">
                {/* Hero illustrations with animation */}
                <div className="absolute top-4 right-8 w-40 h-40 bg-gradient-to-br from-eventify-purple/80 to-eventify-blue/80 rounded-2xl rotate-6 animate-float delay-100"></div>
                <div className="absolute top-20 right-20 w-48 h-48 bg-gradient-to-br from-eventify-blue/80 to-eventify-purple/80 rounded-2xl -rotate-12 animate-float delay-300"></div>
                <div className="absolute top-32 right-4 w-32 h-32 bg-gradient-to-br from-eventify-light-purple/80 to-eventify-sky-blue/80 rounded-2xl rotate-45 animate-float delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
