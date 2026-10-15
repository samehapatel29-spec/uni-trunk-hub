import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addToWishlist, getWishlistIds, removeFromWishlist } from "@/lib/marketplace/wishlist";
import { useAuth } from "./useAuth";

export function useWishlist() {
  const { user, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const key = ["wishlist", user?.id ?? "anon"] as const;

  const { data: ids = [], isLoading } = useQuery({
    queryKey: key,
    queryFn: () => getWishlistIds(user!.id),
    enabled: !!user,
    retry: false,
    staleTime: 30_000,
  });

  const mutation = useMutation({
    mutationFn: async ({ itemId, saved }: { itemId: string; saved: boolean }) => {
      if (!user) throw new Error("Sign in to save items");
      if (saved) await removeFromWishlist(user.id, itemId);
      else await addToWishlist(user.id, itemId);
    },
    onMutate: async ({ itemId, saved }) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<string[]>(key) ?? [];
      queryClient.setQueryData<string[]>(
        key,
        saved ? previous.filter((id) => id !== itemId) : [...previous, itemId],
      );
      return { previous };
    },
    onError: (error, _vars, context) => {
      if (context?.previous) queryClient.setQueryData(key, context.previous);
      toast.error(error.message);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  return {
    user,
    loading: authLoading || (!!user && isLoading),
    ids,
    isSaved: (itemId: string) => ids.includes(itemId),
    toggle: (itemId: string) => mutation.mutate({ itemId, saved: ids.includes(itemId) }),
  };
}
