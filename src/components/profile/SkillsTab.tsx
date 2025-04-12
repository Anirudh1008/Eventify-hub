
import React, { useState } from 'react';
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';

interface SkillsTabProps {
  initialSkills?: string[];
  onSkillsChange?: (skills: string[]) => void;
}

const SkillsTab = ({ initialSkills = ['JavaScript', 'React', 'UI/UX'], onSkillsChange }: SkillsTabProps) => {
  const { toast } = useToast();
  const [skills, setSkills] = useState<string[]>(initialSkills);
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

  return (
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
  );
};

export default SkillsTab;
