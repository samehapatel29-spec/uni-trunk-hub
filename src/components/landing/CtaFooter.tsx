import { ArrowRight, GraduationCap } from "lucide-react";

export function CtaFooter() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="overflow-hidden rounded-3xl border border-border bg-card p-10 text-center shadow-[var(--shadow-soft)] md:p-14">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold text-secondary sm:text-4xl">
            Ready to clear out your shelf — or find your next kit?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Join hundreds of verified students already buying and selling on CampusCart.
          </p>
          <a
            href="#signup"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
          >
            Create your free account
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <footer className="border-t border-border bg-card/60">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-10 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-4 w-4" />
            </span>
            <span className="font-display font-semibold text-secondary">CampusCart</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CampusCart · Made for engineering students.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-secondary">Privacy</a>
            <a href="#" className="hover:text-secondary">Terms</a>
            <a href="#" className="hover:text-secondary">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
