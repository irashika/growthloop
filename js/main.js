const ICONS = {
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  close:'<path d="M6 6l12 12M18 6L6 18"/>',
  search:'<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.2-4.2"/>',
  layers:'<path d="M12 4l8 4-8 4-8-4 8-4z"/><path d="M4 12l8 4 8-4"/><path d="M4 16l8 4 8-4"/>',
  flow:'<rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/><path d="M10 7h4a3 3 0 013 3v4"/>',
  layout:'<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><path d="M3.5 9.5h17M9.5 9.5v10"/>',
  pen:'<path d="M4 20l4-1 11-11-3-3L5 16l-1 4z"/><path d="M14 7l3 3"/>',
  edit:'<path d="M4 20l4-1 11-11-3-3L5 16l-1 4z"/><path d="M14 7l3 3"/>',
  folder:'<path d="M3.5 7.5a2 2 0 012-2H10l2 2.5h6.5a2 2 0 012 2V17a2 2 0 01-2 2h-13a2 2 0 01-2-2V7.5z"/>',
  chart:'<path d="M4 20V5M4 20h16M8 16v-4M12 16V8M16 16v-6"/>',
  spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z"/>',
  target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".8"/>',
  briefcase:'<rect x="3.5" y="7.5" width="17" height="12" rx="2"/><path d="M9 7.5V6a2 2 0 012-2h2a2 2 0 012 2v1.5M3.5 13h17"/>',
  compass:'<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z"/>',
  bulb:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"/>',
  book:'<path d="M5 5.5A1.5 1.5 0 016.5 4H19v14H6.5A1.5 1.5 0 005 19.5V5.5z"/><path d="M5 19.5A1.5 1.5 0 006.5 21H19"/>',
  refresh:'<path d="M19 8a7.5 7.5 0 00-13-1.5L4.5 8M4.5 4v4h4M5 16a7.5 7.5 0 0013 1.5l1.5-1.5M19.5 20v-4h-4"/>',
  rocket:'<path d="M14 4c3 0 6 0 6 0s0 3-.5 6c-.8 3-3.5 5.5-6.5 6.5L8 11c1-3 3.5-5.7 6-7z"/><circle cx="15" cy="9" r="1.5"/><path d="M8 11l-3 .5L3.5 14l3.5-.5M13 16l-.5 3L10 20.5l.5-3.5"/>',
  code:'<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5.5l-3 13"/>',
  mail:'<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 7l8 6 8-6"/>',
  phone:'<path d="M6 4h3l1.5 4-2 1.3a10 10 0 005.2 5.2L15 12.5l4 1.5v3a2 2 0 01-2 2A13 13 0 014 6a2 2 0 012-2z"/>',
  globe:'<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.5 3.5 8.5s-1 6-3.5 8.5c-2.5-2.5-3.5-5.5-3.5-8.5s1-6 3.5-8.5z"/>',
  info:'<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8v.01"/>',
  play:'<path d="M8 5.5v13l11-6.5-11-6.5z"/>',
  back:'<path d="M19 12H5M11 6l-6 6 6 6"/>',
  wa:'<path d="M20 11.5a8 8 0 01-11.8 7L4 20l1.5-4.1A8 8 0 1120 11.5z"/><path d="M9.3 8.6c0 3.2 2.5 5.7 5.7 5.7l.9-1.4-1.9-1-.7.7c-.8-.3-1.6-1.1-1.9-1.9l.7-.7-1-1.9-1.8.5z"/>',
  star:'<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.7l1-5.9L3.5 9.7l5.9-.8L12 3.5z" stroke="none"/>',
  lock:'<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 017 0v2.5"/>',
  tag:'<path d="M3.5 12.2V5.5a2 2 0 012-2h6.7l8.3 8.3a2 2 0 010 2.8l-6.4 6.4a2 2 0 01-2.8 0L3.5 12.2z"/><circle cx="8.5" cy="8.5" r="1.2"/>',
  user:'<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20a7 7 0 0114 0"/>',
  chev:'<path d="M6 15l6-6 6 6"/>'
};
const ic = n => '<svg viewBox="0 0 24 24" aria-hidden="true">'+(ICONS[n]||'')+'</svg>';
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function hydrateIcons(root=document){ $$('.ic[data-i]', root).forEach(el => { el.innerHTML = ic(el.dataset.i); el.removeAttribute('data-i'); }); }

