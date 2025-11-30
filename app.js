/* app.js — premium interactions (no external dependencies) */

/* ---------- helpers ---------- */
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

/* ---------- hero parallax (subtle) ---------- */
(function heroParallax(){
  const hero = document.getElementById('hero');
  if(!hero) return;
  window.addEventListener('scroll', () => {
    const sc = window.scrollY;
    hero.style.setProperty('--hero-offset', `${Math.min(40, sc * 0.06)}px`);
    // translate the right card slightly
    const right = hero.querySelector('.hero-card');
    if(right) right.style.transform = `translateY(${Math.min(24, sc * 0.08)}px)`;
  }, { passive: true });
})();

/* ---------- animated quiz preview ---------- */
(function quizPreview(){
  const previewRoot = document.getElementById('previewRoot');
  const sample = [
    'Which area is your main concern?',
    'How many sessions per week would you commit?',
    'Do you prefer gentle or deeper sculpting?',
    'Any medical conditions or recent surgeries?',
    'Preferred appointment time (AM/PM)?'
  ];
  if(!previewRoot) return;
  let idx = 0;
  function showCard(){
    previewRoot.innerHTML = '';
    const el = document.createElement('div');
    el.className = 'q-preview';
    el.style.padding = '18px';
    el.style.borderRadius = '10px';
    el.style.boxShadow = '0 10px 30px rgba(167,146,125,0.06)';
    el.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(248,244,238,0.98))';
    el.style.fontWeight = '600';
    el.style.textAlign = 'center';
    el.textContent = sample[idx];
    previewRoot.appendChild(el);
    idx = (idx + 1) % sample.length;
  }
  showCard();
  setInterval(showCard, 1800);
})();

/* ---------- smooth scroll for CTAs ---------- */
(function ctaScroll(){
  const start = document.getElementById('startQuizBtn');
  const start2 = document.getElementById('quizStart');
  const target = document.getElementById('quizPreview');
  if(start){
    start.addEventListener('click', ()=> target.scrollIntoView({behavior:'smooth', block:'center'}));
  }
  if(start2){
    start2.addEventListener('click', ()=> target.scrollIntoView({behavior:'smooth', block:'center'}));
  }
})();

/* ---------- WhatsApp booking ---------- */
(function whatsAppBooking(){
  const btn = document.getElementById('whatsappBtn');
  if(!btn) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    // Basic validation
    if(!name || !phone){
      alert('Please enter your name and a contact phone number to continue.');
      return;
    }
    // Replace the next string with your business WhatsApp number (international format, numbers only)
    const BUSINESS_NUMBER = '34600123456'; // <<--- REPLACE WITH YOUR NUMBER
    const message = encodeURIComponent(
      `Hello — I would like to book a Maderotherapy session. Name: ${name}. Phone: ${phone}. Please advise available times.`
    );
    const url = `https://wa.me/${BUSINESS_NUMBER}?text=${message}`;
    window.open(url, '_blank');
  });
})();

/* ---------- testimonials simple carousel ---------- */
(function testiCarousel(){
  const root = document.getElementById('testiCarousel');
  if(!root) return;
  let pos = 0;
  const cards = Array.from(root.children);
  function layout(){
    // ensure inline width
    cards.forEach(c => c.style.minWidth = `${Math.max(280, Math.min(360, root.clientWidth * 0.8))}px`);
  }
  layout();
  window.addEventListener('resize', layout, { passive:true });

  setInterval(()=>{
    pos = (pos + 1) % cards.length;
    root.style.transform = `translateX(-${pos * (cards[0].offsetWidth + 18)}px)`;
    root.style.transition = 'transform .9s ease';
  }, 4200);
})();

/* ---------- on-scroll reveal for elements with data-animate ---------- */
(function revealOnScroll(){
  const els = Array.from(document.querySelectorAll('[data-animate]'));
  if(!els.length) return;
  function check(){
    els.forEach(el => {
      const rect = el.getBoundingClientRect();
      if(rect.top < window.innerHeight - 80) el.classList.add('in');
    });
  }
  window.addEventListener('scroll', check, { passive:true });
  check();
})();
