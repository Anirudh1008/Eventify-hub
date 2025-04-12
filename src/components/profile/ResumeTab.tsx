
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Eye, Trash2, FileText, FileCode, Sparkles } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ResumeTabProps {
  onResumeUpload: (fileUploaded: boolean, extractedSkills?: string[]) => void;
}

const ResumeTab = ({ onResumeUpload }: ResumeTabProps) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

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

  // Mock function to simulate resume parsing
  const parseResume = (file: File): Promise<string[]> => {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        // Return mock extracted skills based on file type
        if (file.name.includes('web') || file.name.includes('front')) {
          resolve(['React', 'TypeScript', 'NextJS', 'Tailwind CSS', 'UI/UX']);
        } else if (file.name.includes('data') || file.name.includes('science')) {
          resolve(['Python', 'Data Science', 'Machine Learning', 'SQL', 'Pandas']);
        } else if (file.name.includes('back') || file.name.includes('full')) {
          resolve(['Node.js', 'Express', 'MongoDB', 'API Design', 'Authentication']);
        } else {
          // Default skills
          resolve(['JavaScript', 'HTML', 'CSS', 'Git', 'Problem Solving']);
        }
      }, 2000);
    });
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
    setIsScanning(true);
    setScanComplete(false);

    toast({
      title: "Resume Uploaded",
      description: `Successfully uploaded ${selectedFile.name}`,
    });

    // Simulate resume parsing
    parseResume(selectedFile).then(extractedSkills => {
      setIsScanning(false);
      setScanComplete(true);
      onResumeUpload(true, extractedSkills);
      
      toast({
        title: "Resume Scanned",
        description: `Found ${extractedSkills.length} skills in your resume`,
      });
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setScanComplete(false);
    onResumeUpload(false);
    
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

  return (
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
          <div className="space-y-4">
            <div className="border rounded-lg p-4 animate-scale-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-md">
                    {file.name.endsWith('.pdf') ? (
                      <FileText className="h-8 w-8 text-primary" />
                    ) : (
                      <FileCode className="h-8 w-8 text-primary" />
                    )}
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
            
            {isScanning && (
              <Alert className="bg-primary/5 border border-primary/20">
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 text-primary mr-2 animate-pulse" />
                  <AlertDescription>
                    Scanning your resume for skills and experience...
                  </AlertDescription>
                </div>
              </Alert>
            )}
            
            {scanComplete && (
              <Alert className="bg-success/5 border border-success/20">
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 text-success mr-2" />
                  <AlertDescription>
                    Resume scan complete! Check the Skills tab to see extracted skills.
                  </AlertDescription>
                </div>
              </Alert>
            )}
          </div>
        )}
        
        <div className="text-sm text-muted-foreground">
          Supported file types: PDF, DOC, DOCX. Maximum file size: 5MB.
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeTab;
