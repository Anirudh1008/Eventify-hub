
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-background border-t border-border">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-eventify-purple to-eventify-blue bg-clip-text text-transparent">
                EVENTIFY
              </h1>
            </div>
            <p className="text-muted-foreground mb-6">
              Connect with events, colleges, and opportunities tailored just for you.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a onClick={() => navigate('/')} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Home</a></li>
              <li><a onClick={() => navigate('/events')} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Explore</a></li>
              <li><a onClick={() => navigate('/challenges')} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Challenges</a></li>
              <li><a onClick={() => navigate('/games')} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Games</a></li>
              <li><a onClick={() => navigate('/leaderboard')} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Leaderboard</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Information</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</a></li>
              <li><a onClick={() => navigate('/contact')} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Subscribe</h3>
            <p className="text-muted-foreground mb-4">Stay updated with the latest events and opportunities</p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email"
                className="rounded-full"
              />
              <Button size="icon" className="rounded-full bg-gradient-to-r from-eventify-purple to-eventify-blue text-white">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Eventify. All rights reserved.
          </p>
          
          <Button 
            variant="outline" 
            className="rounded-full"
            onClick={() => navigate('/create-event')}
          >
            List Your Event
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
