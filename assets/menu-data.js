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
    traful: 'assets/menu-photo-traful-nuevo.webp',
    sesamo: 'assets/menu-photo-sesamo.webp',
    plancha: 'assets/menu-photo-plancha.webp',
    parana: 'assets/menu-photo-parana.webp',
    atuel: 'assets/menu-photo-atuel.webp',
    clasica: 'assets/menu-photo-clasica.webp',
    albahaca: 'assets/menu-photo-albahaca.webp',
    bar: 'assets/menu-photo-bar.webp',
    rojas: 'assets/menu-photo-rojas.jpg',
    dorado: 'assets/menu-photo-dorado.webp',
    castano: 'assets/menu-photo-castano.jpg',
    plata: 'assets/menu-photo-plata.jpg',
    pilcomayo: 'assets/menu-photo-pilcomayo.webp',
    grande: 'assets/menu-photo-grande.webp',
    carapari: 'assets/menu-photo-carapari.webp',
    oklahoma: 'assets/menu-photo-oklahoma.webp',
    smoked: 'assets/menu-photo-smoked.webp',
    papasCaseras: 'assets/menu-photo-papas-caseras.webp',
    ginTonic: 'assets/menu-photo-gin-tonic.webp',
    ginNaranja: 'assets/menu-photo-gin-naranja.webp',
    limonada: 'assets/menu-photo-limonada.webp'
  };
  const BURGERS = [
    { id: 'rio-salado', name: 'Río Salado', desc: 'Pan de papa, medallón de 140 g de blend, queso cheddar y queso dambo.', price: 12000, ingredients: ['Pan de papa', 'Medallón de 140 g de blend', 'Queso cheddar', 'Queso dambo'] },
    { id: 'rio-rojas', name: 'Río Rojas', desc: 'Pan de papa, 150 g de carne 100% asada, provoleta, cebolla crispy, morrón asado, lechuga y salsa criolla. Acompañada con papas fritas.', price: 14000, ingredients: ['Pan de papa', '150 g de carne 100% asada', 'Provoleta', 'Cebolla crispy', 'Morrón asado', 'Lechuga', 'Salsa criolla', 'Papas fritas'], photo: PHOTOS.rojas, v: 'rojas' },
    { id: 'rio-amazonas', name: 'Río Amazonas', desc: 'Pan de papa, medallón de 140 g de blend, doble cheddar, doble panceta, pepinillos y barbacoa ahumada. Acompañada con papas fritas.', price: 14000, ingredients: ['Pan de papa', 'Medallón de 140 g de blend', 'Doble cheddar', 'Doble panceta', 'Pepinillos', 'Barbacoa ahumada', 'Papas fritas'], photo: PHOTOS.amazonas, v: 'amazonas' },
    { id: 'rio-dulce', name: 'Río Dulce', desc: 'Pan de papa, 150 g de blend, queso dambo, cebolla morada, roquefort y peras caramelizadas. Acompañada con papas fritas.', price: 14000, ingredients: ['Pan de papa', '150 g de blend', 'Queso dambo', 'Cebolla morada', 'Roquefort', 'Peras caramelizadas', 'Papas fritas'], photo: PHOTOS.dulce, v: 'dulce' },
    { id: 'rio-parana', name: 'Río Paraná', desc: 'Pan brioche, 150 g de roast beef, queso cheddar, huevo, cebolla crispy, lechuga y alioli. Acompañada con papas fritas.', price: 14000, ingredients: ['Pan brioche', '150 g de roast beef', 'Queso cheddar', 'Huevo', 'Cebolla crispy', 'Lechuga', 'Alioli', 'Papas fritas'], photo: PHOTOS.parana, v: 'parana' },
    { id: 'rio-dorado', name: 'Río Dorado', desc: 'Pan brioche, doble burger de blend, doble cheddar, doble panceta ahumada y mostaza casera. Acompañada con papas fritas.', price: 18000, ingredients: ['Pan brioche', 'Doble burger de blend', 'Doble cheddar', 'Doble panceta ahumada', 'Mostaza casera', 'Papas fritas'], photo: PHOTOS.dorado, v: 'dorado' },
    { id: 'rio-de-la-plata', name: 'Río de la Plata', desc: 'Pan brioche, 150 g de roast beef, provoleta, fusión de quesos, doble panceta y alioli cítrico. Acompañada con papas fritas.', price: 15000, ingredients: ['Pan brioche', '150 g de roast beef', 'Provoleta', 'Fusión de quesos', 'Doble panceta', 'Alioli cítrico', 'Papas fritas'], photo: PHOTOS.plata, v: 'plata' },
    { id: 'rio-atuel', name: 'Río Atuel', desc: 'Pan brioche, 150 g de bife de chorizo 100%, queso brie, cebolla caramelizada, tomate confitado y mostaza casera. Acompañada con papas fritas.', price: 14000, ingredients: ['Pan brioche', '150 g de bife de chorizo 100%', 'Queso brie', 'Cebolla caramelizada', 'Tomate confitado', 'Mostaza casera', 'Papas fritas'], photo: PHOTOS.atuel, v: 'atuel' },
    { id: 'rio-traful', name: 'Río Traful', desc: 'Pan de batata, doble burger de 140 g de blend, doble cheddar, morrón asado, lechuga y barbacoa. Acompañada con papas fritas.', price: 17000, ingredients: ['Pan de batata', 'Doble burger de 140 g de blend', 'Doble cheddar', 'Morrón asado', 'Lechuga', 'Barbacoa', 'Papas fritas'], photo: PHOTOS.traful, v: 'traful' },
    { id: 'rio-grande', name: 'Río Grande', desc: 'Pan de batata, triple burger de 140 g de blend, triple cheddar, triple dambo, cebolla crispy y barbacoa. Acompañada con papas fritas.', price: 21000, ingredients: ['Pan de batata', 'Triple burger de 140 g de blend', 'Triple cheddar', 'Triple dambo', 'Cebolla crispy', 'Barbacoa', 'Papas fritas'], photo: PHOTOS.grande, v: 'grande' },
    { id: 'rio-pilcomayo', name: 'Río Pilcomayo', desc: 'Pan de batata, 150 g de bife de chorizo 100%, provoleta, morrón asado y cebolla cruda. Acompañada con papas fritas.', price: 14000, ingredients: ['Pan de batata', '150 g de bife de chorizo 100%', 'Provoleta', 'Morrón asado', 'Cebolla cruda', 'Papas fritas'], photo: PHOTOS.pilcomayo, v: 'pilcomayo' },
    { id: 'rio-carapari', name: 'Río Caraparí', desc: 'Pan de queso, 150 g de roast beef, guacamole, cebolla morada, tomate y alioli picante. Acompañada con papas fritas.', price: 15000, ingredients: ['Pan de queso', '150 g de roast beef', 'Guacamole', 'Cebolla morada', 'Tomate', 'Alioli picante', 'Papas fritas'], photo: PHOTOS.carapari, v: 'carapari' },
    { id: 'rio-negro', name: 'Río Negro', desc: 'Pan de queso, hamburguesa de lentejas de 140 g, provoleta, berenjena gratinada, tomates cherry y alioli cítrico. Acompañada con papas fritas.', price: 16000, ingredients: ['Pan de queso', 'Hamburguesa de lentejas de 140 g', 'Provoleta', 'Berenjena gratinada', 'Tomates cherry', 'Alioli cítrico', 'Papas fritas'] },
    { id: 'rio-castano', name: 'Río Castaño', desc: 'Pan de queso, medallón de 140 g de porotos negros y arroz yamaní, cebolla caramelizada, queso dambo, tomates secos, hongos y rúcula. Acompañada con papas fritas.', price: 16000, ingredients: ['Pan de queso', 'Medallón de 140 g de porotos negros y arroz yamaní', 'Cebolla caramelizada', 'Queso dambo', 'Tomates secos', 'Hongos', 'Rúcula', 'Papas fritas'], photo: PHOTOS.castano, v: 'castano' },
    { id: 'oklahoma', name: 'Oklahoma', desc: 'Pan californiano, burger de roast beef de 140 g smashada con cebolla y queso cheddar. Acompañada con papas fritas.', price: 18000, ingredients: ['Pan californiano', 'Burger de roast beef de 140 g', 'Cebolla smashada', 'Queso cheddar', 'Papas fritas'], photo: PHOTOS.oklahoma, v: 'oklahoma' },
    { id: 'california', name: 'California', desc: 'Pan californiano, doble burger de roast beef de 140 g, doble cheddar, salsa de la casa, pepinos y lechuga. Acompañada con papas fritas.', price: 19000, ingredients: ['Pan californiano', 'Doble burger de roast beef de 140 g', 'Doble cheddar', 'Salsa de la casa', 'Pepinos', 'Lechuga', 'Papas fritas'] },
    { id: 'smoked', name: 'Smoked', desc: 'Pan californiano, pollo crispy, cebolla morada, tomate y lechuga. Acompañada con papas fritas.', price: 17000, ingredients: ['Pan californiano', 'Pollo crispy', 'Cebolla morada', 'Tomate', 'Lechuga', 'Papas fritas'], photo: PHOTOS.smoked, v: 'smoked' },
    { id: 'rio-colorado', name: 'Río Colorado', desc: 'Pan de batata, 150 g de cordero, queso brie, morrón asado y cebolla crispy. Acompañada con papas fritas.', price: null, ingredients: ['Pan de batata', '150 g de cordero', 'Queso brie', 'Morrón asado', 'Cebolla crispy', 'Papas fritas'] }
  ].map((product, index) => ({
    ...product,
    desc: `${product.desc}${product.desc.includes('Acompañada con papas fritas') ? '' : ' Acompañada con papas fritas.'}`,
    ingredients: [...product.ingredients, ...(product.ingredients.includes('Papas fritas') ? [] : ['Papas fritas'])],
    category: 'Hamburguesas',
    available: true,
    display_order: (index + 1) * 10,
    featured: false,
    num: '',
    v: product.v || ''
  }));

  const OTHER_PRODUCTS = [
    { id: 'tap-bunuelos', name: 'Buñuelos', desc: 'De espinaca y queso.', category: 'Tapeo' },
    { id: 'tap-tempura', name: 'Tempura de vegetales', desc: 'Con salsa teriyaki.', category: 'Tapeo' },
    { id: 'tap-sandwich-integral', name: 'Sándwich integral', desc: 'De jamón crudo, queso, tomate y rúcula.', category: 'Tapeo' },
    { id: 'tap-milanesitas', name: 'Milanesitas', desc: 'De peceto con alioli cítrico.', category: 'Tapeo' },
    { id: 'tap-pollo-crocante', name: 'Pollo crocante', desc: 'Con barbacoa.', category: 'Tapeo' },
    { id: 'tap-bastones-pescado', name: 'Bastones de pescado', desc: 'Con alioli cítrico.', category: 'Tapeo' },
    { id: 'tap-rabas', name: 'Rabas', desc: 'Con alioli.', category: 'Tapeo' },
    { id: 'papas', name: 'Papas o batatas con cheddar', desc: 'Cheddar, panceta y verdeo.', category: 'Papas o batatas', photo: PHOTOS.papas },
    { id: 'papas-hongos', name: 'Papas o batatas con hongos', desc: 'Hongos, panceta y verdeo.', category: 'Papas o batatas', photo: PHOTOS.papasCaseras },
    { id: 'papas-roquefort', name: 'Papas o batatas con roquefort', desc: 'Roquefort, panceta y verdeo.', category: 'Papas o batatas', photo: PHOTOS.papasCaseras },
    { id: 'ensalada-quinoa', name: 'La Quinoa', desc: 'Quinoa blanca, quinoa roja, palta, rúcula, brócoli, tomates cherry y frutos secos.', category: 'Ensaladas' },
    { id: 'ensalada-verde', name: 'La Verde', desc: 'Lechuga, rúcula, espinaca cruda, champiñón, queso parmesano y nueces.', category: 'Ensaladas' },
    { id: 'limonada-rio', name: 'Limonada Río', desc: 'Limón, menta, jengibre, pepino y miel.', category: 'Bebidas sin alcohol', photo: PHOTOS.limonada },
    { id: 'agua-mineral', name: 'Agua mineral', desc: 'Agua mineral.', category: 'Bebidas sin alcohol' },
    { id: 'aguas-saborizadas', name: 'Aguas saborizadas', desc: 'Consultá sabores disponibles.', category: 'Bebidas sin alcohol' },
    { id: 'gaseosas', name: 'Gaseosas', desc: 'Consultá variedades disponibles.', category: 'Bebidas sin alcohol' },
    { id: 'vino-fond-de-cave-malbec', name: 'Fond de Cave Malbec', desc: 'Vino tinto.', category: 'Vinos y champagne' },
    { id: 'vino-latitud-33-malbec', name: 'Latitud 33 Malbec', desc: 'Vino tinto.', category: 'Vinos y champagne' },
    { id: 'champagne-mumm', name: 'Champagne Mumm', desc: 'Consultar presentación.', category: 'Vinos y champagne' },
    { id: 'champagne-chandon', name: 'Champagne Chandon', desc: 'Consultar presentación.', category: 'Vinos y champagne' },
    { id: 'cerveza-imperial', name: 'Imperial 473 cc', desc: 'Cerveza.', category: 'Cerveza artesanal' },
    { id: 'cerveza-apa', name: 'APA', desc: 'Cerveza artesanal, pinta.', category: 'Cerveza artesanal' },
    { id: 'cerveza-ipa', name: 'IPA', desc: 'Cerveza artesanal, pinta.', category: 'Cerveza artesanal' },
    { id: 'cerveza-lager', name: 'Lager', desc: 'Cerveza artesanal, pinta.', category: 'Cerveza artesanal' },
    { id: 'cerveza-amber-lager', name: 'Amber Lager', desc: 'Cerveza artesanal, pinta.', category: 'Cerveza artesanal' },
    { id: 'cerveza-cream-stout', name: 'Cream Stout', desc: 'Cerveza artesanal, pinta.', category: 'Cerveza artesanal' },
    { id: 'gin-tonic-nacional', name: 'Gin tonic nacional', desc: 'Elegí una de nuestras variedades de gin tonic.', category: 'Gin tonic', photo: PHOTOS.ginTonic },
    { id: 'gin-tonic-importado', name: 'Gin tonic importado', desc: 'Elegí una de nuestras variedades de gin tonic.', category: 'Gin tonic', photo: PHOTOS.ginNaranja },
    { id: 'gin-tonic-clasico', name: 'Clásico', desc: 'Gin, tónica y limón.', category: 'Gin tonic' },
    { id: 'gin-tonic-frutado', name: 'Frutado', desc: 'Gin, fruta seca, tónica y almíbar cítrico.', category: 'Gin tonic' },
    { id: 'gin-tonic-lima', name: 'Limão', desc: 'Gin, lima, jengibre y tónica.', category: 'Gin tonic' },
    { id: 'gin-tonic-eucalipto', name: 'Eucalipto', desc: 'Gin, tónica y almíbar de eucalipto.', category: 'Gin tonic' },
    { id: 'gin-tonic-quinoto', name: 'Quinoto', desc: 'Gin, tónica y almíbar de quinoto.', category: 'Gin tonic' },
    { id: 'gin-tonic-picante', name: 'Picante', desc: 'Gin, tónica y un toque de pimienta.', category: 'Gin tonic' },
    { id: 'gin-tonic-vege', name: 'Vege', desc: 'Gin, tónica, pepino y pomelo rosado.', category: 'Gin tonic' },
    { id: 'vodka-frutas', name: 'Vodka de frutas', desc: 'Absolut mango, pepino, pomelo y tónica.', category: 'Vodka' },
    { id: 'vodka-extra', name: 'Vodka Extra', desc: 'Absolut Extract, tónica, pepino y almíbar de quinoto.', category: 'Vodka' },
    { id: 'vermut-cinzano', name: 'Cinzano', desc: 'Cinzano, pomelo y soda.', category: 'Vermutería' },
    { id: 'vermut-clasico', name: 'Clásico', desc: 'Cinzano, fernet, limón y soda.', category: 'Vermutería' },
    { id: 'vermut-campari', name: 'Campari', desc: 'Campari, naranja o tónica.', category: 'Vermutería' },
    { id: 'vermut-fernet', name: 'Fernet', desc: 'Fernet Branca y cola.', category: 'Vermutería' }
  ].map((product, index) => ({
    ...product,
    price: null,
    ingredients: [],
    available: true,
    display_order: (index + 1) * 10,
    featured: false,
    num: '',
    v: ''
  }));

  function mergeProducts(products) {
    const liveProducts = Array.isArray(products)
      ? products.filter(product => product.category !== 'Hamburguesas')
      : [];
    const knownIds = new Set([...BURGERS, ...OTHER_PRODUCTS].map(product => product.id));
    const extraProducts = liveProducts.filter(product => !knownIds.has(product.id));
    return [...BURGERS, ...OTHER_PRODUCTS, ...extraProducts];
  }

window.RIO_DATA = { BUSINESS, PHOTOS, BURGERS, OTHER_PRODUCTS, mergeProducts };
