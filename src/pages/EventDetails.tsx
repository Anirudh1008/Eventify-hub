
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, MapPin, Users, Clock, Award, User, Share2, Bookmark, 
  CheckCircle, ExternalLink, ChevronLeft 
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from '@/hooks/use-toast';
import ChatbotWidget from '@/components/ChatbotWidget';

const mockEvents = [
  {
    id: "1",
    title: "National Hackathon 2023",
    organizer: "Tech University",
    organizerLogo: "https://i.pravatar.cc/150?img=1",
    date: "Dec 15-17, 2023",
    time: "9:00 AM - 6:00 PM",
    location: "Virtual Event",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1740&auto=format&fit=crop",
    category: "Tech",
    description: "Join the biggest national hackathon of the year! Teams of up to 4 students will compete to build innovative solutions for real-world problems. This 48-hour coding marathon will test your skills, creativity, and teamwork.",
    prizes: [
      "1st Place - ₹50,000 + Internship Opportunities",
      "2nd Place - ₹30,000 + Mentorship",
      "3rd Place - ₹20,000",
      "Best UI/UX - ₹10,000"
    ],
    speakers: [
      {
        name: "Dr. Rajesh Kumar",
        role: "AI Research Lead, Google",
        avatar: "https://i.pravatar.cc/150?img=11"
      },
      {
        name: "Priya Sharma",
        role: "CTO, Tech Innovations",
        avatar: "https://i.pravatar.cc/150?img=5"
      },
      {
        name: "Alex Johnson",
        role: "Senior Developer, Microsoft",
        avatar: "https://i.pravatar.cc/150?img=3"
      }
    ],
    requirements: [
      "Students enrolled in any recognized university",
      "Team of 2-4 members",
      "Basic programming knowledge",
      "Laptop with internet connection"
    ],
    timeline: [
      {
        date: "Dec 15, 9:00 AM",
        event: "Opening Ceremony & Problem Statement"
      },
      {
        date: "Dec 15, 10:00 AM",
        event: "Coding Begins"
      },
      {
        date: "Dec 16, 2:00 PM",
        event: "Mentor Sessions"
      },
      {
        date: "Dec 17, 9:00 AM",
        event: "Submissions Close"
      },
      {
        date: "Dec 17, 2:00 PM",
        event: "Final Presentations"
      },
      {
        date: "Dec 17, 6:00 PM",
        event: "Awards Ceremony"
      }
    ],
    registeredCount: 320,
    maxRegistrations: 500,
    badges: ["Hackathon", "Coding", "Tech Skills"],
    featured: true,
    participants: 850,
  },
];

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const event = mockEvents.find(event => event.id === id);
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
            <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/events')}>Browse Events</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleRegister = () => {
    setIsRegistered(true);
    toast({
      title: "Registration Successful!",
      description: `You have registered for ${event.title}. Check your email for details.`,
    });
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Event Removed" : "Event Saved",
      description: isSaved ? "Event removed from your saved list." : "Event added to your saved list.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Event link copied to clipboard!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4">
          {/* Back button */}
          <Button 
            variant="ghost" 
            className="mb-4 flex items-center gap-1"
            onClick={() => navigate('/events')}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Events</span>
          </Button>
          
          {/* Hero section */}
          <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden mb-8">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge className="bg-white/90 text-foreground">
                {event.category}
              </Badge>
              {event.featured && (
                <Badge className="bg-eventify-purple/90 text-white">
                  Featured
                </Badge>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
              <div className="flex items-center gap-2 mb-6">
                <Avatar className="h-6 w-6">
                  <img src={event.organizerLogo} alt={event.organizer} />
                </Avatar>
                <span className="text-muted-foreground">{event.organizer}</span>
              </div>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-eventify-purple" />
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-muted-foreground">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-eventify-purple" />
                  <div>
                    <p className="text-sm font-medium">Time</p>
                    <p className="text-muted-foreground">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-eventify-purple" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-muted-foreground">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-eventify-purple" />
                  <div>
                    <p className="text-sm font-medium">Participants</p>
                    <p className="text-muted-foreground">{event.registeredCount}/{event.maxRegistrations}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                  <p className="text-muted-foreground">{event.description}</p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">Prizes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.prizes.map((prize, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-2 p-4 bg-secondary/50 rounded-lg border border-border"
                      >
                        <Award className="h-5 w-5 text-eventify-purple" />
                        <span>{prize}</span>
                      </div>
                    ))}
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">Speakers & Judges</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {event.speakers.map((speaker, index) => (
                      <div 
                        key={index} 
                        className="flex flex-col items-center text-center p-4 bg-secondary/50 rounded-lg border border-border"
                      >
                        <Avatar className="h-16 w-16 mb-2">
                          <img src={speaker.avatar} alt={speaker.name} />
                        </Avatar>
                        <h3 className="font-semibold">{speaker.name}</h3>
                        <p className="text-sm text-muted-foreground">{speaker.role}</p>
                      </div>
                    ))}
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">Event Timeline</h2>
                  <div className="space-y-4">
                    {event.timeline.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="relative">
                          <div className="h-4 w-4 rounded-full bg-eventify-purple"></div>
                          {index < event.timeline.length - 1 && (
                            <div className="absolute top-4 left-[7px] bottom-0 w-[2px] bg-eventify-purple"></div>
                          )}
                        </div>
                        <div className="pb-4">
                          <p className="font-medium">{item.date}</p>
                          <p className="text-muted-foreground">{item.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {event.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">FAQs</h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How do I register for this event?</AccordionTrigger>
                      <AccordionContent>
                        Click the "Register Now" button on this page and follow the steps. You'll receive a confirmation email with all details.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>What skills are required?</AccordionTrigger>
                      <AccordionContent>
                        Basic programming knowledge is required. Familiarity with web development, mobile app development, or data science would be beneficial.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Can I participate as an individual?</AccordionTrigger>
                      <AccordionContent>
                        Yes, but we encourage forming a team of 2-4 members for the best experience. We have a team formation forum on our platform.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Is there a registration fee?</AccordionTrigger>
                      <AccordionContent>
                        No, this event is completely free for students from recognized universities.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </section>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="glass-card p-6 mb-6">
                  <h3 className="text-xl font-bold mb-6">Registration</h3>
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span>Registration Status</span>
                      <Badge variant={isRegistered ? "default" : "outline"}>
                        {isRegistered ? "Registered" : "Open"}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Slots Remaining</span>
                      <span className="font-medium">{event.maxRegistrations - event.registeredCount}/{event.maxRegistrations}</span>
                    </div>
                    
                    <div className="w-full bg-secondary rounded-full h-2.5 mt-2">
                      <div 
                        className="bg-eventify-purple h-2.5 rounded-full" 
                        style={{ width: `${(event.registeredCount / event.maxRegistrations) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Earnable Badges</span>
                      <div className="flex -space-x-2">
                        {event.badges.map((badge, index) => (
                          <div 
                            key={index} 
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-eventify-purple to-eventify-blue flex items-center justify-center text-white text-xs border-2 border-background"
                            title={badge}
                          >
                            {badge.charAt(0)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    {isRegistered ? (
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white" disabled>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Registered
                      </Button>
                    ) : (
                      <Button 
                        className="w-full bg-gradient-to-r from-eventify-purple to-eventify-blue text-white"
                        onClick={handleRegister}
                      >
                        Register Now
                      </Button>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        className="flex items-center justify-center gap-1"
                        onClick={toggleSave}
                      >
                        <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                        <span>{isSaved ? "Saved" : "Save"}</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex items-center justify-center gap-1"
                        onClick={handleShare}
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-4">Organizer</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <img src={event.organizerLogo} alt={event.organizer} />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{event.organizer}</h4>
                      <p className="text-sm text-muted-foreground">Event Organizer</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-1"
                    onClick={() => window.open('#', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Visit Website</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
};

export default EventDetails;
