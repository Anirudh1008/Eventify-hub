
import React, { useState, useEffect } from 'react';
import { X, Plus, CheckCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SkillsTabProps {
  initialSkills?: string[];
  initialInterests?: string[];
  experienceLevel?: string;
  extractedSkills?: string[];
  onSkillsChange?: (skills: string[]) => void;
  onInterestsChange?: (interests: string[]) => void;
  onExperienceLevelChange?: (level: string) => void;
}

const SkillsTab = ({ 
  initialSkills = ['JavaScript', 'React', 'UI/UX'], 
  initialInterests = ['Hackathons', 'Web3', 'AI'],
  experienceLevel = 'Intermediate',
  extractedSkills = [],
  onSkillsChange,
  onInterestsChange,
  onExperienceLevelChange
}: SkillsTabProps) => {
  const { toast } = useToast();
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [newSkill, setNewSkill] = useState('');
  const [interests, setInterests] = useState<string[]>(initialInterests);
  const [newInterest, setNewInterest] = useState('');
  const [level, setLevel] = useState(experienceLevel);
  const [showExtractedSkills, setShowExtractedSkills] = useState(false);

  // Update when extracted skills change
  useEffect(() => {
    if (extractedSkills.length > 0) {
      setShowExtractedSkills(true);
    }
  }, [extractedSkills]);

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

    const updatedSkills = [...skills, newSkill.trim()];
    setSkills(updatedSkills);
    setNewSkill('');
    
    if (onSkillsChange) {
      onSkillsChange(updatedSkills);
    }
    
    toast({
      title: "Success",
      description: `${newSkill.trim()} added to your skills`,
    });
  };

  const handleAddInterest = () => {
    if (!newInterest.trim()) {
      toast({
        title: "Error",
        description: "Please enter an interest",
        variant: "destructive",
      });
      return;
    }

    if (interests.includes(newInterest.trim())) {
      toast({
        title: "Error",
        description: "Interest already exists",
        variant: "destructive",
      });
      return;
    }

    const updatedInterests = [...interests, newInterest.trim()];
    setInterests(updatedInterests);
    setNewInterest('');
    
    if (onInterestsChange) {
      onInterestsChange(updatedInterests);
    }
    
    toast({
      title: "Success",
      description: `${newInterest.trim()} added to your interests`,
    });
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    
    if (onSkillsChange) {
      onSkillsChange(updatedSkills);
    }
    
    toast({
      description: `${skillToRemove} removed from your skills`,
    });
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    const updatedInterests = interests.filter(interest => interest !== interestToRemove);
    setInterests(updatedInterests);
    
    if (onInterestsChange) {
      onInterestsChange(updatedInterests);
    }
    
    toast({
      description: `${interestToRemove} removed from your interests`,
    });
  };

  const handleLevelChange = (value: string) => {
    setLevel(value);
    if (onExperienceLevelChange) {
      onExperienceLevelChange(value);
    }
    toast({
      description: `Experience level updated to ${value}`,
    });
  };

  const handleAddExtractedSkill = (skill: string) => {
    if (skills.includes(skill)) {
      toast({
        title: "Info",
        description: `${skill} is already in your skills`,
      });
      return;
    }
    
    const updatedSkills = [...skills, skill];
    setSkills(updatedSkills);
    
    if (onSkillsChange) {
      onSkillsChange(updatedSkills);
    }
    
    toast({
      description: `${skill} added from your resume`,
    });
  };

  return (
    <div className="space-y-6">
      {showExtractedSkills && extractedSkills.length > 0 && (
        <Card className="hover-card border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCheck className="h-5 w-5 text-primary" />
              Skills Extracted from Resume
            </CardTitle>
            <CardDescription>
              Click on a skill to add it to your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {extractedSkills.map((skill, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="rounded-full hover:bg-primary/10 hover:text-primary"
                  onClick={() => handleAddExtractedSkill(skill)}
                >
                  {skill}
                  <Plus className="ml-1 h-3.5 w-3.5" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
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

      <Card className="hover-card">
        <CardHeader>
          <CardTitle>Your Interests</CardTitle>
          <CardDescription>
            What areas are you most interested in?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <div 
                key={index} 
                className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center text-sm animate-scale-in hover-shadow-glow transition-all"
              >
                {interest}
                <button 
                  className="ml-2 text-muted-foreground hover:text-destructive transition-colors"
                  onClick={() => handleRemoveInterest(interest)}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                placeholder="Add a new interest"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddInterest();
                  }
                }}
                className="pr-10"
              />
            </div>
            <Button 
              onClick={handleAddInterest} 
              className="bg-eventify-purple hover:bg-eventify-purple/90 transition-all"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="hover-card">
        <CardHeader>
          <CardTitle>Experience Level</CardTitle>
          <CardDescription>
            How would you describe your technical experience?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={level} onValueChange={handleLevelChange} className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Beginner" id="beginner" />
              <Label htmlFor="beginner">Beginner</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Intermediate" id="intermediate" />
              <Label htmlFor="intermediate">Intermediate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Advanced" id="advanced" />
              <Label htmlFor="advanced">Advanced</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsTab;
