-- Ejecutar manualmente en el SQL Editor de Supabase.
-- Crea el catálogo, sus políticas RLS y los productos que ya estaban en la carta.

create table if not exists public.productos (
  id text primary key check (id ~ '^[a-z0-9][a-z0-9-]*$'),
  nombre text not null check (length(trim(nombre)) > 0),
  descripcion text not null default '',
  precio integer not null check (precio >= 0),
  categoria text not null check (length(trim(categoria)) > 0),
  imagen text not null default '',
  disponible boolean not null default true,
  orden integer not null default 0,
  created_at timestamptz not null default now(),
  numero text not null default '',
  ingredientes text[] not null default '{}',
  destacado boolean not null default false,
  variacion text not null default ''
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.productos enable row level security;
alter table public.admin_users enable row level security;

revoke all on public.productos from anon, authenticated;
revoke all on public.admin_users from anon, authenticated;
grant select on public.productos to anon, authenticated;
grant insert, update, delete on public.productos to authenticated;
grant select on public.admin_users to authenticated;

drop policy if exists "Anyone can read available products" on public.productos;
create policy "Anyone can read available products"
  on public.productos for select
  to anon, authenticated
  using (disponible = true);

drop policy if exists "Admins can read all products" on public.productos;
create policy "Admins can read all products"
  on public.productos for select
  to authenticated
  using (
    exists (
      select 1 from public.admin_users
      where admin_users.user_id = (select auth.uid())
    )
  );

drop policy if exists "Admins can insert products" on public.productos;
create policy "Admins can insert products"
  on public.productos for insert
  to authenticated
  with check (
    exists (
      select 1 from public.admin_users
      where admin_users.user_id = (select auth.uid())
    )
  );

drop policy if exists "Admins can update products" on public.productos;
create policy "Admins can update products"
  on public.productos for update
  to authenticated
  using (
    exists (
      select 1 from public.admin_users
      where admin_users.user_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.admin_users
      where admin_users.user_id = (select auth.uid())
    )
  );

drop policy if exists "Admins can delete products" on public.productos;
create policy "Admins can delete products"
  on public.productos for delete
  to authenticated
  using (
    exists (
      select 1 from public.admin_users
      where admin_users.user_id = (select auth.uid())
    )
  );

drop policy if exists "Users can read their own admin authorization" on public.admin_users;
create policy "Users can read their own admin authorization"
  on public.admin_users for select
  to authenticated
  using (user_id = (select auth.uid()));

insert into public.productos
  (id, numero, nombre, descripcion, precio, categoria, imagen, disponible, orden, ingredientes, variacion)
values
  ('parana', '05', 'Hamburguesa Paraná', 'Doble medalla smash, queso cheddar y cebolla crispy / caramelizada.', 9500, 'Hamburguesas', 'assets/menu-photo-parana.webp', true, 10, array['Doble medalla smash','Queso cheddar','Cebolla crispy / caramelizada'], 'parana'),
  ('atuel', '08', 'Hamburguesa Atuel', 'Medalla de carne, queso brie fundido y panceta crujiente.', 10500, 'Hamburguesas', 'assets/menu-photo-atuel.webp', true, 20, array['Medalla de carne','Queso brie fundido','Panceta crujiente'], 'atuel'),
  ('traful', '09', 'Hamburguesa Traful', 'Medalla smash, queso cheddar, lechuga, tomate y salsa especial.', 9800, 'Hamburguesas', 'assets/menu-photo-traful.webp', true, 30, array['Medalla smash','Queso cheddar','Lechuga','Tomate','Salsa especial'], 'traful'),
  ('dulce', '04', 'Hamburguesa Dulce', 'Combinación agridulce con queso azul y rodajas de pera / manzana caramelizada.', 10200, 'Hamburguesas', 'assets/menu-photo-dulce.webp', true, 40, array['Queso azul','Pera / manzana caramelizada'], 'dulce'),
  ('clasica', '', 'Clásica Doble Smash', 'Doble smash, queso cheddar, pepinillos, cebolla picada, ketchup y mostaza.', 8800, 'Hamburguesas', 'assets/menu-photo-clasica.webp', true, 50, array['Doble smash','Queso cheddar','Pepinillos','Cebolla picada','Ketchup','Mostaza'], 'clasica'),
  ('amazonas', '03', 'Hamburguesa Amazonas', 'Medallón smash, queso cheddar, pepinillo y panceta glaseada.', 10800, 'Hamburguesas', 'assets/menu-photo-amazonas.webp', true, 60, array['Medallón smash','Queso cheddar','Pepinillo','Panceta glaseada'], ''),
  ('papas', '', 'Papas Cheddar & Bacon', 'Papas fritas bañadas en cheddar, panceta crocante y verdeo. Ideales para compartir.', 7500, 'Papas y acompañamientos', 'assets/menu-photo-papas.webp', true, 70, array['Papas fritas','Cheddar','Panceta crocante','Verdeo'], '')
on conflict (id) do nothing;

-- Habilita Realtime para productos sin duplicar la tabla en la publicación.
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
    and not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'productos'
    ) then
    alter publication supabase_realtime add table public.productos;
  end if;
end
$$;

-- 1. Crear la cuenta por Supabase Authentication > Users > Add user.
-- 2. Ejecutar por separado reemplazando el UUID de esa cuenta:
-- insert into public.admin_users (user_id) values ('UUID-DEL-USUARIO');
