"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, FileText, Tag, BookOpen, Settings } from "lucide-react";
import { FormSubmissionsPage } from "@/components/admin/FormSubmissionsPage";
import { TypesManagementPage } from "@/components/admin/TypesManagementPage";
import { ArticlesManagementPage } from "@/components/admin/ArticlesManagementPage";
import { SettingsPage } from "@/components/admin/SettingsPage";

export default function AdminDashboard() {
  const { logout } = useAdminAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("submissions");

  // Sync tab with URL query
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["submissions", "types", "articles", "settings"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-white relative" dir="rtl">
      {/* Light dotted pattern on one side (right for RTL) */}
      <div
        className="absolute top-0 right-0 w-48 md:w-64 lg:w-80 h-full bg-dotted-pattern opacity-50 pointer-events-none"
        aria-hidden
      />

      {/* Header */}
      <header className="relative bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#57534E]">لوحة تحكم المدير</h1>
              <p className="text-xs sm:text-sm text-[#78716C] mt-0.5">Panneau d'administration</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full sm:w-auto flex items-center justify-center gap-2 border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white h-10 sm:h-9"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap w-full mb-6 sm:mb-8 bg-white border border-gray-200 rounded-xl p-1.5 gap-1.5 !h-auto min-h-0 [&>button]:flex-1 [&>button]:min-w-[calc(50%-0.375rem)] sm:[&>button]:min-w-0">
            <TabsTrigger
              value="submissions"
              className="inline-flex items-center justify-center gap-2 min-h-11 sm:min-h-9 px-4 py-2.5 sm:py-2 text-sm rounded-lg text-[#78716C] hover:text-[#57534E] data-[state=active]:bg-sky-50 data-[state=active]:text-sky-600 data-[state=active]:border data-[state=active]:border-sky-200 data-[state=active]:shadow-sm"
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span className="hidden md:inline">الاستمارات</span>
            </TabsTrigger>
            <TabsTrigger
              value="types"
              className="inline-flex items-center justify-center gap-2 min-h-11 sm:min-h-9 px-4 py-2.5 sm:py-2 text-sm rounded-lg text-[#78716C] hover:text-[#57534E] data-[state=active]:bg-sky-50 data-[state=active]:text-sky-600 data-[state=active]:border data-[state=active]:border-sky-200 data-[state=active]:shadow-sm"
            >
              <Tag className="w-4 h-4 shrink-0" />
              <span className="hidden md:inline">الأصناف</span>
            </TabsTrigger>
            <TabsTrigger
              value="articles"
              className="inline-flex items-center justify-center gap-2 min-h-11 sm:min-h-9 px-4 py-2.5 sm:py-2 text-sm rounded-lg text-[#78716C] hover:text-[#57534E] data-[state=active]:bg-sky-50 data-[state=active]:text-sky-600 data-[state=active]:border data-[state=active]:border-sky-200 data-[state=active]:shadow-sm"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span className="hidden md:inline">المقالات</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="inline-flex items-center justify-center gap-2 min-h-11 sm:min-h-9 px-4 py-2.5 sm:py-2 text-sm rounded-lg text-[#78716C] hover:text-[#57534E] data-[state=active]:bg-sky-50 data-[state=active]:text-sky-600 data-[state=active]:border data-[state=active]:border-sky-200 data-[state=active]:shadow-sm"
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span className="hidden md:inline">الإعدادات</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submissions" className="mt-0">
            <FormSubmissionsPage />
          </TabsContent>

          <TabsContent value="types" className="mt-0">
            <TypesManagementPage />
          </TabsContent>

          <TabsContent value="articles" className="mt-0">
            <ArticlesManagementPage />
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <SettingsPage />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
