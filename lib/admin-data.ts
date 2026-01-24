// Admin data management utilities
// In production, this would connect to a backend API

export interface FormSubmission {
  id: string;
  licenseType: string;
  nationalId: string;
  nameAr: string;
  surnameAr: string;
  nameFr: string;
  surnameFr: string;
  gender: string;
  birthDate: string;
  birthWilaya: string;
  birthMunicipality: string;
  fatherName: string;
  motherName: string;
  motherSurname: string;
  address: string;
  maritalStatus: string;
  phone1: string;
  phone2?: string;
  originalNationality: string;
  currentNationality: string;
  submittedAt: string;
}

export interface LicenseType {
  id: string;
  code: string;
  nameAr: string;
  nameFr: string;
  description: string;
  imagePath: string;
  details: string[];
  note?: string;
  offers: string[];
  callToAction: string;
  videoLink?: string;
  extraImages?: string[];
  text?: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  videoLink?: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  logo: string;
  name: string;
  description: string;
  formElements: {
    [key: string]: {
      label: string;
      required: boolean;
      visible: boolean;
    };
  };
}

// Storage keys
const STORAGE_KEYS = {
  FORM_SUBMISSIONS: "admin_form_submissions",
  LICENSE_TYPES: "admin_license_types",
  ARTICLES: "admin_articles",
  SETTINGS: "admin_settings",
};

// Form Submissions
export function getFormSubmissions(): FormSubmission[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEYS.FORM_SUBMISSIONS);
  return data ? JSON.parse(data) : [];
}

export function saveFormSubmission(submission: Omit<FormSubmission, "id" | "submittedAt">): FormSubmission {
  const submissions = getFormSubmissions();
  const newSubmission: FormSubmission = {
    ...submission,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
  };
  submissions.push(newSubmission);
  localStorage.setItem(STORAGE_KEYS.FORM_SUBMISSIONS, JSON.stringify(submissions));
  return newSubmission;
}

export function deleteFormSubmission(id: string): void {
  const submissions = getFormSubmissions();
  const filtered = submissions.filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.FORM_SUBMISSIONS, JSON.stringify(filtered));
}

