import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Aman Sharma",
    role: "Freelancer",
    content:
      "This scheduler completely changed how I manage my clients. Super easy and fast!",
  },
  {
    name: "Priya Singh",
    role: "Startup Founder",
    content: "No more back-and-forth emails. Booking meetings is now seamless.",
  },
  {
    name: "Rahul Verma",
    role: "Developer",
    content: "Clean UI and powerful features. Exactly what I needed!",
  },
];

import React from "react";

const Testimonial = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>

        <Carousel className="max-w-3xl mx-auto">
          <CarouselContent>
            {testimonials.map((t, index) => (
              <CarouselItem key={index}>
                <div className="p-6">
                  <div className="bg-white rounded-2xl shadow-md p-8 space-y-4">
                    <p className="text-gray-600 italic">“{t.content}”</p>

                    <div>
                      <h4 className="font-semibold">{t.name}</h4>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonial;
