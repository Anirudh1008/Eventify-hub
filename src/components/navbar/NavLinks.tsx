
import React from 'react';
import { Button } from "@/components/ui/button";

interface NavLinksProps {
  handleNavigate: (path: string) => void;
}

const NavLinks = ({ handleNavigate }: NavLinksProps) => {
  return (
    <nav className="hidden md:flex items-center space-x-1">
      <Button
        variant="ghost"
        onClick={() => handleNavigate('/')}
        className="text-sm font-medium hover:text-primary"
      >
        Home
      </Button>
      <Button
        variant="ghost"
        onClick={() => handleNavigate('/events')}
        className="text-sm font-medium hover:text-primary"
      >
        Events
      </Button>
      <Button
        variant="ghost"
        onClick={() => handleNavigate('/challenges')}
        className="text-sm font-medium hover:text-primary"
      >
        Challenges
      </Button>
      <Button
        variant="ghost"
        onClick={() => handleNavigate('/colleges')}
        className="text-sm font-medium hover:text-primary"
      >
        Colleges
      </Button>
      <Button
        variant="ghost"
        onClick={() => handleNavigate('/leaderboard')}
        className="text-sm font-medium hover:text-primary"
      >
        Leaderboard
      </Button>
    </nav>
  );
};

export default NavLinks;
