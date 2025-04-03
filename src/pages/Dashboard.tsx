
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Star, Trophy, Badge as BadgeIcon, Bell, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import ChatbotWidget from '@/components/ChatbotWidget';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('recommended');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Welcome, John!</h1>
                <p className="text-muted-foreground mt-1">Your personalized dashboard</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Settings className="h-5 w-5" />
                </Button>
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <img src="https://i.pravatar.cc/100" alt="User" />
                </Avatar>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">450 XP</span>
                </div>
                <div className="flex items-center gap-1">
                  <BadgeIcon className="h-4 w-4 text-eventify-purple" />
                  <span className="text-sm font-medium">5 Badges</span>
                </div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="glass-card mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Stats Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Events Attended</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Upcoming Events</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Challenges Completed</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Leaderboard Rank</span>
                      <span className="font-medium">#42</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-eventify-purple" />
                    Recent Badges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { name: "Hackathon Pro", icon: "🏆" },
                      { name: "Tech Explorer", icon: "🚀" },
                      { name: "Team Player", icon: "👥" },
                    ].map((badge, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-eventify-purple to-eventify-blue flex items-center justify-center text-white text-lg mb-2">
                          {badge.icon}
                        </div>
                        <span className="text-xs text-center">{badge.name}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="link" className="w-full mt-4" onClick={() => navigate('/badges')}>
                    View All Badges
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="glass-card mb-6">
                <CardHeader>
                  <CardTitle>Your Events</CardTitle>
                  <CardDescription>All your events in one place</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="recommended">Recommended</TabsTrigger>
                      <TabsTrigger value="registered">Registered</TabsTrigger>
                      <TabsTrigger value="saved">Saved</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="recommended" className="space-y-4">
                      {recommendedEvents.map((event) => (
                        <EventListItem 
                          key={event.id} 
                          event={event} 
                          onClick={() => navigate(`/events/${event.id}`)} 
                        />
                      ))}
                      <Button className="w-full" variant="outline" onClick={() => navigate('/events')}>
                        Browse More Events
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="registered" className="space-y-4">
                      {registeredEvents.map((event) => (
                        <EventListItem 
                          key={event.id} 
                          event={event} 
                          onClick={() => navigate(`/events/${event.id}`)} 
                        />
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="saved" className="space-y-4">
                      {savedEvents.map((event) => (
                        <EventListItem 
                          key={event.id} 
                          event={event} 
                          onClick={() => navigate(`/events/${event.id}`)} 
                        />
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Challenges For You</CardTitle>
                  <CardDescription>Test your skills and earn badges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {challenges.map((challenge) => (
                      <div 
                        key={challenge.id} 
                        className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-secondary/50 cursor-pointer transition-colors"
                        onClick={() => navigate(`/challenges/${challenge.id}`)}
                      >
                        <div className={`w-12 h-12 rounded-lg ${challenge.color} flex items-center justify-center text-white`}>
                          {challenge.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{challenge.title}</h4>
                          <p className="text-sm text-muted-foreground">{challenge.description}</p>
                        </div>
                        <Badge variant="outline">{challenge.difficulty}</Badge>
                      </div>
                    ))}
                    <Button className="w-full" variant="outline" onClick={() => navigate('/challenges')}>
                      View All Challenges
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
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
}

interface EventListItemProps {
  event: Event;
  onClick: () => void;
}

const EventListItem: React.FC<EventListItemProps> = ({ event, onClick }) => {
  return (
    <div 
      className="flex gap-4 p-4 border border-border rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="w-20 h-20 rounded-md overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold">{event.title}</h3>
          <Badge>{event.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{event.organizer}</p>
        <div className="flex gap-4 mt-2">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs">{event.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs">{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock data
const recommendedEvents = [
  {
    id: 1,
    title: "National Hackathon 2023",
    organizer: "Tech University",
    date: "Dec 15-17, 2023",
    location: "Virtual Event",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1740&auto=format&fit=crop",
    category: "Tech",
  },
  {
    id: 2,
    title: "AI Summit 2024",
    organizer: "IIT Delhi",
    date: "Feb 10-12, 2024",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=1740&auto=format&fit=crop",
    category: "Tech",
  },
  {
    id: 3,
    title: "Design Festival 2023",
    organizer: "Creative Arts College",
    date: "Jan 5-7, 2024",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1712&auto=format&fit=crop",
    category: "Arts",
  },
];

const registeredEvents = [
  {
    id: 4,
    title: "Cultural Fest Extravaganza",
    organizer: "Delhi University",
    date: "Mar 1-3, 2024",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1740&auto=format&fit=crop",
    category: "Cultural",
  },
  {
    id: 5,
    title: "Business Case Competition",
    organizer: "Business School",
    date: "Dec 20, 2023",
    location: "New Delhi",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1740&auto=format&fit=crop",
    category: "Academic",
  },
];

const savedEvents = [
  {
    id: 6,
    title: "Robotics Workshop",
    organizer: "Engineering College",
    date: "Apr 15, 2024",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1740&auto=format&fit=crop",
    category: "Tech",
  },
];

const challenges = [
  {
    id: 1,
    title: "Coding Challenge",
    description: "Solve complex algorithms in Python",
    difficulty: "Intermediate",
    icon: "🖥️",
    color: "bg-eventify-purple",
  },
  {
    id: 2,
    title: "UI Design Battle",
    description: "Create a beautiful interface in 1 hour",
    difficulty: "Beginner",
    icon: "🎨",
    color: "bg-pink-500",
  },
  {
    id: 3,
    title: "Circuit Simulator",
    description: "Design a working electronic circuit",
    difficulty: "Advanced",
    icon: "⚡",
    color: "bg-amber-500",
  },
];

export default Dashboard;
