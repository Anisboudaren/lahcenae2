import { config } from "dotenv";
import { readdir } from "fs/promises";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { ensureMediaBucket } from "../lib/storage";
import { processImage } from "../lib/image-pipeline";

config({ path: path.join(process.cwd(), ".env") });

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRET_KEY) in .env");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const PUBLIC_DIRS = ["articles", "certifciate", "images", "illustration", "types"] as const;
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif"]);

async function discoverImages(): Promise<string[]> {
  const publicRoot = path.join(process.cwd(), "public");
  const out: string[] = [];

  for (const dir of PUBLIC_DIRS) {
    const full = path.join(publicRoot, dir);
    try {
      await walk(full, dir, out);
    } catch (e) {
      console.warn(`Could not walk ${dir}:`, e);
    }
  }

  return out;
}

async function walk(dir: string, prefix: string, out: string[]): Promise<void> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const rel = `${prefix}/${e.name}`.replace(/\\/g, "/");
    if (e.isDirectory()) {
      await walk(path.join(dir, e.name), rel, out);
    } else if (e.isFile()) {
      const ext = path.extname(e.name).toLowerCase();
      if (IMAGE_EXT.has(ext)) out.push(rel);
    }
  }
}

function normalizeKey(p: string): string {
  return p.replace(/^\/+/, "").replace(/\\/g, "/");
}

