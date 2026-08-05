'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// 1. 이름 마스킹 함수
const maskName = (name: string) => {
  if (!name || name.length < 2) return name;
  return name.substring(0, 1) + '**';
};

// 2. 별점 컴포넌트
const StarRating = () => (
  <div className="flex text-yellow-400 text-xs md:text-base">
    {'★'.repeat(5)}
  </div>
);

export default function ReviewSlider({ reviews }: { reviews: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 데이터가 없을 경우 방어 코드
  if (!reviews || reviews.length === 0) return <div className="text-center py-10">후기가 없습니다.</div>;

  // 다음 슬라이드 (모바일은 2개씩, PC는 2개씩 순환)
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 2) % reviews.length);
  };

  // 이전 슬라이드
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 2 + reviews.length) % reviews.length);
  };

  return (
    <div className="w-full py-12 md:py-16 bg-slate-50 overflow-hidden">
      <h2 className="text-2xl text-center py-8 md:text-4xl font-extrabold text-slate-900 tracking-tight">
        일일넷 인터넷 가입 후기
      </h2>

      {/* 슬라이드 컨테이너 영역 */}
      <div className="max-w-[1240px] mx-auto px-2 md:px-6 relative flex items-center justify-center">
        
        {/* 왼쪽 화살표 버튼 */}
        <button 
          onClick={prevSlide}
          className="absolute left-1 md:left-4 z-10 w-9 h-9 md:w-12 md:h-12 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-100 transition"
          aria-label="이전 후기"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 카드 내용 영역 */}
        <div className="w-full max-w-[1000px] overflow-hidden px-6 md:px-4">
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            {[0, 1].map((offset) => {
              const reviewIndex = (currentIndex + offset) % reviews.length;
              const review = reviews[reviewIndex];

              return (
                <Link 
                  key={`${review.id}-${reviewIndex}`}
                  href={`/reviews/${review.id}`}
                  className="block"
                >
                  <div className="bg-white rounded-2xl md:rounded-[32px] p-3.5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#2d4a3e]/20 flex flex-col md:flex-row items-center gap-3 md:gap-5 hover:shadow-lg transition h-full min-h-[130px] md:min-h-[180px]">
                    
                    {/* 정사각형 이미지 영역 (모바일에서 아기자기하게 크기 축소) */}
                    {review.image_url && (
                      <div className="w-full md:w-[130px] h-[90px] md:h-[130px] flex-shrink-0 bg-slate-100 rounded-xl md:rounded-2xl overflow-hidden relative">
                        <img 
                          src={review.image_url} 
                          className="w-full h-full object-cover" 
                          alt="후기 이미지" 
                        />
                      </div>
                    )}
                    
                    {/* 별점, 고객명, 제목 텍스트 영역 */}
                    <div className="flex flex-col justify-center flex-1 min-w-0 w-full text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-1 mb-1">
                        <StarRating />
                      </div>
                      <span className="text-[11px] md:text-sm text-slate-500 font-medium mb-1">
                        {maskName(review.user_name)} 고객님
                      </span>
                      <h3 className="font-bold text-xs md:text-lg text-slate-900 truncate" title={review.title}>
                        {review.title || "제목 텍스트"}
                      </h3>
                    </div>

                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 오른쪽 화살표 버튼 */}
        <button 
          onClick={nextSlide}
          className="absolute right-1 md:right-4 z-10 w-9 h-9 md:w-12 md:h-12 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-slate-100 transition"
          aria-label="다음 후기"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>
    </div>
  );
}