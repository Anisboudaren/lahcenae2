import type { LicenseType, Article, FormSubmission, SiteSettings } from "./admin-data";

export type DbLicenseType = {
  id: string;
  code: string;
  name_ar: string;
  name_fr: string;
  description: string;
  image_path: string;
  details: string[];
  note: string | null;
  offers: string[];
  call_to_action: string;
  video_link: string | null;
  extra_images: string[];
  text: string | null;
  created_at: string;
  updated_at: string;
};

export type DbArticle = {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  video_link: string | null;
  text: string;
  created_at: string;
  updated_at: string;
};

export type DbFormSubmission = {
  id: string;
  license_type: string;
  national_id: string;
  name_ar: string;
  surname_ar: string;
  name_fr: string;
  surname_fr: string;
  gender: string;
  birth_date: string;
  birth_wilaya: string;
  birth_municipality: string;
  father_name: string;
  mother_name: string;
  mother_surname: string;
  address: string;
  marital_status: string;
  phone1: string;
  phone2: string | null;
  original_nationality: string;
  current_nationality: string;
  submitted_at: string;
};

export type DbSiteSettings = {
  id: string;
  logo: string;
  name: string;
  description: string;
  form_elements: Record<string, { label: string; required: boolean; visible: boolean }>;
  certificate_hero: string | null;
  certificate_badge: string | null;
  hero_banner: string | null;
  created_at: string;
  updated_at: string;
};

export function mapDbToLicenseType(db: DbLicenseType): LicenseType {
  return {
    id: db.id,
    code: db.code,
    nameAr: db.name_ar,
    nameFr: db.name_fr,
    description: db.description,
    imagePath: db.image_path,
    details: Array.isArray(db.details) ? db.details : [],
    note: db.note || undefined,
    offers: Array.isArray(db.offers) ? db.offers : [],
    callToAction: db.call_to_action,
    videoLink: db.video_link || undefined,
    extraImages: Array.isArray(db.extra_images) ? db.extra_images : [],
    text: db.text || undefined,
  };
}

export function mapDbToArticle(db: DbArticle): Article {
  return {
    id: db.id,
    title: db.title,
    description: db.description,
    image: db.image,
    slug: db.slug,
    videoLink: db.video_link || undefined,
    text: db.text,
    createdAt: db.created_at,
    updatedAt: db.updated_at,
  };
}

export function mapDbToFormSubmission(db: DbFormSubmission): FormSubmission {
  return {
    id: db.id,
    licenseType: db.license_type,
    nationalId: db.national_id,
    nameAr: db.name_ar,
    surnameAr: db.surname_ar,
    nameFr: db.name_fr,
    surnameFr: db.surname_fr,
    gender: db.gender,
    birthDate: db.birth_date,
    birthWilaya: db.birth_wilaya,
    birthMunicipality: db.birth_municipality,
    fatherName: db.father_name,
    motherName: db.mother_name,
    motherSurname: db.mother_surname,
    address: db.address,
    maritalStatus: db.marital_status,
    phone1: db.phone1,
    phone2: db.phone2 || undefined,
    originalNationality: db.original_nationality,
    currentNationality: db.current_nationality,
    submittedAt: db.submitted_at,
  };
}

export function mapDbToSiteSettings(db: DbSiteSettings): SiteSettings {
  return {
    logo: db.logo,
    name: db.name,
    description: db.description,
    formElements: db.form_elements || {},
  };
}
