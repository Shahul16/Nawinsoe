import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, MessageCircle, Calendar, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

interface CTASectionProps {
  variant?: "default" | "inline" | "floating";
  title?: string;
  subtitle?: string;
  showWhatsApp?: boolean;
  showPhone?: boolean;
  showCalendar?: boolean;
  className?: string;
}

export default function CTASection({
  variant = "default",
  title = "Ready to Start Your Journey?",
  subtitle = "Book a free consultation with our expert counselors today",
  showWhatsApp = true,
  showPhone = true,
  showCalendar = true,
  className = "",
}: CTASectionProps) {
  const [, setLocation] = useLocation();

  const handleContact = () => setLocation("/contact");
  const handleWhatsApp = () => window.open("https://wa.me/919943738177", "_blank");
  const handlePhone = () => window.location.href = "tel:+919943738177";

  if (variant === "inline") {
    return (
      <div className={`flex flex-wrap items-center justify-between gap-4 p-4 bg-gradient-to-r from-[#091f54]/10 to-[#163886]/10 rounded-xl border border-[#091f54]/20 ${className}`}>
        <div>
          <p className="font-semibold text-[#07173d]">{title}</p>
          <p className="text-sm text-[#48608f]">{subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {showWhatsApp && (
            <Button
              onClick={handleWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full"
              size="sm"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          )}
          {showPhone && (
            <Button
              onClick={handlePhone}
              className="bg-[#091f54] hover:bg-[#07173d] text-white rounded-full"
              size="sm"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          )}
          <Button
            onClick={handleContact}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white rounded-full"
            size="sm"
          >
            Free Consultation
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  if (variant === "floating") {
    return (
      <div className={`fixed bottom-6 right-6 z-50 flex flex-col gap-2 ${className}`}>
        {showWhatsApp && (
          <Button
            onClick={handleWhatsApp}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 p-0 shadow-lg"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        )}
        {showPhone && (
          <Button
            onClick={handlePhone}
            className="bg-[#091f54] hover:bg-[#07173d] text-white rounded-full w-14 h-14 p-0 shadow-lg"
            aria-label="Call us"
          >
            <Phone className="w-6 h-6" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card className={`p-8 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8] text-white text-center ${className}`}>
      <h2 className="text-3xl font-bold mb-3">{title}</h2>
      <p className="text-blue-100 mb-6 max-w-2xl mx-auto">{subtitle}</p>
      <div className="flex flex-wrap justify-center gap-4">
        {showCalendar && (
          <Button
            onClick={handleContact}
            className="bg-white text-[#091f54] hover:bg-blue-50 rounded-full px-8 py-6 text-lg font-semibold"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Free Consultation
          </Button>
        )}
        {showWhatsApp && (
          <Button
            onClick={handleWhatsApp}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8 py-6 text-lg font-semibold"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp Us
          </Button>
        )}
        {showPhone && (
          <Button
            onClick={handlePhone}
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-semibold"
          >
            <Phone className="w-5 h-5 mr-2" />
            +91 99437 38177
          </Button>
        )}
      </div>
      <p className="text-blue-200 text-sm mt-4">
        ✓ Free consultation &nbsp; ✓ Expert guidance &nbsp; ✓ 5,000+ successful students
      </p>
    </Card>
  );
}