import { IdCard, MessageCircle, Search } from "lucide-react";

const steps = [
  { icon: Search, title: "Find it", body: "Browse nearby listings and check the item details." },
  { icon: MessageCircle, title: "Message", body: "Agree on a price and a familiar campus pickup spot." },
  { icon: IdCard, title: "Meet safely", body: "Student accounts are reviewed before they can list." },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-y border-border bg-card">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="font-display text-2xl font-bold text-foreground">Made for quick campus exchanges</h2>
        <div className="mt-7 grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, body }, index) => (
            <div key={title} className="flex gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-border bg-background text-primary"><Icon className="h-5 w-5" /></span>
              <div><p className="text-xs font-bold text-primary">0{index + 1}</p><h3 className="font-display font-bold text-foreground">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}