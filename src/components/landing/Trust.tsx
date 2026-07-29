import { ShieldCheck, UserCheck, FileCheck2 } from "lucide-react";

export function Trust() {
  return (
    <section id="trust" className="mx-auto max-w-6xl px-5 py-20">
      <div className="relative grid gap-10 overflow-hidden rounded-3xl border border-primary/30 bg-card p-8 shadow-[var(--shadow-glow)] md:grid-cols-2 md:p-12">
        <div className="absolute inset-0 -z-10 bg-aurora opacity-40" />
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-md">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            Verification, taken seriously
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            No random accounts. <span className="text-gradient">Only your classmates.</span>
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Every seller is a verified student from your college.
            No fake profiles, no strangers — just the batch above and below yours.
          </p>
        </div>

        <ul className="space-y-4">
          {[
            { icon: UserCheck, title: "Roll number check", body: "Matched against your college's active roster." },
            { icon: FileCheck2, title: "Student ID upload", body: "Reviewed manually by admins before you can list." },
            { icon: ShieldCheck, title: "Verified badge", body: "A visible tick tells buyers you're the real deal." },
          ].map((it) => (
            <li key={it.title} className="glass-card flex items-start gap-4 rounded-2xl p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-[var(--shadow-glow)]">
                <it.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-foreground">{it.title}</p>
                <p className="text-sm text-muted-foreground">{it.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
