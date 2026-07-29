import { Link } from "@tanstack/react-router";
import { GraduationCap, Menu, LogOut } from "lucide-react";
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
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const links = [
    { href: "#browse", label: "Browse" },
    { href: "#categories", label: "Categories" },
    { href: "#how", label: "How it works" },
    { href: "#trust", label: "Verification" },
  ];

  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img src="/Logo.png" alt="CampusCart Logo" className="h-9 w-auto object-contain" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {user ? (
            <>
              <ProfileAvatar />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="rounded-full"
                aria-label="Log out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <AuthDialog>
              <button
                className="hidden rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-card sm:inline-block"
              >
                Sign in
              </button>
            </AuthDialog>
          )}

          {user ? (
            <SellItemDialog>
              <button
                className="inline-flex items-center rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
              >
                Sell
              </button>
            </SellItemDialog>
          ) : (
            <AuthDialog mode="signup">
              <button
                className="inline-flex items-center rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
              >
                Sell
              </button>
            </AuthDialog>
          )}
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/60 text-foreground md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-card hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
