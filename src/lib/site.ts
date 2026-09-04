import siteSettings from "../../data/site-settings.json";

const base = {
  name: "Milwaukee Marathi Shala",
  nameMr: "मिल्वॉकी मराठी शाळा",
  motto: "आपली माणसं, आपली भाषा",
  email: "mmm.marathishala@gmail.com",
  domain: "milwaukeeshala.org",
  portalUrl: "https://sislms.guruvidyazen.nasneeraj.com/auth",
  portalLabel: "SISLMS",
  admissionsMailto:
    "mailto:mmm.marathishala@gmail.com?subject=Milwaukee%20Marathi%20Shala%20Admissions%202026-27",
  payPath: "/pay",
  zellePayee: "Lalan Kanade",
  zelleEmail: "maharashtramandal.milwaukee@gmail.com",
  zelleQrSrc: "/media/zelle-pay-qr.png",
  parents: [
    { label: "Milwaukee Marathi Mandal (MMM)", href: "https://www.mmmilwaukee.org/" },
    {
      label: "Bharatiya Marathi Mandal (BMM) Marathi Shala",
      href: "https://bmmonline.org/marathishala/",
    },
  ],
  avantUrl: "https://www.avantassessment.com/bmm",
  bmmShalaUrl: "https://bmmonline.org/marathishala/",
  kalnirnayUrl: "https://kalnirnay.org/",
  biliteracyPath: "/biliteracy",
  saaniya: "Saaniya Software LLC",
} as const;

type Settings = typeof siteSettings;

export const site = {
  ...base,
  fee: siteSettings.fee,
  yearLabel: siteSettings.yearLabel,
  schedule: siteSettings.schedule,
  location: siteSettings.location,
  admissionsFormUrl: siteSettings.admissionsFormUrl,
  newsletterUrl: siteSettings.newsletterUrl || base.email,
  facebookUrl: siteSettings.facebookUrl || "",
  whatsappUrl: siteSettings.whatsappUrl || "",
  whatsappQrSrc:
    ("whatsappQrSrc" in siteSettings && siteSettings.whatsappQrSrc) ||
    "/media/whatsapp-group-qr.png",
};

export type SiteSettings = Settings;

export type NavLink = {
  href: string;
  labelKey: string;
  external?: boolean;
};

export type NavSection = {
  id: string;
  labelKey: string;
  links: NavLink[];
};

/** Grouped primary navigation (side toolbar sections). */
export const navSections: NavSection[] = [
  {
    id: "school",
    labelKey: "nav.section.school",
    links: [
      { href: "/", labelKey: "nav.home" },
      { href: "/staff", labelKey: "nav.staff" },
    ],
  },
  {
    id: "join",
    labelKey: "nav.section.join",
    links: [
      { href: "/admissions", labelKey: "nav.admissions" },
      { href: "/programs", labelKey: "nav.programs" },
      { href: "/biliteracy", labelKey: "nav.biliteracy" },
      { href: "/pay", labelKey: "nav.pay" },
      { href: "/volunteer", labelKey: "nav.volunteer" },
    ],
  },
  {
    id: "families",
    labelKey: "nav.section.families",
    links: [
      { href: "/faq", labelKey: "nav.faq" },
      { href: "/resources", labelKey: "nav.resources" },
      { href: "/calendar", labelKey: "nav.calendar" },
      { href: "/news", labelKey: "nav.news" },
      { href: "/photos", labelKey: "nav.photos" },
      { href: "/about", labelKey: "nav.about" },
      { href: "/contact", labelKey: "nav.contact" },
    ],
  },
];

/** Flat list for footer and legacy callers. */
export const navLinks = navSections.flatMap((section) => section.links);
