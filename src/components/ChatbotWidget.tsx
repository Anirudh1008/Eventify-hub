
import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { useLocation } from 'react-router-dom';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { 
      type: 'bot', 
      text: 'Hello! I\'m your AI assistant. How can I help you find events or answer questions today?' 
    }
  ]);
  const location = useLocation();

  useEffect(() => {
    // Generate context-aware greeting when the route changes
    if (isOpen) {
      const path = location.pathname;
      let contextMessage = '';
      
      setIsTyping(true);
      
      if (path.includes('/challenges')) {
        contextMessage = "I see you're browsing the student challenges! Would you like help with registration or have questions about any specific challenge?";
      } else if (path.includes('/events')) {
        contextMessage = "Looking for interesting events? I can recommend events based on your interests or help you with registration.";
      } else if (path.includes('/games')) {
        contextMessage = "Exploring our interactive games? Let me know if you want recommendations for your skill level or need help with the gameplay.";
      }
      
      if (contextMessage) {
        setTimeout(() => {
          setChatHistory(prev => [...prev, { type: 'bot', text: contextMessage }]);
          setIsTyping(false);
        }, 1000);
      }
    }
  }, [location.pathname, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    setChatHistory([...chatHistory, { type: 'user', text: message }]);
    
    // Set typing indicator
    setIsTyping(true);
    
    // Determine response based on message content and current page
    let botResponse = '';
    const userMessage = message.toLowerCase();
    const path = location.pathname;
    
    setTimeout(() => {
      if (path.includes('/challenges')) {
        if (userMessage.includes('register') || userMessage.includes('join') || userMessage.includes('sign up')) {
          botResponse = "To register for a challenge, simply click on a challenge card to view details, then click the 'Register Now' button. You'll need to be logged in to complete the registration.";
        } else if (userMessage.includes('deadline') || userMessage.includes('date')) {
          botResponse = "Each challenge has its own deadline displayed on the card. Click on any challenge to see more details including rules and prizes.";
        } else if (userMessage.includes('prize') || userMessage.includes('win')) {
          botResponse = "Prizes vary for each challenge. They typically include cash rewards, internship opportunities, certificates, and tech gadgets. Click on a challenge to see specific prize details.";
        } else {
          botResponse = "If you're interested in a specific challenge, click on it to learn more about requirements, rules, and prizes. Is there anything specific you'd like to know about our challenges?";
        }
      } else if (userMessage.includes('login') || userMessage.includes('signup') || userMessage.includes('account')) {
        botResponse = "You can create an account or log in by clicking the 'Login' button in the navigation bar. You'll need an account to register for events and challenges.";
      } else if (userMessage.includes('payment') || userMessage.includes('cost') || userMessage.includes('price') || userMessage.includes('fee')) {
        botResponse = "Event and challenge fees vary. The registration fee is displayed during the registration process. We accept all major credit cards for payment.";
      } else {
        botResponse = "I can help you find events based on your interests, assist with registration, or answer questions about our platform. What specifically are you looking for today?";
      }
      
      // Add bot response to chat
      setChatHistory(prev => [...prev, { type: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1500);

    setMessage('');
  };

  return (
    <>
      {/* Chatbot button */}
      <div className="fixed bottom-24 right-6 z-40">
        <Button 
          onClick={toggleChat}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-eventify-purple to-eventify-blue text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageSquare className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Chatbot window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-96 glass-card shadow-lg z-30 flex flex-col animate-scale-in rounded-lg overflow-hidden border border-border">
          <div className="p-4 border-b border-border bg-gradient-to-r from-eventify-purple to-eventify-blue text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-white/20">
                  <Zap className="h-4 w-4" />
                </Avatar>
                <div>
                  <h3 className="font-medium">Eventify Assistant</h3>
                  <p className="text-xs text-white/80">AI Powered</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleChat}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((chat, index) => (
              <div 
                key={index} 
                className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    chat.type === 'user' 
                      ? 'bg-eventify-purple text-white' 
                      : 'bg-secondary/80'
                  }`}
                >
                  {chat.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-secondary/80 px-4 py-3 rounded-lg flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 rounded-full"
              />
              <Button
                type="submit"
                size="icon"
                className="rounded-full bg-gradient-to-r from-eventify-purple to-eventify-blue text-white"
                disabled={isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
