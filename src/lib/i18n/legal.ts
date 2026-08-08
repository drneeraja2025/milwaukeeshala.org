import type { Lang } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/site";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "links"; text: string };

function privacy(lang: Lang): LegalBlock[] {
  if (lang === "mr") {
    return [
      {
        type: "h2",
        text: "आम्ही कोण आहोत",
      },
      {
        type: "p",
        text: `हे संकेतस्थळ (milwaukeeshala.org) मिल्वॉकी मराठी शाळेबद्दल सार्वजनिक माहिती देते — महाराष्ट्र मंडळ मिल्वॉकीशी संबंधित सामुदायिक मराठी भाषा शाळा. शाळेची सामग्री आणि कार्यक्रमाचे निर्णय शाळा / मंडळ समुदायाची जबाबदारी आहेत.`,
      },
      {
        type: "p",
        text: `संकेतस्थळ तंत्रज्ञान आणि होस्टिंग समर्थन ${site.saaniya} देऊ शकते. ${site.saaniya} ही सॉफ्टवेअर कंपनी आहे आणि शाळा नाही. वेगळे GuruVidyaZen SISLMS पोर्टल ${site.saaniya} चे उत्पादन आहे आणि ते वापरताना त्या उत्पादनाच्या स्वतःच्या धोरणांनुसार चालते.`,
      },
      { type: "h2", text: "हे विपणन संकेतस्थळ कोणती माहिती गोळा करते" },
      {
        type: "p",
        text: "हे संकेतस्थळ मुख्यतः माहितीपर आहे. milwaukeeshala.org वर आम्ही विद्यार्थी माहिती डेटाबेस चालवत नाही. सामान्य संवाद:",
      },
      {
        type: "ul",
        items: [
          `ईमेल दुवे (${site.email})`,
          "शाळा / Google द्वारे चालवलेले ऑफ-साइट प्रवेश Google Forms",
          "Vercel कडून पर्यायी विश्लेषण किंवा होस्टिंग लॉग (IP, user agent)",
          "ब्राउझरमध्ये साठवलेली भाषा प्राधान्य (localStorage)",
        ],
      },
      { type: "h2", text: "मुलांची गोपनीयता" },
      {
        type: "p",
        text: "हे विपणन संकेतस्थळ पालक आणि पालकांसाठी आहे. शाळेने दिलेल्या अधिकृत फॉर्म्सशिवाय येथे मुलांची वैयक्तिक माहिती सादर करू नका. शाळेचे रेकॉर्ड असल्यास ते SISLMS किंवा इतर शाळा प्रणालींमध्ये राहतील — या सार्वजनिक संकेतस्थळावर नाही.",
      },
      { type: "h2", text: "तृतीय-पक्ष सेवा" },
      {
        type: "p",
        text: "Google Forms, Zelle, पालक संस्था, Avant Assessment आणि SISLMS यांचे दुवे तृतीय-पक्ष सेवा आहेत; त्यांच्या स्वतःच्या गोपनीयता पद्धती आहेत. त्या सेवांवर आमचे नियंत्रण नाही.",
      },
      { type: "h2", text: "पेमेंट" },
      {
        type: "p",
        text: `Zelle द्वारे फी आणि देणग्या Pay पृष्ठावर दाखवलेल्या प्राप्तकर्त्याने प्रक्रिया केल्या जातात — ${site.saaniya} द्वारे नाही. या संकेतस्थळावर पेमेंट क्रेडेन्शियल्स पाठवू नका.`,
      },
      { type: "h2", text: "संपर्क" },
      {
        type: "p",
        text: `शाळा / संकेतस्थळ सामग्री प्रश्न: ${site.email}. GuruVidyaZen / SISLMS उत्पादनाच्या गोपनीयता अटींसाठी त्या उत्पादनाच्या धोरणांकडे पहा.`,
      },
      {
        type: "links",
        text: "तसेच वापराच्या अटी आणि अस्वीकरण पहा.",
      },
    ];
  }

  return [
    { type: "h2", text: "Who we are" },
    {
      type: "p",
      text: `This website (milwaukeeshala.org) provides public information about Milwaukee Marathi Shala, a community Marathi language school associated with Milwaukee Marathi Mandal. School content and program decisions are the responsibility of the school / mandal community.`,
    },
    {
      type: "p",
      text: `Website technology and hosting support may be provided by ${site.saaniya}. ${site.saaniya} is a software company and is not the school. The separate GuruVidyaZen SISLMS portal is a product of ${site.saaniya} and is governed by that product’s own policies when you use it.`,
    },
    { type: "h2", text: "Information this marketing site collects" },
    {
      type: "p",
      text: "This site is primarily informational. We do not operate student information databases on milwaukeeshala.org. Typical interactions:",
    },
    {
      type: "ul",
      items: [
        `Links to email (${site.email})`,
        "Off-site admissions Google Forms operated by Google / the school",
        "Optional analytics or hosting logs collected by Vercel (IP, user agent)",
        "Language preference stored in your browser (localStorage)",
      ],
    },
    { type: "h2", text: "Children’s privacy" },
    {
      type: "p",
      text: "This marketing site is intended for parents and guardians. Do not submit children’s personal data on this site except through official school forms the school provides. School records, if any, will live in SISLMS or other school systems—not on this public website.",
    },
    { type: "h2", text: "Third-party services" },
    {
      type: "p",
      text: "Links to Google Forms, Zelle, parent organizations, Avant Assessment, and SISLMS are third-party services with their own privacy practices. We do not control those services.",
    },
    { type: "h2", text: "Payments" },
    {
      type: "p",
      text: `Fee payments and donations via Zelle are processed by the payee shown on the Pay page—not by ${site.saaniya}. Do not send payment credentials to this website.`,
    },
    { type: "h2", text: "Contact" },
    {
      type: "p",
      text: `School / website content questions: ${site.email}. For GuruVidyaZen / SISLMS product privacy terms, refer to that product’s policies.`,
    },
    {
      type: "links",
      text: "See also Terms of Use and Disclaimer.",
    },
  ];
}

