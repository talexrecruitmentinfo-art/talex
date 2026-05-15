'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  review: string;
  image?: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'James Kipchoge',
    role: 'Software Engineer in Toronto',
    review: 'The official Government of Canada portal provided a secure and transparent process for my visa-sponsored employment. Professional support throughout the entire application.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Grace Wanjiru',
    role: 'Healthcare Professional in Vancouver',
    review: 'Official verification and government oversight ensured the legitimacy of all opportunities. The streamlined process made my transition to Canada seamless.',
    rating: 5,
  },
  {
    id: 3,
    name: 'David Ochieng',
    role: 'Accountant in Calgary',
    review: 'Government-approved platform with real-time application tracking. The official status gave me confidence in the process and led to my successful placement.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Sarah Muthoni',
    role: 'Nurse in Ottawa',
    review: 'Official Canadian government employment services provided the professional framework needed for my career advancement. Highly recommended for serious applicants.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setAutoPlay(false);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setAutoPlay(false);
  };

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">Testimonials</p>
          <h2 className="mt-2 text-4xl font-bold text-slate-900">Success Stories from Our Users</h2>
          <p className="mt-4 text-lg text-slate-600">Join hundreds of Kenyans who landed their dream jobs in Canada</p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 sm:p-12 shadow-lg"
          >
            <div className="flex gap-2 mb-4">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-xl text-slate-800 leading-relaxed mb-6">&quot;{testimonials[current].review}&quot;</p>
            <div className="border-t pt-4">
              <p className="font-semibold text-slate-900">{testimonials[current].name}</p>
              <p className="text-sm text-slate-600">{testimonials[current].role}</p>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute -left-4 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy-600 text-white hover:bg-navy-700 transition shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy-600 text-white hover:bg-navy-700 transition shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrent(index);
                setAutoPlay(false);
              }}
              className={`h-2 rounded-full transition ${
                index === current ? 'bg-brand-500 w-8' : 'bg-slate-300 w-2'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
