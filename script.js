/* ============================================================
   PANTALLA DE CARGA
   ============================================================ */
(function(){
  const el = document.getElementById('loadScreen');
  function hide(){ el.classList.add('hidden'); }
  window.addEventListener('load', () => setTimeout(hide, 200));
  setTimeout(hide, 700);
})();

/* ============================================================
   NAVEGACIÓN SPA POR PESTAÑAS
   ============================================================ */
const panels = document.querySelectorAll('.tab-panel');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.15 });

function armReveal(el) {
  revealObserver.observe(el);
  // Red de seguridad: si el IntersectionObserver no dispara a tiempo, el contenido
  // no puede quedar invisible para siempre — se fuerza visible.
  setTimeout(() => el.classList.add('in'), 1200);
}

function goToTab(tabId) {
  panels.forEach(p => p.classList.toggle('active', p.dataset.tabPanel === tabId));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.tab === tabId));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('main-nav').classList.remove('open');
  const activePanel = document.querySelector('.tab-panel.active');
  if (activePanel) activePanel.querySelectorAll('.reveal').forEach(armReveal);
}
document.querySelectorAll('[data-tab]').forEach(el => {
  el.addEventListener('click', (e) => { e.preventDefault(); goToTab(el.dataset.tab); });
});
document.querySelectorAll('.tab-panel.active .reveal').forEach(armReveal);

document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('main-nav').classList.toggle('open');
});

/* --------------------------------------------------------------
   CARTA — carta completa real, extraída en vivo de la ficha de
   Rappi del local (rappi.cl/restaurantes/900098632-cafe-crema-21).
   Ampliada el 15-09-2026: antes solo se mostraba una selección
   curada de 5 categorías con un link a "ver la carta completa en
   Rappi"; ahora están las 93 variantes reales con precio, en las
   mismas categorías que usa Rappi. Se dejaron fuera solo las filas
   que eran duplicados exactos de otra fila de la propia ficha de
   Rappi (mismo nombre/precio repetido dos veces).
-------------------------------------------------------------- */
const CATEGORIES = [
  { id: 'waffles', label: 'Waffles & Fondues' },
  { id: 'picar', label: 'Para Picar' },
  { id: 'dulces', label: 'Dulces' },
  { id: 'california', label: 'California Rolls' },
  { id: 'avocado', label: 'Avocado Rolls' },
  { id: 'salmon', label: 'Envueltos en Salmón' },
  { id: 'cheese', label: 'Cheese Rolls' },
  { id: 'nikkei', label: 'Nikkei Rolls' },
  { id: 'oriental', label: 'Oriental & Tempura Rolls' },
  { id: 'veggie', label: 'Veggie Rolls' },
  { id: 'gohan', label: 'Gohan & Sushipleto' },
  { id: 'burger', label: 'Sushi Burguer' },
  { id: 'sashimi', label: 'Sashimi, Nigiri y Hosomaki' },
];

