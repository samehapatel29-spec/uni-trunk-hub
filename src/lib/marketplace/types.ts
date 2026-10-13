export interface Category {
  id: string;
  slug: string;
  name: string;
}

export interface SellerProfile {
  id: string;
  full_name: string | null;
  department: string | null;
  roll_no: string | null;
  avatar_url: string | null;
  verification_status: string | null;
}

export interface Listing {
  id: string;
  title: string;
  description: string | null;
  price: number;
  original_price: number | null;
  condition: string | null;
  status: string;
  image_url: string | null;
  images: string[];
  pickup_location: string | null;
  category_slug: string | null;
  category_name: string | null;
  seller: SellerProfile | null;
  created_at: string;
  isDemo?: boolean;
}

export type SortKey = "recommended" | "newest" | "price-asc" | "price-desc";

export interface ListingFilters {
  q?: string;
  category?: string;
  min?: number;
  max?: number;
  condition?: string;
  sort?: SortKey;
  includeSold?: boolean;
}

export interface Conversation {
  id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;
  created_at: string;
  listing?: Listing | null;
  other?: SellerProfile | null;
  last_message?: string | null;
  last_message_at?: string | null;
  unread?: number;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  created_at: string;
  read_at: string | null;
}

export const CONDITIONS = ["New", "Like New", "Good", "Fair"] as const;
