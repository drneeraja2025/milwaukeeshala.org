import type { Lang } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/site";

/**
 * Community marketing-site legal copy for milwaukeeshala.org.
 *
 * Source posture (agrawal-llc-docs):
 * - milwaukeeshala.org is a community/school site, SEPARATE from Saaniya Software LLC SaaS.
 * - Do NOT fork master LLC ToS/Privacy product pack into this repo.
 * - GuruVidyaZen / SISLMS product policies are separate (counsel-approved HTTPS URLs when live).
 *
 * Informational only — not legal advice.
 */

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "links"; text: string };

function privacy(lang: Lang): LegalBlock[] {
  if (lang === "mr") {
    return [
      { type: "h2", text: "आम्ही कोण आहोत" },
      {
        type: "p",
        text: `हे संकेतस्थळ (milwaukeeshala.org) मिल्वॉकी मराठी शाळेबद्दल सार्वजनिक माहिती देते — महाराष्ट्र मंडळ मिल्वॉकीशी संबंधित सामुदायिक मराठी भाषा शाळा. शाळेची सामग्री, प्रवेश, फी आणि कार्यक्रम निर्णय शाळा / मंडळ समुदायाची जबाबदारी आहेत.`,
      },
      {
        type: "p",
        text: `संकेतस्थळ तंत्रज्ञान आणि होस्टिंग समर्थन ${site.saaniya} देऊ शकते. ${site.saaniya} ही सॉफ्टवेअर कंपनी आहे आणि शाळा नाही. वेगळे GuruVidyaZen SISLMS पोर्टल ${site.saaniya} चे उत्पादन आहे; ते वापरताना त्या उत्पादनाच्या स्वतःच्या अटी आणि गोपनीयता धोरण लागू होतात — या विपणन संकेतस्थळाच्या धोरणाऐवजी नाही.`,
      },
      { type: "h2", text: "या धोरणाची व्याप्ती" },
      {
        type: "p",
        text: "हे गोपनीयता धोरण फक्त milwaukeeshala.org (सार्वजनिक विपणन / समुदाय संकेतस्थळ) वर लागू होते. SISLMS, Google Forms, Zelle, Facebook किंवा इतर तृतीय-पक्ष साइट्सवर स्वतंत्र धोरणे लागू होतात.",
      },
      { type: "h2", text: "आम्ही कोणती माहिती गोळा करतो" },
      {
        type: "p",
        text: "हे संकेतस्थळ मुख्यतः माहितीपर आहे. milwaukeeshala.org वर आम्ही विद्यार्थी माहिती प्रणाली (SIS) किंवा गुण डेटाबेस चालवत नाही. सामान्य संवाद:",
      },
      {
        type: "ul",
        items: [
          `संपर्क आणि स्वयंसेवा फॉर्म: नाव, ईमेल, फोन (ऐच्छिक), संदेश — शाळेला उत्तर देण्यासाठी ${site.email} कडे पाठवले जाऊ शकतात`,
          `ईमेल दुवे (${site.email}) आणि ऑफ-साइट प्रवेश Google Forms`,
          "होस्टिंग / विश्लेषण लॉग (उदा. Vercel): IP पत्ता, user agent, पृष्ठ मार्ग, वेळ",
          "ब्राउझर स्थानिक साठवण: भाषा प्राधान्य (localStorage)",
          "कर्मचारी प्रशासक सत्र कुकी (mms_admin_session) — फक्त /staff लॉगिन नंतर; सार्वजनिक अभ्यागतांसाठी नाही",
        ],
      },
      { type: "h2", text: "आम्ही माहिती कशी वापरतो" },
      {
        type: "ul",
        items: [
          "शाळेच्या प्रश्नांना, प्रवेश आणि स्वयंसेवा विनंत्यांना उत्तर देणे",
          "संकेतस्थळ सुरक्षित आणि विश्वासार्ह ठेवणे",
          "मूलभूत पृष्ठ-दृश्य विश्लेषण (जाहिरात प्रोफाइलिंग नाही)",
          "कायदेशीर जबाबदाऱ्या पूर्ण करणे",
        ],
      },
      {
        type: "p",
        text: "आम्ही जाहिरातीसाठी वैयक्तिक माहिती विकत नाही आणि तृतीय-पक्ष जाहिरात ट्रॅकर्स वापरत नाही.",
      },
      { type: "h2", text: "कुकीज आणि ट्रॅकिंग" },
      {
        type: "p",
        text: "आवश्यक सत्र कुकीज (कर्मचारी प्रशासन), भाषा प्राधान्यासाठी localStorage, आणि होस्टिंग/विश्लेषण तंत्रज्ञान वापरले जाऊ शकतात. जाहिरात कुकीज नाहीत. ब्राउझर सेटिंग्जद्वारे कुकीज नियंत्रित करा.",
      },
      { type: "h2", text: "मुलांची गोपनीयता" },
      {
        type: "p",
        text: "हे विपणन संकेतस्थळ पालक आणि पालकांसाठी आहे. येथे मुलांची वैयक्तिक माहिती सादर करू नका — शाळेने दिलेल्या अधिकृत फॉर्म्सशिवाय. शाळेचे विद्यार्थी रेकॉर्ड असल्यास ते SISLMS किंवा इतर शाळा प्रणालींमध्ये राहतील — या सार्वजनिक संकेतस्थळावर नाही.",
      },
      { type: "h2", text: "सामायिकरण आणि सेवा प्रदाते" },
      {
        type: "p",
        text: "आम्ही होस्टिंग (उदा. Vercel), ईमेल वितरण (कॉन्फिगर असल्यास), आणि GitHub (सार्वजनिक सामग्री प्रकाशित करण्यासाठी) सारख्या सेवा प्रदात्यांसोबत माहिती प्रक्रिया करू शकतो. Google Forms, Zelle, MMM, BMM, Avant Assessment आणि SISLMS यांचे दुवे तृतीय-पक्ष आहेत; त्यांच्या स्वतःच्या गोपनीयता पद्धती आहेत.",
      },
      { type: "h2", text: "पेमेंट" },
      {
        type: "p",
        text: `Zelle द्वारे फी आणि देणग्या Pay पृष्ठावर दाखवलेल्या प्राप्तकर्त्याने प्रक्रिया केल्या जातात — ${site.saaniya} द्वारे नाही. या संकेतस्थळावर पेमेंट कार्ड किंवा Zelle क्रेडेन्शियल्स पाठवू नका.`,
      },
      { type: "h2", text: "धारण आणि सुरक्षा" },
      {
        type: "p",
        text: "फॉर्म संदेश ईमेल / कॉन्फिगर केलेल्या वितरण मार्गाने ठेवले जातात आणि शाळा ऑपरेशनसाठी आवश्यक तेवढेच ठेवले जातात. आम्ही वाजवी सुरक्षा उपाय वापरतो पण इंटरनेट प्रसारण पूर्ण सुरक्षित असल्याचे हमी देत नाही.",
      },
      { type: "h2", text: "तुमचे अधिकार" },
      {
        type: "p",
        text: `तुमच्या अधिकारक्षेत्रानुसार प्रवेश, दुरुस्ती किंवा हटवण्याची विनंती करू शकता. शाळा / संकेतस्थळ विनंत्या: ${site.email}. आम्ही ओळख पडताळून उत्तर देऊ.`,
      },
      { type: "h2", text: "आंतरराष्ट्रीय अभ्यागत" },
      {
        type: "p",
        text: "संकेतस्थळ युनायटेड स्टेट्समध्ये होस्ट केले जाऊ शकते. यु.एस. बाहेरून प्रवेश केल्यास तुमची माहिती यु.एस. मध्ये प्रक्रिया होऊ शकते.",
      },
      { type: "h2", text: "बदल" },
      {
        type: "p",
        text: "आम्ही या पृष्ठावर नवीन आवृत्ती प्रकाशित करून हे धोरण अद्यतनित करू शकतो.",
      },
      { type: "h2", text: "संपर्क" },
      {
        type: "p",
        text: `शाळा / संकेतस्थळ सामग्री आणि गोपनीयता प्रश्न: ${site.email}. GuruVidyaZen / SISLMS उत्पादनाच्या गोपनीयतेसाठी त्या उत्पादनाच्या प्रकाशित धोरणांकडे पहा.`,
      },
      { type: "links", text: "तसेच वापराच्या अटी आणि अस्वीकरण पहा." },
    ];
  }

  return [
    { type: "h2", text: "Who we are" },
    {
      type: "p",
      text: `This website (milwaukeeshala.org) provides public information about Milwaukee Marathi Shala, a community Marathi language school associated with Milwaukee Marathi Mandal. School content, admissions, fees, and program decisions are the responsibility of the school / mandal community.`,
    },
    {
      type: "p",
      text: `Website technology and hosting support may be provided by ${site.saaniya}. ${site.saaniya} is a software company and is not the school. The separate GuruVidyaZen SISLMS portal is a product of ${site.saaniya} and is governed by that product’s own terms and privacy policy when you use it—not by this marketing-site policy.`,
    },
    { type: "h2", text: "Scope of this policy" },
    {
      type: "p",
      text: "This Privacy Policy applies only to milwaukeeshala.org (this public marketing / community website). Separate policies apply to SISLMS, Google Forms, Zelle, Facebook, and other third-party sites.",
    },
    { type: "h2", text: "Information we collect" },
    {
      type: "p",
      text: "This site is primarily informational. We do not operate a student information system (SIS) or grade database on milwaukeeshala.org. Typical interactions:",
    },
    {
      type: "ul",
      items: [
        `Contact and volunteer forms: name, email, phone (optional), and message — which may be emailed to ${site.email} so the school can reply`,
        `Links to email (${site.email}) and off-site admissions Google Forms`,
        "Hosting / analytics logs (e.g. Vercel): IP address, user agent, page path, timestamps",
        "Browser local storage: language preference (localStorage)",
        "Staff admin session cookie (mms_admin_session) — only after /staff login; not for public visitors",
      ],
    },
    { type: "h2", text: "How we use information" },
    {
      type: "ul",
      items: [
        "Respond to school questions, admissions, and volunteer interest",
        "Keep the website secure and reliable",
        "Basic page-view analytics (not advertising profiling)",
        "Comply with legal obligations",
      ],
    },
    {
      type: "p",
      text: "We do not sell personal information for advertising and do not use third-party advertising trackers.",
    },
    { type: "h2", text: "Cookies and tracking" },
    {
      type: "p",
      text: "We may use essential session cookies (staff admin), localStorage for language preference, and hosting/analytics technologies. We do not use advertising cookies. You can control cookies through your browser settings.",
    },
    { type: "h2", text: "Children’s privacy" },
    {
      type: "p",
      text: "This marketing site is intended for parents and guardians. Do not submit children’s personal data on this site except through official school forms the school provides. School student records, if any, live in SISLMS or other school systems—not on this public website.",
    },
    { type: "h2", text: "Sharing and service providers" },
    {
      type: "p",
      text: "We may process information with service providers such as hosting (e.g. Vercel), email delivery (when configured), and GitHub (for publishing public site content). Links to Google Forms, Zelle, MMM, BMM, Avant Assessment, and SISLMS are third-party services with their own privacy practices.",
    },
    { type: "h2", text: "Payments" },
    {
      type: "p",
      text: `Fee payments and donations via Zelle are processed by the payee shown on the Pay page—not by ${site.saaniya}. Do not send payment card or Zelle credentials to this website.`,
    },
    { type: "h2", text: "Retention and security" },
    {
      type: "p",
      text: "Form messages are retained via email / configured delivery channels for as long as needed for school operations. We use reasonable security measures but cannot guarantee that internet transmission is completely secure.",
    },
    { type: "h2", text: "Your rights" },
    {
      type: "p",
      text: `Depending on your jurisdiction, you may request access, correction, or deletion of personal information you provided through this site. School / website privacy requests: ${site.email}. We will verify identity before responding.`,
    },
    { type: "h2", text: "International visitors" },
    {
      type: "p",
      text: "This website may be hosted in the United States. If you access it from outside the U.S., your information may be processed in the United States.",
    },
    { type: "h2", text: "Changes" },
    {
      type: "p",
      text: "We may update this Policy by posting a new version on this page with an updated date.",
    },
    { type: "h2", text: "Contact" },
    {
      type: "p",
      text: `School / website content and privacy questions: ${site.email}. For GuruVidyaZen / SISLMS product privacy, refer to that product’s published policies when available.`,
    },
    { type: "links", text: "See also Terms of Use and Disclaimer." },
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
        text: "हे संकेतस्थळ मिल्वॉकी मराठी शाळेबद्दल सार्वजनिक माहिती प्रकाशित करते (प्रवेश, दिनदर्शिका, बातम्या, छायाचित्रे, संसाधने आणि संबंधित समुदाय माहिती). हे अधिकृत शाळा, सरकारी किंवा महाविद्यालयीन मार्गदर्शनाची जागा घेत नाही. Seal of Biliteracy / Avant तपशील संबंधित पृष्ठावर आणि कर्मचाऱ्यांकडे आहेत.",
      },
      { type: "h2", text: "शाळा विरुद्ध सॉफ्टवेअर" },
      {
        type: "p",
        text: `शैक्षणिक कार्यक्रम सामग्री मिल्वॉकी मराठी शाळा / समुदाय आयोजक देतात. या संकेतस्थळाचे तंत्रज्ञान आणि वेगळे GuruVidyaZen SISLMS उत्पादन ${site.saaniya} शी संबंधित असू शकते. SISLMS / GuruVidyaZen वर स्वतंत्र उत्पादन अटी स्वीकारल्याशिवाय या संकेतस्थळाचा वापर ${site.saaniya} सोबत विद्यार्थी, रोजगार, सदस्यता किंवा SaaS करार निर्माण करत नाही.`,
      },
      { type: "h2", text: "पात्रता" },
      {
        type: "p",
        text: "हे संकेतस्थळ सामान्य प्रेक्षकांसाठी आहे. संपर्क / स्वयंसेवा फॉर्म पालक, पालक किंवा प्रौढ स्वयंसेवकांनी भरावेत. मुलांनी वैयक्तिक माहिती येथे सादर करू नये.",
      },
      { type: "h2", text: "खाती आणि पोर्टल" },
      {
        type: "p",
        text: "SISLMS दुवा वेगळे अनुप्रयोग उघडतो. पोर्टल खाती, गुण आणि विद्यार्थी डेटा त्या प्रणालीच्या अटी आणि गोपनीयता धोरणानुसार चालतात — केवळ या विपणन-संकेतस्थळ अटींनुसार नाही.",
      },
      { type: "h2", text: "फॉर्म आणि वापरकर्त्याची सामग्री" },
      {
        type: "p",
        text: "तुम्ही संपर्क किंवा स्वयंसेवा फॉर्मद्वारे पाठवलेली माहिती अचूक असावी. शाळेला उत्तर देण्यासाठी ती ईमेलद्वारे प्रक्रिया होऊ शकते. चुकीची, अपमानास्पद किंवा बेकायदेशीर सामग्री सादर करू नका.",
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
      { type: "h2", text: "तृतीय-पक्ष दुवे" },
      {
        type: "p",
        text: "बाह्य संकेतस्थळे आणि सेवा तुमच्या जोखमीवर वापरा. आम्ही त्यांची सामग्री किंवा पद्धती नियंत्रित करत नाही.",
      },
      { type: "h2", text: "अस्वीकरण आणि मर्यादा" },
      {
        type: "p",
        text: `संकेतस्थळ “जसे आहे तसे” दिले जाते. कायद्याने परवानगी असलेल्या कमाल मर्यादेपर्यंत, मिल्वॉकी मराठी शाळा समुदाय आयोजक आणि ${site.saaniya} हे विपणन संकेतस्थळ वापरल्यामुळे होणाऱ्या नुकसानीसाठी हमी नाकारतात आणि जबाबदारी मर्यादित करतात. अस्वीकरण पहा.`,
      },
      { type: "h2", text: "लागू कायदा" },
      {
        type: "p",
        text: "लागू ग्राहक संरक्षण हक्कांच्या अधीन, या अटी युनायटेड स्टेट्सच्या विस्कॉन्सिन राज्याच्या कायद्यांनुसार अर्थ लावल्या जातील (संघर्ष-कायदा नियम वगळून).",
      },
      { type: "h2", text: "बदल" },
      {
        type: "p",
        text: "आम्ही या पृष्ठावर नवीन आवृत्ती प्रकाशित करून या अटी अद्यतनित करू शकतो. अद्यतनानंतर संकेतस्थळ वापरणे म्हणजे स्वीकृती.",
      },
      { type: "h2", text: "संपर्क" },
      { type: "p", text: site.email },
      { type: "links", text: "संबंधित: गोपनीयता धोरण · अस्वीकरण" },
    ];
  }

  return [
    { type: "h2", text: "Acceptance" },
    {
      type: "p",
      text: "By using milwaukeeshala.org you agree to these Terms of Use. If you do not agree, do not use the site.",
    },
    { type: "h2", text: "Purpose of the site" },
    {
      type: "p",
      text: "This site publishes public information about Milwaukee Marathi Shala (admissions, calendar, news, photos, resources, and related community information). It does not replace official school, government, or college guidance. Seal of Biliteracy / Avant details are on the Biliteracy page and with school staff.",
    },
    { type: "h2", text: "School vs software" },
    {
      type: "p",
      text: `Educational program content is provided by Milwaukee Marathi Shala / community organizers. Technology for this website and the separate GuruVidyaZen SISLMS product may involve ${site.saaniya}. Using this website does not create a student, employment, membership, or SaaS subscription relationship with ${site.saaniya} unless you separately agree to product terms on SISLMS / GuruVidyaZen.`,
    },
    { type: "h2", text: "Eligibility" },
    {
      type: "p",
      text: "This site is intended for a general audience. Contact and volunteer forms should be completed by parents, guardians, or adult volunteers. Children should not submit personal information here.",
    },
    { type: "h2", text: "Accounts and portal" },
    {
      type: "p",
      text: "The SISLMS link opens a separate application. Portal accounts, grades, and student data are governed by that system’s terms and privacy policy—not solely by these marketing-site Terms.",
    },
    { type: "h2", text: "Forms and user content" },
    {
      type: "p",
      text: "Information you submit through contact or volunteer forms should be accurate. It may be processed by email so the school can respond. Do not submit false, abusive, or unlawful content.",
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
    { type: "h2", text: "Third-party links" },
    {
      type: "p",
      text: "External websites and services are used at your own risk. We do not control their content or practices.",
    },
    { type: "h2", text: "Disclaimer and limitation" },
    {
      type: "p",
      text: `THE SITE IS PROVIDED “AS IS.” TO THE MAXIMUM EXTENT PERMITTED BY LAW, MILWAUKEE MARATHI SHALA COMMUNITY ORGANIZERS AND ${site.saaniya.toUpperCase()} DISCLAIM WARRANTIES AND LIMIT LIABILITY FOR DAMAGES ARISING FROM USE OF THIS MARKETING SITE. See the Disclaimer.`,
    },
    { type: "h2", text: "Governing law" },
    {
      type: "p",
      text: "Subject to applicable consumer-protection rights, these Terms are governed by the laws of the State of Wisconsin, USA, excluding conflict-of-laws rules.",
    },
    { type: "h2", text: "Changes" },
    {
      type: "p",
      text: "We may update these Terms by posting a new version on this page. Continued use after an update constitutes acceptance.",
    },
    { type: "h2", text: "Contact" },
    { type: "p", text: site.email },
    { type: "links", text: "Related: Privacy Policy · Disclaimer" },
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
      { type: "h2", text: "व्यावसायिक सल्ला नाही" },
      {
        type: "p",
        text: "या संकेतस्थळावरील माहिती कायदेशीर, कर, आर्थिक, वैद्यकीय किंवा इतर व्यावसायिक सल्ला नाही. महत्त्वाच्या निर्णयांसाठी पात्र व्यावसायिकांचा सल्ला घ्या.",
      },
      { type: "h2", text: "शैक्षणिक हमी नाहीत" },
      {
        type: "p",
        text: "मिल्वॉकी मराठी शाळेचे विद्यार्थी Avant Assessment आणि BMM मार्गातून Seal of Biliteracy कार्यक्रम घेऊ शकतात. Avant / STAMP निकाल, Seal of Biliteracy किंवा महाविद्यालयीन क्रेडिटची हमी या संकेतस्थळावर दिली जात नाही — पात्रता आणि निकाल शाळा, Avant / BMM आणि महाविद्यालयांच्या धोरणांनुसार बदलतात. तपशीलासाठी कर्मचाऱ्यांशी संपर्क साधा आणि Avant / BMM स्त्रोत तपासा.",
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
      { type: "h2", text: "भविष्यातील विधान" },
      {
        type: "p",
        text: "आगामी तारखा, फी किंवा कार्यक्रमांबद्दलची विधाने बदलू शकतात.",
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
      { type: "links", text: "गोपनीयता · अटी" },
    ];
  }

  return [
    { type: "h2", text: "General" },
    {
      type: "p",
      text: "Information on milwaukeeshala.org is for general community information about Milwaukee Marathi Shala. Content may change; schedules, fees, and admissions rules can be updated without notice.",
    },
    { type: "h2", text: "No professional advice" },
    {
      type: "p",
      text: "Information on this site is not legal, tax, financial, medical, or other professional advice. Consult a qualified professional before decisions with legal, financial, or medical consequences.",
    },
    { type: "h2", text: "No educational warranties" },
    {
      type: "p",
      text: "Milwaukee Marathi Shala students can pursue a Seal of Biliteracy Avant-certified pathway through Avant Assessment and BMM. This website does not guarantee STAMP scores, a Seal of Biliteracy, or college credit — eligibility and outcomes depend on school, Avant / BMM, and college policies. Contact staff for details and verify requirements with Avant / BMM resources.",
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
    { type: "h2", text: "Forward-looking statements" },
    {
      type: "p",
      text: "Statements about upcoming dates, fees, or programs are subject to change.",
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
    { type: "links", text: "Privacy · Terms" },
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
