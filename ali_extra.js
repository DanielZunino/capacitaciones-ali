// ===== Maestranza ALI · portal de capacitación (motor común de los portales de Daniel; una sola razón social). Se carga después de ali_base.js y de las charlas =====
// Con el RUT, el servidor dice la empresa de la persona (persona.emp) y el portal muestra:
//   logo, colores, vestimenta de los dibujos, secciones y charlas de SU empresa, inducción de SU empresa y su Reglamento Interno.
(function () {
  if (window.__siExtra) return; window.__siExtra = true;

  // ---------- 1) La empresa (una sola razón social)
  const EMPRESAS = window.SI_EMPRESAS = {
    ali: { k: 'ali', n: 'Maestranza ALI S.A.', corto: 'Maestranza ALI', rut: '', logo: 'data:image/jpeg;base64,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IOMvISfoq0hmu3i3RR5ASeadp4FuY47e3klfy2+6xCqSoPbNOj8V6LLE0i3TLtuEtXSSJ0dJHxsVkIyM5GDjFc/oNlrHh65trifRrq5SXSbS1cWzIXiliDBgwZhkHd1BPSpdQttb1hTKNCFpGup2c0Ydk86SNHBd3wSMDsM5wKANifxfoMF5PatdySSW7FJRBbyyiNh1DFFIB9q09P1Cz1TT476wuEnt5BlJEPBrldHuNQ8Oz6pZ3Xh/VLgTajPdRTWiJIjpI24c7gQexBFafgvTr3TfCUcGoQGCd5ppzEWBKB5GcAkcZwRmgDoaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAMCiiigBMA9QKWiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBjRbpkk3uNuRtB4OfUUUUUAf/2Q==', ar: 1.38,
      c1: '#C62E26', c2: '#A1A2A4', head: 'MAESTRANZA ALI', voz: 'Maestranza Alí' }
  };
  const ORDEN_EMP = ['ali'];
  const GRUPO = { n: 'Maestranza ALI', c1: '#C62E26', c2: '#A1A2A4', head: 'MAESTRANZA ALI' };
  const sinT = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
  const empDeNombre = s => 'ali';
  const empDe = p => (p ? 'ali' : '');
  window.siEmpDeNombre = empDeNombre;

  // Razón social y RUT en diplomas y certificados
  try { Object.keys(RAZONES).forEach(k => delete RAZONES[k]); ORDEN_EMP.forEach(k => { RAZONES[EMPRESAS[k].n] = EMPRESAS[k].rut; }); } catch (e) {}

  // ---------- 2) Secciones (cada una dice para qué empresas existe)
  const SI_SECS = [
    { id: 'todos', t: 'Para todos', ic: '⭐', c: '#C62E26', d: 'Lo que todo el equipo de la maestranza debe saber', emp: ORDEN_EMP },
    { id: 'taller', t: 'Taller', ic: '🏭', c: '#455A64', d: 'Esmeril, grúa horquilla, izaje, altura, bloqueo y faenas de clientes', emp: ORDEN_EMP },
    { id: 'maquinas', t: 'Máquinas y herramientas', ic: '⚙️', c: '#1565C0', d: 'Torno, fresa, taladro, sierra, guillotina, plegadora y mesa de corte', emp: ORDEN_EMP },
    { id: 'soldadura', t: 'Soldadura y calderería', ic: '🔥', c: '#E65100', d: 'Arco, MIG y TIG, humos, oxicorte, cilindros y trabajos en caliente', emp: ORDEN_EMP },
    { id: 'granallado', t: 'Granallado y pintura', ic: '🎨', c: '#6A1B9A', d: 'Granallado y pintura con pistola', emp: ORDEN_EMP },
    { id: 'mantencion', t: 'Mecánica de mantención', ic: '🔧', c: '#2E7D32', d: 'Mantención segura y operación de grúa horquilla', emp: ORDEN_EMP },
    { id: 'oficina', t: 'Oficina y bodega', ic: '🗂️', c: '#6D4C41', d: 'Computador, bodega y entrar al taller', emp: ORDEN_EMP }
  ];
  const ORDEN_SEC = SI_SECS.map(s => s.id);

  // ---------- 3) Normas que respaldan cada charla (van en el registro de la capacitación)
  const N = {
    l16744: 'Ley 16.744: seguro social contra accidentes del trabajo y enfermedades profesionales; art. 68, obligación de implantar medidas de prevención y proporcionar los EPP.',
    ds44: 'DS 44/2023 MINTRAB: gestión preventiva de los riesgos laborales; art. 15, deber de informar los riesgos laborales; art. 16, capacitación en seguridad y salud en el trabajo.',
    ds594: 'DS 594/1999 MINSAL: condiciones sanitarias y ambientales básicas en los lugares de trabajo.',
    ds57: 'DS 57/2019 MINSAL: clasificación, etiquetado y fichas de datos de seguridad (HDS) de sustancias químicas.',
    l20949: 'Código del Trabajo, arts. 211-F a 211-J (Ley 20.949): 25 kg como máximo sin ayuda mecánica; 20 kg para menores de 18 años y mujeres.',
    l20096: 'Ley 20.096 y DS 594 (arts. 109 a, b y c): protección de trabajadores expuestos a radiación ultravioleta de origen solar.',
    l21643: 'Ley 21.643 (Ley Karin): prevención, investigación y sanción del acoso laboral, sexual y la violencia en el trabajo.',
    prexor: 'Protocolo de Exposición Ocupacional a Ruido (PREXOR), MINSAL.',
    tmert: 'Protocolo de Vigilancia para Trabajadores Expuestos a Factores de Riesgo de Trastornos Musculoesqueléticos de Extremidades Superiores (TMERT), MINSAL.',
    psico: 'Protocolo de Vigilancia de Riesgos Psicosociales en el Trabajo (cuestionario CEAL-SM/SUSESO), MINSAL.',
    res156: 'Circular SUSESO (Res. Ex. 156): procedimiento ante accidentes graves y fatales.',
    l18290: 'Ley 18.290 de Tránsito: licencias de conducir y normas de circulación.',
    ds40: 'DS 40/1969 MINTRAB: reglamento sobre prevención de riesgos profesionales; deber de informar los riesgos.',
    dec158: 'DS 158/2014 y Res. 2.196 SAG: uso de plaguicidas, periodo de carencia y de reingreso.',
    ds10: 'DS 10/2012 MINSAL: reglamento de calderas, autoclaves y equipos que utilizan vapor de agua (referencia para la operación segura de generadores de calor).'
  };
  const NORMAS_SI = {
    induccion: [N.ds44, N.l16744, N.ds40, N.ds594],
    autocuidado: [N.l16744, N.ds44], peligros: [N.ds44, N.ds40], epp: [N.l16744, N.ds594], orden: [N.ds594], caidas: [N.ds594], cargas: [N.l20949, N.ds594],
    accidente: [N.l16744, N.res156], incendios: [N.ds594], emergencias: [N.ds594, N.ds44], senaletica: [N.ds594], quimicos: [N.ds57, N.ds594], electrico: [N.ds594],
    ruido: [N.prexor, N.ds594], uv: [N.l20096], calor: [N.ds594], tmert: [N.tmert], psicosocial: [N.psico, N.ds44], karin: [N.l21643], trayecto: [N.l16744, N.l18290], celular: [N.ds44, N.l18290],
    ta_esmeril: [N.ds594, N.prexor], ta_horquilla: [N.ds594], ta_izaje: [N.ds594], ta_altura: [N.ds594], ta_bloqueo: [N.ds594], ta_atrapamiento: [N.ds594], ta_faenas: [N.ds44, N.ds594], ta_herramientas: [N.ds594],
    mq_torno: [N.ds594], mq_fresa: [N.ds594], mq_taladro_sierra: [N.ds594], mq_guillotina_plegadora: [N.ds594], mq_mesa_corte: [N.ds594],
    so_arco: [N.ds594], so_mig_tig: [N.ds594], so_humos: [N.ds594], so_oxicorte: [N.ds594], so_cilindros: [N.ds594], so_caliente: [N.ds594],
    gr_granallado: [N.ds594, N.prexor], gr_pintura: [N.ds57, N.ds594],
    mt_mantencion: [N.ds594], mt_horquilla: [N.ds594, N.l18290],
    of_pvd: [N.ds594, N.tmert], of_bodega: [N.ds594, N.l20949], of_taller: [N.ds594]
  };

  // ---------- 4) Construir las charlas de una empresa (textos con [[L:..|X:..|A:..|I:..]] resueltos)
  const C = window.SI_CONT || { temas: [] };
  const deep = (o, f) => Array.isArray(o) ? o.map(x => deep(x, f)) : (o && typeof o === 'object') ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, deep(v, f)])) : f(o);
  const cvQ = (q, e) => { const r = s => window.siTxt(s, e); const one = x => x.vf !== undefined ? { q: r(x.q), vf: x.vf, w: r(x.w) } : { q: r(x.q), o: (x.o || []).map(r), a: 0, w: r(x.w) };
    const vs = q.v || []; return Object.assign({ s: q.s }, one(vs[0]), { v: vs.slice(1).map(one) }); };
  let EMP_HECHA = '';
  function construir(e) {
    if (!EMPRESAS[e]) e = 'ali';
    if (EMP_HECHA === e && TOPICS.length) { window.SI_EMP = e; if (M_ACT !== EMPRESAS[e]) marca(e); try { window.__siAjInd && window.__siAjInd(e); } catch (er) {} return; }
    window.SI_EMP = e;
    const temas = C.temas.filter(t => (t.emp || []).indexOf(e) >= 0);
    const nuevos = temas.map(t => {
      const r = s => window.siTxt(s, e);
      const o = { id: t.id, sec: t.sec === 'induccion' ? 'todos' : t.sec, title: r(t.title), thumb: t.thumb, mins: t.mins, dur: t.mins,
        learn: (t.learn || []).map(l => { const x = { s: l.s, t: r(l.t), x: r(l.x) }; if (l.k) x.k = r(l.k); if (l.puesto) x.puesto = true; return x; }),
        quiz: (t.quiz || []).map(q => cvQ(q, e)).concat(window.__siActsDe ? window.__siActsDe(t.id, e) : []) };
      return o;
    });
    nuevos.sort((a, b) => (a.id === 'induccion' ? -1 : b.id === 'induccion' ? 1 : 0) || (ORDEN_SEC.indexOf(a.sec) - ORDEN_SEC.indexOf(b.sec)));
    TOPICS.splice(0, TOPICS.length, ...nuevos);
    Object.keys(NORMAS).forEach(k => delete NORMAS[k]);
    nuevos.forEach(t => { NORMAS[t.id] = { obj: 'Que la persona trabajadora conozca los peligros, riesgos y medidas de control de: ' + t.title.replace(/\s*\(IRL\)\s*$/, '') + '.', n: (NORMAS_SI[t.id] || [N.ds44, N.ds594]).slice() }; });
    // secciones de la empresa (solo las que tienen charlas)
    const secs = SI_SECS.filter(s => s.emp.indexOf(e) >= 0 && nuevos.some(t => t.sec === s.id)).map(s => ({ id: s.id, t: s.t, ic: s.ic, c: s.c, d: s.d }));
    SECCIONES.splice(0, SECCIONES.length, ...secs);
    // plan personal: primero lo crítico de cada sección
    try {
      PLAN_CFG.ordenSec = secs.map(s => s.id);
      PLAN_CFG.critico = { taller: ['ta_atrapamiento', 'ta_esmeril', 'ta_izaje', 'ta_horquilla', 'ta_bloqueo', 'ta_altura', 'ta_herramientas', 'ta_faenas'],
        maquinas: ['mq_torno', 'mq_guillotina_plegadora', 'mq_taladro_sierra', 'mq_fresa', 'mq_mesa_corte'],
        soldadura: ['so_humos', 'so_arco', 'so_cilindros', 'so_caliente', 'so_oxicorte', 'so_mig_tig'], granallado: ['gr_granallado', 'gr_pintura'],
        mantencion: ['mt_mantencion', 'mt_horquilla'], oficina: ['of_taller', 'of_pvd', 'of_bodega'] };
      PLAN_CFG.base = ['peligros', 'epp', 'accidente', 'orden', 'caidas', 'cargas', 'incendios', 'emergencias', 'senaletica', 'ruido', 'quimicos', 'electrico', 'trayecto', 'celular', 'karin', 'psicosocial', 'tmert', 'uv', 'calor'];
      PLAN_TEMPORADA.calor = [10, 11, 0, 1]; PLAN_TEMPORADA.uv = [8, 9, 10, 11, 0, 1];
      delete PLAN_TEMPORADA.transito; delete PLAN_TEMPORADA.hanta;
      INICIO_PROGRAMA = '16-11-2026';
    } catch (er) {}
    // inducción: riesgos del puesto y reglamento interno de su empresa
    try {
      IND_PUESTO = Object.assign({}, window.SI_IND_PUESTO || {});
      IND_TRANSV = (window.SI_IND_TRANSV || {})[e] || '';
      IND_REGLAMENTOS = {}; IND_REGLAMENTOS[EMPRESAS[e].n] = SCRIPT_URL + '?riohs=1&e=' + e;
      IND_FORMULARIO = '#inscribirme';
    } catch (er) {}
    EMP_HECHA = e;
    try { window.__siAjInd && window.__siAjInd(e); } catch (er) {}
    marca(e);
  }
  window.siConstruir = construir;

  // ---------- 5) Marca de la empresa: logo, colores, nombre en diplomas, camiones y grúas
  const mix = (hex, k) => { const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255; r = Math.round(r * k); g = Math.round(g * k); b = Math.round(b * k); return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join(''); };
  const imgs = {};
  const imgDe = src => { if (!src) return null; if (!imgs[src]) { const i = new Image(); i.src = src; imgs[src] = i; } return imgs[src]; };
  let M_ACT = null;
  window.SI_C1 = () => (M_ACT || GRUPO).c1;
  window.SI_C2 = () => (M_ACT || GRUPO).c2;
  window.SI_HEAD = () => (M_ACT || GRUPO).head;
  // carita del nivel: cofia (planta y packing), legionario (campo) o pelo (oficina / sin ingresar)
  window.SI_GORRO = c => `<path d="M20,52 Q16,22 50,20 Q84,22 80,52 Q74,34 50,34 Q26,34 20,52 Z" fill="#4E342E"/>`;
  window.SI_LOGO = () => (M_ACT && M_ACT.logo) ? imgDe(M_ACT.logo) : null;
  function marca(e) {
    const E = EMPRESAS[e]; M_ACT = E;
    const r = document.documentElement.style, dark = mix(E.c1, .62), dark2 = mix(E.c1, .8), line = mix(E.c1, 1.05);
    r.setProperty('--dark', dark); r.setProperty('--dark2', dark2); r.setProperty('--line', line); r.setProperty('--acc', E.c2); r.setProperty('--c1', E.c1);
    try { if (window.MARCA) Object.assign(window.MARCA, { nombre: E.corto, c1: E.c1, c2: E.c2, fachada: E.corto.toUpperCase(), corto: E.corto.split(' ')[0].toUpperCase() }); } catch (er) {}
    try { const L = window.__mjLOGO; if (L) { L.src = E.logo || ''; L.ar = E.ar || 2; } } catch (er) {}
    const bar = document.querySelector('.logoBar');
    if (bar) bar.classList.remove('siGrupo');
    if (bar) bar.innerHTML = `<img alt="${E.corto}" src="${E.logo}"><span>${E.head}<br>PROGRAMA DE CAPACITACIÓN</span>`;
    document.title = 'Capacitaciones ' + E.corto;
    document.body.classList.add('siIn');
  }
  function marcaGrupo() { marca('ali'); }
  const css = document.createElement('style');
  css.textContent = `.logoBar { border-bottom-color:var(--acc) !important; min-height:64px; } .ruta { border-left-color:var(--acc) !important; }
.logoBar img { height:52px !important; width:auto !important; max-width:40% !important; object-fit:contain; }
.logoBar .siLogos { display:flex; align-items:center; gap:10px; flex:none; } .logoBar .siLogos img { height:38px !important; max-width:none !important; }
.logoBar.siGrupo { display:block !important; text-align:center; padding:14px 12px 12px !important; }
.logoBar .siG1 { font-size:11px; font-weight:bold; letter-spacing:3px; color:#6B7A90; } .logoBar .siG2 { font-size:21px; font-weight:800; color:#12357F; margin-top:2px; line-height:1.15; }
.logoBar .siGl { width:46px; height:3px; border-radius:2px; background:#F2B33D; margin:9px auto 11px; }
.logoBar .siGg { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.logoBar .siGt { background:#fff; border:1px solid #E3E8F1; box-shadow:0 2px 6px rgba(18,53,127,.08); border-radius:14px; padding:10px 6px 9px; display:flex; flex-direction:column; align-items:center; gap:7px; }
.logoBar .siGm { height:42px; display:flex; align-items:center; justify-content:center; width:100%; }
.logoBar .siGm img { height:42px !important; width:auto !important; max-width:92% !important; object-fit:contain; }
.logoBar .siGi { width:42px; height:42px; border-radius:50%; background:#1F3A5F; display:flex; align-items:center; justify-content:center; font-size:22px; box-shadow:0 0 0 3px #F2B33D55; }
.logoBar .siGn { font-size:12.5px; font-weight:bold; color:#1F3A5F; line-height:1.2; }
.logoBar .siNom { color:var(--c1); font-weight:bold; font-size:15px; letter-spacing:1px; line-height:1.2; max-width:52%; }
.siEmpBtns { display:grid; grid-template-columns:1fr 1fr; gap:10px; } .siEmpBtns a { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; min-height:96px;
  background:#F7F8FA; border:2px solid #E2E3E8; border-radius:14px; padding:10px; text-decoration:none; color:#1F2937; font-weight:bold; font-size:14px; text-align:center; }
.siEmpBtns a img { height:40px; width:auto; max-width:90%; object-fit:contain; } .siEmpBtns a span.n { font-size:15px; color:#1F3A5F; }`;
  document.head.appendChild(css);

  // ---------- 6) Empresa de la persona: se arma todo al ingresar (y al volver con la sesión guardada)
  const empSesion = () => { try { return empDe(RUTA && RUTA.persona); } catch (e) { return ''; } };
  const R0 = renderHome;
  renderHome = function () {
    const e = window.__siVista ? window.__siVista() : empSesion();
    construir('ali');
    return R0.apply(this, arguments);
  };
  // texto de la cabecera de secciones
  try { const s = document.querySelector('#s-home .sec'); if (s) s.textContent = 'TUS CHARLAS POR SECCIÓN'; } catch (e) {}

  // ---------- 7) Validación de un diploma: se arma la empresa del diploma antes de mostrar su registro
  const V0 = validar;
  validar = async function (code) {
    try { const d = await fetch(SCRIPT_URL + '?codigo=' + encodeURIComponent(code)).then(r => r.json()); const e = d && d.ok ? empDeNombre(d.empresa) : ''; if (e) construir(e); } catch (er) {}
    return V0.apply(this, arguments);
  };
  esAntiguo = function () { return false; };

  // ---------- 8) Inscripción: si el sistema no reconoce el RUT, elige su empresa y completa la ficha guiada
  const INSC = 'https://danielzunino.github.io/inscripcion-san-ignacio/?e=ali';
  const botonesEmp = () => `<div class="siEmpBtns" style="grid-template-columns:1fr"><a href="${INSC}" target="_blank" rel="noopener"><img alt="" src="${EMPRESAS.ali.logo}"><span class="n">Ficha de inscripción · Maestranza ALI</span></a></div>`;
  alertaNomina = function (tipo, rut) {
    let m = document.getElementById('nomModal'); if (!m) { m = document.createElement('div'); m.id = 'nomModal'; document.body.appendChild(m); }
    const pend = tipo === 'pendiente';
    m.innerHTML = `<div class="nmbox"><div class="nmic">${pend ? '⏳' : '⚠️'}</div>
      <h3>${pend ? 'Tu inscripción está en revisión' : 'El sistema no te reconoce'}</h3>
      ${pend ? `<p>Ya recibimos tu inscripción${rut ? ' (RUT ' + rut + ')' : ''}, pero <b>el prevencionista aún no la acepta</b>.</p><p>Apenas la acepte podrás entrar con tu RUT y tu clave. Si ya pasó más de un día, avisa a tu jefatura.</p>`
        : `<p>${rut ? 'El RUT <b>' + rut + '</b> no está en la nómina.' : 'Tu RUT no está en la nómina.'}</p>
        <p class="nmalert">Si el sistema no te reconoce, <b>debes inscribirte en la nómina de la maestranza</b>. El prevencionista aceptará la inscripción.</p>
        <p><b>Toca el botón</b> y completa la ficha de inscripción:</p>${botonesEmp()}`}
      <button class="${pend ? 'btn' : 'lnk'}" id="nmX">${pend ? 'Entendido' : 'Revisar mi RUT'}</button></div>`;
    m.className = 'on';
    document.getElementById('nmX').onclick = () => { m.className = ''; const r = document.getElementById('rutHome'); if (r && !pend) { r.focus(); r.select && r.select(); } };
    try { SFX.play('bad'); } catch (e) {}
    try { VOZ.say(pend ? 'Tu inscripción está en revisión. Apenas el prevencionista la acepte, podrás entrar.' : 'El sistema no te reconoce. Debes inscribirte en la nómina de la maestranza. Toca el botón y completa la ficha.'); } catch (e) {}
  };
  inscripcionPerello = function () { alertaNomina('noreg', ''); };

  // ---------- 9) Repaso rápido: si el tema ya está aprobado, se reconoce aunque en este teléfono no esté guardada la clave
  try {
    if (typeof temaAprobado === 'function' && !temaAprobado.__si) {
      const vigente = ap => ap && (st.topic.id === 'induccion' ? venceInduccion(ap.fecha) - Date.now() >= 30 * 864e5 : venceAprob(ap.tema_id || st.topic.id, ap.fecha) > Date.now());
      const rk = r => String(r || '').replace(/[^0-9kK]/g, '').toUpperCase();
      const local = () => {
        try { const R = JSON.parse(localStorage.getItem('hsl_cap_ruta') || 'null'); if (R && rk(R.rut) === rk(st.rut) && R.aprob && vigente(R.aprob[st.topic.id])) return R.aprob[st.topic.id]; } catch (e) {}
        try { const ci = JSON.parse(localStorage.getItem('hsl_cap_ind') || 'null'); if (st.topic.id === 'induccion' && ci && rk(ci.rut) === rk(st.rut) && vigente(ci)) return ci; } catch (e) {}
        return null;
      };
      const consulta = async k => { st.hash = await rutHash(st.rut); const ctl = new AbortController(); setTimeout(() => ctl.abort(), 25000);
        return fetch(SCRIPT_URL + '?historial=' + st.hash + '&k=' + encodeURIComponent(k || ''), { signal: ctl.signal }).then(r => r.json()); };
      const desde = d => { if (d.persona) st.persona = d.persona; const ap = (d.temas || []).find(t => t.tema_id === st.topic.id) || null; return vigente(ap) ? ap : null; };
      const pedirClave = () => new Promise(res => {
        const b = document.getElementById('zBody'); if (!b) return res(null);
        b.innerHTML = `<h2>¿Ya aprobaste este tema?</h2><p>Escribe tu clave para revisar tu registro. Si ya lo aprobaste, podrás repasarlo rápido, sin esperar en cada lámina.</p>
          <input type="password" id="siClave" autocomplete="current-password" placeholder="Tu clave (ej: juan1985)" style="width:100%;box-sizing:border-box">
          <p id="siErr" style="display:none;color:#FF8A80;font-size:14px"></p><button class="btn" id="siOk">Revisar mi registro</button><button class="btn ghost" id="siNo">Seguir sin clave</button>`;
        const go = async () => {
          const k = document.getElementById('siClave').value.trim(), er = document.getElementById('siErr'), ok = document.getElementById('siOk');
          if (!k) { er.textContent = 'Escribe tu clave o toca "Seguir sin clave".'; er.style.display = 'block'; return; }
          ok.disabled = true; ok.textContent = 'Revisando…';
          try { const d = await consulta(k);
            if (!d.ok && (d.error === 'clave' || d.error === 'sinnac')) { ok.disabled = false; ok.textContent = 'Revisar mi registro'; er.textContent = d.error === 'sinnac' ? 'Tu ficha no tiene fecha de nacimiento. Contacta al área de RR.HH.' : 'Clave incorrecta. Intenta de nuevo.'; er.style.display = 'block'; return; }
            if (d.ok) { try { const ps = JSON.parse(localStorage.getItem('hsl_cap_persona') || '{}') || {}; localStorage.setItem('hsl_cap_persona', JSON.stringify(Object.assign(ps, { name: st.name, rut: st.rut, k }))); } catch (e2) {} }
            res(d.ok ? desde(d) : null);
          } catch (e2) { res(null); } };
        document.getElementById('siOk').onclick = go;
        document.getElementById('siClave').onkeydown = ev => { if (ev.key === 'Enter') go(); };
        document.getElementById('siNo').onclick = () => res(null);
      });
      temaAprobado = async function () {
        let d = null; try { d = await consulta((sesion() || {}).k || ''); } catch (e) {}
        if (d && d.ok) return desde(d) || local();
        const l = local(); if (l) return l;
        if (d && d.error === 'clave') return pedirClave();
        return null;
      };
      temaAprobado.__si = true;
    }
  } catch (e) {}

  // ---------- 9b) Revisores: en ALI no aplica (una sola empresa). Se deja apagado.
  //      Arriba de las secciones eligen la empresa; el portal dice siempre a qué empresa corresponde lo que están viendo.
  //      El resto de los trabajadores ve solo lo de su empresa.
  const REV_RUT = ['166756243', '16529176K'];
  const REV_NOM = [/DANIEL\s+(FELIPE\s+)?ZUNINO/, /[GJ]IULIANO.*TA[SZ]+ARA|JULIANO.*TA[SZ]+ARA/, /CARLA\s+(ANDREA\s+)?MORENO/];
  const rkR = r => String(r || '').replace(/[^0-9kK]/g, '').toUpperCase();
  const esRevisor = () => false; const esRevisor0 = () => { try { if (!RUTA || !RUTA.persona) return false; if (REV_RUT.indexOf(rkR(RUTA.rut)) >= 0) return true; const n = sinT(RUTA.persona.nombre); return REV_NOM.some(r => r.test(n)); } catch (e) { return false; } };
  window.siEsRevisor = esRevisor;
  let VER = ''; try { VER = localStorage.getItem('hsl_cap_ver') || ''; } catch (e) {}
  // cada vez que alguien ingresa con su RUT, parte viendo su propia empresa
  try { const bR = () => { VER = ''; try { localStorage.removeItem('hsl_cap_ver'); } catch (e) {} };
    document.addEventListener('click', ev => { if (ev.target && (ev.target.id === 'bRuta' || ev.target.id === 'bNoSoy')) bR(); }, true);
    document.addEventListener('keydown', ev => { if (ev.key === 'Enter' && ev.target && (ev.target.id === 'rutHome' || ev.target.id === 'claveHome')) bR(); }, true); } catch (e) {}
  const empVista = () => { const e = empSesion(); return esRevisor() && EMPRESAS[VER] ? VER : e; };
  window.__siVista = empVista;
  const barraRevisor = () => {
    const old = document.getElementById('siRev'); if (old) old.remove();
    if (!esRevisor()) return;
    const v = empVista(), mia = empSesion(), E = EMPRESAS[v] || EMPRESAS.lacteos, sec = document.getElementById('secciones'); if (!sec) return;
    const d = document.createElement('div'); d.id = 'siRev';
    d.innerHTML = `<div class="srT">👁️ MODO REVISIÓN · GRUPO SAN IGNACIO</div>
      <div class="srM">Según tu inscripción, <b>te corresponden las charlas de ${(EMPRESAS[mia] || E).n}</b></div>
      <div class="srS">Además, como revisor, puedes ver las charlas de las otras empresas. Toca una empresa:</div>
      <div class="srB">${ORDEN_EMP.map(k => { const X = EMPRESAS[k]; return `<button data-e="${k}" class="${k === v ? 'on' : ''}" style="--ec:${X.c1}">${X.logo ? `<img alt="" src="${X.logo}">` : '<span class="srI">INVERSIONES</span>'}<b>${X.corto}</b>${k === mia ? '<i class="srTu">TU EMPRESA</i>' : ''}</button>`; }).join('')}</div>
      <div class="srV" style="background:${E.c1}">${v === mia ? `Estás viendo las charlas de <b>tu empresa</b>: ${E.n}` : `Estás revisando las charlas de <b>${E.n}</b> (no es tu empresa)`}</div>`;
    sec.parentNode.insertBefore(d, sec);
    d.querySelectorAll('button').forEach(b => b.onclick = () => {
      const y = window.scrollY; VER = b.dataset.e; try { localStorage.setItem('hsl_cap_ver', VER); } catch (e) {}
      renderHome(); window.scrollTo(0, y);
    });
  };
  // Inducción de OTRA empresa (revisores): es un curso aparte. Su título lleva el nombre de la empresa (así queda en el registro)
  // y se muestra aprobada solo si el revisor aprobó ESA inducción, no la de su propia empresa.
  const otraEmp = () => { if (!esRevisor()) return ''; const v = empVista(), m = empSesion(); return v && m && v !== m ? v : ''; };
  const indDe = k => { const E = EMPRESAS[k]; if (!E) return null; const H = ((RUTA && RUTA.hist) || []).filter(h => h.id === 'induccion' && sinT(h.t).indexOf(sinT(E.corto)) >= 0);
    if (!H.length) return null; const h = H[0], n = parseFloat(String(h.n).replace(',', '.')); return { tema_id: 'induccion', n, nota: h.n, fecha: h.f, codigo: h.c }; };
  // la PROPIA del revisor: un registro de inducción que no lleve el nombre de otra empresa
  const indPropia = m => { const otras = Object.keys(EMPRESAS).filter(k => k !== m).map(k => sinT(EMPRESAS[k].corto));
    const H = ((RUTA && RUTA.hist) || []).filter(h => h.id === 'induccion' && !otras.some(o => sinT(h.t).indexOf(o) >= 0));
    if (!H.length) return null; const h = H[0], n = parseFloat(String(h.n).replace(',', '.')); return { tema_id: 'induccion', n, nota: h.n, fecha: h.f, codigo: h.c }; };
  const indVista = () => { if (!esRevisor()) return undefined; const o = otraEmp(); if (o) return indDe(o); const m = empSesion(); return m ? indPropia(m) : undefined; };
  window.__siAjInd = e => { const t = TOPICS.find(x => x.id === 'induccion'); if (!t) return; if (t.__t0 === undefined) t.__t0 = t.title;
    const o = otraEmp(); t.title = o && o === e ? t.__t0 + ' · ' + EMPRESAS[e].corto : t.__t0; };
  const R1 = renderHome;
  renderHome = function () {
    let real = null;
    try { const ap = indVista(); if (ap !== undefined && RUTA && RUTA.aprob) { real = RUTA.aprob; const vis = Object.assign({}, real); if (ap) vis.induccion = ap; else delete vis.induccion; RUTA.aprob = vis; } } catch (e) {}
    let r; try { r = R1.apply(this, arguments); } finally { if (real) RUTA.aprob = real; }
    try { if (real && otraEmp()) { const z = document.getElementById('ruta'); if (z) z.querySelectorAll('*').forEach(el => { if (el.childNodes.length === 1 && el.firstChild.nodeType === 3 && /Sin ella no puedes hacer charlas/.test(el.textContent))
      el.textContent = 'Inducción de esta empresa, pendiente. Como revisor igual puedes ver sus charlas.'; }); } } catch (e) {}
    try { window.__siAjInd(EMP_HECHA); } catch (e) {}
    try { barraRevisor(); } catch (e) {}
    return r;
  };
  if (typeof temaAprobado === 'function') { const TA = temaAprobado;
    temaAprobado = async function () { try { if (st.topic && st.topic.id === 'induccion') { const ap = indVista(); if (ap !== undefined) return ap; } } catch (e) {} return TA.apply(this, arguments); }; }
  if (typeof indInfo === 'function') { const II = indInfo;
    indInfo = function () { try { const ap = indVista(); if (ap !== undefined) { if (!ap) return { ok: false }; const vence = venceInduccion(ap.fecha), now = Date.now();
      return { ok: vence > now, vence, renovar: vence - now < 30 * 864e5, nota: ap.nota }; } } catch (e) {} return II.apply(this, arguments); }; }
  // en cada charla, el revisor ve a qué empresa corresponde
  if (typeof startLearn === 'function') { const SL = startLearn; startLearn = function () { const r = SL.apply(this, arguments); try { if (esRevisor() && EMPRESAS[EMP_HECHA]) { const t = document.getElementById('lTag'); if (t && t.textContent.indexOf(EMPRESAS[EMP_HECHA].corto.toUpperCase()) < 0) t.textContent = EMPRESAS[EMP_HECHA].corto.toUpperCase() + ' · ' + t.textContent; } } catch (e) {} return r; }; }
  if (typeof pickTopic === 'function') { const PT = pickTopic; pickTopic = function () { const r = PT.apply(this, arguments); try { if (esRevisor() && EMPRESAS[EMP_HECHA]) { const t = document.getElementById('dTag'); if (t && t.textContent.trim() && t.textContent.indexOf(' · ') < 0) t.textContent = EMPRESAS[EMP_HECHA].corto.toUpperCase() + ' · ' + t.textContent; } } catch (e) {} return r; }; }
  const cssR = document.createElement('style');
  cssR.textContent = `#siRev{background:#fff;border-radius:16px;padding:14px;margin:0 0 14px;box-shadow:0 4px 14px rgba(0,0,0,.18);color:#1F2937}
#siRev .srT{font-weight:bold;font-size:13px;letter-spacing:1px;color:#12357F}#siRev .srM{font-size:15px;margin:6px 0 2px;color:#1F2937;background:#FFF6DA;border-left:5px solid #F2B33D;border-radius:8px;padding:8px 10px}
#siRev .srTu{font-style:normal;font-size:10px;font-weight:bold;letter-spacing:.5px;background:#F2B33D;color:#0B2457;border-radius:6px;padding:2px 6px}
#siRev .srS{font-size:14px;margin:4px 0 10px;color:#4A5664}
#siRev .srB{display:grid;grid-template-columns:1fr 1fr;gap:8px}#siRev .srB button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;min-height:78px;background:#F7F8FA;border:2px solid #E2E3E8;border-radius:12px;padding:8px;cursor:pointer;font:inherit;color:#1F2937}
#siRev .srB button img{height:32px;width:auto;max-width:90%;object-fit:contain}#siRev .srB button b{font-size:13px}
#siRev .srB button.on{border-color:var(--ec);background:#fff;box-shadow:0 0 0 3px color-mix(in srgb,var(--ec) 25%,transparent)}
#siRev .srI{font-weight:bold;font-size:12px;letter-spacing:1px;color:#1F3A5F;height:32px;display:flex;align-items:center}
#siRev .srV{margin-top:10px;color:#fff;border-radius:10px;padding:9px 12px;font-size:14px;text-align:center}`;
  document.head.appendChild(cssR);

  // ---------- 9c) Actividades dentro de algunas pruebas (no en todas): ordenar pasos, clasificar y marcar lo correcto.
  //      Cada actividad cuenta como una pregunta más de la prueba (se registra en la prueba respondida en PDF).
  const TODAS = ORDEN_EMP;
  // Íconos propios (planos, mismo estilo del portal) para la actividad "vestir al trabajador"
  const OLi = '#22303A';
  const ICO = {
    cofia: `<path d="M8,30 Q6,12 24,11 Q42,12 40,30 Z" fill="#fff" stroke="${OLi}" stroke-width="2"/><path d="M7,29 H41" stroke="${OLi}" stroke-width="2"/><path d="M8,29 q4,5 8,0 q4,5 8,0 q4,5 8,0 q4,5 8,0" fill="none" stroke="#B0BEC5" stroke-width="2"/><circle cx="17" cy="20" r="1.3" fill="#B0BEC5"/><circle cx="24" cy="17" r="1.3" fill="#B0BEC5"/><circle cx="31" cy="20" r="1.3" fill="#B0BEC5"/>`,
    mascarilla: `<path d="M10,18 h28 v12 q-14,9 -28,0 z" fill="#fff" stroke="${OLi}" stroke-width="2"/><path d="M12,22 h24 M12,26 h24" stroke="#90A4AE" stroke-width="1.6"/><path d="M10,19 q-7,2 -5,9 q2,3 5,2 M38,19 q7,2 5,9 q-2,3 -5,2" fill="none" stroke="${OLi}" stroke-width="1.8"/>`,
    mascarilla_tela: `<path d="M10,18 h28 v12 q-14,9 -28,0 z" fill="#E57373" stroke="${OLi}" stroke-width="2"/><circle cx="16" cy="23" r="1.6" fill="#fff"/><circle cx="24" cy="25" r="1.6" fill="#fff"/><circle cx="32" cy="23" r="1.6" fill="#fff"/><circle cx="20" cy="29" r="1.4" fill="#fff"/><circle cx="28" cy="29" r="1.4" fill="#fff"/><path d="M10,19 q-7,2 -5,9 q2,3 5,2 M38,19 q7,2 5,9 q-2,3 -5,2" fill="none" stroke="${OLi}" stroke-width="1.8"/>`,
    respirador: `<path d="M14,16 q10,-6 20,0 l2,12 q-12,10 -24,0 z" fill="#ECEFF1" stroke="${OLi}" stroke-width="2"/><circle cx="12" cy="28" r="6" fill="#E53935" stroke="${OLi}" stroke-width="2"/><circle cx="36" cy="28" r="6" fill="#E53935" stroke="${OLi}" stroke-width="2"/><circle cx="12" cy="28" r="2.2" fill="#B71C1C"/><circle cx="36" cy="28" r="2.2" fill="#B71C1C"/><rect x="21" y="27" width="6" height="6" rx="1.5" fill="#90A4AE" stroke="${OLi}" stroke-width="1.4"/>`,
    cotona: c => `<path d="M16,8 l-8,6 l-4,26 h8 l1,-14 v20 h22 v-20 l1,14 h8 l-4,-26 l-8,-6 l-8,6 z" fill="${c}" stroke="${OLi}" stroke-width="2" stroke-linejoin="round"/><path d="M24,14 v26" stroke="${OLi}" stroke-width="1.4" opacity=".5"/><circle cx="24" cy="20" r="1.2" fill="${OLi}"/><circle cx="24" cy="27" r="1.2" fill="${OLi}"/><circle cx="24" cy="34" r="1.2" fill="${OLi}"/><rect x="28" y="22" width="5" height="4" rx="1" fill="none" stroke="${OLi}" stroke-width="1.2"/>`,
    pechera: `<path d="M16,8 l-8,6 l-4,26 h8 l1,-14 v20 h22 v-20 l1,14 h8 l-4,-26 l-8,-6 l-8,6 z" fill="#ECEFF1" stroke="${OLi}" stroke-width="2" stroke-linejoin="round"/><path d="M17,12 h14 v6 q4,1 4,6 v20 h-22 v-20 q0,-5 4,-6 z" fill="#fff" stroke="${OLi}" stroke-width="2" stroke-linejoin="round"/><path d="M17,12 q7,-6 14,0" fill="none" stroke="${OLi}" stroke-width="1.6"/>`,
    overol: `<path d="M15,6 l-7,6 l-3,16 h6 l2,-9 v25 h9 l2,-14 l2,14 h9 v-25 l2,9 h6 l-3,-16 l-7,-6 l-9,5 z" fill="#1F3A6B" stroke="${OLi}" stroke-width="2" stroke-linejoin="round"/><path d="M24,11 v18" stroke="#90CAF9" stroke-width="1.6"/><rect x="16" y="20" width="5" height="4" fill="none" stroke="#90CAF9" stroke-width="1.2"/><path d="M13,44 h9 M26,44 h9" stroke="${OLi}" stroke-width="2"/>`,
    traje: `<path d="M24,4 q-8,0 -9,8 l-7,4 l-3,14 h6 l2,-8 v22 h9 l2,-12 l2,12 h9 v-22 l2,8 h6 l-3,-14 l-7,-4 q-1,-8 -9,-8 z" fill="#FBC02D" stroke="${OLi}" stroke-width="2" stroke-linejoin="round"/><ellipse cx="24" cy="12" rx="5" ry="4.5" fill="#F5D0B0" stroke="${OLi}" stroke-width="1.4"/><path d="M24,17 v14" stroke="${OLi}" stroke-width="1.4" opacity=".5"/>`,
    guantes: c => `<path d="M14,40 v-12 l-5,-8 q-1,-3 2,-4 q2,0 3,2 l3,4 v-14 q0,-3 3,-3 q3,0 3,3 v-2 q0,-3 3,-3 q3,0 3,3 v2 q0,-3 3,-3 q3,0 3,3 v4 q0,-3 3,-3 q3,0 3,3 v16 q0,5 -4,8 v3 z" fill="${c}" stroke="${OLi}" stroke-width="2" stroke-linejoin="round"/><path d="M14,36 h20" stroke="${OLi}" stroke-width="1.6" opacity=".6"/>`,
    botas: c => `<path d="M14,6 h13 v24 l11,6 q3,2 3,5 v3 h-27 z" fill="${c}" stroke="${OLi}" stroke-width="2" stroke-linejoin="round"/><path d="M14,40 h27" stroke="${OLi}" stroke-width="3"/><path d="M14,10 h13" stroke="${OLi}" stroke-width="1.4" opacity=".5"/>`,
    zapatos: `<path d="M7,22 h16 l4,6 l12,3 q4,1 4,5 v4 h-36 z" fill="#37474F" stroke="${OLi}" stroke-width="2" stroke-linejoin="round"/><path d="M30,31 q8,1 9,5 v4 h-9 z" fill="#FBC02D" stroke="${OLi}" stroke-width="1.6"/><path d="M7,40 h36" stroke="#111" stroke-width="3"/><path d="M13,26 l6,0 M14,30 l7,0" stroke="#90A4AE" stroke-width="1.4"/>`,
    legionario: `<path d="M10,26 Q9,8 24,8 Q39,8 38,26 Z" fill="#F1E3C2" stroke="${OLi}" stroke-width="2"/><path d="M37,24 q8,1 9,6 l-10,0 z" fill="#F1E3C2" stroke="${OLi}" stroke-width="1.8"/><path d="M11,24 q-3,9 0,16 l7,-2 q-2,-7 1,-14 z" fill="#E9D8A6" stroke="${OLi}" stroke-width="1.8"/><path d="M10,25 h28" stroke="#C9A96E" stroke-width="3"/>`,
    lentes: `<rect x="5" y="18" width="16" height="11" rx="4" fill="#263238" stroke="${OLi}" stroke-width="2"/><rect x="27" y="18" width="16" height="11" rx="4" fill="#263238" stroke="${OLi}" stroke-width="2"/><path d="M21,22 h6 M5,21 l-3,-3 M43,21 l3,-3" stroke="${OLi}" stroke-width="2"/><path d="M8,21 l5,0 M30,21 l5,0" stroke="#90CAF9" stroke-width="1.6"/>`,
    antiparras: `<path d="M5,20 q19,-8 38,0 v10 q-9,6 -16,0 h-6 q-7,6 -16,0 z" fill="#B3E5FC" fill-opacity=".85" stroke="${OLi}" stroke-width="2"/><path d="M5,22 l-3,1 M43,22 l3,1" stroke="#455A64" stroke-width="3"/><path d="M10,22 l6,-2" stroke="#fff" stroke-width="1.8"/>`,
    bloqueador: `<rect x="15" y="12" width="18" height="30" rx="4" fill="#FB8C00" stroke="${OLi}" stroke-width="2"/><rect x="19" y="5" width="10" height="8" rx="2" fill="#fff" stroke="${OLi}" stroke-width="2"/><text x="24" y="28" font-size="8" font-weight="bold" text-anchor="middle" fill="#fff" font-family="Arial">FPS</text><text x="24" y="37" font-size="8" font-weight="bold" text-anchor="middle" fill="#fff" font-family="Arial">50+</text>`,
    anillo: `<circle cx="24" cy="29" r="11" fill="none" stroke="#FBC02D" stroke-width="5"/><circle cx="24" cy="29" r="11" fill="none" stroke="${OLi}" stroke-width="1" opacity=".4"/><path d="M18,14 l6,-7 l6,7 l-6,6 z" fill="#81D4FA" stroke="${OLi}" stroke-width="1.6"/>`,
    reloj: `<rect x="18" y="4" width="12" height="9" rx="2" fill="#5D4037"/><rect x="18" y="35" width="12" height="9" rx="2" fill="#5D4037"/><circle cx="24" cy="24" r="12" fill="#fff" stroke="${OLi}" stroke-width="2.4"/><path d="M24,24 v-7 M24,24 l5,3" stroke="${OLi}" stroke-width="2" stroke-linecap="round"/>`,
    pulsera: `<ellipse cx="24" cy="26" rx="15" ry="9" fill="none" stroke="#AB47BC" stroke-width="4"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i / 8 * 6.283; return `<circle cx="${(24 + 15 * Math.cos(a)).toFixed(1)}" cy="${(26 + 9 * Math.sin(a)).toFixed(1)}" r="3" fill="#CE93D8" stroke="${OLi}" stroke-width="1"/>`; }).join('')}`,
    sandalias: `<path d="M10,8 q8,-3 12,4 l3,28 q-1,5 -8,5 q-8,0 -9,-6 z" fill="#4FC3F7" stroke="${OLi}" stroke-width="2"/><path d="M11,18 q6,6 12,0" fill="none" stroke="#0277BD" stroke-width="3"/><path d="M27,12 q8,-3 12,4 l2,24 q-1,5 -7,5 q-7,0 -8,-6 z" fill="#4FC3F7" stroke="${OLi}" stroke-width="2"/><path d="M28,21 q6,6 11,0" fill="none" stroke="#0277BD" stroke-width="3"/>`,
    zapatillas: `<path d="M5,24 q2,-4 8,-4 l6,2 q6,4 12,5 l9,3 q4,2 4,6 v4 h-39 z" fill="#E3F2FD" stroke="${OLi}" stroke-width="2" stroke-linejoin="round"/><path d="M5,40 h39" stroke="#1565C0" stroke-width="3"/><path d="M14,26 l6,2 M16,30 l6,2" stroke="#1565C0" stroke-width="2"/><path d="M27,29 q6,2 14,6" stroke="#1565C0" stroke-width="2" fill="none"/>`,
    gorro_lana: `<path d="M9,32 Q8,12 24,11 Q40,12 39,32 Z" fill="#E91E63" stroke="${OLi}" stroke-width="2"/><rect x="7" y="30" width="34" height="8" rx="3" fill="#F48FB1" stroke="${OLi}" stroke-width="2"/><circle cx="24" cy="9" r="5" fill="#F8BBD0" stroke="${OLi}" stroke-width="1.6"/><path d="M14,20 v10 M20,16 v14 M28,16 v14 M34,20 v10" stroke="#C2185B" stroke-width="1.6"/>`,
    polera: `<path d="M15,6 q9,6 18,0 l3,3 q-2,6 3,9 v24 h-30 v-24 q5,-3 3,-9 z" fill="#FFB300" stroke="${OLi}" stroke-width="2" stroke-linejoin="round"/><path d="M18,10 q6,4 12,0" fill="none" stroke="${OLi}" stroke-width="1.4"/><path d="M12,30 h24" stroke="#fff" stroke-width="3"/>`
  };
  const icoSvg = k => { let v = ICO[k]; if (!v) { const m = String(k).match(/^(\w+)#(\w{6})$/); if (m && typeof ICO[m[1]] === 'function') v = ICO[m[1]]('#' + m[2]); }
    if (typeof v === 'function') v = v('#90A4AE'); return v ? `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">${v}</svg>` : ''; };
  window.SI_ICO = icoSvg;
  try { Object.assign(ICO, window.HT_ICO || {}); } catch (e) {}
  const SI_ACT = [
  ].concat((window.HT_ACT || []).map(a => Object.assign({ emp: TODAS }, a)));
  window.SI_ACT = SI_ACT;
  const actsDe = (tema, e) => SI_ACT.filter(a => a.tema === tema && a.emp.indexOf(e) >= 0).map(a => {
    const r = s => window.siTxt(s, e);
    const act = { tipo: a.tipo, cats: a.cats || ['✅ Así sí', '❌ Así no'], sub: a.sub || null, binario: !a.cats,
      items: a.tipo === 'orden' ? a.items.map(r) : a.items.map(x => [r(x[0]), x[1], x[2] ? r(x[2]) : '', x[3] || null, x[4] ? r(x[4]) : '']) };
    return { act, q: r(a.q), w: r(a.w), o: [''], a: 0, s: '' };
  });
  window.__siActsDe = actsDe;
  const mezclarA = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const escA = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const escena = ref => { const m = String(ref || '').match(/^([\w]+)(?::([LR]))?$/); if (!m || typeof S === 'undefined' || !S[m[1]]) return '';
    let v = ''; try { v = S[m[1]](); } catch (e) { return ''; }
    v = v.replace(/<circle[^>]*stroke="#fff" stroke-width="3"\/><path[^>]*\/>/g, '');
    if (m[2]) v = v.replace(/viewBox="0 0 320 200"/, m[2] === 'L' ? 'viewBox="0 0 160 200"' : 'viewBox="160 0 160 200"');
    return v; };
  function pintarAct(q) {
    const A = q.act, B = document.getElementById('qBody'); if (!B) return;
    let corr = '';
    if (A.tipo === 'orden') corr = A.items.map((t, i) => (i + 1) + ') ' + t).join(' · ');
    else if (A.tipo === 'clasifica' || A.tipo === 'tarjetas') corr = A.items.map(([t, c]) => t + ': ' + A.cats[c].replace(/^\S+\s/, '')).join(' · ');
    else corr = A.items.filter(x => x[1]).map(x => x[0]).join(' · ');
    const tit = { orden: 'Toca los pasos en el orden correcto (1, 2, 3...).', clasifica: 'Elige una opción para cada situación.', marca: 'Toca todas las que correspondan y después toca "Listo".',
      tarjetas: 'Desliza la tarjeta hacia el lado que corresponde, o toca el botón.', vestir: 'Toca o arrastra al trabajador lo que debe usar. ¡Ojo, hay cosas que no van!' }[A.tipo];
    let h = `<div class="siAct"><div class="acH">${tit}</div>`;
    if (A.tipo === 'orden') {
      let ord = mezclarA(A.items.map((t, i) => i)); if (ord.every((v, k) => v === k)) ord = ord.reverse();
      h += `<div class="acL">${ord.map(i => `<button class="acI" data-i="${i}"><span class="acN"></span><span>${escA(A.items[i])}</span></button>`).join('')}</div><button class="acR">↺ Borrar y empezar de nuevo</button>`;
    } else if (A.tipo === 'tarjetas') {
      const cl = A.binario ? ['tjSi', 'tjNo'] : ['tjA', 'tjB'];
      h += `<div class="tjW"><div class="tjP" id="tjP"></div><div class="tjStage" id="tjStage"></div>
        <div class="tjBt"><button class="tjK ${cl[1]}" data-k="1">${escA(A.cats[1])}${A.sub ? `<small>${escA(A.sub[1])}</small>` : ''}</button><button class="tjK ${cl[0]}" data-k="0">${escA(A.cats[0])}${A.sub ? `<small>${escA(A.sub[0])}</small>` : ''}</button></div></div>`;
    } else if (A.tipo === 'vestir') {
      h += `<div class="vsW"><div class="vsFig" id="vsFig"></div><div class="vsMsg" id="vsMsg">👆 Toca o arrastra cada cosa al trabajador</div>
        <div class="vsIt">${mezclarA(A.items.map((x, i) => i)).map(i => `<button class="vsC" data-i="${i}"><span class="vsE">${icoSvg(A.items[i][2])}</span><span>${escA(A.items[i][0])}</span></button>`).join('')}</div>
        <button class="acOk" id="vsOk">Listo, ya está preparado</button></div>`;
    } else if (A.tipo === 'clasifica') {
      h += `<div class="acL">${mezclarA(A.items.map((x, i) => i)).map(i => `<div class="acC" data-i="${i}"><div class="acCt">${escA(A.items[i][0])}</div><div class="acCb">${A.cats.map((c, k) => `<button class="acK" data-k="${k}">${escA(c)}</button>`).join('')}</div></div>`).join('')}</div>`;
    } else {
      h += `<div class="acL">${mezclarA(A.items.map((x, i) => i)).map(i => `<button class="acM" data-i="${i}"><span class="acX"></span><span>${escA(A.items[i][0])}</span></button>`).join('')}</div><button class="acOk" disabled>Listo</button>`;
    }
    h += `<div style="display:none"><button class="opt" data-ok="1" id="acBien">${escA(corr)}</button><button class="opt" data-ok="0" id="acTuya"></button></div></div>`;
    B.innerHTML = h;
    const enviar = (ok, tuya) => { const b = ok ? document.getElementById('acBien') : document.getElementById('acTuya'); if (!ok) b.textContent = tuya; answer(b, ok); };
    const retirar = () => { if (st.revisada) return; st.sel = null; const n = document.getElementById('qNext'); if (n) n.style.display = 'none'; };
    const bloqueado = () => !!st.revisada;
    if (A.tipo === 'orden') {
      let sel = [];
      const pintar = () => B.querySelectorAll('.acI').forEach(b => { const k = sel.indexOf(+b.dataset.i); b.classList.toggle('on', k >= 0); b.querySelector('.acN').textContent = k >= 0 ? k + 1 : ''; });
      B.querySelectorAll('.acI').forEach(b => b.onclick = () => { if (bloqueado()) return; const i = +b.dataset.i; if (sel.indexOf(i) >= 0) return; sel.push(i); pintar(); try { SFX.play('next'); } catch (e) {}
        if (sel.length === A.items.length) enviar(sel.every((v, k) => v === k), sel.map((i, k) => (k + 1) + ') ' + A.items[i]).join(' · ')); });
      B.querySelector('.acR').onclick = () => { if (bloqueado()) return; sel = []; pintar(); retirar(); };
    } else if (A.tipo === 'tarjetas') {
      const ord = mezclarA(A.items.map((x, i) => i)), resp = []; let pos = 0, ocupado = false;
      const stage = B.querySelector('#tjStage'), prog = B.querySelector('#tjP');
      const pintarP = () => { prog.innerHTML = ord.map((x, k) => `<span class="${k < pos ? (resp[k].ok ? 'ok' : 'mal') : k === pos ? 'act' : ''}"></span>`).join('') + `<b>${Math.min(pos + 1, ord.length)} de ${ord.length}</b>`; };
      const carta = () => {
        pintarP();
        if (pos >= ord.length) {
          const bien = resp.filter(x => x.ok).length;
          stage.innerHTML = `<div class="tjFin"><div class="tjE">${bien === ord.length ? '🏆' : '💪'}</div><div class="tjT">${bien === ord.length ? '¡Perfecto!' : '¡Terminaste!'}</div><div class="tjS">Acertaste ${bien} de ${ord.length}</div></div>`;
          B.querySelectorAll('.tjK').forEach(b => b.disabled = true);
          try { SFX.play(bien === ord.length ? 'win' : 'next'); } catch (e) {}
          enviar(bien === ord.length, resp.map(x => A.items[x.i][0] + ': ' + A.cats[x.k].replace(/^\S+\s/, '')).join(' · ')); return;
        }
        const it = A.items[ord[pos]];
        stage.innerHTML = `<div class="tjCard" id="tjCard"><div class="tjL tjLi">${escA(A.cats[1])}</div><div class="tjL tjLd">${escA(A.cats[0])}</div><div class="tjI">${escena(it[2])}</div><div class="tjT">${escA(it[0])}</div><div class="tjH">⬅ desliza ➡</div></div><div class="tjFb" id="tjFb"></div>`;
        const c = stage.querySelector('#tjCard'); let x0 = null, dx = 0;
        c.onpointerdown = ev => { if (bloqueado() || ocupado) return; x0 = ev.clientX; dx = 0; c.setPointerCapture(ev.pointerId); c.style.transition = 'none'; };
        c.onpointermove = ev => { if (x0 === null) return; dx = ev.clientX - x0; c.style.transform = `translateX(${dx}px) rotate(${dx / 14}deg)`;
          c.querySelector('.tjLd').style.opacity = Math.max(0, Math.min(1, dx / 90)); c.querySelector('.tjLi').style.opacity = Math.max(0, Math.min(1, -dx / 90)); };
        c.onpointerup = c.onpointercancel = () => { if (x0 === null) return; x0 = null; c.style.transition = '';
          if (dx > 80) decidir(0); else if (dx < -80) decidir(1); else { c.style.transform = ''; c.querySelectorAll('.tjL').forEach(l => l.style.opacity = 0); } };
      };
      const decidir = k => {
        if (bloqueado() || ocupado || pos >= ord.length) return; ocupado = true;
        const it = A.items[ord[pos]], ok = it[1] === k; resp.push({ i: ord[pos], k, ok });
        const c = stage.querySelector('#tjCard'), fb = stage.querySelector('#tjFb');
        if (c) { c.style.transition = 'transform .32s ease, opacity .32s ease'; c.style.transform = `translateX(${k === 0 ? 420 : -420}px) rotate(${k === 0 ? 24 : -24}deg)`; c.style.opacity = '0'; }
        fb.className = 'tjFb on ' + (ok ? 'ok' : 'mal'); fb.innerHTML = ok ? '✔ ¡Bien!' : `✘ Era: ${escA(A.cats[it[1]])}`;
        try { SFX.play(ok ? 'ok' : 'bad'); } catch (e) {}
        setTimeout(() => { pos++; ocupado = false; carta(); }, ok ? 750 : 1500);
      };
      B.querySelectorAll('.tjK').forEach(b => b.onclick = () => decidir(+b.dataset.k));
      carta();
    } else if (A.tipo === 'vestir') {
      const fig = B.querySelector('#vsFig'), msg = B.querySelector('#vsMsg'), puestos = [], malos = [];
      let ropa = { helmet: false, cofia: false, mask: false, shirt: '#90A4AE', pants: '#546E7A', boots: false, apron: false, gloves: false, glasses: false, hat: '', s: 2.2 };
      const nOk = A.items.filter(x => x[1]).length;
      const dibujar = pop => { let g = ''; try { g = W(100, 206, Object.assign({}, ropa, { face: puestos.length === nOk ? 'ok' : 'ok' })); } catch (e) {}
        fig.innerHTML = `<svg viewBox="0 0 200 215" xmlns="http://www.w3.org/2000/svg"><ellipse cx="100" cy="208" rx="70" ry="6" fill="#000" opacity=".12"/><g class="${pop ? 'vsPop' : ''}">${g}</g></svg><div class="vsCnt">${puestos.length} de ${nOk}</div>`; };
      const fin = () => { const ok = !malos.length && puestos.length === nOk;
        B.querySelectorAll('.vsC').forEach(b => b.disabled = true); B.querySelector('#vsOk').disabled = true;
        enviar(ok, 'Puso: ' + (puestos.map(i => A.items[i][0]).join(', ') || 'nada') + (malos.length ? ' · También eligió: ' + malos.map(i => A.items[i][0]).join(', ') : '')); };
      const poner = b => {
        if (bloqueado() || b.disabled) return; const i = +b.dataset.i, it = A.items[i];
        if (it[1]) { Object.assign(ropa, it[3] || {}); puestos.push(i); b.classList.add('ok'); b.disabled = true; dibujar(true);
          msg.className = 'vsMsg ok'; msg.textContent = '✔ ¡Bien! ' + it[0] + (puestos.length < nOk ? '. ¿Qué más le falta?' : ''); try { SFX.play('ok'); } catch (e) {}
          if (puestos.length === nOk) { msg.textContent = malos.length ? '✔ Quedó protegido, pero ojo con lo que no va.' : '🎉 ¡Listo! Quedó bien protegido.'; setTimeout(fin, 500); } }
        else { malos.push(i); b.classList.add('mal'); b.disabled = true; msg.className = 'vsMsg mal'; msg.textContent = '✘ Eso no va. ' + (it[4] || ''); try { SFX.play('bad'); } catch (e) {} }
      };
      B.querySelectorAll('.vsC').forEach(b => {
        let x0 = null, y0 = 0, ghost = null;
        b.onpointerdown = ev => { if (bloqueado() || b.disabled) return; x0 = ev.clientX; y0 = ev.clientY; b.setPointerCapture(ev.pointerId); };
        b.onpointermove = ev => { if (x0 === null) return; if (!ghost && Math.hypot(ev.clientX - x0, ev.clientY - y0) > 10) { ghost = document.createElement('div'); ghost.className = 'vsG'; ghost.innerHTML = b.querySelector('.vsE').innerHTML; document.body.appendChild(ghost); }
          if (ghost) { ghost.style.left = ev.clientX + 'px'; ghost.style.top = ev.clientY + 'px'; const r = fig.getBoundingClientRect(); fig.classList.toggle('sobre', ev.clientX > r.left && ev.clientX < r.right && ev.clientY > r.top && ev.clientY < r.bottom); } };
        b.onpointerup = ev => { if (x0 === null) return; x0 = null; fig.classList.remove('sobre');
          if (ghost) { ghost.remove(); ghost = null; const r = fig.getBoundingClientRect(); if (ev.clientX > r.left && ev.clientX < r.right && ev.clientY > r.top && ev.clientY < r.bottom) poner(b); } else poner(b); };
        b.onpointercancel = () => { x0 = null; if (ghost) { ghost.remove(); ghost = null; } fig.classList.remove('sobre'); };
        b.onclick = ev => ev.preventDefault();
      });
      B.querySelector('#vsOk').onclick = () => { if (bloqueado()) return; fin(); };
      dibujar(false);
    } else if (A.tipo === 'clasifica') {
      const resp = {};
      B.querySelectorAll('.acC').forEach(c => c.querySelectorAll('.acK').forEach(k => k.onclick = () => { if (bloqueado()) return;
        resp[c.dataset.i] = +k.dataset.k; c.querySelectorAll('.acK').forEach(x => x.classList.toggle('on', x === k)); try { SFX.play('next'); } catch (e) {}
        if (Object.keys(resp).length === A.items.length) enviar(A.items.every((x, i) => resp[i] === x[1]), A.items.map((x, i) => x[0] + ': ' + A.cats[resp[i]]).join(' · ')); }));
    } else {
      const ok = B.querySelector('.acOk');
      B.querySelectorAll('.acM').forEach(b => b.onclick = () => { if (bloqueado()) return; b.classList.toggle('on'); b.querySelector('.acX').textContent = b.classList.contains('on') ? '✓' : ''; ok.disabled = !B.querySelector('.acM.on'); retirar(); try { SFX.play('next'); } catch (e) {} });
      ok.onclick = () => { if (bloqueado()) return; const m = [...B.querySelectorAll('.acM.on')].map(b => +b.dataset.i);
        enviar(A.items.every((x, i) => !!x[1] === (m.indexOf(i) >= 0)), m.length ? m.map(i => A.items[i][0]).join(' · ') : '(nada marcado)'); };
    }
  }
  if (typeof renderQ === 'function' && !renderQ.__siAct) {
    const RQ = renderQ;
    renderQ = function () { const r = RQ.apply(this, arguments); try { const q = st.topic.quiz[st.qi]; if (q && q.act) pintarAct(q); } catch (e) {} return r; };
    renderQ.__siAct = true;
  }
  const cssA = document.createElement('style');
  cssA.textContent = `.siAct .acH{background:#FFF6DA;color:#3B2F00;border-left:5px solid #F2B33D;border-radius:10px;padding:9px 12px;font-size:15px;margin:4px 0 12px}
.siAct .acL{display:flex;flex-direction:column;gap:9px}
.siAct .acI,.siAct .acM{display:flex;align-items:center;gap:12px;text-align:left;background:var(--dark2);color:#fff;border:2px solid var(--line);border-radius:14px;padding:13px;font:inherit;font-size:16px;line-height:1.3;cursor:pointer}
.siAct .acN,.siAct .acX{flex:0 0 34px;height:34px;border-radius:50%;border:2px dashed #ffffff66;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:17px}
.siAct .acI.on,.siAct .acM.on{border-color:#F2B33D;background:#22406E}.siAct .acI.on .acN,.siAct .acM.on .acX{background:#F2B33D;color:#0B2457;border:2px solid #F2B33D}
.siAct .acR{margin-top:10px;background:none;border:none;color:#BBD0F2;text-decoration:underline;font:inherit;font-size:15px;cursor:pointer;align-self:center;width:100%}
.siAct .acC{background:var(--dark2);border:2px solid var(--line);border-radius:14px;padding:11px}.siAct .acCt{color:#fff;font-size:16px;margin-bottom:8px;line-height:1.3}
.siAct .acCb{display:grid;grid-template-columns:1fr 1fr;gap:8px}.siAct .acK{background:#ffffff14;color:#fff;border:2px solid #ffffff40;border-radius:10px;padding:10px 6px;font:inherit;font-size:14px;font-weight:bold;cursor:pointer}
.siAct .acK.on{background:#F2B33D;border-color:#F2B33D;color:#0B2457}
.siAct .acOk{margin-top:12px;width:100%;background:#F2B33D;color:#0B2457;border:none;border-radius:14px;padding:14px;font:inherit;font-size:17px;font-weight:bold;cursor:pointer}.siAct .acOk:disabled{opacity:.45;cursor:default}
.siAct button:disabled{cursor:default}`;
  document.head.appendChild(cssA);
  const cssT = document.createElement('style');
  cssT.textContent = `.tjW{display:flex;flex-direction:column;gap:12px}.tjP{display:flex;align-items:center;gap:6px;justify-content:center}.tjP span{width:12px;height:12px;border-radius:50%;background:#ffffff33}
.tjP span.act{background:#F2B33D;transform:scale(1.25)}.tjP span.ok{background:#43A047}.tjP span.mal{background:#E53935}.tjP b{color:#BBD0F2;font-size:13px;margin-left:6px}
.tjStage{position:relative;height:330px;display:flex;align-items:center;justify-content:center;overflow:hidden}
.tjCard{position:relative;width:92%;max-width:340px;height:300px;overflow:hidden;background:#fff;color:#1F2937;border-radius:22px;box-shadow:0 10px 26px rgba(0,0,0,.35);display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:0 0 26px;text-align:center;touch-action:none;user-select:none;cursor:grab;transition:transform .25s}
.tjCard .tjI{width:100%;height:190px;background:#EEF2F6;display:flex;align-items:center;justify-content:center;overflow:hidden;pointer-events:none}.tjCard .tjI svg{height:100%;width:auto;max-width:100%}.tjCard .tjT{font-size:17px;font-weight:bold;margin:12px 14px 0;line-height:1.25}.tjCard .tjH{position:absolute;bottom:10px;font-size:12px;color:#9AA5B4;letter-spacing:1px}
.tjL{position:absolute;top:14px;padding:4px 10px;border-radius:8px;font-weight:bold;font-size:15px;opacity:0;border:3px solid;background:#fff;z-index:2}.tjLd{left:14px;color:#2E7D32;border-color:#2E7D32;transform:rotate(-12deg)}.tjLi{right:14px;color:#C62828;border-color:#C62828;transform:rotate(12deg)}
.tjFb{position:absolute;bottom:2px;z-index:3;left:50%;transform:translateX(-50%) scale(.8);opacity:0;padding:8px 16px;border-radius:20px;font-weight:bold;font-size:16px;transition:all .2s;white-space:nowrap}.tjFb.on{opacity:1;transform:translateX(-50%) scale(1)}
.tjFb.ok{background:#43A047;color:#fff}.tjFb.mal{background:#E53935;color:#fff}
.tjFin{background:#fff;color:#1F2937;border-radius:22px;padding:26px 20px;text-align:center;width:88%;max-width:330px;box-shadow:0 10px 26px rgba(0,0,0,.35)}.tjFin .tjE{font-size:60px}.tjFin .tjT{font-size:22px;font-weight:800;color:#12357F;margin-top:6px}.tjFin .tjS{font-size:16px;margin-top:4px}
.tjBt{display:grid;grid-template-columns:1fr 1fr;gap:10px}.tjK{border:none;border-radius:16px;padding:14px 8px;font:inherit;font-size:17px;font-weight:bold;color:#fff;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:2px;box-shadow:0 4px 0 rgba(0,0,0,.25)}
.tjK small{font-size:12px;font-weight:normal;opacity:.9}.tjK:active{transform:translateY(2px);box-shadow:0 2px 0 rgba(0,0,0,.25)}.tjK:disabled{opacity:.45}
.tjSi{background:#2E7D32}.tjNo{background:#C62828}.tjA{background:#EF6C00}.tjB{background:#1565C0}
.vsW{display:flex;flex-direction:column;gap:10px}.vsFig{position:relative;background:radial-gradient(circle at 50% 40%,#ffffff 0,#E8EEF7 70%);border:3px dashed #ffffff55;border-radius:20px;height:240px;display:flex;justify-content:center;transition:border-color .2s,background .2s}
.vsFig.sobre{border-color:#F2B33D;background:radial-gradient(circle at 50% 40%,#FFF8E1 0,#FFE9A8 70%)}.vsFig svg{height:100%;width:auto}.vsCnt{position:absolute;top:8px;right:10px;background:#12357F;color:#fff;font-weight:bold;font-size:13px;border-radius:12px;padding:3px 10px}
.vsPop{animation:vsPop .45s ease}@keyframes vsPop{0%{transform:scale(1)}40%{transform:scale(1.05)}100%{transform:scale(1)}}.vsPop{transform-origin:100px 200px}
.vsMsg{min-height:44px;background:#ffffff14;color:#fff;border-radius:12px;padding:10px 12px;font-size:15px;text-align:center;line-height:1.3}.vsMsg.ok{background:#E8F5E9;color:#1B5E20;font-weight:bold}.vsMsg.mal{background:#FFEBEE;color:#B71C1C;font-weight:bold}
.vsIt{display:grid;grid-template-columns:1fr 1fr;gap:8px}.vsC{display:flex;align-items:center;gap:8px;background:var(--dark2);color:#fff;border:2px solid var(--line);border-radius:14px;padding:10px;font:inherit;font-size:14px;text-align:left;line-height:1.2;cursor:grab;touch-action:none;user-select:none}
.vsC .vsE{flex:none;width:44px;height:44px;background:#fff;border-radius:12px;padding:4px;box-sizing:border-box;display:flex}.vsC .vsE svg{width:100%;height:100%}.vsC.ok{background:#E8F5E9;color:#1B5E20;border-color:#43A047}.vsC.mal{background:#FFEBEE;color:#B71C1C;border-color:#E53935;text-decoration:line-through}
.vsG{position:fixed;z-index:9999;width:64px;height:64px;background:#fff;border-radius:16px;padding:6px;box-sizing:border-box;pointer-events:none;transform:translate(-50%,-60%);filter:drop-shadow(0 4px 6px rgba(0,0,0,.4))}`;
  document.head.appendChild(cssT);

  // ---------- 9d) Aviso antes de la evaluación: no se entra "en seco" a la prueba
  if (typeof startQuiz === 'function' && !startQuiz.__siAviso) {
    const SQ = startQuiz;
    const cssE = document.createElement('style');
    cssE.textContent = `#siEval{display:none;position:fixed;inset:0;background:rgba(6,18,45,.78);z-index:9998;align-items:center;justify-content:center;padding:18px}
#siEval.on{display:flex}#siEval .seBox{background:#fff;color:#1F2937;border-radius:20px;max-width:390px;width:100%;padding:22px 20px;text-align:center;border-top:8px solid #F2B33D;box-shadow:0 10px 30px rgba(0,0,0,.35)}
#siEval .seIc{font-size:44px;line-height:1}#siEval h3{margin:8px 0 4px;font-size:22px;color:#12357F}#siEval .seT{font-size:14px;color:#4A5664;margin-bottom:12px}
#siEval ul{list-style:none;padding:0;margin:0 0 14px;text-align:left;display:flex;flex-direction:column;gap:8px}
#siEval li{display:flex;gap:10px;align-items:flex-start;background:#F4F7FC;border-radius:12px;padding:9px 11px;font-size:15px;line-height:1.35}#siEval li b{color:#12357F}
#siEval .seGo{width:100%;background:#12357F;color:#fff;border:none;border-radius:14px;padding:15px;font:inherit;font-size:17px;font-weight:bold;cursor:pointer}
#siEval .seRep{width:100%;background:none;border:none;color:#12357F;text-decoration:underline;font:inherit;font-size:15px;margin-top:10px;cursor:pointer}`;
    document.head.appendChild(cssE);
    startQuiz = function () {
      const args = arguments, self = this;
      const conNota = st.mode !== 'ds44' && !st.repaso;
      if (!conNota) return SQ.apply(self, args);
      const T = st.topic.__base || st.topic, n = (T.quiz || []).length, conAct = (T.quiz || []).filter(q => q.act).length;
      let m = document.getElementById('siEval'); if (!m) { m = document.createElement('div'); m.id = 'siEval'; document.body.appendChild(m); }
      m.innerHTML = `<div class="seBox"><div class="seIc">📝</div><h3>Ahora viene la evaluación</h3><div class="seT">${T.title}</div>
        <ul><li>❓<span>Vas a responder <b>${n} preguntas</b> sobre lo que acabas de ver.</span></li>
        <li>⭐<span>Para aprobar necesitas <b>todas correctas</b> (nota 7,0).</span></li>
        ${conAct ? `<li>🧩<span>${conAct > 1 ? conAct + ' de ellas son <b>actividades</b>' : 'Una de ellas es una <b>actividad</b>'}: lee bien las instrucciones antes de tocar.</span></li>` : ''}
        <li>⏳<span>Lee con calma. Puedes cambiar tu respuesta antes de pasar a la siguiente.</span></li>
        <li>🔁<span>Si no apruebas, repasas las láminas y vuelves a intentarlo, con preguntas distintas.</span></li></ul>
        <button class="seGo" id="seGo">Comenzar la evaluación</button><button class="seRep" id="seRep">Prefiero repasar las láminas primero</button></div>`;
      m.className = 'on';
      try { VOZ.say(`Ahora viene la evaluación. Vas a responder ${n} preguntas. Para aprobar necesitas todas correctas. Lee con calma y toca comenzar.`); } catch (e) {}
      document.getElementById('seGo').onclick = () => { m.className = ''; try { VOZ.stop && VOZ.stop(); } catch (e) {} SQ.apply(self, args); };
      document.getElementById('seRep').onclick = () => { m.className = ''; try { VOZ.stop && VOZ.stop(); } catch (e) {} try { startLearn(); } catch (e) {} };
    };
    startQuiz.__siAviso = true;
  }

  // ---------- 10) Al cargar: empresa de la sesión guardada (o grupo, si nadie ha ingresado)
  try {
    const g = JSON.parse(localStorage.getItem('hsl_cap_ruta') || 'null');
    const e = (RUTA && RUTA.persona && empDe(RUTA.persona)) || (g && g.persona && empDe(g.persona)) || '';
    construir('ali');
    if (typeof renderHome === 'function' && document.getElementById('secciones')) renderHome();
  } catch (e) { try { construir('ali'); } catch (e2) {} }
})();

