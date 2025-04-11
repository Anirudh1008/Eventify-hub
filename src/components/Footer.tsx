
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-eventify-purple to-eventify-blue bg-clip-text text-transparent">
                EVENTIFY
              </h1>
            </div>
            <p className="text-gray-300 mb-6">
              Connect with events, colleges, and opportunities tailored just for you.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a onClick={() => navigate('/')} className="text-gray-300 hover:text-white transition-colors cursor-pointer hover:translate-x-1 inline-block">Home</a></li>
              <li><a onClick={() => navigate('/events')} className="text-gray-300 hover:text-white transition-colors cursor-pointer hover:translate-x-1 inline-block">Explore</a></li>
              <li><a onClick={() => navigate('/challenges')} className="text-gray-300 hover:text-white transition-colors cursor-pointer hover:translate-x-1 inline-block">Challenges</a></li>
              <li><a onClick={() => navigate('/games')} className="text-gray-300 hover:text-white transition-colors cursor-pointer hover:translate-x-1 inline-block">Games</a></li>
              <li><a onClick={() => navigate('/leaderboard')} className="text-gray-300 hover:text-white transition-colors cursor-pointer hover:translate-x-1 inline-block">Leaderboard</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Information</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block">Terms & Conditions</a></li>
              <li><a onClick={() => navigate('/contact')} className="text-gray-300 hover:text-white transition-colors cursor-pointer hover:translate-x-1 inline-block">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Subscribe</h3>
            <p className="text-gray-300 mb-4">Stay updated with the latest events and opportunities</p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email"
                className="rounded-full bg-slate-800 border-slate-700 text-white"
              />
              <Button size="icon" className="rounded-full bg-gradient-to-r from-eventify-purple to-eventify-blue text-white hover:shadow-glow">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Eventify. All rights reserved.
          </p>
          
          <Button 
            variant="outline" 
            className="rounded-full border-gray-700 text-white hover:bg-eventify-purple hover:text-white hover:border-transparent"
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
