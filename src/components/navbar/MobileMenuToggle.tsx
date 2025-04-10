
import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

type MobileMenuToggleProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
      {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </Button>
  );
};

export default MobileMenuToggle;
