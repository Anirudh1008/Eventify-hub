
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import EventCategories from '@/components/EventCategories';
import FeaturedEvents from '@/components/FeaturedEvents';
import Leaderboard from '@/components/Leaderboard';
import GamesSection from '@/components/GamesSection';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <EventCategories />
        <FeaturedEvents />
        <Leaderboard />
        <GamesSection />
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
};

export default Index;
