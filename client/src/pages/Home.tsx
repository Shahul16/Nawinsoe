import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MotionWrapper from "@/components/animations/MotionWrapper";
import Reveal from "@/components/animations/Reveal";
import ServicesGrid from "@/components/premium/ServicesGrid";
import Destinations from "@/components/premium/Destinations";
import PartnersWall from "@/components/premium/PartnersWall";
import JourneyTimeline from "@/components/premium/JourneyTimeline";
import TestimonialsPremium from "@/components/premium/TestimonialsPremium";
import ContactFormPremium from "@/components/premium/ContactFormPremium";
import Logo from "@/components/Logo";
import CTASection from "@/components/CTASection";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <MotionWrapper className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#030f2d] via-[#06226b] to-[#081b4e] pb-28 pt-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-12 right-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute -bottom-16 left-8 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="mb-4 inline-flex rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                Nawins Education — Global Education Consultants
              </span>
              <h1 className="mb-6 text-5xl font-extrabold leading-tight text-white lg:text-6xl">
                Empowering Minds. Building Futures.
              </h1>
              <p className="mb-8 text-lg text-white/90 lg:text-xl">
                Connecting ambitious students with leading universities across the UK, Europe, Canada, Australia and beyond.
              </p>

              {/* CTA Buttons */}
              <div className="mb-8 flex flex-wrap gap-3">
                <Button onClick={() => setLocation('/contact')} className="rounded-full bg-gradient-to-r from-[#C59D50] to-[#B78D42] px-8 py-3 font-semibold text-[#040F23] shadow-lg">
                  Apply Now
                </Button>
                <Button onClick={() => setLocation('/contact')} variant="outline" className="rounded-full border border-white/20 bg-transparent px-6 py-3 text-white">
                  Book Consultation
                </Button>
              </div>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-md">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-white">500+</p>
                  <p className="text-sm text-white/80">Students Guided</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-white">10+</p>
                  <p className="text-sm text-white/80">University Partners</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-white">15+</p>
                  <p className="text-sm text-white/80">Destination Countries</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-white">95%</p>
                  <p className="text-sm text-white/80">Visa Success</p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative mx-auto max-w-md rounded-[2rem] border border-white/20 bg-white/10 p-7 backdrop-blur-md">
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-100">Nawins Educationh</p>
                  <span className="rounded-full bg-amber-300/20 px-3 py-1 text-xs text-amber-100">Trusted</span>
                </div>
                <div className="glass-surface rounded-3xl p-6">
                  <div className="brand-logo mx-auto rounded-2xl p-3" style={{ maxWidth: 220 }}>
                    <Logo className="mx-auto h-48 w-auto" width={192} height={192} />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-xl bg-white/60 px-2 py-3">
                      <p className="text-lg font-bold text-[#04133a]">98%</p>
                      <p className="text-xs text-[#3a4d7a]">Visa Success</p>
                    </div>
                    <div className="rounded-xl bg-white/60 px-2 py-3">
                      <p className="text-lg font-bold text-[#04133a]">12+</p>
                      <p className="text-xs text-[#3a4d7a]">Years</p>
                    </div>
                    <div className="rounded-xl bg-white/60 px-2 py-3">
                      <p className="text-lg font-bold text-[#04133a]">5000+</p>
                      <p className="text-xs text-[#3a4d7a]">Students</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Premium Sections (scaffolded components) */}
      <Reveal><ServicesGrid /></Reveal>
      <Reveal delay={0.08}><Destinations /></Reveal>
      <Reveal delay={0.16}><PartnersWall /></Reveal>
      <Reveal delay={0.24}><JourneyTimeline /></Reveal>
      <Reveal delay={0.32}><TestimonialsPremium /></Reveal>
      <Reveal delay={0.36}><ContactFormPremium /></Reveal>

      {/* CTA Section */}
      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <CTASection
            title="Ready to Start Your Study Abroad Journey?"
            subtitle="Get expert guidance from our counselors and turn your dreams into reality"
          />
        </div>
      </section>
      <Footer />
    </MotionWrapper>
  );
}
