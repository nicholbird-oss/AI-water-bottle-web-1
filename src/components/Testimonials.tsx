import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah J.',
    role: 'Outdoor Enthusiast',
    content: 'The Pure Steel bottle is incredible. It keeps my water ice-cold for 24 hours even in the desert heat. Best purchase I\'ve made this year!',
    rating: 5,
  },
  {
    name: 'Michael R.',
    role: 'Gym Regular',
    content: 'Solid, beautiful design. The grip is perfect, and it fits in every car cup holder I\'ve tried. High quality hardware.',
    rating: 5,
  },
  {
    name: 'Emily L.',
    role: 'Office Professional',
    content: 'I get compliments on the Silver finish every day at work. It\'s sleek, leak-proof, and feels very premium.',
    rating: 5,
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-neutral-50">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Trusted by Thirsty People Everywhere
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Don't just take our word for it. Here's what our community has to say.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-neutral-700 italic">"{testimonial.content}"</p>
              </div>
              <div className="mt-6 pt-6 border-t border-neutral-50">
                <p className="font-bold text-neutral-900">{testimonial.name}</p>
                <p className="text-sm text-neutral-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