const DEFAULT_LICENSE_TYPES = [
  { code: "A", nameAr: "رخصة A", nameFr: "Permis A", description: "رخصة A2: الدراجات النارية من الصنف ب (حجم الاسطوانة من 80 إلى 400 سم مكعب) والصنف ج (أكثر من 400 سم مكعب).", imagePath: "/types/categorie A.jpg", details: ["الدراجات النارية من الصنف ب: حجم الاسطوانة من 80 إلى 400 سم مكعب", "الدراجات النارية من الصنف ج: أكثر من 400 سم مكعب", "تسمح بقيادة جميع أنواع الدراجات النارية بدون قيود على حجم المحرك"], offers: ["مدرّبون محترفون ذوو خبرة في قيادة الدراجات النارية", "تجهيزات عصرية ودراجات نارية مخصّصة للتدريب", "مرافقة نفسية لزيادة ثقتك بنفسك على الطريق", "برنامج تدريبي شامل يتضمن التدريب النظري والعملي"], callToAction: "سجّل الآن، وابدأ رحلتك معنا لتحصل على رخصة قيادة الدراجات النارية من الصنف A2" },
  { code: "A1", nameAr: "رخصة A1", nameFr: "Permis A1", description: "رخصة A1: الدراجات النارية من الصنف أ (حجم الاسطوانة من 50 إلى 80 سنتمتر مكعب) والدراجات الثلاثية والرباعية العجلات (حجم الاسطوانة يساوي أو يقل عن 125 سم مكعب).", imagePath: "/types/categorie A1.jpg", details: ["الدراجات النارية من الصنف أ: حجم الاسطوانة من 50 إلى 80 سم مكعب", "الدراجات الثلاثية والرباعية العجلات: حجم الاسطوانة يساوي أو يقل عن 125 سم مكعب", "دراجات نارية خفيفة (Mobylettes, Scooters) مثل الكوكسي والاستايت"], note: "ملاحظة مهمة: رخص السيارات (الصنف B) أصبحت تخول لحاملها قانونيًا قيادة الدراجات النارية من الصنف A1 دون الحاجة لرخصة منفصلة، وفقًا لتحديثات قانون المرور في الجزائر.", offers: ["مدرّبون محترفون ذوو خبرة في قيادة الدراجات النارية الخفيفة", "تجهيزات عصرية ودراجات خفيفة مخصّصة للتدريب", "مرافقة نفسية لزيادة ثقتك بنفسك على الطريق", "برنامج تدريبي متكامل مناسب للمبتدئين"], callToAction: "سجّل الآن، وابدأ رحلتك معنا لتحصل على رخصة قيادة الدراجات النارية الخفيفة" },
  { code: "B", nameAr: "رخصة B", nameFr: "Permis B", description: "رخصة B: السيارات الأقل من 10 مقاعد وزنها الاجمالي مع الحمولة أقل من 3.5 طن.", imagePath: "/types/categorie b.jpg", details: ["السيارات الأقل من 10 مقاعد", "الوزن الإجمالي مع الحمولة أقل من 3.5 طن", "أكثر رخص السياقة شيوعًا"], note: "ملاحظة: حاملي رخصة B يمكنهم قيادة الدراجات النارية من الصنف A1 (حتى 125 سم مكعب) دون رخصة منفصلة.", offers: ["مدرّبون محترفون ذوو خبرة واسعة في تعليم قيادة السيارات", "تجهيزات عصرية وسيارات مخصّصة للتدريب", "مرافقة نفسية لزيادة ثقتك بنفسك خلف عجلة القيادة", "برنامج تدريبي شامل مع 20 ساعة تدريب عملي"], callToAction: "سجّل الآن، وابدأ رحلتك معنا لتحصل على رخصة قيادة السيارات" },
  { code: "C", nameAr: "رخصة C", nameFr: "Permis C", description: "رخصة C2: تسمح بقيادة مركبات نقل البضائع التي يتجاوز وزنها مع الحمولة 19 طن (مركبة منفردة) أو التي يتجاوز وزنها 12.5 طن (مركبة جارة لمجموعة مركبات أو مركبة متمفصلة).", imagePath: "/types/categorie c.jpg", details: ["مركبات نقل البضائع التي يتجاوز وزنها مع الحمولة 19 طن (مركبة منفردة)", "مركبات نقل البضائع التي يتجاوز وزنها 12.5 طن (مركبة جارة لمجموعة مركبات أو مركبة متمفصلة)"], offers: ["مدرّبون محترفون ذوو خبرة في قيادة الشاحنات الثقيلة", "تجهيزات عصرية ومركبات نقل مخصّصة للتدريب", "مرافقة نفسية لزيادة ثقتك بنفسك في القيادة التجارية", "برنامج تدريبي متقدم مع 30 ساعة تدريب عملي"], callToAction: "سجّل الآن، وابدأ رحلتك معنا لتحصل على رخصة قيادة مركبات نقل البضائع الثقيلة", videoLink: "https://www.youtube.com/embed/Ts3uwRAOiJw" },
  { code: "C1", nameAr: "رخصة C1", nameFr: "Permis C1", description: "رخصة C1: تسمح بقيادة المركبات المنفردة المخصصة لنقل البضائع التي يكون وزنها بين 3.5 طن و 19 طن.", imagePath: "/types/categorie c1.jpg", details: ["المركبات المنفردة المخصصة لنقل البضائع", "الوزن بين 3.5 طن و 19 طن", "تستخدم في النقل التجاري للمسافات المتوسطة"], offers: ["مدرّبون محترفون ذوو خبرة في قيادة مركبات النقل المتوسطة", "تجهيزات عصرية ومركبات نقل مخصّصة للتدريب", "مرافقة نفسية لزيادة ثقتك بنفسك في القيادة التجارية", "برنامج تدريبي شامل مع 25 ساعة تدريب عملي"], callToAction: "سجّل الآن، وابدأ رحلتك معنا لتحصل على رخصة قيادة مركبات نقل البضائع المتوسطة" },
  { code: "D", nameAr: "رخصة D", nameFr: "Permis D", description: "رخصة D: سيارات النقل العام للأشخاص (أكثر من 9 مقاعد)، أو التي يتجاوز وزنها الإجمالي المرخص به مع الحمولة 3.5 طن.", imagePath: "/types/categorie d.jpg", details: ["سيارات النقل العام للأشخاص (أكثر من 9 مقاعد)", "المركبات التي يتجاوز وزنها الإجمالي المرخص به مع الحمولة 3.5 طن", "تستخدم في النقل الجماعي للأشخاص"], offers: ["مدرّبون محترفون ذوو خبرة في قيادة مركبات النقل الجماعي", "تجهيزات عصرية ومركبات نقل عام مخصّصة للتدريب", "مرافقة نفسية لزيادة ثقتك بنفسك في النقل الجماعي", "برنامج تدريبي متقدم مع 40 ساعة تدريب عملي"], callToAction: "سجّل الآن، وابدأ رحلتك معنا لتحصل على رخصة قيادة مركبات النقل العام للأشخاص" },
  { code: "E", nameAr: "رخصة E", nameFr: "Permis E", description: "رخصة E: السيارات من الصنف 'ب - ج - د' تجر مقطورة وزنها أكبر من 750 كلغ.", imagePath: "/types/categorie e.jpg", details: ["السيارات من الصنف ب التي تجر مقطورة وزنها أكبر من 750 كلغ", "السيارات من الصنف ج التي تجر مقطورة وزنها أكبر من 750 كلغ", "السيارات من الصنف د التي تجر مقطورة وزنها أكبر من 750 كلغ"], offers: ["مدرّبون محترفون ذوو خبرة في قيادة المركبات مع المقطورات", "تجهيزات عصرية ومركبات مع مقطورات مخصّصة للتدريب", "مرافقة نفسية لزيادة ثقتك بنفسك في القيادة المعقدة", "برنامج تدريبي متخصص مع 15 ساعة تدريب عملي"], callToAction: "سجّل الآن، وابدأ رحلتك معنا لتحصل على رخصة قيادة المركبات مع المقطورات" },
];

