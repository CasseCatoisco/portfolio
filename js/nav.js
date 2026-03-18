(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');
  var allLinks = links.querySelectorAll('a');

  /* ── Scrolled shadow ── */
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

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
    var scrollY = window.scrollY + 80;
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
