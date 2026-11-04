/* Shared source for the landing page and QR menu. */
'use strict';
  const BUSINESS = {
    name: 'RÍO Bar y Hamburguesería',
    logo: 'assets/rio-logo-blanco.png',
    address: 'Melián 501, Rojas',
    province: 'Provincia de Buenos Aires',
    hours: 'Jueves a domingos, desde las 19:30 hs',
    shortHours: 'Jueves a domingos, 19:30 hs',
    whatsapp: '5492475407747',
    whatsappLabel: '+54 9 2475 407747',
    mapQuery: 'Melián 501, Rojas, Buenos Aires, Argentina',
    openDays: ['jue', 'vie', 'sáb', 'sab', 'dom'],
    openingHour: 19,
    openingMinute: 30,
    openMessage: 'Abierto ahora · Jue a dom desde 19:30 hs',
    publicMenuUrl: '', // Set the final public HTTPS URL ending in /carta.html after deployment.
    instagram: null,
    facebook: null
  };
  const PHOTOS = {
    papas: 'assets/menu-photo-papas.webp',
    amazonas: 'assets/menu-photo-amazonas.webp',
    dulce: 'assets/menu-photo-dulce.webp',
    traful: 'assets/menu-photo-traful.webp',
    sesamo: 'assets/menu-photo-sesamo.webp',
    plancha: 'assets/menu-photo-plancha.webp',
    parana: 'assets/menu-photo-parana.webp',
    atuel: 'assets/menu-photo-atuel.webp',
    clasica: 'assets/menu-photo-clasica.webp',
    albahaca: 'assets/menu-photo-albahaca.webp',
    bar: 'assets/menu-photo-bar.webp'
  };
window.RIO_DATA = { BUSINESS, PHOTOS };
