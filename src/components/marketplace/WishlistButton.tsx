import { Heart } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/hooks/useWishlist";
import type { Listing } from "@/lib/marketplace/types";

export function WishlistButton({ listing, className }: { listing: Listing; className?: string }) {
  const { user, isSaved, toggle } = useWishlist();
  const saved = isSaved(listing.id);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (listing.isDemo) {
      toast.info("This is a sample listing — real listings can be saved once students post them.");
      return;
    }
    if (!user) {
      toast.info("Sign in to save items to your wishlist.");
      return;
    }
    toggle(listing.id);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={saved ? `Remove ${listing.title} from wishlist` : `Save ${listing.title} to wishlist`}
      aria-pressed={saved}
      className={cn(
        "grid h-8 w-8 place-items-center rounded-md border border-border bg-card/95 text-muted-foreground transition-colors hover:border-primary hover:text-primary",
        saved && "border-primary text-primary",
        className,
      )}
    >
      <Heart className={cn("h-4 w-4", saved && "fill-primary text-primary")} />
    </button>
  );
}