const MENU = {
  waffles: {
    items: [
      { n: 'Waffle Solo', d: 'Waffle con salsa, fruta a elegir y azúcar flor. Incluye fresas y crema.', p: '$4.500' },
      { n: 'Waffle Nutella', d: 'Waffle con nutella, fruta, bola de helado, salsa a elegir, crema chantillí y 1 topping de la casa.', p: '$6.500' },
      { n: 'Waffle Remolino', d: 'Waffle con nutella, 2 frutas, bola de helado, salsa a elegir, crema chantillí y 1 topping de la casa.', p: '$7.000' },
      { n: 'Waffle Remolino XL', d: 'Waffle con nutella, fruta, 3 bolas de helado, salsa a elegir, crema chantillí y 3 toppings de la casa.', p: '$13.900' },
      { n: 'Fondue para Dos', d: 'Waffles en trozos con frutas de temporada, marshmallows y chocolate derretido.', p: '$7.800' },
      { n: 'Fondue Familiar', d: 'Waffles en trozos con frutas de temporada, marshmallows y chocolate derretido de la casa.', p: '$14.500' },
    ],
    note: 'Precios reales extraídos en vivo de Rappi (09-09-2026).'
  },
  picar: {
    items: [
      { n: 'California Tako', d: 'Pulpo, palta y queso crema, envuelto en sésamo o ciboulette.', p: '$4.500' },
      { n: 'California Sake', d: 'Salmón, palta y queso crema, envuelto en sésamo o ciboulette.', p: '$4.800' },
      { n: 'Gyozas de Cerdo (5 un.)', d: 'Al vapor o fritas. Rellenas de carne de cerdo.', p: '$3.300' },
      { n: 'Gyozas de Pollo (5 un.)', d: 'Al vapor o fritas.', p: '$3.300' },
      { n: 'Gyozas de Camarón (5 un.)', d: 'Servidas al vapor o fritas.', p: '$3.500' },
      { n: 'Tempura Kids', d: 'Cubos de pollo apanado, servidos con arroz blanco y salsa unagi.', p: '$4.900' },
      { n: 'Mozzarella Tempura (6 un.)', d: 'Bolas de mozzarella apanadas en tempura.', p: '$5.100' },
      { n: 'Kids Teriyaki', d: 'Cubos de pollo teriyaki acompañado con papas fritas.', p: '$5.100' },
    ],
    note: 'Precios reales extraídos en vivo de Rappi (15-09-2026).'
  },
  dulces: {
    items: [
      { n: 'Muffin', d: 'Muffin de vainilla con chips de chocolate de la casa, 1 pza.', p: '$2.200' },
      { n: 'Pie de Limón', d: 'Pie de limón con merengue de la casa, porción personal.', p: '$3.200' },
      { n: 'Torta de Chocolate', d: 'Bizcocho de chocolate con ganache de chocolate de la casa.', p: '$4.500' },
      { n: 'Selva Negra', d: 'Trozo de Selva Negra con bizcocho de chocolate, crema y cerezas.', p: '$4.900' },
    ],
    note: 'Precios reales extraídos en vivo de Rappi (09-09-2026).'
  },
  california: {
    items: [
      { n: 'California Maki', d: 'Kanikama, queso crema y palta, envuelto en sésamo o ciboulette.', p: '$4.300' },
      { n: 'California Tempura', d: 'Camarón tempura, palta y queso crema, envuelto en sésamo o ciboulette.', p: '$4.300' },
      { n: 'California Ebi Cheese', d: 'Camarón, queso crema y palta, envuelto en sésamo. Decorado con ciboulette.', p: '$4.500' },
      { n: 'California Tori', d: 'Pollo teriyaki y palta, envuelto en sésamo o ciboulette.', p: '$4.500' },
      { n: 'Pollo Furai', d: 'Pollo, queso crema y palta, envuelto en sésamo o ciboulette.', p: '$4.700' },
    ],
    note: 'Precios reales extraídos en vivo de Rappi (15-09-2026).'
  },
  avocado: {
    items: [
      { n: 'Palmito Avocado', d: 'Palmito, queso crema y palta.', p: '$5.000' },
      { n: 'Kanikama Cheese Roll', d: 'Kanikama, palta, queso crema y camarón.', p: '$5.000' },
      { n: 'Avocado Ebi', d: 'Camarón, queso crema y palta.', p: '$5.200' },
      { n: 'Ebi Cheese Roll', d: 'Camarón, queso crema y palta.', p: '$5.300' },
      { n: 'Avocado Tori', d: 'Pollo furai, queso crema y palta, envuelto en palta, salsa unagi y toques de sésamo.', p: '$5.300' },
      { n: 'Tempura Palta', d: 'Camarón apanado, queso y palta sobre una base crujiente.', p: '$5.500' },
      { n: 'Tako Roll', d: 'Pulpo, queso crema y palta, cubierto con semillas de sésamo.', p: '$5.500' },
      { n: 'Pollo Apanado', d: 'Pollo apanado cubierto con queso derretido y rodajas de palta.', p: '$5.500' },
      { n: 'Tori Crispy', d: 'Pollo furai con queso crema y cebollín, sobre papas hilo crujientes.', p: '$5.500' },
      { n: 'Avocado (Sake)', d: 'Salmón, queso crema y palta.', p: '$5.700' },
    ],
    note: 'Precios reales extraídos en vivo de Rappi (15-09-2026).'
  },
  salmon: {
    items: [
      { n: 'Palmito Sake', d: 'Roll de sushi con palmito, queso crema y palta.', p: '$5.300' },
      { n: 'Sake Ebi Tempura', d: 'Camarón apanado, queso y palta.', p: '$5.500' },
      { n: 'Envueltos en Salmón', d: 'Palta, kanikama, envueltos en salmón.', p: '$5.500' },
      { n: 'Sake Ebi', d: 'Camarón, palta, queso y arroz.', p: '$5.500' },
      { n: 'Sake Tako', d: 'Pulpo, queso y palta sobre pan tostado.', p: '$5.500' },
      { n: 'Kanikama Sake', d: 'Kanikama, queso y palta.', p: '$5.500' },
      { n: 'Sake Tori', d: 'Pollo apanado relleno de queso derretido y palta.', p: '$5.500' },
      { n: 'Sake Emily', d: 'Rollos de salmón rellenos de queso crema, con palta y brotes verdes.', p: '$5.800' },
      { n: 'Sake', d: 'Salmón, queso y cebollín.', p: '$5.800' },
    ],
    note: 'Precios reales extraídos en vivo de Rappi (15-09-2026).'
  },
  cheese: {
    items: [
      { n: 'Cheese Lucia', d: 'Pollo teriyaki, palta y cebollín.', p: '$5.400' },
      { n: 'Cheese Ebi', d: 'Camarón, cebollín y queso fundido en tempura crujiente.', p: '$5.400' },
      { n: 'Cheese Rolls', d: 'Camarón, palta y queso.', p: '$5.700' },
      { n: 'Cheese Kani Ebi', d: 'Camarón apanado, kanikama, queso y palta.', p: '$5.700' },
      { n: 'Cheese Tori', d: 'Pollo apanado con queso derretido, cebollín y palta.', p: '$5.800' },
      { n: 'Cheese Sake', d: 'Salmón, palta y queso.', p: '$5.800' },
    ],
    note: 'Precios reales extraídos en vivo de Rappi (15-09-2026).'
  },
  nikkei: {
    items: [
      { n: 'Teriyaki Grillado', d: 'Queso crema, camarón apanado, palta, envuelto en salmón grillado con teriyaki.', p: '$5.500' },
      { n: 'Jamaco Roll', d: 'Queso, cebollín, camarón apanado, envuelto en queso gratinado con salsa de maracuyá y camote al hilo.', p: '$5.500' },
      { n: 'Pollo Saltado', d: 'Pollo salteado con cebolla y pimientos, acompañado de arroz blanco.', p: '$5.400' },
      { n: 'Frutilla Roll', d: 'Queso crema, palta, camarón apanado, cubierto con frutilla y salsa de maracuyá.', p: '$5.600' },
      { n: 'Doritos Guacamole Roll', d: 'Pollo apanado, cebollín, coronado con guacamole y doritos.', p: '$5.700' },
      { n: 'Pulpo Nikkei', d: 'Roll de salmón apanado, queso y cebollín, envuelto en palta, con pulpo al olivo y queso gratinado.', p: '$5.700' },
      { n: 'Emma Roll', d: 'Roll de queso, cebollín y camarón frito, coronado con tártar de salmón, palta y atún.', p: '$5.700' },
      { n: 'Mango Roll', d: 'Queso crema, camarón apanado, envuelto en mango con salsa de maracuyá.', p: '$5.800' },
      { n: 'Ají de Gallina Roll', d: 'Palta, camarón apanado y coronado con ají de gallina.', p: '$5.800' },
      { n: 'Huancaína Roll', d: 'Salmón, salsa huancaína y papas al hilo.', p: '$5.800' },
      { n: 'Plátano Roll', d: 'Queso crema y pollo furai, envuelto en tajada de plátano y salsa de maracuyá.', p: '$5.800' },
      { n: 'Acevichado Roll', d: 'Queso crema, palta, camarón apanado, coronado con ceviche y salsa acevichada — el más mencionado en las reseñas.', p: '$5.900' },
    ],
    note: 'Precios reales extraídos en vivo de Rappi (15-09-2026).'
  },
  oriental: {
    items: [
      { n: 'Ebi Oriental', d: 'Camarón furai, queso crema, palta y cebollín; envuelto en pollo apanado y salsa teriyaki.', p: '$5.800' },
      { n: 'Tuna Oriental Panko', d: 'Atún, kanikama y queso, envuelto en panko crujiente.', p: '$5.800' },
      { n: 'Avocado Tuna Oriental', d: 'Atún, queso y camarón apanado; envuelto en panko.', p: '$5.800' },
      { n: 'Avocado Oriental', d: 'Queso, camarón apanado y salmón; envuelto en palta, bañado en salsa acevichada.', p: '$5.900' },
      { n: 'Sabi Oriental', d: 'Camarón furai, salmón, palta, queso crema y ciboulette; envuelto en palta, sin arroz.', p: '$6.000' },
      { n: 'Tempura Ebi Cheese', d: 'Camarón y queso crema envueltos en masa tempura crujiente.', p: '$5.600' },
      { n: 'Tori', d: 'Pollo furai, queso crema, palta; envuelto en pollo apanado, salsa unagi y toques de sésamo.', p: '$5.600' },
      { n: 'Tori Panko', d: 'Pollo, queso crema y cebollín, apanado en panko y cubierto con sésamo y salsa teriyaki.', p: '$5.600' },
      { n: 'Tropical Tempura', d: 'Pollo furai, queso crema y palta; envuelto en pollo tempura y salsa de maracuyá.', p: '$5.800' },
      { n: 'Mizuki Roll', d: 'Salmón, camarón furai, palta, envuelto en panko, salsa unagi y toques de sésamo.', p: '$6.000' },
      { n: 'Sake Furay', d: 'Salmón, queso, palta y huevas de pescado, en tempura.', p: '$6.800' },
    ],
    note: 'Precios reales extraídos en vivo de Rappi (15-09-2026).'
  },
  veggie: {
    items: [
      { n: 'Coreano Veggie', d: 'Palmito, champiñón y cebollín, envuelto en nori tempurizado.', p: '$5.000' },
      { n: 'Hot Palmito', d: 'Palmito, queso crema, ciboulette y champiñón, envuelto en panko.', p: '$5.000' },
      { n: 'Veggie Keto Oriental', d: 'Palmito, champiñón, palta y pepino (sin arroz), envuelto en palta.', p: '$6.300' },
    ],
    note: 'Precios reales extraídos en vivo de Rappi (15-09-2026).'
  },
  gohan: {
    items: [
      { n: 'Gohan Vegetariano', d: 'Palmito, champiñón, choclo, palta y sésamo.', p: '$6.000' },
      { n: 'Gohan Salmón', d: 'Salmón, queso crema, palta, nori, sésamo, masago y cebollín.', p: '$6.500' },
      { n: 'Gohan Tori (Base Arroz)', d: 'Pollo teriyaki, queso crema, palta, sésamo y cebollín sobre base de arroz.', p: '$6.500' },
      { n: 'Gohan Ebi Tempura', d: 'Camarón tempura, queso crema, cebollín, sésamo y palta.', p: '$6.500' },
      { n: 'Gohan Mizuki', d: 'Pulpo, atún, salmón, camarón, palta, cebollín y sésamo.', p: '$7.000' },
      { n: 'Sushipleto Sake', d: 'Salmón, queso y palta.', p: '$7.500' },
      { n: 'Sushipleto Chiken', d: 'Pollo apanado, queso y palta.', p: '$7.500' },
    ],
    note: 'Precios reales extraídos en vivo de Rappi (15-09-2026).'
  },
  burger: {
    items: [
      { n: 'Veggie Burger', d: 'Palmito, queso y palta.', p: '$7.000' },
      { n: 'Sushi Burguer', d: 'Hamburguesa con champiñón, queso, palta y lechuga en pan con sésamo.', p: '$7.000' },
      { n: 'Ebi Burger', d: 'Hamburguesa de camarón con queso cheddar, palta y salsa especial en pan brioche.', p: '$7.300' },
      { n: 'Ebi', d: 'Camarón, queso y palta.', p: '$7.500' },
      { n: 'Chiken Burger', d: 'Hamburguesa de pollo apanado con queso cheddar y palta en pan brioche.', p: '$7.500' },
      { n: 'Sake Burger', d: 'Hamburguesa de salmón con queso, palta, lechuga y tomate en pan con sésamo.', p: '$7.500' },
    ],
    note: 'Precios reales extraídos en vivo de Rappi (15-09-2026).'
  },
  sashimi: {
    items: [
      { n: 'Ebi Maki', d: 'Alga nori rellena con arroz y camarón.', p: '$3.000' },
      { n: 'Kani Maki', d: 'Alga rellena con arroz, kanikama y alga verde.', p: '$3.000' },
      { n: 'Nigiri Sake', d: '2 piezas de arroz cubiertas con salmón fresco.', p: '$2.500' },
      { n: 'Nigiri Acevichado', d: '2 piezas de arroz cubiertas con salmón y salsa acevichada.', p: '$2.700' },
      { n: 'Sake Maki Hosomaki', d: 'Alga rellena con arroz, salmón y palta.', p: '$3.300' },
      { n: 'Sashimi Salmón', d: '7 cortes.', p: '$5.600' },
      { n: 'Sashimi Atún', d: '7 cortes.', p: '$5.600' },
    ],
    note: 'Precios reales extraídos en vivo de Rappi (15-09-2026).'
  }
};

