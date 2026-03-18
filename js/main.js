(function () {
  'use strict';

  /* ── Inject current year ── */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}());
