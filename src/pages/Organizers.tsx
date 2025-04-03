
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';

const Organizers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">For Organizers</h1>
          <p className="text-muted-foreground mb-8">
            Create and manage events, track registrations, and engage with participants
          </p>
          
          {/* Organizers content will be added here */}
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Organizers content coming soon!</p>
          </div>
        </div>
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
};

export default Organizers;
