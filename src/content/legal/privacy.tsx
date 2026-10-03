import Link from "next/link";
import { contact } from "@/lib/site";
import { LegalList, type LegalSection } from "@/components/sections/legal/LegalPage";

const linkClass = "text-brand-light underline decoration-brand-light/40 underline-offset-4 hover:decoration-brand-light";

export const privacyUpdated = "October 2026";

export const privacySections: LegalSection[] = [
  {
    heading: "Information We Collect",
    body: [
      "We may collect information that you voluntarily provide, including:",
      <LegalList
        key="collect"
        items={[
          "Full name",
          "Email address",
          "Phone number",
          "Company or investor details",
          "Service interests",
          "Information submitted through contact or consultation forms",
        ]}
      />,
      "We may also collect basic technical information such as browser type, device information, and website usage data.",
    ],
  },
  {
    heading: "How We Use Your Information",
    body: [
      "Information may be used to:",
      <LegalList
        key="use"
        items={[
          "Respond to enquiries and consultation requests",
          "Provide information about our services",
          "Understand your investment requirements",
          "Improve our website and customer experience",
          "Communicate relevant updates where permitted",
          "Meet applicable legal or regulatory requirements",
        ]}
      />,
    ],
  },
  {
    heading: "Sharing of Information",
    body: [
      "We do not sell or rent your personal information. Information may only be shared with trusted service providers or professional partners where necessary to operate our website, provide requested services, or comply with applicable requirements.",
    ],
  },
  {
    heading: "Data Security",
    body: [
      "We take reasonable measures to protect personal information from unauthorized access, misuse, loss, or disclosure. However, no online system can guarantee complete security.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "Our website may use cookies and similar technologies to support website functionality, understand visitor activity, and improve performance. You can manage cookies through your browser settings where available.",
    ],
  },
  {
    heading: "Third-Party Links",
    body: [
      "Our website may contain links to external websites. Afaq Al Barakha Investment is not responsible for the privacy practices or content of third-party websites.",
    ],
  },
  {
    heading: "Your Rights",
    body: [
      "You may contact us to request access to, correction of, or deletion of personal information you have provided to us, subject to applicable legal and regulatory requirements.",
    ],
  },
  {
    heading: "Policy Updates",
    body: [
      "We may update this Privacy Policy from time to time. Any changes will be published on this page with the updated revision date.",
    ],
  },
  {
    heading: "Contact Us",
    body: [
      <>
        For questions about this Privacy Policy or how your information is handled, please contact Afaq Al
        Barakha Investment at{" "}
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