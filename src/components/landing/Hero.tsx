import { MapPin, Search } from "lucide-react";

export function Hero() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        <div className="max-w-3xl">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
            <MapPin className="h-4 w-4" /> Your campus marketplace
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Find what you need. Pass on what you don’t.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Books, lab kits, cycles and everyday hostel finds—from students around campus.
          </p>
        </div>

        <form action="#browse" className="mt-8 flex max-w-3xl items-center gap-3 rounded-lg border border-border bg-card p-2 shadow-[var(--shadow-soft)]">
          <Search className="ml-2 h-5 w-5 shrink-0 text-muted-foreground" />
          <label htmlFor="listing-search" className="sr-only">Search listings</label>
          <input
            id="listing-search"
            name="q"
            type="search"
            placeholder="Search books, calculators, cycles..."
            className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Search
          </button>
        </form>
      </div>
    </section>
  );
}