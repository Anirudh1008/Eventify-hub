import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Cpu, Lightbulb, Palette, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Games = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handlePlayGame = (gameId: number) => {
    navigate(`/gameplay/${gameId}`);
    toast({
      title: "Loading game",
      description: "Preparing your game experience..."
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Interactive Games & Challenges</h1>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Put your skills to the test with our interactive games designed specifically for different engineering branches. Compete with peers, earn points, and climb the leaderboard!
          </p>
          
          <Tabs defaultValue="cse" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="cse">CS/IT</TabsTrigger>
              <TabsTrigger value="ece">ECE/EEE</TabsTrigger>
              <TabsTrigger value="mech">Mechanical</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cse" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cseGames.map((game) => (
                  <PlayableGameCard 
                    key={game.id}
                    game={game}
                    onPlay={() => handlePlayGame(game.id)}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="ece" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eceGames.map((game) => (
                  <PlayableGameCard 
                    key={game.id}
                    game={game}
                    onPlay={() => handlePlayGame(game.id)}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="mech" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mechGames.map((game) => (
                  <PlayableGameCard 
                    key={game.id}
                    game={game}
                    onPlay={() => handlePlayGame(game.id)}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="design" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {designGames.map((game) => (
                  <PlayableGameCard 
                    key={game.id}
                    game={game}
                    onPlay={() => handlePlayGame(game.id)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-6">Climb The Leaderboard</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Earn points for every game you play. Top performers are featured on our global leaderboard and can win prizes!
            </p>
            <Button 
              onClick={() => navigate('/leaderboard')} 
              className="bg-gradient-to-r from-eventify-purple to-eventify-blue text-white"
            >
              View Leaderboard
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
      
      <ChatbotWidget />
      <Footer />
    </div>
  );
};

interface PlayableGame {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  level: string;
  players: number;
  embedUrl: string;
  category: string;
}

interface PlayableGameCardProps {
  game: PlayableGame;
  onPlay: () => void;
}

const PlayableGameCard = ({ game, onPlay }: PlayableGameCardProps) => {
  return (
    <Card className="glass-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <CardHeader>
        <div className={`w-12 h-12 rounded-lg ${game.color} flex items-center justify-center text-white`}>
          {game.icon}
        </div>
        <div className="flex items-center justify-between mt-4">
          <CardTitle>{game.title}</CardTitle>
          <Badge variant="outline">{game.level}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground">{game.description}</CardDescription>
        <div className="mt-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{game.players.toLocaleString()}</span> players
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-gradient-to-r from-eventify-purple to-eventify-blue text-white"
          onClick={onPlay}
        >
          Play Now
        </Button>
      </CardFooter>
    </Card>
  );
};

const cseGames: PlayableGame[] = [
  {
    id: 1,
    title: "Coding Challenge",
    description: "Solve coding problems with increasing difficulty levels. Test your algorithms and data structures knowledge.",
    icon: <Code className="h-6 w-6" />,
    color: "bg-blue-600",
    level: "All Levels",
    players: 1250,
    embedUrl: "https://www.crazygames.com/embed/programming-games-online",
    category: "CS/IT"
  },
  {
    id: 2,
    title: "Debug Master",
    description: "Find and fix bugs in code snippets against the clock. Sharpen your debugging skills.",
    icon: <Cpu className="h-6 w-6" />,
    color: "bg-purple-600",
    level: "Intermediate",
    players: 980,
    embedUrl: "https://www.crazygames.com/embed/code-combat",
    category: "CS/IT"
  },
  {
    id: 3,
    title: "Algo Race",
    description: "Optimize algorithms to solve problems in the minimum time and space complexity.",
    icon: <Lightbulb className="h-6 w-6" />,
    color: "bg-amber-600",
    level: "Advanced",
    players: 645,
    embedUrl: "https://www.crazygames.com/embed/lightbot",
    category: "CS/IT"
  }
];

const eceGames: PlayableGame[] = [
  {
    id: 4,
    title: "Circuit Simulator",
    description: "Design and troubleshoot electronic circuits. Build complex systems and test their functionality.",
    icon: <Cpu className="h-6 w-6" />,
    color: "bg-red-600",
    level: "All Levels",
    players: 860,
    embedUrl: "https://www.crazygames.com/embed/the-electric-box",
    category: "ECE/EEE"
  },
  {
    id: 5,
    title: "Signal Processing",
    description: "Analyze and manipulate signals to achieve desired outputs. Apply filters and transformations.",
    icon: <Cpu className="h-6 w-6" />,
    color: "bg-green-600",
    level: "Intermediate",
    players: 540,
    embedUrl: "https://www.crazygames.com/embed/circuit-box",
    category: "ECE/EEE"
  },
  {
    id: 6,
    title: "Embedded Systems",
    description: "Program microcontrollers to solve real-world problems in a virtual environment.",
    icon: <Cpu className="h-6 w-6" />,
    color: "bg-blue-600",
    level: "Advanced",
    players: 420,
    embedUrl: "https://www.crazygames.com/embed/electronic-repair-simulator",
    category: "ECE/EEE"
  }
];

const mechGames: PlayableGame[] = [
  {
    id: 7,
    title: "CAD Challenge",
    description: "Design mechanical parts based on specifications. Compete for the most efficient designs.",
    icon: <Cpu className="h-6 w-6" />,
    color: "bg-orange-600",
    level: "All Levels",
    players: 510,
    embedUrl: "https://www.crazygames.com/embed/bridge-builder",
    category: "Mechanical"
  },
  {
    id: 8,
    title: "Structural Analysis",
    description: "Test structures under various loads and conditions. Optimize for strength and material usage.",
    icon: <Cpu className="h-6 w-6" />,
    color: "bg-teal-600",
    level: "Intermediate",
    players: 320,
    embedUrl: "https://www.crazygames.com/embed/bridge-constructor",
    category: "Mechanical"
  },
  {
    id: 9,
    title: "Thermodynamics Puzzle",
    description: "Solve complex thermodynamic system problems with efficiency constraints.",
    icon: <Cpu className="h-6 w-6" />,
    color: "bg-indigo-600",
    level: "Advanced",
    players: 280,
    embedUrl: "https://www.crazygames.com/embed/perfect-balance",
    category: "Mechanical"
  }
];

const designGames: PlayableGame[] = [
  {
    id: 10,
    title: "UI/UX Battle",
    description: "Redesign problematic interfaces against the clock. Get feedback from AI and peers.",
    icon: <Palette className="h-6 w-6" />,
    color: "bg-pink-600",
    level: "All Levels",
    players: 720,
    embedUrl: "https://www.crazygames.com/embed/draw-together",
    category: "Design"
  },
  {
    id: 11,
    title: "Design Sprint",
    description: "Complete a full design thinking process for a given problem in a limited time.",
    icon: <Palette className="h-6 w-6" />,
    color: "bg-violet-600",
    level: "Intermediate",
    players: 480,
    embedUrl: "https://www.crazygames.com/embed/gartic-io",
    category: "Design"
  },
  {
    id: 12,
    title: "Brand Builder",
    description: "Create a complete brand identity including logo, color scheme, and style guide.",
    icon: <Palette className="h-6 w-6" />,
    color: "bg-emerald-600",
    level: "Advanced",
    players: 350,
    embedUrl: "https://www.crazygames.com/embed/super-sketch",
    category: "Design"
  }
];

export default Games;
