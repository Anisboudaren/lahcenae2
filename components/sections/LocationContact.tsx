"use client";

import { MapPin } from "lucide-react";

const locations = [
  {
    id: 1,
    city: "وهران",
    title: "عنوان وهران",
    mapUrl: "https://maps.app.goo.gl/YbTYkQGGLxx8VqoD9"
  },
  {
    id: 2,
    city: "غليزان",
    title: "عنوان غليزان",
    mapUrl: "https://maps.app.goo.gl/zcjz194YDLAgiXHL8"
  }
];

export function LocationContact() {
  return (
    <section id="locations" className="relative w-full bg-white py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16 xl:px-20">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-right mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            <span className="text-sky-500">زورونا</span> في مكاتبنا أو اتصلوا بنا لمزيد من المعلومات
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            نحن في خدمتكم في أي وقت
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {locations.map((location) => (
            <div
              key={location.id}
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100"
            >
              {/* Map Container */}
              <div className="relative w-full h-[400px] md:h-[500px]">
                {/* Embedded Map - Using Google Maps search */}
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(location.city + ', Algeria')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`موقع ${location.city}`}
                  className="absolute inset-0 w-full h-full"
                />
                
                {/* Blue Gradient Overlay from Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-sky-500/40 via-sky-500/20 to-transparent pointer-events-none z-10" />
                
                {/* Location Info Overlay - Bottom Right */}
                <div className="absolute bottom-4 right-4 flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg z-20">
                  <div className="bg-sky-500 rounded-full p-2 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">
                      {location.city}
                    </h3>
                    <p className="text-sm md:text-base text-gray-700">
                      {location.title}
                    </p>
                  </div>
                  <a
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-30"
                    aria-label={`فتح موقع ${location.city} على الخريطة`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
