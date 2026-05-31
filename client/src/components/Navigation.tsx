import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";

export default function Navigation() {
  const [location, setLocation] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Universities", href: "/universities" },
    { label: "Tasks", href: "/tasks" },
    { label: "Blogs", href: "/blogs" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#04133a]/80 backdrop-blur-xl">
      <div className="container flex items-center justify-between py-3">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setLocation("/")}>
          <div className="brand-logo" title="Nawins Education">
            <Logo className="h-12 w-12 object-contain" width={48} height={48} />
          </div>
          <div className="hidden sm:block">
            <p className="font-bold text-white tracking-wide">Nawins</p>
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/80">Overseas Education</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => setLocation(link.href)}
              aria-current={location === link.href ? "page" : undefined}
              className={`rounded-full px-3 py-2 text-sm font-medium transition-all ${
                location === link.href
                  ? "bg-white text-[#04133a]"
                  : "text-blue-100 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Enroll Now Button & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setLocation("/contact")}
            className="hidden sm:block rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-6 text-white hover:from-pink-400 hover:to-purple-500"
            aria-label="Enroll Now"
            >
              Enroll Now
            </Button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden rounded-md border border-white/20 bg-white/10 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
      <div id="mobile-navigation" className="lg:hidden border-t border-white/15 bg-[#051845] py-4">
          <div className="container space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  setLocation(link.href);
                  setMobileOpen(false);
                }}
                className={`block w-full rounded-md px-3 py-2 text-left font-medium transition-colors ${
                  location === link.href
                    ? "bg-white text-[#0b1a44]"
                    : "text-blue-100 hover:bg-white/10"
                }`}
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => {
                setLocation("/contact");
                setMobileOpen(false);
              }}
              className="mt-4 w-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-400 hover:to-purple-500"
            >
              Enroll Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
