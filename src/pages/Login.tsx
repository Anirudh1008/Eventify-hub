import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LogIn, ArrowRight, Github, Mail, UserPlus } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileSection from '@/components/profile/ProfileSection';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
      setIsLoading(false);
      setIsLoggedIn(true);
    }, 1500);
  };

  // For signup form
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('student');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate signup API call
    setTimeout(() => {
      toast({
        title: "Account created",
        description: "You have successfully created an account",
      });
      setIsLoading(false);
      setIsLoggedIn(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 pt-24 pb-16">
        <div className="w-full max-w-md">
          {isLoggedIn ? (
            <ProfileSection />
          ) : (
            <Card className="glass-card">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Welcome to Eventify</CardTitle>
                <CardDescription className="text-center">
                  Access your account or create a new one
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login" className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="m@example.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Link 
                            to="/forgot-password" 
                            className="text-xs text-primary hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <Input 
                          id="password" 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-eventify-purple to-eventify-blue text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <span className="animate-spin mr-2">⏳</span>
                            <span>Logging in...</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <LogIn className="mr-2 h-4 w-4" />
                            <span>Login</span>
                          </div>
                        )}
                      </Button>
                      
                      <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" type="button">
                          <Github className="mr-2 h-4 w-4" />
                          Github
                        </Button>
                        <Button variant="outline" type="button">
                          <Mail className="mr-2 h-4 w-4" />
                          Email
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup" className="space-y-4">
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          placeholder="John Doe" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input 
                          id="signup-email" 
                          type="email" 
                          placeholder="m@example.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input 
                          id="signup-password" 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input 
                          id="confirmPassword" 
                          type="password" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-eventify-purple to-eventify-blue text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <span className="animate-spin mr-2">⏳</span>
                            <span>Creating account...</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <UserPlus className="mr-2 h-4 w-4" />
                            <span>Sign Up</span>
                          </div>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
