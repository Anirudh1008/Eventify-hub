
import React from 'react';
import { Calendar, Code, Music, Trophy, Palette, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: 1,
    name: "Academic",
    icon: <Calendar className="h-6 w-6" />,
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 2,
    name: "Tech",
    icon: <Code className="h-6 w-6" />,
    color: "from-eventify-purple to-purple-600",
  },
  {
    id: 3,
    name: "Cultural",
    icon: <Music className="h-6 w-6" />,
    color: "from-pink-400 to-pink-600",
  },
  {
    id: 4,
    name: "Sports",
    icon: <Trophy className="h-6 w-6" />,
    color: "from-green-400 to-green-600",
  },
  {
    id: 5,
    name: "Arts",
    icon: <Palette className="h-6 w-6" />,
    color: "from-amber-400 to-amber-600",
  },
];

const EventCategories = () => {
  return (
    <section id="categories" className="py-16 bg-secondary/50">
      <div className="container px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Event Categories
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Explore events based on your interests and academic background
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="glass-card p-6 flex flex-col items-center text-center event-card"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-white mb-4`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <Button variant="link" className="mt-2 flex items-center gap-1">
                <span>Explore</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventCategories;
