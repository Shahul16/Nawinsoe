import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import Logo from "@/components/shared/Logo";

export default function Footer() {
  const [, setLocation] = useLocation();

const footerLinks = {
  Company: [
    { id: "about-us", label: "About Us", href: "/about" },
    { id: "services", label: "Services", href: "/services" },
    { id: "destinations", label: "Destinations", href: "/destinations" },
    { id: "universities", label: "Universities", href: "/universities" },
    { id: "contact", label: "Contact", href: "/contact" },
  ],
Resources: [
  { id: "success-stories", label: "Success Stories", href: "/success-stories" },
  { id: "blogs", label: "Blogs", href: "/blogs" },
  { id: "gallery", label: "Gallery", href: "/gallery" },
  { id: "faq", label: "FAQ", href: "/faq" },
  { id: "consultation", label: "Book Consultation", href: "/contact" },
],
  Legal: [
    { id: "privacy", label: "Privacy Policy", href: "/privacy" },
    { id: "terms", label: "Terms of Service", href: "/terms" },
    { id: "cookies", label: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  {
    id: "facebook",
    icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=61590763943705",
    label: "Facebook",
  },
  {
    id: "linkedin",
    icon: Linkedin,
    href: "https://www.linkedin.com/company/nawins-education/",
    label: "LinkedIn",
  },
  {
    id: "instagram",
    icon: Instagram,
    href: "https://www.instagram.com/nawins_education/",
    label: "Instagram",
  },
  {
  id: "google",
  icon: MapPin,
  href: "https://maps.app.goo.gl/6vQP9QaPtvaMpx1A8",
  label: "Google Business Profile",
}
];

  const handleFooterNavigation = (href: string, label: string) => {
    if (href.startsWith("/")) {
      setLocation(href);
      return;
    }

    toast.info(`${label} is coming soon.`);
  };

  return (
    <footer className="relative overflow-hidden bg-[#030f2d] text-blue-100">
      <div className="pointer-events-none absolute -top-32 left-0 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />
      <div className="container relative py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
                <div className="relative">
                <div className="absolute inset-0 rounded-full bg-amber-300/30 blur-md" />
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Logo className="absolute inset-0 w-full h-full" width={48} height={48} />
                </div>
              </div>
              <div>
                <p className="font-bold tracking-wide text-white">Nawins Education</p>
                <p className="text-xs uppercase tracking-[0.18em] text-blue-200/90">Global Education Consultants</p>
              </div>
            </div>
            <p className="text-sm text-blue-100/75">
              Empowering Minds. Building Futures.
              <br />
              Trusted overseas education consultants helping students pursue higher education opportunities in the UK, Canada, Australia, Ireland, Germany and beyond.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={`footer-category-${category}`}>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={`footer-link-${link.id}`}>
                    <button
                      onClick={() => handleFooterNavigation(link.href, link.label)}
                      className="text-sm text-blue-100/80 transition-colors hover:text-amber-300"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-300" />
                <a href="mailto:info@nawinsedutech.com" className="text-sm text-blue-100/90 hover:text-amber-300">
                  info@nawinsedutech.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-300" />
                <a href="tel:+919943738177" className="text-sm text-blue-100/90 hover:text-amber-300">
                  +91 99437 38177
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-1 h-4 w-4 text-amber-300" />
                <p className="text-sm text-blue-100/90">No 59/3 - 13/4, 3rd Floor, HDFC Bank Upstairs, Marappa Gounder Plaza, West Car Street, Tiruchengode, Namakkal – 637211</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="flex flex-col items-center justify-between border-t border-white/15 pt-8 md:flex-row">
          <div className="w-full">
            <p className="text-sm text-blue-100/70 mb-3 text-center md:text-left">
              Follow us and read our latest student success stories.
            </p>

            <div className="flex gap-4 mb-4 md:mb-0">
              {socialLinks.map((social) => (
                <a
                  key={`social-${social.id}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.label}`}
                  className="rounded-full border border-white/20 bg-white/5 p-2 text-blue-100/80 transition-all hover:border-amber-300/40 hover:text-amber-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <p className="text-sm text-blue-100/60 text-center md:text-right">
            © 2026 Nawins Edutech Private Limited. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
