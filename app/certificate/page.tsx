"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Award, CheckCircle, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function CertificatePage() {
  const phoneNumber = "0550496953";
  const whatsappNumber = "+213550496953";

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      <section className="relative w-full">
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <Image
            src="/certifciate/guy handing out the certifcate.png"
            alt="شهادة الكفاءة المهنية"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto max-w-7xl px-6 md:px-12 lg:px-16 xl:px-20 pb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                الشهادات <span className="text-sky-400">المهنية</span> للسائقين
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                احصل على التأهيل المهني اللازم للعمل كسائق محترف في مجال النقل التجاري
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="container mx-auto max-w-4xl">
          
          {/* Introduction */}
          <div className="text-right mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              الشهادة المهنية للسائقين هي وثيقة رسمية إلزامية تمنحها السلطات المختصة للسائقين الراغبين في ممارسة نشاط النقل التجاري. تعتبر هذه الشهادة ضرورية للعمل في مجال نقل الأشخاص أو البضائع أو المواد الخطرة، وهي تثبت أن حاملها قد تلقى التكوين اللازم وأصبح مؤهلاً لممارسة هذه المهنة بشكل آمن ومهني.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              في مدرسة لحسن لتعليم السياقة، نقدم برامج تكوين شاملة ومكثفة للحصول على الشهادات المهنية المختلفة، مع ضمان جودة التدريب والالتزام بجميع المعايير القانونية المطلوبة.
            </p>
          </div>

          {/* Training Duration Section */}
          <div className="bg-gradient-to-l from-sky-50 to-white rounded-lg p-8 md:p-10 mb-12 border-r-4 border-sky-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-sky-500 rounded-full p-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">مدة التكوين</h2>
            </div>
            <div className="space-y-4 text-right">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-2">نقل الأشخاص</h3>
                <p className="text-gray-700 text-lg">
                  <span className="text-sky-500 font-bold">11 يوماً</span> من التكوين المكثف
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-2">نقل البضائع</h3>
                <p className="text-gray-700 text-lg">
                  <span className="text-sky-500 font-bold">11 يوماً</span> من التكوين المكثف
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-2">نقل المواد الخطرة</h3>
                <p className="text-gray-700 text-lg">
                  <span className="text-sky-500 font-bold">06 أيام</span> من التكوين المكثف
                </p>
              </div>
            </div>
          </div>

          {/* Admission Requirements */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-sky-500 rounded-full p-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">شروط الالتحاق</h2>
            </div>
            
            <div className="space-y-6">
              {/* General Requirements */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">المتطلبات العامة</h3>
                <ul className="space-y-3 text-right">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-sky-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">شهادة طبية (طب عام - طب العيون)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-sky-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">رخصة السياقة في الصنف المطلوب</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-sky-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">شهادة مدرسية تثبت المستوى الأكاديمي</span>
                  </li>
                </ul>
              </div>

              {/* Specific Requirements by Type */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white border-2 border-sky-100 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-sky-500" />
                    نقل الأشخاص
                  </h4>
                  <p className="text-gray-700">
                    رخصة القيادة فئة <span className="font-bold text-sky-500">(د)</span>
                  </p>
                </div>
                <div className="bg-white border-2 border-sky-100 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-sky-500" />
                    نقل البضائع
                  </h4>
                  <p className="text-gray-700">
                    فئة رخصة القيادة <span className="font-bold text-sky-500">(C1، C2، E)</span>
                  </p>
                </div>
                <div className="bg-white border-2 border-sky-100 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-sky-500" />
                    نقل المواد الخطرة
                  </h4>
                  <p className="text-gray-700">
                    فئة رخصة القيادة <span className="font-bold text-sky-500">(C1، C2، E)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Image */}
          <div className="mb-12">
            <div className="bg-gradient-to-l from-sky-50 to-white rounded-lg p-8 border-r-4 border-sky-500">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-right">
                نموذج الشهادة المهنية
              </h2>
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/certifciate/image.png"
                  alt="نموذج الشهادة المهنية"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Specialized Certificate */}
          <div className="bg-sky-50 rounded-lg p-8 md:p-10 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-sky-500 rounded-full p-3">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                الشهادة المهنية المتخصصة في نقل البضائع
              </h2>
            </div>
            <div className="text-right space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg">
                الشهادة المهنية المتخصصة في نقل البضائع هي شهادة إضافية تمكن السائق من العمل في مجال النقل التجاري للبضائع بكفاءة عالية. تتضمن هذه الشهادة تكويناً متخصصاً في:
              </p>
              <ul className="space-y-3 mr-6">
                <li className="flex items-start gap-3">
                  <span className="text-sky-500 font-bold mt-1">•</span>
                  <span>قواعد السلامة في نقل البضائع</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sky-500 font-bold mt-1">•</span>
                  <span>التعامل مع أنواع مختلفة من البضائع</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sky-500 font-bold mt-1">•</span>
                  <span>إدارة وتنظيم عمليات النقل</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sky-500 font-bold mt-1">•</span>
                  <span>القوانين والأنظمة المتعلقة بالنقل التجاري</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-right">
              فوائد الحصول على الشهادة المهنية
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border-l-4 border-sky-500 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">فرص عمل واسعة</h3>
                <p className="text-gray-700">
                  تفتح الشهادة المهنية آفاقاً واسعة للعمل في الشركات الكبرى وشركات النقل التجاري
                </p>
              </div>
              <div className="bg-white border-l-4 border-sky-500 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">مطلب قانوني</h3>
                <p className="text-gray-700">
                  الشهادة المهنية مطلوبة قانونياً للعمل في مجال النقل التجاري في الجزائر
                </p>
              </div>
              <div className="bg-white border-l-4 border-sky-500 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">مهارات متخصصة</h3>
                <p className="text-gray-700">
                  التكوين يمنحك المهارات والمعرفة المتخصصة اللازمة للعمل باحترافية
                </p>
              </div>
              <div className="bg-white border-l-4 border-sky-500 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">دخل أفضل</h3>
                <p className="text-gray-700">
                  السائقون الحاصلون على الشهادة المهنية يحصلون على رواتب أفضل ومزايا أكثر
                </p>
              </div>
            </div>
          </div>

          {/* Training Program Details */}
          <div className="bg-gray-50 rounded-lg p-8 md:p-10 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-right">
              برنامج التكوين
            </h2>
            <div className="space-y-6 text-right">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">المحتوى النظري</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  يتضمن البرنامج النظري دروساً شاملة حول قواعد المرور، قوانين النقل التجاري، السلامة الطرقية، إدارة الحمولات، الصيانة الوقائية للمركبات، وأخلاقيات المهنة. يتم تقديم المحتوى النظري من قبل مدربين مؤهلين وذوي خبرة.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">التطبيق العملي</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  يشمل البرنامج العملي تدريبات مكثفة على القيادة الآمنة، التعامل مع الحمولات المختلفة، التخطيط لرحلات النقل، وإدارة المواقف الطارئة. يتم التدريب على مركبات حديثة ومجهزة بجميع المعدات اللازمة.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">الامتحان النهائي</h3>
                <p className="text-gray-700 leading-relaxed">
                  في نهاية التكوين، يخضع المتدربون لامتحان شامل يتضمن اختباراً نظرياً واختباراً عملياً. النجاح في الامتحان يؤهل للحصول على الشهادة المهنية المعتمدة من السلطات المختصة.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ابدأ رحلتك المهنية اليوم
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              سجل الآن في برنامج التكوين للحصول على الشهادة المهنية وافتح آفاقاً جديدة لمسيرتك المهنية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                className="bg-white text-sky-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-lg"
              >
                <Link href="/signup">
                  سجل الآن
                </Link>
              </Button>
              <div className="flex gap-4">
                <a
                  href={`tel:${phoneNumber}`}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  اتصل بنا
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  واتساب
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
