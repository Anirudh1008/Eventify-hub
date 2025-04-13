
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';
import { 
  Code, 
  Palette, 
  Camera, 
  Lightbulb, 
  Trophy, 
  Clock, 
  Star, 
  Rocket, 
  Calendar,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import RegisterEventModal from '@/components/RegisterEventModal';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

// Define challenge types
interface Challenge {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  shortDescription: string;
  category: string;
  deadline: string;
  participants: number;
  status: 'New' | 'Trending' | 'Closing Soon' | 'Popular' | '';
  rules: string[];
  prizes: string;
  price: number; // Adding price for registration
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: "UI Design Contest",
    shortDescription: "Create stunning user interfaces for mobile apps",
    description: "Design beautiful and functional UI for our new student portal app. Your designs should focus on usability, accessibility, and modern aesthetics. Winners will get their designs implemented in the actual app.",
    icon: <Palette className="h-8 w-8" />,
    category: "Design",
    deadline: "June 15, 2025",
    participants: 178,
    status: 'New',
    rules: [
      "Submit designs in Figma or Adobe XD format",
      "Design must include at least 5 screens",
      "Include dark and light mode versions",
      "Design must be responsive and mobile-friendly"
    ],
    prizes: "₹25,000 cash prize + Internship opportunity",
    price: 499
  },
  {
    id: 2,
    title: "Coding Sprint",
    shortDescription: "48-hour hackathon to build innovative solutions",
    description: "Join our coding sprint to build solutions addressing campus problems. Work in teams of 2-3 to develop a working prototype in just 48 hours. Top projects will be showcased at the annual tech fest.",
    icon: <Code className="h-8 w-8" />,
    category: "Development",
    deadline: "May 20, 2025",
    participants: 342,
    status: 'Trending',
    rules: [
      "Teams must have 2-3 members",
      "All code must be written during the 48-hour period",
      "Use of open-source libraries is allowed",
      "Final submission must include source code and demo video"
    ],
    prizes: "₹50,000 for first place, ₹25,000 for second place, ₹10,000 for third place",
    price: 699
  },
  {
    id: 3,
    title: "Campus Photography",
    shortDescription: "Capture the essence of campus life through your lens",
    description: "Show us your college campus through your creative perspective. Submit your best photographs that capture the spirit, architecture, or daily life of your campus. Photos will be judged on creativity, composition, and storytelling.",
    icon: <Camera className="h-8 w-8" />,
    category: "Creative",
    deadline: "July 10, 2025",
    participants: 256,
    status: 'Popular',
    rules: [
      "Photos must be taken on your college campus",
      "Maximum 3 entries per participant",
      "Minimum resolution of 3000x2000 pixels",
      "Minor editing allowed, but no composite images"
    ],
    prizes: "Latest DSLR camera + Feature in college magazine",
    price: 299
  },
  {
    id: 4,
    title: "Business Case Study",
    shortDescription: "Analyze and solve real-world business problems",
    description: "Test your business acumen by solving real-world business cases provided by our corporate partners. You'll analyze the situation, identify key issues, and propose strategic solutions that demonstrate your critical thinking and problem-solving skills.",
    icon: <Lightbulb className="h-8 w-8" />,
    category: "Business",
    deadline: "May 5, 2025",
    participants: 124,
    status: 'Closing Soon',
    rules: [
      "Individual participation only",
      "Solutions must be under 2000 words",
      "Include SWOT analysis and financial projections",
      "Cite all references in APA format"
    ],
    prizes: "Paid internship opportunity with corporate sponsor + ₹15,000 cash prize",
    price: 399
  },
  {
    id: 5,
    title: "Meme Challenge",
    shortDescription: "Create the funniest college-related memes",
    description: "Show off your humor and creativity by creating original memes related to college life, academics, or student culture. Submissions will be judged on originality, relatability, and humor.",
    icon: <Rocket className="h-8 w-8" />,
    category: "Creative",
    deadline: "June 1, 2025",
    participants: 415,
    status: 'Trending',
    rules: [
      "Memes must be original content",
      "No offensive or inappropriate content",
      "Maximum 5 submissions per person",
      "Must relate to college or student life"
    ],
    prizes: "Latest iPad + 1-year premium subscription to design tools",
    price: 199
  },
  {
    id: 6,
    title: "Debate Tournament",
    shortDescription: "Showcase your public speaking and persuasion skills",
    description: "Participate in our annual debate tournament covering topics from technology ethics to global politics. Debaters will be judged on their research, reasoning, rebuttal skills, and presentation style.",
    icon: <Trophy className="h-8 w-8" />,
    category: "Speaking",
    deadline: "July 25, 2025",
    participants: 86,
    status: 'New',
    rules: [
      "Teams of 2 members each",
      "Oxford-style debate format",
      "Topics will be announced 1 week before",
      "7 minutes for opening statements, 3 minutes for rebuttals"
    ],
    prizes: "₹20,000 cash prize + Trophy + Certificate",
    price: 349
  }
];

