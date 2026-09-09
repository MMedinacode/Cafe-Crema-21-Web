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
   CARTA — selección real curada, extraída en vivo el 09-09-2026
   directo de la ficha de Rappi del local (carta completa: 90+
   productos con precios reales). Categorías cruzadas con la
   pestaña "Menú" de Google Maps, que muestra las mismas familias
   de productos.
-------------------------------------------------------------- */
const CATEGORIES = [
  { id: 'waffles', label: 'Waffles & Fondues' },
  { id: 'dulces', label: 'Dulces' },
  { id: 'picar', label: 'Para Picar' },
  { id: 'rolls', label: 'Rolls Destacados' },
  { id: 'burger', label: 'Sushi Burguer & Gohan' },
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
  dulces: {
    items: [
      { n: 'Muffin', d: 'Muffin de vainilla con chips de chocolate de la casa, 1 pza.', p: '$2.200' },
      { n: 'Pie de Limón', d: 'Pie de limón con merengue de la casa, porción personal.', p: '$3.200' },
      { n: 'Torta de Chocolate', d: 'Bizcocho de chocolate con ganache de chocolate de la casa.', p: '$4.500' },
      { n: 'Selva Negra', d: 'Trozo de Selva Negra con bizcocho de chocolate, crema y cerezas.', p: '$4.900' },
    ],
    note: 'Precios reales extraídos en vivo de Rappi (09-09-2026).'
  },
  picar: {
    items: [
      { n: 'Gyozas de Cerdo (5 un.)', d: 'Al vapor o fritas. Rellenas de carne de cerdo.', p: '$3.300' },
      { n: 'Gyozas de Camarón (5 un.)', d: 'Servidas al vapor o fritas.', p: '$3.500' },
      { n: 'Mozzarella Tempura (6 un.)', d: 'Bolas de mozzarella apanadas en tempura.', p: '$5.100' },
      { n: 'Kids Teriyaki', d: 'Cubos de pollo teriyaki acompañado con papas fritas.', p: '$5.100' },
      { n: 'California Tako', d: 'Pulpo, palta y queso crema, envuelto en sésamo o ciboulette.', p: '$4.500' },
    ],
    note: 'Precios reales extraídos en vivo de Rappi (09-09-2026).'
  },
  rolls: {
    items: [
      { n: 'California Ebi Cheese', d: 'Camarón, queso crema y palta, envuelto en sésamo.', p: '$4.500' },
      { n: 'Avocado (Sake)', d: 'Salmón, queso crema y palta.', p: '$5.700' },
      { n: 'Acevichado Roll', d: 'Queso crema, palta, camarón apanado, coronado con ceviche y salsa acevichada — el más mencionado en las reseñas.', p: '$5.900' },
      { n: 'Sake Furay', d: 'Salmón, queso, palta y huevas de pescado, en tempura.', p: '$6.800' },
      { n: 'Nigiri Sake', d: '2 piezas de arroz cubiertas con salmón fresco.', p: '$2.500' },
      { n: 'Sashimi Salmón', d: '7 cortes.', p: '$5.600' },
    ],
    note: 'Selección real entre más de 60 variedades de rolls disponibles — ver carta completa en Rappi.'
  },
  burger: {
    items: [
      { n: 'Sushi Burguer', d: 'Hamburguesa con champiñón, queso, palta y lechuga en pan con sésamo.', p: '$7.000' },
      { n: 'Sake Burger', d: 'Hamburguesa de salmón con queso, palta, lechuga y tomate en pan con sésamo.', p: '$7.500' },
      { n: 'Gohan Salmón', d: 'Salmón, queso crema, palta, nori, sésamo, masago y cebollín.', p: '$6.500' },
      { n: 'Gohan Mizuki', d: 'Pulpo, atún, salmón, camarón, palta, cebollín y sésamo.', p: '$7.000' },
      { n: 'Sushipleto Sake', d: 'Salmón, queso y palta.', p: '$7.500' },
    ],
    note: 'Precios reales extraídos en vivo de Rappi (09-09-2026).'
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
