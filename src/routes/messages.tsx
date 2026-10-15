import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { ArrowLeft, MessageCircle, Send, User } from "lucide-react";
import { z } from "zod";
import { Navbar } from "@/components/shared/Navbar";
import { AuthDialog } from "@/components/shared/AuthDialog";
import { EmptyState } from "@/components/marketplace/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/marketplace/api";
import {
  getConversation,
  getMessages,
  listConversations,
  markConversationRead,
  sendMessage,
} from "@/lib/marketplace/chat";
import { useAuth } from "@/hooks/useAuth";

const searchSchema = z.object({
  c: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/messages")({
  validateSearch: (search) => searchSchema.parse(search),
  component: MessagesPage,
  head: () => ({
    meta: [
      { title: "Messages — CampusCart" },
      { name: "description", content: "Chat with buyers and sellers on your campus." },
      { property: "og:title", content: "Messages — CampusCart" },
      { property: "og:description", content: "Chat with buyers and sellers on your campus." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function MessagesPage() {
  const { c: activeId } = Route.useSearch();
  const navigate = useNavigate({ from: "/messages" });
  const { user, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const conversationsQuery = useQuery({
    queryKey: ["conversations", user?.id],
    queryFn: () => listConversations(user!.id),
    enabled: !!user,
    retry: false,
    refetchInterval: 10_000,
  });

  const conversationQuery = useQuery({
    queryKey: ["conversation", activeId, user?.id],
    queryFn: () => getConversation(activeId!, user!.id),
    enabled: !!user && !!activeId,
    retry: false,
  });

  const messagesQuery = useQuery({
    queryKey: ["messages", activeId],
    queryFn: () => getMessages(activeId!),
    enabled: !!user && !!activeId,
    retry: false,
    refetchInterval: 4_000,
  });

  // Mark incoming messages read when the thread is open.
  useEffect(() => {
    if (activeId && user) {
      markConversationRead(activeId, user.id).then(() =>
        queryClient.invalidateQueries({ queryKey: ["conversations", user.id] }),
      );
    }
  }, [activeId, user, messagesQuery.data?.length, queryClient]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesQuery.data?.length]);

  const send = useMutation({
    mutationFn: () => sendMessage(activeId!, user!.id, draft),
    onSuccess: () => {
      setDraft("");
      queryClient.invalidateQueries({ queryKey: ["messages", activeId] });
      queryClient.invalidateQueries({ queryKey: ["conversations", user?.id] });
    },
  });

  const conversation = conversationQuery.data;
  const messages = messagesQuery.data ?? [];

  const threadPanel = (
    <div className="flex min-h-0 flex-1 flex-col">
      {activeId && conversation ? (
        <>
          {/* Thread header with listing context */}
          <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
            <button
              type="button"
              onClick={() => navigate({ search: {}, replace: true })}
              className="grid h-8 w-8 place-items-center rounded-md border border-border text-muted-foreground md:hidden"
              aria-label="Back to conversations"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            {conversation.listing && (
              <Link
                to="/listings/$id"
                params={{ id: conversation.listing.id }}
                className="flex min-w-0 items-center gap-3"
              >
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                  {conversation.listing.image_url && (
                    <img src={conversation.listing.image_url} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{conversation.listing.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatPrice(conversation.listing.price)} · {conversation.other?.full_name ?? "Student"}
                  </p>
                </div>
              </Link>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messagesQuery.isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-2/3" />
                <Skeleton className="ml-auto h-10 w-1/2" />
                <Skeleton className="h-10 w-3/5" />
              </div>
            ) : messages.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">
                No messages yet. Say hello and arrange the pickup.
              </p>
            ) : (
              messages.map((m) => {
                const mine = m.sender_id === user?.id;
                return (
                  <div key={m.id} className={cn("flex", mine && "justify-end")}>
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg border px-3 py-2",
                        mine
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground",
                      )}
                    >
                      <p className="whitespace-pre-line text-sm">{m.body}</p>
                      <p className={cn("mt-1 text-[10px]", mine ? "text-primary-foreground/70" : "text-muted-foreground")}>
                        {format(new Date(m.created_at), "dd MMM, HH:mm")}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={bottomRef} />
          </div>

          {/* Composer */}
          <form
            className="flex items-center gap-2 border-t border-border bg-card p-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (draft.trim()) send.mutate();
            }}
          >
            <label htmlFor="message-input" className="sr-only">
              Message
            </label>
            <Input
              id="message-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a message…"
              autoComplete="off"
            />
            <Button type="submit" size="icon" disabled={send.isPending || !draft.trim()} aria-label="Send message">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </>
      ) : (
        <div className="hidden flex-1 place-items-center md:grid">
          <div className="text-center">
            <MessageCircle className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-3 text-sm text-muted-foreground">Pick a conversation to start chatting.</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-6">
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Messages</h1>

        {authLoading ? (
          <Skeleton className="mt-6 h-64 w-full" />
        ) : !user ? (
          <div className="mt-6">
            <EmptyState
              title="Sign in to read your messages"
              body="Chats with buyers and sellers live here."
            />
            <div className="mt-4 flex justify-center">
              <AuthDialog>
                <Button>Sign in</Button>
              </AuthDialog>
            </div>
          </div>
        ) : conversationsQuery.error ? (
          <div className="mt-6">
            <EmptyState title="Messages aren't available yet" body={conversationsQuery.error.message} />
          </div>
        ) : (
          <div className="mt-6 flex min-h-[60vh] flex-1 overflow-hidden rounded-lg border border-border bg-background">
            {/* Conversation list */}
            <aside
              className={cn(
                "w-full shrink-0 border-r border-border bg-card md:block md:w-80",
                activeId && "hidden",
              )}
            >
              {conversationsQuery.isLoading ? (
                <div className="space-y-3 p-4">
                  <Skeleton className="h-14 w-full" />
                  <Skeleton className="h-14 w-full" />
                  <Skeleton className="h-14 w-full" />
                </div>
              ) : (conversationsQuery.data ?? []).length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    No conversations yet. Open a listing and tap "Chat with seller".
                  </p>
                </div>
              ) : (
                <ul>
                  {(conversationsQuery.data ?? []).map((c) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => navigate({ search: { c: c.id }, replace: true })}
                        className={cn(
                          "flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left hover:bg-muted/60",
                          c.id === activeId && "bg-muted",
                        )}
                      >
                        <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-md border border-border bg-muted">
                          {c.listing?.image_url ? (
                            <img src={c.listing.image_url} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <User className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="truncate text-sm font-semibold text-foreground">
                              {c.other?.full_name ?? "Student"}
                            </p>
                            {c.last_message_at && (
                              <span className="shrink-0 text-[10px] text-muted-foreground">
                                {format(new Date(c.last_message_at), "dd MMM")}
                              </span>
                            )}
                          </div>
                          <p className="truncate text-xs text-muted-foreground">
                            {c.listing?.title ?? "Listing"}
                          </p>
                          {c.last_message && (
                            <p className="truncate text-xs text-muted-foreground">{c.last_message}</p>
                          )}
                        </div>
                        {(c.unread ?? 0) > 0 && (
                          <span className="grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                            {c.unread}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </aside>

            {/* Thread */}
            <div className={cn("min-w-0 flex-1 md:flex md:flex-col", !activeId && "hidden md:flex")}>
              {threadPanel}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
