import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SectionBadge from "./SectionBadge";

const posts = [
  { category: "Case Study", title: "How AI Cameras Cut Shrinkage by 60% at a Mumbai Fashion Chain", excerpt: "A deep dive into deploying concealment detection across 8 stores and the measurable impact on loss prevention.", date: "Mar 2, 2026", readTime: "6 min read" },
  { category: "Industry", title: "The Real Cost of Passive CCTV in Indian Retail", excerpt: "Why traditional surveillance is costing retailers ₹1.2 lakh crore annually — and what the alternative looks like.", date: "Feb 18, 2026", readTime: "4 min read" },
  { category: "Case Study", title: "Fire Detection Case Study: Warehouse in Pune Averts Disaster", excerpt: "How VisionIQ's thermal + visual AI detected an electrical fire 11 minutes before the smoke alarm triggered.", date: "Feb 5, 2026", readTime: "5 min read" },
];

const BlogSection = () => (
  <section className="py-16 md:py-24 bg-transparent">
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8 md:mb-12"
      >
        <SectionBadge text="BLOG" />
        <h2 className="text-2xl font-bold text-foreground md:text-4xl mt-2">Latest Insights</h2>
      </motion.div>
      <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group rounded-xl border border-border bg-card overflow-hidden transition-colors hover:border-primary/30"
          >
            <div className="h-36 md:h-48 bg-muted/30 flex items-center justify-center">
              <span className="text-muted-foreground/30 text-sm">Thumbnail</span>
            </div>
            <div className="p-4 md:p-6">
              <Badge variant="outline" className="mb-2 md:mb-3 text-primary border-primary/30 text-[10px] uppercase tracking-wider">
                {post.category}
              </Badge>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-1.5 md:mb-2 leading-snug">{post.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <span className="mt-3 md:mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity min-h-[44px] md:min-h-0 items-center">
                Read article <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default BlogSection;
