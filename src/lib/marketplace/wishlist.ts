import { supabase } from "@/lib/supabase";
import { friendlyError, getListings } from "./api";
import type { Listing } from "./types";

export async function getWishlistIds(userId: string): Promise<string[]> {
  const { data, error } = await supabase.from("wishlists").select("item_id").eq("user_id", userId);
  if (error) throw friendlyError(error, "Could not load your wishlist");
  return (data ?? []).map((r) => String(r.item_id));
}

export async function addToWishlist(userId: string, itemId: string): Promise<void> {
  const { error } = await supabase.from("wishlists").insert({ user_id: userId, item_id: itemId });
  // 23505 = unique violation → already saved, treat as success.
  if (error && error.code !== "23505") throw friendlyError(error, "Could not save this item");
}

export async function removeFromWishlist(userId: string, itemId: string): Promise<void> {
  const { error } = await supabase
    .from("wishlists")
    .delete()
    .eq("user_id", userId)
    .eq("item_id", itemId);
  if (error) throw friendlyError(error, "Could not remove this item");
}

export async function getWishlistListings(userId: string): Promise<Listing[]> {
  const ids = await getWishlistIds(userId);
  if (!ids.length) return [];
  const { listings } = await getListings();
  const order = new Map(ids.map((id, i) => [id, i]));
  return listings
    .filter((l) => order.has(l.id))
    .sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
}
