import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { z } from "zod";
import { Navbar } from "@/components/shared/Navbar";
import { ItemCard } from "@/components/marketplace/ItemCard";
import { EmptyState } from "@/components/marketplace/EmptyState";
import { FilterControls } from "@/components/marketplace/FilterControls";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { applyFilters, getCategories, getListings } from "@/lib/marketplace/api";
import type { ListingFilters, SortKey } from "@/lib/marketplace/types";

const searchSchema = z.object({
  q: z.string().optional().catch(undefined),
  category: z.string().optional().catch(undefined),
  min: z.coerce.number().nonnegative().optional().catch(undefined),
  max: z.coerce.number().nonnegative().optional().catch(undefined),
  condition: z.string().optional().catch(undefined),
  sort: z.enum(["recommended", "newest", "price-asc", "price-desc"]).optional().catch(undefined),
  sold: z.boolean().optional().catch(undefined),
});

export const Route = createFileRoute("/browse")({
  validateSearch: (search) => searchSchema.parse(search),
  component: BrowsePage,
  head: () => ({
    meta: [
      { title: "Explore campus deals — CampusCart" },
      {
        name: "description",
        content:
          "Search and filter second-hand books, calculators, lab kits, laptops and cycles from students on your campus.",
      },
      { property: "og:title", content: "Explore campus deals — CampusCart" },
      {
        property: "og:description",
        content: "Filter by category, price and condition. Arrange a campus pickup with verified students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function BrowsePage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/browse" });
  const [sheetOpen, setSheetOpen] = useState(false);

  const filters: ListingFilters = useMemo(
    () => ({
      q: search.q || undefined,
      category: search.category || undefined,
      min: search.min,
      max: search.max,
      condition: search.condition || undefined,
      sort: (search.sort ?? "recommended") as SortKey,
      includeSold: search.sold,
    }),
    [search],
  );

  const { data: categories = [] } = useQuery({ queryKey: ["categories"], queryFn: getCategories, staleTime: 300_000 });
  const { data, isLoading } = useQuery({ queryKey: ["listings"], queryFn: getListings, staleTime: 30_000 });

  const results = useMemo(() => applyFilters(data?.listings ?? [], filters), [data, filters]);

  const setFilters = (patch: Partial<ListingFilters>) => {
    navigate({
      search: (prev) => ({
        ...prev,
        q: patch.q !== undefined ? patch.q : prev.q,
        category: patch.category !== undefined || patch.category === undefined && "category" in patch ? patch.category : prev.category,
        min: "min" in patch ? patch.min : prev.min,
        max: "max" in patch ? patch.max : prev.max,
        condition: "condition" in patch ? patch.condition : prev.condition,
        sort: "sort" in patch ? patch.sort : prev.sort,
        sold: "includeSold" in patch ? patch.includeSold : prev.sold,
      }),
      replace: true,
    });
  };

  const clearAll = () => navigate({ search: {}, replace: true });

  const activeCount =
    (filters.category ? 1 : 0) +
    (filters.condition ? 1 : 0) +
    (filters.min != null || filters.max != null ? 1 : 0) +
    (filters.includeSold ? 1 : 0) +
    (filters.sort && filters.sort !== "recommended" ? 1 : 0);

  const activeChips: { label: string; patch: Partial<ListingFilters> }[] = [];
  if (filters.category)
    activeChips.push({
      label: categories.find((c) => c.slug === filters.category)?.name ?? filters.category,
      patch: { category: undefined },
    });
  if (filters.condition) activeChips.push({ label: filters.condition, patch: { condition: undefined } });
  if (filters.min != null || filters.max != null)
    activeChips.push({
      label: `₹${filters.min ?? 0} – ${filters.max != null ? `₹${filters.max}` : "any"}`,
      patch: { min: undefined, max: undefined },
    });
  if (filters.includeSold) activeChips.push({ label: "Including sold", patch: { includeSold: undefined } });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 py-8">
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Explore campus deals</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isLoading ? "Loading listings…" : `${results.length} ${results.length === 1 ? "item" : "items"}`}
          {data?.demo && " · showing sample listings until students post real ones"}
        </p>

        {/* Search */}
        <form
          className="mt-5 flex max-w-xl items-center gap-2 rounded-lg border border-border bg-card p-1.5"
          onSubmit={(e) => {
            e.preventDefault();
            const value = new FormData(e.currentTarget).get("q");
            setFilters({ q: String(value ?? "").trim() || undefined });
          }}
        >
          <Search className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" />
          <label htmlFor="browse-search" className="sr-only">
            Search listings
          </label>
          <Input
            id="browse-search"
            name="q"
            type="search"
            defaultValue={filters.q ?? ""}
            placeholder="Search titles, descriptions, categories…"
            className="border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
          <Button type="submit" size="sm">
            Search
          </Button>
        </form>

        {/* Desktop filter toolbar */}
        <div className="mt-4 hidden rounded-lg border border-border bg-card p-4 lg:block">
          <FilterControls
            filters={filters}
            categories={categories}
            onChange={setFilters}
            className="grid grid-cols-5 items-end gap-4"
          />
        </div>

        {/* Mobile filter button + chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters{activeCount > 0 && ` (${activeCount})`}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <FilterControls filters={filters} categories={categories} onChange={setFilters} />
              </div>
              <div className="mt-6 flex gap-2">
                <Button variant="outline" className="flex-1" onClick={clearAll}>
                  Clear all
                </Button>
                <Button className="flex-1" onClick={() => setSheetOpen(false)}>
                  Show {results.length} results
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {activeChips.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => setFilters(chip.patch)}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs font-medium text-foreground hover:border-primary"
            >
              {chip.label}
              <X className="h-3 w-3" />
            </button>
          ))}
          {(activeCount > 0 || filters.q) && (
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Results */}
        <div className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-lg border border-border">
                  <Skeleton className="aspect-square w-full" />
                  <div className="space-y-2 p-3">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : results.length === 0 ? (
            <EmptyState
              actionLabel="Clear all filters"
              onAction={clearAll}
              body="No listings match this combination yet. Try widening the price range or clearing a filter."
            />
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {results.map((listing, i) => (
                <ItemCard key={listing.id} listing={listing} eager={i < 4} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
