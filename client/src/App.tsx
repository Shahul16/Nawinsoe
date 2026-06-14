import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import React, { Suspense } from "react";
import NawinsAssistant from "@/components/shared/NawinsAssistant";
import ErrorBoundary from "./components/layout/ErrorBoundary";
import SeoManager from "./components/layout/SeoManager";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/home/HomePage";
import About from "./pages/about/AboutPage";
import Services from "./pages/services/ServicesPage";
import Blogs from "./pages/blogs/BlogPage";
import Contact from "./pages/contact/ContactPage";
import Tasks from "./pages/tasks/TasksPage";
import Privacy from "./pages/legal/PrivacyPage";
import Terms from "./pages/legal/TermsPage";
import Cookies from "./pages/legal/CookiesPage";
import Faq from "./pages/faq/FaqPage";

const Universities = React.lazy(() => import("./pages/universities/UniversitiesPage"));
const Gallery = React.lazy(() => import("./pages/gallery/GalleryPage"));
const Destinations = React.lazy(() => import("./pages/destinations/DestinationsPage"));
const SuccessStories = React.lazy(() => import("./pages/success-stories/SuccessStoriesPage"));
const StudyInUK = React.lazy(() => import("./pages/destinations/StudyInUKPage"));
const StudyInCanada = React.lazy(() => import("./pages/destinations/StudyInCanadaPage"));
const StudyInAustralia = React.lazy(() => import("./pages/destinations/StudyInAustraliaPage"));
const StudyInIreland = React.lazy(() => import("./pages/destinations/StudyInIrelandPage"));
const StudyInGermany = React.lazy(() => import("./pages/destinations/StudyInGermanyPage"));
const StudyInFrance = React.lazy(() => import("./pages/destinations/StudyInFrancePage"));
const StudyInNetherlands = React.lazy(() => import("./pages/destinations/StudyInNetherlandsPage"));
const StudyInNewZealand = React.lazy(() => import("./pages/destinations/StudyInNewZealandPage"));
const Careers = React.lazy(() => import("./pages/CareersPage"));
const BookConsultation = React.lazy(() => import("./pages/BookConsultationPage"));
const BlogAdmin = React.lazy(() => import("./pages/admin/BlogAdminPage"));
const FreeAssessment = React.lazy(() => import("./pages/FreeAssessmentPage"));
const EligibilityChecker = React.lazy(() => import("./pages/EligibilityCheckerPage"));
const StudentEssentials = React.lazy(() => import("./pages/StudentEssentialsPage"));
const ReferAFriend = React.lazy(() => import("./pages/ReferAFriendPage"));
const ScholarshipPage = React.lazy(() => import("./pages/ScholarshipPage"));
const VisaGuidancePage = React.lazy(() => import("./pages/VisaGuidancePage"));
const StudyInCyprus = React.lazy(() => import("./pages/destinations/StudyInCyprusPage"));
const StudyInFinland = React.lazy(() => import("./pages/destinations/StudyInFinlandPage"));
const StudyInGeorgia = React.lazy(() => import("./pages/destinations/StudyInGeorgiaPage"));
const StudyInItaly = React.lazy(() => import("./pages/destinations/StudyInItalyPage"));
const StudyInJapan = React.lazy(() => import("./pages/destinations/StudyInJapanPage"));
const StudyInMalta = React.lazy(() => import("./pages/destinations/StudyInMaltaPage"));
const StudyInSpain = React.lazy(() => import("./pages/destinations/StudyInSpainPage"));
const StudyInSouthKorea = React.lazy(() => import("./pages/destinations/StudyInSouthKoreaPage"));
const StudyInSwitzerland = React.lazy(() => import("./pages/destinations/StudyInSwitzerlandPage"));
const StudyInUSA = React.lazy(() => import("./pages/destinations/StudyInUSAPage"));
const StudyInUAE = React.lazy(() => import("./pages/destinations/StudyInUAEPage"));

function Router() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#040F23] flex flex-col items-center justify-center">
        <div className="relative w-72 h-1 bg-white/10 rounded-full mb-8 overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#C59D50] to-[#B78D42] rounded-full" style={{width:"100%",animation:"loading-bar 1.8s ease-in-out infinite"}} />
        </div>
        <div style={{animation:"plane-fly 1.8s ease-in-out infinite",transformOrigin:"center"}}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#C59D50"/>
          </svg>
        </div>
        <p className="text-white/60 text-sm mt-6 tracking-widest uppercase">Nawins Education</p>
        <style>{`
          @keyframes loading-bar { 0%{transform:translateX(-100%)} 50%{transform:translateX(0)} 100%{transform:translateX(100%)} }
          @keyframes plane-fly { 0%{transform:translateX(-40px) rotate(-5deg)} 50%{transform:translateX(0) rotate(0deg)} 100%{transform:translateX(40px) rotate(5deg)} }
        `}</style>
      </div>
    }>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/destinations" component={Destinations} />
        <Route path="/success-stories" component={SuccessStories} />
        <Route path="/universities" component={Universities} />
        <Route path="/blogs" component={Blogs} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/contact" component={Contact} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/cookies" component={Cookies} />
        <Route path="/faq" component={Faq} />
        <Route path="/study-in-uk" component={StudyInUK} />
        <Route path="/study-in-canada" component={StudyInCanada} />
        <Route path="/study-in-australia" component={StudyInAustralia} />
        <Route path="/study-in-ireland" component={StudyInIreland} />
        <Route path="/study-in-germany" component={StudyInGermany} />
        <Route path="/study-in-france" component={StudyInFrance} />
        <Route path="/study-in-netherlands" component={StudyInNetherlands} />
        <Route path="/study-in-new-zealand" component={StudyInNewZealand} />
        <Route path="/careers" component={Careers} />
        <Route path="/book-consultation" component={BookConsultation} />
        <Route path="/admin/blog" component={BlogAdmin} />
        <Route path="/free-assessment" component={FreeAssessment} />
        <Route path="/eligibility-checker" component={EligibilityChecker} />
        <Route path="/student-essentials" component={StudentEssentials} />
        <Route path="/refer-a-friend" component={ReferAFriend} />
        <Route path="/scholarships" component={ScholarshipPage} />
        <Route path="/visa-guidance" component={VisaGuidancePage} />
        <Route path="/study-in-cyprus" component={StudyInCyprus} />
        <Route path="/study-in-finland" component={StudyInFinland} />
        <Route path="/study-in-georgia" component={StudyInGeorgia} />
        <Route path="/study-in-italy" component={StudyInItaly} />
        <Route path="/study-in-japan" component={StudyInJapan} />
        <Route path="/study-in-malta" component={StudyInMalta} />
        <Route path="/study-in-spain" component={StudyInSpain} />
        <Route path="/study-in-south-korea" component={StudyInSouthKorea} />
        <Route path="/study-in-switzerland" component={StudyInSwitzerland} />
        <Route path="/study-in-usa" component={StudyInUSA} />
        <Route path="/study-in-uae" component={StudyInUAE} />
        <Route path="/404" component={NotFound} />
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
          <a
            href="#main-content"
            className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-[#04133a] focus:px-3 focus:py-2"
          >
            Skip to content
          </a>
          <main id="main-content">
            <Router />
          </main>
          <NawinsAssistant />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
