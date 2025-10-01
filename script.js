function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// 3D tilt and parallax interactions
(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const tiltSelectors = [
    '.details-container',
    '.btn',
    '.project-img',
    '.section__pic-container img'
  ];

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function addTiltEffect(el) {
    const strength = el.classList.contains('btn') ? 10 : 14;
    let rafId = null;

    function onMove(e) {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = clamp((0.5 - py) * strength, -strength, strength);
      const ry = clamp((px - 0.5) * strength, -strength, strength);
      const tz = 20;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${tz}px)`;
      });
    }

    function onLeave() {
      if (rafId) cancelAnimationFrame(rafId);
      el.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
    }

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
  }

  // Attach tilt to matching elements
  tiltSelectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach(addTiltEffect);
  });

  // Parallax background layers
  const parallax = document.getElementById('parallax');
  if (parallax) {
    const l1 = parallax.querySelector('.l1');
    const l2 = parallax.querySelector('.l2');
    const l3 = parallax.querySelector('.l3');
    let raf;
    window.addEventListener('mousemove', (e) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5);
        const y = (e.clientY / window.innerHeight - 0.5);
        if (l1) l1.style.transform = `translate3d(${x * -20}px, ${y * -10}px, 0)`;
        if (l2) l2.style.transform = `translate3d(${x * 30}px, ${y * 15}px, 0)`;
        if (l3) l3.style.transform = `translate3d(${x * -12}px, ${y * 20}px, 0)`;
      });
    });
  }
})();
