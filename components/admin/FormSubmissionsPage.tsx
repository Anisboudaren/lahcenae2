"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Trash2, Eye } from "lucide-react";
import { getFormSubmissions, deleteFormSubmission, type FormSubmission } from "@/lib/admin-data";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function FormSubmissionsPage() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>(getFormSubmissions());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLicense, setFilterLicense] = useState<string>("all");
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const matchesSearch =
        sub.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.nameFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.nationalId.includes(searchTerm) ||
        sub.phone1.includes(searchTerm);
      
      const matchesLicense = filterLicense === "all" || sub.licenseType === filterLicense;
      
      return matchesSearch && matchesLicense;
    });
  }, [submissions, searchTerm, filterLicense]);

  const handleDelete = (id: string) => {
    deleteFormSubmission(id);
    setSubmissions(getFormSubmissions());
  };

  const handleView = (submission: FormSubmission) => {
    setSelectedSubmission(submission);
    setIsViewDialogOpen(true);
  };

  const uniqueLicenseTypes = Array.from(new Set(submissions.map((s) => s.licenseType)));

  return (
    <div className="space-y-6">
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-[#57534E]">إدارة الاستمارات المقدمة</CardTitle>
          <CardDescription className="text-[#78716C]">Gestion des formulaires soumis</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
            <div className="relative flex-1 w-full">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78716C]" />
              <Input
                placeholder="بحث بالاسم، الرقم الوطني، أو الهاتف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 text-right bg-white border-gray-200"
                dir="rtl"
              />
            </div>
            <select
              value={filterLicense}
              onChange={(e) => setFilterLicense(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 sm:py-2 border border-gray-200 rounded-md text-right bg-white"
              dir="rtl"
            >
              <option value="all">جميع الأصناف</option>
              {uniqueLicenseTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-sm text-[#78716C]">إجمالي الاستمارات</p>
              <p className="text-2xl font-bold text-[#DC2626]">{submissions.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-sm text-[#78716C]">المعروضة</p>
              <p className="text-2xl font-bold text-[#0EA5E9]">{filteredSubmissions.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-sm text-[#78716C]">الأصناف المختلفة</p>
              <p className="text-2xl font-bold text-[#57534E]">{uniqueLicenseTypes.length}</p>
            </div>
          </div>

          {/* Table */}
          <div className="border border-gray-200 rounded-lg overflow-x-auto overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الاسم</TableHead>
                  <TableHead className="text-right">نوع الرخصة</TableHead>
                  <TableHead className="text-right">الهاتف</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      لا توجد استمارات
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">
                        {submission.nameAr} {submission.surnameAr}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{submission.licenseType}</Badge>
                      </TableCell>
                      <TableCell>{submission.phone1}</TableCell>
                      <TableCell>
                        {new Date(submission.submittedAt).toLocaleDateString("ar-DZ")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(submission)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-[#DC2626] hover:bg-red-50">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent dir="rtl">
                              <AlertDialogHeader>
                                <AlertDialogTitle>حذف الاستمارة</AlertDialogTitle>
                                <AlertDialogDescription>
                                  هل أنت متأكد من حذف هذه الاستمارة؟ لا يمكن التراجع عن هذا الإجراء.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(submission.id)}
                                  className="bg-[#DC2626] hover:bg-[#B91C1C]"
                                >
                                  حذف
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
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

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle>تفاصيل الاستمارة</DialogTitle>
            <DialogDescription>معلومات كاملة عن الاستمارة المقدمة</DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm font-medium text-gray-500">نوع الرخصة</p>
                <p className="text-base">{selectedSubmission.licenseType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">الرقم الوطني</p>
                <p className="text-base">{selectedSubmission.nationalId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">الاسم بالعربية</p>
                <p className="text-base">{selectedSubmission.nameAr} {selectedSubmission.surnameAr}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">الاسم بالفرنسية</p>
                <p className="text-base">{selectedSubmission.nameFr} {selectedSubmission.surnameFr}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">الجنس</p>
                <p className="text-base">{selectedSubmission.gender}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">تاريخ الميلاد</p>
                <p className="text-base">{selectedSubmission.birthDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">مكان الميلاد</p>
                <p className="text-base">{selectedSubmission.birthWilaya} - {selectedSubmission.birthMunicipality}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">اسم الأب</p>
                <p className="text-base">{selectedSubmission.fatherName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">اسم الأم</p>
                <p className="text-base">{selectedSubmission.motherName} {selectedSubmission.motherSurname}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">العنوان</p>
                <p className="text-base">{selectedSubmission.address}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">الحالة المدنية</p>
                <p className="text-base">{selectedSubmission.maritalStatus}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">الهاتف 1</p>
                <p className="text-base">{selectedSubmission.phone1}</p>
              </div>
              {selectedSubmission.phone2 && (
                <div>
                  <p className="text-sm font-medium text-gray-500">الهاتف 2</p>
                  <p className="text-base">{selectedSubmission.phone2}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-500">الجنسية الأصلية</p>
                <p className="text-base">{selectedSubmission.originalNationality}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">الجنسية الحالية</p>
                <p className="text-base">{selectedSubmission.currentNationality}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-500">تاريخ الإرسال</p>
                <p className="text-base">
                  {new Date(selectedSubmission.submittedAt).toLocaleString("ar-DZ")}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
