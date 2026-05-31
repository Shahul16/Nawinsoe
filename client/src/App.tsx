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
import React, { Suspense } from "react";

const Universities = React.lazy(() => import("./pages/Universities"));
const Gallery = React.lazy(() => import("./pages/Gallery"));

function Router() {
  return (
    <Suspense fallback={<div aria-hidden className="min-h-screen" /> }>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/about"} component={About} />
        <Route path={"/services"} component={Services} />
        <Route path={"/universities"} component={Universities} />
        <Route path={"/blogs"} component={Blogs} />
        <Route path={"/gallery"} component={Gallery} />
        <Route path={"/contact"} component={Contact} />
        <Route path={"/tasks"} component={Tasks} />
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
