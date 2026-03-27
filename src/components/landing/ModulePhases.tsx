import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Users, BarChart3, ShieldAlert, UserSearch, Lock,
  ClipboardCheck, Flame, Thermometer, ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import SectionBadge from "./SectionBadge";

const phases = [
  {
    label: "PHASE 1",
    title: "Understand Your Customers",
    modules: [
      { icon: BarChart3, name: "Customer Behavior Analytics", desc: "Real-time heat maps, dwell tracking, footfall counting", slug: "customer-analytics" },
      { icon: Users, name: "Footfall Analytics", desc: "Bi-directional people counting with 98% accuracy", slug: "footfall-analytics" },
    ],
  },
  {
    label: "PHASE 2",
    title: "Protect Your Business",
    modules: [
      { icon: ShieldAlert, name: "Theft & Loss Prevention", desc: "Concealment gesture AI, POS fraud matching, live alerts", slug: "theft-prevention" },
      { icon: UserSearch, name: "People Re-ID", desc: "Blacklist re-identification across camera zones", slug: "people-reid" },
      { icon: Lock, name: "Unauthorized Zone Access", desc: "Staff-only area breach alerts", slug: "unauthorized-access" },
    ],
  },
  {
    label: "PHASE 3",
    title: "Operate With Assurance",
    modules: [
      { icon: ClipboardCheck, name: "Staff Productivity Monitor", desc: "Zone compliance, task verification, idle time tracking", slug: "staff-monitor" },
      { icon: Flame, name: "AI Fire & Smoke Detection", desc: "97%+ accuracy distinguishing real fire from steam/cigarettes", slug: "fire-detection" },
      { icon: Thermometer, name: "Thermal Anomaly Detection", desc: "Electrical fire and equipment overheating detection", slug: "thermal-detection" },
    ],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
};

const ModulePhases = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Calculate the height of the glowing vertical line based on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section className="py-20 md:py-32 bg-transparent relative overflow-hidden" ref={containerRef}>
      
      {/* Background ambient glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        
        {/* Header Section */}
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16 md:mb-24">
          <SectionBadge text="5-MODULE PLATFORM" />
          <h2 className="text-3xl font-bold text-foreground md:text-5xl lg:text-6xl mt-6 tracking-tight">
            Complete Business Intelligence.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">One Contract.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive protection at every stage — from storefront to back office. Deploy the exact AI superpower you need, precisely when you need it.
          </p>
        </motion.div>

        {/* Vertical Timeline Layout - Left Aligned */}
        <div className="relative space-y-16 md:space-y-24 mt-16">
          
          {/* Animated Left Line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-px bg-white/10 hidden md:block">
            <motion.div 
              className="w-full bg-gradient-to-b from-primary/0 via-primary to-primary/0" 
              style={{ height: lineHeight }}
            />
          </div>

          {/* Mobile line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10 md:hidden">
            <motion.div 
              className="w-full bg-gradient-to-b from-primary/0 via-primary to-primary/0" 
              style={{ height: lineHeight }}
            />
          </div>

          {phases.map((phase, pi) => (
            <motion.div key={pi} {...fadeUp} transition={{ delay: 0.2, duration: 0.6 }} className="relative z-10">
              
              {/* Phase Header Node & Title */}
              <div className="flex items-start md:items-center mb-8 relative">
                
                {/* Node (Desktop) */}
                <div className="hidden md:flex absolute left-[27px] -translate-x-1/2 items-center justify-center w-12 h-12 rounded-full bg-black border border-primary/30 z-20 shadow-[0_0_20px_rgba(0,255,127,0.15)] backdrop-blur-md shrink-0">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                </div>
                
                {/* Node (Mobile) */}
                <div className="flex md:hidden absolute left-6 -translate-x-1/2 mt-1 items-center justify-center w-8 h-8 rounded-full bg-black border border-primary/30 z-20 shadow-[0_0_15px_rgba(0,255,127,0.1)] shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                </div>

                <div className="pl-16 md:pl-24 w-full">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-primary mb-2 md:mb-3">
                    {phase.label}
                  </span>
                  <h3 className="text-xl md:text-3xl font-bold tracking-tight text-white">{phase.title}</h3>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="pl-16 md:pl-24 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {phase.modules.map((mod, mi) => (
                    <div
                      key={mi}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
                    >
                      {/* Hover Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 -z-10" />
                      
                      <div>
                        <div className="p-3 inline-flex rounded-xl bg-white/5 border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300 mb-6">
                          <mod.icon className="h-6 w-6 text-white/80 group-hover:text-primary transition-colors duration-300" />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary-50 transition-colors">{mod.name}</h4>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed line-clamp-3 mb-6">{mod.desc}</p>
                      </div>

                      <Link
                        to={`/capabilities/${mod.slug}`}
                        className="mt-auto inline-flex items-center text-sm font-semibold text-primary/70 group-hover:text-primary transition-colors w-max"
                      >
                        Explore capability <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulePhases;
