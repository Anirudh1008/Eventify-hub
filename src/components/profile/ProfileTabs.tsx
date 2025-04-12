
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SkillsTab from './SkillsTab';
import ResumeTab from './ResumeTab';
import AIRecommendations from './AIRecommendations';

const ProfileTabs = () => {
  const [skills, setSkills] = useState<string[]>(['JavaScript', 'React', 'UI/UX']);

  const handleSkillsChange = (updatedSkills: string[]) => {
    setSkills(updatedSkills);
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
            onSkillsChange={handleSkillsChange} 
          />
        </TabsContent>
        
        <TabsContent value="resume" className="mt-4 animate-fade-in">
          <ResumeTab />
        </TabsContent>
      </Tabs>
      
      <AIRecommendations skills={skills} />
    </div>
  );
};

export default ProfileTabs;
