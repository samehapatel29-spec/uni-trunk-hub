import { Link } from "@tanstack/react-router";
import { ImageOff, MapPin } from "lucide-react";
import { discountPercent, formatPrice } from "@/lib/marketplace/api";
import type { Listing } from "@/lib/marketplace/types";
import { VerifiedBadge } from "@/components/shared/VerifiedBadge";
import { WishlistButton } from "./WishlistButton";

export function ItemCard({ listing, eager }: { listing: Listing; eager?: boolean }) {
  const discount = discountPercent(listing);
  const sold = listing.status === "sold";
  const sellerName = listing.seller?.full_name ?? "Student";
  const sellerMeta = listing.seller?.department;

  return (
    <article className="group relative overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/60">
      <Link to="/listings/$id" params={{ id: listing.id }} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {listing.image_url ? (
            <img
              src={listing.image_url}
              alt={listing.title}
              loading={eager ? "eager" : "lazy"}
              width={816}
              height={816}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <ImageOff className="h-6 w-6" />
              <span className="text-xs">No photo yet</span>
            </div>
          )}
          {listing.condition && (
            <span className="absolute left-2 top-2 rounded-md border border-border bg-background/95 px-2 py-0.5 text-[11px] font-semibold text-foreground">
              {listing.condition}
            </span>
          )}
          {sold && (
            <span className="absolute inset-x-0 bottom-0 bg-foreground/85 py-1 text-center text-xs font-semibold uppercase tracking-wide text-background">
              Sold
            </span>
          )}
        </div>

        <div className="p-3 sm:p-4">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <p className="font-display text-lg font-bold text-foreground">{formatPrice(listing.price)}</p>
            {listing.original_price && discount && (
              <>
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(listing.original_price)}
                </span>
                <span className="text-xs font-semibold text-primary">{discount}% off</span>
              </>
            )}
          </div>
          <h3 className="mt-0.5 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-foreground">
            {listing.title}
          </h3>
          <p className="mt-2 flex items-center gap-1.5 truncate text-xs text-foreground">
            <span className="truncate">
              {sellerName}
              {sellerMeta ? ` · ${sellerMeta}` : ""}
            </span>
            {listing.seller?.verification_status === "verified" && <VerifiedBadge label="Verified" />}
          </p>
          {listing.pickup_location && (
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{listing.pickup_location}</span>
            </p>
          )}
        </div>
      </Link>
      <WishlistButton listing={listing} className="absolute right-2 top-2" />
    </article>
  );
}
