import React from 'react';
import { Card } from '@/components/ui/card';
import { BookOpen, Users, Briefcase, Globe, Award, Heart } from 'lucide-react';

const services = [
  {id:'counseling',title:'Student Counseling',icon:Users},
  {id:'course',title:'Course Selection',icon:BookOpen},
  {id:'application',title:'Application Processing',icon:Briefcase},
  {id:'scholar',title:'Scholarship Assistance',icon:Award},
  {id:'visa',title:'Visa Guidance',icon:Globe},
  {id:'accom',title:'Accommodation Support',icon:Heart},
];

export default function ServicesGrid(){
  return (
    <section className="py-20 bg-[var(--background)]">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--primary)]">Our Services</h2>
          <p className="text-sm text-[var(--light-gray)] mt-2">End-to-end support for students and partners</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(s=>{
            const Icon = s.icon;
            return (
              <Card key={s.id} className="rounded-3xl p-6 border border-[rgba(4,15,35,0.06)] hover:shadow-xl transition-all">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--accent-foreground)]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--primary)] mb-2">{s.title}</h3>
                <p className="text-sm text-[var(--light-gray)]">Comprehensive, personalised support tailored to your goals.</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
