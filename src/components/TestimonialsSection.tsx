
import React from 'react';
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TestimonialsSection = () => {
  return (
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
  );
};

export default TestimonialsSection;
