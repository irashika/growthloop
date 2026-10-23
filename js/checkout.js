/* Checkout page logic. Prices, coupons and the payment gateway live in js/config.js */
(function(){
  const C = CONFIG.checkout;
  const ICONS = {
    arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>', back:'<path d="M19 12H5M11 6l-6 6 6 6"/>', check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    info:'<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8v.01"/>', user:'<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20a7 7 0 0114 0"/>',
    tag:'<path d="M3.5 12.2V5.5a2 2 0 012-2h6.7l8.3 8.3a2 2 0 010 2.8l-6.4 6.4a2 2 0 01-2.8 0L3.5 12.2z"/><circle cx="8.5" cy="8.5" r="1.2"/>',
    lock:'<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 017 0v2.5"/>', chev:'<path d="M6 15l6-6 6 6"/>'
  };
  const $ = s => document.querySelector(s);
  document.querySelectorAll('.ic[data-i]').forEach(el => { el.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[el.dataset.i]||'') + '</svg>'; });

  const STATES = ["Andaman and Nicobar Islands","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh","Chhattisgarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Ladakh","Lakshadweep","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Puducherry","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Outside India"];
  $('#c-state').innerHTML = '<option value="">Select state</option>' + STATES.map(s => '<option>' + s + '</option>').join('');

  const keys = Object.keys(C.courses);
  const params = new URLSearchParams(location.search);
  let key = keys.includes(params.get('course')) ? params.get('course') : keys[0];
  let coupon = null;

  $('#pickCourse').innerHTML = keys.map(k => '<option value="' + k + '">' + C.courses[k].title + '</option>').join('');
  $('#pickCourse').value = key;
  $('#pickCourse').addEventListener('change', e => { key = e.target.value; coupon = null; $('#cpMsg').textContent = ''; $('#cpCode').value = ''; render(); });

  if(C.demo) $('#demoBanner').hidden = false;
  if(C.signInUrl){ $('#acct').hidden = false; $('#signin').href = C.signInUrl; }
  $('#sumBtn').addEventListener('click', e => {
    const b = e.currentTarget, open = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', open); $('#sumBody').hidden = !open;
  });

  const fmt = n => C.currency + Number(n).toLocaleString('en-IN');
  function calc(){
    const c = C.courses[key];
    const cp = coupon ? Math.min(coupon.amount, c.original - c.discount) : 0;
    const final = Math.max(0, c.original - c.discount - cp + c.fees);
    return { course: key, title: c.title, original: c.original, discount: c.discount, coupon: cp, fees: c.fees, total: final, currency: C.currency };
  }
  function render(){
    const c = C.courses[key], o = calc();
    $('#pTitle').textContent = c.title; $('#pBy').textContent = 'By ' + c.by;
    $('#thumbA').textContent = c.title.length > 12 ? 'AI + Marketing' : c.title;
    $('#optAmt').textContent = fmt(o.total); $('#optNote').textContent = c.note || '';
    $('#rOrig').textContent = fmt(o.original); $('#rDisc').textContent = fmt(o.discount);
    $('#rFees').textContent = o.fees ? fmt(o.fees) : '';
    $('#rFinal').textContent = fmt(o.total); $('#rTotal').textContent = fmt(o.total);
    $('#rCpRow').hidden = !coupon; if(coupon) $('#rCp').textContent = '-' + fmt(o.coupon);
    document.title = 'Checkout | ' + c.title + ' | The Growth Loop';
    const p = C.payment;
    $('#secureTxt').textContent = p.provider ? 'Secure payment' + (p.gatewayName ? ' via ' + p.gatewayName : '') : 'Payment gateway not connected';
    $('#secureSub').textContent = p.provider ? 'You will complete the payment with our payment partner.' : 'The site owner needs to connect a gateway in js/config.js.';
  }
  render();

  $('#cpApply').addEventListener('click', () => {
    const code = $('#cpCode').value.trim().toUpperCase(), m = $('#cpMsg');
    if(!code){ m.className = 'cp-msg bad'; m.textContent = 'Enter a coupon code.'; return; }
    const hit = Object.keys(C.coupons || {}).find(k => k.toUpperCase() === code);
    if(!hit){ coupon = null; m.className = 'cp-msg bad'; m.textContent = 'This coupon code is not valid.'; render(); return; }
    coupon = C.coupons[hit]; m.className = 'cp-msg ok'; m.textContent = 'Coupon applied.'; render();
  });

  function say(type, msg){ const s = $('#payStatus'); s.className = 'status show ' + type; s.textContent = msg; }
  function loadScript(src){ return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => rej(new Error('Could not load the payment script.')); document.head.appendChild(s); }); }
  function showPaid(){ $('#paid').classList.add('show'); document.querySelector('aside > .co-card[aria-labelledby]').hidden = true; window.scrollTo({top:0}); }

  /* ----- PAYMENT GATEWAY HOOK -----
     order = { course, title, total, currency, customer:{ first,last,email,phone,state } }
     Never trust the amount from the browser: verify it again on your server. */
  async function startPayment(order){
    const p = C.payment;
    if(!p.provider) throw new Error('NOT_CONFIGURED');
    if(p.provider === 'paymentLink'){
      if(!p.paymentLinkUrl) throw new Error('NOT_CONFIGURED');
      const q = new URLSearchParams({ name: order.customer.first + ' ' + order.customer.last, email: order.customer.email, phone: order.customer.phone, amount: order.total, course: order.title });
      location.href = p.paymentLinkUrl + (p.paymentLinkUrl.includes('?') ? '&' : '?') + q.toString();
      return;
    }
    if(p.provider === 'razorpay'){
      if(!p.razorpayKey || !p.orderEndpoint) throw new Error('NOT_CONFIGURED');
      const r = await fetch(p.orderEndpoint, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(order) });
      if(!r.ok) throw new Error('Could not create the order.');
      const o = await r.json();
      await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      const rz = new Razorpay({
        key: p.razorpayKey, amount: o.amount, currency: o.currency || 'INR', order_id: o.id,
        name: 'The Growth Loop', description: order.title,
        prefill: { name: order.customer.first + ' ' + order.customer.last, email: order.customer.email, contact: order.customer.phone },
        handler: function(resp){ /* send resp to your server to verify the signature, then: */ showPaid(); },
        modal: { ondismiss: function(){ document.getElementById('payBtn').disabled = false; } }
      });
      rz.open();
      return;
    }
    if(p.provider === 'custom'){
      if(typeof window.growthLoopPay !== 'function') throw new Error('NOT_CONFIGURED');
      await window.growthLoopPay(order, { onSuccess: showPaid });
      return;
    }
    throw new Error('NOT_CONFIGURED');
  }

  $('#coForm').addEventListener('submit', async e => {
    e.preventDefault();
    const f = e.target;
    if(!f.checkValidity()){ f.reportValidity(); return; }
    const d = Object.fromEntries(new FormData(f).entries());
    const order = Object.assign(calc(), { customer: { first: d.first.trim(), last: d.last.trim(), email: d.email.trim(), phone: d.phone.trim(), state: d.state } });
    const btn = $('#payBtn'); btn.disabled = true; $('#payStatus').className = 'status';
    try{ await startPayment(order); }
    catch(err){
      btn.disabled = false;
      if(err.message === 'NOT_CONFIGURED') say('info', 'No payment was taken. A payment gateway is not connected yet. The site owner needs to set it up in js/config.js.');
      else say('err', err.message || 'The payment could not be started. Please try again.');
      return;
    }
    if(C.payment.provider === 'razorpay') btn.disabled = false;
  });
})();
