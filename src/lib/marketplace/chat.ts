import { supabase } from "@/lib/supabase";
import { friendlyError, getListing } from "./api";
import type { ChatMessage, Conversation, SellerProfile } from "./types";

/** Start (or reuse) the buyer↔seller conversation for a listing. */
export async function getOrCreateConversation(listingId: string, buyerId: string): Promise<string> {
  const listing = await getListing(listingId);
  if (!listing) throw new Error("This listing is no longer available");
  if (!listing.seller) throw new Error("The seller for this listing can't be reached");
  if (listing.seller.id === buyerId) throw new Error("This is your own listing");

  const { data: existing, error: findError } = await supabase
    .from("conversations")
    .select("id")
    .eq("listing_id", listingId)
    .eq("buyer_id", buyerId)
    .maybeSingle();
  if (findError) throw friendlyError(findError, "Could not open the conversation");
  if (existing) return existing.id as string;

  const { data, error } = await supabase
    .from("conversations")
    .insert({ listing_id: listingId, buyer_id: buyerId, seller_id: listing.seller.id })
    .select("id")
    .single();
  if (error) throw friendlyError(error, "Could not start the conversation");
  return data.id as string;
}

async function getProfiles(ids: string[]): Promise<Map<string, SellerProfile>> {
  const map = new Map<string, SellerProfile>();
  if (!ids.length) return map;
  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, department, roll_no, avatar_url, verification_status")
    .in("id", ids);
  for (const p of data ?? []) map.set(p.id, p as SellerProfile);
  return map;
}

export async function listConversations(userId: string): Promise<Conversation[]> {
  const { data, error } = await supabase
    .from("conversations")
    .select("id, listing_id, buyer_id, seller_id, created_at")
    .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
    .order("created_at", { ascending: false });
  if (error) throw friendlyError(error, "Could not load your messages");

  const rows = (data ?? []) as Conversation[];
  const otherIds = rows.map((c) => (c.buyer_id === userId ? c.seller_id : c.buyer_id));
  const [profiles, listings, messages] = await Promise.all([
    getProfiles([...new Set(otherIds)]),
    Promise.all(rows.map((c) => getListing(c.listing_id))),
    Promise.all(
      rows.map((c) =>
        supabase
          .from("messages")
          .select("body, created_at, sender_id, read_at")
          .eq("conversation_id", c.id)
          .order("created_at", { ascending: false })
          .limit(50),
      ),
    ),
  ]);

  return rows.map((c, i) => {
    const msgs = messages[i].data ?? [];
    const last = msgs[0];
    return {
      ...c,
      listing: listings[i] ?? null,
      other: profiles.get(otherIds[i]) ?? null,
      last_message: last?.body ?? null,
      last_message_at: last?.created_at ?? null,
      unread: msgs.filter((m) => m.sender_id !== userId && !m.read_at).length,
    };
  });
}

export async function getConversation(id: string, userId: string): Promise<Conversation | null> {
  const { data, error } = await supabase
    .from("conversations")
    .select("id, listing_id, buyer_id, seller_id, created_at")
    .eq("id", id)
    .maybeSingle();
  if (error) throw friendlyError(error, "Could not load the conversation");
  if (!data) return null;
  if (data.buyer_id !== userId && data.seller_id !== userId) return null;
  const otherId = data.buyer_id === userId ? data.seller_id : data.buyer_id;
  const [profiles, listing] = await Promise.all([getProfiles([otherId]), getListing(data.listing_id)]);
  return { ...(data as Conversation), other: profiles.get(otherId) ?? null, listing };
}

export async function getMessages(conversationId: string): Promise<ChatMessage[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("id, conversation_id, sender_id, body, created_at, read_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });
  if (error) throw friendlyError(error, "Could not load messages");
  return (data ?? []) as ChatMessage[];
}

export async function sendMessage(conversationId: string, senderId: string, body: string): Promise<void> {
  const text = body.trim();
  if (!text) return;
  const { error } = await supabase
    .from("messages")
    .insert({ conversation_id: conversationId, sender_id: senderId, body: text });
  if (error) throw friendlyError(error, "Message could not be sent");
}

export async function markConversationRead(conversationId: string, userId: string): Promise<void> {
  await supabase
    .from("messages")
    .update({ read_at: new Date().toISOString() })
    .eq("conversation_id", conversationId)
    .neq("sender_id", userId)
    .is("read_at", null);
}
