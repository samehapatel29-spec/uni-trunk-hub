import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { AuthDialog } from "@/components/shared/AuthDialog";
import { ItemCard } from "@/components/marketplace/ItemCard";
import { EmptyState } from "@/components/marketplace/EmptyState";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getWishlistListings } from "@/lib/marketplace/wishlist";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/wishlist")({
  component: WishlistPage,
  head: () => ({
    meta: [
      { title: "My wishlist — CampusCart" },
      { name: "description", content: "Items you saved from students on your campus." },
      { property: "og:title", content: "My wishlist — CampusCart" },
      { property: "og:description", content: "Items you saved from students on your campus." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function WishlistPage() {
  const { user, loading: authLoading } = useAuth();

  const { data: listings = [], isLoading, error } = useQuery({
    queryKey: ["wishlist-listings", user?.id],
    queryFn: () => getWishlistListings(user!.id),
    enabled: !!user,
    retry: false,
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 py-8">
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">My wishlist</h1>

        {authLoading || (user && isLoading) ? (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-lg border border-border">
                <Skeleton className="aspect-square w-full" />
                <div className="space-y-2 p-3">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : !user ? (
          <div className="mt-6">
            <EmptyState
              title="Sign in to see your wishlist"
              body="Save items with the heart icon and they'll wait for you here."
            />
            <div className="mt-4 flex justify-center">
              <AuthDialog>
                <Button>Sign in</Button>
              </AuthDialog>
            </div>
          </div>
        ) : error ? (
          <div className="mt-6">
            <EmptyState title="Wishlist isn't available yet" body={error.message} />
          </div>
        ) : listings.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title="Nothing saved yet"
              body="Tap the heart on any listing to keep it here."
              actionLabel="Explore campus deals"
              onAction={() => undefined}
            />
            <div className="mt-4 flex justify-center">
              <Link to="/browse" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                <Heart className="h-4 w-4" /> Browse listings
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {listings.map((listing) => (
              <ItemCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
