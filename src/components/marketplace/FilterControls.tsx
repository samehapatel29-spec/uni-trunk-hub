import { CONDITIONS, type Category, type ListingFilters, type SortKey } from "@/lib/marketplace/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

export function FilterControls({
  filters,
  categories,
  onChange,
}: {
  filters: ListingFilters;
  categories: Category[];
  onChange: (patch: Partial<ListingFilters>) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="filter-category">Category</Label>
        <Select
          value={filters.category || "all"}
          onValueChange={(v) => onChange({ category: v === "all" ? undefined : v })}
        >
          <SelectTrigger id="filter-category">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>Price range (₹)</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="Min"
            aria-label="Minimum price"
            value={filters.min ?? ""}
            onChange={(e) => onChange({ min: e.target.value === "" ? undefined : Number(e.target.value) })}
          />
          <span className="text-muted-foreground">–</span>
          <Input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="Max"
            aria-label="Maximum price"
            value={filters.max ?? ""}
            onChange={(e) => onChange({ max: e.target.value === "" ? undefined : Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="filter-condition">Condition</Label>
        <Select
          value={filters.condition || "any"}
          onValueChange={(v) => onChange({ condition: v === "any" ? undefined : v })}
        >
          <SelectTrigger id="filter-condition">
            <SelectValue placeholder="Any condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any condition</SelectItem>
            {CONDITIONS.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="filter-sort">Sort by</Label>
        <Select
          value={filters.sort ?? "recommended"}
          onValueChange={(v) => onChange({ sort: v as SortKey })}
        >
          <SelectTrigger id="filter-sort">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Checkbox
          checked={!!filters.includeSold}
          onCheckedChange={(checked) => onChange({ includeSold: checked === true ? true : undefined })}
        />
        Include sold items
      </label>
    </div>
  );
}
