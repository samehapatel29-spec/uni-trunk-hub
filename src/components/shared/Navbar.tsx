import { Link } from "@tanstack/react-router";
import { LogOut, Menu, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { ProfileAvatar } from "@/components/shared/ProfileAvatar";
import { SellItemDialog } from "@/components/landing/SellItemDialog";
import { AuthDialog } from "@/components/shared/AuthDialog";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const links = [
    { href: "#browse", label: "Browse" },
    { href: "#categories", label: "Categories" },
    { href: "#trust", label: "Student verification" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5">
        <Link to="/" className="flex shrink-0 items-center gap-2 text-foreground">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground"><ShoppingBag className="h-4 w-4" /></span>
          <span className="font-display text-lg font-bold">CampusCart</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground">{link.label}</a>)}
        </nav>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          {user ? (
            <>
              <ProfileAvatar />
              <Button variant="ghost" size="icon" onClick={() => supabase.auth.signOut()} aria-label="Log out"><LogOut /></Button>
              <SellItemDialog><Button size="sm">Sell an item</Button></SellItemDialog>
            </>
          ) : (
            <>
              <AuthDialog><Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button></AuthDialog>
              <AuthDialog mode="signup"><Button size="sm">Sell an item</Button></AuthDialog>
            </>
          )}
          <Button variant="outline" size="icon" aria-label="Open menu" onClick={() => setOpen((value) => !value)} className="md:hidden"><Menu /></Button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-5 py-3 md:hidden">
          {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">{link.label}</a>)}
          {!user && <AuthDialog><Button variant="ghost" className="mt-1 w-full justify-start">Sign in</Button></AuthDialog>}
        </nav>
      )}
    </header>
  );
}