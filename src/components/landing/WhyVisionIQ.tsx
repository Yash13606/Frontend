import { motion } from "framer-motion";
import {
  Cpu,
  Video,
  Lock,
  WifiOff,
  UserCheck,
  Globe,
} from "lucide-react";
import SectionBadge from "./SectionBadge";

const infrastructureFeatures = [
  {
    title: "Plug & Play Edge Compute",
    icon: Cpu,
    description:
      "No cloud latency. All AI processing happens locally on-site at 30FPS. Real-time alerts, zero bandwidth drain.",
  },
  {
    title: "Universal CCTV Sync",
    icon: Video,
    description:
      "Compatible with 99% of existing IP/Analog cameras via RTSP. No need to replace your current hardware setup.",
  },
  {
    title: "Bank-Grade Encryption",
    icon: Lock,
    description:
      "AES-256 end-to-end encryption for all video streams and metadata. SOC2 compliant and enterprise-ready.",
  },
  {
    title: "Offline Resilience",
    icon: WifiOff,
    description:
      "Our AI nodes continue to monitor and log incidents even during total internet outages. Syncs to cloud when back.",
  },
  {
    title: "Privacy by Design",
    icon: UserCheck,
    description:
      "Silhouette-based behavioral tracking only. No facial data is ever stored, ensuring GDPR and IT Act compliance.",
  },
  {
    title: "Global Scalability",
    icon: Globe,
    description:
      "Deploy across 1,000+ stores with a single unified interface. Centralized management for distributed retail.",
  },
];

function AnimatedContainer({
  delay = 0.1,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const WhyVisionIQ = () => (
  <section className="py-20 md:py-32 bg-transparent relative overflow-hidden">
    {/* Subtle glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-20 gap-6">
        <div className="max-w-2xl">
          <SectionBadge text="ENTERPRISE INFRASTRUCTURE" />
          <h2 className="mt-4 text-3xl font-bold text-foreground md:text-5xl lg:text-6xl tracking-tight">
            Built for <span className="text-primary">Real-World</span> Deployment.
          </h2>
        </div>
        <p className="text-muted-foreground md:max-w-xs text-sm md:text-base leading-relaxed">
          Proprietary hardware-agnostic architecture designed for the toughest retail environments on the planet.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        {infrastructureFeatures.map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
            className="group relative bg-black/40 p-8 md:p-10 backdrop-blur-sm hover:bg-black/60 transition-all duration-300"
          >
            <div className="relative z-10">
              <div className="mb-6 p-3 inline-flex rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>
            </div>
            {/* Hover subtle pulse line at bottom */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-500" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyVisionIQ;
