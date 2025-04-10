
import React, { useState } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { 
  Logo, 
  NavLinks, 
  SearchBar, 
  DarkModeToggle, 
  AuthButtons, 
  MobileMenu, 
  MobileMenuToggle 
} from '@/components/navbar';

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

          {!isMobile && <NavLinks handleNavigate={handleNavigate} />}
        </div>

        <div className="flex items-center gap-4">
          {!isMobile && <SearchBar />}

          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          
          <AuthButtons />

          {isMobile && (
            <MobileMenuToggle isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && <MobileMenu isMenuOpen={isMenuOpen} handleNavigate={handleNavigate} />}
    </header>
  );
};

export default Navbar;
