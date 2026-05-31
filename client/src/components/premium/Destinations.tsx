import React from "react";
import { Card } from "@/components/ui/card";

const countries = [
  { name: 'United Kingdom', programs: ['Business', 'CS', 'Engineering'], count: 120 },
  { name: 'Canada', programs: ['MBA', 'Computer Science'], count: 80 },
  { name: 'Australia', programs: ['Nursing', 'Engineering'], count: 65 },
  { name: 'Ireland', programs: ['Business', 'Law'], count: 28 },
  { name: 'Germany', programs: ['Engineering', 'Design'], count: 54 },
  { name: 'Europe', programs: ['Finance', 'Arts'], count: 200 },
];

export default function Destinations() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[var(--primary-foreground)]">Destinations</h2>
          <p className="text-lg text-[var(--light-gray)] mt-2">Explore our partner destinations and popular programs</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((c) => (
            <Card key={c.name} className="rounded-3xl p-6 border border-[rgba(4,15,35,0.06)] hover:shadow-2xl transition-shadow">
              <div className="h-40 w-full rounded-xl bg-gradient-to-br from-[rgba(4,15,35,0.6)] to-[rgba(197,157,80,0.08)] flex items-end p-4 text-white">
                <div>
                  <h3 className="text-2xl font-semibold">{c.name}</h3>
                  <p className="text-sm opacity-90">{c.count}+ universities</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-[var(--light-gray)]">Popular programs: {c.programs.join(', ')}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
