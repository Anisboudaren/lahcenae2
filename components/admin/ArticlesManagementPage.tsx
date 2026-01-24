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
import { Plus, Edit, Trash2, Image as ImageIcon, Video } from "lucide-react";
import {
  getArticles,
  deleteArticle,
  type Article,
} from "@/lib/admin-data";

export function ArticlesManagementPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    setArticles(getArticles());
  }, []);

  const handleEdit = (article: Article) => {
    router.push(`/admin/articles/${article.id}/edit`);
  };

  const handleAddNew = () => {
    router.push("/admin/articles/new/edit");
  };

  const handleDelete = (id: string) => {
    deleteArticle(id);
    setArticles(getArticles());
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-[#57534E]">إدارة المقالات</CardTitle>
              <CardDescription className="text-[#78716C]">
                Gestion des articles
              </CardDescription>
            </div>
            <Button
              onClick={handleAddNew}
              className="w-full sm:w-auto bg-[#DC2626] hover:bg-[#B91C1C] text-white h-10"
            >
              <Plus className="w-4 h-4 ml-2 shrink-0" />
              إضافة مقال جديد
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border border-gray-200 rounded-lg overflow-x-auto overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">العنوان</TableHead>
                  <TableHead className="text-right">الوصف</TableHead>
                  <TableHead className="text-right">الصورة</TableHead>
                  <TableHead className="text-right">فيديو</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-[#78716C]">
                      لا توجد مقالات
                    </TableCell>
                  </TableRow>
                ) : (
                  articles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium text-[#57534E]">
                        {article.title}
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-[#78716C]">
                        {article.description}
                      </TableCell>
                      <TableCell>
                        {article.image ? (
                          <ImageIcon className="w-4 h-4 text-[#0EA5E9]" />
                        ) : (
                          <span className="text-[#78716C]">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {article.videoLink ? (
                          <Video className="w-4 h-4 text-[#0EA5E9]" />
                        ) : (
                          <span className="text-[#78716C]">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-[#78716C]">
                        {new Date(article.createdAt).toLocaleDateString("ar-DZ")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(article)}
                            className="text-[#0EA5E9] hover:bg-sky-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-[#DC2626] hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertContent dir="rtl">
                              <AlertDialogHeader>
                                <AlertDialogTitle>حذف المقال</AlertDialogTitle>
                                <AlertDialogDescription>
                                  هل أنت متأكد من حذف هذا المقال؟ لا يمكن التراجع
                                  عن هذا الإجراء.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(article.id)}
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
