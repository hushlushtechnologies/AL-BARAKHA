 import type { Metadata } from "next";
import { Pathway_Extreme } from "next/font/google";
 
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const pathway = Pathway_Extreme({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-pathway",
  display: "swap",
});

 

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: { default: "Brand Name", template: "%s | Brand Name" },
  description: "…",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pathway.variable}>
      <body>
        <SmoothScroll>
          <Header />
          {children}
          <Footer
           />
        </SmoothScroll>
      </body>
    </html>
  );
}