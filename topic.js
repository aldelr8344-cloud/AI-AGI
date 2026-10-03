/* ============================================
   AI / AGI WEBSITE — topic.js
   صفحات المواضيع (مشترك)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  console.log('%c TOPIC PAGE LOADED ', 'background:#1E8DFF;color:#fff;font-size:12px;padding:5px 12px;font-family:monospace;');
});


/* ظهور العناصر بالتدريج */
function initReveal() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 70);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px'
    }
  );

  elements.forEach(el => observer.observe(el));
}