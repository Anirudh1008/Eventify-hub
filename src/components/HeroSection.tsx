
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, BookOpen, Award, Calendar, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OrganizersSection from "@/components/OrganizersSection";

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
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/30">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What Our Users Say</h2>
            <p className="text-muted-foreground">
              Students and colleges across India are discovering the power of Eventify.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div>
                  <h3 className="font-bold">Ravi Kumar</h3>
                  <p className="text-sm text-muted-foreground">Computer Science Student</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">
                  IIT Bombay
                </div>
              </div>
              
              <p className="mb-4 text-sm">
                "Eventify helped me discover hackathons that perfectly matched my coding skills. I've won two certificates already and made great connections!"
              </p>
              
              <div className="flex text-yellow-400">
                <span>★★★★★</span>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div>
                  <h3 className="font-bold">Priya Sharma</h3>
                  <p className="text-sm text-muted-foreground">Cultural Secretary</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">
                  Lady Shri Ram College
                </div>
              </div>
              
              <p className="mb-4 text-sm">
                "As a cultural club secretary, I struggled with event promotion. With Eventify, our annual fest participation increased by 70%!"
              </p>
              
              <div className="flex text-yellow-400">
                <span>★★★★★</span>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div>
                  <h3 className="font-bold">Dr. Anand Desai</h3>
                  <p className="text-sm text-muted-foreground">Event Coordinator</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">
                  BITS Pilani
                </div>
              </div>
              
              <p className="mb-4 text-sm">
                "The analytics dashboard gives us incredible insights about student engagement. We've optimized our events based on the data."
              </p>
              
              <div className="flex text-yellow-400">
                <span>★★★★★</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <span className="sr-only">Previous</span>
              <ArrowRight className="h-4 w-4 rotate-180" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <span className="sr-only">Next</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* For Organizers Section */}
      <OrganizersSection />
    </div>
  );
};

export default HeroSection;
