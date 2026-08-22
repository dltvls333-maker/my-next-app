'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

// Swiper 스타일 import
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ApplianceSlider = () => {
  // 1.jpg ~ 8.jpg 확장자에 맞춘 8개의 가전제품 데이터
  const appliances = [
    { id: 1, src: '/HP_Image/1.jpg', title: '삼성 무빙스타일 32인치 M5', badge: '무료 + 비밀지원금' },
    { id: 2, src: '/HP_Image/2.jpg', title: 'LG UHD TV 50인치', badge: '무료 + 비밀지원금' },
    { id: 3, src: '/HP_Image/3.jpg', title: 'LG UHD TV 55인치', badge: '무료' },
    { id: 4, src: '/HP_Image/4.jpg', title: 'LG 공기청정기 19평', badge: '무료' },
    { id: 5, src: '/HP_Image/5.jpg', title: 'LG무선청소기 A9', badge: '무료 + 비밀지원금' },
    { id: 6, src: '/HP_Image/6.jpg', title: '삼성 UHD 4K 50인치', badge: '무료 + 비밀지원금' },
    { id: 7, src: '/HP_Image/7.jpg', title: '삼성 UHD 4K 55인치', badge: '무료 + 비밀지원금' },
    { id: 8, src: '/HP_Image/8.jpg', title: '삼성 UHD 4K 65인치', badge: '추가금' },
  ];

  return (
    <section className="w-full py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* 타이틀 영역 */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            <span className="t-green">디코비즈</span>가 드리는 가전제품
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
          className="pb-10"
        >
          {appliances.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-[380px] md:h-[420px]">
                
                {/* 상단 텍스트 영역 */}
                <div className="text-center h-[50px] flex items-center justify-center">
                  <h3 className="text-sm md:text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* 중앙 주황색 둥근 버튼 영역 */}
                <div className="my-2 flex justify-center">
                  <span className="bg-[#e67e22] text-white text-xs md:text-sm font-bold px-4 py-2 rounded-full shadow-sm">
                    {item.badge}
                  </span>
                </div>

                {/* 하단 이미지 영역 (.jpg 적용) */}
                <div className="flex items-center justify-center flex-1 py-2">
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ApplianceSlider;