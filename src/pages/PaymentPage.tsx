
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, CheckCircle, Calendar, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const featuredEvents = [
  {
    id: 1,
    title: "National Hackathon 2023",
    organizer: "Tech University",
    price: 499,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Business Case Competition",
    organizer: "Business School",
    price: 299,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Design Festival 2023",
    organizer: "Creative Arts College",
    price: 399,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1712&auto=format&fit=crop",
  },
];

const PaymentPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  
  const event = featuredEvents.find(e => e.id === parseInt(eventId));
  
  useEffect(() => {
    if (!event) {
      navigate('/events');
    }
  }, [event, navigate]);
  
  if (!event) {
    return null;
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    toast({
      title: "Processing Payment",
      description: "Please wait while we process your payment...",
    });
    
    setTimeout(() => {
      setIsProcessing(false);
      navigate(`/registration-success/${eventId}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Complete Your Registration</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Order Summary */}
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.organizer}</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-2">
                        <span>Registration Fee</span>
                        <span>₹{event.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Processing Fee</span>
                        <span>₹{(event.price * 0.02).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t">
                        <span>Total</span>
                        <span>₹{(event.price * 1.02).toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Payment Form */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                    <CardDescription>Complete your registration by making a secure payment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <div className="relative">
                            <Input 
                              id="cardNumber" 
                              name="cardNumber" 
                              value={paymentData.cardNumber} 
                              onChange={handleInputChange} 
                              required 
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              className="pl-10"
                            />
                            <CreditCard className="h-4 w-4 text-muted-foreground absolute left-3 top-3" />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="cardHolder">Card Holder Name</Label>
                          <Input 
                            id="cardHolder" 
                            name="cardHolder" 
                            value={paymentData.cardHolder} 
                            onChange={handleInputChange} 
                            required 
                            placeholder="Name as appears on card"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <div className="relative">
                              <Input 
                                id="expiryDate" 
                                name="expiryDate" 
                                value={paymentData.expiryDate} 
                                onChange={handleInputChange} 
                                required 
                                placeholder="MM/YY"
                                maxLength={5}
                                className="pl-10"
                              />
                              <Calendar className="h-4 w-4 text-muted-foreground absolute left-3 top-3" />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <div className="relative">
                              <Input 
                                id="cvv" 
                                name="cvv" 
                                type="password" 
                                value={paymentData.cvv} 
                                onChange={handleInputChange} 
                                required 
                                placeholder="123"
                                maxLength={3}
                                className="pl-10"
                              />
                              <Lock className="h-4 w-4 text-muted-foreground absolute left-3 top-3" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-4 mt-6">
                        <Button 
                          type="submit"
                          className="w-full bg-gradient-to-r from-eventify-purple to-eventify-blue text-white flex items-center justify-center gap-2"
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>Processing...</>
                          ) : (
                            <>
                              <Lock className="h-4 w-4" />
                              Pay ₹{(event.price * 1.02).toFixed(2)}
                            </>
                          )}
                        </Button>
                        
                        <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                          <Lock className="h-3 w-3" />
                          Payments are secure and encrypted
                        </p>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
