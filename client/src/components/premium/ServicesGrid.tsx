import React from 'react';
import { useLocation } from 'wouter';
import {
  Users, BookOpen, Briefcase, Award, Globe, FileText, GraduationCap, MapPin
} from 'lucide-react';

const services = [
  {
    id: 'counseling',
    title: 'Free Student Counseling',
    desc: 'Personalised one-on-one guidance to help you choose the right course, country, and university based on your academic profile and career goals.',
    icon: Users,
    color: 'bg-blue-50 text-blue-700 border-blue-100',
  },
  {
    id: 'course',
    title: 'Course & University Selection',
    desc: 'We match your qualifications and ambitions with the best-fit universities and programs across the UK, Ireland, Germany, and beyond.',
    icon: BookOpen,
    color: 'bg-amber-50 text-amber-700 border-amber-100',
  },
  {
    id: 'application',
    title: 'Application & SOP Support',
    desc: 'End-to-end application management — from crafting your Statement of Purpose to submitting verified documents to partner universities.',
    icon: FileText,
    color: 'bg-purple-50 text-purple-700 border-purple-100',
  },
  {
    id: 'visa',
    title: 'Visa Guidance & CAS',
    desc: 'Expert support for UK Student Visa applications, CAS Shield processing, financial document preparation, and UKVI compliance.',
    icon: Globe,
    color: 'bg-green-50 text-green-700 border-green-100',
  },
  {
    id: 'scholar',
    title: 'Scholarship Assistance',
    desc: 'We identify and help you apply for scholarships, bursaries, and tuition waivers available at partner universities.',
    icon: Award,
    color: 'bg-rose-50 text-rose-700 border-rose-100',
  },
  {
    id: 'predep',
    title: 'Pre-Departure Orientation',
    desc: 'Comprehensive briefings on accommodation, travel, banking, student life, and what to expect on arrival in your chosen country.',
    icon: MapPin,
    color: 'bg-teal-50 text-teal-700 border-teal-100',
  },
];

export default function ServicesGrid() {
  const [, setLocation] = useLocation();

  return (
    <section className="py-20 bg-[#f7f9ff]">
      <div className="container">
        <div className="text-center mb-14">
          <span className="inline-block rounded-full bg-[#C59D50]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#C59D50] mb-4">
            What We Offer
          </span>
          <h2 className="text-4xl font-bold text-[#07173d] mb-3">Our Services</h2>
          <p className="text-lg text-[#48608f] max-w-2xl mx-auto">
            End-to-end support — from your first consultation to the moment you land at your university.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="group rounded-2xl bg-white border border-blue-100/70 p-7 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
                onClick={() => setLocation('/services')}
              >
                <div className={`mb-5 inline-flex h-13 w-13 items-center justify-center rounded-xl border p-3 ${s.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#07173d] mb-2 group-hover:text-[#1a3a8c] transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-[#48608f] leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setLocation('/services')}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#17337d] to-[#2854c8] px-8 py-3 text-sm font-semibold text-white hover:from-[#20449f] hover:to-[#3060d8] transition-all shadow-md"
          >
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
}
