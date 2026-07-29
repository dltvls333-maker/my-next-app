'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function BannerSlider({ banners }: { banners: any[] }) {
  return (
    <Swiper 
      modules={[Autoplay, Pagination]} 
      loop={true} 
      autoplay={{ delay: 3000 }} 
      pagination={{ clickable: true }} 
      // 높이 고정을 제거하거나 이미지 비율에 맞게 변경하세요.
      // 가로형 배너라면 보통 w-full aspect-[21/9] 등을 사용합니다.
      className="w-full aspect-[21/9] md:aspect-[21/9]" 
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          {/* 배경색 고정을 제거하고 이미지가 부모를 꽉 채우도록 설정 */}
          <div className="w-full h-full relative">
            <img 
              src={banner.image_url} 
              alt={banner.title} 
              // object-contain 대신 w-full h-full object-cover를 사용하되, 
              // 이미지가 너무 잘린다면 object-left 또는 object-center를 조정하세요.
              className="w-full h-full object-cover object-center" 
            />
            
            {/* 텍스트는 이미지 위에 겹쳐 보이게 그대로 유지 */}
            <div className="absolute bottom-[10%] left-[5%] text-white">
              <h2 className="text-xl md:text-4xl font-bold">{banner.title}</h2>
              <p className="text-sm md:text-lg">{banner.subtitle}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}