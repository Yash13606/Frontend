import SectionBadge from "./SectionBadge";

const testimonials = [
  { company: "FASHION HOUSE", quote: "VisionIQ cut our shrinkage by 58% in the first month. The concealment detection is unlike anything we've seen.", name: "Priya Sharma", role: "VP Operations" },
  { company: "MEGA MART", quote: "The heat maps completely changed how we lay out our floor. Sales up 22% in two months.", name: "Rajesh Kumar", role: "Store Director" },
  { company: "WAREHOUSE CORP", quote: "We used to get 40 false fire alarms a month. VisionIQ brought it to zero.", name: "Amit Patel", role: "Safety Head" },
  { company: "RETAIL CHAIN", quote: "Staff compliance scores gave us the data to have real performance conversations.", name: "Sneha Gupta", role: "HR Director" },
  { company: "MULTI STORE OPS", quote: "One dashboard for 14 stores. Our ops team finally has visibility.", name: "Vikram Singh", role: "COO" },
  { company: "LUXE JEWELLERS", quote: "Fitting room monitoring alone saved us ₹12L in the first quarter. ROI was immediate.", name: "Ananya Reddy", role: "Loss Prevention Head" },
  { company: "GROCERY WORLD", quote: "Self-checkout fraud dropped 73% after deploying VisionIQ. Customers don't even notice it's there.", name: "Deepak Menon", role: "CTO" },
  { company: "METRO HYPERMART", quote: "The fire and safety alerts are incredibly accurate. We passed every audit since installation.", name: "Kavitha Nair", role: "Compliance Manager" },
  { company: "URBAN LIFESTYLE", quote: "Footfall analytics helped us optimise staffing. We cut labour costs by 18% without affecting service.", name: "Rohan Malhotra", role: "Regional Manager" },
  { company: "SMART ELECTRONICS", quote: "POS fraud detection caught discrepancies we never knew existed. Recovered ₹8L in the first two months.", name: "Suresh Iyer", role: "Finance Director" },
];

const Card = ({ t }: { t: typeof testimonials[number] }) => (
  <div className="min-w-[300px] sm:min-w-[360px] max-w-[400px] flex-shrink-0 rounded-xl border border-border bg-card p-5 md:p-6 flex flex-col justify-between">
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3 md:mb-4">{t.company}</p>
      <p className="text-foreground leading-relaxed text-sm md:text-[15px]">"{t.quote}"</p>
    </div>
    <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-border">
      <p className="text-sm font-semibold text-foreground">{t.name}</p>
      <p className="text-xs text-muted-foreground">{t.role}</p>
    </div>
  </div>
);

const TestimonialCards = () => {
  return (
    <section className="py-16 md:py-24 bg-transparent overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-6 mb-8 md:mb-12">
        <SectionBadge text="TESTIMONIALS" />
        <h2 className="text-2xl font-bold text-foreground md:text-4xl">What Our Clients Say</h2>
      </div>
      <div
        className="relative"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <div className="flex gap-6 animate-scroll-left hover:[animation-play-state:paused] w-max">
          {[...testimonials, ...testimonials].map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCards;