function go(id){
  const el = id === 'top' ? document.body : document.getElementById(id);
  if(!el) return;
  const y = id === 'top' ? 0 : el.getBoundingClientRect().top + scrollY - 76;
  scrollTo({top:y, behavior: reduce ? 'auto' : 'smooth'});
}

/* features */
$('#feats').innerHTML = CONFIG.features.map(f =>
  `<article class="feat"><span class="icon"><span class="ic" data-i="${f[0]}"></span></span><h3>${esc(f[1])}</h3><p>${esc(f[2])}</p></article>`).join('');
/* audience */
$('#aud').innerHTML = CONFIG.audience.map(a =>
  `<article class="card"><span class="icon"><span class="ic" data-i="${a[0]}"></span></span><h3>${esc(a[1])}</h3><dl><div><dt>UI/UX</dt><dd>${esc(a[2])}</dd></div><div><dt>AI + Marketing</dt><dd>${esc(a[3])}</dd></div></dl></article>`).join('');
/* faq */
$('#faqList').innerHTML = CONFIG.faqs.map((q,i) =>
  `<div class="faq" id="faq${i}"><h3><button type="button" aria-expanded="false" aria-controls="fa${i}" id="fq${i}"><span>${esc(q[0])}</span><span class="pm"><span class="ic" data-i="plus"></span></span></button></h3><div class="ans" id="fa${i}" role="region" aria-labelledby="fq${i}" hidden>${q[1]}</div></div>`).join('');
/* curriculum */
const keys = Object.keys(CONFIG.courses);
$('#curPanels').innerHTML = keys.map(k => {
  const c = CONFIG.courses[k];
  const mods = c.modules.map((m,i) =>
    `<div class="mod${i===0?' open':''}"><h3><button type="button" aria-expanded="${i===0}" aria-controls="m-${k}-${i}" id="mb-${k}-${i}"><span class="n">${String(i+1).padStart(2,'0')}</span><span class="t">${esc(m[0])}</span><span class="pm"><span class="ic" data-i="plus"></span></span></button></h3><div class="panel-in" id="m-${k}-${i}" role="region" aria-labelledby="mb-${k}-${i}"${i===0?'':' hidden'}>${esc(m[1])}</div></div>`).join('');
  return `<div class="cur" role="tabpanel" id="pn-${k}" aria-labelledby="tab-${k}"${k===keys[0]?'':' hidden'}>
    <div class="intro"><h2>${c.title}</h2><p>${esc(c.intro)}</p><div class="proj" style="margin-top:22px"><b>Suggested project</b>${esc(c.project)}</div><a class="btn btn-p" href="#enquire" data-enquire="${esc(c.name)}">Enquire about ${esc(c.name)} <span class="ic" data-i="arrow"></span></a><div><span class="note draft-note"><span class="ic" data-i="edit"></span>Proposed curriculum. Confirm before publishing.</span></div></div>
    <div class="mods">${mods}</div></div>`;
}).join('');

hydrateIcons();
if(!CONFIG.showDraftNotes) $$('.draft-note').forEach(n => n.parentElement.hidden = true);

/* tabs */
function openTab(k, focus){
  keys.forEach(key => {
    const sel = key === k;
    const t = $('#tab-'+key); t.setAttribute('aria-selected', sel); t.tabIndex = sel ? 0 : -1;
    $('#pn-'+key).hidden = !sel;
    if(sel && focus) t.focus();
  });
}
$$('.tab').forEach(t => {
  t.addEventListener('click', () => openTab(t.dataset.key));
  t.addEventListener('keydown', e => {
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){ const i = keys.indexOf(t.dataset.key); const n = keys[(i + (e.key==='ArrowRight'?1:keys.length-1)) % keys.length]; openTab(n, true); e.preventDefault(); }
  });
});