const tabsEl = document.getElementById('menuTabs');
const panelsEl = document.getElementById('menuPanels');

CATEGORIES.forEach((cat, i) => {
  const tab = document.createElement('button');
  tab.className = 'menu-tab' + (i === 0 ? ' active' : '');
  tab.textContent = cat.label;
  tab.dataset.key = cat.id;
  tab.addEventListener('click', () => showMenuTab(cat.id));
  tabsEl.appendChild(tab);

  const data = MENU[cat.id];
  const panel = document.createElement('div');
  panel.className = 'menu-panel' + (i === 0 ? ' active' : '');
  panel.id = 'panel-' + cat.id;
  const grid = document.createElement('div');
  grid.className = 'menu-grid';
  const catBlock = document.createElement('div');
  catBlock.className = 'menu-cat';
  const h = document.createElement('h3');
  h.textContent = cat.label;
  catBlock.appendChild(h);
  data.items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'menu-item';
    const nameEl = document.createElement('span');
    nameEl.className = 'name';
    nameEl.textContent = item.n;
    const descEl = document.createElement('span');
    descEl.className = 'desc';
    descEl.textContent = item.d || '';
    nameEl.appendChild(descEl);
    const priceEl = document.createElement('span');
    priceEl.className = 'price';
    priceEl.textContent = item.p || 'Consultar';
    row.appendChild(nameEl);
    row.appendChild(priceEl);
    row.addEventListener('click', () => openModal(cat.label, item));
    catBlock.appendChild(row);
  });
  if (data.note) {
    const note = document.createElement('p');
    note.className = 'ph-note';
    note.style.marginTop = '14px';
    note.style.fontSize = '.76rem';
    note.style.color = 'var(--ink-soft)';
    note.textContent = data.note;
    catBlock.appendChild(note);
  }
  grid.appendChild(catBlock);
  panel.appendChild(grid);
  panelsEl.appendChild(panel);
});

