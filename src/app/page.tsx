import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/hero/Hero";
import { Pillars } from "@/components/sections/home/Pillars";
import { ArcStage } from "@/components/sections/home/hero/ArcStage";
import { Opportunities } from "@/components/sections/home/Opportunities";
import { Services } from "@/components/sections/home/Services";
import { Approach } from "@/components/sections/home/Approach";
import { WhyChoose } from "@/components/sections/home/WhyChoose";
import { UaeFocus } from "@/components/sections/home/UaeFocus";
import { Consultation } from "@/components/sections/home/Consultation";

export const metadata: Metadata = {
  title: "Build, Protect & Grow Your Wealth",
  description:
    "Strategic investment opportunities, expert advisory, risk management and long-term financial planning in the UAE.",
};

export default function HomePage() {
  return (
    <>
      <ArcStage>
        <Hero />
        <Pillars />
      </ArcStage>
      <Opportunities />
      <Services />
      <Approach />
      <WhyChoose />
      <UaeFocus />
      <Consultation />
    </>
  );
}
