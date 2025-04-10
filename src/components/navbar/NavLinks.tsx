
import React from 'react';
import { useNavigate } from "react-router-dom";

type NavLinkProps = {
  handleNavigate: (path: string) => void;
};

const NavLinks: React.FC<NavLinkProps> = ({ handleNavigate }) => {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <a 
        href="#" 
        onClick={() => handleNavigate('/')} 
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Home
      </a>
      <a 
        href="#" 
        onClick={() => handleNavigate('/events')} 
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Explore
      </a>
      <a 
        href="#" 
        onClick={() => handleNavigate('/challenges')} 
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Challenges
      </a>
      <a 
        href="#games" 
        onClick={() => handleNavigate('/games')} 
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Games
      </a>
      <a 
        href="#" 
        onClick={() => handleNavigate('/leaderboard')} 
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Leaderboard
      </a>
      <a 
        href="#" 
        onClick={() => handleNavigate('/contact')} 
        className="text-sm font-medium hover:text-primary transition-colors"
      >
        Contact
      </a>
    </nav>
  );
};

export default NavLinks;
