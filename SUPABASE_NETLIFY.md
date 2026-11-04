# Configuración de Supabase y publicación en Netlify

## 1. Crear el proyecto Supabase

1. Creá un proyecto en Supabase y esperá a que termine de aprovisionarse PostgreSQL.
2. En **SQL Editor**, revisá `supabase/schema.sql` y ejecutalo manualmente. Crea `productos`, `admin_users`, activa RLS, agrega las políticas, carga la carta actual y habilita Realtime para `productos` cuando la publicación `supabase_realtime` esté disponible. Está pensado para un proyecto nuevo; si ya ejecutaste un SQL anterior que creó `public.products`, no lo uses como migración: esa tabla no se renombra ni se copia automáticamente.
3. En **Project Settings > API**, copiá la URL del proyecto y la clave pública **Publishable** (`sb_publishable_...`) o la clave heredada `anon`.
4. Pegá esos valores en `assets/supabase-config.js`. Ese archivo se publica en el navegador: solo admite la clave pública. Nunca pegues la clave `service_role` o una clave secreta.

La configuración es la misma para localhost y Netlify: el sitio es estático y no usa variables privadas de servidor.

## 2. Crear el primer administrador

1. En **Authentication > Users**, creá una cuenta con email y contraseña segura. No habilites el registro público para este panel.
2. Copiá el UUID de la cuenta.
3. En **SQL Editor**, ejecutá esta sentencia sustituyendo el valor:

   ```sql
   insert into public.admin_users (user_id)
   values ('UUID-DE-LA-CUENTA');
   ```

La cuenta solo puede consultar su propia autorización. No hay una función web para autorizar otras cuentas; hacerlo requiere acceso autorizado al SQL Editor. Las políticas RLS bloquean escrituras de cualquier otro usuario aunque visite `/admin`.

## 3. Probar localmente

Serví la carpeta como sitio estático mediante una extensión de servidor local de VS Code. No abras los HTML con `file://`, porque Supabase Auth necesita un origen web. Abrí `/admin.html` para probar el panel local; la ruta corta `/admin` la reescribe Netlify.

En **Authentication > URL Configuration**, agregá el origen local de prueba a **Additional Redirect URLs** si la configuración de Auth lo requiere. El panel no usa recuperación de contraseña ni enlaces de invitación.

## 4. Publicar en Netlify

1. Publicá la carpeta del proyecto como sitio estático en Netlify, sin comando de build ni directorio de funciones.
2. `netlify.toml` configura `/admin` y `/admin/` para servir `admin.html`.
3. En **Authentication > URL Configuration** de Supabase, configurá el dominio HTTPS de Netlify como **Site URL** y como redirect permitido si corresponde.
4. Abrí `/admin`, iniciá sesión con la cuenta autorizada y comprobá alta, edición, precio rápido, disponibilidad y eliminación.
5. Confirmá que un visitante puede ver productos disponibles en `index.html` y `carta.html`, y que los cambios guardados aparecen en ambas páginas sin recargar.

## Modelo de datos y seguridad

`public.productos` usa `id` como identificador único y los campos `nombre`, `descripcion`, `precio`, `categoria`, `imagen`, `disponible`, `orden` y `created_at`. También conserva `numero`, `ingredientes`, `destacado` y `variacion` para presentar la carta existente. `imagen` acepta una URL absoluta o una ruta de archivo del sitio, por ejemplo `assets/menu-photo-parana.webp`.

Los visitantes y usuarios autenticados solo leen filas disponibles; los administradores autorizados pueden leer todas y realizar cambios. Las páginas usan Realtime y consultan Supabase cada 30 segundos mientras están visibles. Este sondeo de respaldo también actualiza los productos que dejan de estar disponibles, cuyos eventos podrían no llegar a visitantes por las políticas RLS. El carrito sigue siendo local al navegador y no se usa como almacenamiento del catálogo.