/* accordions */
function toggle(btn, box, wrap){
  const open = btn.getAttribute('aria-expanded') !== 'true';
  btn.setAttribute('aria-expanded', open); box.hidden = !open; wrap.classList.toggle('open', open);
}
$$('.mod button').forEach(b => b.addEventListener('click', () => toggle(b, document.getElementById(b.getAttribute('aria-controls')), b.closest('.mod'))));
$$('.faq button').forEach(b => b.addEventListener('click', () => toggle(b, document.getElementById(b.getAttribute('aria-controls')), b.closest('.faq'))));

/* enquiry + navigation */
const form = $('#enqForm'), sel = $('#f-course');
function enquire(course){ openLead(course); return; }
function enquireScroll(course){
  if(course && [...sel.options].some(o => o.value === course || o.text === course)) sel.value = course;
  go('enquire');
  setTimeout(() => $('#f-name').focus({preventScroll:true}), reduce ? 0 : 600);
}
const menu = $('#mobileMenu'), mbtn = $('#menuBtn');
function closeMenu(){ menu.classList.remove('open'); mbtn.setAttribute('aria-expanded','false'); mbtn.setAttribute('aria-label','Open menu'); mbtn.firstElementChild.innerHTML = ic('menu'); }
mbtn.addEventListener('click', () => {
  const o = !menu.classList.contains('open');
  menu.classList.toggle('open', o); mbtn.setAttribute('aria-expanded', o); mbtn.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); mbtn.firstElementChild.innerHTML = ic(o ? 'close' : 'menu');
});
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]'); if(!a) return;
  e.preventDefault(); closeMenu();
  if(a.dataset.enquire !== undefined){ enquire(a.dataset.enquire); return; }
  if(a.dataset.tab){ openTab(a.dataset.tab); go('curriculum'); return; }
  go(a.dataset.go || a.getAttribute('href').slice(1));
});
document.addEventListener('keydown', e => { if(e.key==='Escape') closeMenu(); });

/* media panel: play control only when a real video URL is configured */
if(CONFIG.videoUrl){
  const stage = $('#stage');
  const b = document.createElement('button');
  b.className = 'play'; b.type = 'button'; b.setAttribute('aria-label','Play program video'); b.innerHTML = '<span class="ic">'+ic('play')+'</span>';
  b.addEventListener('click', () => {
    const v = document.createElement('video'); v.controls = true; v.autoplay = true; v.playsInline = true; v.src = CONFIG.videoUrl;
    if(CONFIG.videoPoster) v.poster = CONFIG.videoPoster;
    stage.replaceWith(v); b.remove();
  });
  stage.appendChild(b);
}

