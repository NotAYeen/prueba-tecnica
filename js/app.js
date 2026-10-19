/**
 * Comportamiento de la landing: pestanas de sede, selector de dia y render.
 * No toca el contenido, solo lo lee de window.MGA (js/data.js).
 */
(function () {
  'use strict';

  var DATOS = window.MGA;
  var PROMOS = DATOS.PROMOS;
  var GRUPOS_POSTRES = DATOS.GRUPOS_POSTRES;
  var SEPTIEMBRE = DATOS.SEPTIEMBRE;
  var EVENTOS = DATOS.EVENTOS;
  var NAV = DATOS.NAV;
  var diaPorDefecto = DATOS.diaPorDefecto;
  var estado = { sede: 'tvazteca', dia: diaPorDefecto() };

  var $ = function (s, r) {
    return (r || document).querySelector(s);
  };
  var $$ = function (s, r) {
    return Array.prototype.slice.call((r || document).querySelectorAll(s));
  };

  function esc(texto) {
    return String(texto).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Los tres estados que pide una vista de datos: vacio, cargando y error (R-27).
  function estadoVacio(titulo, cuerpo) {
    return (
      '' +
      '<div class="col-span-full rounded-[6px] border border-dashed border-edge bg-surface px-6 py-12 text-center">' +
      '<p class="font-display text-lg font-bold">' +
      esc(titulo) +
      '</p>' +
      '<p class="mx-auto mt-1.5 max-w-sm text-sm text-muted">' +
      esc(cuerpo) +
      '</p>' +
      '</div>'
    );
  }

  function estadoCargando() {
    return (
      '<div class="col-span-full grid grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-5" aria-hidden="true">' +
      '<div class="rounded-[6px] border border-ink/10 bg-surface"><div class="aspect-[16/10] animate-pulse bg-ink/5"></div><div class="space-y-2 p-5"><div class="h-3 w-1/3 rounded bg-ink/10"></div><div class="h-5 w-2/3 rounded bg-ink/10"></div></div></div>' +
      '<div class="rounded-[6px] border border-ink/10 bg-surface"><div class="aspect-[16/10] animate-pulse bg-ink/5"></div><div class="space-y-2 p-5"><div class="h-3 w-1/3 rounded bg-ink/10"></div><div class="h-5 w-2/3 rounded bg-ink/10"></div></div></div>' +
      '<div class="rounded-[6px] border border-ink/10 bg-surface"><div class="aspect-[16/10] animate-pulse bg-ink/5"></div><div class="space-y-2 p-5"><div class="h-3 w-1/3 rounded bg-ink/10"></div><div class="h-5 w-2/3 rounded bg-ink/10"></div></div></div>' +
      '</div>'
    );
  }

  function estadoError() {
    return (
      '' +
      '<div class="col-span-full rounded-[6px] border border-edge bg-surface px-6 py-12 text-center" role="alert">' +
      '<p class="font-display text-lg font-bold">No pudimos mostrar las promociones de este día</p>' +
      '<p class="mx-auto mt-1.5 max-w-sm text-sm text-muted">Cambia de día con las pestañas de arriba o recarga la página.</p>' +
      '</div>'
    );
  }

  // =========================================================================
  // RENDER
  // =========================================================================

  function tarjetaPromo(p, i) {
    return (
      '' +
      '<article class="tarjeta tarjeta-entrando flex flex-col overflow-hidden rounded-[6px] border border-ink/10 bg-surface" style="--i:' +
      i +
      '">' +
      '<div class="aspect-[16/10] overflow-hidden bg-ink/5">' +
      '<img src="' +
      esc(p.imagen) +
      '" alt="' +
      esc(p.alt) +
      '" width="700" height="437" loading="lazy" decoding="async" class="foto h-full w-full object-cover" />' +
      '</div>' +
      '<div class="flex flex-1 flex-col gap-4 p-5">' +
      // El copy no siempre asigna una marca a la promocion. Si no la trae, no se
      // inventa una: el nombre del local simplemente no aparece (docs/errores-del-copy.md).
      (p.local
        ? '<p class="etiqueta text-muted"><span class="mr-1.5 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-guajillo" aria-hidden="true"></span>' +
          esc(p.local) +
          '</p>'
        : '') +
      '<div class="mt-auto flex flex-wrap items-start justify-between gap-x-4 gap-y-2">' +
      '<h3 class="min-w-0 font-display text-lg font-bold leading-snug">' +
      esc(p.titulo) +
      '</h3>' +
      '<span class="sello shrink-0 text-base">' +
      esc(p.precio) +
      '</span>' +
      '</div>' +
      (p.nota ? '<p class="text-sm text-muted">' + esc(p.nota) + '</p>' : '') +
      '</div>' +
      '</article>'
    );
  }

  function renderPromos() {
    var grid = $('#grid-promos');
    if (!grid) return;
    try {
      var items = PROMOS.filter(function (p) {
        return p.dia === estado.dia;
      });
      if (!items.length) {
        grid.innerHTML = estadoVacio('No hay promociones para este día', 'Prueba con otro día de la semana.');
      } else {
        grid.innerHTML = items.map(tarjetaPromo).join('');
      }
    } catch (err) {
      grid.innerHTML = estadoError();
    }
  }

  function renderPostres() {
    var cont = $('#lista-postres');
    if (!cont) return;
    try {
      cont.innerHTML = GRUPOS_POSTRES.map(function (grupo) {
        return (
          '' +
          '<div class="grid grid-cols-1 gap-6 border-t border-ink/15 pt-7 lg:grid-cols-[9rem_1fr] lg:gap-8">' +
          '<h3 class="font-display text-sm font-bold uppercase tracking-[0.08em] text-agave">' +
          esc(grupo.titulo) +
          '</h3>' +
          '<ul class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,15rem),1fr))] gap-x-6 gap-y-7">' +
          grupo.items
            .map(function (d) {
              return (
                '' +
                '<li class="postre flex gap-4">' +
                '<img src="' +
                esc(d.imagen) +
                '" alt="' +
                esc(d.alt) +
                '" width="300" height="300" loading="lazy" decoding="async" class="postre-foto h-20 w-20 shrink-0 rounded-[6px] border border-ink/10 object-cover" />' +
                '<div class="min-w-0">' +
                '<h4 class="font-display text-base font-bold leading-snug">' +
                esc(d.titulo) +
                '</h4>' +
                // Sin precio en el copy, no se muestra linea de precio.
                (d.precio
                  ? '<p class="mt-1 font-display text-sm font-bold text-guajillo">' + esc(d.precio) + '</p>'
                  : '') +
                (d.desc ? '<p class="mt-1 text-sm text-muted">' + esc(d.desc) + '</p>' : '') +
                '<p class="mt-1.5 text-xs text-muted"><span class="sr-only">Ubicación: </span>' +
                esc(d.lugar) +
                '</p>' +
                '</div>' +
                '</li>'
              );
            })
            .join('') +
          '</ul>' +
          '</div>'
        );
      }).join('');
    } catch (err) {
      cont.innerHTML =
        '<p class="rounded-[6px] border border-edge bg-surface px-6 py-10 text-center text-muted" role="alert">No pudimos mostrar los postres.</p>';
    }
  }

  function renderSeptiembre() {
    var cont = $('#lista-septiembre');
    if (!cont) return;
    try {
      cont.innerHTML = SEPTIEMBRE.map(function (s) {
        return (
          '' +
          '<div class="septiembre-item flex flex-col gap-3 xl:border-l xl:border-onagave/25 xl:pl-6">' +
          '<img src="' +
          esc(s.imagen) +
          '" alt="' +
          esc(s.alt) +
          '" width="600" height="450" loading="lazy" decoding="async" class="aspect-[4/3] w-full rounded-[6px] object-cover" />' +
          '<p class="etiqueta text-paper/70">' +
          esc(s.local) +
          '</p>' +
          '<h3 class="font-display text-lg font-bold leading-snug text-paper">' +
          esc(s.titulo) +
          '</h3>' +
          '<div class="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1">' +
          (s.precio ? '<span class="sello border-paper text-paper">' + esc(s.precio) + '</span>' : '') +
          (s.nota ? '<span class="text-sm text-onagave">' + esc(s.nota) + '</span>' : '') +
          '</div>' +
          '</div>'
        );
      }).join('');
    } catch (err) {
      cont.innerHTML =
        '<p class="rounded-[6px] border border-edge px-6 py-10 text-center" role="alert">No pudimos mostrar los platillos de temporada.</p>';
    }
  }

  function renderEventos() {
    var cont = $('#lista-eventos');
    if (!cont) return;
    try {
      cont.innerHTML = EVENTOS.map(function (e) {
        return (
          '' +
          '<article class="evento flex flex-col gap-4 border-t-2 border-paprika pt-5">' +
          '<p class="evento-fecha font-display text-2xl font-black leading-tight tracking-tight text-paprika">' +
          esc(e.fecha) +
          '</p>' +
          '<img src="' +
          esc(e.imagen) +
          '" alt="' +
          esc(e.alt) +
          '" width="700" height="437" loading="lazy" decoding="async" class="aspect-[16/10] w-full rounded-[6px] border border-ink/10 object-cover" />' +
          '<div>' +
          (e.hora ? '<p class="etiqueta text-muted">' + esc(e.hora) + '</p>' : '') +
          '<h3 class="font-display text-lg font-bold leading-snug">' +
          esc(e.local) +
          '</h3>' +
          '<p class="mt-1 text-muted">' +
          esc(e.oferta) +
          '</p>' +
          '<p class="mt-3 border-t border-ink/10 pt-3 text-xs text-muted"><span class="sr-only">Ubicación: </span>' +
          esc(e.lugar) +
          '</p>' +
          '</div>' +
          '</article>'
        );
      }).join('');
    } catch (err) {
      cont.innerHTML =
        '<p class="rounded-[6px] border border-edge bg-surface px-6 py-10 text-center text-muted" role="alert">No pudimos mostrar las fechas especiales.</p>';
    }
  }

  // =========================================================================
  // INTERACCIONES
  // =========================================================================

  function pintarSede() {
    var esTv = estado.sede === 'tvazteca';

    var panelTv = $('#panel-tvazteca');
    var panelEs = $('#panel-estudios');
    panelTv.hidden = !esTv;
    panelEs.hidden = esTv;

    $$('.sede-tab').forEach(function (btn) {
      var activo = btn.dataset.sede === estado.sede;
      btn.setAttribute('aria-selected', activo ? 'true' : 'false');
      // aria-current marca la sede visible. Si se queda en la pestana que ya no
      // esta activa, el lector de pantalla anuncia dos veces la misma sede.
      if (activo) btn.setAttribute('aria-current', 'true');
      else btn.removeAttribute('aria-current');
      btn.tabIndex = activo ? 0 : -1;
      btn.className =
        'sede-tab min-h-[44px] flex-1 rounded-full px-5 py-2.5 font-display text-sm font-bold sm:flex-none sm:px-8 sm:text-base ' +
        (activo ? 'bg-guajillo text-white' : 'text-muted hover:text-ink');
    });

    $$('.pie-sede').forEach(function (btn) {
      var activo = btn.dataset.sede === estado.sede;
      btn.setAttribute('aria-current', activo ? 'true' : 'false');
      btn.classList.toggle('bg-paper', activo);
      btn.classList.toggle('text-ink', activo);
    });

    pintarNav();
    observarRevelar();

    // Crossfade del panel: dice que algo cambio.
    var panel = esTv ? panelTv : panelEs;
    panel.classList.remove('panel-entrando');
    void panel.offsetWidth; // reinicia la animacion si se cambia dos veces seguidas
    panel.classList.add('panel-entrando');
  }

  function pintarNav() {
    var enlaces = NAV[estado.sede];
    var claseEscritorio =
      'nav-enlace inline-flex min-h-[44px] items-center rounded-full px-4 text-sm font-medium text-muted transition-colors hover:text-ink';
    var claseMovil =
      'flex min-h-[44px] items-center rounded-[6px] px-3 text-base font-medium text-muted transition-colors hover:bg-ink/5 hover:text-ink';
    $('#nav-desktop').innerHTML = enlaces
      .map(function (a) {
        return '<li><a href="' + esc(a.href) + '" class="' + claseEscritorio + '">' + esc(a.texto) + '</a></li>';
      })
      .join('');
    $('#nav-movil').innerHTML = enlaces
      .map(function (a) {
        return '<li><a href="' + esc(a.href) + '" class="' + claseMovil + '">' + esc(a.texto) + '</a></li>';
      })
      .join('');
  }

  function pintarDia() {
    var activo = null;
    $$('.dia-tab').forEach(function (btn) {
      var esActivo = btn.dataset.dia === estado.dia;
      // Cada pestana necesita id para que el panel se pueda etiquetar con ella.
      btn.id = 'dia-' + btn.dataset.dia;
      btn.setAttribute('aria-selected', esActivo ? 'true' : 'false');
      btn.tabIndex = esActivo ? 0 : -1;
      btn.className =
        'dia-tab min-h-[44px] shrink-0 rounded-full border px-5 text-sm font-semibold ' +
        (esActivo ? 'border-guajillo bg-guajillo text-white' : 'border-edge bg-surface text-ink');
      if (esActivo) activo = btn;
    });

    // Un tabpanel sin etiqueta anuncia "panel de grupo" y nada mas: el nombre del
    // dia activo es lo que le dice al usuario que acaba de cambiar la lista.
    var grid = $('#grid-promos');
    if (grid && activo) grid.setAttribute('aria-labelledby', activo.id);

    var riel = $('#riel-dias');
    if (riel && activo) {
      // En movil el riel es un scroll horizontal: el dia activo debe quedar a la vista.
      // Se mide con getBoundingClientRect y no con offsetLeft, porque el riel tiene margen
      // negativo y offsetLeft se mediria contra otro ancestro.
      var suave = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var delta = activo.getBoundingClientRect().left - riel.getBoundingClientRect().left;
      riel.scrollTo({ left: riel.scrollLeft + delta - 8, behavior: suave ? 'smooth' : 'auto' });
    }
  }

  function irADia(clave) {
    if (clave === estado.dia) return;
    estado.dia = clave;
    pintarDia();
    renderPromos();
  }

  function cambiarSede(sede, hacerScroll) {
    if (sede === estado.sede) {
      if (hacerScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    estado.sede = sede;
    pintarSede();
    if (hacerScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Flechas dentro de un tablist, patron de WAI-ARIA para tabs.
  function tecladoTablist(contenedor, mover) {
    $$('[role="tablist"]', contenedor).forEach(function (lista) {
      var tabs = $$('[role="tab"]', lista);
      if (!tabs.length) return;
      lista.addEventListener('keydown', function (ev) {
        var teclas = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
        if (teclas.indexOf(ev.key) === -1) return;
        var i = tabs.indexOf(document.activeElement);
        if (i === -1) return;
        ev.preventDefault();
        var j = i;
        if (ev.key === 'ArrowRight') j = (i + 1) % tabs.length;
        else if (ev.key === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
        else if (ev.key === 'Home') j = 0;
        else j = tabs.length - 1;
        tabs[j].focus();
        mover(tabs[j]);
      });
    });
  }

  // --- Menu movil ---
  var menuAbierto = false;
  function toggleMenu(abrir) {
    menuAbierto = abrir;
    var panel = $('#panel-menu');
    var btn = $('#boton-menu');
    panel.hidden = !abrir;
    btn.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    if (abrir) {
      var primero = $('a', panel);
      if (primero) primero.focus();
    }
  }

  // --- Barra de avance de lectura ---
  // El scroll dispara decenas de veces por segundo. Poner el ancho en el DOM en
  // cada evento obliga a recalcular el layout entero; con rAF se escribe una vez
  // por fotograma como maximo.
  var avance = $('#avance-scroll');
  var pedido = false;

  function pintarAvance() {
    pedido = false;
    if (!avance) return;
    var alto = document.documentElement.scrollHeight - window.innerHeight;
    var pct = alto > 0 ? Math.min(1, Math.max(0, window.scrollY / alto)) : 0;
    avance.style.transform = 'scaleX(' + pct + ')';
  }

  function pedirAvance() {
    if (pedido || !avance) return;
    pedido = true;
    window.requestAnimationFrame(pintarAvance);
  }

  // --- Reveal al hacer scroll ---
  var observador = null;

  // Un bloque ya visible en pantalla se muestra de inmediato. Sin esto, un bloque que
  // estaba oculto (dentro de una pestaña cerrada) puede quedarse invisible para siempre,
  // porque IntersectionObserver no reporta elementos dentro de un subarbol con display:none.
  //
  // La prueba es "ya llego el tope del bloque" y no "esta solapado con la ventana".
  // IntersectionObserver entrega el estado que tiene en el fotograma en que se entrega,
  // no una cola de estados: quien salta al final con la tecla Fin pasa por encima de los
  // bloques sin que ninguno llegue a solaparse con la ventana, y todos se quedarian en
  // opacidad 0. Con esta prueba, un bloque que quedo arriba de la pantalla se revela igual.
  function marcarLoQueAlcanceLaPantalla(raiz) {
    $$('.revelar', raiz).forEach(function (el) {
      if (el.classList.contains('visible')) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add('visible');
    });
  }

  function observarRevelar() {
    if (!('IntersectionObserver' in window)) {
      $$('.revelar').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }
    if (!observador) {
      observador = new IntersectionObserver(
        function (entradas) {
          entradas.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
              observador.unobserve(e.target); // una sola vez, no hay loop
            }
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      );
    }
    $$('.revelar:not(.visible)').forEach(function (el) {
      observador.observe(el);
    });
    marcarLoQueAlcanceLaPantalla(document);
  }

  // =========================================================================
  // INIT
  // =========================================================================

  function init() {
    $('#grid-promos').innerHTML = estadoCargando();

    // Una animacion con relleno "both" gana en la cascada al transform del :hover:
    // mientras este puesta, la tarjeta no se levanta al pasar el cursor. Al terminar
    // la entrada se retira la clase y el estado final (opacidad 1, sin desplazamiento)
    // es el mismo que el de reposo, asi que no hay parpadeo.
    document.addEventListener('animationend', function (ev) {
      if (ev.animationName === 'tarjetaEntra') ev.target.classList.remove('tarjeta-entrando');
      else if (ev.animationName === 'entradaSube') ev.target.classList.remove('entrada');
      else if (ev.animationName === 'panelEntra') ev.target.classList.remove('panel-entrando');
    });

    $$('.sede-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        cambiarSede(btn.dataset.sede, false);
      });
    });

    $$('.pie-sede').forEach(function (btn) {
      btn.addEventListener('click', function () {
        cambiarSede(btn.dataset.sede, true);
      });
    });

    $$('.dia-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        irADia(btn.dataset.dia);
      });
    });

    tecladoTablist(document, function (tab) {
      if (tab.dataset.sede) cambiarSede(tab.dataset.sede, false);
      else if (tab.dataset.dia) irADia(tab.dataset.dia);
    });

    $('#boton-menu').addEventListener('click', function () {
      toggleMenu(!menuAbierto);
    });

    $('#panel-menu').addEventListener('click', function (ev) {
      if (ev.target.closest('a')) toggleMenu(false);
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && menuAbierto) {
        toggleMenu(false);
        $('#boton-menu').focus();
      }
    });

    document.addEventListener('click', function (ev) {
      if (!menuAbierto) return;
      if (!ev.target.closest('#panel-menu') && !ev.target.closest('#boton-menu')) toggleMenu(false);
    });

    // El header compacto, la barra de avance y el reveal se recalculan en cada
    // cambio de sede y al redimensionar.
    var cabecera = $('#cabecera');
    window.addEventListener(
      'scroll',
      function () {
        cabecera.classList.toggle('compacta', window.scrollY > 40);
        marcarLoQueAlcanceLaPantalla(document);
        pedirAvance();
      },
      { passive: true },
    );

    window.addEventListener(
      'resize',
      function () {
        marcarLoQueAlcanceLaPantalla(document);
        pedirAvance();
      },
      { passive: true },
    );

    try {
      renderPromos();
      renderPostres();
      renderSeptiembre();
      renderEventos();
    } catch (err) {
      $('#grid-promos').innerHTML = estadoError();
    }

    pintarDia();
    pintarSede();
    pintarAvance();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
