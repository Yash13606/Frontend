import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionBadge from "./SectionBadge";
import { DitheringShader } from "@/components/ui/dithering-shader";

const stats = [
  { value: 2.4, prefix: "₹", suffix: "Cr+", label: "Shrinkage Prevented" },
  { value: 500, prefix: "", suffix: "+", label: "Cameras Deployed" },
  { value: 97, prefix: "", suffix: "%+", label: "Fire Detection Accuracy" },
  { value: 60, prefix: "", suffix: "%", label: "Shrinkage Reduction" },
];

const cycleWords = ["Threat", "Shoplifter", "Fire", "Blind Spot"];

function AnimatedCounter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(easeOutCubic(progress) * value);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  const display = value < 10 ? count.toFixed(1) : Math.round(count);

  return (
    <span ref={ref} className="text-3xl font-extrabold text-primary sm:text-4xl md:text-5xl lg:text-6xl">
      {prefix}{display}{suffix}
    </span>
  );
}

function CyclingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex((p) => (p + 1) % cycleWords.length), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block min-w-[160px] sm:min-w-[200px] md:min-w-[280px] lg:min-w-[360px] text-left align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={cycleWords[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="inline-block text-primary"
        >
          {cycleWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const backedByLogos = ["TechCorp", "RetailMax", "SecureNet", "DataVault", "CloudPeak"];

const HeroSection = () => (
  <section id="hero-section" className="relative min-h-[90vh] md:min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-transparent flex flex-col justify-center">
    {/* Dithering wave background — light green on near-black */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <DitheringShader
        shape="wave"
        type="8x8"
        colorBack="#000500"
        colorFront="#4ade80"
        pxSize={3}
        speed={0.6}
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
        width={1920}
        height={1080}
      />
    </div>
    
    {/* Centered Gradient Overlay for Text Readability */}
    <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.8)_100%)]" />

    <div className="relative z-[2] mx-auto max-w-7xl px-4 md:px-6 w-full mt-auto mb-auto flex flex-col items-center">
      
      {/* Centered Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center text-center max-w-4xl w-full"
      >
        <div className="mb-6 md:mb-8">
          <SectionBadge text="FOR RETAIL THAT CANNOT LOSE" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-black leading-[1.1] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/60 mb-6 w-full">
          Always Ahead<br className="hidden md:block" /> of the <CyclingWord />
        </h1>
        
        <p className="mt-4 md:mt-6 max-w-2xl text-base md:text-xl leading-relaxed text-muted-foreground">
          Stop shrinkage, understand your customers, and protect your people — with one AI camera platform built specifically for retail.
        </p>

        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <Link to="/dashboard" className="w-full block">
              <Button size="lg" className="w-full rounded-full font-bold text-base h-14 px-8 shadow-[0_0_30px_rgba(0,255,136,0.2)] hover:shadow-[0_0_40px_rgba(0,255,136,0.5)] transition-shadow duration-300">
                Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <Link to="/approach" className="w-full block">
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-full font-semibold text-base border-white/20 text-white bg-white/5 hover:bg-white/10 backdrop-blur-md h-14 px-8 transition-colors"
              >
                Our Approach
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Horizontal Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="w-full mt-8 md:mt-10 pt-6 border-t border-white/10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center max-w-5xl mx-auto">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-4">
              <div className="mb-2">
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
      
    </div>
  </section>
);

export default HeroSection;
