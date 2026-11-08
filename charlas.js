/* Charlas Maestranza ALI · inducción, Para todos y áreas de la maestranza. Armado: 07-11-2026 */
/* ---- 00_dibujos.js ---- */
// ===== Maestranza ALI · fondos y objetos comunes para los dibujos de las charlas =====
// Lienzo 320 x 200. Piso a la altura y = 165 (las personas W(x,165,...) miden ~85 de alto con s = 1 = 1,70 m; 1 metro ≈ 50 unidades).
// Uso: const H = window.HD;  H.CSS + H.fondo.taller() + H.torno(30,165) + W(200,165,{area:'taller', pose:'point'})
window.SI_CONT = window.SI_CONT || { temas: [] };
window.HD = window.HD || {};
(function (H) {
  const T = (x, y, s, size = 12, c = '#263238', a = 'middle', w = 'bold') => `<text x="${x}" y="${y}" font-size="${size}" font-weight="${w}" text-anchor="${a}" fill="${c}" font-family="Arial">${s}</text>`;
  H.T = T;
  let K = 0; const uid = p => 'hd' + p + (K++);
  // rótulo tipo píldora (texto blanco)
  H.pill = (cx, y, t, c = '#263238', fs = 11) => { const w = Math.round(t.length * fs * 0.6 + 16); cx = Math.max(w / 2 + 3, Math.min(317 - w / 2, cx)); return `<rect x="${cx - w / 2}" y="${y}" width="${w}" height="${fs + 9}" rx="${(fs + 9) / 2}" fill="${c}"/>` + T(cx, y + fs + 2, t, fs, '#fff'); };
  // ---------------- FONDOS ----------------
  const piso = (c1, c2, y = 165) => `<rect y="${y}" width="320" height="${200 - y}" fill="${c1}"/><rect y="${y}" width="320" height="3" fill="#000" opacity=".08"/>` + (c2 ? [0, 1, 2, 3, 4, 5, 6, 7].map(i => `<line x1="${i * 46}" y1="${y}" x2="${i * 46 - 22}" y2="200" stroke="${c2}" stroke-width="1.3"/>`).join('') : '');
  const pared = (c, y = 165) => `<rect width="320" height="${y}" fill="${c}"/>`;
  const zocalo = (c = '#8D6E63', y = 165) => `<rect y="${y - 6}" width="320" height="6" fill="${c}"/>`;
  const ventana = (x, y, w = 70, h = 54, cielo = '#BBDEFB') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${cielo}" stroke="#ECEFF1" stroke-width="4"/><line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" stroke="#ECEFF1" stroke-width="3"/><path d="M${x + 4},${y + h - 4} q${w * .3},${-h * .45} ${w - 8},${-h * .3}" stroke="#81C784" stroke-width="6" fill="none" opacity=".7"/>`;
  H.ventana = ventana;


  // ---------------- FONDOS DE MAESTRANZA ALI ----------------
  // Galpón: columnas metálicas (perfil I), cerchas en el techo, ventanales altos, piso de hormigón con vía peatonal amarilla.
  const columna = x => `<rect x="${x - 6}" y="22" width="12" height="143" fill="#78909C"/><rect x="${x - 9}" y="22" width="18" height="4" fill="#607D8B"/><rect x="${x - 9}" y="161" width="18" height="4" fill="#607D8B"/><rect x="${x - 2}" y="26" width="4" height="135" fill="#546E7A"/>`;
  const cercha = () => `<rect width="320" height="22" fill="#B0BEC5"/><path d="M0,22 h320" stroke="#607D8B" stroke-width="3"/><path d="M0,4 h320" stroke="#607D8B" stroke-width="2"/>` + [0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M${i * 40},22 l20,-18 l20,18" stroke="#78909C" stroke-width="1.6" fill="none"/>`).join('');
  const ventanal = (x, w = 66) => `<rect x="${x}" y="30" width="${w}" height="26" fill="#CFE8F7" stroke="#90A4AE" stroke-width="2"/>${[1, 2].map(i => `<line x1="${x + w * i / 3}" y1="30" x2="${x + w * i / 3}" y2="56" stroke="#90A4AE" stroke-width="1.5"/>`).join('')}`;
  const pisoTaller = (vias = true) => `<rect y="165" width="320" height="35" fill="#9EA7AD"/><rect y="165" width="320" height="3" fill="#000" opacity=".1"/>${[0, 1, 2, 3, 4, 5, 6].map(i => `<line x1="${i * 54 + 10}" y1="170" x2="${i * 54 - 4}" y2="200" stroke="#8C959B" stroke-width="1"/>`).join('')}`
    + (vias ? `<rect y="190" width="320" height="4" fill="#FFC20E"/>` : '');
  H.pisoTaller = pisoTaller;
  H.fondo = {
    // interior del taller (galpón)
    taller: (o = {}) => `<rect width="320" height="165" fill="#DCE3E8"/>` + `<rect y="96" width="320" height="69" fill="#CFD8DC"/>` + cercha() + ventanal(40) + ventanal(214) + columna(12) + columna(160) + columna(308) + pisoTaller(o.vias !== false),
    // taller de soldadura: muro más oscuro, cortina roja de soldadura al fondo
    soldadura: () => `<rect width="320" height="165" fill="#C9D1D6"/>` + cercha() + columna(12) + columna(308) + `<rect x="196" y="70" width="96" height="95" fill="#C62828" opacity=".55"/>${[0, 1, 2, 3, 4].map(i => `<line x1="${204 + i * 20}" y1="70" x2="${204 + i * 20}" y2="165" stroke="#8E0000" stroke-width="1.5" opacity=".6"/>`).join('')}<rect x="194" y="66" width="100" height="5" fill="#455A64"/>` + pisoTaller(false),
    // patio exterior frente al galpón de Maestranza ALI
    patio: () => { const k = uid('cielo'); return `<defs><linearGradient id="${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#90CAF9"/><stop offset="1" stop-color="#E3F2FD"/></linearGradient></defs><rect width="320" height="200" fill="url(#${k})"/>`
      + `<path d="M20,150 V58 L150,30 L280,58 V150 Z" fill="#B0BEC5" stroke="#78909C" stroke-width="2"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => `<line x1="${30 + i * 20}" y1="${i < 7 ? 56 - i * 3.8 : 56 - (12 - i) * 3.8}" x2="${30 + i * 20}" y2="150" stroke="#9EAAB1" stroke-width="1.4"/>`).join('')}`
      + `<rect x="20" y="62" width="260" height="14" fill="#E8423A"/>` + T(150, 73, 'MAESTRANZA ALI', 11, '#fff') + `<rect x="104" y="92" width="92" height="58" fill="#546E7A"/>${[0, 1, 2, 3, 4, 5].map(i => `<line x1="104" y1="${100 + i * 9}" x2="196" y2="${100 + i * 9}" stroke="#455A64" stroke-width="2"/>`).join('')}`
      + `<rect y="150" width="320" height="50" fill="#A1A1A1"/><rect y="150" width="320" height="3" fill="#000" opacity=".1"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<circle cx="${i * 44 + 14}" cy="${170 + (i % 3) * 9}" r="1.6" fill="#7A7A7A"/>`).join('')}`; },
    // faena de un cliente: planta industrial al aire libre (estanques, estructuras, ripio)
    faena: () => { const k = uid('cielo'); return `<defs><linearGradient id="${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#81D4FA"/><stop offset="1" stop-color="#E1F5FE"/></linearGradient></defs><rect width="320" height="200" fill="url(#${k})"/>`
      + `<rect x="18" y="58" width="58" height="102" rx="4" fill="#CFD8DC" stroke="#90A4AE" stroke-width="2"/><ellipse cx="47" cy="58" rx="29" ry="7" fill="#B0BEC5"/><rect x="84" y="80" width="40" height="80" rx="3" fill="#ECEFF1" stroke="#90A4AE" stroke-width="2"/>`
      + `<path d="M150,160 V44 M210,160 V44 M150,44 H210 M150,84 H210 M150,124 H210 M150,44 L210,84 M210,84 L150,124" stroke="#F9A825" stroke-width="4" fill="none"/><path d="M230,160 V96 h70 v64" fill="#90A4AE" stroke="#607D8B" stroke-width="2"/><rect x="240" y="108" width="20" height="14" fill="#CFE8F7"/><rect x="270" y="108" width="20" height="14" fill="#CFE8F7"/>`
      + `<rect y="160" width="320" height="40" fill="#BCAAA4"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<circle cx="${i * 38 + 12}" cy="${174 + (i % 3) * 8}" r="2" fill="#8D6E63"/>`).join('')}`; },
    // oficina administrativa
    oficina: () => pared('#F3EDE2') + ventana(226, 22, 76, 58) + zocalo('#A1825A') + piso('#C8A97E', '#B08E60'),
    // bodega de materiales y repuestos: estanterías metálicas con piezas
    bodega: () => `<rect width="320" height="165" fill="#E0E4E7"/>` + cercha() + [16, 116, 216].map(x => `<rect x="${x}" y="40" width="4" height="125" fill="#E8423A"/><rect x="${x + 84}" y="40" width="4" height="125" fill="#E8423A"/>${[0, 1, 2].map(i => `<rect x="${x}" y="${70 + i * 34}" width="88" height="4" fill="#78909C"/><rect x="${x + 8}" y="${58 + i * 34}" width="22" height="12" fill="#8D6E63"/><rect x="${x + 36}" y="${60 + i * 34}" width="16" height="10" rx="2" fill="#90A4AE"/><circle cx="${x + 66}" cy="${63 + i * 34}" r="7" fill="#607D8B" stroke="#455A64" stroke-width="2"/>`).join('')}`).join('') + pisoTaller(true),
    // cabina cerrada (granallado o pintura): muros de plancha, luces arriba, rejilla en el piso
    cabina: (tipo = 'granallado') => `<rect width="320" height="165" fill="${tipo === 'pintura' ? '#E3E7EA' : '#8D9AA2'}"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<line x1="${i * 42 + 20}" y1="0" x2="${i * 42 + 20}" y2="165" stroke="#000" stroke-width="1" opacity=".08"/>`).join('')}<rect x="40" y="6" width="60" height="8" rx="3" fill="#FFF9C4"/><rect x="220" y="6" width="60" height="8" rx="3" fill="#FFF9C4"/>`
      + `<rect y="165" width="320" height="35" fill="${tipo === 'pintura' ? '#B0BEC5' : '#6D7B83'}"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(i => `<line x1="${i * 20 + 6}" y1="168" x2="${i * 20 + 6}" y2="200" stroke="#000" stroke-width="1" opacity=".15"/>`).join('')}`,
    // fondo liso para íconos y comparaciones
    liso: (c = '#EEF2F5') => `<rect width="320" height="200" fill="${c}"/>`
  };

  // ---------------- OBJETOS COMUNES ----------------
  // letrero "piso mojado" (caballete amarillo)
  H.letreroMojado = (x, y = 165, s = 1) => `<path d="M${x - 14 * s},${y} l${10 * s},${-46 * s} h${8 * s} l${10 * s},${46 * s}" fill="#FFC20E" stroke="#8D6E00" stroke-width="1.5"/><path d="M${x - 6 * s},${y - 26 * s} l${6 * s},${-11 * s} l${6 * s},${11 * s}z" fill="#263238"/><rect x="${x - 2 * s}" y="${y - 20 * s}" width="${4 * s}" height="${3 * s}" fill="#263238"/>`;
  // charco de agua
  H.charco = (x, y = 172, rx = 34, c = '#4FC3F7') => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * .2}" fill="${c}" opacity=".7"/><ellipse cx="${x - rx * .3}" cy="${y - 1}" rx="${rx * .25}" ry="${rx * .06}" fill="#fff" opacity=".6"/>`;
  // extintor PQS (o CO2) apoyado o colgado; y = base
  H.extintor = (x, y, k = 'PQS', s = 1) => `<rect x="${x}" y="${y - 52 * s}" width="${22 * s}" height="${52 * s}" rx="${8 * s}" fill="#D32F2F" stroke="#8E0000" stroke-width="1.2"/><rect x="${x + 6 * s}" y="${y - 60 * s}" width="${10 * s}" height="${9 * s}" fill="#37474F"/><path d="M${x + 16 * s},${y - 58 * s} h${10 * s} l${4 * s},${4 * s}" stroke="#263238" stroke-width="${2.5 * s}" fill="none"/><rect x="${x + 3 * s}" y="${y - 40 * s}" width="${16 * s}" height="${18 * s}" fill="#fff"/>` + T(x + 11 * s, y - 27 * s, k === 'CO2' ? 'CO₂' : 'PQS', 7 * s, '#263238') + `<path d="M${x + 2 * s},${y - 50 * s} q${-10 * s},${10 * s} ${-8 * s},${30 * s}" stroke="#263238" stroke-width="${2.5 * s}" fill="none"/>`;
  // bidón / botella de producto químico con etiqueta y pictograma
  H.bidon = (x, y, c = '#1E88E5', label = 'CLORO', s = 1) => `<path d="M${x},${y} v${-40 * s} q0,${-6 * s} ${6 * s},${-8 * s} h${10 * s} v${-6 * s} h${8 * s} v${6 * s} q${8 * s},${2 * s} ${8 * s},${8 * s} v${40 * s}z" fill="${c}" stroke="#263238" stroke-width="1.2"/><rect x="${x + 4 * s}" y="${y - 30 * s}" width="${24 * s}" height="${16 * s}" fill="#fff"/>` + T(x + 16 * s, y - 19 * s, label, 6.5 * s, '#263238') + `<path d="M${x + 16 * s},${y - 12 * s} l${5 * s},${5 * s} l${-5 * s},${5 * s} l${-5 * s},${-5 * s}z" fill="#fff" stroke="#D32F2F" stroke-width="1"/>`;
  // escala de tijera (mantención): x = pata izquierda, y = piso, h alto
  H.escala = (x, y, h = 100) => { let g = `<line x1="${x}" y1="${y}" x2="${x + 18}" y2="${y - h}" stroke="#90A4AE" stroke-width="4"/><line x1="${x + 40}" y1="${y}" x2="${x + 22}" y2="${y - h}" stroke="#78909C" stroke-width="4"/><rect x="${x + 14}" y="${y - h - 4}" width="12" height="6" rx="2" fill="#546E7A"/>`;
    for (let i = 1; i < 6; i++) { const k = i / 6, yy = y - h * k; g += `<line x1="${(x + 18 * k).toFixed(1)}" y1="${yy.toFixed(1)}" x2="${(x + 40 - 18 * k).toFixed(1)}" y2="${yy.toFixed(1)}" stroke="#607D8B" stroke-width="3"/>`; }
    return g; };
  // ✓ / ✗ (la píldora redonda que se usa en las láminas)
  H.ok = (x, y, bien = true, r = 15) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${bien ? '#2E7D32' : '#D7262B'}" stroke="#fff" stroke-width="3"/>` + (bien ? `<path d="M${x - r * .45},${y} l${r * .3},${r * .32} l${r * .6},${-r * .62}" stroke="#fff" stroke-width="${r * .22}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : `<path d="M${x - r * .38},${y - r * .38} l${r * .76},${r * .76} M${x + r * .38},${y - r * .38} l${-r * .76},${r * .76}" stroke="#fff" stroke-width="${r * .22}" stroke-linecap="round"/>`);
  // celular con número
  H.fono = (x, y, n = '1404') => `<rect x="${x}" y="${y}" width="34" height="58" rx="5" fill="#263238"/><rect x="${x + 3}" y="${y + 6}" width="28" height="42" fill="#E3F2FD"/>` + T(x + 17, y + 32, n, 11, '#2E7D32');

  // ---------------- MÁQUINAS Y OBJETOS DE MAESTRANZA (proporciones: persona ~85 = 1,70 m; 1 m ≈ 50 unidades) ----------------
  const OL = '#263238';
  const ALI1 = '#E8423A', ALI2 = '#A1A2A4';
  H.ALI1 = ALI1; H.ALI2 = ALI2;
  // pieza metálica: perfil I (viga) visto de lado; x, y = esquina inferior izquierda
  H.viga = (x, y, w = 120, h = 14, c = '#78909C') => `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${c}" stroke="${OL}" stroke-width="1.2"/><rect x="${x}" y="${y - h}" width="${w}" height="3" fill="#90A4AE"/><rect x="${x}" y="${y - 3}" width="${w}" height="3" fill="#546E7A"/>`;
  // plancha de acero (vista de canto, apoyada)
  H.plancha = (x, y, w = 90, h = 6) => `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="#90A4AE" stroke="${OL}" stroke-width="1"/>`;
  // torno paralelo (~2,8 m de largo, eje a la altura de la cintura); x = extremo izquierdo, y = piso
  H.torno = (x, y, o = {}) => { const gira = o.gira !== false; return `<rect x="${x + 6}" y="${y - 40}" width="16" height="40" fill="#5D6D7E" stroke="${OL}"/><rect x="${x + 112}" y="${y - 40}" width="16" height="40" fill="#5D6D7E" stroke="${OL}"/>`
    + `<rect x="${x}" y="${y - 52}" width="140" height="12" fill="#7F8C8D" stroke="${OL}" stroke-width="1.2"/><rect x="${x}" y="${y - 84}" width="34" height="32" rx="2" fill="#4A6274" stroke="${OL}" stroke-width="1.2"/><rect x="${x + 4}" y="${y - 80}" width="10" height="6" fill="#ECEFF1"/>`
    + `<g ${gira ? 'class="adGira"' : ''} style="transform-origin:${x + 40}px ${y - 68}px"><circle cx="${x + 40}" cy="${y - 68}" r="10" fill="#90A4AE" stroke="${OL}" stroke-width="1.2"/><path d="M${x + 40},${y - 78} v6 M${x + 31},${y - 63} l5,-3 M${x + 49},${y - 63} l-5,-3" stroke="${OL}" stroke-width="2"/></g>`
    + `<rect x="${x + 50}" y="${y - 71}" width="44" height="6" fill="#B0BEC5" stroke="${OL}"/><rect x="${x + 70}" y="${y - 62}" width="18" height="10" fill="#4A6274" stroke="${OL}"/><rect x="${x + 76}" y="${y - 66}" width="6" height="5" fill="#263238"/>`
    + `<rect x="${x + 112}" y="${y - 78}" width="24" height="26" rx="2" fill="#4A6274" stroke="${OL}" stroke-width="1.2"/><rect x="${x + 100}" y="${y - 70}" width="12" height="4" fill="#B0BEC5"/>`
    + `<circle cx="${x + 24}" cy="${y - 92}" r="5" fill="#D32F2F" stroke="${OL}"/><rect x="${x + 22}" y="${y - 88}" width="4" height="4" fill="#455A64"/>`; };
  // fresadora vertical (~1,8 m); x = centro, y = piso
  H.fresa = (x, y) => `<rect x="${x - 26}" y="${y - 70}" width="34" height="70" fill="#4A6274" stroke="${OL}" stroke-width="1.2"/><rect x="${x - 30}" y="${y - 96}" width="70" height="26" rx="3" fill="#5D7486" stroke="${OL}" stroke-width="1.2"/><rect x="${x + 22}" y="${y - 74}" width="10" height="14" fill="#90A4AE" stroke="${OL}"/><rect x="${x + 25}" y="${y - 60}" width="4" height="8" fill="#ECEFF1" stroke="${OL}" stroke-width=".8"/>`
    + `<rect x="${x - 6}" y="${y - 48}" width="70" height="8" fill="#90A4AE" stroke="${OL}"/><rect x="${x + 14}" y="${y - 56}" width="22" height="8" fill="#B0BEC5" stroke="${OL}"/><circle cx="${x - 30}" cy="${y - 92}" r="4" fill="#D32F2F" stroke="${OL}"/>`;
  // taladro de pedestal (~1,7 m); x = centro, y = piso
  H.taladro = (x, y) => `<rect x="${x - 18}" y="${y - 6}" width="44" height="6" fill="#4A6274" stroke="${OL}"/><rect x="${x - 3}" y="${y - 94}" width="6" height="88" fill="#90A4AE" stroke="${OL}"/><rect x="${x - 4}" y="${y - 110}" width="34" height="22" rx="3" fill="#4A6274" stroke="${OL}"/><rect x="${x + 16}" y="${y - 88}" width="5" height="14" fill="#B0BEC5" stroke="${OL}"/><line x1="${x + 18}" y1="${y - 74}" x2="${x + 18}" y2="${y - 66}" stroke="#ECEFF1" stroke-width="2"/>`
    + `<rect x="${x - 2}" y="${y - 58}" width="36" height="5" fill="#78909C" stroke="${OL}"/><line x1="${x + 30}" y1="${y - 98}" x2="${x + 42}" y2="${y - 90}" stroke="${OL}" stroke-width="2.5"/><circle cx="${x + 42}" cy="${y - 90}" r="2.5" fill="#D32F2F"/>`;
  // sierra huincha horizontal; x = extremo izquierdo, y = piso
  H.sierra = (x, y) => `<rect x="${x + 4}" y="${y - 44}" width="10" height="44" fill="#5D6D7E" stroke="${OL}"/><rect x="${x + 86}" y="${y - 44}" width="10" height="44" fill="#5D6D7E" stroke="${OL}"/><rect x="${x}" y="${y - 52}" width="100" height="10" fill="#7F8C8D" stroke="${OL}"/>`
    + `<rect x="${x + 10}" y="${y - 76}" width="74" height="18" rx="8" fill="#F9A825" stroke="${OL}" stroke-width="1.2"/><path d="M${x + 16},${y - 58} h62" stroke="#ECEFF1" stroke-width="2" stroke-dasharray="3 2"/>`;
  // guillotina para planchas; x = extremo izquierdo, y = piso
  H.guillotina = (x, y) => `<rect x="${x}" y="${y - 50}" width="18" height="50" fill="#4A6274" stroke="${OL}"/><rect x="${x + 112}" y="${y - 50}" width="18" height="50" fill="#4A6274" stroke="${OL}"/><rect x="${x}" y="${y - 82}" width="130" height="22" fill="#5D7486" stroke="${OL}" stroke-width="1.2"/>`
    + `<rect x="${x + 4}" y="${y - 60}" width="122" height="10" fill="#90A4AE" stroke="${OL}"/><path d="M${x + 18},${y - 60} h94 v6 h-94z" fill="#FFC20E" opacity=".9"/><rect x="${x - 10}" y="${y - 50}" width="150" height="5" fill="#B0BEC5" stroke="${OL}"/><rect x="${x + 50}" y="${y - 10}" width="30" height="8" rx="2" fill="#263238"/>`;
  // plegadora; x = extremo izquierdo, y = piso
  H.plegadora = (x, y) => `<rect x="${x}" y="${y - 100}" width="16" height="100" fill="#4A6274" stroke="${OL}"/><rect x="${x + 114}" y="${y - 100}" width="16" height="100" fill="#4A6274" stroke="${OL}"/><rect x="${x + 10}" y="${y - 92}" width="110" height="20" fill="#5D7486" stroke="${OL}"/>`
    + `<path d="M${x + 22},${y - 72} h86 l-43,14z" fill="#90A4AE" stroke="${OL}"/><rect x="${x + 16}" y="${y - 50}" width="98" height="12" fill="#78909C" stroke="${OL}"/><path d="M${x + 50},${y - 50} l15,-6 l15,6z" fill="#263238"/><rect x="${x + 50}" y="${y - 10}" width="30" height="8" rx="2" fill="#263238"/>`;
  // esmeril de banco; x = centro, y = piso
  H.esmerilBanco = (x, y) => `<rect x="${x - 4}" y="${y - 52}" width="8" height="52" fill="#5D6D7E" stroke="${OL}"/><rect x="${x - 16}" y="${y - 4}" width="32" height="4" fill="#455A64"/><rect x="${x - 12}" y="${y - 66}" width="24" height="14" rx="5" fill="#4A6274" stroke="${OL}"/>`
    + `<circle cx="${x - 20}" cy="${y - 59}" r="9" fill="#9E9E9E" stroke="${OL}"/><circle cx="${x + 20}" cy="${y - 59}" r="9" fill="#9E9E9E" stroke="${OL}"/><path d="M${x - 30},${y - 62} a10,10 0 0 1 20,-6 M${x + 10},${y - 68} a10,10 0 0 1 20,6" stroke="#F9A825" stroke-width="3" fill="none"/><rect x="${x - 27}" y="${y - 74}" width="14" height="4" fill="#CFE8F7" stroke="${OL}" stroke-width=".8"/><rect x="${x + 13}" y="${y - 74}" width="14" height="4" fill="#CFE8F7" stroke="${OL}" stroke-width=".8"/>`;
  // esmeril angular en la mano: (x, y) = mango; ang en grados
  H.esmerilMano = (x, y, ang = 0, chispas = false) => `<g transform="rotate(${ang} ${x} ${y})"><rect x="${x - 4}" y="${y - 4}" width="30" height="9" rx="4" fill="#1565C0" stroke="${OL}"/><rect x="${x + 22}" y="${y - 6}" width="10" height="13" rx="2" fill="#455A64" stroke="${OL}"/><rect x="${x + 28}" y="${y + 6}" width="4" height="4" fill="#455A64"/><ellipse cx="${x + 30}" cy="${y + 12}" rx="12" ry="3" fill="#9E9E9E" stroke="${OL}"/><path d="M${x + 18},${y + 10} a12,4 0 0 1 12,-2" stroke="#F9A825" stroke-width="3" fill="none"/><rect x="${x + 8}" y="${y - 12}" width="4" height="9" fill="${OL}"/></g>` + (chispas ? H.chispas(x + 34, y + 14) : '');
  // chispas animadas (soldadura, esmeril, oxicorte)
  H.chispas = (x, y, n = 9, dir = 1) => `<g class="adChis">${Array.from({ length: n }, (_, i) => { const a = (-20 + i * 14) * Math.PI / 180, L = 10 + (i % 3) * 7; return `<line x1="${x}" y1="${y}" x2="${(x + dir * Math.cos(a) * L).toFixed(1)}" y2="${(y + Math.sin(a) * L + 6).toFixed(1)}" stroke="${i % 2 ? '#FFD54F' : '#FF9800'}" stroke-width="1.6" stroke-linecap="round"/>`; }).join('')}</g>`;
  // arco de soldadura (destello)
  H.arco = (x, y) => `<g class="adArco"><circle cx="${x}" cy="${y}" r="9" fill="#FFFDE7" opacity=".9"/><circle cx="${x}" cy="${y}" r="16" fill="#E3F2FD" opacity=".45"/></g>`;
  // mesa de soldar (de acero); x = izquierda, y = piso, w = ancho
  H.mesaSoldar = (x, y, w = 100) => `<rect x="${x}" y="${y - 50}" width="${w}" height="7" fill="#607D8B" stroke="${OL}"/><rect x="${x + 4}" y="${y - 43}" width="6" height="43" fill="#546E7A"/><rect x="${x + w - 10}" y="${y - 43}" width="6" height="43" fill="#546E7A"/><rect x="${x + 4}" y="${y - 14}" width="${w - 8}" height="4" fill="#546E7A"/>`;
  // máquina de soldar (inversora sobre carro) con pinza de tierra y cable
  H.maqSoldar = (x, y, rotulo = 'MIG') => `<rect x="${x}" y="${y - 44}" width="40" height="34" rx="3" fill="${ALI1}" stroke="${OL}" stroke-width="1.2"/><rect x="${x + 6}" y="${y - 38}" width="16" height="10" fill="#263238"/>` + T(x + 14, y - 30, rotulo, 6, '#7CFC00') + `<circle cx="${x + 30}" cy="${y - 33}" r="4" fill="#ECEFF1" stroke="${OL}"/><circle cx="${x + 8}" cy="${y - 4}" r="5" fill="#263238"/><circle cx="${x + 32}" cy="${y - 4}" r="5" fill="#263238"/><rect x="${x}" y="${y - 12}" width="40" height="4" fill="#455A64"/>`;
  // brazo de extracción de humos con campana (el taller de ALI tiene extracción); (x, y) = punto de la campana sobre la soldadura
  H.extractor = (x, y, humo = true) => `<path d="M${x - 70},0 V${y - 70} q0,-10 10,-10 H${x - 10} q10,0 10,10 V${y - 18}" stroke="#90A4AE" stroke-width="9" fill="none"/><path d="M${x - 70},0 V${y - 70} q0,-10 10,-10 H${x - 10} q10,0 10,10 V${y - 18}" stroke="#B0BEC5" stroke-width="5" fill="none"/><path d="M${x - 16},${y - 4} l6,-16 h20 l6,16z" fill="#FFC20E" stroke="${OL}" stroke-width="1.2"/>`
    + (humo ? `<g class="adHumo">${[0, 1, 2].map(i => `<path d="M${x - 6 + i * 6},${y + 18} q-4,-8 0,-14 q4,-6 0,-12" stroke="#9E9E9E" stroke-width="3" fill="none" opacity=".7"/>`).join('')}</g>` : '');
  // humo de soldadura sin extracción (nube gris que sube a la cara)
  H.humo = (x, y) => `<g class="adHumo">${[0, 1, 2, 3].map(i => `<ellipse cx="${x - 6 + i * 5}" cy="${y - 10 - i * 9}" rx="${8 + i * 3}" ry="${5 + i * 2}" fill="#757575" opacity="${.45 - i * .07}"/>`).join('')}</g>`;
  // biombo / cortina de soldadura (protege a los demás del arco)
  H.biombo = (x, y, w = 50) => `<rect x="${x}" y="${y - 80}" width="${w}" height="74" fill="#C62828" opacity=".65" stroke="#8E0000"/><rect x="${x - 2}" y="${y - 82}" width="4" height="82" fill="#455A64"/><rect x="${x + w - 2}" y="${y - 82}" width="4" height="82" fill="#455A64"/><rect x="${x - 6}" y="${y - 3}" width="12" height="3" fill="#455A64"/><rect x="${x + w - 6}" y="${y - 3}" width="12" height="3" fill="#455A64"/>`;
  // cilindro de gas con etiqueta (siempre amarrado con cadena cuando está de pie); x = izquierda, y = piso
  const GAS = { oxigeno: ['#2E7D32', 'OXÍGENO'], acetileno: ['#8D3B2B', 'ACETILENO'], argon: ['#5D6D7E', 'ARGÓN'], mezcla: ['#6D4C41', 'MEZCLA'], co2: ['#455A64', 'CO₂'] };
  H.cilindro = (x, y, gas = 'oxigeno', o = {}) => { const [c, n] = GAS[gas] || GAS.oxigeno, h = o.h || 96, caido = o.caido;
    const g = `<rect x="${x}" y="${y - h}" width="20" height="${h}" rx="9" fill="${c}" stroke="${OL}" stroke-width="1.2"/><rect x="${x + 6}" y="${y - h - 9}" width="8" height="10" fill="#B0BEC5" stroke="${OL}"/>${o.capuchon !== false ? `<path d="M${x + 3},${y - h - 2} q7,-14 14,0z" fill="#90A4AE" stroke="${OL}"/>` : `<circle cx="${x + 10}" cy="${y - h - 11}" r="4" fill="#ECEFF1" stroke="${OL}"/>`}`
      + `<rect x="${x + 2}" y="${y - h * .62}" width="16" height="${h * .3}" fill="#fff" opacity=".9"/><text x="${x + 10}" y="${y - h * .47}" font-size="5.2" font-weight="bold" text-anchor="middle" fill="#263238" font-family="Arial" transform="rotate(-90 ${x + 10} ${y - h * .47})">${n}</text>`;
    return caido ? `<g transform="rotate(-90 ${x + 10} ${y})">${g}</g>` : g; };
  // cadena que amarra cilindros a la pared o al carro
  H.cadena = (x1, y1, x2) => `<path d="M${x1},${y1} H${x2}" stroke="#455A64" stroke-width="3" stroke-dasharray="4 2"/>`;
  // carro porta cilindros de oxicorte (2 cilindros amarrados)
  H.carroOxi = (x, y) => H.cilindro(x + 4, y - 6, 'oxigeno', { h: 90, capuchon: false }) + H.cilindro(x + 28, y - 6, 'acetileno', { h: 84, capuchon: false }) + `<rect x="${x}" y="${y - 10}" width="54" height="6" fill="#455A64"/><circle cx="${x + 10}" cy="${y - 4}" r="5" fill="#263238"/><circle cx="${x + 44}" cy="${y - 4}" r="5" fill="#263238"/><path d="M${x + 52},${y - 6} l10,-96" stroke="#455A64" stroke-width="3"/>` + H.cadena(x + 2, y - 60, x + 52);
  // puente grúa: viga superior de lado a lado, carro y tecle con gancho; (xg = posición del gancho, yg = altura del gancho)
  H.puenteGrua = (xg = 160, yg = 90, carga = '') => `<rect x="0" y="24" width="320" height="12" fill="#FFC20E" stroke="${OL}" stroke-width="1.2"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<path d="M${i * 32 + 4},26 l8,8 M${i * 32 + 12},26 l8,8" stroke="#263238" stroke-width="2" opacity=".55"/>`).join('')}<rect x="0" y="22" width="320" height="2" fill="${OL}"/>`
    + `<rect x="${xg - 16}" y="36" width="32" height="14" rx="2" fill="#455A64" stroke="${OL}"/><line x1="${xg - 3}" y1="50" x2="${xg - 3}" y2="${yg - 10}" stroke="#37474F" stroke-width="2"/><line x1="${xg + 3}" y1="50" x2="${xg + 3}" y2="${yg - 10}" stroke="#37474F" stroke-width="2"/>`
    + `<rect x="${xg - 7}" y="${yg - 12}" width="14" height="10" rx="2" fill="#FFC20E" stroke="${OL}"/><path d="M${xg},${yg - 2} v6 q0,8 -7,8 q-6,0 -6,-6" stroke="${OL}" stroke-width="3" fill="none"/>` + (carga || '');
  // tecle de cadena colgado de una viga; (x, ytop) ; largo de cadena l
  H.tecle = (x, ytop, l = 50) => `<rect x="${x - 10}" y="${ytop}" width="20" height="16" rx="4" fill="${ALI1}" stroke="${OL}"/><line x1="${x}" y1="${ytop + 16}" x2="${x}" y2="${ytop + 16 + l}" stroke="#455A64" stroke-width="3" stroke-dasharray="3 2"/><path d="M${x},${ytop + 16 + l} v4 q0,7 -6,7 q-5,0 -5,-5" stroke="${OL}" stroke-width="3" fill="none"/>`;
  // eslinga (de dos ramales) desde el gancho (xg, yg) hasta la carga en (x1,y) y (x2,y)
  H.eslinga = (xg, yg, x1, x2, y, c = '#7B1FA2') => `<path d="M${xg},${yg} L${x1},${y} M${xg},${yg} L${x2},${y}" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/>`;
  // zona bajo carga suspendida (achurado en el piso, nadie se pone debajo)
  H.zonaCarga = (x, w = 90) => `<path d="M${x},176 h${w} l-8,14 h${-w + 16}z" fill="#D32F2F" opacity=".25"/>` + [0, 1, 2, 3, 4].map(i => `<line x1="${x + 6 + i * w / 5}" y1="176" x2="${x + i * w / 5}" y2="190" stroke="#D32F2F" stroke-width="2" opacity=".6"/>`).join('');
  // grúa horquilla con los colores de Maestranza ALI; x = rueda trasera, y = piso; o.flip = mira a la izquierda; o.carga = svg sobre las horquillas; o.baliza = luz giratoria
  H.horquilla = (x, y, o = {}) => { const g = `<rect x="${x - 6}" y="${y - 46}" width="74" height="30" rx="4" fill="${ALI1}" stroke="${OL}" stroke-width="1.4"/>` + T(x + 24, y - 26, 'ALI', 11, '#fff')
      + `<rect x="${x - 12}" y="${y - 42}" width="12" height="26" rx="2" fill="${ALI2}" stroke="${OL}"/><path d="M${x + 14},${y - 46} V${y - 96} H${x + 54} L${x + 62},${y - 46}" stroke="#37474F" stroke-width="3.5" fill="none"/><rect x="${x + 12}" y="${y - 98}" width="52" height="5" fill="#37474F"/>`
      + `<rect x="${x + 66}" y="${y - 112}" width="7" height="104" fill="#455A64" stroke="${OL}"/><rect x="${x + 73}" y="${y - (o.alto || 14)}" width="38" height="4" fill="#263238"/><rect x="${x + 73}" y="${y - (o.alto || 14) - 20}" width="4" height="22" fill="#263238"/>`
      + `<circle cx="${x + 6}" cy="${y - 10}" r="10" fill="#263238"/><circle cx="${x + 6}" cy="${y - 10}" r="4" fill="#90A4AE"/><circle cx="${x + 54}" cy="${y - 11}" r="11" fill="#263238"/><circle cx="${x + 54}" cy="${y - 11}" r="4.5" fill="#90A4AE"/>`
      + (o.baliza !== false ? `<rect x="${x + 30}" y="${y - 106}" width="8" height="8" rx="2" fill="#FF9800" class="adBal"/>` : '')
      + (o.op !== false && typeof W === 'function' ? `<g>${W(x + 32, y - 40, { pose: 'cc1sit', s: .72, shirt: '#22406B', pants: '#2B3A4A', glasses: true })}</g>` : '')
      + (o.carga || '');
    return o.flip ? `<g transform="translate(${2 * x + 60},0) scale(-1,1)">${g}</g>` : g; };
  // pallet con piezas sobre las horquillas: (x, y) = punta de la horquilla abajo
  H.palletPiezas = (x, y) => `<rect x="${x}" y="${y - 6}" width="38" height="6" fill="#A1887F" stroke="#5D4037"/>` + H.viga(x + 2, y - 6, 34, 10) + H.viga(x + 2, y - 16, 34, 10);
  // tablero eléctrico con candado y tarjeta de bloqueo opcional
  H.tablero = (x, y, bloqueo = false) => `<rect x="${x}" y="${y}" width="44" height="58" rx="2" fill="#B0BEC5" stroke="${OL}" stroke-width="1.2"/><path d="M${x + 22},${y + 10} l-6,12 h8 l-6,12" stroke="#FFC20E" stroke-width="3" fill="none"/><path d="M${x + 22},${y + 6} l-11,20 h22z" fill="none" stroke="#263238" stroke-width="1.5"/>`
    + `<rect x="${x + 30}" y="${y + 34}" width="8" height="16" rx="2" fill="#263238"/>` + (bloqueo ? `<path d="M${x + 31},${y + 46} v-5 a3,3 0 0 1 6,0 v5" stroke="#263238" stroke-width="1.6" fill="none"/><rect x="${x + 29}" y="${y + 45}" width="10" height="9" rx="1.5" fill="${ALI1}" stroke="${OL}"/><rect x="${x + 26}" y="${y + 55}" width="16" height="20" fill="#FFC20E" stroke="${OL}" stroke-width=".8"/>` + T(x + 34, y + 63, 'NO', 5, '#C62828') + T(x + 34, y + 70, 'OPERAR', 3.6, '#263238') : '');
  // letrero de seguridad: tipo 'obligacion' (azul), 'prohibicion' (rojo), 'advertencia' (amarillo), 'info' (verde); icono = texto corto
  H.letrero = (x, y, tipo = 'obligacion', txt = '', w = 46) => { const c = { obligacion: '#1565C0', prohibicion: '#D32F2F', advertencia: '#FFC20E', info: '#2E7D32' }[tipo];
    const sym = tipo === 'advertencia' ? `<path d="M${x + w / 2},${y + 5} l${w * .32},${w * .5} h${-w * .64}z" fill="#FFC20E" stroke="#263238" stroke-width="2"/>` + T(x + w / 2, y + w * .47, '!', 12, '#263238')
      : tipo === 'prohibicion' ? `<circle cx="${x + w / 2}" cy="${y + w * .34}" r="${w * .26}" fill="#fff" stroke="#D32F2F" stroke-width="3.5"/><line x1="${x + w * .32}" y1="${y + w * .16}" x2="${x + w * .68}" y2="${y + w * .52}" stroke="#D32F2F" stroke-width="3.5"/>`
      : `<circle cx="${x + w / 2}" cy="${y + w * .34}" r="${w * .26}" fill="${c}"/>`;
    return `<rect x="${x}" y="${y}" width="${w}" height="${w * .9}" rx="3" fill="#fff" stroke="#90A4AE"/>${sym}` + (txt ? T(x + w / 2, y + w * .82, txt, Math.min(7, w * .14), '#263238') : ''); };
  // estación de lavado de ojos (emergencia)
  H.lavaojos = (x, y) => `<rect x="${x + 8}" y="${y - 80}" width="6" height="80" fill="#2E7D32"/><path d="M${x},${y - 82} h22 l-4,8 h-14z" fill="#43A047" stroke="${OL}"/><rect x="${x - 2}" y="${y - 110}" width="26" height="18" fill="#2E7D32"/>` + T(x + 11, y - 98, '👁', 9, '#fff');
  // botiquín
  H.botiquin = (x, y) => `<rect x="${x}" y="${y}" width="30" height="24" rx="3" fill="#fff" stroke="#2E7D32" stroke-width="2"/><path d="M${x + 15},${y + 5} v14 M${x + 8},${y + 12} h14" stroke="#2E7D32" stroke-width="4"/>`;
  // escala de mano (tipo tijera ya está en H.escala); escala apoyada en un muro: pie (x,y), alto h
  H.escalaApoyada = (x, y, h = 120) => { let g = `<line x1="${x}" y1="${y}" x2="${x + h * .25}" y2="${y - h}" stroke="#90A4AE" stroke-width="4"/><line x1="${x + 18}" y1="${y}" x2="${x + 18 + h * .25}" y2="${y - h}" stroke="#90A4AE" stroke-width="4"/>`;
    for (let i = 1; i < 8; i++) { const k = i / 8; g += `<line x1="${(x + h * .25 * k).toFixed(1)}" y1="${(y - h * k).toFixed(1)}" x2="${(x + 18 + h * .25 * k).toFixed(1)}" y2="${(y - h * k).toFixed(1)}" stroke="#607D8B" stroke-width="3"/>`; } return g; };
  // careta de soldar (se dibuja sobre la cabeza; la usa W con { careta: true }, o directo en (cx, cy) = centro de la cabeza)
  H.careta = (cx, cy, s = 1, fx = 1, levantada = false) => levantada
    ? `<path d="M${cx - 10 * s},${cy - 6 * s} q${10 * s},${-16 * s} ${20 * s},0 l${-2 * s},${-8 * s} q${-8 * s},${-8 * s} ${-16 * s},0z" fill="#263238" stroke="#111" stroke-width="${s}"/>`
    : `<path d="M${cx - 9 * fx * s},${cy - 11 * s} q${18 * fx * s},${-4 * s} ${20 * fx * s},${8 * s} l${-1 * fx * s},${16 * s} q${-10 * fx * s},${6 * s} ${-19 * fx * s},0z" fill="#263238" stroke="#111" stroke-width="${s}"/><rect x="${(fx > 0 ? cx + 4 * s : cx - 11 * s)}" y="${cy - 3 * s}" width="${7 * s}" height="${5 * s}" fill="#2E7D32" opacity=".85"/>`;
  // ✓ y ✗ grandes de comparación (alias de H.ok)
  H.si = (x, y, r = 15) => H.ok(x, y, true, r); H.no = (x, y, r = 15) => H.ok(x, y, false, r);
  // estilos de animación comunes de ALI (incluir una vez por dibujo con H.CSS)
  H.CSS = `<style>.adGira{animation:adGira 1s linear infinite}@keyframes adGira{to{transform:rotate(360deg)}}.adChis{animation:adChis .25s steps(2) infinite}@keyframes adChis{50%{opacity:.35}}.adArco{animation:adArco .18s steps(2) infinite}@keyframes adArco{50%{opacity:.4}}.adHumo{animation:adHumo 2.4s ease-out infinite}@keyframes adHumo{0%{opacity:0;transform:translateY(6px)}40%{opacity:.9}100%{opacity:0;transform:translateY(-22px)}}.adBal{animation:adBal .6s steps(2) infinite}@keyframes adBal{50%{fill:#FFE082}}.adBob{animation:adBob 1.6s ease-in-out infinite}@keyframes adBob{50%{transform:translateY(-4px)}}.adPul{animation:adPul 1.2s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 50%}@keyframes adPul{50%{transform:scale(1.12)}}.adMov{animation:adMov 3s ease-in-out infinite alternate}@keyframes adMov{from{transform:translateX(0)}to{transform:translateX(var(--dx,24px))}}</style>`;
})(window.HD);

/* ---- 10_induccion.js ---- */
// ===== Maestranza ALI S.A. · Inducción de Prevención de Riesgos (IRL) · "charla madre", antes que cualquier otra =====
// Base: inducción escrita de Maestranza ALI S.A. (rev. 05 del 24-03-2025), ítems 1 a 33 + contenidos de su evaluación escrita (Ev).
// Regla de Daniel: una pregunta (o actividad) por cada ítem de la inducción escrita. Encima de cada pregunta: // ítems IRL: ...

// Riesgos por sección de ALI para la lámina "puesto" (el portal muestra los de la sección del cargo de la persona)
window.SI_IND_PUESTO = {
  taller: '<li><b>Taller de fabricación y armado:</b> proyección de partículas al esmerilar y cortar; golpes con piezas y estructuras de acero; cortes con planchas y perfiles; cargas suspendidas del puente grúa y los tecles; sobreesfuerzo; ruido. <span class="ctrl">✅ Control:</span> lentes de seguridad en todo momento, guantes de cuero, protector auditivo, zapatos de seguridad, nunca bajo una carga suspendida, ayuda mecánica sobre 25 kg (20 kg mujeres) y taller ordenado.</li>',
  maquinas: '<li><b>Máquinas herramientas (torno, fresa, taladro, sierra, guillotina, plegadora, prensa):</b> atrapamiento con piezas que giran; amputaciones en la guillotina, la plegadora y la prensa; viruta caliente y cortante; proyección de partículas; ruido. <span class="ctrl">✅ Control:</span> operar solo si te capacitaron y autorizaron, protecciones puestas, sin joyas ni ropa suelta, ropa abotonada y pelo tomado, la viruta se saca con gancho o escobilla con la máquina detenida, y nunca intervenir un equipo en movimiento.</li>',
  soldadura: '<li><b>Soldadura y corte (arco, MIG, TIG, oxicorte y plasma):</b> radiación del arco en ojos y piel; quemaduras por chispas y metal caliente; humos de soldadura; incendio; electricidad; cilindros de gas a presión. <span class="ctrl">✅ Control:</span> careta, chaqueta, polainas y guantes de descarne, extracción de humos encendida, biombo para proteger a los demás, área sin combustibles, extintor a mano y cilindros de pie, amarrados y con capuchón.</li>',
  granallado: '<li><b>Granallado y pintura:</b> proyección de abrasivo a alta presión; polvo; ruido; solventes y pinturas inflamables; vapores. <span class="ctrl">✅ Control:</span> el equipo completo de granallado y la protección respiratoria que indique la tarea, protector auditivo, la pistola nunca se apunta a una persona, respirador y EPP según la Hoja de Datos de Seguridad (HDS) de la pintura, buena ventilación y nada de llamas ni chispas cerca.</li>',
  mantencion: '<li><b>Mantención y trabajos en faenas de clientes:</b> intervención de equipos con energía; trabajo en altura; tránsito de maquinaria y camiones; reglas de cada faena; sol. <span class="ctrl">✅ Control:</span> detener, bloquear y etiquetar antes de intervenir, arnés sobre 1,8 metros con examen de altura vigente, chaleco reflectante, casco donde se exija, cumplir el reglamento de la faena del cliente, bloqueador y legionario.</li>',
  oficina: '<li><b>Oficina y administración:</b> posturas frente al computador; caídas en escaleras; tránsito por el taller y el patio para ir a otras áreas. <span class="ctrl">✅ Control:</span> pantalla a la altura de los ojos y pausas activas, usar el pasamanos, y al entrar al taller: lentes de seguridad, zapatos de seguridad y caminar solo por las vías peatonales.</li>'
};
window.SI_IND_TRANSV = {
  ali: '<li><b>Para todos en Maestranza ALI:</b> caídas por pisos con aceite, zunchos o maderas; golpes; grúa horquilla, camiones y vehículos en el patio; incendio; sismo; accidente de trayecto. <span class="ctrl">✅ Control:</span> orden y limpieza, caminar solo por las vías peatonales, 5 km/h dentro de la empresa, extintores despejados, conocer la zona de seguridad y avisar de inmediato todo accidente o condición insegura.</li>'
};

(function () {
  const H = window.HD;
  // ---------- utilidades propias de esta charla ----------
  const f1 = v => (+v).toFixed(1);
  const TT = (x, y, s, z = 12, c = '#263238', a = 'middle', w = 'bold') => H.T(x, y, s, z, c, a, w);
  const GG = (cls, inner, st) => `<g class="${cls}"${st ? ` style="${st}"` : ''}>${inner}</g>`;
  // rótulo tipo píldora centrado en (x, y); texto blanco (en la prueba se oculta)
  const lab = (x, y, s, c = '#1565C0', z = 11) => { const w = s.length * z * .6 + 14, h = z + 9; x = Math.max(w / 2 + 2, Math.min(318 - w / 2, x)); return `<rect x="${f1(x - w / 2)}" y="${f1(y - h / 2)}" width="${f1(w)}" height="${h}" rx="${h / 2}" fill="${c}"/>` + TT(x, y + z * .36, s, z, '#fff'); };
  const arr = (x1, y1, x2, y2, c = '#2E7D32', w = 3) => { const a = Math.atan2(y2 - y1, x2 - x1), h = 9;
    return `<line x1="${x1}" y1="${y1}" x2="${f1(x2 - 5 * Math.cos(a))}" y2="${f1(y2 - 5 * Math.sin(a))}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/><polygon points="${x2},${y2} ${f1(x2 - h * Math.cos(a - .45))},${f1(y2 - h * Math.sin(a - .45))} ${f1(x2 - h * Math.cos(a + .45))},${f1(y2 - h * Math.sin(a + .45))}" fill="${c}"/>`; };
  const ST = `<style>.alInSpin{animation:alInSpin 1.4s linear infinite;transform-box:fill-box;transform-origin:center}@keyframes alInSpin{to{transform:rotate(360deg)}}`
    + `.alInUp{animation:alInUp 2.2s ease-out infinite}@keyframes alInUp{0%{transform:translateY(6px);opacity:0}30%{opacity:.85}100%{transform:translateY(-18px);opacity:0}}`
    + `.alInDrip{animation:alInDrip 1.4s ease-in infinite}@keyframes alInDrip{0%{transform:translateY(0);opacity:1}80%{opacity:1}100%{transform:translateY(16px);opacity:0}}`
    + `.alInFl{animation:alInFl .7s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center bottom}@keyframes alInFl{from{transform:scale(1,1)}to{transform:scale(.88,1.12)}}`
    + `.alInBob{animation:alInBob 1.6s ease-in-out infinite}@keyframes alInBob{50%{transform:translateY(-3px)}}`
    + `.alInSl{animation:alInSl 3s ease-in-out infinite alternate}@keyframes alInSl{from{transform:translateX(0)}to{transform:translateX(var(--dx,18px))}}`
    + `.alInPu{animation:alInPu 1.3s ease-in-out infinite;transform-box:fill-box;transform-origin:center}@keyframes alInPu{50%{transform:scale(1.1);opacity:.8}}`
    + `.alInBl{animation:alInBl 1s steps(2) infinite}@keyframes alInBl{50%{opacity:.25}}`
    + `.alInSh{animation:alInSh .25s linear infinite alternate}@keyframes alInSh{from{transform:translateX(-2px)}to{transform:translateX(2px)}}`
    + `.alInSw{animation:alInSw 1.3s ease-in-out infinite alternate;transform-box:fill-box}@keyframes alInSw{from{transform:rotate(-6deg)}to{transform:rotate(6deg)}}</style>`;
  const sv2 = g => sv(H.CSS + ST + g);
  const D = (n, f) => { S['al_in_' + n] = () => f(false); S['al_in_' + n + '_q'] = () => f(true); };
  const jefe = { area: 'taller', shirt: '#455A64' };
  const ROJO = '#C62828', AZUL = '#1565C0', VERDE = '#2E7D32', NAR = '#EF6C00', ALI = H.ALI1;

  // --- objetos de esta charla ---
  const sol = (x, y, r = 20) => GG('alInSpin', [0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i * Math.PI / 4; return `<line x1="${f1(x + (r + 5) * Math.cos(a))}" y1="${f1(y + (r + 5) * Math.sin(a))}" x2="${f1(x + (r + 13) * Math.cos(a))}" y2="${f1(y + (r + 13) * Math.sin(a))}" stroke="#FFA000" stroke-width="4" stroke-linecap="round"/>`; }).join('')) + `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFC107" stroke="#FFA000" stroke-width="2"/>`;
  // legionario sobre la cabeza (X, Y = centro de la cabeza, persona mirando a la derecha)
  const legion = (X, Y) => `<path d="M${X - 10.5},${Y - 3} a10.5,10.5 0 0 1 21,0z" fill="#F1E3C2" stroke="#22303A"/><path d="M${X - 12},${Y - 3} h25 q4,0 6,3 h-31z" fill="#F1E3C2" stroke="#22303A"/><path d="M${X - 10},${Y - 2} q-5,9 -1,18 l6,-2 q-3,-7 0,-15z" fill="#E9D8A6" stroke="#22303A"/>`;
  // audífonos de música sobre la cabeza
  const audif = (X, Y) => `<path d="M${X - 10},${Y} A10,11 0 0 1 ${X + 10},${Y}" stroke="#212121" stroke-width="2.4" fill="none"/><rect x="${X - 9}" y="${Y - 3}" width="6" height="8" rx="2.5" fill="#212121"/>`;
  // arnés de cuerpo completo para W(x, y, s) parado
  const arnes = (x, y, s = 1) => `<path d="M${f1(x - 6 * s)},${f1(y - 60 * s)} L${f1(x + 5 * s)},${f1(y - 38 * s)} M${f1(x + 6 * s)},${f1(y - 60 * s)} L${f1(x - 5 * s)},${f1(y - 38 * s)} M${f1(x - 7 * s)},${f1(y - 36 * s)} h${f1(14 * s)}" stroke="#FF6F00" stroke-width="${f1(2.6 * s)}" stroke-linecap="round"/>`;
  const zunchos = (x, y) => `<path d="M${x},${y} q14,-10 28,0 t28,0 t24,2" stroke="#1E88E5" stroke-width="2" fill="none"/><path d="M${x + 6},${y + 8} q16,-8 30,2 t30,-4" stroke="#1E88E5" stroke-width="2" fill="none"/>`;
  const madera = (x, y, w = 56, rot = 0) => `<rect x="${x}" y="${y - 6}" width="${w}" height="6" fill="#A1887F" stroke="#5D4037" transform="rotate(${rot} ${x} ${y})"/>`;
  const aceite = (x, y = 180, rx = 36) => H.charco(x, y, rx, '#3E2723');
  // panel de herramientas en la pared (x, y = esquina superior izquierda)
  const panelHerr = (x, y, w = 84) => `<rect x="${x}" y="${y}" width="${w}" height="50" fill="#ECEFF1" stroke="#90A4AE" stroke-width="2"/>`
    + `<g transform="translate(${x + 10},${y + 8})"><rect x="0" y="0" width="5" height="30" fill="#8D6E63"/><rect x="-4" y="-2" width="13" height="7" fill="#607D8B"/></g>`
    + `<g transform="translate(${x + 26},${y + 6})"><path d="M0,0 h12 l-3,6 v26 h-6 v-26z" fill="#90A4AE" stroke="#455A64"/></g>`
    + `<g transform="translate(${x + 46},${y + 6})"><circle cx="5" cy="5" r="5" fill="none" stroke="#455A64" stroke-width="2.5"/><rect x="3" y="9" width="4" height="26" fill="#455A64"/></g>`
    + `<g transform="translate(${x + 62},${y + 6})"><rect x="0" y="0" width="14" height="10" rx="2" fill="${ALI}"/><rect x="5" y="10" width="4" height="26" fill="#263238"/></g>`;
  // puerta del galpón, abierta y asegurada a su sujeta puertas (x = marco izquierdo, y = piso)
  const puerta = (x, y, asegurada = true) => `<rect x="${x}" y="${y - 112}" width="54" height="112" fill="#455A64"/><rect x="${x + 4}" y="${y - 108}" width="46" height="108" fill="#ECEFF1"/>`
    + (asegurada ? `<path d="M${x + 54},${y - 112} l18,8 v104 l-18,0z" fill="#90A4AE" stroke="#546E7A" stroke-width="1.5"/><rect x="${x + 72}" y="${y - 60}" width="12" height="4" fill="#263238"/><circle cx="${x + 84}" cy="${y - 58}" r="3" fill="#FFC20E" stroke="#263238"/>`
      : `<g class="alInSw" style="transform-origin:${x + 54}px ${y - 56}px"><path d="M${x + 54},${y - 112} l30,14 v98 l-30,0z" fill="#90A4AE" stroke="#546E7A" stroke-width="1.5"/></g>`);
  const papel = (x, y, w, h, tit, c = AZUL) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#fff" stroke="#90A4AE" stroke-width="1.5"/><rect x="${x}" y="${y}" width="${w}" height="16" rx="3" fill="${c}"/>${tit ? TT(x + w / 2, y + 12, tit, 10, '#fff') : ''}${[0, 1, 2, 3, 4, 5, 6, 7, 8].filter(i => 24 + i * 8 < h - 4).map(i => `<rect x="${x + 6}" y="${y + 22 + i * 8}" width="${w - 12 - (i % 2) * 10}" height="3" fill="#B0BEC5"/>`).join('')}`;
  const tel = (x, y) => `<rect x="${x}" y="${y}" width="14" height="24" rx="3" fill="#263238"/><rect x="${x + 2}" y="${y + 3}" width="10" height="15" fill="#80DEEA"/>`;
  const rayo = (x, y, s = 1) => `<path d="M${x},${y} l${-8 * s},${16 * s} h${7 * s} l${-5 * s},${14 * s} l${14 * s},${-19 * s} h${-7 * s} l${5 * s},${-11 * s}z" fill="#FFC20E" stroke="#263238" stroke-width="1.2"/>`;
  const zseg = (x, y) => `<rect x="${x}" y="${y}" width="96" height="40" rx="4" fill="${VERDE}" stroke="#fff" stroke-width="2"/>` + TT(x + 48, y + 16, 'ZONA DE', 11, '#fff') + TT(x + 48, y + 31, 'SEGURIDAD', 11, '#fff');
  const velocidad = (x, y, n, q) => `<rect x="${x - 2}" y="${y - 70}" width="4" height="70" fill="#607D8B"/><circle cx="${x}" cy="${y - 84}" r="18" fill="#fff" stroke="#D7262B" stroke-width="4"/>` + (q ? '' : TT(x, y - 85, n, 13) + TT(x, y - 75, 'km/h', 6.5));
  const escudo = (cx, cy) => `<path d="M${cx},${cy - 50} L${cx + 40},${cy - 36} V${cy} Q${cx + 40},${cy + 32} ${cx},${cy + 50} Q${cx - 40},${cy + 32} ${cx - 40},${cy} V${cy - 36}Z" fill="${ALI}" stroke="#7F1D18" stroke-width="3"/>` + TT(cx, cy - 12, 'Ley', 14, '#fff') + TT(cx, cy + 8, '16.744', 16, '#fff');
  const prohJoyas = (x, y) => `<g transform="translate(${x},${y})"><circle r="20" fill="#fff" stroke="#D7262B" stroke-width="3.5"/><circle cx="-4" cy="4" r="7" fill="none" stroke="#FBC02D" stroke-width="3"/><circle cx="6" cy="-3" r="5" fill="none" stroke="#AB47BC" stroke-width="3"/><line x1="-14" y1="-14" x2="14" y2="14" stroke="#D7262B" stroke-width="3.5"/></g>`;
  const lineas = (x, y, c = '#78909C') => [0, 1, 2].map(i => `<line x1="${x - 4 * i}" y1="${y + i * 10}" x2="${x - 22 - 4 * i}" y2="${y + i * 10}" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>`).join('');
  // camioneta de Maestranza ALI (~4 m); x = parachoques izquierdo, y = piso; o.flip mira a la derecha
  const camioneta = (x, y, o = {}) => { const g = `<rect x="${x}" y="${y - 50}" width="190" height="34" rx="5" fill="${ALI}" stroke="#263238" stroke-width="1.4"/>`
      + `<path d="M${x + 22},${y - 50} l18,-32 h62 l10,32z" fill="${ALI}" stroke="#263238" stroke-width="1.4"/><path d="M${x + 30},${y - 52} l14,-25 h22 v25z M${x + 72},${y - 52} v-25 h26 l8,25z" fill="#B3E5FC" stroke="#263238"/>`
      + `<rect x="${x + 112}" y="${y - 60}" width="78" height="10" fill="${H.ALI2}" stroke="#263238"/>` 
      + `<rect x="${x - 2}" y="${y - 46}" width="8" height="8" rx="2" fill="#FFF59D" stroke="#263238"/><rect x="${x + 184}" y="${y - 46}" width="7" height="9" fill="#D50000"/>`
      + `<circle cx="${x + 44}" cy="${y - 14}" r="14" fill="#263238"/><circle cx="${x + 44}" cy="${y - 14}" r="5" fill="#B0BEC5"/><circle cx="${x + 152}" cy="${y - 14}" r="14" fill="#263238"/><circle cx="${x + 152}" cy="${y - 14}" r="5" fill="#B0BEC5"/>`
      + `<circle cx="${x + 60}" cy="${y - 66}" r="6" fill="#F2C6A0" stroke="#22303A"/>`;
    return (o.flip ? `<g transform="translate(${2 * x + 190},0) scale(-1,1)">${g}</g>` : g) + TT(o.flip ? x + 102 : x + 88, y - 28, 'ALI', 11, '#fff'); };
  const casa = (x, y) => `<path d="M${x},${y - 44} l34,-28 l34,28 v44 h-68z" fill="#FFE0B2" stroke="#8D6E63" stroke-width="2"/><path d="M${x - 6},${y - 42} l40,-34 l40,34" fill="none" stroke="#C62828" stroke-width="5"/><rect x="${x + 26}" y="${y - 26}" width="16" height="26" fill="#8D6E63"/><rect x="${x + 6}" y="${y - 36}" width="14" height="12" fill="#BBDEFB" stroke="#8D6E63"/>`;
  const galpon = (x, y, w = 100) => `<path d="M${x},${y} V${y - 60} L${x + w / 2},${y - 76} L${x + w},${y - 60} V${y}Z" fill="#B0BEC5" stroke="#78909C" stroke-width="2"/><rect x="${x}" y="${y - 56}" width="${w}" height="12" fill="${ALI}"/>` + TT(x + w / 2, y - 46, 'ALI', 10, '#fff') + `<rect x="${x + w / 2 - 18}" y="${y - 34}" width="36" height="34" fill="#546E7A"/>`;
  const bici = (x, y) => `<circle cx="${x}" cy="${y - 14}" r="14" fill="none" stroke="#263238" stroke-width="3"/><circle cx="${x + 50}" cy="${y - 14}" r="14" fill="none" stroke="#263238" stroke-width="3"/><path d="M${x},${y - 14} l16,-24 h24 l10,24 M${x + 16},${y - 38} l10,24 l14,-24 M${x + 40},${y - 38} l-2,-8 h8" stroke="#D32F2F" stroke-width="3" fill="none" stroke-linejoin="round"/><circle cx="${x + 26}" cy="${y - 14}" r="3" fill="#263238"/>`;
  const trayectoFondo = () => `<rect width="320" height="200" fill="#BBDEFB"/><rect y="140" width="320" height="60" fill="#9CCC65"/><rect y="150" width="320" height="22" fill="#9E9E9E"/>${[0, 1, 2, 3, 4].map(i => `<rect x="${10 + i * 66}" y="160" width="30" height="3" fill="#fff"/>`).join('')}`;
  const mesaCphs = (x, y, w) => `<rect x="${x}" y="${y - 40}" width="${w}" height="6" fill="#8D6E63"/><rect x="${x + 6}" y="${y - 34}" width="5" height="34" fill="#6D4C41"/><rect x="${x + w - 11}" y="${y - 34}" width="5" height="34" fill="#6D4C41"/>`;
  const dosificador = (x, y) => `<rect x="${x}" y="${y}" width="28" height="40" rx="4" fill="#fff" stroke="#E65100" stroke-width="2"/><rect x="${x + 6}" y="${y + 6}" width="16" height="20" rx="3" fill="#FF8F00"/>` + TT(x + 14, y + 20, '50', 8, '#fff') + `<rect x="${x + 11}" y="${y + 40}" width="6" height="5" fill="#E65100"/>` + GG('alInDrip', `<circle cx="${x + 14}" cy="${y + 49}" r="2" fill="#FFE0B2" stroke="#E65100" stroke-width=".8"/>`);
  // cable de extensión pelado en el piso, con chispa
  const cablePelado = (x1, x2, y) => `<path d="M${x1},${y} q${(x2 - x1) * .3},-8 ${(x2 - x1) * .5},0 t${(x2 - x1) * .5},0" stroke="#263238" stroke-width="3" fill="none"/><rect x="${f1((x1 + x2) / 2 - 6)}" y="${y - 2}" width="12" height="4" fill="#B87333"/>` + GG('alInBl', rayo((x1 + x2) / 2 + 4, y - 26, .8));
  const enchufe = (x, y) => `<rect x="${x}" y="${y}" width="22" height="16" rx="3" fill="#fff" stroke="#546E7A" stroke-width="1.5"/><circle cx="${x + 7}" cy="${y + 8}" r="2" fill="#263238"/><circle cx="${x + 15}" cy="${y + 8}" r="2" fill="#263238"/>`;
  const esmerilSinProt = (x, y) => H.esmerilBanco(x, y).replace(/<path d="M[^"]*a10,10[^"]*" stroke="#F9A825"[^>]*\/>/g, '').replace(/<rect[^>]*fill="#CFE8F7"[^>]*\/>/g, '');
  const tablaStop = (x, y) => `<polygon points="${[0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = Math.PI / 8 + i * Math.PI / 4; return f1(x + 15 * Math.cos(a)) + ',' + f1(y + 15 * Math.sin(a)); }).join(' ')}" fill="#D7262B" stroke="#fff" stroke-width="2"/>` + TT(x, y + 3.5, 'PARE', 8, '#fff');

  // ===================== DIBUJOS DE LAS LÁMINAS =====================
  // 1 · Bienvenida a Maestranza ALI (ítem 1)
  D('empresa', q => sv2(H.fondo.patio() + H.viga(78, 190, 92, 12) + H.viga(84, 178, 80, 12) + H.plancha(178, 190, 70, 8)
    + W(48, 188, { area: 'taller', s: .9 }) + W(250, 188, { area: 'soldadura', caretaArriba: true, s: .9, flip: true }) + W(290, 190, { area: 'oficina', s: .9, flip: true })
    + (q ? '' : lab(160, 14, 'Maestranza metalmecánica · Los Ángeles', ALI))));

  // 2 · Reglas de oro del taller (ítems 20, 21, 25, 23 y 28)
  D('reglas', q => sv2(H.fondo.taller() + H.torno(172, 165) + W(110, 165, { area: 'taller' })
    + (q ? '' : lab(160, 20, 'Nunca intervengas equipos en movimiento', ROJO, 10) + lab(78, 44, 'Lentes en todo momento', AZUL, 10) + lab(78, 66, 'Sin joyas ni ropa suelta', ROJO, 10)
      + lab(160, 182, 'Vías peatonales y 5 km/h', VERDE))));

  // 3 · Ley 16.744 (ítem 2)
  D('ley', q => sv2(H.fondo.taller() + escudo(236, 84) + W(40, 165, { area: 'taller' }) + W(84, 165, { area: 'soldadura' }) + W(128, 165, { area: 'oficina' })
    + (q ? '' : GG('alInPu', `<circle cx="198" cy="152" r="12" fill="#fff" stroke="${ROJO}" stroke-width="2"/><path d="M198,145 v14 M191,152 h14" stroke="${ROJO}" stroke-width="4"/>`)
      + `<circle cx="236" cy="152" r="12" fill="#fff" stroke="${VERDE}" stroke-width="2"/><path d="M230,158 l3,-8 l3,4 l3,-9" stroke="${VERDE}" stroke-width="2.5" fill="none"/><circle cx="274" cy="152" r="12" fill="#fff" stroke="#F9A825" stroke-width="2"/>` + TT(274, 157, '$', 14, '#F9A825')
      + lab(86, 34, 'Todos protegidos', AZUL))));

  // 4 · Por qué ocurren los accidentes: acción y condición insegura (Ev)
  D('causas', q => sv2(H.fondo.taller() + H.mesaSoldar(92, 165, 60) + H.viga(98, 115, 50, 8) + W(66, 165, { area: 'taller', pose: 'lift2', glasses: false, face: 'worried' }) + H.esmerilMano(80, 110, 14, true)
    + `<line x1="160" y1="8" x2="160" y2="196" stroke="#fff" stroke-width="4"/>` + aceite(232, 182, 42) + madera(186, 176, 50, -8) + W(282, 165, { area: 'taller', pose: 'walk', flip: true, face: 'worried' })
    + (q ? '' : H.no(24, 70, 12) + lab(80, 24, 'Acción insegura', ROJO) + lab(240, 24, 'Condición insegura', NAR))));

  // 5 · Política de prevención y Comité Paritario (ítem 3 y Ev)
  D('politica', q => sv2(H.fondo.oficina() + papel(18, 22, 100, 112, q ? '' : 'POLÍTICA SST', ALI)
    + `<path d="M70,124 q8,-6 14,0 t14,-2" stroke="#263238" stroke-width="1.5" fill="none"/>`
    + W(176, 165, { area: 'taller' }) + W(226, 165, { area: 'oficina', flip: true }) + W(276, 165, { area: 'taller', hair: true, flip: true }) + mesaCphs(150, 168, 156)
    + (q ? '' : lab(228, 30, 'Comité Paritario', AZUL) + lab(68, 158, 'Prevenir es tarea de todos', VERDE, 10))));

  // 6 · Si tienes un accidente (ítem 4)
  D('accidente', q => sv2(H.fondo.taller() + W(70, 165, { area: 'taller', pose: 'carry', face: 'pain' }) + GG('alInDrip', drop(86, 126, .4, '#D32F2F'))
    + W(132, 165, Object.assign({ flip: true, pose: 'point' }, jefe))
    + `<rect x="190" y="70" width="120" height="62" rx="6" fill="#fff" stroke="${VERDE}" stroke-width="3"/><path d="M214,86 v24 M202,98 h24" stroke="${VERDE}" stroke-width="7"/>` + TT(268, 96, 'ACHS', 15, VERDE) + (q ? '' : TT(268, 118, '1404', 16, ROJO))
    + (q ? '' : bubble(8, 30, 'Me corté', 80) + lab(250, 152, 'Grave: llama al 1404', ROJO) + lab(100, 186, 'Avisa de inmediato a tu jefatura', AZUL))));

  // 7 · Tus EPP (ítems 5 y 18)
  D('epp', q => { const X = 150, Y = 188, s = 1.25;
    let g = H.fondo.taller() + W(X, Y, { area: 'taller', s, muffs: 'on', gloves: '#8D6E63', boots: '#263238' });
    if (!q) g += [['Lentes de seguridad', 155, 92, 70], ['Ropa abotonada', 142, 126, 116], ['Zapatos de seguridad', 140, 182, 178]].map(([t, x2, y2, y]) => { const w = t.length * 6.3 + 14; return `<line x1="${f1(w + 4)}" y1="${y}" x2="${x2}" y2="${y2}" stroke="${AZUL}" stroke-width="1.5"/>` + lab(w / 2 + 4, y, t, AZUL, 10.5); }).join('')
      + [['Protector auditivo', 146, 96, 62], ['Guantes', 166, 144, 132]].map(([t, x2, y2, y]) => { const w = t.length * 6.3 + 14; return `<line x1="${f1(316 - w)}" y1="${y}" x2="${x2}" y2="${y2}" stroke="${AZUL}" stroke-width="1.5"/>` + lab(316 - w / 2, y, t, AZUL, 10.5); }).join('')
      + lab(262, 182, 'Casco donde se exige', NAR, 10);
    return sv2(g); });

  // 8 · Máquinas y herramientas (ítems 6 y 19)
  D('maquinas', q => sv2(H.fondo.taller() + H.torno(160, 165, { gira: false }) + papel(14, 96, 30, 38, '', AZUL) + W(64, 165, Object.assign({ pose: 'point' }, jefe)) + W(120, 165, { area: 'taller', flip: true })
    + (q ? '' : lab(160, 24, 'Solo si te capacitaron y autorizaron', ROJO) + lab(230, 184, 'Revísala antes de usarla', VERDE))));

  // 9 · Atrapamiento, joyas y ropa suelta (ítems 21 y 25)
  D('atrapa', q => sv2(H.fondo.taller() + H.torno(10, 165) + W(168, 165, { area: 'taller', pose: 'lift2', flip: true, loose: true })
    + (q ? '' : H.no(206, 118, 12) + prohJoyas(270, 40) + lab(250, 76, 'Sin anillos ni cadenas', ROJO, 10) + lab(80, 24, 'Ropa ajustada y abotonada', AZUL) + lab(160, 186, 'Nunca toques una pieza que gira', ROJO))));

  // 10 · Intervención segura de equipos: detener, bloquear y etiquetar (ítems 20 y 21)
  D('bloqueo', q => sv2(H.fondo.taller() + H.torno(150, 165, { gira: false }) + H.tablero(26, 64, true) + W(104, 165, { area: 'mantencion', pose: 'point', flip: true })
    + (q ? '' : lab(236, 16, '1 Detén el equipo', AZUL, 10) + lab(236, 36, '2 Corta y bloquea la energía', AZUL, 10) + lab(236, 56, '3 Pon tu tarjeta', AZUL, 10) + lab(110, 186, '4 Verifica que no parte', VERDE))));

  // 11 · Proyección de partículas: lentes en todo momento (ítem 20)
  D('particulas', q => sv2(H.fondo.taller() + H.mesaSoldar(150, 165, 90) + H.viga(156, 115, 78, 10) + W(130, 165, { area: 'taller', pose: 'lift2', gloves: '#8D6E63' }) + H.esmerilMano(140, 110, 10, true)
    + W(46, 165, { area: 'taller', pose: 'walk', anim: 'alInBob' })
    + (q ? '' : lab(160, 24, 'Lentes de seguridad en todo momento', AZUL) + lab(60, 60, 'También al caminar', VERDE, 10))));

  // 12 · Cortes (ítem 19)
  D('cortes', q => sv2(H.fondo.taller() + H.guillotina(176, 165) + W(96, 165, { area: 'taller', pose: 'carry', gloves: '#8D6E63' })
    + `<rect x="64" y="111" width="80" height="5" fill="#90A4AE" stroke="#263238"/>`
    + (q ? '' : lab(70, 30, 'Guantes de cuero', AZUL) + lab(104, 56, 'Bordes con filo', ROJO, 10) + lab(240, 186, 'Manos fuera de la cuchilla', ROJO, 10))));

  // 13 · Golpes y herramientas mal ubicadas; orden y limpieza (ítems 18 y 30)
  D('golpes', q => sv2(H.fondo.taller() + puerta(20, 165, true) + panelHerr(112, 58) + H.mesaSoldar(110, 165, 92) + H.letrero(262, 62, 'obligacion', q ? '' : 'CASCO', 40)
    + W(236, 165, { area: 'taller', helmet: true, pose: 'walk' })
    + (q ? '' : lab(60, 186, 'Puerta asegurada', VERDE, 10) + lab(156, 36, 'Cada cosa en su lugar', VERDE, 10) + lab(232, 186, 'Casco donde se exige', NAR, 10))));

  // 14 · Caídas al mismo nivel (ítem 16)
  D('caidas', q => sv2(H.fondo.taller() + aceite(90, 182, 40) + zunchos(196, 180) + madera(236, 190, 60, -6)
    + W(160, 165, { area: 'taller', pose: 'walk', face: 'worried' })
    + (q ? '' : lab(160, 22, 'Piso libre de aceite, zunchos y maderas', ROJO) + lab(260, 66, 'No corras ni saltes', AZUL, 10) + lab(80, 66, 'Avisa las fallas del piso', VERDE, 10))));

  // 15 · Caídas de distinto nivel y trabajo en altura (ítem 17 y Ev)
  D('altura', q => { const yd = 97, s = .75;
    let g = H.fondo.taller() + `<rect x="150" y="${yd}" width="140" height="5" fill="#FFC20E" stroke="#263238"/>` + [152, 218, 284].map(x => `<rect x="${x}" y="${yd + 5}" width="4" height="${163 - yd}" fill="#78909C"/>`).join('')
      + `<path d="M156,${yd + 5} L218,165 M218,${yd + 5} L284,165" stroke="#90A4AE" stroke-width="2"/>`
      + `<rect x="150" y="${yd - 40}" width="140" height="4" fill="#FFC20E"/><rect x="150" y="${yd - 20}" width="140" height="3" fill="#FFC20E"/><rect x="150" y="${yd - 40}" width="4" height="40" fill="#FFC20E"/><rect x="286" y="${yd - 40}" width="4" height="40" fill="#FFC20E"/>`
      + W(214, yd, { area: 'mantencion', s, helmet: true }) + arnes(214, yd, s) + `<path d="M214,${f1(yd - 60 * s)} q10,-24 26,-30" stroke="#FF6F00" stroke-width="2" fill="none"/><circle cx="240" cy="${f1(yd - 75 * s - 10)}" r="3" fill="#263238"/>`
      + W(70, 165, { area: 'taller', pose: 'point' });
    if (!q) g += `<path d="M126,165 V${yd}" stroke="${ROJO}" stroke-width="2"/><path d="M120,165 h12 M120,${yd} h12" stroke="${ROJO}" stroke-width="2"/>` + TT(124, 136, '1,8 m', 10, ROJO, 'end')
      + lab(70, 36, 'Sobre 1,8 m: arnés', ROJO) + lab(220, 186, 'Examen de altura vigente', AZUL);
    return sv2(g); });

  // 16 · Manejo manual de carga y Ley 20.949 (ítems 9 y 15)
  D('carga', q => sv2(H.fondo.bodega() + W(60, 165, { area: 'taller', pose: 'carry', gloves: '#8D6E63' }) + box(58, 120, 30, 20) + W(140, 165, { area: 'taller', pose: 'carry', hair: true, gloves: '#8D6E63' }) + box(140, 122, 24, 16, '', '#E0C08A')
    + `<rect x="246" y="22" width="4" height="10" fill="#455A64"/>` + H.tecle(248, 30, 56) + H.eslinga(248, 110, 220, 276, 136) + H.viga(206, 148, 84, 12)
    + (q ? '' : lab(60, 40, 'Hombres: 25 kg', AZUL, 10) + lab(150, 62, 'Mujeres: 20 kg', '#AD1457', 10) + lab(248, 182, 'Más peso: tecle o ayuda', VERDE, 10))));

  // 17 · Sobrecarga postural y TMERT (ítems 10 y 14)
  D('tmert', q => sv2(H.fondo.taller() + W(90, 165, { area: 'taller', pose: 'squat', gloves: '#8D6E63' }) + box(100, 165, 30, 22, '', '#90A4AE')
    + W(236, 165, { area: 'taller', pose: 'stop', flip: true, anim: 'alInBob' })
    + (q ? '' : lab(100, 34, 'Piernas flectadas, espalda recta', AZUL, 10) + lab(236, 62, 'Pausa activa', VERDE))));

  // 18 · Ruido (PREXOR) (ítems 11 y 22)
  D('ruido', q => sv2(H.fondo.taller() + H.mesaSoldar(100, 165, 96) + H.viga(106, 115, 84, 10) + W(84, 165, { area: 'taller', pose: 'lift2', muffs: 'on', gloves: '#8D6E63' }) + H.esmerilMano(94, 110, 10, true)
    + GG('alInBl', waves(196, 104, 3, '#E53935')) + meter(254, 112, '95')
    + (q ? '' : lab(110, 26, 'Protector auditivo todo el tiempo', AZUL) + lab(282, 130, 'decibeles', '#455A64', 9))));

  // 19 · Radiación UV solar (ítems 12 y 24)
  D('uv', q => sv2(H.fondo.patio() + dosificador(214, 96) + W(262, 188, { area: 'taller' }) + legion(262, 115) + sol(40, 38)
    + (q ? '' : lab(214, 16, 'Bloqueador FPS 50', '#E65100') + lab(112, 190, 'Manga larga, legionario, lentes UV', AZUL, 10))));

  // 20 · Riesgo eléctrico (ítem 26)
  D('electrico', q => sv2(H.fondo.taller() + H.tablero(24, 58, false) + enchufe(150, 112) + `<path d="M161,128 q0,20 -8,37" stroke="#263238" stroke-width="3" fill="none"/>` + cablePelado(150, 290, 176)
    + W(108, 165, { area: 'taller', pose: 'point' })
    + (q ? '' : lab(170, 22, 'Avisa de inmediato toda falla eléctrica', ROJO, 10) + lab(250, 120, 'Manos secas', AZUL))));

  // 21 · Trabajos en caliente: soldadura y oxicorte (ítems 27 y 33)
  D('caliente', q => sv2(H.fondo.soldadura() + H.maqSoldar(18, 165) + H.mesaSoldar(74, 165, 104) + H.viga(96, 115, 76, 8) + H.extractor(132, 98)
    + W(98, 165, { area: 'soldadura', pose: 'lift2', careta: true }) + H.arco(130, 113) + H.chispas(130, 114)
    + H.cilindro(210, 165, 'argon') + H.cilindro(236, 165, 'mezcla') + H.cadena(206, 104, 260) + H.extintor(282, 165, 'PQS', .8)
    + (q ? '' : lab(242, 30, 'Extracción de humos', AZUL, 10) + lab(234, 50, 'Cilindros amarrados', VERDE, 10) + lab(130, 186, 'Extintor a mano y sin combustibles', ROJO, 10))));

  // 22 · Incendios y uso del extintor (ítem 27 y Ev)
  D('incendio', q => { const spray = `<g class="alInSw" style="transform-origin:198px 98px"><path d="M198,98 L262,140 L254,162Z" fill="#ECEFF1" opacity=".85"/></g>`;
    return sv2(H.fondo.taller() + H.plancha(232, 165, 70, 6) + GG('alInFl', fire(262, 162, .7))
      + W(170, 165, { area: 'taller', pose: 'lift2' }) + `<g transform="rotate(-10 176 127)">${H.extintor(166, 145, 'PQS', .8)}</g><path d="M182,99 q8,-4 14,-2" stroke="#263238" stroke-width="3" fill="none"/>` + spray
      + (q ? '' : lab(72, 22, '1 Retira el seguro', ROJO, 10) + lab(72, 44, '2 Acércate al fuego', ROJO, 10) + lab(72, 66, '3 Acciona el gatillo', ROJO, 10) + lab(72, 88, '4 Apunta a la base', ROJO, 10))); });

  // 23 · Señalización y vías peatonales (ítems 8 y 23)
  const via = () => `<rect y="170" width="320" height="22" fill="#A5D6A7" opacity=".55"/><rect y="168" width="320" height="3" fill="#FFC20E"/><rect y="191" width="320" height="3" fill="#FFC20E"/>` + [40, 150, 260].map(x => `<circle cx="${x}" cy="176" r="2.5" fill="#fff"/><path d="M${x},179 v6 M${x - 3},189 l3,-4 l3,4 M${x - 3},181 h6" stroke="#fff" stroke-width="1.6"/>`).join('');
  D('senal', q => sv2(H.fondo.taller({ vias: false }) + via() + H.letrero(26, 64, 'obligacion', q ? '' : 'LENTES', 40) + H.letrero(74, 64, 'advertencia', q ? '' : 'RIESGO', 40) + H.letrero(122, 64, 'prohibicion', q ? '' : 'NO PASAR', 40)
    + zseg(212, 64) + `<rect x="258" y="104" width="4" height="60" fill="#455A64"/>` + W(176, 184, { area: 'taller', pose: 'walk', anim: 'alInBob' })
    + (q ? '' : lab(84, 30, 'Respeta la señalización', AZUL) + lab(90, 150, 'Camina por la vía peatonal', VERDE, 10))));

  // 24 · Sismo, zona de seguridad y niño solo (ítem 8 y Ev)
  D('emergencia', q => sv2(H.fondo.patio() + GG('alInSh', `<path d="M14,60 l-6,8 l6,8 l-6,8 M286,60 l6,8 l-6,8 l6,8" stroke="${ROJO}" stroke-width="3" fill="none"/>`)
    + `<rect x="232" y="100" width="4" height="88" fill="#455A64"/>` + zseg(186, 60)
    + W(206, 190, { area: 'taller', s: .85 }) + W(276, 192, { area: 'soldadura', s: .85, flip: true }) + W(250, 194, { area: 'oficina', s: .85, flip: true, hair: true })
    + W(76, 190, { area: 'taller', s: .9, pose: 'walk' }) + W(98, 190, { area: 'oficina', s: .5, shirt: '#FFB300', pants: '#1565C0', pose: 'walk' })
    + (q ? '' : lab(160, 16, 'Sismo: ve a la zona de seguridad y espera ahí', ROJO, 10) + lab(80, 96, 'Niño solo: a zona segura', AZUL, 10))));

  // 25 · Grúa horquilla y cruces (ítems 13, 23 y 29)
  D('horquilla', q => sv2(H.fondo.patio() + H.horquilla(24, 186, { carga: H.palletPiezas(97, 172) }) + GG('alInBl', waves(140, 112, 2, AZUL))
    + `<rect x="176" y="96" width="44" height="92" fill="#78909C" stroke="#455A64" stroke-width="2"/>${[0, 1, 2, 3].map(i => `<line x1="176" y1="${116 + i * 20}" x2="220" y2="${116 + i * 20}" stroke="#455A64" stroke-width="1.5"/>`).join('')}`
    + W(252, 188, { area: 'taller', pose: 'stop', flip: true, vest: true })
    + (q ? '' : lab(84, 44, 'Solo operador autorizado', AZUL, 10) + lab(226, 16, 'Poca visibilidad: detente y mira', ROJO, 10))));

  // 26 · Puente grúa y cargas suspendidas (ítems 13 y 29)
  D('puente', q => sv2(H.fondo.taller() + H.puenteGrua(160, 92, H.eslinga(160, 96, 120, 200, 140) + H.viga(110, 152, 100, 12)) + H.zonaCarga(115, 90)
    + W(44, 165, { area: 'taller', pose: 'point', helmet: true }) + W(280, 165, { area: 'taller', pose: 'stop', flip: true, helmet: true })
    + (q ? '' : lab(62, 62, 'Solo personal autorizado', AZUL, 10) + lab(262, 62, 'Nunca bajo la carga', ROJO, 10))));

  // 27 · Vehículos dentro y fuera de la empresa (ítems 28 y 29)
  D('vehiculos', q => sv2(H.fondo.patio() + camioneta(16, 190) + GG('alInSl', arr(214, 120, 240, 120, ROJO, 3), '--dx:8px') + W(262, 190, { area: 'taller', pose: 'stop', flip: true, vest: true }) + velocidad(300, 190, '5', q)
    + (q ? '' : lab(110, 16, 'Retrocede solo con señalero', ROJO, 10) + lab(110, 38, 'Sin celular · luces encendidas', AZUL, 10))));

  // 28 · Accidente de trayecto (ítem 31)
  D('trayecto', q => sv2(trayectoFondo() + casa(10, 150) + galpon(210, 150, 100)
    + GG('alInSl', bici(106, 186) + W(130, 168, { area: 'oficina', helmet: '#1E88E5', pose: 'squat' }) + `<circle cx="160" cy="142" r="3.5" fill="#FFF59D" stroke="#F9A825"/><circle cx="104" cy="150" r="3" fill="#E53935"/>`, '--dx:22px') + arr(84, 84, 196, 84, VERDE, 3)
    + (q ? '' : lab(150, 22, 'Trayecto directo, sin desvíos', AZUL) + lab(250, 186, 'Sin audífonos ni celular', ROJO, 10))));

  // 29 · Ley Karin (ítems 7 y 32)
  D('karin', q => { let g = H.fondo.oficina() + W(110, 165, { area: 'taller', shirt: '#6D4C41', pose: 'point' }) + W(196, 165, { area: 'taller', flip: true, face: 'worried' });
    g += GG('alInPu', `<path d="M154,${q ? 60 : 98} c-10,-14 -26,-2 -14,10 l14,12 l14,-12 c12,-12 -4,-24 -14,-10z" fill="#E91E63"/>`);
    if (!q) g += [[56, 'Formulario'], [160, 'Canal escrito'], [264, 'Presencial']].map(([x, s], i) => `<rect x="${x - 46}" y="14" width="92" height="52" rx="8" fill="#fff" stroke="${AZUL}" stroke-width="2"/>`
      + (i === 0 ? papel(x - 12, 20, 24, 28, '', ALI) : i === 1 ? `<rect x="${x - 15}" y="22" width="30" height="20" fill="#FFF8E1" stroke="#F9A825" stroke-width="2"/><path d="M${x - 15},22 l15,12 l15,-12" stroke="#F9A825" stroke-width="2" fill="none"/>` : W(x - 8, 50, { s: .3, area: 'oficina' }) + W(x + 8, 50, { s: .3, area: 'oficina', flip: true }))
      + TT(x, 60, s, 10, AZUL)).join('') + `<rect x="258" y="112" width="26" height="20" rx="4" fill="#D4A537"/><path d="M263,112 v-6 a8,8 0 0 1 16,0 v6" stroke="#455A64" stroke-width="3" fill="none"/>` + TT(271, 148, 'Confidencial', 11, ROJO) + lab(160, 186, 'Buen trato siempre', VERDE);
    return sv2(g); });

  // 30 · Riesgos de tu puesto (IRL, DS 44)
  D('puesto', q => { const R = [['Partículas', '#1565C0'], ['Atrapamiento', '#00897B'], ['Cortes', ROJO], ['Ruido', '#6A1B9A']];
    return sv2(H.fondo.oficina() + W(50, 165, Object.assign({ pose: 'point' }, jefe)) + papel(66, 84, 44, 54, 'IRL', ALI) + W(146, 165, { flip: true, area: 'taller' })
      + R.map(([s, c], i) => `<rect x="190" y="${10 + i * 38}" width="124" height="32" rx="6" fill="#fff" stroke="${c}" stroke-width="2"/>` + diamond(206, 26 + i * 38, 9, '!') + TT(222, 30 + i * 38, q ? '' : s, 10, '#263238', 'start')).join('')); });

  // 31 · Procedimientos de trabajo seguro y Reglamento Interno (ítem 33)
  D('pts', q => { const cols = [AZUL, ROJO, VERDE, NAR, '#6A1B9A', '#455A64', ALI];
    const nom = ['Tránsito peatonal', 'Trabajos en caliente', 'Trabajos en altura', 'Plan de emergencia', 'Grúa horquilla', 'Máquinas y herramientas', 'Reglamento Interno'];
    let g = H.fondo.oficina() + `<rect x="8" y="12" width="304" height="76" fill="#8D6E63"/><rect x="8" y="86" width="304" height="6" fill="#5D4037"/>`;
    for (let i = 0; i < 7; i++) { const x = 12 + i * 43; g += `<rect x="${x}" y="16" width="39" height="68" rx="2" fill="${cols[i]}"/>` + (q ? '' : nom[i].split(' ').slice(0, 3).map((w, k) => TT(x + 19.5, 36 + k * 12, w, w.length > 9 ? 6.4 : 7.5, '#fff')).join('')); }
    g += W(90, 165, Object.assign({ pose: 'point' }, jefe)) + papel(106, 100, 32, 40, '', AZUL) + W(170, 165, { flip: true, area: 'taller' }) + W(222, 165, { flip: true, area: 'soldadura' }) + W(270, 165, { flip: true, area: 'oficina', hair: true });
    return sv2(g); });

  // ===================== LÁMINAS =====================
  const PUESTO_X = 'La empresa debe informarte los <b>riesgos de tu puesto</b>, sus <b>consecuencias</b> y las <b>medidas</b> para controlarlos (DS 44). Lo hace al ingresar y cada vez que cambie tu puesto o tus tareas. Los principales en Maestranza ALI:<ul>'
    + Object.keys(window.SI_IND_PUESTO).map(k => window.SI_IND_PUESTO[k]).join('') + window.SI_IND_TRANSV.ali + '</ul>';
  const learn = [
    { s: 'al_in_empresa', t: 'Te damos la bienvenida a Maestranza ALI',
      x: '<b>Maestranza ALI S.A.</b> es una maestranza metalmecánica de <b>Los Ángeles</b>, en la Región del Biobío. Fabricamos y reparamos <b>piezas y estructuras de acero</b>:<ul><li><b>Máquinas herramientas:</b> tornos, fresas, taladros, sierras, guillotina, plegadora y prensa.</li><li><b>Soldadura y corte:</b> arco, MIG, TIG, oxicorte y plasma.</li><li><b>Granallado y pintura</b> de piezas y estructuras.</li><li><b>Movimiento de cargas</b> con puente grúa, tecles y grúa horquilla.</li><li><b>Trabajos en faenas</b> de nuestros clientes.</li></ul>Esta inducción te explica los riesgos de la maestranza y cómo trabajar sin accidentes.' },
    { s: 'al_in_reglas', t: 'Las reglas de oro del taller',
      x: 'Desde que entras a la maestranza y mientras estés en ella:<ul><li><b>Lentes de seguridad en todo momento</b>, también cuando solo vas caminando.</li><li>Ropa de trabajo <b>ajustada y abotonada</b>, zapatos de seguridad y el EPP de tu tarea.</li><li><b>Sin anillos, aros colgantes, cadenas, pulseras</b> ni ropa o pelo suelto.</li><li><b>Prohibido intervenir, limpiar o reparar un equipo en movimiento.</b></li><li>Solo usas las máquinas para las que te <b>capacitaron y autorizaron</b>.</li><li>Caminas por las <b>vías peatonales</b>; los vehículos van a <b>5 km/h</b>.</li><li>Todo accidente y toda condición insegura se <b>avisa de inmediato</b>.</li></ul>',
      k: 'Lentes siempre, sin joyas y nunca intervengas un equipo en movimiento.' },
    { s: 'al_in_ley', t: 'Ley 16.744: estás protegido',
      x: 'Todos los trabajadores de Maestranza ALI están protegidos por el seguro de la <b>Ley 16.744</b>. Nuestra mutualidad es la <b>ACHS</b>.<ul><li><b>Accidente del trabajo:</b> toda lesión que sufres <b>a causa o con ocasión del trabajo</b> y que te produce incapacidad o muerte.</li><li><b>Accidente de trayecto:</b> el que ocurre en el <b>trayecto directo</b>, de ida o regreso, entre tu casa y el trabajo.</li><li><b>Enfermedad profesional:</b> la causada en forma directa por el trabajo, por ejemplo, la sordera por ruido.</li></ul>El seguro cubre la <b>atención médica</b>, la <b>rehabilitación</b> y las <b>prestaciones económicas</b>, como el pago de los días de licencia.' },
    { s: 'al_in_causas', t: 'Por qué ocurren los accidentes',
      x: 'Los accidentes no son mala suerte: ocurren por <b>acciones inseguras</b> y <b>condiciones inseguras</b>.<ul><li><b>Acción insegura:</b> lo que <b>hace una persona</b> sin seguridad. Por ejemplo, esmerilar sin lentes, sacar una protección o correr por el taller.</li><li><b>Condición insegura:</b> lo que <b>está mal en el lugar</b>. Por ejemplo, aceite en el piso, un cable pelado o una máquina sin protección.</li></ul>Si ves una condición insegura, <b>infórmala de inmediato a tu supervisor</b>. El primer responsable de tu seguridad <b>eres tú</b>.' },
    { s: 'al_in_politica', t: 'Política de prevención y Comité Paritario',
      x: 'Maestranza ALI tiene una <b>Política de Prevención de Riesgos</b> que se te da a conocer en esta inducción: su propósito es <b>prevenir accidentes y enfermedades</b>, cumplir la normativa y mejorar siempre las condiciones de trabajo, con la participación de todos.<ul><li>El <b>Comité Paritario de Higiene y Seguridad</b> es el <b>organismo técnico de participación</b> entre la empresa y los trabajadores: detecta riesgos, investiga accidentes y promueve la prevención.</li><li>Tú participas cumpliendo las normas e informando los peligros.</li></ul>La prevención <b>no es pérdida de tiempo</b>: es parte de hacer bien el trabajo.' },
    { s: 'al_in_accidente', t: 'Si tienes un accidente del trabajo o de trayecto',
      x: '<ul><li><b>Accidente leve</b> (por ejemplo, un corte pequeño): avisa <b>de inmediato</b> a tu supervisión o jefatura, aunque parezca nada.</li><li><b>Accidente grave</b>: avisa a la supervisión y llama a la <b>ACHS al 1404</b>, las 24 horas. Es grave, por ejemplo, una amputación, una caída de más de 1,8 metros o el que obliga a maniobras de rescate o reanimación.</li><li>La jefatura te deriva a la <b>ACHS</b> para tu atención.</li><li>Si el accidente es <b>de trayecto</b>, avisa apenas puedas y acude a la ACHS.</li></ul>Avisar a tiempo te asegura la atención del seguro y permite corregir la causa.',
      k: 'Todo accidente se avisa de inmediato. Grave: 1404 ACHS.' },
    { s: 'al_in_epp', t: 'Tus EPP: úsalos y cuídalos',
      x: 'En la maestranza trabajas <b>siempre con toda tu implementación de seguridad</b>. Te cuidas y usas tus EPP porque <b>es tu responsabilidad</b>.<ul><li>Siempre: <b>lentes de seguridad</b>, <b>zapatos de seguridad</b> y ropa de trabajo.</li><li>Según la tarea: <b>guantes</b>, <b>protector auditivo</b>, careta de soldar, chaqueta de descarne, respirador.</li><li><b>Casco</b> en las áreas definidas, como bajo el puente grúa o en las faenas de los clientes.</li><li>Cuídalos y guárdalos limpios. Si se dañan o pierden su protección, <b>pide la reposición</b> de inmediato.</li></ul>' },
    { s: 'al_in_maquinas', t: 'Máquinas y herramientas',
      x: '<ul><li>Opera solo las máquinas y herramientas para las que te <b>capacitaron y autorizaron</b>.</li><li>Antes de usarlas, <b>revísalas</b>: protecciones puestas, parada de emergencia funcionando, cables y discos en buen estado.</li><li>Una <b>herramienta defectuosa no se usa</b>: sepárala y avisa.</li><li>Usa cada herramienta para lo que fue hecha, nunca improvisada.</li><li>Si no entiendes cómo funciona una máquina, <b>consulta a tu jefe directo</b> antes de usarla.</li></ul>Sigue el procedimiento de operación de máquinas y herramientas.' },
    { s: 'al_in_atrapa', t: 'Atrapamientos, joyas y ropa suelta',
      x: 'El torno, la fresa, el taladro, los rodillos y las correas pueden <b>atrapar</b> la ropa, el pelo, un guante o una joya y arrastrar tu mano o tu brazo: <b>fracturas y amputaciones</b>.<ul><li>Está <b>estrictamente prohibido</b> usar <b>anillos, aros colgantes, gargantillas, pulseras</b> y accesorios en toda labor dentro de la empresa.</li><li>Ropa <b>ajustada al cuerpo, abotonada</b> y en buen estado; pelo tomado.</li><li><b>Nunca</b> limpies, midas ni toques una pieza mientras gira.</li><li>Prohibida toda intervención o mantención de equipos en movimiento.</li></ul>',
      k: 'Nunca toques ni limpies un equipo en movimiento.' },
    { s: 'al_in_bloqueo', t: 'Intervención segura de equipos',
      x: 'Para limpiar, destrabar, ajustar o reparar una máquina se sigue el <b>procedimiento de intervención segura de equipos</b>:<ul><li><b>1.</b> Detén el equipo y avisa a quienes trabajan cerca.</li><li><b>2.</b> Corta la energía y pon tu <b>candado de bloqueo</b>.</li><li><b>3.</b> Pon tu <b>tarjeta</b> de "no operar".</li><li><b>4.</b> Verifica que no parte antes de meter las manos.</li></ul>La viruta se saca con <b>gancho o escobilla</b>, nunca con la mano. Si no sabes cómo bloquear un equipo, pregunta a tu jefatura.' },
    { s: 'al_in_particulas', t: 'Proyección de partículas: lentes en todo momento',
      x: 'Esmerilar, cortar, tornear, soldar y granallar lanza partículas, viruta y chispas que pueden causar <b>cuerpos extraños en el ojo, lesiones oculares, conjuntivitis y erosiones</b>.<ul><li>Usa <b>lentes de seguridad en todo momento</b> en el lugar de trabajo y al desplazarte dentro de la maestranza, aunque no estés operando.</li><li>Para esmerilar, agrega <b>careta facial</b> si la tarea lo exige.</li><li>Protecciones de las máquinas siempre puestas.</li><li>Orienta las chispas lejos de las personas.</li></ul>' },
    { s: 'al_in_cortes', t: 'Cortes',
      x: 'Las planchas, perfiles, rebabas, la viruta, la guillotina y los discos pueden causar <b>heridas y amputaciones</b>.<ul><li>Usa <b>guantes</b> al manipular planchas y piezas, y mantenlos en buen estado.</li><li>Máquinas y herramientas <b>en buen estado y bien usadas</b>.</li><li>Manos <b>siempre fuera</b> de la línea de corte de la guillotina, la plegadora y la prensa.</li><li>Si no entiendes el funcionamiento de un equipo, <b>consulta a tu jefe directo</b>.</li><li>Avisa toda falla.</li></ul>' },
    { s: 'al_in_golpes', t: 'Golpes, orden y limpieza',
      x: 'Los golpes con piezas, estructuras y herramientas mal ubicadas causan <b>contusiones, fracturas e incluso la muerte</b>.<ul><li>El orden y la limpieza son parte del trabajo: <b>cada herramienta y material en su lugar</b>, nunca en el borde de una mesa ni en una vía de paso.</li><li>Áreas despejadas de herramientas y obstáculos.</li><li>Las <b>puertas, aseguradas a su sujeta puertas</b>, para que no se cierren con el viento.</li><li>Usa <b>casco</b> en las áreas definidas.</li><li>Avisa toda anomalía.</li></ul>' },
    { s: 'al_in_caidas', t: 'Caídas al mismo nivel',
      x: 'Los resbalones y tropiezos causan <b>esguinces, fracturas y golpes</b>.<ul><li>Mantén las superficies de tránsito <b>libres de obstáculos, aceites, maderas y zunchos</b>.</li><li>Si derramas aceite, límpialo de inmediato.</li><li>Informa a tu jefe directo las <b>fallas del piso</b>.</li><li>Camina solo por los <b>lugares autorizados</b>.</li><li><b>No corras ni saltes</b> obstáculos, tampoco en las escaleras.</li></ul>' },
    { s: 'al_in_altura', t: 'Caídas de distinto nivel y trabajo en altura',
      x: 'Una caída desde una escala, una estructura o un vehículo puede causar <b>esguinces, fracturas, lesiones múltiples o la muerte</b>.<ul><li>Es trabajo en altura <b>sobre 1,8 metros</b>: arnés de seguridad anclado y procedimiento de trabajo en altura.</li><li><b>Sin examen de altura vigente, no trabajas en altura.</b></li><li>No subas ni trepes a superficies no aptas, como piezas, estanterías o la grúa horquilla.</li><li>Respeta las señales y usa las <b>barandas</b> de las escaleras.</li><li>No corras ni saltes.</li></ul>',
      k: 'Sobre 1,8 metros: arnés y examen de altura vigente.' },
    { s: 'al_in_carga', t: 'Manejo manual de carga (Ley 20.949)',
      x: 'La <b>Ley 20.949</b> fija el peso máximo que una persona puede levantar sin ayuda mecánica: <b>25 kilos los hombres</b> y <b>20 kilos las mujeres</b>. Las <b>embarazadas</b> y los <b>menores de 18 años</b> no pueden levantar carga.<ul><li>Conoce la pieza antes de tomarla: peso, bordes, aceite.</li><li><b>Dobla las rodillas, espalda recta</b> y haz la fuerza con las piernas.</li><li>La carga <b>nunca debe tapar tu visibilidad</b>; mira dónde caminas y a tus compañeros.</li><li>Guantes y zapatos de seguridad.</li><li>Sobre el peso máximo: <b>tecle, puente grúa, carro o ayuda</b>.</li></ul>' },
    { s: 'al_in_tmert', t: 'Posturas y tareas repetitivas (TMERT)',
      x: 'El protocolo <b>TMERT</b> vigila los <b>trastornos musculoesqueléticos</b>: lesiones de espalda, cuello, hombros, brazos y manos por posturas forzadas, movimientos repetitivos y esfuerzos, como agacharse a soldar o esmerilar piezas bajas. Pueden causar <b>lumbagos y tendinitis</b>.<ul><li>Al agacharte, siempre con las <b>piernas flectadas</b>.</li><li>Haz las <b>pausas activas</b> durante la jornada, según el programa de tu área.</li><li>Acerca la pieza a una altura cómoda.</li><li>Avisa cualquier molestia o dolor.</li></ul>' },
    { s: 'al_in_ruido', t: 'Ruido (PREXOR)',
      x: 'El esmeril, el martillo, el corte y el granallado hacen mucho ruido. El ruido fuerte produce <b>pérdida de la capacidad auditiva</b> que <b>no se recupera</b>. El protocolo <b>PREXOR</b> vigila a los trabajadores expuestos.<ul><li>Usa el <b>protector auditivo en todo momento mientras estés expuesto</b>: puesto sobre las orejas, no en el cuello.</li><li>Respeta las zonas señalizadas.</li><li>Si estás expuesto, asiste a tus <b>audiometrías</b> en la ACHS.</li></ul>' },
    { s: 'al_in_uv', t: 'Radiación ultravioleta del sol',
      x: 'Al trabajar en el patio o en faenas al aire libre, el sol puede causar <b>quemaduras, queratitis, fotoenvejecimiento, cáncer de piel y cataratas</b>, aun con nubes.<ul><li>Usa <b>bloqueador FPS 50</b> de los dosificadores de la empresa y repítelo durante la jornada.</li><li><b>Polera manga larga</b>, lentes con protección UV y <b>legionario</b> (bajo el casco si lo usas).</li><li>Trabaja bajo <b>sombra</b> cuando sea posible.</li><li>Las tareas al sol se programan, en lo posible, fuera de las horas de mayor radiación.</li></ul>' },
    { s: 'al_in_electrico', t: 'Riesgo eléctrico',
      x: 'La electricidad puede causar <b>electrocución, quemaduras e incendios</b>.<ul><li><b>No uses</b> equipos eléctricos con las <b>manos húmedas</b>.</li><li>Avisa <b>de inmediato</b> toda deficiencia eléctrica: cables pelados, enchufes rotos, tableros abiertos.</li><li>Los cables de las máquinas de soldar y las extensiones, sin daños y fuera del paso.</li><li>Solo personal autorizado interviene tableros e instalaciones.</li><li>Los equipos eléctricos tienen <b>mantención periódica</b>.</li></ul>' },
    { s: 'al_in_caliente', t: 'Trabajos en caliente: soldadura y oxicorte',
      x: 'Soldar, oxicortar, cortar con plasma y esmerilar generan <b>chispas, metal caliente, radiación y humos</b>. Sigue el procedimiento de <b>trabajos en caliente</b>:<ul><li>Careta, chaqueta, polainas y guantes de <b>descarne</b>.</li><li>Usa la <b>extracción de humos</b> del taller sobre la soldadura.</li><li>Biombo o cortina para proteger a los demás del arco.</li><li>Área <b>sin combustibles</b> y con <b>extintor a mano</b>.</li><li>Cilindros de gas <b>de pie, amarrados</b> con cadena y con su capuchón.</li></ul>' },
    { s: 'al_in_incendio', t: 'Incendios y uso del extintor',
      x: 'Un incendio causa <b>quemaduras, muerte y pérdida de material</b>.<ul><li><b>Fuma solo en los lugares establecidos</b>.</li><li>Avisa de inmediato lo que pueda provocar fuego.</li><li>Extintores <b>vigentes, despejados y de fácil acceso</b>.</li></ul>Para usar el extintor: <b>uno</b>, retira el seguro; <b>dos</b>, acércate a la zona del fuego; <b>tres</b>, acciona el gatillo; <b>cuatro</b>, dirige la descarga a la <b>base del fuego</b>. Si el fuego no cede, evacúa y llama a Bomberos, al 132.' },
    { s: 'al_in_senal', t: 'Señalización y vías peatonales',
      x: '<ul><li>Respeta y cuida la <b>señalización</b>: no la tapes ni la retires.</li><li>Camina <b>solo por las vías peatonales</b> demarcadas y mantenlas libres.</li><li>No salgas de tu lugar de trabajo si no es necesario.</li><li>Transita con precaución cerca de la maquinaria pesada y los camiones.</li><li>Conoce la <b>zona de seguridad</b> que te muestran en tu recorrido por la maestranza y mantenla despejada.</li></ul>' },
    { s: 'al_in_emergencia', t: 'Sismo, emergencias y zona de seguridad',
      x: 'El <b>Plan de emergencia</b> indica cómo actuar ante un sismo, un incendio u otra emergencia.<ul><li>En un <b>sismo</b>: deja la máquina detenida, aléjate de piezas, estanterías y cargas suspendidas, ve a la <b>zona de seguridad</b> y <b>permanece ahí hasta que la emergencia esté controlada</b>.</li><li>Sigue las instrucciones de tu jefatura y no vuelvas por tus cosas.</li><li>Si ves a un <b>niño solo</b> dentro de la empresa, llévalo a una <b>zona segura</b> y busca a sus padres.</li></ul>' },
    { s: 'al_in_horquilla', t: 'Grúa horquilla y maquinaria pesada',
      x: 'En la maestranza circulan la <b>grúa horquilla</b> y camiones. Un <b>atropello</b> o un golpe con la carga puede causar la muerte.<ul><li>Solo la opera el personal <b>capacitado y autorizado</b>, según su procedimiento.</li><li>En un <b>cruce con poca visibilidad</b>: <b>detente y mira</b> si vienen equipos móviles.</li><li>Mantén distancia y haz contacto visual con el operador.</li><li>Quien apoya la maniobra usa el EPP definido, como el chaleco reflectante.</li><li>Nunca pidas al operador levantar una carga <b>sobre la capacidad</b> de la máquina.</li></ul>' },
    { s: 'al_in_puente', t: 'Puente grúa, tecles y cargas suspendidas',
      x: '<ul><li>El puente grúa y los tecles los opera solo el personal <b>capacitado y autorizado</b>.</li><li>Antes de levantar, revisa eslingas, ganchos y estrobos: los dañados <b>no se usan</b>.</li><li><b>Nunca te pongas ni pases bajo una carga suspendida</b>.</li><li>Guía la carga con un cordel, no con las manos.</li><li>Usa <b>casco</b> en las áreas definidas.</li></ul>' },
    { s: 'al_in_vehiculos', t: 'Vehículos dentro y fuera de la empresa',
      x: 'Si conduces un vehículo de la empresa:<ul><li>Dentro de Maestranza ALI, <b>máximo 5 km/h</b>, sin usar el teléfono.</li><li>Al <b>retroceder</b>, siempre con la indicación de un <b>señalero</b> apto.</li><li>Ingresa con las <b>luces encendidas</b>, respeta las intersecciones y toca la <b>bocina</b> si hay poca visibilidad.</li><li>Estaciona en un lugar apto, <b>en posición de salida</b>, con <b>freno de mano</b> y sin obstaculizar maniobras.</li><li>En la vía pública, <b>máximo 90 km/h</b> y lo que indique la señalización, conducción a la defensiva y sin hablar por teléfono.</li></ul>',
      k: 'Dentro de la empresa, 5 km/h. Al retroceder, con señalero.' },
    { s: 'al_in_trayecto', t: 'Accidente de trayecto',
      x: 'Es el que ocurre en el <b>trayecto directo</b>, de ida o regreso, entre tu casa y la maestranza. También lo cubre la Ley 16.744, pero <b>no si te desvías</b> por motivos personales.<ul><li>Autocuidado al caminar, en bicicleta o en vehículo.</li><li><b>Sin audífonos</b> y sin usar el teléfono.</li><li>Atento al entorno y respetando las señales del tránsito.</li><li>En bicicleta: casco y luces.</li><li>Si te accidentas, avisa de inmediato a tu jefatura.</li></ul>' },
    { s: 'al_in_karin', t: 'Ley Karin: buen trato, sin acoso ni violencia',
      x: 'La <b>Ley Karin (Ley 21.643)</b> previene, investiga y sanciona el <b>acoso laboral</b>, el <b>acoso sexual</b> y la <b>violencia en el trabajo</b>, también la que viene de clientes o proveedores. Maestranza ALI tiene:<ul><li>Una <b>política de buen trato</b> y un <b>protocolo de prevención</b>.</li><li>Un <b>procedimiento de actuación</b> con <b>canales y formulario de denuncia</b>. La denuncia es <b>confidencial</b>.</li><li>Una <b>investigación</b> con medidas de resguardo para quien denuncia, y sanciones.</li></ul>Todos cuidamos un ambiente seguro y respetuoso, con las líneas de comunicación abiertas.' },
    { s: 'al_in_puesto', t: 'Los riesgos de tu puesto (IRL)', puesto: true, x: PUESTO_X },
    { s: 'al_in_pts', t: 'Procedimientos de trabajo seguro y Reglamento Interno',
      x: 'Junto con esta inducción recibes los <b>procedimientos de trabajo seguro</b> de Maestranza ALI: <b>Tránsito peatonal</b>, <b>Trabajos en caliente</b>, <b>Trabajos en altura</b>, <b>Plan de emergencia</b>, <b>Operación con grúa horquilla</b> y <b>Operación de máquinas y herramientas</b>. También recibes el <b>Reglamento Interno de Orden, Higiene y Seguridad</b>. Léelos y cúmplelos; si tienes dudas, pregunta a tu jefatura.<div class="indlinks" data-ind="links"></div>' }
  ];

  // ===================== DIBUJOS SOLO DE PRUEBA =====================
  S.al_in_ninio_q = () => sv2(H.fondo.patio() + W(150, 190, { area: 'oficina', s: .5, shirt: '#FFB300', pants: '#1565C0', face: 'worried' }) + W(236, 188, { area: 'taller', pose: 'walk', flip: true }) + H.horquilla(10, 188, { op: true }));
  S.al_in_condicion_q = () => sv2(H.fondo.taller() + aceite(150, 182, 46) + cablePelado(40, 130, 176) + W(250, 165, { area: 'taller', pose: 'point', flip: true }));

  // ===================== DIBUJOS DE LAS TARJETAS DE LAS ACTIVIDADES =====================
  // A1 · orden, pisos y tránsito
  S.al_in_c_zunchos = () => sv2(H.fondo.taller() + zunchos(120, 182) + madera(190, 188, 60, -10) + madera(80, 176, 44, 8) + W(150, 165, { area: 'taller', pose: 'walk', face: 'worried' }));
  S.al_in_c_aceite = () => sv2(H.fondo.taller() + aceite(150, 182, 46) + `<rect x="196" y="160" width="16" height="22" rx="3" fill="#455A64"/><path d="M196,164 l-8,10" stroke="#455A64" stroke-width="3"/>` + W(80, 165, { area: 'taller', pose: 'walk' }));
  S.al_in_c_panel = () => sv2(H.fondo.taller() + panelHerr(110, 58, 96) + H.mesaSoldar(110, 165, 96) + W(84, 165, { area: 'taller', pose: 'point' }));
  S.al_in_c_puerta = () => sv2(H.fondo.taller() + puerta(30, 165, true) + W(170, 165, { area: 'taller', pose: 'walk', flip: true }));
  S.al_in_c_correr = () => sv2(H.fondo.taller() + H.viga(170, 165, 90, 14) + GG('alInSl', W(130, 165, { area: 'taller', pose: 'walk' }) + lineas(110, 100), '--dx:14px'));
  S.al_in_c_via = () => sv2(H.fondo.taller({ vias: false }) + via() + H.torno(170, 165, { gira: false }) + W(110, 184, { area: 'taller', pose: 'walk', anim: 'alInBob' }));
  // A3 · ruido, sol, posturas y electricidad
  S.al_in_c_fonos = () => sv2(H.fondo.taller() + H.mesaSoldar(100, 165, 96) + H.viga(106, 115, 84, 10) + W(84, 165, { area: 'taller', pose: 'lift2', muffs: 'neck', gloves: '#8D6E63' }) + H.esmerilMano(94, 110, 10, true) + GG('alInBl', waves(196, 104, 3, '#E53935')));
  S.al_in_c_sol = () => sv2(H.fondo.patio() + sol(40, 38) + dosificador(214, 96) + W(150, 188, { area: 'taller', pose: 'carry' }) + legion(150, 115) + H.viga(124, 146, 70, 8));
  S.al_in_c_pausa = () => sv2(H.fondo.taller() + W(110, 165, { area: 'taller', pose: 'stop', anim: 'alInBob' }) + W(180, 165, { area: 'soldadura', pose: 'stop', flip: true, anim: 'alInBob' }));
  S.al_in_c_mojado = () => sv2(H.fondo.taller() + enchufe(150, 104) + W(110, 165, { area: 'taller', pose: 'point', face: 'worried' }) + `<path d="M138,105 h12" stroke="#263238" stroke-width="3"/>`
    + GG('alInDrip', drop(134, 118, .45) + drop(126, 128, .4)) + H.charco(118, 180, 30));
  S.al_in_c_espalda = () => sv2(H.fondo.taller() + W(100, 165, { area: 'taller', pose: 'bend', face: 'pain' }) + box(126, 165, 34, 24, '', '#90A4AE') + GG('alInPu', `<circle cx="112" cy="128" r="6" fill="#E53935" opacity=".55"/>`));
  S.al_in_c_cable = () => sv2(H.fondo.taller() + cablePelado(150, 300, 178) + W(70, 165, { area: 'taller', pose: 'point' }) + W(124, 165, Object.assign({ flip: true }, jefe)));
  // A4 · acción o condición insegura
  S.al_in_c_sinlentes = () => sv2(H.fondo.taller() + H.mesaSoldar(110, 165, 90) + H.viga(116, 115, 78, 10) + W(96, 165, { area: 'taller', pose: 'lift2', glasses: false, gloves: '#8D6E63' }) + H.esmerilMano(106, 110, 10, true));
  S.al_in_c_sinprot = () => sv2(H.fondo.taller() + esmerilSinProt(160, 165) + `<rect x="200" y="150" width="30" height="15" fill="#FFC20E" opacity=".9" transform="rotate(-8 215 158)"/>`);
  S.al_in_c_cablepiso = () => sv2(H.fondo.taller() + H.maqSoldar(30, 165) + cablePelado(70, 290, 178));
  S.al_in_c_rapido = () => sv2(H.fondo.taller() + GG('alInSl', H.horquilla(80, 165, { carga: H.palletPiezas(153, 151) }) + lineas(60, 120), '--dx:30px'));
  S.al_in_c_retira = () => sv2(H.fondo.taller() + H.guillotina(150, 165).replace(/<path d="M[^"]*" fill="#FFC20E" opacity=".9"\/>/, '') + W(96, 165, { area: 'taller', pose: 'carry' }) + `<rect x="92" y="110" width="50" height="7" fill="#FFC20E" stroke="#263238"/>`);
  // A5 · patio, vehículos y trayecto
  S.al_in_c_5km = () => sv2(H.fondo.patio() + GG('alInSl', camioneta(20, 190, { flip: true }), '--dx:10px') + velocidad(286, 190, '5'));
  S.al_in_c_retro = () => sv2(H.fondo.patio() + GG('alInSl', camioneta(40, 190), '--dx:20px') + W(278, 190, { area: 'taller', pose: 'walk', flip: true }));
  S.al_in_c_bajo = () => sv2(H.fondo.taller() + H.puenteGrua(170, 92, H.eslinga(170, 96, 130, 210, 140) + H.viga(120, 152, 100, 12)) + H.zonaCarga(125, 90) + W(170, 165, { area: 'taller', pose: 'walk', helmet: true }));
  S.al_in_c_estac = () => sv2(H.fondo.patio() + camioneta(60, 190, { flip: true }) + `<rect x="270" y="110" width="44" height="22" rx="3" fill="${VERDE}"/>` + TT(292, 125, 'SALIDA', 9, '#fff') + `<rect x="290" y="132" width="4" height="58" fill="#455A64"/>` + W(30, 190, { area: 'taller', pose: 'walk' }));
  S.al_in_c_audif = () => sv2(trayectoFondo() + casa(10, 150) + galpon(210, 150, 100) + GG('alInSl', bici(106, 186) + W(130, 168, { area: 'oficina', pose: 'squat' }) + audif(128, 108), '--dx:22px'));
  S.al_in_c_capac = () => sv2(H.fondo.patio() + `<g transform="rotate(9 124 188)">${H.horquilla(70, 188, { carga: `<rect x="143" y="${188 - 14 - 64}" width="50" height="64" fill="#78909C" stroke="#263238"/>` + [0, 1, 2, 3].map(i => `<line x1="143" y1="${188 - 14 - 16 * i}" x2="193" y2="${188 - 14 - 16 * i}" stroke="#263238"/>`).join('') })}</g>`
    + W(256, 190, { area: 'taller', pose: 'point', flip: true }));

  // ===================== CUSTOM ÍCONOS (actividad vestir) =====================
  const OLi = '#22303A';
  window.HT_ICO = Object.assign(window.HT_ICO || {}, {
    al_in_lentes: `<path d="M4,18 h40 v4 l-2,8 q-1,3 -5,3 h-7 q-3,0 -4,-3 l-1,-3 h-2 l-1,3 q-1,3 -4,3 h-7 q-4,0 -5,-3 l-2,-8z" fill="#B3E5FC" fill-opacity=".9" stroke="${OLi}" stroke-width="2" stroke-linejoin="round"/><path d="M4,19 l-2,-4 M44,19 l2,-4" stroke="${OLi}" stroke-width="2"/><path d="M9,22 l6,-2" stroke="#fff" stroke-width="2"/>`,
    al_in_fonos: `<path d="M10,26 A14,16 0 0 1 38,26" stroke="#B71C1C" stroke-width="4" fill="none"/><rect x="4" y="22" width="12" height="18" rx="5" fill="#D32F2F" stroke="${OLi}" stroke-width="2"/><rect x="32" y="22" width="12" height="18" rx="5" fill="#D32F2F" stroke="${OLi}" stroke-width="2"/>`,
    al_in_cadena: `<path d="M10,8 q14,34 28,0" fill="none" stroke="#FBC02D" stroke-width="3" stroke-dasharray="3 2"/><circle cx="24" cy="32" r="5" fill="#FBC02D" stroke="${OLi}" stroke-width="1.5"/>`
  });

  // ===================== EVALUACIÓN: 15 preguntas + 5 actividades = 20 =====================
  // Regla de Daniel: ningún ítem de la inducción escrita queda sin evaluar. Las 3 versiones de una pregunta se reparten entre los ítems que cubre.
  // "Ev" = contenidos de la evaluación escrita de ALI.
  const quiz = [
    // ítems IRL: 2 (cobertura de la Ley 16.744) · Ev: definición de accidente del trabajo y de accidente de trayecto
    { s: 'al_in_ley_q', v: [
      { q: '¿Qué cubre el seguro de la Ley 16.744?', o: ['Accidentes del trabajo, de trayecto y enfermedades profesionales', 'Solo los accidentes graves que ocurren dentro del taller', 'Solo las enfermedades comunes, como los resfríos del invierno', 'Solo los accidentes de quienes tienen contrato indefinido'], w: 'La Ley 16.744 cubre los accidentes del trabajo, los de trayecto y las enfermedades profesionales, a todos los trabajadores.' },
      { q: '¿Qué es un accidente del trabajo?', o: ['Toda lesión a causa o con ocasión del trabajo que produce incapacidad o muerte', 'Solo una lesión que obliga a estar hospitalizado varios días en una clínica', 'Cualquier daño que sufre una máquina o una herramienta de la maestranza', 'Solo una lesión que ocurre delante de la jefatura y queda anotada'], w: 'Accidente del trabajo es toda lesión que sufres a causa o con ocasión del trabajo y que te produce incapacidad o muerte.' },
      { q: 'Vienes en bicicleta por el camino directo de tu casa a la maestranza y te caes. ¿Qué tipo de accidente es?', o: ['Un accidente de trayecto, cubierto por la Ley 16.744', 'Un accidente común, sin ninguna cobertura del seguro', 'Un accidente del trabajo, pero solo si alcanzas a marcar', 'Ninguno, porque todavía no empezaba tu turno'], w: 'Es accidente de trayecto: ocurre en el trayecto directo, de ida o regreso, entre la casa y el trabajo. Avisa y acude a la ACHS.' }] },
    // Ev: acción insegura, condición insegura, informar la condición insegura al supervisor, los accidentes ocurren por acciones y condiciones inseguras, responsable de tu seguridad
    { s: 'al_in_condicion_q', v: [
      { q: 'Ves un cable pelado y aceite derramado en el pasillo del taller. ¿Qué haces?', o: ['Lo informo de inmediato a mi supervisor', 'Sigo trabajando, porque no es mi área', 'Lo comento con alguien al final de la semana', 'Lo tapo con cartón para que no se vea tanto'], w: 'Es una condición insegura: se informa de inmediato al supervisor para que se corrija.' },
      { q: '¿Quién es el primer responsable de tu seguridad en el trabajo?', o: ['Yo mismo', 'Solo el prevencionista', 'Solo mi jefe de taller', 'Solo el Comité Paritario'], w: 'Todos participan en la prevención, pero el primer responsable de tu seguridad eres tú.' },
      { q: 'Los accidentes ocurren por acciones inseguras de las personas y por condiciones inseguras del lugar.', vf: true, w: 'Verdadero. No son mala suerte: tienen causas que se pueden prevenir.' }] },
    // ítems IRL: 1 (presentación de Maestranza ALI) y 3 (Política de Prevención de Riesgos) · Ev: Comité Paritario; la prevención no es pérdida de tiempo
    { s: 'al_in_politica_q', v: [
      { q: '¿Qué es el Comité Paritario de Higiene y Seguridad?', o: ['El organismo técnico de participación entre empresa y trabajadores', 'El área de la empresa que calcula y paga los sueldos y las licencias', 'Un grupo de trabajadores que solo organiza las celebraciones del año', 'Una oficina de la ACHS que funciona dentro de la empresa'], w: 'El Comité Paritario es el organismo técnico de participación entre empresa y trabajadores en seguridad y salud.' },
      { q: '¿A qué se dedica Maestranza ALI?', o: ['A fabricar y reparar piezas y estructuras de acero', 'A vender herramientas y materiales en una ferretería', 'A construir casas de madera en terrenos de clientes', 'A transportar carga pesada por las carreteras del sur'], w: 'Maestranza ALI es una maestranza metalmecánica de Los Ángeles: fabrica y repara piezas y estructuras de acero.' },
      { q: 'La prevención de riesgos es una pérdida de tiempo cuando hay mucho trabajo.', vf: false, w: 'Falso. Según la política de la empresa, prevenir es parte de hacer bien el trabajo, con o sin apuro.' }] },
    // ítems IRL: 4 (procedimiento en caso de accidente del trabajo o de trayecto) · Ev: accidente leve se informa; accidente grave se informa y se llama al 1404
    { s: 'al_in_accidente_q', v: [
      { q: 'Te haces un corte pequeño con una rebaba. ¿Qué haces?', o: ['Aviso de inmediato a mi supervisión', 'Me pongo una cinta adhesiva y sigo', 'Aviso solo si empieza a sangrar mucho', 'Lo cuento cuando termine el turno'], w: 'Todo accidente, aunque parezca leve, se informa de inmediato a la supervisión.' },
      { q: 'Un compañero sufre un accidente grave en el taller. ¿Qué se hace?', o: ['Se informa a la supervisión y se llama al 1404 de la ACHS', 'Se le lleva a su casa en un vehículo para que descanse', 'Se espera a que termine el turno para ver cómo sigue', 'Se le da un remedio del botiquín y se sigue trabajando'], w: 'Accidente grave: se informa a la supervisión y se llama de inmediato a la ACHS, al 1404.' },
      { q: 'Si sufres un accidente de trayecto, debes avisar apenas puedas y atenderte en la ACHS.', vf: true, w: 'Verdadero. El accidente de trayecto también lo cubre la Ley 16.744.' }] },
    // ítems IRL: 5 (uso correcto, obligatorio y cuidado del EPP) · Ev: me cuido y uso mis EPP porque es mi responsabilidad; en la maestranza siempre con toda la implementación de seguridad
    { s: 'al_in_epp_q', v: [
      { q: 'En la maestranza, ¿cuándo debes usar tu implementación de seguridad?', o: ['Siempre, mientras esté en la maestranza', 'Solo cuando la jefatura está mirando', 'Solo en los trabajos que duran mucho rato', 'Solo cuando llega una visita o un cliente'], w: 'En la maestranza se trabaja siempre con toda la implementación de seguridad.' },
      { q: '¿Por qué usas tus EPP?', o: ['Porque me cuido y es mi responsabilidad', 'Para que no me llamen la atención en el taller', 'Porque a veces lo pide el cliente en su faena', 'Solo para cumplir con un papel que firmé'], w: 'Te cuidas y usas tus EPP porque es tu responsabilidad.' },
      { q: 'Tus lentes de seguridad están rayados y no ves bien. ¿Qué haces?', o: ['Pido la reposición de inmediato', 'Trabajo sin lentes hasta que me den otros', 'Los sigo usando así', 'Los limpio con la lija'], w: 'Un EPP dañado no protege bien: se pide la reposición de inmediato, sin dejar de protegerse.' }] },
    // ítems IRL: 6 (procedimiento de operación de máquinas y herramientas) y 19 (cortes: si no entiende el funcionamiento, consultar al jefe) · Ev: herramienta defectuosa no se usa
    { s: 'al_in_maquinas_q', v: [
      { q: 'El esmeril angular tiene el cable pelado y la protección suelta. ¿Qué haces?', o: ['No lo uso, lo separo y aviso', 'Lo uso con cuidado por esta vez', 'Le pongo cinta y sigo', 'Le saco la protección y sigo'], w: 'Una herramienta defectuosa no se usa: se separa y se avisa a la jefatura.' },
      { q: 'Te piden doblar una plancha y nunca has usado la plegadora. ¿Qué haces?', o: ['Consulto a mi jefe directo antes de usarla', 'Pruebo varias veces hasta que me resulte', 'Le pregunto a cualquier compañero que pase', 'Miro un video en el celular y la uso'], w: 'Si no entiendes cómo funciona una máquina, consultas a tu jefe directo. Solo operas lo que te capacitaron y autorizaron.' },
      { q: 'Cualquier trabajador puede operar la guillotina si ya vio a otro usarla.', vf: false, w: 'Falso. Solo opera las máquinas quien fue capacitado y autorizado.' }] },
    // ítems IRL: 21 (atrapamientos: no intervenir equipos en movimiento) y 25 (anillos, aros, gargantillas, pulseras y ropa suelta)
    { s: 'al_in_atrapa_q', v: [
      { q: 'Se acumula viruta en el torno mientras la pieza gira. ¿Qué haces?', o: ['Detengo el torno y la saco con gancho', 'La saco rápido con la mano desnuda', 'La soplo fuerte con la boca para sacarla', 'La saco con el guante puesto, sin detenerlo'], w: 'Prohibido intervenir un equipo en movimiento. Se detiene y la viruta se saca con gancho o escobilla, nunca con la mano.' },
      { q: 'Llegas al taller con anillo, cadena y pulsera. ¿Qué haces?', o: ['Me los saco antes de empezar a trabajar', 'Me dejo solo el anillo, porque es chico', 'Los cubro con los guantes y la manga', 'Los uso igual, pero con mucho cuidado'], w: 'Está estrictamente prohibido usar anillos, aros colgantes, gargantillas, pulseras y accesorios en toda labor dentro de la empresa.' },
      { q: 'Puedes medir o limpiar una pieza en la fresa mientras gira si lo haces con cuidado.', vf: false, w: 'Falso. Está prohibida toda intervención de equipos en movimiento: primero se detiene y se bloquea.' }] },
    // ítems IRL: 20 (proyección de partículas: lentes en todo momento)
    { s: 'al_in_particulas_q', v: [
      { q: '¿Cuándo debes usar los lentes de seguridad en Maestranza ALI?', o: ['En todo momento, también al desplazarme', 'Solo cuando estoy esmerilando una pieza', 'Solo cuando opero el torno o la fresa', 'Solo si veo que hay chispas cerca de mí'], w: 'Lentes de seguridad en todo momento en el lugar de trabajo y al desplazarte dentro de la maestranza.' },
      { q: 'Vas caminando por el taller a buscar material a la bodega. ¿Qué haces con tus lentes?', o: ['Los llevo puestos en los ojos', 'Me los saco porque no estoy operando', 'Los llevo colgando del cuello', 'Los guardo en el bolsillo'], w: 'También al caminar: una partícula de un compañero que esmerila te puede llegar al ojo.' },
      { q: 'Los lentes de seguridad solo se usan cuando uno mismo está esmerilando.', vf: false, w: 'Falso. Se usan en todo momento en el lugar de trabajo, porque las partículas vuelan hacia todos.' }] },
    // ítems IRL: 9 (Ley 20.949) y 15 (manejo manual de carga) · Ev: peso máximo 25 kg hombre y 20 kg mujer
    { s: 'al_in_carga_q', v: [
      { q: 'Según la ley, ¿cuál es el peso máximo que un hombre puede levantar sin ayuda mecánica?', o: ['25 kilos', '50 kilos', '40 kilos', '35 kilos'], w: 'Ley 20.949: 25 kilos los hombres y 20 kilos las mujeres. Embarazadas y menores de 18 años no levantan carga.' },
      { q: 'Una compañera debe mover una pieza de 30 kilos. ¿Qué corresponde?', o: ['Usar el tecle, un carro o pedir ayuda', 'Levantarla rápido, de una sola vez', 'Arrastrarla por el piso hasta su lugar', 'Cargarla en el hombro con cuidado'], w: 'Supera los 20 kilos de las mujeres: se usa ayuda mecánica o se pide ayuda.' },
      { q: 'Al levantar una carga, se doblan las rodillas, la espalda va recta y la carga no debe tapar la vista.', vf: true, w: 'Verdadero. La fuerza se hace con las piernas y siempre mirando dónde caminas.' }] },
    // ítems IRL: 17 (caídas de distinto nivel, trabajo en altura) · Ev: trabajo en altura sobre 1,8 m; sin examen de altura no se trabaja en altura
    { s: 'al_in_altura_q', v: [
      { q: '¿Desde qué altura se considera trabajo en altura?', o: ['Sobre 1,8 metros', 'Sobre 5 metros', 'Sobre 10 metros', 'Solo en los techos'], w: 'Sobre 1,8 metros es trabajo en altura: arnés anclado y procedimiento de trabajo en altura.' },
      { q: 'Te piden subir a una estructura a 3 metros y no tienes examen de altura. ¿Qué haces?', o: ['No subo y lo informo a mi jefatura', 'Subo igual, es un rato', 'Subo sin arnés para ir más rápido', 'Le pido a un compañero que me afirme'], w: 'Sin examen de altura vigente no se trabaja en altura.' },
      { q: 'Para alcanzar una pieza alta, puedes trepar por la estantería si lo haces con cuidado.', vf: false, w: 'Falso. No se sube ni se trepa a superficies no aptas: se usa una escala o plataforma adecuada.' }] },
    // ítems IRL: 27 (incendios: fumar solo en lugares establecidos, extintores) · Ev: uso del extintor
    { s: 'al_in_incendio_q', v: [
      { q: '¿Cuál es el orden correcto para usar un extintor?', o: ['Retirar el seguro, acercarse, accionar el gatillo y apuntar a la base', 'Accionar el gatillo, retirar el seguro y apuntar a las llamas de arriba', 'Apuntar al humo desde muy lejos y descargar todo de una sola vez', 'Agitarlo, retirar el seguro y apuntar a lo más alto del fuego'], w: 'Retira el seguro, acércate a la zona del fuego, acciona el gatillo y dirige la descarga a la base del fuego.' },
      { q: '¿Dónde se puede fumar en Maestranza ALI?', o: ['Solo en los lugares establecidos', 'En cualquier parte del patio', 'Junto a los cilindros de gas', 'En el taller, si no hay nadie cerca'], w: 'Se fuma solo en los lugares establecidos, lejos de gases, pinturas y combustibles.' },
      { q: 'Los extintores deben estar vigentes, despejados y en lugares de fácil acceso.', vf: true, w: 'Verdadero. Un extintor tapado o vencido no sirve en una emergencia.' }] },
    // ítems IRL: 8 (señalización, zonas de tránsito peatonal y zona de seguridad) · Ev: sismo; niño solo dentro de la empresa
    { s: 'al_in_ninio_q', v: [
      { q: 'Ocurre un sismo fuerte mientras trabajas. ¿Qué haces?', o: ['Voy a la zona de seguridad y espero ahí hasta que se controle', 'Salgo corriendo hacia mi auto para irme de inmediato a la casa', 'Me quedo afirmado junto a la estantería más grande del taller', 'Vuelvo por mis cosas al casillero y después salgo con calma'], w: 'En un sismo vas a la zona de seguridad y permaneces ahí hasta que la emergencia esté controlada.' },
      { q: 'Ves a un niño solo caminando por el patio de la empresa. ¿Qué haces?', o: ['Lo llevo a una zona segura y busco a sus padres', 'Sigo trabajando, porque no es asunto mío', 'Le digo que se vaya solo hacia la calle', 'Lo dejo jugando tranquilo cerca de la grúa'], w: 'Un niño solo corre peligro en la maestranza: llévalo a una zona segura y busca a sus padres.' },
      { q: '¿Por dónde debes caminar dentro de la maestranza?', o: ['Solo por las vías peatonales demarcadas', 'Por el camino más corto hasta mi puesto', 'Por donde pasa la grúa horquilla', 'Por debajo de las cargas, si es rápido'], w: 'Se camina solo por las zonas de tránsito peatonal y se respeta la señalización.' }] },
    // ítems IRL: 13 (operación de maquinaria pesada), 23 (atropellamiento), 28 (vehículos: 5 km/h) y 29 (equipos rodantes: capacidad de la máquina) · Ev: cruce con poca visibilidad
    { s: 'al_in_horquilla_q', v: [
      { q: 'Llegas a un cruce del patio con poca visibilidad. ¿Qué haces?', o: ['Me detengo y miro si vienen equipos móviles', 'Cruzo corriendo rápido para no estorbar', 'Cruzo atento al celular por si me llaman', 'Grito fuerte y cruzo sin detenerme a mirar'], w: 'En un cruce con poca visibilidad te detienes y miras si vienen la grúa horquilla u otros equipos móviles.' },
      { q: '¿Cuál es la velocidad máxima de los vehículos dentro de Maestranza ALI?', o: ['5 km/h', '20 km/h', '40 km/h', '90 km/h'], w: 'Dentro de la empresa, máximo 5 km/h y sin teléfono. Los 90 km/h son el máximo en la vía pública.' },
      { q: 'Si el trabajo es urgente, se le puede pedir al operador que levante una carga sobre la capacidad de la grúa.', vf: false, w: 'Falso. Nunca se pide levantar sobre la capacidad de la máquina: se puede volcar o soltar la carga.' }] },
    // ítems IRL: 33 (procedimientos de trabajo seguro) e información de los riesgos del puesto (DS 44)
    { s: 'al_in_pts_q', v: [
      { q: 'Vas a oxicortar una plancha. ¿Qué procedimiento debes conocer y cumplir?', o: ['Trabajos en caliente', 'Tránsito peatonal', 'Trabajos en altura', 'Operación con grúa horquilla'], w: 'Soldar, oxicortar y cortar con plasma son trabajos en caliente: se sigue ese procedimiento.' },
      { q: '¿Qué procedimiento indica cómo actuar en un sismo o un incendio?', o: ['El Plan de emergencia', 'Operación de máquinas y herramientas', 'Trabajos en caliente', 'Tránsito peatonal'], w: 'El Plan de emergencia indica cómo actuar, evacuar y llegar a la zona de seguridad.' },
      { q: '¿Qué debe informarte la empresa sobre tu puesto de trabajo?', o: ['Sus riesgos, consecuencias y medidas para controlarlos', 'Solo el horario de trabajo, el sueldo y los días libres', 'Solo los riesgos que ya causaron accidentes antes', 'Solo las sanciones por no usar el EPP en el taller'], w: 'Se informan los riesgos del puesto, sus consecuencias y las medidas preventivas, al ingresar y cada vez que cambie tu puesto.' }] },
    // ítems IRL: 7 (protocolo de acoso laboral, sexual y violencia) y 32 (Ley 21.643)
    { s: 'al_in_karin_q', v: [
      { q: '¿Qué previene y sanciona la Ley Karin?', o: ['El acoso laboral, el acoso sexual y la violencia en el trabajo', 'Los atrasos, las inasistencias y los permisos sin aviso', 'Los accidentes de trayecto en bicicleta o en vehículo', 'El mal uso de las herramientas y las máquinas del taller'], w: 'La Ley Karin (Ley 21.643) previene, investiga y sanciona el acoso laboral, el acoso sexual y la violencia en el trabajo.' },
      { q: 'Un compañero te humilla y se burla de ti todos los días delante de otros. ¿Qué puedes hacer?', o: ['Denunciarlo por el canal o formulario de la empresa', 'Aguantar callado, porque es parte del trabajo', 'Responderle con golpes para que se detenga', 'Renunciar sin decirle nada a nadie de la empresa'], w: 'Es acoso laboral: se denuncia por los canales o el formulario de denuncia. Es confidencial y hay medidas de resguardo.' },
      { q: 'Cuando alguien denuncia acoso, la empresa investiga, toma medidas de resguardo y aplica sanciones si corresponde.', vf: true, w: 'Verdadero. Así lo establece el procedimiento de actuación de la Ley Karin.' }] }
  ];

  // Verificación (07-11-2026), ítem de la inducción escrita → pregunta (P) o actividad (A):
  //  1 P3 · 2 P1 · 3 P3 · 4 P4 · 5 P5 A2 · 6 P6 · 7 P15 · 8 P12 A1 · 9 P9 · 10 A3 · 11 A3 · 12 A3 · 13 P13 A5 · 14 A3 · 15 P9 · 16 A1
  //  17 P10 · 18 A1 · 19 P6 · 20 P8 A2 · 21 P7 A2 · 22 A2 A3 · 23 P13 A1 · 24 A3 · 25 P7 A2 · 26 A3 A4 · 27 P11 · 28 P13 A5 · 29 P13 A5 · 30 A1 · 31 A5 · 32 P15 · 33 P14
  //  Evaluación escrita: accidente del trabajo P1 · acción insegura P2 A4 · condición insegura P2 A4 · cruce con poca visibilidad P13 · informar condición insegura P2
  //  accidente de trayecto P1 · Comité Paritario P3 · accidentes por condiciones y acciones P2 · leve P4 · grave y 1404 P4 · 25/20 kg P9 · orden y limpieza A1
  //  prevención no es pérdida de tiempo P3 · niño solo P12 · sismo P12 · altura 1,8 m P10 · examen de altura P10 · uso mis EPP P5 · herramienta defectuosa P6
  //  implementación completa P5 · extintor P11 · identificar acciones y condiciones A4 · responsable de su seguridad P2 · riesgos del puesto (DS 44) P14
  SI_CONT.temas.push({ id: 'induccion', sec: 'todos', emp: ['ali'], title: 'Inducción de Prevención de Riesgos (IRL)', thumb: 'al_in_empresa', mins: 45, learn, quiz });

  // ===================== ACTIVIDADES (cada una cuenta como una pregunta más) =====================
  window.HT_ACT = (window.HT_ACT || []).concat([
    // A1 · ítems IRL: 8 y 23 (vías peatonales), 16 (caídas al mismo nivel), 18 y 30 (golpes, herramientas mal ubicadas, puertas aseguradas) · Ev: orden y limpieza
    { tema: 'induccion', tipo: 'tarjetas', q: '🧩 Actividad: orden, pisos y tránsito en el taller. ¿Así sí o así no? Desliza cada tarjeta.', binario: true, cats: ['✅ Así sí', '❌ Así no'], sub: ['', ''],
      items: [['Dejar zunchos y maderas tirados en el piso del taller', 1, 'al_in_c_zunchos'], ['Dejar un derrame de aceite sin limpiar ni avisar', 1, 'al_in_c_aceite'],
        ['Guardar cada herramienta en su lugar al terminar', 0, 'al_in_c_panel'], ['Dejar la puerta asegurada a su sujeta puertas', 0, 'al_in_c_puerta'],
        ['Correr por el taller y saltar sobre una viga', 1, 'al_in_c_correr'], ['Caminar por la vía peatonal demarcada', 0, 'al_in_c_via']],
      w: 'Así sí: herramientas en su lugar, puertas aseguradas y caminar por las vías peatonales. Así no: zunchos, maderas o aceite en el piso, ni correr o saltar obstáculos. El orden y la limpieza también son parte del trabajo.' },
    // A2 · ítems IRL: 5 (EPP), 20 (lentes), 21 (guantes y ropa abotonada), 22 (protector auditivo) y 25 (sin anillos, cadenas ni pulseras)
    { tema: 'induccion', tipo: 'vestir', q: '🧩 Actividad: prepara al trabajador que va a esmerilar una pieza con el esmeril angular.',
      items: [['Lentes de seguridad', 1, 'al_in_lentes', { glasses: true }], ['Protector auditivo', 1, 'al_in_fonos', { muffs: 'on' }], ['Guantes de cuero', 1, 'guantes#8D6E63', { gloves: '#8D6E63' }],
        ['Ropa de trabajo abotonada', 1, 'overol', { shirt: '#22406B', pants: '#2B3A4A' }], ['Zapatos de seguridad', 1, 'zapatos', { boots: '#263238' }],
        ['Anillo', 0, 'anillo', null, 'Los anillos están prohibidos: se enganchan y pueden causar una amputación.'], ['Cadena al cuello', 0, 'al_in_cadena', null, 'Las gargantillas y cadenas están prohibidas: se pueden enganchar en el disco.'],
        ['Zapatillas', 0, 'zapatillas', null, 'En la maestranza se usan siempre zapatos de seguridad.']],
      w: 'Para esmerilar: lentes de seguridad, protector auditivo, guantes de cuero, ropa de trabajo abotonada y zapatos de seguridad. Sin anillos, cadenas ni zapatillas.' },
    // A3 · ítems IRL: 10 y 14 (TMERT, sobrecarga postural), 11 y 22 (ruido), 12 y 24 (radiación UV), 26 (eléctricos)
    { tema: 'induccion', tipo: 'tarjetas', q: '🧩 Actividad: cuida tu salud. ¿Así sí o así no? Desliza cada tarjeta.', binario: true, cats: ['✅ Así sí', '❌ Así no'], sub: ['', ''],
      items: [['Esmerilar con el protector auditivo colgado al cuello', 1, 'al_in_c_fonos'], ['Trabajar en el patio con bloqueador, manga larga y legionario', 0, 'al_in_c_sol'],
        ['Hacer las pausas activas de tu área', 0, 'al_in_c_pausa'], ['Enchufar una herramienta con las manos mojadas', 1, 'al_in_c_mojado'],
        ['Levantar una pieza del piso doblando la espalda, con las piernas estiradas', 1, 'al_in_c_espalda'], ['Avisar de inmediato un cable pelado', 0, 'al_in_c_cable']],
      w: 'Así sí: bloqueador, manga larga y legionario al sol, pausas activas y avisar las fallas eléctricas. Así no: el protector auditivo en el cuello, la electricidad con las manos mojadas ni levantar con la espalda doblada.' },
    // A4 · ítem IRL 26 (deficiencias eléctricas) · Ev: identificar acciones inseguras y condiciones inseguras
    { tema: 'induccion', tipo: 'tarjetas', q: '🧩 Actividad: ¿acción insegura o condición insegura? Desliza cada tarjeta.', cats: ['🧍 Acción insegura', '⚠️ Condición insegura'], sub: ['Lo que hace una persona', 'Lo que está mal en el lugar'],
      items: [['Esmerilar sin lentes de seguridad', 0, 'al_in_c_sinlentes'], ['Un esmeril de banco sin su protección', 1, 'al_in_c_sinprot'],
        ['Un cable de la máquina de soldar pelado en el piso', 1, 'al_in_c_cablepiso'], ['Conducir la grúa horquilla rápido dentro del taller', 0, 'al_in_c_rapido'],
        ['Aceite derramado en el pasillo', 1, 'al_in_c_aceite'], ['Sacarle la protección a la guillotina para trabajar más rápido', 0, 'al_in_c_retira']],
      w: 'Acción insegura es lo que hace una persona: esmerilar sin lentes, correr con la grúa o sacar una protección. Condición insegura es lo que está mal en el lugar: una máquina sin protección, un cable pelado o aceite en el piso. Ambas se corrigen y se informan.' },
    // A5 · ítems IRL: 13 y 29 (maquinaria pesada y cargas: capacidad, carga suspendida, estacionar), 28 (vehículos: 5 km/h y señalero) y 31 (trayecto)
    { tema: 'induccion', tipo: 'tarjetas', q: '🧩 Actividad: patio, vehículos y trayecto. ¿Así sí o así no? Desliza cada tarjeta.', binario: true, cats: ['✅ Así sí', '❌ Así no'], sub: ['', ''],
      items: [['Conducir a 5 km/h dentro de la empresa', 0, 'al_in_c_5km'], ['Retroceder la camioneta sin señalero', 1, 'al_in_c_retro'],
        ['Pasar por debajo de una carga del puente grúa', 1, 'al_in_c_bajo'], ['Estacionar en posición de salida y con freno de mano', 0, 'al_in_c_estac'],
        ['Venir en bicicleta al trabajo con audífonos', 1, 'al_in_c_audif'], ['Pedir al operador que levante más de lo que soporta la grúa', 1, 'al_in_c_capac']],
      w: 'Así sí: 5 km/h dentro de la empresa y estacionar en posición de salida con freno de mano. Así no: retroceder sin señalero, pasar bajo cargas suspendidas, audífonos en el trayecto ni cargas sobre la capacidad de la grúa.' }
  ]);
})();

/* ---- 20_todos1.js ---- */
/* Maestranza ALI · charlas "Para todos" (parte 1): autocuidado, peligros, EPP, orden, caídas, cargas, accidente,
   incendios, emergencias y señalización. Dibujos con prefijo al_<id>_, clases CSS alt1*. */
(function () {
  const H = window.HD, T = H.T, pl = H.pill;
  // ===================== estilos y helpers propios (no globales) =====================
  const CSS = `<style>
    .alt1Dom{animation:alt1Dom 3s ease-in infinite;transform-box:fill-box;transform-origin:100% 100%}@keyframes alt1Dom{0%,30%{transform:rotate(0)}60%,100%{transform:rotate(62deg)}}
    .alt1Res{animation:alt1Res 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}@keyframes alt1Res{0%,35%{transform:rotate(0)}65%,100%{transform:rotate(-16deg)}}
    .alt1Sis{animation:alt1Sis .3s ease-in-out infinite alternate}@keyframes alt1Sis{from{transform:translateX(-2px)}to{transform:translateX(2px)}}
    .alt1Fla{animation:alt1Fla .5s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:50% 100%}@keyframes alt1Fla{from{transform:scaleY(.86)}to{transform:scaleY(1.12)}}
    .alt1Par{animation:alt1Par 1s steps(2) infinite}@keyframes alt1Par{50%{opacity:.25}}
    .alt1Ola{animation:alt1Ola 1.2s ease-out infinite}@keyframes alt1Ola{0%{opacity:.9}100%{opacity:0}}
    .alt1Cad{animation:alt1Cad .35s linear infinite}@keyframes alt1Cad{to{stroke-dashoffset:-8}}
    .alt1Bar{animation:alt1Bar 1.2s ease-in-out infinite alternate}@keyframes alt1Bar{from{transform:translateY(-6px)}to{transform:translateY(6px)}}
    .alt1Cae{animation:alt1Cae 1.6s ease-in infinite}@keyframes alt1Cae{0%,20%{transform:translateY(0)}80%,100%{transform:translateY(46px)}}
  </style>`;
  const svg = inner => sv(H.CSS + CSS + inner);
  let K = 0; const uid = p => 'alt1' + p + (K++);
  const lisa = (c = '#EEF2F5') => `<rect width="320" height="200" fill="${c}"/>`;
  const flecha = (x1, y1, x2, y2, c = '#2E7D32', w = 4) => { const a = Math.atan2(y2 - y1, x2 - x1), h = 3 + w * 1.6; return `<line x1="${x1}" y1="${y1}" x2="${(x2 - Math.cos(a) * h * .6).toFixed(1)}" y2="${(y2 - Math.sin(a) * h * .6).toFixed(1)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/><path d="M${x2},${y2} L${(x2 - h * Math.cos(a - .5)).toFixed(1)},${(y2 - h * Math.sin(a - .5)).toFixed(1)} L${(x2 - h * Math.cos(a + .5)).toFixed(1)},${(y2 - h * Math.sin(a + .5)).toFixed(1)}z" fill="${c}"/>`; };
  const lab = (x1, y1, x2, y2, t, c = '#37474F') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="1.5"/><circle cx="${x2}" cy="${y2}" r="2.5" fill="${c}"/>` + pl(x1, y1 - 10, t, c, 10);
  const esc = (x, y, s, inner) => `<g transform="translate(${x},${y}) scale(${s})">${inner}</g>`;
  const anillo = (x, y, r = 14) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#D32F2F" stroke-width="3" class="adPul"/>`;
  const divider = (c = '#fff') => `<line x1="160" y1="0" x2="160" y2="200" stroke="${c}" stroke-width="4"/>`;
  const bubble = (x, y, t, w, fs = 10) => `<path d="M${x + 18},${y + 22} l-4,12 l14,-12z" fill="#fff" stroke="#90A4AE" stroke-width="1.2"/><rect x="${x}" y="${y}" width="${w}" height="24" rx="9" fill="#fff" stroke="#90A4AE" stroke-width="1.2"/><rect x="${x + 15}" y="${y + 20}" width="14" height="4" fill="#fff"/>` + T(x + w / 2, y + 16, t, fs, '#263238');
  // ✓ / ✗ que se omiten en la versión de prueba (q = true)
  const si = (q, x, y, r) => q ? '' : H.si(x, y, r), no = (q, x, y, r) => q ? '' : H.no(x, y, r);
  // registra un dibujo y su variante de prueba "_q" (sin marcas)
  const D = (n, f) => { S['al_' + n] = () => svg(f(false)); S['al_' + n + '_q'] = () => svg(f(true)); };
  // poses propias
  if (typeof POSES !== 'undefined') Object.assign(POSES, {
    alt1grind: { fL: [-7, 0], kL: [-6, -18], fR: [7, 0], kR: [6, -18], hip: [0, -36], neck: [2, -62], head: [3, -73], eL: [8, -50], hL: [18, -62], eR: [12, -50], hR: [22, -62] },
    alt1ojo: { fL: [-7, 0], kL: [-6, -18], fR: [7, 0], kR: [6, -18], hip: [0, -36], neck: [0, -62], head: [0, -73], eL: [-9, -48], hL: [-11, -35], eR: [11, -58], hR: [6, -74] },
    alt1lentes: { fL: [-7, 0], kL: [-6, -18], fR: [7, 0], kR: [6, -18], hip: [0, -36], neck: [0, -62], head: [0, -73], eL: [-12, -58], hL: [-8, -74], eR: [12, -58], hR: [9, -74] },
    alt1think: { fL: [-7, 0], kL: [-6, -18], fR: [7, 0], kR: [6, -18], hip: [0, -36], neck: [0, -62], head: [0, -73], eL: [-9, -48], hL: [-11, -35], eR: [11, -50], hR: [6, -66] },
    alt1sube: { fL: [-6, 0], kL: [-2, -18], fR: [8, -9], kR: [11, -26], hip: [0, -36], neck: [2, -62], head: [3, -73], eL: [-6, -48], hL: [-10, -36], eR: [13, -52], hR: [20, -56] },
    alt1press: { fL: [-7, 0], kL: [-6, -18], fR: [7, 0], kR: [6, -18], hip: [0, -36], neck: [0, -62], head: [0, -73], eL: [-9, -48], hL: [-11, -35], eR: [12, -72], hR: [22, -88] },
    alt1ext: { fL: [-9, 0], kL: [-7, -18], fR: [9, 0], kR: [8, -18], hip: [0, -36], neck: [2, -62], head: [3, -73], eL: [6, -46], hL: [12, -40], eR: [14, -54], hR: [27, -52] }
  });
  const P = (x, y, o = {}) => W(x, y, Object.assign({ area: 'taller' }, o));
  const jefe = (x, y, o = {}) => W(x, y, Object.assign({ area: 'taller', shirt: '#37474F', flip: true }, o));
  const hxy = (x, y, o = {}) => { const p = (typeof POSES !== 'undefined' && POSES[o.pose || 'stand']) || { head: [0, -73] }, s = o.s || 1, fx = o.flip ? -1 : 1; return [x + p.head[0] * s * fx, y + p.head[1] * s, fx, s]; };
  // careta facial transparente (esmeril, torno)
  const caretaF = (x, y, o = {}) => { const [X, Y, fx, s] = hxy(x, y, o); return `<path d="M${X - 9 * s},${Y - 7 * s} Q${X},${Y - 15 * s} ${X + 9 * s},${Y - 7 * s}" stroke="#263238" stroke-width="${2.6 * s}" fill="none"/><rect x="${fx > 0 ? X + 4 * s : X - 12 * s}" y="${Y - 11 * s}" width="${8 * s}" height="${22 * s}" rx="${3 * s}" fill="#B3E5FC" fill-opacity=".55" stroke="#455A64" stroke-width="${s}"/>`; };
  // persona tendida en el piso (cabeza hacia la izquierda)
  const tendido = (x, y, o = {}) => `<ellipse cx="${x - 36}" cy="${y + 1}" rx="44" ry="3" fill="#000" opacity=".13"/><g transform="translate(0,-9) rotate(-90 ${x} ${y})">${W(x, y, Object.assign({ area: 'taller', face: 'pain' }, o)).replace(/^<ellipse[^>]*\/>/, '')}</g>`;
  // arnés (pose stand) con cola de seguridad hacia el anclaje (ax, ay)
  const arnes = (x, y, s = 1, ax, ay) => `<path d="M${x - 6 * s},${y - 60 * s} L${x + 5 * s},${y - 38 * s} M${x + 6 * s},${y - 60 * s} L${x - 5 * s},${y - 38 * s} M${x - 8 * s},${y - 37 * s} h${16 * s} M${x - 7 * s},${y - 34 * s} l${3 * s},${8 * s} M${x + 7 * s},${y - 34 * s} l${-3 * s},${8 * s}" stroke="#FF6F00" stroke-width="${2.6 * s}" fill="none" stroke-linecap="round"/>`
    + (ax !== undefined ? `<path d="M${x - 2 * s},${y - 58 * s} Q${(x + ax) / 2},${Math.max(y - 58 * s, ay) + 14} ${ax},${ay}" stroke="#263238" stroke-width="2" fill="none" stroke-dasharray="4 2"/><circle cx="${ax}" cy="${ay}" r="3.5" fill="none" stroke="#263238" stroke-width="2"/>` : '');
  // objetos de taller
  const virutas = (x, y, n = 6, c = '#90A4AE') => Array.from({ length: n }, (_, i) => { const xx = x + i * 9 - (i % 2) * 3, yy = y - (i % 3) * 4; return `<path d="M${xx},${yy} c3,-7 9,-7 9,-1 s-7,6 -8,0 s5,-8 9,-3" stroke="${c}" stroke-width="1.6" fill="none"/>`; }).join('');
  const cable = (x1, x2, y, c = '#263238', w = 3) => { const d = (x2 - x1) / 4; return `<path d="M${x1},${y} q${d},-7 ${2 * d},0 t${2 * d},0" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`; };
  const zuncho = (x, y) => `<path d="M${x},${y} c8,-12 18,6 26,-4 s14,-10 22,2 s10,6 16,-2" stroke="#B0BEC5" stroke-width="2.6" fill="none"/><path d="M${x},${y} c8,-12 18,6 26,-4 s14,-10 22,2 s10,6 16,-2" stroke="#546E7A" stroke-width=".8" fill="none"/>`;
  const aceite = (x, y = 178, rx = 30) => H.charco(x, y, rx, '#3E2723');
  const contenedor = (x, y, t = 'CHATARRA', w = 70) => `<path d="M${x + 8},${y - 28} l-4,-10 M${x + 30},${y - 30} l6,-14 M${x + 48},${y - 30} l10,-8" stroke="#78909C" stroke-width="5"/><path d="M${x},${y - 34} h${w} l-4,${30} h${-w + 8}z" fill="#607D8B" stroke="#263238" stroke-width="1.2"/><rect x="${x + 2}" y="${y - 6}" width="${w - 4}" height="6" fill="#455A64"/>` + T(x + w / 2, y - 16, t, 8, '#fff');
  const tarro = (x, y, t = 'PAÑOS') => `<rect x="${x}" y="${y - 30}" width="24" height="30" rx="2" fill="#B71C1C" stroke="#263238"/><rect x="${x - 2}" y="${y - 34}" width="28" height="5" rx="2" fill="#7F0000" stroke="#263238"/><rect x="${x + 3}" y="${y - 22}" width="18" height="10" fill="#FFC20E"/>` + T(x + 12, y - 14.5, t, 5.5, '#263238');
  const llama = (x, y, s = 1) => `<g class="alt1Fla"><path d="M${x},${y} c${-14 * s},0 ${-16 * s},${-14 * s} ${-8 * s},${-24 * s} c${2 * s},${8 * s} ${6 * s},${8 * s} ${6 * s},${2 * s} c0,${-10 * s} ${4 * s},${-16 * s} ${10 * s},${-22 * s} c${-2 * s},${10 * s} ${10 * s},${16 * s} ${10 * s},${28 * s} c0,${10 * s} ${-8 * s},${16 * s} ${-18 * s},${16 * s}z" fill="#FF7043"/><path d="M${x},${y} c${-7 * s},0 ${-8 * s},${-8 * s} ${-3 * s},${-14 * s} c${1 * s},${5 * s} ${4 * s},${4 * s} ${4 * s},0 c${2 * s},${4 * s} ${6 * s},${6 * s} ${5 * s},${10 * s} c0,${3 * s} ${-3 * s},${4 * s} ${-6 * s},${4 * s}z" fill="#FFD54F"/></g>`;
  const ondas = (x, y, fx = 1, c = '#E53935') => [0, 1, 2].map(i => `<path d="M${x + fx * (6 + i * 7)},${y - 8 - i * 4} q${fx * (5 + i * 2)},${8 + i * 4} 0,${16 + i * 8}" stroke="${c}" stroke-width="2.4" fill="none" class="alt1Ola" style="animation-delay:${i * .3}s"/>`).join('');
  const tile = (i, inner, label, c = '#C62828') => { const x = 8 + i * 78; return `<rect x="${x}" y="10" width="72" height="166" rx="8" fill="#fff" stroke="#CFD8DC" stroke-width="1.5"/>` + inner + pl(x + 36, 150, label, c, Math.min(9.5, 54 / (label.length * .6))); };
  const doc = (x, y, w, h, t, c = '#0E3962') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#fff" stroke="#90A4AE" stroke-width="1.5"/><rect x="${x}" y="${y}" width="${w}" height="14" rx="3" fill="${c}"/>` + T(x + w / 2, y + 11, t, 9, '#fff') + Array.from({ length: Math.floor((h - 22) / 9) }, (_, i) => `<rect x="${x + 6}" y="${y + 22 + i * 9}" width="${w - 12 - (i % 3) * 8}" height="3" fill="#B0BEC5"/>`).join('');
  // íconos simples (base ~ 22 unidades, centrados en 0,0)
  const IC = {
    lentes: c => `<rect x="-11" y="-4" width="9" height="7" rx="3" fill="${c}"/><rect x="2" y="-4" width="9" height="7" rx="3" fill="${c}"/><path d="M-2,-1 h4 M-11,-2 l-3,-3 M11,-2 l3,-3" stroke="${c}" stroke-width="1.8"/>`,
    fonos: c => `<path d="M-8,2 v-4 a8,8 0 0 1 16,0 v4" stroke="${c}" stroke-width="2.6" fill="none"/><rect x="-12" y="0" width="7" height="10" rx="2.5" fill="${c}"/><rect x="5" y="0" width="7" height="10" rx="2.5" fill="${c}"/>`,
    cig: c => `<rect x="-12" y="2" width="18" height="5" fill="${c}"/><rect x="7" y="2" width="5" height="5" fill="${c}" opacity=".6"/><path d="M9,-1 q-4,-4 0,-9 M4,-1 q-3,-3 0,-7" stroke="${c}" stroke-width="1.6" fill="none"/>`,
    persona: c => `<circle cx="0" cy="-9" r="3.2" fill="${c}"/><path d="M0,-5 v8 M0,3 l-5,8 M0,3 l5,8 M-6,-2 h12" stroke="${c}" stroke-width="2.8" stroke-linecap="round"/>`,
    carga: c => `<path d="M0,-12 v5 q0,4 -3,4" stroke="${c}" stroke-width="2.2" fill="none"/><path d="M0,-3 l-9,6 M0,-3 l9,6" stroke="${c}" stroke-width="1.6"/><rect x="-10" y="3" width="20" height="9" fill="${c}"/>`,
    rayo: c => `<path d="M3,-12 l-8,12 h6 l-3,11 l10,-14 h-6 l3,-9z" fill="${c}"/>`,
    horq: c => `<rect x="-11" y="-2" width="13" height="8" rx="1" fill="${c}"/><path d="M-7,-2 v-7 h6 l2,7" stroke="${c}" stroke-width="1.8" fill="none"/><path d="M5,-11 v16 h8" stroke="${c}" stroke-width="2.2" fill="none"/><circle cx="-8" cy="8" r="3" fill="${c}"/><circle cx="0" cy="8" r="3" fill="${c}"/>`,
    salida: c => `<rect x="5" y="-11" width="9" height="22" fill="none" stroke="${c}" stroke-width="1.8"/><circle cx="-4" cy="-8" r="2.8" fill="${c}"/><path d="M-5,-4 l-2,7 l5,3 l1,6 M-7,3 l-5,6 M-5,-3 l6,3 M-6,-2 l-6,2" stroke="${c}" stroke-width="2.4" stroke-linecap="round" fill="none"/>`,
    ext: c => `<rect x="-4" y="-6" width="9" height="17" rx="3" fill="${c}"/><rect x="-2" y="-10" width="5" height="4" fill="${c}"/><path d="M3,-9 h5 l2,3" stroke="${c}" stroke-width="1.8" fill="none"/>`,
    careta: c => `<path d="M-9,-10 q10,-6 18,0 v14 q-9,6 -18,0z" fill="${c}"/>`,
    botiquin: c => `<path d="M-2,-9 h4 v7 h7 v4 h-7 v7 h-4 v-7 h-7 v-4 h7z" fill="${c}"/>`,
    mano: c => `<path d="M-6,10 v-10 l-3,-5 q0,-3 3,-1 l2,3 v-9 q0,-3 2.5,0 v7 v-9 q0,-3 2.5,0 v9 v-8 q0,-3 2.5,0 v9 v-5 q0,-3 2.5,0 v9 q0,6 -4,10z" fill="${c}"/>`
  };
  const ic = (k, x, y, s = 1, c = '#fff') => `<g transform="translate(${x},${y}) scale(${s})">${IC[k](c)}</g>`;
  const sProh = (cx, cy, r, k) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="#D32F2F" stroke-width="${r * .18}"/>` + ic(k, cx, cy, r / 15, '#263238') + `<line x1="${cx - r * .66}" y1="${cy - r * .66}" x2="${cx + r * .66}" y2="${cy + r * .66}" stroke="#D32F2F" stroke-width="${r * .17}"/>`;
  const sObl = (cx, cy, r, k) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1565C0" stroke="#fff" stroke-width="2"/>` + ic(k, cx, cy, r / 15, '#fff');
  const sAdv = (cx, cy, r, k) => `<path d="M${cx},${cy - r} L${cx + r * 1.1},${cy + r * .8} H${cx - r * 1.1}z" fill="#FFC20E" stroke="#263238" stroke-width="${r * .12}" stroke-linejoin="round"/>` + ic(k, cx, cy + r * .2, r / 22, '#263238');
  const sRect = (x, y, w, h, k, c = '#2E7D32') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${c}" stroke="#fff" stroke-width="1.5"/>` + ic(k, x + w / 2, y + h / 2, h / 26, '#fff');
  const sFlecha = (x, y, w, dir = 1) => `<rect x="${x}" y="${y}" width="${w}" height="16" rx="2" fill="#2E7D32"/>` + flecha(dir > 0 ? x + 4 : x + w - 4, y + 8, dir > 0 ? x + w - 3 : x + 3, y + 8, '#fff', 2.6);
  // guante (ícono 48x48) y otros íconos grandes
  const guante = (x, y, c, s = 1) => esc(x, y, s, `<path d="M14,40 v-12 l-5,-8 q-1,-3 2,-4 q2,0 3,2 l3,4 v-14 q0,-3 3,-3 q3,0 3,3 v-2 q0,-3 3,-3 q3,0 3,3 v2 q0,-3 3,-3 q3,0 3,3 v4 q0,-3 3,-3 q3,0 3,3 v16 q0,5 -4,8 v3 z" fill="${c}" stroke="#22303A" stroke-width="2" stroke-linejoin="round"/><path d="M14,36 h20" stroke="#22303A" stroke-width="1.6" opacity=".6"/>`);
  const zapato = (x, y, s = 1) => esc(x, y, s, `<path d="M7,22 h16 l4,6 l12,3 q4,1 4,5 v4 h-36 z" fill="#37474F" stroke="#22303A" stroke-width="2" stroke-linejoin="round"/><path d="M30,31 q8,1 9,5 v4 h-9 z" fill="#FBC02D" stroke="#22303A" stroke-width="1.6"/><path d="M7,40 h36" stroke="#111" stroke-width="3"/>`);
  const joya = (x, y, s = 1) => esc(x, y, s, `<circle cx="24" cy="29" r="11" fill="none" stroke="#FBC02D" stroke-width="5"/><path d="M18,14 l6,-7 l6,7 l-6,6 z" fill="#81D4FA" stroke="#22303A" stroke-width="1.6"/>`);
  // trabajador esmerilando sobre una mesa (la mesa queda a su derecha: x+34 a x+124)
  const esmerila = (x, y, o = {}) => H.mesaSoldar(x + 34, y, 90) + H.plancha(x + 40, y - 50, 70, 4) + P(x, y, Object.assign({ pose: 'alt1grind' }, o)) + H.esmerilMano(x + 20, y - 64, 0, o.chis !== false);
  // protección (guarda) abatible sobre el plato del torno (x del torno)
  const guardaTorno = (x, y) => `<path d="M${x + 26},${y - 80} h28 v18 h-28z" fill="#FFC20E" fill-opacity=".55" stroke="#8D6E00" stroke-width="1.4"/><path d="M${x + 26},${y - 80} q14,-8 28,0" fill="#FFC20E" fill-opacity=".55" stroke="#8D6E00" stroke-width="1.4"/>`;
  const caja = (x, y, w = 26, h = 20, t = '') => `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" rx="2" fill="#C89B5E" stroke="#8D6E3F" stroke-width="1.4"/><rect x="${x + w / 2 - 3}" y="${y - h}" width="6" height="${h}" fill="#E0C08A" opacity=".8"/>` + (t ? T(x + w / 2, y - h / 2 + 3, t, 7, '#263238') : '');
  const saco = (x, y, t = '25 kg') => `<path d="M${x},${y} q-2,-14 2,-22 q12,-4 24,0 q4,8 2,22z" fill="#ECEFF1" stroke="#78909C" stroke-width="1.4"/><path d="M${x + 4},${y - 22} q10,-6 20,0" stroke="#78909C" stroke-width="1.4" fill="none"/>` + T(x + 14, y - 8, t, 6, '#455A64');
  const eje = (x, y, w = 80, r = 7) => `<rect x="${x}" y="${y - 2 * r}" width="${w}" height="${2 * r}" fill="#90A4AE" stroke="#263238" stroke-width="1.2"/><rect x="${x}" y="${y - 2 * r + 2}" width="${w}" height="3" fill="#CFD8DC"/><ellipse cx="${x + w}" cy="${y - r}" rx="2.5" ry="${r}" fill="#B0BEC5" stroke="#263238"/>`;
  const cinta = (x1, x2, y = 165, h = 40) => `<rect x="${x1 - 3}" y="${y - h}" width="6" height="${h}" fill="#FF6F00"/><rect x="${x2 - 3}" y="${y - h}" width="6" height="${h}" fill="#FF6F00"/><rect x="${x1 - 6}" y="${y - 4}" width="12" height="4" fill="#263238"/><rect x="${x2 - 6}" y="${y - 4}" width="12" height="4" fill="#263238"/><line x1="${x1}" y1="${y - h + 6}" x2="${x2}" y2="${y - h + 6}" stroke="#FFC20E" stroke-width="5"/><line x1="${x1}" y1="${y - h + 6}" x2="${x2}" y2="${y - h + 6}" stroke="#D32F2F" stroke-width="5" stroke-dasharray="6 6"/>`;
  const puerta = (x, y = 165, w = 44, h = 110, c = '#78909C') => `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${c}" stroke="#455A64" stroke-width="2"/><rect x="${x + w - 9}" y="${y - h / 2}" width="5" height="3" fill="#263238"/>`;

  // ======================================================================
  // TEMA 1 · ACTOS INSEGUROS, CONDICIONES INSEGURAS Y AUTOCUIDADO
  // ======================================================================
  D('autocuidado_def', q => H.fondo.taller() + H.esmerilBanco(60, 165) + P(150, 165, { pose: 'alt1ojo', face: 'pain' }) + jefe(214, 165, { pose: 'point' }) + H.botiquin(268, 104)
    + pl(160, 30, 'Lesión a causa o con ocasión del trabajo', '#C62828', 11));
  D('autocuidado_acto', q => H.fondo.taller() + esmerila(70, 165, { glasses: false, face: 'ok' }) + anillo(73, 92, 13) + no(q, 36, 46) + pl(220, 30, 'Acción insegura', '#C62828', 12)
    + H.letrero(256, 70, 'obligacion', 'LENTES', 40) + `<g transform="translate(276,84) scale(.6)">${IC.lentes('#fff')}</g>`);
  D('autocuidado_cond', q => H.fondo.taller() + H.torno(14, 165) + aceite(120, 180, 26) + cable(170, 262, 186, '#212121', 3) + `<path d="M226,183 l4,-6 l3,5" stroke="#FF9800" stroke-width="2" fill="none" class="alt1Par"/>` + H.esmerilBanco(282, 165)
    + anillo(120, 180, 18) + anillo(228, 184, 13) + lab(120, 128, 120, 172, 'Aceite') + lab(232, 140, 230, 182, 'Cable pelado') + pl(160, 30, 'Condición insegura', '#E65100', 12));
  D('autocuidado_domino', q => lisa('#F5F7FA') + `<rect x="0" y="150" width="320" height="50" fill="#CFD8DC"/>`
    + [['Apuro', '#EF6C00'], ['Sin lentes', '#EF6C00'], ['Esmeril sin guarda', '#E65100'], ['Lesión en el ojo', '#C62828']].map(([t, c], i) => { const x = 34 + i * 72; return `<g class="alt1Dom" style="animation-delay:${i * .25}s"><rect x="${x}" y="64" width="28" height="86" rx="4" fill="${i === 3 ? '#C62828' : '#37474F'}" stroke="#263238" stroke-width="1.5"/><circle cx="${x + 14}" cy="88" r="4" fill="#fff"/><circle cx="${x + 14}" cy="126" r="4" fill="#fff"/><line x1="${x + 4}" y1="107" x2="${x + 24}" y2="107" stroke="#fff" stroke-width="2"/></g>` + pl(x + 14, i % 2 ? 180 : 156, t, c, 9.5); }).join('')
    + pl(160, 22, 'Acciones + condiciones inseguras = accidente', '#263238', 11));
  D('autocuidado_porque', q => H.fondo.taller() + H.torno(14, 165) + P(108, 165, { pose: 'carry', face: 'ok' }) + bubble(70, 24, '“Llevo años haciéndolo así”', 156)
    + [['Apuro', '#EF6C00'], ['Exceso de confianza', '#C62828'], ['Costumbre', '#6D4C41'], ['Cansancio', '#5E35B1']].map(([t, c], i) => pl(258, 66 + i * 24, t, c, 10)).join(''));
  D('autocuidado_yo', q => H.fondo.taller() + H.torno(200, 165) + P(110, 165, { pose: 'alt1lentes', muffs: 'neck' }) + pl(110, 34, 'El responsable de mi seguridad soy YO', '#1565C0', 12) + si(q, 150, 82, 13));
  D('autocuidado_ppa', q => lisa('#F5F7FA') + [['1 · Para', '#C62828', W(53, 150, { area: 'taller', pose: 'stop', s: .8 })],
    ['2 · Piensa', '#F9A825', W(160, 150, { area: 'taller', pose: 'alt1think', s: .8 }) + `<circle cx="184" cy="66" r="13" fill="#fff" stroke="#F9A825" stroke-width="2"/>` + T(184, 72, '?', 16, '#F9A825')],
    ['3 · Actúa', '#2E7D32', W(267, 150, { area: 'taller', pose: 'point', s: .8, gloves: '#E0C9A6' })]].map(([t, c, g], i) => `<rect x="${8 + i * 104}" y="12" width="96" height="176" rx="10" fill="#fff" stroke="${c}" stroke-width="2.5"/>` + g + pl(56 + i * 107, 160, t, c, 11)).join(''));
  D('autocuidado_avisa', q => H.fondo.taller() + aceite(160, 180, 30) + P(86, 165, { pose: 'point' }) + jefe(246, 165) + bubble(30, 30, 'Hay aceite en la vía peatonal', 150) + anillo(160, 180, 18));
  D('autocuidado_cphs', q => H.fondo.oficina() + [52, 92, 132].map(x => W(x, 165, { area: 'oficina', s: .85 })).join('') + [190, 230, 270].map(x => W(x, 165, { area: 'taller', s: .85, flip: true })).join('')
    + `<rect x="24" y="120" width="272" height="8" rx="2" fill="#6D4C41"/><rect x="34" y="128" width="252" height="37" fill="#8D6E63"/>` + doc(140, 104, 40, 18, 'ACTA')
    + pl(92, 140, 'Empresa: 3', '#0E3962', 11) + pl(230, 140, 'Trabajadores: 3', '#22406B', 11) + pl(160, 18, 'Comité Paritario', '#2E7D32', 12));

  SI_CONT.temas.push({
    id: 'autocuidado', sec: 'todos', emp: ['ali'], title: 'Actos inseguros, condiciones inseguras y autocuidado', thumb: 'al_autocuidado_yo', mins: 12,
    learn: [
      { s: 'al_autocuidado_def', t: '¿Qué es un accidente del trabajo?', x: 'Es <b>toda lesión que sufre una persona a causa o con ocasión de su trabajo</b>, y que le produce incapacidad o la muerte (Ley 16.744). En la maestranza, por ejemplo: una partícula en el ojo al esmerilar, un corte con el borde de una plancha, un pie aplastado por una pieza o una quemadura al soldar. Casi todos tienen algo en común: <b>se podían evitar</b>.' },
      { s: 'al_autocuidado_acto', t: '¿Qué es una acción insegura?', x: 'Es algo que <b>hace o deja de hacer la persona</b> y que se aparta de la forma segura de trabajar. Ejemplos en el taller:<ul><li>Esmerilar o pasar por el taller <b>sin lentes de seguridad</b>.</li><li>Retirar la protección de una máquina “para trabajar más cómodo”.</li><li>Meter la mano o limpiar una máquina <b>en movimiento</b>.</li><li>Usar una máquina sin capacitación ni autorización.</li><li>Trabajar con anillos, cadenas o ropa suelta.</li></ul>' },
      { s: 'al_autocuidado_cond', t: '¿Qué es una condición insegura?', x: 'Es algo del <b>lugar, la máquina, la herramienta o el material</b> que puede causar un accidente. Ejemplos:<ul><li>Aceite o virutas en el piso.</li><li>Un cable de la soldadora pelado o cruzando el paso.</li><li>Un esmeril sin guarda o con el disco trizado.</li><li>Piezas mal apiladas que se pueden caer.</li><li>Poca luz en un pasillo.</li></ul>' },
      { s: 'al_autocuidado_domino', t: 'Los accidentes se producen por acciones y condiciones inseguras', x: 'Un accidente no es mala suerte: tiene <b>causas</b>, y casi siempre se juntan varias, como fichas de dominó en fila. Por ejemplo: <b>apuro</b>, esmerilar <b>sin lentes</b> y un <b>esmeril sin guarda</b> terminan en una lesión en el ojo. Si sacas una sola ficha, por ejemplo te pones los lentes, la cadena se corta y el accidente no ocurre.', k: 'Los accidentes se producen por acciones y condiciones inseguras: se pueden evitar.' },
      { s: 'al_autocuidado_porque', t: '¿Por qué cometemos acciones inseguras?', x: '<ul><li><b>Apuro:</b> “hay que despachar esta pieza hoy”.</li><li><b>Exceso de confianza:</b> “llevo años haciéndolo así y nunca me ha pasado nada”.</li><li><b>Costumbre:</b> de tanto verlo, el riesgo se vuelve invisible.</li><li><b>Cansancio:</b> al final del turno o con horas extra baja la atención.</li></ul>Que nunca te haya pasado nada no significa que sea seguro: solo significa que todavía no te ha pasado.' },
      { s: 'al_autocuidado_yo', t: 'El responsable de mi seguridad soy yo', x: 'La empresa debe darte un lugar seguro, capacitación y EPP. Pero <b>quien decide en cada momento cómo hacer la tarea eres tú</b>. Ponerte los lentes, revisar la máquina, no saltarte un paso y pedir ayuda cuando algo pesa es tu decisión. Me cuido y uso mi EPP porque <b>es mi responsabilidad</b>, y porque en mi casa me esperan.', k: 'El responsable de mi seguridad soy yo.' },
      { s: 'al_autocuidado_ppa', t: 'Para, piensa, actúa', x: 'Úsalo antes de cada tarea, sobre todo si es nueva, si algo cambió o si te la piden con urgencia:<ul><li><b>Para:</b> detente unos segundos.</li><li><b>Piensa:</b> ¿qué puede salir mal? ¿La máquina está en buen estado? ¿Tengo el EPP? ¿Estoy capacitado y autorizado?</li><li><b>Actúa:</b> hazlo de la forma segura. Si tienes una duda, pregunta al jefe de taller antes de empezar.</li></ul>' },
      { s: 'al_autocuidado_avisa', t: 'Avisa de inmediato lo que esté mal', x: 'Si ves una condición insegura, <b>avisa de inmediato a tu jefatura</b>. Si puedes hacerlo sin riesgo, actúa primero: limpia el aceite, retira el retazo o aparta el cable. Avisa también los <b>casi accidentes</b> y toda <b>herramienta defectuosa</b>: no se usa hasta que se repare. Y si al seguir trabajando tu vida corre un <b>riesgo grave e inminente</b>, tienes derecho a detener el trabajo, alejarte y avisar.', k: 'Toda condición insegura se avisa de inmediato a tu jefatura.' },
      { s: 'al_autocuidado_cphs', t: 'El Comité Paritario', x: 'El <b>Comité Paritario de Higiene y Seguridad</b> es un <b>organismo técnico de participación</b> entre la empresa y los trabajadores, con <b>3 representantes de cada parte</b>. Detecta y evalúa riesgos, investiga las causas de los accidentes, vigila el uso del EPP y promueve la capacitación. Puedes llevarle tus observaciones de seguridad a cualquiera de sus integrantes.' }
    ],
    quiz: [
      { s: 'al_autocuidado_def', v: [
        { q: '¿Qué es un accidente del trabajo?', o: ['Toda lesión a causa o con ocasión del trabajo', 'Solo la lesión que obliga a operar o a hospitalizar', 'Cualquier daño a una máquina del taller', 'Solo lo que ocurre fuera del horario'], w: 'Es toda lesión que sufre una persona a causa o con ocasión de su trabajo y que le produce incapacidad o muerte.' },
        { q: 'Mientras esmerilas, te entra una partícula al ojo. Según la ley, eso es:', o: ['Un accidente del trabajo', 'Un accidente de trayecto', 'Una enfermedad profesional', 'Un problema personal'], w: 'Es una lesión a causa del trabajo: un accidente del trabajo.' },
        { q: 'Un corte con el borde de una plancha, aunque sea pequeño, es un accidente del trabajo.', vf: true, w: 'Verdadero. Toda lesión a causa o con ocasión del trabajo es accidente del trabajo y se avisa de inmediato.' } ] },
      { s: 'al_autocuidado_acto_q', v: [
        { q: 'Un trabajador esmerila sin lentes de seguridad. Eso es:', o: ['Una acción insegura', 'Una condición insegura', 'Un riesgo aceptable si es rápido', 'Una falla del esmeril'], w: 'Es una decisión de la persona que se aparta de la forma segura: una acción insegura.' },
        { q: '¿Cuál de estas es una acción insegura?', o: ['Retirar la protección de una máquina', 'Un cable pelado en el piso', 'Poca luz en un pasillo', 'Un disco trizado en el esmeril de banco'], w: 'Retirar la protección lo hace una persona. Las demás son condiciones del lugar o del equipo.' },
        { q: 'Estás apurado y la viruta del torno no te deja ver. ¿Cuál sería una acción insegura?', o: ['Sacarla con la mano con el torno girando', 'Detener el torno y sacarla con gancho', 'Pedir ayuda al jefe de taller', 'Esperar que el plato se detenga'], w: 'Meter la mano en una máquina en movimiento es una acción insegura grave: se detiene la máquina y se usa el gancho.' } ] },
      { s: 'al_autocuidado_cond_q', v: [
        { q: 'Hay aceite derramado en la vía peatonal del taller. Eso es:', o: ['Una condición insegura', 'Una acción insegura', 'Un accidente de trayecto', 'Un riesgo sin importancia'], w: 'Es algo del lugar que puede causar una caída: una condición insegura.' },
        { q: 'Una condición insegura es:', o: ['Algo del lugar, equipo o material que puede dañar', 'Una acción de la persona que se salta pasos del trabajo', 'Una lesión leve sin atención médica', 'Una tarea que se hace fuera de turno'], w: 'La condición insegura está en el lugar, la máquina o el material; la acción insegura la hace la persona.' },
        { q: '¿Cuál de estas es una condición insegura?', o: ['Un esmeril de banco sin su guarda', 'Correr por el taller', 'Trabajar con un anillo y una cadena puestos', 'Soldar sin careta'], w: 'El esmeril sin guarda es del equipo. Las demás son acciones de las personas.' } ] },
      { s: 'al_autocuidado_domino_q', v: [
        { q: '¿Por qué se producen los accidentes?', o: ['Por acciones y condiciones inseguras', 'Solo por mala suerte de la persona', 'Solo por culpa de las máquinas', 'Porque el trabajo es peligroso'], w: 'Los accidentes se producen por acciones y condiciones inseguras, y casi siempre se juntan varias causas.' },
        { q: 'Según la cadena de fichas, ¿qué pasa si sacas una sola causa?', o: ['La cadena se corta y no hay accidente', 'El accidente ocurre igual', 'Solo cambia la hora en que ocurre el accidente', 'Hay que sacar todas a la vez'], w: 'Basta con cortar una causa, por ejemplo ponerte los lentes, para que la cadena no llegue al accidente.' },
        { q: 'Los accidentes son mala suerte y no se pueden evitar.', vf: false, w: 'Falso. Tienen causas que se pueden identificar y controlar.' } ] },
      { s: 'al_autocuidado_yo_q', v: [
        { q: '¿Quién es el responsable de tu seguridad en cada tarea?', o: ['Yo mismo', 'Solo el jefe de taller', 'Solo el Comité Paritario', 'Solo la ACHS'], w: 'La empresa debe darte condiciones, capacitación y EPP, pero quien decide cómo hacer la tarea en cada momento eres tú.' },
        { q: 'Te piden una pieza urgente y nadie te está mirando. ¿Qué haces con los lentes y los fonos?', o: ['Me los pongo igual: me cuido yo', 'No los uso para ganar tiempo', 'Me pongo solo los lentes', 'Los uso solo si llega el jefe'], w: 'Te cuidas porque es tu responsabilidad, no porque alguien te mire.' },
        { q: 'Usar mis EPP y cuidarme es mi responsabilidad, no solo la de la empresa.', vf: true, w: 'Verdadero. El responsable de mi seguridad soy yo.' } ] },
      { s: 'al_autocuidado_avisa_q', v: [
        { q: 'Ves aceite en la vía peatonal. Si puedes hacerlo sin riesgo, ¿qué haces?', o: ['Lo limpio y aviso de inmediato', 'Paso por el lado y sigo', 'Le pongo un cartón encima y sigo', 'Espero que otro lo vea'], w: 'Si es seguro, actúas primero y avisas de inmediato a tu jefatura para que se corrija la causa.' },
        { q: 'El esmeril angular tiene el cable pelado. ¿Qué haces?', o: ['No lo uso y aviso a mi jefatura', 'Lo uso con cuidado hasta el final', 'Lo envuelvo con cinta y sigo', 'Lo dejo en el banco sin decir nada'], w: 'Una herramienta defectuosa no se usa: se avisa y se retira hasta que se repare.' },
        { q: 'Las condiciones inseguras se avisan a fin de mes, todas juntas.', vf: false, w: 'Falso. Se avisan de inmediato, antes de que alguien se accidente.' } ] },
      { s: 'al_autocuidado_cphs_q', v: [
        { q: '¿Qué es el Comité Paritario de Higiene y Seguridad?', o: ['Un organismo técnico de participación', 'Un grupo de clientes de la empresa', 'Una oficina de la ACHS en el taller', 'El sindicato que negocia sueldos'], w: 'Es un organismo técnico de participación entre la empresa y los trabajadores.' },
        { q: '¿Cómo está formado el Comité Paritario?', o: ['3 de la empresa y 3 de los trabajadores', 'Solo por jefaturas de la empresa', 'Solo por los trabajadores más antiguos', '1 de la empresa y 10 trabajadores'], w: 'Es paritario: igual número de representantes de cada parte, 3 y 3.' },
        { q: '¿Cuál es una función del Comité Paritario?', o: ['Investigar las causas de los accidentes', 'Fijar los turnos y las vacaciones', 'Vender los trabajos a los clientes', 'Pagar los subsidios de los trabajadores accidentados'], w: 'Detecta y evalúa riesgos, investiga los accidentes, vigila el uso del EPP y promueve la capacitación.' } ] }
    ]
  });

  // ======================================================================
  // TEMA 2 · PELIGROS Y RIESGOS EN LA MAESTRANZA
  // ======================================================================
  D('peligros_def', q => H.fondo.taller() + `<rect x="0" y="22" width="160" height="178" fill="#fff" opacity=".35"/>` + divider() + pl(80, 30, 'Peligro', '#C62828', 12) + pl(240, 30, 'Riesgo', '#E65100', 12)
    + `<g transform="translate(80,110) scale(2.2) translate(-96,-104)">${H.esmerilMano(80, 100, 0, false)}</g>` + T(80, 158, 'Puede dañar', 10, '#455A64')
    + esmerila(176, 165, { glasses: false }) + anillo(179, 92, 12));
  const icoTorno = i => esc(14 + i * 78, 112, .44, H.torno(0, 0));
  const icoEsm = i => esc(20 + i * 78, 110, .6, P(0, 0, { pose: 'alt1grind' }) + H.esmerilMano(20, -64, 0, true));
  const icoRuido = i => { const x = 8 + i * 78; return esc(x + 14, 110, .7, P(0, 0, { muffs: false })) + ondas(x + 40, 60, 1); };
  const icoCorte = i => { const x = 8 + i * 78; return `<path d="M${x + 8},104 l52,-18 l4,8 l-52,18z" fill="#90A4AE" stroke="#263238" stroke-width="1.2"/><path d="M${x + 10},106 l52,-18" stroke="#ECEFF1" stroke-width="1.4"/>` + guante(x + 30, 58, '#F2C6A0', .7) + `<path d="M${x + 44},86 l4,6" stroke="#D32F2F" stroke-width="2.5"/>`; };
  const icoCarga = i => { const x = 8 + i * 78; return `<line x1="${x + 36}" y1="12" x2="${x + 36}" y2="52" stroke="#37474F" stroke-width="2"/><rect x="${x + 30}" y="50" width="12" height="9" rx="2" fill="#FFC20E" stroke="#263238"/>` + H.eslinga(x + 36, 62, x + 14, x + 58, 82) + H.viga(x + 8, 96, 56, 14) + `<path d="M${x + 14},124 h44 l-6,10 h-32z" fill="#D32F2F" opacity=".3"/>`; };
  const icoSold = i => { const x = 8 + i * 78; return esc(x + 22, 128, .7, W(0, 0, { area: 'soldadura', pose: 'bend', careta: true })) + H.arco(x + 48, 104) + H.humo(x + 46, 96); };
  const icoElec = i => { const x = 8 + i * 78; return H.tablero(x + 14, 50) + `<path d="M${x + 46},104 l6,8 l-4,2 l8,10" stroke="#FF9800" stroke-width="2.5" fill="none" class="alt1Par"/>`; };
  const icoHorq = i => esc(10 + i * 78, 124, .5, H.horquilla(14, 0, { op: false }));
  D('peligros_lista1', q => lisa('#F5F7FA') + [[icoTorno, 'Atrapamiento'], [icoEsm, 'Partículas'], [icoRuido, 'Ruido'], [icoCorte, 'Cortes']].map(([f, l], i) => tile(i, f(i), l)).join('') + T(160, 192, 'Máquinas, herramientas y materiales', 12, '#263238'));
  D('peligros_lista2', q => lisa('#F5F7FA') + [[icoCarga, 'Carga colgada'], [icoSold, 'Humos y arco'], [icoElec, 'Electricidad'], [icoHorq, 'Atropello']].map(([f, l], i) => tile(i, f(i), l)).join('') + T(160, 192, 'Izaje, soldadura, energía y vehículos', 12, '#263238'));
  D('peligros_matriz', q => lisa('#F5F7FA') + (() => { let g = ''; const col = ['#43A047', '#FDD835', '#E53935'];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { const lv = Math.min(2, Math.floor((r + c) / 1.5)); g += `<rect x="${130 + c * 60}" y="${22 + (2 - r) * 40}" width="58" height="38" rx="4" fill="${col[lv]}"/>`; }
    g += `<circle cx="279" cy="41" r="12" fill="none" stroke="#263238" stroke-width="3" class="adPul"/>`;
    g += `<text x="112" y="82" font-size="12" font-weight="bold" text-anchor="middle" fill="#263238" font-family="Arial" transform="rotate(-90 112 82)">Probabilidad</text>` + T(219, 162, 'Consecuencia', 12) + flecha(128, 150, 312, 150, '#455A64', 3) + flecha(122, 146, 122, 18, '#455A64', 3);
    g += T(159, 186, 'Bajo', 11, '#2E7D32') + T(219, 186, 'Medio', 11, '#F9A825') + T(279, 186, 'Alto', 11, '#C62828');
    return g; })() + P(56, 170, { pose: 'point', s: .85 }));
  D('peligros_miper', q => H.fondo.oficina() + `<rect x="96" y="14" width="214" height="134" rx="6" fill="#fff" stroke="#90A4AE" stroke-width="2"/>` + T(203, 32, 'MATRIZ MIPER', 12, '#0E3962')
    + `<rect x="104" y="40" width="198" height="18" fill="#0E3962"/>` + ['Tarea', 'Peligro', 'Riesgo', 'Control'].map((t, i) => T(129 + i * 50, 53, t, 9.5, '#fff')).join('')
    + [0, 1, 2, 3].map(r => `<line x1="104" y1="${78 + r * 20}" x2="302" y2="${78 + r * 20}" stroke="#CFD8DC"/>` + [0, 1, 2, 3].map(c => c === 2 ? `<circle cx="${129 + c * 50}" cy="${68 + r * 20}" r="5" fill="${['#E53935', '#FDD835', '#43A047', '#FDD835'][r]}"/>` : `<rect x="${110 + c * 50}" y="${65 + r * 20}" width="${30 + (r + c) % 3 * 4}" height="5" fill="#B0BEC5"/>`).join('')).join('')
    + P(56, 165, { pose: 'point' }));
  D('peligros_jer', q => lisa('#F5F7FA') + [['Eliminar', '#2E7D32'], ['Sustituir', '#558B2F'], ['Ingeniería', '#F9A825'], ['Administrativos', '#EF6C00'], ['EPP', '#C62828']].map(([t, c], i) => { const w1 = 256 - i * 44, w2 = w1 - 44, y = 14 + i * 34; return `<path d="M${146 - w1 / 2},${y} h${w1} l-22,30 h${-w2} z" fill="${c}"/>` + T(146, y + 20, t, 12, '#fff') + T(14, y + 20, String(i + 1), 13, '#455A64'); }).join('')
    + T(296, 26, 'Más', 10, '#2E7D32') + T(296, 38, 'efectivo', 10, '#2E7D32') + T(262, 168, 'Última', 10, '#C62828') + T(262, 180, 'barrera', 10, '#C62828'));
  D('peligros_ejem', q => H.fondo.soldadura() + H.mesaSoldar(90, 165, 110) + H.viga(100, 115, 80, 10) + H.extractor(150, 100) + W(130, 165, { area: 'soldadura', pose: 'bend', careta: true }) + H.arco(160, 106) + H.chispas(160, 108) + H.maqSoldar(30, 165) + H.biombo(240, 165, 46)
    + pl(84, 14, 'Ingeniería: extracción', '#F9A825', 10) + pl(263, 56, 'Ingeniería: biombo', '#F9A825', 10) + pl(140, 178, 'EPP: careta y descarne', '#C62828', 10));
  D('peligros_guarda', q => H.fondo.taller() + H.torno(16, 165) + guardaTorno(16, 165) + P(108, 165, { pose: 'carry', flip: true }) + H.esmerilBanco(250, 165) + lab(60, 40, 56, 80, 'Protección') + lab(250, 70, 238, 92, 'Guarda y visor') + si(q, 300, 40));

  SI_CONT.temas.push({
    id: 'peligros', sec: 'todos', emp: ['ali'], title: 'Peligros y riesgos en la maestranza: identificar y controlar', thumb: 'al_peligros_jer', mins: 15,
    learn: [
      { s: 'al_peligros_def', t: 'Peligro y riesgo no son lo mismo', x: '<ul><li><b>Peligro:</b> todo lo que <b>puede causar daño</b>: el disco del esmeril, el plato del torno, una carga colgada, la electricidad, el ruido.</li><li><b>Riesgo:</b> la <b>posibilidad</b> de que ese peligro te dañe, y qué tan grave sería.</li></ul>El esmeril siempre es un peligro. Usarlo sin lentes ni careta hace que el riesgo de una lesión en el ojo sea alto. Usarlo con la guarda puesta, lentes y careta facial lo baja.' },
      { s: 'al_peligros_lista1', t: 'Peligros del taller (1)', x: '<ul><li><b>Atrapamiento:</b> piezas que giran en tornos, fresas y taladros; rodillos y matrices de la plegadora y la guillotina.</li><li><b>Proyección de partículas:</b> esmeriles, corte, viruta, granallado.</li><li><b>Ruido:</b> esmeriles, martillos, granalla, plegado y corte de planchas.</li><li><b>Cortes:</b> bordes de planchas, rebabas, retazos, zunchos y viruta.</li></ul>' },
      { s: 'al_peligros_lista2', t: 'Peligros del taller (2)', x: '<ul><li><b>Carga suspendida:</b> piezas colgando del puente grúa o del tecle.</li><li><b>Soldadura y oxicorte:</b> humos metálicos, radiación del arco, chispas, gases y cilindros a presión.</li><li><b>Electricidad:</b> tableros, cables de máquinas y soldadoras.</li><li><b>Atropello:</b> grúa horquilla y camiones en el patio.</li><li>Además: <b>caídas</b>, <b>sobreesfuerzo</b> al levantar piezas y <b>radiación UV</b> en faenas al aire libre.</li></ul>' },
      { s: 'al_peligros_matriz', t: '¿Cómo se evalúa un riesgo?', x: 'Se combinan dos preguntas:<ul><li><b>Probabilidad:</b> ¿qué tan seguido puede pasar?</li><li><b>Consecuencia:</b> si pasa, ¿qué tan grave es? ¿Un rasguño, una fractura, una amputación?</li></ul>Así el riesgo queda <b>bajo, medio o alto</b>. Los altos se controlan primero. Una mano cerca de un plato que gira puede pasar seguido y la consecuencia es una amputación: riesgo alto.' },
      { s: 'al_peligros_miper', t: 'La matriz de riesgos (MIPER) y tu derecho a saber', x: 'La empresa tiene una <b>Matriz de Identificación de Peligros y Evaluación de Riesgos (MIPER)</b>: por cada tarea dice sus peligros, cuán alto es el riesgo y qué medidas se toman. Según el DS 44, tienes derecho a <b>conocer los riesgos de tu trabajo</b> y sus medidas antes de empezar: eso se entrega en la inducción y en la información de riesgos laborales. Si te cambian de tarea, pregunta cuáles son los nuevos riesgos.' },
      { s: 'al_peligros_jer', t: 'Jerarquía de controles', x: 'Para controlar un riesgo se busca, en este orden:<ol><li><b>Eliminar</b> el peligro.</li><li><b>Sustituir</b> por algo menos peligroso, como una pintura sin solvente.</li><li><b>Ingeniería:</b> guardas, extracción de humos, biombos, parada de emergencia.</li><li><b>Administrativos:</b> procedimientos, señalización, capacitación, permisos.</li><li><b>EPP:</b> la última barrera, cuando el riesgo no se pudo bajar más.</li></ol>' },
      { s: 'al_peligros_ejem', t: 'Ejemplo: el puesto de soldadura', x: 'En el puesto de soldadura de ALI se ven varios controles juntos:<ul><li><b>Ingeniería:</b> la <b>extracción de humos</b> con la campana cerca del arco, y el <b>biombo</b> que protege a los demás de la radiación.</li><li><b>Administrativo:</b> el procedimiento de trabajos en caliente y la señalización.</li><li><b>EPP:</b> careta de soldar, chaqueta, guantes y polainas de descarne.</li></ul>Ninguno reemplaza a los otros: se suman.' },
      { s: 'al_peligros_guarda', t: 'Las protecciones de las máquinas no se retiran', x: 'Las guardas del esmeril, la protección del plato del torno, las barreras de la guillotina y la plegadora y las paradas de emergencia son <b>controles de ingeniería</b>: te protegen aunque te distraigas. <ul><li><b>Nunca las retires</b> ni las dejes abiertas.</li><li>Si una falta o está dañada, <b>no uses la máquina</b> y avisa.</li><li>No uses una máquina sin capacitación ni autorización.</li></ul>', k: 'Si una protección falta o está dañada, no uses la máquina y avisa de inmediato.' }
    ],
    quiz: [
      { s: 'al_peligros_def', v: [
        { q: '¿Cuál es la diferencia entre peligro y riesgo?', o: ['Peligro puede dañar; riesgo es la posibilidad del daño', 'Son exactamente la misma cosa', 'El riesgo es el daño que ya ocurrió; el peligro, el que viene', 'El peligro solo existe en altura'], w: 'Peligro es lo que puede causar daño; riesgo es la posibilidad de que ese daño ocurra y su gravedad.' },
        { q: 'El disco de un esmeril angular, por sí solo, es:', o: ['Un peligro', 'Un riesgo controlado', 'Un accidente', 'Un control de ingeniería'], w: 'Es algo que puede causar daño: un peligro. El riesgo depende de cómo se use.' },
        { q: 'Usar el esmeril con guarda, lentes y careta facial baja el riesgo de lesión en los ojos.', vf: true, w: 'Verdadero. El peligro sigue ahí, pero los controles bajan la posibilidad y la gravedad del daño.' } ] },
      { s: 'al_peligros_lista1_q', v: [
        { q: '¿Qué peligro principal tiene el plato de un torno que gira?', o: ['Atrapamiento', 'Radiación UV', 'Atropello', 'Caída de altura'], w: 'Lo que gira puede atrapar la ropa, el cabello, un guante o la mano.' },
        { q: '¿Qué peligro tiene el borde recién cortado de una plancha?', o: ['Cortes', 'Ruido', 'Atrapamiento', 'Electricidad'], w: 'Los bordes y rebabas cortan: se manipulan con guantes adecuados.' },
        { q: 'Estás junto a un compañero que esmerila. ¿A qué peligros estás expuesto tú también?', o: ['Partículas y ruido', 'Solo calor', 'Ninguno, no estoy esmerilando', 'Solo atropello'], w: 'Las partículas y el ruido llegan también a quien está cerca. Por eso los lentes van en todo momento.' } ] },
      { s: 'al_peligros_matriz', v: [
        { q: '¿Con qué dos preguntas se evalúa un riesgo?', o: ['Probabilidad y consecuencia', 'Hora y lugar', 'Costo y tiempo', 'Experiencia y edad del trabajador'], w: 'Qué tan seguido puede pasar y qué tan grave sería.' },
        { q: 'Una tarea puede pasar seguido y causar una amputación. Su riesgo es:', o: ['Alto', 'Bajo', 'Medio', 'No se puede saber'], w: 'Alta probabilidad y consecuencia grave: riesgo alto, se controla primero.' },
        { q: 'Los riesgos altos se controlan antes que los bajos.', vf: true, w: 'Verdadero. Se priorizan los riesgos con mayor probabilidad y consecuencia.' } ] },
      { s: 'al_peligros_jer', v: [
        { q: 'En la jerarquía de controles, ¿qué lugar ocupa el EPP?', o: ['El último: la última barrera', 'El primero: lo más efectivo', 'El tercero, junto a ingeniería', 'No forma parte de los controles'], w: 'El EPP es la última barrera, cuando el riesgo no se pudo eliminar ni bajar con otras medidas.' },
        { q: 'La extracción de humos de soldadura es un control de:', o: ['Ingeniería', 'EPP', 'Sustitución', 'Eliminación'], w: 'Es un cambio en el lugar de trabajo que saca el humo antes de que lo respires: ingeniería.' },
        { q: '¿Cuál es el control más efectivo?', o: ['Eliminar el peligro', 'Usar el EPP', 'Poner un letrero', 'Dar una charla'], w: 'Si el peligro desaparece, ya no puede dañar a nadie.' } ] },
      { s: 'al_peligros_ejem', v: [
        { q: 'En el puesto de soldadura, ¿qué protege a los compañeros de la radiación del arco?', o: ['El biombo o cortina de soldadura', 'La campana de extracción de humos', 'La mesa de acero', 'El cable de tierra'], w: 'El biombo es una barrera de ingeniería que protege a quienes están cerca.' },
        { q: 'Si la extracción de humos funciona, ¿puedes soldar sin careta?', o: ['No, la careta igual es obligatoria', 'Sí, la extracción la reemplaza', 'Sí, si es una soldadura corta y rápida', 'Solo si el biombo está puesto'], w: 'Los controles se suman: la extracción no reemplaza a la careta ni al resto del EPP.' },
        { q: 'Vas a soldar y la campana de extracción quedó lejos del arco. ¿Qué haces?', o: ['La acerco al arco antes de soldar', 'Sueldo igual, el humo sube', 'Me alejo un poco y sueldo', 'Apago la extracción para no gastar'], w: 'La campana debe estar cerca del arco para captar el humo antes de que llegue a tu cara.' } ] },
      { s: 'al_peligros_guarda_q', v: [
        { q: 'La guarda del esmeril de banco está suelta. ¿Qué haces?', o: ['No lo uso y aviso de inmediato', 'Lo uso con más cuidado', 'Saco la guarda para trabajar mejor', 'Lo uso solo un momento'], w: 'Si una protección falta o está dañada, no se usa la máquina y se avisa.' },
        { q: 'La protección del plato del torno es un control de:', o: ['Ingeniería', 'EPP', 'Sustitución', 'Administrativo'], w: 'Es una barrera física en la máquina: un control de ingeniería.' },
        { q: 'Se puede retirar una guarda si la tarea es más rápida sin ella.', vf: false, w: 'Falso. Las protecciones nunca se retiran: te protegen aunque te distraigas.' } ] }
    ]
  });

  // ======================================================================
  // TEMA 3 · USO Y CUIDADO DEL EPP
  // ======================================================================
  D('epp_que', q => H.fondo.taller() + P(160, 165, { muffs: 'on', gloves: '#E0C9A6' }) + lab(66, 50, 162, 91, 'Lentes') + lab(254, 60, 155, 93, 'Fonos') + lab(254, 116, 172, 130, 'Guantes') + lab(66, 130, 153, 162, 'Zapatos de seguridad') + pl(160, 2, 'EPP obligatorio', '#1565C0', 11));
  D('epp_lentes', q => H.fondo.taller() + divider() + esmerila(16, 165) + caretaF(16, 165, { pose: 'alt1grind' }) + si(q, 20, 40)
    + esmerila(176, 165, { glasses: false, face: 'pain' }) + `<circle cx="183" cy="92" r="2.2" fill="#FF9800" class="alt1Par"/>` + no(q, 180, 40));
  D('epp_oidos', q => H.fondo.taller() + H.esmerilBanco(214, 165) + H.chispas(236, 104, 7) + P(170, 165, { pose: 'carry', muffs: 'on', gloves: '#E0C9A6' }) + ondas(258, 98, 1)
    + `<rect x="18" y="40" width="96" height="86" rx="8" fill="#fff" stroke="#CFD8DC" stroke-width="1.5"/>` + `<rect x="40" y="70" width="12" height="22" rx="6" fill="#FF9800" stroke="#263238"/><rect x="64" y="70" width="12" height="22" rx="6" fill="#FF9800" stroke="#263238"/><path d="M46,92 q12,16 24,0" stroke="#1565C0" stroke-width="2" fill="none"/>` + pl(66, 102, 'Tapones', '#1565C0', 10) + pl(170, 8, 'Ruido: protección todo el tiempo', '#C62828', 11));
  D('epp_manos', q => lisa('#F5F7FA') + tile(0, guante(14, 40, '#E0C9A6', 1.25), 'Cabritilla', '#6D4C41') + tile(1, guante(92, 40, '#C8A27A', 1.25), 'Descarne', '#8D6E63') + tile(2, guante(170, 40, '#43A047', 1.25), 'Nitrilo', '#2E7D32')
    + tile(3, esc(260, 128, .62, H.taladro(0, 0)) + anillo(271, 92, 14), 'Pieza que gira', '#C62828') + T(160, 192, 'Cada tarea tiene su guante', 12, '#263238'));
  D('epp_pies', q => H.fondo.taller() + P(160, 165, { gloves: '#E0C9A6' }) + `<circle cx="62" cy="80" r="44" fill="#fff" stroke="#CFD8DC" stroke-width="2"/>` + zapato(30, 46, 1.35) + pl(62, 130, 'Puntera de acero', '#1565C0', 10)
    + `<circle cx="258" cy="80" r="44" fill="#fff" stroke="#CFD8DC" stroke-width="2"/>` + joya(226, 46, 1.35) + `<line x1="228" y1="50" x2="288" y2="110" stroke="#D32F2F" stroke-width="5"/>` + pl(258, 130, 'Sin joyas', '#C62828', 10));
  D('epp_soldar', q => H.fondo.soldadura() + H.mesaSoldar(120, 165, 100) + H.viga(130, 115, 80, 10) + H.extractor(186, 100) + W(150, 165, { area: 'soldadura', pose: 'bend', careta: true }) + H.arco(188, 106) + H.chispas(188, 108)
    + lab(80, 40, 180, 105, 'Careta con filtro') + lab(70, 96, 156, 128, 'Chaqueta de descarne') + lab(270, 150, 184, 148, 'Guantes de descarne'));
  D('epp_casco', q => H.fondo.taller() + H.puenteGrua(180, 96, H.eslinga(180, 100, 140, 220, 128) + H.viga(130, 142, 100, 14)) + H.zonaCarga(136, 90) + P(66, 165, { helmet: true, pose: 'point' }) + lab(30, 50, 62, 82, 'Casco'));
  D('epp_cuidado', q => H.fondo.bodega() + P(150, 165, { pose: 'carry' }) + `<g transform="translate(172,110) scale(1.3)">${IC.lentes('#263238')}</g>` + `<rect x="212" y="30" width="104" height="84" rx="8" fill="#fff" opacity=".9"/>` + pl(264, 38, '1 · Revisa', '#1565C0', 10.5) + pl(264, 62, '2 · Limpia y guarda', '#2E7D32', 10.5) + pl(264, 86, '3 · Pide cambio', '#E65100', 10.5));

  SI_CONT.temas.push({
    id: 'epp', sec: 'todos', emp: ['ali'], title: 'Uso y cuidado del EPP', thumb: 'al_epp_que', mins: 15,
    learn: [
      { s: 'al_epp_que', t: 'El EPP es obligatorio', x: 'El <b>elemento de protección personal (EPP)</b> se pone entre tu cuerpo y el peligro. La empresa debe entregártelo y enseñarte a usarlo; tú estás <b>obligado a usarlo y cuidarlo</b> (Ley 16.744 y Reglamento Interno). En el taller lo mínimo es <b>ropa de trabajo, lentes de seguridad y zapatos de seguridad</b>, y cada tarea suma lo suyo. Es la última barrera: si falla, no queda nada entre tú y el daño.', k: 'En la maestranza siempre con toda la implementación de seguridad.' },
      { s: 'al_epp_lentes', t: 'Lentes siempre; careta facial al esmerilar', x: 'Los <b>lentes de seguridad se usan en todo momento</b> dentro del taller y al desplazarte por él, aunque no estés trabajando: la viruta o la chispa del puesto de al lado también llega a tus ojos. Al <b>esmerilar, tornear o cortar</b>, agrega la <b>careta facial</b> sobre los lentes. Si tus lentes están rayados o empañados, pide cambio: un lente que no deja ver también es un riesgo.', k: 'Lentes de seguridad en todo momento dentro del taller.' },
      { s: 'al_epp_oidos', t: 'Protección auditiva: fonos o tapones', x: 'El ruido del esmeril, la granalla, el plegado o el martillo daña el oído <b>de a poco y para siempre</b>: la sordera profesional no tiene cura. <ul><li>Usa fonos o tapones <b>todo el tiempo</b> que estés expuesto, no solo “cuando suena fuerte”.</li><li>Los tapones se ponen bien adentro, con la mano limpia.</li><li>Si tienes que gritar para hablar con alguien a un metro, hay ruido peligroso.</li></ul>La empresa sigue el protocolo PREXOR del Minsal.' },
      { s: 'al_epp_manos', t: 'Guantes según la tarea', x: '<ul><li><b>Cabritilla o cuero:</b> para manipular acero, planchas con bordes y retazos.</li><li><b>Descarne:</b> para soldar y oxicortar.</li><li><b>Nitrilo:</b> para solventes, pinturas y aceites.</li></ul><b>Ojo:</b> cerca de piezas que giran (torno, taladro, fresa) un guante puede ser atrapado y arrastrar la mano. Ahí usa solo lo que indique el procedimiento de esa máquina.' },
      { s: 'al_epp_pies', t: 'Zapatos de seguridad, ropa ajustada y sin joyas', x: '<ul><li><b>Zapatos de seguridad</b> con puntera: te protegen de piezas que caen o ruedan y de cortes en el pie.</li><li><b>Ropa de trabajo</b> abotonada y ajustada; mangas sin colgar.</li><li><b>Prohibido usar anillos, aros colgantes, cadenas, pulseras y reloj</b> en el taller: se enganchan en las máquinas y causan amputaciones.</li><li>Pelo largo, siempre tomado.</li></ul>' },
      { s: 'al_epp_soldar', t: 'Soldadura, oxicorte, pintura y granallado', x: '<ul><li><b>Soldar:</b> careta con el filtro adecuado, chaqueta, guantes y polainas de descarne, y lentes debajo de la careta.</li><li><b>Oxicorte:</b> lentes o careta con filtro para oxicorte y guantes de descarne.</li><li><b>Pintura con pistola y granallado:</b> el respirador con los filtros indicados, bien ajustado a la cara, y el equipo propio de cada cabina.</li></ul>El respirador no sirve si tienes barba en la zona donde sella.' },
      { s: 'al_epp_casco', t: 'Casco donde hay carga suspendida', x: 'Usa <b>casco</b> en las áreas donde se trabaja con <b>puente grúa o tecle</b>, donde hay carga en altura, y siempre en las <b>faenas de clientes</b>, junto con el chaleco reflectante. Ajusta el casco a tu cabeza y usa barbiquejo si te agachas o trabajas en altura. Y recuerda: el casco no te protege si te pones bajo la carga.' },
      { s: 'al_epp_cuidado', t: 'Revisa, guarda y repone', x: '<ul><li><b>Antes de usarlo, revísalo:</b> lentes sin trizaduras, guantes sin rotos, fonos que sellen, filtros vigentes.</li><li><b>Límpialo y guárdalo</b> en su lugar al terminar; no lo dejes sobre la máquina ni tirado.</li><li>Si está dañado o gastado, <b>pide el cambio de inmediato</b>: no trabajes sin él.</li><li>El EPP es personal: los tapones y el respirador no se prestan.</li></ul>' }
    ],
    quiz: [
      { s: 'al_epp_que', v: [
        { q: '¿Quién está obligado a usar y cuidar el EPP entregado?', o: ['El trabajador', 'Solo el jefe de taller', 'Solo el Comité Paritario', 'Nadie, es voluntario'], w: 'La empresa lo entrega y capacita; el trabajador está obligado a usarlo y cuidarlo.' },
        { q: '¿Cuál es el EPP mínimo para estar en el taller?', o: ['Ropa de trabajo, lentes y zapatos de seguridad', 'Solo zapatos de seguridad', 'Casco, chaleco reflectante y guantes de nitrilo', 'Ropa propia y zapatillas'], w: 'Ropa de trabajo, lentes y zapatos de seguridad, y cada tarea suma su propio EPP.' },
        { q: 'En la maestranza se trabaja siempre con toda la implementación de seguridad.', vf: true, w: 'Verdadero. El EPP es obligatorio y es la última barrera entre tú y el daño.' } ] },
      { s: 'al_epp_lentes_q', v: [
        { q: '¿Cuándo se usan los lentes de seguridad en el taller?', o: ['En todo momento', 'Solo al esmerilar', 'Solo si hay chispas', 'Solo en la mañana'], w: 'Lentes en todo momento dentro del taller y al desplazarte: las partículas vienen también de otros puestos.' },
        { q: 'Vas a esmerilar una pieza. ¿Qué protección de ojos y cara usas?', o: ['Lentes y careta facial encima', 'Solo la careta facial', 'Solo lentes oscuros, sin careta', 'Ninguna, es poco rato'], w: 'Al esmerilar, tornear o cortar se usan lentes y, encima, careta facial.' },
        { q: 'Si solo vas pasando por el taller, puedes andar sin lentes.', vf: false, w: 'Falso. Las partículas del puesto de al lado también llegan a tus ojos.' } ] },
      { s: 'al_epp_oidos_q', v: [
        { q: '¿Cuándo debes usar los fonos o tapones?', o: ['Todo el tiempo que estoy expuesto al ruido', 'Solo cuando el ruido me molesta mucho o me duele', 'Solo la primera hora del turno', 'Solo si lo pide el jefe'], w: 'La protección sirve solo si se usa todo el tiempo de exposición.' },
        { q: 'La pérdida de audición por ruido:', o: ['Es permanente y no tiene cura', 'Se recupera con descanso', 'Se cura con gotas', 'Solo afecta a los mayores de 60 años'], w: 'La sordera profesional es irreversible: hay que prevenirla.' },
        { q: 'Si tienes que gritar para hablar con alguien a un metro, hay ruido peligroso.', vf: true, w: 'Verdadero. Es una señal simple de que necesitas protección auditiva.' } ] },
      { s: 'al_epp_manos_q', v: [
        { q: 'Vas a soldar. ¿Qué guantes usas?', o: ['Guantes de descarne', 'Guantes de nitrilo', 'Guantes de lana', 'Sin guantes'], w: 'El descarne resiste el calor y las chispas de la soldadura.' },
        { q: '¿Qué guante es el indicado para manipular solventes y pinturas?', o: ['Nitrilo', 'Descarne', 'Cabritilla', 'Lana'], w: 'El nitrilo resiste los productos químicos; el cuero los absorbe.' },
        { q: '¿Por qué hay que tener cuidado con los guantes cerca de piezas que giran?', o: ['El guante puede ser atrapado', 'Se ensucian con aceite', 'Se gastan muy rápido', 'Hacen más lento el trabajo'], w: 'Un guante atrapado por un torno o un taladro arrastra la mano. Se usa lo que indique el procedimiento de esa máquina.' } ] },
      { s: 'al_epp_soldar_q', v: [
        { q: '¿Qué se usa debajo de la careta de soldar?', o: ['Lentes de seguridad', 'Nada', 'Una gorra de tela gruesa', 'Un pañuelo'], w: 'Al levantar la careta tus ojos quedan expuestos a escoria y partículas: los lentes van siempre debajo.' },
        { q: 'Vas a pintar con pistola. ¿Qué EPP es clave para tus pulmones?', o: ['Respirador con filtros indicados', 'Una mascarilla de tela bien ajustada', 'Solo los lentes', 'Un pañuelo mojado'], w: 'Los solventes y la pintura pulverizada requieren respirador con los filtros indicados y bien ajustado.' },
        { q: 'El respirador sella igual de bien con barba que sin barba.', vf: false, w: 'Falso. La barba impide que el respirador selle, y el aire contaminado entra por los bordes.' } ] },
      { s: 'al_epp_casco', v: [
        { q: '¿Dónde se usa casco en la maestranza?', o: ['Donde hay carga suspendida y en faenas', 'Solo en la oficina', 'Solo al soldar y al esmerilar en la mesa', 'En ningún lugar'], w: 'Casco donde se trabaja con puente grúa o tecle, donde hay carga en altura y en las faenas de clientes.' },
        { q: 'Con casco puesto, ¿puedes pasar bajo una carga suspendida?', o: ['No, nunca bajo la carga', 'Sí, el casco me protege', 'Sí, si es rápido', 'Solo si la carga es liviana'], w: 'El casco no resiste una pieza de acero que cae: nunca se pasa bajo la carga.' },
        { q: 'Vas a trabajar a la faena de un cliente. ¿Qué agregas a tu EPP?', o: ['Casco y chaleco reflectante', 'Solo una gorra', 'Nada, es lo mismo', 'Solo guantes de nitrilo y fonos'], w: 'En faena se usa casco y chaleco reflectante, más lo que exija el cliente.' } ] },
      { s: 'al_epp_cuidado_q', v: [
        { q: 'Tus lentes están rayados y ya no ves bien. ¿Qué haces?', o: ['Pido el cambio de inmediato', 'Trabajo sin lentes', 'Los sigo usando así', 'Los limpio con la polera'], w: 'Un EPP dañado se cambia de inmediato; no se trabaja sin él.' },
        { q: '¿Qué haces con tu EPP al terminar el turno?', o: ['Lo limpio y lo guardo en su lugar', 'Lo dejo sobre la máquina', 'Lo dejo en el suelo', 'Lo presto al compañero del turno siguiente'], w: 'Se limpia y se guarda para que esté en buen estado la próxima vez.' },
        { q: 'Los tapones auditivos se pueden prestar a un compañero.', vf: false, w: 'Falso. El EPP es personal, y los tapones y el respirador nunca se prestan.' } ] }
    ]
  });

  // ======================================================================
  // TEMA 4 · ORDEN Y ASEO EN EL TALLER
  // ======================================================================
  const viaPeat = () => `<rect y="170" width="320" height="24" fill="#B0B8BD"/><rect y="170" width="320" height="3" fill="#FFC20E"/><rect y="191" width="320" height="3" fill="#FFC20E"/>`;
  const gancho = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#455A64" stroke-width="2.6"/><path d="M${x2},${y2} q-6,2 -5,-5" stroke="#455A64" stroke-width="2.6" fill="none"/>`;
  const rollo = (x, y) => `<rect x="${x - 2}" y="${y - 30}" width="4" height="14" fill="#455A64"/>` + [0, 1, 2].map(i => `<ellipse cx="${x}" cy="${y - 4 + i * 3}" rx="${16 - i * 2}" ry="12" fill="none" stroke="#212121" stroke-width="2.6"/>`).join('');
  const estante = (x, y, w = 70, h = 130) => `<rect x="${x}" y="${y - h}" width="4" height="${h}" fill="#E8423A"/><rect x="${x + w - 4}" y="${y - h}" width="4" height="${h}" fill="#E8423A"/>` + [0, 1, 2].map(i => { const yy = y - 30 - i * 35; return `<rect x="${x}" y="${yy}" width="${w}" height="4" fill="#78909C"/>` + caja(x + 8, yy, 22, 16) + caja(x + 36, yy, 24, 12); }).join('');
  D('orden_por', q => H.fondo.taller() + divider() + H.viga(10, 172, 40, 8) + virutas(16, 186, 4) + zuncho(60, 186) + cable(96, 152, 182) + P(86, 165, { pose: 'cc4trip', face: 'worried' }) + no(q, 26, 40)
    + contenedor(236, 165, 'CHATARRA', 64) + P(196, 165, { pose: 'walk' }) + si(q, 186, 40));
  D('orden_viruta', q => H.fondo.taller() + H.torno(20, 165, { gira: false }) + virutas(64, 112, 5) + virutas(66, 184, 4) + P(162, 165, { pose: 'point', flip: true, gloves: '#E0C9A6' }) + gancho(134, 105, 98, 110)
    + lab(60, 30, 60, 96, 'Torno detenido', '#2E7D32') + pl(230, 30, 'Con gancho, nunca con la mano', '#1565C0', 10));
  D('orden_retazos', q => H.fondo.taller() + contenedor(204, 165, 'CHATARRA', 74) + P(140, 165, { pose: 'carry', gloves: '#E0C9A6' }) + `<path d="M146,110 l42,-6 l2,6 l-42,6z" fill="#90A4AE" stroke="#263238"/>` + zuncho(24, 184) + anillo(56, 180, 18)
    + pl(250, 70, 'Retazos a la chatarra', '#2E7D32', 10) + pl(58, 140, 'Zuncho: corta', '#C62828', 10));
  D('orden_vias', q => H.fondo.taller({ vias: false }) + viaPeat() + divider() + H.palletPiezas(40, 186) + P(118, 184, { pose: 'stop', face: 'worried', flip: true }) + no(q, 24, 40)
    + P(240, 184, { pose: 'walk' }) + si(q, 186, 40) + pl(240, 60, 'Vía peatonal libre', '#2E7D32', 10));
  D('orden_cables', q => H.fondo.taller() + divider() + H.maqSoldar(8, 165) + `<path d="M40,152 q10,30 40,28 t40,0 t34,-4" stroke="#212121" stroke-width="3" fill="none"/>` + P(100, 165, { pose: 'cc4trip', face: 'worried' }) + no(q, 130, 40)
    + H.maqSoldar(176, 165) + rollo(262, 124) + `<path d="M216,150 q20,-10 30,-30" stroke="#212121" stroke-width="3" fill="none"/>` + si(q, 296, 40));
  D('orden_aceite', q => H.fondo.taller() + H.torno(6, 165) + aceite(206, 180, 28) + P(272, 165, { pose: 'bend', flip: true, gloves: '#43A047' }) + `<g class="alt1Cae">${[0, 1, 2, 3, 4].map(i => `<circle cx="${226 + i * 4 - (i % 2) * 6}" cy="${142 + (i % 3) * 3}" r="1.6" fill="#A1887F"/>`).join('')}</g>`
    + tarro(152, 165) + lab(206, 120, 206, 176, 'Absorbente') + lab(164, 92, 164, 128, 'Paños con aceite'));
  D('orden_libres', q => H.fondo.taller() + sRect(40, 66, 26, 26, 'ext', '#C62828') + H.extintor(42, 136, 'PQS', .6) + H.tablero(130, 72) + puerta(236, 165, 50, 112, '#90A4AE') + sRect(234, 32, 54, 20, 'salida')
    + pl(54, 140, 'Extintor', '#C62828', 10) + pl(152, 140, 'Tablero', '#455A64', 10) + pl(261, 140, 'Salida', '#2E7D32', 10) + si(q, 300, 90, 12));
  const herr = () => `<rect x="18" y="26" width="150" height="122" rx="4" fill="#A1887F" stroke="#6D4C41" stroke-width="2"/>` + Array.from({ length: 6 }, (_, r) => Array.from({ length: 13 }, (_, c) => `<circle cx="${26 + c * 11}" cy="${34 + r * 20}" r="1.3" fill="#6D4C41"/>`).join('')).join('')
    + `<path d="M40,40 v60" stroke="#78909C" stroke-width="6" stroke-linecap="round"/><circle cx="40" cy="40" r="7" fill="none" stroke="#78909C" stroke-width="4"/>`
    + `<path d="M70,44 v62" stroke="#8D6E63" stroke-width="5"/><rect x="60" y="38" width="20" height="9" rx="2" fill="#546E7A"/>`
    + `<path d="M104,40 v60" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-dasharray="3 3" opacity=".8"/><circle cx="104" cy="40" r="7" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="3 3" opacity=".8"/>`
    + `<path d="M132,44 l-6,30 M140,44 l6,30" stroke="#D32F2F" stroke-width="5" stroke-linecap="round"/><circle cx="136" cy="80" r="4" fill="#455A64"/><path d="M134,84 l-4,22 M138,84 l4,22" stroke="#455A64" stroke-width="3"/>`;
  D('orden_5s', q => `<rect width="320" height="200" fill="#DCE3E8"/>` + herr() + H.pisoTaller(false).replace(/165/g, '170') + [['1 Seleccionar', '#2E7D32'], ['2 Ordenar', '#1565C0'], ['3 Limpiar', '#00838F'], ['4 Estandarizar', '#EF6C00'], ['5 Disciplina', '#C62828']].map(([t, c], i) => pl(246, 18 + i * 28, t, c, 11)).join(''));

  SI_CONT.temas.push({
    id: 'orden', sec: 'todos', emp: ['ali'], title: 'Orden y aseo en el taller', thumb: 'al_orden_por', mins: 12,
    learn: [
      { s: 'al_orden_por', t: '¿Por qué importa el orden en el taller?', x: 'El desorden causa <b>tropiezos, caídas, cortes, golpes e incendios</b>. En una maestranza se juntan virutas, retazos, zunchos, cables, mangueras y aceite: si no se ordenan a medida que se trabaja, el piso se vuelve una trampa. El orden y la limpieza se hacen <b>también durante el trabajo</b>, no solo al final, y son obligación de todos.' },
      { s: 'al_orden_viruta', t: 'Virutas: con la máquina detenida y con gancho', x: 'La viruta del torno, la fresa y el taladro <b>corta como un cuchillo</b> y puede estar caliente.<ul><li>Retírala <b>con la máquina detenida</b>, nunca girando.</li><li>Usa <b>gancho, escobilla o pala</b>, nunca la mano.</li><li>No la soples con aire comprimido hacia ti ni hacia otros.</li><li>Bótala en su recipiente, no en el piso.</li></ul>', k: 'La viruta se retira con la máquina detenida y con gancho, nunca con la mano.' },
      { s: 'al_orden_retazos', t: 'Retazos, zunchos y piezas', x: '<ul><li>Los <b>retazos</b> de plancha y perfil van al <b>contenedor de chatarra</b>, no al piso ni apoyados en la pared.</li><li>Los <b>zunchos</b> cortados saltan y cortan: córtalos con cuidado y llévalos de inmediato a la chatarra.</li><li>Las piezas en proceso, <b>bien apoyadas</b> y calzadas para que no rueden ni se caigan.</li><li>Nada sobresaliendo de mesas o estanterías hacia el paso.</li></ul>' },
      { s: 'al_orden_vias', t: 'Vías peatonales siempre libres', x: 'Las <b>vías peatonales demarcadas</b> son para caminar: no se dejan en ellas piezas, pallets, carros, cables ni herramientas, ni “por un ratito”. Si una vía está bloqueada, la gente camina por donde transitan la grúa horquilla y las cargas. Si encuentras algo en la vía, retíralo si puedes hacerlo sin riesgo y avisa.' },
      { s: 'al_orden_cables', t: 'Cables y mangueras ordenados', x: 'Los cables de la soldadora y del esmeril y las mangueras del oxicorte son una trampa para tropezar y se dañan al pisarlos.<ul><li>Llévalos <b>por el costado</b>, no atravesados en el paso.</li><li>Al terminar, <b>enróllalos y cuélgalos</b> en su soporte.</li><li>No los dejes donde pasa la grúa horquilla ni bajo piezas pesadas.</li><li>Si uno está pelado o con fuga, avisa y no lo uses.</li></ul>' },
      { s: 'al_orden_aceite', t: 'Aceite y refrigerante: limpiar de inmediato', x: 'El aceite, la grasa y el refrigerante de las máquinas dejan el piso muy resbaladizo.<ul><li>Límpialo <b>de inmediato</b> con material <b>absorbente</b>; con agua solo se esparce.</li><li>Los <b>paños con aceite o solvente</b> van a un tarro metálico con tapa: pueden encenderse.</li><li>Si una máquina gotea, avisa para que se repare la causa.</li></ul>' },
      { s: 'al_orden_libres', t: 'Extintores, tableros y salidas despejados', x: 'Los <b>extintores, los tableros eléctricos y las salidas de emergencia</b> deben estar siempre despejados y a la vista. En una emergencia no hay tiempo para mover piezas o pallets. Nunca dejes nada delante de ellos. Si encuentras uno bloqueado, despéjalo si puedes y avisa a tu jefatura.', k: 'Nunca tapes un extintor, un tablero eléctrico ni una salida de emergencia.' },
      { s: 'al_orden_5s', t: 'Las 5S: un lugar para cada cosa', x: '<ol><li><b>Seleccionar:</b> saca lo que no sirve del puesto.</li><li><b>Ordenar:</b> un lugar para cada herramienta, y cada herramienta en su lugar.</li><li><b>Limpiar:</b> el puesto y la máquina, todos los días.</li><li><b>Estandarizar:</b> que todos lo hagan igual, con panel de herramientas y rótulos.</li><li><b>Disciplina:</b> mantenerlo siempre.</li></ol>Al terminar el turno, deja la máquina detenida y limpia y las herramientas guardadas.' }
    ],
    quiz: [
      { s: 'al_orden_viruta_q', v: [
        { q: '¿Cómo se retira la viruta del torno?', o: ['Con el torno detenido y con gancho', 'Con la mano, con el torno girando', 'Soplándola con aire hacia uno', 'Con un guante, sin detenerlo'], w: 'La viruta corta y la máquina atrapa: se retira con la máquina detenida y con gancho o escobilla.' },
        { q: 'La viruta se enreda en la pieza mientras el torno gira. ¿Qué haces?', o: ['Detengo el torno y la saco con gancho', 'La tiro con la mano rápido', 'La corto con un alicate con el torno en marcha', 'Sigo y la saco al final del día'], w: 'Nunca se interviene una máquina en movimiento: primero se detiene.' },
        { q: 'Se puede limpiar una máquina mientras está en funcionamiento si se hace con cuidado.', vf: false, w: 'Falso. Está prohibido limpiar o intervenir equipos en movimiento.' } ] },
      { s: 'al_orden_retazos_q', v: [
        { q: '¿Dónde van los retazos de plancha y perfil?', o: ['Al contenedor de chatarra', 'Al piso junto a la máquina', 'Apoyados en la pared', 'Bajo la mesa de trabajo'], w: 'Los retazos van al contenedor de chatarra: en el piso cortan y hacen tropezar.' },
        { q: 'Cortaste los zunchos de un paquete de perfiles. ¿Qué haces con ellos?', o: ['Los llevo de inmediato a la chatarra', 'Los dejo en el piso para barrerlos después', 'Los tiro detrás de la máquina', 'Los dejo colgando del paquete'], w: 'Los zunchos cortados saltan y cortan: se retiran de inmediato.' },
        { q: 'Una pieza redonda en proceso debe quedar calzada para que no ruede.', vf: true, w: 'Verdadero. Las piezas se dejan bien apoyadas y calzadas para que no rueden ni se caigan.' } ] },
      { s: 'al_orden_vias_q', v: [
        { q: '¿Qué se puede dejar en una vía peatonal demarcada?', o: ['Nada, debe estar libre', 'Pallets, si es por un rato', 'Cables, si van estirados', 'Piezas livianas'], w: 'Las vías peatonales son para caminar y se mantienen siempre libres.' },
        { q: 'Encuentras un pallet con piezas en la vía peatonal. ¿Qué haces?', o: ['Aviso para que se retire de inmediato', 'Paso por la zona de la grúa horquilla, con cuidado', 'Salto por encima del pallet', 'Lo dejo, no es mío'], w: 'Una vía bloqueada obliga a caminar por donde pasan vehículos y cargas: se retira y se avisa.' },
        { q: 'Si la vía peatonal está bloqueada, da lo mismo caminar por donde pasa la grúa horquilla.', vf: false, w: 'Falso. Se camina solo por lugares autorizados; la vía se despeja.' } ] },
      { s: 'al_orden_cables_q', v: [
        { q: '¿Por dónde se lleva el cable de la soldadora?', o: ['Por el costado, fuera del paso', 'Atravesado en el pasillo, bien estirado', 'Bajo una pieza pesada', 'Por donde pasa la grúa'], w: 'Por el costado, para que nadie tropiece y no se dañe el cable.' },
        { q: 'Terminaste de soldar. ¿Qué haces con el cable?', o: ['Lo enrollo y lo cuelgo en su soporte', 'Lo dejo estirado en el piso', 'Lo tiro debajo de la mesa', 'Lo dejo enrollado en el piso junto a la máquina'], w: 'Enrollado y colgado: no estorba y dura más.' },
        { q: 'La manguera del oxicorte tiene una fuga. ¿Qué haces?', o: ['No la uso y aviso', 'La amarro con alambre', 'La uso con cuidado', 'La tapo con cinta y sigo'], w: 'Una fuga de gas es un riesgo de incendio: no se usa y se avisa.' } ] },
      { s: 'al_orden_aceite_q', v: [
        { q: 'Se derramó aceite en el piso. ¿Cómo lo limpias?', o: ['De inmediato, con material absorbente', 'Con agua y detergente, para que se diluya', 'Lo dejo secar solo', 'Lo tapo con un cartón'], w: 'El absorbente recoge el aceite; con agua se esparce y sigue resbalando.' },
        { q: '¿Dónde van los paños con aceite o solvente?', o: ['En un tarro metálico con tapa', 'En el basurero común', 'Colgados sobre la mesa de trabajo', 'En el bolsillo del overol'], w: 'Los paños con aceite o solvente pueden encenderse: van en tarro metálico con tapa.' },
        { q: 'Si una máquina gotea aceite seguido, basta con limpiar el piso cada día.', vf: false, w: 'Falso. Se limpia y además se avisa para que se repare la causa.' } ] },
      { s: 'al_orden_libres_q', v: [
        { q: '¿Qué debe estar siempre despejado y a la vista?', o: ['Extintores, tableros y salidas', 'Solo la oficina del jefe', 'Solo el contenedor de chatarra', 'Solo el estacionamiento'], w: 'En una emergencia hay que llegar sin demora a extintores, tableros y salidas.' },
        { q: 'Un compañero dejó un pallet delante del extintor. ¿Qué haces?', o: ['Lo despejo si puedo y aviso', 'Lo dejo, es por un rato', 'Pongo otro pallet al lado', 'Saco el extintor y lo guardo'], w: 'Un extintor tapado no sirve en la emergencia: se despeja y se avisa.' },
        { q: 'Se puede dejar material delante de un tablero eléctrico si es por poco tiempo.', vf: false, w: 'Falso. Los tableros deben estar siempre despejados, sin excepción.' } ] },
      { s: 'al_orden_5s_q', v: [
        { q: 'En las 5S, “Ordenar” significa:', o: ['Un lugar para cada cosa y cada cosa en su lugar', 'Botar todas las herramientas viejas o en mal estado', 'Limpiar solo los viernes', 'Pedir más estanterías'], w: 'Ordenar es dejar cada herramienta en su lugar definido, fácil de encontrar.' },
        { q: '¿Qué haces al terminar tu turno en la máquina?', o: ['La dejo detenida y limpia, todo guardado', 'La dejo funcionando para el otro turno', 'Dejo las herramientas sobre la bancada', 'Me voy sin revisar nada'], w: 'El que llega debe encontrar un puesto seguro, limpio y ordenado.' },
        { q: 'Si falta una herramienta en el panel, se nota de inmediato por su silueta.', vf: true, w: 'Verdadero. El panel con siluetas es una forma de estandarizar el orden.' } ] }
    ]
  });

  // ======================================================================
  // TEMA 5 · CAÍDAS AL MISMO Y A DISTINTO NIVEL
  // ======================================================================
  const altillo = (x0 = 200, y0 = 90) => `<rect x="${x0}" y="${y0}" width="${320 - x0}" height="8" fill="#607D8B" stroke="#263238"/><rect x="${x0 + 10}" y="${y0 + 8}" width="8" height="${165 - y0 - 8}" fill="#78909C"/><rect x="306" y="${y0 + 8}" width="8" height="${165 - y0 - 8}" fill="#78909C"/>`
    + `<path d="M${x0 + 4},${y0} V${y0 - 44} H320 M${x0 + 4},${y0 - 22} H320" stroke="#FFC20E" stroke-width="4" fill="none"/>` + [x0 + 60, x0 + 100].map(x => `<rect x="${x}" y="${y0 - 44}" width="4" height="44" fill="#FFC20E"/>`).join('') + caja(x0 + 30, y0, 24, 18) + caja(x0 + 70, y0, 20, 14);
  const escalera = (x1 = 110, y1 = 165, x2 = 200, y2 = 90, n = 8) => { const dx = (x2 - x1) / n, dy = (y1 - y2) / n; let d = `M${x1},${y1}`; for (let i = 0; i < n; i++) d += ` v${-dy} h${dx}`;
    return `<path d="${d} V${y1} Z" fill="#90A4AE" stroke="#455A64" stroke-width="1.5"/><path d="${d}" stroke="#263238" stroke-width="2" fill="none"/>` + `<path d="M${x1},${y1 - 40} L${x2 + 6},${y2 - 40}" stroke="#FFC20E" stroke-width="4"/><path d="M${x1},${y1 - 40} v40 M${(x1 + x2) / 2},${(y1 + y2) / 2 - 40} v34" stroke="#FFC20E" stroke-width="3"/>`; };
  D('caidas_intro', q => H.fondo.taller() + divider() + cable(40, 120, 182) + P(86, 165, { pose: 'cc4trip', face: 'worried' }) + pl(80, 30, 'Mismo nivel', '#EF6C00', 11)
    + H.escalaApoyada(250, 165, 110) + `<g transform="rotate(-28 236 120)">${P(236, 120, { pose: 'cc1jump', face: 'worried' })}</g>` + flecha(206, 128, 206, 160, '#C62828', 3) + pl(240, 30, 'Distinto nivel', '#C62828', 11));
  D('caidas_piso', q => H.fondo.taller() + H.torno(6, 165) + aceite(184, 180, 34) + virutas(232, 184, 3) + `<g class="alt1Res">${P(184, 165, { pose: 'cc4trip', face: 'worried' })}</g>` + anillo(184, 180, 20) + pl(250, 40, 'Aceite y virutas', '#C62828', 11));
  D('caidas_trop', q => H.fondo.taller() + H.viga(130, 182, 30, 6) + zuncho(176, 186) + cable(232, 300, 184) + P(76, 165, { pose: 'cc3phone' }) + `<rect x="89" y="100" width="7" height="11" rx="1.5" fill="#263238"/>` + anillo(145, 178, 14) + anillo(200, 182, 14) + no(q, 36, 40));
  D('caidas_esc', q => H.fondo.taller() + altillo() + escalera() + P(150, 132, { pose: 'alt1sube' }) + pl(120, 28, 'Tómate del pasamanos', '#2E7D32', 11) + si(q, 40, 70));
  D('caidas_trepar', q => H.fondo.bodega() + divider() + estante(30, 165, 80, 130) + W(64, 135, { area: 'bodega', pose: 'c4climb' }) + no(q, 136, 40)
    + estante(246, 165, 70, 130) + H.escala(196, 165, 90) + W(216, 135, { area: 'bodega', pose: 'c4reach' }) + si(q, 180, 40));
  D('caidas_escala', q => H.fondo.taller() + altillo(190, 100) + H.escalaApoyada(150, 165, 110) + W(160, 128, { area: 'taller', pose: 'c4climb' })
    + `<path d="M150,170 h28" stroke="#C62828" stroke-width="2"/><path d="M182,165 V100" stroke="#C62828" stroke-width="2" stroke-dasharray="4 3"/>` + pl(100, 180, '1 a 4', '#C62828', 10)
    + `<path d="M176,55 v45" stroke="#1565C0" stroke-width="2" stroke-dasharray="3 2"/>` + pl(100, 50, 'Sobrepasa 1 m', '#1565C0', 10) + pl(70, 100, '3 puntos de apoyo', '#2E7D32', 10));
  D('caidas_altura', q => H.fondo.taller() + `<rect x="190" y="81" width="120" height="6" fill="#607D8B" stroke="#263238"/>` + [194, 300].map(x => `<rect x="${x}" y="87" width="6" height="78" fill="#78909C"/>`).join('')
    + `<path d="M196,81 V46 H310 M196,64 H310" stroke="#FFC20E" stroke-width="3" fill="none"/><rect x="190" y="76" width="120" height="5" fill="#FFC20E" opacity=".8"/>`
    + W(240, 81, { area: 'faena', s: .7 }) + arnes(240, 81, .7, 292, 26) + `<rect x="286" y="22" width="12" height="4" fill="#263238"/>`
    + `<path d="M176,165 V81" stroke="#C62828" stroke-width="2"/><path d="M170,165 h12 M170,81 h12" stroke="#C62828" stroke-width="2"/>` + pl(150, 116, '2,4 m', '#C62828', 10)
    + W(90, 165, { area: 'taller', s: .7, pose: 'point' }) + pl(100, 30, 'Sobre 1,8 m: trabajo en altura', '#1565C0', 11));
  D('caidas_bordes', q => H.fondo.taller() + `<path d="M108,168 h104 l6,24 h-116z" fill="#37474F"/><path d="M108,168 h104" stroke="#FFC20E" stroke-width="3" stroke-dasharray="8 6"/>` + cinta(96, 224, 165, 44) + P(276, 165, { pose: 'walk', flip: true }) + H.letrero(30, 70, 'advertencia', 'FOSO', 44) + pl(160, 40, 'Barrera: no se retira', '#C62828', 11));

  SI_CONT.temas.push({
    id: 'caidas', sec: 'todos', emp: ['ali'], title: 'Caídas al mismo y a distinto nivel', thumb: 'al_caidas_esc', mins: 12,
    learn: [
      { s: 'al_caidas_intro', t: 'Dos tipos de caída', x: '<ul><li><b>Caída al mismo nivel:</b> resbalar o tropezar en el piso donde caminas. Es de las más frecuentes y causa esguinces, fracturas de muñeca y golpes en la cabeza, a veces contra una máquina o una pieza.</li><li><b>Caída a distinto nivel:</b> desde una escala, una escalera, un altillo, una máquina o una estructura. Puede causar fracturas graves y la muerte.</li></ul>Las dos tienen causas que se pueden evitar.' },
      { s: 'al_caidas_piso', t: 'Piso con aceite, refrigerante o virutas', x: 'El aceite y el refrigerante hacen resbalar, y la viruta en el piso actúa como bolitas bajo el zapato.<ul><li>Limpia <b>de inmediato</b> los derrames con absorbente.</li><li>Retira la viruta con escobilla y pala.</li><li>Si no puedes limpiar de inmediato, señaliza y avisa.</li><li>Avisa las fallas del piso: hoyos, planchas sueltas, rejillas levantadas.</li></ul>' },
      { s: 'al_caidas_trop', t: 'Tropiezos: mira dónde pisas', x: 'Los cables, mangueras, retazos y zunchos en el paso hacen tropezar.<ul><li><b>Camina, no corras</b>, ni saltes obstáculos.</li><li>No camines mirando el celular.</li><li>La carga que llevas no debe taparte la vista.</li><li>Camina solo por las vías peatonales y lugares autorizados.</li><li>Si algo estorba en el paso, retíralo o avisa.</li></ul>', k: 'Camina, no corras, y no saltes obstáculos.' },
      { s: 'al_caidas_esc', t: 'Escaleras: siempre del pasamanos', x: '<ul><li>Sube y baja <b>tomado del pasamanos</b>, de frente a los peldaños.</li><li>No corras ni saltes peldaños.</li><li>No subas cargas que te ocupen las dos manos: usa el tecle o pide ayuda.</li><li>Respeta las barandas del altillo: <b>no las retires ni te apoyes</b> para sacar el cuerpo.</li><li>Avisa si un peldaño está suelto o con aceite.</li></ul>' },
      { s: 'al_caidas_trepar', t: 'No trepes a máquinas, estructuras ni estanterías', x: 'Para alcanzar algo en altura, <b>nunca te subas</b> a una máquina, una estructura en fabricación, una estantería, un pallet, una silla o las horquillas de la grúa horquilla. No son superficies aptas para pararse. Usa una <b>escala en buen estado</b> o una plataforma, y pide ayuda si la tarea lo requiere.', k: 'Nunca trepes a máquinas, estructuras ni estanterías: usa una escala o una plataforma.' },
      { s: 'al_caidas_escala', t: 'Uso seguro de escalas', x: '<ul><li>Revísala antes: peldaños firmes, patas con antideslizantes.</li><li>Escala apoyada: <b>1 metro de separación por cada 4 de altura</b>, y que sobrepase <b>1 metro</b> el punto de llegada.</li><li>Escala de tijera: siempre abierta del todo y con el seguro puesto.</li><li>Sube de frente, con <b>3 puntos de apoyo</b>: dos manos y un pie, o dos pies y una mano.</li><li>No uses los últimos peldaños ni te estires hacia el lado.</li></ul>' },
      { s: 'al_caidas_altura', t: 'Trabajo en altura: sobre 1,8 metros', x: 'Todo trabajo <b>sobre 1,8 metros</b> de altura es trabajo en altura, en el taller o en la faena de un cliente. Solo lo puede hacer quien tiene:<ul><li><b>Examen de altura física vigente.</b></li><li>Capacitación y <b>autorización</b> de su jefatura.</li><li>Arnés de seguridad revisado, conectado a un punto de anclaje firme.</li></ul>Se trabaja siguiendo el procedimiento de trabajo en altura. <b>Sin examen de altura vigente no se trabaja en altura</b>.', k: 'Sobre 1,8 metros solo con examen de altura vigente, autorización y arnés conectado.' },
      { s: 'al_caidas_bordes', t: 'Fosos, aberturas y bordes', x: 'Los fosos de máquinas, las aberturas en el piso y los bordes de altillos y estructuras deben estar <b>tapados o con baranda o barrera</b>.<ul><li>Nunca retires una tapa, baranda o barrera para trabajar más cómodo.</li><li>Si tuviste que retirarla con autorización, vuelve a ponerla de inmediato.</li><li>Si ves un hueco sin protección, señalízalo y avisa.</li></ul>' }
    ],
    quiz: [
      { s: 'al_caidas_piso_q', v: [
        { q: 'Hay refrigerante derramado junto al torno. ¿Qué haces?', o: ['Lo limpio de inmediato con absorbente', 'Paso con cuidado y sigo', 'Le echo agua para diluirlo y que se seque', 'Espero que se evapore'], w: 'Los derrames se limpian de inmediato con absorbente: el piso con aceite o refrigerante hace resbalar.' },
        { q: '¿Por qué la viruta en el piso causa caídas?', o: ['Actúa como bolitas bajo el zapato', 'Porque es muy pesada', 'Porque mancha el piso', 'Porque se pega a la suela del zapato'], w: 'La viruta rueda bajo la suela y hace resbalar; además corta.' },
        { q: 'Si no puedes limpiar un derrame de inmediato, debes señalizarlo y avisar.', vf: true, w: 'Verdadero. Se señaliza para que nadie pase y se avisa para limpiarlo.' } ] },
      { s: 'al_caidas_trop_q', v: [
        { q: '¿Qué conducta evita tropiezos en el taller?', o: ['Caminar sin correr, mirando dónde piso', 'Correr para llegar antes', 'Saltar los obstáculos', 'Caminar mirando el celular, pero despacio'], w: 'Caminar atento y sin correr evita la mayoría de los tropiezos.' },
        { q: 'Llevas una pieza que te tapa la vista del piso. ¿Qué haces?', o: ['Pido ayuda o uso un carro', 'Camino igual, conozco el camino', 'Camino de lado para ver un poco', 'Corro para llegar pronto'], w: 'La carga nunca debe tapar la visibilidad: se pide ayuda o se usa un medio mecánico.' },
        { q: 'Saltar un pallet para acortar camino es aceptable si se hace con cuidado.', vf: false, w: 'Falso. No se corre ni se saltan obstáculos; se camina por las vías autorizadas.' } ] },
      { s: 'al_caidas_esc_q', v: [
        { q: '¿Cómo se sube la escalera del altillo?', o: ['Tomado del pasamanos, sin correr', 'Con las dos manos ocupadas con piezas', 'Saltando de dos en dos', 'Mirando el celular'], w: 'Siempre tomado del pasamanos y de frente a los peldaños.' },
        { q: 'Necesitas subir una caja pesada al altillo. ¿Qué haces?', o: ['Uso el tecle o pido ayuda', 'La subo con las dos manos', 'La lanzo a un compañero arriba', 'Subo sin tomarme del pasamanos'], w: 'No se suben cargas que ocupen las dos manos: se usa un medio mecánico o ayuda.' },
        { q: 'Se puede retirar la baranda del altillo para pasar piezas más fácil.', vf: false, w: 'Falso. Las barandas no se retiran: protegen de una caída a distinto nivel.' } ] },
      { s: 'al_caidas_trepar_q', v: [
        { q: 'Necesitas alcanzar algo en lo alto de una estantería. ¿Qué haces?', o: ['Uso una escala en buen estado', 'Trepo por las repisas', 'Me subo a una silla', 'Me paro sobre un pallet bien apilado'], w: 'Las estanterías, sillas y pallets no son aptos para pararse: se usa una escala.' },
        { q: '¿Cuál de estas es una superficie apta para subirse?', o: ['Una escala revisada y bien puesta', 'Las horquillas de la grúa', 'La bancada del torno', 'Una estructura en fabricación ya soldada'], w: 'Solo escalas o plataformas en buen estado; nunca máquinas, horquillas ni estructuras.' },
        { q: 'Subirse a una máquina detenida para alcanzar una lámpara es seguro.', vf: false, w: 'Falso. Las máquinas no son superficies aptas para pararse, aunque estén detenidas.' } ] },
      { s: 'al_caidas_escala_q', v: [
        { q: 'Escala apoyada en un muro: ¿qué separación lleva en la base?', o: ['1 metro por cada 4 de altura', 'Pegada al muro', 'Separada la mitad de su altura total', 'Lo que sea más cómodo'], w: 'La regla es 1 a 4: un metro de separación por cada cuatro de altura.' },
        { q: '¿Cuántos puntos de apoyo mantienes al subir una escala?', o: ['Tres', 'Uno', 'Dos', 'Ninguno, subo rápido'], w: 'Tres puntos de apoyo: dos manos y un pie, o dos pies y una mano.' },
        { q: 'Estás arriba de la escala y la pieza queda un poco lejos. ¿Qué haces?', o: ['Bajo y muevo la escala', 'Me estiro hacia el lado', 'Me paro en el último peldaño', 'Salto hacia la pieza'], w: 'No te estires ni uses los últimos peldaños: baja y reubica la escala.' } ] },
      { s: 'al_caidas_altura_q', v: [
        { q: '¿Desde qué altura se considera trabajo en altura?', o: ['Sobre 1,8 metros', 'Sobre 5 metros', 'Sobre 50 centímetros', 'Sobre 10 metros'], w: 'Todo trabajo sobre 1,8 metros es trabajo en altura y sigue su procedimiento.' },
        { q: 'Tu examen de altura está vencido y te piden subir a una estructura. ¿Qué haces?', o: ['No subo y aviso a mi jefatura', 'Subo con más cuidado', 'Subo sin arnés, es rápido', 'Subo y renuevo el examen después'], w: 'Sin examen de altura vigente no se trabaja en altura.' },
        { q: 'Para trabajar en altura basta con usar arnés, aunque no tenga dónde conectarlo.', vf: false, w: 'Falso. El arnés debe estar conectado a un punto de anclaje firme, y además se necesita examen vigente y autorización.' } ] }
    ]
  });

  // ======================================================================
  // TEMA 6 · MANEJO MANUAL DE CARGA
  // ======================================================================
  const tacos = (x1, x2, y = 165) => `<rect x="${x1}" y="${y - 8}" width="12" height="8" fill="#A1887F" stroke="#5D4037"/><rect x="${x2}" y="${y - 8}" width="12" height="8" fill="#A1887F" stroke="#5D4037"/>`;
  const panza = (x, y) => `<ellipse cx="${x + 8}" cy="${y - 44}" rx="8" ry="10" fill="#22406B" stroke="#22303A" stroke-width="1.2"/>`;
  D('cargas_por', q => H.fondo.taller() + tacos(20, 80) + [0, 1, 2, 3].map(i => H.plancha(14, 157 - i * 6, 84, 6)).join('') + H.viga(112, 165, 86, 12) + H.viga(112, 153, 86, 12) + tacos(222, 268) + eje(214, 157, 74, 7) + saco(290, 165)
    + pl(56, 110, 'Planchas', '#455A64', 10) + pl(155, 120, 'Perfiles', '#455A64', 10) + pl(251, 124, 'Ejes', '#455A64', 10) + pl(298, 102, 'Sacos', '#455A64', 10));
  D('cargas_ley', q => lisa('#F5F7FA') + `<rect y="165" width="320" height="35" fill="#CFD8DC"/>` + P(60, 165, { pose: 'carry' }) + saco(62, 128, '25 kg') + P(160, 165, { pose: 'carry', hair: true }) + saco(162, 128, '20 kg')
    + P(258, 165, { hair: true }) + panza(258, 165) + saco(278, 165, '') + `<path d="M276,140 l32,28 M308,140 l-32,28" stroke="#D32F2F" stroke-width="4"/>`
    + pl(60, 20, 'Hombres: 25 kg', '#1565C0', 11) + pl(160, 44, 'Mujeres: 20 kg', '#6A1B9A', 11) + pl(264, 20, 'Embarazadas: nada', '#C62828', 11));
  D('cargas_eval', q => H.fondo.taller() + eje(30, 165, 50, 3) + tacos(184, 222) + H.plancha(180, 157, 50, 4) + P(160, 165, { pose: 'squat', gloves: '#E0C9A6' })
    + pl(60, 126, 'Eje de 2", 1 m: 16 kg', '#C62828', 10) + pl(226, 64, 'Plancha 1 x 1 m, 3 mm: 24 kg', '#C62828', 10) + pl(160, 30, '¿Cuánto pesa?', '#1565C0', 12));
  D('cargas_tec', q => H.fondo.taller() + divider() + P(56, 165, { pose: 'bend' }) + saco(80, 165) + `<path d="M58,128 q20,-20 34,-6" stroke="#C62828" stroke-width="2.5" fill="none" stroke-dasharray="3 2"/>` + no(q, 130, 40)
    + P(210, 165, { pose: 'squat' }) + saco(216, 165) + `<path d="M202,142 V108" stroke="#2E7D32" stroke-width="2.5" stroke-dasharray="3 2"/>` + si(q, 290, 40));
  D('cargas_giro', q => H.fondo.taller() + divider() + P(100, 165, { pose: 'twist' }) + saco(54, 128) + `<path d="M118,70 a22,10 0 1 1 -40,0" stroke="#C62828" stroke-width="2.5" fill="none"/><path d="M78,70 l-2,-6 l7,2z" fill="#C62828"/>` + no(q, 136, 40)
    + P(220, 165, { pose: 'carry' }) + saco(224, 128) + si(q, 290, 40));
  D('cargas_bordes', q => H.fondo.taller() + tacos(150, 226) + H.plancha(140, 157, 100, 5) + P(122, 165, { pose: 'squat', gloves: '#E0C9A6' }) + lab(270, 100, 236, 154, 'Tacos de madera') + lab(70, 80, 140, 143, 'Guantes') + lab(60, 130, 120, 162, 'Zapatos de seguridad'));
  D('cargas_ayuda', q => H.fondo.taller() + H.puenteGrua(210, 90, H.eslinga(210, 94, 170, 250, 126) + H.viga(160, 140, 100, 14)) + H.zonaCarga(166, 90)
    + `<line x1="98" y1="36" x2="98" y2="100" stroke="#37474F" stroke-width="1.6"/><rect x="93" y="98" width="10" height="18" rx="2" fill="#FFC20E" stroke="#263238"/><circle cx="98" cy="104" r="2" fill="#2E7D32"/><circle cx="98" cy="110" r="2" fill="#C62828"/>`
    + P(76, 165, { pose: 'point', helmet: true }) + pl(110, 176, 'Solo capacitado y autorizado', '#1565C0', 10));
  D('cargas_dos', q => H.fondo.taller() + P(90, 165, { pose: 'lift2', gloves: '#E0C9A6' }) + P(230, 165, { pose: 'lift2', flip: true, gloves: '#E0C9A6' }) + H.viga(94, 124, 132, 10) + bubble(20, 30, '¡A la cuenta de tres!', 130));

  SI_CONT.temas.push({
    id: 'cargas', sec: 'todos', emp: ['ali'], title: 'Manejo manual de carga', thumb: 'al_cargas_tec', mins: 15,
    learn: [
      { s: 'al_cargas_por', t: 'Cargas en la maestranza', x: 'En el taller se mueven <b>planchas, perfiles, ejes, piezas fundidas, sacos de granalla y cilindros</b>. El acero pesa mucho más de lo que aparenta. Levantar mal o de más daña la espalda y los hombros: <b>lumbago, hernias y tendinitis</b> que pueden durar toda la vida. Además, una pieza que se resbala corta las manos o aplasta los pies.' },
      { s: 'al_cargas_ley', t: 'Ley 20.949: pesos máximos', x: 'Sin ayuda mecánica, una persona puede levantar como máximo:<ul><li><b>Hombres: 25 kilos.</b></li><li><b>Mujeres: 20 kilos.</b></li><li>Menores de 18 años: 20 kilos.</li><li><b>Mujeres embarazadas: no pueden levantar ni cargar.</b></li></ul>Son máximos, no metas. Si la carga pesa más, se usa tecle, puente grúa o grúa horquilla, se divide la carga o se levanta entre dos.', k: 'Hombres hasta 25 kilos y mujeres hasta 20 kilos; embarazadas no levantan carga.' },
      { s: 'al_cargas_eval', t: 'Antes de levantar, evalúa', x: '<ul><li><b>¿Cuánto pesa?</b> Una plancha de 1 × 1 metro y 3 mm pesa unos <b>24 kilos</b>; un eje macizo de 2 pulgadas, unos <b>16 kilos por metro</b>. Mira la guía o el plano, o mueve un extremo antes.</li><li><b>¿Tiene bordes filosos o rebabas?</b></li><li><b>¿El camino está libre</b> y sin aceite?</li><li><b>¿Dónde la vas a dejar?</b> Prepara los tacos antes.</li></ul>Si dudas, no la levantes solo.' },
      { s: 'al_cargas_tec', t: 'Levanta con las piernas, no con la espalda', x: '<ul><li>Acércate a la carga y separa los pies, uno un poco adelante.</li><li><b>Dobla las rodillas</b> y mantén la <b>espalda recta</b>.</li><li>Toma la carga firme, con toda la mano.</li><li>Levanta con la fuerza de las piernas, sin tirones.</li><li>Para dejarla, haz lo mismo al revés.</li></ul>', k: 'Rodillas dobladas, espalda recta y la carga pegada al cuerpo.' },
      { s: 'al_cargas_giro', t: 'Carga pegada al cuerpo y sin girar', x: '<ul><li>Lleva la carga <b>pegada al cuerpo</b>: lejos, pesa mucho más para tu espalda.</li><li><b>No gires el tronco</b> con la carga: gira moviendo los pies.</li><li>No levantes por sobre los hombros.</li><li>La carga <b>no debe taparte la vista</b>: mira dónde caminas y a tus compañeros.</li></ul>' },
      { s: 'al_cargas_bordes', t: 'Bordes filosos y pies', x: '<ul><li>Usa <b>guantes</b> de cabritilla o cuero: los bordes y rebabas del acero cortan.</li><li>Usa siempre <b>zapatos de seguridad</b>: una pieza que se cae aplasta el pie.</li><li>Deja la pieza sobre <b>tacos de madera</b>, para sacar los dedos sin que queden apretados.</li><li>Nunca pongas los dedos bajo la pieza al bajarla.</li></ul>' },
      { s: 'al_cargas_ayuda', t: 'Usa las ayudas mecánicas', x: 'Para lo pesado están el <b>tecle, el puente grúa, la grúa horquilla y los carros</b>. Úsalos <b>solo si estás capacitado y autorizado</b> para ese equipo. Revisa eslingas y ganchos antes de izar, guía la carga con una cuerda o vientos cuando sea necesario y <b>nunca te pongas bajo la carga suspendida</b>. Si no estás autorizado, pide a quien sí lo esté.' },
      { s: 'al_cargas_dos', t: 'Entre dos, y con pausas', x: 'Las barras, perfiles y planchas largas se levantan <b>entre dos</b>: de altura parecida, uno da la voz y levantan, caminan y bajan juntos. En tareas repetitivas alterna tareas y haz <b>pausas activas</b>. Si sientes molestias en la espalda, los hombros o las muñecas, avisa de inmediato: la empresa sigue el protocolo TMERT para prevenir estos trastornos.' }
    ],
    quiz: [
      { s: 'al_cargas_ley_q', v: [
        { q: '¿Cuál es el peso máximo que puede levantar un hombre sin ayuda mecánica?', o: ['25 kilos', '50 kilos', '35 kilos', '40 kilos'], w: 'La Ley 20.949 fija 25 kilos para hombres.' },
        { q: '¿Cuál es el peso máximo para una mujer?', o: ['20 kilos', '25 kilos', '30 kilos', '15 kilos'], w: 'Para mujeres y menores de 18 años, el máximo es 20 kilos.' },
        { q: 'Una trabajadora embarazada puede levantar cargas de hasta 10 kilos.', vf: false, w: 'Falso. Las mujeres embarazadas no pueden levantar ni cargar.' } ] },
      { s: 'al_cargas_eval_q', v: [
        { q: 'Una plancha de 1 × 1 metro y 3 mm pesa cerca de:', o: ['24 kilos', '5 kilos', '60 kilos', '2 kilos'], w: 'El acero es pesado: esa plancha pesa unos 24 kilos, casi el máximo para un hombre.' },
        { q: 'Antes de levantar una pieza, ¿qué revisas?', o: ['Peso, bordes, camino y dónde dejarla', 'Solo el color, la marca y el número del plano', 'Solo quién me está mirando', 'Solo el reloj'], w: 'Evaluar el peso, el agarre, el camino y el lugar de destino evita lesiones.' },
        { q: 'No sabes cuánto pesa un eje largo. ¿Qué haces?', o: ['Reviso el peso o pido ayuda antes', 'Lo levanto de un tirón', 'Lo arrastro por el piso', 'Lo levanto doblando la espalda'], w: 'Si dudas, no lo levantes solo: averigua el peso o usa una ayuda mecánica.' } ] },
      { s: 'al_cargas_tec_q', v: [
        { q: '¿Cuál es la postura correcta para levantar?', o: ['Rodillas dobladas y espalda recta', 'Piernas rectas y espalda doblada', 'Espalda doblada y brazos estirados', 'De lado, girando el tronco'], w: 'La fuerza la hacen las piernas; la espalda se mantiene recta.' },
        { q: 'Al levantar, ¿con qué haces la fuerza?', o: ['Con las piernas', 'Con la espalda', 'Con el cuello', 'Con los brazos estirados'], w: 'Las piernas son los músculos más fuertes: levanta con ellas, sin tirones.' },
        { q: 'Levantar con las piernas estiradas y la espalda doblada daña la columna.', vf: true, w: 'Verdadero. Esa postura carga la espalda y causa lumbago y hernias.' } ] },
      { s: 'al_cargas_giro_q', v: [
        { q: 'Llevas un saco y debes dejarlo a tu lado. ¿Qué haces?', o: ['Giro moviendo los pies', 'Giro solo la cintura', 'Lo lanzo hacia el lado', 'Lo suelto y lo empujo'], w: 'Girar el tronco con carga daña la columna: se gira moviendo los pies.' },
        { q: '¿Dónde llevas la carga mientras caminas?', o: ['Pegada al cuerpo', 'Con los brazos estirados', 'Sobre la cabeza', 'Colgando de una mano'], w: 'Lejos del cuerpo pesa mucho más para tu espalda.' },
        { q: 'La carga puede taparte la vista si conoces bien el camino.', vf: false, w: 'Falso. Siempre debes ver dónde caminas y a tus compañeros.' } ] },
      { s: 'al_cargas_bordes_q', v: [
        { q: '¿Para qué sirven los tacos de madera al dejar una plancha?', o: ['Para sacar los dedos sin que queden apretados', 'Para que la plancha no se ensucie ni se oxide con el piso', 'Para que pese menos', 'Para marcar la pieza'], w: 'Los tacos dejan espacio para sacar las manos y para tomarla después.' },
        { q: '¿Qué EPP protege de los bordes y de una pieza que cae?', o: ['Guantes y zapatos de seguridad', 'Lentes de seguridad y careta facial', 'Solo los fonos', 'Solo el casco'], w: 'Guantes para los bordes y rebabas, zapatos de seguridad para los pies.' },
        { q: 'Al bajar una pieza pesada, ¿dónde nunca pones los dedos?', o: ['Debajo de la pieza', 'En los costados', 'En el borde superior', 'En el agarre'], w: 'Bajo la pieza los dedos quedan aplastados: se usan tacos.' } ] },
      { s: 'al_cargas_ayuda_q', v: [
        { q: '¿Quién puede operar el puente grúa?', o: ['Solo quien está capacitado y autorizado', 'Cualquiera que esté cerca', 'Cualquier trabajador con más de un año en el taller', 'Quien llegue primero'], w: 'Los equipos de izaje solo los opera personal capacitado y autorizado.' },
        { q: 'Mientras el puente grúa traslada una viga, ¿dónde te ubicas?', o: ['Fuera de la zona bajo la carga', 'Justo debajo, para guiarla', 'Bajo la carga, con casco', 'Sobre la viga, para equilibrarla'], w: 'Nunca bajo la carga suspendida: si cae, nada te protege.' },
        { q: 'Una pieza pesa 60 kilos y no estás autorizado para usar el tecle. ¿Qué haces?', o: ['Pido a alguien autorizado que lo use', 'Uso el tecle igual, con mucho cuidado', 'La levanto solo', 'La arrastro con una barra'], w: 'Si no estás autorizado, pide a quien sí lo esté; 60 kilos no se levantan a mano.' } ] }
    ]
  });

  // ======================================================================
  // TEMA 7 · ACCIDENTES DEL TRABAJO Y DE TRAYECTO
  // ======================================================================
  const escudo = (x, y) => `<path d="M${x},${y - 48} l38,12 v28 q0,34 -38,50 q-38,-16 -38,-50 v-28z" fill="#1565C0" stroke="#0D47A1" stroke-width="2"/><path d="M${x},${y - 40} l30,10 v22 q0,28 -30,40z" fill="#fff" opacity=".15"/>` + T(x, y + 4, '16.744', 14, '#fff');
  D('accidente_ley', q => H.fondo.oficina() + escudo(220, 70) + P(96, 165, { pose: 'point' }) + pl(220, 132, 'Accidente del trabajo', '#1565C0', 10) + pl(220, 154, 'Accidente de trayecto', '#1565C0', 10) + pl(220, 176, 'Enfermedad profesional', '#1565C0', 10));
  D('accidente_trab', q => { const k = uid('c'); return `<defs><clipPath id="${k}"><rect x="160" y="0" width="160" height="200"/></clipPath></defs>` + H.fondo.taller() + `<g clip-path="url(#${k})">${H.fondo.faena()}</g>` + divider()
    + H.mesaSoldar(60, 165, 90) + H.plancha(66, 115, 70, 4) + P(40, 165, { pose: 'cc1sh', face: 'pain', gloves: false }) + `<circle cx="40" cy="101" r="3" fill="#D32F2F" opacity=".8"/>`
    + W(240, 165, { area: 'faena', pose: 'alt1ojo', face: 'pain' }) + pl(80, 20, 'En la maestranza', '#C62828', 10) + pl(240, 20, 'En la faena de un cliente', '#C62828', 10); });
  D('accidente_avisa', q => H.fondo.taller() + H.lavaojos(36, 165) + P(120, 165, { pose: 'alt1ojo', face: 'pain' }) + jefe(210, 165) + bubble(70, 26, 'Jefe, me entró algo al ojo', 150) + si(q, 290, 50));
  D('accidente_noauto', q => H.fondo.taller() + P(110, 165, { pose: 'alt1ojo', face: 'pain' }) + P(162, 165, { pose: 'point', flip: true }) + `<path d="M134,105 l-16,-6" stroke="#455A64" stroke-width="2.5"/><path d="M134,105 l6,2" stroke="#FFC20E" stroke-width="4"/>` + no(q, 220, 50)
    + pl(160, 22, 'No te saques la partícula ni te automediques', '#C62828', 10));
  D('accidente_achs', q => H.fondo.taller() + esc(26, 34, 1.5, H.fono(0, 0)) + doc(220, 40, 76, 96, 'DIAT') + P(150, 165, { pose: 'cc4phoneup' }) + `<rect x="164" y="88" width="7" height="12" rx="1.5" fill="#263238"/>` + pl(52, 134, 'ACHS', '#2E7D32', 11));
  D('accidente_comp', q => H.fondo.taller() + H.torno(20, 165) + `<circle cx="44" cy="73" r="9" fill="none" stroke="#FFC20E" stroke-width="2.5" class="adPul"/>` + P(66, 165, { pose: 'alt1press', flip: true }) + tendido(270, 165)
    + pl(236, 120, 'No lo muevas', '#C62828', 10) + pl(110, 30, 'Detén la máquina', '#1565C0', 10) + pl(280, 30, 'Llama al 1404', '#2E7D32', 10));
  D('accidente_grave', q => H.fondo.taller() + cinta(40, 250, 165, 50) + `<g transform="rotate(-76 110 165)">${H.escala(110, 165, 90)}</g>` + tendido(220, 168) + P(292, 165, { pose: 'cc4phoneup', flip: true })
    + pl(90, 30, 'Detén la tarea', '#C62828', 10) + pl(180, 54, 'No muevas nada', '#C62828', 10) + pl(260, 30, 'Avisa de inmediato', '#C62828', 10));
  D('accidente_tray', q => lisa('#E3F2FD') + `<rect y="140" width="320" height="60" fill="#A5D6A7"/><rect y="158" width="320" height="24" fill="#78909C"/>` + [0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${8 + i * 46}" y="169" width="22" height="3" fill="#fff"/>`).join('')
    + `<rect x="14" y="104" width="54" height="40" fill="#FFE0B2" stroke="#8D6E63"/><path d="M8,106 l33,-24 l33,24z" fill="#C62828"/><rect x="34" y="120" width="14" height="24" fill="#8D6E63"/>`
    + `<path d="M232,144 V96 l42,-14 l42,14 v48z" fill="#B0BEC5" stroke="#78909C" stroke-width="2"/><rect x="232" y="100" width="84" height="10" fill="#E8423A"/>` + T(274, 108, 'ALI', 8, '#fff')
    + `<rect x="128" y="96" width="52" height="40" fill="#FFF59D" stroke="#F9A825"/>` + T(154, 120, 'TIENDA', 8, '#8D6E00') + `<path d="M154,156 V138" stroke="#C62828" stroke-width="3" stroke-dasharray="4 3"/>` + `<path d="M144,140 l20,14 M164,140 l-20,14" stroke="#C62828" stroke-width="3"/>`
    + flecha(70, 188, 250, 188, '#2E7D32', 4) + W(110, 168, { area: 'taller', pose: 'walk', s: .6 }) + pl(160, 14, 'Trayecto directo casa ↔ trabajo', '#2E7D32', 11));

  SI_CONT.temas.push({
    id: 'accidente', sec: 'todos', emp: ['ali'], title: 'Accidentes del trabajo y de trayecto: qué hacer', thumb: 'al_accidente_avisa', mins: 15,
    learn: [
      { s: 'al_accidente_ley', t: 'Ley 16.744: estás protegido', x: 'La Ley 16.744 es el <b>seguro obligatorio</b> contra accidentes del trabajo y enfermedades profesionales. Cubre:<ul><li><b>Accidente del trabajo.</b></li><li><b>Accidente de trayecto</b>, entre tu casa y el trabajo.</li><li><b>Enfermedad profesional</b>, causada por el trabajo, como la sordera por ruido.</li></ul>Incluye atención médica, rehabilitación y subsidio. En Maestranza ALI la mutualidad es la <b>ACHS</b>.' },
      { s: 'al_accidente_trab', t: '¿Qué es un accidente del trabajo?', x: 'Es <b>toda lesión que sufres a causa o con ocasión de tu trabajo</b> y que te produce incapacidad o la muerte. Por ejemplo, un corte con una plancha, una partícula en el ojo, una quemadura al soldar o un golpe con una pieza. También cuenta si te pasa <b>en la faena de un cliente</b> o haciendo un encargo de la empresa fuera de ella.' },
      { s: 'al_accidente_avisa', t: 'Avisa de inmediato, aunque parezca leve', x: 'Si te accidentas, <b>avisa de inmediato a tu jefatura</b>, aunque sea un corte pequeño o una molestia en el ojo. Una lesión leve mal tratada se complica, y lo que no se avisa a tiempo después es difícil de acreditar. Avisar también permite investigar la causa para que no le pase a otro.', k: 'Todo accidente se avisa de inmediato a la jefatura, aunque parezca leve.' },
      { s: 'al_accidente_noauto', t: 'No te automediques', x: '<ul><li>Si te entra una partícula al ojo, <b>no te frotes</b> ni dejes que un compañero te la saque con una punta, un imán o un paño: puede rayar el ojo o incrustarla más.</li><li>Puedes lavar el ojo con agua limpia o en el lavaojos, y vas a la ACHS.</li><li>No te pongas cremas ni tomes remedios por tu cuenta.</li><li>La atención la da la ACHS, que además deja registro del accidente.</li></ul>' },
      { s: 'al_accidente_achs', t: 'ACHS, fono 1404, y la DIAT', x: 'Si es una urgencia, llama al <b>1404</b>, el número de emergencias de la ACHS. En la atención di que fue un <b>accidente del trabajo</b>. La empresa hace la <b>DIAT</b> (Denuncia Individual de Accidente del Trabajo) ante la ACHS. Si por algún motivo no se hiciera, la puedes presentar tú, tu familia, el Comité Paritario o el médico que te atendió.' },
      { s: 'al_accidente_comp', t: 'Si un compañero se accidenta', x: '<ul><li>Primero tu seguridad: <b>detén la máquina</b> con la parada de emergencia y no te expongas al mismo peligro. Si hay riesgo eléctrico, no lo toques.</li><li>Si cayó o recibió un golpe fuerte, <b>no lo muevas</b>, salvo que siga en peligro.</li><li>Llama al <b>1404</b> y avisa a la jefatura.</li><li>Acompáñalo y abrígalo hasta que llegue la ayuda.</li></ul>' },
      { s: 'al_accidente_grave', t: 'Accidente grave: detener, no mover y avisar', x: 'Es <b>grave</b>, por ejemplo, si hay una caída de más de 1,8 metros, una amputación, se necesita reanimación o rescate, o afecta a varios trabajadores. Si ocurre:<ul><li><b>Detén</b> la tarea en el lugar.</li><li><b>Delimita</b> el área y <b>no muevas nada</b>, salvo para el rescate.</li><li><b>Avisa de inmediato</b> a tu jefatura y llama al <b>1404</b>. La empresa informa a la autoridad.</li></ul>', k: 'Accidente grave: detener la tarea, no mover nada, avisar de inmediato y llamar al 1404.' },
      { s: 'al_accidente_tray', t: 'Accidente de trayecto', x: 'Es el que ocurre en el <b>trayecto directo</b>, de ida o de regreso, entre tu casa y el trabajo. Si te desvías por un motivo personal, deja de ser trayecto directo. Para prevenirlo: sin audífonos ni celular al caminar o manejar, respeta las señales y cruza por pasos habilitados. Si te accidentas, atiéndete en la ACHS, avisa a tu jefatura y reúne pruebas: <b>constancia en Carabineros</b>, testigos y el certificado de atención.' }
    ],
    quiz: [
      { s: 'al_accidente_trab_q', v: [
        { q: 'Te cortas la mano con una plancha mientras trabajas. Eso es:', o: ['Un accidente del trabajo', 'Un accidente de trayecto', 'Una enfermedad profesional', 'Un problema personal'], w: 'Es una lesión a causa del trabajo: accidente del trabajo.' },
        { q: 'Estás en la faena de un cliente y te golpeas con una estructura. ¿Está cubierto?', o: ['Sí, es un accidente del trabajo', 'No, porque no fue en la empresa', 'Solo si el cliente lo acepta', 'Solo si fue grave'], w: 'Cuenta todo lo que ocurre a causa o con ocasión del trabajo, también en faenas de clientes.' },
        { q: 'Un accidente del trabajo es toda lesión a causa o con ocasión del trabajo.', vf: true, w: 'Verdadero. Esa es la definición de la Ley 16.744.' } ] },
      { s: 'al_accidente_avisa_q', v: [
        { q: 'Te hiciste un corte pequeño. ¿Qué haces?', o: ['Aviso de inmediato a mi jefatura', 'No digo nada, es poco', 'Aviso al final de la semana, si sigue doliendo', 'Solo me pongo una venda'], w: 'Todo accidente se avisa de inmediato, aunque parezca leve.' },
        { q: 'Si tienes un accidente leve, ¿a quién informas primero?', o: ['A la supervisión o jefatura', 'A un compañero de otro turno', 'A nadie, si no duele', 'Solo a mi familia'], w: 'El accidente leve se informa a la supervisión para atenderte y registrarlo.' },
        { q: 'Un accidente leve que no se avisa a tiempo puede ser difícil de acreditar después.', vf: true, w: 'Verdadero. Por eso se avisa de inmediato.' } ] },
      { s: 'al_accidente_noauto_q', v: [
        { q: 'Te entró una partícula al ojo esmerilando. ¿Qué haces?', o: ['No me froto y voy a la ACHS', 'Me la saco con un imán', 'Me froto hasta que salga', 'Le pido a alguien que la saque con una punta'], w: 'Frotar o sacarla con objetos puede rayar el ojo; se lava con agua y se va a la ACHS.' },
        { q: 'Un compañero ofrece sacarte la partícula con la punta de un destornillador. ¿Qué haces?', o: ['No acepto y voy a la ACHS', 'Acepto si tiene buen pulso', 'Acepto si limpia la punta', 'Le pido que use un alambre'], w: 'Nunca se saca una partícula del ojo con objetos: puede dejar una lesión grave.' },
        { q: 'Ante una lesión del trabajo es mejor automedicarse para no perder tiempo.', vf: false, w: 'Falso. No te automediques: la atención la da la ACHS.' } ] },
      { s: 'al_accidente_achs_q', v: [
        { q: '¿Cuál es el número de emergencias de la ACHS?', o: ['1404', '131', '133', '1407'], w: 'El 1404 es el número de emergencias de la ACHS.' },
        { q: '¿Qué es la DIAT?', o: ['La denuncia del accidente del trabajo', 'Un tipo de EPP', 'Un examen médico anual que hace la ACHS', 'Un permiso para faltar'], w: 'Es la Denuncia Individual de Accidente del Trabajo, que se presenta en la ACHS.' },
        { q: 'Ocurre un accidente grave en el taller. ¿A qué número llamas?', o: ['Al 1404 de la ACHS', 'Al número de un amigo', 'A ninguno, espero', 'Al teléfono del cliente'], w: 'En un accidente grave se avisa a la jefatura y se llama al 1404 de la ACHS.' } ] },
      { s: 'al_accidente_comp_q', v: [
        { q: 'Un compañero quedó lesionado junto al torno en marcha. ¿Qué haces primero?', o: ['Detengo el torno con la parada', 'Lo saco tirándolo del brazo', 'Busco mi celular para grabar', 'Sigo trabajando'], w: 'Primero tu seguridad y la de él: se detiene la máquina con la parada de emergencia.' },
        { q: 'Un compañero cayó y se golpeó fuerte. ¿Lo mueves?', o: ['No, salvo que siga en peligro', 'Sí, lo siento de inmediato', 'Sí, lo llevo caminando', 'Sí, lo levanto entre dos'], w: 'Puede tener una lesión de columna: no se mueve, salvo que siga en peligro.' },
        { q: 'Si un compañero recibió una descarga eléctrica, debes tocarlo de inmediato para ayudarlo.', vf: false, w: 'Falso. Primero se corta la energía; si lo tocas, la corriente puede pasar a ti.' } ] },
      { s: 'al_accidente_grave_q', v: [
        { q: 'Ocurrió un accidente grave. ¿Qué se hace con el lugar?', o: ['Se detiene la tarea y no se mueve nada', 'Se limpia y se ordena de inmediato para seguir', 'Se sigue trabajando al lado', 'Se retiran las herramientas'], w: 'Se detiene la tarea, se delimita y no se mueve nada, salvo para el rescate.' },
        { q: '¿Cuál es un ejemplo de accidente grave?', o: ['Una caída de más de 1,8 metros', 'Un rasguño en la mano', 'Una astilla pequeña', 'Un moretón leve en el brazo izquierdo'], w: 'Caída de más de 1,8 m, amputación, reanimación, rescate o varios afectados son ejemplos de accidente grave.' },
        { q: 'En un accidente grave se avisa de inmediato y se llama al 1404 de la ACHS.', vf: true, w: 'Verdadero. Además, la empresa informa a la autoridad.' } ] },
      { s: 'al_accidente_tray_q', v: [
        { q: '¿Qué es un accidente de trayecto?', o: ['El que ocurre entre la casa y el trabajo', 'Cualquier accidente que ocurre un fin de semana', 'El que ocurre dentro del taller', 'El que ocurre en vacaciones'], w: 'Es el ocurrido en el trayecto directo, de ida o regreso, entre la casa y el trabajo.' },
        { q: 'Al salir del trabajo pasas a comprar a otra comuna y te accidentas. ¿Es trayecto?', o: ['No, porque me desvié', 'Sí, siempre lo es', 'Sí, si fue de noche', 'Sí, si iba en bus'], w: 'Si te desvías por un motivo personal, deja de ser trayecto directo.' },
        { q: '¿Qué ayuda a acreditar un accidente de trayecto?', o: ['Constancia en Carabineros y testigos', 'Una foto del calendario', 'Una carta firmada por un vecino del barrio', 'Nada, basta con contarlo'], w: 'La constancia, los testigos y el certificado de atención ayudan a acreditarlo.' } ] }
    ]
  });
  window.HT_ACT = (window.HT_ACT || []).concat([
    { tema: 'autocuidado', tipo: 'tarjetas', q: '🧩 Actividad: ¿lo hace una persona o está en el lugar? Desliza cada tarjeta.',
      cats: ['🙋 Acción insegura', '🏚️ Condición insegura'], sub: ['lo hace una persona', 'está en el lugar'],
      items: [['Esmerilar sin lentes de seguridad', 0, 'al_autocuidado_acto_q'], ['Aceite derramado en la vía peatonal', 1, 'al_autocuidado_avisa_q'], ['Cable de la soldadora cruzando el paso', 1, 'al_orden_cables_q:L'],
        ['Trepar por una estantería', 0, 'al_caidas_trepar_q:L'], ['Pallet con piezas en la vía peatonal', 1, 'al_orden_vias_q:L'], ['Levantar un saco doblando la espalda', 0, 'al_cargas_tec_q:L']],
      w: 'Acción insegura: lo que una persona hace o deja de hacer. Condición insegura: algo del lugar, la máquina o el material que puede causar un accidente.' },
    { tema: 'cargas', tipo: 'orden', q: '🧩 Actividad: ordena los pasos para levantar una pieza a mano.',
      items: ['Evalúo el peso y los bordes; si pesa mucho, uso el tecle o pido ayuda', 'Me pongo guantes, me acerco a la pieza y separo los pies', 'Doblo las rodillas con la espalda recta', 'La tomo firme y la levanto con las piernas, pegada al cuerpo'],
      w: 'Primero evalúas peso y bordes; después te acercas con guantes y los pies separados, doblas las rodillas con la espalda recta y levantas con las piernas, con la pieza pegada al cuerpo.' }
  ]);

  // ======================================================================
  // TEMA 8 · PREVENCIÓN DE INCENDIOS Y USO DEL EXTINTOR
  // ======================================================================
  const manta = (x, y, w = 70, h = 40) => `<path d="M${x},${y} q2,${-h} ${w * .3},${-h} h${w * .4} q${w * .3},0 ${w * .3},${h}z" fill="#9E9E9E" stroke="#616161" stroke-width="1.5"/>` + [1, 2, 3].map(i => `<path d="M${x + w * i / 4},${y - h + 4} v${h - 6}" stroke="#757575" stroke-width="1"/>`).join('');
  const pallet = (x, y, w = 60) => `<rect x="${x}" y="${y - 8}" width="${w}" height="8" fill="#A1887F" stroke="#5D4037"/><rect x="${x + 4}" y="${y - 4}" width="8" height="4" fill="#5D4037"/><rect x="${x + w / 2 - 4}" y="${y - 4}" width="8" height="4" fill="#5D4037"/><rect x="${x + w - 12}" y="${y - 4}" width="8" height="4" fill="#5D4037"/>`;
  const lata = (x, y, c = '#1565C0') => `<rect x="${x}" y="${y - 20}" width="18" height="20" rx="2" fill="${c}" stroke="#263238"/><rect x="${x}" y="${y - 22}" width="18" height="3" fill="#90A4AE" stroke="#263238" stroke-width=".8"/>`;
  const humoN = (x, y, s = 1) => `<g class="adHumo">${[0, 1, 2].map(i => `<ellipse cx="${x + i * 14 * s}" cy="${y - i * 10 * s}" rx="${18 * s}" ry="${10 * s}" fill="#616161" opacity=".55"/>`).join('')}</g>`;
  D('incendios_tri', q => lisa('#FFF8E1') + `<path d="M160,24 L262,172 H58z" fill="none" stroke="#263238" stroke-width="6" stroke-linejoin="round"/><path d="M160,24 L58,172" stroke="#6D4C41" stroke-width="6"/><path d="M160,24 L262,172" stroke="#E65100" stroke-width="6"/><path d="M58,172 H262" stroke="#1E88E5" stroke-width="6"/>`
    + llama(160, 150, 1.8) + pl(70, 84, 'Combustible', '#6D4C41', 11) + pl(252, 84, 'Calor', '#E65100', 11) + pl(160, 176, 'Oxígeno (aire)', '#1E88E5', 11));
  const claseCard = (i, letra, c, inner, nom) => { const x = 10 + i * 102; return `<rect x="${x}" y="10" width="96" height="180" rx="10" fill="#fff" stroke="#CFD8DC" stroke-width="1.5"/><circle cx="${x + 48}" cy="38" r="18" fill="${c}"/>` + T(x + 48, 45, letra, 20, '#fff') + inner + pl(x + 48, 160, nom, c, 10); };
  D('incendios_clases', q => lisa('#F5F7FA') + claseCard(0, 'A', '#2E7D32', pallet(28, 140, 60) + caja(34, 132, 30, 24) + `<path d="M68,132 q6,-12 14,-4 q4,6 -2,4" fill="#ECEFF1" stroke="#90A4AE"/>`, 'Sólidos')
    + claseCard(1, 'B', '#C62828', H.bidon(124, 140, '#E65100', 'DILUYENTE', 1) + lata(168, 140, '#1565C0'), 'Líquidos')
    + claseCard(2, 'C', '#1565C0', H.tablero(238, 70) + `<path d="M270,132 l6,8 l-4,2 l8,10" stroke="#FF9800" stroke-width="2.5" fill="none" class="alt1Par"/>`, 'Eléctricos'));
  D('incendios_caliente', q => H.fondo.taller() + H.mesaSoldar(70, 165, 100) + H.viga(80, 115, 80, 10) + W(110, 165, { area: 'soldadura', pose: 'bend', careta: true }) + H.arco(140, 106) + H.chispas(140, 108) + H.chispas(150, 116, 9, 1) + H.chispas(132, 116, 7, -1)
    + H.extintor(26, 165, 'PQS', .6) + manta(226, 165, 76, 42) + pl(60, 60, 'Extintor a mano', '#C62828', 10) + pl(262, 100, 'Manta ignífuga', '#455A64', 10) + pl(170, 28, 'Sin combustibles cerca: 10 m', '#E65100', 11));
  D('incendios_solventes', q => H.fondo.bodega() + H.bidon(30, 165, '#E65100', 'DILUYENTE', 1.1) + lata(76, 165, '#1565C0') + lata(98, 165, '#2E7D32') + lata(87, 143, '#C62828') + tarro(130, 165)
    + `<rect x="196" y="44" width="76" height="76" rx="6" fill="#fff" opacity=".95"/>` + sProh(234, 82, 30, 'cig') + pl(234, 132, 'Prohibido fumar', '#C62828', 10) + pl(90, 30, 'Envases cerrados y rotulados', '#1565C0', 10));
  D('incendios_cil', q => H.fondo.taller() + divider() + `<rect x="20" y="40" width="120" height="125" fill="#B0BEC5" opacity=".5"/>` + H.cilindro(40, 165, 'oxigeno', { h: 82 }) + H.cilindro(70, 165, 'acetileno', { h: 78 }) + H.cilindro(100, 165, 'argon', { h: 82 }) + H.cadena(34, 110, 126) + si(q, 140, 40)
    + H.cilindro(290, 172, 'oxigeno', { h: 82, caido: true, capuchon: false }) + aceite(240, 186, 26) + no(q, 300, 40) + pl(240, 120, 'Suelto, sin capuchón', '#C62828', 10));
  D('incendios_elec', q => H.fondo.taller() + H.tablero(30, 60) + `<rect x="80" y="112" width="44" height="10" rx="3" fill="#ECEFF1" stroke="#263238"/>` + [0, 1, 2].map(i => `<rect x="${86 + i * 12}" y="104" width="7" height="9" fill="#263238"/><path d="M${89 + i * 12},104 q${-6 + i * 6},-30 ${-40 + i * 20},-40" stroke="#263238" stroke-width="2" fill="none"/>`).join('') + H.chispas(100, 112, 7) + anillo(102, 116, 18)
    + P(150, 165, { pose: 'point', flip: true }) + `<rect x="210" y="40" width="96" height="100" rx="6" fill="#fff" opacity=".95"/>` + sProh(258, 80, 28, 'cig') + pl(258, 124, 'Fuma solo donde se permite', '#C62828', 9));
  const manometro = (x, y, r = 34) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#263238" stroke-width="3"/><path d="M${x - r * .7},${y + r * .2} A${r * .75},${r * .75} 0 0 1 ${x - r * .3},${y - r * .68}" stroke="#E53935" stroke-width="6" fill="none"/><path d="M${x - r * .3},${y - r * .68} A${r * .75},${r * .75} 0 0 1 ${x + r * .3},${y - r * .68}" stroke="#43A047" stroke-width="6" fill="none"/><path d="M${x + r * .3},${y - r * .68} A${r * .75},${r * .75} 0 0 1 ${x + r * .7},${y + r * .2}" stroke="#E53935" stroke-width="6" fill="none"/><path d="M${x},${y} L${x + 3},${y - r * .62}" stroke="#263238" stroke-width="3" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="4" fill="#263238"/>`;
  D('incendios_ext', q => H.fondo.taller() + sRect(34, 50, 26, 26, 'ext', '#C62828') + H.extintor(36, 140, 'PQS', .62) + sRect(104, 50, 26, 26, 'ext', '#C62828') + H.extintor(106, 140, 'CO2', .62) + manometro(250, 84, 40)
    + pl(250, 140, 'Aguja en el verde', '#2E7D32', 10) + pl(52, 152, 'PQS', '#C62828', 10) + pl(122, 152, 'CO₂', '#455A64', 10) + pl(160, 14, 'Despejado, vigente y señalizado', '#1565C0', 11));
  D('incendios_uso', q => H.fondo.taller() + pallet(222, 165, 60) + llama(254, 157, 1.5) + P(120, 165, { pose: 'alt1ext' }) + H.extintor(126, 148, 'PQS', .55) + `<path d="M135,117 q8,-6 12,-4" stroke="#263238" stroke-width="2.5" fill="none"/>`
    + `<g class="alt1Bar"><path d="M149,113 L236,146 L234,162 Z" fill="#ECEFF1" opacity=".85"/></g>` + pl(32, 20, '1 Seguro', '#C62828', 9) + pl(122, 20, '2 Apunta a la base', '#C62828', 9) + pl(218, 20, '3 Presiona', '#C62828', 9) + pl(287, 20, '4 Barre', '#C62828', 9)
    + `<path d="M120,180 h134" stroke="#1565C0" stroke-width="2"/>` + pl(187, 182, '2 a 3 m', '#1565C0', 9));
  D('incendios_crece', q => H.fondo.taller() + pallet(20, 165, 90) + llama(44, 157, 2) + llama(84, 157, 2.3) + humoN(50, 90, 1.4) + P(200, 165, { pose: 'walk', face: 'worried' }) + puerta(258, 165, 46, 112, '#90A4AE') + sRect(256, 30, 50, 20, 'salida')
    + `<rect x="160" y="70" width="20" height="20" rx="2" fill="#C62828" stroke="#263238"/><circle cx="170" cy="80" r="5" fill="#fff"/>` + pl(170, 98, 'Alarma', '#C62828', 9) + pl(210, 182, 'Bomberos 132', '#C62828', 10));

  SI_CONT.temas.push({
    id: 'incendios', sec: 'todos', emp: ['ali'], title: 'Prevención de incendios y uso del extintor', thumb: 'al_incendios_uso', mins: 15,
    learn: [
      { s: 'al_incendios_tri', t: 'El triángulo del fuego', x: 'Para que haya fuego se necesitan tres cosas a la vez: <b>combustible</b> (madera, cartón, trapos, pintura, solventes, gases), <b>calor</b> (una chispa de esmeril, la escoria de la soldadura, la llama del oxicorte, un cortocircuito, una colilla) y <b>oxígeno</b> (el aire). Si falta una, el fuego no empieza o se apaga. En la maestranza, prevenir incendios es <b>mantener las chispas lejos de lo que se puede quemar</b>.' },
      { s: 'al_incendios_clases', t: 'Clases de fuego', x: '<ul><li><b>Clase A:</b> sólidos: madera, pallets, cartón, trapos, papel.</li><li><b>Clase B:</b> líquidos y gases inflamables: diluyente, pintura, aceite, acetileno.</li><li><b>Clase C:</b> equipos eléctricos con energía: tableros, máquinas, soldadoras.</li></ul>La clase de fuego define qué extintor usar. El extintor de polvo químico seco (PQS) de la empresa sirve para las tres.' },
      { s: 'al_incendios_caliente', t: 'Trabajos en caliente: soldadura, oxicorte y esmeril', x: 'Las chispas y la escoria pueden saltar <b>hasta 10 metros</b> y quedar encendidas por horas en una rendija.<ul><li>Antes de empezar, <b>retira los combustibles</b> del área o cúbrelos con <b>manta ignífuga</b>.</li><li>Ten un <b>extintor a mano</b>.</li><li>Usa biombos para no proyectar chispas a otros puestos.</li><li>Al terminar, <b>revisa el lugar</b> por un rato: un fuego puede empezar después.</li><li>En faenas de clientes, trabaja con el permiso de trabajo en caliente que te pidan.</li></ul>', k: 'Antes de soldar o cortar: combustibles fuera o cubiertos, y extintor a mano.' },
      { s: 'al_incendios_solventes', t: 'Pinturas, diluyentes y paños', x: '<ul><li>Envases <b>cerrados y rotulados</b>, en su bodega, lejos de chispas y del sol.</li><li>Saca solo la cantidad que vas a usar en la jornada.</li><li>Pinta con ventilación y lejos de trabajos en caliente.</li><li>Los <b>paños con pintura, diluyente o aceite</b> van en el tarro metálico con tapa: pueden encenderse solos.</li><li><b>Prohibido fumar</b> cerca de pinturas y solventes.</li></ul>' },
      { s: 'al_incendios_cil', t: 'Cilindros de gas', x: '<ul><li>Siempre <b>de pie y amarrados</b> con cadena a la pared o a su carro.</li><li>Con <b>capuchón</b> cuando no están conectados.</li><li>Lejos del calor y de las chispas.</li><li>El <b>oxígeno nunca con aceite ni grasa</b>: puede explotar. No toques las válvulas con guantes o manos con grasa.</li><li>Revisa fugas en mangueras y conexiones con agua jabonosa, nunca con una llama.</li><li>Si un cilindro tiene fuga, aléjate y avisa.</li></ul>' },
      { s: 'al_incendios_elec', t: 'Electricidad y cigarros', x: '<ul><li>No sobrecargues enchufes ni uses alargadores en mal estado.</li><li>No uses equipos eléctricos con las manos mojadas.</li><li>Avisa de inmediato cables pelados, enchufes quebrados, olor a quemado o chispas: solo un electricista autorizado repara.</li><li><b>Fuma solo en el lugar habilitado</b> para fumar, y apaga bien la colilla.</li></ul>' },
      { s: 'al_incendios_ext', t: 'Los extintores', x: '<ul><li><b>PQS (polvo químico seco):</b> para fuegos A, B y C.</li><li><b>CO₂:</b> para equipos eléctricos, porque no conduce la electricidad ni deja residuos.</li></ul>Conoce dónde están los extintores de tu área. Deben estar <b>despejados, señalizados y vigentes</b>: con su seguro, la manguera bien y la <b>aguja del manómetro en el verde</b>. Si uno está descargado o sin seguro, avisa.' },
      { s: 'al_incendios_uso', t: 'Cómo usar el extintor', x: '<ul><li><b>1. Retira el seguro</b> (pasador).</li><li><b>2. Acércate</b> a 2 o 3 metros y <b>apunta a la base</b> del fuego, no a las llamas.</li><li><b>3. Presiona</b> la manilla o gatillo.</li><li><b>4. Descarga en barrido</b>, de lado a lado.</li></ul>Mantén una salida a tu espalda. El extintor sirve para <b>amagos</b>, fuegos que recién empiezan.', k: 'Retira el seguro, apunta a la base, presiona y barre de lado a lado.' },
      { s: 'al_incendios_crece', t: 'Si el fuego crece', x: 'Si el fuego es grande, hay mucho humo o no se apaga con un extintor:<ul><li><b>Da la alarma</b> y avisa de inmediato a tu jefatura.</li><li>Sal por la vía de evacuación hacia la zona de seguridad.</li><li>Si hay humo, avanza agachado, cerca del piso.</li><li>No vuelvas a entrar por tus cosas.</li><li>Bomberos: <b>132</b>.</li></ul>' }
    ],
    quiz: [
      { s: 'al_incendios_tri_q', v: [
        { q: '¿Qué tres elementos forman el triángulo del fuego?', o: ['Combustible, calor y oxígeno', 'Agua, aire y tierra', 'Humo, luz y calor', 'Gas, electricidad y agua caliente'], w: 'Si falta uno de los tres, el fuego no empieza o se apaga.' },
        { q: 'En la maestranza, la chispa del esmeril corresponde a:', o: ['El calor', 'El combustible', 'El oxígeno', 'Ninguno'], w: 'La chispa es una fuente de calor que puede encender un combustible cercano.' },
        { q: 'Si se separa el calor del combustible, el fuego no puede empezar.', vf: true, w: 'Verdadero. Por eso se alejan las chispas de lo que se puede quemar.' } ] },
      { s: 'al_incendios_caliente_q', v: [
        { q: 'Vas a soldar y hay cartones y un pallet a 3 metros. ¿Qué haces?', o: ['Los retiro o los cubro con manta ignífuga', 'Sueldo rápido para terminar', 'Les echo agua encima y empiezo a soldar igual', 'Los dejo, están lejos'], w: 'Las chispas saltan hasta 10 metros: se retiran o se cubren los combustibles.' },
        { q: '¿Hasta qué distancia pueden saltar las chispas de soldadura o corte?', o: ['Hasta 10 metros', 'Hasta 30 centímetros', 'Hasta 1 metro', 'No saltan'], w: 'Pueden llegar hasta unos 10 metros y quedar encendidas en una rendija.' },
        { q: '¿Qué debes tener a mano en un trabajo en caliente?', o: ['Un extintor', 'Un bidón de diluyente', 'Trapos con aceite', 'Una radio'], w: 'Un extintor a mano permite apagar un amago de inmediato.' } ] },
      { s: 'al_incendios_solventes_q', v: [
        { q: '¿Dónde van los paños con diluyente o pintura?', o: ['En el tarro metálico con tapa', 'En el basurero común', 'Extendidos sobre el banco de trabajo', 'En el bolsillo'], w: 'Pueden encenderse solos: van en tarro metálico con tapa.' },
        { q: '¿Cómo se guardan los envases de pintura y diluyente?', o: ['Cerrados, rotulados y lejos de chispas', 'Abiertos para que ventilen', 'Junto a la mesa de soldar', 'Al sol, para que no se congelen en invierno'], w: 'Cerrados y rotulados, en su bodega, lejos del calor y las chispas.' },
        { q: 'Se puede fumar cerca de pinturas si el envase está cerrado.', vf: false, w: 'Falso. Se fuma solo en el lugar habilitado, lejos de pinturas y solventes.' } ] },
      { s: 'al_incendios_cil_q', v: [
        { q: '¿Cómo deben estar los cilindros de gas?', o: ['De pie y amarrados con cadena', 'Acostados en el piso', 'Sueltos junto a la pared', 'Acostados y apilados unos sobre otros'], w: 'Un cilindro que cae puede romper la válvula y salir disparado.' },
        { q: '¿Con qué nunca debe tener contacto el oxígeno?', o: ['Con aceite o grasa', 'Con el aire', 'Con el agua jabonosa', 'Con la cadena'], w: 'El oxígeno con aceite o grasa puede encenderse o explotar.' },
        { q: '¿Cómo se revisa si una manguera de oxicorte tiene fuga?', o: ['Con agua jabonosa', 'Con un encendedor', 'Oliendo de cerca', 'Apretándola con la mano'], w: 'Las burbujas muestran la fuga. Nunca se busca una fuga con llama.' } ] },
      { s: 'al_incendios_ext_q', v: [
        { q: '¿Cómo se ve un extintor cargado y vigente?', o: ['Con la aguja del manómetro en el verde', 'Con la aguja en el rojo', 'Sin el seguro puesto, listo para usarlo', 'Sin manguera'], w: 'La aguja en el verde indica presión correcta. Si está en rojo o sin seguro, se avisa.' },
        { q: 'Un fuego en el tablero eléctrico. ¿Qué extintor es el más indicado?', o: ['CO₂', 'Agua', 'Espuma', 'Arena mojada'], w: 'El CO₂ no conduce la electricidad ni deja residuos. Nunca agua sobre equipos energizados.' },
        { q: 'Los extintores deben estar despejados, señalizados y vigentes.', vf: true, w: 'Verdadero. En una emergencia hay que llegar a ellos sin demora y que funcionen.' } ] },
      { s: 'al_incendios_uso_q', v: [
        { q: '¿Cuál es el primer paso para usar un extintor?', o: ['Retirar el seguro', 'Presionar la manilla', 'Barrer de lado a lado', 'Apuntar a las llamas'], w: 'Primero se retira el seguro; luego se apunta a la base, se presiona y se barre.' },
        { q: '¿Hacia dónde diriges la descarga del extintor?', o: ['A la base del fuego', 'A la punta de las llamas', 'Al humo', 'Al techo'], w: 'El fuego se alimenta en la base: ahí se dirige la descarga.' },
        { q: 'Se inicia un amago en un pallet. ¿A qué distancia usas el extintor?', o: ['A 2 o 3 metros', 'A 20 centímetros', 'A 15 metros', 'Desde fuera del galpón'], w: 'A 2 o 3 metros, con una salida a tu espalda.' } ] },
      { s: 'al_incendios_crece_q', v: [
        { q: 'El fuego no se apaga con el extintor y hay mucho humo. ¿Qué haces?', o: ['Doy la alarma y salgo a la zona de seguridad', 'Sigo intentando solo, con otro extintor y sin avisar', 'Vuelvo por mis herramientas', 'Me escondo en la bodega'], w: 'Si el fuego crece, se da la alarma, se avisa y se evacúa.' },
        { q: '¿Cuál es el número de Bomberos?', o: ['132', '131', '133', '1404'], w: 'Bomberos es el 132.' },
        { q: 'Si hay humo al evacuar, debes avanzar agachado, cerca del piso.', vf: true, w: 'Verdadero. Cerca del piso hay menos humo y más aire.' } ] }
    ]
  });

  // ======================================================================
  // TEMA 9 · EMERGENCIAS, SISMOS Y EVACUACIÓN
  // ======================================================================
  const zsSign = (x, y) => `<rect x="${x - 2}" y="${y}" width="4" height="${182 - y}" fill="#78909C"/><rect x="${x - 26}" y="${y - 34}" width="52" height="40" rx="3" fill="#2E7D32" stroke="#fff" stroke-width="2"/>` + ic('persona', x - 9, y - 12, .7) + ic('persona', x + 9, y - 12, .7) + T(x, y + 1, 'ZONA DE SEGURIDAD', 4.6, '#fff');
  const plano = () => `<rect x="146" y="30" width="160" height="112" rx="4" fill="#fff" stroke="#455A64" stroke-width="2"/>` + T(226, 44, 'PLANO DE EVACUACIÓN', 9, '#2E7D32')
    + `<rect x="156" y="52" width="140" height="80" fill="#ECEFF1" stroke="#90A4AE"/><rect x="164" y="60" width="30" height="16" fill="#90A4AE"/><rect x="204" y="60" width="30" height="16" fill="#90A4AE"/><rect x="164" y="100" width="30" height="22" fill="#90A4AE"/>`
    + flecha(220, 110, 270, 110, '#2E7D32', 3) + flecha(250, 70, 270, 100, '#2E7D32', 3) + `<rect x="274" y="96" width="16" height="22" fill="#2E7D32"/><circle cx="200" cy="90" r="4" fill="#C62828"/>` + T(200, 87, '', 6);
  const sirena = (x, y) => `<path d="M${x},${y - 6} h10 l14,-10 v32 l-14,-10 h-10z" fill="#D32F2F" stroke="#263238"/>` + ondas(x + 22, y, 1);
  D('emergencias_plan', q => H.fondo.taller() + plano() + P(96, 165, { pose: 'point' }) + pl(80, 30, 'Tú estás aquí', '#C62828', 10) + `<path d="M120,40 Q170,70 196,88" stroke="#C62828" stroke-width="1.5" fill="none" stroke-dasharray="3 2"/>`);
  D('emergencias_vias', q => H.fondo.taller() + sFlecha(120, 60, 40) + sFlecha(190, 60, 40) + puerta(262, 165, 46, 112, '#90A4AE') + sRect(258, 30, 54, 20, 'salida') + P(110, 165, { pose: 'walk' }) + P(180, 165, { pose: 'walk' }) + pl(70, 30, 'Señales verdes', '#2E7D32', 10));
  D('emergencias_alarma', q => H.fondo.taller() + H.torno(20, 165) + `<circle cx="44" cy="73" r="9" fill="none" stroke="#FFC20E" stroke-width="2.5" class="adPul"/>` + P(66, 165, { pose: 'alt1press', flip: true }) + sirena(236, 60) + H.carroOxi(250, 165) + lab(240, 112, 266, 70, 'Cierra el gas')
    + pl(130, 22, 'Detén la máquina', '#C62828', 10));
  D('emergencias_sismo', q => `<g class="alt1Sis">${H.fondo.taller() + H.puenteGrua(70, 80, H.eslinga(70, 84, 40, 100, 108) + H.viga(30, 122, 80, 12)) + estante(250, 165, 66, 130)}</g>` + `<g class="alt1Cae">${caja(262, 100, 22, 16)}</g>`
    + W(166, 165, { area: 'taller', pose: 'squat' }) + `<path d="M160,104 q4,-10 14,-6" stroke="#22406B" stroke-width="5" fill="none"/>` + pl(160, 30, 'Lejos de estanterías y cargas colgadas', '#C62828', 10));
  D('emergencias_evac', q => H.fondo.taller() + sFlecha(40, 60, 44) + sFlecha(150, 60, 44) + puerta(268, 165, 44, 112, '#90A4AE') + sRect(264, 30, 52, 20, 'salida') + [60, 120, 180, 230].map((x, i) => P(x, 165, { pose: 'walk', hair: i === 1 })).join('')
    + pl(120, 182, 'Rápido, sin correr ni empujar', '#2E7D32', 10));
  D('emergencias_zona', q => H.fondo.patio() + zsSign(50, 120) + [104, 136, 168, 200].map((x, i) => W(x, 182, { area: 'taller', hair: i === 2 })).join('') + jefe(262, 182) + doc(234, 132, 22, 28, '', '#2E7D32')
    + pl(160, 14, 'Quédate hasta que se controle la emergencia', '#2E7D32', 10));
  D('emergencias_nino', q => H.fondo.patio() + zsSign(270, 120) + P(140, 182, { pose: 'walk' }) + W(176, 182, { area: 'oficina', s: .55, shirt: '#F06292', pants: '#5C6BC0' }) + `<path d="M156,144 q8,4 12,0" stroke="#F2C6A0" stroke-width="3" fill="none"/>`
    + flecha(200, 192, 250, 192, '#2E7D32', 3) + pl(110, 14, 'Llévalo a la zona de seguridad', '#2E7D32', 10) + pl(200, 38, 'y avisa para ubicar a sus padres', '#1565C0', 10));
  D('emergencias_simul', q => H.fondo.patio() + zsSign(46, 120) + [96, 126, 156, 186].map(x => W(x, 182, { area: 'taller' })).join('') + jefe(252, 182, { pose: 'point' }) + `<circle cx="290" cy="60" r="18" fill="#fff" stroke="#263238" stroke-width="2"/><path d="M290,60 v-12 M290,60 l8,5" stroke="#263238" stroke-width="2"/>`
    + pl(150, 14, 'Simulacro: se practica en serio', '#1565C0', 11));

  SI_CONT.temas.push({
    id: 'emergencias', sec: 'todos', emp: ['ali'], title: 'Emergencias, sismos y evacuación', thumb: 'al_emergencias_zona', mins: 15,
    learn: [
      { s: 'al_emergencias_plan', t: 'El plan de emergencia', x: 'Maestranza ALI tiene un <b>plan de emergencia</b>, que recibiste como procedimiento: dice qué hacer ante un incendio, un sismo o una fuga de gas, cómo se da la alarma y quién dirige la evacuación. Tú debes saber:<ul><li>Cómo suena la alarma.</li><li>Cuál es tu vía de evacuación desde tu puesto.</li><li>Dónde está la <b>zona de seguridad</b>.</li><li>Quién dirige la emergencia en tu turno.</li></ul>' },
      { s: 'al_emergencias_vias', t: 'Vías de evacuación', x: 'Las vías de evacuación están marcadas con <b>señales verdes</b> con flecha y una persona corriendo: te llevan a la salida. <ul><li>Mantenlas siempre despejadas: nada de piezas, pallets ni carros.</li><li>Nunca cierres con llave ni bloquees una salida de emergencia.</li><li>Fíjate hoy cuál es el camino más corto desde tu puesto, y uno alternativo.</li></ul>' },
      { s: 'al_emergencias_alarma', t: 'Cuando suena la alarma', x: '<ul><li><b>Detén tu máquina</b> con la parada y deja el equipo seguro, si puedes hacerlo sin riesgo.</li><li>Apaga la soldadora y <b>cierra las válvulas</b> del oxicorte.</li><li>Baja la carga del puente grúa, si la tienes izada y es seguro.</li><li><b>No vuelvas por tus cosas</b>.</li><li>Sal por la vía de evacuación hacia la zona de seguridad.</li></ul>' },
      { s: 'al_emergencias_sismo', t: 'Durante un sismo', x: '<b>Mantén la calma y no corras</b> mientras se mueve. En el taller, lo peligroso es lo que puede caer: <b>aléjate de estanterías, piezas apiladas, cargas colgadas del puente grúa y ventanales</b>. Agáchate en un lugar despejado y protege tu cabeza con los brazos. Si operas una máquina, detenla si puedes. Después, evacúa si lo indica quien dirige la emergencia o si ves daños.', k: 'En un sismo: aléjate de lo que puede caer, agáchate y protege tu cabeza.' },
      { s: 'al_emergencias_evac', t: 'Evacúa con orden', x: '<ul><li>Camina rápido, <b>sin correr</b> ni empujar.</li><li>Sigue las señales verdes y la vía peatonal.</li><li>Ayuda a visitas y proveedores, que no conocen el lugar.</li><li>No uses vehículos ni la grúa horquilla para salir.</li><li>Si sientes olor a gas, no enciendas nada ni accionen interruptores.</li></ul>' },
      { s: 'al_emergencias_zona', t: 'En la zona de seguridad', x: 'Al llegar a la <b>zona de seguridad</b>:<ul><li><b>Avisa que estás bien</b> a quien dirige la emergencia: así se sabe de inmediato si falta alguien.</li><li>Informa si falta un compañero, una visita o un proveedor.</li><li><b>Quédate en la zona hasta que la emergencia se controle</b> y te autoricen a volver.</li><li>No vuelvas a entrar por nadie: eso lo hacen los bomberos.</li></ul>', k: 'Permanece en la zona de seguridad hasta que se controle la emergencia y te autoricen a volver.' },
      { s: 'al_emergencias_nino', t: 'Si ves a un niño solo en la empresa', x: 'A veces hay niños de visita o acompañando a un familiar. Si en una emergencia ves a un <b>niño solo</b>, no lo dejes: <b>llévalo contigo a la zona de seguridad</b> y avisa para <b>ubicar a sus padres</b>. Lo mismo con visitas o personas que no conocen el lugar: acompáñalas a la zona.' },
      { s: 'al_emergencias_simul', t: 'Tu parte, antes de la emergencia', x: 'La emergencia se prepara antes:<ul><li>Participa en serio en los <b>simulacros</b>: sirven para practicar y corregir errores.</li><li>Si eres nuevo, pregunta hoy cuál es tu vía de evacuación y dónde está la zona de seguridad.</li><li>Conoce dónde están los extintores, el botiquín y el lavaojos de tu área.</li><li>Si ves una salida bloqueada o una señal rota, avisa.</li></ul>' }
    ],
    quiz: [
      { s: 'al_emergencias_vias_q', v: [
        { q: '¿De qué color son las señales que te guían a la salida?', o: ['Verdes', 'Rojas', 'Amarillas', 'Azules'], w: 'Las señales de evacuación son verdes, con flecha y una persona corriendo.' },
        { q: 'Encuentras un pallet bloqueando una salida de emergencia. ¿Qué haces?', o: ['Lo despejo si puedo y aviso', 'Lo dejo, casi nunca se usa', 'Busco otra salida y no digo nada', 'Le pongo una cinta encima'], w: 'Las salidas deben estar siempre despejadas; un bloqueo se corrige y se avisa.' },
        { q: 'Una salida de emergencia se puede cerrar con llave para que no entren extraños.', vf: false, w: 'Falso. Nunca se cierra con llave ni se bloquea una salida de emergencia.' } ] },
      { s: 'al_emergencias_alarma_q', v: [
        { q: 'Suena la alarma mientras estás en el torno. ¿Qué haces primero?', o: ['Detengo el torno y salgo', 'Termino la pieza y salgo', 'Voy a buscar mi celular', 'Espero a ver qué pasa'], w: 'Se detiene la máquina, si es seguro, y se evacúa sin volver por las cosas.' },
        { q: 'Estás oxicortando y suena la alarma. ¿Qué haces con el equipo?', o: ['Cierro las válvulas y evacúo', 'Lo dejo encendido', 'Me lo llevo encendido', 'Lo dejo en el piso abierto'], w: 'Se cierran las válvulas para no alimentar un posible incendio.' },
        { q: 'Al sonar la alarma, se puede volver al casillero por las cosas personales.', vf: false, w: 'Falso. No se vuelve por las cosas: se evacúa de inmediato.' } ] },
      { s: 'al_emergencias_sismo_q', v: [
        { q: 'Comienza un sismo fuerte en el taller. ¿Qué haces?', o: ['Me alejo de lo que puede caer y me protejo', 'Corro hacia la salida mientras se mueve', 'Me pongo junto a la estantería', 'Me quedo bajo la carga del puente grúa'], w: 'Lo peligroso es lo que cae: te alejas de estanterías y cargas, te agachas y proteges la cabeza.' },
        { q: 'Durante el sismo, ¿de qué te alejas?', o: ['Estanterías, cargas colgadas y ventanales', 'Del centro despejado del taller y de mis compañeros', 'De tus compañeros', 'De la vía peatonal'], w: 'Estanterías, piezas apiladas, cargas colgadas y ventanales pueden caer o romperse.' },
        { q: 'Durante un sismo hay que correr hacia afuera mientras el piso se mueve.', vf: false, w: 'Falso. No se corre mientras se mueve; se evacúa después, con orden.' } ] },
      { s: 'al_emergencias_evac_q', v: [
        { q: '¿Cómo se evacúa?', o: ['Rápido, sin correr ni empujar', 'Corriendo lo más rápido posible', 'En la grúa horquilla', 'Volviendo por las herramientas'], w: 'Caminar rápido y en orden evita caídas y atropellos.' },
        { q: 'Un proveedor que no conoce el lugar está confundido. ¿Qué haces?', o: ['Lo acompaño a la zona de seguridad', 'Le digo que busque la salida por su cuenta', 'Lo ignoro y salgo', 'Le pido que espere adentro'], w: 'Las visitas y proveedores no conocen el lugar: se les acompaña.' },
        { q: 'Si hay olor a gas, no se encienden luces ni equipos al evacuar.', vf: true, w: 'Verdadero. Una chispa puede encender el gas acumulado.' } ] },
      { s: 'al_emergencias_zona_q', v: [
        { q: 'Llegaste a la zona de seguridad por un sismo. ¿Hasta cuándo te quedas?', o: ['Hasta que se controle y me autoricen', 'Solo cinco minutos', 'Hasta que pare de moverse', 'Me voy de inmediato a mi casa a ver a mi familia'], w: 'Se permanece en la zona de seguridad hasta que se controle la emergencia y se autorice volver.' },
        { q: '¿Qué haces al llegar a la zona de seguridad?', o: ['Aviso que estoy bien y si falta alguien', 'Vuelvo de inmediato a buscar a un compañero', 'Me voy a mi casa sin avisar', 'Vuelvo por mis herramientas'], w: 'Así quien dirige la emergencia sabe de inmediato si falta alguien.' },
        { q: 'Si falta un compañero, debes volver a entrar a buscarlo tú mismo.', vf: false, w: 'Falso. Se informa de inmediato a quien dirige la emergencia; el rescate lo hacen los bomberos.' } ] },
      { s: 'al_emergencias_nino_q', v: [
        { q: 'En una evacuación ves a un niño solo dentro de la empresa. ¿Qué haces?', o: ['Lo llevo a la zona y aviso a sus padres', 'Le digo que espere ahí', 'Sigo de largo: no es mi responsabilidad cuidarlo', 'Lo dejo en la oficina'], w: 'No se deja solo: se lleva a la zona de seguridad y se avisa para ubicar a sus padres.' },
        { q: 'Si encuentras a un niño solo durante una emergencia, debes:', o: ['Buscar a sus padres y llevarlo a zona segura', 'Dejarlo donde está para que lo encuentren', 'Mandarlo a la calle', 'Esperar que termine la emergencia'], w: 'Lo llevas a la zona de seguridad y se busca a sus padres.' },
        { q: 'Un niño solo en la empresa durante una emergencia debe ir a la zona de seguridad acompañado.', vf: true, w: 'Verdadero. Nunca se le deja solo.' } ] }
    ]
  });
  window.HT_ACT = (window.HT_ACT || []).concat([
    { tema: 'incendios', tipo: 'orden', q: '🧩 Actividad: ordena los pasos para usar el extintor.',
      items: ['Retiro el seguro (pasador)', 'Me acerco a 2 o 3 metros y apunto a la base del fuego', 'Presiono la manilla', 'Descargo en barrido, de lado a lado'],
      w: 'Seguro, apuntar a la base, presionar y barrer de lado a lado, a 2 o 3 metros del fuego y con una salida a tu espalda.' },
    { tema: 'emergencias', tipo: 'orden', q: '🧩 Actividad: suena la alarma de evacuación. Ordena lo que haces.',
      items: ['Detengo la máquina y cierro el gas, si es seguro', 'Salgo sin volver por mis cosas', 'Camino rápido, sin correr, por la vía de evacuación', 'En la zona de seguridad aviso que estoy bien y me quedo ahí'],
      w: 'Dejas tu equipo seguro, sales sin buscar tus cosas, caminas por la vía de evacuación y en la zona de seguridad avisas que estás bien y esperas que se controle la emergencia.' }
  ]);

  // ======================================================================
  // TEMA 10 · SEÑALIZACIÓN Y TRÁNSITO PEATONAL EN EL TALLER
  // ======================================================================
  const camion = (x, y) => `<rect x="${x}" y="${y - 50}" width="70" height="36" fill="#ECEFF1" stroke="#455A64" stroke-width="1.5"/><path d="M${x + 70},${y - 40} h18 l12,14 v12 h-30z" fill="#1565C0" stroke="#263238"/><rect x="${x + 76}" y="${y - 36}" width="12" height="9" fill="#CFE8F7"/>`
    + `<rect x="${x}" y="${y - 16}" width="100" height="6" fill="#455A64"/><circle cx="${x + 16}" cy="${y - 8}" r="8" fill="#263238"/><circle cx="${x + 84}" cy="${y - 8}" r="8" fill="#263238"/>`;
  // grúa horquilla mirando a la izquierda, con el rótulo ALI legible
  const horqF = (x, y, o = {}) => { const g = H.horquilla(x, y, Object.assign({}, o, { flip: false })).replace(/<text([^>]*)>ALI<\/text>/, m => `<g transform="translate(${2 * (x + 24)},0) scale(-1,1)">${m}</g>`); return `<g transform="translate(${2 * x + 60},0) scale(-1,1)">${g}</g>`; };
  const espejo = (x, y) => `<rect x="${x - 2}" y="${y}" width="4" height="20" fill="#455A64"/><circle cx="${x}" cy="${y}" r="15" fill="#CFE8F7" stroke="#FF6F00" stroke-width="4"/><rect x="${x - 2}" y="${y - 4}" width="9" height="6" fill="#E8423A"/>`;
  D('senaletica_tipos', q => lisa('#F5F7FA') + sProh(36, 70, 24, 'cig') + sObl(98, 70, 24, 'lentes') + sAdv(160, 74, 26, 'carga') + sRect(196, 48, 52, 44, 'salida') + sRect(258, 48, 52, 44, 'ext', '#C62828')
    + pl(36, 114, 'Prohibición', '#C62828', 9) + pl(98, 140, 'Obligación', '#1565C0', 9) + pl(160, 114, 'Advertencia', '#8D6E00', 9) + pl(222, 140, 'Evacuación', '#2E7D32', 9) + pl(284, 114, 'Incendio', '#C62828', 9)
    + T(160, 182, 'Color y forma dicen qué significa', 12, '#263238'));
  D('senaletica_proh', q => H.fondo.taller() + `<rect x="40" y="40" width="80" height="80" rx="6" fill="#fff"/>` + sProh(80, 80, 30, 'cig') + puerta(208, 165, 60, 116, '#78909C') + `<rect x="210" y="56" width="56" height="60" rx="4" fill="#fff"/>` + sProh(238, 80, 20, 'persona') + T(238, 112, 'SOLO PERSONAL', 5.6, '#263238')
    + P(150, 165, { pose: 'point', flip: true }) + pl(80, 130, 'Prohibido fumar', '#C62828', 10));
  D('senaletica_obl', q => H.fondo.taller() + `<rect x="30" y="34" width="260" height="58" rx="6" fill="#fff" stroke="#90A4AE"/>` + [['lentes', 70], ['fonos', 130], ['careta', 190], ['mano', 250]].map(([k, x]) => sObl(x, 63, 22, k)).join('')
    + P(160, 165, { pose: 'alt1lentes', muffs: 'neck' }) + pl(160, 176, 'Desde aquí: obligatorio', '#1565C0', 10));
  D('senaletica_adv', q => H.fondo.taller() + H.puenteGrua(230, 90, H.eslinga(230, 94, 196, 264, 120) + H.viga(186, 134, 88, 12)) + H.tablero(40, 74) + `<rect x="24" y="36" width="76" height="34" fill="none"/>` + sAdv(62, 56, 18, 'rayo') + sAdv(160, 70, 22, 'carga') + sAdv(300, 150, 13, 'horq')
    + P(110, 165, { pose: 'point' }) + pl(220, 176, 'Peligro: atención', '#8D6E00', 10));
  D('senaletica_verde', q => H.fondo.taller() + puerta(30, 165, 50, 112, '#90A4AE') + sRect(26, 30, 58, 22, 'salida') + sFlecha(100, 60, 46, -1) + sRect(196, 70, 30, 30, 'ext', '#C62828') + H.extintor(200, 156, 'PQS', .6) + sRect(262, 60, 30, 30, 'botiquin') + H.botiquin(262, 98)
    + pl(80, 130, 'Verde: salida y primeros auxilios', '#2E7D32', 10) + pl(212, 172, 'Rojo: equipo contra incendio', '#C62828', 10));
  D('senaletica_vias', q => `<rect width="320" height="200" fill="#9EA7AD"/>` + [[16, 16, 90, 44, 'TORNOS'], [130, 16, 70, 44, 'FRESAS'], [226, 16, 80, 70, 'SOLDADURA'], [16, 128, 110, 56, 'BODEGA']].map(([x, y, w, h, t]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#607D8B" stroke="#455A64" stroke-width="2"/>` + T(x + w / 2, y + h / 2 + 4, t, 9, '#fff')).join('')
    + `<rect x="0" y="72" width="320" height="22" fill="#B0B8BD"/><rect x="0" y="72" width="320" height="3" fill="#FFC20E"/><rect x="0" y="91" width="320" height="3" fill="#FFC20E"/>`
    + `<rect x="160" y="94" width="40" height="106" fill="#8C959B"/>` + [0, 1, 2, 3, 4].map(i => `<rect x="${162 + i * 8}" y="74" width="5" height="18" fill="#fff"/>`).join('')
    + esc(180, 150, .45, H.horquilla(-30, 0, { op: false, baliza: true })) + [40, 90, 250].map(x => `<circle cx="${x}" cy="83" r="6" fill="#22406B" stroke="#fff" stroke-width="1.5"/>`).join('')
    + pl(260, 108, 'Vía peatonal', '#8D6E00', 10) + pl(250, 150, 'Paso de grúa horquilla', '#C62828', 10));
  D('senaletica_cruce', q => H.fondo.bodega() + `<rect x="150" y="40" width="58" height="125" fill="#78909C" stroke="#455A64" stroke-width="2"/>` + [0, 1, 2].map(i => caja(156, 70 + i * 34, 22, 16) + caja(182, 70 + i * 34, 20, 12) + `<rect x="150" y="${70 + i * 34}" width="58" height="4" fill="#546E7A"/>`).join('')
    + espejo(180, 22) + P(116, 165, { face: 'worried' }) + horqF(258, 165) + `<path d="M120,80 q14,-30 52,-58" stroke="#1565C0" stroke-width="1.5" fill="none" stroke-dasharray="3 2"/>` + pl(80, 36, 'Detente y mira', '#C62828', 11));
  D('senaletica_grua', q => H.fondo.patio() + `<rect y="188" width="320" height="4" fill="#FFC20E"/>` + `<g class="adMov" style="--dx:28px">${H.horquilla(30, 182, { carga: H.palletPiezas(103, 168) })}</g>` + camion(206, 182) + W(186, 198, { area: 'taller', vest: true, pose: 'stop', s: .9 })
    + `<circle cx="120" cy="40" r="20" fill="#fff" stroke="#D32F2F" stroke-width="4"/>` + T(120, 44, '5', 16, '#263238') + T(120, 54, 'km/h', 6.5, '#263238') + pl(260, 96, 'Retrocede con señalero', '#1565C0', 9));
  D('senaletica_carga', q => H.fondo.taller() + H.puenteGrua(150, 92, H.eslinga(150, 96, 110, 190, 124) + H.viga(100, 138, 100, 14)) + H.zonaCarga(106, 90) + P(150, 165, { face: 'worried', helmet: true }) + no(q, 150, 40)
    + P(272, 165, { pose: 'walk', flip: true, helmet: true }) + si(q, 300, 40) + pl(70, 130, 'Nunca bajo la carga', '#C62828', 10));

  SI_CONT.temas.push({
    id: 'senaletica', sec: 'todos', emp: ['ali'], title: 'Señalización y tránsito peatonal en el taller', thumb: 'al_senaletica_cruce', mins: 12,
    learn: [
      { s: 'al_senaletica_tipos', t: 'Las señales te hablan con colores y formas', x: 'La señalización de seguridad te avisa en un segundo qué está <b>prohibido</b>, qué es <b>obligatorio</b>, dónde hay un <b>peligro</b>, por dónde <b>salir</b> y dónde hay un <b>equipo contra incendio</b>. Funciona con colores y formas iguales en todas partes, así se entiende aunque no tenga texto. Respetarla y cuidarla es obligación de todos.' },
      { s: 'al_senaletica_proh', t: 'Prohibición: círculo con borde rojo', x: 'Círculo blanco con <b>borde rojo y una barra cruzada</b>: indica algo que <b>no se puede hacer</b>. Ejemplos: prohibido fumar, prohibido el paso a personas no autorizadas, prohibido pasar bajo la carga. Vale para trabajadores, visitas, proveedores y conductores.' },
      { s: 'al_senaletica_obl', t: 'Obligación: círculo azul', x: 'Círculo <b>azul con un dibujo blanco</b>: indica algo que <b>debes usar o hacer</b> desde ese punto, como lentes de seguridad, protector auditivo, careta o guantes. Si la señal pide un EPP, úsalo desde ahí, aunque solo vayas a pasar un minuto.', k: 'Si una señal azul pide un EPP, úsalo desde ese punto, aunque sea por un minuto.' },
      { s: 'al_senaletica_adv', t: 'Advertencia: triángulo amarillo', x: 'Triángulo <b>amarillo con borde y dibujo negros</b>: avisa un <b>peligro</b> cercano, como carga suspendida, riesgo eléctrico, tránsito de grúa horquilla, superficie caliente o piso resbaladizo. Cuando la veas, baja el ritmo, mira y pon atención.' },
      { s: 'al_senaletica_verde', t: 'Verde para salir, rojo para el fuego', x: '<ul><li><b>Verde con dibujo blanco:</b> salidas, vías de evacuación, zona de seguridad, botiquín y lavaojos.</li><li><b>Rojo con dibujo blanco:</b> extintores y otros equipos contra incendio.</li></ul>Nunca tapes una señal ni el equipo que señala. Si una señal está rota, caída o falta, avisa.' },
      { s: 'al_senaletica_vias', t: 'Vías peatonales demarcadas', x: 'Dentro de la maestranza, las <b>vías peatonales están demarcadas</b> con líneas amarillas en el piso. <ul><li>Camina <b>solo por ellas</b> y por los lugares autorizados.</li><li>No salgas de tu área si no es necesario.</li><li>Cruza donde está marcado el paso, mirando a ambos lados.</li><li>No te detengas a conversar donde pasa la grúa horquilla.</li></ul>' },
      { s: 'al_senaletica_cruce', t: 'Cruces con poca visibilidad: detente y mira', x: 'En las esquinas de estanterías, portones y pasillos ciegos no ves lo que viene. Ahí <b>detente y mira</b> antes de cruzar: puede aparecer la grúa horquilla con una carga. Usa los <b>espejos</b> donde los haya, escucha la bocina y la alarma de retroceso y busca el <b>contacto visual con el operador</b>: si él no te ve, no cruces.', k: 'En un cruce con poca visibilidad, detente y mira antes de cruzar.' },
      { s: 'al_senaletica_grua', t: 'Grúa horquilla y camiones en el patio', x: '<ul><li>Dentro de la empresa la velocidad máxima es <b>5 km/h</b>.</li><li>Mantente lejos de la grúa horquilla y de los camiones en maniobra; nunca pases entre un vehículo y un muro.</li><li>Los vehículos <b>retroceden con la indicación de un señalero</b>.</li><li>Nunca subas a las horquillas ni viajes en ellas.</li><li>Solo opera la grúa horquilla quien está capacitado y autorizado.</li></ul>' },
      { s: 'al_senaletica_carga', t: 'Nunca pases bajo una carga suspendida', x: 'Cuando el puente grúa o el tecle mueven una pieza, <b>nadie se pone ni pasa bajo la carga</b>. Una eslinga se puede cortar o la pieza resbalar, y el casco no resiste una pieza de acero. Rodea la zona y espera a que la carga esté en el piso. Si guías la carga, hazlo desde el costado, con cuerda o vientos.' }
    ],
    quiz: [
      { s: 'al_senaletica_tipos_q', v: [
        { q: 'Una señal circular azul con un dibujo blanco indica:', o: ['Una obligación', 'Una prohibición', 'Un peligro', 'Una salida'], w: 'El círculo azul indica algo que debes usar o hacer.' },
        { q: '¿Qué indica un triángulo amarillo con borde negro?', o: ['Una advertencia de peligro', 'Un EPP obligatorio', 'Una salida de emergencia', 'Un extintor'], w: 'El triángulo amarillo avisa un peligro cercano.' },
        { q: 'Una señal roja con un dibujo blanco muestra dónde hay un equipo contra incendio.', vf: true, w: 'Verdadero. Rojo con dibujo blanco: extintores y equipos contra incendio.' } ] },
      { s: 'al_senaletica_proh_q', v: [
        { q: 'Un círculo con borde rojo y barra cruzada indica:', o: ['Algo que no se puede hacer', 'Algo que debes usar', 'Un peligro cercano', 'El camino hacia la salida más cercana'], w: 'Es una señal de prohibición.' },
        { q: 'Ves la señal de prohibido fumar junto a la bodega de pinturas. ¿Qué haces?', o: ['Fumo solo en el lugar habilitado', 'Fumo si nadie me ve', 'Fumo con la puerta cerrada', 'Fumo rápido y apago bien la colilla'], w: 'Las prohibiciones se cumplen siempre; se fuma solo en el lugar habilitado.' },
        { q: 'Una puerta dice “Prohibido el paso a personas no autorizadas”. No estás autorizado. ¿Qué haces?', o: ['No entro y pregunto a mi jefatura', 'Entro rápido y salgo', 'Entro si está abierta', 'Entro acompañado de un compañero antiguo'], w: 'Si no estás autorizado, no entras.' } ] },
      { s: 'al_senaletica_obl_q', v: [
        { q: 'La señal azul de la entrada del taller pide protector auditivo. Vas a pasar un minuto. ¿Qué haces?', o: ['Me lo pongo desde ese punto', 'Paso rápido sin ponérmelo', 'Me tapo un oído con la mano', 'Me lo pongo solo si hay ruido'], w: 'Si una señal azul pide un EPP, se usa desde ese punto, aunque sea por un minuto.' },
        { q: '¿Qué significa un círculo azul con unos lentes blancos?', o: ['Uso obligatorio de lentes', 'Prohibido usar lentes', 'Peligro de radiación para la vista', 'Venta de lentes'], w: 'Es una señal de obligación: lentes de seguridad.' },
        { q: 'Las señales de obligación solo valen para quienes trabajan en esa máquina.', vf: false, w: 'Falso. Valen para todos los que pasan desde ese punto.' } ] },
      { s: 'al_senaletica_adv_q', v: [
        { q: 'Ves un triángulo amarillo de carga suspendida. ¿Qué haces?', o: ['Bajo el ritmo, miro y no paso bajo la carga', 'Paso corriendo por debajo para no demorar más', 'Lo ignoro, no es mi área', 'Me quedo debajo para ver'], w: 'La advertencia avisa un peligro: se pone atención y se evita la zona.' },
        { q: '¿Qué indica un triángulo amarillo con un rayo?', o: ['Riesgo eléctrico', 'Uso obligatorio de guantes', 'Salida de emergencia', 'Prohibido fumar'], w: 'Advierte riesgo eléctrico, por ejemplo en un tablero.' },
        { q: 'Las señales de advertencia avisan un peligro cercano.', vf: true, w: 'Verdadero. Cuando la veas, baja el ritmo y pon atención.' } ] },
      { s: 'al_senaletica_cruce_q', v: [
        { q: 'Llegas a una esquina de estanterías donde no ves lo que viene. ¿Qué haces?', o: ['Me detengo y miro antes de cruzar', 'Cruzo rápido, pegado a la estantería', 'Cruzo mirando el celular', 'Grito y cruzo sin mirar'], w: 'En un cruce con poca visibilidad, te detienes y miras si vienen equipos móviles.' },
        { q: 'La grúa horquilla se acerca a un cruce. ¿Cuándo cruzas?', o: ['Cuando el operador me ve y me da el paso', 'Antes que llegue, corriendo', 'Por detrás de la grúa, mientras va retrocediendo', 'Cuando quiera, el peatón manda'], w: 'Busca el contacto visual con el operador: si no te ve, no cruces.' },
        { q: '¿Para qué sirve el espejo en la esquina de un pasillo?', o: ['Para ver lo que viene por el otro lado', 'Para revisar el EPP', 'Para reflejar la luz e iluminar el pasillo', 'Para decorar la bodega'], w: 'El espejo convexo permite ver vehículos o personas que vienen por el pasillo ciego.' } ] },
      { s: 'al_senaletica_grua_q', v: [
        { q: '¿Cuál es la velocidad máxima dentro de la empresa?', o: ['5 km/h', '20 km/h', '40 km/h', '60 km/h'], w: 'Dentro de Maestranza ALI la velocidad máxima es 5 km/h.' },
        { q: 'Un camión va a retroceder en el patio. ¿Cómo debe hacerlo?', o: ['Con la indicación de un señalero', 'Solo tocando la bocina', 'Rápido, para no estorbar', 'Mirando solo los espejos del camión'], w: 'Al retroceder siempre se hace con la indicación de un señalero.' },
        { q: 'Se puede viajar sobre las horquillas de la grúa si es un trayecto corto.', vf: false, w: 'Falso. Nunca se sube ni se viaja en las horquillas.' } ] },
      { s: 'al_senaletica_carga_q', v: [
        { q: 'El puente grúa traslada una viga por donde vas caminando. ¿Qué haces?', o: ['Rodeo la zona y espero', 'Paso debajo, con casco', 'Paso rápido por debajo', 'Me quedo debajo a mirar'], w: 'Nadie se pone ni pasa bajo una carga suspendida: se rodea la zona.' },
        { q: '¿Por qué no se pasa bajo una carga suspendida aunque uses casco?', o: ['El casco no resiste una pieza de acero', 'Porque el casco se ensucia', 'Porque se ve feo', 'Porque el operador se distrae si lo miran'], w: 'Una eslinga se puede cortar o la pieza resbalar; el casco no protege de eso.' },
        { q: 'Para guiar una carga del puente grúa, ¿dónde te ubicas?', o: ['Al costado, con cuerda o vientos', 'Justo debajo de la carga', 'Encima de la carga', 'Delante, empujándola con el cuerpo'], w: 'Se guía desde el costado, con cuerda o vientos, nunca bajo la carga.' } ] }
    ]
  });
})();

/* ---- 30_todos2.js ---- */
// ===== Maestranza ALI · charlas "Para todos" (parte 2) =====
// Sustancias químicas, riesgo eléctrico, ruido (PREXOR), radiación UV, calor, TMERT, psicosociales, Ley Karin, tránsito y celular.
// Dibujos con prefijo al_<idcharla>_. Clases CSS propias con prefijo at2_. Lienzo 320 x 200, piso y = 165 (1 m ≈ 50).
(function () {
  const H = window.HD, T = H.T, pl = H.pill;
  // ---------------- animaciones propias ----------------
  const ST = '<style>'
    + '.at2_p{animation:at2_p 1.5s ease-in-out infinite;transform-box:fill-box;transform-origin:center}@keyframes at2_p{50%{transform:scale(1.12)}}'
    + '.at2_bl{animation:at2_bl 1.1s steps(2) infinite}@keyframes at2_bl{50%{opacity:.2}}'
    + '.at2_sh{animation:at2_sh .4s ease-in-out infinite}@keyframes at2_sh{50%{transform:translateX(2px)}}'
    + '.at2_up{animation:at2_up 2.6s ease-out infinite}@keyframes at2_up{0%{transform:translateY(4px);opacity:0}25%{opacity:.9}100%{transform:translateY(-26px);opacity:0}}'
    + '.at2_dr{animation:at2_dr 1.3s ease-in infinite}@keyframes at2_dr{0%{transform:translateY(-6px);opacity:0}20%{opacity:1}100%{transform:translateY(16px);opacity:0}}'
    + '.at2_mv{animation:at2_mv 2.6s ease-in-out infinite alternate}@keyframes at2_mv{to{transform:translateX(var(--dx,20px))}}'
    + '.at2_sp{animation:at2_sp 12s linear infinite;transform-box:fill-box;transform-origin:center}@keyframes at2_sp{to{transform:rotate(360deg)}}'
    + '.at2_fl{animation:at2_fl .5s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:bottom}@keyframes at2_fl{to{transform:scaleY(1.18) skewX(3deg)}}'
    + '.at2_wv{animation:at2_wv 1s ease-out infinite;transform-box:fill-box;transform-origin:left center}@keyframes at2_wv{0%{opacity:0;transform:scale(.7)}40%{opacity:1}100%{opacity:0;transform:scale(1.15)}}'
    + '</style>';
  const svg = inner => sv(H.CSS + ST + inner);
  const G = (c, s, st) => `<g class="${c}"${st ? ` style="${st}"` : ''}>${s}</g>`;
  const OL = '#22303A';
  const div = () => `<line x1="160" y1="8" x2="160" y2="192" stroke="#fff" stroke-width="4"/>`;
  const si = (x, y, r = 13) => H.si(x, y, r), no = (x, y, r = 13) => H.no(x, y, r);
  const TA = o => Object.assign({ area: 'taller' }, o || {});
  // posición de una parte del cuerpo (head, hR, hL...) de W(x, y, o)
  const pP = (x, y, o, p) => { const P = POSES[o.pose || 'stand'] || POSES.stand, s = o.s || 1, f = o.flip ? -1 : 1; return [x + P[p][0] * s * f, y + P[p][1] * s]; };
  // globo de diálogo
  const glob = (x, y, s, w = 90, c = OL) => { w = Math.max(w, Math.round(s.length * 6.4 + 18)); x = Math.max(4, Math.min(x, 316 - w)); return `<rect x="${x}" y="${y}" width="${w}" height="24" rx="11" fill="#fff" stroke="${c}" stroke-width="1.5"/><path d="M${x + 14},${y + 24} l-4,9 l12,-9" fill="#fff" stroke="${c}" stroke-width="1.5"/><rect x="${x + 11}" y="${y + 22}" width="12" height="3" fill="#fff"/>` + T(x + w / 2, y + 16, s, 11, c); };
  const linea = (x1, y1, x2, y2, c) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="1.5" stroke-dasharray="3 3"/>`;
  const preg = (x, y, c = '#F9A825') => G('at2_p', T(x, y, '?', 30, c));
  // ---------------- objetos ----------------
  // tarro de pintura (galón, ~20 cm): x izquierda, y base
  const tarro = (x, y, c = '#1565C0', s = 1, abierto = false) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="0" y="-20" width="18" height="20" rx="1.5" fill="#B0BEC5" stroke="${OL}" stroke-width="1"/><rect x="0" y="-15" width="18" height="10" fill="${c}"/>`
    + (abierto ? `<ellipse cx="9" cy="-20" rx="9" ry="2.4" fill="#37474F" stroke="${OL}" stroke-width=".8"/>` : `<ellipse cx="9" cy="-20" rx="9" ry="2.2" fill="#90A4AE" stroke="${OL}" stroke-width=".8"/><path d="M1,-19 q8,-12 16,0" stroke="${OL}" stroke-width="1" fill="none"/>`) + `</g>`;
  // lata de aerosol
  const aerosol = (x, y, c = '#E8423A', s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="0" y="-22" width="8" height="22" rx="2" fill="${c}" stroke="${OL}" stroke-width=".8"/><rect x="1.5" y="-26" width="5" height="4" fill="#ECEFF1" stroke="${OL}" stroke-width=".6"/><rect x="1" y="-15" width="6" height="6" fill="#fff"/></g>`;
  // botella de bebida (plástico, ~30 cm)
  const bebida = (x, y, liq = '#F9A825', s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-5,0 v-20 q0,-5 3,-7 v-4 h4 v4 q3,2 3,7 v20 z" fill="#E3F2FD" fill-opacity=".7" stroke="${OL}" stroke-width=".9"/><path d="M-4.4,-0.5 v-14 h8.8 v14 z" fill="${liq}" opacity=".9"/><rect x="-5" y="-19" width="10" height="5" fill="#E53935"/><rect x="-2.2" y="-34" width="4.4" height="3" fill="#1565C0"/></g>`;
  // etiqueta SGA con pictogramas (rombos)
  const etiqueta = (x, y, t = 'DILUYENTE') => `<rect x="${x}" y="${y}" width="104" height="70" rx="4" fill="#fff" stroke="#90A4AE" stroke-width="1.5"/>` + T(x + 52, y + 14, t, 10, OL)
    + diamond(x + 22, y + 36, 12, 'flame') + diamond(x + 52, y + 36, 12, 'health') + diamond(x + 82, y + 36, 12, '!') + [0, 1].map(i => `<rect x="${x + 10}" y="${y + 54 + i * 7}" width="${84 - i * 20}" height="3" fill="#B0BEC5"/>`).join('');
  // nube de gas o vapor
  const gas = (x, y, c = '#C6D33A', s = 1) => G('at2_up', [[0, 0, 14], [-12, -6, 10], [12, -8, 11], [2, -16, 10], [-6, -26, 8], [8, -30, 7]].map(([a, b, r]) => `<circle cx="${x + a * s}" cy="${y + b * s}" r="${r * s}" fill="${c}" opacity=".55"/>`).join(''));
  // llama
  const llama = (x, y, s = 1) => G('at2_fl', `<path d="M${x - 9 * s},${y} q${-2 * s},${-14 * s} ${6 * s},${-24 * s} q${0},${10 * s} ${5 * s},${8 * s} q${2 * s},${-8 * s} ${6 * s},${-12 * s} q${6 * s},${14 * s} ${1 * s},${28 * s} z" fill="#FF7043"/><path d="M${x - 4 * s},${y} q${0},${-8 * s} ${4 * s},${-12 * s} q${4 * s},${6 * s} ${3 * s},${12 * s} z" fill="#FFCA28"/>`);
  // chispa eléctrica (rayo)
  const chispa = (x, y, s = 1) => G('at2_bl', `<path d="M${x},${y - 10 * s} l${4 * s},${7 * s} l${-2 * s},${1 * s} l${5 * s},${8 * s} l${-9 * s},${-7 * s} l${2.5 * s},${-1 * s} z" fill="#FFEB3B" stroke="#F57F17" stroke-width="1"/>` + [0, 1, 2, 3].map(i => { const a = i * 1.57 + .4; return `<line x1="${(x + 7 * s * Math.cos(a)).toFixed(1)}" y1="${(y + 7 * s * Math.sin(a)).toFixed(1)}" x2="${(x + 12 * s * Math.cos(a)).toFixed(1)}" y2="${(y + 12 * s * Math.sin(a)).toFixed(1)}" stroke="#FFA000" stroke-width="1.6"/>`; }).join(''));
  const rayoIcono = (x, y, s = 1) => `<path d="M${x + 4 * s},${y - 18 * s} l${-10 * s},${18 * s} h${8 * s} l${-5 * s},${16 * s} l${14 * s},${-21 * s} h${-8 * s} l${6 * s},${-13 * s} z" fill="#FFC20E" stroke="#111" stroke-width="1.4"/>`;
  // respirador de medio rostro con filtros (sobre la cara de W)
  const resp = (x, y, o) => { const [X, Y] = pP(x, y, o, 'head'), s = o.s || 1, f = o.flip ? -1 : 1;
    return `<path d="M${X - 9 * s * f},${Y - 1 * s} L${X - 1 * s * f},${Y + 3 * s}" stroke="#455A64" stroke-width="${1.4 * s}"/><path d="M${X - 1 * s * f},${Y + 1 * s} q${7 * s * f},${-3 * s} ${11 * s * f},${2 * s} l${-1 * s * f},${7 * s} q${-6 * s * f},${4 * s} ${-10 * s * f},${0} z" fill="#ECEFF1" stroke="${OL}" stroke-width="${.9 * s}"/>`
      + `<circle cx="${X + 8 * s * f}" cy="${Y + 8 * s}" r="${3.6 * s}" fill="#E91E63" stroke="${OL}" stroke-width="${.8 * s}"/><circle cx="${X + 2 * s * f}" cy="${Y + 9 * s}" r="${3 * s}" fill="#C2185B" stroke="${OL}" stroke-width="${.8 * s}"/>`; };
  // cubrenuca de legionario bajo el casco
  const cubrenuca = (x, y, o, c = '#F5F5F5') => { const [X, Y] = pP(x, y, o, 'head'), s = o.s || 1, f = o.flip ? -1 : 1;
    return `<path d="M${X - 2 * s * f},${Y - 4 * s} h${-10 * s * f} v${17 * s} q${6 * s * f},${2 * s} ${10 * s * f},${-1 * s} z" fill="${c}" stroke="${OL}" stroke-width="${.9 * s}"/>`; };
  // sol animado
  const sol = (x, y, r = 18) => G('at2_sp', Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<line x1="${(x + (r + 4) * Math.cos(a)).toFixed(1)}" y1="${(y + (r + 4) * Math.sin(a)).toFixed(1)}" x2="${(x + (r + 12) * Math.cos(a)).toFixed(1)}" y2="${(y + (r + 12) * Math.sin(a)).toFixed(1)}" stroke="#FFB300" stroke-width="3" stroke-linecap="round"/>`; }).join('') + `<circle cx="${x}" cy="${y}" r="${r + 12}" fill="none"/>`) + `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFD54F" stroke="#FFA000" stroke-width="2"/>`;
  const rayoUV = (x1, y1, x2, y2, c = '#8E24AA') => G('at2_bl', `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="2.5" stroke-dasharray="5 4"/>`);
  // termómetro
  const termo = (x, y, h = 90, nivel = .85) => `<rect x="${x - 8}" y="${y - h}" width="16" height="${h}" rx="8" fill="#fff" stroke="#455A64" stroke-width="2.5"/><circle cx="${x}" cy="${y + 6}" r="13" fill="#E53935" stroke="#455A64" stroke-width="2.5"/>`
    + G('at2_p', `<rect x="${x - 3.5}" y="${y - h * nivel}" width="7" height="${h * nivel + 6}" rx="3.5" fill="#E53935"/>`) + [0.2, 0.4, 0.6, 0.8].map(k => `<line x1="${x + 8}" y1="${y - h * k}" x2="${x + 15}" y2="${y - h * k}" stroke="#455A64" stroke-width="2"/>`).join('');
  const sudor = (x, y) => G('at2_dr', drop(x, y, .45, '#4FC3F7') + drop(x + 8, y + 6, .35, '#4FC3F7'));
  const calorW = (x, y, n = 3, c = '#FF7043') => G('at2_up', Array.from({ length: n }, (_, i) => `<path d="M${x + i * 12},${y} q-5,-7 0,-14 q5,-7 0,-14" stroke="${c}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`).join(''));
  // botella de agua (~25 cm) y vaso
  const botella = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-4" y="-22" width="8" height="22" rx="2.5" fill="#4FC3F7" fill-opacity=".85" stroke="#0277BD" stroke-width=".8"/><rect x="-2.5" y="-25" width="5" height="3.5" fill="#0277BD"/><rect x="-4" y="-14" width="8" height="5" fill="#fff" opacity=".7"/></g>`;
  // celular en la mano
  const celu = (x, y, s = 1) => `<rect x="${x - 3 * s}" y="${y - 5 * s}" width="${6 * s}" height="${10 * s}" rx="1" fill="#263238"/><rect x="${x - 2 * s}" y="${y - 4 * s}" width="${4 * s}" height="${7 * s}" fill="#81D4FA"/>`;
  // ondas de ruido animadas (hacia la derecha si dir = 1)
  const ruidoW = (x, y, n = 3, c = '#E53935', dir = 1) => G('at2_wv', Array.from({ length: n }, (_, i) => `<path d="M${x + dir * (i + 1) * 7},${y - (i + 1) * 7} a${(i + 1) * 9},${(i + 1) * 9} 0 0 ${dir > 0 ? 1 : 0} 0,${(i + 1) * 14}" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`).join(''));
  // enchufe en un muro o columna
  const enchufe = (x, y, s = 1) => `<rect x="${x - 5 * s}" y="${y - 7 * s}" width="${10 * s}" height="${14 * s}" rx="2" fill="#FAFAFA" stroke="#90A4AE" stroke-width="1"/><circle cx="${x - 1.8 * s}" cy="${y}" r="${1 * s}" fill="#455A64"/><circle cx="${x + 1.8 * s}" cy="${y}" r="${1 * s}" fill="#455A64"/>`;
  // tablero abierto (para mostrar lo mal hecho)
  const tableroAbierto = (x, y) => `<rect x="${x}" y="${y}" width="44" height="58" rx="2" fill="#B0BEC5" stroke="${OL}" stroke-width="1.2"/><rect x="${x + 4}" y="${y + 4}" width="36" height="50" fill="#37474F"/>`
    + [0, 1, 2].map(r => [0, 1, 2, 3].map(c => `<rect x="${x + 7 + c * 8.5}" y="${y + 8 + r * 15}" width="5" height="11" rx="1" fill="#ECEFF1"/>`).join('')).join('') + `<path d="M${x},${y} l-16,6 v52 l16,-4" fill="#CFD8DC" stroke="${OL}" stroke-width="1.2"/>`;
  // caja / bulto de cartón
  const caja = (x, y, w = 30, h = 24) => `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" rx="2" fill="#C89B5E" stroke="#8D6E3F" stroke-width="1.5"/><rect x="${x + w / 2 - 3}" y="${y - h}" width="6" height="${h}" fill="#B07F45" opacity=".5"/>`;
  // cable en el piso (polilínea) con tramo dañado opcional
  const cable = (pts, dan) => `<polyline points="${pts}" fill="none" stroke="#263238" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` + (dan ? `<path d="M${dan[0] - 7},${dan[1]} h14" stroke="#FF8F00" stroke-width="3.4"/><path d="M${dan[0] - 7},${dan[1] - 1.6} h14 M${dan[0] - 7},${dan[1] + 1.6} h14" stroke="#FFD180" stroke-width="1"/>` + chispa(dan[0], dan[1] - 9, .8) : '');
  // ventilador / extractor de pared
  const extractorPared = (x, y, r = 16) => `<circle cx="${x}" cy="${y}" r="${r + 3}" fill="#90A4AE" stroke="${OL}" stroke-width="1.2"/><circle cx="${x}" cy="${y}" r="${r}" fill="#455A64"/>`
    + `<g class="adGira" style="transform-origin:${x}px ${y}px">${[0, 1, 2].map(i => `<ellipse cx="${x}" cy="${y - r * .5}" rx="${r * .22}" ry="${r * .5}" fill="#CFD8DC" transform="rotate(${i * 120} ${x} ${y})"/>`).join('')}</g><circle cx="${x}" cy="${y}" r="3" fill="#263238"/>`;
  // flechas de aire
  // esmeril angular en uso sobre una mesa (mango en hx, hy) con chispas
  const esmerila = (hx, hy) => H.esmerilMano(hx, hy, -20, false) + H.chispas(hx + 34, hy + 2, 9, 1);
  // lavaojos de emergencia (taza a ~1 m de altura) con letrero en el muro
  const lavaojos = (x, y) => `<rect x="${x + 8}" y="${y - 50}" width="6" height="50" fill="#2E7D32"/><rect x="${x}" y="${y - 3}" width="22" height="3" fill="#2E7D32"/><path d="M${x - 2},${y - 54} h26 l-4,8 h-18z" fill="#43A047" stroke="${OL}"/>`
    + `<rect x="${x - 4}" y="${y - 110}" width="30" height="20" rx="2" fill="#2E7D32"/>` + T(x + 11, y - 96, '👁', 10, '#fff');
  // candado (reserva, confidencialidad)
  const candado = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-14,-30 v-12 a14,14 0 0 1 28,0 v12" stroke="#455A64" stroke-width="6" fill="none"/><rect x="-22" y="-32" width="44" height="34" rx="5" fill="#E8423A" stroke="${OL}" stroke-width="1.5"/><circle cx="0" cy="-18" r="4.5" fill="#263238"/><rect x="-1.8" y="-16" width="3.6" height="9" fill="#263238"/></g>`;
  // silla simple; x = centro del asiento, y = piso
  const silla = (x, y = 165) => `<rect x="${x - 14}" y="${y - 27}" width="28" height="5" rx="2" fill="#455A64"/><rect x="${x - 12}" y="${y - 22}" width="3" height="22" fill="#455A64"/><rect x="${x + 9}" y="${y - 22}" width="3" height="22" fill="#455A64"/><rect x="${x - 16}" y="${y - 58}" width="4" height="36" rx="2" fill="#455A64"/>`;
  const aire = (x, y, c = '#4FC3F7', dx = 26) => G('at2_mv', `<path d="M${x},${y} h22 m-6,-6 l6,6 l-6,6 M${x - 8},${y + 16} h22 m-6,-6 l6,6 l-6,6" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"/>`, `--dx:${dx}px`);

  // =====================================================================
  // 1) SUSTANCIAS QUÍMICAS EN EL TALLER
  // =====================================================================
  const prodMesa = () => H.mesaSoldar(110, 165, 150) + tarro(118, 115, '#1565C0', 1.1) + tarro(140, 115, '#E8423A', 1.1) + H.bidon(166, 115, '#F9A825', 'DILUY.', .6)
    + H.bidon(194, 115, '#43A047', 'DESENG.', .6) + H.bidon(222, 115, '#6D4C41', 'ACEITE', .6) + aerosol(248, 115, '#1E88E5', 1.1);
  S.al_quimicos_intro = () => svg(H.fondo.taller() + prodMesa() + H.cilindro(276, 165, 'argon', { h: 80 }) + H.cilindro(290, 165, 'co2', { h: 80 }) + H.cadena(272, 118, 310)
    + W(66, 165, TA({ pose: 'point' }))
    + pl(60, 14, 'Pinturas', '#1565C0', 10) + pl(150, 14, 'Diluyentes', '#F57F17', 10) + pl(246, 14, 'Desengrasantes', '#2E7D32', 10)
    + pl(150, 40, 'Aceites de corte', '#6D4C41', 10) + pl(282, 40, 'Gases', '#455A64', 10)
    + linea(60, 34, 128, 92, '#1565C0') + linea(150, 34, 176, 64, '#F57F17') + linea(246, 34, 206, 66, '#2E7D32') + linea(170, 60, 232, 66, '#6D4C41') + linea(286, 60, 288, 72, '#455A64'));
  S.al_quimicos_hds = () => svg(H.fondo.bodega() + etiqueta(10, 22) + H.bidon(40, 165, '#F9A825', 'DILUYENTE', 1.1)
    + G('at2_p', `<g transform="translate(130,40) scale(1.4)">${doc(0, 62, 'HDS')}</g>`) + W(262, 165, TA({ pose: 'point', flip: true })));
  S.al_quimicos_envase = () => svg(H.fondo.bodega() + div()
    + bebida(62, 160, '#FFE082', 2.4) + bebida(104, 160, '#B0BEC5', 2.4) + preg(84, 58, '#C62828') + pl(80, 170, 'Botella de bebida', '#C62828', 10) + no(140, 22)
    + H.bidon(186, 160, '#F9A825', 'DILUYENTE', 1.4) + tarro(246, 160, '#1565C0', 2.2) + pl(240, 170, 'Envase original rotulado', '#2E7D32', 10) + si(300, 22));
  const mezclaBase = ok => H.fondo.taller() + H.mesaSoldar(150, 165, 120) + tarro(196, 115, '#78909C', 1.3, true) + H.bidon(236, 115, '#43A047', 'DESENG.', .6)
    + W(130, 165, TA({ pose: 'carry', face: ok ? 'ok' : 'pain', gloves: '#1E88E5' })) + `<g transform="translate(150,100) rotate(${ok ? 20 : 70})">${tarro(0, 0, '#E8423A', 1.1)}</g>`;
  S.al_quimicos_mezcla = () => svg(mezclaBase(false) + G('at2_dr', `<rect x="196" y="96" width="3" height="14" rx="1.5" fill="#B0BEC5"/>`) + gas(206, 96, '#C6D33A', 1.1) + G('at2_sh', T(84, 70, '¡cof, cof!', 12, '#C62828'))
    + pl(160, 14, 'Restos de productos distintos', '#C62828', 10) + no(296, 60));
  S.al_quimicos_mezcla_q = () => svg(mezclaBase(true) + preg(214, 80));
  S.al_quimicos_ventila = () => svg(H.fondo.cabina('pintura') + extractorPared(270, 50, 18) + aire(214, 44, '#90A4AE', 18)
    + H.viga(170, 130, 70, 16, '#90A4AE') + `<rect x="200" y="130" width="6" height="35" fill="#607D8B"/>`
    + W(110, 165, { area: 'pintura', pose: 'point' }) + resp(110, 165, { pose: 'point' })
    + `<path d="M136,104 h10 l2,-4 h4 v8 h-4 l-2,-2 h-6z" fill="#455A64" stroke="${OL}"/>` + G('at2_mv', `<path d="M152,104 l14,-6 v14z" fill="#B0BEC5" opacity=".6"/>`, '--dx:6px')
    + pl(270, 82, 'Extracción funcionando', '#2E7D32', 10) + pl(96, 14, 'Respirador con filtros', '#1565C0', 10));
  const inflaBase = (fuego) => H.fondo.taller() + div() + H.mesaSoldar(40, 165, 70) + H.plancha(44, 115, 62, 5)
    + W(26, 165, TA({ pose: 'carry', gloves: '#C8A27A' })) + esmerila(36, 110)
    + tarro(116, 165, '#F9A825', 1.3, true) + (fuego ? llama(128, 139, 1) : '')
    + H.cilindro(196, 165, 'oxigeno', { h: 82 }) + H.cilindro(222, 165, 'acetileno', { h: 78 }) + `<rect x="190" y="70" width="62" height="6" fill="#455A64"/><rect x="250" y="70" width="5" height="95" fill="#455A64"/>` + H.cadena(192, 110, 252);
  S.al_quimicos_inflama = () => svg(inflaBase(true) + no(140, 22) + pl(74, 186, 'Diluyente cerca de chispas', '#C62828', 9)
    + si(300, 22) + pl(226, 40, 'Amarrados y con capuchón', '#2E7D32', 10));
  S.al_quimicos_inflama_q = () => svg(inflaBase(false) + preg(130, 120));
  S.al_quimicos_epp = () => svg(H.fondo.taller() + H.mesaSoldar(184, 165, 120) + H.viga(190, 115, 80, 14) + H.bidon(278, 115, '#43A047', 'DESENG.', .5)
    + W(170, 165, TA({ pose: 'carry', gloves: '#1E88E5' })) + resp(170, 165, { pose: 'carry' }) + `<rect x="182" y="96" width="12" height="7" rx="2" fill="#FFF59D" stroke="${OL}" stroke-width=".8"/>`
    + pl(70, 40, 'Lentes o antiparras', '#2E7D32', 10) + pl(70, 72, 'Respirador con filtros', '#2E7D32', 10) + pl(70, 116, 'Guantes de nitrilo', '#2E7D32', 10)
    + linea(132, 50, 174, 90, '#2E7D32') + linea(136, 82, 176, 98, '#2E7D32') + linea(132, 126, 182, 116, '#2E7D32'));
  S.al_quimicos_higiene = () => svg(H.fondo.taller() + div()
    + W(70, 165, TA({ pose: 'c4drink', gloves: '#37474F' })) + `<path d="M74,98 h12 v6 h-12z" fill="#D7A86E" stroke="${OL}" stroke-width=".8"/>` + tarro(104, 165, '#1565C0', 1.4, true) + no(140, 22) + pl(80, 180, 'Manos sucias a la boca', '#C62828', 9)
    + `<rect x="216" y="104" width="64" height="12" rx="3" fill="#ECEFF1" stroke="#90A4AE" stroke-width="1.5"/><rect x="244" y="116" width="8" height="49" fill="#B0BEC5"/><path d="M246,104 v-10 h12 v4" stroke="#90A4AE" stroke-width="3" fill="none"/>`
    + G('at2_dr', `<rect x="256" y="100" width="3" height="8" rx="1.5" fill="#4FC3F7"/>`) + W(232, 165, TA({ pose: 'carry' })) + G('at2_up', `<circle cx="248" cy="108" r="3" fill="#fff" stroke="#B3E5FC"/><circle cx="254" cy="104" r="2.4" fill="#fff" stroke="#B3E5FC"/>`)
    + si(300, 22) + pl(236, 180, 'Agua y jabón antes de comer', '#2E7D32', 9));
  S.al_quimicos_auxilios = () => svg(H.fondo.taller() + lavaojos(146, 165) + W(116, 165, TA({ pose: 'bend', glasses: false }))
    + G('at2_up', `<circle cx="152" cy="108" r="2.4" fill="#4FC3F7"/><circle cx="158" cy="106" r="2" fill="#4FC3F7"/><circle cx="164" cy="108" r="2" fill="#4FC3F7"/>`)
    + clock(254, 62, 24) + T(254, 106, '15 minutos', 12, '#0277BD') + T(254, 120, 'con agua limpia', 11, '#0277BD') + H.fono(238, 128, '1404').replace(/height="58"/, 'height="34"').replace(/height="42"/, 'height="22"').replace(/y="(\d+)" font-size="11"/, (m, a) => `y="${+a - 13}" font-size="11"`));
  S.al_quimicos_ojos_q = () => svg(H.fondo.taller() + H.mesaSoldar(170, 165, 110) + H.bidon(200, 115, '#43A047', 'DESENG.', .6) + lavaojos(40, 165)
    + W(150, 165, TA({ pose: 'c4drink', face: 'pain', glasses: false })) + G('at2_bl', [[160, 88], [166, 94], [156, 98]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2.6" fill="#C6E66A"/>`).join('')));

  SI_CONT.temas.push({
    id: 'quimicos', sec: 'todos', emp: ['ali'], title: 'Sustancias químicas en el taller', thumb: 'al_quimicos_mezcla', mins: 15,
    learn: [
      { s: 'al_quimicos_intro', t: 'Los químicos de la maestranza', x: 'En el taller usamos <b>pinturas y anticorrosivos</b>, <b>diluyentes y solventes</b>, <b>desengrasantes</b>, <b>aceites y refrigerantes de corte</b> de los tornos y fresas, aerosoles, y <b>gases</b> en cilindros (oxígeno, acetileno, argón, CO₂). Según el producto, pueden <b>quemar la piel y los ojos</b>, dañar los pulmones al respirar sus vapores, intoxicar, provocar alergias o <b>incendiarse</b> con una chispa.' },
      { s: 'al_quimicos_hds', t: 'La etiqueta y la HDS', x: 'Cada producto trae una <b>etiqueta</b> con los <b>pictogramas del SGA</b> (rombos de borde rojo: inflamable, peligro para la salud, irritante, corrosivo…) y tiene su <b>Hoja de Datos de Seguridad (HDS)</b>, que la empresa debe tener disponible. La HDS dice:<ul><li>Qué peligros tiene y qué EPP usar.</li><li>Cómo usarlo, guardarlo y diluirlo.</li><li>Qué hacer si salpica, se derrama, se inhala o se traga.</li></ul>Si no conoces un producto, <b>no lo uses</b> hasta leer la etiqueta y la HDS o preguntar a tu jefatura.' },
      { s: 'al_quimicos_envase', t: 'Siempre en su envase original', x: 'Mantén cada producto en su <b>envase original</b>, con su etiqueta y bien tapado. <b>Nunca lo pases a una botella de bebida</b>, un tarro sin rótulo o un vaso: un compañero puede confundirlo y tomarlo. Si necesitas traspasar diluyente a un envase más chico, usa uno <b>apto y rotulado</b> con el nombre del producto. Los envases vacíos no se usan para agua ni comida.' },
      { s: 'al_quimicos_mezcla', t: 'No mezcles ni improvises', x: 'No juntes restos de productos distintos en un mismo tarro ni los mezcles "para que rinda": pueden <b>calentarse, reaccionar o liberar gases tóxicos</b>. Las pinturas de dos componentes (pintura y endurecedor o catalizador) se mezclan <b>solo como indica la ficha</b>, en la proporción indicada y en un lugar ventilado. Nunca limpies una pieza con un producto que no corresponde a esa tarea.', k: 'No mezcles productos: solo lo que indica la ficha, en la proporción indicada.' },
      { s: 'al_quimicos_ventila', t: 'Ventilación: los vapores se acumulan', x: 'Los vapores de pinturas, diluyentes y desengrasantes, y los gases de soldadura, se acumulan en lugares cerrados.<ul><li>Pinta en la <b>cabina o zona de pintura</b>, con la extracción funcionando.</li><li>Al soldar, acerca la <b>extracción de humos</b> a la pieza.</li><li>Tapa los envases apenas termines de usarlos.</li><li>El argón y el CO₂ no tienen olor y <b>desplazan el oxígeno</b>: una fuga en un lugar cerrado puede asfixiar.</li></ul>Si sientes mareo, dolor de cabeza, ardor en los ojos o tos, sal al aire libre y avisa.' },
      { s: 'al_quimicos_inflama', t: 'Inflamables lejos de chispas y calor', x: '<ul><li>Diluyentes, pinturas y aerosoles <b>se encienden con una chispa</b>: mantenlos tapados y lejos de soldadura, esmeril, oxicorte y plasma.</li><li>No fumes cerca de ellos; fuma solo en los lugares establecidos.</li><li>Los trapos con solvente van a un <b>tarro metálico con tapa</b>, no a la basura común.</li><li>Los cilindros de gas van <b>de pie, amarrados con cadena</b>, con su capuchón cuando no se usan, y el oxígeno separado del acetileno.</li></ul>' },
      { s: 'al_quimicos_epp', t: 'Tu EPP para los químicos', x: 'Usa el EPP que indica la HDS o tu jefatura para cada tarea:<ul><li><b>Guantes de nitrilo</b> para diluyentes, desengrasantes, aceites y pinturas. Los guantes de cuero o de tela absorben el producto y lo dejan contra tu piel.</li><li><b>Lentes de seguridad</b> siempre, y <b>antiparras</b> si puede salpicar.</li><li><b>Respirador con filtros</b> para vapores al pintar o usar solventes, bien ajustado y con filtros vigentes.</li></ul>Revisa que el EPP no esté roto. Si un guante se rompe, cámbialo de inmediato.' },
      { s: 'al_quimicos_higiene', t: 'Manos limpias antes de comer', x: 'Los restos de pintura, aceite y solvente que quedan en tus manos pasan a la boca si <b>comes, tomas agua o fumas con las manos sucias</b>.<ul><li>Lávate las manos con <b>agua y jabón</b> antes de comer, fumar o ir al baño, y al terminar la jornada.</li><li><b>Nunca te limpies la piel con diluyente</b>: se absorbe y la daña.</li><li>No guardes ni consumas alimentos en el lugar donde se usan químicos.</li></ul>', k: 'Nunca comas, tomes ni fumes con las manos sucias de químicos.' },
      { s: 'al_quimicos_auxilios', t: 'Si salpica o se derrama', x: '<ul><li><b>Ojos:</b> lávalos de inmediato con agua limpia por al menos <b>15 minutos</b>, con los párpados abiertos.</li><li><b>Piel:</b> lava con abundante agua y jabón y sácate la ropa mojada.</li><li><b>Si se respiró:</b> sal al aire libre. <b>Si se tragó:</b> no provoques el vómito.</li></ul>Avisa a tu jefatura y llama a la ACHS (1404), con la etiqueta o la HDS a mano. Si se <b>derrama</b>: aleja a las personas, apaga las fuentes de chispa cercanas, contén con material absorbente y avisa.' }
    ],
    quiz: [
      { s: 'al_quimicos_hds', v: [
        { q: '¿Dónde encuentras qué EPP usar y qué hacer si un producto te salpica?', o: ['En la HDS y en la etiqueta', 'En la factura de compra', 'En el color del envase', 'En la fecha del envase'], w: 'La HDS y la etiqueta indican los peligros, el EPP y los primeros auxilios de cada producto.' },
        { q: 'Te piden usar un desengrasante que nunca has usado. ¿Qué haces antes?', o: ['Leo la etiqueta y la HDS, o pregunto', 'Lo huelo de cerca para saber qué es', 'Lo uso igual que el diluyente de siempre', 'Lo pruebo primero en mis manos'], w: 'Cada producto es distinto: la etiqueta y la HDS te dicen cómo usarlo de forma segura.' },
        { q: 'Un rombo de borde rojo con una llama en la etiqueta indica que el producto es inflamable.', vf: true, w: 'Verdadero. Es un pictograma del SGA: el producto se enciende con facilidad.' }] },
      { s: 'al_quimicos_envase', v: [
        { q: '¿Dónde se guarda el diluyente?', o: ['En su envase original, tapado y rotulado', 'En una botella de bebida limpia y tapada', 'En un tarro sin etiqueta, pero bien cerrado', 'En cualquier envase que tenga buena tapa'], w: 'El envase original con etiqueta evita confusiones e intoxicaciones.' },
        { q: 'Un compañero pasó diluyente a una botella de bebida. ¿Cuál es el peligro?', o: ['Que alguien lo confunda y lo tome', 'Que el diluyente cambie de color', 'Que la botella sea muy pequeña', 'Que el diluyente pierda fuerza'], w: 'Una botella de bebida invita a tomar. Alguien puede intoxicarse gravemente.' },
        { q: 'Necesitas un poco de diluyente en un envase chico. ¿Cuál usas?', o: ['Uno apto y rotulado con el nombre', 'Un vaso desechable del comedor', 'Una botella de jugo con tapa', 'El de otro producto, sin cambiar la etiqueta'], w: 'Todo envase debe decir qué contiene. Una etiqueta equivocada es tan peligrosa como ninguna.' }] },
      { s: 'al_quimicos_mezcla_q', v: [
        { q: 'Te sobraron restos de dos productos distintos. ¿Qué haces?', o: ['No los junto y consulto cómo eliminarlos', 'Los junto en un tarro para ahorrar espacio', 'Los mezclo para usarlos como diluyente', 'Los boto juntos al desagüe'], w: 'Productos distintos pueden reaccionar, calentarse o liberar gases tóxicos.' },
        { q: '¿Cómo se prepara una pintura de dos componentes?', o: ['Como indica la ficha, en su proporción', 'Al ojo, hasta que se vea bien', 'Con más endurecedor para que seque antes', 'Con cualquier diluyente que haya'], w: 'La proporción y el producto correcto los indica la ficha del fabricante.' },
        { q: 'Mezclar productos distintos los hace rendir más y no tiene riesgo.', vf: false, w: 'Falso. Las mezclas pueden reaccionar, calentarse o liberar gases tóxicos.' }] },
      { s: 'al_quimicos_epp', v: [
        { q: '¿Qué guantes corresponden para trabajar con diluyente o desengrasante?', o: ['Guantes de nitrilo', 'Guantes de cuero de soldador', 'Guantes de tela', 'Guantes de lana'], w: 'El nitrilo resiste los solventes. El cuero y la tela absorben el producto y lo dejan contra la piel.' },
        { q: 'Vas a pintar con pistola. ¿Qué usas para protegerte de los vapores?', o: ['Respirador con filtros, bien ajustado', 'Una mascarilla de papel para el polvo', 'Un pañuelo húmedo sobre la nariz', 'Nada, si el portón está abierto'], w: 'Los vapores de pintura y solventes requieren respirador con filtros, además de la extracción.' },
        { q: 'Tu guante de nitrilo se rompió mientras desengrasas una pieza. ¿Qué haces?', o: ['Lo cambio de inmediato por uno nuevo', 'Sigo, el corte es pequeño', 'Le pongo cinta y sigo', 'Me lo saco y sigo a mano descubierta'], w: 'Un guante roto deja pasar el producto a la piel. Se cambia de inmediato.' }] },
      { s: 'al_quimicos_inflama_q', v: [
        { q: 'Vas a esmerilar y a 1 metro hay un tarro de diluyente abierto. ¿Qué haces?', o: ['Lo tapo y lo alejo antes de esmerilar', 'Esmerilo rápido, no pasa nada', 'Lo dejo y esmerilo hacia otro lado', 'Le echo agua al tarro'], w: 'Una chispa basta para encender los vapores del diluyente.' },
        { q: '¿Dónde se botan los trapos con solvente?', o: ['En un tarro metálico con tapa', 'En la basura común', 'En el piso, junto a la máquina', 'En una caja de cartón abierta'], w: 'Los trapos con solvente pueden encenderse: van a un tarro metálico con tapa.' },
        { q: '¿Cómo deben estar los cilindros de gas?', o: ['De pie, amarrados con cadena y con capuchón', 'Acostados en el piso, para que no se caigan', 'Sueltos, apoyados en la pared o una columna', 'Juntos oxígeno y acetileno, sin amarrar'], w: 'Un cilindro que cae puede romper su válvula y salir disparado o liberar el gas.' }] },
      { s: 'al_quimicos_ojos_q', v: [
        { q: 'Te salpica desengrasante en un ojo. ¿Qué haces?', o: ['Lavo con agua limpia 15 minutos y aviso', 'Me froto el ojo con el guante para limpiarlo', 'Me echo gotas para los ojos y sigo', 'Espero un rato a que se pase solo'], w: 'El agua limpia, por al menos 15 minutos y con los párpados abiertos, saca el químico. Después te atiendes en la ACHS.' },
        { q: 'Tienes las manos con pintura y vas a comer. ¿Qué haces?', o: ['Me lavo con agua y jabón antes', 'Me limpio con diluyente', 'Me limpio con un trapo y como', 'Como con la otra mano'], w: 'El diluyente daña la piel y se absorbe. Las manos se lavan con agua y jabón.' },
        { q: 'Limpiarse la pintura de las manos con diluyente es una buena práctica.', vf: false, w: 'Falso. El diluyente se absorbe por la piel y la daña. Se usa agua y jabón.' }] }
    ]
  });

  // =====================================================================
  // 2) RIESGO ELÉCTRICO EN EL TALLER
  // =====================================================================
  S.al_electrico_intro = () => svg(H.fondo.taller() + H.taladro(40, 165) + H.maqSoldar(96, 165) + H.esmerilBanco(180, 165) + H.tablero(250, 70)
    + G('at2_p', rayoIcono(272, 52, 1.1)) + pl(160, 14, 'La electricidad no se ve ni se oye', '#E8423A'));
  const cableBase = () => H.fondo.taller() + enchufe(160, 120) + H.esmerilBanco(60, 165)
    + cable('64,163 100,174 150,176 200,176 230,170 260,174', [196, 176]) + `<path d="M160,127 v40" stroke="#263238" stroke-width="3"/>`
    + `<circle cx="270" cy="168" r="11" fill="${H.ALI1}" stroke="${OL}" stroke-width="1.4"/><circle cx="270" cy="168" r="4" fill="#263238"/>`;
  S.al_electrico_cable = () => svg(cableBase() + `<rect x="226" y="166" width="10" height="7" fill="#9E9E9E" opacity=".9"/>` + W(118, 165, TA({ pose: 'walk', face: 'worried' }))
    + pl(196, 140, 'Cable pelado', '#C62828', 10) + no(296, 24));
  S.al_electrico_cable_q = () => svg(cableBase() + W(118, 165, TA({ pose: 'point' })) + preg(200, 136));
  S.al_electrico_soldadora = () => svg(H.fondo.soldadura() + H.extractor(186, 104, true) + H.mesaSoldar(150, 165, 110) + H.viga(160, 115, 90, 12)
    + H.maqSoldar(40, 165) + `<path d="M74,140 q40,40 90,-28" stroke="#263238" stroke-width="3" fill="none"/><path d="M60,140 q50,30 186,-26" stroke="#263238" stroke-width="3" fill="none"/><rect x="240" y="104" width="12" height="8" fill="#C62828" stroke="${OL}"/>`
    + W(130, 165, { area: 'soldadura', pose: 'carry', careta: true }) + H.arco(170, 104)
    + pl(84, 14, 'Cables sin daños', '#2E7D32', 10) + pl(246, 72, 'Pinza de tierra firme', '#2E7D32', 10));
  S.al_electrico_agua = () => svg(H.fondo.taller() + H.charco(140, 172, 40) + H.esmerilBanco(240, 165) + enchufe(190, 110) + `<path d="M190,117 q10,40 40,46" stroke="#263238" stroke-width="2.6" fill="none"/>`
    + W(140, 165, TA({ pose: 'point', gloves: false })) + G('at2_dr', drop(170, 112, .3) + drop(162, 118, .25)) + chispa(188, 98, .9) + no(296, 24) + pl(120, 14, 'Manos y pies mojados', '#C62828', 10));
  S.al_electrico_tablero = () => svg(H.fondo.taller() + div() + H.tablero(58, 60) + si(140, 22) + pl(80, 180, 'Cerrado y despejado', '#2E7D32', 10)
    + tableroAbierto(232, 60) + caja(206, 165, 40, 34) + caja(212, 131, 30, 22) + H.viga(240, 165, 70, 14) + H.viga(244, 151, 60, 12) + no(300, 22) + pl(240, 180, 'Abierto y tapado', '#C62828', 10));
  S.al_electrico_autorizado = () => svg(H.fondo.taller() + H.tablero(170, 56, true) + W(250, 165, { area: 'mantencion', pose: 'point', flip: true, gloves: '#37474F' })
    + W(70, 165, TA({ pose: 'stop' })) + pl(160, 14, 'Solo eléctrico autorizado', '#E8423A') + pl(192, 138, 'Bloqueo y tarjeta', '#263238', 9));
  S.al_electrico_falla = () => svg(H.fondo.taller() + H.esmerilBanco(110, 165) + H.humo(104, 98) + chispa(124, 104, .9) + W(220, 165, TA({ pose: 'stop', flip: true, face: 'worried' }))
    + pl(160, 14, 'Olor a quemado o golpe de corriente: no la uses', '#C62828', 9));
  const descBase = () => H.fondo.taller() + H.charco(120, 176, 34) + H.maqSoldar(150, 165) + cable('150,160 130,172 96,176', [118, 175])
    + `<g transform="rotate(-90 92 176)">${W(92, 176, TA({ face: 'pain' }))}</g>`;
  S.al_electrico_descarga = () => svg(descBase() + H.tablero(210, 66) + W(282, 165, TA({ pose: 'point', flip: true }))
    + G('at2_p', `<circle cx="244" cy="108" r="11" fill="none" stroke="#2E7D32" stroke-width="3"/>`) + pl(80, 14, '1. Corta la energía', '#2E7D32') + pl(236, 14, '2. No lo toques', '#C62828'));
  S.al_electrico_descarga_q = () => svg(descBase() + H.tablero(210, 66) + W(290, 165, TA({ face: 'worried', flip: true })) + preg(230, 52));

  SI_CONT.temas.push({
    id: 'electrico', sec: 'todos', emp: ['ali'], title: 'Riesgo eléctrico en el taller', thumb: 'al_electrico_cable', mins: 12,
    learn: [
      { s: 'al_electrico_intro', t: 'La electricidad está en todo el taller', x: 'Tornos, fresas, taladros, sierras, esmeriles, máquinas de soldar, el puente grúa y los tecles eléctricos funcionan con electricidad, muchos a <b>380 volts</b>. Una descarga puede causar <b>quemaduras, caídas o un paro cardíaco</b>, y una falla puede iniciar un <b>incendio</b>. La electricidad no se ve, no se oye ni se huele: por eso las reglas se cumplen siempre.' },
      { s: 'al_electrico_cable', t: 'Cables y extensiones dañadas', x: 'Un cable <b>pelado, cortado, aplastado o parchado con cinta</b>, o un enchufe quebrado, puede dar una descarga.<ul><li>Revisa el cable y el enchufe <b>antes de usar</b> una herramienta o una extensión.</li><li>Si está dañado, <b>no lo uses</b>: sácalo de servicio y avisa.</li><li>No dejes cables cruzando pasillos ni donde pase la grúa horquilla, ni sobre cantos vivos o escoria caliente.</li><li>Desenchufa tomando el enchufe, nunca tirando del cable.</li></ul>' },
      { s: 'al_electrico_soldadora', t: 'Máquinas de soldar', x: '<ul><li>Revisa que los <b>cables de soldadura y la pinza porta electrodo</b> no tengan cortes ni partes peladas.</li><li>La <b>pinza de tierra</b> va firme sobre la pieza o la mesa, cerca de donde sueldas.</li><li>Suelda con <b>guantes secos</b> y nunca parado sobre agua o piso mojado.</li><li>No cambies el electrodo con las manos desnudas ni dejes la pinza energizada sobre la mesa.</li><li>Al terminar, apaga la máquina.</li></ul>' },
      { s: 'al_electrico_agua', t: 'Manos húmedas, nunca', x: 'El agua conduce la electricidad.<ul><li><b>No uses equipos eléctricos con las manos húmedas</b> ni parado en un charco.</li><li>No laves con manguera cerca de tableros, motores ni enchufes.</li><li>Si una máquina o una extensión se mojó, no la uses: avisa.</li><li>En faenas de clientes, cuida los cables de la lluvia y del barro.</li></ul>', k: 'Manos secas y pies secos antes de tocar un enchufe o una máquina.' },
      { s: 'al_electrico_tablero', t: 'Tableros cerrados y despejados', x: 'Los tableros eléctricos deben estar <b>cerrados</b>, con su tapa y su señal de riesgo eléctrico. No los abras ni metas objetos. Delante de un tablero <b>no se dejan piezas, cajas ni materiales</b>: en una emergencia hay que llegar a él de inmediato para cortar la energía. Si ves un tablero abierto, quemado o con agua cerca, aléjate y avisa.' },
      { s: 'al_electrico_autorizado', t: 'Solo el eléctrico autorizado repara', x: 'Las instalaciones y las máquinas las revisa y repara solo el <b>eléctrico autorizado</b> por la empresa. Tú no abres tableros, no cambias enchufes ni reparas extensiones, aunque sepas hacerlo. Cuando una máquina se interviene, se <b>bloquea con candado y tarjeta</b>: nunca saques un candado ni una tarjeta que no pusiste tú, ni energices un equipo bloqueado.', k: 'No repares nada eléctrico: avisa al eléctrico autorizado.' },
      { s: 'al_electrico_falla', t: 'Avisa de inmediato cualquier falla', x: 'Si una máquina <b>da golpes de corriente, echa chispas, humo u olor a quemado</b>, o una extensión se calienta:<ul><li>Deja de usarla y apágala si es seguro.</li><li>Desenchúfala o corta su energía si sabes hacerlo sin riesgo.</li><li>Señalízala para que nadie la use.</li><li><b>Avisa de inmediato</b> a tu jefatura.</li></ul>Si un automático del tablero salta varias veces, <b>no lo vuelvas a subir</b>: algo está fallando.' },
      { s: 'al_electrico_descarga', t: 'Si alguien recibe una descarga', x: '<ul><li><b>1. Corta la energía</b> en el tablero o desenchufa, si es seguro.</li><li><b>2. No toques a la persona</b> mientras siga en contacto con la corriente.</li><li><b>3.</b> Si no puedes cortar, sepárala con un objeto seco que no conduzca, como un palo de madera, pisando en seco.</li><li><b>4.</b> Pide ayuda, avisa a tu jefatura y llama a la ACHS (1404).</li></ul>', k: 'Primero corta la energía: si tocas a la persona, la corriente pasa a ti.' }
    ],
    quiz: [
      { s: 'al_electrico_cable_q', v: [
        { q: 'El cable del esmeril angular está pelado. ¿Qué haces?', o: ['No lo uso y aviso a mi jefatura', 'Lo envuelvo con cinta y sigo', 'Lo uso sin tocar esa parte', 'Corto el tramo y lo empalmo'], w: 'Un cable pelado puede dar una descarga. No se parcha: lo revisa el eléctrico autorizado.' },
        { q: '¿Dónde no debe quedar una extensión?', o: ['Cruzando el paso de la grúa horquilla', 'Enrollada y guardada en su lugar', 'Colgada en altura, lejos del paso', 'Desconectada después de usarla'], w: 'La grúa horquilla o las piezas pueden aplastar y cortar el cable.' },
        { q: 'Antes de usar una herramienta eléctrica conviene revisar su cable y su enchufe.', vf: true, w: 'Verdadero. Así detectas daños antes de que te den una descarga.' }] },
      { s: 'al_electrico_soldadora', v: [
        { q: '¿Dónde va la pinza de tierra de la máquina de soldar?', o: ['Firme en la pieza, cerca de la soldadura', 'Colgando del carro de la máquina de soldar', 'En el piso, junto al charco de agua', 'En una columna del galpón, lejos de la pieza'], w: 'Bien puesta, cerca de la soldadura, la corriente vuelve por el camino correcto.' },
        { q: 'Vas a soldar y el piso está mojado. ¿Qué haces?', o: ['Seco el lugar o me cambio a uno seco', 'Sueldo con cuidado, sin pisar el agua', 'Sueldo más rápido', 'Me saco los guantes para sentir mejor'], w: 'El agua conduce la corriente: se suelda en un lugar seco, con guantes secos.' },
        { q: 'El cable porta electrodo tiene un tramo sin aislación. ¿Qué haces?', o: ['No suelda con él y aviso', 'Sigo, es solo un tramo corto', 'Lo envuelvo con un trapo', 'Lo mojo para que no se caliente'], w: 'Un cable sin aislación puede dar una descarga: se saca de servicio y se avisa.' }] },
      { s: 'al_electrico_agua', v: [
        { q: 'Tienes las manos mojadas y vas a enchufar el esmeril. ¿Qué haces?', o: ['Me seco las manos y me salgo del charco', 'Lo enchufo rápido para no mojarlo', 'Lo enchufo con el guante de cuero mojado', 'Lo enchufo con la mano que está menos mojada'], w: 'El agua conduce la electricidad: manos y pies secos antes de tocar un enchufe.' },
        { q: '¿Qué está prohibido hacer cerca de tableros y motores?', o: ['Lavar con manguera', 'Mantenerlos despejados', 'Avisar si están dañados', 'Mantener el piso seco'], w: 'El agua sobre partes eléctricas provoca descargas y cortocircuitos.' },
        { q: 'Si una extensión se mojó con la lluvia, puedes usarla cuando se seque por fuera.', vf: false, w: 'Falso. Por dentro puede seguir mojada. No se usa y se avisa.' }] },
      { s: 'al_electrico_tablero', v: [
        { q: '¿Cómo deben estar los tableros eléctricos?', o: ['Cerrados, señalizados y despejados', 'Abiertos, para que se ventilen', 'Tapados con piezas o cajas', 'Sin tapa, para llegar más rápido'], w: 'Cerrados para que nadie toque partes con corriente, y despejados para cortar la energía en una emergencia.' },
        { q: '¿Por qué no se dejan piezas delante de un tablero?', o: ['Para llegar a él de inmediato en una emergencia', 'Porque las piezas se oxidan junto al tablero', 'Porque el polvo de las cajas ensucia el tablero', 'Porque así el taller se ve más ordenado'], w: 'Si hay un incendio o una descarga, cada segundo cuenta para cortar la energía.' },
        { q: 'Ves un tablero abierto y con olor a quemado. ¿Qué haces?', o: ['Me alejo y aviso de inmediato', 'Lo cierro empujando la tapa', 'Reviso por dentro qué se quemó', 'Lo dejo así, no es mi tarea'], w: 'No te acerques: avisa para que lo revise el eléctrico autorizado.' }] },
      { s: 'al_electrico_autorizado', v: [
        { q: '¿Quién puede reparar una extensión o un enchufe en el taller?', o: ['Solo el eléctrico autorizado', 'Cualquiera que sepa hacerlo', 'El último que la usó', 'El trabajador más antiguo'], w: 'Una reparación mal hecha causa descargas o incendios: solo la hace el eléctrico autorizado.' },
        { q: 'Una máquina tiene candado y tarjeta de bloqueo. ¿Qué haces?', o: ['No la uso ni saco el bloqueo', 'Saco el candado si necesito usarla', 'Pido la llave y la enciendo', 'Uso la máquina sin sacar la tarjeta'], w: 'El bloqueo protege a quien la está interviniendo. Solo lo retira quien lo puso.' },
        { q: 'Un automático del tablero salta por tercera vez. Lo correcto es subirlo y seguir trabajando.', vf: false, w: 'Falso. Si salta varias veces algo está fallando: no se vuelve a subir y se avisa.' }] },
      { s: 'al_electrico_descarga_q', v: [
        { q: 'Un compañero quedó pegado a un equipo con corriente. ¿Qué haces primero?', o: ['Corto la energía en el tablero o desenchufo', 'Lo tomo firme del brazo para sacarlo', 'Le echo un balde de agua para despegarlo', 'Espero a ver si se suelta por sí solo'], w: 'Si lo tocas mientras hay corriente, la descarga pasa también a ti.' },
        { q: 'No puedes cortar la energía. ¿Cómo separas a la persona?', o: ['Con un palo de madera seco, pisando en seco', 'Con una barra de acero que tenga a mano', 'Con las manos desnudas, muy rápido', 'Con un trapo mojado para no quemarme'], w: 'La madera seca no conduce la electricidad. El metal y lo mojado sí.' },
        { q: 'Una máquina te dio un golpe de corriente leve. ¿Qué haces?', o: ['Dejo de usarla y aviso de inmediato', 'Sigo usándola, pero con guantes puestos', 'Sigo, pero sin tocar la carcasa metálica', 'No digo nada, ya que no me pasó nada'], w: 'Una máquina que da corriente tiene una falla. El próximo golpe puede ser grave.' }] }
    ]
  });

  // =====================================================================
  // 3) RUIDO Y PROTECCIÓN AUDITIVA (PREXOR)
  // =====================================================================
  const martillo = (x, y) => `<g transform="rotate(-30 ${x} ${y})"><rect x="${x - 2}" y="${y - 2}" width="4" height="26" fill="#8D6E63" stroke="${OL}" stroke-width=".8"/><rect x="${x - 8}" y="${y - 8}" width="16" height="8" rx="1" fill="#455A64" stroke="${OL}" stroke-width=".8"/></g>`;
  S.al_ruido_intro = () => svg(H.fondo.taller() + H.mesaSoldar(44, 165, 76) + H.plancha(48, 115, 66, 5) + W(30, 165, TA({ pose: 'carry', gloves: '#C8A27A', muffs: 'on' })) + esmerila(40, 110) + ruidoW(112, 100, 3)
    + H.mesaSoldar(214, 165, 96) + H.viga(220, 115, 84, 12) + W(190, 165, TA({ pose: 'stop', gloves: '#C8A27A', muffs: 'on' })) + martillo(208, 88) + ruidoW(262, 96, 3)
    + pl(80, 14, 'Esmeril', '#E8423A', 10) + pl(246, 14, 'Golpes de martillo', '#E8423A', 10) + pl(160, 40, 'Corte, plasma y granallado', '#E8423A', 10));
  S.al_ruido_oido = () => svg(H.fondo.liso('#EEF2F5') + ear(140, 160, 2) + ruidoW(30, 110, 4, '#E53935')
    + `<g transform="translate(16,96)">${H.esmerilMano(0, 0, 0, false)}</g>`
    + pl(250, 40, 'Daño permanente', '#C62828') + pl(250, 70, 'No tiene cura', '#C62828') + T(250, 120, 'Hipoacusia', 14, OL) + T(250, 138, 'por ruido', 12, OL));
  S.al_ruido_grito = () => svg(H.fondo.taller() + H.esmerilBanco(270, 165) + ruidoW(250, 98, 3, '#E53935', -1)
    + W(70, 165, TA({ pose: 'c4yell' })) + W(130, 165, TA({ flip: true, face: 'worried' })) + glob(20, 30, '¡¿QUÉ?!', 70)
    + `<g transform="translate(160,120)">${meter(0, 0, '95')}</g>` + `<path d="M76,170 h52 m-5,-4 l5,4 l-5,4 m-47,-8 l-5,4 l5,4" stroke="${OL}" stroke-width="1.6" fill="none"/>` + T(102, 186, '1 metro', 9, OL)
    + H.letrero(226, 22, 'obligacion', 'PROTECCIÓN', 44) + `<g transform="translate(248,37) scale(.5)">${earmuff(0, 6, 1)}</g>`);
  S.al_ruido_fonos = () => svg(H.fondo.taller() + W(90, 165, TA({ muffs: 'on' }))
    + `<circle cx="226" cy="90" r="58" fill="#fff" stroke="#90A4AE" stroke-width="3"/>` + `<g transform="translate(226,96)">${earmuff(0, 0, 1.6)}</g>`
    + pl(226, 160, 'Copas sobre toda la oreja', '#2E7D32', 10) + pl(226, 182, 'Sin gorro ni pelo debajo', '#2E7D32', 10) + linea(102, 92, 168, 90, '#2E7D32'));
  const panel = (x, n, c) => `<rect x="${x}" y="28" width="96" height="140" rx="10" fill="#fff" stroke="#90A4AE" stroke-width="2"/><circle cx="${x + 16}" cy="44" r="11" fill="${c}"/>` + T(x + 16, 49, n, 13, '#fff');
  S.al_ruido_tapones = () => svg(H.fondo.liso('#EEF2F5') + panel(8, '1', '#1565C0') + panel(112, '2', '#1565C0') + panel(216, '3', '#2E7D32')
    + `<g transform="translate(40,110)">${plug(0, 0, 1.4)}</g>` + G('at2_sh', `<path d="M36,82 q20,-10 40,0 M36,128 q20,10 40,0" stroke="#90A4AE" stroke-width="3" fill="none"/>`) + T(56, 156, 'Enrolla fino', 10, OL)
    + ear(150, 128, .9) + G('at2_p', `<path d="M178,72 l12,-14 m-10,0 h10 v10" stroke="#C62828" stroke-width="3" fill="none"/>`) + T(160, 158, 'Tira la oreja', 10, OL)
    + ear(254, 128, .9) + `<g transform="translate(252,112) scale(.5)">${plug(0, 0, 1)}</g>` + T(264, 158, 'Mete y sostén', 10, OL));
  S.al_ruido_tiempo = () => svg(H.fondo.liso('#EEF2F5') + T(160, 30, 'Turno con ruido', 13, OL)
    + `<rect x="20" y="60" width="280" height="30" rx="6" fill="#2E7D32"/>` + `<rect x="150" y="60" width="34" height="30" fill="#D7262B"/>` + G('at2_bl', `<rect x="150" y="60" width="34" height="30" fill="#FF8A80"/>`)
    + T(85, 80, 'Con protector', 11, '#fff') + T(242, 80, 'Con protector', 11, '#fff') + pl(167, 98, 'Me lo saqué un rato', '#C62828', 10)
    + W(80, 190, TA({ s: .7, muffs: 'neck', face: 'worried' })) + `<g transform="translate(110,148)">${H.esmerilMano(0, 0, 0, true)}</g>` + no(296, 180)
    + T(226, 146, 'Pierdes gran parte', 11, '#C62828') + T(226, 162, 'de la protección', 11, '#C62828'));
  S.al_ruido_cuidado = () => svg(H.fondo.taller() + H.mesaSoldar(140, 165, 120) + `<g transform="translate(176,108) scale(.7)">${earmuff(0, 0, 1)}</g>` + `<g transform="translate(220,112) scale(.6)">${plug(0, 0, 1)}</g><g transform="translate(236,113) scale(.6)">${plug(0, 0, 1)}</g>`
    + W(110, 165, TA({ pose: 'carry' })) + pl(196, 70, 'Limpios y sin grietas', '#2E7D32', 10) + pl(70, 14, 'Revisa tu protector', '#1565C0'));
  S.al_ruido_audio = () => svg(H.fondo.oficina() + `<rect x="40" y="40" width="110" height="125" rx="4" fill="#CFD8DC" stroke="#90A4AE" stroke-width="3"/><rect x="58" y="58" width="40" height="34" fill="#B3E5FC" stroke="#90A4AE" stroke-width="2"/>`
    + silla(88) + W(86, 165, { area: 'oficina', pose: 'cc4sit', shirt: '#22406B', pants: '#2B3A4A', muffs: 'on' })
    + `<g transform="translate(200,140) scale(1.2)">${doc(0, 0, 'Audiometría')}</g>` + pl(230, 14, 'Evaluación ACHS', '#2E7D32'));

  SI_CONT.temas.push({
    id: 'ruido', sec: 'todos', emp: ['ali'], title: 'Ruido y protección auditiva (PREXOR)', thumb: 'al_ruido_intro', mins: 15,
    learn: [
      { s: 'al_ruido_intro', t: 'El ruido en la maestranza', x: 'En el taller hay mucho ruido: <b>esmeriles</b> angulares y de banco, <b>golpes de martillo</b> sobre planchas y vigas, <b>corte</b> con sierra, guillotina y plasma, el <b>granallado</b> y el aire comprimido. Varios de estos ruidos superan los <b>85 dB(A)</b>, el nivel desde el cual el oído se daña con el tiempo. Por eso la empresa aplica el protocolo <b>PREXOR</b> del Ministerio de Salud.' },
      { s: 'al_ruido_oido', t: 'El daño es permanente', x: 'El ruido fuerte destruye de a poco las células del oído que nos permiten escuchar. El daño se llama <b>hipoacusia</b> y es <b>permanente: no tiene cura</b>, ni con operación ni con remedios. Avanza sin dolor, por eso uno no se da cuenta hasta que ya no entiende bien una conversación. También puede dejar un <b>zumbido</b> en los oídos que no se va.', k: 'La pérdida de audición por ruido es permanente: no tiene cura.' },
      { s: 'al_ruido_grito', t: '¿Cómo saber si hay demasiado ruido?', x: '<ul><li>Si para hablar con alguien que está a <b>1 metro</b> tienes que <b>gritar</b>, el ruido es peligroso.</li><li>Si al salir del trabajo te <b>zumban los oídos</b> o escuchas "apagado", tu oído está recibiendo daño.</li><li>Los lugares y tareas donde el protector es obligatorio están <b>señalizados</b> con el letrero azul.</li></ul>En esos casos, el protector auditivo se usa siempre.' },
      { s: 'al_ruido_fonos', t: 'Fonos bien puestos', x: '<ul><li>Las copas deben cubrir <b>toda la oreja</b> y apoyarse firmes en la cabeza.</li><li><b>Nada entre la almohadilla y la cabeza</b>: ni gorro, ni pelo, ni lápiz. Si usas lentes, que sus patillas sean delgadas.</li><li>Ajusta el cintillo a tu cabeza.</li><li>Si usas casco, usa fonos para casco.</li></ul>Unos fonos mal puestos protegen mucho menos de lo que crees.' },
      { s: 'al_ruido_tapones', t: 'Tapones bien puestos', x: 'Con las <b>manos limpias</b>:<ul><li><b>1.</b> Enrolla el tapón hasta dejarlo bien delgado.</li><li><b>2.</b> Con la otra mano, tira la oreja hacia arriba y atrás para abrir el conducto.</li><li><b>3.</b> Mete el tapón y sostenlo unos segundos mientras se expande.</li></ul>Bien puesto, casi no se ve desde el frente. Si queda afuera, no protege: sácalo y vuelve a ponerlo.' },
      { s: 'al_ruido_tiempo', t: 'Todo el tiempo que haya ruido', x: 'El protector sirve <b>solo si lo usas todo el tiempo</b> que estás expuesto. Si te lo sacas aunque sea un rato mientras sigue el ruido, para conversar o porque molesta, <b>pierdes gran parte de la protección</b> de toda la jornada. Úsalo también cuando el ruido lo hace un compañero cerca de ti. Para hablar, aléjate del ruido o pide que se detenga la máquina.', k: 'Usa el protector todo el tiempo que estés expuesto al ruido, no a ratos.' },
      { s: 'al_ruido_cuidado', t: 'Cuida tu protector', x: '<ul><li>Mantén los fonos <b>limpios</b> y revisa que las almohadillas no estén duras, rotas ni con grietas.</li><li>Los tapones desechables se botan al terminar; los reutilizables se lavan y se guardan en su estuche.</li><li>No los dejes sobre la mesa de trabajo, con virutas o grasa.</li><li>Si tu protector está dañado o no te queda bien, <b>pide el cambio</b> a tu jefatura.</li></ul>' },
      { s: 'al_ruido_audio', t: 'Vigilancia de tu audición', x: 'Si trabajas expuesto a ruido, el protocolo PREXOR establece que la ACHS te haga <b>audiometrías</b> (exámenes de audición) en forma periódica. Así se detecta un daño a tiempo. <b>Asiste cuando te citen</b> y sigue las indicaciones previas, por ejemplo evitar ruidos fuertes antes del examen. Fuera del trabajo también cuídate: música fuerte con audífonos, motosierra o disparos también dañan.' }
    ],
    quiz: [
      { s: 'al_ruido_intro', v: [
        { q: '¿Desde qué nivel de ruido el oído se daña con el tiempo?', o: ['Desde 85 dB(A)', 'Desde 140 dB(A)', 'Solo sobre 120 dB(A)', 'Desde 30 dB(A)'], w: 'Sobre 85 dB(A) el oído se daña con el tiempo. Varias tareas del taller lo superan.' },
        { q: '¿Qué protocolo del Ministerio de Salud vigila la exposición a ruido?', o: ['PREXOR', 'TMERT', 'CEAL-SM', 'PLANESI'], w: 'PREXOR es el protocolo de exposición ocupacional a ruido.' },
        { q: 'Esmerilar, martillar planchas y granallar son tareas con ruido peligroso.', vf: true, w: 'Verdadero. Son algunas de las fuentes de ruido más fuertes del taller.' }] },
      { s: 'al_ruido_oido', v: [
        { q: '¿Qué pasa con la pérdida de audición por ruido?', o: ['Es permanente, no tiene cura', 'Se recupera con remedios', 'Se cura con una operación', 'Se pasa sola en unos meses'], w: 'La hipoacusia por ruido es permanente. Solo se puede prevenir.' },
        { q: '¿Por qué la hipoacusia es engañosa?', o: ['Porque avanza sin dolor', 'Porque duele mucho al principio', 'Porque solo afecta a los mayores', 'Porque aparece en un solo día'], w: 'Avanza sin dolor y uno se da cuenta cuando ya no entiende bien.' },
        { q: 'Si después de años de ruido pierdes audición, se puede recuperar con tratamiento.', vf: false, w: 'Falso. El daño por ruido es permanente.' }] },
      { s: 'al_ruido_grito', v: [
        { q: 'Para hablar con un compañero a 1 metro tienes que gritar. ¿Qué significa?', o: ['Que el ruido es peligroso: uso protector', 'Que mi compañero escucha mal y debe ir al médico', 'Que el ruido del taller es normal y no daña', 'Que debo hablar más fuerte, nada más'], w: 'Si a 1 metro hay que gritar, el ruido supera lo seguro.' },
        { q: 'Al salir del trabajo te zumban los oídos. ¿Qué indica?', o: ['Que mi oído está recibiendo daño', 'Que estoy muy descansado', 'Que el oído se está limpiando', 'Nada, es normal'], w: 'El zumbido es una señal de que el ruido está dañando tu oído.' },
        { q: '¿Qué indica un letrero azul de protección auditiva?', o: ['Que el protector es obligatorio ahí', 'Que está prohibido hacer ruido en esa zona', 'Que en ese lugar hay un peligro eléctrico', 'Que es una zona de descanso del personal'], w: 'Los letreros azules indican una obligación.' }] },
      { s: 'al_ruido_fonos', v: [
        { q: '¿Cómo deben quedar los fonos?', o: ['Cubriendo toda la oreja, sin nada debajo', 'Puestos encima del gorro de lana', 'Sobre una sola oreja, para escuchar la radio', 'Colgando del cuello mientras haya ruido'], w: 'Si algo queda entre la almohadilla y la cabeza, el ruido entra.' },
        { q: 'Hace frío y quieres usar gorro con tus fonos. ¿Qué es lo correcto?', o: ['Que el gorro no quede bajo las almohadillas', 'Poner los fonos encima del gorro de lana', 'Sacarme los fonos mientras haga frío', 'Usar solo el gorro, que también protege'], w: 'El gorro bajo las almohadillas impide que sellen y deja pasar el ruido.' },
        { q: 'Unos fonos que no sellan bien igual protegen lo mismo.', vf: false, w: 'Falso. Si no sellan, protegen mucho menos.' }] },
      { s: 'al_ruido_tapones', v: [
        { q: '¿Qué haces antes de meter un tapón de espuma?', o: ['Lo enrollo fino, con las manos limpias', 'Lo mojo con agua para que entre más fácil', 'Lo corto por la mitad para que quede corto', 'Lo meto tal cual, sin enrollarlo'], w: 'Enrollado entra al conducto y se expande sellándolo.' },
        { q: '¿Para qué tiras la oreja hacia arriba y atrás?', o: ['Para abrir el conducto y meter bien el tapón', 'Para que el tapón quede afuera y se vea', 'Para que el tapón no me moleste al trabajar', 'Para escuchar mejor la radio del taller'], w: 'Así el conducto se endereza y el tapón entra completo.' },
        { q: 'Tu tapón quedó a medio poner, asomado. ¿Qué haces?', o: ['Lo saco y lo vuelvo a poner bien', 'Lo dejo así, algo protege igual', 'Lo empujo con un lápiz o un clavo', 'Me dejo solo uno puesto y sigo'], w: 'Un tapón asomado no sella. Se vuelve a poner bien.' }] },
      { s: 'al_ruido_tiempo', v: [
        { q: '¿Cuándo debes usar el protector auditivo?', o: ['Todo el tiempo que estoy expuesto al ruido', 'Solo durante la primera hora del turno', 'Solo cuando me empiezan a doler los oídos', 'Solo cuando pasa el supervisor a revisar'], w: 'Sacártelo un rato hace perder gran parte de la protección.' },
        { q: 'Un compañero esmerila a tu lado y tú estás midiendo una pieza. ¿Qué haces?', o: ['Uso mi protector igual', 'No lo uso, el ruido no es mío', 'Me tapo un oído con la mano', 'Espero y sigo sin protector'], w: 'El ruido de un compañero te daña igual.' },
        { q: 'Necesitas conversar con alguien en una zona ruidosa. ¿Qué haces?', o: ['Nos alejamos del ruido para hablar', 'Me saco los fonos junto al esmeril', 'Hablo a gritos sin protector', 'Le hago señas y me saco un tapón'], w: 'Se conversa lejos del ruido o con la máquina detenida.' }] }
    ]
  });

  // =====================================================================
  // 4) RADIACIÓN UV DE ORIGEN SOLAR
  // =====================================================================
  const FA = o => Object.assign({ area: 'faena' }, o || {});
  S.al_uv_sol = () => svg(H.fondo.patio() + sol(44, 34) + rayoUV(64, 50, 188, 98) + rayoUV(60, 58, 176, 116) + H.viga(200, 168, 90, 14) + W(176, 175, TA({ pose: 'bend', gloves: '#C8A27A', glasses: true }))
    + pl(230, 14, 'No se ve ni se siente', '#8E24AA'));
  S.al_uv_quien = () => svg(H.fondo.faena() + sol(290, 30, 14) + `<rect x="150" y="104" width="60" height="6" fill="#F9A825"/>` + W(100, 178, FA({ pose: 'point' })) + W(250, 178, FA({ pose: 'carry', flip: true, gloves: '#C8A27A' }))
    + pl(80, 14, 'Faenas de clientes', '#E8423A', 10) + pl(200, 186, 'Montajes y patio', '#E8423A', 10));
  const NIV = [['1-2', '#4CAF50', 'Bajo'], ['3-5', '#FDD835', 'Moderado'], ['6-7', '#FB8C00', 'Alto'], ['8-10', '#E53935', 'Muy alto'], ['11+', '#8E24AA', 'Extremo']];
  S.al_uv_indice = () => svg(H.fondo.liso('#EEF2F5') + T(160, 26, 'Índice UV', 15, OL) + NIV.map(([n, c, t], i) => `<rect x="${14 + i * 60}" y="${150 - (i + 1) * 20}" width="52" height="${(i + 1) * 20}" rx="4" fill="${c}"/>` + T(40 + i * 60, 144, n, 12, '#fff') + T(40 + i * 60, 170, t, 10, OL)).join('')
    + G('at2_p', `<path d="M92,34 h44 l-22,20z" fill="#C62828"/>`) + T(114, 186, 'Desde 3: protégete', 11, '#C62828'));
  S.al_uv_horario = () => svg(H.fondo.liso('#E3F2FD') + `<path d="M30,160 Q160,-10 290,160" stroke="#FFB300" stroke-width="3" fill="none" stroke-dasharray="6 5"/>`
    + `<path d="M96,92 Q160,10 224,92" stroke="#E53935" stroke-width="8" fill="none" opacity=".6"/>` + sol(160, 48, 16) + `<rect y="160" width="320" height="40" fill="#A1A1A1"/>`
    + T(96, 112, '11:00', 13, '#C62828') + T(224, 112, '16:00', 13, '#C62828') + T(30, 180, 'Mañana', 11, '#fff') + T(290, 180, 'Tarde', 11, '#fff') + pl(160, 130, 'Radiación más fuerte', '#C62828', 10));
  S.al_uv_epp = () => svg(H.fondo.faena() + W(110, 178, FA({ s: 1.2 })) + cubrenuca(110, 178, { s: 1.2 })
    + pl(240, 20, 'Casco con legionario', '#2E7D32', 10) + pl(240, 46, 'Lentes con filtro UV', '#2E7D32', 10) + pl(240, 72, 'Bloqueador FPS 50', '#2E7D32', 10) + pl(240, 98, 'Manga larga', '#2E7D32', 10)
    + linea(184, 30, 122, 60, '#2E7D32') + linea(184, 56, 120, 86, '#2E7D32') + linea(184, 82, 116, 96, '#2E7D32') + linea(186, 108, 128, 124, '#2E7D32'));
  const dosif = (x, y) => `<rect x="${x}" y="${y}" width="26" height="40" rx="4" fill="#FB8C00" stroke="${OL}" stroke-width="1.2"/><rect x="${x + 4}" y="${y + 6}" width="18" height="14" fill="#fff"/>` + T(x + 13, y + 16, 'FPS 50', 5.5, '#E65100') + `<rect x="${x + 9}" y="${y + 40}" width="8" height="6" fill="#455A64"/>`;
  S.al_uv_fps = () => svg(H.fondo.patio() + dosif(60, 96) + `<rect x="58" y="92" width="30" height="4" fill="#455A64"/>` + W(118, 175, TA({ pose: 'c4drink' })) + G('at2_p', `<circle cx="128" cy="104" r="3" fill="#fff"/>`)
    + clock(250, 70, 26) + pl(250, 104, 'Cada 2 horas', '#E65100') + pl(74, 150, 'Dosificador', '#E65100', 9));
  S.al_uv_refleja = () => svg(H.fondo.patio() + div() + sol(30, 26, 12) + `<path d="M14,168 h130 l-6,8 h-122z" fill="#CFD8DC" stroke="#90A4AE"/>` + rayoUV(36, 40, 80, 166) + rayoUV(80, 166, 120, 96) + W(124, 175, TA({ s: .8 }))
    + pl(80, 186, 'Planchas que reflejan', '#8E24AA', 9)
    + `<rect x="160" y="0" width="160" height="200" fill="#C9D1D6"/>` + H.mesaSoldar(200, 175, 100) + W(186, 175, { area: 'soldadura', pose: 'carry', careta: true }) + H.arco(224, 116)
    + rayoUV(224, 116, 300, 70, '#7C4DFF') + rayoUV(224, 116, 304, 120, '#7C4DFF') + pl(240, 14, 'El arco también emite UV', '#7C4DFF', 9));
  S.al_uv_piel = () => svg(H.fondo.liso('#FFF8E1') + `<path d="M20,140 q80,-30 200,-20 l20,40 q-110,-6 -220,20z" fill="#F1C27D" stroke="#C9956B" stroke-width="2"/>`
    + `<circle cx="150" cy="120" r="46" fill="#fff" fill-opacity=".25" stroke="#455A64" stroke-width="6"/><path d="M182,152 l40,40" stroke="#455A64" stroke-width="10" stroke-linecap="round"/>`
    + G('at2_p', `<path d="M140,118 q6,-10 14,-4 q8,4 2,12 q-6,8 -14,2 q-6,-4 -2,-10z" fill="#5D4037"/>`) + pl(250, 30, 'Lunar que cambia', '#C62828') + pl(250, 56, 'Herida que no sana', '#C62828'));

  SI_CONT.temas.push({
    id: 'uv', sec: 'todos', emp: ['ali'], title: 'Radiación UV de origen solar', thumb: 'al_uv_epp', mins: 12,
    learn: [
      { s: 'al_uv_sol', t: 'Un riesgo que no se siente', x: 'El sol emite <b>radiación ultravioleta (UV)</b>. No se ve ni se siente, y daña aunque el día esté nublado o fresco. Con los años produce <b>quemaduras, queratitis (inflamación de los ojos), envejecimiento de la piel, cataratas y cáncer de piel</b>. La ley obliga a proteger a quienes trabajan al aire libre.' },
      { s: 'al_uv_quien', t: '¿Quién está expuesto en ALI?', x: '<ul><li>Quienes trabajan en el <b>patio</b>: carga y descarga, armado y corte de piezas grandes.</li><li>Quienes van a <b>faenas de clientes</b>: montajes, reparaciones y mantenciones al aire libre.</li><li>Choferes y ayudantes que cargan y descargan.</li></ul><b>Basta estar una parte del día al sol</b> para necesitar protección.' },
      { s: 'al_uv_indice', t: 'El índice UV', x: 'Mide la fuerza de la radiación:<ul><li><b>1 y 2:</b> bajo.</li><li><b>3 a 5:</b> moderado.</li><li><b>6 y 7:</b> alto.</li><li><b>8 a 10:</b> muy alto.</li><li><b>11 o más:</b> extremo.</li></ul>En primavera y verano, en Los Ángeles, suele llegar a muy alto o extremo. <b>Desde 3 hay que protegerse.</b> Lo informan la radio, la televisión y las aplicaciones del clima.' },
      { s: 'al_uv_horario', t: 'El horario más peligroso', x: 'Entre las <b>11 y las 16 horas</b> la radiación es más fuerte. En ese horario:<ul><li>Busca la sombra en tus pausas.</li><li>Cuando se pueda, las tareas largas al sol se programan temprano o al final de la tarde, y se usa sombraje.</li><li>No te saques la protección aunque haga calor.</li></ul>', k: 'Entre las 11 y las 16 horas: protección completa y sombra siempre que se pueda.' },
      { s: 'al_uv_epp', t: 'Tu protección contra el sol', x: '<ul><li><b>Casco con legionario</b> (cubrenuca): protege cara, orejas y cuello.</li><li><b>Poleras o camisas de manga larga</b> y pantalón largo.</li><li><b>Lentes de seguridad con filtro UV</b>.</li><li><b>Bloqueador FPS 50</b> en la piel que queda al aire: cara, orejas, cuello y manos.</li></ul>Úsalos aunque esté nublado, junto con el resto de tu EPP.' },
      { s: 'al_uv_fps', t: 'Bloqueador bien usado', x: '<ul><li>Usa el bloqueador <b>FPS 50 de los dosificadores</b> de la empresa.</li><li>Aplícalo <b>30 minutos antes</b> de salir al sol, en buena cantidad.</li><li><b>Repítelo cada 2 horas</b>, y antes si sudas mucho.</li><li>Aplícalo con las manos limpias, sin restos de aceite ni solvente.</li></ul>En faenas, lleva tu bloqueador contigo.', k: 'Bloqueador FPS 50 de los dosificadores, cada 2 horas.' },
      { s: 'al_uv_refleja', t: 'Lo que refleja y el arco de soldadura', x: 'Las <b>planchas de acero</b>, el agua y las superficies claras <b>reflejan la radiación</b>: te llega desde arriba y desde abajo. Ojo: el <b>arco de soldadura también emite radiación UV</b>, mucho más fuerte que el sol, y quema la piel y los ojos en minutos. Su protección (careta, ropa cerrada, biombos) se ve en la charla de soldadura.' },
      { s: 'al_uv_piel', t: 'Revisa tu piel y avisa', x: 'Si notas un <b>lunar que cambia de forma, color o tamaño</b>, una herida que no sana, o terminas con quemaduras o con los ojos irritados después de trabajar al sol, avisa a tu jefatura y consulta. <b>El daño del sol se acumula</b> con los años: lo que te cuidas hoy evita una enfermedad mañana.' }
    ],
    quiz: [
      { s: 'al_uv_sol', v: [
        { q: '¿Qué daño puede causar la radiación UV del sol con los años?', o: ['Cáncer de piel y cataratas', 'Solo un bronceado parejo', 'Solo sed y cansancio', 'Ninguno, si el día es fresco'], w: 'El daño se acumula: quemaduras, cataratas y cáncer de piel.' },
        { q: '¿La radiación UV daña en un día nublado?', o: ['Sí, atraviesa las nubes', 'No, las nubes la bloquean', 'Solo si llueve', 'Solo en invierno'], w: 'La radiación UV atraviesa las nubes: hay que protegerse igual.' },
        { q: 'Como la radiación UV no se siente, solo hay que protegerse cuando hace mucho calor.', vf: false, w: 'Falso. La radiación UV no depende del calor: daña aunque esté fresco.' }] },
      { s: 'al_uv_indice', v: [
        { q: '¿Desde qué índice UV hay que protegerse?', o: ['Desde 3', 'Desde 8', 'Desde 11', 'Desde 6'], w: 'Desde índice 3, moderado, se usa protección.' },
        { q: 'El índice UV del día es 9. ¿Qué nivel es?', o: ['Muy alto', 'Bajo', 'Moderado', 'Sin riesgo'], w: 'De 8 a 10 es muy alto.' },
        { q: '¿En qué horario la radiación es más fuerte?', o: ['Entre las 11 y las 16 horas', 'Entre las 7 y las 9 horas', 'Después de las 19 horas', 'Es igual todo el día'], w: 'Al mediodía el sol está más alto y la radiación es más fuerte.' }] },
      { s: 'al_uv_epp', v: [
        { q: 'Vas a una faena al aire libre. ¿Qué protección contra el sol usas?', o: ['Legionario, manga larga, lentes UV y FPS 50', 'Polera sin mangas y gorro de lana grueso', 'Solo lentes oscuros de sol, sin bloqueador', 'Nada más, porque llevo puesto el casco'], w: 'Legionario, manga larga, lentes con filtro UV y bloqueador FPS 50.' },
        { q: '¿Para qué sirve el legionario bajo el casco?', o: ['Para proteger orejas, cuello y nuca', 'Para que el casco no se caiga al agacharme', 'Para escuchar mejor las instrucciones', 'Para no sudar tanto bajo el casco'], w: 'El cubrenuca protege la piel que el casco no cubre.' },
        { q: 'Trabajar con polera sin mangas en el patio en verano es correcto si usas bloqueador.', vf: false, w: 'Falso. Se usa manga larga además del bloqueador.' }] },
      { s: 'al_uv_fps', v: [
        { q: '¿Cada cuánto se repite el bloqueador?', o: ['Cada 2 horas', 'Una vez al día', 'Cada 6 horas', 'Solo si me quemo'], w: 'El bloqueador pierde efecto con el sudor y el tiempo: se repite cada 2 horas.' },
        { q: '¿Qué bloqueador usas en el trabajo?', o: ['El FPS 50 de los dosificadores', 'Aceite de bronceado', 'Crema hidratante sin filtro', 'Ninguno, basta la sombra'], w: 'La empresa dispone bloqueador FPS 50 en dosificadores.' },
        { q: '¿Cuándo aplicas el bloqueador?', o: ['30 minutos antes de salir al sol', 'Al terminar la jornada de trabajo', 'Solo cuando ya tengo la piel roja', 'Una vez a la semana, el lunes'], w: 'Se aplica antes de exponerse, para que alcance a actuar.' }] },
      { s: 'al_uv_refleja', v: [
        { q: '¿Qué otra fuente de radiación UV hay en la maestranza?', o: ['El arco de soldadura', 'Las luces de la oficina', 'El torno', 'La grúa horquilla'], w: 'El arco de soldadura emite radiación UV muy intensa.' },
        { q: '¿Por qué en el patio te llega radiación también desde abajo?', o: ['Porque las planchas y lo claro la reflejan', 'Porque la radiación sale del piso de ripio', 'Porque la emite el casco blanco que uso', 'No llega desde abajo, solo desde arriba'], w: 'Las superficies claras y metálicas reflejan la radiación.' },
        { q: 'El arco de soldadura puede quemar la piel y los ojos en minutos.', vf: true, w: 'Verdadero. Por eso se usa careta, ropa cerrada y biombos.' }] },
      { s: 'al_uv_piel', v: [
        { q: 'Notas un lunar que cambió de color y tamaño. ¿Qué haces?', o: ['Consulto a un médico y aviso', 'No le doy importancia', 'Me lo saco en la casa', 'Le pongo bloqueador encima'], w: 'Un lunar que cambia puede ser una señal de cáncer de piel: se consulta pronto.' },
        { q: '¿Qué pasa con el daño del sol a lo largo de los años?', o: ['Se acumula', 'Desaparece cada invierno', 'Se borra con cremas', 'Solo afecta a los niños'], w: 'El daño se suma año a año: por eso hay que protegerse siempre.' },
        { q: 'Terminaste la faena con los ojos irritados por el sol. Corresponde avisar y consultar.', vf: true, w: 'Verdadero. La radiación UV puede inflamar los ojos (queratitis).' }] }
    ]
  });

  // =====================================================================
  // 5) CALOR Y GOLPE DE CALOR
  // =====================================================================
  S.al_calor_termo = () => svg(H.fondo.taller() + calorW(70, 40, 4) + calorW(220, 40, 4) + termo(270, 140, 90, .88) + W(140, 165, TA({ face: 'worried' })) + sudor(150, 84)
    + pl(120, 14, 'Calor + esfuerzo + EPP', '#E65100'));
  S.al_calor_lugares = () => svg(H.fondo.soldadura() + sol(160, -6, 16) + calorW(110, 50, 3) + H.mesaSoldar(40, 165, 100) + W(30, 165, { area: 'soldadura', pose: 'carry', careta: true }) + H.arco(70, 106)
    + H.carroOxi(250, 165) + W(226, 165, { area: 'soldadura', pose: 'point', flip: true, careta: true }) + llama(196, 106, .5)
    + pl(160, 30, 'Techo del galpón al sol', '#E65100', 10) + pl(70, 186, 'Soldadura', '#E65100', 10) + pl(250, 186, 'Oxicorte', '#E65100', 10));
  const tarjeta = (x, y, t1, t2, c, ico) => `<rect x="${x}" y="${y}" width="146" height="80" rx="10" fill="#fff" stroke="${c}" stroke-width="3"/>` + ico + T(x + 96, y + 34, t1, 11, c) + T(x + 96, y + 52, t2, 9, OL, 'middle', 'normal');
  S.al_calor_sintomas = () => svg(H.fondo.liso('#FFF3E0')
    + tarjeta(10, 14, 'Calambres', 'piernas y brazos', '#FB8C00', `<path d="M30,30 q12,20 0,40 M42,30 q-12,20 0,40" stroke="#FB8C00" stroke-width="5" fill="none"/>`)
    + tarjeta(164, 14, 'Deshidratación', 'sed, orina oscura', '#FB8C00', drop(196, 64, 1.2, '#4FC3F7'))
    + tarjeta(10, 104, 'Agotamiento', 'mareo, náuseas', '#E53935', G('at2_sp', `<path d="M40,144 a10,10 0 1 1 6,8 a16,16 0 1 1 10,-14" stroke="#E53935" stroke-width="3" fill="none"/>`))
    + tarjeta(164, 104, 'Golpe de calor', 'confusión, desmayo', '#B71C1C', termo(196, 166, 46, .95)));
  S.al_calor_golpe = () => svg(H.fondo.taller() + `<g transform="rotate(-90 100 176)">${W(100, 176, TA({ face: 'pain' }))}</g>` + calorW(80, 150, 3)
    + W(220, 165, TA({ pose: 'cc4phoneup', flip: true })) + H.fono(246, 40) + pl(120, 14, 'Emergencia: avisa y llama', '#C62828'));
  S.al_calor_ayuda = () => svg(H.fondo.patio() + `<path d="M150,150 V96 M290,150 V96" stroke="#455A64" stroke-width="4"/><path d="M136,98 L220,80 L304,98z" fill="#2E7D32" opacity=".85"/><rect x="140" y="150" width="160" height="25" fill="#000" opacity=".1"/>`
    + `<rect x="180" y="149" width="60" height="6" fill="#6D4C41"/>` + W(186, 175, TA({ pose: 'cc4sit', face: 'worried' })) + sudor(196, 108)
    + W(270, 175, TA({ pose: 'cc3give', flip: true })) + botella(244, 132, 1) + pl(90, 14, 'A la sombra y con agua', '#2E7D32'));
  S.al_calor_hidrata = () => svg(H.fondo.taller() + W(110, 165, TA({ pose: 'c4drink' })) + botella(120, 100, 1.1) + clock(240, 66, 28) + pl(240, 100, 'Cada 15 a 20 minutos', '#0277BD')
    + `<g transform="translate(210,162) scale(1.5)">${botella(0, 0, 1)}</g><g transform="translate(240,162) scale(1.5)">${botella(0, 0, 1)}</g><g transform="translate(270,162) scale(1.5)">${botella(0, 0, 1)}</g>`);
  S.al_calor_pausas = () => svg(H.fondo.taller() + extractorPared(70, 76, 18) + aire(104, 70, '#4FC3F7') + `<rect x="170" y="150" width="60" height="6" fill="#6D4C41"/><rect x="174" y="156" width="4" height="9" fill="#6D4C41"/><rect x="222" y="156" width="4" height="9" fill="#6D4C41"/>`
    + W(176, 165, TA({ pose: 'cc4sit' })) + botella(204, 120, .9) + W(276, 165, TA({ pose: 'carry', flip: true })) + pl(170, 14, 'Pausas en un lugar fresco', '#2E7D32'));
  S.al_calor_avisa = () => svg(H.fondo.taller() + calorW(90, 50, 3) + H.mesaSoldar(170, 165, 110) + H.viga(176, 115, 98, 14) + W(140, 165, TA({ pose: 'stop', face: 'worried' })) + sudor(150, 84)
    + glob(176, 40, 'Me siento mal', 100) + pl(110, 186, 'Me detengo y aviso', '#2E7D32', 10));
  S.al_calor_q = () => svg(H.fondo.patio() + sol(40, 30, 14) + calorW(140, 110, 3) + `<g transform="rotate(-90 150 182)">${W(150, 182, TA({ face: 'pain' }))}</g>` + W(260, 175, TA({ flip: true, face: 'worried' })) + preg(220, 70));

  SI_CONT.temas.push({
    id: 'calor', sec: 'todos', emp: ['ali'], title: 'Calor y golpe de calor', thumb: 'al_calor_termo', mins: 12,
    learn: [
      { s: 'al_calor_termo', t: '¿Por qué el calor es peligroso?', x: 'El cuerpo se enfría sudando. Si hace mucho calor, el trabajo es pesado o no tomas agua, pierdes agua y sales, y tu temperatura sube. Eso produce <b>calambres, deshidratación, agotamiento por calor y golpe de calor</b>, que es una emergencia. El calor también cansa y baja la atención: aumentan los cortes, golpes y quemaduras.' },
      { s: 'al_calor_lugares', t: 'El calor en la maestranza', x: '<ul><li><b>El galpón en verano:</b> el techo metálico al sol calienta todo el taller.</li><li><b>Soldadura, oxicorte y precalentamiento de piezas:</b> calor radiante muy cerca del cuerpo.</li><li><b>Granallado y pintura:</b> trajes y respiradores que no dejan transpirar.</li><li><b>Faenas al sol</b> y trabajo en el patio.</li></ul>A eso se suman el esfuerzo físico y la ropa de protección.' },
      { s: 'al_calor_sintomas', t: 'Señales de alerta', x: '<ul><li><b>Calambres:</b> dolor y contracción en piernas, brazos o abdomen.</li><li><b>Deshidratación:</b> sed, boca seca, orina escasa y oscura, dolor de cabeza.</li><li><b>Agotamiento por calor:</b> sudor abundante, piel fría y húmeda, mareo, náuseas, debilidad.</li><li><b>Golpe de calor:</b> piel caliente y roja, confusión, habla rara, desmayo.</li></ul>' },
      { s: 'al_calor_golpe', t: 'El golpe de calor es una emergencia', x: 'Si alguien está <b>confundido, se desmaya o tiene la piel muy caliente</b>, puede ser un golpe de calor: la temperatura del cuerpo sube tanto que puede causar la muerte. <b>Avisa de inmediato</b> a tu jefatura y llama a la ACHS (1404). Mientras llega la ayuda, empieza a enfriarlo.', k: 'Golpe de calor: avisa de inmediato y llama al 1404.' },
      { s: 'al_calor_ayuda', t: 'Si un compañero tiene síntomas', x: '<ul><li>Llévalo a la <b>sombra</b> o a un lugar fresco y que deje de trabajar.</li><li>Aflójale la ropa y sácale la chaqueta de soldar o el EPP que le dé calor.</li><li>Moja su piel con agua y abanícalo.</li><li>Si está consciente, dale agua a sorbos. Si está confundido o desmayado, <b>no le des de beber</b>.</li><li>No lo dejes solo y avisa a tu jefatura.</li></ul>' },
      { s: 'al_calor_hidrata', t: 'Agua seguido, aunque no tengas sed', x: 'Toma <b>un vaso de agua cada 15 a 20 minutos</b>, aunque no tengas sed: cuando aparece la sed, ya empezaste a deshidratarte. Ten tu botella cerca, pero lejos de químicos y polvo de granalla, y lávate las manos antes de tomar. Evita el alcohol y las bebidas energéticas o muy azucaradas. Mira tu orina: clara está bien; oscura es falta de agua.' },
      { s: 'al_calor_pausas', t: 'Pausas, ventilación y aclimatación', x: '<ul><li>Haz tus pausas en un <b>lugar fresco o a la sombra</b>.</li><li>Usa la ventilación disponible y abre portones cuando se pueda.</li><li>Cuando se pueda, las tareas más pesadas o con calor se hacen en las horas más frescas.</li><li>Si eres nuevo o vuelves de vacaciones, ve de a poco: el cuerpo tarda varios días en acostumbrarse.</li></ul>No te saques el EPP para pasar el calor: haz una pausa.' },
      { s: 'al_calor_avisa', t: 'Si te sientes mal, detente', x: 'Llega descansado; el alcohol del día anterior deshidrata. Si tomas remedios o tienes una enfermedad, por ejemplo de presión, corazón o diabetes, coméntalo con tu médico. Si sientes mareo, náuseas, calambres o dolor de cabeza, <b>detente y avisa</b>: no sigas para terminar la pieza.', k: 'Si te sientes mal por el calor, detente y avisa: no sigas trabajando.' }
    ],
    quiz: [
      { s: 'al_calor_termo', v: [
        { q: '¿Por qué el calor aumenta los accidentes en el taller?', o: ['Porque cansa y baja la atención', 'Porque las máquinas andan más lento', 'Porque el acero se ablanda', 'No influye en los accidentes'], w: 'Con calor te cansas antes y te concentras menos.' },
        { q: '¿Cómo se enfría el cuerpo?', o: ['Sudando', 'Tomando bebidas azucaradas', 'Con el EPP puesto', 'Trabajando más rápido'], w: 'El sudor enfría el cuerpo, pero hay que reponer el agua perdida.' },
        { q: 'Soldar y hacer oxicorte en verano dentro del galpón aumenta el riesgo por calor.', vf: true, w: 'Verdadero. Se suma el calor del galpón, de la llama o el arco y de la ropa de protección.' }] },
      { s: 'al_calor_sintomas', v: [
        { q: '¿Cuál es una señal de golpe de calor?', o: ['Confusión y piel caliente y roja', 'Mucha hambre a la hora de almuerzo', 'Ganas de conversar con los demás', 'Manos frías en las mañanas de invierno'], w: 'La confusión y la piel muy caliente indican golpe de calor: es una emergencia.' },
        { q: 'Tu orina está escasa y oscura. ¿Qué indica?', o: ['Que me falta agua', 'Que tomé mucha agua', 'Que estoy bien hidratado', 'Nada, es normal'], w: 'La orina oscura es señal de deshidratación.' },
        { q: 'Un compañero suda mucho, está pálido, mareado y con náuseas. ¿Qué tiene probablemente?', o: ['Agotamiento por calor', 'Un resfrío común', 'Hambre de almuerzo', 'Sueño por trasnochar'], w: 'Son señales de agotamiento por calor: hay que actuar.' }] },
      { s: 'al_calor_q', v: [
        { q: 'Un compañero se desmayó trabajando al sol. ¿Qué haces primero?', o: ['Aviso de inmediato y llamo al 1404', 'Le doy agua para que se despierte', 'Lo dejo descansar solo en la sombra', 'Espero a ver si se recupera solo'], w: 'Puede ser golpe de calor: es una emergencia. A una persona desmayada no se le da de beber.' },
        { q: 'Mientras llega la ayuda, ¿qué haces con un compañero con golpe de calor?', o: ['Lo llevo a la sombra y lo enfrío con agua', 'Lo abrigo con una frazada para que sude', 'Le doy café caliente con mucha azúcar', 'Lo hago caminar para que se despierte'], w: 'Hay que bajar la temperatura: sombra, ropa suelta, agua en la piel y aire.' },
        { q: 'A una persona confundida por el calor hay que darle mucha agua de inmediato.', vf: false, w: 'Falso. Si está confundida o desmayada no se le da de beber: puede ahogarse.' }] },
      { s: 'al_calor_hidrata', v: [
        { q: '¿Cada cuánto tomas agua en días de calor?', o: ['Un vaso cada 15 a 20 minutos', 'Solo al almuerzo', 'Solo cuando tengo mucha sed', 'Al terminar la jornada'], w: 'Cuando aparece la sed ya empezaste a deshidratarte.' },
        { q: '¿Qué bebida conviene evitar con calor?', o: ['Las energéticas o con alcohol', 'El agua', 'El agua fresca con sorbos', 'El agua de la botella personal'], w: 'Las energéticas y el alcohol aumentan la deshidratación.' },
        { q: 'Si no tienes sed, no necesitas tomar agua aunque haga calor.', vf: false, w: 'Falso. La sed llega tarde: se toma agua seguido igual.' }] },
      { s: 'al_calor_pausas', v: [
        { q: '¿Dónde haces tus pausas en un día de calor?', o: ['En un lugar fresco o a la sombra', 'Junto a la pieza recién soldada', 'Al sol, para no enfriarme', 'Dentro de la cabina de granallado'], w: 'Las pausas en un lugar fresco ayudan al cuerpo a recuperarse.' },
        { q: 'Volviste de vacaciones en pleno verano. ¿Qué es lo correcto?', o: ['Ir de a poco: el cuerpo tarda en adaptarse', 'Recuperar el tiempo trabajando sin pausas', 'Hacer primero las tareas más pesadas del día', 'No tomar agua para no ir tanto al baño'], w: 'El cuerpo tarda varios días en adaptarse al calor.' },
        { q: 'Tienes mucho calor con la chaqueta de soldar. ¿Qué haces?', o: ['Hago una pausa en un lugar fresco', 'Me la saco y sigo soldando en polera', 'Me abro la chaqueta y sigo soldando', 'Sigo sin decir nada hasta terminar'], w: 'El EPP no se saca para soldar: se hace una pausa para refrescarse.' }] },
      { s: 'al_calor_avisa', v: [
        { q: 'Estás terminando una pieza y te sientes mareado por el calor. ¿Qué haces?', o: ['Me detengo y aviso', 'Termino rápido la pieza', 'Tomo una bebida energética', 'Sigo sin decir nada'], w: 'Seguir con síntomas puede terminar en un golpe de calor o un accidente.' },
        { q: '¿Qué puede empeorar el efecto del calor al día siguiente?', o: ['Haber tomado alcohol la noche anterior', 'Haber dormido bien la noche anterior', 'Tomar agua seguido durante el turno', 'Tomar desayuno antes de llegar al trabajo'], w: 'El alcohol deshidrata y aumenta el riesgo.' },
        { q: 'Si tomas remedios para la presión, conviene preguntarle a tu médico cómo te afecta el calor.', vf: true, w: 'Verdadero. Algunas enfermedades y remedios aumentan el riesgo con el calor.' }] }
    ]
  });

  // =====================================================================
  // 6) PAUSAS ACTIVAS Y TRASTORNOS MUSCULOESQUELÉTICOS (TMERT)
  // =====================================================================
  const caballete = (x, w = 70, h = 30) => `<rect x="${x}" y="${165 - h}" width="${w}" height="5" fill="#607D8B" stroke="${OL}"/><path d="M${x + 6},${170 - h} l-4,${h - 5} M${x + 14},${170 - h} l4,${h - 5} M${x + w - 14},${170 - h} l-4,${h - 5} M${x + w - 6},${170 - h} l4,${h - 5}" stroke="#546E7A" stroke-width="3"/>`;
  const dolor = (x, y, r = 8) => G('at2_p', `<circle cx="${x}" cy="${y}" r="${r}" fill="#E53935" opacity=".45"/><circle cx="${x}" cy="${y}" r="${r * .45}" fill="#E53935"/>`);
  S.al_tmert_intro = () => svg(H.fondo.soldadura() + div() + H.viga(40, 165, 100, 10) + W(30, 165, { area: 'soldadura', pose: 'bend', careta: true }) + H.arco(68, 150) + dolor(30, 132)
    + W(236, 165, TA({ pose: 'c4reach', gloves: '#C8A27A' })) + `<rect x="170" y="54" width="140" height="10" fill="#78909C" stroke="${OL}"/>` + H.esmerilMano(228, 70, -90, false) + H.chispas(248, 62, 7, 1) + dolor(232, 98, 7)
    + pl(80, 14, 'Espalda doblada', '#C62828', 10) + pl(240, 186, 'Brazos sobre los hombros', '#C62828', 9) + no(140, 40) + no(300, 30));
  S.al_tmert_factores = () => svg(H.fondo.liso('#EEF2F5')
    + tarjeta(10, 14, 'Repetición', 'el mismo gesto', '#1565C0', G('at2_sp', `<path d="M24,54 a14,14 0 1 1 10,12" stroke="#1565C0" stroke-width="4" fill="none"/><path d="M30,70 l6,-6 l2,8z" fill="#1565C0"/>`))
    + tarjeta(164, 14, 'Fuerza', 'apretar, levantar', '#1565C0', `<path d="M180,70 q-4,-30 14,-34 q10,-2 12,8 q8,-6 14,2 q-2,20 -16,26z" fill="#F1C27D" stroke="${OL}" stroke-width="1.5"/>`)
    + tarjeta(10, 104, 'Postura forzada', 'agachado, brazos arriba', '#1565C0', `<g transform="translate(18,186) scale(.62)">${W(10, 0, TA({ pose: 'bend' }))}</g>`)
    + tarjeta(164, 104, 'Vibración', 'esmeril, martillo', '#1565C0', G('at2_sh', `<g transform="translate(172,136) scale(.8)">${H.esmerilMano(0, 0, 0, false)}</g>`)));
  S.al_tmert_altura = () => svg(H.fondo.taller() + div() + H.viga(30, 165, 100, 12) + W(36, 165, TA({ pose: 'bend', gloves: '#C8A27A' })) + dolor(36, 132) + no(140, 22)
    + H.mesaSoldar(196, 165, 110) + H.viga(202, 115, 98, 12) + W(184, 165, TA({ pose: 'carry', gloves: '#C8A27A' })) + si(300, 22) + pl(240, 186, 'Pieza a la altura del codo', '#2E7D32', 9));
  S.al_tmert_vibra = () => svg(H.fondo.taller() + H.mesaSoldar(150, 165, 120) + H.plancha(154, 115, 110, 5) + W(136, 165, TA({ pose: 'carry', gloves: '#C8A27A', muffs: 'on' })) + esmerila(146, 110)
    + G('at2_sh', `<path d="M140,124 q-6,-4 0,-8 M134,128 q-8,-8 0,-16" stroke="#E53935" stroke-width="2" fill="none"/>`)
    + pl(70, 14, 'Herramienta en buen estado', '#2E7D32', 10) + pl(70, 40, 'Toma firme, sin apretar de más', '#2E7D32', 10) + pl(70, 66, 'Alterna y haz pausas', '#2E7D32', 10));
  S.al_tmert_levantar = () => svg(H.fondo.taller() + caja(96, 165, 30, 22) + W(80, 165, TA({ pose: 'squat', gloves: '#C8A27A' })) + si(140, 60)
    + `<rect x="190" y="26" width="130" height="8" fill="#78909C" stroke="${OL}"/>` + H.tecle(250, 34, 34) + H.eslinga(250, 95, 216, 284, 130) + H.viga(206, 140, 88, 12)
    + pl(84, 14, 'Piernas flectadas, espalda recta', '#2E7D32', 10) + pl(250, 150, 'Pesado: tecle o grúa', '#1565C0', 10) + pl(84, 182, 'Máx. 25 kg hombres · 20 kg mujeres', '#E8423A', 9));
  S.al_tmert_repet = () => svg(H.fondo.taller() + H.torno(10, 165) + W(170, 165, TA({ pose: 'carry', flip: true, gloves: false }))
    + `<rect x="210" y="115" width="80" height="5" fill="#607D8B"/><rect x="214" y="120" width="5" height="45" fill="#546E7A"/><rect x="282" y="120" width="5" height="45" fill="#546E7A"/>` + [0, 1, 2, 3, 4].map(i => `<rect x="${216 + i * 14}" y="104" width="10" height="11" rx="2" fill="#90A4AE" stroke="${OL}" stroke-width=".8"/>`).join('')
    + pl(160, 14, 'Piezas en serie: alterna tareas y pausas', '#1565C0', 10));
  S.al_tmert_pausas = () => svg(H.fondo.taller() + W(70, 165, TA({ pose: 'cc4hands' })) + W(160, 165, TA({ pose: 'c4reach' })) + W(250, 165, TA({ pose: 'twist' }))
    + pl(160, 186, 'Pausas activas: lento, sin dolor', '#2E7D32', 10) + clock(286, 40, 16));
  S.al_tmert_avisa = () => svg(H.fondo.taller() + W(110, 165, TA({ face: 'pain', pose: 'c4hold' })) + dolor(103, 128, 9) + glob(120, 36, 'Me duele la espalda', 120)
    + W(220, 165, TA({ pose: 'point', flip: true })) + pl(160, 186, 'Avisa apenas aparezca', '#2E7D32', 10));
  S.al_tmert_q = () => svg(H.fondo.taller() + H.viga(30, 165, 110, 12) + W(40, 165, TA({ pose: 'bend', gloves: '#C8A27A' })) + H.mesaSoldar(196, 165, 110) + preg(160, 80));

  SI_CONT.temas.push({
    id: 'tmert', sec: 'todos', emp: ['ali'], title: 'Pausas activas y trastornos musculoesqueléticos', thumb: 'al_tmert_pausas', mins: 15,
    learn: [
      { s: 'al_tmert_intro', t: 'Posturas que cobran con los años', x: 'Soldar <b>agachado</b> sobre una pieza en el suelo, esmerilar con los <b>brazos sobre los hombros</b>, apretar pernos con fuerza o manejar el esmeril horas seguidas carga la espalda, los hombros, los codos y las muñecas. Con el tiempo aparecen <b>trastornos musculoesqueléticos</b>: lumbago, tendinitis, dolor de hombro o túnel carpiano. El protocolo <b>TMERT</b> del Ministerio de Salud obliga a evaluar estas tareas.' },
      { s: 'al_tmert_factores', t: 'Los factores de riesgo', x: '<ul><li><b>Repetición:</b> el mismo movimiento una y otra vez, como en piezas en serie.</li><li><b>Fuerza:</b> apretar, empujar, levantar o sostener herramientas pesadas.</li><li><b>Postura forzada:</b> espalda doblada o torcida, brazos sobre los hombros, muñeca torcida.</li><li><b>Vibración:</b> esmeriles, martillos neumáticos y llaves de impacto.</li></ul>Cuando se juntan varios y no hay pausas, el riesgo sube mucho.' },
      { s: 'al_tmert_altura', t: 'Sube la pieza, no te agaches', x: '<ul><li>Pon la pieza a la <b>altura del codo</b>, sobre la mesa de trabajo o caballetes, en vez de trabajar agachado en el suelo.</li><li>Si la pieza es muy grande, gírala o muévela con el tecle o el puente grúa para trabajar en una posición cómoda.</li><li>Si debes trabajar abajo, usa un piso bajo o apoya una rodilla con rodillera, con la espalda recta.</li><li>Acércate a la pieza: no estires los brazos ni te tuerzas.</li></ul>', k: 'Pieza a la altura del codo: no trabajes agachado si se puede evitar.' },
      { s: 'al_tmert_vibra', t: 'Herramientas que vibran', x: 'La vibración del esmeril, el martillo neumático o la llave de impacto daña nervios y vasos sanguíneos de las manos. Se nota como <b>hormigueo, adormecimiento o dedos blancos</b> con el frío.<ul><li>Usa herramientas en <b>buen estado</b>, con discos bien montados y empuñaduras firmes.</li><li>Tómala firme pero <b>sin apretar de más</b> y deja que la herramienta haga el trabajo.</li><li>Alterna con otras tareas y haz pausas.</li><li>Mantén las manos abrigadas y secas.</li></ul>' },
      { s: 'al_tmert_levantar', t: 'Levantar con las piernas', x: 'Al agacharte, <b>siempre con las piernas flectadas</b> y la espalda recta, la carga pegada al cuerpo y sin girar la cintura. La Ley 20.949 fija un máximo de <b>25 kg para hombres</b> y <b>20 kg para mujeres</b>; los menores de 18 años y las embarazadas no levantan carga. Para piezas más pesadas o difíciles de tomar, usa el <b>tecle, el puente grúa o la grúa horquilla</b>, o pide ayuda.', k: 'Agáchate con las piernas flectadas. Máximo 25 kg hombres y 20 kg mujeres.' },
      { s: 'al_tmert_repet', t: 'Tareas repetitivas', x: 'Mecanizar piezas en serie, apretar y soltar mordazas, cortar o soldar lo mismo durante horas repite los mismos gestos <b>cientos de veces</b>.<ul><li><b>Alterna tareas</b> cuando se pueda.</li><li>Cambia de mano o de posición.</li><li>Usa la herramienta adecuada: una llave del tamaño correcto necesita menos fuerza.</li><li>Ten las piezas y herramientas al alcance, sin estirarte.</li></ul>' },
      { s: 'al_tmert_pausas', t: 'Pausas activas', x: 'Las <b>pausas activas</b> permiten que músculos y tendones se recuperen. Haz las del programa de tu área: gira suave el cuello, sube y baja los hombros, estira brazos, manos y muñecas, y estira la espalda. Hazlo lento, sin dolor ni rebotes, unos segundos cada ejercicio. Antes, deja la máquina detenida y la herramienta en un lugar seguro. Son parte del trabajo seguro, no tiempo perdido.', k: 'Haz tus pausas activas: tus músculos y tendones necesitan recuperarse.' },
      { s: 'al_tmert_avisa', t: 'Avisa las molestias temprano', x: 'Dolor, hormigueo, adormecimiento, pérdida de fuerza o rigidez en la espalda, los hombros, los codos, las muñecas o los dedos se <b>avisan temprano</b> a tu jefatura. Tratados a tiempo se recuperan mejor; si esperas, pueden volverse permanentes. Si la molestia es por el trabajo, la ACHS la evalúa por la Ley 16.744.' }
    ],
    quiz: [
      { s: 'al_tmert_q', v: [
        { q: 'Debes soldar una pieza chica que está en el suelo. ¿Qué haces?', o: ['La subo a la mesa o a caballetes', 'Sueldo agachado, es rápido', 'Sueldo con la espalda doblada', 'Me siento sobre la pieza'], w: 'Con la pieza a la altura del codo no fuerzas la espalda.' },
        { q: '¿A qué altura conviene trabajar una pieza?', o: ['A la altura del codo', 'A la altura de los tobillos', 'Sobre la cabeza', 'Da lo mismo la altura'], w: 'A la altura del codo la espalda va recta y los hombros relajados.' },
        { q: 'Una viga grande queda en una posición incómoda para esmerilar. ¿Qué haces?', o: ['La giro con el tecle o el puente grúa', 'Esmerilo con los brazos sobre la cabeza', 'Me cuelgo de la viga', 'Me tuerzo para alcanzarla'], w: 'Mover la pieza evita posturas forzadas.' }] },
      { s: 'al_tmert_factores', v: [
        { q: '¿Cuál de estos es un factor de riesgo de trastornos musculoesqueléticos?', o: ['Repetir el mismo gesto por horas', 'Hacer pausas activas', 'Trabajar a la altura del codo', 'Alternar tareas'], w: 'La repetición sin pausas sobrecarga músculos y tendones.' },
        { q: '¿Qué protocolo del Ministerio de Salud evalúa estas tareas?', o: ['TMERT', 'PREXOR', 'PLANESI', 'CEAL-SM'], w: 'TMERT es el protocolo de trastornos musculoesqueléticos de extremidades superiores.' },
        { q: 'Esmerilar con los brazos sobre los hombros es una postura forzada.', vf: true, w: 'Verdadero. Sobrecarga los hombros y el cuello.' }] },
      { s: 'al_tmert_vibra', v: [
        { q: '¿Qué señal indica daño por vibración en las manos?', o: ['Hormigueo y dedos adormecidos', 'Manos más fuertes', 'Uñas más largas', 'Ninguna, la vibración no daña'], w: 'La vibración daña nervios y vasos de las manos.' },
        { q: '¿Cómo tomas el esmeril angular?', o: ['Firme pero sin apretar de más', 'Lo más fuerte que pueda, siempre', 'Con una sola mano, la más hábil', 'Sin la empuñadura lateral puesta'], w: 'Apretar de más transmite más vibración a la mano y cansa.' },
        { q: '¿Qué ayuda a disminuir el efecto de la vibración?', o: ['Alternar tareas y hacer pausas', 'Trabajar toda la jornada sin parar', 'Usar discos gastados', 'Trabajar con las manos mojadas y frías'], w: 'Las pausas y el cambio de tarea reducen la exposición.' }] },
      { s: 'al_tmert_levantar', v: [
        { q: '¿Cuál es el peso máximo que puede levantar un hombre según la Ley 20.949?', o: ['25 kg', '50 kg', '40 kg', '35 kg'], w: 'La ley fija 25 kg para hombres y 20 kg para mujeres.' },
        { q: 'Debes levantar una caja de pernos desde el suelo. ¿Cómo lo haces?', o: ['Piernas flectadas, espalda recta, caja pegada', 'Doblo la espalda con las piernas bien rectas', 'La levanto girando la cintura hacia un lado', 'La tiro hacia mí con un solo brazo, rápido'], w: 'La fuerza la hacen las piernas, no la espalda.' },
        { q: 'Una pieza pesa 45 kg. ¿Qué haces?', o: ['Uso el tecle, el puente grúa o la horquilla', 'La levanto yo solo, con mucho cuidado', 'La arrastro por el piso con las manos', 'La levanto de a poco, a tirones cortos'], w: 'Supera el máximo legal: se usan medios mecánicos.' }] },
      { s: 'al_tmert_pausas', v: [
        { q: '¿Para qué sirven las pausas activas?', o: ['Para que músculos y tendones se recuperen', 'Para pasar el rato sin trabajar', 'Para cansarse más rápido en la jornada', 'Solo para conversar con los compañeros'], w: 'Son parte del trabajo seguro.' },
        { q: '¿Cómo se hacen los ejercicios de la pausa activa?', o: ['Lentos y sin dolor', 'Con rebotes fuertes', 'Lo más rápido posible', 'Con la herramienta en la mano'], w: 'Lentos, sin dolor ni rebotes.' },
        { q: 'Antes de hacer la pausa activa se deja la máquina detenida y la herramienta en un lugar seguro.', vf: true, w: 'Verdadero. Nunca se hace la pausa con una máquina en marcha.' }] },
      { s: 'al_tmert_avisa', v: [
        { q: 'Hace días sientes hormigueo en la mano al terminar de esmerilar. ¿Qué haces?', o: ['Aviso a mi jefatura', 'Espero a que se pase solo', 'Me tomo un analgésico y sigo', 'Aprieto más la herramienta'], w: 'Avisado a tiempo, se recupera mejor.' },
        { q: '¿Por qué conviene avisar temprano un dolor?', o: ['Porque si espero puede volverse permanente', 'Porque así me dan días libres de inmediato', 'Porque es una falta grave no avisarlo', 'Porque así me cambian de máquina siempre'], w: 'Las lesiones tratadas a tiempo se recuperan mejor.' },
        { q: 'Si un dolor es por el trabajo, ¿quién lo evalúa?', o: ['La ACHS, por la Ley 16.744', 'Solo mi médico particular', 'El jefe de taller', 'Nadie, es normal'], w: 'La ACHS evalúa las enfermedades por el trabajo.' }] }
    ]
  });

  // =====================================================================
  // 7) RIESGOS PSICOSOCIALES Y BIENESTAR
  // =====================================================================
  const nube = (x, y) => G('at2_sh', `<path d="M${x - 16},${y} q-4,-12 8,-14 q4,-10 16,-4 q12,-4 14,8 q8,4 0,12 z" fill="#78909C"/><path d="M${x - 8},${y - 8} l6,4 l-4,4 l8,2" stroke="#FFEB3B" stroke-width="2" fill="none"/>`);
  const pizarra = (x, y, w, h, filas) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#fff" stroke="#455A64" stroke-width="3"/>` + filas.map((f, i) => `<path d="M${x + 10},${y + 20 + i * 22} l4,4 l8,-8" stroke="#2E7D32" stroke-width="3" fill="none"/>` + T(x + 30, y + 26 + i * 22, f, 10, OL, 'start', 'normal')).join('');
  S.al_psicosocial_que = () => svg(H.fondo.taller() + W(150, 165, TA({ face: 'worried', pose: 'cc4hands' })) + nube(150, 52)
    + pl(60, 110, 'Apuro', '#C62828', 10) + pl(260, 80, 'Poca claridad', '#C62828', 10) + pl(250, 120, 'Mal trato', '#C62828', 10) + pl(60, 70, 'Falta de apoyo', '#C62828', 10));
  S.al_psicosocial_plazos = () => svg(H.fondo.taller() + `<g transform="translate(30,40)">${doc(0, 62, 'URGENTE')}</g>` + clock(130, 60, 22)
    + caballete(170, 120) + H.viga(176, 135, 108, 12) + H.viga(180, 123, 100, 12) + W(110, 165, TA({ pose: 'walk', face: 'worried' })) + sudor(122, 84)
    + pl(220, 14, 'Apuro = más accidentes', '#C62828'));
  S.al_psicosocial_conflicto = () => svg(H.fondo.taller() + div() + W(40, 165, TA({ pose: 'c4yell' })) + W(110, 165, TA({ pose: 'c4yell', flip: true })) + G('at2_sh', T(76, 50, '#$%!', 16, '#C62828')) + no(140, 22)
    + W(204, 165, TA({ pose: 'cc4calm' })) + W(270, 165, TA({ pose: 'cc4calm', flip: true })) + glob(196, 34, 'Conversemos', 80) + si(300, 22));
  S.al_psicosocial_ceal = () => svg(H.fondo.oficina() + `<g transform="translate(60,40) scale(1.6)">${doc(0, 62, 'CEAL-SM')}</g>` + candado(200, 130, 1.4)
    + pl(240, 20, 'Anónimo y confidencial', '#2E7D32'));
  S.al_psicosocial_responder = () => svg(H.fondo.oficina() + `<rect x="120" y="116" width="110" height="6" fill="#6D4C41"/><rect x="126" y="122" width="5" height="43" fill="#6D4C41"/><rect x="220" y="122" width="5" height="43" fill="#6D4C41"/>`
    + `<rect x="150" y="106" width="30" height="10" fill="#fff" stroke="#90A4AE"/>` + silla(118) + W(118, 165, { area: 'oficina', pose: 'cc4sit', shirt: '#22406B', pants: '#2B3A4A' }) + glob(150, 40, 'Respondo con sinceridad', 140));
  S.al_psicosocial_medidas = () => svg(H.fondo.oficina() + pizarra(20, 24, 190, 112, ['Organizar plazos y turnos', 'Instrucciones claras', 'Más apoyo de jefaturas', 'Mejor comunicación']) + W(256, 165, { area: 'oficina', pose: 'point', flip: true }));
  S.al_psicosocial_equipo = () => svg(H.fondo.taller() + W(100, 165, TA({ pose: 'carry', gloves: '#C8A27A' })) + W(210, 165, TA({ pose: 'carry', flip: true, gloves: '#C8A27A' })) + H.viga(110, 117, 90, 12)
    + pl(160, 14, 'Un buen equipo se ayuda', '#2E7D32'));
  S.al_psicosocial_ayuda = () => svg(H.fondo.oficina() + W(110, 165, TA({ pose: 'cc4calm' })) + W(210, 165, { area: 'oficina', pose: 'cc4calm', flip: true })
    + pl(160, 14, 'Tu jefatura, RR.HH. o el Comité Paritario', '#1565C0', 10) + pl(160, 40, 'ACHS: apoyo psicológico', '#2E7D32', 10));

  SI_CONT.temas.push({
    id: 'psicosocial', sec: 'todos', emp: ['ali'], title: 'Riesgos psicosociales y bienestar en el trabajo', thumb: 'al_psicosocial_plazos', mins: 12,
    learn: [
      { s: 'al_psicosocial_que', t: '¿Qué son los riesgos psicosociales?', x: 'Son condiciones de la <b>organización del trabajo</b> que pueden dañar tu salud mental y física: mucha carga o apuro, instrucciones poco claras, mal trato, falta de apoyo, inseguridad. Pueden causar <b>estrés, ansiedad, depresión, problemas para dormir y dolores</b>, y también accidentes, porque bajan la atención.' },
      { s: 'al_psicosocial_plazos', t: 'Plazos de entrega y apuro', x: 'En una maestranza hay trabajos <b>urgentes</b>: una pieza que el cliente necesita para volver a operar, una entrega que se adelanta. El apuro lleva a saltarse pasos, sacarse el EPP o usar una máquina "solo un momento" sin protección. <b>Ningún plazo vale un accidente.</b> Si la carga te supera o no alcanzas, <b>conversa con tu jefatura</b> para reorganizar.', k: 'Ningún plazo de entrega justifica trabajar sin seguridad.' },
      { s: 'al_psicosocial_conflicto', t: 'Conflictos en el equipo', x: 'Las diferencias se dan en todo trabajo. Lo que daña es cómo se manejan.<ul><li>Conversa los problemas <b>a tiempo, en privado y con respeto</b>.</li><li>No grites, no insultes ni amenaces.</li><li>Si no se resuelve, pide apoyo a tu jefatura.</li><li>Las bromas que humillan no son bromas.</li></ul>' },
      { s: 'al_psicosocial_ceal', t: 'El cuestionario CEAL-SM', x: 'El protocolo de vigilancia de riesgos psicosociales obliga a evaluarlos con el <b>cuestionario CEAL-SM</b> de SUSESO. Es <b>anónimo y confidencial</b>: nadie sabe qué respondió cada persona. Mide, por ejemplo, la carga de trabajo, el control sobre las tareas, el liderazgo, el apoyo entre compañeros, el reconocimiento, el equilibrio entre trabajo y vida personal, y la violencia y el acoso.' },
      { s: 'al_psicosocial_responder', t: 'Responde con sinceridad', x: 'Si te toca responder, hazlo de forma <b>honesta</b>, pensando en tu trabajo real. Si contestas que todo está bien solo para cumplir, los problemas no aparecen en los resultados y no se corrigen. Lee cada pregunta con calma; si no la entiendes, pide que te la expliquen. Un comité con representantes de la empresa y de los trabajadores organiza la aplicación.' },
      { s: 'al_psicosocial_medidas', t: 'De los resultados salen medidas', x: 'Con los resultados, el comité define <b>medidas concretas</b> para los grupos con más riesgo, por ejemplo: mejor planificación de plazos y turnos, instrucciones más claras, apoyo y capacitación de las jefaturas, mejor comunicación entre taller, oficina y clientes. Las medidas se informan a los trabajadores y se revisa que se cumplan.' },
      { s: 'al_psicosocial_equipo', t: 'Un buen equipo protege', x: 'Un buen ambiente se construye entre todos:<ul><li>Jefaturas que dan instrucciones claras, escuchan y reconocen el trabajo bien hecho.</li><li>Compañeros que se ayudan, por ejemplo con una pieza pesada o un trabajo atrasado.</li><li>Problemas que se conversan a tiempo.</li></ul>Enseñarle bien a un compañero nuevo también es prevención.' },
      { s: 'al_psicosocial_ayuda', t: 'Dónde pedir apoyo', x: 'Si sientes angustia, no duermes bien, estás irritable o todo te supera, <b>no lo guardes</b>. Puedes conversar con tu jefatura, con Recursos Humanos o con el Comité Paritario. Si el problema se relaciona con el trabajo, la <b>ACHS</b> puede evaluarte y darte atención psicológica. Pedir ayuda es una forma de autocuidado.', k: 'Si el trabajo te está afectando, pide ayuda: no te lo guardes.' }
    ],
    quiz: [
      { s: 'al_psicosocial_que', v: [
        { q: '¿Qué son los riesgos psicosociales?', o: ['Condiciones del trabajo que dañan la salud', 'Solo los problemas que traigo de la casa', 'Las enfermedades de la piel por el sol', 'Los riesgos de atrapamiento de las máquinas'], w: 'Vienen de cómo se organiza el trabajo: carga, apuro, trato, apoyo.' },
        { q: '¿Por qué el estrés puede causar accidentes?', o: ['Porque baja la atención', 'Porque da más fuerza', 'Porque mejora los reflejos', 'No tiene relación'], w: 'Con estrés y cansancio te concentras menos.' },
        { q: 'El estrés del trabajo puede afectar el sueño y causar dolores.', vf: true, w: 'Verdadero. Afecta la salud mental y física.' }] },
      { s: 'al_psicosocial_plazos', v: [
        { q: 'Hay una entrega urgente y te piden usar el torno sin la protección "por esta vez". ¿Qué haces?', o: ['No lo hago y lo converso con mi jefatura', 'Lo hago igual para cumplir con el plazo', 'Lo hago sin decirle nada a nadie', 'Le pido a un compañero que lo haga por mí'], w: 'Ningún plazo justifica trabajar sin seguridad.' },
        { q: 'La carga de trabajo te supera hace semanas. ¿Qué haces?', o: ['Lo converso con mi jefatura', 'Me lo guardo y sigo', 'Trabajo sin pausas para alcanzar', 'Dejo trabajos a medias sin avisar'], w: 'Conversarlo permite reorganizar antes de que te afecte.' },
        { q: 'Trabajar apurado aumenta el riesgo de accidentes.', vf: true, w: 'Verdadero. El apuro lleva a saltarse pasos y medidas de seguridad.' }] },
      { s: 'al_psicosocial_conflicto', v: [
        { q: 'Tienes un problema con un compañero. ¿Cómo lo manejas?', o: ['Lo converso a tiempo y con respeto', 'Le grito delante de todos en el taller', 'Dejo de hablarle para siempre', 'Le hago bromas pesadas para que aprenda'], w: 'Los problemas se conversan a tiempo y con respeto.' },
        { q: 'No logras resolver un conflicto conversando. ¿Qué haces?', o: ['Pido apoyo a mi jefatura', 'Lo resuelvo a golpes', 'Me voy sin avisar', 'Hablo mal de él con todos'], w: 'La jefatura puede ayudar a resolverlo.' },
        { q: 'Las bromas que humillan a un compañero son parte normal del taller.', vf: false, w: 'Falso. Las bromas que humillan dañan y pueden ser acoso.' }] },
      { s: 'al_psicosocial_ceal', v: [
        { q: '¿Cómo es el cuestionario CEAL-SM?', o: ['Anónimo y confidencial', 'Con nombre y RUT en cada hoja', 'Lo revisa tu jefatura respuesta por respuesta', 'Se responde en voz alta'], w: 'Nadie sabe qué respondió cada persona.' },
        { q: '¿Qué mide el CEAL-SM?', o: ['Riesgos psicosociales del trabajo', 'La audición de cada trabajador', 'La fuerza física para levantar carga', 'La velocidad y calidad al soldar'], w: 'Mide carga, liderazgo, apoyo, reconocimiento, violencia y acoso, entre otros.' },
        { q: 'Respondiste el CEAL-SM. ¿Puede tu jefatura saber lo que respondiste tú?', o: ['No, es anónimo', 'Sí, siempre', 'Sí, si lo pide', 'Solo si fue malo'], w: 'Es anónimo y confidencial.' }] },
      { s: 'al_psicosocial_responder', v: [
        { q: '¿Cómo debes responder el CEAL-SM?', o: ['Con sinceridad, pensando en mi trabajo real', 'Todo bien, para cumplir rápido y terminar', 'Igual a como respondan mis compañeros', 'Al azar, porque nadie lo va a leer'], w: 'Si no se responde con sinceridad, los problemas no se ven ni se corrigen.' },
        { q: 'No entiendes una pregunta del cuestionario. ¿Qué haces?', o: ['Pido que me la expliquen', 'Marco cualquier respuesta', 'La dejo en blanco sin decir nada', 'Copio la respuesta del lado'], w: 'Puedes pedir que te la expliquen.' },
        { q: 'Con los resultados, el comité define medidas y se informan a los trabajadores.', vf: true, w: 'Verdadero. El objetivo es mejorar las condiciones de trabajo.' }] },
      { s: 'al_psicosocial_ayuda', v: [
        { q: 'Hace semanas duermes mal y estás irritable por el trabajo. ¿Qué haces?', o: ['Lo converso con mi jefatura o RR.HH.', 'Me lo guardo para no molestar a nadie', 'Trabajo más horas para no pensar en eso', 'Dejo de hablar con todos en el taller'], w: 'Pedir ayuda es autocuidado.' },
        { q: 'Si el problema es por el trabajo, ¿quién puede darte atención psicológica?', o: ['La ACHS', 'El cliente', 'Nadie', 'El proveedor de acero'], w: 'La ACHS evalúa y atiende por la Ley 16.744.' },
        { q: 'Notas que un compañero está decaído y distraído. ¿Qué haces?', o: ['Le pregunto cómo está y lo animo a pedir apoyo', 'Me burlo de él para que reaccione y despierte', 'Lo ignoro, porque no es asunto mío', 'Lo comento con todos para que lo sepan'], w: 'Un buen equipo se preocupa de los demás.' }] }
    ]
  });

  // =====================================================================
  // 8) LEY KARIN: TRABAJO LIBRE DE ACOSO Y VIOLENCIA
  // =====================================================================
  const balanza = (x, y) => `<path d="M${x},${y} v-60 M${x - 34},${y - 52} h68" stroke="#455A64" stroke-width="4"/><rect x="${x - 18}" y="${y - 4}" width="36" height="6" fill="#455A64"/>`
    + `<path d="M${x - 34},${y - 52} l-12,24 h24z M${x + 34},${y - 52} l-12,24 h24z" fill="#FFC20E" stroke="#455A64" stroke-width="2"/><circle cx="${x}" cy="${y - 62}" r="5" fill="#455A64"/>`;
  const sobre = (x, y) => `<rect x="${x}" y="${y}" width="50" height="34" rx="3" fill="#fff" stroke="#1565C0" stroke-width="2.5"/><path d="M${x},${y} l25,20 l25,-20" stroke="#1565C0" stroke-width="2.5" fill="none"/>`;
  S.al_karin_ley = () => svg(H.fondo.oficina() + `<g transform="translate(40,30) scale(1.5)">${doc(0, 62, 'Ley 21.643')}</g>` + balanza(200, 140) + pl(240, 170, 'Prevenir, investigar, sancionar', '#1565C0', 9));
  S.al_karin_acoso = () => svg(H.fondo.taller() + W(110, 165, TA({ pose: 'c4yell' })) + G('at2_sh', glob(60, 30, '¡#$%! ¡Inútil!', 90, '#C62828')) + W(200, 165, TA({ flip: true, face: 'worried' })) + no(296, 24)
    + pl(160, 186, 'Gritos, insultos, burlas, aislar', '#C62828', 10));
  S.al_karin_sexual = () => svg(H.fondo.taller() + W(120, 165, TA({ pose: 'point' })) + glob(70, 34, '¿Y si salimos tú y yo?', 120) + W(200, 165, TA({ flip: true, hair: true, face: 'worried', pose: 'stop' })) + no(296, 24)
    + pl(160, 186, 'Sin consentimiento es acoso', '#C62828', 10));
  S.al_karin_terceros = () => svg(H.fondo.faena() + W(100, 178, { area: 'visita', pose: 'c4yell', vest: false, helmet: '#1565C0' }) + G('at2_sh', glob(40, 30, '¡Apúrense, flojos!', 110, '#C62828'))
    + W(200, 178, FA({ flip: true, face: 'worried' })) + pl(220, 186, 'Cliente en faena', '#C62828', 10));
  S.al_karin_momento = () => svg(H.fondo.taller() + W(70, 165, TA({ pose: 'c4yell' })) + W(170, 165, TA({ pose: 'walk' })) + `<path d="M196,120 h30 m-8,-8 l8,8 l-8,8" stroke="#2E7D32" stroke-width="3" fill="none"/>`
    + pl(240, 20, '1. Aléjate', '#2E7D32', 10) + pl(240, 46, '2. Avisa de inmediato', '#2E7D32', 10) + pl(240, 72, '3. Anota qué pasó', '#2E7D32', 10));
  S.al_karin_denuncia = () => svg(H.fondo.oficina() + `<g transform="translate(20,40) scale(1.2)">${doc(0, 62, 'Denuncia')}</g>` + sobre(100, 60)
    + W(200, 165, { area: 'oficina', pose: 'cc4calm' }) + W(260, 165, TA({ pose: 'cc4calm', flip: true }))
    + pl(56, 130, 'Por escrito', '#1565C0', 9) + pl(126, 104, 'Correo', '#1565C0', 9) + pl(230, 14, 'Presencial', '#1565C0', 9) + pl(110, 160, 'O en la Inspección del Trabajo', '#455A64', 9));
  S.al_karin_reserva = () => svg(H.fondo.oficina() + candado(100, 130, 2) + `<path d="M210,40 l40,14 v34 q0,30 -40,44 q-40,-14 -40,-44 v-34z" fill="#2E7D32" stroke="#1B5E20" stroke-width="3"/><path d="M194,88 l12,12 l22,-24" stroke="#fff" stroke-width="6" fill="none"/>`
    + pl(100, 160, 'Reserva', '#1565C0') + pl(210, 160, 'Sin represalias', '#2E7D32'));
  S.al_karin_buentrato = () => svg(H.fondo.taller() + W(120, 165, TA({ pose: 'cc3give' })) + W(196, 165, TA({ pose: 'cc3give', flip: true, hair: true })) + G('at2_p', `<circle cx="158" cy="122" r="8" fill="#FFC20E" opacity=".5"/>`)
    + pl(160, 14, 'Respeto con todos', '#2E7D32'));
  S.al_karin_q = () => svg(H.fondo.taller() + W(100, 165, TA({ pose: 'c4yell' })) + W(190, 165, TA({ flip: true, face: 'worried' })) + W(270, 165, TA({ flip: true })) + preg(270, 50));

  SI_CONT.temas.push({
    id: 'karin', sec: 'todos', emp: ['ali'], title: 'Ley Karin: trabajo libre de acoso y violencia', thumb: 'al_karin_ley', mins: 15,
    learn: [
      { s: 'al_karin_ley', t: 'Ley Karin (Ley 21.643)', x: 'Desde agosto de 2024, la Ley 21.643 obliga a las empresas a <b>prevenir, investigar y sancionar</b> el acoso laboral, el acoso sexual y la violencia en el trabajo. Maestranza ALI tiene una <b>política de buen trato</b>, un <b>protocolo de prevención</b> y un procedimiento de denuncia que se te informan. El objetivo es un trabajo con respeto para todos.' },
      { s: 'al_karin_acoso', t: 'Acoso laboral', x: 'Es toda agresión u hostigamiento, <b>aunque ocurra una sola vez</b>, que menoscabe, maltrate o humille a una persona, o que perjudique su situación en el trabajo. Puede venir de una jefatura, de un compañero o de un subordinado. Ejemplos: gritos e insultos, burlas, apodos ofensivos, aislar a alguien, amenazas, dar tareas imposibles o inútiles para humillar.' },
      { s: 'al_karin_sexual', t: 'Acoso sexual', x: 'Es cualquier <b>requerimiento de carácter sexual no consentido</b> que amenace o perjudique a la persona en su trabajo. Ejemplos: comentarios o bromas sexuales, insinuaciones, mensajes o fotos, tocaciones, miradas insistentes, presionar para salir, imágenes ofensivas en el taller. Si la otra persona no lo consiente, es acoso, aunque se diga que era en broma.', k: 'Si la otra persona no lo consiente, es acoso, aunque se diga que era en broma.' },
      { s: 'al_karin_terceros', t: 'Violencia de terceros', x: 'Es la violencia que ejercen <b>personas externas</b> contra los trabajadores: clientes, personal de las faenas donde trabajamos, proveedores, choferes o visitas. Insultos, amenazas, agresiones o acoso <b>no son parte del trabajo</b>, aunque vengan de un cliente: se avisan, se pueden denunciar, y la empresa debe tomar medidas para proteger a su personal.' },
      { s: 'al_karin_momento', t: 'Si te pasa en el momento', x: '<ul><li><b>Aléjate</b> de quien te agrede y no respondas con violencia.</li><li><b>Avisa de inmediato</b> a tu jefatura; en una faena, también al encargado del cliente.</li><li><b>Anota</b> qué pasó, cuándo, dónde y quiénes vieron. Guarda mensajes o fotos si los hay.</li><li>Si hay una agresión física o una amenaza grave, busca ayuda y llama a Carabineros (133).</li></ul>' },
      { s: 'al_karin_denuncia', t: 'Cómo denunciar', x: 'Puedes denunciar <b>por escrito</b>, por <b>correo electrónico</b> o <b>en forma presencial</b> (se deja un acta firmada), a través del <b>canal de denuncia de la empresa</b>, con tu jefatura o con Recursos Humanos. También puedes denunciar directamente en la <b>Inspección del Trabajo</b>. Cuenta qué pasó, cuándo, dónde, quiénes participaron y quiénes vieron.' },
      { s: 'al_karin_reserva', t: 'Reserva, investigación y resguardo', x: 'La denuncia se trata con <b>reserva</b>. La empresa la investiga, o la deriva a la Inspección del Trabajo, dentro de los plazos de la ley, escuchando a ambas partes. Mientras tanto debe <b>proteger a la persona afectada</b>, por ejemplo separando espacios o cambiando turnos, y puede derivarla a atención psicológica de la ACHS. <b>No se puede castigar</b> a quien denuncia de buena fe ni a los testigos.', k: 'Denunciar es un derecho: la denuncia es reservada y no tiene represalias.' },
      { s: 'al_karin_buentrato', t: 'Buen trato: tu parte', x: '<ul><li>Trata a todos con respeto: jefaturas, compañeros, clientes y proveedores.</li><li>Nada de bromas sexuales, apodos ofensivos, burlas ni "bromas de taller" que humillan.</li><li>Si eres testigo, no te rías ni lo celebres: apoya a la persona y denuncia o anímala a denunciar.</li></ul>Un taller donde el equipo se respeta trabaja mejor y con menos accidentes.', k: 'El acoso y la violencia no se toleran: si lo vives o lo ves, denuncia.' }
    ],
    quiz: [
      { s: 'al_karin_ley', v: [
        { q: '¿Qué obliga a las empresas la Ley Karin?', o: ['A prevenir, investigar y sancionar', 'Solo a pegar un afiche en el comedor', 'A despedir a la persona que denuncie', 'Solo a pagar una multa si hay un caso'], w: 'La Ley 21.643 obliga a prevenir, investigar y sancionar.' },
        { q: '¿Qué número tiene la Ley Karin?', o: ['21.643', '16.744', '20.949', '20.096'], w: 'La Ley Karin es la Ley 21.643.' },
        { q: 'La Ley Karin cubre el acoso laboral, el acoso sexual y la violencia en el trabajo.', vf: true, w: 'Verdadero. Cubre las tres conductas.' }] },
      { s: 'al_karin_q', v: [
        { q: 'Un compañero insulta y se burla a diario de otro delante de todos. ¿Qué es?', o: ['Acoso laboral', 'Una broma normal del taller', 'Una forma de motivar', 'Un problema solo de ellos'], w: 'Los insultos y burlas que humillan son acoso laboral.' },
        { q: '¿El acoso laboral tiene que repetirse muchas veces para serlo?', o: ['No, puede ser una sola vez', 'Sí, al menos diez veces', 'Sí, durante un año', 'Solo si hay golpes'], w: 'La ley considera que puede ocurrir una sola vez.' },
        { q: 'Ves que humillan a un compañero. ¿Qué haces?', o: ['Lo apoyo y denuncio o lo animo a denunciar', 'Me río con los demás para no quedar mal', 'Lo grabo con el celular para compartirlo', 'Miro para otro lado, no es asunto mío'], w: 'El testigo también puede apoyar y denunciar.' }] },
      { s: 'al_karin_sexual', v: [
        { q: 'Un compañero insiste en hacer comentarios sexuales a una colega que no los quiere. ¿Qué es?', o: ['Acoso sexual', 'Un piropo inofensivo', 'Una broma de confianza', 'Una conversación normal'], w: 'Si no hay consentimiento, es acoso, aunque se diga que es broma.' },
        { q: '¿Cuál de estas conductas puede ser acoso sexual?', o: ['Enviar fotos o mensajes sexuales no deseados', 'Saludar a todos con respeto al llegar', 'Pedirle prestada una herramienta', 'Darle una instrucción clara de trabajo'], w: 'Los mensajes o fotos sexuales no deseados son acoso.' },
        { q: 'Si el que hace el comentario dice que era en broma, no es acoso.', vf: false, w: 'Falso. Lo que importa es que la otra persona no lo consiente.' }] },
      { s: 'al_karin_terceros', v: [
        { q: 'En la faena de un cliente, su supervisor insulta a tu equipo. ¿Qué haces?', o: ['Me alejo, aviso a mi jefatura y anoto', 'Le respondo con insultos más fuertes', 'Lo aguanto en silencio, porque es el cliente', 'Lo empujo para que se calle y se vaya'], w: 'La violencia de terceros no es parte del trabajo: se avisa y se puede denunciar.' },
        { q: '¿Quiénes pueden ejercer violencia de terceros?', o: ['Clientes, proveedores, choferes o visitas', 'Solo la jefatura directa de la empresa', 'Solo los compañeros de mi misma sección', 'Nadie externo, solo los de la empresa'], w: 'Son personas externas a la empresa.' },
        { q: 'Los insultos de un cliente hay que aguantarlos porque son parte del trabajo.', vf: false, w: 'Falso. No son parte del trabajo: se avisan y la empresa debe proteger a su personal.' }] },
      { s: 'al_karin_denuncia', v: [
        { q: '¿Dónde puedes denunciar un acoso?', o: ['En la empresa o en la Inspección del Trabajo', 'Solo publicándolo en mis redes sociales', 'Solo con el cliente de la faena', 'En ningún lado, porque no sirve'], w: 'Puedes hacerlo en la empresa o directamente en la Inspección del Trabajo.' },
        { q: '¿Cómo se puede presentar una denuncia?', o: ['Por escrito, por correo o en forma presencial', 'Solo a gritos, en medio del taller', 'Solo por WhatsApp a un compañero de confianza', 'Solo a través de un abogado particular'], w: 'Si es presencial, se deja un acta firmada.' },
        { q: '¿Qué datos ayudan en una denuncia?', o: ['Qué pasó, cuándo, dónde y quiénes vieron', 'Solo mi nombre y mi número de RUT', 'Mi talla de ropa y de zapatos de seguridad', 'Nada, basta con decir que me pasó algo'], w: 'Los detalles permiten investigar bien.' }] },
      { s: 'al_karin_reserva', v: [
        { q: '¿Qué pasa con quien denuncia de buena fe?', o: ['No puede ser castigado', 'Lo cambian de empresa', 'Le descuentan el sueldo', 'Pierde sus vacaciones'], w: 'La ley prohíbe las represalias contra quien denuncia y contra los testigos.' },
        { q: 'Mientras se investiga una denuncia, ¿qué debe hacer la empresa?', o: ['Proteger a la persona afectada', 'Contarle a todos el caso', 'Esperar sin hacer nada', 'Despedir a la persona que denunció'], w: 'Debe tomar medidas de resguardo, como separar espacios o cambiar turnos.' },
        { q: 'La denuncia se trata con reserva.', vf: true, w: 'Verdadero. Se protege la información de las personas involucradas.' }] }
    ]
  });

  // =====================================================================
  // 9) TRÁNSITO SEGURO: TRAYECTO, PATIO Y VEHÍCULOS
  // =====================================================================
  const K = (x, y, k, s) => `<g transform="translate(${x},${y}) scale(${k})">${s}</g>`;
  // camioneta (cm): 500 x 180, color ALI
  const camioneta = (luces = false) => `<path d="M0,-40 v-60 q0,-10 10,-10 h170 l60,-60 h120 q14,0 18,14 l20,56 q90,4 92,24 v36 z" fill="${H.ALI1}" stroke="${OL}" stroke-width="4"/><path d="M250,-160 h104 l18,50 h-152z" fill="#B3E5FC" stroke="${OL}" stroke-width="3"/>`
    + `<rect x="0" y="-104" width="200" height="8" fill="${H.ALI2}"/>` + `<rect x="474" y="-84" width="16" height="16" rx="3" fill="#FFF59D"/>` + (luces ? G('at2_bl', `<path d="M492,-76 l60,-16 v34 z" fill="#FFF59D" opacity=".7"/>`) : '')
    + [100, 400].map(a => `<circle cx="${a}" cy="-38" r="38" fill="#263238"/><circle cx="${a}" cy="-38" r="16" fill="#B0BEC5"/>`).join('');
  const senal = (x, y, n, r = 18) => `<rect x="${x - 2}" y="${y}" width="4" height="${165 - y}" fill="#78909C"/><circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#D32F2F" stroke-width="${r * .22}"/>` + T(x, y + r * .35, n, r * .8, OL);
  const casa = (x, y) => `<rect x="${x}" y="${y - 40}" width="50" height="40" fill="#FFE0B2" stroke="#8D6E63" stroke-width="2"/><path d="M${x - 6},${y - 38} l31,-24 l31,24z" fill="#C62828"/><rect x="${x + 18}" y="${y - 22}" width="14" height="22" fill="#8D6E63"/>`;
  const galpon = (x, y) => `<path d="M${x},${y} v-44 l40,-14 l40,14 v44z" fill="#B0BEC5" stroke="#78909C" stroke-width="2"/><rect x="${x}" y="${y - 40}" width="80" height="9" fill="${H.ALI1}"/>` + T(x + 40, y - 33, 'ALI', 8, '#fff') + `<rect x="${x + 26}" y="${y - 26}" width="28" height="26" fill="#546E7A"/>`;
  S.al_trayecto_ruta = () => svg(H.fondo.liso('#DCEDC8') + casa(20, 150) + galpon(226, 150) + `<path d="M74,140 C130,180 190,180 228,140" stroke="#2E7D32" stroke-width="6" fill="none" stroke-linecap="round"/>`
    + `<path d="M140,166 Q160,90 200,70" stroke="#C62828" stroke-width="4" fill="none" stroke-dasharray="8 6"/><rect x="196" y="40" width="40" height="30" fill="#FFCC80" stroke="#8D6E63"/>` + no(256, 52, 12)
    + pl(150, 186, 'Trayecto directo casa - trabajo', '#2E7D32', 10) + pl(110, 14, 'Desvíos por asuntos personales', '#C62828', 9));
  const calle = () => H.fondo.liso('#BBDEFB') + `<rect y="120" width="320" height="30" fill="#E0E0E0"/><rect y="150" width="320" height="50" fill="#616161"/>` + [0, 1, 2, 3, 4, 5].map(i => `<rect x="${10 + i * 56}" y="174" width="30" height="4" fill="#fff"/>`).join('') + `<rect y="148" width="320" height="3" fill="#9E9E9E"/>`;
  S.al_trayecto_peaton = () => svg(calle() + div() + W(80, 148, TA({ pose: 'cc3phone', face: 'ok' })) + celu(96, 92, 1.2) + `<path d="M76,74 q-8,10 -4,26" stroke="#FAFAFA" stroke-width="1.6" fill="none"/>` + no(140, 22) + pl(80, 186, 'Celular y audífonos', '#C62828', 9)
    + W(240, 148, TA({ pose: 'walk' })) + si(300, 22) + pl(240, 186, 'Atento al entorno', '#2E7D32', 9));
  S.al_trayecto_interior = () => svg(H.fondo.patio() + K(30, 182, .36, camioneta(true)) + senal(250, 100, '5') + T(250, 132, 'km/h', 10, OL)
    + W(296, 175, TA({ flip: true })) + pl(110, 14, 'Máx. 5 km/h y luces encendidas', '#E8423A', 10));
  S.al_trayecto_estac = () => svg(H.fondo.patio() + `<path d="M40,190 h200" stroke="#fff" stroke-width="3"/><path d="M40,160 v30 M240,160 v30" stroke="#fff" stroke-width="3"/>` + K(50, 186, .36, camioneta())
    + `<path d="M250,176 h50 m-10,-8 l10,8 l-10,8" stroke="#2E7D32" stroke-width="4" fill="none"/>` + T(274, 196, 'SALIDA', 9, '#2E7D32')
    + `<circle cx="280" cy="40" r="20" fill="#C62828"/>` + T(280, 46, '(P)', 13, '#fff') + pl(130, 14, 'En posición de salida', '#2E7D32', 10) + pl(230, 76, 'Freno de mano', '#C62828', 10));
  S.al_trayecto_retro = () => svg(H.fondo.patio() + W(290, 162, TA({ pose: 'stop', vest: true, flip: true, s: .8 })) + `<g transform="translate(230,0) scale(-1,1)">${K(0, 182, .36, camioneta())}</g>` + `<path d="M234,112 h30 m-10,-8 l10,8 l-10,8" stroke="#E65100" stroke-width="4" fill="none" class="at2_bl"/>`
    + G('at2_bl', T(250, 100, 'piii', 11, '#E65100')) + linea(98, 120, 262, 100, '#2E7D32') + pl(80, 14, 'Retroceso con señalero', '#2E7D32', 10));
  S.al_trayecto_horquilla = () => svg(H.fondo.taller() + H.horquilla(150, 165, { carga: H.palletPiezas(223, 151) }) + W(60, 165, TA({ pose: 'stop' }))
    + `<path d="M70,90 q40,-20 86,4" stroke="#2E7D32" stroke-width="2" stroke-dasharray="4 3" fill="none"/>` + pl(110, 14, 'Contacto visual antes de cruzar', '#2E7D32', 10));
  S.al_trayecto_ruta90 = () => svg(H.fondo.liso('#BBDEFB') + `<rect y="110" width="320" height="16" fill="#A5D6A7"/><rect y="126" width="320" height="74" fill="#616161"/>` + [0, 1, 2, 3, 4, 5].map(i => `<rect x="${10 + i * 56}" y="160" width="30" height="4" fill="#fff"/>`).join('')
    + K(6, 156, .3, camioneta()) + K(196, 156, .3, camioneta()) + `<path d="M160,140 h30 M160,140 l6,-5 M160,140 l6,5 M190,140 l-6,-5 M190,140 l-6,5" stroke="#FFC20E" stroke-width="3"/>` + T(176, 194, 'Distancia', 10, '#fff')
    + senal(290, 40, '90', 20).replace(/height="\d+(\.\d+)?" fill="#78909C"/, 'height="70" fill="#78909C"') + pl(120, 14, 'Conduce a la defensiva', '#1565C0', 10));
  S.al_trayecto_accidente = () => svg(H.fondo.liso('#EEF2F5') + W(90, 165, TA({ pose: 'cc4phoneup', face: 'worried' })) + H.fono(130, 40) + `<g transform="translate(200,130)">${doc(0, 0, 'Constancia')}</g>`
    + pl(160, 186, 'ACHS 1404, aviso y pruebas', '#2E7D32', 10));
  S.al_trayecto_q = () => svg(H.fondo.patio() + `<g transform="translate(230,0) scale(-1,1)">${K(0, 182, .36, camioneta())}</g>` + `<path d="M234,112 h30 m-10,-8 l10,8 l-10,8" stroke="#E65100" stroke-width="4" fill="none" class="at2_bl"/>` + W(290, 175, TA({ face: 'worried', flip: true })) + preg(270, 60));

  SI_CONT.temas.push({
    id: 'trayecto', sec: 'todos', emp: ['ali'], title: 'Tránsito seguro: trayecto, patio y vehículos', thumb: 'al_trayecto_horquilla', mins: 15,
    learn: [
      { s: 'al_trayecto_ruta', t: 'El trayecto directo', x: 'El accidente en el <b>trayecto directo</b> entre tu casa y la empresa, de ida o de vuelta, está cubierto por la Ley 16.744. Si te <b>desvías por asuntos personales</b> (compras, trámites, visitas), ese tramo deja de ser trayecto. Sal con tiempo: el apuro por llegar es una causa frecuente de accidentes.' },
      { s: 'al_trayecto_peaton', t: 'A pie, en bicicleta o en micro', x: '<ul><li><b>Sin celular ni audífonos</b>: mira y escucha el tránsito.</li><li>Cruza por pasos peatonales y con luz verde; nunca entre vehículos estacionados.</li><li>En bicicleta: casco, luces, chaleco reflectante y por la derecha.</li><li>En micro: sube y baja con el vehículo detenido, y no cruces por delante ni por detrás de él.</li></ul>' },
      { s: 'al_trayecto_interior', t: 'Dentro de Maestranza ALI', x: '<ul><li>Velocidad máxima <b>5 km/h</b>, a paso de persona.</li><li>Ingresa con las <b>luces encendidas</b>.</li><li>En las intersecciones y donde hay poca visibilidad, detente y <b>toca la bocina</b>.</li><li>Sin celular al volante, ni siquiera dentro del recinto.</li><li>Los peatones caminan por las vías peatonales demarcadas.</li></ul>', k: 'Dentro de la empresa: máximo 5 km/h y luces encendidas.' },
      { s: 'al_trayecto_estac', t: 'Estacionar bien', x: '<ul><li>Estaciona en <b>posición de salida</b>, de frente hacia la salida: en una emergencia sales sin retroceder.</li><li>Pon el <b>freno de mano</b> y apaga el motor.</li><li>Estaciona solo en lugares autorizados, sin tapar portones, vías peatonales, extintores, tableros ni la zona de maniobras de la grúa horquilla o de los camiones.</li></ul>' },
      { s: 'al_trayecto_retro', t: 'Retroceder con señalero', x: 'Al retroceder, el conductor no ve lo que tiene detrás. Por eso, en la empresa <b>siempre se retrocede con la indicación de un señalero</b> apto, que se ubica donde el conductor lo vea y lejos de la trayectoria del vehículo. Si pierdes de vista al señalero, <b>detente</b>. Como peatón, <b>nunca pases por detrás</b> de un vehículo que retrocede.', k: 'Siempre retrocede con señalero. Nunca pases por detrás de un vehículo que retrocede.' },
      { s: 'al_trayecto_horquilla', t: 'Peatones, grúa horquilla y camiones', x: '<ul><li>Camina por las <b>vías peatonales</b> y cruza en los lugares definidos.</li><li>Antes de cruzar, <b>haz contacto visual</b> con el operador y espera su señal.</li><li>Mantén distancia de la grúa horquilla con baliza encendida y nunca pases bajo una carga levantada.</li><li>No pidas al operador levantar más de lo que la máquina soporta.</li></ul>' },
      { s: 'al_trayecto_ruta90', t: 'En la vía pública', x: 'Con vehículos de la empresa o en tu trayecto:<ul><li>Respeta la señalización; los vehículos de la empresa, <b>máximo 90 km/h</b> en carretera, y menos si la señal lo indica.</li><li><b>Conduce a la defensiva</b>: distancia con el de adelante, anticípate a los errores de otros.</li><li>Cinturón siempre y sin hablar por celular.</li><li>Nunca conduzcas cansado ni después de beber alcohol.</li><li>Solo conducen vehículos de la empresa las personas autorizadas.</li></ul>' },
      { s: 'al_trayecto_accidente', t: 'Si tienes un accidente de trayecto', x: '<ul><li>Atiéndete en la <b>ACHS (1404)</b> o en el servicio de urgencia más cercano y di que fue de trayecto.</li><li>Avisa a tu jefatura lo antes posible.</li><li>Junta pruebas: constancia de Carabineros, testigos o el registro de la atención.</li></ul>Sin estas pruebas puede ser difícil acreditar que fue de trayecto.' }
    ],
    quiz: [
      { s: 'al_trayecto_ruta', v: [
        { q: '¿Qué accidente de trayecto cubre la Ley 16.744?', o: ['El del trayecto directo casa-trabajo', 'El de un paseo de fin de semana', 'El de un desvío para hacer compras', 'El de las vacaciones'], w: 'Solo el trayecto directo, de ida o de vuelta.' },
        { q: 'Al salir del trabajo pasas a un trámite personal y ahí tienes un accidente. ¿Es de trayecto?', o: ['No, porque me desvié', 'Sí, en todos los casos', 'Sí, si el trámite fue cerca', 'Solo si ese día llovía'], w: 'El desvío por asuntos personales interrumpe el trayecto.' },
        { q: 'Salir con tiempo ayuda a evitar accidentes de trayecto.', vf: true, w: 'Verdadero. El apuro es una causa frecuente de accidentes.' }] },
      { s: 'al_trayecto_peaton', v: [
        { q: 'Vas caminando al trabajo. ¿Qué es lo correcto?', o: ['Sin celular ni audífonos, atento al tránsito', 'Con audífonos a todo volumen para no aburrirme', 'Mirando el celular, pero caminando lento', 'Cruzando entre los vehículos estacionados'], w: 'Necesitas ver y escuchar el tránsito.' },
        { q: 'Te bajas de la micro y debes cruzar. ¿Qué haces?', o: ['Espero que se vaya y cruzo mirando', 'Cruzo por delante de la micro', 'Cruzo por detrás corriendo', 'Cruzo con los audífonos puestos'], w: 'La micro tapa la vista: se cruza cuando ya se fue.' },
        { q: 'En bicicleta, ¿qué elementos usas?', o: ['Casco, luces y chaleco reflectante', 'Audífonos y celular para la ruta', 'Ropa oscura y sin luces para no gastar', 'Nada, si el trayecto es corto'], w: 'Te protegen y te hacen visible.' }] },
      { s: 'al_trayecto_interior', v: [
        { q: '¿Cuál es la velocidad máxima dentro de Maestranza ALI?', o: ['5 km/h', '20 km/h', '40 km/h', '60 km/h'], w: 'Dentro de la empresa, máximo 5 km/h.' },
        { q: '¿Cómo ingresas con un vehículo a la empresa?', o: ['Con las luces encendidas', 'Con las luces apagadas', 'Tocando la bocina sin parar', 'Hablando por celular'], w: 'Las luces encendidas te hacen visible.' },
        { q: 'En una intersección con poca visibilidad dentro de la empresa, ¿qué haces?', o: ['Me detengo y toco la bocina', 'Acelero para pasar rápido', 'Paso sin mirar', 'Apago las luces'], w: 'Detenerse y tocar la bocina avisa a peatones y equipos.' }] },
      { s: 'al_trayecto_estac', v: [
        { q: '¿Cómo se estaciona dentro de la empresa?', o: ['En posición de salida y con freno de mano', 'De retroceso hacia el portón, sin freno', 'Frente al tablero eléctrico, para no estorbar', 'En la vía peatonal, si es un momento'], w: 'En una emergencia sales sin retroceder.' },
        { q: '¿Dónde no se estaciona?', o: ['En la zona de maniobras de la grúa horquilla', 'En un estacionamiento autorizado de la empresa', 'En posición de salida, con el freno de mano', 'Lejos de portones, extintores y tableros'], w: 'Se dejan libres portones, vías, extintores y zonas de maniobra.' },
        { q: 'Estacionar en posición de salida permite salir sin retroceder en una emergencia.', vf: true, w: 'Verdadero. Por eso se estaciona así.' }] },
      { s: 'al_trayecto_q', v: [
        { q: 'Vas a retroceder una camioneta dentro de la empresa. ¿Qué haces?', o: ['Retrocedo con la indicación de un señalero', 'Retrocedo rápido mirando solo el espejo', 'Toco la bocina una vez y retrocedo sin mirar', 'Le pido a alguien que se ponga justo detrás'], w: 'Siempre se retrocede con un señalero apto.' },
        { q: 'Un vehículo está retrocediendo. Como peatón, ¿qué haces?', o: ['No paso por detrás y espero', 'Paso rápido por detrás', 'Me pongo detrás para guiarlo', 'Sigo mirando el celular'], w: 'El conductor no ve lo que tiene detrás.' },
        { q: 'Retrocedes y pierdes de vista al señalero. ¿Qué haces?', o: ['Me detengo de inmediato', 'Sigo retrocediendo', 'Acelero para terminar', 'Toco la bocina y sigo'], w: 'Sin ver al señalero no sabes si hay alguien detrás.' }] },
      { s: 'al_trayecto_horquilla', v: [
        { q: 'Debes cruzar frente a una grúa horquilla en movimiento. ¿Qué haces?', o: ['Hago contacto visual con el operador', 'Cruzo corriendo antes de que llegue', 'Paso por debajo de la carga levantada', 'Cruzo sin mirar, porque él me debe ver'], w: 'El contacto visual asegura que el operador te vio.' },
        { q: '¿Cuál es la velocidad máxima de un vehículo de la empresa en carretera?', o: ['90 km/h', '120 km/h', '100 km/h', 'La que permita el vehículo'], w: 'Máximo 90 km/h, y menos si la señal lo indica.' },
        { q: 'Conducir a la defensiva significa mantener distancia y anticiparse a los errores de otros.', vf: true, w: 'Verdadero. Así tienes tiempo para reaccionar.' }] }
    ]
  });

  // =====================================================================
  // 10) USO SEGURO DEL CELULAR EN EL TRABAJO
  // =====================================================================
  const celW = (x, y, o) => { const [hx, hy] = pP(x, y, o, 'hR'); return celu(hx, hy - 2, 1.1); };
  S.al_celular_distrae = () => svg(H.fondo.taller() + H.viga(170, 165, 60, 10) + W(120, 165, TA({ pose: 'cc4phone' })) + celW(120, 165, { pose: 'cc4phone' }) + G('at2_p', T(200, 130, '!', 26, '#C62828'))
    + pl(160, 14, 'Un segundo de distracción basta', '#C62828', 10));
  S.al_celular_maquina = () => svg(H.fondo.taller() + H.torno(30, 165) + W(190, 165, TA({ pose: 'cc4phone', flip: true })) + celW(190, 165, { pose: 'cc4phone', flip: true }) + no(296, 24)
    + pl(110, 14, 'Torno girando', '#C62828', 10));
  const cargaGrua = () => H.puenteGrua(170, 80, H.eslinga(170, 92, 136, 204, 120) + H.viga(124, 132, 92, 12)) + H.zonaCarga(126, 90);
  S.al_celular_grua = () => svg(H.fondo.taller() + cargaGrua() + W(62, 165, TA({ pose: 'cc4phone' })) + celW(62, 165, { pose: 'cc4phone' }) + `<rect x="54" y="118" width="8" height="14" rx="2" fill="#FFC20E" stroke="${OL}"/><path d="M58,118 v-30" stroke="#263238" stroke-width="1.5"/>` + no(296, 70)
    + pl(250, 186, 'Carga suspendida', '#C62828', 9));
  const andamio = (x, y, w = 90) => `<rect x="${x}" y="${y}" width="${w}" height="5" fill="#8D6E63" stroke="${OL}"/><path d="M${x + 4},${y + 5} V165 M${x + w - 4},${y + 5} V165 M${x + 4},${y + 5} L${x + w - 4},165 M${x + w - 4},${y + 5} L${x + 4},165" stroke="#90A4AE" stroke-width="3"/>`
    + `<path d="M${x + 2},${y} v-34 h${w - 4} v34 M${x + 2},${y - 17} h${w - 4}" stroke="#FFC20E" stroke-width="3" fill="none"/>`;
  S.al_celular_altura = () => svg(H.fondo.taller() + andamio(110, 74) + W(150, 74, TA({ pose: 'cc4phone', s: .75, helmet: true })) + celW(150, 74, { pose: 'cc4phone', s: .75 }) + no(296, 24)
    + `<path d="M226,74 v91 m-5,-86 l5,-5 l5,5 m-10,81 l5,5 l5,-5" stroke="${OL}" stroke-width="1.6" fill="none"/>` + T(262, 124, 'Más de', 10, OL) + T(262, 138, '1,8 m', 12, OL));
  S.al_celular_camina = () => svg(H.fondo.taller() + H.horquilla(30, 165) + W(230, 165, TA({ pose: 'cc3phone', flip: true })) + celW(230, 165, { pose: 'cc3phone', flip: true }) + no(296, 30)
    + pl(150, 14, 'Caminando sin mirar', '#C62828', 10));
  S.al_celular_conducir = () => svg(H.fondo.patio() + K(20, 182, .36, camioneta()) + `<g transform="translate(230,30) scale(1.6)">${H.letrero(0, 0, 'prohibicion', '', 46)}</g>` + `<rect x="261" y="48" width="14" height="24" rx="2" fill="#263238"/><rect x="263" y="51" width="10" height="16" fill="#81D4FA"/>`
    + pl(120, 14, 'Ni al volante ni en la grúa horquilla', '#C62828', 10));
  S.al_celular_seguro = () => svg(H.fondo.taller() + `<rect x="190" y="150" width="110" height="15" fill="#2E7D32" opacity=".35"/><path d="M190,165 v-15 h110 v15" stroke="#2E7D32" stroke-width="2" fill="none" stroke-dasharray="5 3"/>`
    + H.torno(14, 165, { gira: false }) + W(240, 165, TA({ pose: 'cc4phoneup', flip: true })) + celW(240, 165, { pose: 'cc4phoneup', flip: true }) + si(300, 24) + pl(150, 14, 'Me detengo en un lugar seguro', '#2E7D32', 10));
  S.al_celular_emerg = () => svg(H.fondo.taller() + H.fono(140, 40) + W(90, 165, TA({ pose: 'cc4phoneup' })) + pl(240, 60, 'ACHS 1404', '#2E7D32') + pl(240, 86, 'Bomberos 132', '#C62828') + pl(240, 112, 'Carabineros 133', '#1565C0'));

  SI_CONT.temas.push({
    id: 'celular', sec: 'todos', emp: ['ali'], title: 'Uso seguro del celular en el trabajo', thumb: 'al_celular_maquina', mins: 12,
    learn: [
      { s: 'al_celular_distrae', t: 'El celular distrae más de lo que crees', x: 'Cuando miras la pantalla, <b>tu atención se va al teléfono</b>: no ves la pieza en el suelo, la grúa horquilla que se acerca ni la máquina que gira, y reaccionas tarde. Basta un segundo para tropezar, golpearte o quedar atrapado. Escribir un mensaje es aún peor, porque ocupa tus ojos, tus manos y tu mente al mismo tiempo.' },
      { s: 'al_celular_maquina', t: 'Nunca al operar máquinas', x: 'Con el torno, la fresa, el taladro, la sierra, la guillotina, la plegadora o la prensa, <b>el celular no se usa</b>. Una mirada a la pantalla con la máquina en marcha puede costar un dedo, una mano o un brazo. Si necesitas contestar, primero <b>detén la máquina</b>, espera que pare por completo y aléjate a un lugar seguro.', k: 'Nunca uses el celular operando una máquina: primero detenla.' },
      { s: 'al_celular_grua', t: 'Nunca al soldar, esmerilar ni con cargas', x: 'Al <b>soldar, esmerilar, cortar con oxicorte o plasma</b>, y al operar el <b>puente grúa o un tecle</b>, toda tu atención va en la tarea. Con una carga suspendida, una distracción puede hacer que la carga golpee a alguien o se suelte. Si eres rigger o señalero, el celular tampoco se usa durante la maniobra.' },
      { s: 'al_celular_altura', t: 'Nunca en altura', x: 'Sobre andamios, escalas, plataformas o techos, sobre todo <b>sobre 1,8 metros</b>, usar el celular te quita el apoyo de una mano y la atención de dónde pisas. Si debes comunicarte, primero asegúrate y baja, o pide a un compañero en el suelo que conteste. Recuerda que en altura solo trabaja quien tiene su examen vigente y la autorización.' },
      { s: 'al_celular_camina', t: 'Nunca al caminar por el taller', x: 'No uses el celular mientras caminas por el taller o el patio: hay <b>grúas horquilla, camiones, cargas suspendidas, piezas en el suelo y cables</b>. Si necesitas contestar, <b>detente</b> en un lugar seguro, fuera de las vías de tránsito y lejos de las máquinas.' },
      { s: 'al_celular_conducir', t: 'Nunca al conducir', x: 'La ley de tránsito prohíbe manipular el celular mientras conduces, y en la empresa tampoco se usa al operar la <b>grúa horquilla</b> ni al manejar dentro del recinto. Mirar la pantalla unos segundos significa avanzar muchos metros sin mirar. Si necesitas llamar o leer un mensaje, <b>estaciónate en un lugar seguro</b> con el motor apagado.' },
      { s: 'al_celular_seguro', t: 'Detente en un lugar seguro', x: 'Para usar el celular:<ul><li><b>Detén la tarea</b> y deja la máquina detenida y la herramienta en un lugar seguro.</li><li>Ubícate <b>fuera de las vías de tránsito</b> y lejos de cargas y máquinas.</li><li>Hazlo en los momentos que autorice tu jefatura, sin interferir con tu trabajo.</li></ul>Mientras trabajas, el celular va guardado.', k: 'Para usar el celular: detén la tarea y ubícate en un lugar seguro.' },
      { s: 'al_celular_emerg', t: 'En una emergencia, el celular ayuda', x: 'Ante un accidente o una emergencia, el celular sirve para pedir ayuda: <b>ACHS 1404</b>, <b>SAMU 131</b>, <b>Bomberos 132</b> y <b>Carabineros 133</b>. Primero ponte en un lugar seguro, avisa a tu jefatura y después llama. Ten tu teléfono con batería, pero guardado mientras trabajas.' }
    ],
    quiz: [
      { s: 'al_celular_maquina', v: [
        { q: 'Estás en el torno y te llaman al celular. ¿Qué haces?', o: ['Detengo la máquina y contesto en lugar seguro', 'Contesto con el torno girando, rápido', 'Contesto con una mano y sigo trabajando', 'Pongo el altavoz y sigo con la pieza en el torno'], w: 'Con la máquina en marcha, una distracción puede costar una mano.' },
        { q: '¿Cuándo puedes usar el celular junto a una máquina?', o: ['Nunca mientras está en marcha', 'Cuando la máquina va lenta', 'Si es una llamada corta', 'Si nadie me ve'], w: 'Primero se detiene la máquina y te alejas.' },
        { q: 'Usar el celular con el torno girando es aceptable si es solo un segundo.', vf: false, w: 'Falso. Un segundo de distracción basta para un atrapamiento.' }] },
      { s: 'al_celular_grua', v: [
        { q: 'Estás operando el puente grúa con una carga suspendida y te llega un mensaje. ¿Qué haces?', o: ['Dejo la carga segura antes de mirarlo', 'Lo leo mientras muevo la carga despacio', 'Contesto y sigo moviendo la carga', 'Le paso la botonera a quien vaya pasando'], w: 'Con una carga suspendida, toda la atención va en la maniobra.' },
        { q: '¿Al soldar o esmerilar se puede usar el celular?', o: ['No, la atención va en la tarea', 'Sí, con audífonos', 'Sí, con la careta levantada', 'Sí, si es para música'], w: 'Soldar y esmerilar requieren toda tu atención.' },
        { q: 'El señalero de una maniobra puede usar el celular mientras guía la carga.', vf: false, w: 'Falso. Durante la maniobra el celular no se usa.' }] },
      { s: 'al_celular_altura', v: [
        { q: 'Estás en un andamio a 2,5 m y suena tu celular. ¿Qué haces?', o: ['No contesto hasta estar seguro o haber bajado', 'Contesto afirmado en la baranda del andamio', 'Contesto con una mano y me sujeto con la otra', 'Me siento en la baranda para contestar tranquilo'], w: 'En altura necesitas las dos manos y toda la atención.' },
        { q: '¿Desde qué altura se considera trabajo en altura?', o: ['Sobre 1,8 metros', 'Sobre 5 metros', 'Sobre 10 metros', 'Sobre 50 centímetros'], w: 'Sobre 1,8 m es trabajo en altura.' },
        { q: 'En altura, usar el celular te quita el apoyo de una mano.', vf: true, w: 'Verdadero. Y además te distrae de dónde pisas.' }] },
      { s: 'al_celular_camina', v: [
        { q: 'Vas caminando por el taller y quieres leer un mensaje. ¿Qué haces?', o: ['Me detengo fuera de las vías de tránsito', 'Lo leo caminando', 'Lo leo cruzando frente a la grúa horquilla', 'Lo leo bajo el puente grúa'], w: 'Caminando sin mirar no ves a la grúa horquilla ni las piezas en el suelo.' },
        { q: '¿Qué riesgos hay al caminar mirando el celular por el taller?', o: ['Atropellos, tropiezos y golpes', 'Ninguno, si camino despacio', 'Solo gastar la batería del teléfono', 'Solo perder el mensaje si se corta'], w: 'Hay grúas, camiones, cargas, piezas y cables.' },
        { q: 'Caminar por el patio con audífonos es seguro si miras bien.', vf: false, w: 'Falso. Necesitas escuchar bocinas, alarmas de retroceso y avisos.' }] },
      { s: 'al_celular_conducir', v: [
        { q: 'Estás operando la grúa horquilla y suena tu celular. ¿Qué haces?', o: ['Me detengo en un lugar seguro y contesto', 'Contesto mientras manejo despacio', 'Contesto con el altavoz, sin detenerme', 'Lo miro solo un segundo y sigo manejando'], w: 'La grúa horquilla se opera sin celular.' },
        { q: '¿Qué dice la ley de tránsito del celular al conducir?', o: ['Prohíbe manipularlo', 'Lo permite a baja velocidad', 'Lo permite en semáforo en verde', 'No dice nada'], w: 'Manipular el celular al conducir está prohibido.' },
        { q: 'Para leer un mensaje mientras conduces, lo correcto es estacionarte en un lugar seguro.', vf: true, w: 'Verdadero. Con el vehículo detenido y el motor apagado.' }] },
      { s: 'al_celular_seguro', v: [
        { q: '¿Cómo usas el celular de forma segura en el trabajo?', o: ['Detengo la tarea y me ubico en un lugar seguro', 'Mientras opero la máquina, si es una llamada corta', 'Caminando por la vía de la grúa horquilla', 'Bajo una carga suspendida, donde hay señal'], w: 'Se detiene la tarea y se usa fuera de tránsito y lejos de máquinas.' },
        { q: 'Hay un accidente en el taller. ¿Qué haces primero?', o: ['Me pongo a salvo y aviso, después llamo', 'Grabo un video de lo que pasó', 'Subo una foto a mis redes sociales', 'Sigo trabajando como si nada'], w: 'Primero la seguridad y el aviso; después llamas.' },
        { q: '¿A qué número llamas a la ACHS?', o: ['1404', '133', '132', '131'], w: 'El número de la ACHS es 1404.' }] }
    ]
  });

  // =====================================================================
  // ACTIVIDADES (cuentan como una pregunta más de la prueba)
  // =====================================================================
  const OLi = '#22303A';
  window.HT_ICO = Object.assign(window.HT_ICO || {}, {
    al_t2_fonos: `<path d="M12,26 A12,14 0 0 1 36,26" stroke="#B71C1C" stroke-width="4" fill="none"/><rect x="5" y="22" width="12" height="18" rx="5" fill="#D32F2F" stroke="${OLi}" stroke-width="2"/><rect x="31" y="22" width="12" height="18" rx="5" fill="#D32F2F" stroke="${OLi}" stroke-width="2"/>`,
    al_t2_audif: `<path d="M14,10 q-6,8 -2,18 M34,10 q6,8 2,18" stroke="#263238" stroke-width="1.6" fill="none"/><circle cx="12" cy="30" r="5" fill="#FAFAFA" stroke="${OLi}" stroke-width="2"/><circle cx="36" cy="30" r="5" fill="#FAFAFA" stroke="${OLi}" stroke-width="2"/><path d="M14,10 q10,-6 20,0 v4 h-20z" fill="#263238"/><rect x="18" y="4" width="12" height="20" rx="2" fill="#263238"/><rect x="20" y="6" width="8" height="14" fill="#81D4FA"/>`
  });
  window.HT_ACT = (window.HT_ACT || []).concat([
    { tema: 'quimicos', tipo: 'tarjetas', q: '🧩 Actividad: químicos en el taller. ¿Así sí o así no? Desliza cada tarjeta.',
      items: [['Leer la etiqueta y la HDS antes de usar un producto nuevo', 0, 'al_quimicos_hds'], ['Guardar diluyente en una botella de bebida', 1, 'al_quimicos_envase:L'],
        ['Mantener el producto en su envase original rotulado', 0, 'al_quimicos_envase:R'], ['Juntar restos de productos distintos en un tarro', 1, 'al_quimicos_mezcla'],
        ['Esmerilar con un tarro de diluyente abierto al lado', 1, 'al_quimicos_inflama:L'], ['Usar guantes de nitrilo y respirador con filtros', 0, 'al_quimicos_epp'],
        ['Comer con las manos sucias de pintura', 1, 'al_quimicos_higiene:L'], ['Lavarse con agua y jabón antes de comer', 0, 'al_quimicos_higiene:R']],
      w: 'Se lee la etiqueta y la HDS, se guarda en el envase original rotulado, no se mezclan productos, los inflamables van lejos de chispas, se usan guantes de nitrilo y respirador con filtros, y te lavas con agua y jabón antes de comer.' },
    { tema: 'ruido', tipo: 'vestir', q: '🧩 Actividad: prepara al trabajador que va a esmerilar una plancha en el taller.',
      items: [['Fonos o tapones auditivos', 1, 'al_t2_fonos', { muffs: 'on' }], ['Lentes de seguridad', 1, 'lentes', { glasses: true }], ['Guantes de cuero', 1, 'guantes#C8A27A', { gloves: '#C8A27A' }],
        ['Zapatos de seguridad', 1, 'zapatos', { boots: '#37474F' }], ['Ropa de trabajo', 1, 'overol', { shirt: '#22406B', pants: '#2B3A4A' }],
        ['Audífonos de música', 0, 'al_t2_audif', null, 'Los audífonos de música no protegen: suman ruido y no te dejan oír alarmas ni avisos.'],
        ['Gorro de lana bajo los fonos', 0, 'gorro_lana', null, 'El gorro bajo las almohadillas impide que los fonos sellen y deja pasar el ruido.'],
        ['Anillo', 0, 'anillo', null, 'En el taller está prohibido usar anillos, pulseras y cadenas: se enganchan en máquinas y herramientas.']],
      w: 'Para esmerilar: protector auditivo bien puesto todo el tiempo, lentes de seguridad, guantes, zapatos de seguridad y ropa de trabajo. Sin audífonos de música, sin gorro bajo los fonos y sin joyas.' }
  ]);
})();

/* ---- 40_taller.js ---- */
/* Maestranza ALI · charlas de la sección Taller (para todos los operarios): esmeril, grúa horquilla, izaje, altura,
   bloqueo de energías, atrapamientos, faenas de clientes y herramientas. Dibujos con prefijo al_ta_*, clases CSS al40*. */
(function () {
  const H = window.HD, T = H.T, pl = H.pill, OL = '#263238';
  const CSS_PROPIO = '<style>'
    + '.al40w{animation:al40w 1s ease-out infinite}@keyframes al40w{0%{opacity:0}30%{opacity:1}100%{opacity:0}}'
    + '.al40p{animation:al40p 1.4s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 50%}@keyframes al40p{50%{transform:scale(1.15)}}'
    + '.al40g{animation:al40g .5s linear infinite;transform-box:fill-box;transform-origin:50% 50%}@keyframes al40g{to{transform:rotate(360deg)}}'
    + '.al40s{animation:al40s 2.2s ease-in-out infinite alternate}@keyframes al40s{from{transform:rotate(-3deg)}to{transform:rotate(3deg)}}'
    + '.al40c{animation:al40c 1.6s ease-in infinite}@keyframes al40c{0%{transform:translateY(0);opacity:1}100%{transform:translateY(30px);opacity:0}}'
    + '.al40b{animation:al40b .8s steps(2) infinite}@keyframes al40b{50%{opacity:.25}}'
    + '</style>';
  const svg = inner => sv(H.CSS + CSS_PROPIO + inner);

  // ===================== ayudantes de dibujo =====================
  const PP = o => (typeof POSES !== 'undefined' && POSES[(o && o.pose) || 'stand']) || { hR: [11, -35], hL: [-11, -35], head: [0, -73], neck: [0, -62], hip: [0, -36] };
  const pt = (x, y, o, k) => { const P = PP(o), s = (o && o.s) || 1, fx = o && o.flip ? -1 : 1; return [x + P[k][0] * s * fx, y + P[k][1] * s]; };
  const qm = (x, y, r = 16) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#1565C0" stroke="#fff" stroke-width="3"/>` + T(x, y + r * .42, '?', r * 1.25, '#fff');
  const div = (x = 160) => `<line x1="${x}" y1="6" x2="${x}" y2="194" stroke="#fff" stroke-width="5"/><line x1="${x}" y1="6" x2="${x}" y2="194" stroke="#90A4AE" stroke-width="1.5" stroke-dasharray="5 4"/>`;
  const banco = (x, y, w = 120, h = 46) => `<rect x="${x}" y="${y - h}" width="${w}" height="6" fill="#78909C" stroke="${OL}"/><rect x="${x + 4}" y="${y - h + 6}" width="6" height="${h - 6}" fill="#546E7A"/><rect x="${x + w - 10}" y="${y - h + 6}" width="6" height="${h - 6}" fill="#546E7A"/><rect x="${x + 4}" y="${y - 14}" width="${w - 8}" height="4" fill="#546E7A"/>`;
  // prensa de banco: (x, y) = sobre la cubierta del banco
  const prensa = (x, y) => `<rect x="${x}" y="${y - 6}" width="26" height="6" fill="#1565C0" stroke="${OL}"/><rect x="${x + 2}" y="${y - 18}" width="7" height="12" fill="#1565C0" stroke="${OL}"/><rect x="${x + 17}" y="${y - 18}" width="7" height="12" fill="#1565C0" stroke="${OL}"/><line x1="${x + 24}" y1="${y - 10}" x2="${x + 36}" y2="${y - 10}" stroke="${OL}" stroke-width="2"/><line x1="${x + 36}" y1="${y - 15}" x2="${x + 36}" y2="${y - 5}" stroke="${OL}" stroke-width="2"/>`;
  // careta facial (visor transparente) sobre la cabeza de una persona W(x, y, o)
  const facial = (x, y, o = {}) => { const [X, Y] = pt(x, y, o, 'head'), s = o.s || 1, f = o.flip ? -1 : 1;
    return `<path d="M${X - 9 * s},${Y - 6 * s} Q${X},${Y - 15 * s} ${X + 9 * s},${Y - 6 * s}" stroke="#37474F" stroke-width="${2.6 * s}" fill="none"/>`
      + `<path d="M${X + 1 * s * f},${Y - 10 * s} L${X + 13 * s * f},${Y - 6 * s} L${X + 14 * s * f},${Y + 12 * s} L${X + 3 * s * f},${Y + 15 * s} Z" fill="#B3E5FC" fill-opacity=".45" stroke="#455A64" stroke-width="${1.2 * s}"/>`; };
  // arnés de cuerpo completo dibujado sobre W(x, y, o); devuelve también el anillo dorsal
  const arnes = (x, y, o = {}) => { const [nx, ny] = pt(x, y, o, 'neck'), [hx, hy] = pt(x, y, o, 'hip'), s = o.s || 1;
    return `<path d="M${nx - 4 * s},${ny + 1} L${hx + 4 * s},${hy - 2} M${nx + 4 * s},${ny + 1} L${hx - 4 * s},${hy - 2}" stroke="#FFC20E" stroke-width="${2.6 * s}"/><path d="M${hx - 7 * s},${hy} q${7 * s},${8 * s} ${14 * s},0" stroke="#FFC20E" stroke-width="${2.6 * s}" fill="none"/><circle cx="${nx}" cy="${ny + 4 * s}" r="${2.4 * s}" fill="none" stroke="${OL}" stroke-width="${1.4 * s}"/>`; };
  const anillaDorsal = (x, y, o = {}) => { const [nx, ny] = pt(x, y, o, 'neck'); return [nx, ny + 4 * ((o.s) || 1)]; };
  const colaArnes = (x1, y1, x2, y2) => `<path d="M${x1},${y1} Q${(x1 + x2) / 2 + 6},${(y1 + y2) / 2 + 8} ${x2},${y2}" stroke="#E65100" stroke-width="2.6" fill="none"/><rect x="${(x1 + x2) / 2 - 3}" y="${(y1 + y2) / 2 - 2}" width="7" height="9" rx="2" fill="#263238"/><circle cx="${x2}" cy="${y2}" r="3" fill="none" stroke="${OL}" stroke-width="1.6"/>`;
  const anclaje = (x, y) => `<rect x="${x - 5}" y="${y - 4}" width="10" height="6" fill="#455A64"/><circle cx="${x}" cy="${y + 5}" r="4" fill="none" stroke="#455A64" stroke-width="2.4"/>`;
  const cono = (x, y, s = 1) => `<path d="M${x - 8 * s},${y} l${6 * s},${-26 * s} h${4 * s} l${6 * s},${26 * s}z" fill="#FF6F00" stroke="${OL}" stroke-width=".8"/><path d="M${x - 5 * s},${y - 12 * s} h${10 * s}" stroke="#fff" stroke-width="${3 * s}"/><rect x="${x - 11 * s}" y="${y - 2}" width="${22 * s}" height="3" fill="#E65100"/>`;
  const cinta = (x1, x2, y) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#D32F2F" stroke-width="3"/><line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#fff" stroke-width="3" stroke-dasharray="6 6"/>`;
  const doc = (x, y, t1, t2, c = '#1565C0', w = 64, h = 80) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#fff" stroke="#90A4AE" stroke-width="1.6"/><rect x="${x}" y="${y}" width="${w}" height="16" rx="3" fill="${c}"/>` + T(x + w / 2, y + 11.5, t1, 8, '#fff') + [0, 1, 2, 3].map(i => `<line x1="${x + 8}" y1="${y + 28 + i * 10}" x2="${x + w - 8 - (i % 2) * 12}" y2="${y + 28 + i * 10}" stroke="#B0BEC5" stroke-width="2"/>`).join('') + (t2 ? T(x + w / 2, y + h - 8, t2, 7, c) : '');
  const ondas = (x, y, dir = -1) => `<g class="al40w">${[0, 1, 2].map(i => `<path d="M${x + dir * (4 + i * 6)},${y - 6 - i * 3} q${dir * 5},${6 + i * 3} 0,${12 + i * 6}" stroke="#FF9800" stroke-width="2" fill="none"/>`).join('')}</g>`;
  const disco5 = (x, y, r = 16) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#D32F2F" stroke-width="${r * .22}"/>` + T(x, y + 2, '5', r * .8, '#263238') + T(x, y + r * .62, 'km/h', r * .32, '#263238');
  const viaPeatonal = (x, w) => `<rect x="${x}" y="168" width="${w}" height="20" fill="#FFF59D" opacity=".55"/><line x1="${x}" y1="168" x2="${x + w}" y2="168" stroke="#FFC20E" stroke-width="3"/><line x1="${x}" y1="188" x2="${x + w}" y2="188" stroke="#FFC20E" stroke-width="3"/>`;
  const horqF = (x, y, o = {}) => H.horquilla(x, y, Object.assign({}, o, { flip: true })) + `<rect x="${x + 22}" y="${y - 37}" width="28" height="14" fill="${H.ALI1}"/>` + T(x + 36, y - 26, 'ALI', 11, '#fff');
  // esmeril angular SIN guarda (para mostrar lo mal hecho)
  const esmSinGuarda = (x, y, ang = 0) => `<g transform="rotate(${ang} ${x} ${y})"><rect x="${x - 4}" y="${y - 4}" width="30" height="9" rx="4" fill="#1565C0" stroke="${OL}"/><rect x="${x + 22}" y="${y - 6}" width="10" height="13" rx="2" fill="#455A64" stroke="${OL}"/><rect x="${x + 28}" y="${y + 6}" width="4" height="4" fill="#455A64"/><ellipse cx="${x + 30}" cy="${y + 12}" rx="15" ry="3.5" fill="#9E9E9E" stroke="${OL}"/></g>`;
  // disco de esmeril visto de frente con su rotulación
  const discoFrente = (x, y, r, t1, t2, c = '#8D8D8D') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="#555" stroke-width="2"/><circle cx="${x}" cy="${y}" r="${r * .8}" fill="none" stroke="#bbb" stroke-width="1"/><circle cx="${x}" cy="${y}" r="${r * .2}" fill="#424242"/>` + (t1 ? T(x, y - r * .4, t1, 9, '#111') : '') + (t2 ? T(x, y + r * .55, t2, 9, '#111') : '');
  // herramientas manuales (vista de lado)
  const martillo = (x, y, s = 1, mal = false) => `<rect x="${x}" y="${y - 3 * s}" width="${50 * s}" height="${6 * s}" rx="${2 * s}" fill="#A1887F" stroke="${OL}"/>` + (mal ? `<path d="M${x + 20 * s},${y - 3 * s} l3,6 l3,-6" stroke="${OL}" stroke-width="1.5" fill="none"/>` : '') + `<rect x="${x + 48 * s}" y="${y - 10 * s}" width="${10 * s}" height="${24 * s}" rx="${1.5 * s}" fill="#455A64" stroke="${OL}"/>`;
  const llave = (x, y, s = 1) => `<rect x="${x}" y="${y - 3 * s}" width="${54 * s}" height="${6 * s}" rx="${3 * s}" fill="#90A4AE" stroke="${OL}"/><path d="M${x + 52 * s},${y - 9 * s} a${9 * s},${9 * s} 0 1 1 0,${18 * s} l${-2 * s},${-6 * s} h${6 * s} v${-6 * s} h${-6 * s}z" fill="#90A4AE" stroke="${OL}"/>`;
  const lima = (x, y, s = 1, mango = true) => (mango ? `<rect x="${x}" y="${y - 4 * s}" width="${20 * s}" height="${8 * s}" rx="${3 * s}" fill="#8D6E63" stroke="${OL}"/>` : `<path d="M${x + 6 * s},${y} h${14 * s}" stroke="#78909C" stroke-width="${2.5 * s}"/>`) + `<path d="M${x + 20 * s},${y - 3.5 * s} h${40 * s} l${4 * s},${3.5 * s} l${-4 * s},${3.5 * s} h${-40 * s}z" fill="#B0BEC5" stroke="${OL}"/>` + [0, 1, 2, 3, 4, 5, 6].map(i => `<line x1="${x + (24 + i * 5) * s}" y1="${y - 3 * s}" x2="${x + (21 + i * 5) * s}" y2="${y + 3 * s}" stroke="#78909C" stroke-width=".8"/>`).join('');
  const cincel = (x, y, s = 1, hongo = false) => `<path d="M${x},${y - 4 * s} h${46 * s} l${10 * s},${3 * s} v${2 * s} l${-10 * s},${3 * s} h${-46 * s}z" fill="#78909C" stroke="${OL}"/>`
    + (hongo ? `<path d="M${x + 1},${y - 4 * s} q${-8 * s},${-6 * s} ${-9 * s},${4 * s} q${1 * s},${10 * s} ${9 * s},${4 * s}z" fill="#8D9AA2" stroke="${OL}"/><path d="M${x - 6 * s},${y - 5 * s} l${-3 * s},${-3 * s} M${x - 7 * s},${y + 4 * s} l${-3 * s},${3 * s} M${x - 8 * s},${y} h${-4 * s}" stroke="${OL}" stroke-width="1"/>` : `<rect x="${x - 3 * s}" y="${y - 3.4 * s}" width="${4 * s}" height="${6.8 * s}" rx="${1 * s}" fill="#78909C" stroke="${OL}"/>`);
  const destornillador = (x, y, s = 1) => `<rect x="${x}" y="${y - 4 * s}" width="${22 * s}" height="${8 * s}" rx="${3 * s}" fill="#E8423A" stroke="${OL}"/><rect x="${x + 22 * s}" y="${y - 1.4 * s}" width="${28 * s}" height="${2.8 * s}" fill="#B0BEC5" stroke="${OL}" stroke-width=".6"/>`;
  // taladro portátil (pistola): (x, y) = empuñadura abajo
  const taladroP = (x, y, s = 1, flip = false) => { const g = `<rect x="${x - 4 * s}" y="${y - 24 * s}" width="${9 * s}" height="${24 * s}" rx="${3 * s}" fill="#E8423A" stroke="${OL}"/><rect x="${x - 10 * s}" y="${y - 36 * s}" width="${36 * s}" height="${14 * s}" rx="${5 * s}" fill="#E8423A" stroke="${OL}"/><rect x="${x + 26 * s}" y="${y - 33 * s}" width="${8 * s}" height="${8 * s}" fill="#455A64" stroke="${OL}"/><rect x="${x + 34 * s}" y="${y - 30.5 * s}" width="${16 * s}" height="${3 * s}" fill="#B0BEC5" stroke="${OL}" stroke-width=".6"/><rect x="${x - 4 * s}" y="${y - 2 * s}" width="${9 * s}" height="${4 * s}" fill="#263238"/>`;
    return flip ? `<g transform="translate(${2 * x},0) scale(-1,1)">${g}</g>` : g; };
  // candado y tarjeta de bloqueo grandes
  const candado = (x, y, s = 1, c = H.ALI1) => `<path d="M${x - 9 * s},${y} v${-10 * s} a${9 * s},${9 * s} 0 0 1 ${18 * s},0 v${10 * s}" stroke="#90A4AE" stroke-width="${4 * s}" fill="none"/><rect x="${x - 14 * s}" y="${y - 2 * s}" width="${28 * s}" height="${24 * s}" rx="${3 * s}" fill="${c}" stroke="${OL}" stroke-width="1.4"/><circle cx="${x}" cy="${y + 8 * s}" r="${3 * s}" fill="${OL}"/><rect x="${x - 1.2 * s}" y="${y + 9 * s}" width="${2.4 * s}" height="${6 * s}" fill="${OL}"/>`;
  const tarjeta = (x, y, s = 1, nombre = true) => `<rect x="${x}" y="${y}" width="${46 * s}" height="${64 * s}" rx="${3 * s}" fill="#FFC20E" stroke="${OL}" stroke-width="1.2"/><circle cx="${x + 23 * s}" cy="${y + 7 * s}" r="${3 * s}" fill="#fff" stroke="${OL}"/><rect x="${x + 4 * s}" y="${y + 14 * s}" width="${38 * s}" height="${12 * s}" fill="#C62828"/>` + T(x + 23 * s, y + 23 * s, 'PELIGRO', 7.5 * s, '#fff') + T(x + 23 * s, y + 36 * s, 'NO OPERAR', 6.5 * s, '#263238')
    + (nombre ? [0, 1, 2].map(i => `<line x1="${x + 6 * s}" y1="${y + (44 + i * 7) * s}" x2="${x + 40 * s}" y2="${y + (44 + i * 7) * s}" stroke="#263238" stroke-width=".8"/>`).join('') : '');
  const mano = (x, y) => `<circle cx="${x}" cy="${y}" r="5" fill="#F5D0B0" stroke="#22303A" stroke-width="1.1"/>`;
  const manometro = (x, y, r = 14, cero = true) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${OL}" stroke-width="2.4"/><path d="M${x - r * .7},${y + r * .4} A${r * .8},${r * .8} 0 1 1 ${x + r * .7},${y + r * .4}" stroke="#90A4AE" stroke-width="1.4" fill="none"/>`
    + (cero ? `<line x1="${x}" y1="${y}" x2="${x - r * .6}" y2="${y + r * .35}" stroke="#D32F2F" stroke-width="2"/>` : `<line x1="${x}" y1="${y}" x2="${x + r * .55}" y2="${y - r * .4}" stroke="#D32F2F" stroke-width="2"/>`) + `<circle cx="${x}" cy="${y}" r="2" fill="${OL}"/>` + T(x - r * .55, y + r * .78, '0', r * .38, '#263238');
  // botón de parada de emergencia (hongo rojo sobre base amarilla)
  const hongo = (x, y, r = 22) => `<rect x="${x - r * 1.2}" y="${y - r * 1.2}" width="${r * 2.4}" height="${r * 2.4}" rx="${r * .3}" fill="#FFC20E" stroke="${OL}" stroke-width="1.5"/><circle cx="${x}" cy="${y}" r="${r * .9}" fill="#C62828" stroke="${OL}" stroke-width="1.5"/><ellipse cx="${x - r * .3}" cy="${y - r * .35}" rx="${r * .3}" ry="${r * .16}" fill="#fff" opacity=".45"/>`;
  // joyas (iconos)
  const anillo = (x, y, r = 10) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#FBC02D" stroke-width="${r * .4}"/><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${OL}" stroke-width=".8" opacity=".5"/>`;
  const reloj = (x, y, r = 10) => `<rect x="${x - r * .5}" y="${y - r * 1.8}" width="${r}" height="${r * 3.6}" rx="${r * .2}" fill="#5D4037"/><circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${OL}" stroke-width="2"/><path d="M${x},${y} v${-r * .6} M${x},${y} l${r * .45},${r * .3}" stroke="${OL}" stroke-width="1.6"/>`;
  const cadenaCuello = (x, y, r = 16) => `<path d="M${x - r},${y - r * .6} Q${x},${y + r * 1.2} ${x + r},${y - r * .6}" stroke="#FBC02D" stroke-width="2.5" stroke-dasharray="3 1.5" fill="none"/><circle cx="${x}" cy="${y + r * .32}" r="${r * .22}" fill="#FBC02D" stroke="${OL}" stroke-width=".8"/>`;
  const pulsera = (x, y, r = 12) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .55}" fill="none" stroke="#AB47BC" stroke-width="3.5"/>`;
  const aro = (x, y, r = 7) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#FBC02D" stroke-width="2.5"/><circle cx="${x}" cy="${y - r}" r="2" fill="#FBC02D"/>`;
  // camioneta de la empresa (colores ALI); x = parachoques trasero, y = piso
  const camioneta = (x, y, flip = false, sc = 1.5) => { const g0 = `<path d="M${x},${y - 14} v-24 h56 v-18 l8,-10 h34 l14,26 h10 v26z" fill="${H.ALI1}" stroke="${OL}" stroke-width="1.4"/><path d="M${x + 66},${y - 54} h28 l10,16 h-38z" fill="#CFE8F7" stroke="${OL}"/><rect x="${x}" y="${y - 40}" width="56" height="4" fill="${H.ALI2}"/>` + T(x + 30, y - 22, 'ALI', 10, '#fff')
      + `<circle cx="${x + 22}" cy="${y - 10}" r="10" fill="#263238"/><circle cx="${x + 22}" cy="${y - 10}" r="4" fill="#90A4AE"/><circle cx="${x + 98}" cy="${y - 10}" r="10" fill="#263238"/><circle cx="${x + 98}" cy="${y - 10}" r="4" fill="#90A4AE"/><rect x="${x + 116}" y="${y - 30}" width="6" height="5" fill="#FFF59D"/>`;
    const g = `<g transform="translate(${x},${y}) scale(${sc}) translate(${-x},${-y})">${g0}</g>`;
    return flip ? `<g transform="translate(${2 * x + 122 * sc},0) scale(-1,1)">${g}</g>` : g; };
  // pórtico con tecle (estructura de vigas en el taller)
  const portico = (x1, x2, y = 165, top = 40) => `<rect x="${x1 - 5}" y="${top}" width="10" height="${y - top}" fill="#FFC20E" stroke="${OL}"/><rect x="${x2 - 5}" y="${top}" width="10" height="${y - top}" fill="#FFC20E" stroke="${OL}"/><rect x="${x1 - 8}" y="${top - 8}" width="${x2 - x1 + 16}" height="12" fill="#FFC20E" stroke="${OL}"/><rect x="${x1 - 12}" y="${y - 4}" width="24" height="4" fill="#455A64"/><rect x="${x2 - 12}" y="${y - 4}" width="24" height="4" fill="#455A64"/>`;
  // grillete y gancho con seguro (íconos grandes)
  const grillete = (x, y, s = 1, mal = false) => `<path d="M${x - 12 * s},${y} v${-14 * s} a${12 * s},${14 * s} 0 0 1 ${24 * s},0 ${mal ? `l${10 * s},${14 * s}` : `v${14 * s}`}" stroke="#1565C0" stroke-width="${6 * s}" fill="none"/><rect x="${x - 18 * s}" y="${y - 2 * s}" width="${36 * s}" height="${6 * s}" rx="${3 * s}" fill="${mal ? '#8D6E63' : '#90A4AE'}" stroke="${OL}"/>` + (mal ? '' : `<circle cx="${x + 20 * s}" cy="${y + 1 * s}" r="${4 * s}" fill="#90A4AE" stroke="${OL}"/>`);
  const gancho = (x, y, s = 1, seguro = true) => `<rect x="${x - 6 * s}" y="${y - 30 * s}" width="${12 * s}" height="${12 * s}" rx="${2 * s}" fill="#FFC20E" stroke="${OL}"/><path d="M${x},${y - 18 * s} v${10 * s} q0,${16 * s} ${-12 * s},${16 * s} q${-11 * s},0 ${-11 * s},${-11 * s}" stroke="${OL}" stroke-width="${5 * s}" fill="none" stroke-linecap="round"/>` + (seguro ? `<line x1="${x - 1 * s}" y1="${y - 8 * s}" x2="${x - 22 * s}" y2="${y - 3 * s}" stroke="#D32F2F" stroke-width="${2.4 * s}"/>` : '');
  const eslingaBanda = (x, y, w = 110, mal = false) => `<rect x="${x}" y="${y - 7}" width="${w}" height="14" rx="7" fill="#7B1FA2" stroke="${OL}"/><rect x="${x + w / 2 - 14}" y="${y - 6}" width="28" height="12" fill="#fff" opacity="${mal ? .3 : 1}"/>` + (mal ? `<path d="M${x + 24},${y - 7} l4,7 l-4,7 M${x + 78},${y - 7} l-3,5 l4,2" stroke="#FFF59D" stroke-width="2.5" fill="none"/>` : T(x + w / 2, y + 3, '2 t', 8, '#263238'));

  // ======================================================================
  // 1. ESMERIL ANGULAR Y DE BANCO
  // ======================================================================
  const piezaBanco = (x) => banco(x, 165, 120, 36) + H.viga(x + 4, 129, 76, 10) + prensa(x + 82, 129);
  // trabajador esmerilando en el banco; o = opciones extra de W; g = { guarda, chispasDir }
  const esmerila = (px, o = {}, g = {}) => { const po = Object.assign({ pose: 'carry', muffs: 'on', gloves: '#8D6E63' }, o), [hx, hy] = pt(px, 165, po, 'hR');
    const herr = g.guarda === false ? esmSinGuarda(hx - 4, hy - 2, 8) : H.esmerilMano(hx - 4, hy - 2, 8);
    return W(px, 165, po) + (o.facial === false ? '' : facial(px, 165, po)) + herr + (g.chispas === false ? '' : H.chispas(hx + 26, hy + 14, 9, g.dir || 1)); };
  S.al_ta_esmeril_intro = () => svg(H.fondo.taller() + piezaBanco(60) + esmerila(40) + `<g transform="translate(250,70)"><circle r="30" fill="#8D8D8D" stroke="#555" stroke-width="2"/><circle r="7" fill="#424242"/><g class="al40g"><path d="M0,-26 v8 M0,26 v-8 M-26,0 h8 M26,0 h-8" stroke="#E0E0E0" stroke-width="2"/></g></g>` + pl(250, 110, 'más de 10.000 RPM', '#D7262B', 10) + pl(110, 176, 'Solo personal capacitado y autorizado', '#263238', 10));
  S.al_ta_esmeril_disco = () => svg(H.fondo.liso() + discoFrente(62, 76, 42, 'CORTE', '1 mm') + pl(62, 126, 'Para cortar', '#1565C0', 10) + discoFrente(160, 76, 42, 'DESBASTE', '6 mm', '#6D6D6D') + pl(160, 126, 'Para desbastar', '#1565C0', 10)
    + `<rect x="214" y="34" width="96" height="84" rx="8" fill="#fff" stroke="#90A4AE" stroke-width="2"/>` + T(262, 52, 'Disco', 10, '#455A64') + T(262, 68, '13.300 RPM', 11, '#2E7D32') + T(262, 90, 'Máquina', 10, '#455A64') + T(262, 106, '11.000 RPM', 11, '#1565C0')
    + pl(160, 150, 'RPM del disco igual o mayor que la de la máquina', '#2E7D32', 10) + pl(160, 174, 'Sin trizaduras, ni húmedo, ni vencido', '#455A64', 10));
  S.al_ta_esmeril_disco_q = () => svg(H.fondo.liso() + discoFrente(80, 86, 48, '', '') + T(80, 70, '? RPM', 12, '#111') + `<rect x="170" y="44" width="120" height="84" rx="8" fill="#fff" stroke="#90A4AE" stroke-width="2"/>` + H.esmerilMano(196, 70, 0) + T(230, 112, '11.000 RPM', 12, '#1565C0') + qm(160, 170));
  S.al_ta_esmeril_rev = () => svg(H.fondo.liso('#EEF2F5') + `<g transform="translate(10,96) scale(2.4)">` + H.esmerilMano(10, 20, 0) + `</g><path d="M40,150 q30,30 90,10 q40,-2 86,4" stroke="#263238" stroke-width="3" fill="none"/><rect x="226" y="154" width="22" height="14" rx="3" fill="#263238"/><rect x="248" y="157" width="8" height="3" fill="#B0BEC5"/><rect x="248" y="163" width="8" height="3" fill="#B0BEC5"/>`
    + pl(200, 14, 'Mango lateral puesto', '#2E7D32', 10) + pl(200, 38, 'Guarda firme', '#2E7D32', 10) + pl(200, 62, 'Disco apretado con su llave', '#2E7D32', 10) + pl(200, 86, 'Interruptor que vuelve a apagado', '#2E7D32', 10) + pl(250, 120, 'Cable y enchufe sanos', '#2E7D32', 10));
  S.al_ta_esmeril_epp = () => svg(H.fondo.taller() + piezaBanco(40) + esmerila(20) + pl(250, 30, 'Lentes de seguridad', '#1565C0', 10) + pl(250, 54, 'Careta facial encima', '#1565C0', 10) + pl(250, 78, 'Protector auditivo', '#1565C0', 10) + pl(250, 102, 'Guantes de cuero', '#1565C0', 10) + pl(250, 126, 'Ropa abotonada', '#1565C0', 10));
  S.al_ta_esmeril_q_epp = () => svg(H.fondo.taller() + piezaBanco(100) + esmerila(80, { facial: false, muffs: false, gloves: false }) + qm(270, 60));
  S.al_ta_esmeril_uso = () => svg(H.fondo.taller() + piezaBanco(100) + esmerila(80) + pl(160, 176, 'Pieza fija en la prensa · dos manos', '#2E7D32', 10) + pl(200, 50, 'Mango lateral', '#2E7D32', 10) + `<path d="M180,70 l-70,30" stroke="#2E7D32" stroke-width="2"/>` + H.si(290, 40));
  S.al_ta_esmeril_q_uso = () => { const po = { pose: 'carry', muffs: 'on', gloves: '#8D6E63' }, [hx, hy] = pt(80, 165, po, 'hR');
    return svg(H.fondo.taller() + banco(100, 165, 120, 36) + `<g transform="rotate(-8 150 124)">` + H.viga(104, 129, 70, 10) + `</g>` + W(80, 165, po) + facial(80, 165, po) + H.esmerilMano(hx - 4, hy - 2, 8) + H.chispas(hx + 26, hy + 14) + qm(270, 50)); };
  S.al_ta_esmeril_chispas = () => svg(H.fondo.taller() + banco(26, 165, 80, 36) + H.viga(30, 129, 70, 10) + esmerila(10) + H.cilindro(116, 165, 'oxigeno') + H.no(134, 40) + div()
    + banco(186, 165, 80, 36) + H.viga(190, 129, 70, 10) + esmerila(170) + H.biombo(272, 165, 40) + H.si(296, 40) + pl(80, 180, 'Hacia el gas', '#D7262B', 10) + pl(240, 180, 'Hacia el piso, sin nadie', '#2E7D32', 10));
  S.al_ta_esmeril_q_chispas = () => svg(H.fondo.taller() + banco(60, 165, 100) + H.viga(80, 119, 60, 10) + esmerila(50) + H.cilindro(178, 165, 'acetileno') + H.bidon(210, 165, '#FB8C00', 'DILUYENTE') + W(280, 165, { flip: true }) + qm(160, 40));
  S.al_ta_esmeril_guarda = () => svg(H.fondo.liso() + `<g transform="translate(-2,30) scale(2.4)">` + esmSinGuarda(14, 20, 0) + `</g>` + pl(80, 22, 'Sin guarda', '#D7262B') + H.no(140, 150) + div() + `<g transform="translate(158,30) scale(2.4)">` + H.esmerilMano(14, 20, 0) + `</g>` + pl(240, 22, 'Con guarda', '#2E7D32') + H.si(300, 150) + pl(160, 176, 'Nunca se saca la guarda', '#263238', 10));
  S.al_ta_esmeril_cambio = () => svg(H.fondo.taller() + banco(130, 165, 160) + `<rect x="20" y="96" width="30" height="40" rx="3" fill="#ECEFF1" stroke="${OL}"/><circle cx="30" cy="112" r="3" fill="${OL}"/><circle cx="40" cy="112" r="3" fill="${OL}"/>` + `<rect x="70" y="126" width="22" height="14" rx="3" fill="#263238"/><rect x="62" y="129" width="8" height="3" fill="#B0BEC5"/><rect x="62" y="135" width="8" height="3" fill="#B0BEC5"/><path d="M92,133 q30,0 50,-8 q20,-6 42,-8" stroke="#263238" stroke-width="3" fill="none"/>` + `<path d="M56,133 h4" stroke="#D32F2F" stroke-width="2"/>`
    + H.esmerilMano(180, 107, 0) + discoFrente(260, 106, 13, '', '') + llave(214, 116, .5) + pl(64, 152, 'Desenchufado', '#2E7D32', 10) + pl(220, 176, 'Cambio de disco con su llave', '#1565C0', 10));
  S.al_ta_esmeril_q_cambio = () => svg(H.fondo.taller() + banco(130, 165, 160) + `<rect x="20" y="96" width="30" height="40" rx="3" fill="#ECEFF1" stroke="${OL}"/><circle cx="30" cy="112" r="3" fill="${OL}"/><circle cx="40" cy="112" r="3" fill="${OL}"/><path d="M40,116 q40,20 100,6 q20,-4 44,-6" stroke="#263238" stroke-width="3" fill="none"/>` + H.esmerilMano(180, 107, 0) + discoFrente(260, 106, 13, '', '') + qm(90, 60));
  S.al_ta_esmeril_q_dejar = () => svg(H.fondo.taller() + `<g transform="translate(150,160) rotate(180)">` + H.esmerilMano(0, 0, 0) + `</g>` + H.chispas(126, 166, 7, -1) + W(220, 165, { pose: 'walk', flip: true, muffs: 'on', gloves: '#8D6E63' }) + H.no(60, 50) + pl(150, 182, 'Disco aún girando', '#D7262B', 10));
  S.al_ta_esmeril_dejar = () => svg(H.fondo.taller() + banco(100, 165, 150) + H.esmerilMano(150, 107, 0) + W(40, 165, { pose: 'stand', muffs: 'on', gloves: '#8D6E63' }) + pl(205, 30, '1. Suelta el gatillo', '#1565C0', 10) + pl(205, 54, '2. Espera que el disco se detenga', '#1565C0', 10) + pl(205, 78, '3. Déjalo en el banco, lejos del borde', '#2E7D32', 10) + H.si(290, 140));
  const bancoEsm = (x, apoyo = 3, mal = false) => H.esmerilBanco(x, 165) + `<rect x="${x + 28 + apoyo}" y="104" width="16" height="4" fill="#455A64" stroke="${OL}"/>`;
  S.al_ta_esmeril_banco = () => { const po = { pose: 'carry', flip: true, gloves: false }; return svg(H.fondo.taller() + bancoEsm(95) + H.chispas(112, 116, 7, -1) + W(176, 165, po) + facial(176, 165, po)
    + `<circle cx="244" cy="70" r="40" fill="#fff" stroke="#1565C0" stroke-width="3"/><circle cx="234" cy="70" r="26" fill="#9E9E9E" stroke="${OL}"/><rect x="262" y="78" width="20" height="8" fill="#455A64" stroke="${OL}"/><path d="M258,94 v8 M262,94 v8" stroke="#D32F2F" stroke-width="1.5"/>` + T(232, 124, '3 mm o menos', 10, '#D32F2F')
    + pl(80, 30, 'Apoyo a 3 mm o menos', '#2E7D32', 10) + pl(96, 182, 'Pantalla y lentes; nunca de frente al encender', '#1565C0', 9)); };
  S.al_ta_esmeril_q_banco = () => svg(H.fondo.taller() + `<circle cx="160" cy="92" r="70" fill="#fff" stroke="#1565C0" stroke-width="3"/><circle cx="138" cy="92" r="48" fill="#9E9E9E" stroke="${OL}" stroke-width="2"/><circle cx="138" cy="92" r="8" fill="#424242"/><rect x="200" y="106" width="40" height="12" fill="#455A64" stroke="${OL}"/><path d="M188,124 v12 M200,124 v12" stroke="#D32F2F" stroke-width="2"/>` + T(194, 150, '¿?', 12, '#D32F2F') + qm(270, 40));

  SI_CONT.temas.push({
    id: 'ta_esmeril', sec: 'taller', emp: ['ali'], title: 'Esmeril angular y de banco: uso seguro', thumb: 'al_ta_esmeril_intro', mins: 20,
    learn: [
      { s: 'al_ta_esmeril_intro', t: 'El esmeril: útil y peligroso', x: 'En la maestranza el esmeril angular se usa todos los días para <b>cortar, desbastar y pulir</b>. Su disco gira a <b>más de 10.000 vueltas por minuto (RPM)</b>: si se rompe, sus pedazos salen como proyectiles. Además lanza chispas y partículas calientes, hace mucho ruido y puede <b>rebotar</b> contra tu cuerpo si el disco se traba. Puede causar cortes profundos, partículas en los ojos, quemaduras y pérdida de audición. Úsalo solo si estás <b>capacitado y autorizado</b>.' },
      { s: 'al_ta_esmeril_disco', t: 'El disco correcto para la tarea', x: '<ul><li>El <b>disco de corte</b> es delgado: solo corta. <b>Nunca desbastes con él</b>, porque se quiebra.</li><li>El <b>disco de desbaste</b> es grueso: para rebajar soldaduras y cantos.</li><li>Las <b>RPM del disco</b> deben ser <b>iguales o mayores</b> que las de la máquina.</li><li>El diámetro debe calzar con la máquina y su guarda: nunca pongas un disco más grande.</li><li>Sin trizaduras ni golpes, seco y dentro de su fecha de vencimiento.</li></ul>', k: 'RPM del disco igual o mayor que la de la máquina, y cada disco para su tarea.' },
      { s: 'al_ta_esmeril_rev', t: 'Revisa antes de enchufar', x: 'Antes de usarlo, revisa:<ul><li><b>Guarda</b> puesta y firme.</li><li><b>Mango lateral</b> atornillado.</li><li>Disco bien apretado con <b>su llave</b>, nunca a golpes.</li><li>Cable, enchufe y carcasa sin daños, sin cinta aislante ni uniones.</li><li>Interruptor que vuelve solo a apagado.</li></ul>Al encenderlo, déjalo girar unos segundos <b>apuntando a un lugar sin personas</b> para ver que no vibra. Si algo falla, no lo uses: avisa a tu jefatura.' },
      { s: 'al_ta_esmeril_epp', t: 'Tu EPP para esmerilar', x: 'Para esmerilar usas <b>siempre</b>:<ul><li><b>Lentes de seguridad</b> y, encima, la <b>careta facial</b>. La careta sola no basta: las partículas entran por los lados.</li><li><b>Protector auditivo</b>.</li><li><b>Guantes de cuero</b>.</li><li>Ropa de trabajo abotonada, con las mangas abajo, y zapatos de seguridad.</li></ul>Las chispas encienden la ropa sintética y los trapos con aceite que lleves en el bolsillo.', k: 'Lentes, careta facial, protector auditivo y guantes: siempre los cuatro.' },
      { s: 'al_ta_esmeril_uso', t: 'Pieza fija y dos manos', x: '<ul><li>La pieza va <b>fija en la prensa</b> o con sargentos: nunca la sujetes con una mano ni con el pie.</li><li>Toma el esmeril con <b>las dos manos</b>, una en el mango lateral.</li><li>Párate firme y con tu cuerpo <b>fuera de la línea del disco</b>, por si rebota.</li><li>Deja que el disco trabaje: no lo fuerces ni lo tuerzas dentro del corte.</li><li>No esmeriles sobre la altura de tus hombros.</li></ul>' },
      { s: 'al_ta_esmeril_chispas', t: 'Hacia dónde van las chispas', x: 'Antes de partir, mira hacia dónde saldrán las chispas. Dirígelas <b>hacia el piso</b>, lejos de:<ul><li><b>Personas</b>: si hay alguien cerca, pon un biombo o una pantalla.</li><li><b>Cilindros de gas, mangueras</b> de oxicorte, pinturas, diluyentes, trapos con aceite y cartones.</li></ul>Ten un extintor a mano. Al terminar, revisa que nada haya quedado humeando.' },
      { s: 'al_ta_esmeril_cambio', t: 'Para cambiar el disco: desenchufa', x: 'Apagar no basta: si el interruptor se queda pegado o alguien lo aprieta, el disco parte en tus manos. Para cambiar el disco o la escobilla:<ul><li><b>Desenchufa</b> el esmeril.</li><li>Usa la <b>llave</b> de la máquina y el bloqueo del eje.</li><li>Revisa el disco nuevo antes de montarlo.</li></ul><b>Nunca saques la guarda</b> para meter un disco más grande ni para "ver mejor".' },
      { s: 'al_ta_esmeril_dejar', t: 'Antes de dejarlo, que se detenga', x: 'El disco sigue girando varios segundos después de soltar el gatillo. Antes de dejar el esmeril:<ul><li><b>Espera que el disco se detenga por completo</b>. No lo frenes con la pieza ni con la mano.</li><li>Déjalo sobre el banco, lejos del borde, nunca en el piso.</li><li>Si vas a moverte o terminaste, desenchúfalo y ordena el cable.</li></ul>Un esmeril que se deja girando "camina" solo y corta lo que encuentra.' },
      { s: 'al_ta_esmeril_banco', t: 'Esmeril de banco', x: '<ul><li>El <b>apoyo</b> (descanso) debe quedar a <b>3 mm o menos</b> de la piedra. Si queda más separado, la pieza se mete entre el apoyo y la piedra y te arrastra la mano.</li><li>Ajusta el apoyo con la máquina <b>detenida y desenchufada</b>.</li><li><b>Pantalla</b> bajada, lentes y careta facial.</li><li>Al encenderlo, ponte a un costado, no de frente a la piedra.</li><li>Piedra sin trizaduras; no esmeriles con su costado. Las piezas pequeñas se toman con un alicate.</li></ul>' }
    ],
    quiz: [
      { s: 'al_ta_esmeril_disco_q', v: [
        { q: 'Tu esmeril angular gira a 11.000 RPM. ¿Qué disco puedes ponerle?', o: ['Uno de 11.000 RPM o más', 'Uno de 8.500 RPM', 'Cualquiera que calce en el eje', 'Uno de menos RPM, porque es más seguro'], w: 'Las RPM del disco deben ser iguales o mayores que las de la máquina. Un disco de menos RPM se puede reventar.' },
        { q: 'Necesitas rebajar un cordón de soldadura y solo tienes un disco de corte. ¿Qué haces?', o: ['Busco un disco de desbaste: el de corte no desbasta', 'Desbasto con el disco de corte, apretando poco', 'Uso el disco de corte de lado, con cuidado', 'Le saco la guarda para ver mejor'], w: 'El disco de corte es delgado y se quiebra si se usa de lado para desbastar. Cada disco para su tarea.' },
        { q: 'Se puede usar un disco de corte para desbastar si se aprieta suave.', vf: false, w: 'Falso. El disco de corte no resiste fuerzas de lado: se quiebra y sus pedazos salen disparados.' }] },
      { s: 'al_ta_esmeril_q_epp', v: [
        { q: 'Vas a esmerilar un cordón de soldadura. ¿Qué EPP usas?', o: ['Lentes, careta facial, protector auditivo y guantes de cuero', 'Solo la careta facial, que tapa toda la cara', 'Lentes y guantes; el protector auditivo es opcional', 'Careta de soldar y guantes de goma'], w: 'Para esmerilar: lentes de seguridad y careta facial encima, protector auditivo y guantes de cuero, con ropa abotonada.' },
        { q: 'Un compañero esmerila con careta facial pero sin lentes. ¿Qué le dices?', o: ['Que use lentes bajo la careta: las partículas entran por los lados', 'Nada, la careta protege más que los lentes', 'Que se saque la careta y use solo lentes', 'Que trabaje más rápido para exponerse menos'], w: 'La careta facial se usa encima de los lentes, nunca en lugar de ellos.' },
        { q: 'Con la careta facial puesta no es necesario usar lentes de seguridad.', vf: false, w: 'Falso. La careta va sobre los lentes: las partículas pueden entrar por abajo y por los lados.' }] },
      { s: 'al_ta_esmeril_q_uso', v: [
        { q: 'Debes cortar un perfil corto. ¿Cómo lo sujetas?', o: ['Fijo en la prensa o con sargentos', 'Con una mano, y con la otra el esmeril', 'Con el pie, apoyado en el piso', 'Que un compañero lo sostenga con guantes'], w: 'La pieza va fija en la prensa o con sargentos, y el esmeril con las dos manos.' },
        { q: '¿Para qué sirve el mango lateral del esmeril?', o: ['Para tomarlo firme con las dos manos y controlar un rebote', 'Para colgarlo en el banco al terminar', 'Para cambiar el disco sin llave', 'Para usarlo con una sola mano'], w: 'Con las dos manos controlas el esmeril si el disco se traba y rebota.' },
        { q: 'Estás cortando y el disco se empieza a trabar dentro del corte. ¿Qué haces?', o: ['Suelto el gatillo, espero que se detenga y reviso', 'Lo tuerzo para soltarlo con fuerza', 'Aprieto más fuerte para terminar el corte', 'Lo saco del corte con el disco girando y sigo'], w: 'Si el disco se traba puede rebotar o quebrarse: suelta el gatillo, espera que se detenga y revisa el corte y el disco.' }] },
      { s: 'al_ta_esmeril_q_chispas', v: [
        { q: 'Vas a esmerilar y cerca hay un cilindro de acetileno y un bidón de diluyente. ¿Qué haces?', o: ['Los alejo o cambio de lugar y dirijo las chispas al piso', 'Esmerilo rápido para que no alcancen a saltar chispas', 'Tapo los envases con un trapo y trabajo', 'Dirijo las chispas hacia arriba, lejos del piso'], w: 'Las chispas encienden gases, diluyentes y trapos. Se retira lo inflamable o se cambia de lugar, y las chispas van hacia el piso.' },
        { q: 'Un compañero trabaja a dos metros, justo donde saldrán tus chispas. ¿Qué haces?', o: ['Pongo un biombo o pantalla, o cambio la dirección', 'Le aviso y empiezo igual', 'Esmerilo apuntando hacia él, pero con poca fuerza', 'Espero que se ponga lentes y parto'], w: 'Las chispas y partículas nunca se dirigen a personas: se cambia la dirección o se protege con biombo o pantalla.' },
        { q: 'Al terminar de esmerilar se debe revisar que nada haya quedado humeando.', vf: true, w: 'Verdadero. Una chispa puede quedar encendida en un trapo o cartón y prender después.' }] },
      { s: 'al_ta_esmeril_q_cambio', v: [
        { q: 'Vas a cambiar el disco del esmeril. ¿Qué haces primero?', o: ['Lo desenchufo', 'Lo apago y saco el disco de inmediato', 'Le saco la guarda para trabajar cómodo', 'Lo dejo encendido para que el eje suelte'], w: 'Apagar no basta: se desenchufa antes de cambiar el disco, y se usa la llave de la máquina.' },
        { q: 'El disco nuevo es más grande que la guarda. ¿Qué haces?', o: ['No lo uso: busco el disco del diámetro correcto', 'Saco la guarda y lo monto', 'Corto un pedazo de la guarda', 'Lo uso con cuidado, solo un rato'], w: 'Nunca se saca ni se corta la guarda. Se usa el disco del diámetro que corresponde a la máquina.' },
        { q: 'Si el esmeril está apagado, se puede cambiar el disco sin desenchufarlo.', vf: false, w: 'Falso. Si alguien aprieta el interruptor, el disco parte en tus manos: siempre se desenchufa.' }] },
      { s: 'al_ta_esmeril_q_dejar', v: [
        { q: 'Terminaste un corte. ¿Cuándo puedes dejar el esmeril?', o: ['Cuando el disco se detuvo por completo', 'Apenas suelto el gatillo', 'Cuando el disco va más lento', 'En cualquier momento, si lo dejo en el piso'], w: 'El disco sigue girando después de soltar el gatillo: espera que se detenga y déjalo en el banco.' },
        { q: '¿Dónde dejas el esmeril cuando terminas de usarlo?', o: ['En el banco, lejos del borde, ya detenido', 'En el piso, junto a la pieza', 'Colgado de su cable', 'Sobre la pieza que estaba cortando'], w: 'Se deja detenido, sobre el banco y lejos del borde; si terminaste, desenchufado.' },
        { q: 'Se puede frenar el disco apoyándolo en la pieza para ahorrar tiempo.', vf: false, w: 'Falso. Frenar el disco con la pieza puede quebrarlo o hacerlo rebotar: se espera que se detenga solo.' }] },
      { s: 'al_ta_esmeril_q_banco', v: [
        { q: '¿A qué distancia de la piedra va el apoyo del esmeril de banco?', o: ['A 3 mm o menos', 'A 1 centímetro', 'A 5 centímetros', 'La que acomode a cada uno'], w: 'Con más de 3 mm la pieza se mete entre el apoyo y la piedra y te arrastra la mano.' },
        { q: 'Ves que el apoyo del esmeril de banco quedó muy separado de la piedra. ¿Qué haces?', o: ['Lo ajusto con la máquina detenida y desenchufada', 'Lo ajusto con la piedra girando para ver la distancia', 'Esmerilo igual, apretando la pieza contra la piedra', 'Esmerilo con el costado de la piedra'], w: 'El apoyo se ajusta a 3 mm o menos, con la máquina detenida y desenchufada.' },
        { q: 'Al encender el esmeril de banco conviene pararse a un costado y no de frente a la piedra.', vf: true, w: 'Verdadero. Si una piedra trizada se rompe al partir, sus pedazos salen hacia el frente.' }] }
    ]
  });

  // ======================================================================
  // 2. GRÚA HORQUILLA: CONVIVIR CON ELLA
  // ======================================================================
  const fondoGrua = () => H.fondo.taller({ vias: false }) + viaPeatonal(0, 320) + T(300, 182, 'VÍA PEATONAL', 7, '#8D6E00', 'end');
  S.al_ta_horquilla_intro = () => svg(H.fondo.patio() + `<g class="adMov" style="--dx:-30px">` + horqF(120, 180, { carga: H.palletPiezas(193, 166) }) + `</g>` + W(40, 180, { pose: 'stop', vest: true }) + pl(214, 6, 'Varias toneladas de máquina', '#D7262B', 10) + pl(250, 186, 'Solo operadores autorizados', '#263238', 10));
  S.al_ta_horquilla_autorizado = () => svg(H.fondo.taller() + H.horquilla(30, 165, { op: false, baliza: false }) + `<rect x="58" y="78" width="24" height="12" rx="2" fill="#263238"/>` + W(190, 165, { pose: 'point', flip: true }) + H.no(186, 60) + doc(234, 40, 'AUTORIZADO', 'Licencia clase D', '#2E7D32', 70, 86) + H.si(296, 136) + pl(90, 176, 'No la enciendas ni la muevas', '#D7262B', 10));
  S.al_ta_horquilla_contacto = () => svg(fondoGrua() + horqF(160, 165, {}) + W(80, 178, { pose: 'stop' }) + `<path d="M96,95 q60,-30 104,-5" stroke="#2E7D32" stroke-width="2.4" stroke-dasharray="5 4" fill="none"/><circle cx="96" cy="95" r="3" fill="#2E7D32"/><circle cx="200" cy="90" r="3" fill="#2E7D32"/>` + pl(140, 50, 'Me ve y me hace una seña', '#2E7D32', 10) + H.si(30, 40));
  S.al_ta_horquilla_q_contacto = () => svg(fondoGrua() + horqF(160, 165, {}) + W(80, 178, { pose: 'walk' }) + qm(110, 46));
  S.al_ta_horquilla_ciegos = () => svg(H.fondo.liso('#DDE3E7') + `<path d="M160,96 L320,40 V160 Z" fill="#FF9800" opacity=".18"/><path d="M110,96 L0,30 V0 H320 V40 Z" fill="#D32F2F" opacity=".12"/><path d="M110,104 L0,170 V200 H320 V160 Z" fill="#D32F2F" opacity=".12"/>`
    + `<g transform="translate(160,100) rotate(0)"><rect x="-60" y="-24" width="90" height="48" rx="6" fill="${H.ALI1}" stroke="${OL}" stroke-width="1.6"/><rect x="-70" y="-20" width="12" height="40" rx="2" fill="${H.ALI2}" stroke="${OL}"/><rect x="-24" y="-16" width="30" height="32" rx="3" fill="#455A64"/><circle cx="-10" cy="0" r="7" fill="#F5D0B0" stroke="${OL}"/><rect x="30" y="-28" width="8" height="56" fill="#455A64"/><rect x="38" y="-20" width="44" height="7" fill="#263238"/><rect x="38" y="13" width="44" height="7" fill="#263238"/><rect x="44" y="-26" width="34" height="52" fill="#A1887F" stroke="#5D4037"/></g>`
    + pl(50, 40, 'Punto ciego', '#D7262B', 10) + pl(50, 150, 'Punto ciego', '#D7262B', 10) + pl(262, 22, 'Carga alta: tapa la vista', '#E65100', 9) + pl(100, 180, 'Al girar, la parte trasera se abre hacia el lado', '#263238', 9) + `<path d="M84,128 q-14,16 -36,12" stroke="#263238" stroke-width="2" fill="none" marker-end=""/><path d="M48,140 l6,-6 M48,140 l8,3" stroke="#263238" stroke-width="2"/>`);
  S.al_ta_horquilla_alarma = () => svg(H.fondo.taller() + horqF(140, 165, {}) + ondas(232, 140, 1) + `<rect x="160" y="54" width="10" height="10" rx="2" fill="#FF9800" class="al40b"/>` + W(40, 165, { pose: 'stop', muffs: 'on' }) + pl(170, 30, 'Baliza encendida', '#E65100', 10) + pl(270, 178, 'Alarma de retroceso', '#E65100', 9) + pl(70, 182, 'Con fonos: mira, no solo escuches', '#1565C0', 9));
  S.al_ta_horquilla_via = () => svg(fondoGrua() + `<rect x="0" y="150" width="320" height="15" fill="#9EA7AD"/>` + horqF(196, 165, {}) + W(50, 186, { pose: 'walk' }) + W(110, 186, { pose: 'walk' }) + disco5(270, 40, 20) + pl(96, 30, 'Por la vía peatonal, sin celular', '#2E7D32', 10) + H.si(30, 70));
  S.al_ta_horquilla_carga = () => svg(H.fondo.taller() + H.horquilla(30, 165, { alto: 80, carga: H.palletPiezas(103, 85) }) + H.zonaCarga(98, 50) + W(122, 165, { pose: 'walk', face: 'worried' }) + H.no(132, 30) + div(186) + W(258, 165, { pose: 'stop', flip: true }) + H.si(292, 30) + pl(110, 182, 'Bajo la carga', '#D7262B', 10) + pl(256, 182, 'A distancia, que pase', '#2E7D32', 10));
  S.al_ta_horquilla_q_carga = () => svg(H.fondo.taller() + H.horquilla(30, 165, { alto: 80, carga: H.palletPiezas(103, 85) }) + W(220, 165, { pose: 'walk', flip: true }) + qm(250, 40));
  S.al_ta_horquilla_subir = () => svg(H.fondo.taller() + H.horquilla(40, 165, { alto: 70, carga: `<rect x="113" y="95" width="38" height="5" fill="#A1887F" stroke="#5D4037"/>` + W(132, 95, { pose: 'c4reach' }) }) + H.no(250, 40) + pl(240, 160, 'Nunca elevado en las horquillas', '#D7262B', 10));
  S.al_ta_horquilla_q_subir = () => svg(H.fondo.taller() + H.horquilla(30, 165, { alto: 14 }) + `<line x1="230" y1="22" x2="230" y2="40" stroke="#455A64" stroke-width="2"/><path d="M214,40 h32 l8,10 h-48z" fill="#ECEFF1" stroke="${OL}"/>` + W(160, 165, { pose: 'point' }) + qm(240, 120));

  SI_CONT.temas.push({
    id: 'ta_horquilla', sec: 'taller', emp: ['ali'], title: 'Grúa horquilla: cómo convivir con ella', thumb: 'al_ta_horquilla_intro', mins: 15,
    learn: [
      { s: 'al_ta_horquilla_intro', t: 'Una máquina pesada entre nosotros', x: 'La grúa horquilla mueve planchas, vigas y piezas por el taller y el patio. Pesa <b>varias toneladas</b>, más que un auto, y con carga necesita más distancia para frenar. El operador ve poco: la carga y el mástil le tapan la vista. Un atropello o un aplastamiento con una grúa horquilla puede ser <b>mortal</b>. Esta charla es para quienes caminan y trabajan cerca de ella: <b>todos</b>.' },
      { s: 'al_ta_horquilla_autorizado', t: 'Solo la manejan operadores autorizados', x: 'La grúa horquilla la opera <b>solo quien está capacitado y autorizado</b> por la empresa, con su licencia de conducir clase D al día. Si no lo estás:<ul><li>No la enciendas ni la muevas "un poquito".</li><li>No te subas a la cabina.</li><li>No le pidas al operador que levante más carga de la que soporta la máquina.</li></ul>Si ves la llave puesta y la grúa sola, avisa a tu jefatura.', k: 'Si no estás autorizado, no la manejas: ni un metro.' },
      { s: 'al_ta_horquilla_contacto', t: 'Que el operador te vea', x: 'Antes de cruzar por delante o por detrás de la grúa:<ul><li><b>Detente</b> a distancia.</li><li>Busca el <b>contacto visual</b> con el operador.</li><li>Espera su <b>seña</b> para pasar.</li></ul>Si no te mira, <b>no pases</b>: nunca supongas que te vio. Tampoco te acerques por detrás para hablarle: haz que te vea primero y espera que detenga la máquina.' },
      { s: 'al_ta_horquilla_ciegos', t: 'Puntos ciegos', x: 'El operador <b>no ve</b>:<ul><li>Detrás de la máquina, sobre todo bajo el contrapeso.</li><li>Junto al mástil y a los lados de la carga.</li><li>Delante, cuando lleva una carga alta.</li></ul>La grúa horquilla <b>dobla con las ruedas de atrás</b>: al girar, la parte trasera se abre hacia el lado y puede golpearte aunque estés al costado. Mantén distancia por todos lados.' },
      { s: 'al_ta_horquilla_alarma', t: 'Baliza y alarma de retroceso', x: 'La <b>baliza</b> encendida y la <b>alarma de retroceso</b> te avisan que la grúa está operando. Cuando las veas u oigas, <b>aléjate y busca el contacto visual</b>. Con el protector auditivo puesto o con el ruido del taller puedes no oír la alarma: <b>mira siempre</b> antes de cruzar. Si la baliza o la alarma de una grúa no funcionan, avisa a tu jefatura.' },
      { s: 'al_ta_horquilla_via', t: 'Vías peatonales y 5 km/h', x: '<ul><li>Camina por las <b>vías peatonales</b> demarcadas.</li><li>En los cruces y donde hay poca visibilidad, <b>detente y mira</b> si viene un equipo.</li><li>Dentro de la empresa, la velocidad máxima de los vehículos es <b>5 km/h</b>.</li><li>No uses el celular mientras caminas por zonas de tránsito.</li><li>No te quedes conversando en los pasillos por donde pasa la grúa.</li></ul>' },
      { s: 'al_ta_horquilla_carga', t: 'Lejos de la carga y del mástil', x: '<ul><li><b>Nunca pases ni te pares bajo las horquillas</b> elevadas ni bajo la carga: puede caer.</li><li>No te acerques al <b>mástil</b>: sus cadenas y partes que suben y bajan atrapan las manos.</li><li>No acomodes la carga con las manos mientras la grúa se mueve: pide que se detenga.</li><li>Si la carga se ve inestable o mal amarrada, aléjate y avisa.</li></ul>' },
      { s: 'al_ta_horquilla_subir', t: 'Las horquillas no son para personas', x: 'Está <b>prohibido</b>:<ul><li>Subirse a las horquillas, al pallet o a la carga.</li><li>Ser elevado en las horquillas para alcanzar algo en altura.</li><li>Viajar como acompañante en la grúa.</li></ul>Para trabajar en altura se usan escalas, andamios o plataformas hechas para eso. Una persona elevada en las horquillas puede caer o quedar atrapada en el mástil.', k: 'Las horquillas son para cargas, nunca para personas.' }
    ],
    quiz: [
      { s: 'al_ta_horquilla_autorizado', v: [
        { q: 'La grúa horquilla tapa la salida de tu área y el operador no está. ¿Qué haces?', o: ['Aviso a mi jefatura o espero al operador', 'La muevo un par de metros con cuidado', 'Le pido a un compañero que la mueva', 'La empujo en neutro con otros compañeros'], w: 'Solo la opera quien está capacitado y autorizado. Nadie más la mueve, aunque sea un poco.' },
        { q: '¿Quién puede operar la grúa horquilla en la maestranza?', o: ['Solo el operador capacitado y autorizado por la empresa', 'Cualquier trabajador con licencia de auto', 'El trabajador más antiguo del taller', 'Quien la necesite en ese momento'], w: 'Solo la maneja quien está capacitado y autorizado por la empresa, con su licencia clase D al día.' },
        { q: 'Si la maniobra es corta, un trabajador sin autorización puede mover la grúa horquilla.', vf: false, w: 'Falso. Sin capacitación ni autorización no se opera ningún equipo, ni siquiera un metro.' }] },
      { s: 'al_ta_horquilla_q_contacto', v: [
        { q: 'Debes cruzar por delante de una grúa horquilla que está maniobrando. ¿Qué haces?', o: ['Me detengo, busco contacto visual y espero su seña', 'Cruzo rápido mientras retrocede', 'Cruzo si escucho la alarma de retroceso', 'Le grito y cruzo de inmediato'], w: 'Te detienes a distancia, buscas los ojos del operador y esperas su seña. Si no te ve, no pasas.' },
        { q: 'Miras al operador de la grúa, pero él no te mira. ¿Qué haces?', o: ['No paso: espero que me vea y me haga una seña', 'Paso, porque seguro me vio antes', 'Paso por detrás de la grúa', 'Me acerco a tocarle el hombro'], w: 'Nunca supongas que el operador te vio. Sin contacto visual, no se pasa.' },
        { q: 'Antes de cruzar cerca de una grúa horquilla debes tener contacto visual con el operador.', vf: true, w: 'Verdadero. Es la única forma de saber que te vio.' }] },
      { s: 'al_ta_horquilla_ciegos', v: [
        { q: '¿Por qué es peligroso caminar al costado de una grúa horquilla que va a girar?', o: ['Porque dobla con las ruedas de atrás y la parte trasera se abre hacia el lado', 'Porque las horquillas suben solas al girar', 'Porque al girar se apaga la baliza', 'Porque gira solo hacia la izquierda'], w: 'La grúa horquilla dobla con las ruedas traseras: al girar, la cola se abre y puede golpearte aunque estés al costado.' },
        { q: '¿Dónde tiene puntos ciegos el operador de la grúa horquilla?', o: ['Detrás, junto al mástil y delante cuando lleva carga alta', 'Solo detrás de la máquina', 'En ningún lado, si usa los espejos', 'Solo cuando va sin carga'], w: 'El operador no ve detrás, junto al mástil ni delante cuando la carga le tapa la vista.' },
        { q: 'Si estás al costado de la grúa horquilla, no te puede golpear al girar.', vf: false, w: 'Falso. Al girar, la parte trasera se abre hacia el lado.' }] },
      { s: 'al_ta_horquilla_alarma', v: [
        { q: 'Estás con protector auditivo y no escuchas bien. ¿Cómo te cuidas de la grúa horquilla?', o: ['Miro siempre antes de cruzar y busco la baliza', 'Me saco el protector auditivo para escuchar', 'Camino rápido por el centro del taller', 'Confío en que el operador me esquivará'], w: 'Con el protector puesto puedes no oír la alarma: mira siempre, busca la baliza y el contacto visual.' },
        { q: 'Notas que una grúa horquilla retrocede sin su alarma sonando. ¿Qué haces?', o: ['Aviso a mi jefatura para que la revisen', 'Nada, porque la baliza funciona', 'La desconecto yo mismo', 'Le pido al operador que toque la bocina siempre'], w: 'La baliza y la alarma de retroceso son avisos de seguridad: si fallan, se avisa para que se reparen.' },
        { q: 'Al escuchar la alarma de retroceso, ¿qué haces?', o: ['Me alejo y busco el contacto visual con el operador', 'Cruzo por detrás antes de que avance', 'Sigo trabajando, es un ruido normal', 'Me quedo quieto detrás de la grúa'], w: 'La alarma te avisa que la grúa retrocede: aléjate y haz que el operador te vea.' }] },
      { s: 'al_ta_horquilla_via', v: [
        { q: '¿Cuál es la velocidad máxima de los vehículos dentro de la empresa?', o: ['5 km/h', '20 km/h', '10 km/h', '30 km/h'], w: 'Dentro de Maestranza ALI la velocidad máxima es 5 km/h.' },
        { q: 'Llegas a un cruce del taller con poca visibilidad. ¿Qué haces?', o: ['Me detengo y miro si viene algún equipo', 'Cruzo rápido para no estorbar', 'Cruzo mirando el celular, por la vía peatonal', 'Silbo y cruzo'], w: 'En los cruces con poca visibilidad te detienes y miras si vienen equipos móviles.' },
        { q: 'Se puede usar el celular mientras se camina por una zona de tránsito de la grúa.', vf: false, w: 'Falso. En las zonas de tránsito vas atento al entorno, sin celular.' }] },
      { s: 'al_ta_horquilla_q_carga', v: [
        { q: 'La grúa tiene la carga levantada y debes pasar al otro lado. ¿Qué haces?', o: ['Espero a distancia o rodeo, nunca paso bajo la carga', 'Paso rápido por debajo', 'Paso agachado bajo las horquillas', 'Paso si el operador está mirando'], w: 'Nunca se pasa ni se para bajo las horquillas elevadas ni bajo la carga: puede caer.' },
        { q: 'Una pieza se ve mal puesta sobre las horquillas mientras la grúa avanza. ¿Qué haces?', o: ['Me alejo y le hago señas al operador para que se detenga', 'Me acerco a acomodarla con las manos', 'Camino al lado sujetándola', 'Me subo a la carga para equilibrarla'], w: 'No se acomoda la carga con la grúa en movimiento: se le pide que se detenga y se resuelve con la máquina detenida.' },
        { q: '¿Por qué no debes acercarte al mástil de la grúa horquilla?', o: ['Sus cadenas y partes móviles atrapan las manos', 'Porque está muy caliente', 'Porque ahí va el estanque de combustible', 'Porque se ensucia la ropa con grasa'], w: 'El mástil tiene cadenas y partes que suben y bajan: pueden atrapar manos y brazos.' }] },
      { s: 'al_ta_horquilla_q_subir', v: [
        { q: 'Necesitas revisar una luminaria alta y la grúa horquilla está cerca. ¿Qué haces?', o: ['Uso una escala, andamio o plataforma adecuada', 'Me subo a las horquillas y pido que me eleven', 'Me subo a un pallet sobre las horquillas', 'Me paro sobre el techo de la cabina'], w: 'Las horquillas son para cargas, nunca para personas. Para la altura se usan equipos hechos para eso.' },
        { q: 'Un compañero te ofrece llevarte sentado en la grúa horquilla hasta el patio. ¿Qué haces?', o: ['No acepto: está prohibido viajar como acompañante', 'Acepto si va despacio', 'Acepto y me sujeto del mástil', 'Acepto si voy en las horquillas'], w: 'En la grúa horquilla solo va el operador. Nadie viaja como acompañante ni en las horquillas.' },
        { q: 'Se puede elevar a una persona en las horquillas si el trabajo es rápido.', vf: false, w: 'Falso. Nunca se eleva a una persona en las horquillas: puede caer o quedar atrapada.' }] }
    ]
  });

  // ======================================================================
  // 3. IZAJE CON PUENTE GRÚA Y TECLE
  // ======================================================================
  const botonera = (xg, x2, y2) => `<path d="M${xg + 12},50 Q${(xg + x2) / 2},${(50 + y2) / 2 + 20} ${x2},${y2 - 8}" stroke="#263238" stroke-width="1.4" fill="none"/><rect x="${x2 - 4}" y="${y2 - 10}" width="9" height="20" rx="2" fill="#FFC20E" stroke="${OL}"/><circle cx="${x2 + .5}" cy="${y2 - 4}" r="1.6" fill="#2E7D32"/><circle cx="${x2 + .5}" cy="${y2 + 2}" r="1.6" fill="#D32F2F"/>`;
  const cuerdaGuia = (x1, y1, x2, y2) => `<path d="M${x1},${y1} Q${(x1 + x2) / 2},${Math.max(y1, y2) + 18} ${x2},${y2}" stroke="#F9A825" stroke-width="2.4" fill="none"/>`;
  S.al_ta_izaje_intro = () => { const op = { pose: 'point' }, [hx, hy] = pt(40, 165, op, 'hR');
    return svg(H.fondo.taller() + H.puenteGrua(170, 90, `<g class="al40s" style="transform-origin:170px 100px">` + H.eslinga(170, 100, 125, 215, 128) + H.viga(110, 142, 120, 14) + `</g>`) + H.zonaCarga(120, 100) + W(40, 165, op) + botonera(170, hx + 2, hy + 4) + pl(250, 60, 'Carga suspendida', '#D7262B', 10) + pl(170, 182, 'Nadie bajo la carga', '#D7262B', 10)); };
  S.al_ta_izaje_revisar = () => svg(H.fondo.liso() + eslingaBanda(14, 40, 120) + pl(74, 58, 'Etiqueta legible', '#2E7D32', 9) + eslingaBanda(14, 108, 120, true) + pl(74, 126, 'Cortes y quemaduras', '#D7262B', 9) + H.si(150, 40, 11) + H.no(150, 108, 11)
    + grillete(206, 66) + H.si(240, 40, 11) + grillete(276, 66, 1, true) + H.no(306, 40, 11) + gancho(226, 160) + H.si(250, 120, 11) + gancho(290, 160, 1, false) + H.no(310, 120, 11) + pl(160, 178, 'Lo dañado se retira y se avisa', '#263238', 10));
  S.al_ta_izaje_q_revisar = () => svg(H.fondo.liso() + gancho(90, 150, 2, false) + eslingaBanda(160, 70, 140, true) + qm(250, 140));
  S.al_ta_izaje_capacidad = () => svg(H.fondo.taller() + H.puenteGrua(160, 70, H.eslinga(160, 80, 110, 210, 136) + H.viga(80, 150, 160, 14)) + `<rect x="136" y="36" width="48" height="14" fill="#fff" stroke="${OL}"/>` + T(160, 47, '5 t', 10, '#D32F2F') + `<path d="M150,94 a14,14 0 0 0 20,0" stroke="#1565C0" stroke-width="2" fill="none"/>` + T(160, 112, '≤ 90°', 10, '#1565C0') + pl(70, 100, 'Peso de la carga', '#263238', 9) + pl(270, 100, 'Capacidad rotulada', '#263238', 9) + pl(160, 180, 'Dentro de la capacidad de todo el equipo', '#2E7D32', 10));
  S.al_ta_izaje_equilibrio = () => svg(H.fondo.taller() + H.puenteGrua(160, 60, H.eslinga(160, 70, 110, 210, 120) + H.viga(80, 134, 160, 14)) + `<path d="M104,120 h12 v6 M204,120 h12 v6" stroke="#FFC20E" stroke-width="5" fill="none"/>` + `<path d="M160,134 v20 M152,146 l8,8 l8,-8" stroke="#2E7D32" stroke-width="2.5" fill="none"/>` + pl(160, 160, 'Sube unos centímetros y revisa', '#2E7D32', 10) + pl(60, 92, 'Protector de canto', '#E65100', 9) + pl(270, 92, 'Gancho al centro', '#1565C0', 9));
  S.al_ta_izaje_senalero = () => { const sp = { pose: 'stop', vest: true }; return svg(H.fondo.taller() + H.puenteGrua(220, 80, H.eslinga(220, 90, 180, 260, 120) + H.viga(170, 134, 100, 14)) + W(60, 165, sp) + W(120, 165, { pose: 'point', face: 'worried' }) + H.no(130, 70, 11) + pl(60, 180, 'Un solo señalero', '#2E7D32', 10) + pl(222, 180, 'Cualquiera puede dar la PARADA', '#D32F2F', 9)); };
  S.al_ta_izaje_bajo = () => svg(H.fondo.taller() + H.puenteGrua(100, 70, H.eslinga(100, 80, 60, 140, 112) + H.viga(40, 126, 120, 14)) + H.zonaCarga(40, 120) + W(100, 165, { pose: 'walk', face: 'worried' }) + H.no(30, 60, 12) + div(186) + W(270, 165, { pose: 'stop', flip: true }) + H.si(296, 60, 12) + cinta(200, 240, 140) + cono(200, 165, .8) + cono(240, 165, .8) + pl(250, 30, 'Zona delimitada', '#2E7D32', 10));
  S.al_ta_izaje_q_bajo = () => svg(H.fondo.taller() + H.puenteGrua(150, 70, H.eslinga(150, 80, 110, 190, 112) + H.viga(90, 126, 120, 14)) + W(40, 165, { pose: 'walk' }) + qm(270, 60));
  S.al_ta_izaje_guia = () => { const g = { pose: 'carry', flip: true, gloves: '#8D6E63' }, [hx, hy] = pt(280, 165, g, 'hR');
    return svg(H.fondo.taller() + H.puenteGrua(150, 60, H.eslinga(150, 70, 100, 200, 104) + H.viga(80, 118, 140, 14)) + H.zonaCarga(80, 140) + cuerdaGuia(220, 110, hx, hy) + W(280, 165, g) + `<rect x="100" y="150" width="20" height="10" fill="#8D6E63"/><rect x="180" y="150" width="20" height="10" fill="#8D6E63"/>` + pl(250, 30, 'Cuerda guía, desde fuera', '#2E7D32', 10) + pl(150, 140, 'Tacos para bajarla', '#455A64', 9)); };
  S.al_ta_izaje_tecle = () => { const p = { pose: 'stand' }; return svg(H.fondo.taller() + portico(90, 250) + H.tecle(170, 38, 50) + H.eslinga(170, 108, 140, 200, 130) + `<rect x="130" y="130" width="80" height="22" rx="3" fill="#78909C" stroke="${OL}"/>` + `<path d="M150,152 v8 h40 v-8" fill="#8D6E63"/>` + W(40, 165, p) + `<path d="M162,54 Q120,100 60,120" stroke="#455A64" stroke-width="2" stroke-dasharray="3 2" fill="none"/>` + pl(170, 182, 'Nunca dejes la carga colgando sola', '#D7262B', 10) + pl(258, 6, 'Capacidad rotulada', '#263238', 9)); };
  S.al_ta_izaje_q_tecle = () => svg(H.fondo.taller() + portico(90, 250) + H.tecle(170, 38, 50) + H.eslinga(170, 108, 140, 200, 130) + `<rect x="130" y="130" width="80" height="22" rx="3" fill="#78909C" stroke="${OL}"/>` + W(40, 165, { pose: 'walk', flip: true }) + qm(270, 120));

  SI_CONT.temas.push({
    id: 'ta_izaje', sec: 'taller', emp: ['ali'], title: 'Izaje con puente grúa y tecle', thumb: 'al_ta_izaje_intro', mins: 20,
    learn: [
      { s: 'al_ta_izaje_intro', t: 'Cargas que pesan toneladas', x: 'Con el puente grúa y los tecles levantamos vigas, planchas y piezas que pesan cientos o miles de kilos. Si una eslinga se corta, un gancho se suelta o la carga gira, puede <b>aplastar, golpear o atrapar</b> a una persona. El puente grúa y los tecles los opera <b>solo personal capacitado y autorizado</b>. Si no lo estás, no tomes la botonera.' },
      { s: 'al_ta_izaje_revisar', t: 'Revisa los elementos de izaje', x: 'Antes de cada izaje revisa:<ul><li><b>Eslingas</b> con su <b>etiqueta</b> de capacidad legible, sin cortes, quemaduras, costuras rotas ni nudos; las de cable, sin hilos cortados ni aplastamientos.</li><li><b>Grilletes</b> sin deformaciones y con <b>su perno original</b>, nunca un perno cualquiera.</li><li><b>Ganchos</b> con su <b>pestillo de seguridad</b> que cierra solo.</li></ul>Lo dañado <b>no se repara con amarras</b>: se retira, se marca y se avisa.' },
      { s: 'al_ta_izaje_capacidad', t: 'Conoce el peso y la capacidad', x: '<ul><li>Antes de levantar, conoce el <b>peso de la carga</b>: pregúntalo o búscalo en el plano.</li><li>La carga debe estar dentro de la <b>capacidad rotulada</b> del puente grúa, del tecle, de las eslingas y de los grilletes. Manda el elemento más débil.</li><li>Mientras más abiertos quedan los ramales de la eslinga, más fuerza recibe cada uno: usa eslingas largas para que el ángulo entre ellos <b>no pase de 90°</b>.</li></ul>' },
      { s: 'al_ta_izaje_equilibrio', t: 'Carga equilibrada y cantos protegidos', x: '<ul><li>Pon el gancho <b>sobre el centro</b> de la carga para que suba pareja.</li><li>Los <b>cantos vivos</b> de planchas y perfiles cortan una eslinga en segundos: protégelos con cantoneras o protectores.</li><li>Levanta <b>unos centímetros</b>, detente y revisa que la carga esté equilibrada y que el freno sujete.</li><li>No cargues en la punta del gancho.</li></ul>' },
      { s: 'al_ta_izaje_senalero', t: 'Un solo señalero', x: 'Cuando el operador no ve bien la carga, lo guía <b>una sola persona</b>: el señalero, con señas claras que ambos conocen. Si varios dan instrucciones, el operador se confunde. Hay una excepción: <b>la señal de PARADA la puede dar cualquiera</b> que vea un peligro, y el operador se detiene de inmediato.' },
      { s: 'al_ta_izaje_bajo', t: 'Nadie bajo la carga', x: '<ul><li><b>Nunca te pongas bajo una carga suspendida</b> ni en su recorrido.</li><li>Delimita la zona con cinta o conos y avisa a quienes trabajan cerca.</li><li>El operador no pasa cargas sobre las personas: si alguien está en el camino, se detiene.</li><li>Nadie se sube a la carga para equilibrarla ni viaja sobre ella.</li></ul>', k: 'Bajo una carga suspendida no se pone nadie, nunca.' },
      { s: 'al_ta_izaje_guia', t: 'Guía con cuerda, no con las manos', x: '<ul><li>Para que la carga no gire, guíala con una <b>cuerda guía</b> desde fuera de la zona de caída.</li><li>Al tensar las eslingas, saca las manos de entre la eslinga y la carga: es un <b>punto de atrapamiento</b>.</li><li>Baja la carga sobre <b>tacos o durmientes</b>, para retirar la eslinga sin dejar los dedos debajo.</li></ul>' },
      { s: 'al_ta_izaje_tecle', t: 'Tecles y al terminar', x: '<ul><li>Usa el tecle dentro de su <b>capacidad rotulada</b>, con tiro vertical: nunca arrastres cargas en diagonal.</li><li><b>Nunca dejes una carga colgando sola</b>: si debes irte, bájala y apóyala.</li><li>Al terminar: gancho arriba, sin eslingas colgando, botonera en su lugar.</li><li>Si el freno patina, la cadena salta o se oyen ruidos raros, detén el trabajo y avisa a tu jefatura.</li></ul>' }
    ],
    quiz: [
      { s: 'al_ta_izaje_q_revisar', v: [
        { q: 'Vas a usar una eslinga y ves que su etiqueta no se lee y tiene un corte. ¿Qué haces?', o: ['No la uso: la retiro, la marco y aviso', 'La uso para una carga liviana', 'La reparo con una amarra plástica', 'La uso doblada para que aguante más'], w: 'Una eslinga sin etiqueta legible o con cortes se retira, se marca y se avisa.' },
        { q: 'El gancho del tecle no tiene pestillo de seguridad. ¿Qué haces?', o: ['No lo uso y aviso para que se repare', 'Lo uso y amarro la eslinga con alambre', 'Lo uso si la carga sube despacio', 'Lo uso si nadie está cerca'], w: 'Sin pestillo, la eslinga se puede salir del gancho. El gancho debe tener su seguro que cierra solo.' },
        { q: 'Se puede reemplazar el perno de un grillete por un perno cualquiera del mismo grosor.', vf: false, w: 'Falso. El grillete se usa con su perno original: otro perno puede cortarse o soltarse.' }] },
      { s: 'al_ta_izaje_capacidad', v: [
        { q: 'El puente grúa es de 5 toneladas y la eslinga de 2 toneladas. ¿Cuánto puedes levantar?', o: ['Hasta 2 toneladas: manda el elemento más débil', 'Hasta 5 toneladas', 'Hasta 7 toneladas', 'Lo que indique el operador a ojo'], w: 'La carga debe estar dentro de la capacidad de todos los elementos: manda el más débil.' },
        { q: '¿Qué pasa si los ramales de la eslinga quedan muy abiertos?', o: ['Cada ramal recibe más fuerza y se puede cortar', 'La carga queda más estable y segura', 'El puente grúa levanta más rápido', 'La eslinga se acorta y no pasa nada'], w: 'Mientras más abiertos los ramales, más fuerza recibe cada uno. El ángulo entre ellos no debe pasar de 90°.' },
        { q: 'Antes de un izaje hay que conocer el peso de la carga.', vf: true, w: 'Verdadero. Sin saber el peso no puedes saber si los equipos lo resisten.' }] },
      { s: 'al_ta_izaje_equilibrio', v: [
        { q: 'Vas a levantar una plancha con cantos filosos. ¿Qué haces con las eslingas?', o: ['Protejo los cantos con cantoneras o protectores', 'Las pongo directo sobre el canto', 'Uso eslingas viejas, por si se cortan', 'Las mojo para que no se corten'], w: 'Los cantos vivos cortan las eslingas en segundos: se protegen con cantoneras.' },
        { q: '¿Qué haces apenas la carga se despega del piso?', o: ['Me detengo unos centímetros arriba y reviso el equilibrio', 'La subo de una vez hasta arriba', 'La muevo rápido para no perder tiempo', 'Me pongo debajo para ver si está pareja'], w: 'Se levanta unos centímetros, se detiene y se revisa que esté equilibrada y que el freno sujete.' },
        { q: 'El gancho se pone sobre el centro de la carga para que suba pareja.', vf: true, w: 'Verdadero. Si el gancho no está sobre el centro, la carga se inclina o se desliza.' }] },
      { s: 'al_ta_izaje_senalero', v: [
        { q: 'Durante un izaje, ¿quién da las señales al operador?', o: ['Una sola persona: el señalero', 'Todos los que estén mirando', 'El que esté más cerca de la carga', 'Nadie, el operador decide solo'], w: 'Un solo señalero, para que el operador no se confunda.' },
        { q: 'No eres el señalero, pero ves que la carga va a golpear a un compañero. ¿Qué haces?', o: ['Doy la señal de PARADA de inmediato', 'Espero que el señalero lo vea', 'Corro a sujetar la carga', 'Le grito al compañero y sigo trabajando'], w: 'La señal de parada la puede dar cualquiera que vea un peligro, y el operador se detiene.' },
        { q: 'Solo el señalero puede dar la señal de parada.', vf: false, w: 'Falso. La parada la puede dar cualquier persona que vea un peligro.' }] },
      { s: 'al_ta_izaje_q_bajo', v: [
        { q: 'Una viga va colgando del puente grúa y tu camino pasa por debajo. ¿Qué haces?', o: ['Rodeo por fuera de la zona o espero que la apoyen', 'Paso rápido por debajo', 'Paso agachado', 'Paso si el operador me ve'], w: 'Nunca te pongas bajo una carga suspendida ni en su recorrido.' },
        { q: 'La carga se inclina un poco al subir. ¿Qué haces?', o: ['Pido detener, la bajo y la vuelvo a estrobar', 'Me subo a la carga para equilibrarla', 'La empujo con las manos desde abajo', 'Sigo subiéndola lento'], w: 'Una carga desequilibrada se baja y se vuelve a estrobar. Nadie se sube a la carga.' },
        { q: '¿Cómo se protege la zona bajo un izaje?', o: ['Se delimita con cinta o conos y se avisa', 'Con un letrero en la entrada del taller', 'No hace falta si el izaje es corto', 'Con un compañero bajo la carga mirando'], w: 'La zona se delimita y se avisa a quienes trabajan cerca.' }] },
      { s: 'al_ta_izaje_guia', v: [
        { q: 'La viga empieza a girar mientras sube. ¿Cómo la controlas?', o: ['Con una cuerda guía, desde fuera de la zona', 'Tomándola con las dos manos', 'Poniéndome delante para frenarla', 'Subiéndola más rápido'], w: 'Se guía con cuerda desde fuera de la zona de caída, nunca con las manos sobre la carga.' },
        { q: '¿Para qué se ponen tacos o durmientes al bajar una carga?', o: ['Para retirar la eslinga sin dejar los dedos debajo', 'Para que la carga quede más alta y se vea', 'Para que el piso no se ensucie', 'Para que la carga no se oxide'], w: 'Los tacos dejan espacio para sacar la eslinga sin aplastar las manos.' },
        { q: 'Al tensar las eslingas puedes dejar las manos entre la eslinga y la carga para ajustarla.', vf: false, w: 'Falso. Es un punto de atrapamiento: las manos se sacan antes de tensar.' }] },
      { s: 'al_ta_izaje_q_tecle', v: [
        { q: 'Tienes una pieza colgando del tecle y te llaman a otra área. ¿Qué haces?', o: ['Bajo la pieza y la apoyo antes de irme', 'La dejo colgando, vuelvo luego', 'La dejo colgando con un letrero', 'Le pido a alguien que se ponga debajo'], w: 'Nunca se deja una carga colgando sola: se baja y se apoya.' },
        { q: 'Al usar el tecle notas que el freno patina. ¿Qué haces?', o: ['Detengo el trabajo, bajo la carga con cuidado y aviso', 'Sigo, pero más lento', 'Le pongo grasa al freno y sigo', 'Uso el tecle solo con cargas livianas'], w: 'Un freno que patina es una falla grave: se detiene el trabajo y se avisa.' },
        { q: 'Con el tecle se puede arrastrar una carga en diagonal si es corta la distancia.', vf: false, w: 'Falso. El tecle trabaja con tiro vertical: el tiro en diagonal sobrecarga y hace oscilar la carga.' }] }
    ]
  });

  // ======================================================================
  // 4. TRABAJO EN ALTURA
  // ======================================================================
  // estructura metálica en fabricación (2 columnas y vigas) a la derecha
  const estructura = (x = 190, top = 40) => `<rect x="${x}" y="${top}" width="10" height="${165 - top}" fill="#78909C" stroke="${OL}"/><rect x="${x + 100}" y="${top}" width="10" height="${165 - top}" fill="#78909C" stroke="${OL}"/>` + H.viga(x - 6, top + 12, 122, 12) + H.viga(x, top + 72, 110, 10);
  const enEscala = (bx, h, k, extra = {}) => { const x = bx + 6 + h * .25 * k, y = 165 - h * k, o = Object.assign({ pose: 'c4climb' }, extra); return { x, y, o, g: W(x, y, o) }; };
  S.al_ta_altura_intro = () => { const e = enEscala(130, 124, .4); const [ax, ay] = anillaDorsal(e.x, e.y, e.o);
    return svg(H.fondo.taller() + estructura() + H.escalaApoyada(130, 165, 124) + e.g + arnes(e.x, e.y, e.o) + anclaje(196, 52) + colaArnes(ax, ay, 196, 57) + `<path d="M40,165 v-30" stroke="#1565C0" stroke-width="2"/><path d="M34,141 l6,-6 l6,6 M34,159 l6,6 l6,-6" stroke="#1565C0" stroke-width="2" fill="none"/>` + T(56, 152, '1,8 m', 11, '#1565C0', 'start') + pl(160, 180, 'Sobre 1,8 m: trabajo en altura', '#D7262B', 10)); };
  S.al_ta_altura_requisitos = () => svg(H.fondo.liso() + doc(14, 30, 'EXAMEN ALTURA', 'VIGENTE', '#2E7D32', 72, 100) + doc(94, 30, 'AUTORIZACIÓN', 'Jefatura', '#1565C0', 72, 100) + W(250, 165, { pose: 'stand' }) + arnes(250, 165, {}) + pl(252, 40, 'Arnés con doble cola', '#E65100', 9) + pl(100, 150, 'Sin examen vigente no se sube', '#D7262B', 10) + pl(100, 176, 'Ni mareado, con sueño o con malestar', '#455A64', 9));
  const plataforma = () => `<rect x="20" y="120" width="120" height="8" fill="#78909C" stroke="${OL}"/><rect x="24" y="128" width="6" height="37" fill="#546E7A"/><rect x="130" y="128" width="6" height="37" fill="#546E7A"/>`;
  S.al_ta_altura_anclaje = () => { const o = { pose: 'c4reach' }, [ax, ay] = anillaDorsal(70, 120, o);
    return svg(H.fondo.taller() + plataforma() + H.viga(10, 34, 150, 12) + W(70, 120, o) + arnes(70, 120, o) + anclaje(96, 34) + colaArnes(ax, ay, 96, 39) + `<path d="M${ax},${ay} q-26,14 -20,32" stroke="#E65100" stroke-width="2.6" fill="none"/>`
      + pl(236, 60, 'Anclaje firme, sobre la cabeza', '#2E7D32', 9) + pl(236, 86, 'Una cola siempre conectada', '#1565C0', 9) + pl(236, 112, 'Nunca a cañerías ni barandas débiles', '#D7262B', 9)); };
  S.al_ta_altura_q_anclaje = () => { const o = { pose: 'c4reach' }, [ax, ay] = anillaDorsal(70, 120, o);
    return svg(H.fondo.taller() + plataforma() + `<path d="M0,52 H320" stroke="#B0BEC5" stroke-width="6"/>` + H.viga(10, 34, 150, 12) + W(70, 120, o) + arnes(70, 120, o) + `<path d="M${ax},${ay} q-30,10 -26,32" stroke="#E65100" stroke-width="2.6" fill="none"/>` + qm(250, 110)); };
  S.al_ta_altura_escala = () => svg(H.fondo.taller() + estructura(200) + H.escalaApoyada(170, 165, 124) + `<line x1="170" y1="174" x2="201" y2="174" stroke="#1565C0" stroke-width="2"/>` + T(186, 186, '1 m', 10, '#1565C0') + `<line x1="222" y1="165" x2="222" y2="41" stroke="#1565C0" stroke-width="2" stroke-dasharray="4 3"/>` + T(232, 110, '4 m', 10, '#1565C0', 'start')
    + `<path d="M196,46 l10,-4" stroke="#F9A825" stroke-width="3"/>` + pl(90, 30, 'Amarrada arriba', '#2E7D32', 10) + pl(90, 56, 'Sobrepasa 1 m el apoyo', '#2E7D32', 10) + pl(90, 82, 'Zapatas en piso firme', '#2E7D32', 10) + pl(90, 108, 'Regla 4 a 1', '#1565C0', 10));
  S.al_ta_altura_q_escala = () => svg(H.fondo.taller() + estructura(200) + H.escalaApoyada(160, 165, 124) + qm(80, 60));
  S.al_ta_altura_3p = () => { const e = enEscala(170, 124, .35); return svg(H.fondo.taller() + estructura(206) + H.escalaApoyada(170, 165, 124) + e.g + `<rect x="${e.x - 18}" y="${e.y - 40}" width="12" height="14" rx="2" fill="#5D4037"/>` + pl(80, 40, '3 puntos de apoyo', '#2E7D32', 10) + pl(80, 66, 'De frente y manos libres', '#2E7D32', 10) + pl(80, 92, 'Herramientas en bolso', '#2E7D32', 10) + pl(90, 182, 'Una persona por escala', '#1565C0', 9)); };
  S.al_ta_altura_q_3p = () => { const e = enEscala(170, 124, .35, { pose: 'carry' }); return svg(H.fondo.taller() + estructura(206) + H.escalaApoyada(170, 165, 124) + e.g + `<rect x="${e.x + 12}" y="${e.y - 56}" width="22" height="14" rx="2" fill="#C62828" stroke="${OL}"/>` + qm(60, 50)); };
  S.al_ta_altura_trepar = () => svg(H.fondo.taller() + estructura(30) + W(60, 112, { pose: 'c4climb', face: 'worried' }) + H.no(110, 30) + div() + H.torno(170, 165, { gira: false }) + W(250, 113, { pose: 'c4reach' }) + `<rect x="236" y="113" width="30" height="4" fill="#5D6D7E"/>` + H.no(296, 30) + pl(160, 182, 'No trepes a estructuras ni a máquinas', '#D7262B', 10));
  S.al_ta_altura_abajo = () => { const e = enEscala(130, 110, .45); return svg(H.fondo.taller() + estructura(190, 54) + H.escalaApoyada(130, 165, 110) + e.g + arnes(e.x, e.y, e.o) + `<g class="al40c">` + llave(e.x + 18, e.y - 40, .4) + `</g>` + cinta(70, 300, 170) + cono(70, 192) + cono(300, 192) + W(30, 165, { pose: 'stop', helmet: true }) + pl(240, 140, 'Delimita abajo', '#D7262B', 10) + pl(70, 40, 'Herramientas amarradas', '#2E7D32', 10)); };
  S.al_ta_altura_q_abajo = () => { const e = enEscala(130, 110, .45); return svg(H.fondo.taller() + estructura(190, 54) + H.escalaApoyada(130, 165, 110) + e.g + arnes(e.x, e.y, e.o) + W(230, 165, { pose: 'walk', flip: true }) + qm(60, 60)); };
  S.al_ta_altura_tijera = () => svg(H.fondo.taller() + H.escala(60, 165, 90) + W(80, 120, { pose: 'c4reach' }) + `<rect x="64" y="132" width="32" height="3" fill="#455A64"/>` + H.si(40, 40) + div() + H.escala(220, 165, 76) + W(240, 89, { pose: 'stand', face: 'worried' }) + H.no(296, 40) + pl(240, 182, 'En el último peldaño', '#D7262B', 10) + pl(80, 182, 'Abierta y trabada', '#2E7D32', 10));

  SI_CONT.temas.push({
    id: 'ta_altura', sec: 'taller', emp: ['ali'], title: 'Trabajo en altura en la maestranza', thumb: 'al_ta_altura_intro', mins: 20,
    learn: [
      { s: 'al_ta_altura_intro', t: 'Una caída de altura puede ser mortal', x: 'En la maestranza se trabaja en altura al <b>armar y soldar estructuras</b>, pintar piezas grandes, revisar luminarias o el puente grúa, y en faenas de clientes. Una caída puede causar fracturas, lesiones de columna o la muerte. Por eso, el trabajo <b>sobre 1,8 metros</b> de altura se hace con requisitos y equipos especiales, según el <b>procedimiento de trabajo en altura</b> de ALI.' },
      { s: 'al_ta_altura_requisitos', t: 'Antes de subir: requisitos', x: 'Para trabajar <b>sobre 1,8 metros</b> necesitas:<ul><li><b>Examen de altura vigente</b>.</li><li><b>Autorización</b> de tu jefatura.</li><li><b>Arnés de cuerpo completo con doble cola</b> y absorbedor de impacto.</li><li>Un punto de anclaje firme.</li></ul>Si no tienes tu examen vigente, <b>no trabajas en altura</b>. Tampoco subas si te sientes mareado, con sueño o con malestar.', k: 'Sin examen de altura vigente, no se sube.' },
      { s: 'al_ta_altura_anclaje', t: 'Arnés y anclaje: arriba y firme', x: '<ul><li>Revisa el arnés antes de usarlo: correas, costuras, hebillas y mosquetones sin daños.</li><li>Ajústalo bien en piernas y pecho.</li><li>Ánclate a un punto <b>firme y sobre tu cabeza</b>: así, si caes, la caída es más corta.</li><li>Nunca te anclas a cañerías, barandas débiles, conduit eléctrico ni a la misma escala.</li><li>Al cambiar de anclaje, suelta <b>una cola a la vez</b>.</li></ul>' },
      { s: 'al_ta_altura_escala', t: 'La escala bien apoyada', x: '<ul><li>Regla <b>4 a 1</b>: por cada 4 metros de altura, la base se separa 1 metro.</li><li>La escala sobrepasa <b>1 metro</b> el punto donde te bajas.</li><li>Patas con <b>zapatas antideslizantes</b>, en piso firme, parejo y sin aceite.</li><li><b>Amárrala arriba</b> o pide que alguien la sujete abajo.</li><li>Revisa peldaños y largueros: una escala dañada no se usa.</li></ul>Cerca de cables eléctricos no se usan escalas metálicas.' },
      { s: 'al_ta_altura_3p', t: 'Sube con 3 puntos de apoyo', x: 'Sube y baja <b>de frente a la escala</b>, siempre con <b>3 puntos de apoyo</b>: dos manos y un pie, o dos pies y una mano. Las herramientas van en un <b>bolso</b> o se suben con una cuerda: las manos van libres. No te estires hacia los lados; si no alcanzas, baja y mueve la escala. Una sola persona por escala.' },
      { s: 'al_ta_altura_tijera', t: 'Escala de tijera', x: '<ul><li>Úsala <b>abierta por completo</b> y con su <b>seguro trabado</b>.</li><li>No te pares en los <b>dos últimos peldaños</b> ni en la tapa.</li><li>No la uses cerrada y apoyada en un muro.</li><li>No la muevas contigo arriba.</li></ul>' },
      { s: 'al_ta_altura_trepar', t: 'No trepes a estructuras ni máquinas', x: 'Está prohibido subir trepando por <b>vigas, estructuras en fabricación, estanterías, máquinas</b>, pallets o cajas. Tampoco te subas a la grúa horquilla para alcanzar algo. Para llegar arriba usa una <b>escala, un andamio o una plataforma</b> en buen estado. Si no hay un equipo adecuado, detente y avisa a tu jefatura.' },
      { s: 'al_ta_altura_abajo', t: 'Abajo también hay riesgo', x: 'Una herramienta o un perno que cae desde altura puede herir gravemente a quien está abajo.<ul><li><b>Delimita abajo</b> con cinta y conos, y avisa a los que trabajan cerca.</li><li>Herramientas <b>amarradas</b> o en un bolso cerrado.</li><li>Nunca lances materiales: bájalos con una cuerda o con el puente grúa.</li><li>Nadie se queda bajo el trabajo en altura; quienes trabajan cerca usan casco.</li></ul>' }
    ],
    quiz: [
      { s: 'al_ta_altura_intro', v: [
        { q: '¿Desde qué altura un trabajo se considera trabajo en altura?', o: ['Sobre 1,8 metros', 'Sobre 3 metros', 'Sobre 5 metros', 'Sobre 1 metro'], w: 'Sobre 1,8 metros es trabajo en altura y se aplican sus requisitos.' },
        { q: 'Debes soldar una viga a 2,5 metros de altura. ¿Qué necesitas?', o: ['Examen de altura vigente, autorización, arnés y anclaje', 'Solo una escala firme', 'Solo un compañero que sujete la escala', 'Solo la careta y los guantes de soldar'], w: 'Sobre 1,8 metros: examen de altura vigente, autorización, arnés con doble cola y un anclaje firme.' },
        { q: 'Un trabajo a 2 metros de altura es trabajo en altura.', vf: true, w: 'Verdadero. Todo trabajo sobre 1,8 metros es trabajo en altura.' }] },
      { s: 'al_ta_altura_requisitos', v: [
        { q: 'Tu examen de altura venció la semana pasada y te piden subir. ¿Qué haces?', o: ['No subo y aviso a mi jefatura', 'Subo, porque el examen salió bien antes', 'Subo solo un rato corto', 'Subo si me anclo bien'], w: 'Sin examen de altura vigente no se trabaja en altura.' },
        { q: 'Amaneciste mareado y hoy te toca trabajar en altura. ¿Qué haces?', o: ['Aviso a mi jefatura y no subo', 'Subo con cuidado y me anclo', 'Tomo un café y subo', 'Subo si un compañero me mira'], w: 'No se trabaja en altura con mareo, sueño o malestar. Se avisa a la jefatura.' },
        { q: 'Si estás bien anclado, puedes trabajar en altura sin examen vigente.', vf: false, w: 'Falso. El examen de altura vigente es obligatorio para trabajar sobre 1,8 metros.' }] },
      { s: 'al_ta_altura_q_anclaje', v: [
        { q: '¿Dónde conectas la cola de tu arnés?', o: ['A un punto firme, sobre mi cabeza', 'A una cañería que pase cerca', 'A la misma escala donde estoy', 'A la baranda más cercana, aunque esté floja'], w: 'Al anclaje firme y sobre la cabeza: así la caída es más corta y el punto resiste.' },
        { q: 'Necesitas moverte a otro punto de anclaje. ¿Cómo lo haces?', o: ['Conecto una cola al nuevo punto y después suelto la otra', 'Suelto las dos colas y me conecto rápido', 'Me sujeto con las manos y cambio', 'Me desconecto y camino con cuidado'], w: 'Con doble cola, siempre una queda conectada.' },
        { q: '¿Por qué conviene que el anclaje esté sobre tu cabeza?', o: ['Porque si caes, la caída es más corta', 'Porque así el arnés se ve mejor', 'Porque así se cansan menos los brazos', 'Porque así la cola no se ensucia'], w: 'Un anclaje alto reduce la distancia de caída y el golpe que recibe tu cuerpo.' }] },
      { s: 'al_ta_altura_q_escala', v: [
        { q: 'Apoyas una escala para llegar a 4 metros. ¿A qué distancia del apoyo va la base?', o: ['1 metro', '2 metros', '50 centímetros', 'Pegada a la estructura'], w: 'Regla 4 a 1: por cada 4 metros de altura, la base se separa 1 metro.' },
        { q: 'La escala no se puede amarrar arriba. ¿Qué haces?', o: ['Pido que un compañero la sujete abajo', 'Subo rápido, antes de que se mueva', 'Pongo un ladrillo en cada pata', 'Subo con una mano en la estructura'], w: 'Si no se puede amarrar arriba, alguien la sujeta abajo mientras subes y trabajas.' },
        { q: '¿Cuánto debe sobrepasar la escala el punto donde te bajas?', o: ['1 metro', '10 centímetros', 'Nada, al ras', '3 metros'], w: 'Sobrepasa 1 metro, para tener dónde afirmarte al subir y bajar.' }] },
      { s: 'al_ta_altura_q_3p', v: [
        { q: '¿Cómo subes una escala de forma segura?', o: ['De frente, con 3 puntos de apoyo y las manos libres', 'Con la caja de herramientas en una mano', 'De espaldas a la escala', 'De a dos peldaños'], w: 'De frente, con 3 puntos de apoyo; las herramientas en un bolso o con cuerda.' },
        { q: 'Estás en la escala y no alcanzas el punto de soldadura. ¿Qué haces?', o: ['Bajo y acerco la escala', 'Me estiro hacia el lado', 'Me paro en el último peldaño', 'Me afirmo de la viga y me estiro'], w: 'No te estires: baja y mueve la escala.' },
        { q: 'Dos personas pueden subir juntas la misma escala si es firme.', vf: false, w: 'Falso. Una sola persona por escala.' }] },
      { s: 'al_ta_altura_trepar', v: [
        { q: 'Necesitas soltar una eslinga en lo alto de una estructura. ¿Cómo subes?', o: ['Con una escala, andamio o plataforma adecuada', 'Trepando por las vigas', 'Subiéndome a la máquina de al lado', 'Parado sobre un pallet en las horquillas'], w: 'No se trepa a estructuras ni máquinas: se usa un equipo adecuado para la altura.' },
        { q: 'Un compañero se sube al torno para alcanzar una luminaria. ¿Qué haces?', o: ['Le pido que baje y busque una escala', 'Le sujeto los pies', 'Le paso la luminaria rápido', 'No le digo nada, es su decisión'], w: 'Está prohibido subirse a las máquinas. Si ves a alguien hacerlo, se lo dices y avisas.' },
        { q: 'En la escala de tijera te puedes parar en el último peldaño si estás anclado.', vf: false, w: 'Falso. En la escala de tijera no se usan los dos últimos peldaños ni la tapa.' }] },
      { s: 'al_ta_altura_q_abajo', v: [
        { q: 'Vas a trabajar sobre una estructura y abajo pasan compañeros. ¿Qué haces?', o: ['Delimito abajo con cinta y conos y aviso', 'Nada, ellos ven que estoy arriba', 'Les pido que pasen rápido', 'Trabajo y aviso si se me cae algo'], w: 'Bajo el trabajo en altura se delimita y se avisa: nadie se queda debajo.' },
        { q: '¿Cómo bajas los materiales desde arriba?', o: ['Con una cuerda o con el puente grúa', 'Los lanzo cuando no pasa nadie', 'Los dejo caer sobre un cartón', 'Los bajo en una mano por la escala'], w: 'Nunca se lanzan materiales: se bajan con cuerda o con el equipo de izaje.' },
        { q: '¿Cómo llevas las herramientas cuando trabajas en altura?', o: ['Amarradas o en un bolso cerrado', 'Sueltas en los bolsillos', 'Sobre la viga, junto a mí', 'En la mano libre'], w: 'Una herramienta que cae puede herir a alguien: van amarradas o en un bolso cerrado.' }] }
    ]
  });

  // ======================================================================
  // 5. BLOQUEO DE ENERGÍAS ANTES DE INTERVENIR
  // ======================================================================
  const tornoBloq = (bloq = true) => H.fondo.taller() + H.torno(20, 165, { gira: !bloq }) + H.tablero(250, 60, bloq) + `<path d="M272,118 V150 H160 V154" stroke="#263238" stroke-width="2.5" fill="none"/>`;
  S.al_ta_bloqueo_intro = () => svg(H.fondo.taller() + H.torno(20, 165) + W(96, 165, { pose: 'point', flip: true, gloves: false }) + `<circle cx="60" cy="97" r="20" fill="none" stroke="#D32F2F" stroke-width="3" class="al40p"/>` + H.no(200, 50) + pl(160, 182, 'Nunca intervengas una máquina en movimiento', '#D7262B', 10));
  S.al_ta_bloqueo_energias = () => svg(H.fondo.liso() + [['⚡', 'Eléctrica', '#FFC20E'], ['💨', 'Neumática (aire)', '#4FC3F7'], ['🛢', 'Hidráulica (aceite)', '#8D6E63'], ['⚙', 'Mecánica (giro)', '#90A4AE'], ['⬇', 'Gravedad (caída)', '#E57373'], ['🔥', 'Térmica (calor)', '#FF8A65']].map((e, i) => { const x = 56 + (i % 3) * 104, y = 40 + Math.floor(i / 3) * 70;
    return `<circle cx="${x}" cy="${y}" r="26" fill="${e[2]}" stroke="${OL}" stroke-width="1.5"/>` + T(x, y + 8, e[0], 22, '#263238') + T(x, y + 40, e[1], 10, '#263238'); }).join('') + pl(160, 174, 'Todas se cortan y se bloquean', '#2E7D32', 10));
  S.al_ta_bloqueo_pasos = () => svg(H.fondo.liso() + ['Avisar', 'Detener', 'Cortar energía', 'Candado y tarjeta', 'Liberar energía', 'Verificar cero'].map((t, i) => { const x = 26 + (i % 2) * 150, y = 26 + Math.floor(i / 2) * 40;
    return `<circle cx="${x}" cy="${y}" r="14" fill="${i === 3 ? H.ALI1 : '#1565C0'}"/>` + T(x, y + 5, String(i + 1), 13, '#fff') + T(x + 18, y + 5, t, 10, '#263238', 'start'); }).join('') + tarjeta(278, 138, .5) + candado(250, 160, .7) + pl(110, 176, 'Recién entonces intervienes', '#2E7D32', 10));
  S.al_ta_bloqueo_q_pasos = () => svg(tornoBloq(false) + W(200, 165, { pose: 'point', flip: true }) + candado(150, 30, .8) + qm(110, 50));
  S.al_ta_bloqueo_candado = () => svg(H.fondo.liso() + `<rect x="20" y="40" width="100" height="120" rx="4" fill="#B0BEC5" stroke="${OL}" stroke-width="1.5"/><rect x="60" y="80" width="20" height="40" rx="3" fill="#263238"/>` + `<rect x="64" y="118" width="12" height="40" rx="2" fill="#E0E0E0" stroke="${OL}"/>` + candado(54, 160, .7, H.ALI1) + candado(86, 160, .7, '#1565C0') + tarjeta(130, 40, 1.2) + T(158, 140, 'Nombre · fecha · motivo', 8, '#263238', 'start') + pl(240, 20, 'Cada uno su candado', '#2E7D32', 10) + pl(160, 182, 'Solo el dueño saca su candado', '#D7262B', 10));
  S.al_ta_bloqueo_verificar = () => { const p = { pose: 'point' }; return svg(tornoBloq(true) + W(200, 165, Object.assign({}, p, { flip: true })) + `<circle cx="44" cy="73" r="12" fill="none" stroke="#2E7D32" stroke-width="3"/>` + pl(150, 22, 'Aprieto partir: no parte', '#2E7D32', 10)); };
  S.al_ta_bloqueo_q_verificar = () => svg(tornoBloq(true) + W(200, 165, { pose: 'stand', flip: true }) + qm(140, 50));
  S.al_ta_bloqueo_hidraulica = () => svg(H.fondo.taller() + H.plegadora(30, 165) + `<rect x="78" y="104" width="34" height="12" fill="#8D6E63" stroke="${OL}"/>` + pl(95, 22, 'Calzar lo que puede bajar', '#2E7D32', 10) + `<rect x="196" y="118" width="76" height="36" rx="16" fill="#4FC3F7" stroke="${OL}"/><circle cx="208" cy="159" r="6" fill="#263238"/><circle cx="260" cy="159" r="6" fill="#263238"/>` + T(234, 141, 'AIRE', 10, '#263238') + `<path d="M272,128 h30" stroke="#263238" stroke-width="4"/><rect x="284" y="120" width="10" height="16" fill="#D32F2F" stroke="${OL}"/>` + manometro(234, 100, 12) + pl(240, 182, 'Cerrar válvula y purgar', '#1565C0', 9));
  S.al_ta_bloqueo_movimiento = () => { const po = { pose: 'carry', gloves: false }, [hx, hy] = pt(40, 165, po, 'hR');
    return svg(H.fondo.taller() + H.torno(30, 165) + `<path d="M${hx + 30},${hy + 8} l6,-3 l4,5 l6,-3" stroke="#B0BEC5" stroke-width="2" fill="none"/>` + W(40, 165, po) + H.no(80, 30) + div(170) + `<rect x="200" y="112" width="70" height="6" fill="#78909C"/>` + `<path d="M222,112 v-30 M216,82 h12 M210,112 l6,-14 l6,8 l8,-12" stroke="#5D4037" stroke-width="2.5" fill="none"/>` + W(290, 165, { pose: 'carry', flip: true, gloves: '#8D6E63' }) + H.si(300, 30) + pl(80, 182, 'Sacar virutas girando', '#D7262B', 9) + pl(244, 182, 'Detenido y con gancho', '#2E7D32', 9)); };
  S.al_ta_bloqueo_retirar = () => svg(tornoBloq(true) + W(220, 165, { pose: 'point', flip: true, face: 'worried' }) + `<rect x="150" y="20" width="110" height="34" rx="8" fill="#fff" stroke="#90A4AE"/>` + T(205, 34, 'Su dueño se fue...', 9, '#263238') + T(205, 47, 'Aviso a mi jefatura', 9, '#2E7D32') + pl(110, 182, 'Nunca saques el candado de otro', '#D7262B', 10));

  SI_CONT.temas.push({
    id: 'ta_bloqueo', sec: 'taller', emp: ['ali'], title: 'Bloqueo de energías antes de intervenir', thumb: 'al_ta_bloqueo_candado', mins: 20,
    learn: [
      { s: 'al_ta_bloqueo_intro', t: 'Intervenir con energía: amputaciones', x: 'Limpiar virutas, destrabar una pieza, cambiar una herramienta, ajustar o reparar un torno, una fresa, la plegadora, la guillotina, la prensa o un compresor <b>con su energía conectada</b> puede terminar en un <b>atrapamiento, una amputación o una descarga eléctrica</b>. Basta que alguien apriete partir o que una parte se mueva sola. En ALI está <b>prohibido intervenir equipos en movimiento</b>: antes se detienen y se bloquean.' },
      { s: 'al_ta_bloqueo_energias', t: 'Las energías de una máquina', x: 'Una máquina puede tener varias energías, y <b>todas</b> se controlan:<ul><li><b>Eléctrica</b>: motores y tableros.</li><li><b>Neumática</b>: aire comprimido.</li><li><b>Hidráulica</b>: aceite a presión de la plegadora y la prensa.</li><li><b>Mecánica</b>: platos, volantes y resortes que siguen moviéndose.</li><li><b>Gravedad</b>: cuchillas, punzones o piezas que pueden bajar.</li><li><b>Térmica</b>: partes calientes.</li></ul>' },
      { s: 'al_ta_bloqueo_pasos', t: 'Los pasos del bloqueo', x: '<ol><li><b>Avisa</b> a las personas del área.</li><li><b>Detén</b> la máquina con su botón.</li><li><b>Corta la energía</b> en el tablero y cierra las válvulas de aire o aceite.</li><li>Pon tu <b>candado y tu tarjeta</b>.</li><li><b>Libera la energía acumulada</b>: purga el aire, baja o calza lo que puede caer, espera que todo se detenga.</li><li><b>Verifica energía cero</b>.</li></ol>Recién entonces intervienes.', k: 'Detener, desenergizar, bloquear, verificar: recién ahí se interviene.' },
      { s: 'al_ta_bloqueo_candado', t: 'Tu candado y tu tarjeta', x: 'Cada trabajador usa <b>su propio candado</b>, con una sola llave que guarda él. La <b>tarjeta</b> dice quién bloqueó, la fecha y el motivo. Si trabajan varios en la misma máquina, <b>cada uno pone su candado</b>: la máquina vuelve a funcionar solo cuando todos sacaron el suyo. <b>Solo el dueño retira su candado</b>.' },
      { s: 'al_ta_bloqueo_verificar', t: 'Verifica energía cero', x: 'No basta con creer que cortaste la energía correcta. Después de bloquear:<ul><li>Aprieta el botón de <b>partida</b>: la máquina <b>no debe partir</b>.</li><li>Revisa que los <b>manómetros marquen cero</b>.</li><li>Comprueba que nada gire ni pueda bajar.</li></ul>Luego deja el botón en apagado. Si la máquina parte, no la toques: corta de nuevo y avisa a tu jefatura.' },
      { s: 'al_ta_bloqueo_hidraulica', t: 'Aire y aceite también se bloquean', x: 'Cortar la electricidad <b>no basta</b> en la plegadora, la prensa o los equipos con aire:<ul><li>El aceite y el aire <b>quedan con presión</b> en las mangueras y cilindros.</li><li>El punzón o la cuchilla pueden <b>bajar por su peso</b>.</li></ul>Cierra y bloquea las válvulas, <b>purga</b> la presión y <b>calza</b> con bloques lo que puede bajar.' },
      { s: 'al_ta_bloqueo_movimiento', t: 'Nunca con la máquina en movimiento', x: '<ul><li>No saques virutas con la mano ni con la máquina girando: detenla y usa un <b>gancho o escobilla</b>.</li><li>No frenes el plato del torno con la mano.</li><li>No metas las manos detrás de una guarda.</li><li>Espera que la máquina se <b>detenga por completo</b> antes de medir o ajustar.</li></ul>' },
      { s: 'al_ta_bloqueo_retirar', t: 'Devolver la energía', x: 'Al terminar:<ul><li>Retira herramientas y materiales.</li><li><b>Vuelve a poner las guardas</b>.</li><li>Avisa y revisa que nadie esté en la máquina.</li><li>Saca tu candado y tu tarjeta, y prueba.</li></ul>Si encuentras el candado de alguien que ya se fue, <b>no lo saques</b>: avisa a tu jefatura.', k: 'Solo el dueño saca su candado.' }
    ],
    quiz: [
      { s: 'al_ta_bloqueo_intro', v: [
        { q: 'Una pieza se trabó en la plegadora. ¿Qué haces antes de meter las manos?', o: ['Detengo, corto, bloqueo y verifico energía cero', 'La apago con el botón y meto las manos', 'Pido a un compañero que vigile el pedal', 'La saco rápido con la máquina andando'], w: 'Apagar con el botón no basta: se corta la energía, se bloquea con candado y tarjeta y se verifica energía cero.' },
        { q: '¿Cuándo se puede intervenir una máquina en movimiento?', o: ['Nunca', 'Si es solo un segundo', 'Si tienes experiencia', 'Si usas guantes'], w: 'En ALI está prohibido intervenir equipos en movimiento.' },
        { q: 'Si el trabajo es rápido, no hace falta bloquear la máquina.', vf: false, w: 'Falso. Una máquina puede partir en un instante: se bloquea siempre.' }] },
      { s: 'al_ta_bloqueo_energias', v: [
        { q: 'Cortaste la electricidad de la prensa hidráulica. ¿Ya está segura?', o: ['No: falta liberar la presión y calzar lo que puede bajar', 'Sí, sin electricidad no se mueve nada', 'Sí, si la dejas un minuto apagada', 'Sí, si pones un letrero'], w: 'La presión hidráulica y la gravedad siguen ahí: se purga la presión y se calza lo que puede bajar.' },
        { q: '¿Cuál de estas es una energía que también se debe bloquear?', o: ['El aire comprimido', 'La luz del día', 'El ruido del taller', 'La temperatura ambiente'], w: 'La energía neumática (aire comprimido) mueve cilindros y debe cortarse y purgarse.' },
        { q: 'Una cuchilla de la guillotina puede bajar por su propio peso aunque la máquina esté apagada.', vf: true, w: 'Verdadero. La gravedad es una energía: lo que puede bajar se calza o se bloquea.' }] },
      { s: 'al_ta_bloqueo_q_pasos', v: [
        { q: '¿Cuál es el orden correcto?', o: ['Avisar, detener, cortar, candado y tarjeta, liberar, verificar', 'Candado, avisar, verificar, detener y cortar', 'Cortar, intervenir y después avisar', 'Detener e intervenir; el candado es opcional'], w: 'Avisar, detener, cortar la energía, candado y tarjeta, liberar la energía acumulada y verificar energía cero.' },
        { q: '¿Qué haces justo después de poner tu candado y tu tarjeta?', o: ['Libero la energía acumulada y verifico que no parte', 'Intervengo de inmediato', 'Le paso la llave a un compañero', 'Saco la guarda y empiezo'], w: 'Después de bloquear se libera la energía acumulada y se verifica energía cero.' },
        { q: '¿Qué es lo primero al iniciar un bloqueo?', o: ['Avisar a las personas del área', 'Poner el candado', 'Abrir la guarda', 'Apretar partir'], w: 'Primero se avisa, para que nadie intente usar la máquina.' }] },
      { s: 'al_ta_bloqueo_candado', v: [
        { q: 'Tres trabajadores reparan el mismo torno. ¿Cómo se bloquea?', o: ['Cada uno pone su propio candado', 'Pone candado solo el más antiguo', 'Basta una tarjeta para los tres', 'Se bloquea solo si viene el eléctrico'], w: 'Cada persona pone su candado: la máquina vuelve a funcionar cuando todos sacaron el suyo.' },
        { q: '¿Qué debe decir la tarjeta de bloqueo?', o: ['Quién bloqueó, la fecha y el motivo', 'Solo el nombre de la máquina', 'El nombre de la empresa', 'Nada, basta con el color'], w: 'La tarjeta identifica a quien bloqueó, cuándo y por qué.' },
        { q: 'Puedes prestar la llave de tu candado a un compañero para que lo saque si te vas.', vf: false, w: 'Falso. Tu candado tiene una llave que guardas tú: solo tú lo retiras.' }] },
      { s: 'al_ta_bloqueo_q_verificar', v: [
        { q: 'Ya bloqueaste el torno. ¿Cómo verificas que quedó sin energía?', o: ['Aprieto partir y compruebo que no parte', 'Miro que la luz del tablero esté apagada', 'Le pregunto a un compañero', 'Toco el motor para ver si está frío'], w: 'Se aprieta partir: si no parte, quedó sin energía. Luego el botón vuelve a apagado.' },
        { q: 'Al verificar, la máquina parte. ¿Qué haces?', o: ['No la toco, corto de nuevo y aviso a mi jefatura', 'La detengo con la mano', 'Intervengo igual, con cuidado', 'Saco mi candado y me voy'], w: 'Bloqueaste el punto equivocado o hay otra energía: no la toques, corta de nuevo y avisa.' },
        { q: 'Después de verificar, el manómetro de aire marca presión. ¿Qué haces?', o: ['Purgo hasta que marque cero', 'Intervengo, el aire no es peligroso', 'Desconecto el manómetro', 'Espero que baje solo mientras trabajo'], w: 'Energía cero también es presión cero: se purga antes de intervenir.' }] },
      { s: 'al_ta_bloqueo_movimiento', v: [
        { q: 'El torno está girando y se enreda una viruta larga. ¿Qué haces?', o: ['Detengo el torno y la saco con un gancho', 'La saco con la mano rápido', 'La saco con guantes, con el torno girando', 'La soplo con aire comprimido'], w: 'Nunca con la máquina en movimiento: se detiene y se usa un gancho o escobilla.' },
        { q: '¿Puedes frenar el plato del torno con la mano para ganar tiempo?', o: ['No, espero que se detenga solo', 'Sí, con guantes', 'Sí, si gira lento', 'Sí, con un trapo'], w: 'Frenar el plato con la mano puede arrastrarte: se espera que se detenga por completo.' },
        { q: 'Se puede limpiar una máquina con sus partes girando si se tiene cuidado.', vf: false, w: 'Falso. Está prohibido limpiar con los equipos en funcionamiento.' }] },
      { s: 'al_ta_bloqueo_retirar', v: [
        { q: 'Al llegar ves un candado en la fresa y su dueño ya se fue a su casa. ¿Qué haces?', o: ['No lo saco y aviso a mi jefatura', 'Lo corto para poder trabajar', 'Busco una llave parecida', 'Enciendo la fresa igual'], w: 'Solo el dueño saca su candado. Se avisa a la jefatura para resolverlo de forma segura.' },
        { q: 'Terminaste la reparación. ¿Qué haces antes de sacar tu candado?', o: ['Retiro herramientas, pongo las guardas y aviso', 'Saco el candado y que otro ordene', 'Pruebo la máquina con las manos adentro', 'Dejo las guardas para mañana'], w: 'Antes de devolver la energía: herramientas fuera, guardas puestas y aviso a las personas del área.' },
        { q: 'Solo el dueño de un candado de bloqueo lo puede retirar.', vf: true, w: 'Verdadero. Nadie saca el candado de otra persona.' }] }
    ]
  });

  // ======================================================================
  // 6. ATRAPAMIENTOS: JOYAS, ROPA SUELTA Y PARTES EN MOVIMIENTO
  // ======================================================================
  const tornoP = (px, o = {}) => { const po = Object.assign({ pose: 'carry' }, o); return H.torno(30, 165) + W(px, 165, po); };
  S.al_ta_atrapamiento_intro = () => svg(H.fondo.taller() + H.torno(30, 165) + H.taladro(250, 165) + `<circle cx="70" cy="97" r="22" fill="none" stroke="#D32F2F" stroke-width="3" class="al40p"/>` + pl(160, 22, 'Lo que gira atrapa en un segundo', '#D7262B', 10) + pl(160, 182, 'Plato, broca, ejes, correas y rodillos', '#263238', 9));
  S.al_ta_atrapamiento_joyas = () => svg(H.fondo.liso() + anillo(50, 70, 16) + reloj(120, 70, 16) + cadenaCuello(195, 62, 22) + pulsera(270, 70, 20) + aro(80, 136, 10) + T(50, 108, 'Anillos', 10) + T(120, 108, 'Reloj', 10) + T(195, 108, 'Cadenas', 10) + T(270, 108, 'Pulseras', 10) + T(80, 166, 'Aros', 10) + `<circle cx="160" cy="90" r="80" fill="none" stroke="#D32F2F" stroke-width="7" opacity=".35"/>` + pl(210, 146, 'Prohibidos en el taller', '#D7262B', 10) + pl(210, 172, 'También la argolla de matrimonio', '#455A64', 9));
  S.al_ta_atrapamiento_ropa = () => svg(H.fondo.taller() + tornoP(110, { loose: true, hair: true, glasses: true, face: 'worried' }) + H.no(150, 30) + div(186) + W(250, 165, { pose: 'stand' }) + H.si(296, 30) + pl(100, 182, 'Ropa suelta y pelo suelto', '#D7262B', 9) + pl(254, 182, 'Ajustada y abotonada', '#2E7D32', 9));
  S.al_ta_atrapamiento_q_ropa = () => svg(H.fondo.taller() + tornoP(110, { loose: true, hair: true }) + qm(260, 50));
  S.al_ta_atrapamiento_pelo = () => svg(H.fondo.liso() + `<g transform="translate(-20,-60) scale(1.5)">` + W(70, 165, { hair: true, pose: 'stand' }) + `</g>` + H.no(130, 40) + div() + `<g transform="translate(140,-60) scale(1.5)">` + W(70, 165, { pose: 'stand', helmet: '#22406B' }) + `</g>` + H.si(290, 40) + pl(80, 180, 'Pelo largo suelto', '#D7262B', 10) + pl(240, 180, 'Tomado y dentro del gorro', '#2E7D32', 10));
  S.al_ta_atrapamiento_guantes = () => { const po = { pose: 'carry', gloves: '#8D6E63', face: 'worried' }; return svg(H.fondo.taller() + H.taladro(70, 165) + W(40, 165, po) + `<circle cx="88" cy="96" r="14" fill="none" stroke="#D32F2F" stroke-width="3" class="al40p"/>` + H.no(130, 30) + div(170) + H.taladro(240, 165) + W(210, 165, { pose: 'carry', gloves: false }) + H.si(296, 30) + pl(80, 182, 'Guantes junto a la broca', '#D7262B', 9) + pl(250, 182, 'Sin guantes en lo que gira', '#2E7D32', 9)); };
  S.al_ta_atrapamiento_q_guantes = () => svg(H.fondo.taller() + H.torno(30, 165) + W(110, 165, { pose: 'carry', gloves: '#8D6E63' }) + qm(260, 50));
  S.al_ta_atrapamiento_guardas = () => svg(H.fondo.taller() + `<g transform="translate(40,40)"><circle cx="20" cy="30" r="16" fill="#90A4AE" stroke="${OL}"/><circle cx="90" cy="70" r="24" fill="#90A4AE" stroke="${OL}"/><path d="M20,14 L90,46 M20,46 L90,94" stroke="#263238" stroke-width="4" class="h"/></g>` + `<rect x="40" y="56" width="140" height="94" rx="10" fill="#FFC20E" opacity=".85" stroke="${OL}"/>` + T(110, 106, 'GUARDA', 13, '#263238') + `<rect x="240" y="60" width="44" height="90" rx="4" fill="#FFC20E" stroke="${OL}"/>` + T(262, 110, '?', 26, '#263238') + pl(110, 22, 'Guardas siempre puestas', '#2E7D32', 10) + pl(260, 166, 'Falta o dañada: no se usa', '#D7262B', 9));
  S.al_ta_atrapamiento_parada = () => svg(H.fondo.taller() + H.torno(20, 165) + `<circle cx="44" cy="73" r="10" fill="none" stroke="#2E7D32" stroke-width="3" class="al40p"/>` + hongo(240, 70, 30) + pl(240, 120, 'PARADA DE EMERGENCIA', '#C62828', 10) + pl(200, 182, 'Conoce dónde está antes de partir', '#1565C0', 10));
  S.al_ta_atrapamiento_q_parada = () => svg(H.fondo.taller() + H.torno(20, 165) + hongo(240, 70, 30) + qm(160, 40));
  S.al_ta_atrapamiento_llave = () => svg(H.fondo.taller() + H.torno(30, 165, { gira: false }) + `<path d="M70,97 l22,-26" stroke="#B0BEC5" stroke-width="5"/><path d="M84,70 h14" stroke="#B0BEC5" stroke-width="5"/>` + H.no(140, 60) + pl(80, 14, 'Llave del plato puesta', '#D7262B', 10) + W(250, 165, { pose: 'point', flip: true }) + pl(220, 182, 'Sácala siempre antes de partir', '#2E7D32', 10));

  SI_CONT.temas.push({
    id: 'ta_atrapamiento', sec: 'taller', emp: ['ali'], title: 'Atrapamientos: joyas, ropa suelta y partes en movimiento', thumb: 'al_ta_atrapamiento_ropa', mins: 15,
    learn: [
      { s: 'al_ta_atrapamiento_intro', t: 'Lo que gira, atrapa', x: 'El plato del torno, la broca del taladro, la fresa, los ejes, las correas, las poleas y los rodillos <b>giran con mucha fuerza</b>. Si enganchan un anillo, una manga o un guante, arrastran la mano o el brazo <b>en menos de un segundo</b>, y el motor tiene más fuerza que tú. Un atrapamiento puede causar fracturas, desgarros y <b>amputaciones</b>.' },
      { s: 'al_ta_atrapamiento_joyas', t: 'Sin joyas en el taller', x: 'En toda labor dentro de ALI está <b>estrictamente prohibido</b> usar:<ul><li>Anillos, incluida la argolla de matrimonio.</li><li>Aros colgantes, cadenas y gargantillas.</li><li>Pulseras y reloj.</li></ul>Un anillo enganchado puede <b>arrancar el dedo</b>. Guárdalos antes de empezar el turno.', k: 'Sin anillos, aros, cadenas, pulseras ni reloj.' },
      { s: 'al_ta_atrapamiento_ropa', t: 'Ropa ajustada y abotonada', x: '<ul><li>Ropa de trabajo <b>ajustada al cuerpo</b>, en buen estado y <b>abotonada</b>.</li><li>Mangas abajo y cerradas en el puño.</li><li>Sin bufandas, cuellos sueltos, cordones de polerón, capuchas ni hilachas.</li><li>Camisa dentro del pantalón.</li><li>Nada colgando de los bolsillos, como trapos o huinchas.</li></ul>' },
      { s: 'al_ta_atrapamiento_pelo', t: 'Pelo tomado', x: 'El pelo largo suelto se enrolla en un eje o en una broca y puede <b>arrancar el cuero cabelludo</b>. Si tienes el pelo largo, llévalo <b>tomado y dentro del gorro</b>. Tampoco uses audífonos con cable ni cordones colgando del cuello cerca de las máquinas.' },
      { s: 'al_ta_atrapamiento_guantes', t: 'Guantes: no en lo que gira', x: 'Los guantes protegen de cortes y quemaduras, pero <b>cerca de partes que giran se enganchan</b> y arrastran la mano. Por eso:<ul><li>En el <b>torno, el taladro y la fresa</b>, mientras la máquina gira, se trabaja <b>sin guantes</b>.</li><li>Los guantes se usan para manipular planchas y piezas con la máquina detenida, esmerilar, soldar y cargar.</li></ul>', k: 'Cerca de lo que gira, sin guantes.' },
      { s: 'al_ta_atrapamiento_guardas', t: 'Guardas siempre puestas', x: 'Las guardas y protecciones de correas, poleas, platos, brocas y ejes están para que tu mano no llegue a la parte que gira. <b>No las saques, no las amarres abiertas ni las anules</b>. Si una guarda falta o está dañada, <b>no uses la máquina</b> y avisa a tu jefatura. Después de una mantención, la máquina no parte sin sus guardas.' },
      { s: 'al_ta_atrapamiento_parada', t: 'Parada de emergencia', x: 'Antes de usar una máquina, ubica su <b>botón de parada de emergencia</b> (hongo rojo sobre fondo amarillo) y revisa que funcione. Úsalo ante un atrapamiento o cualquier peligro: detiene la máquina de inmediato. Después de una parada de emergencia, la máquina se revisa antes de volver a partir. No pongas nada delante del botón.' },
      { s: 'al_ta_atrapamiento_llave', t: 'Hábitos que evitan atrapamientos', x: '<ul><li><b>Saca la llave del plato</b> del torno o del mandril del taladro antes de partir: sale disparada.</li><li>No limpies ni saques virutas con la máquina funcionando.</li><li>No te apoyes en una máquina que está trabajando.</li><li>No uses el celular mientras operas.</li><li>Opera solo las máquinas para las que estás capacitado y autorizado.</li></ul>' }
    ],
    quiz: [
      { s: 'al_ta_atrapamiento_joyas', v: [
        { q: 'Llegas al taller con tu argolla de matrimonio. ¿Qué haces?', o: ['Me la saco y la guardo antes de empezar', 'Me la dejo, es muy delgada', 'Me pongo un guante encima', 'Me la dejo si no uso el torno'], w: 'En toda labor dentro de ALI están prohibidos anillos, incluida la argolla, aros, cadenas, pulseras y reloj.' },
        { q: '¿Cuál de estos se puede usar trabajando en el taller?', o: ['Ninguno: anillos, reloj y cadenas están prohibidos', 'Solo el reloj', 'Solo una cadena bajo la ropa', 'Solo aros pequeños'], w: 'Están prohibidos todos los accesorios que puedan engancharse.' },
        { q: 'Un anillo enganchado en una máquina puede arrancar el dedo.', vf: true, w: 'Verdadero. Por eso los anillos están prohibidos en el taller.' }] },
      { s: 'al_ta_atrapamiento_q_ropa', v: [
        { q: 'Hace frío y quieres usar bufanda mientras trabajas en el torno. ¿Qué haces?', o: ['No la uso: abrigo con ropa ajustada bajo la ropa de trabajo', 'La uso bien amarrada', 'La uso por fuera de la chaqueta', 'La uso si el torno gira lento'], w: 'Bufandas, cuellos y cordones sueltos se enganchan en lo que gira.' },
        { q: '¿Cómo debe estar tu ropa de trabajo en el taller?', o: ['Ajustada, abotonada y con las mangas cerradas', 'Suelta, para moverse cómodo', 'Arremangada para no ensuciarla', 'Abierta cuando hace calor'], w: 'Ropa ajustada al cuerpo, abotonada, mangas abajo y cerradas.' },
        { q: 'Un compañero tiene el pelo largo suelto y trabaja en el taladro. ¿Qué le dices?', o: ['Que se tome el pelo y lo meta en el gorro', 'Nada, el taladro gira lento', 'Que se ponga lentes', 'Que trabaje con guantes'], w: 'El pelo largo se lleva tomado y dentro del gorro: se puede enrollar en la broca.' }] },
      { s: 'al_ta_atrapamiento_q_guantes', v: [
        { q: 'Vas a usar el torno. ¿Usas guantes mientras gira?', o: ['No: cerca de lo que gira se trabaja sin guantes', 'Sí, para no cortarme con las virutas', 'Sí, si son de cuero grueso', 'Sí, si están en buen estado'], w: 'Un guante se engancha en la pieza que gira y arrastra la mano.' },
        { q: '¿En qué tarea sí usas guantes?', o: ['Al manipular planchas con la máquina detenida', 'Al operar el taladro de pedestal', 'Al pulir una pieza en el torno girando', 'Al limar una pieza que gira en el torno'], w: 'Los guantes se usan para manipular piezas, esmerilar, soldar y cargar, no cerca de partes que giran.' },
        { q: 'Usar guantes en el taladro de pedestal mientras gira la broca es más seguro.', vf: false, w: 'Falso. El guante se enrolla en la broca y arrastra la mano.' }] },
      { s: 'al_ta_atrapamiento_guardas', v: [
        { q: 'La guarda de la correa del taladro está suelta. ¿Qué haces?', o: ['No uso el taladro y aviso a mi jefatura', 'Lo uso con cuidado', 'La saco para que no moleste', 'La amarro con alambre y trabajo'], w: 'Sin guarda o con guarda dañada no se usa la máquina: se avisa para que se repare.' },
        { q: '¿Para qué sirven las guardas de una máquina?', o: ['Para que la mano no llegue a lo que gira', 'Para que la máquina se vea ordenada', 'Para que no se ensucie el motor', 'Para que haga menos ruido'], w: 'Las guardas separan tu cuerpo de las partes en movimiento.' },
        { q: 'Se puede sacar una guarda si molesta para trabajar más rápido.', vf: false, w: 'Falso. Las guardas no se sacan ni se anulan.' }] },
      { s: 'al_ta_atrapamiento_q_parada', v: [
        { q: '¿Cuándo debes ubicar la parada de emergencia de una máquina?', o: ['Antes de empezar a usarla', 'Cuando ocurre un accidente', 'Cuando lo pida la jefatura', 'Al final del turno'], w: 'Antes de partir debes saber dónde está y que funciona: en una emergencia no hay tiempo para buscarla.' },
        { q: 'Un compañero queda enganchado en el torno. ¿Qué haces primero?', o: ['Aprieto la parada de emergencia', 'Tiro de él hacia atrás', 'Corro a buscar al jefe', 'Le saco el guante'], w: 'Primero se detiene la máquina con la parada de emergencia; después se pide ayuda.' },
        { q: 'Después de usar la parada de emergencia, la máquina se revisa antes de volver a partir.', vf: true, w: 'Verdadero. Se revisa qué pasó y que la máquina esté en condiciones.' }] },
      { s: 'al_ta_atrapamiento_llave', v: [
        { q: 'Terminaste de apretar la pieza en el plato del torno. ¿Qué haces antes de partir?', o: ['Saco la llave del plato', 'Parto de inmediato', 'Dejo la llave puesta para el próximo ajuste', 'Pongo un trapo sobre la llave'], w: 'Una llave olvidada en el plato sale disparada al partir.' },
        { q: '¿Cuál de estos hábitos evita un atrapamiento?', o: ['No apoyarse en una máquina que está trabajando', 'Limpiar las virutas con la máquina girando', 'Usar reloj para controlar el tiempo de mecanizado', 'Operar con el celular en la mano'], w: 'No apoyarse, no limpiar con la máquina andando y no distraerse.' },
        { q: 'Se puede limpiar la viruta con la mano si la máquina gira lento.', vf: false, w: 'Falso. Nunca se limpia con la máquina funcionando: se detiene y se usa un gancho o escobilla.' }] }
    ]
  });

  // ======================================================================
  // 7. TRABAJOS EN FAENAS DE CLIENTES
  // ======================================================================
  const FA = { area: 'faena' }, fa = o => Object.assign({}, FA, o);
  const cliente = (x, y, o = {}) => W(x, y, Object.assign({ helmet: '#1565C0', shirt: '#ECEFF1', pants: '#37474F', vest: true, glasses: true }, o));
  S.al_ta_faenas_intro = () => svg(H.fondo.faena() + camioneta(6, 184) + W(232, 178, fa({ pose: 'walk' })) + W(266, 178, fa({ pose: 'carry' })) + pl(240, 6, 'Lugar nuevo, riesgos nuevos', '#D7262B', 10));
  S.al_ta_faenas_viaje = () => svg(H.fondo.patio() + `<rect y="160" width="320" height="40" fill="#616161"/><path d="M0,180 H320" stroke="#fff" stroke-width="3" stroke-dasharray="18 12"/>` + `<g class="adMov" style="--dx:40px">` + camioneta(20, 190) + `</g>` + `<rect x="278" y="60" width="4" height="100" fill="#78909C"/><circle cx="280" cy="60" r="22" fill="#fff" stroke="#D32F2F" stroke-width="5"/>` + T(280, 66, '90', 16, '#263238') + pl(110, 20, 'Cinturón, sin celular, a la defensiva', '#1565C0', 10) + pl(110, 44, 'Carga y cilindros amarrados', '#2E7D32', 10));
  S.al_ta_faenas_induccion = () => svg(H.fondo.faena() + cliente(70, 178, { pose: 'point' }) + `<rect x="10" y="40" width="80" height="54" rx="3" fill="#fff" stroke="#90A4AE"/>` + T(50, 56, 'Planta', 9, '#263238') + `<path d="M20,64 h20 v20 h40" stroke="#2E7D32" stroke-width="3" fill="none"/><circle cx="76" cy="84" r="4" fill="#2E7D32"/>` + W(170, 178, fa({ flip: true })) + W(210, 178, fa({ flip: true })) + W(250, 178, fa({ flip: true })) + pl(210, 50, 'Charla de inducción del cliente', '#1565C0', 10) + pl(210, 74, 'Rutas, evacuación y reglas', '#455A64', 9));
  S.al_ta_faenas_permiso = () => svg(H.fondo.faena() + doc(30, 30, 'PERMISO DE TRABAJO', 'Firmado', '#2E7D32', 100, 120) + `<path d="M50,128 q10,-10 20,0 q10,10 20,-4" stroke="#1565C0" stroke-width="2" fill="none"/>` + cliente(190, 178, { pose: 'point', flip: true }) + W(260, 178, fa({ flip: true })) + pl(220, 40, 'Sin permiso no se empieza', '#D7262B', 10));
  S.al_ta_faenas_epp = () => svg(H.fondo.faena() + `<g transform="translate(70,-90) scale(1.6)">` + W(10, 175, fa({})) + `</g>` + pl(210, 30, 'Casco', '#1565C0', 10) + pl(210, 54, 'Chaleco reflectante', '#1565C0', 10) + pl(210, 78, 'Lentes y zapatos de seguridad', '#1565C0', 10) + pl(210, 102, 'Más lo que exija la faena', '#2E7D32', 10) + pl(210, 140, 'No operes equipos del cliente', '#D7262B', 10));
  S.al_ta_faenas_delimitar = () => svg(H.fondo.faena() + H.mesaSoldar(110, 178, 100) + W(140, 178, fa({ pose: 'bend' })) + cinta(60, 260, 172) + cono(60, 194) + cono(260, 194) + `<rect x="200" y="174" width="34" height="14" rx="2" fill="#fff" stroke="#D32F2F" stroke-width="2"/>` + T(217, 184, 'NO PASAR', 6, '#D32F2F') + pl(160, 30, 'Área delimitada y señalizada', '#2E7D32', 10));
  S.al_ta_faenas_caliente = () => { const s = { area: 'soldadura', pose: 'bend', careta: true, helmet: '#FFFFFF' }; return svg(H.fondo.faena() + H.mesaSoldar(90, 178, 100) + W(110, 178, s) + H.arco(142, 128) + H.chispas(142, 130) + H.biombo(196, 178, 40) + H.extintor(248, 178, 'PQS', .8) + W(288, 178, fa({ pose: 'stand', flip: true })) + doc(10, 30, 'PERMISO', 'Trabajo en caliente', '#E65100', 66, 76) + pl(262, 60, 'Vigía con extintor', '#2E7D32', 10)); };
  S.al_ta_faenas_q_caliente = () => svg(H.fondo.faena() + H.mesaSoldar(90, 178, 100) + W(110, 178, { area: 'soldadura', pose: 'bend', careta: true, helmet: '#FFFFFF' }) + H.arco(142, 128) + H.chispas(142, 130) + H.bidon(220, 178, '#FB8C00', 'ACEITE') + qm(280, 60));
  S.al_ta_faenas_terminar = () => svg(H.fondo.faena() + W(80, 178, fa({ pose: 'point' }))  + cliente(250, 178, { flip: true }) + `<rect x="200" y="30" width="110" height="34" rx="8" fill="#fff" stroke="#90A4AE"/>` + T(255, 45, 'Aviso: baranda suelta', 9, '#D32F2F') + T(255, 58, 'en la pasarela', 9, '#D32F2F') + pl(90, 30, 'Área ordenada y entregada', '#2E7D32', 10));

  SI_CONT.temas.push({
    id: 'ta_faenas', sec: 'taller', emp: ['ali'], title: 'Trabajos en faenas de clientes', thumb: 'al_ta_faenas_intro', mins: 15,
    learn: [
      { s: 'al_ta_faenas_intro', t: 'Trabajar en casa ajena', x: 'ALI repara, monta y suelda en <b>plantas y faenas de clientes</b>. Ahí todo es distinto: no conoces el lugar, hay máquinas, vehículos, químicos y trabajos de otras empresas, y el cliente tiene <b>sus propias reglas</b>. A los riesgos de tu trabajo se suman los del lugar. Por eso, en faena eres doblemente cuidadoso: tu conducta también representa a ALI.' },
      { s: 'al_ta_faenas_viaje', t: 'El viaje a la faena', x: '<ul><li>Conduce solo si estás <b>autorizado</b> y descansado.</li><li><b>Cinturón</b> para todos, <b>sin celular</b> y a la defensiva.</li><li>Respeta la señalización; en la vía pública, como máximo <b>90 km/h</b>.</li><li>Herramientas y piezas <b>amarradas</b>; los cilindros de gas van <b>de pie, amarrados y con su capuchón</b>, nunca dentro de la cabina.</li><li>Dentro de la faena, la velocidad que indique el cliente.</li></ul>' },
      { s: 'al_ta_faenas_induccion', t: 'Primero, la inducción del cliente', x: 'Al llegar, participa en la <b>charla de inducción</b> del cliente. Ahí conocerás:<ul><li>Las zonas donde puedes y no puedes entrar.</li><li>Las rutas peatonales y vehiculares.</li><li>Las <b>vías de evacuación</b>, el punto de encuentro y cómo avisar una emergencia.</li><li>Los riesgos propios de esa planta.</li></ul><b>Sin inducción no se entra a trabajar</b>.', k: 'Sin la inducción del cliente, no se empieza a trabajar.' },
      { s: 'al_ta_faenas_permiso', t: 'Permisos de trabajo', x: 'Muchas faenas exigen un <b>permiso de trabajo</b> firmado antes de empezar, sobre todo para trabajos en caliente, en altura, con bloqueo de equipos o en espacios cerrados. Revisa que el permiso corresponda a tu tarea y cumple lo que dice. <b>Si no hay permiso, no se empieza</b>. Si la tarea cambia, se pide un permiso nuevo.' },
      { s: 'al_ta_faenas_epp', t: 'Sus reglas y su EPP', x: '<ul><li>En faena usas <b>casco y chaleco reflectante</b>, además de lentes y zapatos de seguridad.</li><li>Agrega el EPP que exija el cliente: protector auditivo, respirador, barbiquejo u otro.</li><li>Respeta sus velocidades, vías peatonales y zonas prohibidas.</li><li><b>No operes ni intervengas equipos del cliente</b>: si un equipo debe bloquearse, se coordina con él.</li></ul>' },
      { s: 'al_ta_faenas_delimitar', t: 'Delimita tu área de trabajo', x: 'Marca tu área con <b>conos, cinta y letreros</b>, para que trabajadores y vehículos del cliente no entren. Mantén ordenados tus materiales, cables y mangueras, sin cruzar las vías de tránsito. Si trabajas en altura, nadie pasa por debajo.' },
      { s: 'al_ta_faenas_caliente', t: 'Trabajos en caliente', x: 'Soldar, cortar con oxicorte o plasma y esmerilar en una faena es <b>trabajo en caliente</b>:<ul><li>Solo con <b>permiso de trabajo en caliente</b>.</li><li>Retira o cubre lo que pueda arder alrededor.</li><li>Un <b>vigía con extintor</b> observa mientras trabajas y se queda <b>un tiempo después de terminar</b>, porque una brasa puede encenderse más tarde.</li><li>Biombos para proteger a los demás del arco y las chispas.</li></ul>' },
      { s: 'al_ta_faenas_terminar', t: 'Al terminar y si ves algo inseguro', x: '<ul><li>Deja el área <b>ordenada y limpia</b>: retira restos, colillas de soldadura y materiales.</li><li>Entrega el área al encargado del cliente.</li></ul>Si ves una <b>condición insegura</b> en el lugar (una baranda suelta, una fuga, un equipo sin protección), <b>detén tu trabajo</b> y avisa a tu jefatura y al encargado del cliente. No trabajes en condiciones que te pongan en peligro.' }
    ],
    quiz: [
      { s: 'al_ta_faenas_induccion', v: [
        { q: 'Llegas a la planta de un cliente y te piden empezar sin la inducción. ¿Qué haces?', o: ['Pido la inducción antes de empezar', 'Empiezo y la hago después', 'Empiezo, porque ya conozco otras plantas', 'Le pregunto a un trabajador del lugar y empiezo'], w: 'Sin la inducción del cliente no se entra a trabajar: ahí conoces sus reglas, riesgos y vías de evacuación.' },
        { q: '¿Qué conoces en la inducción del cliente?', o: ['Zonas, rutas, evacuación y riesgos de la planta', 'Solo el horario de colación', 'Solo dónde estacionar', 'Solo el nombre del encargado'], w: 'La inducción te muestra dónde puedes ir, por dónde transitar, cómo evacuar y qué riesgos hay.' },
        { q: 'Si ya fuiste antes a esa faena, no necesitas escuchar la charla de inducción.', vf: false, w: 'Falso. Se hace la inducción que exija el cliente: las condiciones y reglas cambian.' }] },
      { s: 'al_ta_faenas_permiso', v: [
        { q: 'Debes soldar en la faena y el permiso de trabajo aún no está firmado. ¿Qué haces?', o: ['Espero el permiso firmado antes de empezar', 'Empiezo y lo firmo después', 'Suelto rápido para no atrasarme', 'Uso el permiso de otro trabajo'], w: 'Si no hay permiso de trabajo, no se empieza.' },
        { q: 'En plena tarea te piden hacer un trabajo distinto en altura. ¿Qué haces?', o: ['Pido un permiso nuevo para esa tarea', 'Lo hago con el mismo permiso', 'Lo hago si es rápido', 'Lo hago y aviso al terminar'], w: 'Si la tarea cambia, se pide un permiso nuevo que corresponda.' },
        { q: 'El permiso de trabajo debe corresponder a la tarea que vas a hacer.', vf: true, w: 'Verdadero. Cada permiso evalúa los riesgos de una tarea concreta.' }] },
      { s: 'al_ta_faenas_epp', v: [
        { q: 'En la faena del cliente, ¿qué EPP usas?', o: ['Casco, chaleco, lentes, zapatos y lo que exija el cliente', 'Solo el EPP que uso en el taller', 'Solo casco', 'El que me acomode'], w: 'En faena usas casco y chaleco reflectante, además de lentes, zapatos de seguridad y el EPP que exija el cliente.' },
        { q: 'Una bomba del cliente debe detenerse para tu trabajo. ¿Qué haces?', o: ['Coordino con el encargado del cliente el bloqueo', 'La detengo yo mismo con su botón', 'Le corto la energía en el tablero más cercano', 'Trabajo con la bomba andando'], w: 'Los equipos del cliente no se operan ni se intervienen sin coordinar con él.' },
        { q: 'Puedes operar un equipo del cliente si sabes usarlo.', vf: false, w: 'Falso. No se operan equipos del cliente sin su autorización y coordinación.' }] },
      { s: 'al_ta_faenas_delimitar', v: [
        { q: 'Vas a trabajar junto a una vía de tránsito de la faena. ¿Qué haces?', o: ['Delimito con conos, cinta y letreros', 'Trabajo atento a los vehículos', 'Pido a los vehículos que pasen lento', 'Dejo mis materiales en la vía para que se note'], w: 'El área se delimita para que nadie entre, y los materiales no se dejan en las vías.' },
        { q: '¿Dónde dejas los cables y mangueras en la faena?', o: ['Ordenados, sin cruzar las vías de tránsito', 'Cruzando el camino, es más corto', 'Donde caigan', 'Colgando de las barandas'], w: 'Cables y mangueras ordenados y fuera de las vías, para evitar tropiezos y daños.' },
        { q: 'Delimitar el área de trabajo protege también a los trabajadores del cliente.', vf: true, w: 'Verdadero. Evita que otros entren a una zona con riesgo.' }] },
      { s: 'al_ta_faenas_q_caliente', v: [
        { q: 'Vas a soldar en la faena y cerca hay un bidón de aceite. ¿Qué haces?', o: ['Lo retiro o lo cubro, con permiso y vigía con extintor', 'Sueldo rápido', 'Sueldo dando la espalda al bidón', 'Le echo agua al bidón y sueldo'], w: 'Se retira o cubre lo que pueda arder, se trabaja con permiso de trabajo en caliente y con vigía con extintor.' },
        { q: '¿Qué hace el vigía en un trabajo en caliente?', o: ['Observa con un extintor y se queda un tiempo después', 'Suelda cuando el soldador descansa', 'Vigila que no lleguen jefaturas', 'Se va apenas termina la soldadura'], w: 'El vigía observa con extintor y se queda después de terminar, porque una brasa puede encenderse más tarde.' },
        { q: 'Al terminar de soldar, el vigía se puede retirar de inmediato.', vf: false, w: 'Falso. Se queda un tiempo, porque una brasa puede encenderse más tarde.' }] },
      { s: 'al_ta_faenas_terminar', v: [
        { q: 'En la faena ves una baranda suelta en la pasarela donde trabajarás. ¿Qué haces?', o: ['Detengo mi trabajo y aviso a mi jefatura y al cliente', 'Trabajo sin apoyarme en ella', 'La amarro con alambre y sigo', 'No digo nada, no es de ALI'], w: 'Ante una condición insegura del lugar se detiene el trabajo y se avisa a tu jefatura y al encargado del cliente.' },
        { q: 'Terminaste el trabajo en la faena. ¿Qué haces?', o: ['Ordeno, limpio y entrego el área al cliente', 'Me voy y el cliente ordena', 'Dejo los restos para la próxima visita', 'Guardo solo mis herramientas'], w: 'El área se deja ordenada y limpia, y se entrega al encargado del cliente.' },
        { q: '¿Cómo llevas los cilindros de gas en la camioneta hacia la faena?', o: ['De pie, amarrados y con su capuchón', 'Acostados en la cabina', 'Sueltos en la carrocería', 'Sin capuchón, para usarlos rápido'], w: 'Los cilindros viajan de pie, amarrados y con su capuchón, nunca dentro de la cabina.' }] }
    ]
  });

  // ======================================================================
  // 8. HERRAMIENTAS MANUALES Y ELÉCTRICAS PORTÁTILES
  // ======================================================================
  const panel = () => `<rect x="20" y="30" width="280" height="90" fill="#ECEFF1" stroke="#90A4AE"/>` + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(i => `<circle cx="${30 + i * 20}" cy="40" r="1.6" fill="#90A4AE"/>`).join('');
  S.al_ta_herramientas_intro = () => svg(H.fondo.taller() + banco(20, 165, 280) + panel() + martillo(36, 60, .8) + llave(110, 60, .7) + lima(186, 60, .8) + cincel(40, 100, .9) + destornillador(130, 100, .9) + taladroP(250, 112, .9) + pl(160, 140, 'Simples, pero causan muchas lesiones', '#D7262B', 10));
  S.al_ta_herramientas_revisar = () => svg(H.fondo.liso() + martillo(20, 50, 1.3) + H.si(130, 50, 12) + martillo(170, 50, 1.3, true) + H.no(300, 50, 12) + `<path d="M50,120 q30,10 70,0" stroke="#263238" stroke-width="3" fill="none"/>` + taladroP(40, 140, .9) + H.si(130, 120, 12) + `<path d="M210,120 q20,10 30,2" stroke="#263238" stroke-width="3" fill="none"/><path d="M240,122 l8,-4 l2,8 l8,-4" stroke="#FFC20E" stroke-width="3" fill="none"/>` + taladroP(190, 140, .9) + H.no(300, 120, 12) + pl(80, 178, 'Mango y cable sanos', '#2E7D32', 9) + pl(240, 178, 'Dañada: no se usa, se avisa', '#D7262B', 9));
  S.al_ta_herramientas_q_revisar = () => svg(H.fondo.liso() + martillo(60, 70, 2, true) + `<path d="M60,140 q40,10 80,0" stroke="#263238" stroke-width="3" fill="none"/><path d="M140,140 l8,-4 l2,8 l8,-4" stroke="#FFC20E" stroke-width="3" fill="none"/>` + qm(260, 140));
  S.al_ta_herramientas_correcta = () => svg(H.fondo.liso() + destornillador(20, 60, 1.4) + `<rect x="100" y="66" width="30" height="20" fill="#78909C"/>` + T(65, 100, 'Como palanca o cincel', 9, '#D32F2F') + H.no(150, 40, 12) + llave(180, 60, 1.1) + `<rect x="236" y="48" width="24" height="24" fill="#455A64"/>` + T(240, 100, 'Como martillo', 9, '#D32F2F') + H.no(300, 40, 12) + llave(30, 150, 1.1) + `<path d="M28,146 h-26" stroke="#B0BEC5" stroke-width="10"/>` + T(70, 175, 'Con tubo alargador', 9, '#D32F2F') + H.no(150, 130, 12) + llave(180, 150, 1.1) + T(240, 175, 'Del tamaño exacto', 9, '#2E7D32') + H.si(300, 130, 12));
  S.al_ta_herramientas_cincel = () => svg(H.fondo.liso() + `<g transform="translate(40,60) scale(2)">` + cincel(8, 10, 1, true) + `</g>` + H.no(240, 60) + `<g class="al40w">` + [0, 1, 2].map(i => `<path d="M${40 - i * 6},${68 + i * 6} l-14,${-10 + i * 10}" stroke="#78909C" stroke-width="2.5"/>`).join('') + `</g>` + pl(160, 22, 'Cabeza en hongo: se cambia', '#D7262B', 10) + `<g transform="translate(40,120) scale(2)">` + cincel(8, 10, 1, false) + `</g>` + H.si(240, 140) + pl(160, 180, 'Cabeza sana, con lentes puestos', '#2E7D32', 10));
  S.al_ta_herramientas_q_cincel = () => svg(H.fondo.liso() + `<g transform="translate(60,80) scale(2.4)">` + cincel(8, 10, 1, true) + `</g>` + qm(270, 50));
  S.al_ta_herramientas_lima = () => svg(H.fondo.liso() + lima(20, 40, 1.6) + H.si(140, 40, 12) + pl(236, 32, 'Lima con su mango', '#2E7D32', 9) + lima(20, 100, 1.6, false) + H.no(140, 100, 12) + pl(236, 82, 'Sin mango, la espiga', '#D7262B', 9) + pl(236, 104, 'puede atravesar la mano', '#D7262B', 9)
    + martillo(20, 160, 1.2) + H.si(140, 160, 12) + pl(236, 152, 'Mango sano y acuñado', '#2E7D32', 9));
  S.al_ta_herramientas_llave = () => { const po = { pose: 'carry', gloves: '#8D6E63' }, [hx, hy] = pt(70, 165, po, 'hR');
    return svg(H.fondo.taller() + `<rect x="130" y="60" width="16" height="105" fill="#78909C" stroke="${OL}"/><circle cx="138" cy="${hy}" r="7" fill="#455A64" stroke="${OL}"/>` + W(70, 165, po) + `<path d="M${hx - 4},${hy} L138,${hy}" stroke="#90A4AE" stroke-width="6" stroke-linecap="round"/>` + `<path d="M120,${hy - 20} q-20,-10 -36,0" stroke="#2E7D32" stroke-width="3" fill="none"/><path d="M84,${hy - 20} l8,-4 M84,${hy - 20} l7,5" stroke="#2E7D32" stroke-width="3"/>` + pl(240, 132, 'Tira hacia ti, no empujes', '#2E7D32', 9) + pl(240, 156, 'Postura firme por si resbala', '#2E7D32', 9) + pl(240, 180, 'Llave fija antes que ajustable', '#1565C0', 9)); };
  S.al_ta_herramientas_taladro = () => { const po = { pose: 'carry', gloves: false }, [hx, hy] = pt(80, 165, po, 'hR');
    return svg(H.fondo.taller() + banco(100, 165, 140) + prensa(144, 119) + `<rect x="142" y="100" width="30" height="9" fill="#78909C" stroke="${OL}"/>` + W(80, 165, po) + taladroP(hx, hy + 22, .8) + pl(240, 26, 'Pieza en la prensa', '#2E7D32', 9) + pl(240, 48, 'Llave del mandril fuera', '#2E7D32', 9) + pl(240, 70, 'Desenchufa para cambiar broca', '#1565C0', 9) + pl(100, 182, 'Sin guantes que se enrollen en la broca', '#455A64', 9)); };
  S.al_ta_herramientas_bolsillo = () => svg(H.fondo.taller() + W(70, 165, { pose: 'bend' }) + `<g transform="rotate(-60 64 126)">` + destornillador(52, 126, .8) + `</g>` + H.no(130, 40) + div(170) + banco(190, 165, 110) + `<rect x="210" y="98" width="70" height="21" rx="3" fill="${H.ALI1}" stroke="${OL}"/><path d="M226,98 v-8 h38 v8" stroke="${OL}" stroke-width="3" fill="none"/>` + H.si(300, 40) + pl(80, 182, 'En el bolsillo', '#D7262B', 10) + pl(246, 182, 'En su caja o su lugar', '#2E7D32', 10));
  S.al_ta_herramientas_q_bolsillo = () => svg(H.fondo.taller() + W(120, 165, { pose: 'bend' }) + `<g transform="rotate(-60 114 126)">` + destornillador(102, 126, .8) + `</g>` + qm(250, 60));

  SI_CONT.temas.push({
    id: 'ta_herramientas', sec: 'taller', emp: ['ali'], title: 'Herramientas manuales y eléctricas portátiles', thumb: 'al_ta_herramientas_intro', mins: 15,
    learn: [
      { s: 'al_ta_herramientas_intro', t: 'Herramientas de todos los días', x: 'Martillos, llaves, limas, cinceles, destornilladores y el taladro portátil se usan a diario en la maestranza. Parecen simples, pero causan muchas lesiones: <b>golpes en las manos, cortes, partículas en los ojos</b> y descargas eléctricas. La mayoría ocurre por usar una herramienta dañada o la herramienta equivocada. En el taller usas siempre <b>lentes de seguridad</b>.' },
      { s: 'al_ta_herramientas_revisar', t: 'Revisa antes de usar', x: '<ul><li><b>Mangos</b> sanos: sin trizaduras, astillas ni grasa, y bien firmes.</li><li><b>Cabezas</b> bien encajadas.</li><li>Eléctricas: <b>cable, enchufe y carcasa</b> sin daños, sin uniones ni cinta aislante, y el interruptor funcionando.</li><li>No uses herramientas eléctricas con las <b>manos mojadas</b>.</li></ul>Una herramienta dañada <b>no se usa</b>: se separa, se marca y se avisa a tu jefatura.', k: 'Herramienta defectuosa no se usa: se separa y se avisa.' },
      { s: 'al_ta_herramientas_correcta', t: 'La herramienta correcta, sin improvisar', x: '<ul><li>Cada herramienta para lo que fue hecha: el destornillador <b>no es palanca ni cincel</b>, y la llave <b>no es martillo</b>.</li><li>Usa la llave del <b>tamaño exacto</b> de la tuerca: una más grande resbala.</li><li><b>No alargues</b> las llaves con tubos para hacer más fuerza.</li><li>No hagas herramientas "hechizas".</li></ul>Si no tienes la herramienta adecuada, pídela.' },
      { s: 'al_ta_herramientas_cincel', t: 'Cinceles y punzones', x: 'Con los golpes, la cabeza del cincel se aplasta y forma un <b>"hongo"</b> con rebabas. Al golpearla, esas rebabas <b>saltan como esquirlas</b> a los ojos o a la cara de quien esté cerca. Un cincel o punzón con cabeza en hongo <b>se cambia</b>. Usa lentes, sujeta el cincel con un <b>portacincel</b> si lo tienes, y golpea mirando la punta.' },
      { s: 'al_ta_herramientas_lima', t: 'Limas y martillos', x: '<ul><li>La lima se usa <b>siempre con su mango</b>: sin él, la espiga puede atravesar la mano.</li><li>No golpees la lima ni la uses como palanca: es dura y frágil, se quiebra.</li><li>El martillo debe tener el mango sano y la cabeza <b>bien acuñada</b>.</li><li>Golpea de plano, mirando el punto de golpe, con los dedos fuera.</li></ul>' },
      { s: 'al_ta_herramientas_llave', t: 'Llaves: tira hacia ti', x: '<ul><li><b>Tira</b> de la llave hacia ti en vez de empujarla: si se suelta, no te vas contra la pieza.</li><li>Párate firme, con los pies separados, por si resbala.</li><li>Prefiere la llave fija o de punta corona antes que la ajustable.</li><li>Si la tuerca no sale, no golpees la llave: pide ayuda o la herramienta adecuada.</li></ul>' },
      { s: 'al_ta_herramientas_taladro', t: 'Taladro portátil', x: '<ul><li>La pieza va <b>fija en la prensa</b>, nunca sujeta con la mano.</li><li>Broca bien apretada y <b>la llave del mandril fuera</b> antes de partir.</li><li>Toma el taladro firme, con el mango auxiliar si lo tiene: si la broca se traba, el taladro gira con fuerza.</li><li><b>Desenchufa</b> para cambiar la broca.</li><li>Sin guantes ni ropa suelta que se puedan enrollar en la broca.</li></ul>' },
      { s: 'al_ta_herramientas_bolsillo', t: 'Guardar y transportar', x: '<ul><li><b>No lleves herramientas en los bolsillos</b>: al agacharte o caer, se clavan.</li><li>Llévalas en su <b>caja</b> o cinturón portaherramientas, con las puntas protegidas.</li><li>Al terminar, guárdalas en su lugar: un banco ordenado evita cortes y caídas de herramientas.</li><li>Los cables de las herramientas eléctricas no cruzan los pasillos.</li></ul>' }
    ],
    quiz: [
      { s: 'al_ta_herramientas_q_revisar', v: [
        { q: 'El mango del martillo tiene una trizadura. ¿Qué haces?', o: ['No lo uso, lo separo y aviso', 'Lo uso con golpes suaves', 'Lo envuelvo con cinta y lo uso', 'Lo uso solo un rato'], w: 'Una herramienta defectuosa no se usa: se separa, se marca y se avisa.' },
        { q: 'El cable del taladro portátil tiene una unión con cinta aislante. ¿Qué haces?', o: ['No lo uso y aviso para que lo reparen', 'Lo uso si la cinta está firme', 'Le pongo más cinta y trabajo', 'Lo uso con guantes'], w: 'Cables con uniones o cinta aislante no se usan: hay riesgo de descarga eléctrica.' },
        { q: 'Una herramienta defectuosa se puede usar si el trabajo es corto.', vf: false, w: 'Falso. Herramienta defectuosa no se usa.' }] },
      { s: 'al_ta_herramientas_correcta', v: [
        { q: 'Necesitas abrir una tapa trabada y solo tienes un destornillador a mano. ¿Qué haces?', o: ['Busco la herramienta adecuada', 'Hago palanca con el destornillador', 'Golpeo el destornillador con el martillo', 'Uso la llave como palanca'], w: 'El destornillador no es palanca ni cincel: se usa la herramienta adecuada.' },
        { q: 'La tuerca está muy apretada. ¿Qué haces?', o: ['Uso la llave del tamaño exacto y pido ayuda si no sale', 'Alargo la llave con un tubo', 'Golpeo la llave con el martillo', 'Uso una llave más grande'], w: 'No se alargan las llaves con tubos ni se golpean: se usa la llave exacta y la herramienta correcta.' },
        { q: 'Una llave puede usarse como martillo si no hay otro a mano.', vf: false, w: 'Falso. Cada herramienta para lo que fue hecha.' }] },
      { s: 'al_ta_herramientas_q_cincel', v: [
        { q: 'El cincel que vas a usar tiene la cabeza en forma de hongo. ¿Qué haces?', o: ['No lo uso: se cambia', 'Lo uso golpeando más suave', 'Lo uso si me pongo lentes', 'Le pongo cinta en la cabeza'], w: 'Las rebabas del hongo saltan como esquirlas: el cincel se cambia.' },
        { q: '¿Qué peligro tiene un cincel con cabeza en hongo?', o: ['Las rebabas saltan como esquirlas a los ojos', 'Corta más rápido y se calienta', 'Pesa más y cansa la mano', 'Se oxida más rápido'], w: 'Al golpearlo, las rebabas se desprenden como esquirlas.' },
        { q: 'Un punzón con cabeza en hongo se puede seguir usando si el compañero está lejos.', vf: false, w: 'Falso. Las esquirlas también te dañan a ti: se cambia.' }] },
      { s: 'al_ta_herramientas_lima', v: [
        { q: 'Encuentras una lima sin mango. ¿Qué haces?', o: ['Le pongo su mango antes de usarla', 'La uso tomándola de la espiga', 'La uso como palanca', 'La golpeo con el martillo para rebajar'], w: 'La lima siempre con su mango: sin él, la espiga puede atravesar la mano.' },
        { q: '¿Por qué no se golpea una lima?', o: ['Porque es dura y frágil: se quiebra', 'Porque se pierde el filo del martillo', 'Porque se dobla', 'Porque hace mucho ruido'], w: 'La lima es dura y frágil: al golpearla se quiebra y salta.' },
        { q: 'El martillo debe tener la cabeza bien acuñada al mango.', vf: true, w: 'Verdadero. Una cabeza suelta puede salir volando.' }] },
      { s: 'al_ta_herramientas_llave', v: [
        { q: '¿Cómo aplicas fuerza con una llave para soltar una tuerca?', o: ['Tiro hacia mí, con postura firme', 'La empujo con todo el cuerpo', 'Me paro sobre la llave', 'La golpeo con el martillo'], w: 'Tirando hacia ti, si la llave se suelta no te golpeas contra la pieza.' },
        { q: '¿Qué llave conviene usar cuando se puede elegir?', o: ['La fija o de punta corona del tamaño exacto', 'La ajustable más grande', 'Cualquiera que entre', 'Un alicate'], w: 'La llave fija del tamaño exacto agarra mejor y resbala menos.' },
        { q: 'Es más seguro empujar la llave que tirar de ella.', vf: false, w: 'Falso. Se tira hacia uno: si la llave resbala, no te golpeas contra la pieza.' }] },
      { s: 'al_ta_herramientas_taladro', v: [
        { q: 'Vas a perforar una plancha pequeña con el taladro portátil. ¿Cómo la sujetas?', o: ['Fija en la prensa', 'Con la otra mano', 'Con el pie', 'Que un compañero la sostenga'], w: 'La pieza va fija en la prensa: si la broca se traba, la pieza gira.' },
        { q: 'Vas a cambiar la broca del taladro portátil. ¿Qué haces primero?', o: ['Lo desenchufo', 'Lo dejo enchufado con el seguro', 'Lo apago y cambio la broca', 'Lo hago girar lento para soltarla'], w: 'Se desenchufa antes de cambiar la broca.' },
        { q: 'Antes de partir el taladro hay que sacar la llave del mandril.', vf: true, w: 'Verdadero. Una llave olvidada sale disparada al partir.' }] },
      { s: 'al_ta_herramientas_q_bolsillo', v: [
        { q: 'Debes llevar un destornillador a otra parte del taller. ¿Cómo lo llevas?', o: ['En su caja o cinturón portaherramientas', 'En el bolsillo trasero', 'En el bolsillo de la camisa', 'En la boca'], w: 'Las herramientas no van en los bolsillos: al agacharte o caer, se clavan.' },
        { q: 'Terminaste de usar tus herramientas. ¿Qué haces?', o: ['Las guardo en su lugar', 'Las dejo en el banco para mañana', 'Las dejo en el piso junto a la máquina', 'Las dejo en la máquina'], w: 'Un banco ordenado evita cortes y caídas de herramientas.' },
        { q: 'Llevar un destornillador en el bolsillo es seguro si la punta queda hacia abajo.', vf: false, w: 'Falso. Al agacharte o caer se puede clavar igual.' }] }
    ]
  });

  // ===================== ACTIVIDADES =====================
  window.HT_ACT = (window.HT_ACT || []).concat([
    { tema: 'ta_bloqueo', tipo: 'orden', q: '🧩 Actividad: el torno debe repararse. Ordena los pasos del bloqueo.',
      items: ['Aviso a las personas del área que voy a detener el torno', 'Detengo el torno con su botón', 'Corto la energía en el tablero', 'Pongo mi candado y mi tarjeta', 'Espero que el plato se detenga por completo', 'Aprieto partir y verifico que no parte'],
      w: 'Avisas, detienes, cortas la energía en el tablero, pones tu candado y tu tarjeta, esperas que todo se detenga y verificas energía cero. Recién entonces intervienes.' },
    { tema: 'ta_esmeril', tipo: 'tarjetas', q: '🧩 Actividad: ¿así sí o así no con el esmeril? Desliza cada tarjeta.',
      items: [['Esmerilar con lentes, careta facial, protector auditivo y guantes', 0, 'al_ta_esmeril_epp'], ['Usar el esmeril sin la guarda', 1, 'al_ta_esmeril_guarda:L'], ['Dirigir las chispas hacia un cilindro de gas', 1, 'al_ta_esmeril_chispas:L'],
        ['Desenchufar el esmeril antes de cambiar el disco', 0, 'al_ta_esmeril_cambio'], ['Dejar el esmeril en el piso con el disco girando', 1, 'al_ta_esmeril_q_dejar'], ['Esmerilar con la pieza fija en la prensa', 0, 'al_ta_esmeril_uso']],
      w: 'Así sí: EPP completo, desenchufar para cambiar el disco y la pieza fija en la prensa. Así no: sacar la guarda, dirigir chispas a gases o personas, y dejar el esmeril girando.' }
  ]);
})();

/* ---- 50_maquinas.js ---- */
/* Maestranza ALI · charlas de Máquinas y herramientas (torno, fresadora, taladro y sierra huincha, guillotina/plegadora/prensa,
   mesa de corte CNC) y de Granallado y pintura. Dibujos con prefijo al_<idcharla>_, clases CSS amq_*. */
(function () {
  const H = window.HD, T = H.T, pl = H.pill, OL = '#263238';
  const f1 = v => (+v).toFixed(1);
  // ===================== animaciones propias =====================
  const CSS = '<style>'
    + '.amq_ds{animation:amq_ds .5s linear infinite}@keyframes amq_ds{to{stroke-dashoffset:-11}}'
    + '.amq_pr{animation:amq_pr .9s linear infinite}@keyframes amq_pr{0%{transform:translate(0,0);opacity:1}100%{transform:translate(22px,-14px);opacity:0}}'
    + '.amq_pl{animation:amq_pl .9s linear infinite}@keyframes amq_pl{0%{transform:translate(0,0);opacity:1}100%{transform:translate(-22px,-14px);opacity:0}}'
    + '.amq_pu{animation:amq_pu 1s linear infinite}@keyframes amq_pu{0%{transform:translate(0,0);opacity:1}100%{transform:translate(5px,-22px);opacity:0}}'
    + '.amq_pd{animation:amq_pd 1s linear infinite}@keyframes amq_pd{0%{transform:translate(0,0);opacity:1}100%{transform:translate(6px,20px);opacity:0}}'
    + '.amq_bl{animation:amq_bl 1s steps(2) infinite}@keyframes amq_bl{50%{opacity:.25}}'
    + '.amq_mv{animation:amq_mv 3.4s ease-in-out infinite alternate}@keyframes amq_mv{from{transform:translateX(0)}to{transform:translateX(var(--dx,50px))}}'
    + '.amq_wb{transform-box:fill-box;transform-origin:0% 50%;animation:amq_wb .35s ease-in-out infinite alternate}@keyframes amq_wb{from{transform:rotate(-3deg)}to{transform:rotate(3deg)}}'
    + '.amq_ky{transform-box:fill-box;transform-origin:50% 50%;animation:amq_ky 1.8s ease-in infinite}@keyframes amq_ky{0%,35%{transform:translate(0,0) rotate(0);opacity:1}100%{transform:translate(46px,-50px) rotate(320deg);opacity:0}}'
    + '.amq_cut{animation:amq_cut 1.6s ease-in-out infinite}@keyframes amq_cut{0%,45%,100%{transform:translateY(0)}65%{transform:translateY(var(--dy,8px))}}'
    + '.amq_hu{animation:amq_hu 2.6s ease-out infinite}@keyframes amq_hu{0%{transform:translateY(0);opacity:.85}100%{transform:translateY(-20px);opacity:0}}'
    + '.amq_hd{animation:amq_hd 1.4s linear infinite}@keyframes amq_hd{0%{transform:translateY(-6px);opacity:0}30%{opacity:.9}100%{transform:translateY(14px);opacity:0}}'
    + '.amq_jt{animation:amq_jt .35s linear infinite}@keyframes amq_jt{to{stroke-dashoffset:-8}}'
    + '.amq_sp{transform-box:fill-box;transform-origin:50% 50%;animation:amq_sp .8s linear infinite}@keyframes amq_sp{to{transform:rotate(360deg)}}'
    + '.amq_on{animation:amq_on .7s ease-in-out infinite alternate}@keyframes amq_on{from{opacity:.35}to{opacity:1}}'
    + '.amq_pg{animation:amq_pg 2.4s ease-in-out infinite}@keyframes amq_pg{0%,25%{transform:rotate(0)}70%,85%{transform:rotate(28deg)}100%{transform:rotate(0)}}'
    + '</style>';
  const V = inner => sv(H.CSS + CSS + inner);
  // ===================== poses propias =====================
  if (typeof POSES !== 'undefined') Object.assign(POSES, {
    amq_op: { fL: [-7, 0], kL: [-6, -18], fR: [7, 0], kR: [6, -18], hip: [0, -36], neck: [2, -62], head: [3, -73], eL: [8, -47], hL: [19, -53], eR: [12, -46], hR: [23, -51] },
    amq_reach: { fL: [-8, 0], kL: [-6, -18], fR: [8, 0], kR: [7, -18], hip: [0, -36], neck: [5, -61], head: [7, -72], eL: [9, -47], hL: [18, -52], eR: [17, -55], hR: [30, -64] },
    amq_up: { fL: [-7, 0], kL: [-6, -18], fR: [7, 0], kR: [6, -18], hip: [0, -36], neck: [1, -62], head: [2, -73], eL: [8, -47], hL: [16, -52], eR: [11, -72], hR: [16, -90] },
    amq_hold: { fL: [-7, 0], kL: [-6, -18], fR: [7, 0], kR: [6, -18], hip: [0, -36], neck: [2, -62], head: [3, -73], eL: [9, -49], hL: [20, -55], eR: [14, -50], hR: [26, -58] },
    amq_blast: { fL: [-11, 0], kL: [-8, -17], fR: [10, 0], kR: [9, -18], hip: [0, -35], neck: [5, -61], head: [7, -72], eL: [12, -47], hL: [22, -46], eR: [15, -45], hR: [29, -44] },
    amq_sweep: { fL: [-8, 0], kL: [-6, -18], fR: [8, 0], kR: [7, -18], hip: [0, -36], neck: [4, -61], head: [6, -72], eL: [6, -50], hL: [12, -58], eR: [12, -40], hR: [19, -36] }
  });
  const PO = n => (typeof POSES !== 'undefined' && (POSES[n] || POSES.stand)) || { head: [0, -73], hL: [-11, -35], hR: [11, -35], neck: [0, -62], hip: [0, -36] };
  const pt = (x, y, o, k) => { const p = PO(o.pose || 'stand'), s = o.s || 1, f = o.flip ? -1 : 1; return [x + p[k][0] * s * f, y + p[k][1] * s]; };
  // ===================== personas =====================
  const P = (x, y, o = {}) => W(x, y, Object.assign({ area: 'taller' }, o));
  // careta facial transparente sobre los lentes
  const caretaF = (x, y, o = {}) => { const [X, Y] = pt(x, y, o, 'head'), s = o.s || 1, f = o.flip ? -1 : 1;
    return `<path d="M${f1(X - 9.6 * s)},${f1(Y - 3 * s)} Q${f1(X)},${f1(Y - 15 * s)} ${f1(X + 9.6 * s)},${f1(Y - 3 * s)}" stroke="#263238" stroke-width="${f1(2.4 * s)}" fill="none"/>`
      + `<path d="M${f1(X + 4 * s * f)},${f1(Y - 10 * s)} l${f1(8.6 * s * f)},${f1(3 * s)} l${f1(1.6 * s * f)},${f1(15 * s)} l${f1(-7 * s * f)},${f1(3.4 * s)} z" fill="#B3E5FC" fill-opacity=".55" stroke="#455A64" stroke-width="${f1(.9 * s)}"/>`; };
  // lentes con filtro oscuro (sombra) sobre los lentes de seguridad
  const lentesOsc = (x, y, o = {}) => { const [X, Y] = pt(x, y, o, 'head'), s = o.s || 1, f = o.flip ? -1 : 1;
    return `<rect x="${f1(f > 0 ? X + 1 * s : X - 9.4 * s)}" y="${f1(Y - 2.9 * s)}" width="${f1(8.4 * s)}" height="${f1(5 * s)}" rx="${f1(1.6 * s)}" fill="#1B5E20" stroke="${OL}" stroke-width="${f1(s)}"/>`; };
  // respirador de medio rostro con dos filtros para vapores orgánicos
  const resp = (x, y, o = {}) => { const [X, Y] = pt(x, y, o, 'head'), s = o.s || 1, f = o.flip ? -1 : 1, px = v => f1(X + v * s * f), py = v => f1(Y + v * s);
    return `<path d="M${px(0)},${py(2)} L${px(-9)},${py(-2)} M${px(0)},${py(8)} L${px(-8)},${py(9)}" stroke="#37474F" stroke-width="${f1(1.3 * s)}"/>`
      + `<path d="M${px(1)},${py(0.5)} L${px(8.5)},${py(0)} L${px(12)},${py(4.5)} L${px(10.5)},${py(10)} L${px(4.5)},${py(11.5)} L${px(0)},${py(8)} Z" fill="#78909C" stroke="${OL}" stroke-width="${f1(.9 * s)}"/>`
      + `<circle cx="${px(4)}" cy="${py(9.5)}" r="${f1(3 * s)}" fill="#3E2723" stroke="${OL}" stroke-width="${f1(.7 * s)}"/><circle cx="${px(10)}" cy="${py(8.5)}" r="${f1(3.6 * s)}" fill="#4E342E" stroke="${OL}" stroke-width="${f1(.8 * s)}"/><circle cx="${px(10)}" cy="${py(8.5)}" r="${f1(1.4 * s)}" fill="#8D6E63"/>`; };
  // capucha de granallado con visor y manguera de aire respirable (o.hose = [x, y] destino de la manguera)
  const capucha = (x, y, o = {}) => { const [X, Y] = pt(x, y, o, 'head'), s = o.s || 1, f = o.flip ? -1 : 1, px = v => f1(X + v * s * f), py = v => f1(Y + v * s);
    let g = '';
    if (o.hose) g += `<path d="M${px(-12)},${py(8)} Q${px(-30)},${f1(o.hose[1] + 40)} ${o.hose[0]},${o.hose[1]}" stroke="#212121" stroke-width="${f1(2.8 * s)}" fill="none"/>`;
    g += `<path d="M${px(-13)},${py(10)} Q${px(-16)},${py(-16)} ${px(0)},${py(-15)} Q${px(15)},${py(-15)} ${px(13)},${py(5)} L${px(18)},${py(23)} L${px(-18)},${py(23)} Z" fill="#BCAAA4" stroke="${OL}" stroke-width="${f1(1.1 * s)}"/>`
      + `<path d="M${px(-13)},${py(12)} L${px(13)},${py(12)}" stroke="#8D6E63" stroke-width="${f1(1.2 * s)}"/>`
      + `<path d="M${px(2)},${py(-7)} L${px(12.6)},${py(-6)} L${px(12.4)},${py(4)} L${px(2)},${py(4)} Z" fill="#B3E5FC" stroke="${OL}" stroke-width="${f1(.9 * s)}"/>`;
    return g; };
  // ===================== utilidades de dibujo =====================
  let K = 0; const uid = p => 'amq' + p + (K++);
  const big = (x, y, s, inner) => `<g transform="translate(${x},${y}) scale(${s})">${inner}</g>`;
  const zbg = (c = '#E3E8EC') => `<rect width="320" height="200" fill="${c}"/>`;
  const div = () => `<line x1="160" y1="0" x2="160" y2="200" stroke="#fff" stroke-width="4"/>`;
  const arrow = (x1, y1, x2, y2, c = '#2E7D32', w = 3) => { const a = Math.atan2(y2 - y1, x2 - x1), L = 8 + w; return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2 - L * .6 * Math.cos(a))}" y2="${f1(y2 - L * .6 * Math.sin(a))}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/><path d="M${f1(x2)},${f1(y2)} L${f1(x2 - L * Math.cos(a - .45))},${f1(y2 - L * Math.sin(a - .45))} L${f1(x2 - L * Math.cos(a + .45))},${f1(y2 - L * Math.sin(a + .45))} Z" fill="${c}"/>`; };
  // rótulo con línea guía hacia el punto (tx, ty)
  const lead = (cx, y, t, tx, ty, c = '#1565C0', fs = 10) => { const w = Math.round(t.length * fs * .6 + 16), ex = Math.max(w / 2 + 3, Math.min(317 - w / 2, cx)), lx = tx < ex - w / 2 ? ex - w / 2 : tx > ex + w / 2 ? ex + w / 2 : tx;
    return `<line x1="${f1(lx)}" y1="${y + (fs + 9) / 2}" x2="${tx}" y2="${ty}" stroke="${c}" stroke-width="1.5"/><circle cx="${tx}" cy="${ty}" r="2.6" fill="${c}"/>` + pl(cx, y, t, c, fs); };
  // signo de pregunta (para los dibujos de la prueba)
  const qmark = (x, y, r = 16) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#1565C0" stroke-width="3"/><text x="${x}" y="${f1(y + r * .48)}" font-size="${f1(r * 1.35)}" font-weight="normal" text-anchor="middle" fill="#1565C0" font-family="Arial">?</text>`;
  const cross = (x, y, r = 10) => `<path d="M${x - r},${y - r} L${x + r},${y + r} M${x + r},${y - r} L${x - r},${y + r}" stroke="#D7262B" stroke-width="5" stroke-linecap="round"/>`;
  // lupa: círculo con un acercamiento
  const lupa = (cx, cy, r, inner, c = '#1565C0', bgc = '#EEF2F5') => { const id = uid('lu'); return `<defs><clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs><circle cx="${cx}" cy="${cy}" r="${r}" fill="${bgc}"/><g clip-path="url(#${id})">${inner}</g><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${c}" stroke-width="3.5"/>`; };
  // partículas / virutas que saltan
  const parts = (x, y, n = 6, cls = 'amq_pr', c = '#90A4AE') => [...Array(n)].map((_, i) => `<g class="${cls}" style="animation-delay:-${(i * .16).toFixed(2)}s"><rect x="${x + (i % 3) * 2}" y="${y - (i % 2) * 3}" width="3.2" height="1.7" fill="${i % 2 ? c : '#5C6BC0'}" transform="rotate(${i * 41} ${x} ${y})"/></g>`).join('');
  // viruta rizada y montón de virutas
  const rizo = (x, y, s = 1, c = '#78909C') => `<path d="M${x},${y} c${f1(3 * s)},${f1(-6 * s)} ${f1(9 * s)},${f1(-6 * s)} ${f1(9 * s)},0 c0,${f1(5 * s)} ${f1(-6 * s)},${f1(5 * s)} ${f1(-6 * s)},${f1(1 * s)} c0,${f1(-4 * s)} ${f1(6 * s)},${f1(-5 * s)} ${f1(9 * s)},${f1(-1 * s)}" stroke="${c}" stroke-width="${f1(1.4 * s)}" fill="none"/>`;
  const virutas = (x, y, n = 5, s = 1) => [...Array(n)].map((_, i) => rizo(x + i * 7 * s, y - (i % 2) * 2 * s, s, i % 2 ? '#78909C' : '#5C6BC0')).join('');
  // viruta larga enredada (resorte) entre x1 y x2 a la altura y
  const enredo = (x1, x2, y, amp = 8, c = '#5C6BC0') => { let g = ''; for (let x = x1, i = 0; x < x2; x += 4, i++) g += `<ellipse cx="${x}" cy="${y + (i % 3 - 1) * 2}" rx="3.2" ry="${amp - (i % 2) * 2}" fill="none" stroke="${i % 2 ? c : '#90A4AE'}" stroke-width="1.2"/>`; return g; };
  // giro: elipse punteada que se mueve
  const giro = (cx, cy, rx, ry, c = '#1565C0') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${c}" stroke-width="2.2" stroke-dasharray="6 5" class="amq_ds"/>`;
  // botón de parada de emergencia (hongo rojo sobre caja amarilla)
  const hongo = (x, y, r = 10) => `<rect x="${f1(x - r * .9)}" y="${y}" width="${f1(r * 1.8)}" height="${f1(r * 1.3)}" rx="2" fill="#FFC20E" stroke="${OL}"/><rect x="${f1(x - r * .35)}" y="${f1(y - r * .45)}" width="${f1(r * .7)}" height="${f1(r * .5)}" fill="#455A64"/><ellipse cx="${x}" cy="${f1(y - r * .45)}" rx="${r}" ry="${f1(r * .5)}" fill="#D32F2F" stroke="${OL}"/>`;
  // mano grande para acercamientos: (x, y) = punta de los dedos, ang = dirección en grados (0 = hacia la derecha)
  const mano = (x, y, s = 1, o = {}) => { const c = o.c || '#F2C6A0', m = o.manga || '#22406B', a = o.ang || 0;
    let g = `<rect x="-80" y="-11" width="50" height="22" rx="4" fill="${m}" stroke="${OL}" stroke-width="1.4"/>`;
    if (o.suelta) g += `<path d="M-36,-11 l-8,-14 l14,6 z M-36,11 l-10,12 l14,-4 z" fill="${m}" stroke="${OL}" stroke-width="1"/>`;
    if (o.c && o.c !== '#F2C6A0') g += `<rect x="-40" y="-12" width="12" height="24" rx="3" fill="${c}" stroke="${OL}" stroke-width="1.2"/>`;
    g += `<rect x="-32" y="-10" width="25" height="20" rx="7" fill="${c}" stroke="${OL}" stroke-width="1.4"/>`;
    g += [[-7.5, 10], [-2.6, 12], [2.2, 11], [6.8, 8]].map(([v, l]) => `<rect x="${-12}" y="${f1(v - 2.2)}" width="${l}" height="4.6" rx="2.3" fill="${c}" stroke="${OL}" stroke-width="1.1"/>`).join('');
    g += `<ellipse cx="-17" cy="-11" rx="7" ry="3.4" transform="rotate(-18 -17 -11)" fill="${c}" stroke="${OL}" stroke-width="1.1"/>`;
    return `<g transform="translate(${x},${y}) rotate(${a}) scale(${s})">${g}</g>`; };
  // gancho para virutas (desde la mano hasta la punta)
  const gancho = (x1, y1, x2, y2) => { const a = Math.atan2(y2 - y1, x2 - x1); return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="#455A64" stroke-width="2"/><path d="M${f1(x2)},${f1(y2)} q${f1(4 * Math.cos(a) - 4 * Math.sin(a))},${f1(4 * Math.sin(a) + 4 * Math.cos(a))} ${f1(-2 * Math.cos(a) - 5 * Math.sin(a))},${f1(-2 * Math.sin(a) + 5 * Math.cos(a))}" stroke="#455A64" stroke-width="2" fill="none"/><rect x="${f1(x1 - 3)}" y="${f1(y1 - 3)}" width="6" height="6" rx="2" fill="#D32F2F"/>`; };
  // escobilla de mano: (x, y) = mango en la mano, cerdas hacia (dx, dy)
  const escobilla = (x, y, dx = -14, dy = 6) => `<line x1="${x}" y1="${y}" x2="${x + dx}" y2="${y + dy}" stroke="#8D6E63" stroke-width="2.6" stroke-linecap="round"/><rect x="${x + dx - 6}" y="${y + dy - 1}" width="12" height="4" rx="1.5" fill="#6D4C41"/><path d="M${x + dx - 5},${y + dy + 3} v4 M${x + dx - 2},${y + dy + 3} v4 M${x + dx + 1},${y + dy + 3} v4 M${x + dx + 4},${y + dy + 3} v4" stroke="#FFB300" stroke-width="1.2"/>`;
  // pie de metro vertical sobre una barra (x = línea de medida, y1 arriba, y2 abajo)
  const calibre = (x, y1, y2) => `<rect x="${x - 1.6}" y="${y1 - 8}" width="3.2" height="${y2 - y1 + 18}" fill="#CFD8DC" stroke="${OL}" stroke-width=".8"/><rect x="${x - 10}" y="${y1 - 2}" width="10" height="2.4" fill="#B0BEC5" stroke="${OL}" stroke-width=".6"/><rect x="${x - 10}" y="${y2}" width="10" height="2.4" fill="#B0BEC5" stroke="${OL}" stroke-width=".6"/><rect x="${x - 3}" y="${y2 + 3}" width="6" height="6" fill="#90A4AE" stroke="${OL}" stroke-width=".6"/>`;
  // pistola de aire comprimido (apunta a la derecha; f = -1 apunta a la izquierda) con soplido
  const pAire = (x, y, f = 1, sopla = true) => `<g transform="translate(${x},${y}) scale(${f},1)"><path d="M0,0 l-3,14 h5 l3,-12 z" fill="#1565C0" stroke="${OL}"/><rect x="-5" y="-5" width="16" height="7" rx="2" fill="#1565C0" stroke="${OL}"/><rect x="11" y="-3" width="14" height="3" fill="#90A4AE" stroke="${OL}" stroke-width=".6"/><path d="M-3,14 q-6,8 -14,10" stroke="#212121" stroke-width="2" fill="none"/>`
    + (sopla ? `<g class="amq_ds"><path d="M27,-2 l14,-6 M27,-1 h16 M27,0 l14,6" stroke="#90CAF9" stroke-width="1.6" stroke-dasharray="3 3"/></g>` : '') + '</g>';
  // ondas de ruido
  const ondas = (x, y, n = 3, c = '#E53935', d = 1) => [...Array(n)].map((_, i) => `<path d="M${x + d * (i + 1) * 7},${y - (i + 1) * 7} a${(i + 1) * 9},${(i + 1) * 9} 0 0 ${d > 0 ? 1 : 0} 0,${(i + 1) * 14}" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round" class="amq_bl" style="animation-delay:-${i * .3}s"/>`).join('');
  // calor (ondas que suben)
  const calor = (x, y) => [0, 1, 2].map(i => `<g class="amq_hu" style="animation-delay:-${i * .8}s"><path d="M${x + i * 7},${y} q-3,-5 0,-10 q3,-5 0,-10" stroke="#FF7043" stroke-width="1.8" fill="none"/></g>`).join('');
  // pequeños íconos (48 x 48) reutilizables en dibujos y en la actividad "vestir"
  const IC = {
    guante: c => `<path d="M14,40 v-12 l-5,-8 q-1,-3 2,-4 q2,0 3,2 l3,4 v-14 q0,-3 3,-3 q3,0 3,3 v-2 q0,-3 3,-3 q3,0 3,3 v2 q0,-3 3,-3 q3,0 3,3 v4 q0,-3 3,-3 q3,0 3,3 v16 q0,5 -4,8 v3 z" fill="${c}" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/><path d="M14,36 h20" stroke="${OL}" stroke-width="1.6" opacity=".6"/>`,
    anillo: `<circle cx="24" cy="29" r="11" fill="none" stroke="#FBC02D" stroke-width="5"/><path d="M18,14 l6,-7 l6,7 l-6,6 z" fill="#81D4FA" stroke="${OL}" stroke-width="1.6"/>`,
    reloj: `<rect x="18" y="4" width="12" height="9" rx="2" fill="#5D4037"/><rect x="18" y="35" width="12" height="9" rx="2" fill="#5D4037"/><circle cx="24" cy="24" r="12" fill="#fff" stroke="${OL}" stroke-width="2.4"/><path d="M24,24 v-7 M24,24 l5,3" stroke="${OL}" stroke-width="2" stroke-linecap="round"/>`,
    resp: `<path d="M12,14 q12,-8 24,0 l3,14 q-15,12 -30,0 z" fill="#78909C" stroke="${OL}" stroke-width="2"/><circle cx="11" cy="30" r="7" fill="#4E342E" stroke="${OL}" stroke-width="2"/><circle cx="37" cy="30" r="7" fill="#4E342E" stroke="${OL}" stroke-width="2"/><circle cx="11" cy="30" r="2.6" fill="#8D6E63"/><circle cx="37" cy="30" r="2.6" fill="#8D6E63"/><rect x="21" y="28" width="6" height="6" rx="1.5" fill="#B0BEC5" stroke="${OL}" stroke-width="1.4"/>`,
    lentes: `<rect x="5" y="18" width="16" height="11" rx="4" fill="#B3E5FC" stroke="${OL}" stroke-width="2"/><rect x="27" y="18" width="16" height="11" rx="4" fill="#B3E5FC" stroke="${OL}" stroke-width="2"/><path d="M21,22 h6 M5,21 l-3,-3 M43,21 l3,-3" stroke="${OL}" stroke-width="2"/><path d="M5,16 h38" stroke="${OL}" stroke-width="2.4"/>`,
    buzo: `<path d="M15,6 l-7,6 l-3,16 h6 l2,-9 v25 h9 l2,-14 l2,14 h9 v-25 l2,9 h6 l-3,-16 l-7,-6 l-9,5 z" fill="#ECEFF1" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/><path d="M24,11 v18" stroke="#90A4AE" stroke-width="1.6"/><path d="M13,44 h9 M26,44 h9" stroke="${OL}" stroke-width="2"/>`,
    zapatos: `<path d="M7,22 h16 l4,6 l12,3 q4,1 4,5 v4 h-36 z" fill="#37474F" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/><path d="M30,31 q8,1 9,5 v4 h-9 z" fill="#FBC02D" stroke="${OL}" stroke-width="1.6"/><path d="M7,40 h36" stroke="#111" stroke-width="3"/>`,
    mascarilla: `<path d="M10,18 h28 v12 q-14,9 -28,0 z" fill="#fff" stroke="${OL}" stroke-width="2"/><path d="M12,22 h24 M12,26 h24" stroke="#90A4AE" stroke-width="1.6"/><path d="M10,19 q-7,2 -5,9 q2,3 5,2 M38,19 q7,2 5,9 q-2,3 -5,2" fill="none" stroke="${OL}" stroke-width="1.8"/>`,
    encendedor: `<rect x="15" y="18" width="18" height="26" rx="3" fill="#E53935" stroke="${OL}" stroke-width="2"/><rect x="15" y="12" width="18" height="7" fill="#B0BEC5" stroke="${OL}" stroke-width="1.6"/><path d="M24,12 q-7,-5 0,-10 q7,5 0,10 z" fill="#FF9800" stroke="#E65100" stroke-width="1.2"/>`,
    lana: `<path d="M14,40 v-12 l-5,-8 q-1,-3 2,-4 q2,0 3,2 l3,4 v-14 q0,-3 3,-3 q3,0 3,3 v-2 q0,-3 3,-3 q3,0 3,3 v2 q0,-3 3,-3 q3,0 3,3 v4 q0,-3 3,-3 q3,0 3,3 v16 q0,5 -4,8 v3 z" fill="#C62828" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/><path d="M14,30 h21 M14,34 h21 M14,38 h21" stroke="#FFCDD2" stroke-width="1.6"/>`
  };
  const icono = (k, x, y, w = 30) => { const v = typeof IC[k] === 'function' ? IC[k]('#C8A27A') : IC[k]; return `<g transform="translate(${x},${y}) scale(${f1(w / 48 * 100) / 100})">${v}</g>`; };

  // ======================================================================
  // 1. TORNO PARALELO
  // ======================================================================
  // torno de la biblioteca en x = 30: plato en (70, 97), barra 80-124, carro y buril en (106-112, 99-104), contrapunto 142-166, parada en (54, 73)
  const protPlato = () => `<path d="M57,91 v-5 q14,-13 28,0 v5 z" fill="#FFC20E" fill-opacity=".6" stroke="#F9A825" stroke-width="1.5"/>`;
  const torno = (o = {}) => H.torno(30, 165, { gira: o.gira !== false }) + (o.prot !== false ? protPlato() : '');
  const chipsT = () => parts(108, 97, 6, 'amq_pr') + parts(106, 97, 3, 'amq_pu');
  // plato en acercamiento (vista lateral). (cx, cy) = centro del plato; o.k = 'puesta' | 'vuela' | 'colgada'; o.L = largo de la barra
  const platoZ = (cx, cy, s, o = {}) => { const L = o.L || 90, fin = 16 + L + (o.apoyo ? 90 : 12); let g = '';
    g += `<rect x="-90" y="52" width="${fin + 90}" height="14" fill="#7F8C8D" stroke="${OL}" stroke-width="1.2"/>`;
    g += `<rect x="-84" y="-48" width="58" height="100" rx="3" fill="#4A6274" stroke="${OL}" stroke-width="1.5"/><rect x="-78" y="-40" width="18" height="10" fill="#ECEFF1"/><rect x="-26" y="-16" width="8" height="32" fill="#546E7A" stroke="${OL}"/>`;
    if (o.apoyo) g += `<rect x="${16 + L + 30}" y="-30" width="44" height="82" rx="3" fill="#4A6274" stroke="${OL}" stroke-width="1.5"/><rect x="${16 + L + 10}" y="-8" width="22" height="16" fill="#B0BEC5" stroke="${OL}"/><path d="M${16 + L + 11},-8 L${16 + L - 3},0 L${16 + L + 11},8 z" fill="#ECEFF1" stroke="${OL}"/>`;
    let bar = `<rect x="16" y="-10" width="${L}" height="20" fill="#B0BEC5" stroke="${OL}" stroke-width="1.2"/><rect x="16" y="-10" width="${L}" height="5" fill="#CFD8DC"/>`;
    if (o.chip) bar += enredo(30, 16 + L * .7, 0, 15);
    g += o.wob ? `<g class="amq_wb">${bar}</g>` : bar;
    g += `<rect x="-18" y="-36" width="30" height="72" rx="6" fill="#90A4AE" stroke="${OL}" stroke-width="1.5"/>` + [-24, -8, 8, 24].map(v => `<line x1="-16" y1="${v}" x2="10" y2="${v}" stroke="#78909C" stroke-width="1.2"/>`).join('');
    g += `<rect x="-6" y="-38" width="8" height="4" fill="#263238"/><rect x="12" y="-28" width="12" height="18" fill="#78909C" stroke="${OL}"/><rect x="12" y="10" width="12" height="18" fill="#78909C" stroke="${OL}"/>`;
    if (o.gira) g += giro(-3, 0, 20, 42) ;
    const llave = `<rect x="-5" y="-72" width="6" height="36" fill="#546E7A" stroke="${OL}"/><rect x="-24" y="-80" width="44" height="9" rx="4" fill="#263238"/>`;
    if (o.k === 'puesta') g += llave;
    if (o.k === 'vuela') g += `<g class="amq_ky">${llave}</g><path d="M14,-58 l14,-10 M20,-48 l16,-6" stroke="#D7262B" stroke-width="2" stroke-linecap="round" class="amq_bl"/>`;
    if (o.k === 'colgada') g += `<path d="M-55,-44 v6 q0,4 -4,4" stroke="#263238" stroke-width="2.4" fill="none"/><rect x="-80" y="-36" width="44" height="9" rx="4" fill="#263238"/><rect x="-61" y="-28" width="6" height="34" fill="#546E7A" stroke="${OL}"/>`;
    return big(cx, cy, s, g); };
  // pistola de aire soplando el plato del torno (tarjeta de la actividad)
  S.al_mq_torno_intro = () => V(H.fondo.taller() + torno() + chipsT() + P(128, 165, { pose: 'amq_op', flip: true })
    + pl(250, 36, 'Atrapamiento', '#D7262B') + pl(250, 60, 'Virutas que saltan', '#E65100') + pl(250, 84, 'Solo personal autorizado', '#1565C0', 10));
  S.al_mq_torno_revisa = () => V(H.fondo.taller() + torno({ gira: false }) + P(292, 165, { pose: 'point', flip: true })
    + lead(62, 6, 'Parada de emergencia', 54, 72, '#D7262B') + lead(218, 6, 'Protección del plato', 72, 80) + lead(205, 36, 'Pieza bien apretada', 100, 97)
    + lead(215, 66, 'Bancada despejada', 150, 118) + lead(215, 176, 'Piso limpio y seco', 100, 180, '#2E7D32'));
  const llaveSc = q => zbg() + (q ? platoZ(130, 112, 1, { k: 'puesta', L: 120 }) + qmark(278, 44)
    : div() + platoZ(74, 112, .85, { k: 'vuela', gira: true, L: 80 }) + platoZ(234, 112, .85, { k: 'colgada', L: 80 })
      + pl(80, 6, 'Llave puesta', '#D7262B') + H.no(146, 22, 13) + pl(238, 6, 'Llave en su lugar', '#2E7D32') + H.si(306, 22, 13));
  S.al_mq_torno_llave = () => V(llaveSc(false));
  S.al_mq_torno_q_llave = () => V(llaveSc(true));
  S.al_mq_torno_pieza = () => V(zbg() + div() + platoZ(60, 104, .62, { L: 140, wob: true, gira: true }) + platoZ(212, 104, .62, { L: 80, apoyo: true, gira: true })
    + pl(80, 6, 'Barra larga sin apoyo', '#D7262B', 10) + pl(240, 6, 'Con contrapunto', '#2E7D32', 10) + H.no(80, 174, 13) + H.si(240, 174, 13));
  S.al_mq_torno_q_larga = () => V(zbg() + platoZ(80, 108, .8, { L: 200, wob: true, gira: true }) + qmark(285, 40));
  const tallerPiso = x => `<rect x="${x}" y="165" width="160" height="35" fill="#9EA7AD"/><rect x="${x}" y="165" width="160" height="3" fill="#000" opacity=".1"/>`;
  S.al_mq_torno_ropa = () => V(zbg() + tallerPiso(160) + platoZ(52, 92, .7, { gira: true, L: 110 }) + mano(80, 116, 1, { ang: 220, c: '#C8A27A', suelta: true })
    + div() + P(262, 165) + icono('guante', 172, 34, 30) + cross(187, 49, 13) + icono('anillo', 206, 34, 30) + cross(221, 49, 13) + icono('reloj', 172, 74, 30) + cross(187, 89, 13)
    + pl(80, 6, 'Guante cerca del plato', '#D7262B', 10) + pl(240, 6, 'Nada que se enrolle', '#2E7D32', 10) + H.no(22, 176, 13) + H.si(182, 176, 13));
  S.al_mq_torno_q_ropa = () => V(H.fondo.taller() + torno() + P(112, 165, { pose: 'amq_reach', flip: true, gloves: '#C8A27A', loose: true }) + qmark(262, 50));
  S.al_mq_torno_viruta = () => V(H.fondo.taller() + torno({ gira: false }) + enredo(84, 122, 97, 9) + virutas(86, 113, 5, .9)
    + P(146, 165, { pose: 'amq_reach', flip: true, gloves: '#C8A27A' }) + gancho(116, 101, 96, 92)
    + pl(232, 8, 'Máquina detenida', '#2E7D32') + pl(232, 32, 'Gancho o escobilla', '#1565C0', 10)
    + lupa(268, 106, 40, `<rect x="228" y="66" width="80" height="80" fill="#DCE3E8"/>` + platoZ(240, 106, .45, { L: 60 }) + parts(250, 100, 6, 'amq_pr') + pAire(290, 104, -1) + cross(268, 106, 22), '#D7262B')
    + pl(268, 152, 'Nunca con aire', '#D7262B', 10));
  S.al_mq_torno_q_viruta = () => V(H.fondo.taller() + torno() + enredo(84, 122, 97, 9) + P(215, 165, { pose: 'stand', flip: true }) + qmark(265, 45));
  const ojosSc = q => H.fondo.taller() + torno() + parts(110, 97, 7, 'amq_pr') + P(142, 165, { pose: 'amq_op', flip: true }) + (q ? qmark(262, 48)
    : caretaF(142, 165, { pose: 'amq_op', flip: true }) + pl(245, 20, 'Lentes siempre', '#2E7D32') + pl(245, 44, 'Careta si saltan partículas', '#1565C0', 10) + pl(160, 176, 'Protector auditivo si hay ruido', '#1565C0', 10));
  S.al_mq_torno_ojos = () => V(ojosSc(false));
  S.al_mq_torno_q_ojos = () => V(ojosSc(true));
  S.al_mq_torno_medir = () => V(H.fondo.taller() + torno({ gira: false }) + P(128, 165, { pose: 'amq_reach', flip: true }) + calibre(99, 94, 100)
    + pl(240, 30, 'Plato detenido', '#2E7D32') + pl(240, 54, 'Nunca lo frenes con la mano', '#D7262B', 10));
  S.al_mq_torno_q_medir = () => V(H.fondo.taller() + torno() + P(222, 165, { pose: 'amq_hold', flip: true }) + calibre(195, 100, 108) + qmark(282, 40));
  S.al_mq_torno_emerg = () => V(H.fondo.taller() + torno() + P(70, 165, { pose: 'amq_up', flip: true })
    + lupa(250, 76, 44, `<rect x="206" y="32" width="88" height="88" fill="#4A6274"/>` + hongo(250, 92, 26) + mano(250, 66, 1.1, { ang: 90 }), '#D7262B')
    + pl(250, 128, 'Parada de emergencia', '#D7262B', 10) + pl(250, 152, 'Ubícala antes de partir', '#1565C0', 10));
  S.al_mq_torno_q_emerg = () => V(H.fondo.taller() + torno() + P(108, 165, { pose: 'amq_reach', flip: true, loose: true, face: 'pain' }) + P(232, 165, { pose: 'walk', flip: true }) + qmark(285, 40));
  S.al_mq_torno_c_aire = () => V(H.fondo.taller() + torno({ gira: false }) + virutas(86, 113, 5, .9) + P(152, 165, { pose: 'amq_hold', flip: true }) + pAire(126, 107, -1) + parts(92, 100, 7, 'amq_pr'));

  SI_CONT.temas.push({
    id: 'mq_torno', sec: 'maquinas', emp: ['ali'], title: 'Torno paralelo', thumb: 'al_mq_torno_intro', mins: 15,
    learn: [
      { s: 'al_mq_torno_intro', t: 'El torno paralelo', x: 'El torno hace <b>girar la pieza</b> con fuerza mientras el buril le saca material. Sus riesgos principales son:<ul><li><b>Atrapamiento</b>: el plato y la pieza en giro enganchan un guante, una manga o el pelo y arrastran la mano, el brazo o a la persona entera.</li><li><b>Virutas</b> que saltan a los ojos y cortan como cuchillo.</li><li>Golpes con la <b>llave del plato</b> o con una pieza que se suelta.</li></ul>Solo lo opera quien está <b>capacitado y autorizado</b> por su jefatura.' },
      { s: 'al_mq_torno_revisa', t: 'Antes de partir, revisa', x: 'Antes de encender el torno, revisa:<ul><li>La <b>protección del plato</b> y la pantalla del carro en su lugar.</li><li>La <b>parada de emergencia</b> funciona y sabes dónde está.</li><li>Pieza y buril <b>bien apretados</b>.</li><li>Nada sobre la bancada: llaves, herramientas ni paños.</li><li>Piso limpio, sin aceite ni virutas.</li></ul>Si algo falla o falta, <b>no lo uses</b> y avisa a tu jefatura.' },
      { s: 'al_mq_torno_llave', t: 'La llave del plato nunca queda puesta', x: 'Apenas aprietas la pieza, <b>sacas la llave del plato</b> y la dejas en su lugar. Si el torno parte con la llave puesta, la llave sale disparada como un proyectil y puede golpear tu cara o a un compañero. Hazlo un hábito: <b>la llave nunca se suelta mientras está en el plato</b>. Antes de encender, mira el plato: sin llave.', k: 'Nunca enciendas el torno con la llave puesta en el plato.' },
      { s: 'al_mq_torno_pieza', t: 'La pieza, bien sujeta', x: '<ul><li>Aprieta la pieza con todas las mordazas y gira el plato con la mano, <b>con la máquina detenida</b>, para ver que no tope.</li><li>Una barra larga que sobresale mucho <b>vibra y se suelta</b>: apóyala con el <b>contrapunto</b> o con una luneta.</li><li>Usa la velocidad correcta: <b>a mayor diámetro, menor velocidad</b>.</li></ul>Una pieza mal sujeta sale volando contra el operador.' },
      { s: 'al_mq_torno_ropa', t: 'Sin guantes, sin joyas, sin ropa suelta', x: 'Lo que gira <b>enrolla todo lo que toca</b>. Un guante se engancha y arrastra la mano en una fracción de segundo.<ul><li>Con el plato girando, <b>trabaja sin guantes</b> cerca de la pieza.</li><li>Sin anillos, reloj, pulseras ni cadenas (está prohibido en ALI).</li><li>Ropa ajustada, abotonada y con los puños cerrados.</li><li>El pelo largo, tomado y dentro de un gorro.</li></ul>Los guantes se usan solo con la máquina detenida, para tomar piezas o virutas.', k: 'Con el torno girando: sin guantes, sin joyas y sin ropa suelta.' },
      { s: 'al_mq_torno_viruta', t: 'Virutas: con gancho y la máquina detenida', x: 'La viruta larga corta como un cuchillo y sale caliente. <b>Nunca la saques con la mano</b>.<ul><li>Detén el torno y espera que el plato pare.</li><li>Retírala con el <b>gancho para viruta</b> o con una <b>escobilla</b>, y con guantes.</li><li><b>Nunca con aire comprimido</b>: lanza partículas a tus ojos y a los de otros, y puede meter suciedad bajo la piel.</li></ul>' },
      { s: 'al_mq_torno_ojos', t: 'Protege tus ojos y tus oídos', x: '<ul><li><b>Lentes de seguridad en todo momento</b>: en ALI se usan siempre dentro del taller, no solo en la máquina.</li><li>Agrega <b>careta facial</b> sobre los lentes cuando saltan muchas partículas, por ejemplo al desbastar fundición.</li><li>Baja la pantalla del carro.</li><li>Si hay ruido, <b>protector auditivo</b> todo el tiempo (programa PREXOR).</li></ul>No dejes compañeros en la línea donde saltan las virutas.' },
      { s: 'al_mq_torno_medir', t: 'Mide y ajusta con el torno detenido', x: 'Para <b>medir</b> con el pie de metro, cambiar el buril, ajustar o limpiar, <b>detén el torno</b> y espera que el plato pare por completo.<ul><li><b>Nunca frenes el plato con la mano</b>, ni con un trapo.</li><li>No te apoyes en la bancada ni en el plato.</li><li>No dejes el torno girando solo.</li></ul>' },
      { s: 'al_mq_torno_emerg', t: 'Parada de emergencia y al terminar', x: 'Ubica la <b>parada de emergencia</b> antes de partir. Si alguien queda enganchado, <b>apriétala de inmediato</b>: no tires a la persona. Pide ayuda y avisa a tu jefatura; si es grave, llama a la ACHS al <b>1404</b>.<br>Al terminar: apaga, limpia las virutas con escobilla y deja la llave y las herramientas en su lugar. La mantención se hace con el equipo <b>bloqueado con candado y tarjeta</b>.' }
    ],
    quiz: [
      { s: 'al_mq_torno_q_llave', v: [
        { q: 'Terminaste de apretar la pieza en el plato. ¿Qué haces con la llave antes de encender?', o: ['La saco y la dejo en su lugar', 'La dejo puesta para el siguiente ajuste', 'La dejo sobre la bancada, junto al plato', 'La dejo puesta, pero sin apretar'], w: 'La llave se saca de inmediato y se deja en su lugar. Si el torno parte con la llave puesta, sale disparada.' },
        { q: '¿Qué pasa si el torno parte con la llave puesta en el plato?', o: ['Sale disparada y puede golpear a alguien', 'El plato gira más lento y parejo', 'La pieza queda más firme en el plato', 'Nada, porque la llave cae sola al piso de inmediato'], w: 'La llave sale disparada como un proyectil contra la cara del operador o de un compañero.' },
        { q: 'Si vas a encender el torno solo un segundo para probar, puedes dejar la llave puesta en el plato.', vf: false, w: 'Falso. Nunca se enciende el torno con la llave puesta, ni siquiera un segundo.' }] },
      { s: 'al_mq_torno_q_ropa', v: [
        { q: 'Estás torneando y hace frío. ¿Puedes usar guantes cerca del plato que gira?', o: ['No: el guante se engancha y arrastra la mano', 'Sí, si son guantes de cuero gruesos', 'Sí, si el torno va a baja velocidad', 'Sí, si los guantes quedan bien ajustados a la mano'], w: 'Con el plato girando no se usan guantes cerca de la pieza: se enganchan y arrastran la mano.' },
        { q: '¿Qué está prohibido usar cerca de un torno que gira?', o: ['Guantes, anillos, reloj y ropa suelta', 'Lentes de seguridad y careta facial', 'Zapatos de seguridad con puntera', 'Ropa de trabajo ajustada, abotonada y limpia'], w: 'Todo lo que cuelga o se puede enganchar: guantes, joyas, reloj, ropa suelta y pelo largo suelto.' },
        { q: 'Un compañero con el pelo largo suelto va a usar el torno. ¿Qué le dices?', o: ['Que se lo tome y lo guarde en un gorro', 'Que se lo eche detrás de las orejas', 'Que se aleje un poco más del plato al trabajar', 'Que trabaje rápido para no demorar'], w: 'El pelo largo se toma y se guarda dentro de un gorro: el plato lo enrolla en un segundo.' }] },
      { s: 'al_mq_torno_q_viruta', v: [
        { q: 'Una viruta larga se enredó en la pieza. ¿Qué haces?', o: ['Detengo el torno y la saco con el gancho', 'La saco con la mano mientras el plato gira lento', 'La soplo con la pistola de aire', 'La corto con un alicate mientras gira'], w: 'Se detiene el torno, se espera que pare y la viruta se saca con gancho o escobilla, con guantes.' },
        { q: '¿Por qué no se limpian las virutas con aire comprimido?', o: ['Porque lanza partículas a los ojos y la piel', 'Porque gasta mucho aire del compresor', 'Porque enfría demasiado la pieza', 'Porque deja la máquina con más polvo y suciedad'], w: 'El aire comprimido lanza virutas y partículas a tus ojos, a los de tus compañeros y puede meterlas bajo la piel.' },
        { q: 'Las virutas se retiran con gancho o escobilla y con el torno detenido.', vf: true, w: 'Verdadero. Nunca con la mano ni con aire comprimido.' }] },
      { s: 'al_mq_torno_q_medir', v: [
        { q: 'Necesitas medir el diámetro con el pie de metro. ¿Cuándo lo haces?', o: ['Con el plato totalmente detenido', 'Mientras gira, a baja velocidad', 'Cuando el plato va frenando', 'Mientras gira, con mucho cuidado'], w: 'Se mide con el torno detenido y el plato quieto: si no, el pie de metro y la mano se enganchan.' },
        { q: 'Apagaste el torno y el plato todavía gira. ¿Lo puedes frenar con la mano?', o: ['No: espero que pare solo', 'Sí, con un guante grueso', 'Sí, con un trapo en la mano', 'Sí, si ya va muy lento'], w: 'Nunca se frena el plato con la mano ni con un trapo: se espera que pare solo.' },
        { q: '¿Qué tareas se hacen solo con el torno detenido?', o: ['Medir, ajustar, limpiar y cambiar el buril', 'Mirar el corte a través de la pantalla', 'Mover el carro con el volante', 'Revisar que la pantalla del carro esté abajo'], w: 'Medir, ajustar, limpiar y cambiar herramientas se hace siempre con el torno detenido.' }] },
      { s: 'al_mq_torno_q_larga', v: [
        { q: 'Tienes que tornear una barra larga que sobresale mucho del plato. ¿Qué haces?', o: ['La apoyo con el contrapunto o una luneta', 'La torneo a la máxima velocidad', 'La afirmo con la mano libre mientras gira', 'La dejo suelta en el otro extremo'], w: 'Una barra larga sin apoyo vibra y se puede soltar: se apoya con contrapunto o luneta.' },
        { q: '¿Qué puede pasar con una pieza mal apretada en el plato?', o: ['Sale disparada contra el operador', 'Queda mejor centrada al girar', 'Se termina en menos tiempo', 'Gira más lento y queda mucho más segura'], w: 'Una pieza mal sujeta se suelta y sale volando. Se aprieta bien y se revisa antes de partir.' },
        { q: 'Mientras más grande es el diámetro de la pieza, más alta debe ser la velocidad del torno.', vf: false, w: 'Falso. A mayor diámetro, menor velocidad: una pieza grande girando rápido es mucho más peligrosa.' }] },
      { s: 'al_mq_torno_q_ojos', v: [
        { q: '¿Qué protección de ojos usas al tornear?', o: ['Lentes de seguridad y careta si saltan partículas', 'Lentes ópticos comunes, si con ellos veo bien', 'Solo la pantalla del carro del torno, bien abajo', 'Ninguna, si estoy lejos del plato'], w: 'Lentes de seguridad siempre, y careta facial encima cuando saltan muchas partículas.' },
        { q: 'Vas a desbastar una pieza de fundición que suelta muchas partículas. ¿Qué agregas a tus lentes?', o: ['Una careta facial', 'Unos lentes de sol', 'Guantes de cuero', 'Un pañuelo al cuello'], w: 'Sobre los lentes de seguridad se usa careta facial. El pañuelo al cuello está prohibido: se enrolla.' },
        { q: 'En el taller de ALI los lentes de seguridad se usan en todo momento, no solo al operar una máquina.', vf: true, w: 'Verdadero. La regla de ALI es usar lentes de seguridad en todo momento dentro del lugar de trabajo.' }] },
      { s: 'al_mq_torno_q_emerg', v: [
        { q: 'A un compañero se le enganchó la ropa en el torno. ¿Qué haces primero?', o: ['Aprieto la parada de emergencia', 'Lo tiro del brazo con fuerza', 'Corro a buscar a la jefatura', 'Le grito que se suelte solo, sin ayuda'], w: 'Primero se detiene la máquina con la parada de emergencia. Después se pide ayuda y se avisa; si es grave, ACHS 1404.' },
        { q: '¿Para qué debes saber dónde está la parada de emergencia del torno?', o: ['Para detenerlo de inmediato si alguien se engancha', 'Para encenderlo más rápido en la mañana al llegar', 'Para cambiar la velocidad del plato sin detenerlo', 'Para medir la pieza sin detenerlo'], w: 'La parada de emergencia detiene el torno de inmediato ante un atrapamiento o una falla.' },
        { q: '¿Quién puede operar el torno?', o: ['Quien está capacitado y autorizado', 'Cualquiera que haya visto cómo se usa', 'El primero que llega al taller', 'Quien tenga más años en la empresa'], w: 'Solo opera el torno quien está capacitado y autorizado por su jefatura.' }] }
    ]
  });

  // ======================================================================
  // 2. FRESADORA
  // ======================================================================
  // fresadora de la biblioteca en x = 120: cabezal 90-160, fresa en (147, 105-113), mesa 114-184 a y 117, prensa y pieza 134-156, parada en (90, 73)
  const fresa = (o = {}) => H.fresa(120, 165) + (o.guard ? `<rect x="134" y="96" width="26" height="22" rx="3" fill="#B3E5FC" fill-opacity=".45" stroke="#4FC3F7" stroke-width="1.5"/>` : '') + (o.gira ? giro(147, 110, 7, 2.4) : '');
  // fresa en acercamiento: (cx, cy) = punta de la fresa
  const fresaZ = (cx, cy, s, o = {}) => { let g = '';
    g += `<rect x="-120" y="40" width="240" height="16" fill="#90A4AE" stroke="${OL}" stroke-width="1.4"/>` + [-80, -40, 0, 40, 80].map(v => `<rect x="${v - 4}" y="40" width="8" height="5" fill="#607D8B"/>`).join('');
    g += `<rect x="64" y="-150" width="46" height="190" fill="#4A6274" stroke="${OL}" stroke-width="1.5"/><rect x="-60" y="-130" width="120" height="70" rx="4" fill="#5D7486" stroke="${OL}" stroke-width="1.5"/><rect x="-16" y="-60" width="32" height="18" fill="#90A4AE" stroke="${OL}" stroke-width="1.3"/><path d="M-11,-42 h22 l-4,10 h-14 z" fill="#B0BEC5" stroke="${OL}"/>`;
    g += `<rect x="-6" y="-32" width="12" height="32" rx="1.5" fill="#CFD8DC" stroke="${OL}" stroke-width="1.2"/>` + [-24, -16, -8].map(v => `<path d="M-6,${v} l12,-6" stroke="#78909C" stroke-width="1.4"/>`).join('');
    if (o.prensa) g += `<rect x="-56" y="28" width="112" height="12" fill="#455A64" stroke="${OL}"/><rect x="26" y="2" width="16" height="26" fill="#546E7A" stroke="${OL}"/><rect x="-42" y="2" width="16" height="26" fill="#546E7A" stroke="${OL}"/><rect x="-88" y="13" width="46" height="4" fill="#90A4AE" stroke="${OL}" stroke-width=".8"/><rect x="-94" y="-4" width="6" height="38" rx="2" fill="#263238"/><rect x="-26" y="3" width="52" height="18" fill="#B0BEC5" stroke="${OL}" stroke-width="1.2"/>`;
    if (o.mano) g += `<rect x="-28" y="3" width="56" height="37" fill="#B0BEC5" stroke="${OL}" stroke-width="1.2"/>` + mano(-27, 20, 1, { c: o.guante || '#F2C6A0' });
    if (o.manoCerca) g += mano(14, -8, 1, { ang: 200, c: '#C8A27A', suelta: true });
    if (o.gira) g += giro(0, -14, 13, 4.5) + parts(8, 0, 5, 'amq_pr');
    if (o.guard) g += `<rect x="-30" y="-52" width="60" height="52" rx="5" fill="#B3E5FC" fill-opacity=".45" stroke="#4FC3F7" stroke-width="2"/>`;
    if (o.llave) g += `<path d="M88,-46 v8" stroke="#263238" stroke-width="2.5"/><rect x="86" y="-38" width="5" height="30" fill="#B0BEC5" stroke="${OL}"/><path d="M88,-8 a9,9 0 1 1 -1,0" stroke="#B0BEC5" stroke-width="5" fill="none"/>`;
    return big(cx, cy, s, g); };
  // lavado de manos (para la lupa)
  const lavado = (cx, cy) => `<rect x="${cx - 40}" y="${cy + 20}" width="80" height="12" rx="4" fill="#ECEFF1" stroke="#90A4AE" stroke-width="2"/><path d="M${cx - 22},${cy - 34} h18 v10" stroke="#90A4AE" stroke-width="6" fill="none"/>`
    + [0, 1, 2].map(i => `<g class="amq_hd" style="animation-delay:-${i * .45}s"><circle cx="${cx - 4 + i * 3}" cy="${cy - 18}" r="2" fill="#4FC3F7"/></g>`).join('')
    + mano(cx - 10, cy - 4, .55, { ang: -70, manga: '#22406B' }) + mano(cx + 10, cy - 2, .55, { ang: -110, manga: '#22406B' })
    + [[-14, -10], [12, -12], [2, -16], [-4, 4]].map(([a, b]) => `<circle cx="${cx + a}" cy="${cy + b}" r="3" fill="#fff" stroke="#B3E5FC"/>`).join('');
  S.al_mq_fresa_intro = () => V(H.fondo.taller() + fresa({ gira: true, guard: true }) + parts(150, 110, 5, 'amq_pr') + P(205, 165, { pose: 'amq_op', flip: true })
    + pl(245, 20, 'Atrapamiento y cortes', '#D7262B', 10) + pl(245, 44, 'Virutas y refrigerante', '#E65100', 10) + pl(160, 176, 'Solo personal autorizado', '#1565C0', 10));
  S.al_mq_fresa_prensa = () => V(zbg() + div() + fresaZ(80, 112, .62, { gira: true, mano: true }) + fresaZ(240, 112, .62, { gira: true, prensa: true })
    + pl(80, 6, 'Sujeta con la mano', '#D7262B', 10) + pl(240, 6, 'Firme en la prensa', '#2E7D32', 10) + H.no(80, 176, 13) + H.si(240, 176, 13));
  S.al_mq_fresa_q_prensa = () => V(zbg() + fresaZ(150, 112, .8, { gira: true, mano: true }) + qmark(285, 40));
  const herrSc = q => zbg() + fresaZ(100, 112, .8, { prensa: true, llave: true }) + (q ? qmark(280, 140)
    : lead(250, 174, 'Llave fuera antes de partir', 170, 102) + lead(250, 58, 'Bien apretada en la pinza', 108, 82) + lead(250, 96, 'Afilada y sin dientes rotos', 104, 100, '#2E7D32'));
  S.al_mq_fresa_herr = () => V(herrSc(false));
  S.al_mq_fresa_herr_q = () => V(herrSc(true));
  const protSc = q => H.fondo.taller() + fresa({ guard: !q, gira: q }) + P(205, 165, { pose: q ? 'amq_op' : 'point', flip: true })
    + (q ? qmark(50, 40) : lead(60, 8, 'Protección puesta', 147, 100, '#2E7D32') + lead(60, 34, 'Parada de emergencia', 90, 72, '#D7262B'));
  S.al_mq_fresa_prot = () => V(protSc(false));
  S.al_mq_fresa_q_prot = () => V(protSc(true));
  S.al_mq_fresa_guantes = () => V(zbg() + div() + fresaZ(80, 112, .62, { gira: true, prensa: true, manoCerca: true }) + fresaZ(240, 112, .62, { gira: true, prensa: true, guard: true })
    + pl(80, 6, 'Guante en la fresa', '#D7262B', 10) + pl(240, 6, 'Manos fuera', '#2E7D32', 10) + H.no(80, 176, 13) + H.si(240, 176, 13));
  S.al_mq_fresa_q_guantes = () => V(H.fondo.taller() + fresa({ gira: true }) + P(180, 165, { pose: 'amq_reach', flip: true, gloves: '#C8A27A' }) + qmark(270, 45));
  S.al_mq_fresa_detener = () => V(H.fondo.taller() + fresa({ guard: true }) + virutas(150, 116, 4, .8) + P(196, 165, { pose: 'amq_op', flip: true, gloves: '#C8A27A' }) + escobilla(173, 114, -14, 0)
    + pl(250, 20, 'Máquina detenida', '#2E7D32') + pl(250, 44, 'Escobilla, nunca la mano', '#1565C0', 10));
  S.al_mq_fresa_q_detener = () => V(H.fondo.taller() + fresa({ gira: true, guard: true }) + P(205, 165, { pose: 'amq_hold', flip: true }) + calibre(178, 101, 107) + qmark(50, 45));
  const refriSc = q => H.fondo.taller() + fresa({}) + `<path d="M158,84 q8,10 -5,20" stroke="#43A047" stroke-width="2.6" fill="none"/>` + `<ellipse cx="160" cy="118" rx="16" ry="2" fill="#80DEEA" opacity=".8"/>`
    + [0, 1].map(i => `<g class="amq_hd" style="animation-delay:-${i * .6}s"><circle cx="${152 + i * 2}" cy="106" r="1.6" fill="#26C6DA"/></g>`).join('')
    + P(196, 165, { pose: 'amq_op', flip: true, gloves: '#1E88E5' }) + `<path d="M168,110 q4,-4 8,0 q2,6 -4,7 q-6,-1 -4,-7z" fill="#ECEFF1" stroke="#90A4AE"/>`
    + (q ? qmark(270, 45) : lupa(268, 48, 40, lavado(268, 50), '#2E7D32') + pl(60, 10, 'Nitrilo al limpiar', '#1565C0', 10) + pl(275, 96, 'Lávate las manos', '#2E7D32', 9));
  S.al_mq_fresa_refri = () => V(refriSc(false));
  S.al_mq_fresa_refri_q = () => V(refriSc(true));
  S.al_mq_fresa_orden = () => V(H.fondo.taller() + fresa({ guard: true }) + H.tablero(28, 62, true) + P(205, 165, { pose: 'point', flip: true })
    + pl(72, 8, 'Mantención con candado', '#D7262B', 9) + pl(252, 8, 'Mesa despejada', '#2E7D32', 10) + pl(252, 32, 'Piso sin aceite ni virutas', '#2E7D32', 10));

  SI_CONT.temas.push({
    id: 'mq_fresa', sec: 'maquinas', emp: ['ali'], title: 'Fresadora', thumb: 'al_mq_fresa_intro', mins: 15,
    learn: [
      { s: 'al_mq_fresa_intro', t: 'La fresadora', x: 'En la fresadora gira la <b>fresa</b>, una herramienta con varios filos, y la mesa mueve la pieza contra ella. Sus riesgos:<ul><li><b>Cortes y atrapamiento</b> con la fresa en giro.</li><li><b>Virutas calientes</b> que saltan a los ojos.</li><li>Una pieza o una fresa que se suelta y sale proyectada.</li><li><b>Refrigerante y aceite de corte</b> que irritan la piel y los ojos.</li><li>Ruido.</li></ul>Solo la opera quien está <b>capacitado y autorizado</b>.' },
      { s: 'al_mq_fresa_prensa', t: 'La pieza, firme en la prensa', x: 'La pieza va <b>apretada en la prensa</b> o con bridas a la mesa. <b>Nunca la sujetes con la mano</b>: la fresa la arrastra y tu mano va detrás.<ul><li>La prensa, bien fijada a la mesa.</li><li>La pieza, apoyada sobre paralelas y bien apretada.</li><li>Revisa que la fresa no vaya a tocar la prensa.</li><li>Saca las llaves de apriete de la mesa antes de partir.</li></ul>' },
      { s: 'al_mq_fresa_herr', t: 'La fresa, correcta y bien apretada', x: '<ul><li>Usa la fresa indicada para el material y el trabajo, <b>afilada y sin dientes rotos</b>.</li><li><b>Bien apretada</b> en la pinza o el portaherramientas.</li><li><b>Saca la llave</b> de apriete antes de encender, igual que en el torno.</li><li>Revisa el sentido de giro y la velocidad.</li></ul>Una fresa suelta o quebrada sale disparada en trozos.' },
      { s: 'al_mq_fresa_prot', t: 'Protecciones en su lugar', x: 'La <b>pantalla o protección de la fresa</b> va siempre puesta y bien ubicada. No la saques para ver mejor.<ul><li>Si la protección falta o está dañada, <b>no partas</b> y avisa a tu jefatura.</li><li>Ubica la <b>parada de emergencia</b> antes de empezar.</li><li>Los topes y finales de carrera de la mesa deben funcionar.</li></ul>' },
      { s: 'al_mq_fresa_guantes', t: 'Sin guantes cerca de la fresa en giro', x: 'Igual que en el torno: <b>guantes, mangas sueltas, joyas y pelo largo</b> se enrollan en la fresa y en el husillo.<ul><li>Con la fresa girando, <b>manos fuera</b> de su recorrido y de la mesa en movimiento.</li><li>Sin guantes cerca de lo que gira.</li><li>Ropa ajustada y puños cerrados.</li></ul>', k: 'Con la fresa girando: manos fuera y sin guantes cerca.' },
      { s: 'al_mq_fresa_detener', t: 'Detén la máquina para medir y limpiar', x: 'Para <b>medir, girar la pieza, ajustar o sacar virutas</b>: detén la fresadora y espera que la fresa pare por completo.<ul><li>Las virutas se sacan con <b>escobilla o gancho</b>, nunca con la mano ni con aire comprimido.</li><li>No te apoyes en la mesa mientras se mueve.</li></ul>' },
      { s: 'al_mq_fresa_refri', t: 'Refrigerante y aceite de corte', x: 'El refrigerante y el aceite de corte <b>irritan la piel</b> (dermatitis) y los ojos, y su neblina se respira.<ul><li>Usa <b>guantes de nitrilo</b> para limpiar la máquina o tomar piezas mojadas, siempre con la máquina detenida.</li><li><b>Lávate las manos</b> con agua y jabón antes de comer, fumar o ir al baño.</li><li>No te limpies la piel con solvente ni con el refrigerante.</li><li>Si tu ropa se empapa, cámbiala.</li><li>Revisa la HDS del producto.</li></ul>Un derrame en el piso se limpia de inmediato.' },
      { s: 'al_mq_fresa_orden', t: 'Orden, ruido y mantención', x: '<ul><li>Mesa despejada: sin llaves, herramientas ni piezas sueltas.</li><li>Piso sin aceite ni virutas.</li><li>Si hay ruido, <b>protector auditivo</b> todo el tiempo.</li><li>Al terminar, apaga y limpia con escobilla.</li><li>Si notas una falla, no la uses y avisa.</li></ul>La mantención o el cambio de piezas de la máquina se hace con el equipo <b>bloqueado con candado y tarjeta</b>.' }
    ],
    quiz: [
      { s: 'al_mq_fresa_q_prensa', v: [
        { q: '¿Cómo se sujeta una pieza para fresarla?', o: ['Con bridas o en la prensa', 'Con la mano, si la pieza es pequeña', 'Apoyada sobre la mesa, sin apretar', 'Con un trapo para que no resbale'], w: 'La pieza va apretada en la prensa o con bridas. Nunca se sujeta con la mano.' },
        { q: 'Tienes que fresar una pieza chica que cuesta poner en la prensa. ¿Qué haces?', o: ['Busco cómo apretarla o pido ayuda', 'La afirmo con la mano y fresa despacio', 'La afirmo con un alicate en la mano', 'La pego a la mesa con cinta adhesiva'], w: 'Ninguna pieza se sujeta con la mano. Si no sabes cómo fijarla, consulta a tu jefatura.' },
        { q: 'Si la pieza es pequeña, se puede sujetar con la mano mientras la fresa corta despacio.', vf: false, w: 'Falso. La fresa arrastra la pieza y la mano. Siempre en la prensa o con bridas.' }] },
      { s: 'al_mq_fresa_q_guantes', v: [
        { q: 'Un compañero quiere sacar una viruta cerca de la fresa en giro, con guantes. ¿Qué le dices?', o: ['Que la detenga y use escobilla', 'Que lo haga rápido para no parar', 'Que use unos guantes más gruesos', 'Que lo haga con la otra mano'], w: 'Con la fresa girando, las manos fuera. Se detiene la máquina y se usa escobilla o gancho.' },
        { q: '¿Por qué no se usan guantes cerca de la fresa en giro?', o: ['Se enganchan y arrastran la mano', 'Porque se ensucian con el refrigerante', 'Porque hacen sudar mucho las manos', 'Porque se gastan con las virutas'], w: 'El guante se engancha en la fresa o el husillo y arrastra la mano en un instante.' },
        { q: 'Con la fresa girando, las manos van fuera de su recorrido y lejos de la mesa en movimiento.', vf: true, w: 'Verdadero. Y sin guantes, joyas ni ropa suelta cerca.' }] },
      { s: 'al_mq_fresa_herr_q', v: [
        { q: 'Antes de encender la fresadora, ¿qué revisas en la fresa?', o: ['Que esté afilada, sana y apretada', 'Que esté recién pintada y limpia', 'Que sea la más grande que haya', 'Que esté tibia, para que corte mejor'], w: 'La fresa correcta, afilada, sin dientes rotos y bien apretada. Y la llave de apriete fuera.' },
        { q: 'Apretaste la fresa en la pinza. ¿Qué haces con la llave de apriete?', o: ['La saco antes de encender la máquina', 'La dejo puesta para el próximo cambio', 'La dejo sobre la mesa de la fresadora', 'La dejo colgando del husillo'], w: 'La llave se saca antes de encender: si queda puesta, sale disparada.' },
        { q: 'Notas que la fresa tiene un diente quebrado. ¿Qué haces?', o: ['No la uso y la cambio por una sana', 'La uso igual, a menor velocidad', 'La uso igual, con careta facial', 'La uso solo para terminar esta pieza'], w: 'Una fresa dañada se puede romper y lanzar trozos. Se cambia antes de trabajar.' }] },
      { s: 'al_mq_fresa_q_detener', v: [
        { q: 'Tienes que medir la pieza en la prensa. ¿Qué haces primero?', o: ['Detengo la máquina y espero que pare', 'Mido rápido mientras la mesa avanza', 'Bajo la velocidad y mido con cuidado', 'Mido por el lado contrario a la fresa'], w: 'Para medir, ajustar o limpiar, la máquina se detiene y se espera que la fresa pare.' },
        { q: '¿Con qué sacas las virutas de la prensa y de la mesa?', o: ['Con escobilla o gancho, ya detenida', 'Con la mano, porque son virutas chicas', 'Con aire comprimido, para terminar rápido', 'Con un paño, mientras la fresa sigue girando'], w: 'Con escobilla o gancho y la máquina detenida. Nunca con la mano ni con aire comprimido.' },
        { q: 'Para girar la pieza en la prensa basta con alejar la fresa, sin detener la máquina.', vf: false, w: 'Falso. Para mover o girar la pieza, la máquina se detiene y se espera que la fresa pare.' }] },
      { s: 'al_mq_fresa_refri_q', v: [
        { q: '¿Qué guantes usas para limpiar la fresadora con refrigerante, con la máquina detenida?', o: ['Guantes de nitrilo', 'Guantes de lana', 'Guantes de descarne', 'Ningún guante'], w: 'Los guantes de nitrilo protegen la piel del refrigerante y del aceite de corte.' },
        { q: 'Terminaste de trabajar con refrigerante y vas a almorzar. ¿Qué haces antes?', o: ['Me lavo las manos con agua y jabón', 'Me limpio las manos con diluyente', 'Me seco las manos en la ropa', 'Me limpio con el paño de la máquina'], w: 'Antes de comer o fumar, lávate las manos con agua y jabón. El solvente daña la piel.' },
        { q: 'El refrigerante de la fresadora puede irritar la piel y causar dermatitis.', vf: true, w: 'Verdadero. Por eso se usan guantes de nitrilo al limpiar y se lavan las manos.' }] },
      { s: 'al_mq_fresa_q_prot', v: [
        { q: 'Vas a usar la fresadora y notas que le falta la protección de la fresa. ¿Qué haces?', o: ['No la uso y aviso a mi jefatura', 'La uso con más cuidado que siempre', 'La uso solo para un corte corto', 'La uso, pero con careta facial'], w: 'Si falta o está dañada una protección, la máquina no se usa y se avisa.' },
        { q: '¿Para qué sirve la protección o pantalla de la fresa?', o: ['Frena virutas y aleja las manos', 'Para que la fresa corte más rápido', 'Para que el refrigerante dure más', 'Para que no se vea la fresa girando'], w: 'La protección detiene virutas y salpicaduras y aleja las manos de la fresa.' },
        { q: 'Se puede sacar la protección de la fresa si estorba para ver el corte.', vf: false, w: 'Falso. La protección se mantiene siempre en su lugar.' }] }
    ]
  });
  // ======================================================================
  // 3. TALADRO DE PEDESTAL Y SIERRA HUINCHA
  // ======================================================================
  // taladro de la biblioteca en x: mesa (x-2..x+34) a y 107, broca en x+18 (y 91-99), palanca hasta (x+42, 75)
  const prensaT = x => `<rect x="${x - 8}" y="99" width="8" height="2.4" fill="#90A4AE"/><rect x="${x}" y="103" width="26" height="4" fill="#455A64" stroke="${OL}" stroke-width=".8"/><rect x="${x + 2}" y="95" width="4" height="8" fill="#546E7A" stroke="${OL}" stroke-width=".6"/><rect x="${x + 20}" y="95" width="4" height="8" fill="#546E7A" stroke="${OL}" stroke-width=".6"/><rect x="${x + 6}" y="98" width="14" height="5" fill="#B0BEC5" stroke="${OL}" stroke-width=".6"/>`;
  // taladro en acercamiento: (cx, cy) = punta de la broca
  const taladroZ = (cx, cy, s, o = {}) => { let g = `<rect x="60" y="-150" width="40" height="190" fill="#4A6274" stroke="${OL}" stroke-width="1.5"/><rect x="-110" y="40" width="210" height="14" fill="#78909C" stroke="${OL}" stroke-width="1.4"/>`;
    g += `<rect x="-50" y="-130" width="130" height="50" rx="4" fill="#4A6274" stroke="${OL}" stroke-width="1.5"/><rect x="-10" y="-80" width="20" height="20" fill="#90A4AE" stroke="${OL}" stroke-width="1.2"/><path d="M-14,-60 L14,-60 L9,-38 L-9,-38 z" fill="#B0BEC5" stroke="${OL}" stroke-width="1.2"/><rect x="9" y="-55" width="4" height="6" fill="#263238"/>`;
    g += `<rect x="-3.5" y="-38" width="7" height="34" fill="#CFD8DC" stroke="${OL}" stroke-width="1"/><path d="M-3.5,-4 L0,1 L3.5,-4 z" fill="#CFD8DC" stroke="${OL}" stroke-width="1"/>` + [-32, -24, -16, -8].map(v => `<path d="M-3.5,${v} l7,-4" stroke="#78909C" stroke-width="1.2"/>`).join('');
    if (o.prensa) g += `<rect x="-52" y="30" width="104" height="10" fill="#455A64" stroke="${OL}"/><rect x="-44" y="4" width="14" height="26" fill="#546E7A" stroke="${OL}"/><rect x="30" y="4" width="14" height="26" fill="#546E7A" stroke="${OL}"/><rect x="-30" y="2" width="60" height="22" fill="#B0BEC5" stroke="${OL}" stroke-width="1.2"/><rect x="-82" y="14" width="30" height="4" fill="#90A4AE" stroke="${OL}" stroke-width=".8"/><rect x="-88" y="-2" width="6" height="36" rx="2" fill="#263238"/>`;
    if (o.mano) g += `<rect x="-36" y="10" width="72" height="30" fill="#BCAAA4" stroke="#8D6E63"/><rect x="-74" y="2" width="134" height="8" fill="#B0BEC5" stroke="${OL}" stroke-width="1.2"/>` + mano(-60, 4, 1, {}) + (o.traba ? `<ellipse cx="-6" cy="6" rx="78" ry="12" fill="none" stroke="#D7262B" stroke-width="3" stroke-dasharray="9 6" class="amq_ds"/>` : '');
    if (o.gira) g += giro(0, -20, 9, 3) + parts(6, 0, 4, 'amq_pr');
    if (o.llave) g += `<path d="M-46,-80 v4" stroke="#263238" stroke-width="2.4"/><rect x="-58" y="-76" width="24" height="5" rx="2" fill="#263238"/><rect x="-48" y="-71" width="4" height="22" fill="#546E7A" stroke="${OL}" stroke-width=".8"/>`;
    return big(cx, cy, s, g); };
  // sierra huincha de la biblioteca en x: bancada x..x+100 a y 113, hoja de x+16 a x+78 a y 107
  const hoja = (x, mov = true) => `<path d="M${x + 16},107 h62" stroke="#ECEFF1" stroke-width="2.2" stroke-dasharray="3 2"${mov ? ' class="amq_jt"' : ''}/>`;
  const barra = (x1, x2) => `<rect x="${x1}" y="105" width="${x2 - x1}" height="8" fill="#B0BEC5" stroke="${OL}" stroke-width="1"/><rect x="${x1}" y="105" width="${x2 - x1}" height="2.4" fill="#CFD8DC"/>`;
  // soporte de rodillos (la parte de arriba del rodillo queda a y - h)
  const rodillos = (x, y, h) => `<path d="M${x - 16},${y} L${x},${y - 28} L${x + 16},${y}" stroke="#455A64" stroke-width="3" fill="none"/><rect x="${x - 2}" y="${y - h + 6}" width="4" height="${h - 6}" fill="#607D8B"/><rect x="${x - 14}" y="${y - h + 5}" width="28" height="3" fill="#455A64"/><rect x="${x - 12}" y="${y - h}" width="24" height="6" rx="3" fill="#B0BEC5" stroke="${OL}"/>`;
  const TS = 'al_mq_taladro_sierra_';
  S[TS + 'intro'] = () => V(H.fondo.taller() + H.taladro(60, 165) + prensaT(65) + parts(80, 98, 4, 'amq_pr') + P(122, 165, { pose: 'amq_up', flip: true })
    + H.sierra(180, 165) + barra(168, 304) + hoja(180) + parts(226, 106, 4, 'amq_pl')
    + pl(80, 6, 'Taladro de pedestal', '#1565C0', 10) + pl(236, 6, 'Sierra huincha', '#1565C0', 10) + pl(160, 176, 'Atrapamiento, cortes y virutas', '#D7262B', 10));
  S[TS + 'prensa'] = () => V(zbg() + div() + taladroZ(78, 116, .6, { gira: true, mano: true }) + taladroZ(238, 116, .6, { gira: true, prensa: true })
    + pl(80, 6, 'Sujeta con la mano', '#D7262B', 10) + pl(240, 6, 'En la prensa', '#2E7D32', 10) + H.no(80, 176, 13) + H.si(240, 176, 13));
  S[TS + 'q_prensa'] = () => V(zbg() + taladroZ(150, 116, .75, { gira: true, mano: true }) + qmark(285, 40));
  S[TS + 'q_traba'] = () => V(zbg() + taladroZ(150, 116, .75, { gira: true, mano: true, traba: true }) + qmark(285, 40));
  const brocaSc = q => zbg() + taladroZ(110, 118, .8, { prensa: true, llave: true }) + (q ? qmark(270, 150)
    : lead(250, 8, 'Llave del mandril fuera', 72, 58, '#D7262B') + lead(250, 40, 'Bien apretada en el mandril', 118, 80) + lead(250, 72, 'Broca correcta y afilada', 113, 102, '#2E7D32'));
  S[TS + 'broca'] = () => V(brocaSc(false));
  S[TS + 'broca_q'] = () => V(brocaSc(true));
  S[TS + 'taladrar'] = () => V(H.fondo.taller() + H.taladro(70, 165) + prensaT(75) + parts(90, 98, 5, 'amq_pr') + parts(86, 98, 3, 'amq_pl') + P(132, 165, { pose: 'amq_up', flip: true })
    + pl(245, 20, 'Sin guantes ni joyas', '#D7262B', 10) + pl(245, 44, 'Baja sin forzar', '#1565C0', 10) + pl(245, 68, 'Menos presión al atravesar', '#1565C0', 10));
  // sierra en acercamiento: guías junto a la pieza (o abiertas en la prueba)
  const guiaSc = q => { const a = q ? 47 : 63, b = q ? 107 : 89;
    return zbg() + `<rect y="180" width="320" height="20" fill="#9EA7AD"/>` + big(-28, -100, 1.7, H.sierra(30, 165) + `<circle cx="77" cy="104" r="8.5" fill="#B0BEC5" stroke="${OL}"/><circle cx="77" cy="104" r="4" fill="none" stroke="#90A4AE"/>`
      + `<path d="M${a + 4},107 H${b}" stroke="#D7262B" stroke-width="2.4"/>` + hoja(30) + `<rect x="${a}" y="91" width="4" height="18" fill="#455A64"/><rect x="${b}" y="91" width="4" height="18" fill="#455A64"/>`)
      + (q ? qmark(270, 40) : lead(80, 4, 'Guías junto a la pieza', 81, 66, '#2E7D32') + lead(240, 4, 'Tapas de poleas cerradas', 160, 62) + lead(240, 32, 'Hoja sin dientes rotos', 112, 83)); };
  S[TS + 'guia'] = () => V(guiaSc(false));
  S[TS + 'guia_q'] = () => V(guiaSc(true));
  const apoyoSc = q => H.fondo.taller() + H.sierra(30, 165) + (q ? barra(10, 130) + `<path d="M130,105 L252,138 L250,146 L130,113 z" fill="#B0BEC5" stroke="${OL}"/>`
    : barra(10, 272) + rodillos(245, 165, 52) + `<path d="M272,106 l12,-4 l-2,10 z" fill="#D7262B"/>`) + hoja(30, false)
    + P(178, 165, { pose: q ? 'stand' : 'point', flip: !!q }) + (q ? qmark(285, 40) : pl(220, 20, 'Barra apoyada a la misma altura', '#2E7D32', 10) + pl(220, 44, 'Extremo señalizado', '#1565C0', 10));
  S[TS + 'apoyo'] = () => V(apoyoSc(false));
  S[TS + 'q_apoyo'] = () => V(apoyoSc(true));
  S[TS + 'alimentar'] = () => V(H.fondo.taller() + H.sierra(50, 165) + barra(20, 150) + hoja(50) + parts(96, 106, 4, 'amq_pl') + `<rect x="152" y="152" width="24" height="8" fill="#B0BEC5" stroke="${OL}"/>` + arrow(164, 120, 164, 146, '#D7262B', 2.5)
    + P(205, 165, { flip: true }) + pl(245, 10, 'Deja que corte a su ritmo', '#1565C0', 10) + pl(245, 34, 'Manos lejos de la hoja', '#D7262B', 10) + pl(245, 58, 'Cuida tus pies', '#E65100', 10));
  S[TS + 'recortes'] = () => V(H.fondo.taller() + div() + H.sierra(10, 165) + barra(0, 110) + hoja(10) + parts(60, 106, 4, 'amq_pl') + P(128, 165, { pose: 'amq_reach', flip: true })
    + H.sierra(170, 165) + barra(166, 270) + hoja(170, false) + virutas(196, 104, 4, .8) + P(290, 165, { pose: 'amq_reach', flip: true, gloves: '#C8A27A' }) + escobilla(260, 101, -14, 4)
    + pl(80, 6, 'Hoja en movimiento', '#D7262B', 10) + pl(240, 6, 'Hoja detenida', '#2E7D32', 10) + H.no(22, 46, 13) + H.si(182, 46, 13));
  S[TS + 'q_recortes'] = () => V(H.fondo.taller() + H.sierra(60, 165) + barra(40, 168) + hoja(60) + P(178, 165, { pose: 'amq_reach', flip: true }) + qmark(270, 45));

  SI_CONT.temas.push({
    id: 'mq_taladro_sierra', sec: 'maquinas', emp: ['ali'], title: 'Taladro de pedestal y sierra huincha', thumb: TS + 'intro', mins: 15,
    learn: [
      { s: TS + 'intro', t: 'Dos máquinas de todos los días', x: 'El taladro de pedestal y la sierra huincha parecen simples, pero causan accidentes graves:<ul><li>En el <b>taladro</b>, la broca se traba y <b>hace girar la pieza</b> como una hélice, que golpea y corta la mano. La broca también enrolla guantes, mangas y pelo.</li><li>En la <b>sierra huincha</b>, la hoja corta lo que toca, y las barras pesadas pueden caer sobre los pies.</li><li>En las dos saltan <b>virutas</b>.</li></ul>Solo las usa quien está <b>capacitado y autorizado</b>.' },
      { s: TS + 'prensa', t: 'Taladro: la pieza va en la prensa', x: 'La pieza va <b>apretada en la prensa del taladro</b>, y la prensa afirmada a la mesa. <b>Nunca la sujetes con la mano</b>: cuando la broca se traba, la pieza gira de golpe y te corta o golpea la mano.<ul><li>Planchas delgadas: en la prensa o con grapas, con un taco de madera debajo.</li><li>Si la pieza empieza a girar, <b>no la agarres</b>: aprieta el botón de parada.</li></ul>', k: 'En el taladro, la pieza siempre en la prensa, nunca en la mano.' },
      { s: TS + 'broca', t: 'La broca correcta y bien apretada', x: '<ul><li>Usa la <b>broca del diámetro y del tipo</b> correctos para el material, afilada y derecha.</li><li><b>Bien apretada</b> en el mandril.</li><li><b>Saca la llave del mandril</b> antes de encender.</li><li>Marca el centro con un granete para que la broca no se desvíe.</li><li>Ajusta la velocidad: <b>broca más grande, velocidad más baja</b>.</li></ul>' },
      { s: TS + 'taladrar', t: 'Al taladrar: sin guantes y sin forzar', x: '<ul><li><b>Sin guantes</b>, joyas ni ropa suelta cerca de la broca en giro.</li><li>Lentes de seguridad siempre.</li><li>Baja la broca <b>sin forzarla</b> y súbela de vez en cuando para sacar la viruta.</li><li><b>Al atravesar la pieza, baja la presión</b>: ahí es cuando la broca más se traba.</li><li>Usa refrigerante si el trabajo lo pide.</li><li>Las virutas se sacan con escobilla y la máquina detenida.</li></ul>' },
      { s: TS + 'guia', t: 'Sierra huincha: ajusta la guía', x: 'Antes de cortar, revisa la sierra:<ul><li>Acerca la <b>guía de la hoja lo más posible a la pieza</b>: así queda a la vista solo el tramo de hoja que corta.</li><li>Las <b>tapas de las poleas</b>, cerradas.</li><li>La hoja, con la tensión correcta y <b>sin dientes rotos</b> ni trizaduras.</li><li>El refrigerante, con nivel.</li></ul>Si falta una protección, no la uses y avisa a tu jefatura.' },
      { s: TS + 'apoyo', t: 'La pieza, apretada y apoyada', x: '<ul><li>La pieza va <b>apretada en la prensa</b> de la sierra, nunca afirmada con la mano.</li><li>Una barra larga se apoya en un <b>soporte de rodillos</b> o caballete <b>a la misma altura</b>, para que no se vuelque ni caiga al terminar el corte.</li><li>Si la barra sobresale hacia un pasillo, <b>señaliza el extremo</b> para que nadie se golpee.</li></ul>Para mover barras pesadas: máximo 25 kg los hombres y 20 kg las mujeres; sobre eso, con ayuda o con tecle.' },
      { s: TS + 'alimentar', t: 'Deja que la sierra corte sola', x: '<ul><li>Deja que la sierra baje y corte <b>a su ritmo</b>: no empujes el arco ni le cargues peso.</li><li>Las manos, <b>lejos de la hoja</b> mientras corta.</li><li>Si la hoja se traba o se corta, <b>detén la máquina</b> y avisa.</li><li>Al terminar el corte, el trozo cae: tus pies lejos y con <b>zapatos de seguridad</b>.</li></ul>' },
      { s: TS + 'recortes', t: 'Recortes y virutas: con la hoja detenida', x: '<b>Nunca retires recortes ni virutas con la hoja en movimiento</b>: espera que se detenga por completo.<ul><li>Usa escobilla o gancho, y guantes, porque los recortes tienen filo.</li><li>El cambio de hoja y la mantención se hacen con la máquina <b>bloqueada con candado y tarjeta</b>.</li></ul>', k: 'Recortes y virutas: solo con la hoja detenida.' }
    ],
    quiz: [
      { s: TS + 'q_prensa', v: [
        { q: '¿Cómo se sujeta la pieza para taladrarla?', o: ['En la prensa del taladro', 'Con la mano, bien firme', 'Con el pie sobre la mesa', 'Con un guante grueso de cuero'], w: 'La pieza va apretada en la prensa del taladro, y la prensa afirmada a la mesa.' },
        { q: 'Vas a hacer una perforación chica en una plancha delgada. ¿Cómo la sujetas?', o: ['En la prensa o con grapas', 'Con la mano, porque la broca es chica', 'Con un compañero que la afirme fuerte', 'Apoyada en la mesa, sin sujetarla'], w: 'Aunque la broca sea chica, la pieza va en la prensa o con grapas. Nunca con la mano.' },
        { q: 'En el taladro, una pieza chica se puede afirmar con la mano si la broca es delgada.', vf: false, w: 'Falso. Cuando la broca se traba, la pieza gira de golpe y corta la mano.' }] },
      { s: TS + 'q_traba', v: [
        { q: 'Taladrando, la broca se traba y la pieza empieza a girar. ¿Qué haces?', o: ['No la agarro y aprieto la parada', 'La agarro fuerte para frenarla', 'La freno con un trapo o un guante', 'Subo la velocidad para que corte'], w: 'Nunca se agarra una pieza que gira: se aprieta la parada y se espera que todo se detenga.' },
        { q: '¿En qué momento se traba más la broca?', o: ['Cuando atraviesa la pieza', 'Cuando se acerca a la pieza', 'Cuando se enciende el taladro', 'Cuando se marca con granete'], w: 'Al atravesar la pieza la broca se clava y se traba: por eso se baja la presión al final.' },
        { q: 'Si la pieza empieza a girar con la broca, debes agarrarla para frenarla.', vf: false, w: 'Falso. Se suelta y se aprieta la parada. Agarrarla es cortarse la mano.' }] },
      { s: TS + 'broca_q', v: [
        { q: 'Antes de encender el taladro, ¿qué haces con la llave del mandril?', o: ['La saco y la dejo en su lugar', 'La dejo puesta para cambiar rápido', 'La dejo sobre la mesa del taladro', 'La dejo puesta, sin apretar'], w: 'La llave del mandril se saca antes de encender: si queda puesta, sale disparada.' },
        { q: 'Vas a perforar con una broca grande. ¿Cómo ajustas la velocidad?', o: ['Más baja que con una broca chica', 'Más alta que con una broca chica', 'Al máximo, para terminar rápido', 'Igual que con cualquier broca'], w: 'Broca más grande, velocidad más baja.' },
        { q: '¿Qué broca usas para perforar?', o: ['La de la medida y el tipo correctos', 'La primera que encuentre en el cajón', 'Una gastada, para no usar las nuevas', 'Una más grande, para avanzar rápido'], w: 'La broca del diámetro y del tipo correctos para el material, afilada y derecha.' }] },
      { s: TS + 'guia_q', v: [
        { q: '¿Dónde ajustas la guía de la hoja de la sierra huincha?', o: ['Lo más cerca posible de la pieza', 'Lo más lejos posible de la pieza', 'Donde quedó la última vez', 'En la mitad del recorrido'], w: 'La guía va lo más cerca posible de la pieza: así queda a la vista solo el tramo que corta.' },
        { q: 'Vas a cortar y ves que una tapa de las poleas está abierta. ¿Qué haces?', o: ['No corto hasta que esté cerrada', 'Corto igual, con cuidado', 'Corto rápido y la cierro después', 'Corto con guantes de cuero'], w: 'Con una protección abierta no se corta. Se cierra o se avisa a la jefatura.' },
        { q: 'Con la guía cerca de la pieza, queda a la vista solo el tramo de hoja que corta.', vf: true, w: 'Verdadero. Por eso la guía se ajusta junto a la pieza antes de cada corte.' }] },
      { s: TS + 'q_apoyo', v: [
        { q: 'Vas a cortar una barra larga que sobresale mucho de la sierra. ¿Qué haces?', o: ['La apoyo en un soporte de rodillos', 'La afirmo con la mano en el extremo', 'La dejo colgando, porque es firme', 'Le pido a alguien que la sujete'], w: 'Se apoya en un soporte de rodillos o caballete a la misma altura, para que no se vuelque ni caiga.' },
        { q: '¿Cómo debe quedar la pieza en la sierra huincha?', o: ['Apretada en la prensa de la sierra', 'Afirmada con la mano mientras corta', 'Suelta, para que la hoja la acomode', 'Apoyada contra la hoja, sin prensa'], w: 'La pieza va apretada en la prensa de la sierra. Nunca con la mano.' },
        { q: 'La barra que vas a cortar sobresale hacia un pasillo. ¿Qué haces?', o: ['Señalizo el extremo', 'Nada, el corte dura muy poco', 'La corto más rápido que lo normal', 'Lo dejo así y sigo trabajando'], w: 'El extremo se señaliza para que nadie se golpee al pasar.' }] },
      { s: TS + 'q_recortes', v: [
        { q: 'La sierra está cortando y un recorte quedó cerca de la hoja. ¿Qué haces?', o: ['Espero que pare y uso gancho', 'Lo saco rápido con la mano', 'Lo empujo con un guante grueso', 'Lo soplo con aire comprimido'], w: 'Los recortes y virutas se retiran solo con la hoja detenida, con gancho o escobilla y guantes.' },
        { q: 'Mientras la sierra corta, ¿dónde van tus manos?', o: ['Lejos de la hoja', 'Sobre el arco, empujando', 'Afirmando la pieza junto a la hoja', 'Guiando la hoja con un guante'], w: 'Las manos van lejos de la hoja. La sierra corta sola, a su ritmo.' },
        { q: 'El cambio de hoja de la sierra se hace con la máquina bloqueada con candado y tarjeta.', vf: true, w: 'Verdadero. Así nadie la puede encender mientras trabajas en ella.' }] }
    ]
  });

  // ======================================================================
  // animaciones extra (charlas 4 a 7)
  // ======================================================================
  const CSS2 = '<style>'
    + '.amq_pgR{animation:amq_pgR 2.4s ease-in-out infinite}@keyframes amq_pgR{0%,25%{transform:rotate(0)}70%,85%{transform:rotate(-28deg)}100%{transform:rotate(0)}}'
    + '.amq_cae{animation:amq_cae 1.6s ease-in infinite}@keyframes amq_cae{0%,35%{transform:translate(0,0) rotate(0);opacity:1}100%{transform:translate(12px,30px) rotate(50deg);opacity:.2}}'
    + '.amq_nb{animation:amq_nb 1.1s ease-in-out infinite alternate}@keyframes amq_nb{from{opacity:.3}to{opacity:.75}}'
    + '.amq_fl{animation:amq_fl 2.4s linear infinite}@keyframes amq_fl{0%{transform:translateX(0);opacity:0}20%{opacity:.9}100%{transform:translateX(26px);opacity:0}}'
    + '</style>';
  const V2 = inner => sv(H.CSS + CSS + CSS2 + inner);
  // globo de diálogo: (cx, y) arriba del globo, cola hacia (tx, ty)
  const globo = (cx, y, t, tx, ty, fs = 9) => { const w = Math.round(t.length * fs * .58 + 14);
    return `<path d="M${cx - 6},${y + fs + 9} L${tx},${ty} L${cx + 6},${y + fs + 9} z" fill="#fff" stroke="${OL}" stroke-width="1"/><rect x="${cx - w / 2}" y="${y}" width="${w}" height="${fs + 11}" rx="8" fill="#fff" stroke="${OL}" stroke-width="1"/><rect x="${cx - 5}" y="${y + fs + 7}" width="10" height="3" fill="#fff"/>` + T(cx, y + fs + 3, t, fs, '#263238'); };
  const plancha = (x1, x2, y, c = '#B0BEC5') => `<rect x="${x1}" y="${y - 3}" width="${x2 - x1}" height="3" fill="${c}" stroke="${OL}" stroke-width=".7"/>`;
  // caballete (pieza a granallar o pintar): x = centro, y = altura de apoyo
  const caballete = (x, y) => `<path d="M${x - 14},165 L${x},${y} L${x + 14},165" stroke="#546E7A" stroke-width="3.4" fill="none"/><rect x="${x - 12}" y="${y - 3}" width="24" height="4" fill="#455A64"/>`;

  // ======================================================================
  // 4. GUILLOTINA, PLEGADORA Y PRENSA
  // ======================================================================
  // H.guillotina(x,165): mesa a y 115 (x-10 .. x+140), protección de dedos amarilla y 105-111, pedal (x+50..x+80, 155-163)
  // H.plegadora(x,165): punzón con punta en (x+65, 107), matriz y 115-127, pedal (x+50..x+80, 155-163)
  const GP = 'al_mq_guillotina_plegadora_';
  const pedalCub = x => `<path d="M${x - 3},164 v-13 q18,-9 36,0 v13" fill="#FFC20E" fill-opacity=".85" stroke="${OL}" stroke-width="1"/><rect x="${x + 4}" y="157" width="22" height="6" rx="2" fill="#263238"/>`;
  const barreraLuz = (x1, x2, y1, y2) => { let g = ''; for (let y = y1; y <= y2; y += 5) g += `<line x1="${x1 + 3}" y1="${y}" x2="${x2 - 3}" y2="${y}" stroke="#E53935" stroke-width="1" stroke-dasharray="2 4" opacity=".75" class="amq_ds"/>`;
    return g + `<rect x="${x1 - 3}" y="${y1 - 6}" width="6" height="${y2 - y1 + 12}" rx="2" fill="#FFC20E" stroke="${OL}"/><rect x="${x2 - 3}" y="${y1 - 6}" width="6" height="${y2 - y1 + 12}" rx="2" fill="#FFC20E" stroke="${OL}"/>`; };
  // mando bimanual: (cx, y) = borde superior de la caja; botones en (cx ± 14, y + 8)
  const bimanual = (cx, y, pie = true) => (pie ? `<rect x="${cx - 3}" y="${y + 16}" width="6" height="${149 - y}" fill="#546E7A"/><rect x="${cx - 12}" y="162" width="24" height="3" fill="#455A64"/>` : '')
    + `<rect x="${cx - 26}" y="${y}" width="52" height="16" rx="3" fill="#FFC20E" stroke="${OL}"/>` + [-14, 14].map(d => `<circle cx="${cx + d}" cy="${y + 8}" r="5.5" fill="#455A64"/><circle cx="${cx + d}" cy="${y + 8}" r="3.6" fill="#2E7D32" stroke="${OL}" stroke-width=".6"/>`).join('')
    + `<circle cx="${cx}" cy="${y + 7}" r="3.4" fill="#D32F2F" stroke="${OL}" stroke-width=".6"/>`;
  // prensa de columna (tipo C); x = izquierda, y = piso 165; martillo (x+38..x+60) baja hasta la matriz en y 103
  const prensaM = (x, o = {}) => `<rect x="${x}" y="157" width="70" height="8" fill="#455A64" stroke="${OL}"/><rect x="${x + 4}" y="53" width="22" height="104" fill="#4A6274" stroke="${OL}" stroke-width="1.2"/>`
    + `<rect x="${x + 4}" y="45" width="64" height="30" rx="3" fill="#5D7486" stroke="${OL}" stroke-width="1.2"/><circle cx="${x + 15}" cy="60" r="9" fill="#90A4AE" stroke="${OL}"/><path d="M${x + 15},51 v18 M${x + 6},60 h18" stroke="${OL}" stroke-width="1.2"/>`
    + `<rect x="${x + 26}" y="109" width="42" height="10" fill="#78909C" stroke="${OL}"/><rect x="${x + 36}" y="119" width="22" height="38" fill="#4A6274" stroke="${OL}"/>`
    + `<rect x="${x + 38}" y="103" width="22" height="6" fill="#B0BEC5" stroke="${OL}" stroke-width=".8"/>`
    + `<g class="${o.baja ? 'amq_cut' : ''}" style="--dy:8px"><rect x="${x + 41}" y="75" width="16" height="14" fill="#90A4AE" stroke="${OL}"/><rect x="${x + 38}" y="89" width="22" height="6" fill="#CFD8DC" stroke="${OL}" stroke-width=".8"/></g>`
    + (o.guard !== false ? `<rect x="${x + 30}" y="78" width="36" height="30" rx="2" fill="#FFC20E" fill-opacity=".25" stroke="#F9A825" stroke-width="1.4"/>` : '');
  S[GP + 'intro'] = () => V2(H.fondo.taller() + H.guillotina(8, 165) + plancha(0, 150, 115) + P(166, 165, { pose: 'amq_op', flip: true, gloves: '#B0BEC5' })
    + H.plegadora(186, 165) + plancha(176, 320, 115)
    + pl(80, 6, 'Guillotina', '#1565C0', 10) + pl(251, 6, 'Plegadora', '#1565C0', 10) + pl(160, 176, 'Cortes, amputaciones y atrapamiento', '#D7262B', 10));
  const protGSc = q => H.fondo.taller() + H.guillotina(30, 165) + pedalCub(78) + hongo(151, 71, 7) + plancha(22, 150, 115)
    + P(215, 165, { pose: q ? 'stand' : 'point', flip: true })
    + (q ? qmark(280, 40) : lead(70, 4, 'Protección de dedos', 95, 108, '#2E7D32') + lead(240, 4, 'Parada de emergencia', 151, 68, '#D7262B')
      + pl(250, 34, 'Solo con todo en su lugar', '#1565C0', 10) + lead(70, 176, 'Pedal con cubierta', 93, 152));
  S[GP + 'prot'] = () => V2(protGSc(false));
  S[GP + 'q_prot'] = () => V2(protGSc(true));
  // mandos: bimanual en acercamiento (izq.) y pedal con cubierta (der.)
  const zapato = (x, y) => `<path d="M${x + 2},${y - 18} v-26 h14 v26 z" fill="#2B3A4A" stroke="${OL}"/><path d="M${x - 18},${y} h34 v-14 q0,-5 -5,-5 h-11 l-4,-4 h-6 q-8,4 -8,13 z" fill="#5D4037" stroke="${OL}"/><path d="M${x - 18},${y} q0,-9 8,-13 v13 z" fill="#FBC02D" stroke="${OL}" stroke-width=".8"/><rect x="${x - 18}" y="${y - 3}" width="34" height="3" fill="#212121"/>`;
  const mandoSc = q => zbg() + (q ? '' : div()) + big(q ? 160 : 80, q ? 70 : 82, q ? 2.4 : 1.8, bimanual(0, 0, false))
    + (q ? mano(126, 88, .8, { ang: 90, c: '#C8A27A' }) + `<rect x="181" y="60" width="16" height="9" rx="2" fill="#795548" stroke="${OL}"/><path d="M178,70 h22" stroke="#FFC20E" stroke-width="3"/>` + qmark(285, 40)
      : mano(55, 92, .7, { ang: 90 }) + mano(105, 92, .7, { ang: 90 })
      + `<rect x="176" y="150" width="140" height="8" fill="#90A4AE"/>` + big(222, 150, 2.2, `<path d="M-21,0 v-13 q18,-9 36,0 v13" fill="#FFC20E" fill-opacity=".85" stroke="${OL}" stroke-width="1"/><rect x="-14" y="-7" width="22" height="6" rx="2" fill="#263238"/>`) + big(286, 150, 1.5, zapato(0, 0))
      + pl(80, 6, 'Las dos manos en los mandos', '#2E7D32', 10) + pl(240, 6, 'Pedal con cubierta', '#2E7D32', 10) + H.si(80, 176, 13) + H.si(240, 70, 13));
  S[GP + 'mandos'] = () => V2(mandoSc(false));
  S[GP + 'q_mandos'] = () => V2(mandoSc(true));
  // trabajo de a dos en la plegadora
  const dosSc = q => H.fondo.taller() + H.plegadora(95, 165) + barreraLuz(97, 223, 100, 120) + plancha(55, 265, 115)
    + P(62, 165, { pose: 'lift2', gloves: '#B0BEC5' }) + P(258, 165, { pose: 'lift2', flip: true, gloves: '#B0BEC5' })
    + (q ? qmark(160, 40) : globo(250, 36, '¿Listos? ¡Manos fuera!', 258, 78) + globo(64, 44, 'Listo', 62, 80)
      + pl(160, 176, 'Uno solo da la orden y acciona el pedal', '#1565C0', 10));
  S[GP + 'dos'] = () => V2(dosSc(false));
  S[GP + 'q_dos'] = () => V2(dosSc(true));
  // planchas con bordes filosos
  const filoSc = q => H.fondo.taller() + plancha(48, 142, 118) + P(84, 165, { pose: 'carry', gloves: q ? false : '#B0BEC5' })
    + (q ? qmark(270, 45) : `<line x1="142" y1="116" x2="186" y2="96" stroke="#1565C0" stroke-width="1.4" stroke-dasharray="3 2"/>`
      + lupa(238, 100, 56, `<rect x="160" y="90" width="98" height="16" fill="#B0BEC5" stroke="${OL}"/><path d="M258,90 l6,3 l-5,3 l6,3 l-5,3 l6,3 l-6,1" fill="#B0BEC5" stroke="${OL}"/>`
        + mano(232, 93, 1, { ang: 0, c: '#B0BEC5' }) + [0, 1, 2, 3].map(i => `<path d="M${200 + i * 6},84 l3,-4" stroke="#78909C" stroke-width="1.2"/>`).join(''))
      + pl(238, 4, 'Guantes anticorte', '#2E7D32', 10) + pl(238, 176, 'Bordes y rebabas cortan', '#D7262B', 10));
  S[GP + 'filo'] = () => V2(filoSc(false));
  S[GP + 'q_filo'] = () => V2(filoSc(true));
  // guillotina vista de lado: los recortes caen por detrás
  const recSc = q => { const x = 40;
    return H.fondo.taller() + `<rect x="${x + 100}" y="166" width="110" height="10" fill="#D32F2F" opacity=".3"/>` + [0, 1, 2, 3, 4, 5, 6].map(i => `<line x1="${x + 104 + i * 15}" y1="166" x2="${x + 98 + i * 15}" y2="176" stroke="#D32F2F" stroke-width="2" opacity=".6"/>`).join('')
      + `<rect x="${x + 70}" y="78" width="40" height="87" fill="#4A6274" stroke="${OL}" stroke-width="1.2"/><rect x="${x}" y="112" width="92" height="8" fill="#B0BEC5" stroke="${OL}"/><rect x="${x + 4}" y="120" width="6" height="45" fill="#546E7A"/>`
      + plancha(x + 6, x + 104, 112) + `<g class="amq_cut" style="--dy:6px"><rect x="${x + 92}" y="84" width="8" height="22" fill="#CFD8DC" stroke="${OL}"/></g><rect x="${x + 76}" y="99" width="13" height="9" fill="#FFC20E" stroke="${OL}" stroke-width=".7"/>`
      + [0, 1, 2].map(i => `<g class="amq_cae" style="animation-delay:-${(i * .5).toFixed(1)}s"><rect x="${x + 104}" y="108" width="14" height="3" fill="#B0BEC5" stroke="${OL}" stroke-width=".6"/></g>`).join('')
      + `<rect x="${x + 110}" y="138" width="72" height="27" fill="#8D6E63" stroke="${OL}"/>` + plancha(x + 116, x + 140, 138) + plancha(x + 146, x + 172, 136)
      + P(22, 165, { pose: 'amq_op', gloves: '#B0BEC5' }) + P(252, 165, { pose: 'bend', flip: true, face: 'worried' })
      + (q ? qmark(290, 40) : H.no(258, 72, 13) + lead(150, 4, 'Zona de caída de recortes', 196, 160, '#D7262B') + pl(70, 40, 'Operador al frente', '#2E7D32', 9)); };
  S[GP + 'recortes'] = () => V2(recSc(false));
  S[GP + 'q_recortes'] = () => V2(recSc(true));
  // plegadora en acercamiento: punto de atrapamiento y la plancha que sube
  const plegSc = q => zbg() + `<rect x="125" y="125" width="70" height="40" fill="#78909C" stroke="${OL}" stroke-width="1.2"/><path d="M146,125 L160,140 L174,125" fill="#546E7A" stroke="${OL}"/>`
    + `<rect x="128" y="0" width="64" height="58" fill="#5D7486" stroke="${OL}" stroke-width="1.2"/>`
    + `<g class="amq_cut" style="--dy:6px"><path d="M138,58 h44 L160,112 z" fill="#90A4AE" stroke="${OL}" stroke-width="1.2"/></g>`
    + `<g class="amq_pg" style="transform-origin:160px 122px"><rect x="20" y="119" width="140" height="6" fill="#B0BEC5" stroke="${OL}"/>${q ? mano(118, 116, .75, { ang: 0, c: '#B0BEC5' }) : mano(48, 131, .75, { ang: -10, c: '#B0BEC5' })}</g>`
    + `<g class="amq_pgR" style="transform-origin:160px 122px"><rect x="160" y="119" width="140" height="6" fill="#B0BEC5" stroke="${OL}"/></g>`
    + (q ? qmark(285, 160) : `<rect x="132" y="98" width="56" height="30" fill="none" stroke="#D32F2F" stroke-width="2" stroke-dasharray="5 3"/>`
      + lead(60, 4, 'Punto de atrapamiento', 132, 104, '#D7262B') + pl(258, 4, 'La plancha sube al plegar', '#E65100', 10) + arrow(276, 104, 284, 64, '#E65100', 2.5)
      + pl(80, 176, 'Manos lejos del punzón', '#2E7D32', 10));
  S[GP + 'plegar'] = () => V2(plegSc(false));
  S[GP + 'q_plegar'] = () => V2(plegSc(true));
  // prensa con mando bimanual
  const prensaSc = q => H.fondo.taller() + prensaM(40, { baja: !q, guard: !q }) + bimanual(150, 104)
    + (q ? P(118, 165, { pose: 'amq_reach', flip: true }) + qmark(260, 45)
      : P(178, 165, { pose: 'amq_op', flip: true }) + lead(250, 8, 'Mando bimanual', 150, 104, '#2E7D32') + lead(250, 36, 'Resguardo de la matriz', 98, 82, '#1565C0')
        + pl(250, 64, 'Manos fuera de la matriz', '#D7262B', 10));
  S[GP + 'prensa'] = () => V2(prensaSc(false));
  S[GP + 'q_prensa'] = () => V2(prensaSc(true));
  const bloqSc = q => H.fondo.taller() + H.guillotina(14, 165) + plancha(6, 140, 115) + H.tablero(196, 66, true) + P(262, 165, { pose: q ? 'stand' : 'point', flip: true })
    + (q ? qmark(290, 40) : pl(80, 6, 'Cambio de cuchilla o matriz', '#1565C0', 10) + pl(80, 30, 'Ajuste y limpieza', '#1565C0', 10) + pl(218, 40, 'Candado y tarjeta', '#2E7D32', 10));
  S[GP + 'bloqueo'] = () => V2(bloqSc(false));
  S[GP + 'q_bloqueo'] = () => V2(bloqSc(true));

  SI_CONT.temas.push({
    id: 'mq_guillotina_plegadora', sec: 'maquinas', emp: ['ali'], title: 'Guillotina, plegadora y prensa', thumb: GP + 'intro', mins: 15,
    learn: [
      { s: GP + 'intro', t: 'Máquinas que cortan y doblan acero', x: 'La <b>guillotina</b> corta planchas, la <b>plegadora</b> las dobla y la <b>prensa</b> estampa o perfora. Las tres bajan con una fuerza de muchas toneladas que <b>no se detiene ante una mano</b>.<ul><li><b>Amputación</b> de dedos o manos bajo la cuchilla, el punzón o el martillo.</li><li><b>Cortes</b> con los bordes de las planchas.</li><li><b>Atrapamiento y golpes</b> con la plancha que se mueve al plegar.</li></ul>Solo las opera quien está <b>capacitado y autorizado</b> por su jefatura.' },
      { s: GP + 'prot', t: 'Las protecciones siempre puestas', x: 'Antes de partir, revisa que estén en su lugar y funcionando:<ul><li>La <b>protección de dedos</b> frente a la cuchilla.</li><li>La <b>barrera de luz</b> o los sensores, si la máquina los tiene.</li><li>El <b>pedal con su cubierta</b>, para que no se active por un golpe o una pieza que cae.</li><li>La <b>parada de emergencia</b>.</li></ul>Si una protección falta, está suelta o no funciona, <b>no uses la máquina</b> y avisa a tu jefatura.', k: 'Nunca retires, puentees ni anules una protección o un sensor.' },
      { s: GP + 'mandos', t: 'Mando bimanual y pedal', x: 'El <b>mando bimanual</b> obliga a tener <b>las dos manos en los botones</b> para que la máquina baje: así ninguna mano queda bajo la cuchilla o el martillo.<ul><li>Nunca amarres, calces ni tapes uno de los botones.</li><li>No apoyes el pie en el pedal mientras acomodas la plancha: <b>el pie va al pedal solo cuando las manos están afuera</b>.</li><li>Si el mando falla o la máquina baja sola, detenla y avisa.</li></ul>' },
      { s: GP + 'dos', t: 'Trabajo de a dos: una sola voz', x: 'Las planchas grandes se manejan entre dos o más personas. Ahí el peligro es que <b>uno accione la máquina mientras el otro tiene la mano adentro</b>.<ul><li><b>Una sola persona da la orden</b> y es la única que acciona el pedal o los mandos.</li><li>Antes de accionar, pregunta y <b>mira las manos de todos</b>.</li><li>Pónganse de acuerdo antes de empezar: quién guía, quién afirma y quién acciona.</li></ul>' },
      { s: GP + 'filo', t: 'Planchas con bordes filosos', x: 'El borde recién cortado y las <b>rebabas</b> cortan como un cuchillo.<ul><li>Para tomar, mover y retirar planchas usa <b>guantes anticorte</b>.</li><li>Tómalas por los bordes largos y con las dos manos.</li><li>Las planchas grandes se mueven entre dos o con el puente grúa y sus accesorios. Recuerda los límites de peso: <b>25 kg</b> hombres, <b>20 kg</b> mujeres y menores.</li><li>Apila las planchas ordenadas, sin puntas hacia el pasillo.</li></ul>' },
      { s: GP + 'recortes', t: 'Recortes: la zona de atrás', x: 'En la guillotina los <b>recortes caen por detrás</b> de la cuchilla.<ul><li><b>Nadie se pone detrás</b> de la guillotina mientras se corta.</li><li>La zona de caída se mantiene <b>demarcada y despejada</b>.</li><li>Los recortes se retiran <b>con la máquina detenida</b>, con guantes anticorte, nunca metiendo la mano bajo la cuchilla.</li></ul>' },
      { s: GP + 'plegar', t: 'Plegadora: atrapamiento y plancha que sube', x: '<ul><li>Entre el <b>punzón y la matriz</b> está el punto de atrapamiento: ninguna parte del cuerpo entra ahí.</li><li>Al plegar, <b>la plancha sube con fuerza</b> y puede golpearte la cara o el pecho. Acompáñala desde abajo, con las manos lejos del punzón, y no te pongas sobre ella.</li><li>Las piezas chicas que dejan los dedos cerca del punzón se pliegan con un <b>dispositivo de sujeción</b>, nunca con la mano.</li></ul>' },
      { s: GP + 'prensa', t: 'Prensa', x: 'La prensa baja en una fracción de segundo.<ul><li>Opera con el <b>mando bimanual</b> y con el <b>resguardo</b> de la matriz puesto.</li><li>Si una pieza queda mal puesta, <b>detén la prensa</b> y acomódala con una herramienta o una pinza, nunca con la mano bajo el martillo.</li><li>No pongas piezas encima de los mandos ni del pedal.</li></ul>' },
      { s: GP + 'bloqueo', t: 'Cambios, ajustes y limpieza: con bloqueo', x: 'Para <b>cambiar la cuchilla, el punzón o la matriz</b>, ajustar topes o limpiar bajo la máquina:<ul><li>Detén la máquina y corta la energía.</li><li>Pon tu <b>candado y tu tarjeta</b> de bloqueo.</li><li>Asegura las partes que pueden bajar por su peso.</li><li>Prueba que no parte antes de meter las manos.</li></ul>Si se accidenta un compañero, aprieta la parada de emergencia, pide ayuda y avisa; si es grave, ACHS <b>1404</b>.' }
    ],
    quiz: [
      { s: GP + 'q_prot', v: [
        { q: 'La protección de dedos de la guillotina está suelta. ¿Qué haces?', o: ['No la uso y aviso a mi jefatura', 'La saco para trabajar más cómodo', 'Corto igual, con mucho cuidado', 'La amarro con alambre y sigo'], w: 'Con una protección suelta o faltante la máquina no se usa. Se avisa a la jefatura para que la reparen.' },
        { q: 'La barrera de luz detiene la plegadora a cada rato. ¿Qué haces?', o: ['Aviso para que la revisen', 'Tapo un sensor con cinta adhesiva', 'Desconecto la barrera por un rato', 'Trabajo con la barrera desconectada'], w: 'Las protecciones y sensores nunca se anulan. Si fallan, se avisa para que los revisen.' },
        { q: 'Si la protección de la guillotina molesta para cortar piezas chicas, se puede retirar por un momento.', vf: false, w: 'Falso. Nunca se retira, puentea ni anula una protección.' }] },
      { s: GP + 'q_mandos', v: [
        { q: '¿Para qué sirve el mando bimanual?', o: ['Para que ninguna mano quede bajo la máquina', 'Para que la máquina baje más rápido y con más fuerza', 'Para que dos personas operen a la vez', 'Para ahorrar energía en la máquina'], w: 'Obliga a tener las dos manos en los botones: ninguna puede quedar bajo la cuchilla o el martillo.' },
        { q: 'Un compañero calzó uno de los botones del mando bimanual para operar con una sola mano. ¿Qué haces?', o: ['Le pido que lo saque y aviso', 'Hago lo mismo para no atrasarme', 'Lo dejo, porque es más rápido', 'Calzo también el otro botón'], w: 'Calzar o amarrar un botón anula la protección y deja una mano libre bajo la máquina. Se saca y se avisa.' },
        { q: 'Mientras acomodas la plancha puedes dejar el pie apoyado en el pedal para ganar tiempo.', vf: false, w: 'Falso. El pie va al pedal solo cuando las manos están fuera de la zona de corte o plegado.' }] },
      { s: GP + 'q_dos', v: [
        { q: 'Están plegando una plancha grande entre dos. ¿Quién acciona el pedal?', o: ['Una sola persona, la que da la orden', 'Cualquiera de los dos, el más cerca', 'Los dos a la vez, para que sea parejo', 'El que termina primero de acomodar'], w: 'Una sola persona da la orden y acciona la máquina, después de mirar que todos tengan las manos afuera.' },
        { q: 'Vas a accionar la plegadora y tu compañero sigue acomodando la plancha. ¿Qué haces?', o: ['Espero, pregunto y miro sus manos', 'Acciono, él sabe que voy a plegar', 'Le grito y acciono al mismo tiempo', 'Acciono lento para darle tiempo'], w: 'Antes de accionar se pregunta y se miran las manos de todos. Recién entonces se acciona.' },
        { q: 'En el trabajo de a dos, cualquiera puede accionar la máquina cuando crea que está listo.', vf: false, w: 'Falso. Una sola persona da la orden y acciona; así nadie queda con la mano adentro.' }] },
      { s: GP + 'q_filo', v: [
        { q: '¿Qué guantes usas para retirar planchas recién cortadas?', o: ['Guantes anticorte', 'Guantes de nitrilo', 'Guantes de lana', 'Ninguno, para sentir el borde'], w: 'El borde y las rebabas cortan como cuchillo: se usan guantes anticorte.' },
        { q: 'Tienes que mover una plancha que pesa más de 25 kg. ¿Qué haces?', o: ['La muevo entre dos o con el puente grúa', 'La arrastro sola por el piso', 'La levanto rápido doblando la espalda, sin ayuda', 'La tomo de una punta y la giro'], w: 'Sobre los límites de peso se pide ayuda o se usa el puente grúa con sus accesorios.' },
        { q: '¿Por qué las planchas recién cortadas son peligrosas?', o: ['Sus bordes y rebabas cortan', 'Porque se oxidan muy rápido', 'Porque pesan menos que antes', 'Porque cambian de color al cortar'], w: 'Los bordes y rebabas del corte provocan cortes profundos en manos y brazos.' }] },
      { s: GP + 'q_recortes', v: [
        { q: 'Un recorte quedó detrás de la guillotina y la máquina está funcionando. ¿Qué haces?', o: ['Espero que pare y lo saco con guantes', 'Me agacho detrás y lo saco rápido', 'Le pido al operador que siga cortando mientras lo saco', 'Lo empujo con el pie mientras corta'], w: 'Nadie se pone detrás mientras se corta. Los recortes se retiran con la máquina detenida y guantes anticorte.' },
        { q: '¿Por qué nadie debe estar detrás de la guillotina mientras corta?', o: ['Porque ahí caen los recortes filosos', 'Porque ahí está el tablero eléctrico', 'Porque ahí se junta el aceite', 'Porque ahí hace más calor'], w: 'Los recortes caen por detrás de la cuchilla y pueden golpear y cortar.' },
        { q: 'La zona de caída de recortes debe estar demarcada y despejada.', vf: true, w: 'Verdadero. Así nadie entra mientras se corta.' }] },
      { s: GP + 'q_plegar', v: [
        { q: 'Vas a plegar una plancha. ¿Dónde pones las manos?', o: ['Abajo y lejos del punzón', 'Sobre la plancha, junto al punzón', 'Entre el punzón y la matriz', 'Encima de la matriz, para guiar'], w: 'Las manos acompañan la plancha desde abajo y lejos del punzón: entre el punzón y la matriz se atrapan.' },
        { q: '¿Qué pasa con la plancha en el momento de plegar?', o: ['Sube con fuerza y te puede golpear', 'Se queda quieta sobre la matriz', 'Se enfría de golpe y se pone más blanda', 'Se corta en dos partes iguales'], w: 'Al plegar, las alas de la plancha suben con fuerza: no te pongas sobre ella.' },
        { q: 'Tienes que plegar una pieza tan chica que tus dedos quedan junto al punzón. ¿Qué haces?', o: ['Uso un dispositivo de sujeción', 'La afirmo con la punta de los dedos', 'Pliego más lento con la mano', 'Le pido a otro que la afirme'], w: 'Si los dedos quedan cerca del punzón, la pieza se sujeta con un dispositivo, nunca con la mano.' }] },
      { s: GP + 'q_prensa', v: [
        { q: 'Una pieza quedó mal puesta en la matriz de la prensa. ¿Qué haces?', o: ['Detengo y la acomodo con pinza', 'Meto la mano rápido entre golpes', 'La empujo con los dedos justo cuando baja', 'Dejo que la prensa la acomode'], w: 'Se detiene la prensa y la pieza se acomoda con una herramienta, nunca con la mano bajo el martillo.' },
        { q: 'Tienes que cambiar la cuchilla de la guillotina. ¿Qué haces antes?', o: ['La bloqueo con candado y tarjeta', 'La dejo encendida, sin pisar el pedal', 'Aviso por la radio y empiezo', 'Solo apago con el botón de parada'], w: 'Para cambiar cuchillas, matrices o limpiar, la máquina se bloquea con candado y tarjeta y se prueba que no parte.' },
        { q: 'Para cambiar la matriz de la prensa basta con apagarla con el botón.', vf: false, w: 'Falso. Se corta la energía, se pone candado y tarjeta, se aseguran las partes que pueden bajar y se prueba que no parte.' }] }
    ]
  });

  // ======================================================================
  // 5. MESA DE CORTE CNC (PLASMA U OXICORTE)
  // ======================================================================
  // mesa 14-238: listones y 117-124, borde y 124-131, batea y 130-152; pórtico rojo en gx con antorcha en (gx, 115)
  const MC = 'al_mq_mesa_corte_';
  const mesaC = (o = {}) => { const gx = o.gx || 120;
    let g = `<rect x="16" y="130" width="220" height="22" fill="#546E7A" stroke="${OL}"/>` + [22, 122, 222].map(x => `<rect x="${x}" y="152" width="8" height="13" fill="#455A64"/>`).join('')
      + [...Array(27)].map((_, i) => `<rect x="${20 + i * 8}" y="116" width="2" height="8" fill="#90A4AE"/>`).join('') + `<rect x="14" y="124" width="224" height="7" fill="#78909C" stroke="${OL}"/>`
      + (o.chapa !== false ? `<rect x="28" y="113" width="196" height="3" fill="#B0BEC5" stroke="${OL}" stroke-width=".6"/>` : '') + (o.extra || '');
    let p = `<rect x="${gx - 19}" y="76" width="6" height="49" fill="#E8423A" stroke="${OL}" stroke-width=".8"/><rect x="${gx - 25}" y="66" width="50" height="14" rx="2" fill="#E8423A" stroke="${OL}"/>` + T(gx, 77, 'CNC', 7, '#fff')
      + `<rect x="${gx - 5}" y="80" width="10" height="20" fill="#455A64" stroke="${OL}"/><rect x="${gx - 2.5}" y="100" width="5" height="10" fill="#B0BEC5" stroke="${OL}" stroke-width=".7"/><path d="M${gx - 2.5},110 h5 l-1.2,3 h-2.6z" fill="#FFB300"/>`;
    if (o.corta) p += H.arco(gx, 115) + H.chispas(gx, 118, 6, 1) + H.chispas(gx, 118, 6, -1);
    g += o.mueve ? `<g class="amq_mv" style="--dx:${o.mueve}px">${p}</g>` : p;
    return g; };
  const consola = x => `<rect x="${x + 8}" y="112" width="8" height="53" fill="#546E7A"/><rect x="${x}" y="162" width="24" height="3" fill="#455A64"/><rect x="${x - 6}" y="86" width="36" height="28" rx="3" fill="#ECEFF1" stroke="${OL}"/><rect x="${x - 2}" y="90" width="22" height="15" fill="#263238"/><path d="M${x},101 l5,-4 l5,3 l6,-6" stroke="#7CFC00" stroke-width="1.2" fill="none"/>` + hongo(x + 25, 80, 5);
  const zonaMC = () => `<rect x="6" y="168" width="244" height="5" fill="#FFC20E"/>` + [...Array(21)].map((_, i) => `<path d="M${10 + i * 12},168 l-4,5 h5 l4,-5z" fill="#263238"/>`).join('');
  const ducto = () => `<path d="M16,141 H6 V0" stroke="#90A4AE" stroke-width="10" fill="none"/><path d="M16,141 H6 V0" stroke="#B0BEC5" stroke-width="6" fill="none"/>`;
  const operMC = (o = {}) => P(305, 165, Object.assign({ pose: 'amq_op', flip: true }, o)) + (o.filtro !== false ? lentesOsc(305, 165, Object.assign({ pose: 'amq_op', flip: true }, o)) : '');
  S[MC + 'intro'] = () => V2(H.fondo.taller() + zonaMC() + mesaC({ corta: true, gx: 130 }) + H.humo(132, 110) + consola(258) + operMC()
    + pl(60, 6, 'Radiación del arco', '#7B1FA2', 10) + pl(60, 30, 'Humos y gases', '#E65100', 10) + pl(222, 6, 'Piezas calientes', '#D7262B', 10) + pl(222, 30, 'Partes en movimiento', '#D7262B', 10));
  const autSc = q => H.fondo.taller() + zonaMC() + mesaC({ corta: true, gx: 90 }) + consola(258) + operMC() + P(200, 165, { pose: 'walk' })
    + (q ? qmark(200, 40) : H.no(200, 58, 13) + H.si(305, 58, 13) + pl(110, 6, 'Zona demarcada: solo el operador', '#1565C0', 10) + pl(110, 176, 'No entres mientras corta', '#D7262B', 9));
  S[MC + 'zona'] = () => V2(autSc(false));
  S[MC + 'q_zona'] = () => V2(autSc(true));
  const revSc = q => H.fondo.taller() + ducto() + zonaMC() + mesaC({ gx: 200 }) + consola(258) + operMC({ filtro: false, pose: q ? 'amq_op' : 'point' })
    + (q ? qmark(120, 45) : lead(76, 4, 'Extracción funcionando', 6, 40, '#2E7D32') + lead(110, 32, 'Plancha bien apoyada', 110, 113, '#1565C0')
      + lead(252, 4, 'Parada de emergencia', 283, 76, '#D7262B') + lead(120, 176, 'Mesa sin herramientas ni restos', 60, 120, '#1565C0'));
  S[MC + 'revisa'] = () => V2(revSc(false));
  S[MC + 'q_revisa'] = () => V2(revSc(true));
  const radSc = q => H.fondo.taller() + zonaMC() + mesaC({ corta: true, gx: 110 }) + consola(258) + operMC() + P(178, 165, { flip: true, face: q ? 'ok' : 'worried' })
    + (q ? qmark(200, 40) : H.no(178, 60, 13) + H.si(305, 60, 13) + lead(240, 4, 'Lentes con filtro', 299, 92, '#2E7D32') + pl(80, 6, 'No mires el arco sin filtro', '#D7262B', 10));
  S[MC + 'radiacion'] = () => V2(radSc(false));
  S[MC + 'q_radiacion'] = () => V2(radSc(true));
  S[MC + 'humos'] = () => V2(H.fondo.taller() + ducto() + zonaMC() + mesaC({ corta: true, gx: 140 }) + `<g opacity=".55">${H.humo(144, 112)}</g>` + consola(258) + operMC()
    + arrow(80, 98, 80, 140, '#2E7D32', 3) + arrow(190, 98, 190, 140, '#2E7D32', 3) + arrow(6, 120, 6, 70, '#2E7D32', 3)
    + lead(110, 4, 'Extracción encendida', 6, 50, '#2E7D32') + pl(110, 176, 'Humos metálicos y gases: no los respires', '#E65100', 9));
  const portSc = q => H.fondo.taller() + zonaMC() + mesaC({ corta: true, gx: 60, mueve: 80 }) + P(250, 165, { pose: 'amq_reach', flip: true, face: 'worried' })
    + (q ? qmark(290, 40) : H.no(290, 44, 13) + pl(110, 6, 'El pórtico se mueve solo', '#D7262B', 10) + pl(110, 30, 'Nada de manos sobre la mesa', '#D7262B', 10));
  S[MC + 'portico'] = () => V2(portSc(false));
  S[MC + 'q_portico'] = () => V2(portSc(true));
  const tenaza = (x1, y1, x2, y2) => `<path d="M${x1},${y1} L${x2},${y2 - 2} M${x1},${y1 + 2} L${x2},${y2 + 2}" stroke="#37474F" stroke-width="2.4" stroke-linecap="round"/><circle cx="${f1((x1 + x2) / 2)}" cy="${f1((y1 + y2) / 2)}" r="1.8" fill="#263238"/>`;
  const piezaSc = q => H.fondo.taller() + zonaMC() + mesaC({ gx: 50, chapa: false, extra: `<rect x="40" y="113" width="60" height="3" fill="#B0BEC5" stroke="${OL}" stroke-width=".6"/><rect x="150" y="113" width="40" height="3" fill="#B0BEC5" stroke="${OL}" stroke-width=".6"/>` })
    + (q ? P(232, 165, { pose: 'amq_reach', flip: true }) + `<rect x="196" y="110" width="22" height="4" fill="#B0BEC5" stroke="${OL}" stroke-width=".6"/>` + qmark(290, 40)
      : `<rect x="196" y="110" width="22" height="4" fill="#B0BEC5" stroke="${OL}" stroke-width=".6"/>` + calor(198, 108) + P(260, 165, { pose: 'amq_hold', flip: true, gloves: '#C8A27A' }) + tenaza(232, 106, 214, 112)
        + lead(110, 6, 'Tenazas y guantes de descarne', 222, 108, '#2E7D32') + pl(110, 32, 'Parece fría, pero quema', '#D7262B', 10));
  S[MC + 'piezas'] = () => V2(piezaSc(false));
  S[MC + 'q_piezas'] = () => V2(piezaSc(true));
  const escoria = () => [30, 52, 78, 104, 130, 160, 186, 210].map((x, i) => `<path d="M${x},152 q4,-${5 + i % 3 * 2} 9,0 z" fill="#3E2723"/>`).join('');
  const escSc = q => H.fondo.taller() + mesaC({ gx: 50, chapa: false, extra: escoria() }) + H.tablero(262, 36, !q) + P(246, 165, { pose: 'bend', flip: true, gloves: '#C8A27A' })
    + `<path d="M213,147 L176,149" stroke="#8D6E63" stroke-width="2.4"/><path d="M176,143 v10" stroke="#455A64" stroke-width="3"/>` + H.extintor(292, 165, 'PQS', .75)
    + (q ? qmark(110, 40) : pl(110, 6, 'Limpieza con la mesa bloqueada', '#2E7D32', 10) + pl(110, 30, 'Escoria caliente: riesgo de incendio', '#E65100', 10));
  S[MC + 'escoria'] = () => V2(escSc(false));
  S[MC + 'q_escoria'] = () => V2(escSc(true));

  SI_CONT.temas.push({
    id: 'mq_mesa_corte', sec: 'maquinas', emp: ['ali'], title: 'Mesa de corte CNC (plasma y oxicorte)', thumb: MC + 'intro', mins: 15,
    learn: [
      { s: MC + 'intro', t: 'La mesa de corte', x: 'En la mesa de corte un <b>pórtico</b> mueve solo la antorcha de plasma o de oxicorte siguiendo un programa. Que sea automática no la hace inofensiva:<ul><li><b>Radiación</b> del arco o de la llama, que daña los ojos y la piel.</li><li><b>Humos metálicos y gases</b> del corte.</li><li><b>Partes en movimiento</b>: el pórtico golpea y atrapa.</li><li><b>Piezas calientes</b>, chispas y escoria que pueden iniciar un incendio.</li></ul>' },
      { s: MC + 'zona', t: 'Solo el operador autorizado', x: '<ul><li>La mesa la opera solo quien está <b>capacitado y autorizado</b> por su jefatura. Nadie más carga programas ni la pone en marcha.</li><li>La zona de la mesa está <b>demarcada</b>: mientras corta, nadie entra a ella.</li><li>Si alguien necesita pasar o retirar algo, se le avisa al operador y <b>se espera que la mesa se detenga</b>.</li></ul>', k: 'Mientras la mesa corta, nadie entra a la zona demarcada.' },
      { s: MC + 'revisa', t: 'Antes de cortar, revisa', x: '<ul><li>La <b>extracción de humos</b> está encendida y funcionando.</li><li>La <b>parada de emergencia</b> funciona y la tienes a mano.</li><li>La plancha está <b>bien apoyada y plana</b>: una plancha levantada choca con la antorcha.</li><li>Sobre la mesa no hay herramientas, restos ni paños.</li><li>Mangueras, cables y, si es oxicorte, los cilindros, en buen estado.</li></ul>Si algo falla, <b>no cortes</b> y avisa a tu jefatura.' },
      { s: MC + 'radiacion', t: 'Radiación: protege tus ojos', x: 'El arco de plasma y la llama emiten <b>luz intensa y radiación ultravioleta</b>: mirarlos sin filtro produce quemaduras en los ojos (dolor, ardor y sensación de arena) horas después.<ul><li>El operador usa <b>lentes con el filtro indicado</b> para el corte, o careta con filtro.</li><li>Los demás <b>no miran el arco</b> ni se acercan a curiosear.</li><li>Usa ropa de trabajo que cubra los brazos.</li></ul>' },
      { s: MC + 'humos', t: 'Humos: con la extracción encendida', x: 'Al cortar acero se forman <b>humos metálicos y gases</b> que dañan los pulmones.<ul><li>Corta solo con la <b>extracción encendida</b>. Si no funciona, no cortes y avisa.</li><li>No te pongas sobre la columna de humo.</li><li>Usa el <b>respirador</b> que indique tu jefatura cuando corresponda.</li><li>Si cortas planchas pintadas, galvanizadas o con aceite, los humos son más tóxicos: consúltalo antes.</li></ul>' },
      { s: MC + 'portico', t: 'No te acerques al pórtico en movimiento', x: 'El pórtico <b>se mueve solo</b> y no ve si hay una persona: puede golpearte o atraparte la mano contra la mesa.<ul><li>Nunca te apoyes en la mesa ni metas las manos mientras corta.</li><li>No camines por el borde de la mesa en marcha.</li><li>Para retirar piezas, acomodar la plancha o cambiar consumibles, <b>detén la mesa</b>.</li><li>Si alguien corre peligro, aprieta la <b>parada de emergencia</b> de inmediato.</li></ul>' },
      { s: MC + 'piezas', t: 'Piezas calientes', x: 'Una pieza recién cortada <b>se ve igual que una fría</b>, pero puede estar a cientos de grados.<ul><li>Retira las piezas con <b>tenazas</b> y <b>guantes de descarne</b>.</li><li>Déjalas enfriar en un lugar señalizado, lejos de materiales que se quemen.</li><li>Cuidado con los bordes filosos y las rebabas: también cortan.</li></ul>' },
      { s: MC + 'escoria', t: 'Escoria, limpieza e incendio', x: '<ul><li>Bajo la mesa se junta <b>escoria</b>, que puede seguir caliente mucho rato.</li><li>La limpieza de la batea y el cambio de listones se hacen con la mesa <b>bloqueada con candado y tarjeta</b>.</li><li>Nada que se queme cerca de la mesa: cartones, paños, aceite.</li><li>Ten un <b>extintor</b> cerca y revisa la zona al terminar el turno.</li></ul>' }
    ],
    quiz: [
      { s: MC + 'q_zona', v: [
        { q: 'La mesa está cortando y necesitas sacar una pieza de la zona. ¿Qué haces?', o: ['Aviso al operador y espero que se detenga', 'Entro rápido mientras el pórtico está lejos', 'La saco por el otro lado de la mesa', 'Paso agachado bajo el pórtico'], w: 'Mientras la mesa corta nadie entra a la zona demarcada: se avisa al operador y se espera que se detenga.' },
        { q: '¿Quién puede cargar un programa y poner en marcha la mesa de corte?', o: ['El operador capacitado y autorizado', 'Cualquiera que sepa usar bien un computador', 'El que tenga más trabajo pendiente', 'Cualquier soldador del taller'], w: 'Solo la opera quien está capacitado y autorizado por su jefatura.' },
        { q: 'Mientras la mesa corta, cualquier trabajador puede entrar a la zona demarcada si tiene cuidado.', vf: false, w: 'Falso. Mientras la mesa corta, nadie más entra a la zona demarcada.' }] },
      { s: MC + 'q_revisa', v: [
        { q: 'Vas a cortar y la extracción de humos no enciende. ¿Qué haces?', o: ['No corto y aviso a mi jefatura', 'Corto rápido para terminar luego', 'Abro una puerta y corto igual', 'Corto, pero respiro por la boca'], w: 'Sin extracción funcionando no se corta. Se avisa para que la reparen.' },
        { q: 'La plancha quedó levantada en una esquina sobre la mesa. ¿Qué haces?', o: ['La apoyo plana antes de cortar', 'Corto igual, la antorcha la aplasta', 'Corto solo la parte que está plana', 'Pongo mi mano encima mientras corta'], w: 'Una plancha levantada choca con la antorcha. Se deja plana y bien apoyada antes de partir.' },
        { q: '¿Qué revisas antes de poner en marcha la mesa de corte?', o: ['Extracción, parada y mesa despejada', 'Solo que el programa esté cargado', 'Solo que haya gas en los cilindros', 'Que la radio del taller esté encendida y sintonizada'], w: 'Antes de cortar: extracción funcionando, parada de emergencia, plancha bien apoyada y mesa despejada.' }] },
      { s: MC + 'q_radiacion', v: [
        { q: 'Un compañero se acerca a mirar cómo corta el plasma. ¿Qué le dices?', o: ['Que no mire el arco sin filtro', 'Que mire, pero solo un momento', 'Que se ponga lentes de sol', 'Que entrecierre los ojos para mirar'], w: 'El arco quema los ojos aunque sea un momento. Sin el filtro indicado, no se mira.' },
        { q: '¿Qué protección de ojos usa el operador de la mesa de corte?', o: ['Lentes o careta con filtro', 'Lentes de seguridad transparentes', 'Ninguna, porque está lejos', 'Lentes de sol comunes'], w: 'El operador usa lentes o careta con el filtro indicado para el corte.' },
        { q: 'Mirar el arco del plasma sin filtro puede quemar los ojos aunque no duela en el momento.', vf: true, w: 'Verdadero. El dolor, el ardor y la sensación de arena aparecen horas después.' }] },
      { s: MC + 'q_portico', v: [
        { q: 'La mesa está cortando y ves una pieza mal ubicada. ¿Qué haces?', o: ['Detengo la mesa antes de acomodarla', 'La acomodo con la mano sin detener', 'La empujo con un fierro mientras corta', 'Espero que el pórtico la empuje'], w: 'El pórtico se mueve solo y puede atrapar. Para acomodar piezas, se detiene la mesa.' },
        { q: '¿Por qué no debes apoyarte en la mesa mientras corta?', o: ['El pórtico te puede golpear', 'Porque la mesa se raya', 'Porque el programa se borra y hay que cargarlo otra vez', 'Porque se ensucia la ropa'], w: 'El pórtico se mueve solo y no ve a las personas.' },
        { q: 'Si alguien corre peligro cerca del pórtico, lo primero es apretar la parada de emergencia.', vf: true, w: 'Verdadero. La parada de emergencia detiene la mesa de inmediato.' }] },
      { s: MC + 'q_piezas', v: [
        { q: 'La mesa terminó de cortar y las piezas se ven frías. ¿Cómo las retiras?', o: ['Con tenazas y guantes de descarne', 'Con la mano, si ya no se ven rojas por encima', 'Con guantes de nitrilo', 'Tocándolas primero con un dedo'], w: 'El acero caliente se ve igual que el frío. Se retira con tenazas y guantes de descarne.' },
        { q: '¿Dónde dejas las piezas recién cortadas?', o: ['En un lugar señalizado y despejado', 'Sobre unos cartones en el pasillo', 'Junto a los paños con aceite', 'En el mismo lugar donde come y descansa el personal'], w: 'Se dejan enfriar en un lugar señalizado, lejos de materiales combustibles.' },
        { q: 'Si una pieza de acero recién cortada no está roja, ya está fría y se puede tomar con la mano.', vf: false, w: 'Falso. Puede estar a cientos de grados sin cambiar de color.' }] },
      { s: MC + 'q_escoria', v: [
        { q: 'Tienes que limpiar la escoria bajo la mesa. ¿Qué haces primero?', o: ['Bloqueo la mesa con candado y tarjeta', 'La limpio mientras la mesa corta otra pieza', 'Solo pauso el programa y limpio', 'Apago la luz del taller y limpio'], w: 'La limpieza de la batea se hace con la mesa bloqueada con candado y tarjeta.' },
        { q: '¿Por qué no se dejan cartones ni paños cerca de la mesa de corte?', o: ['Las chispas y la escoria los encienden', 'Porque tapan la pantalla de la consola del operador', 'Porque ensucian la plancha', 'Porque hacen que la mesa vibre'], w: 'Las chispas y la escoria caliente pueden iniciar un incendio.' },
        { q: 'La escoria bajo la mesa puede seguir caliente mucho rato después de cortar.', vf: true, w: 'Verdadero. Por eso se limpia con guantes, la mesa bloqueada y nada que se queme cerca.' }] }
    ]
  });

  // ======================================================================
  // 6. GRANALLADO
  // ======================================================================
  const GR = 'al_gr_granallado_';
  // granallador con capucha de aire respirable (pose propia amq_blast: manos en (x+22, 119) y (x+29, 121))
  const PG = (x, o = {}) => { const oo = Object.assign({ area: 'granallado', pose: 'amq_blast', gloves: '#8D6E63', shirt: '#6D7B83', pants: '#5D6B73' }, o);
    return W(x, 165, oo) + (oo.capucha !== false ? capucha(x, 165, oo) : ''); };
  // boquilla en la mano (pose amq_blast); f = 1 apunta a la derecha; on = sale granalla
  const boquilla = (x, f = 1, on = true, len = 30) => { const hx = x + 29 * f, hy = 121;
    let g = `<path d="M${hx - 6 * f},${hy + 2} q${-16 * f},26 ${-44 * f},42" stroke="#212121" stroke-width="4" fill="none"/>`
      + `<line x1="${hx - 6 * f}" y1="${hy}" x2="${hx + 14 * f}" y2="${hy}" stroke="#263238" stroke-width="4.6" stroke-linecap="round"/><line x1="${hx + 12 * f}" y1="${hy}" x2="${hx + 19 * f}" y2="${hy}" stroke="#90A4AE" stroke-width="3.4"/>`
      + `<rect x="${f > 0 ? hx - 4 : hx - 6}" y="${hy - 6}" width="10" height="3" fill="#E8423A"/>`;
    if (on) { const x0 = hx + 19 * f, x1 = x0 + len * f;
      g += `<path d="M${x0},${hy - 1.5} L${x1},${hy - 9} L${x1},${hy + 9} L${x0},${hy + 1.5} z" fill="#A1887F" opacity=".35"/>`
        + [-5, 0, 5].map(d => `<line x1="${x0}" y1="${hy}" x2="${x1}" y2="${hy + d}" stroke="#5D4037" stroke-width="1.6" stroke-dasharray="2 3" class="amq_ds"/>`).join(''); }
    return g; };
  const olla = (x, s = .75) => big(x, 165, s, `<rect x="4" y="-20" width="4" height="20" fill="#455A64"/><rect x="30" y="-20" width="4" height="20" fill="#455A64"/>`
    + `<path d="M0,-80 q0,-12 19,-12 q19,0 19,12 v50 l-14,12 h-10 l-14,-12 z" fill="#E8423A" stroke="${OL}" stroke-width="1.2"/><rect x="14" y="-18" width="10" height="8" fill="#455A64" stroke="${OL}"/>`
    + `<circle cx="30" cy="-84" r="5.5" fill="#fff" stroke="${OL}"/><path d="M30,-84 l2.5,-3" stroke="#D32F2F" stroke-width="1.2"/><rect x="12" y="-98" width="14" height="6" fill="#455A64"/>` + T(19, -50, 'ALI', 8, '#fff'));
  const panelAire = (x, y) => `<rect x="${x}" y="${y}" width="30" height="42" rx="2" fill="#ECEFF1" stroke="${OL}"/><rect x="${x + 5}" y="${y + 12}" width="9" height="24" rx="3" fill="#1565C0" stroke="${OL}" stroke-width=".8"/><circle cx="${x + 22}" cy="${y + 10}" r="5" fill="#fff" stroke="${OL}"/><path d="M${x + 22},${y + 10} l2,-3" stroke="#2E7D32" stroke-width="1.2"/><rect x="${x + 18}" y="${y + 22}" width="8" height="14" fill="#90A4AE" stroke="${OL}" stroke-width=".7"/>` + T(x + 15, y + 6, 'AIRE', 5, '#1565C0');
  const vigaG = (x1, x2) => H.viga(x1, 122, x2 - x1, 16) + caballete(x1 + 14, 122) + caballete(x2 - 14, 122);
  const polvo = (x, y) => [0, 1, 2, 3].map(i => `<g class="amq_hu" style="animation-delay:-${(i * .6).toFixed(1)}s"><ellipse cx="${x + (i % 2) * 8}" cy="${y - i * 3}" rx="${7 + i}" ry="${4 + i}" fill="#BCAAA4" opacity=".55"/></g>`).join('');
  const mangueraPiso = (x1, x2) => `<path d="M${x1},158 q10,6 30,6 H${x2}" stroke="#212121" stroke-width="4" fill="none"/>`;
  S[GR + 'intro'] = () => V2(H.fondo.cabina('granallado') + panelAire(14, 44) + olla(30) + mangueraPiso(49, 108) + vigaG(212, 304) + PG(150, { hose: [44, 76] }) + boquilla(150, 1, true, 26) + polvo(214, 112) + ondas(176, 98, 2, '#E53935', -1)
    + pl(250, 6, 'Abrasivo a alta presión', '#D7262B', 10) + pl(250, 30, 'Polvo', '#6D4C41', 10) + pl(250, 54, 'Ruido muy alto', '#E65100', 10));
  const eppGSc = q => H.fondo.cabina('granallado') + panelAire(14, 44) + PG(150, { pose: 'stand', hose: [44, 76] })
    + (q ? qmark(270, 45) : lead(258, 4, 'Capucha con aire respirable', 156, 80, '#2E7D32') + lead(258, 30, 'Protector auditivo bajo la capucha', 146, 92, '#1565C0')
      + lead(258, 56, 'Traje de protección', 154, 118, '#1565C0') + lead(258, 82, 'Guantes largos', 161, 130, '#1565C0') + lead(258, 176, 'Zapatos de seguridad', 157, 163, '#1565C0'));
  S[GR + 'epp'] = () => V2(eppGSc(false));
  S[GR + 'q_epp'] = () => V2(eppGSc(true));
  S[GR + 'aire'] = () => V2(H.fondo.cabina('granallado') + big(-20, -50, 1.6, panelAire(20, 40)) + PG(170, { pose: 'stand', hose: [44, 96] })
    + `<path d="M28,0 V14" stroke="#90A4AE" stroke-width="6"/>` + lead(110, 176, 'Filtro y regulador de aire respirable', 36, 76, '#2E7D32') + pl(250, 6, 'Revisa que llegue aire', '#1565C0', 10) + pl(250, 30, 'antes de entrar', '#1565C0', 10));
  const apuntaSc = q => H.fondo.cabina('granallado') + vigaG(30, 110) + PG(150, { hose: [20, 40] }) + boquilla(150, 1, !q, 22) + P(250, 165, { flip: true, face: 'worried', pose: q ? 'walk' : 'stop' })
    + (q ? qmark(285, 40) : H.no(250, 60, 13) + pl(150, 6, 'Nunca apuntes a una persona', '#D7262B', 10) + pl(150, 30, 'Nadie entra sin EPP', '#D7262B', 10));
  S[GR + 'apuntar'] = () => V2(apuntaSc(false));
  S[GR + 'q_apuntar'] = () => V2(apuntaSc(true));
  // hombre muerto: palanca apretada (sale granalla) o suelta (se corta)
  const hmZ = (cx, cy, s, on) => big(cx, cy, s, `<path d="M-90,6 q-20,0 -30,36" stroke="#212121" stroke-width="12" fill="none"/><rect x="-92" y="-2" width="122" height="16" rx="3" fill="#37474F" stroke="${OL}"/><rect x="30" y="0" width="22" height="12" fill="#90A4AE" stroke="${OL}"/>`
    + `<g transform="rotate(${on ? 0 : -24} -70 -4)"><rect x="-70" y="-10" width="80" height="7" rx="2" fill="#E8423A" stroke="${OL}"/></g><circle cx="-70" cy="-5" r="3.4" fill="#263238"/>`
    + (on ? `<rect x="-56" y="-26" width="58" height="20" rx="9" fill="#8D6E63" stroke="${OL}"/>` + [0, 1, 2].map(i => `<path d="M${-42 + i * 14},-26 v20" stroke="${OL}" stroke-width="1" opacity=".5"/>`).join('')
        + `<path d="M52,4 L120,-12 L120,26 L52,8 z" fill="#A1887F" opacity=".4"/>` + [-8, 6, 20].map(d => `<line x1="52" y1="6" x2="120" y2="${d}" stroke="#5D4037" stroke-width="2.4" stroke-dasharray="3 4" class="amq_ds"/>`).join('')
      : `<rect x="-60" y="-66" width="58" height="20" rx="9" fill="#8D6E63" stroke="${OL}"/>` + arrow(-31, -44, -31, -64, '#2E7D32', 2.4)));
  const hmSc = q => zbg() + (q ? hmZ(150, 110, .85, true) + qmark(285, 40)
    : div() + hmZ(84, 112, .58, true) + hmZ(246, 112, .58, false) + pl(80, 6, 'Apretada: sale granalla', '#1565C0', 10) + pl(240, 6, 'Suelta: se corta sola', '#2E7D32', 10) + H.si(240, 160, 13)
      + pl(160, 178, 'Nunca la amarres ni la bloquees', '#D7262B', 10));
  S[GR + 'hombre'] = () => V2(hmSc(false));
  S[GR + 'q_hombre'] = () => V2(hmSc(true));
  // olla, mangueras y acoples con seguro y cable antilátigo
  const acopleZ = (cx, cy, s) => big(cx, cy, s, `<rect x="-120" y="-9" width="100" height="18" rx="8" fill="#212121"/><rect x="20" y="-9" width="100" height="18" rx="8" fill="#212121"/>`
    + `<rect x="-26" y="-14" width="26" height="28" rx="3" fill="#B0BEC5" stroke="${OL}"/><rect x="0" y="-14" width="26" height="28" rx="3" fill="#90A4AE" stroke="${OL}"/>`
    + `<rect x="-3" y="-24" width="6" height="14" fill="#FFC20E" stroke="${OL}"/><path d="M0,-24 q10,-10 14,0" stroke="#FFC20E" stroke-width="2.2" fill="none"/>`
    + `<path d="M-64,9 C-44,40 44,40 64,9" stroke="#FFB300" stroke-width="3" fill="none"/><rect x="-70" y="-11" width="10" height="22" rx="2" fill="#78909C" stroke="${OL}"/><rect x="60" y="-11" width="10" height="22" rx="2" fill="#78909C" stroke="${OL}"/>`);
  const ollaSc = q => zbg('#DDE3E7') + `<rect y="165" width="320" height="35" fill="#9EA7AD"/>` + olla(24, 1.2) + `<path d="M48,153 q10,10 40,6 H120" stroke="#212121" stroke-width="5" fill="none"/>`
    + lupa(222, 92, 72, acopleZ(222, 92, .9), '#1565C0', '#ECEFF1') + `<line x1="120" y1="159" x2="160" y2="128" stroke="#1565C0" stroke-width="1.4" stroke-dasharray="3 2"/>`
    + (q ? qmark(36, 26, 14) : lead(222, 4, 'Seguro (pasador) en cada acople', 222, 62, '#2E7D32') + lead(222, 178, 'Cable antilátigo', 240, 126, '#2E7D32') + lead(80, 178, 'Despresuriza antes de abrir', 50, 120, '#D7262B', 9));
  S[GR + 'olla'] = () => V2(ollaSc(false));
  S[GR + 'q_olla'] = () => V2(ollaSc(true));
  const saco = (x, txt, c) => `<path d="M${x},165 q-4,-24 2,-46 q-3,-6 4,-8 h32 q7,2 4,8 q6,22 2,46 z" fill="${c}" stroke="${OL}" stroke-width="1.2"/><path d="M${x + 8},${111} q12,-6 24,0" stroke="${OL}" stroke-width="1" fill="none"/>` + T(x + 20, 144, txt, 8, '#263238');
  const arenaSc = q => H.fondo.taller() + saco(50, 'ARENA', '#E6D3A3') + `<path d="M58,128 q10,-6 20,0" stroke="#C8B07A" stroke-width="2" fill="none"/>` + saco(200, 'GRANALLA', '#B0BEC5')
    + [0, 1, 2, 3, 4, 5].map(i => `<circle cx="${222 + (i % 3) * 6}" cy="${160 + Math.floor(i / 3) * 3}" r="1.6" fill="#546E7A"/>`).join('')
    + (q ? qmark(160, 60) : H.no(70, 80, 15) + H.si(220, 80, 15) + pl(70, 6, 'Sílice: daña los pulmones', '#D7262B', 10) + pl(240, 6, 'Abrasivo autorizado', '#2E7D32', 10));
  S[GR + 'arena'] = () => V2(arenaSc(false));
  S[GR + 'q_arena'] = () => V2(arenaSc(true));
  const cabSc = q => H.fondo.taller() + `<rect x="24" y="40" width="186" height="125" fill="#8D9AA2" stroke="${OL}" stroke-width="1.4"/>` + [0, 1, 2, 3].map(i => `<line x1="${60 + i * 40}" y1="40" x2="${60 + i * 40}" y2="165" stroke="#000" opacity=".1"/>`).join('')
    + `<rect x="90" y="72" width="62" height="93" fill="#78909C" stroke="${OL}" stroke-width="1.2"/><rect x="140" y="116" width="8" height="4" rx="1" fill="#263238"/>`
    + `<rect x="114" y="30" width="14" height="10" fill="#455A64"/><circle cx="121" cy="27" r="6" fill="#E53935" class="amq_bl"/>` + T(117, 60, 'GRANALLADO', 9, '#fff')
    + ondas(212, 100, 3, '#E53935', 1) + P(272, 165, { muffs: 'on', flip: true })
    + (q ? qmark(270, 40) : pl(117, 176, 'Puerta cerrada mientras se granalla', '#1565C0', 9) + pl(262, 6, 'Nadie entra sin EPP', '#D7262B', 10) + pl(262, 30, 'Fonos también afuera', '#E65100', 10));
  S[GR + 'cabina'] = () => V2(cabSc(false));
  S[GR + 'q_cabina'] = () => V2(cabSc(true));

  SI_CONT.temas.push({
    id: 'gr_granallado', sec: 'granallado', emp: ['ali'], title: 'Granallado', thumb: GR + 'intro', mins: 15,
    learn: [
      { s: GR + 'intro', t: 'El granallado', x: 'Granallar es lanzar <b>abrasivo (granalla) con aire a alta presión</b> contra el acero para limpiarlo antes de pintar. Sus riesgos son serios:<ul><li>El chorro <b>corta la piel</b> y puede incrustar granalla en los ojos y el cuerpo.</li><li><b>Polvo</b> que daña los pulmones.</li><li><b>Ruido muy alto</b>, que produce sordera.</li><li>Mangueras que se sueltan y <b>latiguean</b>; equipos a presión.</li></ul>Solo granalla quien está <b>capacitado y autorizado</b>.' },
      { s: GR + 'epp', t: 'El equipo del granallador', x: 'Para granallar se usa, completo y en buen estado:<ul><li><b>Capucha o casco de granallado con aire respirable</b>: protege la cabeza, la cara y los pulmones.</li><li><b>Protector auditivo</b> bajo la capucha.</li><li><b>Traje de protección</b> que cubra todo el cuerpo.</li><li><b>Guantes largos</b> resistentes.</li><li><b>Zapatos de seguridad</b>.</li></ul>Una mascarilla común <b>no sirve</b> para granallar.', k: 'Sin capucha con aire respirable, no se granalla.' },
      { s: GR + 'aire', t: 'Aire respirable', x: 'La capucha se alimenta con <b>aire respirable</b>, que pasa por un <b>filtro y un regulador</b>.<ul><li>Conecta la capucha solo a la <b>línea de aire respirable</b>, nunca a una línea de aire de herramientas.</li><li>Antes de entrar, revisa que <b>llegue aire</b> y que la manguera no esté doblada ni rota.</li><li>Si sientes olor raro, mareo o falta de aire, <b>suelta la boquilla y sal</b> de la cabina de inmediato.</li><li>El visor se cambia cuando está rayado: si no ves bien, no granalles.</li></ul>' },
      { s: GR + 'apuntar', t: 'Nunca apuntes a una persona', x: 'El chorro de granalla <b>arranca la piel</b> y puede dejar ciego.<ul><li>Apunta <b>solo a la pieza</b>, nunca a una persona ni a ti mismo.</li><li>No uses el chorro ni el aire para limpiarte la ropa.</li><li>Si alguien entra a la cabina, <b>suelta la boquilla</b> y no sigas hasta que salga o tenga su EPP.</li><li>No granalles hacia la puerta ni hacia aberturas.</li></ul>' },
      { s: GR + 'hombre', t: 'Hombre muerto: tu seguro', x: 'La boquilla tiene una <b>válvula de hombre muerto</b>: solo sale granalla mientras la mantienes apretada. Si te caes, te desmayas o la sueltas, <b>el chorro se corta solo</b>.<ul><li>Pruébala antes de empezar.</li><li><b>Nunca la amarres, calces ni bloquees.</b></li><li>Si no corta al soltarla, detén el equipo y avisa: no se usa hasta que la reparen.</li></ul>' },
      { s: GR + 'olla', t: 'Olla, mangueras y acoples', x: 'La <b>olla</b> de granallado es un recipiente <b>a presión</b>.<ul><li><b>Despresurízala</b> antes de abrirla, cargarla o desconectar una manguera.</li><li>Cada acople lleva su <b>seguro (pasador)</b> y un <b>cable antilátigo</b>: si se suelta, la manguera no golpea.</li><li>Revisa las mangueras: sin cortes, sin desgaste ni dobleces.</li><li>No pises ni pases vehículos sobre las mangueras.</li></ul>' },
      { s: GR + 'arena', t: 'Polvo y sílice: nunca arena', x: 'La <b>arena</b> tiene sílice. Al granallar con arena se forma un polvo muy fino que produce <b>silicosis</b>, una enfermedad de los pulmones que no tiene cura.<ul><li>Se usa solo el <b>abrasivo autorizado</b> por la empresa (granalla), nunca arena.</li><li>Granalla siempre con la <b>capucha con aire respirable</b> puesta, aunque sea un retoque.</li><li>No te saques la capucha dentro de la cabina hasta que el polvo baje.</li></ul>' },
      { s: GR + 'cabina', t: 'Cabina cerrada y ruido', x: '<ul><li>Se granalla con la <b>cabina cerrada</b> y la señal de uso encendida.</li><li><b>Nadie entra sin su EPP</b>, y solo avisándole al granallador.</li><li>El ruido es muy alto: el ayudante que está cerca usa <b>protector auditivo</b> también afuera (programa PREXOR).</li><li>Barre la granalla del piso: las bolitas hacen resbalar.</li></ul>' }
    ],
    quiz: [
      { s: GR + 'q_epp', v: [
        { q: '¿Qué protección respiratoria usa el granallador?', o: ['Capucha con aire respirable', 'Mascarilla desechable común', 'Un pañuelo húmedo en la cara', 'Ninguna, si la cabina es grande'], w: 'Para granallar se usa capucha o casco de granallado con aire respirable. Una mascarilla común no sirve.' },
        { q: 'Vas a hacer un retoque de granallado de solo un minuto. ¿Qué EPP usas?', o: ['Equipo completo con capucha de aire', 'Solo lentes de seguridad y guantes de cuero', 'Solo una mascarilla y fonos', 'Ninguno, porque es muy poco rato'], w: 'Aunque sea un retoque, se granalla con el equipo completo y la capucha con aire respirable.' },
        { q: 'El protector auditivo se usa bajo la capucha de granallado.', vf: true, w: 'Verdadero. El ruido del granallado es muy alto y la capucha sola no protege los oídos.' }] },
      { s: GR + 'q_apuntar', v: [
        { q: 'Estás granallando y un compañero entra a la cabina sin EPP. ¿Qué haces?', o: ['Suelto la boquilla y espero', 'Sigo, pero apunto hacia otro lado', 'Le hago señas y sigo granallando', 'Le apunto al piso para que se aleje'], w: 'Se suelta la boquilla de inmediato y no se sigue hasta que salga o tenga su EPP.' },
        { q: '¿Por qué nunca se apunta la boquilla a una persona?', o: ['Arranca la piel y daña los ojos', 'Porque se gasta la granalla', 'Porque se tapa la boquilla', 'Porque baja la presión de la olla'], w: 'La granalla a alta presión corta la piel y puede dejar ciego.' },
        { q: 'Se puede usar el chorro de granalla para sacarse el polvo de la ropa si se hace de lejos.', vf: false, w: 'Falso. El chorro nunca se apunta a una persona ni a uno mismo.' }] },
      { s: GR + 'q_hombre', v: [
        { q: '¿Para qué sirve la válvula de hombre muerto de la boquilla?', o: ['Para cortar el chorro al soltarla', 'Para aumentar la presión del chorro', 'Para cambiar el tipo de abrasivo', 'Para abrir la olla más rápido'], w: 'Solo sale granalla mientras se mantiene apretada: si la sueltas, el chorro se corta solo.' },
        { q: 'Un compañero amarró la palanca del hombre muerto para no cansarse la mano. ¿Qué haces?', o: ['Le pido que la suelte y aviso', 'Hago lo mismo con mi boquilla', 'Lo dejo, se cansa menos así', 'Le presto cinta para amarrarla mejor'], w: 'El hombre muerto nunca se amarra ni se bloquea: si la boquilla se escapa, el chorro sigue.' },
        { q: 'Sueltas la palanca y la granalla sigue saliendo. ¿Qué haces?', o: ['Detengo el equipo y aviso', 'Sigo granallando con cuidado', 'Le pego a la palanca para que corte', 'Termino la pieza y después aviso'], w: 'Si el hombre muerto no corta, se detiene el equipo y no se usa hasta que lo reparen.' }] },
      { s: GR + 'q_olla', v: [
        { q: 'Tienes que cargar granalla en la olla. ¿Qué haces primero?', o: ['La despresurizo', 'La abro con cuidado, con presión', 'Golpeo la tapa para soltarla', 'Desconecto la manguera con presión'], w: 'La olla es un recipiente a presión: se despresuriza antes de abrirla, cargarla o desconectar mangueras.' },
        { q: '¿Para qué sirve el cable antilátigo en los acoples?', o: ['Evita que la manguera golpee', 'Para que la manguera dure más tiempo en uso', 'Para que pase más granalla', 'Para colgar la manguera en la pared'], w: 'Si el acople se suelta, el cable antilátigo impide que la manguera latiguee y golpee a alguien.' },
        { q: 'Cada acople de las mangueras de granallado debe tener su seguro (pasador) puesto.', vf: true, w: 'Verdadero. El seguro evita que el acople se suelte con la presión.' }] },
      { s: GR + 'q_arena', v: [
        { q: 'Se acabó la granalla y alguien propone usar arena. ¿Qué respondes?', o: ['Que no, porque causa silicosis', 'Que sí, si es arena bien fina y seca', 'Que sí, si se usa poco rato', 'Que sí, si se moja antes'], w: 'La arena tiene sílice y produce silicosis. Se usa solo el abrasivo autorizado.' },
        { q: '¿Qué enfermedad produce el polvo de sílice de la arena?', o: ['Silicosis', 'Dermatitis', 'Lumbago', 'Conjuntivitis'], w: 'La silicosis es una enfermedad de los pulmones que no tiene cura.' },
        { q: 'La silicosis se cura con reposo cuando el trabajador deja de granallar.', vf: false, w: 'Falso. La silicosis no tiene cura: por eso se previene.' }] },
      { s: GR + 'q_cabina', v: [
        { q: 'Eres ayudante y esperas afuera de la cabina mientras granallan. ¿Qué usas?', o: ['Protector auditivo', 'Nada, porque estoy afuera', 'Solo la mascarilla', 'Solo los guantes'], w: 'El ruido del granallado es muy alto también afuera de la cabina: se usa protector auditivo.' },
        { q: 'Necesitas entrar a la cabina mientras se granalla. ¿Qué haces?', o: ['Aviso y entro con mi EPP', 'Entro rápido sin avisar', 'Entro tapándome la cara con la mano', 'Golpeo la puerta y entro'], w: 'Nadie entra sin su EPP y sin avisar al granallador.' },
        { q: '¿Por qué hay que barrer la granalla del piso?', o: ['Las bolitas hacen resbalar', 'Porque mancha la pintura', 'Porque se oxida la cabina por dentro', 'Porque hace más ruido'], w: 'La granalla en el piso es como caminar sobre bolitas: provoca resbalones y caídas.' }] }
    ]
  });

  // ======================================================================
  // 7. PINTURA CON PISTOLA Y SOLVENTES
  // ======================================================================
  const PI = 'al_gr_pintura_';
  const PP = (x, o = {}) => { const oo = Object.assign({ area: 'pintura', pose: 'amq_blast' }, o); if (oo.resp !== false) oo.mask = false;
    return W(x, 165, oo) + (oo.resp !== false ? resp(x, 165, oo) : ''); };
  // pistola airless en la mano (pose amq_blast), f = 1 apunta a la derecha
  const pistola = (x, f = 1, on = true, len = 40) => { const hx = x + 29 * f, hy = 121;
    let g = `<path d="M${hx},${hy + 6} q${-6 * f},30 ${-38 * f},38" stroke="#37474F" stroke-width="2.2" fill="none"/>`
      + `<path d="M${hx - 3 * f},${hy + 8} l${2 * f},-10 h${16 * f} v5 h${-10 * f} l${-2 * f},5 z" fill="#1565C0" stroke="${OL}" stroke-width=".8"/>`
      + `<rect x="${f > 0 ? hx + 15 : hx - 21}" y="${hy - 3}" width="6" height="3" fill="#90A4AE" stroke="${OL}" stroke-width=".6"/>`;
    if (on) { const x0 = hx + 21 * f, x1 = x0 + len * f;
      g += `<path d="M${x0},${hy - 1.5} L${x1},${hy - 14} L${x1},${hy + 11} z" fill="#FF8A65" class="amq_nb"/>`
        + [0, 1, 2, 3, 4].map(i => `<circle cx="${x0 + (8 + i * 7) * f}" cy="${hy - 2 + (i % 3 - 1) * 4}" r="1.4" fill="#E64A19" class="amq_fl" style="animation-delay:-${(i * .4).toFixed(1)}s"/>`).join(''); }
    return g; };
  const bomba = x => `<rect x="${x}" y="134" width="30" height="24" rx="3" fill="#1565C0" stroke="${OL}"/><circle cx="${x + 8}" cy="160" r="5" fill="#263238"/><circle cx="${x + 24}" cy="160" r="5" fill="#263238"/><circle cx="${x + 15}" cy="128" r="5" fill="#fff" stroke="${OL}"/><path d="M${x + 15},128 l2,-3" stroke="#D32F2F" stroke-width="1.2"/><path d="M${x + 30},140 l8,-36" stroke="#455A64" stroke-width="2.4"/>`;
  const filtros = () => `<rect x="296" y="30" width="24" height="130" fill="#CFD8DC" stroke="${OL}"/>` + [...Array(10)].map((_, i) => `<line x1="296" y1="${40 + i * 12}" x2="320" y2="${40 + i * 12}" stroke="#90A4AE"/>`).join('');
  const vigaP = (x1, x2, pint = 0) => H.viga(x1, 122, x2 - x1, 16) + (pint ? `<rect x="${x1}" y="106" width="${pint}" height="16" fill="#E8423A" opacity=".85"/>` : '') + caballete(x1 + 14, 122) + caballete(x2 - 14, 122);
  S[PI + 'intro'] = () => V2(H.fondo.cabina('pintura') + filtros() + bomba(36) + vigaP(212, 290, 30) + PP(150) + pistola(150, 1, true, 30)
    + pl(80, 6, 'Vapores de solventes', '#7B1FA2', 10) + pl(80, 30, 'Inflamable', '#D7262B', 10) + pl(80, 54, 'Alta presión', '#E65100', 10));
  const eppPSc = q => H.fondo.cabina('pintura') + PP(150, { pose: 'stand' })
    + (q ? qmark(270, 45) : lead(258, 4, 'Respirador para vapores orgánicos', 160, 82, '#2E7D32') + lead(258, 30, 'Lentes de seguridad', 155, 72, '#1565C0')
      + lead(258, 56, 'Traje de protección', 150, 116, '#1565C0') + lead(258, 82, 'Guantes de nitrilo', 161, 130, '#1565C0') + lead(258, 176, 'Zapatos de seguridad', 157, 163, '#1565C0'));
  S[PI + 'epp'] = () => V2(eppPSc(false));
  S[PI + 'q_epp'] = () => V2(eppPSc(true));
  const ventSc = q => H.fondo.cabina('pintura') + filtros() + vigaP(196, 276, 24) + PP(120) + pistola(120, 1, true, 30)
    + (q ? qmark(50, 45) : [50, 74, 98].map(y => `<g class="amq_fl" style="animation-delay:-${(y / 60).toFixed(1)}s">${arrow(218, y, 262, y, '#2E7D32', 2.4)}</g>`).join('')
      + lead(250, 176, 'Extracción encendida', 308, 150, '#2E7D32') + pl(100, 6, 'La neblina va hacia la extracción,', '#1565C0', 9) + pl(100, 28, 'no hacia tu cara', '#1565C0', 9));
  S[PI + 'ventilacion'] = () => V2(ventSc(false));
  S[PI + 'q_ventilacion'] = () => V2(ventSc(true));
  const inflSc = q => H.fondo.taller() + `<rect x="10" y="30" width="160" height="135" fill="#E3E7EA" stroke="${OL}" stroke-width="1.4"/><rect x="128" y="76" width="42" height="89" fill="#CFD8DC"/>` + T(70, 46, 'PINTURA', 9, '#455A64')
    + PP(70, { flip: true }) + pistola(70, -1, true, 22)
    + P(232, 165, { pose: 'amq_hold', flip: true, gloves: '#8D6E63', muffs: 'on' }) + H.esmerilMano(206, 107, 180, false) + H.chispas(176, 98, 9, -1)
    + (q ? qmark(290, 40) : H.no(232, 58, 13) + pl(250, 6, 'Nada de chispas ni llamas cerca', '#D7262B', 9) + H.extintor(292, 165, 'PQS', .75));
  S[PI + 'inflamables'] = () => V2(inflSc(false));
  S[PI + 'q_inflamables'] = () => V2(inflSc(true));
  // conexión a tierra: tambor y balde unidos a la barra de tierra
  const pinza = (x, y) => `<path d="M${x - 5},${y - 4} l10,4 l-10,4" fill="#D32F2F" stroke="${OL}" stroke-width=".8"/>`;
  const tierraSc = q => zbg('#E3E7EA') + `<rect y="165" width="320" height="35" fill="#B0BEC5"/>` + `<rect x="40" y="70" width="70" height="95" rx="4" fill="#546E7A" stroke="${OL}" stroke-width="1.4"/><ellipse cx="75" cy="70" rx="35" ry="6" fill="#78909C" stroke="${OL}"/><rect x="40" y="95" width="70" height="4" fill="#455A64"/><rect x="40" y="135" width="70" height="4" fill="#455A64"/>`
    + `<rect x="50" y="104" width="50" height="24" fill="#fff"/>` + T(75, 120, 'DILUYENTE', 8, '#263238') + `<rect x="140" y="125" width="44" height="40" fill="#90A4AE" stroke="${OL}"/><path d="M140,125 q22,-28 44,0" stroke="#455A64" stroke-width="2" fill="none"/>`
    + `<rect x="230" y="150" width="70" height="8" fill="#B87333" stroke="${OL}"/><path d="M262,158 v10" stroke="#B87333" stroke-width="4"/>` + T(265, 186, 'Barra de tierra', 9, '#263238')
    + (q ? qmark(270, 50) : `<path d="M110,150 q60,30 125,2" stroke="#2E7D32" stroke-width="2.4" fill="none"/><path d="M184,145 q30,20 60,6" stroke="#2E7D32" stroke-width="2.4" fill="none"/>` + pinza(112, 150) + pinza(186, 145)
      + pl(160, 6, 'Envases y equipo conectados a tierra', '#2E7D32', 10) + pl(160, 30, 'La estática puede encender los vapores', '#D7262B', 9));
  S[PI + 'tierra'] = () => V2(tierraSc(false));
  S[PI + 'q_tierra'] = () => V2(tierraSc(true));
  const lata = (x, c, txt) => `<rect x="${x}" y="88" width="24" height="28" rx="2" fill="${c}" stroke="${OL}"/><rect x="${x - 1}" y="85" width="26" height="4" fill="#90A4AE" stroke="${OL}" stroke-width=".7"/><rect x="${x + 3}" y="96" width="18" height="12" fill="#fff"/>` + T(x + 12, 105, txt, 5, '#263238');
  const envSc = q => H.fondo.taller({ vias: false }) + `<rect x="12" y="116" width="130" height="5" fill="#78909C"/><rect x="16" y="121" width="5" height="44" fill="#546E7A"/><rect x="133" y="121" width="5" height="44" fill="#546E7A"/>`
    + lata(20, '#E8423A', 'PINTURA') + lata(50, '#1565C0', 'DILUYENTE') + `<rect x="82" y="84" width="22" height="32" fill="#FFC20E" stroke="${OL}"/>` + T(93, 104, 'HDS', 8, '#263238')
    + `<rect x="160" y="125" width="36" height="40" rx="2" fill="#D32F2F" stroke="${OL}"/><rect x="157" y="120" width="42" height="7" rx="2" fill="#B71C1C" stroke="${OL}"/>` + T(178, 150, 'PAÑOS', 7, '#fff')
    + `<path d="M250,165 v-30 q0,-6 4,-10 v-8 h8 v8 q4,4 4,10 v30 z" fill="#B3E5FC" fill-opacity=".8" stroke="${OL}"/><rect x="251" y="140" width="14" height="25" fill="#FFB74D" opacity=".7"/>`
    + (q ? qmark(290, 40) : H.no(258, 96, 12) + H.si(178, 96, 12) + pl(80, 6, 'Cerrados, rotulados y con su HDS', '#2E7D32', 10) + pl(240, 30, 'Nunca en botellas de bebida', '#D7262B', 9) + pl(178, 178, 'Tarro metálico con tapa', '#1565C0', 9));
  S[PI + 'envases'] = () => V2(envSc(false));
  S[PI + 'q_envases'] = () => V2(envSc(true));
  // pistola airless en acercamiento: nunca la mano frente a la boquilla
  const pistZ = (cx, cy, s, o = {}) => big(cx, cy, s, `<path d="M-30,30 q-10,30 -40,40" stroke="#37474F" stroke-width="5" fill="none"/><path d="M-36,34 l8,-40 h70 v20 h-44 l-8,20 z" fill="#1565C0" stroke="${OL}" stroke-width="1.4"/>`
    + `<rect x="42" y="-4" width="26" height="12" fill="#90A4AE" stroke="${OL}"/><path d="M-4,14 q4,14 -6,20" stroke="#263238" stroke-width="5" fill="none"/>`
    + (o.seguro ? `<rect x="-14" y="10" width="10" height="6" fill="#FFC20E" stroke="${OL}"/>` : '')
    + (o.mano ? `<path d="M68,2 L96,-8 L96,16 z" fill="#FF8A65" class="amq_nb"/>` + mano(84, 4, 1, { ang: 180, c: '#43A047', manga: '#ECEFF1' }) : ''));
  const airSc = q => zbg() + (q ? pistZ(120, 100, 1.1, { mano: true }) + qmark(40, 40)
    : div() + pistZ(46, 100, .62, { mano: true }) + pistZ(210, 100, .62, { seguro: true }) + H.no(80, 168, 13) + H.si(240, 168, 13)
      + pl(80, 6, 'Nunca la mano al frente', '#D7262B', 9) + pl(240, 6, 'Seguro puesto al detenerte', '#2E7D32', 9) + lead(240, 40, 'Seguro del gatillo', 204, 108, '#1565C0', 9));
  S[PI + 'airless'] = () => V2(airSc(false));
  S[PI + 'q_airless'] = () => V2(airSc(true));
  S[PI + 'salud'] = () => V2(H.fondo.taller() + `<rect x="10" y="30" width="130" height="135" fill="#E3E7EA" stroke="${OL}" stroke-width="1.4"/><rect x="98" y="76" width="42" height="89" fill="#CFD8DC"/>` + T(56, 46, 'PINTURA', 9, '#455A64')
    + PP(160, { pose: 'walk', face: 'worried' }) + lavado(258, 100)
    + pl(80, 176, 'Mareo o dolor de cabeza: sal y avisa', '#D7262B', 9) + pl(258, 6, 'Lávate antes de comer', '#2E7D32', 10));

  SI_CONT.temas.push({
    id: 'gr_pintura', sec: 'granallado', emp: ['ali'], title: 'Pintura con pistola y solventes', thumb: PI + 'intro', mins: 15,
    learn: [
      { s: PI + 'intro', t: 'Pintar con pistola', x: 'Al pintar con pistola la pintura se convierte en una <b>neblina</b> llena de <b>solventes</b>. Los riesgos principales son:<ul><li><b>Vapores</b> que se respiran: dolor de cabeza, mareo y daño a los pulmones, el hígado y el sistema nervioso.</li><li><b>Incendio y explosión</b>: los vapores se encienden con una chispa.</li><li><b>Alta presión</b> de la pistola, que puede inyectar pintura bajo la piel.</li><li>Contacto con la piel y los ojos.</li></ul>' },
      { s: PI + 'epp', t: 'El equipo del pintor', x: '<ul><li><b>Respirador con filtros para vapores orgánicos</b> (y prefiltro para la neblina). Una mascarilla de papel <b>no sirve</b>.</li><li><b>Lentes de seguridad</b> o antiparras.</li><li><b>Guantes de nitrilo</b>.</li><li><b>Traje de protección</b> que cubra brazos y piernas.</li><li><b>Zapatos de seguridad</b>.</li></ul>Revisa que el respirador selle bien en tu cara (la barba impide el sello) y cambia los filtros cuando corresponda o si sientes olor a solvente. Guárdalo limpio, en una bolsa cerrada.', k: 'Sin respirador con filtros para vapores orgánicos, no se pinta.' },
      { s: PI + 'ventilacion', t: 'Ventilación y extracción', x: '<ul><li>Pinta solo con la <b>extracción de la cabina encendida</b>. Si no funciona, no pintes y avisa.</li><li>Ubícate de modo que la neblina <b>vaya hacia la extracción</b>, no hacia tu cara.</li><li>No pintes en lugares cerrados sin ventilación.</li><li>Los filtros de la cabina se cambian cuando están saturados.</li></ul>' },
      { s: PI + 'inflamables', t: 'Inflamables: nada de chispas', x: 'Los vapores de pintura y diluyente se encienden con <b>una sola chispa</b>.<ul><li>Cerca de la zona de pintura: <b>nada de esmeril, soldadura ni oxicorte</b>.</li><li>No fumes ni uses llamas.</li><li>No uses herramientas ni equipos que hagan chispas.</li><li>Ten un <b>extintor</b> a mano y despejado.</li><li>Guarda solo la cantidad de pintura y diluyente que vas a usar en el turno.</li></ul>' },
      { s: PI + 'tierra', t: 'Conexión a tierra', x: 'Al pintar con pistola y al <b>trasvasijar</b> solvente se genera <b>electricidad estática</b>. Una chispa de estática basta para encender los vapores.<ul><li>El equipo de pintura y los envases metálicos van <b>conectados a tierra</b>.</li><li>Trasvasija despacio, con los envases conectados entre sí y a la barra de tierra.</li><li>Revisa que las pinzas y los cables estén en buen estado.</li></ul>' },
      { s: PI + 'envases', t: 'Envases, HDS y paños', x: '<ul><li>Los envases se mantienen <b>cerrados</b> y <b>rotulados</b> con su contenido.</li><li>Lee la <b>HDS</b> (hoja de datos de seguridad) de cada producto: dice sus riesgos, el EPP y qué hacer en una emergencia.</li><li>Nunca trasvasijes a <b>botellas de bebida</b>: alguien se lo puede tomar.</li><li>Los paños con solvente o pintura van a un <b>tarro metálico con tapa</b>: se pueden encender solos.</li></ul>' },
      { s: PI + 'airless', t: 'Pistola airless: alta presión', x: 'La pistola airless trabaja a una presión tan alta que puede <b>inyectar pintura bajo la piel</b>. Parece un pinchazo, pero es una lesión grave que puede terminar en amputación.<ul><li><b>Nunca apuntes</b> a la mano ni a una persona, ni pongas los dedos frente a la boquilla.</li><li>Pon el <b>seguro del gatillo</b> cada vez que te detienes.</li><li><b>Despresuriza</b> antes de limpiar o cambiar la boquilla.</li></ul>Si ocurre una inyección, es una urgencia: avisa de inmediato y ve al centro de la ACHS (<b>1404</b>).' },
      { s: PI + 'salud', t: 'Cuida tu salud', x: '<ul><li>Si sientes <b>mareo, dolor de cabeza o náuseas</b>, sal al aire libre y avisa a tu jefatura.</li><li>Nunca limpies tu piel con diluyente: usa agua y jabón.</li><li><b>Lávate</b> las manos y la cara antes de comer, tomar agua o fumar en los lugares permitidos.</li><li>No comas ni guardes comida en la zona de pintura.</li><li>Si un producto salpica tus ojos, lávalos con abundante agua y avisa.</li></ul>' }
    ],
    quiz: [
      { s: PI + 'q_epp', v: [
        { q: 'Vas a pintar con pistola. ¿Qué protección respiratoria usas?', o: ['Respirador para vapores orgánicos', 'Mascarilla de papel desechable doble', 'Un pañuelo sobre la nariz', 'Ninguna, si la cabina es grande'], w: 'Para pintar se usa respirador con filtros para vapores orgánicos. La mascarilla de papel no detiene los vapores.' },
        { q: 'Estás pintando con el respirador y empiezas a sentir olor a solvente. ¿Qué haces?', o: ['Salgo y reviso sello y filtros', 'Sigo pintando, ya me acostumbré', 'Aprieto más la pistola', 'Respiro por la boca y sigo'], w: 'Si sientes olor, el respirador no está sellando o los filtros están saturados: sal y revísalo.' },
        { q: '¿Qué guantes se usan para pintar y manipular solventes?', o: ['Guantes de nitrilo', 'Guantes de lana', 'Guantes de descarne', 'Guantes de cabritilla'], w: 'El nitrilo resiste los solventes y la pintura.' }] },
      { s: PI + 'q_ventilacion', v: [
        { q: 'Vas a pintar y la extracción de la cabina no enciende. ¿Qué haces?', o: ['No pinto y aviso a mi jefatura', 'Pinto rápido con la puerta abierta', 'Pinto solo una mano de pintura', 'Pinto con dos mascarillas'], w: 'Sin extracción funcionando no se pinta. Se avisa para que la reparen.' },
        { q: '¿Cómo te ubicas al pintar dentro de la cabina?', o: ['Con la neblina hacia la extracción', 'Entre la pieza y la extracción', 'Mirando hacia la puerta abierta de la cabina', 'Donde no llegue la luz'], w: 'La neblina debe ir hacia la extracción, no hacia tu cara.' },
        { q: 'Se puede pintar con pistola en un lugar cerrado sin ventilación si se usa respirador.', vf: false, w: 'Falso. Además del respirador, se necesita ventilación o extracción funcionando.' }] },
      { s: PI + 'q_inflamables', v: [
        { q: 'Un compañero quiere esmerilar junto a la cabina mientras pintas. ¿Qué haces?', o: ['Le pido que espere o se aleje', 'Le digo que esmerile hacia el otro lado', 'Sigo pintando, la puerta está cerrada', 'Le presto el extintor y sigo'], w: 'Las chispas encienden los vapores. Cerca de la pintura no se esmerila, ni se suelda, ni se oxicorta.' },
        { q: '¿Qué puede encender los vapores de la pintura?', o: ['Una sola chispa', 'Solo una llama grande', 'Solo el sol directo', 'Nada, la pintura no se quema'], w: 'Los vapores de solventes se encienden con una sola chispa.' },
        { q: 'Cerca de la zona de pintura debe haber un extintor despejado y a mano.', vf: true, w: 'Verdadero. Los solventes son inflamables.' }] },
      { s: PI + 'q_tierra', v: [
        { q: 'Vas a trasvasijar diluyente desde un tambor a un balde metálico. ¿Qué haces?', o: ['Los conecto a tierra y voy despacio', 'Lo vacío rápido para terminar luego', 'Lo hago junto a la soldadora', 'Uso un balde de plástico cualquiera'], w: 'Al trasvasijar se genera estática: los envases van conectados entre sí y a tierra, y se trasvasija despacio.' },
        { q: '¿Para qué se conectan a tierra el equipo de pintura y los envases?', o: ['Evita chispas de estática', 'Para que la pintura seque más rápido', 'Para que no se ensucie el piso', 'Para que la pistola tenga más presión'], w: 'La conexión a tierra descarga la electricidad estática, que puede encender los vapores.' },
        { q: 'La electricidad estática puede producir una chispa capaz de encender los vapores de solvente.', vf: true, w: 'Verdadero. Por eso el equipo y los envases van conectados a tierra.' }] },
      { s: PI + 'q_envases', v: [
        { q: 'Terminaste de limpiar la pistola con paños y diluyente. ¿Dónde dejas los paños?', o: ['En un tarro metálico con tapa', 'En el basurero común', 'Sobre la mesa, para que se sequen', 'En una caja de cartón'], w: 'Los paños con solvente pueden encenderse solos: van a un tarro metálico con tapa.' },
        { q: 'Necesitas llevar un poco de diluyente a otro puesto. ¿En qué lo llevas?', o: ['En un envase adecuado y rotulado', 'En una botella de bebida bien lavada', 'En un vaso desechable', 'En un balde sin tapa'], w: 'Nunca en botellas de bebida: alguien se lo puede tomar. Se usa un envase adecuado, cerrado y rotulado.' },
        { q: '¿Qué encuentras en la HDS de un producto?', o: ['Sus riesgos, el EPP y la emergencia', 'Solo el precio, el proveedor y la fecha de compra', 'Solo el color de la pintura', 'El horario de la cabina'], w: 'La hoja de datos de seguridad indica los riesgos, el EPP y las medidas de emergencia.' }] },
      { s: PI + 'q_airless', v: [
        { q: 'La boquilla de la pistola airless se tapó. ¿Qué haces?', o: ['Pongo el seguro y despresurizo', 'La destapo con el dedo', 'La soplo apretando el gatillo', 'La apunto a mi mano para probar'], w: 'Antes de limpiar o cambiar la boquilla se pone el seguro y se despresuriza. Nunca los dedos frente a la boquilla.' },
        { q: 'A un compañero le entró pintura en el dedo con la pistola y parece solo un pinchazo. ¿Qué haces?', o: ['Avisamos de inmediato y va a la ACHS', 'Le pongo un parche y sigue trabajando', 'Esperamos a ver si se hincha', 'Se lava con diluyente y sigue'], w: 'La inyección a alta presión es una urgencia aunque parezca un pinchazo: se avisa y se atiende de inmediato en la ACHS.' },
        { q: 'Cada vez que dejas de pintar con la pistola airless, pones el seguro del gatillo.', vf: true, w: 'Verdadero. Así no se dispara por un golpe o un descuido.' }] }
    ]
  });

  // ======================================================================
  // ACTIVIDADES
  // ======================================================================
  const OLi = '#22303A';
  window.HT_ICO = Object.assign(window.HT_ICO || {}, {
    al_mq_lentes: `<rect x="5" y="18" width="16" height="11" rx="4" fill="#B3E5FC" stroke="${OLi}" stroke-width="2"/><rect x="27" y="18" width="16" height="11" rx="4" fill="#B3E5FC" stroke="${OLi}" stroke-width="2"/><path d="M21,22 h6 M5,21 l-3,-3 M43,21 l3,-3" stroke="${OLi}" stroke-width="2"/><path d="M5,16 h38" stroke="${OLi}" stroke-width="2.4"/>`,
    al_mq_careta: `<path d="M8,12 q16,-8 32,0" stroke="${OLi}" stroke-width="3" fill="none"/><path d="M8,12 h32 l2,24 q-18,10 -36,0 z" fill="#B3E5FC" fill-opacity=".7" stroke="${OLi}" stroke-width="2"/><path d="M14,18 l4,10" stroke="#fff" stroke-width="2"/>`,
    al_mq_ropa: `<path d="M15,6 l-7,6 l-3,16 h6 l2,-9 v25 h9 l2,-14 l2,14 h9 v-25 l2,9 h6 l-3,-16 l-7,-6 l-9,5 z" fill="#22406B" stroke="${OLi}" stroke-width="2" stroke-linejoin="round"/><path d="M24,11 v18" stroke="#90CAF9" stroke-width="1.6"/><circle cx="24" cy="16" r="1.2" fill="#90CAF9"/><circle cx="24" cy="23" r="1.2" fill="#90CAF9"/><path d="M13,44 h9 M26,44 h9" stroke="${OLi}" stroke-width="2"/>`,
    al_mq_polera: `<path d="M13,6 q11,6 22,0 l9,8 l-5,7 l-4,-3 v26 h-22 v-26 l-4,3 l-5,-7 z" fill="#FFB300" stroke="${OLi}" stroke-width="2" stroke-linejoin="round"/><path d="M13,44 q3,4 6,0 q3,4 6,0 q3,4 6,0 q3,4 4,0" stroke="${OLi}" stroke-width="1.6" fill="none"/>`
  });
  window.HT_ACT = (window.HT_ACT || []).concat([
    { tema: 'mq_torno', tipo: 'vestir', q: '🧩 Actividad: el tornero va a desbastar una pieza de fundición en el torno. Prepáralo.',
      items: [['Lentes de seguridad', 1, 'al_mq_lentes', { glasses: true }], ['Careta facial', 1, 'al_mq_careta', {}], ['Ropa de trabajo ajustada y abotonada', 1, 'al_mq_ropa', { shirt: '#22406B', pants: '#2B3A4A' }],
        ['Zapatos de seguridad', 1, 'zapatos', { boots: '#263238' }],
        ['Guantes', 0, 'guantes#C8A27A', null, 'Con el plato girando no se usan guantes: se enganchan y arrastran la mano.'], ['Anillo', 0, 'anillo', null, 'Las joyas están prohibidas en ALI: se enganchan en el plato y pueden amputar un dedo.'],
        ['Polera suelta, por fuera del pantalón', 0, 'al_mq_polera', null, 'La ropa suelta se enrolla en el plato: se usa ropa ajustada y abotonada.']],
      w: 'Para tornear: lentes de seguridad, careta facial cuando saltan muchas partículas, ropa de trabajo ajustada y abotonada, y zapatos de seguridad. Sin guantes cerca del plato, sin joyas y sin ropa suelta.' },
    { tema: 'gr_granallado', tipo: 'orden', q: '🧩 Actividad: ordena los pasos del granallador, desde que llega a la cabina hasta que termina.',
      items: ['Reviso mangueras, acoples con seguro y el hombre muerto, con el equipo sin presión', 'Me pongo el traje, los guantes y el protector auditivo', 'Me pongo la capucha y verifico que llega aire respirable', 'Cierro la cabina y granallo apuntando solo a la pieza', 'Suelto el hombre muerto y despresurizo la olla antes de abrirla'],
      w: 'Primero revisas el equipo sin presión, luego te pones traje, guantes y fonos, después la capucha verificando que llegue aire, granallas con la cabina cerrada apuntando solo a la pieza y al terminar sueltas el hombre muerto y despresurizas la olla.' }
  ]);
})();

/* ---- 60_soldadura.js ---- */
// Maestranza ALI · sección 'soldadura' (Soldadura y calderería): arco, MIG/TIG, humos, oxicorte y plasma, cilindros, trabajos en caliente.
(function () {
  const H = window.HD, T = H.T, pl = H.pill;
  const OL = '#263238';
  const CSS_SO = `<style>.soFlu{animation:soFlu 1s linear infinite}@keyframes soFlu{to{stroke-dashoffset:-16}}.soLla{animation:soLla .3s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:0% 50%}@keyframes soLla{to{transform:scaleX(1.12)}}.soBur{animation:soBur 1.4s ease-in-out infinite}@keyframes soBur{0%{opacity:0;transform:translateY(3px)}50%{opacity:1}100%{opacity:0;transform:translateY(-6px)}}.soRay{animation:soRay .5s steps(2) infinite}@keyframes soRay{50%{opacity:.3}}.soVue{animation:soVue 1.6s linear infinite}@keyframes soVue{from{stroke-dashoffset:40}to{stroke-dashoffset:0}}</style>`;
  const svg = inner => sv(H.CSS + CSS_SO + inner);

  // ---------------- AYUDAS DE DIBUJO ----------------
  const flecha = (x1, y1, x2, y2, c = '#2E7D32', w = 3) => { const a = Math.atan2(y2 - y1, x2 - x1), L = 7 + w;
    const p = d => `${(x2 - L * Math.cos(a + d)).toFixed(1)},${(y2 - L * Math.sin(a + d)).toFixed(1)}`;
    return `<line x1="${x1}" y1="${y1}" x2="${(x2 - L * .6 * Math.cos(a)).toFixed(1)}" y2="${(y2 - L * .6 * Math.sin(a)).toFixed(1)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/><path d="M${x2},${y2} L${p(-.45)} L${p(.45)}z" fill="${c}"/>`; };
  const globo = (x, y, t, w, c = '#263238') => `<rect x="${x}" y="${y}" width="${w}" height="22" rx="8" fill="#fff" stroke="#90A4AE" stroke-width="1.5"/>` + T(x + w / 2, y + 15, t, 10, c);
  // soldador (por defecto con careta, en postura de soldar frente a la mesa)
  const sold = (x, o = {}) => W(x, 165, Object.assign({ area: 'soldadura', careta: true, pose: 'carry' }, o));
  // porta electrodo con electrodo, desde la mano (hx,hy) hasta el arco (ax,ay)
  const portaE = (hx, hy, ax, ay) => { const mx = hx + (ax - hx) * .45, my = hy + (ay - hy) * .45;
    return `<line x1="${hx}" y1="${hy}" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" stroke="#263238" stroke-width="4.5" stroke-linecap="round"/><line x1="${mx.toFixed(1)}" y1="${my.toFixed(1)}" x2="${ax}" y2="${ay}" stroke="#B0BEC5" stroke-width="1.8"/>`; };
  // antorcha MIG / TIG en la mano
  const antorcha = (hx, hy, ax, ay, tig = false) => `<line x1="${hx}" y1="${hy}" x2="${ax}" y2="${ay}" stroke="${tig ? '#455A64' : '#263238'}" stroke-width="${tig ? 4 : 5}" stroke-linecap="round"/><circle cx="${ax}" cy="${ay}" r="${tig ? 2.4 : 3}" fill="${tig ? '#D7CCC8' : '#B0BEC5'}" stroke="${OL}" stroke-width=".8"/>`;
  const arcoF = (x, y) => `<circle cx="${x}" cy="${y}" r="22" fill="#FFF59D" opacity=".35" class="adArco"/>` + H.arco(x, y) + `<circle cx="${x}" cy="${y}" r="4" fill="#fff"/><circle cx="${x}" cy="${y}" r="6" fill="none" stroke="#FFEE58" stroke-width="2"/>`;
  // mesa con plancha; devuelve escena de soldadura frente al soldador ubicado en wx
  const escSold = (wx, o = {}) => { const hx = wx + 17, ax = wx + 42, ay = 109;
    return H.mesaSoldar(wx + 22, 165, o.w || 108) + H.plancha(wx + 30, 115, 78, 5)
      + (o.tig ? antorcha(hx, 114, ax, ay + 1, true) + `<line x1="${ax + 14}" y1="96" x2="${ax + 2}" y2="${ay}" stroke="#B0BEC5" stroke-width="1.6"/>` : o.mig ? antorcha(hx, 114, ax, ay) : portaE(hx, 114, ax, ay))
      + (o.arco !== false ? arcoF(ax + 1, ay) + (o.chispas !== false ? H.chispas(ax + 3, ay + 1, 7) : '') : '')
      + sold(wx, o.w8 || {}); };
  // cable de la máquina a la mano y cable de tierra a la pieza
  const cables = (mx, wx, tierra = true) => `<path d="M${mx + 40},${135} q30,34 ${wx - mx - 30},16 q8,-6 ${10},-22" stroke="#111" stroke-width="2.4" fill="none"/>`
    + (tierra ? `<path d="M${mx + 40},150 q20,14 ${wx - mx + 60},12 H${wx + 104} V113" stroke="#111" stroke-width="2.4" fill="none"/>` + pinzaT(wx + 104, 110) : '');
  const pinzaT = (x, y) => `<path d="M${x - 6},${y - 3} l10,-4 l2,4 l-10,4z M${x - 6},${y + 3} l10,4 l2,-4 l-10,-4z" fill="#C62828" stroke="${OL}" stroke-width=".8"/><circle cx="${x - 5}" cy="${y}" r="2" fill="#263238"/>`;
  // ojo grande (para "ojo de arco")
  const ojo = (x, y, r = 30, rojo = false) => `<path d="M${x - r},${y} q${r},${-r * .9} ${2 * r},0 q${-r},${r * .9} ${-2 * r},0z" fill="${rojo ? '#FFCDD2' : '#fff'}" stroke="${OL}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="${r * .38}" fill="#6D4C41"/><circle cx="${x}" cy="${y}" r="${r * .17}" fill="#111"/><circle cx="${x + r * .12}" cy="${y - r * .12}" r="${r * .07}" fill="#fff"/>`
    + (rojo ? `<path d="M${x - r * .85},${y - 2} q8,-3 12,2 M${x - r * .8},${y + 4} q8,2 13,-2 M${x + r * .85},${y - 3} q-8,-2 -12,3 M${x + r * .8},${y + 4} q-7,3 -12,-1" stroke="#E53935" stroke-width="1.4" fill="none"/>` : '');
  // rayos del arco
  const rayos = (x, y, a0, a1, L = 40, c = '#7E57C2') => `<g class="soRay">${[0, 1, 2, 3, 4].map(i => { const a = (a0 + (a1 - a0) * i / 4) * Math.PI / 180; return `<line x1="${x}" y1="${y}" x2="${(x + Math.cos(a) * L).toFixed(1)}" y2="${(y + Math.sin(a) * L).toFixed(1)}" stroke="${c}" stroke-width="2.4" stroke-dasharray="5 3" opacity=".8"/>`; }).join('')}</g>`;
  // respirador de medio rostro con filtros (sobre la cara de W de pie: cabeza en (x, 92))
  const resp = (x, y = 92, fx = 1) => `<path d="M${x + 1 * fx},${y + 1} h${8 * fx} v6 q${-4 * fx},5 ${-9 * fx},1z" fill="#ECEFF1" stroke="${OL}" stroke-width=".9"/><circle cx="${x + 8 * fx}" cy="${y + 7}" r="3.2" fill="#E91E63" stroke="${OL}" stroke-width=".8"/>`;
  // regulador con manómetros (vista ampliada); (x,y) = centro del cuerpo
  const regulador = (x, y, s = 1, c = '#2E7D32') => `<rect x="${x - 14 * s}" y="${y - 8 * s}" width="${28 * s}" height="${16 * s}" rx="${4 * s}" fill="#CFA54A" stroke="${OL}" stroke-width="1.2"/><circle cx="${x - 16 * s}" cy="${y - 18 * s}" r="${10 * s}" fill="#fff" stroke="${OL}" stroke-width="1.5"/><circle cx="${x + 16 * s}" cy="${y - 18 * s}" r="${10 * s}" fill="#fff" stroke="${OL}" stroke-width="1.5"/><line x1="${x - 16 * s}" y1="${y - 18 * s}" x2="${x - 20 * s}" y2="${y - 24 * s}" stroke="#C62828" stroke-width="${1.6 * s}"/><line x1="${x + 16 * s}" y1="${y - 18 * s}" x2="${x + 21 * s}" y2="${y - 22 * s}" stroke="#C62828" stroke-width="${1.6 * s}"/><rect x="${x - 4 * s}" y="${y + 8 * s}" width="${8 * s}" height="${12 * s}" fill="#CFA54A" stroke="${OL}"/><rect x="${x + 14 * s}" y="${y - 4 * s}" width="${14 * s}" height="${8 * s}" rx="${2 * s}" fill="${c}" stroke="${OL}"/>`;
  // válvula antirretroceso (cilindro de bronce pequeño)
  const vAnti = (x, y, s = 1) => `<rect x="${x}" y="${y - 6 * s}" width="${26 * s}" height="${12 * s}" rx="${3 * s}" fill="#D4A537" stroke="${OL}" stroke-width="1.2"/><path d="M${x + 6 * s},${y} l${6 * s},${-4 * s} v${8 * s}z M${x + 14 * s},${y} l${6 * s},${-4 * s} v${8 * s}z" fill="#8D6E00"/>`;
  // soplete de oxicorte en la mano (hx,hy) apuntando a (ax,ay) con llama
  const soplete = (hx, hy, ax, ay, llama = true) => `<line x1="${hx - 4}" y1="${hy + 2}" x2="${ax}" y2="${ay}" stroke="#B8860B" stroke-width="4" stroke-linecap="round"/><circle cx="${hx + 4}" cy="${hy}" r="2.6" fill="#2E7D32"/><circle cx="${hx + 9}" cy="${hy - 1}" r="2.6" fill="#C62828"/>`
    + (llama ? `<g transform="translate(${ax},${ay}) rotate(${(Math.atan2(ay - hy, ax - hx) * 180 / Math.PI).toFixed(0)})"><path class="soLla" d="M0,-3 q10,0 16,3 q-6,3 -16,3z" fill="#4FC3F7"/><path d="M0,-1.6 q5,0 7,1.6 q-2,1.6 -7,1.6z" fill="#E1F5FE"/></g>` : '');
  // mangueras de oxicorte desde (x1,y1) a la mano
  const mangueras = (x1, y1, hx, hy) => `<path d="M${x1},${y1} q20,60 ${(hx - x1) * .6},50 q${(hx - x1) * .3},-6 ${(hx - x1) * .4},${hy - y1 - 50}" stroke="#2E7D32" stroke-width="2.6" fill="none"/><path d="M${x1 + 4},${y1 + 4} q22,58 ${(hx - x1) * .6 - 2},48 q${(hx - x1) * .3},-6 ${(hx - x1) * .4 - 2},${hy - y1 - 52}" stroke="#C62828" stroke-width="2.6" fill="none"/>`;
  // material combustible: trapos, cartón, pallet, tarro de diluyente
  const pallet = (x, y) => `<rect x="${x}" y="${y - 12}" width="50" height="4" fill="#A1887F" stroke="#5D4037"/><rect x="${x}" y="${y - 4}" width="50" height="4" fill="#A1887F" stroke="#5D4037"/><rect x="${x + 2}" y="${y - 8}" width="8" height="4" fill="#8D6E63"/><rect x="${x + 21}" y="${y - 8}" width="8" height="4" fill="#8D6E63"/><rect x="${x + 40}" y="${y - 8}" width="8" height="4" fill="#8D6E63"/>`;
  const carton = (x, y, w = 30, h = 22) => `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="#C8A165" stroke="#8D6E63"/><path d="M${x},${y - h + 6} h${w}" stroke="#A1887F"/>`;
  const trapos = (x, y) => `<path d="M${x},${y} q4,-12 14,-10 q8,-8 16,0 q8,0 6,10z" fill="#E0E0E0" stroke="#9E9E9E"/><path d="M${x + 8},${y - 4} q6,-4 12,0" stroke="#90A4AE" fill="none"/>`;
  const tarro = (x, y, t = 'DILUYENTE') => `<rect x="${x}" y="${y - 26}" width="20" height="26" rx="2" fill="#FBC02D" stroke="${OL}"/><rect x="${x + 2}" y="${y - 20}" width="16" height="12" fill="#fff"/>` + T(x + 10, y - 11, t.slice(0, 5), 4.6, '#C62828') + `<path d="M${x + 10},${y - 6} l3,4 h-6z" fill="#C62828"/>`;
  const tambor = (x, y, t = 'COMBUSTIBLE') => `<rect x="${x}" y="${y - 44}" width="34" height="44" rx="3" fill="#1565C0" stroke="${OL}" stroke-width="1.2"/><path d="M${x},${y - 30} h34 M${x},${y - 14} h34" stroke="#0D47A1" stroke-width="2"/><rect x="${x + 2}" y="${y - 27}" width="30" height="11" fill="#fff"/>` + T(x + 17, y - 19, t, 4, '#C62828');
  const manta = (x, y, w = 70) => `<path d="M${x},${y} v-30 q${w / 2},-8 ${w},0 v30z" fill="#ECEFF1" stroke="#90A4AE" stroke-width="1.5"/>${[1, 2, 3, 4].map(i => `<line x1="${x + i * w / 5}" y1="${y - 32}" x2="${x + i * w / 5}" y2="${y}" stroke="#CFD8DC"/>`).join('')}`;
  // permiso de trabajo (papel)
  const permiso = (x, y, s = 1) => `<rect x="${x}" y="${y}" width="${70 * s}" height="${90 * s}" rx="3" fill="#fff" stroke="#90A4AE" stroke-width="1.5"/><rect x="${x}" y="${y}" width="${70 * s}" height="${16 * s}" rx="3" fill="#E65100"/>` + T(x + 35 * s, y + 7 * s, 'PERMISO', 6.5 * s, '#fff') + T(x + 35 * s, y + 13.5 * s, 'TRABAJO EN CALIENTE', 4.4 * s, '#fff')
    + [0, 1, 2, 3, 4].map(i => `<rect x="${x + 6 * s}" y="${y + (22 + i * 11) * s}" width="${6 * s}" height="${6 * s}" fill="#fff" stroke="${OL}" stroke-width=".8"/><path d="M${x + 7 * s},${y + (25 + i * 11) * s} l${2 * s},${2 * s} l${3 * s},${-4 * s}" stroke="#2E7D32" stroke-width="${1.4 * s}" fill="none"/><line x1="${x + 16 * s}" y1="${y + (25 + i * 11) * s}" x2="${x + 62 * s}" y2="${y + (25 + i * 11) * s}" stroke="#B0BEC5" stroke-width="${1.6 * s}"/>`).join('')
    + `<path d="M${x + 10 * s},${y + 84 * s} q6,-8 10,0 t10,0 t10,-2" stroke="#1565C0" stroke-width="1.2" fill="none"/><line x1="${x + 8 * s}" y1="${y + 86 * s}" x2="${x + 62 * s}" y2="${y + 86 * s}" stroke="${OL}" stroke-width=".8"/>`;
  // reloj
  const reloj = (x, y, r = 22, t = '30 min') => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#1565C0" stroke-width="3"/><path d="M${x},${y} V${y - r * .7} M${x},${y} L${x + r * .5},${y + r * .3}" stroke="${OL}" stroke-width="2.4" stroke-linecap="round"/><path d="M${x},${y - r} A${r},${r} 0 0 1 ${x},${y + r}" stroke="#2E7D32" stroke-width="5" fill="none" opacity=".5"/>` + (t ? pl(x, y + r + 4, t, '#1565C0', 10) : '');
  // fuego pequeño
  const fuego = (x, y, s = 1) => `<g class="adPul"><path d="M${x},${y} q${-12 * s},${-6 * s} ${-4 * s},${-24 * s} q${2 * s},${8 * s} ${6 * s},${8 * s} q${-2 * s},${-12 * s} ${8 * s},${-20 * s} q${-2 * s},${16 * s} ${6 * s},${20 * s} q${6 * s},${10 * s} ${-2 * s},${16 * s}z" fill="#FF7043"/><path d="M${x + 1 * s},${y - 2 * s} q${-5 * s},${-4 * s} 0,${-12 * s} q${3 * s},${6 * s} ${6 * s},${4 * s} q${2 * s},${6 * s} ${-6 * s},${8 * s}z" fill="#FFD54F"/></g>`;
  // chispero (encendedor de fricción)
  const chispero = (x, y, s = 1) => `<path d="M${x + 50 * s},${y - 44 * s} L${x},${y} L${x + 52 * s},${y - 22 * s}" stroke="#78909C" stroke-width="${3.2 * s}" fill="none" stroke-linejoin="round"/><circle cx="${x}" cy="${y}" r="${4 * s}" fill="none" stroke="#78909C" stroke-width="${2.4 * s}"/><path d="M${x + 44 * s},${y - 50 * s} h${16 * s} l${-4 * s},${12 * s} h${-8 * s}z" fill="#546E7A" stroke="${OL}"/><rect x="${x + 48 * s}" y="${y - 26 * s}" width="${10 * s}" height="${7 * s}" fill="#455A64" stroke="${OL}"/>`;
  const fosforo = (x, y, s = 1) => `<line x1="${x}" y1="${y}" x2="${x + 30 * s}" y2="${y - 30 * s}" stroke="#D7B98E" stroke-width="${3.5 * s}" stroke-linecap="round"/><circle cx="${x + 31 * s}" cy="${y - 31 * s}" r="${3.5 * s}" fill="#C62828"/>` + fuego(x + 33 * s, y - 32 * s, .6 * s);
  // burbujas (agua jabonosa en una fuga)
  const burbujas = (x, y) => `<g class="soBur">${[[0, 0, 3], [6, -4, 2.4], [-5, -6, 2], [3, -10, 2.8], [9, -12, 1.8]].map(([a, b, r]) => `<circle cx="${x + a}" cy="${y + b}" r="${r}" fill="#E1F5FE" stroke="#4FC3F7" stroke-width="1"/>`).join('')}</g>`;
  const brocha = (x, y) => `<rect x="${x}" y="${y}" width="20" height="5" rx="2" fill="#8D6E63" stroke="${OL}" stroke-width=".8"/><rect x="${x + 20}" y="${y - 2}" width="6" height="9" fill="#90A4AE" stroke="${OL}" stroke-width=".8"/><path d="M${x + 26},${y - 2} h6 v9 h-6z" fill="#FFF59D" stroke="#BDB76B" stroke-width=".8"/>`;
  // carro de mano para un cilindro (porta cilindro de dos ruedas), inclinado
  const carroCil = (x, y, gas = 'oxigeno') => `<g transform="rotate(-14 ${x} ${y - 8})">${H.cilindro(x - 4, y - 14, gas, { h: 80 })}<path d="M${x - 8},${y - 6} V${y - 104} h-8" stroke="#455A64" stroke-width="3.5" fill="none"/><rect x="${x - 10}" y="${y - 12}" width="30" height="4" fill="#455A64"/>${H.cadena(x - 8, y - 70, x + 18)}</g><circle cx="${x - 6}" cy="${y - 7}" r="7" fill="#263238"/><circle cx="${x - 6}" cy="${y - 7}" r="2.5" fill="#90A4AE"/>`;
  // muro con soporte para cadena de cilindros
  const soporte = (x, y) => `<rect x="${x - 3}" y="${y - 4}" width="6" height="8" fill="#455A64"/>`;
  // tobera / tungsteno ampliado
  const tungsteno = (x, y, s = 1) => `<rect x="${x}" y="${y - 3 * s}" width="${60 * s}" height="${6 * s}" fill="#9E9E9E" stroke="${OL}" stroke-width="1"/><path d="M${x + 60 * s},${y - 3 * s} l${12 * s},${3 * s} l${-12 * s},${3 * s}z" fill="#BDBDBD" stroke="${OL}" stroke-width="1"/><rect x="${x}" y="${y - 3 * s}" width="${6 * s}" height="${6 * s}" fill="#C62828"/>`;
  // enchufe desconectado
  const enchufe = (x, y) => `<rect x="${x}" y="${y}" width="22" height="28" rx="3" fill="#ECEFF1" stroke="${OL}"/><circle cx="${x + 7}" cy="${y + 12}" r="2" fill="#263238"/><circle cx="${x + 15}" cy="${y + 12}" r="2" fill="#263238"/>`;
  const clavija = (x, y) => `<rect x="${x}" y="${y}" width="16" height="12" rx="2" fill="#263238"/><rect x="${x + 16}" y="${y + 2}" width="6" height="2" fill="#B0BEC5"/><rect x="${x + 16}" y="${y + 8}" width="6" height="2" fill="#B0BEC5"/><path d="M${x},${y + 6} q-20,4 -30,20" stroke="#111" stroke-width="2.4" fill="none"/>`;

  // =====================================================================
  // 1 · SOLDADURA AL ARCO (ELECTRODO)
  // =====================================================================
  const fArco = () => H.fondo.soldadura();
  S.al_so_arco_intro = () => svg(fArco() + H.maqSoldar(20, 165, 'ARCO') + cables(20, 104) + escSold(104) + pl(160, 30, 'Arco eléctrico: más de 3.000 °C', '#C62828', 11));
  S.al_so_arco_epp = () => svg(fArco() + W(160, 182, { area: 'soldadura', careta: true, boots: '#8D6E63', s: 1.5 })
    + `<path d="M118,46 L146,70 M118,104 L150,110 M206,100 L180,126 M98,152 L148,170 M190,168 L174,178" stroke="#455A64" stroke-width="1.5"/>`
    + pl(64, 36, 'Careta con filtro', '#1565C0', 10) + pl(62, 94, 'Chaqueta descarne', '#6D4C41', 10) + pl(258, 86, 'Guantes descarne', '#6D4C41', 10) + pl(64, 142, 'Polainas', '#6D4C41', 10) + pl(262, 158, 'Zapatos de seguridad', '#37474F', 10));
  S.al_so_arco_epp_q = () => svg(fArco() + W(160, 182, { area: 'soldadura', careta: true, boots: '#8D6E63', s: 1.5 }) + T(270, 60, '?', 40, '#1565C0'));
  S.al_so_arco_filtro = () => svg(H.fondo.liso('#ECEFF1') + `<g transform="translate(70,100) scale(4.2)">${H.careta(0, 0, 1, 1)}</g>`
    + `<rect x="186" y="54" width="100" height="60" rx="6" fill="#1B5E20" stroke="${OL}" stroke-width="2"/><rect x="194" y="62" width="84" height="44" rx="3" fill="#2E7D32" opacity=".7"/>` + T(236, 90, 'N° 10 a 13', 14, '#fff')
    + flecha(140, 96, 182, 86, '#1565C0', 3) + pl(236, 124, 'Filtro oscuro', '#1565C0', 10) + pl(236, 150, 'Mica limpia y sin trizaduras', '#2E7D32', 10));
  S.al_so_arco_filtro_q = () => svg(H.fondo.liso('#ECEFF1') + `<g transform="translate(70,100) scale(4.2)">${H.careta(0, 0, 1, 1)}</g>`
    + `<rect x="186" y="54" width="100" height="60" rx="6" fill="#1B5E20" stroke="${OL}" stroke-width="2"/><rect x="194" y="62" width="84" height="44" rx="3" fill="#2E7D32" opacity=".7"/>` + T(236, 92, 'N° ?', 16, '#fff') + flecha(140, 96, 182, 86, '#1565C0', 3));
  S.al_so_arco_cables = () => svg(fArco() + H.maqSoldar(20, 165, 'ARCO') + cables(20, 104) + escSold(104, { arco: false })
    + `<circle cx="208" cy="110" r="13" fill="none" stroke="#2E7D32" stroke-width="3" class="adPul"/>` + pl(232, 70, 'Tierra cerca de la unión', '#2E7D32', 10) + pl(60, 26, 'Cables sanos, sin parches', '#1565C0', 10));
  S.al_so_arco_agua = () => svg(fArco() + `<line x1="160" y1="12" x2="160" y2="188" stroke="#fff" stroke-width="4"/>` + H.charco(62, 174, 40) + W(58, 165, { area: 'soldadura', careta: true, pose: 'carry', gloves: '#8D9BA3' })
    + portaE(75, 114, 100, 109) + `<path d="M50,100 l-4,8 l5,0 l-4,9" stroke="#FFC20E" stroke-width="2.4" fill="none" class="soRay"/>` + H.no(140, 30, 14)
    + `<rect x="196" y="160" width="76" height="8" fill="#8D6E63" stroke="#5D4037"/>` + W(232, 160, { area: 'soldadura', careta: true, pose: 'carry' }) + portaE(249, 109, 272, 104) + H.si(298, 30, 14)
    + pl(62, 182, 'Piso mojado', '#C62828', 10) + pl(234, 182, 'Tarima seca', '#2E7D32', 10));
  S.al_so_arco_uv = () => svg(H.fondo.liso('#EDE7F6') + ojo(96, 90, 52, true) + `<rect x="220" y="62" width="84" height="60" rx="10" fill="#37474F"/>` + H.plancha(232, 102, 60, 5) + arcoF(256, 96) + H.chispas(258, 97, 6) + rayos(240, 92, 165, 195, 60)
    + pl(96, 150, 'Ojo de arco', '#C62828', 11) + pl(250, 150, 'Radiación UV', '#6A1B9A', 11) + T(96, 30, 'Arena en los ojos, ardor, lagrimeo', 10, '#C62828'));
  S.al_so_arco_uv_q = () => svg(H.fondo.liso('#EDE7F6') + ojo(96, 90, 52, true) + `<rect x="220" y="62" width="84" height="60" rx="10" fill="#37474F"/>` + H.plancha(232, 102, 60, 5) + arcoF(256, 96) + H.chispas(258, 97, 6) + rayos(240, 92, 165, 195, 60));
  S.al_so_arco_biombo = () => svg(fArco() + W(40, 165, { area: 'taller', pose: 'walk' }) + H.biombo(80, 165, 56) + rayos(190, 109, 170, 200, 54) + escSold(150, { w: 110 }) + H.si(28, 30, 14) + pl(108, 168, 'Biombo', '#C62828', 10));
  S.al_so_arco_mirar = () => svg(fArco() + `<line x1="160" y1="12" x2="160" y2="188" stroke="#fff" stroke-width="4"/>` + escSold(30, { w: 100 }).replace(/<g class="adChis">[\s\S]*?<\/g>/, '') + W(130, 165, { area: 'taller', pose: 'stand', flip: true, glasses: false, face: 'pain' }) + rayos(73, 109, -40, 10, 54) + H.no(140, 30, 14)
    + W(196, 165, { area: 'soldadura', careta: true, pose: 'carry' }) + portaE(213, 114, 238, 109) + H.mesaSoldar(218, 165, 90) + H.plancha(226, 115, 70, 5) + arcoF(239, 109) + H.chispas(241, 110, 6) + H.si(298, 30, 14));
  S.al_so_arco_escoria = () => svg(fArco() + H.mesaSoldar(120, 165, 120) + H.plancha(130, 115, 96, 5) + `<path d="M140,110 h70" stroke="#5D4037" stroke-width="3" stroke-dasharray="3 2"/>`
    + W(98, 165, { area: 'soldadura', careta: true, pose: 'carry' }) + `<line x1="115" y1="114" x2="150" y2="104" stroke="#455A64" stroke-width="3"/><path d="M150,104 l5,4" stroke="#455A64" stroke-width="3"/>` + H.chispas(156, 108, 5) + T(190, 98, 'CALIENTE', 9, '#C62828') + pl(220, 34, 'La escoria salta caliente', '#E65100', 10));

  SI_CONT.temas.push({
    id: 'so_arco', sec: 'soldadura', emp: ['ali'], title: 'Soldadura al arco (electrodo)', thumb: 'al_so_arco_intro', mins: 15,
    learn: [
      { s: 'al_so_arco_intro', t: 'El arco: calor, luz y corriente', x: 'Al soldar con electrodo, la corriente salta entre el electrodo y la pieza y forma un <b>arco eléctrico de más de 3.000 °C</b>. Ese arco trae varios riesgos a la vez:<ul><li><b>Radiación</b> ultravioleta e infrarroja (ojos y piel).</li><li><b>Quemaduras</b> por chispas, escoria y piezas calientes.</li><li><b>Choque eléctrico</b> por cables, pinza o ropa mojada.</li><li><b>Humos metálicos</b> e <b>incendio</b>.</li></ul>Solo suelda quien está capacitado y autorizado por su jefatura.' },
      { s: 'al_so_arco_epp', t: 'El EPP del soldador', x: 'Para soldar al arco, siempre completo:<ul><li><b>Careta de soldar</b> con el filtro adecuado y, debajo, tus <b>lentes de seguridad</b>.</li><li><b>Chaqueta de descarne</b> cerrada hasta el cuello, con mangas sobre los guantes.</li><li><b>Guantes de descarne</b> de puño largo, secos y sin hoyos.</li><li><b>Polainas</b> de descarne sobre los zapatos y bajo el pantalón.</li><li><b>Zapatos de seguridad</b>.</li></ul>Ropa de algodón o ignífuga, sin bolsillos abiertos ni pantalón doblado donde se metan las chispas. Nada de poliéster ni de joyas.', k: 'Careta, chaqueta, guantes, polainas y zapatos de seguridad: sin el EPP completo no se suelda.' },
      { s: 'al_so_arco_filtro', t: 'La careta y su filtro', x: '<ul><li>Para electrodo se usa normalmente un <b>filtro N° 10 a 13</b>: más amperaje, filtro más oscuro.</li><li>La <b>mica transparente</b> que protege el filtro debe estar limpia y sin trizaduras; cámbiala si está picada de chispas.</li><li>Si tu careta es <b>fotosensible</b> (se oscurece sola), revisa antes de soldar que oscurezca bien y que la batería esté buena.</li><li>Una careta trizada o con luz por los bordes no protege: pide el cambio.</li></ul>' },
      { s: 'al_so_arco_cables', t: 'Cables y pinza de tierra', x: 'Antes de empezar, revisa con la máquina apagada:<ul><li>Cables <b>sin cortes, sin cobre a la vista y sin parches</b> con huincha.</li><li>Conexiones apretadas en la máquina y en la pinza porta electrodo.</li><li><b>Pinza de tierra conectada a la pieza, cerca de la unión</b> que vas a soldar, nunca a través de cadenas, cilindros o el puente grúa.</li><li>Cables ordenados, sin cruzar el paso ni quedar bajo piezas o ruedas.</li></ul>Si algo está malo, no lo uses y avisa a tu jefatura.' },
      { s: 'al_so_arco_agua', t: 'Nunca mojado ni sobre agua', x: 'El agua conduce la corriente. Por eso:<ul><li><b>No sueldes con ropa o guantes húmedos</b> o transpirados: cámbialos.</li><li><b>No te pares en agua</b> ni en piso mojado: usa una tarima seca o una goma aislante.</li><li>Cambia el electrodo con el guante seco, nunca con la mano desnuda.</li><li>No apoyes el cuerpo en la pieza o la mesa mientras sueldas.</li></ul>Si sientes un cosquilleo o una descarga, <b>detente</b>, apaga la máquina y avisa de inmediato.' },
      { s: 'al_so_arco_uv', t: 'Radiación: quemaduras y "ojo de arco"', x: 'El arco emite radiación ultravioleta (UV) aunque no la sientas:<ul><li>En la <b>piel</b> expuesta (cuello, muñecas, entre el guante y la manga) produce <b>quemaduras como las del sol</b> en pocos minutos.</li><li>En los <b>ojos</b> produce el <b>"ojo de arco"</b>: horas después aparece sensación de arena, ardor, lagrimeo y mucho dolor, a veces de noche.</li><li>También lo sufre quien mira de lado o recibe el reflejo.</li></ul>Si te pasa, no te frotes los ojos ni uses remedios caseros: avisa y consulta en la ACHS.' },
      { s: 'al_so_arco_biombo', t: 'Biombos: protege a los demás', x: 'La luz del arco daña los ojos de cualquiera que la mire, aunque esté a varios metros.<ul><li>Suelda dentro del área de soldadura o rodeado de <b>biombos o cortinas de soldar</b>.</li><li>Si tienes que soldar fuera de esa área, pon biombos hacia los pasillos y los puestos vecinos.</li><li>Quien pasa cerca debe ir por la vía peatonal y no mirar el arco.</li></ul>', k: 'Biombo puesto hacia los demás antes de encender el arco.' },
      { s: 'al_so_arco_mirar', t: 'Nunca mires el arco sin careta', x: '<ul><li><b>Baja la careta antes</b> de encender el arco, nunca después.</li><li>Si hay alguien cerca, avísale antes de encender.</li><li>Si ayudas sosteniendo o mirando una pieza, tú también usas careta o lentes con filtro.</li><li>Nunca mires el arco "solo un segundo" con los ojos descubiertos o con lentes comunes: los lentes de seguridad no filtran el arco.</li></ul>' },
      { s: 'al_so_arco_escoria', t: 'Picar escoria y terminar', x: '<ul><li>Al <b>picar la escoria</b> salen trozos calientes: hazlo con lentes de seguridad y careta, hacia el lado contrario a tu cara y a los demás.</li><li>La pieza recién soldada quema aunque no esté roja: márcala como <b>CALIENTE</b> y tómala con tenaza.</li><li>Al soltar la pinza, <b>saca el electrodo y cuélgala</b>: nunca la dejes sobre la mesa o la pieza.</li><li>Colillas de electrodo al recipiente, no al suelo.</li><li>Al terminar, apaga la máquina y ordena los cables.</li></ul>' }
    ],
    quiz: [
      { s: 'al_so_arco_epp_q', v: [
        { q: '¿Qué EPP necesitas para soldar al arco con electrodo?', o: ['Careta, chaqueta y guantes de descarne, polainas y zapatos', 'Lentes oscuros de sol, guantes de goma y zapatos de seguridad', 'Careta facial transparente, polera y guantes de lana', 'Solo la careta, porque el resto es opcional'], w: 'Para soldar al arco: careta con filtro (y lentes debajo), chaqueta y guantes de descarne, polainas y zapatos de seguridad.' },
        { q: 'Vas a soldar y hace calor. ¿Puedes soldar con polera de poliéster y sin chaqueta?', o: ['No, uso la chaqueta de descarne cerrada', 'Sí, si sueldo solo un rato corto', 'Sí, si me pongo bloqueador en los brazos', 'Sí, si la polera es de manga larga'], w: 'El poliéster se derrite y se pega a la piel con las chispas, y la radiación quema la piel expuesta. Se usa la chaqueta de descarne.' },
        { q: 'Las polainas se usan para que las chispas y la escoria no entren al zapato.', vf: true, w: 'Verdadero. Las polainas cubren el empeine y los cordones y evitan quemaduras en los pies.' } ] },
      { s: 'al_so_arco_filtro_q', v: [
        { q: '¿Qué filtro usa normalmente la careta para soldar con electrodo?', o: ['Un filtro N° 10 a 13, según el amperaje', 'Un filtro N° 3, como lentes de sol', 'Una mica transparente sin filtro', 'Cualquiera, todos los filtros son iguales'], w: 'Para electrodo se usa normalmente un filtro N° 10 a 13: a más amperaje, filtro más oscuro.' },
        { q: 'La mica de tu careta está trizada y picada de chispas. ¿Qué haces?', o: ['Pido el cambio de la mica antes de soldar', 'Sigo soldando hasta que se rompa del todo', 'La pego con huincha transparente', 'Saco la mica y sueldo solo con el filtro'], w: 'Una mica dañada o una careta trizada deja de proteger: se cambia antes de soldar.' },
        { q: 'Con una careta fotosensible no hace falta revisar nada antes de soldar.', vf: false, w: 'Falso. Hay que revisar que oscurezca bien y que la batería esté buena antes de encender el arco.' } ] },
      { s: 'al_so_arco_cables', v: [
        { q: '¿Dónde se conecta la pinza de tierra?', o: ['En la pieza, cerca de la unión que se va a soldar', 'En la cadena del puente grúa que sostiene la pieza', 'En el cilindro de gas que está más cerca', 'En cualquier fierro del galpón, aunque esté lejos'], w: 'La tierra va en la pieza, cerca de la soldadura. Si la corriente pasa por cadenas, cilindros o el puente grúa, los puede dañar o causar un accidente.' },
        { q: 'Encuentras el cable de la pinza con el cobre a la vista. ¿Qué haces?', o: ['No lo uso y aviso para que lo cambien', 'Le pongo huincha aislante y sigo soldando', 'Lo uso con cuidado de no tocar esa parte', 'Lo tapo con un trapo para no verlo'], w: 'Un cable dañado puede dar un choque eléctrico. No se parcha: se saca de uso y se avisa.' },
        { q: 'Los cables de soldar pueden cruzar el pasillo si se pasan rápido.', vf: false, w: 'Falso. Los cables van ordenados, fuera del paso: si cruzan el pasillo, alguien tropieza o una rueda los corta.' } ] },
      { s: 'al_so_arco_agua', v: [
        { q: 'Tus guantes de descarne están mojados de transpiración. ¿Qué haces?', o: ['Me cambio a guantes secos antes de seguir', 'Sigo soldando, se secan con el calor', 'Me saco los guantes y sueldo a mano', 'Los seco apoyándolos en la pieza caliente'], w: 'La humedad conduce la corriente: con guantes o ropa húmeda aumenta el riesgo de choque eléctrico.' },
        { q: 'Hay agua en el piso donde tienes que soldar. ¿Qué corresponde?', o: ['Secar o usar una tarima seca', 'Soldar rápido para salir pronto de ahí', 'Pararse en la punta de los pies', 'Ponerse botas de goma y soldar igual'], w: 'Nunca se suelda parado en agua: se seca el lugar o se usa una tarima seca o goma aislante.' },
        { q: 'Si sientes un cosquilleo eléctrico mientras sueldas, te detienes, apagas y avisas.', vf: true, w: 'Verdadero. Es una señal de falla o de humedad: se detiene el trabajo y se avisa de inmediato.' } ] },
      { s: 'al_so_arco_uv_q', v: [
        { q: '¿Qué es el "ojo de arco"?', o: ['Una quemadura de los ojos por la radiación del arco', 'Una basura metálica que entra en el ojo', 'Un cansancio normal de la vista al final del día largo', 'Una alergia al humo de la soldadura'], w: 'Es una quemadura de la córnea por la radiación UV del arco. Aparece horas después, con ardor, lagrimeo y sensación de arena.' },
        { q: 'En la noche te arden los ojos y sientes arena después de soldar. ¿Qué haces?', o: ['No me froto, aviso y consulto en la ACHS', 'Me echo leche o papa cruda en los ojos', 'Me froto fuerte para sacar la arena', 'Espero a que se pase y mañana sigo soldando igual'], w: 'Puede ser ojo de arco. No se frotan los ojos ni se usan remedios caseros: se avisa y se consulta en la ACHS.' },
        { q: 'La radiación del arco puede quemar la piel del cuello y las muñecas como el sol.', vf: true, w: 'Verdadero. Por eso la chaqueta va cerrada hasta el cuello y las mangas sobre los guantes.' } ] },
      { s: 'al_so_arco_biombo', v: [
        { q: 'Tienes que soldar junto a un pasillo por donde pasan tus compañeros. ¿Qué haces?', o: ['Pongo biombos hacia el pasillo antes de soldar', 'Les grito que no miren y empiezo a soldar de inmediato', 'Suelda rápido para que pocos alcancen a mirar', 'Nada, cada uno se cuida solo los ojos'], w: 'Los biombos o cortinas de soldar protegen los ojos de quienes pasan cerca.' },
        { q: '¿Para qué sirven los biombos o cortinas de soldar?', o: ['Para que la luz del arco no dañe a los demás', 'Para que no se escape el calor del taller', 'Para que el soldador trabaje sin que lo vean', 'Para que no se ensucie el resto del galpón'], w: 'Bloquean la radiación del arco hacia los pasillos y puestos vecinos.' },
        { q: 'Si estás a varios metros, mirar el arco sin protección no hace daño.', vf: false, w: 'Falso. La radiación del arco daña los ojos aunque estés lejos o lo mires de lado.' } ] },
      { s: 'al_so_arco_mirar', v: [
        { q: '¿Cuándo se baja la careta?', o: ['Antes de encender el arco', 'Apenas se enciende el arco', 'Solo si el arco dura mucho rato', 'Cuando empiezan a molestar los ojos'], w: 'La careta se baja antes de encender: el daño ocurre desde el primer destello.' },
        { q: 'Un compañero te pide que mires su soldadura mientras suelda. Solo tienes tus lentes de seguridad. ¿Qué haces?', o: ['No miro hasta tener careta o filtro adecuado', 'Miro un segundo, no alcanza a dañar', 'Miro de reojo para no recibir la luz directa', 'Miro con mis lentes, que son de seguridad'], w: 'Los lentes de seguridad protegen de partículas, no de la radiación del arco. Se necesita careta o filtro.' },
        { q: 'Los lentes de seguridad transparentes bastan para mirar el arco un segundo.', vf: false, w: 'Falso. Los lentes de seguridad no filtran la radiación del arco: se necesita careta o filtro adecuado.' } ] }
    ]
  });

  // =====================================================================
  // 2 · SOLDADURA MIG Y TIG
  // =====================================================================
  S.al_so_mig_intro = () => svg(fArco() + H.cilindro(26, 165, 'mezcla', { h: 84, capuchon: false }) + H.cadena(24, 110, 70) + soporte(22, 110) + H.maqSoldar(50, 165, 'MIG') + `<path d="M90,135 q20,30 32,4 q4,-12 9,-24" stroke="#111" stroke-width="3" fill="none"/>` + escSold(114, { mig: true, w: 110 })
    + pl(60, 30, 'MIG: alambre + gas', '#1565C0', 10) + `<rect x="206" y="44" width="104" height="40" rx="6" fill="#fff" stroke="#6A1B9A" stroke-width="1.5"/>` + tungsteno(214, 64, .9) + arcoF(285, 64) + pl(258, 22, 'TIG: tungsteno + argón', '#6A1B9A', 10));
  S.al_so_mig_cil = () => svg(fArco() + `<rect x="20" y="60" width="4" height="105" fill="#78909C"/>` + H.cilindro(30, 165, 'argon', { h: 84, capuchon: false }) + H.cilindro(56, 165, 'mezcla', { h: 84, capuchon: false }) + soporte(24, 106) + H.cadena(24, 106, 80) + soporte(80, 106)
    + regulador(40, 66, .6, '#5D6D7E') + W(130, 165, { area: 'soldadura', caretaArriba: true, pose: 'point', flip: true }) 
    + pl(56, 176, 'De pie y con cadena', '#2E7D32', 10) + pl(230, 50, 'Ábrelo lento, parado al costado', '#1565C0', 10));
  S.al_so_mig_reg = () => svg(H.fondo.liso('#E8F5E9') + `<rect x="40" y="90" width="44" height="110" rx="18" fill="#5D6D7E" stroke="${OL}" stroke-width="1.5"/><rect x="54" y="74" width="16" height="18" fill="#B0BEC5" stroke="${OL}"/>` + regulador(62, 58, 1.2, '#5D6D7E')
    + `<path d="M96,54 q60,0 90,30 t80,20" stroke="#263238" stroke-width="5" fill="none"/>` + burbujas(104, 48) + brocha(112, 64) + pl(220, 110, 'Agua jabonosa en uniones', '#1565C0', 10) + pl(240, 150, 'Manguera sin cortes', '#2E7D32', 10) + H.si(290, 30, 14));
  S.al_so_mig_uv = () => svg(fArco() + escSold(60, { mig: true, w: 110 }) + rayos(103, 109, -60, 30, 90, '#7E57C2') + rayos(103, 109, 160, 220, 60, '#7E57C2') + pl(232, 24, 'Más UV que el electrodo', '#6A1B9A', 11));
  S.al_so_mig_torcha = () => svg(fArco() + H.maqSoldar(30, 165, 'MIG') + `<path d="M70,135 q30,30 60,0 q10,-10 26,-26" stroke="#111" stroke-width="3" fill="none"/>` + W(190, 165, { area: 'soldadura', caretaArriba: true, pose: 'point', flip: true }) + `<line x1="162" y1="105" x2="148" y2="112" stroke="#263238" stroke-width="5"/>`
    + `<circle cx="148" cy="112" r="11" fill="none" stroke="#C62828" stroke-width="2.5" class="adPul"/>` + H.no(214, 52, 14) + pl(120, 26, 'Nunca hacia la cara ni hacia otro', '#C62828', 10) + pl(240, 176, 'Tobera caliente', '#E65100', 10));
  S.al_so_tig_tung = () => svg(fArco() + H.esmerilBanco(120, 165) + `<path d="M140,0 V72" stroke="#90A4AE" stroke-width="8"/><path d="M128,86 l4,-14 h16 l4,14z" fill="#FFC20E" stroke="${OL}"/>` + W(180, 165, { area: 'soldadura', pose: 'carry', flip: true, glasses: true }) + resp(180, 92, -1)
    + `<rect x="14" y="40" width="84" height="30" rx="6" fill="#fff" stroke="#90A4AE"/>` + tungsteno(20, 55, .9) + pl(56, 76, 'Tungsteno', '#455A64', 10) + pl(250, 28, 'Extracción + respirador', '#1565C0', 10));
  S.al_so_tig_torcha = () => svg(fArco() + H.mesaSoldar(60, 165, 160) + `<rect x="180" y="96" width="30" height="16" rx="3" fill="#455A64" stroke="${OL}"/><line x1="186" y1="100" x2="204" y2="88" stroke="#263238" stroke-width="5"/>` + `<path d="M204,88 q20,-10 60,10 q20,10 40,60" stroke="#263238" stroke-width="3" fill="none"/>` + H.si(240, 70, 14)
    + `<line x1="80" y1="114" x2="120" y2="108" stroke="#263238" stroke-width="5"/><path d="M118,96 q4,6 0,10 M124,94 q4,6 0,10" stroke="#E53935" stroke-width="2" fill="none" class="adHumo"/>` + H.no(100, 70, 14) + pl(100, 40, 'Sobre la mesa', '#C62828', 10) + pl(222, 40, 'En su soporte', '#2E7D32', 10));
  S.al_so_tig_pieza = () => svg(fArco() + H.mesaSoldar(70, 165, 150) + H.viga(84, 115, 110, 14) + `<rect x="120" y="96" width="40" height="5" fill="#FF7043" opacity=".7"/>` + T(140, 86, 'CALIENTE', 12, '#C62828')
    + W(260, 165, { area: 'soldadura', caretaArriba: true, pose: 'point', flip: true }) + `<path d="M196,112 l30,-6" stroke="#455A64" stroke-width="3"/><path d="M196,112 l6,-6 M196,112 l6,6" stroke="#455A64" stroke-width="3"/>` + pl(140, 30, 'Marca la pieza y usa tenaza', '#E65100', 10));

  SI_CONT.temas.push({
    id: 'so_mig_tig', sec: 'soldadura', emp: ['ali'], title: 'Soldadura MIG y TIG', thumb: 'al_so_mig_intro', mins: 15,
    learn: [
      { s: 'al_so_mig_intro', t: 'MIG y TIG: qué tienen de distinto', x: '<ul><li><b>MIG</b>: la antorcha entrega un <b>alambre continuo</b> y un <b>gas de protección</b> (mezcla de argón con CO₂, o CO₂).</li><li><b>TIG</b>: el arco sale de un <b>electrodo de tungsteno</b> que no se consume, con gas <b>argón</b>, y el material se agrega con una varilla.</li></ul>Además de los riesgos de toda soldadura (radiación, quemaduras, electricidad, humos), se suman <b>los cilindros de gas</b> y una <b>radiación UV más fuerte</b>. Solo opera estos equipos quien está capacitado y autorizado.' },
      { s: 'al_so_mig_cil', t: 'El cilindro de gas de protección', x: '<ul><li>El cilindro va <b>de pie y amarrado con cadena</b> a la máquina, al carro o al muro. Nunca suelto.</li><li>Abre la válvula <b>lento</b>, parado <b>al costado</b> del regulador, nunca de frente.</li><li>Al terminar la jornada, <b>cierra la válvula del cilindro</b>.</li><li>El argón y el CO₂ <b>desplazan el oxígeno</b>: en un foso, estanque o lugar cerrado pueden asfixiar sin olor ni aviso. Ahí se ventila y se trabaja con autorización.</li></ul>' },
      { s: 'al_so_mig_reg', t: 'Regulador y mangueras', x: '<ul><li>Usa el <b>regulador del gas que corresponde</b>, con sus manómetros sanos.</li><li>Mangueras <b>sin cortes, sin quemaduras y sin parches</b>, con conexiones apretadas.</li><li>Las fugas se buscan con <b>agua jabonosa</b> con una brocha: si salen burbujas, hay fuga. Nunca con fuego.</li><li>No cuelgues la antorcha ni las mangueras del regulador.</li></ul>Si encuentras una fuga o un regulador dañado, cierra el cilindro y avisa.' },
      { s: 'al_so_mig_uv', t: 'Más radiación UV que el electrodo', x: 'MIG y TIG producen <b>más radiación ultravioleta</b> que el electrodo, sobre todo con aluminio y acero inoxidable. Quema la piel en minutos y daña los ojos.<ul><li>Careta con el <b>filtro adecuado</b> al proceso y al amperaje.</li><li><b>Toda la piel cubierta</b>: chaqueta cerrada al cuello, guantes y mangas encima.</li><li><b>Biombos</b> hacia los demás.</li></ul>La radiación también forma <b>ozono</b>, un gas irritante: usa siempre la extracción.', k: 'Con MIG y TIG la radiación es más fuerte: nada de piel al descubierto.' },
      { s: 'al_so_mig_torcha', t: 'La antorcha MIG', x: '<ul><li><b>Nunca apuntes la antorcha</b> a tu cara ni a otra persona, y menos al apretar el gatillo: el alambre sale con fuerza y puede clavarse.</li><li>Para cambiar la boquilla, la tobera o el rollo de alambre, <b>apaga la máquina</b>.</li><li>La <b>tobera queda muy caliente</b>: no la toques sin guante.</li><li>Limpia las salpicaduras de la tobera con la herramienta adecuada, no golpeándola contra la pieza.</li></ul>' },
      { s: 'al_so_tig_tung', t: 'Afilar el tungsteno', x: 'El tungsteno se afila en punta en un esmeril.<ul><li>Hazlo en el esmeril destinado a eso, <b>con la extracción funcionando</b>.</li><li>Usa <b>lentes de seguridad y careta facial</b>, y <b>respirador</b> si así lo indica tu jefatura.</li><li>Algunos tungstenos (los de punta roja) contienen <b>torio</b>: su polvo no debe respirarse. Usa el tipo de tungsteno que indique tu jefatura.</li><li>Recoge el polvo con aspiración, nunca soplando.</li></ul>' },
      { s: 'al_so_tig_torcha', t: 'La antorcha TIG se calienta', x: '<ul><li>La antorcha TIG <b>se calienta mucho</b>, sobre todo con amperaje alto.</li><li>Déjala siempre <b>en su soporte</b>, nunca sobre la mesa, la pieza o los cables.</li><li>Si es refrigerada por agua, revisa que el agua circule y que no haya fugas.</li><li>Usa guantes TIG (más delgados) para la mano de la antorcha, pero siempre guantes.</li></ul>' },
      { s: 'al_so_tig_pieza', t: 'Piezas calientes', x: 'Una pieza recién soldada puede estar a <b>300 o 400 °C sin cambiar de color</b>.<ul><li><b>Márcala</b> con tiza o letrero: <b>CALIENTE</b>.</li><li>Muévela con <b>tenaza</b> o con guantes de descarne, nunca con la mano.</li><li>Déjala enfriar en un lugar donde nadie la toque ni la pise.</li><li>Avisa a quien venga a buscarla.</li></ul>', k: 'Toda pieza recién soldada se trata como caliente y se marca.' }
    ],
    quiz: [
      { s: 'al_so_mig_intro', v: [
        { q: '¿Qué usa la soldadura TIG para formar el arco?', o: ['Un tungsteno con gas argón', 'Un alambre continuo con gas CO₂', 'Un electrodo revestido sin gas', 'Una llama de oxígeno y acetileno'], w: 'TIG usa un electrodo de tungsteno que no se consume, protegido con argón.' },
        { q: '¿Qué entrega la antorcha en la soldadura MIG?', o: ['Alambre y gas de protección', 'Solo gas, sin material de aporte', 'Una llama de oxígeno y acetileno', 'Un electrodo de tungsteno fijo'], w: 'En MIG la antorcha entrega el alambre y el gas que protege la soldadura.' },
        { q: 'Cualquier trabajador puede usar el equipo MIG si sabe cómo se enciende.', vf: false, w: 'Falso. Solo opera estos equipos quien está capacitado y autorizado por su jefatura.' } ] },
      { s: 'al_so_mig_cil', v: [
        { q: '¿Cómo debe estar el cilindro de gas de la máquina MIG?', o: ['De pie y amarrado con cadena', 'Acostado en el piso para que no se caiga', 'Suelto, para moverlo con facilidad', 'Apoyado en la mesa de soldar'], w: 'Un cilindro suelto puede caer y romper la válvula. Va de pie y amarrado.' },
        { q: 'Vas a abrir la válvula del cilindro de argón. ¿Cómo lo haces?', o: ['Lento, parado al costado del regulador', 'De golpe, mirando el manómetro de frente', 'Con un martillo si la válvula está dura', 'Rápido, para que no se pierda el gas'], w: 'Se abre lento y al costado: si el regulador falla, no te golpea.' },
        { q: 'El argón y el CO₂ pueden asfixiar en un lugar cerrado porque desplazan el oxígeno.', vf: true, w: 'Verdadero. No tienen olor ni avisan: en lugares cerrados se ventila y se trabaja con autorización.' } ] },
      { s: 'al_so_mig_reg', v: [
        { q: '¿Cómo se busca una fuga en el regulador o las mangueras?', o: ['Con agua jabonosa y una brocha', 'Con un encendedor cerca de la unión', 'Oliendo de cerca las conexiones', 'Apretando la manguera con la mano'], w: 'Con agua jabonosa: si salen burbujas, hay fuga. Nunca con fuego.' },
        { q: 'La manguera del gas tiene un corte. ¿Qué haces?', o: ['Cierro el cilindro y aviso', 'La envuelvo con huincha aislante', 'Subo la presión para compensar', 'Sigo soldando hasta terminar la pieza'], w: 'Una manguera cortada se cambia. Se cierra el cilindro y se avisa a la jefatura.' },
        { q: 'Al terminar la jornada, basta con apagar la máquina y dejar el cilindro abierto.', vf: false, w: 'Falso. Al terminar se cierra la válvula del cilindro.' } ] },
      { s: 'al_so_mig_uv', v: [
        { q: 'Comparada con el electrodo, ¿cómo es la radiación UV de MIG y TIG?', o: ['Más fuerte: quema la piel en minutos', 'Más débil: no hace falta usar la chaqueta', 'Igual a la luz de una ampolleta', 'No tienen radiación porque usan gas'], w: 'MIG y TIG emiten más UV, sobre todo con aluminio e inoxidable.' },
        { q: 'Estás soldando TIG con la chaqueta abierta en el cuello. ¿Qué pasa?', o: ['La radiación me puede quemar el cuello', 'Nada, el TIG casi no tiene radiación', 'Solo me da más calor en el cuello, nada más', 'Mejora la ventilación y respiro mejor'], w: 'La piel expuesta se quema con la radiación UV. La chaqueta va cerrada al cuello.' },
        { q: 'La radiación del arco MIG y TIG forma ozono, un gas irritante.', vf: true, w: 'Verdadero. Por eso se usa siempre la extracción de humos.' } ] },
      { s: 'al_so_mig_torcha', v: [
        { q: 'El alambre no sale bien de la antorcha MIG. ¿Qué haces?', o: ['Apago y reviso con la antorcha lejos de mi cara', 'Miro de cerca la boquilla y aprieto el gatillo', 'Le pido a un compañero que mire mientras aprieto', 'Golpeo la antorcha contra la mesa'], w: 'El alambre sale con fuerza y puede clavarse. Nunca se apunta la antorcha a la cara ni a otro.' },
        { q: '¿Qué haces antes de cambiar la boquilla o la tobera de la antorcha MIG?', o: ['Apago la máquina y espero que se enfríe', 'Nada, se cambian con la máquina encendida', 'La enfrío metiéndola al agua', 'Aprieto el gatillo para vaciar el alambre'], w: 'Se cambia con la máquina apagada y con guantes, porque la tobera queda caliente.' },
        { q: 'La tobera de la antorcha MIG se puede tocar sin guantes apenas terminas.', vf: false, w: 'Falso. La tobera queda muy caliente y quema.' } ] },
      { s: 'al_so_tig_tung', v: [
        { q: '¿Cómo se afila el tungsteno de forma segura?', o: ['En su esmeril, con extracción, lentes y careta', 'En cualquier esmeril del taller, sin protección alguna', 'Con una lima, soplando el polvo', 'Con la amoladora, sin lentes'], w: 'Se afila en el esmeril destinado, con extracción, lentes y careta facial, y respirador si se indica.' },
        { q: 'Terminaste de afilar y hay polvo de tungsteno en el esmeril. ¿Qué haces?', o: ['Lo recojo con aspiración', 'Lo soplo con aire comprimido', 'Lo barro con la mano', 'Lo dejo para el próximo turno'], w: 'El polvo de tungsteno no debe respirarse: se recoge con aspiración, nunca soplando.' },
        { q: 'El polvo de algunos tungstenos (con torio) no debe respirarse.', vf: true, w: 'Verdadero. Por eso se afila con extracción y se usa el tungsteno que indica la jefatura.' } ] },
      { s: 'al_so_tig_pieza', v: [
        { q: 'Una pieza recién soldada ya no está roja. ¿Se puede tomar con la mano?', o: ['No, puede estar a cientos de grados', 'Sí, si ya no está roja es porque está fría', 'Sí, si la toco solo un momento', 'Sí, si la soplo un poco antes'], w: 'El acero puede estar a 300 o 400 °C sin cambiar de color.' },
        { q: '¿Qué haces con una pieza recién soldada que debe enfriarse?', o: ['La marco CALIENTE y la aparto', 'La dejo en el pasillo para que se ventile', 'La enfrío con el oxígeno del cilindro', 'La paso a un compañero para que la guarde'], w: 'Se marca como caliente, se mueve con tenaza y se deja enfriar en un lugar seguro.' },
        { q: 'Una pieza de acero que ya no está roja ya no quema.', vf: false, w: 'Falso. El acero puede estar a 300 o 400 °C sin cambiar de color: se marca y se toma con tenaza.' } ] }
    ]
  });

  // =====================================================================
  // 3 · HUMOS DE SOLDADURA Y EXTRACCIÓN
  // =====================================================================
  S.al_so_hu_intro = () => svg(fArco() + escSold(90) + H.humo(134, 104) + H.humo(126, 96) + `<circle cx="112" cy="96" r="14" fill="none" stroke="#C62828" stroke-width="2.5" class="adPul"/>` + H.no(36, 30, 14) + pl(222, 30, 'Humo directo a la cara', '#C62828', 11));
  const pulmon = (x, y, s = 1, sucio = false) => `<path d="M${x - 4 * s},${y - 40 * s} v${18 * s}" stroke="#90A4AE" stroke-width="${5 * s}"/><path d="M${x - 6 * s},${y - 22 * s} q${-30 * s},${-6 * s} ${-34 * s},${30 * s} q${-2 * s},${24 * s} ${20 * s},${22 * s} q${14 * s},${-2 * s} ${14 * s},${-20 * s}z" fill="${sucio ? '#BCAAA4' : '#F48FB1'}" stroke="${OL}" stroke-width="1.5"/><path d="M${x - 2 * s},${y - 22 * s} q${30 * s},${-6 * s} ${34 * s},${30 * s} q${2 * s},${24 * s} ${-20 * s},${22 * s} q${-14 * s},${-2 * s} ${-14 * s},${-20 * s}z" fill="${sucio ? '#BCAAA4' : '#F48FB1'}" stroke="${OL}" stroke-width="1.5"/>`
    + (sucio ? [[-24, 0], [-16, 14], [-28, 18], [18, 4], [24, 18], [12, 22], [-12, 28]].map(([a, b]) => `<circle cx="${x + a * s}" cy="${y + b * s}" r="${2.4 * s}" fill="#424242"/>`).join('') : '');
  S.al_so_hu_dano = () => svg(H.fondo.liso('#FBE9E7') + pulmon(90, 100, 1.3) + flecha(140, 110, 180, 110, '#C62828', 4) + pulmon(240, 100, 1.3, true) + pl(90, 160, 'Pulmón sano', '#2E7D32', 10) + pl(240, 160, 'Partículas metálicas', '#C62828', 10));
  S.al_so_hu_ext = () => svg(fArco() + H.extractor(140, 92) + escSold(90) + H.si(36, 30, 14) + pl(250, 30, 'Extracción encendida', '#2E7D32', 11));
  S.al_so_hu_cerca = () => svg(fArco() + `<line x1="160" y1="12" x2="160" y2="188" stroke="#fff" stroke-width="4"/>` + H.extractor(96, 40, false) + escSold(20, { w: 100 }) + H.humo(68, 104) + H.no(140, 30, 14)
    + H.extractor(222, 94) + escSold(172, { w: 100 }) + H.si(298, 30, 14) + pl(80, 180, 'Campana lejos', '#C62828', 10) + pl(236, 180, 'Campana cerca', '#2E7D32', 10));
  S.al_so_hu_cabeza = () => svg(fArco() + `<line x1="160" y1="12" x2="160" y2="188" stroke="#fff" stroke-width="4"/>` + H.mesaSoldar(60, 165, 90) + H.plancha(66, 115, 70, 5) + W(54, 165, { area: 'soldadura', careta: true, pose: 'bend' }) + arcoF(98, 112) + H.humo(98, 110) + H.no(140, 30, 14)
    + H.extractor(260, 92) + H.mesaSoldar(222, 165, 90) + H.plancha(228, 115, 70, 5) + W(206, 165, { area: 'soldadura', careta: true, pose: 'carry' }) + portaE(223, 114, 252, 109) + arcoF(253, 109) + H.si(298, 30, 14));
  S.al_so_hu_resp = () => svg(fArco() + W(110, 182, { area: 'soldadura', caretaArriba: true, s: 1.4 }) + resp(110, 182 - 73 * 1.4, 1).replace(/<path d="M([\d.]+),([\d.]+) h8 v6 q-4,5 -9,1z"/, (m) => m)
    + `<g transform="translate(220,70) scale(1.6)"><path d="M0,0 q16,-10 32,0 l3,18 q-19,15 -38,0z" fill="#ECEFF1" stroke="${OL}" stroke-width="1.6"/><circle cx="-4" cy="18" r="9" fill="#E91E63" stroke="${OL}" stroke-width="1.4"/><circle cx="36" cy="18" r="9" fill="#E91E63" stroke="${OL}" stroke-width="1.4"/></g>` + pl(250, 136, 'Filtro para humos', '#AD1457', 10) + pl(250, 30, 'Respirador bajo la careta', '#1565C0', 10));
  S.al_so_hu_galv = () => svg(fArco() + H.mesaSoldar(60, 165, 240) + `<rect x="80" y="104" width="90" height="11" fill="#CFD8DC" stroke="${OL}"/>${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${116 + i * 9},106 l4,3 l-3,3" stroke="#fff" fill="none"/>`).join('')}<rect x="80" y="104" width="30" height="11" fill="#90A4AE" stroke="${OL}"/>` + T(140, 98, 'GALVANIZADO', 8, '#455A64')
    + `<rect x="196" y="104" width="90" height="11" fill="#E8423A" stroke="${OL}"/>` + T(241, 98, 'PINTADO', 8, '#455A64') + W(40, 165, { area: 'soldadura', pose: 'point', gloves: '#C8A27A' }) + H.esmerilMano(66, 94, 0, true)
    + pl(160, 26, 'Limpia la zona antes de soldar', '#E65100', 11));
  S.al_so_hu_fiebre = () => svg(H.fondo.liso('#FFF3E0') + W(110, 172, { area: 'taller', pose: 'stand', face: 'pain', s: 1.3 }) + `<g transform="translate(150,52)"><rect x="0" y="0" width="6" height="36" rx="3" fill="#fff" stroke="${OL}"/><rect x="1.5" y="8" width="3" height="26" fill="#E53935"/><circle cx="3" cy="38" r="5" fill="#E53935" stroke="${OL}"/></g>` + reloj(250, 70, 24, '4 a 12 horas después')
    + pl(110, 30, 'Fiebre, escalofríos, sabor metálico', '#C62828', 10));
  S.al_so_hu_aviso = () => svg(fArco() + H.extractor(140, 92, false) + `<rect x="54" y="20" width="24" height="16" rx="3" fill="#455A64"/><circle cx="66" cy="28" r="5" fill="#9E9E9E"/>` + T(140, 64, 'APAGADO', 9, '#C62828') + H.mesaSoldar(110, 165, 100) + H.plancha(118, 115, 78, 5)
    + W(70, 165, { area: 'soldadura', caretaArriba: true, pose: 'stop' }) + W(240, 165, { area: 'taller', pose: 'stand', flip: true }) + globo(170, 64, '¡El extractor no aspira!', 140, '#C62828'));

  SI_CONT.temas.push({
    id: 'so_humos', sec: 'soldadura', emp: ['ali'], title: 'Humos de soldadura y extracción', thumb: 'al_so_hu_ext', mins: 15,
    learn: [
      { s: 'al_so_hu_intro', t: '¿Qué son los humos de soldadura?', x: 'Al soldar, el metal se evapora y se enfría en el aire como <b>partículas metálicas finísimas</b> (de hierro, manganeso, cromo, níquel, zinc), junto con <b>gases</b> como ozono y monóxido de carbono.<ul><li>Son tan finas que <b>llegan al fondo de los pulmones</b>.</li><li>El humo sube derecho desde el arco: si te inclinas sobre la pieza, lo respiras entero.</li></ul>' },
      { s: 'al_so_hu_dano', t: 'Cómo dañan tu salud', x: '<ul><li><b>Al momento</b>: irritación de nariz, garganta y ojos, tos, dolor de cabeza.</li><li><b>Con los años</b>: bronquitis crónica, asma, daño pulmonar permanente y <b>cáncer de pulmón</b>; los humos de soldadura están clasificados como cancerígenos.</li><li>El <b>manganeso</b> puede dañar el sistema nervioso; el <b>cromo y el níquel</b> del acero inoxidable son especialmente peligrosos.</li></ul>El daño se acumula sin dolor: cuando aparecen los síntomas, ya es tarde.' },
      { s: 'al_so_hu_ext', t: 'ALI tiene extracción: úsala siempre', x: 'Maestranza ALI tiene <b>extracción de humos de soldadura</b>. Es tu principal protección para los pulmones.<ul><li><b>Enciéndela antes</b> de empezar a soldar y apágala al terminar.</li><li>Úsala <b>siempre</b>, aunque sea "un punto" o una soldadura corta.</li><li>No la uses para otra cosa ni la desarmes.</li></ul>', k: 'Si sueldas, la extracción está encendida y bien ubicada. Siempre.' },
      { s: 'al_so_hu_cerca', t: 'Campana cerca y bien ubicada', x: 'La campana solo capta el humo si está <b>cerca de la soldadura</b>: a poca distancia, al lado o un poco por encima del punto donde sueldas.<ul><li>A medio metro o más, <b>ya casi no aspira</b>.</li><li>Cuando avances por la pieza, <b>mueve la campana</b> contigo.</li><li>Que no apunte tan encima que se lleve el gas de protección (en MIG y TIG).</li></ul>' },
      { s: 'al_so_hu_cabeza', t: 'La cabeza fuera del humo', x: 'El humo sube como una columna desde el arco.<ul><li><b>No te inclines sobre la pieza</b>: mantén la cabeza a un lado de la columna de humo.</li><li>Si puedes, gira la pieza o cambia tu posición para que el humo no pase por tu cara.</li><li>En lugares cerrados (dentro de estanques, cajones, fosos) el humo se acumula: se trabaja solo con autorización, ventilación y respirador.</li></ul>' },
      { s: 'al_so_hu_resp', t: 'Respirador cuando corresponde', x: 'Cuando la extracción no alcanza a captar todo el humo, se agrega un <b>respirador</b>:<ul><li>Al soldar <b>acero inoxidable, galvanizado o piezas pintadas</b>.</li><li>En <b>lugares cerrados</b> o en faenas sin extracción.</li><li>Cuando lo indique tu jefatura o el procedimiento.</li></ul>Debe ser un respirador con <b>filtro para humos metálicos</b>, que quepa bajo la careta. Afeitado para que selle, y filtros cambiados a tiempo. La mascarilla desechable común no sirve.' },
      { s: 'al_so_hu_galv', t: 'Galvanizado y pintado: más tóxico', x: 'Las piezas <b>galvanizadas</b> (zinc), <b>pintadas</b>, con aceite o con solventes producen humos <b>mucho más tóxicos</b>.<ul><li><b>Limpia la zona antes</b> de soldar: esmerila el galvanizado o la pintura unos centímetros a cada lado de la unión.</li><li>Elimina aceite y grasa. Nunca suelde piezas recién lavadas con solventes: algunos forman gases muy tóxicos con el arco.</li><li>Extracción encendida y respirador.</li></ul>' },
      { s: 'al_so_hu_fiebre', t: 'Fiebre de los humos metálicos', x: 'Respirar humo de zinc (galvanizado), cobre o bronce puede causar la <b>fiebre de los humos metálicos</b>:<ul><li>Aparece <b>4 a 12 horas después</b>, muchas veces en la noche.</li><li>Parece gripe: <b>fiebre, escalofríos, dolor de cuerpo, tos, sabor metálico</b>.</li><li>Tomar leche no la previene: lo que la previene es la extracción y el respirador.</li></ul>Si te pasa, <b>avisa a tu jefatura</b> y consulta en la ACHS: es una enfermedad del trabajo.' },
      { s: 'al_so_hu_aviso', t: 'Si el extractor no funciona, avisa', x: '<ul><li>Antes de soldar, revisa que la extracción <b>esté encendida y aspire</b>: acerca la mano o mira cómo se lleva el humo.</li><li>Si no aspira, hace ruido raro o tiene la manguera rota, <b>no sueldes</b> y <b>avisa de inmediato</b> a tu jefatura.</li><li>No comas, no bebas ni fumes en el área de soldadura, y <b>lávate manos y cara</b> antes de comer.</li></ul>', k: 'Sin extracción funcionando no se suelda: se avisa de inmediato.' }
    ],
    quiz: [
      { s: 'al_so_hu_dano', v: [
        { q: '¿Por qué los humos de soldadura son peligrosos?', o: ['Sus partículas llegan al fondo de los pulmones', 'Porque solo manchan la ropa y la cara', 'Porque dan sueño, pero se pasa rápido', 'No son peligrosos si el galpón es grande y alto'], w: 'Son partículas metálicas finísimas que llegan al fondo de los pulmones y causan daño acumulado.' },
        { q: '¿Qué daño pueden causar los humos de soldadura con los años?', o: ['Daño pulmonar y cáncer de pulmón', 'Solo un poco de tos que siempre se pasa', 'Dolor de espalda y de rodillas', 'Pérdida de audición por el ruido'], w: 'Con los años causan bronquitis, asma, daño pulmonar permanente y cáncer de pulmón.' },
        { q: 'El daño de los humos de soldadura se acumula sin dar dolor.', vf: true, w: 'Verdadero. Por eso la protección se usa siempre, aunque uno se sienta bien.' } ] },
      { s: 'al_so_hu_ext', v: [
        { q: 'Vas a hacer solo dos puntos de soldadura. ¿Enciendes la extracción?', o: ['Sí, la extracción se usa siempre', 'No, para dos puntos no hace falta', 'Solo si el jefe está mirando', 'Solo si el humo me molesta'], w: 'La extracción se usa siempre, aunque sea una soldadura corta.' },
        { q: '¿Cuándo se enciende la extracción de humos?', o: ['Antes de empezar a soldar', 'Cuando ya hay mucho humo', 'Al terminar, para limpiar el aire', 'Solo en invierno, con portones cerrados'], w: 'Se enciende antes de soldar, para captar el humo desde el primer momento.' },
        { q: 'Maestranza ALI tiene extracción de humos de soldadura.', vf: true, w: 'Verdadero. Es la principal protección para tus pulmones: úsala siempre.' } ] },
      { s: 'al_so_hu_cerca', v: [
        { q: '¿Dónde debe estar la campana de extracción?', o: ['Cerca de la soldadura', 'Lo más alto posible, junto al techo', 'Detrás del soldador, a la espalda', 'En cualquier parte, mientras esté encendida'], w: 'La campana solo capta el humo si está cerca del punto de soldadura.' },
        { q: 'Estás soldando una viga larga y avanzaste un metro. ¿Qué haces con la campana?', o: ['La acerco al punto que sueldo', 'La dejo donde estaba, igual aspira', 'La apago, porque ya me alejé', 'La apunto hacia mi cara'], w: 'La campana se mueve con el trabajo. Lejos ya casi no aspira.' },
        { q: 'Una campana a un metro de la soldadura capta el humo igual que una cercana.', vf: false, w: 'Falso. A medio metro o más casi no aspira: hay que acercarla.' } ] },
      { s: 'al_so_hu_cabeza', v: [
        { q: 'Estás soldando y el humo te pasa por la cara. ¿Qué haces?', o: ['Saco la cabeza del humo y acerco la campana', 'Aguanto la respiración y sigo', 'Me inclino más para ver mejor', 'Levanto la careta para que salga el humo de adentro'], w: 'La cabeza va fuera de la columna de humo y la campana se acerca a la soldadura.' },
        { q: '¿Qué postura protege mejor de los humos?', o: ['La cabeza a un lado del humo', 'Inclinado sobre la pieza para ver de cerca', 'Con la cara justo encima del arco', 'Agachado bajo la mesa de soldar'], w: 'El humo sube derecho desde el arco: no te pongas encima.' },
        { q: 'Soldar dentro de un estanque cerrado no requiere nada especial si hay extracción en el taller.', vf: false, w: 'Falso. En lugares cerrados se trabaja solo con autorización, ventilación y respirador.' } ] },
      { s: 'al_so_hu_galv', v: [
        { q: 'Tienes que soldar una pieza galvanizada. ¿Qué haces antes?', o: ['Esmerilo el galvanizado en la zona de la unión', 'Nada, el galvanizado se suelda igual que el acero', 'La pinto para que no salga humo', 'La lavo con diluyente y sueldo de inmediato'], w: 'Se limpia la zona antes: el zinc del galvanizado produce humos muy tóxicos.' },
        { q: '¿Qué piezas producen humos más tóxicos al soldarlas?', o: ['Las galvanizadas o pintadas', 'Las de acero limpio y sin pintura', 'Las que están frías al empezar', 'Las piezas cortas y delgadas'], w: 'Zinc, pintura, aceite y solventes vuelven el humo mucho más tóxico.' },
        { q: 'Para soldar galvanizado o inoxidable se agrega respirador con filtro para humos metálicos.', vf: true, w: 'Verdadero. La extracción se complementa con un respirador adecuado bajo la careta.' } ] },
      { s: 'al_so_hu_fiebre', v: [
        { q: 'En la noche, después de soldar galvanizado, tienes fiebre, escalofríos y sabor metálico. ¿Qué puede ser?', o: ['Fiebre de los humos metálicos', 'Un resfrío común sin relación', 'Cansancio normal por la jornada', 'Una alergia a los guantes de descarne'], w: 'Son síntomas típicos de la fiebre de los humos metálicos. Se avisa y se consulta en la ACHS.' },
        { q: '¿Qué previene la fiebre de los humos metálicos?', o: ['Usar la extracción y el respirador', 'Tomar un vaso de leche antes de soldar', 'Comer algo antes de cada soldadura', 'Soldar más rápido para respirar menos'], w: 'La leche no protege. Lo que previene es no respirar el humo: extracción y respirador.' },
        { q: 'La fiebre de los humos metálicos puede aparecer varias horas después de soldar.', vf: true, w: 'Verdadero. Aparece de 4 a 12 horas después, muchas veces en la noche.' } ] },
      { s: 'al_so_hu_aviso', v: [
        { q: 'Vas a soldar y notas que el extractor no aspira. ¿Qué haces?', o: ['No sueldo y aviso de inmediato', 'Sueldo igual, pero más rápido', 'Abro el portón y sueldo sin extracción', 'Sigo soldando y aviso al final del día'], w: 'Sin extracción funcionando no se suelda. Se avisa de inmediato.' },
        { q: '¿Qué haces antes de comer si trabajaste soldando?', o: ['Me lavo las manos y la cara', 'Nada, solo me saco los guantes', 'Me limpio con el guante de descarne', 'Como en el área para no perder tiempo'], w: 'Las partículas metálicas quedan en la piel: se lavan antes de comer, fuera del área de soldadura.' },
        { q: 'En el área de soldadura se puede comer y fumar si el extractor está encendido.', vf: false, w: 'Falso. En el área de soldadura no se come, no se bebe ni se fuma.' } ] }
    ]
  });

  // =====================================================================
  // 4 · OXICORTE Y CORTE PLASMA
  // =====================================================================
  const escOxi = (wx, o = {}) => { const hx = wx + 17, hy = 114;
    return H.carroOxi(20, 165) + mangueras(70, 70, hx, hy) + H.mesaSoldar(wx + 24, 165, o.w || 110) + H.plancha(wx + 30, 115, 90, 6)
      + soplete(hx, hy, wx + 44, 110, o.llama !== false) + (o.llama !== false ? H.chispas(wx + 62, 114, 9) : '') + W(wx, 165, { area: 'soldadura', pose: 'carry', glasses: false }) + `<rect x="${wx + 2}" y="${89}" width="9" height="5" rx="2" fill="#1B5E20" stroke="${OL}" stroke-width=".8"/>`; };
  S.al_so_ox_intro = () => svg(fArco() + escOxi(130) + pl(232, 30, 'Llama de más de 3.000 °C', '#E65100', 11));
  S.al_so_ox_equipo = () => svg(H.fondo.liso('#ECEFF1') + H.carroOxi(30, 180) + regulador(150, 70, 1, '#2E7D32') + vAnti(178, 70, 1) + regulador(150, 140, 1, '#C62828') + vAnti(178, 140, 1)
    + `<path d="M204,70 q40,0 56,36" stroke="#2E7D32" stroke-width="4" fill="none"/><path d="M204,140 q40,0 56,-30" stroke="#C62828" stroke-width="4" fill="none"/><line x1="260" y1="108" x2="306" y2="96" stroke="#B8860B" stroke-width="5"/>`
    + pl(150, 20, 'Reguladores', '#455A64', 10) + pl(190, 92, 'Antirretroceso', '#B8860B', 10) + pl(282, 130, 'Soplete', '#455A64', 10));
  S.al_so_ox_anti = () => svg(H.fondo.liso('#FFF8E1') + `<path d="M20,110 h80" stroke="#2E7D32" stroke-width="10"/>` + vAnti(100, 110, 3) + `<path d="M178,110 h60" stroke="#2E7D32" stroke-width="10"/>` + `<line x1="238" y1="110" x2="300" y2="96" stroke="#B8860B" stroke-width="6"/>`
    + `<g transform="translate(206,96)">${fuego(0, 0, .9)}</g>` + flecha(220, 74, 186, 92, '#C62828', 3) + `<path d="M150,62 l-12,0" stroke="#C62828" stroke-width="3"/>` + H.no(140, 60, 12).replace(/stroke="#fff" stroke-width="3"/, 'stroke="#fff" stroke-width="3"') + pl(140, 150, 'La llama no pasa', '#2E7D32', 11));
  S.al_so_ox_encender = () => svg(H.fondo.liso('#EEF2F5') + `<line x1="160" y1="12" x2="160" y2="188" stroke="#fff" stroke-width="4"/>` + fosforo(50, 140, 1.4) + H.no(140, 30, 14) + pl(80, 170, 'Fósforo o encendedor', '#C62828', 10)
    + chispero(196, 150, 1.4) + `<line x1="274" y1="74" x2="312" y2="50" stroke="#B8860B" stroke-width="5"/>` + H.chispas(274, 102, 6, 1) + H.si(298, 30, 14) + pl(240, 170, 'Chispero', '#2E7D32', 10));
  S.al_so_ox_mangueras = () => svg(fArco() + `<line x1="160" y1="12" x2="160" y2="188" stroke="#fff" stroke-width="4"/>` + `<path d="M10,150 q60,-30 140,0" stroke="#2E7D32" stroke-width="6" fill="none"/><path d="M10,160 q60,-30 140,0" stroke="#C62828" stroke-width="6" fill="none"/><rect x="62" y="128" width="20" height="14" fill="#9E9E9E" opacity=".9" transform="rotate(-8 72 135)"/><path d="M90,140 q4,-8 0,-14" stroke="#9E9E9E" stroke-width="2" fill="none" class="adHumo"/>` + H.no(140, 30, 14) + pl(70, 60, 'Parche y fuga', '#C62828', 10)
    + `<path d="M170,150 q60,-30 140,0" stroke="#2E7D32" stroke-width="6" fill="none"/><path d="M170,160 q60,-30 140,0" stroke="#C62828" stroke-width="6" fill="none"/>` + H.si(298, 30, 14) + pl(222, 60, 'Sanas y protegidas', '#2E7D32', 10));
  S.al_so_ox_oxigeno = () => svg(fArco() + H.carroOxi(20, 165) + `<path d="M74,80 q40,60 84,25" stroke="#2E7D32" stroke-width="3" fill="none"/>` + W(130, 165, { area: 'taller', pose: 'point' }) + `<path d="M156,106 l16,-2" stroke="#B8860B" stroke-width="4"/>` + `<path d="M176,100 q10,0 18,6 M176,106 q10,2 18,10 M176,112 q8,4 14,14" stroke="#4FC3F7" stroke-width="2" fill="none" class="soRay"/>` + W(214, 165, { area: 'taller', pose: 'stand', flip: true, face: 'worried' }) + H.no(290, 70, 16) + pl(200, 22, 'Nunca para limpiar ropa', '#C62828', 10) + pl(200, 46, 'ni para ventilar', '#C62828', 10));
  S.al_so_ox_chispas = () => svg(fArco() + escOxi(70, { w: 100 }) + `<path d="M150,120 q60,10 110,50" stroke="#FF9800" stroke-width="2.4" stroke-dasharray="4 6" fill="none" class="soVue"/>` + pallet(240, 165) + carton(250, 153) + H.extintor(296, 165, 'PQS', .7) + pl(258, 100, 'Combustibles lejos', '#E65100', 10));
  S.al_so_ox_plasma = () => svg(fArco() + H.maqSoldar(26, 165, 'PLASMA') + enchufe(30, 56) + `<g transform="translate(70,96)">${clavija(0, 0)}</g>` + `<path d="M40,90 v6 M54,92 l4,4" stroke="#2E7D32" stroke-width="2"/>`
    + W(190, 165, { area: 'soldadura', caretaArriba: true, pose: 'carry', flip: true, muffs: 'on' }) + `<line x1="173" y1="114" x2="150" y2="118" stroke="#263238" stroke-width="5"/><circle cx="148" cy="118" r="4" fill="#B0BEC5" stroke="${OL}"/><circle cx="148" cy="118" r="11" fill="none" stroke="#2E7D32" stroke-width="2" class="adPul"/>`
    + pl(68, 24, 'Desconectado', '#2E7D32', 10) + pl(250, 24, 'Cambio de consumibles', '#1565C0', 10));
  S.al_so_ox_fin = () => svg(fArco() + H.carroOxi(30, 165) + W(130, 165, { area: 'soldadura', pose: 'point', flip: true }) + `<g transform="translate(42,52)"><path d="M0,0 a8,8 0 1 1 16,0" stroke="#2E7D32" stroke-width="3" fill="none"/><path d="M16,0 l3,-6 l-8,2z" fill="#2E7D32"/></g>`
    + pl(240, 40, '1. Cierra los cilindros', '#2E7D32', 10) + pl(250, 66, '2. Purga las mangueras', '#2E7D32', 10) + pl(250, 92, '3. Suelta los reguladores', '#2E7D32', 10) + pl(250, 118, '4. Revisa el área', '#2E7D32', 10));

  SI_CONT.temas.push({
    id: 'so_oxicorte', sec: 'soldadura', emp: ['ali'], title: 'Oxicorte y corte plasma', thumb: 'al_so_ox_intro', mins: 15,
    learn: [
      { s: 'al_so_ox_intro', t: 'Oxicorte y plasma', x: '<ul><li><b>Oxicorte</b>: la llama de <b>oxígeno y acetileno</b> (más de 3.000 °C) calienta el acero y un chorro de oxígeno lo corta.</li><li><b>Plasma</b>: un arco eléctrico con aire comprimido funde y corta el metal.</li></ul>Riesgos: <b>retroceso de llama y explosión</b>, incendio, quemaduras, radiación en los ojos, humos y ruido. Solo opera estos equipos quien está capacitado y autorizado.' },
      { s: 'al_so_ox_equipo', t: 'Conoce el equipo', x: 'Un equipo de oxicorte tiene:<ul><li><b>Cilindros</b> de oxígeno y acetileno, de pie y amarrados en su carro.</li><li><b>Reguladores</b> con manómetros, uno para cada gas.</li><li><b>Válvulas antirretroceso</b> a la salida de los reguladores y en el soplete.</li><li><b>Mangueras</b>: verde (o azul) para oxígeno y roja para acetileno.</li><li><b>Soplete</b> con sus dos válvulas.</li></ul>Revisa todo antes de empezar. Si algo está malo, no lo uses y avisa.' },
      { s: 'al_so_ox_anti', t: 'Válvulas antirretroceso', x: 'Un <b>retroceso de llama</b> es cuando la llama se devuelve por dentro de la manguera hacia el cilindro: puede hacerlo explotar.<ul><li>Las <b>válvulas antirretroceso</b> lo impiden. Son obligatorias en ambos gases.</li><li>Nunca trabajes sin ellas ni las saques "porque bajan la presión".</li><li>Si escuchas un silbido o un estallido en el soplete, <b>cierra de inmediato</b> las válvulas del soplete y luego las de los cilindros, y avisa. El equipo se revisa antes de volver a usarlo.</li></ul>', k: 'Sin válvulas antirretroceso no se enciende un equipo de oxicorte.' },
      { s: 'al_so_ox_encender', t: 'Purgar y encender', x: '<ul><li>Abre las válvulas de los cilindros <b>lento</b>, parado al costado. El acetileno se trabaja a <b>baja presión</b> (nunca sobre 1 bar o 15 psi).</li><li><b>Purga</b> cada manguera por separado unos segundos, en un lugar ventilado y sin llamas cerca.</li><li>Abre un poco el acetileno del soplete y <b>enciende con chispero</b>, nunca con fósforo ni encendedor: te quemas la mano o el encendedor puede explotar.</li><li>Luego abre el oxígeno y regula la llama.</li></ul>' },
      { s: 'al_so_ox_mangueras', t: 'Mangueras sin parches', x: '<ul><li>Mangueras <b>sin cortes, quemaduras ni parches</b> de huincha o alambre: un tramo dañado se reemplaza.</li><li>Uniones con <b>abrazaderas adecuadas</b>, nunca amarradas con alambre.</li><li>Protégelas de las <b>chispas, la escoria y las piezas calientes</b>, y de que las pisen o las aplasten ruedas.</li><li>No las enrolles en el cilindro ni las dejes cruzando el pasillo.</li></ul>' },
      { s: 'al_so_ox_oxigeno', t: 'El oxígeno no es aire', x: 'El oxígeno puro hace que todo arda con violencia.<ul><li><b>Nunca</b> lo uses para <b>limpiar la ropa</b> o el cuerpo, soplar polvo, <b>ventilar</b> un lugar o refrescarte.</li><li>Una ropa con oxígeno se enciende con una chispa y arde como antorcha.</li><li>No lo uses para herramientas neumáticas en vez de aire comprimido.</li><li><b>Aceite o grasa con oxígeno</b> pueden explotar solos.</li></ul>', k: 'El oxígeno nunca se usa para limpiar ropa ni para ventilar.' },
      { s: 'al_so_ox_chispas', t: 'Lentes de sombra y chispas', x: '<ul><li>Para oxicorte usa <b>lentes o antiparras con filtro de sombra</b> (normalmente N° 4 a 6) o careta con filtro, más chaqueta, guantes y polainas de descarne.</li><li>Las chispas y la escoria del corte <b>vuelan varios metros</b> y quedan encendidas: <b>nada combustible en 10 metros</b> (trapos, cartón, madera, pinturas, diluyentes).</li><li>Las piezas cortadas caen: pies fuera de la zona de caída.</li><li>Ten un extintor a mano.</li></ul>' },
      { s: 'al_so_ox_plasma', t: 'Corte plasma', x: '<ul><li>Antes de cambiar el electrodo, la boquilla u otro consumible de la antorcha, <b>apaga y desconecta</b> la máquina: trabaja con alta tensión.</li><li>El arco de plasma tiene <b>radiación como el arco de soldar</b>: careta o lentes con filtro adecuado.</li><li>Es ruidoso: <b>protector auditivo</b>.</li><li>Genera humos: corta con <b>extracción</b>.</li><li>Nunca apuntes la antorcha a tu mano ni a otra persona.</li></ul>' },
      { s: 'al_so_ox_fin', t: 'Al terminar', x: '<ul><li>Apaga el soplete cerrando primero el acetileno y luego el oxígeno.</li><li><b>Cierra las válvulas de los cilindros</b>.</li><li>Abre el soplete para <b>purgar</b> el gas que quedó en las mangueras y ciérralo.</li><li>Suelta el tornillo de los reguladores.</li><li>Enrolla las mangueras y <b>revisa el área</b> en busca de chispas o brasas.</li></ul>' }
    ],
    quiz: [
      { s: 'al_so_ox_anti', v: [
        { q: '¿Para qué sirven las válvulas antirretroceso?', o: ['Para que la llama no vuelva al cilindro', 'Para subir la presión del oxígeno', 'Para encender el soplete más rápido y fácil', 'Para ahorrar gas al cortar'], w: 'Impiden que un retroceso de llama llegue al cilindro y lo haga explotar.' },
        { q: 'Escuchas un silbido y un estallido en el soplete. ¿Qué haces?', o: ['Cierro soplete y cilindros, y aviso', 'Sigo cortando, es normal en el oxicorte', 'Enfrío el soplete con agua y sigo', 'Subo la presión del acetileno'], w: 'Puede ser un retroceso de llama: se cierra todo de inmediato y se avisa. El equipo se revisa antes de volver a usarlo.' },
        { q: 'Se puede trabajar sin válvulas antirretroceso si el corte es corto.', vf: false, w: 'Falso. Son obligatorias en ambos gases, siempre.' } ] },
      { s: 'al_so_ox_encender', v: [
        { q: '¿Con qué se enciende el soplete de oxicorte?', o: ['Con un chispero', 'Con un fósforo', 'Con un encendedor', 'Con una colilla de electrodo'], w: 'Se enciende con chispero. Con fósforo o encendedor te quemas la mano y el encendedor puede explotar.' },
        { q: '¿Qué haces antes de encender el soplete?', o: ['Purgo cada manguera por separado', 'Abro los dos gases al máximo', 'Enciendo con el oxígeno abierto', 'Caliento las mangueras con la llama'], w: 'La purga saca la mezcla de gases que pudo quedar en las mangueras.' },
        { q: 'El acetileno se trabaja a baja presión, nunca sobre 1 bar (15 psi).', vf: true, w: 'Verdadero. A mayor presión el acetileno se vuelve inestable y puede explotar.' } ] },
      { s: 'al_so_ox_mangueras', v: [
        { q: 'La manguera de acetileno tiene una pequeña fuga. ¿Qué haces?', o: ['Cierro los cilindros y aviso', 'Le pongo huincha y sigo cortando', 'La amarro con alambre bien apretado', 'Subo la presión para compensar'], w: 'Las mangueras dañadas no se parchan: se reemplaza el tramo.' },
        { q: '¿Cómo se protegen las mangueras de oxicorte?', o: ['Lejos de chispas, calor y del paso', 'Enrolladas en el cilindro para que no estorben', 'Cruzando el pasillo por el camino más corto', 'Bajo la plancha que se está cortando'], w: 'Las chispas, la escoria y las ruedas las dañan: van protegidas y fuera del paso.' },
        { q: 'Una manguera de oxicorte se puede unir amarrándola con alambre.', vf: false, w: 'Falso. Se usan abrazaderas y conexiones adecuadas, nunca alambre.' } ] },
      { s: 'al_so_ox_oxigeno', v: [
        { q: 'Tu ropa está llena de polvo metálico. Un compañero te ofrece soplarla con oxígeno. ¿Qué haces?', o: ['No acepto: el oxígeno hace arder la ropa', 'Acepto si lo hace de lejos y rápido', 'Acepto, porque limpia mucho mejor que el aire', 'Acepto si después me sacudo bien'], w: 'Una ropa con oxígeno se enciende con una chispa y arde como antorcha.' },
        { q: '¿Para qué se usa el oxígeno del equipo de oxicorte?', o: ['Solo para cortar y calentar con el soplete', 'Para ventilar lugares cerrados', 'Para limpiar la ropa y las mesas', 'Para hacer andar las herramientas neumáticas'], w: 'El oxígeno es solo para el soplete. Nunca para ventilar, limpiar ni para herramientas.' },
        { q: 'Aceite o grasa en contacto con oxígeno pueden explotar solos.', vf: true, w: 'Verdadero. Por eso las válvulas y reguladores de oxígeno se mantienen sin grasa.' } ] },
      { s: 'al_so_ox_chispas', v: [
        { q: 'Vas a cortar con oxicorte y hay cartón y un pallet a 4 metros. ¿Qué haces?', o: ['Los saco de la zona antes de cortar', 'Corto igual, las chispas no llegan tan lejos', 'Corto rápido y miro de vez en cuando', 'Los mojo un poco y empiezo'], w: 'Las chispas vuelan varios metros: nada combustible en 10 metros.' },
        { q: '¿Qué protección de ojos se usa para el oxicorte?', o: ['Lentes o careta con filtro de sombra', 'Lentes de seguridad transparentes', 'Lentes de sol comunes', 'Ninguna, la llama no tiene radiación'], w: 'La llama y el metal fundido emiten radiación: se usa filtro de sombra, normalmente N° 4 a 6.' },
        { q: 'Al cortar, tus pies deben quedar fuera de la zona donde caen las piezas.', vf: true, w: 'Verdadero. Las piezas cortadas caen calientes y pesadas.' } ] },
      { s: 'al_so_ox_plasma', v: [
        { q: 'Tienes que cambiar la boquilla de la antorcha de plasma. ¿Qué haces primero?', o: ['Apago y desconecto la máquina', 'La cambio rápido con la máquina encendida', 'Aprieto el gatillo para enfriarla', 'Le pido a otro que sostenga el gatillo'], w: 'El plasma trabaja con alta tensión: se apaga y desconecta antes de cambiar consumibles.' },
        { q: '¿Qué EPP se suma al cortar con plasma?', o: ['Fonos, además de careta o filtro', 'Solo guantes de goma', 'Mascarilla de papel, nada más', 'Solo lentes de seguridad transparentes'], w: 'El plasma es ruidoso y tiene radiación como el arco: fonos y filtro adecuado.' },
        { q: 'El arco de plasma no tiene radiación porque usa aire comprimido.', vf: false, w: 'Falso. Tiene radiación como el arco de soldar: careta o lentes con filtro.' } ] }
    ]
  });

  // =====================================================================
  // 5 · CILINDROS DE GASES COMPRIMIDOS
  // =====================================================================
  S.al_so_ci_intro = () => svg(H.fondo.taller() + `<g transform="translate(0,-6) rotate(90 70 165)">${H.cilindro(60, 165, 'oxigeno', { h: 84, capuchon: false })}</g>` + `<path d="M154,148 l10,-4 M156,156 l14,0 M154,164 l10,4" stroke="#C62828" stroke-width="3"/>`
    + flecha(180, 156, 300, 156, '#C62828', 5) + `<path d="M150,150 q4,-10 10,-4" stroke="#9E9E9E" stroke-width="2" fill="none"/>` + pl(160, 30, 'Válvula rota = cohete', '#C62828', 12) + pl(230, 120, '150 a 200 bar', '#455A64', 10));
  S.al_so_ci_cadena = () => svg(H.fondo.taller() + `<rect x="40" y="60" width="200" height="105" fill="#B0BEC5"/>` + [60, 86, 112, 160, 186].map((x, i) => H.cilindro(x, 165, ['oxigeno', 'oxigeno', 'oxigeno', 'acetileno', 'acetileno'][i], { h: 84 })).join('')
    + soporte(54, 108) + H.cadena(54, 108, 138) + soporte(138, 108) + soporte(154, 108) + H.cadena(154, 108, 212) + soporte(212, 108) + `<rect x="140" y="60" width="10" height="105" fill="#78909C"/>` + H.si(290, 30, 14) + pl(140, 40, 'De pie, con cadena y capuchón', '#2E7D32', 10));
  S.al_so_ci_cadena_q = () => svg(H.fondo.taller() + `<rect x="40" y="60" width="200" height="105" fill="#B0BEC5"/>` + [60, 86, 112, 160, 186].map((x, i) => H.cilindro(x, 165, ['oxigeno', 'oxigeno', 'oxigeno', 'acetileno', 'acetileno'][i], { h: 84 })).join('')
    + soporte(54, 108) + H.cadena(54, 108, 138) + soporte(138, 108) + soporte(154, 108) + H.cadena(154, 108, 212) + soporte(212, 108) + `<rect x="140" y="60" width="10" height="105" fill="#78909C"/>`);
  S.al_so_ci_capu = () => svg(H.fondo.liso('#ECEFF1') + `<line x1="160" y1="12" x2="160" y2="188" stroke="#fff" stroke-width="4"/>` + H.cilindro(70, 180, 'argon', { h: 110, capuchon: false }) + H.no(140, 30, 14) + pl(80, 34, 'Válvula expuesta', '#C62828', 10)
    + H.cilindro(230, 180, 'argon', { h: 110 }) + H.si(298, 30, 14) + pl(240, 34, 'Con capuchón', '#2E7D32', 10));
  S.al_so_ci_carro = () => svg(H.fondo.taller() + `<line x1="160" y1="12" x2="160" y2="188" stroke="#fff" stroke-width="4"/>` + `<g transform="translate(30,-8) rotate(90 70 165)">${H.cilindro(60, 165, 'oxigeno', { h: 80 })}</g>` + W(70, 165, { area: 'taller', pose: 'bend' }) + `<path d="M128,180 a8,8 0 1 1 8,-8" stroke="#C62828" stroke-width="2" fill="none"/><path d="M132,172 l4,0 l-1,4" stroke="#C62828" stroke-width="2" fill="none"/>` + H.no(140, 30, 14) + pl(80, 30, 'Rodando', '#C62828', 10)
    + carroCil(212, 165, 'acetileno') + W(250, 165, { area: 'taller', pose: 'carry', flip: true }) + H.si(298, 30, 14) + pl(240, 30, 'En su carro', '#2E7D32', 10));
  S.al_so_ci_grua = () => svg(H.fondo.taller() + H.puenteGrua(104, 56, `<path d="M104,64 v8" stroke="#455A64" stroke-width="2"/>` + H.cilindro(94, 158, 'oxigeno', { h: 84, capuchon: false })) + H.zonaCarga(64, 90) + H.no(160, 70, 14)
    + `<rect x="226" y="80" width="60" height="85" fill="none" stroke="#455A64" stroke-width="3"/>${[0, 1, 2, 3].map(i => `<line x1="${226 + i * 20}" y1="80" x2="${226 + i * 20}" y2="165" stroke="#455A64" stroke-width="1.5"/>`).join('')}` + H.cilindro(236, 162, 'oxigeno', { h: 76 }) + H.cilindro(260, 162, 'argon', { h: 76 }) + H.si(298, 70, 14) + pl(256, 172, 'Canastillo', '#2E7D32', 10));
  S.al_so_ci_separar = () => svg(H.fondo.patio() + `<rect x="16" y="100" width="90" height="62" fill="none" stroke="#455A64" stroke-width="2"/>` + H.cilindro(26, 162, 'oxigeno', { h: 72 }) + H.cilindro(50, 162, 'oxigeno', { h: 72 }) + H.cilindro(74, 162, 'oxigeno', { h: 72 })
    + `<rect x="214" y="100" width="90" height="62" fill="none" stroke="#455A64" stroke-width="2"/>` + H.cilindro(224, 162, 'acetileno', { h: 66 }) + H.cilindro(248, 162, 'acetileno', { h: 66 }) + H.cilindro(272, 162, 'acetileno', { h: 66 })
    + `<path d="M112,150 h96" stroke="#1565C0" stroke-width="2.5"/><path d="M112,150 l8,-4 v8z M208,150 l-8,-4 v8z" fill="#1565C0"/>` + pl(160, 126, 'Al menos 6 m', '#1565C0', 10) + pl(61, 176, 'Oxígeno', '#2E7D32', 10) + pl(259, 176, 'Combustibles', '#8D3B2B', 10));
  S.al_so_ci_calor = () => svg(fArco() + escSold(140, { w: 100 }) + H.cilindro(60, 165, 'mezcla', { h: 84, capuchon: false }) + `<path d="M150,120 q-40,0 -66,-10" stroke="#FF9800" stroke-width="2.4" stroke-dasharray="4 5" fill="none" class="soVue"/>` + H.no(24, 30, 14) + pl(170, 26, 'Nunca cerca de chispas ni llama', '#C62828', 10));
  S.al_so_ci_grasa = () => svg(H.fondo.liso('#ECEFF1') + `<rect x="40" y="110" width="50" height="90" rx="18" fill="#2E7D32" stroke="${OL}" stroke-width="1.5"/><rect x="56" y="94" width="18" height="18" fill="#B0BEC5" stroke="${OL}"/>` + regulador(65, 78, 1, '#2E7D32')
    + W(170, 182, { area: 'taller', pose: 'point', flip: true, s: 1.3, gloves: '#5D4037' }) + `<ellipse cx="136" cy="118" rx="9" ry="5" fill="#3E2723" opacity=".7"/>` + `<path d="M120,96 l-20,-10" stroke="#C62828" stroke-width="2"/>` + H.no(270, 40, 16) + pl(250, 80, 'Guante con grasa', '#C62828', 10) + pl(70, 26, 'Válvula de oxígeno', '#2E7D32', 10));
  S.al_so_ci_fuga = () => svg(H.fondo.taller() + H.cilindro(110, 165, 'acetileno', { h: 84, capuchon: false }) + regulador(120, 64, .6, '#C62828') + burbujas(132, 72) + brocha(150, 76) + W(196, 165, { area: 'taller', pose: 'point', flip: true }) + `<rect x="246" y="140" width="26" height="25" rx="3" fill="#E3F2FD" stroke="#90A4AE"/>` + T(259, 156, 'agua', 6, '#1565C0')
    + pl(120, 26, 'Agua jabonosa: si burbujea, hay fuga', '#1565C0', 10));

  SI_CONT.temas.push({
    id: 'so_cilindros', sec: 'soldadura', emp: ['ali'], title: 'Cilindros de gases comprimidos', thumb: 'al_so_ci_cadena', mins: 12,
    learn: [
      { s: 'al_so_ci_intro', t: 'Un cilindro guarda mucha fuerza', x: 'Los cilindros de oxígeno, argón o mezcla guardan gas a <b>150 a 200 bar</b>, unas 200 veces la presión de un neumático de auto. El acetileno es inflamable.<ul><li>Si un cilindro cae y <b>se rompe la válvula</b>, sale disparado como un cohete y puede atravesar un muro.</li><li>Si se calienta, puede reventar.</li></ul>Identifica el gas por la <b>etiqueta</b>, no solo por el color.' },
      { s: 'al_so_ci_cadena', t: 'Siempre de pie y amarrados', x: '<ul><li>Todo cilindro va <b>de pie y amarrado con cadena</b> al muro, al carro o a su soporte: en uso, lleno, vacío y guardado.</li><li>La cadena va en la <b>parte de arriba</b> del cilindro (el tercio superior), bien ajustada.</li><li>Un cilindro "solo un rato" suelto se cae con un golpe o un roce.</li></ul>', k: 'Ningún cilindro queda suelto: de pie y con cadena, siempre.' },
      { s: 'al_so_ci_capu', t: 'Con capuchón cuando no se usa', x: '<ul><li>Cuando el cilindro <b>no está en uso</b>, se guarda o se traslada, lleva el <b>regulador retirado y el capuchón puesto</b>.</li><li>El capuchón protege la válvula de golpes: es lo que evita el "cohete".</li><li>Los cilindros <b>vacíos</b> se cierran, se marcan como vacíos y se guardan separados de los llenos.</li></ul>' },
      { s: 'al_so_ci_carro', t: 'Muévelos en su carro', x: '<ul><li>Para trasladar un cilindro usa el <b>carro portacilindros</b>, con el cilindro amarrado y con capuchón.</li><li><b>Nunca lo hagas rodar</b> acostado, ni lo arrastres, ni lo empujes con el pie.</li><li>No lo uses como rodillo para mover otras piezas ni como apoyo.</li><li>Un cilindro pesa entre 60 y 80 kilos: no se carga a mano.</li></ul>' },
      { s: 'al_so_ci_grua', t: 'Nunca con el puente grúa por la válvula', x: '<ul><li><b>Nunca levantes un cilindro con el puente grúa o el tecle tomándolo de la válvula o del capuchón</b>, ni con una eslinga directa: se puede soltar o cortar la válvula.</li><li>Si hay que izarlos, se usa un <b>canastillo o jaula</b> hecha para cilindros, con ellos amarrados adentro.</li><li>Nadie bajo la carga suspendida.</li></ul>' },
      { s: 'al_so_ci_separar', t: 'Oxígeno separado de combustibles', x: '<ul><li>Guarda el <b>oxígeno separado del acetileno</b> y otros gases combustibles: <b>al menos 6 metros</b>, o con un muro cortafuego entre ellos.</li><li>En un lugar <b>ventilado, señalizado</b> y protegido del sol directo y de la lluvia.</li><li>Llenos y vacíos separados y rotulados.</li><li>Prohibido fumar y hacer llama cerca.</li></ul>' },
      { s: 'al_so_ci_calor', t: 'Lejos del calor y las chispas', x: '<ul><li>Mantén los cilindros <b>lejos de chispas, llamas, escoria y piezas calientes</b>.</li><li>Nunca hagas arco sobre un cilindro ni lo uses como tierra de la máquina de soldar: una quemadura en el acero lo debilita.</li><li>Nunca calientes un cilindro para "sacar más gas".</li><li>Si un cilindro se calienta o se ve dañado, aléjate y avisa de inmediato.</li></ul>' },
      { s: 'al_so_ci_grasa', t: 'Sin grasa en el oxígeno', x: '<ul><li><b>Nunca pongas aceite ni grasa</b> en válvulas, reguladores o conexiones de oxígeno: pueden explotar solos.</li><li>No los manipules con <b>guantes o manos con grasa</b>.</li><li>Si una válvula está dura, no la fuerces con herramientas ni la lubriques: avisa.</li></ul>' },
      { s: 'al_so_ci_fuga', t: 'Detectar fugas', x: '<ul><li>Las fugas se buscan con <b>agua jabonosa</b> y una brocha en válvulas y conexiones: si aparecen burbujas, hay fuga.</li><li><b>Nunca con una llama</b> o encendedor.</li><li>El acetileno huele parecido al ajo.</li><li>Si hay una fuga: cierra la válvula si puedes hacerlo sin riesgo, apaga toda llama cercana, ventila, aleja a las personas y <b>avisa de inmediato</b>.</li></ul>' }
    ],
    quiz: [
      { s: 'al_so_ci_intro', v: [
        { q: '¿Qué puede pasar si un cilindro lleno se cae y se rompe la válvula?', o: ['Sale disparado como un cohete', 'Solo se escapa un poco de gas', 'Nada, la válvula se cierra sola', 'Se apaga y queda inservible'], w: 'Con 150 a 200 bar, un cilindro sin válvula sale disparado y puede atravesar un muro.' },
        { q: '¿Cómo se identifica el gas de un cilindro?', o: ['Por su etiqueta', 'Solo por el color de la pintura', 'Por el olor al abrirlo un poco', 'Por el tamaño del cilindro'], w: 'El color ayuda, pero lo seguro es leer la etiqueta.' },
        { q: 'Un cilindro de oxígeno lleno tiene mucha más presión que el neumático de un auto.', vf: true, w: 'Verdadero. Tiene unas 200 veces más presión.' } ] },
      { s: 'al_so_ci_cadena_q', v: [
        { q: '¿Cómo deben estar los cilindros en el taller?', o: ['De pie y amarrados con cadena', 'Apoyados en la pared, sin amarrar', 'Acostados en el piso, para que no caigan', 'Agrupados sueltos en una esquina'], w: 'Todo cilindro va de pie y amarrado con cadena: en uso, lleno, vacío y guardado.' },
        { q: 'Un cilindro vacío quedó suelto junto a la máquina. ¿Qué haces?', o: ['Lo amarro con cadena o lo llevo a su lugar', 'Lo dejo así porque ya está vacío y no tiene riesgo', 'Lo acuesto en el piso para que no caiga', 'Lo apoyo en la mesa de soldar'], w: 'Los vacíos también se amarran: siempre queda algo de presión y la válvula se puede romper.' },
        { q: 'La cadena de los cilindros se pone en el tercio superior del cilindro.', vf: true, w: 'Verdadero. Así sujeta mejor y evita que se vuelque.' } ] },
      { s: 'al_so_ci_carro', v: [
        { q: '¿Cómo trasladas un cilindro de un lado del taller al otro?', o: ['En su carro, amarrado', 'Rodándolo acostado por el piso', 'Arrastrándolo de la válvula', 'Cargándolo al hombro'], w: 'Se usa el carro portacilindros, con el cilindro amarrado y con capuchón.' },
        { q: 'No encuentras el carro y el cilindro está a 10 metros. ¿Qué haces?', o: ['Busco el carro o pido ayuda; no lo hago rodar', 'Lo hago rodar con el pie, porque son pocos metros', 'Lo empujo inclinado girándolo', 'Lo arrastro con una eslinga'], w: 'Aunque sean pocos metros, el cilindro no se rueda ni se arrastra.' },
        { q: 'Un cilindro sirve como rodillo para mover una pieza pesada.', vf: false, w: 'Falso. Un cilindro nunca se usa como rodillo ni como apoyo.' } ] },
      { s: 'al_so_ci_grua', v: [
        { q: 'Hay que subir un cilindro a una plataforma con el puente grúa. ¿Cómo se hace?', o: ['En un canastillo para cilindros', 'Colgado del gancho por la válvula', 'Amarrado del capuchón con una cuerda', 'Con una eslinga alrededor del cuerpo'], w: 'Solo con canastillo o jaula para cilindros. Nunca de la válvula ni del capuchón.' },
        { q: '¿Por qué no se levanta un cilindro tomado de la válvula?', o: ['Porque la válvula se puede cortar', 'Porque se mancha la válvula con grasa', 'Porque así el gancho se raya', 'Porque así se pierde la etiqueta'], w: 'La válvula no está hecha para soportar el peso: si se suelta, el cilindro cae y puede volverse un cohete.' },
        { q: 'Se puede levantar un cilindro con el puente grúa enganchando su capuchón.', vf: false, w: 'Falso. El capuchón no soporta el peso. Solo con canastillo para cilindros.' } ] },
      { s: 'al_so_ci_separar', v: [
        { q: '¿Cómo se guardan los cilindros de oxígeno y de acetileno?', o: ['Separados, al menos 6 metros o con muro cortafuego', 'Juntos, para tenerlos a mano', 'Uno al lado del otro, amarrados con la misma cadena', 'Al sol, para que no se humedezcan'], w: 'El oxígeno se separa de los combustibles: al menos 6 metros o con un muro cortafuego.' },
        { q: 'Estás guardando cilindros vacíos. ¿Qué haces?', o: ['Los cierro, marco y separo de los llenos', 'Los mezclo con los llenos para ahorrar espacio', 'Les saco la válvula para saber que están vacíos', 'Los dejo abiertos para que salga lo que queda'], w: 'Los vacíos se cierran, se marcan y se guardan separados de los llenos, con capuchón y cadena.' },
        { q: 'Con un cilindro tibio por el sol no pasa nada, porque el gas se enfría solo.', vf: false, w: 'Falso. Al calentarse sube la presión: se guardan protegidos del sol directo.' } ] },
      { s: 'al_so_ci_grasa', v: [
        { q: 'La válvula del cilindro de oxígeno está dura. ¿Qué haces?', o: ['No la fuerzo ni la lubrico, y aviso', 'Le echo un poco de aceite para que gire mejor', 'La golpeo con un martillo', 'La abro con una llave grande'], w: 'Aceite y oxígeno pueden explotar. Una válvula dura se informa, no se lubrica ni se fuerza.' },
        { q: 'Tienes los guantes con grasa. ¿Puedes conectar el regulador de oxígeno?', o: ['No, me pongo guantes limpios', 'Sí, si lo hago con cuidado', 'Sí, la grasa protege la rosca', 'Sí, si después limpio la válvula'], w: 'La grasa en conexiones de oxígeno puede provocar una explosión.' },
        { q: 'Una gota de aceite en la válvula de oxígeno ayuda a que no se pegue.', vf: false, w: 'Falso. Aceite o grasa con oxígeno pueden explotar solos.' } ] },
      { s: 'al_so_ci_fuga', v: [
        { q: '¿Cómo se busca una fuga en la válvula de un cilindro?', o: ['Con agua jabonosa y una brocha', 'Con un encendedor cerca de la válvula', 'Con el oído pegado a la válvula', 'Pasando la mano mojada en agua sola'], w: 'Con agua jabonosa: si aparecen burbujas, hay fuga. Nunca con fuego.' },
        { q: 'Sientes olor a ajo junto a los cilindros de acetileno. ¿Qué haces?', o: ['Sin llamas, ventilo y aviso', 'Busco la fuga con el encendedor', 'Sigo trabajando con la puerta abierta', 'Echo agua sobre el cilindro y me voy'], w: 'Puede ser una fuga de acetileno: sin llamas, ventilar, alejar a las personas y avisar de inmediato.' },
        { q: 'Si aparecen burbujas al pasar agua jabonosa por una conexión, hay una fuga.', vf: true, w: 'Verdadero. Se cierra la válvula si se puede hacer sin riesgo y se avisa.' } ] }
    ]
  });

  // =====================================================================
  // 6 · TRABAJOS EN CALIENTE Y PREVENCIÓN DE INCENDIOS
  // =====================================================================
  S.al_so_ca_intro = () => svg(H.fondo.taller() + escSold(40, { w: 100 }) + `<path d="M90,114 q60,10 100,48" stroke="#FF9800" stroke-width="2.4" stroke-dasharray="4 6" fill="none" class="soVue"/>` + carton(186, 165, 34, 26) + trapos(226, 165) + tarro(262, 165) + fuego(204, 140, .8) + pl(232, 30, 'Una chispa basta', '#C62828', 11));
  S.al_so_ca_permiso = () => svg(H.fondo.taller() + permiso(30, 40, 1.3) + W(200, 165, { area: 'taller', pose: 'point', flip: true }) + W(270, 165, { area: 'soldadura', caretaArriba: true, flip: true }) + pl(220, 36, 'Revisado y firmado antes', '#E65100', 10));
  S.al_so_ca_10m = () => svg(H.fondo.taller() + escSold(120, { w: 90 }) + manta(20, 165, 60) + `<path d="M60,180 h220" stroke="#1565C0" stroke-width="2.5"/><path d="M60,180 l8,-4 v8z M280,180 l-8,-4 v8z" fill="#1565C0"/>` + pl(170, 184, '10 metros despejados', '#1565C0', 10) + pl(50, 112, 'Manta ignífuga', '#455A64', 9) + H.si(298, 30, 14));
  S.al_so_ca_viajan = () => svg(H.fondo.taller() + `<rect x="20" y="90" width="120" height="8" fill="#78909C" stroke="${OL}"/>` + W(70, 90, { area: 'soldadura', careta: true, pose: 'bend' }) + H.plancha(98, 90, 30, 5) + portaE(105, 72, 112, 84) + arcoF(113, 84) + `<path d="M110,96 q60,0 90,30 q30,30 60,40" stroke="#FF9800" stroke-width="2.4" stroke-dasharray="4 6" fill="none" class="soVue"/><path d="M110,96 q10,30 20,66" stroke="#FF9800" stroke-width="2.4" stroke-dasharray="4 6" fill="none" class="soVue"/>`
    + `<rect x="26" y="98" width="4" height="67" fill="#455A64"/><rect x="130" y="98" width="4" height="67" fill="#455A64"/>` + pallet(240, 165) + fuego(266, 150, .7) + pl(220, 30, 'Las chispas llegan lejos', '#C62828', 11));
  S.al_so_ca_extintor = () => svg(H.fondo.taller() + escSold(110, { w: 100 }) + H.extintor(60, 165, 'PQS', 1.2) + `<circle cx="73" cy="88" r="7" fill="#fff" stroke="${OL}"/><path d="M68,90 a6,6 0 0 1 10,0" stroke="#2E7D32" stroke-width="3" fill="none"/>` + pl(70, 30, 'Extintor a mano', '#C62828', 11) + H.si(298, 30, 14));
  S.al_so_ca_vigia = () => svg(H.fondo.taller() + escSold(40, { w: 100 }) + W(230, 165, { area: 'taller', pose: 'point', flip: true }) + H.extintor(250, 165, 'PQS', .8) + pl(232, 50, 'Vigía de fuego', '#E65100', 11) + `<path d="M210,96 q-40,-10 -76,10" stroke="#E65100" stroke-width="2" stroke-dasharray="4 4" fill="none"/>`);
  S.al_so_ca_30 = () => svg(H.fondo.taller() + H.mesaSoldar(30, 165, 110) + H.plancha(40, 115, 90, 5) + W(190, 165, { area: 'taller', pose: 'point', flip: true }) + carton(140, 165, 26, 18) + `<circle cx="150" cy="144" r="4" fill="#FF7043" class="adPul"/>` + reloj(260, 70, 24, '30 minutos'));
  S.al_so_ca_tambor = () => svg(H.fondo.taller() + tambor(150, 165) + W(110, 165, { area: 'soldadura', careta: true, pose: 'bend' }) + arcoF(150, 125) + `<g class="adPul">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i / 8 * 6.283; return `<line x1="${(167 + Math.cos(a) * 30).toFixed(1)}" y1="${(140 + Math.sin(a) * 30).toFixed(1)}" x2="${(167 + Math.cos(a) * 46).toFixed(1)}" y2="${(140 + Math.sin(a) * 46).toFixed(1)}" stroke="#FF7043" stroke-width="4"/>`; }).join('')}</g>`
    + H.no(250, 50, 18) + pl(250, 90, 'Vapores = explosión', '#C62828', 10));
  S.al_so_ca_fuego = () => svg(H.fondo.taller() + pallet(170, 165) + fuego(196, 152, 1) + W(110, 165, { area: 'taller', pose: 'carry' }) + H.extintor(124, 140, 'PQS', .6) + `<path d="M138,114 q20,10 46,26" stroke="#ECEFF1" stroke-width="7" fill="none" opacity=".9"/>` + flecha(60, 180, 10, 180, '#2E7D32', 3) + pl(84, 172, 'Salida', '#2E7D32', 9) + pl(60, 26, 'Base del fuego', '#C62828', 10) + pl(250, 26, 'Si crece: evacúa', '#E65100', 10));

  SI_CONT.temas.push({
    id: 'so_caliente', sec: 'soldadura', emp: ['ali'], title: 'Trabajos en caliente y prevención de incendios', thumb: 'al_so_ca_intro', mins: 15,
    learn: [
      { s: 'al_so_ca_intro', t: '¿Qué es un trabajo en caliente?', x: 'Es todo trabajo que produce <b>llama, chispas o calor</b>: soldar, cortar con oxicorte o plasma, esmerilar, calentar piezas.<ul><li>Muchos incendios en talleres y plantas empiezan con <b>una chispa</b> que cae en trapos, cartón, aceite o pintura.</li><li>El fuego puede empezar <b>minutos u horas después</b> de terminar el trabajo.</li></ul>Esto aplica en el taller y, con más razón, en las <b>faenas de clientes</b>.' },
      { s: 'al_so_ca_permiso', t: 'Permiso de trabajo en caliente', x: 'Cuando el trabajo en caliente se hace <b>fuera del área de soldadura</b> del taller, o en la faena de un cliente:<ul><li>Antes de empezar se completa el <b>permiso de trabajo en caliente</b> según el procedimiento de trabajos en caliente de ALI (y el del cliente, en su faena).</li><li>Se revisa el lugar y lo <b>autoriza y firma tu jefatura</b> (o quien corresponda en la faena).</li><li>Se cumple todo lo que pide el permiso. Si cambian las condiciones, se detiene el trabajo.</li></ul>', k: 'Fuera del área de soldadura, sin permiso de trabajo en caliente no se parte.' },
      { s: 'al_so_ca_10m', t: 'Combustibles fuera, en 10 metros', x: '<ul><li><b>Retira todo lo combustible en 10 metros</b> a la redonda: trapos, cartón, madera, pallets, aceites, pinturas, diluyentes, basura.</li><li>Lo que no se puede mover se <b>cubre con mantas ignífugas</b>.</li><li>Tapa las grietas, rejillas y aberturas del piso o de los muros por donde puedan pasar chispas.</li><li>Barre el lugar antes de empezar.</li></ul>' },
      { s: 'al_so_ca_viajan', t: 'Las chispas viajan lejos', x: '<ul><li>Las chispas y gotas de metal pueden <b>saltar 10 metros o más</b>, y mucho más si se trabaja en altura.</li><li>Ruedan por el piso, caen por aberturas a otro nivel y quedan <b>encendidas dentro de grietas</b>, rincones o pallets.</li><li>Mira hacia dónde caen las chispas y qué hay ahí, también <b>debajo y detrás de muros</b>.</li></ul>' },
      { s: 'al_so_ca_extintor', t: 'Extintor a mano', x: '<ul><li>Antes de empezar, deja un <b>extintor cargado a pocos pasos</b>, a la vista y sin obstáculos.</li><li>Revisa que el manómetro esté en verde y que tenga su sello.</li><li>Recuerda cómo se usa: <b>retira el seguro, acércate al fuego, acciona el gatillo y dirige la descarga a la base del fuego</b>.</li></ul>' },
      { s: 'al_so_ca_vigia', t: 'Vigía de fuego', x: 'Con la careta puesta, <b>el soldador no ve dónde caen las chispas</b>. Por eso, cuando el permiso lo pide:<ul><li>Una segunda persona actúa como <b>vigía de fuego</b>: mira las chispas, con un extintor en la mano.</li><li>Puede <b>detener el trabajo</b> si ve peligro.</li><li>No hace otra tarea mientras vigila y se queda también después de terminar.</li></ul>' },
      { s: 'al_so_ca_30', t: 'Revisa 30 minutos después', x: 'Una brasa puede quedar escondida y encenderse después.<ul><li>Al terminar, <b>revisa el lugar durante al menos 30 minutos</b> (o lo que indique el permiso).</li><li>Mira debajo de las piezas, en rincones, grietas y al otro lado de los muros.</li><li>Si trabajaste al final del turno, no te vayas sin hacer esta revisión.</li></ul>', k: 'El trabajo en caliente termina 30 minutos después de apagar el equipo.' },
      { s: 'al_so_ca_tambor', t: 'Recipientes que tuvieron combustibles', x: '<ul><li><b>Nunca sueldes ni cortes</b> tambores, estanques, cañerías o recipientes que tuvieron <b>combustible, aceite, pintura o gas</b>, aunque estén "vacíos".</li><li>Los vapores que quedan adentro <b>explotan</b> con el calor.</li><li>Solo se trabajan después de una <b>limpieza</b> y desgasificado hechos según procedimiento, y con <b>autorización</b> de tu jefatura.</li></ul>' },
      { s: 'al_so_ca_fuego', t: 'Si empieza un fuego', x: '<ul><li><b>Detén el trabajo</b> y cierra el gas o apaga la máquina.</li><li>Da la alarma y avisa a tu jefatura.</li><li>Si el fuego es pequeño y tienes una salida a tu espalda, usa el extintor apuntando a la base.</li><li>Si crece o hay mucho humo, <b>evacúa</b> a la zona de seguridad.</li></ul>Si alguien se quema, enfría con agua y avisa: ACHS <b>1404</b>.' }
    ],
    quiz: [
      { s: 'al_so_ca_permiso', v: [
        { q: 'Tienes que soldar una estructura en la faena de un cliente. ¿Qué haces antes de empezar?', o: ['Hago el permiso y espero la firma', 'Empiezo y después completo el permiso', 'Solo aviso al guardia de la entrada', 'Nada, el permiso es solo para el taller'], w: 'Fuera del área de soldadura y en faenas de clientes, sin permiso firmado no se parte.' },
        { q: '¿Quién autoriza el permiso de trabajo en caliente?', o: ['Mi jefatura o quien corresponda', 'El mismo soldador, solo', 'Cualquier compañero que esté cerca', 'Nadie, solo se completa y se guarda'], w: 'El permiso se revisa en terreno y lo autoriza y firma la jefatura o quien corresponda.' },
        { q: 'Si cambian las condiciones del lugar durante el trabajo, se detiene y se revisa de nuevo.', vf: true, w: 'Verdadero. El permiso vale para las condiciones que se revisaron.' } ] },
      { s: 'al_so_ca_10m', v: [
        { q: '¿Qué distancia se despeja de combustibles para un trabajo en caliente?', o: ['10 metros', '1 metro', '3 metros', '50 centímetros'], w: 'Se retira todo lo combustible en 10 metros, o se cubre con mantas ignífugas.' },
        { q: 'Hay un pallet de madera muy pesado a 5 metros de donde vas a cortar. ¿Qué haces?', o: ['Lo cubro con una manta ignífuga', 'Lo dejo así, total es madera dura', 'Lo mojo un poco con agua y corto', 'Corto mirando de vez en cuando el pallet'], w: 'Lo que no se puede retirar se cubre con mantas ignífugas.' },
        { q: 'Las grietas y aberturas del piso se tapan antes de soldar.', vf: true, w: 'Verdadero. Las chispas pasan por ahí y caen a otros niveles.' } ] },
      { s: 'al_so_ca_viajan', v: [
        { q: 'Estás soldando sobre una plataforma. ¿Qué revisas abajo?', o: ['Que no haya combustibles ni personas', 'Nada, las chispas se apagan solas al caer', 'Solo que no haya agua en el piso', 'Que el piso de abajo esté pintado'], w: 'En altura las chispas llegan más lejos y caen encendidas a otros niveles.' },
        { q: '¿Hasta dónde pueden llegar las chispas de soldadura?', o: ['10 metros o más', 'Medio metro como máximo', 'Solo hasta la mesa de soldar', 'Un metro, no más'], w: 'Pueden saltar 10 metros o más, y más aún en altura.' },
        { q: 'Una chispa puede quedar encendida dentro de una grieta y causar fuego más tarde.', vf: true, w: 'Verdadero. Por eso se revisa el lugar después de terminar.' } ] },
      { s: 'al_so_ca_vigia', v: [
        { q: '¿Qué hace el vigía de fuego?', o: ['Mira las chispas con un extintor en la mano', 'Ayuda a soldar para terminar más rápido', 'Prepara las piezas para la próxima soldadura', 'Vigila que nadie se lleve las herramientas'], w: 'El vigía observa las chispas, con extintor, y puede detener el trabajo.' },
        { q: '¿Por qué se necesita un vigía de fuego?', o: ['Porque con careta no ve las chispas', 'Porque el soldador no sabe usar el extintor', 'Porque así se termina antes el trabajo', 'Porque el vigía firma el permiso'], w: 'Con la careta puesta, el soldador no ve dónde caen las chispas.' },
        { q: 'El vigía de fuego puede ayudar en otras tareas mientras vigila.', vf: false, w: 'Falso. El vigía solo vigila: si se distrae, no ve el inicio del fuego.' } ] },
      { s: 'al_so_ca_30', v: [
        { q: 'Terminaste de soldar justo al final del turno. ¿Qué haces?', o: ['Reviso el lugar 30 minutos antes de irme', 'Me voy, el turno ya terminó', 'Apago la luz y cierro la puerta', 'Le aviso al guardia que revise mañana temprano'], w: 'Una brasa escondida puede encenderse después. Se revisa al menos 30 minutos.' },
        { q: '¿Cuánto tiempo se revisa el lugar después de un trabajo en caliente?', o: ['Al menos 30 minutos', 'Solo 1 minuto', 'No hace falta revisar', 'Hasta el día siguiente'], w: 'Al menos 30 minutos, o lo que indique el permiso.' },
        { q: 'Al revisar después del trabajo, también se mira al otro lado de los muros.', vf: true, w: 'Verdadero. El calor y las chispas pueden pasar a través de muros y aberturas.' } ] },
      { s: 'al_so_ca_tambor', v: [
        { q: 'Te piden cortar un tambor "vacío" que tuvo petróleo. ¿Qué haces?', o: ['No lo corto sin limpieza y autorización', 'Lo corto rápido, total ya está vacío por dentro', 'Lo lleno con oxígeno y lo corto', 'Lo caliento primero con el soplete'], w: 'Los vapores que quedan adentro explotan con el calor. Solo con limpieza según procedimiento y autorización.' },
        { q: '¿Por qué es peligroso soldar un estanque que tuvo combustible?', o: ['Porque los vapores que quedan explotan', 'Porque el acero del estanque es blando', 'Porque se ensucia la careta', 'Porque se gasta más soldadura'], w: 'Aunque esté vacío, quedan vapores inflamables que explotan con el calor.' },
        { q: 'Si una cañería tuvo aceite hace mucho tiempo, se puede soldar sin limpiarla.', vf: false, w: 'Falso. Siempre se limpia según procedimiento y con autorización antes de soldar.' } ] }
    ]
  });

  // =====================================================================
  // ACTIVIDADES
  // =====================================================================
  const OLi = '#22303A';
  window.HT_ICO = Object.assign(window.HT_ICO || {}, {
    al_so_careta: `<path d="M12,8 q20,-6 26,10 l-1,20 q-12,8 -25,0 z" fill="#263238" stroke="${OLi}" stroke-width="2"/><rect x="20" y="18" width="14" height="9" rx="1.5" fill="#2E7D32" stroke="${OLi}" stroke-width="1.4"/><path d="M12,14 q-6,8 0,18" stroke="${OLi}" stroke-width="2" fill="none"/>`,
    al_so_chaqueta: `<path d="M16,8 l-8,6 l-4,26 h8 l1,-14 v20 h22 v-20 l1,14 h8 l-4,-26 l-8,-6 l-8,4 z" fill="#A1887F" stroke="${OLi}" stroke-width="2" stroke-linejoin="round"/><path d="M24,12 v28" stroke="${OLi}" stroke-width="1.4"/><circle cx="21" cy="18" r="1.2" fill="${OLi}"/><circle cx="21" cy="26" r="1.2" fill="${OLi}"/><circle cx="21" cy="34" r="1.2" fill="${OLi}"/><path d="M17,8 q7,6 14,0" fill="none" stroke="${OLi}" stroke-width="1.6"/>`,
    al_so_polainas: `<path d="M12,8 h12 v22 l12,4 q4,2 4,6 v2 h-28 z" fill="#A1887F" stroke="${OLi}" stroke-width="2" stroke-linejoin="round"/><path d="M12,16 h12 M12,24 h12" stroke="${OLi}" stroke-width="1.2" stroke-dasharray="2 2"/><path d="M10,44 h32" stroke="#111" stroke-width="3"/>`,
    al_so_polera: `<path d="M15,6 q9,6 18,0 l9,5 l-4,9 l-5,-2 v24 h-18 v-24 l-5,2 l-4,-9 z" fill="#E91E63" stroke="${OLi}" stroke-width="2" stroke-linejoin="round"/><path d="M18,9 q6,4 12,0" fill="none" stroke="${OLi}" stroke-width="1.4"/>` + `<text x="24" y="32" font-size="6.5" font-weight="bold" text-anchor="middle" fill="#fff" font-family="Arial">POLIÉSTER</text>`
  });
  window.HT_ACT = (window.HT_ACT || []).concat([
    { tema: 'so_arco', tipo: 'vestir', q: '🧩 Actividad: el soldador va a soldar al arco con electrodo. Prepáralo con su EPP.',
      items: [['Careta de soldar con filtro', 1, 'al_so_careta', { careta: true }], ['Chaqueta de descarne', 1, 'al_so_chaqueta', { shirt: '#A1887F' }], ['Guantes de descarne', 1, 'guantes#C8A27A', { gloves: '#C8A27A' }],
        ['Polainas de descarne', 1, 'al_so_polainas', { boots: '#A1887F' }], ['Zapatos de seguridad', 1, 'zapatos', { pants: '#2B3A4A' }],
        ['Polera de poliéster', 0, 'al_so_polera', null, 'El poliéster se derrite con las chispas y se pega a la piel: se usa chaqueta de descarne.'], ['Anillo', 0, 'anillo', null, 'Las joyas están prohibidas en ALI: se enganchan, conducen la corriente y se calientan.'], ['Zapatillas', 0, 'zapatillas', null, 'Las chispas y las piezas calientes atraviesan las zapatillas: se usan zapatos de seguridad.']],
      w: 'Para soldar al arco: careta con filtro (con lentes de seguridad debajo), chaqueta y guantes de descarne, polainas y zapatos de seguridad. Sin poliéster, sin joyas y sin zapatillas.' },
    { tema: 'so_oxicorte', tipo: 'orden', q: '🧩 Actividad: ordena los pasos para encender el equipo de oxicorte.',
      items: ['Reviso cilindros, mangueras y válvulas antirretroceso', 'Abro lento las válvulas de los cilindros y regulo la presión', 'Purgo cada manguera por separado', 'Abro un poco el acetileno del soplete y enciendo con el chispero', 'Abro el oxígeno del soplete y regulo la llama'],
      w: 'Primero revisas el equipo, abres los cilindros lento y regulas, purgas las mangueras, enciendes el acetileno con chispero y al final abres el oxígeno para regular la llama.' }
  ]);
})();

/* ---- 70_mant_oficina.js ---- */
/* Maestranza ALI · charlas de Mecánica de mantención (mantención segura de máquinas, grúa horquilla) y de Oficina y bodega
   (trabajo frente al computador, bodega y almacenamiento, entrar al taller siendo de oficina o visita).
   Dibujos con prefijo al_<idcharla>_, clases CSS al_mo*. */
(function () {
  const H = window.HD, T = H.T, pl = H.pill, OL = '#263238';
  const ROJO = '#D7262B', VERDE = '#2E7D32', AZUL = '#1565C0', GRIS = '#455A64';
  const CSS_PROPIO = '<style>'
    + '.al_moBl{animation:al_moBl 1s steps(2) infinite}@keyframes al_moBl{50%{opacity:.25}}'
    + '.al_moMv{animation:al_moMv 2.8s ease-in-out infinite alternate}@keyframes al_moMv{from{transform:translateX(0)}to{transform:translateX(22px)}}'
    + '.al_moMvL{animation:al_moMvL 2.8s ease-in-out infinite alternate}@keyframes al_moMvL{from{transform:translateX(0)}to{transform:translateX(-22px)}}'
    + '.al_moAir{animation:al_moAir .5s linear infinite}@keyframes al_moAir{to{stroke-dashoffset:-10}}'
    + '.al_moSn{animation:al_moSn 1.2s ease-out infinite;transform-box:fill-box;transform-origin:0 50%}@keyframes al_moSn{0%{opacity:0;transform:scale(.6)}50%{opacity:1}100%{opacity:0;transform:scale(1.3)}}'
    + '.al_moUp{animation:al_moUp 1.6s ease-in-out infinite}@keyframes al_moUp{50%{transform:translateY(-5px)}}'
    + '</style>';
  const svg = inner => sv(H.CSS + CSS_PROPIO + inner);

  // ===================== ayudas de dibujo =====================
  const div = () => `<line x1="160" y1="6" x2="160" y2="194" stroke="#fff" stroke-width="5"/><line x1="160" y1="6" x2="160" y2="194" stroke="#90A4AE" stroke-width="1.6" stroke-dasharray="6 4"/>`;
  const qm = (x, y, r = 16) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFC20E" stroke="${OL}" stroke-width="2"/>` + T(x, y + r * .42, '?', r * 1.25, OL);
  const arr = (x1, y1, x2, y2, c = AZUL, w = 3) => { const a = Math.atan2(y2 - y1, x2 - x1), L = 8 + w;
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/><path d="M${x2},${y2} L${(x2 - L * Math.cos(a - .45)).toFixed(1)},${(y2 - L * Math.sin(a - .45)).toFixed(1)} L${(x2 - L * Math.cos(a + .45)).toFixed(1)},${(y2 - L * Math.sin(a + .45)).toFixed(1)} Z" fill="${c}"/>`; };
  const big = (x, y, k, g) => `<g transform="translate(${x},${y}) scale(${k})">${g}</g>`;
  const candado = (x, y, c = H.ALI1, k = 1) => `<path d="M${x + 3 * k},${y} v${-6 * k} a${5 * k},${5 * k} 0 0 1 ${10 * k},0 v${6 * k}" stroke="${OL}" stroke-width="${2.2 * k}" fill="none"/><rect x="${x}" y="${y}" width="${16 * k}" height="${13 * k}" rx="${2 * k}" fill="${c}" stroke="${OL}" stroke-width="${k}"/><circle cx="${x + 8 * k}" cy="${y + 6 * k}" r="${1.6 * k}" fill="${OL}"/>`;
  const tarjeta = (x, y, k = 1) => `<rect x="${x}" y="${y}" width="${30 * k}" height="${42 * k}" rx="${2 * k}" fill="#FFC20E" stroke="${OL}" stroke-width="${k}"/><circle cx="${x + 15 * k}" cy="${y + 6 * k}" r="${3 * k}" fill="#fff" stroke="${OL}" stroke-width="${.8 * k}"/>` + T(x + 15 * k, y + 19 * k, 'PELIGRO', 5.4 * k, '#C62828') + T(x + 15 * k, y + 27 * k, 'NO OPERAR', 4.4 * k, OL) + `<rect x="${x + 5 * k}" y="${y + 31 * k}" width="${20 * k}" height="${1.6 * k}" fill="${OL}"/><rect x="${x + 5 * k}" y="${y + 36 * k}" width="${14 * k}" height="${1.6 * k}" fill="${OL}"/>`;
  const llave = (x, y, k = 1) => `<circle cx="${x}" cy="${y}" r="${4 * k}" fill="none" stroke="#FBC02D" stroke-width="${2.4 * k}"/><path d="M${x + 4 * k},${y} h${10 * k} v${3 * k} M${x + 10 * k},${y} v${3 * k}" stroke="#FBC02D" stroke-width="${2.2 * k}" fill="none"/>`;
  const clip = (x, y, k = 1, checks = 4) => `<rect x="${x}" y="${y}" width="${26 * k}" height="${34 * k}" rx="${2 * k}" fill="#8D6E63" stroke="${OL}" stroke-width="${k}"/><rect x="${x + 3 * k}" y="${y + 5 * k}" width="${20 * k}" height="${27 * k}" fill="#fff"/><rect x="${x + 8 * k}" y="${y - 2 * k}" width="${10 * k}" height="${5 * k}" rx="${1.5 * k}" fill="#90A4AE" stroke="${OL}" stroke-width="${.6 * k}"/>`
    + Array.from({ length: checks }, (_, i) => `<path d="M${x + 5 * k},${y + (10 + i * 6) * k} l${1.5 * k},${1.5 * k} l${3 * k},${-3 * k}" stroke="${VERDE}" stroke-width="${1.2 * k}" fill="none"/><rect x="${x + 11 * k}" y="${y + (9 + i * 6) * k}" width="${10 * k}" height="${1.4 * k}" fill="#90A4AE"/>`).join('');
  const cajaHerr = (x, y, k = 1) => `<rect x="${x}" y="${y - 16 * k}" width="${40 * k}" height="${16 * k}" rx="${2 * k}" fill="${H.ALI1}" stroke="${OL}" stroke-width="${k}"/><rect x="${x}" y="${y - 10 * k}" width="${40 * k}" height="${2 * k}" fill="#B71C1C"/><path d="M${x + 12 * k},${y - 16 * k} v${-6 * k} h${16 * k} v${6 * k}" stroke="${OL}" stroke-width="${2 * k}" fill="none"/>`;
  const llaveFija = (x, y, ang = 0, k = 1, c = '#B0BEC5') => `<g transform="rotate(${ang} ${x} ${y})"><rect x="${x}" y="${y - 2.5 * k}" width="${30 * k}" height="${5 * k}" rx="${2 * k}" fill="${c}" stroke="${OL}" stroke-width="${.8 * k}"/><path d="M${x + 30 * k},${y - 6 * k} h${8 * k} l${-3 * k},${4 * k} v${4 * k} l${3 * k},${4 * k} h${-8 * k} z" fill="${c}" stroke="${OL}" stroke-width="${.8 * k}"/></g>`;
  const martillo = (x, y, ang = 0, k = 1) => `<g transform="rotate(${ang} ${x} ${y})"><rect x="${x}" y="${y - 2 * k}" width="${28 * k}" height="${4 * k}" rx="${1.5 * k}" fill="#8D6E63" stroke="${OL}" stroke-width="${.8 * k}"/><rect x="${x + 26 * k}" y="${y - 8 * k}" width="${7 * k}" height="${16 * k}" rx="${1 * k}" fill="#546E7A" stroke="${OL}" stroke-width="${.8 * k}"/></g>`;
  // guarda (protección) sobre el plato del torno
  const guardaTorno = (x, y) => `<path d="M${x + 25},${y - 54} v-16 a15,15 0 0 1 30,0 v16 z" fill="#FFC20E" fill-opacity=".8" stroke="${OL}" stroke-width="1.2"/><path d="M${x + 30},${y - 66} h20" stroke="#F57F17" stroke-width="2"/>`;
  // botonera de partida y parada de una máquina
  const botonera = (x, y) => `<rect x="${x}" y="${y}" width="18" height="28" rx="2" fill="#ECEFF1" stroke="${OL}"/><circle cx="${x + 9}" cy="${y + 8}" r="4.5" fill="${VERDE}" stroke="${OL}" stroke-width=".8"/><circle cx="${x + 9}" cy="${y + 20}" r="4.5" fill="${ROJO}" stroke="${OL}" stroke-width=".8"/>`;
  // cinta de demarcación (zona en mantención)
  const cinta = (x1, x2, y = 120) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#FFC20E" stroke-width="5"/><line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${OL}" stroke-width="5" stroke-dasharray="6 6"/>` + [x1, x2].map(x => `<rect x="${x - 3}" y="${y - 4}" width="6" height="${165 - y + 4}" fill="#FF7043" stroke="${OL}" stroke-width=".8"/><rect x="${x - 7}" y="161" width="14" height="4" fill="${OL}"/>`).join('');
  // compresor de aire con manguera y pistola de soplado
  const compresor = (x, y) => `<rect x="${x}" y="${y - 26}" width="66" height="22" rx="10" fill="${H.ALI1}" stroke="${OL}" stroke-width="1.2"/><rect x="${x + 12}" y="${y - 46}" width="30" height="20" rx="2" fill="#546E7A" stroke="${OL}"/><circle cx="${x + 52}" cy="${y - 36}" r="6" fill="#fff" stroke="${OL}"/><path d="M${x + 52},${y - 36} l3,-3" stroke="${ROJO}" stroke-width="1.4"/><circle cx="${x + 10}" cy="${y - 3}" r="4" fill="${OL}"/><circle cx="${x + 56}" cy="${y - 3}" r="4" fill="${OL}"/>`;
  // resorte, cilindro hidráulico, manguera de aire: íconos de energías
  const resorte = (x, y, h = 40) => `<path d="M${x},${y} ` + Array.from({ length: 8 }, (_, i) => `l${i % 2 ? -14 : 14},${-h / 8}`).join(' ') + `" stroke="#546E7A" stroke-width="3" fill="none"/>`;
  const rayo = (x, y, k = 1) => `<path d="M${x + 4 * k},${y - 18 * k} l${-10 * k},${18 * k} h${8 * k} l${-4 * k},${16 * k} l${12 * k},${-20 * k} h${-8 * k} z" fill="#FFC20E" stroke="${OL}" stroke-width="${1.2 * k}"/>`;
  const gota = (x, y, c = '#6D4C41', k = 1) => `<path d="M${x},${y - 14 * k} q${9 * k},${12 * k} ${9 * k},${18 * k} a${9 * k},${9 * k} 0 0 1 ${-18 * k},0 q0,${-6 * k} ${9 * k},${-18 * k} z" fill="${c}" stroke="${OL}" stroke-width="${k}"/>`;
  // camión plano (recepción de materiales); x = parte trasera, y = piso
  const camion = (x, y) => `<rect x="${x}" y="${y - 62}" width="128" height="8" fill="#546E7A" stroke="${OL}"/><rect x="${x + 8}" y="${y - 54}" width="150" height="12" fill="#37474F"/>`
    + `<path d="M${x + 132},${y - 30} v-62 h26 q12,0 14,14 l4,22 v26 z" fill="#ECEFF1" stroke="${OL}" stroke-width="1.4"/><path d="M${x + 144},${y - 86} h12 q8,0 10,10 l3,16 h-25 z" fill="#B3E5FC" stroke="${OL}"/>`
    + [x + 22, x + 50, x + 150].map(c => `<circle cx="${c}" cy="${y - 13}" r="13" fill="${OL}"/><circle cx="${c}" cy="${y - 13}" r="5" fill="#90A4AE"/>`).join('');
  const paquetePerfiles = (x, y, w = 60) => [0, 1, 2].map(i => H.viga(x, y - i * 9, w, 9, i % 2 ? '#78909C' : '#90A4AE')).join('') + `<path d="M${x + 10},${y} v-27 M${x + w - 10},${y} v-27" stroke="#5D4037" stroke-width="2"/>`;
  // letrero de velocidad máxima
  const velocidad = (x, y, r = 18) => `<rect x="${x - 2}" y="${y + r}" width="4" height="${165 - y - r}" fill="#78909C"/><circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${ROJO}" stroke-width="${r * .22}"/>` + T(x, y + r * .15, '5', r * .9, OL) + T(x, y + r * .62, 'km/h', r * .34, OL);
  // placa de capacidad de la grúa horquilla
  const placa = (x, y) => `<rect x="${x}" y="${y}" width="96" height="62" rx="4" fill="#ECEFF1" stroke="${OL}" stroke-width="1.6"/><rect x="${x}" y="${y}" width="96" height="14" rx="4" fill="${H.ALI1}"/>` + T(x + 48, y + 11, 'PLACA DE CAPACIDAD', 7.5, '#fff')
    + `<path d="M${x + 10},${y + 52} v-26 M${x + 10},${y + 52} h28" stroke="${OL}" stroke-width="2"/><rect x="${x + 16}" y="${y + 40}" width="14" height="10" fill="#90A4AE"/><path d="M${x + 23},${y + 38} v-10" stroke="${AZUL}" stroke-width="1.4" stroke-dasharray="2 2"/>`
    + T(x + 68, y + 30, 'Carga máx.', 7, OL, 'middle', 'normal') + T(x + 68, y + 42, '___ kg', 9, OL) + T(x + 68, y + 54, 'a ___ mm', 7, OL, 'middle', 'normal');
  // cilindro de bocina (ondas)
  const bocina = (x, y) => `<g class="al_moSn">${[0, 1, 2].map(i => `<path d="M${x + i * 6},${y - 6 - i * 3} q${5},${6 + i * 3} 0,${12 + i * 6}" stroke="${AZUL}" stroke-width="2" fill="none"/>`).join('')}</g>`;
  // operador sentado en la horquilla (para dibujar el cinturón)
  const cinturon = (x, y) => `<path d="M${x + 22},${y - 60} L${x + 40},${y - 60}" stroke="#FF6F00" stroke-width="3.4" stroke-linecap="round"/><rect x="${x + 28}" y="${y - 62.5}" width="5" height="5" fill="#B0BEC5" stroke="${OL}" stroke-width=".6"/>`;
  // vía peatonal en el piso del taller (franja con achurado)
  const viaPeat = (x1, x2) => `<rect x="${x1}" y="172" width="${x2 - x1}" height="16" fill="#FFF59D" opacity=".85"/><path d="M${x1},172 h${x2 - x1} M${x1},188 h${x2 - x1}" stroke="#FFC20E" stroke-width="3"/>` + Array.from({ length: Math.floor((x2 - x1) / 22) }, (_, i) => `<path d="M${x1 + 8 + i * 22},176 l5,4 l-5,4" stroke="#F9A825" stroke-width="2" fill="none"/>`).join('');
  // puerta del taller vista desde la oficina
  const puertaTaller = (x) => `<rect x="${x}" y="54" width="62" height="111" fill="#90A4AE" stroke="#546E7A" stroke-width="3"/><rect x="${x + 6}" y="62" width="50" height="34" fill="#CFD8DC"/>` + T(x + 31, 83, 'TALLER', 10, OL) + `<circle cx="${x + 52}" cy="116" r="3" fill="#ECEFF1"/>`;
  // caballete metálico para planchas; x = izquierda, y = piso
  const caballete = (x, y, h = 46) => `<path d="M${x},${y} l10,${-h} h16 l10,${h}" stroke="${H.ALI2}" stroke-width="4" fill="none"/><rect x="${x + 6}" y="${y - h - 4}" width="24" height="5" fill="#78909C" stroke="${OL}" stroke-width=".8"/>`;
  // estantería simple; x = izquierda, y = piso, w ancho, niveles (alturas desde el piso)
  const estante = (x, y, w, nivs) => `<rect x="${x}" y="${y - nivs[nivs.length - 1] - 6}" width="5" height="${nivs[nivs.length - 1] + 6}" fill="${H.ALI1}"/><rect x="${x + w - 5}" y="${y - nivs[nivs.length - 1] - 6}" width="5" height="${nivs[nivs.length - 1] + 6}" fill="${H.ALI1}"/>`
    + nivs.map(h => `<rect x="${x}" y="${y - h}" width="${w}" height="4" fill="#78909C" stroke="${OL}" stroke-width=".6"/>`).join('');
  const caja = (x, y, w, h, c = '#A1887F', t = '') => `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${c}" stroke="#5D4037" stroke-width="1"/><path d="M${x},${y - h * .65} h${w}" stroke="#5D4037" stroke-width=".8" opacity=".5"/>` + (t ? T(x + w / 2, y - h / 2 + 3, t, Math.min(8, h * .45), '#fff') : '');
  const engranaje = (x, y, r = 12) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#607D8B" stroke="${OL}" stroke-width="1.2" stroke-dasharray="4 2"/><circle cx="${x}" cy="${y}" r="${r * .75}" fill="#78909C" stroke="${OL}"/><circle cx="${x}" cy="${y}" r="${r * .3}" fill="#ECEFF1" stroke="${OL}"/>`;
  // ===================== poses propias =====================
  if (typeof POSES !== 'undefined') Object.assign(POSES, {
    al_mo_pc: { fL: [24, 0], kL: [22, -24], fR: [28, 0], kR: [25, -22], hip: [0, -26], neck: [-2, -54], head: [-1, -65], eL: [3, -36], hL: [20, -38], eR: [6, -36], hR: [23, -38] },
    al_mo_pcmal: { fL: [24, 0], kL: [22, -24], fR: [28, 0], kR: [25, -22], hip: [2, -26], neck: [10, -50], head: [17, -58], eL: [16, -36], hL: [32, -38], eR: [19, -36], hR: [35, -38] },
    al_mo_gafas: { fL: [-7, 0], kL: [-6, -18], fR: [7, 0], kR: [6, -18], hip: [0, -36], neck: [0, -62], head: [0, -73], eL: [8, -60], hL: [6, -73], eR: [12, -60], hR: [9, -73] },
    al_mo_dar: { fL: [-7, 0], kL: [-6, -18], fR: [7, 0], kR: [6, -18], hip: [0, -36], neck: [2, -62], head: [3, -73], eL: [-9, -48], hL: [-11, -35], eR: [14, -52], hR: [26, -54] },
    al_mo_toca: { fL: [-9, 0], kL: [-5, -18], fR: [10, 0], kR: [8, -18], hip: [0, -36], neck: [8, -61], head: [11, -72], eL: [16, -52], hL: [30, -54], eR: [20, -50], hR: [34, -52] },
    al_mo_sopla: { fL: [-7, 0], kL: [-6, -18], fR: [7, 0], kR: [6, -18], hip: [0, -36], neck: [0, -62], head: [0, -73], eL: [-9, -48], hL: [-11, -35], eR: [10, -50], hR: [6, -58] }
  });
  const of = (x, o = {}) => W(x, 165, Object.assign({ area: 'oficina' }, o));
  const ta = (x, o = {}) => W(x, 165, Object.assign({ area: 'taller' }, o));
  const mec = (x, o = {}) => W(x, 165, Object.assign({ area: 'mantencion' }, o));

  // ======================================================================
  // 1. MANTENCIÓN SEGURA DE MÁQUINAS (mt_mantencion)
  // ======================================================================
  S.al_mt_intro = () => svg(H.fondo.taller() + H.torno(14, 165, { gira: false }) + cinta(8, 160, 116) + mec(200, { pose: 'point', flip: true }) + cajaHerr(212, 165) + ta(262, { pose: 'stand', flip: true }) + clip(272, 112, .8)
    + pl(84, 176, 'Torno en mantención', GRIS, 10) + pl(236, 30, 'Primero se planifica', VERDE));
  S.al_mt_bloqueo = () => svg(H.fondo.taller() + big(96, 34, 1.9, H.tablero(0, 0, true)) + mec(70, { pose: 'point' }) + llave(110, 112, 1.2)
    + pl(250, 60, 'Mi candado', H.ALI1) + arr(212, 70, 172, 120, H.ALI1, 2.5) + pl(250, 140, 'Mi tarjeta', '#F57F17') + arr(212, 150, 182, 150, '#F57F17', 2.5) + pl(160, 12, 'Cada uno pone su candado', AZUL));
  S.al_mt_energias = () => { const cx = i => 34 + i * 63, cy = 84;
    const ic = [rayo(cx(0), cy + 2, 1.3),
      `<path d="M${cx(1) - 16},${cy + 8} q10,-24 20,-6 q8,14 14,-10" stroke="${OL}" stroke-width="5" fill="none"/><path d="M${cx(1) - 16},${cy + 8} q10,-24 20,-6 q8,14 14,-10" stroke="#FFC20E" stroke-width="3" fill="none"/><circle cx="${cx(1) + 6}" cy="${cy - 16}" r="8" fill="#fff" stroke="${OL}" stroke-width="1.4"/><path d="M${cx(1) + 6},${cy - 16} l4,-4" stroke="${ROJO}" stroke-width="1.6"/>`,
      `<rect x="${cx(2) - 16}" y="${cy - 8}" width="22" height="16" fill="#90A4AE" stroke="${OL}"/><rect x="${cx(2) + 6}" y="${cy - 3}" width="14" height="6" fill="#ECEFF1" stroke="${OL}"/>` + gota(cx(2) - 4, cy + 22, '#6D4C41', .7),
      resorte(cx(3) - 7, cy + 18, 38),
      `<path d="M${cx(4) - 18},${cy + 22} h36" stroke="${OL}" stroke-width="3"/><rect x="${cx(4) - 14}" y="${cy - 22}" width="28" height="18" fill="#78909C" stroke="${OL}"/><rect x="${cx(4) - 12}" y="${cy - 4}" width="7" height="26" fill="#8D6E63" stroke="${OL}"/><rect x="${cx(4) + 5}" y="${cy - 4}" width="7" height="26" fill="#8D6E63" stroke="${OL}"/>`];
    const tx = [['Eléctrica'], ['Neumática', '(aire)'], ['Hidráulica', '(aceite)'], ['Resortes'], ['Piezas', 'en altura']];
    return svg(H.fondo.liso() + [0, 1, 2, 3, 4].map(i => `<rect x="${cx(i) - 28}" y="44" width="56" height="82" rx="8" fill="#fff" stroke="#90A4AE" stroke-width="1.5"/>` + ic[i] + tx[i].map((t, k) => T(cx(i), 142 + k * 12, t, 10, OL, 'middle', k ? 'normal' : 'bold')).join('')).join('')
      + pl(160, 10, 'Todas las energías, en cero', ROJO) + pl(160, 172, 'Cortar, liberar o calzar', VERDE)); };
  S.al_mt_verificar = () => svg(H.fondo.taller() + H.torno(120, 165, { gira: false }) + botonera(92, 92) + mec(64, { pose: 'point' }) + H.tablero(272, 40, true) + `<circle cx="101" cy="100" r="9" fill="none" stroke="${VERDE}" stroke-width="2.4" class="al_moBl"/>`
    + pl(110, 12, 'Aprieto partir: no parte', VERDE) + H.si(196, 52, 13));
  S.al_mt_herram = () => svg(H.fondo.taller({ vias: false }) + `<rect x="0" y="118" width="320" height="10" fill="#8D6E63" stroke="#5D4037"/><rect x="10" y="128" width="8" height="37" fill="#5D4037"/><rect x="302" y="128" width="8" height="37" fill="#5D4037"/>`
    + llaveFija(30, 104, -25, 1.3) + `<rect x="80" y="96" width="30" height="22" fill="#78909C" stroke="${OL}"/>` + `<path d="M58,90 l8,-6 M62,96 l9,-2" stroke="#FFC20E" stroke-width="2"/>` + `<path d="M118,108 q8,-4 12,4 l-3,6 h-8 z" fill="#A1887F" stroke="${OL}"/><path d="M122,104 l6,-10" stroke="#ECEFF1" stroke-width="2" stroke-dasharray="2 2"/>`
    + pl(80, 22, 'Llave como martillo', ROJO, 10) + pl(80, 46, 'Herramienta hechiza', ROJO, 10) + H.no(80, 150, 13) + div()
    + cajaHerr(176, 118, 1.2) + martillo(236, 108, 0, 1.2) + llaveFija(236, 92, 0, 1) + `<rect x="276" y="90" width="22" height="28" fill="#FFF" stroke="${OL}"/>` + T(287, 108, '✓', 14, VERDE)
    + pl(240, 22, 'La herramienta correcta', VERDE, 10) + pl(240, 46, 'En buen estado', VERDE, 10) + H.si(240, 150, 13));
  S.al_mt_guardas = () => svg(H.fondo.taller() + H.torno(30, 165, { gira: false }) + guardaTorno(30, 165) + `<rect x="74" y="114" width="56" height="8" fill="#FFC20E" fill-opacity=".7" stroke="${OL}"/>` + mec(230, { pose: 'point', flip: true }) + cajaHerr(252, 165)
    + pl(70, 46, 'Guarda en su lugar', VERDE, 10) + arr(70, 66, 70, 82, VERDE, 2.5) + pl(230, 22, 'Sin herramientas olvidadas', AZUL, 10) + pl(110, 176, 'Recién ahí se entrega', VERDE, 10));
  S.al_mt_prueba = () => svg(H.fondo.taller() + H.torno(20, 165) + guardaTorno(20, 165) + ta(196, { pose: 'stand', flip: true }) + mec(244, { pose: 'point', flip: true }) + clip(270, 106, .8)
    + pl(170, 12, 'Prueba con el operador presente', AZUL) + pl(96, 176, 'Funciona bien: se entrega', VERDE, 10));
  S.al_mt_aceites = () => svg(H.fondo.taller({ vias: false }) + H.torno(4, 165, { gira: false }) + H.charco(204, 174, 28, '#4E342E') + mec(176, { pose: 'squat', gloves: '#1E88E5' }) + `<rect x="188" y="140" width="16" height="9" fill="#ECEFF1" stroke="#B0BEC5"/>` + H.bidon(278, 165, '#455A64', 'ACEITE', 1.1)
    + `<path d="M238,165 h26 v-30 h-26 z" fill="#C8E6C9" stroke="${OL}"/>` + T(251, 154, 'ABS', 6.5, OL) + pl(90, 12, 'Guantes de nitrilo', AZUL, 10) + pl(234, 40, 'Derrame: limpiar de inmediato', VERDE, 10) + pl(250, 178, 'Material absorbente', GRIS, 9));
  S.al_mt_aire = () => svg(H.fondo.taller({ vias: false }) + compresor(18, 165) + `<path d="M84,150 q30,10 46,-22 q8,-18 2,-22" stroke="#FFC20E" stroke-width="3" fill="none"/>` + ta(124, { pose: 'al_mo_sopla' }) + `<path d="M130,108 l10,-4" stroke="${OL}" stroke-width="3"/>`
    + `<path d="M142,103 q14,0 20,-6" stroke="#90CAF9" stroke-width="2.4" fill="none" stroke-dasharray="4 4" class="al_moAir"/>` + H.no(176, 76, 13) + div()
    + `<rect x="190" y="128" width="60" height="37" fill="#78909C" stroke="${OL}"/><rect x="198" y="118" width="40" height="10" fill="#90A4AE" stroke="${OL}"/>` + ta(286, { pose: 'point', flip: true }) + `<path d="M258,108 l-8,6" stroke="${OL}" stroke-width="3"/><path d="M248,116 q-10,4 -16,6" stroke="#90CAF9" stroke-width="2.4" fill="none" stroke-dasharray="4 4" class="al_moAir"/>`
    + pl(80, 12, 'Nunca contra el cuerpo', ROJO, 10) + pl(240, 12, 'Solo a la pieza', VERDE, 10) + pl(240, 36, 'Con lentes', VERDE, 10) + H.si(300, 70, 13));
  S.al_mt_q_plan = () => svg(H.fondo.taller() + H.torno(14, 165, { gira: false }) + mec(200, { pose: 'stand', flip: true }) + cajaHerr(212, 165) + qm(260, 60));
  S.al_mt_q_bloq = () => svg(H.fondo.taller() + H.tablero(140, 40, true) + candado(176, 88, '#1565C0', .8) + mec(96, { pose: 'stand' }) + mec(250, { pose: 'stand', flip: true }) + qm(60, 40));
  S.al_mt_q_ener = () => svg(H.fondo.taller() + `<rect x="40" y="50" width="120" height="22" fill="#78909C" stroke="${OL}"/><rect x="60" y="72" width="10" height="56" fill="#8D6E63" stroke="${OL}"/><rect x="130" y="72" width="10" height="56" fill="#8D6E63" stroke="${OL}"/><rect x="20" y="128" width="160" height="37" fill="#5D6D7E" stroke="${OL}"/>` + mec(230, { pose: 'point', flip: true }) + qm(270, 40));
  S.al_mt_q_verif = () => svg(H.fondo.taller() + H.torno(120, 165, { gira: false }) + botonera(92, 92) + mec(64, { pose: 'stand' }) + H.tablero(272, 40, true) + qm(196, 40));
  S.al_mt_q_aire = () => svg(H.fondo.taller({ vias: false }) + compresor(18, 165) + `<path d="M84,150 q30,10 46,-22 q8,-18 2,-22" stroke="#FFC20E" stroke-width="3" fill="none"/>` + ta(124, { pose: 'stand' }) + `<rect x="190" y="128" width="60" height="37" fill="#78909C" stroke="${OL}"/>` + qm(260, 60));

  SI_CONT.temas.push({
    id: 'mt_mantencion', sec: 'mantencion', emp: ['ali'], title: 'Mantención segura de máquinas', thumb: 'al_mt_bloqueo', mins: 20,
    learn: [
      { s: 'al_mt_intro', t: 'Primero se planifica', x: 'Reparar o mantener un torno, una prensa, la guillotina o el compresor tiene riesgos de <b>atrapamiento, cortes, golpes, descarga eléctrica y quemaduras</b>. Antes de empezar, <b>planifica con tu jefatura</b>:<ul><li>Qué equipo se va a intervenir y quién lo usa.</li><li>Qué energías tiene y cómo se cortan.</li><li>Qué herramientas, repuestos y EPP necesitas.</li></ul>Avisa al operador y <b>demarca la zona</b> para que nadie se acerque ni lo intente usar.' },
      { s: 'al_mt_bloqueo', t: 'Bloqueo con candado propio y tarjeta', x: 'Apagar con el botón <b>no basta</b>: alguien puede encender la máquina mientras tienes las manos adentro.<ul><li>Corta la energía en el <b>tablero o el interruptor general</b> del equipo.</li><li>Pon <b>tu propio candado</b> y guarda <b>tu llave</b>.</li><li>Cuelga la <b>tarjeta</b> con tu nombre, la fecha y el motivo.</li></ul>Si trabajan varios, <b>cada uno pone su candado</b>. Nadie saca el candado de otra persona.', k: 'Tu candado y tu llave: nadie más lo saca.' },
      { s: 'al_mt_energias', t: 'Energía cero: no solo la electricidad', x: 'Una máquina puede guardar energía aunque esté desenchufada:<ul><li><b>Neumática:</b> cierra el aire y purga la presión de las mangueras.</li><li><b>Hidráulica:</b> baja la presión del aceite (prensa, plegadora).</li><li><b>Resortes</b> tensos: libéralos o trábalos.</li><li><b>Piezas en altura</b> (el martillo de la prensa, la cuchilla de la guillotina): bájalas o <b>cálzalas</b> para que no caigan.</li><li>Espera que se detengan las piezas que giran y que se enfríe lo caliente.</li></ul>' },
      { s: 'al_mt_verificar', t: 'Verifica antes de meter las manos', x: 'Con tu candado puesto, <b>aprieta el botón de partida</b>: la máquina <b>no debe partir</b>. Revisa también que los manómetros marquen cero y que nada se mueva. Si algo se mueve o enciende, el bloqueo no está completo: <b>detente y revisa</b>. Después deja el botón en apagado.<br>Recién entonces trabajas.', k: 'Si no verificaste que no parte, no metas las manos.' },
      { s: 'al_mt_herram', t: 'Herramientas adecuadas y en buen estado', x: '<ul><li>Usa la herramienta <b>hecha para esa tarea</b>: la llave no es martillo ni el destornillador es palanca.</li><li>Revísala antes de usarla: mangos firmes, sin trizaduras ni cables pelados.</li><li>Las <b>herramientas hechizas</b> están prohibidas.</li><li>Una herramienta defectuosa <b>no se usa</b>: sepárala y avisa.</li><li>Para levantar piezas pesadas usa el tecle o el puente grúa, no la espalda.</li></ul>' },
      { s: 'al_mt_guardas', t: 'Guardas y protecciones, antes de entregar', x: 'Las guardas, tapas y protecciones que sacaste para reparar <b>se vuelven a poner todas</b> antes de devolver la energía. Una máquina <b>sin su guarda no se entrega</b>, aunque funcione.<ul><li>Retira tus herramientas, trapos y repuestos de la máquina.</li><li>Revisa que la <b>parada de emergencia</b> funcione.</li><li>Recién entonces avisas y sacas tu candado.</li></ul>', k: 'Ninguna máquina se entrega sin sus guardas.' },
      { s: 'al_mt_prueba', t: 'Prueba en presencia del operador', x: 'La máquina reparada se <b>prueba con el operador presente</b>: así ve que quedó bien y conoce lo que cambió. En la prueba:<ul><li>Todos fuera de la zona de las piezas que se mueven.</li><li>Se revisan partida, parada y <b>parada de emergencia</b>.</li><li>Si algo suena o se mueve raro, se detiene, se bloquea de nuevo y se revisa.</li></ul>Avisa a tu jefatura que el equipo queda en servicio.' },
      { s: 'al_mt_aceites', t: 'Aceites y grasas', x: '<ul><li>Para manipular aceites, grasas y refrigerantes usa <b>guantes de nitrilo</b> y lentes: el contacto seguido irrita y daña la piel.</li><li>Un derrame se limpia <b>de inmediato</b> con material absorbente: el aceite en el piso hace resbalar.</li><li>Los trapos y absorbentes con aceite van a su <b>contenedor</b>, no a la basura común: pueden encenderse.</li><li>Los aceites, en envases cerrados y rotulados.</li></ul>' },
      { s: 'al_mt_aire', t: 'Compresor y aire comprimido', x: 'El aire comprimido puede <b>meter partículas a los ojos</b>, romper el tímpano y hasta entrar a la sangre por un corte.<ul><li><b>Nunca</b> lo dirijas contra tu cuerpo ni el de otro, ni para sacudirte la ropa.</li><li>Úsalo solo para la pieza, con <b>lentes</b> y nadie al frente.</li><li>Revisa mangueras y acoples antes de usar; una manguera suelta azota.</li><li>Para reparar el compresor: córtalo, bloquéalo y <b>purga el estanque</b>.</li></ul>', k: 'El aire comprimido nunca se dirige al cuerpo.' }
    ],
    quiz: [
      { s: 'al_mt_q_plan', v: [
        { q: 'Te piden reparar la plegadora. ¿Qué haces antes de empezar?', o: ['Planifico con mi jefatura, aviso al operador y demarco', 'Empiezo de inmediato para no atrasar la producción', 'Le pido al operador que la siga usando mientras reviso', 'Desarmo primero y después veo qué energías tiene'], w: 'Antes de intervenir se planifica con la jefatura, se avisa al operador y se demarca la zona para que nadie la use.' },
        { q: '¿Qué se define al planificar una mantención?', o: ['Qué equipo, qué energías tiene, herramientas, repuestos y EPP', 'Solo la hora a la que se termina', 'Solo quién va a pagar el repuesto', 'Solo el color de la tarjeta'], w: 'Planificar es saber qué equipo se interviene, cómo se cortan sus energías y qué herramientas, repuestos y EPP se necesitan.' },
        { q: 'Si la mantención es corta, no hace falta avisar al operador de la máquina.', vf: false, w: 'Falso. Siempre se avisa al operador y se demarca: si no sabe, puede intentar encenderla.' }] },
      { s: 'al_mt_q_bloq', v: [
        { q: 'Dos mecánicos reparan la misma prensa. ¿Cómo se bloquea?', o: ['Cada uno pone su propio candado', 'Basta el candado del más antiguo', 'Uno pone candado y el otro solo la tarjeta', 'Basta apagarla con el botón'], w: 'Cada persona que trabaja en el equipo pone su candado: vuelve a funcionar solo cuando todos sacaron el suyo.' },
        { q: 'Encuentras el candado de un compañero que ya se fue a su casa. ¿Qué haces?', o: ['No lo saco y aviso a mi jefatura', 'Lo corto con un napoleón', 'Lo abro con una llave de repuesto', 'Enciendo la máquina igual'], w: 'Nadie saca el candado de otra persona. Se avisa a la jefatura para resolverlo de forma segura.' },
        { q: '¿Qué dice la tarjeta de bloqueo?', o: ['Quién bloqueó, la fecha y el motivo', 'Solo la marca de la máquina', 'El número del candado', 'El horario del turno'], w: 'La tarjeta informa quién bloqueó, cuándo y por qué, para que nadie encienda el equipo.' }] },
      { s: 'al_mt_q_ener', v: [
        { q: 'Vas a cambiar la cuchilla de la guillotina. Ya cortaste la electricidad. ¿Qué más haces?', o: ['Bajo o calzo la cuchilla y libero la presión', 'Nada más: la electricidad basta', 'Solo me pongo guantes', 'Trabajo rápido para que no baje'], w: 'Las piezas en altura pueden caer por su peso: se bajan o se calzan, y se libera la presión hidráulica o neumática.' },
        { q: '¿Cuál de estas también es una energía que se debe dejar en cero?', o: ['El aire a presión de las mangueras', 'La luz de la ventana', 'El ruido del taller', 'El color de la máquina'], w: 'El aire comprimido, el aceite a presión, los resortes y las piezas en altura también guardan energía.' },
        { q: 'Una prensa desenchufada no tiene ninguna energía peligrosa.', vf: false, w: 'Falso. Puede tener presión hidráulica, resortes tensos o el martillo en altura: todo eso se libera o se calza.' }] },
      { s: 'al_mt_q_verif', v: [
        { q: 'Pusiste tu candado en el tablero del torno. ¿Qué haces antes de meter las manos?', o: ['Aprieto partir y verifico que no parte', 'Meto las manos de inmediato', 'Pido a otro que lo encienda para probar', 'Saco el candado para revisar'], w: 'Siempre se verifica: puede que hayas cortado otro interruptor. Si no parte, el bloqueo está bien.' },
        { q: 'Al verificar, la máquina hace un pequeño movimiento. ¿Qué haces?', o: ['Me detengo y reviso el bloqueo', 'Sigo, porque fue poco', 'Lo sujeto con la mano', 'Aviso al terminar el trabajo'], w: 'Si algo se mueve, el bloqueo no está completo: se detiene todo y se revisa.' },
        { q: 'Después de verificar, el botón se deja en apagado.', vf: true, w: 'Verdadero. Así, al sacar los candados, la máquina no parte sola.' }] },
      { s: 'al_mt_herram', v: [
        { q: 'No encuentras el martillo y tienes una llave a mano. ¿Qué haces?', o: ['Busco la herramienta correcta', 'Golpeo con la llave, con cuidado', 'Golpeo con el destornillador', 'Golpeo con una pieza del torno'], w: 'Cada herramienta tiene su uso. Usar una llave como martillo la daña y puede saltar y golpearte.' },
        { q: 'El mango del martillo está suelto. ¿Qué haces?', o: ['No lo uso, lo separo y aviso', 'Lo amarro con alambre', 'Lo uso con más cuidado', 'Lo dejo en la caja para otro'], w: 'Una herramienta defectuosa no se usa: se separa y se avisa.' },
        { q: 'Una herramienta hechiza se puede usar si funciona bien.', vf: false, w: 'Falso. Las herramientas hechizas están prohibidas: no tienen protecciones y pueden fallar de golpe.' }] },
      { s: 'al_mt_guardas', v: [
        { q: 'Terminaste de reparar el torno. ¿Qué haces antes de sacar tu candado?', o: ['Pongo las guardas, retiro herramientas y aviso', 'Saco el candado y después pongo las guardas', 'Dejo las guardas para el operador', 'Lo entrego sin guardas si funciona bien'], w: 'Guardas puestas, herramientas fuera y aviso; recién entonces se saca el candado.' },
        { q: '¿Quién debe estar en la prueba de la máquina reparada?', o: ['El operador que la usa', 'Nadie, se prueba solo', 'Solo el bodeguero', 'Solo una visita'], w: 'Se prueba con el operador presente: ve que quedó bien y conoce lo que cambió.' },
        { q: 'Una máquina se puede entregar sin su guarda si el operador tiene experiencia.', vf: false, w: 'Falso. Ninguna máquina se entrega sin sus guardas: la experiencia no evita un atrapamiento.' }] },
      { s: 'al_mt_q_aire', v: [
        { q: 'Un compañero se sacude la ropa con la pistola de aire. ¿Qué le dices?', o: ['Que pare: el aire comprimido nunca va al cuerpo', 'Que lo haga más lejos', 'Que use más presión', 'Que se ponga guantes'], w: 'El aire comprimido puede meter partículas a los ojos, romper el tímpano o entrar por un corte.' },
        { q: 'Se derramó aceite junto al torno. ¿Qué haces?', o: ['Lo limpio de inmediato con absorbente y guantes de nitrilo', 'Lo dejo secar solo', 'Le echo agua', 'Lo tapo con un cartón'], w: 'El aceite en el piso hace resbalar: se limpia de inmediato con absorbente, y el absorbente va a su contenedor.' },
        { q: '¿Qué guantes usas para manipular aceites y grasas?', o: ['Guantes de nitrilo', 'Guantes de lana', 'Guantes de descarne', 'Sin guantes, para sentir mejor'], w: 'El nitrilo protege la piel de aceites, grasas y refrigerantes.' }] }
    ]
  });

  // ======================================================================
  // 2. OPERACIÓN DE GRÚA HORQUILLA (mt_horquilla)
  // ======================================================================
  const HQ = (x, y, o = {}) => H.horquilla(x, y, o);
  const conCarga = (x, y, alto, extra = {}) => HQ(x, y, Object.assign({ alto, carga: H.palletPiezas(x + 73, y - alto) }, extra));
  S.al_hq_intro = () => svg(H.fondo.patio() + conCarga(40, 182, 20) + W(262, 182, { area: 'taller', pose: 'stand', flip: true }) + `<rect x="236" y="104" width="30" height="20" rx="2" fill="#E3F2FD" stroke="${OL}"/>` + T(251, 114, 'LIC.', 6, AZUL) + T(251, 121, 'CLASE D', 5, OL)
    + pl(160, 6, 'Solo operadores autorizados', ROJO) + pl(250, 28, 'Licencia clase D', AZUL, 10));
  S.al_hq_chequeo = () => svg(H.fondo.patio() + HQ(20, 182, { op: false, alto: 4 }) + W(172, 182, { area: 'taller', pose: 'carry', flip: true }) + clip(140, 118, .9)
    + pl(270, 30, 'Frenos y dirección', GRIS, 9) + pl(270, 52, 'Neumáticos', GRIS, 9) + pl(270, 74, 'Bocina, luces, baliza', GRIS, 9) + pl(270, 96, 'Horquillas y cadenas', GRIS, 9) + pl(270, 118, 'Fugas de aceite', GRIS, 9) + pl(270, 140, 'Cinturón', GRIS, 9)
    + pl(100, 6, 'Chequeo antes de cada turno', AZUL));
  S.al_hq_cinturon = () => svg(H.fondo.liso('#E8EEF2') + big(-20, -40, 1.7, HQ(40, 140, { alto: 4 }) + cinturon(40, 140)) + placa(212, 40)
    + pl(90, 6, 'Cinturón siempre puesto', '#FF6F00') + pl(260, 112, 'Nunca sobre la capacidad', ROJO, 10) + `<rect y="176" width="320" height="24" fill="#B0BEC5"/>`);
  S.al_hq_desplazar = () => svg(H.fondo.patio() + `<g class="al_moMv">` + conCarga(30, 182, 22) + `</g>` + `<path d="M120,182 v-22" stroke="${AZUL}" stroke-width="2"/><path d="M116,182 h8 M116,160 h8" stroke="${AZUL}" stroke-width="2"/>` + pl(196, 156, '15 a 20 cm del piso', AZUL, 10)
    + pl(160, 6, 'Carga baja e inclinada hacia atrás', VERDE));
  S.al_hq_retro = () => { const torre = [0, 1, 2, 3].map(i => `<rect x="${114}" y="${158 - (i + 1) * 22}" width="36" height="22" fill="#A1887F" stroke="#5D4037"/>`).join('');
    return svg(H.fondo.patio() + `<g class="al_moMvL">` + HQ(40, 182, { alto: 24, carga: `<rect x="113" y="152" width="38" height="6" fill="#A1887F" stroke="#5D4037"/>` + torre }) + `</g>` + arr(30, 98, 4, 98, AZUL, 3)
      + `<path d="M76,96 l40,-4" stroke="${ROJO}" stroke-width="2" stroke-dasharray="4 3"/>` + T(126, 92, '✗', 14, ROJO) + `<path d="M64,98 l-50,8" stroke="${VERDE}" stroke-width="2" stroke-dasharray="4 3"/>`
      + pl(230, 20, 'La carga tapa la vista', ROJO, 10) + pl(230, 46, 'Retrocede mirando atrás', VERDE, 10) + pl(230, 72, 'O pide un señalero', AZUL, 10)); };
  S.al_hq_cruce = () => svg(H.fondo.patio() + velocidad(290, 70) + `<rect x="196" y="150" width="54" height="50" fill="#FFF59D" opacity=".75"/>` + [0, 1, 2, 3, 4].map(i => `<rect x="${200 + i * 10}" y="150" width="5" height="50" fill="#FFF"/>`).join('')
    + conCarga(20, 182, 20) + bocina(146, 120) + W(226, 172, { area: 'taller', pose: 'stop', flip: true })
    + pl(100, 6, 'Bocina en cruces y sin visión', AZUL) + pl(278, 108, 'Máx. 5 km/h', ROJO, 10));
  S.al_hq_personas = () => svg(H.fondo.patio() + HQ(-10, 182, { alto: 70 }) + W(86, 112, { area: 'taller', pose: 'c4reach', face: 'worried' }) + `<rect x="62" y="108" width="40" height="4" fill="#263238"/>` + pl(80, 172, 'Nunca elevar personas', ROJO, 9) + H.no(140, 130, 13) + div()
    + HQ(176, 182, { alto: 4 }) + pl(240, 6, 'Solo va el operador', VERDE, 10) + H.si(300, 50, 13));
  S.al_hq_estac = () => svg(H.fondo.patio() + HQ(30, 182, { op: false, alto: 4, baliza: false }) + W(214, 182, { area: 'taller', pose: 'walk' }) + llave(232, 140, 1.3)
    + `<rect x="103" y="176" width="40" height="5" fill="${VERDE}" opacity=".7"/>` + pl(124, 186 - 6, 'Horquillas en el piso', VERDE, 9) + pl(240, 20, 'Freno puesto y motor apagado', AZUL, 10) + pl(240, 46, 'Llave sacada', H.ALI1, 10) + pl(80, 6, 'Lugar autorizado', VERDE, 10));
  S.al_hq_carga = () => svg(H.fondo.patio() + H.bidon(4, 182, '#C62828', 'COMBUST.', 1) + W(56, 182, { area: 'taller', pose: 'carry', gloves: '#C8A27A' }) + HQ(96, 182, { op: false, alto: 4, baliza: false })
    + H.letrero(222, 40, 'prohibicion', 'NO FUMAR', 50) + H.extintor(286, 182) + pl(80, 6, 'Motor apagado', ROJO, 10) + pl(250, 104, 'Lugar ventilado', AZUL, 10) + pl(250, 128, 'Extintor cerca', AZUL, 10));
  S.al_hq_q_intro = () => svg(H.fondo.patio() + HQ(40, 182, { op: false, alto: 4 }) + W(220, 182, { area: 'taller', pose: 'point', flip: true }) + qm(270, 50));
  S.al_hq_q_desp = () => svg(H.fondo.patio() + HQ(30, 182, { alto: 80, carga: H.palletPiezas(103, 102) }) + W(260, 182, { area: 'taller', pose: 'stand', flip: true, face: 'worried' }) + qm(220, 40));
  S.al_hq_q_cruce = () => svg(H.fondo.patio() + `<rect x="196" y="150" width="54" height="50" fill="#FFF59D" opacity=".75"/>` + conCarga(20, 182, 20) + W(226, 172, { area: 'taller', pose: 'walk', flip: true }) + qm(290, 60));
  S.al_hq_q_estac = () => svg(H.fondo.patio() + HQ(30, 182, { op: false, alto: 40, baliza: false }) + W(214, 182, { area: 'taller', pose: 'walk' }) + qm(270, 50));

  SI_CONT.temas.push({
    id: 'mt_horquilla', sec: 'mantencion', emp: ['ali'], title: 'Operación de grúa horquilla', thumb: 'al_hq_intro', mins: 20,
    learn: [
      { s: 'al_hq_intro', t: 'Solo operadores autorizados', x: 'La grúa horquilla mueve perfiles, planchas y piezas pesadas por el taller y el patio. Sus riesgos son <b>atropellos, volcamientos, caída de la carga y choques</b>. La opera <b>solo quien está capacitado y autorizado</b> por la empresa y tiene <b>licencia clase D</b> vigente. Si no estás autorizado, no la operes ni para moverla "un poquito".', k: 'Sin autorización y licencia clase D, no se opera la grúa horquilla.' },
      { s: 'al_hq_chequeo', t: 'Chequeo antes de cada turno', x: 'Antes de usarla, recórrela con la <b>lista de verificación</b>:<ul><li>Frenos, freno de mano y dirección.</li><li>Neumáticos, horquillas y cadenas del mástil.</li><li>Bocina, luces, baliza y alarma de retroceso.</li><li>Fugas de aceite, combustible o agua.</li><li>Cinturón de seguridad y asiento.</li></ul>Si algo falla, <b>no la uses</b>: déjala fuera de servicio y avisa a tu jefatura.' },
      { s: 'al_hq_cinturon', t: 'Cinturón y capacidad de la placa', x: '<ul><li>Opera <b>siempre con el cinturón puesto</b>: si la grúa se vuelca, te mantiene dentro de la cabina protegida. Nunca saltes de una grúa que se vuelca: afírmate.</li><li>Mira la <b>placa de capacidad</b>: indica la carga máxima según la altura y la distancia del centro de la carga.</li><li><b>Nunca</b> levantes más de lo que dice la placa ni pongas contrapeso extra.</li></ul>' },
      { s: 'al_hq_desplazar', t: 'Carga baja e inclinada atrás', x: '<ul><li>Mete las horquillas <b>hasta el fondo</b> y con la carga centrada y estable; amarra los perfiles largos.</li><li>Viaja con la carga <b>baja</b>, a unos 15 a 20 centímetros del piso, y el mástil <b>inclinado hacia atrás</b>.</li><li>Sube o baja la carga <b>solo detenido</b>, nunca andando.</li><li>Gira despacio y nunca en pendiente.</li><li>En pendientes, la carga va siempre hacia arriba.</li></ul>' },
      { s: 'al_hq_retro', t: 'Si la carga tapa la vista, retrocede', x: 'Si la carga es tan alta que <b>no ves hacia adelante</b>, avanza <b>en retroceso</b>, mirando hacia atrás. Si tampoco así ves bien, pide un <b>señalero</b> y sigue sus indicaciones. Nunca avances "a ciegas".<br>Antes de retroceder, mira y confirma que no hay nadie detrás.' },
      { s: 'al_hq_cruce', t: '5 km/h y bocina en los cruces', x: '<ul><li>Dentro de Maestranza ALI la velocidad máxima es de <b>5 km/h</b>, como una persona caminando.</li><li>En cruces, puertas y lugares sin visibilidad: <b>detente, toca la bocina</b> y mira.</li><li>Los peatones tienen preferencia: espera que crucen.</li><li>Nada de teléfono mientras operas.</li><li>Ingresa al galpón con las luces encendidas.</li></ul>', k: 'Máximo 5 km/h y bocina en cada cruce.' },
      { s: 'al_hq_personas', t: 'Nunca elevar personas', x: '<ul><li><b>Nunca</b> subas a nadie en las horquillas, en un pallet ni en la carga, ni para "alcanzar algo arriba".</li><li>La grúa horquilla lleva <b>solo al operador</b>: nadie va de acompañante.</li><li>Nadie camina ni se para <b>bajo las horquillas</b> levantadas.</li><li>Para trabajar en altura se usa un equipo hecho para eso.</li></ul>' },
      { s: 'al_hq_estac', t: 'Al estacionar', x: '<ul><li>Estaciona en un <b>lugar autorizado</b>, sin tapar pasillos, extintores, tableros ni salidas.</li><li>Baja las <b>horquillas al piso</b>: así nadie tropieza con ellas.</li><li>Pon neutro, <b>freno de mano</b> y apaga el motor.</li><li><b>Saca la llave</b>: así nadie sin autorización la puede usar.</li></ul>' },
      { s: 'al_hq_carga', t: 'Combustible y batería', x: 'Al cargar combustible, cambiar el cilindro de gas o cargar la batería:<ul><li>Hazlo con el <b>motor apagado</b>, en el lugar destinado y ventilado.</li><li><b>Sin fumar</b> ni llamas cerca, y con un <b>extintor a mano</b>.</li><li>Usa guantes y lentes; revisa que no queden fugas.</li><li>Si derramas combustible, límpialo antes de partir.</li></ul>' }
    ],
    quiz: [
      { s: 'al_hq_q_intro', v: [
        { q: '¿Quién puede operar la grúa horquilla?', o: ['Quien está capacitado, autorizado y tiene licencia clase D', 'Cualquiera que sepa manejar auto', 'Cualquier trabajador del taller si es por poco rato', 'El que llegue primero en la mañana'], w: 'Solo opera quien está capacitado y autorizado por la empresa y tiene licencia clase D vigente.' },
        { q: 'El operador no está y necesitas mover un pallet unos metros. No estás autorizado. ¿Qué haces?', o: ['Espero al operador autorizado o aviso a mi jefatura', 'La muevo despacio, son pocos metros', 'Pido a un compañero que me guíe y la muevo', 'La empujo con el motor apagado'], w: 'Sin autorización no se opera, ni siquiera para moverla un poco.' },
        { q: 'Si en el chequeo los frenos fallan, igual se puede usar con cuidado.', vf: false, w: 'Falso. Si algo falla en el chequeo, la grúa no se usa: queda fuera de servicio y se avisa.' }] },
      { s: 'al_hq_chequeo', v: [
        { q: '¿Cuándo se hace el chequeo de la grúa horquilla?', o: ['Antes de cada turno, con la lista de verificación', 'Una vez al mes', 'Solo cuando hace un ruido raro', 'Solo cuando llega nueva'], w: 'El chequeo se hace antes de usarla en cada turno, con la lista de verificación.' },
        { q: 'En el chequeo ves una fuga de aceite bajo la grúa. ¿Qué haces?', o: ['No la uso, la dejo fuera de servicio y aviso', 'La uso y aviso al final del turno', 'Pongo un cartón y la uso', 'Le agrego aceite y sigo'], w: 'Una fuga es una falla: la grúa no se usa y se avisa a la jefatura.' },
        { q: '¿Cuál de estos puntos se revisa en el chequeo?', o: ['Frenos, bocina, luces, horquillas y cinturón', 'Solo el nivel de combustible', 'Solo que encienda', 'Solo el color de la pintura'], w: 'Se revisa todo lo que te protege: frenos, dirección, bocina, luces, horquillas, cadenas, fugas y cinturón.' }] },
      { s: 'al_hq_cinturon', v: [
        { q: 'La grúa se empieza a volcar. ¿Qué haces?', o: ['Me quedo adentro con el cinturón y me afirmo', 'Salto hacia afuera', 'Me paro en el asiento', 'Saco un brazo para apoyarme'], w: 'Con el cinturón quedas dentro de la cabina protegida. Al saltar, la grúa te puede caer encima.' },
        { q: 'Una pieza pesa más de lo que indica la placa de capacidad. ¿Qué haces?', o: ['No la levanto y aviso a mi jefatura', 'La levanto despacio', 'Pongo un compañero atrás de contrapeso', 'La levanto solo un poco'], w: 'Nunca se supera la capacidad de la placa ni se agrega contrapeso.' },
        { q: 'El cinturón se puede dejar sin abrochar si el recorrido es corto.', vf: false, w: 'Falso. El cinturón va siempre puesto: un volcamiento puede pasar en cualquier recorrido.' }] },
      { s: 'al_hq_q_desp', v: [
        { q: '¿Cómo llevas la carga al desplazarte?', o: ['Baja, a 15 o 20 cm del piso, inclinada hacia atrás', 'Alta, para ver por debajo', 'A media altura, inclinada hacia adelante', 'Lo más alto posible para no chocar'], w: 'Con la carga baja e inclinada atrás la grúa es estable y la carga no se cae.' },
        { q: 'Vas andando con la carga y ves que debes dejarla en un nivel alto. ¿Cuándo la subes?', o: ['Cuando estoy detenido frente al lugar', 'Mientras avanzo, para ganar tiempo', 'Mientras giro', 'Antes de partir, desde el principio'], w: 'La carga se sube o se baja solo con la grúa detenida.' },
        { q: 'Un compañero está parado cerca de la grúa con la carga en alto. ¿Qué haces?', o: ['Detengo la maniobra hasta que se aleje', 'Sigo, porque él me ve', 'Le grito y sigo bajando', 'Bajo más rápido'], w: 'Nadie debe estar bajo ni junto a la carga levantada: la maniobra se detiene hasta que se aleje.' }] },
      { s: 'al_hq_q_cruce', v: [
        { q: '¿Cuál es la velocidad máxima de la grúa horquilla dentro de la empresa?', o: ['5 km/h', '20 km/h', '30 km/h', 'La que permita el motor'], w: 'Dentro de Maestranza ALI el máximo es 5 km/h, como una persona caminando.' },
        { q: 'Llegas a un cruce sin visibilidad dentro del galpón. ¿Qué haces?', o: ['Me detengo, toco la bocina y miro', 'Paso rápido para no estorbar', 'Paso con la carga en alto para que me vean', 'Enciendo la radio'], w: 'En cruces y lugares sin visibilidad: detenerse, tocar la bocina y mirar.' },
        { q: 'La carga es tan alta que no ves hacia adelante. ¿Cómo avanzas?', o: ['En retroceso mirando atrás, o con un señalero', 'Hacia adelante, mirando por el costado', 'Hacia adelante, despacio y tocando la bocina', 'Con la carga más alta'], w: 'Si la carga tapa la vista, se avanza en retroceso; si tampoco se ve bien, con un señalero.' }] },
      { s: 'al_hq_personas', v: [
        { q: 'Un compañero te pide que lo subas en las horquillas para alcanzar una pieza. ¿Qué haces?', o: ['Me niego: nunca se elevan personas', 'Lo subo despacio', 'Lo subo sobre un pallet', 'Lo subo si se afirma bien'], w: 'Nunca se elevan personas con la grúa horquilla. Para trabajar en altura se usa un equipo hecho para eso.' },
        { q: '¿Cuántas personas van en la grúa horquilla?', o: ['Solo el operador', 'El operador y un ayudante', 'Dos, si uno va de pie', 'Las que quepan'], w: 'La grúa horquilla lleva solo al operador: nadie va de acompañante.' },
        { q: 'Se puede pasar caminando bajo las horquillas levantadas si es rápido.', vf: false, w: 'Falso. Nadie camina ni se para bajo las horquillas levantadas.' }] },
      { s: 'al_hq_q_estac', v: [
        { q: 'Terminaste de usar la grúa. ¿Cómo la dejas?', o: ['Horquillas en el piso, freno de mano, motor apagado y sin llave', 'Con las horquillas arriba para que no estorben', 'Encendida, por si alguien la necesita', 'Con la llave puesta para el próximo'], w: 'Horquillas en el piso, freno, motor apagado y llave sacada, en un lugar autorizado.' },
        { q: '¿Por qué se saca la llave al estacionar?', o: ['Para que nadie sin autorización la use', 'Para que no se descargue la batería', 'Para que el motor se enfríe', 'Para que la baliza se apague'], w: 'Sacar la llave impide que alguien no autorizado la opere.' },
        { q: 'Vas a cargar combustible a la grúa. ¿Qué es lo correcto?', o: ['Motor apagado, sin fumar y con extintor a mano', 'Motor encendido para no perder tiempo', 'Fumar lejos del estanque, a un par de metros', 'Cargar dentro del galpón cerrado'], w: 'Se carga con el motor apagado, en el lugar destinado y ventilado, sin fumar y con extintor cerca.' }] }
    ]
  });

  // ======================================================================
  // 3. TRABAJO FRENTE AL COMPUTADOR (of_pvd)
  // ======================================================================
  const FL = 165;
  const silla = (hx, o = {}) => `<rect x="${hx - 15}" y="${FL - 27}" width="26" height="5" rx="2" fill="#37474F"/><rect x="${hx - 19}" y="${o.alta ? FL - 70 : FL - 66}" width="6" height="${o.alta ? 45 : 41}" rx="2" fill="#37474F"/>`
    + (o.lumbar ? `<ellipse cx="${hx - 11}" cy="${FL - 38}" rx="4" ry="7" fill="#26A69A"/>` : '') + `<rect x="${hx - 3}" y="${FL - 22}" width="4" height="16" fill="#546E7A"/><path d="M${hx - 16},${FL - 2} L${hx - 1},${FL - 7} L${hx + 14},${FL - 2}" stroke="#546E7A" stroke-width="3" fill="none"/><circle cx="${hx - 16}" cy="${FL - 1}" r="2" fill="${OL}"/><circle cx="${hx + 14}" cy="${FL - 1}" r="2" fill="${OL}"/>`;
  const escritorio = (x, w) => `<rect x="${x}" y="${FL - 36}" width="${w}" height="5" fill="#8D6E63" stroke="#5D4037"/><rect x="${x + w - 10}" y="${FL - 31}" width="6" height="31" fill="#6D4C41"/>`;
  const pantalla = (x, top, h = 28) => `<rect x="${x - 8}" y="${FL - 39}" width="16" height="3" fill="${OL}"/><rect x="${x - 1.5}" y="${top + h - 2}" width="3" height="${FL - 39 - top - h + 2}" fill="#455A64"/><rect x="${x - 3}" y="${top}" width="6" height="${h}" rx="1.5" fill="${OL}"/><rect x="${x - 4.5}" y="${top + 2}" width="2" height="${h - 4}" fill="#64B5F6"/>`;
  const puesto = (hx, o = {}) => silla(hx, o) + escritorio(hx + 12, o.dw || 120) + pantalla(hx + (o.mx || 54), o.mtop !== undefined ? o.mtop : 98) + `<rect x="${hx + 14}" y="${FL - 39}" width="20" height="3" rx="1" fill="#37474F"/><ellipse cx="${hx + 40}" cy="${FL - 37.5}" rx="4" ry="2" fill="#37474F"/>`
    + of(hx, { pose: o.bad ? 'al_mo_pcmal' : 'al_mo_pc', hair: o.hair });
  const vista = (x1, y1, x2, y2, c = AZUL) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="2" stroke-dasharray="5 4"/>`;
  S.al_pv_puesto = () => svg(H.fondo.oficina() + big(-30, -74, 1.45, puesto(80, { lumbar: true })) + pl(250, 120, 'Postura neutra', VERDE) + pl(250, 146, 'Puesto ajustado a ti', AZUL, 10));
  S.al_pv_pantalla = () => svg(H.fondo.oficina() + puesto(40, { bad: true, mtop: 112, dw: 100 }) + vista(57, 108, 90, 120, ROJO) + pl(80, 12, 'Pantalla baja', ROJO, 10) + H.no(140, 56, 13) + div()
    + puesto(196, { dw: 100 }) + vista(200, 100, 248, 100, VERDE) + pl(240, 12, 'A la altura de los ojos', VERDE, 9) + H.si(300, 56, 13));
  S.al_pv_distancia = () => svg(H.fondo.oficina() + big(-20, -66, 1.4, puesto(60, { mx: 58 })) + `<path d="M86,52 h80 M86,46 v12 M166,46 v12" stroke="${AZUL}" stroke-width="2.5" fill="none"/>` + pl(126, 24, '50 a 70 cm', AZUL, 10)
    + `<path d="M240,72 l-60,28" stroke="#FFF59D" stroke-width="10" opacity=".55"/>` + pl(264, 96, 'Ventana de lado', VERDE, 10) + pl(264, 122, 'Sin reflejos', VERDE, 10));
  S.al_pv_silla = () => svg(H.fondo.oficina() + big(-30, -74, 1.45, puesto(80, { lumbar: true })) + `<path d="M106,108 a12,12 0 0 0 12,12" stroke="${VERDE}" stroke-width="2.5" fill="none" transform="translate(-14,-8)"/>`
    + pl(150, 12, 'Codos en 90 grados', VERDE, 10) + pl(270, 80, 'Espalda apoyada', VERDE, 10) + pl(270, 106, 'Pies en el piso', VERDE, 10) + arr(36, 186, 36, 156, AZUL, 2.4) + pl(40, 120, 'Altura', AZUL, 10));
  S.al_pv_teclado = () => { const mano = (x, y, bent) => `<path d="M${x - 70},${y + 4} L${x},${y + 4}" stroke="#ECEFF1" stroke-width="16" stroke-linecap="round"/><path d="M${x - 70},${y + 4} L${x},${y + 4}" stroke="#B0BEC5" stroke-width="1" fill="none"/>` + (bent ? `<path d="M${x},${y + 4} L${x + 22},${y - 12} L${x + 40},${y - 8}" stroke="#F1C9A5" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" fill="none"/>` : `<path d="M${x},${y + 4} L${x + 36},${y + 6}" stroke="#F1C9A5" stroke-width="13" stroke-linecap="round" fill="none"/>`);
    return svg(H.fondo.oficina() + `<rect x="0" y="120" width="320" height="10" fill="#A1887F"/><rect x="66" y="108" width="70" height="12" rx="2" fill="#37474F"/>` + mano(70, 98, true) + H.no(140, 40, 13) + div() + `<rect x="230" y="114" width="70" height="6" rx="2" fill="#37474F"/>` + mano(232, 104, false) + `<ellipse cx="302" cy="117" rx="9" ry="4" fill="#37474F"/>` + H.si(300, 40, 13)
      + pl(80, 150, 'Muñeca doblada', ROJO) + pl(240, 150, 'Muñeca recta', VERDE)); };
  S.al_pv_vista = () => svg(H.fondo.oficina() + `<g transform="translate(50,44)"><circle r="30" fill="#fff" stroke="${OL}" stroke-width="3"/><path d="M0,0 v-20 M0,0 l12,8" stroke="${OL}" stroke-width="3" stroke-linecap="round"/></g>` + pl(50, 84, 'Cada 20 minutos', AZUL, 10)
    + `<g transform="translate(168,52)"><ellipse rx="26" ry="15" fill="#fff" stroke="${OL}" stroke-width="3"/><circle r="9" fill="#5D4037"/><circle r="4" fill="#111"/></g>` + vista(196, 52, 234, 50, VERDE) + pl(168, 84, 'A 6 metros', VERDE, 10) + pl(264, 84, 'Por 20 segundos', AZUL, 10)
    + `<rect x="80" y="112" width="160" height="30" rx="4" fill="#FFF8E1" stroke="#F9A825"/>` + T(160, 132, 'Parpadea seguido', 12, '#E65100'));
  S.al_pv_pausas = () => svg(H.fondo.oficina() + escritorio(170, 140) + pantalla(250, 98) + of(70, { pose: 'cc4hands', anim: 'al_moUp' }) + of(140, { pose: 'cc1sh', hair: true }) + pl(110, 12, 'Pausa activa cada hora', VERDE));
  S.al_pv_orden = () => svg(H.fondo.oficina() + escritorio(10, 120) + `<rect x="20" y="129" width="40" height="22" fill="#A1887F" stroke="#5D4037"/><rect x="18" y="140" width="40" height="12" fill="#8D6E63" stroke="#5D4037"/>` + `<path d="M60,160 q30,6 60,-2 q20,-4 30,4" stroke="${OL}" stroke-width="2.4" fill="none"/>` + of(118, { pose: 'cc4trip', face: 'worried' }) + pl(80, 12, 'Cable en el paso', ROJO, 10) + H.no(140, 46, 13) + div()
    + escritorio(176, 130) + `<path d="M300,128 v30 h-110" stroke="${OL}" stroke-width="2" fill="none" stroke-dasharray="1 0"/><rect x="186" y="155" width="110" height="5" rx="2" fill="#90A4AE"/>` + of(220, { pose: 'walk' }) + pl(240, 12, 'Cables ordenados', VERDE, 10) + H.si(300, 46, 13));
  S.al_pv_q_puesto = () => svg(H.fondo.oficina() + big(-30, -74, 1.45, puesto(80, { bad: true })) + qm(270, 60));

  SI_CONT.temas.push({
    id: 'of_pvd', sec: 'oficina', emp: ['ali'], title: 'Trabajo frente al computador', thumb: 'al_pv_puesto', mins: 15,
    learn: [
      { s: 'al_pv_puesto', t: 'Tu puesto con computador', x: 'En la oficina se pasan muchas horas frente al computador: cotizaciones, compras, remuneraciones, planos. Eso puede causar <b>dolor de cuello, espalda, hombros y muñecas</b>, y cansancio de la vista. Se previene ajustando tu puesto para trabajar en <b>postura neutra</b>: espalda apoyada, hombros sueltos, codos cerca del cuerpo y pies apoyados. Si algo no se puede ajustar, avísalo a tu jefatura.' },
      { s: 'al_pv_pantalla', t: 'Pantalla a la altura de los ojos', x: '<ul><li>El <b>borde superior</b> de la pantalla, a la <b>altura de tus ojos</b> o un poco más abajo.</li><li>La pantalla <b>justo al frente</b>, no girada hacia un lado.</li><li>Si usas notebook muchas horas, súbelo con un soporte y usa teclado y mouse aparte.</li></ul>Una pantalla baja te hace agachar la cabeza todo el día y carga el cuello.' },
      { s: 'al_pv_distancia', t: 'Distancia, luz y reflejos', x: '<ul><li>La pantalla a unos <b>50 a 70 centímetros</b> de tus ojos: más o menos el largo de tu brazo.</li><li>Ubícala <b>de lado a la ventana</b>, no de frente ni de espalda, para evitar reflejos y encandilamiento.</li><li>La oficina debe tener <b>buena iluminación</b>, sin luces que se reflejen en la pantalla.</li><li>Ajusta el brillo y el <b>tamaño de la letra</b> para no acercarte.</li></ul>' },
      { s: 'al_pv_silla', t: 'Silla, espalda y pies', x: '<ul><li>Ajusta la altura de la silla hasta que los <b>codos queden en 90 grados</b> a la altura del escritorio.</li><li>Siéntate atrás, con la <b>espalda apoyada</b> en el respaldo.</li><li>Los <b>pies planos en el piso</b>; si quedan colgando, usa un <b>reposapiés</b>.</li><li>No cruces las piernas por largo rato.</li></ul>Si compartes la silla, ajústala al llegar.' },
      { s: 'al_pv_teclado', t: 'Teclado y mouse', x: '<ul><li>Teclado y mouse <b>cerca</b>, al frente y a la misma altura.</li><li><b>Muñecas rectas</b>, sin doblarlas hacia arriba ni hacia los lados.</li><li>El mouse al lado del teclado, no estirado lejos.</li></ul>Doblar la muñeca por horas puede causar dolor y hormigueo en la mano (trastornos musculoesqueléticos, protocolo <b>TMERT</b>): si aparece, avísalo.' },
      { s: 'al_pv_vista', t: 'Cuida tu vista: regla 20 20 20', x: 'Cada <b>20 minutos</b>, mira algo que esté a unos <b>6 metros</b> durante <b>20 segundos</b>, por ejemplo por la ventana.<br>Frente a la pantalla parpadeamos menos y los ojos se secan y cansan: <b>parpadea seguido</b>. Si ves borroso o te duele la cabeza seguido, consúltalo.', k: 'Cada 20 minutos, mira lejos durante 20 segundos.' },
      { s: 'al_pv_pausas', t: 'Pausas activas', x: 'Levántate y muévete al menos <b>una vez cada hora</b>: gira suave el cuello y los hombros, estira brazos y muñecas y camina un poco. Aprovecha de ir a la impresora o de llevar un documento caminando. Las <b>pausas cortas y seguidas</b> previenen mejor que una pausa larga.', k: 'Cada hora, una pausa activa: levántate, estira y camina.' },
      { s: 'al_pv_orden', t: 'Orden en la oficina', x: 'En la oficina también hay caídas y golpes:<ul><li>Cables <b>ordenados</b> junto al muro o bajo el escritorio, nunca cruzando el paso.</li><li>Cajones y archivadores <b>cerrados</b> después de usarlos.</li><li>Nada de enchufes recargados ni zapatillas eléctricas en cadena.</li><li>Para alcanzar algo alto, usa una escala, nunca una silla con ruedas.</li></ul>' }
    ],
    quiz: [
      { s: 'al_pv_pantalla', v: [
        { q: '¿A qué altura debe quedar el borde superior de la pantalla?', o: ['A la altura de los ojos o un poco más abajo', 'Muy por debajo de la barbilla', 'Bien por encima de la cabeza', 'A la altura del pecho'], w: 'Así miras de frente, sin agachar ni levantar la cabeza.' },
        { q: 'Trabajas todo el día en un notebook sobre el escritorio y te duele el cuello. ¿Qué ayuda?', o: ['Subirlo con un soporte y usar teclado y mouse aparte', 'Bajar más la silla', 'Inclinar la pantalla hacia atrás', 'Trabajar con el notebook en las piernas'], w: 'El notebook queda bajo: con un soporte la pantalla sube y con teclado aparte las manos quedan cómodas.' },
        { q: 'La pantalla debe quedar justo al frente, no girada hacia un lado.', vf: true, w: 'Verdadero. Con la pantalla de lado trabajas con el cuello girado.' }] },
      { s: 'al_pv_distancia', v: [
        { q: '¿A qué distancia de los ojos debe quedar la pantalla?', o: ['A unos 50 a 70 centímetros', 'A unos 10 centímetros', 'A más de 2 metros', 'Pegada a la cara'], w: 'Más o menos el largo de tu brazo.' },
        { q: 'La luz de la ventana se refleja en tu pantalla. ¿Qué haces?', o: ['Ubico la pantalla de lado a la ventana', 'Pongo la pantalla de frente a la ventana', 'Subo el brillo al máximo', 'Me acerco más a la pantalla'], w: 'De lado a la ventana se evitan los reflejos y el encandilamiento.' },
        { q: 'Si la letra se ve muy chica, ¿qué conviene?', o: ['Aumentar el tamaño de la letra', 'Acercar la cara a la pantalla', 'Entrecerrar los ojos', 'Bajar el brillo'], w: 'Agrandar la letra evita que te inclines hacia la pantalla.' }] },
      { s: 'al_pv_q_puesto', v: [
        { q: '¿Cómo deben quedar los codos al escribir?', o: ['En 90 grados, a la altura del escritorio', 'Estirados hacia adelante', 'Levantados sobre el escritorio', 'Colgando bajo el escritorio'], w: 'Codos en 90 grados y hombros sueltos: postura neutra.' },
        { q: 'Subiste la silla y tus pies quedaron colgando. ¿Qué haces?', o: ['Uso un reposapiés', 'Los dejo colgando', 'Cruzo las piernas', 'Los apoyo en las ruedas'], w: 'El reposapiés deja los pies apoyados sin bajar la silla.' },
        { q: 'Tu silla no se puede ajustar y te duele la espalda. ¿Qué haces?', o: ['Lo aviso a mi jefatura', 'Me aguanto', 'Me siento en la punta', 'Trabajo de lado'], w: 'Si el puesto no se puede ajustar, se avisa para corregirlo.' }] },
      { s: 'al_pv_teclado', v: [
        { q: '¿Cómo deben quedar las muñecas al escribir?', o: ['Rectas, sin doblarlas', 'Dobladas hacia arriba', 'Apoyadas en el borde filoso del escritorio', 'Dobladas hacia los lados'], w: 'Doblar la muñeca por horas causa dolor y hormigueo.' },
        { q: '¿Dónde se ubica el mouse?', o: ['Al lado del teclado, cerca y a la misma altura', 'Lejos, al otro extremo', 'Sobre una caja, más alto', 'En las piernas'], w: 'Cerca y a la misma altura, el brazo no se estira.' },
        { q: 'Sientes hormigueo en la mano después de horas con el mouse. ¿Qué haces?', o: ['Corrijo la postura, hago pausas y aviso si sigue', 'Sigo igual hasta que se pase', 'Aprieto más el mouse', 'Escribo con más fuerza'], w: 'El hormigueo es una señal de alerta: corrige la postura, haz pausas y avisa.' }] },
      { s: 'al_pv_vista', v: [
        { q: '¿En qué consiste la regla 20 20 20?', o: ['Cada 20 minutos, mirar a 6 metros por 20 segundos', 'Trabajar 20 horas y descansar 20 minutos', 'Poner la pantalla a 20 centímetros', 'Parpadear 20 veces por hora'], w: 'Mirar lejos descansa los músculos de los ojos.' },
        { q: 'Tus ojos se sienten secos y cansados frente a la pantalla. ¿Qué ayuda?', o: ['Parpadear seguido y mirar lejos cada 20 minutos', 'Acercarme más a la pantalla', 'Subir el brillo al máximo', 'No pestañear para concentrarme'], w: 'Frente a la pantalla parpadeamos menos: hay que parpadear y mirar lejos.' },
        { q: 'Si ves borroso seguido, conviene consultarlo.', vf: true, w: 'Verdadero. Es una señal que conviene revisar.' }] },
      { s: 'al_pv_orden', v: [
        { q: '¿Cada cuánto conviene hacer una pausa activa?', o: ['Al menos una vez cada hora', 'Una vez al día', 'Solo al terminar el turno', 'Cuando ya duele la espalda'], w: 'Cada hora, levántate, estira y camina un poco.' },
        { q: 'El cable del computador cruza el paso junto a tu escritorio. ¿Qué haces?', o: ['Lo ordeno junto al muro o bajo el escritorio', 'Lo dejo, todos lo conocen', 'Lo tapo con una alfombra suelta', 'Lo paso por encima de la silla'], w: 'Un cable cruzado hace tropezar: va ordenado junto al muro o bajo el escritorio.' },
        { q: 'Para alcanzar un archivador alto, ¿qué usas?', o: ['Una escala', 'Una silla con ruedas', 'El escritorio', 'Una caja de papel'], w: 'Una silla con ruedas se mueve y te hace caer: se usa una escala.' }] }
    ]
  });

  // ======================================================================
  // 4. BODEGA Y ALMACENAMIENTO (of_bodega)
  // ======================================================================
  const bod = (x, o = {}) => W(x, 165, Object.assign({ area: 'bodega' }, o));
  const ancla = (x, y) => `<rect x="${x - 6}" y="${y - 3}" width="16" height="3" fill="${OL}"/><circle cx="${x - 3}" cy="${y - 1.5}" r="1.4" fill="#FFC20E"/><circle cx="${x + 7}" cy="${y - 1.5}" r="1.4" fill="#FFC20E"/>`;
  S.al_bo_intro = () => svg(H.fondo.bodega() + bod(160, { pose: 'carry' }) + `<rect x="168" y="106" width="22" height="14" fill="#A1887F" stroke="#5D4037"/>` + pl(160, 176, 'Ordenada, anclada y con pasillos libres', VERDE, 10));
  S.al_bo_anclaje = () => svg(H.fondo.taller({ vias: false }) + estante(60, 165, 150, [4, 44, 84, 124]) + `<rect x="60" y="36" width="150" height="6" fill="#B0BEC5"/>`
    + [62, 205].map(x => ancla(x + 2, 165) + `<rect x="${x - 4}" y="30" width="14" height="8" fill="${OL}"/><circle cx="${x + 3}" cy="34" r="2" fill="#FFC20E"/>`).join('')
    + caja(70, 161, 40, 24) + engranaje(140, 147, 12) + caja(160, 161, 40, 20) + caja(74, 121, 30, 18) + caja(120, 121, 40, 16) + caja(80, 81, 26, 14, '#BCAAA4') + caja(150, 81, 30, 14, '#BCAAA4')
    + `<rect x="226" y="70" width="70" height="40" rx="3" fill="#fff" stroke="${OL}"/>` + T(261, 86, 'CARGA MÁXIMA', 7, OL) + T(261, 100, 'POR NIVEL', 7, OL)
    + pl(70, 4, 'Anclada al piso y al muro', VERDE, 10) + arr(240, 120, 210, 132, AZUL, 2) + pl(261, 128, 'A la vista', AZUL, 9));
  S.al_bo_pesado = () => svg(H.fondo.taller({ vias: false }) + estante(40, 165, 150, [4, 48, 92, 136]) + engranaje(64, 147, 14) + engranaje(94, 147, 14) + caja(114, 161, 36, 28, '#6D4C41', '30 kg') + caja(154, 161, 30, 24, '#6D4C41')
    + caja(54, 117, 40, 20) + caja(108, 117, 40, 22) + caja(56, 73, 26, 14, '#D7CCC8') + caja(96, 73, 22, 12, '#D7CCC8') + caja(140, 73, 30, 14, '#D7CCC8') + caja(66, 29, 22, 10, '#EFEBE9') + caja(132, 29, 22, 10, '#EFEBE9')
    + pl(268, 30, 'Liviano arriba', VERDE, 10) + pl(268, 92, 'Lo más usado al medio', AZUL, 9) + pl(268, 150, 'Pesado abajo', VERDE, 10) + arr(268, 128, 268, 104, GRIS, 2));
  S.al_bo_trepar = () => svg(H.fondo.taller({ vias: false }) + estante(20, 165, 110, [4, 44, 84, 124]) + caja(30, 121, 26, 14) + caja(90, 81, 26, 14) + W(80, 121, { area: 'bodega', pose: 'c4climb', face: 'worried' }) + pl(80, 6, 'Trepar la estantería', ROJO, 10) + H.no(140, 160, 13) + div()
    + estante(196, 165, 110, [4, 44, 84, 124]) + caja(260, 81, 26, 14) + H.escala(222, 165, 64) + W(244, 133, { area: 'bodega', pose: 'c4reach' }) + pl(240, 6, 'Escala en buen estado', VERDE, 10) + H.si(300, 160, 13));
  S.al_bo_perfiles = () => svg(H.fondo.taller({ vias: false }) + `<rect x="30" y="40" width="10" height="125" fill="${H.ALI1}" stroke="${OL}"/><rect x="16" y="160" width="40" height="5" fill="${OL}"/>`
    + [70, 106, 142].map(y => `<path d="M40,${y} h110 l0,-6" stroke="${H.ALI1}" stroke-width="5" fill="none"/>` + H.viga(44, y - 2, 100, 8) + H.viga(48, y - 10, 94, 8, '#90A4AE')).join('')
    + caballete(196, 165, 46) + caballete(266, 165, 46) + [0, 1, 2, 3].map(i => H.plancha(190, 115 - i * 6, 120, 6)).join('')
    + pl(90, 4, 'Perfiles en el rack', VERDE, 10) + pl(250, 60, 'Planchas en caballetes', VERDE, 10) + pl(250, 176, 'Sin puntas hacia el pasillo', AZUL, 9));
  S.al_bo_pasillos = () => svg(H.fondo.bodega() + `<rect x="0" y="150" width="160" height="15" fill="#FFF" opacity="0"/>` + H.viga(10, 172, 120, 8) + caja(36, 165, 30, 20) + bod(110, { pose: 'cc4trip', face: 'worried' }) + pl(80, 6, 'Pasillo con materiales', ROJO, 10) + H.no(140, 36, 13) + div()
    + `<rect x="170" y="168" width="140" height="22" fill="#FFF59D" opacity=".6"/><path d="M170,168 h140 M170,190 h140" stroke="#FFC20E" stroke-width="3"/>` + bod(240, { pose: 'walk' }) + pl(240, 6, 'Pasillo libre y demarcado', VERDE, 10) + H.si(300, 36, 13));
  S.al_bo_recep = () => svg(H.fondo.patio() + camion(116, 182) + HQ(0, 182, { alto: 60, carga: paquetePerfiles(70, 122, 60) }) + H.zonaCarga(64, 70).replace(/176/g, '184').replace(/190/g, '196') + W(222, 198, { area: 'bodega', pose: 'stop', flip: true })
    + pl(100, 4, 'Nadie bajo ni junto a la carga', ROJO, 10) + pl(258, 92, 'Espera fuera del área', VERDE, 9));
  S.al_bo_cargas = () => svg(H.fondo.bodega() + bod(120, { pose: 'lift2', gloves: '#C8A27A' }) + caja(124, 128, 26, 20, '#8D6E63') + caja(60, 165, 36, 26, '#6D4C41', '35 kg') + `<rect x="200" y="140" width="60" height="6" fill="#455A64"/><circle cx="208" cy="158" r="7" fill="${OL}"/><circle cx="252" cy="158" r="7" fill="${OL}"/><path d="M260,140 l14,-40" stroke="#455A64" stroke-width="4"/>` + caja(206, 140, 40, 28, '#6D4C41')
    + pl(160, 4, 'Hombres 25 kg · Mujeres 20 kg', AZUL) + pl(78, 120, 'Muy pesado: ayuda', ROJO, 9) + pl(234, 80, 'O carro', VERDE, 10));
  S.al_bo_q_estante = () => svg(H.fondo.taller({ vias: false }) + estante(60, 165, 150, [4, 44, 84, 124]) + caja(70, 41, 40, 30, '#6D4C41') + engranaje(150, 33, 12) + caja(80, 161, 30, 10, '#EFEBE9') + bod(250, { pose: 'stand', flip: true }) + qm(270, 40));
  S.al_bo_q_recep = () => svg(H.fondo.patio() + camion(116, 182) + HQ(0, 182, { alto: 60, carga: paquetePerfiles(70, 122, 60) }) + W(96, 186, { area: 'bodega', pose: 'walk' }) + qm(280, 40));

  SI_CONT.temas.push({
    id: 'of_bodega', sec: 'oficina', emp: ['ali'], title: 'Bodega y almacenamiento', thumb: 'al_bo_pesado', mins: 15,
    learn: [
      { s: 'al_bo_intro', t: 'La bodega de materiales y repuestos', x: 'En la bodega se guardan perfiles, planchas, pernos, repuestos, discos, gases y herramientas. Sus riesgos son la <b>caída de materiales desde las estanterías</b>, las <b>caídas</b> al trepar o tropezar, los <b>cortes</b> con cantos de planchas y los <b>sobreesfuerzos</b> al levantar. Una bodega ordenada previene casi todos.' },
      { s: 'al_bo_anclaje', t: 'Estanterías ancladas', x: '<ul><li>Las estanterías van <b>ancladas al piso y al muro</b>: un golpe o un sismo puede volcar una estantería suelta.</li><li>Respeta la <b>carga máxima por nivel</b>.</li><li>Si ves una estantería suelta, torcida, golpeada o con una bandeja doblada, <b>no la cargues y avisa</b>.</li><li>Nada sobresale del borde de las bandejas.</li></ul>' },
      { s: 'al_bo_pesado', t: 'Lo pesado abajo', x: '<ul><li>Lo <b>pesado abajo</b>, lo liviano arriba.</li><li>Lo que más se usa, a la altura entre la cintura y los hombros.</li><li>Cajas cerradas, rotuladas y sin apilar más alto que lo estable.</li><li>Las piezas redondas (engranajes, rodamientos, tubos) <b>calzadas</b> para que no rueden.</li></ul>Así la estantería es estable y no tienes que levantar peso sobre los hombros.', k: 'Lo pesado siempre abajo.' },
      { s: 'al_bo_trepar', t: 'No se trepa a las estanterías', x: '<ul><li><b>Nunca</b> trepes por las bandejas de una estantería: se puede volcar o puedes caer.</li><li>Usa una <b>escala en buen estado</b>, bien abierta y apoyada.</li><li>No subas a cajas, sillas ni baldes.</li><li>Para lo pesado en altura, pide apoyo o usa la grúa horquilla con su operador.</li></ul>' },
      { s: 'al_bo_perfiles', t: 'Perfiles y planchas', x: '<ul><li>Los perfiles y tubos largos van en <b>racks</b> y las planchas en <b>caballetes</b> o atriles, nunca apoyados sueltos contra un muro.</li><li>Las puntas no sobresalen hacia los pasillos.</li><li>Las planchas tienen <b>cantos filosos</b>: manipúlalas con <b>guantes</b> y, si son grandes, entre dos o con el tecle.</li><li>Al sacar uno, mira que los demás no se deslicen.</li></ul>' },
      { s: 'al_bo_pasillos', t: 'Pasillos libres', x: '<ul><li>Pasillos <b>libres y demarcados</b>: nada de despuntes, zunchos ni cajas en el paso.</li><li>Extintores, tableros y salidas <b>siempre despejados</b>.</li><li>Los zunchos cortados se botan de inmediato: cortan y hacen tropezar.</li><li>Un derrame se limpia en el momento.</li></ul>' },
      { s: 'al_bo_recep', t: 'Recepción de materiales con grúa', x: 'Cuando llega un camión con perfiles o planchas, la descarga la hace la <b>grúa horquilla o el puente grúa</b> con su operador.<ul><li><b>Nunca pases ni te pares bajo la carga</b> suspendida.</li><li>Espera fuera del área de la maniobra hasta que la carga esté en el piso.</li><li>No subas a la carga del camión para soltar amarras sin que te lo indiquen.</li><li>El chofer espera en el lugar indicado.</li></ul>', k: 'Nunca bajo la carga suspendida.' },
      { s: 'al_bo_cargas', t: 'Levantar cargas: 25 y 20 kilos', x: 'Por la Ley 20.949, el máximo que se levanta a mano es <b>25 kg los hombres y 20 kg las mujeres</b>. Los <b>menores de 18 años y las embarazadas no levantan carga</b>.<ul><li>Dobla las rodillas, espalda recta y la carga pegada al cuerpo.</li><li>Que la carga no te tape la vista.</li><li>Si pesa más, pide ayuda o usa un <b>carro</b>, el tecle o la grúa.</li></ul>' }
    ],
    quiz: [
      { s: 'al_bo_q_estante', v: [
        { q: 'Vas a guardar un motor pesado en la estantería. ¿Dónde lo pones?', o: ['En el nivel de abajo', 'En el nivel más alto', 'En el borde de una bandeja', 'Sobre unas cajas de cartón'], w: 'Lo pesado va abajo: la estantería queda estable y no levantas peso sobre los hombros.' },
        { q: 'Ves una estantería con una bandeja doblada. ¿Qué haces?', o: ['No la cargo y aviso', 'La cargo con menos peso', 'La enderezo a golpes', 'Sigo cargándola igual'], w: 'Una estantería dañada no se carga: se avisa para repararla.' },
        { q: 'Las estanterías deben estar ancladas al piso y al muro.', vf: true, w: 'Verdadero. Un golpe o un sismo puede volcar una estantería suelta.' }] },
      { s: 'al_bo_trepar', v: [
        { q: 'Necesitas una caja del nivel más alto. ¿Qué haces?', o: ['Uso una escala en buen estado', 'Trepo por las bandejas', 'Me subo a una caja', 'La bajo tirándola desde abajo'], w: 'No se trepa a las estanterías: se usa una escala en buen estado, bien apoyada.' },
        { q: '¿Por qué no se debe trepar a una estantería?', o: ['Porque se puede volcar o puedes caer', 'Porque se ensucia', 'Porque se raya la pintura', 'Porque se demora más'], w: 'Tu peso en un lado puede volcar la estantería, y no hay dónde afirmarse.' },
        { q: 'Subirse a una silla con ruedas es una forma segura de alcanzar algo alto.', vf: false, w: 'Falso. Se usa una escala; una silla con ruedas se desliza.' }] },
      { s: 'al_bo_perfiles', v: [
        { q: '¿Dónde se guardan las planchas de acero?', o: ['En caballetes o atriles', 'Apoyadas sueltas contra el muro', 'En el pasillo', 'Sobre la estantería de pernos'], w: 'Una plancha suelta apoyada en el muro puede caer y aplastar o cortar.' },
        { q: 'Vas a mover una plancha delgada. ¿Qué te pones?', o: ['Guantes, por los cantos filosos', 'Nada, si la tomo con cuidado', 'Solo mascarilla', 'Guantes de látex'], w: 'Las planchas tienen cantos que cortan: se manipulan con guantes.' },
        { q: 'Los perfiles largos pueden quedar con las puntas hacia el pasillo si están bien apilados.', vf: false, w: 'Falso. Las puntas hacia el pasillo golpean a quien pasa.' }] },
      { s: 'al_bo_pasillos', v: [
        { q: 'Encuentras zunchos cortados en el pasillo de la bodega. ¿Qué haces?', o: ['Los recojo y los boto de inmediato', 'Los corro con el pie', 'Los dejo para el aseo del viernes', 'Aviso y sigo caminando sobre ellos'], w: 'Los zunchos cortan y hacen tropezar: se botan de inmediato.' },
        { q: '¿Qué debe quedar siempre despejado en la bodega?', o: ['Pasillos, extintores, tableros y salidas', 'Solo la puerta de la oficina', 'Solo la estantería de pernos', 'Nada en especial'], w: 'En una emergencia se necesita llegar rápido al extintor, al tablero y a la salida.' },
        { q: 'Se pueden dejar despuntes en el pasillo si es por poco rato.', vf: false, w: 'Falso. Un pasillo con materiales hace tropezar a cualquiera, aunque sea por poco rato.' }] },
      { s: 'al_bo_q_recep', v: [
        { q: 'La grúa horquilla descarga perfiles del camión. ¿Dónde te ubicas?', o: ['Fuera del área de la maniobra', 'Bajo la carga, para guiarla', 'Junto a las horquillas', 'Sobre el camión'], w: 'Nunca se pasa ni se para bajo o junto a la carga: se espera fuera del área.' },
        { q: 'Debes pasar al otro lado y la grúa tiene la carga en alto. ¿Qué haces?', o: ['Espero que la carga esté en el piso o rodeo', 'Paso rápido por debajo', 'Le hago una seña y paso', 'Paso agachado'], w: 'Bajo una carga suspendida no se pasa nunca: se espera o se da la vuelta.' },
        { q: 'Si la carga está bien amarrada, se puede pasar por debajo.', vf: false, w: 'Falso. Una amarra o una horquilla puede fallar: nunca se pasa bajo la carga.' }] },
      { s: 'al_bo_cargas', v: [
        { q: '¿Cuál es el máximo que puede levantar a mano un hombre?', o: ['25 kg', '50 kg', '40 kg', 'Lo que aguante'], w: 'Por la Ley 20.949: 25 kg los hombres y 20 kg las mujeres.' },
        { q: 'Una caja de repuestos pesa 35 kg. ¿Qué haces?', o: ['Uso un carro o pido ayuda', 'La levanto rápido', 'La arrastro con la espalda doblada', 'La levanto con los brazos estirados'], w: 'Sobre el máximo, se usa un carro, el tecle o se pide ayuda.' },
        { q: 'Una trabajadora embarazada puede levantar cajas de hasta 20 kg.', vf: false, w: 'Falso. Las embarazadas y los menores de 18 años no levantan carga.' }] }
    ]
  });

  // ======================================================================
  // 5. ENTRAR AL TALLER SIENDO DE OFICINA O VISITA (of_taller)
  // ======================================================================
  const ofT = (x, o = {}) => W(x, 165, Object.assign({ area: 'oficina', glasses: true }, o));
  S.al_ot_intro = () => svg(H.fondo.oficina() + puertaTaller(220) + H.letrero(150, 50, 'obligacion', 'LENTES', 36) + H.letrero(150, 88, 'obligacion', 'ZAPATOS', 36) + `<g transform="translate(150,50)"><rect x="9" y="7" width="7" height="5" rx="2" fill="#fff"/><rect x="20" y="7" width="7" height="5" rx="2" fill="#fff"/></g>`
    + of(90, { pose: 'al_mo_gafas', glasses: true }) + pl(110, 12, 'Al taller, siempre con tu EPP', AZUL));
  S.al_ot_epp = () => svg(H.fondo.taller() + of(80, { glasses: false, face: 'worried' }) + `<path d="M74,165 h14" stroke="#ECEFF1" stroke-width="4"/>` + pl(80, 12, 'Sin lentes ni zapatos', ROJO, 10) + H.no(140, 56, 13) + div()
    + ofT(240) + pl(240, 12, 'Lentes y zapatos', VERDE, 10) + H.si(300, 56, 13));
  S.al_ot_vias = () => svg(H.fondo.taller({ vias: false }) + H.torno(20, 160, { gira: true }) + viaPeat(0, 320) + W(220, 182, { area: 'oficina', glasses: true, pose: 'walk' }) + H.esmerilBanco(290, 160)
    + pl(220, 10, 'Camina por la vía peatonal', VERDE));
  S.al_ot_avisar = () => svg(H.fondo.taller() + H.torno(10, 165) + ta(196, { pose: 'point', flip: true }) + ofT(250, { flip: true }) + clip(258, 106, .7)
    + pl(220, 12, 'Avisa al jefe de taller', AZUL) + pl(86, 176, 'Él te indica por dónde ir', VERDE, 10));
  S.al_ot_notocar = () => svg(H.fondo.taller() + H.torno(14, 165) + ta(186, { pose: 'stand', flip: true }) + `<rect x="190" y="146" width="50" height="19" fill="#78909C" stroke="${OL}"/><path d="M196,146 q4,-8 0,-14 M212,146 q4,-8 0,-14" stroke="#FF8A65" stroke-width="2" fill="none" class="adHumo"/>`
    + ofT(270, { pose: 'al_mo_toca', flip: true }) + `<path d="M232,98 l12,12 M244,98 l-12,12" stroke="${ROJO}" stroke-width="3"/>` + pl(110, 12, 'No toques máquinas ni piezas', ROJO) + pl(214, 186 - 8, 'Pueden estar calientes', ROJO, 9));
  S.al_ot_arco = () => svg(H.fondo.soldadura() + H.mesaSoldar(214, 165, 90) + H.extractor(258, 104, true) + W(240, 165, { area: 'soldadura', pose: 'bend', careta: true }) + H.arco(272, 112) + H.chispas(272, 114) + H.biombo(150, 165, 44)
    + W(70, 165, { area: 'visita', pose: 'walk', flip: true }) + pl(80, 12, 'No mires el arco', ROJO) + pl(80, 40, 'Daña la vista sin careta', GRIS, 9));
  S.al_ot_maniobras = () => svg(H.fondo.taller({ vias: false }) + H.puenteGrua(250, 92, H.eslinga(250, 96, 222, 278, 128) + H.viga(212, 140, 76, 12)) + H.zonaCarga(206, 90) + `<g class="al_moMv">` + HQ(0, 165, { alto: 14, carga: H.palletPiezas(73, 151) }) + `</g>`
    + W(170, 165, { area: 'visita', pose: 'stop' }) + pl(160, 40, 'Lejos de la grúa horquilla', ROJO, 10) + pl(270, 188 - 6, 'Nunca bajo la carga', ROJO, 9));
  S.al_ot_visitas = () => svg(H.fondo.oficina() + puertaTaller(250) + ofT(110, { pose: 'al_mo_dar' }) + `<rect x="134" y="106" width="12" height="5" rx="2" fill="#90CAF9" stroke="${OL}"/>` + W(176, 165, { area: 'visita', glasses: false, flip: true })
    + pl(110, 12, 'Entrega el EPP y acompaña', VERDE) + pl(176, 176, 'Visita', GRIS, 10));
  // comparaciones para la actividad de tarjetas (izquierda = así no, derecha = así sí)
  S.al_ot_cmp_via = () => svg(H.fondo.taller({ vias: false }) + `<rect x="0" y="172" width="320" height="16" fill="#FFF59D" opacity=".85"/><path d="M0,172 h320 M0,188 h320" stroke="#FFC20E" stroke-width="3"/>` + H.torno(4, 160, { gira: true }) + W(118, 165, { area: 'oficina', glasses: true, pose: 'walk', flip: true }) + H.no(140, 40, 13) + div()
    + W(240, 182, { area: 'oficina', glasses: true, pose: 'walk' }) + H.si(300, 40, 13));
  S.al_ot_cmp_visita = () => svg(H.fondo.taller() + W(50, 165, { area: 'visita', glasses: false, vest: false, pose: 'walk' }) + H.esmerilBanco(118, 165) + H.chispas(98, 108, 9, -1) + H.no(140, 36, 13) + div()
    + ofT(214, { pose: 'point' }) + W(264, 165, { area: 'visita', flip: true }) + H.si(300, 36, 13));
  S.al_ot_q_intro = () => svg(H.fondo.oficina() + puertaTaller(220) + of(110, { pose: 'walk' }) + qm(60, 50));
  S.al_ot_q_arco = () => svg(H.fondo.soldadura() + H.mesaSoldar(214, 165, 90) + H.extractor(258, 104, true) + W(240, 165, { area: 'soldadura', pose: 'bend', careta: true }) + H.arco(272, 112) + H.chispas(272, 114) + W(110, 165, { area: 'visita', pose: 'stand' }) + qm(50, 50));
  S.al_ot_q_maniob = () => svg(H.fondo.taller({ vias: false }) + H.puenteGrua(220, 92, H.eslinga(220, 96, 192, 248, 128) + H.viga(182, 140, 76, 12)) + W(110, 165, { area: 'visita', pose: 'walk' }) + qm(50, 60));

  SI_CONT.temas.push({
    id: 'of_taller', sec: 'oficina', emp: ['ali'], title: 'Entrar al taller siendo de oficina o visita', thumb: 'al_ot_intro', mins: 15,
    learn: [
      { s: 'al_ot_intro', t: 'El taller es otro mundo', x: 'Aunque trabajes en la oficina, a veces entras al taller: llevar una orden de trabajo, revisar una pieza, acompañar a un cliente o a un proveedor. En el taller hay <b>partículas que saltan, arco de soldadura, máquinas girando, grúas y cargas en movimiento</b>. Por eso, quien entra, aunque sea por un minuto, cumple las mismas reglas que los trabajadores del taller.' },
      { s: 'al_ot_epp', t: 'Lentes y zapatos de seguridad, siempre', x: '<ul><li>Antes de cruzar la puerta, ponte <b>lentes de seguridad</b>: en Maestranza ALI se usan <b>en todo momento</b> dentro del taller.</li><li>Entra con <b>zapatos de seguridad</b>, nunca con zapatillas, tacos ni sandalias.</li><li>Sin joyas colgando, pelo suelto ni ropa suelta cerca de las máquinas.</li><li>Si vas a una zona ruidosa, usa <b>protector auditivo</b>.</li></ul>', k: 'Sin lentes y zapatos de seguridad, no se entra al taller.' },
      { s: 'al_ot_vias', t: 'Camina solo por las vías peatonales', x: '<ul><li>Camina por las <b>vías peatonales demarcadas</b> en el piso.</li><li>No cortes camino entre máquinas ni por zonas de trabajo.</li><li>No corras ni camines mirando el teléfono.</li><li>En los cruces, <b>detente y mira</b> si viene la grúa horquilla.</li></ul>' },
      { s: 'al_ot_avisar', t: 'Avisa al jefe de taller', x: 'Al llegar, <b>avisa al jefe de taller</b> a qué vas. Él te dice por dónde ir, a quién buscar y qué zonas evitar en ese momento (una soldadura, una maniobra con el puente grúa, una prueba de máquina).<br>Para hablar con un operador que está trabajando, <b>espera a que detenga la máquina</b> y te vea: no le hables ni lo toques por la espalda.' },
      { s: 'al_ot_notocar', t: 'No toques máquinas ni piezas', x: '<ul><li><b>No toques</b> máquinas, botones, herramientas ni controles: solo los usa quien está capacitado y autorizado.</li><li>No toques las piezas: pueden estar <b>calientes</b> por la soldadura o el oxicorte, o tener <b>cantos filosos</b>.</li><li>No te acerques a máquinas girando ni metas la mano para "ver" una pieza.</li></ul>' },
      { s: 'al_ot_arco', t: 'No mires el arco de soldadura', x: 'La luz del <b>arco de soldadura</b> daña los ojos aunque la mires un momento y de lejos: produce una quemadura que se siente horas después, como arena en los ojos. Los lentes de seguridad <b>no</b> protegen del arco.<ul><li><b>No mires</b> hacia la soldadura: da la espalda o mira hacia otro lado.</li><li>Respeta los biombos y cortinas: no los corras.</li><li>No pases por la zona de oxicorte ni de esmerilado.</li></ul>', k: 'Nunca mires el arco de soldadura.' },
      { s: 'al_ot_maniobras', t: 'Lejos de la grúa horquilla y de las cargas', x: '<ul><li>Mantente <b>lejos de la grúa horquilla</b>: el operador puede no verte. Si se acerca, detente y espera que pase.</li><li><b>Nunca pases bajo una carga suspendida</b> del puente grúa o del tecle, ni bajo las horquillas levantadas.</li><li>Si suena una bocina o una alarma de retroceso, detente y mira.</li></ul>' },
      { s: 'al_ot_visitas', t: 'Visitas: siempre acompañadas', x: 'Si traes a un cliente, un proveedor o una visita:<ul><li><b>Entrégale el EPP</b> (lentes y, si corresponde, chaleco y protector auditivo) antes de entrar.</li><li>Explícale las reglas: vías peatonales, no tocar, no mirar el arco.</li><li><b>Acompáñala todo el tiempo</b>: una visita nunca anda sola por el taller.</li><li>Al salir, recibe el EPP prestado.</li></ul>Tú eres responsable de su seguridad mientras esté contigo.', k: 'Una visita nunca anda sola por el taller.' }
    ],
    quiz: [
      { s: 'al_ot_q_intro', v: [
        { q: 'Debes llevar una orden de trabajo al taller. Estás con zapatillas y sin lentes. ¿Qué haces?', o: ['Me pongo zapatos y lentes de seguridad antes de entrar', 'Entro rápido, es solo un minuto', 'Entro con cuidado mirando el piso', 'Entro sin lentes si no hay nadie soldando'], w: 'Quien entra al taller, aunque sea por un minuto, usa lentes y zapatos de seguridad.' },
        { q: '¿Cuándo se usan los lentes de seguridad en el taller?', o: ['En todo momento', 'Solo al esmerilar', 'Solo si hay alguien soldando', 'Solo si lo pide el jefe'], w: 'En Maestranza ALI los lentes se usan en todo momento dentro del taller.' },
        { q: 'Si trabajas en la oficina y entras al taller por un momento, no necesitas EPP.', vf: false, w: 'Falso. En el taller cualquiera puede recibir una partícula o un golpe: se entra siempre con el EPP.' }] },
      { s: 'al_ot_vias', v: [
        { q: 'Para llegar a la oficina del jefe de taller, ¿por dónde caminas?', o: ['Por la vía peatonal demarcada', 'Entre las máquinas, por el camino más corto', 'Por donde circula la grúa horquilla', 'Por debajo del puente grúa'], w: 'Se camina solo por las vías peatonales demarcadas.' },
        { q: 'Llegas a un cruce de la vía peatonal dentro del taller. ¿Qué haces?', o: ['Me detengo y miro si viene la grúa horquilla', 'Cruzo corriendo', 'Cruzo mirando el teléfono', 'Cruzo sin mirar, tengo preferencia'], w: 'En los cruces se detiene y se mira: el operador puede no verte.' },
        { q: 'Quieres hablar con un tornero que está trabajando. ¿Qué haces?', o: ['Espero que detenga la máquina y me vea', 'Le toco el hombro por la espalda', 'Le grito desde lejos', 'Me acerco al torno para hablarle'], w: 'Distraer a quien opera una máquina puede causarle un accidente: se espera que la detenga.' }] },
      { s: 'al_ot_notocar', v: [
        { q: 'Ves una pieza recién terminada junto a la mesa de soldar. ¿Qué haces?', o: ['No la toco: puede estar caliente o filosa', 'La tomo para verla mejor', 'La muevo para despejar', 'La toco con un dedo para probar'], w: 'Las piezas pueden estar calientes o tener cantos filosos: no se tocan.' },
        { q: '¿Quién puede apretar los botones de una máquina del taller?', o: ['Solo quien está capacitado y autorizado', 'Cualquiera que sepa cuál es', 'La visita, si tiene curiosidad', 'El de oficina, si el operador no está'], w: 'Las máquinas las opera solo quien está capacitado y autorizado.' },
        { q: 'Avisar al jefe de taller al entrar sirve para saber qué zonas evitar en ese momento.', vf: true, w: 'Verdadero. Él sabe dónde hay soldadura, maniobras o pruebas en ese momento.' }] },
      { s: 'al_ot_q_arco', v: [
        { q: 'Pasas cerca de alguien soldando. ¿Qué haces?', o: ['No miro el arco: miro hacia otro lado', 'Miro un momento para ver cómo lo hace', 'Miro con mis lentes de seguridad', 'Corro la cortina para ver mejor'], w: 'La luz del arco daña los ojos aunque sea un momento, y los lentes de seguridad no protegen del arco.' },
        { q: '¿Protegen los lentes de seguridad del arco de soldadura?', o: ['No, para eso está la careta del soldador', 'Sí, completamente', 'Sí, si son oscuros', 'Sí, si miras de lejos'], w: 'Los lentes protegen de partículas, no de la luz del arco.' },
        { q: 'Mirar la soldadura un segundo y de lejos no causa daño.', vf: false, w: 'Falso. Puede quemar los ojos: se siente horas después, como arena en los ojos.' }] },
      { s: 'al_ot_q_maniob', v: [
        { q: 'El puente grúa lleva una viga por el pasillo por donde vas. ¿Qué haces?', o: ['Me detengo y espero que pase, sin ponerme debajo', 'Paso rápido por debajo', 'Paso agachado', 'Sigo, porque el operador me ve'], w: 'Nunca se pasa bajo una carga suspendida: se espera fuera de su recorrido.' },
        { q: 'Escuchas una alarma de retroceso cerca. ¿Qué haces?', o: ['Me detengo y miro de dónde viene', 'Sigo caminando', 'Me pongo detrás del vehículo', 'Corro hacia la máquina'], w: 'La alarma avisa que un vehículo retrocede: te detienes y miras.' },
        { q: 'La grúa horquilla se acerca por la vía. ¿Qué es lo correcto?', o: ['Alejarme y esperar que pase', 'Pararme al frente para que me vea', 'Caminar junto a las horquillas', 'Pedirle que me lleve'], w: 'El operador puede no verte: te alejas y esperas que pase.' }] },
      { s: 'al_ot_visitas', v: [
        { q: 'Llega un cliente que quiere ver su pieza en el taller. ¿Qué haces?', o: ['Le entrego el EPP, le explico las reglas y lo acompaño', 'Le indico dónde está y que vaya solo', 'Lo llevo sin EPP, es solo un momento', 'Le pido a un soldador que lo atienda mientras suelda'], w: 'Una visita entra con EPP, conoce las reglas y va acompañada todo el tiempo.' },
        { q: '¿Quién es responsable de la visita mientras está en el taller?', o: ['Quien la acompaña', 'La propia visita, sola', 'El primer trabajador que la vea', 'Nadie'], w: 'Quien trae a la visita la acompaña y vela por su seguridad.' },
        { q: 'Una visita puede recorrer sola el taller si ya conoce la maestranza.', vf: false, w: 'Falso. Una visita nunca anda sola por el taller.' }] }
    ]
  });

  // ===================== actividades =====================
  window.HT_ACT = (window.HT_ACT || []).concat([
    { tema: 'mt_horquilla', tipo: 'orden', q: '🧩 Actividad: terminaste de usar la grúa horquilla. Ordena los pasos para estacionarla.',
      items: ['Llego despacio a un lugar autorizado, sin tapar pasillos ni extintores', 'Bajo las horquillas hasta el piso', 'Pongo neutro y el freno de mano', 'Apago el motor y saco la llave'],
      w: 'Primero llegas a un lugar autorizado; bajas las horquillas al piso, pones neutro y freno de mano, y al final apagas el motor y sacas la llave.' },
    { tema: 'of_taller', tipo: 'tarjetas', q: '🧩 Actividad: vas a entrar al taller. ¿Así sí o así no? Desliza cada tarjeta.', binario: true, cats: ['✅ Así sí', '❌ Así no'], sub: ['', ''],
      items: [['Entrar al taller con lentes y zapatos de seguridad', 0, 'al_ot_epp:R'], ['Entrar sin lentes porque es solo un minuto', 1, 'al_ot_epp:L'],
        ['Caminar por la vía peatonal demarcada', 0, 'al_ot_cmp_via:R'], ['Cortar camino entre las máquinas', 1, 'al_ot_cmp_via:L'],
        ['Acompañar a la visita con su EPP puesto', 0, 'al_ot_cmp_visita:R'], ['Dejar que la visita recorra sola el taller', 1, 'al_ot_cmp_visita:L'],
        ['Mirar un momento el arco de soldadura', 1, 'al_ot_q_arco'], ['Esperar fuera del recorrido de la carga suspendida', 0, 'al_ot_maniobras']],
      w: 'Así sí: lentes y zapatos de seguridad, vías peatonales, visitas con EPP y acompañadas, y lejos de las cargas. Así no: entrar sin EPP, cortar camino entre máquinas, dejar sola a la visita o mirar el arco.' }
  ]);
})();

/* ---- 99_fin.js ---- */
// (fin de las charlas)
