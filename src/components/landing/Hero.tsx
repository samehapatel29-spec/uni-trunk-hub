import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-items.jpg";
import { VerifiedBadge } from "@/components/shared/VerifiedBadge";

export function Hero() {
  return (
    <section className="grid-fade relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-16 px-5 pt-16 pb-24 md:grid-cols-2 md:items-center md:pt-24 md:pb-32">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-[var(--shadow-soft)]">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Built for engineering campuses
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-secondary sm:text-5xl md:text-6xl">
            The marketplace{" "}
            <span className="text-primary">built for engineers</span>,
            by engineers.
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Buy and sell books, calculators, laptops, Arduino kits and hostel
            essentials — safely, with verified students from your own college.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#browse"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
            >
              Browse listings
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#signup"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-secondary transition-colors hover:bg-muted"
            >
              Join with your roll no.
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-success" />
            Only verified students can list or message.
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-2xl" />
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-lift)]">
            <img
              src={heroImg}
              alt="Laptop, calculator, Arduino board and engineering textbooks"
              width={1600}
              height={1200}
              className="h-auto w-full object-cover"
            />
          </div>

          {/* Floating listing card */}
          <div className="absolute -bottom-6 -left-4 w-64 rounded-2xl border border-border bg-card/90 p-4 shadow-[var(--shadow-lift)] backdrop-blur-md sm:-left-8">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-secondary">Arduino Uno R3 + kit</p>
                <p className="text-xs text-muted-foreground">Like new · ECE, 3rd year</p>
              </div>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                ₹850
              </span>
            </div>
            <div className="mt-3">
              <VerifiedBadge />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
