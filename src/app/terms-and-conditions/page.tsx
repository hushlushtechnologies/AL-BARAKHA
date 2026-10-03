import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal/LegalPage";
import { termsSections, termsUpdated } from "@/content/legal/terms";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms & Conditions for using the Afaq Al Barakha Investment website and its investment-related information.",
};

export default function TermsPage() {
  return (
    <LegalPage
      word="Terms & Conditions"
      title="Terms & Conditions"
      updated={termsUpdated}
      sections={termsSections}
    />
  );
}