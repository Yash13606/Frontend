import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionBadge from "./SectionBadge";
import { Link } from "react-router-dom";

const FinalCTA = () => (
  <section className="py-24 md:py-40 bg-transparent relative overflow-hidden">
    {/* Global background glow for this section */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

    <div className="mx-auto max-w-5xl px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[40px] border border-white/10 bg-black/60 p-10 md:p-20 text-center backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.5)]"
      >
        {/* Intense Inner Glow */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,255,136,0.1)] rounded-[40px]" />
        
        {/* Subtle animated pattern in background of card */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="relative z-10 flex flex-col items-center">
          <SectionBadge text="READY TO DEPLOY?" />
          
          <h2 className="mt-8 text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tighter">
            Stop Shrinkage.<br />
            <span className="text-primary">Start Scaling.</span>
          </h2>
          
          <p className="mt-6 md:mt-8 text-base md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Join the next generation of retailers using VisionIQ to transform their stores into intelligent, self-protecting environments.
          </p>

          <div className="mt-10 md:mt-16 flex flex-col sm:flex-row gap-6 items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: ["0 0 20px rgba(0,255,136,0.2)", "0 0 40px rgba(0,255,136,0.4)", "0 0 20px rgba(0,255,136,0.2)"] 
              }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="rounded-full"
            >
              <Link to="/dashboard">
                <Button size="lg" className="rounded-full font-black text-lg h-16 px-12 gap-3 transition-all duration-300">
                  <Zap className="h-5 w-5 fill-current" />
                  GO TO DASHBOARD
                </Button>
              </Link>
            </motion.div>
            
            <Link to="/approach" className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors font-semibold text-sm h-16 px-4">
              Explore Our Approach
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/5 w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 opacity-50 grayscale transition-all hover:grayscale-0 duration-500">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">Secure Hardware Sync</span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">Real-time Edge AI</span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">Privacy Compliant</span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;
