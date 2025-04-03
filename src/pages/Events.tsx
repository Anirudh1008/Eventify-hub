
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, Filter, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ChatbotWidget from '@/components/ChatbotWidget';

const mockEvents = [
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
  {
    id: 4,
    title: "AI Summit 2024",
    organizer: "IIT Delhi",
    date: "Feb 10-12, 2024",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=1740&auto=format&fit=crop",
    category: "Tech",
    featured: true,
    participants: 1200,
  },
  {
    id: 5,
    title: "Cultural Fest Extravaganza",
    organizer: "Delhi University",
    date: "Mar 1-3, 2024",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1740&auto=format&fit=crop",
    category: "Cultural",
    featured: true,
    participants: 2000,
  },
  {
    id: 6,
    title: "Robotics Workshop",
    organizer: "Engineering College",
    date: "Apr 15, 2024",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1740&auto=format&fit=crop",
    category: "Tech",
    featured: false,
    participants: 150,
  },
];

const Events = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || event.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <section className="container px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Events</h1>
            <p className="text-muted-foreground">Find and join events that match your interests</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search"
                placeholder="Search events by name or organizer..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>
          
          <Tabs defaultValue="all" onValueChange={setSelectedCategory} className="mb-8">
            <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Tech">Tech</TabsTrigger>
              <TabsTrigger value="Academic">Academic</TabsTrigger>
              <TabsTrigger value="Cultural">Cultural</TabsTrigger>
              <TabsTrigger value="Sports">Sports</TabsTrigger>
              <TabsTrigger value="Arts">Arts</TabsTrigger>
              <TabsTrigger value="Business">Business</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map(event => (
                  <EventCard key={event.id} event={event} onClick={() => navigate(`/events/${event.id}`)} />
                ))}
              </div>
            </TabsContent>
            
            {["Tech", "Academic", "Cultural", "Sports", "Arts", "Business"].map(category => (
              <TabsContent key={category} value={category} className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} onClick={() => navigate(`/events/${event.id}`)} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
};

interface Event {
  id: number;
  title: string;
  organizer: string;
  date: string;
  location: string;
  image: string;
  category: string;
  featured: boolean;
  participants: number;
}

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  return (
    <Card className="glass-card overflow-hidden event-card cursor-pointer transition-transform hover:scale-[1.02]" onClick={onClick}>
      <div className="relative h-48">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-white/90 text-foreground">
            {event.category}
          </Badge>
        </div>
        {event.featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-eventify-purple/90 text-white">
              Featured
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
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
          <Button className="bg-gradient-to-r from-eventify-purple to-eventify-blue text-white">
            Register Now
          </Button>
          <Button variant="ghost" size="sm">
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Events;
