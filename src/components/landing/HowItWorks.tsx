import { IdCard, Store, MessagesSquare } from "lucide-react";

const steps = [
  {
    icon: IdCard,
    title: "Verify with your college ID",
    body: "Sign up with your roll number and upload your student ID. Our admins verify each account.",
  },
  {
    icon: Store,
    title: "List or browse in minutes",
    body: "Create a listing with photos and a fair price, or browse gear from students in your batch.",
  },
  {
    icon: MessagesSquare,
    title: "Chat and meet on campus",
    body: "Message the seller in-app, agree on a time, and hand it over between classes.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden border-y border-border bg-card/30">
      <div className="bg-grid absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Simple, safe, <span className="text-gradient">campus-only.</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Three steps between you and your next textbook, calculator or Arduino kit.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="glass-card relative rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <span className="absolute -top-3 left-6 rounded-full bg-gradient-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground shadow-[var(--shadow-glow)]">
                0{i + 1}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-[var(--shadow-glow)]">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
