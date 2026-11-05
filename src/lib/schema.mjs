import { site } from "../site.mjs";
import { services } from "../content/services.mjs";
import { organizationId } from "../components/layout.mjs";

/** Organization structured data built only from verified facts in site.mjs. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    url: `${site.url}/`,
    email: site.email,
    logo: `${site.url}${site.logo}`,
    description: site.description,
    slogan: site.positioning,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      url: `${site.url}/contact/`,
      availableLanguage: "English",
    },
    knowsAbout: [
      "Custom software development",
      "Full-stack web application development",
      "Enterprise application modernization",
      "AI and machine learning engineering",
      "Generative AI",
      "Retrieval-augmented generation",
      "AI agents",
      "Cloud architecture",
      "Data engineering",
      "API development",
      "Dedicated software development teams",
      "Software development subcontracting",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Coastline Digital services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.longName ?? s.name, url: `${site.url}${s.href}` },
      })),
    },
  };
}

export function serviceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}${service.href}#service`,
    name: service.longName ?? service.name,
    serviceType: service.serviceType,
    description: service.seo.description,
    url: `${site.url}${service.href}`,
    provider: { "@id": organizationId },
  };
}
