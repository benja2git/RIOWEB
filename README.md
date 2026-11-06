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

## Feed de Instagram

La portada incluye un feed de publicaciones etiquetadas al Instagram del negocio y publicaciones recientes con `#RioBurgers`. Se sirve desde una función de Netlify para que el token de Meta nunca llegue al navegador. El sitio muestra un estado informativo hasta que se configure la integración.

Para conectarlo:

1. Usá una cuenta profesional de Instagram (Empresa o Creador) conectada a una Página de Facebook y configurá una app de Meta con los permisos de lectura de Instagram/hashtags que requiera la API.
2. En **Netlify → Site configuration → Environment variables**, agregá:
   - `INSTAGRAM_ACCESS_TOKEN`: token de acceso de larga duración de la cuenta.
   - `INSTAGRAM_USER_ID`: ID de la cuenta profesional de Instagram.
   - `META_GRAPH_API_VERSION`: versión habilitada para la app (por ejemplo, la versión vigente que muestra Meta).
   - `INSTAGRAM_HASHTAG`: opcional; por defecto `RioBurgers`, sin `#`.
3. Volvé a desplegar el sitio para que la función lea las variables.

No pongas el token en `assets/`, HTML, JavaScript del navegador ni en el repositorio. Meta puede limitar el acceso a hashtags según permisos y revisión de la app; revisá el estado de permisos de la app si la función informa que Instagram no está disponible.
