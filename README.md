# RÍO Bar y Hamburguesería

Sitio web estático de RÍO, con carta digital y panel de administración.

## Estructura

- `index.html`: página principal.
- `carta.html`: carta digital.
- `admin.html`: panel de administración.
- `assets/`: imágenes, datos de la carta y cliente/configuración pública de Supabase.
- `supabase/schema.sql`: esquema de base de datos.

## Desarrollo local

Abrí `index.html` en un navegador o serví la carpeta con cualquier servidor estático. La configuración de redirecciones para Netlify está en `netlify.toml`.

La clave de Supabase incluida en `assets/supabase-config.js` es una clave pública (`publishable`). No guardes claves `service_role`, secretos ni archivos `.env` en este repositorio.
