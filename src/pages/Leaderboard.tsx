
import React from 'react';
import Navbar from '@/components/Navbar';
import LeaderboardComponent from '@/components/Leaderboard';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Leaderboard</h1>
          <p className="text-muted-foreground mb-12 max-w-3xl">
            See who's leading the pack! Our leaderboard showcases top-performing students and colleges
            based on event participation, challenges completed, and overall engagement.
          </p>
          <LeaderboardComponent />
        </div>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
