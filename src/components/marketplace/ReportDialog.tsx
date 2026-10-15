import { useState } from "react";
import { Flag, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { friendlyError } from "@/lib/marketplace/api";
import type { Listing } from "@/lib/marketplace/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ReportDialog({ listing, children }: { listing: Listing; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      toast.info("Sign in to report a listing.");
      return;
    }
    if (!reason.trim()) {
      toast.error("Tell us briefly what's wrong with this listing.");
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.from("reports").insert({
        listing_id: listing.id,
        reporter_id: userData.user.id,
        reason: reason.trim(),
      });
      if (error) throw error;
      toast.success("Thanks — an admin will review this listing.");
      setOpen(false);
      setReason("");
    } catch (error) {
      toast.error(friendlyError(error, "Could not send the report").message);
    } finally {
      setSending(false);
    }
  };

  if (listing.isDemo) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="rounded-lg sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Flag className="h-4 w-4" /> Report this listing
          </DialogTitle>
          <DialogDescription>
            Report suspicious, misleading or inappropriate listings. Admins review every report.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="What's wrong with this listing?"
          className="resize-none"
          rows={4}
        />
        <Button onClick={submit} disabled={sending} className="w-full">
          {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send report
        </Button>
      </DialogContent>
    </Dialog>
  );
}
