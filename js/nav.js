(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');
  var allLinks = links.querySelectorAll('a');


  /* ── Burger toggle ── */
  burger.addEventListener('click', function () {
    var isOpen = burger.classList.toggle('open');
    links.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  /* ── Close on link click ── */
  allLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      burger.classList.remove('open');
      links.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ── Active link on scroll ── */
  var sections = document.querySelectorAll('section[id]');

  function updateActive() {
    var scrollY = window.scrollY + 120;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      var link = links.querySelector('a[href="#' + id + '"]');
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < top + height);
      }
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
}());

/* ── Règle graduée : le curseur lit la position de défilement ── */
(function () {
  'use strict';

  var cursor = document.getElementById('rulerCursor');
  var reading = document.getElementById('rulerReading');
  if (!cursor || !reading) return;

  var MM_PER_PX = 25.4 / 96; // définition CSS : 1 px = 1/96 pouce
  var ticking = false;

  function update() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var ratio = max > 0 ? window.scrollY / max : 0;
    var y = ratio * (window.innerHeight - 24);
    cursor.style.transform = 'translateY(' + Math.round(y) + 'px)';
    reading.textContent = Math.round(window.scrollY * MM_PER_PX) + ' mm';
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
}());