const DEFAULT_ARTICLES = [
  { title: "أول حصة في السياقة: أهم درس وتمرين للمبتدئين", description: "دليل شامل للمبتدئين في أول حصة قيادة - تعرف على الأساسيات والتمارين المهمة التي يجب إتقانها", image: "/articles/teaching inside the car.png", slug: "first-driving-lesson", text: "محتوى المقال الكامل..." },
  { title: "كل ما تحتاج معرفته للحصول على رخصة القيادة في سن 18", description: "دليل كامل للشباب الذين بلغوا 18 عاماً - المتطلبات، الخطوات، والنصائح المهمة", image: "/articles/guy wiht the car.png", slug: "getting-license-at-18", text: "محتوى المقال الكامل..." },
  { title: "قوانين المرور الجديدة 2026 في الجزائر: ما الذي تغير؟", description: "تعرف على آخر التحديثات والتغييرات في قانون المرور الجزائري لعام 2026 وأهم النقاط", image: "/articles/new laws.jpg", slug: "new-traffic-laws-2026", text: "محتوى المقال الكامل..." },
];

const DEFAULT_SETTINGS = {
  logo: "/images/logo auto echole lahcen.png",
  name: "مدرسة لحسن لتعليم السياقة - الوهرانية",
  description: "طريقك الآمن نحو رخصة القيادة - مدرسة معتمدة رسمياً لتعليم السياقة في وهران",
  formElements: {} as Record<string, { label: string; required: boolean; visible: boolean }>,
};

const SITE_SETTINGS_ID = "00000000-0000-0000-0000-000000000001";

async function main(): Promise<void> {
  const log = (msg: string) => console.warn("[seed]", msg);

  console.log("Ensuring media bucket...");
  await ensureMediaBucket(supabase);

  console.log("Discovering images in public/...");
  const relativePaths = await discoverImages();
  console.log(`Found ${relativePaths.length} images.`);

  const publicRoot = path.join(process.cwd(), "public");
  const pathToUrl = new Map<string, string>();
  const failed: string[] = [];

  for (const rel of relativePaths) {
    const abs = path.join(publicRoot, rel);
    const url = await processImage(abs, rel, supabase, log);
    if (url) {
      pathToUrl.set(normalizeKey(rel), url);
    } else {
      failed.push(rel);
    }
  }

  if (failed.length) {
    console.warn(`Failed to process ${failed.length} images:`, failed);
  }
  console.log(`Uploaded ${pathToUrl.size} images.`);

  function resolveImage(entityPath: string): string {
    const key = normalizeKey(entityPath);
    const url = pathToUrl.get(key);
    if (url) return url;
    log(`No URL for image: ${entityPath}, keeping original.`);
    return entityPath;
  }

  function resolveOptional(entityPath: string): string | null {
    const key = normalizeKey(entityPath);
    return pathToUrl.get(key) ?? null;
  }

  console.log("Upserting license_types...");
  for (const row of DEFAULT_LICENSE_TYPES) {
    const { error } = await supabase.from("license_types").upsert(
      {
        code: row.code,
        name_ar: row.nameAr,
        name_fr: row.nameFr,
        description: row.description,
        image_path: resolveImage(row.imagePath),
        details: row.details,
        note: row.note ?? null,
        offers: row.offers,
        call_to_action: row.callToAction,
        video_link: row.videoLink ?? null,
        extra_images: [],
        text: null,
      },
      { onConflict: "code" }
    );
    if (error) {
      log(`license_types upsert ${row.code}: ${error.message}`);
    }
  }

  console.log("Upserting articles...");
  for (const row of DEFAULT_ARTICLES) {
    const { error } = await supabase.from("articles").upsert(
      {
        title: row.title,
        description: row.description,
        image: resolveImage(row.image),
        slug: row.slug,
        video_link: null,
        text: row.text,
      },
      { onConflict: "slug" }
    );
    if (error) {
      log(`articles upsert ${row.slug}: ${error.message}`);
    }
  }

  const logoUrl = resolveImage(DEFAULT_SETTINGS.logo);
  const certHero = resolveOptional("certifciate/guy handing out the certifcate.png");
  const certBadge = resolveOptional("certifciate/image.png");
  const heroBanner = resolveOptional("types/hero section 2.jpg");

  console.log("Upserting site_settings...");
  const { error: settingsErr } = await supabase.from("site_settings").upsert(
    {
      id: SITE_SETTINGS_ID,
      logo: logoUrl,
      name: DEFAULT_SETTINGS.name,
      description: DEFAULT_SETTINGS.description,
      form_elements: DEFAULT_SETTINGS.formElements,
      certificate_hero: certHero,
      certificate_badge: certBadge,
      hero_banner: heroBanner,
    },
    { onConflict: "id" }
  );
  if (settingsErr) {
    log(`site_settings upsert: ${settingsErr.message}`);
  }

  console.log("Seed done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
