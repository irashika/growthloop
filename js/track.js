/* Analytics: GA4 + Meta Pixel. Nothing loads until you add IDs in js/config.js (analytics). */
(function () {
  'use strict';
  var C = (typeof CONFIG !== 'undefined' && CONFIG) || {};
  var A = C.analytics || {};
  window.dataLayer = window.dataLayer || [];

  /* Google Analytics 4 */
  if (A.ga4Id && /^G-[A-Z0-9]+$/i.test(A.ga4Id)) {
    window.gtag = function () { window.dataLayer.push(arguments); };
    var g = document.createElement('script');
    g.async = true; g.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(A.ga4Id);
    document.head.appendChild(g);
    window.gtag('js', new Date());
    window.gtag('config', A.ga4Id);
  }

  /* Meta Pixel */
  if (A.metaPixelId && /^\d+$/.test(A.metaPixelId)) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = 'https://connect.facebook.net/en_US/fbevents.js';
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script');
    window.fbq('init', A.metaPixelId);
    window.fbq('track', 'PageView');
  }

  /* Safe event helper, also used by other scripts */
  window.tglTrack = function (name, params) {
    params = params || {};
    try {
      if (window.gtag) window.gtag('event', name, params);
      if (window.fbq) {
        var std = { cta_whatsapp_register: 'Lead', cta_whatsapp_demo: 'Lead', cta_checkout: 'InitiateCheckout', payment_submitted: 'Lead' };
        if (std[name]) window.fbq('track', std[name], params); else window.fbq('trackCustom', name, params);
      }
    } catch (e) { /* tracking must never break the page */ }
  };

  /* Track every WhatsApp / CTA click */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    var key = a.getAttribute('data-wa');
    var place = (a.closest('[id]') || {}).id || 'page';
    if (key) {
      window.tglTrack('cta_whatsapp_' + key, { cta_text: (a.textContent || '').trim().slice(0, 40), location: place });
    } else if (/checkout\.html$/.test(a.getAttribute('href') || '')) {
      window.tglTrack('cta_checkout', { location: place });
    }
  });
})();
