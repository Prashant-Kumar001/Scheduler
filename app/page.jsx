import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, LinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import Testimonial from "@/components/testimonials";

const features = [
  {
    icon: Clock,
    title: "Manage your time like a pro",
    description:
      "Create events, set availability, and track your schedule effortlessly.",
  },
  {
    icon: LinkIcon,
    title: "Custom Links",
    description: "Share your personalized scheduling link with anyone.",
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Create an account",
    description: "Sign up quickly with your email.",
  },
  {
    step: 2,
    title: "Set Availability",
    description: "Choose your available time slots.",
  },
  {
    step: 3,
    title: "Share your link",
    description: "Send your link to others.",
  },
  {
    step: 4,
    title: "Get Booked",
    description: "Receive bookings automatically.",
  },
];

const Page = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="container mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 space-y-6">
          <Badge className="bg-purple-100 text-purple-700">
            Smart Scheduling
          </Badge>

          <h1 className="text-5xl lg:text-6xl font-bold leading-tight bg-linear-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
            Simplify Your Scheduling
          </h1>

          <p className="text-lg text-gray-600">
            Manage meetings, automate bookings, and save time — all in one
            place.
          </p>

          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button size="lg">Get Started</Button>
            </Link>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="rounded-3xl bg-linear-to-r from-purple-500 to-pink-500 p-1 shadow-xl">
            <div className="bg-white rounded-3xl p-10 text-center">
              <p className="text-gray-500">App Preview</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose Scheduler?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Card key={i} className="hover:shadow-lg transition">
                  <CardContent className="p-6 text-left space-y-4">
                    <Icon className="w-8 h-8 text-purple-600" />
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {howItWorks.map((item) => (
              <Card key={item.step} className="text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-full bg-purple-600 text-white font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Testimonial />

      <section className=" bg-white py-20 text-center ">
        <h2 className="text-3xl font-bold mb-6">Ready to save time?</h2>
        <p className="mb-6">Start scheduling smarter today.</p>

        <Link href="/dashboard">
          <Button size="lg" variant="secondary">
            Get Started
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Page;
