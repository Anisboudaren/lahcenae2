"use client";

import { GraduationCap, UsersRound, Award } from "lucide-react";

export function Stats2() {
  const stats = [
    {
      number: "500+",
      label: "طالب سنوياً",
      description: "عدد الطلاب المسجلين كل سنة",
      icon: GraduationCap
    },
    {
      number: "20+",
      label: "مدرب محترف",
      description: "عدد المدربين المعتمدين",
      icon: UsersRound
    },
    {
      number: "15+",
      label: "سنة خبرة",
      description: "سنوات من الخبرة في التدريب",
      icon: Award
    }
  ];

  return (
    <section 
      className="relative w-full py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16 xl:px-20"
      style={{
        borderRadius: '200px 0px',
        background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgb(23 117 159 / 0%) 10px, rgb(14 165 233 / 28%) 20px), repeating-linear-gradient(-45deg, transparent, transparent 10px, rgb(14 165 233 / 38%) 10px, rgba(14, 165, 233, 0.03) 20px)'
      }}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-sky-500 rounded-lg p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-center"
              >
                <div>
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full border-4 border-white p-3 md:p-4 flex items-center justify-center">
                      <Icon className="w-10 h-10 md:w-14 md:h-14 text-white" />
                    </div>
                  </div>
                  <div className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-1">
                    {stat.label}
                  </div>
                  <div className="text-[10px] md:text-xs text-white/90">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