const statusColors = {
  'New': 'bg-green-500',
  'Trending': 'bg-pink-500',
  'Closing Soon': 'bg-orange-500',
  'Popular': 'bg-blue-500',
  '': ''
};

const Challenges = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registrationInProgress, setRegistrationInProgress] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Check if the user is logged in on component mount
  useEffect(() => {
    const checkUserAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        console.log("User not logged in");
      } else {
        console.log("User logged in:", data.session.user);
      }
    };
    
    checkUserAuth();
  }, []);
  
  const openChallengeDetails = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
  };
  
  const closeChallengeDetails = () => {
    setSelectedChallenge(null);
  };

  const handleRegisterNow = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to register for this challenge",
        variant: "destructive"
      });
      // Store the challenge ID in sessionStorage to redirect back after login
      if (selectedChallenge) {
        sessionStorage.setItem('pendingChallengeRegistration', selectedChallenge.id.toString());
      }
      navigate('/login');
      return;
    }

    if (selectedChallenge) {
      setShowRegisterModal(true);
      closeChallengeDetails();
    }
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const handleProceedToPayment = (challengeId: number) => {
    setRegistrationInProgress(true);
    toast({
      title: "Processing Registration",
      description: "Please wait while we prepare your registration..."
    });
    
    // Simulate processing time
    setTimeout(() => {
      setShowRegisterModal(false);
      setRegistrationInProgress(false);
      navigate(`/payment/${challengeId}`);
    }, 1000);
  };
  
  // Check if there's a pending registration after login
  useEffect(() => {
    if (user) {
      const pendingChallengeId = sessionStorage.getItem('pendingChallengeRegistration');
      if (pendingChallengeId) {
        // Find the challenge
        const challenge = challenges.find(c => c.id === parseInt(pendingChallengeId));
        if (challenge) {
          sessionStorage.removeItem('pendingChallengeRegistration');
          setSelectedChallenge(challenge);
          // Slight delay to ensure UI is ready
          setTimeout(() => {
            handleRegisterNow();
          }, 500);
        }
      }
    }
  }, [user]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4">
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Student Challenges</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Test your skills, compete with peers, and win exciting prizes through these interactive challenges
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <div 
                key={challenge.id} 
                className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-100 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                onClick={() => openChallengeDetails(challenge)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-14 w-14 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-eventify-purple">
                      {challenge.icon}
                    </div>
                    
                    {challenge.status && (
                      <Badge className={`${statusColors[challenge.status]} text-white`}>
                        {challenge.status}
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{challenge.shortDescription}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4" />
                    <span>Deadline: {challenge.deadline}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs">
                      {challenge.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {challenge.participants} participants
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Challenge Details Modal */}
      <Dialog open={selectedChallenge !== null} onOpenChange={closeChallengeDetails}>
        {selectedChallenge && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-eventify-purple">
                  {selectedChallenge.icon}
                </div>
                <DialogTitle className="text-2xl">{selectedChallenge.title}</DialogTitle>
              </div>
              <DialogDescription>
                {selectedChallenge.category} Challenge
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <p className="text-foreground">{selectedChallenge.description}</p>
              
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Deadline: <span className="font-semibold">{selectedChallenge.deadline}</span></span>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-yellow-500" /> Rules
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {selectedChallenge.rules.map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-1.5">
                  <Trophy className="h-4 w-4 text-yellow-500" /> Prizes
                </h4>
                <p className="text-sm">{selectedChallenge.prizes}</p>
              </div>
              
              <div className="flex justify-between items-center pt-4">
                <div className="text-sm text-muted-foreground">
                  {selectedChallenge.participants} students participating
                </div>
                <Button 
                  className="bg-eventify-purple hover:bg-eventify-dark-purple text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRegisterNow();
                  }}
                >
                  Register Now
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Registration Modal */}
      {showRegisterModal && selectedChallenge && (
        <RegisterEventModal 
          event={{
            id: selectedChallenge.id,
            title: selectedChallenge.title,
            description: selectedChallenge.description,
            organizer: `${selectedChallenge.category} Department`,
            date: `Deadline: ${selectedChallenge.deadline}`,
            location: "Online",
            participants: selectedChallenge.participants,
            price: selectedChallenge.price,
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1740&auto=format&fit=crop"
          }}
          onClose={handleCloseRegisterModal}
          onProceedToPayment={handleProceedToPayment}
          isProcessing={registrationInProgress}
        />
      )}
      
      <ChatbotWidget />
      <Footer />
    </div>
  );
};

export default Challenges;
