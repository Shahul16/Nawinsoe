import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/CTASection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { CheckCircle2, FileText, GraduationCap, ShieldCheck, Clock } from "lucide-react";
import { useMemo, useState } from "react";

const STEPS = [
  {
    icon: FileText,
    title: "1) Prepare your documents",
    body:
      "We help you collect the right academic + personal documents (transcripts, passport, SOP, financial proof) and ensure they match your course & intake.",
  },
  {
    icon: GraduationCap,
    title: "2) Build the right university application",
    body:
      "We shortlist universities based on eligibility, course fit, and visa strategy. Then we support your application with clear guidance on course selection and documents.",
  },
  {
    icon: ShieldCheck,
    title: "3) Visa application + compliance",
    body:
      "We verify your visa readiness, timelines, and key compliance points. We also guide you on CAS, BRP/biometrics steps, and travel planning.",
  },
  {
    icon: Clock,
    title: "4) Post-arrival support",
    body:
      "Get support after arrival for BRP/registration tasks and how to stay compliant throughout your studies to avoid issues with UKVI.",
  },
];

export default function VisaGuidancePage() {
  const [, setLocation] = useLocation();
  const [activeStep, setActiveStep] = useState(0);

  const checklist = useMemo(
    () => [
      "Passport validity check (6+ months beyond course end)",
      "CAS number + university offer letter",
      "SOP guidance and course rationale",
      "Financial proof review",
      "Biometrics appointment timeline guidance",
      "Arrival + BRP collection planning",
      "Compliance tips for attendance & reporting",
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-[#030f2d] via-[#06226b] to-[#081b4e]">
        <div className="container max-w-4xl">
          <span className="inline-block rounded-full bg-[#C59D50]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#C59D50] mb-5">
            Visa Guidance
          </span>
          <h1 className="text-5xl font-bold text-white mb-4">UK Student Visa Support</h1>
          <p className="text-blue-100/85 text-lg">
            Step-by-step visa guidance for Indian students — from document preparation to post-arrival compliance.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container max-w-5xl space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Card className="p-6 border border-blue-100 bg-white">
              <h2 className="text-2xl font-bold text-[#07173d] mb-4">How we guide you</h2>
              <div className="space-y-3">
                {STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = idx === activeStep;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={
                        "w-full text-left rounded-2xl border p-4 transition-all " +
                        (isActive
                          ? "border-[#C59D50]/50 bg-[#C59D50]/10"
                          : "border-blue-100 bg-white hover:bg-blue-50/40")
                      }
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={
                            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 " +
                            (isActive ? "bg-[#C59D50] text-white" : "bg-blue-50 text-[#07173d]")
                          }
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-[#07173d]">{step.title}</p>
                          {isActive && <p className="text-sm text-[#48608f] mt-1">{step.body}</p>}
                          {!isActive && <p className="text-sm text-[#48608f] mt-1">Click to view details</p>}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6 border border-blue-100 bg-white">
              <h3 className="text-xl font-bold text-[#07173d] mb-4">Document readiness checklist</h3>
              <div className="space-y-3">
                {checklist.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <p className="text-sm text-[#48608f] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  onClick={() => setLocation("/free-assessment")}
                  className="bg-[#C59D50] hover:bg-[#B78D42] text-white rounded-full px-6"
                >
                  Free Assessment
                </Button>
                <Button
                  onClick={() => setLocation("/book-consultation")}
                  variant="outline"
                  className="border-[#C59D50]/50 text-[#07173d] hover:bg-[#C59D50]/10 rounded-full px-6"
                >
                  Book Consultation
                </Button>
              </div>

              <p className="text-xs text-[#48608f] mt-4">
                Note: Requirements vary by course/university. We verify your specific case during consultation.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <CTASection
            title="Need visa clarity?"
            subtitle="Book a call and get a personalized UK visa roadmap for your course and intake."
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

