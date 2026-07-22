import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

export function Navbar() {
  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-lift)]">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-secondary">
            CampusCart
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#browse" className="text-sm text-muted-foreground transition-colors hover:text-secondary">Browse</a>
          <a href="#categories" className="text-sm text-muted-foreground transition-colors hover:text-secondary">Categories</a>
          <a href="#how" className="text-sm text-muted-foreground transition-colors hover:text-secondary">How it works</a>
          <a href="#trust" className="text-sm text-muted-foreground transition-colors hover:text-secondary">Verification</a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#login"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-secondary transition-colors hover:bg-muted sm:inline-block"
          >
            Sign in
          </a>
          <a
            href="#signup"
            className="inline-flex items-center rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-transform hover:-translate-y-0.5"
          >
            Sell an item
          </a>
        </div>
      </div>
    </header>
  );
}
