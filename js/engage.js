/* Registration window (open / closed), countdown, mobile sticky bar and the offer popup. */
(function () {
  'use strict';
  var C = (typeof CONFIG !== 'undefined' && CONFIG) || {};
  var R = C.registration || {};
  var opens = new Date(R.opens).getTime(), closes = new Date(R.closes).getTime();
  var stick = document.getElementById('stick'), pop = document.getElementById('pop');
  var state = 'open';

  function compute() {
    var now = Date.now();
    if (!isNaN(opens) && now < opens) return 'soon';
    if (!isNaN(closes) && now > closes) return 'closed';
    return 'open';
  }

  /* ---- Apply registration state to badge, buttons and countdown ---- */
  var badgeText = {
    open: 'Registrations open · Closes 30 Nov 2026',
    closed: 'Registrations closed · Join the waitlist on WhatsApp',
    soon: 'Registration opens 11 Nov 2026'
  };
  function applyState() {
    state = compute();
    var bt = document.getElementById('regBadgeT'); if (bt) bt.textContent = badgeText[state];
    var badge = document.getElementById('regBadge'); if (badge) badge.classList.toggle('shut', state === 'closed');

    document.querySelectorAll('[data-reg-btn]').forEach(function (a) {
      if (!a.hasAttribute('data-open-text')) a.setAttribute('data-open-text', a.textContent);
      if (state === 'closed') {
        a.setAttribute('data-wa', 'waitlist');
        a.href = window.tglWA('waitlist');
        a.textContent = a.getAttribute('data-closed-text') || 'Join the waitlist on WhatsApp';
      }
    });
    document.querySelectorAll('[data-reg-open]').forEach(function (el) { el.hidden = state === 'closed'; });
    document.querySelectorAll('[data-reg-closed]').forEach(function (el) { el.hidden = state !== 'closed'; });

    var label = document.getElementById('cdLabel');
    if (label) label.textContent = state === 'soon' ? 'Registration opens in' : state === 'closed' ? 'Registrations closed' : 'Registration closes in';
    var grid = document.getElementById('cdgrid'); if (grid) grid.hidden = state === 'closed';
  }

  function tick() {
    if (compute() !== state) applyState();
    var target = state === 'soon' ? opens : closes;
    var ms = Math.max(0, target - Date.now());
    var set = function (id, v) { var el = document.getElementById(id); if (el) el.textContent = String(v).padStart(2, '0'); };
    set('cdD', Math.floor(ms / 864e5)); set('cdH', Math.floor(ms % 864e5 / 36e5));
    set('cdM', Math.floor(ms % 36e5 / 6e4)); set('cdS', Math.floor(ms % 6e4 / 1e3));
  }
  applyState(); tick(); setInterval(tick, 1000);

  /* ---- Sticky CTA bar (phones): appears after the hero so the layout never jumps ---- */
  function onScroll() {
    var show = window.scrollY > 560;
    stick.classList.toggle('show', show);
    document.body.classList.toggle('stk', show);
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---- Popup: shows on every visit, ~3s after the page opens. Closes with X / Esc / outside tap ---- */
  function open() {
    if (!pop.hidden) return;
    pop.hidden = false;
    requestAnimationFrame(function () { pop.classList.add('open'); });
    document.addEventListener('pointerdown', outside, true);
  }
  function close() {
    pop.classList.remove('open');
    document.removeEventListener('pointerdown', outside, true);
    setTimeout(function () { pop.hidden = true; }, 360);
  }
  function outside(e) { if (!pop.contains(e.target)) close(); }
  document.getElementById('popX').addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !pop.hidden) close(); });

  setTimeout(function () {
    var typing = document.activeElement && /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName);
    var menu = document.getElementById('drawer');
    if (!typing && !(menu && menu.classList.contains('open'))) open();
  }, 3000);

  /* ---- Offer banner: copy the promo code ---- */
  var cb = document.getElementById('copyCode'), cc = document.getElementById('ocode');
  if (cb && cc) {
    cb.addEventListener('click', function () {
      var code = cc.textContent.trim();
      function done(ok) { cb.textContent = ok ? 'Copied!' : 'Select and copy'; setTimeout(function () { cb.textContent = 'Copy code'; }, 2000); }
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(code).then(function () { done(true); }, function () { done(false); });
        else done(false);
      } catch (e) { done(false); }
    });
  }
})();
