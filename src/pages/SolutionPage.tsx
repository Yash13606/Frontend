import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionBadge from "@/components/landing/SectionBadge";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import SocialProofTicker from "@/components/landing/SocialProofTicker";
import HeroCanvas from "@/components/landing/HeroCanvas";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { solutionPages } from "@/data/solutionPageData";

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const },
};

const SolutionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? solutionPages[slug] : null;
  const [openStep, setOpenStep] = useState(0);

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Solution not found</h1>
          <Link to="/solutions" className="text-primary hover:underline">← Back to Solutions</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-20 md:pt-24 pb-12 md:pb-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div {...fade}>
              <Link to="/solutions" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] mb-4">
                <ArrowLeft className="h-4 w-4" /> Back to Solutions
              </Link>
              <SectionBadge text={data.badge} />
              <h1 className="mt-4 text-[28px] font-extrabold text-foreground sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.1]">
                {data.heroTitle}
              </h1>
              <p className="mt-4 md:mt-6 text-sm md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                {data.heroSub}
              </p>
              <Button size="lg" className="mt-6 md:mt-8 w-full sm:w-auto rounded-md font-semibold text-base px-8 h-12">
                {data.ctaBtn}
              </Button>
              <div className="mt-8 flex flex-wrap gap-6 md:gap-10">
                {data.stats.map((s, i) => (
                  <div key={i}>
                    <p className="text-2xl md:text-3xl font-extrabold text-primary">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] hidden md:block">
              <HeroCanvas />
            </div>
          </div>
        </div>
      </section>

      <SocialProofTicker />

      {/* Deep Dive - 2 col */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left sticky */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <motion.div {...fade}>
                <SectionBadge text={data.deepDiveBadge} />
                <h2 className="mt-4 text-2xl font-bold text-foreground md:text-4xl">
                  {data.deepDiveTitle}
                </h2>
                {data.deepDiveBody.map((p, i) => (
                  <p key={i} className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">{p}</p>
                ))}
                <div className="mt-6">
                  <p className="text-sm font-bold text-foreground mb-3">{data.deepDiveListTitle}:</p>
                  <ul className="space-y-2">
                    {data.deepDiveList.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <p className="text-sm font-bold text-foreground mb-3">Implementation Cost:</p>
                  {data.pricing.map((p, i) => (
                    <p key={i} className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{p.label}:</span> {p.value}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right - steps accordion */}
            <div>
              <Accordion type="single" value={`step-${openStep}`} onValueChange={(v) => setOpenStep(parseInt(v.replace("step-", "")) || 0)}>
                {data.steps.map((step, i) => (
                  <AccordionItem key={i} value={`step-${i}`} className="border-border">
                    <AccordionTrigger className="text-left hover:no-underline py-4 md:py-5 min-h-[44px]">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-sm md:text-base font-semibold text-foreground">{step.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-11">
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                      {step.link && (
                        <button className="mt-3 text-sm font-semibold text-primary hover:underline min-h-[44px] flex items-center">
                          {step.link.text}
                        </button>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Button size="lg" className="mt-8 w-full sm:w-auto rounded-md font-semibold text-base px-8 h-12">
                {data.ctaBtn}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 md:py-24 bg-surface-dark">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div {...fade} className="text-center mb-10 md:mb-14">
            <SectionBadge text={data.whyBadge} />
            <h2 className="mt-4 text-2xl font-bold text-foreground md:text-4xl">{data.whyTitle}</h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">{data.whySub}</p>
          </motion.div>
          <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.whyCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div key={i} {...fade} transition={{ delay: i * 0.08 }} className="rounded-xl border border-border bg-card p-5 md:p-6 hover:border-primary/40 transition-colors">
                  <Icon className="h-6 w-6 text-primary mb-4" />
                  <h3 className="text-sm md:text-base font-bold text-foreground mb-2">{card.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Can Be Monitored */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div {...fade} className="text-center mb-10 md:mb-14">
            <SectionBadge text={data.monitorBadge} />
            <h2 className="mt-4 text-2xl font-bold text-foreground md:text-4xl">{data.monitorTitle}</h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.monitorCategories.map((cat, i) => (
              <motion.div key={i} {...fade} transition={{ delay: i * 0.08 }} className="rounded-xl border border-border bg-card p-5 md:p-6">
                <h3 className="text-sm font-bold text-foreground mb-4">{cat.title}</h3>
                <ul className="space-y-2">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal Use Cases */}
      <section className="py-16 md:py-24 bg-surface-dark">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div {...fade} className="text-center mb-10 md:mb-14">
            <SectionBadge text={data.useCasesBadge} />
            <h2 className="mt-4 text-2xl font-bold text-foreground md:text-4xl">{data.useCasesTitle}</h2>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.useCases.map((uc, i) => (
              <motion.div key={i} {...fade} transition={{ delay: i * 0.06 }} className="rounded-xl border border-border bg-card p-5 md:p-6 text-center">
                <p className="text-sm md:text-base font-semibold text-foreground">{uc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <motion.div {...fade} className="text-center mb-10 md:mb-14">
            <SectionBadge text={data.howItWorksBadge} />
            <h2 className="mt-4 text-2xl font-bold text-foreground md:text-4xl">{data.howItWorksTitle}</h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">{data.howItWorksSub}</p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-[23px] top-0 bottom-0 w-px bg-primary/20 hidden md:block" />
            <div className="space-y-6 md:space-y-10">
              {data.howItWorksSteps.map((step, i) => (
                <motion.div key={i} {...fade} transition={{ delay: i * 0.1 }} className="flex gap-4 md:gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg shrink-0 z-10">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VisionIQ Advantage */}
      <section className="py-16 md:py-24 bg-surface-dark">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <motion.div {...fade}>
              <SectionBadge text={data.advantageBadge} />
              <h2 className="mt-4 text-2xl font-bold text-foreground md:text-4xl">{data.advantageTitle}</h2>
              <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">{data.advantageBody}</p>
              <ul className="mt-6 space-y-3">
                {data.advantageBullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fade} className="rounded-xl border border-border bg-card p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-4">Deliverables</p>
              <ul className="space-y-3">
                {data.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <motion.div {...fade} className="text-center mb-8 md:mb-12">
            <SectionBadge text="FAQ" />
            <h2 className="text-2xl font-bold text-foreground md:text-4xl mt-2">Frequently Asked Questions</h2>
          </motion.div>
          <Accordion type="single" collapsible className="w-full">
            {data.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-4 md:py-5 text-sm md:text-base min-h-[44px]">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 dot-matrix-bg">
        <div className="mx-auto max-w-3xl px-4 md:px-6 text-center">
          <motion.div {...fade}>
            <SectionBadge text="GET STARTED" />
            <h2 className="text-2xl font-bold text-foreground md:text-4xl mt-4">{data.bottomCTA.title}</h2>
            <p className="mt-3 md:mt-4 text-sm md:text-base text-muted-foreground max-w-xl mx-auto">{data.bottomCTA.sub}</p>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="rounded-md font-semibold text-base px-8 h-12">
                {data.bottomCTA.btn1}
              </Button>
              <Button size="lg" variant="outline" className="rounded-md font-semibold text-base px-8 h-12" asChild>
                <Link to="/case-studies">{data.bottomCTA.btn2}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SolutionPage;
