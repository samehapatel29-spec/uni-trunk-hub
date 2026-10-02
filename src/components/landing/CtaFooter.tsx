import { ShoppingBag } from "lucide-react";
import { AuthDialog } from "@/components/shared/AuthDialog";
import { Button } from "@/components/ui/button";

export function CtaFooter() {
  return (
    <>
      <section className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-5 pb-12 sm:flex-row sm:items-center">
        <div><h2 className="font-display text-2xl font-bold text-foreground">Got something another student could use?</h2><p className="mt-1 text-sm text-muted-foreground">List it on CampusCart and arrange pickup on campus.</p></div>
        <AuthDialog mode="signup"><Button>Join CampusCart</Button></AuthDialog>
      </section>
      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2"><ShoppingBag className="h-4 w-4 text-primary" /><span className="font-display font-bold text-foreground">CampusCart</span></div>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} CampusCart · Made for campus exchanges.</p>
          <div className="flex gap-5 text-xs text-muted-foreground"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Contact</a></div>
        </div>
      </footer>
    </>
  );
}