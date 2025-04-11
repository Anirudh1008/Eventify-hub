
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

const OrganizersSection = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly');
  };

  // Calculate yearly prices (20% discount)
  const getPrice = (monthlyPrice: number) => {
    if (billingCycle === 'yearly') {
      return {
        value: Math.floor(monthlyPrice * 0.8),
        isSale: true
      };
    }
    return {
      value: monthlyPrice,
      isSale: false
    };
  };

  const freePlan = getPrice(0);
  const standardPlan = getPrice(39);
  const premiumPlan = getPrice(99);

  return (
    <section id="for-organizers" className="py-20 bg-white dark:bg-gray-900">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get More Event Registrations</h2>
          <p className="text-lg text-muted-foreground">
            Join hundreds of colleges and club organizers who use Lovable to boost attendance and simplify event management.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch 
              checked={billingCycle === 'yearly'} 
              onCheckedChange={toggleBillingCycle}
            />
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Yearly
              {billingCycle === 'yearly' && (
                <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                  Save 20%
                </Badge>
              )}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <Card className="border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Free</CardTitle>
              <CardDescription>For students and attendees</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">${freePlan.value}</span>
                <span className="text-muted-foreground">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <FeatureItem text="Discover and join events" />
              <FeatureItem text="Create student profile" />
              <FeatureItem text="Register for events" />
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" onClick={() => window.location.href = '/signup'}>
                Sign Up
              </Button>
            </CardFooter>
          </Card>

          {/* Standard Plan */}
          <Card className="border shadow-md relative bg-gray-50/50 dark:bg-gray-800/50">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="px-3 py-1 bg-eventify-purple text-white">Popular</Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Standard</CardTitle>
              <CardDescription>For clubs and organizations</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">${standardPlan.value}</span>
                <span className="text-muted-foreground">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                {standardPlan.isSale && (
                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                    20% off
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <FeatureItem text="Everything in Free" />
              <FeatureItem text="Create and list up to 10 events" />
              <FeatureItem text="Basic analytics" />
              <FeatureItem text="Email notifications" />
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-eventify-purple hover:bg-eventify-dark-purple" onClick={() => window.location.href = '/signup?plan=standard'}>
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="border shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute -top-3 right-4">
              <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Premium</CardTitle>
              <CardDescription>For colleges and institutions</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">${premiumPlan.value}</span>
                <span className="text-muted-foreground">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                {premiumPlan.isSale && (
                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                    20% off
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <FeatureItem text="Everything in Standard" />
              <FeatureItem text="Unlimited event listings" />
              <FeatureItem text="Featured placement" />
              <FeatureItem text="Advanced analytics dashboard" />
              <FeatureItem text="Priority support" />
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" onClick={() => window.location.href = '/contact'}>
                Contact Sales
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Feature item with checkmark
const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2">
    <div className="rounded-full p-1 bg-green-100 dark:bg-green-900/30">
      <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
    </div>
    <span className="text-sm">{text}</span>
  </div>
);

export default OrganizersSection;
