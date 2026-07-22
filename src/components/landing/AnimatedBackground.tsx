export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Grid mesh */}
      <div className="bg-grid absolute inset-0 opacity-60" />

      {/* Aurora blobs */}
      <div
        className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklab, var(--color-primary) 70%, transparent), transparent 70%)",
          animation: "var(--animate-blob)",
        }}
      />
      <div
        className="absolute -right-40 top-20 h-[32rem] w-[32rem] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklab, var(--color-violet) 70%, transparent), transparent 70%)",
          animation: "var(--animate-blob-slow)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklab, var(--color-accent) 70%, transparent), transparent 70%)",
          animation: "var(--animate-blob)",
          animationDelay: "-6s",
        }}
      />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
