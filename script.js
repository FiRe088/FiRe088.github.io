(function () {
  'use strict';

  /* ---------------------------------------------------------------
     Scroll-reveal for elements marked .reveal
     --------------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(function (el) { revealObserver.observe(el); });

  /* ---------------------------------------------------------------
     Nav: solid background on scroll
     --------------------------------------------------------------- */
  var nav = document.getElementById('nav');
  function updateNavBg() {
    if (window.scrollY > 40) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }
  updateNavBg();
  window.addEventListener('scroll', updateNavBg, { passive: true });

  /* ---------------------------------------------------------------
     Nav: mobile toggle
     --------------------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.querySelector('.nav-links');
  navToggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------------------------------------------------------
     Nav: active-link highlighting + stage-marker activation,
     both driven by the same scroll-position source of truth.
     --------------------------------------------------------------- */
  var sections = document.querySelectorAll('.section[id]');
  var navLinkEls = document.querySelectorAll('.nav-links a');
  var stageMarkers = document.querySelectorAll('.stage-marker');

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var id = entry.target.getAttribute('id');
      var link = document.querySelector('.nav-links a[data-nav="' + id + '"]');
      var marker = document.querySelector('.stage-marker[data-stage="' + id + '"]');
      if (entry.isIntersecting) {
        navLinkEls.forEach(function (l) { l.classList.remove('is-active'); });
        if (link) link.classList.add('is-active');
        if (marker) marker.classList.add('is-active');
      }
    });
  }, { threshold: 0, rootMargin: '-45% 0px -45% 0px' });
  sections.forEach(function (s) { sectionObserver.observe(s); });

  /* ---------------------------------------------------------------
     Pipeline thread: fill the vertical line proportionally to how
     far the reader has scrolled through the thread-wrap container.
     --------------------------------------------------------------- */
  var threadWrap = document.querySelector('.thread-wrap');
  var threadLine = document.getElementById('threadLine');

  function updateThreadFill() {
    if (!threadWrap || !threadLine) return;
    var rect = threadWrap.getBoundingClientRect();
    var viewportH = window.innerHeight;
    var total = rect.height;
    var scrolled = Math.min(Math.max(viewportH * 0.5 - rect.top, 0), total);
    var pct = total > 0 ? (scrolled / total) * 100 : 0;
    threadLine.style.setProperty('--thread-fill', pct + '%');
  }
  updateThreadFill();
  window.addEventListener('scroll', updateThreadFill, { passive: true });
  window.addEventListener('resize', updateThreadFill);

  /* ---------------------------------------------------------------
     Coursework accordions — generic, supports any number of
     .accordion-toggle / .accordion-panel pairs (each toggle controls
     the panel named in its aria-controls attribute).
     --------------------------------------------------------------- */
  var accordionToggles = document.querySelectorAll('.accordion-toggle');

  accordionToggles.forEach(function (toggle) {
    var panelId = toggle.getAttribute('aria-controls');
    var panel = document.getElementById(panelId);
    if (!panel) return;

    var openLabel = toggle.getAttribute('data-label-open') || 'Hide coursework';
    var closedLabel = toggle.getAttribute('data-label-closed') || 'View coursework';

    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      toggle.querySelector('span').textContent = isOpen ? closedLabel : openLabel;
      panel.style.maxHeight = isOpen ? '0px' : panel.scrollHeight + 'px';
    });

    // Keep an open accordion's max-height correct on resize (e.g. the
    // course grid reflowing from 2 columns to 1 on a narrower viewport).
    window.addEventListener('resize', function () {
      if (toggle.getAttribute('aria-expanded') === 'true') {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

})();
