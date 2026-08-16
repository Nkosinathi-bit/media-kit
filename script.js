(() => {
  const body = document.body;
  const header = document.getElementById('siteHeader');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelectorAll('.nav a');
  const cursor = document.querySelector('.cursor');

  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 30), { passive: true });

  menu?.addEventListener('click', () => {
    const open = body.classList.toggle('menu-open');
    menu.setAttribute('aria-expanded', String(open));
  });
  nav.forEach(link => link.addEventListener('click', () => { body.classList.remove('menu-open'); menu?.setAttribute('aria-expanded','false'); }));

  if (cursor && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('pointermove', e => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; }, { passive: true });
    document.querySelectorAll('a,button,.work-card').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.style.width='34px'; cursor.style.height='34px'; cursor.style.background='rgba(199,167,108,.18)'; });
      el.addEventListener('mouseleave', () => { cursor.style.width='14px'; cursor.style.height='14px'; cursor.style.background='transparent'; });
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: .13 });
  reveals.forEach(el => revealObserver.observe(el));

  const counts = document.querySelectorAll('.count');
  const countObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.target || '0');
    const decimal = String(target).includes('.') ? 1 : 0;
    const start = performance.now();
    const duration = 1100;
    const tick = now => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = (target * eased).toFixed(decimal);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  }), { threshold: .5 });
  counts.forEach(el => countObserver.observe(el));
})();
