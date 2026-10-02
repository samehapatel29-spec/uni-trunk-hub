import { BadgeCheck, IdCard, ShieldCheck } from "lucide-react";

export function Trust() {
  return (
    <section id="trust" className="mx-auto max-w-6xl px-5 py-12">
      <div className="grid gap-8 border-b border-border pb-12 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-sm font-bold text-primary">Student verification</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-foreground">Know who you’re meeting.</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Roll number and student ID details help keep CampusCart within the college community.</p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-3">
          {[{ icon: IdCard, text: "Roll number during registration" }, { icon: ShieldCheck, text: "Student ID reviewed by admin" }, { icon: BadgeCheck, text: "Status shown on student profiles" }].map(({ icon: Icon, text }) => (
            <li key={text} className="rounded-lg border border-border bg-card p-4 text-sm font-medium text-foreground"><Icon className="mb-3 h-5 w-5 text-primary" />{text}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}