function terms(lang: Lang): LegalBlock[] {
  if (lang === "mr") {
    return [
      { type: "h2", text: "स्वीकृती" },
      {
        type: "p",
        text: "milwaukeeshala.org वापरून तुम्ही या अटींना सहमती देता. सहमत नसल्यास संकेतस्थळ वापरू नका.",
      },
      { type: "h2", text: "संकेतस्थळाचा उद्देश" },
      {
        type: "p",
        text: "हे संकेतस्थळ मिल्वॉकी मराठी शाळेबद्दल सार्वजनिक माहिती प्रकाशित करते (प्रवेश, दिनदर्शिका, बातम्या, छायाचित्रे आणि संबंधित समुदाय माहिती). हे मान्यताप्राप्त Seal of Biliteracy कार्यक्रम पृष्ठ नाही आणि अधिकृत शाळा किंवा सरकारी मार्गदर्शनाची जागा घेत नाही.",
      },
      { type: "h2", text: "शाळा विरुद्ध सॉफ्टवेअर" },
      {
        type: "p",
        text: `शैक्षणिक कार्यक्रम सामग्री मिल्वॉकी मराठी शाळा / समुदाय आयोजक देतात. या संकेतस्थळाचे तंत्रज्ञान आणि वेगळे GuruVidyaZen SISLMS उत्पादन ${site.saaniya} शी संबंधित आहे. SISLMS / GuruVidyaZen वर स्वतंत्र उत्पादन अटी स्वीकारल्याशिवाय या संकेतस्थळाचा वापर ${site.saaniya} सोबत विद्यार्थी, रोजगार किंवा सॉफ्टवेअर सदस्यता संबंध निर्माण करत नाही.`,
      },
      { type: "h2", text: "खाती आणि पोर्टल" },
      {
        type: "p",
        text: "SISLMS दुवा वेगळे अनुप्रयोग उघडतो. पोर्टल खाती, गुण आणि विद्यार्थी डेटा त्या प्रणालीच्या अटी आणि गोपनीयता धोरणानुसार चालतात — केवळ या विपणन-संकेतस्थळ अटींनुसार नाही.",
      },
      { type: "h2", text: "वापरकर्त्याचे वर्तन" },
      {
        type: "p",
        text: "संकेतस्थळाचा गैरवापर करू नका, होस्टिंग व्यत्यय आणण्याचा प्रयत्न करू नका, वैयक्तिक डेटा स्क्रॅप करू नका किंवा जोडलेल्या फॉर्म्समधून खोटी माहिती सादर करू नका.",
      },
      { type: "h2", text: "बौद्धिक संपदा" },
      {
        type: "p",
        text: `या संकेतस्थळावरील शाळेची चिन्हे, छायाचित्रे आणि मजकूर मिल्वॉकी मराठी शाळा समुदायासाठी वापरले जातात. ${site.saaniya} ब्रँडिंग ${site.saaniya} ची मालमत्ता आहे. परवानगीशिवाय चिन्हे पुन्हा वापरू नका.`,
      },
      { type: "h2", text: "मर्यादा" },
      {
        type: "p",
        text: `संकेतस्थळ “जसे आहे तसे” दिले जाते. कायद्याने परवानगी असलेल्या कमाल मर्यादेपर्यंत, मिल्वॉकी मराठी शाळा समुदाय आयोजक आणि ${site.saaniya} हे विपणन संकेतस्थळ वापरल्यामुळे होणाऱ्या नुकसानीसाठी हमी नाकारतात आणि जबाबदारी मर्यादित करतात. अस्वीकरण पहा.`,
      },
      { type: "h2", text: "बदल" },
      {
        type: "p",
        text: "आम्ही या पृष्ठावर नवीन आवृत्ती प्रकाशित करून या अटी अद्यतनित करू शकतो.",
      },
      { type: "h2", text: "संपर्क" },
      { type: "p", text: site.email },
      {
        type: "links",
        text: "संबंधित: गोपनीयता धोरण · अस्वीकरण",
      },
    ];
  }

  return [
    { type: "h2", text: "Acceptance" },
    {
      type: "p",
      text: "By using milwaukeeshala.org you agree to these Terms. If you do not agree, do not use the site.",
    },
    { type: "h2", text: "Purpose of the site" },
    {
      type: "p",
      text: "This site publishes public information about Milwaukee Marathi Shala (admissions, calendar, news, photos, and related community information). It is not an accredited Seal of Biliteracy program page and does not replace official school or government guidance.",
    },
    { type: "h2", text: "School vs software" },
    {
      type: "p",
      text: `Educational program content is provided by Milwaukee Marathi Shala / community organizers. Technology for this website and the separate GuruVidyaZen SISLMS product involves ${site.saaniya}. Using this website does not create a student, employment, or software subscription relationship with ${site.saaniya} unless you separately agree to product terms on SISLMS / GuruVidyaZen.`,
    },
    { type: "h2", text: "Accounts and portal" },
    {
      type: "p",
      text: "The SISLMS link opens a separate application. Portal accounts, grades, and student data are governed by that system’s terms and privacy policy—not solely by these marketing-site Terms.",
    },
    { type: "h2", text: "User conduct" },
    {
      type: "p",
      text: "Do not misuse the site, attempt to disrupt hosting, scrape personal data, or submit false information through linked forms.",
    },
    { type: "h2", text: "Intellectual property" },
    {
      type: "p",
      text: `School logos, photos, and copy on this site are used for Milwaukee Marathi Shala community purposes. ${site.saaniya} branding remains property of ${site.saaniya}. Do not reuse marks without permission.`,
    },
    { type: "h2", text: "Limitation" },
    {
      type: "p",
      text: `THE SITE IS PROVIDED “AS IS.” TO THE MAXIMUM EXTENT PERMITTED BY LAW, MILWAUKEE MARATHI SHALA COMMUNITY ORGANIZERS AND ${site.saaniya.toUpperCase()} DISCLAIM WARRANTIES AND LIMIT LIABILITY FOR DAMAGES ARISING FROM USE OF THIS MARKETING SITE. See the Disclaimer.`,
    },
    { type: "h2", text: "Changes" },
    {
      type: "p",
      text: "We may update these Terms by posting a new version on this page.",
    },
    { type: "h2", text: "Contact" },
    { type: "p", text: site.email },
    {
      type: "links",
      text: "Related: Privacy Policy · Disclaimer",
    },
  ];
}

