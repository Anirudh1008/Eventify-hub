
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface MobileMenuProps {
  isMenuOpen: boolean;
  handleNavigate: (path: string) => void;
}

const MobileMenu = ({ isMenuOpen, handleNavigate }: MobileMenuProps) => {
  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
      <div className="container px-4 py-4 space-y-2">
        <Button
          variant="ghost"
          onClick={() => handleNavigate('/')}
          className="w-full justify-start text-sm font-medium"
        >
          Home
        </Button>
        <Button
          variant="ghost"
          onClick={() => handleNavigate('/events')}
          className="w-full justify-start text-sm font-medium"
        >
          Events
        </Button>
        <Button
          variant="ghost"
          onClick={() => handleNavigate('/challenges')}
          className="w-full justify-start text-sm font-medium"
        >
          Challenges
        </Button>
        <Button
          variant="ghost"
          onClick={() => handleNavigate('/colleges')}
          className="w-full justify-start text-sm font-medium"
        >
          Colleges
        </Button>
        <Button
          variant="ghost"
          onClick={() => handleNavigate('/leaderboard')}
          className="w-full justify-start text-sm font-medium"
        >
          Leaderboard
        </Button>
        <Separator className="my-2" />
        <Button
          variant="ghost"
          onClick={() => handleNavigate('/organizers')}
          className="w-full justify-start text-sm font-medium"
        >
          For Organizers
        </Button>
      </div>
    </div>
  );
};

export default MobileMenu;
