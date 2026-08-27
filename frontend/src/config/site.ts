/**
 * Central site configuration — company info, nav links, contact channels.
 * Placeholder values below must be replaced with the Client's real details
 * (see proposal section 9 "Client Responsibilities").
 */

export const siteConfig = {
  name: "MA Engineering",
  shortName: "MAE",
  tagline: "MA Engineering",
  description:
    "Restaurant, commercial kitchen, bakery, medical, and food shop equipment — browse our categories and get a quote today.",
  url: "https://www.example.com", // TODO: replace with the live domain
  locale: "en",

  contact: {
    phone: "+8801XXXXXXXXX", // TODO: client phone
    whatsapp: "+8801XXXXXXXXX", // TODO: client WhatsApp (E.164, no spaces)
    email: "info@example.com", // TODO: client inquiry inbox
    address: "167, M A Engineering Factory, 21 Matikata Rd, Dhaka 1206",
    mapUrl: "https://maps.app.goo.gl/oRsHQjYAMjP7Pc21A",
    mapEmbedUrl: "https://www.google.com/maps?cid=12514140176141258819&output=embed",
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
