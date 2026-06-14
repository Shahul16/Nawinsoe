import React from 'react';
import {
  MessageSquare, Search, FileText, Send, Mail,
  Users, CreditCard, ShieldCheck, Plane, GraduationCap
} from 'lucide-react';

const steps = [
  { num: 1, title: 'Free Consultation',   desc: 'Discuss your goals with our senior counselor', icon: MessageSquare, color: 'bg-blue-600' },
  { num: 2, title: 'Profile Assessment',  desc: 'Academic profile review and country matching', icon: Search,        color: 'bg-indigo-600' },
  { num: 3, title: 'University Selection',desc: 'Shortlist best-fit universities and courses',  icon: GraduationCap, color: 'bg-violet-600' },
  { num: 4, title: 'Application & SOP',   desc: 'Submit documents and Statement of Purpose',   icon: FileText,      color: 'bg-purple-600' },
  { num: 5, title: 'Offer Letter',        desc: 'Receive conditional or unconditional offer',  icon: Mail,          color: 'bg-fuchsia-600' },
  { num: 6, title: 'Interview Prep',      desc: 'Visa interview coaching and mock sessions',   icon: Users,         color: 'bg-rose-600' },
  { num: 7, title: 'Payment & CAS',       desc: 'Tuition deposit and CAS Shield processing',  icon: CreditCard,    color: 'bg-orange-600' },
  { num: 8, title: 'Visa Application',    desc: 'UKVI student visa submission and tracking',  icon: ShieldCheck,   color: 'bg-amber-600' },
  { num: 9, title: 'Pre-Departure',       desc: 'Travel, accommodation and arrival briefing', icon: Plane,         color: 'bg-yellow-600' },
  { num: 10,title: 'Enrollment',          desc: 'Arrive, enroll, and begin your new journey', icon: GraduationCap, color: 'bg-green-600' },
];

export default function JourneyTimeline() {
  return (
    <section className="py-20 bg-[#040F23]">
      <div className="container">
        <div className="text-center mb-14">
          <span className="inline-block rounded-full bg-[#C59D50]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#C59D50] mb-4">
            Your Roadmap
          </span>
          <h2 className="text-4xl font-bold text-white mb-3">Student Journey</h2>
          <p className="text-blue-100/80 max-w-2xl mx-auto">
            A transparent, step-by-step pathway — from your first consultation to enrollment day.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600/20 via-[#C59D50]/40 to-green-600/20 mx-8" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.num} className="relative flex flex-col items-center text-center group">
                  {/* Step circle */}
                  <div className={`relative z-10 h-20 w-20 rounded-full ${s.color} flex flex-col items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white mb-0.5" />
                    <span className="text-[10px] font-bold text-white/80">Step {s.num}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1 leading-tight">{s.title}</h3>
                  <p className="text-xs text-blue-200/70 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-14 text-center">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C59D50] to-[#B78D42] px-8 py-3 text-sm font-semibold text-[#040F23] hover:opacity-95 transition shadow-lg"
          >
            Start Your Journey Today
          </a>
        </div>
      </div>
    </section>
  );
}
