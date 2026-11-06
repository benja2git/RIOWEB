# Supabase + Netlify setup for RÍO

The site is a static HTML/CSS/JavaScript project. No build framework or private server credential is required. `index.html` remains the order and WhatsApp checkout experience; `carta.html` is the full menu; `/admin` serves the protected admin page through Netlify rewrites.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the project SQL Editor. It creates the `productos` catalog, admin authorization table, RLS policies, the public `menu-images` Storage bucket with admin-only writes, Realtime configuration, and the initial burger/side records. Product categories are stored as text on product rows to preserve compatibility with the existing site.
3. In Project Settings → API, copy the Project URL and public publishable key. Set them in `assets/supabase-config.js`. This file is public by design; use only the publishable/legacy anon key. Never put a service-role or secret key in this project.
4. In Authentication settings, disable public sign-ups. Create an owner account manually under Authentication → Users → Add user.
5. Copy its user UUID and authorize it in SQL Editor:

   ```sql
   insert into public.admin_users (user_id) values ('UUID-DE-LA-CUENTA');
   ```

   Repeat only for trusted administrators. Authorization is a database allowlist; visiting `/admin` alone grants no privileges.
6. Add local and deployed site origins to Authentication → URL Configuration as needed. For local use, serve the `RIOWEB` directory over HTTP; do not open files with `file://`.

## Netlify setup

1. Connect the existing GitHub repository in Netlify and set the publish directory to `RIOWEB` (or the repository root if the repository itself is this directory). No build command is needed.
2. `netlify.toml` rewrites `/admin` and `/admin/` to `admin.html`. Netlify Functions for the optional Instagram feed are in `netlify/functions`.
3. Set the Supabase URL and publishable key in `assets/supabase-config.js` before deploying; these are intentionally public client values protected by RLS. The Instagram feed, if desired, uses Netlify environment variables described in `README.md`.
4. Set the Netlify HTTPS domain as the Supabase Auth Site URL and add it to allowed redirect URLs.
5. Deploy using the existing GitHub → Netlify workflow. Do not deploy from this setup guide; verify the preview URL first.

## Menu and orders

The public menu and homepage load product names, descriptions, images, availability, and integer ARS prices from Supabase. The category is the product's `categoria` text field. The admin page supports product create/edit/delete, price, availability, featured status, display order, category label, and image upload. Uploaded files are public for menu display; Storage write/delete policies require an authorized admin. The cart is stored in browser local storage under `rio-cart`; it is not an order database. The menu adds to the same cart, and `/carta.html#carrito` opens the shared cart drawer. Checkout uses the restaurant phone and customer/delivery/payment/note fields.

## Verification checklist

- Open `carta.html` and confirm the Supabase catalog, images, prices, category navigation, and sold-out labels load.
- Add an available item, follow the order link, refresh, and confirm it remains in the homepage cart.
- Change a price/availability as an authorized admin and confirm the public pages refresh and the cart uses current available products.
- Submit the existing checkout form and inspect the WhatsApp draft before sending.
- In `/admin`, verify login, create/edit/delete and image upload as an allowlisted user; verify a signed-in but unallowlisted user cannot write.
- Confirm `/admin` works on the Netlify deploy preview.

## Current limitations

This prototype retains its existing single `productos` table and text category field. It does not yet provide independent category records (description, active status, order, and safe category deletion). Catalog categories are derived from products. Live Supabase/Auth/Storage checks require access to the configured project and an authorized account; do not infer those checks from a local static build.
