(function(){
  'use strict';
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const WA = (CONFIG.whatsappNumber || '').replace(/\D/g, '');
  const waLink = t => 'https://wa.me/' + WA + (t ? '?text=' + encodeURIComponent(t) : '');

  /* ---------- config-driven links ---------- */
  $$('[data-wa]').forEach(a => { if(WA) a.href = waLink('Hi, I would like to know more about TheGrowthLoop programs.'); });
  $$('[data-brochure]').forEach(a => { if(WA) a.href = waLink("Hi TheGrowthLoop, I'd like to get the brochure for the " + a.dataset.brochure + " program (next cohort)."); });
  $$('[data-social]').forEach(a => { const u = CONFIG.social && CONFIG.social[a.dataset.social]; if(u) a.href = u; });
  if(CONFIG.endorsedBy){ const e = $('#endorse'); e.textContent = CONFIG.endorsedBy; e.hidden = false; }
  $('#copy').textContent = '© ' + new Date().getFullYear() + ' TheGrowthLoop. All rights reserved.';
  (function(){
    const legal = [];
    if(CONFIG.privacyUrl) legal.push(['Privacy', CONFIG.privacyUrl]);
    if(CONFIG.termsUrl) legal.push(['Terms', CONFIG.termsUrl]);
    if(legal.length){ const n = $('#legalNav'); n.hidden = false; n.innerHTML = legal.map(l => '<a href="'+esc(l[1])+'" target="_blank" rel="noopener">'+l[0]+'</a>').join(''); }
    if(CONFIG.privacyUrl) $('#privacySlot').innerHTML = 'Read our <a href="'+esc(CONFIG.privacyUrl)+'" target="_blank" rel="noopener">privacy policy</a>.';
  })();

  /* ---------- header, progress, active nav ---------- */
  const hdr = $('#hdr'), bar = $('#progress');
  const links = $$('.nav a');
  const targets = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
  let ticking = false;
  function onScroll(){
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    hdr.classList.toggle('scrolled', y > 8);
    bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
    let cur = null; const mid = innerHeight * .35;
    targets.forEach(t => { if(t.getBoundingClientRect().top <= mid) cur = t; });
    links.forEach(a => a.classList.toggle('on', cur && a.getAttribute('href') === '#' + cur.id));
    tlUpdate(); parallax(); ticking = false;
  }
  addEventListener('scroll', () => { if(!ticking){ ticking = true; requestAnimationFrame(onScroll); } }, {passive:true});
  addEventListener('resize', onScroll);

  /* mobile menu */
  const menu = $('#mobileMenu'), mbtn = $('#menuBtn');
  function setMenu(open){
    menu.hidden = !open; mbtn.setAttribute('aria-expanded', open); mbtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mbtn.firstElementChild.firstElementChild.setAttribute('href', open ? '#i-close' : '#i-menu');
  }
  mbtn.addEventListener('click', () => setMenu(menu.hidden));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('resize', () => { if(innerWidth > 1060) setMenu(false); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') setMenu(false); });

  /* ---------- reveal on scroll ---------- */
  const rv = $$('.rv');
  let rvObserver = null;
  if('IntersectionObserver' in window){
    rvObserver = new IntersectionObserver(es => es.forEach(x => { if(x.isIntersecting){ x.target.classList.add('in'); rvObserver.unobserve(x.target); } }), {threshold:.12, rootMargin:'0px 0px -6% 0px'});
    rv.forEach(el => rvObserver.observe(el));
  } else rv.forEach(el => el.classList.add('in'));

  /* ---------- counters ---------- */
  function fmt(el, v){
    const pad = +el.dataset.pad || 0;
    let s = pad ? String(Math.round(v)).padStart(pad, '0') : Math.round(v).toLocaleString('en-IN');
    return (el.dataset.prefix || '') + s + (el.dataset.suffix || '');
  }
  const counters = $$('[data-count]');
  function runCounter(el){
    const end = +el.dataset.count;
    if(reduce){ el.textContent = fmt(el, end); return; }
    const dur = 1700, t0 = performance.now();
    (function step(t){
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(el, end * e);
      if(p < 1) requestAnimationFrame(step);
    })(t0);
  }
  if('IntersectionObserver' in window){
    counters.forEach(c => { c.textContent = fmt(c, 0); });
    const co = new IntersectionObserver(es => es.forEach(x => { if(x.isIntersecting){ runCounter(x.target); co.unobserve(x.target); } }), {threshold:.6});
    counters.forEach(c => co.observe(c));
  }

  /* ---------- spotlight + magnetic buttons ---------- */
  if(fine && !reduce){
    $$('.spot').forEach(c => c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px'); }));
    $$('.mag').forEach(b => {
      b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = 'translate(' + ((e.clientX - r.left - r.width/2) * .18) + 'px,' + ((e.clientY - r.top - r.height/2) * .28) + 'px)'; });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
  }

  /* ---------- grid-square parallax ---------- */
  const sqs = $$('.sq[data-px]');
  function parallax(){
    if(reduce) return;
    sqs.forEach(s => { const p = s.parentElement.getBoundingClientRect(); if(p.bottom < -100 || p.top > innerHeight + 100) return; s.style.transform = 'translateY(' + ((innerHeight/2 - (p.top + p.height/2)) * parseFloat(s.dataset.px) * .12) + 'px)'; });
  }

  /* ---------- timeline ---------- */
  const tl = $('#timeline'), steps = $$('.step', tl);
  function tlUpdate(){
    const r = tl.getBoundingClientRect(), line = innerHeight * .62;
    const p = Math.max(0, Math.min(1, (line - r.top - 24) / Math.max(1, r.height - 48)));
    tl.style.setProperty('--tp', p.toFixed(3));
    steps.forEach(s => { const d = $('.dot', s).getBoundingClientRect(); s.classList.toggle('on', d.top + d.height/2 < line); });
  }

  /* ---------- FAQ ---------- */
  $$('.faq button').forEach(b => b.addEventListener('click', () => {
    const f = b.closest('.faq'), open = !f.classList.contains('open');
    $$('.faq.open').forEach(o => { o.classList.remove('open'); $('button', o).setAttribute('aria-expanded', 'false'); });
    if(open){ f.classList.add('open'); b.setAttribute('aria-expanded', 'true'); }
  }));

  /* ---------- testimonials ---------- */
  (function(){
    const list = CONFIG.testimonials || [], sec = $('#reviews'), box = $('#reviewList');
    if(!list.length){ sec.hidden = true; return; }
    const tagName = {uiux:'AI + UI/UX', aimk:'AI + Digital Marketing'};
    box.innerHTML = list.map(t =>
      '<article class="card rcard rv spot" data-p="' + esc(t.program || '') + '">' +
        '<div class="rhead"><svg class="qm" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 17.5c-2-.4-3.2-2-3.2-4.4 0-3 1.8-5.2 4.8-6.1l.6 1.2c-1.7.7-2.5 1.8-2.5 3.2h2.3v6.1H7.2zm8.9 0c-2-.4-3.2-2-3.2-4.4 0-3 1.8-5.2 4.8-6.1l.6 1.2c-1.7.7-2.5 1.8-2.5 3.2h2.3v6.1h-2z"/></svg>' +
        (tagName[t.program] ? '<span class="rtag ' + esc(t.program) + '">' + tagName[t.program] + '</span>' : '') + '</div>' +
        '<p>' + esc(t.text) + '</p>' +
        '<div class="rwho">' + (t.photo ? '<img src="' + esc(t.photo) + '" alt="" width="56" height="56" loading="lazy">' : '<span class="av" aria-hidden="true">' + esc((t.name||'?').charAt(0)) + '</span>') +
        '<div><b>' + esc(t.name) + '</b>' + (t.role ? '<small>' + esc(t.role) + '</small>' : '') + '</div></div>' +
      '</article>').join('');
    const cards = $$('.rcard', box);
    cards.forEach((el, i) => { el.style.setProperty('--d', (i % 3) * .08 + 's'); if(window.IntersectionObserver){ rvObserver.observe(el); } else el.classList.add('in'); });
    $$('.rtab').forEach(b => b.addEventListener('click', () => {
      $$('.rtab').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); });
      cards.forEach(c => { const show = b.dataset.f === 'all' || c.dataset.p === b.dataset.f; c.hidden = !show; if(show) c.classList.add('in'); });
    }));
  })();

  /* ---------- lead capture: WhatsApp ---------- */
  function postLead(d){
    if(!CONFIG.formEndpoint) return Promise.resolve(false);
    return fetch(CONFIG.formEndpoint, {method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body:JSON.stringify(d)}).then(r => r.ok).catch(() => false);
  }
  function openWA(msg){
    const url = waLink(msg), w = window.open(url, '_blank', 'noopener');
    if(!w){ /* popup blocked: the visible button in the popup is the fallback */ return false; }
    return true;
  }

  const modal = $('#leadModal'), lform = $('#leadForm');
  let lastFocus = null;
  function showStep(n, quiet){
    $$('.lstep', lform).forEach(el => el.hidden = el.dataset.step !== String(n));
    const f = $('.lstep:not([hidden]) input, .lstep:not([hidden]) select, .lstep:not([hidden]) a.btn-wa', lform);
    if(f && !quiet) f.focus({preventScroll:true});
    $('.modal-card').scrollTop = 0;
  }
  function openLead(course, auto){
    lastFocus = auto ? null : document.activeElement;
    if(course){ const o = [...$('#l-course').options].find(o => o.text === course); if(o) $('#l-course').value = o.value || o.text; }
    showStep(1, auto); modal.hidden = false; document.body.classList.add('modal-open'); setMenu(false);
    if(auto) $('.modal-card').focus({preventScroll:true}); else $('#l-name').focus();
  }
  function closeLead(){ modal.hidden = true; document.body.classList.remove('modal-open'); if(lastFocus && lastFocus.focus) lastFocus.focus(); }
  $$('[data-open-lead]').forEach(el => el.addEventListener('click', () => openLead(el.dataset.openLead)));
  $$('[data-close]', modal).forEach(el => el.addEventListener('click', closeLead));
  document.addEventListener('keydown', e => {
    if(modal.hidden) return;
    if(e.key === 'Escape') closeLead();
    if(e.key === 'Tab'){
      const f = $$('button, a[href], input, select, textarea', modal).filter(x => !x.disabled && x.offsetParent !== null);
      if(!f.length) return; const a = f[0], z = f[f.length-1];
      if(e.shiftKey && document.activeElement === a){ z.focus(); e.preventDefault(); }
      else if(!e.shiftKey && document.activeElement === z){ a.focus(); e.preventDefault(); }
    }
  });
  function fieldErr(id, input, msg){ const p = $('#' + id); p.textContent = msg || ''; p.hidden = !msg; input.classList.toggle('bad', !!msg); input.setAttribute('aria-invalid', !!msg); }
  $('#toStep2').addEventListener('click', () => {
    const n = $('#l-name'), em = $('#l-email'), ph = $('#l-phone'); let ok = true;
    if(n.value.trim().length < 2){ fieldErr('e-name', n, 'Please enter your name.'); ok = false; } else fieldErr('e-name', n);
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em.value.trim())){ fieldErr('e-email', em, 'Please enter a valid email address.'); ok = false; } else fieldErr('e-email', em);
    if(ph.value.replace(/\D/g, '').length < 8){ fieldErr('e-phone', ph, 'Please enter a valid WhatsApp number.'); ok = false; } else fieldErr('e-phone', ph);
    if(ok) showStep(2);
  });
  $('#toStep1').addEventListener('click', () => showStep(1));
  lform.addEventListener('keydown', e => {
    if(e.key === 'Enter' && e.target.tagName === 'INPUT'){ e.preventDefault(); const st = e.target.closest('.lstep'); if(st.dataset.step === '1') $('#toStep2').click(); else lform.requestSubmit(); }
  });
  lform.addEventListener('submit', e => {
    e.preventDefault();
    const exp = $('#l-exp');
    if(!exp.value){ fieldErr('e-exp', exp, 'Please select your experience level.'); exp.focus(); return; } else fieldErr('e-exp', exp);
    const d = Object.fromEntries(new FormData(lform).entries());
    d.source = 'popup'; d.page = location.href;
    const prog = d.course === 'Help me choose' ? 'programs' : d.course;
    const msg = "Hi TheGrowthLoop, I'm interested in the next cohort of the " + prog + " program. I'd like to get the brochure and program details.\n\n" +
      "Name: " + d.name.trim() + "\nEmail: " + d.email.trim() + "\nWhatsApp: " + d.phone.trim() + "\nCurrent role: " + d.role + "\nExperience: " + d.experience + "\nBest time to call: " + d.time;
    const first = d.name.trim().split(/\s+/)[0];
    $('#doneTitle').textContent = 'Thanks, ' + first;
    const wb = $('#waBtn'), note = $('#doneNote'), sub = $('#doneSub');
    if(!WA){
      sub.textContent = 'WhatsApp is not connected yet.'; wb.hidden = true; note.textContent = 'The site owner needs to add a WhatsApp number in js/config.js.';
    } else {
      wb.hidden = false; wb.href = waLink(msg);
      const opened = openWA(msg);
      sub.textContent = opened ? 'WhatsApp is opening with your details filled in.' : 'Tap the button below to send your details on WhatsApp.';
      note.textContent = opened ? 'Press send in WhatsApp to complete your enquiry. If it did not open, tap the button above.' : 'WhatsApp opens with your details filled in. Press send there to reach us.';
    }
    postLead(d);
    const bl = $('#brochureLink'); if(CONFIG.brochureUrl){ bl.href = CONFIG.brochureUrl; bl.hidden = false; } else bl.hidden = true;
    showStep(3);
  });

  /* inline contact form */
  const form = $('#enqForm'), statusEl = $('#status');
  function say(t, m){ statusEl.className = 'status show ' + t; statusEl.textContent = m; }
  form.addEventListener('submit', e => {
    e.preventDefault();
    if(!form.checkValidity()){ form.reportValidity(); return; }
    if(!WA){ say('err', 'WhatsApp is not connected yet. The site owner needs to add a WhatsApp number in js/config.js.'); return; }
    const d = Object.fromEntries(new FormData(form).entries()); d.source = 'contact-form'; d.page = location.href;
    const prog = d.course === 'Help me choose' ? 'your programs' : d.course;
    const msg = "Hi TheGrowthLoop, I'd like to enquire about " + prog + " (next cohort).\n\nName: " + d.name + "\nEmail: " + d.email + "\nWhatsApp: " + d.phone + (d.goal ? "\nMy learning goal: " + d.goal : '');
    postLead(d);
    if(openWA(msg)) say('info', 'WhatsApp is opening with your message. Press send there to complete your enquiry.');
    else say('info', 'Your browser blocked the WhatsApp window. Tap here to continue: ' ), statusEl.insertAdjacentHTML('beforeend', '<a href="' + waLink(msg) + '" target="_blank" rel="noopener" style="font-weight:700;text-decoration:underline">Open WhatsApp</a>');
  });

  onScroll();

  /* The enquiry popup opens once when a visitor arrives. After it is closed it stays closed
     for the rest of that visit (until they come back later). */
  (function(){
    let seen = false;
    try{ seen = sessionStorage.getItem('tglPopupSeen') === '1'; }catch(e){}
    if(seen) return;
    setTimeout(() => {
      if(!modal.hidden) return;
      try{ sessionStorage.setItem('tglPopupSeen', '1'); }catch(e){}
      openLead('', true);
    }, 1200);
  })();
})();
