// 1 Casino NL — minimal vanilla JS
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  // Newsletter & contact forms — static, no backend
  document.querySelectorAll('form[data-static]').forEach(f => {
    f.addEventListener('submit', e => {
      e.preventDefault();
      const msg = f.querySelector('[data-msg]');
      if (msg) {
        msg.textContent = 'Bedankt! Je bericht is ontvangen. (Demo formulier — geen backend.)';
        msg.style.color = '#22c47e';
      }
      f.reset();
    });
  });

  // Highlight active nav link
  const path = location.pathname.replace(/\/+$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === path || (path === '/' && href.endsWith('index.html'))) {
      a.style.color = 'var(--gold-bright)';
      a.style.background = 'rgba(212,175,55,.1)';
    }
  });

  // Smooth reveal on scroll
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          obs.unobserve(e.target);
        }
      });
    }, {threshold: .12});
    document.querySelectorAll('.card, .article-card, .pros, .cons').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
      obs.observe(el);
    });
  }
});
