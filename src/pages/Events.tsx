
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import RegisterEventModal from "@/components/RegisterEventModal";
import {
  Calendar,
  Search,
  MapPin,
  Users,
  Filter,
  ChevronDown,
  Star,
  Clock
} from "lucide-react";

// Mock data for events
const allEvents = [
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
    price: 499,
    description: "Join the biggest national hackathon of the year! Teams of up to 4 students will compete to build innovative solutions for real-world problems. This 48-hour coding marathon will test your skills, creativity, and teamwork.",
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
    price: 299,
    description: "Tackle real-world business challenges from top companies. Present your solutions to industry experts and win exciting prizes. Great opportunity to network with professionals and showcase your analytical skills.",
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
    price: 399,
    description: "A three-day celebration of design in all its forms - UI/UX, graphic design, industrial design, and more. Attend workshops by design leaders, showcase your portfolio, and connect with creative minds from across the country.",
  },
  {
    id: 4,
    title: "Science Symposium",
    organizer: "National Science Academy",
    date: "Jan 12-14, 2024",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1740&auto=format&fit=crop",
    category: "Academic",
    featured: false,
    participants: 420,
    price: 249,
    description: "An annual gathering of science enthusiasts from various disciplines. Present your research, attend keynote speeches, and participate in interactive sessions to deepen your understanding of cutting-edge scientific developments.",
  },
  {
    id: 5,
    title: "Cultural Fest 2024",
    organizer: "University of Arts",
    date: "Feb 2-5, 2024",
    location: "Hyderabad",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1740&auto=format&fit=crop",
    category: "Cultural",
    featured: false,
    participants: 1200,
    price: 199,
    description: "Celebrate diversity through music, dance, art, and food at the largest cultural festival in India. Showcase your talents, participate in competitions, and immerse yourself in various cultural experiences.",
  },
  {
    id: 6,
    title: "Robotics Workshop",
    organizer: "Engineering Institute",
    date: "Feb 10, 2024",
    location: "Chennai",
    image: "https://images.unsplash.com/photo-1562408590-e32931084e23?q=80&w=1740&auto=format&fit=crop",
    category: "Tech",
    featured: false,
    participants: 150,
    price: 599,
    description: "Hands-on workshop on building and programming robots. Learn about various sensors, actuators, and control systems. Perfect for engineering students looking to enhance their practical skills.",
  },
];

const categories = ["All", "Tech", "Academic", "Cultural", "Arts", "Sports"];
const locations = ["All", "Virtual Event", "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai"];

const Events = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [events, setEvents] = useState(allEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Filter events based on search term, category, and location
  const filterEvents = () => {
    let filtered = allEvents;
    
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }
    
    if (selectedLocation !== "All") {
      filtered = filtered.filter(event => event.location === selectedLocation);
    }
    
    setEvents(filtered);
  };

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterEvents();
  };

  // Handle register now button
  const handleRegisterNow = (event, e) => {
    e.stopPropagation(); // Prevent event bubbling
    setSelectedEvent(event);
    setShowRegisterModal(true);
  };

  // Handle learn more button
  const handleLearnMore = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  // Close register modal
  const closeRegisterModal = () => {
    setShowRegisterModal(false);
  };

  // Handle proceed to payment
  const handleProceedToPayment = (eventId) => {
    navigate(`/payment/${eventId}`);
    setShowRegisterModal(false);
  };

  return (
    <>
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Explore Events</h1>
            <p className="text-muted-foreground">
              Discover hackathons, workshops, competitions, and more from colleges across India
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="glass-card p-6 mb-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search events, hackathons, workshops..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center">
                    <span className="text-sm mr-2 whitespace-nowrap">Category:</span>
                    <select 
                      className="rounded-md px-3 py-2 bg-background border border-input text-sm"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm mr-2 whitespace-nowrap">Location:</span>
                    <select 
                      className="rounded-md px-3 py-2 bg-background border border-input text-sm"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <Button type="submit">
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-secondary/50">
                  All Events
                </Badge>
                <Badge variant="outline" className="bg-secondary/50">
                  This Week
                </Badge>
                <Badge variant="outline" className="bg-secondary/50">
                  Free Events
                </Badge>
                <Badge variant="outline" className="bg-secondary/50">
                  Virtual Events
                </Badge>
              </div>
            </form>
          </div>
          
          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
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
                      onClick={(e) => handleRegisterNow(event, e)}
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
          
          {/* No Results */}
          {events.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground">Try adjusting your search filters</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedLocation("All");
                  setEvents(allEvents);
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <ChatbotWidget />

      {/* Registration Modal */}
      {showRegisterModal && selectedEvent && (
        <RegisterEventModal 
          event={selectedEvent} 
          onClose={closeRegisterModal}
          onProceedToPayment={handleProceedToPayment}
        />
      )}
    </>
  );
};

export default Events;
