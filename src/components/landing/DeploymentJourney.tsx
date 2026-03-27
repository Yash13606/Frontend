import { motion } from "framer-motion";
import {
  ClipboardList,
  Plug,
  Brain,
  Gauge,
  HeartHandshake,
} from "lucide-react";
import SectionBadge from "./SectionBadge";
import HighlightCard from "@/components/ui/highlight-card";

const deploymentData = [
  {
    title: "1. Assessment",
    description: [
      "We audit your existing CCTV infrastructure,",
      "store layout, and security pain points",
      "to design a tailored VisionIQ module plan."
    ],
    icon: <ClipboardList className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
  },
  {
    title: "2. Installation",
    description: [
      "Our engineers deploy plug-and-play",
      "edge AI hardware on existing cameras.",
      "Zero downtime, zero new wiring."
    ],
    icon: <Plug className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
  },
  {
    title: "3. AI Training",
    description: [
      "The platform learns your store's",
      "unique layout and staff movement",
      "patterns to minimize false alerts."
    ],
    icon: <Brain className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
  },
  {
    title: "4. Go Live",
    description: [
      "All 5 AI modules activate simultaneously:",
      "theft prevention, customer analytics,",
      "staff monitoring, fire detection, & Re-ID."
    ],
    icon: <Gauge className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
  },
  {
    title: "5. Support",
    description: [
      "24/7 monitoring, quarterly model retraining,",
      "and a dedicated success manager",
      "to ensure ROI within 90 days."
    ],
    icon: <HeartHandshake className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
  },
];

const DeploymentJourney = () => (
  <section className="py-16 md:py-24 bg-transparent overflow-hidden">
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-16"
      >
        <SectionBadge text="DEPLOYMENT" />
        <h2 className="mt-2 text-2xl font-bold text-foreground md:text-4xl lg:text-5xl">
          Live in 48 Hours. Seriously.
        </h2>
        <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          From site assessment to all 5 AI modules running live — our deployment journey is built for speed without sacrificing accuracy.
        </p>
      </motion.div>

      {/* Wrapping the flex container in a div that allows horizontal scrolling on mobile/smaller screens,
          but wraps on desktop or centers if they fit. For 5 cards, a flex wrap or grid is best. */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 md:gap-8 justify-items-center">
        {deploymentData.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="w-full flex justify-center"
          >
            <HighlightCard
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default DeploymentJourney;
