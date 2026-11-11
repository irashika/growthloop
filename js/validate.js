/* Shared form validation (used by the enquiry form and the payment page).
   Each validator returns { ok, value, msg }. */
(function () {
  'use strict';
  var V = {};

  V.name = function (v) {
    v = String(v || '').replace(/\s+/g, ' ').trim();
    if (!v) return { ok: false, msg: 'Please enter your name.' };
    if (v.length < 2) return { ok: false, msg: 'Your name is too short.' };
    if (v.length > 60) return { ok: false, msg: 'Your name is too long (60 characters at most).' };
    if (!/^[\p{L}\p{M}][\p{L}\p{M} .'’-]*$/u.test(v)) return { ok: false, msg: 'Use letters only in your name (no numbers or symbols).' };
    return { ok: true, value: v };
  };

  V.phone = function (v) {
    var d = String(v || '').replace(/[\s\-()]/g, '');
    if (!d) return { ok: false, msg: 'Please enter your WhatsApp number.' };
    if (!/^\+?\d+$/.test(d)) return { ok: false, msg: 'Use digits only. You can start with +91.' };
    d = d.replace(/^\+/, '');
    if (d.length === 12 && d.indexOf('91') === 0) d = d.slice(2);
    else if (d.length === 11 && d.charAt(0) === '0') d = d.slice(1);
    if (d.length !== 10) return { ok: false, msg: 'Enter a 10-digit mobile number (you entered ' + d.length + ' digits).' };
    if (!/^[6-9]/.test(d)) return { ok: false, msg: 'Indian mobile numbers start with 6, 7, 8 or 9.' };
    if (/^(\d)\1{9}$/.test(d)) return { ok: false, msg: 'Please enter your real WhatsApp number.' };
    return { ok: true, value: '+91 ' + d.slice(0, 5) + ' ' + d.slice(5), digits: '91' + d };
  };

  /* Email is optional: empty is fine, but anything typed must be a valid address */
  V.email = function (v) {
    v = String(v || '').trim();
    if (!v) return { ok: true, value: '' };
    if (v.length > 100) return { ok: false, msg: 'This email is too long.' };
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(v)) return { ok: false, msg: 'Enter a valid email, like name@example.com.' };
    return { ok: true, value: v };
  };

  /* UPI reference number (UTR): exactly 12 digits */
  V.utr = function (v) {
    var d = String(v || '').replace(/[\s-]/g, '');
    if (!d) return { ok: false, msg: 'Please enter the 12-digit UTR from your UPI app.' };
    if (!/^\d+$/.test(d)) return { ok: false, msg: 'The UTR has numbers only. Copy it from your UPI app.' };
    if (d.length !== 12) return { ok: false, msg: 'The UTR must be exactly 12 digits (you entered ' + d.length + ').' };
    if (/^(\d)\1{11}$/.test(d)) return { ok: false, msg: 'This does not look like a real UTR.' };
    return { ok: true, value: d };
  };

  /* Show or clear the error for an input. The message element has id "<input id>-err". */
  V.show = function (input, msg) {
    var err = document.getElementById(input.id + '-err');
    input.classList.toggle('bad', !!msg);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) { err.textContent = msg || ''; err.classList.toggle('show', !!msg); input.setAttribute('aria-describedby', err.id); }
  };

  /* Validate on blur, then live while typing once the field has been touched */
  V.bind = function (input, fn) {
    var touched = false;
    var run = function () { var r = fn(input.value); V.show(input, r.ok ? '' : r.msg); return r; };
    input.addEventListener('blur', function () { if (input.value || touched) { touched = true; run(); } });
    input.addEventListener('input', function () { if (touched) run(); });
    return function () { touched = true; return run(); };
  };

  window.tglValidate = V;
})();
