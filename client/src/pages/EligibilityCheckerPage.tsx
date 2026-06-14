import { useState } from "react";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, ExternalLink, GraduationCap } from "lucide-react";
import { useLocation } from "wouter";

const steps = [
  {
    q: "What is your highest qualification?",
    key: "edu",
    opts: ["10th Standard", "12th / HSC / Diploma", "Bachelor's Degree (3yr)", "Bachelor's Degree (4yr)", "Postgraduate / Master's"],
  },
  {
    q: "Which country do you want to study in?",
    key: "country",
    opts: ["United Kingdom", "Ireland", "Germany", "Canada", "Australia", "New Zealand"],
  },
  {
    q: "What is your total study budget?",
    key: "budget",
    opts: ["Under ₹15 Lakhs", "₹15 – ₹25 Lakhs", "₹25 – ₹50 Lakhs", "₹50 Lakhs+"],
  },
  {
    q: "Do you have an English test score?",
    key: "english",
    opts: ["IELTS 7.0+", "IELTS 6.5", "IELTS 6.0", "IELTS 5.5", "PTE / TOEFL", "Not yet taken"],
  },
];

type Results = {
  eligible: boolean;
  universities: { name: string; url: string; intake: string; min_ielts: string }[];
  message: string;
  next: string;
};

function getResults(answers: Record<string, string>): Results {
  const isUK = answers.country === "United Kingdom";
  const hasEnglish = !["Not yet taken"].includes(answers.english || "");
  const hasDegree = ["Bachelor's Degree (3yr)", "Bachelor's Degree (4yr)", "Postgraduate / Master's"].includes(answers.edu || "");
  const has12th = answers.edu === "12th / HSC / Diploma";
  const budget = answers.budget || "";

  if (isUK && hasDegree && hasEnglish) {
    return {
      eligible: true,
      universities: [
        { name: "University of Greenwich", url: "https://www.gre.ac.uk", intake: "Jan / Sep 2026", min_ielts: "IELTS 6.0" },
        { name: "University of Roehampton", url: "https://www.roehampton.ac.uk", intake: "Jan / Sep 2026", min_ielts: "IELTS 6.0" },
        { name: "Ulster University London", url: "https://www.ulster.ac.uk", intake: "Jan / Sep 2026", min_ielts: "IELTS 6.0" },
        { name: "The University of Law", url: "https://www.law.ac.uk", intake: "Jan / May / Sep", min_ielts: "IELTS 6.5" },
        { name: "University of East London", url: "https://www.uel.ac.uk", intake: "Jan / Sep 2026", min_ielts: "IELTS 6.0" },
      ],
      message: "Great news! Based on your profile, you are eligible for multiple UK universities.",
      next: "Book a free consultation to get your personalised shortlist and SOP guidance.",
    };
  }

  if (isUK && has12th && hasEnglish) {
    return {
      eligible: true,
      universities: [
        { name: "University of the West of Scotland", url: "https://www.uws.ac.uk", intake: "Sep 2026", min_ielts: "IELTS 6.0" },
        { name: "Regent College London", url: "https://www.rcl.ac.uk", intake: "Jan / Sep 2026", min_ielts: "IELTS 5.5" },
      ],
      message: "You are eligible for UK undergraduate programmes!",
      next: "Book a free consultation to explore 3-year and 4-year undergraduate options.",
    };
  }

  if (isUK && !hasEnglish) {
    return {
      eligible: true,
      universities: [
        { name: "University of Greenwich (with pathway)", url: "https://www.gre.ac.uk", intake: "Jan / Sep 2026", min_ielts: "Pre-sessional available" },
        { name: "University of Roehampton (pre-sessional)", url: "https://www.roehampton.ac.uk", intake: "Sep 2026", min_ielts: "Pre-sessional available" },
      ],
      message: "You can still study in the UK! Many universities offer pre-sessional English programmes.",
      next: "Book a free consultation — we'll help you prepare your IELTS and apply to the right universities.",
    };
  }

  return {
    eligible: true,
    universities: [],
    message: `Based on your profile, we can help you explore study options in ${answers.country || "your target country"}.`,
    next: "Book a free consultation to discuss your options in detail with our senior counselor.",
  };
}

export default function EligibilityChecker() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Results | null>(null);

  const current = steps[step];

  const select = (val: string) => {
    const updated = { ...answers, [current.key]: val };
    setAnswers(updated);
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setResults(getResults(updated));
    }
  };

  const reset = () => { setStep(0); setAnswers({}); setResults(null); };

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      <section className="py-16 bg-gradient-to-br from-[#030f2d] via-[#06226b] to-[#081b4e]">
        <div className="container text-center max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-[#C59D50]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#C59D50] mb-5">
            Free Tool
          </span>
          <h1 className="text-4xl font-bold text-white mb-3">Eligibility Checker</h1>
          <p className="text-blue-100/85">Answer 4 quick questions to find out which universities you qualify for.</p>
          {!results && (
            <div className="flex justify-center gap-2 mt-6">
              {steps.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${i <= step ? "w-10 bg-[#C59D50]" : "w-5 bg-white/20"}`} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-xl mx-auto">
          {!results ? (
            <div className="bg-white rounded-2xl border border-blue-100 p-8 shadow-sm">
              <p className="text-xs font-semibold text-[#C59D50] uppercase tracking-widest mb-3">
                Question {step + 1} of {steps.length}
              </p>
              <h2 className="text-xl font-bold text-[#07173d] mb-6">{current.q}</h2>
              <div className="space-y-3">
                {current.opts.map(opt => (
                  <button key={opt} onClick={() => select(opt)}
                    className="w-full text-sm rounded-xl border border-blue-100 p-3.5 text-left text-[#07173d] font-medium hover:border-[#C59D50] hover:bg-amber-50 hover:text-[#C59D50] transition-all flex items-center justify-between group">
                    {opt}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="mt-4 text-xs text-[#94a3b8] hover:text-[#48608f]">
                  ← Back
                </button>
              )}
            </div>
          ) : (
            <div>
              <div className={`rounded-2xl p-7 mb-6 text-center ${results.eligible ? "bg-green-50 border border-green-100" : "bg-amber-50 border border-amber-100"}`}>
                <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h2 className="text-xl font-bold text-[#07173d] mb-2">{results.message}</h2>
                <p className="text-sm text-[#48608f]">{results.next}</p>
              </div>

              {results.universities.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-widest mb-3">Matching Universities</p>
                  <div className="space-y-3">
                    {results.universities.map(u => (
                      <a key={u.name} href={u.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-xl border border-blue-100 bg-white p-4 hover:border-[#294fca] hover:shadow-md transition-all group">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <GraduationCap className="w-4 h-4 text-[#294fca]" />
                            <p className="text-sm font-bold text-[#07173d] group-hover:text-[#294fca] transition-colors">{u.name}</p>
                          </div>
                          <p className="text-xs text-[#94a3b8]">Intake: {u.intake} · Min: {u.min_ielts}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-[#94a3b8] group-hover:text-[#294fca] flex-shrink-0 transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => setLocation("/book-consultation")}
                  className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#17337d] to-[#2854c8] text-white font-semibold">
                  Book Free Consultation
                </Button>
                <Button onClick={() => setLocation("/free-assessment")} variant="outline"
                  className="flex-1 h-12 rounded-xl border-[#C59D50] text-[#C59D50] hover:bg-amber-50 font-semibold">
                  Get Full Assessment
                </Button>
              </div>
              <button onClick={reset} className="w-full mt-3 text-xs text-[#94a3b8] hover:text-[#48608f]">
                Start over
              </button>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
