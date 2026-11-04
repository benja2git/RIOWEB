'use strict';
(() => {
  const config = window.RIO_SUPABASE_CONFIG || {};
  const configured = typeof config.url === 'string'
    && /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(config.url)
    && typeof config.publishableKey === 'string'
    && Boolean(config.publishableKey)
    && !config.publishableKey.includes('YOUR_SUPABASE');
  const sdk = window.supabase;
  const client = configured && sdk && typeof sdk.createClient === 'function'
    ? sdk.createClient(config.url, config.publishableKey)
    : null;

  function getClient() {
    if (!sdk || typeof sdk.createClient !== 'function') {
      throw new Error('No se pudo cargar el SDK oficial de Supabase.');
    }
    if (!client) {
      throw new Error('Configurá la URL y la clave pública en assets/supabase-config.js.');
    }
    return client;
  }

  const PRODUCT_COLUMNS = 'id,numero,nombre,descripcion,precio,categoria,imagen,disponible,orden,created_at,ingredientes,destacado,variacion';

  function normalizeProduct(product) {
    return {
      id: product.id,
      num: product.numero || '',
      name: product.nombre,
      desc: product.descripcion || '',
      price: product.precio,
      category: product.categoria,
      photo: product.imagen || '',
      available: product.disponible,
      display_order: product.orden,
      created_at: product.created_at,
      ingredients: Array.isArray(product.ingredientes) ? product.ingredientes : [],
      featured: product.destacado === true,
      v: product.variacion || ''
    };
  }

  async function getProducts() {
    const { data, error } = await getClient()
      .from('productos')
      .select(PRODUCT_COLUMNS)
      .order('orden')
      .order('id');
    if (error) throw error;
    if (!Array.isArray(data)) throw new Error('Supabase devolvió una lista de productos inválida.');
    return data.map(normalizeProduct);
  }

  function subscribeProducts(onChange, onStatusChange = () => {}) {
    const channel = getClient()
      .channel('rio-productos-publicos')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'productos' }, onChange)
      .subscribe(onStatusChange);
    return () => getClient().removeChannel(channel);
  }

  function watchProducts(onProducts, onError) {
    getClient();
    let stopped = false;
    let refreshTimer;
    let unsubscribe = () => {};
    const refresh = async () => {
      try {
        const products = await getProducts();
        if (!stopped) onProducts(products);
      } catch (error) {
        if (!stopped) onError(error);
      }
    };
    const scheduleRefresh = () => {
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(refresh, 150);
    };
    const refreshWhenVisible = () => {
      if (!document.hidden) refresh();
    };

    try {
      unsubscribe = subscribeProducts(scheduleRefresh, status => {
        if (status === 'SUBSCRIBED') scheduleRefresh();
        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          console.error(`El canal Realtime informó: ${status}; sigue activo el sondeo de respaldo.`);
        }
      });
    } catch (error) {
      onError(error);
    }

    const pollTimer = setInterval(refreshWhenVisible, 30000);
    document.addEventListener('visibilitychange', refreshWhenVisible);
    refresh();

    return () => {
      stopped = true;
      clearTimeout(refreshTimer);
      clearInterval(pollTimer);
      document.removeEventListener('visibilitychange', refreshWhenVisible);
      unsubscribe();
    };
  }

  window.RIO_SUPABASE = Object.freeze({ client, getClient, getProducts, normalizeProduct, subscribeProducts, watchProducts });
})();
