// ── CUSTOM CURSOR ──
const cursor = document.createElement('div');
cursor.id = 'cursor';
document.body.appendChild(cursor);

let mx = -100, my = -100;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

document.querySelectorAll('a, button, [role="button"], input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// ── NAVBAR STUCK ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 20);
}, { passive: true });

// ── MOBILE MENU ──
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuBtn.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
document.querySelectorAll('.mm-link').forEach(l => {
  l.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuBtn.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── WORD SWAP (hero) ──
const words = ['APIs', 'backends', 'systems', 'FastAPI', 'NestJS'];
let wi = 0;
const wordEl = document.getElementById('wordSwap');
if (wordEl) {
  setInterval(() => {
    wordEl.style.opacity = '0';
    setTimeout(() => {
      wi = (wi + 1) % words.length;
      wordEl.textContent = words[wi];
      wordEl.style.opacity = '1';
    }, 200);
  }, 2000);
}

// ── SCROLL REVEAL ──
const revealItems = document.querySelectorAll(
  '.proj-featured, .proj-card, .exp-item, .contact-left, .contact-right, .proj-grid, .exp-numbers'
);
const io = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), i * 60);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
revealItems.forEach(el => { el.classList.add('reveal'); io.observe(el); });

// ── CONTACT FORM ──
const form = document.getElementById('contactForm');
const status = document.getElementById('cfStatus');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('cf-submit');
    btn.textContent = 'sending...';
    btn.disabled = true;

    // swap this URL for your Formspree endpoint when ready
    await new Promise(r => setTimeout(r, 1200));
    status.textContent = '✓ message sent. i\'ll get back to you.';
    form.reset();
    btn.textContent = 'send it →';
    btn.disabled = false;
  });
}

// ── SMOOTH ACTIVE NAV HIGHLIGHT ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-right a');
const sio = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + entry.target.id ? '#f0f0f0' : '';
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sio.observe(s));

// ── TICKER PAUSE ON HOVER ──
const ticker = document.querySelector('.ticker-track');
if (ticker) {
  ticker.parentElement.addEventListener('mouseenter', () => {
    ticker.style.animationPlayState = 'paused';
  });
  ticker.parentElement.addEventListener('mouseleave', () => {
    ticker.style.animationPlayState = 'running';
  });
}
