
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, BookOpen, Award, Calendar, Sparkles, ListPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create floating particles effect for dark theme
    const isDarkMode = document.documentElement.classList.contains('dark');
    if (isDarkMode && floatingElementsRef.current) {
      const container = floatingElementsRef.current;
      
      // Remove existing particles if any
      const existingParticles = container.querySelectorAll('.particle');
      existingParticles.forEach(p => p.remove());
      
      // Create new particles
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position, size and animation delay
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.opacity = `${Math.random() * 0.6 + 0.2}`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(particle);
      }
    }
  }, []);
  
  return (
    <div className="bg-gradient-to-b from-background to-blue-50/50 dark:to-blue-950/10 dark:from-background/80 relative overflow-hidden">
      {/* Floating elements container */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none overflow-hidden"></div>
      
      {/* Glow effect for dark mode */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl opacity-0 dark:opacity-100 animate-pulse-glow pointer-events-none"></div>
      
      <section className="pt-24 pb-8 md:pt-32 md:pb-12 relative z-10">
        <div className="container px-4 max-w-6xl mx-auto">
          {/* AI-Powered Label */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-950/30 px-4 py-2 rounded-full">
              <Sparkles className="h-4 w-4 text-eventify-purple" />
              <span className="text-sm text-eventify-purple font-medium">AI-Powered Event Management Platform</span>
            </div>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Discover Events That <span className="shimmer-text">Match Your</span> <br />
              Skills & Interests
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Eventify connects students with hackathons, workshops, cultural fests, and competitions from colleges across India. All personalized for you.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Button 
                variant="outline" 
                className="h-12 px-6 rounded-full flex items-center gap-2 dark:bg-black/20 dark:hover:bg-black/40 backdrop-blur-sm transition-all duration-300"
                onClick={() => navigate('/colleges')}
              >
                <BookOpen className="h-4 w-4" />
                <span>Browse Colleges</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-12 px-6 rounded-full flex items-center gap-2 dark:bg-black/20 dark:hover:bg-black/40 backdrop-blur-sm transition-all duration-300"
                onClick={() => navigate('/organizers')}
              >
                <Calendar className="h-4 w-4" />
                <span>For Organizers</span>
              </Button>
              
              <Button 
                variant="default" 
                className="h-12 px-6 rounded-full flex items-center gap-2 bg-gradient-to-r from-eventify-purple to-eventify-blue text-white shadow-lg hover:shadow-eventify-purple/20 dark:shadow-eventify-purple/40 transition-all duration-300"
                onClick={() => navigate('/create-event')}
              >
                <ListPlus className="h-4 w-4" />
                <span>List your Event</span>
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-16 mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-full">
                  <Search className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold">1000+</p>
                  <p className="text-sm text-muted-foreground">Events</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold">500+</p>
                  <p className="text-sm text-muted-foreground">Colleges</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded-full">
                  <Award className="h-5 w-5 text-orange-500" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold">10K+</p>
                  <p className="text-sm text-muted-foreground">Students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
