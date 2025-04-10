
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type MobileMenuProps = {
  isMenuOpen: boolean;
  handleNavigate: (path: string) => void;
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isMenuOpen, handleNavigate }) => {
  if (!isMenuOpen) return null;

  return (
    <div className="absolute top-16 left-0 right-0 bg-background border-b border-border animate-fade-in">
      <div className="container py-4 px-4 flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search events..."
            className="w-full pl-8 rounded-full bg-secondary"
          />
        </div>
        <nav className="flex flex-col gap-2">
          <a 
            href="#" 
            onClick={() => handleNavigate('/')}
            className="px-2 py-1.5 text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </a>
          <a 
            href="#" 
            onClick={() => handleNavigate('/events')}
            className="px-2 py-1.5 text-sm font-medium hover:text-primary transition-colors"
          >
            Explore
          </a>
          <a 
            href="#" 
            onClick={() => handleNavigate('/challenges')}
            className="px-2 py-1.5 text-sm font-medium hover:text-primary transition-colors"
          >
            Challenges
          </a>
          <a 
            href="#" 
            onClick={() => handleNavigate('/games')}
            className="px-2 py-1.5 text-sm font-medium hover:text-primary transition-colors"
          >
            Games
          </a>
          <a 
            href="#" 
            onClick={() => handleNavigate('/leaderboard')}
            className="px-2 py-1.5 text-sm font-medium hover:text-primary transition-colors"
          >
            Leaderboard
          </a>
          <a 
            href="#" 
            onClick={() => handleNavigate('/contact')}
            className="px-2 py-1.5 text-sm font-medium hover:text-primary transition-colors"
          >
            Contact
          </a>
        </nav>
        <div className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handleNavigate('/login')}
          >
            Log In
          </Button>
          <Button 
            className="w-full bg-gradient-to-r from-eventify-purple to-eventify-blue text-white"
            onClick={() => handleNavigate('/signup')}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
