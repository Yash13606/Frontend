import {
  Award, Rocket, Cloud, Flag,
  ShieldCheck, FileText, Lock, Cpu,
} from "lucide-react";
import { motion } from "framer-motion";
import SectionBadge from "./SectionBadge";

const items = [
  { icon: Award,       name: "NASSCOM",          desc: "Recognized as a promising AI startup by India's premier tech body." },
  { icon: Rocket,      name: "Startup India",     desc: "Official Startup India registered entity with DPIIT recognition." },
  { icon: Cloud,       name: "AWS Partner",       desc: "Certified AWS ISV partner for cloud-edge AI deployments." },
  { icon: Flag,        name: "Make in India",     desc: "Proudly built, trained, and deployed from Indian infrastructure." },
  { icon: ShieldCheck, name: "GDPR Compliant",    desc: "No biometric data stored. Full compliance with EU privacy laws." },
  { icon: FileText,    name: "IT Act 2000",       desc: "Fully compliant with India's Information Technology Act 2000." },
  { icon: Lock,        name: "ISO 27001",         desc: "Enterprise information security management — certified." },
  { icon: Cpu,         name: "Edge AI Certified", desc: "Processes video on-device. Raw footage never leaves premises." },
];

const RecognitionGrid = () => (
  <section className="py-12 md:py-20 bg-transparent">
    <div className="mx-auto max-w-7xl space-y-10 px-4 md:px-6 md:space-y-14">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 mx-auto max-w-2xl space-y-4 text-center"
      >
        <SectionBadge text="RECOGNITION" />
        <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl mt-2">
          Built for Enterprise.<br />Trusted by Operators.
        </h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          VisionIQ carries the certifications, partnerships, and compliance that enterprise procurement requires — so you can deploy with confidence.
        </p>
      </motion.div>

      {/* Features grid — Features-4 style, full width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="relative grid w-full divide-x divide-y divide-border border border-border sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map((item, i) => (
          <div key={i} className="space-y-3 p-10 md:p-12 group hover:bg-primary/5 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <item.icon className="size-5 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default RecognitionGrid;
