/**
 * Site-wide configuration and verified company facts.
 *
 * Only add facts here that the company has approved for publication. Pages,
 * structured data, and llms.txt all read from this file.
 */
export const site = {
  name: "Coastline Digital",
  url: "https://coastlinedigital.net",
  email: "hello@coastlinedigital.net",
  // Public location shown in the footer and Organization structured data.
  locality: "San Diego",
  region: "CA",
  country: "US",
  positioning: "Senior engineering expertise. Practical AI. Software built for business.",
  description:
    "Coastline Digital is a US-based software engineering and AI consulting company. We help companies design, build, and scale software products, AI solutions, and enterprise systems with experienced engineering teams.",
  logo: "/assets/brand/NewLogos/coastline-mark.png",
  ogImage: "/og-image.png?v=20261105",

  /**
   * Contact forms post natively to FormSubmit, which emails each submission
   * to the address below and handles CAPTCHA verification. The endpoint is
   * public by design. See README > Forms before changing providers.
   */
  forms: {
    endpoint: "https://formsubmit.co/hello@coastlinedigital.net",
    captcha: true,
  },

  /**
   * Conversion tracking is off. To enable it, set `provider` to "plausible"
   * or "ga4", fill in the matching fields, update the privacy policy, and add
   * the provider's domains to the Content-Security-Policy in render.yaml.
   * When enabled, nothing loads until the visitor accepts the consent prompt.
   */
  analytics: {
    provider: null, // "plausible" | "ga4" | null
    plausibleDomain: "coastlinedigital.net",
    ga4MeasurementId: "",
  },
};

/** Primary navigation. Keep this short; secondary links live in the footer. */
export const nav = [
  { label: "Services", href: "/services/", menu: "services" },
  { label: "Solutions", href: "/solutions/" },
  { label: "Partnerships", href: "/partnerships/" },
  { label: "How We Work", href: "/how-we-work/" },
  { label: "About", href: "/about/" },
];

export const footerNav = [
  {
    title: "Services",
    links: [
      { label: "All services", href: "/services/" },
      { label: "Custom software", href: "/services/custom-software-development/" },
      { label: "AI and machine learning", href: "/services/ai-machine-learning/" },
      { label: "Cloud and data engineering", href: "/services/cloud-data-engineering/" },
      { label: "Enterprise applications", href: "/services/enterprise-applications/" },
      { label: "Dedicated engineering teams", href: "/services/dedicated-engineering-teams/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about/" },
      { label: "How we work", href: "/how-we-work/" },
      { label: "Solution concepts", href: "/solutions/" },
      { label: "Engineering partnerships", href: "/partnerships/" },
      { label: "Careers", href: "/careers/" },
      { label: "FAQ", href: "/faq/" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { label: "Discuss a project", href: "/contact/" },
      { label: "Become a delivery partner", href: "/partnerships/#partner-inquiry" },
      { label: "hello@coastlinedigital.net", href: "mailto:hello@coastlinedigital.net" },
    ],
  },
];
