import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Flag, ImageOff, Loader2, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/shared/Navbar";
import { AuthDialog } from "@/components/shared/AuthDialog";
import { ItemCard } from "@/components/marketplace/ItemCard";
import { SellerCard } from "@/components/marketplace/SellerCard";
import { ReportDialog } from "@/components/marketplace/ReportDialog";
import { WishlistButton } from "@/components/marketplace/WishlistButton";
import { EmptyState } from "@/components/marketplace/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { discountPercent, formatPrice, getListing, getListings } from "@/lib/marketplace/api";
import { getOrCreateConversation } from "@/lib/marketplace/chat";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/listings/$id")({
  component: ListingPage,
  head: () => ({
    meta: [
      { title: "Listing — CampusCart" },
      { name: "description", content: "View this campus listing, check the seller's verification status, and arrange a pickup." },
      { property: "og:title", content: "Listing — CampusCart" },
      { property: "og:description", content: "Second-hand student gear with campus pickup." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function ListingPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeImage, setActiveImage] = useState(0);
  const [startingChat, setStartingChat] = useState(false);

  const { data: listing, isLoading } = useQuery({
    queryKey: ["listing", id],
    queryFn: () => getListing(id),
    staleTime: 30_000,
  });

  const { data: all } = useQuery({ queryKey: ["listings"], queryFn: getListings, staleTime: 30_000 });
  const related = (all?.listings ?? [])
    .filter((l) => l.id !== id && l.status !== "sold" && l.category_slug === listing?.category_slug)
    .slice(0, 4);

  const startChat = async () => {
    if (!user || !listing) return;
    setStartingChat(true);
    try {
      const conversationId = await getOrCreateConversation(listing.id, user.id);
      navigate({ to: "/messages", search: { c: conversationId } });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not start the chat");
    } finally {
      setStartingChat(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-6xl px-5 py-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-6xl px-5 py-8">
          <EmptyState
            title="This listing isn't available"
            body="It may have been removed or the link is wrong."
            actionLabel="Browse listings"
            onAction={() => navigate({ to: "/browse" })}
          />
        </main>
      </div>
    );
  }

  const sold = listing.status === "sold";
  const discount = discountPercent(listing);
  const images = listing.images.length ? listing.images : listing.image_url ? [listing.image_url] : [];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 py-6 sm:py-8">
        <Link to="/browse" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to browse
        </Link>

        <div className="mt-4 grid gap-8 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
              {images.length ? (
                <img src={images[activeImage]} alt={listing.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
                  <ImageOff className="h-8 w-8" />
                  <span className="text-sm">No photo yet</span>
                </div>
              )}
              {sold && (
                <span className="absolute inset-x-0 bottom-0 bg-foreground/85 py-1.5 text-center text-sm font-semibold uppercase tracking-wide text-background">
                  Sold
                </span>
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-3 flex gap-2">
                {images.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`Photo ${i + 1}`}
                    className={`h-16 w-16 overflow-hidden rounded-md border ${i === activeImage ? "border-primary" : "border-border"}`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {listing.condition && <Badge variant="secondary">{listing.condition}</Badge>}
              {listing.category_name && <Badge variant="outline">{listing.category_name}</Badge>}
              {listing.isDemo && <Badge variant="outline">Sample</Badge>}
            </div>
            <h1 className="mt-3 font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
              {listing.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-baseline gap-2">
              <p className="font-display text-3xl font-bold text-foreground">{formatPrice(listing.price)}</p>
              {listing.original_price && discount && (
                <>
                  <span className="text-base text-muted-foreground line-through">{formatPrice(listing.original_price)}</span>
                  <span className="text-sm font-semibold text-primary">{discount}% off</span>
                </>
              )}
            </div>

            {listing.description && (
              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-foreground">{listing.description}</p>
            )}

            {listing.pickup_location && (
              <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" /> Pickup: {listing.pickup_location}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {user ? (
                <Button onClick={startChat} disabled={startingChat || sold} size="lg">
                  {startingChat ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MessageCircle className="mr-2 h-4 w-4" />}
                  {sold ? "Item sold" : "Chat with seller"}
                </Button>
              ) : (
                <AuthDialog>
                  <Button size="lg" disabled={sold}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {sold ? "Item sold" : "Sign in to chat"}
                  </Button>
                </AuthDialog>
              )}
              <WishlistButton listing={listing} className="h-11 w-11" />
              <ReportDialog listing={listing}>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Flag className="mr-1.5 h-3.5 w-3.5" /> Report listing
                </Button>
              </ReportDialog>
            </div>

            <div className="mt-6">
              <SellerCard seller={listing.seller} />
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-bold text-foreground">More in {listing.category_name ?? "this category"}</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {related.map((item) => (
                <ItemCard key={item.id} listing={item} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
