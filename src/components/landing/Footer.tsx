import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks: Record<string, { label: string; to: string }[]> = {
  Services: [
    { label: "Theft Prevention", to: "/capabilities/theft-prevention" },
    { label: "Customer Analytics", to: "/capabilities/customer-analytics" },
    { label: "Staff Monitoring", to: "/capabilities/staff-monitor" },
    { label: "Fire Detection", to: "/capabilities/fire-detection" },
    { label: "People Re-ID", to: "/capabilities/people-reid" },
  ],
  Company: [
    { label: "About Us", to: "/company" },
    { label: "Careers", to: "/careers" },
    { label: "Press", to: "/company#press" },
    { label: "Contact", to: "/company#contact" },
    { label: "Partners", to: "/company#contact" },
  ],
  Resources: [
    { label: "Blog", to: "/case-studies" },
    { label: "Case Studies", to: "/case-studies" },
    { label: "Documentation", to: "/approach" },
    { label: "API Reference", to: "/approach" },
    { label: "Support", to: "/company#contact" },
  ],
};

const Footer = () => (
  <footer className="border-t border-border bg-transparent">
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 md:py-16">
      <div className="grid gap-8 md:gap-12 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1 pb-6 border-b border-border sm:border-0">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">VisionIQ</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            AI-powered smart surveillance for retail and commercial enterprises.
          </p>
          <div className="flex gap-4">
            {["Twitter", "LinkedIn", "GitHub"].map((s) => (
              <span key={s} className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center">
                {s}
              </span>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([title, links], idx) => (
          <div key={title} className={`pb-6 ${idx < Object.keys(footerLinks).length - 1 ? "border-b border-border sm:border-0" : "sm:border-0"}`}>
            <h4 className="text-sm font-semibold text-foreground mb-3 md:mb-4">{title}</h4>
            <ul className="space-y-1 md:space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground text-center">© 2026 VisionIQ Technologies Pvt. Ltd.</span>
        <div className="flex gap-6">
          <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer min-h-[44px] flex items-center">Privacy</span>
          <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer min-h-[44px] flex items-center">Terms</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;