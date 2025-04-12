
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, LogOut, UserRound, Mail, School, Star } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';

interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
}

interface SidebarProfileProps {
  profile: Profile | null;
}

const SidebarProfile = ({ profile }: SidebarProfileProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  return (
    <div className="md:w-[30%] lg:w-[25%]">
      <div className="sticky top-24 space-y-4">
        <Card className="glass-card border border-primary/20 shadow-lg overflow-hidden">
          <CardHeader className="flex flex-col items-center text-center pb-2">
            <Avatar className="h-24 w-24 mb-4 ring-4 ring-primary/20 bg-gradient-to-br from-primary/80 to-eventify-blue/80">
              <AvatarImage src={profile?.avatar_url || ""} alt={profile?.username || "User"} />
              <AvatarFallback className="text-2xl bg-gradient-to-br from-primary/80 to-eventify-blue/80 text-white">
                {profile?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl font-bold">{profile?.username || user?.email?.split('@')[0] || "User"}</CardTitle>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
              <School className="h-3.5 w-3.5" />
              <span>State University</span>
            </div>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
              <Mail className="h-3.5 w-3.5" />
              <span>{user?.email || "user@example.com"}</span>
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
              onClick={() => navigate('/profile')}
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
  );
};

export default SidebarProfile;
