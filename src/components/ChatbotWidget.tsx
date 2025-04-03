
import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { 
      type: 'bot', 
      text: 'Hello! I\'m your AI assistant. How can I help you find events or answer questions today?' 
    }
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    setChatHistory([...chatHistory, { type: 'user', text: message }]);
    
    // Simulate bot response
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev, 
        { 
          type: 'bot', 
          text: 'I can help you find events based on your interests. What type of events are you looking for?' 
        }
      ]);
    }, 1000);

    setMessage('');
  };

  return (
    <>
      {/* Chatbot button */}
      <div className="fixed bottom-24 right-6 z-40">
        <Button 
          onClick={toggleChat}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-eventify-purple to-eventify-blue text-white shadow-lg"
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
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-96 glass-card shadow-lg z-30 flex flex-col animate-scale-in">
          <div className="p-4 border-b border-border bg-gradient-to-r from-eventify-purple to-eventify-blue text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-white/20">
                  <MessageSquare className="h-4 w-4" />
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
