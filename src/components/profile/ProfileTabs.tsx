
import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SkillsTab from './SkillsTab';
import ResumeTab from './ResumeTab';
import AIRecommendations from './AIRecommendations';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
}

interface ProfileTabsProps {
  profile: Profile | null;
}

const ProfileTabs = ({ profile }: ProfileTabsProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [skills, setSkills] = useState<string[]>(['JavaScript', 'React', 'UI/UX']);
  const [interests, setInterests] = useState<string[]>(['Hackathons', 'Web3', 'AI']);
  const [experienceLevel, setExperienceLevel] = useState<string>('Intermediate');
  const [resumeUploaded, setResumeUploaded] = useState<boolean>(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState<boolean>(false);
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);

  // Fetch user skills and interests from database
  useEffect(() => {
    async function fetchUserData() {
      try {
        if (!user) return;
        
        const { data, error } = await supabase
          .from('users')
          .select('skills, interests')
          .eq('id', user.id)
          .single();
          
        if (error) {
          console.error('Error fetching user data:', error);
          return;
        }
        
        if (data) {
          if (data.skills) {
            try {
              const parsedSkills = JSON.parse(data.skills);
              if (Array.isArray(parsedSkills)) {
                setSkills(parsedSkills);
              }
            } catch (e) {
              console.error('Error parsing skills:', e);
            }
          }
          
          if (data.interests) {
            try {
              const parsedInterests = JSON.parse(data.interests);
              if (Array.isArray(parsedInterests)) {
                setInterests(parsedInterests);
              }
            } catch (e) {
              console.error('Error parsing interests:', e);
            }
          }
        }
      } catch (error) {
        console.error('Error in fetchUserData:', error);
      }
    }
    
    fetchUserData();
  }, [user]);

  const handleSkillsChange = async (updatedSkills: string[]) => {
    setSkills(updatedSkills);
    
    if (user) {
      try {
        const { error } = await supabase
          .from('users')
          .update({ skills: JSON.stringify(updatedSkills) })
          .eq('id', user.id);
          
        if (error) throw error;
      } catch (error: any) {
        toast({
          title: "Error saving skills",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };

  const handleInterestsChange = async (updatedInterests: string[]) => {
    setInterests(updatedInterests);
    
    if (user) {
      try {
        const { error } = await supabase
          .from('users')
          .update({ interests: JSON.stringify(updatedInterests) })
          .eq('id', user.id);
          
        if (error) throw error;
      } catch (error: any) {
        toast({
          title: "Error saving interests",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };

  const handleExperienceLevelChange = (level: string) => {
    setExperienceLevel(level);
  };

  const handleResumeUpload = async (fileUploaded: boolean, extractedSkills: string[] = []) => {
    setResumeUploaded(fileUploaded);
    
    if (fileUploaded && extractedSkills.length > 0) {
      setExtractedSkills(extractedSkills);
      setShowAIRecommendations(true);
      
      if (user) {
        try {
          const { error } = await supabase
            .from('users')
            .update({ resume_url: 'uploaded' })
            .eq('id', user.id);
            
          if (error) throw error;
        } catch (error: any) {
          toast({
            title: "Error saving resume status",
            description: error.message,
            variant: "destructive"
          });
        }
      }
    }
  };

  return (
    <div className="md:w-[70%] lg:w-[75%] space-y-6 relative">
      <Tabs defaultValue="skills" className="w-full animate-fade-in">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="skills" className="tab-transition">Skills & Interests</TabsTrigger>
          <TabsTrigger value="resume" className="tab-transition">Resume Upload</TabsTrigger>
        </TabsList>
        
        <TabsContent value="skills" className="space-y-4 animate-fade-in">
          <SkillsTab 
            initialSkills={skills} 
            initialInterests={interests}
            experienceLevel={experienceLevel}
            onSkillsChange={handleSkillsChange}
            onInterestsChange={handleInterestsChange}
            onExperienceLevelChange={handleExperienceLevelChange}
            extractedSkills={extractedSkills}
          />
        </TabsContent>
        
        <TabsContent value="resume" className="mt-4 animate-fade-in">
          <ResumeTab 
            onResumeUpload={handleResumeUpload}
          />
        </TabsContent>
      </Tabs>
      
      <AIRecommendations 
        skills={skills} 
        interests={interests}
        experienceLevel={experienceLevel}
        resumeUploaded={resumeUploaded}
        showAIRecommendations={showAIRecommendations}
        setShowAIRecommendations={setShowAIRecommendations}
      />
    </div>
  );
};

export default ProfileTabs;
