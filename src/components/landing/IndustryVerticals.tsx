import { motion } from "framer-motion";
import {
  Shirt, ShoppingCart, Coffee, Warehouse,
  Monitor, Hotel, Landmark, Pill, ArrowUpRight
} from "lucide-react";
import SectionBadge from "./SectionBadge";

const verticals = [
  { 
    icon: ShoppingCart, 
    name: "Supermarkets & Grocery", 
    desc: "Automated checkout monitoring, shelf stock tracking, & shrink reduction.", 
    className: "md:col-span-2 md:row-span-1 bg-gradient-to-r from-[#010101] to-[#0A1A0F]",
    iconSize: "size-6",
  },
  { 
    icon: Shirt, 
    name: "Fashion & Apparel", 
    desc: "Footprint tracing & fitting room queue analytics.", 
    className: "col-span-1",
    iconSize: "size-5",
  },
  { 
    icon: Warehouse, 
    name: "Warehouses & Logistics", 
    desc: "Perimeter security & PPE safety compliance tracking.", 
    className: "col-span-1",
    iconSize: "size-5",
  },
  { 
    icon: Landmark, 
    name: "Banks & ATMs", 
    desc: "Loitering detection & secure vault monitoring.", 
    className: "col-span-1",
    iconSize: "size-5",
  },
  { 
    icon: Coffee, 
    name: "Cafes & QSR", 
    desc: "Queue lengths & order turnaround speed metrics.", 
    className: "col-span-1",
    iconSize: "size-5",
  },
  { 
    icon: Pill, 
    name: "Pharmaceutical Stores", 
    desc: "Restricted zone access control & drug tracking.", 
    className: "col-span-1",
    iconSize: "size-5",
  },
  { 
    icon: Hotel, 
    name: "Hotels & Hospitality", 
    desc: "VIP arrival alerts & unauthorized entry prevention.", 
    className: "md:col-span-2",
    iconSize: "size-6",
  },
  { 
    icon: Monitor, 
    name: "Electronics Retail", 
    desc: "High-value asset tracking & behavior alerts.", 
    className: "col-span-1",
    iconSize: "size-5",
  },
];

const IndustryVerticals = () => (
  <section className="py-16 md:py-24 bg-transparent relative overflow-hidden">
    
    {/* Background Glows for the section */}
    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

    <div className="mx-auto max-w-7xl px-4 md:px-6">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="max-w-2xl">
          <SectionBadge text="USE CASES" />
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl mt-4 tracking-tight">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">Your Industry.</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            VisionIQ adapts to your environment. From retail corridors to secure banking zones, our AI modules provide tailored surveillance that fits your specific operational hazards.
          </p>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[minmax(140px,auto)]">
        {verticals.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            viewport={{ once: true }}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 md:p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 ${v.className || ""}`}
          >
            {/* Card Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10" />
            
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300">
                <v.icon className={`text-white/80 group-hover:text-primary transition-colors ${v.iconSize}`} />
              </div>
              <ArrowUpRight className="size-4 text-white/20 group-hover:text-primary/70 transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
            </div>

            <div className="mt-auto">
              <h3 className="text-lg md:text-xl font-bold text-white mb-1.5 tracking-tight group-hover:text-primary-50 transition-colors">
                {v.name}
              </h3>
              <p className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed line-clamp-2">
                {v.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default IndustryVerticals;
