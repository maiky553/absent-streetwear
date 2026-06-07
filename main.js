/* ============================================================
   @bsent — Streetwear | main.js
   ============================================================ */

/* ── CURSOR ── */
const cursor     = document.getElementById('cur');
const cursorRing = document.getElementById('cur-ring');

let ringX = 0;
let ringY = 0;

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  ringX = e.clientX;
  ringY = e.clientY;
});

function animateRing() {
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width      = '5px';
    cursor.style.height     = '5px';
    cursorRing.style.width  = '50px';
    cursorRing.style.height = '50px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width      = '10px';
    cursor.style.height     = '10px';
    cursorRing.style.width  = '34px';
    cursorRing.style.height = '34px';
  });
});

/* ── SCROLL FADE-IN ── */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-up').forEach((el) => {
  fadeObserver.observe(el);
});

/* ── SCROLL BUTTONS ── */
document.querySelectorAll('[data-scroll]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ── TOAST ── */
const toast = document.getElementById('toast');

function showToast() {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ── FILTER TABS ── */
document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.filter;

    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.product-card').forEach((card) => {
      if (category === 'all' || card.dataset.cat === category) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ── PRODUCT MODAL ── */
const modal      = document.getElementById('modal');
const modalImg   = document.getElementById('modal-img');
const modalName  = document.getElementById('modal-name');
const modalPrice = document.getElementById('modal-price');
const modalDesc  = document.getElementById('modal-desc');
const modalClose = document.getElementById('modal-close');
const modalAddBtn = document.getElementById('modal-add-btn');

function openModal(card) {
  modalImg.src        = card.dataset.img;
  modalName.textContent  = card.dataset.name;
  modalPrice.textContent = card.dataset.price;
  modalDesc.textContent  = card.dataset.desc;
  modal.classList.add('open');
}

function closeModal() {
  modal.classList.remove('open');
}

document.querySelectorAll('.product-card').forEach((card) => {
  card.addEventListener('click', (e) => {
    if (!e.target.closest('.product-add')) {
      openModal(card);
    }
  });
});

document.querySelectorAll('.product-add').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    showToast();
  });
});

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

modalAddBtn.addEventListener('click', showToast);

/* ── SIZE SELECTOR ── */
document.querySelectorAll('.size-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.size-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* ── COUNTDOWN TIMER ── */
const dropDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

function updateCountdown() {
  const diff = dropDate - new Date();
  if (diff <= 0) return;

  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs  = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent  = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-mins').textContent  = String(mins).padStart(2, '0');
  document.getElementById('cd-secs').textContent  = String(secs).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);
