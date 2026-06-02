import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import SeoManager from "./components/SeoManager";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Tasks from "./pages/Tasks";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Faq from "./pages/Faq";
import React, { Suspense } from "react";

const Universities = React.lazy(() => import("./pages/Universities"));
const Gallery = React.lazy(() => import("./pages/Gallery"));
const Destinations = React.lazy(() => import("./pages/Destinations"));
const SuccessStories = React.lazy(() => import("./pages/SuccessStories"));
const StudyInUK = React.lazy(() => import("./pages/StudyInUK"));
const StudyInCanada = React.lazy(() => import("./pages/StudyInCanada"));
const StudyInAustralia = React.lazy(() => import("./pages/StudyInAustralia"));
const StudyInIreland = React.lazy(() => import("./pages/StudyInIreland"));

function Router() {
  return (
    <Suspense fallback={<div aria-hidden className="min-h-screen" /> }>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/about"} component={About} />
        <Route path={"/services"} component={Services} />
        <Route path={"/destinations"} component={Destinations} />
        <Route path={"/success-stories"} component={SuccessStories} />
        <Route path={"/universities"} component={Universities} />
        <Route path={"/blogs"} component={Blogs} />
        <Route path={"/gallery"} component={Gallery} />
        <Route path={"/contact"} component={Contact} />
        <Route path={"/tasks"} component={Tasks} />
        <Route path={"/privacy"} component={Privacy} />
        <Route path={"/terms"} component={Terms} />
        <Route path={"/cookies"} component={Cookies} />
        <Route path={"/faq"} component={Faq} />
        <Route path={"/study-in-uk"} component={StudyInUK} />
        <Route path={"/study-in-canada"} component={StudyInCanada} />
        <Route path={"/study-in-australia"} component={StudyInAustralia} />
        <Route path={"/study-in-ireland"} component={StudyInIreland} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <SeoManager />
          <a href="#main-content" className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-[#04133a] focus:px-3 focus:py-2">
            Skip to content
          </a>
          <main id="main-content">
            <Router />
          </main>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
