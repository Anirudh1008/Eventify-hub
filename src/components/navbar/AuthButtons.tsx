
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { User } from 'lucide-react';

const AuthButtons = () => {
  const navigate = useNavigate();
  
  return (
    <div className="hidden md:flex items-center gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="rounded-full dark:bg-black/20 dark:hover:bg-black/40 backdrop-blur-sm transition-all duration-300 gap-1"
        onClick={() => navigate('/profile')}
      >
        <User className="h-4 w-4" />
        Profile
      </Button>
    </div>
  );
};

export default AuthButtons;
