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
    facebook: "https://facebook.com/maengineering", // TODO: client Facebook page URL
    youtube: "https://youtube.com/@maengineering", // TODO: client YouTube channel URL
    linkedin: "https://linkedin.com/company/maengineering", // TODO: client LinkedIn page URL
    /** Facebook page id/username used to build the m.me Messenger deep link. */
    messenger: "maengineering", // TODO: client Facebook page id
  },

  /**
   * Manual payment methods for the order form (proposal 4.5 — no payment
   * gateway). Numbers below are placeholders; replace with the Client's
   * real merchant/personal accounts before launch.
   */
  paymentMethods: [
    {
      id: "bkash",
      name: "bKash",
      accountLabel: "Send Money to",
      accountValue: "017XXXXXXXX", // TODO: client bKash number
      instructions: "Send Money (not Payment) to this bKash number, then enter the Transaction ID below.",
    },
    {
      id: "nagad",
      name: "Nagad",
      accountLabel: "Send Money to",
      accountValue: "018XXXXXXXX", // TODO: client Nagad number
      instructions: "Send Money to this Nagad number, then enter the Transaction ID below.",
    },
    {
      id: "rocket",
      name: "Rocket",
      accountLabel: "Send Money to",
      accountValue: "019XXXXXXXX-X", // TODO: client Rocket number
      instructions: "Send Money to this Rocket number, then enter the Transaction ID below.",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      accountLabel: "Account Number",
      accountValue: "XXXX-XXXXXXX-XXX (Example Bank Ltd.)", // TODO: client bank account details
      instructions: "Transfer to this account, then enter the deposit slip/reference number below.",
    },
  ],

  nav: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  /**
   * Welcome audio — plays once, unmuted, as soon as a visitor enters the
   * site. Browsers block audible autoplay without a user gesture, so the
   * player falls back to firing on the visitor's first click/tap if the
   * immediate attempt is blocked (see useAudioPlayer).
   */
  backgroundAudio: {
    src: "/audio/welcome.mp3",
    defaultMuted: false,
  },
} as const;

export type SiteConfig = typeof siteConfig;
