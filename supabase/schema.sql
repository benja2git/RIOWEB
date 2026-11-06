-- Ejecutar manualmente en el SQL Editor de Supabase.
-- Crea el catálogo, sus políticas RLS y carga la carta vigente de hamburguesas.

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

-- Las hamburguesas anteriores que no aparecen en la carta vigente quedan ocultas,
-- conservando sus registros por si están referenciados en otros sistemas.
update public.productos
set disponible = false
where categoria = 'Hamburguesas'
  and id not in (
    'rio-salado','rio-rojas','rio-amazonas','rio-dulce','rio-parana','rio-dorado',
    'rio-de-la-plata','rio-atuel','rio-traful','rio-grande','rio-pilcomayo',
    'rio-carapari','rio-negro','rio-castano','oklahoma','california','smoked'
  );

insert into public.productos
  (id, numero, nombre, descripcion, precio, categoria, imagen, disponible, orden, ingredientes, variacion)
values
  ('rio-salado', '', 'Río Salado', 'Pan de papa con medallón de 140 g de blend, queso cheddar y queso dambo.', 12000, 'Hamburguesas', '', true, 10, array['Pan de papa','Medallón de 140 g de blend','Queso cheddar','Queso dambo'], ''),
  ('rio-rojas', '', 'Río Rojas', 'Pan de papa con 150 g de carne 100% asada, provoleta, cebolla crispy, morrón asado y lechuga.', 14000, 'Hamburguesas', 'assets/menu-photo-rojas.jpg', true, 20, array['Pan de papa','150 g de carne 100% asada','Provoleta','Cebolla crispy','Morrón asado','Lechuga'], 'rojas'),
  ('rio-amazonas', '', 'Río Amazonas', 'Pan de papa con medallón de 140 g de blend, doble cheddar, doble panceta, pepinillos y barbacoa ahumada.', 14000, 'Hamburguesas', 'assets/menu-photo-amazonas.webp', true, 30, array['Pan de papa','Medallón de 140 g de blend','Doble cheddar','Doble panceta','Pepinillos','Barbacoa ahumada'], 'amazonas'),
  ('rio-dulce', '', 'Río Dulce', 'Pan de papa con 150 g de blend, queso dambo, cebolla morada, roquefort y peras caramelizadas.', 14000, 'Hamburguesas', 'assets/menu-photo-dulce.webp', true, 40, array['Pan de papa','150 g de blend','Queso dambo','Cebolla morada','Roquefort','Peras caramelizadas'], 'dulce'),
  ('rio-parana', '', 'Río Paraná', 'Pan brioche con 150 g de roast beef, queso cheddar, huevo, cebolla crispy, lechuga y alioli.', 14000, 'Hamburguesas', 'assets/menu-photo-parana.webp', true, 50, array['Pan brioche','150 g de roast beef','Queso cheddar','Huevo','Cebolla crispy','Lechuga','Alioli'], 'parana'),
  ('rio-dorado', '', 'Río Dorado', 'Pan brioche con doble burger de blend, doble cheddar, doble panceta ahumada y mostaza casera.', 18000, 'Hamburguesas', 'assets/menu-photo-dorado.webp', true, 60, array['Pan brioche','Doble burger de blend','Doble cheddar','Doble panceta ahumada','Mostaza casera'], 'dorado'),
  ('rio-de-la-plata', '', 'Río de la Plata', 'Pan brioche con 150 g de roast beef, provoleta, fusión de quesos, doble panceta y alioli cítrico.', 15000, 'Hamburguesas', '', true, 70, array['Pan brioche','150 g de roast beef','Provoleta','Fusión de quesos','Doble panceta','Alioli cítrico'], ''),
  ('rio-atuel', '', 'Río Atuel', 'Pan brioche con 150 g de bife de chorizo 100%, queso brie, cebolla caramelizada, tomate confitado y mostaza casera.', 14000, 'Hamburguesas', 'assets/menu-photo-atuel.webp', true, 80, array['Pan brioche','150 g de bife de chorizo 100%','Queso brie','Cebolla caramelizada','Tomate confitado','Mostaza casera'], 'atuel'),
  ('rio-traful', '', 'Río Traful', 'Pan de batata con doble burger de 140 g de blend, doble cheddar, morrón asado, lechuga y barbacoa.', 17000, 'Hamburguesas', 'assets/menu-photo-traful.webp', true, 90, array['Pan de batata','Doble burger de 140 g de blend','Doble cheddar','Morrón asado','Lechuga','Barbacoa'], 'traful'),
  ('rio-grande', '', 'Río Grande', 'Pan de batata con triple burger de 140 g de blend, triple cheddar, triple dambo, cebolla crispy y barbacoa.', 21000, 'Hamburguesas', '', true, 100, array['Pan de batata','Triple burger de 140 g de blend','Triple cheddar','Triple dambo','Cebolla crispy','Barbacoa'], ''),
  ('rio-pilcomayo', '', 'Río Pilcomayo', 'Pan de batata con 150 g de bife de chorizo 100%, provoleta, morrón asado y cebolla cruda.', 14000, 'Hamburguesas', '', true, 110, array['Pan de batata','150 g de bife de chorizo 100%','Provoleta','Morrón asado','Cebolla cruda'], ''),
  ('rio-carapari', '', 'Río Caraparí', 'Pan de queso con 150 g de roast beef, guacamole, cebolla morada, tomate y alioli picante.', 15000, 'Hamburguesas', '', true, 120, array['Pan de queso','150 g de roast beef','Guacamole','Cebolla morada','Tomate','Alioli picante'], ''),
  ('rio-negro', '', 'Río Negro', 'Pan de queso con hamburguesa de lentejas de 140 g, provoleta, berenjena gratinada, tomates cherry y alioli cítrico.', 16000, 'Hamburguesas', '', true, 130, array['Pan de queso','Hamburguesa de lentejas de 140 g','Provoleta','Berenjena gratinada','Tomates cherry','Alioli cítrico'], ''),
  ('rio-castano', '', 'Río Castaño', 'Pan de queso con medallón de 140 g de porotos negros y arroz yamaní, cebolla caramelizada, queso dambo, tomates secos, hongos y rúcula.', 16000, 'Hamburguesas', 'assets/menu-photo-castano.jpg', true, 140, array['Pan de queso','Medallón de 140 g de porotos negros y arroz yamaní','Cebolla caramelizada','Queso dambo','Tomates secos','Hongos','Rúcula'], 'castano'),
  ('oklahoma', '', 'Oklahoma', 'Pan californiano con doble burger de roast beef de 140 g, smashada con cebolla y queso cheddar.', 18000, 'Hamburguesas', '', true, 150, array['Pan californiano','Doble burger de roast beef de 140 g','Cebolla smashada','Queso cheddar'], ''),
  ('california', '', 'California', 'Pan californiano con doble burger de roast beef de 140 g, doble cheddar, salsa de la casa, pepinos y lechuga.', 19000, 'Hamburguesas', '', true, 160, array['Pan californiano','Doble burger de roast beef de 140 g','Doble cheddar','Salsa de la casa','Pepinos','Lechuga'], ''),
  ('smoked', '', 'Smoked', 'Pan californiano con pollo crispy, cebolla morada, tomate y lechuga.', 17000, 'Hamburguesas', '', true, 170, array['Pan californiano','Pollo crispy','Cebolla morada','Tomate','Lechuga'], ''),
  ('papas', '', 'Papas Cheddar & Bacon', 'Papas fritas bañadas en cheddar, panceta crocante y verdeo. Ideales para compartir.', 7500, 'Papas y acompañamientos', 'assets/menu-photo-papas.webp', true, 70, array['Papas fritas','Cheddar','Panceta crocante','Verdeo'], '')
on conflict (id) do update set
  numero = excluded.numero,
  nombre = excluded.nombre,
  descripcion = excluded.descripcion,
  precio = excluded.precio,
  categoria = excluded.categoria,
  imagen = excluded.imagen,
  disponible = excluded.disponible,
  orden = excluded.orden,
  ingredientes = excluded.ingredientes,
  variacion = excluded.variacion;

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
