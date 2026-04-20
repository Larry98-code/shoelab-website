// ShoeLab.de — Main JavaScript
// Wesley AI Assistant + Shop Cart + UI

const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>navbar.classList.toggle('scrolled',scrollY>60));
document.getElementById('hamburger').addEventListener('click',()=>document.getElementById('mobMenu').classList.add('open'));
document.getElementById('mobClose').addEventListener('click',closeMob);
function closeMob(){document.getElementById('mobMenu').classList.remove('open');}
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');}),{threshold:0.1});
document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));
function handleBook(btn){
  btn.textContent='Sending…';btn.style.background='#881010';
  setTimeout(()=>{btn.textContent='✓ BOOKED — WE\'LL CONFIRM SHORTLY';btn.style.background='#1a5c1a';},1500);
}
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const t=document.querySelector(a.getAttribute('href'));
  if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
}));

// ── SHOP CART ──────────────────────────────────────────
let cart = {};

function addToCart(id, name, brand, price, emoji) {
  if (cart[id]) {
    cart[id].qty += 1;
  } else {
    cart[id] = { id, name, brand, price, emoji, qty: 1 };
  }
  updateCartUI();
  showToast(name, emoji);
}

function removeFromCart(id) {
  delete cart[id];
  updateCartUI();
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) delete cart[id];
  updateCartUI();
}

function updateCartUI() {
  const items = Object.values(cart);
  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);

  // count badge
  const countEl = document.getElementById('cartCount');
  countEl.textContent = totalQty;
  countEl.classList.remove('bump');
  void countEl.offsetWidth;
  countEl.classList.add('bump');

  // items list
  const el = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');

  if (items.length === 0) {
    el.innerHTML = '<div class="cart-empty"><div class="cart-empty-icon">🛒</div><p>Your cart is empty</p><p style="font-size:0.7rem;color:var(--muted);">Add some products above</p></div>';
    footer.style.display = 'none';
  } else {
    el.innerHTML = items.map(i => `
      <div class="cart-item">
        <div class="cart-item-emoji">${i.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-brand">${i.brand}</div>
          <div class="cart-item-name">${i.name}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty('${i.id}',-1)">−</button>
            <span class="qty-num">${i.qty}</span>
            <button class="qty-btn" onclick="changeQty('${i.id}',1)">+</button>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:0.5rem;">
          <div class="cart-item-price">€${(i.price * i.qty).toFixed(2)}</div>
          <button class="cart-item-remove" onclick="removeFromCart('${i.id}')" title="Remove">✕</button>
        </div>
      </div>
    `).join('');
    footer.style.display = 'block';
    document.getElementById('cartTotal').textContent = '€' + totalPrice.toFixed(2);
  }
}

function toggleCart() {
  document.getElementById('cartDrawer').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

let toastTimer;
function showToast(name, emoji) {
  const t = document.getElementById('cartToast');
  document.getElementById('toastName').textContent = name;
  document.getElementById('toastIcon').textContent = emoji;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

function filterProducts(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.prod-card').forEach(card => {
    const match = cat === 'all' || card.dataset.cat === cat;
    card.style.display = match ? 'flex' : 'none';
  });
}

function checkout() {
  const drawer = document.getElementById('cartDrawer');
  const footer = document.getElementById('cartFooter');
  const btn = footer.querySelector('.cart-checkout');
  btn.textContent = '✓ ORDER SENT — WE\'LL CONFIRM SHORTLY!';
  btn.style.background = '#1a5c1a';
  setTimeout(() => {
    cart = {};
    updateCartUI();
    drawer.classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('open');
    btn.textContent = 'PROCEED TO CHECKOUT';
    btn.style.background = '';
  }, 2500);
}



// ══ WESLEY AI ASSISTANT ══════════════════════════════════
const ANTHROPIC_ENDPOINT = "https://api.anthropic.com/v1/messages";

