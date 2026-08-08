export const site = {
  name: "Milwaukee Marathi Shala",
  nameMr: "मिल्वॉकी मराठी शाळा",
  motto: "आपली माणसं, आपली भाषा",
  email: "mmm.marathishala@gmail.com",
  domain: "milwaukeeshala.org",
  portalUrl: "https://sislms.guruvidyazen.nasneeraj.com/auth",
  portalLabel: "SISLMS",
  admissionsFormUrl:
    "https://docs.google.com/forms/d/19Tjlej2LXYiH7Kuwv9YBcL23wvzu3LWRcDzTRh0_ggE/viewform",
  admissionsMailto:
    "mailto:mmm.marathishala@gmail.com?subject=Milwaukee%20Marathi%20Shala%20Admissions%202026-27",
  payPath: "/pay",
  zellePayee: "Lalan Kanade",
  zelleEmail: "maharashtramandal.milwaukee@gmail.com",
  zelleQrSrc: "/media/zelle-pay-qr.png",
  parents: [
    {
      label: "Milwaukee Marathi Mandal (MMM)",
      href: "https://www.mmmilwaukee.org/",
    },
    {
      label: "Bharatiya Marathi Mandal (BMM) Marathi Shala",
      href: "https://bmmonline.org/marathishala/",
    },
  ],
  avantUrl: "https://www.avantassessment.com/bmm",
  bmmShalaUrl: "https://bmmonline.org/marathishala/",
  kalnirnayUrl: "https://kalnirnay.org/",
  biliteracyPath: "/biliteracy",
  location: "Hindu Temple of Wisconsin (HTW)",
  schedule: "Saturdays, 1:00–3:00 PM",
  yearLabel: "2026–27",
  fee: "$150",
  saaniya: "Saaniya Software LLC",
} as const;

export const navLinks = [
  { href: "/", labelKey: "nav.home" as const },
  { href: "/about", labelKey: "nav.about" as const },
  { href: "/admissions", labelKey: "nav.admissions" as const },
  { href: "/staff", labelKey: "nav.staff" as const },
  { href: "/programs", labelKey: "nav.programs" as const },
  { href: "/biliteracy", labelKey: "nav.biliteracy" as const },
  { href: "/calendar", labelKey: "nav.calendar" as const },
  { href: "/news", labelKey: "nav.news" as const },
  { href: "/photos", labelKey: "nav.photos" as const },
  { href: "/pay", labelKey: "nav.pay" as const },
  { href: "/contact", labelKey: "nav.contact" as const },
] as const;