// 9e) Imagen de la evaluación: sin restos de globos (la colita queda suelta al ocultar el rótulo).
// Si el dibujo queda sin sentido al quitarle los rótulos, no se muestra.
(function () {
  try {
    if (typeof renderQ !== 'function' || renderQ.__siQi) return;
    const SIN_IMG = new Set(window.HT_SIN_IMG || []);
    const oculto = el => el && el.style && el.style.display === 'none';
    const pulir = () => { try {
      const q = st.topic && st.topic.quiz && st.topic.quiz[st.qi]; const box = document.querySelector('#qBody .qimg');
      if (!box || !q || q.act) return;
      if (SIN_IMG.has(q.s)) { box.style.display = 'none'; return; }
      const svg = box.querySelector('svg'); if (!svg) return;
      // la colita del globo (queda suelta cuando se oculta el globo)
      const blanco = el => /^(#fff|#ffffff|white)$/i.test(el.getAttribute('fill') || '');
      svg.querySelectorAll('rect').forEach(r => { if (!oculto(r)) return; const n = r.nextElementSibling;
        if (!(n && n.tagName === 'path' && blanco(n) && /^M[\d.]+,[\d.]+ l/.test(n.getAttribute('d') || ''))) return;
        n.style.display = 'none'; const c = n.nextElementSibling;   // y el parche blanco que une la colita con el globo
        if (c && c.tagName === 'rect' && blanco(c) && !c.getAttribute('rx') && +c.getAttribute('width') <= 20 && +c.getAttribute('height') <= 6) c.style.display = 'none'; });
    } catch (e) {} };
    const R0 = renderQ;
    renderQ = function () { const v = R0.apply(this, arguments); pulir(); return v; };
    Object.keys(R0).forEach(k => { try { renderQ[k] = R0[k]; } catch (e) {} });
    renderQ.__siQi = true;
  } catch (e) {}
})();
