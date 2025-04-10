
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
  );
};

export default AuthButtons;