const WESLEY_SYSTEM = `You are Wesley, the friendly and professional AI assistant for ShoeLab.de — a premium shoe cleaning and detailing studio based in Bremen, Germany.

Your personality: warm, knowledgeable, professional but approachable. You speak clearly and concisely. You're passionate about sneakers and shoe care.

About ShoeLab.de:
- Location: Bremen, Germany (address to be confirmed by owner)
- Phone/WhatsApp: +49 177 2258878
- Email: Shoelab.de@gmail.com
- Instagram: @Shoelab.brnm (handle: ShoeLab Brmn)
- TikTok: ShoeLab Brmn
- Opening hours: Monday–Friday 10:00–19:00, Saturday 10:00–16:00, Sunday closed

Services offered:
1. Basic Cleaning — from €18/pair: exterior clean, sole wipe, lace cleaning, protective spray
2. Deep Cleaning / Restoration — from €35/pair: full disassembly, stain & scuff removal, interior deodorising, conditioning, sole re-whitening
3. Sneaker Detailing — from €60/pair: premium deep clean, crease treatment, paint pen touch-up, UV protective coating, museum-grade finish

Shop products (branded & authentic):
- Jason Markk Premium Shoe Cleaner — €16.99
- Reshoevn8r 3-Brush Set — €24.99
- Crep Protect Ultimate Spray — €14.99
- Sneaker Lab Pro Kit — €39.99
- Reshoevn8r Sole Sauce Whitener — €19.99
- ShoeLab Microfibre Cloth — €8.99
- Jason Markk Repel — €18.99
- Crep Protect Cure Wipes 12-pack — €12.99
- ShoeLab Starter Kit Bundle — €49.99 (saves €18)
- Free shipping on orders over €50

Booking: Customers can book online via the booking section on the website. They choose a service, date, time slot (10:00–18:00 weekdays, 10:00–16:00 Saturday), and leave their name, contact, and shoe details. Confirmation within 24 hours. No payment required at booking. Free cancellation up to 24 hours before.

You can help with:
- Navigating the website (services, shop, gallery, booking, contact)
- Recommending the right cleaning service for their shoe type/condition
- Recommending the right products from the shop
- Explaining what each service includes
- Helping with booking questions
- Answering questions about opening hours, location, contact info
- Giving shoe care tips and advice
- Explaining product details

Always be helpful, brief, and clear. Use short paragraphs. When recommending a service or product, be specific. Never make up information not listed above. If you don't know something, say you'll pass the question to the team and suggest they email or WhatsApp.

End messages with a helpful follow-up question or CTA when appropriate. Respond in the same language the customer uses (English or German).`;

let wesleyOpen = false;
let wesMessages = [];
let welcomeSent = false;
let isTyping = false;

const quickReplySets = {
  welcome: [
    "Book an appointment",
    "View services & prices",
    "Shop cleaning products",
    "Opening hours",
    "Contact the team"
  ],
  services: [
    "Basic Cleaning — €18",
    "Deep Clean — €35",
    "Sneaker Detailing — €60",
    "Which service for my shoes?"
  ],
  booking: [
    "How do I book?",
    "What info do I need?",
    "Can I cancel?",
    "Opening hours"
  ],
  shop: [
    "Best seller products",
    "Do you ship?",
    "Starter Kit bundle",
    "Protector sprays"
  ]
};

function toggleWesley() {
  wesleyOpen = !wesleyOpen;
  document.getElementById('wesleyWindow').classList.toggle('open', wesleyOpen);
  document.getElementById('wesleyBtn').classList.toggle('open', wesleyOpen);
  const label = document.getElementById('wesleyLabel');
  const unread = document.getElementById('wesleyUnread');

  if (wesleyOpen) {
    label.style.display = 'none';
    unread.style.display = 'none';
    if (!welcomeSent) {
      welcomeSent = true;
      setTimeout(() => sendWesleyGreeting(), 400);
    }
    setTimeout(() => {
      const input = document.getElementById('wesInput');
      if (input) input.focus();
    }, 400);
  } else {
    label.style.display = 'block';
  }
}

function sendWesleyGreeting() {
  const hour = new Date().getHours();
  let greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  addWesleyMessage(`${greeting}! 👟 Welcome to **ShoeLab.de** — Bremen's premier shoe care studio.\n\nI'm **Wesley**, your personal AI assistant. I can help you with booking appointments, choosing the right service for your shoes, shopping for pro-grade cleaning products, or anything else you need.\n\nHow can I help you today?`, 'bot', quickReplySets.welcome);
}

