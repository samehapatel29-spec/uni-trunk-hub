import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Categories } from "@/components/landing/Categories";
import { Featured } from "@/components/landing/Featured";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Trust } from "@/components/landing/Trust";
import { CtaFooter } from "@/components/landing/CtaFooter";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "CampusCart — The marketplace for engineering students" },
      {
        name: "description",
        content:
          "Buy and sell books, calculators, laptops and Arduino kits with verified engineering students from your own college.",
      },
      { property: "og:title", content: "CampusCart — Marketplace for engineering students" },
      {
        property: "og:description",
        content:
          "A safe, campus-only marketplace. Only verified students can list and message.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Featured />
        <HowItWorks />
        <Trust />
        <CtaFooter />
      </main>
    </div>
  );
}