// License Types
export function getLicenseTypes(): LicenseType[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEYS.LICENSE_TYPES);
  if (data) return JSON.parse(data);
  
  // Initialize with default types from Categories2
  const defaultTypes: LicenseType[] = [
    {
      id: "1",
      code: "A",
      nameAr: "رخصة A",
      nameFr: "Permis A",
      description: "رخصة A2: الدراجات النارية من الصنف ب (حجم الاسطوانة من 80 إلى 400 سم مكعب) والصنف ج (أكثر من 400 سم مكعب).",
      imagePath: "/types/categorie A.jpg",
      details: [
        "الدراجات النارية من الصنف ب: حجم الاسطوانة من 80 إلى 400 سم مكعب",
        "الدراجات النارية من الصنف ج: أكثر من 400 سم مكعب",
        "تسمح بقيادة جميع أنواع الدراجات النارية بدون قيود على حجم المحرك"
      ],
      offers: [
        "مدرّبون محترفون ذوو خبرة في قيادة الدراجات النارية",
        "تجهيزات عصرية ودراجات نارية مخصّصة للتدريب",
        "مرافقة نفسية لزيادة ثقتك بنفسك على الطريق",
        "برنامج تدريبي شامل يتضمن التدريب النظري والعملي"
      ],
      callToAction: "سجّل الآن، وابدأ رحلتك معنا لتحصل على رخصة قيادة الدراجات النارية من الصنف A2"
    },
    {
      id: "2",
      code: "A1",
      nameAr: "رخصة A1",
      nameFr: "Permis A1",
      description: "رخصة A1: الدراجات النارية من الصنف أ (حجم الاسطوانة من 50 إلى 80 سنتمتر مكعب) والدراجات الثلاثية والرباعية العجلات (حجم الاسطوانة يساوي أو يقل عن 125 سم مكعب).",
      imagePath: "/types/categorie A1.jpg",
      details: [
        "الدراجات النارية من الصنف أ: حجم الاسطوانة من 50 إلى 80 سم مكعب",
        "الدراجات الثلاثية والرباعية العجلات: حجم الاسطوانة يساوي أو يقل عن 125 سم مكعب",
        "دراجات نارية خفيفة (Mobylettes, Scooters) مثل الكوكسي والاستايت"
      ],
      note: "ملاحظة مهمة: رخص السيارات (الصنف B) أصبحت تخول لحاملها قانونيًا قيادة الدراجات النارية من الصنف A1 دون الحاجة لرخصة منفصلة، وفقًا لتحديثات قانون المرور في الجزائر.",
      offers: [
        "مدرّبون محترفون ذوو خبرة في قيادة الدراجات النارية الخفيفة",
        "تجهيزات عصرية ودراجات خفيفة مخصّصة للتدريب",
        "مرافقة نفسية لزيادة ثقتك بنفسك على الطريق",
        "برنامج تدريبي متكامل مناسب للمبتدئين"
      ],
      callToAction: "سجّل الآن، وابدأ رحلتك معنا لتحصل على رخصة قيادة الدراجات النارية الخفيفة"
    },
    {
      id: "3",
      code: "B",
      nameAr: "رخصة B",
      nameFr: "Permis B",
      description: "رخصة B: السيارات الأقل من 10 مقاعد وزنها الاجمالي مع الحمولة أقل من 3.5 طن.",
      imagePath: "/types/categorie b.jpg",
      details: [
        "السيارات الأقل من 10 مقاعد",
        "الوزن الإجمالي مع الحمولة أقل من 3.5 طن",
        "أكثر رخص السياقة شيوعًا"
      ],
      note: "ملاحظة: حاملي رخصة B يمكنهم قيادة الدراجات النارية من الصنف A1 (حتى 125 سم مكعب) دون رخصة منفصلة.",
      offers: [
        "مدرّبون محترفون ذوو خبرة واسعة في تعليم قيادة السيارات",
        "تجهيزات عصرية وسيارات مخصّصة للتدريب",
        "مرافقة نفسية لزيادة ثقتك بنفسك خلف عجلة القيادة",
        "برنامج تدريبي شامل مع 20 ساعة تدريب عملي"
      ],
      callToAction: "سجّل الآن، وابدأ رحلتك معنا لتحصل على رخصة قيادة السيارات"
    },
    {
      id: "4",
      code: "C",
      nameAr: "رخصة C",
      nameFr: "Permis C",
      description: "رخصة C2: تسمح بقيادة مركبات نقل البضائع التي يتجاوز وزنها مع الحمولة 19 طن (مركبة منفردة) أو التي يتجاوز وزنها 12.5 طن (مركبة جارة لمجموعة مركبات أو مركبة متمفصلة).",
      imagePath: "/types/categorie c.jpg",
      details: [
        "مركبات نقل البضائع التي يتجاوز وزنها مع الحمولة 19 طن (مركبة منفردة)",
        "مركبات نقل البضائع التي يتجاوز وزنها 12.5 طن (مركبة جارة لمجموعة مركبات أو مركبة متمفصلة)"
      ],
      offers: [
        "مدرّبون محترفون ذوو خبرة في قيادة الشاحنات الثقيلة",
        "تجهيزات عصرية ومركبات نقل مخصّصة للتدريب",
        "مرافقة نفسية لزيادة ثقتك بنفسك في القيادة التجارية",
        "برنامج تدريبي متقدم مع 30 ساعة تدريب عملي"
      ],
      callToAction: "سجّل الآن، وابدأ رحلتك معنا لتحصل على رخصة قيادة مركبات نقل البضائع الثقيلة",
      videoLink: "https://www.youtube.com/embed/Ts3uwRAOiJw"
    },
    {
      id: "5",
      code: "C1",
      nameAr: "رخصة C1",
      nameFr: "Permis C1",
      description: "رخصة C1: تسمح بقيادة المركبات المنفردة المخصصة لنقل البضائع التي يكون وزنها بين 3.5 طن و 19 طن.",
      imagePath: "/types/categorie c1.jpg",
      details: [
        "المركبات المنفردة المخصصة لنقل البضائع",
        "الوزن بين 3.5 طن و 19 طن",
        "تستخدم في النقل التجاري للمسافات المتوسطة"
      ],
      offers: [
        "مدرّبون محترفون ذوو خبرة في قيادة مركبات النقل المتوسطة",
        "تجهيزات عصرية ومركبات نقل مخصّصة للتدريب",
        "مرافقة نفسية لزيادة ثقتك بنفسك في القيادة التجارية",
        "برنامج تدريبي شامل مع 25 ساعة تدريب عملي"
      ],
      callToAction: "سجّل الآن، وابدأ رحلتك معنا لتحصل على رخصة قيادة مركبات نقل البضائع المتوسطة"
    },
    {
      id: "6",
      code: "D",
      nameAr: "رخصة D",
      nameFr: "Permis D",
      description: "رخصة D: سيارات النقل العام للأشخاص (أكثر من 9 مقاعد)، أو التي يتجاوز وزنها الإجمالي المرخص به مع الحمولة 3.5 طن.",
      imagePath: "/types/categorie d.jpg",
      details: [
        "سيارات النقل العام للأشخاص (أكثر من 9 مقاعد)",
        "المركبات التي يتجاوز وزنها الإجمالي المرخص به مع الحمولة 3.5 طن",
        "تستخدم في النقل الجماعي للأشخاص"
      ],
      offers: [
        "مدرّبون محترفون ذوو خبرة في قيادة مركبات النقل الجماعي",
        "تجهيزات عصرية ومركبات نقل عام مخصّصة للتدريب",
        "مرافقة نفسية لزيادة ثقتك بنفسك في النقل الجماعي",
        "برنامج تدريبي متقدم مع 40 ساعة تدريب عملي"
      ],
      callToAction: "سجّل الآن، وابدأ رحلتك معنا لتحصل على رخصة قيادة مركبات النقل العام للأشخاص"
    },
    {
      id: "7",
      code: "E",
      nameAr: "رخصة E",
      nameFr: "Permis E",
      description: "رخصة E: السيارات من الصنف 'ب - ج - د' تجر مقطورة وزنها أكبر من 750 كلغ.",
      imagePath: "/types/categorie e.jpg",
      details: [
        "السيارات من الصنف ب التي تجر مقطورة وزنها أكبر من 750 كلغ",
        "السيارات من الصنف ج التي تجر مقطورة وزنها أكبر من 750 كلغ",
        "السيارات من الصنف د التي تجر مقطورة وزنها أكبر من 750 كلغ"
      ],
      offers: [
        "مدرّبون محترفون ذوو خبرة في قيادة المركبات مع المقطورات",
        "تجهيزات عصرية ومركبات مع مقطورات مخصّصة للتدريب",
        "مرافقة نفسية لزيادة ثقتك بنفسك في القيادة المعقدة",
        "برنامج تدريبي متخصص مع 15 ساعة تدريب عملي"
      ],
      callToAction: "سجّل الآن، وابدأ رحلتك معنا لتحصل على رخصة قيادة المركبات مع المقطورات"
    }
  ];
  
  localStorage.setItem(STORAGE_KEYS.LICENSE_TYPES, JSON.stringify(defaultTypes));
  return defaultTypes;
}

