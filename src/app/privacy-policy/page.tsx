import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal/LegalPage";
import { privacySections, privacyUpdated } from "@/content/legal/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Afaq Al Barakha Investment collects, uses and protects personal information submitted through this website.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      word="Privacy Policy"
      title="Privacy Policy"
      updated={privacyUpdated}
      sections={privacySections}
    />
  );
}