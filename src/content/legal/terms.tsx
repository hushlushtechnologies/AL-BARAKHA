import Link from "next/link";
import { contact } from "@/lib/site";
import type { LegalSection } from "@/components/sections/legal/LegalPage";

const linkClass = "text-brand-light underline decoration-brand-light/40 underline-offset-4 hover:decoration-brand-light";

export const termsUpdated = "October 2026";

export const termsSections: LegalSection[] = [
  {
    heading: "Website Use",
    body: [
      "This website is provided for general information about Afaq Al Barakha Investment, our services, and investment-related solutions. You agree to use the website only for lawful purposes.",
    ],
  },
  {
    heading: "Investment Information",
    body: [
      "Information provided on this website is general in nature and should not be considered a guarantee of investment performance, returns, or future results. Investment opportunities may involve risk, and clients should carefully evaluate their objectives and circumstances before making investment decisions.",
    ],
  },
  {
    heading: "No Guaranteed Returns",
    body: [
      "Afaq Al Barakha Investment does not guarantee profits, investment returns, or protection from market losses. Past performance or market information does not guarantee future results.",
    ],
  },
  {
    heading: "Services & Agreements",
    body: [
      "Any investment, advisory, wealth management, or related service provided by Afaq Al Barakha Investment may be subject to separate agreements, eligibility requirements, documentation, and applicable UAE laws and regulations.",
    ],
  },
  {
    heading: "Intellectual Property",
    body: [
      "All website content, including text, graphics, branding, logos, and design elements, belongs to Afaq Al Barakha Investment or its respective owners and may not be copied or reproduced without permission.",
    ],
  },
  {
    heading: "Third-Party Links",
    body: [
      "Our website may contain links to external websites. We are not responsible for the content, security, availability, or practices of third-party websites.",
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      "Afaq Al Barakha Investment is not responsible for losses or damages arising from reliance on general website information, technical issues, third-party content, or the use of this website.",
    ],
  },
  {
    heading: "Changes to These Terms",
    body: [
      "We may update these Terms & Conditions when required. Any changes will be published on this page with the updated revision date.",
    ],
  },
  {
    heading: "Governing Law",
    body: [
      "These Terms & Conditions are governed by the applicable laws and regulations of the United Arab Emirates.",
    ],
  },
  {
    heading: "Contact Us",
    body: [
      <>
        For questions regarding these Terms & Conditions, please contact Afaq Al Barakha Investment at{" "}
        <a href={`mailto:${contact.email}`} className={linkClass}>
          {contact.email}
        </a>
        , call{" "}
        <a href={contact.phoneHref} className={linkClass}>
          {contact.phone}
        </a>
        , or use our{" "}
        <Link href="/enquiry" className={linkClass}>
          enquiry form
        </Link>
        .
      </>,
    ],
  },
];