-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- form_submissions: mirrors FormSubmission from admin-data
CREATE TABLE form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  license_type TEXT NOT NULL,
  national_id TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  surname_ar TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  surname_fr TEXT NOT NULL,
  gender TEXT NOT NULL,
  birth_date DATE NOT NULL,
  birth_wilaya TEXT NOT NULL,
  birth_municipality TEXT NOT NULL,
  father_name TEXT NOT NULL,
  mother_name TEXT NOT NULL,
  mother_surname TEXT NOT NULL,
  address TEXT NOT NULL,
  marital_status TEXT NOT NULL,
  phone1 TEXT NOT NULL,
  phone2 TEXT,
  original_nationality TEXT NOT NULL,
  current_nationality TEXT NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- license_types: mirrors LicenseType from admin-data
CREATE TABLE license_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  name_ar TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  description TEXT NOT NULL,
  image_path TEXT NOT NULL,
  details JSONB NOT NULL DEFAULT '[]',
  note TEXT,
  offers JSONB NOT NULL DEFAULT '[]',
  call_to_action TEXT NOT NULL,
  video_link TEXT,
  extra_images JSONB DEFAULT '[]',
  text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- articles: mirrors Article from admin-data
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  video_link TEXT,
  text TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- site_settings: single-row config
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  logo TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  form_elements JSONB NOT NULL DEFAULT '{}',
  certificate_hero TEXT,
  certificate_badge TEXT,
  hero_banner TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ensure single row for site_settings (application-level convention; we use upsert)
-- No DB constraint; seed/API will upsert on fixed id or replace.

-- Enable RLS on all tables
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE license_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- form_submissions: service role only (no anon access)
CREATE POLICY "form_submissions_service_role_all"
  ON form_submissions FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- license_types: anon read; service_role full access
CREATE POLICY "license_types_anon_read"
  ON license_types FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "license_types_service_role_all"
  ON license_types FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- articles: anon read; service_role full access
CREATE POLICY "articles_anon_read"
  ON articles FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "articles_service_role_all"
  ON articles FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- site_settings: anon read; service_role full access
CREATE POLICY "site_settings_anon_read"
  ON site_settings FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "site_settings_service_role_all"
  ON site_settings FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Trigger to keep license_types.updated_at in sync
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER license_types_updated_at
  BEFORE UPDATE ON license_types
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
