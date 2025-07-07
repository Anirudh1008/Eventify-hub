
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';
import { Button } from "@/components/ui/button";
import { X, Trophy, ArrowLeft, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GamePlay = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [game, setGame] = useState<any>(null);

  useEffect(() => {
    // Find the game in all game collections based on ID
    const allGames = [...cseGames, ...eceGames, ...mechGames, ...designGames];
    const foundGame = allGames.find(g => g.id.toString() === gameId);
    
    if (foundGame) {
      setGame(foundGame);
      // Simulate loading
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      toast({
        title: "Game not found",
        description: "The game you're looking for doesn't exist",
        variant: "destructive"
      });
      navigate('/games');
    }
  }, [gameId, navigate, toast]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: game?.title || 'Check out this game!',
        text: `Play ${game?.title} on Eventify!`,
        url: window.location.href,
      }).then(() => {
        toast({
          title: "Shared successfully!",
          description: "Thanks for sharing this game",
        });
      }).catch(() => {
        toast({
          title: "Share cancelled",
          description: "No problem, maybe next time!",
        });
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied to clipboard!",
        description: "You can now share it with your friends",
      });
    }
  };

  const handleGoBack = () => {
    navigate('/games');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-center">
            <div className="text-2xl font-bold mb-4">Loading Game...</div>
            <div className="text-muted-foreground">Please wait while we set up your game experience</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleGoBack}
                className="h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold">{game?.title}</h1>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShare}
                className="flex items-center gap-1"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button 
                size="sm" 
                className="bg-eventify-purple hover:bg-eventify-dark-purple text-white"
              >
                <Trophy className="h-4 w-4 mr-1" />
                Leaderboard
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-muted-foreground mb-4">{game?.description}</p>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{game?.players.toLocaleString()}</span> players have tried this game
            </div>
          </div>
          
          <div className="bg-background rounded-lg border shadow-sm overflow-hidden mb-8">
            <div className="aspect-video w-full">
              <iframe 
                src={game?.embedUrl} 
                className="w-full h-full" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">How to Play</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use the game controls to navigate and interact</li>
                <li>Complete challenges to earn points and badges</li>
                <li>Your progress is automatically saved</li>
                <li>Compete with others to climb the leaderboard</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4">Tips & Tricks</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Start with the tutorial if you're new to this game</li>
                <li>Look for hidden bonuses and shortcuts</li>
                <li>Practice regularly to improve your skills</li>
                <li>Join our Discord community for more advanced strategies</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
};

// Updated game data with better working embed URLs
const cseGames = [
  {
    id: 1,
    title: "Coding Challenge",
    description: "Solve coding problems with increasing difficulty levels. Test your algorithms and data structures knowledge.",
    embedUrl: "https://scratch.mit.edu/projects/embed/104/",
    players: 1250,
  },
  {
    id: 2,
    title: "Debug Master",
    description: "Find and fix bugs in code snippets against the clock. Sharpen your debugging skills.",
    embedUrl: "https://www.khanacademy.org/computer-programming/new/pjs",
    players: 980,
  },
  {
    id: 3,
    title: "Algo Race",
    description: "Optimize algorithms to solve problems in the minimum time and space complexity.",
    embedUrl: "https://blockly-games.appspot.com/maze",
    players: 645,
  }
];

const eceGames = [
  {
    id: 4,
    title: "Circuit Simulator",
    description: "Design and troubleshoot electronic circuits. Build complex systems and test their functionality.",
    embedUrl: "https://www.falstad.com/circuit/",
    players: 860,
  },
  {
    id: 5,
    title: "Signal Processing",
    description: "Analyze and manipulate signals to achieve desired outputs. Apply filters and transformations.",
    embedUrl: "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html",
    players: 540,
  },
  {
    id: 6,
    title: "Embedded Systems",
    description: "Program microcontrollers to solve real-world problems in a virtual environment.",
    embedUrl: "https://www.tinkercad.com/circuits",
    players: 420,
  }
];

const mechGames = [
  {
    id: 7,
    title: "CAD Challenge",
    description: "Design mechanical parts based on specifications. Compete for the most efficient designs.",
    embedUrl: "https://www.onshape.com/en/",
    players: 510,
  },
  {
    id: 8,
    title: "Structural Analysis",
    description: "Test structures under various loads and conditions. Optimize for strength and material usage.",
    embedUrl: "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_en.html",
    players: 320,
  },
  {
    id: 9,
    title: "Thermodynamics Puzzle",
    description: "Solve complex thermodynamic system problems with efficiency constraints.",
    embedUrl: "https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes_en.html",
    players: 280,
  }
];

const designGames = [
  {
    id: 10,
    title: "UI/UX Battle",
    description: "Redesign problematic interfaces against the clock. Get feedback from AI and peers.",
    embedUrl: "https://www.figma.com/figjam/",
    players: 720,
  },
  {
    id: 11,
    title: "Design Sprint",
    description: "Complete a full design thinking process for a given problem in a limited time.",
    embedUrl: "https://www.canva.com/design/",
    players: 480,
  },
  {
    id: 12,
    title: "Brand Builder",
    description: "Create a complete brand identity including logo, color scheme, and style guide.",
    embedUrl: "https://www.adobe.com/express/",
    players: 350,
  }
];

export default GamePlay;
