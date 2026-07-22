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
    <section id="how" className="bg-card/60 border-y border-border">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-secondary sm:text-4xl">
            Simple, safe, campus-only.
          </h2>
          <p className="mt-2 text-muted-foreground">
            Three steps between you and your next textbook, calculator or Arduino kit.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
            >
              <span className="absolute -top-3 left-6 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                0{i + 1}
              </span>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-secondary">
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
