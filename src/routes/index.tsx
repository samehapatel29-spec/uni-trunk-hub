import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Categories } from "@/components/landing/Categories";
import { Featured } from "@/components/landing/Featured";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Trust } from "@/components/landing/Trust";
import { CtaFooter } from "@/components/landing/CtaFooter";
import { StudentProfile } from "@/components/landing/StudentProfile";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "CampusCart — The marketplace for students" },
      {
        name: "description",
        content:
          "Buy and sell books, calculators, laptops and Arduino kits with verified students from your own college.",
      },
      { property: "og:title", content: "CampusCart — Marketplace for students" },
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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {user ? (
          <div className="bg-muted/30 py-8">
            <StudentProfile />
          </div>
        ) : (
          <Hero />
        )}
        <Categories />
        <Featured />
        <HowItWorks />
        <Trust />
        <CtaFooter />
      </main>
    </div>
  );
}
