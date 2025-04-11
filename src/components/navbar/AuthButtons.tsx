
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AuthButtons = () => {
  const navigate = useNavigate();
  
  return (
    <div className="hidden md:flex items-center gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="rounded-full dark:bg-black/20 dark:hover:bg-black/40 backdrop-blur-sm transition-all duration-300"
        onClick={() => navigate('/login')}
      >
        Account
      </Button>
    </div>
  );
};

export default AuthButtons;
