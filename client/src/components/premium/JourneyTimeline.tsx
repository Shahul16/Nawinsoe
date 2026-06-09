import React from 'react';

const steps = [
  'Consultation',
  'Profile Assessment',
  'University Selection',
  'Application',
  'Offer Letter',
  'Visa Approval',
  'Departure',
  'Enrollment'
];

export default function JourneyTimeline(){
  return (
    <section className="py-20 bg-[var(--background)]">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--primary)]">Student Journey</h2>
          <p className="text-sm text-[var(--light-gray)] mt-2">A transparent, step-by-step pathway to your university offer</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s,idx)=> (
            <div key={s} className="p-6 rounded-2xl bg-white/90 border border-[rgba(4,15,35,0.04)] shadow-sm text-center">
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-semibold">{idx+1}</div>
              <p className="font-semibold text-[var(--primary)]">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
