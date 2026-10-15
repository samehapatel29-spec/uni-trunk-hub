import { ShieldAlert, User } from "lucide-react";
import type { SellerProfile } from "@/lib/marketplace/types";
import { VerifiedBadge } from "@/components/shared/VerifiedBadge";

export function SellerCard({ seller }: { seller: SellerProfile | null }) {
  const verified = seller?.verification_status === "verified";
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Seller</p>
      <div className="mt-3 flex items-center gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-md border border-border bg-muted">
          {seller?.avatar_url ? (
            <img src={seller.avatar_url} alt={seller.full_name ?? "Seller"} className="h-full w-full object-cover" />
          ) : (
            <User className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{seller?.full_name ?? "Student"}</p>
          {seller?.department && <p className="truncate text-xs text-muted-foreground">{seller.department}</p>}
        </div>
      </div>
      <div className="mt-3">
        {verified ? (
          <VerifiedBadge />
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            <ShieldAlert className="h-3.5 w-3.5" />
            Verification pending
          </span>
        )}
      </div>
    </div>
  );
}
