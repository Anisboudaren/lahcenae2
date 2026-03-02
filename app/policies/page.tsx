"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, FileText, Lock, AlertCircle, Phone, Mail } from "lucide-react";

export default function PoliciesPage() {
  return (
    <main className="min-h-screen bg-white py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16 xl:px-20" dir="rtl">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#57534E] mb-4">
            السياسات والشروط
          </h1>
          <p className="text-lg md:text-xl text-[#78716C]">
            Politiques et conditions
          </p>
        </div>

        <div className="space-y-8">
          {/* Privacy Policy */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-6 h-6 text-[#DC2626]" />
                <CardTitle className="text-2xl text-[#57534E]">سياسة الخصوصية</CardTitle>
              </div>
              <CardDescription className="text-[#78716C]">Politique de confidentialité</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#57534E] leading-relaxed">
              <div>
                <h3 className="font-semibold text-lg mb-2">1. جمع المعلومات</h3>
                <p className="text-base">
                  نقوم بجمع المعلومات التي تقدمها لنا عند التسجيل في دوراتنا، بما في ذلك:
                </p>
                <ul className="list-disc list-inside mr-4 mt-2 space-y-1 text-[#78716C]">
                  <li>الاسم الكامل (بالعربية والفرنسية)</li>
                  <li>رقم بطاقة التعريف الوطنية</li>
                  <li>تاريخ ومكان الميلاد</li>
                  <li>معلومات الاتصال (الهاتف، العنوان)</li>
                  <li>نوع الرخصة المطلوبة</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2">2. استخدام المعلومات</h3>
                <p className="text-base">
                  نستخدم المعلومات التي نجمعها لـ:
                </p>
                <ul className="list-disc list-inside mr-4 mt-2 space-y-1 text-[#78716C]">
                  <li>معالجة طلبات التسجيل في دورات تعليم السياقة</li>
                  <li>التواصل معك بخصوص دوراتك ومواعيد التدريب</li>
                  <li>تحسين خدماتنا وتجربتك التعليمية</li>
                  <li>الامتثال للمتطلبات القانونية والتنظيمية</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2">3. حماية البيانات</h3>
                <p className="text-base">
                  نحن ملتزمون بحماية معلوماتك الشخصية. نستخدم تدابير أمنية مناسبة لمنع الوصول غير المصرح به أو الكشف عن معلوماتك.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2">4. مشاركة المعلومات</h3>
                <p className="text-base">
                  لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك فقط مع:
                </p>
                <ul className="list-disc list-inside mr-4 mt-2 space-y-1 text-[#78716C]">
                  <li>السلطات المختصة عند الحاجة القانونية</li>
                  <li>مقدمي الخدمات الذين يساعدوننا في تشغيل موقعنا (مع ضمان حماية بياناتك)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Terms of Service */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-6 h-6 text-[#DC2626]" />
                <CardTitle className="text-2xl text-[#57534E]">شروط الاستخدام</CardTitle>
              </div>
              <CardDescription className="text-[#78716C]">Conditions d'utilisation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#57534E] leading-relaxed">
              <div>
                <h3 className="font-semibold text-lg mb-2">1. القبول بالشروط</h3>
                <p className="text-base">
                  باستخدام موقعنا الإلكتروني وخدماتنا، أنت توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام خدماتنا.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2">2. التسجيل في الدورات</h3>
                <p className="text-base mb-2">
                  عند التسجيل في أي من دوراتنا، يجب أن:
                </p>
                <ul className="list-disc list-inside mr-4 mt-2 space-y-1 text-[#78716C]">
                  <li>تقدم معلومات دقيقة وكاملة</li>
                  <li>تكون مؤهلاً قانونياً للحصول على رخصة القيادة</li>
                  <li>تلتزم بجميع القوانين واللوائح المحلية</li>
                  <li>تتحمل مسؤولية دقة المعلومات المقدمة</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2">3. السلوك والالتزام</h3>
                <p className="text-base mb-2">
                  أثناء التدريب، يجب على الطلاب:
                </p>
                <ul className="list-disc list-inside mr-4 mt-2 space-y-1 text-[#78716C]">
                  <li>الالتزام بمواعيد الحصص المحددة</li>
                  <li>احترام المدربين والموظفين</li>
                  <li>اتباع جميع قواعد السلامة المرورية</li>
                  <li>الحضور بانتظام وإكمال جميع الساعات التدريبية المطلوبة</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2">4. الملكية الفكرية</h3>
                <p className="text-base">
                  جميع المحتويات الموجودة على هذا الموقع، بما في ذلك النصوص والصور والشعارات، هي ملك لمدرسة لحسن لتعليم السياقة ومحمية بموجب قوانين حقوق النشر.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Refund and Cancellation Policy */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="w-6 h-6 text-[#DC2626]" />
                <CardTitle className="text-2xl text-[#57534E]">سياسة الاسترجاع والإلغاء</CardTitle>
              </div>
              <CardDescription className="text-[#78716C]">Politique de remboursement et d'annulation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#57534E] leading-relaxed">
              <div>
                <h3 className="font-semibold text-lg mb-2">1. إلغاء التسجيل</h3>
                <p className="text-base mb-2">
                  يمكنك إلغاء تسجيلك في أي وقت قبل بدء الدورة. يرجى إبلاغنا كتابياً قبل 7 أيام على الأقل من تاريخ البدء المقرر.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2">2. الاسترجاع</h3>
                <p className="text-base mb-2">
                  في حالة الإلغاء قبل بدء الدورة:
                </p>
                <ul className="list-disc list-inside mr-4 mt-2 space-y-1 text-[#78716C]">
                  <li>الإلغاء قبل 14 يوم: استرجاع كامل للمبلغ المدفوع</li>
                  <li>الإلغاء قبل 7 أيام: استرجاع 50% من المبلغ المدفوع</li>
                  <li>الإلغاء بعد بدء الدورة: لا يوجد استرجاع</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2">3. حالات خاصة</h3>
                <p className="text-base">
                  في حالات خاصة مثل المرض أو الظروف الطارئة، قد ننظر في طلبات الاسترجاع على أساس كل حالة على حدة. يرجى التواصل معنا مباشرة لمناقشة وضعك.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2">4. إعادة الجدولة</h3>
                <p className="text-base">
                  يمكن إعادة جدولة مواعيد الحصص الفردية بشرط إبلاغنا قبل 24 ساعة على الأقل. قد تطبق رسوم إضافية على إعادة الجدولة المتكررة.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Lock className="w-6 h-6 text-[#DC2626]" />
                <CardTitle className="text-2xl text-[#57534E]">حماية البيانات</CardTitle>
              </div>
              <CardDescription className="text-[#78716C]">Protection des données</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#57534E] leading-relaxed">
              <div>
                <h3 className="font-semibold text-lg mb-2">1. حقوقك</h3>
                <p className="text-base mb-2">
                  لديك الحق في:
                </p>
                <ul className="list-disc list-inside mr-4 mt-2 space-y-1 text-[#78716C]">
                  <li>الوصول إلى معلوماتك الشخصية</li>
                  <li>تصحيح أي معلومات غير دقيقة</li>
                  <li>طلب حذف معلوماتك الشخصية</li>
                  <li>الاعتراض على معالجة بياناتك</li>
                  <li>طلب نقل بياناتك</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2">2. مدة الاحتفاظ بالبيانات</h3>
                <p className="text-base">
                  نحتفظ بمعلوماتك الشخصية طالما كانت ضرورية لتقديم خدماتنا والامتثال للالتزامات القانونية. بعد انتهاء هذه الفترة، سنقوم بحذف أو إخفاء معلوماتك بشكل آمن.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2">3. الأمان</h3>
                <p className="text-base">
                  نستخدم تقنيات أمنية متقدمة لحماية معلوماتك من الوصول غير المصرح به أو التغيير أو الكشف. ومع ذلك، لا يمكن ضمان الأمان الكامل لأي معلومات يتم نقلها عبر الإنترنت.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Phone className="w-6 h-6 text-[#DC2626]" />
                <CardTitle className="text-2xl text-[#57534E]">معلومات الاتصال</CardTitle>
              </div>
              <CardDescription className="text-[#78716C]">Informations de contact</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#57534E] leading-relaxed">
              <div>
                <p className="text-base mb-4">
                  إذا كان لديك أي أسئلة أو استفسارات حول سياساتنا، يرجى التواصل معنا:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#0EA5E9]" />
                    <a href="tel:05550496953" className="text-[#0EA5E9] hover:underline">
                      05 50 49 69 53
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#0EA5E9]" />
                    <a href="mailto:eurlloranie@gmail.com" className="text-[#0EA5E9] hover:underline">eurlloranie@gmail.com</a>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-[#78716C]">
                  آخر تحديث: {new Date().toLocaleDateString("ar-DZ", { year: "numeric", month: "long", day: "numeric" })}
                </p>
                <p className="text-sm text-[#78716C] mt-2">
                  نحتفظ بالحق في تحديث هذه السياسات في أي وقت. سيتم إشعارك بأي تغييرات جوهرية.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
