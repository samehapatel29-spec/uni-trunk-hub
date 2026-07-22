import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { VerifiedBadge } from "@/components/shared/VerifiedBadge";
import { AnimatedBackground } from "@/components/landing/AnimatedBackground";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <AnimatedBackground />

      <div className="mx-auto grid max-w-6xl gap-14 px-5 pt-16 pb-24 md:grid-cols-2 md:items-center md:pt-24 md:pb-32">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary-foreground/90 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Built for engineering campuses · v1 live
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            The marketplace{" "}
            <span className="text-gradient">built for engineers</span>,
            by engineers.
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Buy and sell books, calculators, laptops, Arduino kits and hostel
            essentials — safely, with verified students from your own college.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#browse"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
            >
              Browse listings
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#signup"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:border-primary/50 hover:bg-card"
            >
              Join with your roll no.
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-success" />
            Only verified students can list or message.
          </div>

          <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
            <div>
              <div className="font-display text-xl font-bold text-foreground">1,200+</div>
              verified students
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="font-display text-xl font-bold text-foreground">3,500+</div>
              items traded
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="font-display text-xl font-bold text-foreground">24 hr</div>
              avg. sale time
            </div>
          </div>
        </div>

        <div className="relative" style={{ animation: "var(--animate-float)" }}>
          {/* Glow ring */}
          <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-gradient-primary opacity-30 blur-3xl" />

          {/* Main showcase card */}
          <div className="glass-card overflow-hidden rounded-3xl p-6 shadow-[var(--shadow-glow)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Live on campus feed</span>
              <span className="flex items-center gap-1.5 text-xs text-success">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                live
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { t: "MacBook Air M1", p: "₹48k", from: "from-primary/30 to-violet/30" },
                { t: "Casio FX-991", p: "₹650", from: "from-accent/30 to-primary/30" },
                { t: "ESP32 Kit", p: "₹1.1k", from: "from-violet/30 to-accent/30" },
                { t: "DSA Notes", p: "₹250", from: "from-primary/30 to-accent/30" },
              ].map((c) => (
                <div
                  key={c.t}
                  className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${c.from} p-4 transition-transform hover:-translate-y-1`}
                >
                  <div className="aspect-square rounded-xl bg-background/40 backdrop-blur-sm" />
                  <div className="mt-3 flex items-center justify-between">
                    <p className="truncate text-xs font-semibold text-foreground">{c.t}</p>
                    <span className="shrink-0 rounded-full bg-background/60 px-2 py-0.5 text-[10px] font-bold text-primary-glow">
                      {c.p}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating listing card */}
          <div className="glass-card absolute -bottom-6 -left-4 w-64 rounded-2xl p-4 shadow-[var(--shadow-lift)] sm:-left-10">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">Arduino Uno R3 + kit</p>
                <p className="text-xs text-muted-foreground">Like new · ECE, 3rd year</p>
              </div>
              <span className="shrink-0 rounded-full bg-gradient-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
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
