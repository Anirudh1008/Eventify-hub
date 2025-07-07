
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Calendar, Globe, Phone, Mail, Users, Star, ExternalLink } from 'lucide-react';
import { collegesAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { Spinner } from '@/components/ui/spinner';

interface College {
  id: number;
  name: string;
  short_name: string;
  location: string;
  state: string;
  website?: string;
  email?: string;
  phone?: string;
  description?: string;
  established_year?: number;
  college_type?: string;
  affiliation?: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  organizer: string;
  date: string;
  location: string;
  price: number;
  image?: string;
  category: string;
  participants: number;
}

const CollegeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [college, setCollege] = useState<College | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCollegeData(parseInt(id));
    }
  }, [id]);

  const fetchCollegeData = async (collegeId: number) => {
    try {
      const [collegeData, eventsData] = await Promise.all([
        collegesAPI.getById(collegeId),
        collegesAPI.getEvents(collegeId)
      ]);
      
      setCollege(collegeData);
      setEvents(eventsData);
    } catch (error: any) {
      toast({
        title: "Error loading college data",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <Spinner size="lg" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">College Not Found</h1>
            <Button onClick={() => navigate('/colleges')}>Back to Colleges</Button>
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
          {/* College Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{college.college_type || 'University'}</Badge>
                  {college.established_year && (
                    <Badge variant="outline">Est. {college.established_year}</Badge>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{college.name}</h1>
                <p className="text-lg text-muted-foreground mb-4">{college.short_name}</p>
                
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{college.location}, {college.state}</span>
                </div>

                <p className="text-muted-foreground mb-6">
                  {college.description || 'Leading educational institution providing quality education and research opportunities.'}
                </p>

                <div className="flex flex-wrap gap-4 text-sm">
                  {college.affiliation && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{college.affiliation}</span>
                    </div>
                  )}
                  {college.email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{college.email}</span>
                    </div>
                  )}
                  {college.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{college.phone}</span>
                    </div>
                  )}
                  {college.website && (
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      <a 
                        href={college.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center"
                      >
                        Visit Website
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button onClick={() => navigate('/colleges')}>
                  Back to Colleges
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="events">Events ({events.length})</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            
            <TabsContent value="events" className="mt-6">
              {events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <Card key={event.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="secondary">{event.category}</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            {event.participants}
                          </div>
                        </div>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.location}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {event.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold">
                            ₹{event.price.toLocaleString()}
                          </span>
                          <Button onClick={() => navigate(`/events/${event.id}`)}>
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No events available from this college at the moment.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {college.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Institution Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Full Name:</span> {college.name}
                      </div>
                      <div>
                        <span className="font-medium">Short Name:</span> {college.short_name}
                      </div>
                      <div>
                        <span className="font-medium">Type:</span> {college.college_type || 'University'}
                      </div>
                      <div>
                        <span className="font-medium">Established:</span> {college.established_year || 'N/A'}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {college.location}, {college.state}
                      </div>
                      <div>
                        <span className="font-medium">Affiliation:</span> {college.affiliation || 'N/A'}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Contact Information</h3>
                    <div className="space-y-2 text-sm">
                      {college.email && (
                        <div>
                          <span className="font-medium">Email:</span> {college.email}
                        </div>
                      )}
                      {college.phone && (
                        <div>
                          <span className="font-medium">Phone:</span> {college.phone}
                        </div>
                      )}
                      {college.website && (
                        <div>
                          <span className="font-medium">Website:</span> 
                          <a 
                            href={college.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline ml-1"
                          >
                            {college.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-sm text-muted-foreground">
                      {college.description || 'Leading educational institution providing quality education and research opportunities to students from all backgrounds.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CollegeDetails;
