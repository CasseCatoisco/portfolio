(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var TAU = Math.PI * 2;

  function rng(seed) {
    return function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647 - 0.5; };
  }
  function hash(n) { // bruit déterministe
    var x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return (x - Math.floor(x)) - 0.5;
  }
  function el(name, attrs, parent) {
    var node = document.createElementNS(NS, name);
    Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    parent.appendChild(node);
    return node;
  }
  function join(pts) { return 'M' + pts.join(' L'); }

  /* ── Année du pied de page ── */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Courbe du hero ──
     Signal périodique dessiné deux fois côte à côte, puis translaté en CSS :
     la boucle est continue et le navigateur anime sans recalcul. */
  var scroller = document.getElementById('traceScroller');
  if (scroller) {
    var N = 160, W = 1000, MID = 80, U = 16, top = [], bot = [], pts = [];
    for (var i = 0; i <= N; i++) {
      var t = i / N, k = i % N;
      var clean = MID - 30 * Math.sin(TAU * 2 * t) - 12 * Math.sin(TAU * 5 * t + 1);
      var x = (t * W).toFixed(1);
      pts.push(x + ',' + (clean + hash(k) * 9).toFixed(1));
      top.push(x + ',' + (clean - U).toFixed(1));
      bot.push(x + ',' + (clean + U).toFixed(1));
    }
    var bandD = join(top) + ' L' + bot.slice().reverse().join(' L') + ' Z';
    var lineD = join(pts);
    [0, W].forEach(function (dx) {
      el('path', { 'class': 'trace__band', d: bandD, transform: 'translate(' + dx + ',0)' }, scroller);
      el('path', { 'class': 'trace__line', pathLength: 1, d: lineD, transform: 'translate(' + dx + ',0)' }, scroller);
    });
    scroller.parentNode.parentNode.classList.add('trace--draw');
  }

  /* ── Bandeaux de section : dérive continue, sens et vitesse variables ── */
  document.querySelectorAll('.strip').forEach(function (s, idx) {
    var rnd = rng(parseInt(s.getAttribute('data-seed'), 10) || 3);
    var c = 2 + Math.floor((rnd() + 0.5) * 5), phase = rnd() * 6, P = 140, pts = [];
    for (var i = 0; i <= P * 2; i++) {
      var t = (i % P) / P;
      pts.push((i / P * 1000).toFixed(1) + ',' +
        (14 + 7 * Math.sin(TAU * c * t + phase) + 3 * Math.sin(TAU * (2 * c + 1) * t) + hash((i % P) + idx * 31) * 3).toFixed(1));
    }
    var path = el('path', { 'class': 'drift', d: join(pts) }, s);
    path.style.setProperty('--dist', '1000px');
    path.style.animationDuration = (30 + (idx % 3) * 8) + 's';
    if (idx % 2) path.style.animationDirection = 'reverse';
  });

  /* ── Mini-graphiques : se dessinent à l'arrivée à l'écran, puis restent vivants ── */
  var minis = document.querySelectorAll('.mini');
  minis.forEach(function (m) {
    var kind = m.getAttribute('data-kind');
    if (kind === 'weather') {
      el('line', { 'class': 'mini__axis', x1: 0, y1: 52, x2: 160, y2: 52 }, m);
      var g = el('g', { 'class': 'mini__scroller' }, m);
      var P = 60, pts = [];
      for (var i = 0; i <= P * 2; i++) {
        var t = (i % P) / P;
        pts.push((i / P * 160).toFixed(1) + ',' +
          (30 - 14 * Math.sin(TAU * t) - 5 * Math.sin(TAU * 3 * t + 1) + hash((i % P) + 90) * 5).toFixed(1));
      }
      el('path', { 'class': 'mini__line', pathLength: 1, d: join(pts) }, g);
    } else if (kind === 'calib') {
      var rnd = rng(11);
      el('line', { 'class': 'mini__axis', x1: 8, y1: 4, x2: 8, y2: 72 }, m);
      el('line', { 'class': 'mini__axis', x1: 8, y1: 72, x2: 156, y2: 72 }, m);
      el('line', { 'class': 'mini__line', pathLength: 1, x1: 8, y1: 66, x2: 156, y2: 12 }, m);
      for (var j = 0; j < 6; j++) {
        var x = 22 + j * 24, y = 62 - j * 9.2 + rnd() * 5;
        var e = el('line', { 'class': 'mini__err', x1: x, y1: y - 6, x2: x, y2: y + 6 }, m);
        var c2 = el('circle', { 'class': 'mini__pt', cx: x, cy: y, r: 2.6 }, m);
        e.style.setProperty('--i', j); c2.style.setProperty('--i', j);
      }
    }
  });

  if (minis.length) {
    if (reduce || !('IntersectionObserver' in window)) return;
    minis.forEach(function (m) { m.classList.add('mini--wait'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.remove('mini--wait');
          en.target.classList.add('mini--in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.6 });
    minis.forEach(function (m) { io.observe(m); });
  }
}());
