
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Search, Moon, Sun, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setDarkMode(!darkMode);
  };

  const handleNavigate = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center">
          <div className="mr-4">
            <Logo />
          </div>

          {!isMobile && (
            <nav className="hidden md:flex items-center gap-6">
              <a 
                href="#" 
                onClick={() => handleNavigate('/')} 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Home
              </a>
              <a 
                href="#events" 
                onClick={() => handleNavigate('/events')} 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Events
              </a>
              <a 
                href="#challenges" 
                onClick={() => handleNavigate('/challenges')} 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Challenges
              </a>
              <a 
                href="#badges" 
                onClick={() => handleNavigate('/badges')} 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Badges
              </a>
              <a 
                href="#leaderboard" 
                onClick={() => handleNavigate('/leaderboard')} 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Leaderboard
              </a>
              <a 
                href="#games" 
                onClick={() => handleNavigate('/games')} 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Games 🎮
              </a>
              <a 
                href="#organizers" 
                onClick={() => handleNavigate('/organizers')} 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Organizers
              </a>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!isMobile && (
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events..."
                className="w-[200px] pl-8 rounded-full bg-secondary"
              />
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="mr-2"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full"
              onClick={() => navigate('/login')}
            >
              Log In
            </Button>
            <Button 
              size="sm" 
              className="rounded-full bg-gradient-to-r from-eventify-purple to-eventify-blue text-white"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Button>
          </div>

          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
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
                href="#events" 
                onClick={() => handleNavigate('/events')}
                className="px-2 py-1.5 text-sm font-medium hover:text-primary transition-colors"
              >
                Events
              </a>
              <a 
                href="#challenges" 
                onClick={() => handleNavigate('/challenges')}
                className="px-2 py-1.5 text-sm font-medium hover:text-primary transition-colors"
              >
                Challenges
              </a>
              <a 
                href="#badges" 
                onClick={() => handleNavigate('/badges')}
                className="px-2 py-1.5 text-sm font-medium hover:text-primary transition-colors"
              >
                Badges
              </a>
              <a 
                href="#leaderboard" 
                onClick={() => handleNavigate('/leaderboard')}
                className="px-2 py-1.5 text-sm font-medium hover:text-primary transition-colors"
              >
                Leaderboard
              </a>
              <a 
                href="#games" 
                onClick={() => handleNavigate('/games')}
                className="px-2 py-1.5 text-sm font-medium hover:text-primary transition-colors"
              >
                Games 🎮
              </a>
              <a 
                href="#organizers" 
                onClick={() => handleNavigate('/organizers')}
                className="px-2 py-1.5 text-sm font-medium hover:text-primary transition-colors"
              >
                Organizers
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
      )}

      {/* Floating CTA for organizers */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={() => navigate('/create-event')}
          className="rounded-full animate-pulse-glow bg-gradient-to-r from-eventify-purple to-eventify-blue text-white shadow-lg"
        >
          📢 List Your Event
        </Button>
      </div>
    </header>
  );
};

const Logo = () => {
  return (
    <div className="flex items-center">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-eventify-purple to-eventify-blue bg-clip-text text-transparent animate-text-shimmer">
        EVENTIFY
      </h1>
    </div>
  );
};

export default Navbar;
