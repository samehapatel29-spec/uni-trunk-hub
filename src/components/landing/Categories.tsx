import { Bike, BookOpen, Calculator, CircuitBoard, Cpu, FlaskConical, Laptop, Package } from "lucide-react";

const categories = [
  { icon: BookOpen, label: "Books" },
  { icon: Calculator, label: "Calculators" },
  { icon: CircuitBoard, label: "Lab kits" },
  { icon: Laptop, label: "Laptops" },
  { icon: Cpu, label: "Electronics" },
  { icon: Bike, label: "Cycles" },
  { icon: FlaskConical, label: "Notes" },
  { icon: Package, label: "Hostel" },
];

export function Categories() {
  return (
    <section id="categories" className="mx-auto max-w-6xl px-5 pt-8">
      <h2 className="font-display text-lg font-bold text-foreground">Browse categories</h2>
      <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-2">
        {categories.map(({ icon: Icon, label }) => (
          <a key={label} href="#browse" className="flex min-w-24 flex-col items-center gap-2 rounded-lg border border-border bg-card px-3 py-4 text-center hover:border-primary">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-xs font-semibold text-foreground">{label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}