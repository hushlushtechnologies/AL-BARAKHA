import type { Metadata } from "next";
import { EnquirySection } from "@/components/sections/enquiry/EnquirySection";
import { Faq } from "@/components/sections/enquiry/Faq";
import { Consultation } from "@/components/sections/home/Consultation";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Speak with Afaq Al Barakha Investment's advisors. Book a consultation by form, WhatsApp, phone or email, or visit our office in Al Barsha, Dubai.",
};

export default function EnquiryPage() {
  return (
    <>
      <EnquirySection />
      <Faq />
      <Consultation />
    </>
  );
}
