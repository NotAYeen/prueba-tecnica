/**
 * Datos de la campana. Un unico lugar para editar el contenido.
 *
 * Regla del copy: si un campo no viene en el texto de origen, no se inventa.
 * "precio" y "nota" son campos separados porque "cada viernes" es un dia, no un precio.
 * Las fotos son ilustrativas de cada platillo, no fotos de los locales.
 */
(function () {
  'use strict';
  // =========================================================================
  // DATOS
  // Regla: si un campo no viene en el copy, no se inventa. precio y nota son
  // campos separados porque "cada viernes" es un dia, no un precio.
  // Las fotos son ilustrativas de cada platillo, no fotos de los locales.
  // =========================================================================

  var IMG = 'https://images.unsplash.com/photo-';
  var Q = '?auto=format&fit=crop&w=700&q=80';

  var PROMOS = [
    // Lunes
    {
      id: 'lun-1',
      dia: 'lunes',
      local: 'Munchify',
      titulo: 'Malteadas',
      precio: '2 x $100',
      imagen: IMG + '1572490122747-3968b75cc699' + Q,
      alt: 'Malteada cremosa coronada con una galleta',
    },
    {
      id: 'lun-2',
      dia: 'lunes',
      local: 'Green Room',
      titulo: 'Botanas saludables',
      precio: '$35',
      imagen: IMG + '1540420773420-3366772f4999' + Q,
      alt: 'Ensalada fresca con verduras en tonos verde y naranja',
    },
    // Martes
    {
      id: 'mar-1',
      dia: 'martes',
      local: 'El Chel',
      titulo: 'Menú Mestizo',
      precio: '$107',
      nota: '3 especialidades + tortillas + agua',
      imagen: IMG + '1547592180-85f173990554' + Q,
      alt: 'Plato del menú mestizo con arroz, verduras y carne',
    },
    {
      id: 'mar-2',
      dia: 'martes',
      local: 'Munchify',
      titulo: 'Combo de flautas de papa y zanahoria',
      precio: '$100',
      nota: 'Incluye agua + sopa del día',
      imagen: IMG + '1586511925558-a4c6376fe65f' + Q,
      alt: 'Flautas crujientes servidas con salsas y crema',
    },
    {
      id: 'mar-3',
      dia: 'martes',
      local: 'Pastino',
      titulo: 'Pastes',
      precio: '2 x $49',
      imagen: IMG + '1509440159596-0249088772ff' + Q,
      alt: 'Panes artesanales espolvoreados con harina',
    },
    // Miercoles
    {
      id: 'mie-1',
      dia: 'miercoles',
      local: 'Munchify',
      titulo: 'Ensalada César o Spicy Tuna',
      precio: '$125',
      imagen: IMG + '1550304943-4f24f54ddde9' + Q,
      alt: 'Ensalada verde con pollo y salsa cremosa',
    },
    {
      id: 'mie-2',
      dia: 'miercoles',
      local: 'Mexicanísimo',
      titulo: 'Tacos de carnitas + cerveza',
      precio: '$120',
      imagen: IMG + '1599974579688-8dbdd335c77f' + Q,
      alt: 'Tacos de carne con cebolla y cilantro',
    },
    // Jueves
    {
      id: 'jue-1',
      dia: 'jueves',
      local: 'Olas Urbanas',
      titulo: 'Clamato con cerveza',
      precio: '$85',
      imagen: IMG + '1556679343-c7306c1976bc' + Q,
      alt: 'Vaso alto con bebida oscura, hielo y rodajas de limón',
    },
    {
      id: 'jue-2',
      dia: 'jueves',
      local: 'Mexicanísimo',
      titulo: 'Tacos de carnitas + cerveza',
      precio: '$120',
      // Misma foto que el miercoles a proposito: es el mismo platillo los dos dias.
      imagen: IMG + '1599974579688-8dbdd335c77f' + Q,
      alt: 'Tacos de carne con cebolla y cilantro',
    },
    // Viernes
    {
      id: 'vie-1',
      dia: 'viernes',
      // El copy no le asigna ninguna marca a esta promocion (ver docs/errores-del-copy.md,
      // caso 3). No se inventa una: el campo va vacio y la tarjeta lo omite.
      local: null,
      titulo: 'Tacos de canasta',
      precio: '$10 c/u',
      imagen: IMG + '1552332386-f8dd00dc2f85' + Q,
      alt: 'Tacos servidos en una mesa con limón al lado',
    },
    {
      id: 'vie-2',
      dia: 'viernes',
      local: 'Doña Blanca',
      titulo: 'Chilaquiles + atole',
      precio: '$70',
      imagen: IMG + '1534352956036-cd81e27dd615' + Q,
      alt: 'Chilaquiles con salsa y cilantro en un recipiente',
    },
    {
      id: 'vie-3',
      dia: 'viernes',
      local: 'Deli House y Deli Gourmet',
      titulo: 'Tortas',
      precio: 'Desde $65',
      imagen: IMG + '1509722747041-616f39b57569' + Q,
      alt: 'Torta de pan crujiente con aguacate y jitomate',
    },
    {
      id: 'vie-4',
      dia: 'viernes',
      local: 'Olas Urbanas',
      titulo: 'Micheladas',
      precio: '3 x $155',
      imagen: IMG + '1551024709-8f23befc6f87' + Q,
      alt: 'Tres bebidas frías con limón en vasos altos',
    },
    {
      id: 'vie-5',
      dia: 'viernes',
      local: 'Emilia',
      titulo: 'Clericot',
      precio: '$80',
      imagen: IMG + '1544145945-f90425340c7e' + Q,
      alt: 'Bebida en copa con rodajas de limón y menta',
    },
    {
      id: 'vie-6',
      dia: 'viernes',
      local: 'Taco Perrón',
      titulo: 'Tacotes',
      precio: '3 x $100',
      imagen: IMG + '1551504734-5ee1c4a1479b' + Q,
      alt: 'Tacos servidos en plato con toppings.coloridos',
    },
    {
      id: 'vie-7',
      dia: 'viernes',
      local: 'Bobo',
      titulo: 'Latones',
      precio: '3 x $145',
      imagen: IMG + '1608270586620-248524c67de9' + Q,
      alt: 'Jarra de cerveza escarchada con condensación',
    },
  ];

  // Agrupadas por el horario que da el copy. El horario es la jerarquia real.
  var GRUPOS_POSTRES = [
    {
      titulo: 'Lunes y jueves',
      items: [
        {
          id: 'pos-1',
          titulo: 'Palomitas gourmet',
          precio: 'Desde $45',
          lugar: 'Mercado Gastronómico',
          imagen: IMG + '1578849278619-e73505e9610f' + Q,
          alt: 'Palomitas gourmet acarameladas',
        },
        {
          id: 'pos-2',
          titulo: 'Helados Moyo',
          precio: 'Precio especial $90',
          lugar: 'Rampa del MGA',
          imagen: IMG + '1488900128323-21503983a07e' + Q,
          alt: 'Helado de color con frutos del bosque',
        },
        {
          id: 'pos-3',
          titulo: 'Fresas y uvas con crema',
          precio: 'Desde $80',
          lugar: 'A un costado de Soru',
          desc: 'Elige tu crema y topping favorito.',
          imagen: IMG + '1464965911861-746a04b4bca6' + Q,
          alt: 'Fresas frescas con hoja y tallo',
        },
      ],
    },
    {
      titulo: 'Lunes a viernes',
      items: [
        // El copy no da precio para paletas heladas, asi que no se muestra ninguno.
        {
          id: 'pos-4',
          titulo: 'Paletas heladas',
          precio: null,
          lugar: 'Mercado Gastronómico Azteca',
          imagen: IMG + '1505394033641-40c6ad1178d7' + Q,
          alt: 'Paletas heladas de COLOR sobre hielo',
        },
      ],
    },
  ];

  var SEPTIEMBRE = [
    {
      id: 'sep-1',
      local: 'Pastino',
      titulo: 'Paste en nogada',
      precio: '$65',
      imagen: IMG + '1587314168485-3236d6710814' + Q,
      alt: 'Postre de crema con frutos rojos y chocolate',
    },
    {
      id: 'sep-2',
      local: 'Doña Blanca',
      titulo: 'Un platillo mexicano diferente cada semana',
      precio: null,
      nota: 'Cada semana',
      imagen: IMG + '1414235077428-338989a2e8c0' + Q,
      alt: 'Plato servido en mesa dentro de un restaurante',
    },
    {
      id: 'sep-3',
      local: 'Emilia',
      titulo: 'Prueba un pedacito de México cada viernes',
      precio: null,
      nota: 'Cada viernes',
      imagen: IMG + '1432139555190-58524dae6a55' + Q,
      alt: 'Plato con carne y guarnición sobre plato blanco',
    },
    {
      id: 'sep-4',
      local: 'El Chel',
      titulo: 'Chiles en nogada',
      precio: 'Combo $220',
      nota: 'Jueves y viernes',
      imagen: IMG + '1476224203421-9ac39bcb3327' + Q,
      alt: 'Plato a la parrilla con verduras y salsa para acompañar',
    },
  ];

  var EVENTOS = [
    {
      id: 'ev-1',
      fecha: '10 de septiembre',
      hora: 'A partir de las 13:00 h',
      local: 'Tacos "Los de Azteca"',
      oferta: '3 x $100',
      lugar: 'Atrás de la tiendita',
      imagen: IMG + '1615870216519-2f9fa575fa5c' + Q,
      alt: 'Tres tacos con cilantro y salsa vertida encima',
    },
    {
      id: 'ev-2',
      fecha: '17 y 18 de septiembre',
      hora: null,
      local: 'Corte y Norte',
      oferta: 'Boutique de complementos + asado',
      lugar: 'A un costado de Munchify',
      imagen: IMG + '1544025162-d76694265947' + Q,
      alt: 'Costillas al carbón con guarnición sobre tabla',
    },
    {
      id: 'ev-3',
      fecha: '30 de septiembre',
      hora: null,
      local: 'Peribán',
      oferta: 'Tacos y gorditas $35',
      lugar: 'Atrás de la tiendita',
      imagen: 'https://img.chilango.com/cdn-cgi/image/width=1536,quality=75,format=auto,onerror=redirect/2025/03/el-periban-carnitas-estilo-michoacan-cdmx-4.jpg',
      alt: 'Tacos de carnitas estilo michoacano en Peribán',
    },
  ];

  // Los destinos de la navegacion. Se usan en el menu de escritorio y en el panel movil.
  // Cada enlace apunta a una seccion que existe de verdad (R-24).
  var NAV = {
    tvazteca: [
      { texto: 'Promociones', href: '#promos' },
      { texto: 'Postres', href: '#postres' },
      { texto: 'Septiembre', href: '#temporada' },
      { texto: 'Fechas', href: '#eventos' },
    ],
    estudios: [
      { texto: 'Uso de LOZA', href: '#loza' },
      { texto: 'Calefactores', href: '#calefactores' },
      { texto: 'Microondas', href: '#microondas' },
      { texto: 'Reporta una falla', href: '#reporta' },
    ],
  };

  var DIAS = [
    { clave: 'lunes', etiqueta: 'Lunes' },
    { clave: 'martes', etiqueta: 'Martes' },
    { clave: 'miercoles', etiqueta: 'Miércoles' },
    { clave: 'jueves', etiqueta: 'Jueves' },
    { clave: 'viernes', etiqueta: 'Viernes' },
  ];

  // Regla del copy: de lunes a viernes se abre el dia actual. Fin de semana, lunes.
  function diaPorDefecto() {
    var hoy = new Date().getDay();
    return hoy >= 1 && hoy <= 5 ? DIAS[hoy - 1].clave : 'lunes';
  }

  window.MGA = {
    PROMOS: PROMOS,
    GRUPOS_POSTRES: GRUPOS_POSTRES,
    SEPTIEMBRE: SEPTIEMBRE,
    EVENTOS: EVENTOS,
    NAV: NAV,
    DIAS: DIAS,
    diaPorDefecto: diaPorDefecto,
  };
})();
