
import React from 'react';
import { Sparkles } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-1.5">
      <Sparkles className="h-5 w-5 text-eventify-purple" />
      <h1 className="text-xl font-bold text-eventify-purple">
        Eventify
      </h1>
    </div>
  );
};

export default Logo;
