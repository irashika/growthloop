/* ============================================================
   THEGROWTHLOOP SITE SETTINGS. Edit values here, nothing else needed.
   ============================================================ */
const CONFIG = {
  /* WhatsApp: country code + number, digits only. Enquiries and the green WhatsApp icon go here. */
  whatsappNumber: "919791996349",

  /* Optional: link to your brochure (Google Drive, PDF). Adds an "Open the brochure" button in the popup. */
  brochureUrl: "",

  /* Optional: also save every enquiry in your own system (Google Apps Script, Formspree, CRM).
     The site sends JSON by POST. Leave empty to use WhatsApp only. */
  formEndpoint: "",

  /* Social links */
  social: {
    instagram: "https://www.instagram.com/thegrowthloop.live/",
    facebook: "https://www.facebook.com/profile.php?id=61584233935803",
    website: "https://thegrowthloop.live/"
  },

  /* Optional footer line, for example "A TheGrowthLoop program by Stellarminds". Leave empty to hide. */
  endorsedBy: "",

  /* Footer links. Leave empty to hide until your policy pages are ready. */
  privacyUrl: "",
  termsUrl: "",

  /* Student testimonials (shown in the Testimonials section).
     Replace the names and photos with your real students. Photos go in assets/students/.
     Only publish reviews that students agreed to share, with their permission to show their photo.
     program: "uiux" or "aimk". */
  testimonials: [
    { name: "Student 01", role: "UI/UX Design", program: "uiux", photo: "assets/students/s01.png", text: "I always thought designing was just about making things look attractive. But I learned how to understand users, create wireframes and design meaningful interfaces. The practical approach made learning much easier." },
    { name: "Student 02", role: "AI Tools", program: "uiux", photo: "assets/students/s02.png", text: "Learning AI tools alongside UI/UX was something I really enjoyed. It helped me explore new ideas, improve my workflow and understand how AI can support the design process." },
    { name: "Student 03", role: "Practical Learning", program: "uiux", photo: "assets/students/s03.png", text: "The best part was learning by doing. Instead of just understanding design concepts, I got to work on practical activities and explore how real-world applications are designed." },
    { name: "Student 05", role: "Digital Marketing", program: "aimk", photo: "assets/students/s05.png", text: "I used to think digital marketing was only about posting on social media. Now I understand content strategy, audience targeting, branding and how businesses grow online." },
    { name: "Student 06", role: "AI in Marketing", program: "aimk", photo: "assets/students/s06.png", text: "Exploring AI tools for content creation and marketing made the learning experience interesting. I discovered how technology can make marketing tasks faster and more creative." },
    { name: "Student 07", role: "Social Media Marketing", program: "aimk", photo: "assets/students/s07.png", text: "I learned how to plan social media content, understand audiences and create marketing campaigns. The practical sessions helped me connect theory with real-world applications." },
    { name: "Student 08", role: "Career Development", program: "aimk", photo: "assets/students/s08.png", text: "The training helped me understand the digital marketing industry better. I now have a clearer idea of how brands build their online presence and how AI supports marketing." }
  ]
};
