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
    <section id="categories" className="relative mx-auto max-w-6xl px-5 py-20">
      <div className="mb-10 max-w-2xl">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Browse by <span className="text-gradient">category</span>
        </h2>
        <p className="mt-2 text-muted-foreground">
          Everything an engineering student actually needs.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {cats.map(({ icon: Icon, label }) => (
          <a
            key={label}
            href="#browse"
            className="group relative flex flex-col items-start gap-3 overflow-hidden rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-[var(--shadow-glow)]"
          >
            <div className="absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100"
                 style={{ background: "var(--gradient-primary)", filter: "blur(40px)", transform: "scale(0.8)" }} />
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-[var(--shadow-soft)] transition-transform group-hover:scale-110">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold text-foreground">{label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
