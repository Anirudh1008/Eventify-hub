
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SkillsTab from './SkillsTab';
import ResumeTab from './ResumeTab';
import AIRecommendations from './AIRecommendations';

const ProfileTabs = () => {
  const [skills, setSkills] = useState<string[]>(['JavaScript', 'React', 'UI/UX']);
  const [interests, setInterests] = useState<string[]>(['Hackathons', 'Web3', 'AI']);
  const [experienceLevel, setExperienceLevel] = useState<string>('Intermediate');
  const [resumeUploaded, setResumeUploaded] = useState<boolean>(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState<boolean>(false);
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);

  const handleSkillsChange = (updatedSkills: string[]) => {
    setSkills(updatedSkills);
  };

  const handleInterestsChange = (updatedInterests: string[]) => {
    setInterests(updatedInterests);
  };

  const handleExperienceLevelChange = (level: string) => {
    setExperienceLevel(level);
  };

  const handleResumeUpload = (fileUploaded: boolean, extractedSkills: string[] = []) => {
    setResumeUploaded(fileUploaded);
    if (fileUploaded && extractedSkills.length > 0) {
      setExtractedSkills(extractedSkills);
      // Show AI recommendations after successful resume upload
      setShowAIRecommendations(true);
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
