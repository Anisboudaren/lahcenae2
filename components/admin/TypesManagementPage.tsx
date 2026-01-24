"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent as AlertContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Image as ImageIcon, Video } from "lucide-react";
import type { LicenseType } from "@/lib/admin-data";

type DbLicenseType = {
  id: string;
  code: string;
  name_ar: string;
  name_fr: string;
  image_path: string;
  video_link: string | null;
  [key: string]: any;
};

function mapDbToLicenseType(db: DbLicenseType): LicenseType {
  return {
    id: db.id,
    code: db.code,
    nameAr: db.name_ar,
    nameFr: db.name_fr,
    description: db.description || "",
    imagePath: db.image_path,
    details: Array.isArray(db.details) ? db.details : [],
    note: db.note || undefined,
    offers: Array.isArray(db.offers) ? db.offers : [],
    callToAction: db.call_to_action || "",
    videoLink: db.video_link || undefined,
    extraImages: Array.isArray(db.extra_images) ? db.extra_images : [],
    text: db.text || undefined,
  };
}

export function TypesManagementPage() {
  const router = useRouter();
  const [types, setTypes] = useState<LicenseType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTypes();
  }, []);

  async function fetchTypes() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/license-types");
      if (!res.ok) throw new Error("Failed to fetch");
      const data: DbLicenseType[] = await res.json();
      setTypes(data.map(mapDbToLicenseType));
    } catch (e) {
      console.error("Failed to fetch license types:", e);
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (type: LicenseType) => {
    router.push(`/admin/types/${type.id}/edit`);
  };

  const handleAddNew = () => {
    router.push("/admin/types/new/edit");
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/license-types?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      await fetchTypes();
    } catch (e) {
      console.error("Failed to delete:", e);
      alert("فشل حذف الصنف");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-[#57534E]">إدارة أصناف الرخص</CardTitle>
              <CardDescription className="text-[#78716C]">Gestion des types de permis</CardDescription>
            </div>
            <Button onClick={handleAddNew} className="w-full sm:w-auto bg-[#DC2626] hover:bg-[#B91C1C] text-white h-10">
              <Plus className="w-4 h-4 ml-2 shrink-0" />
              إضافة صنف جديد
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الكود</TableHead>
                  <TableHead className="text-right">الاسم (عربي)</TableHead>
                  <TableHead className="text-right">الاسم (فرنسي)</TableHead>
                  <TableHead className="text-right">الصورة</TableHead>
                  <TableHead className="text-right">فيديو</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      جاري التحميل...
                    </TableCell>
                  </TableRow>
                ) : types.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      لا توجد أصناف
                    </TableCell>
                  </TableRow>
                ) : (
                  types.map((type) => (
                    <TableRow key={type.id}>
                      <TableCell className="font-medium">{type.code}</TableCell>
                      <TableCell>{type.nameAr}</TableCell>
                      <TableCell>{type.nameFr}</TableCell>
                      <TableCell>
                        {type.imagePath ? (
                          <ImageIcon className="w-4 h-4 text-[#0EA5E9]" />
                        ) : (
                          <span className="text-[#78716C]">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {type.videoLink ? (
                          <Video className="w-4 h-4 text-[#0EA5E9]" />
                        ) : (
                          <span className="text-[#78716C]">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(type)}
                            className="text-[#0EA5E9] hover:bg-blue-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-[#DC2626] hover:bg-red-50">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertContent dir="rtl">
                              <AlertDialogHeader>
                                <AlertDialogTitle>حذف الصنف</AlertDialogTitle>
                                <AlertDialogDescription>
                                  هل أنت متأكد من حذف هذا الصنف؟ لا يمكن التراجع عن هذا الإجراء.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(type.id)}
                                  className="bg-[#DC2626] hover:bg-[#B91C1C]"
                                >
                                  حذف
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
