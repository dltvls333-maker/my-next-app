'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

// Swiper 스타일 import
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ApplianceItem {
  id: number;
  title: string;
  badge: string;
  src: string;
  orderNum: number;
}

const ApplianceSlider = () => {
  const [appliances, setAppliances] = useState<ApplianceItem[]>([]);
  const [loading, setLoading] = useState(true);

  // DB에서 데이터 불러오기
  useEffect(() => {
    fetch('/api/appliances')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setAppliances(data.data);
        }
      })
      .catch((err) => console.error('가전제품 데이터 로딩 실패:', err))
      .finally(() => setLoading(false));
  }, []);

  // 로딩 중이거나 데이터가 없을 때의 예외 처리 (디자인 구조는 동일한 section 유지)
  if (loading || appliances.length === 0) {
    return (
      <section className="w-full py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-400">
          가전제품 목록을 불러오는 중입니다...
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* 타이틀 영역 */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            <span className="t-green">바로넷</span>이 드리는 가전제품
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
            <SwiperSlide key={item.id} className="h-auto">
              {/* 카드 전체 프레임 고정 (높이 및 레이아웃 일관성 유지) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-[420px] md:h-[460px]">
                
                {/* 1. 상단 텍스트 영역 (높이 고정으로 줄바꿈 흔들림 방지) */}
                <div className="h-[56px] flex items-center justify-center text-center">
                  <h3 className="text-sm md:text-base font-bold text-slate-900 leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                {/* 2. 중앙 주황색 버튼 영역 (크기 통일) */}
                <div className="my-2 flex justify-center">
                  <div className="w-full max-w-[180px] bg-[#0A685D] text-white text-xs md:text-sm font-bold py-2.5 rounded-full shadow-sm text-center truncate px-2">
                    {item.badge}
                  </div>
                </div>

                {/* 3. 하단 이미지 영역 (박스 규격 고정 및 비율 유지) */}
                <div className="w-full h-[180px] md:h-[220px] flex items-center justify-center overflow-hidden mt-2">
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