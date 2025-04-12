
import React from 'react';
import { Calendar, MapPin, Users, ArrowRight, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const featuredEvents = [
  {
    id: 1,
    title: "National Hackathon 2023",
    organizer: "Tech University",
    date: "Dec 15-17, 2023",
    location: "Virtual Event",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1740&auto=format&fit=crop",
    category: "Tech",
    featured: true,
    participants: 850,
  },
  {
    id: 2,
    title: "Business Case Competition",
    organizer: "Business School",
    date: "Dec 20, 2023",
    location: "New Delhi",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1740&auto=format&fit=crop",
    category: "Academic",
    featured: false,
    participants: 320,
  },
  {
    id: 3,
    title: "Design Festival 2023",
    organizer: "Creative Arts College",
    date: "Jan 5-7, 2024",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1712&auto=format&fit=crop",
    category: "Arts",
    featured: false,
    participants: 500,
  },
];

const FeaturedEvents = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegisterNow = (eventId: number, eventTitle: string) => {
    toast({
      title: "Registration in Progress",
      description: `You're being registered for ${eventTitle}. Please check your email for confirmation.`,
    });
    
    // Simulate registration completion after 2 seconds
    setTimeout(() => {
      toast({
        title: "Registration Successful!",
        description: `You have successfully registered for ${eventTitle}.`,
      });
    }, 2000);
  };

  const handleLearnMore = (eventId: number) => {
    navigate(`/events/${eventId}`);
  };

  const handleViewAllEvents = () => {
    navigate('/events');
  };

  return (
    <section id="events" className="py-16">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Events & Hackathons</h2>
            <p className="text-muted-foreground">Discover top events recommended for you</p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0 flex items-center gap-1"
            onClick={handleViewAllEvents}
          >
            <span>View all events</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <div 
              key={event.id} 
              className="glass-card overflow-hidden event-card hover:shadow-lg transition-shadow duration-300"
            >
              <div 
                className="relative h-48 cursor-pointer" 
                onClick={() => handleLearnMore(event.id)}
              >
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                {event.featured && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-eventify-purple/90 text-white flex items-center gap-1">
                      <Star className="h-3 w-3 fill-white" />
                      <span>Featured</span>
                    </Badge>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-foreground">
                    {event.category}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 
                  className="text-xl font-bold mb-2 cursor-pointer hover:text-eventify-purple transition-colors"
                  onClick={() => handleLearnMore(event.id)}
                >
                  {event.title}
                </h3>
                <p className="text-muted-foreground mb-4">{event.organizer}</p>
                
                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{event.participants} Participants</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-eventify-purple to-eventify-blue text-white"
                    onClick={() => handleRegisterNow(event.id, event.title)}
                  >
                    Register Now
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleLearnMore(event.id)}
                  >
                    Learn more
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
