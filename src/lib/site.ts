export const site = {
  name: "Milwaukee Marathi Shala",
  nameMr: "मिलवॉकी मराठी शाळा",
  motto: "आपली माणसं, आपली भाषा",
  email: "mmm.marathishala@gmail.com",
  domain: "milwaukeeshala.org",
  portalUrl: "https://sislms.guruvidyazen.nasneeraj.com/auth",
  portalLabel: "SISLMS",
  admissionsFormUrl:
    "https://docs.google.com/forms/d/19Tjlej2LXYiH7Kuwv9YBcL23wvzu3LWRcDzTRh0_ggE/viewform",
  admissionsMailto: "mailto:mmm.marathishala@gmail.com?subject=Milwaukee%20Marathi%20Shala%20Admissions%202026-27",
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
  location: "Hindu Temple of Wisconsin (HTW)",
  schedule: "Saturdays, 1:00–3:00 PM",
  yearLabel: "2026–27",
  fee: "$150",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/admissions", label: "Admissions" },
  { href: "/programs", label: "Programs" },
  { href: "/calendar", label: "Calendar" },
  { href: "/news", label: "News" },
  { href: "/photos", label: "Photos" },
  { href: "/contact", label: "Contact" },
] as const;
