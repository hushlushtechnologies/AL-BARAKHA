import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutIntro } from "@/components/sections/about/AboutIntro";
import { MissionVision } from "@/components/sections/about/MissionVision";
import { Discipline } from "@/components/sections/about/Discipline";
import { Consultation } from "@/components/sections/home/Consultation";
import { UaeFocus } from "@/components/sections/home/UaeFocus";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Afaq Al Barakha Investment is a Dubai-based investment company helping individuals and businesses build, protect and grow wealth through strategic planning and risk management.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <MissionVision />
      <Discipline />
      <UaeFocus />
      <Consultation />
    </>
  );
}
