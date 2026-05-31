import React from 'react';

const logos = new Array(12).fill(0).map((_,i)=>`partner-${i}`);

export default function PartnersWall(){
  return (
    <section className="py-16 bg-[linear-gradient(180deg,var(--sidebar),#ffffff)]">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-[var(--primary)]">Our University Partners</h2>
          <p className="text-sm text-[var(--light-gray)] mt-2">Trusted by leading institutions worldwide</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 items-center">
          {logos.map((l,idx)=>(
            <div key={l} className="flex items-center justify-center p-4 bg-white/60 rounded-lg shadow-sm">
              <div className="h-10 w-24 bg-gradient-to-r from-[rgba(197,157,80,0.2)] to-[rgba(4,15,35,0.04)] rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