/* privacy / terms / contact / footer */
(function(){
  const slot = $('#privacySlot');
  if(CONFIG.privacyUrl){ slot.innerHTML = 'Read our <a href="'+esc(CONFIG.privacyUrl)+'" target="_blank" rel="noopener">privacy policy</a>.'; }
  else slot.textContent = '';
  const legal = [];
  if(CONFIG.privacyUrl) legal.push(['Privacy', CONFIG.privacyUrl]);
  if(CONFIG.termsUrl) legal.push(['Terms', CONFIG.termsUrl]);
  const ln = $('#legalNav');
  if(legal.length){ ln.hidden = false; ln.innerHTML = legal.map(l => '<a href="'+esc(l[1])+'" target="_blank" rel="noopener">'+l[0]+'</a>').join(''); }
  const items = [];
  const c = CONFIG.contact;
  if(c.email) items.push('<li class="ci"><span class="ic">'+ic('mail')+'</span><span>'+esc(c.email)+'</span></li>');
  if(c.phone) items.push('<li class="ci"><span class="ic">'+ic('phone')+'</span><span>'+esc(c.phone)+'</span></li>');
  if(c.website) items.push('<li class="ci"><span class="ic">'+ic('globe')+'</span><a href="'+esc(c.website)+'" target="_blank" rel="noopener">'+esc(c.website.replace(/^https?:\/\//,''))+'</a></li>');
  CONFIG.social.forEach(s => items.push('<li><a href="'+esc(s.url)+'" target="_blank" rel="noopener">'+esc(s.label)+'</a></li>'));
  if(items.length){ $('#contactCol').hidden = false; $('#contactList').innerHTML = items.join(''); }
  $('#copy').textContent = '© ' + new Date().getFullYear() + ' The Growth Loop. All rights reserved.';
})();

/* ============ WhatsApp, popup, bar, testimonials ============ */
const WA = (CONFIG.whatsappNumber || '').replace(/\D/g, '');
function waLink(text){ return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text); }
function postLead(data){
  if(!CONFIG.formEndpoint) return Promise.resolve(false);
  return fetch(CONFIG.formEndpoint, {method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body:JSON.stringify(data)})
    .then(r => r.ok).catch(() => false);
}

/* floating WhatsApp button */
const fab = $('#waFab');
if(WA){ fab.href = waLink('Hi, I would like to know more about your courses.'); }
else { fab.addEventListener('click', e => { e.preventDefault(); openLead(); }); }

/* sticky bar */
(function(){
  const bar = $('#stickyBar'); if(!CONFIG.bar || !CONFIG.bar.length) return;
  $('#barItems').innerHTML = CONFIG.bar.map(i => '<div><small>'+esc(i[0])+'</small><b>'+esc(i[1])+'</b></div>').join('');
  const hero = $('.hero');
  function upd(){ const show = scrollY > (hero ? hero.offsetHeight * .7 : 500) && $('#leadModal').hidden; bar.hidden = !show; document.body.classList.toggle('has-bar', show); }
  addEventListener('scroll', upd, {passive:true}); upd();
})();

/* popup */
const modal = $('#leadModal'), lform = $('#leadForm');
let lastFocus = null;
function showStep(n){
  $$('.lstep', lform).forEach(el => el.hidden = el.dataset.step !== String(n));
  const f = $('.lstep:not([hidden]) input, .lstep:not([hidden]) select, .lstep:not([hidden]) a.wa-btn', lform); if(f) f.focus({preventScroll:true});
  $('.modal-card').scrollTop = 0;
}
function openLead(course){
  lastFocus = document.activeElement;
  if(course){ const o = [...$('#l-course').options].find(o => o.value === course || o.text === course); if(o) $('#l-course').value = o.value || o.text; }
  showStep(1);
  modal.hidden = false; document.body.classList.add('modal-open');
  document.getElementById('stickyBar').hidden = true;
  $('#l-name').focus();
}
function closeLead(){
  modal.hidden = true; document.body.classList.remove('modal-open');
  if(lastFocus && lastFocus.focus) lastFocus.focus();
  window.dispatchEvent(new Event('scroll'));
}
$$('[data-close]', modal).forEach(el => el.addEventListener('click', closeLead));
$$('[data-open-lead]').forEach(el => el.addEventListener('click', () => openLead()));
document.addEventListener('keydown', e => {
  if(modal.hidden) return;
  if(e.key === 'Escape') closeLead();
  if(e.key === 'Tab'){
    const f = $$('button, a[href], input, select, textarea', modal).filter(x => !x.disabled && x.offsetParent !== null);
    if(!f.length) return; const first = f[0], last = f[f.length-1];
    if(e.shiftKey && document.activeElement === first){ last.focus(); e.preventDefault(); }
    else if(!e.shiftKey && document.activeElement === last){ first.focus(); e.preventDefault(); }
  }
});
function fieldErr(id, input, msg){ const p = $('#'+id); p.textContent = msg || ''; p.hidden = !msg; if(input) input.classList.toggle('bad', !!msg); if(input) input.setAttribute('aria-invalid', !!msg); }
$('#toStep2').addEventListener('click', () => {
  const n = $('#l-name'), em = $('#l-email'), ph = $('#l-phone');
  let ok = true;
  if(n.value.trim().length < 2){ fieldErr('e-name', n, 'Please enter your name.'); ok = false; } else fieldErr('e-name', n);
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em.value.trim())){ fieldErr('e-email', em, 'Please enter a valid email address.'); ok = false; } else fieldErr('e-email', em);
  if(ph.value.replace(/\D/g,'').length < 8){ fieldErr('e-phone', ph, 'Please enter a valid WhatsApp number.'); ok = false; } else fieldErr('e-phone', ph);
  if(ok) showStep(2);
});
$('#toStep1').addEventListener('click', () => showStep(1));
lform.addEventListener('keydown', e => { if(e.key === 'Enter' && e.target.tagName === 'INPUT'){ e.preventDefault(); const st = e.target.closest('.lstep'); if(st && st.dataset.step === '1') $('#toStep2').click(); else if(st && st.dataset.step === '2') lform.requestSubmit(); } });

