/* ============ SITE CONFIGURATION: edit these values ============ */
const CONFIG = {
  /* ---- 1. WHATSAPP (required for the enquiry flow) ----
     Country code + number, digits only. Example for India: "919876543210" */
  whatsappNumber: "",
  /* Link to your brochure (Google Drive, PDF URL, etc). It appears as an extra "Open the brochure" button in the popup. Optional. */
  brochureUrl: "",
  /* Optional: also save every enquiry to your own backend, Google Apps Script, Formspree, etc.
     The form sends JSON by POST. Leave empty if you only want WhatsApp. */
  formEndpoint: "",

  /* ---- 2. OFFER BOX shown after the enquiry popup (optional) ----
     Leave offer as null to hide it. Only fill in real, current figures.
     Example: { fee: 14999, original: 24999, seats: "Next 15 seats", after: 16999, deadline: "2026-12-11T23:59:00+05:30" } */
  offer: null,

  /* ---- 3. STICKY BAR at the bottom of the page. Replace with your real cohort details. ---- */
  bar: [
    ["Courses", "UI/UX Design and AI + Digital Marketing"],
    ["Fees and schedule", "Shared on enquiry"],
    ["Format and duration", "Confirmed on enquiry"]
  ],

  /* ---- 4. TESTIMONIALS ----
     Add only real reviews that students have agreed to share. Entries marked sample:true are
     placeholders that show the layout and display a "sample" label. Delete them, add your own,
     and set sample:false. If this list is empty the section is hidden.
     Fields: name, text, rating (1-5, optional), video (direct video file URL, optional), poster (optional), role (optional) */
  testimonials: [
    { sample:true, name:"Student name", role:"UI/UX Design", rating:5, text:"Sample review. Replace this text with a real review from one of your students." },
    { sample:true, name:"Student name", role:"AI + Digital Marketing", rating:5, text:"Sample review. A longer example is shown here so you can see how a bigger review sits in the layout. Replace it with a real review from one of your students, with their permission." },
    { sample:true, name:"Student name", role:"UI/UX Design", rating:5, text:"Sample review. Replace this text with a real review." },
    { sample:true, name:"Student name", role:"AI + Digital Marketing", rating:5, text:"Sample review. Replace this text with a real review from one of your students." },
    { sample:true, name:"Student name", role:"UI/UX Design", rating:5, text:"Sample review. A longer example is shown here so you can see how a bigger review sits in the layout. Replace it with a real review." }
  ],

  /* ---- 5. CHECKOUT PAGE (checkout.html) ----
     demo:true shows a banner and marks the amounts below as placeholders. Set demo:false once real prices are in. */
  checkout: {
    demo: true,
    currency: "₹",
    signInUrl: "",           // Optional. Shows the "Already have an account?" box when set.
    courses: {
      uiux: { title: "UI/UX Design", by: "The Growth Loop", original: 9999, discount: 0, fees: 0, note: "Pay the full amount today." },
      aimk: { title: "AI + Digital Marketing", by: "The Growth Loop", original: 9999, discount: 0, fees: 0, note: "Pay the full amount today." }
    },
    /* Coupon codes. amount = flat discount. Example: { "WELCOME": { amount: 500 } }. Validate again on your server. */
    coupons: {},
    /* Payment gateway. provider: "" (not connected), "paymentLink", "razorpay" or "custom". See README.txt and js/checkout.js */
    payment: {
      provider: "",
      gatewayName: "",
      paymentLinkUrl: "",    // provider "paymentLink": hosted payment page URL (Razorpay Payment Link, Cashfree, Instamojo, Stripe link...)
      razorpayKey: "",       // provider "razorpay": public key id
      orderEndpoint: ""      // provider "razorpay": your server URL that creates an order and returns { id, amount, currency }
    }
  },

  videoUrl: "",              // Direct video file URL. Leave empty to show the static overview.
  videoPoster: "",
  privacyUrl: "",            // Privacy policy link
  termsUrl: "",              // Terms link
  contact: { email: "", phone: "", website: "" },
  social: [],                // e.g. [{label:"Instagram", url:"https://..."}]
  showDraftNotes: true,      // Shows "proposed content" markers. Set false before publishing.
  courses: {
    /* PROPOSED CURRICULUM: confirm with the owner before publishing. */
    uiux: {
      name: "UI/UX Design",
      title: 'Eight modules from <span class="serif">research to portfolio.</span>',
      intro: "Follow the design process in order: understand people, shape ideas, build screens in Figma, and test them. You finish with a project you can explain.",
      project: "Take a digital product from research to an interactive prototype.",
      modules: [
        ["Design foundations and design thinking","Learn how designers frame problems, the stages of a design process, and the core principles of layout, hierarchy, and usability."],
        ["User research and problem definition","Plan interviews and surveys, organise what you learn into insights and personas, and write a clear problem statement to design against."],
        ["Information architecture and user flows","Structure content so people can find it, map the steps a user takes toward a goal, and spot friction before you design screens."],
        ["Wireframing and interaction design","Sketch low-fidelity layouts, define how elements respond to input, and test ideas quickly before investing in visual polish."],
        ["Visual design and Figma","Work with colour, type, spacing, and imagery, and build your screens in Figma using grids, auto layout, and styles."],
        ["Components and design systems","Create reusable components and variants, document the rules behind them, and keep a growing set of screens consistent."],
        ["Prototyping and usability testing","Link screens into an interactive prototype, run usability sessions, and turn what you observe into prioritised improvements."],
        ["Case study and portfolio presentation","Shape your project into a clear story covering the problem, process, decisions, and outcome, and practise presenting it."]
      ]
    },
    aimk: {
      name: "AI + Digital Marketing",
      title: 'Eight modules from <span class="serif">audience to analytics.</span>',
      intro: "One integrated course that covers core digital marketing and the practical AI workflows that support it, ending in a full campaign project.",
      project: "Develop a brand campaign with content, a landing page plan, and a measurement framework.",
      modules: [
        ["Marketing foundations and audience research","Understand how marketing channels fit together, define who you want to reach, and research their needs and behaviour."],
        ["Brand positioning and messaging","Clarify what makes an offer distinct, write positioning and a core message, and adapt your tone for different audiences."],
        ["Content strategy and social media","Plan content themes and formats, build a calendar, and tailor posts to the platforms where your audience spends time."],
        ["SEO and search intent","Learn how people search, match content to intent, and apply keyword and on-page fundamentals to help pages get found."],
        ["Paid advertising fundamentals","Understand how ad platforms work, structure campaigns and audiences, and plan creative and budgets around clear objectives."],
        ["Landing pages, email, and conversion journeys","Design landing pages and email sequences that guide a visitor from first interest to a clear next step."],
        ["AI prompting and marketing workflows","Write effective prompts, use AI to research, draft, and repurpose content, and add review steps so quality and brand voice stay in your hands."],
        ["Analytics, experimentation, and campaign project","Choose metrics that match your goals, read basic reports, plan simple experiments, and bring everything together in a campaign project."]
      ]
    }
  },
  /* PROPOSED FEATURES: confirm with the owner before publishing. */
  features: [
    ["layers","Clear learning progression","Modules build on one another, so each new skill rests on something you have already practised."],
    ["edit","Practical exercises","Short, hands-on tasks follow each concept so you apply an idea while it is fresh."],
    ["folder","Project-based application","Your learning comes together in a project that carries through the whole course."],
    ["code","Relevant tools and workflows","Work with tools and processes used in design and marketing practice, including Figma and AI-assisted workflows."],
    ["bulb","Creative and analytical thinking","Practise generating ideas, then test them against research, evidence, and feedback."],
    ["target","Work you can explain and showcase","Finish with project work you can talk through clearly in a portfolio, an interview, or a client conversation."]
  ],
  audience: [
    ["compass","Students exploring career paths","Try user research and interface design on a real project brief.","Explore audiences, content, and campaigns while you work out what interests you."],
    ["book","Freshers building practical skills","Practise Figma and build a case study you can walk through.","Build a campaign plan and practise AI-assisted content workflows."],
    ["briefcase","Working professionals expanding their capabilities","Apply design thinking and user understanding to the products you work on.","Add search, content, and analytics skills alongside your current role."],
    ["refresh","Career changers exploring a new field","Learn the design process step by step, from foundations to portfolio.","See how marketing works end to end, then practise on a campaign project."],
    ["pen","Freelancers developing their services","Offer clients clearer design thinking, from research to prototype.","Plan content and campaigns for clients with a structured approach."],
    ["rocket","Entrepreneurs learning design and marketing","Shape how your product looks, flows, and feels to users.","Plan how to reach your audience and how to measure what is working."]
  ],
  faqs: [
    ["Which course should I choose?","Choose UI/UX Design if you are drawn to users, interfaces, and research. Choose AI + Digital Marketing if you prefer audiences, content, campaigns, and analytics. If you are unsure, tell us about your goals in the enquiry form and we will help you decide."],
    ["Do I need prior experience?","Entry requirements are confirmed course by course. Share your background and goals in an enquiry and we will suggest the right place to start."],
    ["What tools will I use?","UI/UX Design work centres on Figma. AI + Digital Marketing combines marketing and analytics tools with AI assistants for research and drafting. The full tool list is confirmed when you enquire."],
    ["What projects will I work on?","Each course is built around a project. In UI/UX Design you take a digital product from research to an interactive prototype. In AI + Digital Marketing you develop a brand campaign with content, a landing page plan, and a measurement framework."],
    ["How can I enquire about fees and schedules?","Fees, schedules, delivery format, recordings, certificates, and support details are confirmed directly. <a href=\"#enquire\" data-enquire=\"\">Send an enquiry</a> and we will share the current information."],
    ["Can working professionals join?","Working professionals are welcome to enquire. Tell us about your availability in the form and we will share what is available."]
  ]
};
