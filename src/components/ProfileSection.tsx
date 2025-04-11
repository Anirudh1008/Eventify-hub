
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, X, Plus, Sparkles, Upload, LogOut, 
  Star, UserRound, Mail, School, Trash2, Eye
} from "lucide-react";
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
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [aiRecommendationsMinimized, setAiRecommendationsMinimized] = useState(false);

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      handleFileSelection(droppedFile);
    }
  };

  const handleFileSelection = (selectedFile: File) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB",
        variant: "destructive",
      });
      return;
    }
    
    setFile(selectedFile);
    toast({
      title: "Resume Uploaded",
      description: `Successfully uploaded ${selectedFile.name}`,
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    toast({
      description: "Resume removed",
    });
  };

  const handleViewFile = () => {
    // In a real app, this would display the file
    toast({
      title: "View Resume",
      description: "Viewing resume...",
    });
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
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-7xl mx-auto animate-fade-in">
      {/* Sticky Profile Card - Left Sidebar */}
      <div className="md:w-[30%] lg:w-[25%]">
        <div className="sticky top-24 space-y-4">
          <Card className="glass-card border border-primary/20 shadow-lg overflow-hidden">
            <CardHeader className="flex flex-col items-center text-center pb-2">
              <Avatar className="h-24 w-24 mb-4 ring-4 ring-primary/20 bg-gradient-to-br from-primary/80 to-eventify-blue/80">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-primary/80 to-eventify-blue/80 text-white">
                  AJ
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl font-bold">Alex Johnson</CardTitle>
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                <School className="h-3.5 w-3.5" />
                <span>State University</span>
              </div>
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                <Mail className="h-3.5 w-3.5" />
                <span>alex@university.edu</span>
              </div>
              <div className="font-medium mt-2 flex items-center gap-1">
                <UserRound className="h-3.5 w-3.5 text-primary" />
                <span>Computer Science Student</span>
              </div>
            </CardHeader>
            <CardContent className="text-center pb-6">
              <div className="inline-flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-full text-sm font-medium">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>4 Events Attended</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border border-primary/20 shadow-sm overflow-hidden">
            <CardContent className="p-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-muted-foreground hover:text-foreground gap-2 hover:bg-primary/5"
                onClick={handleLogout}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-muted-foreground hover:text-foreground gap-2 hover:bg-primary/5 mt-1"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Main Content - Right Panel */}
      <div className="md:w-[70%] lg:w-[75%] space-y-6 relative">
        <Tabs defaultValue="skills" className="w-full animate-fade-in">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="skills" className="tab-transition">Skills & Interests</TabsTrigger>
            <TabsTrigger value="resume" className="tab-transition">Resume Upload</TabsTrigger>
          </TabsList>
          
          <TabsContent value="skills" className="space-y-4 animate-fade-in">
            <Card className="hover-card">
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
                      className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center text-sm animate-scale-in hover-shadow-glow transition-all"
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
                    className="bg-eventify-purple hover:bg-eventify-purple/90 transition-all"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resume" className="mt-4 animate-fade-in">
            <Card className="hover-card">
              <CardHeader>
                <CardTitle>Resume Upload</CardTitle>
                <CardDescription>
                  Upload your resume to get better event matches and job opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!file ? (
                  <div 
                    className={`border-2 border-dashed ${isDragging ? 'border-primary bg-primary/5' : 'border-border'} rounded-lg p-8 text-center transition-all`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Upload className={`h-12 w-12 ${isDragging ? 'text-primary animate-pulse' : 'text-muted-foreground'} mb-2 transition-all`} />
                      <h3 className="font-medium text-foreground">Drag and drop your resume</h3>
                      <p className="text-sm text-muted-foreground">or click to browse files</p>
                      
                      <Input
                        id="resumeUpload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileInputChange}
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => document.getElementById('resumeUpload')?.click()}
                        className="hover-shadow-glow"
                      >
                        Choose File
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-lg p-4 animate-scale-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-md">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-8 w-8 text-primary" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                            />
                          </svg>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">{file.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={handleViewFile} 
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={handleRemoveFile}
                          className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="text-sm text-muted-foreground">
                  Supported file types: PDF, DOC, DOCX. Maximum file size: 5MB.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Floating AI Recommendations Card */}
        <div className={`fixed bottom-6 right-6 w-72 transition-all duration-300 transform ${aiRecommendationsMinimized ? 'scale-95 opacity-80' : 'scale-100'} z-10`}>
          <Card className="overflow-hidden hover-card hover-shadow-glow border border-primary/30 shadow-lg backdrop-blur-sm">
            <CardHeader 
              className="bg-gradient-to-r from-eventify-purple/15 to-eventify-blue/15 cursor-pointer py-3"
              onClick={() => setAiRecommendationsMinimized(!aiRecommendationsMinimized)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-eventify-purple animate-pulse-glow" />
                  <CardTitle className="text-base">AI Recommendations</CardTitle>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  {aiRecommendationsMinimized ? <Plus className="h-4 w-4" /> : <X className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            
            {!aiRecommendationsMinimized && (
              <CardContent className="pt-3 pb-4">
                {hasMatchingEvents ? (
                  <div className="space-y-3">
                    <div className="p-3 border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-card/50">
                      <div className="text-sm font-medium text-eventify-purple">JavaScript Webinar</div>
                      <div className="text-xs text-muted-foreground">Introduction to Modern JavaScript Patterns</div>
                    </div>
                    
                    <div className="p-3 border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-card/50">
                      <div className="text-sm font-medium text-eventify-purple">React Workshop</div>
                      <div className="text-xs text-muted-foreground">Building Modern UIs with React Hooks</div>
                    </div>
                  </div>
                ) : (
                  <Alert className="bg-card/50">
                    <AlertDescription className="flex items-center gap-2 text-xs">
                      <span>No matching events found for your skills. Try adding more skills or different interests.</span>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
