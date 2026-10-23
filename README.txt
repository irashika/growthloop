THE GROWTH LOOP - WEBSITE PACKAGE (HTML + CSS + JS, no build step)

FILES
  index.html        Main landing page (all sections, enquiry popup, testimonials)
  checkout.html     Checkout page (open as checkout.html?course=uiux or ?course=aimk)
  css/styles.css    All styling
  js/config.js      ALL the settings you need to edit (start here)
  js/main.js        Landing page behaviour (popup, WhatsApp, tabs, FAQs)
  js/checkout.js    Checkout behaviour and payment gateway hook

HOW TO USE
  Unzip and open index.html in a browser, or upload the whole folder to any web host
  (Netlify, Vercel, GitHub Pages, cPanel, etc). Keep the folder structure as it is.

STEP 1 - CONNECT YOUR WHATSAPP  (js/config.js)
  whatsappNumber: "919876543210"   <- country code + number, digits only
  Until this is set, the WhatsApp buttons show a "not connected" notice.

  What happens:
   - "Enquire Now" (header, sticky bar, course buttons) opens a 2-step popup:
     name, email, WhatsApp number, then role, experience, course and best time.
   - After step 2, "Get the Brochure on WhatsApp" opens WhatsApp with a message
     containing the visitor's details. They press send to reach you.
   - The enquiry form near the bottom of the page and the floating green WhatsApp
     button work the same way.
  To send the brochure automatically after they message you, use WhatsApp Business
  auto-reply (greeting or away message) with your brochure link. WhatsApp does not allow
  a website to send files on a visitor's behalf.

STEP 2 - OPTIONAL: SAVE EVERY ENQUIRY
  formEndpoint: "https://..."   <- Google Apps Script, Formspree, your own API.
  The site POSTs JSON (name, email, phone, course, role, experience, time, source).
  The popup says "Your details are submitted" only when this endpoint replies OK.

STEP 3 - OFFER BOX AND STICKY BAR  (optional)
  offer: null hides the fee/countdown box. Fill it only with real, current figures:
    offer: { fee: 14999, original: 24999, seats: "Next 15 seats", after: 16999,
             deadline: "2026-12-11T23:59:00+05:30" }
  bar: the dark bar at the bottom. Replace the three items with your real cohort
  date, duration and weekly time commitment.

STEP 4 - TESTIMONIALS
  Replace the sample entries in "testimonials" with real reviews from students who agreed to
  share them. Set sample:false (or remove the field). Add video:"https://.../clip.mp4"
  for a video card. An empty list hides the section. Please do not publish invented
  reviews, ratings or results.

STEP 5 - CHECKOUT  (js/config.js > checkout)
  1. Set real prices per course (original, discount, fees) and demo:false.
  2. Add coupons if you want them:  coupons: { "WELCOME": { amount: 500 } }
  3. Connect a payment gateway in payment.provider:
       "paymentLink"  Easiest. Paste a hosted payment page URL (Razorpay Payment Link,
                      Cashfree, Instamojo, Stripe Payment Link). Customers are redirected.
       "razorpay"     Needs razorpayKey and an orderEndpoint on YOUR server that
                      creates an order and returns { id, amount, currency }.
       "custom"       Define window.growthLoopPay(order, { onSuccess }) yourself.
  Prices in the browser can be changed by visitors. Always check the amount and
  verify the payment signature on your server before confirming an enrolment.
  Until a gateway is connected, "Proceed to payment" shows a notice and takes no payment.

OTHER SETTINGS (js/config.js)
  contact, social, privacyUrl, termsUrl   Footer and consent links (hidden when blank)
  videoUrl                                Adds a play button to the "See how learning comes to life" panel
  showDraftNotes: false                   Removes the "proposed content" markers once you approve the curriculum and features
  courses, features, audience, faqs       All page copy is editable here
