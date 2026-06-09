import React from 'react';
import { Card } from '@/components/ui/card';

const testimonials = [
  { name: 'Arjun', uni: 'University of Oxford', text: 'Nawins made the complex process effortless. I received my offer within weeks.' },
  { name: 'Sara', uni: 'University of Toronto', text: 'Professional, timely, and truly caring advisors.' },
  { name: 'Liam', uni: 'University of Melbourne', text: 'Visa guidance was precise and helped me travel with confidence.' },
];

export default function TestimonialsPremium(){
  return (
    <section className="py-20 bg-[var(--sidebar)]">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--primary)]">Success Stories</h2>
          <p className="text-sm text-[var(--light-gray)] mt-2">Real students. Real results.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t=>(
            <Card key={t.name} className="rounded-3xl p-6 border border-[rgba(4,15,35,0.04)]">
              <p className="italic text-[var(--primary)] mb-4">“{t.text}”</p>
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-[var(--light-gray)]">{t.uni}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
