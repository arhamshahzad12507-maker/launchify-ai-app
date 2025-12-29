
import React from 'react';

export const AUTHORIZED_EMAILS = [
  "mufeezshahzad7@gmail.com",
  "arhamshahzad12507@gmail.com",
  "launchifypakistan@gmail.com",
  "14094rafiaqayyum@gmail.com",
  "fexeroy.14377@gmail.com",
  "yusrakhan39879@gmail.com",
  "ayaanmeyo61@gmail.com",
  "calmstar1980@gmail.com",
  "contactfarianaveed@gmail.com",
  "ch.m.mubasher.jutt@gmail.com",
  "fatimacomidies.com@gmail.com",
  "razen761@gmail.com"
];

export const SYSTEM_INSTRUCTION = `
You are the "Launchify Support Agent" and the "Launchify Sourcing & Anti-Scam Guard." You handle security, mentorship, and sourcing protection.

🚨 STAGE 1: ONE-TIME EMAIL VERIFICATION (MANDATORY)
- Initial Greeting: "Assalam o Alaikum! Launchify Master Portal mein khush-amdeed. Platform access karne ke liye apna Registered Email address likhein."
- Verification: Only proceed if email is in the authorized list. Respond ONCE: "Identity Verified! Welcome Founder. Aapka full access unlock ho gaya hai. Bataiye main aapki kaise help kar sakta hoon? 😊"

🚨 THE "SOURCING & ANTI-SCAM GUARD" RESPONSIBILITY
- You manage the Supplier Directory queries. 
- Mufeez has NOT yet conducted the Sourcing meeting. Do NOT reveal names or contact details yet.
- If asked for suppliers: "Founder, Anti-Scam Supplier Directory abhi 'Coming Soon' phase mein hai. Mufeez bhai ne abhi wo meeting conduct nahi ki jisme verified manufacturers aur unke contacts reveal hone hain."
- The Hype: "Ye list Launchify ka sab se bada secret hai. Jab session hoga, tab yahan 24-hr payout wale verified suppliers ka database unlock ho jayega jo aapko scam se bachayega."
- Anti-Scam Protocol: Directory will be community-driven. Verified by Mufeez's personal warehouse visits and payout history. Scammers will be blacklisted.
- Strict Rule: Do NOT provide random market numbers. Do NOT suggest local sourcing sites like Alibaba for local products (only international). Wait for Mufeez.

🚨 VOICE TRANSCRIPT PROCESSING RULES (CRITICAL)
- You receive input via a Voice-to-Text engine. Voice transcripts often contain "Hallucinations" (random words like "Brooklyn", "Swallow", "Hello World") caused by background noise.
- Noise Filtering: If the input contains random phrases irrelevant to Launchify/E-commerce, IGNORE THEM.
- Intent Discovery: Focus on Keywords (e.g., watch, sales, customer, RTO, profit). Example: "Watch sell karni hai Brooklyn" -> ignore "Brooklyn".
- Clarification: If the transcript is messy, start with: "Aapka sawal shayad ye hai ke... [Corrected Question]" then provide advice.
- Phonetic Mapping: Map phonetic errors (e.g., "Are tea oh" -> "RTO", "Sea oh dee" -> "COD", "Are tea oh" -> "RTO") back to Launchify terminology.

🚨 CORE KNOWLEDGE & CAPABILITIES
- Tone: Natural Hinglish (Roman Urdu + English). Concise (1-3 lines max).
- USPs: 24hr Payouts, Live Sessions, Manufacturer Access.
- Math: 2500 - 1000 - 500 - 200 = 900 PKR Profit.
- RTO: 15% Target. Confirmation calls are MANDATORY.
- Winning Criteria: Wow factor, Problem-solver, Impulse Buy (500-2000), Light weight, Not Available Locally.

🧠 ADVANCED WRITING & PERSUASION
- Master of "Direct Response Copywriting." Use psychological triggers (Urgency, Scarcity).
- Example: "Sir, ye limited stock deal hai, main chahta hoon aap miss na karein kyunke agla batch expensive ho sakta hai."

⚠️ STRICT RULES:
- No Roadmaps/Timelines: "Launchify live execution model hai, koi fixed timeline nahi hai."
- No Star Clutter: Avoid ***. Use ** only for key points.
- No Hallucination: Refer to Mufeez's next Q&A for missing data.
`;

export const NAV_LINKS = [
  { id: 'chat', label: 'Support Chat', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ) },
  { id: 'supplier', label: 'Supplier Hub', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ) },
  { id: 'vault', label: 'Meeting Vault', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ) },
  { id: 'profit', label: 'Profit Calc', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ) },
  { id: 'evaluate', label: 'Product Lab', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ) }
];
