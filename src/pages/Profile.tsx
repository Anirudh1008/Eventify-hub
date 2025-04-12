
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';
import ProfileSection from '@/components/profile/ProfileSection';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Add this effect to verify Supabase connection
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.from('users').select('*').limit(1);
        console.log('Supabase connection test:', { success: !error, data, error });
      } catch (err) {
        console.error('Error testing Supabase connection:', err);
      }
    };
    
    checkConnection();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            {user ? 'Your Profile' : 'Profile'}
          </h1>
          
          {user ? (
            <ProfileSection />
          ) : (
            <div className="flex flex-col items-center justify-center p-8 bg-card rounded-lg shadow-md">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold mb-2">Login Required</h2>
                <p className="text-muted-foreground">
                  Please login or sign up to access your profile
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/login')}
                  className="gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
                <Button
                  size="lg"
                  onClick={() => navigate('/login?tab=signup')}
                  className="bg-gradient-to-r from-eventify-purple to-eventify-blue text-white gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
};

export default Profile;
