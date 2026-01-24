import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const supabase = createServerClient();
  const body = await request.json();
  const {
    licenseType,
    nationalId,
    nameAr,
    surnameAr,
    nameFr,
    surnameFr,
    gender,
    birthDate,
    birthWilaya,
    birthMunicipality,
    fatherName,
    motherName,
    motherSurname,
    address,
    maritalStatus,
    phone1,
    phone2,
    originalNationality,
    currentNationality,
  } = body;

  const { data, error } = await supabase.from("form_submissions").insert({
    license_type: licenseType,
    national_id: nationalId,
    name_ar: nameAr,
    surname_ar: surnameAr,
    name_fr: nameFr,
    surname_fr: surnameFr,
    gender,
    birth_date: birthDate,
    birth_wilaya: birthWilaya,
    birth_municipality: birthMunicipality,
    father_name: fatherName,
    mother_name: motherName,
    mother_surname: motherSurname,
    address,
    marital_status: maritalStatus,
    phone1,
    phone2: phone2 || null,
    original_nationality: originalNationality,
    current_nationality: currentNationality,
  }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
