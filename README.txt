THEGROWTHLOOP - AI MASTERCLASS (single page)
=============================================
Upload everything in this folder to your hosting root (index.html must be at the top).
No build step needed.

FILL THESE PLACEHOLDERS (highlighted yellow on the page) in js/config.js -> values:
  studentsTrained (confirm "nearly 3,000"), batchStart, classTime,
  seatsLeft, demoDate, refundPolicy

WHATSAPP: number and every prefilled message are in js/config.js (messages).
A website cannot send a WhatsApp message by itself; the visitor presses Send.

TESTIMONIALS: the section is hidden. Add real, permitted feedback to testimonials[] in js/config.js:
  { name: "Student name", role: "Student", text: "Their words" }  -> the section appears automatically.

SYLLABUS & TEXT: the day-by-day syllabus is a DRAFT built from your weekly scope. Edit the
text directly in index.html (search "Day 1") if any topic needs changing.

SEO: update the og:image URL if you host assets elsewhere. Files: assets/og-image.png.

--- UPDATE: PAYMENT PAGE, COHORTS, SEO ---
* "Join Cohort" in the Pricing section opens checkout.html (details form + QR + payment popup + WhatsApp receipt).
  Other "Join Cohort" buttons (header, hero, final CTA) still open WhatsApp.
* The payment QR is assets/upi-qr.png (replace the file to change it). Optionally set payment.upiId in js/config.js to show your UPI ID under it.
* IMPORTANT: a static page cannot verify a payment. The popup says "Payment submitted" and the receipt status is
  "awaiting confirmation". Check each UPI transaction ID in your bank/UPI app before confirming a seat.
  For automatic verification, connect a payment gateway (e.g. Razorpay) later.
* SEO: robots.txt and sitemap.xml are included (checkout page is noindex). After upload, submit
  https://thegrowthloop.live/sitemap.xml in Google Search Console. Make sure og-image.png is reachable at /assets/og-image.png.

--- UPDATE (Nov 11): OFFER SYSTEM, POPUP, ANALYTICS, LEGAL PAGES ---
* Price: Cohort 1 Special Rs 1,499 with Regular price Rs 2,499 struck through (top bar, offer strip, pricing offer card,
  popup, mobile sticky bar, final banner, payment page). To change prices, search "1,499" / "2,499" in index.html and
  payment.amount / payment.regular in js/config.js.
* Real urgency only: fill values.seatsLeft, values.deadlineText and (optional) countdownTo in js/config.js.
  The countdown stays hidden unless countdownTo is a real future date.
* Popup: shows ~3 seconds after load, once per visit, stays closed for 24 hours after closing (localStorage).
  Closes with X, Esc or a tap outside. Small bottom sheet on mobile, never full screen.
* Analytics: add analytics.ga4Id and analytics.metaPixelId in js/config.js. Nothing loads until you do.
  Every WhatsApp/CTA click is sent as an event (cta_whatsapp_join, cta_whatsapp_demo, cta_checkout, payment_submitted).
* privacy.html and terms.html are DRAFT templates. Fill the yellow placeholders (refund policy, email, dates)
  and have them reviewed before launch.
* Seats are shown as 15-30 (from your latest brief).

=== LATEST (11 Nov, evening): REBUILT TO THE NEW BRIEF ===
FILL IN (yellow highlights on the page) in js/config.js -> values:
  classStart ([CLASS START DATE]), trainerName ([YOUR NAME]), trainerBio, refundPolicy; trainerPhoto path.
FEE: shown as Rs 1,499 with Regular Rs 2,499 struck (payment.amount / payment.regular in js/config.js). Your brief said [FEE];
  change or clear the regular price there if the fee is different.
REGISTRATION WINDOW: registration.opens / closes in js/config.js. After 30 Nov 2026 11:59 PM IST the badge, countdown and buttons
  switch to "Registrations closed - join the waitlist on WhatsApp", and the payment page is locked.
FREE DEMO CLASS: 20 Nov 2026, 8-10 PM IST (hero strip + popup). Change messages.demo and values.demoDate if it moves.
PAYMENT QR: assets/upi-qr.png. The receipt (screen, print and Save as PDF) now carries the TheGrowthLoop logo.
Removed from the old site: announcement bar, offer strip, problem/promise section, Cohort 2/3 price cards.
Testimonials stay hidden until you add real ones.

UPDATE 11 Nov 2026
- About card now says "Our trainer"; the Meet your trainer section is removed.
- New launch offer banner (code NEWLEARNER, copy button). Registration popup opens on every visit (3 seconds after load).
- Payment page: NEWLEARNER applied by default (list Rs 2,499 minus Rs 1,000 = Rs 1,499). Learner can remove it or try another code. Edit codes in js/config.js (payment.coupons).
- All form fields validated (js/validate.js): name, Indian WhatsApp number, optional email, 12-digit UTR, promo code, and a "I have paid" tick box.
- New receipt (js/receipt.js): drawn as an image with the logo. Share on WhatsApp sends the receipt image with the message on phones (share sheet); on computers the image is saved and WhatsApp opens with the message, so attach the saved image. Also Download PDF / Save as image.
- Privacy and Terms: last updated 11 November 2026, email thegrowthloop.in@gmail.com, retention section removed, 80% attendance, draft refund policy (please confirm it).
