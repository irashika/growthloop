/* ============ SITE CONFIGURATION: edit these values, then re-upload ============
   Anything still in [SQUARE BRACKETS] is a placeholder and is shown highlighted on the page
   so you can spot it. Replace it with your real detail. */
const CONFIG = {
  whatsappNumber: "919791996349",

  /* Prefilled WhatsApp messages. Every button on the page uses one of these. */
  messages: {
    register:      "Hi TheGrowthLoop, I'd like to register for the AI Masterclass (next cohort).",
    demo:          "Hi TheGrowthLoop, I'd like to attend the free demo class on 20 November 2026 (8:00–10:00 PM IST).",
    waitlist:      "Hi TheGrowthLoop, registrations for the AI Masterclass are closed. Please add me to the waitlist for the next cohort.",
    waitlistUiux:  "Hi TheGrowthLoop, please add me to the waitlist for the AI + UI/UX Design course.",
    waitlistDm:    "Hi TheGrowthLoop, please add me to the waitlist for the AI + Digital Marketing course.",
    general:       "Hi TheGrowthLoop, I have a question about the AI Masterclass."
  },

  social: {
    instagram: "https://www.instagram.com/thegrowthloop.live/",
    facebook:  "https://www.facebook.com/profile.php?id=61584233935803"
  },

  /* REGISTRATION WINDOW (India time). After "closes", the badge, countdown and buttons
     switch to "Registrations closed - join the waitlist on WhatsApp" automatically. */
  registration: {
    opens:  "2026-11-11T00:00:00+05:30",
    closes: "2026-11-30T23:59:59+05:30"
  },

  /* Values filled into the page wherever you see data-cfg="...". Square brackets = still to fill. */
  values: {
    classStart:   "1 December 2026",
    demoDate:     "20 November 2026, 8:00–10:00 PM IST"
  },

  /* Contact email shown on the site and legal pages */
  email: "thegrowthloop.in@gmail.com",

  /* TESTIMONIALS: the section stays hidden while this list is empty.
     Add only real feedback you have permission to publish:
     { name: "Student name", role: "Student", text: "Their real words here." } */
  testimonials: [],

  /* PAYMENT PAGE (checkout.html). The QR image is assets/upi-qr.png (replace the file to change it).
     regular = list price. coupons = promo codes and the rupees each takes off.
     defaultCode is applied automatically at checkout (the learner can remove it).
     amount = price after the default code (list price minus NEWLEARNER), shown on the site. */
  payment: {
    amount: 1499,
    currency: "₹",
    regular: 2499,
    coupons: { NEWLEARNER: 1000 },
    defaultCode: "NEWLEARNER",
    productName: "AI Masterclass (next cohort)",
    payeeName: "TheGrowthLoop",
    upiId: "",                  // optional: show your UPI ID under the QR, e.g. "name@bank"
    qrImage: "assets/upi-qr.png",
    isSampleQR: false
  },

  /* ANALYTICS: paste your IDs to switch tracking on. Empty = nothing is loaded. */
  analytics: {
    ga4Id: "",        // e.g. "G-XXXXXXXXXX"
    metaPixelId: ""   // e.g. "1234567890"
  },

  privacyUrl: "",
  termsUrl: ""
};
