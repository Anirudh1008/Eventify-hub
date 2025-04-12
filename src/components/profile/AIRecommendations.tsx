
import React, { useState, useEffect } from 'react';
import { Sparkles, Plus, X, Users, Calendar, CheckCircle, Flame, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface AIRecommendationsProps {
  skills: string[];
  interests?: string[];
  experienceLevel?: string;
  resumeUploaded?: boolean;
  showAIRecommendations?: boolean;
  setShowAIRecommendations?: (show: boolean) => void;
}

interface Event {
  id: string;
  title: string;
  description: string;
  tags: string[];
  relevanceScore: number;
  hasTeamMatch?: boolean;
  isPopular?: boolean;
}

interface TeammateSuggestion {
  id: string;
  name: string;
  skills: string[];
  university: string;
}

const AIRecommendations = ({ 
  skills, 
  interests = [], 
  experienceLevel = 'Intermediate',
  resumeUploaded = false,
  showAIRecommendations = false,
  setShowAIRecommendations
}: AIRecommendationsProps) => {
  const { toast } = useToast();
  const [minimized, setMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<'events' | 'teammates'>('events');
  const [events, setEvents] = useState<Event[]>([]);
  const [teammates, setTeammates] = useState<TeammateSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [firstScan, setFirstScan] = useState(true);

  // Mock function to generate AI recommendations based on skills, interests, and experience
  const generateRecommendations = () => {
    setLoading(true);
    setFirstScan(false);
    
    // Simulate API delay
    setTimeout(() => {
      // Generate mock events based on skills and interests
      const mockEvents: Event[] = [
        {
          id: '1',
          title: 'JavaScript Webinar',
          description: 'Introduction to Modern JavaScript Patterns',
          tags: ['JavaScript', 'WebDev'],
          relevanceScore: 95,
          isPopular: true
        },
        {
          id: '2',
          title: 'React Workshop',
          description: 'Building Modern UIs with React Hooks',
          tags: ['React', 'Frontend'],
          relevanceScore: 90,
          hasTeamMatch: true
        },
        {
          id: '3',
          title: 'UI/UX Design Principles',
          description: 'Learn the fundamentals of UI/UX design',
          tags: ['UI/UX', 'Design'],
          relevanceScore: 85
        }
      ];

      // Filter events based on skills and interests
      const filteredEvents = mockEvents.filter(event => 
        event.tags.some(tag => 
          skills.includes(tag) || 
          interests.some(interest => tag.toLowerCase().includes(interest.toLowerCase()))
        )
      );

      // Generate mock teammate suggestions
      const mockTeammates: TeammateSuggestion[] = [
        {
          id: '1',
          name: 'Sarah Chen',
          skills: ['UI/UX', 'Frontend', 'Design'],
          university: 'Tech University'
        },
        {
          id: '2',
          name: 'Michael Johnson',
          skills: ['Backend', 'API Design', 'Python'],
          university: 'State College'
        },
        {
          id: '3',
          name: 'Priya Sharma',
          skills: ['Data Science', 'AI', 'Machine Learning'],
          university: 'Innovation Institute'
        }
      ];

      // Filter teammates based on complementary skills
      const filteredTeammates = mockTeammates.filter(teammate => 
        teammate.skills.some(skill => !skills.includes(skill))
      );

      setEvents(filteredEvents);
      setTeammates(filteredTeammates);
      setLoading(false);

      toast({
        title: "AI Recommendations Ready",
        description: `Found ${filteredEvents.length} events and ${filteredTeammates.length} potential teammates`,
      });
    }, 2000);
  };

  // Monitor for skill/interest/resume changes and update recommendations when appropriate
  useEffect(() => {
    if (showAIRecommendations && (skills.length > 0 || interests.length > 0) && !loading) {
      generateRecommendations();
    }
  }, [showAIRecommendations]);

  const toggleMinimized = () => {
    setMinimized(!minimized);
  };

  const handleActivateAI = () => {
    if (setShowAIRecommendations) {
      setShowAIRecommendations(true);
    }
  };

  // Check if we have any matching events
  const hasMatchingEvents = events.length > 0;
  const hasTeammates = teammates.length > 0;

  return (
    <>
      {resumeUploaded && firstScan && !showAIRecommendations && (
        <div className="fixed bottom-6 right-6 w-80 z-20 animate-slide-up">
          <Card className="overflow-hidden border border-primary/30 shadow-lg backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-primary/15 to-eventify-blue/15 py-3">
              <CardTitle className="text-base flex items-center">
                <Sparkles className="h-5 w-5 text-primary mr-2 animate-pulse" />
                Resume Uploaded
              </CardTitle>
            </CardHeader>
            <CardContent className="py-3">
              <p className="text-sm mb-3">
                Your resume has been scanned. Would you like to get personalized recommendations based on your profile?
              </p>
              <Button 
                onClick={handleActivateAI} 
                className="w-full bg-eventify-purple hover:bg-eventify-purple/90"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Show AI Recommendations
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <div className={`fixed bottom-6 right-6 w-80 transition-all duration-300 transform ${minimized ? 'scale-95 opacity-80' : 'scale-100'} z-10`}>
        <Card className="overflow-hidden hover-card hover-shadow-glow border border-primary/30 shadow-lg backdrop-blur-sm">
          <CardHeader 
            className="bg-gradient-to-r from-eventify-purple/15 to-eventify-blue/15 cursor-pointer py-3"
            onClick={toggleMinimized}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-eventify-purple animate-pulse-glow" />
                <CardTitle className="text-base">AI Recommendations</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                {minimized ? <Plus className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          
          {!minimized && (
            <>
              {showAIRecommendations ? (
                <>
                  <div className="flex border-b">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex-1 rounded-none ${activeTab === 'events' ? 'bg-primary/5 border-b-2 border-primary' : ''}`}
                      onClick={() => setActiveTab('events')}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Events
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex-1 rounded-none ${activeTab === 'teammates' ? 'bg-primary/5 border-b-2 border-primary' : ''}`}
                      onClick={() => setActiveTab('teammates')}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Teammates
                    </Button>
                  </div>
                  
                  <CardContent className="pt-3 pb-4 max-h-[300px] overflow-y-auto">
                    {loading ? (
                      <div className="flex items-center justify-center py-6">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                      </div>
                    ) : (
                      <>
                        {activeTab === 'events' && (
                          <>
                            {hasMatchingEvents ? (
                              <div className="space-y-3">
                                {events.map(event => (
                                  <div key={event.id} className="p-3 border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-card/50">
                                    <div className="flex items-center justify-between mb-1">
                                      <div className="text-sm font-medium text-eventify-purple">{event.title}</div>
                                      <div className="text-xs bg-primary/5 text-primary px-2 py-0.5 rounded-full">
                                        {event.relevanceScore}% Match
                                      </div>
                                    </div>
                                    <div className="text-xs text-muted-foreground mb-2">{event.description}</div>
                                    <div className="flex flex-wrap gap-1">
                                      {event.relevanceScore > 90 && (
                                        <Badge variant="outline" className="flex items-center gap-1 text-[10px] bg-success/5 text-success border-success/20">
                                          <CheckCircle className="h-3 w-3" />
                                          Highly Relevant
                                        </Badge>
                                      )}
                                      {event.isPopular && (
                                        <Badge variant="outline" className="flex items-center gap-1 text-[10px] bg-orange-500/5 text-orange-500 border-orange-500/20">
                                          <Flame className="h-3 w-3" />
                                          Popular
                                        </Badge>
                                      )}
                                      {event.hasTeamMatch && (
                                        <Badge variant="outline" className="flex items-center gap-1 text-[10px] bg-blue-500/5 text-blue-500 border-blue-500/20">
                                          <Globe className="h-3 w-3" />
                                          Team Match
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <Alert className="bg-card/50">
                                <AlertDescription className="flex items-center gap-2 text-xs">
                                  <span>No matching events found for your skills. Try adding more skills or different interests.</span>
                                </AlertDescription>
                              </Alert>
                            )}
                          </>
                        )}
                        
                        {activeTab === 'teammates' && (
                          <>
                            {hasTeammates ? (
                              <div className="space-y-3">
                                {teammates.map(teammate => (
                                  <div key={teammate.id} className="p-3 border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-card/50">
                                    <div className="flex items-center justify-between mb-1">
                                      <div className="text-sm font-medium text-eventify-purple">{teammate.name}</div>
                                    </div>
                                    <div className="text-xs text-muted-foreground mb-2">{teammate.university}</div>
                                    <div className="flex flex-wrap gap-1 mb-2">
                                      {teammate.skills.map((skill, index) => (
                                        <Badge key={index} variant="secondary" className="text-[10px]">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                    <Button size="sm" variant="outline" className="w-full text-xs">
                                      <Users className="h-3 w-3 mr-1" />
                                      Connect
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <Alert className="bg-card/50">
                                <AlertDescription className="flex items-center gap-2 text-xs">
                                  <span>No teammate matches found. Try adding different skills or interests.</span>
                                </AlertDescription>
                              </Alert>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </CardContent>
                  
                  <CardFooter className="px-3 py-2 bg-muted/30 border-t border-border text-xs text-muted-foreground">
                    <Button variant="ghost" size="sm" className="h-6 text-xs hover:bg-primary/5" onClick={generateRecommendations}>
                      <Sparkles className="h-3 w-3 mr-1" />
                      Refresh suggestions
                    </Button>
                  </CardFooter>
                </>
              ) : (
                <CardContent className="pt-3 pb-4">
                  <Alert className="bg-card/50">
                    <AlertDescription className="flex items-center gap-2 text-xs">
                      <span>AI recommendations are not active. Upload your resume or update your skills to activate.</span>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              )}
            </>
          )}
        </Card>
      </div>
    </>
  );
};

export default AIRecommendations;
