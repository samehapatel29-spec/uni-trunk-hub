import { Heart } from "lucide-react";
import { VerifiedBadge } from "@/components/shared/VerifiedBadge";

const items = [
  { title: "HP Pavilion 15 · i5 11th gen", price: "₹32,500", tag: "Laptops", seller: "Aarav · CSE '25", hue: "from-primary/30 via-violet/20 to-transparent" },
  { title: "Casio FX-991ES Plus", price: "₹650", tag: "Calculators", seller: "Meera · ECE '26", hue: "from-accent/30 via-primary/20 to-transparent" },
  { title: "DSA + OS handwritten notes", price: "₹250", tag: "Notes", seller: "Rohan · CSE '25", hue: "from-violet/30 via-accent/20 to-transparent" },
  { title: "ESP32 DevKit + sensors", price: "₹1,100", tag: "Electronics", seller: "Ishita · EEE '27", hue: "from-primary/30 via-accent/20 to-transparent" },
];

export function Featured() {
  return (
    <section id="browse" className="mx-auto max-w-6xl px-5 py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Fresh on <span className="text-gradient">campus</span>
          </h2>
          <p className="mt-2 text-muted-foreground">Recently listed by verified students.</p>
        </div>
        <a href="#browse" className="text-sm font-medium text-primary-glow hover:underline">
          See all →
        </a>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <article
            key={it.title}
            className="group glass-card overflow-hidden rounded-2xl transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
          >
            <div className={`relative aspect-[4/3] bg-gradient-to-br ${it.hue}`}>
              <div className="absolute inset-0 bg-grid opacity-40" />
              <button
                aria-label="Add to wishlist"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/70 text-muted-foreground shadow-[var(--shadow-soft)] backdrop-blur-md transition-colors hover:text-accent"
              >
                <Heart className="h-4 w-4" />
              </button>
              <span className="absolute left-3 top-3 rounded-full bg-background/70 px-2 py-1 text-xs font-medium text-foreground shadow-[var(--shadow-soft)] backdrop-blur-md">
                {it.tag}
              </span>
            </div>
            <div className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="line-clamp-1 text-sm font-semibold text-foreground">{it.title}</h3>
                <span className="shrink-0 text-sm font-bold text-primary-glow">{it.price}</span>
              </div>
              <p className="text-xs text-muted-foreground">{it.seller}</p>
              <div className="pt-1"><VerifiedBadge /></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
