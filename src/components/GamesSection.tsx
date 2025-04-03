
import React from 'react';
import { Gamepad2, Code, Zap, Lightbulb, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const games = [
  {
    id: 1,
    title: "Code Challenges",
    description: "Solve coding problems and compete with other developers",
    icon: <Code className="h-8 w-8" />,
    level: "Advanced",
    category: "CS/IT",
    color: "bg-blue-600",
    players: 2340,
  },
  {
    id: 2,
    title: "Circuit Simulator",
    description: "Design and test electronic circuits virtually",
    icon: <Zap className="h-8 w-8" />,
    level: "Intermediate",
    category: "Electrical",
    color: "bg-amber-600",
    players: 1850,
  },
  {
    id: 3,
    title: "Business Strategy",
    description: "Test your business acumen with real-world cases",
    icon: <Lightbulb className="h-8 w-8" />,
    level: "Beginner",
    category: "Business",
    color: "bg-green-600",
    players: 2100,
  },
  {
    id: 4,
    title: "UI Design Battle",
    description: "Create beautiful interfaces and get feedback",
    icon: <Palette className="h-8 w-8" />,
    level: "All Levels",
    category: "Design",
    color: "bg-purple-600",
    players: 1560,
  },
];

const GamesSection = () => {
  return (
    <section id="games" className="py-16">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Gamepad2 className="h-6 w-6 text-eventify-purple" />
              <h2 className="text-3xl md:text-4xl font-bold">Games & Challenges</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Test your skills, compete with peers, and earn badges through interactive challenges
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <div key={game.id} className="glass-card p-6 event-card">
              <div className={`w-14 h-14 rounded-lg ${game.color} flex items-center justify-center text-white mb-4`}>
                {game.icon}
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{game.title}</h3>
                <Badge variant="outline" className="text-xs">
                  {game.level}
                </Badge>
              </div>
              
              <p className="text-muted-foreground mb-6 text-sm">
                {game.description}
              </p>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{game.players.toLocaleString()}</span> players
                </div>
                <Badge variant="secondary" className="text-xs">
                  {game.category}
                </Badge>
              </div>
              
              <Button className="w-full mt-4 bg-gradient-to-r from-eventify-purple to-eventify-blue text-white">
                Play Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
