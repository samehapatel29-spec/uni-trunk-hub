# CampusCart — E-commerce MVP upgrade roadmap

From the uploaded master prompt. External Supabase is unreachable from the sandbox, so all DB-touching code degrades gracefully and new tables ship as `SUPABASE_SETUP.sql` for the user to run.

## Phase 1 — Product discovery (highest priority)
- [ ] Data layer: types, categories, demo fallback, listings API, pure filter/sort fn
- [ ] Reusable ItemCard + WishlistButton + EmptyState
- [ ] /browse route: search, category/price/condition/sort/availability filters, URL sync, mobile filter sheet, empty state
- [ ] /listings/$id detail page: gallery, seller card w/ real verification badge, pickup, related items, chat + wishlist actions
- [ ] Homepage: Featured uses real listings (demo fallback), categories link to filtered /browse, hero search works
- [ ] Unit tests for filter/sort rules

## Phase 2 — Trust & verification
- [ ] Verified badges only when profiles.verification_status = 'verified'
- [ ] Profile: clear Pending/Verified/Rejected status + student-ID upload (storage, graceful)
- [ ] Report listing action (reports table, graceful)

## Phase 3 — Wishlist & chat
- [ ] Persisted wishlist (wishlists table) + /wishlist page + guest sign-in prompt
- [ ] Persisted buyer–seller chat (conversations/messages tables) + /messages page, conversation context, unread, mark-read

## Phase 4 — Integration & verification
- [ ] Navbar: Browse, wishlist, messages entries
- [ ] Head metadata on all new routes
- [ ] SUPABASE_SETUP.sql (tables, RLS, category seeds, storage bucket)
- [ ] Playwright check: browse filters, detail page, mobile layout, no console errors

## Blocked on user
- Run `SUPABASE_SETUP.sql` in their Supabase SQL editor (wishlist/chat/reports/ID-upload tables + policies). App works without it; those features show a clear "not set up yet" message until then.
