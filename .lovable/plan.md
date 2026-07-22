
# CampusCart — Engineering College Marketplace

## Stack note (important)

Your brief specifies **MERN** (Express + MongoDB + vanilla HTML/CSS/JS, deployed to Vercel + Render). This Lovable project is scaffolded on a different stack: **TanStack Start (React 19 + Vite + Tailwind v4)** with **Lovable Cloud** (managed Postgres + auth + storage) as the backend, deployed on Lovable Hosting.

I can't swap this project to Express/MongoDB/Cloudinary — that would mean discarding the entire scaffold. Two options:

1. **Recommended:** Build the same product, same UX, same design on the Lovable stack. Auth → Lovable Cloud (email + verification workflow), DB → Postgres tables mirroring the MongoDB collections below, Storage → Lovable Cloud storage (replaces Cloudinary), Admin verify flow identical.
2. **Strict MERN:** You'd need to start a different project outside Lovable; I can still design the schema/API contract here for you to port.

**I'll proceed with option 1** unless you say otherwise. The landing page is stack-agnostic anyway — pure UI.

## 1. Implementation plan (phased)

1. **Phase 1 — Landing page only** (this turn). Hero, category grid, how-it-works, featured listings mock, verification trust section, footer. No backend.
2. Phase 2 — Auth + multi-step signup + verification queue
3. Phase 3 — Listings CRUD + image upload + browse/filter/search
4. Phase 4 — Product detail + wishlist + messages
5. Phase 5 — Profile + dashboard + admin panel
6. Phase 6 — Polish, 404, SEO, performance

## 2. Folder structure (target)

```text
src/
  routes/
    index.tsx              # Landing (this turn)
    browse.tsx
    categories.tsx
    listings.$id.tsx
    listings.new.tsx
    profile.tsx
    wishlist.tsx
    messages.tsx
    dashboard.tsx
    auth.login.tsx
    auth.signup.tsx
    admin.tsx
  components/
    landing/               # Hero, Categories, Featured, HowItWorks, Trust, CTA, Footer
    shared/                # Navbar (glass), Container, Badge, VerifiedTick
    ui/                    # shadcn primitives
  lib/                     # utils, formatters
  styles.css               # design tokens
```

## 3. Database collections (Postgres tables mirroring MongoDB shapes)

- **users** — id, full_name, roll_number, year, branch, email, password_hash, profile_summary (auto), avatar_url, is_verified, created_at
- **verification_requests** — id, user_id, student_id_url, status (pending/approved/rejected), reviewed_by, notes, created_at
- **listings** — id, seller_id, title, description, category, price, condition, images[], status (active/sold), created_at
- **categories** — id, slug, name, icon
- **wishlists** — id, user_id, listing_id
- **messages** — id, listing_id, sender_id, receiver_id, body, read, created_at
- **user_roles** — id, user_id, role (admin/student) — separate table for security

## 4. API routes (contract)

```text
POST   /auth/signup          POST /auth/login          POST /auth/logout
POST   /verification         GET  /verification/me     POST /admin/verification/:id/approve|reject
GET    /listings?category=&q=&min=&max=
POST   /listings             GET /listings/:id         PATCH/DELETE /listings/:id
POST   /wishlist/:listingId  DELETE /wishlist/:listingId  GET /wishlist
GET    /messages/threads     GET /messages/:threadId   POST /messages
GET    /me                   PATCH /me                 GET /dashboard/stats
```

## 5. Landing page (this turn)

Sections, top → bottom:
- Glassmorphism sticky nav — logo, Browse, Categories, How it works, Sign in, "Sell an item" CTA
- Hero — big Poppins headline "The marketplace built for engineers, by engineers." subcopy, dual CTA (Browse listings / Join with roll no.), verified-students trust chip, floating listing card mock
- Category grid — 8 rounded cards (Books, Notes, Calculators, Laptops, Electronics, Arduino/ESP32, Lab Kits, Cycles, Hostel, Others)
- Featured listings — 4 mock cards with image, title, price, seller + verified tick
- How it works — 3 steps (Verify → List/Browse → Chat & meet on campus)
- Trust/verification band — roll number + student ID + admin review
- Final CTA + Footer

Design commitments (from your spec):
- Colors: primary `#2563EB`, secondary `#0F172A`, accent `#06B6D4`, bg `#F8FAFC`, border `#E2E8F0`, success `#22C55E` — wired as oklch tokens in `src/styles.css`
- Fonts: Poppins (headings) + Inter (body) via `<link>` in `__root.tsx`
- Rounded cards (radius scale bumped), generous whitespace, subtle motion, mobile-first
- Reusable components in `src/components/landing/` and `src/components/shared/`
- No backend touched; no other pages built

## 6. What I will NOT do this turn

- No auth, no DB, no listings logic, no other routes
- Won't touch `__root.tsx` beyond adding the Google Fonts `<link>` and updating default meta
