/**
 * Central site configuration — company info, nav links, contact channels.
 * Placeholder values below must be replaced with the Client's real details
 * (see proposal section 9 "Client Responsibilities").
 */

export const siteConfig = {
  name: "Machinery Company",
  shortName: "Machinery Co.",
  description:
    "Heavy-duty machinery for industrial and agricultural use — browse our categories and get a quote today.",
  url: "https://www.example.com", // TODO: replace with the live domain
  locale: "en",

  contact: {
    phone: "+8801XXXXXXXXX", // TODO: client phone
    whatsapp: "+8801XXXXXXXXX", // TODO: client WhatsApp (E.164, no spaces)
    email: "info@example.com", // TODO: client inquiry inbox
    address: "Sylhet, Bangladesh", // TODO: client address
  },

  social: {
    facebook: "",
    youtube: "",
    linkedin: "",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  /** Background audio, muted-by-default per browser autoplay policy. */
  backgroundAudio: {
    src: "/audio/background.mp3",
    defaultMuted: true,
  },
} as const;

export type SiteConfig = typeof siteConfig;
