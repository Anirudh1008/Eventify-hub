
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar, MapPin, Plus, Upload, Calendar as CalendarIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import ChatbotWidget from '@/components/ChatbotWidget';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Event Created",
        description: "Your event has been submitted for review.",
      });
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Create an Event</h1>
              <p className="text-muted-foreground">List your event on our platform to reach thousands of students</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                {/* Basic Information */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                      Provide the essential details about your event
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Event Title</Label>
                      <Input id="title" placeholder="Enter event title" required />
                      <p className="text-xs text-muted-foreground">
                        Choose a catchy, descriptive title for your event
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="category">Event Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Categories</SelectLabel>
                              <SelectItem value="tech">Tech</SelectItem>
                              <SelectItem value="academic">Academic</SelectItem>
                              <SelectItem value="cultural">Cultural</SelectItem>
                              <SelectItem value="sports">Sports</SelectItem>
                              <SelectItem value="arts">Arts</SelectItem>
                              <SelectItem value="business">Business</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="eventType">Event Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Types</SelectLabel>
                              <SelectItem value="hackathon">Hackathon</SelectItem>
                              <SelectItem value="workshop">Workshop</SelectItem>
                              <SelectItem value="conference">Conference</SelectItem>
                              <SelectItem value="competition">Competition</SelectItem>
                              <SelectItem value="seminar">Seminar</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Event Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Describe your event in detail..." 
                        className="min-h-[120px]"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Provide a comprehensive description of your event, including goals, activities, and benefits
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Event Banner</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center">
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="font-medium mb-1">Drop your image here, or browse</p>
                        <p className="text-xs text-muted-foreground mb-4">Supports JPG, PNG - Recommended size: 1200x600px</p>
                        <Button variant="outline" type="button">Upload Banner</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Date, Time & Location */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Date, Time & Location</CardTitle>
                    <CardDescription>
                      When and where will your event take place?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <div className="flex">
                          <div className="relative flex-1">
                            <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input type="date" className="pl-10" required />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <div className="flex">
                          <div className="relative flex-1">
                            <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input type="date" className="pl-10" required />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Start Time</Label>
                        <Input type="time" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>End Time</Label>
                        <Input type="time" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="locationType">Location Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="inperson">In-Person</SelectItem>
                            <SelectItem value="virtual">Virtual</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location / Meeting Link</Label>
                      <Input id="location" placeholder="Enter venue address or virtual meeting link" required />
                    </div>
                  </CardContent>
                </Card>
                
                {/* Registration Details */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Registration Details</CardTitle>
                    <CardDescription>
                      Set up your event registration parameters
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Maximum Capacity</Label>
                        <Input id="capacity" type="number" placeholder="Enter max attendees" required />
                        <p className="text-xs text-muted-foreground">
                          Set to 0 for unlimited capacity
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="regEndDate">Registration End Date</Label>
                        <div className="relative">
                          <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="regEndDate" type="date" className="pl-10" required />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="eligibility">Eligibility Requirements</Label>
                      <Textarea 
                        id="eligibility" 
                        placeholder="What are the requirements to participate?" 
                      />
                    </div>
                  </CardContent>
                </Card>
                
                {/* Prizes & Speakers */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Prizes & Speakers</CardTitle>
                    <CardDescription>
                      Add information about prizes and speakers (if applicable)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="prizes">Prizes & Rewards</Label>
                      <Textarea 
                        id="prizes" 
                        placeholder="Describe the prizes, rewards, or certificates offered" 
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label>Speakers / Judges</Label>
                        <Button type="button" variant="outline" size="sm" className="flex items-center gap-1">
                          <Plus className="h-3 w-3" />
                          <span>Add Speaker</span>
                        </Button>
                      </div>
                      
                      <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <img src="https://i.pravatar.cc/150?img=1" alt="Speaker" />
                          </Avatar>
                          <div className="flex-1">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="speakerName" className="text-xs">Name</Label>
                                <Input id="speakerName" className="h-8 mt-1" placeholder="Speaker name" />
                              </div>
                              <div>
                                <Label htmlFor="speakerRole" className="text-xs">Role</Label>
                                <Input id="speakerRole" className="h-8 mt-1" placeholder="Role/Designation" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Submit */}
                <div className="flex justify-end gap-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-eventify-purple to-eventify-blue text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <span className="animate-spin mr-2">⏳</span>
                        <span>Creating Event...</span>
                      </div>
                    ) : "Create Event"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
};

export default CreateEvent;
