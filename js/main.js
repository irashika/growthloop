(function () {
  'use strict';
  var C = (typeof CONFIG !== 'undefined' && CONFIG) || {};
  var WA = String(C.whatsappNumber || '').replace(/\D/g, '');
  var M = C.messages || {};
  var P = C.payment || {};

  function waLink(text) { return 'https://wa.me/' + WA + (text ? '?text=' + encodeURIComponent(text) : ''); }
  function money(n) { return (P.currency || '₹') + Number(n).toLocaleString('en-IN'); }

  /* Shared helpers for other scripts */
  window.tglWA = function (key) { return waLink(M[key] || M.general); };
  window.tglMoney = money;

  /* Every [data-wa="key"] button opens WhatsApp with that prefilled message */
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = window.tglWA(a.getAttribute('data-wa'));
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* Fee and regular price come from config so they are edited in one place */
  document.querySelectorAll('[data-fee]').forEach(function (el) { el.textContent = money(P.amount || 0); });
  document.querySelectorAll('[data-regular]').forEach(function (el) {
    if (P.regular && P.regular > P.amount) el.textContent = money(P.regular);
    else { var w = el.closest('.was'); (w || el).hidden = true; }
  });

  /* Fill placeholders from config; keep the yellow highlight only while a value is still [bracketed] */
  var V = C.values || {};
  document.querySelectorAll('[data-cfg]').forEach(function (el) {
    var v = V[el.getAttribute('data-cfg')];
    if (v) el.textContent = v;
    if (v && v.charAt(0) !== '[') el.classList.remove('ph');
  });

  /* Social links from config */
  var S = C.social || {};
  document.querySelectorAll('[data-social]').forEach(function (a) {
    var u = S[a.getAttribute('data-social')];
    if (u) a.href = u;
  });

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* Testimonials: shown only when real entries exist */
  var T = C.testimonials || [];
  if (T.length) {
    var sec = document.getElementById('testimonials'), grid = document.getElementById('tgrid');
    T.forEach(function (t) {
      if (!t || !t.text || !t.name) return;
      var card = document.createElement('figure'); card.className = 'card quote'; card.style.margin = '0';
      var p = document.createElement('p'); p.textContent = '“' + t.text + '”';
      var f = document.createElement('figcaption');
      f.style.cssText = 'margin-top:14px;font-weight:600;color:#2748C8';
      f.textContent = t.name + (t.role ? ', ' + t.role : '');
      card.appendChild(p); card.appendChild(f); grid.appendChild(card);
    });
    if (grid.children.length) sec.hidden = false;
  }

  /* Header shadow on scroll + mobile menu */
  var hdr = document.getElementById('top');
  function onScroll() { hdr.classList.toggle('sc', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var btn = document.getElementById('menuBtn'), drawer = document.getElementById('drawer');
  function setMenu(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    drawer.classList.toggle('open', open);
  }
  btn.addEventListener('click', function () { setMenu(btn.getAttribute('aria-expanded') !== 'true'); });
  drawer.querySelectorAll('a.l').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* Scroll reveal */
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }

  /* Enquiry form -> WhatsApp message with the details filled in */
  var form = document.getElementById('enq'), note = document.getElementById('fnote');
  var V = window.tglValidate;
  var fn = form.elements.name, fp = form.elements.phone, fe = form.elements.email, fr = form.elements.role;
  var vN = V.bind(fn, V.name), vP = V.bind(fp, V.phone), vE = V.bind(fe, V.email);
  fp.addEventListener('input', function () { fp.value = fp.value.replace(/[^\d+\s]/g, ''); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var rN = vN(), rP = vP(), rE = vE();
    if (!(rN.ok && rP.ok && rE.ok)) {
      note.textContent = 'Please fix the highlighted fields.';
      (!rN.ok ? fn : !rP.ok ? fp : fe).focus();
      return;
    }
    var n = { value: rN.value }, p = { value: rP.value }, m = { value: rE.value }, r = fr;
    var lines = [M.register, '', 'Name: ' + n.value, 'WhatsApp: ' + p.value.trim()];
    if (m.value.trim()) lines.push('Email: ' + m.value.trim());
    lines.push('Current role: ' + r.value);
    var url = waLink(lines.join('\n'));
    var win = window.open(url, '_blank', 'noopener');
    note.innerHTML = '';
    if (win) { note.textContent = 'WhatsApp is opening. Press Send there to reach us.'; }
    else {
      var a = document.createElement('a');
      a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Tap here to open WhatsApp';
      note.appendChild(a);
    }
  });
})();
