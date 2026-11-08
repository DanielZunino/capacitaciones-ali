// ===== Maestranza ALI · base común (se carga después de mejoras_comunes.js y antes de las charlas) =====
// 1) Una sola empresa: window.SI_EMP = 'ali' (el motor del portal es el mismo de los otros clientes).
// 2) Vestimenta de los dibujos según el ÁREA (W): en el taller todos con ropa de trabajo azul, lentes de seguridad y zapatos de seguridad
//    (la inducción escrita de ALI exige lentes en todo momento en el lugar de trabajo y al desplazarse por la faena).
//    Soldadura: chaqueta de descarne, guantes de descarne y careta (W(x, y, { area: 'soldadura', careta: true })).
//    Uso en los dibujos: W(x, y, { area: 'taller', ... })  o  AL_AREA('taller') antes de dibujar una escena completa.
// 3) Opciones extra de W en ALI: careta (careta de soldar bajada), caretaArriba (levantada), helmet (casco, color o true).
(function () {
  if (window.__alBase) return; window.__alBase = true;
  window.SI_EMP = 'ali';
  const VEST = {
    taller:     { helmet: false, glasses: true, shirt: '#22406B', pants: '#2B3A4A', boots: false },
    soldadura:  { helmet: false, glasses: true, shirt: '#A1887F', pants: '#2B3A4A', gloves: '#C8A27A' },
    granallado: { helmet: false, glasses: true, shirt: '#546E7A', pants: '#455A64', gloves: '#C8A27A', mask: true },
    pintura:    { helmet: false, glasses: true, shirt: '#ECEFF1', pants: '#CFD8DC', gloves: '#43A047', mask: true },
    mantencion: { helmet: false, glasses: true, shirt: '#22406B', pants: '#2B3A4A' },
    bodega:     { helmet: false, glasses: true, shirt: '#22406B', pants: '#2B3A4A' },
    oficina:    { helmet: false, shirt: '#ECEFF1', pants: '#37474F' },
    visita:     { helmet: false, glasses: true, shirt: '#ECEFF1', pants: '#37474F', vest: true },
    faena:      { helmet: '#FFFFFF', glasses: true, shirt: '#22406B', pants: '#2B3A4A', vest: true }
  };
  VEST.general = VEST.taller;
  window.AL_VEST = VEST;
  let AREA = 'taller';
  window.AL_AREA = a => { AREA = VEST[a] ? a : 'taller'; return ''; };
  if (typeof W === 'function' && !W.__al) {
    const W0 = W;
    W = function (x, y, o) {
      o = Object.assign({}, o || {});
      const a = VEST[o.area] ? o.area : AREA, v = VEST[a] || VEST.taller;
      Object.keys(v).forEach(k => { if (o[k] === undefined && !(k === 'boots' && v[k] === false)) o[k] = v[k]; });
      if (o.helmet === true) o.helmet = '#FFFFFF';
      const careta = o.careta, arriba = o.caretaArriba;
      if (careta || arriba) o.glasses = true;
      delete o.area; delete o.careta; delete o.caretaArriba;
      let g = W0(x, y, Object.assign({}, o, { anim: undefined }));
      if ((careta || arriba) && window.HD && window.HD.careta && typeof POSES !== 'undefined') {
        const P = POSES[o.pose || 'stand'] || POSES.stand, s = o.s || 1, fx = o.flip ? -1 : 1;
        g += window.HD.careta(x + P.head[0] * s * fx, y + P.head[1] * s, s, fx, !!arriba && !careta);
      }
      return o.anim ? `<g class="${o.anim}">${g}</g>` : g;
    };
    W.__al = true;
  }
  // una sola empresa: el texto queda igual
  window.siTxt = function (s) { return s; };
})();
