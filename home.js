/* ============================================
   AI / AGI WEBSITE — home.js
   الصفحة الرئيسية
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderOnScroll();
  initReveal();
  initTypewriter();
  initGlitch();
  initScrollHint();
  initBackToTop();

  console.log('%c AI / AGI SITE LOADED ', 'background:#0ea5e9;color:#06080f;font-size:13px;padding:6px 14px;font-family:monospace;');
});


/* ================================================
   1. إظهار الـ Header بعد تجاوز الـ Hero
   ================================================ */
function initHeaderOnScroll() {
  const header = document.querySelector('.site-header');
  const hero   = document.querySelector('.hero-section');

  if (!header || !hero) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        // لما الـ Hero يختفي من الشاشة → أظهر الهيدر
        if (!entry.isIntersecting) {
          header.classList.add('visible');
        } else {
          header.classList.remove('visible');
        }
      });
    },
    {
      threshold: 0,
      rootMargin: '-80px 0px 0px 0px'
    }
  );

  observer.observe(hero);
}


/* ================================================
   2. ظهور العناصر بالتدريج عند السكرول
   ================================================ */
function initReveal() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach(el => observer.observe(el));
}


/* ================================================
   3. تأثير الكتابة في الـ Hero
   ================================================ */
function initTypewriter() {
  const el = document.querySelector('.hero-sub');
  if (!el) return;

  const texts = [
    'الحقيقة التي يجب أن تعرفها',
    'من AI إلى AGI... المستقبل يبدأ الآن',
    'افهم القوة... واستخدمها بحكمة',
    'الذكاء الاصطناعي بين يديك',
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = texts[textIndex];

    if (!isDeleting) {
      el.textContent = current.substring(0, charIndex++);
      if (charIndex > current.length) {
        isDeleting = true;
        setTimeout(type, 2200);
        return;
      }
    } else {
      el.textContent = current.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
    }

    setTimeout(type, isDeleting ? 32 : 60);
  }

  type();
}


/* ================================================
   4. تأثير Glitch خفيف على العنوان
   ================================================ */
function initGlitch() {
  const title = document.querySelector('.hero-title-ar');
  if (!title) return;

  setInterval(() => {
    if (Math.random() > 0.88) {
      title.style.textShadow = `
        2px 0 var(--blue),
        -2px 0 var(--cyan),
        0 0 40px var(--blue-glow)
      `;
      title.style.transform = `translateX(${(Math.random() * 3 - 1.5).toFixed(1)}px)`;

      setTimeout(() => {
        title.style.textShadow = '0 0 40px var(--blue-glow)';
        title.style.transform = 'translateX(0)';
      }, 70);
    }
  }, 2800);
}


/* ================================================
   5. إخفاء سهم النزول بعد السكرول
   ================================================ */
function initScrollHint() {
  const hint = document.querySelector('.scroll-hint');
  if (!hint) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      hint.style.opacity = '0';
      hint.style.pointerEvents = 'none';
    } else {
      hint.style.opacity = '0.7';
      hint.style.pointerEvents = 'auto';
    }
  }, { passive: true });
}


/* ================================================
   6. زر الرجوع للأعلى
   ================================================ */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}