export type Lang = "en" | "mr";

export type Dict = Record<string, string>;

export const en: Dict = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.admissions": "Admissions",
  "nav.staff": "Staff",
  "nav.programs": "Programs",
  "nav.calendar": "Calendar",
  "nav.news": "News",
  "nav.photos": "Photos",
  "nav.pay": "Pay / Donate",
  "nav.contact": "Contact",
  "cta.apply": "Apply for Admissions",
  "cta.sislms": "SISLMS",
  "cta.pay": "Pay / Donate",
  "cta.openForm": "Open admissions form",
  "cta.downloadFlyer": "Download flyer",
  "cta.menu": "Menu",
  "footer.explore": "Explore",
  "footer.connect": "Connect",
  "footer.legal": "Legal",
  "footer.admissionsForm": "Admissions form",
  "footer.privacy": "Privacy",
  "footer.terms": "Terms",
  "footer.disclaimer": "Disclaimer",
  "footer.copy": "© {year} Milwaukee Marathi Shala · A program of Milwaukee Marathi Mandal",
  "footer.credit": "Site by Saaniya Software LLC",
  "home.lead":
    "Second-year admissions are open for {year}. Join our Saturday Marathi community at {location}.",
  "home.upcoming": "Upcoming dates",
  "home.comingUp": "Coming up",
  "home.fullCalendar": "Full calendar →",
  "home.news": "News & updates",
  "home.viewNews": "All news →",
  "home.gallery": "From our community",
  "home.viewPhotos": "Photos →",
  "pay.title": "Pay fees or donate",
  "pay.lead":
    "Support Milwaukee Marathi Shala with annual tuition or a donation via Zelle.",
  "pay.fee": "Annual fee {fee} for {year}",
  "pay.scan": "Scan to pay with Zelle",
  "pay.payee": "Zelle payee",
  "pay.note":
    "Payments go to the school/organization payee shown. Saaniya Software LLC does not process fee payments on this site. Email {email} after paying so we can confirm your payment.",
  "staff.title": "Our staff",
  "staff.lead":
    "Teachers, volunteers, and school contacts who keep Milwaukee Marathi Shala running.",
  "staff.empty": "Staff profiles are being added. Check back soon.",
  "staff.proctors": "Certified Avant Assessment proctors are on staff.",
  "staff.contacts": "Phone contacts",
  "legal.privacy": "Privacy Policy",
  "legal.terms": "Terms of Use",
  "legal.disclaimer": "Disclaimer",
};

export const mr: Dict = {
  "nav.home": "मुख्य पृष्ठ",
  "nav.about": "आमच्याबद्दल",
  "nav.admissions": "प्रवेश",
  "nav.staff": "कर्मचारी",
  "nav.programs": "कार्यक्रम",
  "nav.calendar": "दिनदर्शिका",
  "nav.news": "बातम्या",
  "nav.photos": "छायाचित्रे",
  "nav.pay": "फी / देणगी",
  "nav.contact": "संपर्क",
  "cta.apply": "प्रवेशासाठी अर्ज करा",
  "cta.sislms": "SISLMS",
  "cta.pay": "फी / देणगी",
  "cta.openForm": "प्रवेश अर्ज उघडा",
  "cta.downloadFlyer": "फलक डाउनलोड करा",
  "cta.menu": "मेनू",
  "footer.explore": "शोधा",
  "footer.connect": "संपर्क",
  "footer.legal": "कायदेशीर",
  "footer.admissionsForm": "प्रवेश अर्ज",
  "footer.privacy": "गोपनीयता",
  "footer.terms": "अटी",
  "footer.disclaimer": "अस्वीकरण",
  "footer.copy": "© {year} मिल्वॉकी मराठी शाळा · महाराष्ट्र मंडळ मिल्वॉकीचा कार्यक्रम",
  "footer.credit": " संकेतस्थळ Saaniya Software LLC यांनी तयार केले",
  "home.lead":
    "{year} साठी दुसऱ्या वर्षाचे प्रवेश सुरू आहेत. {location} येथे शनिवारी मराठी समुदायात सामील व्हा.",
  "home.upcoming": "येणारी तारखा",
  "home.comingUp": "लवकरच",
  "home.fullCalendar": "पूर्ण दिनदर्शिका →",
  "home.news": "बातम्या आणि अद्यतने",
  "home.viewNews": "सर्व बातम्या →",
  "home.gallery": "आमच्या समुदायातून",
  "home.viewPhotos": "छायाचित्रे →",
  "pay.title": "फी भरा किंवा देणगी द्या",
  "pay.lead":
    "वार्षिक फी किंवा देणगी Zelle द्वारे मिल्वॉकी मराठी शाळेला पाठवा.",
  "pay.fee": "{year} साठी वार्षिक फी {fee}",
  "pay.scan": "Zelle साठी QR स्कॅन करा",
  "pay.payee": "Zelle प्राप्तकर्ता",
  "pay.note":
    "पेमेंट वर दाखवलेल्या शाळा/संस्था प्राप्तकर्त्याला जाते. Saaniya Software LLC या संकेतस्थळावर फी प्रक्रिया करत नाही. पेमेंटनंतर {email} वर ईमेल करा.",
  "staff.title": "आमचे कर्मचारी",
  "staff.lead":
    "मिल्वॉकी मराठी शाळेचे शिक्षक, स्वयंसेवक आणि संपर्क व्यक्ती.",
  "staff.empty": "कर्मचारी माहिती लवकरच जोडली जाईल.",
  "staff.proctors": "प्रमाणित Avant Assessment परीक्षक कर्मचारी आहेत.",
  "staff.contacts": "फोन संपर्क",
  "legal.privacy": "गोपनीयता धोरण",
  "legal.terms": "वापराच्या अटी",
  "legal.disclaimer": "अस्वीकरण",
};

export const dictionaries = { en, mr } as const;

export function interpolate(template: string, vars: Record<string, string | number>) {
  return Object.entries(vars).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template,
  );
}
