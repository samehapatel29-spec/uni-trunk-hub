import { ShieldCheck, UserCheck, FileCheck2 } from "lucide-react";

export function Trust() {
  return (
    <section id="trust" className="mx-auto max-w-6xl px-5 py-20">
      <div className="grid gap-10 rounded-3xl border border-border bg-secondary p-8 text-secondary-foreground shadow-[var(--shadow-lift)] md:grid-cols-2 md:p-12">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verification, taken seriously
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            No random accounts. Only your classmates.
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
            Every seller is a verified engineering student from your college.
            No fake profiles, no strangers — just the batch above and below yours.
          </p>
        </div>

        <ul className="space-y-4">
          <li className="flex items-start gap-4 rounded-2xl bg-white/5 p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/20 text-primary-foreground">
              <UserCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium">Roll number check</p>
              <p className="text-sm text-white/60">Matched against your college's active roster.</p>
            </div>
          </li>
          <li className="flex items-start gap-4 rounded-2xl bg-white/5 p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/20 text-primary-foreground">
              <FileCheck2 className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium">Student ID upload</p>
              <p className="text-sm text-white/60">Reviewed manually by admins before you can list.</p>
            </div>
          </li>
          <li className="flex items-start gap-4 rounded-2xl bg-white/5 p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-success/20 text-success-foreground">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium">Verified badge</p>
              <p className="text-sm text-white/60">A visible tick tells buyers you're the real deal.</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
