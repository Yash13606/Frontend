import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, ShirtIcon, ShoppingCart, Coffee, Warehouse, Cpu, Hotel } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionBadge from "@/components/landing/SectionBadge";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { solutionIndex } from "@/data/solutionPageData";

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const },
};

const iconMap: Record<string, typeof ShirtIcon> = {
  ShirtIcon, ShoppingCart, Coffee, Warehouse, Cpu, Hotel,
};

const Solutions = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <section className="pt-20 md:pt-28 pb-12 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div {...fade}>
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <SectionBadge text="SOLUTIONS" />
          <h1 className="mt-4 text-[28px] font-extrabold text-foreground sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.1] max-w-3xl">
            AI Surveillance Built for Your Industry
          </h1>
          <p className="mt-4 md:mt-6 text-sm md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Every retail format has different risks, layouts, and compliance needs. VisionIQ is configured per industry — not a one-size-fits-all product.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="pb-16 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutionIndex.map((sol, i) => {
            const Icon = iconMap[sol.icon] || Cpu;
            return (
              <motion.div key={sol.slug} {...fade} transition={{ delay: i * 0.08 }}>
                <Link
                  to={`/solutions/${sol.slug}`}
                  className="block rounded-xl border border-border bg-card p-6 md:p-8 hover:border-primary/40 transition-colors group h-full"
                >
                  <Icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">{sol.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{sol.desc}</p>
                  <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:underline mt-auto">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Solutions;
