
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, BookOpen, Award, Calendar, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-gradient-to-b from-background to-blue-50/50 dark:to-blue-950/10">
      <section className="pt-24 pb-8 md:pt-32 md:pb-12 overflow-hidden">
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
                className="h-12 px-6 rounded-full flex items-center gap-2"
                onClick={() => navigate('/organizers')}
              >
                <Calendar className="h-4 w-4" />
                <span>For Organizers</span>
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
