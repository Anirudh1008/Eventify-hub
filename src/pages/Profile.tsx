
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';
import ProfileSection from '@/components/profile/ProfileSection';

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Your Profile</h1>
          <ProfileSection />
        </div>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
};

export default Profile;
