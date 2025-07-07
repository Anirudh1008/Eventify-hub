
import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { useLocation } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { 
      type: 'bot', 
      text: 'Hello! I\'m your AI assistant powered by OpenAI. How can I help you find events, answer questions, or assist with your learning journey today?' 
    }
  ]);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Load API key from localStorage
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setShowApiInput(true);
    }
  }, []);

  useEffect(() => {
    // Generate context-aware greeting when the route changes
    if (isOpen && apiKey) {
      const path = location.pathname;
      let contextMessage = '';
      
      setIsTyping(true);
      
      if (path.includes('/challenges')) {
        contextMessage = "I see you're browsing the student challenges! Would you like help with registration or have questions about any specific challenge?";
      } else if (path.includes('/events')) {
        contextMessage = "Looking for interesting events? I can recommend events based on your interests or help you with registration.";
      } else if (path.includes('/games')) {
        contextMessage = "Exploring our interactive games? Let me know if you want recommendations for your skill level or need help with the gameplay.";
      } else if (path.includes('/colleges')) {
        contextMessage = "Searching for colleges? I can help you find the right institution based on your preferences and career goals.";
      }
      
      if (contextMessage) {
        setTimeout(() => {
          setChatHistory(prev => [...prev, { type: 'bot', text: contextMessage }]);
          setIsTyping(false);
        }, 1000);
      } else {
        setIsTyping(false);
      }
    }
  }, [location.pathname, isOpen, apiKey]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey.trim());
      setShowApiInput(false);
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved securely in your browser.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!apiKey) {
      setShowApiInput(true);
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to use the AI assistant.",
        variant: "destructive",
      });
      return;
    }

    // Add user message to chat
    const userMessage = { type: 'user', text: message };
    setChatHistory(prev => [...prev, userMessage]);
    
    // Set typing indicator
    setIsTyping(true);
    const currentMessage = message;
    setMessage('');
    
    try {
      // Call OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are Eventify AI Assistant, a helpful AI assistant for a student platform called Eventify. 
              The platform offers:
              - Student events and competitions
              - Interactive games for different engineering branches (CS/IT, ECE/EEE, Mechanical, Design)
              - College information and recommendations
              - Challenges and hackathons
              - Learning resources and career guidance
              
              Current page context: ${location.pathname}
              
              Be helpful, friendly, and concise. Focus on helping students with their academic and career journey.`
            },
            {
              role: 'user',
              content: currentMessage
            }
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const botResponse = data.choices[0]?.message?.content || "I'm sorry, I couldn't process that request. Please try again.";
      
      // Add bot response to chat
      setChatHistory(prev => [...prev, { type: 'bot', text: botResponse }]);
      
    } catch (error) {
      console.error('OpenAI API Error:', error);
      let errorMessage = "I'm having trouble connecting to my AI service right now. ";
      
      if (error.message.includes('401')) {
        errorMessage += "Please check your API key and try again.";
        setShowApiInput(true);
      } else {
        errorMessage += "Please try again in a moment.";
      }
      
      setChatHistory(prev => [...prev, { type: 'bot', text: errorMessage }]);
      
      toast({
        title: "AI Service Error",
        description: "There was an issue with the AI service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
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
                  <h3 className="font-medium">Eventify AI Assistant</h3>
                  <p className="text-xs text-white/80">Powered by OpenAI</p>
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

          {showApiInput && (
            <div className="p-4 bg-yellow-50 border-b border-border">
              <div className="text-sm mb-2">
                <p className="font-medium text-yellow-800">OpenAI API Key Required</p>
                <p className="text-yellow-700">Enter your API key to enable AI responses</p>
              </div>
              <div className="flex gap-2">
                <Input
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1 text-sm"
                />
                <Button onClick={saveApiKey} size="sm">
                  Save
                </Button>
              </div>
            </div>
          )}

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
                placeholder="Ask me anything..."
                className="flex-1 rounded-full"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="icon"
                className="rounded-full bg-gradient-to-r from-eventify-purple to-eventify-blue text-white"
                disabled={isTyping || !message.trim()}
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
