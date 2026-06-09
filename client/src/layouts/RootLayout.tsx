import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import SeoManager from "@/components/shared/SeoManager";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <SeoManager />
          <a
            href="#main-content"
            className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-[#04133a] focus:px-3 focus:py-2"
          >
            Skip to content
          </a>
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
