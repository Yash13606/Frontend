import { useState, useRef, useCallback, useEffect } from "react";
import { Shield, Globe, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import {
  Eye, Package, RefreshCw, ShieldOff, Flame, Thermometer,
  BarChart3, Footprints, HardHat, CheckSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";

// ── Capabilities data ──
const capabilityCategories = [
  {
    label: "Loss Prevention",
    features: [
      { icon: Eye, title: "Concealment Gesture AI", slug: "theft-prevention", desc: "Detect shoplifting gestures like hiding merchandise in bags, pockets, or clothing using real-time pose estimation and behavioral analysis.", desc2: "Our proprietary model trained on 50,000+ retail theft scenarios achieves 94% accuracy with under 2% false positive rate." },
      { icon: Package, title: "POS Fraud Detection", slug: "pos-fraud", desc: "Identify sweethearting, pass-arounds, and no-scan events by correlating camera feeds with POS transaction data in real time.", desc2: "Integrates with all major POS systems. Flags discrepancies instantly and logs video evidence for review." },
      { icon: RefreshCw, title: "People Re-Identification", slug: "people-reid", desc: "Track flagged individuals across multiple camera zones without facial recognition — using gait, silhouette, and clothing features.", desc2: "Privacy-compliant re-identification that works across stores, floors, and time windows up to 72 hours." },
      { icon: ShieldOff, title: "Unauthorized Zone Access", slug: "unauthorized-access", desc: "Detect unauthorized personnel entering restricted areas like stock rooms, server rooms, or staff-only zones.", desc2: "Configurable zone boundaries with instant alerts to security teams via app, SMS, or WhatsApp." },
    ],
  },
  {
    label: "Customer Intelligence",
    features: [
      { icon: BarChart3, title: "Customer Heat Maps", slug: "customer-analytics", desc: "Visualize foot traffic density across your store floor in real time with zone-level granularity.", desc2: "Identify dead zones, optimize product placement, and measure campaign impact with historical heat map comparisons." },
      { icon: Footprints, title: "Footfall Analytics", slug: "footfall-analytics", desc: "Accurate bi-directional people counting at every entry and exit point, with hourly and daily trend analysis.", desc2: "Compare across stores, correlate with weather and promotions, and forecast staffing needs automatically." },
    ],
  },
  {
    label: "Staff Operations",
    features: [
      { icon: HardHat, title: "Staff Zone Monitoring", slug: "staff-monitor", desc: "Track staff presence across assigned zones and flag deviations from scheduled floor coverage in real time.", desc2: "Shift-level compliance scoring helps managers optimize rosters and identify training gaps." },
      { icon: CheckSquare, title: "Task Verification AI", slug: "task-verification", desc: "Verify completion of operational tasks like shelf restocking, cleaning, and display setup using visual confirmation.", desc2: "Replace manual checklists with automated verification. Photo evidence logged for audit trails." },
    ],
  },
  {
    label: "Fire & Safety",
    features: [
      { icon: Flame, title: "AI Fire & Smoke Detection", slug: "fire-detection", desc: "Detect real fire and smoke with 97%+ accuracy, distinguishing from steam, cigarettes, and cooking vapors.", desc2: "Sub-3-second detection time. Integrates with building fire alarm and sprinkler systems for automated response." },
      { icon: Thermometer, title: "Thermal Anomaly Detection", slug: "thermal-detection", desc: "Monitor electrical panels, server rooms, and equipment for overheating using thermal camera integration.", desc2: "Predictive alerts before equipment failure. Reduce fire risk and unplanned downtime by up to 80%." },
    ],
  },
];

// ── Solutions data ──
const solutionCategories = [
  {
    label: "Fashion & Apparel",
    features: [
      { icon: Eye, title: "Fitting Room Monitoring", slug: "fitting-room-monitoring", desc: "Track fitting room occupancy and dwell time. Detect concealment attempts without compromising privacy.", desc2: "Reduce fitting room shrinkage by up to 45% with non-invasive behavioral AI." },
      { icon: BarChart3, title: "Visual Merchandising Analytics", slug: "visual-merchandising", desc: "Measure customer engagement with displays, mannequins, and promotional setups using attention heat maps.", desc2: "A/B test store layouts and measure ROI on visual merchandising investments." },
    ],
    stat: "58% shrinkage reduction for a Mumbai fashion chain in 30 days.",
    solutionSlug: "fashion",
  },
  {
    label: "Supermarkets",
    features: [
      { icon: Package, title: "Self-Checkout Fraud Prevention", slug: "self-checkout-fraud", desc: "Detect scan-avoidance, barcode switching, and pass-around fraud at self-checkout stations.", desc2: "Real-time alerts to attendants with video evidence. Reduces self-checkout losses by 62%." },
      { icon: Footprints, title: "Aisle Traffic Optimization", slug: "aisle-traffic", desc: "Understand traffic flow patterns to optimize product placement and reduce congestion at peak hours.", desc2: "Data-driven planogram recommendations based on actual customer movement patterns." },
    ],
    stat: "₹1.2Cr annual savings for a 14-store grocery chain.",
    solutionSlug: "supermarkets",
  },
  {
    label: "Cafes & QSR",
    features: [
      { icon: HardHat, title: "Service Speed Monitoring", slug: "service-speed", desc: "Track order-to-serve time using camera-based queue analysis and kitchen activity monitoring.", desc2: "Identify bottlenecks and optimize staffing during peak hours." },
      { icon: CheckSquare, title: "Hygiene Compliance", slug: "hygiene-compliance", desc: "Verify handwashing, glove usage, and food handling compliance using visual AI.", desc2: "Automated FSSAI compliance logging with photo evidence." },
    ],
    stat: "22% faster service times across 8 QSR outlets.",
    solutionSlug: "qsr",
  },
  {
    label: "Warehouses",
    features: [
      { icon: ShieldOff, title: "Perimeter Security", slug: "perimeter-security", desc: "24/7 perimeter monitoring with intrusion detection and vehicle tracking across loading docks.", desc2: "Integrates with access control systems for automated gate management." },
      { icon: Flame, title: "Fire & Hazard Prevention", slug: "warehouse-fire-safety", desc: "Thermal monitoring of electrical panels, machinery, and stored goods for fire prevention.", desc2: "Warehouse-specific fire detection trained on industrial smoke and chemical vapor patterns." },
    ],
    stat: "Zero fire incidents across 6 warehouses in 18 months.",
    solutionSlug: "warehousing",
  },
  {
    label: "Electronics",
    features: [
      { icon: Eye, title: "High-Value Item Protection", slug: "theft-prevention", desc: "Concealment detection optimized for small, high-value electronics items.", desc2: "Combined with POS fraud matching and People Re-ID for comprehensive loss prevention." },
      { icon: Package, title: "POS Fraud Detection", slug: "pos-fraud", desc: "Transaction-to-video correlation catches sweethearting and scan-skip at electronics checkout.", desc2: "Integrates with all major POS systems with timestamped video evidence." },
    ],
    stat: "73% shrinkage reduction for a multi-store electronics chain.",
    solutionSlug: "electronics",
  },
  {
    label: "Hotels",
    features: [
      { icon: Footprints, title: "Guest Flow Analytics", slug: "guest-flow", desc: "Understand guest movement across lobby, restaurants, pool, and event spaces for operational optimization.", desc2: "Anonymized analytics help optimize staffing and service placement." },
      { icon: Flame, title: "Kitchen Fire Safety", slug: "kitchen-fire-safety", desc: "Real-time fire and smoke detection in commercial kitchens, distinguishing cooking smoke from actual fire.", desc2: "Integrates with kitchen suppression systems for sub-5-second automated response." },
    ],
    stat: "40% improvement in guest service response times.",
    solutionSlug: "hospitality",
  },
];

type MegaMenuType = "capabilities" | "solutions" | null;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MegaMenuType>(null);
  const [activeCatIdx, setActiveCatIdx] = useState(0);
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const categories = activeMenu === "capabilities" ? capabilityCategories : activeMenu === "solutions" ? solutionCategories : [];
  const activeCategory = categories[activeCatIdx] || categories[0];
  const activeFeature = activeCategory?.features[activeFeatureIdx] || activeCategory?.features[0];

  const openMenu = useCallback((menu: MegaMenuType) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(menu);
    setActiveCatIdx(0);
    setActiveFeatureIdx(0);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 100);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  // Close mobile on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const navLinks = [
    { label: "Case Studies", to: "/case-studies" },
    { label: "Company", to: "/company" },
  ];

  const megaMenuItems = [
    { label: "Capabilities", menu: "capabilities" as MegaMenuType },
    { label: "Solutions", menu: "solutions" as MegaMenuType },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" ref={mobileRef}>
      <div className="border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 md:h-7 md:w-7 text-primary" />
            <span className="text-lg md:text-xl font-bold text-foreground">VisionIQ</span>
          </Link>

          {/* Center Nav — desktop */}
          <div className="hidden items-center gap-1 lg:flex">
            {megaMenuItems.map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-1 rounded-md px-4 py-2 text-sm transition-colors ${
                  activeMenu === item.menu
                    ? "text-foreground"
                    : isActive("/capabilities") && item.menu === "capabilities"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onMouseEnter={() => openMenu(item.menu)}
                onMouseLeave={scheduleClose}
              >
                {item.label}
                <ChevronDown className={`h-3 w-3 transition-transform ${activeMenu === item.menu ? "rotate-180" : ""}`} />
              </button>
            ))}
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`flex items-center gap-1 rounded-md px-4 py-2 text-sm transition-colors ${
                  isActive(item.to) ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right — desktop */}
          <div className="hidden items-center gap-3 lg:flex">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <Link to="/dashboard">
              <Button className="rounded-md font-semibold">Dashboard</Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="flex h-11 w-11 items-center justify-center text-foreground lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mega Menu Dropdown — desktop */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 border-b border-primary/30 bg-[hsl(0_0%_4%)] shadow-2xl hidden lg:block"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="mx-auto grid max-w-7xl grid-cols-[220px_1fr_1fr] gap-0 px-6 py-0">
              {/* LEFT */}
              <div className="border-r border-border py-6 pr-4">
                <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                  {activeMenu === "capabilities" ? "Modules" : "Industries"}
                </p>
                {categories.map((cat, i) => (
                  <button
                    key={cat.label}
                    onMouseEnter={() => { setActiveCatIdx(i); setActiveFeatureIdx(0); }}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-all ${
                      activeCatIdx === i ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {cat.label}
                    <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                  </button>
                ))}
              </div>

              {/* MIDDLE */}
              <div className="border-r border-border py-6 px-5">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Features</p>
                <div className="space-y-1">
                  {activeCategory?.features.map((feat, i) => {
                    const Icon = feat.icon;
                    return (
                      <button
                        key={feat.title}
                        onMouseEnter={() => setActiveFeatureIdx(i)}
                        onClick={() => {
                          if ("slug" in feat && feat.slug) {
                            setActiveMenu(null);
                            navigate(`/capabilities/${feat.slug}`);
                          }
                        }}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-all ${
                          activeFeatureIdx === i ? "bg-muted" : "hover:bg-muted/50"
                        }`}
                      >
                        <Icon className={`h-5 w-5 shrink-0 ${activeFeatureIdx === i ? "text-primary" : "text-muted-foreground"}`} />
                        <span className={`text-sm font-semibold ${activeFeatureIdx === i ? "text-foreground" : "text-muted-foreground"}`}>
                          {feat.title}
                        </span>
                        <ChevronRight className="ml-auto h-3.5 w-3.5 text-muted-foreground opacity-50" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT */}
              <div className="py-6 pl-6">
                {activeFeature && (
                  <motion.div
                    key={activeFeature.title}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex h-full flex-col"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <activeFeature.icon className="h-5 w-5 text-primary" />
                      <h4 className="text-lg font-bold text-foreground">{activeFeature.title}</h4>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground mb-3">{activeFeature.desc}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground mb-6">{activeFeature.desc2}</p>
                    {activeMenu === "solutions" && "stat" in activeCategory && (
                      <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 mb-3">
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Case Study</p>
                        <p className="text-sm text-foreground">{(activeCategory as typeof solutionCategories[0]).stat}</p>
                      </div>
                    )}
                    <div className="mt-auto flex flex-col gap-2">
                      {"slug" in activeFeature && activeFeature.slug && (
                        <Link
                          to={`/capabilities/${activeFeature.slug}`}
                          onClick={() => setActiveMenu(null)}
                          className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                        >
                          Learn more <ChevronRight className="h-4 w-4" />
                        </Link>
                      )}
                      {activeMenu === "solutions" && "solutionSlug" in activeCategory && (
                        <Link
                          to={`/solutions/${(activeCategory as typeof solutionCategories[0]).solutionSlug}`}
                          onClick={() => setActiveMenu(null)}
                          className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground hover:underline"
                        >
                          View Industry Solution <ChevronRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu — full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-0 z-[100] flex flex-col bg-background lg:hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold text-foreground">VisionIQ</span>
              </Link>
              <button className="flex h-11 w-11 items-center justify-center text-foreground" onClick={() => setMobileOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-2 px-6">
              {[
                { label: "Home", to: "/" },
                { label: "Capabilities", to: "/capabilities/theft-prevention" },
                { label: "Solutions", to: "/solutions" },
                { label: "Case Studies", to: "/case-studies" },
                { label: "Company", to: "/company" },
                { label: "Our Approach", to: "/approach" },
                { label: "Careers", to: "/careers" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`w-full text-center py-4 text-xl font-semibold rounded-lg transition-colors min-h-[52px] flex items-center justify-center ${
                    isActive(item.to) ? "text-primary" : "text-foreground active:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="px-6 pb-8 pt-4">
              <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="w-full block">
                <Button className="w-full rounded-md font-semibold text-base h-14">
                  Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