function showMenuTab(key) {
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.toggle('active', t.dataset.key === key));
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + key));
}

/* --------------------------------------------------------------
   MODAL PRODUCTO
-------------------------------------------------------------- */
const modalOverlay = document.getElementById('modalOverlay');
const modalBox = document.getElementById('modalBox');
let currentItem = null;
function openModal(cat, item) {
  currentItem = { ...item, cat };
  document.getElementById('modalCategory').textContent = cat;
  document.getElementById('modalName').textContent = item.n;
  document.getElementById('modalDesc').textContent = item.d;
  document.getElementById('modalPrice').textContent = item.p || 'Consultar';
  toggleModal(true);
}
function toggleModal(open) { modalOverlay.classList.toggle('open', open); modalBox.classList.toggle('open', open); }
document.getElementById('modalCloseBtn').addEventListener('click', () => toggleModal(false));
modalOverlay.addEventListener('click', () => toggleModal(false));
document.getElementById('modalAddBtn').addEventListener('click', () => {
  if (currentItem) { addToCart(currentItem); toggleModal(false); toggleCart(true); }
});

/* --------------------------------------------------------------
   CARRITO — sin WhatsApp confirmado; el checkout invita a llamar
   al teléfono fijo real registrado en Google Maps.
-------------------------------------------------------------- */
let cart = [];

