import {
  BookOpen, NotebookPen, Calculator, Laptop, Cpu, CircuitBoard,
  FlaskConical, Bike, Bed, Package,
} from "lucide-react";

const cats = [
  { icon: BookOpen, label: "Books" },
  { icon: NotebookPen, label: "Notes" },
  { icon: Calculator, label: "Calculators" },
  { icon: Laptop, label: "Laptops" },
  { icon: Cpu, label: "Electronics" },
  { icon: CircuitBoard, label: "Arduino / ESP32" },
  { icon: FlaskConical, label: "Lab Kits" },
  { icon: Bike, label: "Cycles" },
  { icon: Bed, label: "Hostel" },
  { icon: Package, label: "Others" },
];

export function Categories() {
  return (
    <section id="categories" className="mx-auto max-w-6xl px-5 py-20">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-semibold text-secondary sm:text-4xl">
            Browse by category
          </h2>
          <p className="mt-2 text-muted-foreground">
            Everything an engineering student actually needs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {cats.map(({ icon: Icon, label }) => (
          <a
            key={label}
            href="#browse"
            className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium text-secondary">{label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
