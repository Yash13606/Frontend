import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Landing pages
import Index from "./pages/Index";
import Approach from "./pages/Approach";
import CapabilityPage from "./pages/CapabilityPage";
import Solutions from "./pages/Solutions";
import SolutionPage from "./pages/SolutionPage";
import CaseStudies from "./pages/CaseStudies";
import Company from "./pages/Company";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";

// Dashboard
import { DashboardShell } from "./components/dashboard/DashboardShell";
import Overview from "./pages/dashboard/Overview";
import CustomerAnalytics from "./pages/dashboard/CustomerAnalytics";
import LossPrevention from "./pages/dashboard/LossPrevention";
import StaffMonitor from "./pages/dashboard/StaffMonitor";
import FireSafety from "./pages/dashboard/FireSafety";
import PeopleReID from "./pages/dashboard/PeopleReID";
import AlertsCenter from "./pages/dashboard/AlertsCenter";
import Reports from "./pages/dashboard/Reports";
import Settings from "./pages/dashboard/Settings";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!pathname.startsWith("/dashboard")) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Landing pages */}
          <Route path="/" element={<Index />} />
          <Route path="/approach" element={<Approach />} />
          <Route path="/capabilities/:slug" element={<CapabilityPage />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/:slug" element={<SolutionPage />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/company" element={<Company />} />
          <Route path="/careers" element={<Careers />} />

          {/* Dashboard routes — all wrapped in DashboardShell */}
          <Route path="/dashboard" element={<DashboardShell><Overview /></DashboardShell>} />
          <Route path="/dashboard/customer-analytics" element={<DashboardShell><CustomerAnalytics /></DashboardShell>} />
          <Route path="/dashboard/loss-prevention" element={<DashboardShell><LossPrevention /></DashboardShell>} />
          <Route path="/dashboard/staff-monitor" element={<DashboardShell><StaffMonitor /></DashboardShell>} />
          <Route path="/dashboard/fire-safety" element={<DashboardShell><FireSafety /></DashboardShell>} />
          <Route path="/dashboard/people-reid" element={<DashboardShell><PeopleReID /></DashboardShell>} />
          <Route path="/dashboard/alerts" element={<DashboardShell><AlertsCenter /></DashboardShell>} />
          <Route path="/dashboard/reports" element={<DashboardShell><Reports /></DashboardShell>} />
          <Route path="/dashboard/settings" element={<DashboardShell><Settings /></DashboardShell>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

