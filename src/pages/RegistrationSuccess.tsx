
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, MapPin, Share2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import confetti from 'canvas-confetti';

const featuredEvents = [
  {
    id: 1,
    title: "National Hackathon 2023",
    organizer: "Tech University",
    date: "Dec 15-17, 2023",
    location: "Virtual Event",
    price: 499,
  },
  {
    id: 2,
    title: "Business Case Competition",
    organizer: "Business School",
    date: "Dec 20, 2023",
    location: "New Delhi",
    price: 299,
  },
  {
    id: 3,
    title: "Design Festival 2023",
    organizer: "Creative Arts College",
    date: "Jan 5-7, 2024",
    location: "Mumbai",
    price: 399,
  },
];

const RegistrationSuccess = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const event = featuredEvents.find(e => e.id === parseInt(eventId));
  
  useEffect(() => {
    if (!event) {
      navigate('/events');
      return;
    }
    
    // Trigger confetti animation on load
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min, max) => {
      return Math.random() * (max - min) + min;
    };
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        particleCount,
        spread: randomInRange(50, 70),
        origin: { y: 0.6 }
      });
      
    }, 250);
    
    return () => clearInterval(interval);
  }, [event, navigate]);
  
  if (!event) {
    return null;
  }
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Registration confirmation link copied to clipboard!",
    });
  };
  
  const handleDownloadTicket = () => {
    toast({
      title: "Ticket Downloaded",
      description: "Your event ticket has been downloaded successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Registration Successful!</h1>
            <p className="text-muted-foreground mb-8">
              Congratulations! You have successfully registered for {event.title}.
              We've sent the confirmation details to your email.
            </p>
            
            <div className="glass-card p-8 mb-8">
              <h2 className="text-xl font-bold mb-4">{event.title}</h2>
              <p className="text-muted-foreground mb-6">{event.organizer}</p>
              
              <div className="flex flex-col md:flex-row justify-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-eventify-purple" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-eventify-purple" />
                  <span>{event.location}</span>
                </div>
              </div>
              
              <div className="py-3 px-6 bg-secondary/50 rounded-md inline-block mb-6">
                Registration ID: #EV{eventId}2023{Math.floor(Math.random() * 1000)}
              </div>
              
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <Button 
                  className="flex items-center gap-2"
                  onClick={handleDownloadTicket}
                >
                  <Download className="h-4 w-4" />
                  Download Ticket
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="font-medium">What's Next?</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Check your email for detailed instructions</li>
                <li>Join the event's communication channel</li>
                <li>Prepare required materials or equipment</li>
                <li>Mark your calendar for the event date</li>
              </ul>
              
              <div className="pt-6">
                <Link to="/dashboard">
                  <Button>
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegistrationSuccess;
