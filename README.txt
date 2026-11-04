THEGROWTHLOOP WEBSITE (plain HTML + CSS + JS, no build step)

FILES
  index.html          Main website (all content is in the HTML, so Google can read it)
  css/styles.css      All styling and animations
  js/config.js        Settings you may edit (start here)
  js/main.js          Behaviour: animations, enquiry popup, WhatsApp
  assets/             Your logos, student photos, favicon and the social sharing image

PUBLISH
  Upload the whole folder to your hosting (Netlify, Vercel, GitHub Pages, cPanel) keeping the
  folder structure. index.html must sit at the root of thegrowthloop.live.

WHATSAPP  (+91 97919 96349, already set in js/config.js)
  - "Join Cohort" buttons, the welcome popup and the Contact form collect name, email, WhatsApp
    number, role, experience and best call time, then open WhatsApp to your number with all of it
    typed into the message. The student presses Send in WhatsApp. A website cannot send a
    WhatsApp message on someone's behalf, so that last tap is theirs.
  - The green WhatsApp icon (bottom right on every screen) opens a chat with your number.
  - To send the brochure automatically, set up a WhatsApp Business greeting or quick reply that
    includes your brochure link. You can also paste the brochure link into brochureUrl in
    js/config.js to show an "Open the brochure" button in the popup.
  - To also save every enquiry in a sheet or CRM, set formEndpoint in js/config.js.

THINGS TO CHECK BEFORE YOU ADVERTISE
  1. Duration: the content says 100 Days everywhere (your earlier note mentioned 60 days). Confirm it.
  2. Certificate and placement FAQs (6 and 8) say details are shared on enquiry. Edit the wording in
     index.html when the next cohort's policies are final (also in the FAQ JSON-LD at the top of the file).
  3. Testimonials: the 7 testimonials you supplied are in js/config.js, photos in assets/students/.
     Replace "Student 01" and so on with real names and make sure each student agreed to be shown.
     Student 04 was not in the screenshots, so it is not included. Add it as another entry.
  4. Privacy policy and terms: add the links in privacyUrl and termsUrl (js/config.js). You collect
     phone numbers, so a privacy page is strongly recommended.
  5. The "Rs 60K per month" story is not on the site. Add it only as a verified student testimonial.
  6. "by Stellarminds": set endorsedBy in js/config.js if you want it in the footer.

WELCOME POPUP
  The enquiry popup opens about one second after a visitor arrives. When they close it, it stays
  closed for the rest of that visit (it can appear again on their next visit). It is also opened by every
  "Join Cohort" button. To turn off the automatic opening, delete the block at the end of js/main.js
  that starts with "The enquiry popup opens once".

GET BROCHURE BUTTONS
  The two "Get Brochure" buttons on the program cards open WhatsApp to your number with the message
  "Hi TheGrowthLoop, I'd like to get the brochure for the <program> program (next cohort)."

EDITING TEXT
  All page text is plain HTML in index.html. Search for the sentence and change it.
