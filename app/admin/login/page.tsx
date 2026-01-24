"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, User } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        router.push("/admin/dashboard");
      } else {
        setError("اسم المستخدم أو كلمة المرور غير صحيحة");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative p-4" dir="rtl">
      {/* Light dotted pattern on one side */}
      <div
        className="absolute top-0 right-0 w-40 sm:w-56 md:w-72 h-full bg-dotted-pattern opacity-50 pointer-events-none"
        aria-hidden
      />
      <Card className="relative z-10 w-full max-w-md shadow-xl border-gray-200 bg-white">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-16 h-16 bg-[#DC2626] rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#57534E]">لوحة تحكم المدير</CardTitle>
          <CardDescription className="text-base text-[#78716C]">
            Panneau d'administration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-right text-[#57534E]">
                اسم المستخدم / Nom d'utilisateur
              </Label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#78716C]" />
                <Input
                  id="username"
                  type="text"
                  placeholder="أدخل اسم المستخدم"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pr-10 text-right"
                  required
                  dir="rtl"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-right text-[#57534E]">
                كلمة المرور / Mot de passe
              </Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#78716C]" />
                <Input
                  id="password"
                  type="password"
                  placeholder="أدخل كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 text-right"
                  required
                  dir="rtl"
                />
              </div>
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-[#DC2626] px-4 py-3 rounded-md text-sm text-right">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white"
              disabled={isLoading}
            >
              {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول / Se connecter"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-[#78716C]">
            <p>البيانات الافتراضية: admin / admin123</p>
            <p className="text-xs mt-1">Default: admin / admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
