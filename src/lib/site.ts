export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Service", href: "/#services" },
  { label: "Opportunities", href: "/#opportunities" },
] as const;

export const ctaLink = { label: "Book a Consultation", href: "/enquiry" } as const;

export const contact = {
  phone: "+971 54 571 3199",
  phoneHref: "tel:+971545713199",
  email: "info@afaqalbarakha.com",
  address: ["Office No. 501, Al Zarouni Business Center", "Al Barsha 1, Sheikh Zayed Road, Dubai"],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Al+Zarouni+Business+Center+Al+Barsha+1+Dubai",
  whatsapp: "971545713199", // digits only
  whatsappMessage: "Hello, I'd like to book an investment consultation.",
};

export const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
  contact.whatsappMessage
)}`;

export const socials = [
  { name: "Instagram", handle: "@afaqalbarakha", href: "https://instagram.com/" },
  { name: "LinkedIn", handle: "Afaq Al Barakha", href: "https://linkedin.com/" },
  { name: "Facebook", handle: "Afaq Al Barakha", href: "https://facebook.com/" },
] as const;

export const footerLinks = {
  explore: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/#services" },
    { label: "Investment Opportunities", href: "/#opportunities" },
    { label: "Why Choose Us", href: "/#why-us" },
    { label: "Contact Us", href: "/enquiry" },
  ],
  resources: [
    { label: "FAQs", href: "/enquiry#faq" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
};


export const mapsEmbedUrl =
  "https://www.google.com/maps?q=Al+Zarouni+Business+Center+Al+Barsha+1+Dubai&output=embed";

export const serviceOptions = [
  "Investment Services",
  "Advisory Services",
  "Wealth Management",
  "Risk Management",
  "Investment Opportunities",
  "General Consultation",
] as const;

export const youtubeUrl = "https://youtube.com/";