import React from 'react';
import { Card } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Eshanth V.',
    uni: 'University of the West of Scotland, London',
    text: 'Nawins guided me through every step — from shortlisting universities to getting my offer letter. The team made a complex process feel simple.',
  },
  {
    name: 'Praveen K.',
    uni: 'Ulster University London (MSc International Business)',
    text: 'My CAS and visa were handled with precision. I am now studying in London thanks to the dedicated support from Nawins Education.',
  },
  {
    name: 'Deepan K.',
    uni: 'The University of Law, Business School',
    text: 'Received my conditional offer within weeks of applying. The counseling team knew exactly which universities matched my profile.',
  },
];

export default function TestimonialsPremium() {
  return (
    <section className="py-20 bg-[var(--sidebar)]">
      <div className="container">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--primary)]">Success Stories</h2>
          <p className="text-sm text-[var(--light-gray)] mt-2">Real students. Real results.</p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <Card key={t.name} className="rounded-3xl p-6 border border-[rgba(4,15,35,0.04)]">
              <p className="italic text-[var(--primary)] mb-4">"{t.text}"</p>
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-[var(--light-gray)]">{t.uni}</p>
            </Card>
          ))}
        </div>

        {/* Google Form CTA */}
        <div className="text-center mt-12">
          <p className="text-sm text-[var(--light-gray)] mb-4">
            Are you a Nawins Education student? Share your experience!
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScJ30ZR12bCsU05PnTbyB6nZc0KW3W5EpY6oUzTcsMXpkEeDw/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#C59D50] px-6 py-2.5 text-sm font-semibold text-[#C59D50] hover:bg-[#C59D50] hover:text-white transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-5 8h8v-2H8v2zm0-4h8v-2H8v2zm0-4h5V7H8v2z"/>
            </svg>
            Submit Your Testimonial
          </a>
        </div>

      </div>
    </section>
  );
}
