
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from '@/hooks/use-toast';
import { Settings, X, Plus, Sparkles, Upload, LogOut, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

const ProfileSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [skills, setSkills] = useState<string[]>(['JavaScript', 'React', 'UI/UX']);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (!newSkill.trim()) {
      toast({
        title: "Error",
        description: "Please enter a skill",
        variant: "destructive",
      });
      return;
    }

    if (skills.includes(newSkill.trim())) {
      toast({
        title: "Error",
        description: "Skill already exists",
        variant: "destructive",
      });
      return;
    }

    setSkills([...skills, newSkill.trim()]);
    setNewSkill('');
    
    toast({
      title: "Success",
      description: `${newSkill.trim()} added to your skills`,
    });
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
    
    toast({
      description: `${skillToRemove} removed from your skills`,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      toast({
        title: "Resume Uploaded",
        description: `Successfully uploaded ${fileName}`,
      });
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  // For demo purposes - show event recommendations based on skills
  const hasMatchingEvents = skills.some(skill => 
    ['JavaScript', 'React', 'Python', 'Data Science'].includes(skill)
  );

  return (
    <div className="space-y-6 animate-fade-in w-full max-w-3xl mx-auto">
      <Card className="glass-card relative">
        <div className="absolute top-6 right-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-accent rounded-full">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Profile</DropdownMenuItem>
              <DropdownMenuItem>Account Settings</DropdownMenuItem>
              <DropdownMenuItem>Notification Preferences</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <CardHeader className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4 ring-4 ring-primary/20">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="text-2xl bg-gradient-to-br from-primary/80 to-eventify-blue/80 text-white">
              AJ
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold">Alex Johnson</CardTitle>
          <CardDescription className="text-lg">
            State University
          </CardDescription>
          <div className="text-sm text-muted-foreground">
            alex@university.edu
          </div>
          <div className="font-medium mt-1">
            Computer Science Student
          </div>
          <div className="mt-2 flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full text-sm font-medium">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>4 Events Attended</span>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="skills" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="skills">Skills & Interests</TabsTrigger>
          <TabsTrigger value="resume">Resume Upload</TabsTrigger>
        </TabsList>
        
        <TabsContent value="skills" className="space-y-4 mt-4 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Your Skills</CardTitle>
              <CardDescription>
                Add or remove skills to get more relevant event recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center text-sm animate-scale-in"
                  >
                    {skill}
                    <button 
                      className="ml-2 text-muted-foreground hover:text-destructive transition-colors"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    placeholder="Add a new skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    className="pr-10"
                  />
                </div>
                <Button 
                  onClick={handleAddSkill} 
                  className="bg-eventify-purple hover:bg-eventify-purple/90"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-eventify-purple/10 to-eventify-blue/10">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-eventify-purple" />
                <CardTitle className="text-xl">AI Recommendations</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {hasMatchingEvents ? (
                <div className="space-y-3">
                  <div className="p-3 border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="text-sm font-medium text-eventify-purple">JavaScript Webinar</div>
                    <div className="text-sm text-muted-foreground">Introduction to Modern JavaScript Patterns</div>
                  </div>
                  
                  <div className="p-3 border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="text-sm font-medium text-eventify-purple">React Workshop</div>
                    <div className="text-sm text-muted-foreground">Building Modern UIs with React Hooks</div>
                  </div>
                </div>
              ) : (
                <Alert>
                  <AlertDescription className="flex items-center gap-2">
                    <span>No matching events found for your skills. Try adding more skills or different interests.</span>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resume" className="mt-4 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Resume Upload</CardTitle>
              <CardDescription>
                Upload your resume to get better event matches and job opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium text-foreground">Drag and drop your resume</h3>
                  <p className="text-sm text-muted-foreground">or click to browse files</p>
                  
                  <Input
                    id="resumeUpload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => document.getElementById('resumeUpload')?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Supported file types: PDF, DOC, DOCX. Maximum file size: 5MB.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSection;
