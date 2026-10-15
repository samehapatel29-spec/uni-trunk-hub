import { supabase } from "@/lib/supabase";
import { DEFAULT_CATEGORIES } from "./categories";
import { DEMO_LISTINGS } from "./demo";
import type { Category, Listing, ListingFilters, SellerProfile } from "./types";

/** True when the backend simply hasn't been given this table/column yet. */
export function isSchemaMissing(error: unknown): boolean {
  const e = error as { code?: string; message?: string } | null;
  const msg = String(e?.message ?? "").toLowerCase();
  return (
    e?.code === "42P01" ||
    e?.code === "42703" ||
    msg.includes("does not exist") ||
    msg.includes("schema cache") ||
    msg.includes("could not find")
  );
}

export function friendlyError(error: unknown, fallback: string): Error {
  if (isSchemaMissing(error)) {
    return new Error(
      "This feature isn't set up in the backend yet. The site owner needs to run the setup SQL.",
    );
  }
  const msg = (error as { message?: string })?.message;
  return new Error(msg || fallback);
}

function mapItem(row: any, categories: Category[], profiles: Map<string, SellerProfile>): Listing {
  const cat = categories.find((c) => c.id === row.category_id);
  const images = Array.isArray(row.images) ? row.images.filter(Boolean) : [];
  const imageUrl = row.image_url ?? images[0] ?? null;
  return {
    id: String(row.id),
    title: row.title ?? "Untitled item",
    description: row.description ?? null,
    price: Number(row.price ?? 0),
    original_price: row.original_price != null ? Number(row.original_price) : null,
    condition: row.condition ?? null,
    status: row.status ?? "available",
    image_url: imageUrl,
    images: images.length ? images : imageUrl ? [imageUrl] : [],
    pickup_location: row.pickup_location ?? null,
    category_slug: cat?.slug ?? null,
    category_name: cat?.name ?? null,
    seller: row.seller_id ? (profiles.get(row.seller_id) ?? null) : null,
    created_at: row.created_at ?? new Date().toISOString(),
  };
}

async function getProfilesMap(ids: string[]): Promise<Map<string, SellerProfile>> {
  const map = new Map<string, SellerProfile>();
  if (!ids.length) return map;
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, department, roll_no, avatar_url, verification_status")
      .in("id", ids);
    if (error) throw error;
    for (const p of data ?? []) map.set(p.id, p as SellerProfile);
  } catch {
    // Profiles may not be publicly readable yet — cards then show "Student".
  }
  return map;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase.from("categories").select("id, slug, name").order("name");
    if (error) throw error;
    if (data && data.length) return data as Category[];
  } catch {
    // fall through to defaults
  }
  return DEFAULT_CATEGORIES;
}

export async function getListings(): Promise<{ listings: Listing[]; demo: boolean }> {
  try {
    const [itemsRes, categories] = await Promise.all([
      supabase.from("items").select("*").order("created_at", { ascending: false }),
      getCategories(),
    ]);
    if (itemsRes.error) throw itemsRes.error;
    const rows = itemsRes.data ?? [];
    if (!rows.length) return { listings: DEMO_LISTINGS, demo: true };
    const sellerIds = [...new Set(rows.map((r) => r.seller_id).filter(Boolean))] as string[];
    const profiles = await getProfilesMap(sellerIds);
    return { listings: rows.map((r) => mapItem(r, categories, profiles)), demo: false };
  } catch {
    // Backend unreachable/empty in preview — show clearly-marked samples.
    return { listings: DEMO_LISTINGS, demo: true };
  }
}

export async function getListing(id: string): Promise<Listing | null> {
  if (id.startsWith("demo-")) return DEMO_LISTINGS.find((l) => l.id === id) ?? null;
  try {
    const [{ data, error }, categories] = await Promise.all([
      supabase.from("items").select("*").eq("id", id).maybeSingle(),
      getCategories(),
    ]);
    if (error) throw error;
    if (!data) return null;
    const profiles = await getProfilesMap(data.seller_id ? [data.seller_id] : []);
    return mapItem(data, categories, profiles);
  } catch {
    return null;
  }
}

/** Pure filter + sort, shared by /browse and unit tests. */
export function applyFilters(listings: Listing[], f: ListingFilters): Listing[] {
  let out = listings.slice();
  if (!f.includeSold) out = out.filter((l) => l.status !== "sold");
  if (f.category) out = out.filter((l) => l.category_slug === f.category);
  if (f.condition) {
    out = out.filter((l) => (l.condition ?? "").toLowerCase() === f.condition!.toLowerCase());
  }
  if (f.min != null && !Number.isNaN(f.min)) out = out.filter((l) => l.price >= f.min!);
  if (f.max != null && !Number.isNaN(f.max)) out = out.filter((l) => l.price <= f.max!);
  const q = f.q?.trim().toLowerCase();
  if (q) {
    out = out.filter((l) =>
      [l.title, l.description, l.category_name, l.category_slug]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }
  switch (f.sort) {
    case "newest":
      out.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
      break;
    case "price-asc":
      out.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      out.sort((a, b) => b.price - a.price);
      break;
    default:
      break; // recommended = source order (newest first from the query)
  }
  return out;
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}

export function discountPercent(listing: Listing): number | null {
  if (!listing.original_price || listing.original_price <= listing.price) return null;
  return Math.round((1 - listing.price / listing.original_price) * 100);
}
