import type { Category } from "./types";

/** Canonical category set for filters and the sell form. The database
 *  `categories` table is the source of truth when reachable; these are the
 *  fallback so filtering and posting keep working. */
export const DEFAULT_CATEGORIES: Category[] = [
  { id: "books", slug: "books", name: "Books" },
  { id: "notes", slug: "notes", name: "Notes" },
  { id: "calculators", slug: "calculators", name: "Calculators" },
  { id: "lab-kits", slug: "lab-kits", name: "Lab Kits" },
  { id: "laptops", slug: "laptops", name: "Laptops" },
  { id: "electronics", slug: "electronics", name: "Electronics" },
  { id: "cycles", slug: "cycles", name: "Cycles" },
  { id: "hostel-essentials", slug: "hostel-essentials", name: "Hostel Essentials" },
];
