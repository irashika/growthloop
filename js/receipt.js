/* Receipt image + PDF builder. Draws the receipt on a canvas so the same picture can be
   shown on screen, shared to WhatsApp, saved as PNG and wrapped into a PDF.
   The logo is embedded (data URI) so the canvas is never "tainted" on file:// pages. */
(function () {
  'use strict';
  var LOGO = 'data:image/webp;base64,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';
  var S = 2, W = 720;               /* logical width, pixel scale */
  var F = "'DM Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
  var H = "'Outfit', 'DM Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

  function loadLogo() {
    return new Promise(function (res) {
      var im = new Image(); im.onload = function () { res(im); }; im.onerror = function () { res(null); }; im.src = LOGO;
    });
  }
  function fonts() {
    try {
      if (document.fonts && document.fonts.load) {
        return Promise.all([document.fonts.load('700 30px Outfit'), document.fonts.load('400 16px "DM Sans"'), document.fonts.load('600 16px "DM Sans"')]).catch(function () {});
      }
    } catch (e) {}
    return Promise.resolve();
  }
  function rr(c, x, y, w, h, r) {
    c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
  }
  function fit(c, text, max) {
    text = String(text);
    if (c.measureText(text).width <= max) return text;
    while (text.length > 1 && c.measureText(text + '…').width > max) text = text.slice(0, -1);
    return text + '…';
  }

  /* d: {id, when, name, phone, email, course, utr, price, discount, code, total, status} (money already formatted) */
  function build(d) {
    return Promise.all([loadLogo(), fonts()]).then(function (r) {
      var logo = r[0];
      var rows = [['Receipt no.', d.id], ['Date & time', d.when], ['Name', d.name], ['WhatsApp', d.phone]];
      if (d.email) rows.push(['Email', d.email]);
      rows.push(['Course', d.course], ['UPI transaction ID', d.utr]);
      var hasDisc = !!d.discount;
      var rowsTop = 392, rowH = 54;
      var boxTop = rowsTop + rows.length * rowH + 14;
      var boxH = hasDisc ? 168 : 112;
      var footTop = boxTop + boxH + 34;
      var cardH = footTop + 150, Ht = cardH + 48;

      var cv = document.createElement('canvas'); cv.width = W * S; cv.height = Ht * S;
      var c = cv.getContext('2d'); c.scale(S, S);
      c.fillStyle = '#E6EDFF'; c.fillRect(0, 0, W, Ht);

      var X = 28, CW = W - 56, Y = 24;
      /* card with soft shadow */
      c.save(); c.shadowColor = 'rgba(39,72,200,.22)'; c.shadowBlur = 30; c.shadowOffsetY = 10;
      c.fillStyle = '#fff'; rr(c, X, Y, CW, cardH, 28); c.fill(); c.restore();

      /* header band */
      c.save(); rr(c, X, Y, CW, cardH, 28); c.clip();
      var g = c.createLinearGradient(X, Y, X + CW, Y + 170);
      g.addColorStop(0, '#4F7BFF'); g.addColorStop(1, '#2748C8');
      c.fillStyle = g; c.fillRect(X, Y, CW, 170);
      c.globalAlpha = .12; c.fillStyle = '#fff';
      c.beginPath(); c.arc(X + CW - 40, Y + 10, 120, 0, 7); c.fill();
      c.beginPath(); c.arc(X + 30, Y + 190, 70, 0, 7); c.fill();
      c.globalAlpha = 1; c.restore();

      if (logo) { var lw = 250, lh = lw * logo.height / logo.width; c.drawImage(logo, X + 32, Y + 34, lw, lh); }
      else { c.fillStyle = '#fff'; c.font = '700 26px ' + H; c.textBaseline = 'alphabetic'; c.fillText('TheGrowthLoop', X + 32, Y + 62); }
      c.fillStyle = 'rgba(255,255,255,.85)'; c.font = '700 13px ' + H; c.textAlign = 'right';
      if (c.letterSpacing !== undefined) c.letterSpacing = '2px';
      c.fillText('PAYMENT RECEIPT', X + CW - 32, Y + 58);
      if (c.letterSpacing !== undefined) c.letterSpacing = '0px';
      c.textAlign = 'left';
      c.fillStyle = 'rgba(255,255,255,.75)'; c.font = '500 14px ' + F;
      c.fillText('AI Masterclass · taught in Tamil', X + 32, Y + 118);

      /* success badge */
      var cx = W / 2, cy = Y + 170;
      c.fillStyle = '#fff'; c.beginPath(); c.arc(cx, cy, 42, 0, 7); c.fill();
      c.fillStyle = '#16A34A'; c.beginPath(); c.arc(cx, cy, 34, 0, 7); c.fill();
      c.strokeStyle = '#fff'; c.lineWidth = 6; c.lineCap = 'round'; c.lineJoin = 'round';
      c.beginPath(); c.moveTo(cx - 14, cy + 1); c.lineTo(cx - 4, cy + 11); c.lineTo(cx + 15, cy - 10); c.stroke();

      /* title, amount, status pill */
      c.textAlign = 'center'; c.fillStyle = '#0A0F24'; c.font = '800 30px ' + H;
      c.fillText('Payment submitted', cx, Y + 258);
      c.fillStyle = '#2748C8'; c.font = '800 54px ' + H;
      c.fillText(d.total, cx, Y + 322);
      c.font = '700 13px ' + F;
      var pt = d.status, pw = c.measureText(pt).width + 48;
      c.fillStyle = '#FFF4DB'; rr(c, cx - pw / 2, Y + 340, pw, 30, 15); c.fill();
      c.fillStyle = '#B45309'; c.beginPath(); c.arc(cx - pw / 2 + 18, Y + 355, 4, 0, 7); c.fill();
      c.fillText(pt, cx + 7, Y + 360);

      /* perforation with side notches */
      var py = Y + 400 - 8;
      c.strokeStyle = '#C9D6FB'; c.lineWidth = 2; c.setLineDash([7, 7]);
      c.beginPath(); c.moveTo(X + 28, py); c.lineTo(X + CW - 28, py); c.stroke(); c.setLineDash([]);
      c.fillStyle = '#E6EDFF';
      c.beginPath(); c.arc(X, py, 14, 0, 7); c.fill();
      c.beginPath(); c.arc(X + CW, py, 14, 0, 7); c.fill();

      /* detail rows */
      var lx = X + 36, rx = X + CW - 36, y = Y + rowsTop + 4;
      rows.forEach(function (row, i) {
        c.textAlign = 'left'; c.fillStyle = '#5B6478'; c.font = '500 15px ' + F; c.fillText(row[0], lx, y + 4);
        c.textAlign = 'right'; c.fillStyle = '#0A0F24'; c.font = '600 16px ' + F;
        c.fillText(fit(c, row[1], CW - 72 - 150), rx, y + 4);
        if (i < rows.length - 1) { c.strokeStyle = '#EEF1F8'; c.lineWidth = 1; c.beginPath(); c.moveTo(lx, y + 27); c.lineTo(rx, y + 27); c.stroke(); }
        y += rowH;
      });

      /* breakdown box */
      var by = Y + boxTop;
      c.fillStyle = '#F2F6FF'; rr(c, X + 28, by, CW - 56, boxH, 18); c.fill();
      var ly = by + 38;
      function line(k, v, color, bold) {
        c.textAlign = 'left'; c.fillStyle = '#5B6478'; c.font = '500 15px ' + F; c.fillText(k, lx, ly);
        c.textAlign = 'right'; c.fillStyle = color || '#0A0F24'; c.font = (bold ? '700' : '600') + ' 16px ' + F; c.fillText(v, rx, ly);
        ly += 40;
      }
      if (hasDisc) { line('Course fee', d.price); line('Promo ' + d.code, '−' + d.discount, '#15803D'); }
      c.strokeStyle = '#D5E0FB'; c.lineWidth = 1;
      if (hasDisc) { c.beginPath(); c.moveTo(lx, ly - 24); c.lineTo(rx, ly - 24); c.stroke(); ly += 2; }
      c.textAlign = 'left'; c.fillStyle = '#0A0F24'; c.font = '800 18px ' + H; c.fillText('Total paid', lx, ly + (hasDisc ? 4 : 10));
      c.textAlign = 'right'; c.fillStyle = '#2748C8'; c.font = '800 24px ' + H; c.fillText(d.total, rx, ly + (hasDisc ? 4 : 10));

      /* footer */
      var fy = Y + footTop;
      c.textAlign = 'center'; c.fillStyle = '#0A0F24'; c.font = '700 17px ' + H;
      c.fillText('Thank you for joining TheGrowthLoop!', cx, fy);
      c.fillStyle = '#5B6478'; c.font = '400 14px ' + F;
      c.fillText('Your seat is confirmed once we verify this payment.', cx, fy + 26);
      c.fillText('We will reply on WhatsApp.', cx, fy + 46);
      c.fillStyle = '#2748C8'; c.font = '600 14px ' + F;
      c.fillText('thegrowthloop.live  ·  +91 97919 96349  ·  ' + (d.contactEmail || ''), cx, fy + 84);

      return cv;
    });
  }

  function toBlob(cv, type, q) {
    return new Promise(function (res) {
      if (cv.toBlob) cv.toBlob(function (b) { res(b); }, type, q);
      else res(dataToBlob(cv.toDataURL(type, q)));
    });
  }
  function dataToBlob(url) {
    var p = url.split(','), mime = p[0].match(/:(.*?);/)[1], bin = atob(p[1]), n = bin.length, u = new Uint8Array(n);
    while (n--) u[n] = bin.charCodeAt(n);
    return new Blob([u], { type: mime });
  }

  /* Minimal single-page PDF holding the receipt as a JPEG (A4 portrait) */
  function pdf(cv) {
    var jpg = cv.toDataURL('image/jpeg', 0.93).split(',')[1], bin = atob(jpg), n = bin.length, img = new Uint8Array(n);
    for (var i = 0; i < n; i++) img[i] = bin.charCodeAt(i);
    var PW = 595.28, PH = 841.89, m = 50, iw = PW - 2 * m, ih = iw * cv.height / cv.width;
    if (ih > PH - 2 * m) { ih = PH - 2 * m; iw = ih * cv.width / cv.height; }
    var x = (PW - iw) / 2, y = PH - m - ih;
    var enc = function (s) { var u = new Uint8Array(s.length); for (var k = 0; k < s.length; k++) u[k] = s.charCodeAt(k) & 255; return u; };
    var content = 'q ' + iw.toFixed(2) + ' 0 0 ' + ih.toFixed(2) + ' ' + x.toFixed(2) + ' ' + y.toFixed(2) + ' cm /Im0 Do Q';
    var parts = [], off = 0, offsets = [];
    function add(u) { parts.push(u); off += u.length; }
    function obj(num, body) { offsets[num] = off; add(enc(num + ' 0 obj\n' + body + '\nendobj\n')); }
    add(enc('%PDF-1.4\n'));
    obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
    obj(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    obj(3, '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + PW + ' ' + PH + '] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>');
    offsets[4] = off;
    add(enc('4 0 obj\n<< /Type /XObject /Subtype /Image /Width ' + cv.width + ' /Height ' + cv.height + ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + img.length + ' >>\nstream\n'));
    add(img); add(enc('\nendstream\nendobj\n'));
    obj(5, '<< /Length ' + content.length + ' >>\nstream\n' + content + '\nendstream');
    var xref = off, t = 'xref\n0 6\n0000000000 65535 f \n';
    for (var j = 1; j <= 5; j++) t += String(offsets[j]).padStart(10, '0') + ' 00000 n \n';
    t += 'trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n' + xref + '\n%%EOF';
    add(enc(t));
    return new Blob(parts, { type: 'application/pdf' });
  }

  window.tglReceipt = { build: build, toBlob: toBlob, pdf: pdf };
})();
