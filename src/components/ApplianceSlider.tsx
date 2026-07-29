'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// Swiper 스타일 import
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ApplianceSlider = () => {
  // 8개의 가전제품 데이터 (파일 경로 기준)
  const appliances = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    src: `/HP_Image/${i + 1}.png`,
    title: `가전제품 ${i + 1}`,
  }));

  return (
    <section className="w-full py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* 타이틀 영역 */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            <span className="t-green">일일넷</span>이 드리는 가전제품
          </h2>
        </div>

        {/* 슬라이더 영역 */}
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          slidesPerView={2} // 모바일에서는 2개
          breakpoints={{
            768: { slidesPerView: 4 }, // 태블릿 이상에서는 4개
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="pb-10"
        >
          {appliances.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ApplianceSlider;