function addWesleyMessage(text, sender, quickReplies = []) {
  const container = document.getElementById('wesMessages');
  const now = new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});

  const msg = document.createElement('div');
  msg.className = `wes-msg ${sender === 'user' ? 'user' : ''}`;

  const avatarHTML = sender === 'bot'
    ? `<div class="wes-msg-avatar">🤖</div>`
    : `<div class="wes-msg-avatar">👤</div>`;

  // Parse simple markdown: **bold**, newlines
  let formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--white)">$1</strong>')
    .replace(/\n/g, '<br>');

  msg.innerHTML = `
    ${sender === 'bot' ? avatarHTML : ''}
    <div class="wes-bubble">
      ${formatted}
      <span class="wes-bubble-time">${now}</span>
    </div>
    ${sender === 'user' ? avatarHTML : ''}
  `;

  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;

  // quick replies
  const qrContainer = document.getElementById('wesQuickReplies');
  qrContainer.innerHTML = '';
  if (quickReplies.length > 0) {
    quickReplies.forEach(qr => {
      const btn = document.createElement('button');
      btn.className = 'qr-btn';
      btn.textContent = qr;
      btn.onclick = () => {
        qrContainer.innerHTML = '';
        handleUserMessage(qr);
      };
      qrContainer.appendChild(btn);
    });
  }
}

function showTyping() {
  const container = document.getElementById('wesMessages');
  const el = document.createElement('div');
  el.className = 'wes-typing'; el.id = 'wesTyping';
  el.innerHTML = `
    <div class="wes-msg-avatar" style="width:28px;height:28px;background:linear-gradient(135deg,#CC1111,#660808);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.75rem;">🤖</div>
    <div class="wes-typing-dots"><span></span><span></span><span></span></div>
  `;
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById('wesTyping');
  if (el) el.remove();
}

async function sendMessage() {
  const input = document.getElementById('wesInput');
  const text = input.value.trim();
  if (!text || isTyping) return;
  input.value = '';
  input.style.height = 'auto';
  handleUserMessage(text);
}

async function handleUserMessage(text) {
  if (isTyping) return;

  // clear quick replies
  document.getElementById('wesQuickReplies').innerHTML = '';

  // add user message
  addWesleyMessage(text, 'user');
  wesMessages.push({ role: 'user', content: text });
  isTyping = true;

  // show typing
  showTyping();

  try {
    const response = await fetch(ANTHROPIC_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: WESLEY_SYSTEM,
        messages: wesMessages
      })
    });

    const data = await response.json();
    removeTyping();

    const reply = data.content && data.content[0] && data.content[0].text
      ? data.content[0].text
      : "I'm having a moment — please try again or contact us at Shoelab.de@gmail.com 🙏";

    wesMessages.push({ role: 'assistant', content: reply });

    // pick contextual quick replies
    const lc = text.toLowerCase();
    let qr = [];
    if (lc.includes('book') || lc.includes('appointment') || lc.includes('reserv')) qr = quickReplySets.booking;
    else if (lc.includes('service') || lc.includes('clean') || lc.includes('price') || lc.includes('cost')) qr = quickReplySets.services;
    else if (lc.includes('shop') || lc.includes('product') || lc.includes('buy') || lc.includes('order')) qr = quickReplySets.shop;

    addWesleyMessage(reply, 'bot', qr);

  } catch (err) {
    removeTyping();
    addWesleyMessage("I'm having trouble connecting right now. Please reach us directly:\n📱 **WhatsApp:** +49 177 2258878\n📧 **Email:** Shoelab.de@gmail.com", 'bot');
  }

  isTyping = false;
}

function clearChat() {
  wesMessages = [];
  document.getElementById('wesMessages').innerHTML = '';
  document.getElementById('wesQuickReplies').innerHTML = '';
  welcomeSent = false;
  setTimeout(() => sendWesleyGreeting(), 300);
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 100) + 'px';
}

// Auto-show label after 3s
setTimeout(() => {
  if (!wesleyOpen) {
    const label = document.getElementById('wesleyLabel');
    if (label) { label.style.display = 'none'; setTimeout(() => { label.style.display = 'block'; }, 100); }
  }
}, 3000);