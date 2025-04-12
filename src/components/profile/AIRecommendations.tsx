
import React, { useState } from 'react';
import { Sparkles, Plus, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AIRecommendationsProps {
  skills: string[];
}

const AIRecommendations = ({ skills }: AIRecommendationsProps) => {
  const [aiRecommendationsMinimized, setAiRecommendationsMinimized] = useState(false);
  
  // For demo purposes - show event recommendations based on skills
  const hasMatchingEvents = skills.some(skill => 
    ['JavaScript', 'React', 'Python', 'Data Science'].includes(skill)
  );

  return (
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
  );
};

export default AIRecommendations;
