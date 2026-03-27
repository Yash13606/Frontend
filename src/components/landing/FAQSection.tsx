import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionBadge from "./SectionBadge";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const faqs = [
  { q: "What is VisionIQ?", a: "VisionIQ is an AI-powered smart surveillance platform that transforms standard CCTV cameras into intelligent business tools for retail — covering theft prevention, customer analytics, staff monitoring, fire safety, and people re-identification." },
  { q: "Do you use facial recognition?", a: "No. VisionIQ uses silhouette-based analysis and behavioral AI. We never store biometric data or facial features. Our platform is fully compliant with GDPR and India's IT Act 2000." },
  { q: "How does installation work?", a: "We deploy edge AI hardware that connects to your existing CCTV infrastructure. The entire setup — from hardware installation to dashboard onboarding — takes under 48 hours per store." },
  { q: "Is the data stored on cloud or on-device?", a: "All real-time processing happens on-device at the edge. Only aggregated analytics and alert metadata are synced to the cloud dashboard. Raw video never leaves your premises." },
  { q: "What industries do you serve?", a: "We serve fashion retail, supermarkets, cafes & QSR, warehouses, electronics stores, hotels, banks, and pharmaceutical outlets — any commercial space with security and analytics needs." },
];

const FAQSection = () => (
  <section className="py-20 md:py-32 relative overflow-hidden bg-transparent">
    {/* Decorative blur in the background */}
    <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        
        {/* Left Column: Heading and CTA */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 lg:sticky lg:top-32"
        >
          <SectionBadge text="FAQ" />
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl mt-6 tracking-tight">
            Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">Questions.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
            Everything you need to know about VisionIQ operations, data privacy, and hardware compatibility.
          </p>
          
          <div className="mt-8 pt-8 border-t border-white/10 hidden lg:block">
            <h3 className="text-white font-medium mb-3">Still have questions?</h3>
            <p className="text-sm text-gray-400 mb-6">Our security experts are here to help you design the perfect deployment plan.</p>
            <Button variant="outline" className="rounded-full border-primary/30 hover:border-primary hover:bg-primary/10 transition-all">
              <Mail className="mr-2 h-4 w-4 text-primary" />
              Contact Support
            </Button>
          </div>
        </motion.div>

        {/* Right Column: Accordion */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem 
                key={i} 
                value={`faq-${i}`} 
                className="border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl px-6 data-[state=open]:border-primary/40 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5 transition-all duration-300 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-white hover:text-primary transition-colors hover:no-underline py-6 text-base md:text-lg font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-6 leading-relaxed text-sm md:text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
      
      {/* Mobile-only CTA (shown below accordion on small screens) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 pt-8 border-t border-white/10 block lg:hidden text-center"
      >
        <h3 className="text-white font-medium mb-2">Still have questions?</h3>
        <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">Our security experts are here to help you design the perfect deployment plan.</p>
        <Button variant="outline" className="rounded-full border-primary/30 hover:border-primary hover:bg-primary/10 transition-all">
          <Mail className="mr-2 h-4 w-4 text-primary" />
          Contact Support
        </Button>
      </motion.div>
      
    </div>
  </section>
);

export default FAQSection;