function money(n){ return (CONFIG.checkout ? CONFIG.checkout.currency : '₹') + Number(n).toLocaleString('en-IN'); }
function renderOffer(){
  const o = CONFIG.offer, box = $('#offerBox');
  if(!o || !o.fee){ box.hidden = true; return null; }
  let h = '<small class="k">Current cohort fee</small><div class="fee">' + (o.original ? '<s>'+money(o.original)+'</s>' : '') + '<b>'+money(o.fee)+'</b></div>';
  if(o.original && o.original > o.fee) h += '<span class="save">Save '+money(o.original - o.fee)+'</span>';
  let timer = null;
  if(o.deadline && !isNaN(Date.parse(o.deadline)) && Date.parse(o.deadline) > Date.now()){
    h += '<p style="margin-top:16px;color:#52627A">Price changes in</p><div class="cd" id="cd" aria-label="Time left"></div>'; timer = true;
  }
  if(o.seats || o.after){
    h += '<div class="two">' + (o.seats ? '<div><span>Offer availability</span><b>'+esc(o.seats)+'</b></div>' : '<div></div>') + (o.after ? '<div><span>After that</span><b>'+money(o.after)+'</b></div>' : '') + '</div>';
  }
  box.innerHTML = h; box.hidden = false;
  if(timer){
    const cd = $('#cd'); const t = Date.parse(o.deadline);
    const tick = () => {
      let d = Math.max(0, t - Date.now()); const days = Math.floor(d/864e5); d -= days*864e5; const hr = Math.floor(d/36e5); d -= hr*36e5; const mi = Math.floor(d/6e4); d -= mi*6e4; const se = Math.floor(d/1e3);
      const u = (v,l) => '<div class="u"><span class="dg">'+String(v).padStart(2,'0').split('').map(c=>'<i>'+c+'</i>').join('')+'</span><small>'+l+'</small></div>';
      cd.innerHTML = u(days,'DAYS')+'<span class="sep">:</span>'+u(hr,'HRS')+'<span class="sep">:</span>'+u(mi,'MIN')+'<span class="sep">:</span>'+u(se,'SEC');
    };
    tick(); setInterval(tick, 1000);
  }
  return true;
}
lform.addEventListener('submit', async e => {
  e.preventDefault();
  const exp = $('#l-exp');
  if(!exp.value){ fieldErr('e-exp', exp, 'Please select your experience level.'); exp.focus(); return; } else fieldErr('e-exp', exp);
  const d = Object.fromEntries(new FormData(lform).entries());
  d.source = 'popup'; d.page = location.href;
  const btn = $('#leadSubmit'); btn.disabled = true;
  const saved = await postLead(d);
  btn.disabled = false;
  const first = d.name.trim().split(/\s+/)[0];
  const course = d.course === 'Help me choose' ? 'courses' : d.course;
  const msg = "Hi, I just checked out the " + course + " program. I'd like to get the brochure and program details.\n\n" +
    "Name: " + d.name.trim() + "\nEmail: " + d.email.trim() + "\nWhatsApp: " + d.phone.trim() + "\nCurrent role: " + d.role + "\nExperience: " + d.experience + "\nBest time to reach me: " + d.time;
  $('#doneTitle').textContent = saved ? 'Your details are submitted' : 'Thanks, ' + first;
  $('#doneSub').textContent = renderOffer() ? 'Here are the current details for the upcoming cohort.' : 'Continue on WhatsApp to get the brochure and program details.';
  const wb = $('#waBtn'), note = $('#doneNote');
  if(WA){ wb.href = waLink(msg); wb.removeAttribute('aria-disabled'); wb.classList.remove('off'); note.textContent = 'WhatsApp opens with your details filled in. Press send there to reach us.'; }
  else { wb.href = '#'; wb.setAttribute('aria-disabled','true'); wb.addEventListener('click', ev => ev.preventDefault(), {once:false}); wb.style.opacity = .55; note.textContent = 'WhatsApp is not connected yet. The site owner needs to add a WhatsApp number in js/config.js.'; }
  const bl = $('#brochureLink'); if(CONFIG.brochureUrl){ bl.href = CONFIG.brochureUrl; bl.hidden = false; } else bl.hidden = true;
  showStep(3);
});

