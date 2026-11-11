(function () {
  'use strict';
  var C = (typeof CONFIG !== 'undefined' && CONFIG) || {};
  var P = C.payment || {};
  var V = window.tglValidate;
  var WA = String(C.whatsappNumber || '').replace(/\D/g, '');
  function waLink(t) { return 'https://wa.me/' + WA + (t ? '?text=' + encodeURIComponent(t) : ''); }
  function money(n) { return (P.currency || '₹') + Number(n).toLocaleString('en-IN'); }
  function $(id) { return document.getElementById(id); }

  var coupons = P.coupons || {};
  var listPrice = Number(P.regular || P.amount || 0);
  var applied = null;               /* currently applied promo code, or null */

  function discountOf(code) { return code && coupons[code] ? Math.min(Number(coupons[code]), listPrice) : 0; }
  function total() { return listPrice - discountOf(applied); }

  /* ---------- static bits ---------- */
  $('prod').textContent = P.productName || 'AI Masterclass';
  var up = $('upi'); up.textContent = P.upiId || '';
  $('upiLine').hidden = !P.upiId;
  if (P.qrImage) $('qr').src = P.qrImage;
  $('sampleNote').hidden = !P.isSampleQR;
  if (/^\[/.test(P.upiId || '')) up.className = 'ph';
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = waLink((C.messages || {}).general); a.target = '_blank'; a.rel = 'noopener';
  });

  /* ---------- promo code ---------- */
  var promo = $('promo'), promoBtn = $('promoBtn'), promoOk = $('promoOk');

  function render() {
    var d = discountOf(applied);
    $('amtReg').textContent = money(listPrice);
    $('discRow').hidden = !d;
    if (d) { $('codeName').textContent = applied; $('amtDisc').textContent = '−' + money(d); }
    $('amt2').textContent = $('amt3').textContent = $('chkAmt').textContent = money(total());
    promo.readOnly = !!applied;
    promoBtn.textContent = applied ? 'Remove' : 'Apply';
    promoBtn.setAttribute('aria-label', applied ? 'Remove promo code ' + applied : 'Apply promo code');
    promoOk.hidden = !applied;
    if (applied) promoOk.textContent = 'Code ' + applied + ' applied. You save ' + money(d) + '.';
  }

  function applyCode() {
    var v = promo.value.replace(/\s+/g, '').toUpperCase();
    if (!v) { V.show(promo, 'Enter a promo code, then press Apply.'); return false; }
    if (!Object.prototype.hasOwnProperty.call(coupons, v)) { V.show(promo, 'This promo code is not valid.'); return false; }
    applied = v; promo.value = v; V.show(promo, ''); render(); return true;
  }
  function removeCode() { applied = null; promo.value = ''; V.show(promo, ''); render(); promo.focus(); }

  promoBtn.addEventListener('click', function () { if (applied) removeCode(); else applyCode(); });
  promo.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); if (!applied) applyCode(); } });
  promo.addEventListener('input', function () { V.show(promo, ''); });

  /* default promo code applied automatically */
  if (P.defaultCode && coupons[String(P.defaultCode).toUpperCase()] != null) {
    promo.value = String(P.defaultCode).toUpperCase(); applied = promo.value;
  }
  render();

  /* ---------- validation ---------- */
  var form = $('payForm'), modal = $('modal');
  var n = $('n'), p = $('p'), e = $('e'), u = $('u'), chk = $('chk');
  var vN = V.bind(n, V.name), vP = V.bind(p, V.phone), vE = V.bind(e, V.email), vU = V.bind(u, V.utr);
  chk.addEventListener('change', function () { V.show(chk, chk.checked ? '' : 'Please tick the box to confirm your payment.'); });
  /* tidy the number while typing: keep only digits, + and spaces */
  p.addEventListener('input', function () { p.value = p.value.replace(/[^\d+\s]/g, ''); });
  u.addEventListener('input', function () { u.value = u.value.replace(/[^\d\s-]/g, ''); });

  /* ---------- receipt ---------- */
  var lastFocus = null, rec = null;       /* rec: { cv, pngFile, text, id } */

  function receiptId() {
    var d = new Date(), pad = function (x) { return String(x).padStart(2, '0'); };
    return 'TGL-' + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + '-' + Math.random().toString(36).slice(2, 7).toUpperCase();
  }
  function download(blob, name) {
    var url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1500);
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var rN = vN(), rP = vP(), rE = vE(), rU = vU();
    var okC = chk.checked; V.show(chk, okC ? '' : 'Please tick the box to confirm your payment.');
    var okPromo = true;
    if (!applied && promo.value.trim()) { V.show(promo, 'Press Apply to use this code, or clear the box.'); okPromo = false; }
    if (!(rN.ok && rP.ok && rE.ok && rU.ok && okC && okPromo)) {
      var first = !rN.ok ? n : !rP.ok ? p : !rE.ok ? e : !okPromo ? promo : !rU.ok ? u : chk;
      first.focus(); return;
    }

    var id = receiptId();
    var when = new Date().toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
    var d = discountOf(applied), tot = money(total());
    var data = {
      id: id, when: when, name: rN.value, phone: rP.value, email: rE.value,
      course: P.productName || 'AI Masterclass', utr: rU.value, price: money(listPrice),
      discount: d ? money(d) : '', code: applied || '', total: tot,
      status: 'Awaiting confirmation', contactEmail: C.email || ''
    };

    var lines = ['Hi TheGrowthLoop! I have paid ' + tot + ' for ' + data.course + '.', '',
      'Receipt no.: ' + id, 'Name: ' + data.name, 'WhatsApp: ' + data.phone];
    if (data.email) lines.push('Email: ' + data.email);
    if (applied) lines.push('Promo code: ' + applied + ' (−' + money(d) + ')');
    lines.push('Amount paid: ' + tot, 'UPI transaction ID: ' + data.utr, 'Date: ' + when, '', 'My payment receipt is attached. Please confirm my seat. Thank you!');
    var text = lines.join('\n');

    var btn = form.querySelector('[type=submit]'); btn.disabled = true; var old = btn.textContent; btn.textContent = 'Creating receipt…';
    window.tglReceipt.build(data).then(function (cv) {
      return window.tglReceipt.toBlob(cv, 'image/png').then(function (blob) {
        var file = null;
        try { file = new File([blob], 'TheGrowthLoop-receipt-' + id + '.png', { type: 'image/png' }); } catch (x) { file = blob; }
        rec = { cv: cv, png: blob, pngFile: file, text: text, id: id };
        $('rimg').src = cv.toDataURL('image/png');
        $('rimg').alt = 'Payment receipt ' + id + '. ' + tot + ' paid by ' + data.name + '. Status: awaiting confirmation.';
        $('rtext').textContent = 'Receipt ' + id + '. ' + data.name + ' paid ' + tot + ' for ' + data.course + '. UPI transaction ID ' + data.utr + '. Status: awaiting confirmation.';
        $('shareNote').textContent = '';
        if (window.tglTrack) window.tglTrack('payment_submitted', { value: total(), currency: 'INR' });
        lastFocus = document.activeElement;
        modal.classList.add('open');
        $('mt').focus();
      });
    }).catch(function () {
      V.show(u, 'Sorry, we could not create the receipt. Please try again.');
    }).then(function () { btn.disabled = false; btn.textContent = old; });
  });

  /* ---------- share / download ---------- */
  var coarse = false;
  try { coarse = window.matchMedia('(pointer:coarse)').matches; } catch (x) {}

  /* Copy the receipt picture to the clipboard so it can be pasted straight into the WhatsApp chat */
  function copyImage() {
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        return navigator.clipboard.write([new ClipboardItem({ 'image/png': rec.png })]).then(function () { return true; }, function () { return false; });
      }
    } catch (x) {}
    return Promise.resolve(false);
  }

  function openWhatsApp() {
    var a = document.createElement('a');
    a.href = waLink(rec.text); a.target = '_blank'; a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
  }

  $('shareBtn').addEventListener('click', function () {
    if (!rec) return;
    var canFiles = false;
    try { canFiles = coarse && navigator.share && navigator.canShare && navigator.canShare({ files: [rec.pngFile] }); } catch (x) {}
    if (canFiles) {
      /* Phones: the share sheet sends the receipt picture together with the message */
      navigator.share({ files: [rec.pngFile], text: rec.text, title: 'TheGrowthLoop payment receipt' }).then(function () {
        $('shareNote').textContent = 'Shared. Please check the message went to TheGrowthLoop on WhatsApp.';
      }).catch(function (err) {
        if (err && err.name === 'AbortError') return;
        download(rec.png, 'TheGrowthLoop-receipt-' + rec.id + '.png');
        openWhatsApp();
        $('shareNote').textContent = 'Receipt image saved. In WhatsApp, tap the attach (paperclip) icon and choose it.';
      });
      return;
    }
    /* Computers: copy the image, open WhatsApp with the message, then the learner pastes the image (Ctrl+V) */
    var win = null;
    copyImage().then(function (copied) {
      download(rec.png, 'TheGrowthLoop-receipt-' + rec.id + '.png');
      openWhatsApp();
      $('shareNote').textContent = copied
        ? 'Receipt image copied. In the WhatsApp chat, click the message box and press Ctrl+V (Cmd+V on Mac) to paste it, then Send.'
        : 'Receipt image saved to your downloads. In WhatsApp, attach it with the paperclip icon, then Send.';
    });
  });

  $('pdfBtn').addEventListener('click', function () {
    if (!rec) return;
    download(window.tglReceipt.pdf(rec.cv), 'TheGrowthLoop-receipt-' + rec.id + '.pdf');
    $('shareNote').textContent = 'PDF receipt downloaded.';
  });
  $('pngBtn').addEventListener('click', function () {
    if (!rec) return;
    download(rec.png, 'TheGrowthLoop-receipt-' + rec.id + '.png');
    $('shareNote').textContent = 'Receipt image downloaded.';
  });

  $('rclose').addEventListener('click', function () { modal.classList.remove('open'); if (lastFocus) lastFocus.focus(); });

  /* ---------- registration window ---------- */
  var R = C.registration || {}, closes = new Date(R.closes).getTime();
  if (!isNaN(closes) && Date.now() > closes) {
    $('closedBar').hidden = false;
    form.querySelectorAll('input,button').forEach(function (el) { el.disabled = true; });
  }

  /* keep focus inside the popup; Esc closes it */
  document.addEventListener('keydown', function (ev) {
    if (!modal.classList.contains('open')) return;
    if (ev.key === 'Escape') { modal.classList.remove('open'); if (lastFocus) lastFocus.focus(); return; }
    if (ev.key === 'Tab') {
      var f = modal.querySelectorAll('a[href],button');
      var first = f[0], last = f[f.length - 1];
      if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
      else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
    }
  });
})();
