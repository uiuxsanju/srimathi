# Maison Lumière — Luxury Fashion Storefront + Admin

A single, production-ready **React + TypeScript + Vite** application that merges a
customer-facing luxury women's fashion storefront with a full admin dashboard.
Storefront and admin share **one source of truth** (Zustand + LocalStorage), so
anything you change in the admin instantly reflects on the store.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build -> dist/
npm run preview  # preview the production build
```

## Admin login

- URL: **/login**
- Email: **admin@luxefashion.com**
- Password: **Admin@123**

After signing in you are redirected to **/admin** (the dashboard). Credentials and
the session are stored in LocalStorage. You can change the admin email/password key
(`lf_admin`) via the storage layer.

## Routes

| Route | Description |
| --- | --- |
| `/` | Home |
| `/shop` | Shop / product grid with filters |
| `/product/:id` | Product detail |
| `/categories` | Category landing |
| `/cart` | Cart |
| `/wishlist` | Wishlist |
| `/about` | About |
| `/contact` | Contact |
| `/login` | Admin login |
| `/admin` | Dashboard (protected) |
| `/admin/products` | Product management (CRUD) |
| `/admin/categories` | Category management (CRUD) |
| `/admin/banners` | Banner management (CRUD) |
| `/admin/inventory` | Inventory + bulk stock |

Unknown routes redirect to `/`. `/admin/dashboard` redirects to `/admin` (legacy).

## Features

**Storefront** — responsive catalog, product detail with image zoom & related items,
cart drawer, wishlist, WhatsApp enquiry, SEO tags, scroll reveals, mobile tab bar.

**Admin** — dashboard with revenue/stock charts, full CRUD for products, categories
and banners, inventory with low-stock alerts, bulk stock update and out-of-stock
highlighting, search, filters and pagination. Includes a **dark-mode toggle** scoped
to the admin console (the storefront stays light).

**Stock status:** `> 20` In Stock · `1–20` Low Stock · `0` Out of Stock.

## Data & auth

LocalStorage is the single backing store. Keys: `lf_products`, `lf_categories`,
`lf_banners`, `lf_admin`, `lf_auth`, `lf_theme`, `lf_cart`, `lf_wishlist`.
Sample data seeds once on first load (`lf_seeded_v1`). Clear LocalStorage to reseed.

## Project structure

```
src/
├── components/      reusable UI + storefront/admin widgets
│   └── ui/          button, badge, modal, rating
├── pages/           storefront pages
│   └── admin/       dashboard, products, categories, banners, inventory, login
├── layouts/         StoreLayout, AdminLayout
├── store/           zustand: products, cart, wishlist, auth, ui (theme)
├── lib/             storage, utils, whatsapp
├── data/            seed products/categories/banners
├── hooks/           useCountdown
└── types/           shared TypeScript interfaces
```

## Deploy (GitHub + Vercel)

1. Push to GitHub.
2. Import the repo in Vercel — framework preset **Vite** is auto-detected.
   - Build command: `npm run build`
   - Output directory: `dist`
3. `vercel.json` rewrites all paths to `index.html` so client-side deep links
   (e.g. `/admin/products`) work on refresh.

No environment variables are required.