export function saveLicenseType(type: LicenseType): void {
  const types = getLicenseTypes();
  const index = types.findIndex((t) => t.id === type.id);
  if (index >= 0) {
    types[index] = type;
  } else {
    types.push({ ...type, id: Date.now().toString() });
  }
  localStorage.setItem(STORAGE_KEYS.LICENSE_TYPES, JSON.stringify(types));
}

export function deleteLicenseType(id: string): void {
  const types = getLicenseTypes();
  const filtered = types.filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEYS.LICENSE_TYPES, JSON.stringify(filtered));
}

// Articles
export function getArticles(): Article[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEYS.ARTICLES);
  if (data) return JSON.parse(data);
  
  // Initialize with default articles
  const defaultArticles: Article[] = [
    {
      id: "1",
      title: "أول حصة في السياقة: أهم درس وتمرين للمبتدئين",
      description: "دليل شامل للمبتدئين في أول حصة قيادة - تعرف على الأساسيات والتمارين المهمة التي يجب إتقانها",
      image: "/articles/teaching inside the car.png",
      slug: "first-driving-lesson",
      text: "محتوى المقال الكامل...",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "كل ما تحتاج معرفته للحصول على رخصة القيادة في سن 18",
      description: "دليل كامل للشباب الذين بلغوا 18 عاماً - المتطلبات، الخطوات، والنصائح المهمة",
      image: "/articles/guy wiht the car.png",
      slug: "getting-license-at-18",
      text: "محتوى المقال الكامل...",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "قوانين المرور الجديدة 2026 في الجزائر: ما الذي تغير؟",
      description: "تعرف على آخر التحديثات والتغييرات في قانون المرور الجزائري لعام 2026 وأهم النقاط",
      image: "/articles/new laws.jpg",
      slug: "new-traffic-laws-2026",
      text: "محتوى المقال الكامل...",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];
  
  localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(defaultArticles));
  return defaultArticles;
}

export function saveArticle(article: Article): void {
  const articles = getArticles();
  const index = articles.findIndex((a) => a.id === article.id);
  if (index >= 0) {
    articles[index] = { ...article, updatedAt: new Date().toISOString() };
  } else {
    articles.push({
      ...article,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
}

export function deleteArticle(id: string): void {
  const articles = getArticles();
  const filtered = articles.filter((a) => a.id !== id);
  localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(filtered));
}

// Settings
export function getSettings(): SiteSettings {
  if (typeof window === "undefined") {
    return {
      logo: "/images/logo auto echole lahcen.png",
      name: "مدرسة لحسن لتعليم السياقة - الوهرانية",
      description: "طريقك الآمن نحو رخصة القيادة - مدرسة معتمدة رسمياً لتعليم السياقة في وهران",
      formElements: {},
    };
  }
  
  const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  if (data) return JSON.parse(data);
  
  const defaultSettings: SiteSettings = {
    logo: "/images/logo auto echole lahcen.png",
    name: "مدرسة لحسن لتعليم السياقة - الوهرانية",
    description: "طريقك الآمن نحو رخصة القيادة - مدرسة معتمدة رسمياً لتعليم السياقة في وهران",
    formElements: {},
  };
  
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultSettings));
  return defaultSettings;
}

export function saveSettings(settings: SiteSettings): void {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}
