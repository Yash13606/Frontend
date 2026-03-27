import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Shield, BarChart3, Users, Flame, ScanFace, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionBadge from "./SectionBadge";
import { useIsMobile } from "@/hooks/use-mobile";

const columnIcons = [Shield, BarChart3, Users, Flame, ScanFace, Layers];
const features = ["Theft AI", "Customer Analytics", "Staff Monitor", "Fire Detection", "Re-ID", "Integrated"];

const companies = [
  { name: "VisionIQ", checks: [true, true, true, true, true, true], highlight: true },
  { name: "Verkada", checks: [true, false, false, false, false, false] },
  { name: "Hikvision", checks: [false, false, false, true, false, false] },
  { name: "Veesion", checks: [true, false, false, false, false, false] },
  { name: "RetailNext", checks: [false, true, false, false, false, false] },
  { name: "Scylla", checks: [true, false, false, true, true, false] },
];

const VisionIQCheck = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 300, damping: 15, delay }}
    className="flex justify-center"
  >
    <div className="relative group">
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-[4px] group-hover:blur-[8px] transition-all" />
      <svg width="22" height="22" viewBox="0 0 20 20" className="relative">
        <circle cx="10" cy="10" r="9" fill="rgba(0,255,136,0.1)" stroke="rgba(0,255,136,0.4)" strokeWidth="1" />
        <path d="M6 10.5l2.5 2.5 5.5-5.5" stroke="hsl(var(--primary))" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </motion.div>
);

const CompetitorCheck = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 300, damping: 15, delay }}
    className="flex justify-center"
  >
    <svg width="20" height="20" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="9" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <path d="M6 10.5l2.5 2.5 5.5-5.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </motion.div>
);

const XMark = () => (
  <div className="flex justify-center opacity-30">
    <svg width="20" height="20" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="9" fill="transparent" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <path d="M7 7l6 6M13 7l-6 6" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  </div>
);

const ComparisonTable = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const tableScrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();
  const [scrollHintVisible, setScrollHintVisible] = useState(true);

  useEffect(() => {
    if (!isMobile || !tableScrollRef.current) return;
    const el = tableScrollRef.current;
    const onScroll = () => { if (el.scrollLeft > 10) setScrollHintVisible(false); };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  const competitorRows = companies.filter((c) => !c.highlight);
  const visioniq = companies.find((c) => c.highlight)!;
  const competitorDelays = [0.65, 0.73, 0.81, 0.89, 0.97];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-28 lg:py-[120px]"
      style={{
        background: `radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,255,136,0.04) 0%, transparent 65%), hsl(var(--background))`,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-8 md:mb-12"
        >
          <SectionBadge text="COMPETITIVE EDGE" />
          <h2 className="text-2xl font-bold text-foreground md:text-4xl mt-2">
            No One Else Does All Five.
          </h2>
          <p className="mt-3 md:mt-4 text-sm md:text-lg text-muted-foreground">
            Every competitor solves one problem. We solve all of them — in one contract.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div
            ref={tableScrollRef}
            className="rounded-2xl overflow-hidden border border-border"
            style={{
              ...(isMobile
                ? {
                    overflowX: "scroll",
                    WebkitOverflowScrolling: "touch",
                    maskImage: "linear-gradient(to right, black 85%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, black 85%, transparent 100%)",
                  }
                : {}),
            }}
          >
            <table className="w-full" style={{ minWidth: 700 }}>
              {/* Header */}
              <motion.thead
                initial={{ opacity: 0, y: "-100%" }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <tr className="bg-muted/30 border-b border-border">
                  <th
                    className="text-left text-[13px] font-semibold text-foreground h-14"
                    style={{
                      paddingLeft: 28,
                      ...(isMobile ? { position: "sticky" as const, left: 0, zIndex: 2, borderRight: "1px solid rgba(255,255,255,0.08)" } : {}),
                      background: isMobile ? "hsl(var(--card))" : undefined,
                    }}
                  >
                    Company
                  </th>
                  {features.map((f, i) => {
                    const Icon = columnIcons[i];
                    return (
                      <th key={f} className="text-center h-14 px-2 md:px-3">
                        <Icon size={14} className="text-muted-foreground mx-auto mb-1" />
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                          {f}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </motion.thead>

              <tbody>
                {/* VisionIQ Row */}
                <motion.tr
                  initial={{ opacity: 0, x: -40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                  className="h-[80px] border-b border-primary/20 relative"
                  style={{
                    background: "linear-gradient(90deg, rgba(0,255,136,0.12) 0%, rgba(0,255,136,0.04) 50%, transparent 100%)",
                    boxShadow: "inset 4px 0 0 0 hsl(var(--primary))",
                  }}
                >
                  <td
                    className="text-[16px] font-black text-white whitespace-nowrap"
                    style={{
                      paddingLeft: 24,
                      ...(isMobile ? { position: "sticky" as const, left: 0, zIndex: 2, borderRight: "1px solid rgba(0,255,136,0.2)", background: "rgba(0,15,5,0.98)" } : {}),
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-primary">{visioniq.name}</span>
                      <span className="hidden sm:inline-block border border-primary/40 bg-primary/20 text-primary text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold shadow-[0_0_15px_rgba(0,255,136,0.2)]">
                        ONLY COMPLETE SOLUTION
                      </span>
                    </div>
                  </td>
                  {visioniq.checks.map((_, j) => (
                    <td key={j} className="text-center align-middle">
                      <VisionIQCheck delay={0.6 + j * 0.04} />
                    </td>
                  ))}
                </motion.tr>

                {/* Competitor Rows */}
                {competitorRows.map((c, i) => (
                  <motion.tr
                    key={c.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.35, delay: competitorDelays[i], ease: "easeOut" }}
                    className={`group h-14 border-b border-border last:border-0 transition-colors ${
                      i % 2 !== 0 ? "bg-muted/20" : ""
                    } hover:bg-muted/30`}
                  >
                    <td
                      className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors"
                      style={{
                        paddingLeft: 28,
                        ...(isMobile ? { position: "sticky" as const, left: 0, zIndex: 2, borderRight: "1px solid rgba(255,255,255,0.08)" } : {}),
                        background: isMobile ? "hsl(var(--card))" : undefined,
                      }}
                    >
                      {c.name}
                    </td>
                    {c.checks.map((checked, j) => (
                      <td key={j} className="text-center align-middle">
                        {checked ? <CompetitorCheck delay={competitorDelays[i] + 0.1 + j * 0.04} /> : <XMark />}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile scroll hint */}
          {isMobile && scrollHintVisible && (
            <p className="text-center mt-2 text-muted-foreground text-[11px]">
              scroll to see more →
            </p>
          )}
        </motion.div>

        {/* Footnote */}
        <p className="mt-4 md:mt-5 italic text-muted-foreground text-[11px] md:text-xs pl-1">
          * Based on publicly available product documentation, Q1 2026. VisionIQ is the only platform delivering all six capabilities under a single SaaS contract.
        </p>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-10 md:mt-12 gap-6 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-bold text-white mb-1">Ready to outsmart the competition?</h4>
            <Link to="/approach" className="text-sm text-primary hover:underline flex items-center gap-1 justify-center sm:justify-start">
              See how VisionIQ compares in detail <Layers size={14} />
            </Link>
          </div>
          <Link to="/dashboard" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full font-bold text-base px-10 h-14 shadow-[0_0_30px_rgba(0,255,136,0.2)]">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;