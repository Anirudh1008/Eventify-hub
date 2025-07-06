
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { authAPI } from '@/services/api';

type User = {
  id: number;
  email: string;
  username: string;
};

type AuthContextType = {
  session: { user: User } | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data: { session: { user: User } | null; user: User | null } | null;
  }>;
  signUp: (email: string, password: string, userData?: { username?: string }) => Promise<{
    error: Error | null;
    data: { session: { user: User } | null; user: User | null } | null;
  }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<{ user: User } | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem('user');
    const authToken = localStorage.getItem('authToken');
    
    if (storedUser && authToken) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setSession({ user: userData });
    }
    
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      const userData = response.user;
      
      setUser(userData);
      setSession({ user: userData });
      
      toast({
        title: "Signed in successfully",
        description: "Welcome back!",
      });
      
      return { error: null, data: { session: { user: userData }, user: userData } };
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive"
      });
      return { error: error as Error, data: null };
    }
  };

  const signUp = async (email: string, password: string, userData?: { username?: string }) => {
    try {
      const response = await authAPI.register(email, password, userData?.username);
      const userInfo = response.user;
      
      setUser(userInfo);
      setSession({ user: userInfo });
      
      toast({
        title: "Account created successfully",
        description: "Welcome to Eventify!",
      });
      
      return { error: null, data: { session: { user: userInfo }, user: userInfo } };
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Registration failed",
        variant: "destructive"
      });
      return { error: error as Error, data: null };
    }
  };

  const signOut = async () => {
    authAPI.logout();
    setUser(null);
    setSession(null);
    
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
