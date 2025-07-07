
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Calendar, Globe, Phone, Mail, Search } from 'lucide-react';
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

const Colleges = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const data = await collegesAPI.getAll();
      setColleges(data);
    } catch (error: any) {
      toast({
        title: "Error loading colleges",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.short_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = !selectedState || college.state === selectedState;
    const matchesType = !selectedType || college.college_type === selectedType;
    
    return matchesSearch && matchesState && matchesType;
  });

  const states = [...new Set(colleges.map(college => college.state))].sort();
  const types = [...new Set(colleges.map(college => college.college_type).filter(Boolean))].sort();

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Colleges & Universities</h1>
            <p className="text-muted-foreground text-lg">
              Discover events and opportunities from top educational institutions across India
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search colleges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All States</SelectItem>
                  {states.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="College Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Colleges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColleges.map((college) => (
              <Card key={college.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="mb-2">
                      {college.college_type || 'University'}
                    </Badge>
                    {college.established_year && (
                      <Badge variant="outline" className="mb-2">
                        Est. {college.established_year}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{college.name}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {college.location}, {college.state}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {college.description || 'Leading educational institution providing quality education and research opportunities.'}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    {college.affiliation && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{college.affiliation}</span>
                      </div>
                    )}
                    {college.website && (
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a 
                          href={college.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                    {college.email && (
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="truncate">{college.email}</span>
                      </div>
                    )}
                    {college.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{college.phone}</span>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full mt-4" 
                    onClick={() => navigate(`/colleges/${college.id}`)}
                  >
                    View Events
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredColleges.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No colleges found matching your criteria.
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              Showing {filteredColleges.length} of {colleges.length} colleges
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Colleges;