function addToCart(item) { cart.push({ ...item }); renderCart(); }
function removeFromCart(idx) { cart.splice(idx, 1); renderCart(); }

function firstPrice(p) {
  if (!p) return null;
  const m = p.replace(/\./g, '').match(/\$(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

function renderCart() {
  const linesEl = document.getElementById('cartLines');
  linesEl.innerHTML = '';
  if (cart.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'cart-empty';
    empty.textContent = 'Aún no agregas productos. Explora la carta y súmalos aquí.';
    linesEl.appendChild(empty);
  } else {
    cart.forEach((c, i) => {
      const line = document.createElement('div');
      line.className = 'cart-line';
      const info = document.createElement('div');
      const name = document.createElement('div');
      name.className = 'name';
      name.textContent = c.n;
      const price = document.createElement('div');
      price.className = 'price';
      price.textContent = c.p || 'Consultar precio';
      info.appendChild(name);
      info.appendChild(price);
      const removeBtn = document.createElement('button');
      removeBtn.className = 'cart-remove';
      removeBtn.textContent = '✕';
      removeBtn.addEventListener('click', () => removeFromCart(i));
      line.appendChild(info);
      line.appendChild(removeBtn);
      linesEl.appendChild(line);
    });
  }
  const total = cart.reduce((sum, c) => {
    const v = firstPrice(c.p);
    return v ? sum + v : sum;
  }, 0);
  const hasUnpriced = cart.some(c => !firstPrice(c.p));
  document.getElementById('cartTotal').textContent = cart.length
    ? '$' + total.toLocaleString('es-CL') + (hasUnpriced ? ' + a confirmar' : '')
    : '$0';
}
function toggleCart(open) { document.getElementById('cartOverlay').classList.toggle('open', open); document.getElementById('cartPanel').classList.toggle('open', open); }
document.getElementById('cartFab').addEventListener('click', () => toggleCart(true));
document.getElementById('cartCloseBtn').addEventListener('click', () => toggleCart(false));
document.getElementById('cartOverlay').addEventListener('click', () => toggleCart(false));
renderCart();

/* --------------------------------------------------------------
   ESTADO ABIERTO / CERRADO — horario real (highlight "Horarios"
   del Instagram oficial, corroborado por Rappi y Google Maps el
   09-09-2026): domingo a jueves 14:00–00:00, viernes 12:00–19:00,
   sábado 19:00–00:00.
-------------------------------------------------------------- */
function getSantiagoNow() {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Santiago', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
    }).formatToParts(new Date());
    const map = {}; parts.forEach(p => map[p.type] = p.value);
    return { day: map.weekday, hour: parseInt(map.hour) + parseInt(map.minute) / 60 };
  } catch (e) {
    const now = new Date();
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return { day: days[now.getDay()], hour: now.getHours() + now.getMinutes() / 60 };
  }
}

const now = getSantiagoNow();
let isOpen;
if (now.day === 'Fri') isOpen = now.hour >= 12 && now.hour < 19;
else if (now.day === 'Sat') isOpen = now.hour >= 19;
else isOpen = now.hour >= 14; // domingo a jueves: 14:00 a 00:00 (cruza medianoche)
document.getElementById('statusDot').classList.toggle('closed', !isOpen);
document.getElementById('statusText').textContent = isOpen ? 'Abierto ahora' : 'Cerrado ahora';