/* enquiry section form: sends to WhatsApp, never shows a false "sent" message */
const statusEl = $('#status');
function say(type, msg){ statusEl.className = 'status show ' + type; statusEl.textContent = msg; }
form.addEventListener('submit', async e => {
  e.preventDefault();
  if(!form.checkValidity()){ form.reportValidity(); return; }
  const d = Object.fromEntries(new FormData(form).entries());
  d.source = 'enquiry-form'; d.page = location.href;
  if(!WA){ say('err', 'WhatsApp is not connected yet. The site owner needs to add a WhatsApp number in js/config.js.'); return; }
  postLead(d);
  const course = d.course === 'Help me choose' ? 'your courses' : d.course;
  const msg = "Hi, I'd like to enquire about " + course + ".\n\nName: " + d.name + "\nEmail: " + d.email + "\nPhone: " + d.phone + (d.goal ? "\nMy learning goal: " + d.goal : '');
  const w = window.open(waLink(msg), '_blank', 'noopener');
  if(!w) location.href = waLink(msg);
  say('info', 'WhatsApp should now be open with your message. Press send there to complete your enquiry.');
});

/* testimonials */
(function(){
  const list = CONFIG.testimonials || [], sec = $('#reviews');
  if(!list.length) return;
  sec.hidden = false;
  const anySample = list.some(t => t.sample);
  $('#revNote').hidden = !anySample;
  if(anySample) $('#revSub').textContent = 'Placeholder reviews are shown below to preview the layout.';
  $('#reviewList').innerHTML = list.map((t, i) => {
    const ini = esc((t.name || '?').trim().charAt(0).toUpperCase());
    const stars = t.rating ? '<span class="stars" role="img" aria-label="'+t.rating+' out of 5">' + Array.from({length:Math.min(5,t.rating)}, () => '<svg viewBox="0 0 24 24" aria-hidden="true">'+ICONS.star+'</svg>').join('') + '</span>' : '';
    const who = '<div class="who"><span class="av" aria-hidden="true">'+ini+'</span><div><b>'+esc(t.name)+'</b>'+(t.role ? '<small>'+esc(t.role)+'</small>' : '')+'</div></div>';
    const tag = t.sample ? '<span class="stag">Sample</span>' : '';
    if(t.video){
      return '<article class="card rcard vid" data-v="'+i+'"'+(t.poster ? ' style="background:#0F172A url(\''+esc(t.poster)+'\') center/cover"' : '')+'><button class="vplay" type="button" aria-label="Play video from '+esc(t.name)+'"><svg viewBox="0 0 24 24" aria-hidden="true">'+ICONS.play+'</svg></button><div class="vbox"><div class="rtop">'+who+stars+'</div><p>'+esc(t.text||'')+'</p></div></article>';
    }
    return '<article class="card rcard">'+tag+'<div class="rtop">'+who+stars+'</div><p>'+esc(t.text)+'</p></article>';
  }).join('');
  $$('.rcard.vid .vplay').forEach(b => b.addEventListener('click', () => {
    const card = b.closest('.rcard'), t = list[+card.dataset.v];
    const v = document.createElement('video'); v.controls = true; v.autoplay = true; v.playsInline = true; v.src = t.video; card.prepend(v); b.remove();
  }));
})();

/* gentle scroll reveals (content is already readable at rest) */
if(!reduce && 'IntersectionObserver' in window){
  const io = new IntersectionObserver(es => es.forEach(x => { if(x.isIntersecting){ const t = x.target; t.classList.add('in'); io.unobserve(t); setTimeout(() => t.classList.remove('rv','in'), 900); } }), {threshold:.08});
  $$('.card, .feat, .mod, .faq, .head, .media, .panel .note').forEach(el => { el.classList.add('rv'); io.observe(el); });
}