function disclaimer(lang: Lang): LegalBlock[] {
  if (lang === "mr") {
    return [
      { type: "h2", text: "सामान्य" },
      {
        type: "p",
        text: "milwaukeeshala.org वरील माहिती मिल्वॉकी मराठी शाळेबद्दल सामान्य समुदाय माहितीसाठी आहे. सामग्री बदलू शकते; वेळापत्रक, फी आणि प्रवेश नियम पूर्वसूचनेशिवाय अद्यतनित होऊ शकतात.",
      },
      { type: "h2", text: "शैक्षणिक हमी नाहीत" },
      {
        type: "p",
        text: "मिल्वॉकी मराठी शाळा Seal of Biliteracy Avant-प्रमाणित कार्यक्रम नाही. Avant Assessment चा उल्लेख संभाव्य मार्ग (नंतरच्या इयत्तांमध्ये घेतल्या जाणाऱ्या परीक्षा सहित) वर्णन करतो आणि महाविद्यालयीन क्रेडिट, प्रमाणपत्र किंवा निकालांची हमी देत नाही. कुटुंबांनी शाळा आणि Avant / BMM स्त्रोतांकडे आवश्यकता तपासाव्यात.",
      },
      { type: "h2", text: "Saaniya Software LLC" },
      {
        type: "p",
        text: `${site.saaniya} हे संकेतस्थळ विकसित, होस्ट किंवा समर्थित करू शकते आणि वेगळे GuruVidyaZen SISLMS उत्पादन देते. ${site.saaniya}:`,
      },
      {
        type: "ul",
        items: [
          "शाळा नाही आणि वर्ग शिक्षण चालवत नाही;",
          "कार्यक्रमांना मान्यता देत नाही किंवा Seal of Biliteracy देत नाही;",
          "या विपणन संकेतस्थळावर मिल्वॉकी मराठी शाळेची फी प्रक्रिया करत नाही (Zelle पेमेंट सूचीबद्ध शाळा/संस्था प्राप्तकर्त्याला जातात);",
          "वेगळ्या लेखी कराराने अन्यथा सांगितल्याशिवाय सॉफ्टवेअर आणि संबंधित सेवा “जशा आहेत तशा” देते.",
        ],
      },
      { type: "h2", text: "तृतीय-पक्ष दुवे आणि पेमेंट" },
      {
        type: "p",
        text: "बाह्य संकेतस्थळे (Google Forms, Zelle, MMM, BMM, Avant, SISLMS आणि इतर) या संकेतस्थळाच्या नियंत्रणात नाहीत. ती तुमच्या जोखमीवर वापरा.",
      },
      { type: "h2", text: "जबाबदारीची मर्यादा" },
      {
        type: "p",
        text: `लागू कायद्याने परवानगी असलेल्या कमाल मर्यादेपर्यंत, मिल्वॉकी मराठी शाळा समुदाय आयोजक किंवा ${site.saaniya} हे संकेतस्थळ वापरल्यामुळे किंवा त्याच्या सामग्रीवर अवलंबून राहिल्याने होणाऱ्या अप्रत्यक्ष, आनुषंगिक, विशेष, परिणामी किंवा दंडात्मक नुकसानीसाठी, किंवा डेटा, नफा किंवा व्यवसायाच्या कोणत्याही नुकसानीसाठी जबाबदार राहणार नाहीत.`,
      },
      { type: "h2", text: "संपर्क" },
      {
        type: "p",
        text: `शाळेचे प्रश्न: ${site.email}`,
      },
      {
        type: "links",
        text: "गोपनीयता · अटी",
      },
    ];
  }

  return [
    { type: "h2", text: "General" },
    {
      type: "p",
      text: "Information on milwaukeeshala.org is for general community information about Milwaukee Marathi Shala. Content may change; schedules, fees, and admissions rules can be updated without notice.",
    },
    { type: "h2", text: "No educational warranties" },
    {
      type: "p",
      text: "Milwaukee Marathi Shala is not a Seal of Biliteracy Avant-certified program. Mentions of Avant Assessment describe a possible pathway (including exams often taken in later grades) and do not guarantee college credit, certification, or outcomes. Families should verify requirements with schools and Avant / BMM resources.",
    },
    { type: "h2", text: "Saaniya Software LLC" },
    {
      type: "p",
      text: `${site.saaniya} may develop, host, or support this website and offers the separate GuruVidyaZen SISLMS product. ${site.saaniya}:`,
    },
    {
      type: "ul",
      items: [
        "is not the school and does not operate classroom instruction;",
        "does not accredit programs or grant Seal of Biliteracy;",
        "does not process Milwaukee Marathi Shala tuition on this marketing site (Zelle payments go to the listed school/organization payee);",
        "provides software and related services “as is” except where a separate written agreement says otherwise.",
      ],
    },
    { type: "h2", text: "Third-party links & payments" },
    {
      type: "p",
      text: "External sites (Google Forms, Zelle, MMM, BMM, Avant, SISLMS, and others) are not controlled by this website. Use them at your own risk.",
    },
    { type: "h2", text: "Limitation of liability" },
    {
      type: "p",
      text: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, NEITHER THE MILWAUKEE MARATHI SHALA COMMUNITY ORGANIZERS NOR ${site.saaniya.toUpperCase()} SHALL BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF DATA, PROFITS, OR BUSINESS ARISING FROM USE OF THIS WEBSITE OR RELIANCE ON ITS CONTENT.`,
    },
    { type: "h2", text: "Contact" },
    {
      type: "p",
      text: `School questions: ${site.email}`,
    },
    {
      type: "links",
      text: "Privacy · Terms",
    },
  ];
}

export function getLegalBlocks(
  page: "privacy" | "terms" | "disclaimer",
  lang: Lang,
): LegalBlock[] {
  if (page === "privacy") return privacy(lang);
  if (page === "terms") return terms(lang);
  return disclaimer(lang);
}
